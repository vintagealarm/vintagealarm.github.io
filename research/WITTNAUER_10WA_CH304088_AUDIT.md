# Wittnauer 10WA — CH304088A patent audit

Status: working research note for `research/10wa-round2`. This file supplements `WITTNAUER_10WA_LEDGER.md`; it does not replace the main ledger.

## Verified primary source

### CH304088A — Marcel Bliss

- Swiss patent publication: `CH304088A`.
- Inventor / original assignee shown in the patent record: Marcel Bliss.
- Filing / priority date: 1952-12-04.
- Publication date: 1954-12-31.
- The patent itself does **not** name Wittnauer.

The text describes an alarm mechanism mounted outside the base movement, between the movement plate and dial, on its own plate. It describes an alarm barrel and a rotating bezel carrying an internal toothed ring.

The bezel arrangement is described as capable of:

1. winding the alarm barrel by rotating the bezel, and
2. simultaneously driving the alarm-time setting train.

This is a very close structural match to the independently documented operating architecture of Wittnauer Cal.10WA: dial-side alarm module + dedicated alarm barrel + bezel-based alarm winding and alarm-time setting.

### Important detail: slipping bridle option

The patent further states that, if the alarm barrel uses a slipping-bride / slipping-bridle spring arrangement, freedom to change the alarm setting can be retained even when the spring is fully wound.

This matters because Horlbeck describes the production 10WA as reaching maximum alarm wind at roughly 1.5 bezel turns and warns that forcing further rotation can damage transmission teeth. Therefore:

- the patent author explicitly recognized the conflict between combined `set + wind` operation and full-wind setting freedom;
- the patent proposes a technical way to avoid that conflict;
- the currently documented 10WA operating behavior does not appear to provide that same full-wind freedom.

This comparison is evidence for a design trade-off, but it is **not** evidence that Wittnauer deliberately omitted the patent's slipping-brindle option for cost, reliability, packaging, or any other specific reason.

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

## FHF research note

User-provided screenshot of FHF (@FHF_Ebauche), dated 2024-08-09 / 2024-08-10, states that:

- Cal.10WA uses the bezel to set the alarm time while winding the alarm mainspring;
- the account associated the construction with a 1954 patent;
- the account describes a patent-first research path: unusual patent found first, then a matching surviving watch was sought;
- in follow-up, the account states the base movement is A. Schild Cal.1200 and posts an identification image headed `A SCHILD 1200 / WITT 11P`.

Use FHF as a research-path / secondary-source attribution, not as the sole proof of the patent or base calibre. The patent mechanism has now been independently checked against CH304088A.

## Base movement conflict

The FHF screenshot strengthens the AS1200 side of the existing conflict but does not resolve it.

Current evidence remains:

- Horlbeck / Beitl: Longines-base description.
- AWI / parts evidence: Wittnauer 10S = AS1200 and multiple AS1200-family parts cross-reference to Wittnauer 10WA.
- Time Connection / Bestfit-derived listing: factory no. `445/AS 1200` set bridge lists `WITTNAUER 10WA` among compatible calibres.
- User screenshot: identification image `A SCHILD 1200 / WITT 11P` and FHF's statement that the 10WA base is AS1200.

Still missing: a period or manufacturer source directly stating `Wittnauer 10WA = AS 1200 + alarm module`.

## Research priority

1. Trace assignment / licence / ownership history of CH304088A.
2. Identify Marcel Bliss's commercial relationship, if any, to Wittnauer / Longines-Wittnauer.
3. Find period Wittnauer / Bestfit / Paulson / service documentation directly linking 10WA to AS1200 or 11P.
4. Identify the exact bibliographic source / edition / page of the `A SCHILD 1200 / WITT 11P` image shown in the FHF post.
5. Preserve the Longines-base vs AS1200-base conflict until direct bridge evidence appears.

## Editorial consequence

CH304088A makes the `combined operation -> self-imposed constraint` story substantially stronger, but the respectful framing remains essential.

The patent itself shows an intentionally sophisticated attempt to integrate alarm winding and alarm-time setting into one external control. It even anticipates the full-wind setting problem and describes a possible slipping-bride solution. Therefore the design should not be reduced to `bad / stupid / fragile`.

A more accurate research framing is:

> A highly integrated control concept solved two user tasks with one bezel, while creating a coupling between setting freedom and stored alarm energy in the production behavior documented for the 10WA.
