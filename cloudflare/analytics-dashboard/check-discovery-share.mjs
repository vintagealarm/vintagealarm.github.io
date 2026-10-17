import assert from 'node:assert/strict';
import vm from 'node:vm';
import entryWorker from './entry-worker.js';
import baseWorker from './worker.js';
import { buildDiscoveryShare } from './discovery-share.js';

const values = new Map();
const storage = { getItem: key => values.get(key) ?? null };
assert.equal(buildDiscoveryShare(storage).seo.status, 'NOT_IMPORTED');
assert.equal(buildDiscoveryShare(storage).geo.latest, null);
assert.equal(buildDiscoveryShare(storage).index.status, 'NOT_CHECKED');
const seo = { kind: 'seo', importedAt: '2026-10-17T00:00:00Z',
  files: [{ name: 'dates.csv', dimension: 'date', headers: ['Date', 'Clicks', 'Impressions'],
    rows: [{ key: '2026-10-01', clicks: 0, impressions: 5 }, { key: '2026-10-03', clicks: 0, impressions: 7 }] }],
  summary: { clicks: 0, impressions: 12, ctr: 0, position: 0, estimated: false } };
values.set('vaDiscoverySnapshotsV1', JSON.stringify([seo]));
let output = buildDiscoveryShare(storage);
assert.equal(output.seo.latest.summary.clicks, 0, 'measured zero is preserved');
assert.equal(output.seo.latest.summary.position, null, 'missing CSV column is unknown, not zero');
assert.equal(output.seo.latest.dataPeriod.end, '2026-10-03');
assert.deepEqual(output.seo.latest.files, seo.files);
assert.equal(output.geo.status, 'NOT_IMPORTED');
assert.equal(buildDiscoveryShare(storage, true).seo.latest.files, undefined);
const geo = { ...seo, kind: 'geo', summary: { ...seo.summary, impressions: 9 } };
values.set('vaDiscoverySnapshotsV1', JSON.stringify([seo, geo]));
values.set('vaIndexStatusV1', JSON.stringify({ '/history/': { status: 'indexed', checkedAt: '2026/10/17' } }));
output = buildDiscoveryShare(storage);
assert.equal(output.geo.latest.summary.impressions, 9);
assert.equal(output.geo.latest.summary.clicks, null, 'GEO importer does not measure clicks');
assert.equal(output.index.rows[0].checkedAt, '2026/10/17');
values.delete('vaIndexStatusV1');
values.set('vaDiscoverySnapshotsV1', '{broken');
assert.equal(buildDiscoveryShare(storage).seo.status, 'UNREADABLE');
values.set('vaDiscoverySnapshotsV1', JSON.stringify([seo]));
assert.equal(buildDiscoveryShare({ getItem() { throw new Error('storage denied'); } }).geo.status, 'UNREADABLE');

// Execute the actual generated dashboard, then click both share buttons.
const response = await entryWorker.fetch(new Request('https://dashboard.example/', {
  headers: { Authorization: 'Basic ' + btoa('admin:test-password') },
}), { DASHBOARD_PASSWORD: 'test-password' }, {});
assert.equal(response.status, 200);
const html = await response.text();
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const listeners = new Map();
const elements = new Map();
const element = id => {
  if (!elements.has(id)) elements.set(id, { value: '', textContent: id, innerHTML: '',
    querySelector: () => null, classList: { toggle() {}, remove() {} },
    addEventListener: (event, fn) => listeners.set(id + ':' + event, fn) });
  return elements.get(id);
};
let copied;
const sandbox = {
  URL, URLSearchParams, Date, Intl, console, localStorage: storage,
  document: { getElementById: element, querySelectorAll: () => [] },
  window: { location: { reload() {} } },
  navigator: { clipboard: { writeText: async value => { copied = value; } } },
  alert: message => { throw new Error(message); }, setTimeout() {},
  fetch: async url => {
    if (String(url).startsWith('/api/ai-readable-link')) return Response.json({ url: 'https://relay.example/s/v2/test#VA2;visits=3' });
    if (String(url).startsWith('/api/ai-share-link')) return Response.json({ url: 'https://export.example/' });
    if (String(url) === 'https://export.example/') return Response.json({ current: { visits: 3 }, windowKey: '24h' });
    return Response.json({ error: 'test: analytics loading not under test' }, { status: 503 });
  },
};
vm.runInNewContext(script, sandbox);
await listeners.get('aiShare:click')();
output = JSON.parse(copied);
assert.equal(output.current.visits, 3);
assert.equal(output.discovery.seo.latest.summary.impressions, 12);
assert.equal(output.discovery.geo.status, 'NOT_IMPORTED');
assert.equal(output.discovery.seo.latest.dataPeriod.start, '2026-10-01');
await listeners.get('aiReadable:click')();
assert.match(copied, /#VA2;visits=3;discovery=/);
const urlDiscovery = JSON.parse(decodeURIComponent(new URL(copied).hash.split(';discovery=')[1]));
assert.equal(urlDiscovery.seo.latest.summary.impressions, 12);
assert.equal(urlDiscovery.seo.latest.files, undefined);
assert.equal(urlDiscovery.automaticRetrieval, false);

// A static HTTP 200 must never count as delivery verification at issuance.
const originalBaseFetch = baseWorker.fetch;
const originalFetch = globalThis.fetch;
try {
  baseWorker.fetch = async () => Response.json({ url: 'https://vintage-alarm-analytics.orima1995.workers.dev/api/ai-export?window=24h&expires=1999999999&sig=' + 'a'.repeat(64) });
  globalThis.fetch = async url => {
    assert.match(String(url), /\/s\/v2\/24h\/auto\//);
    return new Response('<!doctype html>STATIC FALLBACK');
  };
  const rejected = await entryWorker.fetch(new Request('https://dashboard.example/api/ai-readable-link?range=24h'), {}, {});
  assert.equal(rejected.status, 502);
  assert.equal((await rejected.json()).url, undefined);
  globalThis.fetch = async () => new Response('# VINTAGE ALARM ANALYTICS\n', {
    headers: { 'X-Analytics-Export': 'vintage-alarm-ai-export-v1' },
  });
  const accepted = await entryWorker.fetch(new Request('https://dashboard.example/api/ai-readable-link?range=24h'), {}, {});
  assert.equal(accepted.status, 200);
  assert.equal((await accepted.json()).deliveryVerified, true);
} finally {
  baseWorker.fetch = originalBaseFetch;
  globalThis.fetch = originalFetch;
}
const unauthorized = await entryWorker.fetch(new Request('https://dashboard.example/api/ai-readable-link'), { DASHBOARD_PASSWORD: 'test-password' }, {});
assert.equal(unauthorized.status, 401, 'issuance still requires dashboard authentication');
console.log('Discovery sharing: actual AI COPY / AI URL handlers, missing/corrupt data, periods and false delivery: OK');
