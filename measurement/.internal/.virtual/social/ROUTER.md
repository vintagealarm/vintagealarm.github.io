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
3. `measurement/.internal/.virtual/social/content-inventory.md` — SNS投稿案・既出除外・未使用候補・撮影要否・検証要否の横断索引。投稿案では必須
4. `measurement/.internal/.virtual/social/instagram-published-copy.md` — Instagram実投稿本文・ハッシュタグ・採用／非採用訴求の証拠正本
5. `measurement/.internal/.virtual/social/instagram-insights-timeseries.md` — Instagram Insightsの観測日時・投稿日時・経過時間・全確認値の時系列正本
6. `measurement/.internal/.virtual/social/instagram-operations.md` — SNS横断の実測・先行実績・分析履歴
7. `measurement/experiment-log.md` — 過去のYouTube / Analytics等の詳細実験ログ
8. `measurement/metrics.md` — 計測定義
9. `PROJECT_STATE.md` — VA公開個体・HOW THEY RING・サイト現行状態
10. 対象WATCH / HOW THEY RINGの現行実装
11. 必要なProject資料・一次資料・Web
12. 会話記憶は確認先を探す索引としてのみ使う

投稿案を作る場合は、まず3のinventoryで候補を絞り、4・6・7でInstagram実投稿と過去X / YouTubeの使用実績を照合し、最後に10の対象WATCH / research正本で事実を再確認する。`USED` を新案として再発明せず、`PARTIAL` を使う場合は再利用目的を明示する。OWNER'S NOTEは `WHOLE_ONLY` とし、一文ずつ切り出して複数投稿へ増殖させない。

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

### 4.1 DECISION → EVIDENCE LINK — 判断をログへ接続する

ACTIVEなSNS運用判断は、観測ログと切り離して「方針だけ」「数字だけ」にしない。詳細は `instagram-operations.md` に置き、最低限次を対応付ける。

- **Decision** — 何を変えた／維持した判断か
- **Origin** — USER / AI / COUNCIL / SOURCE / Web等、判断の起点
- **Evidence** — 既存のどのログ・投稿・媒体差・VA流入で検証するか
- **Revisit / falsifier** — 何が観測されたら判断を再検討するか
- **Status** — ACTIVE / HOLD / RESOLVED / REJECTED

運用上の原則:
- この接続のためだけに新しいKPI・ダッシュボード・保存先を増やさない。まず既存の `instagram-insights-timeseries.md` / `instagram-published-copy.md` / `instagram-operations.md` / `experiment-log.md` / VA Analyticsで判定できるか確認する。
- Webや外部事例を起点にした判断は、一般論をInstagramの普遍則へ昇格させず、VINTAGE ALARM自身のログで真偽を審議する。
- 写真 / Reel、時計個体、フック、尺、投稿時刻など複数変数が違う観測は「反証候補・次の比較材料」として扱い、単発結果から単一原因を確定しない。
- ログの目的は「記録を増やすこと」ではなく、**どの運用判断を維持・修正・棄却するか後から追えること**。

現在のACTIVE判断:
- **投稿頻度を初期運用より落とし、投稿前のWeb / 既存実績確認と1本あたりの内容品質を優先する方針を、既存ログで継続検証する。**
- これは「低頻度の方が常に伸びる」という確定則ではない。頻度低下による発見機会の損失と、1投稿あたりの非フォロワー配布・保存 / 共有・フォロー・プロフィール遷移・HOW THEY RING到達等をあわせて見る。
- 固定の最適投稿回数は現時点で正本化しない。確認できない具体回数を後付けしない。
- Wittnauer 10WA等で媒体 / format差が出た場合は、この判断を検証する材料へ加えるが、単一投稿だけで写真 / 動画全体の優劣へ一般化しない。
- **6個体の既存VA資産を、1 Reel = 1要素へ細分化するmicro-Reel運用をACTIVEに追加する。** 画面文字は最小限、短尺、1本で1操作・1機構・1ディテールだけを見せる。静止画カルーセルは補助扱い。これは2026-10-03のWittnauer静止画1件から「動画が常に優れる」と一般化する判断ではなく、同じcontent inventoryをReel形式で再検証するための運用方針。投稿頻度そのものはこの判断だけでは変更しない。
- **当面の投稿フォーマット順は「画像 → 動画 → 画像 → 動画」を基本ローテーションにする。** 直近のWittnauer静止画の次はPierce Duofon機能Reel（MR-PIE-001）を挟む。その後の画像／動画の時計・assetはrolling shelfから都度選ぶ。これはアルゴリズム普遍則ではなく、静止画とReelを交互に検証しながら棚を消費する運用判断で、投稿頻度の固定とは別。

