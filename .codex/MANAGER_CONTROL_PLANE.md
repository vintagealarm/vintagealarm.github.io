# VINTAGE ALARM — Manager Control Plane

> Status: PILOT
>
> Purpose: 人間が毎回行っている正本誘導・scope修正・完了確認を、まず「管理プロトコル」としてAI側へ移す。別のManager人格を常駐させることが目的ではない。

## 0. 基本方針

- 既定は **single-agent**。小さい仕事を理由なく分解しない。
- `.codex/config.toml` の `multi_agent = false` を維持する。明示指示なしに有効化しない。
- Managerは「別AI」ではなく、依頼受領から報告までの **control plane**。
- specialistは必要なときだけ使う。人数や並列度を品質指標にしない。
- VerifierはBuilderの自己申告を証拠にしない。正本・diff・test・render/live・実物を直接確認する。
- 既存の `PROJECT.md` / `AGENTS.md` / `PROJECT_STATE.md` / 分野別正本 / open PR / decision log / CIを再利用し、新DBや別キューを増やさない。

## 1. Task Envelope

非自明な作業は、実行前に次を固定する。軽微な単発作業は内部の短縮版でよいが、repository変更・公開変更・研究判断・複数工程では省略しない。

- **CURRENT STATE** — main / active PR / branch / live / 実物のどこが現在値か。
- **CANONICAL SOURCES** — 今回の正本。必要なものだけ。
- **SCOPE** — 今回変えるもの / 調べるもの。
- **MUST** — 必ず満たす要件。
- **DO NOT** — 変更禁止・推測禁止・触らない範囲。
- **REJECTED / HOLD** — 失効済み・棄却済み・保留中で復活させないもの。
- **SUCCESS CRITERIA** — 何を満たせば作業完了か。
- **VERIFY PLAN** — 誰が何を、どの実体で確認するか。

正本が不足している、CURRENT STATEが不明、SUCCESS CRITERIAが曖昧、またはVERIFY PLANが「作った本人の確認だけ」になっている場合は `READY` へ進まない。

テンプレート: `.codex/TASK_ENVELOPE_TEMPLATE.md`

## 1.5 Fail-Closed Inference Gate

正本: `.codex/FAIL_CLOSED_INFERENCE_GUARDS.md`。SCOPED→READYとVERIFYING→PASSの両方で強制する。

### READY前
- **NO INVERSE INFERENCE**: directional ruleの使用方向を確認。逆・裏・対偶・双方向・一般化には直接根拠が必要。
- **DECISION REVERSAL GATE**: 既存判断を変える場合はREVERSAL TARGET + NEW EVIDENCE必須。欠ければFAIL / HOLD。
- **REALITY FIRST**: route / account / page / media / postの既存実体を確認。未確認はUNKNOWN。
- **GENERAL KNOWLEDGE = CANDIDATE ONLY**: 一般論をCURRENTへ昇格させない。

### PASS前
- **PRE-OUTPUT CONTRADICTION CHECK** を実施し、直近ユーザー決定・CURRENT / RESOLVED / REJECTED / HOLD・active PR正本・既存実装との矛盾が0件であることを確認する。
- 矛盾を新証拠で更新する場合は、先にDECISION REVERSAL GATEを通す。
- 再発性訂正ならCORRECTION PERSISTENCEを適用する。

## 2. 状態遷移

```text
RECEIVED
  ↓
SCOPED
  ↓
READY
  ↓
EXECUTING
  ↓
VERIFYING
  ├─ FAIL → EXECUTING
  └─ PASS → REPORT
```

### RECEIVED
依頼を受領しただけ。まだ解釈を確定しない。

### SCOPED
Task Envelopeの CURRENT STATE / CANONICAL SOURCES / SCOPE / MUST / DO NOT / REJECTED-HOLD / SUCCESS CRITERIA / VERIFY PLAN を固定した状態。

### READY
必要な正本・active queue・権限・実素材・前提が確認でき、実行可能と判断した状態。未確認を自然に補完して進めない。

### EXECUTING
実装・調査・編集を実行中。Task Envelope外へ広げる場合は、先にEnvelopeを更新する。

