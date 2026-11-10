// VINTAGE ALARM operational SNS attribution.
// USER-CONFIRMED reporting rule: Facebook referrals are counted under the
// Instagram promotion funnel. Cloudflare's raw channel labels remain intact.
const n = (value) => Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0;

export function operationalInstagramBreakdown(period) {
  const channels = Array.isArray(period?.channels) ? period.channels : [];
  const visits = (name) => channels
    .filter((row) => row?.name === name)
    .reduce((total, row) => total + n(row?.visits), 0);
  const instagramRaw = visits("Instagram");
  const facebookRaw = visits("Facebook");
  return {
    instagramRaw,
    facebookRaw,
    instagramOperational: instagramRaw + facebookRaw,
    rule: "USER_CONFIRMED_FB_AS_INSTAGRAM_OPERATIONAL",
    evidence: "Reporting convention; Facebook referrer does not independently prove an Instagram user or click.",
  };
}

// Public-safe, read-only summary prepared by the existing Cloudflare GraphQL
// credentials in GitHub Actions. No credentials, raw referrer URLs, IPs,
// cookies, devices, geolocation, or Arrival Probe event rows are emitted.
export function buildAgentAnalyticsReport(payload, rangeKey) {
  if (!payload || payload.error || !payload?.combined?.current) {
    throw new Error("Missing analytics payload, cannot produce a public report");
  }
  const current = payload.combined.current;
  const previous = payload.combined.previous;
  const breakdown = operationalInstagramBreakdown(current);
  const getChannel = (name) => (current.channels || [])
    .filter((row) => row?.name === name)
    .reduce((sum, row) => sum + n(row?.visits), 0);
  const preview = (current.pages || []).filter((x) => typeof x?.path === "string")
    .sort((a,b) => n(b?.visits) - n(a?.visits) || n(b?.pageviews) - n(a?.pageviews))
    .slice(0, 20)
    .map((row) => ({ path: String(row.path).slice(0, 160), visits: n(row.visits), pageviews: n(row.pageviews) }));
  const trend = (payload?.combined?.trend || []).slice(-31).map((row) => ({
    bucket: String(row.label || row.bucket || "").slice(0, 45),
    visits: n(row.visits), pageviews: n(row.pageviews),
    sampleInterval: n(row.sampleInterval || 1),
    status: String(row.status || "").slice(0, 64),
  }));
  return {
    rangeKey,
    generatedAt: payload.generatedAt,
    windowStart: payload.windowStart,
    windowEnd: payload.windowEnd,
    visits: n(current.visits), pageviews: n(current.pageviews),
    previousVisits: payload.compareMode === "previous-period" ? n(previous?.visits) : null,
    previousPageviews: payload.compareMode === "previous-period" ? n(previous?.pageviews) : null,
    quality: current.quality,
    sampleInterval: n(current.sampleInterval || 1),
    completeness: current.completeness || null,
    integrityStatus: current.integrity?.status || "UNKNOWN",
    channels: {
      instagramOperational: breakdown.instagramOperational,
      instagramRaw: breakdown.instagramRaw,
      facebookRaw: breakdown.facebookRaw,
      x: getChannel("X"),
      youtube: getChannel("YouTube"),
      search: getChannel("Organic Search"),
      directUnknown: getChannel("Direct / Unknown"),
      otherSNS: getChannel("Other SNS"),
      otherReferral: getChannel("Other Referral"),
      aiAssistant: getChannel("AI Assistant"),
    },
    topPages: preview,
    trend,
    // This independent GraphQL collector has no Cloudflare Durable Object binding,
    // so it must not claim to use the exact daily archive.
    longRangeArchive: "NOT_ACCESSIBLE_IN_GITHUB_ACTIONS",
    attributionRule: breakdown.rule,
    source: "Cloudflare Web Analytics GraphQL: standalone snapshot; not a unique-person count",
  };
}
