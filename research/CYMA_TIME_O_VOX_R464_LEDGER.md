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

### ADOPTED — CYMAVOX商標と1950年VOX群の法的名義

- `CYMAVOX` はTavannes Watch Co.が1943-11-15 11:00に出願した商標No.105784。1943-12-22付『Schweizerisches Handelsamtsblatt』p.2848の原公告で確認した。
- 1943年の指定商品は時計、時計部品、ケース、ブレスレット、時計鎖、宝飾品、時刻表示物、広告物等を広く含むが、`réveil` / alarmを明記していない。したがって、原公告だけから `CYMAVOX = アラーム商品名` とは断定しない。
- 1963-05-06、Tavannes Watch Co.は旧No.105784をNo.197724として更新し、指定商品を `Tous produits horlogers et de bijouterie` に変更した。1983-12-26に非更新で抹消された。
- 1948年にSchwöb Frères系の多数商標がCyma Watch Co. S.A.名義へ変更された一括公告にNo.105784は含まれず、1963年の更新名義もTavannes Watch Co.である。確認範囲では、CYMAVOXはTavannes側の商標ポートフォリオに残った。
- 一方、1950年の `CYMA VOX` から `ULTRAVOX` までの6件はCyma Watch Co. S.A.名義。両者を同一企業群内の名称構想として検討する余地はあるが、法的権利者を同一視しない。

### ADOPTED — 1948年のCyma関連法人・商標再編

- 1948-04-03の臨時総会で、La Chaux-de-FondsのSchwöb Frères et Cie S.A.は商号をCyma Watch Co. S.A.へ変更した。
- Tavannes所在の別法人 `Société des montres Cyma (Cyma Watch Co.)` は同日の臨時総会で解散を決議し、清算完了として登記抹消された。
- 旧Société des montres Cyma名義のNo.118570 `CYMA WATCH CO` は、1948-04-28に新Cyma Watch Co. S.A.へ個別移転された。Schwöb Frères名義の多数商標は1948-06-09にCyma Watch Co. S.A.への商号変更として一括処理された。
- したがって「Tavannes Watch Co.が1948年にCyma Watch Co.へ単純改称した」とは記述しない。確認できるのは、複数法人と商標権を整理した同日再編であり、合併・包括承継まで公告から補完しない。

### ADOPTED — 1950年以前のTavannesアラーム特許出願

- Tavannes Watch Co.は、CYMAVOX出願から53日後の1944-01-07に `CH243633A` *Montre-réveil* を出願した。単一香箱について、香箱胴から時計輪列、香箱真から打方を駆動する構成等を扱う。公開日は1946-07-31。
- 1949年には少なくとも次の3件のアラーム腕時計・音響構造特許を出願した。
  - `CH293737A` — 1949-05-12出願。腕への接触で音響膜の振動を妨げにくい腕時計ケース構造。
  - `CH290046A` — 1949-06-08出願。音響体、保護キャップ、音の伝播、防塵・防水を扱う。
  - `CH285202A` — 1949-08-19出願。音響膜と接触部材による音響構造を扱う。
- これらにより、Tavannesのアラーム技術開発は1954年Bridevaux出願から始まったのではなく、遅くとも1944年まで遡り、1949年には腕時計用音響構造を具体的に開発していたことを採用する。
- ただし1944年特許、1949年特許群、1945年卓上アラーム広告、Cal. R.464を同一製品・同一機構とは扱わない。1949年特許群は主に膜・裏蓋・ケース音響を扱う一方、R.464専門資料はムーブメント外周の音響ばねを大型ハンマーで叩く構造を示す。

### HOLD — CYMAVOXから1950年VOX群への名称計画の連続性

- 1943年CYMAVOX出願、53日後の1944年アラーム特許、1945年Cyma卓上アラーム広告、1949年の腕時計アラーム特許群、1950年のVOX商標6件という時系列は、名称計画とアラーム技術開発が並行していた仮説を強める。
- しかし、CYMAVOX原公告はアラームを明記せず、1944年・1949年特許本文にもCYMAVOX / Time-O-Vox名称は確認できない。法的名義も1943年はTavannes Watch Co.、1950年はCyma Watch Co. S.A.で分かれる。
- よって安全な表現は「VOX名称領域とアラーム技術開発が1950年以前に並行して存在した」。`CYMAVOXはアラーム商品名だった`、`1944年特許はCYMAVOXまたはR.464そのもの`、`1950年は既存CYMAVOX製品の単純改称`とはまだ書かない。

