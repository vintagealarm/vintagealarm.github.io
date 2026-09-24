import profileWorker from "./profile-worker.js";
import baseWorker from "./worker.js";

const AI_READABLE_RELAY = "https://vintage-alarm-ai-relay.pages.dev/";
const AI_READABLE_TTL_SECONDS = 15 * 60;
const ARRIVAL_PROBE_PATH = "/api/arrival-probe";
const ARRIVAL_PROBE_ORIGIN = "https://vintagealarm.github.io";
const ARRIVAL_PROBE_DATASET = "va_arrival_probe_v1";
const ARRIVAL_PROBE_VERSION = "v1";
const ARRIVAL_PROBE_SOURCES = new Set([
  "x",
  "facebook",
  "instagram",
  "youtube",
  "search",
  "watchuseek",
  "internal",
  "direct",
  "other",
]);

function arrivalProbeHeaders() {
  return {
    "Access-Control-Allow-Origin": ARRIVAL_PROBE_ORIGIN,
    "Access-Control-Allow-Methods": "POST, HEAD, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
  };
}

function trustedArrivalProbeRequest(request) {
  const origin = request.headers.get("Origin") || "";
  if (origin) return origin === ARRIVAL_PROBE_ORIGIN;
  const referer = request.headers.get("Referer") || "";
  return referer === ARRIVAL_PROBE_ORIGIN || referer.startsWith(ARRIVAL_PROBE_ORIGIN + "/");
}

function normalizeArrivalProbePath(value) {
  let path = String(value || "/").trim().split(/[?#]/, 1)[0] || "/";
  if (!path.startsWith("/")) path = "/" + path;
  path = path.replace(/\/{2,}/g, "/");
  if (path.length > 180) path = path.slice(0, 180);
  return path;
}

function normalizeArrivalProbeSource(value) {
  const source = String(value || "other").trim().toLowerCase();
  return ARRIVAL_PROBE_SOURCES.has(source) ? source : "other";
}

export async function arrivalProbeResponse(request, env) {
  const headers = arrivalProbeHeaders();
  if (!trustedArrivalProbeRequest(request)) {
    return new Response("Forbidden", { status: 403, headers });
  }

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (!env?.ARRIVAL_PROBE || typeof env.ARRIVAL_PROBE.writeDataPoint !== "function") {
    return new Response("Arrival probe binding unavailable", { status: 503, headers });
  }

  if (request.method === "HEAD") {
    return new Response(null, { status: 204, headers });
  }

  if (request.method !== "POST") {
    return new Response("POST only", { status: 405, headers });
  }

  const raw = await request.text();
  if (raw.length > 1024) {
    return new Response("Payload too large", { status: 413, headers });
  }

  let payload;
  try {
    payload = JSON.parse(raw || "{}");
  } catch {
    return new Response("Invalid JSON", { status: 400, headers });
  }

  const path = normalizeArrivalProbePath(payload?.path);
  const source = normalizeArrivalProbeSource(payload?.source);

  env.ARRIVAL_PROBE.writeDataPoint({
    indexes: [path],
    blobs: [source, ARRIVAL_PROBE_VERSION],
    doubles: [1],
  });

  return new Response(null, { status: 204, headers });
}

function sqlDateTime(value) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) throw new Error("Invalid arrival-probe query time.");
  return date.toISOString().slice(0, 19).replace("T", " ");
}

