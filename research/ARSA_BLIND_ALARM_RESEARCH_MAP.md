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
- **01 period image:** 1970 DavoineのA. Reymond社広告を1点使用。blind watchとalarm wristwatchが同じ企業specialty欄に並ぶ会社レベル証拠として使い、Blind Alarm本人の広告とは扱わない
- AFBや米国流通は、ARSAとの直接接続が取れる時だけ会社史の主線へ入れる

### ② 需要背景 — なぜ触読できる腕時計／アラームが必要だったか
- 触覚時計はARSA以前から存在すること
- 視覚障害者が時刻を自力で読むための触読時計文化
- 戦傷失明者支援、AFB等による調達・改造・配布・修理の制度化
- **背景史はARSA Blind Alarmを理解するためのCONTEXT**。1945 WPBや1970年代AFB流通そのものを研究目的へしない

### ③ ARSA Blind Alarmそのものについて分かっていること
- **03 period image gate:** 1956–60のARSA Blind Alarm本人を名指し／図示する広告・catalog・price listは未回収。近似ARSA / AFB / Enicar等を代用品広告として入れない。1950年代一次資料で本人を確認できた時だけ画像採用を再判定
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


### 3.4 OWNER'S NOTE copy working state — query-time CURRENT

このWATCHの**現在進行中コピー状態**は、このMAPをquery-time ownerとして扱う。採否・起点・撤回理由の履歴は `CHANGE_DECISIONS.md` に残すが、短いCURRENT確認のたびに巨大な履歴全文を先に読む必要はない。

- **Catch WORKING_MAIN / USER-origin**: `開けて、触って、聞く。`
- **Public FINAL status**: 未実施
- **Currently published catch**:
  - `蓋を開けて、時刻を触る。`
  - `アラームの予約時刻まで、指先で読む。`
- **State rule**: WORKING_MAIN と currently published copy は別状態。公開ファイルにある文面だけを見て、WORKING_MAINまで同一とみなさない。
- **Ancestry**: 2026-10-03 12:52 JSTの判断履歴で、Catch `開けて、触って、聞く。` = `WORKING_MAIN`、公開FINAL化は未実施と固定。起点はユーザー。
- **Next reality gate**: published FINALへ昇格するのは、ユーザー明示採用 + 実装 + 検証後。会話記憶や後発AI案だけで反転しない。

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

1. **ARSA会社史 — DEEP DIVE ① PASS 1 COMPLETE 2026-10-03**
   - 1898 Tramelan創業 → 1903工場 → 1926 Unitas取得 → 1931–33業界再編でfinished-watch ARSA / ébauche Unitasを分離、までの骨格を固定
   - early 1950sにblind / Braille watch系統、mid-1950sにalarm wristwatch系統が存在
   - 1969 / 1970 Davoineで`Montres pour aveugles`、1970にはさらに`Montres bracelet réveil`を同じA. Reymond社広告で確認
   - 1960sにはTramelan最大級の雇用主、1972 merger後も1973にblind watchesを製造品目として確認
   - **サイト用の主眼:** ARSAは「盲人用時計だけの会社」ではなく、finished watchesを広く作る大規模メーカーの中に tactile watch と alarm watch の両系統があった
   - **残る一次資料穴:** 1948 company brochure本文、1973 75周年資料本文、1954–55 alarm introductionのperiod primary
   - **1958 JSH No.2:** A. Reymond 60周年記事の存在は確認。本文未取得のためBlind Alarm掲載有無はOPEN。現時点では01/03のblockerにしない
2. **需要背景 — DEEP DIVE ② PASS 1 COMPLETE 2026-10-03**
   - 触読時計の発想は少なくとも1887年のtouch-readable watch特許まで遡り、第一次大戦より前から存在
   - WWIではSt Dunstan's / 現Blind Veterans UKが、失明軍人のrehabilitationと自立の象徴として触読時計を利用
   - AFBは1926年にWalthamとの時計供給を含むwatch-accommodation serviceを引き継ぎ、民間向けassistive-device流通を制度化
   - WWIIではAFBが1943年から失明軍人へBraille watchを配布。初期には寄付時計を清掃・修理し、触覚点を追加した例も多い
   - 日本でもSeikoshaが1939年に視覚障害者向け触読懐中時計を製作し、戦時中に失明軍人への授与例あり
   - **サイト用の主眼:** 戦争が触読時計を発明したのではなく、既存技術をrehabilitation / procurement / training / repairの制度へ押し上げた
   - 1950年代のBlind Alarmは、その既存触読時計文化へmechanical alarm wristwatch機能を加えた第二段階として扱う
   - **禁止:** veteran demand → ARSA開発、AFB gift program → ARSA受注を直接因果として書かない
