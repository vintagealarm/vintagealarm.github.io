import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {routingErrors} from './check-routing.mjs';
import {bootPaths,sectionRanges} from './routing-contract.mjs';
import {StagedReader} from './staged-routing.mjs';
import {selectEvidence} from './replay-evidence.mjs';

let count=0;
const read=p=>fs.readFileSync(p,'utf8');
const mutation=(file,fn,signal)=>{
  const errors=routingErrors(p=>p===file?fn(read(p)):read(p));
  assert.ok(errors.some(e=>e.includes(signal)),errors.join('\n'));count++;
};
assert.deepEqual(routingErrors(),[]);count++;
mutation('PROJECT.md',s=>s.split('\n').filter(l=>!l.startsWith('| SOCIAL |')).join('\n'),'required_route_ids mismatch');
mutation('PROJECT.md',s=>s.replace('[council-worker/V3.md](council-worker/V3.md)','[bad](missing/router-does-not-exist.md)'),'missing target');
mutation('PROJECT_STATE.md',s=>s+'\n- Council → `missing/router-does-not-exist.md`\n','dangling prose reference');
mutation('SITE_RULES.md',s=>s.replace('## 原則','## RENAMED'),'section must resolve exactly once');
mutation('PROJECT.md',s=>s.replace('<!-- VA_ROUTES_END -->','<!-- VA_ROUTES_BEGIN -->'),'routing table');
mutation('AGENTS.md',s=>s+'x'.repeat(14000),'character budget');
mutation('PROJECT_STATE.md',s=>s+'\nmicro-Reel ACTIVE\n','detailed SNS policy');

const f=JSON.parse(read('.codex/inference-guard-cases.json'));
const item=f.cases.find(c=>c.id==='SOCIAL-X-LANGUAGE-001');
const fresh=()=>new StagedReader(f,item);
const reader=fresh();
assert.deepEqual(reader.trace.map(e=>e.path),bootPaths);count++;
assert.ok(!JSON.stringify(reader.trace).includes(item.replay.expected_resolution));count++;
const router='measurement/.internal/.virtual/social/ROUTER.md';
const initial={action:'read',route_id:'SOCIAL',path:router,section:'## 2. 参照順',reason:'Find the task-specific social route'};
reader.request(initial);
reader.request({action:'read',path:router,section:'## 3.5 X CURRENT OUTPUT CONTRACT — overseas English / Instagram reuse',via:router,reason:'Check current X output contract'});
reader.request({action:'read',route_id:'SOCIAL-COPY',path:'measurement/.internal/.virtual/social/instagram-published-copy.md',section:'### Mechanism follow-up — Published caption — screenshot verified 2026-10-05',reason:'Read the requested published caption'});
assert.deepEqual(reader.finish(),[]);count++;
const result=reader.result('SYNTHETIC route exercise, not an AI answer');
assert.equal(result.routing_hops,3);assert.equal(result.files_read.length-3,2);count++;
assert.ok(result.chars_read<20000);count++;
assert.throws(()=>reader.request(initial),/unnecessary reread/);count++;
assert.throws(()=>fresh().request({action:'read',route_id:'SOCIAL-COPY',path:'measurement/.internal/.virtual/social/instagram-published-copy.md',reason:'Guess a deep source without Router'}),/not been discovered/);count++;
assert.throws(()=>fresh().request({...initial,section:'## 3.5 X CURRENT OUTPUT CONTRACT — overseas English / Instagram reuse'}),/entry section first/);count++;
assert.throws(()=>fresh().request({...initial,path:'/etc/passwd'}),/invalid repository/);count++;
assert.ok(fresh().finish().length>0);count++;
const constrained=structuredClone(item);constrained.replay.max_expected_hops=0;
assert.throws(()=>new StagedReader(f,constrained).request(initial),/budget exceeded/);count++;
const operational=structuredClone(item);
operational.replay={...operational.replay,route_ids:['OPERATIONS'],required_sources:[],max_expected_chars:30000,max_expected_files:1,max_expected_hops:4};
const manager=new StagedReader(f,operational),managerPath='.codex/MANAGER_CONTROL_PLANE.md';
manager.request({action:'read',route_id:'OPERATIONS',path:managerPath,section:'## 1. Task Envelope',reason:'Resolve the operation scope'});
manager.request({action:'read',via:managerPath,path:managerPath,section:'## 2.5 Execution Surface / Capability Truth / Progress — mandatory',reason:'Follow the authority gate disclosed by the entry section'});
assert.deepEqual(manager.finish(),[]);count++;
assert.throws(()=>manager.request({action:'read',via:managerPath,path:managerPath,section:'### D. Research / Mutation / Publish Authority Gate（調査許可を実装許可へ拡張しない）',reason:'Attempt an already delivered subsection'}),/unnecessary reread/);count++;
// Duplicate text cannot silently select an earlier historical record.
const sample='# File\n## Old\nSame tag\n## Current\nSame tag\n';
assert.throws(()=>selectEvidence({path:'x',contains:['Same tag']},()=>sample),/ambiguous/);count++;
const selected=selectEvidence({path:'x',sections:['## Current'],contains:['Same tag']},()=>sample);
assert.equal(selected[0].start_line,4);count++;
assert.throws(()=>sectionRanges('# F\n## A\n## A\n',['## A']),/exactly once/);count++;
assert.deepEqual(sectionRanges('# F\n## One\n### Repeat\n## Two\n### Repeat\n',[['## Two','### Repeat']]),[{start:4,end:6}]);count++;
assert.deepEqual(sectionRanges('# F\n```text\n## Fake\n```\n## Real\n',['## Real']),[{start:4,end:6}]);count++;
const caption=selectEvidence(item.replay.required_sources[1]);
assert.ok(caption.every(e=>e.start_line>=155));count++;

