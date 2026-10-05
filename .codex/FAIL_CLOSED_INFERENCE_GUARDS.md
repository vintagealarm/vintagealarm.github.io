# VINTAGE ALARM — Fail-Closed Inference Guards

> Status: ACTIVE
>
> Purpose: 「正本を読んだ後に、もっともらしい一般論・逆推論・対称化で既存判断を変形する」事故を止める。情報不足対策ではなく、**確認済み情報の勝手な変形を禁止するためのfail-closed gate**。

## 0. Fail-Closed

以下のどれかに該当し、必要な明示根拠を確認できない場合は、推論で埋めず **FAIL / HOLD** にする。

- directional ruleを逆向き・対称・対偶・一般形へ変形しようとしている
- USER_CONFIRMED / RESOLVED / current baselineを撤回・反転しようとしている
- route / URL / account / page / media / postの存在・用途を確認せず新設・転用を提案しようとしている
- Project正本にない一般論を現行運用へ昇格しようとしている
- 出力結論が直近のユーザー決定・正本・既存実装と衝突する

「自然にそうなる」「普通はそう」「SNSでは一般に」ではREADY / PASSへ進めない。

## 1. NO INVERSE INFERENCE

**A → B と書かれている規則は、A → B の向きだけで使う。**

明示根拠なしに次を導かない。

- B → A（逆）
- not A → not B（裏）
- not B → not A（対偶）
- A ↔ B（双方向化）
- Aの一例 → 全媒体 / 全ページ / 全個体 / 全期間への一般化
- 「Xではこうしない」→「Instagramでも同じく禁止」のような媒体間対称化

逆方向・対偶・一般化を使う必要がある場合は、**その向きを直接支える正本・ユーザー指示・実測・一次資料**を別に確認する。無ければ候補止まり。

## 2. DECISION REVERSAL GATE

USER_CONFIRMED / RESOLVED / CURRENT / 採用済み判断を変える前に、必ず次を揃える。

1. **REVERSAL TARGET** — 何を撤回・変更するのか
2. **NEW EVIDENCE** — 以前の採用時には無かった、変更を正当化する新証拠
3. **IMPACT** — 何が変わり、何は維持されるか
4. **LOG** — 仕様・運用変更なら `CHANGE_DECISIONS.md` へ同じ変更セットで記録

REVERSAL TARGETまたはNEW EVIDENCEが空なら **FAIL-CLOSED**。単なる「より一般的には」「この方が自然」は新証拠ではない。

## 3. REALITY FIRST

URL / route / account / page / component / asset / media / post / current copyについて提案する前に、確認可能な実体を先に見る。

最低限:

- GitHub route / component / data / config
- active PR差分
- live page / account / current UI（必要かつ取得可能な場合）
- 実画像 / 実動画 / 実音源 / 実投稿 / Insights

存在・用途を確認できないものは **UNKNOWN** とし、「無い前提」で新設を提案しない。既存物の転用を提案する場合も、現在用途を先に確認する。

## 4. GENERAL KNOWLEDGE = CANDIDATE ONLY

Project正本・ユーザー確定・実測に無い一般論は、**AI_PROPOSED / CANDIDATE** まで。

- 「SNSでは普通こう」
- 「Xならこう」
- 「一般的なLPではこう」
- 「通常このUIはこう」

これらは local decision を上書きしない。採用するには、今回のVAへ適用する根拠と、既存判断との非矛盾を確認する。

## 5. PRE-OUTPUT CONTRADICTION CHECK

REPORT / 回答出力直前に、今回の結論を次と照合する。

1. 直近のユーザー確定
2. CURRENT / RESOLVED / REJECTED / HOLD
3. active PRを含む現行正本
4. 既存実装・実物

次のいずれかならPASS禁止。

- directional ruleを逆向きに使っている
- USER_CONFIRMEDを新証拠なしで反転している
- 存在確認済みのroute / assetを無い前提で提案している
- 実素材・Execution Brief・過去実測より一般論を優先している
- 棄却済み案を理由なく復活させている

矛盾が新証拠による正当な更新なら、先にDECISION REVERSAL GATEを通す。

## 5.1 CHANNEL OUTPUT CONTRACT GATE

SNS等の媒体別出力を生成する場合、正本取得だけでREADYにしない。対象媒体のCURRENTから次を固定する。

1. **PLATFORM**
2. **LANGUAGE**
3. **AUDIENCE**
4. **CHARACTER LIMIT / FORMAT**
5. **SOURCE REUSE FLOW**
6. **PRE-OUTPUT VALIDATOR**（定義されている場合）

いずれかを取得できない場合はUNKNOWN / HOLD。取得済み条件に反する候補は、内容がもっともらしくてもPASS禁止。

XのCURRENT contractはSocial Routerを正本とし、ENGLISH / OVERSEAS / `/en/` / 140 characters以内 / `WATCH NAME → short English description → English hashtags` を固定する。X投稿候補に日本語文字が含まれる、または140 charactersを超える場合はFAILする。

## 6. CORRECTION PERSISTENCE

再発性がある訂正は会話だけで閉じない。

- 原因をこのguardまたは分野別Routerへ昇格
- 仕様・運用変更なら `CHANGE_DECISIONS.md` へ記録
- 再現可能なら `.codex/inference-guard-cases.json` へ regression case を追加
- `npm run check:inference-guards` で正本・fixture・既存実体との接続を検査

## 7. Manager Control Planeへの接続

Task EnvelopeのSCOPED→READY前と、VERIFYING→PASS前にInference Guardを通す。

READY前:
- Directional ruleを使うなら、その向きの根拠を特定したか
- 既存判断を変えるならREVERSAL TARGET + NEW EVIDENCEがあるか
- route / account / media等の現物を確認したか
- 一般論をCURRENTへ昇格していないか

PASS前:
- PRE-OUTPUT CONTRADICTION CHECK = PASSか
- 反転・一般化・新設前提が混入していないか
- 再発性訂正をGitHub正本へ残す必要がないか

一つでも不明ならFAIL / HOLD。