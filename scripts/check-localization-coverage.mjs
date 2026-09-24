import fs from 'node:fs/promises';
import path from 'node:path';
import { readWatchPublicationState } from './watch-publication.mjs';

const siteRoot = 'https://vintagealarm.github.io/';
const llms = await fs.readFile('public/llms.txt', 'utf8');
const howTheyRingSettings = JSON.parse(await fs.readFile('src/data/how-they-ring-settings.json', 'utf8'));
const watches = readWatchPublicationState().filter((watch) => watch.published);
const failures = [];

const readBuilt = async (route) => {
  const target = route ? path.join('dist', route, 'index.html') : path.join('dist', 'index.html');
  try {
    return await fs.readFile(target, 'utf8');
  } catch (error) {
    failures.push(`${route || '/'}: built page missing: ${error.message}`);
    return '';
  }
};

const staticCases = (lang) => [
  { route: `${lang}/`, markers: lang === 'en' ? ['When notifications still ran on gears.'] : ['Als Benachrichtigungen noch mit Zahnrädern liefen.'] },
  { route: `${lang}/history/`, markers: lang === 'en' ? ['References &amp; Sources', 'References & Sources'] : ['Literatur &amp; Quellen', 'Literatur & Quellen'] },
  { route: `${lang}/owners-notes/`, markers: ["OWNER'S NOTES", 'owner-frame'] },
  ...(howTheyRingSettings.productionPublished
    ? [{ route: `${lang}/how-they-ring/`, markers: lang === 'en' ? ['Alarm wristwatches,', 'GONG', 'CASEBACK'] : ['Wecker-Armbanduhren,', 'GONG', 'CASEBACK'] }]
    : []),
  { route: `${lang}/sources/`, markers: lang === 'en' ? ['Sources &amp; References', 'Sources & References'] : ['Quellen &amp; Literatur', 'Quellen & Literatur'] }
];

for (const lang of ['en', 'de']) {
  const other = lang === 'en' ? 'de' : 'en';

  for (const testCase of staticCases(lang)) {
    const html = await readBuilt(testCase.route);
    if (!html) continue;
    if (!html.includes(`lang="${lang}"`)) failures.push(`${testCase.route}: html lang missing`);
    if (!testCase.markers.some((marker) => html.includes(marker))) failures.push(`${testCase.route}: expected localized content marker missing`);
    if (!html.includes('hreflang="ja"')) failures.push(`${testCase.route}: Japanese hreflang missing`);
    if (!html.includes(`hreflang="${other}"`)) failures.push(`${testCase.route}: ${other.toUpperCase()} hreflang missing`);
    const url = `${siteRoot}${testCase.route}`;
    if (!llms.includes(url)) failures.push(`${testCase.route}: missing from public/llms.txt`);
  }

  for (const watch of watches) {
    const route = `${lang}/${watch.slug}/`;
    const html = await readBuilt(route);
    if (!html) continue;

    if (!html.includes(`lang="${lang}"`)) failures.push(`${route}: html lang missing`);
    for (const marker of ["OWNER'S NOTE", 'id="spec"', 'specimen-gallery', 'id="deep"']) {
      if (!html.includes(marker)) failures.push(`${route}: FULL RESEARCH marker missing: ${marker}`);
    }
    const sourceMarkers = lang === 'en'
      ? ['REFERENCES &amp; SOURCES', 'REFERENCES & SOURCES']
      : ['LITERATUR &amp; QUELLEN', 'LITERATUR & QUELLEN'];
    if (!sourceMarkers.some((marker) => html.includes(marker))) failures.push(`${route}: FULL RESEARCH sources section missing`);
    if (html.includes('This page is a concise English entry to the specimen')) failures.push(`${route}: obsolete concise-entry fallback leaked`);
    if (!html.includes('hreflang="ja"')) failures.push(`${route}: Japanese hreflang missing`);
    if (!html.includes(`hreflang="${other}"`)) failures.push(`${route}: ${other.toUpperCase()} hreflang missing`);
    if (!llms.includes(`${siteRoot}${route}`)) failures.push(`${route}: missing from public/llms.txt`);
  }
}

const fullResearchSlugs = watches.map((watch) => watch.slug).sort();
const englishFullResearchSource = await fs.readFile('src/data/en-watch-full-research.ts', 'utf8');
const cymaLocalizationSource = await fs.readFile('src/data/cyma-localizations.ts', 'utf8');
for (const slug of fullResearchSlugs) {
  const registered = slug === 'cyma-time-o-vox'
    ? cymaLocalizationSource.includes('englishCymaFullResearch')
    : englishFullResearchSource.includes(`'${slug}': {`);
  if (!registered) failures.push(`en: ${slug} is published but is not registered as FULL RESEARCH`);
}

for (const lang of ['en', 'de']) {
  const other = lang === 'en' ? 'de' : 'en';
  const route = `${lang}/cyma-time-o-vox/chronometre/`;
  const html = await readBuilt(route);
  if (!html) continue;

  if (!html.includes(`lang="${lang}"`)) failures.push(`${route}: html lang missing`);
  for (const marker of ['owners-documented', 'owners-observed', 'owners-unadjusted', 'owners-archive', 'owners-field-note', 'proto-conclusion']) {
    if (!html.includes(marker)) failures.push(`${route}: full Chronomètre section missing: ${marker}`);
  }
  if (!html.includes('hreflang="ja"')) failures.push(`${route}: Japanese hreflang missing`);
  if (!html.includes(`hreflang="${other}"`)) failures.push(`${route}: ${other.toUpperCase()} hreflang missing`);
  if (!llms.includes(`${siteRoot}${route}`)) failures.push(`${route}: missing from public/llms.txt`);
}

if (failures.length) {
  console.error('Localized publication coverage check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Localized publication coverage check passed for all EN / DE public sections, ${watches.length} FULL RESEARCH WATCH routes per language, Chronomètre research and public/llms.txt.`);
