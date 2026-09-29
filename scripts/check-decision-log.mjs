import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const runGit = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();

const baseName = process.env.GITHUB_BASE_REF || process.argv[2] || 'main';
let baseRef = `origin/${baseName}`;
try {
  runGit('rev-parse', '--verify', baseRef);
} catch {
  baseRef = baseName;
}
const mergeBase = runGit('merge-base', 'HEAD', baseRef);
const changed = runGit('diff', '--name-only', `${mergeBase}...HEAD`)
  .split('\n')
  .map((value) => value.trim())
  .filter(Boolean);

const decisionLogPath = 'CHANGE_DECISIONS.md';
const changedSet = new Set(changed);

const explicitlyNonDecision = (file) =>
  file === decisionLogPath ||
  file === 'package-lock.json' ||
  file === 'measurement/experiment-log.md' ||
  file === 'measurement/aio-observation-log.md' ||
  /^(public\/images|public\/audio)\//.test(file) ||
  /\.(png|jpe?g|webp|gif|svg|m4a|mp3|wav|pdf)$/i.test(file);

const decisionBearing = (file) => {
  if (explicitlyNonDecision(file)) return false;
  if (['AGENTS.md', 'PROJECT_STATE.md', 'SITE_RULES.md', 'DESIGN_ENGINEERING.md', 'package.json', 'astro.config.mjs', 'tsconfig.json'].includes(file)) return true;
  if (file === 'measurement/metrics.md' || file === 'public/llms.txt' || file === 'public/robots.txt') return true;
  return /^(src|strategy|cloudflare|council-worker|scripts|\.github\/workflows)\//.test(file);
};

const relevant = changed.filter(decisionBearing);

function exemptionReason() {
  if (process.env.DECISION_LOG_EXEMPT_REASON?.trim()) return process.env.DECISION_LOG_EXEMPT_REASON.trim();
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath) return '';
  try {
    const event = JSON.parse(readFileSync(eventPath, 'utf8'));
    const body = String(event.pull_request?.body || '');
    const match = body.match(/Decision-Log:\s*not-required\s*[—–:-]\s*(.+)/i);
    return match?.[1]?.trim() || '';
  } catch {
    return '';
  }
}

const hasLogChange = changedSet.has(decisionLogPath);

const commits = runGit('rev-list', '--reverse', `${mergeBase}..HEAD`)
  .split('\n')
  .map((value) => value.trim())
  .filter(Boolean);

const decisionBearingCommits = commits.filter((sha) => {
  const files = runGit('diff-tree', '--no-commit-id', '--name-only', '-r', sha)
    .split('\n')
    .map((value) => value.trim())
    .filter(Boolean);
  if (files.includes(decisionLogPath)) return false;
  return files.some(decisionBearing);
});

if (relevant.length && !hasLogChange) {
  const reason = exemptionReason();
  if (reason.length >= 8) {
    console.log(`Decision log exemption accepted: ${reason}`);
    process.exit(0);
  }
  console.error('Decision log check failed: decision-bearing files changed without CHANGE_DECISIONS.md.');
  console.error(relevant.map((file) => `- ${file}`).join('\n'));
  console.error('If this is truly a non-decision typo/dependency/format-only change, add to the PR body:');
  console.error('Decision-Log: not-required — <specific reason>');
  process.exit(1);
}

if (!hasLogChange) {
  console.log('Decision log check: no decision-bearing changes.');
  process.exit(0);
}

const diff = runGit('diff', '--unified=0', `${mergeBase}...HEAD`, '--', decisionLogPath);
const added = diff
  .split('\n')
  .filter((line) => line.startsWith('+') && !line.startsWith('+++'))
  .map((line) => line.slice(1));

const headingPattern = /^### (\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}) JST — (.+)$/;
const newHeadings = added.filter((line) => headingPattern.test(line));

if (relevant.length && newHeadings.length === 0) {
  console.error('Decision log check failed: decision-bearing changes require at least one new timestamped decision entry.');
  process.exit(1);
}

const full = readFileSync(decisionLogPath, 'utf8');
const addedText = added.join('\n');
for (const sha of decisionBearingCommits) {
  const short = sha.slice(0, 8);
  if (!addedText.includes(short) && !addedText.includes(sha)) {
    console.error(`Decision log check failed: decision-bearing commit ${short} is not referenced by a newly added decision entry.`);
    console.error('Every decision-bearing commit must either update CHANGE_DECISIONS.md itself or be listed in the new **関連** entry.');
    process.exit(1);
  }
}

const requiredLabels = ['変更', '理由', '旧状態・棄却', '影響範囲', '検証状態', '関連', '日時根拠'];

for (const heading of newHeadings) {
  const start = full.indexOf(heading);
  if (start < 0) {
    console.error(`Decision log check failed: cannot locate new heading: ${heading}`);
    process.exit(1);
  }
  const rest = full.slice(start + heading.length);
  const next = rest.search(/\n(?:###|##) /);
  const block = next >= 0 ? full.slice(start, start + heading.length + next) : full.slice(start);

  for (const label of requiredLabels) {
    if (!block.includes(`**${label}**`)) {
      console.error(`Decision log check failed: "${heading}" is missing **${label}**.`);
      process.exit(1);
    }
  }

  const evidenceLine = block.split('\n').find((line) => line.includes('**日時根拠**')) || '';
  if (!/\bJST\b/.test(evidenceLine)) {
    console.error(`Decision log check failed: "${heading}" has no JST in **日時根拠**.`);
    process.exit(1);
  }

  const pairs = [...evidenceLine.matchAll(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)\s*(?:→|->)\s*(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}) JST/g)];
  if (/GitHub/i.test(evidenceLine) && pairs.length === 0) {
    console.error('Decision log check failed: GitHub-based **日時根拠** must include raw UTC → JST.');
    process.exit(1);
  }
  for (const [, utc, date, time] of pairs) {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(new Date(utc));
    const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    const actual = `${values.year}-${values.month}-${values.day} ${values.hour}:${values.minute}`;
    const expected = `${date} ${time}`;
    if (actual !== expected) {
      console.error(`Decision log check failed: UTC→JST mismatch in "${heading}": ${utc} converts to ${actual} JST, not ${expected} JST.`);
      process.exit(1);
    }
  }
}

console.log(`Decision log check passed: ${relevant.length} decision-bearing file(s), ${newHeadings.length} new decision entr${newHeadings.length === 1 ? 'y' : 'ies'}.`);
