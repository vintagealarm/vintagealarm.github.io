import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

// Copy HTML, link immutable assets. Never mutate the real build or source.
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'va-quality-'));
function copy(dir, target) {
  fs.mkdirSync(target, { recursive: true });
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const src = path.join(dir, entry.name), dst = path.join(target, entry.name);
    if (entry.isDirectory()) copy(src, dst);
    else if (entry.name.endsWith('.html')) fs.copyFileSync(src, dst);
    else fs.symlinkSync(src, dst);
  }
}
function run(script, success, reason) {
  const result = spawnSync(process.execPath, [`scripts/${script}.mjs`, fixture], { encoding: 'utf8' });
  assert.equal(result.status, success ? 0 : 1, result.stdout + result.stderr);
  if (reason) assert.ok(result.stderr.includes(reason), result.stderr);
}
try {
  copy(path.resolve('dist'), fixture);
  const home = path.join(fixture, 'index.html'), original = fs.readFileSync(home, 'utf8');
  run('check-internal-links', true); run('check-seo', true);
  for (const [markup, message] of [
    ['<a href="/does-not-exist/">test</a>', 'missing file/page'],
    ['<a href="/history/#does-not-exist">test</a>', 'missing fragment'],
    ['<img src="/images/does-not-exist.png">', 'missing file/page'],
    ['<img srcset="/images/does-not-exist.png 1x, /images/also-missing.png 2x">', 'missing file/page']
  ]) {
    fs.writeFileSync(home, original.replace('</body>', markup + '</body>'));
    run('check-internal-links', false, message);
  }
  fs.writeFileSync(home, original.replace('rel="canonical" href="https://vintagealarm.github.io/"', 'rel="canonical" href="https://orima1995-create.github.io/orima1995-creator.github.io/"'));
  run('check-seo', false, 'canonical must be');
  fs.writeFileSync(home, original.replace(/<meta name="description"[^>]*>/, ''));
  run('check-seo', false, 'description');
  fs.writeFileSync(home, original.replace('</body>', '<a href="mailto:test@example.com">mail</a><a href="tel:123">phone</a><a href="https://example.com/missing#fragment">external</a></body>'));
  run('check-internal-links', true);
  fs.writeFileSync(home, original);
  run('check-internal-links', true); run('check-seo', true);
  console.log('Quality gate regression tests: PASS — URL, fragment, asset, srcset, canonical, description, exclusions and restored output');
} finally {
  fs.rmSync(fixture, { recursive: true, force: true });
}
