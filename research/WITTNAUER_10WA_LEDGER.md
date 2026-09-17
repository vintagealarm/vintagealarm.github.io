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
- HODINKEE, *Bring a Loupe* (2025-08-15) はさらに具体的に、10WA を “a modular alarm movement built on top of the Longines caliber 10” と記述する。これは `Longines Caliber 10` 説を明示する有力な二次資料だが、メーカー一次資料ではない。
- 一方、Bestfit 系部品情報では AS 1200 用の setting bridge / balance cap jewel screw / winding stem などが WITTNAUER 10S / 10SC / 10WA と互換対象に列挙される。
- 重要：部品互換は `10WA = AS 1200 base` の直接証明ではない。現時点では「時刻側に AS 1200 family と強い部品互換性がある」まで。
- Forum / repair user report には「10WA の basis は AS 1200」とする主張があるが、一次 / メーカー技術資料では未確認。
- 現時点で `Longines Cal.10`、`AS 1200 base` のどちらも確定しない。
- HODINKEE の表記 `Longines caliber 10` を、そのまま `Longines 10L / 10.68Z` と同一視しない。10L / 10.68Z への具体的なブリッジは別資料で直接確認する必要がある。
- 採用条件：地板レイアウト、部品番号体系、サービス資料、メーカー資料、明確な同定写真のいずれかで直接比較する。

### HOLD

- 「Longines Cal.10」説：HODINKEE が明示し、Horlbeck / Beitl の「Longines手巻きベース」記述とも整合するため二次資料系では強い。ただし現時点では一次 / 技術資料で未確定。
- 「Longines Cal.10 = 10L / 10.68Z」説：スペック上の近似だけでは確定しない。HODINKEE の `caliber 10` 表記を 10L / 10.68Z へ自動変換しない。
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
4. `Longines caliber 10` の具体的なメーカー側キャリバー番号を一次 / 技術資料で確定できるか。10L / 10.68Z との同一性は未確認。
5. 1950年代初頭の当時広告、カタログ、取扱説明書、サービス資料。
6. Longines銘10WAの追加個体・市場・製造経緯。
7. 10WAの発売開始年 / 終了年 / ref.展開。
8. ベゼル操作方式の先行例・同時代比較と、10WA固有点の確定。
9. なぜWittnauerが後続でAS系アラームへ移行したのか。
10. ケース形状・張り出しベゼル・小型リューズの関係を技術資料で裏付けられるか。
11. 所有個体の実測：鳴動時間、操作量、音、ベゼル回転量など。

## Evidence source register

### Project / specialist books

- Michael Philip Horlbeck, *The Alarm Wristwatch* (Schiffer, 2007), p.152 周辺：Wittnauer 10WA。modular caliber、Longines hand-wound base、独立 alarm barrel、回転ベゼルで alarm set + winding、約1.5回転付近の巻上げ限界、ケース形状と小型リューズの関係。
- 同書、alarm module 解説章（p.22周辺）：genuine module の接続点は release apparatus。Wittnauer を代表例として挙げ、アラームゼンマイをベゼルで巻き、その同じベゼルでアラーム時刻も設定すると説明する。
- Leonhard Beitl, *Alarm am Arm* (2009), 歴史章 pp.23–24：10WA は通常の Longines 手巻きムーブメントにアラームモジュールを載せた構成と説明。ベゼルを反時計回りに回してアラームゼンマイを巻き、同時にアラーム時刻も設定できるとする。ハンマーはトーンスプリングを打つ。
- 同書、Wittnauer pp.500–502：10WA、Longines hand-wound movement + separate alarm module、回転ベゼル、tone/gong、1950年代前半、後続AS採用。
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

### Secondary watch media

- HODINKEE, Rich Fordon, “Bring a Loupe: A Parmigiani Fleurier Toric Memory Time, A Cartier Trianon, And Two Picks From Goodwill,” 2025-08-15. `https://www.hodinkee.com/articles/bring-a-loupe-august-15-2025` — “1950s Wittnauer Alarm Watch With Caliber 10WA” の項で、10WA を “a modular alarm movement built on top of the Longines caliber 10” と明記。さらにベゼル回転で alarm を wind / set すると説明。Longines `caliber 10` という具体名を与える重要な二次資料だが、メーカー一次資料ではないため base caliber 最終確定には単独使用しない。

## Research log

### 2026-09-13 — GitHub正本化後の再監査

- GitHub `main` の `AGENTS.md` / `SITE_RULES.md` を先に確認し、既存サイト思想を調査条件へ反映。
- Horlbeck / Beitl を再検索し、両書が10WAを Longines 系手巻きベースと記述することを再確認。
- Beitl では10WAの後にAS 1475等のWittnauer alarmが続くことを確認。`10WA独自系 → 後続AS系` は専門書記載として採用可能。
- AS 1200説を再監査。10WAとAS1200の関係は複数の交換部品で確認できるが、部品互換を base caliber 同定へ飛躍させないことを明記。
- Hanhart 301 の先行性を再確認。1951年発売は Hanhart 公式で確認。ベゼル巻上げ＋設定は二次資料で確認できるが、一次操作資料は未確定。
- 10WA特許候補を再検索。`US2937271A` / `USD163314S` は対象外として明確に棄却。`US2566741A` はwatch casingであり、10WA対応が未証明のため保留継続。

