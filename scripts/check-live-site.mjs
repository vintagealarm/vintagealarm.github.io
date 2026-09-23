import fs from 'node:fs';
import path from 'node:path';
import { readWatchPublicationState } from './watch-publication.mjs';

const root = process.env.LIVE_SITE_ROOT;
if (!root) throw new Error('LIVE_SITE_ROOT is required');
const site = root.endsWith('/') ? root : `${root}/`;
const watches = readWatchPublicationState();
const ownersDirectory = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/owners-directory.json'), 'utf8'));
const researchSettings = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/research-settings.json'), 'utf8'));
const howTheyRingSettings = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/how-they-ring-settings.json'), 'utf8'));
const historyOwnerSlugs = new Set(ownersDirectory.entries.map((entry) => entry.historyId));

const get = async (path) => {
  try {
    const response = await fetch(new URL(path, site), { redirect: 'follow', cache: 'no-store' });
    return { ok: response.ok, status: response.status, text: await response.text() };
  } catch {
    return { ok: false, status: 0, text: '' };
  }
};

const head = async (assetPath) => {
  try {
    const response = await fetch(new URL(assetPath.replace(/^\//, ''), site), {
      method: 'HEAD',
      redirect: 'follow',
      cache: 'no-store'
    });
    return { ok: response.ok, status: response.status };
  } catch {
    return { ok: false, status: 0 };
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let lastFailures = [];

for (let attempt = 1; attempt <= 12; attempt += 1) {
  const failures = [];
  const [home, englishHome, germanHome, history, englishHistory, germanHistory, owners, sitemap] = await Promise.all([
    get(''), get('en/'), get('de/'), get('history/'), get('en/history/'), get('de/history/'), get('owners-notes/'), get('sitemap.xml')
  ]);
  for (const [name, result] of [
    ['home', home],
    ['en', englishHome],
    ['de', germanHome],
    ['history', history],
    ['en/history', englishHistory],
    ['de/history', germanHistory],
    ['owners-notes', owners],
    ['sitemap', sitemap]
  ]) {
    if (!result.ok) failures.push(`${name}: HTTP ${result.status}`);
  }

  if (home.ok && !home.text.includes('owners-notes/')) failures.push('home: OWNER\'S NOTES link missing');
  if (howTheyRingSettings.productionPublished) {
    const [howTheyRing, englishHowTheyRing, germanHowTheyRing] = await Promise.all([
      get('how-they-ring/'), get('en/how-they-ring/'), get('de/how-they-ring/')
    ]);
    if (!howTheyRing.ok) failures.push(`how-they-ring: published page HTTP ${howTheyRing.status}`);
    if (!englishHowTheyRing.ok) failures.push(`en/how-they-ring: published page HTTP ${englishHowTheyRing.status}`);
    if (!germanHowTheyRing.ok) failures.push(`de/how-they-ring: published page HTTP ${germanHowTheyRing.status}`);
    if (howTheyRingSettings.showOnTop && home.ok && !home.text.includes('how-they-ring/')) failures.push('home: published HOW THEY RING link missing');
    if (howTheyRing.ok && !howTheyRing.text.includes('HOW THEY RING')) failures.push('how-they-ring: expected heading missing');
    if (howTheyRing.ok) {
      if (!/<a[^>]+href=\"\/how-they-ring\/?\"[^>]*>\s*音で見る\s*<\/a>/.test(howTheyRing.text)) failures.push('how-they-ring: shared Japanese menu label must be 音で見る');
      for (const marker of ['音で見る、', 'アラーム腕時計。', '棒状の音バネを叩く', 'category-tap', 'TAP', '機構図の根拠・資料を見る', 'Cal.980は、ムーブメントに固定された音バネをハンマーが打撃する。', 'Cal.1241は、ハンマーがベル（Glocke）を打撃する。', 'VINTAGE ALARMでの整理です。', 'section-menu']) {
        if (!howTheyRing.text.includes(marker)) failures.push(`how-they-ring: current live marker missing: ${marker}`);
      }
      for (const stale of ['鳴らし方で見る、', '音と鳴らし方で時計を見る']) {
        if (howTheyRing.text.includes(stale)) failures.push(`how-they-ring: stale live copy remains: ${stale}`);
      }
    }

    if (englishHowTheyRing.ok) {
      for (const marker of ['lang="en"', 'Alarm wristwatches,', 'Strikes a rod-shaped sound spring', 'Multiple recordings can be played at the same time']) {
        if (!englishHowTheyRing.text.includes(marker)) failures.push(`en/how-they-ring: localized marker missing: ${marker}`);
      }
    }
    if (germanHowTheyRing.ok) {
      for (const marker of ['lang="de"', 'Wecker-Armbanduhren,', 'Schlägt eine stabförmige Tonfeder an', 'Mehrere Aufnahmen können gleichzeitig abgespielt werden']) {
        if (!germanHowTheyRing.text.includes(marker)) failures.push(`de/how-they-ring: localized marker missing: ${marker}`);
      }
    }
    if (englishHome.ok && !englishHome.text.includes('When notifications still ran on gears.')) failures.push('en: localized TOP lead missing');
    if (germanHome.ok && !germanHome.text.includes('Als Benachrichtigungen noch mit Zahnrädern liefen.')) failures.push('de: localized TOP lead missing');
    if (englishHome.ok && !englishHome.text.includes('en/how-they-ring/')) failures.push('en: HOW THEY RING link missing');
    if (germanHome.ok && !germanHome.text.includes('de/how-they-ring/')) failures.push('de: HOW THEY RING link missing');
  } else if (home.ok && home.text.includes('how-they-ring/')) {
    failures.push('home: unpublished HOW THEY RING link leaked');
  }
  if (history.ok && !history.text.includes('id="milestones"')) failures.push('history: milestones missing');
  if (englishHistory.ok && !englishHistory.text.includes('lang="en"')) failures.push('en/history: html lang missing');
  if (germanHistory.ok && !germanHistory.text.includes('lang="de"')) failures.push('de/history: html lang missing');
  if (englishHistory.ok && !englishHistory.text.includes('References &amp; Sources') && !englishHistory.text.includes('References & Sources')) failures.push('en/history: localized sources label missing');
  if (germanHistory.ok && !germanHistory.text.includes('Literatur &amp; Quellen') && !germanHistory.text.includes('Literatur & Quellen')) failures.push('de/history: localized sources label missing');

  if (sitemap.ok) {
    for (const path of ['history/', 'en/history/', 'de/history/', ...(howTheyRingSettings.productionPublished ? ['how-they-ring/', 'en/how-they-ring/', 'de/how-they-ring/'] : [])]) {
      const expected = `https://vintagealarm.github.io/${path}`;
      if (!sitemap.text.includes(expected)) failures.push(`${path}: missing from sitemap`);
    }
  }

  if (researchSettings.published) {
    if (home.ok && !home.text.includes('history/#research')) failures.push('home: published RESEARCH link missing');
    if (history.ok && !history.text.includes('id="research"')) failures.push('history: published RESEARCH section missing');
  } else {
    if (home.ok && home.text.includes('history/#research')) failures.push('home: unpublished RESEARCH link leaked');
    if (history.ok && (history.text.includes('history/#research') || history.text.includes('id="research"'))) failures.push('history: unpublished RESEARCH leaked');
    if (owners.ok && owners.text.includes('history/#research')) failures.push('owners-notes: unpublished RESEARCH menu link leaked');
  }

  if (history.ok && history.text.includes('WITTNAUER ALARM')) failures.push('history: unpublished Wittnauer leaked into OWNER\'S NOTE rail');
  if (owners.ok && !owners.text.includes('c.1959–early 1960s')) failures.push('owners-notes: compact Westclox uncertain-era label missing');
  if (owners.ok && owners.text.includes('id="owners-1950年代末〜1960年代初頭"')) failures.push('owners-notes: long uncertain Westclox era leaked into section heading');

  for (const entry of ownersDirectory.entries) {
    for (const key of ['ownersThumbnail', 'historyThumbnail', 'fallbackThumbnail']) {
      const assetPath = entry[key];
      if (!assetPath) {
        failures.push(`${entry.historyId}: ${key} missing from owner directory`);
        continue;
      }
      const result = await head(assetPath);
      if (!result.ok) failures.push(`${entry.historyId}: live ${key} HTTP ${result.status} (${assetPath})`);
    }
  }

  for (const watch of watches) {
    const page = await get(`${watch.slug}/`);
    const sitemapUrl = `https://vintagealarm.github.io/${watch.slug}/`;
    const ownerHref = `${watch.slug}/#owners-note`;
    if (watch.published) {
      if (!page.ok) failures.push(`${watch.slug}: published page HTTP ${page.status}`);
      if (owners.ok && !owners.text.includes(ownerHref)) failures.push(`${watch.slug}: missing from OWNER'S NOTES`);
      if (history.ok && historyOwnerSlugs.has(watch.slug) && !history.text.includes(ownerHref)) failures.push(`${watch.slug}: missing from HISTORY owner rail`);
      if (sitemap.ok && !sitemap.text.includes(sitemapUrl)) failures.push(`${watch.slug}: missing from sitemap`);
    } else {
      if (page.ok) failures.push(`${watch.slug}: unpublished page is still public`);
      if (owners.ok && owners.text.includes(ownerHref)) failures.push(`${watch.slug}: unpublished OWNER'S NOTE is listed`);
      if (history.ok && history.text.includes(ownerHref)) failures.push(`${watch.slug}: unpublished OWNER'S NOTE is linked from HISTORY`);
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
    console.log(`Live publication check: PASS — localized HISTORY plus ${watches.filter((watch) => watch.published).length} published watch pages, owner thumbnails/fallbacks reachable.`);
    process.exit(0);
  }
  lastFailures = failures;
  if (attempt < 12) await sleep(5000);
}

console.error('Live publication check failed:');
for (const failure of lastFailures) console.error(`- ${failure}`);
process.exit(1);
