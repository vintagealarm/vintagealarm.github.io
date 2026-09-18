# Council Worker V2

COUNCIL LAB の実AIバックエンド用 Cloudflare Worker。

V2では、Councilを「キャラが固定ラウンドでレスを続ける仕組み」から、**目的に応じて議論プロトコルと表示形式を切り替える集団思考エンジン**へ変更する。

## 「焼いて」ルーター

ユーザーが **「焼いて」だけ** と言った場合、Councilを即実行しない。毎回、次の6択を明示する。

1. **2ch民で焼いて** → スレ表示。煽り・反論・レスバ込みで論点を削る
2. **みんなで議論して** → ひな壇。複数視点をテンポよくぶつける
3. **冷静に決めて** → 評議会。選択肢を比較して最終判断まで出す
4. **監査して** → Claim Board。主張・根拠・反証・未確認を分解する
5. **案出して** → Brainstorming Board。独立発想→整理→発展→絞り込み
6. **事前に地雷探知して** → PRE-MORTEM。実装前に失敗原因を先回りし、作り込む前に撤退・検証・GOを決める

番号または形式が選ばれた後は、現在の会話、画像、ファイル、Project資料、GitHub、過去の確定判断を先に使う。

- 既に把握できることは聞き直さない。
- 精度を実質的に上げる不足情報がある時だけ質問する。
- 質問が必要でも、原則は一度に最重要の一点だけ聞く。
- 情報が十分なら質問せず実行する。

## PRE-FLIGHT GATE — 既存対象の批評・提案は、対象実体を開いてから

Councilが既存サイト、既存WATCH、OWNER'S NOTE、HISTORY、UI、計測、実験、GitHub実装、既存コピー、既存導線を批評・監査・改善提案する場合、**対象実体を1つ以上直接確認するまでCouncil生成を開始しない。**

`PROJECT_STATE.md`、一覧、索引、会話記憶だけでは通過扱いにしない。`PROJECT_STATE.md` はルーターであって対象実装の代替ではない。

生成前に内部で次を固定する。

1. **TARGET** — 今回評価する具体的なページ / ファイル / URL / 実験ログ / 画像
2. **OPENED** — 実際に開いて確認した対象実体
3. **EXISTING MEASURES** — すでに実装済みの対策・コピー・導線・検証
4. **UNKNOWN** — まだ確認できていない点

対象WATCHを論じるなら対象 `src/content/watches/*.md` と必要なlayout/component、トップを論じるなら `HomeLanding.astro` などの実装、公開表示自体を論じるなら可能な範囲でlive表示まで確認する。`owners-directory.json` や `PROJECT_STATE.md` だけを読んで対象ページの内容を評価しない。

各批判・提案を出す直前に **「これは既に実装されていないか？」** を照合する。既に実装済みなら新規提案として出さず、`EXISTING MEASURES` として扱う。必要なら「実装済みだが効果未確認」「実装済みだが別導線で弱い」のように、**実装の有無ではなく効果や配置を評価する。**

既存コピー、既存機能、既存導線を言い換えて「新しい改善案」として再提示してはならない。

対象実体が存在しない純粋な新規アイデア出しだけは例外。その場合も `OPENED: NOT APPLICABLE — 既存対象なし` と判断してから進む。

`6 → 4 → 1` のような連続Councilでは、同一対象・同一論点ならPRE-FLIGHT結果を再利用してよい。議題、対象、domain、必要証拠が変わった場合は再実行する。

PRE-FLIGHTを通過できない場合は、一般論で穴埋めしない。対象実体を取得してから再開する。取得不能な論点は `未確認` のまま扱う。

「2ch民で焼いて」「5ch民で焼いて」「スレ民で焼いて」のように形式が明示済みなら、メニューを挟まず1を直接実行してよい。

通常の文章としての「監査して」「案出して」「地雷探知して」まで自動的にCouncilへ奪わない。Councilの流れで選択された場合、または明示的にCouncil形式として指定された場合に4 / 5 / 6として扱う。

## V2の分離軸

旧V1では `mode` と `engine` が、人数、Web検索、反復回数、表示形式までまとめて決めていた。V2では次を分離する。

- `format`: `thread | panel | council | claims | brainstorm | premortem`
- `domain`: `general | watch | business`
- `budget`: `quick | standard | deep`
- `evidence`: `none | project | web | project-web | deep-web`
- `panelSize`: 4〜10。未指定時は形式とbudgetから自動選択
- `premortemStage`: `zero-code | post-spike`。`premortem` 以外では無視する

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

## 6形式の役割

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

### 6. premortem — PRE-MORTEM / 地雷探知

完成したコードの粗探しではなく、**まだ存在しないコードが作り込み後に失敗した未来を仮定して、その原因を実装前に探す**形式。最初から改善案を褒め足すのではなく、前提破壊と早期撤退判断を優先する。最初から最適解を当てることではなく、不正解ルートへ突っ込むコストを数日から最小SPIKEへ縮めることを目的とする。

段階は分けて実行する。

1. **`zero-code` / コード0行** — 目的と制約だけを材料に、前提、データモデル、状態管理、責務境界、ライフサイクル、CRUD、削除・複製・切替・復元、将来拡張、より単純な代替を独立に焼く
2. **`post-spike` / 最小SPIKE後** — DB / schema / interface / 状態遷移 / 最難所だけを使い捨てで作った結果を証拠として、初期予測が当たったか、新しい地雷が見えたか、まだ未検証かを再評価する

各指摘は必ず次のいずれかに分類する。

- **致命傷** — 目的達成不能、データ破壊、整合性破綻、全体作り直しにつながる
- **高確率地雷** — 現状証拠から発火可能性が高く、実装前に潰す価値が高い
- **設計上の負債** — 今は動いても保守・追加機能・運用で継続的なコストになる
- **好み** — 目的・制約・失敗条件に直結しない選好差
- **未検証** — 可能性はあるが、判断に必要な証拠がまだない

最後は必ず次の3択で裁定する。

- **GO** — 致命傷がなく、残るリスクを通常実装で管理できる
- **SPIKEしてからGO** — 判断を変え得る未検証点があり、最小SPIKEの範囲と成功 / 中止条件を明記する
- **作り直せ** — 前提または構造に致命傷があり、現案を延命するより設計を戻す方が安い

今回の複数プログラム管理機能で「DB / データモデルが失敗原因だった可能性」は、原因確定ではなく**未確認仮説**として扱う。作成者への評価や印象は証拠にせず、schema、関係、制約、状態遷移、CRUD、削除・複製・切替・復元等で検証する。

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

`GET /api/menu` は、ChatGPT側と同じ6択を返す。

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

- `焼いて` だけでは `run_council` を呼ばず、先に6択を表示する。
- 形式が決まったら `run_council` を使う。
- 既存対象を批評・監査・改善する場合は、上記PRE-FLIGHT GATEを通過してからCouncilを起動する。
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
