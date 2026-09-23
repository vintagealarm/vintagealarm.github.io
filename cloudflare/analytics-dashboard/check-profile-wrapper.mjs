import profileWorker, { buildFreshness, ENGLISH_GATEWAY_NAMES, GERMAN_GATEWAY_NAMES, HISTORY_GATEWAY_NAMES, RESEARCH_PAGE_NAMES, patchAnalyticsPayload, patchDashboardHtml, WATCH_PAGE_NAMES, X_PROFILE_TRACKING } from './profile-worker.js';
import { readWatchPublicationState } from '../../scripts/watch-publication.mjs';

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const emptyValues = () => ({ X: 0, Instagram: 0, Facebook: 0, 'Other SNS': 0 });
const baseSnsEntries = (otherValues = emptyValues(), otherTotal = 0, complete = true) => ({
  pages: [
    { path: '/cyma-time-o-vox/', name: 'Cyma Time-O-Vox', values: emptyValues(), total: 0 },
    { path: '/pierce-duofon/', name: 'Pierce Duofon', values: emptyValues(), total: 0 },
    { path: '/basis-alarm/', name: 'Basis Alarm', values: emptyValues(), total: 0 },
    { path: 'other', name: 'Other pages', values: otherValues, total: otherTotal },
  ],
  total: otherTotal,
  complete,
});

const snsFlows = [
  { sourcePath: '', sourceCleanPath: '', destinationPath: '/citizen-alarm/', destinationName: '/citizen-alarm/', destinationMapped: false, channel: 'X', visits: 2, pageviews: 2 },
  { sourcePath: '', sourceCleanPath: '', destinationPath: '/westclox-watchlarm/', destinationName: '/westclox-watchlarm/', destinationMapped: false, channel: 'Facebook', visits: 3, pageviews: 3 },
  { sourcePath: '', sourceCleanPath: '', destinationPath: '/en/basis-alarm/', destinationName: '/en/basis-alarm/', destinationMapped: false, channel: 'X', visits: 1, pageviews: 1 },
  { sourcePath: '', sourceCleanPath: '', destinationPath: '/en/history/', destinationName: '/en/history/', destinationMapped: false, channel: 'X', visits: 1, pageviews: 1 },
  { sourcePath: '', sourceCleanPath: '', destinationPath: '/x/', destinationName: '/x/', destinationMapped: false, channel: 'X', visits: 2, pageviews: 2 },
  { sourcePath: '', sourceCleanPath: '', destinationPath: '/unknown/', destinationName: '/unknown/', destinationMapped: false, channel: 'X', visits: 1, pageviews: 1 },
];

const payload = patchAnalyticsPayload({
  current: {
    pages: [
      { path: '/x/', name: '/x/', mapped: false, pageviews: 3, visits: 2 },
      { path: '/citizen-alarm/', name: '/citizen-alarm/', mapped: false, pageviews: 2, visits: 2 },
      { path: '/westclox-watchlarm/', name: '/westclox-watchlarm/', mapped: false, pageviews: 3, visits: 3 },
      { path: '/en/basis-alarm/', name: '/en/basis-alarm/', mapped: false, pageviews: 1, visits: 1 },
      { path: '/de/pierce-duofon/', name: '/de/pierce-duofon/', mapped: false, pageviews: 1, visits: 1 },
      { path: '/en/history/', name: '/en/history/', mapped: false, pageviews: 1, visits: 1 },
      { path: '/de/history/', name: '/de/history/', mapped: false, pageviews: 1, visits: 1 },
      { path: '/how-they-ring/', name: '/how-they-ring/', mapped: false, pageviews: 1, visits: 1 },
      { path: '/wittnauer-10wa/', name: '/wittnauer-10wa/', mapped: false, pageviews: 1, visits: 1 },
    ],
    flows: [
      { sourcePath: '', sourceCleanPath: '', destinationPath: '/x/', destinationName: '/x/', destinationMapped: false, channel: 'Direct / Unknown', visits: 2, pageviews: 3 },
      ...snsFlows,
    ],
    snsEntries: baseSnsEntries({ X: 7, Instagram: 0, Facebook: 3, 'Other SNS': 0 }, 10),
  },
  previous: { pages: [], flows: [], snsEntries: baseSnsEntries() },
  legacy: {
    current: { pages: [], flows: [], snsEntries: baseSnsEntries() },
    previous: { pages: [], flows: [], snsEntries: baseSnsEntries() },
  },
  combined: {
    current: {
      pages: [
        { path: '/citizen-alarm/', name: '/citizen-alarm/', mapped: false, pageviews: 2, visits: 2 },
        { path: '/westclox-watchlarm/', name: '/westclox-watchlarm/', mapped: false, pageviews: 3, visits: 3 },
        { path: '/en/basis-alarm/', name: '/en/basis-alarm/', mapped: false, pageviews: 1, visits: 1 },
        { path: '/de/pierce-duofon/', name: '/de/pierce-duofon/', mapped: false, pageviews: 1, visits: 1 },
        { path: '/en/history/', name: '/en/history/', mapped: false, pageviews: 1, visits: 1 },
      ],
      flows: snsFlows,
      snsEntries: baseSnsEntries({ X: 7, Instagram: 0, Facebook: 3, 'Other SNS': 0 }, 10),
    },
    previous: { pages: [], flows: [], snsEntries: baseSnsEntries() },
  },
});

