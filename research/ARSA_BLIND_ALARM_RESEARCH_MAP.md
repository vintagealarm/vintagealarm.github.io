# ARSA Blind Alarm — Research Map / Current Task Board

このファイルは、ARSA Blind Alarm調査の**現在位置・経緯・切った仮説・追うべきタスク**を一枚で把握するための運用正本。

- 詳細な証拠・出典・逐次追記は `ARSA_BLIND_ALARM_LEDGER.md`
- このファイルは「今どこまで分かったか」「何を追わないか」「次に何をするか」を管理する
- 新証拠が出たらまずLEDGERへ記録し、**優先順位・仮説状態・タスク状態が変わる場合だけこのMAPを更新する**
- 会話やMemoryから現在状態を補完しない。毎回GitHub `main` のLEDGER + MAPを確認する

---

## 1. 今回の調査目的 — VA標準フレームへ戻す

対象は、購入済みのARSA Blind Alarm / tactile alarm個体。**2026-10-03 12:28 JST以降は、Pierce Duofon / Wittnauer 10WAで使ってきたVAの調査方式へ戻す。**

調査順:

### ① 作った会社 — Auguste Reymond / ARSA
- 会社史、Tramelanでの製造、alarm watchとblind / tactile watch双方の製品能力
- ARSA自身のcatalog / trade ad / company historyを優先
- AFBや米国流通は、ARSAとの直接接続が取れる時だけ会社史の主線へ入れる

### ② 需要背景 — なぜ触読できる腕時計／アラームが必要だったか
- 触覚時計はARSA以前から存在すること
- 視覚障害者が時刻を自力で読むための触読時計文化
- 戦傷失明者支援、AFB等による調達・改造・配布・修理の制度化
- **背景史はARSA Blind Alarmを理解するためのCONTEXT**。1945 WPBや1970年代AFB流通そのものを研究目的へしない

### ③ ARSA Blind Alarmそのものについて分かっていること
- AS 1475 / 17J
- raised tactile hour markers、太い時分針、独立alarm hand、秒針なし
- hinged front cover、ARSA型の4時クラウン内蔵opener、購入個体では9時側hingeを画像確認
- ケース・年代・モデル差
- 触読時計で資料化されている針破損、接触によるsetting disturbance等のfailure evidence
- 「Blind watch一般」「ARSA固有」「購入個体固有」を混ぜない
- 到着後は、時・分・alarm handの触り分け、alarm設定時刻のread-back、蓋の操作感を実機確認する

### ④ 触読alarmの比較 — 同じ需要に各社がどう答えたか
現時点の比較対象:
- **ARSA / AS1475**
- **AFB-marked / ARSA-ordered according to Beitl / AS1475**
- **Enicar / AS1475**
- **BEAT / Friedli-Frères / AS1475**
- **A. Schild Blind Alarm prototype / AS1475**
- **afB De Luxe / AS1930** — later survivor、maker OPEN
- **BEAT / Friedli-Frères / AS1930** — forum leadのみ、HOLD

比較するのは「同じケースか」ではなく、opener、hinge、hands、markers、alarm read-back、case、caliber、maker certainty。

### ⑤ 最後 — AS1475という普及platformと、その変貌種たち
ARSAをAS1475史へ戻して終える。

- まず通常の機械式alarm wristwatchとして多数ブランドへ広く採用されたAS1475
- **Benedict Park-O-Phon**：HorlbeckではAS1475をベースにparking-time indicationを追加。movement自体には技術変更なしとされる
- **Blind / tactile alarm群**：同じAS1475を、触覚markers / hands / front cover等で別用途へ変えた例
- **AS1568 → AS1930 / 1931系への展開**、およびCitizen / Poljot等の直接派生は、必要な範囲でplatform史として整理
- ここで「ARSAだけの奇品」ではなく、**普及caliberが用途ごとに姿を変えた一例**として位置づける

### ⑥ ARSA固有の追加要件
- ARSA社内でblind watchとalarm wristwatchが同時期に並存したこと
- ca.1960 AFB→ARSA発注記述の独立確認
- 現存個体の年代・ケース材・caseback marks
- ただしAFB契約書は**見つかれば強いbonus evidence**であり、研究全体のcompletion blockerにはしない

購入前リスク評価、価格、欠品監視は履歴として保持するが、VA研究本線には戻さない。

---

## 2. 調査の進み方 — 何をどう掘ってきたか

