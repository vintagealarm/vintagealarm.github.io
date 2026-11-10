import { strict as assert } from "node:assert";
import { operationalInstagramBreakdown, buildAgentAnalyticsReport } from "../cloudflare/analytics-dashboard/agent-analytics-report.js";
import { aiExportPeriod } from "../cloudflare/analytics-dashboard/worker.js";
import { buildAiFallbackFragment } from "../cloudflare/analytics-dashboard/entry-worker.js";

const current = {
  visits: 5, pageviews: 5, quality: "UNSAMPLED", sampleInterval: 1,
  integrity: { status: "PASS" },
  completeness: { pages: true },
  channels: [
    { name: "Instagram", visits: 0 },
    { name: "Facebook", visits: 2 },
    { name: "Direct / Unknown", visits: 3 },
  ],
  pages: [
    { path: "/en/how-they-ring/", visits: 2, pageviews: 2 },
    { path: "/en/history/", visits: 1, pageviews: 1 },
  ],
};
const op=operationalInstagramBreakdown(current);
assert.deepEqual([op.instagramRaw,op.facebookRaw,op.instagramOperational],[0,2,2],
  "FB must be counted under Instagram operation without rewriting the raw referrer");
const mixed=operationalInstagramBreakdown({ channels: [
  { name: "Instagram", visits: 4 }, { name: "Facebook", visits: 3 },
] });
assert.equal(mixed.instagramOperational, 7, "Instagram operational should not double-count raw visits");
assert.equal(aiExportPeriod(current).operationalInstagram.instagramOperational,2,
  "signed AI export should retain the user-designated FB→Instagram attribution");

const payload = {
  generatedAt: "2026-11-10T03:00:00Z", windowStart: "2026-11-09T03:00:00Z",
  windowEnd: "2026-11-10T03:00:00Z", compareMode: "previous-period",
  combined: { current, previous: { visits: 3, pageviews: 3 },
    trend: [{ label: "11/9", visits: 5, pageviews: 5, status: "UNSAMPLED", sampleInterval: 1 }] },
};
const report=buildAgentAnalyticsReport(payload,"24h");
assert.equal(report.visits,5);
assert.equal(report.channels.instagramOperational,2);
assert.equal(report.channels.instagramRaw,0);
assert.equal(report.channels.facebookRaw,2);
assert.equal(report.channels.directUnknown,3);
assert.equal(report.previousVisits,3);
assert.equal(report.quality,"UNSAMPLED");
assert(!JSON.stringify(report).includes("cf_api"), "no API credentials in public report");
assert(!("countries" in report) && !("devices" in report) && !("arrivalProbe" in report),
  "country, devices and arrival probes must never be public report fields");
assert.deepEqual(report.topPages.map(x=>x.path),["/en/how-they-ring/","/en/history/"]);
assert.equal(report.longRangeArchive,"NOT_ACCESSIBLE_IN_GITHUB_ACTIONS");
assert.throws(()=>buildAgentAnalyticsReport({error:"bad"},"7d"), /Missing analytics payload/);

const va2=buildAiFallbackFragment({
  generatedAt: payload.generatedAt, windowKey: "24h", rangeKey: "24h", bucketKey: "1h",
  current, previous: payload.combined.previous,
  combined: { ...payload.combined, current: aiExportPeriod(current) },
});
assert(va2.includes(";instagramOperational=2;"),"portable VA2 must show Instagram operational including Facebook");
assert(va2.includes(";instagram=0;facebook=2;"), "portable VA2 must keep raw Facebook and Instagram fields");
console.log("Agent analytics public-scope and FB→Instagram reporting regressions: OK");
