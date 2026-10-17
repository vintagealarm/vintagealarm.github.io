import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {StagedReader} from './staged-routing.mjs';
import {digest} from './replay-evidence.mjs';
const args=process.argv.slice(2),get=name=>args[args.indexOf(name)+1];
if(!['--adapter','--reviewer','--output'].every(a=>args.includes(a))) {
  console.error('Usage: replay:route -- --adapter answer.mjs --reviewer judge.mjs --output /private/results.json [--case ID]');
  console.error('No model ran. Staged routing and preloaded answer review are separate tests.');process.exit(1);
}
const adapter=path.resolve(get('--adapter')),judge=path.resolve(get('--reviewer')),output=path.resolve(get('--output'));
const root=fs.realpathSync(process.cwd());
const outputParent=fs.realpathSync(path.dirname(output));
if(outputParent===root || outputParent.startsWith(root+path.sep) || fs.existsSync(output) && fs.lstatSync(output).isSymbolicLink()) throw Error('results must be outside public repository');
if(adapter===judge || digest(fs.readFileSync(adapter))===digest(fs.readFileSync(judge))) throw Error('separate answer and review adapters required');
const f=JSON.parse(fs.readFileSync('.codex/inference-guard-cases.json','utf8'));
const selected=f.cases.filter(c=>c.status==='LOCKED_REGRESSION' && (!args.includes('--case') || c.id===get('--case')));
if(!selected.length) throw Error('unknown case');
const invoke=(file,payload)=>{
  const r=spawnSync(process.execPath,[file],{input:JSON.stringify(payload),encoding:'utf8',timeout:120000,maxBuffer:2_000_000});
  if(r.error || r.status!==0) throw Error(`adapter execution failed: ${r.error?.message || r.status}`);
  return JSON.parse(r.stdout);
};
const results=[];
for(const c of selected) {
  const started=new Date().toISOString();let reader;let answerInputChars=0,modelCalls=0,reviewInputChars=0;
  try {
    reader=new StagedReader(f,c);let response;
    const discoveryResults=[];
    for(let turn=0;turn<30;turn++) {
      const request={case_id:c.id,prompt:c.replay.prompt,evidence:reader.trace,discovery:discoveryResults,
        instruction:'Read only sources disclosed so far. Return {action:"read",route_id,path,section,via,reason} (code may use start_line/end_line instead of section), {action:"locate",query,reason}, or {action:"answer",answer,model}. Entry sections are required before deeper sections. All targets of a selected route must be read. Do not claim tool behaviors absent from the trace.'};
      answerInputChars+=JSON.stringify(request).length;modelCalls++;
      response=invoke(adapter,request);
      if(response.action==='answer') break;
      if(!['read','locate'].includes(response.action)) throw Error('unknown adapter action');
      const value=reader.request(response);if(response.action==='locate') discoveryResults.push(value);
    }
    if(response.action!=='answer' || !response.answer?.trim() || !response.model?.trim()) throw Error('no actual answer / model identity');
    const gaps=reader.finish();
    const reviewRequest={prompt:c.replay.prompt,answer:response.answer,evidence:reader.trace,read_trace:reader.result(response.answer).read_trace,
      expected_resolution:c.replay.expected_resolution,forbidden_resolution:c.replay.forbidden_resolution,routing_gaps:gaps,
      instruction:'Evaluate the actual answer and routing trace. Return {outcome,reviewer,rationale,false_certainty}. Missing tool evidence is HOLD; synthetic fixtures are not real model validation.'};
    reviewInputChars=JSON.stringify(reviewRequest).length;const review=invoke(judge,reviewRequest);
    if(!['PASS','FAIL','HOLD'].includes(review.outcome) || typeof review.false_certainty!=='boolean' || !review.reviewer?.trim() || !review.rationale?.trim()) throw Error('invalid reviewer output');
    results.push({...reader.result(response.answer),outcome:gaps.length?'HOLD':review.outcome,
      review:{kind:'model',reviewer:review.reviewer,rationale:[...gaps,review.rationale].join('; ')},false_certainty:review.false_certainty,
      execution:{kind:'staged_model_adapter',model:response.model,started_at:started,finished_at:new Date().toISOString(),prompt_sha256:digest(c.replay.prompt),
        model_calls:modelCalls,answer_adapter_input_chars:answerInputChars,review_adapter_input_chars:reviewInputChars}});
    if(gaps.length || review.outcome!=='PASS' || review.false_certainty) process.exitCode=1;
  } catch(error) {
    results.push({...reader?.result(''),case_id:c.id,outcome:'HOLD',notes:error.message,execution:{kind:'adapter_error',started_at:started,finished_at:new Date().toISOString()}});process.exitCode=1;
  }
  fs.writeFileSync(output,JSON.stringify({mode:'staged_routing_replay',limitations:'Local snapshot reads; no remote fresh-boot or independent judge attestation.',results},null,2)+'\n',{mode:0o600});
  console.log(`${c.id}: ${results.at(-1).outcome}`);
}
if(selected.length!==f.cases.filter(c=>c.status==='LOCKED_REGRESSION').length) {
  console.log(`PARTIAL: ${selected.length}/${f.cases.length}; missing cases are NOT_RUN`);
  if(!args.includes('--partial')) process.exitCode=1;
}
