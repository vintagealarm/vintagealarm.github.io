import fs from 'node:fs';
import path from 'node:path';
import { getPublishedWatchSlugs, readWatchPublicationState } from './watch-publication.mjs';

const directoryPath = path.join(process.cwd(), 'src', 'data', 'owners-directory.json');
const directory = JSON.parse(fs.readFileSync(directoryPath, 'utf8'));
const entries = directory.entries ?? [];
const publishedSlugs = getPublishedWatchSlugs();
const watches = readWatchPublicationState();
const seenIds = new Set();
const seenNumbers = new Set();
const seenHrefs = new Set();
const failures = [];

for (const entry of entries) {
  if (!entry.historyId) failures.push('entry missing historyId');
  if (!entry.historyHref || !entry.historyHref.startsWith('/history/#')) {
    failures.push(`${entry.historyId || entry.name}: historyHref must explicitly target /history/#...`);
  }
  if (!entry.href || !entry.href.startsWith('/')) {
    failures.push(`${entry.historyId || entry.name}: href must be site-root relative`);
  }

  for (const [label, value, set] of [
    ['historyId', entry.historyId, seenIds],
    ['ownerNumber', entry.ownerNumber, seenNumbers],
    ['href', entry.href, seenHrefs]
  ]) {
    if (!value) continue;
    if (set.has(value)) failures.push(`duplicate ${label}: ${value}`);
    set.add(value);
  }

  const route = String(entry.href || '').split('#')[0].replace(/^\//, '').replace(/\/$/, '');
  if (route && publishedSlugs.has(entry.historyId)) {
    const output = path.join(process.cwd(), 'dist', route, 'index.html');
    if (!fs.existsSync(output)) failures.push(`${entry.historyId || entry.name}: generated WATCH page missing: ${output}`);
  }
}

for (const watch of watches.filter((item) => !item.published)) {
  const output = path.join(process.cwd(), 'dist', watch.slug, 'index.html');
  if (fs.existsSync(output)) failures.push(`${watch.slug}: unpublished WATCH page should not be generated`);
}

if (failures.length) {
  console.error('OWNER\'S NOTES directory validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`OWNER'S NOTES directory valid: ${publishedSlugs.size} published watch entries.`);