### OPEN — Time-O-Vox以外のVOX商標の実使用

- 1943–1965年の時計業界誌、既知のCyma広告、一般Web、オークションおよび販売記録を、空白・ハイフン・綴り違いを含めて横断したが、`CYMAVOX`、`CYMA VOX`、`MULTIVOX`、`ROTOVOX`、`SUPERVOX`、`ULTRAVOX`を実製品名として示す確実な個体・広告・カタログは確認できなかった。
- 製品写真と名称を伴う公刊資料として確認できたのは `Time-O-Vox` で、現確認範囲では1956年11月の *Revue internationale de l'horlogerie* p.32が明確な例である。
- 1953–1954年のCymaアラーム製品広告では、旅行用／卓上アラームに `Cyma-AMIC` が用いられ、上記VOX候補名は確認できない。
- この未発見結果は、1950年の6商標が候補名または防衛目的の一括確保だった仮説と整合する。しかし、未発見を未使用の確定証明とはせず、機能別の幻の製品ラインが存在したとも記述しない。

### REJECTED — `TIM-O-VOX`を1950年の第7スイス商標とする解釈

- 1950年原公告の同時出願群はNo.134600–134605の6件で、No.134604の原表記は `TIME·O·VOX`。次のNo.134606は別会社のベゴニア種子商標である。
- 1971年の非更新抹消公告も同じ6件だけを連続掲載する。
- よって、Mikroliskの独立した `TIM-O-VOX` 項目を第7の同日スイス商標とは採用しない。外国登録の別件が存在する可能性は未調査だが、少なくともスイス原公告の裏付けはない。

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

### HOLD — 「1950年にTime-O-VoxがChronomètre証明を取得」したという後年社史の年代

- MIH共有資料 `D_7938.pdf` は、2003年までの製品史を扱う後年のCyma社史パンフレットである。そのp.5は、1950年に金製アラーム腕時計 `Time-O-Vox` がChronomètre certificateを取得したと記す。
- これはメーカー由来の有力な回顧資料だが、証明書原本、試験番号、観測所名、ムーブメント番号を提示していない。したがって一次証明記録と同格には扱わない。
- Watch-WikiのCyma項目は、遅くとも2007-12-16版で同じ1950年説を掲載している。ただし、1943 / 1945 / 1950 / 1957 / 1960年代以降という出来事の並びと表現が `D_7938.pdf` の企業年表と近く、独立した証明資料を提示しない。2025年のSammler-Uhren記事も1950年説を反復するが、記事末尾の出典は `Watchwiki, AI` である。
- したがって、Web上で1950年説が複数回現れることを独立証拠の累積とは数えない。現状は、後年のCyma企業年表からWatch-Wiki等へ拡散した単一の出典系列である可能性が高い。
- 1956年11月の *Revue internationale de l'horlogerie* p.32では、`Time-O-Vox` の製品写真と名称を確認できる。これは遅くとも1956年に製品が公刊資料へ登場していた証拠だが、発売初年やChronomètre証明年を確定しない。
- 1950年の商標出願と後年社史の1950年証明記載が一致する可能性はあるが、現状は同年を相互補強させて確定事実にしない。La Chaux-de-Fonds側Bulletin、1950年前後の証明台帳、証明書原本または同時代広告で裏を取るまで `HOLD` とする。

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

### CONFLICT — R.464の鳴動時間と鳴動中のリューズ挙動

- B. Humbertの1963年R.464技術記事は、鳴動時間を8–10秒とする。また、アラーム作動中は巻上げ中間車が巻上げ角穴車から外れ、冠車・巻上げ小歯車・巻真は駆動されないと説明する。
- Horlbeck *The Alarm Wristwatch* pp.97–99は、同じCal. R.464の鳴動時間を6秒とし、巻真の切離しを採用していないため鳴動中にリューズが時計回りに回転すると説明する。
- 両記述は同時には成立しない。掲載個体ではタイミングホイールが約8秒作動する実機動画を確認しており、少なくともその個体はHumbertの時間記述と整合する。
- 現行WATCH本文はHumbertの同時代技術記事と掲載個体の観察に沿っているため、この衝突だけを理由に変更しない。Horlbeckの記述が誤記なのか、初期／後期または部品変更を伴うR.464変種を示すのかは未確認。
- 次の確認点は、複数R.464で鳴動中のリューズ挙動を動画観察すること、文字盤側の上側Wippe・巻上げ中間車と巻上げ角穴車の噛合いを分解写真で比較すること、Horlbeck掲載個体のMovement No.または由来を追うことである。

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

