import { chromium } from 'playwright';
import { readWatchPublicationState } from './watch-publication.mjs';

const root = process.env.LAYOUT_BASE_URL || 'http://127.0.0.1:4321/';
const publishedWatchRoutes = readWatchPublicationState()
  .filter((watch) => watch.published)
  .map((watch) => `${watch.slug}/`);
const englishWatchRoutes = readWatchPublicationState()
  .filter((watch) => watch.published)
  .map((watch) => `en/${watch.slug}/`);
const routes = [
  '',
  'history/',
  'owners-notes/',
  ...publishedWatchRoutes,
  'en/',
  ...englishWatchRoutes,
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

      if (route.startsWith('en/') && route !== 'en/' && width <= 390) {
        const englishState = await page.evaluate(() => ({
          lang: document.documentElement.lang,
          englishLink: !!document.querySelector('a[href^="/en/"]'),
          japaneseResearchLink: [...document.links].some((link) => /COMPLETE JAPANESE|FULL RESEARCH NOTE/.test(link.textContent || '')),
          ownerTextOpen: document.querySelector('#owners-note')?.closest('section')?.querySelector('details')?.hasAttribute('open') || false,
          alarmHeading: document.getElementById('listen')?.textContent?.trim() || ''
        }));
        if (englishState.lang !== 'en') failures.push(`${width}px ${route}: html lang is not en`);
        if (!englishState.japaneseResearchLink) failures.push(`${width}px ${route}: missing visible link to complete Japanese research`);
        if (!englishState.ownerTextOpen) failures.push(`${width}px ${route}: English OWNER'S NOTE text is not open by default`);
        if (englishState.alarmHeading && englishState.alarmHeading !== 'ORIGINAL ALARM VIDEO') failures.push(`${width}px ${route}: alarm video heading is not localized`);
      }

      if (route === 'history/' && width <= 390) {
        const historyState = await page.evaluate(() => {
          const eraNav = document.querySelector('.history-era-nav > .shell');
          const chapter = document.getElementById('1950s');
          if (chapter instanceof HTMLDetailsElement) chapter.open = true;
          const ownerRail = chapter?.querySelector('.owner-tiles');
          const inspectListingImage = (slug) => {
            const image = ownerRail?.querySelector(`a[href*="${slug}/#owners-note"] img`);
            return {
              present: image instanceof HTMLImageElement,
              srcPresent: image instanceof HTMLImageElement && !!(image.getAttribute('src') || '').trim(),
              fallbackPresent: image instanceof HTMLImageElement && !!(image.dataset.fallbackSrc || '').trim(),
              autoFit: image instanceof HTMLImageElement && image.hasAttribute('data-smart-watch-fit')
            };
          };
          const heading = document.querySelector('.chapter-summary-copy-v18 h2');
          const paragraph = document.querySelector('.chapter-copy p');
          const headingStyle = heading ? getComputedStyle(heading) : null;
          const paragraphStyle = paragraph ? getComputedStyle(paragraph) : null;
          const closing = /^[、。！？…）」』】］〉》]/;
          const opening = /[（「『【［〈《]$/;
          const headingLineIssues = [];

          for (const element of document.querySelectorAll('.chapter-summary-copy-v18 h2')) {
            const node = [...element.childNodes].find((item) => item.nodeType === Node.TEXT_NODE);
            if (!node?.textContent) continue;
            const lines = new Map();
            for (let index = 0; index < node.textContent.length; index += 1) {
              const char = node.textContent[index];
              if (/\s/.test(char)) continue;
              const range = document.createRange();
              range.setStart(node, index);
              range.setEnd(node, index + 1);
              const rect = range.getClientRects()[0];
              if (!rect) continue;
              const key = Math.round(rect.top);
              lines.set(key, `${lines.get(key) || ''}${char}`);
            }
            for (const line of lines.values()) {
              if (line.length === 1 || closing.test(line) || opening.test(line)) {
                headingLineIssues.push(`${element.textContent?.trim()}: ${line}`);
              }
            }
          }

          return {
            eraNavScrollable: !!eraNav && eraNav.scrollWidth > eraNav.clientWidth + 1,
            ownerRailScrollable: !!ownerRail && ownerRail.scrollWidth > ownerRail.clientWidth + 1,
            westcloxPresent: !!ownerRail?.querySelector('a[href*="westclox-watchlarm/#owners-note"]'),
            wittnauerPresent: !!ownerRail?.textContent?.includes('WITTNAUER'),
            citizen: inspectListingImage('citizen-alarm'),
            westclox: inspectListingImage('westclox-watchlarm'),
            cyma: inspectListingImage('cyma-time-o-vox'),
            legacyPhraseWrappers: document.querySelectorAll('.ja-phrase').length,
            headingWordBreak: headingStyle?.wordBreak || '',
            paragraphWordBreak: paragraphStyle?.wordBreak || '',
            headingLineIssues
          };
        });
        if (!historyState.eraNavScrollable) failures.push(`${width}px history/: era navigation is not swipeable`);
        if (!historyState.ownerRailScrollable) failures.push(`${width}px history/: OWNER'S NOTE rail is not swipeable`);
        if (!historyState.westcloxPresent) failures.push(`${width}px history/: Westclox Watchlarm missing from 1950s owner rail`);
        if (historyState.wittnauerPresent) failures.push(`${width}px history/: unpublished Wittnauer leaked into OWNER'S NOTE rail`);
        for (const [name, state] of [['Cyma', historyState.cyma], ['Citizen', historyState.citizen], ['Westclox', historyState.westclox]]) {
          if (!state.present || !state.srcPresent) failures.push(`${width}px history/: ${name} curated thumbnail element/src missing`);
          if (!state.fallbackPresent) failures.push(`${width}px history/: ${name} thumbnail fallback missing`);
          if (state.autoFit) failures.push(`${width}px history/: ${name} curated thumbnail must bypass SmartWatchFit`);
        }
        if (historyState.legacyPhraseWrappers) failures.push(`${width}px history/: legacy ja-phrase wrappers remain`);
        if (historyState.headingWordBreak !== 'normal') failures.push(`${width}px history/: heading word-break is ${historyState.headingWordBreak || 'unset'}, expected normal`);
        if (historyState.paragraphWordBreak !== 'normal') failures.push(`${width}px history/: paragraph word-break is ${historyState.paragraphWordBreak || 'unset'}, expected normal`);
        if (historyState.headingLineIssues.length) failures.push(`${width}px history/: awkward heading wrap: ${historyState.headingLineIssues.join(' | ')}`);
      }

      if (route === 'owners-notes/' && width <= 390) {
        const directoryState = await page.evaluate(() => {
          const inspect = (slug) => {
            const link = document.querySelector(`a[href*="${slug}/#owners-note"]`);
            const image = link?.querySelector('img');
            const era = link?.closest('.directory-era');
            return {
              present: image instanceof HTMLImageElement,
              srcPresent: image instanceof HTMLImageElement && !!(image.getAttribute('src') || '').trim(),
              fallbackPresent: image instanceof HTMLImageElement && !!(image.dataset.fallbackSrc || '').trim(),
              autoFit: image instanceof HTMLImageElement && image.hasAttribute('data-smart-watch-fit'),
              group: era?.querySelector(':scope > h2')?.textContent?.trim() || '',
              eraLabel: link?.querySelector('.frame-directory-era')?.textContent?.trim() || ''
            };
          };
          return {
            headings: [...document.querySelectorAll('.directory-era > h2')].map((node) => node.textContent?.trim() || ''),
            cyma: inspect('cyma-time-o-vox'),
            citizen: inspect('citizen-alarm'),
            westclox: inspect('westclox-watchlarm')
          };
        });
        if (directoryState.headings.join('|') !== '1940s|1950s|1960s') {
          failures.push(`${width}px owners-notes/: decade headings drifted: ${directoryState.headings.join(' | ')}`);
        }
        if (directoryState.westclox.group !== '1950s') {
          failures.push(`${width}px owners-notes/: Westclox must be grouped under 1950s, got ${directoryState.westclox.group || 'none'}`);
        }
        if (directoryState.westclox.eraLabel !== 'c.1959–early 1960s') {
          failures.push(`${width}px owners-notes/: Westclox compact era label missing or changed`);
        }
        for (const [name, state] of [['Cyma', directoryState.cyma], ['Citizen', directoryState.citizen], ['Westclox', directoryState.westclox]]) {
          if (!state.present || !state.srcPresent) failures.push(`${width}px owners-notes/: ${name} curated thumbnail element/src missing`);
          if (!state.fallbackPresent) failures.push(`${width}px owners-notes/: ${name} thumbnail fallback missing`);
          if (state.autoFit) failures.push(`${width}px owners-notes/: ${name} curated thumbnail must bypass SmartWatchFit`);
        }

        const fallbackProbe = await page.evaluate(async () => {
          const image = document.querySelector('a[href*="westclox-watchlarm/#owners-note"] img');
          if (!(image instanceof HTMLImageElement)) return { ok: false, reason: 'image missing' };
          const fallback = image.dataset.fallbackSrc || '';
          image.src = '/__owner-primary-intentionally-missing__.jpg';
          await new Promise((resolve) => setTimeout(resolve, 250));
          return {
            ok: image.naturalWidth > 0 && image.currentSrc.includes(fallback),
            fallback,
            currentSrc: image.currentSrc,
            placeholder: image.closest('[data-owner-media]')?.classList.contains('is-image-missing') || false
          };
        });
        if (!fallbackProbe.ok) {
          failures.push(`${width}px owners-notes/: Westclox image fallback did not recover (${JSON.stringify(fallbackProbe)})`);
        }
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
