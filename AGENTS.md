# VINTAGE ALARM — 作業エージェント案内

VA案件の各ユーザーメッセージに対するfresh boot契約の正本は `PROJECT.md` §0。ここに同じ規則を複製しない。下記の起動順序はfresh `PROJECT.md` 取得後のrepo内手順であり、後段のcontext節約にある再取得抑制はmandatory bootを妨げない。

このリポジトリで作業する前に、まず `PROJECT_STATE.md` を読む。

`PROJECT_STATE.md` は現在位置と正本へのルーターであり、実装そのものの正本ではない。本番・確定状態はGitHub `main` と対象ファイルで確認する。作業中のbranch / PRがある場合は、そのbranch / PRと対象ファイルを先に確認し、`main`との差分だけを理由に未実装・旧仕様と判断しない。

## 起動順序

1. `PROJECT_STATE.md`
2. **open PRをactive queueとして先に確認**し、そこに紐づくbranchまたは会話・正本で明示された作業branchだけを現在作業中として扱う。branchが存在するだけでactiveとみなさない。対象branch / PRと`main`との差分・未完了変更を把握する
3. 今回の対象ファイル / 対象URL
4. 今回に必要な分野別ルールだけ読む
5. 必要な資料・実測ログ・Webを確認する
6. 実装 → 検証 → diff確認へ進む

## Manager Control Plane — pilot

通常作業は `.codex/MANAGER_CONTROL_PLANE.md` を管理プロトコルとして使う。Task Envelopeのfield正本は `.codex/TASK_ENVELOPE_TEMPLATE.md`、推論gate正本は `.codex/FAIL_CLOSED_INFERENCE_GUARDS.md`。

- 既定はsingle-agent。非自明な変更・研究判断・複数工程では、SCOPED後・mutation前にユーザーが見えるCHAT AUDIT REPORTを出す。
- VerifierはBuilderの自己申告ではなく、正本・diff・test / build / render / live / 実物から再判定する。
- **同一チャット内での実行指定、無断Work移管防止、GitHub可否の実検査、沈黙防止の単一正本は `.codex/MANAGER_CONTROL_PLANE.md` §2.5。** ユーザーが実行場所を指定した場合にこの節を適用する。規則本文はここへ複製しない。
- **normative rule / CURRENTはcanonical ownerを原則1箇所に置く。** PROJECT / AGENTS / PROJECT_STATE等には発見用pointerを複数置いてよいが、domain固有値を再定義しない。
- 新しいスクリーンショット・実測・資料・ユーザー訂正を受け取った場合は、対象domain Router / canonical sourceのwrite contractを確認する。既存contractが無い場合に新保存先を勝手に作らない。
- `.codex/config.toml` の `multi_agent = false` は維持する。

分野別routeのcanonical ownerは `PROJECT.md` §2。同じメッセージ内で取得済みの起動文書は再利用し、そこへ読み直しに戻らない。担当節で判断できれば追加読込を止める。

## 実行・記録の参照先

- 日時は冒頭にホスト確認済みの `YYYY-MM-DD HH:mm JST` を表示する。
- 詳細な差分編集・検証・日時付き履歴・帰属・コンテキスト節約・履歴保持はManagerへ集約した。
- 時計研究とResearch Evidence Ingress、価格、個人時計台帳、Catch / LeadはSITE_RULESの担当節へ進む。
- SNSの運用本文はSocial Router、Councilの必要正本はPROJECTのCOUNCIL行。ここへ詳細を複製しない。
