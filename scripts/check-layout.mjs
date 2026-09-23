import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { readWatchPublicationState } from './watch-publication.mjs';

const root = process.env.LAYOUT_BASE_URL || 'http://127.0.0.1:4321/';
const watchStates = readWatchPublicationState();
const englishEntrySource = readFileSync(new URL('../src/data/en-watch-entry.ts', import.meta.url), 'utf8');
const englishWatchSlugs = new Set([...englishEntrySource.matchAll(/^  '([^']+)': \\{/gm)].map((match) => match[1]));
const publishedWatchRoutes = watchStates
  .filter((watch) => watch.published)
  .map((watch) => `${watch.slug}/`);
const englishWatchRoutes = watchStates
  .filter((watch) => watch.published && englishWatchSlugs.has(watch.slug))
  .map((watch) => `en/${watch.slug}/`);
const germanWatchRoutes = ['de/pierce-duofon/', 'de/westclox-watchlarm/', 'de/cyma-time-o-vox/', 'de/basis-alarm/', 'de/citizen-alarm/', 'de/wittnauer-10wa/'];
const routes = [
  '',
  'history/',
  'owners-notes/',
  'how-they-ring/',
  ...publishedWatchRoutes,
  'en/',
  'en/how-they-ring/',
  ...englishWatchRoutes,
  'de/',
  'de/how-they-ring/',
  ...germanWatchRoutes,
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

      if (publishedWatchRoutes.includes(route) && width <= 390) {
        const japaneseState = await page.evaluate(() => ({
          lang: document.documentElement.lang,
          englishLanguageLink: [...document.links].some((link) =>
            link.getAttribute('hreflang') === 'en' && (link.textContent || '').trim() === 'EN'
          ),
          germanLanguageLink: [...document.links].some((link) =>
            link.getAttribute('hreflang') === 'de' && (link.textContent || '').trim() === 'DE'
          ),
          oversizedEnglishCta: [...document.links].some((link) => /ENGLISH ENTRY/.test(link.textContent || ''))
        }));
        if (japaneseState.lang !== 'ja') failures.push(`${width}px ${route}: html lang is not ja`);
        const watchSlug = route.replace(/\/$/, '');
        if (englishWatchSlugs.has(watchSlug) && !japaneseState.englishLanguageLink) failures.push(`${width}px ${route}: compact EN language switch missing`);
        if (['pierce-duofon/', 'westclox-watchlarm/', 'cyma-time-o-vox/'].includes(route) && !japaneseState.germanLanguageLink) failures.push(`${width}px ${route}: compact DE language switch missing`);
        if (japaneseState.oversizedEnglishCta) failures.push(`${width}px ${route}: legacy ENGLISH ENTRY CTA remains`);
      }

      if (englishWatchRoutes.includes(route) && width <= 390) {
        const englishState = await page.evaluate(() => ({
          lang: document.documentElement.lang,
          japaneseLanguageLink: [...document.links].some((link) =>
            link.getAttribute('hreflang') === 'ja' && (link.textContent || '').trim() === '日本語'
          ),
          germanLanguageLink: [...document.links].some((link) =>
            link.getAttribute('hreflang') === 'de' && (link.textContent || '').trim() === 'DE'
          ),
          ownerTextOpen: document.querySelector('#owners-note')?.closest('section')?.querySelector('details')?.hasAttribute('open') || false,
          alarmHeading: document.getElementById('listen')?.textContent?.trim() || '',
          sourcesText: (document.querySelector('.sources')?.textContent || '').replace(/\s+/g, ' ').trim()
        }));
        if (englishState.lang !== 'en') failures.push(`${width}px ${route}: html lang is not en`);
        if (!englishState.japaneseLanguageLink) failures.push(`${width}px ${route}: compact Japanese language switch missing`);
        if (['en/pierce-duofon/', 'en/westclox-watchlarm/', 'en/cyma-time-o-vox/'].includes(route) && !englishState.germanLanguageLink) failures.push(`${width}px ${route}: compact DE language switch missing`);
        if (!englishState.ownerTextOpen) failures.push(`${width}px ${route}: English OWNER'S NOTE text is not open by default`);
        if (englishState.alarmHeading && englishState.alarmHeading !== 'ORIGINAL ALARM VIDEO') failures.push(`${width}px ${route}: alarm video heading is not localized`);
        if (/OWNER OBSERVATION\s+OWNER OBSERVATION/i.test(englishState.sourcesText)) failures.push(`${width}px ${route}: duplicate owner-observation source label`);
      }

      if (['en/how-they-ring/', 'de/how-they-ring/'].includes(route) && width <= 390) {
        const soundState = await page.evaluate(() => ({
          lang: document.documentElement.lang,
          japaneseLanguageLink: [...document.links].some((link) =>
            link.getAttribute('hreflang') === 'ja' && (link.textContent || '').trim() === '日本語'
          ),
          englishLanguageLink: [...document.links].some((link) =>
            link.getAttribute('hreflang') === 'en' && (link.textContent || '').trim() === 'EN'
          ),
          germanLanguageLink: [...document.links].some((link) =>
            link.getAttribute('hreflang') === 'de' && (link.textContent || '').trim() === 'DE'
          ),
          recClosed: !document.querySelector('.recording-condition')?.hasAttribute('open'),
          specimenLinks: [...document.querySelectorAll('a.specimen-media')].map((link) => link.getAttribute('href') || '')
        }));
        const expectedLang = route.startsWith('en/') ? 'en' : 'de';
        if (soundState.lang !== expectedLang) failures.push(`${width}px ${route}: html lang is not ${expectedLang}`);
        if (!soundState.japaneseLanguageLink) failures.push(`${width}px ${route}: compact Japanese language switch missing`);
        if (expectedLang === 'en' && !soundState.germanLanguageLink) failures.push(`${width}px ${route}: compact DE language switch missing`);
        if (expectedLang === 'de' && !soundState.englishLanguageLink) failures.push(`${width}px ${route}: compact EN language switch missing`);
        if (!soundState.recClosed) failures.push(`${width}px ${route}: REC. CONDITION should be closed by default`);
        if (soundState.specimenLinks.some((href) => !href.startsWith(`/${expectedLang}/`))) {
          failures.push(`${width}px ${route}: localized specimen link fell back outside /${expectedLang}/`);
        }
      }

      if (germanWatchRoutes.includes(route) && width <= 390) {
        const germanState = await page.evaluate(() => ({
          lang: document.documentElement.lang,
          japaneseLanguageLink: [...document.links].some((link) =>
            link.getAttribute('hreflang') === 'ja' && (link.textContent || '').trim() === '日本語'
          ),
          englishLanguageLink: [...document.links].some((link) =>
            link.getAttribute('hreflang') === 'en' && (link.textContent || '').trim() === 'EN'
          ),
          ownerTextOpen: document.querySelector('#owners-note')?.closest('section')?.querySelector('details')?.hasAttribute('open') || false,
          alarmHeading: document.getElementById('listen')?.textContent?.trim() || '',
          sourcesText: (document.querySelector('.sources')?.textContent || '').replace(/\s+/g, ' ').trim()
        }));
        if (germanState.lang !== 'de') failures.push(`${width}px ${route}: html lang is not de`);
        if (!germanState.japaneseLanguageLink) failures.push(`${width}px ${route}: compact Japanese language switch missing`);
        if (!germanState.englishLanguageLink) failures.push(`${width}px ${route}: compact EN language switch missing`);
        if (!germanState.ownerTextOpen) failures.push(`${width}px ${route}: German OWNER'S NOTE text is not open by default`);
        if (germanState.alarmHeading && germanState.alarmHeading !== 'ORIGINAL-ALARMTON') failures.push(`${width}px ${route}: German alarm video heading is not localized`);
        if (/EIGENE BEOBACHTUNG\s+(?:OWNER OBSERVATION|EIGENE BEOBACHTUNG)/i.test(germanState.sourcesText)) failures.push(`${width}px ${route}: duplicate German owner-observation source label`);
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

    if (width === 390) {
      const malformedOptOut = new URL('cyma-time-o-vox/#owners-note?__va_analytics=off', root).href;
      const response = await page.goto(malformedOptOut, { waitUntil: 'networkidle' });
      if (!response?.ok()) {
        failures.push(`390px malformed analytics opt-out: HTTP ${response?.status() ?? 0}`);
      } else {
        const optOutState = await page.evaluate(() => ({
          stored: localStorage.getItem('vintageAlarmAnalyticsOptOut'),
          dataset: document.documentElement.dataset.vaAnalytics || '',
          path: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
          beaconPresent: !!document.querySelector('script[src*="static.cloudflareinsights.com/beacon.min.js"]')
        }));
        if (optOutState.stored !== '1') failures.push('390px malformed analytics opt-out: localStorage flag was not set');
        if (optOutState.dataset !== 'off') failures.push('390px malformed analytics opt-out: document state is not off');
        if (optOutState.path !== '/cyma-time-o-vox/' || optOutState.search !== '' || optOutState.hash !== '#owners-note') {
          failures.push(`390px malformed analytics opt-out: URL was not normalized (${JSON.stringify(optOutState)})`);
        }
        if (optOutState.beaconPresent) failures.push('390px malformed analytics opt-out: Cloudflare beacon was injected');
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