3. **ARSA Blind Alarm本人 — DEEP DIVE ③ PASS 1 COMPLETE 2026-10-03 / ARRIVAL SUPPLEMENT PENDING**
   - around 1956にARSA Blind Alarm / AS1475、1958掲載個体を専門書で確認
   - **AS1475 core:** 25.94 mm / 5.8 mm / 17J / 18,000 A/h / 2 barrels / hand-wound clock + alarm / ca.40 h / alarm 10–15 s / 1954–1970
   - standard AS1475ではupper crown = alarm、lower crown = clockwork。ARSAではlower ~4 crownの中央pusherがfront cover openerを兼ねる
   - **1967 period ARSA cross-check:** SwisstimeのARSA hunter pocket watchでもwinding crown上のbuttonでcoverを開く仕様を確認。したがってcrown-integrated cover releaseはBlind Alarmでaccessibilityに有効な構造だが、**accessibility専用に発明されたとは扱わない**。同一case / supplier / 直接系譜は未証明
   - ARSAについて専門書は、current timeだけでなく**set alarm timeも触って確認し、2時側alarm crownで再設定できる**と明記
   - AS1475自体はdirect central seconds対応だが、ARSA Blind Alarmではseconds handを省略。直接触読の邪魔を避ける用途adaptation
   - tactile UIはraised hour points + robust hour/minute hands + separate alarm hand + opening front cover。購入個体では12時3点、太い時分針、細いpatterned alarm pointer、9時hinge、4時crown-integrated pusherを画像確認
   - **hand codingの起点はユーザー観察。** ARSA個体のalarm pointer表面が本当に触覚ridgeか、3本を重なり時にも識別できるかは到着後実測
   - failure evidenceは「ARSA固有」と「touch-watch一般」を分離。ARSA固有の慢性hinge弱点や高故障率は未証明
   - model variationはAS1475系を確定本線とし、Venus230 Blind Alarmはforum survivor lead / HOLD。non-alarm ARSA tactile watchesと現行ARSA blind watchesではopen positionが4 / 6 / 3等に分かれ、ARSA共通の単一case architectureとはしない
   - **arrival test:** alarm ON/OFF crown state（early AS1475はcrown down、ca.1960以降のlater typeはpulled up）を確認。movement revisionの年代手掛かりにはなるがwatch assembly date確定には使わない
   - 到着後の触覚操作実測を重視

### P0.5 — 設計思想 / 設計資料
**状態:** PASS 2 COMPLETE / ARCHIVE BONUS ONLY

Deep Dive ③を比較へ進める前に、ARSAの「なぜこの形なのか」を示す設計思想・仕様・設計資料を追加で掘る。

現時点の到達:
- **1950s ARSA factory design drawing / engineering specification / Blind Alarm patent:** indexed Webでは未発見。不存在の証明ではない
- **1946 period company profile:** A. Reymondは新規性・技術改良を重視し、企業原則を「Art et technique」「Beauté et précision」と掲げる。blind-watch固有資料ではないが、blind line直前の企業設計文化として使える
- **2004 Hochparterre / Thomas Loosli:** designersから多数の改善提案を受けても、ARSA tactile watchでは「simple form」が最適なuse valueを保証すると繰り返し確認された、と直接発言
- 同記事でSZB側は、mechanical tactile watchのhand mechanismは構造上すぐずれにくいことを評価。ARSA設計の実用品価値を当事者流通側が説明
- **2010 Worldtempus / Thomas Loosli:** 長く実用性が美観より優先されたが、ARSAは「美しく、触って心地よい」blind watchも作ったと説明
- **modern ARSA / AVH:** modelごとに12 / 3 / 6 / 9とその他hour markersを異なるline / double-dot / single-dot / rough synthetic stone等で符号化。roughnessがreadabilityを高めると明記する製品もある
- **2014 Europa Star:** ARSA Hi-Touchはhandsを触ってもsettingを乱しにくいrobust fixing systemを持つと説明
- **2004 L'article:** 1994にARSA tactile lineを再開発し、Thomas Loosliがblind associationsとのregular contactを必要としたと述べる。ただし1950s original designのco-design証拠には使わない
- Mémoires d'IciのA. Reymond dossierに **“Zeit spühren = Toucher l'heure” (2008-04-24)** が存在。内容未取得だが、現時点で最も直接的なdesign-philosophy archive target

