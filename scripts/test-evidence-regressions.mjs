// Isolated failure-injection tests for known factual and social-data regressions.
// Reads current canonical fixtures; never mutates tracked source files.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'va-evidence-gates-'));
const p = (relative) => path.join(fixture, relative);
const get = (relative) => fs.readFileSync(p(relative), 'utf8');
const put = (relative, data) => {
  fs.mkdirSync(path.dirname(p(relative)), { recursive: true });
  fs.writeFileSync(p(relative), data);
};
const copy = (relative) => put(relative, fs.readFileSync(path.join(root, relative)));
const scripts = {
  spec: 'scripts/check-spec-evidence.mjs',
  localization: 'scripts/check-localization-sync.mjs',
  instagram: 'scripts/instagram-insights-timeseries.mjs',
};
function run(kind, expectedSuccess, signal = '') {
  const result = spawnSync(process.execPath, [path.join(root, scripts[kind]), ...(kind === 'instagram' ? ['check'] : [])], {
    cwd: fixture, encoding: 'utf8',
  });
  assert.equal(result.status, expectedSuccess ? 0 : 1, kind + ': ' + result.stdout + '\n' + result.stderr);
  if (signal) assert.ok((result.stdout + '\n' + result.stderr).includes(signal), 'Missing signal ' + signal + ': ' + result.stderr);
}
function replaceOne(relative, before, after, test) {
  const original = get(relative);
  assert.equal(original.split(before).length, 2, 'Fixture must be unique: ' + relative + ' / ' + before);
  put(relative, original.replace(before, after));
  try { test(); } finally { put(relative, original); }
}
try {
  const specManifest = JSON.parse(fs.readFileSync(path.join(root, 'src/data/spec-evidence-audit.json'), 'utf8'));
  const localizationManifest = JSON.parse(fs.readFileSync(path.join(root, 'src/data/localization-fact-sync.json'), 'utf8'));
  const files = new Set(['src/data/spec-evidence-audit.json', 'src/data/localization-fact-sync.json',
    'measurement/.internal/.virtual/social/instagram-insights-timeseries.md']);
  for (const entry of [...specManifest.checks, ...localizationManifest.facts]) {
    for (const target of [...(entry.sourceChecks || []), ...(entry.renderedChecks || [])]) files.add(target.path);
  }
  for (const file of files) copy(file);
  put('CHANGE_DECISIONS.md', '# Historical correction\nPreviously, 17石 was mistakenly recorded; current specimen is 19石.\n');

  // Baseline allows historical discussion while checking current values.
  run('spec', true);
  run('localization', true);
  run('instagram', true);
  replaceOne('src/content/watches/citizen-alarm.md',
    'jewels: 19石（掲載個体で確認）', 'jewels: 17石（掲載個体で確認）',
    () => run('spec', false, 'citizen-alarm-same-type-spec'));
  replaceOne('src/data/en-watch-entry.ts',
    "jewels: '19 jewels (confirmed on the shown specimen)'",
    "jewels: '17 jewels (confirmed on the shown specimen)'",
    () => run('localization', false, 'citizen'));
  replaceOne('src/data/de-watch-entry.ts',
    "jewels: '19 Steine (am gezeigten Exemplar bestätigt)'",
    "jewels: '17 Steine (am gezeigten Exemplar bestätigt)'",
    () => run('spec', false, 'citizen'));
  replaceOne('src/content/watches/citizen-alarm.md',
    'caseSize: 約34mm（同一ケース番号資料、リューズ除く）',
    'caseSize: 37mm（同型資料）',
    () => run('spec', false, 'citizen'));
  const instagramPath = 'measurement/.internal/.virtual/social/instagram-insights-timeseries.md';
  const snap = '### Snapshot — 2026-10-07 07:06–07:07 JST';
  replaceOne(instagramPath, snap,
    snap + '\n- observed_at_jst: 2026-10-07 07:06–07:07\n- source_status: CANONICAL_LOG_SCREENSHOT\n\n' + snap,
    () => run('instagram', false, 'duplicate observed_at_jst'));

  // Rejected SVG is forbidden as a public asset/reference, not as historical text.
  assert.equal(fs.existsSync(path.join(root, 'public/images/arsa-blind-alarm/tactile-alarm-comparison-v1.svg')), false,
    'Rejected ARSA SVG must not be restored as a public asset');
  assert.equal(fs.readFileSync(path.join(root, 'src/content/watches/arsa-blind-alarm.md'), 'utf8')
    .includes('tactile-alarm-comparison-v1.svg'), false, 'Rejected SVG must not be referenced by public copy');

  run('spec', true);
  run('localization', true);
  run('instagram', true);
  console.log('Evidence regression injections: PASS — JA/EN/DE 17-jewel, 37 mm, duplicate snapshot rejected; history retained; rejected SVG absent.');
} finally {
  fs.rmSync(fixture, { recursive: true, force: true });
}
