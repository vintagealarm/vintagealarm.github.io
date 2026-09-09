# VINTAGE ALARM URL migration

Migration date: 2026-09-10

## Destinations

- Canonical site: `https://vintagealarm.github.io/`
- Canonical repository: `https://github.com/vintagealarm/vintagealarm.github.io`
- Legacy site: `https://orima1995-create.github.io/orima1995-creator.github.io/`
- Legacy repository: `https://github.com/orima1995-create/orima1995-creator.github.io`

## Migration order

1. Publish and verify the canonical site.
2. Keep the legacy site live until the canonical site passes build, metadata, media, and route checks.
3. Replace the legacy site with route-preserving redirect pages.
4. Verify every legacy route reaches the matching canonical route and preserves query strings and fragments.
5. Add the canonical URL-prefix property to Search Console and submit `sitemap.xml`.
6. Keep the legacy property and repository available during the migration period.

## Redirect constraint

GitHub does not redirect a GitHub Pages site when its repository is transferred or renamed. The free fallback is a static redirect page at every known legacy route plus a `404.html` fallback. These redirects use an immediate HTML refresh and JavaScript; they cannot return an HTTP 301/308 status on GitHub Pages. The legacy pages therefore use `noindex,follow` and point their canonical URL at the matching destination.

## Known public routes

- `/`
- `/history/`
- `/owners-notes/`
- `/history/smartwatch/`
- `/basis-alarm/`
- `/pierce-duofon/`
- `/cyma-time-o-vox/`
- `/cyma-time-o-vox/owners-note/`
- `/lab/council/`
- `/robots.txt`
- `/sitemap.xml`
- `/sitemap-vintage.xml`
- `/googled3a96ed4c5eb9287.html`

## State

- Implementation: canonical URL configuration complete
- Local verification: Astro build, canonical/OGP/schema, sitemap/robots, known routes complete
- Publication: complete (`https://vintagealarm.github.io/`)
- Legacy redirects: complete for every known route, with query strings and fragments preserved
- Cloudflare Web Analytics: new-host site and beacon configured; historical legacy-host data remains in the former site
- Analytics dashboard Worker: deployed for `vintagealarm.github.io`; legacy-host referrals remain classified as internal navigation
- Pages CMS: configuration file is present in the canonical repository; GitHub App installation for the Organization is still required
- Search Console: new URL-prefix property verified by HTML file; sitemap submitted; live URL test passed and the home page was added to the priority crawl queue
- Search Console follow-up: the initial sitemap processing status was `Couldn't fetch` even though the public XML returned HTTP 200 to a Googlebot user agent; recheck after Google's next processing pass
- Council Worker: source origin is updated, but no `council-api` Worker is currently deployed; the public lab remains in its existing local-demo mode
- Outcome observation: monitor indexing and traffic after Search Console submission
