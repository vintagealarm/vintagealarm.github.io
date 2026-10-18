# VINTAGE ALARM — Manager Control Plane

> Status: PILOT
>
> Purpose: 人間が毎回行っている正本誘導・scope修正・完了確認を、single-agent既定の管理プロトコルとしてAI側へ移す。分野固有のCURRENTや規則をここへ複製しない。

## 0. 基本方針

- 既定は **single-agent**。`.codex/config.toml` の `multi_agent = false` を維持する。
- Managerは別人格ではなく、依頼受領から報告までの **control plane**。
- VerifierはBuilderの自己申告を証拠にせず、正本・diff・test / build・render / live・実物から再判定する。
- 既存の `PROJECT.md` / `AGENTS.md` / `PROJECT_STATE.md` / 分野別正本 / open PR / decision log / CIを再利用し、新DB・新queue・常駐agent registryを作らない。
- Task Envelopeのfield正本は `.codex/TASK_ENVELOPE_TEMPLATE.md`。分野固有CURRENTのownerは各domain Router / canonical sourceであり、この文書へ値を複製しない。
- 推論gateの正本は `.codex/FAIL_CLOSED_INFERENCE_GUARDS.md`。

## 1. Task Envelope

非自明なrepository変更・公開変更・研究判断・複数工程では、実行前に `.codex/TASK_ENVELOPE_TEMPLATE.md` を使ってscope・正本・禁止範囲・合格条件・検証計画を固定する。軽微な単発作業は内部短縮版でよい。

正本不足、CURRENT不明、SUCCESS CRITERIA不明、またはVerifierが成果物実体へ戻れない場合は `READY` へ進まない。

### Pre-implementation CHAT AUDIT REPORT — mandatory

非自明なrepository変更・公開変更・研究判断・複数工程では、**SCOPEDの後、実装系の書き込み操作より前に、監査結果をユーザーが見えるチャットへ報告する。**

最低限:
- **CURRENT STATE**
- **DEFECT / GAP**
- **CAUSE**
- **CHANGE SCOPE**
- **OUT OF SCOPE**
- **SUCCESS CRITERIA**

監査報告は承認要求と同義ではない。ユーザーが明示的に承認待ちを求めていない限り、報告後は `AUDIT_REPORTED → READY` へ進んでよい。

### Domain contract resolution

媒体・SNS・Analytics・公開・研究等に分野固有のCURRENT / write contract / validatorがある場合、READY前にTask Envelopeの **DOMAIN CONTRACT** へownerとvalidatorを解決する。

- domain固有値はdomain Router / canonical sourceが所有する。
- Managerは値を再定義しない。
- 新しいスクリーンショット・実測・資料・ユーザー訂正が入力された場合、該当domainにCanonical Write Contractがあればそれを使う。
- write contractが無い場合、AI都合で新しい保存先を作らない。
- PASS前はactual candidate / canonical updateそのものをdomain validatorへ通す。

### 工程別の次の参照

ここでscopeを固定した後は、今回必要な工程の節だけ読む。

- 書込前・実行場所・調査／実装／公開の権限確認：`## 2.5 Execution Surface / Capability Truth / Progress — mandatory`。
- 編集開始前：`## 基本動作`。既存変更・帰属を守り、根拠なく全置換しない。
- 判断変更の記録：`## 日時付き判断履歴 — 必須`。
- 検証・完了報告前：`## 変更と検証` → `## 6. 回答前の強制チェック` → `## 9. COMPLETION CONDITIONS`。
- 公開変更がある時だけ：`## 公開変更の原子性とデプロイ監査`。公開しない作業ではdeploy / liveを成功扱いしない。
- 読込が膨らむ時：`## コンテキスト節約`。追加正本が不要なら停止する。

## 1.5 Fail-Closed Inference Gate

正本 `.codex/FAIL_CLOSED_INFERENCE_GUARDS.md` を、READY前とPASS前に適用する。規則本文はそちらを正とし、Manager側へ複製しない。不明点が残る場合はFAIL / HOLD。

## 2. 状態遷移

```text
RECEIVED
  ↓
SCOPED
  ↓
AUDIT_REPORTED
  ↓
READY
  ↓
EXECUTING
  ↓
VERIFYING
  ├─ FAIL → EXECUTING
  └─ PASS → REPORT
```

