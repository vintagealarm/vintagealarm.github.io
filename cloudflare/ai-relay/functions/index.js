const ALLOWED_SOURCE_HOST = "vintage-alarm-analytics.orima1995.workers.dev";
const ALLOWED_SOURCE_PATH = "/api/ai-export";
const ALLOWED_SOURCE_PARAMS = new Set(["window", "range", "bucket", "start", "end", "expires", "sig"]);
const ALLOWED_RANGES = new Set(["1h", "3h", "24h", "7d", "30d", "all", "custom"]);
const ALLOWED_BUCKETS = new Set(["auto", "30m", "1h", "1d", "7d", "1mo"]);
const MAX_PUBLIC_CACHE_SECONDS = 15 * 60;

function text(value) {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ").trim();
}

function number(value) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function validateSource(raw) {
  if (!raw) throw new Error("Missing source URL.");
  const source = new URL(raw);
  if (source.username || source.password || source.port || source.hash) throw new Error("Unexpected source URL component.");
  if (source.protocol !== "https:") throw new Error("HTTPS source required.");
  if (source.hostname !== ALLOWED_SOURCE_HOST) throw new Error("Source host is not allowed.");
  if (source.pathname !== ALLOWED_SOURCE_PATH) throw new Error("Source path is not allowed.");
  for (const key of source.searchParams.keys()) {
    if (source.searchParams.getAll(key).length !== 1) throw new Error("Duplicate source parameter.");
    if (!ALLOWED_SOURCE_PARAMS.has(key)) throw new Error("Unexpected source parameter.");
  }
  if (!source.searchParams.get("window") || !source.searchParams.get("expires") || !source.searchParams.get("sig")) {
    throw new Error("Signed analytics source is incomplete.");
  }
  const range = source.searchParams.get("range") || source.searchParams.get("window");
  const bucket = source.searchParams.get("bucket") || "auto";
  if (!ALLOWED_RANGES.has(range)) throw new Error("Signed analytics range is invalid.");
  if (!ALLOWED_BUCKETS.has(bucket)) throw new Error("Signed analytics bucket is invalid.");
  if (range === "custom") {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(source.searchParams.get("start") || "") || !/^\d{4}-\d{2}-\d{2}$/.test(source.searchParams.get("end") || "")) {
      throw new Error("Signed analytics custom dates are invalid.");
    }
  }
  if (!/^[0-9a-f]{64}$/i.test(source.searchParams.get("sig"))) throw new Error("Signed analytics signature is invalid.");
  const expires = Number(source.searchParams.get("expires"));
  if (!Number.isInteger(expires) || expires <= Math.floor(Date.now() / 1000)) {
    throw new Error("Signed analytics source has expired.");
  }
  return source;
}

export function sourceFromRelayUrl(requestUrl) {
  const shortV2 = requestUrl.pathname.match(/^\/s\/v2\/(1h|3h|24h|7d|30d|all|custom)\/(auto|30m|1h|1d|7d|1mo)\/([^/]+)\/([^/]+)\/(\d{10,})\/([0-9a-f]{64})\/?$/i);
  if (shortV2) {
    const range = shortV2[1].toLowerCase();
    const bucket = shortV2[2].toLowerCase();
    const start = decodeURIComponent(shortV2[3]);
    const end = decodeURIComponent(shortV2[4]);
    const source = new URL(`https://${ALLOWED_SOURCE_HOST}${ALLOWED_SOURCE_PATH}`);
    source.searchParams.set("window", range);
    source.searchParams.set("range", range);
    if (bucket !== "auto") source.searchParams.set("bucket", bucket);
    if (range === "custom") {
      source.searchParams.set("start", start);
      source.searchParams.set("end", end);
    }
    source.searchParams.set("expires", shortV2[5]);
    source.searchParams.set("sig", shortV2[6].toLowerCase());
    return validateSource(source.toString());
  }

  const shortV1 = requestUrl.pathname.match(/^\/s\/v1\/(1h|3h|24h|7d|30d)\/(\d{10,})\/([0-9a-f]{64})\/?$/i);
  if (shortV1) {
    const source = new URL(`https://${ALLOWED_SOURCE_HOST}${ALLOWED_SOURCE_PATH}`);
    source.searchParams.set("window", shortV1[1]);
    source.searchParams.set("expires", shortV1[2]);
    source.searchParams.set("sig", shortV1[3].toLowerCase());
    return validateSource(source.toString());
  }
  return validateSource(requestUrl.searchParams.get("source"));
}

function sourceCacheSeconds(source) {
  const expires = Number(source.searchParams.get("expires"));
  const remaining = expires - Math.floor(Date.now() / 1000);
  return Math.max(0, Math.min(MAX_PUBLIC_CACHE_SECONDS, remaining));
}

