export type EnglishFullResearch = {
  title: string;
  description: string;
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
    name: string;
    reason: string;
  };
};

export const englishFullResearchBySlug: Record<string, EnglishFullResearch> = {
  'basis-alarm': {
    title: 'Basis Alarm BFG 90 — Two-Barrel Bezel-Set Alarm | VINTAGE ALARM',
    description: 'Basis Alarm with Baumgartner BFG 90: two barrels wound from one crown in the same direction, sliding clutches, two winding indicators, rotating-bezel alarm setting, specimen photographs, original alarm sound and cited sources.',
    specimenGallery: [
      { image: '/images/IMG_8890-1.jpeg', label: 'Front — wrist shot', alt: 'Basis Alarm BFG 90 specimen, front wrist shot' },
      { image: '/images/IMG_9196.jpeg', label: 'Alarm hand and rotating bezel', alt: 'Basis Alarm BFG 90 alarm hand linked directly to the rotating bezel' },
      { image: '/images/IMG_1969.jpeg', label: '9 o’clock alarm ON/OFF slider', alt: 'Basis Alarm BFG 90 alarm ON/OFF slider at 9 o’clock' },
      { image: '/images/IMG_1968.jpeg', label: 'Caseback', alt: 'Basis Alarm BFG 90 specimen caseback' },
      { image: '/images/70957643-C7C5-4A86-B1BF-11AB18A28299-2.jpeg', label: 'Movement', alt: 'Baumgartner BFG 90 movement in the Basis Alarm specimen' }
    ],
    deepDive: [
      {
        number: '01',
        title: 'Baumgartner Frères — engineering for the mass market',
        paragraphs: [
          'Baumgartner Frères was an ébauche maker that supplied movements to other watch companies. Many BFG movements were designed for relatively affordable watches, and the pin-lever escapement was one part of that approach.',
          'The BFG 90 uses a pillar construction. Building the movement from flat plates separated by pillars reduced the need for more complex machining. The hand-setting mechanism was also placed on the movement side instead of being recessed beneath the dial, while the coupling lever itself was shaped to provide its own spring action rather than relying on a separate spring.',
          'The balance appears at first glance to carry screw-like projections around its rim. They are not screws: they are integral half-round bosses formed as part of the balance.',
          'Machining that could be avoided was avoided, and parts that could be eliminated were eliminated. The ingenuity of the BFG 90 lies in a different place from the finishing priorities of a high-grade movement.'
        ],
        citationRefs: ['2', '2', '2', '2']
      },
      {
        number: '02',
        title: 'One crown, one direction, two barrels',
        paragraphs: [
          'The BFG 90 has separate barrels for timekeeping and the alarm. Two barrels are not unusual by themselves. What is unusual is how they are wound: one crown winds both in the same direction.',
          'The wearer does not choose the timekeeping barrel or alarm barrel by reversing the crown. Both are wound simply by continuing in the same direction. The two mainsprings will not necessarily reach full wind at the same moment, so once one is fully wound the mechanism must still allow the other to keep winding without continuing to load the first spring.',
          'The BFG 90 solves this with a sliding clutch in the winding mechanism of each barrel. Once one spring reaches full wind, that side can slip while winding continues on the other side.',
          'Each ratchet wheel is made in two parts and the pair is pressed together by a cross-shaped spring. During normal winding they rotate together; once the mainspring is fully wound, the driven part begins to slip.',
          'The result is that reaching full wind on one barrel does not end the winding operation. That side can slip while the remaining barrel is wound to full tension.'
        ],
        citationRefs: ['1,2', '2', '2', '2', '2']
      },
      {
        number: '03',
        title: 'Why there are two winding windows',
        paragraphs: [
          'A sliding clutch prevents overwinding, but it does not make the winding feel disappear. On the specimen shown here, resistance rises as a spring approaches full wind and can feel much like a conventional winding stop.',
          'Without knowing the mechanism, that resistance invites the wearer to stop. Yet on the BFG 90 one barrel may already be fully wound while the other still has capacity. In that situation winding continues by allowing the clutch on the full barrel to slip while the other spring keeps taking power.',
          'That can feel slightly alarming if the mechanism is unfamiliar: the crown is being turned beyond the point that feels as though the watch is already fully wound.',
          'The two small dial windows solve that problem. On this Basis specimen the window at 1 o’clock corresponds to the timekeeping barrel and the one at 5 o’clock to the alarm barrel. Each barrel drives a coloured disc while it is being wound; when that spring reaches full wind, its disc stops.',
          'These are not power-reserve displays that show how much running time remains. They are winding indicators that tell the wearer which spring is still being wound and which one has reached full tension.',
          'The two barrels, sliding clutches and winding windows therefore form one connected system: one crown winds both barrels in the same direction; a full barrel is allowed to slip; the crown can continue turning to wind the other barrel; and the two windows show when each side has finished winding.'
        ],
        citationRefs: ['3', '2,3', '3', '1,2,3', '1,2', '2,3']
      },
      {
        number: '04',
        title: 'One BFG 90, many faces',
        paragraphs: [
          'The BFG 90 was not exclusive to Basis. The same movement appeared under a number of brands, including Lantex, Sheffield, Simplon and Tior.',
          'The watches can look very different despite sharing the same movement. Sheffield and Lantex examples include relatively slim, decorative cases, while Simplon and Tior examples can be larger and more substantial. Lug shapes, bezels and dial treatments also vary by brand.',
          'Even so, watches using the BFG 90 tend to share several visible clues: the rotating bezel, the ON/OFF slider around 9 o’clock and the two winding-indicator windows. The movement architecture shows through into the case and dial design.',
          'One movement became many different watches as brand names and exterior designs changed — a particularly visible example of Baumgartner Frères’ role as an ébauche supplier.'
        ],
        citationRefs: ['1,2', '2', '1,2', '1,2']
      },
      {
        number: '05',
        title: 'BFG 90 → BFG 902 — the external controls disappear',
        paragraphs: [
          'The later BFG 902 simplified the controls used on the BFG 90. On the BFG 90 the alarm time is set with a rotating bezel and the alarm is switched ON or OFF with a slider at 9 o’clock. On the BFG 902, alarm-time setting moved to the crown.',
          'Turning the crown in one direction winds both barrels; turning it in the opposite direction moves the alarm setting. The rotating bezel was no longer needed, and the 9 o’clock slider disappeared as well.',
          'With the separate slider gone, stopping the alarm also changed. The alarm is cancelled by moving the set alarm time instead. Later versions also appeared with shock protection.',
          'The change from BFG 90 to BFG 902 is better understood as simplification and rationalisation than as a move upmarket. The basic idea of handling two barrels through one crown remained, while the bezel and slider that had been exposed on the outside were removed.',
          'The controls that had been spread around the BFG 90 gradually moved back inside the watch.'
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
      'Leonhard Beitl, Alarm am Arm (2009), pp. 20, 87, 109, 172, 308, 398, 419, 622 — BFG 90 / BFG 902, Basis / Fabry / Maxor / Triwera, operation and specifications.',
      'Michael Philip Horlbeck, The Alarm Wristwatch (Schiffer Publishing, 2007), pp. 88–91, 168–170 — BFG 90 pillar construction, sliding clutches, winding indicators and brand / case variants.',
      'OWNER OBSERVATION — resistance during winding and the behaviour of the winding-indicator discs at 1 and 5 o’clock on the specimen shown here.'
    ],
    related: {
      href: '/en/westclox-watchlarm/',
      name: 'WESTCLOX WATCHLARM',
      reason: 'Another mass-market answer to the alarm wristwatch, but with zero jewels, one barrel and push-button alarm setting.'
    }
  },
  'citizen-alarm': {
    title: 'Citizen Alarm Cal. 980 — Japan’s First Domestic Alarm Wristwatch | VINTAGE ALARM',
    description: 'Citizen Alarm from 1958: Japan’s first domestically produced alarm wristwatch, Cal. 980, two barrels, twin crowns, a rotating centre alarm disc, double-caseback sound construction, later Four Hands variants and cited sources.',
    specimenGallery: [
      { image: '/images/IMG_1695.jpeg', label: 'Front — wrist shot', alt: 'Early Citizen Alarm specimen, front wrist shot' },
      { image: '/images/IMG_2088.jpeg', label: 'Crown side', alt: 'Citizen Alarm specimen showing the two crowns' },
      { image: '/images/IMG_2089.jpeg', label: 'Caseback', alt: 'Citizen Alarm specimen caseback' }
    ],
    deepDive: [
      {
        number: '01',
        title: '1958 — Japan’s first alarm wristwatch',
        paragraphs: [
          'In the post-war years Citizen expanded its watchmaking capabilities while adding functions such as calendars and shock protection. In 1957 the company was also developing its own automatic lathes and measuring equipment for watch-part production.',
          'The following year brought several new products in quick succession: the men’s automatic “Auto” in May 1958, the “Alarm” in June and the thin high-grade “Super Deluxe” in August.',
          'The Citizen Alarm was Japan’s first domestically produced wristwatch with an audible alarm. It has separate barrels for timekeeping and the alarm, and at the set time a hammer strikes the caseback. Citizen records an alarm duration of about ten seconds. The early Cal. A was followed by Cal. 980.',
          'In Switzerland at the time, additional functions such as water resistance, calendars, chronographs and alarms had become important product features. Citizen likewise introduced the Alarm as one of its watches built around a specialised function.',
          'By 1958, Japanese wristwatches were no longer competing only on the basic task of telling time; manufacturers were increasingly able to compete through mechanical functions as well.'
        ],
        citationRefs: ['3', '3', '1', '2', '2,3']
      },
      {
        number: '02',
        title: 'Citizen Cal. 980',
        paragraphs: [
          'Cal. 980, used in early Citizen Alarm watches, has two barrels: one for timekeeping and one for the alarm. The two mechanisms are operated from the crowns at 2 and 4 o’clock.',
          'Its layout closely resembles the Swiss A. Schild Cal. AS 1475. Beitl raises the possibility that it began as a licensed copy of the AS 1475 and was subsequently modified and improved by Citizen. Early Cal. 980 examples with 17 jewels and Parashock are documented.',
          'The alarm mechanism also shaped the appearance of the earliest watches. A rotating disc in the centre of the dial indicates the alarm time, while two large crowns sit on the right side of the case. Early examples also use a double-caseback construction, allowing the sound generated at the inner back to escape through openings in the outer back.',
          'The centre disc was not required by Cal. 980 itself. Later watches using the same movement also appeared with a fourth hand indicating the alarm time.'
        ],
        citationRefs: ['1,4', '4,5', '2', '4']
      },
      {
        number: '03',
        title: 'From the centre disc to Four Hands',
        paragraphs: [
          'One of the defining visual features of the first Citizen Alarm is the rotating alarm-setting disc at the centre of the dial. The entire disc turns to indicate the set alarm time; Citizen itself presents the design as one intended to make the alarm easy to read and operate.',
          'By around 1960, “Four Hands” models appeared, indicating the alarm time with a fourth hand. These watches still used Cal. 980. Disc-set Cal. 980 watches also remained in circulation during the same period, so the arrival of Four Hands did not instantly eliminate the centre-disc design.',
          'A story often repeated in Japan says that the original design looked so similar to the Memovox that Jaeger-LeCoultre complained, prompting Citizen to switch to the Four Hands layout. No supporting account for that sequence has been confirmed in Citizen’s official material, Beitl or Horlbeck.',
          'What happened between the centre-disc version and Four Hands remains undocumented in the sources used here. The Jaeger-LeCoultre complaint survives as a story, not as a confirmed explanation.'
        ],
        citationRefs: ['2', '4', '1,2,4,5', '1,2,4,5']
      },
      {
        number: '04',
        title: 'What came after the first Citizen Alarm',
        paragraphs: [
          'The Citizen Alarm line did not end with Four Hands. Transitional Cal. 981 examples exist with “Alarm Date” printed on the dial despite having no date window; the later Cal. 3100 added a date display at 3 o’clock.',
          'The family expanded further into Parawater and other water-resistant versions, sports models, diver-style watches and women’s Alarm / Lady Alarm models.',
          'Citizen’s official history traces the line into the early 1970s. The last model in that lineage was not a wristwatch but an alarm pocket watch.',
          'The family that began in 1958 as Japan’s first domestically produced alarm wristwatch ultimately ended away from the wrist, as a pocket watch.'
        ],
        citationRefs: ['4', '2,4', '2', '2']
      }
    ],
    sourceMeta: [
      { id: '1', type: 'primary' },
      { id: '2', type: 'primary' },
      { id: '3', type: 'primary' },
      { id: '4', type: 'reference' },
      { id: '5', type: 'reference' }
    ],
    sources: [
      'Citizen Watch, historical model “Alarm” (1958) — launch timing, Cal. A → 980, two barrels and approximately ten seconds of alarm operation.',
      'CITIZEN DESIGN, “The Beauty of Utility / CITIZEN ALARM” (2024) — rotating centre disc, twin crowns, double caseback and later model development.',
      'Citizen Watch, product and technology history — product releases in the 1950s and Citizen’s development of automatic lathes and measuring technology.',
      'Leonhard Beitl, Alarm am Arm (2009), pp. 122–125 and movement table — Cal. 980, Four Hands, Alarm Date and subsequent models.',
      'Michael Philip Horlbeck, The Alarm Wristwatch (Schiffer Publishing, 2007), pp. 26, 80–83, 95–96 — AS 1475 relationship and Citizen alarm calibres.'
    ],
    related: {
      href: '/en/cyma-time-o-vox/',
      name: 'CYMA TIME-O-VOX',
      reason: 'Another 1950s solution with a very different architecture: one barrel, two pushers and a gong around the movement.'
    }
  },
  'wittnauer-10wa': {
    title: 'Wittnauer Cal. 10WA — Bezel-Wound Mechanical Alarm | VINTAGE ALARM',
    description: 'Wittnauer Cal. 10WA from the early 1950s: two barrels, a dial-side alarm module, a rotating bezel that both winds the alarm and sets its time, surviving variants, a 1952 patent comparison, specimen photographs, original alarm sound and cited sources.',
    specimenGallery: [
      {
        image: '/images/IMG_5792.jpeg',
        label: 'Front — wrist shot',
        alt: 'Wittnauer Cal. 10WA specimen, front wrist shot'
      },
      {
        image: '/images/IMG_7643.jpeg',
        label: 'Original pyramid-shaped crown',
        alt: 'Wittnauer Cal. 10WA original pyramid-shaped crown'
      },
      {
        image: '/images/IMG_6609.jpeg',
        label: 'Movement',
        alt: 'Wittnauer Cal. 10WA timekeeping movement visible from the back'
      },
      {
        image: '/images/IMG_5752.jpeg',
        label: 'Caseback',
        alt: 'Wittnauer Cal. 10WA specimen caseback'
      },
      {
        image: '/images/IMG_5755.jpeg',
        label: 'Inside caseback',
        alt: 'Inside of the Wittnauer Cal. 10WA specimen caseback'
      }
    ],
    deepDive: [
      {
        number: '01',
        title: 'About Wittnauer',
        paragraphs: [
          'Wittnauer’s history can be traced to the Swiss-watch importing business run by J. Eugene Robert in New York. According to Hans Weil, Albert Wittnauer was born in 1856, moved to New York at age sixteen in 1872 and joined Robert’s business. André Francillon’s history of Longines records that Robert and Albert became partners in 1885 and that the business passed to Albert in 1890.',
          'Wittnauer did not manufacture every part of every watch entirely in-house. Horlbeck records watches using movements from Longines and Girard-Perregaux, as well as examples assembled and adjusted in the United States from Swiss-made components and fitted into American-made cases.',
          'For Cal. 10WA, however, the identity of the underlying timekeeping movement is itself disputed in the sources, as discussed below.'
        ],
        citationRefs: ['11,12', '1', '1,2,4,5']
      },
      {
        number: '02',
        title: 'Wittnauer’s first alarm: the 10WA',
        paragraphs: [
          'Leonhard Beitl presents Cal. 10WA as Wittnauer’s first alarm wristwatch. He places it in the early 1950s and describes a 17-jewel, 18,000-vph, two-barrel manually wound alarm movement.',
          'The first unusual feature is the way the alarm side is operated. Ordinary time setting and winding of the timekeeping side are handled by the crown. The alarm time, however, is set with the rotating bezel: turning the bezel counter-clockwise moves the alarm hand on the dial.',
          'The bezel does not only set the alarm time. The same rotation also winds the alarm mainspring. On the 10WA, deciding when the alarm should sound and storing the energy needed to make it sound are combined in a single operation.',
          'According to Horlbeck, the alarm side reaches full wind after roughly one and a half turns of the bezel and then stops. Continuing to force the bezel while fully wound risks damaging the teeth of the transmission wheel. The specimen shown here has also experienced a fault in this operating train once, so stopping at about one turn is the cautious operating practice used on this watch.',
          'Giving one bezel two jobs is both one of the 10WA’s most distinctive ideas and one reason it requires a little more care in use.'
        ],
        citationRefs: ['1,2', '1,2', '1,2', '1,13', '1,2']
      },
      {
        number: '03',
        title: 'Inside Cal. 10WA',
        paragraphs: [
          'The 10WA gives the timekeeping mechanism and the alarm mechanism separate barrels. The alarm works as a module stacked on the dial side of a conventional timekeeping movement, with its own barrel, setting train and hammer.',
          'The unresolved question is what timekeeping movement sits underneath. Horlbeck describes it as based on a manually wound Longines calibre, and Beitl likewise calls it a “Longines-Basiskaliber”. In 2025 HODINKEE also described the 10WA as a modular alarm movement based on Longines Cal. 10. The Longines attribution therefore appears not only in specialist books but also in later watch-media reporting.',
          'Repair-parts literature provides a different clue. In the 1966 C. & E. Marshall Handy Manual, Wittnauer 10WA and Wittnauer 10S share major timekeeping-side parts including the mainspring, balance staff, winding stem, roller table and pallet staff. The 10WA is separately listed with its own alarm mainspring.',
          'A 1969 American Watchmakers Institute reference identifies Wittnauer 10S with AS 1200. The Marshall interchange listings therefore show a close relationship between 10WA and 10S, while AWI links 10S to AS 1200.',
          'In other words, the 10WA’s timekeeping side shows strong interchange evidence pointing toward the 10S / AS 1200 family, while specialist books retain the Longines-base attribution.',
          'With the sources currently available, the conflict cannot be resolved: the timekeeping base of the 10WA cannot yet be identified with certainty as either Longines or the 10S / AS 1200 family.'
        ],
        citationRefs: ['1,2', '1,2,14', '4', '4,5', '1,2,4,5,14', '1,2,4,5,14']
      },
      {
        number: '04',
        title: 'The 1952 patent and the production 10WA',
        paragraphs: [
          'A key document when studying the 10WA is Swiss patent CH304088A. It was filed in the name of Marcel Bliss on 4 December 1952 and published on 31 December 1954.',
          'The patent shows an alarm mechanism mounted on the dial side, separate from the ordinary timekeeping movement. A rotating bezel drives the internal gearing to wind the alarm barrel, and rotation of the same bezel also sets the alarm time.',
          'A separate dial-side alarm mechanism, bezel winding and alarm-time setting with that same bezel all closely resemble the production 10WA. However, the patent is in Marcel Bliss’s name and the bibliographic record does not name Wittnauer. No assignment, licence or other document directly connecting the patent to Wittnauer has yet been found.',
          'The clearest difference appears after full wind. CH304088A shows a slipping bridle at the outer end of the alarm mainspring so that the bezel can continue to rotate and the alarm time can still be changed after the spring has reached full wind.',
          'By contrast, Horlbeck records that the production 10WA stops when the alarm mainspring becomes fully wound. Forcing it further may damage the teeth of the transmission wheel.',
          'The patent therefore includes a way to keep operating the bezel after full wind; the production 10WA, as documented by Horlbeck, stops at full wind.',
          'The inside of a production 10WA alarm barrel has not yet been directly verified in the sources used here, so it cannot be stated that the production movement definitively lacks a slipping bridle. Even so, the documented behaviour of the production watch differs from the behaviour described in the patent.',
          'They are very similar, but they are not the same.'
        ],
        citationRefs: ['3', '3', '1,2,3', '3', '1', '1,3', '1,3', '1,3']
      },
      {
        number: '05',
        title: 'By 1955, Wittnauer also had an AS alarm',
        paragraphs: [
          'Beitl presents the 10WA as an early-1950s model. At the same time, he records a Wittnauer alarm from 1955 fitted with AS 1475 and describes it as one of the early examples of Wittnauer using an AS alarm calibre.',
          'The exact start and end dates of 10WA production are not known. The AS 1475 watch therefore cannot simply be called its successor, and the circumstances behind any transition between the two systems remain unclear.',
          'What can be said is that the 10WA existed in the early 1950s and that by 1955 at least one Wittnauer alarm wristwatch using AS 1475 also existed. Two different alarm approaches are therefore documented within a closely overlapping period.'
        ],
        citationRefs: ['2', '2', '2']
      },
      {
        number: '06',
        title: '10WA variants',
        paragraphs: [
          'The 10WA survives in several external configurations as well as in its unusual mechanism. Beitl illustrates a stainless-steel case with a light-coloured dial, along with black-dial and gold-coloured examples; the black dial is presented as a particularly uncommon variant.',
          'Among surviving Ref. 1216 watches, multiple examples are explicitly marked “10K GOLD FILLED” and paired with stainless-steel casebacks. Stainless-steel 10WA examples also survive.',
          'For reference numbers, surviving sales records confirm Ref. 1215 and Ref. 1216. Another observation record uses the designation Ref. 1216A, but an independently confirmed surviving example carrying that reference has not yet been located.',
          'Beitl also illustrates a Longines-signed Cal. 10WA and dates it to 1956. His account of how Longines came to sell the watch remains partly speculative.',
          'The same Cal. 10WA therefore survives in several different external forms: one mechanism was cased and presented in notably different ways.'
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
      'Michael Philip Horlbeck, The Alarm Wrist Watch (Schiffer Publishing, 2007), pp. 152–153, Wittnauer / Cal. 10WA sections — two barrels, bezel operation, Longines-base attribution, full-wind warning, and Wittnauer manufacturing / sourcing background.',
      'Leonhard Beitl, Alarm am Arm (2009), pp. 295, 499–500, 629, Wittnauer / Longines sections — 10WA, “Longines-Basiskaliber” attribution, early-1950s dating, Wittnauer with AS 1475, external variants and Longines-signed 10WA.',
      'Swiss patent CH304088A, Marcel Bliss, filed 1952-12-04, published 1954-12-31 — dial-side alarm mechanism, bezel winding + setting, slipping bridle. https://patents.google.com/patent/CH304088A/en',
      'C. & E. Marshall, Handy Manual (1966), Wittnauer interchange listings — shared timekeeping-side parts between 10S / 10WA and a separate alarm mainspring for 10WA. https://www.phfactor.net/wtf/Marshall%20Handy%20Manual/Marshall%202.pdf',
      'American Watchmakers Institute, Technical Bulletin / AWI News (1969), Wittnauer 10S = AS 1200. https://www.awci.com/wp-content/uploads/2018/01/10-1969-AWI-News.pdf',
      'Anti-Watchman, Wittnauer Alarm Watch Ref. 1216, 10K GOLD FILLED / SS. https://antiwatchman.com/products/detail.php?product_id=10821',
      'Meticulous Watches, Wittnauer Alarm Watch Ref. 1216, 10k gold filled / stainless steel back. https://meticulouswatches.com/products/wittnauer-alarm-watch-bezel-set-cal-10wa-sold-265',
      'Sweetroad, surviving Wittnauer 10WA stainless-case example. https://www.sweetroad.com/view/item/000000009921',
      'Private Eyes / Antiquorum surviving Ref. 1215 examples — confirmation of the Ref. 1215 designation.',
      'EveryWatch / Mister Wolf surviving Ref. 1216A / Ref. 1216 observation records — surviving-reference observations; independent reconfirmation of Ref. 1216A remains pending.',
      'André Francillon, History of Longines — records J. Eugene Robert and Albert Wittnauer becoming partners in 1885 and the business passing to Albert in 1890. https://theindex.nawcc.org/Articles/Francillon.pdf',
      'Hans Weil, Wittnauer history — Albert Wittnauer born in 1856, moved to New York at age sixteen in 1872; partnership with Robert in 1885; A. Wittnauer from 1890. https://hans-weil.faszination-uhrwerk.de/wittnauer.pdf',
      'OWNER OBSERVATION / repair record for the shown specimen — the alarm-side bezel operating train has experienced one fault.',
      'Rich Fordon, HODINKEE, “Bring a Loupe: A Parmigiani Fleurier Toric Memory Time, A Cartier Trianon, And Two Picks From Goodwill” (2025-08-15), “1950s Wittnauer Alarm Watch With Caliber 10WA” section — describes Cal. 10WA as a modular alarm movement based on Longines Cal. 10. https://www.hodinkee.com/articles/bring-a-loupe-august-15-2025'
    ],
    related: {
      href: '/en/cyma-time-o-vox/',
      name: 'CYMA TIME-O-VOX',
      reason: 'Another early-1950s answer to the same problem: one barrel, two pushers, and the alarm integrated in a very different way.'
    }
  },
  'pierce-duofon': {
    title: 'Pierce Duofon Cal. 135 — Two-Stage Mechanical Alarm | VINTAGE ALARM',
    description: 'Pierce Duofon with Cal. 135: two barrels, selectable WECKER / SIGNAL alarm modes, red/white indicator, model evolution, Gruen Duo-Tone relationship, specimen photographs, original alarm sound and sources.',
    specimenGallery: [
      {
        image: '/images/pierce-duofon/gallery/pierce-duofon-wrist-front.jpg',
        label: 'Front — wrist shot',
        alt: 'Pierce Duofon specimen, front wrist shot'
      },
      {
        image: '/images/pierce-duofon/gallery/pierce-duofon-signal-white.jpg',
        label: 'SIGNAL — white / discreet mode',
        alt: 'Pierce Duofon in SIGNAL mode with white indicator'
      },
      {
        image: '/images/pierce-duofon/gallery/pierce-duofon-wecker-red.jpg',
        label: 'WECKER — red / audible alarm',
        alt: 'Pierce Duofon in WECKER mode with red indicator'
      },
      {
        image: '/images/pierce-duofon/gallery/pierce-duofon-caseback.jpg',
        label: 'Caseback',
        alt: 'Pierce Duofon specimen caseback'
      }
    ],
    deepDive: [
      {
        number: '01',
        title: 'About Pierce',
        paragraphs: [
          'Pierce’s predecessor, Léon Lévy & Frère, was founded in Biel/Bienne, Switzerland, in 1883 by Léon Lévy and Théodore Lévy. The company initially sourced movements from outside suppliers, but by the early 1930s it was developing and manufacturing movements in-house.',
          'Its in-house movements included the 13-ligne chronograph calibres 130 and 134. In the 1950s Pierce also introduced the Correctomatic, a system that used two pushers on the case to move the regulator and adjust the watch to run faster or slower.',
          'Calibre 135, used in the Duofon, was also developed by Pierce itself.'
        ],
        citationRefs: ['10', '4', '4']
      },
      {
        number: '02',
        title: 'Pierce Cal. 135',
        subtitle: 'Why the red and white settings change how the alarm sounds',
        paragraphs: [
          'On the Duofon, the crown/pusher at 4 o’clock switches between WECKER and SIGNAL. The selected mode is shown in red or white in the small window below 6 o’clock.',
          'In WECKER mode, the hammer strikes the acoustic body — the gong — arranged around the movement and produces the audible alarm. In SIGNAL mode, the striking pin moves out of the hammer’s striking position, allowing the hammer to vibrate freely without hitting the gong. Pierce’s 1955 technical document explains that the change is made by turning the 4 o’clock control by one quarter-turn.',
          'The same document gives two uses for an alarm wristwatch: waking the wearer and notifying the owner at a predetermined time. SIGNAL was intended for situations such as meetings or social occasions, where there was no need for a loud alarm to be heard by the people nearby.'
        ],
        citationRefs: ['1', '1', '1'],
        mediaStyle: 'compact-sequence',
        images: [
          {
            src: '/images/pierce-duofon/mechanism/05-crown-linkage.webp',
            caption: '① Turning the 4 o’clock crown moves the linked bar and changes the position of the striking pin.',
            alt: 'Pierce Cal. 135 linkage between the 4 o’clock crown, bar and striking pin',
            afterParagraph: 2,
            fullRow: true
          },
          {
            src: '/images/pierce-duofon/mechanism/01-signal-hammer.webp?v=2',
            caption: '② SIGNAL — white / discreet side. The blue-marked part is the hammer. The striking pin is moved away from the hammer’s striking position, so the hammer vibrates without striking the gong.',
            alt: 'Pierce Cal. 135 in SIGNAL mode, showing the hammer in blue and the striking pin moved out of position',
            afterParagraph: 2
          },
          {
            src: '/images/pierce-duofon/mechanism/02-wecker-hammer.webp',
            caption: '③ WECKER — red / audible-alarm side. The blue-marked part is the hammer. The striking pin enters the hammer’s striking position, allowing the hammer to strike the gong.',
            alt: 'Pierce Cal. 135 in WECKER mode, showing the hammer in blue and the striking pin in striking position',
            afterParagraph: 2
          },
          {
            src: '/images/pierce-duofon/mechanism/03-signal-indicator.webp',
            caption: '④ SIGNAL — white. The movement of the same bar changes the indicator window below 6 o’clock to white.',
            alt: 'Pierce Cal. 135 bar mechanism changing the indicator window to white for SIGNAL mode',
            afterParagraph: 2
          },
          {
            src: '/images/pierce-duofon/mechanism/04-wecker-indicator.webp',
            caption: '⑤ WECKER — red. The movement of the same bar changes the indicator window below 6 o’clock to red.',
            alt: 'Pierce Cal. 135 bar mechanism changing the indicator window to red for WECKER mode',
            afterParagraph: 2
          }
        ]
      },
      {
        number: '03',
        title: 'Evolution of the Duofon',
        paragraphs: [
          'A watch recorded as a 1952 prototype has a 35 mm gold-coloured case and a press-fit steel caseback. The dial carries no Pierce branding, and the published reference suggests that it may not have been a finished product intended for sale. That prototype is also described as driving both the timekeeping mechanism and the alarm from a single barrel.',
          'By contrast, Pierce’s 1955 technical document states that the completed movement has two independent barrels, one for timekeeping and one for the alarm. This differs from the single-barrel arrangement recorded for the 1952 prototype.',
          'A documented 1956 example has a 34 mm stainless-steel case, a press-fit caseback and a dedicated scale for reading the alarm time. Another example from the same period is recorded with a longer alarm hand that reaches the minute track.',
          'The case design also changed in later examples. A documented 1962 watch has a 36 mm stainless-steel case and a screw-down caseback described as water-resistant. The case is recorded as being substantially different from earlier Pierce alarm wristwatches. This watch is also described as the final Pierce model fitted with Cal. 135.',
          'The specimen shown on VINTAGE ALARM may belong to this later type.',
          'Published descriptions of Duofon cases do not fully agree. One account suggests that the models are distinguished mainly by their dials and that the cases appear to be shared. Another reference presents the 34 mm press-fit caseback version and the 36 mm screw-down caseback version as clearly different specifications.'
        ],
        citationRefs: ['2', '1', '2', '2', '2', '2,4']
      },
      {
        number: '04',
        title: 'Relationship with the Gruen Duo-Tone',
        paragraphs: [
          'Pierce Cal. 135 was also supplied to Gruen.',
          'Gruen adopted a movement based on Pierce Cal. 135 as Cal. 920 SS and used it in the Duo-Tone Precision. One documented example has a 33.1 mm gold-coloured case and a press-fit steel caseback, while the movement carries additional finishing and Gruen signatures.',
          'The Duo-Tone also uses the 4 o’clock crown to select between two alarm modes. The underlying movement is Pierce Cal. 135, designated Cal. 920 SS by Gruen.'
        ],
        citationRefs: ['3,4', '3,4', '3,4'],
        mediaStyle: 'compact-sequence',
        images: [
          {
            src: '/images/gruenduotone.png',
            caption: 'Gruen Duo-Tone dial',
            alt: 'Gruen Duo-Tone Precision dial',
            afterParagraph: 2
          },
          {
            src: '/images/gruenduotone2.png',
            caption: 'Gruen Duo-Tone movement',
            alt: 'Gruen Duo-Tone Precision Cal. 920 SS movement',
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
      'Pierce AG, Biel, “Die Wecker-Armbanduhr Duofon mit zwei Lautstärken” (30 Aug. 1955), reproduced in Leonhard Beitl, Alarm am Arm (2009), pp. 353–355.',
      'Leonhard Beitl, Alarm am Arm (2009), pp. 356–358 — Pierce Duo Fon model examples and Cal. 135.',
      'Leonhard Beitl, Alarm am Arm (2009), pp. 198–199 — Gruen Duo-Tone Precision / Cal. 920 SS.',
      'Michael Philip Horlbeck, The Alarm Wristwatch (Schiffer Publishing, 2007), pp. 20, 130–131, 189–190, 218–221 — Duofon / Pierce Cal. 135 / variable alarm volume. Page 131 gives the company founding year as 1888.',
      'Five mechanism images (①–⑤) and two Gruen Duo-Tone images (dial / movement): images provided by [Mori (時計狂)](https://x.com/ad19200610?s=11&t=3m8xXI66ZgB96VPG9PtQgw).',
      'Leonhard Beitl, Alarm am Arm (2009), p. 670 — manufacturer list: Pierce / Lévy Frères / 1883.',
      '[Grail Watch Wiki — Pierce](https://wiki.grail-watch.com/index.php/Pierce) — records the founding of Léon Lévy & Frère on 16 May 1883.',
      '[Ranfft DB — Pierce Calibers](https://ranfft.org/manufacturer/241-Pierce) — gives 1883 as the founding year.',
      '[Watch-Wiki — Pierce](https://www.watch-wiki.net/doku.php?id=pierce) — gives 1883 as the founding year.',
      'Founding-year note: this page uses 1883. Horlbeck p. 131 gives 1888, while Beitl p. 670, Grail Watch Wiki, Ranfft DB and Watch-Wiki give 1883. VINTAGE ALARM therefore uses 1883 as the current text value while final confirmation from a company register or equivalent primary record remains open.'
    ],
    related: {
      href: '/en/cyma-time-o-vox/',
      name: 'CYMA TIME-O-VOX',
      reason: 'The same 1950s, taken to the opposite extreme: one barrel, with a Chronomètre specification.'
    }
  },
  'westclox-watchlarm': {
    title: 'Westclox Watchlarm W5 — Zero-Jewel Push-Button Alarm | VINTAGE ALARM',
    description: 'Westclox Watchlarm W5: zero jewels, one barrel, push-button alarm setting, a 9 o’clock ON/OFF slider, specimen measurements, original alarm sound, manufacturing history and cited sources.',
    specimenGallery: [
      {
        image: '/images/IMG_2093-2.jpeg',
        label: 'Front',
        alt: 'Westclox Watchlarm W5 specimen, front view'
      },
      {
        image: '/images/IMG_2038.jpeg',
        label: '2 o’clock pusher',
        alt: 'Westclox Watchlarm W5 2 o’clock alarm-setting pusher'
      },
      {
        image: '/images/IMG_2036.jpeg',
        label: '9 o’clock slider — OFF',
        alt: 'Westclox Watchlarm W5 9 o’clock alarm slider in OFF position'
      },
      {
        image: '/images/IMG_2037.jpeg',
        label: '9 o’clock slider — ON',
        alt: 'Westclox Watchlarm W5 9 o’clock alarm slider in ON position'
      },
      {
        image: '/images/IMG_2095.jpeg',
        label: 'Caseback',
        alt: 'Westclox Watchlarm W5 specimen caseback'
      }
    ],
    deepDive: [
      {
        number: '01',
        title: 'A company that made tens of millions of alarm clocks',
        subtitle: 'Westclox production scale and wristwatch manufacturing',
        paragraphs: [
          'In the 1950s, Westclox was a manufacturer producing alarm clocks such as the Big Ben and Baby Ben on a massive scale. Around 1956, the LaSalle factory is reported to have employed more than 4,000 people and produced about 40,000 timepieces per day. By that period, more than 40 million Big Bens and more than 28 million Baby Bens are said to have been made.',
          'The company also manufactured inexpensive zero-jewel wristwatches such as the W4. The Watchlarm W5 uses a zero-jewel pin-lever movement with an integrated alarm mechanism. Former Westclox employee Ellworth Danz suggested that some W4 parts may have been used in the W5.',
          'The sources differ on its production period. Beitl treats it as a product of the 1950s, while Horlbeck places it from 1960 onward, and ClockHistory confirms catalogue appearances in 1960 and 1961. Because no source available for this page establishes the production year of the specimen shown here, VINTAGE ALARM describes it as “late 1950s to early 1960s.”'
        ],
        citationRefs: ['4', '2,3', '1,2,3']
      },
      {
        number: '02',
        title: 'Zero jewels, no separate metal bearings',
        paragraphs: [
          'The W5 is a zero-jewel pin-lever movement and has no separate metal bearings. Its pivots rotate directly in holes in the plate and supporting plate. The balance is stamped, the hairspring is flat, and the shock protection is also simple.',
          'The movement uses a full-plate construction, stacking circular plates instead of conventional bridges and a separate balance cock. The references describe a design that avoids even unnecessary cut-outs wherever possible in order to reduce cost.',
          'Even so, one barrel powers both timekeeping and the alarm, while delivering about 38 hours of running time and about 10 seconds of alarm operation.'
        ],
        citationRefs: ['1,2', '1', '1']
      },
      {
        number: '03',
        title: 'Push-button alarm setting at 2 o’clock',
        paragraphs: [
          'On the specimen shown here, 60 presses move the alarm hand through a full 12-hour circuit, or about 12 minutes per press. That differs from the 15-minute increments described by Horlbeck and Beitl, but agrees with the 12-minute increments listed by Ranfft. It remains unconfirmed whether the difference comes from specimen variation, specification variation or differences between the sources.',
          'This system allowed the alarm time to be set without an additional setting train and without an expensive rotating bezel.',
          'At 9 o’clock there is an alarm ON/OFF slider: moving it upward turns the alarm ON and moving it downward turns it OFF. When switched ON, the “ON” marking on the case becomes visible.'
        ],
        citationRefs: ['1,2,5,6', '1', '1,2']
      },
      {
        number: '04',
        title: 'It was not easy to manufacture',
        paragraphs: [
          'Former Westclox employee Ellworth Danz suggested that some W4 parts may have been used in the W5.',
          'At the same time, Danz recalled that the Watchlarm was difficult to manufacture and that he did not think Westclox made a profit on the watch.'
        ],
        citationRefs: ['3', '3']
      },
      {
        number: '05',
        title: 'German-made case and the sound structure',
        paragraphs: [
          'Beitl records the Westclox Alarm case and dial as German-made and describes his illustrated example as having a chrome-finished brass case, a press-fit caseback and a diameter of 32.88 mm.',
          'The specimen shown on this page is recorded at 34 mm. Because that does not match the 32.88 mm example in Beitl, this page does not claim that the two use the same case specification.',
          'Horlbeck points out similarities to the bottom construction of the Junghans Minivox, including a slightly domed caseback, a central rivet and a small bridge on the inside.',
          'However, no source confirmed for this page establishes that Junghans directly manufactured the W5 case or designed the W5. Horlbeck likewise presents it only as a possible close relationship through cooperation or supply.'
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
      'Michael Philip Horlbeck, The Alarm Wristwatch (Schiffer Publishing, 2007), pp. 150, 198–199, 220–221 — Westclox W5 specifications, operation, cost-reduction construction, case and acoustic structure.',
      'Leonhard Beitl, Alarm am Arm (2009), pp. 497–498, 628 — Westclox Alarm / W5, zero jewels, case diameter, operation, German-made case and dial.',
      'Ellworth Danz, [Westclox Wristwatches](https://clockhistory.com/westclox/products/wristwatch/) — relationship between W5 and W4 parts, manufacturing difficulty, profitability, and 1960/1961 catalogue appearances.',
      'ClockHistory, [Western Clock Company Chronology](https://clockhistory.com/westclox/company/dates/index.html) — 1956 employee count and production scale, cumulative Big Ben / Baby Ben production figures.',
      'Roland Ranfft, [Westclox W5](https://ranfft.org/caliber/10726-Westclox-W5) — description of 12-minute alarm-setting increments.',
      'OWNER OBSERVATION — specimen record: 34 mm case diameter; 60 presses of the 2 o’clock pusher move the alarm hand through one full 12-hour circuit.'
    ],
    related: {
      href: '/en/basis-alarm/',
      name: 'BASIS ALARM',
      reason: 'A different direction from luxury watches: another answer built for the mass market.'
    }
  }
};
