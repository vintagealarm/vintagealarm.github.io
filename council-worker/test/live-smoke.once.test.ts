import test from "node:test";
import assert from "node:assert/strict";

const base = "https://council-api.orima1995.workers.dev";

async function j(path, init) {
  const res = await fetch(base + path, init);
  const text = await res.text();
  assert.equal(res.ok, true, path + " HTTP " + res.status + " " + text.slice(0,200));
  return JSON.parse(text);
}

test("live Council V3 health and explicit Jester smoke", async () => {
  const health = await j("/health");
  assert.equal(health.version, "council-v3");
  assert.equal(health.openai, true);
  assert.equal(health.jester, true);
  assert.equal(health.jesterHook, true);

  const menu = await j("/api/menu");
  assert.equal(menu.version, "council-v3");
  assert.equal(menu.menu.length, 7);

  const smoke = await j("/api/council", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      title: "Council V3 live verification",
      body: "Verification only. Briefly challenge the assumption that a successful deployment alone proves the application is usable.",
      format: "jester",
      domain: "general",
      evidence: "none",
      budget: "quick"
    })
  });
  assert.equal(smoke.version, "council-v3");
  assert.equal(smoke.format, "jester");
  assert.equal(typeof smoke?.jester?.text, "string");
  assert.ok(smoke.jester.text.length > 10);
  console.log("LIVE_SMOKE", JSON.stringify({
    health: {openai: health.openai, vectorStore: health.vectorStore},
    menuCount: menu.menu.length,
    jesterChars: smoke.jester.text.length
  }));
});
