import { chromium } from 'playwright';

const root = process.env.LAYOUT_BASE_URL || 'http://127.0.0.1:4321/';
const route = 'lab/how-they-ring/';
const widths = [320, 390, 430, 1440];
const browser = await chromium.launch({ headless: true });
const failures = [];

async function visibleSpecimens(page) {
  return page.locator('[data-specimen]:not([hidden])').evaluateAll((nodes) =>
    nodes.map((node) => (node.textContent || '').replace(/\s+/g, ' ').trim())
  );
}

try {
  for (const width of widths) {
    const context = await browser.newContext({
      viewport: {
        width,
        height: width === 320 ? 568 : width === 390 ? 844 : width === 430 ? 932 : 1000
      },
      deviceScaleFactor: 1
    });
    const page = await context.newPage();
    const response = await page.goto(new URL(route, root).href, { waitUntil: 'networkidle' });

    if (!response?.ok()) {
      failures.push(`${width}px: HTTP ${response?.status() ?? 0}`);
      await context.close();
      continue;
    }

    const shellState = await page.evaluate(() => {
      const categoryButtons = [...document.querySelectorAll('button[data-category]')];
      const labels = categoryButtons.map((button) => button.querySelector('.category-name strong')?.textContent?.trim() || '');
      const figures = categoryButtons.map((button) => button.querySelector('.mechanism-figure img')?.getAttribute('src') || '');
      const overlapFailures = [];

      for (const button of categoryButtons) {
        const parts = ['.category-name', '.mechanism-figure', '.category-action', '.category-count']
          .map((selector) => button.querySelector(selector))
          .filter(Boolean)
          .map((node) => ({ selector: node.className, rect: node.getBoundingClientRect() }));

        for (let i = 0; i < parts.length; i += 1) {
          for (let j = i + 1; j < parts.length; j += 1) {
            const a = parts[i].rect;
            const b = parts[j].rect;
            const overlapX = Math.min(a.right, b.right) - Math.max(a.left, b.left);
            const overlapY = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
            if (overlapX > 1 && overlapY > 1) {
              overlapFailures.push(`${parts[i].selector} × ${parts[j].selector}`);
            }
          }
        }
      }

      return {
        overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - document.documentElement.clientWidth,
        categoryButtons: categoryButtons.length,
        labels,
        figures,
        overlapFailures,
        robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') || '',
        canonical: !!document.querySelector('link[rel="canonical"]'),
        analytics: !!document.querySelector('script[src*="static.cloudflareinsights.com"]')
      };
    });

    if (shellState.overflow > 1) {
      failures.push(`${width}px: horizontal overflow ${shellState.overflow}px`);
    }

    if (shellState.categoryButtons !== 4) {
      failures.push(`${width}px: expected 4 category buttons, got ${shellState.categoryButtons}`);
    }

    const expectedOrder = ['GONG', 'CASEBACK', 'BELL', 'PIN'];
    if (JSON.stringify(shellState.labels) !== JSON.stringify(expectedOrder)) {
      failures.push(`${width}px: category order wrong: ${JSON.stringify(shellState.labels)}`);
    }

    const expectedFigureEnds = ['/gong.jpg', '/caseback.jpg', '/bell.jpg', '/pin.jpg'];
    for (let index = 0; index < expectedFigureEnds.length; index += 1) {
      if (!shellState.figures[index]?.endsWith(expectedFigureEnds[index])) {
        failures.push(`${width}px: category ${expectedOrder[index]} diagram wrong: ${shellState.figures[index]}`);
      }
    }

    const diagramState = await page.evaluate(() =>
      [...document.querySelectorAll('.mechanism-figure img')].map((img) => {
        const figure = img.closest('.mechanism-figure');
        const ir = img.getBoundingClientRect();
        const fr = figure.getBoundingClientRect();
        return {
          src: img.getAttribute('src') || '',
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          image: { left: ir.left, right: ir.right, top: ir.top, bottom: ir.bottom, width: ir.width, height: ir.height },
          figure: { left: fr.left, right: fr.right, top: fr.top, bottom: fr.bottom, width: fr.width, height: fr.height },
          transform: getComputedStyle(img).transform
        };
      })
    );

    const expectedNatural = [[161, 180], [300, 130], [300, 98], [300, 134]];
    diagramState.forEach((item, index) => {
      const [nw, nh] = expectedNatural[index];
      if (item.naturalWidth !== nw || item.naturalHeight !== nh) {
        failures.push(`${width}px: ${expectedOrder[index]} wrong image dimensions ${item.naturalWidth}x${item.naturalHeight}, expected ${nw}x${nh}`);
      }
      if (item.transform !== 'none') {
        failures.push(`${width}px: ${expectedOrder[index]} unexpected transform ${item.transform}`);
      }
      const clipped = item.image.left < item.figure.left - 1 || item.image.right > item.figure.right + 1 || item.image.top < item.figure.top - 1 || item.image.bottom > item.figure.bottom + 1;
      if (clipped) {
        failures.push(`${width}px: ${expectedOrder[index]} image is clipped by figure box: ${JSON.stringify(item)}`);
      }
      const heightRatio = item.figure.height ? item.image.height / item.figure.height : 0;
      const widthRatio = item.figure.width ? item.image.width / item.figure.width : 0;
      if (heightRatio < 0.55 || heightRatio > 1.01 || widthRatio < 0.35 || widthRatio > 1.01) {
        failures.push(`${width}px: ${expectedOrder[index]} visual size out of range: h=${heightRatio.toFixed(2)} w=${widthRatio.toFixed(2)}`);
      }
    });

    if (shellState.overlapFailures.length) {
      failures.push(`${width}px: category content overlap: ${shellState.overlapFailures.join(', ')}`);
    }

    if (shellState.robots !== 'noindex,nofollow,noarchive') failures.push(`${width}px: robots meta changed`);
    if (shellState.canonical) failures.push(`${width}px: lab page must not emit canonical metadata`);
    if (shellState.analytics) failures.push(`${width}px: analytics must not run on test surface`);

    const initial = await visibleSpecimens(page);
    if (
      initial.length !== 3 ||
      !initial.some((item) => item.includes('CYMA')) ||
      !initial.some((item) => item.includes('PIERCE')) ||
      !initial.some((item) => item.includes('WITTNAUER'))
    ) {
      failures.push(`${width}px: GONG initial state is wrong: ${JSON.stringify(initial)}`);
    }

    if (width <= 430) {
      const visibility = await page.evaluate(() => {
        const section = document.querySelector('#specimen-panel');
        const grid = document.querySelector('.category-grid');
        if (!section || !grid) return null;
        const sectionRect = section.getBoundingClientRect();
        const gridRect = grid.getBoundingClientRect();
        return {
          gridHeight: Math.round(gridRect.height),
          gapToGallery: Math.round(sectionRect.top - gridRect.bottom),
          combinedHeight: Math.round(gridRect.height + (sectionRect.top - gridRect.bottom)),
          viewportHeight: window.innerHeight
        };
      });
      if (
        !visibility ||
        visibility.combinedHeight >= visibility.viewportHeight
      ) {
        failures.push(`${width}px: selector and gallery cannot share one viewport: ${JSON.stringify(visibility)}`);
      }
    }

    const cases = [
      ['caseback', 1, 'CITIZEN'],
      ['bell', 1, 'BASIS'],
      ['pin', 1, 'WESTCLOX'],
      ['gong', 3, 'PIERCE']
    ];

    for (const [category, count, marker] of cases) {
      await page.locator(`button[data-category="${category}"]`).click();
      const visible = await visibleSpecimens(page);
      if (visible.length !== count || !visible.some((item) => item.includes(marker))) {
        failures.push(`${width}px: ${category} filter wrong: ${JSON.stringify(visible)}`);
      }
      const selected = await page.locator(`button[data-category="${category}"]`).getAttribute('aria-pressed');
      if (selected !== 'true') failures.push(`${width}px: ${category} aria-pressed not updated`);
    }

    const brokenImages = await page.locator('img').evaluateAll((images) =>
      images.filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.getAttribute('src'))
    );
    if (brokenImages.length) failures.push(`${width}px: broken images: ${brokenImages.join(', ')}`);

    await context.close();
  }
} finally {
  await browser.close();
}

if (failures.length) {
  console.error('Sound gallery preview check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Sound gallery preview check passed at ${widths.join(', ')}px.`);
