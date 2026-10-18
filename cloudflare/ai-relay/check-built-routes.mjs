import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { readFile } from 'node:fs/promises';

// Test Wrangler's assembled router, not a direct import of the handler.
const filename = resolve(process.argv[2]);
const compiled = await readFile(filename, 'utf8');
let moduleUrl = pathToFileURL(filename).href;
if (compiled.startsWith('--')) {
  // Wrangler 4 serializes --outfile as a multipart Worker upload bundle.
  const boundary = compiled.split('\r\n', 1)[0].slice(2);
  const form = await new Response(compiled, { headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` } }).formData();
  const metadata = JSON.parse(form.get('metadata'));
  const code = await form.get(metadata.main_module).text();
  moduleUrl = 'data:text/javascript;base64,' + Buffer.from(code).toString('base64');
}
const { default: worker } = await import(moduleUrl);
const originalFetch = globalThis.fetch;
let upstreamCalls = 0;
const env = { ASSETS: { fetch: () => new Response('STATIC FALLBACK', { status: 200 }) } };
const ctx = { waitUntil() {} };
const run = path => worker.fetch(new Request('https://relay.example' + path), env, ctx);
try {
  globalThis.fetch = async () => {
    upstreamCalls++;
    return Response.json({ schemaVersion: 'vintage-alarm-ai-export-v1', generatedAt: new Date().toISOString(), current: { visits: 3, pageviews: 8 } });
  };
  const expires = Math.floor(Date.now() / 1000) + 300;
  for (const path of [`/s/v1/24h/${expires}/${'a'.repeat(64)}`, `/s/v2/24h/auto/-/-/${expires}/${'a'.repeat(64)}`]) {
    const response = await run(path);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('X-Analytics-Export'), 'vintage-alarm-ai-export-v1');
    assert.match(await response.text(), /^# VINTAGE ALARM ANALYTICS/);
  }
  assert.equal(upstreamCalls, 2);
  for (const path of ['/s/v2/bad', `/s/v2/24h/auto/-/-/1000000000/${'a'.repeat(64)}`]) {
    const response = await run(path);
    assert.equal(response.status, 400, 'invalid or expired short routes must not fall back to static HTTP 200');
    assert.match(response.headers.get('cache-control'), /no-store/);
  }
  assert.equal(upstreamCalls, 2, 'invalid routes must not call upstream');
  globalThis.fetch = async () => new Response('denied', { status: 403 });
  assert.equal((await run(`/s/v2/24h/auto/-/-/${expires}/${'b'.repeat(64)}`)).status, 403);
  assert.match(await (await run('/')).text(), /No analytics data/);
} finally {
  globalThis.fetch = originalFetch;
}
console.log('Compiled Pages router: v1/v2 success, expiry, malformed path and upstream failure: OK');
