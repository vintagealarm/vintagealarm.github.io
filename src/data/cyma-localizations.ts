import type { EnglishFullResearch } from './en-watch-full-research';
import { englishFullResearchBySlug } from './en-watch-full-research';
import type { GermanWatchEntry } from './de-watch-entry';
import { germanWatchEntries } from './de-watch-entry';

type LinkedEnglishFullResearch = Omit<EnglishFullResearch, 'deepDive'> & {
  deepDive: Array<EnglishFullResearch['deepDive'][number] & {
    linkLabel?: string;
    linkUrl?: string;
  }>;
};

type LinkedGermanWatchEntry = Omit<GermanWatchEntry, 'deepDive'> & {
  deepDive: Array<GermanWatchEntry['deepDive'][number] & {
    linkLabel?: string;
    linkUrl?: string;
  }>;
};

export const englishCymaFullResearch: LinkedEnglishFullResearch = {
  title: 'Cyma Time-O-Vox 18K Chronomètre — One-Barrel Alarm Chronometer | VINTAGE ALARM',
  description: 'Cyma Time-O-Vox 18K Chronomètre with Cal. R.464: one barrel shared by timekeeping and alarm, two pushers, Wippe switching mechanism, open-worked gold lugs, specimen observations, original alarm sound and cited sources.',
  specimenGallery: [
    {
      image: '/images/cyma-time-o-vox/gallery/cyma-front.jpg',
      label: 'Front — wrist shot',
      alt: 'Cyma Time-O-Vox 18K Chronomètre specimen, front wrist shot'
    },
    {
      image: '/images/cyma-time-o-vox/gallery/cyma-side-pushers.jpg',
      label: 'Side — two pushers',
      alt: 'Cyma Time-O-Vox 18K Chronomètre side view with crown and two pushers'
    },
    {
      image: '/images/cyma-time-o-vox/gallery/cyma-lug-closeup.jpg',
      label: 'Open-worked lug',
      alt: 'Cyma Time-O-Vox 18K Chronomètre open-worked lug close-up'
    },
    {
      image: '/images/cyma-time-o-vox/gallery/cyma-caseback-inside.jpg',
      label: 'Inside caseback markings',
      alt: 'Cyma Time-O-Vox 18K Chronomètre inside caseback with 18K 0.750 Weber markings'
    },
    {
      image: '/images/cyma-time-o-vox/gallery/cyma-movement-r464.jpg',
      label: 'Movement — Cal. R.464',
      alt: 'Cyma Time-O-Vox Cal. R.464 movement'
    }
  ],
  deepDive: [
    {
      number: '01',
      title: 'About CYMA',
      paragraphs: [
        'In 1891, Henri-Frédéric Sandoz began watch production in Tavannes, Switzerland. After cooperation with Schwob Frères, the “CYMA Tavannes Watch Co.” trademark was registered in 1904.',
        'In the early twentieth century, Tavannes / CYMA developed ultra-thin movements and precision watches. By 1910 production had grown to about 2,500 watches per day, and by 1913 the company had become one of Switzerland’s major watch factories with about 1,200 employees. A 1921 record also notes the introduction of a new manufacturing method intended to improve parts interchangeability.',
        'In the 1950s, CYMA introduced the Time-O-Vox with its in-house alarm movement, Cal. R.464. Its single barrel, two pushers and one crown connected through a switching mechanism gave it a configuration unlike many contemporary alarm wristwatches.'
      ],
      citationRefs: ['3', '3', '1,3']
    },
    {
      number: '02',
      title: 'The contradiction of an alarm and a chronometer',
      subtitle: 'Putting an alarm into a watch built around precision',
      paragraphs: [
        'The “contradiction” here does not mean that the watch was tested as a chronometer while its alarm was sounding. It refers to placing an alarm mechanism inside a watch that also pursued precision.',
        'Alarm am Arm records only a very small number of alarm wristwatches known as chronometers in the period: Cyma, the Fortis Manager and one Vulcain model.'
      ],
      citationRefs: ['', '2']
    },
    {
      number: '03',
      title: 'Two pushers and the Wippe',
      subtitle: 'Switching what the crown is connected to',
      paragraphs: [
        'The first thing that stands out on Cal. R.464 is the pair of pushers above and below the crown. They are not simply alarm ON/OFF buttons.',
        'The two pushers are interlinked: pressing one pushes the other outward. Pressing the upper pusher selects winding, the centered position leaves the alarm armed, and pressing the lower pusher selects alarm-time setting. Time setting is performed by pressing the upper pusher and pulling the crown.',
        'The switching is handled by a mechanism centred on the Wippe, or rocking lever. Depending on the pusher and crown position, it directs the crown to winding, time setting or alarm-time setting. One crown is therefore reassigned to different functions as needed.'
      ],
      citationRefs: ['1', '1', '1'],
      images: [
        {
          src: '/images/cyma-time-o-vox/ムーブメント.jpg',
          caption: 'Overall view of Cal. R.464. The crown and two pushers are aligned on the right side of the case.',
          alt: 'Cyma Time-O-Vox Cal. R.464 movement with crown and two pushers',
          afterParagraph: 1
        },
        {
          src: '/images/cyma-time-o-vox/wipe.jpg',
          caption: 'The switching mechanism around the Wippe and its relationship to the upper and lower pushers. The internal connection changes with pusher operation.',
          alt: 'Cyma Cal. R.464 switching mechanism with Wippe and upper and lower pushers',
          afterParagraph: 3
        }
      ]
    },
    {
      number: '04',
      title: 'A single-barrel alarm',
      subtitle: 'Timekeeping and alarm share the same power source',
      paragraphs: [
        'In the R.464, both timekeeping and the alarm are driven from one barrel. The barrel houses the mainspring that powers the watch.',
        'Many alarm wristwatches use separate barrels for timekeeping and alarm, but the R.464 shares a single power source between the two functions.',
        'When the alarm sounds, it also consumes energy that would otherwise keep the watch running. The R.464 therefore incorporates a mechanism that limits the alarm duration. The reference material gives a duration of roughly 8 to 10 seconds.',
        'On the specimen shown here, a real-watch video confirms that the timing wheel controlling the alarm runs for about eight seconds. Because this movement is difficult to understand from a still image, the video is also published on X.',
        'On this specimen, one alarm operation was measured to consume roughly nine hours of power reserve.'
      ],
      citationRefs: ['1', '1,3', '1', '6', '5'],
      linkLabel: 'Watch the timing wheel run for about eight seconds on X',
      linkUrl: 'https://x.com/Rimacroissant/status/2085277918473883977?s=20'
    },
    {
      number: '05',
      title: 'The crown does not rotate while the alarm sounds',
      subtitle: 'The winding side is disconnected during alarm operation',
      paragraphs: [
        'Many single-barrel alarm mechanisms allow the crown to rotate along with the alarm train while the alarm is sounding.',
        'On the R.464, the connection to the winding mechanism is disengaged when the alarm operates. The crown therefore remains stationary while the alarm is sounding.'
      ],
      citationRefs: ['3', '1,3']
    },
    {
      number: '06',
      title: 'Time-O-Vox cases and lugs',
      paragraphs: [
        'The Time-O-Vox is documented with multiple case configurations as well as variations in the movement’s presentation.',
        'The solid-gold model illustrated in Alarm am Arm has a 34 mm 14K case. Its most distinctive feature is a pair of fully open-worked lugs extending strongly from the case, and this solid-gold version is presented as a Chronomètre.',
        'A stainless-steel model from around 1955 has a very similar overall lug outline, but the openings are not complete.',
        'Another stainless-steel version retains the same general family of shapes while using completely smooth lugs without the open-worked treatment.',
        'By around 1957, the case design had changed further, with Time-O-Vox examples appearing in gold-plated cases with more conventional lugs.',
        'At minimum, the sources therefore document a solid-gold version with fully open-worked lugs, stainless-steel versions with partial or no open-work, and a later version with conventional lugs.',
        'The OWNER’S NOTE specimen shown here is recorded in its purchase documents as circa 1956, 34 mm, 18K yellow gold, with a case made by Weber & Cie.',
        'It is therefore a documented 18K example with the same family of open-worked lugs seen on the 14K specimen in the literature.'
      ],
      citationRefs: ['2,3', '2', '2', '2', '2', '2,3', '4', '2,4']
    }
  ],
  sourceMeta: [
    { id: '1', type: 'reference' },
    { id: '2', type: 'reference' },
    { id: '3', type: 'reference' },
    { id: '4', type: 'provenance' },
    { id: '5', type: 'owner' },
    { id: '6', type: 'owner' }
  ],
  sources: [
    'B. Humbert, Die Armband-Weckeruhr, Calibre TIME-O-VOX No. 464 — Cal. R.464 single barrel, two pushers, Wippe, wheel train and alarm-stop mechanism.',
    'Leonhard Beitl, Alarm am Arm (2009), pp. 134–136 — Cyma Time-O-Vox solid-gold and stainless-steel cases, lug configurations and chronometer example.',
    'Michael Philip Horlbeck, The Alarm Wristwatch (Schiffer Publishing, 2007), Cyma section, pp. 96–99.',
    'Chrono24 purchase certificate / Plus Ultra AG invoice — Cyma Time-O-Vox Chronomètre ref. 1283, 18K yellow gold, circa 1956.',
    'Specimen measurement record — one alarm operation consumed roughly nine hours of power reserve.',
    'Specimen video — the timing wheel runs for about eight seconds during alarm operation.'
  ],
  related: {
    href: '/en/pierce-duofon/',
    name: 'PIERCE DUOFON',
    reason: 'Two barrels and two selectable alarm levels — a different answer from the same era.'
  }
};

