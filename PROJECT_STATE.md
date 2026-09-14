# VINTAGE ALARM — CURRENT PROJECT STATE

更新日: 2026-09-14

この文書は、VINTAGE ALARMで作業を再開するときに最初に読む「現在位置の索引」です。

重要: この文書は実装そのものの正本ではありません。本番・確定状態はGitHub `main` と対象ファイルを確認します。作業中のbranch / PRがある場合は、そのbranch / PRと対象ファイルを先に確認し、`main`との差分だけを理由に未実装・旧仕様と判断しません。ここには、現在の目的、判断基準、変更禁止事項、失効済み仕様、未解決事項、完了条件を短く保持します。

## 1. CURRENT GOAL

VINTAGE ALARMは、機械式アラーム腕時計の歴史・実機・音・一次資料／専門資料を、過剰な編集的解釈を加えずに公開するサイトです。

現在の運用上の主眼:

- 完成済みWATCHページとOWNER'S NOTEの品質維持
- HISTORY / OWNER'S NOTES / WATCH間の導線維持
- 検索・SNS・外部AIから既存ページが発見可能かの観測
- 流入後に実機・音・写真・資料・次の時計へ自然に進めるかの観測
- 実装、検証、公開、成果観測を分離して記録する

検索流入最大化そのものを目的にしない。本文の水増しや大量ページ生成は行わない。

## 2. SOURCE OF TRUTH

作業コンテキストごとの優先順位:

1. 作業中のbranch / PRがある場合: そのbranch / PR、対象ファイル、`main`との差分
2. 本番へmerge済みの確定実装: GitHub `main`
3. 実際に公開されている状態: deploy成功後のlive site
4. この `PROJECT_STATE.md` の現在判断・ルーティング
5. 分野別ルール / 方針
6. 計測・実験ログ
7. Git履歴・過去監査文書
8. 会話記憶
9. 推測

作業branch / PR上では、`main`に存在しないことだけを理由に変更を削除・巻き戻ししません。まずbranch / PRのdiff、目的、未完了変更を確認します。`main`は本番・確定基準であり、作業中差分の存在を否定する根拠ではありません。

分野別の正本:

- サイト本文・階層・WATCH仕様: `SITE_RULES.md`
- デザイン / UI / motion / mobile: `DESIGN_ENGINEERING.md`
- SEO / AIO方針: `strategy/seo-aio.md`
- 英語入口: `strategy/english-entry.md`
- ドイツ語入口: `strategy/german-entry.md`
- 計測定義: `measurement/metrics.md`
- 現在までの実験結果: `measurement/experiment-log.md`
- 外部AI観測: `measurement/aio-observation-log.md`
- Council / 焼いて: `council-worker/README.md` + `council-worker/src/index.ts`

`MIGRATION.md`、`REFACTOR_AUDIT.md`、日付付き監査記録は履歴資料です。現在仕様と衝突する場合は、上記の作業コンテキスト、現在の `main`、分野別正本を順に確認します。

## 3. CURRENT BASELINE

確認済みの現行基準:

- 正規公開ホスト: `https://vintagealarm.github.io/`
- 旧 `orima1995-create.github.io/orima1995-creator.github.io/` はlegacy扱い
- 主セクション: HISTORY / OWNER'S NOTES / WATCH / RESEARCH
- SMARTWATCHはHISTORYのエピローグ。検索流入目的ではなく `noindex,follow`、sitemap対象外
- 日本語WATCH本文が多言語版の意味上の正本
- 公開済みWATCHの計測対象は Basis Alarm / Pierce Duofon / Cyma Time-O-Vox / Citizen Alarm / Westclox Watchlarm
- OWNER'S NOTES一覧の正本は `src/data/owners-directory.json`
- WATCH末尾「次の一本」の正本は `src/data/watch-recommendations.ts`
- WATCH研究メタデータ / 修正履歴の正本は `src/data/watch-research/` と `src/data/watch-research.ts`
- RESEARCH表示は `src/data/research-settings.json` の `published` で制御する
- `.codex/config.toml` では multi-agent は無効。明示指示なしに有効化しない
- Councilはprotocol-driven V2。`焼いて` 単独は即実行せず5形式を毎回明示するランチャー
- Councilの5形式は 2chスレ / ひな壇 / 評議会 / Claim Board / Brainstorming Board
- Councilはformat / domain / budget / evidence / panelSizeを分離し、人数や固定ラウンド数を品質の代理指標にしない
- Council共通プロトコルは独立初手 → Board整理 → Cross Exam → 必要時のみadaptive hot-seat → 匿名再評価 → Minority Report → 議長裁定
- Council住民は架空の家族構成・年齢等ではなく、目的・証拠方針・失敗傾向・修正条件・棄権条件で差別化する

この一覧だけで対象ページの実装状態を断定しない。編集前に必ず対象ファイルと、作業中branch / PRがある場合はそのdiffを確認する。

## 4. DO NOT CHANGE WITHOUT EXPLICIT INSTRUCTION

- OWNER'S NOTE原文
- 確定済みキャッチコピー
- 資料に基づく確定本文
- 日本語正本の意味・比喩・構成・温度・事実確度
- 一つの記事修正を理由とした共通テンプレート / サイト全体設計
- 指定外のレイアウト、画像、文言、導線

