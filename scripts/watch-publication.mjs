import fs from 'node:fs';
import path from 'node:path';

const watchesDir = path.join(process.cwd(), 'src', 'content', 'watches');

export function readWatchPublicationState() {
  return fs.readdirSync(watchesDir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const source = fs.readFileSync(path.join(watchesDir, name), 'utf8');
      const slug = source.match(/^slug:\s*["']?([^"'\n]+)["']?\s*$/m)?.[1]?.trim();
      const published = /^published:\s*true\s*$/m.test(source);
      if (!slug) throw new Error(`Missing slug in ${name}`);
      return { name, slug, published };
    });
}

export function getPublishedWatchSlugs() {
  return new Set(readWatchPublicationState().filter((watch) => watch.published).map((watch) => watch.slug));
}
