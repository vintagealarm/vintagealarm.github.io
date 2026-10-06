import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const fixturePath = '.codex/inference-guard-cases.json';
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const fixture = JSON.parse(read(fixturePath));

const requiredReplayIds = [
  'SOCIAL-DIRECTION-001',
  'REALITY-X-ROUTE-001',
  'SOCIAL-DUOFON-001',
  'SOCIAL-X-LANGUAGE-001',
  'STATE-ARSA-COPY-001',
  'ACTIVE-PR-001',
  'SOCIAL-CROSSCHAT-WRITE-001',
  'HOW-RING-CLASSIFICATION-001',
  'STATE-LIFECYCLE-001',
  'RESEARCH-CROSSCHAT-WRITE-001',
];

const errors = [];
const fail = (message) => errors.push(message);
const assert = (condition, message) => {
  if (!condition) fail(message);
};

const replayConfig = fixture.replay_eval || {};
const bootPaths = Array.isArray(replayConfig.boot_paths) ? replayConfig.boot_paths : [];
const cases = Array.isArray(fixture.cases) ? fixture.cases : [];
const byId = new Map();

for (const item of cases) {
  if (!item?.id) {
    fail('case without id');
    continue;
  }
  if (byId.has(item.id)) fail(`duplicate case id: ${item.id}`);
  byId.set(item.id, item);
}

assert(fixture.version >= 2, 'fixture version must be >= 2 for Replay Eval');
assert(replayConfig.version === 1, 'replay_eval.version must be 1');
assert(
  String(replayConfig.principle || '').includes('do not create a second accident database'),
  'replay_eval principle must preserve the single-fixture design',
);
assert(bootPaths.length >= 3, 'replay_eval.boot_paths must contain the mandatory VA boot path');

for (const path of bootPaths) {
  if (!existsSync(resolve(root, path))) fail(`boot path does not exist: ${path}`);
}

for (const id of requiredReplayIds) {
  const item = byId.get(id);
  if (!item) {
    fail(`required Replay Eval case missing: ${id}`);
    continue;
  }
  if (item.status !== 'LOCKED_REGRESSION') fail(`${id} must stay LOCKED_REGRESSION`);

  const replay = item.replay;
  if (!replay || typeof replay !== 'object') {
    fail(`${id} missing replay block`);
    continue;
  }

  for (const field of [
    'failure_class',
    'prompt',
    'expected_resolution',
    'forbidden_resolution',
  ]) {
    if (!String(replay[field] || '').trim()) fail(`${id} missing replay.${field}`);
  }

  if (!Array.isArray(replay.routing_path) || replay.routing_path.length === 0) {
    fail(`${id} replay.routing_path must be non-empty`);
  } else {
    if (new Set(replay.routing_path).size !== replay.routing_path.length) {
      fail(`${id} replay.routing_path contains duplicates`);
    }
    for (const path of replay.routing_path) {
      if (!existsSync(resolve(root, path))) fail(`${id} routing path does not exist: ${path}`);
    }
  }

  const incrementalRoute = replay.routing_path.filter((path) => !bootPaths.includes(path));
  if (!Number.isInteger(replay.max_expected_hops) || replay.max_expected_hops < incrementalRoute.length) {
    fail(`${id} max_expected_hops must be an integer >= incremental task-route length`);
  }
  if (!Number.isInteger(replay.max_expected_files) || replay.max_expected_files < incrementalRoute.length) {
    fail(`${id} max_expected_files must be an integer >= incremental task-file count`);
  }

  if (!Array.isArray(replay.required_sources) || replay.required_sources.length === 0) {
    fail(`${id} replay.required_sources must be non-empty`);
    continue;
  }

  const sourcePaths = replay.required_sources.map((source) => source.path);
  if (new Set(sourcePaths).size !== sourcePaths.length) {
    fail(`${id} required_sources contains duplicate paths`);
  }

  const verificationSources = Array.isArray(replay.verification_sources)
    ? replay.verification_sources
    : [];
  const allEvidenceSources = [...replay.required_sources, ...verificationSources];
  const allEvidencePaths = allEvidenceSources.map((source) => source.path);
  if (new Set(allEvidencePaths).size !== allEvidencePaths.length) {
    fail(`${id} required_sources / verification_sources contain duplicate paths`);
  }

  for (const source of allEvidenceSources) {
    if (!source?.path || !existsSync(resolve(root, source.path))) {
      fail(`${id} source path does not exist: ${source?.path || '(missing)'}`);
      continue;
    }
    const body = read(source.path);
    if (!Array.isArray(source.contains)) {
      fail(`${id} source.contains must be an array for ${source.path}`);
      continue;
    }
    let scopedBody = body;
    try {
      scopedBody = textForScopes(body, source.read_scopes || []);
    } catch (error) {
      fail(`${id} invalid read scope in ${source.path}: ${error instanceof Error ? error.message : String(error)}`);
      continue;
    }
    for (const anchor of source.contains) {
      if (!body.includes(anchor)) {
        fail(`${id} lost evidence anchor in ${source.path}: ${anchor}`);
      } else if (Array.isArray(source.read_scopes) && source.read_scopes.length > 0 && !scopedBody.includes(anchor)) {
        fail(`${id} evidence anchor fell outside read scope in ${source.path}: ${anchor}`);
      }
    }
  }
}

