# Cyma Time-O-Vox / Cal. R.464 — Research & Decision Ledger

このファイルは、Cyma Time-O-Vox / Cal. R.464、とくに Chronomètre 個体群・観測所記録・機構・特許候補の調査判断を固定管理する公開用正本。
新資料が出た場合は既存結論を無言で上書きせず、根拠・確度・変更理由を追記する。

> PUBLIC-SAFE RULE: プロジェクト内の非公開資料は研究証拠として参照してよいが、購入金額、返金・補償、修理費、業者・修理士との私信全文、住所・電話番号その他の個人情報はこの公開リポジトリへ転記しない。必要な場合も「販売時資料」「整備時観察」等に抽象化する。

## Mandatory preflight

Cyma / R.464 / Chronomètre / No.489 を調査・執筆・実装する前に、必ず次を確認する。

1. GitHub `main` の最新 `PROJECT_STATE.md` / `SITE_RULES.md` / `src/data/cyma-chronometre-research.json` / 対象WATCH実装
2. Project spreadsheet `Cyma Time-o-vox 18k クロノメーター.xlsx`。セルだけでなく貼付画像も確認する
3. Project PDF / image: Humbert R.464技術記事、Horlbeck *The Alarm Wristwatch*、Beitl *Alarm am Arm*、MIH共有資料、Pritchard、米国上院公聴会抜粋、No.489実機写真
4. 外部照会記録：MIH / Neuchâtel州立公文書館等。機関回答と専門家推論を分離する
5. 一次資料：観測所台帳・Bulletin、特許、当時広告、メーカー資料、業界誌
6. 市場・修理記事・SNS等は比較個体の観測に使用し、一次資料と同格にしない

## Evidence classes

- `ADOPTED`：公開本文・研究ページへ使用可
- `HOLD`：有力だが未確定。採用条件を保持
- `CONFLICT`：資料・個体間で衝突。無理に統一しない
- `REJECTED`：現状不採用。新証拠なしで復活させない
- `OBSOLETE`：後続証拠で失効した旧判断
- `OPEN`：未解決。追加調査対象

## Current decisions

### ADOPTED — R.464 / Time-O-Vox

- Cal. R.464 は単一香箱から時計輪列とアラーム輪列を駆動する。
- 2時・4時のプッシャーは連動し、中央位置・上側押込・下側押込の3位置で機能を切り替える。
- Humbertの技術記事はアラーム時刻設定について巻真を「一方または他方の方向」に回すと記述する。Horlbeckも双方向設定可能な構造として説明する。
- したがって「R.464は構造上、反時計回りにしかアラーム設定できない」という一般化は採用しない。
- 販売時資料に反時計回り設定を推奨する記述が存在するが、これはR.464技術資料の双方向仕様と区別して保持する。

### ADOPTED — Chronomètre仕様の存在

- Time-O-VoxにChronomètre仕様が存在したこと自体は採用する。
- HorlbeckはChronomètre certificateを伴うvariantと、5姿勢・温度試験を記述する。
- Beitlは金製モデルのChronometer仕様を記述し、文字盤・ムーブメントの表記が異なる複数例を掲載する。
- MIH共有資料には金製Time-O-Voxへのクロノメーター証明に関する記述がある。
- ただし上記は「現存する特定個体No.489が特定の観測所試験を通過した」ことの証明とは分離する。

### ADOPTED — 観測個体群

プロジェクト観測個体表では、公開ページ用にMovement No.を番号帯へマスキングしている。研究時は元表・貼付画像を参照する。

重要な比較点：

- No.489：18YG、文字盤 `CHRONOMETRE`、R.464、ケース主番号 `8 6525`。現物ムーブメント画像ではMovement No.489を確認できる一方、`ADJUSTED TO FIVE POSITION(S) AND TEMPERATURE` の刻印は見当たらない。
- No.1917：18YG、ケース `8 6525`、文字盤Chronomètre表記なし、ムーブメントに `ADJUSTED TO FIVE POSITION(S) AND TEMPERATURE`。
- No.1932：YG、文字盤 `CHRONOMETRE`、ムーブメントに `ADJUSTED TO FIVE POSITION(S) AND TEMPERATURE`。
- No.1042：YG、文字盤Chronomètre表記なし、ムーブメントに `UNADJUSTED`。
- No.1058：YG、文字盤 `CHRONOMETRE`、ムーブメントに `ADJUSTED TO FIVE POSITION(S) AND TEMPERATURE`。
- SS群には `2 6526` が複数確認される一方、販売者ref. `1283` / `1261` とケース内番号の対応は単純ではない。
- 観測個体表の貼付画像は番号・刻印・ケース形状を検証する一次観察資料として扱い、セル文字列だけで結論を出さない。

