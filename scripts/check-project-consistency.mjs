import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { extractLlmsWatchSlugs, publicationSetErrors } from './publication-consistency.mjs';

const read = (path) => readFileSync(path, 'utf8');
const fail = (message) => {
  console.error(`Project consistency check failed: ${message}`);
  process.exitCode = 1;
};
const requireText = (text, needle, label) => {
  if (!text.includes(needle)) fail(`${label} is missing: ${needle}`);
};
const requireSingleOccurrence = (text, needle, label) => {
  const count = text.split(needle).length - 1;
  if (count !== 1) fail(`${label} must appear exactly once; found ${count}: ${needle}`);
};
const forbidText = (text, needle, label) => {
  if (text.includes(needle)) fail(`${label} must not duplicate canonical content: ${needle}`);
};

const project = read('PROJECT.md');
const agents = read('AGENTS.md');
const state = read('PROJECT_STATE.md');
const llms = read('public/llms.txt');
const aio = read('measurement/aio-observation-log.md');
const metrics = read('measurement/metrics.md');
const experimentLog = read('measurement/experiment-log.md');
const ring = read('src/data/how-they-ring-localizations.ts');
const managerControlPlane = read('.codex/MANAGER_CONTROL_PLANE.md');
const taskEnvelope = read('.codex/TASK_ENVELOPE_TEMPLATE.md');
const inferenceGuard = read('.codex/FAIL_CLOSED_INFERENCE_GUARDS.md');
const social = read('measurement/.internal/.virtual/social/ROUTER.md');
const instagramTimeseriesScript = read('scripts/instagram-insights-timeseries.mjs');
const packageJson = read('package.json');
const codexConfig = read('.codex/config.toml');

const managerControlPlanePath = '.codex/MANAGER_CONTROL_PLANE.md';
const taskEnvelopePath = '.codex/TASK_ENVELOPE_TEMPLATE.md';
const inferenceGuardPath = '.codex/FAIL_CLOSED_INFERENCE_GUARDS.md';
const socialRouter = 'measurement/.internal/.virtual/social/ROUTER.md';

for (const [label, text, needle] of [
  ['AGENTS manager pointer', agents, managerControlPlanePath],
  ['AGENTS task-envelope pointer', agents, taskEnvelopePath],
  ['AGENTS inference-guard pointer', agents, inferenceGuardPath],
  ['PROJECT_STATE manager pointer', state, managerControlPlanePath],
  ['PROJECT_STATE task-envelope pointer', state, taskEnvelopePath],
  ['PROJECT_STATE inference-guard pointer', state, inferenceGuardPath],
  ['PROJECT social pointer', project, socialRouter],
  ['AGENTS social pointer', agents, socialRouter],
  ['PROJECT_STATE social pointer', state, socialRouter]
]) requireText(text, needle, label);

requireText(codexConfig, 'multi_agent = false', 'Codex multi-agent safety');
requireText(agents, '冒頭にホスト確認済みの `YYYY-MM-DD HH:mm JST` を表示する', 'AGENTS VA chat JST prefix');

requireText(agents, '分野別routeのcanonical ownerは `PROJECT.md` §2', 'AGENTS domain-routing owner pointer');
for (const path of [
  'council-worker/V3.md',
  'council-worker/README.md',
  'council-worker/src/v3.ts',
  'council-worker/src/index.ts',
  'research/COUNCIL_V3_COURT_JESTER_DESIGN.md'
]) requireText(agents, path, 'AGENTS deferred Council pointer');
forbidText(agents, '1. **2ch民で焼いて**', 'AGENTS Council menu');
forbidText(agents, 'V2共通プロトコル:', 'AGENTS Council protocol');

requireText(state, 'CouncilのCURRENT仕様本文はこのStateへ複製しない', 'PROJECT_STATE delayed Council CURRENT pointer');
requireText(state, '`PROJECT.md` §1を正とする', 'PROJECT_STATE Council launcher owner pointer');
forbidText(state, 'Councilはprotocol-driven V3。', 'PROJECT_STATE Council spec copy');
forbidText(state, 'Councilの7形式は 2chスレ', 'PROJECT_STATE Council menu copy');
forbidText(state, 'Council共通プロトコルは独立初手', 'PROJECT_STATE Council protocol copy');


for (const field of [
  'CURRENT STATE',
  'CANONICAL SOURCES',
  'SCOPE',
  'MUST',
  'DO NOT',
  'REJECTED / HOLD',
  'SUCCESS CRITERIA',
  'VERIFY PLAN'
]) requireText(taskEnvelope, field, 'Task Envelope field');

