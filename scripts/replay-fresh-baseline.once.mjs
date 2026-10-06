import { readFileSync, existsSync } from 'node:fs';
import { resolve, relative } from 'node:path';

const ROOT = process.cwd();
const API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.REPLAY_MODEL || 'gpt-5.6-terra';
const GH_MODELS_MODEL = process.env.GITHUB_MODELS_MODEL || 'openai/gpt-5';
const USE_GH_MODELS = process.env.REPLAY_GITHUB_MODELS === '1';
const REPO = process.env.GITHUB_REPOSITORY || 'vintagealarm/vintagealarm.github.io';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const FIXTURE = JSON.parse(readFileSync(resolve(ROOT, '.codex/inference-guard-cases.json'), 'utf8'));
const BOOT = ['PROJECT.md', 'AGENTS.md', 'PROJECT_STATE.md'];
const DENY = new Set([
  '.codex/inference-guard-cases.json',
  'scripts/check-replay-evals.mjs',
  'scripts/replay-fresh-baseline.once.mjs',
  '.github/workflows/replay-baseline-once.yml',
]);

const WORKER_BASE = process.env.REPLAY_WORKER_BASE || 'https://council-api.orima1995.workers.dev';
const RUNNER_MODE = USE_GH_MODELS
  ? 'github-models-with-repo-tools'
  : API_KEY
    ? 'direct-responses-with-repo-tools'
    : 'live-worker-web-proxy';

const cases = FIXTURE.cases.filter((item) => item.replay);
if (cases.length !== 9) {
  console.error(`Expected 9 replay cases, found ${cases.length}`);
  process.exit(2);
}

const tools = [
  {
    type: 'function',
    name: 'repo_read',
    description: 'Read one UTF-8 text file from the current VINTAGE ALARM repository checkout. Use canonical repo files, not memory. Evaluation answer-key files are intentionally unavailable.',
    strict: true,
    parameters: {
      type: 'object',
      properties: { path: { type: 'string' } },
      required: ['path'],
      additionalProperties: false,
    },
  },
  {
    type: 'function',
    name: 'list_open_prs',
    description: 'List the repository open pull requests, which are the first criterion for the active work queue.',
    strict: true,
    parameters: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
  },
];

function outputText(response) {
  if (typeof response?.output_text === 'string') return response.output_text.trim();
  return (response?.output || [])
    .flatMap((item) => item?.type === 'message' ? (item.content || []) : [])
    .filter((item) => item?.type === 'output_text')
    .map((item) => item.text)
    .join('\n')
    .trim();
}

function functionCalls(response) {
  return (response?.output || []).filter((item) => item?.type === 'function_call');
}

async function openai(body) {
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`OpenAI ${response.status}: ${text.slice(0, 2000)}`);
  return JSON.parse(text);
}

