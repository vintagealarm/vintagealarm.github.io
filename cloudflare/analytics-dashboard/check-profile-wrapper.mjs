import profileWorker, { patchAnalyticsPayload, patchDashboardHtml, WATCH_PAGE_NAMES, X_PROFILE_TRACKING } from './profile-worker.js';

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const snsFlows = [
  { sourcePath: '', sourceCleanPath: '', destinationPath: '/citizen-alarm/', destinationName: '/citizen-alarm/', destinationMapped: false, channel: 'X', visits: 2, pageviews: 2 },
  { sourcePath: '', sourceCleanPath: '', destinationPath: '/westclox-watchlarm/', destinationName: '/westclox-watchlarm/', destinationMapped: false, channel: 'Facebook', visits: 3, pageviews: 3 },
  { sourcePath: '', sourceCleanPath: '', destinationPath: '/unknown/', destinationName: '/unknown/', destinationMapped: false, channel: 'X', visits: 1, pageviews: 1 },
];

const payload = patchAnalyticsPayload({
  current: {
    pages: [
      { path: '/x/', name: '/x/', mapped: false, pageviews: 3, visits: 2 },
      { path: '/citizen-alarm/', name: '/citizen-alarm/', mapped: false, pageviews: 2, visits: 2 },
      { path: '/westclox-watchlarm/', name: '/westclox-watchlarm/', mapped: false, pageviews: 3, visits: 3 },
    ],
    flows: [
      { sourcePath: '', sourceCleanPath: '', destinationPath: '/x/', destinationName: '/x/', destinationMapped: false, channel: 'Direct / Unknown', visits: 2, pageviews: 3 },
      ...snsFlows,
    ],
    snsEntries: { pages: [], total: 0, complete: true },
  },
  previous: { pages: [], flows: [], snsEntries: { pages: [], total: 0, complete: true } },
  legacy: {
    current: { pages: [], flows: [], snsEntries: { pages: [], total: 0, complete: true } },
    previous: { pages: [], flows: [], snsEntries: { pages: [], total: 0, complete: true } },
  },
  combined: {
    current: {
      pages: [
        { path: '/citizen-alarm/', name: '/citizen-alarm/', mapped: false, pageviews: 2, visits: 2 },
        { path: '/westclox-watchlarm/', name: '/westclox-watchlarm/', mapped: false, pageviews: 3, visits: 3 },
      ],
      flows: snsFlows,
      snsEntries: { pages: [], total: 0, complete: true },
    },
    previous: { pages: [], flows: [], snsEntries: { pages: [], total: 0, complete: true } },
  },
});

assert(Object.keys(WATCH_PAGE_NAMES).length === 5, 'analytics must track exactly five published WATCH pages');
assert(WATCH_PAGE_NAMES['/citizen-alarm/'] === 'Citizen Alarm', 'Citizen WATCH mapping missing');
assert(WATCH_PAGE_NAMES['/westclox-watchlarm/'] === 'Westclox Watchlarm', 'Westclox WATCH mapping missing');
assert(payload.profileTracking.path === '/x/', 'missing profileTracking metadata');
assert(payload.current.pages[0].name === 'X Profile', 'profile page name was not mapped');
assert(payload.current.pages[0].mapped === true, 'profile page must be mapped');
assert(payload.current.pages[1].name === 'Citizen Alarm' && payload.current.pages[1].mapped === true, 'Citizen page was not mapped');
assert(payload.current.pages[2].name === 'Westclox Watchlarm' && payload.current.pages[2].mapped === true, 'Westclox page was not mapped');
assert(payload.current.xProfileEntries === 2, 'profile entry count mismatch');
assert(payload.current.flows[0].destinationName === 'X Profile', 'profile flow destination was not mapped');
assert(payload.current.flows[1].destinationName === 'Citizen Alarm', 'Citizen flow destination was not mapped');
assert(payload.current.flows[2].destinationName === 'Westclox Watchlarm', 'Westclox flow destination was not mapped');

const snsTotals = Object.fromEntries(payload.current.snsEntries.pages.map((row) => [row.name, row.total]));
assert(payload.current.snsEntries.pages.length === 6, 'SNS chart must contain five WATCH rows plus Other pages');
assert(snsTotals['Basis Alarm'] === 0, 'Basis SNS row missing');
assert(snsTotals['Pierce Duofon'] === 0, 'Pierce SNS row missing');
assert(snsTotals['Cyma Time-O-Vox'] === 0, 'Cyma SNS row missing');
assert(snsTotals['Citizen Alarm'] === 2, 'Citizen SNS visits mismatch');
assert(snsTotals['Westclox Watchlarm'] === 3, 'Westclox SNS visits mismatch');
assert(snsTotals['Other pages'] === 1, 'Other SNS visits mismatch');
assert(payload.current.snsEntries.total === 6, 'SNS total mismatch');
assert(payload.current.snsEntries.complete === true, 'SNS completeness flag must be preserved');

const fixture = [
  '<button class="refresh" id="aiShare">AI COPY</button>',
  'const watchEntry=c.pages.filter(x=>["Basis Alarm","Pierce Duofon","Cyma Time-O-Vox"].includes(x.name)).reduce((s,x)=>s+x.visits,0);',
  'const KEY_PAGES=[',
  '  {name:"TOP",path:"/"},',
  '  {name:"Cyma Time-O-Vox",path:"/cyma-time-o-vox/"}',
  '];',
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
assert(patchedHtml.includes('["Basis Alarm","Pierce Duofon","Cyma Time-O-Vox","Citizen Alarm","Westclox Watchlarm"]'), 'WATCH share list was not expanded to five pages');
assert(patchedHtml.includes('{name:"Citizen Alarm",path:"/citizen-alarm/"}'), 'Citizen key page was not injected');
assert(patchedHtml.includes('{name:"Westclox Watchlarm",path:"/westclox-watchlarm/"}'), 'Westclox key page was not injected');
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
assert(dashboardHtml.includes('["Basis Alarm","Pierce Duofon","Cyma Time-O-Vox","Citizen Alarm","Westclox Watchlarm"]'), 'real dashboard WATCH share list is not five pages');
assert(dashboardHtml.includes('{name:"Citizen Alarm",path:"/citizen-alarm/"}'), 'real dashboard is missing Citizen key page');
assert(dashboardHtml.includes('{name:"Westclox Watchlarm",path:"/westclox-watchlarm/"}'), 'real dashboard is missing Westclox key page');

const originalFetch = globalThis.fetch;
let probeHeaders;
globalThis.fetch = async (url, options) => {
  probeHeaders = options.headers;
  return new Response('# VINTAGE ALARM ANALYTICS — test', { headers: { 'X-Analytics-Export': 'vintage-alarm-ai-export-v1' } });
};
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

assert(linkPayload.deliveryVerified === true, 'delivery must be checked before issuance');
assert(!probeHeaders.Authorization, 'dashboard credentials must not reach relay');
globalThis.fetch = async () => new Response('unavailable', {status: 503});
const failed = await profileWorker.fetch(new Request('https://dashboard.example/api/ai-readable-link?window=7d', {headers: {Authorization: auth}}), env, {});
assert(failed.status === 502, 'unavailable relay must block link issuance');
assert(!(await failed.json()).url, 'failed preflight must not return a URL');
const unauthenticated = await profileWorker.fetch(new Request('https://dashboard.example/api/ai-readable-link'), env, {});
assert(unauthenticated.status === 401, 'issuance still needs authentication');
globalThis.fetch = originalFetch;
console.log('Five-WATCH analytics + X profile attribution + AI readable URL wrapper: OK');
