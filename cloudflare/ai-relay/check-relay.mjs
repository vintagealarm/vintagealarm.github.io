import { onRequestGet, renderAnalyticsMarkdown, sourceFromRelayUrl } from './functions/index.js';

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const sample = {
  schemaVersion: 'vintage-alarm-ai-export-v1',
  generatedAt: '2026-09-12T00:00:00.000Z',
  windowKey: '7d',
  rangeKey: '7d',
  bucketKey: '1d',
  bucketLabel: '1日',
  windowLabel: '直近7日 · 1日区切り',
  windowStart: '2026-09-05T00:00:00.000Z',
  windowEnd: '2026-09-12T00:00:00.000Z',
  host: 'vintagealarm.github.io',
  current: {
    pageviews: 10, visits: 8, channels: [], pages: [], entryPages: [], externalEntryFlows: [], internalFlows: [],
    migrationFlows: [{ sourceHost: 'orima1995-create.github.io', sourceCleanPath: '/', destinationHost: 'vintagealarm.github.io', destinationPath: '/cyma-time-o-vox/', destinationName: 'Cyma Time-O-Vox', visits: 2, pageviews: 2 }],
    countries: [], devices: [], xProfileEntries: 2,
  },
  legacy: { host: 'orima1995-create.github.io', current: { pageviews: 3, visits: 2, channels: [], pages: [], entryPages: [], externalEntryFlows: [], internalFlows: [], migrationFlows: [], countries: [], devices: [], xProfileEntries: 0 } },
  combined: {
    current: {
      pageviews: 13, visits: 10, sampleInterval: 10, quality: 'SAMPLED / ESTIMATE',
      sampling: { total: 1, pages: 1, channels: 1, referrers: 1, flowSummary: 1, flows: 10, entries: 1, countries: 1, devices: 1 },
      completeness: { pages: true, channels: true, referrers: true, flowSummary: true, flows: true, entries: true, countries: true, devices: true },
      integrity: { status: 'PASS', failures: [], estimateDrift: [] }, channels: [], pages: [], entryPages: [], externalEntryFlows: [], internalFlows: [],
      migrationFlows: [{ sourceHost: 'orima1995-create.github.io', sourceCleanPath: '/', destinationHost: 'vintagealarm.github.io', destinationPath: '/cyma-time-o-vox/', destinationName: 'Cyma Time-O-Vox', visits: 2, pageviews: 2 }],
      countries: [], devices: [], xProfileEntries: 2,
    },
    trend: [{ bucket: '2026-09-08T00:00:00.000Z', label: '9/8', status: 'SAMPLED / ESTIMATE', sampleInterval: 10, pageviews: 13, visits: 10, x: 1, youtube: 0, instagram: 0, facebook: 0, search: 0, direct: 9, internalPV: 3, ai: 0, other: 0 }], note: 'host-scoped sum',
  },
  profileTracking: { path: '/x/' },
  limitations: { attribution: 'not post-level attribution' },
};

const markdown = renderAnalyticsMarkdown(sample);
assert(markdown.includes('Primary combined visits: 10'), 'combined visits missing');
assert(markdown.includes('X profile entries (/x/): 2'), 'X profile entries missing');
assert(markdown.includes('Host migration flows'), 'host migration section missing');
assert(markdown.includes('orima1995-create.github.io'), 'migration source host missing');
assert(markdown.includes('vintagealarm.github.io'), 'migration destination host missing');
assert(markdown.includes('not post-level attribution'), 'limitations missing');
assert(markdown.includes('Group by: 1日'), 'group-by metadata missing');
assert(markdown.includes('SAMPLED / ESTIMATE'), 'sampling quality missing');
assert(markdown.includes('Integrity: PASS'), 'period integrity status missing');
assert(markdown.includes('channels=1') && markdown.includes('flowSummary=1') && markdown.includes('flowDetails=10'), 'structural and diagnostic sampling must be rendered separately');
assert(markdown.includes('Row-limit coverage:') && markdown.includes('flowSummary=below-cap'), 'row-cap metadata must avoid claiming unsampled completeness');
assert(markdown.includes('Internal PV'), 'internal PV trend column missing');

const noSource = await onRequestGet({ request: new Request('https://relay.example/') });
assert(noSource.status === 200, 'landing page should be readable without exporting data');

const badSource = encodeURIComponent('https://example.com/api/ai-export?window=7d&expires=9999999999&sig=' + 'a'.repeat(64));
const bad = await onRequestGet({ request: new Request('https://relay.example/?source=' + badSource) });
assert(bad.status === 400, 'unapproved source host should fail');