for (const stateName of ['RECEIVED','SCOPED','AUDIT_REPORTED','READY','EXECUTING','VERIFYING','PASS','FAIL','REPORT']) {
  requireText(managerControlPlane, stateName, 'Manager Control Plane state');
}

for (const field of [
  'CHAT AUDIT REPORT',
  'Required: YES / NO',
  'Reported in chat: PENDING / YES / NO',
  'Current state reported:',
  'Defect / gap reported:',
  'Cause reported:',
  'Change scope reported:',
  'Out of scope reported:',
  'Success criteria reported:',
  'User approval required: YES / NO',
  'Approval status: N/A / PENDING / APPROVED / REJECTED'
]) requireText(taskEnvelope, field, 'Task Envelope chat-audit field');

requireText(managerControlPlane, 'Pre-implementation CHAT AUDIT REPORT — mandatory', 'Manager chat-audit gate');
requireText(managerControlPlane, '実装系の書き込み操作より前', 'Manager chat-audit mutation barrier');
requireText(managerControlPlane, '監査報告は承認要求と同義ではない', 'Manager chat-audit approval semantics');

for (const metric of [
  'USER_REINSTRUCTION_COUNT',
  'CANONICAL_SOURCE_REDIRECT_COUNT',
  'VERIFY_PROMPT_COUNT',
  'POST_COMPLETION_DEFECT_COUNT',
  'NEW_REQUIREMENT_COUNT'
]) {
  requireText(taskEnvelope, metric, 'Task Envelope metric');
  requireText(managerControlPlane, metric, 'Manager Control Plane metric');
}

for (const field of [
  'DOMAIN CONTRACT',
  'Contract source:',
  'Required fields resolved:',
  'Canonical write contract:',
  'Output / update validator:',
  'Actual candidate / update validation:'
]) requireText(taskEnvelope, field, 'Task Envelope domain-contract field');

requireText(managerControlPlane, 'Domain contract resolution', 'Manager domain-contract routing');
requireText(managerControlPlane, 'domain固有値はdomain Router / canonical sourceが所有する', 'Manager canonical-owner rule');
requireText(managerControlPlane, 'Builderの自己申告を証拠にせず', 'Manager verifier independence');
requireText(managerControlPlane, 'single-agent', 'Manager default execution mode');

requireSingleOccurrence(project, '### FAIL-CLOSED推論ゲート', 'PROJECT fail-closed heading');
requireSingleOccurrence(project, '### EVIDENCE INGRESS / CANONICAL WRITE', 'PROJECT evidence-ingress heading');
requireSingleOccurrence(managerControlPlane, '## 1.5 Fail-Closed Inference Gate', 'Manager fail-closed pointer heading');
requireSingleOccurrence(taskEnvelope, '## INFERENCE GUARD', 'Task Envelope inference-guard heading');
requireSingleOccurrence(inferenceGuard, '## 5.5 DOMAIN CONTRACT GATE', 'Inference Guard domain-contract heading');

for (const [label, text] of [
  ['Manager Control Plane', managerControlPlane],
  ['Task Envelope', taskEnvelope],
  ['Fail-Closed Guard', inferenceGuard]
]) {
  forbidText(text, 'X CURRENT OUTPUT CONTRACT', label);
  forbidText(text, '140 user-perceived characters', label);
  forbidText(text, 'English only', label);
}

requireText(state, '- Fail-Closed Inference Guard: `.codex/FAIL_CLOSED_INFERENCE_GUARDS.md` + `.codex/inference-guard-cases.json`。', 'PROJECT_STATE fail-closed pointer');
requireText(project, 'normative ownerは原則1箇所、discovery pointerは複数可', 'PROJECT owner/pointer contract');
requireText(project, 'CANONICAL WRITE CONTRACT', 'PROJECT evidence-ingress discovery pointer');
requireText(social, 'CANONICAL WRITE CONTRACT', 'Social canonical write contract');
requireText(social, 'Instagram Insights の完了条件', 'Social Insights completion contract');
requireText(social, 'Screenshot → canonical time series', 'Social screenshot-to-canonical path');
requireText(social, '分析回答より先に', 'Social write-before-analysis rule');
requireText(social, 'このcontractは会話単位ではなくrepo単位', 'Social cross-chat write contract');

requireText(agents, 'Research Evidence Ingress', 'Research evidence-ingress routing');
requireText(agents, '詳細証拠・出典・逐次履歴をLedgerへ追記', 'Research Ledger write contract');
requireText(metrics, '個別スクリーンショットや時点観測の保存先ではない', 'Metrics definition-only boundary');
requireText(experimentLog, '## Canonical write contract', 'Experiment log write contract');
requireText(experimentLog, '任意のダッシュボード画面をraw snapshotとして機械的に保存しない', 'Experiment raw-snapshot boundary');
requireText(aio, '## Canonical write contract', 'AIO write contract');
requireText(aio, 'このcontractは会話単位ではなくrepo単位', 'AIO cross-chat write contract');
requireText(aio, '既存観測を上書きせず', 'AIO append-only observation rule');

