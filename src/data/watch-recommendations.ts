export type WatchRecommendation = {
  target: string;
  reason: string;
  headline?: string;
  label?: string;
};

export const watchRecommendations: Record<string, WatchRecommendation> = {
  'wittnauer-10wa': {
    target: 'cyma-time-o-vox',
    headline: '同じようで、違う音。',
    reason: '音ばねを叩くWittnauer 10WA。その先にある、もうひとつの鳴らし方。',
    label: 'CYMA Time-O-Vox'
  },
  'pierce-duofon': {
    target: 'cyma-time-o-vox',
    reason: '同じ1950年代。1香箱でクロノメーターを目指した極北。'
  },
  'cyma-time-o-vox': {
    target: 'pierce-duofon',
    reason: '2香箱で2つの音量という独自機構。'
  },
  'basis-alarm': {
    target: 'westclox-watchlarm',
    reason: '高級機とは別方向。実用品として削ぎ落とした、0石という究極設計。'
  },
  'westclox-watchlarm': {
    target: 'basis-alarm',
    reason: '高級機とは別方向。大衆機としての、もうひとつの答え。'
  },
  'citizen-alarm': {
    target: 'cyma-time-o-vox',
    reason: '1950年代のアラーム腕時計を、日本とスイスで見比べる。'
  }
};