function unique(values) {
  return [...new Set(values)];
}

function mergeRanges(ranges) {
  const sorted = ranges
    .filter((range) => Number.isInteger(range?.start) && Number.isInteger(range?.end) && range.end >= range.start)
    .sort((a, b) => a.start - b.start);
  const merged = [];
  for (const range of sorted) {
    const last = merged.at(-1);
    if (!last || range.start > last.end) merged.push({ ...range });
    else last.end = Math.max(last.end, range.end);
  }
  return merged;
}

function lineStarts(text) {
  const starts = [0];
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === '\n') starts.push(i + 1);
  }
  return starts;
}

function resolveReadScopes(text, scopes = []) {
  if (!Array.isArray(scopes) || scopes.length === 0) {
    return [{ start: 0, end: text.length }];
  }
  const starts = lineStarts(text);
  const lines = text.split('\n');
  const ranges = [];

  for (const scope of scopes) {
    if (scope?.mode === 'line_window') {
      const lineIndex = lines.findIndex((line) => line.includes(scope.anchor));
      if (lineIndex < 0) throw new Error(`scope anchor not found: ${scope.anchor}`);
      const before = Number.isInteger(scope.before_lines) ? scope.before_lines : 0;
      const after = Number.isInteger(scope.after_lines) ? scope.after_lines : 0;
      const startLine = Math.max(0, lineIndex - before);
      const endLineExclusive = Math.min(lines.length, lineIndex + after + 1);
      const start = starts[startLine] ?? 0;
      const end = endLineExclusive >= starts.length ? text.length : starts[endLineExclusive];
      ranges.push({ start, end });
      continue;
    }
    if (scope?.mode === 'section') {
      const start = text.indexOf(scope.start);
      if (start < 0) throw new Error(`section start not found: ${scope.start}`);
      const end = scope.end_before
        ? text.indexOf(scope.end_before, start + scope.start.length)
        : text.length;
      if (end < 0) throw new Error(`section end not found: ${scope.end_before}`);
      ranges.push({ start, end });
      continue;
    }
    throw new Error(`unsupported read scope mode: ${scope?.mode || '(missing)'}`);
  }
  return mergeRanges(ranges);
}

function textForScopes(text, scopes = []) {
  return resolveReadScopes(text, scopes).map((range) => text.slice(range.start, range.end)).join('\n');
}

function scopedChars(source) {
  const body = read(source.path);
  return resolveReadScopes(body, source.read_scopes || [])
    .reduce((sum, range) => sum + (range.end - range.start), 0);
}

function charsFor(paths) {
  return unique(paths)
    .filter((path) => existsSync(resolve(root, path)))
    .reduce((sum, path) => sum + read(path).length, 0);
}

