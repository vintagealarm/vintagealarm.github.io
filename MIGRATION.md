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
- Publication: pending
- Legacy redirects: pending
- Search Console: pending
- Outcome observation: pending
