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
3. `measurement/.internal/.virtual/social/instagram-operations.md` — SNS横断の実測・先行実績・現在の観測
4. `measurement/experiment-log.md` — 過去のYouTube / Analytics等の詳細実験ログ
5. `measurement/metrics.md` — 計測定義
6. `PROJECT_STATE.md` — VA公開個体・HOW THEY RING・サイト現行状態
7. 対象WATCH / HOW THEY RINGの現行実装
8. 必要なProject資料・一次資料・Web
9. 会話記憶は確認先を探す索引としてのみ使う

投稿案を作る場合は、対象時計について過去X / YouTube / Instagramで既に使った訴求がないかを3・4で先に確認する。既存コンセプトを新案として再発明しない。

## 3. CANONICAL FUNNEL — 現行Instagram→VA導線（変更禁止）

現行のInstagram布教導線は次で固定する。

**Instagram Reel → Instagramプロフィール → TOP外部URL = 英語版 HOW THEY RING (`/en/how-they-ring/`) → 各WATCH / OWNER'S NOTE → VA内の研究資産**

- HOW THEY RINGは「VAへ入った後に選ぶページ」ではない。**InstagramプロフィールTOPに置いたVA側のランディングページそのもの**。
- Instagram投稿本文には現在VAリンクを置いていない。
- `IG@l.instagram.com → /en/how-they-ring/` は、この意図的に設計したプロフィールTOP導線の成果を観測する主要指標として扱う。ただしAnalytics単独ではプロフィール画面上のクリック操作そのものまでは証明しない。
- Council / 焼き / 通常回答で、`Reel → profile → VA → HOW THEY RING`、`Reel → VA → HOW THEY RING`、`SNS → VA → WATCH / OWNER'S NOTE / HOW THEY RING` のようにHOW THEY RINGをVA到達後の横並び選択肢へ並べ替えてはならない。
- TOP外部URLがユーザー指示または実画面確認で変更された場合のみ、この節を更新する。

## 4. ACTIVE — 今回の分析・Councilで前面に出す論点

- X / YouTube / Instagramそれぞれの布教実績が、現在のVA流入へどう接続しているか
- Instagram新設後の非フォロワー配布、保存、共有、Story再共有、フォロー、年齢、国などの変化
- 公開6個体を一巡させたときの個体別・訴求別の反応差
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

- まずVA掲載6個体を一巡させる。
- 一巡中は大きな施策変更を避け、標本を増やす。
- Wittnauer / CYMAの初期実測詳細は `instagram-operations.md` を参照。
- Pierce以降も同じ時間窓・同じ指標を可能な範囲で採る。
- 一巡後に、個体 / 操作 / fidget / 音 / 歴史 / 比較 / URL導線等を次の検証軸として組み直す。

## 8. Council / 焼きでの出力ルール

Council自体の形式は `council-worker/README.md` と `council-worker/src/index.ts` が正本。

SNS + Analytics + VAを焼く場合:

1. **最初にCANONICAL FUNNELを内部で固定し、出力中に並べ替えない。**
2. ACTIVE論点を主題にする。
3. RESOLVED項目は内部前提として使い、説明のためだけにレスを消費しない。
4. 過去SNS実績を確認せず、現在の数字だけから新企画を発明しない。
5. VAは単なるリンク先ではなく、**HOW THEY RINGをInstagram側の入口として、そこからWATCH / OWNER'S NOTE / 研究資産への内部遷移を評価する。**
6. 数字の絶対値、率、流入、内部遷移を混同しない。
7. 未確認の因果は未確認のまま残す。
8. ユーザーが既に訂正・確定した論点を、新証拠なしに再びレスバの議題へ戻さない。
9. 出力前に `Instagram Reel → profile → HOW THEY RING → WATCH / OWNER'S NOTE → research` と矛盾していないか監査する。

## 9. 更新ルール — CANONICAL WRITE CONTRACT

新しいInsights / SNS実績 / Relay観測が来たら、詳細値は **既存の正規保存先** `instagram-operations.md` または、その観測種別について既に正本として定義済みの実験ログへ記録する。

### Instagram Insights の完了条件

Instagram Insightsスクリーンショットを受け取った場合は、原則として次を1セットで完了する。

1. 最新スクリーンショット / ユーザー訂正を確認する。
2. この `ROUTER.md` と `instagram-operations.md` の現行状態を確認する。
3. 既存ログと同じ粒度で、画面から確認できた値を抽出する。未確認値を補完しない。
4. **分析回答より先に**正規保存先へ記録する。
5. commit成功後、正規保存先を再取得して反映内容を確認する。
6. 必要ならcommit diffも確認し、指定外変更・欠落・重複がないことを監査する。
7. ここまで完了して初めて「記録済み」と扱い、その後に分析回答を返す。

### 禁止

- `sidecar`、`snapshots/`、temporary log、個体別臨時ログ等を、AI判断だけで新しい保存先として作らない。
- 「ファイルが大きい」「全置換APIで扱いづらい」「ツール都合」「安全そう」を理由に正規保存先を変更しない。
- 正規保存先への書き込みが安全に完了できない場合、別ファイルへ逃がして「記録済み」としない。**未記録と明示して止める。**
- スクリーンショットで確認できた主要指標を、AI判断で一部だけ抜き出して保存しない。既存ログの粒度に合わせる。
- 観測値と推測・因果解釈を混ぜない。
- ユーザーが棄却した保存方式・旧仕様を、新証拠や明示指示なしに復活させない。

### 正規保存先・構造変更

- 正本の分割、保存先変更、ログ構造変更、新ディレクトリ導入、履歴の統合・削除は**設計変更**として扱う。
- 設計変更は、ユーザーの明示指示なしに実行しない。
- 既存正本が肥大化していても、AIが独断で分割しない。必要なら最適化案として提示し、承認後に移行する。

### ROUTER自体の更新条件

このROUTERは、**現在のACTIVE論点、RESOLVED項目、参照順、CANONICAL FUNNEL、またはこのCANONICAL WRITE CONTRACTそのものが変わった場合だけ更新する。**
