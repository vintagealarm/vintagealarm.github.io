import fs from 'node:fs';
import path from 'node:path';
import { readWatchPublicationState } from './watch-publication.mjs';

const root = process.cwd();
const dist = path.join(root, 'dist');
const watches = readWatchPublicationState();
const failures = [];
const mustExist = [
  'index.html',
  'x/index.html',
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

const homeHtml = fs.existsSync(path.join(dist, 'index.html'))
  ? fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
  : '';
const xHtml = fs.existsSync(path.join(dist, 'x/index.html'))
  ? fs.readFileSync(path.join(dist, 'x/index.html'), 'utf8')
  : '';
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
const researchSettings = JSON.parse(fs.readFileSync(path.join(root, 'src/data/research-settings.json'), 'utf8'));
const howTheyRingRelease = JSON.parse(fs.readFileSync(path.join(root, 'src/data/how-they-ring-settings.json'), 'utf8'));
const historyOwnerSlugs = new Set(ownersDirectory.entries.map((entry) => entry.historyId));
const researchDir = path.join(root, 'src/data/watch-research');
const researchSlugs = new Set(
  fs.existsSync(researchDir)
    ? fs.readdirSync(researchDir)
        .filter((file) => file.endsWith('.json'))
        .map((file) => path.basename(file, '.json'))
    : []
);

for (const watch of watches) {
  const href = `${watch.slug}/`;
  const historyHref = `${watch.slug}/#owners-note`;
  const route = path.join(dist, watch.slug, 'index.html');
  if (watch.published) {
    if (!ownersHtml.includes(historyHref)) failures.push(`${watch.slug}: missing from OWNER'S NOTES`);
    if (historyOwnerSlugs.has(watch.slug) && !historyHtml.includes(historyHref)) failures.push(`${watch.slug}: missing from HISTORY owner rail`);
    if (!sitemap.includes(`https://vintagealarm.github.io/${href}`)) failures.push(`${watch.slug}: missing from sitemap`);
    const sitemapEntryPattern = new RegExp(
      `<url><loc>https://vintagealarm\\.github\\.io/${watch.slug}/</loc><lastmod>\\d{4}-\\d{2}-\\d{2}</lastmod></url>`
    );
    if (!sitemapEntryPattern.test(sitemap)) failures.push(`${watch.slug}: sitemap lastmod missing or invalid`);

    if (fs.existsSync(route)) {
      const watchHtml = fs.readFileSync(route, 'utf8');
      if (!watchHtml.includes('"@type":"Article"')) failures.push(`${watch.slug}: Japanese WATCH lost Article JSON-LD`);
      if (!watchHtml.includes('"headline":')) failures.push(`${watch.slug}: Article headline missing`);
      if (!/"dateModified":"\d{4}-\d{2}-\d{2}"/.test(watchHtml)) failures.push(`${watch.slug}: Article dateModified missing or invalid`);
      if (!watchHtml.includes('"author":{"@type":"Organization","name":"VINTAGE ALARM"')) failures.push(`${watch.slug}: Article author missing or invalid`);

      const hasResearchRecord = watchHtml.includes('data-research-record');
      if (researchSlugs.has(watch.slug) && !hasResearchRecord) {
        failures.push(`${watch.slug}: registered research record missing from generated WATCH`);
      }
      if (!researchSlugs.has(watch.slug) && hasResearchRecord) {
        failures.push(`${watch.slug}: research record leaked without registered metadata`);
      }
    }
  } else {
    if (ownersHtml.includes(historyHref)) failures.push(`${watch.slug}: unpublished OWNER'S NOTE leaked into directory`);
    if (historyHtml.includes(historyHref)) failures.push(`${watch.slug}: unpublished OWNER'S NOTE leaked into HISTORY`);
    if (sitemap.includes(`https://vintagealarm.github.io/${href}`)) failures.push(`${watch.slug}: unpublished route leaked into sitemap`);
  }
}

const sharedLandingMarkers = [
  '通知が、まだ歯車だった頃。',
  'スマホも電池も使わず、決めた時刻を腕の上で知らせる。',
  'なぜ腕時計は鳴るようになった？',
  '実物を巻いて、鳴らして、確かめる。'
];
for (const [name, html] of [['TOP', homeHtml], ['X', xHtml]]) {
  for (const marker of sharedLandingMarkers) {
    if (!html.includes(marker)) failures.push(`${name}: shared landing marker missing: ${marker}`);
  }
}
for (const stale of ['鐘から現在まで。アラーム腕時計の歴史を読む', '所有個体を、実機・操作・音から読む']) {
  if (xHtml.includes(stale)) failures.push(`X: stale duplicated TOP copy remains: ${stale}`);
}
if (!xHtml.includes('noindex,follow')) failures.push('X: profile entry route lost noindex,follow');

if (researchSettings.published) {
  if (!homeHtml.includes('history/#research')) failures.push('RESEARCH published but TOP link is missing');
  if (!xHtml.includes('history/#research')) failures.push('RESEARCH published but X entry link is missing');
  if (!historyHtml.includes('id="research"')) failures.push('RESEARCH published but HISTORY section is missing');
} else {
  for (const [name, html] of [['TOP', homeHtml], ['X', xHtml], ['HISTORY', historyHtml], ["OWNER'S NOTES", ownersHtml]]) {
    if (html.includes('history/#research') || html.includes('id="research"')) {
      failures.push(`${name}: unpublished RESEARCH leaked into generated HTML`);
    }
  }
}

if (historyHtml.includes('ja-phrase')) {
  failures.push('HISTORY: legacy nowrap phrase wrappers remain in generated HTML');
}
if (!ownersHtml.includes('c.1959–early 1960s')) {
  failures.push("OWNER'S NOTES: compact Westclox uncertain-era label is missing");
}
if (ownersHtml.includes('id="owners-1950年代末〜1960年代初頭"')) {
  failures.push("OWNER'S NOTES: long Westclox uncertain-era range leaked back into a section heading");
}

const cymaHtmlPath = path.join(dist, 'cyma-time-o-vox', 'index.html');
if (fs.existsSync(cymaHtmlPath)) {
  const cymaHtml = fs.readFileSync(cymaHtmlPath, 'utf8');
  const fortisIndex = cymaHtml.indexOf('Fortis Manager');
  const citationIndex = fortisIndex >= 0 ? cymaHtml.indexOf('href="#source-2"', fortisIndex) : -1;
  if (fortisIndex < 0 || citationIndex < 0 || citationIndex - fortisIndex > 900) {
    failures.push('Cyma: Beitl source 2 is not attached to the chronometer comparison paragraph');
  }

  const sourceIndex = cymaHtml.indexOf('id="source-1"');
  const researchIndex = cymaHtml.indexOf('data-research-record');
  const revisionIndex = cymaHtml.indexOf('data-revision-record');
  if (!(sourceIndex >= 0 && sourceIndex < researchIndex && researchIndex < revisionIndex)) {
    failures.push('Cyma: evidence order must remain SOURCES → RESEARCH NOTE → REVISION');
  }
  for (const marker of ['RESEARCH NOTE', '文献確認', 'n=1（掲載個体）', 'REVISION']) {
    if (!cymaHtml.includes(marker)) failures.push(`Cyma: research evidence marker missing: ${marker}`);
  }
}

const cyma = watches.find((watch) => watch.slug === 'cyma-time-o-vox');
const cymaZoom = path.join(dist, 'cyma-time-o-vox', 'owners-note', 'index.html');
if (cyma?.published) {
  if (!fs.existsSync(cymaZoom)) failures.push('Cyma enlargement page missing while watch is published');
  else if (!fs.readFileSync(cymaZoom, 'utf8').includes('noindex,follow')) failures.push('Cyma enlargement page lost noindex,follow');
} else if (fs.existsSync(cymaZoom)) {
  failures.push('Cyma enlargement page was generated while Cyma is unpublished');
}

const pagesConfig = fs.readFileSync(path.join(root, '.pages.yml'), 'utf8');
for (const marker of [
  'name: published',
  '公開（OFFで下書き）',
  'label: HISTORY 本文・MILESTONES',
  'label: Watches',
  'name: howTheyRingRelease',
  'path: src/data/how-they-ring-settings.json',
  'label: 本番公開する',
  'name: showOnTop',
  'label: TOPに「HOW THEY RING」を表示',
  'name: howTheyRing',
  'path: src/content/how-they-ring',
  'name: ownerDirectory',
  'name: ownedGroup',
  'name: fallbackThumbnail'
]) {
  if (!pagesConfig.includes(marker)) failures.push(`Pages CMS marker missing: ${marker}`);
}


// HOW THEY RING production release gate + CMS entrance.
const soundProdPath = path.join(dist, 'how-they-ring', 'index.html');
const adminPath = path.join(dist, 'admin', 'index.html');
const soundProdHtml = fs.existsSync(soundProdPath) ? fs.readFileSync(soundProdPath, 'utf8') : '';
const adminHtml = fs.existsSync(adminPath) ? fs.readFileSync(adminPath, 'utf8') : '';
const soundProdUrl = 'https://vintagealarm.github.io/how-they-ring/';

if (!fs.existsSync(adminPath)) failures.push('CMS admin entrance missing: dist/admin/index.html');
if (adminHtml && !adminHtml.includes('https://app.pagescms.org/')) failures.push('CMS admin entrance does not target hosted Pages CMS');
if (adminHtml && !adminHtml.includes('noindex,nofollow,noarchive')) failures.push('CMS admin entrance lost noindex');

if (howTheyRingRelease.productionPublished) {
  if (!fs.existsSync(soundProdPath)) failures.push('HOW THEY RING: production release ON but route is missing');
  if (!sitemap.includes(soundProdUrl)) failures.push('HOW THEY RING: production release ON but sitemap entry is missing');
  if (soundProdHtml.includes('noindex,nofollow,noarchive')) failures.push('HOW THEY RING: production release ON but page is still noindex');
  if (soundProdHtml.includes('非公開プレビュー')) failures.push('HOW THEY RING: production release ON but preview label leaked');
  if (!soundProdHtml.includes('HOW THEY RING')) failures.push('HOW THEY RING: production release ON but gallery content is missing');
  for (const stale of ['鳴らし方で見る、', '音と鳴らし方で時計を見る']) {
    if (soundProdHtml.includes(stale)) failures.push(`HOW THEY RING: stale hero copy remains: ${stale}`);
  }
  for (const marker of ['音で見る、', 'アラーム腕時計。', '棒状の音バネを叩く', 'category-tap', 'TAP', 'section-menu', 'href=\"/\"']) {
    if (!soundProdHtml.includes(marker)) failures.push(`HOW THEY RING: current production marker missing: ${marker}`);
  }
} else {
  if (sitemap.includes(soundProdUrl)) failures.push('HOW THEY RING: production release OFF but sitemap entry leaked');
  if (soundProdHtml.includes('data-specimen')) failures.push('HOW THEY RING: production release OFF but gallery content leaked');
}

const shouldShowSoundOnTop = howTheyRingRelease.productionPublished && howTheyRingRelease.showOnTop;
for (const [name, html] of [['TOP', homeHtml], ['X', xHtml]]) {
  const hasTopLink = html.includes('how-they-ring/') && html.includes('HOW THEY RING');
  if (shouldShowSoundOnTop && !hasTopLink) {
    failures.push(`${name}: HOW THEY RING is enabled for TOP but the HOW THEY RING link is missing`);
  }
  if (!shouldShowSoundOnTop && hasTopLink) {
    failures.push(`${name}: hidden HOW THEY RING TOP link leaked into generated HTML`);
  }
}

const soundGalleryDir = path.join(root, 'src/content/how-they-ring');
const soundGallerySlugs = [
  'basis-alarm', 'citizen-alarm', 'cyma-time-o-vox',
  'pierce-duofon', 'westclox-watchlarm', 'wittnauer-10wa'
];
const soundGalleryFiles = fs.readdirSync(soundGalleryDir).filter((file) => file.endsWith('.md')).sort();
if (JSON.stringify(soundGalleryFiles) !== JSON.stringify(soundGallerySlugs.map((slug) => `${slug}.md`))) {
  failures.push(`Independent sound gallery CMS entries differ from the six published watches: ${soundGalleryFiles.join(', ')}`);
}
for (const slug of soundGallerySlugs) {
  const entryPath = path.join(soundGalleryDir, `${slug}.md`);
  if (fs.existsSync(entryPath) && !new RegExp(`^watchSlug: ${slug}\\r?$`, 'm').test(fs.readFileSync(entryPath, 'utf8'))) {
    failures.push(`Sound gallery CMS entry is linked to the wrong watch: ${slug}`);
  }
}

for (const file of fs.readdirSync(dist, { recursive: true }).filter((file) => String(file).endsWith('.html'))) {
  const html = fs.readFileSync(path.join(dist, file), 'utf8');
  if (/data:image\/.*base64/.test(html)) failures.push(`${file}: embedded base64 image remains`);
}
for (const file of fs.readdirSync(dist, { recursive: true }).filter((file) => String(file).endsWith('.css'))) {
  const css = fs.readFileSync(path.join(dist, file), 'utf8');
  if (/word-break\s*:\s*break-all/i.test(css)) failures.push(`${file}: word-break: break-all remains`);
  if (/\.ja-phrase\b/.test(css)) failures.push(`${file}: legacy ja-phrase nowrap CSS remains`);
}

if (failures.length) {
  console.error('Build output validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Build output publication check: PASS — ${watches.filter((watch) => watch.published).length} published, ${watches.filter((watch) => !watch.published).length} unpublished.`);
