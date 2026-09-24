import jaData from './cyma-chronometre-research.json';

type Locale = 'en' | 'de';

const mapValue = (value: string, locale: Locale, maps: Record<Locale, Record<string, string>>) =>
  maps[locale][value] ?? value;

const specimenMaps: Record<Locale, {
  era: Record<string, string>;
  dial: Record<string, string>;
  adjustment: Record<string, string>;
  movementBand: Record<string, string>;
  source: Record<string, string>;
}> = {
  en: {
    era: {
      '1950年代': '1950s',
      '1956年頃': 'c. 1956',
      '1965年': '1965',
      '不明': 'Unknown'
    },
    dial: {
      '6インデックスあり': '6 o’clock index present',
      '6インデックスなし': '6 o’clock index absent'
    },
    adjustment: {
      '画像無し': 'No image',
      '刻印を確認できず': 'Engraving not confirmed'
    },
    movementBand: {
      '4桁・不明瞭': '4 digits / unclear'
    },
    source: {
      '削除済み記録': 'Deleted record',
      'シェルマン銀座': 'Shellman Ginza'
    }
  },
  de: {
    era: {
      '1950年代': '1950er-Jahre',
      '1956年頃': 'um 1956',
      '1965年': '1965',
      '不明': 'unbekannt'
    },
    dial: {
      '6インデックスあり': '6-Uhr-Index vorhanden',
      '6インデックスなし': '6-Uhr-Index fehlt'
    },
    adjustment: {
      '画像無し': 'kein Bild',
      '刻印を確認できず': 'Gravur nicht feststellbar'
    },
    movementBand: {
      '4桁・不明瞭': '4-stellig / undeutlich'
    },
    source: {
      '削除済み記録': 'nicht mehr abrufbarer Eintrag',
      'シェルマン銀座': 'Shellman Ginza'
    }
  }
};

const localizeSpecimens = (locale: Locale) => jaData.observed.specimens.map((row) => ({
  ...row,
  era: mapValue(row.era, locale, { en: specimenMaps.en.era, de: specimenMaps.de.era }),
  dial: mapValue(row.dial, locale, { en: specimenMaps.en.dial, de: specimenMaps.de.dial }),
  adjustment: mapValue(row.adjustment, locale, { en: specimenMaps.en.adjustment, de: specimenMaps.de.adjustment }),
  movementBand: mapValue(row.movementBand, locale, { en: specimenMaps.en.movementBand, de: specimenMaps.de.movementBand }),
  source: mapValue(row.source, locale, { en: specimenMaps.en.source, de: specimenMaps.de.source })
}));

