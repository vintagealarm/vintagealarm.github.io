import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const baseName = process.env.GITHUB_BASE_REF || process.argv[2] || 'main';
let baseRef = `origin/${baseName}`;
try { git('rev-parse', '--verify', baseRef); } catch { baseRef = baseName; }
const mergeBase = git('merge-base', 'HEAD', baseRef);
const changed = git('diff', '--name-only', `${mergeBase}...HEAD`).split('\n').filter(Boolean);
const ledgers = changed.filter((file) => /^research\/(?!WATCH_RESEARCH_LEDGER_TEMPLATE\.md$).+_LEDGER\.md$/i.test(file));

if (!ledgers.length) {
  console.log('Watch research history check: no changed watch ledgers.');
  process.exit(0);
}

if (!changed.includes('CHANGE_DECISIONS.md')) {
  console.error('Watch research history check failed: Ledger changes require CHANGE_DECISIONS.md.');
  process.exit(1);
}

for (const file of ledgers) {
  const diff = git('diff', '--unified=0', `${mergeBase}...HEAD`, '--', file);
  if (!/^\+### \d{4}-\d{2}-\d{2} \d{2}:\d{2} JST — /m.test(diff)) {
    console.error(`Watch research history check failed: ${file} needs a newly added JST decision-event heading.`);
    process.exit(1);
  }
  const isNew = git('diff', '--diff-filter=A', '--name-only', `${mergeBase}...HEAD`, '--', file) === file;
  if (isNew) {
    const text = readFileSync(file, 'utf8');
    const required = ['watch_id', 'created_at', '## Decision events', '**主張**', '**証拠**', '**理由**', '**公開影響**', '**再検討条件**', '**関連**'];
    for (const token of required) if (!text.includes(token)) {
      console.error(`Watch research history check failed: new Ledger ${file} is missing ${token}.`);
      process.exit(1);
    }
  }
}

console.log(`Watch research history check passed: ${ledgers.length} changed Ledger(s).`);
