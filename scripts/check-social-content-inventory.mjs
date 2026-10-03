import fs from 'node:fs';

const file = 'measurement/.internal/.virtual/social/content-inventory.md';
const text = fs.readFileSync(file, 'utf8');

const requiredSections = [
  'Wittnauer 10WA',
  'CYMA Time-O-Vox 18K Chronomètre',
  'Pierce Duofon',
  'Basis Alarm (BFG90)',
  'Westclox Watchlarm W5',
  'Citizen Alarm',
];

const validIg = new Set(['USED','PARTIAL','CANDIDATE_NOT_IN_IG_TEXT','WHOLE_ONLY','HOLD']);
const validMedia = new Set(['READY_EXISTING','NEEDS_SHOOT','NEEDS_SOURCE_ASSET','OWNER_NOTE_HERO_ONLY']);
const validVerify = new Set(['READY_FROM_WATCH','RECHECK_SOURCE','OPEN_QUESTION','RIGHTS_CHECK']);
const validMicro = new Set([
  'BASELINE_USED','READY_3_8S','SHOOT_3_8S','SOURCE_5_8S',
  'CROSS_PLATFORM_RETEST','RETEST_ONLY','RESEARCH_CARD','WHOLE_ONLY','HOLD',
]);

const validContentState = new Set([
  'PLANNED','SHOT','EDITED','SCHEDULED','PUBLISHED','UNVERIFIED_PAST','DROPPED',
]);
const activeContentStates = new Set(['PLANNED','SHOT','EDITED','SCHEDULED']);
const validPlatform = new Set(['INSTAGRAM','YOUTUBE','X']);
const validFormat = new Set(['REEL','STATIC_CAROUSEL','SHORT','VIDEO']);

const errors = [];
if (!text.endsWith('\n')) errors.push(`${file}: file must end with newline`);
if (!text.includes("OWNER'S NOTE は分割しない")) errors.push(`${file}: OWNER'S NOTE no-split rule missing`);
if (!text.includes('ASSET ID → CONTENT ID → MEDIA KEY')) errors.push(`${file}: asset/content/media separation rule missing`);
if (!text.includes('Content Assignment Registry')) errors.push(`${file}: content assignment registry missing`);
for (const section of requiredSections) {
  if (!text.includes(`## ${section}`)) errors.push(`${file}: missing watch section ${section}`);
}

const rows = [];
for (const line of text.split('\n')) {
  if (!/^\| (?:WIT|CYM|PIE|BAS|WES|CIT|GLB)-/.test(line)) continue;
  const cells = line.split('|').slice(1,-1).map((x)=>x.trim());
  if (cells.length !== 11) {
    errors.push(`${file}: inventory row must have 11 cells: ${line}`);
    continue;
  }
  const [id, angle, ig, other, media, verify, role, overlap, micro, treatment, source] = cells;
  rows.push({id,angle,ig,other,media,verify,role,overlap,micro,treatment,source,line});
}

const byId = new Map();
for (const row of rows) {
  if (byId.has(row.id)) errors.push(`${file}: duplicate ID ${row.id}`);
  byId.set(row.id,row);
  if (!validIg.has(row.ig)) errors.push(`${file}: invalid IG state ${row.ig} at ${row.id}`);
  if (!validMedia.has(row.media)) errors.push(`${file}: invalid Media ${row.media} at ${row.id}`);
  if (!validVerify.has(row.verify)) errors.push(`${file}: invalid Verify ${row.verify} at ${row.id}`);
  if (!validMicro.has(row.micro)) errors.push(`${file}: invalid Micro fit ${row.micro} at ${row.id}`);
  if (!row.angle || !row.other || !row.role || !row.overlap || !row.treatment || !row.source) {
    errors.push(`${file}: empty required cell at ${row.id}`);
  }
  if (/^UNUSED$/i.test(row.other) || /^UNUSED$/i.test(row.ig)) {
    errors.push(`${file}: bare UNUSED is forbidden at ${row.id}`);
  }
}

for (const row of rows) {
  if (row.overlap === '—') continue;
  for (const ref of row.overlap.split(',').map((x)=>x.trim()).filter(Boolean)) {
    if (ref === row.id) errors.push(`${file}: self overlap at ${row.id}`);
    if (!byId.has(ref)) errors.push(`${file}: unknown overlap ref ${ref} at ${row.id}`);
  }
}

const prefixes = {
  'Wittnauer 10WA':'WIT-',
  'CYMA Time-O-Vox 18K Chronomètre':'CYM-',
  'Pierce Duofon':'PIE-',
  'Basis Alarm (BFG90)':'BAS-',
  'Westclox Watchlarm W5':'WES-',
  'Citizen Alarm':'CIT-',
};
for (const [watch,prefix] of Object.entries(prefixes)) {
  const watchRows = rows.filter((r)=>r.id.startsWith(prefix));
  if (!watchRows.length) errors.push(`${file}: no rows for ${watch}`);
  if (!watchRows.some((r)=>r.ig === 'USED')) errors.push(`${file}: ${watch} must retain at least one USED baseline`);
  if (!watchRows.some((r)=>r.ig === 'CANDIDATE_NOT_IN_IG_TEXT')) errors.push(`${file}: ${watch} has no candidate row`);
  const owner = watchRows.filter((r)=>r.id.endsWith('-ON'));
  if (owner.length !== 1) {
    errors.push(`${file}: ${watch} must have exactly one -ON row`);
  } else if (!(owner[0].ig === 'WHOLE_ONLY' && owner[0].media === 'OWNER_NOTE_HERO_ONLY' && owner[0].role === 'OWNER_NOTE_WHOLE' && owner[0].micro === 'WHOLE_ONLY')) {
    errors.push(`${file}: ${watch} OWNER'S NOTE row must be WHOLE_ONLY / OWNER_NOTE_HERO_ONLY / OWNER_NOTE_WHOLE / WHOLE_ONLY`);
  }
}
if (!rows.some((r)=>r.role === 'URL_FUNNEL')) errors.push(`${file}: URL_FUNNEL row missing`);

