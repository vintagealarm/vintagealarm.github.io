export type CymaChronometreLocale = 'en' | 'de';

export const cymaChronometreLocalized = {
  en: {
    lang: 'en',
    locale: 'en_US',
    path: 'en/cyma-time-o-vox/chronometre/',
    title: 'Cyma Time-O-Vox Chronomètre — Observed Examples and Certification Records | VINTAGE ALARM',
    description: 'Cyma Time-O-Vox Chronomètre research combining specialist literature, 17 observed examples, external archive inquiries, UNADJUSTED markings and observations from the watch shown here.',
    heading: 'Time-O-Vox Chronomètre',
    lead: [
      'An 18K Time-O-Vox with “CHRONOMÈTRE” on the dial.',
      'This page examines how that dial marking relates to the markings found on surviving examples.'
    ],
    nav: ['Literature', '17 observed', 'UNADJUSTED', 'Archive inquiries', 'Field note'],
    sectionLabels: ['DOCUMENTATION', 'OBSERVED EXAMPLES', 'UNADJUSTED MARKING', 'EXTERNAL INQUIRIES', 'OWNER OBSERVATION'],
    documented: {
      title: 'A Chronomètre version is documented',
      intro: 'The Chronomètre specification existed. The surviving examples do not carry one uniform set of markings.',
      cards: [
        { label: 'MIH', title: 'Chronometer certification for a gold Time-O-Vox', body: 'Cyma material shared by the MIH records a gold Time-O-Vox receiving chronometer certification.' },
        { label: 'HORLBECK', title: 'Testing in five positions and at different temperatures', body: 'The Alarm Wristwatch describes a Chronomètre version of Cal. R.464 and states that qualifying movements were tested in five positions and at different temperatures.' },
        { label: 'BEITL', title: 'Gold models recorded as Chronometer versions', body: 'Alarm am Arm states that the illustrated 14K gold Time-O-Vox with open-worked lugs was always supplied as a Chronometer version. The examples shown include one with Chronometer markings on both dial and movement, and another with no such dial marking but a Chronometer marking on the movement.' }
      ]
    },
    observed: {
      title: 'The markings do not line up',
      intro: 'Seventeen examples were documented across sale pages, literature, service articles, video and social media.',
      note: 'To avoid counting reposted or relisted watches twice, the underlying research identifies examples primarily by movement number. In the public table, movement numbers are partially masked (e.g. 10xx).'
    },
    mismatch: {
      cards: [
        { label: 'WATCH SHOWN HERE', title: 'Chronomètre on the dial', body: 'The watch shown here has an 18K case and CHRONOMÈTRE on the dial. No marking indicating adjustment to five positions and temperature is visible on its movement.' },
        { label: 'FIVE POSITIONS', title: 'No dial marking, but adjusted to five positions and temperature', body: 'A gold-coloured example without Chronomètre on the dial has “ADJUSTED TO FIVE POSITION(S) AND TEMPERATURE” engraved on the movement.' },
        { label: 'UNADJUSTED', title: 'Gold-coloured case, UNADJUSTED', body: 'Conversely, a gold-coloured example also survives with UNADJUSTED engraved on the movement.' }
      ]
    },
    tariff: {
      title: 'What was happening at Tavannes',
      intro: 'A 1956 U.S. Senate hearing examined Swiss watches that were actually adjusted but imported with “unadjusted” markings in order to avoid additional duties.',
      body: [
        'One example cited by Pritchard concerns Tavannes. Factory advertising said every movement was adjusted for position and temperature, while a watch bought in Washington, D.C. was marked “unadjusted”.',
        'CYMA WATCH CO. SA is listed as a company within the Tavannes group in Pritchard’s Tavannes entry.',
        'The UNADJUSTED marking on a Time-O-Vox therefore cannot, by itself, establish that the movement was not adjusted.'
      ],
      quoteTranslation: '“Before leaving the factory, every Tavannes movement is adjusted for position and temperature.”',
      caption: 'Relevant passage from U.S. Senate, Swiss Watches—Adjustments (1956).'
    },
    archive: {
      title: 'What the archive inquiries established',
      intro: 'In 2025, inquiries were sent to the MIH and the Neuchâtel State Archives. The MIH response was limited to model-level documentation; Neuchâtel checked the specific Movement No.4xx watch.',
      cards: [
        { label: 'MIH / 18 SEP. 2025', title: 'Model documentation', body: 'No document directly tied to a Time-O-Vox Chronomètre was identified. The Cyma file did, however, contain a statement recording certification for a gold alarm watch, and that material was shared.' },
        { label: 'NEUCHÂTEL / 14 NOV. 2025', title: 'Movement No.4xx', body: 'A follow-up inquiry specified Movement No.4xx, inside-case number 8 6525, BT and the years 1954–1958. Eight BT registers of roughly 100 pages each were checked, but no test corresponding to the watch shown here could be identified.' }
      ]
    },
    failure: {
      title: 'An alarm-trigger fault',
      intro: 'In Humbert’s technical description of R.464, the alarm can operate with both pushers in their centre positions and is locked when either pusher is fully depressed.',
      normalTitle: 'Three examples checked',
      normalBody: 'B. Humbert’s technical description says the alarm can operate only when both pushers are in the centre position; fully depressing either one locks the alarm.',
      observedTitle: 'Still rings with one pusher depressed',
      observedBody: 'Three examples have nevertheless been observed ringing while one pusher remained depressed.',
      hypothesisTitle: 'Pivot area of the switching lever',
      hypothesisBody: 'On the watch shown here, wear or play around the switching-lever pivot may be shifting the lever position and leaving too little travel toward the locking side. The internals of the other two examples have not been checked.',
      examples: ['Watch shown here', 'Another example seen in a public video', 'An example offered for sale in Japan'],
      swipe: 'Swipe horizontally to view the images',
      seen: 'ringing visually confirmed',
      youtubeCaption: 'Watch shown here. The alarm can be heard even though the 4 o’clock pusher remains depressed, as it was when the watch was purchased.'
    },
    conclusion: {
      label: 'CURRENT CONCLUSION',
      title: 'What can be said at this point',
      items: [
        { label: 'DOCUMENTED', text: 'A record exists of chronometer certification being issued for a gold Time-O-Vox, confirming that a Time-O-Vox Chronomètre specification existed.' },
        { label: 'OBSERVED', text: 'Chronomètre dial markings, adjustment markings, case material, case code and seller reference do not map to one another in a simple way across the surviving examples.' },
        { label: 'UNRESOLVED', text: 'It is still not possible to identify which surviving watch corresponds to which period certification record.' }
      ]
    },
    table: {
      open: 'View observed examples',
      count: 'examples',
      movementBand: 'MOV. No. BAND',
      sellerRef: 'LISTED REF.',
      era: 'ERA',
      dial: 'DIAL',
      adjustment: 'ADJUSTMENT',
      noMarking: 'no marking',
      imageUnavailable: 'image unavailable',
      markingNotVisible: 'marking not visible',
      unknown: 'unknown',
      deletedRecord: 'deleted record',
      sixIndex: '6 o’clock marker present',
      noSixIndex: '6 o’clock marker absent'
    },
    sourceHeading: 'Sources used',
    backLabel: 'BACK TO CYMA TIME-O-VOX',
    sources: [
      'Cyma-related historical material shared from a library file held by Musée international d’horlogerie (MIH)',
      'Michael Philip Horlbeck, The Alarm Wristwatch, Schiffer Publishing, 2007, Cyma section',
      'Leonhard Beitl, Alarm am Arm, 2009, pp. 134–136',
      'B. Humbert, Die Armband-Weckeruhr, Calibre TIME-O-VOX 464 technical article',
      'K. H. Pritchard, Swiss Timepiece Makers: 1775–1975, Tavannes section',
      'U.S. Senate Committee on Government Operations, Swiss Watches—Adjustments, hearings, 1956',
      'Musée international d’horlogerie (MIH), reply dated 18 Sep. 2025',
      'Office des archives de l’Etat, Neuchâtel, reply dated 14 Nov. 2025',
      'VINTAGE ALARM / TypeC observed-example table and owner-observation record',
      'Chrono24 / Plus Ultra AG purchase certificate and listing for the watch shown here, Ref. 1283',
      'HODINKEE Shop, 1950s Cyma Time-O-Vox, Reference 1283',
      'Pamono, Cyma Time-O-Vox Watch from Cymaflex, Ref. 1283'
    ]
  },
  de: {
    lang: 'de',
    locale: 'de_DE',
    path: 'de/cyma-time-o-vox/chronometre/',
    title: 'Cyma Time-O-Vox Chronomètre — beobachtete Exemplare und Zertifizierungsunterlagen | VINTAGE ALARM',
    description: 'Recherche zur Cyma Time-O-Vox Chronomètre auf Grundlage von Fachliteratur, 17 beobachteten Exemplaren, Archivanfragen, UNADJUSTED-Gravuren und Beobachtungen am gezeigten Exemplar.',
    heading: 'Time-O-Vox Chronomètre',
    lead: [
      'Eine Time-O-Vox im 18K-Gehäuse mit „CHRONOMÈTRE“ auf dem Zifferblatt.',
      'Diese Seite verfolgt die Unterschiede zwischen dieser Zifferblattaufschrift und den Kennzeichnungen erhaltener Exemplare.'
    ],
    nav: ['Literatur', '17 Exemplare', 'UNADJUSTED', 'Archivanfragen', 'Beobachtung'],
    sectionLabels: ['DOKUMENTATION', 'BEOBACHTETE EXEMPLARE', 'UNADJUSTED-GRAVUR', 'EXTERNE ANFRAGEN', 'BEOBACHTUNG AM EXEMPLAR'],
    documented: {
      title: 'Die Time-O-Vox gab es auch als Chronomètre',
      intro: 'Eine Chronomètre-Ausführung ist dokumentiert. Bei den erhaltenen Exemplaren sind die Kennzeichnungen jedoch nicht einheitlich.',
      cards: [
        { label: 'MIH', title: 'Chronometerzertifizierung für eine goldene Time-O-Vox', body: 'Von der MIH bereitgestellte Cyma-Unterlagen enthalten einen Eintrag, nach dem eine goldene Time-O-Vox eine Chronometerzertifizierung erhielt.' },
        { label: 'HORLBECK', title: 'Prüfung in fünf Lagen und bei Temperatur', body: 'The Alarm Wristwatch beschreibt eine Chronomètre-Ausführung des Cal. R.464 sowie eine Prüfung in fünf Lagen und bei Temperatur.' },
        { label: 'BEITL', title: 'Goldmodelle als Chronometer-Ausführung', body: 'Alarm am Arm hält für die abgebildete Time-O-Vox im 14K-Goldgehäuse mit durchbrochenen Anstößen fest, dass dieses Goldmodell stets als Chronometer-Ausführung geliefert wurde. Gezeigt werden sowohl ein Exemplar mit Chronometer-Kennzeichnung auf Zifferblatt und Werk als auch eines ohne entsprechende Zifferblattaufschrift, aber mit Chronometer-Kennzeichnung auf dem Werk.' }
      ]
    },
    observed: {
      title: 'Die Kennzeichnungen passen nicht in ein einziges Schema',
      intro: 'Aus Verkaufsseiten, Fachliteratur, Reparaturberichten, Videos und sozialen Medien ließen sich 17 Exemplare überprüfen.',
      note: 'Um Doppelzählungen durch weiterverwendete Fotos oder erneute Angebote zu vermeiden, werden die Exemplare in den Arbeitsdaten vor allem über die Werknummer unterschieden. In der öffentlichen Tabelle sind die Werknummern zu Nummernbereichen maskiert.'
    },
    mismatch: {
      cards: [
        { label: 'GEZEIGTES EXEMPLAR', title: 'Chronomètre auf dem Zifferblatt', body: 'Das gezeigte Exemplar besitzt ein 18K-Gehäuse und CHRONOMÈTRE auf dem Zifferblatt. Eine Gravur für Regulierung in fünf Lagen und bei Temperatur ist am Werk nicht zu erkennen.' },
        { label: 'FÜNF LAGEN', title: 'Keine Zifferblattaufschrift, aber in fünf Lagen und bei Temperatur reguliert', body: 'Bei einem goldfarbenen Exemplar ohne Chronomètre auf dem Zifferblatt trägt das Werk die Gravur „ADJUSTED TO FIVE POSITION(S) AND TEMPERATURE“.' },
        { label: 'UNADJUSTED', title: 'Goldfarbenes Gehäuse, UNADJUSTED', body: 'Umgekehrt ist auch ein goldfarbenes Exemplar mit der Werkgravur UNADJUSTED dokumentiert.' }
      ]
    },
    tariff: {
      title: 'Was bei Tavannes geschah',
      intro: 'In einer Anhörung des US-Senats von 1956 wurden Fälle behandelt, in denen tatsächlich regulierte Schweizer Uhren mit der Kennzeichnung „unadjusted“ importiert wurden, um zusätzliche Zölle zu vermeiden.',
      body: [
        'Eines der von Pritchard angeführten Beispiele betrifft Tavannes. In einer Werksanzeige hieß es, sämtliche Werke würden in Lagen und bei Temperatur reguliert; eine in Washington, D.C. gekaufte Uhr war dennoch mit „unadjusted“ graviert.',
        'CYMA WATCH CO. SA wird in Pritchards Tavannes-Eintrag als Unternehmen der Gruppe aufgeführt.',
        'Auch bei einer Time-O-Vox lässt sich deshalb aus der Gravur UNADJUSTED allein nicht ableiten, dass das Werk tatsächlich unreguliert war.'
      ],
      quoteTranslation: '„Bevor sie das Werk verlassen, werden sämtliche Tavannes-Werke in Lagen und bei Temperatur reguliert.“',
      caption: 'Entsprechende Passage aus U.S. Senate, Swiss Watches—Adjustments (1956).'
    },
    archive: {
      title: 'Was die Archivanfragen ergaben',
      intro: '2025 wurden Anfragen an die MIH und das Staatsarchiv Neuenburg gerichtet. Die MIH antwortete auf Ebene der Modellunterlagen; Neuenburg prüfte das konkrete Exemplar mit Movement No.4xx.',
      cards: [
        { label: 'MIH / 18. SEP. 2025', title: 'Modellunterlagen', body: 'Ein Dokument mit direktem Bezug zu einer Time-O-Vox Chronomètre konnte nicht identifiziert werden. In den Cyma-Unterlagen fand sich jedoch ein Hinweis auf die Ausstellung eines Zertifikats für eine goldene Weckeruhr; dieses Material wurde zur Verfügung gestellt.' },
        { label: 'NEUCHÂTEL / 14. NOV. 2025', title: 'Movement No.4xx', body: 'Für eine erneute Anfrage wurden Movement No.4xx, die Gehäuse-Innennummer 8 6525, BT sowie der Zeitraum 1954–1958 angegeben. Acht BT-Register mit jeweils ungefähr 100 Seiten wurden geprüft; eine zum gezeigten Exemplar passende Prüfung ließ sich nicht identifizieren.' }
      ]
    },
    failure: {
      title: 'Abweichung bei der Alarmauslösung',
      intro: 'Nach Humberts technischer Beschreibung des R.464 kann der Alarm bei beiden Drückern in Mittelstellung auslösen; wird einer der beiden vollständig gedrückt, ist der Alarm gesperrt.',
      normalTitle: 'Drei überprüfte Exemplare',
      normalBody: 'Nach B. Humberts technischer Beschreibung kann der Alarm nur dann auslösen, wenn beide Drücker in Mittelstellung stehen. Wird einer vollständig gedrückt, wird der Alarm gesperrt.',
      observedTitle: 'Klingelt trotz gedrücktem Drücker',
      observedBody: 'Dennoch wurden drei Exemplare beobachtet, die bei gedrückt gehaltenem Drücker klingelten.',
      hypothesisTitle: 'Lagerstelle des Umschalthebels',
      hypothesisBody: 'Beim gezeigten Exemplar könnten Verschleiß oder Spiel an der Lagerstelle des Umschalthebels dessen Position verschieben, sodass der Weg zur Sperrstellung nicht ausreicht. Das Innere der beiden anderen Exemplare wurde nicht untersucht.',
      examples: ['Gezeigtes Exemplar', 'Weiteres Exemplar in einem öffentlich zugänglichen Video', 'In Japan angebotenes Exemplar'],
      swipe: 'Zum Ansehen der Bilder horizontal wischen',
      seen: 'Auslösung sichtbar bestätigt',
      youtubeCaption: 'Gezeigtes Exemplar. Der Alarm ist zu hören, obwohl der Drücker bei 4 Uhr weiterhin hineingedrückt ist — so befand er sich bereits beim Kauf.'
    },
    conclusion: {
      label: 'AKTUELLER STAND',
      title: 'Was sich derzeit sagen lässt',
      items: [
        { label: 'DOKUMENTIERT', text: 'Es existiert ein Eintrag über eine Chronometerzertifizierung für eine goldene Time-O-Vox; damit ist eine Time-O-Vox-Chronomètre-Ausführung belegt.' },
        { label: 'BEOBACHTET', text: 'Chronomètre-Aufschrift, Regulierungsgravur, Gehäusematerial, Gehäusecode und Händlerreferenz stehen bei den erhaltenen Exemplaren nicht in einer einfachen festen Zuordnung.' },
        { label: 'OFFEN', text: 'Welches erhaltene Exemplar zu welchem damaligen Zertifizierungsdatensatz gehört, lässt sich weiterhin nicht bestimmen.' }
      ]
    },
    table: {
      open: 'Beobachtete Exemplare anzeigen',
      count: 'Exemplare',
      movementBand: 'WERKNR.-BEREICH',
      sellerRef: 'ANGEGEBENE REF.',
      era: 'ZEITRAUM',
      dial: 'ZIFFERBLATT',
      adjustment: 'REGULIERUNG',
      noMarking: 'keine Aufschrift',
      imageUnavailable: 'kein Bild',
      markingNotVisible: 'Gravur nicht erkennbar',
      unknown: 'unbekannt',
      deletedRecord: 'gelöschter Eintrag',
      sixIndex: 'Index bei 6 vorhanden',
      noSixIndex: 'kein Index bei 6'
    },
    sourceHeading: 'Verwendete Quellen',
    backLabel: 'ZURÜCK ZUR CYMA TIME-O-VOX',
    sources: [
      'Historisches Cyma-Material aus einer Bibliotheksakte des Musée international d’horlogerie (MIH)',
      'Michael Philip Horlbeck, The Alarm Wristwatch, Schiffer Publishing, 2007, Abschnitt Cyma',
      'Leonhard Beitl, Alarm am Arm, 2009, S. 134–136',
      'B. Humbert, Die Armband-Weckeruhr, technischer Artikel zum Kaliber TIME-O-VOX 464',
      'K. H. Pritchard, Swiss Timepiece Makers: 1775–1975, Abschnitt Tavannes',
      'U.S. Senate Committee on Government Operations, Swiss Watches—Adjustments, Anhörungen 1956',
      'Musée international d’horlogerie (MIH), Antwort vom 18. Sep. 2025',
      'Office des archives de l’Etat, Neuchâtel, Antwort vom 14. Nov. 2025',
      'VINTAGE ALARM / TypeC-Tabelle beobachteter Exemplare und Beobachtungsprotokoll des gezeigten Exemplars',
      'Chrono24 / Plus Ultra AG, Kaufzertifikat und Angebot des gezeigten Exemplars, Ref. 1283',
      'HODINKEE Shop, 1950s Cyma Time-O-Vox, Reference 1283',
      'Pamono, Cyma Time-O-Vox Watch from Cymaflex, Ref. 1283'
    ]
  }
} as const;