export const englishCymaChronometreResearch = {
  ...jaData,
  title: 'CYMA TIME-O-VOX CHRONOMÈTRE',
  heading: 'Time-O-Vox Chronomètre',
  lead: [
    'An 18K Time-O-Vox with “CHRONOMÈTRE” printed on the dial.',
    'This page follows the differences between that dial inscription and the markings found on surviving watches.'
  ],
  documented: {
    title: 'There was a Chronomètre Time-O-Vox',
    intro: 'The Chronomètre specification is documented. The surviving watches, however, do not all carry the same markings.',
    cards: [
      {
        label: 'MIH',
        title: 'Chronometer certification for gold Time-O-Vox watches',
        body: 'CYMA material shared by the Musée international d’horlogerie records chronometer certification for gold Time-O-Vox watches.'
      },
      {
        label: 'HORLBECK',
        title: 'Testing in five positions and at different temperatures',
        body: 'The Alarm Wristwatch records a Chronomètre version of Cal. R.464 and describes testing in five positions and at different temperatures.'
      },
      {
        label: 'BEITL',
        title: 'The gold model as a chronometer version',
        body: 'Alarm am Arm states that the 14K gold Time-O-Vox with open-worked lugs was always supplied as a chronometer version. Its examples include one watch marked as a chronometer on both dial and movement, and another with no dial inscription but a chronometer marking on the movement.'
      }
    ]
  },
  observed: {
    ...jaData.observed,
    title: 'The markings do not line up',
    intro: 'Seventeen watches located through sales listings, books, service articles, video and social media are compared here.',
    note: 'The working record uses movement numbers as a primary way to avoid counting reposted or relisted watches twice. On the public page, movement numbers are masked into number ranges.',
    specimens: localizeSpecimens('en')
  },
  mismatch: {
    title: 'The markings do not line up',
    intro: 'Across the observed watches, dial wording, adjustment markings and case material do not map neatly to one another.',
    cards: [
      {
        label: 'Shown specimen',
        title: 'Chronomètre on the dial',
        body: 'The specimen shown here has an 18K case and CHRONOMÈTRE on the dial. No five-position-and-temperature adjustment engraving can be seen on its movement.'
      },
      {
        label: 'Five positions',
        title: 'No dial wording, but adjusted in five positions and temperature',
        body: 'One gold-coloured example has no Chronomètre wording on the dial, yet its movement is engraved “ADJUSTED TO FIVE POSITION(S) AND TEMPERATURE”.'
      },
      {
        label: 'UNADJUSTED',
        title: 'Gold-coloured case, UNADJUSTED',
        body: 'Conversely, another gold-coloured example has UNADJUSTED engraved on the movement.'
      }
    ]
  },
  archive: {
    title: 'What the archive inquiries established',
    intro: 'In 2025, inquiries were sent to the Musée international d’horlogerie (MIH) and the State Archives of Neuchâtel. MIH replied at model-document level; Neuchâtel was asked to check a specific watch in the Movement No. 4xx range.',
    cards: [
      {
        label: 'MIH / 18 SEP. 2025',
        title: 'Model documentation',
        body: 'No document directly tied to the Time-O-Vox Chronomètre was identified. The CYMA files did, however, contain a record indicating certificates issued for gold alarm watches, and that material was shared.'
      },
      {
        label: 'NEUCHÂTEL / 14 NOV. 2025',
        title: 'Movement No. 4xx',
        body: 'A follow-up inquiry specified Movement No. 4xx, inside-case number 8 6525, BT and the years 1954–1958. Eight BT registers of roughly 100 pages each were checked, but no test corresponding to the specimen shown here was identified.'
      }
    ]
  },
  tariff: {
    ...jaData.tariff,
    title: 'What was happening at Tavannes',
    intro: 'A 1956 U.S. Senate hearing examined cases in which adjusted Swiss watches were imported marked “unadjusted” in order to avoid additional duty.',
    body: [
      'One example cited by K. H. Pritchard was Tavannes. Factory advertising said that every movement was adjusted for position and temperature, while a watch sold in Washington, D.C. was engraved “unadjusted”.',
      'CYMA WATCH CO. SA is listed as a group company in Pritchard’s Tavannes entry.',
      'An UNADJUSTED engraving on a Time-O-Vox therefore cannot, by itself, establish that the movement was never adjusted.'
    ],
    caption: 'Relevant passage from U.S. Senate, Swiss Watches—Adjustments (1956).'
  },
  logic: [
    {
      label: 'EVIDENCE',
      title: 'Export examples where the engraving did not match the actual adjustment',
      body: 'The 1956 U.S. Senate hearing dealt with adjusted Swiss watches imported with “unadjusted” markings to avoid additional duty. Pritchard summarised the Tavannes case: factory advertising stated that every movement was adjusted for position and temperature, while a watch bought in Washington, D.C. carried an “unadjusted” engraving.'
    },
    {
      label: 'OBSERVATION',
      title: 'UNADJUSTED also appears on Time-O-Vox movements',
      body: 'Among the seventeen observed watches, UNADJUSTED markings appear on both gold-coloured and stainless-steel examples. Other watches lack Chronomètre wording on the dial yet carry a five-position-and-temperature adjustment engraving on the movement.'
    },
    {
      label: 'INFERENCE',
      title: 'UNADJUSTED alone cannot exclude a Chronomètre specification',
      body: 'Because Tavannes-group export examples are documented in which the engraving did not reflect the actual adjustment, a Time-O-Vox marked UNADJUSTED could still have been adjusted and supplied as a Chronomètre version. Establishing that for any specific watch would still require a certificate, observatory register or equivalent record.'
    }
  ],
  failure: {
    ...jaData.failure,
    title: 'A difference in alarm-release behaviour',
    intro: 'B. Humbert’s technical description of the R.464 states that the alarm can run when both pushers are in their neutral positions and is locked when either pusher is pressed fully in.',
    normalTitle: 'Three watches observed',
    normalBody: 'Humbert’s R.464 description states that the alarm can operate only with both pushers in their neutral positions; pressing either pusher fully in locks the alarm.',
    observedTitle: 'The alarm still sounds with one pusher pressed in',
    observedBody: 'Three watches have nevertheless been observed sounding while one pusher remained pressed in.',
    hypothesisTitle: 'The switching-lever pivot',
    hypothesisBody: 'On the specimen shown here, wear or play at the switching-lever pivot may be shifting the lever enough that it does not travel fully into the locking position. The internal condition of the other two watches has not been inspected.',
    examples: [
      'Specimen shown here',
      'A second watch observed in a public video',
      'A watch offered for sale in Japan'
    ],
    images: [
      {
        image: '/images/Cyma timeovox 故障個所ムーブメント.png',
        caption: 'Alarm spring on the movement, running from around 5 to 11 o’clock.',
        alt: 'CYMA R.464 alarm spring and movement'
      },
      {
        image: '/images/Cyma timeovox 故障個所.png',
        caption: 'On the specimen shown here, a contact mark was found away from the normal operating hole (yellow area). According to the watchmaker, excessive spring tension can reproduce the same condition there as when the spring enters the operating hole and can trigger the alarm. Whether the same cause applies to the other R.464 watches with this behaviour is unknown.',
        alt: 'Contact mark associated with the alarm-release spring on the shown CYMA R.464'
      }
    ],
    youtubeCaption: 'Specimen shown here. In the condition in which it was purchased, the alarm can be heard sounding even while the 4 o’clock pusher remains pressed in.'
  },
  conclusion: {
    title: 'What can be said at this point',
    items: [
      {
        label: 'DOCUMENTED',
        text: 'Records exist for chronometer certification of gold Time-O-Vox watches, and the existence of a Time-O-Vox Chronomètre specification is confirmed.'
      },
      {
        label: 'OBSERVED',
        text: 'Chronomètre dial wording, adjustment engravings, case material, case codes and seller references do not show a simple one-to-one relationship across surviving watches.'
      },
      {
        label: 'UNRESOLVED',
        text: 'It is still not possible to connect any given surviving watch with a specific period certification or test record.'
      }
    ]
  },
  sources: [
    'CYMA-related historical material shared from a library file held by the Musée international d’horlogerie (MIH)',
    'Michael Philip Horlbeck, The Alarm Wristwatch, Schiffer Publishing, 2007, CYMA section',
    'Leonhard Beitl, Alarm am Arm, 2009, pp. 134–136',
    'B. Humbert, Die Armband-Weckeruhr, Calibre TIME-O-VOX 464 technical article',
    'K. H. Pritchard, Swiss Timepiece Makers: 1775–1975, Tavannes section',
    'U.S. Senate Committee on Government Operations, Swiss Watches—Adjustments, hearings, 1956',
    'Musée international d’horlogerie (MIH), reply dated 18 Sep. 2025',
    'Office des archives de l’Etat, Neuchâtel, reply dated 14 Nov. 2025',
    'VINTAGE ALARM / TypeC observed-specimen table and observations of the specimen shown here',
    'Chrono24 / Plus Ultra AG purchase certificate and listing for the specimen shown here, Ref. 1283',
    'HODINKEE Shop, 1950s Cyma Time-O-Vox, Reference 1283',
    'Pamono, Cyma Time-O-Vox Watch from Cymaflex, Ref. 1283'
  ]
};

