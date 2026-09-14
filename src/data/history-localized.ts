import { historyContent } from './history-content';

const translateCards = (cards: any[], translations: Record<string, Record<string, string>>) =>
  cards.map((card) => ({ ...card, ...(translations[card.id] ?? {}) }));

const englishCardText: Record<string, Record<string, string>> = {
  'eterna-1914': {
    displayTopic: 'Miniaturization',
    displaySummary: 'Cal. 68. About 13 lignes, one barrel.',
    hook: 'The first mass-produced alarm wristwatch.',
    cardSummary: 'About 13 lignes, one barrel.\nA hammer strikes a bell at the bottom of the case.'
  },
  'vulcain-cricket': {
    displayTopic: 'Acoustics',
    displaySummary: 'Double-back acoustic construction.',
    cardSummary: 'A double-back construction combined alarm volume with water resistance. Also known for its association with U.S. presidents.'
  },
  'as1475': {
    displayTopic: 'Mass production',
    displaySummary: 'An alarm calibre that supported mass production.',
    hook: 'The most widely used alarm calibre.',
    cardSummary: 'About 780,000 were produced from 1954 to 1970; including derivatives, the total reaches about 1.4 million.'
  },
  'memovox-automatic': {
    displaySummary: 'Bumper automatic winding for timekeeping; the alarm remains hand-wound.',
    hook: 'The world’s first automatic alarm wristwatch.',
    cardSummary: 'Automatic winding for the timekeeping side; the alarm mainspring remains hand-wound.',
    displayNote: 'The world’s first automatic alarm wristwatch.'
  },
  'vulcain-golden-voice': {
    displayTopic: 'Miniaturization',
    displaySummary: 'An alarm wristwatch for women.',
    hook: 'The world’s first women’s alarm wristwatch.',
    cardSummary: 'A 19.7 mm two-barrel movement with a gold membrane.'
  },
  'jlc-parking': {
    displayTopic: 'Parking time',
    displaySummary: 'A scale for parking time.',
    hook: 'The first alarm wristwatch designed to signal parking time.',
    cardSummary: 'A Memovox with a parking-time scale added to the inner disc.'
  },
  'vulcain-cricket-nautical': {
    displayTopic: 'Diving',
    displaySummary: 'An alarm wristwatch with a decompression table.',
    hook: 'An underwater-audible alarm, brought to a diver’s watch.',
    cardSummary: 'Equipped with a decompression table and used during dives by Hannes Keller.'
  },
  'seiko-bell-matic': {
    displaySummary: 'A central rotor automatically winds the timekeeping side; the alarm remains hand-wound.',
    hook: 'Automatic alarm wristwatches move from bumper winding to a central rotor.',
    cardSummary: 'A central rotor automatically winds the timekeeping side; the alarm remains hand-wound.',
    displayNote: 'Automatic alarm wristwatches move from bumper winding to a central rotor.'
  },
  'omega-memomatic': {
    displayTopic: 'Power & setting',
    displaySummary: 'One barrel powers the watch; alarm time can be set to the minute.',
    hook: 'Even the alarm’s power is automatically wound.',
    cardSummary: 'One barrel powers both timekeeping and alarm, with alarm time adjustable to the minute.'
  },
  'as5007-5008': {
    displayTopic: 'Automatic winding',
    displaySummary: 'The rotor winds both the timekeeping and alarm barrels.',
    hook: 'Both barrels are automatically wound by the rotor.',
    cardSummary: 'In the 5007 / 5008, the rotor winds both the timekeeping barrel and the alarm barrel.'
  },
  'citizen-criston-lc-alarm': {
    displayTopic: 'Electronics',
    displaySummary: 'Quartz oscillator and LCD display; piezoelectric element and titanium diaphragm.',
    hook: 'The world’s first wristwatch with a digital alarm function.',
    cardSummary: 'Quartz oscillator and LCD display. The alarm uses a piezoelectric element and titanium diaphragm.'
  }
};

