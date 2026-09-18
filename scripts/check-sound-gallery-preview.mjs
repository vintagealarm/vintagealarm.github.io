import { chromium } from 'playwright';

const root = process.env.LAYOUT_BASE_URL || 'http://127.0.0.1:4321/';
const route = 'lab/how-they-ring/';
const widths = [320, 390, 1440];
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
      viewport: { width, height: 1100 },
      deviceScaleFactor: 1
    });
    const page = await context.newPage();
    const response = await page.goto(new URL(route, root).href, { waitUntil: 'networkidle' });

    if (!response?.ok()) {
      failures.push(\`\${width}px: HTTP \${response?.status() ?? 0}\`);
      await context.close();
      continue;
    }

    const shellState = await page.evaluate(() => ({
      overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - document.documentElement.clientWidth,
      categoryButtons: document.querySelectorAll('button[data-category]').length,
      variantButtons: document.querySelectorAll('button[data-variant]').length,
      robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') || '',
      canonical: !!document.querySelector('link[rel="canonical"]'),
      analytics: !!document.querySelector('script[src*="static.cloudflareinsights.com"]')
    }));

    if (shellState.overflow > 1) failures.push(\`\${width}px: horizontal overflow \${shellState.overflow}px\`);
    if (shellState.categoryButtons !== 4) failures.push(\`\${width}px: expected 4 category buttons, got \${shellState.categoryButtons}\`);
    if (shellState.variantButtons !== 3) failures.push(\`\${width}px: expected 3 prototype variants, got \${shellState.variantButtons}\`);
    if (shellState.robots !== 'noindex,nofollow,noarchive') failures.push(\`\${width}px: robots meta changed\`);
    if (shellState.canonical) failures.push(\`\${width}px: lab page must not emit canonical metadata\`);
    if (shellState.analytics) failures.push(\`\${width}px: analytics must not run on test surface\`);

    const initial = await visibleSpecimens(page);
    if (initial.length !== 3 || !initial.some((item) => item.includes('CYMA')) || !initial.some((item) => item.includes('PIERCE')) || !initial.some((item) => item.includes('WITTNAUER'))) {
      failures.push(\`\${width}px: GONG initial state is wrong: \${JSON.stringify(initial)}\`);
    }

    const cases = [
      ['bell', 1, 'BASIS'],
      ['pin', 1, 'WESTCLOX'],
      ['caseback', 1, 'CITIZEN'],
      ['gong', 3, 'PIERCE']
    ];

    for (const [category, count, marker] of cases) {
      await page.locator(\`button[data-category="\${category}"]\`).click();
      const visible = await visibleSpecimens(page);
      if (visible.length !== count || !visible.some((item) => item.includes(marker))) {
        failures.push(\`\${width}px: \${category} filter wrong: \${JSON.stringify(visible)}\`);
      }
      const selected = await page.locator(\`button[data-category="\${category}"]\`).getAttribute('aria-pressed');
      if (selected !== 'true') failures.push(\`\${width}px: \${category} aria-pressed not updated\`);
    }

    for (const variant of ['a', 'b', 'c']) {
      await page.locator(\`button[data-variant="\${variant}"]\`).click();
      const active = await page.evaluate(() => document.documentElement.dataset.galleryVariant || '');
      if (active !== variant) failures.push(\`\${width}px: variant \${variant} did not activate\`);
    }

    const brokenImages = await page.locator('img').evaluateAll((images) =>
      images.filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.getAttribute('src'))
    );
    if (brokenImages.length) failures.push(\`\${width}px: broken images: \${brokenImages.join(', ')}\`);

    await context.close();
  }
} finally {
  await browser.close();
}

if (failures.length) {
  console.error('Sound gallery preview check failed:');
  for (const failure of failures) console.error(\`- \${failure}\`);
  process.exit(1);
}

console.log(\`Sound gallery preview check passed at \${widths.join(', ')}px.\`);
