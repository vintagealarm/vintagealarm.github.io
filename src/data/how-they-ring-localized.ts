export type HowTheyRingLang = 'ja' | 'en' | 'de';

export const howTheyRingCopy = {
  ja: {
    path: 'how-they-ring/',
    locale: 'ja_JP',
    title: 'HOW THEY RING｜音で見る、アラーム腕時計｜VINTAGE ALARM',
    description: '機械式アラーム腕時計を、実機の音とGONG・CASEBACKの鳴らし方から見る。',
    previewTitle: '音で見る、アラーム腕時計。｜VINTAGE ALARM TEST',
    mastRightLabel: '鳴らし方',
    hero: ['音で見る、', 'アラーム腕時計。'],
    sectionLabel: '鳴動方式を選ぶ',
    evidenceSummary: '機構図の根拠・資料を見る',
    sourcePrefix: '出典：',
    classificationNote: 'GONG / CASEBACKと各型名は、ハンマーの打撃先と発音構造をもとにしたVINTAGE ALARMでの整理です。',
    compare: '複数の音源は同時再生できます',
    detail: '写真から個体詳細へ',
    detailBadge: 'WATCH DETAILS →',
    detailAria: (brand: string, model: string) => `${brand} ${model} のOWNER'S NOTEへ`,
    imageAlt: (brand: string, model: string) => `${brand} ${model} 掲載個体`,
    audioPending: 'AUDIO / 音源',
    recordingCondition: 'iPhone 16 / 約20 cm / audio file unprocessed',
    recordingNote: '※録音音量は実環境での絶対的な音量を示すものではありません。',
    recordingLabels: {} as Record<string, string>,
    categories: [
      {
        id: 'gong',
        en: 'GONG',
        localLabel: 'ゴング',
        action: '内蔵の音バネを叩く',
        figures: [
          {
            no: '01',
            image: '/images/how-they-ring/gong.jpg',
            label: '内蔵の音バネを叩く',
            example: 'OMEGA MEMOMATIC',
            evidence: 'OMEGA MEMOMATICのOmega/Lemania Cal.980は、内蔵された音バネ（tone spring）を打撃する。',
            source: 'The Alarm Wristwatch'
          }
        ]
      },
      {
        id: 'caseback',
        en: 'CASEBACK',
        localLabel: 'ケースバック',
        action: 'ケースバックを共鳴させて鳴らす',
        figures: [
          {
            no: '02',
            image: '/images/how-they-ring/caseback-hammer.png',
            label: '振動板型',
            example: 'VULCAIN CRICKET',
            evidence: 'ハンマーが、振動板（membrane）に設けられたピンを打撃する。',
            source: 'The Alarm Wristwatch'
          },
          {
            no: '03',
            image: '/images/how-they-ring/pin-hammer.png',
            label: 'ピン／レバー伝達型',
            example: 'JUNGHANS MINIVOX',
            evidence: '量産型J89は、底部に組み込まれたベルを発音体とする。',
            source: 'The Alarm Wristwatch'
          },
          {
            no: '04',
            image: '/images/how-they-ring/bell.jpg',
            label: 'BELL-BASE型',
            example: 'LANCO-FON · CAL.1241',
            evidence: 'Cal.1241は、ハンマーがベル（Glocke）を打撃する。',
            source: 'ALARM AM ARM'
          }
        ]
      }
    ]
  },
  en: {
    path: 'en/how-they-ring/',
    locale: 'en_US',
    title: 'HOW THEY RING | Mechanical Alarm Wristwatch Sounds | VINTAGE ALARM',
    description: 'Compare original recordings from six owned mechanical alarm wristwatches and explore how GONG and CASEBACK alarm mechanisms make sound.',
    previewTitle: 'HOW THEY RING | VINTAGE ALARM TEST',
    mastRightLabel: 'SOUND',
    hero: ['Alarm wristwatches,', 'seen through sound.'],
    sectionLabel: 'Choose a sounding mechanism',
    evidenceSummary: 'View mechanism evidence and sources',
    sourcePrefix: 'Source: ',
    classificationNote: 'GONG / CASEBACK and the subtype names are VINTAGE ALARM classifications based on the hammer strike point and the sound-generating structure.',
    compare: 'Multiple recordings can be played at the same time',
    detail: 'Open specimen details from the photo',
    detailBadge: 'WATCH DETAILS →',
    detailAria: (brand: string, model: string) => `${brand} ${model} specimen details`,
    imageAlt: (brand: string, model: string) => `${brand} ${model} specimen`,
    audioPending: 'AUDIO',
    recordingCondition: 'iPhone 16 / approx. 20 cm / audio file unprocessed',
    recordingNote: 'Recording level does not represent absolute loudness under real-world conditions.',
    recordingLabels: {
      'WECKER / 音あり': 'WECKER / audible alarm',
      'SIGNAL / 音無し': 'SIGNAL / quiet signal',
      'シチズンアラーム': 'Citizen Alarm',
      'Basis alarm（BFG90)': 'Basis Alarm (BFG 90)',
      'Westclox watchlarm': 'Westclox Watchlarm'
    } as Record<string, string>,
    categories: [
      {
        id: 'gong',
        en: 'GONG',
        localLabel: 'sound spring',
        action: 'Strike an integrated tone spring',
        figures: [
          {
            no: '01',
            image: '/images/how-they-ring/gong.jpg',
            label: 'Integrated tone spring',
            example: 'OMEGA MEMOMATIC',
            evidence: 'On the OMEGA MEMOMATIC, the Omega/Lemania Cal. 980 strikes an integrated tone spring.',
            source: 'The Alarm Wristwatch'
          }
        ]
      },
      {
        id: 'caseback',
        en: 'CASEBACK',
        localLabel: 'caseback',
        action: 'Make the caseback resonate',
        figures: [
          {
            no: '02',
            image: '/images/how-they-ring/caseback-hammer.png',
            label: 'Membrane type',
            example: 'VULCAIN CRICKET',
            evidence: 'The hammer strikes a pin mounted on the membrane.',
            source: 'The Alarm Wristwatch'
          },
          {
            no: '03',
            image: '/images/how-they-ring/pin-hammer.png',
            label: 'Pin / lever transmission type',
            example: 'JUNGHANS MINIVOX',
            evidence: 'The production J89 uses a bell built into the base as its sounding body.',
            source: 'The Alarm Wristwatch'
          },
          {
            no: '04',
            image: '/images/how-they-ring/bell.jpg',
            label: 'BELL-BASE type',
            example: 'LANCO-FON · CAL.1241',
            evidence: 'On Cal. 1241, the hammer strikes a bell (Glocke).',
            source: 'ALARM AM ARM'
          }
        ]
      }
    ]
  },
  de: {
    path: 'de/how-they-ring/',
    locale: 'de_DE',
    title: 'HOW THEY RING | Klänge mechanischer Wecker-Armbanduhren | VINTAGE ALARM',
    description: 'Originalaufnahmen von sechs eigenen mechanischen Wecker-Armbanduhren im Vergleich, geordnet nach GONG- und CASEBACK-Konstruktionen.',
    previewTitle: 'HOW THEY RING | VINTAGE ALARM TEST',
    mastRightLabel: 'KLANG',
    hero: ['Wecker-Armbanduhren,', 'durch Klang betrachtet.'],
    sectionLabel: 'Klangmechanismus auswählen',
    evidenceSummary: 'Belege und Quellen zur Klangmechanik',
    sourcePrefix: 'Quelle: ',
    classificationNote: 'GONG / CASEBACK sowie die Bezeichnungen der Untertypen sind eine Einteilung von VINTAGE ALARM nach Schlagpunkt des Hammers und klangerzeugender Konstruktion.',
    compare: 'Mehrere Aufnahmen lassen sich gleichzeitig abspielen',
    detail: 'Vom Foto zu den Details des Exemplars',
    detailBadge: 'UHRDETAILS →',
    detailAria: (brand: string, model: string) => `${brand} ${model}: Details zum Exemplar`,
    imageAlt: (brand: string, model: string) => `${brand} ${model}, gezeigtes Exemplar`,
    audioPending: 'AUDIO',
    recordingCondition: 'iPhone 16 / ca. 20 cm / Audiodatei unbearbeitet',
    recordingNote: 'Die Aufnahmelautstärke entspricht nicht der absoluten Lautstärke unter realen Bedingungen.',
    recordingLabels: {
      'WECKER / 音あり': 'WECKER / hörbarer Alarm',
      'SIGNAL / 音無し': 'SIGNAL / leises Signal',
      'シチズンアラーム': 'Citizen Alarm',
      'Basis alarm（BFG90)': 'Basis Alarm (BFG 90)',
      'Westclox watchlarm': 'Westclox Watchlarm'
    } as Record<string, string>,
    categories: [
      {
        id: 'gong',
        en: 'GONG',
        localLabel: 'Tonfeder',
        action: 'Eine integrierte Tonfeder anschlagen',
        figures: [
          {
            no: '01',
            image: '/images/how-they-ring/gong.jpg',
            label: 'Integrierte Tonfeder',
            example: 'OMEGA MEMOMATIC',
            evidence: 'Bei der OMEGA MEMOMATIC schlägt das Omega/Lemania Cal. 980 auf eine integrierte Tonfeder.',
            source: 'The Alarm Wristwatch'
          }
        ]
      },
      {
        id: 'caseback',
        en: 'CASEBACK',
        localLabel: 'Gehäuseboden',
        action: 'Den Gehäuseboden in Resonanz versetzen',
        figures: [
          {
            no: '02',
            image: '/images/how-they-ring/caseback-hammer.png',
            label: 'Membran-Typ',
            example: 'VULCAIN CRICKET',
            evidence: 'Der Hammer schlägt auf einen an der Membran angebrachten Stift.',
            source: 'The Alarm Wristwatch'
          },
          {
            no: '03',
            image: '/images/how-they-ring/pin-hammer.png',
            label: 'Pin-/Hebelübertragung',
            example: 'JUNGHANS MINIVOX',
            evidence: 'Beim Serien-J89 dient eine in den Boden integrierte Glocke als Klangkörper.',
            source: 'The Alarm Wristwatch'
          },
          {
            no: '04',
            image: '/images/how-they-ring/bell.jpg',
            label: 'BELL-BASE-Typ',
            example: 'LANCO-FON · CAL.1241',
            evidence: 'Beim Cal. 1241 schlägt der Hammer auf eine Glocke.',
            source: 'ALARM AM ARM'
          }
        ]
      }
    ]
  }
} satisfies Record<HowTheyRingLang, Record<string, any>>;