翻訳では自然さのための要約・意訳・追加説明・編集的再構成をしない。

ユーザーが「ここだけ」「他は変更不可」と指定した場合は、差分編集を優先し、指定外を改善しない。

## 5. CURRENT STATE SEMANTICS

作業状態は必ず分ける。

1. `IMPLEMENTED` — コード / 文書へ反映した
2. `VERIFIED` — 必要なbuild / test / browser / mobile / link / metadata等を確認した
3. `DEPLOYED` — 公開環境へ反映されたことを確認した
4. `OBSERVED` — 検索 / SNS / AI / analytics等で成果を観測した

`IMPLEMENTED` を `DEPLOYED` と呼ばない。`DEPLOYED` を検索・流入・AI露出の成功と呼ばない。

未実行の検査は未実行と記録する。

## 6. ACTIVE WORK / CURRENT OBSERVATION POINTERS

現在動いている施策・観測の具体値は、このファイルへ重複保存しません。最新状態は以下を確認します。

- 作業中の未merge変更: 対象branch / PR + `main`との差分
- merge済みの本番実装: GitHub `main`
- 実際の公開状態: deploy成功後のlive site
- 検索 / SNS / Analytics施策: `measurement/experiment-log.md`
- 外部AI発見性 / 意味保持: `measurement/aio-observation-log.md`
- 検索・AIO全体方針: `strategy/seo-aio.md`
- Council現行仕様: `council-worker/README.md` + `council-worker/src/index.ts`

理由: 数時間〜数日で変わる数値や公開状態をこのファイルにも複製すると、古い状態を復活させる原因になるため。

## 7. SUPERSEDED / REJECTED BASELINES

新証拠または明示的な仕様変更がない限り復活させない。

- 旧公開ホストをcanonicalとして扱う
- `ownedSortYear` を復活させる。現在は `ownedSortKey`
- 所有個体年代からHISTORY年代を自動生成する
- WATCH末尾の「次の一本」を年代順へ自動フォールバックする
- RESEARCH非公開をCSSで隠す。非公開時は生成HTML自体へ出さない
- SMARTWATCHを通常の検索流入ページとして扱う
- SEO目的だけでOWNER'S NOTEや完成済みWATCH本文を書き換える
- Calibre DB化、ブランド百科事典化、FAQ大量生成、検索語差し替え型ページ量産
- AIOだけを理由にllms.txtやQ&A分割、本文細切れ化を増やす
- build成功だけでデザイン変更を検証済みとする
- Council V1の「焼いて」で即2chスレを開始する仕様
- Council V1の `quick / project / deep-web-10` が人数と継続ラウンド数を一体で固定する仕様
- Council V1の QUICK=継続×2 / PROJECT=×3 / DEEP WEB=×4 の固定反復
- Council住民へ架空の人口属性を足して多様性の代用にする方向

個別案件の棄却候補は、その案件の研究台帳・PR・実験ログ側を正本とし、このファイルへ大量複製しない。

## 8. OPEN ISSUES

プロジェクト全体として常に確認が必要な未解決領域:

- 検索表示 / クリック / サイト来訪 / 回遊のどこで落ちているかは、同一指標として扱わない
- X / YouTube側のクリック・再生とCloudflare Entry Visitsを1対1対応とみなさない
- 外部AIがページを引用したことと、意味を正しく保持したことを分けて評価する
- AI Assistant ReferrerとAI回答内での自然露出を同一視しない
- 2026-09-10のホスト移行をまたぐ期間比較は同条件比較として扱わない

個別の未解決事項は `measurement/*`、`strategy/*`、研究用PR / 台帳を確認する。

## 9. COMPLETION CONDITIONS

作業開始時に最低限、次を固定する。

- 現在のbranch / PR / `main`との関係
- 対象URL / 対象ファイル
- 変更する内容
- 変更しない内容
- 合格条件
- どの状態まで行うか: IMPLEMENTED / VERIFIED / DEPLOYED / OBSERVED

通常の完了順序:

調査 → 作業コンテキスト確認 → 対象特定 → 差分編集 → 必要な検証 → diff確認 → 必要なら公開確認 → 必要なら成果観測

エラーが自力で解決可能な場合は、そのままユーザーへ返さず原因を特定して再試行する。

## 10. STARTUP ROUTING

新しい作業を始めるときは、全資料を毎回読むのではなく次の順序にする。

1. `PROJECT_STATE.md`
2. 現在のbranch / PRを確認し、`main`との差分と未完了変更を把握する
3. 今回の対象ファイル / 対象URL
4. 今回に必要な分野別ルールだけ読む
5. 必要な実測ログ / Web / 資料を読む
6. 実装・検証へ進む

例:

- WATCH本文修正 → `SITE_RULES.md` + 対象WATCH
- UI / 画像 / mobile修正 → `DESIGN_ENGINEERING.md` + 関係する `SITE_RULES.md` + 対象component
- SEO / AIO → `strategy/seo-aio.md` + 必要な `measurement/*`
- Analytics → `measurement/metrics.md` + 対象worker / dashboard
- 翻訳 → `SITE_RULES.md` + 該当言語strategy + 日本語正本
- 焼いて / Council → `council-worker/README.md` + `council-worker/src/index.ts`

対象が絞れているのに、理由なくリポジトリ全走査や全ルール再読をしない。
