import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { sectionRanges, headings } from './routing-contract.mjs';
export const digest = text => createHash('sha256').update(text).digest('hex');

export function coversRange(trace, expected) {
  let next = expected.start_line;
  for (const e of trace.filter(e => e.path === expected.path).sort((a,b) => a.start_line-b.start_line)) {
    if (e.start_line > next) break;
    if (e.end_line >= next) next = e.end_line + 1;
  }
  return next > expected.end_line;
}

export function requiredEvidence(fixture, item, read) {
  return [...fixture.replay_eval.boot_paths.map(path => ({path})),
    ...item.replay.required_sources.filter(s => !fixture.replay_eval.boot_paths.includes(s.path))]
    .flatMap(source => selectEvidence(source, read));
}

export function selectEvidence(source, read = p => readFileSync(p, 'utf8')) {
  const text = read(source.path), lines = text.split('\n');
  let ranges;
  if (source.lines) {
    const {start,end}=source.lines;
    if(!Number.isInteger(start) || !Number.isInteger(end) || start<1 || end<start || end>lines.length) throw Error('invalid source line range');
    ranges=[{start:start-1,end}];
  } else if (source.sections?.length) {
    ranges = sectionRanges(text, source.sections);
  } else if (!source.contains?.length) {
    ranges = sectionRanges(text, ['*']);
  } else if (source.contains.some(anchor => headings(text).some(h => h.text.includes(anchor)))) {
    const labels = source.contains.flatMap(anchor => {
      const matches=headings(text).filter(h=>h.text.includes(anchor));
      if(matches.length>1) throw Error(`ambiguous heading anchor in ${source.path}: ${anchor}; specify sections`);
      return matches.map(h=>h.text);
    });
    ranges=sectionRanges(text,[...new Set(labels)]);
  } else {
    // Anchor-only legacy fixtures must be unambiguous. Never silently pick the first match.
    ranges = source.contains.map(anchor => {
      const matches = lines.flatMap((line,i) => line.includes(anchor) ? [i] : []);
      if (matches.length !== 1) throw Error(`ambiguous / missing anchor in ${source.path}: ${anchor} (${matches.length}); specify sections`);
      const i = matches[0];
      if (/^#{1,6}\s/.test(lines[i])) return sectionRanges(text,[lines[i].trim()])[0];
      return {start:Math.max(0,i-3),end:Math.min(lines.length,i+4)};
    });
  }
  const merged=[];
  for (const range of ranges.sort((a,b)=>a.start-b.start)) {
    const last=merged.at(-1);
    if (last && range.start<=last.end) last.end=Math.max(last.end,range.end);
    else merged.push({...range});
  }
  const excerpts=merged.map(({start,end})=>{
    const excerpt=lines.slice(start,end).join('\n');
    return {path:source.path,start_line:start+1,end_line:end,sha256:digest(excerpt),text:excerpt};
  });
  const scoped=excerpts.map(e=>e.text).join('\n');
  for (const anchor of source.contains || []) if(!scoped.includes(anchor)) throw Error(`selected sections lost anchor in ${source.path}: ${anchor}`);
  return excerpts;
}

export function caseEvidence(fixture,item) {
  const boot=fixture.replay_eval.boot_paths;
  const sources=new Map(boot.map(path=>[path,{path,contains:[]} ]));
  for(const source of item.replay.required_sources) if(!boot.includes(source.path)) sources.set(source.path,source);
  for(const path of item.replay.routing_path) if(!sources.has(path)) sources.set(path,{path,contains:[]});
  return [...sources.values()].flatMap(source=>selectEvidence(source));
}
