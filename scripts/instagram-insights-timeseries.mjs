import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const canonicalRelative = 'measurement/.internal/.virtual/social/instagram-insights-timeseries.md';
const canonicalPath = path.join(root, canonicalRelative);
const socialRoot = path.join(root, 'measurement/.internal/.virtual/social');

const watchOrder = [
  'Wittnauer 10WA',
  'CYMA Time-O-Vox 18K Chronomètre',
  'Pierce Duofon',
  'Basis Alarm (BFG90)',
  'Westclox Watchlarm W5',
  'Citizen Alarm',
];

const countFields = new Set([
  'views',
  'viewers',
  'follows',
  'likes',
  'comments',
  'reposts',
  'shares',
  'saves',
  'profile_accesses',
  'bio_link_clicks',
]);

const percentageFields = new Set([
  'skip_rate',
  'share_rate',
  'like_rate',
  'save_rate',
  'repost_rate',
  'comment_rate',
  'followers',
  'non_followers',
  'age_18_34_combined',
  'country_india',
  'country_us',
]);

const appendFieldOrder = [
  'observed_at_jst',
  'content_id',
  'content_type',
  'published_at_jst',
  'elapsed_since_publish',
  'age_of_post_display',
  'reel_duration',
  'views',
  'viewers',
  'average_watch_time',
  'follows',
  'likes',
  'comments',
  'reposts',
  'shares',
  'share_count',
  'saves',
  'skip_rate',
  'share_rate',
  'like_rate',
  'save_rate',
  'repost_rate',
  'comment_rate',
  'profile_accesses',
  'bio_link_clicks',
  'followers',
  'non_followers',
  'age',
  'age_18_34_combined',
  'countries',
  'gender',
  'source_status',
  'note',
];

function parseObserved(value) {
  const match = String(value || '').match(/(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})/);
  if (!match) return null;
  const [, year, month, day, hour, minute] = match.map(Number);
  return new Date(Date.UTC(year, month - 1, day, hour - 9, minute));
}