- **RECEIVED**: 依頼受領。
- **SCOPED**: Task Envelope固定。
- **AUDIT_REPORTED**: 必要なChat Auditをユーザーへ提示済み。
- **READY**: 正本・active queue・実素材・前提・domain contractを必要範囲で確認済み。
- **EXECUTING**: 実装・調査・編集を実行中。
- **VERIFYING**: Builder説明ではなく対象実体へ戻って検証中。
- **FAIL**: 不合格。原因と証拠を保持してEXECUTINGへ戻る。
- **PASS**: SUCCESS CRITERIAをVERIFY PLANどおり確認済み。
- **REPORT**: IMPLEMENTED / VERIFIED / DEPLOYED / OBSERVEDを分けて報告。

## 2.5 Execution Surface / Capability Truth / Progress — mandatory

この節は **ユーザーが指定した実行場所を守り、ツール可否を事実で報告し、長い処理中もチャットを途切れさせない** ための横断的な単一正本。PROJECT / AGENTS / STATEへ規則本文を複製しない。

### A. Execution Surface Lock（実行場所の拘束）

1. 現在のユーザー依頼と直近の明示訂正から、`EXECUTION_SURFACE` を先に固定する。「このchat内で」「ここで」「Workに飛ばさない」は **IN_CHAT / NO_HANDOFF**。GitHubメンションやGitHubリポジトリ操作は、直ちにWorkへの移管を意味しない。
2. IN_CHAT / NO_HANDOFFの場合、**現在のチャットで利用できるGitHub connectorその他の適法な実行経路を先に試す**。Work/Computer Useへの無断切替、移管の再提案、作業停止を原則行わない。ユーザーがWork提案を明示的に拒否した同一作業中は繰り返さない。
3. 本当に別実行環境だけで可能な操作が残る場合も、**できる部分はこのチャットで実行**し、どの操作がなぜ不可なのかを根拠付きで明示する。外部runtimeの制約や、環境側の強制ルーティングまでこのGitHub文書が無効化できるとは主張しない。移管はユーザーの明示同意がある場合または上位の強制要件が実際にある場合に限り、後者はその制約を正確に伝える。

### B. Capability Evidence Gate（できない断言の禁止）

1. 「GitHubに接続できない」「書き込めない」「このチャットでは実装不可」を出す前に、その時点の **ツール一覧・接続状態・GitHub読取の実呼出し結果**を確認する。書込権限は読取成功から推定せず、対象操作が必要になった時に許可された非破壊的な書込操作（作業branch作成等）の結果で判断する。
2. **現在の実行・エラーの範囲だけ**を報告する。read成功 / write未試行 / write成功 / permission error / transient failure / tool自体不在を分離し、一度の404や失敗で「全GitHub不可」に一般化しない。
3. 別チャット、別時点の制約や一般的なツール説明を、**このチャットの事実として代用しない**。未確認の場合は「未確認」と言い、可能な検査を実行する。実際に書込可能だったと判明した場合、直前の不能断定を明示訂正し、このチャットで作業を続ける。

### C. Progress / No Silent Stall（進捗の途絶を防ぐ）

1. 多段階・長時間タスクでは、**最初に短い実行方針と終了条件をチャットで知らせる**。SCOPED後のCHAT AUDITを省略しない。
2. 作業中は **約20秒以上の無言を避け**、確認できた中間成果（取得した正本、対象差分、PR、CIの状態、失敗・再試行）を優先して更新する。確定成果は先に提示し、まだ確定していない事柄を「済み」にしない。中身のない実況だけで埋めない。
3. 実行が失敗・待機中でも、**最後に確認した具体的な状態・障害点・次の安全な処理**を伝えたうえで続ける。ユーザーに再指示を要求して作業を止めない（権限承認や必須入力が本当に必要な場合を除く）。
4. ツール応答前の進捗送信可否やバックエンドの沈黙自体はGitHub CIでは保証できない。CIで検査するのはこの作業規範とReplay fixtureの存在・整合性であり、**実チャットの達成保証とは別**に記録する。

### D. Research / Mutation / Publish Authority Gate（調査許可を実装許可へ拡張しない）

