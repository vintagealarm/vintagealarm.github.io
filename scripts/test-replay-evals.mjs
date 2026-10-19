// Attack the production checker in an isolated tree, never alter canonical data.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { caseEvidence } from './replay-evidence.mjs';
const root = process.cwd(), temp = fs.mkdtempSync(path.join(os.tmpdir(), 'va-replay-'));
const fixturePath = '.codex/inference-guard-cases.json';
const f = JSON.parse(fs.readFileSync(fixturePath,'utf8'));
const lockedCount = f.replay_eval.locked_case_ids.length;
const put = (p,text) => { fs.mkdirSync(path.dirname(path.join(temp,p)),{recursive:true});fs.writeFileSync(path.join(temp,p),text); };
const files = new Set([fixturePath,...f.replay_eval.boot_paths]);
for (const c of f.cases) {
 for (const p of c.replay.routing_path) files.add(p);
 for (const s of [...c.replay.required_sources,...c.replay.verification_sources || [],...c.replay.semantic_checks || []]) files.add(s.path);
}
for (const p of files) put(p,fs.readFileSync(p));
for (const p of ['scripts/check-replay-evals.mjs','scripts/replay-evidence.mjs']) put(p,fs.readFileSync(p));
const checker = path.join(root,'scripts/check-replay-evals.mjs');
let count=0;
function run(args, ok, signal='') {
 const p=spawnSync(process.execPath,[checker,...args],{cwd:temp,encoding:'utf8'});
 assert.equal(p.status,ok?0:1,p.stdout+'\n'+p.stderr);
 assert.ok((p.stdout+p.stderr).includes(signal),p.stdout+'\n'+p.stderr);
 count++;
 return p;
}
function mutate(file, fn, check) {
 const original=fs.readFileSync(path.join(temp,file),'utf8');
 put(file,fn(original));try {check();} finally {put(file,original);}
}
const changeFixture=(fn,check)=>mutate(fixturePath,(text)=>{const x=JSON.parse(text);fn(x);return JSON.stringify(x);},check);
try {
 run(['check'],true,`${lockedCount} locked cases`);
 changeFixture((x)=>x.cases.pop(),()=>run(['check'],false,'must match exactly'));
 changeFixture((x)=>x.cases.at(-1).status='DRAFT',()=>run(['check'],false,'must match exactly'));
 changeFixture((x)=>x.cases.at(-1).replay=null,()=>run(['check'],false,'missing replay block'));
 changeFixture((x)=>x.cases.push(x.cases[0]),()=>run(['check'],false,'duplicate case id'));
 changeFixture((x)=>{const c=x.cases.find((v)=>v.replay?.semantic_checks?.length);assert.ok(c,'fixture must contain a semantic-check case');c.replay.semantic_checks=[];},()=>run(['check'],false,'must retain'));
 const ledger='research/ARSA_BLIND_ALARM_LEDGER.md';
 mutate(ledger,(s)=>{assert.ok(s.includes('The seller replied **yes**'));return s.replace('The seller replied **yes**','The seller replied **no**');},()=>run(['check'],false,'semantic assertion failed'));
 const guard='.codex/FAIL_CLOSED_INFERENCE_GUARDS.md';
 mutate(guard,(s)=>s.replace('## 3.5 ENTITY CONTINUITY / RELIST GATE','## 3.5 REMOVED'),()=>run(['check'],false,'semantic section'));
 const map='research/ARSA_BLIND_ALARM_RESEARCH_MAP.md';
 mutate(map,(s)=>s.replace('SENT — USER_REPORTED','not yet sent'),()=>run(['check'],false,'semantic assertion'));
 mutate(map,(s)=>s.replace('ID_MAPPING_HOLD','IDENTICAL_IDS'),()=>run(['check'],false,'semantic assertion'));
 changeFixture((x)=>x.cases.at(-1).replay.max_expected_files=5,()=>run(['check'],false,'budgets must equal'));
 const c=f.cases[0], ev=caseEvidence(f,c);
 const result={case_id:c.id,outcome:'PASS',answer:'The Instagram rule is directional. Consult X CURRENT; reuse via English compression is permitted.',
  review:{kind:'self',reviewer:'SYNTHETIC TEST, not model execution',rationale:'Test record only'},
  execution:{kind:'synthetic_test',started_at:new Date().toISOString(),finished_at:new Date().toISOString()},
  files_read:[...new Set(ev.map((e)=>e.path))],evidence:ev.map(({text,...e})=>e),
  chars_read:ev.reduce((n,e)=>n+e.text.length,0),routing_hops:1,user_reinstruction_count:0,false_certainty:false};
 const save=(r)=>put('results.json',JSON.stringify({results:r}));
 save([result]);run(['score','results.json'],false,`NOT_RUN: ${lockedCount - 1}`);
 run(['score','results.json','--partial'],true,'PARTIAL / DIAGNOSTIC ONLY');
 const attack=(patch,signal)=>{save([{...result,...patch}]);run(['score','results.json','--partial'],false,signal);};
 attack({answer:''},'missing actual answer');
 attack({review:null},'missing attributed review');
 attack({evidence:[]},'missing evidence trace');
 attack({evidence:result.evidence.map((e,i)=>i?e:{...e,sha256:'forged'})},'digest mismatch');
 attack({evidence:result.evidence.map((e,i)=>i?e:{...e,end_line:1})},'incomplete required excerpt');
 attack({chars_read:0},'differs from trace');
 attack({false_certainty:true},'correctness / intervention failure');
 attack({outcome:'FAIL'},'correctness / intervention failure');
 attack({outcome:'HOLD'},'correctness / intervention failure');
 attack({user_reinstruction_count:1},'correctness / intervention failure');
 attack({execution:null},'missing actual execution provenance');
 save([result,result]);run(['score','results.json'],false,'duplicate');
 attack({case_id:'NOT_A_CASE'},'unknown');
 attack({routing_hops:999},'budget exceeded');
 changeFixture((x)=>x.cases[0].replay.max_expected_chars=1,()=>run(['check'],false,'scoped prompt exceeds character budget'));
 // New locked cases are never silently ignored by the normal checker.
 changeFixture((x)=>{const c=structuredClone(x.cases[0]);c.id='FUTURE-CASE';c.replay.required_sources[0].contains=['THIS_EVIDENCE_DOES_NOT_EXIST'];x.cases.push(c);x.replay_eval.locked_case_ids.push(c.id);},()=>run(['check'],false,'lost evidence anchor'));
 // Mere PASS labels cannot constitute a complete passing run.
 save(f.cases.map((c)=>({...result,case_id:c.id,answer:'',evidence:[]})));
 run(['score','results.json'],false,`PASS: 0/${lockedCount}`);
 // Execute the production runner with explicitly synthetic adapters to verify plumbing.
 const runner=path.join(root,'scripts/run-replay-evals.mjs');
 const answerAdapter=path.join(temp,'answer.mjs'), reviewAdapter=path.join(temp,'review.mjs');
 put('answer.mjs', `let s='';for await(const c of process.stdin)s+=c;const x=JSON.parse(s);if('expected_resolution' in x)throw Error('oracle leaked');console.log(JSON.stringify({answer:'SYNTHETIC plumbing response, not an AI answer',model:'SYNTHETIC_TEST'}));`);
 put('review.mjs', `let s='';for await(const c of process.stdin)s+=c;const x=JSON.parse(s);if(!x.expected_resolution||!x.answer)throw Error('missing review material');console.log(JSON.stringify({outcome:'PASS',reviewer:'SYNTHETIC_TEST',rationale:'Plumbing test only',false_certainty:false}));`);
 const out=temp+'-result.json';
 try {
   const missing=spawnSync(process.execPath,[runner],{cwd:temp,encoding:'utf8'});
   assert.equal(missing.status,1);assert.ok(missing.stderr.includes('No model ran'));count++;
   const args=['--adapter',answerAdapter,'--reviewer',reviewAdapter,'--output',out,'--case',c.id,'--partial'];
   const passing=spawnSync(process.execPath,[runner,...args],{cwd:temp,encoding:'utf8'});
   assert.equal(passing.status,0,passing.stdout+passing.stderr);
   const saved=JSON.parse(fs.readFileSync(out,'utf8')).results[0];
   assert.equal(saved.answer,'SYNTHETIC plumbing response, not an AI answer');
   assert.equal(saved.execution.model,'SYNTHETIC_TEST');count++;
   const noPartial=spawnSync(process.execPath,[runner,...args.filter((x)=>x!=='--partial')],{cwd:temp,encoding:'utf8'});
   assert.equal(noPartial.status,1);assert.ok(noPartial.stdout.includes(`NOT_RUN: ${lockedCount - 1}`));count++;
   const unsafe=spawnSync(process.execPath,[runner,...args.map((x)=>x===out?path.join(temp,'unsafe.json'):x)],{cwd:temp,encoding:'utf8'});
   assert.equal(unsafe.status,1);assert.ok(unsafe.stderr.includes('outside public repository'));count++;
 } finally {fs.rmSync(out,{force:true});}
 console.log(`Replay adversarial checks: ${count} passed (synthetic harness, NOT AI answer replays).`);
} finally {fs.rmSync(temp,{recursive:true,force:true});}