const publishedWatchPaths = readWatchPublicationState()
  .filter((watch) => watch.published)
  .map((watch) => `/${watch.slug}/`)
  .sort();
const analyticsWatchPaths = Object.keys(WATCH_PAGE_NAMES).sort();
assert(
  JSON.stringify(analyticsWatchPaths) === JSON.stringify(publishedWatchPaths),
  `analytics WATCH mapping must exactly match published WATCH routes: ${publishedWatchPaths.join(', ')}`
);
assert(Object.keys(ENGLISH_GATEWAY_NAMES).length === 7, 'analytics must track English index plus all six WATCH gateways');
assert(Object.keys(GERMAN_GATEWAY_NAMES).length === 7, 'analytics must track German index plus all six WATCH gateways');
assert(Object.keys(HISTORY_GATEWAY_NAMES).length === 3, 'analytics must track Japanese, English and German HISTORY pages');
assert(RESEARCH_PAGE_NAMES['/how-they-ring/'] === 'How They Ring', 'How They Ring research mapping missing');
assert(RESEARCH_PAGE_NAMES['/en/how-they-ring/'] === 'How They Ring (EN)', 'English How They Ring mapping missing');
assert(RESEARCH_PAGE_NAMES['/de/how-they-ring/'] === 'How They Ring (DE)', 'German How They Ring mapping missing');
assert(ENGLISH_GATEWAY_NAMES['/en/wittnauer-10wa/'] === 'Wittnauer Cal.10WA (EN)', 'Wittnauer English gateway mapping missing');
assert(GERMAN_GATEWAY_NAMES['/de/basis-alarm/'] === 'Basis Alarm (DE)', 'Basis German gateway mapping missing');
assert(GERMAN_GATEWAY_NAMES['/de/citizen-alarm/'] === 'Citizen Alarm (DE)', 'Citizen German gateway mapping missing');
assert(GERMAN_GATEWAY_NAMES['/de/wittnauer-10wa/'] === 'Wittnauer Cal.10WA (DE)', 'Wittnauer German gateway mapping missing');
assert(WATCH_PAGE_NAMES['/wittnauer-10wa/'] === 'Wittnauer Cal.10WA', 'Wittnauer WATCH mapping missing');
assert(HISTORY_GATEWAY_NAMES['/history/'] === 'HISTORY', 'Japanese HISTORY mapping missing');
assert(HISTORY_GATEWAY_NAMES['/en/history/'] === 'HISTORY (EN)', 'English HISTORY mapping missing');
assert(HISTORY_GATEWAY_NAMES['/de/history/'] === 'HISTORY (DE)', 'German HISTORY mapping missing');
assert(GERMAN_GATEWAY_NAMES['/de/cyma-time-o-vox/'] === 'Cyma Time-O-Vox (DE)', 'Cyma German gateway mapping missing');
assert(payload.profileTracking.path === '/x/', 'missing profileTracking metadata');
assert(payload.current.pages[0].name === 'X Profile' && payload.current.pages[0].mapped === true, 'profile page was not mapped');
assert(payload.current.pages[1].name === 'Citizen Alarm' && payload.current.pages[1].mapped === true, 'Citizen page was not mapped');
assert(payload.current.pages[3].name === 'Basis Alarm (EN)' && payload.current.pages[3].mapped === true, 'Basis English gateway was not mapped');
assert(payload.current.pages[4].name === 'Pierce Duofon (DE)' && payload.current.pages[4].mapped === true, 'Duofon German gateway was not mapped');
assert(payload.current.pages[5].name === 'HISTORY (EN)' && payload.current.pages[5].mapped === true, 'English HISTORY page was not mapped');
assert(payload.current.pages[6].name === 'HISTORY (DE)' && payload.current.pages[6].mapped === true, 'German HISTORY page was not mapped');
assert(payload.current.pages[7].name === 'How They Ring' && payload.current.pages[7].mapped === true, 'How They Ring page was not mapped');
assert(payload.current.pages[8].name === 'Wittnauer Cal.10WA' && payload.current.pages[8].mapped === true, 'Wittnauer page was not mapped');
assert(payload.current.xProfileEntries === 2, 'profile entry count mismatch');
assert(payload.current.flows[0].destinationName === 'X Profile', 'profile flow destination was not mapped');
assert(payload.current.flows[1].destinationName === 'Citizen Alarm', 'Citizen flow destination was not mapped');
assert(payload.current.flows[3].destinationName === 'Basis Alarm (EN)', 'Basis English gateway flow destination was not mapped');
assert(payload.current.flows[4].destinationName === 'HISTORY (EN)', 'English HISTORY flow destination was not mapped');

