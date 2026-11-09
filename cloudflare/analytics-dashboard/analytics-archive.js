// Pure helpers for the Cloudflare Web Analytics rolling daily archive.
// A stored UTC day is used only when its full interval falls inside the requested range.
export const ARCHIVE_DAY_MS = 24 * 60 * 60 * 1000;
export const ARCHIVE_MAX_SLICE_MS = 7 * ARCHIVE_DAY_MS;

const GROUP_LIMITS = {
  pages: 100, channels: 100, referers: 100, flowSummary: 1000,
  flows: 200, entries: 1000, countries: 100, devices: 30,
};

export function isUnsampledArchiveSnapshot(snapshot) {
  const account = snapshot?.period?.viewer?.accounts?.[0];
  if (!account || !Array.isArray(account.total) || account.total.length !== 1 ||
      !Array.isArray(snapshot?.trend)) return false;
  if (!Object.keys(GROUP_LIMITS).every((key) =>
    Array.isArray(account[key]) && account[key].length < GROUP_LIMITS[key] &&
    account[key].every((row) => Number(row?.avg?.sampleInterval || 1) === 1)
  )) return false;
  if (Number(account.total[0]?.avg?.sampleInterval || 1) !== 1) return false;
  if (!snapshot.trend.every((point) => Number(point?.sampleInterval || 1) === 1)) return false;
  // Both queries must cover the same completed day, not just return a 200 response.
  const totalViews = Number(account.total[0]?.count || 0);
  const totalVisits = Number(account.total[0]?.sum?.visits || 0);
  if (snapshot.trend.reduce((n, point) => n + Number(point?.pageviews || 0), 0) !== totalViews ||
      snapshot.trend.reduce((n, point) => n + Number(point?.visits || 0), 0) !== totalVisits) return false;
  return Number.isFinite(totalViews) && Number.isFinite(totalVisits) &&
    totalViews >= 0 && totalVisits >= 0;
}

export function planAnalyticsArchive(start, end, records = [], maxMs = ARCHIVE_MAX_SLICE_MS) {
  const first = new Date(start).getTime();
  const last = new Date(end).getTime();
  if (!Number.isFinite(first) || !Number.isFinite(last) || last <= first ||
      !Number.isFinite(maxMs) || maxMs <= 0) throw new Error("Invalid analytics archive range.");
  const available = new Map(
    (records || []).filter((record) => isUnsampledArchiveSnapshot(record))
      .map((record) => [String(record.dayUtc), record]),
  );
  const slices = [];
  let liveFrom = null;
  let eligibleDays = 0;
  let archivedDays = 0;
  const flush = (until) => {
    if (liveFrom === null) return;
    for (let ms = liveFrom; ms < until;) {
      const next = Math.min(until, ms + maxMs);
      slices.push({ kind: "live", start: new Date(ms), end: new Date(next) });
      ms = next;
    }
    liveFrom = null;
  };
  for (let ms = first; ms < last;) {
    const dayStart = Math.floor(ms / ARCHIVE_DAY_MS) * ARCHIVE_DAY_MS;
    const dayEnd = dayStart + ARCHIVE_DAY_MS;
    const fullDay = ms === dayStart && dayEnd <= last;
    const key = new Date(dayStart).toISOString().slice(0, 10);
    const record = fullDay ? available.get(key) : null;
    if (fullDay) eligibleDays += 1;
    if (record) {
      flush(ms);
      slices.push({ kind: "archive", start: new Date(ms), end: new Date(dayEnd), record });
      archivedDays += 1;
    } else if (liveFrom === null) liveFrom = ms;
    ms = Math.min(dayEnd, last);
  }
  flush(last);
  return { slices, coverage: { archivedHostDays: archivedDays, eligibleHostDays: eligibleDays } };
}
