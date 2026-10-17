import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, relative, isAbsolute } from 'node:path';
import { caseEvidence, requiredEvidence, coversRange } from './replay-evidence.mjs';
import { validateStagedTrace } from './staged-routing.mjs';

const root = process.cwd();
const fixturePath = '.codex/inference-guard-cases.json';
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const safeRepoPath = (path) => typeof path === 'string' && !isAbsolute(path) && !relative(root, resolve(root, path)).startsWith('..');
const fixture = JSON.parse(read(fixturePath));

// Membership belongs to the shared fixture, never to a second hard-coded script list.
const requiredReplayIds = (fixture.cases || [])
  .filter((item) => item.status === 'LOCKED_REGRESSION').map((item) => item.id);


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
assert((byId.get('ARSA-RELIST-IDENTITY-001')?.replay?.semantic_checks || []).length >= 3,
  'ARSA relist must retain seller-polarity, guard-link and CURRENT-state assertions');
const expectedBootPaths = ['PROJECT.md', 'AGENTS.md', 'PROJECT_STATE.md'];
assert(
  JSON.stringify(bootPaths) === JSON.stringify(expectedBootPaths),
  'replay_eval.boot_paths must exactly equal PROJECT.md → AGENTS.md → PROJECT_STATE.md in that order',
);

const lockedIds = replayConfig.locked_case_ids;
assert(Array.isArray(lockedIds) && new Set(lockedIds).size === lockedIds.length,
  'replay_eval.locked_case_ids must be a unique lock registry');
assert(JSON.stringify([...(lockedIds || [])].sort()) === JSON.stringify([...requiredReplayIds].sort()),
  'LOCKED_REGRESSION cases and locked_case_ids must match exactly (removal / status change / unregistered addition)');

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

  if (replay.cost_review && !['ranked', 'correctness_only'].includes(replay.cost_review)) {
    fail(`${id} replay.cost_review must be ranked or correctness_only`);
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

  const incrementalRoute = (replay.routing_path || []).filter((path) => !bootPaths.includes(path));
  if (!Number.isInteger(replay.max_expected_hops) || replay.max_expected_hops < incrementalRoute.length) {
    fail(`${id} max_expected_hops must be an integer >= incremental task-route length`);
  }
  if (!Number.isInteger(replay.max_expected_files) || replay.max_expected_files < incrementalRoute.length) {
    fail(`${id} max_expected_files must be an integer >= incremental task-file count`);
  }

  if (replay.max_expected_hops < incrementalRoute.length + (replay.external_required_sources || []).length ||
      replay.max_expected_hops > 30 ||
      replay.max_expected_files !== incrementalRoute.length) {
    fail(`${id} budgets must equal incremental file count; read hops must be bounded separately from unique files`);
  }
  if (!Number.isInteger(replay.max_expected_chars) || replay.max_expected_chars <= 0) {
    fail(`${id} needs a positive max_expected_chars (boot + scoped task evidence)`);
  }
  for (const check of replay.semantic_checks || []) {
    try {
      const body = read(check.path);
      const start = body.indexOf(check.section);
      assert(start >= 0 && body.indexOf(check.section, start + 1) < 0,
        `${id} semantic section must be present and unique: ${check.section}`);
      if (start < 0) continue;
      const tail = body.slice(start + check.section.length);
      const next = tail.search(/\n#{1,3} /);
      const section = check.section + (next < 0 ? tail : tail.slice(0, next));
      for (const pattern of check.require || []) {
        assert(new RegExp(pattern, 'mu').test(section), `${id} semantic assertion failed: ${check.path} / ${pattern}`);
      }
      for (const pattern of check.forbid || []) {
        assert(!new RegExp(pattern, 'imu').test(section), `${id} semantic contradiction: ${check.path} / ${pattern}`);
      }
    } catch (error) { fail(`${id} semantic check: ${error.message}`); }
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
    for (const anchor of source.contains) {
      if (!body.includes(anchor)) {
        fail(`${id} lost evidence anchor in ${source.path}: ${anchor}`);
      }
    }
  }
}

if (!errors.length) for (const item of cases.filter((c) => c.status === 'LOCKED_REGRESSION')) {
  try {
    const n = caseEvidence(fixture, item).reduce((n, e) => n + e.text.length, 0);
    assert(n <= item.replay.max_expected_chars, `${item.id} scoped prompt exceeds character budget`);
  } catch (error) { fail(`${item.id}: ${error.message}`); }
}

function unique(values) {
  return [...new Set(values)];
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
    return [{
      id,
      failureClass: replay.failure_class,
      incrementalTaskFiles: incrementalRoute.length,
      incrementalTaskChars: charsFor(incrementalRoute),
      verificationFiles: verification.length,
      verificationChars: charsFor(verification),
      runtimeFiles: fullRuntime.length,
      fullRuntimeChars: charsFor(fullRuntime),
      runtimeChars: caseEvidence(fixture, item).reduce((n, e) => n + e.text.length, 0),
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
  console.log('| Case | Class | Incremental task files | Incremental task chars | Verifier-only files | Verifier-only chars | Scoped boot + task chars | Hop budget | Task-file budget |');
  console.log('|---|---|---:|---:|---:|---:|---:|---:|---:|');
  for (const row of rows) {
    console.log(
      `| ${row.id} | ${row.failureClass} | ${row.incrementalTaskFiles} | ${row.incrementalTaskChars} | ${row.verificationFiles} | ${row.verificationChars} | ${row.runtimeChars} | ${row.maxHops} | ${row.maxFiles} |`,
    );
  }
  const totals = rows.reduce(
    (acc, row) => {
      acc.incrementalTaskChars += row.incrementalTaskChars;
      acc.verificationChars += row.verificationChars;
      acc.incrementalTaskFiles += row.incrementalTaskFiles;
      return acc;
    },
    { incrementalTaskChars: 0, verificationChars: 0, incrementalTaskFiles: 0 },
  );
  console.log('');
  console.log(
    `Cases: ${rows.length}; mean incremental task files: ${(totals.incrementalTaskFiles / rows.length).toFixed(2)}; mean incremental task chars: ${Math.round(totals.incrementalTaskChars / rows.length).toLocaleString('en-US')}; mean verifier-only chars: ${Math.round(totals.verificationChars / rows.length).toLocaleString('en-US')}.`,
  );
  console.log('Incremental task columns show full-file size, not claimed runtime reads. Scoped boot + task uses the same excerpts as the runner. Incremental task cost excludes the mandatory PROJECT → AGENTS → PROJECT_STATE boot. Verifier-only sources are checked for implementation safety but are not counted as answer-time retrieval.');
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
    score_fields: replayConfig.score_fields,
  }, null, 2));
}