### CONFLICT — Chronomètre表記と調整刻印

- `CHRONOMETRE`文字盤 + 5姿勢/温度調整刻印の個体がある。
- `CHRONOMETRE`文字盤 + 同調整刻印が見当たらないNo.489がある。
- Chronomètre文字盤なし + 5姿勢/温度調整刻印の個体がある。
- 金色ケース + `UNADJUSTED` の個体もある。
- よって文字盤表記、ケース素材、調整刻印、ケースコード、seller ref.を一対一対応させない。

### ADOPTED — Observatory / archive

- Neuchâtel州立公文書館は、1954–1958年のBT register 8冊を確認したが、提示されたNo.489に対応する試験を特定できなかった。
- これは「No.489が観測所試験を受けていない」という確定否定ではなく、「指定範囲の当該BT台帳では対応記録を特定できなかった」と表現する。
- 同回答では1956年以降に `Cyma Watch Co SA, Le Locle` / 調整者 Arnold Racine の試験記録群が存在するとされた。
- 台帳上の `Bulletin: La Chaux-de-Fonds` 注記から別Bulletin探索が必要。これをNo.489との対応証明とは扱わない。
- プロジェクトOCD表でも1956–1962年にCyma Watch Co S.A., Le Locle / A. Racineの複数記録を確認しているが、No.489との直接対応は未確認。

### HOLD — US2789410A / Georges Bridevaux

確認済み書誌情報：

- Publication: `US2789410A`, *Alarm time-piece*
- Inventor: Georges Bridevaux
- Assignee: Tavannes Watch Co. S.A.
- Swiss priority: 1954-08-28
- US filing: 1955-07-29
- Publication: 1957-04-23

特許本文は、alarm wheel上に載るhour wheelの軸方向移動、return springを受けるrigid lever、hammerのrelease、alarm gearingの停止機構等を請求・説明する。

現時点の裁定：**TavannesによるR.464同時代の強い特許候補だが、`US2789410A = Cal. R.464採用特許`とはまだ断定しない。**

理由：

- 出願人、発明者の所属、年代、alarm time-pieceという対象はR.464研究と強く整合する。
- 一方、R.464実機/Humbert図版と特許Fig.1–3の部品対応を部品単位で照合し切っていない。
- 「Tavannesのアラーム特許である」ことと「R.464に実装された機構である」ことは別命題。

ADOPTEDへ昇格する条件：

1. Swiss priority application / 同族特許を特定する。
2. HumbertのR.464図版・部品記号とUS2789410A Fig.1–3 / claimsを機能単位で照合する。
3. No.489実機写真で外観から確認可能な対応部位を照合する。
4. 当時のTavannes/Cyma技術記事・広告・特許紹介欄にR.464との接続記述がないか確認する。

### CONFLICT — UNADJUSTED刻印の意味

- 1956年米国上院公聴会資料では、スイス時計の調整実態と米国向け `unadjusted` 表示の乖離が問題化し、PritchardのTavannes項目にも関連記述がある。
- したがってR.464の `UNADJUSTED` 刻印だけから、実際に未調整だったと断定しない。
- ただし、この制度背景だけを根拠に個別R.464が実際には調整済みだったとも断定しない。

## Open research questions — priority order

1. No.489に対応するChronomètre試験・証明記録は存在するか。
2. `Bulletin: La Chaux-de-Fonds` の実体と、1954–1958年前後のCyma/Tavannes掲載記録。
3. MIH資料にある「金製アラームウォッチへの証明書」の原資料・制度・対象範囲。
4. Chronomètre文字盤、5姿勢/温度調整刻印、ケース `8 6525`、Movement No.帯の関係。
5. No.489 / 1042 / 1058 / 1917 / 1932等の系列・年代順を安全に説明できるか。
6. seller ref. `1283` / `1261` と、ケース主番号・ケース下段番号の関係。販売者refとメーカーrefを混同しない。
7. US2789410AのSwiss priority application / patent familyの特定。
8. US2789410AのFig.1–3 / claimsとR.464のHumbert図・実機の部品対応。
9. Georges BridevauxのTavannes在籍期の他特許から、R.464開発系譜を復元できるか。
10. 1954–1958年の `Journal Suisse d'Horlogerie` / `Revue internationale de l'horlogerie` / E-Periodica等で、Bridevaux / Tavannes / Cyma / Time-O-Vox / R.464 / chronomètre / observatoire / réveil を横断探索する。

