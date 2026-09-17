import entryWorker, { buildAiFallbackFragment, buildShortRelayUrl } from './entry-worker.js';

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const auth = `Basic ${Buffer.from('admin:test-password').toString('base64')}`;
const env = {
  DASHBOARD_PASSWORD: 'test-password',
  CF_API_TOKEN: 'test-cloudflare-token',
};

const sample = {
  generatedAt: '2026-09-17T10:00:00.000Z',
  windowKey: '7d',
  current: { visits: 63, pageviews: 75 },
  legacy: { current: { visits: 5, pageviews: 5 } },
  combined: {
    current: {
      visits: 68,
      pageviews: 80,
      channels: [
        { name: 'X', visits: 19 },
        { name: 'YouTube', visits: 0 },
        { name: 'Instagram', visits: 0 },
        { name: 'Facebook', visits: 0 },
        { name: 'Organic Search', visits: 0 },
        { name: 'Direct / Unknown', visits: 39 },
        { name: 'AI Assistant', visits: 0 },
        { name: 'Other Referral', visits: 2 },
        { name: 'Internal Navigation', visits: 8 },
      ],
      entryPages: [
        { path: '/', visits: 26, pageviews: 26 },
        { path: '/cyma-time-o-vox/', visits: 10, pageviews: 13 },
        { path: '/pierce-duofon/', visits: 10, pageviews: 12 },
      ],
      externalEntryFlows: [
        { channel: 'X', destinationPath: '/pierce-duofon/', visits: 6 },
      ],
      internalFlows: [
        { sourceCleanPath: '/cyma-time-o-vox/', destinationPath: '/pierce-duofon/', pageviews: 1 },
      ],
      countries: [{ name: 'United States', pageviews: 27 }, { name: 'Japan', pageviews: 19 }],
      devices: [{ name: 'Desktop', pageviews: 44 }, { name: 'Mobile', pageviews: 36 }],
    },
  },
};

const fallback = buildAiFallbackFragment(sample);
assert(fallback.startsWith('VA1;window=7d;'), 'portable fallback schema prefix missing');
assert(fallback.includes('visits=68;pageviews=80'), 'portable fallback totals missing');
assert(fallback.includes('x=19'), 'portable fallback channel totals missing');
assert(fallback.includes('pages=/:26/26,/cyma-time-o-vox/:10/13'), 'portable fallback entry pages missing');
assert(fallback.includes('external=X~/pierce-duofon/:6'), 'portable fallback external flow missing');
assert(fallback.includes('flow=/cyma-time-o-vox/~/pierce-duofon/:1'), 'portable fallback internal flow missing');

const signed = 'https://vintage-alarm-analytics.orima1995.workers.dev/api/ai-export?window=7d&expires=1999999999&sig=' + 'a'.repeat(64);
const shortRelay = buildShortRelayUrl(signed);
assert(shortRelay.toString() === 'https://vintage-alarm-ai-relay.pages.dev/s/v1/7d/1999999999/' + 'a'.repeat(64), 'short relay URL format mismatch');

const originalFetch = globalThis.fetch;
let externalFetchCalls = 0;
globalThis.fetch = async () => {
  externalFetchCalls += 1;
  throw new Error('entry worker must not probe the relay before issuing a URL');
};

try {
  const response = await entryWorker.fetch(
    new Request('https://dashboard.example/api/ai-readable-link?window=7d', {
      headers: { Authorization: auth },
    }),
    env,
    {},
  );

  assert(response.ok, 'entry worker must issue an AI readable URL without relay preflight');
  const payload = await response.json();
  assert(payload.ttlSeconds === 900, 'AI readable URL TTL must be 15 minutes');
  assert(payload.deliveryVerified === false, 'issuance must not claim relay delivery was verified');
  assert(payload.deliveryVerification === 'deferred-to-relay-request', 'delivery verification mode mismatch');
  assert(payload.fallbackIncluded === false, 'failed snapshot lookup must degrade to URL-only issuance');
  assert(externalFetchCalls === 0, 'URL-only fallback unexpectedly made a global fetch');

  const readableUrl = new URL(payload.url);
  assert(readableUrl.hostname === 'vintage-alarm-ai-relay.pages.dev', 'AI readable URL must use the self-hosted relay');
  assert(/^\/s\/v1\/7d\/\d{10,}\/[0-9a-f]{64}$/.test(readableUrl.pathname), 'AI readable URL must use the short signed relay path');
  assert(!readableUrl.searchParams.get('source'), 'short AI URL must not carry a nested source query');

  const unauthenticated = await entryWorker.fetch(
    new Request('https://dashboard.example/api/ai-readable-link?window=7d'),
    env,
    {},
  );
  assert(unauthenticated.status === 401, 'AI URL issuance must remain Basic Auth protected');
} finally {
  globalThis.fetch = originalFetch;
}

console.log('AI URL entry worker: short signed URL + portable fallback schema: OK');
