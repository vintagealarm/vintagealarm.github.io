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
          'Pierce was founded in Biel/Bienne, Switzerland, in 1888 by Léon Levi and his brothers. The company initially sourced movements from outside suppliers, but by the early 1930s it was developing and manufacturing movements in-house.',
          'Its in-house movements included the 13-ligne chronograph calibres 130 and 134. In the 1950s Pierce also introduced the Correctomatic, a system that used two pushers on the case to move the regulator and adjust the watch to run faster or slower.',
          'Calibre 135, used in the Duofon, was also developed by Pierce itself.'
        ],
        citationRefs: ['4', '4', '4']
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
      { id: '5', type: 'provenance' }
    ],
    sources: [
      'Pierce AG, Biel, “Die Wecker-Armbanduhr Duofon mit zwei Lautstärken” (30 Aug. 1955), reproduced in Leonhard Beitl, Alarm am Arm (2009), pp. 353–355.',
      'Leonhard Beitl, Alarm am Arm (2009), pp. 356–358 — Pierce Duo Fon model examples and Cal. 135.',
      'Leonhard Beitl, Alarm am Arm (2009), pp. 198–199 — Gruen Duo-Tone Precision / Cal. 920 SS.',
      'Michael Philip Horlbeck, The Alarm Wristwatch (Schiffer Publishing, 2007), pp. 20, 130–131, 189–190, 218–221 — Duofon / Pierce Cal. 135 / variable alarm volume.',
      'Five mechanism images (①–⑤) and two Gruen Duo-Tone images (dial / movement): images provided by [Mori (時計狂)](https://x.com/ad19200610?s=11&t=3m8xXI66ZgB96VPG9PtQgw).'
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
