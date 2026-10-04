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
const validVerify = new Set(['READY_FROM_WATCH','READY_FROM_SOURCE','RECHECK_SOURCE','OPEN_QUESTION','RIGHTS_CHECK']);

const errors = [];
if (!text.endsWith('\n')) errors.push(`${file}: file must end with newline`);
if (!text.includes("OWNER'S NOTE は分割しない")) errors.push(`${file}: OWNER'S NOTE no-split rule missing`);
if (!text.includes("AIは候補分類まで先行してよい")) errors.push(`${file}: staged candidate review rule missing`);
if (!text.includes("Content Assignment Registry")) errors.push(`${file}: assignment registry missing`);
if (!text.includes("Candidate Review Queue")) errors.push(`${file}: candidate review queue missing`);
for (const section of requiredSections) {
  if (!text.includes(`## ${section}`)) errors.push(`${file}: missing watch section ${section}`);
}

const sectionStarts = [];
for (const section of requiredSections) {
  const i = text.indexOf(`## ${section}`);
  if (i >= 0) sectionStarts.push([section, i]);
}
sectionStarts.sort((a,b)=>a[1]-b[1]);

const rows = [];
for (const line of text.split('\n')) {
  if (!/^\| (?:WIT|CYM|PIE|BAS|WES|CIT|GLB)-/.test(line)) continue;
  const cells = line.split('|').slice(1,-1).map((x)=>x.trim());
  if (cells.length !== 8) {
    errors.push(`${file}: inventory row must have 8 cells: ${line}`);
    continue;
  }
  const [id, angle, ig, other, media, verify, role, source] = cells;
  rows.push({id,angle,ig,other,media,verify,role,source,line});
}

const seen = new Set();
for (const row of rows) {
  if (seen.has(row.id)) errors.push(`${file}: duplicate ID ${row.id}`);
  seen.add(row.id);
  if (!validIg.has(row.ig)) errors.push(`${file}: invalid IG state ${row.ig} at ${row.id}`);
  if (!validMedia.has(row.media)) errors.push(`${file}: invalid Media ${row.media} at ${row.id}`);
  if (!validVerify.has(row.verify)) errors.push(`${file}: invalid Verify ${row.verify} at ${row.id}`);
  if (!row.angle || !row.other || !row.role || !row.source) errors.push(`${file}: empty required cell at ${row.id}`);
  if (/^UNUSED$/i.test(row.other) || /^UNUSED$/i.test(row.ig)) errors.push(`${file}: bare UNUSED is forbidden at ${row.id}`);
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
  if (owner.length !== 1) errors.push(`${file}: ${watch} must have exactly one -ON row`);
  else if (!(owner[0].ig === 'WHOLE_ONLY' && owner[0].media === 'OWNER_NOTE_HERO_ONLY' && owner[0].role === 'OWNER_NOTE_WHOLE')) {
    errors.push(`${file}: ${watch} OWNER'S NOTE row must be WHOLE_ONLY / OWNER_NOTE_HERO_ONLY / OWNER_NOTE_WHOLE`);
  }
}

if (!rows.some((r)=>r.role === 'URL_FUNNEL')) errors.push(`${file}: URL_FUNNEL row missing`);

const validProposalStates = new Set(['AI_PROPOSED','USER_KEEP','USER_MERGE','USER_SPLIT','USER_DROP']);
const proposalRows = [];
for (const line of text.split('\n')) {
  if (!/^\| PR-[A-Z]{3}-\d{3} \|/.test(line)) continue;
  const cells = line.split('|').slice(1,-1).map((x)=>x.trim());
  if (cells.length !== 10) { errors.push(`${file}: proposal row must have 10 cells: ${line}`); continue; }
  const [proposalId, watch, candidate, relation, social, media, verify, videoFit, status, source] = cells;
  proposalRows.push({proposalId,watch,candidate,relation,social,media,verify,videoFit,status,source});
}
const seenProposal = new Set();
for (const row of proposalRows) {
  if (seenProposal.has(row.proposalId)) errors.push(`${file}: duplicate proposal ID ${row.proposalId}`);
  seenProposal.add(row.proposalId);
  if (!validProposalStates.has(row.status)) errors.push(`${file}: invalid proposal state ${row.status} at ${row.proposalId}`);
  if (!row.watch || !row.candidate || !row.relation || !row.social || !row.media || !row.verify || !row.videoFit || !row.source) errors.push(`${file}: empty proposal cell at ${row.proposalId}`);
}

const validStates = new Set(['PLANNED','SHOT','EDITED','SCHEDULED','PUBLISHED','UNVERIFIED_PAST','DROPPED']);
const activeStates = new Set(['PLANNED','SHOT','EDITED','SCHEDULED']);
const validApproval = new Set(['LEGACY_VERIFIED','USER_CONFIRMED']);
const contentRows = [];
for (const line of text.split('\n')) {
  if (!/^\| (?:IG|YT|X|MR)-/.test(line)) continue;
  const cells = line.split('|').slice(1,-1).map((x)=>x.trim());
  if (cells.length !== 9) { errors.push(`${file}: content row must have 9 cells: ${line}`); continue; }
  const [contentId, platform, state, approval, format, primary, secondary, mediaKeys, evidence] = cells;
  contentRows.push({contentId,platform,state,approval,format,primary,secondary,mediaKeys,evidence});
}
const byId = new Map(rows.map((r)=>[r.id,r]));
const seenContent = new Set();
const activeAsset = new Map();
const activeMedia = new Map();
for (const row of contentRows) {
  if (seenContent.has(row.contentId)) errors.push(`${file}: duplicate content ID ${row.contentId}`);
  seenContent.add(row.contentId);
  if (!validStates.has(row.state)) errors.push(`${file}: invalid content state ${row.state} at ${row.contentId}`);
  if (!validApproval.has(row.approval)) errors.push(`${file}: invalid approval ${row.approval} at ${row.contentId}`);
  if (activeStates.has(row.state) && row.approval !== 'USER_CONFIRMED') errors.push(`${file}: active content requires USER_CONFIRMED at ${row.contentId}`);
  if (!byId.has(row.primary)) errors.push(`${file}: unknown primary asset ${row.primary} at ${row.contentId}`);
  const secondary = row.secondary === '—' ? [] : row.secondary.split(',').map((x)=>x.trim()).filter(Boolean);
  for (const asset of secondary) if (!byId.has(asset)) errors.push(`${file}: unknown secondary asset ${asset} at ${row.contentId}`);
  if (activeStates.has(row.state)) {
    for (const asset of [row.primary,...secondary]) {
      if (activeAsset.has(asset)) errors.push(`${file}: active asset collision ${asset}`);
      else activeAsset.set(asset,row.contentId);
    }
    for (const key of row.mediaKeys.split(';').map((x)=>x.trim()).filter(Boolean)) {
      if (activeMedia.has(key)) errors.push(`${file}: active media collision ${key}`);
      else activeMedia.set(key,row.contentId);
    }
  }
}
if (!contentRows.length) errors.push(`${file}: no content assignment rows`);

if (errors.length) {
  console.error(`Social content inventory check failed (${errors.length}):`);
  for (const e of errors) console.error(`- ${e}`);
  process.exit(1);
}

console.log(`Social content inventory check passed: ${rows.length} asset rows, ${proposalRows.length} staged proposals, ${contentRows.length} assignments.`);
