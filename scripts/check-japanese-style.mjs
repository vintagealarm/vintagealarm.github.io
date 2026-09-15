import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const extensions = new Set(['.md', '.mdx', '.json', '.astro']);
const excluded = new Set([
  'strategy/japanese-writing.md',
  'references/voice-samples.md',
]);

const defaultTargets = [
  'src/content/watches',
  'src/data/history-content.json',
  'measurement',
  'strategy',
  'README.md',
];

const hardRules = [
  {
    name: '結論の予告',
    pattern: /重要なのは|大事なのは/g,
    guidance: '予告せず、重要な中身をそのまま書く。',
  },
  {
    name: '逃げ表現',
    pattern: /一概には言え|メリットもデメリットも|一長一短|状況によります|と言えるでしょう/g,
    guidance: '判断をぼかさず、確認済みの範囲・未確認の範囲・根拠を具体的に書く。',
  },
  {
    name: '姿勢だけを強める表現',
    pattern: /に他ならない/g,
    guidance: '強調語で押さず、誰が何をどうするのか、何が確認できるのかを書く。',
  },
];

function normalize(file) {
  return path.relative(root, file).split(path.sep).join('/');
}

function collect(target, files = []) {
  const absolute = path.resolve(root, target);
  if (!fs.existsSync(absolute)) return files;
  const stat = fs.statSync(absolute);
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'dist') continue;
      collect(path.join(target, entry.name), files);
    }
    return files;
  }
  if (extensions.has(path.extname(absolute)) || path.basename(absolute) === 'README.md') files.push(absolute);
  return files;
}

function stripNonProse(text) {
  return text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/~~~[\s\S]*?~~~/g, '')
    .replace(/`[^`\n]+`/g, '')
    .replace(/https?:\/\/[^\s)\]}]+/g, '');
}

function lineNumber(text, index) {
  return text.slice(0, index).split('\n').length;
}

function excerpt(text, index) {
  const start = Math.max(0, text.lastIndexOf('\n', index - 1) + 1);
  const endAt = text.indexOf('\n', index);
  const end = endAt === -1 ? text.length : endAt;
  return text.slice(start, end).trim().slice(0, 180);
}

function allMatches(pattern, text) {
  const regex = new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`);
  return [...text.matchAll(regex)];
}

function sentences(text) {
  return text
    .replace(/^---[\s\S]*?---/m, '')
    .split(/(?<=[。！？!?])|\n+/)
    .map((sentence) => sentence.replace(/^\s*[-*>#\d.()①-⑳]+\s*/, '').trim())
    .filter((sentence) => /[ぁ-んァ-ヶ一-龠々]/.test(sentence) && sentence.length >= 8);
}

function ending(sentence) {
  const plain = sentence.replace(/[」』）)\]】〉》”'"\s。、！？!?]+$/g, '');
  for (const candidate of ['でした', 'ました', 'ません', 'でしょう', 'です', 'ます', 'である', 'だった', 'だ']) {
    if (plain.endsWith(candidate)) return candidate;
  }
  return null;
}

function coefficientOfVariation(values) {
  if (!values.length) return Infinity;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  if (!mean) return Infinity;
  const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance) / mean;
}

const rawTargets = process.argv.slice(2).filter((arg) => !arg.startsWith('--'));
const targets = rawTargets.length ? rawTargets : defaultTargets;
const files = [...new Set(targets.flatMap((target) => collect(target)))].filter((file) => !excluded.has(normalize(file)));
const errors = [];
const warnings = [];

for (const file of files) {
  const relative = normalize(file);
  const raw = fs.readFileSync(file, 'utf8');
  const prose = stripNonProse(raw);

  for (const rule of hardRules) {
    for (const match of allMatches(rule.pattern, prose)) {
      errors.push({
        file: relative,
        line: lineNumber(prose, match.index ?? 0),
        rule: rule.name,
        guidance: rule.guidance,
        excerpt: excerpt(prose, match.index ?? 0),
      });
    }
  }

  const contrastCount = allMatches(/ではなく/g, prose).length;
  if (contrastCount >= 3) {
    warnings.push(`${relative}: 「ではなく」が${contrastCount}回。対比が理解に必要か確認し、不要なら肯定形で直接書く。`);
  }

  const summaryCount = allMatches(/つまり/g, prose).length;
  if (summaryCount >= 3) {
    warnings.push(`${relative}: 「つまり」が${summaryCount}回。直前の内容を抽象語で言い直していないか確認する。`);
  }

  const emphasisCount = allMatches(/真価は|本領を発揮/g, prose).length;
  if (emphasisCount >= 2) {
    warnings.push(`${relative}: 強調フレーズが${emphasisCount}回。姿勢ではなく具体的な変化・働きを書けるか確認する。`);
  }

  const proseSentences = sentences(prose);
  for (let index = 0; index <= proseSentences.length - 4; index += 1) {
    const endings = proseSentences.slice(index, index + 4).map(ending);
    if (endings[0] && endings.every((value) => value === endings[0])) {
      warnings.push(`${relative}: 「${endings[0]}」系の文末が4文連続。意味を変えず自然に読めるかだけ確認する。無理に散らさない。`);
      break;
    }
  }

  const longSentence = proseSentences.find((sentence) => sentence.length > 160);
  if (longSentence) {
    warnings.push(`${relative}: 160字を超える文あり。前提・補足・判断材料を一文へ詰め込んでいないか確認する。`);
  }

  if (proseSentences.length >= 8) {
    const lengths = proseSentences.map((sentence) => sentence.replace(/\s/g, '').length).filter((length) => length >= 8 && length <= 180);
    const mean = lengths.reduce((sum, value) => sum + value, 0) / Math.max(1, lengths.length);
    const cv = coefficientOfVariation(lengths);
    if (lengths.length >= 8 && mean >= 20 && mean <= 110 && cv < 0.18) {
      warnings.push(`${relative}: 文長のばらつきが小さい（CV ${cv.toFixed(2)}）。全トピックを同じ密度で書いていないか確認する。人工的に長短を作る必要はない。`);
    }
  }

  for (const connector of ['また', 'さらに', '加えて']) {
    const count = proseSentences.filter((sentence) => sentence.startsWith(connector)).length;
    if (count >= 4) warnings.push(`${relative}: 文頭「${connector}」が${count}回。接続語がなくても順序が伝わる箇所を確認する。`);
  }
}

if (warnings.length) {
  console.warn(`Japanese style warnings (${warnings.length}):`);
  for (const warning of warnings.slice(0, 30)) console.warn(`- ${warning}`);
  if (warnings.length > 30) console.warn(`- ... ${warnings.length - 30} more warnings`);
}

if (errors.length) {
  console.error(`Japanese style gate failed (${errors.length}):`);
  for (const error of errors) {
    console.error(`- ${error.file}:${error.line} [${error.rule}] ${error.excerpt}`);
    console.error(`  rewrite: ${error.guidance} NG語だけを置換せず、該当文を丸ごと見直す。`);
  }
  process.exit(1);
}

console.log(`Japanese style: PASS — ${files.length} files checked, ${warnings.length} warning(s)`);
