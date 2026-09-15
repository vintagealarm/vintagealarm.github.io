# Wittnauer 10WA — Two-Track Research Plan

Status: active plan for `research/10wa-round2`.

## Purpose

今後の10WA調査は、次の**二正面を並行して進める**。

- **Track A — Wittnauer採用史 / 製品化史**
- **Track B — 特許史 / CH304088A接続史**

両者は最後に接続するが、証拠は混同しない。Track Bの特許一致だけでWittnauerの採用理由を断定せず、Track Aの製品史だけでCH304088Aの権利関係を推定しない。

---

## Track A — Wittnauer採用史 / 製品化史

### Main question

> Wittnauer / Longines-Wittnauerは、なぜCal.10WAで「回転ベゼルによるアラーム時刻設定 + 同時巻上げ」という独自解を採用し、どう製品化・販売・整備し、その後なぜ別方式へ移ったのか。

### Highest-value source targets

1. 10WA純正保証冊子 / 取扱説明書 / retailer instruction / service booklet
2. Wittnauer parts catalogue / Longines-Wittnauer service bulletin / repair instruction
3. 1953–1957 Wittnauer / Longines-Wittnauer 広告・カタログ・価格表
4. Longines-Wittnauer Information Bulletin
5. 輸入・組立・調達・部品供給記録
6. dealer / watchmaker向け注意書き、保証修理・クレーム記録
7. 後続AS 1475等への切替時期を示す当時資料

### Why guarantee / instruction material is now first

純正保証冊子・取説は、広告より地味だが次の情報を同時に持つ可能性がある。

- `PAT.` / `PATENTED` 表記
- 操作手順
- 巻上げ限界 / 注意書き
- 修理送付先 / service address
- 販売会社・法人名
- 印刷コード / 改訂番号 / edition difference
- reference / model notation

印刷コードや版違いが取れれば、Ref.1215 / 1216 の販売時期を広告以外から絞れる可能性がある。

### Factors to test separately

- 完全新規アラームキャリバー開発を避けるモジュール経済性
- `set + wind` 一体化による操作簡略化
- ベゼル操作による外観・操作上の差別化
- 米国アラーム市場（Cricket / Memovox等）への対応
- 1954年前後の量産ASアラームエボーシュ登場
- **after-sales / parts-supply economics** — 専用部品、整備手順、保証、教育、在庫負担
- 製造コスト / 供給 / 整備性 / 保証負担
- 操作ミス・破損リスク
- 市場受容 / 販売期間 / discontinued timing
- Longines-Wittnauer内部の調達・販売・サービス判断

### Current caution

`10WAは壊れやすかったからASへ移った`、`Memovox対抗で開発した`、`コスト削減が目的だった` は、現時点ではいずれも因果未証明。要因候補として追う。

特に、

`AS 1475 appeared -> 10WA became uneconomic -> Wittnauer abandoned 10WA -> Wittnauer adopted AS`

という一直線の物語は禁止。現時点で確実なのは、10WAと初期AS 1475時代が近接し、Wittnauerが後にAS系を採用したことまで。

### AS 1475 chronology discipline

`1954年に誕生` を一つの出来事として扱わない。

最低限分ける:

- design completion
- patent / legal filing if any
- production start
- trade / Basel presentation
- earliest customer adoption
- retail availability
- large-scale circulation

研究上の問いは、

> **WittnauerにとってAS 1475が現実的な調達選択肢になったのはいつか。**

ここが確定するまで、AS 1475は `ADOPTED chronology / HOLD causal interpretation`。

---

## Track B — 特許史 / CH304088A接続史

### Main question

> Marcel Bliss名義のCH304088Aと、量産されたWittnauer Cal.10WAの間に、法的・技術的・商業的な直接接続は存在するか。

### Confirmed patent facts

- `CH304088A`
- applicant / inventor shown in checked record: Marcel Bliss
- **filing:** 1952-12-04
- **publication:** 1954-12-31
- **grant / registration / legal-effect date:** `OPEN` — publicationと同一視しない
- alarm mechanism is mounted dial-side, outside the base movement, on its own plate
- rotating bezel / glass drives an internal toothed ring
- bezel rotation winds the alarm barrel
- the same bezel action can simultaneously drive alarm-time setting
- the specification explicitly states the user benefit: alarm winding need not be separately attended to because winding occurs during alarm-time setting
- the patent claim set includes dependent implementations covering bezel winding, simultaneous alarm setting, rotating-part index, and slipping bridle
- checked patent-family data currently show only the Swiss family publication; this does not prove absence of licence / assignment / foreign filing
- the patent record itself does not name Wittnauer

### CLAIM / DESCRIPTION / PRODUCTION must remain separate

Use `WITTNAUER_10WA_CH304088_CLAIM_CHART.md` as the working comparison.

Three distinct questions:

1. **CLAIM:** was the feature actually claimed / sub-claimed?
2. **DESCRIPTION:** was it merely described as an example or benefit?
3. **PRODUCTION:** does a surviving 10WA implement it?