| 段階 | 何をしたか | 得られたこと | GitHub milestone |
|---|---|---|---|
| 0. 現物起点 | eBay写真・seller回答から個体を先に見る | 触覚文字盤、2/4時クラウン、4時プッシャー、開閉前蓋、33mm級、17J表記を確認。sellerはアラーム作動・蓋開閉・ヒンジ正常と回答 | 初期LEDGER |
| 1. 専門書固定 | Project資料『Alarm am Arm』『The Alarm Wrist Watch』でARSA / Enicar / BEAT / A. Schildを照合 | ARSA Blind AlarmはBeitlで約1956、掲載個体1958、AS1475。4時クラウン内蔵プッシャー、触覚針、秒針なし。複数メーカーのAS1475 Blind Alarm群を確認 | `6bde2a8...` |
| 2. 前史を遡る | 1950年代以前の触覚時計、WWI/WWII、AFB、St Dunstan's、Seikosha等へ拡張 | 「戦争でBlind Alarmが発明された」ではなく、触覚時計はもっと古く、戦争が供給・訓練・修理を制度化したと整理 | `55ddd34...` |
| 3. ARSAの両能力を確認 | 1956 ARSA Alertic広告、ARSAのBraille watch史、AFB周辺を探索 | ARSAに「触覚時計」と「通常の機械式アラーム」の両方の実績が同時期にあったことを補強 | `f2212e4...` |
| 4. 飽和調査 | 系譜、戦争需要、故障、現存個体、市場、AFB資料、A. Schild、Venus230、後期AFB De Luxeをまとめて深掘り | 公開Webで解ける範囲をほぼ飽和。中央の未解決は「AFB↔ARSA一次文書」と「今回個体の中身」に収束 | `06889ba...` |
| 5. 購入個体の状態更新 | 再出品、値下げ、sellerの同一個体確認、現行スクショを反映 | $350 → $279、クーポン表示¥41,721。昨日の3点確認は再出品後も継続。残るseller側の大穴はムーブ写真 | `5baabba...`〜`75ece5b...` |
| 6. 年代・ケース材の再点検 | seller文、旧Webミラー、ARSAの1970年代触覚時計継続を分離 | sellerの「1970s」「stainless steel」は個体確定情報ではない。旧ミラー内でもケース材表記が矛盾 | `b7ba68d...` |

---

## 3. 現在の確定線

### 3.1 今回個体 — 現時点で使ってよい情報

**IMAGE-CONFIRMED / USER-SUPPLIED**
- ARSA / ALARM / 17 JEWELS dial
- 触覚ドットと太い触覚時分針
- 中央のアラーム設定針
- 2時 / 4時側の2クラウン
- 4時側クラウン中央にプッシャー
- 開閉式前蓋、9時側ヒンジ
- 秒針なし
- 約33mm級
- seller movement photoで **AS 1475** 刻印、**17 JEWELS**、同caliberのbridge layoutを確認
- 2026-10-02購入済み。価格・配送状態は個人台帳側を正本とし、この研究MAPでは追跡しない

**SELLER-CLAIM**
- アラーム作動
- 前蓋は正常に開閉
- ヒンジ正常
- 再出品後も同じ個体で、上記回答は継続

**まだ未確認**
- 内蓋 / 裏蓋刻印
- 実ケース材
- 正確な製造年代
- hidden / under-dial condition
- sellerの「serviced」の正確な範囲・時期・担当
- 到着後の実機操作で確認できる触覚UI・アラーム設定挙動

### 3.2 専門書で固定できる歴史側

- ARSA Blind Alarm: 約1956、AS1475
- Beitl掲載ARSA個体: 1958、クロームメッキ金属ケース、ねじ込み裏蓋、AS1475
- 4時クラウン内蔵プッシャーで前蓋開閉
- 触覚針、秒針なし
- EnicarにもAS1475 Blind Alarm（約1957）
- BEAT / Friedli-FrèresにもAS1475 Blind Alarm、ただし開閉操作は6時
- A. SchildにAS1475 Blind Alarm prototype
- HorlbeckのEnicar 1964特別個体でも、触って時刻とアラーム時刻を読む設計を確認
- DIJUの企業史では、ARSAのblind / Braille watchは**1950年代初頭に開発**され、**1973年にもARSAの製造品目として「montres pour aveugles」**が明記される
- AFBの一般向け時計流通は1926年に引き継がれ、1972年にはbrailled pocket / wrist watchを30種類扱っていた。これは1943–1963年の戦盲軍人向けgift programとは別系統として扱う
- auction-catalog survivorとして、**afB De Luxe Alarm / AS 1930 / ca.1970 / 33 mm**が確認できる。ただし製造者は未同定で、ARSA連続系列とは扱わない

