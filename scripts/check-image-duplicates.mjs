import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = path.join(process.cwd(), 'public', 'images');
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile()) files.push(full);
  }
}

walk(root);

const byHash = new Map();
for (const file of files) {
  const body = fs.readFileSync(file);
  const hash = crypto.createHash('sha256').update(body).digest('hex');
  const rel = path.relative(process.cwd(), file).replaceAll(path.sep, '/');
  const group = byHash.get(hash) ?? [];
  group.push({ rel, size: body.length });
  byHash.set(hash, group);
}

const duplicates = [...byHash.values()].filter((group) => group.length > 1);
if (duplicates.length) {
  console.error('Exact duplicate image files found:');
  for (const group of duplicates) {
    console.error(`- ${group[0].size} bytes: ${group.map((item) => item.rel).join(' = ')}`);
  }
  process.exit(1);
}

console.log(`Exact image duplicate check: PASS — ${files.length} files, no byte-identical duplicates.`);
