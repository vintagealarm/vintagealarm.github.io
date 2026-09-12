import fs from 'node:fs';
import path from 'node:path';
import { readWatchPublicationState } from './watch-publication.mjs';

const root = process.cwd();
const dist = path.join(root, 'dist');
const watches = readWatchPublicationState();
const failures = [];
const mustExist = [
  'index.html',
  'history/index.html',
  'history/smartwatch/index.html',
  'owners-notes/index.html',
  'robots.txt',
  'sitemap.xml'
];

for (const rel of mustExist) {
  if (!fs.existsSync(path.join(dist, rel))) failures.push(`missing file: dist/${rel}`);
}

for (const watch of watches) {
  const route = path.join(dist, watch.slug, 'index.html');
  if (watch.published && !fs.existsSync(route)) failures.push(`${watch.slug}: published route missing`);
  if (!watch.published && fs.existsSync(route)) failures.push(`${watch.slug}: unpublished route was generated`);
}

const ownersHtml = fs.existsSync(path.join(dist, 'owners-notes/index.html'))
  ? fs.readFileSync(path.join(dist, 'owners-notes/index.html'), 'utf8')
  : '';
const sitemap = fs.existsSync(path.join(dist, 'sitemap.xml'))
  ? fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8')
  : '';

for (const watch of watches) {
  const href = `${watch.slug}/`;
  if (watch.published) {
    if (!ownersHtml.includes(`${watch.slug}/#owners-note`)) failures.push(`${watch.slug}: missing from OWNER'S NOTES`);
    if (!sitemap.includes(`https://vintagealarm.github.io/${href}`)) failures.push(`${watch.slug}: missing from sitemap`);
  } else {
    if (ownersHtml.includes(`${watch.slug}/#owners-note`)) failures.push(`${watch.slug}: unpublished OWNER'S NOTE leaked into directory`);
    if (sitemap.includes(`https://vintagealarm.github.io/${href}`)) failures.push(`${watch.slug}: unpublished route leaked into sitemap`);
  }
}

const pagesConfig = fs.readFileSync(path.join(root, '.pages.yml'), 'utf8');
for (const marker of ['name: published', '公開（OFFで下書き）', 'label: HISTORY 本文・MILESTONES', 'HISTORY・一覧サムネ画像']) {
  if (!pagesConfig.includes(marker)) failures.push(`Pages CMS marker missing: ${marker}`);
}

for (const file of fs.readdirSync(dist, { recursive: true }).filter((file) => String(file).endsWith('.html'))) {
  const html = fs.readFileSync(path.join(dist, file), 'utf8');
  if (/data:image\/.*base64/.test(html)) failures.push(`${file}: embedded base64 image remains`);
}

if (fs.existsSync(path.join(dist, 'cyma-time-o-vox/owners-note/index.html'))) {
  const html = fs.readFileSync(path.join(dist, 'cyma-time-o-vox/owners-note/index.html'), 'utf8');
  if (!html.includes('noindex,follow')) failures.push('Cyma enlargement page lost noindex,follow');
}

if (failures.length) {
  console.error('Build output validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Build output publication check: PASS — ${watches.filter((watch) => watch.published).length} published, ${watches.filter((watch) => !watch.published).length} unpublished.`);
