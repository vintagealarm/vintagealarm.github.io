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

## 3.5 ENTITY CONTINUITY / RELIST GATE

同一個体・同一アカウント・同一取引の継続性がユーザー確認・当事者回答・正本のいずれかで確定している場合、商品番号・出品URL・掲載時点が変わったという事実**だけ**では別個体・別人に分断しない。先に既存domain Ledgerの出品／再出品／seller応答の履歴を照合する。継続性を撤回するなら §2 DECISION REVERSAL GATE の新証拠を提示し、なければ既存の確認結果を維持する。所在地等の別属性は、ユーザー申告とWeb／商品ページ直接確認を区別する。

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
- **再現可能な事故**: 既存 `.codex/inference-guard-cases.json` または該当domain checkerで回帰化する。Replay Evalも同じfixtureを使い、第二の事故DBを作らない。`npm run check:replay-evals` は全LOCKEDケースとfixture内lock registryの一致、routing / source assertions / scoped予算を検査する**静的整合性検査**。`npm run test:replay-evals` は欠落・意味反転・架空PASS等を拒否する反例検査であり、どちらもAI実回答Replayの成功ではない。

### Replayの実行・採点と保証範囲

- 実回答の実行は `npm run replay:run -- --adapter /path/model.mjs --reviewer /path/reviewer.mjs --output /private/results.json`。2つのNode adapterはstdinのJSONを受けstdoutにJSONだけを返す。回答adapterは `{answer, model}`、別reviewerは `{outcome, reviewer, rationale, false_certainty}` を返す。期待回答は回答adapterへ渡さず、reviewerだけへ渡す。失敗・未取得はHOLDとして保存する。モデル・API設定は勝手に補わない。
- これは**証拠を事前投入するoffline Replay**。fresh取得の順序、実ツール利用、実チャットの通知間隔を検証できたことにはしない。これらの行動を示す実行ログがなければ該当評価はHOLD。adapterを別にしても独立性・正確性の自動証明にはならない。
- `npm run replay:score -- /private/results.json` は実回答、出典の行範囲とSHA-256、読込量、外部資料、評価者・理由・実行属性を検査し、PASS / FAIL / HOLD / NOT_RUNを全LOCKED件数を分母に表示する。欠落・FAIL・HOLD・false certainty・再指示・予算超過は非0終了。単なるPASSラベルを実行・正確性の証明にしない。自己評価・人手評価・モデル評価は分けて表示する。
- `--partial` は部分診断専用。総件数を分母にし、未実行数を隠さず、全件合格とは表現しない。
- 本文の意味全体をregexで判定できるとは主張しない。現在のARSA source assertionsは、指定節内のseller回答の極性・同定保留・CURRENT状態・Guard接続を固定する。実回答の意味は別途reviewする。
- 実回答・取引記録を含む結果は公開repository外へ出力する。fixtureへ個人台帳本文を複製しない。公開されている既存履歴の削除・移管・非公開化は別の範囲判断とし、監査を口実に実行しない。

同じ意味の規則をPROJECT / AGENTS / STATE / Manager / Guardへ複製して「再発防止」としない。

## 7. Manager Control Planeへの接続

READY前とPASS前にこのGuardを適用する。規則本文は本ファイルを正とし、Manager / Task Envelope / PROJECT_STATE側へ再定義しない。不明点が一つでも残ればFAIL / HOLD。