### 4.2 INSTAGRAM COPY LEARNING CONTRACT — 過去の訂正・実投稿・実素材を次稿へ必ず持ち越す

Instagram本文を作るときは、毎回ゼロから「それっぽいSNS文」を発明しない。次の順を強制する。

- **目の前の実素材が最優先。** 動画・画像がある場合は、映っている／鳴っている内容を確認してから本文を作る。映っていない文字盤・表示窓・別カット・編集展開を、一般論から勝手に足さない。
- **最新のユーザー訂正・ユーザー原稿を現行working baseにする。** ユーザーが具体的な導入、説明順、残したい機構説明、CTAを提示した後は、明示的な短縮・再構成指示がない限り、AIの旧草案や一般的な短文フックへ巻き戻さない。
- **過去の実投稿から得た表現上の知見を引き継ぐ。** 映像内の注目位置が明確なら冒頭で「どこを見るか」を指示し、音が主役なら視覚と聴覚を同時に誘導する。動画が機構説明に耐える場合は、単なる「珍しい／2種類ある」で止めず、何が動き、何が変わるかまでSource-backedに説明する。
- **Instagram全文を求められた場合の既定出力順は「英語全文 → hashtags → 自然な日本語訳」。** hookだけ、途中稿だけ、英語だけで止めない。
- **hashtagsは実投稿正本の直近precedentを参照し、根拠なく個数を増減しない。** 新しい方針へ変える場合は別判断として扱う。
- working draft / correction-derived copyは `instagram-operations.md` に置き、公開確認前に `instagram-published-copy.md` へ昇格させない。

この契約は「毎回同じ文章を書く」規則ではない。**実素材・最新訂正・過去の成功／失敗から得た制作知見を次の草案へ持ち越す**ための再発防止規則である。

### 4.3 EXECUTION BRIEF BRIDGE — Content Inventoryから実制作へ分析を落とさない

Content Inventoryは「何を持っているか」を管理する軽量な棚であり、各assetへcaption案や過去分析全文を詰め込まない。一方、ユーザーがasset＋mediaを次投稿として採用し、Content Assignment Registryへ `USER_CONFIRMED / PLANNED` を作った時点で、**そのcontent ID専用のExecution Briefを同じ変更セットで作る。**

Execution Briefは **棚→実制作の引継ぎ伝票**。最低限次を持つ。

- `Status` — `MEDIA_PENDING` または `MEDIA_VERIFIED`
- `Media reality` — 実素材で実際に見える／聞こえるもの。未撮影なら未撮影と書く
- `Attention cue` — 視聴者に最初にどこ／何を見せるか
- `Sensory proof` — 視覚・音・操作のうち、その素材自体が証明できるもの
- `Causal beat` — 操作 → 内部変化 → 観察できる結果
- `Published collision` — 既存投稿ですでに使った訴求と、今回あえて深掘りする差分
- `Carry-forward` — Published Copy / Insights / Operations / ユーザー訂正から今回へ持ち越す制作知見
- `Constraints` — 素材に無い画・未確認機構・再利用禁止等
- `Working copy` — 現行草案またはその正本参照。公開前にPublished Copyへ昇格させない

運用:
- 実素材がまだ無いPLANNEDは `MEDIA_PENDING` を許容するが、**storyboard / captionをfinal扱いにしない**。
- 実素材が届いた／撮影済みになったら内容を実見して `MEDIA_VERIFIED` へ更新する。SHOT / EDITED / SCHEDULEDへ進むInstagram assignmentは `MEDIA_VERIFIED` 必須。
- 実素材と過去分析が食い違う場合は実素材と最新ユーザー訂正を優先し、briefを更新してから制作する。
- active Instagram assignmentにExecution Briefが無い状態は `check:social-inventory` で失敗させる。
- 過去分析を全文複製せず、今回の制作判断に効く知見だけを `Carry-forward` へ引く。棚自体を再び巨大なMicro treatment表へ戻さない。

