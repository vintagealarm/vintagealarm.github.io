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

### ADOPTED — Time-O-Vox商標の一次資料上の年代

- 1950-08-19付『Schweizerisches Handelsamtsblatt』p.2161に、Cyma Watch Co. S.A.（La Chaux-de-Fonds）による `TIME-O-VOX` の商標登録公告を確認した。
- 登録番号は `134604`、出願日時は1950-07-20 12:00。対象は時計・時計部品・ケース・ブレスレット・時計鎖・宝飾品・時刻表示物、およびその広告・宣伝物。
- 同じ出願日時・権利者で `CYMA VOX` (`134600`)、`MULTI VOX` (`134601`)、`ROTO VOX` (`134602`)、`SUPER VOX` (`134603`)、`ULTRA VOX` (`134605`) も連続して公告されている。
- 1971-03-29付同紙p.738では、`TIME-O-VOX` を含む上記商標群が「1950年7月登録、1971-02-24に非更新のため抹消」として掲載されている。
- この資料から採用するのは商標の出願日・登録番号・対象商品・非更新抹消日まで。製品の発売開始日、Cal. R.464の採用開始日、生産終了日を商標公告だけから推定しない。

### ADOPTED — 1945年Cymaアラーム広告

- 1945年の *Actes de la Société jurassienne d'émulation* 広告欄に、卓上型Cymaアラームと `Une seule clef remonte à la fois mouvement et sonnerie.`（1本の鍵で時計機構とアラームを同時に巻き上げる）の広告を確認した。
- これはCymaが `TIME-O-VOX` 商標出願以前にアラーム時計を販売していた一次資料として採用する。
- 広告は製品名 `Time-O-Vox`、Cal. R.464、腕時計を示していないため、R.464の直接資料にはしない。

### ADOPTED — Georges BridevauxのTavannes在籍資料

- 1948-12-21付『Schweizerisches Handelsamtsblatt』p.3459は、Georges Bridevaux（Tavannes在住）に Tavannes Watch C° S.A. の代理権（`procuration`）が付与され、既登録の代理権保持者の一人との共同署名で会社を代表すると公告している。
- これにより少なくとも1948年末にはBridevauxがTavannes Watch Co.の公式な職務権限を持っていたことを採用する。
- この在籍資料だけを根拠に、BridevauxをCal. R.464全体の設計者とは断定しない。

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

追加確認した同一優先日・同一機構の国外公開：

- Publication: `GB782720A`, *Improvements in and relating to an alarum time-piece*
- Assignee: Tavannes Watch Co. S.A.
- Swiss priority: 1954-08-28
- GB filing: 1955-07-27
- Publication: 1957-09-11
- GB抄録は、hour wheelの軸方向移動、spring-pressed rigid lever、hammer release、alarm springの所定量展開後の停止を記載し、US2789410AのFig.1–3 / claimsと同じ構成を示す。

特許本文は、alarm wheel上に載るhour wheelの軸方向移動、return springを受けるrigid lever、hammerのrelease、alarm gearingの停止機構等を請求・説明する。

現時点の裁定：**TavannesによるR.464同時代の強い特許候補だが、`US2789410A = Cal. R.464採用特許`とはまだ断定しない。**

理由：

