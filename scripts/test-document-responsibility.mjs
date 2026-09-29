import assert from 'node:assert/strict';
import { allowedH2, auditDocuments, similarity, topDocs } from './check-document-responsibility.mjs';

const valid = Object.fromEntries(topDocs.map((file) => [file, `# fixture\n\n${allowedH2[file].map((heading) => `## ${heading}\n\n正常な責務本文。`).join('\n\n')}`]));
assert.deepEqual(auditDocuments(valid).errors, [], '正常な責務構造を拒否しない');

const unknown = structuredClone(valid);
unknown['PROJECT.md'] += '\n\n## 個別時計の調査日誌\n';
assert.match(auditDocuments(unknown).errors.join('\n'), /未登録の第2階層見出し/);

const dated = structuredClone(valid);
dated['AGENTS.md'] += '\n\n### 2026-09-29 19:00 JST — 判断変更\n';
assert.match(auditDocuments(dated).errors.join('\n'), /日時付き履歴/);

assert.match(auditDocuments(valid, { 'PROJECT.md': ['- 2026-09-29 19:00 変更：候補Aを棄却した。'] }).errors.join('\n'), /本文形式の履歴/);
assert.match(auditDocuments(valid, { 'AGENTS.md': ['- 2026-09-29 — REJECTED: 新資料との衝突により棄却。'] }).errors.join('\n'), /採否イベント/);

const duplicated = structuredClone(valid);
const duplicateText = 'これは上位文書へ新しく複製された長い規範本文であり、正しい保存先へ移さなければならない。';
duplicated['PROJECT.md'] += '\n\nこれは上位文書へ新しく複製された長い規範本文であり、\n正しい保存先へ移さなければならない。\n';
duplicated['AGENTS.md'] += `\n\n${duplicateText}\n`;
assert.match(auditDocuments(duplicated, { 'PROJECT.md': ['これは上位文書へ新しく複製された長い規範本文であり、', '正しい保存先へ移さなければならない。'] }).errors.join('\n'), /新規完全重複/);

assert.ok(similarity('上位文書へ同じ意味の規範を重複して保存してはいけない。必ず正しい台帳へ移す。', '上位文書へ同じ意味の規範を重複して保存してはいけない。必ず適切な台帳へ移す。') >= 0.82);
console.log('Document responsibility tests passed: 6 cases.');