const originalFetch = globalThis.fetch;
let fetchedUrl = '';
globalThis.fetch = async (url) => {
  fetchedUrl = String(url);
  return new Response(JSON.stringify(sample), { status: 200, headers: { 'Content-Type': 'application/json' } });
};
try {
  const expires = Math.floor(Date.now() / 1000) + 300;
  const source = new URL('https://vintage-alarm-analytics.orima1995.workers.dev/api/ai-export');
  source.searchParams.set('window', '7d');
  source.searchParams.set('expires', String(expires));
  source.searchParams.set('sig', 'a'.repeat(64));

  const relay = new URL('https://relay.example/');
  relay.searchParams.set('source', source.toString());
  const response = await onRequestGet({ request: new Request(relay.toString(), { headers: { Accept: 'text/markdown' } }) });
  assert(response.status === 200, 'valid allowlisted source should render');
  assert(response.headers.get('content-type')?.includes('text/markdown'), 'relay should return markdown');
  assert(fetchedUrl.startsWith('https://vintage-alarm-analytics.orima1995.workers.dev/api/ai-export?'), 'relay fetched unexpected host');
  assert(response.headers.get('cache-control') === 'no-store, max-age=0', 'legacy query relay must preserve no-store behavior');
  assert(response.headers.get('x-robots-tag') === 'noindex, nofollow, noarchive', 'signed content must remain noindex');

  const htmlResponse = await onRequestGet({ request: new Request(relay.toString()) });
  assert(htmlResponse.headers.get('content-type').includes('text/html'), 'legacy query relay should default to HTML');
  assert(htmlResponse.headers.get('X-Analytics-Export') === sample.schemaVersion, 'verified export marker missing');
  assert((await htmlResponse.text()).includes('Primary combined visits: 10'), 'HTML must retain totals');

  const shortUrl = new URL(`https://relay.example/s/v1/7d/${expires}/${'a'.repeat(64)}`);
  const reconstructed = sourceFromRelayUrl(shortUrl);
  assert(reconstructed.hostname === 'vintage-alarm-analytics.orima1995.workers.dev', 'short path reconstructed unexpected source host');
  assert(reconstructed.searchParams.get('window') === '7d', 'short path window mismatch');
  assert(reconstructed.searchParams.get('expires') === String(expires), 'short path expiry mismatch');
  assert(reconstructed.searchParams.get('sig') === 'a'.repeat(64), 'short path signature mismatch');

  const shortV2 = new URL(`https://relay.example/s/v2/custom/7d/2026-09-08/2026-09-21/${expires}/${'b'.repeat(64)}`);
  const reconstructedV2 = sourceFromRelayUrl(shortV2);
  assert(reconstructedV2.searchParams.get('window') === 'custom', 'v2 window compatibility param missing');
  assert(reconstructedV2.searchParams.get('range') === 'custom', 'v2 range mismatch');
  assert(reconstructedV2.searchParams.get('bucket') === '7d', 'v2 bucket mismatch');
  assert(reconstructedV2.searchParams.get('start') === '2026-09-08', 'v2 start mismatch');
  assert(reconstructedV2.searchParams.get('end') === '2026-09-21', 'v2 end mismatch');

  fetchedUrl = '';
  const shortResponse = await onRequestGet({ request: new Request(shortUrl.toString()) });
  assert(shortResponse.status === 200, 'short signed relay path should render');
  assert(shortResponse.headers.get('content-type').includes('text/markdown'), 'short relay path should default to AI-friendly markdown');
  assert(shortResponse.headers.get('cache-control')?.startsWith('public, max-age='), 'short relay path should be cacheable only until expiry');
  assert(shortResponse.headers.get('CDN-Cache-Control')?.startsWith('public, max-age='), 'short relay path should advertise CDN cache TTL');
  assert((await shortResponse.text()).includes('VINTAGE ALARM ANALYTICS'), 'short relay rendered markdown missing title');
  assert(fetchedUrl.includes('window=7d'), 'short path did not reconstruct signed source query');

  fetchedUrl = '';
  const shortV2Response = await onRequestGet({ request: new Request(shortV2.toString()) });
  assert(shortV2Response.status === 200, 'v2 signed relay path should render');
  assert(shortV2Response.headers.get('content-type').includes('text/markdown'), 'v2 short relay path must default to AI-friendly markdown');
  assert(shortV2Response.headers.get('cache-control')?.startsWith('public, max-age='), 'v2 short relay path must use signed-expiry cache TTL');
  assert(shortV2Response.headers.get('CDN-Cache-Control')?.startsWith('public, max-age='), 'v2 short relay path must advertise CDN cache TTL');
  assert((await shortV2Response.text()).includes('VINTAGE ALARM ANALYTICS'), 'v2 short relay rendered markdown missing title');
  assert(fetchedUrl.includes('range=custom') && fetchedUrl.includes('bucket=7d'), 'v2 short path did not preserve range and bucket');

  const malformedShort = await onRequestGet({ request: new Request(`https://relay.example/s/v1/7d/${expires}/bad`) });
  assert(malformedShort.status === 400, 'malformed short relay token must fail closed');

  sample.limitations.xss = '<script>alert(1)</script>';
  const escapedResponse = await onRequestGet({ request: new Request(relay.toString()) });
  assert(!(await escapedResponse.text()).includes('<script>'), 'HTML must escape source data');
  const body = await response.text();
  assert(body.includes('VINTAGE ALARM ANALYTICS'), 'rendered markdown missing title');

  globalThis.fetch = async () => new Response('{"error":"private detail"}', {status: 401});
  const denied = await onRequestGet({ request: new Request(relay.toString()) });
  assert(denied.status === 401, 'upstream auth error must remain an error');
  assert(!(await denied.text()).includes('private detail'), 'upstream error details must not leak');

  globalThis.fetch = async () => new Response('{}');
  assert((await onRequestGet({ request: new Request(relay.toString()) })).status === 502, 'invalid payload cannot be zero analytics');
} finally {
  globalThis.fetch = originalFetch;
}

console.log('AI relay: legacy no-store query + v1/v2 cacheable signed paths: OK');
