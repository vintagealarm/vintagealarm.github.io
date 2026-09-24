export type EnglishWatchEntry = {
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
};

export const englishWatchEntries: Record<string, EnglishWatchEntry> = {
  'wittnauer-10wa': {
    slug: 'wittnauer-10wa',
    title: 'Wittnauer Cal. 10WA — Bezel-Wound Mechanical Alarm | VINTAGE ALARM',
    description: 'Wittnauer Cal. 10WA from the early 1950s: a two-barrel modular alarm wristwatch whose rotating bezel both winds the alarm spring and sets the alarm time, with specimen photographs, original alarm video and source-backed research.',
    indexBlurb: 'Wind it and set it with the same bezel: a two-barrel alarm watch with the alarm module stacked on the dial side.',
    catch: ['Tough shift, alarm department.', 'Today, too, the bezel is doing both jobs. 🔔'],
    ownersNote: {
      lead: [
        'Wind it with the bezel. Set it with the bezel.',
        'A dedicated alarm module is stacked on the dial side of the timekeeping movement.',
        'The alarm has its own barrel.',
        'Yet the alarm side is operated with one bezel.'
      ],
      guideTitle: 'Quick operating guide',
      guide: [
        '① Winding — timekeeping: wind with the crown / alarm: rotate the bezel counter-clockwise',
        'For the alarm, stop at about one full turn as a precaution against damage.',
        '② Time setting — pull the crown and turn clockwise',
        '③ Alarm setting — rotate the bezel counter-clockwise',
        'There is no alarm ON/OFF control.'
      ],
      noteTitle: 'NOTE',
      note: [
        'Distinctive numeral indices.',
        'A wavering alarm hand.',
        'A projecting rotating bezel and a small crown half-hidden by the case.',
        'Through the display back, only the timekeeping side is visible.',
        'The alarm mechanism is hidden on the dial side.'
      ]
    },
    spec: {
      era: 'Early 1950s',
      caseSize: 'Approx. 36 mm (shown specimen)',
      caliber: 'Wittnauer Cal. 10WA',
      jewels: '17 jewels',
      frequency: '18,000 vph',
      barrels: '2 barrels',
      winding: 'Manual winding',
      acoustic: 'Gong system',
      notes: 'Rotating-bezel alarm setting + alarm winding, separate alarm barrel'
    }
  },
  'basis-alarm': {
    slug: 'basis-alarm',
    title: 'Basis Alarm BFG 90 — Two-Barrel Bezel-Set Alarm | VINTAGE ALARM',
    description: 'Basis Alarm with Baumgartner BFG 90: two barrels wound from one crown in the same direction, sliding clutches, two winding indicators, rotating-bezel alarm setting, specimen photographs, original alarm sound and cited sources.',
    indexBlurb: 'Two barrels, one winding direction, two spinning indicator windows — and an alarm that sounds like a cicada.',
    catch: ['A little mechanical toy box to touch, watch, and hear.'],
    ownersNote: {
      lead: [
        'A little mechanical toy box to touch, watch, and hear.',
        'Set the alarm with the bezel.',
        'Wind the crown and the discs in the two windows spin.',
        'Move the slider to ON — then comes the cicada-like alarm.'
      ],
      guideTitle: 'Quick operating guide',
      guide: [
        '① Winding — crown in normal position: winds both the timekeeping and alarm mainsprings in the same direction',
        '② Time setting — pull the crown and set the hands',
        '③ Alarm setting — rotate the bezel counter-clockwise to set the alarm time',
        '④ Alarm ON / OFF — 9 o’clock slider: up = OFF / down = ON',
        '⑤ Winding windows — 1 o’clock for the time barrel, 5 o’clock for the alarm barrel; the red/white/blue discs rotate while winding'
      ],
      noteTitle: 'NOTE',
      note: [
        'The Basis Alarm uses the Baumgartner BFG 90, an early alarm-wristwatch movement.',
        'Away from high-end watches such as the Memovox and Cricket, the BFG 90 spread through practical watches sold under names including Basis, Lantex, Sheffield, Simplon and Tior.',
        'Rather than the refinement associated with a luxury watch, it presents its functions openly as a practical object.',
        'That is exactly why so much of the pleasure survives in watching it, handling it and making it ring.'
      ]
    },
    spec: {
      era: 'c. 1948 (same-type documentation)',
      caseSize: '34 mm',
      caliber: 'Baumgartner BFG 90',
      jewels: '17 jewels',
      frequency: '18,000 vph',
      barrels: '2 barrels',
      winding: 'Manual winding',
      acoustic: 'Bottom-bell system',
      notes: 'Approx. 10-second alarm, rotating-bezel alarm setting, 9 o’clock ON/OFF slider, winding-indicator windows at 1 and 5 o’clock'
    }
  },
  'cyma-time-o-vox': {
    slug: 'cyma-time-o-vox',
    title: 'Cyma Time-O-Vox 18K Chronomètre — English entry | VINTAGE ALARM',
    description: 'English entry to the Cyma Time-O-Vox 18K Chronomètre with Cal. R.464: one barrel, two pushers, alarm, chronometer-marked dial, original alarm video and specimen photographs.',
    indexBlurb: 'An 18K dress watch, an alarm, a single barrel and a dial marked Chronomètre — all in one contradiction-heavy watch.',
    catch: ['A gold chronometer that rings.'],
    ownersNote: {
      lead: [
        'A gold chronometer that rings.',
        'From the front, a dress watch.',
        'From the side, almost a chronograph.',
        'Thin despite the complication — and marked Chronomètre.'
      ],
      guideTitle: 'Quick operating guide',
      guide: [
        '① Winding — press the upper pusher and turn the crown',
        '② Time setting — press the upper pusher, pull the crown and turn',
        '③ Alarm setting — press the lower pusher and turn the crown',
        '④ ON / OFF — both pushers centered = ON; press either pusher = OFF',
        'The alarm time can be set in either direction; the Japanese research note recommends counter-clockwise setting when prioritizing precision.'
      ],
      noteTitle: 'NOTE',
      note: [
        'Alarm wristwatches carrying a Chronomètre designation were rare in period documentation.',
        'The Time-O-Vox drives both timekeeping and alarm from a single barrel, so sounding the alarm also consumes the energy used for timekeeping.',
        'This specimen combines that mechanism with an 18K gold case and distinctive open-worked lugs.'
      ]
    },
    spec: {
      era: 'c. 1956',
      caseSize: '34 mm',
      caliber: 'Cyma R.464',
      jewels: '17 jewels',
      frequency: '18,000 vph',
      barrels: '1 barrel',
      winding: 'Manual winding',
      acoustic: 'Gong system',
      notes: '18K yellow gold, Chronomètre dial marking, two pushers, open-worked lugs'
    }
  },
  'citizen-alarm': {
    slug: 'citizen-alarm',
    title: 'Citizen Alarm Cal. 980 — Japan’s First Domestic Alarm Wristwatch | VINTAGE ALARM',
    description: 'Citizen Alarm from 1958: Japan’s first domestically produced alarm wristwatch, Cal. 980, two barrels, twin crowns, a rotating centre alarm disc, double-caseback sound construction, later Four Hands variants and cited sources.',
    indexBlurb: 'Japan’s first bell-ringing wristwatch: two barrels, two crowns and a rotating alarm disc at the center of the dial.',
    catch: ['Japan’s first bell-ringing wristwatch — and the start of a lineage.'],
    ownersNote: {
      lead: [
        '1958: Japan’s first bell-ringing wristwatch.',
        'A rotating center alarm disc and two crowns define the earliest form.',
        'Its face recalls the earlier Memovox layout.',
        'A later story says Jaeger-LeCoultre complained that it looked too similar; the cited research sources do not confirm that story.'
      ],
      guideTitle: 'Quick operating guide',
      guide: [
        '① 4 o’clock crown — wind the timekeeping side; pull to set the time',
        '② 2 o’clock crown — wind the alarm side; pull to set the alarm time'
      ],
      noteTitle: 'NOTE',
      note: [
        'The first center-disc design was followed by four-hand alarm models.',
        'The line later expanded into Alarm Date, College Alarm, sports and diver-style versions, and women’s alarm watches.',
        'What began as Japan’s first bell-ringing wristwatch became a broader Citizen alarm-watch family.'
      ]
    },
    spec: {
      era: 'c. 1958 (early type)',
      caseSize: '37 mm (same-type documentation)',
      caliber: 'Citizen 980 (same-type documentation)',
      jewels: '17 jewels (same-type documentation)',
      frequency: '18,000 vph (same-type documentation)',
      barrels: '2 barrels',
      winding: 'Manual winding',
      acoustic: 'Double-caseback sound system',
      notes: 'Rotating center alarm disc, twin crowns, Parashock'
    }
  },
  'westclox-watchlarm': {
    slug: 'westclox-watchlarm',
    title: 'Westclox Watchlarm W5 — English entry | VINTAGE ALARM',
    description: 'English entry to the Westclox Watchlarm W5: a zero-jewel, single-barrel alarm wristwatch with push-button alarm setting, ON/OFF slider and original alarm video.',
    indexBlurb: 'Zero jewels, one barrel, push-button alarm setting — an alarm wristwatch built around aggressive cost reduction.',
    catch: ['A dramatic before-and-after for a zero-jewel wristwatch.'],
    ownersNote: {
      lead: [
        'A dramatic before-and-after for a zero-jewel wristwatch.',
        'No jewels needed.',
        'No separate metal bearings needed, either.',
        'No rotating bezel. No extra setting train.',
        'And yet, it still gets an alarm.',
        'What a transformation.',
        'The masters of mass-produced alarms put an alarm into a zero-jewel wristwatch while adding as few new parts as possible.'
      ],
      guideTitle: 'Quick operating guide',
      guide: [
        '① Winding — crown in normal position winds the single mainspring shared by timekeeping and alarm',
        '② Time setting — pull the crown and set the hands',
        '③ Alarm setting — press the 2 o’clock pusher; on this specimen each press advances the alarm hand counter-clockwise by about 12 minutes, 60 presses for one full 12-hour circuit',
        '④ Alarm ON / OFF — 9 o’clock slider: up = ON / down = OFF; an “ON” marking appears on the case when engaged'
      ],
      noteTitle: 'NOTE',
      note: [
        'Westclox mass-produced alarm clocks while also making inexpensive zero-jewel wristwatches such as the W4.',
        'On the Watchlarm W5, the alarm time is set with the 2 o’clock pusher, eliminating an additional setting train and an expensive rotating bezel.',
        'Former Westclox employee Ellworth Danz suggested that some W4 parts may have been used in the W5. At the same time, he recalled that the Watchlarm was difficult to manufacture and that he did not think it was profitable.'
      ]
    },
    spec: {
      era: 'Late 1950s to early 1960s',
      caseSize: '34 mm',
      caliber: 'Westclox W5',
      jewels: '0 jewels',
      frequency: '18,000 vph',
      barrels: '1 barrel',
      winding: 'Manual winding',
      acoustic: 'Bottom-bell system',
      notes: '2 o’clock push-button alarm setting, 60 presses per 12 hours on this specimen, 9 o’clock ON/OFF slider, approx. 10-second alarm'
    }
  },
  'pierce-duofon': {
    slug: 'pierce-duofon',
    title: 'Pierce Duofon Cal. 135 — English entry | VINTAGE ALARM',
    description: 'English entry to the Pierce Duofon Cal. 135: a two-barrel alarm wristwatch with selectable WECKER / SIGNAL notification modes, red/white indicator and original alarm video.',
    indexBlurb: 'A 1950s mechanical alarm watch that lets the wearer choose between a full audible alarm and a discreet signal mode.',
    catch: ['An ancestor of “silent mode”!?', '1950s notification tech that feels decades ahead of its time.'],
    ownersNote: {
      lead: [
        'An ancestor of “silent mode”!?',
        '1950s notification tech that feels decades ahead of its time.',
        'Even the consideration built into a reminder was mechanical.'
      ],
      guideTitle: 'Quick operating guide',
      guide: [
        '① Winding — 3 o’clock crown: clockwise = timekeeping side / counter-clockwise = alarm side',
        '② Time setting — pull the 3 o’clock crown to the second position and turn clockwise',
        '③ Alarm setting — pull the 3 o’clock crown to the first position and turn clockwise',
        '④ Alarm mode — rotate the 4 o’clock crown about a quarter turn: clockwise = WECKER (red) / counter-clockwise = SIGNAL (white)',
        '⑤ Alarm ON / OFF — 4 o’clock crown: pull = ON / push in = OFF'
      ],
      noteTitle: 'NOTE',
      note: [
        'The idea of choosing between an audible sound and a discreet notification depending on the situation did not become widespread until pager and mobile-phone functions became common from the late 1980s into the 1990s.',
        'Separate from that later trend, the Duofon had already mechanized the “distance” of a notification in a 1950s wristwatch.',
        'The 4 o’clock crown selects the sound, while the small window below 6 shows the watch’s “tone of voice” in color.',
        'For an alarm wristwatch, it had caught the mood of the future far too early.'
      ]
    },
    spec: {
      era: 'Early 1960s specimen',
      caseSize: '36 mm',
      caliber: 'Pierce Cal. 135',
      jewels: '21 jewels',
      frequency: '18,000 vph',
      barrels: '2 barrels',
      winding: 'Manual winding',
      acoustic: 'Gong system',
      notes: 'WECKER / SIGNAL mode selection, red/white indicator below 6 o’clock'
    }
  }
};

export const englishWatchSlugs = Object.keys(englishWatchEntries);