### 3.3 現在の歴史モデル

現時点で最も証拠に沿う整理:

> 触覚時計はARSAよりはるか以前から存在する。WWI/WWIIはそれを発明したのではなく、戦傷者支援を通じて調達・訓練・修理・流通を大規模化した。1950年代に機械式腕アラームが成熟し、ARSA / Enicar / BEAT / A. Schild周辺で、既存の触覚時計文化と新しいアラームムーブメントが交差した。

これは**現在の最有力解釈**。加えて、Davoine 1969ではA. Reymondが「Montres pour aveugles」を企業specialtyとして掲げ、1970年広告では同じspecialty欄に「Montres pour aveugles」と「Montres bracelet réveil」が同時掲載されることを確認した。したがって、**ARSA社内で盲人用時計と腕時計アラームの両製品能力が並存していたことはperiod trade sourceで補強済み**。

さらにDIJUでは、ARSAが1950年代初頭にblind / Braille watchを開発し、1973年にも「montres pour aveugles」を製造品目としていたことが確認できる。したがって**ARSAの触覚時計系統は1950年代の一過性企画ではなく、少なくとも1973年まで企業の製品領域として継続していた**と扱える。

一方、「その二系統を意図的に統合してBlind Alarmを開発した」という因果そのものを述べる一次資料はまだない。また、ca.1970のafB De Luxe Alarm / AS1930 survivorはAFB系触覚アラームの後続例だが、製造者未同定のためARSAの後継機とはしない。

AFBの1943–45年戦盲軍人向けprogramについては、AFB自身の制度史が「戦時中は民間向け時計が不足し、初期配布品の多くは市民から寄付された既存時計を清掃・修理し、文字盤周囲へ小さな金属またはガラスの触覚点を追加した」と記す。したがって**戦時期AFB配布を単一のfactory-built AFB watch系列として扱わない**。約1960年のBeitl記載ARSA委託モデルを1943–45年へ遡及させることも禁止する。

1972年の企業統合後についてDIJUは、主市場を **ARSA = Europe / Damas = UK・中近東 / Hoga = USA・極東・Italy** と記録する。このため「AFBが米国組織だから、1970年代のAFB時計もARSA製だろう」という地理的ショートカットは採用しない。HogaをafB De Luxeのメーカー候補へ昇格する根拠にもまだならない。

---

## 4. 一度切った / 降格した線

新証拠なしにここを毎回掘り直さない。

| 仮説・線 | 現在状態 | 切った理由 |
|---|---|---|
| 戦争が触覚時計を発明した | REJECTED | 19世紀末〜1920年代以前から触覚時計の先行例あり |
| WWII退役軍人需要が直接ARSA Blind Alarmを生んだ | NOT PROVEN | 制度的需要は強いが、ARSA開発との直接一次文書なし |
| AFBの約1960 ARSA注文 = 戦傷軍人gift program | NOT PROVEN | AFBは一般向けAids & Appliancesでも時計を扱う。gift programと同一視できない |
| A. Schild prototypeがARSAの直接祖先 | NOT PROVEN | prototype存在は確定、年代順序・設計継承は未確定 |
| ARSA / Enicar / BEATは同一完成ケース | REJECTED AS OVERCLAIM | 機能構成は近いが外装・開閉位置が異なる |
| 共通ケースメーカーが全社へ供給 | OPEN / LOW PRIORITY | ケースメーカー刻印等の直接証拠なし |
| ARSAのヒンジは慢性的弱点 | NOT PROVEN | 個別故障リスクは合理的だが統計・反復例なし |
| 触る力で歯車列が壊れるのが典型故障 | NOT PROVEN | 設定ズレ・針破損は資料あり、gear train常習破壊は未確認 |
| 今回個体 = 1958 | REJECTED | 1958はBeitl掲載個体の日付。今回個体の年代は別問題 |
| sellerの「1970s」をそのまま採用 | REJECTED | ARSAが1970年代にも触覚時計を作っていたことは可能性を支えるだけで、個体年代は未確定 |
| sellerの「stainless steel」をそのまま採用 | REJECTED | 旧ミラー本文とitem specifics内でケース材表記が矛盾 |
| 非アラームARSA Brailleの落札価格を直接compに使う | REJECTED | 商品カテゴリ・機構が違う |
| 広いWeb検索を同じ語で繰り返せばAFB↔ARSA一次文書が出る | STOP | 公開Webは飽和。次は非index archive / 物理資料の層 |
| Morton OllendorffのSwiss Braille-watch factory = ARSA | HOLD | 二次情報のみ。ARSAとの接続なし |
| Venus230 ARSA Blind Alarm = 確定した第二量産系列 | HOLD | survivor leadはあるがperiod primary未確認 |

