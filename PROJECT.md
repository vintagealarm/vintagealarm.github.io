# VINTAGE ALARM — Project Instructions

> ChatGPT / Codex / 作業エージェント向けの最短起動指示。詳細規約の正本は各参照先にある。このファイルはルーターであり、既存の `AGENTS.md` / `PROJECT_STATE.md` / 分野別規約を置き換えない。

## 0. 最優先

このリポジトリでVINTAGE ALARM案件を扱うとき、会話の流れ・記憶・一般論から現行仕様を補完しない。

**必ず最初に `AGENTS.md` → `PROJECT_STATE.md` を確認し、対象分野の正本へ進む。**

上位の情報源を確認できるのに下位情報で埋めない。

優先順位:
1. 目の前の画像・動画・ファイル・表・スクショ・商品ページ・ログ
2. ユーザー指定資料 / Project資料 / GitHub現行成果物
3. 公式資料・一次資料
4. 必要なWeb調査
5. 過去会話・長期記憶（確認先を探す索引としてのみ使用）
6. 一般論・推測

内部では **確認済み事実 / 資料記載 / Web確認 / ユーザー説明 / 推測 / 未確認 / 判断** を分ける。未確認を自然な物語で埋めない。

### FAIL-CLOSED推論ゲート

詳細正本は `.codex/FAIL_CLOSED_INFERENCE_GUARDS.md`。正本確認後も、既存判断の反転・逆推論・未確認実体の新設前提・一般論による上書きをしない。必要根拠が不足する場合はHOLDする。

### EVIDENCE INGRESS / CANONICAL WRITE

新しいスクリーンショット・実測・資料・ファイル・ユーザー訂正を受け取った場合は、回答だけで消費せず**対象domainのcanonical owner / Routerにwrite contractがあるか確認する**。

- write contractがある → その正本へ更新し、domain validator / diff / 再取得で確認してから分析・回答する。
- write contractがない → AI都合で新しい保存先・sidecar・CURRENT台帳を作らない。既存ownerを確認し、必要ならHOLD / 提案に留める。
- **normative ownerは原則1箇所、discovery pointerは複数可。** 別チャットでもPROJECTから更新経路を発見できる状態を維持する。
- SNS / Instagram Insightsでは `measurement/.internal/.virtual/social/ROUTER.md` の **CANONICAL WRITE CONTRACT** を正とする。

## 1. 「焼いて」/ Council は絶対に独自解釈しない

`焼いて` / `焼こう` / `Council` / Council選択中の番号 `1〜7` を検出したら、**会話から意味を発明せず**、必ず次を正本として扱う。

- `council-worker/V3.md`
- `council-worker/README.md`
- `council-worker/src/v3.ts`
- `council-worker/src/index.ts`（V2互換エンジン）
- `research/COUNCIL_V3_COURT_JESTER_DESIGN.md`（7の誕生経緯・設計根拠）
- `AGENTS.md` の Council / 焼いて

### 「焼いて」だけの場合

次の7択をそのまま出して選択を待つ。

1. **2ch民で焼いて** → スレ表示。煽り・反論・レスバ込みで論点を削る
2. **みんなで議論して** → ひな壇。複数視点をテンポよくぶつける
3. **冷静に決めて** → 評議会。選択肢を比較して最終判断まで出す
4. **監査して** → Claim Board。主張・根拠・反証・未確認を分解する
5. **案出して** → Brainstorming Board。独立発想→整理→発展→絞り込み
6. **事前に地雷探知して** → PRE-MORTEM。実装前に失敗原因を先回りし、作り込む前に撤退・検証・GOを決める
7. **宮廷道化師で焼いて 🤡** → 王＝ユーザー＋AI＋Councilの前提をノンデリに疑い、必要なら提示外の案・削除・撤退・保留・何もしないまで戻して比較。異論がなければ「今回は異議なし🤡」で帰る

### 番号または形式が選択済みの場合

- `1` は **2ch民で焼いて**。別の意味へ再定義しない。
- `7` は **宮廷道化師で焼いて 🤡**。resident追加ではなくCouncil V3の独立format / protocolとして実行する。
- `2ch民で焼いて` / `5ch民で焼いて` / `スレ民で焼いて` は1を直接実行し、メニューを挟まない。
- 選択後は現在の会話、画像、ファイル、Project資料、GitHub、既存成果物、確定判断を先に拾う。
- 既知事項を聞き直さない。
- 「焼いて」用の独自メニューをその場で創作しない。
- 1〜6ではV2の意味・番号を維持しつつ、重大な共有未検証前提が結論を実質的に変え得て、かつCouncil内で未攻撃の場合だけsilent Jester hookが乱入できる。通常は黙る。
- **通常のChatGPT内CouncilはGitHub `main` の上記正本を取得すれば実行できる。** MCP / Cloudflare Worker / OpenAI APIは外部実行surfaceであり、ユーザーがその外部runtimeの検証・運用を明示した場合だけ対象にする。未接続・secret不足・API credits等を、通常のCouncil実行やGitHub実装完了のblockerにしない。