function reportRows() {
  return requiredReplayIds.flatMap((id) => {
    const item = byId.get(id);
    if (!item?.replay) return [];
    const replay = item.replay;
    const route = unique(replay.routing_path);
    const incrementalRoute = route.filter((path) => !bootPaths.includes(path));
    const verification = unique(
      (Array.isArray(replay.verification_sources) ? replay.verification_sources : [])
        .map((source) => source.path),
    ).filter((path) => !bootPaths.includes(path) && !route.includes(path));
    const fullRuntime = unique([...bootPaths, ...incrementalRoute]);
    const taskSources = replay.required_sources.filter((source) => incrementalRoute.includes(source.path));
    const verificationSourceRows = (Array.isArray(replay.verification_sources) ? replay.verification_sources : [])
      .filter((source) => verification.includes(source.path));
    return [{
      id,
      failureClass: replay.failure_class,
      incrementalTaskFiles: incrementalRoute.length,
      incrementalTaskChars: charsFor(incrementalRoute),
      incrementalScopedTaskChars: taskSources.reduce((sum, source) => sum + scopedChars(source), 0),
      verificationFiles: verification.length,
      verificationChars: charsFor(verification),
      verificationScopedChars: verificationSourceRows.reduce((sum, source) => sum + scopedChars(source), 0),
      runtimeFiles: fullRuntime.length,
      runtimeChars: charsFor(fullRuntime),
      maxHops: replay.max_expected_hops,
      maxFiles: replay.max_expected_files,
    }];
  });
}

function printReport() {
  const rows = reportRows();
  const bootChars = charsFor(bootPaths);
  console.log('# VINTAGE ALARM — Replay Eval corpus');
  console.log('');
  console.log(`Mandatory boot: ${bootPaths.length} files / ${bootChars.toLocaleString('en-US')} chars`);
  console.log('');
  console.log('| Case | Class | Task files | Full-file task chars | Section-aware task chars | Verifier files | Full verifier chars | Scoped verifier chars | Boot + full task chars |');
  console.log('|---|---|---:|---:|---:|---:|---:|---:|---:|');
  for (const row of rows) {
    console.log(
      `| ${row.id} | ${row.failureClass} | ${row.incrementalTaskFiles} | ${row.incrementalTaskChars} | ${row.incrementalScopedTaskChars} | ${row.verificationFiles} | ${row.verificationChars} | ${row.verificationScopedChars} | ${row.runtimeChars} |`,
    );
  }
  const totals = rows.reduce(
    (acc, row) => {
      acc.incrementalTaskChars += row.incrementalTaskChars;
      acc.incrementalScopedTaskChars += row.incrementalScopedTaskChars;
      acc.verificationChars += row.verificationChars;
      acc.verificationScopedChars += row.verificationScopedChars;
      acc.incrementalTaskFiles += row.incrementalTaskFiles;
      return acc;
    },
    { incrementalTaskChars: 0, incrementalScopedTaskChars: 0, verificationChars: 0, verificationScopedChars: 0, incrementalTaskFiles: 0 },
  );
  console.log('');
  console.log(
    `Cases: ${rows.length}; mean task files: ${(totals.incrementalTaskFiles / rows.length).toFixed(2)}; mean full-file task chars: ${Math.round(totals.incrementalTaskChars / rows.length).toLocaleString('en-US')}; mean section-aware task chars: ${Math.round(totals.incrementalScopedTaskChars / rows.length).toLocaleString('en-US')}; mean scoped verifier chars: ${Math.round(totals.verificationScopedChars / rows.length).toLocaleString('en-US')}.`,
  );
  console.log('Section-aware cost preserves complete source files in the repository and counts only the configured answer-time slices. Mandatory PROJECT → AGENTS → PROJECT_STATE boot remains separate.');
}

function printCase(id) {
  const item = byId.get(id);
  if (!item?.replay) {
    console.error(`unknown Replay Eval case: ${id}`);
    process.exit(1);
  }
  console.log(JSON.stringify({
    id: item.id,
    title: item.title,
    prompt: item.replay.prompt,
    expected_resolution: item.replay.expected_resolution,
    forbidden_resolution: item.replay.forbidden_resolution,
    routing_path: item.replay.routing_path,
    required_sources: item.replay.required_sources,
    verification_sources: item.replay.verification_sources || [],
    section_aware: true,
    score_fields: replayConfig.score_fields,
  }, null, 2));
}

