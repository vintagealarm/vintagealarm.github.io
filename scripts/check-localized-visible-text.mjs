import fs from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'parse5';

const dist = path.resolve(process.argv[2] || 'dist');
const failures = [];
const japaneseScript = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u;
const japanesePunctuation = /[（）［］【】「」『』〈〉《》／：・〜]/u;
const checkedAttrs = new Set(['alt', 'aria-label', 'title', 'placeholder', 'content']);

const walkFiles = async (dir, prefix = '') => {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const rel = path.posix.join(prefix, entry.name);
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walkFiles(abs, rel));
    else if (entry.name.endsWith('.html')) out.push(rel);
  }
  return out;
};

const attr = (node, name) => node.attrs?.find((item) => item.name === name)?.value || '';
const stripIntentionalNames = (value) =>
  value
    .replaceAll('Mori (時計狂)', 'Mori')
    .replaceAll('Mori（時計狂）', 'Mori');

const hasLeak = (value) => {
  const cleaned = stripIntentionalNames(String(value || ''));
  return japaneseScript.test(cleaned) || japanesePunctuation.test(cleaned);
};

const excerpt = (value) => String(value || '').replace(/\s+/g, ' ').trim().slice(0, 180);

const inspect = (node, file, state = { skip: false }) => {
  if (!node) return;
  const tag = node.tagName || node.nodeName || '';
  if (['script', 'style', 'noscript', 'template'].includes(tag)) return;

  const japaneseSwitch = tag === 'a' && attr(node, 'hreflang') === 'ja';
  const skip = state.skip || japaneseSwitch;

  if (!skip && node.nodeName === '#text') {
    const value = node.value || '';
    if (hasLeak(value)) failures.push(`${file}: visible localized text contains Japanese leakage: ${JSON.stringify(excerpt(value))}`);
  }

  if (!skip && Array.isArray(node.attrs)) {
    for (const item of node.attrs) {
      if (!checkedAttrs.has(item.name)) continue;
      if (tag === 'meta' && item.name === 'content') {
        const metaName = attr(node, 'name') || attr(node, 'property');
        if (!['description', 'og:title', 'og:description', 'twitter:title', 'twitter:description'].includes(metaName)) continue;
      }
      if (hasLeak(item.value)) {
        failures.push(`${file}: ${item.name} contains Japanese leakage: ${JSON.stringify(excerpt(item.value))}`);
      }
    }
  }

  for (const child of node.childNodes || []) inspect(child, file, { skip });
};

for (const lang of ['en', 'de']) {
  const root = path.join(dist, lang);
  let files = [];
  try {
    files = await walkFiles(root, lang);
  } catch (error) {
    failures.push(`${lang}: cannot scan localized build output: ${error.message}`);
    continue;
  }
  for (const file of files) {
    const html = await fs.readFile(path.join(dist, file), 'utf8');
    inspect(parse(html), file);
  }
}

const unique = [...new Set(failures)];
if (unique.length) {
  console.error('Localized visible-text purity check failed:');
  for (const failure of unique) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Localized visible-text purity check: PASS — EN / DE rendered text and user-facing attributes contain no unapproved Japanese-script or Japanese-style punctuation leakage.');
