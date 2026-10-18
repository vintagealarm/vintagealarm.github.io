import assert from 'node:assert/strict';
const origin = 'https://vintage-alarm-ai-relay.pages.dev';
const expires = Math.floor(Date.now() / 1000) + 600;
const signature = 'a'.repeat(64); // Intentionally invalid: no analytics access.
const cases = [
  ['landing', '/', 200, 'No analytics data'],
  ['expired path', `/s/v2/24h/auto/-/-/1000000000/${signature}`, 400, 'Signed analytics source has expired.'],
  ['upstream reachable', `/s/v2/24h/auto/-/-/${expires}/${signature}`, 401, 'AI analytics source failed (HTTP 401).'],
];
for (const [label, path, status, marker] of cases) {
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const response = await fetch(origin + path, { redirect: 'manual', signal: AbortSignal.timeout(20000) });
      const body = await response.text();
      assert.equal(response.status, status, `${label}: expected HTTP ${status}, got ${response.status}`);
      assert.ok(body.includes(marker), `${label}: expected body marker missing`);
      assert.match(response.headers.get('cache-control') || '', /no-store/);
      assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow, noarchive');
      console.log(`${label}: HTTP ${status}, body and privacy headers verified`);
      break;
    } catch (error) {
      console.error(`${label}: attempt ${attempt}/5: ${error.message}`);
      if (attempt === 5) throw error;
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}
