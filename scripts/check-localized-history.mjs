import { chromium } from 'playwright';

const root = process.env.LAYOUT_BASE_URL || 'http://127.0.0.1:4321/';
const cases = [
  {
    route: 'history/',
    lang: 'ja',
    sourceSummary: '参考資料・出典',
    languageLinks: [['en', 'EN'], ['de', 'DE']],
    menuHref: '/history/'
  },
  {
    route: 'en/history/',
    lang: 'en',
    sourceSummary: 'References & Sources',
    languageLinks: [['ja', '日本語'], ['de', 'DE']],
    menuHref: '/en/history/'
  },
  {
    route: 'de/history/',
    lang: 'de',
    sourceSummary: 'Literatur & Quellen',
    languageLinks: [['ja', '日本語'], ['en', 'EN']],
    menuHref: '/de/history/'
  }
];
const widths = [320, 390, 768];
const failures = [];
const browser = await chromium.launch({ headless: true });

try {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    let japaneseOverflow = null;

    for (const testCase of cases) {
      const response = await page.goto(new URL(testCase.route, root).href, { waitUntil: 'networkidle' });
      if (!response?.ok()) {
        failures.push(`${width}px ${testCase.route}: HTTP ${response?.status() ?? 0}`);
        continue;
      }

      const state = await page.evaluate(({ expectedLang, sourceSummary, menuHref }) => {
        const eraNav = document.querySelector('.history-era-nav > .shell');
        const chapters = [...document.querySelectorAll('details.chronology-era')];
        for (const chapter of chapters) chapter.open = true;
        const rootElement = document.documentElement;
        const body = document.body;
        const scrollWidth = Math.max(rootElement.scrollWidth, body?.scrollWidth || 0);
        const brokenImages = [...document.images]
          .filter((img) => (img.getAttribute('src') || '').trim() && img.complete && img.naturalWidth === 0)
          .map((img) => img.currentSrc || img.src);
        const sourceDetails = document.querySelector('.history-sources-v13 details');
        const sourceSummaryText = sourceDetails?.querySelector('summary')?.textContent?.trim() || '';
        const menuHistoryLink = [...document.querySelectorAll('.section-menu-panel a')]
          .find((link) => new URL(link.getAttribute('href') || '', location.href).pathname === menuHref);
        const currentLink = document.querySelector('#current .current-link');
        const localizedNoteSpacingOk = [...document.querySelectorAll('.shelf-display-note-v18')].every((note) => {
          const parentText = note.parentElement?.textContent || '';
          const noteText = note.textContent || '';
          const index = parentText.indexOf(noteText);
          return index <= 0 || /\s/.test(parentText[index - 1]);
        });

        return {
          lang: document.documentElement.lang,
          overflow: scrollWidth - rootElement.clientWidth,
          brokenImages,
          chapterCount: chapters.length,
          milestoneCount: document.querySelectorAll('[data-milestones] article').length,
          sourceCount: document.querySelectorAll('.history-source-list > li').length,
          sourceSummaryText,
          eraNavScrollable: !!eraNav && eraNav.scrollWidth > eraNav.clientWidth + 1,
          menuHistoryLink: !!menuHistoryLink,
          currentHref: currentLink?.getAttribute('href') || '',
          currentHreflang: currentLink?.getAttribute('hreflang') || '',
          localizedNoteSpacingOk,
          expectedLang,
          expectedSourceSummary: sourceSummary
        };
      }, { expectedLang: testCase.lang, sourceSummary: testCase.sourceSummary, menuHref: testCase.menuHref });

      if (state.lang !== testCase.lang) failures.push(`${width}px ${testCase.route}: html lang=${state.lang}, expected ${testCase.lang}`);
      if (testCase.lang === 'ja') {
        japaneseOverflow = state.overflow;
      } else if (japaneseOverflow != null && state.overflow > japaneseOverflow + 1) {
        failures.push(`${width}px ${testCase.route}: localized overflow ${state.overflow}px exceeds Japanese HISTORY baseline ${japaneseOverflow}px`);
      }
      if (state.brokenImages.length) failures.push(`${width}px ${testCase.route}: broken images ${state.brokenImages.join(', ')}`);
      if (state.chapterCount !== 6) failures.push(`${width}px ${testCase.route}: expected 6 chronology chapters, got ${state.chapterCount}`);
      if (state.milestoneCount !== 11) failures.push(`${width}px ${testCase.route}: expected 11 milestone cards, got ${state.milestoneCount}`);
      if (state.sourceCount !== 7) failures.push(`${width}px ${testCase.route}: expected 7 sources, got ${state.sourceCount}`);
      if (state.sourceSummaryText !== testCase.sourceSummary) failures.push(`${width}px ${testCase.route}: source summary drifted to ${JSON.stringify(state.sourceSummaryText)}`);
      if (!state.menuHistoryLink) failures.push(`${width}px ${testCase.route}: localized HISTORY menu link missing`);
      if (width <= 390 && !state.eraNavScrollable) failures.push(`${width}px ${testCase.route}: era navigation is not swipeable`);
      if (testCase.lang !== 'ja') {
        if (!state.localizedNoteSpacingOk) failures.push(`${width}px ${testCase.route}: milestone summary and note are concatenated without whitespace`);
        if (!state.currentHref.endsWith('/history/smartwatch/')) failures.push(`${width}px ${testCase.route}: SMARTWATCH epilogue link changed`);
        if (state.currentHreflang !== 'ja') failures.push(`${width}px ${testCase.route}: Japanese SMARTWATCH epilogue must declare hreflang=ja`);
      }

      for (const [hreflang, label] of testCase.languageLinks) {
        const present = await page.evaluate(({ hreflang, label }) => [...document.links].some((link) =>
          link.getAttribute('hreflang') === hreflang && (link.textContent || '').trim() === label
        ), { hreflang, label });
        if (!present) failures.push(`${width}px ${testCase.route}: language switch ${label}/${hreflang} missing`);
      }
    }

    await context.close();
  }
} finally {
  await browser.close();
}

if (failures.length) {
  console.error('Localized HISTORY check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Localized HISTORY check passed at ${widths.join(', ')}px for JA / EN / DE.`);
