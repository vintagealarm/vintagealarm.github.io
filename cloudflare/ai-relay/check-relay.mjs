import { onRequestGet, renderAnalyticsMarkdown } from './functions/index.js';

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const sample = {
  schemaVersion: 'vintage-alarm-ai-export-v1',
  generatedAt: '2026-09-12T00:00:00.000Z',
  windowKey: '7d',
  windowLabel: '直近7日',
  windowStart: '2026-09-05T00:00:00.000Z',
  windowEnd: '2026-09-12T00:00:00.000Z',
  host: 'vintagealarm.github.io',
  current: { pageviews: 10, visits: 8, channels: [], pages: [], entryPages: [], externalEntryFlows: [], internalFlows: [], countries: [], devices: [], xProfileEntries: 2 },
  legacy: { host: 'orima1995-create.github.io', current: { pageviews: 3, visits: 2, channels: [], pages: [], entryPages: [], externalEntryFlows: [], internalFlows: [], countries: [], devices: [], xProfileEntries: 0 } },
  combined: { current: { pageviews: 13, visits: 10, channels: [], pages: [], entryPages: [], externalEntryFlows: [], internalFlows: [], countries: [], devices: [], xProfileEntries: 2 }, trend: [], note: 'host-scoped sum' },
  profileTracking: { path: '/x/' },
  limitations: { attribution: 'not post-level attribution' },
};

const markdown = renderAnalyticsMarkdown(sample);
assert(markdown.includes('Primary combined visits: 10'), 'combined visits missing');
assert(markdown.includes('X profile entries (/x/): 2'), 'X profile entries missing');
assert(markdown.includes('not post-level attribution'), 'limitations missing');

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
  const htmlResponse = await onRequestGet({ request: new Request(relay.toString()) });
  assert(htmlResponse.headers.get('content-type').includes('text/html'), 'default should be HTML');
  assert(htmlResponse.headers.get('X-Analytics-Export') === sample.schemaVersion, 'verified export marker missing');
  assert((await htmlResponse.text()).includes('Primary combined visits: 10'), 'HTML must retain totals');
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

console.log('AI relay: OK');
