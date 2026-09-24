import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.env.LIVE_SITE_ROOT;
if (!root) throw new Error('LIVE_SITE_ROOT is required');
const site = root.endsWith('/') ? root : `${root}/`;
const deploySha = process.env.DEPLOY_SHA || '';
const dist = path.resolve('dist');

const normalize = (value) => value.replace(/\r\n/g, '\n');
const digest = (value) => crypto.createHash('sha256').update(value).digest('hex').slice(0, 16);

const walk = async (dir, prefix = '') => {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const rel = path.posix.join(prefix, entry.name);
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(abs, rel));
    else out.push(rel);
  }
  return out;
};

const allFiles = await walk(dist);
const targets = allFiles.filter((rel) =>
  rel.endsWith('.html') || ['sitemap.xml', 'llms.txt', 'robots.txt'].includes(rel)
);

const routeFor = (rel) => {
  if (rel === 'index.html') return '';
  if (rel.endsWith('/index.html')) return rel.slice(0, -'index.html'.length);
  return rel;
};

const expected = new Map();
for (const rel of targets) expected.set(rel, normalize(await fs.readFile(path.join(dist, rel), 'utf8')));

const fetchTarget = async (rel) => {
  const route = routeFor(rel);
  const url = new URL(route, site);
  if (deploySha) url.searchParams.set('__va_deploy', deploySha);
  try {
    const response = await fetch(url, { redirect: 'follow', cache: 'no-store' });
    const body = normalize(await response.text());
    const allowed404 = rel === '404.html' && response.status === 404;
    return { ok: response.ok || allowed404, status: response.status, body };
  } catch (error) {
    return { ok: false, status: 0, body: '', error: error.message };
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let pending = [...targets];
let lastFailures = [];

for (let attempt = 1; attempt <= 12 && pending.length; attempt += 1) {
  const failures = [];
  const retry = [];
  for (const rel of pending) {
    const actual = await fetchTarget(rel);
    const wanted = expected.get(rel) || '';
    if (!actual.ok) {
      failures.push(`${rel}: HTTP ${actual.status}${actual.error ? ` (${actual.error})` : ''}`);
      retry.push(rel);
      continue;
    }
    if (actual.body !== wanted) {
      failures.push(`${rel}: live body differs from dist (dist ${digest(wanted)}, live ${digest(actual.body)})`);
      retry.push(rel);
    }
  }
  if (!failures.length) {
    pending = [];
    lastFailures = [];
    break;
  }
  lastFailures = failures;
  pending = retry;
  if (attempt < 12) await sleep(5000);
}

if (pending.length) {
  console.error(`Live artifact parity failed for ${pending.length} of ${targets.length} checked publication files:`);
  for (const failure of lastFailures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Live artifact parity: PASS — ${targets.length} generated HTML/publication files exactly match the deployed dist artifact.`);
