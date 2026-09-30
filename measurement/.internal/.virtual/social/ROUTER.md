# VINTAGE ALARM — Social / Analytics Router

このファイルはSNS・布教・VA Analytics案件の入口。詳細ログの要約ではなく、**何を参照し、何を再審議しないか**を決める。

## 1. 適用条件

次を含む相談・Council・焼き・投稿案・評価では、このファイルを先に読む。

- Instagram / Reels / Stories / Insights
- X
- YouTube / Shorts
- SNS布教活動
- SNS → VINTAGE ALARM流入
- VA Analytics / Relay とSNSの突合
- SNS掲載個体の比較

## 2. 参照順

1. 現在の会話にある最新スクリーンショット / Insights / Relay URL・値 / ユーザー訂正
2. この `ROUTER.md`
3. `measurement/.internal/.virtual/social/instagram-insights-timeseries.md` — Instagram Insightsの観測日時・投稿日時・経過時間・全確認値の時系列正本
4. `measurement/.internal/.virtual/social/instagram-operations.md` — SNS横断の実測・先行実績・分析履歴
5. `measurement/.internal/.virtual/social/instagram-published-copy.md` — Instagram実投稿本文・ハッシュタグ・採用／非採用訴求の正本
6. `measurement/experiment-log.md` — 過去のYouTube / Analytics等の詳細実験ログ
7. `measurement/metrics.md` — 計測定義
8. `PROJECT_STATE.md` — VA公開個体・HOW THEY RING・サイト現行状態
9. 対象WATCH / HOW THEY RINGの現行実装
10. 必要なProject資料・一次資料・Web
11. 会話記憶は確認先を探す索引としてのみ使う

投稿案を作る場合は、対象時計について過去X / YouTube / Instagramで既に使った訴求がないかを4・5・6で先に確認する。既存コンセプトを新案として再発明しない。

## 3. CANONICAL FUNNEL — 現行Instagram→VA導線（変更禁止）

現行のInstagram布教導線は次で固定する。

**Instagram Reel → Instagramプロフィール → TOP外部URL = 英語版 HOW THEY RING (`/en/how-they-ring/`) → 各WATCH / OWNER'S NOTE → VA内の研究資産**

- HOW THEY RINGは「VAへ入った後に選ぶページ」ではない。**InstagramプロフィールTOPに置いたVA側のランディングページそのもの**。
- Instagram投稿本文には現在VAリンクを置いていない。
- `IG@l.instagram.com → /en/how-they-ring/` は、この意図的に設計したプロフィールTOP導線の成果を観測する主要指標として扱う。ただしAnalytics単独ではプロフィール画面上のクリック操作そのものまでは証明しない。
- Instagram実投稿本文に `link in bio` 等のCTAがある場合も、実際のTOP外部URLは上記英語HOW THEY RINGである。
- Council / 焼き / 通常回答で、`Reel → profile → VA → HOW THEY RING`、`Reel → VA → HOW THEY RING`、`SNS → VA → WATCH / OWNER'S NOTE / HOW THEY RING` のようにHOW THEY RINGをVA到達後の横並び選択肢へ並べ替えてはならない。
- TOP外部URLがユーザー指示または実画面確認で変更された場合のみ、この節を更新する。

## 4. ACTIVE — 今回の分析・Councilで前面に出す論点

- X / YouTube / Instagramそれぞれの布教実績が、現在のVA流入へどう接続しているか
- Instagram新設後の非フォロワー配布、保存、共有、Story再共有、フォロー、年齢、国などの変化
- 公開6個体を一巡させたときの個体別・訴求別の反応差
- **観測日時と投稿後経過時間を揃えたうえで、Reelごとの伸び方・率の変化を比較すること**
- **InstagramプロフィールTOPのHOW THEY RINGがランディングページとして再現性を持つか**
- **HOW THEY RING → 各WATCH / OWNER'S NOTE → VA内研究資産**の内部遷移が成立しているか
- YouTube Shortsで実行済みのBasis `mechanical wristwatch × fidget toy` 訴求がInstagramでも再現するか
- 将来Reel直URLが利用可能になった場合、現在の `Reel → profile → HOW THEY RING` baselineとの差

## 5. RESOLVED / INTERNAL — 原則として再説明・再審議しない

以下は内部処理ルール。新しい矛盾・仕様変更・ユーザーからの明示的な再検討指示がない限り、Councilや通常回答の主要論点へ戻さない。

