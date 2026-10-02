# ARSA Blind Alarm — Research Map / Current Task Board

このファイルは、ARSA Blind Alarm調査の**現在位置・経緯・切った仮説・追うべきタスク**を一枚で把握するための運用正本。

- 詳細な証拠・出典・逐次追記は `ARSA_BLIND_ALARM_LEDGER.md`
- このファイルは「今どこまで分かったか」「何を追わないか」「次に何をするか」を管理する
- 新証拠が出たらまずLEDGERへ記録し、**優先順位・仮説状態・タスク状態が変わる場合だけこのMAPを更新する**
- 会話やMemoryから現在状態を補完しない。毎回GitHub `main` のLEDGER + MAPを確認する

---

## 1. 今回の調査目的

対象は、現在eBayに出ているARSA Blind Alarm / tactile alarm個体。

調査目的は二つ。

1. **購入前同定・リスク評価**
   - 本当にARSA Blind Alarm系か
   - ムーブメントは何か
   - Blind専用外装（蓋・ヒンジ・触覚針等）は生きているか
   - 修理不能リスクと価格の釣り合い
2. **歴史的位置づけ**
   - ARSA / AFB / A. Schild / Enicar / BEAT / AS1475の関係
   - 触覚時計史と機械式アラーム腕時計史がどこで交差したか
   - 戦傷者・福祉流通との関係を、因果を飛躍させずに確定する

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
- 現行表示: US$279、クーポン後¥41,721、送料無料、Best Offer

**SELLER-CLAIM**
- アラーム作動
- 前蓋は正常に開閉
- ヒンジ正常
- 再出品後も同じ個体で、上記回答は継続

**まだ未確認**
- 実ムーブメント
- AS1475刻印 / レイアウト
- 中錆・水入り
- アラーム機構の欠品
- 過去の雑修理
- 内蓋 / 裏蓋刻印
- 実ケース材
- 正確な製造年代
- 精度 / 振り角 / アラーム持続時間

### 3.2 専門書で固定できる歴史側

- ARSA Blind Alarm: 約1956、AS1475
- Beitl掲載ARSA個体: 1958、クロームメッキ金属ケース、ねじ込み裏蓋、AS1475
- 4時クラウン内蔵プッシャーで前蓋開閉
- 触覚針、秒針なし
- EnicarにもAS1475 Blind Alarm（約1957）
- BEAT / Friedli-FrèresにもAS1475 Blind Alarm、ただし開閉操作は6時
- A. SchildにAS1475 Blind Alarm prototype
- HorlbeckのEnicar 1964特別個体でも、触って時刻とアラーム時刻を読む設計を確認

### 3.3 現在の歴史モデル

現時点で最も証拠に沿う整理:

> 触覚時計はARSAよりはるか以前から存在する。WWI/WWIIはそれを発明したのではなく、戦傷者支援を通じて調達・訓練・修理・流通を大規模化した。1950年代に機械式腕アラームが成熟し、ARSA / Enicar / BEAT / A. Schild周辺で、既存の触覚時計文化と新しいアラームムーブメントが交差した。

これは**現在の最有力解釈**であり、一次資料が直接「そういう因果で作った」と述べたものではない。

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

## 5. 今追うべき方向 — 優先順位

### P0 — 今回個体の購入判断に直結

#### T0-1 ムーブメント写真を取得・判定
**状態:** BLOCKED / seller待ち

見る項目:
- AS1475刻印または同定可能なbridge layout
- 17石構成
- 錆 / 緑青 / 水入り跡
- ネジ頭・ブリッジ傷
- アラームhammer / trainの欠品
- movement ring / case interior
- 内蓋・裏蓋刻印

**完了条件:**  
「AS1475または歴史的に説明可能な別ムーブ」かつ、大錆・主要欠品・明白な破壊的修理なし。

#### T0-2 写真が来た時点で年代・ケース材も同時回収
**状態:** READY WHEN PHOTO ARRIVES

- inside caseback marks
- case maker / material marks
- reference / serial
- plating / steelの判別材料

**狙い:** seller説明ではなく個体側の刻印で決める。

---

### P1 — 歴史の最大未解決「AFB↔ARSA」