export const germanCymaChronometreResearch = {
  ...jaData,
  title: 'CYMA TIME-O-VOX CHRONOMÈTRE',
  heading: 'Time-O-Vox Chronomètre',
  lead: [
    'Eine Time-O-Vox im 18K-Gehäuse mit der Aufschrift „CHRONOMÈTRE“ auf dem Zifferblatt.',
    'Diese Seite verfolgt die Unterschiede zwischen dieser Zifferblattaufschrift und den Kennzeichnungen erhaltener Exemplare.'
  ],
  documented: {
    title: 'Auch die Time-O-Vox gab es als Chronomètre',
    intro: 'Die Chronomètre-Ausführung ist dokumentiert. Bei den erhaltenen Exemplaren sind die Kennzeichnungen jedoch nicht einheitlich.',
    cards: [
      {
        label: 'MIH',
        title: 'Chronometerzertifizierung für goldene Time-O-Vox',
        body: 'Vom Musée international d’horlogerie geteilte CYMA-Unterlagen dokumentieren die Chronometerzertifizierung goldener Time-O-Vox-Uhren.'
      },
      {
        label: 'HORLBECK',
        title: 'Prüfung in fünf Lagen und bei unterschiedlichen Temperaturen',
        body: 'The Alarm Wristwatch beschreibt eine Chronomètre-Ausführung des Cal. R.464 und nennt eine Prüfung in fünf Lagen und bei unterschiedlichen Temperaturen.'
      },
      {
        label: 'BEITL',
        title: 'Das Goldmodell als Chronometer-Ausführung',
        body: 'Alarm am Arm schreibt zur Time-O-Vox im 14K-Goldgehäuse mit durchbrochenen Bandanstößen, dass dieses Goldmodell stets als Chronometer ausgeführt wurde. Gezeigt werden sowohl ein Exemplar mit Chronometerkennzeichnung auf Zifferblatt und Werk als auch eines ohne entsprechende Zifferblattaufschrift, aber mit Chronometerkennzeichnung auf dem Werk.'
      }
    ]
  },
  observed: {
    ...jaData.observed,
    title: 'Die Kennzeichnungen stimmen nicht durchgehend überein',
    intro: 'Hier werden siebzehn Exemplare gegenübergestellt, die sich über Verkaufsangebote, Fachliteratur, Reparaturberichte, Videos und soziale Medien nachweisen lassen.',
    note: 'Im Arbeitsdatensatz dienen die Werknummern vor allem dazu, Doppelzählungen durch wiederverwendete Angebote oder erneute Verkäufe zu vermeiden. Auf der öffentlichen Seite werden die Werknummern nur als Nummernbereiche wiedergegeben.',
    specimens: localizeSpecimens('de')
  },
  mismatch: {
    title: 'Die Kennzeichnungen stimmen nicht durchgehend überein',
    intro: 'Bei den beobachteten Exemplaren lassen sich Zifferblattaufschrift, Regulierungsangabe und Gehäusematerial nicht einfach eins zu eins einander zuordnen.',
    cards: [
      {
        label: 'Gezeigtes Exemplar',
        title: 'Chronomètre auf dem Zifferblatt',
        body: 'Das hier gezeigte Exemplar besitzt ein 18K-Gehäuse und die Aufschrift CHRONOMÈTRE auf dem Zifferblatt. Eine Gravur über die Regulierung in fünf Lagen und bei unterschiedlichen Temperaturen ist auf dem Werk nicht erkennbar.'
      },
      {
        label: 'Fünf Lagen',
        title: 'Keine Zifferblattaufschrift, aber Regulierung in fünf Lagen und Temperatur',
        body: 'Bei einem goldfarbenen Exemplar fehlt die Chronomètre-Aufschrift auf dem Zifferblatt, während auf dem Werk „ADJUSTED TO FIVE POSITION(S) AND TEMPERATURE“ eingraviert ist.'
      },
      {
        label: 'UNADJUSTED',
        title: 'Goldfarbenes Gehäuse, UNADJUSTED',
        body: 'Umgekehrt ist ein goldfarbenes Exemplar dokumentiert, dessen Werk die Gravur UNADJUSTED trägt.'
      }
    ]
  },
  archive: {
    title: 'Was die Archivanfragen ergeben haben',
    intro: '2025 wurden das Musée international d’horlogerie (MIH) und das Staatsarchiv Neuenburg angefragt. Das MIH antwortete auf Ebene der Modellunterlagen; in Neuenburg wurde gezielt nach einem Exemplar aus dem Werknummernbereich 4xx gesucht.',
    cards: [
      {
        label: 'MIH / 18. SEP. 2025',
        title: 'Modellunterlagen',
        body: 'Ein direkt auf die Time-O-Vox Chronomètre bezogenes Dokument konnte nicht identifiziert werden. In den CYMA-Unterlagen fand sich jedoch ein Hinweis auf ausgestellte Zertifikate für goldene Weckeruhren; dieses Material wurde zur Verfügung gestellt.'
      },
      {
        label: 'NEUCHÂTEL / 14. NOV. 2025',
        title: 'Werknummernbereich 4xx',
        body: 'Für die erneute Anfrage wurden Werknummer 4xx, die Gehäuseinnennummer 8 6525, BT sowie der Zeitraum 1954–1958 angegeben. Acht BT-Register mit jeweils ungefähr 100 Seiten wurden geprüft, ohne dass sich eine dem hier gezeigten Exemplar entsprechende Prüfung finden ließ.'
      }
    ]
  },
  tariff: {
    ...jaData.tariff,
    title: 'Was bei Tavannes geschah',
    intro: 'Eine Anhörung des US-Senats von 1956 behandelte Fälle, in denen regulierte Schweizer Uhren mit der Kennzeichnung „unadjusted“ eingeführt wurden, um zusätzliche Zölle zu vermeiden.',
    body: [
      'Ein von K. H. Pritchard genanntes Beispiel betrifft Tavannes. In der Werbung des Werks hieß es, alle Werke würden in Lagen und Temperatur reguliert; eine in Washington, D.C. verkaufte Uhr trug dagegen die Gravur „unadjusted“.',
      'CYMA WATCH CO. SA wird bei Pritchard im Abschnitt zu Tavannes als Unternehmen der Gruppe aufgeführt.',
      'Aus der Gravur UNADJUSTED einer Time-O-Vox allein lässt sich daher nicht ableiten, dass das Werk tatsächlich unreguliert ausgeliefert wurde.'
    ],
    caption: 'Die betreffende Passage aus U.S. Senate, Swiss Watches—Adjustments (1956).'
  },
  logic: [
    {
      label: 'BELEG',
      title: 'Exportfälle, bei denen Gravur und tatsächliche Regulierung nicht übereinstimmten',
      body: 'Die Anhörung des US-Senats von 1956 behandelte regulierte Schweizer Uhren, die zur Vermeidung zusätzlicher Zölle als „unadjusted“ eingeführt wurden. Pritchard fasst den Tavannes-Fall so zusammen: Die Werkswerbung erklärte, alle Werke würden in Lagen und Temperatur reguliert, während eine in Washington, D.C. gekaufte Uhr die Gravur „unadjusted“ trug.'
    },
    {
      label: 'BEOBACHTUNG',
      title: 'UNADJUSTED findet sich auch bei Time-O-Vox-Werken',
      body: 'Unter den siebzehn beobachteten Exemplaren findet sich die Gravur UNADJUSTED sowohl bei goldfarbenen als auch bei Edelstahlgehäusen. Andere Uhren tragen keine Chronomètre-Aufschrift auf dem Zifferblatt, wohl aber eine Werkgravur über die Regulierung in fünf Lagen und bei unterschiedlichen Temperaturen.'
    },
    {
      label: 'SCHLUSS',
      title: 'UNADJUSTED allein schließt eine Chronomètre-Ausführung nicht aus',
      body: 'Da bei Exportuhren aus dem Tavannes-Umfeld Fälle dokumentiert sind, in denen die Gravur nicht dem tatsächlichen Regulierungszustand entsprach, könnte auch eine mit UNADJUSTED gekennzeichnete Time-O-Vox reguliert und als Chronomètre-Ausführung ausgeliefert worden sein. Für ein bestimmtes Exemplar wären dafür weiterhin ein Zertifikat, ein Observatoriumsregister oder vergleichbare Unterlagen erforderlich.'
    }
  ],
  failure: {
    ...jaData.failure,
    title: 'Abweichendes Verhalten bei der Alarmauslösung',
    intro: 'B. Humberts technische Beschreibung des R.464 hält fest, dass der Alarm bei beiden Drückern in Neutralstellung auslösen kann und gesperrt wird, sobald einer der Drücker vollständig hineingedrückt ist.',
    normalTitle: 'Drei beobachtete Exemplare',
    normalBody: 'Nach Humberts Beschreibung des R.464 kann der Alarm nur bei beiden Drückern in Neutralstellung arbeiten; wird einer der Drücker vollständig hineingedrückt, ist der Alarm gesperrt.',
    observedTitle: 'Der Alarm ertönt trotz hineingedrücktem Drücker',
    observedBody: 'Bei drei Exemplaren wurde dennoch beobachtet, dass der Alarm ertönt, obwohl einer der Drücker hineingedrückt bleibt.',
    hypothesisTitle: 'Lagerstelle des Umschalthebels',
    hypothesisBody: 'Beim hier gezeigten Exemplar könnten Verschleiß oder Spiel an der Lagerstelle des Umschalthebels dessen Position so verändern, dass der Weg bis zur Sperrstellung nicht ausreicht. Das Innere der beiden anderen Exemplare wurde nicht untersucht.',
    examples: [
      'Gezeigtes Exemplar',
      'Ein weiteres Exemplar in einem veröffentlichten Video',
      'Ein in Japan angebotenes Exemplar'
    ],
    images: [
      {
        image: '/images/Cyma timeovox 故障個所ムーブメント.png',
        caption: 'Alarmfeder auf dem Werk, ungefähr von 5 bis 11 Uhr verlaufend.',
        alt: 'Alarmfeder und Werk der CYMA R.464'
      },
      {
        image: '/images/Cyma timeovox 故障個所.png',
        caption: 'Beim hier gezeigten Exemplar befindet sich zusätzlich zur regulären Auslöseöffnung eine Kontaktspur an anderer Stelle (gelb markiert). Nach Aussage des Uhrmachers kann eine zu hohe Federspannung dort denselben Zustand hervorrufen wie beim Eintritt in die Auslöseöffnung und so den Alarm auslösen. Ob bei den beiden anderen R.464 mit demselben Verhalten dieselbe Ursache vorliegt, ist unbekannt.',
        alt: 'Kontaktspur im Bereich der Alarm-Auslösefeder der gezeigten CYMA R.464'
      }
    ],
    youtubeCaption: 'Gezeigtes Exemplar. Im Zustand beim Kauf ist zu erkennen, dass der Alarm auch bei hineingedrücktem Drücker bei 4 Uhr ertönt.'
  },
  conclusion: {
    title: 'Was sich derzeit sagen lässt',
    items: [
      {
        label: 'DOKUMENTIERT',
        text: 'Es liegen Aufzeichnungen über Chronometerzertifizierungen goldener Time-O-Vox-Uhren vor; die Existenz einer Time-O-Vox-Chronomètre-Ausführung ist damit belegt.'
      },
      {
        label: 'BEOBACHTET',
        text: 'Chronomètre-Aufschrift, Regulierungsgravur, Gehäusematerial, Gehäusecode und Verkäuferreferenz stehen bei den erhaltenen Exemplaren nicht in einer einfachen Eins-zu-eins-Beziehung.'
      },
      {
        label: 'OFFEN',
        text: 'Weiterhin lässt sich kein bestimmtes erhaltenes Exemplar sicher einer konkreten damaligen Zertifizierungs- oder Prüfaufzeichnung zuordnen.'
      }
    ]
  },
  sources: [
    'Historisches CYMA-Material aus einer Bibliotheksdatei des Musée international d’horlogerie (MIH)',
    'Michael Philip Horlbeck, The Alarm Wristwatch, Schiffer Publishing, 2007, Abschnitt CYMA',
    'Leonhard Beitl, Alarm am Arm, 2009, S. 134–136',
    'B. Humbert, Die Armband-Weckeruhr, technischer Artikel zu Calibre TIME-O-VOX 464',
    'K. H. Pritchard, Swiss Timepiece Makers: 1775–1975, Abschnitt Tavannes',
    'U.S. Senate Committee on Government Operations, Swiss Watches—Adjustments, Anhörungen 1956',
    'Musée international d’horlogerie (MIH), Antwort vom 18. Sep. 2025',
    'Office des archives de l’Etat, Neuchâtel, Antwort vom 14. Nov. 2025',
    'VINTAGE ALARM / TypeC-Tabelle der beobachteten Exemplare und Beobachtungsprotokoll des hier gezeigten Exemplars',
    'Chrono24 / Plus Ultra AG, Kaufzertifikat und Angebot des hier gezeigten Exemplars, Ref. 1283',
    'HODINKEE Shop, 1950s Cyma Time-O-Vox, Reference 1283',
    'Pamono, Cyma Time-O-Vox Watch from Cymaflex, Ref. 1283'
  ]
};

export const cymaChronometreResearchByLocale = {
  en: englishCymaChronometreResearch,
  de: germanCymaChronometreResearch
};
