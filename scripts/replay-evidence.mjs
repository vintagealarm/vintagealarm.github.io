// Shared section selection for reporting, prompt packs and measured read traces.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
export const digest = (text) => createHash('sha256').update(text).digest('hex');
export function selectEvidence(source, read = (p) => readFileSync(p, 'utf8')) {
  const text = read(source.path);
  const lines = text.split('\n');
  const anchors = source.sections || source.contains || [];
  const ranges = [];
  if (!anchors.length) ranges.push({ start: 0, end: lines.length });
  for (const anchor of anchors) {
    const i = lines.findIndex((line) => line.includes(anchor));
    if (i < 0) throw Error(`Missing evidence anchor: ${source.path}: ${anchor}`);
    const heading = lines[i].match(/^(#{1,6})\s+/);
    let end = Math.min(lines.length, i + 4);
    let start = Math.max(0, i - 3);
    if (heading) {
      start = i; end = lines.length;
      for (let j = i + 1; j < lines.length; j++) {
        const next = lines[j].match(/^(#{1,6})\s+/);
        if (next && next[1].length <= heading[1].length) { end = j; break; }
      }
    }
    ranges.push({ start, end });
  }
  const merged = [];
  for (const range of ranges.sort((a,b) => a.start - b.start)) {
    const last = merged.at(-1);
    if (last && range.start <= last.end) last.end = Math.max(last.end, range.end);
    else merged.push({ ...range });
  }
  return merged.map(({ start, end }) => {
    const excerpt = lines.slice(start, end).join('\n');
    return { path: source.path, start_line: start + 1, end_line: end, sha256: digest(excerpt), text: excerpt };
  });
}
export function caseEvidence(fixture, item) {
  const boot = fixture.replay_eval.boot_paths;
  const sources = new Map(boot.map((path) => [path, {path, contains: []}]));
  for (const source of item.replay.required_sources) if (!boot.includes(source.path)) sources.set(source.path, source);
  for (const path of item.replay.routing_path) if (!sources.has(path)) sources.set(path, {path, contains: []});
  return [...sources.values()].flatMap((source) => selectEvidence(source));
}
