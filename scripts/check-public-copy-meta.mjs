import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const targets = [
  'src/content/watches',
  'src/data/en-watch-entry.ts',
  'src/data/en-watch-full-research.ts',
  'src/data/de-watch-entry.ts',
];
const extensions = new Set(['.md', '.mdx', '.ts', '.json']);

const rules = [
  {
    label: '日本語の編集履歴',
    pattern: /(?:従来|以前|旧)[^。\n]{0,100}(?:表記|記載|数値|値|寸法|直径)[^。\n]{0,100}(?:訂正|修正|改め|置き換え|変更)/g,
  },
  {
    label: '日本語の誤読訂正メタ',
    pattern: /(?:読み違い|誤読)[^。\n]{0,80}(?:訂正|修正|改め)/g,
  },
  {
    label: 'English editorial history',
    pattern: /(?:former|previous|earlier)[^.\n]{0,100}(?:entry|figure|listing|value|measurement)[^.\n]{0,100}(?:corrected|replaced|revised|changed)/gi,
  },
  {
    label: 'English correction aside',
    pattern: /(?:corrected|replaced|revised) here(?: as)?/gi,
  },
  {
    label: 'Deutsche Änderungshistorie',
    pattern: /(?:frühere[nrsm]?|bisherige[nrsm]?)[^.\n]{0,100}(?:Angabe|Wert|Eintrag|Maß)[^.\n]{0,100}(?:berichtigt|korrigiert|ersetzt|geändert)/gi,
  },
  {
    label: 'Deutsche Fehlablesungsnotiz',
    pattern: /Fehlablesung der Fotos/gi,
  },
];

function collect(target, files = []) {
  const absolute = path.resolve(root, target);
  if (!fs.existsSync(absolute)) return files;
  const stat = fs.statSync(absolute);
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
      if (entry.name.startsWith('.')) continue;
      collect(path.join(target, entry.name), files);
    }
    return files;
  }
  if (extensions.has(path.extname(absolute))) files.push(absolute);
  return files;
}

function lineNumber(text, index) {
  return text.slice(0, index).split('\n').length;
}

const files = [...new Set(targets.flatMap((target) => collect(target)))];
const errors = [];

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const relative = path.relative(root, file).split(path.sep).join('/');
  for (const rule of rules) {
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags);
    for (const match of text.matchAll(regex)) {
      errors.push({
        file: relative,
        line: lineNumber(text, match.index ?? 0),
        label: rule.label,
        excerpt: match[0].replace(/\s+/g, ' ').slice(0, 180),
      });
    }
  }
}

if (errors.length) {
  console.error(`Public-copy editorial-meta gate failed (${errors.length}):`);
  for (const error of errors) {
    console.error(`- ${error.file}:${error.line} [${error.label}] ${error.excerpt}`);
  }
  console.error('Keep correction history in internal decision records; publish only the resulting facts.');
  process.exit(1);
}

console.log(`Public-copy editorial meta: PASS — ${files.length} files checked`);
