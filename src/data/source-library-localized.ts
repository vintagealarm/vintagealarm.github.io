import { sourceLibrary } from './source-library';

export type SourceLocale = 'en' | 'de';

type LocalizedSourceCopy = {
  usedFor: string[];
  bibliographyLabels?: Record<string, string>;
  acquisitionLabels?: Record<string, string>;
  note?: string;
};

const englishCopy: Record<string, LocalizedSourceCopy> = {
  'horlbeck-2007': {
    usedFor: [
      'Early Eterna alarm wristwatches / Patent 42,203',
      'A. Schild AS 1475 / AS 5007 / AS 5008',
      'Vulcain Cricket / Golden Voice / Cricket Nautical',
      'Jaeger-LeCoultre Memovox / Omega Memomatic',
      'Cyma Time-O-Vox / Pierce Duofon and others'
    ],
    bibliographyLabels: {
      'WorldCat（ISBN書誌検索）': 'WorldCat (ISBN catalogue search)',
      'Schiffer Publishing（出版社書誌）': 'Schiffer Publishing (publisher record)'
    },
    acquisitionLabels: {
      'Amazon.co.jpで見る': 'View on Amazon.co.jp'
    },
    note: 'Library and publisher catalogue links are provided to verify that the source exists and to confirm edition and ISBN details. Historical claims themselves are tied to the relevant pages or primary sources on the HISTORY / WATCH pages.'
  },
  'beitl-2009': {
    usedFor: [
      'Eterna Cal. 68 and Patent 42,203',
      'Examples and date comparisons across brands and models',
      'A. Schild / Baumgartner / Westclox applications',
      'Vulcain, Cyma, Pierce and many other documented watches'
    ],
    bibliographyLabels: {
      'Deutsche Nationalbibliothek（ISBN書誌検索）': 'German National Library (ISBN catalogue search)',
      'Deutsches Uhrenmuseum Glashütte（蔵書目録）': 'German Watch Museum Glashütte (library catalogue)',
      'NAWCC Annotated Bibliography': 'NAWCC Annotated Bibliography'
    },
    note: 'The 2009 Vienna edition, 676 pages, ISBN 978-3-200-01646-0 can also be checked against the German Watch Museum Glashütte library catalogue and the NAWCC bibliography. Bibliographic records are used to verify the existence and edition of the source; individual historical claims are checked against the relevant pages or primary sources.'
  }
};

const germanCopy: Record<string, LocalizedSourceCopy> = {
  'horlbeck-2007': {
    usedFor: [
      'Frühe Eterna-Armbandwecker / Patent 42,203',
      'A. Schild AS 1475 / AS 5007 / AS 5008',
      'Vulcain Cricket / Golden Voice / Cricket Nautical',
      'Jaeger-LeCoultre Memovox / Omega Memomatic',
      'Cyma Time-O-Vox / Pierce Duofon und weitere Modelle'
    ],
    bibliographyLabels: {
      'WorldCat（ISBN書誌検索）': 'WorldCat (ISBN-Katalogsuche)',
      'Schiffer Publishing（出版社書誌）': 'Schiffer Publishing (Verlagsangabe)'
    },
    acquisitionLabels: {
      'Amazon.co.jpで見る': 'Bei Amazon.co.jp ansehen'
    },
    note: 'Bibliotheks- und Verlagslinks dienen dazu, Existenz, Ausgabe und ISBN der Quelle zu überprüfen. Die historischen Aussagen selbst werden auf den jeweiligen HISTORY- bzw. WATCH-Seiten mit den einschlägigen Seiten oder Primärquellen verknüpft.'
  },
  'beitl-2009': {
    usedFor: [
      'Eterna Cal. 68 und Patent 42,203',
      'Beispiele und Datierungsvergleiche verschiedener Marken und Modelle',
      'Verwendungen von A. Schild / Baumgartner / Westclox',
      'Vulcain, Cyma, Pierce und zahlreiche weitere dokumentierte Uhren'
    ],
    bibliographyLabels: {
      'Deutsche Nationalbibliothek（ISBN書誌検索）': 'Deutsche Nationalbibliothek (ISBN-Katalogsuche)',
      'Deutsches Uhrenmuseum Glashütte（蔵書目録）': 'Deutsches Uhrenmuseum Glashütte (Bibliothekskatalog)',
      'NAWCC Annotated Bibliography': 'NAWCC Annotated Bibliography'
    },
    note: 'Die Ausgabe Wien 2009 mit 676 Seiten und ISBN 978-3-200-01646-0 lässt sich auch im Bibliothekskatalog des Deutschen Uhrenmuseums Glashütte und in der NAWCC-Bibliographie nachvollziehen. Bibliographische Nachweise dienen der Prüfung von Existenz und Ausgabe; einzelne historische Aussagen werden anhand der einschlägigen Seiten oder Primärquellen geprüft.'
  }
};

export function localizedSourceLibrary(lang: SourceLocale) {
  const copy = lang === 'de' ? germanCopy : englishCopy;
  return sourceLibrary.map((item) => {
    const localized = copy[item.id];
    if (!localized) return item;
    return {
      ...item,
      usedFor: localized.usedFor,
      bibliography: item.bibliography?.map((link) => ({
        ...link,
        label: localized.bibliographyLabels?.[link.label] ?? link.label
      })),
      acquisition: item.acquisition?.map((link) => ({
        ...link,
        label: localized.acquisitionLabels?.[link.label] ?? link.label
      })),
      note: localized.note ?? item.note
    };
  });
}
