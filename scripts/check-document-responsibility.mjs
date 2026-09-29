import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const topDocs = ['PROJECT.md', 'AGENTS.md', 'PROJECT_STATE.md'];
const allowedH2 = {
  'PROJECT.md': [
    '0. 最優先',
    '1. 「焼いて」/ Council は絶対に独自解釈しない',
    '2. 分野別ルーティング',
    '3. SNS / Analytics / VA運用',
    '4. 変更履歴と日時',
    '5. 実行と検証',
    '6. 回答前の強制チェック'
  ],
  'AGENTS.md': [
    '起動時の実行チェック',
    '基本動作',
    '日時付き判断履歴 — 必須',
    '公開変更の原子性とデプロイ監査',
    '作業中 / 本番 / 公開の区別',
    '変更と検証',
    'Council / 焼いて V2',
    'コンテキスト節約',
    '状態更新'
  ],
  'PROJECT_STATE.md': [
    '1. CURRENT GOAL',
    '2. SOURCE OF TRUTH',
    '3. CURRENT BASELINE',
    '4. DO NOT CHANGE WITHOUT EXPLICIT INSTRUCTION',
    '5. CURRENT STATE SEMANTICS',
    '6. ACTIVE WORK / CURRENT OBSERVATION POINTERS',
    '7. SUPERSEDED / REJECTED BASELINES',
    '8. OPEN ISSUES',
    '9. COMPLETION CONDITIONS',
    '10. STARTUP ROUTING'
  ]
};

const errors = [];
const contents = Object.fromEntries(topDocs.map((file) => [file, readFileSync(file, 'utf8')]));

for (const file of topDocs) {
  const headings = contents[file]
    .split(/\r?\n/)
    .filter((line) => /^## (?!#)/.test(line))
    .map((line) => line.slice(3).trim());
  const expected = allowedH2[file];
  const unexpected = headings.filter((heading) => !expected.includes(heading));
  const missing = expected.filter((heading) => !headings.includes(heading));
  if (unexpected.length) errors.push(`${file}: 未登録の第2階層見出し: ${unexpected.join(' / ')}`);
  if (missing.length) errors.push(`${file}: 必須の責務見出しが欠落: ${missing.join(' / ')}`);

  for (const line of contents[file].split(/\r?\n/)) {
    if (/^#{2,6} \d{4}-\d{2}-\d{2} \d{2}:\d{2} JST\b/.test(line)) {
      errors.push(`${file}: 日時付き履歴は CHANGE_DECISIONS.md または監査ログへ保存: ${line}`);
    }
    if (/^#{3,6} .*\b(?:ADOPTED|REJECTED|HOLD|CONFLICT|OBSOLETE|OPEN)\b/.test(line)) {
      errors.push(`${file}: 時計固有の採否イベントは research/*_LEDGER.md へ保存: ${line}`);
    }
  }
}

const runGit = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const baseName = process.env.GITHUB_BASE_REF || process.argv[2] || 'main';
let baseRef = `origin/${baseName}`;
try {
  runGit('rev-parse', '--verify', baseRef);
} catch {
  baseRef = baseName;
}
const mergeBase = runGit('merge-base', 'HEAD', baseRef);

const normalize = (line) => line.trim().replace(/\s+/g, ' ');
const intentionalMirror = (line) =>
  /^(?:[-*]|\d+\.) /.test(line) && (line.includes('→') || /^\d+\. `/.test(line));
const candidates = new Map();

for (const file of topDocs) {
  const diff = runGit('diff', '--unified=0', `${mergeBase}...HEAD`, '--', file);
  const added = diff
    .split('\n')
    .filter((line) => line.startsWith('+') && !line.startsWith('+++'))
    .map((line) => normalize(line.slice(1)))
    .filter((line) => line.length >= 60 && !line.startsWith('#') && !intentionalMirror(line));

  for (const line of new Set(added)) {
    const presentIn = topDocs.filter((other) =>
      contents[other].split(/\r?\n/).some((candidate) => normalize(candidate) === line)
    );
    if (presentIn.length > 1) candidates.set(line, presentIn);
  }
}

for (const [line, files] of candidates) {
  errors.push(`上位文書間の新規完全重複 (${files.join(', ')}): ${line}`);
}

if (errors.length) {
  console.error('Document responsibility check failed.');
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  console.error('DOCUMENT_OWNERSHIP.md の責務表に従い、履歴・研究・監査・分野別正本へ移してください。');
  process.exit(1);
}

console.log('Document responsibility check passed: top-level responsibilities, history placement, and new exact duplicates are valid.');