1. 「調べる」「深掘りする」「徹底的にやる」「やりましょう」「進めて」は、対象の閲覧・検索・分析・報告だけを許可する。repository編集、commit、push、PR、merge、公開は許可しない。
2. 過去の「実装して」「公開まで」等は、その時に指定された対象だけの許可であり、後続の別調査へ持ち越さない。ユーザーの訂正・不満・研究上の指摘も、それだけでは実装許可に変換しない。
3. mutation前に `RESEARCH_AUTH` / `IMPLEMENT_AUTH` / `PUBLISH_AUTH` を別々に判定する。現在の依頼に明示的な実装語が無ければ `IMPLEMENT_AUTH=NO`、merge・公開の明示が無ければ `PUBLISH_AUTH=NO` とし、該当操作を行わない。
4. CHAT AUDIT REPORT、作業計画、対象ファイルの提示、AI自身の「実装まで行う」という宣言はユーザー承認ではない。必要な許可が無ければ、調査結果を報告して止める。
5. 「差し戻せ」「元へ戻せ」は、指定された変更を復旧するmutationの明示許可として扱うが、無関係な本文改稿や新規公開の許可には拡張しない。

### E. Final Self-Check

REPORT直前に `EXECUTION_SURFACE` の遵守、`RESEARCH_AUTH` / `IMPLEMENT_AUTH` / `PUBLISH_AUTH`、不能主張の根拠、途中更新、GitHubの **branch / PR / main / deploy / live** の実際のステータスを別々に照合する。未実行は成功扱いせず、ユーザーが同じ制約を繰り返し言う必要を作らない。

## 3. Delegation Decision

既定はsingle-agent。分野固有一次資料、長い探索、Research / Build文脈衝突、明確な並列利得、権限分離がある場合だけspecialist分離を検討する。人数や並列度を品質指標にしない。

## 4. Independent Verifier

Verifierは成果物実体へ戻る。

- CANONICAL SOURCESを再取得または再確認する。
- 変更がある場合は実diffを見る。
- 機械検査があればtest / build / gate結果を見る。
- UIはrender / live、mediaは実内容、研究は一次資料、Analyticsは計測定義と実測値へ戻る。
- domain writeではcanonical ownerへの反映とvalidator結果を確認する。
- 未確認をPASSへ昇格しない。

## 5. 人間介入メトリクス

Task Envelope終了時に可能な範囲で記録する。

- **USER_REINSTRUCTION_COUNT**
- **CANONICAL_SOURCE_REDIRECT_COUNT**
- **VERIFY_PROMPT_COUNT**
- **POST_COMPLETION_DEFECT_COUNT**
- **NEW_REQUIREMENT_COUNT**

Pilot評価の主指標は上4つ。NEW_REQUIREMENT_COUNTは追加仕様として分離する。

## 6. Pilotの成功条件

- ユーザーの再指示・正本誘導・確認催促・完了後不具合発見が減る。
- 正確性を落とさず、1タスクで読む必要がある制御文書・重複規則が減る。
- 別チャットから新証拠を受け取っても、domain ownerのwrite pathへ到達し正本更新・検証できる。
- multi-agentを有効化しなくても再発事故が減る。

## 7. 変更禁止

- このpilotだけを理由に `multi_agent = true` へ変更しない。
- 新DB / 新queue / 常駐agent registryを作らない。
- domain Routerやdecision logを複製しない。
- Task Envelopeを巨大なProject Stateにしない。


## 実行・記録の詳細

## 基本動作