## 2. 分野別ルーティング

- 本文 / WATCH / HISTORY / OWNER'S NOTES / 翻訳 → `SITE_RULES.md`
- 日本語本文の新規執筆 / 大幅改稿 → `SITE_RULES.md` + `strategy/japanese-writing.md`
- デザイン / UI / 画像 / mobile / motion → `DESIGN_ENGINEERING.md`
- SEO / AIO → `strategy/seo-aio.md` + 必要な `measurement/*`
- Analytics / 計測単体 → `measurement/metrics.md` + 対象実装
- **SNS / 布教 / Instagram / X / YouTube / SNSとVA Analyticsの突合 → `measurement/.internal/.virtual/social/ROUTER.md` を最初に読む**
- **SNS投稿案 / 既出・未使用角度 / 再利用素材 / 要追加撮影の棚卸し → Social `ROUTER.md` の後に `measurement/.internal/.virtual/social/content-inventory.md` を必ず読む**。AIはSourceに基づいて候補を先に分類し、`AI_PROPOSED` としてユーザーへ提示してよい。候補棚は**時計横断のrolling shelf**として増やしてよく、1個体を棚卸し完了するまで次の時計へ進めない運用にはしない。ユーザーは提示済み候補から**時計＋内容**を選び、KEEP / MERGE / SPLIT / DROP でasset境界を確定する。KEEP済みassetは「次回投稿に採用済み」とは限らず、棚に残して後から選べる。動画への当て込みをユーザーが採用した後だけContent Assignment Registryへ USER_CONFIRMED / PLANNED として予約する。**候補提示を飛ばしてAI単独で正本化しない。**
- SNS詳細実測 → `measurement/.internal/.virtual/social/instagram-operations.md`
- 過去SNS / Analytics実験 → `measurement/experiment-log.md`
- 英語入口 → `strategy/english-entry.md`
- ドイツ語入口 → `strategy/german-entry.md`
- Council / 焼いて → `council-worker/V3.md` + `council-worker/README.md` + `council-worker/src/v3.ts` + `council-worker/src/index.ts`
- **個人時計台帳 / コレクション台帳 / 所持時計 / 取得日・取得経緯・取得額 / OH・OVH・修理歴 / 現在地・現在状態 / 売却・保有意志 → cross-repo `orima1995-create/watchdiary-ios` のCURRENT Issue群を先に読む**

### 個人時計台帳 — cross-repo正本

個人所有・取得・整備・売却の台帳は、公開VINTAGE ALARMリポジトリへ重複保存しない。正本は **`orima1995-create/watchdiary-ios` のGitHub Issues** に置く。

時計台帳、所持時計、コレクション、購入日／取得日、取得経緯、購入額／取得額、OH・OVH、修理歴、現在地、輸送中、預け中、売却、KEEP / MAY SELL等を扱う場合は、**VINTAGE ALARM repo内だけを検索して「台帳がない」と判断してはならない。**

基本取得順:
1. **#21 `[CURRENT] 腕時計コレクション台帳｜OWNED`** — 現在所有の主台帳。まずここを取得する
2. **#60 `[CURRENT] 腕時計コレクション遍歴｜DIRECT-EVIDENCE REBUILD`** — 取得順、購入・譲渡経緯、価格、意味づけ、時系列
3. **#23 `コレクション保有意志｜KEEP / MAY SELL`** — 現在の保有・売却意向
4. **#25 `時計周辺コレクション｜Watch-lighter + Eterna 8 DAYS`** — 腕時計本数に含めない周辺時計
5. 個体別のCURRENT Issueがある場合は追加取得する。例: **#58 WESTCLOX Watchlarm、#31 CYMA Time-O-Vox No.489**
6. 売却・査定は **#20 Rolex Ref.1501**、金融状態は **#19 loans** へ分離する

#21で持つ基本項目:
- 取得日
- 取得方法・場所
- 取得額
- 取得経緯
- OH / OVH / 修理歴
- **個体識別情報** — Ref. / Cal. / movement No. / case No. 等、分かるものだけ
- **既知不具合・状態**
- **改造・部品交換歴**
- **現在地 / 現在状態**

日差・振り角・beat error等の精度測定や「最終動作確認」は**台帳の必須項目にしない**。個体研究・修理資料に実測が存在し、意味がある場合だけ詳細正本へ残す。

個体の歴史・機構・一次資料・公開研究はVINTAGE ALARM側の研究正本を使う。たとえばARSA Blind Alarmなら `research/ARSA_BLIND_ALARM_RESEARCH_MAP.md` / `research/ARSA_BLIND_ALARM_LEDGER.md` が研究正本で、**所有・取得・OH・現在状態はwatchdiary台帳と突合する**。研究正本と個人台帳の役割を混ぜない。

ユーザーが台帳更新を明示した場合は、該当する `watchdiary-ios` CURRENT Issueを更新する。単なる会話・調査だけで無断更新しない。公開サイトへ載せる指示がない限り、個人台帳をVINTAGE ALARM公開本文へコピーしない。