const snsTotals = Object.fromEntries(payload.current.snsEntries.pages.map((row) => [row.name, row.total]));
assert(payload.current.snsEntries.pages.length === 28, 'SNS chart must contain all tracked WATCH/gateway/HISTORY/research rows, X Profile, plus Other pages');
assert(snsTotals['Citizen Alarm'] === 2, 'Citizen SNS visits mismatch');
assert(snsTotals['Westclox Watchlarm'] === 3, 'Westclox SNS visits mismatch');
assert(snsTotals['Basis Alarm (EN)'] === 1, 'Basis English SNS visits mismatch');
assert(snsTotals['HISTORY'] === 0, 'Japanese HISTORY SNS row missing');
assert(snsTotals['HISTORY (EN)'] === 1, 'English HISTORY SNS visits mismatch');
assert(snsTotals['HISTORY (DE)'] === 0, 'German HISTORY SNS row missing');
assert(snsTotals['How They Ring'] === 0, 'How They Ring SNS row missing');
assert(snsTotals['Wittnauer Cal.10WA'] === 0, 'Wittnauer SNS row missing');
assert(snsTotals['X Profile'] === 2, 'X Profile SNS visits must not remain in Other pages');
assert(snsTotals['Other pages'] === 1, 'Other SNS visits mismatch');
assert(payload.current.snsEntries.total === 10, 'SNS base total must be preserved while reallocating rows');
assert(payload.current.snsEntries.complete === true, 'SNS completeness flag must remain true when flow rows are below the cap');

const exportedPayload = patchAnalyticsPayload({
  current: {
    pages: [{ path: '/x/', name: '/x/', mapped: false, pageviews: 2, visits: 2 }],
    externalEntryFlows: snsFlows,
    flowRowsComplete: true,
    snsEntries: baseSnsEntries({ X: 7, Instagram: 0, Facebook: 3, 'Other SNS': 0 }, 10),
  },
});
const exportedSns = Object.fromEntries(exportedPayload.current.snsEntries.pages.map((row) => [row.name, row.total]));
assert(exportedSns['Westclox Watchlarm'] === 3, 'AI export SNS reallocation must use externalEntryFlows');
assert(exportedSns['HISTORY (EN)'] === 1, 'AI export HISTORY SNS reallocation failed');
assert(exportedSns['X Profile'] === 2, 'AI export X Profile SNS reallocation failed');
assert(exportedSns['Other pages'] === 1, 'AI export Other pages must retain only untracked destinations');
assert(exportedPayload.current.snsEntries.complete === true, 'AI export flow completeness marker must be respected');

