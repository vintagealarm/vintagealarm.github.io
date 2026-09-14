import { execFileSync } from 'node:child_process';
import { getCollection } from 'astro:content';
import { englishWatchEntries } from '../data/en-watch-entry';
import { germanWatchEntriesWithCyma } from '../data/cyma-localizations';

function getGitLastmod(filePath: string) {
  try {
    const value = execFileSync('git', ['log', '-1', '--format=%cs', '--', filePath], {
      encoding: 'utf8'
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : undefined;
  } catch {
    return undefined;
  }
}

function renderUrl(loc: string, lastmod?: string) {
  return `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
}

export async function GET() {
  const root = 'https://vintagealarm.github.io/';
  const watches = await getCollection('watches');
  const published = watches.filter((item) => item.data.published);
  const urls = [
    { loc: root },
    { loc: `${root}history/` },
    { loc: `${root}sources/` },
    { loc: `${root}en/history/` },
    { loc: `${root}de/history/` },
    { loc: `${root}en/sources/` },
    { loc: `${root}de/sources/` },
    { loc: `${root}owners-notes/` },
    { loc: `${root}en/` },
    { loc: `${root}de/` },
    ...published.map((item) => ({
      loc: `${root}${item.data.slug}/`,
      lastmod: getGitLastmod(`src/content/watches/${item.data.slug}.md`)
    })),
    ...published
      .filter((item) => englishWatchEntries[item.data.slug])
      .map((item) => ({ loc: `${root}en/${item.data.slug}/` })),
    ...published
      .filter((item) => germanWatchEntriesWithCyma[item.data.slug])
      .map((item) => ({ loc: `${root}de/${item.data.slug}/` }))
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(({ loc, lastmod }) => renderUrl(loc, lastmod)).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
