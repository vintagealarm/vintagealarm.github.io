import { arrivalProbeResponse, buildAiFallbackFragment, buildShortRelayUrl, queryArrivalProbe } from './entry-worker.js';

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const sample = {
  generatedAt: '2026-09-17T10:00:00.000Z',
  windowKey: '7d',
  rangeKey: '7d',
  bucketKey: '1d',
  compareMode: 'previous-period',
  hostMigration: { date: '2026-09-10' },
  freshness: { latestEventBucket: '2026-09-17', latestNonZeroBucket: '2026-09-17', eventGapLowerBoundSeconds: 0 },
  arrivalProbe: {
    available: true,
    diagnosticOnly: true,
    dataset: 'va_arrival_probe_v1',
    version: 'v1',
    total: 4,
    x: 3,
    sampleInterval: 1,
    complete: true,
    rows: [
      { path: '/wittnauer-10wa/', source: 'x', arrivals: 3, sampleInterval: 1 },
      { path: '/wittnauer-10wa/', source: 'direct', arrivals: 1, sampleInterval: 1 },
    ],
  },
  current: { visits: 63, pageviews: 75 },
  previous: { visits: 0, pageviews: 0 },
  legacy: { current: { visits: 5, pageviews: 5 } },
  combined: {
    current: {
      visits: 68,
      pageviews: 80,
      xProfileEntries: 2,
      sampleInterval: 10,
      quality: 'SAMPLED / ESTIMATE',
      sampling: { total: 1, pages: 1, referrers: 1, flows: 10, entries: 1, countries: 1, devices: 1 },
      completeness: { pages: true, referrers: true, flows: true, entries: true, countries: true, devices: true },
      flowRowsComplete: true,
      integrity: { status: 'PASS', failures: [], estimateDrift: [], skipped: [] },
      channels: [
        { name: 'X', visits: 19 },
        { name: 'YouTube', visits: 0 },
        { name: 'Instagram', visits: 0 },
        { name: 'Facebook', visits: 0 },
        { name: 'Other SNS', visits: 0 },
        { name: 'Organic Search', visits: 0 },
        { name: 'Direct / Unknown', visits: 39 },
        { name: 'AI Assistant', visits: 0 },
        { name: 'Other Referral', visits: 2 },
        { name: 'Internal Navigation', visits: 8 },
      ],
      pages: [
        { path: '/', visits: 26, pageviews: 26 },
        { path: '/cyma-time-o-vox/', visits: 10, pageviews: 13 },
        { path: '/pierce-duofon/', visits: 10, pageviews: 12 },
        { path: '/history/', visits: 0, pageviews: 2 },
      ],
      entryPages: [
        { path: '/', visits: 26, pageviews: 26 },
        { path: '/cyma-time-o-vox/', visits: 10, pageviews: 13 },
        { path: '/pierce-duofon/', visits: 10, pageviews: 12 },
      ],
      externalEntryFlows: [
        { channel: 'X', sourceHost: 't.co', destinationPath: '/pierce-duofon/', country: 'Japan', device: 'Desktop', visits: 6 },
        { channel: 'X', sourceHost: 't.co', destinationPath: '/pierce-duofon/', country: 'United States', device: 'Mobile', visits: 4 },
        { channel: 'Other Referral', sourceHost: 'www.watchuseek.com', destinationPath: '/cyma-time-o-vox/', country: 'United States', device: 'Desktop', visits: 2 },
      ],
      internalFlows: [
        { sourceHost: 'vintagealarm.github.io', destinationHost: 'vintagealarm.github.io', sourceCleanPath: '/cyma-time-o-vox/', destinationPath: '/pierce-duofon/', pageviews: 1, visits: 0 },
      ],
      migrationFlows: [
        { sourceHost: 'orima1995-create.github.io', destinationHost: 'vintagealarm.github.io', sourceCleanPath: '/', destinationPath: '/cyma-time-o-vox/', pageviews: 2, visits: 2 },
      ],
      snsEntries: {
        pages: [
          { path: '/pierce-duofon/', values: { X: 7, Instagram: 0, Facebook: 0, 'Other SNS': 0 }, total: 7 },
        ],
      },
      countries: [{ name: 'United States', pageviews: 27 }, { name: 'Japan', pageviews: 19 }],
      devices: [{ name: 'Desktop', pageviews: 44 }, { name: 'Mobile', pageviews: 36 }],
    },
    previous: { visits: 10, pageviews: 10 },
    trend: [
      { bucket: '2026-09-16T00:00:00.000Z', label: '9/16', status: 'UNSAMPLED', sampleInterval: 1, internalPV: 1, pageviews: 7, visits: 3, x: 2, youtube: 0, instagram: 0, facebook: 0, otherSns: 0, search: 0, direct: 1, ai: 0, other: 0 },
      { bucket: '2026-09-17T00:00:00.000Z', label: '9/17', status: 'SAMPLED / ESTIMATE', sampleInterval: 10, internalPV: 2, pageviews: 9, visits: 6, x: 4, youtube: 0, instagram: 0, facebook: 0, otherSns: 0, search: 0, direct: 2, ai: 0, other: 0 },
    ],
  },
};

