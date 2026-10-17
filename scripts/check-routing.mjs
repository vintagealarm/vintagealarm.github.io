import fs from 'node:fs';
import path from 'node:path';
import {bootPaths,routingOwners,loadRoutes,sectionRanges} from './routing-contract.mjs';

export function routingErrors(read=p=>fs.readFileSync(p,'utf8'), exists=p=>fs.existsSync(p)) {
  const errors=[];
  let routes;
  try {routes=loadRoutes(read);} catch(error) {return [error.message];}
  const f=JSON.parse(read('.codex/inference-guard-cases.json'));
  const ids=routes.map(r=>r.id), locks=f.replay_eval.required_route_ids || [];
  if(new Set(ids).size!==ids.length) errors.push('duplicate route ID');
  if(!locks.length || JSON.stringify([...ids].sort())!==JSON.stringify([...locks].sort())) errors.push('routing table / required_route_ids mismatch');
  for(const r of routes) for(const target of r.targets) {
    if(!exists(target)) {errors.push(`${r.id}: missing target ${target}`);continue;}
    try {sectionRanges(read(target),[r.section]);} catch(e) {errors.push(`${r.id}: ${target}: ${e.message}`);}
  }
  const charCount=bootPaths.reduce((n,p)=>n+read(p).length,0);
  if(charCount>14000) errors.push(`boot documents exceed 14000 character budget: ${charCount}`);
  for(const owner of [...bootPaths,routingOwners[1]]) {
    // Explicit repository path references, including prose examples, must resolve too.
    const text=read(owner);
    const refs=[...text.matchAll(/`([\w./-]+\.(?:md|mjs|ts|json|toml|txt|astro))`/g)].map(m=>m[1]);
    for(let ref of refs) {
      if(ref.startsWith('main/')) ref=ref.slice(5);
      if(!ref.includes('/')) continue; // Short names are resolved by the owning route; full links are preferred.
      if(!exists(ref) && !exists(path.posix.normalize(path.posix.join(path.posix.dirname(owner),ref)))) errors.push(`${owner}: dangling prose reference ${ref}`);
    }
  }
  for(const owner of ['AGENTS.md','PROJECT_STATE.md']) {
    if(read(owner).includes('<!-- VA_ROUTES_BEGIN -->')) errors.push(`${owner}: duplicate domain routing owner`);
    if(/^- .*Council.*→.*src\/index\.ts/m.test(read(owner))) errors.push(`${owner}: duplicated Council dispatch; use PROJECT route`);
  }
  for(const owner of bootPaths) {
    if(/Candidate Review Queue|KEEP \/ MERGE \/ SPLIT \/ DROP|micro-Reel ACTIVE/.test(read(owner))) errors.push(`${owner}: detailed SNS policy must stay in Social owner`);
  }
  for(const r of f.cases) for(const id of r.replay?.route_ids || []) if(!ids.includes(id)) errors.push(`${r.id}: unresolved route ${id}`);
  return errors;
}

if(process.argv[1] && path.resolve(process.argv[1])===path.resolve(new URL(import.meta.url).pathname)) {
  const errors=routingErrors();
  if(errors.length) {errors.forEach(e=>console.error(e));process.exitCode=1;}
  else console.log(`Routing contract passed: ${loadRoutes().length} routes; links and exact sections resolve; boot ${bootPaths.reduce((n,p)=>n+fs.readFileSync(p,'utf8').length,0)}/14000 chars. No AI behavior guarantee.`);
}
