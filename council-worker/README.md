# Council Worker V2

COUNCIL LAB の実AIバックエンド用 Cloudflare Worker。

V2では、Councilを「キャラが固定ラウンドでレスを続ける仕組み」から、**目的に応じて議論プロトコルと表示形式を切り替える集団思考エンジン**へ変更する。

## 「焼いて」ルーター

ユーザーが **「焼いて」だけ** と言った場合、Councilを即実行しない。毎回、次の5択を明示する。

1. **2ch民で焼いて** → スレ表示。煽り・反論・レスバ込みで論点を削る
2. **みんなで議論して** → ひな壇。複数視点をテンポよくぶつける
3. **冷静に決めて** → 評議会。選択肢を比較して最終判断まで出す
4. **監査して** → Claim Board。主張・根拠・反証・未確認を分解する
5. **案出して** → Brainstorming Board。独立発想→整理→発展→絞り込み

番号または形式が選ばれた後は、現在の会話、画像、ファイル、Project資料、GitHub、過去の確定判断を先に使う。

- 既に把握できることは聞き直さない。
- 精度を実質的に上げる不足情報がある時だけ質問する。
- 質問が必要でも、原則は一度に最重要の一点だけ聞く。
- 情報が十分なら質問せず実行する。

「2ch民で焼いて」「5ch民で焼いて」「スレ民で焼いて」のように形式が明示済みなら、メニューを挟まず1を直接実行してよい。

通常の文章としての「監査して」「案出して」まで自動的にCouncilへ奪わない。Councilの流れで選択された場合、または明示的にCouncil形式として指定された場合に4/5として扱う。

## V2の分離軸

旧V1では `mode` と `engine` が、人数、Web検索、反復回数、表示形式までまとめて決めていた。V2では次を分離する。

- `format`: `thread | panel | council | claims | brainstorm`
- `domain`: `general | watch | business`
- `budget`: `quick | standard | deep`
- `evidence`: `none | project | web | project-web | deep-web`
- `panelSize`: 4〜10。未指定時は形式とbudgetから自動選択

人数を増やすこと自体を品質とみなさない。検索担当が多く必要でも、全員を最後まで討論へ残す必要はない。

## 共通プロトコル

全形式で内部思考は次を基本とする。

1. **Silent Position** — 住民が互いを見ず独立に初手を出す
2. **Board Synthesis** — 人ではなく主張 / 案をID付きBoardへ整理する
3. **Cross Exam** — 相手の人格ではなくBoard項目へ反証・補強・統合を行う
4. **Adaptive Hot Seat** — 重要対立と情報利得が残る場合だけ集中反証する
5. **Private Re-vote** — 他人の投票を見ず再評価する
6. **Minority Report** — 多数派に負けても強い反対論を残す
7. **Chair** — 根拠、反証、再評価、未確認を比較して裁定する

固定の「継続議論×3」などは廃止する。新しい証拠、反例、定義修正、立場変更が止まったら終了する。

## 5形式の役割

### 1. thread — 2ch民で焼いて

出力は匿名掲示板スレ。煽りやレスバは表示上許可するが、内部では独立初手とBoardを経由する。単なる2ch口調の連投にはしない。

### 2. panel — みんなで議論して

ひな壇型。住民ごとの短い発言と衝突軸を前に出す。テンポを優先しつつ、内部では独立生成を先に行い、発言順による同調を避ける。

### 3. council — 冷静に決めて

選択肢、評価軸、反証、匿名再評価を重視する。最後は条件付きでも推奨を一つ決め、強い少数意見を残す。

### 4. claims — 監査して

Claim Boardとして、主張、支持根拠、反証、未確認を分ける。検索結果を見つけただけで確認済みにしない。

### 5. brainstorm — 案出して

独立発想を先に広げ、似た案を後からクラスタ化する。早い多数決で変な案を潰さず、Cross Examでは否定だけでなく改造・組合せも行い、最後に絞る。

## 住民設計

住民は架空の家族構成・年齢・性別を足して人間らしくするのではなく、**認識論的な判断方針**を持つ。

各住民には最低限、次を持たせる。

- `role`
- `objective`
- `evidence`
- `bias / failure mode`
- `revision rule`
- `abstain rule`

必要な利用者属性は「38歳・子2人」などの架空人物として演じず、`stakeholder lens` として扱う。

## Project資料とWeb

時計案件では、目の前の画像・ファイル、Project資料、一次資料を一般論より優先する。

固定Project Mirror:

- `Alarm am Arm`
- `The Alarm Wristwatch`
- TypeC / Projectの事実認定ルール

著作権資料は公開GitHubへ置かず、非公開OpenAI Vector Storeへ登録する。

```bash
cd council-worker
OPENAI_API_KEY="..." npm run setup:vector -- \
  "/path/to/Alarm Am Arm .pdf" \
  "/path/to/The Alarm Wrist Watch.pdf"
```

Web検索は `evidence=web | project-web | deep-web` の時だけ使う。検索結果の要約ではなく、必要なら原ページまで確認する。

## API

- `GET /health`
- `GET /api/menu`
- `POST /api/council`
- `GET /api/thread/:id`（D1接続時）
- `POST /mcp`

`GET /api/menu` は、ChatGPT側と同じ5択を返す。

## MCP / ChatGPT

MCP endpoint:

```text
https://<worker-host>/mcp
```

Tool:

```text
run_council
```

重要:

- `焼いて` だけでは `run_council` を呼ばず、先に5択を表示する。
- 形式が決まったら `run_council` を使う。
- MCPが未接続でもCouncil自体を中止せず、このREADMEと `src/index.ts` の現行仕様をチャット内で実行する。
- 既知情報を再質問しない。
- 精度を上げるために本当に必要な不足だけ聞く。

## 旧V1から失効したもの

次はV2で失効。

- 「焼いて」だけで即2chスレを開始する
- `general | watch | business | roast` が表示形式まで決める
- `quick | project | deep-web-10` が人数とラウンド数を固定する
- QUICK=継続×2 / PROJECT=×3 / DEEP WEB=×4という固定反復
- `CONFIDENCE` の数字だけで議論品質を表す
- 返信相手の人物を選ぶこと自体を議論の中心にする

旧API互換用の `mode` / `engine` はWorker側で読み替え可能だが、新規呼び出しではV2パラメータを使う。

## CI / deploy

`Council Worker Check` が `council-worker/**` 変更時に `wrangler deploy --dry-run` でコンパイル確認する。

Worker deployにはrepository secretsが必要。

- `OPENAI_API_KEY`
- `COUNCIL_VECTOR_STORE_ID`
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Secret不足時に資料やWebを読んだふりはしない。
