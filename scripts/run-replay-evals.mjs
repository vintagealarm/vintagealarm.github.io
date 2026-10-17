// Pluggable model runner. No API key, network endpoint or model is guessed.
// Adapters read one JSON request from stdin and write one JSON response to stdout.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { caseEvidence, digest } from './replay-evidence.mjs';
const arg = (name) => process.argv[process.argv.indexOf(name) + 1];
const has = (name) => process.argv.includes(name);
if (!has('--adapter') || !has('--reviewer') || !has('--output')) {
  console.error('Usage: replay:run -- --adapter model.mjs --reviewer independent-reviewer.mjs --output /private/results.json [--case ID]');
  console.error('No model ran. Fixture integrity PASS is not an answer replay PASS.');
  process.exit(1);
}
const adapter = path.resolve(arg('--adapter')), reviewer = path.resolve(arg('--reviewer'));
if (adapter === reviewer || digest(fs.readFileSync(adapter)) === digest(fs.readFileSync(reviewer))) throw Error('Separate answer and review adapters required');
const f = JSON.parse(fs.readFileSync('.codex/inference-guard-cases.json','utf8'));
const selected = f.cases.filter((c) => c.status === 'LOCKED_REGRESSION' && (!has('--case') || c.id === arg('--case')));
if (!selected.length) throw Error('No selected cases');
function invoke(file, request) {
  const run = spawnSync(process.execPath, [file], {input: JSON.stringify(request), encoding:'utf8', timeout:120000, maxBuffer:2_000_000});
  if (run.error || run.status !== 0) throw Error(`Adapter failed: ${run.error?.message || run.status}`);
  return JSON.parse(run.stdout);
}
const results = [];
const output = path.resolve(arg('--output'));
// Real answers / private transactions never default into the public repository.
const repository = fs.realpathSync(process.cwd());
if (output === repository || output.startsWith(repository + path.sep)) throw Error('Output must be outside public repository');
for (const item of selected) {
  const started = new Date().toISOString();
  const evidence = caseEvidence(f,item);
  const external = [];
  try {
    for (const source of item.replay.external_required_sources || []) {
      const match = source.uri.match(/^https:\/\/github.com\/([^/]+\/[^/]+)\/issues\/(\d+)$/);
      if (!match) throw Error('Unsupported external evidence URI');
      const response = await fetch(`https://api.github.com/repos/${match[1]}/issues/${match[2]}`, {signal:AbortSignal.timeout(30000)});
      if (!response.ok) throw Error(`External source unavailable: ${response.status}`);
      const issue = await response.json();
      const text = issue.body || '';
      for (const anchor of source.contains) if (!text.includes(anchor)) throw Error('External evidence anchor missing');
      external.push({uri:source.uri, text, sha256:digest(text), fetched_at:new Date().toISOString()});
    }
    // Expected / forbidden resolutions are deliberately withheld from the answer model.
    const response = invoke(adapter, {case_id:item.id, prompt:item.replay.prompt, evidence, external_evidence:external,
      instruction:'Answer the user from the supplied canonical evidence. Do not claim live tool actions that this offline pack cannot demonstrate. Return {answer, model}.'});
    if (!response.answer?.trim() || !response.model?.trim()) throw Error('Answer adapter must return actual answer and model identity');
    const review = invoke(reviewer, {case_id:item.id,prompt:item.replay.prompt,answer:response.answer,
      expected_resolution:item.replay.expected_resolution,forbidden_resolution:item.replay.forbidden_resolution,evidence,external_evidence:external,
      instruction:'Assess the actual answer, not merely keywords or its self-report. Return {outcome:PASS|FAIL|HOLD, reviewer, rationale, false_certainty}. Tool-use behaviors not demonstrated by the trace must be HOLD.'});
    if (!['PASS','FAIL','HOLD'].includes(review.outcome) || typeof review.false_certainty !== 'boolean' ||
        !review.reviewer?.trim() || !review.rationale?.trim()) throw Error('Invalid reviewer response');
    results.push({case_id:item.id,answer:response.answer,outcome:review.outcome,
      review:{kind:'model',reviewer:review.reviewer,rationale:review.rationale},false_certainty:review.false_certainty,
      evidence:evidence.map(({text,...e})=>e),external_evidence:external,
      files_read:[...new Set(evidence.map((e)=>e.path))],
      chars_read:evidence.reduce((n,e)=>n+e.text.length,0)+external.reduce((n,e)=>n+e.text.length,0),
      routing_hops:new Set(evidence.map((e)=>e.path).filter((p)=>!f.replay_eval.boot_paths.includes(p))).size+external.length,
      user_reinstruction_count:0,
      execution:{kind:'offline_model_adapter',model:response.model,started_at:started,finished_at:new Date().toISOString(),prompt_sha256:digest(item.replay.prompt),
        answer_adapter_sha256:digest(fs.readFileSync(adapter)),reviewer_adapter_sha256:digest(fs.readFileSync(reviewer))}});
  } catch (error) {
    results.push({case_id:item.id,outcome:'HOLD',notes:error.message,execution:{kind:'adapter_error',started_at:started,finished_at:new Date().toISOString()}});
    process.exitCode=1;
  }
  fs.writeFileSync(output,JSON.stringify({mode:'offline_model_replay',limitations:'Preloaded sources; not fresh-boot/tool-use/progress validation. Judge identity is attributed, not trusted attestation.',results},null,2)+'\n',{mode:0o600});
  console.log(`${item.id}: ${results.at(-1).outcome}`);
}

const score = spawnSync(process.execPath, [path.join(repository,'scripts/check-replay-evals.mjs'), 'score', output, ...(has('--partial') ? ['--partial'] : [])], {encoding:'utf8'});
process.stdout.write(score.stdout || ''); process.stderr.write(score.stderr || '');
if (score.status !== 0) process.exitCode=1;
