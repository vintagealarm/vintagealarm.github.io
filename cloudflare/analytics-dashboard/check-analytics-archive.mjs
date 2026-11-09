import { strict as assert } from "node:assert";
import { ARCHIVE_DAY_MS, isUnsampledArchiveSnapshot, planAnalyticsArchive, planEffectiveArchive } from "./analytics-archive.js";
import { ArrivalProbeStore } from "./entry-worker.js";

const dayUtc = "2026-11-02";
const one = (dimensions = {}) => ({
  count: 3, sum: { visits: 2 }, avg: { sampleInterval: 1 }, dimensions,
});
function snapshot(date = dayUtc) {
  return {
    dayUtc: date,
    period: { viewer: { accounts: [{
      total: [one()],
      pages: [one({ requestPath: "/" })],
      channels: [one({ refererHost: "" })],
      referers: [one({ refererHost: "", refererPath: "" })],
      flowSummary: [one({ requestPath: "/", refererHost: "", refererPath: "" })],
      flows: [one({ requestPath: "/", refererHost: "", refererPath: "", countryName: "Japan", deviceType: "Desktop" })],
      entries: [one({ requestPath: "/", refererHost: "" })],
      countries: [one({ countryName: "Japan" })],
      devices: [one({ deviceType: "Desktop" })],
    }] } },
    trend: [{ bucket: date, pageviews: 3, visits: 2, sampleInterval: 1 }],
  };
}
assert(isUnsampledArchiveSnapshot(snapshot()), "a fully reconciled unsampled day must be eligible");
const sampled = snapshot("2026-11-01");
sampled.period.viewer.accounts[0].total[0].avg.sampleInterval = 10;
assert(!isUnsampledArchiveSnapshot(sampled), "sampled historical data must never become a falsely exact archive");
const incomplete = snapshot("2026-11-03");
incomplete.period.viewer.accounts[0].pages = [];
assert(!isUnsampledArchiveSnapshot(incomplete), "missing page rows must never be called exact");
const mismatched = snapshot("2026-11-04");
mismatched.trend[0].visits = 9;
assert(!isUnsampledArchiveSnapshot(mismatched), "daily trend mismatch must block archival");

const start = new Date("2026-10-30T10:00:00Z");
const end = new Date("2026-11-04T10:00:00Z");
const plan = planAnalyticsArchive(start, end, [snapshot("2026-10-31"), sampled, snapshot("2026-11-02")]);
assert.equal(plan.coverage.archivedHostDays, 2);
assert.equal(plan.coverage.eligibleHostDays, 4);
assert.equal(plan.slices.filter((part) => part.kind === "archive").length, 2);
assert.equal(plan.slices[0].start.toISOString(), start.toISOString());
assert.equal(plan.slices.at(-1).end.toISOString(), end.toISOString());
for (let i = 1; i < plan.slices.length; i++) {
  assert.equal(plan.slices[i - 1].end.toISOString(), plan.slices[i].start.toISOString(),
    "archive and live periods must not overlap or leave gaps");
}
const short = planEffectiveArchive(new Date("2026-11-01T10:00:00Z"), new Date("2026-11-08T10:00:00Z"));
assert.equal(short.slices.length, 1, "seven-day requests must still use one API slice");
assert.equal(short.slices[0].kind, "live");
const beforeCapture = planEffectiveArchive(new Date("2026-10-01T10:00:00Z"), new Date("2026-10-31T10:00:00Z"));
assert.equal(beforeCapture.slices.length, 5, "archive-free 30D requests must retain existing seven-day chunks");
const afterCapture = planEffectiveArchive(start, end, [snapshot("2026-10-31"), snapshot("2026-11-02")]);
assert.equal(afterCapture.coverage.archivedHostDays, 2, "stored archive must be used when available");
const daysCovered = plan.slices.reduce((total, part) => total + part.end - part.start, 0);
assert.equal(daysCovered, end - start, "the full requested rolling window must be covered");
assert(plan.slices.filter((part) => part.kind === "live").every((part) =>
  part.end - part.start <= 7 * ARCHIVE_DAY_MS), "historical fallbacks must stay within seven-day GraphQL chunks");

const rows = new Map();
const ctx = { storage: { sql: {
  exec(query, ...values) {
    if (query.includes("INSERT OR IGNORE INTO analytics_daily_archive")) {
      const key = values[0] + ":" + values[1];
      if (!rows.has(key)) rows.set(key, { host: values[0], day_utc: values[1], snapshot_json: values[2] });
    }
    if (query.includes("SELECT day_utc, snapshot_json")) {
      const [host, from, to] = values;
      return { toArray: () => [...rows.values()].filter((row) =>
        row.host === host && row.day_utc >= from && row.day_utc <= to) };
    }
    return { toArray: () => [] };
  },
} } };
const object = new ArrivalProbeStore(ctx, {});
const host = "vintagealarm.github.io";
const write = (record) => object.fetch(new Request("https://arrival-probe.internal/archive/write", {
  method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ ...record, host }),
}));
assert.equal((await write(snapshot())).status, 204, "exact daily snapshot must be stored");
assert.equal((await write(snapshot())).status, 204, "repeat runs must be idempotent");
assert.equal(rows.size, 1);
assert.equal((await write(sampled)).status, 422, "sampled day should be rejected by storage");
const response = await object.fetch(new Request("https://arrival-probe.internal/archive/query", {
  method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ host, start: "2026-11-01T00:00:00Z", end: "2026-11-03T00:00:00Z" }),
}));
assert.equal(response.status, 200);
const stored = await response.json();
assert.deepEqual(stored.records.map((row) => row.dayUtc), [dayUtc]);
console.log("Analytics 30D archive: exact-only, coverage, no overlaps, idempotent DO: OK");
