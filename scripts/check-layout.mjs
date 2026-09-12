import { chromium } from 'playwright';
import { readWatchPublicationState } from './watch-publication.mjs';

const root = process.env.LAYOUT_BASE_URL || 'http://127.0.0.1:4321/';
const publishedWatchRoutes = readWatchPublicationState()
  .filter((watch) => watch.published)
  .map((watch) => `${watch.slug}/`);
const routes = [
  '',
  'history/',
  'owners-notes/',
  ...publishedWatchRoutes,
  'history/smartwatch/'
];
const widths = [320, 390, 768];

const browser = await chromium.launch({ headless: true });
const failures = [];

try {
  for (const width of widths) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1
    });
    const page = await context.newPage();

    for (const route of routes) {
      const url = new URL(route, root).href;
      const response = await page.goto(url, { waitUntil: 'networkidle' });
      if (!response?.ok()) {
        failures.push(`${width}px ${route || '/'}: HTTP ${response?.status() ?? 0}`);
        continue;
      }

      const result = await page.evaluate(() => {
        const root = document.documentElement;
        const body = document.body;
        const scrollWidth = Math.max(root.scrollWidth, body?.scrollWidth || 0);
        const clientWidth = root.clientWidth;
        const brokenImages = [...document.images]
          .filter((img) => (img.getAttribute('src') || '').trim() && img.complete && img.naturalWidth === 0)
          .map((img) => img.currentSrc || img.src);

        return {
          scrollWidth,
          clientWidth,
          overflow: scrollWidth - clientWidth,
          brokenImages
        };
      });

      if (result.overflow > 1) {
        failures.push(`${width}px ${route || '/'}: horizontal overflow ${result.scrollWidth}px > ${result.clientWidth}px`);
      }
      if (result.brokenImages.length) {
        failures.push(`${width}px ${route || '/'}: broken images: ${result.brokenImages.join(', ')}`);
      }

      if (route === 'history/' && width <= 390) {
        const historyRails = await page.evaluate(() => {
          const eraNav = document.querySelector('.history-era-nav > .shell');
          const chapter = document.getElementById('1950s');
          if (chapter instanceof HTMLDetailsElement) chapter.open = true;
          const ownerRail = chapter?.querySelector('.owner-tiles');
          return {
            eraNavScrollable: !!eraNav && eraNav.scrollWidth > eraNav.clientWidth + 1,
            ownerRailScrollable: !!ownerRail && ownerRail.scrollWidth > ownerRail.clientWidth + 1,
            westcloxPresent: !!ownerRail?.querySelector('a[href*="westclox-watchlarm/#owners-note"]')
          };
        });
        if (!historyRails.eraNavScrollable) failures.push(`${width}px history/: era navigation is not swipeable`);
        if (!historyRails.ownerRailScrollable) failures.push(`${width}px history/: OWNER'S NOTE rail is not swipeable`);
        if (!historyRails.westcloxPresent) failures.push(`${width}px history/: Westclox Watchlarm missing from 1950s owner rail`);
      }

      if (route === 'westclox-watchlarm/' && width <= 390) {
        const gallery = await page.evaluate(() => {
          const track = document.querySelector('.specimen-gallery-track');
          const media = [...document.querySelectorAll('.specimen-gallery-media')];
          const ratios = media.map((item) => {
            const rect = item.getBoundingClientRect();
            return rect.height ? rect.width / rect.height : 0;
          });
          return {
            scrollable: !!track && track.scrollWidth > track.clientWidth + 1,
            count: media.length,
            ratios
          };
        });
        if (!gallery.scrollable) failures.push(`${width}px westclox-watchlarm/: specimen gallery is not swipeable`);
        if (gallery.count < 2) failures.push(`${width}px westclox-watchlarm/: specimen gallery has too few media cards`);
        if (gallery.ratios.some((ratio) => ratio < 1.31 || ratio > 1.35)) {
          failures.push(`${width}px westclox-watchlarm/: specimen thumbnails lost the 4:3 frame`);
        }
      }
    }

    await context.close();
  }
} finally {
  await browser.close();
}

if (failures.length) {
  console.error('Layout check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Layout check passed at ${widths.join(', ')}px across ${routes.length} public pages.`);
