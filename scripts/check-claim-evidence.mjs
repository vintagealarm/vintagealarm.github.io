import fs from 'node:fs/promises';

const manifestPath = 'src/data/claim-evidence-audit.json';
const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
const failures = [];

for (const record of manifest.checks ?? []) {
  if (!record.id || !record.path) {
    failures.push('claim evidence record is missing id or path');
    continue;
  }
  if (!record.reviewedAt) failures.push(`${record.id}: reviewedAt is missing`);
  if (!Array.isArray(record.reviewedAgainst) || record.reviewedAgainst.length === 0) {
    failures.push(`${record.id}: reviewedAgainst is missing`);
  }

  let source;
  try {
    source = await fs.readFile(record.path, 'utf8');
  } catch (error) {
    failures.push(`${record.id}: cannot read ${record.path}: ${error.message}`);
    continue;
  }

  for (const required of record.mustContain ?? []) {
    if (!source.includes(required)) {
      failures.push(`${record.id}: guarded wording/evidence changed or disappeared: ${JSON.stringify(required)}`);
    }
  }

  for (const forbidden of record.mustNotContain ?? []) {
    if (source.includes(forbidden)) {
      failures.push(`${record.id}: over-assertive wording reappeared: ${JSON.stringify(forbidden)}`);
    }
  }
}

if (failures.length) {
  console.error('Claim evidence review guard failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  console.error('\nThis check does not determine historical truth. It prevents a manually reviewed, high-risk claim from changing without an explicit evidence review and manifest update.');
  process.exit(1);
}

console.log(`Claim evidence review guard passed for ${(manifest.checks ?? []).length} high-risk claim(s).`);