時計の事実認定では、Project資料『Alarm am Arm』『The Alarm Wrist Watch』等を確認できる場合は一般論より先に使う。

## 3. SNS / Analytics / VA運用

SNS投稿案・評価・Councilでは、**必ず `measurement/.internal/.virtual/social/ROUTER.md` の ACTIVE / RESOLVED を先に分離する。**

- ACTIVE = 現在検討・比較・焼くべき論点。
- RESOLVED / INTERNAL = 判断の前提として内部適用するが、新証拠や明示的な再検討指示がない限り回答・Councilの主要論点へ戻さない。

これにより、既に確定した計測上の注意事項や過去の訂正を毎回答で再説明しない。

SNS案件の基本確認順:
1. 現在の会話にある最新スクショ / Insights / Relay / ユーザー訂正
2. `measurement/.internal/.virtual/social/ROUTER.md`
3. `measurement/.internal/.virtual/social/instagram-operations.md`
4. `measurement/experiment-log.md`
5. `measurement/metrics.md`
6. `PROJECT_STATE.md` と対象VAページ
7. Project資料・一次資料
8. 必要ならWeb / 市場 / SNS

過去X / YouTube / Instagramで既に使った訴求を確認せず、新しい企画として再発明しない。

英語投稿を作る場合は、**ネイティブとして自然な英語 + 英語構文を引きずらない自然な日本語訳**をセットで提示する。

## 4. 変更履歴と日時

仕様・運用・公開・計測・UI・分類・文言の意味・公開状態・検証方針・棄却判断・再発防止策が変わる場合、**同じ変更セット内で `CHANGE_DECISIONS.md` にJST日時付きで記録する。**

形式:

`### YYYY-MM-DD HH:mm JST — ...`

最低限、**変更 / 理由 / 旧状態・棄却 / 影響範囲 / 検証状態 / 関連 / 日時根拠** を残す。

GitHub UTC時刻を根拠にする場合、UTC原文とJST換算を併記する。日時を頭だけで変換して済ませない。

記録漏れがある状態を `完了` / `VERIFIED` と呼ばない。過去漏れを見つけたら「次回」へ送らず、その場で安全に補填する。

## 5. 実行と検証

- 実装済み / 検証済み / main反映済み / deploy成功 / live確認済み / 成果観測済みを混同しない。
- ユーザーが本番反映まで求めた場合、main pushで終了しない。
- 部分修正は差分編集。指定外を勝手に改善しない。
- エラーは自力で原因特定・再試行できる範囲を先に処理する。
- ユーザーが棄却した候補は、新証拠がない限り復活させない。
- 過去のPR / branch / decision / 棄却案 / superseded案を、整理だけを理由に削除しない。active queueから外す必要がある場合は close / draft / superseded / HOLD 等で状態を分け、PR・commit・branch・decision logから「何を検討し、何を採用／棄却し、なぜそうしたか」を後から参照できる状態を保つ。closeは削除ではなく作業キューからの退避として扱う。
- **active queueの判定はopen PRを第一基準にする。** branchが存在するだけでは「現在作業中」とみなさない。open PRに紐づくbranch、または会話・正本で明示的に作業中と指定されたbranchだけをactive扱いし、closed PRや孤立branchは履歴候補として参照する。

## 6. 回答前の強制チェック

回答・実行前に最低限これを確認する。

- 今回、正本ファイルがあるか。あるなら読んだか。
- 個人時計台帳案件なのに、`watchdiary-ios` #21を取得せずVINTAGE ALARM repo内だけで「無い」と判断していないか。
- SNS案件ならSocial Routerを通したか。
- ACTIVEとRESOLVEDを分け、RESOLVEDを不要に再説明していないか。
- 目の前の画像 / 資料 / Analytics / GitHubを一般論より先に確認したか。
- 「焼いて」や番号の意味を勝手に作っていないか。
- 過去SNS実績を確認せず既存案を再発明していないか。
- ユーザーの訂正を最新仕様へ反映したか。
- 未確認を確認済みのように書いていないか。
- 旧仕様・棄却済み候補を復活させていないか。
- 判断変更なら `CHANGE_DECISIONS.md` も同時に更新したか。
- OWNER'S NOTEの `catch` / `ownersNote.lead` を新規作成・大幅改稿・選別する案件なら、`SITE_RULES.md` の全WATCH共通Catch / Lead開発プロトコルを通し、**現在公開中の日本語WATCHすべての現行Catch / Leadを横並び確認**したか。発案者・派生元・採否理由・VA温度比較・現在状態を記録したか。
- 実行と検証を混同していないか。

- directional ruleを逆向き・対偶・双方向へ変形していないか。
- 既存判断を変える場合、REVERSAL TARGETとNEW EVIDENCEが両方あるか。
- route / account / page / media / postを、現物確認なしに無い前提・新設前提で扱っていないか。
- 一般論をProject固有の決定へ昇格していないか。
- 最終結論が直近ユーザー決定・正本・既存実装と矛盾していないか。

このチェックに失敗した場合、回答を続けず正本確認へ戻る。
