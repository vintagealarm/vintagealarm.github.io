import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export const topDocs = ['PROJECT.md', 'AGENTS.md', 'PROJECT_STATE.md'];
export const allowedH2 = {
  'PROJECT.md': ['0. 最優先', '1. 「焼いて」/ Council は絶対に独自解釈しない', '2. 分野別ルーティング', '3. SNS / Analytics / VA運用', '4. 変更履歴と日時', '5. 実行と検証', '6. 回答前の強制チェック'],
  'AGENTS.md': ['起動時の実行チェック', '基本動作', '日時付き判断履歴 — 必須', '公開変更の原子性とデプロイ監査', '作業中 / 本番 / 公開の区別', '変更と検証', 'Council / 焼いて V2', 'コンテキスト節約', '状態更新'],
  'PROJECT_STATE.md': ['1. CURRENT GOAL', '2. SOURCE OF TRUTH', '3. CURRENT BASELINE', '4. DO NOT CHANGE WITHOUT EXPLICIT INSTRUCTION', '5. CURRENT STATE SEMANTICS', '6. ACTIVE WORK / CURRENT OBSERVATION POINTERS', '7. SUPERSEDED / REJECTED BASELINES', '8. OPEN ISSUES', '9. COMPLETION CONDITIONS', '10. STARTUP ROUTING']
};

// Defense-in-depth mirrors must be named exactly. Pattern-based exemptions are forbidden.
export const allowedExactMirrors = new Set([
  '時計の深掘り調査/新資料/資料衝突/採否変更→research/readmemd+対象時計ledger+project資料',
  'projectmd'
]);

