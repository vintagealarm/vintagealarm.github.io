import { readFileSync } from 'node:fs';
import { selectEvidence, caseEvidence } from './replay-evidence.mjs';
const fixture = JSON.parse(readFileSync('.codex/inference-guard-cases.json', 'utf8'));
let failed = false;
console.log('| Case | Scoped task chars | Boot + task chars | Char budget | External sources |');
console.log('|---|---:|---:|---:|---:|');
for (const item of fixture.cases.filter((c) => c.status === 'LOCKED_REGRESSION')) {
  const task = item.replay.required_sources.filter((s) => !fixture.replay_eval.boot_paths.includes(s.path))
    .flatMap((s) => selectEvidence(s)).reduce((n,e) => n + e.text.length, 0);
  const runtime = caseEvidence(fixture,item).reduce((n,e) => n + e.text.length, 0);
  console.log(`| ${item.id} | ${task} | ${runtime} | ${item.replay.max_expected_chars} | ${(item.replay.external_required_sources || []).length} |`);
  if (runtime > item.replay.max_expected_chars) {
    console.error(`${item.id}: scoped retrieval exceeds character budget`); failed = true;
  }
}
console.log('Measured prompt-pack size only; runtime traces are checked separately. External source bytes are additional and must be traced.');
if (failed) process.exitCode = 1;
