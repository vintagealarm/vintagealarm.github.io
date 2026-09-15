# Wittnauer 10WA — CH304088A patent audit

Status: working research note for `research/10wa-round2`. This file supplements `WITTNAUER_10WA_LEDGER.md`; it does not replace the main ledger.

## Verified primary source

### CH304088A — Marcel Bliss

- Swiss patent publication: `CH304088A`.
- Inventor / original assignee shown in the patent record: Marcel Bliss.
- Filing / priority date: 1952-12-04.
- Publication date: 1954-12-31.
- The patent itself does **not** name Wittnauer.
- Google Patents shows only one Swiss family application / country status for this family. This does not establish that no commercial licence or assignment existed; it only means no foreign family application was found in the checked record.

The text describes an alarm mechanism mounted outside the base movement, between the movement plate and dial, on its own plate. It describes an alarm barrel and a rotating bezel carrying an internal toothed ring.

The bezel arrangement is described as capable of:

1. winding the alarm barrel by rotating the bezel, and
2. simultaneously driving the alarm-time setting train.

The patent goes further than a bare mechanism description: it explicitly presents this arrangement as a way for the wearer to avoid separately worrying about winding the alarm spring, because the alarm spring is wound whenever the alarm time is set by turning the bezel.

This is a very close structural match to the independently documented operating architecture of Wittnauer Cal.10WA: dial-side alarm module + dedicated alarm barrel + bezel-based alarm winding and alarm-time setting.

### Important detail: slipping bridle option

The patent further states that, if the alarm barrel uses a slipping-bride / slipping-bridle spring arrangement, freedom to change the alarm setting can be retained even when the spring is fully wound.

This matters because Horlbeck describes the production 10WA as reaching maximum alarm wind at roughly 1.5 bezel turns and warns that forcing further rotation can damage transmission teeth. Therefore:

- the patent author explicitly recognized the conflict between combined `set + wind` operation and full-wind setting freedom;
- the patent proposes a technical way to avoid that conflict;
- the currently documented 10WA operating behavior does not provide that same full-wind setting freedom.

A renewed search of the available 10WA repair / teardown reports did **not** find a source directly identifying the alarm mainspring attachment as a slipping bridle or a fixed bridle. The absence of setting freedom at full wind is strong behavioral evidence that the production watch did not implement the patent's proposed solution in an equivalent way, but the exact barrel-spring construction remains `OPEN` until a teardown or service document shows it directly.

This comparison is evidence for a design trade-off, but it is **not** evidence that Wittnauer deliberately omitted the patent's slipping-brindle option for cost, reliability, packaging, or any other specific reason.

### Later recognition as prior art

A 2021 Swatch Group patent family for a watch case with a mechanism actuating a movable indicator cites `CH304088A` as prior art. This shows that the Bliss patent remains identifiable in later horological patent literature as relevant prior art for case / bezel actuation. It does **not** establish a corporate or technical lineage from Bliss to Wittnauer.

## Relationship to Wittnauer 10WA

Classification: `HOLD / strong structural correspondence`.

Safe wording:

> A Swiss patent by Marcel Bliss, filed in 1952 and published in 1954 as CH304088A, describes a dial-side alarm module whose rotating bezel both winds the alarm barrel and sets the alarm time. The architecture corresponds very closely to the operating layout documented on surviving Wittnauer Cal.10WA watches.

Do **not** state yet:

- `CH304088A is the Wittnauer 10WA patent.`
- `Wittnauer owned CH304088A.`
- `Wittnauer licensed CH304088A from Marcel Bliss.`
- `Marcel Bliss designed the 10WA for Wittnauer.`

Missing bridge evidence: assignment / licence record, manufacturer service documentation, period technical literature, inventor-company correspondence, or another primary source directly connecting Bliss / CH304088A to Wittnauer 10WA.

## Marcel Bliss — watch-industry lead

Classification: `HOLD / biographical lead`, not a Wittnauer bridge.

- `CH332208A`, filed 1957-12-09 and published 1958-08-31, is another Swiss watch patent under the name Marcel Bliss. It concerns a marquise wristwatch with spring-hinged bracelet branches. This independently shows that a Marcel Bliss was filing watch-related patents in the same decade.
- Secondary corporate-history research on Montres Busga SA states that Marcel Bliss of Zurich received power of attorney at Busga in 1959, joined the board in 1967 and later became president after Fritz Bliss's death in 1973.
- The same Busga history records the `Capitol Alarm Timer`, introduced in 1958, whose alarm was set by a rotating bezel / tire.

These points make Marcel Bliss's connection to the Swiss watch industry substantially more plausible than an isolated patent-name coincidence. However, the checked material does **not** yet prove that the `CH304088A` inventor and the later Busga officer are the same person, nor that Marcel Bliss was acting for Busga in 1952, nor that Busga had any relationship with Wittnauer 10WA.

High-value bridge still missing: a contemporary commercial register, patent assignment, Busga document, trade notice, correspondence, or other primary record linking the 1952 patent applicant to a watch firm at the time of filing.

## FHF research note

User-provided screenshot of FHF (@FHF_Ebauche), dated 2024-08-09 / 2024-08-10, states that:

- Cal.10WA uses the bezel to set the alarm time while winding the alarm mainspring;
- the account associated the construction with a 1954 patent;
- the account describes a patent-first research path: unusual patent found first, then a matching surviving watch was sought;
- the 2024-08-09 reply initially speculated about a Revue-related base movement;
- the 2024-08-10 follow-up corrected course and states the base movement is A. Schild Cal.1200, posting an identification image headed `A SCHILD 1200 / WITT 11P`.

