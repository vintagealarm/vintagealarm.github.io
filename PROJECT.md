# VINTAGE ALARM — Project Instructions

> ChatGPT / Codex / 作業エージェント向けの最短起動指示。詳細規約の正本は各参照先にある。このファイルはルーターであり、既存の `AGENTS.md` / `PROJECT_STATE.md` / 分野別規約を置き換えない。

## 0. 最優先

このリポジトリでVINTAGE ALARM案件を扱うとき、会話の流れ・記憶・一般論から現行仕様を補完しない。

### VA BOOT CONTRACT — canonical owner

VINTAGE ALARMに関する**各ユーザーメッセージ**を処理するとき、最初の実行動作は GitHub `main/PROJECT.md` のfresh取得とする。直前ターン、別チャット、Memory、以前取得した内容で代替しない。

`PROJECT.md` fresh取得後に `AGENTS.md` → `PROJECT_STATE.md` をfresh取得し、対象分野の正本へ進む。必要正本未取得の状態ではタスク本文の回答・提案・分析・文章生成・実装を開始しない。

このmandatory bootは、`AGENTS.md` のcontext節約にある「既に取得したファイル・検索結果・決定事項を理由なく再取得しない」の明示的な例外である。**VAの各ユーザーメッセージを受けたこと自体が再取得理由**になる。

このboot契約のnormative ownerは `PROJECT.md` §0 のみ。AGENTS / PROJECT_STATE / Manager / Guard等には発見用pointerだけを置き、同じ本文を複製しない。

**fresh `PROJECT.md` 取得後は、必ず `AGENTS.md` → `PROJECT_STATE.md` を確認し、対象分野の正本へ進む。**

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

この表が作業別routeの単一正本。該当する行だけを選び、指定節から読む。節が * の場合も必要な見出しを指定する。複数分野の併用は必要な時だけ。必要事実が揃ったら停止し、不足・矛盾・新証拠がある時だけ追加参照する。

<!-- VA_ROUTES_BEGIN -->
| ID | 適用条件 | 次の正本 | 最初の節 | 追加参照・停止条件 |
|---|---|---|---|---|
| WATCH-TEXT | WATCH・HISTORY・OWNER本文／翻訳 | [SITE_RULES.md](SITE_RULES.md) | ## 原則 | 対象WATCHと担当節へ。必要事実が揃えば停止 |
| WATCH-RESEARCH | 個体研究・資料読解・新証拠 | [SITE_RULES.md](SITE_RULES.md) | ## 時計研究の標準フレーム | 既存MapからLedgerの該当節へ。Research Evidence Ingressを適用 |
| WATCH-OWNERSHIP | 所持・購入理由・取得・整備・修理ルート・現在状態・売却 | [SITE_RULES.md](SITE_RULES.md) | ## 個人時計台帳 — cross-repo正本 | 研究相談でも該当すればwatchdiary-ios #21 → #60をfresh照合。未照合ならHOLD |
| FOREIGN-COST | 海外価格・送料・修理費・返金額 | [SITE_RULES.md](SITE_RULES.md) | ## 海外価格・費用の日本円併記（共通出力契約） | 原額・円換算・日時・未確認費用を分離したら停止 |
| OWNER-COPY | Catch／Leadの新規・大幅改稿・選別 | [SITE_RULES.md](SITE_RULES.md) | ### Catch / Lead開発プロトコル（全WATCH共通・必須） | 公開WATCH全件比較と帰属・採否記録。短いCURRENT照会は既存Mapへ |
| HOW-RING | HOW THEY RINGの分類・表示 | [SITE_RULES.md](SITE_RULES.md) | ## HOW THEY RING — CURRENT | 対象実装と必要資料を照合。旧分類を復活させない |
| DESIGN | UI・画像・mobile・motion | [DESIGN_ENGINEERING.md](DESIGN_ENGINEERING.md) | ## 適用範囲 | 対象componentと該当実寸監査へ |
| SEO | SEO／AIO方針 | [strategy/seo-aio.md](strategy/seo-aio.md) | * | 必要な観測だけmeasurementへ。観測不要なら停止 |
| ANALYTICS | 計測単体 | [measurement/metrics.md](measurement/metrics.md) | * | 対象実装と時点を照合。SNS突合ならSOCIALを併用 |
| SOCIAL | Instagram・X・YouTube・布教・SNSとVA Analytics突合 | [measurement/.internal/.virtual/social/ROUTER.md](measurement/.internal/.virtual/social/ROUTER.md) | ## 2. 参照順 | Router内の作業別分岐へ。投稿案はinventory必須 |
| ENGLISH | 英語入口・英訳同期 | [strategy/english-entry.md](strategy/english-entry.md) | * | 日本語正本と対応言語を確認。同期変更時だけsync規約へ |
| GERMAN | ドイツ語入口・独訳同期 | [strategy/german-entry.md](strategy/german-entry.md) | * | 日本語正本から翻訳し、対応同期検査へ |
| PRESENTATION | 「プレゼンして」・研究チャット納品 | [strategy/chat-presentation.md](strategy/chat-presentation.md) | ## 1. 起動条件・優先順位 | 事実は研究正本。提出様式と分析protocolを分離 |
| COUNCIL | 形式選択済みCouncil・焼き | [council-worker/V3.md](council-worker/V3.md), [council-worker/README.md](council-worker/README.md), [council-worker/src/v3.ts](council-worker/src/v3.ts), [council-worker/src/index.ts](council-worker/src/index.ts) | * | 対象資料を先に確認。7は設計根拠と文脈manifestも確認 |
| OPERATIONS | 複数工程・実装・監査・権限・記録 | [.codex/MANAGER_CONTROL_PLANE.md](.codex/MANAGER_CONTROL_PLANE.md) | ## 1. Task Envelope | Task Envelopeと該当gateだけ。判断変更はCHANGE_DECISIONSへ |
| DEPLOY | 公開変更・本番未反映・deploy検証 | [.codex/MANAGER_CONTROL_PLANE.md](.codex/MANAGER_CONTROL_PLANE.md) | ## 公開変更の原子性とデプロイ監査 | 実装→gate→deploy→liveを区別して確認 |
<!-- VA_ROUTES_END -->

同じユーザーメッセージ内で取得済みの起動文書へ戻らない。新証拠・正本の変更・矛盾がある時は理由を記録して該当節だけ再確認する。
個人時計台帳の全条件・基本取得順・必須項目はSITE_RULESのcross-repo節。SNSのACTIVE／RESOLVED・投稿案・書込はSocial Router。起点の表へ詳細本文を複製しない。

## 3. 実行・記録の詳細

[Manager](.codex/MANAGER_CONTROL_PLANE.md)に差分編集・帰属・日時付き判断履歴・検証段階・履歴保持を集約する。新たな実装許可・公開許可を推測で作らない。回答前は[Guard](.codex/FAIL_CLOSED_INFERENCE_GUARDS.md)と担当正本でCURRENT・ユーザー決定・実物との矛盾を確認する。
道案内の実在・節・欠落・起動サイズは npm run check:routing、反例と段階読込は npm run test:routing。合成試験を実AI回答の正確性保証とは呼ばない。