function scoreResults(resultPath) {
  const payload = JSON.parse(read(resultPath));
  const results = Array.isArray(payload) ? payload : payload.results;
  const partial = process.argv.includes('--partial');
  const issues = [];
  const seen = new Set();
  const scored = [];
  if (!Array.isArray(results) || results.length === 0) throw Error('score requires non-empty results');
  for (const result of results) {
    const issuesBefore = issues.length;
    const id = result?.case_id;
    const item = byId.get(id);
    if (!requiredReplayIds.includes(id) || seen.has(id)) throw Error(`unknown / duplicate case_id: ${id}`);
    seen.add(id);
    if (!['PASS', 'FAIL', 'HOLD'].includes(result.outcome)) throw Error(`${id}: invalid outcome`);
    if (!Array.isArray(result.files_read) || result.files_read.some((v) => typeof v !== 'string') ||
        new Set(result.files_read).size !== result.files_read.length) throw Error(`${id}: invalid files_read`);
    for (const field of ['chars_read', 'routing_hops', 'user_reinstruction_count']) {
      if (!Number.isInteger(result[field]) || result[field] < 0) throw Error(`${id}: invalid ${field}`);
    }
    if (typeof result.false_certainty !== 'boolean') throw Error(`${id}: invalid false_certainty`);
    if (!result.execution?.kind || !Number.isFinite(Date.parse(result.execution?.started_at)) ||
        !Number.isFinite(Date.parse(result.execution?.finished_at))) issues.push(`${id}: missing actual execution provenance`);
    // PASS is an attributed review of an actual answer, not a model execution claim.
    if (!String(result.answer || '').trim()) issues.push(`${id}: missing actual answer`);
    if (!String(result.review?.reviewer || '').trim() ||
        !String(result.review?.rationale || '').trim() ||
        !['human', 'model', 'self'].includes(result.review?.kind)) issues.push(`${id}: missing attributed review`);
    if (!Array.isArray(result.evidence) || result.evidence.length === 0) issues.push(`${id}: missing evidence trace`);
    else {
      const evidencePaths = new Set();
      let observedChars = 0;
      for (const e of result.evidence) {
        if (!e || !safeRepoPath(e.path) || !Number.isInteger(e.start_line) ||
            !Number.isInteger(e.end_line) || e.start_line < 1 || e.end_line < e.start_line) {
          issues.push(`${id}: invalid evidence range`); continue;
        }
        try {
          const lines = read(e.path).split('\n');
          if (e.end_line > lines.length) throw Error('line out of range');
          const excerpt = lines.slice(e.start_line - 1, e.end_line).join('\n');
          if (e.sha256 !== createHash('sha256').update(excerpt).digest('hex')) throw Error('evidence digest mismatch');
          evidencePaths.add(e.path); observedChars += excerpt.length;
        } catch (error) { issues.push(`${id}: ${error.message}`); }
      }
      for (const expected of result.execution?.kind === 'staged_model_adapter' ? requiredEvidence(fixture,item) : caseEvidence(fixture, item)) {
        if (!coversRange(result.evidence.filter(e=>e && Number.isInteger(e.start_line) && Number.isInteger(e.end_line)),expected)) {
          issues.push(`${id}: incomplete required excerpt ${expected.path}:${expected.start_line}-${expected.end_line}`);
        }
      }
      const required = [...bootPaths, ...item.replay.required_sources.map((e) => e.path)];
      for (const path of new Set(required)) if (!evidencePaths.has(path)) issues.push(`${id}: unread required source ${path}`);
      for (const source of item.replay.external_required_sources || []) {
        const e = (result.external_evidence || []).find((e) => e.uri === source.uri);
        if (!e || typeof e.text !== 'string' || e.sha256 !== createHash('sha256').update(e.text).digest('hex') || !Number.isFinite(Date.parse(e.fetched_at))) {
          issues.push(`${id}: missing / invalid external evidence ${source.uri}`); continue;
        }
        observedChars += e.text.length;
        for (const anchor of source.contains) if (!e.text.includes(anchor)) issues.push(`${id}: lost external anchor ${anchor}`);
      }
      for (const path of result.files_read) if (!evidencePaths.has(path)) issues.push(`${id}: untraced read ${path}`);
      for (const path of evidencePaths) if (!result.files_read.includes(path)) issues.push(`${id}: unreported read ${path}`);
      if (observedChars !== result.chars_read) issues.push(`${id}: chars_read differs from trace`);
      for (const source of item.replay.required_sources) {
        const excerpts = result.evidence.filter((e) => e?.path === source.path && Number.isInteger(e.start_line) && Number.isInteger(e.end_line))
          .map((e) => read(e.path).split('\n').slice(e.start_line - 1, e.end_line).join('\n')).join('\n');
        for (const anchor of source.contains) if (!excerpts.includes(anchor)) issues.push(`${id}: unread evidence anchor ${anchor}`);
      }
    }
    const taskFiles = result.files_read.filter((path) => !bootPaths.includes(path));
    if (result.execution?.kind === 'staged_model_adapter') {
      for(const error of validateStagedTrace(fixture,item,result)) issues.push(`${id}: ${error}`);
      if (!Array.isArray(result.read_trace) || JSON.stringify(result.read_trace) !== JSON.stringify(result.evidence)) issues.push(`${id}: missing ordered read trace`);
      else {
        if (result.read_trace.slice(0,3).some((e,i)=>e.path!==bootPaths[i])) issues.push(`${id}: invalid boot order`);
        const reads=result.read_trace.filter(e=>!bootPaths.includes(e.path)).length;
        if (result.routing_hops!==reads) issues.push(`${id}: routing_hops differs from actual reads`);
        const seenRanges=new Set();const covered=[];
        for(const [i,e] of result.read_trace.entries()) {
          const key=`${e.path}:${e.start_line}:${e.end_line}:${e.sha256}`;
          if(seenRanges.has(key)) issues.push(`${id}: unnecessary reread in trace`);
          if(covered.some(t=>t.path===e.path && t.start_line<=e.start_line && t.end_line>=e.end_line)) issues.push(`${id}: redundant contained read in trace`);
          if(e.sequence!==i+1 || !e.reason?.trim() || !Number.isFinite(Date.parse(e.read_at))) issues.push(`${id}: invalid read event`);
          seenRanges.add(key);
          covered.push(e);
        }
      }
      for(const route of item.replay.route_ids || []) if(!result.route_ids?.includes(route)) issues.push(`${id}: missing route decision ${route}`);
    } else if (result.routing_hops !== taskFiles.length + (item.replay.external_required_sources || []).length) issues.push(`${id}: routing_hops differs from trace`);
    if (taskFiles.length > item.replay.max_expected_files || result.routing_hops > item.replay.max_expected_hops ||
        result.chars_read > item.replay.max_expected_chars) issues.push(`${id}: retrieval budget exceeded`);
    if (result.false_certainty || result.outcome !== 'PASS' || result.user_reinstruction_count > 0) issues.push(`${id}: correctness / intervention failure`);
    scored.push({...result, accepted: issues.length === issuesBefore});
  }
  const missing = requiredReplayIds.filter((id) => !seen.has(id));
  const pass = scored.filter((r) => r.outcome === 'PASS' && r.accepted).length;
  console.log(`# Replay review aggregation — NOT an AI execution or independent correctness guarantee`);
  console.log(`Coverage: ${seen.size}/${requiredReplayIds.length}; PASS: ${pass}/${requiredReplayIds.length}; FAIL: ${scored.filter((r) => r.outcome === 'FAIL').length}; HOLD: ${scored.filter((r) => r.outcome === 'HOLD').length}; NOT_RUN: ${missing.length}`);
  console.log(`Corpus pass rate: ${(pass / requiredReplayIds.length * 100).toFixed(1)}%`);
  console.log(`Missing: ${missing.join(', ') || 'none'}`);
  console.log(`Reviews: ${JSON.stringify(scored.reduce((counts, r) => { const k = r.review?.kind || 'missing'; counts[k] = (counts[k] || 0) + 1; return counts; }, {}))}`);
  for (const issue of issues) console.error(issue);
  if (issues.length || missing.length && !partial) process.exitCode = 1;
  if (partial) console.log('PARTIAL / DIAGNOSTIC ONLY — never a full-suite pass');
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
    `Replay fixture integrity passed (AI answers NOT executed): ${rows.length} locked cases across ${classes.size} failure classes; all routing paths and evidence anchors resolve.`,
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
