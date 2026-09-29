import assert from 'node:assert/strict';
import { allowedH2, auditDocuments, similarity, topDocs } from './check-document-responsibility.mjs';

const fixture = () => Object.fromEntries(topDocs.map((file) => [file, `# fixture\n\n${allowedH2[file].map((heading) => `## ${heading}\n\n${file}の正常な責務本文。`).join('\n\n')}`]));
const expectError = (name, mutate, pattern) => {
  const baseline = fixture();
  const current = structuredClone(baseline);
  mutate(current);
  assert.match(auditDocuments(current, baseline).errors.join('\n'), pattern, name);
};

const valid = fixture();
assert.deepEqual(auditDocuments(valid, valid).errors, [], '正常な責務構造を拒否しない');

expectError('未登録見出し', (docs) => { docs['PROJECT.md'] += '\n\n## 個別時計の調査日誌\n'; }, /未登録の第2階層見出し/);
expectError('日時見出し', (docs) => { docs['AGENTS.md'] += '\n\n### 2026-09-29 19:00 JST — 判断変更\n'; }, /日時付き履歴/);
expectError('本文形式の日時履歴', (docs) => { docs['PROJECT.md'] += '\n\n- 2026-09-29 19:00 変更：候補Aを棄却。理由：衝突したため。'; }, /本文形式の履歴/);
expectError('日時なし判断履歴', (docs) => { docs['PROJECT.md'] += '\n\n- 変更：候補Aを棄却。理由：外部資料と衝突。検証状態：未確認。'; }, /本文形式の履歴/);
expectError('Ledgerイベント', (docs) => { docs['AGENTS.md'] += '\n\n- 2026-09-29 — REJECTED: 変更：新資料との衝突により棄却。'; }, /採否イベント/);
expectError('短文を空行で分散した判断履歴', (docs) => { docs['PROJECT.md'] += '\n\n- 変更：A棄却。\n\n- 理由：衝突。'; }, /分散した判断履歴/);
expectError('日時なしLedger状態', (docs) => { docs['AGENTS.md'] += '\n\n- REJECTED — 新資料との衝突により候補Aを棄却。'; }, /採否イベント/);

const duplicateText = 'これは上位文書へ新しく複製された長い規範本文であり、正しい保存先へ移さなければならない。';
expectError('完全重複', (docs) => { docs['PROJECT.md'] += `\n\n${duplicateText}`; docs['AGENTS.md'] += `\n\n${duplicateText}`; }, /新規完全重複/);
expectError('矢印付き完全重複', (docs) => { const value = `- ${duplicateText} → 台帳`; docs['PROJECT.md'] += `\n\n${value}`; docs['AGENTS.md'] += `\n\n${value}`; }, /新規完全重複/);
expectError('異なるリスト内の完全重複項目', (docs) => { const value = `- ${duplicateText}`; docs['PROJECT.md'] += `\n${value}\n- PROJECT固有項目`; docs['AGENTS.md'] += `\n${value}\n- AGENTS固有項目`; }, /新規完全重複/);
expectError('短い改行へ分割した完全重複', (docs) => { const split = duplicateText.match(/.{1,7}/g).join('\n'); docs['PROJECT.md'] += `\n\n${split}`; docs['AGENTS.md'] += `\n\n${duplicateText}`; }, /新規完全重複/);

assert.ok(similarity('上位文書へ同じ意味の規範を重複して保存してはいけない。必ず正しい台帳へ移す。', '上位文書へ同じ意味の規範を重複して保存してはいけない。必ず適切な台帳へ移す。') >= 0.82, '小さな言い換えを類似候補として検出する');
console.log('Document responsibility tests passed: 12 cases.');