- VA案件でユーザーへ返す進捗・監査・最終報告は、並行作業を識別できるよう冒頭にホスト確認済みの `YYYY-MM-DD HH:mm JST` を表示する。会話時刻を推測で補わず、実行環境のJSTを確認する。
- 上位の一次情報を確認できるのに、会話記憶や一般論で補完しない。
- 未確認情報、検索需要、順位、流入、成果を推測で埋めない。
- 変更前に、現在のbranch / PR / `main`との関係、対象URL・変更ファイル・変更しない事項・合格条件を固定する。
- 作業branch / PR上の未merge差分を、`main`に存在しないことだけを理由に削除・巻き戻ししない。
- 既存のOWNER'S NOTE原文、確定済みキャッチ、資料に基づく本文を、明示指示なしに変更しない。
- 「ここだけ」「他は変更不可」は差分編集する。指定外を改善しない。
- 一つの施策を理由にサイト全体を再設計しない。
- 他者の未完了変更を上書きしない。
- 旧仕様・棄却済み候補を、新証拠または明示的な仕様変更なしに復活させない。
- 整理・最適化で履歴を消さない。superseded / rejected / closedになったPR・branch・判断・候補は、現行作業キューから外しても削除せず、後から起点・検証・採否・撤回理由を追える状態を保つ。open / closedは「今作業するか」の状態であり、履歴の価値とは分離する。古いbranchを直接mergeしない場合も、必要差分をcurrent mainへ救出したうえで元PR / branchを履歴参照として残す。
- active queue確認でbranch一覧全体を「未完了候補」として総当たりしない。open PRを第一入口にし、PRなしbranchは明示的な作業指定・decision log参照・履歴調査が必要な場合だけ開く。
- **案・発見・指摘・修正の帰属を保持する。** 誰が最初に提示したか（ユーザー / AI / Council / 資料・Web・画像）、その後だれが確認・同定したか、採用 / 棄却 / HOLD / 未決のどこに置いたかを混同しない。後から要約・Roast・Council・本文化するときも発案者を入れ替えない。
- 帰属が後続判断に効く案・発見は、関連research ledgerまたは `CHANGE_DECISIONS.md` に **起点 → 検証 → 採否理由 → 現在状態** を残す。未採用案を作者の意図や確定方針へ昇格させず、AI案をユーザー案として、ユーザー案をAI案として記録しない。
- **U/A簡易帰属（2026-10-13以降の新規判断）**：`U`＝ユーザーが提案・発見、`A`＝AIが提案・発見。判断の帰属が重要な記録では **`起点 → 判断`** を用いる（例：`U → U採用`、`A → U採用`、`A → U棄却`、`A → A修正`、`U → 未決`）。「誰が提案したか」と「誰が採否を決めたか」は別軸とし、**U採用はユーザーの明示的な採用を確認できた場合のみ**。AIによる提案・訂正・推測をユーザーの発言や性格・要求へ置換しない。外部発言の紹介やCouncil起点は `Uが紹介／原出典：外部`、`Council起点` 等と区別し、U/A本人の独自発案にしない。原発言・元資料を確認できない帰属は未確認とし、過去全件の自動再分類は行わない。新しい別台帳は設けず、前項の既存ownerへ記録する。
- 現行仕様・判断・方針・棄却候補が変わる変更は、`CHANGE_DECISIONS.md` へJST日時付きで同じ変更セット内に記録する。記録漏れがある状態を「完了」「VERIFIED」としない。
- 実装済み / 検証済み / 公開済み / 成果観測済みを混同しない。
- 未実行の検査を成功扱いしない。
- エラーが自力で解決可能なら、原因を特定して再試行してから報告する。
- 公開導線・表示ラベル・release flagを変更したら、実装箇所だけでなく `check-build-output` / `check-live-site` / layout対象route / deploy workflow内の旧文字列・旧仕様を検索して同期する。
- 過去は短時間で反映していた本番が長時間変わらない場合、「GitHub Pagesが遅い」「キャッシュ」「連続push」等を証拠なしに原因認定しない。最後に成功した公開以降の差分と、deploy前に走るgateの不整合を先に調べる。
- ユーザーが本番反映まで求めた作業は、main pushを完了としない。liveで目的物を確認するまで `DEPLOYED` と報告しない。


## 日時付き判断履歴 — 必須

これは努力目標ではなく完了条件。

