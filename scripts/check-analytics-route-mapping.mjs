import fs from "node:fs";
import { TRACKED_PAGE_NAMES } from "../cloudflare/analytics-dashboard/profile-worker.js";

const sitemapPath = new URL("../dist/sitemap.xml", import.meta.url);
if (!fs.existsSync(sitemapPath)) {
  throw new Error("dist/sitemap.xml is missing. Run the Astro build before the analytics route audit.");
}

const xml = fs.readFileSync(sitemapPath, "utf8");
const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
if (!locations.length) throw new Error("No public URLs found in dist/sitemap.xml.");

const publicPaths = [...new Set(locations.map((location) => {
  const url = new URL(location);
  if (url.hostname !== "vintagealarm.github.io") {
    throw new Error(`Unexpected sitemap host: ${url.hostname}`);
  }
  return url.pathname;
}))];

const mapped = new Set(Object.keys(TRACKED_PAGE_NAMES));
const missing = publicPaths.filter((path) => !mapped.has(path));

if (missing.length) {
  throw new Error(
    "Public sitemap route(s) missing from Analytics mapping: " + missing.join(", "),
  );
}

console.log(
  `Analytics route mapping OK (${publicPaths.length} public sitemap route(s), ${mapped.size} tracked route(s)).`,
);