const germanCardText: Record<string, Record<string, string>> = {
  'eterna-1914': {
    displayTopic: 'Miniaturisierung',
    displaySummary: 'Cal. 68. Etwa 13 Linien, ein Federhaus.',
    hook: 'Die erste in Serie gefertigte Wecker-Armbanduhr.',
    cardSummary: 'Etwa 13 Linien, ein Federhaus.\nEin Hammer schlägt auf eine Glocke am Gehäuseboden.'
  },
  'vulcain-cricket': {
    displayTopic: 'Akustik',
    displaySummary: 'Akustikkonstruktion mit doppeltem Gehäuseboden.',
    cardSummary: 'Ein doppelter Gehäuseboden verband Lautstärke mit Wasserdichtigkeit. Bekannt ist die Cricket auch für ihre Verbindung zu US-Präsidenten.'
  },
  'as1475': {
    displayTopic: 'Serienfertigung',
    displaySummary: 'Ein Weckerkaliber für die Großserie.',
    hook: 'Das am weitesten verbreitete Weckerkaliber.',
    cardSummary: 'Von 1954 bis 1970 entstanden rund 780.000 Stück; einschließlich der Ableitungen etwa 1,4 Millionen.'
  },
  'memovox-automatic': {
    displaySummary: 'Hammerautomatik für das Gehwerk; der Wecker bleibt handaufgezogen.',
    hook: 'Die weltweit erste automatische Wecker-Armbanduhr.',
    cardSummary: 'Das Gehwerk wird automatisch aufgezogen; die Weckerfeder weiterhin von Hand.',
    displayNote: 'Die weltweit erste automatische Wecker-Armbanduhr.'
  },
  'vulcain-golden-voice': {
    displayTopic: 'Miniaturisierung',
    displaySummary: 'Eine Wecker-Armbanduhr für Damen.',
    hook: 'Die weltweit erste Wecker-Armbanduhr für Damen.',
    cardSummary: 'Ein 19,7-mm-Werk mit zwei Federhäusern und Goldmembran.'
  },
  'jlc-parking': {
    displayTopic: 'Parkzeit',
    displaySummary: 'Eine Skala für die Parkzeit.',
    hook: 'Die erste Wecker-Armbanduhr zur Erinnerung an die Parkzeit.',
    cardSummary: 'Eine Memovox mit zusätzlicher Parkzeitskala auf der inneren Scheibe.'
  },
  'vulcain-cricket-nautical': {
    displayTopic: 'Tauchen',
    displaySummary: 'Eine Wecker-Armbanduhr mit Dekompressionstabelle.',
    hook: 'Ein unter Wasser hörbarer Wecker für die Taucheruhr.',
    cardSummary: 'Mit Dekompressionstabelle; auch bei Tauchgängen von Hannes Keller verwendet.'
  },
  'seiko-bell-matic': {
    displaySummary: 'Ein Zentralrotor zieht das Gehwerk automatisch auf; der Wecker bleibt handaufgezogen.',
    hook: 'Bei Wecker-Armbanduhren führt die Automatik von der Hammerautomatik zum Zentralrotor.',
    cardSummary: 'Ein Zentralrotor zieht das Gehwerk automatisch auf; der Wecker bleibt handaufgezogen.',
    displayNote: 'Bei Wecker-Armbanduhren führt die Automatik von der Hammerautomatik zum Zentralrotor.'
  },
  'omega-memomatic': {
    displayTopic: 'Antrieb & Einstellung',
    displaySummary: 'Ein Federhaus als Energiequelle; Alarmzeit minutengenau einstellbar.',
    hook: 'Auch die Energie für den Wecker wird automatisch aufgezogen.',
    cardSummary: 'Ein Federhaus treibt Gehwerk und Wecker an; die Alarmzeit lässt sich minutengenau einstellen.'
  },
  'as5007-5008': {
    displayTopic: 'Automatikaufzug',
    displaySummary: 'Der Rotor zieht sowohl das Gehwerk- als auch das Wecker-Federhaus auf.',
    hook: 'Beide Federhäuser werden über den Rotor automatisch aufgezogen.',
    cardSummary: 'Bei 5007 / 5008 zieht der Rotor sowohl das Gehwerk- als auch das Wecker-Federhaus auf.'
  },
  'citizen-criston-lc-alarm': {
    displayTopic: 'Elektronik',
    displaySummary: 'Quarzoszillator und LCD-Anzeige; Piezoelement und Titanmembran.',
    hook: 'Die weltweit erste Armbanduhr mit digitaler Alarmfunktion.',
    cardSummary: 'Quarzoszillator und LCD-Anzeige. Der Alarm arbeitet mit Piezoelement und Titanmembran.'
  }
};

