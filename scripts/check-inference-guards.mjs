import { existsSync, readFileSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');
const fail = (message) => {
  console.error(`Inference guard check failed: ${message}`);
  process.exitCode = 1;
};
const requireText = (text, needle, label) => {
  if (!text.includes(needle)) fail(`${label} is missing: ${needle}`);
};

const project = read('PROJECT.md');
const agents = read('AGENTS.md');
const state = read('PROJECT_STATE.md');
const manager = read('.codex/MANAGER_CONTROL_PLANE.md');
const envelope = read('.codex/TASK_ENVELOPE_TEMPLATE.md');
const guard = read('.codex/FAIL_CLOSED_INFERENCE_GUARDS.md');
const social = read('measurement/.internal/.virtual/social/ROUTER.md');
const cases = JSON.parse(read('.codex/inference-guard-cases.json'));

const guardPath = '.codex/FAIL_CLOSED_INFERENCE_GUARDS.md';
const casePath = '.codex/inference-guard-cases.json';

for (const [label, text] of [
  ['PROJECT', project],
  ['AGENTS', agents],
  ['PROJECT_STATE', state],
  ['Manager Control Plane', manager]
]) {
  requireText(text, guardPath, `${label} guard pointer`);
}
requireText(agents, casePath, 'AGENTS regression-case pointer');
requireText(social, casePath, 'Social Router regression-case pointer');

for (const heading of [
  'NO INVERSE INFERENCE',
  'DECISION REVERSAL GATE',
  'REALITY FIRST',
  'GENERAL KNOWLEDGE = CANDIDATE ONLY',
  'PRE-OUTPUT CONTRADICTION CHECK',
  'CORRECTION PERSISTENCE'
]) requireText(guard, heading, 'guard policy');

for (const field of [
  'Directional rule / source',
  'Reversal target / new evidence',
  'Reality checked',
  'General knowledge candidate only',
  'Pre-output contradiction check'
]) requireText(envelope, field, 'Task Envelope inference field');

const requiredCases = new Map([
  ['SOCIAL-DIRECTION-001', ['InstagramをXの単純英訳にしない', '逆向き']],
  ['REALITY-X-ROUTE-001', ['src/pages/x/index.astro', '既存']],
  ['SOCIAL-DUOFON-001', ['Duofon', 'Execution Brief']]
]);

if (!Array.isArray(cases.cases)) {
  fail('cases array is missing');
} else {
  const byId = new Map(cases.cases.map((item) => [item.id, item]));
  for (const [id, needles] of requiredCases) {
    const item = byId.get(id);
    if (!item) {
      fail(`required regression case missing: ${id}`);
      continue;
    }
    if (item.status !== 'LOCKED_REGRESSION') fail(`${id} must stay LOCKED_REGRESSION`);
    const serialized = JSON.stringify(item);
    for (const needle of needles) {
      if (!serialized.includes(needle)) fail(`${id} lost required regression detail: ${needle}`);
    }
    if (!item.forbidden_inference || !item.required_action) fail(`${id} needs forbidden_inference and required_action`);
    if (item.required_repo_path && !existsSync(item.required_repo_path)) {
      fail(`${id} required repo path does not exist: ${item.required_repo_path}`);
    }
  }
}

for (const id of requiredCases.keys()) requireText(social, id, 'Social Router regression lock');

requireText(project, 'FAIL-CLOSED', 'PROJECT fail-closed gate');
requireText(agents, 'NO INVERSE INFERENCE', 'AGENTS inverse-inference gate');
requireText(manager, 'DECISION REVERSAL GATE', 'Manager reversal gate');
requireText(manager, 'PRE-OUTPUT CONTRADICTION CHECK', 'Manager pre-output gate');

if (!process.exitCode) {
  console.log('Inference guard check passed: fail-closed policy, Task Envelope fields, three locked regressions, and existing /x/ route reality are connected.');
}
