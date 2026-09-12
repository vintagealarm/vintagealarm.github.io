import fs from 'node:fs';
import path from 'node:path';
import { getPublishedWatchSlugs, readWatchPublicationState } from './watch-publication.mjs';

const directoryPath = path.join(process.cwd(), 'src', 'data', 'owners-directory.json');
const directory = JSON.parse(fs.readFileSync(directoryPath, 'utf8'));
const entries = directory.entries ?? [];
const publishedSlugs = getPublishedWatchSlugs();
const watches = readWatchPublicationState();
const watchSlugs = new Set(watches.map((watch) => watch.slug));
const seenIds = new Set();
const failures = [];
const validEras = new Set(['1910s', '1940s', '1950s', '1960s', 'electronic']);
const legacyKeys = ['ownerNumber', 'brand', 'name', 'catch', 'href', 'historyHref'];

for (const entry of entries) {
  if (!entry.historyId) failures.push('entry missing historyId');
  if (!entry.ownedEra) failures.push(`${entry.historyId || 'entry'}: missing ownedEra`);
  if (!Number.isFinite(entry.ownedSortYear)) failures.push(`${entry.historyId || 'entry'}: missing ownedSortYear`);
  if (!entry.historyEra || !validEras.has(entry.historyEra)) {
    failures.push(`${entry.historyId || 'entry'}: historyEra must be a valid HISTORY chapter`);
  }
  if (!entry.image || !String(entry.image).startsWith('/images/')) {
    failures.push(`${entry.historyId || 'entry'}: image must be site-root /images/...`);
  }
  for (const key of legacyKeys) {
    if (Object.hasOwn(entry, key)) failures.push(`${entry.historyId || 'entry'}: legacy duplicated field remains: ${key}`);
  }
  if (seenIds.has(entry.historyId)) failures.push(`duplicate historyId: ${entry.historyId}`);
  seenIds.add(entry.historyId);
  if (entry.historyId && !watchSlugs.has(entry.historyId)) failures.push(`${entry.historyId}: directory entry has no matching watch`);
}

for (const watch of watches) {
  if (!seenIds.has(watch.slug)) failures.push(`${watch.slug}: watch is missing directory metadata`);
  const output = path.join(process.cwd(), 'dist', watch.slug, 'index.html');
  if (watch.published && !fs.existsSync(output)) failures.push(`${watch.slug}: published WATCH page missing: ${output}`);
  if (!watch.published && fs.existsSync(output)) failures.push(`${watch.slug}: unpublished WATCH page should not be generated`);
}

if (failures.length) {
  console.error("OWNER'S NOTES directory validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`OWNER'S NOTES metadata valid: ${entries.length} watch entries, ${publishedSlugs.size} published.`);
