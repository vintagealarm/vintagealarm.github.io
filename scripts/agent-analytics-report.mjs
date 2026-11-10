// Scheduled GitHub Actions read bridge for VINTAGE ALARM analytics.
// GitHub connector can inspect these sanitized run logs without user-issued
// AI URLs. This is intentionally a PUBLIC aggregate report in a public repo.
import { analyticsResponse } from "../cloudflare/analytics-dashboard/worker.js";
import { buildAgentAnalyticsReport } from "../cloudflare/analytics-dashboard/agent-analytics-report.js";

const env = {
  CF_API_TOKEN: process.env.CLOUDFLARE_API_TOKEN || "",
  CF_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID || "",
  REQUEST_HOST: "vintagealarm.github.io",
  LEGACY_REQUEST_HOST: "orima1995-create.github.io",
};
if (!env.CF_API_TOKEN || !env.CF_ACCOUNT_ID) {
  throw new Error("Cloudflare repository secrets are unavailable; no analytics was published.");
}
const windows = ["24h", "7d", "30d", "all"];
const reports = [];
for (const range of windows) {
  const url = new URL("https://agent-runner.invalid/api/analytics");
  url.searchParams.set("range", range);
  url.searchParams.set("bucket", "auto");
  let response;
  try {
    response = await analyticsResponse(url, env);
  } catch {
    throw new Error("Cloudflare GraphQL failed to produce a safe " + range + " report.");
  }
  if (!response.ok) {
    // Do not print raw Cloudflare responses or tokens into public logs.
    throw new Error("Cloudflare GraphQL refused " + range + " analytics with status " + response.status);
  }
  const payload = await response.json();
  const report = buildAgentAnalyticsReport(payload, range);
  if (report.integrityStatus === "FAIL") {
    throw new Error("Analytics integrity FAIL in " + range + "; refuse to publish report");
  }
  reports.push(report);
}
const output = {
  schemaVersion: "vintage-alarm-github-agent-report-v1",
  collectedAt: new Date().toISOString(),
  visibility: "PUBLIC_AGGREGATED_GITHUB_ACTIONS_LOG",
  alert: "This report excludes raw referrer URLs, country, device, IP, cookies, probe event rows, and secrets. Long-range history may be sampled; no daily archive is available in this standalone runner.",
  attribution: "USER_CONFIRMED: Facebook traffic is grouped under Instagram for operational analysis; raw Facebook/Instagram counters remain separate.",
  windows: Object.fromEntries(reports.map((report) => [report.rangeKey, report])),
};
// Each future chat retrieves the latest successful GitHub Actions log using
// the connected GitHub connector; no browser clipboard or manual URL is needed.
console.log("VA_AGENT_REPORT_V1_START");
console.log(JSON.stringify(output));
console.log("VA_AGENT_REPORT_V1_END");
