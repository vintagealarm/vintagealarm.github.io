export type GermanWatchEntry = {
  slug: string;
  title: string;
  description: string;
  indexBlurb: string;
  catch: string[];
  ownersNote: {
    lead: string[];
    guideTitle: string;
    guide: string[];
    noteTitle: string;
    note: string[];
  };
  spec: {
    era: string;
    caseSize: string;
    caliber: string;
    jewels: string;
    frequency: string;
    barrels: string;
    winding: string;
    acoustic: string;
    notes: string;
  };
  specimenGallery: Array<{
    image: string;
    label: string;
    alt: string;
  }>;
  deepDive: Array<{
    number: string;
    title: string;
    subtitle?: string;
    paragraphs: string[];
    citationRefs: string[];
    mediaStyle?: string;
    images?: Array<{
      src: string;
      caption: string;
      alt: string;
      afterParagraph?: number;
      fullRow?: boolean;
    }>;
  }>;
  sourceMeta: Array<{ id: string; type: string }>;
  sources: string[];
  related: {
    href: string;
    hreflang: string;
    name: string;
    reason: string;
  };
};

export const germanWatchEntries: Record<string, GermanWatchEntry> = {
  'pierce-duofon': {
    slug: 'pierce-duofon',
    title: 'Pierce Duofon Cal. 135 — Zweistufiger mechanischer Alarm | VINTAGE ALARM',
    description: 'Pierce Duofon mit Cal. 135: zwei Federhäuser, wählbare WECKER-/SIGNAL-Modi, rot-weiße Anzeige, Modellentwicklung, Verbindung zur Gruen Duo-Tone, Fotos des Exemplars, Original-Alarmton und Quellen.',
    indexBlurb: 'Ein Vorläufer des Lautlosmodus!? Ein OOPArt der Benachrichtigungstechnik aus den 1950ern.',
    catch: [
      'Ein Vorläufer des Lautlosmodus!?',
      'Ein OOPArt der Benachrichtigungstechnik aus den 1950ern.'
    ],
    ownersNote: {
      lead: [
        'Ein Vorläufer des Lautlosmodus!?',
        'Ein OOPArt der Benachrichtigungstechnik aus den 1950ern.',
        'Selbst die Rücksicht beim Erinnern war komplett mechanisch.'
      ],
      guideTitle: 'Kurzanleitung',
      guide: [
        '① Aufziehen — Krone bei 3 Uhr: im Uhrzeigersinn = Gehwerk / gegen den Uhrzeigersinn = Wecker',
        '② Uhrzeit einstellen — Krone bei 3 Uhr bis zur zweiten Rastung ziehen und im Uhrzeigersinn drehen',
        '③ Alarmzeit einstellen — Krone bei 3 Uhr bis zur ersten Rastung ziehen und im Uhrzeigersinn drehen',
        '④ Alarmlautstärke wählen — Krone bei 4 Uhr etwa eine Vierteldrehung: im Uhrzeigersinn = WECKER (rot) / gegen den Uhrzeigersinn = SIGNAL (weiß)',
        '⑤ Alarm EIN/AUS — Krone bei 4 Uhr: herausziehen = EIN / hineindrücken = AUS'
      ],
      noteTitle: 'NOTE',
      note: [
        'Das Prinzip, je nach Situation zwischen einem hörbaren Ton und einer diskreten Benachrichtigung zu wählen, verbreitete sich erst von den späten 1980er- bis in die 1990er-Jahre, als Pager- und Mobiltelefonfunktionen allgemein üblich wurden.',
        'Unabhängig von dieser späteren Entwicklung hatte die Duofon in einer Armbanduhr der 1950er-Jahre bereits die „Distanz einer Benachrichtigung“ mechanisiert.',
        'Mit der Krone bei 4 Uhr wählt man den Ton; das kleine Fenster unter 6 Uhr zeigt die „Stimmfarbe“ der Uhr als Farbe.',
        'Für eine Wecker-Armbanduhr hatte sie den Zeitgeist der Zukunft viel zu früh erfasst.'
      ]
    },
    spec: {
      era: 'Anfang der 1960er-Jahre',
      caseSize: '36 mm',
      caliber: 'Pierce Cal. 135',
      jewels: '21 Steine',
      frequency: '18.000 A/h',
      barrels: '2 Federhäuser',
      winding: 'Handaufzug',
      acoustic: 'Gong',
      notes: 'WECKER-/SIGNAL-Umschaltung, rot-weißes Anzeigefenster unter 6 Uhr'
    },
    specimenGallery: [
      {
        image: '/images/pierce-duofon/gallery/pierce-duofon-wrist-front.jpg',
        label: 'Vorderseite — am Handgelenk',
        alt: 'Pierce Duofon, gezeigtes Exemplar, Vorderseite am Handgelenk'
      },
      {
        image: '/images/pierce-duofon/gallery/pierce-duofon-signal-white.jpg',
        label: 'SIGNAL — weiß / diskrete Seite',
        alt: 'Pierce Duofon im SIGNAL-Modus mit weißer Anzeige'
      },
      {
        image: '/images/pierce-duofon/gallery/pierce-duofon-wecker-red.jpg',
        label: 'WECKER — rot / laute Alarmseite',
        alt: 'Pierce Duofon im WECKER-Modus mit roter Anzeige'
      },
      {
        image: '/images/pierce-duofon/gallery/pierce-duofon-caseback.jpg',
        label: 'Gehäuseboden',
        alt: 'Gehäuseboden des gezeigten Pierce-Duofon-Exemplars'
      }
    ],
    deepDive: [
      {
        number: '01',
        title: 'Über Pierce',
        paragraphs: [
          'Pierce wurde 1888 von Léon Levi und seinen Brüdern in Biel/Bienne in der Schweiz gegründet. Anfangs bezog das Unternehmen Werke von externen Lieferanten; Anfang der 1930er-Jahre begann es jedoch, eigene Werke zu entwickeln und herzustellen.',
          'Zu den eigenen Werken gehörten die 13-linigen Chronographenkaliber 130 und 134. In den 1950er-Jahren führte Pierce außerdem die Correctomatic ein. Bei der Correctomatic bewegen zwei Drücker am Gehäuse den Rücker, um den Gang der Uhr schneller oder langsamer einzustellen.',
          'Auch das in der Duofon verwendete Kaliber 135 wurde von Pierce selbst entwickelt.'
        ],
        citationRefs: ['4', '4', '4']
      },
      {
        number: '02',
        title: 'Pierce Kaliber 135',
        subtitle: 'Warum Rot und Weiß den Alarmklang verändern',
        paragraphs: [
          'Bei der Duofon wird mit der Krone/Drücker-Kombination bei 4 Uhr zwischen WECKER und SIGNAL umgeschaltet. Der gewählte Zustand wird im kleinen Fenster unterhalb von 6 Uhr rot oder weiß angezeigt.',
          'Bei WECKER schlägt der Hammer auf den um das Werk angeordneten Klangkörper (Gong) und erzeugt den Alarmton. Bei SIGNAL wird der Klöppel aus der Schlagposition des Hammers bewegt; der Hammer schwingt frei, ohne den Klangkörper zu treffen. In Pierces Technikunterlage von 1955 wird beschrieben, dass diese Umschaltung durch eine Vierteldrehung des Bedienelements bei 4 Uhr erfolgt.',
          'Dieselbe Unterlage nennt zwei Aufgaben einer Wecker-Armbanduhr: Wecken und den Besitzer zu einer festgelegten Zeit erinnern. SIGNAL war für Situationen wie Sitzungen oder gesellschaftliche Anlässe gedacht, in denen ein lauter Alarm nicht für die Umgebung hörbar sein musste.'
        ],
        citationRefs: ['1', '1', '1'],
        mediaStyle: 'compact-sequence',
        images: [
          {
            src: '/images/pierce-duofon/mechanism/05-crown-linkage.webp',
            caption: '① Beim Drehen der Krone bei 4 Uhr bewegen sich die gekoppelte Stange und die Position des Klöppels verändert sich.',
            alt: 'Pierce Cal. 135, gekoppelte Stange und Klöppel bei Betätigung der Krone bei 4 Uhr',
            afterParagraph: 2,
            fullRow: true
          },
          {
            src: '/images/pierce-duofon/mechanism/01-signal-hammer.webp?v=2',
            caption: '② SIGNAL — weiß / diskrete Seite. Der blau markierte Teil ist der Hammer. Der Klöppel liegt außerhalb der Schlagposition des Hammers; der Hammer schwingt frei, ohne den Klangkörper (Gong) anzuschlagen.',
            alt: 'Pierce Cal. 135 im SIGNAL-Zustand mit blau markiertem Hammer und Klöppel außerhalb der Schlagposition',
            afterParagraph: 2
          },
          {
            src: '/images/pierce-duofon/mechanism/02-wecker-hammer.webp',
            caption: '③ WECKER — rot / laute Alarmseite. Der blau markierte Teil ist der Hammer. Der Klöppel befindet sich in der Schlagposition des Hammers, sodass der Hammer den Klangkörper (Gong) anschlagen kann.',
            alt: 'Pierce Cal. 135 im WECKER-Zustand mit blau markiertem Hammer und Klöppel in Schlagposition',
            afterParagraph: 2
          },
          {
            src: '/images/pierce-duofon/mechanism/03-signal-indicator.webp',
            caption: '④ SIGNAL — weiß. Mit der Bewegung derselben Stange wechselt das Anzeigefenster unter 6 Uhr auf Weiß.',
            alt: 'Pierce Cal. 135, Stangenmechanismus beim Wechsel der Anzeige auf Weiß für SIGNAL',
            afterParagraph: 2
          },
          {
            src: '/images/pierce-duofon/mechanism/04-wecker-indicator.webp',
            caption: '⑤ WECKER — rot. Mit der Bewegung derselben Stange wechselt das Anzeigefenster unter 6 Uhr auf Rot.',
            alt: 'Pierce Cal. 135, Stangenmechanismus beim Wechsel der Anzeige auf Rot für WECKER',
            afterParagraph: 2
          }
        ]
      },
      {
        number: '03',
        title: 'Die Entwicklung der Duofon-Modelle',
        paragraphs: [
          'Ein als Prototyp von 1952 dokumentiertes Exemplar besitzt ein 35-mm-goldfarbenes Gehäuse und einen gedrückten Stahlboden. Auf dem Zifferblatt fehlt der Pierce-Schriftzug; die veröffentlichte Quelle deutet darauf hin, dass es möglicherweise kein für den Verkauf bestimmtes fertiges Produkt war. Für dieses Exemplar wird außerdem angegeben, dass Gehwerk und Wecker von nur einem Federhaus angetrieben werden.',
          'Demgegenüber nennt Pierces Technikunterlage von 1955 für das fertige Werk zwei unabhängige Federhäuser, eines für das Gehwerk und eines für den Wecker. Das unterscheidet sich von der für den Prototyp von 1952 dokumentierten Ein-Federhaus-Ausführung.',
          'Das dokumentierte Exemplar von 1956 besitzt ein 34-mm-Edelstahlgehäuse, einen gedrückten Boden und eine eigene Skala zum Ablesen der Alarmzeit. Für ein weiteres Exemplar aus derselben Zeit ist ein langer Weckerzeiger dokumentiert, der bis zur Minuteneinteilung reicht.',
          'Bei späteren Ausführungen änderte sich auch das Gehäuse. Das dokumentierte Exemplar von 1962 besitzt ein 36-mm-Edelstahlgehäuse und einen geschraubten Boden; der Boden wird als wasserdicht beschrieben. Dieses Gehäuse ist als wesentlich anders als die früheren Pierce-Wecker-Armbanduhren dokumentiert. Außerdem wird dieses Exemplar als letztes Pierce-Modell mit Cal. 135 beschrieben.',
          'Das auf VINTAGE ALARM gezeigte Exemplar könnte zu dieser späteren Ausführung gehören.',
          'Bei den Beschreibungen der Duofon-Gehäuse unterscheiden sich die Quellen. Eine Darstellung legt nahe, dass die Modelle hauptsächlich über die Zifferblätter unterschieden werden und die Gehäuse weitgehend gleich erscheinen. Eine andere Quelle zeigt die 34-mm-Ausführung mit gedrücktem Boden und die 36-mm-Ausführung mit geschraubtem Boden als klar unterschiedliche Spezifikationen.'
        ],
        citationRefs: ['2', '1', '2', '2', '2', '2,4']
      },
      {
        number: '04',
        title: 'Die Verbindung zur Gruen Duo-Tone',
        paragraphs: [
          'Pierce Cal. 135 wurde auch an Gruen geliefert.',
          'Gruen verwendete ein auf Pierce Cal. 135 basierendes Werk als Cal. 920 SS in der Duo-Tone Precision. Ein dokumentiertes Exemplar besitzt ein 33,1-mm-goldfarbenes Gehäuse und einen gedrückten Stahlboden; das Werk trägt zusätzliche Finissage und Gruen-Signaturen.',
          'Auch bei der Duo-Tone werden über die Krone bei 4 Uhr zwei Alarmstufen gewählt. Die technische Basis ist Pierce Cal. 135, bei Gruen als Cal. 920 SS geführt.'
        ],
        citationRefs: ['3,4', '3,4', '3,4'],
        mediaStyle: 'compact-sequence',
        images: [
          {
            src: '/images/gruenduotone.png',
            caption: 'Zifferblatt der Gruen Duo-Tone',
            alt: 'Zifferblatt der Gruen Duo-Tone Precision',
            afterParagraph: 2
          },
          {
            src: '/images/gruenduotone2.png',
            caption: 'Werk der Gruen Duo-Tone',
            alt: 'Werk der Gruen Duo-Tone Precision, Cal. 920 SS',
            afterParagraph: 2
          }
        ]
      }
    ],
    sourceMeta: [
      { id: '1', type: 'primary' },
      { id: '2', type: 'reference' },
      { id: '3', type: 'reference' },
      { id: '4', type: 'reference' },
      { id: '5', type: 'provenance' }
    ],
    sources: [
      'Pierce AG, Biel, „Die Wecker-Armbanduhr Duofon mit zwei Lautstärken“ (30.8.1955), abgedruckt in Leonhard Beitl, Alarm am Arm (2009), S. 353–355.',
      'Leonhard Beitl, Alarm am Arm (2009), S. 356–358 — Pierce-Duo-Fon-Modellbeispiele und Cal. 135.',
      'Leonhard Beitl, Alarm am Arm (2009), S. 198–199 — Gruen Duo-Tone Precision / Cal. 920 SS.',
      'Michael Philip Horlbeck, The Alarm Wristwatch (Schiffer Publishing, 2007), S. 20, 130–131, 189–190, 218–221 — Duofon / Pierce Cal. 135 / variable Alarmlautstärke.',
      'Fünf Mechanikbilder (①–⑤) sowie zwei Bilder der Gruen Duo-Tone (Zifferblatt / Werk): Bildmaterial von [Mori (時計狂)](https://x.com/ad19200610?s=11&t=3m8xXI66ZgB96VPG9PtQgw).'
    ],
    related: {
      href: '/en/cyma-time-o-vox/',
      hreflang: 'en',
      name: 'CYMA TIME-O-VOX',
      reason: 'Dieselben 1950er. Das andere Extrem: ein Federhaus und der Anspruch auf Chronomètre.'
    }
  }
};