for (const scriptName of ['check:instagram-insights','instagram:append','instagram:report']) {
  requireText(packageJson, `"${scriptName}"`, `package script ${scriptName}`);
}
for (const needle of [
  'observed_at_jst is required',
  'source_status is required',
  'already has observed_at_jst',
  'snapshot order moves backwards',
  'pending Instagram merge marker found outside'
]) requireText(instagramTimeseriesScript, needle, 'Instagram cross-chat ingestion guard');

const canonical = 'https://vintagealarm.github.io/';
requireText(state, `正規公開ホスト: \`${canonical}\``, 'PROJECT_STATE canonical host');
requireText(llms, `Canonical URL: ${canonical}`, 'llms canonical host');


const councilPointer = state.split('\n').find((line) => line.startsWith('- Council現行仕様:')) || '';
for (const path of [
  'council-worker/V3.md',
  'council-worker/README.md',
  'council-worker/src/v3.ts',
  'council-worker/src/index.ts'
]) {
  if (!councilPointer.includes(path)) fail(`PROJECT_STATE Council pointer is missing ${path}`);
}

const jaFigureMatch = ring.match(/ja:\s*\{[\s\S]*?figureLabel:\s*\{\s*'01':\s*'([^']+)'[\s\S]*?'03':\s*'([^']+)'/);
if (!jaFigureMatch) {
  fail('could not parse JA HOW THEY RING figure labels');
} else {
  const [, fig01, fig03] = jaFigureMatch;
  if (!state.includes(`FIG.01 GONG: OMEGA MEMOMATIC。現行表示は「${fig01}」`)) {
    fail(`PROJECT_STATE FIG.01 does not match JA implementation: ${fig01}`);
  }
  if (!state.includes(`FIG.03 CASEBACK: 「${fig03} — JUNGHANS MINIVOX」`)) {
    fail(`PROJECT_STATE FIG.03 does not match JA implementation: ${fig03}`);
  }
}

const watchDir = 'src/content/watches';
const watchStates = readdirSync(watchDir)
  .filter((name) => name.endsWith('.md'))
  .map((name) => {
    const body = read(join(watchDir, name));
    const slug = body.match(/^slug:\s*['"]?([^'"\n]+)['"]?\s*$/m)?.[1]?.trim();
    if (!slug) {
      fail(`WATCH has no parseable slug: ${name}`);
      return null;
    }
    return { slug, published: /^published:\s*true\s*$/m.test(body) };
  })
  .filter(Boolean);
const publishedSlugs = watchStates
  .filter((watch) => watch.published)
  .map((watch) => watch.slug)
  .sort();
const allWatchSlugs = new Set(watchStates.map((watch) => watch.slug));

const llmsGroups = extractLlmsWatchSlugs(llms, allWatchSlugs);
for (const mismatch of publicationSetErrors(watchStates, llmsGroups)) fail(`llms published WATCH pages differ from frontmatter: ${mismatch}`);

requireText(state, '公開中のWATCH routeの正本は `src/content/watches/*.md` の `published: true`', 'PROJECT_STATE dynamic publication owner');
requireText(state, '公開本数と対象一覧をこのStateへ固定しない', 'PROJECT_STATE dynamic publication rule');
const arsa = watchStates.find((watch) => watch.slug === 'arsa-blind-alarm');
if (!arsa) fail('ARSA Blind Alarm WATCH state is missing');
if (arsa && !arsa.published) requireText(state, 'ARSA Blind Alarmは `published: false` がユーザー意図のCURRENT', 'PROJECT_STATE ARSA unpublished CURRENT');
if (arsa?.published && state.includes('ARSA Blind Alarmは `published: false` がユーザー意図のCURRENT')) fail('PROJECT_STATE says ARSA is unpublished while frontmatter is published');

requireText(state, 'measurement target 5本', 'PROJECT_STATE measurement target');
requireText(aio, 'measurement target 5 WATCH', 'AIO measurement target');
if (aio.includes('公開済み5 WATCH')) {
  fail('AIO log revived the ambiguous "公開済み5 WATCH" wording');
}

if (!process.exitCode) {
  console.log(`Project consistency check passed: canonical ownership/pointers, cross-chat evidence ingress, canonical host, HOW THEY RING labels, ${publishedSlugs.length} published WATCH routes, and five-watch measurement semantics are aligned.`);
}