// Exercise the staged CLI with explicitly synthetic adapters. The first call must
// contain only boot evidence; requested files appear only in later calls.
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'va-routing-cli-'));
try {
  const answer=path.join(temp,'answer.mjs'),judge=path.join(temp,'judge.mjs'),output=path.join(temp,'results.json');
  const steps=[initial,
    {action:'read',path:router,section:'## 3.5 X CURRENT OUTPUT CONTRACT — overseas English / Instagram reuse',via:router,reason:'Read X contract'},
    {action:'read',route_id:'SOCIAL-COPY',path:'measurement/.internal/.virtual/social/instagram-published-copy.md',section:'### Mechanism follow-up — Published caption — screenshot verified 2026-10-05',reason:'Read requested post'},
    {action:'answer',answer:'SYNTHETIC plumbing answer',model:'SYNTHETIC_TEST'}];
  fs.writeFileSync(answer,`let s='';for await(const c of process.stdin)s+=c;const x=JSON.parse(s);if('expected_resolution' in x)throw Error('oracle leaked');const steps=${JSON.stringify(steps)};const i=x.evidence.length-3;if(i===0&&x.evidence.some(e=>!['PROJECT.md','AGENTS.md','PROJECT_STATE.md'].includes(e.path)))throw Error('preloaded task sources');console.log(JSON.stringify(steps[i]));`);
  fs.writeFileSync(judge,`let s='';for await(const c of process.stdin)s+=c;const x=JSON.parse(s);if(x.routing_gaps.length)throw Error(x.routing_gaps.join(';'));console.log(JSON.stringify({outcome:'PASS',reviewer:'SYNTHETIC_TEST',rationale:'Plumbing only',false_certainty:false}));`);
  const r=spawnSync(process.execPath,['scripts/run-routing-replay.mjs','--adapter',answer,'--reviewer',judge,'--output',output,'--case',item.id,'--partial'],{encoding:'utf8'});
  assert.equal(r.status,0,r.stdout+r.stderr);count++;
  const run=JSON.parse(read(output)).results[0];
  assert.equal(run.read_trace.length,6);assert.equal(run.execution.model_calls,4);count++;
  // Cumulative adapter traffic is exposed separately from peak source context.
  assert.ok(run.execution.answer_adapter_input_chars>run.chars_read);count++;
  const scored=spawnSync(process.execPath,['scripts/check-replay-evals.mjs','score',output,'--partial'],{encoding:'utf8'});
  assert.equal(scored.status,0,scored.stdout+scored.stderr);count++;
  const complete=spawnSync(process.execPath,['scripts/check-replay-evals.mjs','score',output],{encoding:'utf8'});
  assert.equal(complete.status,1);count++;
} finally {fs.rmSync(temp,{recursive:true,force:true});}
console.log(`Routing adversarial checks: ${count} passed. Synthetic reader/adapter exercises; real AI routing is NOT certified.`);
