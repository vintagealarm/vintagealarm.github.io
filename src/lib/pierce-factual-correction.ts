// Pierce founding-year handling now lives in the canonical JA / EN / DE source data.
// Keep these functions as compatibility shims for the existing layouts; do not
// inject editorial explanations into the article body at runtime.

export const applyPierceEnglishResearchCorrection = (research: any, _slug: string) => research;

export const applyPierceGermanEntryCorrection = (entry: any, _slug: string) => entry;
