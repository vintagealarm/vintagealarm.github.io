import fs from 'node:fs/promises';
import { parse } from 'parse5';

const manifestPath = 'src/data/localization-fact-sync.json';
const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
const failures = [];

const normalize = (value) => value.replace(/\s+/g, ' ').trim();

const collectText = (node, out = []) => {
  if (node.nodeName === '#text' && typeof node.value === 'string') out.push(node.value);
  for (const child of node.childNodes ?? []) collectText(child, out);
  return out;
};

const readCheckTarget = async (target, rendered = false) => {
  const raw = await fs.readFile(target.path, 'utf8');
  if (!rendered) return raw;
  const document = parse(raw);
  return normalize(collectText(document).join(' '));
};

const runChecks = async (fact, checks, rendered = false) => {
  for (const check of checks ?? []) {
    let content;
    try {
      content = await readCheckTarget(check, rendered);
    } catch (error) {
      failures.push(`${fact.id}: cannot read ${check.path}: ${error.message}`);
      continue;
    }

    for (const required of check.mustContain ?? []) {
      const needle = rendered ? normalize(required) : required;
      if (!content.includes(needle)) {
        failures.push(`${fact.id}: ${check.path} is missing required text ${JSON.stringify(required)}`);
      }
    }

    for (const forbidden of check.mustNotContain ?? []) {
      const needle = rendered ? normalize(forbidden) : forbidden;
      if (content.includes(needle)) {
        failures.push(`${fact.id}: ${check.path} still contains forbidden stale text ${JSON.stringify(forbidden)}`);
      }
    }
  }
};

for (const fact of manifest.facts ?? []) {
  await runChecks(fact, fact.sourceChecks, false);
  await runChecks(fact, fact.renderedChecks, true);
}

if (failures.length) {
  console.error('Localization factual sync check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  console.error(`\nUpdate ${manifestPath} together with all published language variants when a shared fact changes.`);
  process.exit(1);
}

console.log(`Localization factual sync check passed for ${(manifest.facts ?? []).length} tracked fact(s).`);
