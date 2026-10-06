const sorted = (values) => [...values].sort();

export function extractLlmsWatchSlugs(llms, allWatchSlugs) {
  const known = new Set(allWatchSlugs);
  const extract = (section, pattern) => sorted(
    [...section.matchAll(pattern)].map((match) => match[1]).filter((slug) => known.has(slug))
  );
  const published = llms.match(/Published watch pages:\s*([\s\S]*?)\r?\n\r?\nEnglish entry:/)?.[1] || '';
  const english = llms.match(/English entry:\s*([\s\S]*?)\r?\n\r?\nGerman entry:/)?.[1] || '';
  const german = llms.match(/German entry:\s*([\s\S]*?)\r?\n\r?\nMachine-readable index:/)?.[1] || '';
  return {
    ja: extract(published, /^-\s+https:\/\/vintagealarm\.github\.io\/([^/\s]+)\/\s*$/gm),
    en: extract(english, /^-\s+https:\/\/vintagealarm\.github\.io\/en\/([^/\s]+)\/\s*$/gm),
    de: extract(german, /^-\s+https:\/\/vintagealarm\.github\.io\/de\/([^/\s]+)\/\s*$/gm)
  };
}

export function publicationSetErrors(watchStates, llmsGroups) {
  const expected = sorted(watchStates.filter((watch) => watch.published).map((watch) => watch.slug));
  const errors = [];
  for (const [language, actual] of Object.entries(llmsGroups)) {
    if (expected.join('|') !== sorted(actual).join('|')) {
      errors.push(`${language}: files=${expected.join(',')} llms=${sorted(actual).join(',')}`);
    }
  }
  return errors;
}
