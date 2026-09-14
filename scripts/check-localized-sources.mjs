import { chromium } from 'playwright';

const root = process.env.LAYOUT_BASE_URL || 'http://127.0.0.1:4321/';
const cases = [
  {
    route: 'sources/',
    lang: 'ja',
    heading: '資料・出典',
    languageLinks: [['en', 'EN'], ['de', 'DE']]
  },
  {
    route: 'en/sources/',
    lang: 'en',
    heading: 'Sources & References',
    languageLinks: [['ja', '日本語'], ['de', 'DE']]
  },
  {
    route: 'de/sources/',
    lang: 'de',
    heading: 'Quellen & Literatur',
    languageLinks: [['ja', '日本語'], ['en', 'EN']]
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

      const state = await page.evaluate(() => {
        const rootElement = document.documentElement;
        const body = document.body;
        const scrollWidth = Math.max(rootElement.scrollWidth, body?.scrollWidth || 0);
        return {
          lang: rootElement.lang,
          overflow: scrollWidth - rootElement.clientWidth,
          heading: document.querySelector('.source-library h1')?.textContent?.trim() || '',
          sourceCount: document.querySelectorAll('[data-source-id]').length,
          brokenImages: [...document.images]
            .filter((img) => (img.getAttribute('src') || '').trim() && img.complete && img.naturalWidth === 0)
            .map((img) => img.currentSrc || img.src)
        };
      });

      if (state.lang !== testCase.lang) failures.push(`${width}px ${testCase.route}: html lang=${state.lang}, expected ${testCase.lang}`);
      if (state.heading !== testCase.heading) failures.push(`${width}px ${testCase.route}: heading drifted to ${JSON.stringify(state.heading)}`);
      if (state.sourceCount !== 2) failures.push(`${width}px ${testCase.route}: expected 2 source cards, got ${state.sourceCount}`);
      if (state.brokenImages.length) failures.push(`${width}px ${testCase.route}: broken images ${state.brokenImages.join(', ')}`);

      if (testCase.lang === 'ja') japaneseOverflow = state.overflow;
      else if (japaneseOverflow != null && state.overflow > japaneseOverflow + 1) {
        failures.push(`${width}px ${testCase.route}: localized overflow ${state.overflow}px exceeds Japanese SOURCES baseline ${japaneseOverflow}px`);
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
  console.error('Localized SOURCES check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Localized SOURCES check passed at ${widths.join(', ')}px for JA / EN / DE.`);
