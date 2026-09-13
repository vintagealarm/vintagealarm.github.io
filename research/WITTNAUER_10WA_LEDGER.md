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
- 所有個体のシースルーバックから見えるのは時刻側ムーブメントで、アラーム機構は見えない。この観察は文字盤側モジュール配置と整合する。
- 「裏スケなのにアラームが見えない」は OWNER'S NOTE / DEEP DIVE の実物説明材料として有効。
- Beitl は 10WA を 1950年代前半の Wittnauer 初期アラームとして扱い、その後の Wittnauer は AS 製アラームムーブメントへ移行したと記述する。

### CONFLICT

#### ベースムーブメント（未解決）

- Horlbeck / Beitl：Longines系手巻きベースと記述。
- Horlbeck は 10WA を「機能上独立した時刻機構＋独立アラームモジュール」の genuine modular caliber と説明し、時刻側を hand-wound Longines caliber と明記する。
- Beitl も Wittnauer 10WA を独立した Longines 手巻きムーブメント＋別作動のアラームモジュールと記述する。
- 一方、Bestfit 系部品情報では AS 1200 用の setting bridge / balance cap jewel screw / winding stem などが WITTNAUER 10S / 10SC / 10WA と互換対象に列挙される。
- 重要：部品互換は `10WA = AS 1200 base` の直接証明ではない。現時点では「時刻側に AS 1200 family と強い部品互換性がある」まで。
- Forum / repair user report には「10WA の basis は AS 1200」とする主張があるが、一次 / メーカー技術資料では未確認。
- 現時点で `Longines Cal.10`、`AS 1200 base` のどちらも確定しない。
- 採用条件：地板レイアウト、部品番号体系、サービス資料、メーカー資料、明確な同定写真のいずれかで直接比較する。

### HOLD

- 「Longines Cal.10」説：Hodinkee / Watch-Wiki 等の二次資料では見られるが、現時点では一次 / 技術資料で未確定。
- Longines銘10WAの小規模シリーズ説：Beitl は Longines 署名個体を掲載している。実物記録は重視するが、製造規模・市場・経緯は未確定。
- Leon M. Newhouse / Longines-Wittnauer の同時期 watch-case / dial design patent と 10WA の関係：時期は近いが対応未証明。
- 「10WAアラームモジュールの特許取得」説：SNS上の証言あり。対応特許未特定。
- Hanhart Cal.301 の「ベゼルでアラームを巻き＋設定」については Watch-Wiki / Grail Watch Wiki が明記するが、Hanhart公式履歴は1951年発売と特許取得までで操作詳細を明記しない。一次操作資料の確認を継続する。

### REJECTED

- 「10WAが世界初の回転ベゼル式アラーム」：Eterna等の先行する回転ベゼル式アラーム設定例があるため不採用。
- 「10WAが世界初のベゼルで設定＋巻上げを行うアラーム」：1951年発売の Hanhart Sans-Souci / Cal.301 という先行候補が存在し、複数二次資料がベゼル巻上げ＋設定を記述するため、一次資料で優先性が証明されるまで断定不可。
- 「Longines-Wittnauer名義のwatch-case patentがある = 10WAの特許」：論理飛躍のため不採用。
- 「ケースにLongines-Wittnauer表記がある = 時刻ムーブメントもLongines製」：ケース証拠とムーブメント製造者を混同するため不採用。
- `US2937271A` を 10WA の特許とみなすこと：1957年出願の遠隔信号用 signalling/alarm device で、10WAとは別物のため不採用。
- `USD163314S` を 10WA アラーム機構の特許とみなすこと：watch dial の意匠特許であり、アラーム機構の請求ではないため不採用。

### OBSOLETE

- 「10WA = AS 1200ベースで確定」：専門書との衝突が解消していないため撤回。
- 「10WA = Longines Cal.10で確定」：直接根拠不足のため撤回。
- 「Longines-Wittnauer の1950年前後の特許を見つけた = 10WAモジュール特許を発見」：内容照合前の旧判断として禁止。

## Open research questions — priority order

1. 10WAアラームモジュールの対応特許を特定できるか。
2. 出願人 / 発明者 / 優先日 / 同族特許 / 請求項と10WA構造の対応。
3. 時刻側ベースムーブメントの確定：Longines系かAS1200系か、または別の説明が必要か。
4. 1950年代初頭の当時広告、カタログ、取扱説明書、サービス資料。
5. Longines銘10WAの追加個体・市場・製造経緯。
6. 10WAの発売開始年 / 終了年 / ref.展開。
7. ベゼル操作方式の先行例・同時代比較と、10WA固有点の確定。
8. なぜWittnauerが後続でAS系アラームへ移行したのか。
9. ケース形状・張り出しベゼル・小型リューズの関係を技術資料で裏付けられるか。
10. 所有個体の実測：鳴動時間、操作量、音、ベゼル回転量など。

