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

  const relayUrl = new URL(AI_READABLE_RELAY);
  relayUrl.searchParams.set("source", signed.url);

  // Do not probe the relay from the Analytics Worker before issuing the URL.
  // That Worker-to-Worker preflight was the failure point and is not required
  // for security: the relay validates the signed source when the URL is opened.
  return jsonResponse({
    url: relayUrl.toString(),
    expiresAt: signed.expiresAt,
    ttlSeconds: AI_READABLE_TTL_SECONDS,
    format: "text/html",
    deliveryVerified: false,
    deliveryVerification: "deferred-to-relay-request",
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