function normalizeRepoPath(input) {
  const raw = String(input || '').replace(/\\/g, '/').replace(/^\.\//, '');
  if (!raw || raw.startsWith('/') || raw.includes('..')) throw new Error('invalid repository path');
  const abs = resolve(ROOT, raw);
  const rel = relative(ROOT, abs).replace(/\\/g, '/');
  if (!rel || rel.startsWith('..')) throw new Error('path escapes repository root');
  if (DENY.has(rel)) throw new Error('evaluation answer-key file is unavailable');
  return { abs, rel };
}

async function listOpenPrs() {
  const headers = {
    accept: 'application/vnd.github+json',
    'user-agent': 'vintage-alarm-replay-baseline',
  };
  if (GITHUB_TOKEN) headers.authorization = `Bearer ${GITHUB_TOKEN}`;
  const res = await fetch(`https://api.github.com/repos/${REPO}/pulls?state=open&per_page=50`, { headers });
  const text = await res.text();
  if (!res.ok) throw new Error(`GitHub ${res.status}: ${text.slice(0, 1000)}`);
  return JSON.parse(text).map((pr) => ({
    number: pr.number,
    title: pr.title,
    draft: pr.draft,
    head: pr.head?.ref,
    base: pr.base?.ref,
  }));
}

async function runCase(item) {
  const state = {
    files_read: [],
    read_calls: [],
    chars_read: 0,
    tool_calls_total: 0,
    list_open_prs_calls: 0,
    tool_errors: [],
  };

  const system = [
    'You are a fresh-context VINTAGE ALARM repository agent under evaluation.',
    'You have no prior conversation, no memory, and no answer key.',
    'Your first action MUST be repo_read with path PROJECT.md. Then follow the current repository instructions and canonical routing exactly.',
    'Use repository evidence before general knowledge. Do not invent missing state.',
    'Use list_open_prs when current active work could matter.',
    'Do not mention the evaluation harness. Answer the user naturally and concisely after gathering enough evidence.',
  ].join('\n');

  let response = await openai({
    model: MODEL,
    input: [
      { role: 'system', content: system },
      { role: 'user', content: item.replay.prompt },
    ],
    tools,
    reasoning: { effort: 'high' },
    max_output_tokens: 1000,
  });

  let turns = 0;
  while (turns++ < 20) {
    const calls = functionCalls(response);
    if (!calls.length) break;

    const outputs = [];
    for (const call of calls) {
      state.tool_calls_total++;
      let output;
      try {
        const args = JSON.parse(call.arguments || '{}');
        if (call.name === 'repo_read') {
          const { abs, rel } = normalizeRepoPath(args.path);
          if (!existsSync(abs)) throw new Error(`file not found: ${rel}`);
          const body = readFileSync(abs, 'utf8');
          state.read_calls.push(rel);
          if (!state.files_read.includes(rel)) state.files_read.push(rel);
          state.chars_read += body.length;
          output = body;
        } else if (call.name === 'list_open_prs') {
          state.list_open_prs_calls++;
          output = JSON.stringify(await listOpenPrs());
        } else {
          throw new Error(`unknown tool: ${call.name}`);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        state.tool_errors.push({ tool: call.name, message });
        output = JSON.stringify({ error: message });
      }
      outputs.push({
        type: 'function_call_output',
        call_id: call.call_id,
        output,
      });
    }

    response = await openai({
      model: MODEL,
      previous_response_id: response.id,
      input: outputs,
      tools,
      reasoning: { effort: 'high' },
      max_output_tokens: 1000,
    });
  }

  const bootComplete = BOOT.every((path) => state.files_read.includes(path));
  const taskSpecificReadCalls = state.read_calls.filter((path) => !BOOT.includes(path)).length;
  const routingHops = taskSpecificReadCalls + state.list_open_prs_calls;

  return {
    case_id: item.id,
    model: MODEL,
    prompt: item.replay.prompt,
    answer: outputText(response),
    files_read: state.files_read,
    read_calls: state.read_calls,
    chars_read: state.chars_read,
    routing_hops: routingHops,
    tool_calls_total: state.tool_calls_total,
    list_open_prs_calls: state.list_open_prs_calls,
    boot_complete: bootComplete,
    tool_errors: state.tool_errors,
    response_id: response.id,
  };
}



const ghTools = [
  {
    type: 'function',
    function: {
      name: 'repo_read',
      description: 'Read one UTF-8 text file from the current VINTAGE ALARM repository checkout. Use canonical repo files, not memory. Evaluation answer-key files are intentionally unavailable.',
      parameters: {
        type: 'object',
        properties: { path: { type: 'string' } },
        required: ['path'],
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'list_open_prs',
      description: 'List the repository open pull requests, which are the first criterion for the active work queue.',
      parameters: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
    },
  },
];

async function githubModels(messages) {
  if (!GITHUB_TOKEN) throw new Error('GITHUB_TOKEN is required for GitHub Models');
  const res = await fetch('https://models.github.ai/inference/chat/completions', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${GITHUB_TOKEN}`,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      model: GH_MODELS_MODEL,
      messages,
      tools: ghTools,
      tool_choice: 'auto',
    }),
  });
  const raw = await res.text();
  if (!res.ok) throw new Error(`GitHub Models ${res.status}: ${raw.slice(0, 2000)}`);
  return JSON.parse(raw);
}

async function runCaseViaGitHubModels(item) {
  const state = {
    files_read: [],
    read_calls: [],
    chars_read: 0,
    tool_calls_total: 0,
    list_open_prs_calls: 0,
    tool_errors: [],
  };

  const system = [
    'You are a fresh-context VINTAGE ALARM repository agent under evaluation.',
    'You have no prior conversation, no memory, and no answer key.',
    'Your first action MUST be repo_read with path PROJECT.md. Then follow the current repository instructions and canonical routing exactly.',
    'Use repository evidence before general knowledge. Do not invent missing state.',
    'Use list_open_prs when current active work could matter.',
    'Do not mention the evaluation harness. Answer the user naturally and concisely after gathering enough evidence.',
  ].join('\\n');

  const messages = [
    { role: 'system', content: system },
    { role: 'user', content: item.replay.prompt },
  ];

  let finalText = '';
  for (let turn = 0; turn < 24; turn++) {
    const payload = await githubModels(messages);
    const message = payload?.choices?.[0]?.message;
    if (!message) throw new Error('GitHub Models returned no assistant message');
    messages.push(message);

    const calls = Array.isArray(message.tool_calls) ? message.tool_calls : [];
    if (!calls.length) {
      finalText = typeof message.content === 'string'
        ? message.content.trim()
        : JSON.stringify(message.content ?? '').trim();
      break;
    }

    for (const call of calls) {
      state.tool_calls_total++;
      let output;
      try {
        const args = JSON.parse(call.function?.arguments || '{}');
        if (call.function?.name === 'repo_read') {
          const { abs, rel } = normalizeRepoPath(args.path);
          if (!existsSync(abs)) throw new Error(`file not found: ${rel}`);
          const body = readFileSync(abs, 'utf8');
          state.read_calls.push(rel);
          if (!state.files_read.includes(rel)) state.files_read.push(rel);
          state.chars_read += body.length;
          output = body;
        } else if (call.function?.name === 'list_open_prs') {
          state.list_open_prs_calls++;
          output = JSON.stringify(await listOpenPrs());
        } else {
          throw new Error(`unknown tool: ${call.function?.name}`);
        }
      } catch (error) {
        const messageText = error instanceof Error ? error.message : String(error);
        state.tool_errors.push({ tool: call.function?.name, message: messageText });
        output = JSON.stringify({ error: messageText });
      }
      messages.push({
        role: 'tool',
        tool_call_id: call.id,
        content: output,
      });
    }
  }

  if (!finalText) throw new Error('GitHub Models runner reached tool-loop limit without final answer');

  const bootComplete = BOOT.every((path) => state.files_read.includes(path));
  const taskSpecificReadCalls = state.read_calls.filter((path) => !BOOT.includes(path)).length;
  const routingHops = taskSpecificReadCalls + state.list_open_prs_calls;

  return {
    case_id: item.id,
    model: `github-models:${GH_MODELS_MODEL}`,
    runner_mode: 'github-models-with-repo-tools',
    prompt: item.replay.prompt,
    answer: finalText,
    files_read: state.files_read,
    read_calls: state.read_calls,
    chars_read: state.chars_read,
    routing_hops: routingHops,
    tool_calls_total: state.tool_calls_total,
    list_open_prs_calls: state.list_open_prs_calls,
    boot_complete: bootComplete,
    retrieval_metrics_observable: true,
    tool_errors: state.tool_errors,
  };
}

async function runCaseViaWorker(item) {
  const body = [
    'Fresh-context VINTAGE ALARM regression check. Do not use prior conversation or memory.',
    'Start from the current GitHub main PROJECT.md and follow its required boot/routing before answering.',
    'Repository: https://github.com/vintagealarm/vintagealarm.github.io',
    'PROJECT: https://github.com/vintagealarm/vintagealarm.github.io/blob/main/PROJECT.md',
    'Use web search to inspect current GitHub sources. Do not use the Replay Eval fixture or answer-key files.',
    'Answer the user query itself, not this instruction. Keep the answer concise and explicit about CURRENT / WORKING / published / unknown state where relevant.',
    '',
    'USER QUERY:',
    item.replay.prompt,
  ].join('\\n');

  const res = await fetch(WORKER_BASE + '/api/council', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      title: 'Fresh-context Replay Eval ' + item.id,
      body,
      format: 'jester',
      domain: 'general',
      evidence: 'web',
      budget: 'quick',
    }),
  });
  const raw = await res.text();
  if (!res.ok) throw new Error(`Council Worker ${res.status}: ${raw.slice(0, 2000)}`);
  const payload = JSON.parse(raw);
  const answer = String(payload?.jester?.text || '').trim();
  if (!answer) throw new Error('Council Worker returned no jester.text');

  return {
    case_id: item.id,
    model: 'live-council-worker:gpt-5.6-terra',
    runner_mode: 'live-worker-web-proxy',
    prompt: item.replay.prompt,
    answer,
    files_read: [],
    read_calls: [],
    chars_read: 0,
    routing_hops: 0,
    tool_calls_total: null,
    list_open_prs_calls: null,
    boot_complete: null,
    retrieval_metrics_observable: false,
    tool_errors: [],
  };
}

const results = [];
for (const item of cases) {
  console.log(`REPLAY_START ${item.id}`);
  try {
    const result = RUNNER_MODE === 'github-models-with-repo-tools'
      ? await runCaseViaGitHubModels(item)
      : RUNNER_MODE === 'direct-responses-with-repo-tools'
        ? await runCase(item)
        : await runCaseViaWorker(item);
    results.push(result);
    console.log('REPLAY_RESULT ' + JSON.stringify(result));
  } catch (error) {
    const result = {
      case_id: item.id,
      model: MODEL,
      prompt: item.replay.prompt,
      answer: '',
      files_read: [],
      read_calls: [],
      chars_read: 0,
      routing_hops: 0,
      tool_calls_total: 0,
      list_open_prs_calls: 0,
      boot_complete: false,
      tool_errors: [{ tool: 'runner', message: error instanceof Error ? error.message : String(error) }],
      fatal: true,
    };
    results.push(result);
    console.log('REPLAY_RESULT ' + JSON.stringify(result));
  }
}

console.log('REPLAY_BASELINE_JSON ' + JSON.stringify({
  schema: 'vintage-alarm-replay-fresh-baseline-v1',
  model: RUNNER_MODE === 'github-models-with-repo-tools'
    ? `github-models:${GH_MODELS_MODEL}`
    : RUNNER_MODE === 'direct-responses-with-repo-tools'
      ? MODEL
      : 'live-council-worker:gpt-5.6-terra',
  runner_mode: RUNNER_MODE,
  generated_at: new Date().toISOString(),
  cases: results,
}));
