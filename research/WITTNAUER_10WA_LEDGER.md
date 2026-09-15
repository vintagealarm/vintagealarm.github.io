# Wittnauer 10WA — Research & Decision Ledger

このファイルは、Wittnauer 10WA の調査・取捨選択・未解決事項を固定管理する正本。
新しい資料が出た場合は、既存結論を上書きせず、根拠と変更理由を追記して更新する。

## Mandatory preflight

10WA を調査・執筆・実装する前に、必ず次の順で確認する。

1. GitHub の最新 `AGENTS.md` / `SITE_RULES.md` / 関連WATCH実装
2. Project PDF: Michael Philip Horlbeck, *The Alarm Wristwatch* / Leonhard Beitl, *Alarm am Arm*
3. ユーザー所有個体の画像・実測・操作記録
4. 一次資料: 特許、広告、取説、サービス資料、業界誌、メーカー資料
5. 信頼できる専門Web / 修理資料 / 実機分解記録
6. 一般Web / SNS / 販売記事

GitHubを単なる参考資料扱いにせず、毎回の調査開始点として扱う。
Webの多数決で専門書・一次資料を上書きしない。

## Evidence classes

- `ADOPTED`：本文 / DEEP DIVE へ使用可
- `HOLD`：有力だが未確定。採用条件を保持
- `REJECTED`：現状不採用。棄却理由を保持し、新証拠なしで復活させない
- `CONFLICT`：資料間で衝突。統一せず両説を保持
- `OBSOLETE`：新証拠で失効した旧結論。復活禁止
- `OPEN`：未解決。追加調査対象

## Current decisions

### ADOPTED

- 10WA は時刻機構とは別系統のアラームモジュールを持つ。
- アラーム側には独立した香箱がある。
- アラームモジュールは文字盤側に積層される。
- 回転ベゼルの反時計回り操作で、アラーム時刻設定とアラームゼンマイ巻上げが同時進行する。
- Horlbeck は約1.5回転付近で最大巻上げとなり、それ以上の無理な操作で伝達歯を損傷し得ると記述する。
- Horlbeck は10WAを「functionally independent clockwork + independent alarm module」とする genuine modular caliber の代表例として説明し、両者の接続点は release apparatus と記述する。
- 所有個体のシースルーバックから見えるのは時刻側ムーブメントで、アラーム機構は見えない。この観察は文字盤側モジュール配置と整合する。
- 「裏スケなのにアラームが見えない」は OWNER'S NOTE / DEEP DIVE の実物説明材料として有効。
- Beitl は 10WA を 1950年代前半の Wittnauer 初期アラームとして扱い、その後の Wittnauer は AS 製アラームムーブメントへ移行したと記述する。
- Beitl のブランド一覧では、10WAの後続として少なくとも `AS 1475` / `AS 1568` / `AS 1931` / `AS 5008` を搭載した Wittnauer Alarm / Automatic Alarm が確認できる。これは「10WA独自系から後続AS系へ移行した」という**系譜上の事実**には使えるが、移行理由そのものの証拠には使わない。
- Horlbeck / Beitl とも、ベゼル張り出し・後方へ絞られたケース・小型リューズを10WAの構造と操作性に関係する特徴として扱う。
- 後年の市場記録では、少なくとも `Ref.1215` のステンレス個体と `Ref.1216` / `1216A` の金張り系個体が複数確認される。ただし公式リファレンス表としては扱わない。
- 後年の修理・実機報告では、不適切なベゼル操作に起因するとされるアラーム側歯車損傷の実例が複数見つかる。これはHorlbeckの操作上の危険記述と整合するが、発生率や製品全体の「壊れやすさ」を示す統計ではない。

### CONFLICT

#### ベースムーブメント（未解決）