## Evidence source register

### Project / specialist books

- Michael Philip Horlbeck, *The Alarm Wristwatch* (Schiffer, 2007), p.152 周辺：Wittnauer 10WA。modular caliber、Longines hand-wound base、独立 alarm barrel、回転ベゼルで alarm set + winding、約1.5回転付近の巻上げ限界、ケース形状と小型リューズの関係。
- 同書、alarm module 解説章：genuine module の接続点は release apparatus、Wittnauer を代表例として説明。
- Leonhard Beitl, *Alarm am Arm* (2009), Wittnauer pp.500–502：10WA、Longines hand-wound movement + separate alarm module、回転ベゼル、tone/gong、1950年代前半、後続AS採用。
- 同書、Longines pp.295–296：Longines署名 10WA 個体を掲載。少数自社seriesという説明部分は推測として扱う。
- 同書、Hanhart pp.207–211：Sans-Souci / Cal.301、1951広告、回転ベゼル式 alarm setting、後期停止スライダー。

### User specimen

- `IMG_5490.jpeg`：正面。金色ケース、特徴的なインデックス、青い波形アラーム針。
- `IMG_5386.jpeg`：腕載せ。
- `IMG_5758.jpeg`：シースルーバック。時刻側ムーブメントは見えるがアラームモジュールは見えない。
- `IMG_7643.jpeg`：側面。張り出したベゼル、ケースの絞り、リューズ配置を観察可能。

### Primary / patent candidates checked

- `US2937271A` — Longines-Wittnauer Watch Co. Inc., filed 1957-10-25, signalling/alarm device。遠隔信号用途で10WAとは別物。REJECTED。
- `US2566741A` — Longines-Wittnauer Watch Co. Inc., priority 1948-07-10, *Watch casing*。10WAとの対応未証明。HOLD / 直接機構特許扱い禁止。
- `USD163314S` — Leon M. Newhouse / Longines-Wittnauer, filed 1950-01-12, watch dial design。機構特許ではない。REJECTED as 10WA alarm patent。
- Hanhart 公式履歴：Sans-Souci を1951年発売、patented とする。特許番号・請求範囲の直接確認は未完了。

### Technical parts / specialist web

- Time Connection II / Bestfit database：AS 1200 factory part 445/654 (set bridge) の compatible caliber に WITTNAUER 10S / 10SC / 10WA を列挙。
- Time Connection II / Bestfit：AS 1200 系 lower balance cap jewel screw の互換群に WITTNAUER 10WA を列挙。
- winding stem interchange lists：AS 1200 系と WITTNAUER 10WA の共通 stem 情報あり。
- `watch.weblog.to` の 10WA 分解記事：文字盤側に積層されたアラーム機構を実機分解写真で確認可能。専門Web / owner repair report として扱い、メーカー一次資料とは分離。

## Research log

### 2026-09-13 — GitHub正本化後の再監査

- GitHub `main` の `AGENTS.md` / `SITE_RULES.md` を先に確認し、既存サイト思想を調査条件へ反映。
- Horlbeck / Beitl を再検索し、両書が10WAを Longines 系手巻きベースと記述することを再確認。
- Beitl では10WAの後にAS 1475等のWittnauer alarmが続くことを確認。`10WA独自系 → 後続AS系` は専門書記載として採用可能。
- AS 1200説を再監査。10WAとAS1200の関係は複数の交換部品で確認できるが、部品互換を base caliber 同定へ飛躍させないことを明記。
- Hanhart 301 の先行性を再確認。1951年発売は Hanhart 公式で確認。ベゼル巻上げ＋設定は二次資料で確認できるが、一次操作資料は未確定。
- 10WA特許候補を再検索。`US2937271A` / `USD163314S` は対象外として明確に棄却。`US2566741A` はwatch casingであり、10WA対応が未証明のため保留継続。

## Editorial decisions

- OWNER'S NOTE末尾の個人的な締めは現状維持候補。調査で勝手に改稿しない。
- 既存SNS上の個人的呼称「アラーム界の沢田マンション」は重要な発想源だが、正式キャッチとは分離する。
- キャッチコピーは調査完了前に決め打ちしない。
- 「沢田マンション」比喩を本文に使う場合も、まず構造事実を示し、その後の個人的表現として扱う。
- DEEP DIVEでは、キャッチを説明するために史実を歪めない。

## Update rule

新しい資料が出たら、必ず以下を記録する。

- 何を確認したか
- どの資料 / URL / ページ / 写真が根拠か
- 既存判断のどこが変わるか
- `ADOPTED / HOLD / REJECTED / CONFLICT / OBSOLETE / OPEN` のどれに移動したか
- 棄却した場合は棄却理由

この判断履歴を保持し、同じ候補を根拠なしに再提示しない。
