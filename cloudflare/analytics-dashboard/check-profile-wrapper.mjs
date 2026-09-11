import profileWorker, { patchAnalyticsPayload, patchDashboardHtml, X_PROFILE_TRACKING } from './profile-worker.js';

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const payload = patchAnalyticsPayload({
  current: {
    pages: [{ path: '/x/', name: '/x/', mapped: false, pageviews: 3, visits: 2 }],
    flows: [{ sourcePath: '', sourceCleanPath: '', destinationPath: '/x/', destinationName: '/x/', destinationMapped: false, visits: 2, pageviews: 3 }],
  },
  previous: { pages: [] },
  legacy: { current: { pages: [] }, previous: { pages: [] } },
  combined: { current: { pages: [{ path: '/x/', name: '/x/', mapped: false, pageviews: 3, visits: 2 }] }, previous: { pages: [] } },
});

assert(payload.profileTracking.path === '/x/', 'missing profileTracking metadata');
assert(payload.current.pages[0].name === 'X Profile', 'profile page name was not mapped');
assert(payload.current.pages[0].mapped === true, 'profile page must be mapped');
assert(payload.current.xProfileEntries === 2, 'profile entry count mismatch');
assert(payload.combined.current.xProfileEntries === 2, 'combined profile entry count mismatch');
assert(payload.current.flows[0].destinationName === 'X Profile', 'profile flow destination was not mapped');

const fixture = [
  '<button class="refresh" id="aiShare">AI COPY</button>',
  'const campaigns=getCampaigns();',
  'const platform=item.migration?"MIGRATION":item.platform==="YouTube"?"YOUTUBE":"X";',
  'const platform=item.platform==="YouTube"?"YouTube":"X";',
  'const color=item.migration?"#706d67":platform==="YouTube"?COLORS.YouTube:COLORS.X;',
  'eventIndex(campaigns)+',
  'document.getElementById("refresh").addEventListener("click",()=>{load();renderDiscoveryInbox();});'
].join('\n');
const patchedHtml = patchDashboardHtml(fixture);
assert(patchedHtml.includes('Xプロフィール専用URL発行'), 'system timeline event was not injected');
assert(patchedHtml.includes('X PROFILE ENTRY'), 'profile KPI was not injected');
assert(patchedHtml.includes('X Profile'), 'profile event platform was not injected');
assert(patchedHtml.includes('id="aiReadable">AI URL</button>'), 'AI URL button was not injected');
assert(patchedHtml.includes('/api/ai-readable-link?window='), 'AI URL handler was not injected');
assert(X_PROFILE_TRACKING.url === 'https://vintagealarm.github.io/x/', 'profile URL changed unexpectedly');

const auth = `Basic ${Buffer.from('admin:test-password').toString('base64')}`;
const env = { DASHBOARD_PASSWORD: 'test-password', CF_API_TOKEN: 'test-cloudflare-token' };
const dashboardResponse = await profileWorker.fetch(
  new Request('https://dashboard.example/', { headers: { Authorization: auth } }),
  env,
  {},
);
assert(dashboardResponse.ok, 'wrapped dashboard did not render');
const dashboardHtml = await dashboardResponse.text();
assert(dashboardHtml.includes('X PROFILE ENTRY'), 'real dashboard HTML is missing profile KPI');
assert(dashboardHtml.includes('Xプロフィール専用URL発行'), 'real dashboard HTML is missing profile system event');
assert(dashboardHtml.includes('item.platform==="X Profile"'), 'real dashboard HTML is missing X Profile marker handling');
assert(dashboardHtml.includes('id="aiReadable">AI URL</button>'), 'real dashboard HTML is missing AI URL button');

const linkResponse = await profileWorker.fetch(
  new Request('https://dashboard.example/api/ai-readable-link?window=7d', { headers: { Authorization: auth } }),
  env,
  {},
);
assert(linkResponse.ok, 'AI readable link endpoint failed');
const linkPayload = await linkResponse.json();
assert(linkPayload.ttlSeconds === 900, 'AI readable URL TTL must be 15 minutes');
const readableUrl = new URL(linkPayload.url);
assert(readableUrl.hostname === 'vintage-alarm-ai-relay.pages.dev', 'AI readable URL must use self-hosted relay');
const signedSource = new URL(readableUrl.searchParams.get('source'));
assert(signedSource.hostname === 'dashboard.example', 'signed source must point back to analytics Worker origin');
assert(signedSource.pathname === '/api/ai-export', 'signed source path mismatch');
assert(signedSource.searchParams.get('window') === '7d', 'signed source window mismatch');
assert(signedSource.searchParams.get('sig')?.length === 64, 'signed source signature missing');

console.log('X profile attribution + AI readable URL wrapper: OK');
