import entryWorker from './entry-worker.js';

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const auth = `Basic ${Buffer.from('admin:test-password').toString('base64')}`;
const env = {
  DASHBOARD_PASSWORD: 'test-password',
  CF_API_TOKEN: 'test-cloudflare-token',
};

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
  assert(externalFetchCalls === 0, 'AI URL issuance unexpectedly made a global fetch');

  const readableUrl = new URL(payload.url);
  assert(readableUrl.hostname === 'vintage-alarm-ai-relay.pages.dev', 'AI readable URL must use the self-hosted relay');
  const sourceRaw = readableUrl.searchParams.get('source');
  assert(sourceRaw, 'relay URL is missing signed source');
  const signedSource = new URL(sourceRaw);
  assert(signedSource.hostname === 'dashboard.example', 'signed source must point back to analytics Worker origin');
  assert(signedSource.pathname === '/api/ai-export', 'signed source path mismatch');
  assert(signedSource.searchParams.get('window') === '7d', 'signed source window mismatch');
  assert(signedSource.searchParams.get('sig')?.length === 64, 'signed source signature missing');

  const unauthenticated = await entryWorker.fetch(
    new Request('https://dashboard.example/api/ai-readable-link?window=7d'),
    env,
    {},
  );
  assert(unauthenticated.status === 401, 'AI URL issuance must remain Basic Auth protected');
} finally {
  globalThis.fetch = originalFetch;
}

console.log('AI URL entry worker: signed URL issuance without relay preflight: OK');
