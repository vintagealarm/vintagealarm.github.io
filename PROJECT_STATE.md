# VINTAGE ALARM — CURRENT PROJECT STATE

更新日: 2026-10-17

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
- SNS運用ルーター: `measurement/.internal/.virtual/social/ROUTER.md`（SNS / 布教 / Instagram / X / YouTube / SNSとVA Analyticsの突合では最初に読む）
- SNS再利用資産の横断索引: `measurement/.internal/.virtual/social/content-inventory.md`。運用本文はSocial Routerを正とする。
- 外部AI観測: `measurement/aio-observation-log.md`
- Council / 焼いて: `council-worker/V3.md` + `council-worker/README.md` + `council-worker/src/v3.ts` + `council-worker/src/index.ts`; 7の誕生経緯・設計根拠は `research/COUNCIL_V3_COURT_JESTER_DESIGN.md`
- **個人時計台帳 / 所持・取得・OH・現在状態（cross-repo）**: `orima1995-create/watchdiary-ios` Issue **#21 CURRENT OWNED** を入口とし、取得遍歴は #60、保有意志は #23、周辺時計は #25、個体別CURRENT Issue（例: #58 Watchlarm / #31 CYMA）を必要に応じて追加取得する。公開VINTAGE ALARM repo内に台帳を重複生成しない

`CHANGE_DECISIONS.md` は仕様・判断の時系列台帳です。「いつ・何を・なぜ変えたか」を追う場合はここを確認します。`PROJECT_STATE.md` は現在値、`CHANGE_DECISIONS.md` は履歴を担当し、役割を分離します。

`MIGRATION.md`、`REFACTOR_AUDIT.md`、日付付き監査記録は履歴資料です。現在仕様と衝突する場合は、上記の作業コンテキスト、現在の `main`、分野別正本を順に確認します.

## 3. 担当正本の入口

- サイトの現行公開・HOW THEY RING・失効方針・Catch / LeadはSITE_RULESの担当節。実装値はfrontmatter・src/dataの実体と照合する。
- SNSの数値・予約状態・投稿方針はSocial Routerとその担当ログへ。
- Manager Control Plane pilot: `.codex/MANAGER_CONTROL_PLANE.md`。field正本は `.codex/TASK_ENVELOPE_TEMPLATE.md`。実装／検証／公開／成果の状態定義もManagerへ。
- Fail-Closed Inference Guard: `.codex/FAIL_CLOSED_INFERENCE_GUARDS.md` + `.codex/inference-guard-cases.json`。
- CouncilのCURRENT仕様本文はこのStateへ複製しない。launcherは `PROJECT.md` §1を正とする。実行用の4正本はPROJECT §2 COUNCIL行。
- PNG exporterは `tools/owner-note-slides/README.md`。制作元・権限・検査は同READMEへ。

## 4. ACTIVE WORK / CURRENT OBSERVATION POINTERS

未merge作業はopen PRを第一入口として確認する。branchの存在だけではactiveにしない。closed／supersededの履歴は保持する。
- Modern De Luxe研究: **研究証拠のCURRENT owner**は `research/MODERN_DE_LUXE_LEDGER.md`、採用済みG0研究方針は `research/MODERN_DE_LUXE_STRATEGY_RESET_20261003_JESTER.md`。旧Draft PR #135のその他39ファイルは出典・履歴・未採用草稿として同PRに保持し、時計とライターの同一事業者／ムーブメントの未解決を解決済みにしない。公開WATCHへの自動転記はしない
- 個人時計台帳: `orima1995-create/watchdiary-ios` #21を主入口に、#60 / #23 / #25および個体別CURRENT Issueへroute

### CYMA Time-O-Vox Chronomètre — VA準拠テストページ

- 状態: `DEPLOYED`。本番の既存RESEARCHページは未変更
- 採用方向: A / OWNER'S NOTE寄り
- URL: `https://vintagealarm.github.io/lab/cyma-chronometre/owners-note/`
- 認証: なし。公開テストページのためID・パスワードは不要
- 検索: `noindex,nofollow`、sitemap対象外
- 本文の流れ: Chronomètre仕様の資料確認 → 現存17件の表記差 → TavannesのUNADJUSTED事例 → MIH／Neuchâtelで掲載個体を特定できなかった地点
- 観測表: 初期状態は閉じる。開くと18K／YGを表示し、SSは二段目で折りたたむ。Movement No.は番号帯表示
- 本文から除外: 編集メモ風の「根拠／観測／推論」、三段要約、Chronomètre論証と別系統の故障研究
- 対象実装: `src/components/CymaChronometrePrototype.astro`、`src/components/CymaSpecimenTables.astro`、`src/styles/cyma-chronometre-prototypes.css`

進捗照会では上記URLと「認証なし」を回答する。実在するパスワードは公開Gitリポジトリへ保存しない。将来認証付きページへ移す場合も、GitにはURLとユーザー名、利用するSecret名だけを記録し、パスワード本体はGitHubまたはCloudflareのSecretsで管理する。

理由: 数時間〜数日で変わる数値や公開状態をこのファイルにも複製すると、古い状態を復活させる原因になるため。上記のCYMAテストページは、進捗照会時にアクセス先を即答できるよう明示的に残す例外とする。

## 5. 未解決・完了条件

今回の分野に必要な事実・CURRENT・実物が揃えば追加読込を止める。既存本文・確定コピー・指定外UIは明示指示なく変更しない。詳細な変更禁止・完了条件はSITE_RULESとManagerへ。
実AIの全件Replay、実チャットの権限遵守・通知間隔、公開取引履歴の移管判断は未了として分離する。