const fallback = buildAiFallbackFragment(sample);
assert(fallback.startsWith('VA2;window=7d;range=7d;bucket=1d;'), 'portable snapshot range/bucket prefix missing');
assert(fallback.includes('quality=SAMPLED_/_ESTIMATE;sample=10;sampleParts=1/1/1/10/1/1/1;coverage=1/1/1/1/1/1'), 'portable snapshot sampling/coverage metadata missing');
assert(fallback.includes(';structSample=1/10;structCoverage=1/1;integrity=PASS;'), 'portable snapshot structural sampling/coverage/integrity metadata missing');
assert(fallback.includes('visits=68;pageviews=80'), 'portable snapshot totals missing');
assert(fallback.includes('new=63/75;old=5/5;compare=previous-period;previous=10/10'), 'host or previous totals missing');
assert(fallback.includes('x=19'), 'portable snapshot channel totals missing');
assert(fallback.includes('internalVisits=8;internalPV=1'), 'internal visits/PV must be explicit and separate');
assert(!fallback.includes(';internal=8;'), 'ambiguous legacy internal field must not be emitted');
assert(fallback.includes('xprofile=2'), 'X profile total missing');
assert(fallback.includes('migration=2026-09-10'), 'migration marker missing');
assert(fallback.includes('latestBucket=2026-09-17;gapLower=0'), 'freshness marker must describe aggregate bucket and lower-bound gap');
assert(fallback.includes('pages=/:26/26,/cyma-time-o-vox/:13/10,/pierce-duofon/:12/10,/history/:2/0'), 'portable snapshot pages must expose pageviews/visits including internal-only pages');
assert(fallback.includes('entries=/:26/26,/cyma-time-o-vox/:10/13,/pierce-duofon/:10/12'), 'portable snapshot entries must remain separate from all-page totals');
assert(fallback.includes('externalCoverage=2/2/12/12/1'), 'external flow coverage metadata missing');
assert(fallback.includes('probe=1/4/3/1/1'), 'arrival probe summary missing');
assert(fallback.includes('probeRows=/wittnauer-10wa/@x:3,/wittnauer-10wa/@direct:1'), 'arrival probe path/source rows missing');
assert(fallback.includes('external=X@t.co~/pierce-duofon/:10,OTHER@www.watchuseek.com~/cyma-time-o-vox/:2'), 'portable snapshot must aggregate country/device variants before compacting');
assert(fallback.includes('flow=vintagealarm.github.io@/cyma-time-o-vox/~/pierce-duofon/:1/0'), 'portable snapshot internal flow missing host context');
assert(fallback.includes('handoff=orima1995-create.github.io@/>vintagealarm.github.io@/cyma-time-o-vox/:2/2'), 'portable snapshot host migration flow missing');
assert(fallback.includes('sns=/pierce-duofon/:7/0/0/0/7'), 'SNS landing summary missing');
assert(fallback.includes('trend=9-16/7/3/2/0/0/0/0/0/1/0/0/1/UNSAMPLED/1,9-17/9/6/4/0/0/0/0/0/2/0/0/2/SAMPLED-ESTIMATE/10'), 'trend summary with delimiter-safe quality metadata missing');

const allRangeFallback = buildAiFallbackFragment({
  ...sample,
  windowKey: 'all',
  rangeKey: 'all',
  compareMode: 'none',
  combined: { ...sample.combined, previous: { visits: 0, pageviews: 0 } },
});
assert(allRangeFallback.includes(';compare=none;previous=NA;'), 'ALL range must not serialize unavailable previous-period data as zero traffic');

