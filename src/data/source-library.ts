export type SourceLibraryItem = {
  id: string;
  category: 'reference-book';
  title: string;
  author: string;
  imprint: string;
  year: string;
  isbn?: string;
  usedFor: string[];
  acquisition?: { label: string; url: string }[];
  note?: string;
};

export const sourceLibrary: SourceLibraryItem[] = [
  {
    id: 'horlbeck-2007',
    category: 'reference-book',
    title: 'The Alarm Wristwatch: The History of an Undervalued Feature',
    author: 'Michael Philip Horlbeck',
    imprint: 'Schiffer Publishing Ltd.',
    year: '2007',
    isbn: '978-0-7643-2644-8',
    usedFor: [
      'Eterna初期アラーム腕時計 / Patent 42,203',
      'A. Schild AS 1475 / AS 5007 / AS 5008',
      'Vulcain Cricket / Golden Voice / Cricket Nautical',
      'Jaeger-LeCoultre Memovox、Omega Memomatic',
      'Cyma Time-O-Vox、Pierce Duofon ほか'
    ],
    acquisition: [
      {
        label: 'Amazon.co.jpで見る',
        url: 'https://www.amazon.co.jp/-/en/Alarm-Wristwatch-History-Undervalued-Feature/dp/0764326449'
      }
    ],
    note: '入手先リンクは資料の根拠ではなく、読者が同じ資料を確認するための補助導線です。'
  },
  {
    id: 'beitl-2009',
    category: 'reference-book',
    title: 'Alarm am Arm',
    author: 'Leonhard Beitl',
    imprint: 'Herausgeber: Leonhard Beitl, Wien',
    year: '2009',
    usedFor: [
      'Eterna Cal.68とPatent 42,203',
      '各社・各モデルの実例と年代比較',
      'A. Schild / Baumgartner / Westcloxなどの搭載例',
      'Vulcain、Cyma、Pierceほか多数の個体資料'
    ],
    note: '手元資料で著者・刊行地・刊行年を確認。ISBNは現時点で確認できていないため記載していません。'
  }
];
