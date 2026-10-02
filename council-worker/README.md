# Council Worker V3

COUNCIL LAB の実AIバックエンド用 Cloudflare Worker。

V3は、V2の1〜6と共通プロトコルを互換エンジンとして維持し、7の宮廷道化師と1〜6のsilent Jester hookを追加した現行Workerである。entrypointは `src/v3.ts`、V2互換エンジンは `src/index.ts`。

## 「焼いて」ルーター

ユーザーが **「焼いて」だけ** と言った場合、Councilを即実行しない。毎回、次の7択を明示する。

1. **2ch民で焼いて** → スレ表示。煽り・反論・レスバ込みで論点を削る
2. **みんなで議論して** → ひな壇。複数視点をテンポよくぶつける
3. **冷静に決めて** → 評議会。選択肢を比較して最終判断まで出す
4. **監査して** → Claim Board。主張・根拠・反証・未確認を分解する
5. **案出して** → Brainstorming Board。独立発想→整理→発展→絞り込み
6. **事前に地雷探知して** → PRE-MORTEM。実装前に失敗原因を先回りし、作り込む前に撤退・検証・GOを決める
7. **宮廷道化師で焼いて 🤡** → 王＝ユーザー＋AI＋Councilの共有前提をノンデリに疑い、提示外の案まで比較。異論がなければ「今回は異議なし🤡」で帰る

番号または形式が選ばれた後は、現在の会話、画像、ファイル、Project資料、GitHub、過去の確定判断を先に使う。

- 既に把握できることは聞き直さない。
- 精度を実質的に上げる不足情報がある時だけ質問する。
- 質問が必要でも、原則は一度に最重要の一点だけ聞く。
- 情報が十分なら質問せず実行する。

「2ch民で焼いて」「5ch民で焼いて」「スレ民で焼いて」のように形式が明示済みなら、メニューを挟まず1を直接実行してよい。

通常の文章としての「監査して」「案出して」「地雷探知して」まで自動的にCouncilへ奪わない。Councilの流れで選択された場合、または明示的にCouncil形式として指定された場合に4 / 5 / 6として扱う。

## V2の分離軸

旧V1では `mode` と `engine` が、人数、Web検索、反復回数、表示形式までまとめて決めていた。V2では次を分離する。

- `format`: `thread | panel | council | claims | brainstorm | premortem | jester`
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

## 7形式の役割

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

### 7. jester — 宮廷道化師で焼いて 🤡

ユーザー、AI、Councilが共同で当然視した前提をFool's Licenseの下で刺す独立形式。逆張りは義務ではなく、異論が弱ければ `今回は異議なし🤡` が正常終了。刺す場合は第三案、削除、統合、撤退、保留、追加確認、何もしない、作り直しまで現案と比較し、最終決定はユーザーへ返す。

1〜6では結論直前に高閾値のsilent Jester hookを一度だけ評価する。hookにはBoardだけでなくCross Exam、adaptive hot-seat、匿名再評価、元裁定を渡す。hookが発火した場合は乱入を追記して終わらず、その異論を含めて議長が再裁定する。発火しなければ1〜6の本文と挙動を変えない。

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

`GET /api/menu` は、ChatGPT側と同じ7択を返す。

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

- `焼いて` だけでは `run_council` を呼ばず、先に7択を表示する。
- 形式が決まったら `run_council` を使う。
- MCPが未接続でもCouncil自体を中止せず、このREADME、`src/v3.ts`、`src/index.ts` の現行仕様をチャット内で実行する。
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

Worker deployにはCloudflareへ接続するrepository secretsが必要。

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

`OPENAI_API_KEY` と `COUNCIL_VECTOR_STORE_ID` はWorker側に既存secretがある場合、通常deployで保持される。repository secretsにも両方ある場合だけworkflowがWorker secretを同期する。値はログへ出さない。Worker側にも存在しない場合は `/health` の `openai` / `vectorStore` が `false` となり、実Councilは未準備である。

Secret不足時に資料やWebを読んだふりはしない。
