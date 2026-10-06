import { existsSync, readFileSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');
const fail = (message) => {
  console.error(`Inference guard check failed: ${message}`);
  process.exitCode = 1;
};
const requireText = (text, needle, label) => {
  if (!text.includes(needle)) fail(`${label} is missing: ${needle}`);
};

export const countUserPerceivedCharacters = (text) =>
  [...new Intl.Segmenter('en', { granularity: 'grapheme' }).segment(text)].length;

export const containsJapaneseScript = (text) =>
  /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(text);

export function validateXCurrentCandidate(text, { repost = false } = {}) {
  const errors = [];
  const normalized = String(text ?? '').replace(/\r\n/g, '\n').trim();

  if (!normalized) errors.push('actual X post candidate is empty');
  if (containsJapaneseScript(normalized)) {
    errors.push('actual X post candidate contains Han/Hiragana/Katakana under English-only CURRENT');
  }

  const length = countUserPerceivedCharacters(normalized);
  if (length > 140) errors.push(`actual X post candidate is ${length} characters; VA CURRENT cap is 140`);

  if (repost) {
    const sections = normalized.split('\n').map((line) => line.trim()).filter(Boolean);
    if (sections.length !== 3) {
      errors.push('X Instagram-repost mode requires exactly three non-empty sections');
    } else {
      const [watchName, description, hashtags] = sections;
      if (!watchName || watchName.startsWith('#')) {
        errors.push('section 1 must be WATCH NAME');
      }
      if (!/[A-Za-z]/.test(description) || description.startsWith('#')) {
        errors.push('section 2 must be a short English description');
      }
      const hashtagTokens = hashtags.split(/\s+/).filter(Boolean);
      if (
        hashtagTokens.length === 0 ||
        hashtagTokens.some((token) => !/^#[A-Za-z0-9_]+$/.test(token))
      ) {
        errors.push('section 3 must contain English hashtags only');
      }
    }
  }

  return { valid: errors.length === 0, errors, length };
}

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
requireText(guard, casePath, 'Fail-Closed Guard regression-case pointer');
requireText(social, casePath, 'Social Router regression-case pointer');

for (const heading of [
  'NO INVERSE INFERENCE',
  'DECISION REVERSAL GATE',
  'REALITY FIRST',
  'GENERAL KNOWLEDGE = CANDIDATE ONLY',
  'PRE-OUTPUT CONTRADICTION CHECK',
  'DOMAIN CONTRACT GATE',
  'CORRECTION PERSISTENCE'
]) requireText(guard, heading, 'guard policy');

for (const field of [
  'Directional rule / source',
  'Reversal target / new evidence',
  'Reality checked',
  'General knowledge candidate only',
  'Pre-output contradiction check'
]) requireText(envelope, field, 'Task Envelope inference field');

for (const field of [
  'DOMAIN CONTRACT',
  'Contract source:',
  'Required fields resolved:',
  'Canonical write contract:',
  'Output / update validator:',
  'Actual candidate / update validation:'
]) requireText(envelope, field, 'Task Envelope domain-contract field');

requireText(manager, 'Domain contract resolution', 'Manager domain-contract routing');
requireText(manager, guardPath, 'Manager fail-closed pointer');

for (const [label, text] of [
  ['Manager Control Plane', manager],
  ['Task Envelope', envelope],
  ['Fail-Closed Guard', guard]
]) {
  if (text.includes('X CURRENT OUTPUT CONTRACT')) {
    fail(`${label} must not duplicate the Social Router X CURRENT contract`);
  }
}

for (const needle of [
  'X CURRENT OUTPUT CONTRACT',
  'English only',
  'overseas-facing',
  '140 user-perceived characters',
  'Published Copy → English compression/adaptation → 140-character validation → output',
  'WATCH NAME',
  'short English description',
  'English hashtags'
]) requireText(social, needle, 'Social Router X current contract');

const requiredCases = new Map([
  ['SOCIAL-DIRECTION-001', ['InstagramをXの単純英訳にしない', '逆向き']],
  ['REALITY-X-ROUTE-001', ['src/pages/x/index.astro', '既存']],
  ['SOCIAL-DUOFON-001', ['Duofon', 'Execution Brief']],
  ['SOCIAL-X-LANGUAGE-001', ['overseas-facing', '140', 'English compression/adaptation']]
]);

let byId = new Map();
if (!Array.isArray(cases.cases)) {
  fail('cases array is missing');
} else {
  byId = new Map(cases.cases.map((item) => [item.id, item]));
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

const xCase = byId.get('SOCIAL-X-LANGUAGE-001');
if (xCase) {
  const passing = validateXCurrentCandidate(xCase.passing_example, { repost: true });
  if (!passing.valid) fail(`SOCIAL-X-LANGUAGE-001 passing example failed: ${passing.errors.join('; ')}`);

  if (!Array.isArray(xCase.failing_examples) || xCase.failing_examples.length < 3) {
    fail('SOCIAL-X-LANGUAGE-001 needs Japanese-body, Japanese-hashtag, and over-limit failing examples');
  } else {
    for (const example of xCase.failing_examples) {
      const result = validateXCurrentCandidate(example.text, { repost: true });
      if (result.valid) fail(`SOCIAL-X-LANGUAGE-001 failing example passed: ${example.reason}`);
    }
  }
}

requireText(project, 'FAIL-CLOSED', 'PROJECT fail-closed discovery pointer');
requireText(agents, guardPath, 'AGENTS inference-guard discovery pointer');
requireText(manager, guardPath, 'Manager inference-guard discovery pointer');
requireText(guard, 'DECISION REVERSAL GATE', 'Guard reversal gate');
requireText(guard, 'PRE-OUTPUT CONTRADICTION CHECK', 'Guard pre-output gate');

const xCopyIndex = process.argv.indexOf('--x-copy');
const xCopyFileIndex = process.argv.indexOf('--x-copy-file');
if (xCopyIndex !== -1 || xCopyFileIndex !== -1) {
  let candidate = '';
  if (xCopyFileIndex !== -1) {
    const path = process.argv[xCopyFileIndex + 1];
    if (!path) fail('--x-copy-file requires a path');
    else candidate = read(path);
  } else {
    candidate = process.argv[xCopyIndex + 1] ?? '';
  }

  const result = validateXCurrentCandidate(candidate, {
    repost: process.argv.includes('--x-repost')
  });
  if (!result.valid) {
    for (const error of result.errors) fail(`X pre-output gate: ${error}`);
  } else {
    console.log(`X pre-output gate passed: English-only candidate, ${result.length}/140 user-perceived characters.`);
  }
}

if (!process.exitCode) {
  console.log('Inference guard check passed: canonical fail-closed policy, domain-contract routing, four locked regressions, X copy self-tests, and existing /x/ route reality are connected.');
}
