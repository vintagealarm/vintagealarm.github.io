import cymaTimeOVox from './watch-research/cyma-time-o-vox.json';

export type ResearchSummaryItem = {
  label: string;
  value: string;
};

export type ResearchRevision = {
  date: string;
  note: string;
};

export type WatchResearchRecord = {
  summary: ResearchSummaryItem[];
  revisions: ResearchRevision[];
  sourceFile: string;
};

export const watchResearchRecords: Record<string, WatchResearchRecord> = {
  'cyma-time-o-vox': {
    ...cymaTimeOVox,
    sourceFile: 'src/data/watch-research/cyma-time-o-vox.json'
  }
};
