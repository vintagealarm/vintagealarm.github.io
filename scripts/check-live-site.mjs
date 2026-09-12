import { readWatchPublicationState } from './watch-publication.mjs';

const root = process.env.LIVE_SITE_ROOT;
if (!root) throw new Error('LIVE_SITE_ROOT is required');
const site = root.endsWith('/') ? root : `${root}/`;
const watches = readWatchPublicationState();

const get = async (path) => {
  try {
    const response = await fetch(new URL(path, site), { redirect: 'follow', cache: 'no-store' });
    return { ok: response.ok, status: response.status, text: await response.text() };
  } catch {
    return { ok: false, status: 0, text: '' };
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let lastFailures = [];

for (let attempt = 1; attempt <= 12; attempt += 1) {
  const failures = [];
  const [home, history, owners, sitemap] = await Promise.all([
    get(''), get('history/'), get('owners-notes/'), get('sitemap.xml')
  ]);
  for (const [name, result] of [['home', home], ['history', history], ['owners-notes', owners], ['sitemap', sitemap]]) {
    if (!result.ok) failures.push(`${name}: HTTP ${result.status}`);
  }

  if (home.ok && !home.text.includes('owners-notes/')) failures.push('home: OWNER\'S NOTES link missing');
  if (history.ok && !history.text.includes('id="milestones"')) failures.push('history: milestones missing');

  for (const watch of watches) {
    const page = await get(`${watch.slug}/`);
    const sitemapUrl = `https://vintagealarm.github.io/${watch.slug}/`;
    if (watch.published) {
      if (!page.ok) failures.push(`${watch.slug}: published page HTTP ${page.status}`);
      if (owners.ok && !owners.text.includes(`${watch.slug}/#owners-note`)) failures.push(`${watch.slug}: missing from OWNER'S NOTES`);
      if (sitemap.ok && !sitemap.text.includes(sitemapUrl)) failures.push(`${watch.slug}: missing from sitemap`);
    } else {
      if (page.ok) failures.push(`${watch.slug}: unpublished page is still public`);
      if (owners.ok && owners.text.includes(`${watch.slug}/#owners-note`)) failures.push(`${watch.slug}: unpublished OWNER'S NOTE is listed`);
      if (sitemap.ok && sitemap.text.includes(sitemapUrl)) failures.push(`${watch.slug}: unpublished page is in sitemap`);
    }
  }

  const cyma = watches.find((watch) => watch.slug === 'cyma-time-o-vox');
  const cymaZoom = await get('cyma-time-o-vox/owners-note/');
  if (cyma?.published) {
    if (!cymaZoom.ok) failures.push(`cyma-time-o-vox/owners-note: HTTP ${cymaZoom.status}`);
    else if (!cymaZoom.text.includes('noindex,follow')) failures.push('cyma-time-o-vox/owners-note: noindex,follow missing');
  } else if (cymaZoom.ok) {
    failures.push('cyma-time-o-vox/owners-note: still public while Cyma is unpublished');
  }

  if (!failures.length) {
    console.log(`Live publication check: PASS — ${watches.filter((watch) => watch.published).length} published watch pages.`);
    process.exit(0);
  }
  lastFailures = failures;
  if (attempt < 12) await sleep(5000);
}

console.error('Live publication check failed:');
for (const failure of lastFailures) console.error(`- ${failure}`);
process.exit(1);