#### T1-1 APH / AFB Archiveを狙い撃ち
**状態:** ACTIVE / ARCHIVE TIER

対象:
- circa 1955–1963
- Braille Watch Program
- Aids and Appliances
- purchasing / supplier correspondence / invoices
- Kathern / Katherine / Kay Gruber
- ARSA / Auguste Reymond / Tramelan / Switzerland
- alarm watch / wrist alarm

**欲しい証拠:**  
AFBからARSAへの注文、請求、仕入先書簡、製品名・数量・仕様。

#### T1-2 Mémoires d'Ici / Auguste Reymond資料
**状態:** ACTIVE / ARCHIVE TIER

狙い:
- 1954–1962 ARSA catalogs
- blind / Braille watch leaflets
- Alertic / alarm catalogs
- company anniversary material
- AFB / America向け取引痕跡

#### T1-3 Swiss trade press targeted search
**状態:** ACTIVE, BUT NARROW ONLY

検索軸:
- ARSA + aveugles / Blinden / braille
- ARSA + réveil / Alarm + 1954–1962
- American Foundation for the Blind / AFB + Swiss watches
- Auguste Reymond + USA / veterans / blind

**禁止:** 同じ一般語の広域検索をもう一周しない。

---

### P2 — 現存個体の比較で系譜を固める

#### T2-1 Survivor matrixを作る
**状態:** TODO

最低列:
- Brand / organization
- Approx. date
- Movement
- Jewel count
- Opener position / type
- Case material
- Diameter
- Dial / hand layout
- Caseback marks
- Source quality
- Sold / active / archive

対象:
- ARSA AS1475
- AFB / ARSA AS1475
- Enicar AS1475
- BEAT / Friedli AS1475
- A. Schild prototype
- later AFB De Luxe / AS1930
- Venus230 survivor lead（HOLD枠）

**目的:** 「似ている」を文章で語るのではなく、差分表で見る。

#### T2-2 opener / case architectureだけを比較
**状態:** TODO

- 4時クラウン内蔵式
- 6時外部open式
- 別push-button式
- hinge位置
- case diameter
- double-back / resonator構造

**目的:** 共通ケース説を無理に復活させず、共有設計要素と固有設計を分離。

---

### P3 — 故障・保存性

#### T3-1 Failure evidenceをsource別に表化
**状態:** TODO

分ける:
- direct touchによるsetting disturbance
- tactile hand break
- lid / bezel damage
- contamination through opened face
- repair-induced damage
- hinge / latch failure

**ルール:**  
「Blind watch一般」「ARSA固有」「今回個体」の三層を混ぜない。

#### T3-2 AS1475 donorで救える範囲を確定
**状態:** PARTIAL

generic donorで救いやすい:
- movement-side common parts

救いにくい:
- tactile hands
- tactile alarm hand
- tactile dial
- front lid / crystal
- hinge
- latch / spring
- crown-integrated pusher
- blind-specific case geometry

---

### P4 — 市場・価格

#### T4-1 sold-resultを集める
**状態:** TODO / LOW DATA

採用:
- mechanical ARSA Blind Alarm
- AFB mechanical Blind Alarm
- 可能ならmovement / size / conditionが判別できるもの

除外:
- non-alarm Braille watch
- quartz tactile watch
- conversion / recase
- seller asking onlyをsold price扱い

**現状:** sold dataset不足。¥41,721が「絶対安い」とは断定しない。

---

### P5 — 保留テーマ

新証拠が出た時だけ再開。

- Morton Ollendorff / Swiss Braille-watch factory
- later AFB De Luxe maker identification
- Venus230 ARSA production-family confirmation
- A. Schild prototype exact chronology
- universal case supplier
- 現行ARSA case-number continuityの工場レベル証明

---

## 6. 購入判断の現在ゲート

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
- **ムーブメント写真**
- 中身の状態
- caliber
- inside caseback / case marks

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

1. **sellerのムーブ写真待ち**
2. 来た瞬間にmovement / corrosion / alarm train / case marksを判定
3. 待ち時間は **AFB Archive / Mémoires d'Ici / Swiss trade pressの狭い一次資料探索**
4. 並行して **survivor matrix** を構築
5. sold-resultは補助線として回収
6. HOLDテーマは新証拠が出るまで触らない

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
