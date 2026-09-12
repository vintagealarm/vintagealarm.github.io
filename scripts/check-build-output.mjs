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
  'sitemap.xml',
  'googled3a96ed4c5eb9287.html'
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
const historyHtml = fs.existsSync(path.join(dist, 'history/index.html'))
  ? fs.readFileSync(path.join(dist, 'history/index.html'), 'utf8')
  : '';
const sitemap = fs.existsSync(path.join(dist, 'sitemap.xml'))
  ? fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8')
  : '';
const ownersDirectory = JSON.parse(fs.readFileSync(path.join(root, 'src/data/owners-directory.json'), 'utf8'));
const historyOwnerSlugs = new Set(ownersDirectory.entries.map((entry) => entry.historyId));

for (const watch of watches) {
  const href = `${watch.slug}/`;
  const historyHref = `${watch.slug}/#owners-note`;
  if (watch.published) {
    if (!ownersHtml.includes(historyHref)) failures.push(`${watch.slug}: missing from OWNER'S NOTES`);
    if (historyOwnerSlugs.has(watch.slug) && !historyHtml.includes(historyHref)) failures.push(`${watch.slug}: missing from HISTORY owner rail`);
    if (!sitemap.includes(`https://vintagealarm.github.io/${href}`)) failures.push(`${watch.slug}: missing from sitemap`);
  } else {
    if (ownersHtml.includes(historyHref)) failures.push(`${watch.slug}: unpublished OWNER'S NOTE leaked into directory`);
    if (historyHtml.includes(historyHref)) failures.push(`${watch.slug}: unpublished OWNER'S NOTE leaked into HISTORY`);
    if (sitemap.includes(`https://vintagealarm.github.io/${href}`)) failures.push(`${watch.slug}: unpublished route leaked into sitemap`);
  }
}

const cyma = watches.find((watch) => watch.slug === 'cyma-time-o-vox');
const cymaZoom = path.join(dist, 'cyma-time-o-vox', 'owners-note', 'index.html');
if (cyma?.published) {
  if (!fs.existsSync(cymaZoom)) failures.push('Cyma enlargement page missing while watch is published');
  else if (!fs.readFileSync(cymaZoom, 'utf8').includes('noindex,follow')) failures.push('Cyma enlargement page lost noindex,follow');
} else if (fs.existsSync(cymaZoom)) {
  failures.push('Cyma enlargement page was generated while watch is unpublished');
}

const pagesConfig = fs.readFileSync(path.join(root, '.pages.yml'), 'utf8');
for (const marker of ['name: published', '公開（OFFで下書き）', 'label: HISTORY 本文・MILESTONES', 'label: Watches']) {
  if (!pagesConfig.includes(marker)) failures.push(`Pages CMS marker missing: ${marker}`);
}
if (pagesConfig.includes('name: ownersDirectory')) {
  failures.push('Pages CMS must not expose duplicate OWNER directory metadata');
}

for (const file of fs.readdirSync(dist, { recursive: true }).filter((file) => String(file).endsWith('.html'))) {
  const html = fs.readFileSync(path.join(dist, file), 'utf8');
  if (/data:image\/.*base64/.test(html)) failures.push(`${file}: embedded base64 image remains`);
}

if (failures.length) {
  console.error('Build output validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Build output publication check: PASS — ${watches.filter((watch) => watch.published).length} published, ${watches.filter((watch) => !watch.published).length} unpublished.`);