Example: slipping bridle is present as a dependent **sub-claim**, not merely casual narrative text. However, this does not mean every implementation of the patent must contain it, and production 10WA barrel construction remains directly unverified.

### Highest-value bridge evidence

1. patent assignment / licence register
2. Swiss patent gazette / historical register annotations
3. Wittnauer / Longines-Wittnauer correspondence naming Bliss or the patent
4. patent notice in 10WA advertising / manual / case / service literature
5. technical drawing or parts sheet reproducing distinctive CH304088A architecture
6. inventor / designer credit in trade press
7. commercial agreement, royalty, import, supplier, or manufacturing record
8. contemporary source linking Bliss to a supplier that worked with Wittnauer

### Chain-of-title scope

Google Patents is discovery evidence, not final proof for 1950s Swiss legal history.

Continue with:

- Swiss historical patent register / official gazette
- assignment / ownership annotations
- representative / attorney / address data
- inventor-name variants (`Marcel Bliss`, `Bliss Marcel`, initials, address variants)
- Espacenet / DOCDB
- foreign equivalents / applications not cleanly indexed in Google
- later Bliss patents for employer / representative / address clues

Do **not** write `no foreign family existed` solely because Google currently shows Switzerland only.

### Technical implementation questions

- Does production 10WA use fixed bridle, slipping bridle, or another alarm-barrel arrangement?
- Which production parts create the full-wind stop / tooth-damage risk described by Horlbeck?
- Which CH304088A main / sub-claims are reproduced in the 10WA and which are not?
- Is the case/bezel retention architecture also materially the same, or only the high-level set+winding concept?

### Current legal/editorial boundary

Safe:

> CH304088A describes and claims an architecture that corresponds very closely in several core features to the documented operating structure of Cal.10WA, while some dependent implementation details differ.

Not yet safe:

- `CH304088A is the Wittnauer 10WA patent`
- `Wittnauer licensed CH304088A`
- `Marcel Bliss designed the 10WA for Wittnauer`
- `Wittnauer deliberately omitted the slipping-bride solution`

---

## Competing relationship hypotheses — keep all live

Do not let structural similarity silently select the conclusion.

### A — licence / acquisition / authorized use

Bliss’s concept or rights reached Wittnauer / Longines-Wittnauer and the production watch was modified.

### B — technical contact without proven patent-rights chain

There was some technical / supplier / designer / prototype contact, but the legal relationship is indirect or undocumented.

### C — independent convergence

Bliss and Wittnauer independently arrived at similar solutions to the same design problem.

Research rule:

> Search for evidence capable of **eliminating** A, B, or C — not only evidence that makes A feel attractive.

Failure to find a direct bridge after strong searching is itself a valid research result, but absence must not be overstated beyond the archives actually checked.

---

## Where the two tracks meet

The two tracks should only be joined when a source supports the bridge.

Desired causal chain:

1. **Patent / concept origin** — who conceived the architecture and what problem it was meant to solve
2. **Rights / technology transfer** — how, if at all, Wittnauer obtained access to it
3. **Wittnauer production choice** — how the concept was implemented in Cal.10WA
4. **User / service consequences** — what constraints or failure modes resulted
5. **Commercial outcome** — how long it lasted and how it was received / serviced
6. **Successor decision** — why Wittnauer later adopted other alarm calibres

A source proving one step does not automatically prove the next.

## Parallel-search rule

Each research round should try to produce at least one advance on each track:

- Track A: one new Wittnauer-side source, date, implementation fact, or commercial factor
- Track B: one new patent/legal/source-provenance fact, bridge lead, or implementation comparison

If one track stalls, do not fill the gap with inference. Preserve `OPEN / HOLD / CONFLICT` and keep the other track moving.

## Next-round priority order

Current fixed order:

1. **10WA純正保証冊子 / 取説の原本画像確保**
2. **CH304088A claim chartを完成・更新**
3. **Bliss / CH304088Aのchain of title・外国対応特許を再検索**
4. **10WA純正 parts / service documentation**
5. **Ref.1215 / 1216 の当時広告・dealer material**

AS1200 vs Longines baseは、純正parts/service資料が出るまでは無理にWeb多数決で進めない。

## Completion condition for a strong Deep Dive

A strong article does not require every unknown to be solved. It requires:

- verified production behavior of 10WA,
- verified patent content and dates,
- claim / description / production-implementation distinction,
- explicit separation of patent similarity from legal identity,
- Wittnauer-side evidence for at least part of the adoption / sales / service story,
- documented conflict where the base movement or corporate story remains unresolved,
- explicit A/B/C relationship hypotheses where no bridge is proven,
- a clear statement of what is still unknown and what evidence would resolve it.

A valid final research result may therefore be:

> **極めて高い構造的一致は確認できるが、WittnauerとMarcel Bliss / CH304088Aを結ぶ技術移転・権利移転資料は未発見。**

無理に物語を完成させない。