## Search matrix for E-Periodica / archive work

### Names / companies

- `Cyma`, `CYMA WATCH CO`, `Cyma Watch Co. S.A.`, `Tavannes`, `Tavannes Watch Co`, `Georges Bridevaux`, `Bridevaux`, `Arnold Racine`, `A. Racine`

### Model / caliber / numbers

- `Time-O-Vox`, `Time O Vox`, `Timeovox`, `R.464`, `Cal. 464`, `calibre 464`, `No.489`, `8 6525`, `2 6526`, `1283`, `1261`

### French / German / English concepts

- `chronomètre`, `chronometer`, `chronométrie`, `observatoire`, `bulletin`, `La Chaux-de-Fonds`, `Neuchâtel`
- `réveil`, `montre-réveil`, `montre réveil`, `Weckeruhr`, `Armbandwecker`, `alarm watch`, `alarm time-piece`
- `réglé`, `ajusté`, `positions`, `température`, `adjusted`, `unadjusted`, `regleur`, `régleur`

### Patent trail

- `US2789410`, `2,789,410`, `Georges Bridevaux`, `Tavannes Watch Co`, `alarm time-piece`, plus Swiss priority date `28.08.1954`

## Evidence source register

### Project sources

- `Cyma Time-o-vox 18k クロノメーター.xlsx` — 関係シート横断。特に観測個体表、外部照会ログ、OCD、関税資料。貼付画像を含む。
- B. Humbert, `KALIBER: TIME-O-VOX (CYMA - Tavannes Watch Co. A.G.) Nr. 464` technical article.
- Michael Philip Horlbeck, *The Alarm Wristwatch* — Cyma / Cal.464 section.
- Leonhard Beitl, *Alarm am Arm* — Cyma pp.134–136周辺。
- MIH共有資料 `D_7938.pdf` / Pritchard抜粋。
- U.S. Senate Committee on Government Operations, *Swiss Watches—Adjustments* hearings excerpt.
- No.489 movement / caseback / dial photographs.

### Primary / archive / patent

- `US2789410A`, Georges Bridevaux, Tavannes Watch Co. S.A., *Alarm time-piece*. HOLD as R.464 correspondence pending mechanical cross-check.
- Neuchâtel archive reply: 1954–1958 BT registers checked; No.489 correspondence not identified; Cyma/A. Racine records exist from 1956; `Bulletin: La Chaux-de-Fonds` noted.
- MIH reply: no document directly tied to this model was found in its search; Cyma library file contains a reference to certificates for gold alarm watches.

## Publication safety / wording rules

Safe:

- 「Time-O-VoxにはChronomètre仕様が存在した」
- 「No.489に対応する観測所記録は、現在確認した資料からは特定できていない」
- 「US2789410AはTavannes Watch Co. S.A.に譲渡された1954年優先日のalarm time-piece特許で、R.464との対応を検証中」
- 「観測個体では文字盤表記と調整刻印が一様ではない」

Do not state yet:

- 「No.489はNeuchâtel Observatory認定個体である」
- 「No.489は観測所試験を受けていない」
- 「US2789410AはR.464の特許である」
- 「UNADJUSTED個体は実際には調整済みだった」
- 「1283 / 1261はメーカー公式refである」

## Research log

### 2026-09-27 — Ledger creation / patent candidate registration

- GitHub `main` の `PROJECT_STATE.md`、現行Chronomètre research data、既存Wittnauer ledgerの運用を確認。
- Project spreadsheetを全9シート列挙し、関係シートを横断。貼付画像数も確認し、観測個体表のMovement No./刻印画像を実際に抽出・確認。
- No.489、1917、1932、1042、1058等の表記差を再確認。
- 外部照会ログとOCD表を再確認し、「未発見」と「不存在」を分離。
- 添付されたUS2789410A図面とGoogle Patents書誌・本文を照合。Bridevaux / Tavannes / 1954-08-28 priority / alarm time-pieceまでは確認。
- R.464との直接対応は未完了のため `HOLD` とした。
- 公開GitHubへは金銭フロー、修理費、返金・補償、業者との私信、個人情報を持ち込まないルールを明文化。
