# Wittnauer 10WA — Two-Track Progress — 2026-09-15 Round 7

Status: continuation of `WITTNAUER_10WA_TWO_TRACK_PLAN.md` on branch `research/10wa-round2`.

Evidence discipline remains `ADOPTED / HOLD / CONFLICT / OPEN`. This round narrows the service-document hunt and separates what can be learned from surviving parts listings from what still requires a period Wittnauer source.

## Track A — Wittnauer adoption / product-history

### A21. Surviving parts listings expose a coherent 10WA-specific alarm-module part-number cluster

Current searchable surviving parts listings identify multiple 10WA alarm-side parts with two parallel number forms: a four-digit listing number and an `X31xx` code.

Observed examples include:

- `7182 (X3154)` — Alarm Barrel Complete
- `7196 (X3155)` — Alarm Barrel Arbor
- `7288 (X3156)` — Unlocking Wheel
- `7290 (X3158)` — Alarm Wheel
- `7294 (X3159)` — Alarm Setting Connect Wheel
- `7295 (X3160)` — Alarm Setting Wheel
- `7426 (X3164)` — Alarm Click
- `7436 (X3165)` — Alarm Click Spring
- `7289 (X3167)` — Intermediate Wheel for Alarm
- `7498 (X3168)` — Alarm Hammer
- `57140 (X3170)` — Alarm Movement Plate Screw

Sources:
- https://www.ebay.com/p/15054658422
- https://www.ebay.com/str/brian727272store

Classification: `ADOPTED — surviving-parts listing pattern / HOLD — provenance of the X-number system`.

What this supports:

- the alarm module can be searched as a distinct service-parts subsystem rather than only through the generic calibre name `10WA`;
- the dense `X3154–X3170` cluster is a strong archival search key for a period parts catalogue, repair bulletin or interchange book;
- the module has dedicated alarm-specific service parts including barrel, setting train, click, hammer and plate hardware.

What it does **not** support:

- that the `X31xx` numbers are definitively original Wittnauer factory numbers;
- that the seller's four-digit numbers are factory numbers rather than distributor / inventory numbers;
- the identity of the timekeeping base movement;
- any conclusion about who designed or supplied the module.

Research rule:

> Search `X3154`, `X3155`, `X3156`, `X3158`, `X3159`, `X3160`, `X3164`, `X3165`, `X3167`, `X3168`, `X3170` alongside `10WA` in period technical literature. A hit that reproduces this cluster would be substantially more probative than another modern seller listing.

### A22. The part-number cluster gives a new route into the production hard-stop / slipping-bride question

The current parts listings specifically identify:

- complete alarm barrel (`7182 / X3154`), and
- alarm barrel arbor (`7196 / X3155`).

Classification: `ADOPTED target identification / OPEN construction`.

Research consequence:

The exact production question can now be formulated at component level:

> Does the `10WA / X3154` alarm barrel contain a fixed outer attachment, a slipping bridle, or another arrangement that explains the hard full-wind stop described by Horlbeck?

The listings themselves do not expose the barrel interior, so no construction claim is made. But `X3154` and `X3155` are now the highest-value component identifiers for service-sheet or teardown searching.

### A23. Modern parts interchange continues to support a broad AS1200-family relationship on the timekeeping side, while the alarm-side X31xx cluster remains separate

A current Bestfit-derived supplier page lists factory `445/AS 1200` setting bridge as compatible with `Wittnauer 10WA`, alongside numerous AS-family calibres. Another lists factory `5330/AS 1200` lower balance-cap-jewel screw with `Wittnauer 10WA` compatibility.

Sources:
- https://www.timeconnectioninc.com/products/set-bridge-445-654
- https://www.timeconnectioninc.com/products/screw-for-lower-balance-cap-jewel-5311-210

Classification: `STRONG AS1200-family parts relationship / NOT exact base-calibre proof`.

The separation is now useful:

- **timekeeping-side parts** repeatedly cross-reference to AS1200-family material;
- **alarm-side parts** appear under a dedicated X31xx cluster.

This is exactly what would be expected from a modular architecture in a broad sense, but it does **not** identify the base movement by itself. Horlbeck / Beitl still state Longines-base, so `CONFLICT` remains.

### A24. NAWCC remains the best primary-document retrieval target, now with exact extra search keys

The NAWCC Technical Information Directory explicitly lists Wittnauer `Repair Bulletins`, `Pricelists`, calibre notebook material and a mainspring chart in Box W1.

Source:
- https://pubs.nawcc.org/images/stories/research/finding_aids/Technical_Info_Directory/Technical_Info_Directory.pdf

Classification: `ADOPTED archival-holdings fact / HIGH-VALUE retrieval target`.

