import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];
const read = (...parts) => fs.readFileSync(path.join(root, ...parts), 'utf8');

const librarySource = read('src', 'data', 'source-library.ts');
const canonicalIds = [...librarySource.matchAll(/^\s*id:\s*'([^']+)'/gm)].map((match) => match[1]);
const duplicateCanonicalIds = canonicalIds.filter((id, index) => canonicalIds.indexOf(id) !== index);
if (duplicateCanonicalIds.length) {
  failures.push(`duplicate canonical source ids: ${[...new Set(duplicateCanonicalIds)].join(', ')}`);
}

const recurringBooks = [
  {
    id: 'horlbeck-2007',
    markers: ['Michael Philip Horlbeck', 'The Alarm Wristwatch'],
    isbn: '978-0-7643-2644-8'
  },
  {
    id: 'beitl-2009',
    markers: ['Leonhard Beitl', 'Alarm am Arm'],
    isbn: '978-3-200-01646-0'
  }
];

for (const book of recurringBooks) {
  if (!canonicalIds.includes(book.id)) failures.push(`source library is missing canonical id ${book.id}`);
  for (const marker of book.markers) {
    if (!librarySource.includes(marker)) failures.push(`${book.id}: source library is missing match marker ${marker}`);
  }
  if (!librarySource.includes(book.isbn)) failures.push(`${book.id}: source library is missing ISBN ${book.isbn}`);
}

const historyContent = JSON.parse(read('src', 'data', 'history-content.json'));
const historySourceIds = new Set(historyContent.sources.items.map((item) => String(item.id)));
const visit = (value, trail = 'history-content') => {
  if (Array.isArray(value)) {
    value.forEach((item, index) => visit(item, `${trail}[${index}]`));
    return;
  }
  if (!value || typeof value !== 'object') return;
  if (Array.isArray(value.sourceRefs)) {
    for (const ref of value.sourceRefs.map(String)) {
      if (!historySourceIds.has(ref)) failures.push(`${trail}: unknown HISTORY sourceRef ${ref}`);
    }
  }
  for (const [key, child] of Object.entries(value)) visit(child, `${trail}.${key}`);
};
visit(historyContent);

const historyCatalogSource = read('src', 'data', 'history-catalog.ts');
const pageMapBlock = historyCatalogSource.match(/const sourcePagesByEntry[\s\S]*?const chapterCards/)?.[0] ?? '';
for (const match of pageMapBlock.matchAll(/'([^']+)'\s*:\s*'p/g)) {
  const ref = match[1];
  if (!historySourceIds.has(ref)) failures.push(`history-catalog sourcePages uses unknown source ref ${ref}`);
}

const distSourcesPath = path.join(root, 'dist', 'sources', 'index.html');
if (!fs.existsSync(distSourcesPath)) {
  failures.push('dist/sources/index.html is missing; run build before source traceability check');
} else {
  const distSources = fs.readFileSync(distSourcesPath, 'utf8');
  for (const book of recurringBooks) {
    if (!distSources.includes(`id="${book.id}"`)) failures.push(`/sources/: missing card anchor ${book.id}`);
    if (!distSources.includes(`"@type":"Book"`)) failures.push('/sources/: Book JSON-LD is missing');
    if (!distSources.includes(book.isbn)) failures.push(`/sources/: missing ISBN ${book.isbn}`);
  }
}

const watchesDir = path.join(root, 'src', 'content', 'watches');
for (const file of fs.readdirSync(watchesDir).filter((name) => name.endsWith('.md')).sort()) {
  const source = fs.readFileSync(path.join(watchesDir, file), 'utf8');
  const slug = source.match(/^slug:\s*["']?([^"'\n]+)["']?\s*$/m)?.[1]?.trim();
  if (!slug) continue;
  const published = /^published:\s*true\s*$/m.test(source);
  if (!published) continue;
  const builtPath = path.join(root, 'dist', slug, 'index.html');
  if (!fs.existsSync(builtPath)) {
    failures.push(`${slug}: built WATCH page is missing`);
    continue;
  }
  const built = fs.readFileSync(builtPath, 'utf8');
  for (const book of recurringBooks) {
    if (!book.markers.some((marker) => source.includes(marker))) continue;
    if (!built.includes(`/sources/#${book.id}`)) failures.push(`${slug}: missing visible source-card link for ${book.id}`);
    if (!built.includes(`https://vintagealarm.github.io/sources/#${book.id}`)) failures.push(`${slug}: missing JSON-LD citation for ${book.id}`);
    if (!built.includes(`data-source-library-id="${book.id}"`)) failures.push(`${slug}: missing stable source identity ${book.id}`);
  }
}

const historyBuiltPath = path.join(root, 'dist', 'history', 'index.html');
if (!fs.existsSync(historyBuiltPath)) {
  failures.push('built HISTORY page is missing');
} else {
  const built = fs.readFileSync(historyBuiltPath, 'utf8');
  for (const book of recurringBooks) {
    const historyUsesBook = historyContent.sources.items.some((item) => book.markers.some((marker) => item.text.includes(marker)));
    if (!historyUsesBook) continue;
    if (!built.includes(`https://vintagealarm.github.io/sources/#${book.id}`)) failures.push(`HISTORY: missing JSON-LD citation for ${book.id}`);
    if (!built.includes(`data-source-library-id="${book.id}"`)) failures.push(`HISTORY: missing stable source identity ${book.id}`);
  }
}

if (failures.length) {
  console.error('Source traceability validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Source traceability: PASS');