- Publication: `CH327800A`, *Pièce d'horlogerie à réveil*
- Assignee: Tavannes Watch Co. S.A.
- Swiss filing / priority: 1954-08-28
- Publication: 1958-02-15
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
- `CH327800A`を同じ1954-08-28出願のスイス公開として確認した。US / GB側に表示される `CH2789410X` / `CH782720X` のような参照文字列をスイス公開番号とは扱わない。
- US特許図と現有R.464写真を再照合した。特許図は文字盤側のhour/alarm wheel・release lever・cam・hammer周辺を示す一方、鮮明な実機写真は主に輪列側で、文字盤側写真も分解途中の部分観察に留まる。機能の整合性はあるが、部品単位の同一性は確定できないため `HOLD` を維持する。

ADOPTEDへ昇格する条件：

1. `CH327800A`、HumbertのR.464図版・部品記号、US2789410A Fig.1–3 / claimsを機能単位で照合する。
2. No.489実機写真で外観から確認可能な対応部位を照合する。
3. 当時のTavannes/Cyma技術記事・広告・特許紹介欄にR.464との接続記述がないか確認する。

### CONFLICT — UNADJUSTED刻印の意味

- 1956年米国上院公聴会資料では、スイス時計の調整実態と米国向け `unadjusted` 表示の乖離が問題化し、PritchardのTavannes項目にも関連記述がある。
- したがってR.464の `UNADJUSTED` 刻印だけから、実際に未調整だったと断定しない。
- ただし、この制度背景だけを根拠に個別R.464が実際には調整済みだったとも断定しない。

## Open research questions — priority order

1. `D_7938.pdf` が記す「1950年の金製Time-O-Vox Chronomètre証明」の原証明書、台帳、観測所、試験番号を特定できるか。
2. No.489に対応するChronomètre試験・証明記録は存在するか。
3. `Bulletin: La Chaux-de-Fonds` の実体と、1950–1958年前後のCyma/Tavannes掲載記録。
4. MIH資料にある「金製アラームウォッチへの証明書」の原資料・制度・対象範囲。
5. Humbertの8–10秒／鳴動中リューズ非駆動と、Horlbeckの6秒／リューズ回転という矛盾は、資料誤りかR.464の変種差か。
6. Chronomètre文字盤、5姿勢/温度調整刻印、ケース `8 6525`、Movement No.帯の関係。
7. No.489 / 1042 / 1058 / 1917 / 1932等の系列・年代順を安全に説明できるか。
8. seller ref. `1283` / `1261` と、ケース主番号・ケース下段番号の関係。販売者refとメーカーrefを混同しない。
9. Mémoires d'Ici `16.20 Mémoire sur la question des marques Cyma et Tavannes avec prospectus`（1948–1949）から、法人再編後のCyma / Tavannes商標使い分けを確認できるか。
10. Mémoires d'Ici `20.5 Brochure Cymavox 1`から、CYMAVOXの対象商品・年代・販売名義・アラームとの関係を確認できるか。
11. `CH243633A` / `CH293737A` / `CH290046A` / `CH285202A` / `CH327800A`と、HumbertのR.464図・実機の部品対応。
12. Georges BridevauxのTavannes在籍期の他特許から、R.464開発系譜を復元できるか。
13. 1943–1958年の `Journal Suisse d'Horlogerie` / `Revue internationale de l'horlogerie` / Guide des Acheteurs / E-Periodica等で、Cymavox / VOX群 / Bridevaux / Tavannes / Cyma / Time-O-Vox / R.464 / réveil を横断探索する。

## Search matrix for E-Periodica / archive work

### Names / companies

