import fs from 'node:fs/promises';
import { parse } from 'parse5';

const manifestPath = 'src/data/spec-evidence-audit.json';
const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
const failures = [];

const normalize = (value) => value.replace(/\s+/g, ' ').trim();

const collectText = (node, out = []) => {
  if (node.nodeName === '#text' && typeof node.value === 'string') out.push(node.value);
  for (const child of node.childNodes ?? []) collectText(child, out);
  return out;
};

const readTarget = async (target, rendered = false) => {
  const raw = await fs.readFile(target.path, 'utf8');
  if (!rendered) return raw;
  const document = parse(raw);
  return normalize(collectText(document).join(' '));
};

const runChecks = async (record, checks, rendered = false) => {
  for (const check of checks ?? []) {
    let content;
    try {
      content = await readTarget(check, rendered);
    } catch (error) {
      failures.push(`${record.id}: cannot read ${check.path}: ${error.message}`);
      continue;
    }

    for (const required of check.mustContain ?? []) {
      const needle = rendered ? normalize(required) : required;
      if (!content.includes(needle)) {
        failures.push(`${record.id}: ${check.path} is missing required text ${JSON.stringify(required)}`);
      }
    }

    for (const forbidden of check.mustNotContain ?? []) {
      const needle = rendered ? normalize(forbidden) : forbidden;
      if (content.includes(needle)) {
        failures.push(`${record.id}: ${check.path} contains forbidden stale or over-assertive text ${JSON.stringify(forbidden)}`);
      }
    }
  }
};

for (const record of manifest.checks ?? []) {
  await runChecks(record, record.sourceChecks, false);
  await runChecks(record, record.renderedChecks, true);
}

if (failures.length) {
  console.error('Targeted SPEC evidence audit failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  console.error(`\nOnly add entries to ${manifestPath} when a SPEC field needs an explicit evidence qualifier or a known contradiction must be prevented from returning.`);
  process.exit(1);
}

console.log(`Targeted SPEC evidence audit passed for ${(manifest.checks ?? []).length} tracked case(s).`);
