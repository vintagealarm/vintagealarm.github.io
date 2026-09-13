import fs from 'node:fs';
import path from 'node:path';
import { getPublishedWatchSlugs, readWatchPublicationState } from './watch-publication.mjs';

const root = process.cwd();
const directoryPath = path.join(root, 'src', 'data', 'owners-directory.json');
const historyPath = path.join(root, 'src', 'data', 'history-content.json');
const directory = JSON.parse(fs.readFileSync(directoryPath, 'utf8'));
const history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
const entries = directory.entries ?? [];
const publishedSlugs = getPublishedWatchSlugs();
const watches = readWatchPublicationState();
const watchSlugs = new Set(watches.map((watch) => watch.slug));
const seenIds = new Set();
const failures = [];
const validEras = new Set(['1910s', '1940s', '1950s', '1960s', 'electronic']);
const historySections = {
  '1910s': history.era1910s,
  '1940s': history.era1940s,
  '1950s': history.era1950s,
  '1960s': history.era1960s,
  electronic: history.electronic
};
const legacyKeys = ['ownerNumber', 'brand', 'name', 'catch', 'href', 'historyHref'];

const validateImage = (entry, key, required = true) => {
  const value = entry[key];
  if (!value) {
    if (required) failures.push(`${entry.historyId || 'entry'}: missing ${key}`);
    return;
  }
  if (!String(value).startsWith('/images/')) {
    failures.push(`${entry.historyId || 'entry'}: ${key} must be site-root /images/...`);
    return;
  }
  const assetPath = path.join(root, 'public', String(value).replace(/^\//, ''));
  if (!fs.existsSync(assetPath)) failures.push(`${entry.historyId || 'entry'}: ${key} asset missing: ${assetPath}`);
};

for (const entry of entries) {
  if (!entry.historyId) failures.push('entry missing historyId');
  if (!entry.ownedEra) failures.push(`${entry.historyId || 'entry'}: missing ownedEra`);
  if (!Number.isFinite(entry.ownedSortYear)) failures.push(`${entry.historyId || 'entry'}: missing ownedSortYear`);
  if (!entry.historyEra || !validEras.has(entry.historyEra)) {
    failures.push(`${entry.historyId || 'entry'}: historyEra must be a valid HISTORY chapter`);
  }

  // Separate curated thumbnails are the canonical listing images. `image` remains
  // only as a migration fallback until every old consumer has been retired.
  validateImage(entry, 'ownersThumbnail');
  validateImage(entry, 'historyThumbnail');
  validateImage(entry, 'image', false);

  for (const key of legacyKeys) {
    if (Object.hasOwn(entry, key)) failures.push(`${entry.historyId || 'entry'}: legacy duplicated field remains: ${key}`);
  }
  if (seenIds.has(entry.historyId)) failures.push(`duplicate historyId: ${entry.historyId}`);
  seenIds.add(entry.historyId);
  if (entry.historyId && !watchSlugs.has(entry.historyId)) failures.push(`${entry.historyId}: directory entry has no matching watch`);

  if (entry.historyEra && validEras.has(entry.historyEra)) {
    const cards = historySections[entry.historyEra]?.cards ?? [];
    const ownerCard = cards.find((card) => card?.group === 'owner' && card?.id === entry.historyId);
    if (!ownerCard) {
      failures.push(`${entry.historyId}: missing owner card in HISTORY CMS ${entry.historyEra}`);
    }
  }
}

for (const watch of watches) {
  if (!seenIds.has(watch.slug)) failures.push(`${watch.slug}: watch is missing directory metadata`);
  const output = path.join(root, 'dist', watch.slug, 'index.html');
  if (watch.published && !fs.existsSync(output)) failures.push(`${watch.slug}: published WATCH page missing: ${output}`);
  if (!watch.published && fs.existsSync(output)) failures.push(`${watch.slug}: unpublished WATCH page should not be generated`);
}

if (failures.length) {
  console.error("OWNER'S NOTES / HISTORY consistency validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`OWNER'S NOTES / HISTORY metadata valid: ${entries.length} watch entries, ${publishedSlugs.size} published.`);
