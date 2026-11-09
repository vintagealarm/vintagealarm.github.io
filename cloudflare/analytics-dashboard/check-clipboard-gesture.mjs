import vm from "node:vm";
import { strict as assert } from "node:assert";
import profileWorker from "./profile-worker.js";

const auth = "Basic " + Buffer.from("admin:test-password").toString("base64");
const htmlResponse = await profileWorker.fetch(
  new Request("https://dashboard.test/", { headers: { Authorization: auth } }),
  { DASHBOARD_PASSWORD: "test-password" }, {},
);
assert.equal(htmlResponse.status, 200);
const html = await htmlResponse.text();
const script = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
  .map((match) => match[1]).find((text) => text.includes('function writeGeneratedClipboard('));
assert(script, "generated production dashboard must include the shared gesture-safe helper");
const begin = script.indexOf('function writeGeneratedClipboard(');
const end = script.indexOf('document.getElementById("refresh").addEventListener', begin);
assert(begin >= 0 && end > begin, "cannot isolate generated share buttons");
const code = script.slice(begin, end);
assert(!code.includes('window.prompt('), "manual copy prompt must not be the normal or error path");

const listeners = new Map();
const buttons = Object.fromEntries(["aiShare", "aiReadable"].map((id) => [id, {
  id, textContent: id === "aiShare" ? "AI COPY" : "AI URL", disabled: false,
  addEventListener(event, callback) {
    assert.equal(event, "click");
    listeners.set(id, callback);
  },
}]));
const clipboardCalls = [];
const clipboard = {
  write(items) {
    // Called at the very start of the click handler, not in a fetch .then().
    clipboardCalls.push({ kind: "write", items });
    return items[0].data["text/plain"].then(async (blob) => {
      clipboardCalls.at(-1).text = await blob.text();
    });
  },
  writeText() { throw new Error("writeText must not be called after a network await on WebKit"); },
};
class FakeClipboardItem {
  constructor(data) { this.data = data; }
}
const network = [];
const fetchMock = async (url) => {
  network.push(String(url));
  if (String(url).startsWith("/api/ai-readable-link")) {
    return { ok: true, json: async () => ({ url: "https://vintage-alarm-ai-relay.pages.dev/s/v2/7d/auto/-/-/1000000000/test#VA2" }) };
  }
  if (String(url).startsWith("/api/ai-share-link")) {
    return { ok: true, json: async () => ({ url: "https://dashboard.test/api/ai-export" }) };
  }
  if (String(url) === "https://dashboard.test/api/ai-export") {
    return { ok: true, json: async () => ({ visits: 17, pageviews: 17 }) };
  }
  throw new Error("Unexpected URL " + url);
};
const alerts = [];
const context = vm.createContext({
  document: { getElementById: (id) => buttons[id] },
  navigator: { clipboard },
  ClipboardItem: FakeClipboardItem,
  Blob, Promise, String, JSON, URL, URLSearchParams,
  analyticsQuery: () => new URLSearchParams({ range: "30d", bucket: "7d" }),
  buildDiscoveryShare: () => ({ status: "NOT_IMPORTED" }),
  localStorage: {},
  window: { prompt: () => { throw new Error("manual copy prompt unexpectedly displayed"); } },
  fetch: fetchMock,
  alert: (message) => alerts.push(message),
  setTimeout: () => {},
});
vm.runInContext(code, context, { filename: "generated-dashboard-clipboard.js" });
assert.equal(listeners.size, 2, "both share button handlers must be registered");

for (const id of ["aiReadable", "aiShare"]) {
  const before = clipboardCalls.length;
  const promise = listeners.get(id)(); // direct user gesture
  assert.equal(clipboardCalls.length, before + 1, id + ": clipboard.write must happen synchronously before fetch resolves");
  await promise;
  assert.equal(buttons[id].textContent, "COPIED", id + ": successful copy should be reported");
}
assert(clipboardCalls[0].text.includes("discovery="), "AI URL must include browser discovery fragment");
assert(clipboardCalls[0].text.startsWith("https://vintage-alarm-ai-relay.pages.dev/s/v2/"),
  "AI URL must copy the verified relay link");
assert(JSON.parse(clipboardCalls[1].text).visits === 17, "AI COPY must copy analytics JSON");
assert.equal(alerts.length, 0, "successful copy must not trigger alerts or manual prompt");
assert(network.some((url) => url.startsWith("/api/ai-readable-link?range=30d&bucket=7d")),
  "AI URL must keep the selected range and bucket");
assert(network.some((url) => url.startsWith("/api/ai-share-link?range=30d&bucket=7d&ttl=604800")),
  "AI COPY must keep the selected range and bucket");
console.log("AI URL / AI COPY Safari-style click gesture and clipboard test: OK");