現在の仮説:
- ARSAに固定された「Braille code」が一つ存在したというより、**simple / robust / hard-to-displace / orientable / discreet / pleasant-to-touch**を満たすためにmodel別のtactile vocabularyを選んだ可能性が高い
- これは2000年代以降のARSA資料ではかなり明示されるが、1950s Blind Alarmへ同じ思想をそのまま遡及適用しない
- 1950sについては現物構造 + specialist descriptionから設計要件を復元できるが、factory自身のdesign statementはまだOPEN

停止判断:
- focused passを2回実施しても、1950s ARSAのfactory drawing / engineering specification / manual / tactile-watch patentはindexed Webから未回収
- “Zeit spühren = Toucher l'heure” はarchive itemとして残すが、本文未取得
- よって**factory design document not recovered**を現在状態として明示し、設計要件は「現物 + 専門書 + 前史 + 後年ARSAの明示的思想」からsource-labeled reconstructionとして扱う
- archive本文やperiod technical sheetが後日取得できた時だけ再開する

---

### P1 — 触読alarm比較
**状態:** DEEP DIVE ④ PASS 1 COMPLETE 2026-10-03

比較対象と現在の確度:

- **ARSA / AS1475 — SOURCE-CONFIRMED**
  - around 1956、1958掲載個体
  - 4時crown内蔵pusherでfront coverを開く
  - tactile hour points、robust hour / minute hands、seconds handなし
  - 2時側alarm crownでset alarm timeを設定し、そのalarm time自体を触ってread-back可能
  - 購入個体では12時3点、細いpatterned alarm pointer、9時hingeを画像確認。patternが触覚ridgeかは到着後確認

- **AFB-marked / ARSA-ordered according to Beitl / AS1475 — SPECIALIST SOURCE**
  - ca.1960、gold-plated case / steel screw back
  - raised tactile hour points、robust minute / hour tactile hands
  - 4時crown内蔵opener、hinged glass cover
  - BeitlはARSAへ発注しARSA自社モデルとidenticalとする
  - **独立した別設計として数えない。** AFB↔ARSA取引はinstitutional primary未確認

- **Enicar / AS1475 — SOURCE-CONFIRMED**
  - ca.1957のBlind AlarmをBeitlで確認。stainless / gold-plated variants
  - 4時crownのbuttonでcoverを開き、seconds handなし
  - Horlbeckの1964 Lausanne specialではclockwork crownとalarm crown自体も触覚的に混同しにくく設計
  - exact hand coding: minute ≈1.6 mm、hour ≈2.9 mm、alarm ≈0.7 mm + tip four ridges
  - 3 / 6 / 9 markersを特に大きくする
  - current time + set alarm timeのread-backを明示
  - **exact widths / four ridgesは1964 special個体固有として扱い、1957全個体へ一般化しない**

- **BEAT / Friedli-Frères / AS1475 — SOURCE-CONFIRMED**
  - chrome-plated metal case Ø33.8 mm、screw back
  - blue dial + raised tactile points、white tactile hands
  - movement signed Friedli-Frères
  - **openerは4時crown内蔵ではなく外部6時**
  - hand別のridge / notch / read-back詳細はsource textでは未固定

- **A. Schild prototype / AS1475 — SOURCE-CONFIRMED EXISTENCE / UI DETAILS OPEN**
  - stainless case、AS1475のBlind Alarm prototype
  - 現行専門書記述ではprototype存在以上のtactile coding / opener geometryを固定できない
  - **ARSAのancestorとはしない**

- **afB De Luxe / AS1930 — AUCTION-CATALOG SURVIVOR**
  - ca.1970、33 mm、gold-plated case + steel screw back、17J
  - jump cover、tactile points、central alarm hand、alarm function
  - maker OPEN。AFB / ARSA連続系列とはしない
  - AS1475世代の後もtactile alarmという製品形式がAS1930世代へ残ったことを示すsurvivor evidence

- **BEAT / Friedli-Frères / AS1930 — FORUM SURVIVOR / HOLD**
  - movement photo claim: AS1930 signed Friedli-Frères
  - forum観察では6時側にhood-like opening
  - later distributor / IRTI attributionとca.1960 datingはそのまま採用しない
  - confirmed matrixの補助leadに留める

比較から固定できること:

1. **共通なのは完成ケースではなく要求仕様。**
   - coverを開いて直接触れる
   - dial orientationを取れる
   - hour / minute / alarmを区別できる
   - secondsを排して誤操作・干渉を減らす
   - set alarm timeを扱える