- Horlbeck / Beitl：Longines系手巻きベースと記述。
- Horlbeck は 10WA を「機能上独立した時刻機構＋独立アラームモジュール」の genuine modular caliber と説明し、時刻側を hand-wound Longines caliber と明記する。
- Beitl も Wittnauer 10WA を独立した Longines 手巻きムーブメント＋別作動のアラームモジュールと記述する。
- 一方、Bestfit 系部品情報では AS 1200 用の setting bridge / balance cap jewel screw / winding stem などが WITTNAUER 10S / 10SC / 10WA と互換対象に列挙される。
- American Watchmakers Institute の1969年 Technical Bulletin は `Wittnauer 10S (AS 1200)` と明記する。これは10Sの同定には強いが、10WAの直接同定ではない。
- 重要：部品互換および10SのAS1200同定は `10WA = AS 1200 base` の直接証明ではない。現時点では「時刻側に AS 1200 family と強い部品互換性がある」まで。
- Forum / repair user report には「10WA の basis は AS 1200」とする主張があるが、一次 / メーカー技術資料では未確認。
- Longines 10L / 10.68Z と AS 1200 は、どちらも概ね10.5 ligne・17石仕様あり・18,000振動という近い条件を持つため、外径や石数だけでは判定不能。
- Longines 10.68Z の技術資料では 10.5 ligne、17石、小秒針、18,000 A/h と確認できるが、これ自体は10WAとの接続証拠ではない。
- 現時点で `Longines Cal.10`、`Longines 10L/10.68Z`、`AS 1200 base` のいずれも確定しない。
- 採用条件：地板レイアウト、部品番号体系、サービス資料、メーカー資料、明確な同定写真のいずれかで直接比較する。

#### Longines / Wittnauer の企業関係（10WA成立時）

- Hodinkee、Ranfft、一般的なブランド史には「1950年にLonginesがWittnauerを買収」とする説明が広く流通する。
- 一方、FTC 1958資料は Longines-Wittnauer Watch Company, Inc. を米国でスイス製ムーブメント・部品を輸入しニューヨークで組立・販売する法人として記載するが、これだけでは Swiss Longines S.A. による1950年買収の法的関係を直接証明しない。
- Pierre-Yves Donzé のLongines企業史研究は、Wittnauerを米国で組立・仕上げを担った長期パートナー / distribution company として論じ、1970年にWestinghouseがLongines-Wittnauerを引き継いだとする。
- 1955年の米国訴訟資料には Longines / Wittnauer の株式関係を示す記述があるが、同名法人・米国法人・スイス法人の切り分けが必要。
- よって「1950年にSwiss Longines S.A. がWittnauer全体を買収した」「10WAはLonginesとWittnauerの共同開発」とは現時点で確定しない。

### HOLD

