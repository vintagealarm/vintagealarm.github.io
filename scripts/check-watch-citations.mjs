import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const watchesDir = path.join(root, 'src', 'content', 'watches');
const failures = [];

const cleanScalar = (value) => String(value ?? '').trim().replace(/^['"]|['"]$/g, '').trim();

for (const file of fs.readdirSync(watchesDir).filter((name) => name.endsWith('.md')).sort()) {
  const source = fs.readFileSync(path.join(watchesDir, file), 'utf8');
  const lines = source.split(/\r?\n/);
  const slug = source.match(/^slug:\s*["']?([^"'\n]+)["']?\s*$/m)?.[1]?.trim() || file;

  const sourceMetaStart = lines.findIndex((line) => line === 'sourceMeta:');
  const sourcesStart = lines.findIndex((line) => line === 'sources:');
  if (sourceMetaStart < 0) {
    failures.push(`${slug}: sourceMeta is missing`);
    continue;
  }
  if (sourcesStart < 0 || sourcesStart <= sourceMetaStart) {
    failures.push(`${slug}: sources is missing or appears before sourceMeta`);
    continue;
  }

  const sourceIds = [];
  for (let index = sourceMetaStart + 1; index < sourcesStart; index += 1) {
    const match = lines[index].match(/^  - id:\s*["']?([^"'\s]+)["']?\s*$/);
    if (match) sourceIds.push(match[1]);
  }

  const sourceRows = [];
  for (let index = sourcesStart + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (line === '---') break;
    if (line.startsWith('  - ')) sourceRows.push(line.slice(4));
  }

  const duplicateIds = sourceIds.filter((id, index) => sourceIds.indexOf(id) !== index);
  if (duplicateIds.length) failures.push(`${slug}: duplicate sourceMeta ids: ${[...new Set(duplicateIds)].join(', ')}`);
  if (sourceIds.length !== sourceRows.length) {
    failures.push(`${slug}: sourceMeta (${sourceIds.length}) and sources (${sourceRows.length}) length mismatch`);
  }

  const expectedIds = sourceRows.map((_, index) => String(index + 1));
  if (sourceIds.join(',') !== expectedIds.join(',')) {
    failures.push(`${slug}: sourceMeta ids must match sources order 1..${sourceRows.length}; got [${sourceIds.join(', ')}]`);
  }

  const knownIds = new Set(sourceIds);
  const deepDiveStart = lines.findIndex((line) => line === 'deepDive:');
  const deepDiveEnd = sourceMetaStart;
  if (deepDiveStart < 0 || deepDiveStart >= deepDiveEnd) {
    failures.push(`${slug}: deepDive block is missing`);
    continue;
  }

  const items = [];
  let current = null;
  let mode = null;
  for (let index = deepDiveStart + 1; index < deepDiveEnd; index += 1) {
    const line = lines[index];
    const itemMatch = line.match(/^  - number:\s*(.+?)\s*$/);
    if (itemMatch) {
      if (current) items.push(current);
      current = { number: cleanScalar(itemMatch[1]), paragraphs: 0, citationRows: [] };
      mode = null;
      continue;
    }
    if (!current) continue;
    if (/^    paragraphs:\s*$/.test(line)) {
      mode = 'paragraphs';
      continue;
    }
    if (/^    citationRefs:\s*$/.test(line)) {
      mode = 'citations';
      continue;
    }
    if (/^    [A-Za-z]/.test(line)) {
      mode = null;
      continue;
    }
    const listMatch = line.match(/^      -\s*(.*)$/);
    if (!listMatch) continue;
    if (mode === 'paragraphs') current.paragraphs += 1;
    if (mode === 'citations') current.citationRows.push(cleanScalar(listMatch[1]));
  }
  if (current) items.push(current);

  for (const item of items) {
    if (!item.citationRows.length) {
      failures.push(`${slug} DEEP DIVE ${item.number}: citationRefs is missing`);
      continue;
    }
    if (item.citationRows.length !== item.paragraphs) {
      failures.push(`${slug} DEEP DIVE ${item.number}: ${item.paragraphs} paragraphs but ${item.citationRows.length} citation rows`);
    }
    item.citationRows.forEach((row, paragraphIndex) => {
      const refs = row.split(',').map((value) => cleanScalar(value)).filter(Boolean);
      if (!refs.length) failures.push(`${slug} DEEP DIVE ${item.number} paragraph ${paragraphIndex + 1}: empty citationRefs row`);
      for (const ref of refs) {
        if (!knownIds.has(ref)) failures.push(`${slug} DEEP DIVE ${item.number} paragraph ${paragraphIndex + 1}: unknown source id ${ref}`);
      }
    });
  }
}

if (failures.length) {
  console.error('WATCH citation integrity validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('WATCH citation integrity: PASS');
