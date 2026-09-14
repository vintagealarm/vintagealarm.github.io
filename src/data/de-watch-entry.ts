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
    indexBlurb: 'Ein Vorfahre des Lautlosmodus!? Ein OOPArt der Benachrichtigungstechnik aus den 1950ern.',
    catch: [
      'Ein Vorfahre des Lautlosmodus!?',
      'Ein OOPArt der Benachrichtigungstechnik aus den 1950ern.'
    ],
    ownersNote: {
      lead: [
        'Ein Vorfahre des Lautlosmodus!?',
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
        'Obwohl sie eine Wecker-Armbanduhr war, hatte sie die Atmosphäre der Zukunft viel zu früh vorweggenommen.'
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
        label: 'SIGNAL — weiß / leise',
        alt: 'Pierce Duofon im SIGNAL-Modus mit weißer Anzeige'
      },
      {
        image: '/images/pierce-duofon/gallery/pierce-duofon-wecker-red.jpg',
        label: 'WECKER — rot / Glockenton',
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
            caption: '① Beim Drehen der Krone bei 4 Uhr bewegt sich die gekoppelte Stange, und die Position des Klöppels verändert sich.',
            alt: 'Pierce Cal. 135, gekoppelte Stange und Klöppel bei Betätigung der Krone bei 4 Uhr',
            afterParagraph: 2,
            fullRow: true
          },
          {
            src: '/images/pierce-duofon/mechanism/01-signal-hammer.webp?v=2',
            caption: '② SIGNAL — weiß / leise. Der blau markierte Teil ist der Hammer. Der Klöppel liegt außerhalb der Schlagposition des Hammers; der Hammer schwingt frei, ohne den Klangkörper (Gong) anzuschlagen.',
            alt: 'Pierce Cal. 135 im SIGNAL-Zustand mit blau markiertem Hammer und Klöppel außerhalb der Schlagposition',
            afterParagraph: 2
          },
          {
            src: '/images/pierce-duofon/mechanism/02-wecker-hammer.webp',
            caption: '③ WECKER — rot / Glockenton. Der blau markierte Teil ist der Hammer. Der Klöppel befindet sich in der Schlagposition des Hammers, sodass der Hammer den Klangkörper (Gong) anschlagen kann.',
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
  },
  'westclox-watchlarm': {
    slug: 'westclox-watchlarm',
    title: 'Westclox Watchlarm W5 — 0 Steine, 1 Federhaus, Drücker-Alarm | VINTAGE ALARM',
    description: 'Westclox Watchlarm W5: 0 Steine, ein Federhaus, Alarmzeiteinstellung per Drücker, EIN/AUS-Schieber bei 9 Uhr, Messwerte des gezeigten Exemplars, Original-Alarmton, Fertigungsgeschichte und Quellen.',
    indexBlurb: '0 Steine, ein Federhaus, Alarmzeiteinstellung per Drücker — eine Wecker-Armbanduhr, radikal auf Kostensenkung konstruiert.',
    catch: ['Das dramatische Vorher und Nachher einer Armbanduhr mit 0 Steinen.'],
    ownersNote: {
      lead: [
        'Das dramatische Vorher und Nachher einer Armbanduhr mit 0 Steinen.',
        'Keine Steine.',
        'Auch keine separaten Metalllager.',
        'Auch die drehbare Lünette und zusätzliche Räderwerke werden weggelassen.',
        'Und trotzdem bekommt sie einen Alarm.',
        'Was für eine Verwandlung.',
        'Die Meister der Wecker-Massenproduktion bauten einen Alarm in eine Armbanduhr mit 0 Steinen ein — und hielten die Zahl neuer Teile so klein wie möglich.'
      ],
      guideTitle: 'Kurzanleitung',
      guide: [
        '① Aufziehen — Krone in Normalposition: zieht die gemeinsame Zugfeder für Gehwerk und Alarm auf',
        '② Uhrzeit einstellen — Krone herausziehen und die Zeiger einstellen',
        '③ Alarmzeit einstellen — Drücker bei 2 Uhr: mit jedem Druck rückt der Alarmzeiger gegen den Uhrzeigersinn weiter; bei diesem Exemplar ca. 12 Minuten pro Druck / 60 Drücke für eine volle Runde (12 Stunden)',
        '④ Alarm EIN/AUS — Schieber bei 9 Uhr: oben = EIN / unten = AUS; bei EIN erscheint am Gehäuse die Markierung „ON“'
      ],
      noteTitle: 'NOTE',
      note: [
        'Westclox produzierte Wecker in Massen und stellte zugleich preisgünstige Armbanduhren mit 0 Steinen wie die W4 her.',
        'Bei der Watchlarm W5 wird die Alarmzeit mit dem Drücker bei 2 Uhr eingestellt; dadurch konnten ein zusätzliches Einstellräderwerk und eine teure drehbare Lünette entfallen.',
        'Der frühere Westclox-Mitarbeiter Ellworth Danz hielt es für möglich, dass in der W5 einige Teile der W4 verwendet wurden. Zugleich erinnerte er sich daran, dass die Watchlarm schwierig herzustellen war und Westclox damit seiner Einschätzung nach keinen Gewinn erzielte.'
      ]
    },
    spec: {
      era: 'Ende der 1950er bis Anfang der 1960er-Jahre',
      caseSize: '34 mm',
      caliber: 'Westclox W5',
      jewels: '0 Steine',
      frequency: '18.000 A/h',
      barrels: '1 Federhaus',
      winding: 'Handaufzug',
      acoustic: 'Boden-Glockensystem',
      notes: 'Alarmzeiteinstellung per Drücker bei 2 Uhr, beim gezeigten Exemplar 60 Drücke für 12 Stunden, EIN/AUS-Schieber bei 9 Uhr, Alarmdauer ca. 10 Sekunden'
    },
    specimenGallery: [
      {
        image: '/images/IMG_2093-2.jpeg',
        label: 'Vorderseite',
        alt: 'Westclox Watchlarm W5, gezeigtes Exemplar, Vorderseite'
      },
      {
        image: '/images/IMG_2038.jpeg',
        label: 'Drücker bei 2 Uhr',
        alt: 'Westclox Watchlarm W5, Drücker zur Alarmzeiteinstellung bei 2 Uhr'
      },
      {
        image: '/images/IMG_2036.jpeg',
        label: 'Schieber bei 9 Uhr — AUS',
        alt: 'Westclox Watchlarm W5, Alarmschieber bei 9 Uhr in AUS-Stellung'
      },
      {
        image: '/images/IMG_2037.jpeg',
        label: 'Schieber bei 9 Uhr — EIN',
        alt: 'Westclox Watchlarm W5, Alarmschieber bei 9 Uhr in EIN-Stellung'
      },
      {
        image: '/images/IMG_2095.jpeg',
        label: 'Gehäuseboden',
        alt: 'Gehäuseboden des gezeigten Westclox-Watchlarm-W5-Exemplars'
      }
    ],
    deepDive: [
      {
        number: '01',
        title: 'Eine Firma, die Wecker in zweistelliger Millionenstückzahl baute',
        subtitle: 'Produktionsmaßstab von Westclox und die Armbanduhrenfertigung',
        paragraphs: [
          'In den 1950er-Jahren war Westclox ein Hersteller, der Wecker wie Big Ben und Baby Ben in großem Maßstab produzierte. Für das LaSalle-Werk werden um 1956 mehr als 4.000 Beschäftigte und eine Tagesproduktion von etwa 40.000 Uhren genannt. Bis zu dieser Zeit sollen mehr als 40 Millionen Big Ben und mehr als 28 Millionen Baby Ben hergestellt worden sein.',
          'Das Unternehmen fertigte zugleich preisgünstige Armbanduhren mit 0 Steinen wie die W4. Die Watchlarm W5 verwendet ein 0-Steine-Werk mit Stiftankerhemmung und integriertem Alarmmechanismus. Der frühere Westclox-Mitarbeiter Ellworth Danz hielt es für möglich, dass in der W5 einige Teile der W4 verwendet wurden.',
          'Beim Fertigungszeitraum unterscheiden sich die Quellen. Beitl behandelt die Uhr als Produkt der 1950er-Jahre, Horlbeck setzt sie dagegen ab 1960 an, und ClockHistory weist Katalogaufnahmen für 1960 und 1961 nach. Da für das auf dieser Seite gezeigte Exemplar keine Quelle vorliegt, die das Herstellungsjahr eindeutig festlegt, verwendet VINTAGE ALARM die Einordnung „Ende der 1950er bis Anfang der 1960er-Jahre“.'
        ],
        citationRefs: ['4', '2,3', '1,2,3']
      },
      {
        number: '02',
        title: '0 Steine, keine separaten Metalllager',
        paragraphs: [
          'Die W5 besitzt ein 0-Steine-Werk mit Stiftankerhemmung und keine separaten Metalllager. Die Zapfen laufen direkt in Bohrungen von Platine und Deckplatte. Die Unruh ist gestanzt, die Spirale flach, und auch die Stoßsicherung ist einfach ausgeführt.',
          'Das Werk ist in Vollplatinenbauweise aufgebaut und verwendet übereinanderliegende kreisförmige Platten anstelle herkömmlicher Brücken und eines separaten Unruhklobens. Die Literatur beschreibt eine Konstruktion, bei der selbst unnötige Aussparungen möglichst vermieden wurden, um die Kosten niedrig zu halten.',
          'Trotzdem treibt ein einziges Federhaus sowohl die Zeitanzeige als auch den Alarm an und ermöglicht etwa 38 Stunden Laufzeit sowie rund 10 Sekunden Alarmdauer.'
        ],
        citationRefs: ['1,2', '1', '1']
      },
      {
        number: '03',
        title: 'Alarmzeiteinstellung per Drücker bei 2 Uhr',
        paragraphs: [
          'Beim gezeigten Exemplar ergeben 60 Drücke eine volle 12-Stunden-Runde, also etwa 12 Minuten pro Druck. Das weicht von den 15-Minuten-Schritten ab, die Horlbeck und Beitl angeben, stimmt aber mit den 12-Minuten-Schritten bei Ranfft überein. Ob die Abweichung auf Exemplarunterschiede, Spezifikationsunterschiede oder Unterschiede zwischen den Quellen zurückgeht, ist nicht bestätigt.',
          'Mit diesem System lässt sich die Alarmzeit ohne zusätzliches Einstellräderwerk und ohne teure drehbare Lünette einstellen.',
          'Bei 9 Uhr befindet sich ein EIN/AUS-Schieber für den Alarm: nach oben = EIN, nach unten = AUS. In der Stellung EIN wird die Markierung „ON“ am Gehäuse sichtbar.'
        ],
        citationRefs: ['1,2,5,6', '1', '1,2']
      },
      {
        number: '04',
        title: 'Einfach zu fertigen war sie nicht',
        paragraphs: [
          'Der frühere Westclox-Mitarbeiter Ellworth Danz hielt es für möglich, dass in der W5 einige Teile der W4 verwendet wurden.',
          'Gleichzeitig erinnerte Danz sich daran, dass die Watchlarm schwierig herzustellen war und dass er nicht glaubte, Westclox habe mit dieser Uhr Gewinn erzielt.'
        ],
        citationRefs: ['3', '3']
      },
      {
        number: '05',
        title: 'Deutsches Gehäuse und die Klangkonstruktion',
        paragraphs: [
          'Beitl verzeichnet Gehäuse und Zifferblatt des Westclox Alarm als in Deutschland hergestellt und beschreibt das abgebildete Beispiel mit verchromtem Messinggehäuse, gedrücktem Boden und 32,88 mm Durchmesser.',
          'Das auf dieser Seite gezeigte Exemplar ist mit 34 mm Gehäusedurchmesser dokumentiert. Da dies nicht mit den 32,88 mm des bei Beitl gezeigten Beispiels übereinstimmt, wird nicht behauptet, dass beide dieselbe Gehäusespezifikation besitzen.',
          'Horlbeck weist auf Ähnlichkeiten mit dem Bodenaufbau der Junghans Minivox hin, darunter einen leicht gewölbten Gehäuseboden, einen zentralen Niet und eine kleine Brücke auf der Innenseite.',
          'Es liegt jedoch keine für diese Seite bestätigte Quelle vor, die belegt, dass Junghans das W5-Gehäuse direkt hergestellt oder die W5 entworfen hat. Auch Horlbeck beschreibt dies nur als mögliche enge Beziehung durch Zusammenarbeit oder Zulieferung.'
        ],
        citationRefs: ['2', '6', '1', '1']
      }
    ],
    sourceMeta: [
      { id: '1', type: 'reference' },
      { id: '2', type: 'reference' },
      { id: '3', type: 'reference' },
      { id: '4', type: 'reference' },
      { id: '5', type: 'reference' },
      { id: '6', type: 'owner' }
    ],
    sources: [
      'Michael Philip Horlbeck, The Alarm Wristwatch (Schiffer Publishing, 2007), S. 150, 198–199, 220–221 — Spezifikation und Bedienung der Westclox W5, kostenreduzierte Konstruktion, Gehäuse- und Klangaufbau.',
      'Leonhard Beitl, Alarm am Arm (2009), S. 497–498, 628 — Westclox Alarm / W5, 0 Steine, Gehäusedurchmesser, Bedienung, deutsches Gehäuse und Zifferblatt.',
      'Ellworth Danz, [Westclox Wristwatches](https://clockhistory.com/westclox/products/wristwatch/) — Beziehung zwischen W5- und W4-Teilen, Fertigungsschwierigkeit, Rentabilität sowie Katalogaufnahmen 1960/1961.',
      'ClockHistory, [Western Clock Company Chronology](https://clockhistory.com/westclox/company/dates/index.html) — Beschäftigtenzahl und Produktionsmaßstab 1956 sowie kumulierte Stückzahlen von Big Ben / Baby Ben.',
      'Roland Ranfft, [Westclox W5](https://ranfft.org/caliber/10726-Westclox-W5) — Angabe einer Alarmzeiteinstellung in 12-Minuten-Schritten.',
      'OWNER OBSERVATION — Dokumentation des gezeigten Exemplars: 34 mm Gehäusedurchmesser; 60 Betätigungen des Drückers bei 2 Uhr bewegen den Alarmzeiger einmal vollständig über 12 Stunden.'
    ],
    related: {
      href: '/en/basis-alarm/',
      hreflang: 'en',
      name: 'BASIS ALARM',
      reason: 'Eine andere Richtung als die Luxusmodelle: eine weitere Antwort für den Massenmarkt.'
    }
  }
};