function parseNumber(value) {
  if (value === undefined || value === null) return null;
  const normalized = String(value).replaceAll(',', '').trim();
  const match = normalized.match(/^-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function finishSnapshot(state) {
  if (!state.currentSnapshot) return;
  state.watches.get(state.currentWatch).push(state.currentSnapshot);
  state.currentSnapshot = null;
}

function parseCanonical(text) {
  const watches = new Map(watchOrder.map((watch) => [watch, []]));
  const state = { watches, currentWatch: null, currentSnapshot: null };
  const duplicateFields = [];
  const lines = text.split('\n');

  lines.forEach((line, index) => {
    if (line === '---') {
      finishSnapshot(state);
      state.currentWatch = null;
      return;
    }

    const watchMatch = line.match(/^# (.+)$/);
    if (watchMatch) {
      finishSnapshot(state);
      state.currentWatch = watches.has(watchMatch[1]) ? watchMatch[1] : null;
      return;
    }

    if (/^## /.test(line) && state.currentWatch) {
      finishSnapshot(state);
      return;
    }

    const snapshotMatch = line.match(/^### Snapshot — (.+)$/);
    if (snapshotMatch && state.currentWatch) {
      finishSnapshot(state);
      state.currentSnapshot = {
        watch: state.currentWatch,
        heading: snapshotMatch[1],
        line: index + 1,
        fields: {},
      };
      return;
    }

    if (!state.currentSnapshot) return;
    const fieldMatch = line.match(/^- ([a-z0-9_]+):\s*(.*)$/);
    if (!fieldMatch) return;
    const [, key, value] = fieldMatch;
    if (Object.hasOwn(state.currentSnapshot.fields, key)) {
      duplicateFields.push(`${state.currentWatch} line ${index + 1}: duplicate field ${key}`);
    }
    state.currentSnapshot.fields[key] = value;
  });

  finishSnapshot(state);
  return { watches, duplicateFields };
}

function markdownFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...markdownFiles(target));
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(target);
  }
  return files;
}

function validate(text, { scanSidecars = true } = {}) {
  const errors = [];
  const parsed = parseCanonical(text);
  errors.push(...parsed.duplicateFields);

  if (!text.endsWith('\n')) errors.push(`${canonicalRelative}: file must end with a newline`);
  if (/PENDING_(?:CANONICAL_)?MERGE|PENDING_MERGE/.test(text)) {
    errors.push(`${canonicalRelative}: pending-merge marker remains in the canonical file`);
  }

  for (const watch of watchOrder) {
    const snapshots = parsed.watches.get(watch);
    if (!snapshots.length) {
      errors.push(`${canonicalRelative}: no snapshots found for ${watch}`);
      continue;
    }

    const seenObserved = new Set();
    let previousTime = null;
    for (const snapshot of snapshots) {
      const fields = snapshot.fields;
      if (!fields.observed_at_jst) errors.push(`${watch} line ${snapshot.line}: observed_at_jst is required`);
      if (!fields.source_status) errors.push(`${watch} line ${snapshot.line}: source_status is required`);
      if (/PENDING/.test(fields.source_status || '')) {
        errors.push(`${watch} line ${snapshot.line}: source_status still contains PENDING`);
      }

      const observed = fields.observed_at_jst;
      if (observed) {
        if (seenObserved.has(observed)) errors.push(`${watch}: duplicate observed_at_jst ${observed}`);
        seenObserved.add(observed);
      }

      const time = parseObserved(observed);
      if (!time) {
        errors.push(`${watch} line ${snapshot.line}: observed_at_jst is not parseable: ${observed || '(missing)'}`);
      } else if (previousTime && time < previousTime) {
        errors.push(`${watch} line ${snapshot.line}: snapshot order moves backwards at ${observed}`);
      } else {
        previousTime = time;
      }

      for (const field of countFields) {
        const value = fields[field];
        const explicitlyUnknown = /^(?:unknown\b|UI\b|summary\b|content-list\b)/.test(value || '') || /`--`/.test(value || '');
        if (value !== undefined && !explicitlyUnknown && parseNumber(value) === null) {
          errors.push(`${watch} line ${snapshot.line}: ${field} is not numeric/unknown: ${fields[field]}`);
        }
      }
      for (const field of percentageFields) {
        if (fields[field] !== undefined && fields[field] !== 'unknown' && !/%$/.test(fields[field])) {
          errors.push(`${watch} line ${snapshot.line}: ${field} must retain the % unit: ${fields[field]}`);
        }
      }
    }
  }

  if (scanSidecars) {
    for (const file of markdownFiles(socialRoot)) {
      if (path.resolve(file) === path.resolve(canonicalPath)) continue;
      const body = fs.readFileSync(file, 'utf8');
      const relative = path.relative(root, file).split(path.sep).join('/');
      if (/PENDING_(?:CANONICAL_)?MERGE|PENDING_MERGE|CANONICAL_LOG_SCREENSHOT_PENDING|SCREENSHOT_RECOVERED_PENDING/.test(body)) {
        errors.push(`${relative}: pending Instagram merge marker found outside the canonical time series`);
      }
      if (/^- observed_at_jst:/m.test(body) && /^- views:/m.test(body)) {
        errors.push(`${relative}: structured Reel snapshot exists outside ${canonicalRelative}`);
      }
    }
  }

  return { errors, parsed };
}

function pct(numerator, denominator) {
  if (numerator === null || denominator === null || denominator === 0) return '—';
  return `${((numerator / denominator) * 100).toFixed(2)}%`;
}

function signed(value) {
  if (value === null) return '—';
  return `${value >= 0 ? '+' : ''}${Math.round(value).toLocaleString('en-US')}`;
}

function valueOrDash(value) {
  const parsed = parseNumber(value);
  return parsed === null ? '—' : parsed.toLocaleString('en-US');
}

function latestReport(parsed) {
  const rows = [];
  const json = [];

  for (const watch of watchOrder) {
    const withViews = parsed.watches.get(watch).filter((snapshot) => parseNumber(snapshot.fields.views) !== null);
    const latest = withViews.at(-1);
    if (!latest) continue;
    const latestContentId = latest.fields.content_id || 'legacy-first-post';
    const previous = [...withViews.slice(0, -1)].reverse().find(
      (snapshot) => (snapshot.fields.content_id || 'legacy-first-post') === latestContentId,
    ) || null;

    const latestTime = parseObserved(latest.fields.observed_at_jst);
    const previousTime = previous ? parseObserved(previous.fields.observed_at_jst) : null;
    const hours = latestTime && previousTime ? (latestTime - previousTime) / 3_600_000 : null;
    const latestViews = parseNumber(latest.fields.views);
    const previousViews = previous ? parseNumber(previous.fields.views) : null;
    const latestViewers = parseNumber(latest.fields.viewers);
    const previousViewers = previous ? parseNumber(previous.fields.viewers) : null;
    const viewDelta = previousViews === null ? null : latestViews - previousViews;
    const viewerDelta = latestViewers === null || previousViewers === null ? null : latestViewers - previousViewers;
    const perHour = viewDelta === null || !hours || hours <= 0 ? null : viewDelta / hours;
    const profile = parseNumber(latest.fields.profile_accesses);
    const bio = parseNumber(latest.fields.bio_link_clicks);
    const follows = parseNumber(latest.fields.follows);
    const saves = parseNumber(latest.fields.saves);

    const record = {
      watch,
      content_id: latestContentId,
      content_type: latest.fields.content_type || null,
      observed_at_jst: latest.fields.observed_at_jst,
      previous_observed_at_jst: previous?.fields.observed_at_jst || null,
      hours_since_previous: hours,
      views: latestViews,
      view_delta: viewDelta,
      views_per_hour: perHour,
      viewers: latestViewers,
      viewer_delta: viewerDelta,
      average_watch_time: latest.fields.average_watch_time || null,
      skip_rate: latest.fields.skip_rate || null,
      follows,
      saves,
      profile_accesses: profile,
      bio_link_clicks: bio,
      view_to_profile_rate: profile === null ? null : profile / latestViews,
      profile_to_bio_rate: profile === null || bio === null || profile === 0 ? null : bio / profile,
      view_to_follow_rate: follows === null ? null : follows / latestViews,
      view_to_save_rate: saves === null ? null : saves / latestViews,
    };
    json.push(record);

    const growth = `${valueOrDash(latest.fields.views)} (${signed(viewDelta)}${perHour === null ? '' : ` / ${perHour.toFixed(1)}h⁻¹`})`;
    const pipeline = `${pct(profile, latestViews)} → ${pct(bio, profile)}`;
    const displayWatch = latestContentId === 'legacy-first-post' ? watch : `${watch} / ${latestContentId}`;
    rows.push(
      `| ${displayWatch} | ${latest.fields.observed_at_jst} | ${growth} | ${signed(viewerDelta)} | ${latest.fields.skip_rate || '—'} | ${latest.fields.average_watch_time || '—'} | ${valueOrDash(latest.fields.follows)} | ${valueOrDash(latest.fields.saves)} | ${pipeline} | ${pct(follows, latestViews)} |`,
    );
  }

  const markdown = [
    '# Instagram Insights — latest growth by watch',
    '',
    '| Watch | Latest observation | Views (Δ / hour) | Viewer Δ | Skip | Avg watch | Follows | Saves | View→Profile → Profile→Bio | View→Follow |',
    '|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|',
    ...rows,
    '',
    'Delta is calculated against the immediately previous snapshot for the same content_id within that watch. Legacy first-post snapshots without content_id are treated as one legacy-first-post series. Ratios are descriptive cumulative snapshot ratios, not unique-person conversion rates.',
  ].join('\n');

  return { markdown, json };
}

function formatAppendValue(key, value) {
  if (value === null || value === undefined) return 'unknown';
  if (typeof value === 'number' && countFields.has(key)) return value.toLocaleString('en-US');
  return String(value);
}

function appendSnapshot(jsonPath) {
  if (!jsonPath) throw new Error('append requires a JSON file path');
  const payload = JSON.parse(fs.readFileSync(path.resolve(jsonPath), 'utf8'));
  const watch = payload.watch;
  if (!watchOrder.includes(watch)) throw new Error(`unknown watch: ${watch}`);
  if (!payload.observed_at_jst) throw new Error('observed_at_jst is required');
  if (!payload.source_status) throw new Error('source_status is required');
  if (/PENDING/.test(String(payload.source_status))) throw new Error('source_status must not contain PENDING');

  const original = fs.readFileSync(canonicalPath, 'utf8');
  const current = parseCanonical(original).watches.get(watch);
  if (current.some((snapshot) => snapshot.fields.observed_at_jst === String(payload.observed_at_jst))) {
    throw new Error(`${watch} already has observed_at_jst ${payload.observed_at_jst}`);
  }

  const known = new Set(appendFieldOrder);
  const extras = Object.keys(payload)
    .filter((key) => key !== 'watch' && key !== 'heading' && !known.has(key))
    .sort();
  const keys = [...appendFieldOrder.filter((key) => Object.hasOwn(payload, key)), ...extras];
  const heading = payload.heading || `${payload.observed_at_jst} JST`;
  const block = `\n### Snapshot — ${heading}\n${keys.map((key) => `- ${key}: ${formatAppendValue(key, payload[key])}`).join('\n')}\n`;

  const sectionStart = original.indexOf(`\n# ${watch}\n`);
  if (sectionStart < 0) throw new Error(`cannot locate watch section: ${watch}`);
  const separator = original.indexOf('\n---\n', sectionStart + 1);
  if (separator < 0) throw new Error(`cannot locate end of watch section: ${watch}`);
  const updated = `${original.slice(0, separator).replace(/\n+$/, '')}\n${block}${original.slice(separator)}`;
  const result = validate(updated, { scanSidecars: false });
  if (result.errors.length) throw new Error(`append would make canonical invalid:\n${result.errors.join('\n')}`);

  const temporary = `${canonicalPath}.tmp`;
  fs.writeFileSync(temporary, updated);
  fs.renameSync(temporary, canonicalPath);
  console.log(`Appended ${watch} snapshot at ${payload.observed_at_jst} to ${canonicalRelative}`);
}

function main() {
  const command = process.argv[2] || 'check';
  if (command === 'append') {
    appendSnapshot(process.argv[3]);
    return;
  }

  const text = fs.readFileSync(canonicalPath, 'utf8');
  const result = validate(text);
  if (result.errors.length) {
    console.error(`Instagram Insights time-series check failed (${result.errors.length}):`);
    result.errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }

  if (command === 'check') {
    const count = [...result.parsed.watches.values()].reduce((sum, snapshots) => sum + snapshots.length, 0);
    console.log(`Instagram Insights time-series check passed: ${count} snapshots across ${watchOrder.length} watches; no pending sidecar snapshots.`);
    return;
  }

  if (command === 'report') {
    const report = latestReport(result.parsed);
    if (process.argv.includes('--json')) console.log(JSON.stringify(report.json, null, 2));
    else console.log(report.markdown);
    return;
  }

  throw new Error(`unknown command: ${command}`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
