# VINTAGE ALARM — CURRENT PROJECT STATE

更新日: 2026-09-23

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
- 視聴者画面には制作・編集・公開状態のメタ説明を出さない。認証付きプレビューも同様で、保護は認証と `noindex` で行う
- HOW THEY RING上段の代表機はHISTORY正本の著名機を使う。現行の所有・掲載個体一覧を代表機として転記しない
- HOW THEY RINGの現行分類は **GONG / CASEBACK の2種類だけ**。詳細機構を第三・第四カテゴリへ増やさない。
  - **2分類にした理由**：このページの主目的は機構分類表を作ることではなく、実機の音を入口に「どう鳴っているか」を見て・聴いてもらうこと。入口でGONG / CASEBACK / BELL / PINの4分類を並べると、CASEBACK側に含まれる構造差を同列の大分類として扱うことになり、閲覧者にも個体カードにも細分類を要求する設計になる。
  - **採用した整理**：入口は「独立した発音体を叩くGONG」と「ケースバック側の構造を使って鳴らすCASEBACK」の2つに留める。CASEBACK内部の振動板・ピン／レバー伝達・ベル状発音体などの差はFIG.02–04で見せる。つまり「大枠2分類＋内部構造の代表例」であり、FIG.02–04は第三・第四カテゴリではない。
  - **この判断で守るもの**：掲載個体はGONG / CASEBACKだけで切り替え、各カードにFIG番号・詳細型名を付けない。音を聴く導線を分類学より前に置き、同じCASEBACKでも構造が大きく違うこと自体を発見要素にする。
  - **旧4分類を棄却した理由**：GONG / CASEBACK / BELL / PINを同階層に置くと、大枠とCASEBACK内部の機構差が混在する。分類粒度が揃わず、個体ごとの細分類まで波及するため不採用。新しい一次資料で大枠そのものを変更すべき根拠が出ない限り復活させない。
- 上段の図は分類体系ではなく「同じ大分類でも鳴らし方の構造差がある」ことを見せる代表例。個体カードへFIG番号や詳細機構分類を持ち込まない。
- FIG.01 GONG: OMEGA MEMOMATIC。現行表示は「棒状の音ばねを叩く」。この機構文言はMemomatic固有資料との再照合を未完了事項として扱い、一般的なTonfeder資料だけで確定扱いしない。
- FIG.02 CASEBACK: 「振動板型 — VULCAIN CRICKET」。旧「膜状バック型」は失効。
- FIG.03 CASEBACK: 「ピン／レバー伝達型 — JUNGHANS MINIVOX」。
- FIG.04 CASEBACK: 「BELL-BASE型 — LANCO-FON · CAL.1241」。Lanco-Fon全体へ一般化しない。Cal.1241は資料上hammerがGlockeを打つことを確認したため、このcaliberに限定する。
- HOW THEY RINGの機構図根拠は、各FIGにつき確定的な1出典だけを折りたたみ表示する。原則『The Alarm Wristwatch』『ALARM AM ARM』を優先し、2冊で直接支えられない場合のみ外部資料1件を採用する。補助資料は内部検証用で、閲覧者へ列挙しない。GONG / CASEBACKと各型名はVINTAGE ALARMでの整理として明示する。
- 掲載個体の大分類は CYMA Time-O-Vox / Pierce Duofon / Wittnauer 10WA＝GONG、Citizen Alarm / Westclox Watchlarm / Basis Alarm＝CASEBACK。
- Pierce Duofonの二音源表示は **WECKER / 音あり** と **SIGNAL / 音無し**。ファイル名由来の WAKER / SILENT を表示ラベルへ戻さない。
- HOW THEY RINGの入口表示名は **HOW THEY RING**。旧「音で選ぶ」は失効。TOPではOWNER'S NOTES直下に置く。
- `.codex/config.toml` では multi-agent は無効。明示指示なしに有効化しない
- Councilはprotocol-driven V2。`焼いて` 単独は即実行せず6形式を毎回明示するランチャー
- Councilの6形式は 2chスレ / ひな壇 / 評議会 / Claim Board / Brainstorming Board / PRE-MORTEM（地雷探知）
- Councilはformat / domain / budget / evidence / panelSizeを分離し、人数や固定ラウンド数を品質の代理指標にしない
- Council共通プロトコルは独立初手 → Board整理 → Cross Exam → 必要時のみadaptive hot-seat → 匿名再評価 → Minority Report → 議長裁定
- Council住民は架空の家族構成・年齢等ではなく、目的・証拠方針・失敗傾向・修正条件・棄権条件で差別化する
- PRE-MORTEMはコード0行での前提破壊と最小SPIKE後の再評価を分け、致命傷 / 高確率地雷 / 設計上の負債 / 好み / 未検証を分類して、GO / SPIKEしてからGO / 作り直せを裁定する

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

## 7. SUPERSEDED / REJECTED BASELINES

- HOW THEY RINGを GONG / CASEBACK / BELL / PIN 等の4分類へ戻す
- CASEBACK個体をFIG.02/03/04の詳細分類でカード分類する
- FIG.02の「膜状バック型」表記を復活させる
- FIG.04をcaliber指定なしの「LANCO-FON」全体へ一般化する
- HOW THEY RING入口名を「音で選ぶ」へ戻す
- Pierce Duofonの表示ラベルへ WAKER / SILENT を使う

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
- `TEST SURFACE`、`非公開プレビュー`、`PUBLIC`、`CMS EDIT`、音源準備中、追加予定などの制作メタを視聴者画面へ表示する
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

調査 → 作業コンテキスト確認 → 対象特定 → 差分編集 → **変更した表示文言・公開フラグと全build/live gateの旧文字列・旧仕様を突合** → 必要な検証 → diff確認 → deploy → live確認 → 必要なら成果観測

公開導線・ラベル・release flagを変更した場合は、`scripts/check-build-output.mjs` / `scripts/check-live-site.mjs` / layout対象route / workflowの該当gateを同時監査する。旧ラベルを検査条件に残したまま「反映待ち」と判断しない。過去に通常数分で反映していたサイトで長時間liveが変わらない場合は、待機やキャッシュを先に推測せず、**最後に成功したdeploy以降の変更とgateの不整合を最優先で調べる**。IMPLEMENTEDやmain pushを完了報告に使わず、ユーザーが公開まで求めた作業はliveで目的物を確認してDEPLOYEDとする。

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