const cappedFlows = Array.from({ length: 200 }, (_, index) => ({
  destinationPath: index % 2 ? '/citizen-alarm/' : '/unknown/',
  channel: 'X',
  visits: 1,
  pageviews: 1,
}));
const capped = patchAnalyticsPayload({
  current: { pages: [], flows: cappedFlows, snsEntries: baseSnsEntries({ X: 200, Instagram: 0, Facebook: 0, 'Other SNS': 0 }, 200, true) },
});
assert(capped.current.snsEntries.total === 200, 'flow cap must not change the exact base SNS total');
assert(capped.current.snsEntries.complete === false, 'flow-cap reallocation must be marked incomplete');

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
  'document.getElementById("refresh").addEventListener("click",()=>{window.location.reload();});'
].join('\n');
const patchedHtml = patchDashboardHtml(fixture);
assert(patchedHtml.includes('Xプロフィール専用URL発行'), 'system timeline event was not injected');
assert(patchedHtml.includes('X PROFILE ENTRY'), 'profile KPI was not injected');
assert(patchedHtml.includes('X Profile'), 'profile event platform was not injected');
assert(patchedHtml.includes('id="aiReadable">AI URL</button>'), 'AI URL button was not injected');
assert(patchedHtml.includes('/api/ai-readable-link?'), 'AI URL handler was not injected');
assert(patchedHtml.includes('analyticsQuery'), 'AI URL handler must preserve current range/bucket query');
assert(patchedHtml.includes('["Basis Alarm","Wittnauer Cal.10WA","Pierce Duofon","Cyma Time-O-Vox","Citizen Alarm","Westclox Watchlarm","Basis Alarm (EN)","Pierce Duofon (EN)","Cyma Time-O-Vox (EN)","Citizen Alarm (EN)","Westclox Watchlarm (EN)","German Entry","Pierce Duofon (DE)","Cyma Time-O-Vox (DE)","Westclox Watchlarm (DE)"]'), 'WATCH share list changed unexpectedly');
assert(patchedHtml.includes('{name:"HISTORY",path:"/history/"}'), 'Japanese HISTORY key page was not injected');
assert(patchedHtml.includes('{name:"HISTORY (EN)",path:"/en/history/"}'), 'English HISTORY key page was not injected');
assert(patchedHtml.includes('{name:"HISTORY (DE)",path:"/de/history/"}'), 'German HISTORY key page was not injected');
assert(patchedHtml.includes('{name:"Wittnauer Cal.10WA",path:"/wittnauer-10wa/"}'), 'Wittnauer key page was not injected');
assert(patchedHtml.includes('{name:"How They Ring",path:"/how-they-ring/"}'), 'How They Ring key page was not injected');
assert(X_PROFILE_TRACKING.url === 'https://vintagealarm.github.io/x/', 'profile URL changed unexpectedly');

const freshness = buildFreshness({
  generatedAt: '2026-09-24T00:00:00.000Z',
  combined: {
    trendBucket: '7d',
    trend: [{
      bucket: '2026-09-14T15:00:00.000Z',
      bucketStart: '2026-09-14T15:00:00.000Z',
      bucketEnd: '2026-09-21T15:00:00.000Z',
      pageviews: 42,
      visits: 32,
    }],
  },
});
assert(freshness.bucketKind === '7d', 'new aggregated bucket kind must be recognized');
assert(freshness.bucketEnd === '2026-09-21T15:00:00.000Z', 'event gap must use explicit bucket end');
assert(freshness.eventGapSeconds === 205200, 'event gap must be measured from bucket end, not bucket start');

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
assert(dashboardHtml.includes('{name:"HISTORY",path:"/history/"}'), 'real dashboard is missing Japanese HISTORY key page');
assert(dashboardHtml.includes('{name:"HISTORY (EN)",path:"/en/history/"}'), 'real dashboard is missing English HISTORY key page');
assert(dashboardHtml.includes('{name:"HISTORY (DE)",path:"/de/history/"}'), 'real dashboard is missing German HISTORY key page');
assert(dashboardHtml.includes('{name:"Wittnauer Cal.10WA",path:"/wittnauer-10wa/"}'), 'real dashboard is missing Wittnauer key page');
assert(dashboardHtml.includes('{name:"How They Ring",path:"/how-they-ring/"}'), 'real dashboard is missing How They Ring key page');

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
globalThis.fetch = async () => new Response('unavailable', { status: 503 });
const failed = await profileWorker.fetch(new Request('https://dashboard.example/api/ai-readable-link?window=7d', { headers: { Authorization: auth } }), env, {});
assert(failed.status === 502, 'unavailable relay must block link issuance');
assert(!(await failed.json()).url, 'failed preflight must not return a URL');
const unauthenticated = await profileWorker.fetch(new Request('https://dashboard.example/api/ai-readable-link'), env, {});
assert(unauthenticated.status === 401, 'issuance still needs authentication');
globalThis.fetch = originalFetch;
console.log('Six-WATCH analytics + English/German gateways + localized HISTORY + SNS reallocation + X profile attribution + AI readable URL wrapper: OK');
