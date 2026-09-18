import { buildAiFallbackFragment, buildShortRelayUrl } from './entry-worker.js';

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const sample = {
  generatedAt: '2026-09-17T10:00:00.000Z',
  windowKey: '7d',
  hostMigration: { date: '2026-09-10' },
  freshness: { latestEventBucket: '2026-09-17', eventGapSeconds: 0 },
  current: { visits: 63, pageviews: 75 },
  previous: { visits: 0, pageviews: 0 },
  legacy: { current: { visits: 5, pageviews: 5 } },
  combined: {
    current: {
      visits: 68,
      pageviews: 80,
      xProfileEntries: 2,
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
      entryPages: [
        { path: '/', visits: 26, pageviews: 26 },
        { path: '/cyma-time-o-vox/', visits: 10, pageviews: 13 },
        { path: '/pierce-duofon/', visits: 10, pageviews: 12 },
      ],
      externalEntryFlows: [
        { channel: 'X', sourceHost: 't.co', destinationPath: '/pierce-duofon/', visits: 6 },
        { channel: 'Other Referral', sourceHost: 'www.watchuseek.com', destinationPath: '/cyma-time-o-vox/', visits: 2 },
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
      { bucket: '2026-09-16', pageviews: 7, visits: 3, x: 2, youtube: 0, instagram: 0, facebook: 0, otherSns: 0, search: 0, direct: 1, ai: 0, other: 0 },
      { bucket: '2026-09-17', pageviews: 9, visits: 6, x: 4, youtube: 0, instagram: 0, facebook: 0, otherSns: 0, search: 0, direct: 2, ai: 0, other: 0 },
    ],
  },
};

const fallback = buildAiFallbackFragment(sample);
assert(fallback.startsWith('VA2;window=7d;'), 'portable snapshot schema prefix missing');
assert(fallback.includes('visits=68;pageviews=80'), 'portable snapshot totals missing');
assert(fallback.includes('new=63/75;old=5/5;previous=10/10'), 'host or previous totals missing');
assert(fallback.includes('x=19'), 'portable snapshot channel totals missing');
assert(fallback.includes('internalVisits=8;internalPV=1'), 'internal visits/PV must be explicit and separate');
assert(!fallback.includes(';internal=8;'), 'ambiguous legacy internal field must not be emitted');
assert(fallback.includes('xprofile=2'), 'X profile total missing');
assert(fallback.includes('migration=2026-09-10'), 'migration marker missing');
assert(fallback.includes('latest=2026-09-17;gap=0'), 'freshness marker missing');
assert(fallback.includes('pages=/:26/26,/cyma-time-o-vox/:10/13'), 'portable snapshot entry pages missing');
assert(fallback.includes('external=X@t.co~/pierce-duofon/:6,OTHER@www.watchuseek.com~/cyma-time-o-vox/:2'), 'portable snapshot external flow missing source host');
assert(fallback.includes('flow=vintagealarm.github.io@/cyma-time-o-vox/~/pierce-duofon/:1/0'), 'portable snapshot internal flow missing host context');
assert(fallback.includes('handoff=orima1995-create.github.io@/>vintagealarm.github.io@/cyma-time-o-vox/:2/2'), 'portable snapshot host migration flow missing');
assert(fallback.includes('sns=/pierce-duofon/:7/0/0/0/7'), 'SNS landing summary missing');
assert(fallback.includes('trend=2026-09-16/7/3/2/0/0/0/0/0/1/0/0,2026-09-17/9/6/4/0/0/0/0/0/2/0/0'), 'trend summary missing');

const signed = 'https://vintage-alarm-analytics.orima1995.workers.dev/api/ai-export?window=7d&expires=1999999999&sig=' + 'a'.repeat(64);
const shortRelay = buildShortRelayUrl(signed);
assert(shortRelay.toString() === 'https://vintage-alarm-ai-relay.pages.dev/s/v1/7d/1999999999/' + 'a'.repeat(64), 'short relay URL format mismatch');

console.log('AI URL entry worker: signed relay + self-contained VA2 analytics snapshot: OK');