制作順は **Content Inventory → Assignment → Execution Brief → storyboard / caption → publish → Published Copy / Insights** とする。

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

### Content Inventory の完了条件

- `content-inventory.md` は投稿ネタ本文の保存先ではなく、**再利用候補の索引正本**。
- 新規投稿が公開確認されたら、`instagram-published-copy.md` の全文登録と同じ変更セットで該当inventory rowを `USED` / `PARTIAL` へ更新する。
- 新しいWATCH / Deep Dive / gallery資産がSNSで単独利用できる状態になった場合、inventoryへ追加するか、追加しない理由をPR本文へ残す。
- `CANDIDATE_NOT_IN_IG_TEXT` は「公開本文に未出」を意味し、映像内でも完全未使用とは断定しない。
- `Other social` はX / YouTubeの明示証拠へ追随させる。`NO_EXPLICIT_USE_FOUND...` は永久的な未使用認定ではない。
- OWNER'S NOTEは時計ごとに `*-ON` 1行だけを持ち、`WHOLE_ONLY / OWNER_NOTE_HERO_ONLY / OWNER_NOTE_WHOLE` を維持する。
- `npm run check:social-inventory` をquality gateで必ず通す。
- asset表は共同棚卸しの開始点。AIはSource-backedな追加候補を `AI_PROPOSED` として分類し、**時計横断のrolling shelfへ継続追加して、分類したままユーザーへ提示する**。proposal層は正本assetとは分ける。
- 1個体を全件確定してから次の時計へ進む必要はない。ユーザーは候補棚から時計＋内容を選び、KEEP / MERGE / SPLIT / DROP を相談して正本asset境界を更新する。KEEPは棚への採用であり、次回投稿の採用とは分離する。候補提示を飛ばしてAI単独で確定しない。
- 動画への当て込みをユーザーが採用した後だけContent Assignment Registryへ Approval=USER_CONFIRMED / State=PLANNED を作る。候補提示・KEEPだけでは予約しない。
- PLANNED / SHOT / EDITED / SCHEDULED はactive lockで、同じasset / media keyを別案へ再提案しない。
- Instagram公開時はassignment rowを PUBLISHED にし、primary / secondary assetのIG stateと instagram-published-copy.md を同じ変更セットで同期する。micro-ReelのInsights content_id はassignment content IDを使う。
- 中止した案はrowを消さず DROPPED とし、lockだけ解放する。

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
- 2026-10-03ユーザー明示指示により、SNS再利用棚として `content-inventory.md` を追加した。これはInsights / Published Copy / Operationsの代替保存先ではなく、それらとWATCH資産を横断する索引である。
- 設計変更は、ユーザーの明示指示なしに実行しない。
- 既存正本が肥大化していても、AIが独断で分割しない。必要なら最適化案として提示し、承認後に移行する。
- `instagram-published-copy.md` は2026-09-30のユーザー明示指示「全文を登録記録」「綺麗に統合と解決」に基づき、実投稿copy/creative decisionだけを `instagram-operations.md` の時系列Insightsから分離した正本である。ツール都合の臨時sidecarではない。
- `instagram-insights-timeseries.md` は2026-09-30のユーザー明示指示「日時・経過時間も毎回登録」「完成を定義して作戦を立案検証し、問題なければ実行」に基づき、Instagram Insightsの観測時系列を専用正本へ分離したもの。旧snapshotを保持し、最新値上書きを防ぐための正規構造変更であり、臨時sidecarではない。

### ROUTER自体の更新条件

このROUTERは、**現在のACTIVE論点、RESOLVED項目、参照順、CANONICAL FUNNEL、またはこのCANONICAL WRITE CONTRACTそのものが変わった場合だけ更新する。**

## 11. Fail-Closed Inference Guard

SNS案件でも `.codex/FAIL_CLOSED_INFERENCE_GUARDS.md` と `.codex/inference-guard-cases.json` を適用する。

固定回帰ケース:
- SOCIAL-DIRECTION-001
- REALITY-X-ROUTE-001
- SOCIAL-DUOFON-001

この3件は、既存判断・現物・実素材を確認したうえで処理し、一般論だけで現行方針を書き換えない。
