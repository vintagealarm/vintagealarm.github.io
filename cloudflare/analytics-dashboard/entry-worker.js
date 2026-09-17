import profileWorker from "./profile-worker.js";
import baseWorker from "./worker.js";

const AI_READABLE_RELAY = "https://vintage-alarm-ai-relay.pages.dev/";
const AI_READABLE_TTL_SECONDS = 15 * 60;

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

function channelVisits(period, name) {
  const row = (period?.channels || []).find((item) => item?.name === name);
  return finiteNumber(row?.visits);
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
  return (period?.entryPages || period?.pages || [])
    .filter((row) => finiteNumber(row?.visits) > 0 || finiteNumber(row?.pageviews) > 0)
    .slice(0, 20)
    .map((row) => `${token(row?.path || row?.name, 70)}:${finiteNumber(row?.visits)}/${finiteNumber(row?.pageviews)}`)
    .join(",");
}

function externalRows(period) {
  return (period?.externalEntryFlows || [])
    .filter((row) => finiteNumber(row?.visits) > 0)
    .slice(0, 20)
    .map((row) => {
      const host = token(row?.sourceHost || "-", 55) || "-";
      const destination = token(row?.destinationPath || row?.destinationName, 60);
      return `${channelCode(row?.channel)}@${host}~${destination}:${finiteNumber(row?.visits)}`;
    })
    .join(",");
}

function internalRows(period) {
  return (period?.internalFlows || [])
    .filter((row) => finiteNumber(row?.pageviews) > 0)
    .slice(0, 20)
    .map((row) => {
      const host = token(row?.sourceHost || "-", 55) || "-";
      const source = token(row?.sourceCleanPath || row?.sourcePath || row?.sourceName, 55);
      const destination = token(row?.destinationPath || row?.destinationName, 55);
      return `${host}@${source}~${destination}:${finiteNumber(row?.pageviews)}/${finiteNumber(row?.visits)}`;
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
      token(row?.bucket, 16),
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
  const latestEvent = token(payload?.freshness?.latestEventBucket || "", 16);

  const fields = [
    "VA2",
    `window=${token(payload?.windowKey, 10)}`,
    `generated=${generated}`,
    `visits=${finiteNumber(combined?.visits)}`,
    `pageviews=${finiteNumber(combined?.pageviews)}`,
    `new=${finiteNumber(current?.visits)}/${finiteNumber(current?.pageviews)}`,
    `old=${finiteNumber(legacy?.visits)}/${finiteNumber(legacy?.pageviews)}`,
    `previous=${finiteNumber(previous?.visits)}/${finiteNumber(previous?.pageviews)}`,
    `x=${channelVisits(combined, "X")}`,
    `youtube=${channelVisits(combined, "YouTube")}`,
    `instagram=${channelVisits(combined, "Instagram")}`,
    `facebook=${channelVisits(combined, "Facebook")}`,
    `othersns=${channelVisits(combined, "Other SNS")}`,
    `search=${channelVisits(combined, "Organic Search")}`,
    `direct=${channelVisits(combined, "Direct / Unknown")}`,
    `ai=${channelVisits(combined, "AI Assistant")}`,
    `other=${channelVisits(combined, "Other Referral")}`,
    `internal=${channelVisits(combined, "Internal Navigation")}`,
    `xprofile=${finiteNumber(combined?.xProfileEntries)}`,
  ];

  if (migration) fields.push(`migration=${migration}`);
  if (latestEvent) fields.push(`latest=${latestEvent}`);
  if (payload?.freshness?.eventGapSeconds !== undefined) fields.push(`gap=${finiteNumber(payload.freshness.eventGapSeconds)}`);

  const pages = pageRows(combined);
  const external = externalRows(combined);
  const internal = internalRows(combined);
  const sns = snsRows(combined);
  const countries = countryRows(combined);
  const devices = deviceRows(combined);
  const trend = trendRows(payload);

  if (pages) fields.push(`pages=${pages}`);
  if (external) fields.push(`external=${external}`);
  if (internal) fields.push(`flow=${internal}`);
  if (sns) fields.push(`sns=${sns}`);
  if (countries) fields.push(`countries=${countries}`);
  if (devices) fields.push(`devices=${devices}`);
  if (trend) fields.push(`trend=${trend}`);

  return fields.join(";");
}

export function buildShortRelayUrl(signedUrl) {
  const source = new URL(signedUrl);
  const windowKey = source.searchParams.get("window") || "";
  const expires = source.searchParams.get("expires") || "";
  const sig = source.searchParams.get("sig") || "";

  if (!/^(1h|3h|24h|7d|30d)$/.test(windowKey)) throw new Error("Signed export window is invalid.");
  if (!/^\d{10,}$/.test(expires)) throw new Error("Signed export expiry is invalid.");
  if (!/^[0-9a-f]{64}$/i.test(sig)) throw new Error("Signed export signature is invalid.");

  return new URL(`/s/v1/${windowKey}/${expires}/${sig}`, AI_READABLE_RELAY);
}

async function fallbackFragmentFromSignedExport(signedUrl, env, ctx) {
  try {
    const response = await profileWorker.fetch(
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
  shareUrl.searchParams.set("window", url.searchParams.get("window") || "7d");
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
    if (url.pathname === "/api/ai-readable-link") {
      return issueAiReadableLink(request, url, env, ctx);
    }
    return profileWorker.fetch(request, env, ctx);
  },
};
