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

## 3. ACTIVE — 今回の分析・Councilで前面に出す論点

- X / YouTube / Instagramそれぞれの布教実績が、現在のVA流入へどう接続しているか
- Instagram新設後の非フォロワー配布、保存、共有、Story再共有、フォロー、年齢、国などの変化
- 公開6個体を一巡させたときの個体別・訴求別の反応差
- HOW THEY RINGがSNS流入の受け皿として再現性を持つか
- SNS → VA → WATCH / OWNER'S NOTE / HOW THEY RING の遷移が成立しているか
- YouTube Shortsで実行済みのBasis `mechanical wristwatch × fidget toy` 訴求がInstagramでも再現するか
- 将来Reel直URLが利用可能になった場合、現在のプロフィール経由baselineとの差

## 4. RESOLVED / INTERNAL — 原則として再説明・再審議しない

以下は内部処理ルール。新しい矛盾・仕様変更・ユーザーからの明示的な再検討指示がない限り、Councilや通常回答の主要論点へ戻さない。

- Analyticsの `facebook` / `instagram` の生データは保持する。
- Meta系として同判定で観測する場合も、FB値をInstagram実ユーザー数へ勝手に加算しない。
- fetch / preview / bot等が未確認なら人間流入と断定しない。
- `IG@l.instagram.com → /en/how-they-ring/` はInstagramから英語HOW THEY RINGへの到達として扱えるが、Analyticsだけでプロフィール画面上のクリック操作自体を証明したとは扱わない。
- Instagram開始とVA visits増加の因果は、同時期に増えただけでは確定しない。
- 2投稿程度の少数標本からアルゴリズム学習完了・恒常的audience像・単一の勝因を確定しない。
- `fidget toy` は2026-09-27に新しく思いついた企画ではない。2026-09-09のBasis Alarm (BFG90) YouTube Shortsで実行済みの先行コンセプト。

**重要:** RESOLVED項目は「忘れる」のではなく、判断の前提として内部適用する。毎回説明文・スレのレス・注意書きとして復活させない。

## 5. CURRENT VERIFIED SOCIAL PRECEDENT

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

## 6. CURRENT INSTAGRAM PHASE

- まずVA掲載6個体を一巡させる。
- 一巡中は大きな施策変更を避け、標本を増やす。
- Wittnauer / CYMAの初期実測詳細は `instagram-operations.md` を参照。
- Pierce以降も同じ時間窓・同じ指標を可能な範囲で採る。
- 一巡後に、個体 / 操作 / fidget / 音 / 歴史 / 比較 / URL導線等を次の検証軸として組み直す。

## 7. Council / 焼きでの出力ルール

Council自体の形式は `council-worker/README.md` と `council-worker/src/index.ts` が正本。

SNS + Analytics + VAを焼く場合:

1. ACTIVE論点を主題にする。
2. RESOLVED項目は内部前提として使い、説明のためだけにレスを消費しない。
3. 過去SNS実績を確認せず、現在の数字だけから新企画を発明しない。
4. VAは単なるリンク先ではなく、HOW THEY RING / WATCH / OWNER'S NOTE等の受け皿として実際の遷移を評価する。
5. 数字の絶対値、率、流入、内部遷移を混同しない。
6. 未確認の因果は未確認のまま残す。
7. ユーザーが既に訂正・確定した論点を、新証拠なしに再びレスバの議題へ戻さない。

## 8. 更新ルール

新しいInsights / SNS実績 / Relay観測が来たら、詳細値は `instagram-operations.md` または適切な実験ログへ記録する。

このROUTERは、**現在のACTIVE論点、RESOLVED項目、参照順そのものが変わった場合だけ更新する。**
