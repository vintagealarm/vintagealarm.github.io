# Task Envelope Template

> Manager Control Planeの作業単位テンプレート。正本にない値を推測で埋めない。分野固有の規則・CURRENT値はここへ複製せず、必ず正本への参照を持つ。

## Identity

- Task:
- Mode: SINGLE / SPECIALIST-ASSISTED
- State: RECEIVED
- Active PR / branch:
- Target:

## CURRENT STATE

-

## CANONICAL SOURCES

-

## SCOPE

- Change / investigate:
- Out of scope:

## MUST

-

## DO NOT

-

## REJECTED / HOLD

-

## SUCCESS CRITERIA

-

## VERIFY PLAN

- Canonical source re-check:
- Diff / artifact:
- Test / build / gate:
- Render / live / real media:
- Verifier decision: PENDING / PASS / FAIL

## CHAT AUDIT REPORT

非自明なrepository変更・公開変更・研究判断・複数工程では必須。実装系mutation前にユーザーが見えるチャットへ報告する。

- Required: YES / NO
- Reported in chat: PENDING / YES / NO
- Current state reported:
- Defect / gap reported:
- Cause reported:
- Change scope reported:
- Out of scope reported:
- Success criteria reported:
- User approval required: YES / NO
- Approval status: N/A / PENDING / APPROVED / REJECTED

## DOMAIN CONTRACT

媒体・SNS・Analytics・公開・研究等に分野固有CURRENT / write contract / validatorがある場合だけ埋める。詳細値はowner側へ残す。

- Contract source:
- Required fields resolved: YES / NO / N/A
- Canonical write contract:
- Output / update validator:
- Actual candidate / update validation: PENDING / PASS / FAIL / N/A

## INFERENCE GUARD

- Guard source: `.codex/FAIL_CLOSED_INFERENCE_GUARDS.md`
- Directional rule / source:
- Reversal target / new evidence:
- Reality checked:
- General knowledge candidate only:
- Pre-output contradiction check: PENDING / PASS / FAIL

## Delegation Decision

- Decision: SINGLE / SPECIALIST-ASSISTED
- Why:
- Specialist scope, if any:

## State Log

- RECEIVED:
- SCOPED:
- AUDIT_REPORTED:
- READY:
- EXECUTING:
- VERIFYING:
- PASS / FAIL:
- REPORT:

## Human Intervention Metrics

- USER_REINSTRUCTION_COUNT: 0
- CANONICAL_SOURCE_REDIRECT_COUNT: 0
- VERIFY_PROMPT_COUNT: 0
- POST_COMPLETION_DEFECT_COUNT: 0
- NEW_REQUIREMENT_COUNT: 0

## Final Status

- IMPLEMENTED:
- VERIFIED:
- DEPLOYED:
- OBSERVED:
