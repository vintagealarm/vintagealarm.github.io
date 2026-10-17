import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {bootPaths,parseRoutes,resolveTarget} from './routing-contract.mjs';
import {selectEvidence,coversRange,requiredEvidence} from './replay-evidence.mjs';

// This reader exposes only the evidence actually requested so far. No oracle routes
// or expected answer are sent to the answer adapter.
export class StagedReader {
  constructor(fixture,item,{read=p=>fs.readFileSync(p,'utf8')}={}) {
    this.fixture=fixture;this.item=item;this.read=read;this.trace=[];this.routes=new Map();this.selected=new Set();this.located=new Set();
    for(const file of bootPaths) this.record({path:file,contains:[]},'BOOT','mandatory fresh boot');
  }
  record(source,via,reason,request) {
    const excerpts=selectEvidence(source,this.read);
    for(const e of excerpts) {
      if(this.trace.some(t=>t.path===e.path && t.start_line<=e.end_line && t.end_line>=e.start_line)) throw Error(`unnecessary reread / overlapping range: ${e.path}; request unread lines only`);
    }
    const candidate=[...this.trace,...excerpts];
    const chars=candidate.reduce((n,e)=>n+e.text.length,0);
    const reads=candidate.filter(e=>!bootPaths.includes(e.path)).length;
    const files=new Set(candidate.filter(e=>!bootPaths.includes(e.path)).map(e=>e.path)).size;
    if(chars>this.item.replay.max_expected_chars || reads>this.item.replay.max_expected_hops || files>this.item.replay.max_expected_files) throw Error('staged retrieval budget exceeded');
    for(const e of excerpts) this.trace.push({...e,via,reason,...(request?{request:structuredClone(request)}:{}),sequence:this.trace.length+1,read_at:new Date().toISOString()});
    const body=excerpts.map(e=>e.text).join('\n');
    if(body.includes('<!-- VA_ROUTES_BEGIN -->') && body.includes('<!-- VA_ROUTES_END -->')) for(const r of parseRoutes(source.path,body)) this.routes.set(r.id,r);
    return excerpts;
  }
  request(request) {
    if(!request.reason?.trim()) throw Error('read / locate requires a reason');
    if(request.action==='locate') {
      if(!request.query?.trim() || request.query.length<3) throw Error('locate needs a specific filename query');
      const query=request.query.toLowerCase();
      const matches=execFileSync('git',['ls-files'],{encoding:'utf8'}).split('\n').filter(p=>/\.(md|ts|mjs|json|astro)$/.test(p) && p.toLowerCase().includes(query));
      if(matches.length>30) throw Error('locate query is too broad');
      if((this.discovery?.length || 0)>=3) throw Error('too many discovery requests');
      for(const file of matches) this.located.add(file);
      // Discovery metadata is distinct from source reads, not hidden in routing_hops.
      this.discovery ||= [];this.discovery.push({query:request.query,reason:request.reason,matches,after_reads:this.trace.length});
      return {matches};
    }
    const file=request.path;
    if(typeof file!=='string' || path.isAbsolute(file) || file.split('/').includes('..') || !/\.(md|ts|mjs|json|toml|txt|astro)$/.test(file)) throw Error('invalid repository read path');
    const route=this.routes.get(request.route_id);
    const hasLines=request.start_line!==undefined || request.end_line!==undefined;
    if(hasLines && request.section!==undefined) throw Error('conflicting section and line selectors');
    const source={path:file,...(hasLines?{lines:{start:request.start_line,end:request.end_line}}:{sections:[request.section || '*']})};
    const proposed=selectEvidence(source,this.read);
    if(request.route_id && (!route || !route.targets.includes(file))) throw Error('route has not been discovered or target does not match');
    // All access forms obey the same entry gate, including prose pointers and lines.
    const applicable=[...this.routes.values()].filter(r=>r.targets.includes(file) && r.section!=='*');
    if(applicable.length && !applicable.some(r=>selectEvidence({path:file,sections:[r.section]},this.read).every(e=>coversRange(this.trace,e) || coversRange(proposed,e)))) throw Error('read the route entry section first');
    let authorized=false;
    if(route && route.targets.includes(file)) {
      if(!this.trace.some(t=>t.path===route.owner)) throw Error('route owner has not been read');
      if(route.section!=='*' && !selectEvidence({path:file,sections:[route.section]},this.read).every(e=>coversRange(this.trace,e) || coversRange(proposed,e))) throw Error('read the route entry section first');
      authorized=true;
    }
    if(!authorized && request.via) {
      const contexts=this.trace.filter(t=>t.path===request.via).map(t=>t.text).join('\n');
      const refs=[...contexts.matchAll(/(?:`([\w./-]+\.(?:md|ts|mjs|json|toml|astro))`|\]\(([^)]+)\))/g)].map(m=>m[1]||m[2]);
      authorized=refs.some(ref=>{
        try{return ref===file || resolveTarget(request.via,ref)===file;}catch{return false;}
      }) || (file===request.via && request.section && contexts.includes(request.section));
    }
    if(!authorized && this.located.has(file) && this.selected.has('WATCH-RESEARCH') && /^(research|src\/content\/watches)\//.test(file)) authorized=true;
    if(!authorized && this.located.has(file) && this.selected.has('WATCH-TEXT') && /^src\/content\/watches\//.test(file)) authorized=true;
    if(!authorized) throw Error(`source has not been discovered through a read route: ${file}`);
    if(bootPaths.includes(file)) throw Error('boot restart inside same message is not allowed');
    const excerpts=this.record(source,request.route_id || request.via || 'locate',request.reason,request);
    if(route) this.selected.add(route.id);
    return excerpts;
  }
  finish() {
    const errors=[];
    for(const id of this.item.replay.route_ids || []) if(!this.selected.has(id)) errors.push(`required route not followed: ${id}`);
    for(const id of this.selected) for(const target of this.routes.get(id).targets) if(!this.trace.some(e=>e.path===target)) errors.push(`selected route target unread: ${id}: ${target}`);
    for(const expected of requiredEvidence(this.fixture,this.item,this.read)) if(!coversRange(this.trace,expected)) errors.push(`incomplete required excerpt: ${expected.path}:${expected.start_line}-${expected.end_line}`);
    for(const source of this.item.replay.required_sources) {
      const text=this.trace.filter(t=>t.path===source.path).map(t=>t.text).join('\n');
      if(!text) errors.push(`unread source: ${source.path}`);
      for(const anchor of source.contains) if(!text.includes(anchor)) errors.push(`unread required evidence: ${source.path}: ${anchor}`);
    }
    if(this.item.replay.external_required_sources?.length) errors.push('external tool evidence must be captured by a connected execution surface; this local staged reader cannot certify it');
    return errors;
  }
  result(answer) {
    const {trace}=this;
    return {case_id:this.item.id,answer,files_read:[...new Set(trace.map(t=>t.path))],
      evidence:trace.map(({text,...e})=>e),read_trace:trace.map(({text,...e})=>e),
      chars_read:trace.reduce((n,e)=>n+e.text.length,0),routing_hops:trace.filter(e=>!bootPaths.includes(e.path)).length,
      route_ids:[...this.selected],discovery:this.discovery || [],user_reinstruction_count:0};
  }
}

// Re-execute recorded requests against the same source snapshot. A declared route
// ID or a valid excerpt hash alone cannot establish that navigation was legal.
export function validateStagedTrace(fixture,item,result) {
  try {
    const reader=new StagedReader(fixture,item);
    const trace=result.read_trace;
    if(!Array.isArray(trace) || trace.length<3) throw Error('missing boot trace');
    const discoveries=[...(result.discovery || [])];
    for(let i=3;i<trace.length;i++) {
      while(discoveries[0]?.after_reads===i) {
        const d=discoveries.shift();
        const found=reader.request({action:'locate',query:d.query,reason:d.reason});
        if(JSON.stringify(found.matches)!==JSON.stringify(d.matches)) throw Error('discovery mismatch');
      }
      if(!trace[i].request) throw Error('missing read request');
      const added=reader.request(trace[i].request);
      if(added.length!==1) throw Error('trace requires one range per request');
    }
    if(discoveries.length) throw Error('unreplayed discovery event');
    const fields=['path','start_line','end_line','sha256','via','reason','sequence'];
    if(trace.length!==reader.trace.length || trace.some((e,i)=>fields.some(k=>e[k]!==reader.trace[i][k]))) throw Error('request / evidence trace mismatch');
    if(JSON.stringify([...(result.route_ids || [])].sort())!==JSON.stringify([...reader.selected].sort())) throw Error('route decisions differ from executed requests');
    return reader.finish().filter(e=>!e.startsWith('external tool evidence'));
  } catch(e) {return [e.message];}
}