export const englishHistoryContent = {
  ...historyContent,
  hero: {
    kicker: [
      'Not just to read the time,',
      'but to be told when the time you set has arrived.'
    ]
  },
  before: {
    ...historyContent.before,
    title: 'Alarms before wristwatches.',
    teaser: 'Bells, clock towers, portable clocks.',
    intro: [
      'Portable alarm clocks existed by the sixteenth century, and by the nineteenth century alarm and reminder mechanisms were also used in pocket watches and jewellery watches.',
      'By the end of the nineteenth century, small watches were being worn on the wrist in leather holders and similar fittings. In the 1910s, the next step was to design the alarm as a wristwatch from the outset.'
    ]
  },
  era1910s: {
    ...historyContent.era1910s,
    title: 'Bringing the alarm down to wristwatch size.',
    teaser: 'The alarm moves to the wrist.',
    intro: 'In 1908, Eterna patented a mechanism that allowed the alarm time to be set from either the clockwise or counter-clockwise direction (Patent 42,203).\n\nBuilding on that patented mechanism, Eterna presented an alarm wristwatch fitted with Cal. 68 at the Swiss National Exhibition in Bern in 1914.',
    cards: translateCards(historyContent.era1910s.cards, englishCardText)
  },
  era1940s: {
    ...historyContent.era1940s,
    title: 'Solving the contradiction between sealing and volume.',
    teaser: 'Mechanical alarm wristwatches enter mass production.',
    intro: 'In a wristwatch, the more completely the case is closed to protect the mechanism from water and dust, the harder it becomes for the alarm sound to escape.\nThe 1947 Vulcain Cricket used a double-back acoustic construction to combine audibility on the wrist with water resistance.',
    cards: translateCards(historyContent.era1940s.cards, englishCardText)
  },
  era1950s: {
    ...historyContent.era1950s,
    title: 'Different needs, different answers.',
    teaser: 'Mass production, miniaturization, automatic winding and broader uses.',
    intro: 'In the 1950s, the roles expected of an alarm wristwatch expanded: mass production, miniaturization, automatic winding, parking-time management and different ways of alerting the people around the wearer.\nBrands answered those needs with different approaches to power, acoustics and operation.',
    cards: translateCards(historyContent.era1950s.cards, englishCardText)
  },
  era1960s: {
    ...historyContent.era1960s,
    title: 'Uses and mechanisms expand.',
    teaser: 'Diving, automatic winding and finer alarm setting.',
    intro: 'In the 1960s, alarms were combined with diver’s watches and automatic winding.\nNew arrangements also appeared in how the mechanism was powered and how the alarm time was set.',
    cards: translateCards(historyContent.era1960s.cards, englishCardText)
  },
  electronic: {
    ...historyContent.electronic,
    title: 'Automatic winding matures, and electronics arrive.',
    teaser: 'Toward the electronic alarm.',
    body: [
      'In the 1970s, automatic winding for mechanical alarms continued to evolve, while electronic alarms using circuits and sound-producing elements also spread to the wristwatch.'
    ],
    cards: translateCards(historyContent.electronic.cards, englishCardText)
  },
  current: {
    ...historyContent.current,
    title: 'Where things stand today.'
  },
  sources: {
    summary: 'References & Sources',
    items: historyContent.sources.items.map((item) => ({
      ...item,
      text: ({
        '1': 'Michael Philip Horlbeck, The Alarm Wristwatch: The History of an Undervalued Feature, Schiffer Publishing, 2007.',
        '2': 'Leonhard Beitl, Alarm am Arm, Historische Uhrenbücher.',
        '3': 'Jaeger-LeCoultre, The Collectibles / Memovox heritage materials.',
        '4': 'Citizen Watch, historical models “Alarm” (1958) / “Crystron LC Alarm” (1976).',
        '5': 'Vulcain, official historical materials for Cricket / Golden Voice / Cricket Nautical.',
        '6': 'Seiko, official historical materials for Business Bell / alarm watches; Vintage Seiko World Time, Bell-Matic image study (earliest recorded Cal. 4006-7000: November 1966); Horlbeck and Beitl for specialist context.',
        '7': 'Supporting sources for the prehistory section: The Metropolitan Museum of Art / The British Museum / Deutsches Uhrenmuseum / Musée international d’horlogerie / The Worshipful Company of Clockmakers.'
      } as Record<string, string>)[item.id] ?? item.text
    }))
  }
};

