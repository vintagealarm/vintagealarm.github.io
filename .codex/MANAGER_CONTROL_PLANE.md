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

### D. Final Self-Check

REPORT直前に `EXECUTION_SURFACE` の遵守、不能主張の根拠、途中更新、GitHubの **branch / PR / main / deploy / live** の実際のステータスを別々に照合する。未実行は成功扱いせず、ユーザーが同じ制約を繰り返し言う必要を作らない。

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
