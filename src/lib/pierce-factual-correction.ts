const EN_PIERCE_FOUNDING = 'Multiple sources date the predecessor of Pierce, Léon Lévy & Frère, to 1883 in Biel/Bienne, founded by Léon Lévy and Théodore Lévy. Horlbeck gives 1888, so the sources do not agree; VINTAGE ALARM currently uses 1883 because Beitl and multiple independent references agree on that year. The company initially sourced movements from outside suppliers, but by the early 1930s it was developing and manufacturing movements in-house.';

const DE_PIERCE_FOUNDING = 'Mehrere Quellen datieren den Vorläufer von Pierce, Léon Lévy & Frère, auf 1883 und nennen Léon Lévy und Théodore Lévy als Gründer in Biel/Bienne. Horlbeck nennt dagegen 1888; die Quellen stimmen hier also nicht überein. VINTAGE ALARM verwendet derzeit 1883, weil Beitl und mehrere unabhängige Referenzen dieses Jahr übereinstimmend nennen. Anfangs bezog das Unternehmen Werke von externen Lieferanten; Anfang der 1930er-Jahre begann es jedoch, eigene Werke zu entwickeln und herzustellen.';

const EN_EXTRA_SOURCES = [
  'Leonhard Beitl, Alarm am Arm (2009), p. 670 — manufacturer index: Pierce / Lévy Frères / 1883.',
  '[Grail Watch Wiki — Pierce](https://wiki.grail-watch.com/index.php/Pierce) — records the establishment of Léon Lévy & Frère on 16 May 1883.',
  '[Ranfft DB — Pierce](https://ranfft.org/manufacturer/241-Pierce) — gives 1883 as the founding year.',
  '[Watch-Wiki — Pierce](https://www.watch-wiki.net/doku.php?id=pierce) — gives 1883 as the founding year.'
];

const DE_EXTRA_SOURCES = [
  'Leonhard Beitl, Alarm am Arm (2009), S. 670 — Firmenverzeichnis: Pierce / Lévy Frères / 1883.',
  '[Grail Watch Wiki — Pierce](https://wiki.grail-watch.com/index.php/Pierce) — nennt die Gründung von Léon Lévy & Frère am 16. Mai 1883.',
  '[Ranfft DB — Pierce](https://ranfft.org/manufacturer/241-Pierce) — nennt 1883 als Gründungsjahr.',
  '[Watch-Wiki — Pierce](https://www.watch-wiki.net/doku.php?id=pierce) — nennt 1883 als Gründungsjahr.'
];

const appendReferenceMeta = (sourceMeta: Array<{ id: string; type: string }>) => {
  const ids = new Set(sourceMeta.map((item) => item.id));
  return [
    ...sourceMeta,
    ...['6', '7', '8', '9']
      .filter((id) => !ids.has(id))
      .map((id) => ({ id, type: 'reference' }))
  ];
};

const replaceHorlbeckNote = (source: string, language: 'en' | 'de') => {
  if (!source.includes('Michael Philip Horlbeck')) return source;
  if (source.includes('1888')) return source;
  return language === 'en'
    ? `${source} Horlbeck p. 131 gives 1888 as the founding year.`
    : `${source} Horlbeck nennt auf S. 131 das Jahr 1888 als Gründungsjahr.`;
};

export const applyPierceEnglishResearchCorrection = (research: any, slug: string) => {
  if (!research || slug !== 'pierce-duofon') return research;
  return {
    ...research,
    deepDive: research.deepDive.map((section: any) => section.number === '01'
      ? {
          ...section,
          paragraphs: [EN_PIERCE_FOUNDING, ...section.paragraphs.slice(1)],
          citationRefs: ['4,6,7,8,9', ...section.citationRefs.slice(1)]
        }
      : section),
    sourceMeta: appendReferenceMeta(research.sourceMeta),
    sources: [
      ...research.sources.map((source: string) => replaceHorlbeckNote(source, 'en')),
      ...EN_EXTRA_SOURCES
    ]
  };
};

export const applyPierceGermanEntryCorrection = (entry: any, slug: string) => {
  if (!entry || slug !== 'pierce-duofon') return entry;
  return {
    ...entry,
    deepDive: entry.deepDive.map((section: any) => section.number === '01'
      ? {
          ...section,
          paragraphs: [DE_PIERCE_FOUNDING, ...section.paragraphs.slice(1)],
          citationRefs: ['4,6,7,8,9', ...section.citationRefs.slice(1)]
        }
      : section),
    sourceMeta: appendReferenceMeta(entry.sourceMeta),
    sources: [
      ...entry.sources.map((source: string) => replaceHorlbeckNote(source, 'de')),
      ...DE_EXTRA_SOURCES
    ]
  };
};
