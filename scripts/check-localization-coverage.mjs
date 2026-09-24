import fs from 'node:fs/promises';
import path from 'node:path';

const siteRoot = 'https://vintagealarm.github.io/';
const llms = await fs.readFile('public/llms.txt', 'utf8');
const failures = [];
const ignored = new Set(['history', 'sources']);

const builtWatchSlugs = async (lang) => {
  const root = path.join('dist', lang);
  let entries;
  try {
    entries = await fs.readdir(root, { withFileTypes: true });
  } catch (error) {
    failures.push(`${lang}: cannot read ${root}: ${error.message}`);
    return [];
  }

  const slugs = [];
  for (const entry of entries) {
    if (!entry.isDirectory() || ignored.has(entry.name)) continue;
    const indexPath = path.join(root, entry.name, 'index.html');
    try {
      await fs.access(indexPath);
      slugs.push(entry.name);
    } catch {
      // Non-page directory; ignore it.
    }
  }
  return slugs.sort();
};

const declaredWatchSlugs = (lang) => {
  const pattern = new RegExp(`^- ${siteRoot.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}${lang}/([^/]+)/$`, 'gm');
  return [...llms.matchAll(pattern)]
    .map((match) => match[1])
    .filter((slug) => !ignored.has(slug))
    .sort();
};

for (const lang of ['en', 'de']) {
  const built = await builtWatchSlugs(lang);
  const declared = declaredWatchSlugs(lang);
  const builtSet = new Set(built);
  const declaredSet = new Set(declared);

  for (const slug of built) {
    if (!declaredSet.has(slug)) {
      failures.push(`${lang}: published /${lang}/${slug}/ exists but is missing from public/llms.txt`);
    }
  }

  for (const slug of declared) {
    if (!builtSet.has(slug)) {
      failures.push(`${lang}: public/llms.txt declares /${lang}/${slug}/ but the built page does not exist`);
    }
  }
}


const fullResearchSlugs = [
  'basis-alarm',
  'citizen-alarm',
  'cyma-time-o-vox',
  'pierce-duofon',
  'westclox-watchlarm',
  'wittnauer-10wa'
];
const englishFullResearchSource = await fs.readFile('src/data/en-watch-full-research.ts', 'utf8');
for (const slug of fullResearchSlugs) {
  if (!englishFullResearchSource.includes(`'${slug}': {`)) {
    failures.push(`en: ${slug} is published but is not registered as FULL RESEARCH`);
  }
}

for (const lang of ['en', 'de']) {
  const chronometrePath = path.join('dist', lang, 'cyma-time-o-vox', 'chronometre', 'index.html');
  const chronometreUrl = `${siteRoot}${lang}/cyma-time-o-vox/chronometre/`;
  try {
    const html = await fs.readFile(chronometrePath, 'utf8');
    if (!html.includes(`lang="${lang}"`)) failures.push(`${lang}: Chronometre page html lang missing`);
    if (!llms.includes(chronometreUrl)) failures.push(`${lang}: localized Chronometre URL missing from public/llms.txt`);
  } catch (error) {
    failures.push(`${lang}: localized Chronometre page missing: ${error.message}`);
  }
}

if (failures.length) {
  console.error('Localized publication coverage check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Localized publication coverage check passed for EN / DE full WATCH routes, Chronometre research and public/llms.txt.');
