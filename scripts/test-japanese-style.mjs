import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'va-japanese-style-'));
const checker = path.resolve('scripts/check-japanese-style.mjs');

function write(name, content) {
  const file = path.join(fixture, name);
  fs.writeFileSync(file, content, 'utf8');
  return file;
}

function run(file) {
  return spawnSync(process.execPath, [checker, file], { encoding: 'utf8' });
}

try {
  const good = write('good.md', [
    '# TEST',
    '',
    '掲載個体では60回の操作で12時間を一周した。文献には15分刻みの記載がある。',
    '両者が異なる理由は未確認で、個体差・仕様差・資料差のどれかは確定できない。',
  ].join('\n'));
  const goodResult = run(good);
  assert.equal(goodResult.status, 0, goodResult.stdout + goodResult.stderr);

  const bad = write('bad.md', '重要なのは、結論を分かりやすく見せることです。\n');
  const badResult = run(bad);
  assert.equal(badResult.status, 1, badResult.stdout + badResult.stderr);
  assert.ok(badResult.stderr.includes('結論の予告'), badResult.stderr);
  assert.ok(badResult.stderr.includes('該当文を丸ごと見直す'), badResult.stderr);

  const warningOnly = write('warning.md', [
    'AではなくBを選ぶ。',
    'CではなくDを選ぶ。',
    'EではなくFを選ぶ。',
    'ここでは差そのものが論点なので、検査は警告だけに留める。',
  ].join('\n'));
  const warningResult = run(warningOnly);
  assert.equal(warningResult.status, 0, warningResult.stdout + warningResult.stderr);
  assert.ok(warningResult.stderr.includes('Japanese style warnings'), warningResult.stderr);

  const fenced = write('fenced.md', [
    '# EXAMPLE',
    '',
    '```text',
    '重要なのは、この文字列が例示であることです。',
    '```',
    '',
    'コード例の外には検査対象となる本文がある。',
  ].join('\n'));
  const fencedResult = run(fenced);
  assert.equal(fencedResult.status, 0, fencedResult.stdout + fencedResult.stderr);

  console.log('Japanese style regression tests: PASS — hard gate, warning-only rule, fenced-code exclusion');
} finally {
  fs.rmSync(fixture, { recursive: true, force: true });
}
