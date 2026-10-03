import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const dir = 'src/content/watches';

function scalar(source, key) {
  const match = String(source).match(new RegExp(`^${key}:\\s*["']?([^\\n"']+)["']?\\s*$`, 'm'));
  return match?.[1]?.trim() || '';
}

function listBlock(source, key, indent = '') {
  const lines = String(source).split(/\r?\n/);
  const header = `${indent}${key}:`;
  const start = lines.findIndex((line) => line === header);
  if (start < 0) return [];
  const itemIndent = indent + '  ';
  const out = [];
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.startsWith(itemIndent)) break;
    const match = line.match(/^\s*-\s+["']?(.*?)["']?\s*$/u);
    if (match) out.push(match[1]);
  }
  return out;
}

const rows = readdirSync(dir)
  .filter((name) => name.endsWith('.md'))
  .map((name) => {
    const file = path.join(dir, name);
    const source = readFileSync(file, 'utf8');
    return {
      file,
      slug: scalar(source, 'slug') || path.basename(name, '.md'),
      published: scalar(source, 'published') === 'true',
      brand: scalar(source, 'brand'),
      model: scalar(source, 'model'),
      catch: listBlock(source, 'catch'),
      lead: listBlock(source, 'lead', '  ')
    };
  })
  .filter((row) => row.published)
  .sort((a, b) => a.slug.localeCompare(b.slug));

console.log(`Published Japanese WATCH benchmark: ${rows.length}`);
for (const row of rows) {
  console.log(`\n[${row.slug}] ${row.brand} ${row.model}`.trim());
  console.log('  Catch:');
  for (const line of row.catch) console.log(`    - ${line}`);
  console.log('  Lead:');
  for (const line of row.lead) console.log(`    - ${line}`);
}