- `Cyma`, `CYMA WATCH CO`, `Cyma Watch Co. S.A.`, `Tavannes`, `Tavannes Watch Co`, `Georges Bridevaux`, `Bridevaux`, `Arnold Racine`, `A. Racine`

### Model / caliber / numbers

- `CYMAVOX`, `Cyma Vox`, `Cymavox 1`, `MULTIVOX`, `ROTOVOX`, `SUPERVOX`, `TIME-O-VOX`, `TIME O VOX`, `TIM-O-VOX`, `ULTRAVOX`, `R.464`, `Cal. 464`, `calibre 464`, `No.489`, `8 6525`, `2 6526`, `1283`, `1261`

### French / German / English concepts

- `chronomètre`, `chronometer`, `chronométrie`, `observatoire`, `bulletin`, `La Chaux-de-Fonds`, `Neuchâtel`
- `réveil`, `montre-réveil`, `montre réveil`, `Weckeruhr`, `Armbandwecker`, `alarm watch`, `alarm time-piece`
- `réglé`, `ajusté`, `positions`, `température`, `adjusted`, `unadjusted`, `regleur`, `régleur`

### Patent trail

- `CH243633A`, `CH293737A`, `CH290046A`, `CH285202A`, `CH327800A`, `US2789410`, `GB782720`, `Georges Bridevaux`, `Tavannes Watch Co`, `alarm time-piece`, `montre-réveil`, plus Swiss priority date `28.08.1954`

## Evidence source register

### Project sources

- `Cyma Time-o-vox 18k クロノメーター.xlsx` — 関係シート横断。特に観測個体表、外部照会ログ、OCD、関税資料。貼付画像を含む。
- B. Humbert, `KALIBER: TIME-O-VOX (CYMA - Tavannes Watch Co. A.G.) Nr. 464` technical article.
- Michael Philip Horlbeck, *The Alarm Wristwatch* — Cyma / Cal.464 section.
- Leonhard Beitl, *Alarm am Arm* — Cyma pp.134–136周辺。
- MIH共有資料 `D_7938.pdf` / Pritchard抜粋。
- U.S. Senate Committee on Government Operations, *Swiss Watches—Adjustments* hearings excerpt.
- No.489 movement / caseback / dial photographs.

### Public comparison media retained for research

- YouTube: https://www.youtube.com/watch?v=rp2PI5jy36k&t=425s — Cal. R.464の操作位置を後から再確認するための比較映像として保持する。販売店・出品個体への不具合認定、販売元との故障紐付け、公開WATCH本文・公開SOURCESへの転載には使用しない。原因推定にも使わず、必要時に映像上の操作位置だけを再確認する参照先とする。

### Primary / archive / patent

