import { historyContent } from './history-content';

export type HistoryCatalogEntry = {
  id: string;
  group: 'milestone' | 'research';
  era: '1910s' | '1940s' | '1950s' | '1960s' | 'electronic';
  sort: number;
  meta: string;
  name: string;
  hook: string;
  cardSummary: string;
  cardStatus: string;
  displayMeta?: string;
  displayTopic?: string;
  displayName?: string;
  displaySummary?: string;
  displayNote?: string;
  sourceRefs?: string[];
  sourcePages?: Record<string, string>;
  featured: boolean;
  href?: string;
  hrefKind?: 'site' | 'external';
};

type HistoryCatalogSourceEntry = Omit<HistoryCatalogEntry, 'era'>;

const sourcePagesByEntry: Record<string, Record<string, string>> = {
  'eterna-1914': { '1': 'pp.12–13', '2': 'pp.164–168' },
  'vulcain-cricket': { '2': 'p.474' },
  'as1475': { '1': 'pp.81–83' },
  'vulcain-golden-voice': { '1': 'pp.58–59' },
  'vulcain-cricket-nautical': { '2': 'p.479' },
  'as5007-5008': { '1': 'pp.85–87', '2': 'p.75' }
};

const chapterCards = [
  ['1910s', historyContent.era1910s.cards],
  ['1940s', historyContent.era1940s.cards],
  ['1950s', historyContent.era1950s.cards],
  ['1960s', historyContent.era1960s.cards],
  ['electronic', historyContent.electronic.cards]
] as const;

export const historyCatalog: HistoryCatalogEntry[] = chapterCards.flatMap(([era, cards]) =>
  (cards as unknown as HistoryCatalogSourceEntry[]).map((entry) => ({
    ...entry,
    era,
    ...(sourcePagesByEntry[entry.id] ? { sourcePages: sourcePagesByEntry[entry.id] } : {})
  }))
);

export const historyCatalogByGroup = {
  milestones: historyCatalog.filter((entry) => entry.group === 'milestone').sort((a, b) => a.sort - b.sort),
  research: historyCatalog.filter((entry) => entry.group === 'research').sort((a, b) => a.sort - b.sort)
};