const contentRows = [];
for (const line of text.split('\n')) {
  if (!/^\| (?:IG|YT|X|MR)-/.test(line)) continue;
  const cells = line.split('|').slice(1,-1).map((x)=>x.trim());
  if (cells.length !== 9) {
    errors.push(`${file}: content assignment row must have 9 cells: ${line}`);
    continue;
  }
  const [contentId, platform, state, format, primary, secondary, mediaKeys, reuseReason, evidence] = cells;
  contentRows.push({contentId,platform,state,format,primary,secondary,mediaKeys,reuseReason,evidence,line});
}

const contentIds = new Set();
for (const row of contentRows) {
  if (contentIds.has(row.contentId)) errors.push(`${file}: duplicate content ID ${row.contentId}`);
  contentIds.add(row.contentId);
  if (!validPlatform.has(row.platform)) errors.push(`${file}: invalid platform ${row.platform} at ${row.contentId}`);
  if (!validContentState.has(row.state)) errors.push(`${file}: invalid content state ${row.state} at ${row.contentId}`);
  if (!validFormat.has(row.format)) errors.push(`${file}: invalid content format ${row.format} at ${row.contentId}`);
  if (!byId.has(row.primary)) errors.push(`${file}: unknown primary asset ${row.primary} at ${row.contentId}`);
  if (!row.mediaKeys || row.mediaKeys === '—') errors.push(`${file}: media key required at ${row.contentId}`);
  if (!row.evidence || row.evidence === '—') errors.push(`${file}: evidence required at ${row.contentId}`);

  const secondary = row.secondary === '—' ? [] : row.secondary.split(',').map((x)=>x.trim()).filter(Boolean);
  const seenSecondary = new Set();
  for (const asset of secondary) {
    if (asset === row.primary) errors.push(`${file}: primary repeated as secondary at ${row.contentId}`);
    if (seenSecondary.has(asset)) errors.push(`${file}: duplicate secondary asset ${asset} at ${row.contentId}`);
    seenSecondary.add(asset);
    if (!byId.has(asset)) errors.push(`${file}: unknown secondary asset ${asset} at ${row.contentId}`);
  }

  if (row.platform === 'INSTAGRAM' && row.state === 'PUBLISHED') {
    for (const asset of [row.primary, ...secondary]) {
      const assetRow = byId.get(asset);
      if (assetRow && !['USED','PARTIAL','WHOLE_ONLY'].includes(assetRow.ig)) {
        errors.push(`${file}: published Instagram content ${row.contentId} uses asset ${asset} still marked ${assetRow.ig}`);
      }
    }
  }
}

const activeAssetLock = new Map();
const activeMediaLock = new Map();
for (const row of contentRows.filter((r)=>activeContentStates.has(r.state))) {
  const assets = [row.primary, ...(row.secondary === '—' ? [] : row.secondary.split(',').map((x)=>x.trim()).filter(Boolean))];
  for (const asset of assets) {
    if (activeAssetLock.has(asset)) {
      errors.push(`${file}: active asset collision ${asset}: ${activeAssetLock.get(asset)} and ${row.contentId}`);
    } else {
      activeAssetLock.set(asset,row.contentId);
    }
  }
  const mediaKeys = row.mediaKeys.split(';').map((x)=>x.trim()).filter(Boolean);
  for (const key of mediaKeys) {
    if (activeMediaLock.has(key)) {
      errors.push(`${file}: active media collision ${key}: ${activeMediaLock.get(key)} and ${row.contentId}`);
    } else {
      activeMediaLock.set(key,row.contentId);
    }
  }
}

for (const row of rows.filter((r)=>r.ig === 'USED')) {
  const usedByInstagram = contentRows.some((c)=>{
    if (!(c.platform === 'INSTAGRAM' && c.state === 'PUBLISHED')) return false;
    const assets = [c.primary, ...(c.secondary === '—' ? [] : c.secondary.split(',').map((x)=>x.trim()).filter(Boolean))];
    return assets.includes(row.id);
  });
  if (!usedByInstagram) errors.push(`${file}: USED asset ${row.id} has no PUBLISHED Instagram assignment`);
}

if (!contentRows.length) errors.push(`${file}: assignment registry has no content rows`);

if (errors.length) {
  console.error(`Social content inventory check failed (${errors.length}):`);
  for (const e of errors) console.error(`- ${e}`);
  process.exit(1);
}

const activeCount = contentRows.filter((r)=>activeContentStates.has(r.state)).length;
console.log(`Social content inventory check passed: ${rows.length} asset rows, ${contentRows.length} content assignments, ${activeCount} active locks.`);