- `US2789410A`, Georges Bridevaux, Tavannes Watch Co. S.A., *Alarm time-piece*. HOLD as R.464 correspondence pending mechanical cross-check.
- `CH327800A`, Tavannes Watch Co. S.A., *Pièce d'horlogerie à réveil*. 1954-08-28出願、1958-02-15公開のスイス公報。US2789410A / GB782720Aと同じ機構系列として採用し、R.464との直接対応はHOLD。
- `GB782720A`, Tavannes Watch Co. S.A., *Improvements in and relating to an alarum time-piece*. 1954-08-28 Swiss priorityを共有する同一機構の国外公開として採用。
- `CH243633A`, Tavannes Watch Co., *Montre-réveil*. 1944-01-07出願、1946-07-31公開。単一香箱で時計輪列と打方を駆動するTavannesの先行アラーム特許。
- `CH293737A`（1949-05-12出願）、`CH290046A`（1949-06-08出願）、`CH285202A`（1949-08-19出願）— Tavannes Watch Co.による腕時計アラームの膜・ケース・音響構造特許。R.464との直接同一性は未確認。
- 『Schweizerisches Handelsamtsblatt』61 (1943), p.2848, [E-Periodica PID `sha-001:1943:61::3150`](https://www.e-periodica.ch/digbib/view?pid=sha-001%3A1943%3A61%3A%3A3150) — `CYMAVOX` No.105784の原公告。
- 『Schweizerisches Handelsamtsblatt』81 (1963), [E-Periodica PID `sha-001:1963:81::1897`](https://www.e-periodica.ch/digbib/view?pid=sha-001%3A1963%3A81%3A%3A1897) — Tavannes Watch Co.によるCYMAVOX更新No.197724。
- 『Schweizerisches Handelsamtsblatt』102 (1984), [E-Periodica PID `sha-001:1984:102::317`](https://www.e-periodica.ch/digbib/view?pid=sha-001%3A1984%3A102%3A%3A317) — CYMAVOXの1983-12-26非更新抹消。
- 『Schweizerisches Handelsamtsblatt』66 (1948), [p.1114](https://www.e-periodica.ch/digbib/view?pid=sha-001%3A1948%3A66%3A%3A1114) / [p.1340](https://www.e-periodica.ch/digbib/view?pid=sha-001%3A1948%3A66%3A%3A1340) / [p.1355](https://www.e-periodica.ch/digbib/view?pid=sha-001%3A1948%3A66%3A%3A1355) / [p.1829](https://www.e-periodica.ch/digbib/view?pid=sha-001%3A1948%3A66%3A%3A1829) — Schwöb FrèresのCyma Watch Co. S.A.への商号変更、旧Société des montres Cymaの解散、No.118570の移転、多数商標の名義整理。
- 『Schweizerisches Handelsamtsblatt』68 (1950), p.2161, [E-Periodica PID `sha-001:1950:68::2357`](https://www.e-periodica.ch/digbib/view?pid=sha-001%3A1950%3A68%3A%3A2357) — `TIME-O-VOX` No.134604ほかCyma Vox系列の商標登録公告。
- 『Schweizerisches Handelsamtsblatt』89 (1971), p.738, [E-Periodica PID `sha-001:1971:89::814`](https://www.e-periodica.ch/digbib/view?pid=sha-001%3A1971%3A89%3A%3A814) — `TIME-O-VOX` No.134604ほかの非更新抹消公告。
- 『Schweizerisches Handelsamtsblatt』66 (1948), p.3459, [E-Periodica PID `sha-001:1948:66::3761`](https://www.e-periodica.ch/digbib/view?pid=sha-001%3A1948%3A66%3A%3A3761) — Georges BridevauxへのTavannes Watch C° S.A.の代理権付与。
- 『Schweizerisches Handelsamtsblatt』77 (1959), p.984, [E-Periodica PID `sha-001:1959:77::1070`](https://www.e-periodica.ch/digbib/view?pid=sha-001%3A1959%3A77%3A%3A1070) — Bridevaux発明の `Compteur de temps` 追加特許337149 / 337150。権利者Georges Bürgin、主特許324272でありR.464系譜への接続は `HOLD`。
- *Actes de la Société jurassienne d'émulation* 49 (1945), 広告欄, [E-Periodica PID `asj-006:1945:49::395`](https://www.e-periodica.ch/digbib/view?pid=asj-006%3A1945%3A49%3A%3A395) — 1本の鍵で時計機構とアラームを同時巻上げするCyma卓上アラーム広告。
- *Revue internationale de l'horlogerie*, 1956年11月, p.32, [Watch Library / MIH image](https://nhc023gqfi.execute-api.eu-central-1.amazonaws.com/prd/iiif/image/iiif%2FMIH%2F1956%2FMIH-RIH_1956_11%2FJPG-SOURCE%2FMIH-RIH_1956_11_JPG-SOURCE_0090/full/1600,/0/default.jpg) — `Time-O-Vox` の名称と製品写真を伴う公刊資料。発売初年・Chronomètre証明年の根拠にはしない。
- Neuchâtel archive reply: 1954–1958 BT registers checked; No.489 correspondence not identified; Cyma/A. Racine records exist from 1956; `Bulletin: La Chaux-de-Fonds` noted.
- MIH reply: no document directly tied to this model was found in its search; Cyma library file contains a reference to certificates for gold alarm watches.
- MIH共有資料 `D_7938.pdf`, p.5 — 2003年までの製品史を扱う後年のCyma社史パンフレット。1950年に金製Time-O-VoxがChronomètre certificateを取得したと記すが、原証明書・試験番号・観測所名は示さないため `HOLD`。
- Watch-Wiki, [Cyma, 2007-12-16 revision](https://watch-wiki.org/index.php?title=Cyma&oldid=59590) — 1950年Chronomètre certificate説を掲載する早期Web例。企業年表の並びが `D_7938.pdf` と近く、独立した一次出典を示さない。
- Sammler-Uhren, [Cyma watches age determination...](https://sammler-uhren.com/en/blogs/uhren-altersbestimmung-nach-werknummer/cyma-uhren-altersbestimmung-navystar-cymaflex-time-o-vox-sonomatic-watersport-charisma-imperium-signature), 2025-07-27 — 1950年説を再掲するが、記事記載の出典は `Watchwiki, AI`。独立証拠には不採用。
- [COSC official site](https://www.cosc.swiss/) — COSCは1973年以降の組織と明記。前身となるLa Chaux-de-Fonds等の試験機関の旧台帳を保管・承継しているかは未確認であり、所在照会先候補として保持する。
- [Swissreg trademark database guidance](https://www.ige.ch/de/uebersicht-dienstleistungen/digitales-angebot/datenbanken-und-verzeichnisse/swissreg/markendatenbank) — 現行・抹消商標と履歴の検索案内。ただしCYMAVOXの検索結果は0件で、法的に確定的なのはIGE/IPI発行の登録簿抄本と公式案内が明記するため、旧原簿・包袋の所在と費用を直接照会する。
- Mémoires d'Ici, `CH MDI, Schwob - Büttiker - Tavannes Watch, 16.20`, *Mémoire sur la question des marques Cyma et Tavannes avec prospectus*（1948–1949）, [catalog](https://collections.m-ici.ch/detail.aspx?ID=133390). Public / no access restriction; contents not yet obtained.
- Mémoires d'Ici, `CH MDI, Schwob - Büttiker - Tavannes Watch, 20.5`, *Brochure Cymavox 1*（undated）, [catalog](https://collections.m-ici.ch/detail.aspx?ID=133416). Public / no access restriction; contents not yet obtained.

## Publication safety / wording rules

Safe:

- 「Time-O-VoxにはChronomètre仕様が存在した」
- 「No.489に対応する観測所記録は、現在確認した資料からは特定できていない」
- 「US2789410AはTavannes Watch Co. S.A.に譲渡された1954年優先日のalarm time-piece特許で、R.464との対応を検証中」
- 「観測個体では文字盤表記と調整刻印が一様ではない」
- 「TIME-O-VOX商標は1950-07-20にCyma Watch Co. S.A.から出願され、登録番号134604として公告された」
- 「Georges Bridevauxは1948年末までにTavannes Watch Co. S.A.の共同署名による代理権保持者として登記されていた」
- 「Tavannes Watch Co.は1943年にCYMAVOXを出願し、1944年にはアラーム時計特許を出願していた」
- 「1949年にはTavannesによる複数の腕時計アラーム用音響構造特許が出願され、1950年にはCyma Watch Co. S.A.がVOX系6商標を一括出願した」
- 「CYMAVOXと1950年VOX群は、法的には異なる名義で登録・維持された」
- 「後年のCyma社史資料は1950年に金製Time-O-VoxがChronomètre証明を得たと記すが、対応する一次証明記録は未確認である」
- 「1963年のHumbert技術記事と後年のHorlbeck専門書は、R.464の鳴動時間と鳴動中のリューズ挙動について矛盾する」

Do not state yet:

- 「No.489はNeuchâtel Observatory認定個体である」
- 「No.489は観測所試験を受けていない」
- 「US2789410AはR.464の特許である」
- 「UNADJUSTED個体は実際には調整済みだった」
- 「1283 / 1261はメーカー公式refである」
- 「1950年の商標出願日がTime-O-Vox / R.464の発売開始日である」
- 「1945年のCyma卓上アラームがCal. R.464である」
- 「GB782720A / US2789410AのSwiss priority参照文字列がスイス公開特許番号である」
- 「CYMAVOXはアラーム時計の商品名だった」
- 「CH243633AはCYMAVOXまたはCal. R.464そのものの特許である」
- 「1949年の膜・ケース音響特許群がCal. R.464に採用された」
- 「1948年にTavannes Watch Co.がCyma Watch Co.へ単純改称した」
- 「TIM-O-VOXは1950年に独立登録された第7のスイス商標である」
- 「Time-O-Vox / R.464のChronomètre証明年は1950年で確定している」
- 「すべてのR.464が鳴動中にリューズ非回転である」または「すべてのR.464が鳴動中にリューズ回転する」
- 「Time-O-Vox以外の1950年VOX商標群は実製品ラインとして発売された」

## Research log

### 2026-09-29 — 1950 Chronomètre年代主張 / 1956製品記事 / R.464技術資料衝突

- `D_7938.pdf` p.5を画像とテキストで再確認し、後年のCyma社史パンフレットが1950年に金製Time-O-VoxのChronomètre certificate取得を記していることを確認した。原証明書・試験番号・観測所名がないため年代は `HOLD` とした。
- 1956年11月の *Revue internationale de l'horlogerie* p.32を画像で確認し、`Time-O-Vox` 名称と製品写真が同時代の公刊資料に存在することを確認した。発売初年や証明年には一般化しない。
- 1943–1965年の業界誌・広告・市場資料の横断確認では、Time-O-Vox以外のVOX商標を実製品名として示す確実な資料を確認できなかった。未発見を未使用の確定証明とは扱わない。
- Humbertの1963年R.464技術記事を再確認し、8–10秒の鳴動時間と、鳴動中に巻上げ中間車が外れて巻真・リューズが駆動されない構造説明を確認した。
- Horlbeck *The Alarm Wristwatch* pp.97–99を画像で再確認し、6秒の鳴動時間と、鳴動中にリューズが時計回りに回転するという逆の記述を確認した。資料間の `CONFLICT` として登録し、現行WATCH本文は変更していない。
- Watch-Wikiの版履歴を初期版まで確認し、1950年Chronomètre certificate説が遅くとも2007-12-16版に存在することを確認した。ただし、その企業年表の出来事順・表現は2003年までを扱う `D_7938.pdf` と近く、独立した証明記録は示されない。2025年Sammler-Uhren記事も出典を `Watchwiki, AI` とするため、Web上の反復を複数証拠とは数えない。
- COSCには前身試験機関の旧台帳承継の有無、MIHには `D_7938.pdf` p.5の原典・証明書画像・写真メタデータ、IGE/IPIには旧商標原簿・包袋の所在と見積もりを照会する方針を固定した。いずれも有料作業は見積もり承認前に開始させない。

### 2026-09-28 — CYMAVOX / 1948法人再編 / 1944–1949アラーム特許系譜

- 1943年CYMAVOX原公告、1963年更新、1983年非更新抹消を追跡し、CYMAVOXがTavannes Watch Co.名義で維持されたことを確認した。
- 1948年の商業登記・商標公告を横断し、Schwöb FrèresのCyma Watch Co. S.A.への商号変更、旧Société des montres Cymaの解散、No.118570の個別移転、多数商標の名義整理を確認した。Tavannes Watch Co.の単純改称とは扱わない。
- `CH243633A`を追加し、Tavannesのアラーム技術開発がCYMAVOX出願の53日後、1944-01-07の出願まで遡ることを確認した。
- 1949年の `CH293737A` / `CH290046A` / `CH285202A`を追加し、1950年VOX商標群以前から腕時計アラームの音響・ケース技術が開発されていたことを確認した。
- 1950年原公告と1971年抹消公告を再照合し、`TIM-O-VOX`を独立した第7の同日スイス商標とする解釈を棄却した。
- Mémoires d'Iciの16.20と20.5を、名称計画と実商品を直接検証する最優先未取得資料として登録した。目録情報は確認済みだが、内容は未取得・未確認。
- 公開WATCH本文、Chronomètreページ、観測個体データ、画像、音源は変更していない。

### 2026-09-28 — R.464比較動画URLを研究参照として保持

- ユーザー提供のYouTube動画 `https://www.youtube.com/watch?v=rp2PI5jy36k&t=425s` を、R.464の操作位置を後から再確認する比較映像としてLedgerへ追加した。
- この記録は既存の外部個体観察を再確認するための索引であり、販売店・販売個体を「故障個体」として公開特定する目的には使わない。
- 公開WATCH本文、Chronomètre公開ページ、公開SOURCES、観測個体表の表示内容は変更しない。
- 映像だけから他個体の内部原因を推定しない。掲載個体で確認した内部原因仮説と、外部個体の外観上の挙動は引き続き分離する。

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