### VERIFYING
実行結果をBuilderの説明ではなく、検証対象の実体へ戻って確認する。

### FAIL
検証不合格。原因と失敗証拠を保持してEXECUTINGへ戻す。成功扱いしない。

### PASS
SUCCESS CRITERIAを満たしたことをVERIFY PLANどおり確認済み。

### REPORT
IMPLEMENTED / VERIFIED / DEPLOYED / OBSERVEDを分けてユーザーへ返す。未実施を成功扱いしない。

## 3. Delegation Decision

既定はsingle-agentで処理する。次のいずれかが実質的にある場合だけspecialist分離を検討する。

- 分野固有の一次資料・技術判断があり、通常実装と証拠評価を分ける必要がある。
- 長い探索で、未探索領域・仮説・証拠台帳を独立管理した方がよい。
- Research / Buildの文脈が衝突し、一つの作業文脈では誤混入リスクが高い。
- 並列化で明確な情報利得がある。
- 権限を分ける必要がある。

分解コストが成果を上回る小タスクでは分解しない。multi-agent機能が無効な間は、必要なら同一GPT内で役割を順番に切り替えるが、Verifier規則は下記を守る。

## 4. Independent Verifier

Verifierの目的は「Builderがそう言った」から離れること。

### 必須原則

- Builderの要約・理由付けを最終証拠にしない。
- CANONICAL SOURCESを再取得または再確認する。
- 変更がある場合は実diffを見る。
- 機械検査がある場合は対象test / build / lint / gateの結果を見る。
- UIはrender / screenshot / live、mediaは実ファイル内容、研究は一次資料・引用箇所、Analyticsは計測定義と実測値へ戻る。
- 未確認をPASSへ昇格しない。
- 同じモデルが順番にVerifierを行う場合も、Builderの自己評価を引き継がず「正本と成果物から再判定」する。

### 典型チェック

- 文書 / 研究: claim ↔ source、事実 / 推測 / 未確認、既存正本との重複・矛盾。
- コード: diff、syntax / lint / test / build、指定外変更。
- UI: source diff → build → rendered state → 必要ならlive。
- 公開: branch / main / deploy / liveを分離。
- media: ファイル名ではなく実際の映像・音声内容。
- SNS / Analytics: Router / 実投稿 / Insights / metric definitionへ戻る。

## 5. 人間介入メトリクス

Pilotでは「AIを何体使ったか」ではなく、ユーザーが管理職として割り込んだ回数を測る。

Task Envelopeの終了時に、可能な範囲で次を記録する。

- **USER_REINSTRUCTION_COUNT** — 同じ目的のためにユーザーが再指示した回数。
- **CANONICAL_SOURCE_REDIRECT_COUNT** — ユーザーが「その正本を見て」と誘導した回数。
- **VERIFY_PROMPT_COUNT** — ユーザーが「確認した？ / live見た？ / 実物見た？」等を追加要求した回数。
- **POST_COMPLETION_DEFECT_COUNT** — AIの完了報告後にユーザーが不具合を発見した回数。
- **NEW_REQUIREMENT_COUNT** — 作業中に純粋な追加仕様が増えた回数。AI失敗とは分離する。

比較時の主指標は上4つ。NEW_REQUIREMENT_COUNTをAI品質低下として数えない。

## 6. Pilotの成功条件

- 同種案件で、ユーザーの再指示・正本誘導・確認催促・完了後不具合発見が減る。
- 小タスクの所要時間を不要な役割分解で悪化させない。
- multi-agentを有効化しなくても、Task EnvelopeとVerifierで再発事故が減る。
- それでも一つの実行文脈ではResearch / Build / Verifyを保持できない証拠が出た場合だけ、次段階としてmulti-agentを再検討する。

## 7. 変更禁止

- このpilotだけを理由に `multi_agent = true` へ変更しない。
- 新DB / 新queue / 常駐agent registryを作らない。
- 既存の分野別Routerやdecision logを複製しない。
- Task Envelopeを新しい巨大なProject Stateにしない。
