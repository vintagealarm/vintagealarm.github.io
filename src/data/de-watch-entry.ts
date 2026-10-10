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
    video?: {
      src: string;
      title: string;
      afterParagraph: number;
      ariaLabel?: string;
    };
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
  'arsa-blind-alarm': {
    slug: 'arsa-blind-alarm',
    title: 'ARSA Blind Alarm — taktile Wecker-Armbanduhr mit AS 1475 | VINTAGE ALARM',
    description: 'ARSA Blind Alarm mit AS 1475: aufklappbarer Vorderdeckel, erhabene Tastmarken und Zeiger sowie ein Alarmzeiger, dessen eingestellte Zeit ertastet werden kann.',
    indexBlurb: 'Den Vorderdeckel öffnen und sowohl die Uhrzeit als auch die Alarmzeit mit der Fingerspitze lesen.',
    catch: ['Deckel öffnen und die Zeit ertasten.', 'Sogar die vorgemerkte Alarmzeit lässt sich mit der Fingerspitze lesen.'],
    ownersNote: {
      lead: [
        'Ein Druck auf die Mitte der Krone bei 4 Uhr öffnet den Vorderdeckel.',
        'Die aktuelle Zeit wird an den erhabenen Marken und breiten Zeigern ertastet,',
        'die eingestellte Weckzeit am mittleren Alarmzeiger.'
      ],
      guideTitle: 'Kurzanleitung',
      guide: [
        'Die folgenden Angaben beruhen auf der Literatur. Bedienung und Zustand des gezeigten Exemplars werden nach seiner Ankunft geprüft.',
        '1. Vorderdeckel öffnen — den Drücker in der Mitte der Aufzugskrone bei 4 Uhr betätigen',
        '2. Uhrzeit lesen — die erhabenen Marken sowie Stunden- und Minutenzeiger ertasten',
        '3. Alarmzeit lesen — am mittleren Alarmzeiger die eingestellte Zeit prüfen',
        '4. Alarmzeit einstellen — die Alarmkrone bei 2 Uhr verwenden',
        '5. Aufziehen — Uhrwerk und Alarmwerk mit den jeweiligen Kronen aufziehen'
      ],
      noteTitle: 'NOTE',
      note: [
        'Auf dem Zifferblatt liegen erhabene Stundenmarken und drei Zeiger.',
        'Stunden- und Minutenzeiger sind so breit ausgeführt, dass sie direkt berührt werden können; ein Sekundenzeiger fehlt.',
        'Der Öffner des Vorderdeckels sitzt in der Mitte der Aufzugskrone bei 4 Uhr.',
        'Die Uhr übersetzt ihre Zustände in Formunterschiede und gibt unsichtbare Information an die Fingerspitze weiter.'
      ]
    },
    spec: {
      era: '1958 (Beispiel in der Fachliteratur); Baujahr des gezeigten Exemplars ungeklärt',
      caseSize: 'ca. 33 mm (gezeigtes Exemplar; noch nicht nachgemessen)',
      caliber: 'A. Schild AS 1475',
      jewels: '17 Steine',
      frequency: '18.000 A/h',
      barrels: '2 Federhäuser',
      winding: 'Handaufzug',
      acoustic: 'Mechanischer Alarm',
      notes: 'Aufklappbarer Vorderdeckel, Tastmarken und tastbare Zeiger, mittiger Drücker in der Krone bei 4 Uhr. Gehäusematerial und genaues Baujahr ungeklärt.'
    },
    specimenGallery: [],
    deepDive: [
      {
        number: '01', title: 'Auguste Reymond / ARSA',
        paragraphs: [
          'Auguste Reymond begann 1898 im schweizerischen Tramelan mit der Uhrenfertigung und eröffnete 1903 eine Fabrik. 1926 übernahm er die Unitas Watch Co. und schuf damit eine Struktur, die auch Uhrwerke herstellte. Nach der Neuordnung der Schweizer Uhrenindustrie 1931–33 wurden die Aufgaben zwischen A. Reymond / ARSA für fertige Uhren und Unitas auf der Ébauche-Seite geteilt.[1][2]',
          'Das Dictionnaire du Jura hält fest, dass ARSA Anfang der 1950er-Jahre eine Uhr für blinde Menschen entwickelte. Im selben Zeitraum fertigte das Unternehmen auch konventionelle mechanische Wecker-Armbanduhren.[2][3]',
          'Eine Anzeige von A. Reymond im Davoine von 1970 nennt „Montres pour aveugles“ und „Montres bracelet réveil“ nebeneinander. Sie belegt auf Unternehmensebene, dass ARSA sowohl Uhren für blinde Menschen als auch Wecker-Armbanduhren anbot; sie ist keine Anzeige für die Blind Alarm selbst.[4]'
        ], citationRefs: ['1,2', '2,3', '4']
      },
      {
        number: '02', title: 'Vom Ertasten der Uhrzeit zum Ertasten der Alarmzeit',
        paragraphs: [
          'Uhren, die ohne Sehen abgelesen werden konnten, entstanden nicht erst in den 1950er-Jahren. Das 1887 erteilte US-Patent US365032 beschreibt erhabene Marken und durch Berührung unterscheidbare Zeiger, mit denen die Uhrzeit mit der Fingerspitze gelesen wird.[5]',
          'Im Ersten Weltkrieg wurden Tastuhren bei der Rehabilitation erblindeter Soldaten eingesetzt. Im 1915 gegründeten St Dunstan’s erhielten sie solche Uhren und lernten, die Zeit selbstständig zu bestimmen. In den USA übernahm die American Foundation for the Blind 1926 einen Uhrendienst.[6][7]',
          'Während des Zweiten Weltkriegs verteilte die AFB Braille-Uhren an erblindete Soldaten und reinigte, reparierte und ergänzte gespendete Uhren um Tastmarken. In Japan fertigte Seikosha 1939 eine Tast-Taschenuhr; erhaltene Unterlagen nennen Exemplare, die im Krieg erblindeten Soldaten überreicht wurden.[8][9]',
          'Bei der ARSA Blind Alarm lässt sich nicht nur die aktuelle Zeit, sondern auch die Alarmzeit ertasten. Die mit der Krone bei 2 Uhr eingestellte Zeit kann am separaten Alarmzeiger geprüft werden.[3][10]'
        ], citationRefs: ['5', '6,7', '8,9', '3,10']
      },
      {
        number: '03', title: 'ARSA Blind Alarm', subtitle: 'Eine taktile Schnittstelle rund um das AS 1475',
        paragraphs: [
          'Alarm am Arm schreibt, dass ARSA um 1956 eine Blind Alarm mit dem A. Schild AS 1475 fertigte. Das dort abgebildete Exemplar von 1958 besitzt ein Zifferblatt mit Tastpunkten, ausreichend robuste Stunden- und Minutenzeiger für direkte Berührung, keinen Sekundenzeiger und einen Öffner des Vorderdeckels in der Mitte der Krone bei 4 Uhr.[3]',
          'Das AS 1475 misst 25,94 mm im Durchmesser und 5,8 mm in der Höhe, besitzt 17 Steine und läuft mit 18.000 Halbschwingungen pro Stunde. Es ist ein Handaufzugswerk mit getrennten Federhäusern für Uhr und Alarm; gewöhnlich bedient die Seite bei 2 Uhr den Alarm und die Seite bei 4 Uhr die Uhr. Die Fachliteratur nennt etwa 40 Stunden Gangdauer und 10–15 Sekunden Alarmdauer.[10]',
          'Nach dem Öffnen des Vorderdeckels sind die erhabenen Marken und drei Zeiger direkt zugänglich. Die breiten Stunden- und Minutenzeiger zeigen die aktuelle Zeit, der separate Alarmzeiger die eingestellte Alarmzeit. Obwohl das AS 1475 eine Zentralsekunde unterstützt, fehlt bei dieser Blind Alarm der Sekundenzeiger, der das tastende Ablesen stören würde.[3][10]',
          'Das 1957 angemeldete Tastanzeige-Patent US2915874A nennt bei älteren Systemen das Problem, dass eine Berührung die Zeigerstellung verändern kann. Ob dies beim hier gezeigten ARSA-Exemplar ebenfalls geschieht, ist ungeklärt; Halt der Zeiger und Bediengefühl werden nach der Ankunft geprüft.[11]',
          'Auch eine ARSA Hunter-Taschenuhr von 1967 besitzt einen Vorderdeckel, der über einen Knopf auf der Krone geöffnet wird. Ein kronenintegrierter Öffner unterstützt bei der Blind Alarm das tastende Ablesen, doch lässt sich nicht belegen, dass ARSA diese Konstruktion eigens für blinde Menschen entwickelte.[12]'
        ], citationRefs: ['3', '10', '3,10', '11', '12']
      },
      {
        number: '04', title: 'Verschiedene Antworten auf denselben Zweck',
        paragraphs: [
          'Alarm am Arm dokumentiert neben ARSA auch Blind-Alarm-Uhren von Enicar, BEAT / Friedli-Frères und A. Schild selbst. Bei allen wird ein Deckel geöffnet, damit Zeiger und Marken ertastet werden können; Öffnungsmechanismus und Unterscheidung der Zeiger sind jedoch verschieden.[3]',
          'ARSA integriert den Öffner des Vorderdeckels in die Mitte der Aufzugskrone bei 4 Uhr. Bei einem 1964 für Lausanne gefertigten Enicar-Sonderexemplar unterscheiden sich Minuten-, Stunden- und Alarmzeiger in der Breite; die Spitze des Alarmzeigers trägt vier Erhebungen. Auch die beiden Kronen sind durch Berührung unterscheidbar geformt.[10]',
          'BEAT / Friedli-Frères setzte das AS 1475 in ein 33,8-mm-Gehäuse und platzierte den separaten Deckelöffner bei 6 Uhr statt in der Krone bei 4. Auch A. Schild selbst ist mit einem Blind-Alarm-Prototyp auf Basis des AS 1475 dokumentiert; die hier verwendeten Quellen zeigen jedoch weder Tastcodes der Zeiger noch die Deckelkonstruktion.[3]',
          'Ein 2016 im Uhrforum vorgestellter ARSA Blindenwecker verwendet statt des AS 1475 ein Venus 230. Sein Vorderdeckel wird durch einen separaten Drücker bei 2 Uhr geöffnet. Der Verfasser beschreibt ihn als Uhr der 1950er-Jahre; ein zeitgenössischer ARSA-Katalog oder eine entsprechende Anzeige wurde bislang nicht gefunden.[13]',
          'Position des Deckelöffners, Breite und Oberfläche der Zeiger und Form der Kronen unterscheiden sich. Tastbare Wecker-Armbanduhren verfolgten dasselbe Ziel, übermittelten die Information an die Fingerspitze aber auf verschiedene Weise.[3][10][13]'
        ], citationRefs: ['3', '10', '3', '13', '3,10,13']
      },
      {
        number: '05', title: 'Ein gewöhnliches AS 1475 wird zu einer anderen Uhr',
        paragraphs: [
          'Das AS 1475 war ein in großer Stückzahl gefertigtes Weckerwerk: Von 1954 bis 1970 entstanden etwa 780.000 Stück, verwendet unter anderem von Tissot, Gallet, Benrus und Helbros.[10]',
          'Auch die Benedict Park-O-Phon ist ein Beispiel für ein AS 1475 mit besonderem Zweck. Sie deutete die übliche Alarmanzeige zur Kontrolle der Parkzeit um und sollte auf das Ende der Zeit am Parkautomaten aufmerksam machen.[10][14]',
          'ARSA, Enicar und BEAT verwendeten dieselben Zeit- und Alarmfunktionen des AS 1475, gestalteten jedoch Deckel, Marken, Zeiger und Bedienelemente für das tastende Ablesen neu.[3][10]',
          'Zur Familie gehören das AS 1568 mit Datum, das auf 21.600 Halbschwingungen pro Stunde erhöhte AS 1930 und dessen Datumsversion AS 1931. Die Fachliteratur bezeichnet das AS 1930 als Nachfolger des AS 1475 und nennt außer der Frequenz keine wesentlichen technischen Änderungen.[10]',
          'Die Fachliteratur nennt außerdem Citizen-Weckerwerke und das Poljot 2612.1 als direkte Ableitungen des AS 1475. Eine Lizenzfertigung bei Citizen bleibt dort jedoch eine Vermutung, und auch der Weg des Technologietransfers zu Poljot ist in den hier verwendeten Quellen nicht belegt.[10]',
          'Das Besondere der ARSA Blind Alarm ist die um das AS 1475 ergänzte taktile Schnittstelle: Ein aufklappbarer Deckel, Tastmarken, berührbare Zeiger und passende Bedienelemente verbinden sich mit einem seriengefertigten Weckerwerk.[3][10]'
        ], citationRefs: ['10', '10,14', '3,10', '10', '10', '3,10']
      }
    ],
    sourceMeta: [
      { id: '1', type: 'primary' }, { id: '2', type: 'reference' }, { id: '3', type: 'reference' }, { id: '4', type: 'primary' },
      { id: '5', type: 'primary' }, { id: '6', type: 'reference' }, { id: '7', type: 'primary' }, { id: '8', type: 'primary' },
      { id: '9', type: 'primary' }, { id: '10', type: 'reference' }, { id: '11', type: 'primary' }, { id: '12', type: 'primary' },
      { id: '13', type: 'provenance' }, { id: '14', type: 'reference' }
    ],
    sources: [
      '[Auguste Reymond — History](https://augustereymond.ch/about-ar/history/) — Gründung 1898, Fabrik 1903 und Übernahme von Unitas 1926.',
      '[Dictionnaire du Jura — A. Reymond SA / ARSA](https://diju.ch/f/notices/detail/8205) — Unternehmensgeschichte, Uhren für blinde Menschen Anfang der 1950er-Jahre und Fertigungsprogramm 1973.',
      'Leonhard Beitl, Alarm am Arm (2009), S. 26, 54, 74 u. a. — ARSA Blind Alarm, AFB, Enicar, BEAT und A. Schild.',
      '[Davoine 1970 — Anzeige von A. Reymond SA](https://doc.rero.ch/record/323602/files/DAVOINE_1970-2.pdf) — Montres pour aveugles / Montres bracelet réveil.',
      '[US365032 — Watch for the Blind](https://patents.google.com/patent/US365032) — Tastmarken und tastbare Zeiger, 1887.',
      '[Blind Veterans UK — History / Archives](https://www.blindveterans.org.uk/about-us/who-we-are/our-history/) — St Dunstan’s, Tastuhren und Rehabilitation seit 1915.',
      '[American Foundation for the Blind — Chapter 7](https://afb.org/online-library/unseen-minority-0/chapter-7) — Übernahme des Uhrendienstes 1926.',
      '[American Foundation for the Blind — Chapter 17](https://www.afb.org/about-afb/history/online-library/unseen-minority/chapter-17) — Ausgabe, Umbau und Reparatur von Braille-Uhren für erblindete Soldaten.',
      '[Seiko Museum Ginza — Watch for the Blind](https://museum.seiko.co.jp/en/collections/watch_previousterm/collect044/) — Tast-Taschenuhr von Seikosha, 1939, und Beispiele kriegszeitlicher Übergaben.',
      'Michael Philip Horlbeck, The Alarm Wristwatch (Schiffer Publishing, 2007), S. 81–83, 222–223 u. a. — Daten und Bedienung des AS 1475, Tastwecker, Ableitungen und Nachfolger.',
      '[US2915874A — Tactile Indicators](https://patents.google.com/patent/US2915874) — Anmeldung 1957; Verstellen bei direkter Berührung der Zeiger.',
      '[Swisstime — ARSA hunter pocket watch](https://www.swisstime.ch/news/history-of-the-ar-hunter-pocket-watch/) — kronenintegrierter Vorderdeckelknopf, 1967.',
      '[Uhrforum — ARSA Blindenwecker / erhaltenes Exemplar mit Venus 230](https://uhrforum.de/threads/vintage-armbandwecker-zeigt-sie-in-bild-und-ton.16190/page-25) — 2016 vorgestelltes Exemplar; zeitgenössischer Primärbeleg ungeklärt.',
      '[Grail Watch Wiki — Parking watch](https://wiki.grail-watch.com/index.php/Parking_watch) — Parkzeitanzeige der Benedict Park-O-Phon.'
    ],
    related: { href: '/de/citizen-alarm/', hreflang: 'de', name: 'CITIZEN ALARM', reason: 'Eine weitere Weckerarchitektur mit zwei Federhäusern und Bezug zum AS 1475 aus demselben Jahrzehnt.' }
  },
  'basis-alarm': {
    slug: 'basis-alarm',
    title: 'Basis Alarm BFG 90 — Mechanischer Wecker mit zwei Federhäusern | VINTAGE ALARM',
    description: 'Basis Alarm mit Baumgartner BFG 90: zwei Federhäuser, Aufzug beider Seiten in derselben Drehrichtung, Rutschkupplungen, zwei Aufzugskontrollfenster, Alarmzeiteinstellung über die Drehlünette, Fotos des gezeigten Exemplars, Original-Alarmton und Quellen.',
    indexBlurb: 'Zwei Federhäuser, eine Drehrichtung, zwei rotierende Kontrollfenster — und ein Alarm, der wie eine Zikade klingt.',
    catch: ['Ein kleines mechanisches Spielzeugkästchen zum Anfassen, Anschauen und Anhören.'],
    ownersNote: {
      lead: [
        'Ein kleines mechanisches Spielzeugkästchen zum Anfassen, Anschauen und Anhören.',
        'Den Alarm stellt man mit der Lünette ein.',
        'Beim Aufziehen drehen sich die Scheiben in den beiden kleinen Fenstern.',
        'Den Schieber auf EIN — und dann kommt der Zikadenklang.'
      ],
      guideTitle: 'Kurzanleitung',
      guide: [
        '① Aufziehen — Krone in Normalposition: zieht die Zugfedern von Gehwerk und Alarm in derselben Drehrichtung auf',
        '② Uhrzeit einstellen — Krone herausziehen und die Zeiger stellen',
        '③ Alarmzeit einstellen — Lünette gegen den Uhrzeigersinn drehen',
        '④ Alarm EIN/AUS — Schieber bei 9 Uhr: oben = AUS / unten = EIN',
        '⑤ Aufzugskontrollfenster — bei 1 Uhr für das Gehwerk, bei 5 Uhr für den Alarm; die rot-weiß-blauen Scheiben drehen sich beim Aufziehen'
      ],
      noteTitle: 'NOTE',
      note: [
        'Die Basis Alarm verwendet das Baumgartner BFG 90, ein frühes Werk für Wecker-Armbanduhren, das auch unter Namen wie Lantex, Sheffield, Simplon und Tior zu finden ist.',
        'Anders als bei hochpreisigen Modellen wie Memovox oder Cricket liegen beim BFG 90 viele Funktionen offen sichtbar an der Uhr: Drehlünette, Schieber und zwei Aufzugskontrollfenster.',
        'Gerade diese direkte Mechanik macht die Uhr heute so angenehm sichtbar und fühlbar.'
      ]
    },
    spec: {
      era: 'um 1948 (Dokumentation eines vergleichbaren Typs)',
      caseSize: '34 mm (gezeigtes Exemplar)',
      caliber: 'Baumgartner BFG 90',
      jewels: '17 Steine',
      frequency: '18.000 A/h',
      barrels: '2 Federhäuser',
      winding: 'Handaufzug',
      acoustic: 'Bodenglocke',
      notes: 'Alarmdauer ca. 10 Sekunden (Horlbeck / gezeigtes Exemplar), Alarmzeiteinstellung über Drehlünette, EIN/AUS-Schieber bei 9 Uhr, Aufzugskontrollfenster bei 1 und 5 Uhr'
    },
    specimenGallery: [
      { image: '/images/IMG_8890-1.jpeg', label: 'Vorderseite — am Handgelenk', alt: 'Basis Alarm BFG 90, gezeigtes Exemplar, Vorderseite am Handgelenk' },
      { image: '/images/IMG_9196.jpeg', label: 'Weckerzeiger — direkt mit der Lünette verbunden', alt: 'Basis Alarm BFG 90, Weckerzeiger und Drehlünette' },
      { image: '/images/IMG_1969.jpeg', label: 'EIN/AUS-Schieber bei 9 Uhr', alt: 'Basis Alarm BFG 90, Alarm-EIN/AUS-Schieber bei 9 Uhr' },
      { image: '/images/IMG_1968.jpeg', label: 'Gehäuseboden', alt: 'Gehäuseboden der gezeigten Basis Alarm BFG 90' },
      { image: '/images/70957643-C7C5-4A86-B1BF-11AB18A28299-2.jpeg', label: 'Werk', alt: 'Baumgartner BFG 90 im gezeigten Basis-Alarm-Exemplar' }
    ],
    deepDive: [
      {
        number: '01',
        title: 'Baumgartner Frères — Werke für den Massenmarkt bauen',
        paragraphs: [
          'Baumgartner Frères war ein Ébauche-Hersteller, der Uhrwerke an andere Firmen lieferte. Viele BFG-Werke waren konstruktiv auf vergleichsweise preisgünstige Uhren ausgerichtet. Die Stiftankerhemmung war ein Beispiel dafür.',
          'Das BFG 90 ist in Säulenbauweise aufgebaut. Flache Platinen werden durch Säulen auf Abstand gehalten und verbunden, wodurch aufwendige Fräsarbeiten reduziert werden. Auch der Zeigerstellmechanismus liegt auf der Werkseite statt unter dem Zifferblatt. Der Kupplungshebel benötigt keine separate Feder; der Hebel selbst übernimmt die Federwirkung.',
          'An der Unruh sitzen Vorsprünge, die auf den ersten Blick wie Schrauben einer Schraubenunruh wirken. Tatsächlich sind es keine Schrauben, sondern fest mitgeformte halbrunde Verzierungen.',
          'Bearbeitung, die entfallen konnte, wurde gestrichen. Teile, die sich reduzieren ließen, wurden reduziert. Die konstruktive Idee des BFG 90 liegt damit an einer ganz anderen Stelle als die Finissierung eines hochwertigen Werks.'
        ],
        citationRefs: ['2', '2', '2', '2']
      },
      {
        number: '02',
        title: 'Eine Krone, eine Drehrichtung, zwei Federhäuser',
        paragraphs: [
          'Das BFG 90 besitzt je ein Federhaus für Gehwerk und Alarm. Zwei Federhäuser an sich sind nicht ungewöhnlich. Ungewöhnlich ist die Art des Aufzugs: Mit einer einzigen Krone werden beide in derselben Drehrichtung aufgezogen.',
          'Man wählt also nicht durch Wechsel der Drehrichtung zwischen Gehwerk und Alarm. Beim Weiterdrehen in derselben Richtung erhalten beide Zugfedern Energie. Dabei müssen beide Federhäuser nicht gleichzeitig voll aufgezogen sein. Ist eines zuerst voll, muss das andere weiter aufgezogen werden können, ohne die bereits volle Seite weiter zu belasten.',
          'Dafür besitzt das BFG 90 an jeder Aufzugsseite eine Rutschkupplung. Sie lässt nur die bereits voll aufgezogene Seite durchrutschen.',
          'Das Sperrrad ist zweiteilig ausgeführt; dazwischen drückt eine kreuzförmige Feder. Im normalen Aufzug drehen beide Teile gemeinsam. Sobald die Zugfeder dieser Seite voll aufgezogen ist, beginnt nur diese Seite zu rutschen.',
          'Wenn ein Federhaus voll ist, endet der Aufzug deshalb konstruktiv noch nicht. Die Kupplung der vollen Seite kann durchrutschen, während das andere Federhaus weiter bis zum Vollaufzug gebracht wird.'
        ],
        citationRefs: ['1,2', '2', '2', '2', '2'],
        images: [
          {
            src: '/images/70957643-C7C5-4A86-B1BF-11AB18A28299.jpeg',
            caption: 'BFG 90 — der Aufzug versorgt zwei Federhäuser über eine einzige Krone.',
            alt: 'Baumgartner BFG 90 mit Aufzugsmechanismus für zwei Federhäuser',
            afterParagraph: 4
          }
        ]
      },
      {
        number: '03',
        title: 'Warum zwei kleine Fenster im Zifferblatt sitzen',
        paragraphs: [
          'Eine Rutschkupplung nimmt dem Aufzug nicht jedes Gefühl für den Vollaufzug. Beim gezeigten Exemplar steigt der Widerstand deutlich an, wenn sich eine Zugfeder dem Vollaufzug nähert; die Krone fühlt sich dann beinahe wie an einem normalen Aufzugsanschlag an.',
          'Wer den Aufbau nicht kennt, würde an dieser Stelle vermutlich stoppen. Beim BFG 90 kann aber ein Federhaus bereits voll sein, während im anderen noch Aufzugsweg übrig ist. Dann muss weitergedreht werden, während die Kupplung der bereits vollen Seite rutscht.',
          'Ohne Kenntnis der Konstruktion fühlt sich das etwas beunruhigend an: Man dreht weiter, obwohl die Krone bereits signalisiert, dass eigentlich Schluss sein müsste.',
          'Genau dafür sind die beiden kleinen Fenster im Zifferblatt da. Bei dieser Basis gehört das Fenster bei 1 Uhr zum Gehwerk, das bei 5 Uhr zum Alarm. Eine mit dem jeweiligen Federhaus gekoppelte Scheibe dreht sich beim Aufziehen; ist die Zugfeder voll, bleibt diese Scheibe stehen.',
          'Es sind keine Gangreserveanzeigen für die verbleibende Laufzeit. Es sind Aufzugskontrollfenster: Sie zeigen, welche Seite noch aufgezogen wird und welche bereits voll ist.',
          'Eine Krone zieht zwei Federhäuser in derselben Richtung auf. Ist eines zuerst voll, lässt seine Rutschkupplung die weitere Kraft passieren. Die Krone kann sich dabei wie am Anschlag anfühlen, obwohl das andere Federhaus noch weiter aufgezogen werden muss. Die beiden Fenster machen den Zustand jeder Seite sichtbar. Zwei Federhäuser, Rutschkupplungen und Aufzugskontrollfenster sind deshalb keine voneinander unabhängigen Spielereien, sondern Teile eines einzigen Bedienprinzips.'
        ],
        citationRefs: ['3', '2,3', '3', '1,2,3', '1,2', '2,3']
      },
      {
        number: '04',
        title: 'Ein BFG 90, viele Gesichter',
        paragraphs: [
          'Das BFG 90 war kein exklusives Basis-Werk. Es wurde unter mehreren Marken eingesetzt, darunter Lantex, Sheffield, Simplon und Tior.',
          'Trotz identischem Werk können die Uhren deutlich unterschiedlich aussehen. Bei Sheffield und Lantex finden sich relativ schlanke, dekorative Gehäuse; Simplon und Tior zeigen auch größere, kräftigere Ausführungen. Bandanstöße, Lünetten und Zifferblattgestaltung unterscheiden sich von Marke zu Marke.',
          'Viele BFG-90-Uhren teilen dennoch sichtbare Merkmale: Drehlünette, EIN/AUS-Schieber bei 9 Uhr und zwei Aufzugskontrollfenster. Die Konstruktion des Werks zeichnet sich damit direkt auf Zifferblatt und Gehäuse ab.',
          'Unter wechselnden Markennamen und Gehäusen wurde dasselbe BFG 90 zu ganz unterschiedlichen Uhren. Gerade daran lässt sich die Rolle von Baumgartner Frères als Ébauche-Lieferant besonders deutlich ablesen.'
        ],
        citationRefs: ['1,2', '2', '1,2', '1,2']
      },
      {
        number: '05',
        title: 'BFG 90 → BFG 902 — die außenliegenden Funktionen verschwinden',
        paragraphs: [
          'Beim späteren BFG 902 wurden die Bedienelemente des BFG 90 zusammengefasst. Beim BFG 90 wird die Alarmzeit über die Drehlünette eingestellt und der Alarm mit dem Schieber bei 9 Uhr ein- und ausgeschaltet. Beim BFG 902 wandert auch die Alarmzeiteinstellung an die Krone.',
          'In einer Drehrichtung werden beide Federhäuser aufgezogen, in der anderen wird die Alarmzeit verstellt. Damit wird die Drehlünette überflüssig; auch der Schieber bei 9 Uhr verschwindet.',
          'Mit den weniger gewordenen Bedienelementen ändert sich auch das Abstellen des Alarms. Ohne separaten Schieber wird der Alarm beendet, indem die eingestellte Alarmzeit weiterbewegt wird. Spätere Ausführungen gibt es zudem mit Stoßsicherung.',
          'Der Schritt vom BFG 90 zum BFG 902 ist eher Vereinfachung und Rationalisierung als Veredelung. Die Grundidee, zwei Federhäuser über eine Krone zu bedienen, bleibt erhalten, während Lünette und Schieber von der Außenseite verschwinden.',
          'Die Bedienelemente, die beim BFG 90 offen um das Gehäuse lagen, wanderten beim Nachfolger Stück für Stück zurück in die Uhr.'
        ],
        citationRefs: ['1', '1', '1', '1', '1']
      }
    ],
    sourceMeta: [
      { id: '1', type: 'reference' },
      { id: '2', type: 'reference' },
      { id: '3', type: 'owner' }
    ],
    sources: [
      'Leonhard Beitl, Alarm am Arm (2009), S. 20, 87, 109, 172, 308, 398, 419, 622 — BFG 90 / BFG 902, Basis / Fabry / Maxor / Triwera, Bedienung und technische Angaben.',
      'Michael Philip Horlbeck, The Alarm Wristwatch (Schiffer Publishing, 2007), S. 88–91, 168–170 — Säulenbauweise, Rutschkupplung, Aufzugskontrolle, Gehäuse und Markenvarianten des BFG 90.',
      'OWNER OBSERVATION — Aufzugswiderstand sowie die beiden Aufzugskontrollfenster bei 1 und 5 Uhr und die Bewegung ihrer Scheiben am gezeigten Exemplar.'
    ],
    related: {
      href: '/de/westclox-watchlarm/',
      hreflang: 'de',
      name: 'WESTCLOX WATCHLARM',
      reason: 'Eine andere Antwort für den Massenmarkt: noch radikalere Kostensenkung, diesmal mit 0 Steinen.'
    }
  },
  'citizen-alarm': {
    slug: 'citizen-alarm',
    title: 'Citizen Alarm Cal. 980 — Japans erste Wecker-Armbanduhr mit hörbarem Alarm | VINTAGE ALARM',
    description: 'Citizen Alarm von 1958 mit Cal. 980: Japans erste Wecker-Armbanduhr mit hörbarem Alarm, zwei Federhäuser, zentrale drehbare Weckscheibe, zwei Kronen, doppelter Gehäuseboden, Entwicklung zur Four Hands und belegte Quellen.',
    indexBlurb: 'Japans erste Wecker-Armbanduhr mit hörbarem Alarm: zwei Federhäuser, zwei Kronen und eine zentrale drehbare Weckscheibe.',
    catch: ['Japans erste Wecker-Armbanduhr mit hörbarem Alarm — und der Beginn einer ganzen Linie.'],
    ownersNote: {
      lead: [
        '1958: Japans erste Wecker-Armbanduhr mit hörbarem Alarm.',
        'Eine drehbare Scheibe in der Mitte, dazu zwei Kronen.',
        'Ihr Gesicht erinnert an die frühere Memovox.',
        'Später kam sogar die Legende dazu, Jaeger-LeCoultre habe sich beschwert, weil sie zu ähnlich aussehe.'
      ],
      guideTitle: 'Kurzanleitung',
      guide: [
        '① Krone bei 4 Uhr — Gehwerk aufziehen; herausziehen zum Einstellen der Uhrzeit',
        '② Krone bei 2 Uhr — Alarmwerk aufziehen; herausziehen zum Einstellen der Alarmzeit'
      ],
      noteTitle: 'NOTE',
      note: [
        'Auf die erste Ausführung mit zentraler Scheibe folgte später die Four-Hands-Version.',
        'Danach kamen Alarm Date, College Alarm, Modelle mit Drehlünette im Taucherstil sowie Weckermodelle für Damen.',
        'Aus Japans erster Uhr dieser Art wurde eine ganze Citizen-Alarmfamilie.'
      ]
    },
    spec: {
      era: 'ab 1958 (frühe Ausführung mit zentraler Scheibe)',
      caseSize: 'ca. 34 mm (Dokumentation derselben Gehäusereferenz, ohne Kronen)',
      caliber: 'Citizen 980 (Dokumentation eines vergleichbaren Typs)',
      jewels: '19 Steine (am gezeigten Exemplar bestätigt)',
      frequency: '18.000 A/h (Dokumentation eines vergleichbaren Typs)',
      barrels: '2 Federhäuser',
      winding: 'Handaufzug',
      acoustic: 'Doppelter Gehäuseboden',
      notes: 'Zentrale drehbare Weckscheibe, zwei Kronen; Zifferblatt mit „19 JEWELS PHYNOX“, Werk mit „CITIZEN / NINETEEN JEWELS / 3 ADJ“ und Innenseite des Gehäusebodens mit „1407067“ gekennzeichnet'
    },
    specimenGallery: [
      { image: '/images/IMG_1695.jpeg', label: 'Vorderseite — am Handgelenk', alt: 'Citizen Alarm Cal. 980, gezeigtes Exemplar, Vorderseite am Handgelenk' },
      { image: '/images/IMG_2088.jpeg', label: 'Kronenseite', alt: 'Citizen Alarm Cal. 980, Seitenansicht mit zwei Kronen' },
      { image: '/images/IMG_2476.jpeg', label: 'Werk', alt: 'Werk des gezeigten Citizen-Alarm-Exemplars' },
      { image: '/images/IMG_2089.jpeg', label: 'Gehäuseboden', alt: 'Gehäuseboden des gezeigten Citizen-Alarm-Cal.-980-Exemplars' },
      { image: '/images/IMG_2477.jpeg', label: 'Innenseite des Gehäusebodens', alt: 'Innenseite des Gehäusebodens des gezeigten Citizen-Alarm-Exemplars' }
    ],
    deepDive: [
      {
        number: '01',
        title: '1958: Japans erste Wecker-Armbanduhr',
        paragraphs: [
          'In den Nachkriegsjahren erweiterte Citizen seine technische Basis und brachte zugleich neue Funktionen wie Kalender und Stoßsicherungen in seine Uhren. 1957 entwickelte das Unternehmen außerdem eigene Drehautomaten und Messgeräte für die Fertigung von Uhrenteilen.',
          '1958 folgten mehrere wichtige Neuheiten in kurzem Abstand: Im Mai erschien die Herren-Automatikuhr „Auto“, im Juni die „Alarm“, im August die flache hochwertige „Super Deluxe“.',
          'Die Citizen Alarm war Japans erste Armbanduhr mit hörbarem Weckalarm. Sie besitzt getrennte Federhäuser für Gehwerk und Alarm; zur eingestellten Zeit schlägt ein Hammer gegen den Gehäuseboden. Der Alarm läuft ungefähr zehn Sekunden. Auf das frühe Cal. A folgte Cal. 980.',
          'Ein Branchenbericht vom Juni 1958 nennt als endgültigen Verkaufspreis 9.200 Yen. Citizens heutige Modellhistorie nennt dagegen eine Spanne von 6.200 bis 11.500 Yen; der einzelne überlieferte Preis und die Preisspanne der Modellfamilie sind daher getrennt zu behandeln.',
          '1958 war damit eine Phase erreicht, in der japanische Uhren nicht mehr nur über die Zeitanzeige, sondern über komplexe Zusatzfunktionen als eigenständige Produkte konkurrierten.'
        ],
        citationRefs: ['3', '3', '1', '1,6', '2,3']
      },
      {
        number: '02',
        title: '173 Teile und zwei Federhäuser in Serienfertigung',
        paragraphs: [
          'Der Bericht zur Markteinführung von 1958 beschreibt das frühe Citizen-Alarm-Werk mit 27 mm Durchmesser, 5,7 mm Höhe und 19 Steinen. Es besteht aus 133 Teilearten und 173 Einzelteilen: Es handelte sich nicht nur um ein gewöhnliches Armbanduhrwerk mit zusätzlich eingebauter Glocke.',
          'Davon entfallen 85 Arten und 120 Teile auf das Gehwerk sowie 48 Arten und 53 Teile auf den Alarm. Gegenüber dem Gehwerk allein erhöhte der Alarm damit die Stückzahl um rund 44 Prozent und die Zahl der Teilearten um rund 56 Prozent.',
          'Die beiden Federhäuser teilen die Aufgaben. Über die Krone bei 4 Uhr wird das Gehwerk aufgezogen, über die Krone bei 2 Uhr das Alarmwerk. Die Energie für den Alarm wird getrennt von der Energie gespeichert, die die Uhr laufen lässt.',
          'Zur eingestellten Zeit gelangt die Kraft des Alarmfederhauses über das Alarm-Hemmungsrad zum Hammer, der gegen den Gehäuseboden schlägt. Am gezeigten Exemplar sind die Resonanzfläche in der Mitte des Bodens und die umlaufenden Öffnungen direkt erkennbar. Werk, Gehäuse und Klangkörper bilden erst gemeinsam das Alarmsystem.',
          'Mehr Teile erschweren nicht nur die Bearbeitung, sondern auch Montage, Regulierung, Versorgung und Ausschusskontrolle. Citizen Design bezeichnet die hohe Teilezahl ebenfalls als Herausforderung für die Produktivität und führt die mögliche Serienfertigung auf das Können der Fachkräfte zurück.',
          'Bereits 1957 hatte Citizen eigene Drehautomaten und Messgeräte für die Fertigung von Uhrenteilen entwickelt. Die Citizen Alarm ist daher nicht nur als komplizierte Konstruktion zu lesen, sondern ebenso als Ergebnis der Produktionstechnik, mit der sie dauerhaft gefertigt werden konnte.',
          'Das gezeigte Exemplar liefert erhaltene Sachbelege für diese frühe Spezifikation. Auf dem Zifferblatt steht „19 JEWELS PHYNOX“, auf dem Werk „CITIZEN / NINETEEN JEWELS / 3 ADJ“; beide nennen 19 Steine. Die frühere Angabe von 17 Steinen wird als Fehlablesung der Fotos berichtigt.',
          'Auf der Innenseite des Gehäusebodens stehen „CENTER SECOND“, eine sternförmige Marke, „STAINLESS STEEL“ und die Gehäusereferenz „1407067“. Ein separat veröffentlichtes Exemplar derselben Referenz ist ebenfalls mit 19 Steinen und einer Regulierung in drei Lagen dokumentiert; sein Durchmesser wird ohne Kronen mit etwa 34 mm angegeben. Die früheren 37 mm waren keine Messung dieses Exemplars und wurden durch den Wert derselben Referenz ersetzt.',
          '„PHYNOX“ ist nicht der Modellname, sondern eine technische Werbeaufschrift neben der Steinzahl. Die dokumentierte Spezifikation mit 173 Teilen und die Kennzeichnungen des gezeigten Exemplars ermöglichen es, die frühe Citizen Alarm zugleich anhand zeitgenössischer Zahlen und einer erhaltenen Uhr zu prüfen.'
        ],
        citationRefs: ['6', '6', '1,7', '2,7,9', '2', '2,3', '9', '8,9', '6,9']
      },
      {
        number: '03',
        title: 'Von der zentralen Scheibe zur Four Hands',
        paragraphs: [
          'Das prägende Merkmal der ersten Citizen Alarm ist die zentrale Scheibe zur Alarmzeiteinstellung. Der Bericht von 1958 nennt neben der Ablesbarkeit auch eine geringere Bauhöhe und die Möglichkeit, das Zifferblatt abzunehmen, ohne die Scheibe auszubauen. Anzeige, Höhe und Wartungsfreundlichkeit wurden zusammen gedacht.',
          'Um 1960 erscheinen „Four Hands“-Modelle, bei denen ein vierter Zeiger die Alarmzeit zeigt. Auch sie verwenden Cal. 980. Gleichzeitig blieben Ausführungen mit Scheibe und Cal. 980 im Umlauf; die zentrale Scheibe verschwand also nicht in dem Moment, in dem Four Hands auftauchte.',
          'In Japan wird die Geschichte erzählt, die erste Ausführung habe der Memovox zu ähnlich gesehen, Jaeger-LeCoultre habe sich beschwert und Citizen sei deshalb auf Four Hands umgestiegen. In den für diese Seite verwendeten Unterlagen von Citizen, Beitl und Horlbeck findet sich dafür jedoch kein Beleg.',
          'Die sichtbare Ähnlichkeit mit der früheren Memovox lässt sich feststellen. Citizen hinterließ jedoch zugleich konkrete konstruktive Gründe für die Wahl der zentralen Scheibe. Die Beobachtung einer Ähnlichkeit und die Behauptung, eine Beschwerde habe die Umgestaltung ausgelöst, sind getrennte Fragen.',
          'Was zwischen der ersten Ausführung und Four Hands tatsächlich geschah, bleibt in den hier verwendeten Quellen offen. Die Erzählung über eine Beschwerde von LeCoultre ist damit weiterhin eine Legende und kein bestätigter Vorgang.'
        ],
        citationRefs: ['2,6', '4', '1,2,4,5', '2,5,6', '1,2,4,5']
      },
      {
        number: '04',
        title: 'Die weitere Entwicklung der Citizen Alarm',
        paragraphs: [
          'Die Citizen Alarm endete nicht mit Four Hands. Citizens technische Unterlagen von 1971 ordnen die Familie 981 als Alarmwerk ohne Datum und die Familie 310 als Alarmwerk mit Datum ein. Beide messen 27 mm und laufen mit 18.000 A/h; die 310-Familie ist wegen des Datumsmechanismus höher.',
          'Die Reihe wurde weiter auf Parawater- und andere wassergeschützte Modelle, Sportuhren, Taucherstil-Ausführungen sowie Alarm und Lady Alarm für Damen ausgeweitet. Der Weckmechanismus wanderte damit in sehr unterschiedliche Uhrentypen.',
          'Citizens eigene historische Darstellung führt die Reihe bis in die frühen 1970er-Jahre. Das letzte dort genannte Modell war keine Armbanduhr mehr, sondern eine Taschenuhr mit Alarm.',
          'Was 1958 als Japans erste „Armbanduhr mit klingelndem Alarm“ begann, endete schließlich damit, dass der Alarm das Handgelenk verließ und in die Taschenuhr wanderte.'
        ],
        citationRefs: ['7', '2,4', '2', '2']
      }
    ],
    sourceMeta: [
      { id: '1', type: 'primary' },
      { id: '2', type: 'primary' },
      { id: '3', type: 'primary' },
      { id: '4', type: 'reference' },
      { id: '5', type: 'reference' },
      { id: '6', type: 'primary' },
      { id: '7', type: 'primary' },
      { id: '8', type: 'reference' },
      { id: '9', type: 'provenance' }
    ],
    sources: [
      'Citizen Watch, historisches Modell „Alarm“ (1958) — Erscheinungszeitraum, Cal. A → 980, zwei Federhäuser und ca. zehn Sekunden Alarmdauer.',
      'CITIZEN DESIGN, „The Beauty of Utility / CITIZEN ALARM“ (2024) — zentrale Scheibe, zwei Kronen, doppelter Gehäuseboden und Modellentwicklung.',
      'Citizen Watch, Produkt- und Technikgeschichte — Produktentwicklung der 1950er-Jahre, Drehautomaten und Messtechnik.',
      'Leonhard Beitl, Alarm am Arm (2009), S. 122–125 und Werk-Tabelle — Cal. 980, Four Hands, Alarm Date und spätere Modelle.',
      'Michael Philip Horlbeck, The Alarm Wristwatch (Schiffer Publishing, 2007), S. 26, 80–83, 95–96 — Beziehung zu AS 1475 und Citizen-Alarmkaliber.',
      'Seimitsu Kogyo Shimbunsha, Tokei, Juni 1958, nachgedruckter Artikel „Citizen Alarm“ — 19 Steine, Werk 27 × 5,7 mm, 133 Arten / 173 Teile, Gründe für die zentrale Scheibe und Preis.',
      'Citizen Watch, Citizen Technical Information (1971) — Maße, Frequenz, Datumsfunktion und Alarmkraftübertragung der Familien 981 und 310.',
      'Second Vintage, Datensatz Citizen Alarm Ref. 1407067 — dieselbe Gehäusereferenz, ca. 34 mm, 19 Steine und Kennzeichnung für Regulierung in drei Lagen.',
      'OWNER OBSERVATION — Zifferblatt „19 JEWELS PHYNOX“, Werk „NINETEEN JEWELS / 3 ADJ“, Innenseite des Gehäusebodens „1407067“ und Resonanzboden des gezeigten Exemplars.'
    ],
    related: {
      href: '/de/cyma-time-o-vox/',
      hreflang: 'de',
      name: 'CYMA TIME-O-VOX',
      reason: 'Ein zeitgenössischer Schweizer Wecker mit völlig anderem Bedienkonzept: ein Federhaus und zwei Drücker.'
    }
  },
  'wittnauer-10wa': {
    slug: 'wittnauer-10wa',
    title: 'Wittnauer Cal. 10WA — Mechanischer Alarm mit Lünettenaufzug | VINTAGE ALARM',
    description: 'Wittnauer Cal. 10WA aus den frühen 1950er-Jahren: zwei Federhäuser, ein Alarmmodul auf der Zifferblattseite und eine drehbare Lünette, die sowohl den Wecker aufzieht als auch die Alarmzeit einstellt — mit Exemplar-Fotos, Original-Alarmton und Quellen.',
    indexBlurb: 'Aufziehen und einstellen mit derselben Lünette: zwei Federhäuser und ein Alarmmodul auf der Zifferblattseite.',
    catch: [
      'Harte Schicht, Abteilung Wecker.',
      'Auch heute erledigt die Lünette beide Jobs. 🔔'
    ],
    ownersNote: {
      lead: [
        'Aufziehen mit der Lünette. Einstellen mit der Lünette.',
        'Auf der Zifferblattseite des Gehwerks sitzt ein eigenes Alarmmodul.',
        'Der Wecker besitzt ein separates Federhaus.',
        'Trotzdem wird die Alarmseite nur über eine einzige Lünette bedient.'
      ],
      guideTitle: 'Kurzanleitung',
      guide: [
        '① Aufziehen — Gehwerk: über die Krone / Alarm: Lünette gegen den Uhrzeigersinn drehen',
        'Beim Alarm aus Vorsicht nach etwa einer Umdrehung stoppen, um Schäden zu vermeiden.',
        '② Uhrzeit einstellen — Krone ziehen und im Uhrzeigersinn drehen',
        '③ Alarmzeit einstellen — Lünette gegen den Uhrzeigersinn drehen',
        'Es gibt keinen separaten EIN/AUS-Schalter für den Alarm.'
      ],
      noteTitle: 'NOTE',
      note: [
        'Eigenwillige Ziffernindizes.',
        'Ein wellenförmig gebogener Alarmzeiger.',
        'Eine weit vorstehende Drehlünette und eine kleine Krone, die halb im Gehäuse verschwindet.',
        'Durch den Sichtboden ist nur die Gehwerkseite zu sehen.',
        'Der Alarmmechanismus liegt verborgen auf der Zifferblattseite.'
      ]
    },
    spec: {
      era: 'Frühe 1950er-Jahre',
      caseSize: 'ca. 36 mm (gezeigtes Exemplar)',
      caliber: 'Wittnauer Cal. 10WA',
      jewels: '17 Steine',
      frequency: '18.000 A/h',
      barrels: '2 Federhäuser',
      winding: 'Handaufzug',
      acoustic: 'Gong',
      notes: 'Alarmzeit-Einstellung und Alarmaufzug über die Drehlünette, separates Alarmfederhaus'
    },
    specimenGallery: [
      {
        image: '/images/IMG_5792.jpeg',
        label: 'Vorderseite — am Handgelenk',
        alt: 'Wittnauer Cal. 10WA, gezeigtes Exemplar, Vorderseite am Handgelenk'
      },
      {
        image: '/images/IMG_2292.jpeg',
        label: 'Originale pyramidenförmige Krone',
        alt: 'Originale pyramidenförmige Krone der Wittnauer Cal. 10WA'
      },
      {
        image: '/images/IMG_6609.jpeg',
        label: 'Werk',
        alt: 'Von hinten sichtbare Gehwerkseite der Wittnauer Cal. 10WA'
      },
      {
        image: '/images/IMG_5752.jpeg',
        label: 'Gehäuseboden',
        alt: 'Gehäuseboden des gezeigten Wittnauer-Cal.-10WA-Exemplars'
      },
      {
        image: '/images/IMG_2295.jpeg',
        label: 'Innenseite des Gehäusebodens',
        alt: 'Innenseite des Gehäusebodens der Wittnauer Cal. 10WA'
      },
      {
        image: '/images/IMG_2293.jpeg',
        label: 'Seitenansicht bei 9 Uhr — der zweistöckige Aufbau ist deutlich zu erkennen',
        alt: 'Wittnauer Cal. 10WA, Seitenansicht bei 9 Uhr mit deutlich erkennbarem zweistöckigem Aufbau'
      }
    ],
    deepDive: [
      {
        number: '01',
        title: 'Über Wittnauer',
        paragraphs: [
          'Die Geschichte von Wittnauer lässt sich auf den Schweizer Uhrenimport von J. Eugene Robert in New York zurückführen. Nach Hans Weil wurde Albert Wittnauer 1856 geboren, kam 1872 im Alter von sechzehn Jahren nach New York und trat in Roberts Geschäft ein. André Francillons Longines-Geschichte hält fest, dass Robert und Albert 1885 Partner wurden und das Geschäft 1890 an Albert überging.',
          'Wittnauer fertigte nicht jede Uhr vollständig aus eigener Produktion. Horlbeck dokumentiert Uhren mit Werken von Longines und Girard-Perregaux sowie Beispiele, bei denen Schweizer Komponenten in den USA montiert und reguliert und anschließend in amerikanische Gehäuse eingeschalt wurden.',
          'Beim Cal. 10WA ist jedoch gerade die Herkunft des darunterliegenden Gehwerks zwischen den Quellen umstritten.'
        ],
        citationRefs: ['11,12', '1', '1,2,4,5']
      },
      {
        number: '02',
        title: 'Wittnauers erster Alarm: das 10WA',
        paragraphs: [
          'Leonhard Beitl stellt Cal. 10WA als Wittnauers erste Wecker-Armbanduhr vor. Er ordnet sie den frühen 1950er-Jahren zu und beschreibt ein handaufgezogenes Alarmwerk mit 17 Steinen, 18.000 A/h und zwei Federhäusern.',
          'Auffällig ist vor allem die Bedienung der Alarmseite. Die normale Zeiteinstellung und der Aufzug des Gehwerks erfolgen über die Krone. Die Alarmzeit dagegen wird mit der Drehlünette eingestellt: Beim Drehen gegen den Uhrzeigersinn bewegt sich der Alarmzeiger auf dem Zifferblatt.',
          'Die Lünette stellt nicht nur die Alarmzeit ein. Mit derselben Drehbewegung wird zugleich die Alarmzugfeder aufgezogen. Beim 10WA sind damit die Entscheidung, wann der Alarm auslösen soll, und das Speichern der dafür nötigen Energie in einem einzigen Bedienvorgang verbunden.',
          'Nach Horlbeck ist die Alarmseite nach ungefähr eineinhalb Lünettenumdrehungen voll aufgezogen; dann stoppt die Bewegung. Wird bei Vollaufzug weiter Kraft auf die Lünette gegeben, können die Zähne des Übertragungsrades beschädigt werden. Beim gezeigten Exemplar ist in diesem Bedienungsstrang bereits einmal eine Störung aufgetreten; deshalb wird diese Uhr vorsichtshalber nur ungefähr eine Umdrehung weit aufgezogen.',
          'Dass eine einzige Lünette zwei Aufgaben übernimmt, ist einer der besonderen Reize des 10WA — und zugleich ein Grund dafür, dass die Bedienung etwas mehr Vorsicht verlangt.'
        ],
        citationRefs: ['1,2', '1,2', '1,2', '1,13', '1,2']
      },
      {
        number: '03',
        title: 'Im Inneren des Cal. 10WA',
        paragraphs: [
          'Beim 10WA besitzen Gehwerk und Alarmmechanismus jeweils ein eigenes Federhaus. Die Alarmseite ist als Modul auf der Zifferblattseite eines normalen Gehwerks aufgebaut und verfügt über eigenes Federhaus, Einstellräderwerk und Hammer.',
          'Offen bleibt die Frage, welches Gehwerk darunter sitzt. Horlbeck beschreibt eine Basis aus einem handaufgezogenen Longines-Kaliber; Beitl spricht ebenfalls von einem „Longines-Basiskaliber“. 2025 bezeichnete auch HODINKEE das 10WA als modulares Alarmwerk auf Basis des Longines Cal. 10. Die Longines-Zuschreibung findet sich damit sowohl in Fachbüchern als auch in späteren Medienberichten.',
          'Ersatzteilunterlagen liefern jedoch einen anderen Hinweis. Im C. & E. Marshall Handy Manual von 1966 teilen Wittnauer 10WA und Wittnauer 10S wichtige Teile der Gehwerkseite, darunter Zugfeder, Unruhwelle, Aufzugswelle, Hebelscheibe und Ankerwelle. Für das 10WA wird zusätzlich eine eigene Alarmzugfeder geführt.',
          'Eine Unterlage des American Watchmakers Institute von 1969 ordnet Wittnauer 10S dem AS 1200 zu. Die Marshall-Austauschlisten zeigen damit eine enge Verwandtschaft zwischen 10WA und 10S, während AWI das 10S mit AS 1200 verbindet.',
          'Damit zeigt die Gehwerkseite des 10WA deutliche Teileübereinstimmungen mit der 10S-/AS-1200-Familie, während die Fachliteratur weiterhin eine Longines-Basis nennt.',
          'Mit den derzeit vorliegenden Quellen lässt sich der Widerspruch nicht auflösen. Ob die Gehwerkbasis des 10WA Longines oder der 10S-/AS-1200-Familie zuzuordnen ist, kann derzeit nicht sicher entschieden werden.'
        ],
        citationRefs: ['1,2', '1,2,14', '4', '4,5', '1,2,4,5,14', '1,2,4,5,14']
      },
      {
        number: '04',
        title: 'Das Patent von 1952 und das Serien-10WA',
        paragraphs: [
          'Ein wichtiges Dokument für die Untersuchung des 10WA ist das Schweizer Patent CH304088A. Es wurde am 4. Dezember 1952 auf den Namen Marcel Bliss angemeldet und am 31. Dezember 1954 veröffentlicht.',
          'Das Patent zeigt einen Alarmmechanismus, der unabhängig vom normalen Gehwerk auf der Zifferblattseite sitzt. Über eine Drehlünette wird das interne Räderwerk bewegt, um das Alarmfederhaus aufzuziehen; dieselbe Lünettendrehung stellt auch die Alarmzeit ein.',
          'Ein eigenständiger Alarmmechanismus auf der Zifferblattseite, Aufzug über die Lünette und Zeiteinstellung mit derselben Lünette stimmen in mehreren Punkten mit dem Serien-10WA überein. Das Patent läuft jedoch auf Marcel Bliss; in den bibliografischen Angaben erscheint Wittnauer nicht. Eine Abtretung, Lizenz oder ein anderes Dokument, das Patent und Wittnauer direkt verbindet, wurde bisher nicht gefunden.',
          'Der deutlichste Unterschied zeigt sich nach Vollaufzug. CH304088A beschreibt am äußeren Ende der Alarmzugfeder einen slipping bridle, der nach Vollaufzug weitergleiten kann. Dadurch lässt sich die Lünette weiterdrehen und die Alarmzeit auch nach Erreichen des Vollaufzugs noch verändern.',
          'Bei dem von Horlbeck dokumentierten Serien-10WA stoppt die Lünette dagegen, sobald die Alarmzugfeder voll aufgezogen ist. Wird sie gewaltsam weitergedreht, können die Zähne des Übertragungsrades beschädigt werden.',
          'Das Patent enthält damit eine Lösung für die weitere Bedienung nach Vollaufzug; das Serien-10WA stoppt nach Horlbecks Beschreibung bei Vollaufzug.',
          'Das Innere des Alarmfederhauses eines Serien-10WA wurde in den für diese Seite verwendeten Quellen noch nicht direkt bestätigt. Deshalb lässt sich nicht behaupten, dass das Serienwerk definitiv keinen slipping bridle besitzt. Das dokumentierte Verhalten der Serienuhr unterscheidet sich dennoch vom im Patent beschriebenen Verhalten.',
          'Sehr ähnlich — aber nicht identisch.'
        ],
        citationRefs: ['3', '3', '1,2,3', '3', '1', '1,3', '1,3', '1,3']
      },
      {
        number: '05',
        title: '1955 erscheint bei Wittnauer auch ein AS-Alarmwerk',
        paragraphs: [
          'Beitl stellt das 10WA als Modell der frühen 1950er-Jahre vor. Zugleich dokumentiert er für 1955 eine Wittnauer-Wecker-Armbanduhr mit AS 1475 und nennt sie als eines der frühen Beispiele für die Verwendung eines AS-Alarmkalibers bei Wittnauer.',
          'Die genauen Anfangs- und Enddaten der 10WA-Produktion sind nicht bekannt. Deshalb lässt sich die Uhr mit AS 1475 nicht einfach als direkter Nachfolger bezeichnen; auch die Umstände eines möglichen Übergangs zwischen beiden Systemen bleiben unklar.',
          'Festhalten lässt sich nur: Das 10WA existierte in den frühen 1950er-Jahren, und spätestens 1955 gab es bei Wittnauer auch eine Wecker-Armbanduhr mit AS 1475. Damit sind für einen eng überlappenden Zeitraum zwei unterschiedliche Alarmkonzepte dokumentiert.'
        ],
        citationRefs: ['2', '2', '2']
      },
      {
        number: '06',
        title: 'Varianten des 10WA',
        paragraphs: [
          'Vom 10WA sind neben der ungewöhnlichen Mechanik mehrere äußere Ausführungen dokumentiert. Beitl zeigt eine Edelstahlausführung mit hellem Zifferblatt sowie Varianten mit schwarzem Zifferblatt und goldfarbenem Gehäuse; das schwarze Zifferblatt wird als besonders seltene Ausführung beschrieben.',
          'Unter erhaltenen Ref.-1216-Uhren finden sich mehrere Exemplare mit der eindeutigen Kennzeichnung „10K GOLD FILLED“ in Kombination mit Edelstahlboden. Auch 10WA-Uhren mit Edelstahlgehäuse sind erhalten.',
          'Bei den Referenznummern lassen sich Ref. 1215 und Ref. 1216 durch erhaltene Verkaufsunterlagen bestätigen. In einer weiteren Beobachtungsaufzeichnung erscheint die Bezeichnung Ref. 1216A; ein unabhängig bestätigtes erhaltenes Exemplar mit genau dieser Referenz wurde bisher jedoch nicht gefunden.',
          'Beitl zeigt außerdem ein Longines-signiertes Cal. 10WA und datiert es auf 1956. Wie Longines zu diesem Modell kam und es vertrieb, bleibt auch in seiner Darstellung teilweise spekulativ.',
          'Dasselbe Cal. 10WA ist damit in mehreren deutlich unterschiedlichen äußeren Formen überliefert.'
        ],
        citationRefs: ['2', '6,7,8', '6,7,9,10', '2', '2,6,7,8,9,10']
      }
    ],
    sourceMeta: [
      { id: '1', type: 'reference' },
      { id: '2', type: 'reference' },
      { id: '3', type: 'primary' },
      { id: '4', type: 'reference' },
      { id: '5', type: 'reference' },
      { id: '6', type: 'provenance' },
      { id: '7', type: 'provenance' },
      { id: '8', type: 'provenance' },
      { id: '9', type: 'provenance' },
      { id: '10', type: 'provenance' },
      { id: '11', type: 'reference' },
      { id: '12', type: 'reference' },
      { id: '13', type: 'owner' },
      { id: '14', type: 'reference' }
    ],
    sources: [
      'Michael Philip Horlbeck, The Alarm Wrist Watch (Schiffer Publishing, 2007), S. 152–153, Abschnitte Wittnauer / Cal. 10WA — zwei Federhäuser, Bedienung über die Lünette, Longines-Basis, Warnung bei Vollaufzug sowie Hintergrund zu Wittnauers Fertigung und Beschaffung.',
      'Leonhard Beitl, Alarm am Arm (2009), S. 295, 499–500, 629, Abschnitte Wittnauer / Longines — 10WA, Angabe „Longines-Basiskaliber“, frühe 1950er-Jahre, Wittnauer mit AS 1475, Gehäuse-/Zifferblattvarianten und Longines-signiertes 10WA.',
      'Schweizer Patent CH304088A, Marcel Bliss, angemeldet 04.12.1952, veröffentlicht 31.12.1954 — Alarmmechanismus auf der Zifferblattseite, Lünettenaufzug + Einstellung, slipping bridle. https://patents.google.com/patent/CH304088A/en',
      'C. & E. Marshall, Handy Manual (1966), Wittnauer-Austauschlisten — gemeinsame Gehwerksteile von 10S / 10WA und separate Alarmzugfeder des 10WA. https://www.phfactor.net/wtf/Marshall%20Handy%20Manual/Marshall%202.pdf',
      'American Watchmakers Institute, Technical Bulletin / AWI News (1969), Wittnauer 10S = AS 1200. https://www.awci.com/wp-content/uploads/2018/01/10-1969-AWI-News.pdf',
      'Anti-Watchman, Wittnauer Alarm Watch Ref. 1216, 10K GOLD FILLED / SS. https://antiwatchman.com/products/detail.php?product_id=10821',
      'Meticulous Watches, Wittnauer Alarm Watch Ref. 1216, 10k gold filled / stainless steel back. https://meticulouswatches.com/products/wittnauer-alarm-watch-bezel-set-cal-10wa-sold-265',
      'Sweetroad, erhaltenes Wittnauer-10WA-Exemplar mit Edelstahlgehäuse. https://www.sweetroad.com/view/item/000000009921',
      'Private Eyes / Antiquorum, erhaltene Ref.-1215-Beispiele — Bestätigung der Referenzbezeichnung Ref. 1215.',
      'EveryWatch / Mister Wolf, Beobachtungsdaten zu erhaltenen Ref. 1216A / Ref. 1216 — die unabhängige erneute Bestätigung von Ref. 1216A steht noch aus.',
      'André Francillon, History of Longines — dokumentiert die Partnerschaft von J. Eugene Robert und Albert Wittnauer ab 1885 sowie die Übernahme des Geschäfts durch Albert im Jahr 1890. https://theindex.nawcc.org/Articles/Francillon.pdf',
      'Hans Weil, Wittnauer-Geschichte — Albert Wittnauer 1856 geboren, 1872 im Alter von sechzehn Jahren nach New York; Partnerschaft mit Robert ab 1885; A. Wittnauer ab 1890. https://hans-weil.faszination-uhrwerk.de/wittnauer.pdf',
      'OWNER OBSERVATION / Reparaturaufzeichnung des gezeigten Exemplars — im Bedienungsstrang der Alarm-Lünette ist bereits einmal eine Störung aufgetreten.',
      'Rich Fordon, HODINKEE, “Bring a Loupe: A Parmigiani Fleurier Toric Memory Time, A Cartier Trianon, And Two Picks From Goodwill” (2025-08-15), Abschnitt “1950s Wittnauer Alarm Watch With Caliber 10WA” — beschreibt Cal. 10WA als modulares Alarmwerk auf Basis des Longines Cal. 10. https://www.hodinkee.com/articles/bring-a-loupe-august-15-2025'
    ],
    related: {
      href: '/de/cyma-time-o-vox/',
      hreflang: 'de',
      name: 'CYMA TIME-O-VOX',
      reason: 'Eine andere Antwort aus derselben Epoche: ein Federhaus, zwei Drücker und ein völlig anders integrierter Alarm.'
    }
  },
  'pierce-duofon': {
    slug: 'pierce-duofon',
    title: 'Pierce Duofon Cal. 135 — Zweistufiger mechanischer Alarm | VINTAGE ALARM',
    description: 'Pierce Duofon mit Cal. 135: zwei Federhäuser, wählbare WECKER-/SIGNAL-Modi, rot-weiße Anzeige, Modellentwicklung, Verbindung zur Gruen Duo-Tone, Fotos des Exemplars, Original-Alarmton und Quellen.',
    indexBlurb: 'Ein Vorfahre des Lautlosmodus!? Benachrichtigungstechnik aus den 1950ern, ihrer Zeit Jahrzehnte voraus.',
    catch: [
      'Ein Vorfahre des Lautlosmodus!?',
      'Benachrichtigungstechnik aus den 1950ern, ihrer Zeit Jahrzehnte voraus.'
    ],
    ownersNote: {
      lead: [
        'Ein Vorfahre des Lautlosmodus!?',
        'Benachrichtigungstechnik aus den 1950ern, ihrer Zeit Jahrzehnte voraus.',
        'Sogar die Rücksicht darauf, wie man erinnert, war rein mechanisch gelöst.'
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
        'Unabhängig von dieser späteren Entwicklung hatte die Duofon bereits in den 1950er-Jahren mechanisch umgesetzt, wie laut oder zurückhaltend eine Benachrichtigung ausfallen sollte.',
        'Mit der Krone bei 4 Uhr wählt man den Alarmmodus; das kleine Fenster unter 6 Uhr zeigt den gewählten „Tonfall“ in Rot oder Weiß.',
        'Für eine Wecker-Armbanduhr nahm sie die Zukunft erstaunlich früh vorweg.'
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
          'Pierces Vorgängerunternehmen Léon Lévy & Frère wurde 1883 von Léon Lévy und Théodore Lévy in Biel/Bienne in der Schweiz gegründet. Anfangs bezog das Unternehmen Werke von externen Lieferanten; Anfang der 1930er-Jahre begann es jedoch, eigene Werke zu entwickeln und herzustellen.',
          'Zu den eigenen Werken gehörten die 13-linigen Chronographenkaliber 130 und 134. In den 1950er-Jahren führte Pierce außerdem die Correctomatic ein. Bei der Correctomatic bewegen zwei Drücker am Gehäuse den Rücker, um den Gang der Uhr schneller oder langsamer einzustellen.',
          'Auch das in der Duofon verwendete Kaliber 135 wurde von Pierce selbst entwickelt.'
        ],
        citationRefs: ['10', '4', '4']
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
        video: {
          src: '/videos/pierce-duofon/wecker-signal-switch.mov',
          title: 'In Bewegung sehen',
          afterParagraph: 2,
          ariaLabel: 'Pierce Cal. 135: Video des gezeigten Exemplars beim Umschalten zwischen WECKER und SIGNAL'
        },
        images: [
          {
            src: '/images/pierce-duofon/mechanism/05-crown-linkage.webp',
            caption: '① Beim Drehen der Krone bei 4 Uhr bewegt sich die gekoppelte Stange, und die Position des Klöppels verändert sich.',
            alt: 'Pierce Cal. 135, gekoppelte Stange und Klöppel bei Betätigung der Krone bei 4 Uhr',
            afterParagraph: 2,
            fullRow: true
          },
          {
            src: '/images/pierce-duofon/mechanism/01-signal-hammer.webp',
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
        title: 'Zwei Federhäuser mit einer Krone getrennt aufziehen',
        mediaStyle: 'compact-single',
        paragraphs: [
          'Bei der Krone bei 3 Uhr bestimmt die Drehrichtung, welches Federhaus aufgezogen wird.',
          'Beim Drehen der Krone bewegt sich ein schwenkbarer Hebel mit dem Wechsel-Kronrad und schaltet den Eingriff auf das jeweils andere Sperrad um. In den Bildern wird beim Eingriff auf der oberen Seite das Gehwerk-Federhaus aufgezogen, beim Eingriff auf der unteren Seite das Wecker-Federhaus.',
          'Cal. 135 kann damit zwei Federhäuser – für Gehwerk und Wecker – getrennt aufziehen, allein dadurch, dass dieselbe Krone in entgegengesetzte Richtungen gedreht wird.'
        ],
        citationRefs: ['1', '1', '1'],
        video: {
          src: '/videos/pierce-duofon/time-alarm-winding.mov',
          title: 'In Bewegung sehen',
          afterParagraph: 3,
          ariaLabel: 'Pierce Cal. 135: Video des gezeigten Exemplars beim Umschalten des Aufzugs zwischen Gehwerk- und Wecker-Federhaus über die Krone bei 3 Uhr'
        },
        images: [
          {
            src: '/images/IMG_2762-1.jpeg',
            caption: 'Oben: Eingriff mit dem Gehwerk-Federhaus zum Aufziehen',
            afterParagraph: 3,
            fullRow: true
          },
          {
            src: '/images/IMG_2763-1.jpeg',
            caption: 'Unten: Eingriff mit dem Wecker-Federhaus zum Aufziehen',
            afterParagraph: 3,
            fullRow: true
          }
        ]
      },
      {
        number: '04',
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
        number: '05',
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
      { id: '5', type: 'provenance' },
      { id: '6', type: 'reference' },
      { id: '7', type: 'reference' },
      { id: '8', type: 'reference' },
      { id: '9', type: 'reference' },
      { id: '10', type: 'reference' }
    ],
    sources: [
      'Pierce AG, Biel, „Die Wecker-Armbanduhr Duofon mit zwei Lautstärken“ (30.8.1955), abgedruckt in Leonhard Beitl, Alarm am Arm (2009), S. 353–355.',
      'Leonhard Beitl, Alarm am Arm (2009), S. 356–358 — Pierce-Duo-Fon-Modellbeispiele und Cal. 135.',
      'Leonhard Beitl, Alarm am Arm (2009), S. 198–199 — Gruen Duo-Tone Precision / Cal. 920 SS.',
      'Michael Philip Horlbeck, The Alarm Wristwatch (Schiffer Publishing, 2007), S. 20, 130–131, 189–190, 218–221 — Duofon / Pierce Cal. 135 / variable Alarmlautstärke. Auf S. 131 wird als Gründungsjahr 1888 genannt.',
      'Fünf Mechanikbilder (①–⑤) sowie zwei Bilder der Gruen Duo-Tone (Zifferblatt / Werk): Bildmaterial von [Mori (時計狂)](https://x.com/ad19200610?s=11&t=3m8xXI66ZgB96VPG9PtQgw).',
      'Leonhard Beitl, Alarm am Arm (2009), S. 670 — Herstellerliste: Pierce / Lévy Frères / 1883.',
      '[Grail Watch Wiki — Pierce](https://wiki.grail-watch.com/index.php/Pierce) — nennt die Gründung von Léon Lévy & Frère am 16. Mai 1883.',
      '[Ranfft DB — Pierce Calibers](https://ranfft.org/manufacturer/241-Pierce) — nennt 1883 als Gründungsjahr.',
      '[Watch-Wiki — Pierce](https://www.watch-wiki.net/doku.php?id=pierce) — nennt 1883 als Gründungsjahr.',
      'Hinweis zum Gründungsjahr: Im Fließtext wird 1883 verwendet. Horlbeck S. 131 nennt 1888, während Beitl S. 670, Grail Watch Wiki, Ranfft DB und Watch-Wiki 1883 nennen. VINTAGE ALARM verwendet daher derzeit 1883 als Textwert; die abschließende Bestätigung durch ein Handelsregister oder eine vergleichbare Primärquelle bleibt offen.'
    ],
    related: {
      href: '/de/cyma-time-o-vox/',
      hreflang: 'de',
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
        'Keine drehbare Lünette. Kein zusätzliches Einstellräderwerk.',
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
      acoustic: 'Stiftübertragung am Gehäuseboden',
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
        title: 'Deutsches Gehäuse und Klangaufbau',
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
      href: '/de/basis-alarm/',
      hreflang: 'de',
      name: 'BASIS ALARM',
      reason: 'Eine andere Richtung als die Luxusmodelle: eine weitere Antwort für den Massenmarkt.'
    }
  }
};
