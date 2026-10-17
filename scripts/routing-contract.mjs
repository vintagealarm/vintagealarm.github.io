import fs from 'node:fs';
import path from 'node:path';

export const routingOwners = ['PROJECT.md', 'measurement/.internal/.virtual/social/ROUTER.md'];
export const bootPaths = ['PROJECT.md', 'AGENTS.md', 'PROJECT_STATE.md'];

export function headings(text) {
  let fence = null;
  return text.split('\n').flatMap((line, i) => {
    const mark = line.trim().match(/^(`{3,}|~{3,})/);
    if (mark) {
      if (!fence) fence = mark[1][0];
      else if (mark[1][0] === fence) fence = null;
      return [];
    }
    const h = !fence && line.match(/^(#{1,6})\s+\S/);
    return h ? [{ line: i, level: h[1].length, text: line.trim() }] : [];
  });
}

export function sectionRanges(text, selectors) {
  const hs = headings(text), lines = text.split('\n');
  if (!selectors?.length || selectors.includes('*')) return [{ start: 0, end: lines.length }];
  return selectors.map(selector => {
    // An array is a heading ancestry, e.g. ["## Watch", "### Snapshot"].
    const ancestry = Array.isArray(selector) ? selector : [selector];
    let start = 0, end = lines.length;
    for (const label of ancestry) {
      const matches = hs.filter(h => h.line >= start && h.line < end && h.text === label.trim());
      if (matches.length !== 1) throw Error(`section must resolve exactly once: ${label} (${matches.length})`);
      const h = matches[0];
      start = h.line;
      end = hs.find(next => next.line > h.line && next.level <= h.level)?.line ?? lines.length;
    }
    return { start, end };
  });
}

export function resolveTarget(owner, target) {
  const clean = target.split('#')[0];
  if (/^(https?:|\/)/.test(clean)) throw Error(`routing target must be repository-relative: ${target}`);
  const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(owner), clean));
  if (resolved.startsWith('../')) throw Error(`routing target escapes repository: ${target}`);
  return resolved;
}

export function parseRoutes(owner, text) {
  const begin = '<!-- VA_ROUTES_BEGIN -->', end = '<!-- VA_ROUTES_END -->';
  if (text.split(begin).length !== 2 || text.split(end).length !== 2) throw Error(`${owner}: missing / duplicate routing table`);
  const body = text.split(begin)[1].split(end)[0];
  return body.split('\n').filter(line => /^\| [A-Z][A-Z0-9-]+ \|/.test(line) && !line.startsWith('| ID |')).map(line => {
    const columns = line.split('|').slice(1, -1).map(s => s.trim());
    if (columns.length !== 5 || columns.some(c => !c)) throw Error(`${owner}: malformed route row`);
    const [id, condition, next, section, stop] = columns;
    const targets = [...next.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map(m => resolveTarget(owner, m[1]));
    if (!targets.length) throw Error(`${owner}: ${id} needs explicit linked targets`);
    return { id, owner, condition, targets, section, stop };
  });
}

export function loadRoutes(read = p => fs.readFileSync(p, 'utf8')) {
  return routingOwners.flatMap(owner => parseRoutes(owner, read(owner)));
}
