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

    const expectedFigureEnds = ['/gong.jpg', '/caseback-hammer.png', '/bell.jpg', '/pin-hammer.png'];
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

    const expectedNatural = [[300, 180], [300, 180], [300, 180], [300, 180]];
    const pixelArtifacts = await page.evaluate(() => {
      return [...document.querySelectorAll('.mechanism-figure img')].map((img) => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let purple = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          if (r > 90 && b > 110 && g < 135 && r - g > 20 && b - g > 25) purple += 1;
        }
        const corners = [[0,0],[canvas.width-1,0],[0,canvas.height-1],[canvas.width-1,canvas.height-1]].map(([x,y]) => {
          const p = ctx.getImageData(x,y,1,1).data;
          return [p[0],p[1],p[2]];
        });
        return { src: img.getAttribute('src') || '', purple, corners };
      });
    });

    diagramState.forEach((item, index) => {
      const artifact = pixelArtifacts[index];
      if (artifact?.purple > 0) failures.push(`${width}px: ${expectedOrder[index]} contains ${artifact.purple} purple artifact pixels`);
      if (artifact?.corners?.some(([r,g,b]) => Math.abs(r - 242) > 4 || Math.abs(g - 238) > 4 || Math.abs(b - 227) > 4)) {
        failures.push(`${width}px: ${expectedOrder[index]} image background corners do not match approved card paper: ${JSON.stringify(artifact.corners)}`);
      }
      const [nw, nh] = expectedNatural[index];
      if (item.naturalWidth !== nw || item.naturalHeight !== nh) {
        failures.push(`${width}px: ${expectedOrder[index]} wrong image dimensions ${item.naturalWidth}x${item.naturalHeight}, expected ${nw}x${nh}`);
      }
      if (index === 0) {
        if (item.transform === 'none') failures.push(`${width}px: GONG artwork was not enlarged`);
      } else if (item.transform !== 'none') {
        failures.push(`${width}px: ${expectedOrder[index]} unexpected transform ${item.transform}`);
      }
      const clipped = item.image.left < item.figure.left - 1 || item.image.right > item.figure.right + 1 || item.image.top < item.figure.top - 1 || item.image.bottom > item.figure.bottom + 1;
      if (index !== 0 && clipped) {
        failures.push(`${width}px: ${expectedOrder[index]} image is clipped by figure box: ${JSON.stringify(item)}`);
      }
      const heightRatio = item.figure.height ? item.image.height / item.figure.height : 0;
      const widthRatio = item.figure.width ? item.image.width / item.figure.width : 0;
      if (index !== 0 && (heightRatio < 0.55 || heightRatio > 1.01 || widthRatio < 0.35 || widthRatio > 1.01)) {
        failures.push(`${width}px: ${expectedOrder[index]} visual size out of range: h=${heightRatio.toFixed(2)} w=${widthRatio.toFixed(2)}`);
      }
    });

    const editorialState = await page.evaluate(() => {
      const bodyText = document.body.innerText;
      const selected = document.querySelector('.category-button[aria-pressed="true"]');
      return {
        bodyText,
        selectedBoxShadow: selected ? getComputedStyle(selected).boxShadow : 'missing'
      };
    });
    for (const forbidden of [
      '現在の掲載個体は',
      '音源は実機録音を追加するまで表示しない',
      '音源準備中',
      '実機録音を追加予定',
      '音源スロットは各掲載個体に用意済み',
      '複数音源を格納できる構造を維持'
    ]) {
      if (editorialState.bodyText.includes(forbidden)) {
        failures.push(`${width}px: production/meta comment still visible: ${forbidden}`);
      }
    }
    if (editorialState.selectedBoxShadow !== 'none') {
      failures.push(`${width}px: selected card still renders box-shadow line: ${editorialState.selectedBoxShadow}`);
    }

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
      const rows = await page.locator('[data-specimen]:not([hidden])').evaluateAll((cards) => cards.map((card) => {
        const box = (selector) => {
          const rect = card.querySelector(selector).getBoundingClientRect();
          return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
        };
        const rect = card.getBoundingClientRect();
        return { card: { left: rect.left, right: rect.right }, media: box('.specimen-media'), meta: box('.specimen-meta'), audio: box('.audio-slots') };
      }));
      rows.forEach(({ card, media, meta, audio }, index) => {
        if (media.right >= meta.left || Math.abs(media.top - meta.top) > 2 ||
            audio.left < meta.left - 1 || audio.left < media.right ||
            audio.top < meta.bottom - 1 || audio.right > card.right + 1) {
          failures.push(`${width}px: specimen ${index + 1} mobile media/name/audio layout is wrong`);
        }
      });
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