- Analyticsの `facebook` / `instagram` の生データは保持する。
- Meta系として同判定で観測する場合も、FB値をInstagram実ユーザー数へ勝手に加算しない。
- fetch / preview / bot等が未確認なら人間流入と断定しない。
- `IG@l.instagram.com → /en/how-they-ring/` はInstagramから英語HOW THEY RINGへの到達として扱えるが、Analyticsだけでプロフィール画面上のクリック操作自体を証明したとは扱わない。
- Instagram開始とVA visits増加の因果は、同時期に増えただけでは確定しない。
- 2投稿程度の少数標本からアルゴリズム学習完了・恒常的audience像・単一の勝因を確定しない。
- `fidget toy` は2026-09-27に新しく思いついた企画ではない。2026-09-09のBasis Alarm (BFG90) YouTube Shortsで実行済みの先行コンセプト。
- Instagramの公開済み6投稿の本文・hashtags・最終訴求は `instagram-published-copy.md` に復元済み。投稿案作成時に記憶から再構成しない。
- Instagram Insightsは最新値だけで比較しない。`instagram-insights-timeseries.md` の観測日時・投稿後経過時間を基準にする。

**重要:** RESOLVED項目は「忘れる」のではなく、判断の前提として内部適用する。毎回説明文・スレのレス・注意書きとして復活させない。

## 6. CURRENT VERIFIED SOCIAL PRECEDENT

### Basis Alarm (BFG90) — YouTube Shorts

2026-09-27ユーザー提供画面で再確認済み。

- 公開: 2026-09-09
- Short ID: `MWoqA4L2wdM`
- 2026-09-27観測: 2,598 views / 24 likes
- `#vintage #watch #toys`
- 日本語: `まるで機械式腕時計版のフィジェットトイ。見て、聴いて、触って楽しい、小さなおもちゃ箱。`
- 英語: `Like a fidget toy in mechanical wristwatch form — something to watch, hear, touch, and enjoy.`
- VA Basis Owner's Noteへの導線あり

この実績をInstagramの若年層観測より前の先行実験として扱う。

## 7. CURRENT INSTAGRAM PHASE

- VA掲載6個体の初回一巡は2026-10-01のCitizen Alarm公開で完了。
- Citizen Alarmの同時間窓snapshotを継続して採り、6個体の初回比較に必要な標本を揃えるまでは大きな施策変更を避ける。
- 公開済みInstagram本文の正確な再利用・比較は `instagram-published-copy.md` を参照する。
- Instagram Insightsの数値比較は `instagram-insights-timeseries.md` を参照し、観測日時・投稿後経過時間を落とさない。
- `instagram-operations.md` はSNS横断の分析・先行実績・運用履歴を保持する。
- Pierce以降も同じ時間窓・同じ指標を可能な範囲で採る。
- 初回比較後に、個体 / 操作 / fidget / 音 / 歴史 / 比較 / URL導線等を次の検証軸として組み直す。

## 8. Council / 焼きでの出力ルール

Council自体の形式は `council-worker/README.md` と `council-worker/src/index.ts` が正本。

SNS + Analytics + VAを焼く場合:

1. **最初にCANONICAL FUNNELを内部で固定し、出力中に並べ替えない。**
2. ACTIVE論点を主題にする。
3. RESOLVED項目は内部前提として使い、説明のためだけにレスを消費しない。
4. 過去SNS実績と `instagram-published-copy.md` を確認せず、現在の数字だけから新企画を発明しない。
5. Insights比較では `instagram-insights-timeseries.md` の観測日時・投稿後経過時間を確認し、異なる経過時間の値を同条件として扱わない。
6. VAは単なるリンク先ではなく、**HOW THEY RINGをInstagram側の入口として、そこからWATCH / OWNER'S NOTE / 研究資産への内部遷移を評価する。**
7. 数字の絶対値、率、流入、内部遷移を混同しない。
8. 未確認の因果は未確認のまま残す。
9. ユーザーが既に訂正・確定した論点を、新証拠なしに再びレスバの議題へ戻さない。
10. 出力前に `Instagram Reel → profile → HOW THEY RING → WATCH / OWNER'S NOTE → research` と矛盾していないか監査する。

## 9. 更新ルール — CANONICAL WRITE CONTRACT

新しいInstagram Insightsは `instagram-insights-timeseries.md` へ観測snapshotとして保存する。SNS横断の分析・判断・先行実績は `instagram-operations.md`、実投稿本文・hashtags・creative decisionは `instagram-published-copy.md` を正本とする。

Instagramの**実投稿本文・hashtags・最終的に採用された訴求・公開本文から確認できる非採用範囲**は `instagram-published-copy.md` を正本とする。実投稿スクリーンショットを受け取った場合、要約だけで済ませず、確認できる本文を全文保存する。草案時の棄却理由が資料から確認できない場合は推測で補完しない。

### Instagram Insights の完了条件

Instagram Insightsスクリーンショットを受け取った場合は、原則として次を1セットで完了する。

