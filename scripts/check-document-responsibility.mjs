import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export const topDocs = ['PROJECT.md', 'AGENTS.md', 'PROJECT_STATE.md'];
export const allowedH2 = {
  'PROJECT.md': ['0. 最優先', '1. 「焼いて」/ Council は絶対に独自解釈しない', '2. 分野別ルーティング', '3. SNS / Analytics / VA運用', '4. 変更履歴と日時', '5. 実行と検証', '6. 回答前の強制チェック'],
  'AGENTS.md': ['起動時の実行チェック', '基本動作', '日時付き判断履歴 — 必須', '公開変更の原子性とデプロイ監査', '作業中 / 本番 / 公開の区別', '変更と検証', 'Council / 焼いて V2', 'コンテキスト節約', '状態更新'],
  'PROJECT_STATE.md': ['1. CURRENT GOAL', '2. SOURCE OF TRUTH', '3. CURRENT BASELINE', '4. DO NOT CHANGE WITHOUT EXPLICIT INSTRUCTION', '5. CURRENT STATE SEMANTICS', '6. ACTIVE WORK / CURRENT OBSERVATION POINTERS', '7. SUPERSEDED / REJECTED BASELINES', '8. OPEN ISSUES', '9. COMPLETION CONDITIONS', '10. STARTUP ROUTING']
};

export const normalize = (value) => value
  .replace(/[`*_>#|]/g, '')
  .replace(/^\s*(?:[-+] |\d+[.)]\s*)/, '')
  .replace(/[、。・,.;:：；「」『』（）()[\]{}\s]/g, '')
  .toLowerCase();

const intentionalMirror = (value) => /^(?:\s*[-*]|\s*\d+[.)]) /.test(value) && value.includes('→');
const paragraphs = (text) => text.split(/\r?\n\s*\r?\n/).map((value) => value.trim()).filter(Boolean);
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

export function auditDocuments(contents, addedByFile = {}) {
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
      if (/^#{2,6} \d{4}-\d{2}-\d{2} \d{2}:\d{2} JST\b/.test(line)) errors.push(`${file}: 日時付き履歴は CHANGE_DECISIONS.md または監査ログへ保存: ${line}`);
      if (/^#{3,6} .*\b(?:ADOPTED|REJECTED|HOLD|CONFLICT|OBSOLETE|OPEN)\b/.test(line)) errors.push(`${file}: 時計固有の採否イベントは research/*_LEDGER.md へ保存: ${line}`);
    }
    for (const line of addedByFile[file] || []) {
      const hasActualDate = /\b20\d{2}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2})?\b/.test(line);
      const hasHistoryField = /(?:変更|理由|旧状態・棄却|影響範囲|検証状態|日時根拠)\s*[：:]/.test(line);
      const hasLedgerState = /\b(?:ADOPTED|REJECTED|HOLD|CONFLICT|OBSOLETE|OPEN)\b/.test(line);
      if (hasActualDate && (hasHistoryField || hasLedgerState)) errors.push(`${file}: 本文形式の履歴・採否イベントは専用台帳へ保存: ${line.trim()}`);
    }
  }

  const changedParagraphs = [];
  for (const file of topDocs) {
    const additions = (addedByFile[file] || []).map(normalize).filter((value) => value.length >= 8);
    for (const paragraph of paragraphs(contents[file] || '')) {
      const normalized = normalize(paragraph);
      if (normalized.length < 40 || intentionalMirror(paragraph)) continue;
      if (additions.some((addition) => normalized.includes(addition))) changedParagraphs.push({ file, paragraph });
    }
  }

  const seen = new Set();
  for (const changed of changedParagraphs) {
    for (const file of topDocs) {
      if (file === changed.file) continue;
      for (const candidate of paragraphs(contents[file] || '')) {
        if (normalize(candidate).length < 40 || intentionalMirror(candidate)) continue;
        const score = similarity(changed.paragraph, candidate);
        if (score < 0.82) continue;
        const key = [changed.file, file].sort().join('|') + '|' + normalize(changed.paragraph).slice(0, 80);
        if (seen.has(key)) continue;
        seen.add(key);
        const message = `上位文書間の新規${score === 1 ? '完全' : '類似'}重複 (${changed.file}, ${file}, ${(score * 100).toFixed(0)}%): ${changed.paragraph.replace(/\s+/g, ' ').slice(0, 160)}`;
        if (score === 1) errors.push(message); else warnings.push(message);
      }
    }
  }
  return { errors, warnings };
}

const runGit = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const addedLines = (file, mergeBase) => runGit('diff', '--unified=0', `${mergeBase}...HEAD`, '--', file).split('\n').filter((line) => line.startsWith('+') && !line.startsWith('+++')).map((line) => line.slice(1));

export function runCli() {
  const contents = Object.fromEntries(topDocs.map((file) => [file, readFileSync(file, 'utf8')]));
  const baseName = process.env.GITHUB_BASE_REF || process.argv[2] || 'main';
  let baseRef = `origin/${baseName}`;
  try { runGit('rev-parse', '--verify', baseRef); } catch { baseRef = baseName; }
  const mergeBase = runGit('merge-base', 'HEAD', baseRef);
  const addedByFile = Object.fromEntries(topDocs.map((file) => [file, addedLines(file, mergeBase)]));
  const { errors, warnings } = auditDocuments(contents, addedByFile);
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
