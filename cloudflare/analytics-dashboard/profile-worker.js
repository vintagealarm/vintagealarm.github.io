import baseWorker from "./worker.js";

const AI_READABLE_RELAY = "https://vintage-alarm-ai-relay.pages.dev/";
const AI_READABLE_TTL_SECONDS = 15 * 60;

export const X_PROFILE_TRACKING = Object.freeze({
  path: "/x/",
  name: "X Profile",
  url: "https://vintagealarm.github.io/x/",
  eventLabel: "Xプロフィール専用URL発行",
  eventAt: "2026-09-11T14:18:50.000Z",
});

function patchPage(row) {
  if (!row || row.path !== X_PROFILE_TRACKING.path) return row;
  return { ...row, name: X_PROFILE_TRACKING.name, mapped: true };
}

function patchFlow(flow) {
  if (!flow) return flow;
  const out = { ...flow };
  if (out.destinationPath === X_PROFILE_TRACKING.path) {
    out.destinationName = X_PROFILE_TRACKING.name;
    out.destinationMapped = true;
  }
  if (
    out.sourceCleanPath === X_PROFILE_TRACKING.path ||
    out.sourcePath === X_PROFILE_TRACKING.path
  ) {
    out.sourceName = X_PROFILE_TRACKING.name;
  }
  return out;
}

function countProfileEntries(period) {
  return (period?.pages || [])
    .filter((row) => row?.path === X_PROFILE_TRACKING.path)
    .reduce((sum, row) => sum + Number(row?.visits || 0), 0);
}

export function patchPeriod(period) {
  if (!period || typeof period !== "object") return period;
  const patched = { ...period };
  if (Array.isArray(patched.pages)) patched.pages = patched.pages.map(patchPage);
  if (Array.isArray(patched.entryPages)) patched.entryPages = patched.entryPages.map(patchPage);
  if (Array.isArray(patched.flows)) patched.flows = patched.flows.map(patchFlow);
  if (Array.isArray(patched.externalEntryFlows)) patched.externalEntryFlows = patched.externalEntryFlows.map(patchFlow);
  if (Array.isArray(patched.internalFlows)) patched.internalFlows = patched.internalFlows.map(patchFlow);
  patched.xProfileEntries = countProfileEntries(patched);
  return patched;
}

export function patchAnalyticsPayload(payload) {
  if (!payload || typeof payload !== "object" || payload.error) return payload;

  const patched = { ...payload, profileTracking: X_PROFILE_TRACKING };
  patched.current = patchPeriod(payload.current);
  patched.previous = patchPeriod(payload.previous);

  if (payload.legacy) {
    patched.legacy = {
      ...payload.legacy,
      current: patchPeriod(payload.legacy.current),
      previous: patchPeriod(payload.legacy.previous),
    };
  }

  if (payload.combined) {
    patched.combined = {
      ...payload.combined,
      current: patchPeriod(payload.combined.current),
      previous: patchPeriod(payload.combined.previous),
    };
  }

  return patched;
}