export const germanCymaEntry: LinkedGermanWatchEntry = {
  slug: 'cyma-time-o-vox',
  title: 'Cyma Time-O-Vox 18K Chronomètre — Wecker mit einem Federhaus | VINTAGE ALARM',
  description: 'Cyma Time-O-Vox 18K Chronomètre mit Cal. R.464: ein gemeinsames Federhaus für Gehwerk und Wecker, zwei Drücker, Wippe-Umschaltung, durchbrochene Goldanstöße, Beobachtungen am Exemplar, Original-Alarmton und Quellen.',
  indexBlurb: '18K, Chronomètre und Wecker in einem Werk mit nur einem Federhaus — ein Gegenentwurf zu den üblichen Zwei-Federhaus-Weckern.',
  catch: ['Ein goldener Chronomètre, der klingelt.'],
  ownersNote: {
    lead: [
      'Ein goldener Chronomètre, der klingelt.',
      'Von vorn eine Dresswatch.',
      'Von der Seite fast ein Chronograph.',
      'Trotz Komplikation erstaunlich flach.',
      'Und dazu: Wecker und Chronomètre.',
      'Voller Widersprüche.',
      'Ein Extrempunkt der Wecker-Armbanduhr.'
    ],
    guideTitle: 'Kurzanleitung',
    guide: [
      '① Aufziehen — oberen Drücker drücken und die Krone drehen',
      '② Uhrzeit einstellen — oberen Drücker drücken, Krone herausziehen und drehen',
      '③ Alarmzeit einstellen — unteren Drücker drücken und die Krone drehen',
      '④ Alarm EIN/AUS — beide Drücker in Mittelstellung = EIN; einen der beiden Drücker drücken = AUS',
      'Die Alarmzeit lässt sich in beide Richtungen einstellen.',
      'Wenn die Genauigkeit besonders wichtig ist, wird die Einstellung gegen den Uhrzeigersinn empfohlen.'
    ],
    noteTitle: 'NOTE',
    note: [
      'In zeitgenössischen Unterlagen waren Wecker-Armbanduhren mit der Bezeichnung Chronomètre äußerst selten.',
      'Die Time-O-Vox treibt Gehwerk und Wecker aus einem einzigen Federhaus an; das Auslösen des Alarms verbraucht damit auch Energie des Gehwerks.',
      'Trotzdem steht auf dem Zifferblatt Chronomètre.',
      'Dazu kam sogar ein eigens gestaltetes Massivgoldgehäuse mit durchbrochenen Anstößen.'
    ]
  },
  spec: {
    era: 'um 1956',
    caseSize: '34 mm',
    caliber: 'Cyma R.464',
    jewels: '17 Steine',
    frequency: '18.000 A/h',
    barrels: '1 Federhaus',
    winding: 'Handaufzug',
    acoustic: 'Gong',
    notes: '18K Gelbgold, Chronomètre-Zifferblatt, zwei Drücker, durchbrochene Anstöße'
  },
  specimenGallery: [
    {
      image: '/images/cyma-time-o-vox/gallery/cyma-front.jpg',
      label: 'Vorderseite — am Handgelenk',
      alt: 'Cyma Time-O-Vox 18K Chronomètre, gezeigtes Exemplar, Vorderseite am Handgelenk'
    },
    {
      image: '/images/cyma-time-o-vox/gallery/cyma-side-pushers.jpg',
      label: 'Seite — zwei Drücker',
      alt: 'Cyma Time-O-Vox 18K Chronomètre, Seitenansicht mit Krone und zwei Drückern'
    },
    {
      image: '/images/cyma-time-o-vox/gallery/cyma-lug-closeup.jpg',
      label: 'Durchbrochener Anstoß',
      alt: 'Cyma Time-O-Vox 18K Chronomètre, Nahaufnahme eines durchbrochenen Anstoßes'
    },
    {
      image: '/images/cyma-time-o-vox/gallery/cyma-caseback-inside.jpg',
      label: 'Innenseite des Gehäusebodens',
      alt: 'Cyma Time-O-Vox 18K Chronomètre, Innenseite des Gehäusebodens mit 18K-, 0.750- und Weber-Punzen'
    },
    {
      image: '/images/cyma-time-o-vox/gallery/cyma-movement-r464.jpg',
      label: 'Werk — Cal. R.464',
      alt: 'Werk der Cyma Time-O-Vox, Cal. R.464'
    }
  ],
  deepDive: [
    {
      number: '01',
      title: 'Über CYMA',
      paragraphs: [
        '1891 begann Henri-Frédéric Sandoz im schweizerischen Tavannes mit der Uhrenfertigung. Nach der Zusammenarbeit mit Schwob Frères wurde 1904 die Marke „CYMA Tavannes Watch Co.“ eingetragen.',
        'Zu Beginn des 20. Jahrhunderts entwickelte Tavannes / CYMA ultraflache Werke und Präzisionsuhren. 1910 war die Produktion auf etwa 2.500 Uhren pro Tag angewachsen; 1913 gehörte das Unternehmen mit rund 1.200 Beschäftigten zu den großen Schweizer Uhrenfabriken. Für 1921 ist außerdem die Einführung einer neuen Fertigungsmethode dokumentiert, die die Austauschbarkeit von Teilen verbessern sollte.',
        'In den 1950er-Jahren brachte CYMA die Time-O-Vox mit dem eigenen Weckerwerk Cal. R.464 heraus. Ein Federhaus, zwei Drücker und eine Krone, verbunden über einen Umschaltmechanismus, ergaben eine Konstruktion, die sich von vielen zeitgenössischen Wecker-Armbanduhren unterschied.'
      ],
      citationRefs: ['3', '3', '1,3']
    },
    {
      number: '02',
      title: 'Der Widerspruch aus Wecker und Chronometer',
      subtitle: 'Ein Präzisionsanspruch mit eingebautem Alarm',
      paragraphs: [
        'Mit „Widerspruch“ ist hier nicht gemeint, dass die Uhr während eines laufenden Alarms als Chronometer geprüft wurde. Gemeint ist die Verbindung eines Präzisionsanspruchs mit einem eingebauten Weckermechanismus.',
        'Alarm am Arm nennt für diese Zeit nur sehr wenige als Chronometer bekannte Wecker-Armbanduhren: Cyma, die Fortis Manager und ein Modell von Vulcain.'
      ],
      citationRefs: ['', '2']
    },
    {
      number: '03',
      title: 'Zwei Drücker und die Wippe',
      subtitle: 'Die Verbindung der Krone wird umgeschaltet',
      paragraphs: [
        'Am Cal. R.464 fallen zuerst die beiden Drücker ober- und unterhalb der Krone auf. Sie sind nicht einfach nur EIN/AUS-Tasten für den Wecker.',
        'Die beiden Drücker sind miteinander gekoppelt: Wird einer hineingedrückt, kommt der andere heraus. Der obere Drücker wählt den Aufzug, die Mittelstellung hält den Wecker bereit, und der untere Drücker wählt die Alarmzeiteinstellung. Zum Stellen der Uhrzeit wird der obere Drücker hineingedrückt und die Krone herausgezogen.',
        'Diese Umschaltung übernimmt ein Mechanismus um die Wippe. Je nach Stellung von Drückern und Krone wird die Kraft der Krone auf Aufzug, Zeigerstellung oder Weckerzeigerstellung geleitet. Eine Krone wird damit je nach Bedarf für verschiedene Funktionen eingesetzt.'
      ],
      citationRefs: ['1', '1', '1'],
      images: [
        {
          src: '/images/cyma-time-o-vox/ムーブメント.jpg',
          caption: 'Gesamtansicht des Cal. R.464. Rechts am Gehäuse liegen Krone sowie oberer und unterer Drücker.',
          alt: 'Cyma Time-O-Vox Cal. R.464 mit Krone und zwei Drückern',
          afterParagraph: 1
        },
        {
          src: '/images/cyma-time-o-vox/wipe.jpg',
          caption: 'Umschaltmechanismus mit Wippe und die Lage der beiden Drücker. Mit der Drückerbetätigung ändert sich die interne Verbindung.',
          alt: 'Cyma Cal. R.464, Umschaltmechanismus mit Wippe und zwei Drückern',
          afterParagraph: 3
        }
      ]
    },
    {
      number: '04',
      title: 'Ein Wecker mit nur einem Federhaus',
      subtitle: 'Gehwerk und Wecker teilen sich die Energie',
      paragraphs: [
        'Beim R.464 werden Gehwerk und Wecker aus einem einzigen Federhaus angetrieben. Im Federhaus sitzt die Zugfeder, die die Uhr mit Energie versorgt.',
        'Viele Wecker-Armbanduhren besitzen getrennte Federhäuser für Gehwerk und Wecker; beim R.464 teilen sich beide Funktionen dagegen eine einzige Energiequelle.',
        'Wenn der Alarm ausgelöst wird, verbraucht er damit auch Energie, die sonst dem Gehwerk zur Verfügung stünde. Deshalb besitzt das R.464 eine Einrichtung zur Begrenzung der Alarmdauer. Die Literatur nennt ungefähr 8 bis 10 Sekunden.',
        'Beim hier gezeigten Exemplar ist im Video zu sehen, dass das Steuerrad für die Alarmdauer etwa acht Sekunden lang arbeitet. Da diese Bewegung auf einem Standbild schwer zu erkennen ist, ist das Video zusätzlich auf X veröffentlicht.',
        'Beim hier gezeigten Exemplar verbrauchte ein Alarmvorgang in der Messung ungefähr neun Stunden Gangreserve.'
      ],
      citationRefs: ['1', '1,3', '1', '6', '5'],
      linkLabel: 'Das Steuerrad etwa acht Sekunden lang auf X ansehen',
      linkUrl: 'https://x.com/Rimacroissant/status/2085277918473883977?s=20'
    },
    {
      number: '05',
      title: 'Die Krone dreht sich während des Alarms nicht',
      subtitle: 'Während des Alarms wird die Aufzugsseite getrennt',
      paragraphs: [
        'Bei vielen Weckern mit nur einem Federhaus dreht sich während des Alarmablaufs auch die Krone mit.',
        'Beim R.464 wird beim Auslösen des Alarms die Verbindung zum Aufzugsmechanismus getrennt. Deshalb bleibt die Krone auch während des Klingelns stehen.'
      ],
      citationRefs: ['3', '1,3']
    },
    {
      number: '06',
      title: 'Gehäuse und Anstöße der Time-O-Vox',
      paragraphs: [
        'Für die Time-O-Vox sind neben dem Werk mehrere unterschiedliche Gehäuseausführungen dokumentiert.',
        'Das in Alarm am Arm gezeigte Massivgoldmodell besitzt ein 34-mm-Gehäuse aus 14K Gold. Besonders auffällig sind die weit aus dem Gehäuse herausgezogenen, vollständig durchbrochenen Anstöße; diese Massivgoldausführung wird als Chronomètre vorgestellt.',
        'Bei einem Edelstahlmodell um 1955 ähnelt die äußere Form der Anstöße stark der Goldausführung, die Durchbrechung ist jedoch nicht vollständig.',
        'Eine weitere Edelstahlausführung behält die gleiche Formfamilie bei, besitzt aber vollständig glatte Anstöße ohne Durchbruch.',
        'Um 1957 verändert sich die Gehäusegestaltung weiter; dokumentiert sind nun auch vergoldete Time-O-Vox-Gehäuse mit konventioneller geformten Anstößen.',
        'Mindestens dokumentiert sind damit eine Massivgoldausführung mit vollständig durchbrochenen Anstößen, Edelstahlvarianten mit teilweiser oder ohne Durchbrechung sowie eine spätere Ausführung mit konventionellen Anstößen.',
        'Das hier gezeigte OWNER’S-NOTE-Exemplar ist in den Kaufunterlagen mit circa 1956, 34 mm, 18K Gelbgold und einem Gehäuse von Weber & Cie dokumentiert.',
        'Es ist damit ein dokumentiertes 18K-Beispiel mit derselben Familie durchbrochener Anstöße wie das 14K-Exemplar in der Literatur.'
      ],
      citationRefs: ['2,3', '2', '2', '2', '2', '2,3', '4', '2,4']
    }
  ],
  sourceMeta: [
    { id: '1', type: 'reference' },
    { id: '2', type: 'reference' },
    { id: '3', type: 'reference' },
    { id: '4', type: 'provenance' },
    { id: '5', type: 'owner' },
    { id: '6', type: 'owner' }
  ],
  sources: [
    'B. Humbert, Die Armband-Weckeruhr, Calibre TIME-O-VOX No. 464 — ein Federhaus, zwei Drücker, Wippe, Räderwerk und Begrenzung der Alarmdauer.',
    'Leonhard Beitl, Alarm am Arm (2009), S. 134–136 — Cyma Time-O-Vox in Massivgold und Edelstahl, Anstoßvarianten und Chronometer-Beispiel.',
    'Michael Philip Horlbeck, The Alarm Wristwatch (Schiffer Publishing, 2007), Abschnitt Cyma, S. 96–99.',
    'Chrono24-Kaufzertifikat / Rechnung von Plus Ultra AG — Cyma Time-O-Vox Chronomètre Ref. 1283, 18K Gelbgold, circa 1956.',
    'Messprotokoll des gezeigten Exemplars — ein Alarmvorgang verbrauchte ungefähr neun Stunden Gangreserve.',
    'Video des gezeigten Exemplars — das Steuerrad arbeitet während des Alarmvorgangs ungefähr acht Sekunden.'
  ],
  related: {
    href: '/de/pierce-duofon/',
    hreflang: 'de',
    name: 'PIERCE DUOFON',
    reason: 'Zwei Federhäuser und zwei wählbare Alarmstufen — eine andere Antwort aus derselben Zeit.'
  }
};

export const englishFullResearchWithCyma = {
  ...englishFullResearchBySlug,
  'cyma-time-o-vox': englishCymaFullResearch
};

export const germanWatchEntriesWithCyma = {
  ...germanWatchEntries,
  'cyma-time-o-vox': germanCymaEntry
};