- **仕様・運用・公開・計測・UI・分類・文言の意味・公開状態・検証方針・棄却判断・再発防止策が変わるすべての判断**を、同じbranch / PR内で `CHANGE_DECISIONS.md` に記録する。ユーザー訂正で旧判断を撤回した場合も対象。
- 各新規記録は `### YYYY-MM-DD HH:mm JST — ...` 形式とし、最低限 **変更 / 理由 / 旧状態・棄却 / 影響範囲 / 検証状態 / 関連 / 日時根拠** を持つ。
- 日時を頭でUTC→JST変換しない。GitHub時刻を根拠にする場合は、`2026-09-23T06:28:13Z → 2026-09-23 15:28 JST` のように**元のUTC時刻と換算後JSTを併記**し、CIで換算を検査可能にする。
- PR完了前に、merge-baseからHEADまでのcommit / changed filesと、最後に追加したdecision entryを突合し、**判断変更なのに未記録のcommitが1件もないことを確認する**。
- typo、依存更新、意味を変えない整形など本当に判断を伴わない変更だけ例外にできる。例外は黙って通さず、PR本文に `Decision-Log: not-required — <理由>` を明記する。判断変更をこの例外で逃がさない。
- `npm run check:decision-log` を必須gateとする。decision-bearingな変更があるのに `CHANGE_DECISIONS.md` が更新されていない、日時形式がない、必須項目がない、UTC→JST換算が誤っている場合は失敗させる。
- 過去の漏れを後から発見した場合は、その場で復元PRを作り、確認できるGitHub commit / PR時刻を第一根拠に補填する。「次から気をつける」だけで終わらせない。

## 公開変更の原子性とデプロイ監査

- 公開対象の変更は1 deploy単位で完結させる。表示実装、build gate、live gate、必要なlayout検査を同じ変更セットで揃えてからmainへ反映し、実装→gate→gateの分割pushをしない。
- deploy起動だけを目的としたダミーコメント・無意味なソース変更を入れない。再実行はActionsのrerun / workflow_dispatch等の正規手段を優先する。
- push後は triggered / queued / running / failed / deployed / live verified を区別する。取得できていない状態を推測で補完せず、「trigger条件を満たした」を「deployを発火した」と表現しない。
- 本番未反映時は追加pushより先に main対象実装 → workflow → build gate → layout gate → upload/deploy → live gate の順で監査し、最初に不整合が見つかった層だけを修正する。
- UI変更でmobile表示が合格条件に含まれるページは、文字列検査だけでなく check-layout の対象routeへ含める。

## 作業中 / 本番 / 公開の区別

- 作業中の現在状態: 現在のbranch / PR + 対象ファイル + `main`との差分
- 本番へmerge済みの確定状態: GitHub `main`
- 実際の公開状態: deploy成功後のlive site

この3つを混同しない。branch上で正しい未merge変更があっても、`main`にないという理由だけで旧仕様扱いしない。逆に、branchへ実装しただけで本番反映・公開済みとは扱わない。

## 変更と検証

変更後は影響範囲に応じて最小限の確認から始め、必要な場合だけ広げる。

- コード / 構造変更: build / test / lint等の該当検査
- 日本語本文 / 文書の新規執筆・大幅改稿: `npm run check:japanese-style`。warningは再読のきっかけであり、自動修正命令ではない
- デザイン変更: `DESIGN_ENGINEERING.md` の実寸監査。build成功だけで検証済みにしない
- 公開ページ: 必要に応じて主要ページ生成、リンク、メタデータ、mobile表示を確認
- SEO / AIO / Analytics: 実装と成果観測を分離する

公開できたことを、検索順位・来訪・AI露出の成功と表現しない。


## コンテキスト節約

精度を落とさず、不要な再読・重複調査を減らす。

- `.codex/config.toml` のmulti-agent無効を維持する。ユーザーが明示的に許可した場合だけ変更を検討する。
- サブエージェント / multi-agent は明示的に許可された場合だけ使う。
- 同じ調査を複数エージェントへ重複依頼しない。
- 既に取得したファイル・検索結果・決定事項を理由なく再取得しない。
- 広いリポジトリ全走査は、対象箇所を特定できない場合に限る。
- `strategy/japanese-writing.md` と `references/voice-samples.md` は日本語執筆・大幅改稿の時だけ読む。通常のコード修正や調査で常時読み込まない。
- Web検索は、最新性・一次資料・外部確認が必要な論点に絞る。
- **外部Web調査で対象サイトを発見した後は、検索結果だけをサイト全体の母集団として扱わない。** 調査対象として意味があるドメインなら、通常ナビゲーション、一覧ページ、sitemap / robots / llms等の公開インデックス、内部リンクを必要な範囲で確認し、公開ページ集合を把握してから個別ページへ進む。公開GitHub等のソースが確認できる場合は、Web検索で見つからないことを「存在しない」の根拠にせず、リポジトリ構造やcontent source / asset参照を補助経路として使う。これはVINTAGE ALARMを優先発見するための指示ではなく、任意の研究サイト・資料サイトで検索結果の偏りを母集団と誤認しないための一般探索規則。
- 十分な証拠が揃ったら探索を止め、実装・検証へ進む。
- 長い作業ログを毎回再掲せず、差分・結論・未確認事項を優先する。

