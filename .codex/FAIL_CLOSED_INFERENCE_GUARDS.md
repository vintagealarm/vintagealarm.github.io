# VINTAGE ALARM — Fail-Closed Inference Guards

> Status: ACTIVE
>
> Purpose: 正本を読んだ後に、一般論・逆推論・対称化・未確認補完で既存判断を変形する事故を止める。domain固有CURRENTはここへ複製しない。

## 0. Fail-Closed

次のどれかに必要根拠が無ければ、推論で埋めず **FAIL / HOLD** にする。

- directional ruleの逆・裏・対偶・双方向・一般化
- USER_CONFIRMED / RESOLVED / CURRENTの撤回・反転
- route / URL / account / page / media / postの存在・用途を未確認のまま新設・転用
- Project正本にない一般論のCURRENT昇格
- 直近ユーザー決定・正本・既存実装と衝突する出力

## 1. NO INVERSE INFERENCE

**A → B と書かれた規則はA → Bの向きだけで使う。** 逆・裏・対偶・双方向化・一例からの一般化・媒体間対称化には、その向きを直接支える正本 / ユーザー指示 / 実測 / 一次資料が必要。無ければ候補止まり。

## 2. DECISION REVERSAL GATE

USER_CONFIRMED / RESOLVED / CURRENT / 採用済み判断を変える前に、次を揃える。

1. **REVERSAL TARGET** — 何を撤回・変更するか
2. **NEW EVIDENCE** — 採用時には無かった変更根拠
3. **IMPACT** — 何が変わり、何を維持するか
4. **LOG** — 仕様・運用変更なら `CHANGE_DECISIONS.md`

REVERSAL TARGETまたはNEW EVIDENCEが空なら **FAIL-CLOSED**。

## 3. REALITY FIRST

URL / route / account / page / component / asset / media / post / current copyについて提案・変更する前に、取得可能な実体とactive PRを先に確認する。確認できないものは **UNKNOWN** とし、「無い前提」で進めない。

## 4. GENERAL KNOWLEDGE = CANDIDATE ONLY

Project正本・ユーザー確定・実測に無い一般論は **AI_PROPOSED / CANDIDATE** まで。local decisionを上書きしない。

## 5. PRE-OUTPUT CONTRADICTION CHECK

REPORT / 回答前に、結論を次と照合する。

1. 直近のユーザー確定
2. CURRENT / RESOLVED / REJECTED / HOLD
3. active PRを含む現行正本
4. 既存実装・実物

矛盾があればPASS禁止。新証拠による正当な更新なら先にDECISION REVERSAL GATEを通す。

## 5.5 DOMAIN CONTRACT GATE

SNS / platform-bound copy / Analytics / canonical write等、domain固有CURRENTやvalidatorがある作業では、Task Envelopeの **DOMAIN CONTRACT** へownerを解決する。

- domain固有値はdomain Router / canonical sourceを正とする。
- このGuardやManagerへ値を複製しない。
- actual candidate / canonical updateそのものをowner側のvalidatorで検査する。
- source copyやwrite contractが指定されている場合、記憶や一般論から代替しない。
- domain contractを解決できない場合はFAIL / HOLD。

## 6. CORRECTION PERSISTENCE

再発性のある訂正を、反射的な新ルール追加へ変換しない。まず原因を分類する。

- **既存規則の欠落**: 既存canonical ownerを最小差分で修正し、必要ならdecision log / regressionを更新する。
- **retrieval / routing失敗**: 新しい規則を増やす前にpointer・owner・checker接続を修正する。
- **state resolution失敗**: competing CURRENT / WORKING / HOLD等の出典を確認し、曖昧ならHOLDする。
- **再現可能な事故**: 既存 `.codex/inference-guard-cases.json` または該当domain checkerで回帰化する。Replay Evalも同じfixtureを使い、第二の事故DBを作らない。`npm run check:replay-evals` でrouting path / evidence anchorを検査し、`npm run replay:score -- <result.json>` で実行結果の読込量・hop数・再指示・false certaintyを集計できる。

同じ意味の規則をPROJECT / AGENTS / STATE / Manager / Guardへ複製して「再発防止」としない。

## 7. Manager Control Planeへの接続

READY前とPASS前にこのGuardを適用する。規則本文は本ファイルを正とし、Manager / Task Envelope / PROJECT_STATE側へ再定義しない。不明点が一つでも残ればFAIL / HOLD。
