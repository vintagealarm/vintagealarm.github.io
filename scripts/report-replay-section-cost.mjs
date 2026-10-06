import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const fixture = JSON.parse(readFileSync(resolve(root, '.codex/inference-guard-cases.json'), 'utf8'));
const bootPaths = fixture.replay_eval?.boot_paths || [];
const highSectionCostThreshold = 20_000;

const read = (path) => readFileSync(resolve(root, path), 'utf8');

function lineStarts(text) {
  const starts = [0];
  for (let i = 0; i < text.length; i += 1) if (text[i] === '\n') starts.push(i + 1);
  return starts;
}

function mergeRanges(ranges) {
  const sorted = ranges.sort((a, b) => a.start - b.start);
  const merged = [];
  for (const range of sorted) {
    const last = merged.at(-1);
    if (!last || range.start > last.end) merged.push({ ...range });
    else last.end = Math.max(last.end, range.end);
  }
  return merged;
}

function evidenceRanges(text, anchors) {
  if (!Array.isArray(anchors) || anchors.length === 0) return [{ start: 0, end: text.length }];

  const starts = lineStarts(text);
  const lines = text.split('\n');
  const ranges = [];

  for (const anchor of anchors) {
    const lineIndex = lines.findIndex((line) => line.includes(anchor));
    if (lineIndex < 0) throw new Error(`anchor not found: ${anchor}`);
    const trimmed = lines[lineIndex].trim();
    const heading = trimmed.match(/^(#{1,6})\s+/);

    if (heading) {
      const level = heading[1].length;
      let endLineExclusive = lines.length;
      for (let i = lineIndex + 1; i < lines.length; i += 1) {
        const next = lines[i].trim().match(/^(#{1,6})\s+/);
        if (next && next[1].length <= level) {
          endLineExclusive = i;
          break;
        }
      }
      ranges.push({
        start: starts[lineIndex] ?? 0,
        end: endLineExclusive >= starts.length ? text.length : starts[endLineExclusive],
      });
      continue;
    }

    const startLine = Math.max(0, lineIndex - 3);
    const endLineExclusive = Math.min(lines.length, lineIndex + 4);
    ranges.push({
      start: starts[startLine] ?? 0,
      end: endLineExclusive >= starts.length ? text.length : starts[endLineExclusive],
    });
  }

  return mergeRanges(ranges);
}

function scopedChars(source) {
  const body = read(source.path);
  return evidenceRanges(body, source.contains || [])
    .reduce((sum, range) => sum + (range.end - range.start), 0);
}

const rows = [];
for (const item of fixture.cases || []) {
  if (!item.replay) continue;

  const taskSources = (item.replay.required_sources || [])
    .filter((source) => !bootPaths.includes(source.path));

  const fullChars = taskSources.reduce((sum, source) => sum + read(source.path).length, 0);
  const scoped = taskSources.reduce((sum, source) => sum + scopedChars(source), 0);

  rows.push({
    id: item.id,
    review: item.replay.cost_review || 'ranked',
    task_files: taskSources.length,
    full_file_chars: fullChars,
    section_aware_chars: scoped,
    saved_chars: fullChars - scoped,
    saved_pct: fullChars ? ((fullChars - scoped) / fullChars) * 100 : 0,
  });
}

rows.sort((a, b) => b.full_file_chars - a.full_file_chars || a.id.localeCompare(b.id));

console.log('# Replay section-aware retrieval baseline');
console.log('');
console.log('| Case | Review | Task files | Full-file chars | Section-aware chars | Avoided chars | Avoided % |');
console.log('|---|---|---:|---:|---:|---:|---:|');
for (const row of rows) {
  console.log(`| ${row.id} | ${row.review} | ${row.task_files} | ${row.full_file_chars} | ${row.section_aware_chars} | ${row.saved_chars} | ${row.saved_pct.toFixed(1)}% |`);
}

const candidates = rows.filter((row) => row.review === 'ranked' && row.section_aware_chars >= highSectionCostThreshold);
console.log('');
console.log(`Improvement candidates (ranked, section-aware chars >= ${highSectionCostThreshold}): ${candidates.map((row) => row.id).join(', ') || 'none'}`);