### 2026-09-15 — キャッチコピー取捨選択とサイト文体への統合

- Project PDF の既確認箇所を再利用し、コピーの芯を「ベゼルがアラーム時刻設定とアラームゼンマイ巻上げを同じ操作系で担う」という `ADOPTED` 事実に限定した。
- 現行サイトの OWNER'S NOTE を確認。Pierce Duofon は「マナーモードの祖先!?」、Westclox Watchlarm は「0石腕時計の劇的ビフォーアフター。」と「なんということでしょう。」、Basis Alarm は「触って、見て、聴いて楽しむおもちゃ箱。」、Cyma Time-O-Vox は「鳴る黄金のクロノメーター」。既存のキャッチは単純な仕様説明ではなく、時計固有の機構を現代語・有名フレーズ・別ジャンルの比喩へ一度変換し、本文ですぐ事実へ戻す構造と確認した。
- 10WAでは「職場 / 労務」の比喩が、既存4本と重複せず、かつ同じベゼルが二つのアラーム側業務を兼務する構造を回収できるため最有力と判断。
- 「アラーム部門」を入れることで、時刻側までベゼルが担当するかのような誤読を避け、比喩の対象をアラームモジュール側へ限定できる。
- 「今日も」は機構説明には不要だが、擬人化を単なる広告語から日常の勤務風景へ変え、OWNER'S NOTEの表側に必要な軽さを作る要素として残す。
- `過労` / `ワンオペ` は編集上の比喩。10WAが壊れやすい、設計負荷が過大、Wittnauerが人員削減・合理化を意図した、という史実・技術主張には使わない。
- OWNER'S NOTE表側と DEEP DIVE の温度差を再確認。キャッチでは現代比喩を許容する一方、DEEP DIVEでは機構・資料・未確認範囲へ戻し、企業ネタを章見出しへ持ち込まない。

### 2026-09-17 — HODINKEE証拠をベースムーブメント論争へ統合

- HODINKEE の 2025-08-15 *Bring a Loupe* を原ページで再確認した。
- 記事は10WAを “a modular alarm movement built on top of the Longines caliber 10” と明記しており、単なる「Longines系」ではなく `Longines caliber 10` まで具体化している。
- この記述は Horlbeck / Beitl の「Longines手巻きベース」と方向が一致するため、Longines説の二次資料側の補強として台帳へ追加した。
- ただし HODINKEE はメーカーサービス資料ではないため、`10WA = Longines Cal.10` の最終確定へは昇格させない。
- また `Longines caliber 10` と `10L / 10.68Z` の同一性はこの記事単体からは確認できないため、別論点として `HOLD / OPEN` に残す。
- AS1200系との部品互換証拠は失効していない。したがって現状は「専門書2冊＋HODINKEEがLongines側を支持／部品資料群がAS1200系との強い互換性を示す」という `CONFLICT` を維持する。

## Copy selection ledger — 2026-09-15

### CURRENT FRONT-RUNNER — 公開実装前

> **過労な現場。アラーム部門、今日もベゼルがワンオペ中🔔**

採用寄りとする理由：

- `過労な現場`：時計内部を職場へ変換する入口。笑いの起点だが、機械的な過負荷を主張する語ではない。
- `アラーム部門`：比喩をアラームモジュール側に限定する。通常時刻側はクラウン操作であり、時計全体がベゼル依存という誤読を防ぐ。
- `今日も`：反復する勤務風景を作り、部品への擬人化と愛着を足す。機構事実ではなくトーン要素。
- `ベゼル`：10WA固有の操作上の主役を明示する。本来は周辺部品に見えるベゼルが、アラーム時刻設定とアラームゼンマイ巻上げを担う異常さを回収できる。
- `ワンオペ中`：一つの操作部がアラーム側二業務を兼ねる構造を現代語へ置き換える。ここがコピーの事実接続点。
- `🔔`：ブラック職場ネタへ逸れた読者を、最後にアラーム腕時計へ戻す役割。

直下の事実回収候補：

> **巻くのも、合わせるのも、このベゼル。**

これは比喩ではなく、Horlbeck / Beitl が記すベゼル操作を短く言い直す補助文候補。公開時には実機操作・資料表現との最終照合を行う。

### HOLD — 新証拠・レイアウト次第で再検討可

- **「過労な現場。今日もベゼル、ワンオペ中🔔」**  
  一段短く瞬発力は高いが、「アラーム部門」を外すとベゼルが時計全体の仕事を担う印象が出るため現本命より下位。
- **「一石二鳥。ただし、二羽はつながっている。」**  
  一操作二役と独立操作できない関係を綺麗に表せる。ただし現代へのツイストと10WA固有の部品感が弱い。
