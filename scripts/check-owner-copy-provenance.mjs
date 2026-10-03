import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const runGit = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();

function extractTopLevelBlock(source, key) {
  const lines = String(source || '').split(/\r?\n/);
  const start = lines.findIndex((line) => line === `${key}:`);
  if (start < 0) return '';
  const out = [];
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (line && !/^\s/.test(line)) break;
    out.push(line.replace(/\s+$/u, ''));
  }
  return out.join('\n').trim();
}

function extractOwnersLead(source) {
  const lines = String(source || '').split(/\r?\n/);
  const owners = lines.findIndex((line) => line === 'ownersNote:');
  if (owners < 0) return '';
  const lead = lines.findIndex((line, index) => index > owners && line === '  lead:');
  if (lead < 0) return '';
  const out = [];
  for (let i = lead + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (/^  [A-Za-z0-9_"'-][^:]*:\s*/u.test(line)) break;
    out.push(line.replace(/\s+$/u, ''));
  }
  return out.join('\n').trim();
}

function ownerCopySnapshot(source) {
  return JSON.stringify({
    catch: extractTopLevelBlock(source, 'catch'),
    lead: extractOwnersLead(source)
  });
}

function hasProtocolMarkers(block) {
  return ['**対象WATCH**', '**起点・帰属**', '**VA温度比較**', '**採否・現在状態**']
    .every((marker) => block.includes(marker));
}

function selfTest() {
  const base = `---
slug: sample
published: true
catch:
  - 触ってわかる。
ownersNote:
  image: /x.png
  lead:
    - 触ってわかる。
    - 鳴って知らせる。
  guideTitle: 簡易操作ガイド
  note:
    - note
spec:
  era: 1950s
---`;
  const noteOnly = base.replace('    - note', '    - changed note');
  const catchChanged = base.replace('  - 触ってわかる。', '  - 開けて、触って、聞く。');
  const leadChanged = base.replace('    - 鳴って知らせる。', '    - 音でも知らせる。');

  if (ownerCopySnapshot(base) !== ownerCopySnapshot(noteOnly)) {
    throw new Error('self-test failed: NOTE-only edit must not count as Catch/Lead change');
  }
  if (ownerCopySnapshot(base) === ownerCopySnapshot(catchChanged)) {
    throw new Error('self-test failed: catch edit was not detected');
  }
  if (ownerCopySnapshot(base) === ownerCopySnapshot(leadChanged)) {
    throw new Error('self-test failed: ownersNote.lead edit was not detected');
  }
  const compliant = `### x
- **対象WATCH**: sample
- **起点・帰属**: USER
- **VA温度比較**: current published set
- **採否・現在状態**: WORKING_MAIN`;
  if (!hasProtocolMarkers(compliant)) {
    throw new Error('self-test failed: compliant decision block rejected');
  }
  if (hasProtocolMarkers(compliant.replace('**VA温度比較**', '**温度**'))) {
    throw new Error('self-test failed: incomplete decision block accepted');
  }
  console.log('Owner copy provenance self-test passed.');
}

if (process.argv.includes('--self-test')) {
  selfTest();
  process.exit(0);
}

const baseName = process.env.GITHUB_BASE_REF || process.argv[2] || 'main';
let baseRef = `origin/${baseName}`;
try {
  runGit('rev-parse', '--verify', baseRef);
} catch {
  baseRef = baseName;
}
const mergeBase = runGit('merge-base', 'HEAD', baseRef);

const changed = runGit('diff', '--name-only', `${mergeBase}...HEAD`)
  .split('\n')
  .map((value) => value.trim())
  .filter(Boolean);

const watchFiles = changed.filter((file) => /^src\/content\/watches\/[^/]+\.md$/u.test(file));
const copyChanged = [];

for (const file of watchFiles) {
  let before = '';
  try {
    before = runGit('show', `${mergeBase}:${file}`);
  } catch {
    before = '';
  }
  const after = existsSync(file) ? readFileSync(file, 'utf8') : '';
  if (ownerCopySnapshot(before) !== ownerCopySnapshot(after)) copyChanged.push(file);
}

if (copyChanged.length === 0) {
  console.log('Owner copy provenance check: no Catch/Lead changes.');
  process.exit(0);
}

if (!changed.includes('CHANGE_DECISIONS.md')) {
  console.error('Owner copy provenance check failed: Catch/Lead changed without CHANGE_DECISIONS.md.');
  console.error(copyChanged.map((file) => `- ${file}`).join('\n'));
  process.exit(1);
}

const diff = runGit('diff', '--unified=0', `${mergeBase}...HEAD`, '--', 'CHANGE_DECISIONS.md');
const added = diff
  .split('\n')
  .filter((line) => line.startsWith('+') && !line.startsWith('+++'))
  .map((line) => line.slice(1))
  .join('\n');

const decisionBlocks = added
  .split(/(?=^### \d{4}-\d{2}-\d{2} \d{2}:\d{2} JST — )/mu)
  .filter((block) => /^### \d{4}-\d{2}-\d{2} \d{2}:\d{2} JST — /u.test(block))
  .filter(hasProtocolMarkers);

if (decisionBlocks.length === 0) {
  console.error('Owner copy provenance check failed: Catch/Lead changes require a new decision entry with all four markers:');
  console.error('- **対象WATCH**');
  console.error('- **起点・帰属**');
  console.error('- **VA温度比較**');
  console.error('- **採否・現在状態**');
  process.exit(1);
}

for (const file of copyChanged) {
  const slug = path.basename(file, '.md');
  if (!decisionBlocks.some((block) => block.includes(slug) || block.includes(file))) {
    console.error(`Owner copy provenance check failed: no compliant decision entry names changed WATCH "${slug}".`);
    process.exit(1);
  }
}

console.log(`Owner copy provenance check passed: ${copyChanged.length} Catch/Lead file(s) documented.`);
