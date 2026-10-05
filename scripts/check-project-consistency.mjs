import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

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

const project = read('PROJECT.md');
const agents = read('AGENTS.md');
const state = read('PROJECT_STATE.md');
const llms = read('public/llms.txt');
const aio = read('measurement/aio-observation-log.md');
const ring = read('src/data/how-they-ring-localizations.ts');
const managerControlPlane = read('.codex/MANAGER_CONTROL_PLANE.md');
const taskEnvelope = read('.codex/TASK_ENVELOPE_TEMPLATE.md');
const codexConfig = read('.codex/config.toml');

const managerControlPlanePath = '.codex/MANAGER_CONTROL_PLANE.md';
const taskEnvelopePath = '.codex/TASK_ENVELOPE_TEMPLATE.md';
requireText(agents, managerControlPlanePath, 'AGENTS manager control plane pointer');
requireText(agents, taskEnvelopePath, 'AGENTS task envelope pointer');
requireText(state, managerControlPlanePath, 'PROJECT_STATE manager control plane pointer');
requireText(state, taskEnvelopePath, 'PROJECT_STATE task envelope pointer');
requireText(codexConfig, 'multi_agent = false', 'Codex multi-agent safety');
for (const field of [
  'CURRENT STATE',
  'CANONICAL SOURCES',
  'SCOPE',
  'MUST',
  'DO NOT',
  'REJECTED / HOLD',
  'SUCCESS CRITERIA',
  'VERIFY PLAN'
]) {
  requireText(taskEnvelope, field, 'Task Envelope field');
  requireText(managerControlPlane, field, 'Manager Control Plane field');
}
for (const stateName of ['RECEIVED','SCOPED','READY','EXECUTING','VERIFYING','PASS','FAIL','REPORT']) {
  requireText(managerControlPlane, stateName, 'Manager Control Plane state');
}
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
  'PLATFORM',
  'LANGUAGE',
  'AUDIENCE',
  'CHARACTER LIMIT',
  'SOURCE COPY',
  'TRANSFORMATION',
  'DESTINATION / PROFILE',
  'OUTPUT VALIDATOR'
]) {
  requireText(managerControlPlane, field, 'Manager Control Plane platform-output field');
}
for (const field of [
  'Platform:',
  'Language:',
  'Audience:',
  'Character limit:',
  'Source copy:',
  'Transformation:',
  'Destination / profile:',
  'Output validator:',
  'Actual candidate validation:'
]) {
  requireText(taskEnvelope, field, 'Task Envelope platform-output field');
}
requireText(managerControlPlane, 'Builderの自己申告を証拠にしない', 'Manager Control Plane verifier independence');
requireText(managerControlPlane, 'single-agent', 'Manager Control Plane default execution mode');

requireSingleOccurrence(project, '### FAIL-CLOSED推論ゲート', 'PROJECT fail-closed heading');
requireSingleOccurrence(agents, '### Fail-Closed Inference Guard', 'AGENTS fail-closed heading');
requireSingleOccurrence(managerControlPlane, '## 1.5 Fail-Closed Inference Gate', 'Manager Control Plane fail-closed heading');
requireSingleOccurrence(
  state,
  '- Fail-Closed Inference Guard: `.codex/FAIL_CLOSED_INFERENCE_GUARDS.md` + `.codex/inference-guard-cases.json`。',
  'PROJECT_STATE fail-closed baseline'
);
requireSingleOccurrence(project, '- directional ruleを逆向き・対偶・双方向へ変形していないか。', 'PROJECT pre-output fail-closed checklist');

const canonical = 'https://vintagealarm.github.io/';
requireText(state, `正規公開ホスト: \`${canonical}\``, 'PROJECT_STATE canonical host');
requireText(llms, `Canonical URL: ${canonical}`, 'llms canonical host');

const socialRouter = 'measurement/.internal/.virtual/social/ROUTER.md';
requireText(project, socialRouter, 'PROJECT social routing');
requireText(agents, socialRouter, 'AGENTS social routing');
requireText(state, socialRouter, 'PROJECT_STATE social routing');

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
const publishedSlugs = readdirSync(watchDir)
  .filter((name) => name.endsWith('.md'))
  .flatMap((name) => {
    const body = read(join(watchDir, name));
    if (!/^published:\s*true\s*$/m.test(body)) return [];
    const slug = body.match(/^slug:\s*['"]?([^'"\n]+)['"]?\s*$/m)?.[1]?.trim();
    if (!slug) {
      fail(`published WATCH has no parseable slug: ${name}`);
      return [];
    }
    return [slug];
  })
  .sort();

const publishedSection = llms.match(/Published watch pages:\s*([\s\S]*?)\n\nEnglish entry:/)?.[1] || '';
const llmsSlugs = [...publishedSection.matchAll(/https:\/\/vintagealarm\.github\.io\/([^/\s]+)\//g)]
  .map((match) => match[1])
  .sort();

if (publishedSlugs.length !== 6) {
  fail(`published WATCH count is ${publishedSlugs.length}, while current PROJECT_STATE baseline requires 6`);
}
if (!state.includes('公開中のWATCH routeは **') || !state.includes('の6本**')) {
  fail('PROJECT_STATE no longer states the current six published WATCH routes');
}
if (publishedSlugs.join('|') !== llmsSlugs.join('|')) {
  fail(`llms Published watch pages differ from published WATCH files: files=${publishedSlugs.join(',')} llms=${llmsSlugs.join(',')}`);
}

requireText(state, 'measurement target 5本', 'PROJECT_STATE measurement target');
requireText(aio, 'measurement target 5 WATCH', 'AIO measurement target');
if (aio.includes('公開済み5 WATCH')) {
  fail('AIO log revived the ambiguous "公開済み5 WATCH" wording');
}

if (!process.exitCode) {
  console.log(`Project consistency check passed: canonical host, routing pointers, HOW THEY RING labels, ${publishedSlugs.length} published WATCH routes, and five-watch measurement semantics are aligned.`);
}