- **「一石二鳥。二羽は一蓮托生。」**  
  機構の結びつきは強く出るが、語感が古風でOWNER'S NOTEのポップさから少し外れる。
- **「二兎を得た。別々には扱えない。」**  
  トレードオフは伝わるが、説明寄りで愛嬌が弱い。
- **「UI設計は、70年前から難しい。」**  
  現代プロダクト設計へ飛ばすツイストは強いが、10WAそのものより抽象的で、年数表現も時間経過で陳腐化する。
- **「操作を減らしたら、選択肢も減った。」**  
  統合操作のトレードオフを端的に示す。ただし満巻き時の設定自由度など、具体的な制約の説明とセットでなければ言い過ぎになるため保留。
- **「人員配置に難あり。アラーム部門、ベゼル一名体制🔔」**  
  機構との対応は明快だが、官僚語が勝ち、現本命より軽さと愛着が弱い。
- **「過労なアラーム部門。今日もベゼル、ワンオペ中🔔」**  
  日本語は綺麗だが「現場」を失い、現場を回す / ベゼルを回すという副次的な連想も消える。

### REJECTED — 新証拠なしでトップ候補へ戻さない

- **「合理化のしわ寄せ、ベゼルへ。🔔」**  
  コピーとしては強いが、Wittnauerが合理化を目的にこの機構を選んだという開発意図を暗示する。根拠がないため不採用。
- **「省人化、1950年代。今日もベゼル、ワンオペ中🔔」**  
  現代ツイストは強いが、省人化・コスト削減という設計意図を連想させるため不採用。
- **「働き方改革、未実装。今日もベゼル、ワンオペ中🔔」**  
  時事ネタが機構より前へ出て、長期掲載するサイトコピーとして劣化しやすい。10WA固有性も薄い。
- **「ブラック現場。今日もベゼル、ワンオペ中🔔」**  
  直接的すぎて説明前に評価語が立つ。`過労な現場` より余白が少なく、コピーとして安く見えるため不採用。
- **「巻上げ課と設定課、統合しました。」を DEEP DIVE 見出しにする案**  
  OWNER'S NOTE / note / SNSの遊びとしては再利用余地があるが、DEEP DIVEの温度感とは不一致。DEEP DIVE用途では棄却。
- **「二階建てのアラーム、操作はベゼルひとつ。」**  
  モジュール積層と操作系を混ぜて一文にし、構造とUIの論点が散る。トップキャッチより説明本文向け。
- **「アラームを、リューズから解放した時計。」**  
  時刻側にはリューズが残り、さらに「解放」が設計思想・価値判断を強く含む。誤読余地が大きいため不採用。

### Site-tone integration

- **OWNER'S NOTE / 一覧カード**：時計固有の事実を一度、現代語・文化・人体・環境・有名フレーズなど別ジャンルへツイストしてよい。ただし直後に観察可能な事実へ戻す。
- **DEEP DIVE**：温度を落とす。機構、資料、実測、未確認範囲を優先し、キャッチの比喩を史実説明へ持ち込まない。
- **NOTE / SNS**：遊びの余地が最も大きい。「巻上げ課と設定課、統合しました。」等はこの層なら再検討可。
- 未確認の開発意図、世界初、コスト削減、合理化、耐久性評価を、面白いコピーのために後付けしない。

### Selection rule carried forward

旧運用の「10WA調査が完了するまでキャッチを決め打ちしない」は、**全研究完了までコピー選定を止める**という意味では運用停止する。
今後は、コピーに必要な機構事実が `ADOPTED` なら選定を進めてよい。ただし `HOLD / CONFLICT / OPEN` の史実をキャッチの前提にしない。
公開実装時は、本命コピーと直下の事実回収文だけを再確認し、未解決のベースムーブメント・特許・世界初問題を混ぜない。

## Editorial decisions

- OWNER'S NOTE末尾の個人的な締めは現状維持候補。調査で勝手に改稿しない。
- 既存SNS上の個人的呼称「アラーム界の沢田マンション」は重要な発想源だが、正式キャッチとは分離する。
- キャッチコピーは、コピーに必要な `ADOPTED` 事実が揃えば選定を進める。未解決研究の完了待ちにはしない。
- 「沢田マンション」比喩を本文に使う場合も、まず構造事実を示し、その後の個人的表現として扱う。
- OWNER'S NOTE表側の遊びと DEEP DIVE の温度を混同しない。DEEP DIVEでは企業・労務ネタを見出し化せず、機構と資料へ戻す。
- DEEP DIVEでは、キャッチを説明するために史実を歪めない。

## Update rule

新しい資料が出たら、必ず以下を記録する。

- 何を確認したか
- どの資料 / URL / ページ / 写真が根拠か
- 既存判断のどこが変わるか
- `ADOPTED / HOLD / REJECTED / CONFLICT / OBSOLETE / OPEN` のどれに移動したか
- 棄却した場合は棄却理由

この判断履歴を保持し、同じ候補を根拠なしに再提示しない。
