import { buildAiFallbackFragment, buildReaderUrl, buildShortRelayUrl } from './entry-worker.js';

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
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
        { name: 'Direct / Unknown', visits: 39 },
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

const reader = buildReaderUrl(shortRelay);
assert(reader.hostname === 'r.jina.ai', 'AI URL must use Jina Reader transport');
assert(reader.toString() === 'https://r.jina.ai/https://vintage-alarm-ai-relay.pages.dev/s/v1/7d/1999999999/' + 'a'.repeat(64), 'Jina Reader URL format mismatch');

let rejected = false;
try {
  buildReaderUrl('https://example.com/s/v1/7d/1999999999/' + 'a'.repeat(64));
} catch {
  rejected = true;
}
assert(rejected, 'AI Reader must reject non-relay targets');

console.log('AI URL entry worker: Jina Reader transport + signed relay + portable fallback schema: OK');