---

## 5. 今追うべき方向 — VA標準フレームでの優先順位

### P0 — 会社 → 需要背景 → 時計本人
**状態:** ACTIVE / PRIMARY

1. **ARSA会社史**
   - 1950s–1970sのARSA一次・準一次資料
   - blind / tactile watch と alarm wristwatch の製品能力・時期
2. **需要背景**
   - 触読時計が必要とされた理由、視覚障害者向け時計文化
   - 戦争・AFBは背景として必要十分まで。ARSA直接因果が出なければ深追いしない
3. **ARSA Blind Alarm本人**
   - mechanism / UI / model variation / failure evidence / purchased specimen
   - 針破損やsetting disturbance等はsource別に整理
   - 到着後の触覚操作実測を重視

### P1 — 触読alarm比較
**状態:** ACTIVE / PRIMARY COMPARISON

比較対象:
- ARSA AS1475
- AFB / ARSA AS1475（Beitl記載。取引は独立未確認）
- Enicar AS1475
- BEAT / Friedli-Frères AS1475
- A. Schild prototype AS1475
- later afB De Luxe AS1930（maker OPEN）
- BEAT / Friedli-Frères AS1930（forum-only HOLD）

比較軸:
- opener / hinge / cover
- hour / minute / alarm hand
- tactile markers
- alarm-time read-back
- case / caliber
- maker certainty / source tier

### P2 — AS1475 platformと変貌種
**状態:** ACTIVE / CLOSING CHAPTER

最低限:
- 通常のAS1475 alarm wristwatchとしての普及
- Benedict Park-O-Phon — AS1475 + parking-time indication
- tactile / Blind Alarmへの外装・UI adaptation
- AS1568 / AS1930 / AS1931のfamily progression
- Citizen / Poljotなどdirectly based examplesは、ARSA本文に必要な範囲で扱う

**目的:** ARSAを孤立した珍品として終わらせず、AS1475という普及platformが用途で変貌した一例として戻す。

### P3 — BONUS / CONTEXT archive
**状態:** NON-BLOCKING

- AFB↔ARSA supplier / purchase order / invoice / correspondence
- Mémoires d'Ici 1948 / 1973全文
- Smithsonian MG.306619.07
- AFB 1973 International Catalog
- War Production Board “BRAILLE WATCHES: Correspondence 1945”

これらは**①会社 / ②需要背景 / ③時計本人 / ④比較 / ⑤AS1475 platform**のどこかを更新できる場合のみ昇格する。資料自体が面白いことを理由にP0へ戻さない。

### P4 — HOLD / 研究本線外

- Morton Ollendorff / Swiss Braille-watch factory
- later AFB De Luxe maker identification（直接資料が出るまで）
- BEAT / Friedli-Frères AS1930 lineage（独立資料待ち）
- Venus230 ARSA Blind Alarm production-family confirmation
- universal case supplier
- 市場価格 / asking price / sold comp
- 購入済み個体の欠品監視

---

## 6. 購入判断の履歴（RESOLVED / VA研究優先順位外）

2026-10-02に購入済み。以下は購入前判断の履歴として保持する。価格・配送・欠品確認を現在のVA研究タスクへ戻さない。

### すでに潰したもの
- 同一個体か → seller YES
- アラーム作動 → seller YES
- 前蓋正常開閉 → seller YES
- ヒンジ正常 → seller YES
- 現行価格 → screenshotで¥41,721

### 現在の価格・タイミングリスク
- 公開価格: US$279
- private offer: **US$251 / eBay表示 約¥39,526**
- offer有効期間中も商品が確保されるわけではなく、他の買い手による購入可能性は残る
- したがって、ムーブ写真待ちは技術的不確実性を減らす一方、個体を失うタイミングリスクを伴う

