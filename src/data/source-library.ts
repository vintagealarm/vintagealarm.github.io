export type SourceLibraryItem = {
  id: string;
  category: 'reference-book';
  title: string;
  author: string;
  imprint: string;
  year: string;
  isbn?: string;
  language?: string;
  matchTerms: string[];
  usedFor: string[];
  bibliography?: { label: string; url: string; kind: 'library' | 'publisher' | 'bibliography' }[];
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
    language: 'en',
    matchTerms: ['Michael Philip Horlbeck', 'The Alarm Wristwatch'],
    usedFor: [
      'Eterna初期アラーム腕時計 / Patent 42,203',
      'A. Schild AS 1475 / AS 5007 / AS 5008',
      'Vulcain Cricket / Golden Voice / Cricket Nautical',
      'Jaeger-LeCoultre Memovox、Omega Memomatic',
      'Cyma Time-O-Vox、Pierce Duofon ほか'
    ],
    bibliography: [
      {
        label: 'WorldCat（ISBN書誌検索）',
        url: 'https://search.worldcat.org/search?q=bn%3A9780764326448',
        kind: 'library'
      },
      {
        label: 'Schiffer Publishing（出版社書誌）',
        url: 'https://schifferbooks.com/products/alarm-wristwatch',
        kind: 'publisher'
      }
    ],
    acquisition: [
      {
        label: 'Amazon.co.jpで見る',
        url: 'https://www.amazon.co.jp/-/en/Alarm-Wristwatch-History-Undervalued-Feature/dp/0764326449'
      }
    ],
    note: '図書館・出版社の書誌リンクは、資料の実在、版、ISBNなどを確認するための補助導線です。歴史的主張そのものの根拠は、HISTORY / WATCH側で該当ページや一次資料へ紐付けます。'
  },
  {
    id: 'beitl-2009',
    category: 'reference-book',
    title: 'Alarm am Arm',
    author: 'Leonhard Beitl',
    imprint: 'Herausgeber: Leonhard Beitl, Wien',
    year: '2009',
    isbn: '978-3-200-01646-0',
    language: 'de',
    matchTerms: ['Leonhard Beitl', 'Alarm am Arm'],
    usedFor: [
      'Eterna Cal.68とPatent 42,203',
      '各社・各モデルの実例と年代比較',
      'A. Schild / Baumgartner / Westcloxなどの搭載例',
      'Vulcain、Cyma、Pierceほか多数の個体資料'
    ],
    bibliography: [
      {
        label: 'Deutsche Nationalbibliothek（ISBN書誌検索）',
        url: 'https://portal.dnb.de/opac/simpleSearch?query=978-3-200-01646-0',
        kind: 'library'
      },
      {
        label: 'Deutsches Uhrenmuseum Glashütte（蔵書目録）',
        url: 'https://www.uhrenmuseum-glashuette.com/wp-content/uploads/2020/01/DUMG_Bestand-Bibliothek_10-2019.pdf',
        kind: 'library'
      },
      {
        label: 'NAWCC Annotated Bibliography',
        url: 'https://theindex.nawcc.org/Articles/Watkins1.pdf',
        kind: 'bibliography'
      }
    ],
    note: '2009年・Wien・676頁・ISBN 978-3-200-01646-0は、Deutsches Uhrenmuseum Glashütteの蔵書目録とNAWCCの書誌資料でも照合できます。書誌登録は資料の実在性・版の確認に使い、本文の各主張は該当ページまたは一次資料で検証します。'
  }
];

export const sourceLibraryById = new Map(sourceLibrary.map((item) => [item.id, item] as const));

export function resolveSourceLibraryId(source: string) {
  const normalized = source.toLocaleLowerCase();
  const match = sourceLibrary.find((item) =>
    item.matchTerms.some((term) => normalized.includes(term.toLocaleLowerCase()))
  );
  return match?.id ?? null;
}