export function patchDashboardHtml(html) {
  const systemEvent = JSON.stringify({
    platform: "X Profile",
    label: X_PROFILE_TRACKING.eventLabel,
    postUrl: X_PROFILE_TRACKING.url,
    postedAt: X_PROFILE_TRACKING.eventAt,
    linkAddedAt: X_PROFILE_TRACKING.eventAt,
    targetPath: X_PROFILE_TRACKING.path,
    system: true,
  });

  const aiReadableHandler = `
document.getElementById("aiReadable")?.addEventListener("click",async()=>{
  const button=document.getElementById("aiReadable");
  const original=button.textContent;
  button.disabled=true;
  button.textContent="ISSUING…";
  try{
    const response=await fetch('/api/ai-readable-link?window='+encodeURIComponent(windowKey),{cache:"no-store"});
    const data=await response.json();
    if(!response.ok||data.error)throw new Error(data.error||("HTTP "+response.status));
    try{
      await navigator.clipboard.writeText(data.url);
      button.textContent="COPIED";
    }catch{
      window.prompt("Copy AI readable URL",data.url);
      button.textContent="READY";
    }
  }catch(error){
    button.textContent="ERROR";
    alert("AI URL: "+error.message);
  }finally{
    setTimeout(()=>{button.textContent=original;button.disabled=false;},1800);
  }
});
`;

  return String(html)
    .replace(
      '<button class="refresh" id="aiShare">AI COPY</button>',
      '<button class="refresh" id="aiShare">AI COPY</button>\n<button class="refresh" id="aiReadable">AI URL</button>',
    )
    .replace(
      "const campaigns=getCampaigns();",
      `const campaigns=[...getCampaigns(),${systemEvent}];`,
    )
    .replace(
      'const platform=item.migration?"MIGRATION":item.platform==="YouTube"?"YOUTUBE":"X";',
      'const platform=item.migration?"MIGRATION":item.platform==="X Profile"?"X PROFILE":item.platform==="YouTube"?"YOUTUBE":"X";',
    )
    .replace(
      'const platform=item.platform==="YouTube"?"YouTube":"X";',
      'const platform=item.platform==="X Profile"?"X Profile":item.platform==="YouTube"?"YouTube":"X";',
    )
    .replace(
      'const color=item.migration?"#706d67":platform==="YouTube"?COLORS.YouTube:COLORS.X;',
      'const color=item.migration?"#706d67":platform==="X Profile"?"#13766e":platform==="YouTube"?COLORS.YouTube:COLORS.X;',
    )
    .replace(
      "eventIndex(campaigns)+",
      'eventIndex(campaigns)+\'<section class="card kpi"><div class="label">X PROFILE ENTRY</div><div class="value">\'+n(c.xProfileEntries||0)+\'</div><div class="delta">専用URL /x/ の入口</div></section>\'+',
    )
    .replace(
      'document.getElementById("refresh").addEventListener("click",()=>{load();renderDiscoveryInbox();});',
      aiReadableHandler+'document.getElementById("refresh").addEventListener("click",()=>{load();renderDiscoveryInbox();});',
    );
}

function cloneResponse(response, body) {
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
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

async function aiReadableLinkResponse(request, url, env, ctx) {
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

  const relayUrl = new URL(AI_READABLE_RELAY);
  relayUrl.searchParams.set("source", signed.url);

  // Validate the actual signed export before giving the user a link.
  // This proves server-side delivery, not acceptance by every AI reader.
  try {
    const probe = await fetch(relayUrl.toString(), {
      headers: { Accept: "text/markdown" },
      redirect: "error",
      signal: AbortSignal.timeout(20000),
    });
    const body = await probe.text();
    if (!probe.ok || probe.headers.get("X-Analytics-Export") !== "vintage-alarm-ai-export-v1" || !body.startsWith("# VINTAGE ALARM ANALYTICS")) {
      return jsonResponse({ error: `共有先のデータ取得を確認できませんでした（HTTP ${probe.status}）。時間をおいて再度お試しください。` }, 502);
    }
  } catch {
    return jsonResponse({ error: "共有先に接続できませんでした。時間をおいて再度お試しください。" }, 502);
  }

  return jsonResponse({
    url: relayUrl.toString(),
    expiresAt: signed.expiresAt,
    ttlSeconds: AI_READABLE_TTL_SECONDS,
    format: "text/html",
    deliveryVerified: true,
    scope: "aggregate analytics read-only",
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/ai-readable-link") {
      return aiReadableLinkResponse(request, url, env, ctx);
    }

    const response = await baseWorker.fetch(request, env, ctx);
    if (!response.ok) return response;

    if (url.pathname === "/" || url.pathname === "/index.html") {
      return cloneResponse(response, patchDashboardHtml(await response.text()));
    }

    if (url.pathname === "/api/analytics" || url.pathname === "/api/ai-export") {
      const payload = patchAnalyticsPayload(await response.json());
      return cloneResponse(response, JSON.stringify(payload));
    }

    return response;
  },
};