1. 最新スクリーンショット / ユーザー訂正を確認する。
2. この `ROUTER.md` と `instagram-insights-timeseries.md` の現行状態を確認する。
3. 画面から確認できた値を全て抽出する。未確認値を0や推測で補完しない。
4. **観測日時JSTを必ず保存する。** スクリーンショット取得時刻またはユーザー明示時刻を使い、確認できない場合は `unknown` とする。
5. **投稿日時JSTを確認できる場合は保存し、投稿後経過時間を算出する。** 投稿日しか分からない場合は時刻を捏造せず、elapsedを `unknown` とする。
6. 同じReelの旧snapshotを上書きせず、1観測=1snapshotで追記する。
7. **分析回答より先に**正規保存先へ記録する。
8. commit成功後、正規保存先を再取得して反映内容を確認する。
9. 必要ならcommit diffも確認し、指定外変更・欠落・重複がないことを監査する。
10. `npm run check:instagram-insights` で重複時刻・時系列逆転・未統合sidecarがないことを確認する。
11. `npm run instagram:report` で、時計別の前回差・時間当たりのviews増加・view→profile→bio・view→follow / saveを確認する。
12. ここまで完了して初めて「記録済み」と扱い、その後に分析回答を返す。

### Screenshot → canonical time series の標準経路

1. スクリーンショットから確認できた値だけを、一時JSONへ `watch` / `observed_at_jst` / `source_status` とともに転記する。一時JSONはGit管理しない。
2. `npm run instagram:append -- <json-path>` で `instagram-insights-timeseries.md` の該当時計末尾へ直接追記する。
3. `npm run check:instagram-insights` と `npm run instagram:report` を実行する。
4. 正本・Router・判断変更だけをcommitし、main反映後に正本を再取得する。

手作業で正本へ差分追記してもよいが、個体別sidecarを安全策としてcommitしない。入力値の欠落がある場合は、確認できた項目だけで1 snapshotを作り、未確認値を0にしない。

### Instagram Published Copy の完了条件

実投稿本文のスクリーンショットを受け取った場合は、原則として次を1セットで完了する。

1. 画面上の本文・hashtags・CTAを全文確認する。
2. `instagram-published-copy.md` の既存登録と照合する。
3. 公開本文を全文保存し、採用された主フック／機構／CTAを記録する。
4. 最終本文に入らなかった要素を記録する場合、公開本文・既存草案・ユーザー訂正から確認できる範囲だけに限定する。理由を推測しない。
5. commit成功後に本ファイルを再取得し、全文・hashtags・訴求マップを監査する。
6. ここまで完了して初めて「実投稿全文を記録済み」と扱う。

### 禁止

- `sidecar`、`snapshots/`、temporary log、個体別臨時ログ等を、AI判断だけで新しい保存先として作らない。
- 「ファイルが大きい」「全置換APIで扱いづらい」「ツール都合」「安全そう」を理由に正規保存先を変更しない。
- スクリーンショットで確認できた主要指標を、AI判断で一部だけ抜き出して保存しない。
- 実投稿全文をフックだけ・要約だけに縮めて保存しない。
- 観測日時・投稿日時・投稿後経過時間を確認できるのに省略しない。
- 異なる観測時刻の数値を1snapshotへ混ぜない。
- 観測値と推測・因果解釈を混ぜない。
- ユーザーが棄却した保存方式・旧仕様を、新証拠や明示指示なしに復活させない。
- `npm run check:instagram-insights` が未統合snapshotまたはpending markerを検出した状態でcommitしない。

### 正規保存先・構造変更

- 正本の分割、保存先変更、ログ構造変更、新ディレクトリ導入、履歴の統合・削除は**設計変更**として扱う。
- 設計変更は、ユーザーの明示指示なしに実行しない。
- 既存正本が肥大化していても、AIが独断で分割しない。必要なら最適化案として提示し、承認後に移行する。
- `instagram-published-copy.md` は2026-09-30のユーザー明示指示「全文を登録記録」「綺麗に統合と解決」に基づき、実投稿copy/creative decisionだけを `instagram-operations.md` の時系列Insightsから分離した正本である。ツール都合の臨時sidecarではない。
- `instagram-insights-timeseries.md` は2026-09-30のユーザー明示指示「日時・経過時間も毎回登録」「完成を定義して作戦を立案検証し、問題なければ実行」に基づき、Instagram Insightsの観測時系列を専用正本へ分離したもの。旧snapshotを保持し、最新値上書きを防ぐための正規構造変更であり、臨時sidecarではない。

### ROUTER自体の更新条件

このROUTERは、**現在のACTIVE論点、RESOLVED項目、参照順、CANONICAL FUNNEL、またはこのCANONICAL WRITE CONTRACTそのものが変わった場合だけ更新する。**
