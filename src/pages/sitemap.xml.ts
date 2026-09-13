import { getCollection } from 'astro:content';
import { englishWatchEntries } from '../data/en-watch-entry';

export async function GET() {
  const root = 'https://vintagealarm.github.io/';
  const watches = await getCollection('watches');
  const published = watches.filter((item) => item.data.published);
  const urls = [
    root,
    `${root}history/`,
    `${root}owners-notes/`,
    `${root}en/`,
    ...published.map((item) => `${root}${item.data.slug}/`),
    ...published
      .filter((item) => englishWatchEntries[item.data.slug])
      .map((item) => `${root}en/${item.data.slug}/`)
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
