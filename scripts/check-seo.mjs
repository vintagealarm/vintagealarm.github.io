import { files, document, attr, content, route, resolve, origin, finish } from './site-audit-lib.mjs';
import { readWatchPublicationState } from './watch-publication.mjs';

const isPreview = process.env.PUBLIC_VA_PREVIEW === 'true';
const previewRobots = 'noindex,nofollow,noarchive';
const hasRobots = (nodes, expected) => nodes.some(node => node.tagName === 'meta' && attr(node, 'name') === 'robots' && attr(node, 'content') === expected);

const watchStates = readWatchPublicationState();
const required = {
  '/': ['WebSite'],
  '/history/': ['Article', 'BreadcrumbList'],
  '/owners-notes/': ['CollectionPage'],
  '/history/smartwatch/': ['CreativeWork', 'BreadcrumbList']
};
for (const watch of watchStates.filter((item) => item.published)) {
  required[`/${watch.slug}/`] = ['CreativeWork', 'BreadcrumbList'];
}
if (watchStates.some((item) => item.slug === 'cyma-time-o-vox' && item.published)) {
  required['/cyma-time-o-vox/owners-note/'] = [];
}

const errors = [], seen = new Set();
const titles = new Map(), descriptions = new Map();
for (const file of files().filter(f => f.endsWith('.html'))) {
  const page = route(file), nodes = document(file);
  const canonicalNodes = nodes.filter(n => n.tagName === 'link' && attr(n, 'rel')?.split(/\s+/).includes('canonical'));
  if (!required[page] && !canonicalNodes.length) continue;
  seen.add(page);
  const fail = message => errors.push(`${page}: ${message}`);
  if (page === '/cyma-time-o-vox/owners-note/') {
    if (!hasRobots(nodes, isPreview ? previewRobots : 'noindex,follow')) fail(isPreview ? 'preview robots policy changed' : 'enlargement view must remain noindex,follow');
    if (!nodes.some(n => n.tagName === 'title' && content(n).trim())) fail('missing title');
    continue;
  }
  if (page === '/x/') {
    if (!hasRobots(nodes, isPreview ? previewRobots : 'noindex,follow')) fail(isPreview ? 'preview robots policy changed' : 'X profile alias must remain noindex,follow');
    if (canonicalNodes.length !== 1 || attr(canonicalNodes[0], 'href') !== origin + '/') fail(`X profile alias canonical must be ${origin + '/'}`);
    if (!nodes.some(n => n.tagName === 'title' && content(n).trim())) fail('missing title');
    continue;
  }
  const meta = key => nodes.filter(n => n.tagName === 'meta' && (attr(n, 'name') === key || attr(n, 'property') === key));
  const value = key => {
    const matches = meta(key);
    if (matches.length !== 1 || !attr(matches[0], 'content')?.trim()) fail(`missing/duplicate/empty ${key}`);
    return matches[0] ? attr(matches[0], 'content') || '' : '';
  };
  const canonical = canonicalNodes[0] ? attr(canonicalNodes[0], 'href') : '';
  if (canonicalNodes.length !== 1 || canonical !== origin + page) fail(`canonical must be ${origin + page}`);
  const titleNodes = nodes.filter(n => n.tagName === 'title');
  const title = titleNodes[0] ? content(titleNodes[0]).trim() : '';
  if (titleNodes.length !== 1 || !title) fail('missing/duplicate/empty title');
  const description = value('description');
  for (const [v, map, label] of [[title, titles, 'title'], [description, descriptions, 'description']]) {
    if (map.has(v)) fail(`duplicate ${label} with ${map.get(v)}`); else map.set(v, page);
  }
  const robots = value('robots').toLowerCase().split(',').map(s => s.trim());
  if (isPreview) {
    if (attr(meta('robots')[0], 'content') !== previewRobots) fail('preview robots policy changed');
  } else if (!['index', 'follow', 'max-image-preview:large'].every(v => robots.includes(v)) || robots.includes('noindex') || robots.includes('nofollow')) {
    fail('robots policy changed');
  }
  for (const [key, expected] of [['og:title', title], ['og:description', description], ['og:url', canonical], ['twitter:title', title], ['twitter:description', description]])
    if (value(key) !== expected) fail(`${key} does not match page metadata`);
  for (const key of ['og:locale', 'og:site_name', 'og:type', 'twitter:card']) value(key);
  for (const key of ['og:image', 'twitter:image']) {
    if (!meta(key).length && ['/', '/history/', '/owners-notes/'].includes(page)) continue;
    const image = value(key);
    try { const u = new URL(image); if (u.origin !== origin || !resolve(u)) fail(`${key}: missing or noncanonical image`); }
    catch { fail(`${key}: invalid image URL`); }
  }
  const types = new Set();
  function inspect(v) {
    if (typeof v === 'string' && v.includes('orima1995-create.github.io')) fail('legacy host in JSON-LD');
    if (!v || typeof v !== 'object') return;
    for (const type of [v['@type']].flat()) if (type) types.add(type);
    Object.values(v).forEach(inspect);
  }
  for (const n of nodes.filter(n => n.tagName === 'script' && attr(n, 'type') === 'application/ld+json')) {
    try { inspect(JSON.parse(content(n))); } catch { fail('invalid JSON-LD'); }
  }
  for (const type of required[page] || []) if (!types.has(type)) fail(`missing JSON-LD ${type}`);
  for (const n of nodes.filter(n => ['meta', 'link'].includes(n.tagName)))
    if (n.attrs.some(a => a.value.includes('orima1995-create.github.io'))) fail('legacy host in SEO metadata');
}
for (const page of Object.keys(required)) if (!seen.has(page)) errors.push(`${page}: required page missing`);
finish('SEO quality gate', errors, `${seen.size} pages`);