function scoreResults(resultPath) {
  if (!resultPath) {
    console.error('score requires a JSON result path');
    process.exit(1);
  }
  const payload = JSON.parse(read(resultPath));
  const results = Array.isArray(payload) ? payload : payload.results;
  if (!Array.isArray(results) || results.length === 0) {
    console.error('Replay Eval score file must be a non-empty array or { results: [...] }');
    process.exit(1);
  }

  const seen = new Set();
  const validOutcomes = new Set(['PASS', 'FAIL', 'HOLD']);
  const scored = [];

  for (const result of results) {
    const id = result?.case_id;
    const item = byId.get(id);
    if (!item?.replay) {
      console.error(`score contains unknown case_id: ${id || '(missing)'}`);
      process.exit(1);
    }
    if (seen.has(id)) {
      console.error(`score contains duplicate case_id: ${id}`);
      process.exit(1);
    }
    seen.add(id);

    if (!validOutcomes.has(result.outcome)) {
      console.error(`${id} outcome must be PASS / FAIL / HOLD`);
      process.exit(1);
    }
    if (!Array.isArray(result.files_read)) {
      console.error(`${id} files_read must be an array`);
      process.exit(1);
    }
    for (const field of ['chars_read', 'routing_hops', 'user_reinstruction_count']) {
      if (!Number.isInteger(result[field]) || result[field] < 0) {
        console.error(`${id} ${field} must be a non-negative integer`);
        process.exit(1);
      }
    }
    if (typeof result.false_certainty !== 'boolean') {
      console.error(`${id} false_certainty must be boolean`);
      process.exit(1);
    }

    const replay = item.replay;
    const totalFileBudget = replay.max_expected_files + bootPaths.length;
    scored.push({
      ...result,
      route_budget_exceeded: result.routing_hops > replay.max_expected_hops,
      file_budget_exceeded: result.files_read.length > totalFileBudget,
      total_file_budget: totalFileBudget,
    });
  }

  const pass = scored.filter((r) => r.outcome === 'PASS').length;
  const fail = scored.filter((r) => r.outcome === 'FAIL').length;
  const hold = scored.filter((r) => r.outcome === 'HOLD').length;
  const sum = (field) => scored.reduce((total, row) => total + row[field], 0);
  const falseCertainty = scored.filter((r) => r.false_certainty).length;
  const routeBudget = scored.filter((r) => r.route_budget_exceeded).length;
  const fileBudget = scored.filter((r) => r.file_budget_exceeded).length;

  console.log('# Replay Eval score');
  console.log(`Cases scored: ${scored.length}/${requiredReplayIds.length}`);
  console.log(`PASS: ${pass}; FAIL: ${fail}; HOLD: ${hold}; pass rate: ${((pass / scored.length) * 100).toFixed(1)}%`);
  console.log(`Mean chars read: ${Math.round(sum('chars_read') / scored.length).toLocaleString('en-US')}`);
  console.log(`Mean routing hops: ${(sum('routing_hops') / scored.length).toFixed(2)}`);
  console.log(`User reinstructions: ${sum('user_reinstruction_count')}`);
  console.log(`False-certainty cases: ${falseCertainty}`);
  console.log(`Route-budget overruns: ${routeBudget}; total-file-budget overruns: ${fileBudget}`);
}

if (errors.length) {
  console.error(`Replay Eval check failed (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

const command = process.argv[2] || 'check';
if (command === 'check') {
  const rows = reportRows();
  const classes = new Set(rows.map((row) => row.failureClass));
  console.log(
    `Replay Eval check passed: ${rows.length} locked cases across ${classes.size} failure classes; all routing paths and evidence anchors resolve.`,
  );
} else if (command === 'report') {
  printReport();
} else if (command === 'case') {
  printCase(process.argv[3]);
} else if (command === 'score') {
  scoreResults(process.argv[3]);
} else {
  console.error(`unknown command: ${command}`);
  process.exit(1);
}