Round-7 refinement: do not request only `10WA`. Search / request the material with the following key set:

`10WA`, `10 WA`, `1215`, `1216`, `1216A`, `X3154`, `X3155`, `X3156`, `X3158`, `X3159`, `X3160`, `X3164`, `X3165`, `X3167`, `X3168`, `X3170`, `alarm barrel`, `bezel`, `alarm setting`, `repair bulletin`.

If a period Wittnauer source maps even one or more X31xx numbers to 10WA, it can establish the provenance of the numbering system and may expose the complete module parts list.

## Track B — patent / CH304088A connection history

### B20. Patent-side evidence remains structurally strong; no new legal bridge surfaced in the checked web-accessible records

Re-checked accessible records continue to show:

- `CH304088A`: inventor / original assignee `Bliss Marcel`, filed 1952-12-04, published 1954-12-31;
- `CH332208A`: inventor / original assignee `Bliss Marcel`, filed 1957-12-09, published 1958-08-31;
- no Wittnauer party in the accessible Google bibliographic record.

Sources:
- https://patents.google.com/patent/CH304088A/en
- https://patents.google.com/patent/CH332208A/en

Classification: `ADOPTED bibliographic facts / OPEN legal-commercial bridge`.

No upgrade is made to licence, assignment, same-person Busga identity, or design authorship.

### B21. The patent-to-production comparison can now be tied to a named production barrel target

CH304088A explicitly says that a slipping bridle would preserve freedom to change the alarm setting even when the alarm spring is fully wound. Surviving 10WA documentation instead describes a hard full-wind limit with tooth-damage risk if the bezel is forced.

With the surviving parts listings identifying the 10WA alarm barrel as `7182 / X3154`, the unresolved comparison is now concrete:

- **patent concept:** slipping-bride option;
- **production target:** alarm barrel `X3154`;
- **required evidence:** service drawing, barrel teardown, parts illustration, or period repair instruction showing how `X3154` actually anchors the mainspring.

Classification: `OPEN production implementation`.

This is a sharper route than continuing to infer from whole-watch behavior alone.

### B22. Busga / Marcel Bliss remains a targeted identity hypothesis, not a conclusion

Secondary Busga history places `Marcel Bliss of Zurich` at Montres Busga with power of attorney in 1959. Google-indexed patent data show another watch patent under the name `Bliss Marcel` in 1957, while Busga itself appears as assignee on CH323379A (filed 1955, published 1957).

Sources:
- https://wiki.grail-watch.com/index.php/Busga
- https://patents.google.com/patent/CH332208A/en

Classification: `HOLD — identity hypothesis`.

No primary address / representative / commercial-register bridge was obtained in this round. The hypothesis remains testable but unproven.

## Round 7 synthesis

The most useful advance is not a new narrative claim but a **new technical search key**.

The 10WA alarm module can now be pursued through a compact family of part identifiers centered on `X3154–X3170`. This materially improves the odds of finding the correct period repair / parts document because archive OCR may omit `10WA` while retaining part numbers.

The base-movement problem remains a deliberate split:

- AS1200-family relationship: increasingly strong across multiple interchangeable timekeeping-side parts;
- Longines-base attribution: explicitly stated by Horlbeck / Beitl;
- period manufacturer bridge: still missing.

Therefore status remains `CONFLICT`, not resolved by source count.

The patent problem is similarly narrowed:

- CH304088A already contains a solution to the full-wind setting conflict;
- production behavior suggests the surviving 10WA does not function as though that solution were present;
- `X3154` is now the exact production barrel identifier to target for direct construction evidence.

## Next fixed moves

### Track A

1. Search / retrieve NAWCC Wittnauer technical material using both calibre/reference and X31xx part-number keys.
2. Identify the provenance of the `X31xx` numbering system from a period catalogue rather than a seller description.
3. Find a period service / parts page that explicitly maps 10WA to its timekeeping base.
4. Continue dated 1953–1956 price-list / dealer-catalogue hunting to resolve overlap between 10WA and early AS-powered Wittnauer alarms.

### Track B

1. Find a service drawing or teardown of `X3154` and determine fixed vs slipping bridle directly.
2. Obtain historical Swiss register / gazette data for CH304088A / CH332208A.
3. Obtain original CH323379A bibliographic details and compare applicant / representative data against the Bliss patents.
4. Keep Busga identity at HOLD until a primary same-person bridge exists.

## Stop rules unchanged

- No main merge.
- No `CH304088A = Wittnauer patent` assertion without a bridge.
- No `fragility caused discontinuation` assertion without period commercial / service evidence.
- No Longines-vs-AS1200 resolution by secondary-source majority.
- No provenance claim for `X31xx` numbering until a period technical source is found.
