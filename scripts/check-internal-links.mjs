import { files, document, attr, route, resolve, origin, finish } from './site-audit-lib.mjs';

const pages = files().filter(f => f.endsWith('.html'));
const docs = new Map(pages.map(f => [f, document(f)]));
const errors = [];
let checked = 0;
for (const [file, nodes] of docs) {
  const source = new URL(route(file), origin);
  const base = nodes.find(n => n.tagName === 'base' && attr(n, 'href'));
  const baseURL = base ? new URL(attr(base, 'href'), source) : source;
  for (const n of nodes) {
    const refs = ['href', 'src', 'poster', 'data'].filter(a => a !== 'data' || n.tagName === 'object')
      .map(a => attr(n, a)).filter(v => v !== undefined);
    // Browser srcset candidates: URLs may contain commas (notably data URLs).
    const srcset = attr(n, 'srcset') || attr(n, 'imagesrcset');
    if (srcset) for (const match of srcset.matchAll(/(?:^|\s+)(\S+)(?:\s+[\d.]+[wx])?\s*(?:,|$)/g)) refs.push(match[1].replace(/,$/, ''));
    for (const ref of refs) {
      try {
        const url = new URL(ref, baseURL);
        if (!['http:', 'https:'].includes(url.protocol) || url.origin !== origin) continue;
        checked++;
        const target = resolve(url);
        if (!target) { errors.push(`${route(file)} → ${ref}: missing file/page`); continue; }
        if (url.hash && docs.has(target)) {
          const id = decodeURIComponent(url.hash.slice(1)).split(':~:text=')[0];
          if (id && !docs.get(target).some(el => attr(el, 'id') === id || (el.tagName === 'a' && attr(el, 'name') === id)))
            errors.push(`${route(file)} → ${ref}: missing fragment #${id}`);
        }
      } catch (error) { errors.push(`${route(file)} → ${ref}: ${error.message}`); }
    }
  }
}
finish('Internal links', errors, `${pages.length} HTML files, ${checked} internal references`);