const longStatusFallback = buildAiFallbackFragment({
  ...sample,
  combined: {
    ...sample.combined,
    trend: [{
      ...sample.combined.trend[0],
      status: 'PARTIAL / MIGRATION / SAMPLED / ESTIMATE',
      sampleInterval: 10,
    }],
  },
});
assert(longStatusFallback.includes('/PARTIAL-MIGRATION-SAMPLED-ESTIMATE/10'), 'trend status must not be silently truncated');

const probeWrites = [];
const probeEnv = {
  ARRIVAL_PROBE: {
    writeDataPoint(point) {
      probeWrites.push(point);
    },
  },
};
const probeResponse = await arrivalProbeResponse(
  new Request('https://dashboard.test/api/arrival-probe', {
    method: 'POST',
    headers: {
      Origin: 'https://vintagealarm.github.io',
      'Content-Type': 'text/plain;charset=UTF-8',
    },
    body: JSON.stringify({ path: '/wittnauer-10wa/?x=1', source: 'x' }),
  }),
  probeEnv,
);
assert(probeResponse.status === 204, 'arrival probe must accept canonical-site POSTs');
assert(probeWrites.length === 1, 'arrival probe must write exactly one datapoint');
assert(probeWrites[0].indexes[0] === '/wittnauer-10wa/', 'arrival probe must normalize path');
assert(probeWrites[0].blobs[0] === 'x' && probeWrites[0].blobs[1] === 'v1', 'arrival probe source/version mismatch');

const probeHead = await arrivalProbeResponse(
  new Request('https://dashboard.test/api/arrival-probe', {
    method: 'HEAD',
    headers: { Origin: 'https://vintagealarm.github.io' },
  }),
  probeEnv,
);
assert(probeHead.status === 204 && probeWrites.length === 1, 'arrival probe HEAD health check must not write');

const probeForbidden = await arrivalProbeResponse(
  new Request('https://dashboard.test/api/arrival-probe', {
    method: 'POST',
    headers: { Origin: 'https://example.com' },
    body: '{}',
  }),
  probeEnv,
);
assert(probeForbidden.status === 403, 'arrival probe must reject foreign origins');

let probeSql = '';
const probeSummary = await queryArrivalProbe({
  CF_ACCOUNT_ID: 'test-account',
  CF_API_TOKEN: 'test-token',
  PROBE_SQL_FETCH: async (_url, options) => {
    probeSql = options.body;
    return new Response(JSON.stringify({
      data: [
        { path: '/wittnauer-10wa/', source: 'x', arrivals: 3, sampleInterval: 1, firstAt: '2026-09-17 10:01:00', lastAt: '2026-09-17 10:03:00' },
        { path: '/wittnauer-10wa/', source: 'direct', arrivals: 1, sampleInterval: 1, firstAt: '2026-09-17 10:04:00', lastAt: '2026-09-17 10:04:00' },
      ],
      rows: 2,
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  },
}, '2026-09-17T10:00:00.000Z', '2026-09-17T11:00:00.000Z');
assert(probeSummary.available === true, 'arrival probe query must be available with a successful SQL response');
assert(probeSummary.total === 4 && probeSummary.x === 3, 'arrival probe query totals mismatch');
assert(probeSummary.sampleInterval === 1 && probeSummary.complete === true, 'arrival probe query quality metadata mismatch');
assert(probeSql.includes('FROM va_arrival_probe_v1'), 'arrival probe SQL dataset missing');
assert(probeSql.includes("blob2 = 'v1'"), 'arrival probe SQL version filter missing');

const signed = 'https://vintage-alarm-analytics.orima1995.workers.dev/api/ai-export?window=custom&range=custom&bucket=7d&start=2026-09-08&end=2026-09-21&expires=1999999999&sig=' + 'a'.repeat(64);
const shortRelay = buildShortRelayUrl(signed);
assert(shortRelay.toString() === 'https://vintage-alarm-ai-relay.pages.dev/s/v2/custom/7d/2026-09-08/2026-09-21/1999999999/' + 'a'.repeat(64), 'short relay v2 URL format mismatch');

console.log('AI URL entry worker: signed relay + self-contained VA2 analytics snapshot: OK');