- 出願人、発明者の所属、年代、alarm time-pieceという対象はR.464研究と強く整合する。
- 一方、R.464実機/Humbert図版と特許Fig.1–3の部品対応を部品単位で照合し切っていない。
- 「Tavannesのアラーム特許である」ことと「R.464に実装された機構である」ことは別命題。
- US/GB双方の公開データは1954-08-28のSwiss priorityを示すが、公開済みのCH番号は確認できなかった。Google Patents上の `CH2789410X` / `CH782720X` はpriority参照として表示されるものの、公的なCH公開番号として独立検証できないため、スイス公開番号として採用しない。
- US特許図と現有R.464写真を再照合した。特許図は文字盤側のhour/alarm wheel・release lever・cam・hammer周辺を示す一方、鮮明な実機写真は主に輪列側で、文字盤側写真も分解途中の部分観察に留まる。機能の整合性はあるが、部品単位の同一性は確定できないため `HOLD` を維持する。

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
7. US2789410A / GB782720Aが優先権を主張する1954-08-28 Swiss applicationの原出願記録、公開有無、公開済みの場合はCH番号を特定できるか。
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
- `GB782720A`, Tavannes Watch Co. S.A., *Improvements in and relating to an alarum time-piece*. 1954-08-28 Swiss priorityを共有する同一機構の国外公開として採用。公開済みCH番号は未特定。
- 『Schweizerisches Handelsamtsblatt』68 (1950), p.2161, [E-Periodica PID `sha-001:1950:68::2357`](https://www.e-periodica.ch/digbib/view?pid=sha-001%3A1950%3A68%3A%3A2357) — `TIME-O-VOX` No.134604ほかCyma Vox系列の商標登録公告。
- 『Schweizerisches Handelsamtsblatt』89 (1971), p.738, [E-Periodica PID `sha-001:1971:89::814`](https://www.e-periodica.ch/digbib/view?pid=sha-001%3A1971%3A89%3A%3A814) — `TIME-O-VOX` No.134604ほかの非更新抹消公告。
- 『Schweizerisches Handelsamtsblatt』66 (1948), p.3459, [E-Periodica PID `sha-001:1948:66::3761`](https://www.e-periodica.ch/digbib/view?pid=sha-001%3A1948%3A66%3A%3A3761) — Georges BridevauxへのTavannes Watch C° S.A.の代理権付与。
- 『Schweizerisches Handelsamtsblatt』77 (1959), p.984, [E-Periodica PID `sha-001:1959:77::1070`](https://www.e-periodica.ch/digbib/view?pid=sha-001%3A1959%3A77%3A%3A1070) — Bridevaux発明の `Compteur de temps` 追加特許337149 / 337150。権利者Georges Bürgin、主特許324272でありR.464系譜への接続は `HOLD`。
- *Actes de la Société jurassienne d'émulation* 49 (1945), 広告欄, [E-Periodica PID `asj-006:1945:49::395`](https://www.e-periodica.ch/digbib/view?pid=asj-006%3A1945%3A49%3A%3A395) — 1本の鍵で時計機構とアラームを同時巻上げするCyma卓上アラーム広告。
- Neuchâtel archive reply: 1954–1958 BT registers checked; No.489 correspondence not identified; Cyma/A. Racine records exist from 1956; `Bulletin: La Chaux-de-Fonds` noted.
- MIH reply: no document directly tied to this model was found in its search; Cyma library file contains a reference to certificates for gold alarm watches.

## Publication safety / wording rules

Safe:

- 「Time-O-VoxにはChronomètre仕様が存在した」
- 「No.489に対応する観測所記録は、現在確認した資料からは特定できていない」
- 「US2789410AはTavannes Watch Co. S.A.に譲渡された1954年優先日のalarm time-piece特許で、R.464との対応を検証中」
- 「観測個体では文字盤表記と調整刻印が一様ではない」
- 「TIME-O-VOX商標は1950-07-20にCyma Watch Co. S.A.から出願され、登録番号134604として公告された」
- 「Georges Bridevauxは1948年末までにTavannes Watch Co. S.A.の共同署名による代理権保持者として登記されていた」

Do not state yet:

- 「No.489はNeuchâtel Observatory認定個体である」
- 「No.489は観測所試験を受けていない」
- 「US2789410AはR.464の特許である」
- 「UNADJUSTED個体は実際には調整済みだった」
- 「1283 / 1261はメーカー公式refである」
- 「1950年の商標出願日がTime-O-Vox / R.464の発売開始日である」
- 「1945年のCyma卓上アラームがCal. R.464である」
- 「GB782720A / US2789410AのSwiss priority参照文字列がスイス公開特許番号である」

## Research log

### 2026-09-27 — E-Periodica全文探索 / 商標・Bridevaux・特許追跡

- E-Periodicaで `Time-O-Vox` 完全一致、`Humbert Cyma`、`Georges Bridevaux`、`Arnold Racine`、`Cyma Tavannes`、`Cyma chronomètre`、`Cyma chronométrie`、`Cyma observatoire`、`Tavannes chronomètre` 等を検索した。
- Humbert既知記事は再発見できなかった。`Humbert Cyma` は同一冊子・同一検索単位内の無関係語共起が中心で、既知記事の掲載証拠とはしない。
- `Cyma chronomètre` / `Cyma observatoire` / `Tavannes chronomètre` では、Zenith・Longines等のchronomètre / observatoire広告とCyma広告が同一広告単位に含まれる偽陽性を確認した。これらをCymaの観測所実績・Chronomètre証拠として採用しない。
- 1950年の `TIME-O-VOX` 商標原登録公告（No.134604）と1971年の非更新抹消公告を発見・照合した。
- 1945年のCyma卓上アラーム広告を発見した。Time-O-Vox / R.464の直接資料ではなく、Cymaアラーム製品史の先行資料として採用した。
- 1948年の商業登記でGeorges BridevauxへのTavannes Watch C° S.A.の共同署名による代理権付与を確認した。
- 1959年の特許公告でBridevaux発明の `Compteur de temps` 追加特許337149 / 337150（主特許324272、権利者Georges Bürgin）を確認した。Tavannes Watch Co. / R.464との接続は確認できないため `HOLD`。
- US2789410Aと同じSwiss priority日・同じ機構を示すGB782720Aを確認した。公開データ上でCH公開番号は確定できず、R.464実機との部品単位照合も未完了のため、特許候補の裁定は `HOLD` を維持した。
- 該当E-Periodicaページ画像5点とUS2789410A PDFをローカル成果物として保存した。著作権表示のあるスキャン画像は公開リポジトリへ追加せず、Ledgerには書誌・PID・判断だけを記録した。
- Chronomètre完成ページ、公開WATCH本文、観測個体データは変更していない。

### 2026-09-27 — Ledger creation / patent candidate registration

- GitHub `main` の `PROJECT_STATE.md`、現行Chronomètre research data、既存Wittnauer ledgerの運用を確認。
- Project spreadsheetを全9シート列挙し、関係シートを横断。貼付画像数も確認し、観測個体表のMovement No./刻印画像を実際に抽出・確認。
- No.489、1917、1932、1042、1058等の表記差を再確認。
- 外部照会ログとOCD表を再確認し、「未発見」と「不存在」を分離。
- 添付されたUS2789410A図面とGoogle Patents書誌・本文を照合。Bridevaux / Tavannes / 1954-08-28 priority / alarm time-pieceまでは確認。
- R.464との直接対応は未完了のため `HOLD` とした。
- 公開GitHubへは金銭フロー、修理費、返金・補償、業者との私信、個人情報を持ち込まないルールを明文化。