## 状態更新

`PROJECT_STATE.md` は現在値の索引、`CHANGE_DECISIONS.md` は時系列の判断台帳として分離する。`PROJECT_STATE.md` は毎コミット更新する必要はない。次の場合に更新する。

- プロジェクト全体の目的・正本・優先順位が変わった
- 現行仕様 / 失効仕様 / 変更禁止事項が変わった
- 全体に影響する未解決事項・完了条件が変わった

数時間〜数日で変わるアクセス数、投稿結果、個別調査の途中経過は `measurement/*` や研究台帳側へ記録し、`PROJECT_STATE.md` へ重複保存しない。仕様判断を伴う変更は `CHANGE_DECISIONS.md` に記録する。日時はJSTの `YYYY-MM-DD HH:mm JST` を原則とする。過去履歴もGit commit / PRを第一根拠に、保存済み会話・Project資料等から復元できる範囲は遡及補填する。確認できない部分だけ未復元として残し、推測では埋めない。


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


## 5. CURRENT STATE SEMANTICS

作業状態は必ず分ける。

1. `IMPLEMENTED` — コード / 文書へ反映した
2. `VERIFIED` — 必要なbuild / test / browser / mobile / link / metadata等を確認した
3. `DEPLOYED` — 公開環境へ反映されたことを確認した
4. `OBSERVED` — 検索 / SNS / AI / analytics等で成果を観測した

`IMPLEMENTED` を `DEPLOYED` と呼ばない。`DEPLOYED` を検索・流入・AI露出の成功と呼ばない。

未実行の検査は未実行と記録する。


## 9. COMPLETION CONDITIONS

作業開始時に最低限、次を固定する。

- 現在のbranch / PR / `main`との関係
- 対象URL / 対象ファイル
- 変更する内容
- 変更しない内容
- 合格条件
- どの状態まで行うか: IMPLEMENTED / VERIFIED / DEPLOYED / OBSERVED
- 多言語修正は、EN / DEの全公開routeをbuildで検査し、main merge後に全生成HTMLのlive artifact parityと全公開WATCH / 独立研究のsemantic live checkが通るまでDEPLOYEDとしない。branch / PRに修正文があるだけの状態は本番反映と扱わない。
- 現行仕様・判断・方針・棄却候補が変わる場合、`CHANGE_DECISIONS.md` へJST日時・変更・理由・旧状態/棄却・影響範囲・検証状態・関連PR/commit・日時根拠を同じ変更セットで記録する
- PR完了前にmerge-base以降のcommit / changed filesとdecision logを突合し、判断変更の未記録が0件であることを確認する
- GitHub時刻を根拠にする場合はUTC原文とJST換算を併記し、`npm run check:decision-log` を通す

通常の完了順序:

調査 → 作業コンテキスト確認 → 対象特定 → 差分編集 → **変更した表示文言・公開フラグと全build/live gateの旧文字列・旧仕様を突合** → 必要な検証 → diff確認 → deploy → live確認 → 必要なら成果観測

公開導線・ラベル・release flagを変更した場合は、`scripts/check-build-output.mjs` / `scripts/check-live-site.mjs` / layout対象route / workflowの該当gateを同時監査する。旧ラベルを検査条件に残したまま「反映待ち」と判断しない。過去に通常数分で反映していたサイトで長時間liveが変わらない場合は、待機やキャッシュを先に推測せず、**最後に成功したdeploy以降の変更とgateの不整合を最優先で調べる**。IMPLEMENTEDやmain pushを完了報告に使わず、ユーザーが公開まで求めた作業はliveで目的物を確認してDEPLOYEDとする。

エラーが自力で解決可能な場合は、そのままユーザーへ返さず原因を特定して再試行する。