2. **AS1475は共通platformだがhuman interfaceは複数解。**
   - ARSA / Enicar: 4時crown-integrated opener系
   - BEAT: 6時external opener
   - よってcommon caliberからcommon complete case / universal case supplierへ飛躍しない

3. **hand codingは固定industry codeではなくdesign grammar。**
   - Enicar 1964 specialは幅 + ridgesまで明示
   - ARSAはread-back機能を明示するがexact tactile codeは未記載
   - BEATはtactile handsを確認できるが個別coding未記載
   - 「時針=この模様」等の全社共通規則は未確認

4. **AFB-marked AS1475はARSA比較の独立メーカー行ではない。**
   - Beitl自身がARSA自社modelとidenticalとするため、design variationではなくcommission / institutional-marking variationとして扱う

5. **A. Schild prototypeの存在は、ébauche maker自身もtactile-alarm use caseを試した証拠。**
   - ただしARSA / Enicar / BEATへの設計継承は未証明

6. **AS1930 survivorsはcategory continuityを示すがmaker continuityは示さない。**
   - afB De LuxeやBEAT leadがあっても、ARSA後継系列とはしない

**サイト用の主眼:** 「同じAS1475を積んだ似た時計」ではなく、**同じ accessibility requirement に対して、各社が針・目盛・蓋・操作子へ別々の触覚UIを与えた**比較にする。

### P2 — AS1475 platformと変貌種
**状態:** PASS 1 COMPLETE / CLOSING FRAME FIXED

最低限:
- 通常のAS1475 alarm wristwatchとしての普及
- Benedict Park-O-Phon — AS1475 + parking-time indication
- tactile / Blind Alarmへの外装・UI adaptation
- AS1568 / AS1930 / AS1931のfamily progression
- Citizen / Poljotなどdirectly based examplesは、ARSA本文に必要な範囲で扱う

**目的:** ARSAを孤立した珍品として終わらせず、AS1475という普及platformが用途で変貌した一例として戻す。

### P3 — BONUS / CONTEXT archive
**状態:** NON-BLOCKING

- **JSH No.2, mars-avril 1958 — A. Reymond 60周年記事本文**。1958年通年スキャンはThe Watch LibraryでPublic Domain / 822 pagesまで確認済み。記事本文は未取得。Blind Alarmを名指し／図示する場合のみ03へ昇格
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

1. **①作った会社 — PASS 1 COMPLETE** — 会社史・製造能力・blind / alarm両系統の同時存在まで整理済み。残る一次資料穴だけHOLD
2. **②需要背景 — PASS 1 COMPLETE** — 前史 / WWI / AFB 1926 / WWII / 日本例まで必要十分に圧縮。戦争は発明起源ではなく制度化・普及の背景として固定
3. **③時計本人 — PASS 1 COMPLETE / ARRIVAL SUPPLEMENT PENDING** — mechanism / controls / tactile UI / failure map / model variation / purchased specimenまで整理。到着後にhands / read-back / opener / early-late alarm-stateを実測追記
4. **③b 設計思想 / 設計資料 — PASS 2 COMPLETE / ARCHIVE BONUS ONLY** — factory design documentは未回収。source-labeled requirement reconstructionを採用し、archive本文取得時のみ再開
5. **④触読alarm比較 — PASS 1 COMPLETE** — ARSA / AFB-ARSA / Enicar / BEAT / A. Schild / later afBをhand coding / opener / read-back / source tierで比較済み
6. **⑤AS1475と変貌種 — PASS 1 COMPLETE / CLOSING FRAME FIXED** — AS1475を「特殊時計用caliber」ではなく、1954–1970に約78万個作られた普及platformとして起点化。通常alarm → Benedict Park-O-Phonのparking UI → ARSA / Enicar / BEAT等のtactile UI → date派生AS1568 → 高振動後継AS1930 / 1931 → Citizen / Poljot等のdirectly based descendantsまで、同じ機構骨格が別用途・別地域へ展開した流れを固定
7. 到着後、購入個体で**時・分・alarm handの触り分け / alarm設定時刻read-back / front-cover操作**を実測する
8. **03のperiod-ad探索はHOLD。** ARSA Blind Alarm本人を名指し／図示する1950年代広告・catalog・price list、または1958 JSH本文が取れた時だけ再開する
9. AFB契約書、Smithsonian、WPB等は、上記1〜6の未解決を直接埋める場合だけ再開する

---

## 9. 研究上の禁止事項

- 今回個体のmovementは画像で**AS1475 / 17 JEWELS確認済み**。ただしcaliber identityから製造年・ケース材・1958掲載個体との同一性を推定しない
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
