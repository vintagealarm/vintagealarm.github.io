// Policy: src/data/watch-research/README.md
// These records are optional research-process metadata.
// Absence from this registry is not a WATCH quality, importance, or completion signal.

import cymaTimeOVox from './watch-research/cyma-time-o-vox.json';
import pierceDuofon from './watch-research/pierce-duofon.json';

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
  },
  'pierce-duofon': {
    ...pierceDuofon,
    sourceFile: 'src/data/watch-research/pierce-duofon.json'
  }
};
