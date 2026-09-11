# Council Worker

COUNCIL LAB の実AIバックエンド用 Cloudflare Worker。

## MVP方針

この版は汎用サービスではなく、TypeCプロジェクト専用MVPとして設計する。

- TypeC Project Mirror を毎回固定で参照する
- `Alarm am Arm`
- `The Alarm Wristwatch`
- プロジェクトの事実認定ルール
- 追加Web URLは任意
- `DEEP WEB ×10` だけは10住民がそれぞれ独立してWebを掘る

ChatGPT Projectそのものを外部Webアプリから直接読むのではなく、非公開のOpenAI Vector Storeへ必要資料を複製し、Responses APIのFile Searchで参照する。

## 議論の深さ

表にはROUND表示を出さない。通常の匿名掲示板レスとして時系列に並べる。

- QUICK: 初手 → 返信 → 継続議論×2 → 議長
- PROJECT: 初手 → 返信 → 継続議論×3 → 議長
- DEEP WEB ×10: 10人独立検索 → 10人返信 → 継続議論×4 → 議長

住民は各段階で、返信先・継続・修正/撤回を自分で判断する。DEEP WEB ×10 は条件次第で60レス前後まで伸びるため、時間とAPIコストが大きい。

## OpenAI Vector Store 初期化

著作権資料は公開GitHubへ置かない。

ローカルにあるPDFを直接OpenAIへアップロードする。

```bash
cd council-worker
OPENAI_API_KEY="..." npm run setup:vector -- \
  "/path/to/Alarm Am Arm .pdf" \
  "/path/to/The Alarm Wrist Watch.pdf"
```

完了すると、

```text
COUNCIL_VECTOR_STORE_ID=vs_...
```

が出る。

OpenAI公式のFile Searchは、Vector Storeへファイルを登録し、Responses APIの `file_search` ツールから検索する方式。

## Workerに必要なSecret

GitHub repository secrets:

- `OPENAI_API_KEY`
- `COUNCIL_VECTOR_STORE_ID`
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

その後、GitHub Actionsの `Deploy Council Worker` を手動実行する。

Workflowが、

1. Worker secretへOpenAI API keyを登録
2. Vector Store IDを登録
3. Cloudflare Workerをデプロイ

まで行う。

APIキーやPDF本体をブラウザ・公開repoへ置かない。

## エンドポイント

- `GET /health`
- `POST /api/council`
- `GET /api/thread/:id`（D1接続時）

`/health` の想定:

```json
{
  "ok": true,
  "openai": true,
  "vectorStore": true,
  "db": false
}
```

## フロント接続

Worker URLが確定したら、COUNCIL LABのENGINE API URLへ一度設定する。

個人用MVPでは最終的にこのURLをフロントへ固定し、開発用入力欄自体を消す。

## CI

`Council Worker Check` がWorker変更時に `wrangler deploy --dry-run` を実行してコンパイルを検査する。

## D1

短い共有URLを使う場合だけ、`schema.sql` を適用し `DB` bindingを追加する。現状のハッシュ共有はD1なしでも動く。

## Remote MCP / ChatGPT接続

Workerは通常のCOUNCIL LAB APIに加えて、Streamable HTTP互換のMCPエンドポイントを公開する。

- MCP endpoint: `https://<worker-host>/mcp`
- Tool: `run_council`
- mode: `general | watch | business | roast`
- engine: `quick | project | deep-web-10`

`run_council` は、フロントのデモ文を返すのではなく、Worker内部の実Council実行系を直接呼ぶ。

- 各住民が独立に初手を出す
- 全レスを読んで返信先を自分で選ぶ
- 維持 / 修正 / 撤回を許可
- 複数波の継続議論
- 最後に議長が根拠と反証を比較して裁定

ChatGPT側でカスタムMCPアプリを作成できる環境では、この `/mcp` URLを接続先として登録し、Tool Scanで `run_council` を確認する。

### ChatGPTからのCouncil実行ルール

「焼いて」「2ch民で焼いて」「5ch民で焼いて」「スレ民で焼いて」「Councilで」などの呼び方は、MCP接続の有無にかかわらず、上記Councilの議論フローを実行する要求を意味する。

- `run_council` が利用可能なら、同ツールを使用する。
- `run_council` が利用不可・未接続でも、MCP未接続を理由に停止しない。
- 未接続時は、このREADMEと `src/index.ts` の最新仕様を読み込み、現在のチャット内でCouncilを実行する。
- 「MCPが使えないため再現する」「PROJECT相当で代用する」といった断り書きを挟んで簡略化しない。
- 単なる2ch / 5ch風の口調、一言煽り、通常の箇条書きはCouncilではない。
- 少なくとも、独立した初手、他レスを読んだ返信、反証、維持 / 修正 / 撤回、複数波の継続議論、議長による裁定を含める。
- 時計案件では、参照可能なProject資料、PDF、画像、既存実装を一般論より先に確認し、確認済み・資料記載・推論・未確認を混ぜない。

つまり、MCPはCouncilを実行するための一つの実装経路であり、Councilそのものの意味や実行可否を決める前提条件ではない。

Tool descriptionには「スレ民」「Council」「自律思考バトル」「2ch/5ch民で焼く」「DEEP WEB ×10」が明記されている。これらの呼び方は、接続中なら `run_council`、未接続なら現在のチャット内実行という違いだけで、同じCouncil仕様を指す。

### デプロイ前提

GitHub Actionsの `Deploy Council Worker` は、次のrepository secretsが揃った時だけCloudflareへデプロイする。

- `OPENAI_API_KEY`
- `COUNCIL_VECTOR_STORE_ID`
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

不足時は赤失敗にせず、warningを出してdeployをskipする。
