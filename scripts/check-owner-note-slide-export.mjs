import { readFileSync } from 'node:fs';
import { readPngDimensions, validateManifest } from './export-owner-note-slides.mjs';

const fail = (message) => {
  console.error('OWNER\'S NOTE slide export check failed: ' + message);
  process.exitCode = 1;
};
const requireText = (text, needle, label) => {
  if (!text.includes(needle)) fail(label + ' is missing: ' + needle);
};

const manifest = JSON.parse(readFileSync('tools/owner-note-slides/manifest.json', 'utf8'));
const readme = readFileSync('tools/owner-note-slides/README.md', 'utf8');
const workflow = readFileSync('.github/workflows/export-owner-note-slides.yml', 'utf8');
const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
const state = readFileSync('PROJECT_STATE.md', 'utf8');

try {
  validateManifest(manifest);
} catch (error) {
  fail(error.message);
}

if (manifest.presentationId !== '1Lcz0CEZncDw1GncI4RMY6qDmfO4Fknq4NvpGtBZAaLk') {
  fail('canonical presentationId drifted');
}
if (
  manifest.expected.width !== 1600 ||
  manifest.expected.height !== 2233 ||
  manifest.expected.mimeType !== 'image/png' ||
  manifest.expected.thumbnailSize !== 'LARGE'
) {
  fail('export contract must remain LARGE PNG at exactly 1600x2233');
}

const expectedSlides = new Map([
  ['pierce-duofon-ja', 'p'],
  ['pierce-duofon-en', 'duofon_en_slide'],
  ['pierce-duofon-de', 'duofon_de_slide'],
  ['basis-alarm-ja', 'basis_slide'],
  ['basis-alarm-en', 'basis_en_slide'],
  ['basis-alarm-de', 'basis_de_slide'],
  ['citizen-alarm-ja', 'citizen_slide'],
  ['citizen-alarm-en', 'citizen_en_slide'],
  ['citizen-alarm-de', 'citizen_de_slide'],
  ['westclox-watchlarm-ja', 'westclox_slide'],
  ['westclox-watchlarm-en', 'westclox_en_slide'],
  ['westclox-watchlarm-de', 'westclox_de_slide'],
  ['cyma-time-o-vox-ja', 'cyma_slide'],
  ['cyma-time-o-vox-en', 'cyma_en_slide'],
  ['cyma-time-o-vox-de', 'cyma_de_slide'],
  ['wittnauer-10wa-ja', 'wittnauer_ja_slide'],
  ['wittnauer-10wa-en', 'wittnauer_en_slide'],
  ['wittnauer-10wa-de', 'wittnauer_de_slide']
]);

if (manifest.slides.length !== expectedSlides.size) {
  fail('manifest must contain the current 18 JA/EN/DE slides');
}
const actualByKey = new Map(manifest.slides.map((slide) => [slide.key, slide]));
for (const [key, objectId] of expectedSlides) {
  const slide = actualByKey.get(key);
  if (!slide) {
    fail('manifest is missing ' + key);
    continue;
  }
  if (slide.objectId !== objectId) fail(key + ' objectId drifted from current Google Slides reality');
}

const languagesByWatch = new Map();
for (const slide of manifest.slides) {
  const set = languagesByWatch.get(slide.watch) || new Set();
  set.add(slide.language);
  languagesByWatch.set(slide.watch, set);
}
if (languagesByWatch.size !== 6) fail('manifest must cover six current WATCHes');
for (const [watch, languages] of languagesByWatch) {
  if (['ja', 'en', 'de'].some((lang) => !languages.has(lang))) {
    fail(watch + ' does not have JA/EN/DE export entries');
  }
}

const fixture = Buffer.alloc(24);
Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]).copy(fixture, 0);
fixture.write('IHDR', 12, 'ascii');
fixture.writeUInt32BE(1600, 16);
fixture.writeUInt32BE(2233, 20);
try {
  const dimensions = readPngDimensions(fixture);
  if (dimensions.width !== 1600 || dimensions.height !== 2233) {
    fail('PNG dimension parser self-test returned wrong dimensions');
  }
} catch (error) {
  fail('PNG dimension parser self-test failed: ' + error.message);
}

for (const script of ['owner-note-slides:list', 'owner-note-slides:export', 'check:slide-export']) {
  if (!packageJson.scripts?.[script]) fail('package.json is missing script ' + script);
}
requireText(packageJson.scripts?.['check:quality'] || '', 'check:slide-export', 'check:quality');
requireText(workflow, 'workflow_dispatch:', 'export workflow');
requireText(workflow, 'GOOGLE_SERVICE_ACCOUNT_JSON', 'export workflow secret');
requireText(workflow, 'actions/upload-artifact@v4', 'export workflow artifact upload');
requireText(workflow, 'artifacts/owner-note-slides', 'export workflow output path');
requireText(readme, '1600 × 2233', 'export README dimensions');
requireText(readme, 'GOOGLE_SERVICE_ACCOUNT_JSON', 'export README auth');
requireText(state, 'tools/owner-note-slides/README.md', 'PROJECT_STATE exporter pointer');

if (!process.exitCode) {
  console.log('OWNER\'S NOTE slide export check passed: canonical private deck, 18 JA/EN/DE slide IDs, exact 1600x2233 PNG contract, workflow and runtime pointers are aligned.');
}