export const germanHistoryContent = {
  ...historyContent,
  hero: {
    kicker: [
      'Nicht nur die Zeit ablesen,',
      'sondern zur eingestellten Zeit benachrichtigt werden.'
    ]
  },
  before: {
    ...historyContent.before,
    title: 'Wecker vor der Armbanduhr.',
    teaser: 'Glocken, Uhrtürme, tragbare Uhren.',
    intro: [
      'Tragbare Wecker gab es bereits im 16. Jahrhundert; im 19. Jahrhundert fanden sich Weck- und Erinnerungsmechanismen auch in Taschenuhren und Schmuckuhren.',
      'Gegen Ende des 19. Jahrhunderts wurden kleine Uhren etwa in Lederhaltern am Handgelenk getragen. In den 1910er-Jahren folgte der Schritt, den Wecker von Anfang an als Armbanduhr zu konstruieren.'
    ]
  },
  era1910s: {
    ...historyContent.era1910s,
    title: 'Den Wecker auf Armbanduhrgröße bringen.',
    teaser: 'Der Wecker wandert ans Handgelenk.',
    intro: '1908 patentierte Eterna einen Mechanismus, bei dem sich die Alarmzeit sowohl im als auch gegen den Uhrzeigersinn einstellen ließ (Patent 42,203).\n\nAuf Grundlage dieses patentierten Mechanismus stellte Eterna 1914 auf der Schweizerischen Landesausstellung in Bern eine Wecker-Armbanduhr mit Cal. 68 vor.',
    cards: translateCards(historyContent.era1910s.cards, germanCardText)
  },
  era1940s: {
    ...historyContent.era1940s,
    title: 'Den Widerspruch zwischen Abdichtung und Lautstärke lösen.',
    teaser: 'Mechanische Wecker-Armbanduhren gehen in Serie.',
    intro: 'Je dichter das Gehäuse einer Armbanduhr geschlossen wird, um das Werk vor Wasser und Staub zu schützen, desto schwieriger gelangt der Alarmton nach außen.\nDie Vulcain Cricket von 1947 verband mit einer Akustikkonstruktion aus doppeltem Gehäuseboden die Hörbarkeit am Handgelenk mit Wasserdichtigkeit.',
    cards: translateCards(historyContent.era1940s.cards, germanCardText)
  },
  era1950s: {
    ...historyContent.era1950s,
    title: 'Verschiedene Anforderungen, verschiedene Antworten.',
    teaser: 'Serienfertigung, Miniaturisierung, Automatik und neue Anwendungen.',
    intro: 'In den 1950er-Jahren erweiterten sich die Anforderungen an Wecker-Armbanduhren: Serienfertigung, Miniaturisierung, automatischer Aufzug, Parkzeitkontrolle und unterschiedliche Arten, die Umgebung zu benachrichtigen.\nDie Hersteller beantworteten diese Anforderungen mit verschiedenen Lösungen für Energieversorgung, Akustik und Bedienung.',
    cards: translateCards(historyContent.era1950s.cards, germanCardText)
  },
  era1960s: {
    ...historyContent.era1960s,
    title: 'Anwendungen und Mechanismen werden vielfältiger.',
    teaser: 'Tauchen, Automatik und feinere Alarmzeiteinstellung.',
    intro: 'In den 1960er-Jahren wurden Wecker mit Taucheruhren und automatischem Aufzug kombiniert.\nAuch bei Energieversorgung und Einstellung der Alarmzeit entstanden neue Konstruktionen.',
    cards: translateCards(historyContent.era1960s.cards, germanCardText)
  },
  electronic: {
    ...historyContent.electronic,
    title: 'Die Automatik reift, die Elektronik kommt.',
    teaser: 'Hin zum elektronischen Alarm.',
    body: [
      'In den 1970er-Jahren entwickelte sich der automatische Aufzug mechanischer Wecker weiter. Gleichzeitig verbreiteten sich elektronische Alarmfunktionen mit Schaltungen und elektrischen Schallgebern in Armbanduhren.'
    ],
    cards: translateCards(historyContent.electronic.cards, germanCardText)
  },
  current: {
    ...historyContent.current,
    title: 'Der heutige Stand.'
  },
  sources: {
    summary: 'Literatur & Quellen',
    items: historyContent.sources.items.map((item) => ({
      ...item,
      text: ({
        '1': 'Michael Philip Horlbeck, The Alarm Wristwatch: The History of an Undervalued Feature, Schiffer Publishing, 2007.',
        '2': 'Leonhard Beitl, Alarm am Arm, Historische Uhrenbücher.',
        '3': 'Jaeger-LeCoultre, The Collectibles / Memovox-Historienmaterialien.',
        '4': 'Citizen Watch, historische Modelle „Alarm“ (1958) / „Crystron LC Alarm“ (1976).',
        '5': 'Vulcain, offizielle historische Materialien zu Cricket / Golden Voice / Cricket Nautical.',
        '6': 'Seiko, offizielle historische Materialien zu Business Bell / Wecker-Armbanduhren; Vintage Seiko World Time, Bell-Matic-Bildstudie (früheste dokumentierte Cal. 4006-7000: November 1966); Horlbeck und Beitl für den fachlichen Kontext.',
        '7': 'Ergänzende Quellen zur Vorgeschichte: The Metropolitan Museum of Art / The British Museum / Deutsches Uhrenmuseum / Musée international d’horlogerie / The Worshipful Company of Clockmakers.'
      } as Record<string, string>)[item.id] ?? item.text
    }))
  }
};
