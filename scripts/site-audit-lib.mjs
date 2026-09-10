import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'parse5';

export const origin = 'https://vintagealarm.github.io';
export const root = path.resolve(process.argv[2] || 'dist');
export function files(dir = root) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? files(path.join(dir, e.name)) : [path.join(dir, e.name)]);
}
export function document(file) {
  const nodes = [];
  const visit = n => { if (n.tagName) nodes.push(n); for (const c of n.childNodes || []) visit(c); };
  visit(parse(fs.readFileSync(file, 'utf8')));
  return nodes;
}
export const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value;
export const content = node => (node.childNodes || []).map(n => n.value || content(n)).join('');
export function route(file) {
  return '/' + path.relative(root, file).split(path.sep).join('/').replace(/index\.html$/, '');
}
export function resolve(url) {
  const local = path.resolve(root, '.' + decodeURIComponent(url.pathname));
  if (local !== root && !local.startsWith(root + path.sep)) return null;
  for (const candidate of [local, path.join(local, 'index.html')]) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  return null;
}
export function finish(label, errors, detail) {
  if (errors.length) { console.error(`${label}: FAIL (${errors.length})\n${errors.join('\n')}`); process.exitCode = 1; }
  else console.log(`${label}: PASS — ${detail}`);
}