function table(headers, rows) {
  if (!rows.length) return "_No rows._";
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(text).join(" | ")} |`),
  ].join("\n");
}

function renderPages(period) {
  const rows = (period?.entryPages || period?.pages || []).slice(0, 30).map((row) => [
    row.name || row.path,
    row.path,
    number(row.visits),
    number(row.pageviews),
  ]);
  return table(["Page", "Path", "Entry visits", "PV"], rows);
}

function renderChannels(period) {
  const rows = (period?.channels || []).map((row) => [row.name, number(row.visits), number(row.pageviews)]);
  return table(["Channel", "Visits", "PV"], rows);
}

function renderExternalFlows(period) {
  const rows = (period?.externalEntryFlows || []).slice(0, 40).map((row) => [
    row.channel,
    row.sourceName || row.sourceHost || "Direct",
    row.destinationName || row.destinationPath,
    number(row.visits),
    number(row.pageviews),
    row.country || "",
    row.device || "",
  ]);
  return table(["Channel", "Source", "Destination", "Visits", "PV", "Country", "Device"], rows);
}

function renderInternalFlows(period) {
  const rows = (period?.internalFlows || []).slice(0, 40).map((row) => [
    row.sourceName || row.sourceCleanPath,
    row.destinationName || row.destinationPath,
    number(row.pageviews),
  ]);
  return table(["From", "To", "PV"], rows);
}

function renderMigrationFlows(period) {
  const rows = (period?.migrationFlows || []).slice(0, 40).map((row) => [
    row.sourceHost || "",
    row.sourceCleanPath || row.sourcePath || "",
    row.destinationHost || "",
    row.destinationName || row.destinationPath,
    number(row.visits),
    number(row.pageviews),
  ]);
  return table(["Source host", "From", "Destination host", "To", "Visits", "PV"], rows);
}

function renderCountries(period) {
  const rows = (period?.countries || []).slice(0, 30).map((row) => [row.name, number(row.pageviews)]);
  return table(["Country", "PV"], rows);
}

function renderDevices(period) {
  const rows = (period?.devices || []).map((row) => [row.name, number(row.pageviews)]);
  return table(["Device", "PV"], rows);
}

function renderTrend(payload) {
  const rows = (payload?.trend || []).slice(0, 60).map((row) => [
    row.label || row.bucket,
    row.status || (number(row.sampleInterval) > 1 ? "SAMPLED / ESTIMATE" : "UNSAMPLED"),
    number(row.sampleInterval || 1),
    number(row.pageviews),
    number(row.visits),
    number(row.x),
    number(row.youtube),
    number(row.instagram),
    number(row.facebook),
    number(row.search),
    number(row.direct),
    number(row.internalPV),
    number(row.ai),
    number(row.other),
  ]);
  return table(["Bucket", "Quality", "Sample", "PV", "Visits", "X", "YouTube", "Instagram", "Facebook", "Search", "Direct", "Internal PV", "AI", "Other"], rows);
}

function renderPeriod(title, period) {
  if (!period) return `## ${title}\n_No data._`;
  return [
    `## ${title}`,
    `- Visits: ${number(period.visits)}`,
    `- Page views: ${number(period.pageviews)}`,
    `- Quality: ${text(period.quality || (number(period.sampleInterval) > 1 ? "SAMPLED / ESTIMATE" : "UNSAMPLED"))}`,
    `- Sample interval: ${number(period.sampleInterval || 1)}`,
    `- X profile entries (/x/): ${number(period.xProfileEntries)}`,
    "",
    "### Channels",
    renderChannels(period),
    "",
    "### Entry pages",
    renderPages(period),
    "",
    "### External entry flows",
    renderExternalFlows(period),
    "",
    "### Internal flows",
    renderInternalFlows(period),
    "",
    "### Host migration flows",
    renderMigrationFlows(period),
    "",
    "### Country",
    renderCountries(period),
    "",
    "### Device",
    renderDevices(period),
  ].join("\n");
}