export async function queryArrivalProbe(env, start, end) {
  if (!start || !end || !env?.CF_ACCOUNT_ID || !env?.CF_API_TOKEN) {
    return { available: false, reason: "configuration-unavailable", dataset: ARRIVAL_PROBE_DATASET, total: 0, x: 0, rows: [] };
  }

  const query = `
SELECT
  index1 AS path,
  blob1 AS source,
  SUM(_sample_interval) AS arrivals,
  max(_sample_interval) AS sampleInterval,
  min(timestamp) AS firstAt,
  max(timestamp) AS lastAt
FROM ${ARRIVAL_PROBE_DATASET}
WHERE
  timestamp >= toDateTime('${sqlDateTime(start)}')
  AND timestamp < toDateTime('${sqlDateTime(end)}')
  AND blob2 = '${ARRIVAL_PROBE_VERSION}'
GROUP BY path, source
ORDER BY arrivals DESC, path ASC, source ASC
LIMIT 200
FORMAT JSON`.trim();

  const request = typeof env.PROBE_SQL_FETCH === "function" ? env.PROBE_SQL_FETCH : fetch;
  let response;
  try {
    response = await request(
      `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/analytics_engine/sql`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.CF_API_TOKEN}`,
          Accept: "application/json",
        },
        body: query,
      },
    );
  } catch {
    return { available: false, reason: "query-failed", dataset: ARRIVAL_PROBE_DATASET, total: 0, x: 0, rows: [] };
  }

  if (!response.ok) {
    const detail = await response.text();
    const datasetMissing = /unknown table|does not exist|not found/i.test(detail);
    return {
      available: false,
      reason: datasetMissing ? "dataset-not-ready" : "query-failed",
      dataset: ARRIVAL_PROBE_DATASET,
      total: 0,
      x: 0,
      rows: [],
    };
  }

  const result = await response.json();
  const rows = (Array.isArray(result?.data) ? result.data : []).map((row) => ({
    path: normalizeArrivalProbePath(row?.path),
    source: normalizeArrivalProbeSource(row?.source),
    arrivals: finiteNumber(row?.arrivals),
    sampleInterval: Math.max(1, finiteNumber(row?.sampleInterval) || 1),
    firstAt: row?.firstAt || null,
    lastAt: row?.lastAt || null,
  }));

  const total = rows.reduce((sum, row) => sum + row.arrivals, 0);
  const x = rows.filter((row) => row.source === "x").reduce((sum, row) => sum + row.arrivals, 0);
  const sampleInterval = rows.reduce((max, row) => Math.max(max, row.sampleInterval), 1);
  const firstAt = rows.map((row) => row.firstAt).filter(Boolean).sort()[0] || null;
  const lastAt = rows.map((row) => row.lastAt).filter(Boolean).sort().at(-1) || null;

  return {
    available: true,
    diagnosticOnly: true,
    dataset: ARRIVAL_PROBE_DATASET,
    version: ARRIVAL_PROBE_VERSION,
    total,
    x,
    sampleInterval,
    complete: rows.length < 200,
    firstAt,
    lastAt,
    rows,
  };
}

async function attachArrivalProbe(payload, env) {
  if (!payload || typeof payload !== "object" || payload.error) return payload;
  return {
    ...payload,
    arrivalProbe: await queryArrivalProbe(env, payload.windowStart, payload.windowEnd),
  };
}

function cloneJsonResponse(response, payload) {
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(JSON.stringify(payload), {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function profileResponseWithProbe(request, env, ctx) {
  const response = await profileWorker.fetch(request, env, ctx);
  if (!response.ok) return response;
  const path = new URL(request.url).pathname;
  if (path !== "/api/analytics" && path !== "/api/ai-export") return response;
  const payload = await attachArrivalProbe(await response.json(), env);
  return cloneJsonResponse(response, payload);
}

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}

function finiteNumber(value) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function token(value, max = 90) {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^A-Za-z0-9_./~-]/g, "")
    .slice(0, max);
}

function trendFieldToken(value, max = 40) {
  return token(
    String(value ?? "")
      .replace(/[–—]/g, "-")
      .replace(/\s*\/\s*/g, "-"),
    max,
  );
}

function channelVisits(period, name) {
  const row = (period?.channels || []).find((item) => item?.name === name);
  return finiteNumber(row?.visits);
}

function internalPageviews(period) {
  return (period?.internalFlows || [])
    .reduce((sum, row) => sum + finiteNumber(row?.pageviews), 0);
}

function channelCode(name) {
  return ({
    X: "X",
    YouTube: "YT",
    Instagram: "IG",
    Facebook: "FB",
    "Other SNS": "SNS",
    "Organic Search": "SEARCH",
    "Direct / Unknown": "DIRECT",
    "AI Assistant": "AI",
    "Other Referral": "OTHER",
    "Internal Navigation": "INTERNAL",
  })[name] || token(name, 24) || "UNKNOWN";
}

function pageRows(period) {
  return (period?.pages || [])
    .filter((row) => finiteNumber(row?.pageviews) > 0 || finiteNumber(row?.visits) > 0)
    .slice(0, 20)
    .map((row) => `${token(row?.path || row?.name, 70)}:${finiteNumber(row?.pageviews)}/${finiteNumber(row?.visits)}`)
    .join(",");
}

function entryRows(period) {
  return (period?.entryPages || period?.pages || [])
    .filter((row) => finiteNumber(row?.visits) > 0)
    .slice(0, 20)
    .map((row) => `${token(row?.path || row?.name, 70)}:${finiteNumber(row?.visits)}/${finiteNumber(row?.pageviews)}`)
    .join(",");
}

function groupedCompactFlows(rows, keyBuilder, metric) {
  const groups = new Map();
  for (const row of rows || []) {
    const key = keyBuilder(row);
    const current = groups.get(key) || { ...row, visits: 0, pageviews: 0 };
    current.visits += finiteNumber(row?.visits);
    current.pageviews += finiteNumber(row?.pageviews);
    groups.set(key, current);
  }
  return [...groups.values()].sort((a, b) =>
    finiteNumber(b?.[metric]) - finiteNumber(a?.[metric]) ||
    String(keyBuilder(a)).localeCompare(String(keyBuilder(b)))
  );
}

function externalGroups(period) {
  return groupedCompactFlows(
    period?.externalEntryFlows || [],
    (row) => [row?.channel || "", row?.sourceHost || "", row?.destinationPath || row?.destinationName || ""].join("\u0001"),
    "visits",
  );
}

function internalGroups(period) {
  return groupedCompactFlows(
    period?.internalFlows || [],
    (row) => [row?.sourceHost || "", row?.sourceCleanPath || row?.sourcePath || row?.sourceName || "", row?.destinationHost || "", row?.destinationPath || row?.destinationName || ""].join("\u0001"),
    "pageviews",
  );
}

function migrationGroups(period) {
  return groupedCompactFlows(
    period?.migrationFlows || [],
    (row) => [row?.sourceHost || "", row?.sourceCleanPath || row?.sourcePath || row?.sourceName || "", row?.destinationHost || "", row?.destinationPath || row?.destinationName || ""].join("\u0001"),
    "pageviews",
  );
}


function externalRows(period) {
  return externalGroups(period)
    .slice(0, 20)
    .map((row) => {
      const host = token(row?.sourceHost || "-", 55) || "-";
      const destination = token(row?.destinationPath || row?.destinationName, 60);
      return `${channelCode(row?.channel)}@${host}~${destination}:${finiteNumber(row?.visits)}`;
    })
    .join(",");
}

function internalRows(period) {
  return internalGroups(period)
    .slice(0, 20)
    .map((row) => {
      const host = token(row?.sourceHost || "-", 55) || "-";
      const source = token(row?.sourceCleanPath || row?.sourcePath || row?.sourceName, 55);
      const destination = token(row?.destinationPath || row?.destinationName, 55);
      return `${host}@${source}~${destination}:${finiteNumber(row?.pageviews)}/${finiteNumber(row?.visits)}`;
    })
    .join(",");
}

function migrationRows(period) {
  return migrationGroups(period)
    .slice(0, 20)
    .map((row) => {
      const sourceHost = token(row?.sourceHost || "-", 55) || "-";
      const destinationHost = token(row?.destinationHost || "-", 55) || "-";
      const source = token(row?.sourceCleanPath || row?.sourcePath || row?.sourceName, 55);
      const destination = token(row?.destinationPath || row?.destinationName, 55);
      return `${sourceHost}@${source}>${destinationHost}@${destination}:${finiteNumber(row?.pageviews)}/${finiteNumber(row?.visits)}`;
    })
    .join(",");
}

function snsRows(period) {
  return (period?.snsEntries?.pages || [])
    .filter((row) => finiteNumber(row?.total) > 0)
    .slice(0, 20)
    .map((row) => {
      const values = row?.values || {};
      return `${token(row?.path || row?.name, 60)}:${finiteNumber(values.X)}/${finiteNumber(values.Instagram)}/${finiteNumber(values.Facebook)}/${finiteNumber(values["Other SNS"])}/${finiteNumber(row?.total)}`;
    })
    .join(",");
}

function arrivalProbeRows(probe) {
  return (probe?.rows || [])
    .filter((row) => finiteNumber(row?.arrivals) > 0)
    .slice(0, 20)
    .map((row) => `${token(row?.path, 70)}@${token(row?.source, 20)}:${finiteNumber(row?.arrivals)}`)
    .join(",");
}

function integrityRows(period) {
  const integrity = period?.integrity || {};
  return [...(integrity.failures || []), ...(integrity.estimateDrift || [])]
    .slice(0, 12)
    .map((row) => {
      const delta = finiteNumber(row?.delta);
      return `${token(row?.name, 40)}:${delta >= 0 ? "+" : ""}${delta}/${token(row?.status, 12)}`;
    })
    .join(",");
}

function countryRows(period) {
  return (period?.countries || [])
    .slice(0, 12)
    .map((row) => `${token(row?.name, 35)}:${finiteNumber(row?.pageviews)}`)
    .join(",");
}

function deviceRows(period) {
  return (period?.devices || [])
    .slice(0, 8)
    .map((row) => `${token(row?.name, 24)}:${finiteNumber(row?.pageviews)}`)
    .join(",");
}

function trendRows(payload) {
  const rows = payload?.combined?.trend || payload?.trend || [];
  return rows
    .slice(-31)
    .map((row) => [
      trendFieldToken(row?.label || row?.bucket, 40),
      finiteNumber(row?.pageviews),
      finiteNumber(row?.visits),
      finiteNumber(row?.x),
      finiteNumber(row?.youtube),
      finiteNumber(row?.instagram),
      finiteNumber(row?.facebook),
      finiteNumber(row?.otherSns),
      finiteNumber(row?.search),
      finiteNumber(row?.direct),
      finiteNumber(row?.ai),
      finiteNumber(row?.other),
      finiteNumber(row?.internalPV),
      trendFieldToken(row?.status || "UNSAMPLED", 48),
      finiteNumber(row?.sampleInterval || 1),
    ].join("/"))
    .join(",");
}

export function buildAiFallbackFragment(payload) {
  if (!payload || typeof payload !== "object" || payload.error) return "";

  const combined = payload?.combined?.current || payload?.current || {};
  const previous = payload?.combined?.previous || payload?.previous || {};
  const current = payload?.current || {};
  const legacy = payload?.legacy?.current || {};
  const generated = token(String(payload?.generatedAt || "").replace(/[-:.]/g, ""), 32);
  const migration = token(payload?.hostMigration?.date || "", 16);
  const latestBucket = token(payload?.freshness?.latestNonZeroBucket || payload?.freshness?.latestEventBucket || "", 40);
  const sampling = combined?.sampling || {};
  const completeness = combined?.completeness || {};
  const samplingOrder = ["total", "pages", "referrers", "flows", "entries", "countries", "devices"];
  const completenessOrder = ["pages", "referrers", "flows", "entries", "countries", "devices"];
  const extGroups = externalGroups(combined);
  const extShown = extGroups.slice(0, 20);
  const extTotalVisits = extGroups.reduce((sum, row) => sum + finiteNumber(row?.visits), 0);
  const extShownVisits = extShown.reduce((sum, row) => sum + finiteNumber(row?.visits), 0);
  const compareMode = payload?.compareMode === "previous-period" ? "previous-period" : "none";
  const previousValue = compareMode === "previous-period"
    ? `${finiteNumber(previous?.visits)}/${finiteNumber(previous?.pageviews)}`
    : "NA";

  const fields = [
    "VA2",
    `window=${token(payload?.windowKey, 10)}`,
    `range=${token(payload?.rangeKey || payload?.windowKey, 10)}`,
    `bucket=${token(payload?.bucketKey || payload?.trendBucket || "auto", 10)}`,
    `quality=${token(combined?.quality || "UNSAMPLED", 24)}`,
    `sample=${finiteNumber(combined?.sampleInterval || 1)}`,
    `sampleParts=${samplingOrder.map((key) => finiteNumber(sampling?.[key] || combined?.sampleInterval || 1)).join("/")}`,
    `coverage=${completenessOrder.map((key) => completeness?.[key] === false ? 0 : 1).join("/")}`,
    `structSample=${finiteNumber(sampling?.channels || sampling?.referrers || combined?.sampleInterval || 1)}/${finiteNumber(sampling?.flowSummary || sampling?.flows || combined?.sampleInterval || 1)}`,
    `structCoverage=${(completeness?.channels ?? completeness?.referrers) === false ? 0 : 1}/${(completeness?.flowSummary ?? completeness?.flows) === false ? 0 : 1}`,
    `integrity=${token(combined?.integrity?.status || "UNKNOWN", 24)}`,
    `generated=${generated}`,
    `visits=${finiteNumber(combined?.visits)}`,
    `pageviews=${finiteNumber(combined?.pageviews)}`,
    `new=${finiteNumber(current?.visits)}/${finiteNumber(current?.pageviews)}`,
    `old=${finiteNumber(legacy?.visits)}/${finiteNumber(legacy?.pageviews)}`,
    `compare=${compareMode}`,
    `previous=${previousValue}`,
    `x=${channelVisits(combined, "X")}`,
    `youtube=${channelVisits(combined, "YouTube")}`,
    `instagram=${channelVisits(combined, "Instagram")}`,
    `facebook=${channelVisits(combined, "Facebook")}`,
    `othersns=${channelVisits(combined, "Other SNS")}`,
    `search=${channelVisits(combined, "Organic Search")}`,
    `direct=${channelVisits(combined, "Direct / Unknown")}`,
    `ai=${channelVisits(combined, "AI Assistant")}`,
    `other=${channelVisits(combined, "Other Referral")}`,
    `internalVisits=${channelVisits(combined, "Internal Navigation")}`,
    `internalPV=${internalPageviews(combined)}`,
    `xprofile=${finiteNumber(combined?.xProfileEntries)}`,
    `externalCoverage=${extShown.length}/${extGroups.length}/${extShownVisits}/${extTotalVisits}/${combined?.flowRowsComplete === false ? 0 : 1}`,
    `probe=${payload?.arrivalProbe?.available ? 1 : 0}/${finiteNumber(payload?.arrivalProbe?.total)}/${finiteNumber(payload?.arrivalProbe?.x)}/${finiteNumber(payload?.arrivalProbe?.sampleInterval || 1)}/${payload?.arrivalProbe?.complete === false ? 0 : 1}`,
  ];

  if (migration) fields.push(`migration=${migration}`);
  if (latestBucket) fields.push(`latestBucket=${latestBucket}`);
  const gapLowerBound = payload?.freshness?.eventGapLowerBoundSeconds ?? payload?.freshness?.eventGapSeconds;
  if (gapLowerBound !== undefined && gapLowerBound !== null) fields.push(`gapLower=${finiteNumber(gapLowerBound)}`);

  const pages = pageRows(combined);
  const entries = entryRows(combined);
  const external = externalRows(combined);
  const internal = internalRows(combined);
  const migrationFlow = migrationRows(combined);
  const sns = snsRows(combined);
  const countries = countryRows(combined);
  const devices = deviceRows(combined);
  const probeRows = arrivalProbeRows(payload?.arrivalProbe);
  const integrityIssues = integrityRows(combined);
  const trend = trendRows(payload);

  if (pages) fields.push(`pages=${pages}`);
  if (entries) fields.push(`entries=${entries}`);
  if (external) fields.push(`external=${external}`);
  if (internal) fields.push(`flow=${internal}`);
  if (migrationFlow) fields.push(`handoff=${migrationFlow}`);
  if (sns) fields.push(`sns=${sns}`);
  if (countries) fields.push(`countries=${countries}`);
  if (devices) fields.push(`devices=${devices}`);
  if (probeRows) fields.push(`probeRows=${probeRows}`);
  if (integrityIssues) fields.push(`integrityIssues=${integrityIssues}`);
  if (trend) fields.push(`trend=${trend}`);

  return fields.join(";");
}

export function buildShortRelayUrl(signedUrl) {
  const source = new URL(signedUrl);
  const rangeKey = source.searchParams.get("range") || source.searchParams.get("window") || "";
  const bucketKey = source.searchParams.get("bucket") || "auto";
  const start = source.searchParams.get("start") || "-";
  const end = source.searchParams.get("end") || "-";
  const expires = source.searchParams.get("expires") || "";
  const sig = source.searchParams.get("sig") || "";

  if (!/^(1h|3h|24h|7d|30d|all|custom)$/.test(rangeKey)) throw new Error("Signed export range is invalid.");
  if (!/^(auto|30m|1h|1d|7d|1mo)$/.test(bucketKey)) throw new Error("Signed export bucket is invalid.");
  if (rangeKey === "custom" && (!/^\d{4}-\d{2}-\d{2}$/.test(start) || !/^\d{4}-\d{2}-\d{2}$/.test(end))) {
    throw new Error("Signed export custom dates are invalid.");
  }
  if (!/^\d{10,}$/.test(expires)) throw new Error("Signed export expiry is invalid.");
  if (!/^[0-9a-f]{64}$/i.test(sig)) throw new Error("Signed export signature is invalid.");

  return new URL(
    `/s/v2/${rangeKey}/${bucketKey}/${encodeURIComponent(start)}/${encodeURIComponent(end)}/${expires}/${sig}`,
    AI_READABLE_RELAY,
  );
}

async function fallbackFragmentFromSignedExport(signedUrl, env, ctx) {
  try {
    const response = await profileResponseWithProbe(
      new Request(signedUrl, { method: "GET", headers: { Accept: "application/json" } }),
      env,
      ctx,
    );
    if (!response.ok) return "";
    return buildAiFallbackFragment(await response.json());
  } catch {
    // The relay URL can still be issued if snapshot generation fails, but the
    // normal path embeds VA2 so AI clients do not depend on live URL fetching.
    return "";
  }
}

async function issueAiReadableLink(request, url, env, ctx) {
  if (request.method !== "GET") return jsonResponse({ error: "GET only." }, 405);

  const shareUrl = new URL("/api/ai-share-link", url.origin);
  const range = url.searchParams.get("range") || url.searchParams.get("window") || "7d";
  shareUrl.searchParams.set("window", range);
  shareUrl.searchParams.set("range", range);
  const bucket = url.searchParams.get("bucket");
  if (bucket) shareUrl.searchParams.set("bucket", bucket);
  if (range === "custom") {
    shareUrl.searchParams.set("start", url.searchParams.get("start") || "");
    shareUrl.searchParams.set("end", url.searchParams.get("end") || "");
  }
  shareUrl.searchParams.set("ttl", String(AI_READABLE_TTL_SECONDS));

  const headers = new Headers();
  const authorization = request.headers.get("Authorization");
  if (authorization) headers.set("Authorization", authorization);

  const signedResponse = await baseWorker.fetch(
    new Request(shareUrl.toString(), { method: "GET", headers }),
    env,
    ctx,
  );
  if (!signedResponse.ok) return signedResponse;

  const signed = await signedResponse.json();
  if (!signed?.url) return jsonResponse({ error: "Signed export URL was not returned." }, 502);

  const relayUrl = buildShortRelayUrl(signed.url);
  const fallbackFragment = await fallbackFragmentFromSignedExport(signed.url, env, ctx);
  const portableUrl = relayUrl.toString() + (fallbackFragment ? `#${fallbackFragment}` : "");

  return jsonResponse({
    url: portableUrl,
    relayUrl: relayUrl.toString(),
    expiresAt: signed.expiresAt,
    ttlSeconds: AI_READABLE_TTL_SECONDS,
    format: "text/markdown",
    deliveryVerified: false,
    deliveryVerification: "self-contained-va2-fragment-with-relay-best-effort",
    fallbackIncluded: Boolean(fallbackFragment),
    fallbackSchema: fallbackFragment ? "VA2" : null,
    transport: "signed self-hosted relay + inline aggregate snapshot",
    scope: "aggregate analytics read-only",
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === ARRIVAL_PROBE_PATH) {
      return arrivalProbeResponse(request, env);
    }
    if (url.pathname === "/api/ai-readable-link") {
      return issueAiReadableLink(request, url, env, ctx);
    }
    return profileResponseWithProbe(request, env, ctx);
  },
};