- 「Longines Cal.10」説：Hodinkee / Watch-Wiki 等の二次資料では見られるが、現時点では一次 / 技術資料で未確定。
- `Longines 10L / 10.68Z` が10WA時刻側の具体的ベースである可能性：寸法・年代・振動数は整合し得るが直接資料なし。
- Longines銘10WAの小規模シリーズ説：Beitl は Longines 署名個体を掲載している。実物記録は重視するが、製造規模・市場・経緯は未確定。
- Leon M. Newhouse / Longines-Wittnauer の同時期 watch-case / dial design patent と 10WA の関係：時期は近いが対応未証明。
- `US2566741A` (Watch casing, priority 1948-07-10) と10WAケース設計の関係：権利者・時期は近いが、現時点で10WA対応を示す請求項・図面照合は未完了。
- 「10WAアラームモジュールの特許取得」説：SNS上の証言あり。対応特許未特定。
- `CH45807A` (Wittnauer & Co., priority 1908-11-27, Sonnerie pour mouvements d'horlogerie) はWittnauer名義の古い打鈴機構特許として確認できるが、10WAとの技術的・法人上の直接系譜は未証明。歴史的背景候補に留める。
- `US1160065A` (Wittnauer Co., priority 1913-07-18, Striking attachment for timepieces) はWittnauer名義の別の古い打鈴機構特許として後年のstriking-work特許から参照されている。10WAとの直接系譜は未証明で、歴史的背景候補に留める。
- Hanhart Cal.301 は Horlbeck / Beitl で1951年開始、回転ベゼルによるアラーム時刻設定が確認できる。一方「ベゼル操作そのものがアラームを巻上げる」ことは、現時点で確認した専門書本文では明示されない。Beitl掲載の当時広告も `Weckerzeigereinstellung durch drehbaren Glasreif` と設定機能を明記するが、巻上げ機能は記載しない。
- Hanhart当時広告に `D.PAT. NR.873525` と読める表示がある。これがどの特許庁・どの公報番号・どの請求範囲を指すかは未特定。同番号のGB/FR検索結果は年代・内容が一致せず、番号一致だけで結びつけない。
- `Ref.1215 / 1216 / 1216A` の公式な材質・市場・年代区分：後年の販売・オークション記録では繰り返し確認できるが、メーカー一次表未発見。
- Mister Wolf Time 掲載のRef.1216には original Longines-Wittnauer fitted box と guarantee/warranty booklets が付属する。冊子現物の内容が読めれば当時資料へ昇格する可能性がある。
- 「1950年にLonginesがWittnauerを買収」説：流通する二次情報は多いが、法人関係が複雑で一次・学術資料の整理が必要。
- 「10WAはLonginesとWittnauerが米国市場向けに共同開発した」説：Hodinkee等に記載があるが、現時点ではメーカー一次資料を欠く。
- 「10WAは操作が不便かつ壊れやすかったため早期に放棄され、AS系へ置換された」という因果説明：Cinci Watches等の二次記事には明記があるが、メーカー一次資料・当時業界資料で未確認。**後続AS採用の事実**と**採用理由**を分離する。
- AS 1475 はHorlbeckが mass-produced かつ reliable と評価しているため、Wittnauerが後続でAS系を採った背景として「量産性・信頼性・整備性・調達性」が合理的候補にはなる。ただしWittnauer自身の意思決定資料がないため推測扱い。

### REJECTED

- 「10WAが世界初の回転ベゼル式アラーム」：Eterna等の先行する回転ベゼル式アラーム設定例があるため不採用。
- 「Hanhart 301 が10WAより先に“ベゼルでアラームを巻上げ＋設定”したことが確定している」：現時点で確認したHorlbeck / Beitlは回転ベゼルによる時刻設定を記述するが、ベゼルで独立アラームゼンマイを巻く構造とは確認できない。先行性の決定打としては不採用。
- 「10WAが世界初のベゼルで設定＋巻上げを行うアラーム」：先行比較の一次確認と10WAの正確な発売時期が不足しており、現時点で断定不可。
- 「Longines-Wittnauer名義のwatch-case patentがある = 10WAの特許」：論理飛躍のため不採用。
- 「ケースにLongines-Wittnauer表記がある = 時刻ムーブメントもLongines製」：ケース証拠とムーブメント製造者を混同するため不採用。
- `US2937271A` を 10WA の特許とみなすこと：1957年出願の遠隔信号用 signalling/alarm device で、10WAとは別物のため不採用。
- `USD163314S` を 10WA アラーム機構の特許とみなすこと：watch dial の意匠特許であり、アラーム機構の請求ではないため不採用。
- `USD153008S` を 10WA アラーム機構の特許とみなすこと：1948年出願の ornamental watch design であり、機構特許ではないため不採用。
- `US2362245A` を 10WA のアラーム / ベゼル特許とみなすこと：1942年出願・1944年公開の航空機計器時計向け winding and setting mechanism で、アラームモジュールを請求していないため不採用。
- `CH45807A` を10WAモジュール特許とみなすこと：1908/1909年の別時代の打鈴機構で、10WAとの直接対応を示す証拠なし。
- 販売記事に `Longines Cal.10 base` と書かれていることだけでベースムーブメントを確定すること：孫引きの可能性があるため不採用。

### OBSOLETE

- 「10WA = AS 1200ベースで確定」：専門書との衝突が解消していないため撤回。
- 「10WA = Longines Cal.10で確定」：直接根拠不足のため撤回。
- 「Longines-Wittnauer の1950年前後の特許を見つけた = 10WAモジュール特許を発見」：内容照合前の旧判断として禁止。
- 「Hanhart 301 がベゼルで設定と巻上げを同時に行うため10WAの先行例で確定」：専門書再確認により、少なくとも巻上げ部分は未確認へ戻す。

## Open research questions — priority order

1. 10WAアラームモジュールの対応特許を特定できるか。
2. 出願人 / 発明者 / 優先日 / 同族特許 / 請求項と10WA構造の対応。
3. 時刻側ベースムーブメントの確定：Longines系かAS1200系か、または別の説明が必要か。
4. 1950年代初頭の当時広告、カタログ、取扱説明書、サービス資料。特に「ベゼルで設定＋巻上げ」を当時どのような利点として説明・販売したか。
5. Longines銘10WAの追加個体・市場・製造経緯。
6. 10WAの発売開始年 / 終了年 / ref.展開。
7. ベゼル操作方式の先行例・同時代比較と、10WA固有点の確定。
8. なぜWittnauerが後続でAS系アラームへ移行したのか。**移行そのものは確認済み、理由は未確認**。
9. ケース形状・張り出しベゼル・小型リューズの関係を技術資料で裏付けられるか。
10. 所有個体の実測：鳴動時間、操作量、音、ベゼル回転量など。
11. 1950年前後のLongines / Wittnauer / Longines-Wittnauer各法人の所有・開発・製造関係を一次資料ベースで整理できるか。
12. Hanhart広告の `D.PAT. NR.873525` を正しいドイツ特許公報へ同定し、請求対象がベゼル設定・停止・音響等のどれかを確認できるか。
13. 10WAの整備性について、当時またはメーカー系のservice bulletin / parts sheet / watchmaker instructionを発見できるか。現時点の「整備が難しい」は後年修理報告中心。

## Evidence source register

### Project / specialist books

- Michael Philip Horlbeck, *The Alarm Wristwatch* (Schiffer, 2007), pp.152–153：Wittnauer 10WA。modular caliber、Longines hand-wound base、独立 alarm barrel、回転ベゼルで alarm set + winding、約1.5回転付近の巻上げ限界、伝達歯の破損リスク、tone spring、ケース形状と小型リューズの関係。
- 同書、alarm module 解説章：genuine module の接続点は release apparatus、Wittnauer を代表例として説明。
- 同書、AS 1475の歴史・技術解説：AS 1475を mass-produced product としつつ reliable と評価し、Fortis Managerでのchronometer test例を記載。これはAS 1475一般の評価であり、Wittnauerの採用理由を直接示すものではない。
- Leonhard Beitl, *Alarm am Arm* (2009), Wittnauer pp.500–502：10WA、Longines hand-wound movement + separate alarm module、回転ベゼル、tone/gong、1950年代前半、後続AS採用。
- 同書、ブランド / キャリバー一覧：Wittnauer 10 WAのほか、Wittnauer Alarm Watch / Alarm / Automatic Alarm に AS 1475 / AS 1568 / AS 1931 / AS 5008 を確認。
- 同書、Longines pp.295–296：Longines署名 10WA 個体を掲載。少数自社seriesという説明部分は推測として扱う。
- 同書、Hanhart pp.206–211：Sans-Souci / Cal.301、1951頃の広告、回転ベゼル式 alarm setting、後期停止スライダー。広告では `Weckerzeigereinstellung durch drehbaren Glasreif` と設定機能を明記し、`D.PAT. NR.873525` 表示が見える。
- Horlbeck Hanhart 301章：1951–1956、1香箱、lunetteでalarm time設定。確認範囲ではlunetteによる独立alarm spring巻上げとは記述していない。

### User specimen

- `IMG_5490.jpeg`：正面。金色ケース、特徴的なインデックス、青い波形アラーム針。
- `IMG_5386.jpeg`：腕載せ。
- `IMG_5758.jpeg`：シースルーバック。`WITTNAUER` / `SEVENTEEN 17 JEWELS` / `10WA`刻印を視認可能。時刻側ムーブメントは見えるがアラームモジュールは見えない。
- `IMG_7643.jpeg`：側面。張り出したベゼル、ケースの絞り、リューズ配置を観察可能。
- 重要：所有個体の刻印は10WA同定には使えるが、時刻側ムーブメントの元メーカー同定には単独使用しない。

### Primary / patent candidates checked

- `US2937271A` — Longines-Wittnauer Watch Co. Inc., filed 1957-10-25, signalling/alarm device。遠隔信号用途で10WAとは別物。REJECTED。
- `US2566741A` — Longines-Wittnauer Watch Co. Inc., priority 1948-07-10, *Watch casing*。10WAとの対応未証明。HOLD / 直接機構特許扱い禁止。
- `USD163314S` — Leon M. Newhouse / Longines-Wittnauer, filed 1950-01-12, watch dial design。機構特許ではない。REJECTED as 10WA alarm patent。
- `USD153008S` — Leon M. Newhouse / Longines-Wittnauer, filed 1948-07-10, *Design for a watch*。ornamental designのみ。REJECTED as 10WA alarm patent。
- `US2362245A` — Louis Cohen / Longines-Wittnauer, priority 1942-05-20, *Winding and setting mechanism for watches*。航空機計器時計の前面stemによる巻上げ・時刻合わせ機構。10WA alarm/bezel機構とは別。REJECTED as direct 10WA evidence。
- `CH45807A` — Wittnauer & Co., priority 1908-11-27, *Sonnerie pour mouvements d'horlogerie*。Wittnauer名義の打鈴機構特許として存在確認。10WA直接対応なし。
- `US1160065A` — Wittnauer Co., priority 1913-07-18, *Striking attachment for timepieces*。後年の複数のstriking-work特許で先行技術として引用される。10WAとの直接対応なし。
- Hanhart 公式履歴：Sans-Souci を1951年発売、Cal.301、patented とする。特許番号・請求範囲の直接確認は未完了。
- FTC 1958 complaint/decision：Longines-Wittnauer Watch Company, Inc. とその子会社がスイス製ムーブメント・部品を輸入し、New Yorkで組立・販売していたことを記載。10WA個別製品の証拠ではない。
- 1950年代の10WA広告 / カタログ / 取扱説明書 / service sheet：今回も本文を読める真正一次資料は未発見。未発見は「存在しない」の証明には使わない。

### Technical parts / specialist web

- American Watchmakers Institute, Technical Bulletin (1969)：`Wittnauer 10S (AS 1200)` と記載。10Sには強い同定資料、10WAへの直接証明ではない。
- Time Connection II / Bestfit database：AS 1200 factory part 445/654 (set bridge) の compatible caliber に WITTNAUER 10S / 10SC / 10WA を列挙。
- Time Connection II / Bestfit：AS 1200 系 lower balance cap jewel screw の互換群に WITTNAUER 10WA を列挙。
- winding stem interchange lists：AS 1200 系と WITTNAUER 10WA の共通 stem 情報あり。
- Bestfit互換一覧は多数のブランド/派生caliberを横断しており、部品互換性の証拠としては有効だが、base caliber同定の証拠力は低い。
- Ranfft：AS 1200 = 10.5 ligne, 23.7 mm, h 3.50 mm, 17石仕様あり, 18,000 A/h, 1945頃。Longines 10L / 10.68Z = 10.5 ligne, 23.65 mm, h 4.1 mm, 17石, 18,000 A/h, 1948頃。スペック近似だけでは判定不可。
- Longines 10.68Z technical sheet：10.5 ligne、17 rubis、小秒針、18,000 A/h と技術図面を確認。10WAとの直接接続資料ではない。
- `watch.weblog.to` の 10WA 分解記事：文字盤側に積層されたアラーム機構を実機分解写真で確認可能。筆者は分解手順資料を見つけられず、時計師から「不用意に触ると壊されやすい」趣旨の警告を受けたと記述。専門Web / owner repair report として扱い、メーカー一次資料とは分離。
- Uhrforumの2026年実機修理報告：過去の不適切なアラーム操作に起因すると判断されたアラームモジュールの歯車損傷を報告。Horlbeckの操作上の危険と整合するが、一個体の事例として扱う。
- Cinci Watches (2021)：10WAは操作が impractical で破損しやすく、Wittnauerが早期に生産をやめASムーブメントへ移ったと説明する。ただし一次資料を示していないため、因果説明はHOLD。
- Hodinkee (2025)：10WAのアラーム機構を finicky とし、過度なベゼル操作で壊れた個体が多いとの古いforum情報を紹介。二次情報としてのみ保持。
- Meticulous Watches：Ref.1216、10k gold filled、36mm、ケース内 `Longines-Wittnauer Watch Co. Inc`、ベゼル内部gongとhammer tipの記述。販売/時計師資料であり一次資料ではない。
- Private Eyes / Watchnet：Ref.1215、SS、36mm、serial 262,***、10WAの販売記録。
- Mister Wolf Time：Ref.1216とoriginal Longines-Wittnauer fitted box / guarantee-warranty bookletsの現存例。冊子本文未確認。

### Corporate-history references

- FTC 1958 decision：Longines-Wittnauer Watch Company, Inc. の米国での輸入・組立・販売活動を確認。
- Pierre-Yves Donzé, Longines corporate-history research：Wittnauerを米国でLongines watchesのfinish/assemblyを担った長期パートナーとして記述し、1970年のWestinghouseによるLongines-Wittnauer takeoverを記録。
- 1955 U.S. antitrust litigation：Longines / Wittnauer間の株式関係を示す記述あり。法人名の切り分けを要するため最終解釈は保留。
- Hodinkee / Ranfft /一般ブランド史：「1950 Longines acquired Wittnauer」説。二次情報として保持するが、上記法人資料と整合させるまで採用しない。

## Research log

### 2026-09-13 — GitHub正本化後の再監査

- GitHub `main` の `AGENTS.md` / `SITE_RULES.md` を先に確認し、既存サイト思想を調査条件へ反映。
- Horlbeck / Beitl を再検索し、両書が10WAを Longines 系手巻きベースと記述することを再確認。
- Beitl では10WAの後にAS 1475等のWittnauer alarmが続くことを確認。`10WA独自系 → 後続AS系` は専門書記載として採用可能。
- AS 1200説を再監査。10WAとAS1200の関係は複数の交換部品で確認できるが、部品互換を base caliber 同定へ飛躍させないことを明記。
- Hanhart 301 の先行性を再確認。1951年発売は Hanhart 公式で確認。ベゼル巻上げ＋設定は二次資料で確認できるが、一次操作資料は未確定。
- 10WA特許候補を再検索。`US2937271A` / `USD163314S` は対象外として明確に棄却。`US2566741A` はwatch casingであり、10WA対応が未証明のため保留継続。

### 2026-09-13 — Round 2: 特許 / ベースムーブメント / 当時資料の穴を再掘削

- HorlbeckのHanhart 301本文を再確認。lunetteはalarm time settingに使用、301は1香箱。現確認範囲ではlunette自体がalarm energyを巻くとの記述はない。従来の「Hanhartがset+winding先行例で確定」を `OBSOLETE` へ移動。
- `CH45807A` (Wittnauer & Co., 1908/1909) を発見。Wittnauer名義の古い打鈴機構特許という事実だけをHOLD。10WA特許への直結は禁止。
- AWI 1969の `Wittnauer 10S (AS 1200)` を追加。10SのAS1200同定と、10WAのAS1200部品互換を分離して記録。
- Longines 10L / 10.68Z とAS1200の仕様を比較。双方が10.5 ligne級・17石・18,000A/hで近く、寸法だけでは10WAのベース判定不能と判断。
- Ref.1215 / 1216 / 1216A の後年市場個体を複数確認。公式リファレンス体系とは分離して「observed examples」として採用。
- 1950年代の真正な10WA広告・取説・service sheetを複数語で探索したが、今回も本文を読める一次資料は未発見。`OPEN` 継続。
- Ref.1216のbox + guarantee/warranty booklets付き現存例を発見。冊子本文が取得できれば一次資料候補になるためHOLD。
- 「Longines acquired Wittnauer in 1950」「joint development for US market」を再監査。FTC、学術研究、1955訴訟資料と一般ブランド史で法人関係の表現が単純一致しないため、10WA記事では確定表現を避ける。

### 2026-09-13 — Round 3: 特許ノイズ除去 / Hanhart先行例 / base比較の証拠力を再評価

- Longines-Wittnauer名義の米国特許を追加探索。`US2362245A` は1942年出願の航空機計器時計向けwinding/setting mechanismで、alarm module / rotating bezelを請求しないため10WA直接証拠から除外。
- `USD153008S` は1948年出願のwatch ornamental designであり、10WA機構特許候補から除外。
- `US1160065A` は1913年優先のWittnauer名義 striking attachment として存在を確認。後年の打鈴特許から引用されるが、10WAへの直接系譜は未証明のため背景資料止まり。
- Beitl掲載Hanhart広告を再確認。広告本文は「回転するガラス縁でアラーム針を設定」と明記するが、ベゼル巻上げは記載しない。Horlbeckの1香箱構造とも整合し、Hanhartを10WAのset+winding先行例として使う根拠はさらに弱くなった。
- 同広告の `D.PAT. NR.873525` を追跡したが、文字列一致のGB/FR公報は年代・技術内容がHanhart 301と一致しない。管轄を確定せず番号だけで結びつけることを禁止し、正しいドイツ公報同定をOPENへ追加。
- Bestfit互換部品リストの対象範囲を再確認。多数のブランド/caliberが同一交換部品群に並ぶため、「10WAがAS1200の部品と互換」から「10WAのbaseはAS1200」と推定する証拠力を一段下げた。
- Longines 10.68Z技術資料を確認し、サイズ・石数・振動数・小秒針が10WA候補として整合し得ることは確認。ただし10WAとの直接リンクは依然ない。
- 1950年代10WAのメーカー広告 / 取説 / service sheetは今回も発見できず。未発見は「存在しない」の証明には使わない。

### 2026-09-15 — Round 4: 開発意図 / 整備上の代償 / 後続AS系への移行

#### 1. 当時広告・取説で何を利点として売ったか

- 1950年代のWittnauer 10WA広告、カタログ、取扱説明書、サービス資料を再検索したが、**今回も本文を読める真正一次資料は未発見**。
- よって「一操作で設定＋巻上げ」をWittnauer自身が“便利さ”“革新性”“簡単操作”として訴求した、と現時点では断定しない。
- Mister Wolf TimeのRef.1216現存個体に original Longines-Wittnauer guarantee / warranty booklets が付属することは再確認。冊子本文が取得できれば最優先の一次資料候補。
- 二次資料・専門書はベゼル操作を unusual / handy / unique / inventive と評価するが、これは後世評価であり当時広告文言とは分離する。

#### 2. 構造上の代償・整備上の評価

- Horlbeckが最も強い根拠。操作自体は「原理上とても簡単」としながら、アラームゼンマイが約1.5回転で全巻になるとベゼルが止まり、無理に目的時刻まで回そうとすると**伝達歯を破損し得る**と明記。
- Horlbeckは短い先送り（30〜90°）の場合、十分な鳴動エネルギーを確保するため一度アラーム針を現時刻まで回して鳴らし切り、その後目的時刻へ設定する二段階操作を推奨している。つまり「設定＋巻上げ一体化」は便利さと同時に、**残存巻上げ量と設定角度が結び付く操作上の制約**を生む。
- 同書は、小型リューズと後方へ絞ったケースのため通常の時刻側巻上げはやや扱いづらいとも記述。アラーム機能のためのケース造形が、別の操作性に代償を出している。
- 後年修理記事 `watch.weblog.to` では、分解手順資料が見つからず慎重な手順検討が必要だったこと、時計師から不用意な整備で壊されやすい趣旨の警告を受けたことを報告。
- Uhrforumの実機修理例では、過去の不適切なアラーム操作に起因すると判断された歯車損傷が確認されている。
- 以上から、**操作ミスによる特定部位の損傷リスクは強く支持**できる。一方、「10WA全体が構造的に壊れやすい」「製品として失敗だった」までは証拠不足。

#### 3. なぜ後続でAS系へ移ったのか

- BeitlのWittnauer章・一覧で、10WAの後に `AS 1475`、`AS 1568`、`AS 1931`、さらに1970年代のAutomatic Alarmで `AS 5008` が使われることを確認。**独自10WA方式が後続Wittnauerの標準にならず、AS系へ移った事実自体は確認できる**。
- HorlbeckはAS 1475を「量産品でありながら非常に信頼性が高い」と評価し、1956年Fortis Managerでchronometer testを通過した例を挙げる。またAS / Venus / Rondaなどの量産アラームムーブメントが多数ブランドへ広がった市場背景も説明する。
- ただし、Horlbeck / Beitlの確認範囲では「Wittnauerが10WAの欠点を理由にASへ切り替えた」という会社側の説明は見つからない。
- Cinci Watchesは「10WAは実用上扱いにくく破損しやすかったためWittnauerが早期に生産をやめASへ移行した」と明記するが、一次資料を提示していないため**因果はHOLD**。
- 現時点の最も安全な結論：**10WAの後、Wittnauerは量産・信頼性で実績のあるAS系アラームへ移行した。10WA固有の操作制約・損傷リスクは確認できるが、それが移行の決定理由だったことは未証明。**

## Editorial decisions

- OWNER'S NOTE末尾の個人的な締めは現状維持候補。調査で勝手に改稿しない。
- 既存SNS上の個人的呼称「アラーム界の沢田マンション」は重要な発想源だが、正式キャッチとは分離する。
- キャッチコピーは調査完了前に決め打ちしない。
- 「沢田マンション」比喩を本文に使う場合も、まず構造事実を示し、その後の個人的表現として扱う。
- DEEP DIVEでは、キャッチを説明するために史実を歪めない。
- 10WAの独自性候補は「回転ベゼルそのもの」ではなく、独立モジュール / 専用香箱 / bezelによるset+winding / case・gongまで連動するパッケージ全体として評価する。
- 「世界初」「特許取得」「Longines共同開発」など、キャッチとして強い語ほど一次根拠を得るまで使わない。
- 専門資料が二説に分かれ、追加調査でどちらかを直接確定できる見込みが低い場合、`CONFLICT` 自体を最終回答として扱う。未解決を無理に解消しない。
- 追加調査は「記事の主張・構成・採否を変え得る直接証拠」が見込める場合に限って優先する。専門家向けの細部を延々と掘ること自体を目的化しない。
- ベースムーブメント問題は現時点で、Horlbeck / Beitl の Longines-base 説と、時計師資料 / 部品互換が示す AS1200-family 関連説の二本立てを明示する方針。新しい直接証拠が出るまでは、この資料差をDEEP DIVEの結論として扱う。
- 10WAを「失敗作」「馬鹿な設計」「壊れやすい時計」と縮約しない。確認できるのは、**大胆で独創的な操作統合と、その統合が生んだ明確な制約・損傷リスク**。評価語を使う場合も設計意図への敬意と技術的成果を同時に残す。

## Update rule

新しい資料が出たら、必ず以下を記録する。

- 何を確認したか
- どの資料 / URL / ページ / 写真が根拠か
- 既存判断のどこが変わるか
- `ADOPTED / HOLD / REJECTED / CONFLICT / OBSOLETE / OPEN` のどれに移動したか
- 棄却した場合は棄却理由

この判断履歴を保持し、同じ候補を根拠なしに再提示しない。