Use FHF as a research-path / secondary-source attribution, not as the sole proof of the patent or base calibre. The patent mechanism has now been independently checked against CH304088A.

## Base movement conflict — re-audit after the FHF image

The FHF material strengthens the need to investigate the AS1200 route, but the specific `AS1200 = Wittnauer 11P` bridge shown in the screenshot is now itself in conflict with other trade / parts references.

### Evidence supporting an AS1200-family relationship to 10WA

- AWI / parts evidence: Wittnauer 10S = AS1200 and multiple AS1200-family parts cross-reference to Wittnauer 10WA.
- Time Connection / Bestfit-derived listing: factory no. `445/AS 1200` set bridge lists `WITTNAUER 10WA` among compatible calibres.
- Stem interchange data place `AS 1200` together with `Wittnauer 10S, 10SC, 10WA, 11B, 11H`.
- These sources repeatedly connect **10WA** and **11H** with the AS1200 parts family.

### New conflict: 11P is mapped to Peseux 170, not AS1200

A historical Marshall Handy Manual concordance scan lists Wittnauer discontinued models as follows:

- `10SG` → `WIT-AS1200`
- `11H` → `WIT-AS1200`
- `11P` → `WIT-P170`

A separate Bestfit balance-staff listing also groups `Peseux 170-190` with `Witt 11P`.

Therefore, the FHF screenshot's identification image `A SCHILD 1200 / WITT 11P` cannot currently be used as a clean bridge from AS1200 to 10WA. At minimum there is a source conflict over the `11P` designation. Possible explanations include a source-specific cross-reference, an error in one catalog, or a misidentification, but none is proven.

**Do not silently “correct” `11P` to `11H`.** Marshall and interchange data make `11H = AS1200` a strong lead, but the exact source of the FHF image must be identified before deciding whether the image itself contains a typo or uses another convention.

### Paulson lead

`Paulson's Master Key Swiss Catalog` is independently documented as a 1950 Chicago movement-identification catalog with more than 3,500 movement illustrations, and specialist users note that it unusually shows bridge-side views. The FHF image's layout and `MSPG W S L` style are compatible with a movement-identification catalog, but the exact source / page of the screenshot has **not** been verified.

Because the 1950 Paulson catalog predates both the 1952 Bliss patent filing and the 10WA, it can only be relevant to identifying a base movement / Wittnauer house caliber, not to proving the alarm module itself.

Current base-movement conclusion remains `CONFLICT`:

- Horlbeck / Beitl: Longines-base description.
- AS1200 side: repeated parts interchange / 10WA compatibility evidence.
- FHF: AS1200 conclusion, but the posted `WITT 11P` bridge is contradicted by Marshall / Bestfit data that map `11P` to Peseux 170 and `11H` to AS1200.

Still missing: a period or manufacturer source directly stating `Wittnauer 10WA = AS 1200 + alarm module` or otherwise naming the exact base calibre used in 10WA.

## Production constraint / repair evidence

The renewed repair-source check found no direct statement about a slipping bridle inside the 10WA alarm barrel, but it strengthens the operational-damage side:

- Horlbeck describes the bezel blocking at full alarm wind and warns that continued force can strip transmission teeth.
- A 2026 Uhrforum repair report documents a 10WA with broken teeth attributed to earlier improper alarm operation and repeats that over-rotating the bezel damages the alarm mechanism.
- A Japanese 10WA overhaul report emphasizes the lack of published disassembly guidance and the need for unusually cautious service.

These reports support a specific operation / service risk. They still do **not** justify the blanket statement `10WA is generally fragile` or prove why Wittnauer later moved to AS alarm calibres.

## Research priority

1. Trace assignment / licence / ownership history of CH304088A.
2. Identify Marcel Bliss's commercial relationship in 1952, and independently verify whether the patent inventor is the Marcel Bliss later connected with Montres Busga SA.
3. Find a period Wittnauer / Bestfit / service document directly linking `10WA` to its base calibre.
4. Identify the exact bibliographic source / edition / page of the `A SCHILD 1200 / WITT 11P` image shown in the FHF post.
5. Resolve the `11P` contradiction: Paulson/FHF image vs Marshall / Bestfit (`11P = Peseux 170`, `11H = AS1200`).
6. Find a 10WA teardown / service document that directly shows whether the alarm barrel uses a fixed bridle or slipping bridle.
7. Preserve the Longines-base vs AS1200-base conflict until direct bridge evidence appears.

## Editorial consequence

CH304088A makes the `combined operation -> self-imposed constraint` story substantially stronger, but the respectful framing remains essential.

The patent itself shows an intentionally sophisticated attempt to integrate alarm winding and alarm-time setting into one external control. It explicitly explains the user benefit — no separate alarm winding step — and then anticipates the full-wind setting problem with a slipping-bride option.

Therefore the most defensible story is **not** `a foolish design accidentally created a trap`.

A stronger research framing is:

> The one-bezel concept deliberately tried to remove one task from the wearer. The inventor even anticipated the trap created by coupling setting and winding. The production 10WA nevertheless exhibits a full-wind setting constraint, and the reason that implementation differs from the patent option remains unknown.

That distinction matters for the catch-copy work: `縛りプレイ` can describe the production operating experience, but it should carry respect for a concept that was consciously trying to simplify use and whose patent already recognized the trade-off.