export const normalize = (value) => value
  .replace(/[`*_>#|]/g, '')
  .replace(/^\s*(?:[-+] |\d+[.)]\s*)/, '')
  .replace(/[、。・,.;:：；「」『』（）()[\]{}\s]/g, '')
  .toLowerCase();

const paragraphs = (text) => text.split(/\r?\n\s*\r?\n/).map((value) => value.trim()).filter(Boolean);
const lines = (text) => text.split(/\r?\n/).map((value) => value.trim()).filter((value) => value && !value.startsWith('#'));
const historyUnits = (text) => [...lines(text), ...paragraphs(text)].filter((raw) => normalize(raw).length >= 2);
const units = (text) => {
  const values = [...lines(text), ...paragraphs(text)];
  const unique = new Map();
  for (const raw of values) {
    const normalized = normalize(raw);
    if (normalized.length >= 8 && !unique.has(normalized)) unique.set(normalized, raw);
  }
  return unique;
};
const shingles = (value, size = 3) => {
  const normalized = normalize(value);
  if (normalized.length < size) return new Set([normalized]);
  return new Set(Array.from({ length: normalized.length - size + 1 }, (_, index) => normalized.slice(index, index + size)));
};

export function similarity(left, right) {
  const a = shingles(left);
  const b = shingles(right);
  const intersection = [...a].filter((value) => b.has(value)).length;
  return a.size + b.size ? (2 * intersection) / (a.size + b.size) : 0;
}

const locations = (documents) => {
  const map = new Map();
  for (const file of topDocs) {
    for (const [normalized, raw] of units(documents[file] || '')) {
      const entry = map.get(normalized) || { files: new Set(), raw };
      entry.files.add(file);
      map.set(normalized, entry);
    }
  }
  return map;
};

const isHistoryBlock = (raw) => {
  const fields = ['変更', '理由', '旧状態・棄却', '影響範囲', '検証状態', '関連', '日時根拠'];
  const fieldCount = fields.filter((field) => new RegExp(`${field}\\s*[：:]`).test(raw)).length;
  const dated = /\b20\d{2}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2})?\b/.test(raw);
  const state = /\b(?:ADOPTED|REJECTED|HOLD|CONFLICT|OBSOLETE|OPEN)\b/.test(raw);
  const eventSeparator = /(?:—|--|：|:)/.test(raw);
  return fieldCount >= 2 || ((dated || state) && fieldCount >= 1) || (dated && state) || (state && eventSeparator);
};

export function auditDocuments(contents, baselineContents = {}) {
  const errors = [];
  const warnings = [];
  for (const file of topDocs) {
    const text = contents[file] || '';
    const headings = text.split(/\r?\n/).filter((line) => /^## (?!#)/.test(line)).map((line) => line.slice(3).trim());
    const expected = allowedH2[file];
    const unexpected = headings.filter((heading) => !expected.includes(heading));
    const missing = expected.filter((heading) => !headings.includes(heading));
    if (unexpected.length) errors.push(`${file}: 未登録の第2階層見出し: ${unexpected.join(' / ')}`);
    if (missing.length) errors.push(`${file}: 必須の責務見出しが欠落: ${missing.join(' / ')}`);
    for (const line of text.split(/\r?\n/)) {
      if (/^#{2,6} \d{4}-\d{2}-\d{2} \d{2}:\d{2} JST\b/.test(line)) errors.push(`${file}: 日時付き履歴は専用台帳へ保存: ${line}`);
      if (/^#{3,6} .*\b(?:ADOPTED|REJECTED|HOLD|CONFLICT|OBSOLETE|OPEN)\b/.test(line)) errors.push(`${file}: 時計固有の採否イベントは research/*_LEDGER.md へ保存: ${line}`);
    }
  }

  const currentUnits = Object.fromEntries(topDocs.map((file) => [file, units(contents[file] || '')]));
  const baselineUnits = Object.fromEntries(topDocs.map((file) => [file, units(baselineContents[file] || '')]));
  for (const file of topDocs) {
    const baselineHistory = new Set(historyUnits(baselineContents[file] || '').map(normalize));
    const newRawUnits = historyUnits(contents[file] || '').filter((raw) => !baselineHistory.has(normalize(raw)));
    for (const raw of newRawUnits) {
      if (isHistoryBlock(raw)) errors.push(`${file}: 本文形式の履歴・採否イベントは専用台帳へ保存: ${raw.replace(/\s+/g, ' ').slice(0, 180)}`);
    }
    const combined = newRawUnits.join('\n');
    const fields = ['変更', '理由', '旧状態・棄却', '影響範囲', '検証状態', '関連', '日時根拠'];
    const distributedFields = fields.filter((field) => new RegExp(`${field}\\s*[：:]`).test(combined));
    if (distributedFields.length >= 2) errors.push(`${file}: 複数ブロックへ分散した判断履歴は専用台帳へ保存: ${distributedFields.join(' / ')}`);
  }

  const currentLocations = locations(contents);
  const baselineLocations = locations(baselineContents);
  for (const [normalized, entry] of currentLocations) {
    if (entry.files.size < 2 || allowedExactMirrors.has(normalized)) continue;
    const before = baselineLocations.get(normalized)?.files || new Set();
    const pairIsNew = [...entry.files].some((file) => !before.has(file));
    if (pairIsNew) errors.push(`上位文書間の新規完全重複 (${[...entry.files].join(', ')}): ${entry.raw.replace(/\s+/g, ' ').slice(0, 180)}`);
  }

  for (const file of topDocs) {
    const newUnits = [...currentUnits[file]].filter(([normalized]) => !baselineUnits[file].has(normalized));
    for (const [normalized, raw] of newUnits) {
      if (allowedExactMirrors.has(normalized)) continue;
      for (const other of topDocs) {
        if (other === file) continue;
        for (const [candidateNormalized, candidateRaw] of currentUnits[other]) {
          if (candidateNormalized === normalized || allowedExactMirrors.has(candidateNormalized)) continue;
          const score = similarity(raw, candidateRaw);
          if (score >= 0.82) warnings.push(`上位文書間の新規類似重複 (${file}, ${other}, ${(score * 100).toFixed(0)}%): ${raw.replace(/\s+/g, ' ').slice(0, 160)}`);
        }
      }
    }
  }
  return { errors: [...new Set(errors)], warnings: [...new Set(warnings)] };
}

const runGit = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const readAt = (ref, file) => {
  try { return runGit('show', `${ref}:${file}`); } catch { return ''; }
};

export function runCli() {
  const contents = Object.fromEntries(topDocs.map((file) => [file, readFileSync(file, 'utf8')]));
  const baseName = process.env.GITHUB_BASE_REF || process.argv[2] || 'main';
  let baseRef = `origin/${baseName}`;
  try { runGit('rev-parse', '--verify', baseRef); } catch { baseRef = baseName; }
  const mergeBase = runGit('merge-base', 'HEAD', baseRef);
  const baseline = Object.fromEntries(topDocs.map((file) => [file, readAt(mergeBase, file)]));
  const { errors, warnings } = auditDocuments(contents, baseline);
  if (warnings.length) console.warn(`Document responsibility warnings:\n${warnings.map((warning) => `- ${warning}`).join('\n')}`);
  if (errors.length) {
    console.error(`Document responsibility check failed.\n${errors.map((error) => `- ${error}`).join('\n')}`);
    console.error('DOCUMENT_OWNERSHIP.md の責務表に従い、履歴・研究・監査・分野別正本へ移してください。');
    process.exitCode = 1;
    return;
  }
  console.log('Document responsibility check passed: responsibilities, history placement, and duplicate candidates are valid.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) runCli();
