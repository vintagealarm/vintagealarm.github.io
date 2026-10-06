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