export function renderAnalyticsMarkdown(payload) {
  const combined = payload?.combined?.current || payload?.current || {};
  const lines = [
    "# VINTAGE ALARM ANALYTICS — AI READ-ONLY",
    "",
    "> Aggregate measurement data only. Do not infer causality or unique people across hosts from this document.",
    "",
    `- Generated: ${text(payload?.generatedAt)}`,
    `- Window: ${text(payload?.windowLabel || payload?.windowKey)}`,
    `- Range key: ${text(payload?.rangeKey || payload?.windowKey)}`,
    `- Group by: ${text(payload?.bucketLabel || payload?.bucketKey || payload?.trendBucket)}`,
    `- Window start: ${text(payload?.windowStart)}`,
    `- Window end: ${text(payload?.windowEnd)}`,
    `- Current host: ${text(payload?.host)}`,
    `- Primary combined visits: ${number(combined.visits)}`,
    `- Primary combined page views: ${number(combined.pageviews)}`,
    `- X profile entries (/x/): ${number(combined.xProfileEntries)}`,
  ];

  if (payload?.hostMigration) {
    lines.push("", "## Host migration", `- Date: ${text(payload.hostMigration.date)}`, `- Old host: ${text(payload.hostMigration.oldHost)}`, `- New host: ${text(payload.hostMigration.newHost)}`, `- Note: ${text(payload.hostMigration.note)}`);
  }

  lines.push(
    "",
    renderPeriod("Combined current period", payload?.combined?.current || payload?.current),
    "",
    renderPeriod(`NEW host — ${payload?.host || "current"}`, payload?.current),
    "",
    renderPeriod(`OLD host — ${payload?.legacy?.host || "legacy"}`, payload?.legacy?.current),
    "",
    "## Trend",
    renderTrend(payload?.combined || payload),
  );

  const limitations = payload?.limitations || {};
  lines.push("", "## Measurement limitations");
  for (const [key, value] of Object.entries(limitations)) {
    lines.push(`- ${text(key)}: ${text(value)}`);
  }
  if (payload?.combined?.note) lines.push(`- combined: ${text(payload.combined.note)}`);
  if (payload?.profileTracking) {
    lines.push(`- profileTracking: dedicated path ${text(payload.profileTracking.path)} identifies X-profile entry independently of referrer channel.`);
  }
  lines.push("", "_This relay only reformats the signed aggregate analytics export. It does not add conclusions or platform-local campaign metrics._");
  return lines.join("\n");
}

function responseHeaders(html = false, cacheSeconds = 0) {
  const cacheControl = cacheSeconds > 0
    ? `public, max-age=${cacheSeconds}, s-maxage=${cacheSeconds}`
    : "no-store, max-age=0";
  const headers = {
    "Content-Type": html ? "text/html; charset=utf-8" : "text/markdown; charset=utf-8",
    "Vary": "Accept",
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'",
    "Cache-Control": cacheControl,
    "X-Robots-Tag": "noindex, nofollow, noarchive",
    "Referrer-Policy": "no-referrer",
    "Access-Control-Allow-Origin": "*",
  };
  if (cacheSeconds > 0) headers["CDN-Cache-Control"] = `public, max-age=${cacheSeconds}`;
  return headers;
}

function documentResponse(markdown, status, request, verified = false, cacheSeconds = 0, forceMarkdown = false) {
  const html = !forceMarkdown && !(request.headers.get("Accept") || "").includes("text/markdown");
  const escaped = markdown.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const body = html ? `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>VINTAGE ALARM — read-only analytics</title><style>body{margin:24px;font:16px/1.6 system-ui}pre{white-space:pre-wrap;overflow-wrap:anywhere;font:inherit}</style></head><body><main><pre>${escaped}</pre></main></body></html>` : markdown;
  const headers = responseHeaders(html, cacheSeconds);
  if (verified) headers["X-Analytics-Export"] = "vintage-alarm-ai-export-v1";
  return new Response(body, { status, headers });
}

export async function onRequestGet(context) {
  const request = context.request;
  try {
    const requestUrl = new URL(request.url);
    const isLanding = requestUrl.pathname === "/" && !requestUrl.search;
    if (isLanding) {
      return documentResponse("# VINTAGE ALARM AI relay\n\nThis service displays a signed, read-only analytics export. Generate an AI URL in the authenticated Analytics dashboard. Links expire after 15 minutes. No analytics data is available on this page.", 200, request);
    }

    const source = sourceFromRelayUrl(requestUrl);
    const isShortLink = requestUrl.pathname.startsWith("/s/v1/");
    const upstream = await fetch(source.toString(), {
      headers: { Accept: "application/json" },
      redirect: "error",
      signal: AbortSignal.timeout(15000),
    });
    if (!upstream.ok) {
      return documentResponse(`AI analytics source failed (HTTP ${upstream.status}). Generate a new AI URL in the Analytics dashboard.`, upstream.status, request);
    }
    const payload = await upstream.json();
    if (payload?.schemaVersion !== "vintage-alarm-ai-export-v1" || !payload?.current || !payload?.generatedAt || payload?.error) {
      return documentResponse("Analytics source returned an unexpected data format.", 502, request);
    }

    const cacheSeconds = isShortLink ? sourceCacheSeconds(source) : 0;
    return documentResponse(renderAnalyticsMarkdown(payload), 200, request, true, cacheSeconds, isShortLink);
  } catch (error) {
    return documentResponse(`VINTAGE ALARM AI relay\n\n${error instanceof Error ? error.message : String(error)}`, 400, request);
  }
}