### 残っているP0
- inside caseback / case marks
- exact production year / case material
- timing / amplitude / beat error / alarm duration
- hidden / under-dial condition

**解消済み:** movement identity = **AS 1475 / 17 JEWELS**

### 今後sellerに同じ3点を聞き直さない
新しい矛盾証拠が出ない限り、アラーム・蓋・ヒンジは再質問しない。

---

## 7. 調査停止条件 / 再開条件

### 広域Web調査を止める条件
中央質問に対して新しい一次・準一次資料が増えず、既存二次情報の引用循環だけになる場合は停止。

### HOLDを再開する条件
- period catalog
- archive document
- movement / caseback photo
- independently dated survivor
- factory / supplier mark

のどれかが出た時。

### MAP更新条件
以下が変わる時だけ更新:
- P0〜P5の優先順位
- REJECTED / HOLD / OPENの状態
- 購入ゲート
- archive target
- survivor matrixの設計

単なる新URL、新スクショ、新数値はまずLEDGERへ。

---

## 8. 次の実行順

1. **①作った会社** — ARSAの会社史・製造能力を、現在あるDIJU / Davoine / Mémoires d'Ici metadata / specialist booksで一度まとめ、不足する一次資料だけを特定する
2. **②需要背景** — 触読時計の用途・利用者・戦後までの制度背景を、ARSA説明に必要な長さまで圧縮する。1945 WPBを本線にはしない
3. **③時計本人** — ARSA Blind Alarmのmechanism / tactile UI / failure evidence / model差をsource別に整理。購入個体画像を直接証拠として使う
4. **④触読alarm比較** — ARSA / AFB-ARSA / Enicar / BEAT / A. Schild / later afBを差分表へ固定する
5. **⑤AS1475と変貌種** — 普及AS1475 → Benedict Park-O-Phon → tactile alarm adaptations → caliber family / direct descendantsの順でclosing materialを作る
6. 到着後、購入個体で**時・分・alarm handの触り分け / alarm設定時刻read-back / front-cover操作**を実測する
7. AFB契約書、Smithsonian、WPB等は、上記1〜5の未解決を直接埋める場合だけ再開する

---

## 9. 研究上の禁止事項

- 今回個体をムーブ未確認のままAS1475確定と書かない
- Beitlの1958掲載個体と今回個体を同一年代扱いしない
- AFB gift programとARSA注文を同一視しない
- 「war veterans → ARSA Blind Alarm」の因果を断定しない
- common architectureをcommon complete caseへ飛躍させない
- seller item specificsを一次資料扱いしない
- stale Web indexをユーザー最新スクショより優先しない
- asking priceをsold marketへ変換しない
- 一度REJECTED / HOLDへ落とした仮説を、新証拠なしに復活させない


## 10. 2026-10-02 09:08 JST — current specimen override

Seller movement photo received.

Confirmed directly from the image:
- caliber stamp: **AS 1475**
- bridge marking: **17 JEWELS**
- bridge layout is consistent with AS 1475
- no obvious major rust, verdigris, missing large bridge, or gross destructive damage is visible in the photographed movement side

This supersedes the earlier “movement photo / caliber pending” state.

Still open:
- inside caseback marks
- exact production year
- exact case material
- timing / amplitude / beat error
- alarm duration
- hidden / under-dial condition
- service history


## 11. 2026-10-02 — regulator comparison correction

User supplied a direct side-by-side comparison against the EmmyWatch AS 1475 reference.

Current state:
- target regulator / balance-cock geometry is visually consistent with the reference
- the previous concern about a visibly different regulator / balance-cock is withdrawn
- do not keep this as an active purchase-risk item unless contradictory evidence appears


## 12. 2026-10-02 — probable missing alarm click screw

New user-marked side-by-side comparison shows the target movement apparently lacks the slotted screw at the alarm click beside the upper alarm ratchet wheel.

Technical identification:
- 7426 = alarm click
- 7436 = alarm click spring
- 57426 = alarm click screw

Current classification after the 2026-10-03 VA research scope correction:
- keep the probable 57426 issue as a **specimen-condition record only**
- do not spend further VA research time on it unless arrival inspection produces evidence that changes the historical / structural interpretation
- simple absence vs broken remnant remains unresolved, but this is not an active OWNER'S NOTE research priority
