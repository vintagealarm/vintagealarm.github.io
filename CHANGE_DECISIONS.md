# VINTAGE ALARM — DECISION / CHANGE LOG

この文書は「いつ・何を・なぜ変えたか」を人間が時系列で追うための台帳です。Gitのcommit履歴を置き換えるものではなく、仕様判断・棄却理由・再検討条件を短く残します。

## 記録ルール

- 日時は **JST (UTC+09:00)**、`### YYYY-MM-DD HH:mm JST — ...` 形式で記録する。
- 現行仕様・判断・方針・棄却候補が変わる変更は、実装と同じbranch / PR内で必ずここへ追記する。未記録のまま完了・VERIFIED扱いしない。
- 各新規項目は最低限 **変更 / 理由 / 旧状態・棄却 / 影響範囲 / 検証状態 / 関連 / 日時根拠** を残す。
- GitHub時刻を日時根拠にする場合は、元のUTC時刻とJST換算を `2026-09-23T06:28:13Z → 2026-09-23 15:28 JST` の形で併記し、CIで換算を検証する。
- PR完了前にmerge-base以降のcommit / changed filesと本台帳を突合し、判断変更の未記録が0件であることを確認する。
- 単なるtypo、依存更新、意味を変えない整形など、後から判断経緯を追う価値がない変更は記録不要。ただしdecision-bearingなパスを変更するPRで例外を使う場合は、PR本文に `Decision-Log: not-required — <理由>` を明示する。
- `PROJECT_STATE.md` は「今どうなっているか」、このファイルは「いつ・なぜそうなったか」を担当する。現在値を両方へ長文で重複させない。
- 過去履歴も可能な範囲で遡及復元する。日時はGit commit / PRを第一根拠とし、保存済み会話・Project資料・スクリーンショット等を突合して判断理由を補う。確認できない日時・理由だけ「未復元」とし、推測では埋めない。

---

## 2026-10-05

### 2026-10-05 20:44 JST — Fail-Closed重複driftを解消し、Slides exporter重複PRをcurrent mainへ一本化

- **変更**：PROJECT.md / AGENTS.md / `.codex/MANAGER_CONTROL_PLANE.md` / PROJECT_STATE.md に重複挿入されていたFail-Closed系CURRENT記述を、意味を落とさず各1系統へ整理した。PROJECT.md末尾の同一確認項目5行の重複も除去した。同時に、同一exporter実装を保持していたPR #182 / #185を比較し、workflow / scripts / manifest / README / package contractが同一であることを確認したうえで、current main起点のbranchへ有効差分だけ再playした。元PRは履歴として削除せず、new current-main PRの検証・merge後にsupersededとしてcloseする。
- **理由**：Fail-Closed導入自体がCURRENT正本へ重複を作り、再発防止ルールがdrift源になっていた。また #182 / #185 は同一9ファイルを扱う重複active queueで、片方を古いbaseのままmergeするとmain側のPierce / Social更新を巻き戻す危険があったため。
- **旧状態・棄却**：重複文言を履歴保存と誤認してCURRENT正本へ二重保持する状態、#182または#185をmergeabilityだけで選んでそのままmergeする案、重複PRやbranch自体を削除する案を棄却する。履歴はPR / branch / commit / decision logに残し、CURRENTだけを一意化する。
- **影響範囲**：PROJECT.md、AGENTS.md、`.codex/MANAGER_CONTROL_PLANE.md`、PROJECT_STATE.md、OWNER'S NOTE slide exporter関連workflow / scripts / manifest / README / package.json / .gitignore、PR #182 / #185 lifecycle。公開WATCH本文・OWNER'S NOTE本文・SNS実測・PR #135 / #186は変更しない。
- **検証状態**：source PR #182 / #185のexporter主要8ファイルがbyte-for-byte同一であることをGitHub取得で確認。current mainからfresh branchへ差分適用済み。新PRのCI通過・merge・main再取得・旧PR close完了まではVERIFIEDとしない。
- **関連**：source PR #182 / #185、branch `fix/failclosed-exporter-consolidation-20261005`、commits `22cca726` / `4351d34b` / `6acf9521` / `8b26c037` / `ea6c97d1` / `7f6939cb` / `6bd05cce` / `d1c64233` / `0d520ec6` / `526dacb9` / `ca869112` / `af5c4d19`、先行判断 2026-10-04 21:45 JST「履歴保存と現行作業キューを明示分離」。
- **日時根拠**：system-provided local time `2026-10-05T20:44:40+09:00` = `2026-10-05 20:44 JST`。


### 2026-10-05 16:51 JST — Social Execution Brief一式をmain反映・CI検証完了

- **変更**：PR #178をmainへmergeし、MR-PIE-001の公開記録・16:03 Insights snapshot・Execution Brief bridge・観察箇所指定standard・Instagram Insights parser修正を現行mainへ確定した。旧PR #173はsupersededとしてclose済み。
- **理由**：ユーザー指示「じゃそこまで」に基づき、branch記録だけで止めず、current mainへ安全にreplayし、CIとmain再取得まで完了させるため。
- **旧状態・棄却**：non-mergeableなPR #173をmerge pathとして残す状態、PR #178のCI成功前にmain反映済みと扱う状態、main再取得なしでVERIFIEDと呼ぶ状態を棄却。
- **影響範囲**：Social Router、Content Inventory、Instagram Published Copy / Insights / Operations、social inventory checker、Instagram Insights parser、Decision Log。公開WATCH本文・UI・別PR #177には変更なし。
- **検証状態**：VERIFIED。PR #178 head `c79e80bd2ab9b7130ff333dcde489b317a7e5b9e` でGitHub Actions `Astro foundation check` run #593がSUCCESS。merge commit `3aca9e3877d1326733ce76e9b8eb21c2ae06f2a6` 後、mainから16:03 snapshot・観察箇所指定standard・16:06 operations記録・parser decisionを再取得して反映を確認した。
- **関連**：PR #178、superseded PR #173、workflow run #593、merge commit `3aca9e3877d1326733ce76e9b8eb21c2ae06f2a6`。
- **日時根拠**：GitHub PR #178 merged_at `2026-10-05T07:51:14Z → 2026-10-05 16:51 JST`。


### 2026-10-05 16:47 JST — Instagram Insights parserでsubsection境界をsnapshot終端にする

- **変更**：`scripts/instagram-insights-timeseries.mjs` のcanonical parserで、同一WATCH内の `## ` subsection見出しをsnapshot終端として扱うよう修正した。WATCH自体は維持するため、その後の別content snapshot（例: Pierce Duofon `MR-PIE-001`）は同じWATCHの時系列として引き続き集計される。
- **理由**：PR #178 CI #591で、Pierce Duofonの旧snapshot後に追加した `## Mechanism follow-up — MR-PIE-001` 配下のPublication evidenceが直前snapshotのfieldとして誤解釈され、`duplicate field source_status` で `check:instagram-insights` が失敗したため。
- **旧状態・棄却**：新snapshot側の `source_status` を削る、区切り `---` でWATCH contextごと切る、checkerを無効化する回避策は棄却。いずれも正本契約またはMR-PIE-001の時系列集計を壊す。
- **影響範囲**：Instagram Insights canonical parserのみ。保存済み数値・Published Copy・WATCH本文・UIには変更なし。
- **検証状態**：commit `ba614dca` で実装。PR #178の再CIで `check:instagram-insights` と後続quality gatesがPASSするまで未VERIFIED。
- **関連**：PR #178 / failed workflow run #591 / MR-PIE-001 16:03 snapshot。
- **日時根拠**：GitHub commit `ba614dcac282b86a3ce732d0c470486a0be1cd3d` `2026-10-05T07:47:13Z → 2026-10-05 16:47 JST`。


### 2026-10-05 16:43 JST — PR #173有効差分をcurrent mainへ再replay

- **変更**：non-mergeable化したPR #173の有効なSocial差分を、current `main` から新規branch `social-execution-brief-finalize-20261005` へ再適用した。main側で進んだFail-Closed / Manager Control Plane等を保持しつつ、Content Inventory / Insights / Operations / Published Copy / social checkerを再playし、Social RouterとDecision Logはcurrent mainへ差分mergeした。
- **理由**：PR #173は現行main進行後に `mergeable=false` となり、そのままmergeするとcurrent mainの変更を落とす危険があるため。ユーザー指示「じゃそこまで」に基づき、main反映可能な経路へ救出する。
- **旧状態・棄却**：PR #173 branchを古いbaseのまま強行mergeする状態、current mainのRouter / Decision Logをbranch版で全置換する状態を棄却。
- **影響範囲**：Social Router、content inventory、Instagram Insights / Operations / Published Copy、social inventory checker、Decision Log。公開WATCH本文・UI・別PR #177には触れない。
- **検証状態**：fresh branchへreplay済み。新PR作成後、mergeability / GitHub Actions / diffを確認し、PASS後にmainへmergeして再取得するまで未VERIFIED。
- **関連**：旧PR #173、replay commits `1da841b5` / `eb29fe6a` / `ac7ba540` / `f6d190d1` / `fc1f865f` / `539afb91` / `231ab06c`。
- **日時根拠**：GitHub commit `231ab06c4382e35f9bc3a0fb910dcc2dba9c5489` `2026-10-05T07:43:44Z → 2026-10-05 16:43 JST`。


### 2026-10-05 16:06 JST — Reelの観察箇所指定を標準化

- **変更**：Instagram Reelで、視聴者が追うべき機構・部品・変化点が明確な素材は、冒頭で観察箇所を指定することを標準化した。音の変化も主題なら聴覚誘導も併記する。MR-PIE-001の16:03 Insights snapshotも時系列正本へ追加した。
- **理由**：ユーザーがMR-PIE-001の実績確認後に「見る箇所指定は今後のスタンダートになる」と明示確定。今回Reelは16:03 JST時点で3,264 views / 1,840 viewers / non-followers 98.4%、profile accesses 10 / bio-link clicks 3 / follows 2まで到達し、Meta UIはskip 37.0%を「低」、share 0.6%・save 0.5%を「高」と表示した。
- **旧状態・棄却**：観察箇所指定をMR-PIE-001だけの個別copy知見として留め、次回制作時に会話記憶へ依存する状態を棄却する。一方で「観察箇所指定が伸びの単一原因」「全Reelへ同じ文型を機械適用」という一般化は採用しない。
- **影響範囲**：Social Router ACTIVE、instagram-operations、instagram-insights-timeseries、今後のExecution Brief / Reel copy。WATCH本文・Published Copyの過去投稿本文・静止画投稿には遡及変更しない。
- **検証状態**：active PR #173 branchへ実装中。Router commit `f5e32c79`、16:03 Insights commit `078b328b`。正本再取得とPR CI確認後にVERIFIED判定する。
- **関連**：MR-PIE-001、2026-10-05 08:23 copy learning contract、2026-10-05 08:44 Execution Brief bridge、2026-10-05 09:22 initial snapshot。
- **日時根拠**：developer-provided local time `2026-10-05T16:06+09:00` = `2026-10-05 16:06 JST`。

### 2026-10-05 16:05 JST — OWNER'S NOTE Slides PNG exporterを正本化
- **変更**：現行private Google Slidesの6 WATCH × JA/EN/DE = 18枚をmanifestで固定し、Slides APIのLARGE PNGを1600×2233で実ピクセル検査してartifact化するexporter、checker、手動Actions workflow、運用READMEを追加する。
- **理由**：Slides実体は現存する一方、以前のlocal-only export実装はcurrent GitHub正本に無く、再現可能なremote正本が必要なため。
- **旧状態・棄却**：旧local実装を推測復元する案、手動スクリーンショットや後処理リサイズを正規exportとみなす案、private deckを公開リンク化する案は採用しない。
- **影響範囲**：owner-note slide export用tools/scripts/workflow、package.json、.gitignore、PROJECT_STATE.md、本判断履歴。Slides本文・翻訳・レイアウト、公開WATCHは変更しない。
- **検証状態**：connected Google Slidesで18枚すべてがimage/png・1600×2233で返ることを実測済み。repository側はPR CI通過までVERIFIEDとはしない。Actions実exportは認証設定後の成功実行までruntime未検証。
- **関連**：2026-10-05ユーザー指示「じゃあそこを作成しようか部長」「GitHubどうぞ」／canonical deck ID `1Lcz0CEZncDw1GncI4RMY6qDmfO4Fknq4NvpGtBZAaLk`／source PR #182 / #185。
- **日時根拠**：developer-provided local time `2026-10-05T16:05+09:00` = `2026-10-05 16:05 JST`。

### 2026-10-05 09:23 JST — MR-PIE-001初回比較をoperationsへ同期

- **変更**：MR-PIE-001の初回比較要約をinstagram-operationsへ同期。
- **理由**：Insights正本に保存した観測を運用判断へ接続するため。
- **旧状態・棄却**：timeseriesだけに数値を置き、比較判断を会話だけに残す状態を棄却。
- **影響範囲**：instagram-operationsのみ。
- **検証状態**：active PR #173 branchへ反映。CI再実行待ち。
- **関連**：commit `88cab14d`、MR-PIE-001。
- **日時根拠**：ユーザー提供スクリーンショットの端末時刻 2026-10-05 09:22 JST直後。

### 2026-10-05 09:22 JST — MR-PIE-001公開と初回Insightsを正本化

- **変更**：MR-PIE-001をPLANNEDからPUBLISHEDへ移行し、実投稿全文をinstagram-published-copy、09:21–09:22 JSTの初回Insightsをinstagram-insights-timeseriesへ保存。Pierce assetはPIE-05 / PIE-06をUSED、PIE-07は6時窓が今回未表示のためPARTIAL維持。
- **理由**：ユーザー提供の公開投稿画面とReel Insightsで、公開本文・hashtags・194 views / 33 viewers / 5s average watch / likes 6 / saves 2 / skip 12.9% / non-followers 95.4%等を確認したため。
- **旧状態・棄却**：MR-PIE-001をPLANNEDのまま残す状態、今回の動画で6時窓まで使用済みと扱う状態を棄却。
- **影響範囲**：Instagram Published Copy、Insights time series、Social Content Inventory、MR-PIE-001。WATCH本文・既存投稿は変更しない。
- **検証状態**：active PR #173 branchへ記録。CI再実行後にVERIFIED判定する。
- **関連**：commits `c5a8705e` / `a011530f` / `21dde07f`、MR-PIE-001、Wittnauer static carousel comparison baseline。
- **日時根拠**：ユーザー提供スクリーンショットの端末時刻 2026-10-05 09:21–09:22 JST。

### 2026-10-05 08:44 JST — Social棚から実制作へExecution Briefを必須化

- **変更**：Social運用へ `Content Inventory → Content Assignment → Execution Brief → storyboard / caption → publish` の引継ぎ層を追加した。Execution BriefはactiveなInstagram content単位で持ち、Media reality / Attention cue / Sensory proof / Causal beat / Published collision / Carry-forward / Constraints / Working copyを必須項目とする。実素材未確認のPLANNEDのみ `MEDIA_PENDING` を許容し、SHOT / EDITED / SCHEDULEDは `MEDIA_VERIFIED` 必須。 `check:social-inventory` へactive Instagram assignmentとbriefの対応・必須field・media status検査を追加し、MR-PIE-001を最初の実例として登録した。
- **理由**：ユーザーが「今までの分析の意味は？ 棚卸はその視点でしてなかったの？」と指摘。Council 1で、研究→棚卸し→投稿選択は接続されていた一方、過去Published Copy / Insights / Operationsで得た制作知見と実素材観察を、選択済みassetからcaption / Reelへ渡す層が無く、投稿時に一般論へリセットされることを根本原因と裁定した。
- **旧状態・棄却**：全assetへMicro fit / Micro treatmentをAI単独で固定して棚を肥大化させる2026-10-03旧案は復活させない。反対に、Assignmentだけ作って「どう見える／何が聞こえる／既出との差分／素材制約」を会話記憶へ任せる運用も棄却する。
- **影響範囲**：Social Router、content-inventory、instagram-operations、social inventory checker、MR-PIE-001。公開WATCH本文、OWNER'S NOTE、既存Published Copy、Insights実測値は変更しない。
- **検証状態**：stale化したPR #169で先行実装後、current mainから `social-execution-brief-replay` へ有効差分を再適用。GitHub再取得とCI通過後にVERIFIEDとする。main反映／公開サイト変更は別状態。
- **関連**：PR #169、replay commits `263667c4` / `dff111dc` / `c774e76a` / `5a52d4b8` / `14031167`、2026-10-03 21:33 asset→content→media予約制、2026-10-03 22:47 AI単独Micro treatment撤回、2026-10-05 08:23 copy learning contract、MR-PIE-001。
- **日時根拠**：developer-provided local time `2026-10-05T08:44+09:00` = `2026-10-05 08:44 JST`。

### 2026-10-05 08:23 JST — Instagram本文生成で過去知見と最新ユーザー原稿を強制継承

- **変更**：Social Routerへ `INSTAGRAM COPY LEARNING CONTRACT` を追加し、①目の前の実素材を先に確認、②最新ユーザー訂正／原稿をworking baseとして保持、③過去実投稿で得た視覚誘導・音誘導・機構説明の知見を次稿へ持ち越す、④Instagram全文は英語全文→hashtags→自然な日本語訳の順で一括提示、⑤hashtagsは実投稿precedentを根拠なく増減しない、を再発防止規則として固定した。MR-PIE-001についてはユーザー提示の日本語原稿全文を `instagram-operations.md` に `USER_WORKING_DRAFT` として保存し、実動画が文字盤なしの内部アラーム機構映像である境界もassignmentへ追記した。
- **理由**：直前のAI回答が、実動画と既存 `instagram-published-copy.md` を確認した後にもかかわらず、一般的なSNS短文へ戻り、これまでの訂正・実投稿から得た知見とユーザーが提示した具体的な説明順を次稿へ継承できなかった。ユーザーから「今までの反省や得た知見を活かせ」と明示訂正されたため。
- **旧状態・棄却**：毎回ゼロから最適化し直す草案生成、実素材にない文字盤／表示窓／別カットを補う構成、ユーザー原稿受領後にAI旧草案へ巻き戻す運用、全文要求に対してhookや途中稿だけ返す運用を棄却する。
- **影響範囲**：Social Router、instagram-operations、content-inventoryのMR-PIE-001 evidence。本番公開本文・`instagram-published-copy.md`・Insights実測値・WATCH本文は変更しない。
- **検証状態**：PR #169で先行実装し、current-main replay branchへ救出。USER_WORKING_DRAFTは公開済み扱いにせず、公開確認後にだけPublished Copyへ昇格する。
- **関連**：PR #169、MR-PIE-001、Pierce Duofon初回Published Copy、2026-10-05ユーザー訂正「今までの反省や得た知見を活かせ」。
- **日時根拠**：runtime JST clock `2026-10-05T08:23:30+09:00` = `2026-10-05 08:23 JST`。

### 2026-10-05 07:22 JST — CYMA棚完成と画像→動画交互運用、次枠をDuofon機能Reelへ

- **変更**：CYMA Time-O-Voxの初期AI_PROPOSEDを、ユーザーが明示NG／制約指定したもの以外すべて採用としてreview completeへ進めた。次投稿をPierce Duofon機能Reel `MR-PIE-001` としてPLANNED予約し、当面の投稿順を `画像 → 動画 → 画像 → 動画` の交互ローテーションとする。
- **理由**：ユーザーが「初期候補NGだけさしてるので採用」「Duofon機能の動画一回挟んで、画像→動画→画像→動画」と確定。rolling shelfから時計＋内容を選ぶ運用と両立しつつ、formatも交互に検証できる。
- **旧状態・棄却**：CYMAの未明示候補をAI_PROPOSEDのまま保留する状態を終了。Reel連投または静止画連投を基本とする運用は採用しない。ただし交互順をInstagram普遍則・固定頻度とはみなさない。
- **影響範囲**：Social Router ACTIVE、content inventoryのCYMA review / Assignment Registry、instagram operations。公開WATCH本文・OWNER'S NOTE・既存Published Copy / Insightsは変更しない。Duofon機構動画の公開サイト実装は別作業。
- **検証状態**：PR #169で先行実装し、current-main replay branchへ有効差分を救出。CI通過後にmain反映可否を判定する。
- **関連**：user decision 2026-10-05 07:22 JST、MR-PIE-001。
- **日時根拠**：developer-provided local time `2026-10-05T07:22+09:00` = `2026-10-05 07:22 JST`。

### 2026-10-05 06:55 JST — ARSA残タスクの状態同期とJSH 1958メタデータを確定

- **変更**：ARSA Research Map内で⑤AS1475章の状態が一箇所だけ `ACTIVE / CLOSING CHAPTER` のまま残っていたため、既に確定済みの `PASS 1 COMPLETE / CLOSING FRAME FIXED` へ同期した。同時にThe Watch Libraryの1958年JSH通年記録について、Public Domain・822 pagesをWeb確認済みへ昇格し、1958年A. Reymond 60周年記事本文自体は未取得のままOPENとした。1948 / 1973 Mémoires d'Ici資料も再探索したが、今回も本文ではなくarchive metadataまでに留まることをLEDGERへ追記した。さらに1967年SwisstimeのARSA hunter pocket watchで、winding crown上のbuttonを押してcoverを開く当時記述を確認し、Blind Alarmのcrown-integrated openerを「accessibilityに有効なARSAの構造」としつつ「accessibility専用に発明された機構」とは扱わないよう解釈を更新した。
- **理由**：同じResearch Map内で⑤の完了状態が二重化しており、次回タスク分解で未完了扱いへ戻る再発要因になっていた。また前回はユーザー報告として扱っていたJSH 1958の822ページ情報を、The Watch Library本人のメタデータで独立確認できたため確度を更新する必要があった。加えて1967年ARSAの別カテゴリ製品でもcrown-button cover releaseが確認できたため、Blind Alarmのopenerをaccessibility専用発明と暗黙に読む余地を狭める必要があった。
- **旧状態・棄却**：⑤をACTIVEへ戻す読み方を棄却。JSHの通年スキャンが存在することと、その中のA. Reymond記事にBlind Alarmが掲載されることを同一視する解釈も引き続き棄却する。1948 / 1973資料の本文を後年二次資料から補完することもしない。Blind Alarmのcrown-integrated openerをaccessibility専用に考案された機構と断定する読み方も棄却し、1967 hunterとの同一case / supplier / 直接系譜については未確認のまま保持する。
- **影響範囲**：`research/ARSA_BLIND_ALARM_RESEARCH_MAP.md`、`research/ARSA_BLIND_ALARM_LEDGER.md`、本判断履歴。公開WATCH / OWNER'S NOTE本文・画像、個人時計台帳は変更しない。
- **検証状態**：The Watch Libraryの `Journal Suisse d'Horlogerie | 1958` 記録で1958 / Public domain / 822 pagesを確認。Mémoires d'IciでD-11140、D-16590および1973年のA. Reymond関連文書群の存在を再確認したが、本文は未取得。Europa Star / Swisstimeの1967 ARSA press itemで、18 ct. gold hunter pocket watchのcoverがwinding crown上のbuttonで開く当時記述を確認。Research Mapの「次の実行順」では⑤が既にPASS 1 COMPLETEだったため、P2見出し側だけがstaleであることをGitHub main上で確認した。
- **関連**：commits `8984ca8d` / `b635b01d` / `6c0c2ba3` / `c3adc71b`、2026-10-04 13:06 JST「ARSA 01/03のperiod-image採用条件を固定」。
- **日時根拠**：system-provided local time 2026-10-05T06:55+09:00 = 2026-10-05 06:55 JST。

### 2026-10-05 17:13 JST — Pierce創業年sync gateをYAML改行に耐える形へ修正
- **変更**：pierce-founding-yearの日本語source checkを、YAML折返し後も同じ事実を検査できる2つの部分文字列へ分割する。
- **理由**：現行本文は1883年・創業者・Biel/Bienneの意味を保持しているが、YAML改行でraw完全一致だけが失敗していたため。
- **旧状態・棄却**：本文をchecker都合で1行へ戻す案、1883年の事実を変更する案は採用しない。
- **影響範囲**：src/data/localization-fact-sync.jsonと本判断履歴のみ。Pierce本文・翻訳・公開表示は変更しない。
- **検証状態**：current mainでJA/EN/DEの事実保持を確認済み。PR CI通過までVERIFIEDとはしない。
- **関連**：commit 2c608e50、PR #182 CI run 37281767057。
- **日時根拠**：GitHub commit time 2026-10-05T08:13:34Z → 2026-10-05 17:13 JST。

## 2026-10-04

### 2026-10-04 21:53 JST — active queueをopen PR基準へ固定

- **変更**：現在作業中の探索入口を、branch一覧全体ではなくopen PRへ固定した。open PRに紐づくbranch、または会話・正本で明示的に作業中指定されたbranchだけをactive扱いし、closed / superseded PRやPRなしbranchは原則HISTORYとして扱う。履歴自体は削除しない。
- **理由**：履歴保存を徹底するとbranch数・closed PR数は自然に増えるため、branchの存在だけを未完了作業とみなすとactive queueが再び埋没する。過去の取捨選択を保持しつつ現在作業を即発見するには、作業キューと履歴保存の入口を分離する必要がある。
- **旧状態・棄却**：branch一覧を広く見て存在するbranchを未完了候補として扱う運用を棄却する。一方、古いbranch・closed PRを削除して一覧を短くする案も引き続き棄却する。
- **影響範囲**：PROJECT.md、AGENTS.md、PROJECT_STATE.mdの作業開始・active queue判定。GitHub履歴、公開サイト、WATCH本文、Analytics、SNS実測、研究内容は変更しない。
- **検証状態**：現時点のopen PRはModern De Luxe研究PR #135のみであることを確認。branch一覧には多数の履歴branchが残るが、それらをactive queueへ自動昇格しない規則を3正本へ同期した。CI通過後にmainへ反映する。
- **関連**：commits `e42b5050` / `aae30593` / `213c6645`; 先行判断 2026-10-04 21:45 JST「履歴保存と現行作業キューを明示分離」。
- **日時根拠**：system-provided local time 2026-10-04T21:53:05+09:00 = 2026-10-04 21:53 JST。


### 2026-10-04 21:45 JST — 履歴保存と現行作業キューを明示分離

- **変更**：PR / branch / commit / decision / rejected・superseded候補を、整理・最適化だけを理由に削除しない方針をPROJECT / AGENTS / PROJECT_STATEへ明文化した。open / readyは現在の作業キュー、closed / draft / superseded / HOLDは履歴として参照可能な退避状態として扱う。古いbranchを直接mergeしない場合も、必要差分だけcurrent mainへ救出し、元PR / branchは取捨選択・訂正・撤回理由を追える履歴として残す。
- **理由**：直前のPR整理で「active queueから外す」と「過去を消す」が混同され得る表現があり、ユーザーが、過去も取捨選択を含めて後から参照できる設計であることを明示したため。VINTAGE ALARMでは採用案だけでなく、棄却案・訂正・失敗経路も将来の再判断材料になる。
- **旧状態・棄却**：古いPR / branchを履歴保存のためopenのまま残す運用は引き続き棄却する。一方、キュー整理のためにPR / branch / decision history自体を削除する案も棄却する。closeは削除ではない。
- **影響範囲**：PROJECT.md、AGENTS.md、PROJECT_STATE.md、GitHub PR / branch lifecycle方針。公開サイト、WATCH本文、Analytics、SNS実測、研究内容は変更しない。
- **検証状態**：現mainのclosed PR群が引き続き参照可能で、#157 / #152 / #147等のsuperseded経緯がPR・decision logから追跡可能であることを確認。今回の変更は履歴保持ルールの明文化であり、既存PR / branchの削除は行っていない。
- **関連**：commits `d93fa7d4` / `dad12de4` / `4654b837`。先行判断: 2026-10-04 18:45 JST「open PRの作業キューを整理」。
- **日時根拠**：system-provided local time 2026-10-04T21:45:09+09:00 = 2026-10-04 21:45 JST。


### 2026-10-04 20:48 JST — 現行正本の一致検査を最小CIへ追加し、残存driftを修正

- **変更**：PROJECT_STATEのHOW THEY RING FIG.03を現行実装の「ピン伝達型」へ同期し、CASEBACK説明中の旧「ピン／レバー伝達」も同じ現行語へ揃えた。PROJECT_STATEの正本一覧へSocial Routerを追加し、ACTIVE WORKのCouncil pointerをV3.md / README / src/v3.ts / src/index.tsの4正本へ揃えた。さらに `scripts/check-project-consistency.mjs` を追加し、canonical host、Social Router routing、Council V3 pointer、HOW THEY RING FIG.01 / FIG.03、公開WATCH 6 routeとllms列挙、measurement target 5 WATCHの意味分離を `check:quality` で機械検査する。PR #162はcurrent-main replayとしてCI success後にmergeし、同内容を保持していた旧PR #157はsupersededとしてcloseした。
- **理由**：直前監査で、実装が「ピン伝達型」なのにPROJECT_STATEだけ旧語、Social RouterがPROJECT / AGENTSにはあるのにPROJECT_STATEの正本一覧ではinventoryしか示さない、Council V3の正本を同じPROJECT_STATE内で完全列挙している一方ACTIVE WORK pointerだけ旧2ファイル、という目視同期由来のdriftが残っていた。既に同種のFIG.01・公開6本/measurement 5本・AIO traversal driftも発生しており、毎回人間またはAIが複数文書を手作業で照合するより、意味が固定された少数項目だけをCIで比較する方が再発防止コストが低いと判断した。
- **旧状態・棄却**：重複する現行事実を各文書へ記載しつつ目視だけで同期する運用を棄却する。一方、全PROJECT_STATEや全方針文書をschema化して巨大な単一正本へ集約する案は過剰設計として採用しない。checkerは今回実際にdriftした少数の機械的一致項目だけを対象とする。
- **影響範囲**：PROJECT_STATE.md、scripts/check-project-consistency.mjs、package.json、quality gate、PR lifecycle (#162 / #157)。公開WATCH本文、OWNER'S NOTE、HOW THEY RING表示実装、Analytics runtime、SNS実測値は変更しない。
- **検証状態**：PR #162 headのAstro foundation check run 37195443524がsuccessであることを確認してmerge commit `3b70698507abcd8752616cfe460fc2f05ec2f94f` を作成し、旧#157をclose。新しいconsistency branchでは対象正本と現行実装を再取得して差分を限定した。branch CIで新checkerを含むquality / buildを通過後にmerge可否を判断する。
- **関連**：commits `2bb38232` / `eedaed4c` / `c9712bcd`; PR #162 merge commit `3b70698507abcd8752616cfe460fc2f05ec2f94f`; superseded PR #157。
- **日時根拠**：system-provided user local time 2026-10-04T20:48+09:00 = 2026-10-04 20:48 JST。


### 2026-10-04 19:27 JST — Social inventoryのVerify taxonomyへREADY_FROM_SOURCEを正式追加

- **変更**：正本assetのVerify状態へ `READY_FROM_SOURCE` を追加し、`check-social-content-inventory.mjs` の許可集合へ同期した。
- **理由**：rolling shelf replayでWIT-10を正本assetへ昇格した際、候補層では既に `READY_FROM_SOURCE` を使っていた一方、正本asset checkerは `READY_FROM_WATCH / RECHECK_SOURCE / OPEN_QUESTION / RIGHTS_CHECK` だけを許可しており、データモデルとgateが不一致だった。WIT-10はWATCHだけでなくHorlbeck等の資料確認を根拠にするため、`READY_FROM_WATCH`へ意味を潰して寄せず、source確認済み状態を正式化する。
- **旧状態・棄却**：source確認済みassetを便宜上 `READY_FROM_WATCH` へ偽装する案、およびcheckerだけを無効化する案を棄却する。
- **影響範囲**：`scripts/check-social-content-inventory.mjs` のVerify taxonomy。既存assetの判定、公開SNS投稿、WATCH本文、Insights値は変更しない。
- **検証状態**：初回replay CI run `37195353045` がWIT-10の `READY_FROM_SOURCE` をinvalidとして正しく検出したため、taxonomy側を明示同期。修正後CIで再検証する。
- **関連**：commit `1f0dc21777542718b49ba7f0ed906cde8ec996f5`、PR #162。
- **日時根拠**：GitHub commit `1f0dc21777542718b49ba7f0ed906cde8ec996f5` 2026-10-04T10:27:19Z → 2026-10-04 19:27 JST。

### 2026-10-04 19:24 JST — PR #157のrolling SNS候補棚をcurrent mainへ再適用

- **変更**：PR #157の有効差分をcurrent mainから作り直したbranchへ再適用した。Candidate Review Queueを時計横断rolling shelfとして扱い、KEEPと次回投稿採用を分離する運用、WittnauerのKEEP / MERGE / DROP結果、CYMA双方向alarm settingのKEEPをSocial Router / inventory / operations / PROJECT / AGENTS / PROJECT_STATEへ同期した。
- **理由**：PR #157はSNS候補棚の現役作業だが、直前のPR hygiene・正本整合修復でmain側が進み、旧branchをそのままmergeするとAGENTS / PROJECT_STATE / CHANGE_DECISIONSの新しい修復を巻き込みやすい状態になったため。現mainを基底に必要差分だけ再適用する。
- **旧状態・棄却**：競合した旧PR #157へmain側変更を力技で混ぜてそのままmergeする案を棄却する。rolling shelfのユーザー確定判断自体は維持し、履歴として旧PRを残す。
- **影響範囲**：PROJECT.md、AGENTS.md、PROJECT_STATE.md、Social ROUTER、content-inventory、instagram-operations、本判断履歴。公開WATCH / OWNER'S NOTE / Insights実測値 / Analytics runtimeは変更しない。
- **検証状態**：旧PR #157 head `ffe620dc31d497d395695273380a7c2571f28d61` のdiffをcurrent mainへ手作業で再適用。social 3正本は旧headの内容をそのまま移し、PROJECT / AGENTS / PROJECT_STATEはcurrent mainの後続修復を保持した差分適用とした。CI通過後に新PRをmergeし、旧PR #157はsupersededとしてcloseする。
- **関連**：旧PR #157、replay commits `3a32e7b8` / `84e5fb22` / `7351aafe` / `ec26a01a` / `75c7b2b7` / `ca6c7087` / `457940a6`。
- **日時根拠**：GitHub commit `457940a65ee76cfc90336d7c509f6fb751de2673` 2026-10-04T10:24:18Z → 2026-10-04 19:24 JST。

### 2026-10-04 19:13 JST — PR #147のsemantic clarity規則とARSA working copy判断を現mainへ救出

- **変更**：全WATCH共通Catch / Lead開発プロトコルへsemantic clarity ruleを復元し、PR #147に残っていたARSA Blind Alarmの12:31棄却判断と12:52 working SUB / NOTE判断を現行decision logへ回収した。
- **理由**：PR #147はcurrent mainから32 commits遅れた競合branchになっていた一方、追加した意味回収規則とユーザー原文のworking stateはmainへ着地していなかった。古いbranchをmergeするのではなく、現mainへ必要差分だけ救出する。
- **旧状態・棄却**：身近な語へ置換しただけで説明力が下がる比喩や、主語・述語・指示先を読者側で補完しないと読めない断片を候補として残す運用を棄却する。PR #147をそのまま競合解消してmergeする案も採用しない。
- **影響範囲**：SITE_RULES.mdのCatch / Lead開発プロトコル、ARSA copy判断履歴、CHANGE_DECISIONS.md。公開WATCH / OWNER'S NOTE本文そのものは変更しない。
- **検証状態**：current mainのSITE_RULESとPR #147 diffを照合し、未着地なのがsemantic clarity 2項と当該2判断であることを確認。branch CIでquality / build / mobileまで通過後にmergeする。
- **関連**：commit `57445624`; rescue元 PR #147。
- **日時根拠**：GitHub commit `5744562479d241eedf4dadf039aaf6be6ee36714` 2026-10-04T10:13:59Z → 2026-10-04 19:13 JST。

### 2026-10-04 19:07 JST — 正本・履歴・外部探索の横断矛盾を修復

- **変更**：①AGENTSのstartup routingへSNS / Social Routerを復元、②PROJECT_STATEのHOW THEY RING FIG.01を現行「輪状の音バネ」へ訂正、③PR #152のsite traversal一般探索規則と外部AI観測をcurrent main基準で救出、④AIO再現テストの「公開済み5 WATCH」を「measurement target 5 WATCH（公開6本とは別）」へ訂正、⑤CHANGE_DECISIONSのH1より前に新規項目が積まれる構造崩れを修復し、checkerへcanonical H1先頭・単一H1の検査を追加、⑥PR #113で未着地だった2026-09-23の時刻訂正と欠落判断を現行形式で回収した。#157は#159 merge後の競合状態を踏まえ、一時的にdraftへ戻してcurrent-main追従後にready判定する。
- **理由**：正本・実装・履歴・作業キューを突合すると、公開実装は「輪状」なのにPROJECT_STATEだけ「棒状」、公開WATCHは6本なのにAIOログの現行再現テストだけ「公開済み5」、PROJECT.mdではSNS Router必須なのにAGENTS上段routingにはSNS行がない、decision log自身がH1より前へ追記されてもCIが通る、という複数のdriftが同時に残っていた。さらにsite traversalの重要な再発防止策と9/23履歴補修が古い競合PRへ取り残されていた。
- **旧状態・棄却**：各正本の重複記述を目視だけで同期する運用、検索結果だけを対象サイト全体の母集団とみなす探索、歴史保存のためだけに古いfixをopen PRへ残し続ける運用を棄却する。公開6本とmeasurement target 5本を同一概念へ戻さない。
- **影響範囲**：AGENTS.md、PROJECT_STATE.md、strategy/seo-aio.md、measurement/aio-observation-log.md、scripts/check-decision-log.mjs、CHANGE_DECISIONS.md、PR #157のreview state。公開WATCH本文・OWNER'S NOTE・HOW THEY RING実装・音源・Analytics集計ロジックは変更しない。
- **検証状態**：GitHub mainのHOW THEY RING localizationsでJA「輪状の音バネ」、EN ring-shaped、DE ringförmigを確認。PROJECT_STATEの公開6本 / measurement target 5本を確認。PR #152 / #113のdiffを現mainと照合し、古い状態をそのままmergeせず必要差分だけ再適用した。branch CIでdecision-log構造・quality gate・buildを通した後にmerge可否を判定する。
- **関連**：commits `e59eaa2a`, `5049b540`, `7763ae78`, `00f6bf2c`, `671824fb`, `7a493759`; rescue元 PR #152 / #113; active PR #157。
- **日時根拠**：GitHub commit `7a4937598fc8b4c90e69b9c86323e61d4532a298` 2026-10-04T10:07:02Z → 2026-10-04 19:07 JST。

#### 2026-09-23 backfill（PR #113から現行形式へ救出）

- 15:59 JST — GONGの表示を「棒状の音ばね」へ変更した判断。翌9/25に「輪状の音バネ」へ再修正され、現在は失効。commit `b0a9f9358b7e52581f94d8d3d9f4a33c682c4238`。
- 16:07 JST — Pages本番deployで進行中runをcancelせず後続をqueueする運用へ変更。commit `02a98c87dca02ea60db0f0bf487d58a4bd0ada79`。
- 16:21 JST — 公開変更時にbuild / live / layout / workflowの旧仕様まで回帰監査するルールを必須化。commits `d89d559d93f8f4fc6fe8bce21b6218647beb8e70`, `bbc731545d4505ca67e91965e24b49ca511c8235`。
- 16:25 JST — HOW THEY RINGを共通section menuへ追加。後日、日本語メニュー表示だけ「音で見る」へ変更。commit `8c59094e6549d1468ba5c82b81fe8cc1d83c7787`。
- 16:56 JST — 公開変更を1 deploy単位で原子的に扱う運用へ変更。commit `2ece305039e5ce2fb94963ccf46a80b65f6fc779`。
- 21:22 JST — llms / schemaとHOW THEY RING操作導線を最小拡張。commit `23db671fe28bbe84834587342688bec286391261`。
- 22:17 JST — Analytics AI URL relay v2のrange / bucket / sampling表示境界を確定。関連commit群は旧PR #113の履歴を参照。
- 22:29 JST — HOW THEY RINGの録音条件を iPhone 16 / 約20 cm / unprocessed と公開注記化。commit `462feded4fbe0adb7c37dbaf4b33d7fc4f5fec55`。
- 22:57 JST — GONG / CASEBACK selectorのベル＋TAP装飾をactive側だけに限定。commit `cfc67d3c42adacefd90c22b461a2a17b8cef7132`。

### 2026-10-04 18:55 JST — CYMA双方向アラーム設定をKEEP
- **変更**: PR-CYM-010をUSER_KEEPへ変更し、正本asset CYM-09として追加。内容は「アラーム時刻を双方向で設定可能。精度重視なら反時計回り推奨」。
- **理由**: ユーザーが、双方向でアラーム時刻を設定できるタイプは少数派寄りでSNS資産価値があると判断。WATCH guideでも双方向設定は確認済み。
- **旧状態・棄却**: PR-CYM-010を弱め／DROP寄りとしたAI初期評価を棄却。
- **影響範囲**: social content inventoryのCYMA候補棚。公開WATCH本文、既存投稿、Insightsは変更しない。
- **検証状態**: branch social-rolling-candidate-shelfへ反映。PR #157のCIとmain反映は別途確認。
- **関連**: user decision 2026-10-04 18:55 JST「10はkeep」。commit fd218180。
- **日時根拠**: system-provided user local time `2026-10-04T18:55:57+09:00` = `2026-10-04 18:55 JST`。

### 2026-10-04 18:45 JST — open PRの作業キューを整理

- **変更**：open PR 14件を再監査し、#13 / #45 / #59 / #62 / #65 / #88 / #105 / #109 / #127 をcloseして履歴へ退避。#135 / #147 / #152 は有効な未merge情報を含むが現行mainと競合するためdraft化。#113は未反映の時刻訂正を含むhistorical repairとしてdraft保持。#157は現行SNS作業としてreadyのまま維持。
- **理由**：「履歴を残す」と「現在の作業キューに置く」が混在し、数百commit behindのbranchや後続実装済みPRまで未完了作業に見えていたため。
- **旧状態・棄却**：古いPRを履歴保存だけの理由でopenのまま残す運用を棄却する。
- **影響範囲**：GitHub PR lifecycleのみ。公開サイト・WATCH本文・Analytics・SNSデータ・runtimeは変更しない。
- **検証状態**：整理後のopen PRは #157 / #152 / #147 / #135 / #113 の5件。#135 / #147 / #152 / #113はdraft、#157はready。#88は現行mainでDuofonのWECKER / SIGNAL二音源が実装済み、#105は「公開WATCH 6本 / measurement target 5本」が現行正本化済みであることを個別確認。
- **関連**：上記PR群。
- **日時根拠**：PR #152 draft化後のGitHub updated_at 2026-10-04T09:45:43Z → 2026-10-04 18:45 JST。

### 2026-10-04 17:58 JST — Wittnauer 10WAのベゼル形状をWIT-04へ統合し、歴史・実測2候補を棄却
- **変更**: PR-WIT-006「ケースより張り出す回転ベゼル＋後方へ絞るケース形状」を独立assetにせずWIT-04へMERGE。WIT-04は二階建て／すり鉢状ケース、掲載個体での手首への収まり、ケースより張り出す回転ベゼルを一つの側面形状assetとして扱う。PR-WIT-007「Wittnauer最初のアラーム腕時計」とPR-WIT-008「文献5–7秒 vs 掲載個体実測」はUSER_DROP。WIT-03には掲載個体観察「見た目ほど巻き上げにくくない」を付記した。
- **理由**: ユーザーがPR-WIT-006はWIT-04と同じ側面造形として合体、PR-WIT-007/008はSNS棚に不要と判断。直前の実機写真・操作感から、Horlbeckの『巻上げが非常に難しい』という評価を掲載個体へそのまま適用しないことも確認済み。
- **旧状態・棄却**: PR-WIT-006を独立micro-Reel候補として残す案、PR-WIT-007/008をKEEP候補として残す案を棄却。『すり鉢状ケースだから掲載個体も巻き上げにくい』という解釈も棄却。
- **影響範囲**: `measurement/.internal/.virtual/social/content-inventory.md` と `instagram-operations.md` のWittnauer candidate review。公開WATCH本文、OWNER'S NOTE、Published Copy、Insights、既存研究asset WIT-07（1952特許）/ WIT-08（1955 AS1475）は変更しない。
- **検証状態**: branch `social-rolling-candidate-shelf` に反映。PR #157のquality gateを再確認し、main反映前にinventoryとdecision logを再取得する。
- **関連**: user decision 2026-10-04 17:58 JST「６ 合体 ７８drop」。関連commit: `cd45eb8a` / `8ad67d99`。
- **日時根拠**: system-provided user local time `2026-10-04T17:58+09:00` = `2026-10-04 17:58 JST`。

### 2026-10-04 13:06 JST — ARSA 01/03のperiod-image採用条件を固定
- **変更**：1956–60のARSA Blind Alarm本人を名指し／図示する広告・catalog・price listは未回収として03のperiod-image探索をHOLDへ移し、代用品広告を入れない方針を固定した。01では1970 DavoineのA. Reymond社広告を1点だけ使い、blind watchesとalarm wristwatchesが同時に企業specialtyとして掲げられていた会社レベル証拠に限定する。1958年3–4月号JSH No.2のA. Reymond 60周年記事は存在確認済みだが本文未取得のため、Blind Alarm掲載有無はOPENのままbonus archiveへ置く。
- **理由**：商品本人を示す1950年代一次画像がない状態で、通常ARSA alarm、非alarm tactile watch、AFB、Enicar等を近似広告として03へ置くと、本人資料と誤認させる。03は実機・専門書・本文だけで成立しており、period adは発見時のupgradeであってcompletion blockerではない。
- **旧状態・棄却**：広告がないため近似資料で空白を埋める案を棄却。1958 JSH記事の存在だけからBlind Alarm掲載を推定することも禁止する。
- **影響範囲**：research/ARSA_BLIND_ALARM_LEDGER.md、research/ARSA_BLIND_ALARM_RESEARCH_MAP.md、本判断履歴。公開WATCH / OWNER'S NOTE本文・画像はまだ変更しない。
- **検証状態**：ユーザー探索結果を起点に、AbeBooks上でJSH No.2 mars-avril 1958の書誌と目次中のA. Reymond 60周年記事をWeb確認。The Watch LibraryがJSH 1876–1978を収蔵することも確認。DIJU / Worldtempusのearly-1950s tactile-watch記述は既存研究と整合。JSH記事本文およびBlind Alarm掲載有無は未確認。
- **起点・帰属**：探索と「01=Davoine 1970を1点、03=代用品なし、本物が出た時だけ再判定」という採用判断はユーザー。AIはGitHub現行状態と公開Webで証拠境界を再確認し正本化。
- **関連**：Deep Dive ① / ③ / ③b、Davoine 1970、JSH No.2 mars-avril 1958、DIJU、Worldtempus 2003。
- **日時根拠**：current local time source 2026-10-04T13:06:48+09:00 = 2026-10-04 13:06 JST。

### 2026-10-04 12:26 JST — SNS候補棚を時計横断rolling shelfへ変更
- **変更**: Candidate Review Queueを「時計ごとに順番に完了させるレビュー」ではなく、複数WATCHのAI_PROPOSEDを継続的に追加し、ユーザーが候補棚から次の「時計＋内容」を選べるrolling shelfとして定義した。USER_KEEPはassetとして棚に残す確定であり、次回投稿採用とは分離する。WittnauerではWIT-03 / WIT-04 / WIT-06をUSER_KEEPとして反映した。
- **理由**: ユーザーの目的は各時計を一つずつ完了させることではなく、VA基礎情報から実機で使える内容をどんどん棚卸しし、時計と内容の組み合わせを比較して投稿を決められる状態を作ること。
- **旧状態・棄却**: 「Wittnauerを全部確定してから次の時計へ進む」ような直列運用、およびKEEP＝次回投稿採用とみなす解釈を棄却する。
- **影響範囲**: PROJECT.md、AGENTS.md、PROJECT_STATE.md、Social ROUTER.md、content-inventory.md、instagram-operations.md。公開WATCH本文、OWNER'S NOTE原文、既存Published Copy / Insightsは変更しない。
- **検証状態**: branch `social-rolling-candidate-shelf` で実装。PR quality gateを通し、main反映後に再取得確認する。
- **関連**: 2026-10-04ユーザー指示「こういうのでどんどん棚卸して時計と内容と決めれるようにしようぜって言ってるの。」およびWittnauer 3件のKEEP判断。関連commit: `28a83082` / `d602ff67` / `b44ee567` / `2c6e14f9` / `8106d500` / `ba2fccc5` / `1fbd75e5` / `df45aee5` / `c1f7a6a5`。
- **日時根拠**: 当セッションのユーザーローカル時刻 2026-10-04 12:26 JST（UTC+09:00）。

## 2026-10-03

### 2026-10-03 16:20 JST — 宮廷道化師へ人格UIと最大context pre-flight責務を追加

- **変更**：Council V3の宮廷道化師へ、事実・帰属・時系列・採否・撤回理由に最も几帳面で、自説撤回・`陛下の勝ち`・`今回は異議なし🤡`を正常動作とする人格UIを追加した。あわせて明示7では、Current state / Decision ancestry / Corrections・reversals / REJECTED・HOLD / Evidence trail / Adjacent consequences を評価前に正本から復元する、Council内で最も重いcontext pre-flightを必須化した。
- **理由**：直前の2ch roastで、コレクション遍歴全体を扱う依頼に対し `Baume → Reverso → Rolex → Wittnauer → Basis → CYMA → Modern → Duofon → Citizen → Westclox → ARSA` と圧縮し、現行遍歴正本にある D1 Milano、Bravingtons Renown、JLC Memovox 14K、Modern De Luxe tricolor、watch-lighter、Eterna 8 DAYS等を落とした。ユーザーから「欠落しすぎ」と訂正され、宮廷道化師は誰よりもログ・判断経緯・全体像を把握しているべきだと明示されたため。
- **旧状態・棄却**：道化師を主にFool's Licenseとノンデリ口調で定義し、通常Councilと同程度の文脈回収で実行できる状態を棄却する。直近要約や代表例だけを「全体」として扱うことも不可とする。
- **影響範囲**：`council-worker/V3.md`、`council-worker/README.md`、`AGENTS.md`、`research/COUNCIL_V3_COURT_JESTER_DESIGN.md`、本判断履歴。V2の1〜6の意味・番号、公開サイト、WATCH本文、SNS実測、個人台帳の事実内容は変更しない。
- **検証状態**：GitHub mainのCouncil V3正本群を再取得し、cross-repo `orima1995-create/watchdiary-ios` #60の現行CHRONOLOGYを全文確認。欠落していた遍歴要素を特定し、その失敗例を設計根拠へ明記した。ChatGPT内Councilの正本挙動は文書へ反映済み。外部Worker runtimeのprompt実装・deployは別状態として扱う。
- **起点・帰属**：人格UI案の起点はAI、採用はユーザー。『誰よりもログを遡り、全体・経緯・判断詳細を把握しているべき』というcontext責務の追加はユーザー。正本への制度化はAI。
- **関連**：`council-worker/V3.md`、`council-worker/README.md`、`AGENTS.md`、`research/COUNCIL_V3_COURT_JESTER_DESIGN.md`、watchdiary-ios #60。decision-bearing commits: `fdf7dfc9` / `b58476da` / `de78e6ac`。
- **日時根拠**：最初の実装commit `3406908087988d5fd8ac3a8e28e0bff749b1a6ca` のGitHub時刻 `2026-10-03T07:20:51Z → 2026-10-03 16:20 JST`。

### 2026-10-03 15:56 JST — SNS運用判断を既存ログの検証対象へ明示接続し、投稿頻度低下＋品質優先をACTIVE仮説として固定

- **変更**：Social Routerへ `DECISION → EVIDENCE LINK` を追加し、ACTIVEなSNS運用判断ごとに `Decision / Origin / Evidence / Revisit・falsifier / Status` を既存ログへ対応付ける。あわせて、ユーザーが既に採用している「初期運用より投稿頻度を落とし、投稿前のWeb・外部事例・過去SNS実績確認を増やして1本あたりの内容品質を優先する」方針を `ACTIVE / UNDER VALIDATION` として `instagram-operations.md` に明記した。
- **理由**：Instagram Insights・実投稿copy・X / YouTube先行実績・VA Analyticsは詳細に保存されている一方、「どの運用判断の真偽を審議するためのログか」が正本上で明示されていなかった。ユーザーから、頻度低下はWeb参照後に採用した判断であり、現在のログはその真偽を検証するために取っていると再確認されたため、センサーやKPIを増やさず判断と証拠だけを接続する。
- **外部確認**：Meta公式Instagram Best PracticesはCreation領域でhow often to postを扱い、一般助言に加えてaccount-specificなpersonalized tipsを提供すると説明しており、公開説明では一律の最適投稿回数を示していない。MetaのInstagram ranking説明もshare等を含む多数の予測を組み合わせ、単一signalだけで価値を決めないとしている。したがってWeb情報を普遍則へ昇格せず、VA自身の実測で検証する方針を採用する。
- **旧状態・棄却**：詳細ログだけを蓄積し、後から「何を検証していたか」を会話から再構成する状態を棄却する。一方、この改善のために新しいKPI、専用ダッシュボード、別ログディレクトリ、固定の最適投稿回数を新設する案も採用しない。
- **影響範囲**：`measurement/.internal/.virtual/social/ROUTER.md`、`measurement/.internal/.virtual/social/instagram-operations.md`、本判断履歴。既存Instagram Insights値、実投稿本文、公開サイト、WATCH / OWNER'S NOTE、VA Analytics実装には変更なし。
- **検証状態**：GitHub mainのSocial Router / instagram-operations / metricsと既存時系列運用を再取得し、既存ログで非フォロワー配布、保存 / 共有、follow、profile action、bio-link、VA到達を観測できることを確認。Meta公式Best Practices（2024-10-01）とInstagram ranking説明（2023-06-29）を外部再確認。Wittnauer 10WAの写真 / Reel差は現時点ではユーザー説明・比較材料として扱い、単発結果からformat全体の優劣へ一般化しない。固定の具体投稿回数は現行正本で確認できないため復元しない。
- **起点・帰属**：投稿頻度を落として1本あたりの質を上げる判断と「ログはその真偽の審議用」という指摘はユーザー。Decision→Evidence接続の不足指摘は宮廷道化師formatでAIが提示し、ユーザーが採用。外部資料の再確認と正本への実装はAI。
- **関連**：`measurement/.internal/.virtual/social/ROUTER.md`、`measurement/.internal/.virtual/social/instagram-operations.md`、`measurement/.internal/.virtual/social/instagram-insights-timeseries.md`、`measurement/.internal/.virtual/social/instagram-published-copy.md`、`measurement/experiment-log.md`、`measurement/metrics.md`。
- **日時根拠**：会話ターンのローカル時刻 `2026-10-03T15:56+09:00` = `2026-10-03 15:56 JST`。

### 2026-10-03 14:30 JST — ARSA Deep Dive ⑤を完了し、AS1475を「platform→branches」で閉じる

- **変更**：⑤AS1475と変貌種をPASS 1 COMPLETE / CLOSING FRAME FIXEDへ移行。AS1475の通常alarm普及をbaselineに、Park-O-Phonのparking UI、ARSA / Enicar / BEATのtactile UI、AS1568 date派生、AS1930 / 1931高振動後継、Citizen / Poljot等のdirectly-based descendantsを、単線進化ではなくplatformからの分岐として整理した。
- **理由**：Project資料でAS1475が1954–1970・約780,000個の大量普及caliberであること、AS1568 / 1930 / 1931のfamily relation、Benedict Park-O-PhonのAS1475ベース、Citizen / Poljotへの直接的な基礎関係が確認できたため。④で固定したtactile UI差を、この普及platform史へ戻すことでARSAの固有性を「unique caliber」ではなく「mass-market platform上のaccessibility interface」として位置づけられる。
- **旧状態・棄却**：⑤NEXTを終了。「通常alarm→Park-O-Phon→tactile→AS1930」という単線の製品系譜としては扱わない。parking / tactileはparallel adaptation、AS1568 / 1930 / 1931はcaliber-family development、Citizen / Poljotは別メーカーのdirectly-based relationとして分離する。Citizen license説・Soviet transfer経路は一次資料未確認のため確定しない。
- **影響範囲**：research/ARSA_BLIND_ALARM_RESEARCH_MAP.md、research/ARSA_BLIND_ALARM_LEDGER.md、本判断履歴。公開WATCH本文は変更しない。
- **検証状態**：Project資料 The Alarm Wrist Watch / Alarm am Arm のAS1475 family、Benedict Park-O-Phon、通常採用例、Citizen / Poljot記述を確認。WebはRanfft、Museum of Arts and Crafts Zagreb、Grail Watchのparking-watch記述で補助突合。factory production ledger / transfer一次資料はOPEN。
- **起点・帰属**：VA標準研究frameの⑤「caliber / platformと変貌種」に従い、ユーザーが④完了後に⑤へ進むよう指定。AIがplatform→branchesとして証拠関係を整理。
- **関連**：Deep Dive ①–④、購入個体ARRIVAL SUPPLEMENT、AS1475 early/late alarm-state test。
- **日時根拠**：直前main commit b6824ddcのGitHub時刻 2026-10-03T05:30:51Z → 2026-10-03 14:30 JST を本作業開始基準として記録。

### 2026-10-03 14:28 JST — ARSA Deep Dive ④触読alarm比較を完了し⑤AS1475変貌史へ進める

- **変更**：ユーザーが③の設計思想まとめを採用し④へ進むと確認したため、③bをPASS 2 COMPLETE / ARCHIVE BONUS ONLYへ移し、④触読alarm比較をPASS 1 COMPLETEとした。次のACTIVEを⑤AS1475と変貌種へ移す。
- **理由**：ARSA / AFB-marked ARSA-order / Enicar / BEAT / A. Schild prototype / later afBを同一軸で比較すると、共通するのは完成ケースではなくaccessibility requirementであり、AS1475という同一platform上でもopener・hand coding・marker hierarchyに別解が存在することが固定できたため。
- **主な比較結果**：ARSA / Enicarは4時crown-integrated opener系、BEATは6時external opener。Enicar 1964 specialではminute ≈1.6 mm / hour ≈2.9 mm / alarm ≈0.7 mm + four ridgesという明示的hand codingを確認。ARSAはset alarm timeのtactile read-backを資料で確認するがexact hand codeは未記載。AFB-marked AS1475はBeitlがARSA自社モデルとidenticalとするため独立設計行ではなくcommission variationとして扱う。A. Schild prototypeは存在のみ確定。afB De Luxe AS1930はlater survivorだがmaker OPEN。
- **旧状態・棄却**：④をWAITINGのまま設計書探索を無期限に続ける状態を終了。③bではfactory design document not recoveredを明示し、archive item `Toucher l'heure` 等は将来取得時のbonus evidenceへ降格する。common caliber → common complete case / universal case supplierという飛躍は引き続き棄却。
- **影響範囲**：`research/ARSA_BLIND_ALARM_RESEARCH_MAP.md`、`research/ARSA_BLIND_ALARM_LEDGER.md`、本判断履歴。公開WATCH本文は変更しない。
- **検証状態**：Project資料 *Alarm am Arm* のARSA / AFB / Enicar / BEAT / A. Schild項、*The Alarm Wrist Watch* のEnicar blind-alarm design記述、Peter Klöter auction archive / LotSearchのafB De Luxe AS1930、Uhrforum BEAT AS1930 survivor leadを突合。未記載項目はOPENのまま保持。
- **起点・帰属**：③のsource-labeled design-requirement reconstructionを採用して④へ進む判断はユーザー。hand texture / coding比較軸もユーザーの継続指摘が起点。AIは各個体のsource tierと差分を整理した。
- **関連**：Deep Dive ③b design philosophy / ④ tactile-alarm comparison / 次タスク⑤ AS1475 platform transformations。
- **日時根拠**：会話ターンのローカル時刻 `2026-10-03T14:28:50+09:00` = `2026-10-03 14:28 JST`。


### 2026-10-03 13:29 JST — ARSA比較へ進む前に設計思想・設計資料のfocused passを挟む

- **変更**：Deep Dive ③「時計本人」完了後に直ちに④他社比較へ進む順序を変更し、**③b 設計思想 / 設計資料**をACTIVEとして挿入した。④比較はWAITINGへ移す。
- **理由**：ユーザーが「その設計思想や設計書がないかもうちょい掘ってから次」と明示。ARSAの特徴を列挙するだけでなく、なぜsimple / robust / tactilely distinguishableな形を選んだのかをfactory / designer / association資料で確認してから比較する方がサイトDeep Diveとして情報価値が高い。
- **新証拠**：2004年HochparterreでThomas Loosliが、designersから多数の改善提案を受けてもARSA tactile watchはsimple formがoptimal Gebrauchswertを保証したと直接説明。2010 Worldtempusではpracticalityが長くaestheticsより優先された一方、「美しく触って心地よい」blind watchも作ったと説明。AVH現行ARSA資料ではmodel別に異なるraised line / dot / rough-stone codingを明記し、roughnessがreadabilityを高める例も確認。2014 Europa StarではHi-Touchのrobust hand-fixingがdirect touchでsettingを乱しにくいと説明。
- **archive target変更**：Mémoires d'IciのA. Reymond dossierにある `Zeit spühren = Toucher l'heure`（2008-04-24）をdesign-philosophyの最優先archive targetへ追加。内容は未取得。
- **未発見**：indexed Web / patent検索では1950s ARSA Blind Alarm固有のfactory design drawing / engineering specification / patentは未発見。不存在とは扱わない。
- **境界**：2000年代以降のARSA design philosophyを1950sへそのまま遡及しない。1950sは専門書と現物から機能要件を復元できるが、factory自身の設計意図文書はOPEN。
- **影響範囲**：`research/ARSA_BLIND_ALARM_RESEARCH_MAP.md`、`research/ARSA_BLIND_ALARM_LEDGER.md`、本判断履歴。公開WATCH本文は変更しない。
- **起点・帰属**：比較前に設計思想 / 設計書を追う順序変更はユーザー。AIはARSA / Swiss period press / association / archive / patentのfocused searchで裏取りした。
- **日時根拠**：会話ターンのローカル時刻 `2026-10-03T13:29+09:00` = `2026-10-03 13:29 JST`。


### 2026-10-03 13:17 JST — ARSA Deep Dive ③時計本人のPass 1を完了し次を触読alarm比較へ進める

- **変更**：サイト掲載用Deep Diveの③「ARSA Blind Alarmそのもの」をPass 1 COMPLETE / ARRIVAL SUPPLEMENT PENDINGとした。ARSA固有のAS1475構成、2/4 crown操作、4時crown内蔵front-cover pusher、raised tactile markers、robust hour/minute hands、alarm pointer、seconds hand省略、購入個体画像、failure evidence、model variationを一章として固定。次のACTIVEを④触読alarm比較へ進めた。
- **理由**：Project専門書と購入個体画像を再突合すると、ARSAの時計本人についてサイト掲載に必要な機構・UI・故障境界・variationが十分に揃っているため。特に *Alarm am Arm* はARSAについて「current timeだけでなくset alarm timeも触って確認し、2時側alarm crownで設定できる」と明記しており、以前Enicarを唯一の明示的read-back例のように扱った分析を訂正した。
- **旧状態・棄却**：ARSAのalarm-time tactile read-backを到着実測まで未確定とする扱いを撤回し、**historical ARSA design functionとしてはSOURCE-CONFIRMED、購入個体での実使用性はarrival test待ち**へ分離した。また「movement未確認」という旧MAP禁止事項は、購入個体画像でAS1475 / 17 JEWELS確認済みのため現行状態へ修正した。
- **追加判断**：AS1475は通常direct central seconds対応だがBlind Alarmではseconds handを省略しており、これは触読UIへの用途adaptationとして扱う。AS1475のearly / later revisionでalarm ON crown stateがca.1960前後に反転するため、到着後の操作確認をmovement revisionの手掛かりへ追加。ただし完成時計の製造年確定には使わない。
- **variation整理**：確定本線はARSA AS1475。Venus230 Blind AlarmはUhrforum survivor leadとしてHOLDを維持。Antiquorumのnon-alarm tactile ARSAと現行ARSA Blind Watchでopening positionが4 / 6 / 3等に分かれるため、ARSA全体に単一のcase / opener architectureがあるとはしない。
- **影響範囲**：`research/ARSA_BLIND_ALARM_RESEARCH_MAP.md`、`research/ARSA_BLIND_ALARM_LEDGER.md`、本判断履歴。公開WATCH本文はまだ変更しない。
- **検証状態**：Project資料 *Alarm am Arm* のARSA Blind Alarm記述、*The Alarm Wrist Watch* のAS1475 specs / operation、購入個体画像、Mitka Cyma Braille repair、Deafblind UK tactile-watch user report、Antiquorum ARSA Braille survivor、現行ARSA Blind Watch、Uhrforum ARSA Venus230 survivorを突合。ARSA固有の慢性hinge弱点・高故障率・universal hand codeは未証明のまま維持。
- **起点・帰属**：Deep Dive順で進める方針とhand texture / coding観点はユーザー。AIは既存資料・画像・Webを章単位に再構成し、ARSA read-backの既存source記載を拾い直した。
- **関連**：Deep Dive ①会社史、②需要背景、次タスク④tactile-alarm comparison、購入ARSA specimen。
- **日時根拠**：会話ターンのローカル時刻 `2026-10-03T13:17:48+09:00` = `2026-10-03 13:17 JST`。


### 2026-10-03 13:05 JST — ARSA Deep Dive ②需要背景のPass 1を完了し次を時計本人へ進める

- **変更**：サイト掲載用Deep Diveの②「需要背景」をPass 1 COMPLETEとした。触読時計は少なくとも1887年のtouch-readable watch特許まで遡ること、WWIのSt Dunstan's / 現Blind Veterans UKでrehabilitationと自立支援の道具として使われたこと、AFBが1926年にWalthamとのwatch-accommodation serviceを引き継ぎ民間流通を制度化したこと、WWIIにAFBが失明軍人へ大規模配布・改造・修理を行ったこと、日本でも1939年Seikosha触読懐中時計が戦時失明軍人へ授与されたことを、ARSA本文に必要な背景として固定した。次のACTIVEを③ARSA Blind Alarm本人へ進めた。
- **理由**：既存下調べと追加の公式・一次資料確認で、戦争を起源とするのではなく「既存の触読時計技術をrehabilitation / procurement / training / repairの制度へ押し上げた」という需要背景が十分に固まったため。Horlbeckの専門資料では、触読alarmは現在時刻だけでなく設定alarm時刻も触って確認・再設定できることが確認でき、1950年代Blind Alarmを既存触読時計文化への第二段階の機能追加として説明できる。
- **旧状態・棄却**：需要背景をWWI / WWII / AFB archiveへ際限なく広げる状態を終了。war veterans → ARSA Blind Alarm、AFB gift program → ARSA commissionという直接因果の説明は引き続き棄却／NOT PROVEN。
- **影響範囲**：`research/ARSA_BLIND_ALARM_RESEARCH_MAP.md`、`research/ARSA_BLIND_ALARM_LEDGER.md`、本判断履歴。公開WATCH本文はまだ変更しない。
- **検証状態**：Google Patents US365032、Blind Veterans UK公式史・archive、AFB公式Chapter 7 / 17および100周年史、Seiko Museum 1939 blind watch、Project資料 *The Alarm Wrist Watch* のblind-alarm操作記述を確認。需要背景として十分、ARSA直接因果は未確認のまま保持。
- **起点・帰属**：Deep Dive順で進める方針はユーザー。AIは既存下調べを需要背景章へ再編し、サイト掲載に必要な範囲へ圧縮した。
- **関連**：Deep Dive ①会社史、次タスク③ARSA Blind Alarm mechanism / tactile UI / failure / variation / purchased specimen。
- **日時根拠**：会話ターンのローカル時刻 `2026-10-03T13:05:58+09:00` = `2026-10-03 13:05 JST`。


### 2026-10-03 13:01 JST — ARSA Deep Dive ①会社史のPass 1を完了し次を需要背景へ進める

- **変更**：サイト掲載用Deep DiveをVA標準順で進める運用に従い、①「作った会社 — Auguste Reymond / ARSA」のPass 1を完了扱いとした。会社史は1898創業、1926 Unitas取得、1931–33の業界再編、early-1950sのblind / Braille watch系統、mid-1950sのalarm wristwatch系統、1969/1970 Davoineでの会社specialty、1972/1973の再編・製造品目までをサイト用骨格として固定。次のACTIVEを②需要背景へ進めた。
- **理由**：ユーザーが「下調べは済んでいるので、サイト掲載のDeep Dive順に調べる」と指示。既存LEDGER、Project専門書、公式ブランド史、DIJU、Davoine、Mémoires d'Ici metadataを突合すると、会社章は新たな広域探索なしで掲載判断に必要な骨格まで到達しているため。
- **旧状態・棄却**：①会社史を未整理のP0として広く検索し続ける状態を終了。1948 company brochure本文、1973周年資料本文、1954–55 alarm introductionのperiod primaryは残課題として保持するが、章全体のblockerにはしない。
- **影響範囲**：`research/ARSA_BLIND_ALARM_RESEARCH_MAP.md`、`research/ARSA_BLIND_ALARM_LEDGER.md`、本判断履歴。公開WATCH本文はまだ変更しない。
- **検証状態**：現行Auguste Reymond公式史、DIJU / Mémoires d'Ici、Davoine 1969 / 1970、Project資料 *Alarm am Arm* を再確認。ARSA社内でblind watchesとalarm wristwatchesが同時に存在したことは確認、両系統を意図的に統合したという経営判断は未確認のまま維持。
- **起点・帰属**：Deep Dive順で進める方針はユーザー。AIは既存下調べを章単位へ再編し、不足資料だけを残した。
- **関連**：ARSA Deep Dive ① company baseline、VA時計研究標準フレーム。
- **日時根拠**：会話ターンのローカル時刻 `2026-10-03T13:01:16+09:00` = `2026-10-03 13:01 JST`。


### 2026-10-03 13:01 JST — 触読針codingの起点をユーザーの継続指摘として訂正

- **変更**：触読alarmのhand coding研究軸について、起点を「今回新たに出た質問」ではなく、**ユーザーが以前から針の切り欠き・ざらつき・質感差、時針／分針／alarm針の触覚的役割分担へ言及していたが、AI側が研究軸へ昇格せず見落としていた**と明記した。MAPの「新しい中心質問」表現を撤回した。
- **理由**：ユーザーから「だから俺が言及している。普通にずっとスルーする」と訂正を受け、会話上の帰属と正本の帰属保持ルールを一致させる必要があるため。
- **旧状態・棄却**：hand codingをAIが今回初めて発見したように扱う表現を棄却。
- **影響範囲**：`research/ARSA_BLIND_ALARM_RESEARCH_MAP.md`、`research/ARSA_BLIND_ALARM_LEDGER.md` の帰属表現。本体研究内容・公開WATCH本文は変更しない。
- **検証状態**：同日のhand-coding資料検証結果は維持し、起点・帰属のみ訂正。
- **起点・帰属**：観点の起点はユーザー。AIは後追いでProject資料・patentを照合した。
- **関連**：同日12:28 JST「触読alarm比較へhour / minute / alarm handの触覚coding軸を追加」。
- **日時根拠**：会話ターンのローカル時刻 `2026-10-03T13:01:16+09:00` = `2026-10-03 13:01 JST`。


### 2026-10-03 12:28 JST — 触読alarm比較へhour / minute / alarm handの触覚coding軸を追加

- **変更**：ARSA / Enicar / BEAT / AFB / A. Schild等の触読alarm比較で、従来の「hands」一括記述をやめ、hour / minute / alarm handごとの長さ・幅・先端形状・段差・突起・切り欠き・ridge / texture・相対高さ・radial pathを比較軸へ追加した。現時点の仮説は「業界共通の固定codeは未確認だが、各針を触覚的に区別する共通design grammarは長期的に存在する」。
- **理由**：ユーザーが、触読時計／触読alarmでは「時針はこれ、分針はこれ、alarmはこれ」という暗黙の触覚codeがあったのではないか、切り欠きやざらつき等の質感差を見落としていないかと指摘。Project資料のEnicarではhour 2.9 mm / minute 1.6 mm / alarm 0.7 mm + tip four ridgesと明記され、1887・1917・1939のtouch-readable watch patentsでも突起数、幅、先端、radial path、高さ等を使う異なるcoding方式を確認したため。
- **旧状態・棄却**：ケース／opener差を中心に比較し、針を「robust tactile hands」の一項目で処理する状態を棄却する。一方、「hour=rough / minute=smooth / alarm=notched」のような普遍的industry standardが存在したとの断定も採用しない。
- **影響範囲**：`research/ARSA_BLIND_ALARM_RESEARCH_MAP.md`、`research/ARSA_BLIND_ALARM_LEDGER.md`、本判断履歴。公開WATCH / OWNER'S NOTE本文、Catch / Lead、購入個体台帳は変更しない。
- **検証状態**：Project資料 *The Alarm Wrist Watch* のEnicar tactile-hand記述、*Alarm am Arm* のARSA / AFB / BEAT項を再確認。WebではUS365032A、Waltham US1222369A、US2168314A、US2915874Aを比較し、年代を跨いで複数の異なるtactile coding方式を確認。購入ARSA画像ではalarm pointerにpatterned surfaceが見えるが、触覚ridgeかどうかは到着後実測までOPEN。
- **起点・帰属**：触覚codingという比較軸の見落とし指摘はユーザー。AIがProject資料・historical patentsで検証し、比較項目へ昇格した。
- **関連**：ARSA purchased specimen、Enicar Blind Alarm / AS1475、AFB / ARSA AS1475、BEAT / Friedli-Frères AS1475、historical touch-watch patents。
- **日時根拠**：会話ターンのローカル時刻 `2026-10-03T12:28+09:00` = `2026-10-03 12:28 JST`。


### 2026-10-03 12:52 JST — ARSAの現SUB / NOTEをユーザー原文で復元しworking setへ固定

- **変更**：ARSA Blind AlarmのCatch `開けて、触って、聞く。` に続く現SUBとNOTEを、ユーザー提示原文のままworking setとして記録した。SUBは `文字盤を覆う蓋が開く。／現在時刻も、アラーム時刻も、指先で読む。／設定した時刻になれば、／今度は耳の出番。`。NOTEは `触読時計では、文字盤に直接指を触れて時刻を読む。／そのため時分針とアラーム針は、触って区別できる形を持つ。／秒針はない。触読の邪魔になり、触れることで時計を止めるおそれもある。／ARSA Blind Alarmでは、／今の時刻だけでなく、アラームを設定した時刻まで指で確かめられる。／設定した時間になれば、今度は音で知らせる。／ちなみに、麻酔針は出ない。` とする。
- **理由**：直前の12:31 JST記録では旧SUBをREJECTEDにした後、新しいSUBとNOTEの具体文言がGitHubへ残っておらず、再び会話依存になっていた。ユーザーが現SUBを「として進めていく」と明示し、続けてNOTE全文と、最後の `ちなみに、麻酔針は出ない。` だけで温度を一段上げる構成を提示したため、その原文と判断理由を復元する。ユーザー評価では、本文自体は元ネタを知らなくても成立し、最後だけ知っている読者に遊びとして効くため、`NEXT C○NAN'S HINT` を前面に出す案より時計本人が主役のままになる。
- **旧状態・棄却**：12:31 JST時点の「SUBは再設計」を解消する。旧 `タッチパネル、物理です。` 系SUBはREJECTEDのまま復活させない。戦闘系比喩もREJECTEDのまま。全面的な `NEXT C○NAN'S HINT` フレームをメインへ戻さない。語尾へ `ご安心を` 等を足してユーザー原文の温度を変えない。
- **影響範囲**：ARSA Blind AlarmのCatch / SUB / NOTE候補状態と本判断履歴のみ。公開WATCH / OWNER'S NOTE本文はまだ変更しない。
- **検証状態**：`research/ARSA_BLIND_ALARM_LEDGER.md` を再確認。Project-source evidenceとして、触読時計は時分針とアラーム針を触って区別できる形にすること、現在時刻と設定アラーム時刻を触読できること、秒針は触読を妨げ触れた際に時計を止めるおそれがあるため通常設けないことが記録済み。購入個体でも秒針なし・3本の情報針の視覚的差は画像確認済みだが、実機での触り分け性能は到着後確認事項のまま維持する。末尾の麻酔針は事実説明ではなく編集上の遊びとして扱う。
- **対象WATCH**：ARSA Blind Alarm。
- **起点・帰属**：現SUB本文、NOTE本文、`ちなみに、麻酔針は出ない。`、Westcloxの `なんということでしょう。` 程度の温度に収めるという判断、`ご安心を` 等を足さない判断はいずれもユーザー提示。AIは研究正本との事実整合だけを再確認し、GitHubへ記録した。
- **VA温度比較**：説明本文は低温度のまま機構・操作を具体化し、最後の一行だけ遊びを上げる。元ネタ依存で本文理解を失わせず、時計本人の説明が先に完結するため、全面ネタ化より既存VAの温度レンジへ収まりやすいと扱う。
- **採否・現在状態**：Catch `開けて、触って、聞く。` = `WORKING_MAIN`。今回SUB = `WORKING`。今回NOTE = `WORKING`。公開FINAL化は未実施。購入個体の実機触読UI確認後に必要なReality checkを行う。
- **関連**：同日09:13 JST ARSAコピー帰属記録、09:24 JST VA温度比較、10:15 JST Sensitive-context guard、12:31 JST semantic clarity rule、PR #147。
- **日時根拠**：ChatGPT local-time source `2026-10-03T12:52:35+09:00` = `2026-10-03 12:52 JST`。

### 2026-10-03 12:31 JST — ARSA SUB候補「タッチパネル、物理です。」を棄却し意味回収ルールを追加

- **変更**：ARSA Blind AlarmのAI発SUB候補 `タッチパネル、物理です。` と、その直後に提示した `前蓋を開けて、針と時標を直接触って読む。／今の時刻も、アラームを設定した時刻も。／時間になれば、今度は音で知らせる。` をREJECTEDとした。全WATCH共通のCatch / Lead開発プロトコルへ、置換比喩が本当に意味を増やしているか、各行の省略が読者側で回収可能か、初出の機構名・曖昧な指示語を避けているかを確認するsemantic clarity ruleを追加した。
- **理由**：ユーザーが、`タッチパネル、物理です。` はタッチパネル自体が物理物なので対比として成立していない、`前蓋` は初見読者には対象不明、`今の時刻も、アラームを設定した時刻も。` は述語が欠けて「何をするのか」が不明、`時間になれば` は何の時間か曖昧、と具体的に指摘したため。これは単なる好みではなく、SUBコピーが説明を増やすどころか読者に補完作業を要求している問題。
- **旧状態・棄却**：身近なガジェット語へ置換できていれば意味精度が低くても候補として残す運用を棄却する。断片的な行分け自体はVAで使用可能だが、各行の意味関係まで切断してよいとは扱わない。
- **影響範囲**：`SITE_RULES.md` の全WATCH共通Catch / Lead開発プロトコル、ARSA SUB候補の状態管理、本判断履歴。公開WATCH / OWNER'S NOTE本文は変更しない。
- **検証状態**：公開中日本語WATCHのCatch / Leadを横並び再確認。Westclox / Cyma等も断片的な行分けを使うが、直前・直後の行で述語や対比が回収できる。今回のARSA候補はその条件を満たさないため棄却。
- **対象WATCH**：ARSA Blind Alarmを起点とし、semantic clarity ruleは今後の全WATCH共通。
- **起点・帰属**：問題のSUB候補はAI発。問題点の特定と棄却判断はユーザー指摘。AIが既存VAコピーと照合して一般ルールへ反映した。
- **VA温度比較**：遊びの強弱以前に意味が通ることを優先する。VAの短文・断片表現は維持するが、読者が「何が？何を？何の時間？」と補完しないと読めない省略は採用しない。
- **採否・現在状態**：`タッチパネル、物理です。` と上記一連のAI SUB案はREJECTED。`開けて、触って、聞く。` はWORKING_MAINのまま。SUBは再設計。
- **関連**：2026-10-03 09:48 JST 全WATCH共通Catch / Leadプロトコル、同日10:15 JST Sensitive-context guard、semantic clarity rule commit `2ce62bed`。
- **日時根拠**：会話ターンのローカル時刻 `2026-10-03T12:31+09:00` = `2026-10-03 12:31 JST`。

### 2026-10-03 12:28 JST — ARSA調査をDuofon / 10WA型のVA標準フレームへ戻しarchive枝を非blocking化

- **変更**：ARSA Blind Alarmの調査順を、既存のPierce Duofon / Wittnauer 10WAで使っているVA標準の「①作った会社 → ②需要背景 → ③時計そのもの → ④同目的・同機構の比較 → ⑤最後にcaliber / platformと変貌種 → ⑥時計固有要件」へ組み直した。ARSAでは最後をAS1475の普及・Benedict Park-O-Phon・触読alarm adaptations・AS family / direct descendantsへ戻す構成とする。AFB契約書、Smithsonian、WPB 1945等はbonus / contextへ降格し、研究completion blockerにしない。あわせてこの既存VA調査方式を`AGENTS.md`へdefault frameとして明文化し、Council / 焼いてでも先に適用するよう固定した。
- **理由**：ユーザーが、Duofon / Wittnauer 10WAでは一貫して会社→需要背景→時計本人→比較→caliber史という順で調査していたのに、今回のCouncilが既存方式を継承せず、AFB / Smithsonian / wartime archive自体を研究目的化していたと指摘。直前の宮廷道化師も、ARSAから離れたarchive枝がP0を占有していることを問題化し、ユーザーがその指摘を採用した。Pierce公開WATCHは実際に「Pierceとは→Cal.135→モデル変遷→Gruen Duo-Tone」、Wittnauer公開WATCHは「Wittnauerとは→10WA→中身→特許→AS1475→variation」と、会社・時計本人・比較／platformへ戻る構造になっている。
- **旧状態・棄却**：`AFB↔ARSA一次文書`を歴史上の最大未解決としてP0級に置き続ける状態、Smithsonian 1973 object / AFB catalog / WPB 1945 correspondenceを次の最優先にする状態を棄却する。既存証拠は削除せずLEDGERに保持し、ARSA本線へ直接効く時だけ再昇格する。
- **影響範囲**：`AGENTS.md`、`research/ARSA_BLIND_ALARM_RESEARCH_MAP.md`、本判断履歴。公開WATCH / OWNER'S NOTE本文、Catch / Lead、ARSA購入個体の個人台帳、既存LEDGER証拠は変更しない。
- **検証状態**：GitHub mainのPierce Duofon公開WATCH、Wittnauer 10WA公開WATCH / research ledgerを再取得し、既存VA調査の実例を確認。Project資料ではHorlbeckがBenedict Park-O-PhonをAS1475ベースのparking-time watchとして記し、movement自体に追加技術変更がないと説明すること、同書がAS1475とその後継／派生群およびCitizen / Poljotのdirect basisを記すことを確認。ARSA触読alarm比較対象は既存ARSA MAP / LEDGERの確度分類を維持する。
- **起点・帰属**：研究フレームの再提示と「既存VA方式をCouncilが外した」という指摘はユーザー。直前の宮廷道化師がarchive枝の過剰拡張を指摘し、ユーザーが採用。AIはDuofon / 10WA正本とProject資料で照合して全WATCH向けdefault frameへ明文化した。
- **関連**：`src/content/watches/pierce-duofon.md`、`src/content/watches/wittnauer-10wa.md`、`research/WITTNAUER_10WA_LEDGER.md`、`research/ARSA_BLIND_ALARM_RESEARCH_MAP.md`、Project資料 *The Alarm Wrist Watch* / *Alarm am Arm*。
- **日時根拠**：会話ターンのローカル時刻 `2026-10-03T12:28+09:00` = `2026-10-03 12:28 JST`。


### 2026-10-03 11:25 JST — AFB戦時Braille watchを単一factory lineageから分離しWPB 1945資料をarchive targetへ追加

- **変更**：AFBの1943–45年Braille-watch programを「一つの専用factory model系列」とみなさず、寄付された既存時計の清掃・修理・触覚点追加を含む配布／改造systemとして研究モデルへ明記した。Smithsonian War Production Board Recordsの `BRAILLE WATCHES: Correspondence 1945`（NMAH.AC.0341_ref17, Box 1 Folder 4）を新規archive targetへ追加。併せてBEAT / Friedli-Frères AS1930のforum survivorをHOLD leadとして登録し、forum内のIRTI製・ca.1960という帰属は採用しない。
- **理由**：AFB自身の制度史が、戦時初期の配布時計の多くが市民から寄付された既存時計を改造したものだったと明記するため、約1960年のBeitl記載ARSA委託モデルを1943–45年へ遡及させると系譜を誤る。またWar Production Boardに1945年Braille-watch専用correspondence folderが現存し、戦時supplier / allocationを一次資料で確認できる可能性が出た。BEAT AS1930についてはFriedli署名というforum情報は研究価値がある一方、California DORはIRTIを1979年創業のassistive-technology reseller / integratorとするため、ca.1960のphysical manufacturerという説明とは両立しない。
- **旧状態・棄却**：AFB wartime gift programを後年のpurpose-built tactile alarmと連続した単一製品系列として読む余地を棄却する。forumだけでBEAT/FriedliのAS1475→AS1930連続量産を確定すること、IRTIを1960年頃の時計メーカーと扱うこと、eBay由来のca.1960年代付けを採用することも棄却／HOLDとした。
- **影響範囲**：`research/ARSA_BLIND_ALARM_RESEARCH_MAP.md`、`research/ARSA_BLIND_ALARM_LEDGER.md`、本判断履歴のみ。公開WATCH / OWNER'S NOTE本文、Catch / Lead、個人時計台帳、購入・修理判断は変更しない。
- **検証状態**：Smithsonian NMAH.AC.0341 collection / finding aid、AFB Chapter 17、APH `The Gift of Time`、Project資料 `Alarm am Arm` のBEAT項、California Department of RehabilitationのIRTI vendor description、Uhrforum survivor postを突合。WPB Folder 4本文およびBEAT AS1930の独立した現物資料は未取得のためOPEN / HOLDを維持。
- **関連**：NMAH.AC.0341_ref17、`Alarm am Arm` p.91 BEAT / Friedli-Frères AS1475、Uhrforum 2014 BEAT AS1930 lead、IRTI。
- **日時根拠**：会話ターンのローカル時刻 `2026-10-03T11:25+09:00` = `2026-10-03 11:25 JST`。


### 2026-10-03 10:20 JST — SmithsonianのAFB Swiss Braille Watchをinstitutional comparatorとして追加しmaker意味を分離

- **変更**：ARSA survivor matrixをV3へ更新し、Smithsonian NMAHのMG.306619.07 / Braille Watch / ca.1973 / Switzerland / AFB creditを、アラーム個体ではなくinstitutional comparatorとして追加した。AFB制度史の「メーカーから卸値で仕入れて再販売」という供給構造を根拠に、Smithsonianのrelationship field maker = American Foundation for the Blindを実際のスイス製造工場名と同一視しないルールを明記。あわせて1973 International Catalog、NMAH 1972–74 Aids and Appliances、object付属instructions / boxをmaker同定の最優先資料へ上げた。
- **理由**：AFB-associatedでSwiss-madeの現物が1973年頃として公的博物館に残ることは、auction survivorより強いinstitutional object evidence。一方、alarm機能もSwiss factoryもcatalog recordだけでは分からず、ここをARSA / afB De Luxeへ短絡すると研究モデルを過大化するため。
- **旧状態・棄却**：Smithsonianの1972–74 archival folderだけをarchive targetとする状態を更新する。AFB maker表記からAFBが時計を自社製造したと読む解釈、AFB + Switzerland + 1973からARSA製／Blind Alarmへ自動接続する解釈を棄却する。またDIJUの1972年後の市場分担（ARSA=Europe、Hoga=USA等）からHogaをafB De Luxe makerへ即昇格することもしない。
- **影響範囲**：research/ARSA_BLIND_ALARM_RESEARCH_MAP.md、research/ARSA_BLIND_ALARM_LEDGER.md、本判断履歴のみ。公開WATCH / OWNER'S NOTE本文、Catch / Lead、個人時計台帳、修理情報は変更しない。
- **検証状態**：Smithsonian object record、Smithsonian NMAH.AC.1319_ref22、AFB The Unseen Minority Chapter 21 / Chapter 7 / bibliography、Mémoires d'Ici 1948資料metadata、DIJU企業史、現行eBay afB De Luxe AS1930 listingを再確認。Mémoires d'Iciの1948 / 1973本文は未取得のためmetadata-confirmed / content-not-obtainedとして保持した。
- **関連**：Smithsonian nmah_727327、AFB 1973 International Catalog, Aids and Appliances for Blind and Visually Impaired Persons、eBay item 237074297005。
- **日時根拠**：会話ターンのローカル時刻 2026-10-03T10:20+09:00 = 2026-10-03 10:20 JST。


### 2026-10-03 10:20 JST — ARSA触覚時計の1973継続とafB AS1930後続例を研究モデルへ追加

- **変更**：ARSA研究MAPの現在モデルへ、DIJUで確認できる「1950年代初頭にblind / Braille watchを開発し、1973年にもmontres pour aveuglesを製造品目としていた」企業史を追加した。AFB側は1926年開始の一般時計流通と1943–1963年の戦盲軍人向けgift / repair programを明確に分離。survivor matrixをV2へ更新し、auction-catalogで確認できるca.1970の`afB De Luxe Alarm / AS 1930 / 33 mm`を、maker OPENの後続survivorとして追加した。
- **理由**：ARSAの触覚時計系統が1950年代の単発企画ではなく1973年まで企業の製品領域として続いたこと、またAFB名義の触覚アラームがAS1475だけで終わらない可能性を示す新しい外部証拠が得られたため。一方で、AFBの軍人向けprogramと一般販売、ARSA製造とAFB brandingを混ぜると因果を過大化するため、三つのcontinuity lineを分離した。
- **旧状態・棄却**：ARSAのblind-watch継続を1969/1970 trade-ad evidenceだけで止める状態、AFBを軍人向けgift programと同義に扱う読み方、ca.1970 afB AS1930をARSA後継機へ自動接続する解釈を棄却する。
- **影響範囲**：`research/ARSA_BLIND_ALARM_RESEARCH_MAP.md`、`research/ARSA_BLIND_ALARM_LEDGER.md`、本判断履歴のみ。公開WATCH / OWNER'S NOTE本文、Catch / Lead、個人時計台帳、修理判断、UIは変更しない。
- **検証状態**：DIJU、AFB公式オンライン史、APH、Smithsonian NMAH、LotSearchのKlöter auction recordを再確認。資料種別をinstitutional history / auction-catalog survivor / archive leadに分け、maker不明・supplier未確認をOPENとして保持した。
- **関連**：ARSA survivor matrix V2、Mémoires d'Ici D-00454、Smithsonian NMAH.AC.1319_ref22。
- **日時根拠**：会話セッションのローカル時刻 `2026-10-03T10:20+09:00` = `2026-10-03 10:20 JST`。


### 2026-10-03 10:15 JST — ARSAの戦闘系比喩を棄却しSensitive-context guardを追加

- **変更**：ARSA Blind Alarmでは戦闘を軽い比喩として使う候補をREJECTEDとし、全WATCH共通Catch / LeadプロトコルへSensitive-context collision checkを追加した。
- **理由**：ARSA自体が戦争復帰用に開発されたという直接因果は未証明。一方、研究正本では触読時計が戦争で失明した人の社会復帰・自立支援に制度的に使われたことは確認済みであり、同じ領域を軽いネタへ転用すると歴史的文脈と温度が衝突するため。
- **旧状態・棄却**：ARSAの触読設計を戦闘系の作品・台詞で軽く翻訳する方向を棄却。ARSAの直接的な戦争起源を新たに断定するものではない。
- **影響範囲**：`SITE_RULES.md`、`AGENTS.md`、ARSAコピー候補の状態管理。本番WATCH本文・研究事実は変更しない。
- **検証状態**：`research/ARSA_BLIND_ALARM_LEDGER.md` のTrack B / Cross-track connectionを再確認し、直接因果はNOT PROVEN、触読時計と社会復帰支援の関係は確認済みという確度分離を維持した。
- **対象WATCH**：ARSA Blind Alarmを起点とし、guard自体は今後の全WATCH共通。
- **起点・帰属**：戦闘系の軽い扱いを避ける判断はユーザー指摘。AIが研究正本と照合して一般ルールへ反映した。
- **VA温度比較**：VAの遊びは維持するが、歴史的に重い背景そのものを笑いの軸にしない。遊びは機構・操作・外観へ移す。
- **採否・現在状態**：戦闘系フレームはREJECTED。`開けて、触って、聞く。` はWORKING_MAIN、`タッチパネル、物理です。` はSUBのまま。
- **関連**：`research/ARSA_BLIND_ALARM_LEDGER.md`、commits `d08b22cd`, `becdc81f`。
- **日時根拠**：会話セッションのローカル時刻 `2026-10-03T10:15:56+09:00` = `2026-10-03 10:15 JST`。

### 2026-10-03 09:48 JST — OWNER'S NOTEコピー開発を全WATCH共通プロトコル＋CI gateへ昇格

- **変更**：ARSAで得たコピー開発・帰属管理の修正を個別対応で終わらせず、今後の全WATCHへ適用する共通プロトコルとして実装した。起動時の `PROJECT.md` 強制チェック、`PROJECT_STATE.md` の現行baseline、`AGENTS.md` の作業手順、`SITE_RULES.md` のCatch / Lead開発プロトコルを同期し、固定の代表本数ではなく作業時点で `published: true` の日本語WATCHすべてを温度ベンチマークにする。さらに `scripts/check-owner-copy-provenance.mjs` を追加し、実際に `src/content/watches/*.md` の `catch` または `ownersNote.lead` が変わるPRでは、新しい判断履歴に `対象WATCH / 起点・帰属 / VA温度比較 / 採否・現在状態` の4項目がなければquality gateを失敗させる。動的な横並び確認用に `npm run owner-copy:benchmark` も追加し、self-testを `test:quality` へ組み込んだ。あわせて `PROJECT.md` 自体をdecision-bearing fileとして `check:decision-log` の監査対象へ追加した。
- **理由**：ユーザーから「ARSAだけでなく他の時計にも今後適用するので実装しきる」よう明示されたため。文書へ「温度を見る」と書くだけでは、次回別WATCHで固定の代表数本だけを見たり、発案者・派生元・棄却理由を会話に残したまま実ファイルだけ変更したりする再発を機械的に止められない。起動ルーター → 現行baseline → 編集正本 → 実変更CIの四層へ分けて固定する。
- **旧状態・棄却**：ARSAの今回判断だけを `CHANGE_DECISIONS.md` へ残し、他WATCHでは任意運用に戻る状態を棄却する。Pierce / Cyma / Basis / Westclox等の固定代表だけを永続ベンチマークにする方式も棄却し、公開WATCHの増減に自動追従する全件比較へ変更する。また「VAっぽさ」を一つの平均文体へ均一化する運用は採用せず、公開中Catch / Leadが持つ低温度〜高温度のレンジ内で時計固有の入口を作る。
- **影響範囲**：`PROJECT.md`、`PROJECT_STATE.md`、`AGENTS.md`、`SITE_RULES.md`、`scripts/check-decision-log.mjs`、新規 `scripts/check-owner-copy-provenance.mjs`、新規 `scripts/owner-copy-benchmark.mjs`、`package.json`、PR #144。既存公開WATCH / OWNER'S NOTE本文・既存Catch / Leadそのものは変更しない。
- **検証状態**：copy provenance gateはCatch変更・Lead変更・NOTEのみ変更・必須marker欠落を判定するself-testを内蔵し、`test:quality` から実行する構成へした。quality gateでは `check:decision-log` に続いて `check:owner-copy-provenance` を実行する。branch上の実装完了後、PR CIでself-test / quality / buildを通し、main merge後に正本を再取得して初めてVERIFIED / main反映済みとする。
- **対象WATCH**：全WATCH共通。実変更時は対象slugを明記する。
- **起点・帰属**：全WATCH適用の要求はユーザー。ARSAでの「身体・身近なガジェット等へ置換」「既存VAキャッチとの温度整合」「発案者と取捨選択経緯を残す」という基準を、AIが再利用可能な手順とCIへ実装した。
- **VA温度比較**：固定の既存6本を規則へ埋め込まず、作業時点の公開日本語WATCH全件を動的母集団にする。比較軸は初見理解、親しみやすさ、時計固有機能への接続、遊び・比喩の濃さ、外部ネタ依存、Leadが具体へ戻れる余地。低温度／高温度の共存を許容し平均化しない。
- **採否・現在状態**：全WATCH共通プロトコルを採用。ARSAの現working candidate自体はこの実装でFINAL化しない。今後Catch / Lead実変更PRはCI gate対象になる。
- **関連**：PR #144。decision-bearing commits `3f263fdd`, `c90e81e3`, `15e7679a`, `49215773`, `ec6a819a`, `b1fd6dee`, `8abcc0ca`, `cd0cab57`, `bd92a3ed`, `67fc195b`, `6ceb0795`, `5b98f584`, `2ebd7e72`, `738ab5d0`, `6323a445`。
- **日時根拠**：会話セッションのローカル時刻 `2026-10-03 09:48 JST`。

### 2026-10-03 09:24 JST — ARSAコピー選別基準へ既存VAキャッチの整合性・温度感を追加

- **変更**：PR #144で記録した「誰が提案したか／どう取捨選択したか」に加え、ARSA OWNER'S NOTEのCatch / Lead選別では、公開中のVAキャッチ全体との整合性と温度感を必須基準として扱う。現行比較対象は少なくとも Basis `触って、見て、聴いて楽しむおもちゃ箱。`、Pierce `マナーモードの祖先!? / 1950's通知のオーパーツ。`、Cyma `鳴る黄金のクロノメーター`、Citizen `国産初のベル腕時計、そして伝説へ。`、Westclox `0石腕時計の劇的ビフォーアフター。`、Wittnauer `過酷な現場、アラーム部門。 / 今日もベゼルがワンオペ中🔔`。新案は、抽象度、初見理解、身近な言葉への置換、遊びの濃さ、外部ネタ依存、時計本人がオチを回収できるかで横比較する。
- **理由**：ユーザーから、PR #144の記録が「発案者と採否理由」には触れている一方、そもそもの選別基準として既存VAキャッチとの整合性・温度感を明記していないと指摘があった。今回のARSA案出しでも、AIは初期に `時間を指で識る。耳で聴く。` 等の硬い／詩的な案を出した後、ユーザーから既存VAの作り方と「身体や身の回りのガジェットなど親しみやすいものへの置換」を再提示され、現行6本を横並び確認して初めて `タッチパネル、物理です。` 等のVA温度へ近づいた。この修正過程自体を選別根拠へ含める必要がある。
- **旧状態・棄却**：候補単体の語感・面白さだけでARSAコピーを評価する運用、および「身近なものへの置換」だけを守ればVA全体との温度校正を省略できる扱いを棄却する。逆に既存6本へ文体を均一化することも採用しない。Cyma / Citizenの低温度からPierce / Wittnauer / Westcloxの高温度までの現行レンジを基準に、その時計固有の入口を作る。
- **影響範囲**：`SITE_RULES.md` の新規Catch / Lead選別基準、`AGENTS.md` の提案・帰属記録手順、PR #144のARSAコピー判断履歴。本番WATCH / OWNER'S NOTE本文や既存6本のキャッチは変更しない。
- **検証状態**：PR branch上で公開中6本の現行 `catch` / `ownersNote.lead` を再取得して横並び確認した。ARSAの working main candidate `開けて、触って、聞く。` はユーザー発のまま維持するが、最終確定では「実機到着後の触読UI確認」に加えて「現行VAレンジ内での温度・整合性」の再比較を必須とする。コナン案は元ネタの存在感がARSA本人より前に立つ懸念から恒久メインでは降格、`タッチパネル、物理です。` や `秒針？ やつは置いてきた。` 等はLead / Sub候補として温度を再評価する。
- **関連**：同日09:13 JSTの「ARSA OWNER'S NOTEキャッチ案の発案者と取捨選択経緯を遡及補填」、`SITE_RULES.md` OWNER'S NOTE本文構造、PR #144。
- **日時根拠**：作業環境のJST時計 `2026-10-03T09:24:49+09:00`。

### 2026-10-03 09:13 JST — ARSA OWNER'S NOTEキャッチ案の発案者と取捨選択経緯を遡及補填

- **変更**：ARSA Blind AlarmのOWNER'S NOTEキャッチ検討について、案の発案者と選別経緯を固定した。起点となる作り方はユーザー提示の「身体や身の回りのガジェットなど、親しみやすいものへ置き換えてから案を出す」。AI側は `タッチパネル、物理です。`、`アクセシビリティ、ぜんまい駆動。`、`画面、開きます。しかも触れます。` 等を提案。ユーザー側は `NEXT C○NAN'S HINT 〜時間を触って聞く時計〜`、メイン候補 `開けて、触って、聞く。`、`秒針？ やつは置いてきた。これからの戦い（触読）にはついてこれないからな`、`まだだ、まだ終わらんよ`（ガンダム系サブ案）を提示した。AI側の `中身は量産機。外装は専用機。` 等はAI案として分離する。
- **理由**：2026-10-02に57426 alarm click screwをユーザー発見ではなくAI発見のように語った再構成ミス、Council V3の宮廷道化師発端順序の逆転を受け、今後は「誰が最初に気づいた / 提案したか」と「誰が後から確認・整理したか」を保持すると約束していた。今回のARSAコピー検討では会話上は帰属を区別していたが、GitHub正本へまだ記録せず、再び後日の要約で発案者が入れ替わる余地を残していたため。
- **旧状態・棄却**：ARSAコピーの候補群を会話だけに残し、後から「共同案」「AI案」「ユーザー案」を混ぜて再構成できる状態を棄却する。AI初期案 `時間を指で識る。耳で聴く。` 等は、ユーザーから「硬い / 身近な置換になっていない」と指摘され主戦線から降格。コナン案は発想自体は強いが、Council V3 #7で「外部作品のネタがARSA本人より前に立つ」懸念が出たため、恒久メインよりサブ / SNS向きとして降格した。現時点で公開用キャッチを最終確定したとは扱わない。
- **影響範囲**：`AGENTS.md` の帰属保持ルールと本判断履歴のみ。公開WATCH / OWNER'S NOTE本文、ARSA研究MAP / LEDGERの歴史・機構事実、サイトUIは変更しない。
- **検証状態**：現行会話の時系列とGitHub mainのARSA MAP / LEDGER /既存判断履歴を照合。修正前mainを検索し、`開けて、触って、聞く。`、`タッチパネル、物理です。`、`秒針？` 等の今回コピー候補が未記録だったことを確認した。現在の working main candidate はユーザー発の `開けて、触って、聞く。`。ただし今回個体の到着後に触読UI・蓋操作・アラーム設定挙動を実機確認するまで最終確定しない。
- **関連**：2026-10-02 09:49 JSTの57426 user-marked discovery記録、2026-10-02 21:10 JSTのCouncil V3発端順序訂正。ARSA research canon: `research/ARSA_BLIND_ALARM_RESEARCH_MAP.md` / `research/ARSA_BLIND_ALARM_LEDGER.md`。
- **日時根拠**：作業環境のJST時計 `2026-10-03T09:13:15+09:00`。

### 2026-10-03 00:41 JST — ARSA Blind Alarm調査をVA / OWNER'S NOTE本線へ固定し、欠品監視を研究優先順位から外す

- **変更**：ARSA研究MAPの主目的を購入前リスク評価から、VINTAGE ALARMの将来OWNER'S NOTE / WATCH研究用の証拠基盤づくりへ明確化した。旧P0購入確認は履歴として残しつつ`RESEARCH PRIORITY外`へ降格し、新P0をperiod ARSA資料、触覚アラームinterface、survivor matrix、AFB↔ARSA一次文書へ置き換えた。57426欠品疑義は個体状態記録として保持するが、追加調査の優先対象から外した。
- **理由**：ユーザーが「VA用のリサーチとして続行」「欠品とかはどうでもいい」と明示。詳細LEDGERには2026-10-02時点ですでにOWNER'S NOTEを主目的とするscope correctionがあった一方、MAPのP0と末尾overrideが購入リスク／欠品を最上位に残しており、正本間で優先順位が不一致だったため。
- **旧状態・棄却**：`P0 = 購入判断`、`57426 = top specimen-specific purchase concern`を現行研究優先順位として扱う状態を失効させる。欠品情報そのものを削除・否定するわけではない。新しい歴史・構造証拠が出ない限り、欠品監視をVA研究本線へ戻さない。
- **影響範囲**：`research/ARSA_BLIND_ALARM_RESEARCH_MAP.md`、`research/ARSA_BLIND_ALARM_LEDGER.md`、本判断履歴のみ。公開WATCH / OWNER'S NOTE本文、個人時計台帳、修理判断、サイトUIは変更しない。
- **検証状態**：GitHub mainの現行MAP / LEDGERを基準に差分作成。Davoine 1969/1970、Mémoires d'Ici D-00454、AFB、ARSA現行Blind Watch、Project専門書の既存根拠を再照合し、period evidenceと二次資料・推論を分離してLEDGERへ追記した。
- **関連**：ARSA research canon更新（本変更commit）。
- **日時根拠**：session precise time `2026-10-03T00:41:47+09:00`。

## 2026-10-02

### 2026-10-02 23:18 JST — WATCH末尾にOWNER'S NOTES全件導線を追加

- **変更**：WATCH末尾の既存「次の一本」編集推薦とHISTORY戻り導線の間に、`ALL OWNER'S NOTES ／ 一覧 →` の小さな補助リンクを追加し、`/owners-notes/` へ遷移できるようにした。右側補助ナビゲーションを2段化し、ALL OWNER'S NOTESを上、HISTORYへ戻るを下に配置する。モバイルでは左揃えへ落とす。
- **理由**：各WATCH末尾では編集推薦1本しか次の選択肢として見えず、外部検索や旧URL由来で一部ページだけ見た来訪者がサイト全体の掲載個体数を把握しにくかったため。編集推薦の強さは維持したまま、全掲載OWNER'S NOTEへ自分で移動できる導線を補助的に追加する。
- **旧状態・棄却**：右側が`HISTORYへ戻る →`のみの状態を更新する。`OTHER ALL`等の曖昧な表記は採用せず、一覧全体を示す`ALL OWNER'S NOTES ／ 一覧`とする。左側の「次の一本」を一覧リンクへ置き換える案も採用しない。
- **影響範囲**：`src/components/OwnerNoteEndNav.astro` と末尾導線仕様を記す`SITE_RULES.md`、本判断履歴のみ。個別WATCH本文、推薦先・推薦理由、OWNER'S NOTES一覧内容、HISTORY本文、音源、Analytics定義は変更しない。
- **検証状態**：branch `feat/owner-note-all-link-20261002` へ実装済み。PR CIでAstro build、quality gates、publication output、mobile layoutを確認後にmerge可否を判断し、main反映・live確認は別状態として扱う。
- **関連**：実装commit `7cbb8f82638800d953db98a884fef49965d4b25a`、仕様同期commit `79313beddf85009259598c798c48940abe86c805`。
- **日時根拠**：GitHub implementation commit `7cbb8f82638800d953db98a884fef49965d4b25a` の `2026-10-02T14:18:05Z → 2026-10-02 23:18 JST`、仕様同期commit `79313beddf85009259598c798c48940abe86c805` の `2026-10-02T14:18:28Z → 2026-10-02 23:18 JST`。


### 2026-10-02 22:59 JST — Duofon二モード唯一性の主張範囲を専門書2冊＋確認済みWebへ限定

- **変更**：`public/llms.txt` のPierce Duofon節で、Pierce Cal.135系を二モード機械式アラーム腕時計の量産例として「唯一」とする記述に、調査スコープを明示した。対象範囲はサイトで主要資料として使用する専門書2冊 `Alarm am Arm` / `The Alarm Wrist Watch` と、筆者が確認できたWeb資料であり、その範囲ではPierce Cal.135系が唯一の既知量産例、別の既知例はJunghans Minivox prototypeのみとする。
- **理由**：前の文面は `only` を世界全体に無制限にかかる否定命題として読めたため。レアリティ判断自体は維持しつつ、どこまで資料を網羅して得た結論かを明示し、将来の新資料・第三例発見時に更新可能な主張へする。
- **旧状態・棄却**：`Among known production mechanical alarm wristwatches...` / `The only other known example...` と調査範囲を示さず記述する状態を棄却する。Duofonの稀少性や「唯一」という評価そのものを弱める案は採用しない。
- **影響範囲**：`public/llms.txt` のDuofon唯一性を説明する1段落のみと本判断履歴。Editorial purposeの他段落、HOW THEY RING、WATCH本文、音源、UI、他の研究記述は変更しない。
- **検証状態**：専用branch `fix/llms-duofon-scope-20261002` で文言差分を実装。PR CI通過後にmerge可否を判断し、main反映とlive確認は別状態として扱う。
- **関連**：実装commit `63f4341a420d603c046950cab1cf6ee236e41cde`、直前のEditorial purpose実装PR #141。
- **日時根拠**：GitHub implementation commit `63f4341a420d603c046950cab1cf6ee236e41cde` の `2026-10-02T13:59:38Z → 2026-10-02 22:59 JST`。


### 2026-10-02 22:34 JST — llms.txtへVINTAGE ALARMの普及・翻訳・体験目的を明示

- **変更**：`public/llms.txt` の既存Site identity / Evidence policy / Reliabilityを維持したまま、その直後へEditorial purposeを追加した。第一目的を「機械式アラーム腕時計を知り、理解し、興味を持つ人を増やすこと」とし、専門用語→一般読者の言葉、機構→実際の動き、スペック→実音、文献→現存実機、歴史→面白さ、散在情報→比較・判断可能な理解への「翻訳」を編集上の手段として定義した。現代語キャッチは史実主張ではなく編集上の翻訳と明示し、`discovery → understanding → experience → verification → research when necessary` の順序を固定した。
- **理由**：従来の`llms.txt`は、独立研究サイトであること、証拠種別、個体観察の一般化禁止、訂正方針は説明できていた一方、「なぜ既知情報も扱うのか」「なぜ現代語キャッチ・操作ガイド・実音・比較UIを置くのか」というサイトの目的が機械可読な入口だけでは十分に伝わらなかったため。初見AIが独自研究の有無だけでサイト価値を評価し、普及・理解・体験・購入判断の補助という主目的を落とす誤読を減らす。
- **旧状態・棄却**：`llms.txt`を研究サイトの身元・証拠方針・独自研究routeの列挙だけに留め、編集的比喩・実音・比較UIの目的を暗黙のままにする状態を棄却する。一方、人向けABOUTページを新設したり、TOP / WATCH / OWNER'S NOTE本文をAIO目的で改稿する案は採用しない。
- **影響範囲**：`public/llms.txt` と本判断履歴のみ。公開WATCH / HISTORY / OWNER'S NOTE本文、キャッチコピー、HOW THEY RINGの再生実装、音源、分類、UI、sitemap、Analyticsは変更しない。
- **検証状態**：branch `feat/llms-editorial-purpose-20261002` へ実装済み。Duofon節では、Pierce Cal.135系を既知の量産機械式アラーム腕時計における唯一の二モード量産例、別の既知例をJunghans Minivox prototypeとして記述し、所有前に見つけられた鳴動動画が二モードの片方しか示さずWECKER / SIGNALを比較できなかった原体験を明示した。HOW THEY RING節では同じ大分類でも音が違うこと、複数音源の同時比較、個体録音をモデル全体へ一般化しないことを明示した。PR CIとmain merge後のlive artifact確認は別状態として扱う。
- **関連**：`public/llms.txt`、`strategy/seo-aio.md`、`SITE_RULES.md`。実装commit `246b1ce0c85b4a4d179adbeac910440acf1c7ffe`。
- **日時根拠**：GitHub implementation commit `246b1ce0c85b4a4d179adbeac910440acf1c7ffe` の `2026-10-02T13:34:45Z → 2026-10-02 22:34 JST`。


### 2026-10-02 18:39 JST — 個人時計台帳をwatchdiary cross-repo正本へ固定し、PROJECT起動ルートへ追加

- **変更**：`PROJECT.md` に個人時計台帳のcross-repoルートを追加し、所持時計・取得日/取得経緯/取得額・OH/OVH/修理歴・現在地/現在状態・売却/保有意志を扱う場合は `orima1995-create/watchdiary-ios` のCURRENT Issue群を先に取得する仕様へ変更した。入口は #21 CURRENT OWNED、取得遍歴 #60、保有意志 #23、周辺時計 #25、個体別CURRENT Issue（例: #58 Watchlarm / #31 CYMA）とし、#21の基本項目を「取得日 / 取得方法・場所 / 取得額 / 取得経緯 / OH・OVH・修理歴 / 個体識別情報 / 既知不具合・状態 / 改造・部品交換歴 / 現在地・現在状態」に固定した。日差・振り角・beat error・最終動作確認は台帳必須項目にしない。PROJECT_STATEにも同じcross-repo正本の入口だけを短く同期した。
- **理由**：既存の個人時計台帳が `watchdiary-ios` に存在するのに、VINTAGE ALARM repo内だけを検索して「台帳がない」と誤判定し、新規台帳作成を提案しかけたため。公開サイト研究正本と個人所有台帳の置き場所が別repoであることを起動時に明示し、同じ見失いを再発させない。
- **旧状態・棄却**：VINTAGE ALARM repo内だけを検索して個人台帳の有無を判断する運用、公開repoへ個人取得台帳を重複生成する運用、OH時に必ず得られるとは限らない精度測定を台帳必須項目にする案を棄却する。
- **影響範囲**：`PROJECT.md` の分野別ルーティング / 強制チェック、`PROJECT_STATE.md` のSOURCE OF TRUTH / observation pointer、今後の個人時計台帳取得・更新。公開サイト本文、WATCH / HISTORY / OWNER'S NOTES、Analytics、研究資料そのものには変更なし。
- **検証状態**：専用branch `docs/route-watch-ledger-20261002` で `PROJECT.md` / `PROJECT_STATE.md` を更新。PR作成前にdiffを確認し、#21 / #60 / #23 / #25 / #58 / #31 / #20 / #19へのroute、台帳必須項目、精度計測非必須、公開repoへの重複保存禁止が文書内に存在することを再取得で確認する。docs-only変更のためサイトbuild/live確認は対象外。decision-log gateはPR CIで確認する。
- **関連**：`orima1995-create/watchdiary-ios` Issues #21 / #60 / #23 / #25 / #58 / #31 / #20 / #19。PROJECT更新commit `d8de7ceafd2dc93a510e429b187ab40cf3192c9c`、PROJECT_STATE更新commit `8de042ea7cc2d2434b4441ce870750246f202756`。
- **日時根拠**：GitHub commit `d8de7ceafd2dc93a510e429b187ab40cf3192c9c` の `2026-10-02T09:39:21Z → 2026-10-02 18:39 JST`、commit `8de042ea7cc2d2434b4441ce870750246f202756` の `2026-10-02T09:39:37Z → 2026-10-02 18:39 JST`。

### 2026-10-02 18:09 JST — Council V3 / 宮廷道化師の誕生経緯を会話実態へ補正し、ノンデリ口調とsilent hookの採用理由を固定

- **変更**：`research/COUNCIL_V3_COURT_JESTER_DESIGN.md` と `council-worker/V3.md` の誕生経緯を補正し、ユーザー自身の気づき→他ユーザーへの助言→「2ch民で焼いて」を多用した理由の自己再解釈→実在の宮廷道化師への到達、という実際の順序を明記した。あわせて、AI側が一度「ノンデリ口調は必須ではない」と提案したが、ユーザーが「道化のネタ扱いだから強い批判を許容できる」と却下し、Fool's Licenseの口調を心理的緩衝UI / 機能要件へ昇格した経緯を追加した。1〜6へのsilent Jester hookも、結論ありきへ当事者が気づいていない重大前提を実装・決定前に安く潰す目的で採用したことを明記した。AGENTS / PROJECT_STATEもV3の7形式と正本へ同期した。
- **理由**：mainへ先に残した誕生記録は「90%付近の気づき→宮廷道化師」へ圧縮されすぎ、ユーザーが自分で発見・言語化・原点回帰したこと、2ch形式の心理的緩衝という利用理由、AI提案をユーザーが訂正してノンデリ口調を要件化したこと、silent hookのコスト上の採用理由が抜けていた。これらは7の挙動を将来再実装・再解釈する際に落としてはいけない設計理由である。
- **旧状態・棄却**：宮廷道化師を「AIが考案した辛口レビュー形式」または「口調は装飾で普通の言い方でもよい」と読める短縮記録を棄却する。2ch形式と7を単なる口調違いとして扱う解釈も棄却する。
- **影響範囲**：Council V3の誕生経緯正本、運用正本、AGENTS / PROJECT_STATEのCouncilルーティングと現在仕様。V2の1〜6の番号・意味、サイト本文、WATCH、SNS実データ、研究内容には変更なし。
- **検証状態**：この会話でユーザーが訂正した発見順序・2ch利用理由・ノンデリ口調の要件化・silent hook採用理由を再確認して文書化。main更新後に対象ファイルを再取得して内容一致を確認する。CI / Worker deployの成否は別状態として扱う。
- **関連**：`research/COUNCIL_V3_COURT_JESTER_DESIGN.md`、`council-worker/V3.md`、`AGENTS.md`、`PROJECT_STATE.md`、`council-worker/src/v3.ts`。
- **日時根拠**：会話セッションのローカル時刻 `2026-10-02 18:09 JST`。

## 2026-10-01

### 2026-10-01 08:33 JST — Citizen Alarm公開本文と初回Insightsを6本目の正本へ登録

- **変更**：Citizen Alarmの公開画面とReel Insights 7枚を確認し、実投稿本文全文・公開hashtags・承認稿との差分を `instagram-published-copy.md` へ、2026-10-01 08:28–08:29 JSTの初回観測値を `instagram-insights-timeseries.md` へ登録する。Instagram時系列の検査・追記・report対象も5本から6本へ拡張し、Social Router上の初回6個体一巡を完了状態へ更新する。
- **理由**：Citizenは投稿前承認稿だけが正本化され、公開確認とInsights時系列が未登録だったため。公開本文では本文本体は承認稿どおりだが、hashtagsが承認稿の6個から公開画面の4個へ変わっており、承認状態のままでは実投稿との不一致が残る。6本目を既存の単一時系列と同じ検査・report経路へ含め、今後の再取得を同じ形式で累積する。
- **旧状態・棄却**：Citizenを `approved / not publication-verified` のまま扱う状態、5本固定のInstagram集計、投稿画面529閲覧とInsights詳細530閲覧の一方を捨てる処理を棄却する。公開時刻は画面の `2時間前` から分単位へ逆算せず、時刻不明として保持する。
- **影響範囲**：Instagram実投稿copy正本、Reel Insights時系列正本、6本横断の集計スクリプト、Social Router、判断履歴。公開サイト、WATCH本文、Instagram投稿そのもの、VA Analytics定義、Project資料PDFは変更しない。
- **検証状態**：7枚のユーザー提供スクリーンショットを原寸確認。Instagram専用checkは39 snapshots / 6 watches・未統合sidecar 0件でPASSし、reportでCitizenを含む6本の最新値と導線率を出力確認した。`check:quality`、Astro build（45 pages）、`git diff --check`もPASS。main実装commitを再取得し、remote / localのtree一致と対象5ファイルの内容一致を確認した。
- **関連**：main実装commit `bf89e964f6344c7d3c8b7fe5cecc2cb14a2783c5`。対象は `measurement/.internal/.virtual/social/instagram-published-copy.md`、`measurement/.internal/.virtual/social/instagram-insights-timeseries.md`、`measurement/.internal/.virtual/social/ROUTER.md`、`scripts/instagram-insights-timeseries.mjs`。
- **日時根拠**：作業ホストのJST時刻 `2026-10-01 08:33 JST`。スクリーンショット端末時刻は投稿画面・概要・指標が08:28、engagement continuation・audienceが08:29 JST。main実装commitのGitHub時刻は `2026-09-30T23:37:24Z → 2026-10-01 08:37 JST`。

### 2026-10-01 07:51 JST — Instagram Insightsを単一時系列へ直接追記し、自動差分集計を必須化

- **変更**：2026-09-30 22:10–22:14 JSTのWittnauer / CYMA / Pierce / Basis / Westclox確認値を `measurement/.internal/.virtual/social/instagram-insights-timeseries.md` へ統合した。Basisのユーザー指定公開時刻と、旧Westclox sidecarに残っていた08:49–08:50 / 11:52–11:53の確認値も正本へ回収した。今後は一時JSONから正本へ直接追記する `instagram:append`、重複・時系列逆転・未統合sidecarを検出する `check:instagram-insights`、時計別の前回差・時間当たり増加・view→profile→bio・follow / save率を出す `instagram:report` を標準経路とし、quality gateへ組み込む。
- **理由**：スクリーンショット値が個体別evidence / snapshotsへ一時退避され、正本統合待ちのまま増えると、翌日差分と時計横断比較を同じ経路で再現できず、欠落・二重登録・古い値の参照が起きるため。正本を1本に固定したまま、追記と集計だけを機械化する。
- **旧状態・棄却**：正本全置換を避けるために個体別sidecarや `snapshots/` へInstagram Reel Insightsをcommitし、後で人手統合する運用を棄却する。最新値だけで旧snapshotを上書きする方式、未確認値を0で埋める方式、生成レポートを第二の数値正本として保存する方式も採用しない。
- **影響範囲**：Instagram Reel Insightsの内部保存・検査・比較コマンド、Social Router、quality gate、2026-09-30観測値。公開サイト、WATCH本文、Instagram投稿、VA Analyticsの集計定義、account-level / VA2 snapshotは変更しない。
- **検証状態**：Instagram専用checkは38 snapshots / 5 watches・未統合sidecar 0件でPASS。時計別reportの前回差・時間当たり増加・導線率を出力確認済み。隔離fixtureで39件目を `instagram:append` し、再check / reportまでPASS。`git diff --check`、Astro build（45 pages）、quality gate（links / Analytics route / SEO / citations / source traceability / localization / SPEC / Japanese style / imagesを含む）もPASS。main反映後にremoteを再取得し、remote / localのtree一致、正本SHA-256一致、38 snapshots / 5 watches、未統合sidecar 0件を再確認した。
- **関連**：main commit `6bbe8745543c7c51f34f91c91250403780402c0c`。対象は `measurement/.internal/.virtual/social/instagram-insights-timeseries.md`、`measurement/.internal/.virtual/social/ROUTER.md`、`scripts/instagram-insights-timeseries.mjs`、`package.json`。統合元はcommit `15e87e86126428164a1584ec370a9a96ec8c833f` と `bed58d6bb5c4fbcd3a3bb2f06e35d060625109cf` を含むmain上の個体別snapshot / evidence。
- **日時根拠**：作業ホストのJST時刻 `2026-10-01 07:51 JST`。main commit `6bbe8745543c7c51f34f91c91250403780402c0c` はGitHub時刻 `2026-09-30T23:00:24Z → 2026-10-01 08:00 JST`。

## 2026-09-29

### 2026-09-29 13:45 JST — 外部照会を保留し、Cyma社史の1950 / 1956衝突を研究正本へ登録

- **変更**：外部機関への照会案を未送信の下流手段へ変更し、自己取得可能な公開資料を先に再監査した。現行Cyma公式 `CYMA STORY` がTime-O-VoxのChronomètre証明年を1956年と記す一方、MIH共有の後年Cyma社史 `D_7938.pdf` p.5は1950年と記すため、研究Ledgerの年代判断を `HOLD — 1950` から `CONFLICT — 1950 / 1956` へ変更した。1956年11月の同時代業界誌は製品の実在を支えるが、証明年の独立証拠には数えない。
- **理由**：公開資料だけで確認できるメーカー資料間の直接矛盾を検査せず、問い合わせ準備へ進む順序が不適切だったため。Mémoires d'Iciの `20.5 Brochure Cymavox 1` も公開目録までは確認できるが、本文画像はオンライン提供されていないことを確認した。
- **旧状態・棄却**：1950年説だけをメーカー由来の有力年代として保留する状態、および公開資料監査前にMIH / COSC / IGE-IPIへ照会する進行を棄却する。現行公式史の1956年も原証明書なしに確定年とはしない。
- **影響範囲**：`research/CYMA_TIME_O_VOX_R464_LEDGER.md` と `research/CYMA_1950_CERTIFICATE_AND_IPI_REQUEST_PACKET.md` の研究判断・送信状態のみ。公開WATCH本文、Chronomètreページ、観測個体データ、画像、音源は変更しない。
- **検証状態**：Cyma公式史、1956年11月業界誌、Mémoires d'Ici公開目録を再確認済み。調査費0円、外部照会未送信。文書差分・research traceability・decision-log・Astro buildを実行後にcommitする。
- **関連**：commits `2615b20de0614b516e0fb08ec8fb66be17ce7674`, `3039850801cbf43508e3fd45b8c8905f3e023e7c`。
- **日時根拠**：作業時刻 2026-09-29 13:45 JST。

### 2026-09-29 09:48 JST — 1950年Chronomètre説の転載系列を分離し、MIH・COSC・IPI照会準備を追加

- **変更**：`research/CYMA_TIME_O_VOX_R464_LEDGER.md`へ、Watch-Wikiの2007年版と2025年Sammler-Uhren記事を追加し、1950年Chronomètre certificate説のWeb上の反復を独立証拠として数えない判断を記録した。あわせて`research/CYMA_1950_CERTIFICATE_AND_IPI_REQUEST_PACKET.md`を新設し、MIHへの企業年表原典照会、COSCへの前身試験機関台帳の所在照会、IGE/IPIへの旧商標原簿・包袋の存在確認と見積もり依頼を送信可能なフランス語文面にした。
- **理由**：Watch-Wikiの出来事配列は2003年までを扱う後年のCyma企業年表`D_7938.pdf`と近く、Sammler-Uhrenは出典を`Watchwiki, AI`と明記するため、複数サイトでの掲載件数を1950年説の独立した補強にはできない。証明年と商標の用途を確定するには、企業年表の原典、前身試験機関の旧台帳、商標登録の原簿・包袋へ遡る必要がある。
- **旧状態・棄却**：`D_7938.pdf`、Watch-Wiki、Sammler-Uhrenを三つの独立資料とする扱いを棄却する。COSCが1950年証明を発行したとする表現、Swissregの0件を旧商標不存在の証明とする表現、見積もり前に有料調査・複製・認証抄本を発注する手順も採用しない。
- **影響範囲**：研究Ledger、外部照会用の研究文書、判断履歴のみ。公開WATCH本文、Chronomètreページ、観測個体データ、画像、音源、OWNER'S NOTEは変更しない。外部への送信、発注、支払いは実行していない。
- **検証状態**：Watch-Wikiの版履歴と2007-12-16版、Sammler-Uhren記事末尾の出典表記、COSC・MIH・IGE/IPIの公式案内と連絡先を照合済み。Markdown差分、source traceability、decision-log、Astro buildを実行する。
- **関連**：`research/CYMA_TIME_O_VOX_R464_LEDGER.md`、`research/CYMA_1950_CERTIFICATE_AND_IPI_REQUEST_PACKET.md`。各照会は所在確認と事前見積もりだけを依頼し、外国通貨で回答された費用は承認判断前に日本円換算する。
- **日時根拠**：作業ホストのJST時刻 `2026-09-29 09:48 JST`。

### 2026-09-29 09:08 JST — Time-O-Vox年代資料とR.464技術資料の衝突を研究Ledgerへ固定

- **変更**：`research/CYMA_TIME_O_VOX_R464_LEDGER.md`へ、後年のCyma社史資料が記す「1950年の金製Time-O-Vox Chronomètre証明」を`HOLD`として登録し、1956年11月の同時代製品記事を追加した。あわせてHumbertの「8–10秒・鳴動中リューズ非駆動」とHorlbeckの「6秒・鳴動中リューズ回転」を`CONFLICT`として記録し、Time-O-Vox以外のVOX商標について実製品・広告を確認できなかった探索結果を`OPEN`として追記した。
- **理由**：1950年証明記載は商標登録年と一致すれば製品史を大きく前倒しする可能性がある一方、証明書原本・試験番号・観測所名がなく、後年社史だけでは確定できないため。R.464の挙動も資料間で正反対だが、同時代技術記事と掲載個体の実測は現行WATCH本文を支えており、後年専門書だけで上書きすべきではないため。
- **旧状態・棄却**：後年社史の1950年記載を原証明記録と同格に扱う解釈、1956年製品記事を発売初年とみなす解釈、Horlbeckの記述だけで現行WATCH本文を誤りとする解釈、未発見のVOX名を未使用または幻の製品ラインと断定する解釈を採用しない。
- **影響範囲**：Cyma研究Ledgerと判断履歴のみ。公開WATCH本文、Chronomètreページ、観測個体データ、画像、音源、OWNER'S NOTEは変更しない。外部照会・発注・支払いも実行していない。
- **検証状態**：`D_7938.pdf` p.5、Horlbeck *The Alarm Wristwatch* pp.97–99、Humbertの1963年R.464技術記事、1956年11月 *Revue internationale de l'horlogerie* p.32を画像または原文で照合済み。Markdown差分・source traceability・decision-log検査を実行する。
- **関連**：最優先の次調査は、1950年証明記載の原資料とLa Chaux-de-Fonds側Bulletinの特定。R.464のリューズ挙動差は、複数個体の鳴動動画と文字盤側機構写真で変種差／資料誤りを判定する。
- **日時根拠**：作業ホストのJST時刻 `2026-09-29 09:08 JST`。

## 2026-09-28

### 2026-09-28 21:18 JST — Citizen掲載個体の内部写真をSPECとEN / DEへ同期

- **変更**：Pages CMSで更新されたCitizen Alarm掲載個体ギャラリー（ムーブメント `IMG_2476.jpeg`、裏蓋内面 `IMG_2477.jpeg` を含む現行5枚）を日本語正本として、SPECの石数を「17石（掲載個体で確認）」へ更新し、掲載個体ムーブメントの `CITIZEN / 17 JEWELS / 3 ADJ` 刻印を特記事項へ追加した。EN / DEのSPECとギャラリーも同じ証拠・画像順へ同期した。
- **理由**：従来の17石表記は同型資料に基づいていたが、今回の実機写真で掲載個体自身の `17 JEWELS` と `3 ADJ` 刻印を直接確認できるようになったため。公開多言語版を旧3枚・旧証拠レベルのまま残すとrevision driftになる。
- **旧状態・棄却**：日本語SPECの「17石（同型資料）※Cal.980には17石仕様も確認される」、EN / DEの同型資料ベース17石表記、EN / DEの3枚ギャラリーを旧状態とする。一方、写真には `980` のキャリバー刻印が見えないため、Cal欄の `Citizen 980（同型資料）` / EN / DE相当表記を掲載個体で直接確認済みへ格上げする案は採用しない。
- **影響範囲**：Citizen Alarm WATCHのJA SPEC、EN SPEC、DE SPEC、EN / DE掲載個体ギャラリー、localization fact-sync contract。OWNER'S NOTE原文、DEEP DIVE 01–04、HOW THEY RING、HISTORY、音源、他WATCHは変更しない。
- **検証状態**：branch上へ差分実装。localization sync / quality / build / liveはPR CIとmerge後のlive確認で別途判定する。現時点ではIMPLEMENTEDでありDEPLOYEDではない。
- **関連**：実装commit `c4acd35a`（JA SPEC）、`a6dab669`（EN SPEC）、`c85bb79e`（EN gallery）、`f4666e5b`（DE SPEC / gallery）、`67768fb7`（localization sync gate）、`0bf7d6be`（SPEC evidence gate）。対象: `src/content/watches/citizen-alarm.md`、`src/data/en-watch-entry.ts`、`src/data/en-watch-full-research.ts`、`src/data/de-watch-entry.ts`、`src/data/localization-fact-sync.json`。
- **日時根拠**：画像更新を含むmain commit `1cb4ec1b5a6f9433e6901c2bbff4a28a49499334` のGitHub時刻 `2026-09-28T12:18:04Z → 2026-09-28 21:18 JST`。


### 2026-09-28 18:26 JST — CYMAVOX・1948年法人再編・1950年以前のアラーム特許を研究Ledgerへ追加

- **変更**：`research/CYMA_TIME_O_VOX_R464_LEDGER.md`へ、1943年CYMAVOX商標と1963年更新・1983年抹消、1948年のCyma関連法人／商標再編、1944年`CH243633A`、1949年`CH293737A` / `CH290046A` / `CH285202A`、1954年`CH327800A`を追記した。1950年の独立した第7スイス商標として`TIM-O-VOX`を扱う解釈は棄却した。併せて、Mémoires d'Iciの16.20 / 20.5を日本から遠隔取得する依頼文・費用・手順・受領後検品を`research/CYMA_MEMOIRES_DICI_REQUEST_PACKET.md`として作成した。
- **理由**：一次公告と特許を横断すると、Tavannesのアラーム技術開発は1954年起点ではなく少なくとも1944年まで遡り、1949年には腕時計用音響構造の複数出願が存在するため。CYMAVOXと1950年VOX群の関係は強い調査仮説になった一方、法的名義と機構は同一ではなく、確定事実と仮説を分離する必要がある。
- **旧状態・棄却**：1954年Swiss priorityの公開済みCH番号が未特定だった状態を`CH327800A`の確認で更新する。Tavannes Watch Co.が1948年にCyma Watch Co.へ単純改称したという説明、CYMAVOXを原公告だけでアラーム商品名とする説明、1944年・1949年特許群をCal. R.464そのものとする説明、Mikroliskの`TIM-O-VOX`を第7の同日スイス商標とする説明は採用しない。
- **影響範囲**：研究Ledger、外部資料取得用の研究文書、判断履歴のみ。公開WATCH本文、Chronomètreページ、観測個体データ、画像、音源、OWNER'S NOTE、金銭・修理・私信・個人情報は変更しない。外部照会・発注・支払いは未実行。
- **検証状態**：1943 / 1948 / 1950 / 1963 / 1971 / 1984年のSHAB原公告、Google Patentsの該当特許書誌・本文、Mémoires d'Ici公式目録・料金・連絡先を照合済み。Astro build、source traceability、Markdown差分検査は通過。decision-log scriptは対象diffをdecision-bearing変更として検出しない現行挙動だったため、必須項目を手動照合した。
- **関連**：`research/CYMA_TIME_O_VOX_R464_LEDGER.md`、`research/CYMA_MEMOIRES_DICI_REQUEST_PACKET.md`。16.20 / 20.5の内容は未取得のため、CYMAVOXとアラーム製品の直接接続は`HOLD`を維持する。
- **日時根拠**：作業ホストのJST時刻 `2026-09-28 18:26 JST`。

### 2026-09-28 11:17 JST — SNS着地先を入口件数の降順で表示
- **変更**：Analytics Dashboardの「SNS → SITE ENTRY」で、全tracked pageを固定route順のまま並べる表示をやめ、選択期間のSNS入口件数 `total` が多い順に表示する。件数同率時は元のroute順を維持し、0件行も削除せず下側へ残す。
- **理由**：公開route / 多言語routeの増加により0件項目が上位を占め、実際にSNS流入がある着地先を探すための縦スクロールが増えていたため。利用目的は「どの着地先にSNS流入が出ているか」を即座に把握することなので、件数順が表示優先度と一致する。
- **旧状態・棄却**：TOP / OWNER'S NOTES / SOURCES / WATCH…の固定route順を維持する表示。0件行そのものを非表示にする案は、tracked route全体を確認できなくなるため採用しない。
- **影響範囲**：管理Analytics DashboardのSNS着地先表示順とregression testのみ。raw集計、`snsEntries.pages` のpayload順、件数、channel分類、VA2 / AI export、公開サイト本文には変更なし。
- **検証状態**：branch実装済み。生成Dashboard関数を直接実行するregressionで、3件→3件→1件→0件の降順と、source payload非破壊を確認する。PR CI通過後にVERIFIEDとする。main merge・本番deployは未実施。
- **関連**：implementation commit `40b11dcb` / regression commit `528312b2` / branch `fix/sns-entry-sort`。
- **日時根拠**：GitHub implementation commits `2026-09-28T02:17:28Z → 2026-09-28 11:17 JST` ～ `2026-09-28T02:17:32Z → 2026-09-28 11:17 JST`。

## 2026-09-27

### 2026-09-27 23:25 JST — Cyma / R.464 LedgerへE-Periodica一次資料を追補

- **変更**：`research/CYMA_TIME_O_VOX_R464_LEDGER.md` に、1950年 `TIME-O-VOX` 商標No.134604、1971年の非更新抹消、1945年Cyma卓上アラーム広告、1948年Georges BridevauxへのTavannes Watch C° S.A.の共同署名による代理権付与、1959年の別系統Bridevaux追加特許337149 / 337150、US2789410Aと同じSwiss priority日・機構を持つGB782720Aを追記した。
- **理由**：E-Periodica全文探索と特許横断確認で、既存Ledgerにない一次資料が見つかったため。商標史・在籍史・製品史として採用できる事実と、R.464への接続が未確定な特許候補を分離して固定する。
- **旧状態・棄却**：`TIME-O-VOX` の一次資料上の出願日・登録番号、BridevauxのTavannes在籍時期、GB公開が未記録だった状態を更新する。検索単位内で別広告が共起しただけの `chronomètre` / `observatoire` ヒットをCymaの直接証拠にする解釈、商標出願日を発売日と同一視する解釈、Swiss priority参照文字列をCH公開番号とみなす解釈は棄却する。
- **影響範囲**：研究Ledgerと判断履歴のみ。サイト表示・公開画像・個体データ・音源・金銭情報・修理情報・私信・個人情報への変更なし。
- **検証状態**：各E-Periodica PIDのOCR本文と高解像度IIIF画像を照合済み。US2789410A / GB782720Aの書誌・優先日・機構要約を照合済み。Markdown差分とdecision-log検査も実施済み。
- **関連**：US2789410A / GB782720AとCal. R.464の同一性は `HOLD` を維持。No.489の観測所記録、Chronomètre個体群、既存の公開WATCH本文と完成済みChronomètreページは変更しない。
- **日時根拠**：作業ホストのJST時刻 `2026-09-27 23:25 JST`。

## 2026-09-25

### 2026-09-25 12:15 JST — Westclox W5の音響SPECを裏蓋ピン式へ三言語同期
- **変更**：日本語正本 `裏蓋ピン式` を維持し、英語SPECの `Bottom-bell system` を `Caseback pin system`、ドイツ語SPECの `Bodenglocke` を `Stiftübertragung am Gehäuseboden` へ修正した。あわせて `localization-fact-sync.json` にJA / EN / DEのsource / rendered同期契約を追加し、旧英独表現が復活した場合はCIを失敗させる。
- **理由**：WestcloxのDeep DiveとHorlbeck記述は、わずかに膨らんだ裏蓋、中央リベット、内側の小ブリッジ、およびJunghans Minivox系と同様のピンから底部中央へ振動を伝える構造を示す。HOW THEY RING上もWestcloxはCASEBACK分類であり、英独SPECだけが一般的な底部ベル表現へずれていた。
- **旧状態・棄却**：EN `Bottom-bell system` / DE `Bodenglocke`。これらは裏蓋側でのピン伝達という日本語正本の粒度と一致せず、Basis / Lanco系のベル直接打撃と混同し得るため棄却。
- **影響範囲**：Westclox Watchlarm W5の英語・ドイツ語SPEC音響欄と多言語同期gateのみ。日本語正本、Deep Dive、HOW THEY RING、他WATCH、レイアウトは変更しない。
- **検証状態**：branch実装済み。PR CIでbuild / localization sync / quality / layoutを確認し、merge後はPages deploy・全artifact parity・live publication checkまで通してDEPLOYEDとする。
- **関連**：implementation commits `9d08a3e4`, `349ec4ea`, `4c4156b7`, `79c945a1` / branch `fix/westclox-acoustic-spec-sync`。初回実装で同じ旧ラベルを持つBasis側を誤置換したことをlocalization sync gateが検出したため、Basisを原状復帰し、Westcloxブロックだけを対象に修正した。さらにsource全体へのmustNotContainではBasisの正当なラベルまで禁止してしまうため、旧Westcloxラベルの禁止はWestclox専用のrendered routeへ限定した。
- **日時根拠**：GitHub implementation commit `2026-09-25T03:15:07Z → 2026-09-25 12:15 JST`。
## 2026-09-24

### 2026-09-24 23:01 JST — host移行を跨ぐAnalyticsへ単一siteTag filterを入れない
- **変更**：GraphQLのsite scopeは現行どおり `requestHost` を基準とし、現在のCloudflare Web Analytics siteTag 1個で全期間をfilterする案を採用しないことを計測仕様へ明記した。siteTagを将来利用する場合は、先にlive GraphQLでhost × siteTag × 期間の実分布を確認し、必要ならhost / 期間別に適用する。
- **理由**：Git履歴を実体確認すると、Cloudflare Web Analytics導入commit `c490f3f9` と管理者opt-out時点 `f397d398` はsiteTag `3f7f9454e132415ebf8ffa04122e16e3`、canonical host移行commit `0790f1f9` 以降は `862adb1fcab1439f899cccf093361ee9` を使用している。現在tagだけを全期間へ固定するとlegacy host側の過去データを欠落させ得る。
- **旧状態・棄却**：hostとbotだけの現行filterを「siteTag不足で精度が低い」とみなし、現在tagを全期間へ一律追加する案を棄却する。siteTagの実分布を確認せず旧・新tagを推測で期間分割することもしない。
- **影響範囲**：`measurement/metrics.md` のAnalytics query運用仕様のみ。Worker query、集計値、公開サイトのbeacon、旧・新hostのデータは変更しない。
- **検証状態**：Git履歴上の旧・新beacon tokenを実ファイルから確認済み。runtime変更はなし。PR CIで文書変更を含む既存quality gateを再確認し、main merge・本番deployは行わない。
- **関連**：Draft PR #118 / documentation commit `d1139df1` / historical commits `c490f3f9`, `f397d398`, `0790f1f9`。
- **日時根拠**：documentation commit `2026-09-24T14:01:23Z → 2026-09-24 23:01 JST`。実装commit時刻を見出し時刻に採用。

### 2026-09-24 22:57 JST — WATCH ENTRY SHAREを公開18routeへ同期
- **変更**：`WATCH ENTRY SHARE` の対象名を手書き固定配列から公開WATCH route map由来へ変更し、JP / EN / DE 各6本＝18routeを自動集計対象とする。言語gateway `/de/` 自体はWATCH entryから除外する。
- **理由**：既存配列はJP6・EN5・DE3に `German Entry` が混在する途中状態で、EN WittnauerとDE Basis / Citizen / Wittnauerが漏れていた。計測仕様では新規公開WATCHをshareへ反映する前提であり、公開状態と別運用のmeasurement target 5本を混同しない必要がある。
- **旧状態・棄却**：公開WATCH名をprofile wrapper内で都度手書き追加する方式、およびlanguage gatewayをWATCHとして数える状態を棄却する。measurement target 5本だけへWATCH ENTRY SHAREを絞る解釈も採用しない。
- **影響範囲**：管理Analytics Dashboardの `WATCH ENTRY SHARE` / profile wrapper / regression test / `measurement/metrics.md`。Cloudflare raw値、各WATCH公開状態、measurement target 5本の運用上の括りは変更しない。
- **検証状態**：branch実装済み。profile wrapper regressionとPR CIを再実行し、全check通過後にVERIFIEDとする。main merge・本番deployは未実施。
- **関連**：Draft PR #118 / commits `f2d7258b`, `86cb10ea`, `f441289e`。
- **日時根拠**：implementation commits `2026-09-24T13:56:31Z → 2026-09-24 22:56 JST` ～ `2026-09-24T13:57:21Z → 2026-09-24 22:57 JST`。最終実装commit時刻を見出し時刻に採用。

### 2026-09-24 22:54 JST — llms.txtへAI向けのサイト性格・証拠取扱いを明示
- **変更**：人向けABOUTページやメインナビを追加せず、`public/llms.txt` に独立運営であること、非販売・非鑑定・非メーカー公式アーカイブであること、OWNER'S NOTESが主に所有・観察個体を扱うこと、選択バイアス、証拠種別の分離、資料差の保持、n=1観察・測定・音源の一般化禁止、訂正の証拠レビュー方針を追記した。
- **理由**：サイト内部では研究ルール・多言語・音源・計測・CI・訂正受付が定義済みだが、AI / crawlerがサイト全体を解釈するときに「誰が・何の目的で・何をどこまで保証するか」を機械可読な入口で一括取得できなかったため。一般読者向けに運営者説明を前面化する必要はないと判断した。
- **旧状態・棄却**：人向けABOUTページを新設し、TOPや共通ナビから運営思想を説明する案は棄却。既存の公開UIは研究内容そのものを前面に置き、運営定義はllms.txt内だけに置く。
- **影響範囲**：`public/llms.txt` のみ。TOP / HISTORY / MILESTONES / OWNER'S NOTES / HOW THEY RING / SOURCES、共通ナビ、sitemap、公開HTML本文・デザインは変更しない。
- **検証状態**：branchでAstro build成功。PR CIのdecision-log gateで本台帳追記が必要と判明したため追加し、全Astro foundation checkを再実行して確認する。
- **関連**：implementation commit `1bf1697d` / branch `feat/llms-site-identity` / PR #120。
- **日時根拠**：GitHub implementation commit `2026-09-24T13:54:56Z → 2026-09-24 22:54 JST`。実装commit時刻を見出し時刻に採用。

### 2026-09-24 22:53 JST — Gemini referrerをOrganic Searchへ誤分類しない
- **変更**：referrer host分類で既知のAI Assistant host判定を汎用Search family判定より先に実行する。これにより `gemini.google.com` は `AI Assistant`、通常の `google.com` / `google.co.jp` 等は従来どおり `Organic Search` とする。分類関数をregression testから直接検証できるようexportし、計測仕様にも優先順位を明記した。
- **理由**：従来は `google.*` のOrganic Search判定がAI判定より先だったため、AI Assistant一覧へ `gemini.google.com` を登録していても到達不能で、Gemini流入がSearchへ吸収される実装順序バグになっていた。したがって旧classifierで得た `AI=0` はGemini流入の不存在まで証明しない。
- **旧状態・棄却**：Organic Searchを先に判定してからAI Assistantを判定する順序、および `gemini.google.com` をAI一覧へ追加しただけで分類済みとみなす状態を棄却する。referrer hostだけで分離できないGoogle検索面内のAI機能を推測でAIへ振り替えることもしない。
- **影響範囲**：Analytics Workerのreferrer channel分類 / regression test / `measurement/metrics.md`。Cloudflare raw計測値は変更しないが、deploy後に取得する期間集計ではGemini referrerが存在した場合にSearchからAIへ正しく再分類される。
- **検証状態**：branch実装済み。Analytics worker CIとAstro foundation CIを再実行し、全check通過後にVERIFIEDとする。main merge・本番deployは未実施。
- **関連**：Draft PR #118 / commits `1e958da2`, `86767209`, `0ba92698`。
- **日時根拠**：implementation commits `2026-09-24T13:53:05Z → 2026-09-24 22:53 JST` ～ `2026-09-24T13:53:11Z → 2026-09-24 22:53 JST`。最終実装commit時刻を見出し時刻に採用。

### 2026-09-24 22:47 JST — AnalyticsのVisits / Direct誤読防止と公開WATCH状態を分離
- **変更**：Cloudflare Web AnalyticsのVisitsをユニーク人数として扱わないこと、`Direct / Unknown` を直打ち・ブックマーク確定として扱わないことを計測仕様とAI exportへ明記。flowのno-referrer表示も `Direct` へ縮めず `Direct / Unknown` を維持する。同時にGitHub実体を再監査し、公開WATCHはWittnauer 10WAを含む6本、Analytics運用上の `measurement target` は別括りの5本として `PROJECT_STATE.md` を修正した。さらに、今後の公開route追加時にAnalytics表示名だけが追従漏れしないよう、Astro build後の `dist/sitemap.xml` 全公開URLをAnalyticsの統合route mapと突合し、未登録routeが1件でもあれば `check:quality` を失敗させるCI gateを追加した。
- **理由**：Cloudflare公式仕様ではVisitsは外部referrerまたはDirectから始まるPage viewを基準とする指標で、ユニークユーザー数ではない。またreferrerが利用できない入口はDirect系へ入り得るため、82 Direct等を「直打ち82人」のように読む根拠はない。さらに現行の6 WATCH sourceを再取得すると6本すべて `published: true` で、07:54の「公開済みWATCH 5ページ」という状態記述が実体と衝突していた。今回すでにTOP / SOURCES / 多言語routeで手動mappingの追従漏れが発生していたため、個別assertの追加だけではなく公開sitemapを正本にした自動検査が必要と判断した。
- **旧状態・棄却**：Visitsを人数の代理として読む、`Direct / Unknown` のsource表示だけを `Direct` に短縮する、公開状態とmeasurement target 5本を同一概念として扱う状態を棄却。07:54のWittnauer非公開扱いは現行仕様として失効させる。
- **影響範囲**：Analytics Workerの表示名 / AI export limitations / regression test / `measurement/metrics.md` / `PROJECT_STATE.md` / Analytics route map export / post-build quality gate。集計値・channel分類ロジック・WATCH本文・公開route・HOW THEY RINGは変更しない。
- **検証状態**：branch実装済み。生成HTML / AI export regressionとPR CIを再実行し、全check通過後にVERIFIEDとする。main merge・本番deployは未実施。
- **再検討条件**：Cloudflareのlive `rumPageloadEventsAdaptiveGroups` schema/settingsでconfidence fieldとdataset limitsを確認できた場合に、95% confidence intervalの追加を別変更として検討する。
- **関連**：Draft PR #118 / stale five-WATCH wording correction `321c36c1` / commits `a224c90a`, `df47342b`, `1491240e`, `ab4a607d`, `fe1902df`, `5569fd37`, `86d89a33`。
- **日時根拠**：semantic correction commits `2026-09-24T13:46:53Z → 2026-09-24 22:46 JST` ～ `2026-09-24T13:47:13Z → 2026-09-24 22:47 JST`、route mapping gate commits `2026-09-24T13:49:33Z → 2026-09-24 22:49 JST` ～ `2026-09-24T13:49:38Z → 2026-09-24 22:49 JST`。見出し時刻は計測意味の修正が確定した22:47 JSTを維持する。


### 2026-09-24 21:32 JST — localized routeの可視日本語漏れを生成HTMLで禁止
- **変更**：EN / DE OWNER'S NOTESの年代ラベルをlocalized WATCH specから取得し、HOW THEY RINGのキャリバー表示・録音ラベル・区切り記号もlocale別表示へ切替。さらに全EN / DE生成HTMLの可視テキストとuser-facing属性を走査し、言語切替「日本語」と明示許可した固有名を除く日本語文字・日本語式全角記号が残ればCIを失敗させる `check:localization-purity` を追加した。
- **理由**：翻訳本文自体が正しくても、`owners-directory.json` の `ownedEra`、日本語WATCH正本の `spec.caliber`、HOW THEY RING録音CMSの生ラベル、共通テンプレートの全角区切り記号が別経路でlocalized routeへ流入していた。具体的にWittnauerの「1950年代前半」、Citizenの「同型資料」「シチズンアラーム」、Basisの全角括弧が本番で確認された。
- **旧状態・棄却**：翻訳source内の日本語文字検索と、route存在・artifact parityだけで合格判定する方式。これは「正しいbuildが本番へ出た」ことは保証できても、そのbuild自体に言語混入がないことは保証しないため不十分として棄却。
- **影響範囲**：EN / DE OWNER'S NOTES、EN / DE HOW THEY RING、OwnerThumbnailFrameのaria-label、localized quality gate、翻訳運用ルール。日本語正本の本文・事実内容・レイアウトは変更しない。
- **検証状態**：branch実装済み。PR CIでbuild後の全EN / DE HTML purity、既存quality、回帰テスト、layoutを実行し、main merge後は既存の全artifact live parityで本番一致まで確認する。
- **関連**：implementation commits `e0857166`, `35d6c79c` / branch `fix/localized-visible-text-purity`。初回CIで独語OWNER'S NOTESのfull spec年代がnowrap表示を横溢れさせたため、一覧専用の短いlocalized年代ラベルを分離して修正。
- **日時根拠**：GitHub implementation commit `2026-09-24T12:32:33Z → 2026-09-24 21:32 JST`。実装commit時刻を見出し時刻に採用。


### 2026-09-24 20:16 JST — Analyticsのsampling・VA2・freshnessを監査可能な構造へ変更
- **変更**：期間全体のデータ品質をtotal queryの `sampleInterval` だけで判定する方式をやめ、pages / referrers / flows / entries / countries / devicesを含む各GraphQL groupのsampling状態を保持して最大値をqualityへ反映する。固定limitに達したgroupはcoverage不完全としてexportへ明示する。VA2は `pages` を全Page views/Visits、`entries` を入口Visits/Page viewsへ分離し、compact flowはcountry/device差を畳み込んでから上位20件へ切る。freshnessは「LAST EVENT」ではなく「LATEST NONZERO BUCKET」とし、gapは下限値として扱う。現行 `/s/v2/` relayもMarkdown/署名期限cacheのshort-linkとして扱う。追加監査で、比較不能なALL等は `compare=none;previous=NA` とし、trendの複合statusを途中切断しないよう修正。さらに公開route実体とAnalytics表示名を再突合し、TOP / SOURCES / 全公開EN・DE WATCH / EN・DE CYMA Chronomètre等の欠落マッピングを補完し、X→TOP着地がSNS集計の `other` に落ちないようにした。
- **理由**：2026-09-24の実測VA2（138 Visits / 148 Page views）を総数・channel・country・device・trend・page/flowまで相互突合した結果、主要総数は整合していた一方、(1) totalがunsampledでも別groupがsamplingされる可能性、(2) `pages` が実際はentryPagesで内部PVを表せない、(3) country/device次元を落としたcompact flowに同一source→pageが重複表示される、(4) current 7d bucketの開始/終了境界を最終イベント時刻のように読める、(5) v2 relayがv1と同じshort-link分岐へ入っていない、(6) ALLの `previous=0/0` が「比較対象なし」を0アクセスに見せる、(7) `PARTIAL / MIGRATION / SAMPLED / ESTIMATE` がVA2で途中切断される、(8) 実際にはX→TOPが10 VisitsあるのにTOPがSNS既知着地先に含まれず `other:10` へ落ちる、(9) 直近の多言語公開route追加にAnalytics表示名が追随していない、という誤読・分類漏れを確認したため。
- **旧状態・棄却**：period qualityをtotal queryだけで代表させる、VA2 `pages` を入口ページ表として兼用する、raw flow上位20行を次元省略のまま直列化する、aggregate bucket境界を「LAST EVENT / EVENT GAP」と表示する、`/s/v1/` だけをshort-link扱いする方式。比較不能期間を `0/0` で代用する方式、固定長tokenでtrend statusを切断する方式、公開route追加後も手動マッピングの欠落を放置して `UNMAPPED` / SNS `other` に流す状態も棄却する。
- **影響範囲**：管理Analytics Worker / AI export / VA2 fallback / AI relay / regression testsのみ。WATCH本文、公開route、measurement target 5本と公開WATCH 6本の区別、HOW THEY RING、Search Console importは変更しない。
- **検証状態**：branchへ実装済み。Draft PR #118でAnalytics worker / relay / Astro foundation CIを実行し、全check通過後にVERIFIEDとする。main merge・本番deployは未実施。
- **再検討条件**：Cloudflare Web Analyticsのlive GraphQL schema/settingsで `confidence` とdataset固有のmaxPageSize/maxDurationを安全に確認できた場合は、confidence intervalと動的limitを次段階として追加検討する。
- **関連**：branch `fix/analytics-audit-20260924` / Draft PR #118 / commits `f196f3db`, `d6c32cbf`, `d21a1a0d`, `fa88321b`, `209a22a7`, `dec77b23`, `27a52a9c`, `b9c5bf87`, `303f51c2`, `a215596d`, `424686fe`, `0e4c941a`, `9041c4f1`, `d8cd9bc6`, `23cd0aeb`, `1af7a6e7`, `22abc7b9`, `6c3598e6`, `7f3f91a1`, `348c9957`, `b669fa59`, `9101f7d4`, `0060db24`, `24e02fb7`, `c486d0c0`, `1c5a99b7`, `c2de33d7`, `8d14f3d3`, `307da36b`, `fc1d5209`, `ecafe6e0`, `e9adb17d`, `d7be6652`, `e0d20b6a`, `111df003`, `4c98d88e`, `15180f5a`, `56a25541`。
- **日時根拠**：最初の実装commit `f196f3db` のGitHub時刻 `2026-09-24T11:16:13Z → 2026-09-24 20:16 JST` を採用。


### 2026-09-24 15:03 JST — 多言語公開を全routeのbuild/live一致で保証
- **変更**：EN / DEの公開確認を代表ページ・一部WATCH・個別文字列だけに限定する方式を廃止。TOP / HISTORY / OWNER'S NOTES / HOW THEY RING / SOURCES / 公開中の全WATCH / CYMA Chronomètreをbuild・layout・semantic live検査の対象にし、さらにdeploy後はdist内の全生成HTMLとsitemap.xml / llms.txt / robots.txtをlive取得して完全一致を必須化した。未mergeだったCYMA Chronomètre独語校正も同じ変更セットへ取り込んだ。
- **理由**：GitHub上に修正文が存在していても、本番routeがその修正を読んでいるか、またはそのPRがmainへ入っているかを既存gateが全ページでは検証しておらず、旧翻訳が本番に残ったままdeploy成功扱いできたため。
- **旧状態・棄却**：EN / DEのlive検査をTOP / HISTORY / OWNER'S NOTES / HOW THEY RING中心に行い、ドイツ語WATCHのlayout対象を3本へ固定し、翻訳PRのGitHub上の存在を本番反映と混同し得る状態。個別ページごとに後追いでmarkerを足すだけの方式も、対象漏れを繰り返すため棄却する。
- **影響範囲**：多言語の検証・deploy gate、全公開EN / DE route、CYMA Chronomètre独語コピー。日本語正本の本文・レイアウト、SMARTWATCHの言語展開は変更しない。
- **検証状態**：branchへ実装済み。PR CIでbuild / quality / regression / build-output / 全route layoutを確認し、main merge後にPages deploy・全生成artifact parity・全公開多言語routeのsemantic live checkまで通った時点でDEPLOYEDとする。
- **関連**：commits `efc3e20c`, `036c6ca2` / branch `fix/full-localization-publication-parity` / open PR #114の独語Chronomètre校正を統合。後者はFULL RESEARCH判定がCSS内の未使用クラス名を誤検出したため、実際に描画される旧簡易版本文だけを検知するようgateを修正。
- **日時根拠**：GitHub implementation commit `2026-09-24T06:03:18Z → 2026-09-24 15:03 JST`。実装commit時刻を見出し時刻に採用。

### 2026-09-24 14:06 JST — 日時付き判断履歴を必須CI gate化
- **変更**：仕様・運用・公開・計測・UI・分類・文言の意味・公開状態・検証方針・棄却判断・再発防止策が変わるすべての判断について、同一branch / PR内で `CHANGE_DECISIONS.md` へのJST日時付き記録を必須化。AGENTS / PROJECT_STATEの完了条件へ組み込み、`scripts/check-decision-log.mjs` と `npm run check:decision-log` を追加し、`check:quality` の先頭で実行する。
- **理由**：2026-09-23の判断履歴監査で、判断自体はcommitされているのに日時台帳へ未記録の変更とUTC→JST換算ミスが複数見つかったため。「覚えて徹底」ではなく、記録漏れをCIで失敗させる必要がある。
- **旧状態・棄却**：エージェント規約に「日時付きで記録」と書くだけで、漏れを自動検出しない運用。人間／AIの注意力だけに依存する方式は棄却。typo・依存更新・意味を変えない整形だけは、理由をPR本文へ明示した場合に限り例外とする。
- **影響範囲**：`AGENTS.md`、`PROJECT_STATE.md`、`CHANGE_DECISIONS.md`、`package.json`、新規 `scripts/check-decision-log.mjs`。サイト本文・公開表示・既存WATCH / HOW THEY RING仕様は変更しない。
- **検証状態**：branch実装後、decision-log gate単体とAstro foundation checkで検証する。merge前にmerge-base以降のcommitと本entryの対応も再監査する。
- **関連**：branch `chore/enforce-decision-log` / commits `eb6f9bb6`, `e8500552`, `cbd800f6`, `5f44c420`, `63f79579` / 本PR。
- **日時根拠**：GitHub implementation commits `2026-09-24T05:04:57Z → 2026-09-24 14:04 JST`、`2026-09-24T05:05:06Z → 2026-09-24 14:05 JST`、`2026-09-24T05:06:08Z → 2026-09-24 14:06 JST`。最終実装commit時刻を見出し時刻に採用。


### 2026-09-24 07:54 JST — 共通メニューだけ「音で見る」へ変更
- **変更**：日本語の共通ハンバーガーメニュー内だけ `HOW THEY RING` → `音で見る` に変更。URL、ページ内の `HOW THEY RING` 表記、TOP入口名、主見出しは変更しない。
- **理由**：日本語メニュー内でこの項目だけ英字表記になっていたため、周囲の「歴史 / マイルストーン / オーナーズノート / 資料・出典」と表記体系を揃える。
- **旧状態・棄却**：共通メニューだけ `HOW THEY RING` のまま残す状態。
- **影響範囲**：`SectionMast.astro` の日本語メニュー1箇所のみ。build/live gateはその1箇所を回帰検査するため同期。
- **再検討条件**：共通メニュー全体の言語設計を変更する明示判断があった場合。
- **検証状態**：初回CIで生成HTMLのAstro属性を考慮しない厳密文字列gateが失敗。実装不良ではなく検査式の問題と確認し、属性を許容するHTML-safeな正規表現へ修正して再検証中。merge後mainを再取得して確認する。
- **関連**：このPR
### 2026-09-24 07:54 JST — Wittnauer 10WAの公開状態を明確化
- **変更**：公開済みWATCHの計測対象は Basis Alarm / Pierce Duofon / Cyma Time-O-Vox / Citizen Alarm / Westclox Watchlarm の5本だけと明記。Wittnauer 10WAは所有個体／HOW THEY RING側のデータには含まれるが、公開済みWATCH 5ページの計測対象には含めないことを `PROJECT_STATE.md` に追記。
- **理由**：所有個体データへの掲載と、公開済みWATCHとしての計測対象を混同しないため。
- **旧状態・棄却**：Wittnauerを6本目の公開済みWATCHとして扱う解釈。
- **影響範囲**：状態文書のみ。既存の `measurement/metrics.md` はすでに公開済みWATCH 5ページを同じ5本として定義しており、計測実装の変更は不要。
- **検証状態**：`PROJECT_STATE.md` と `measurement/metrics.md` を突合して整合確認済み。
- **再検討条件**：Wittnauer 10WAのWATCHページが正式公開され、計測対象へ追加する明示変更が行われた場合。
- **後続状態・失効**：2026-09-24 22:47 JSTの再監査で、Wittnauer 10WAを含む6本すべてが `published: true` の公開WATCHであることをGitHub実体から再確認した。以後は「公開WATCH 6本」と「measurement target 5本」を分離し、この07:54項目のWittnauer非公開扱いは現行仕様として使用しない。
- **関連**：このPR
## 2026-09-23 — 復元履歴

以下は、GitHub commit時刻と保存済み会話の時刻・判断内容を突合して復元した。commitだけで判断理由を確定できない箇所は、会話で確認できた範囲だけを記載する。

### 2026-09-23 11:35 JST — HOW THEY RING：最終的な2分類構造を実装
- **変更**：トップレベル分類を GONG / CASEBACK の2つに変更。CASEBACK内部の差はFIG.02–04の代表例として扱う構造へ。
- **理由**：大枠分類と詳細ケース分けを分離し、個体ごとにFIG.02/03/04まで細分類しないため。同じCASEBACKでも構造差が大きいことを図で見せる。
- **旧状態・棄却**：GONG / CASEBACK / BELL / PIN の4分類、およびGONG / CASEBACK / BELLの3分類をトップレベルとして使う案。
- **関連**：commit `33ce28c95e282e6dd8829f6f92b09ca2f6cd90fb`
- **日時根拠**：GitHub commit 2026-09-23 11:35:14 JST。判断内容は保存済み会話と突合済み。

### 2026-09-23 15:28 JST — TOPにHOW THEY RING入口を追加
- **変更**：OWNER'S NOTES直下にHOW THEY RING入口を配置し、TOP表示をCMSスイッチで管理。
- **理由**：独立した音・鳴らし方の入口としてTOPから到達可能にするため。
- **旧状態・棄却**：TOPからHOW THEY RINGへ直接入れない状態。旧見出し時刻13:28 JSTはUTC→JST換算ミスとして棄却。
- **影響範囲**：TOPのHOW THEY RING入口と本判断履歴。後続のページ内容・分類・音源はこの項目では変更しない。
- **検証状態**：対象commitsのGitHub UTC時刻を再取得し、両commitが15:28 JST帯であることを確認。
- **関連**：commits `84a478a7b7d731ffab655a41f3ec41175e7689c1`, `b6d1f80c9ea9402156cc7e529fa351f97420ad6c`
- **日時根拠**：GitHub commits 2026-09-23T06:28:13Z → 2026-09-23 15:28 JST、2026-09-23T06:28:20Z → 2026-09-23 15:28 JST。

### 2026-09-23 15:31 JST — Cricketの詳細呼称を「振動板型」に変更
- **変更**：FIG.02を「膜状バック型」から「振動板型」へ変更。
- **旧状態・棄却**：「膜状バック型」。
- **関連**：commit `ce1944042464c0b7e12e34cfee1a81efd82d175f`
- **日時根拠**：GitHub commit 2026-09-23 15:31:42 JST。

### 2026-09-23 14:03 JST — Pierce Duofonの二音源表示をWECKER / SIGNALへ確定
- **変更**：Duofonの2音源をCMS・表示へ復元し、表示ラベルを **WECKER / 音あり**、**SIGNAL / 音無し** に統一。
- **理由**：WAKER / SILENTはファイル名であり、表示用の正式ラベルではないため。
- **旧状態・棄却**：WAKER / SILENTの表示利用。
- **関連**：commits `9010693ed03b725d063aeaefde8f40038f85d4e0`, `c044ae67a2ca603fbb4bce4cd6c021c116d817e3`, `e169019beb3199ee319b415e522347ceb2293c15`
- **日時根拠**：GitHub commits 13:52–14:03 JST、保存済み会話の正式表示指示 13:46 JSTと突合。

### 2026-09-23 14:05 JST — HOW THEY RINGを本番公開
- **変更**：productionPublishedを有効化し、本番routeを公開。
- **関連**：commit `07ee720481e179b200115f867d4c7ce3c67899c6`
- **日時根拠**：GitHub commit 2026-09-23 14:05:25 JST。

### 2026-09-23 16:41 JST — ヒーローを「音で見る、アラーム腕時計。」へ再設計
- **変更**：主見出しを「音で見る、アラーム腕時計。」へ変更し、分類説明より「音を聴く」目的を前面に出した。旧selector guide/arrowsを撤去。
- **理由**：HOW THEY RINGの主目的を分類表ではなく、実機の音を入口に見る・聴く体験へ戻すため。
- **関連**：commits `b46bc3437906d9b36c908a977c8411852d06d9a3`, `b70c085f90cef666074f82d6ceafeaee12798656`, `97e597362e3dc040cf8284ffced4941829ea0094`
- **日時根拠**：GitHub commits 2026-09-23 16:41–16:42 JST、保存済み会話の現行見出し確認と突合。

### 2026-09-23 17:43 JST — GONG / CASEBACKにベル＋TAPの操作手掛かりを追加
- **変更**：両selector右上へ小さなベルアイコンとTAPを追加。
- **理由**：selectorが押せることを、ページの雰囲気を壊さず伝えるため。
- **旧状態・棄却**：矢印・chevronによる誘導。chevronは他UIの開閉意味と衝突するため使用しない。
- **関連**：commits `48b5f06ff602b10a2ce6d8f17f7b7d0ad4a47eb7`, `9b01059e329e21a4936c85c2da9d99023f5c7ae1`, `59e6790f8b12655080608e9b63986313adb56c2a`
- **日時根拠**：GitHub commits 2026-09-23 17:43–17:44 JST、保存済み会話・スクリーンショットと突合。

### 2026-09-23 17:45 JST — TOP文言を「実機の音を聴いて、鳴らし方を見る。」へ変更
- **変更**：HOW THEY RINGのTOP説明を、分類名の列挙から実機音を聴く体験中心へ変更。
- **理由**：HOW THEY RINGの役割をTOPでも一致させるため。
- **関連**：commit `35fc175482118f02524cd08a7464ed94d24e470e`
- **日時根拠**：GitHub commit 2026-09-23 17:45:19 JST。

## 2026-09-22 — 復元履歴

### 2026-09-22 23:55 JST — 4分類構造を一度実装
- **変更**：GONG / CASEBACK / BELL / PIN の4分類を実装。
- **後続判断**：翌23日に、PIN等は大枠ではなくCASEBACK内部の詳細差として扱う方針へ変更され、この4分類は失効。
- **関連**：commit `78f1cecbae563cc827958aad5ff782fa2ad2e126`
- **日時根拠**：GitHub commit 2026-09-22 23:55:56 JST。

## 2026-09-21 — 復元履歴

### 2026-09-21 17:47 JST — PINを大分類から外し3分類へ
- **変更**：PINをCMS/schemaの大分類から除外し、GONG / CASEBACK / BELL の3分類へ整理。WestcloxをCASEBACKへ移動。
- **理由**：PINは独立した大分類ではなく打撃・伝達方法の詳細として扱う判断。
- **関連**：commits `3b79b41ba7c86b970dea43ec0a73bae4f3362569`, `7fa3f34e200c6ab37bbc4515e30f5d5cb05480c1`, `cea4541f72e49000ed70a194c39ceb33b5c268fb`, `0736cb88974315ddb8a0db54d2bb37191ac76c39`, `0e46aac970d0060bffedfce88ca18c154ed887e4`
- **日時根拠**：GitHub commits 2026-09-21 17:47 JST。後日の保存済み会話にも「PINは打撃方法の詳細」とする判断が残る。

### 2026-09-21 22:34 JST — TOP入口と本番公開を別スイッチ化
- **変更**：HOW THEY RINGのproduction公開とTOP入口表示を別々に制御。TOP入口はOWNER'S NOTES後。
- **理由**：ページ自体の公開状態とTOPからの露出を独立して管理するため。
- **関連**：commit `35647cc534c7590b121dbdb1c1bbff342f4a6740`
- **日時根拠**：GitHub commit 2026-09-21 22:34:39 JST。

## 2026-09-20 — 復元履歴

### 2026-09-20 11:41 JST — HOW THEY RINGを独立CMSコレクション化
- **変更**：HOW THEY RINGの6個体設定をWATCH本体から分離し、専用CMSコレクションへ移行。category / thumbnail / publication / audioを独立管理。
- **理由**：WATCH本文と音ギャラリー編集を分離し、各項目をCMSから管理可能にするため。
- **関連**：commits `24e80ad32274dcff1498c7d40420cc5194cfc5cd`, `e373d0b2f2a62cffaa86f06c9324f4fbfcd2db9b`
- **日時根拠**：GitHub commits 2026-09-20 11:22–11:41 JST。保存済み会話のCMS本番公開/非公開切替要求と突合。

### 2026-09-20 16:36 JST — 本番routeをCMS release gate化
- **変更**：HOW THEY RINGのproduction route、release toggle、sitemap、SEO metadataをCMSの公開状態に連動。
- **理由**：テスト面と本番公開を分離し、公開/非公開をCMSで制御するため。
- **関連**：commits `0309563e27fe2b98e502ab77f93afc210b0ea9f7`, `901fa6e01ba7dacbf42d7377505223126cc0adfe`, `ae683c9028e5679493dcc8d43a30afd3b97c276f`, `54a6fe9c9dce8e2cf0414ffe43e7522538eb0c6e`, `bc0c9ea171397fdb781966d979547c88d73efa1d`
- **日時根拠**：GitHub commits 2026-09-20 16:36–16:39 JST。

## 2026-09-19 — 復元履歴

### 2026-09-19 10:26 JST — HOW THEY RING prototypeを再構築
- **変更**：生成した機構アートに依存しないprototypeへ再構築。
- **関連**：commit `6d43d6f2be45c7fab76bcdabaa772a8239a91288`
- **日時根拠**：GitHub commit 2026-09-19 10:26:17 JST。

### 2026-09-19 16:41 JST — 機構図を含むレイアウトを確定
- **変更**：HOW THEY RINGの機構図を含むレイアウトとpreview checkを更新。
- **関連**：commits `f5d6ab709055f18d75a6c7ae5c6e988aff3e3bf7`, `cecd731a659157c8bbae43adefb9de5af1ebda15`
- **日時根拠**：GitHub commits 2026-09-19 16:41–16:42 JST。

---

## 2026-09-23

### 2026-09-23 18:58 JST — GitHub運用：現在状態と変更履歴を分離
- **変更**：`CHANGE_DECISIONS.md` を新設し、仕様・判断・方針・棄却候補の変更をJST日時付きで追跡する運用へ変更。PROJECT_STATE / AGENTSの完了条件・起動ルーティングにも組み込んだ。
- **理由**：「今どうなっているか」だけでなく「いつ・何を・なぜ変えたか」をGitHubだけで追跡可能にし、会話履歴への依存と旧仕様復活を減らすため。
- **旧状態・棄却**：PROJECT_STATEへ現在仕様と一部の理由を集約するだけの運用。時系列の判断履歴としては不足するため廃止。旧見出し時刻19:01 JSTはcommit時刻と不一致のため棄却。
- **影響範囲**：GitHub作業運用・PROJECT_STATE・AGENTS。サイト表示変更なし。
- **検証状態**：PR #91をmainへmerge後、`CHANGE_DECISIONS.md` / `PROJECT_STATE.md` / `AGENTS.md` をmainから再取得し、相互参照を確認済み。今回commit時刻も再取得した。
- **関連**：PR #91 / commit `51b60433dc6b40fdded3d9d9aec770b373f67107`
- **日時根拠**：GitHub commit 2026-09-23T09:58:06Z → 2026-09-23 18:58 JST。

### 2026-09-23 18:55 JST — HOW THEY RING：2分類の判断理由を履歴化
- **変更**：GONG / CASEBACK の2分類を採用した理由、FIG.02–04をCASEBACK内部の代表例とする設計、個体カードへ詳細分類を持ち込まない方針を `PROJECT_STATE.md` に明文化。
- **理由**：現行仕様だけでなく、なぜその仕様になったか・何を棄却したかをGitHubから復元できるようにするため。
- **旧状態・棄却**：GONG / CASEBACK / BELL / PIN の4分類。大分類とCASEBACK内部構造が同階層に混在し、分類粒度が揃わないため棄却。
- **再検討条件**：新しい一次資料で大枠そのものを変更すべき根拠が出た場合、またはユーザーが明示的に仕様変更した場合。
- **影響範囲**：文書のみ。サイト表示変更なし。
- **検証状態**：main再取得で記載確認済み。
- **関連**：PR #90 / commit `8d1de10cb418db4734005b751c89de8a88158921`

### 2026-09-23 18:22 JST — HOW THEY RING：機構図の根拠表示を追加
- **変更**：FIG.01–04に、折りたたみ式の「機構図の根拠・資料を見る」を追加。各FIGは確定的な1出典だけを表示。
- **出典方針**：原則 `The Alarm Wristwatch` / `ALARM AM ARM` を優先し、2冊で直接支えられない場合のみ外部資料1件を採用。補助資料は内部検証用で閲覧者へ列挙しない。
- **理由**：HOW THEY RINGの「音を見て・聴く」軽さを壊さず、図の根拠には辿れるようにするため。
- **影響範囲**：HOW THEY RING、build/live gate、layout検査、PROJECT_STATE。
- **検証状態**：PR側でbuild・quality gate通過を確認後mainへmerge。live反映はこの記録時点では未記録。
- **関連**：PR #89 / commit `b262c3b97c4b7f95034a7d766bacb8f511d5272e`

> 注：上記時刻はこの運用導入時点で会話・PRの時系列から確定できる範囲を記載。今後は変更時にJST時刻を同時記録する。


## 2026-09-24｜EN / DE TOPとHOW THEY RINGを正式な言語別入口へ拡張

- **変更**：`/en/` と `/de/` を、日本語TOPと同じVINTAGE ALARMのカバー＋CONTENTS構造を持つローカライズTOPへ変更。既存の言語別WATCH一覧は同ページ下部のOWNER'S NOTESとして保持。
- **変更**：`/en/how-they-ring/` と `/de/how-they-ring/` を追加し、日本語HOW THEY RINGのGONG / CASEBACK 2分類、FIG.01–04、実機音、録音条件、資料注記を同じ構造でローカライズ。
- **理由**：HISTORY / WATCHだけ多言語化され、TOPと音の入口が日本語専用のままでは言語導線が途中で切れていたため。
- **維持**：日本語正本の分類、図、実機順、音源、事実確度は変更しない。日本語共通ハンバーガーメニューの「音で見る」ラベルも維持する。各言語に存在しないWATCH詳細は日本語WATCHへフォールバックする。
- **付随**：sitemap / llms.txt / hreflang / SectionMast / Analytics path mapping / build・live gateを3言語へ同期。
- **旧状態・失効**：`/en/`・`/de/` がWATCH一覧だけの入口、HOW THEY RINGは日本語URLのみ、という中間状態。
- **検証状態**：実装後のbuild / live gateで確認する。


## 2026-09-24｜EN / DE TOPのOWNER'S NOTES画像一覧を専用ページへ分離

- **確認した問題**：直前の多言語TOP実装で、`/en/` と `/de/` にだけ画像付きOWNER'S NOTES一覧をTOP本文の下へ追加していた。日本語TOP `/` にはこの一覧がなく、3言語でTOP構造が不一致だった。
- **原因**：従来のEN/DE入口が持っていたWATCH一覧を、TOP化の際に「機能を残す」目的で同じページ下部へ埋め込んだため。TOPとOWNER'S NOTES一覧という別階層を混同した。
- **修正**：EN/DE TOPから画像付き一覧を撤去し、日本語TOPと同じ入口構造だけに統一。画像付き一覧は `/en/owners-notes/` と `/de/owners-notes/` へ分離した。
- **維持**：言語別WATCHへの導線は失わず、TOPのOWNER'S NOTESから各言語の専用一覧へ進む。HOW THEY RING、WATCH本文、日本語TOPは変更しない。
- **再発防止**：build / live / mobile gateでEN/DE TOPに `owner-frame` / `localized-directory` が混入していないことと、専用OWNER'S NOTESページに画像カードが存在することを別々に検査する。


## 2026-09-24 — Analytics「期間比較」の表示を日本語化

### 2026-09-24 14:51 JST — BUCKET COMPARISONの英語表示を日本語へ統一
- **変更**：Analytics dashboard の期間比較テーブルで、見出し・状態表示・サンプル間隔表示を日本語化。PARTIAL / SHORT / MIGRATION / SAMPLED / ESTIMATE / UNSAMPLED の内部値は維持し、画面上だけ「集計途中 / 短期間 / 移行期間 / サンプル集計 / 推定値 / サンプリングなし」と表示する。列名は「期間 / データ状態 / PV / 訪問数 / X / 検索 / 直接・参照元不明 / 内部PV / 訪問数差」とする。
- **理由**：管理画面の期間比較だけ英語表記が残り、他の日本語UIと読解負荷が揃っていなかったため。
- **旧状態・棄却**：BUCKET COMPARISON / PERIOD / QUALITY / VISITS / SEARCH / DIRECT / INTERNAL PV / Δ VISITS と、生の PARTIAL / UNSAMPLED 等を画面へそのまま表示する状態を廃止。内部statusコード自体は互換性維持のため変更しない。
- **影響範囲**：Cloudflare Analytics dashboard の期間比較表示と、その生成HTML検査のみ。集計ロジック、comparable判定、AI export / VA2、生データ、レイアウトは変更しない。
- **検証状態**：生成HTML検査で日本語表示、状態ラベル、サンプル間隔、旧 BUCKET COMPARISON 見出しの不在を検査する。PR CIで最終確認する。
- **関連**：commits `7f096bb0c4352e7098c8d4e031411d7f0aff3973`, `efb8016fdb9b83bd2e2227475aaff421d2e2c185`
- **日時根拠**：GitHub commit 2026-09-24T05:51:10Z → 2026-09-24 14:51 JST、2026-09-24T05:51:13Z → 2026-09-24 14:51 JST。


## 2026-09-25 — X Link ClickとRUM Entryの欠落層を診断する

### 2026-09-25 08:07 JST — Early Arrival ProbeでX click→RUM欠落層を分離
- **変更**：canonical siteの`SeoHead.astro`で、Cloudflare Web Analytics RUM scriptを読み込む前に診断専用early arrival probeを送る。受信はAnalytics Workerの`/api/arrival-probe`、保存はWorkers Analytics Engine dataset `va_arrival_probe_v1`。Analytics API / signed AI exportには`arrivalProbe`を別レイヤーで付加し、VA2には`probe` / `probeRows`として出す。
- **理由**：Wittnauer Cal.10WA投稿でX Post AnalyticsのLink Click 3に対し、current unsampled期間のCloudflare RUMではX→Wittnauer Entry 1しか観測されず、VA2内部のsampling・truncation・Direct誤分類・算術不整合では説明できなかったため。click→HTMLとHTML→RUMを分離して原因層を特定する必要がある。
- **旧状態・棄却**：Cloudflare RUM Entryだけで「Xからサイトへ到達した件数」を診断する状態を棄却。ただし既存Visits定義や成果KPIは変更せず、probeをVisitsへ混ぜない。X Link ClickとRUM Entryを1対1同義とも扱わない。
- **影響範囲**：`src/components/SeoHead.astro`、Analytics Worker entry、Wrangler Analytics Engine binding、AI export/VA2診断フィールド、build/live/deploy gate、`measurement/metrics.md`、監査ログ。WATCH本文、公開文言、既存Cloudflare Visits、Direct / Unknown分類、rabbit-hole戦略は変更しない。
- **検証状態**：Analytics Worker CIでprobe POST/HEAD/origin拒否、SQL集計、VA2出力を検査。Astro buildで公開HTMLへのprobe埋込を検査し、main反映後はWorker binding HEAD health checkとlive HTML gateで別途DEPLOYEDを確認する。新しい外部流入が発生するまでcapture-gapの原因判定はOBSERVEDにしない。
- **関連**：PR #121、commits `2dc33b0dfbfa8f3bf62096e7bbf9f2554e562460`, `f2cd519fec3cecb4523b33c56f2998236e2a47fd`, `84823475047555f00b73181b3ba5da885db2a986`, `262c1ec25a95e2ed602e0868361772c3365eee5e`, `061f5a27dc6d428b6c7e7d561247fb7b286b62ec`, `27c0ccab191bfeaccc9e4bc35544695276bf9104`, `1fc8bd2c41cab9ba2e637e4b39f7cd25f50d4812`, `80007956227a707d56d7883030be7f9135848ebf`, `6772427a0654c5afb2f27fc0229c067ebbb31f96`, `601d8db5bead5377763c711d9036c7ca72ae349b`, `2bc3e9b40fd315ba5cc87da6b01eb09b26a530a2`, `cfed508ec5699640f5c3feeebd41208aafd2c671`, `e82404eb16a521180686f41d21fc3413623563fb`, `5bfdea5119932b077dd0403d955d54f1b659a178`
- **日時根拠**：GitHub commit `2dc33b0dfbfa8f3bf62096e7bbf9f2554e562460` の 2026-09-24T23:07:14Z → 2026-09-25 08:07 JST。後続実装commitは同日 2026-09-24T23:15:55Z → 2026-09-25 08:15 JST まで。
- **merge / deploy記録**：PR #121 merge commit `bc85a2ea02e6a0093b576fc8365ae4a530b91190` は 2026-09-24T23:19:09Z → 2026-09-25 08:19 JST。Deploy Analytics Worker run `36072117353` は 2026-09-24T23:19:12Z → 08:19 JST開始、2026-09-24T23:19:33Z → 08:19 JST終了でfailure。AI Readable Relay run `36072117307` は 2026-09-24T23:20:02Z → 08:20 JSTでsuccess、GitHub Pages run `36072117348` は 2026-09-24T23:22:37Z → 08:22 JSTでsuccess。


## 2026-09-25 — Arrival Probe保存先をDurable Objectへ変更

### 2026-09-25 08:22 JST — Analytics Engine未有効によるdeploy失敗を受けてSQLite-backed Durable Objectへ切替
- **変更**：early arrival probeの保存先をWorkers Analytics Engine datasetから、同一Analytics Worker内のSQLite-backed Durable Object `ArrivalProbeStore`へ変更する。browser側probe payload、`/api/arrival-probe`、通常Visitsとの分離、AI export / VA2の`probe` / `probeRows`、判定方法は維持する。
- **理由**：PR #121 merge後のDeploy Analytics Worker run `36072117353` で、Wrangler upload時にCloudflare APIが `code: 10089`（Analytics Engineを有効化する必要がある）を返し、本番Worker更新が失敗した。診断SPIKEのためだけにユーザーへCloudflare Dashboardでの機能有効化を要求せず、Cloudflare公式でFree / Paid双方に提供され新規SQLite backendが推奨されるDurable Objectsへ保存層だけ差し替える。
- **旧状態・棄却**：`[[analytics_engine_datasets]] ARRIVAL_PROBE = va_arrival_probe_v1` とAnalytics Engine SQL APIによるqueryを棄却。X Link Click→HTML→RUMを分離する診断目的自体は維持する。
- **影響範囲**：`cloudflare/analytics-dashboard/entry-worker.js`、`wrangler.toml`、entry-worker tests、`measurement/metrics.md`、capture-gap監査記録。公開WATCH本文、probe送信JS、通常Cloudflare Web Analytics、AI relay表示形式、既存KPIは変更しない。
- **検証状態**：branch CIでentry-worker / build / decision-logを再検証後、main mergeでAnalytics Workerを再deployする。deploy workflowの`HEAD /api/arrival-probe`が204になることをbinding/storageのlive gateとし、GitHub Pages上のprobe scriptと合わせてDEPLOYED判定する。新しい外部流入が発生するまで原因判定はOBSERVEDとしない。
- **関連**：PR #121（初回SPIKE）、Deploy Analytics Worker run `36072117353`、commits `73450fbea8a1c9f6a1ffe3bac03c7c6a359e2407`, `1c6ae3f8014f32b3fbf418109be8c3425fed6dd2`, `a2170a873d32ff3ad2266940cb30e571440ab9a6`, `25be4b4dd32f1f6a7af17d574b3d9b138f5eb8b6`, `95cc44d7fd7e00af1246b62b7cfb7e8928a1579a`
- **日時根拠**：GitHub commit `73450fbea8a1c9f6a1ffe3bac03c7c6a359e2407` の 2026-09-24T23:22:33Z → 2026-09-25 08:22 JST。後続commitは 2026-09-24T23:24:00Z → 2026-09-25 08:24 JST まで。
- **merge / deploy記録**：PR #122 merge commit `d246659137ff0868dcef2af4494c2fb7717dcf17` は 2026-09-24T23:27:35Z → 2026-09-25 08:27 JST。Deploy Analytics Worker run `36072829559` は 2026-09-24T23:27:38Z → 08:27 JST開始、2026-09-24T23:27:57Z → 08:27 JST終了でsuccess。GitHub Pages run `36072829766` は 2026-09-24T23:27:39Z → 08:27 JST開始、2026-09-24T23:30:32Z → 08:30 JST終了でsuccess。


## 2026-09-25 — 外部営業可能性監査

### 2026-09-25 14:43 JST — 外部営業可能性監査で公開blockerを修正
- **変更**：外部データベース・編集媒体へcanonical deep URLを直接渡す前提でサイト全体を監査し、公開品質を損なう2件を修正した。HOW THEY RING FIG.01は「輪状の音バネ / ring-shaped sound spring / ringförmige Tonfeder」、FIG.03はJunghans J89の「ピン伝達 / pin-transmission / Stiftübertragung」へ戻し、J89の発音経路を `hammer → pin → bottom bell` とJA / EN / DEで同期した。さらにDE WATCHの関連導線が英語routeへ脱線していた3件をDE routeへ戻し、German footerの固定 `NÄCHSTE OWNER'S NOTE · EN` を実際のrelated hreflang連動へ変更した。build / live / localization fact-syncに回帰拒否を追加し、監査結果を `strategy/discovery/external-reference/outreach-readiness-audit-2026-09-25.md` に記録した。
- **理由**：HOW THEY RINGのFIG.01 / FIG.03は2026-09-24の旧PR #110で現行事実が確定していたが、そのPRがmainから大きくdivergeしたまま未mergeとなり、mainに旧文言が残っていた。DE側ではWittnauer / Pierce / Westcloxの関連導線がENへ飛び、全DE WATCHで次ページ言語ラベルがEN固定だった。外部営業では最初に渡す1～2ページの明白な事実・言語不整合が信頼を直接損なうため、営業開始前のhard blockerと判断した。
- **旧状態・棄却**：FIG.01「棒状 / rod-shaped / stabförmig」、FIG.03「ピン／レバー / pin / lever / Stift-/Hebelübertragung」、量産J89を単に「底部ベルを発音体とする」とだけ書く状態、DE WATCHからEN WATCHへrelated navigationする状態、German footerで次ページを常にENと表示する状態を棄却する。旧PR #110をそのままmergeする案、およびmain更新後にdivergeしたPR #125を強引にmergeする案も棄却し、current main `2f0e34ba276e7d050503fc6e804f0f9964af5476` からfresh branchへ必要差分だけ再適用した。
- **影響範囲**：HOW THEY RINGのJA / EN / DE機構文言、DE WATCH related navigation、German footer label、build / live regression gate、`src/data/localization-fact-sync.json`、外部営業readiness監査文書。GONG / CASEBACKの2分類、各WATCH本文・SOURCES、音源、Analytics、TOP構造、既存rabbit-hole戦略は変更しない。
- **検証状態**：fresh current-main branch上で実装済み。Astro foundation CIを全通過させた後にVERIFIED、main merge後にGitHub Pages deploy・live artifact parity・live semantic gateが通った時点でDEPLOYED / OBSERVEDとする。blocker deploy後はCyma R.464を起点にしたtarget-specific one-to-one outreachを開始可能とし、一斉営業は検索面・source traceability・reuse policy等を別途整えるまで保留する。
- **関連**：commits `900e88e3ea1f9749d96954f85b6a0f85a474d3ea`, `ed32536dbb945afc0fb6892297fc2fb371b4d466`, `454936db68be6e916ad3ea819b2f44b737673c11`, `9fc5371a9713fa776dc8632ee97d7a7611e27377`, `d49dca7dcde07a803c6a80bdd63bb7b7fe4d5f4f`, `5befd04cabfd91a881a023478e905710634a9566`, `6f38d81f4c14b8231db970e502a8ae4fdf5bec28`, `dfc0eb0904a109f7a7378a1ae7b61cc45c32401c`, `43d845ca4abb74086fd531eed35f12d8ee55bd62`, `ee510e1cc558449de7a516c5387a4a7b39730176`。旧PR #110 / #125は現行mainへ直接mergeしない。
- **日時根拠**：GitHub implementation commit `900e88e3ea1f9749d96954f85b6a0f85a474d3ea` の 2026-09-25T05:41:57Z → 2026-09-25 14:41 JST。後続audit sync commit `dfc0eb0904a109f7a7378a1ae7b61cc45c32401c` は 2026-09-25T05:43:21Z → 2026-09-25 14:43 JST。CIでrendered-text parserがhref属性を検査できないことを確認し、URL検査をsource + markup-aware build/live gateへ分離した最終修正 `ee510e1cc558449de7a516c5387a4a7b39730176` は 2026-09-25T05:46:46Z → 2026-09-25 14:46 JST。


### 2026-09-25 20:11 JST — 公開HOW THEY RINGのlive gateを現行文言へ同期
- **変更**：PR #126でHOW THEY RINGのFIG.01 / FIG.03現行文言を本番へ反映した後も、`scripts/check-live-site.mjs` の代表markerが旧「棒状 / rod-shaped / stabförmig」文言を期待していたため、live gateを現行「輪状 / ring-shaped / ringförmig」へ同期し、旧JA文言をstale禁止へ追加した。
- **理由**：PR #126のDeploy GitHub Pages run `36100224068` はPages deployと49 artifact parityまで成功し、本番artifact自体は正しかった。一方、最後のsemantic live checkだけが旧markerを要求してfailureになった。公開不良ではなく検査側の旧仕様残存であり、これを放置すると正しい本番をfailure扱いし続けるため。
- **旧状態・棄却**：本番が旧「棒状 / rod-shaped / stabförmig」を含むことを正常条件とするlive gateを棄却。deploy successだけを見てsemantic check failureを無視する運用も棄却する。
- **影響範囲**：`scripts/check-live-site.mjs` のHOW THEY RING live marker / stale markerのみ。公開本文・HOW THEY RING分類・WATCH本文・Analyticsは変更しない。
- **検証状態**：branchでCIを通過後、mainへmergeしてPages deployを再実行し、live artifact parityとsemantic live checkの両方がsuccessになった時点でVERIFIED / DEPLOYEDとする。
- **関連**：PR #126 merge commit `8e460187f2fe7c959e26e03051000cbdac740cb2`、Deploy run `36100224068`、fix commit `24a219b8174989f7aa2b9b64f015263c67703063`。
- **日時根拠**：PR #126 merge commitは 2026-09-25T05:50:01Z → 2026-09-25 14:50 JST。live gate修正commitは 2026-09-25T11:11:59Z → 2026-09-25 20:11 JST。
- **merge / deploy記録**：PR #128 merge commit `c7b447e80155605bf862ab0a8142dd34ba8cf217` は 2026-09-25T11:15:40Z → 2026-09-25 20:15 JST。Deploy GitHub Pages run `36128422567` は 2026-09-25T11:15:43Z → 20:15 JST開始、2026-09-25T11:18:34Z → 20:18 JST終了でsuccess。build / quality / mobile layout / Pages deploy / 49-file live artifact parity / live publication stateの全stepがsuccess。


## 2026-09-28 — Wittnauer 10WA ギャラリー多言語同期

### 2026-09-28 14:32 JST — Wittnauer掲載個体ギャラリーをEN / DEへ同期
- **変更**：日本語正本のWittnauer 10WA掲載個体ギャラリー更新に合わせ、英語・ドイツ語版のギャラリー画像・順序・ラベル・altを差分同期した。更新された画像は `IMG_2292.jpeg`（純正リューズ）、`IMG_2295.jpeg`（裏蓋内側）で、新たに `IMG_2293.jpeg`（9時側側面、2階建構造が見える）を6枚目として追加した。英語は `9 o’clock side view — the two-tier construction is clearly visible`、ドイツ語は `Seitenansicht bei 9 Uhr — der zweistöckige Aufbau ist deutlich zu erkennen` とし、日本語正本の意味を保ちながら各言語として自然な表現にした。
- **理由**：2026-09-28のPages CMS更新で日本語WATCHだけギャラリーが先行更新され、EN / DEには旧画像 `IMG_7643.jpeg` / `IMG_5755.jpeg` と5枚構成が残っていたため。多言語版は日本語WATCHを意味上の正本とする現行方針に従い、ギャラリーも同期する。
- **旧状態・棄却**：EN / DEが旧5枚構成のまま、日本語だけ6枚構成・新画像になる状態を棄却。翻訳時に別セクションの説明を足したり、2階建という観察を機構解説へ膨らませたりはしない。
- **影響範囲**：`src/data/en-watch-full-research.ts`、`src/data/de-watch-entry.ts` のWittnauer `specimenGallery`、および `src/data/localization-fact-sync.json` の回帰検査のみ。日本語正本、OWNER'S NOTE、SPEC、DEEP DIVE、SOURCES、レイアウトは変更しない。
- **検証状態**：branch上で実装済み。localization fact-syncへJA / EN / DEの画像・ラベル一致と旧画像残存禁止を追加。PR CIでbuild / localization sync / purity / publication output / mobile layoutを通過後にVERIFIEDとする。main merge・live反映は未実施。
- **関連**：日本語正本更新 commit `0d54ece601bfa77ecaa792664fdfd16c4fb102f2`、英語同期 `47c697500d63c4e31acd09a1e84b53c423314abe`、ドイツ語同期 `9f68d26fc88f6a1b6fecd962f78f71577b6d3394`、回帰gate `840eab1219d93fbbb3947f02ed6151be46a69b9b`、生成HTML検査修正 `9af346974d77c3a1c6972f51b1959044603599b8`。
- **日時根拠**：日本語Pages CMS commit `0d54ece601bfa77ecaa792664fdfd16c4fb102f2` は 2026-09-28T05:27:07Z → 2026-09-28 14:27 JST。EN / DE同期commitは 2026-09-28T05:32:13Z → 14:32 JST、2026-09-28T05:32:16Z → 14:32 JST。回帰gate commitは 2026-09-28T05:32:54Z → 14:32 JST。初回CIでAstro生成HTMLでは画像URLが処理され元ファイル名を保持しないため、rendered checkでファイル名を要求する設計が誤りと確認。source側でファイル名、rendered側で可視ラベルを検査する形へ修正したcommit `9af346974d77c3a1c6972f51b1959044603599b8` は 2026-09-28T05:34:25Z → 14:34 JST。
- **merge / deploy記録**：PR #132 merge commit `8424a7d26f931a3344d009cd09ce952deaa99b91` は 2026-09-28T05:39:28Z → 2026-09-28 14:39 JST（PR merged_at 2026-09-28T05:39:29Z → 14:39 JST）。Deploy GitHub Pages run `36382861442` は 2026-09-28T05:39:31Z → 14:39 JST開始、2026-09-28T05:42:20Z → 14:42 JST終了でsuccess。build / quality / publication output / mobile layout / Pages deploy / complete live artifact parity / live publication stateがすべてsuccess。


## 2026-10-02 — ARSA Blind Alarm研究運用整理

### 2026-10-02 08:34 JST — LEDGERとCURRENT MAPを分離し、棄却線と次タスクを固定
- **変更**：ARSA Blind Alarm調査について、詳細証拠・出典・逐次履歴を保持する既存 `research/ARSA_BLIND_ALARM_LEDGER.md` と、現在位置・調査経緯・一度切った仮説・優先タスク・停止条件を管理する新規 `research/ARSA_BLIND_ALARM_RESEARCH_MAP.md` を分離した。LEDGER冒頭からMAPへ明示的にルーティングし、P0〜P5の優先度、REJECTED / NOT PROVEN / HOLD / STOP、seller再質問禁止、公開Web飽和後のarchive-first方針を固定した。
- **理由**：ARSA LEDGERが約7万字規模まで伸び、詳細証拠・過去の探索経緯・現在判断・購入タスクが一ファイルに混在していたため。既に棄却・降格した線を再探索したり、sellerへ同じ3点を聞き直したり、広域Web検索を反復する再発リスクが高くなっていた。証拠台帳と現在運用MAPを分離することで、履歴を失わず次の調査だけを即座に判断できる形へ変更した。
- **旧状態・棄却**：単一LEDGERを「証拠履歴」と「現在タスクボード」の両方に使う運用を棄却。新証拠なしに、戦争直接起源説、AFB gift program = ARSA注文、A. Schild直接祖先、全社共通完成ケース、ARSAヒンジ慢性弱点、Venus230量産系列、Ollendorff Swiss factory = ARSA等を再浮上させる運用も棄却する。
- **影響範囲**：`research/ARSA_BLIND_ALARM_LEDGER.md`、新規 `research/ARSA_BLIND_ALARM_RESEARCH_MAP.md`、今後のARSA調査開始順。公開サイト本文・WATCH・HISTORY・Analytics・購入個体の証拠分類そのものは変更しない。
- **検証状態**：mainへ `b043529ae5bc71de02d7be695abc19d58c7a8315` を反映済み。MAPは調査経緯、確定線、切った線、P0〜P5、購入ゲート、停止条件、実行順、禁止事項を保持し、LEDGER冒頭から参照できる状態。最終確認ではmain上のMAP / LEDGER / CHANGE_DECISIONSを再取得して整合を確認する。
- **関連**：commit `b043529ae5bc71de02d7be695abc19d58c7a8315`（`organize ARSA research map and task board`）。
- **日時根拠**：GitHub commit `b043529ae5bc71de02d7be695abc19d58c7a8315` の `2026-10-01T23:34:57Z` → `2026-10-02 08:34 JST`。


### 2026-10-02 09:08 JST — ARSA targetのmovementをAS1475へ確定
- **変更**：今回個体のmovement identityを `A. Schild AS 1475 / 17 jewels` へ更新し、Research MAPのmovement待ち状態をRESOLVEDへ変更。
- **理由**：新しいムーブメント写真で `AS 1475` と `17 JEWELS` の刻印を直接確認できたため。
- **旧状態・棄却**：movement未確認扱いを棄却。写真1枚だけで精度・service conditionまで良好と断定する扱いも棄却。
- **影響範囲**：ARSA research LEDGER / MAPと購入前確認のみ。年代・ケース材・AFB系譜は未変更。
- **検証状態**：画像確認済み。LEDGER commit `d0ed4fee895a432463d04f4f02182746f94367a9`、MAP commit `78050f78926c04b63ad52ce6f38c8f8cfe721e48`。
- **関連**：2026-10-02 09:08 JSTのseller movement photo。
- **日時根拠**：ユーザー提示画像の端末表示 `09:08`。


### 2026-10-02 09:41 JST — ARSA regulator / balance-cock mismatch疑義を撤回
- **変更**：ユーザー提示のEmmyWatch AS1475参照画像と今回個体ムーブ写真の直接比較により、緩急針・テンプ受け周辺は視覚的に整合すると再判定し、Research MAPから active risk を除外した。
- **理由**：前回は参照画像との比較を十分に行わず、見た目の違いを過大評価していた。今回のside-by-sideではテンプ受け輪郭、緩急針配置、stud-holder形状、耐震部位置、Y字bridgeとの相対関係が一致している。
- **旧状態・棄却**：「regulator / balance-cock originality remains OPEN」「別時期variantまたはservice replacementの可能性をactiveに追う」という扱いを撤回。新しい反証が出ない限り再浮上させない。
- **影響範囲**：`research/ARSA_BLIND_ALARM_LEDGER.md`、`research/ARSA_BLIND_ALARM_RESEARCH_MAP.md`、購入前リスク整理。AS1475 / 17J確定、年代・ケース材・service history等の別未解決事項は変更しない。
- **検証状態**：side-by-side画像を再確認し、LEDGER commit `84c93b3c3387f389ef56f4d97ab00cf00356f2c2`、MAP commit `5a563da75e96dda69a1d58a1c69cb96e3b258a03` へ反映済み。
- **関連**：EmmyWatch AS1475 reference image、seller movement photo。
- **日時根拠**：GitHub commit `5a563da75e96dda69a1d58a1c69cb96e3b258a03` の `2026-10-02T00:41:35Z` → `2026-10-02 09:41 JST`。


### 2026-10-02 09:49 JST — ARSA targetにalarm click screw欠落疑義を追加
- **変更**：ユーザー提示のside-by-side画像で、upper alarm ratchet wheel横のalarm click部に参照個体では存在するslotted screwが今回個体では見えず、`57426 alarm click screw` 欠落疑義を最優先の個体確認項目へ追加した。
- **理由**：AS1475部品表で `7426 alarm click`、`7436 alarm click spring`、`57426 alarm click screw` が確認でき、画像上の位置関係が一致するため。これは外観差ではなく、alarm winding retentionに関わる機能部品の可能性が高い。
- **旧状態・棄却**：movement写真について「見える範囲で欠品懸念なし」と広く扱う整理を撤回。caliber identity = AS1475 / 17Jは維持するが、alarm click screw周辺はclose-upまたはseller確認が必要。
- **影響範囲**：`research/ARSA_BLIND_ALARM_LEDGER.md`、`research/ARSA_BLIND_ALARM_RESEARCH_MAP.md`、購入前リスク評価。Blind専用外装、年代、ケース材、AFB系譜は変更しない。
- **検証状態**：LEDGER commit `ec509cc9db31cf1abb810519375a94c6de3e5727`、MAP commit `c12d1ac9131e42fe952b14acf085618baf3925e0` へ反映。部品番号はAS1475 technical parts documentationで照合済み。
- **関連**：user-marked comparison image、AS1475 parts documentation。
- **日時根拠**：GitHub commit `c12d1ac9131e42fe952b14acf085618baf3925e0` の `2026-10-02T00:49:43Z` → `2026-10-02 09:49:43 JST`。


## 2026-10-02 — Council V3完全実装

### 2026-10-02 21:10 JST — 宮廷道化師V3の発端順序と「工程道化師」誤記を訂正
- **変更**：宮廷道化師V3の誕生経緯を会話実態へ再訂正した。起点はユーザー自身の独立した「90%問題」発見ではなく、知り合いのX投稿で「制作は90%付近から必要機能・仕様変更が見えて止まりやすい」という趣旨を見たこと。その投稿からユーザーが「自分の2ch民で焼いては、まさにそれを防ぐための機能だったのでは」と再認識し、既視感から宮廷道化師へ接続したことを正本へ固定した。また、AIが先に「工程道化師」を考案してユーザーが宮廷道化師へ言い換えたのではなく、ユーザーが既に宮廷道化師の導入を提案しており、AIが「こうていどうけし」を「工程道化師」と聞き違え／誤解釈し、ユーザーが再訂正した順序へ修正した。本プロジェクトでの「宮廷道化師」の読みは「こうていどうけし」と明記した。
- **理由**：直前の正本は「ユーザーが90%問題へ自力で気づいた」「AI側の工程道化師という造語をユーザーが宮廷道化師へ訂正した」と記録しており、V3の発見順序と誰が宮廷道化師へ到達したかを逆転させていたため。
- **旧状態・棄却**：「90%問題はユーザーの独立発見が起点」「AIが工程道化師を発明し、ユーザーが後から歴史上の宮廷道化師へ置換した」という経緯を棄却する。
- **影響範囲**：`council-worker/V3.md` と `research/COUNCIL_V3_COURT_JESTER_DESIGN.md` の誕生経緯・呼称読み、および本判断履歴のみ。Council V3の7形式、Fool's License、silent Jester hook、1〜6 renderer / 再裁定、実装コードは変更しない。
- **検証状態**：2026-10-02の会話履歴を再確認し、知り合いのX投稿→2ch機能の再認識→既視感→宮廷道化師への到達→導入提案→AIの「工程道化師」聞き違い→ユーザー再訂正、の順序を確認して正本へ反映。main更新後に対象2正本とdecision logを再取得して内容一致を確認する。
- **関連**：`council-worker/V3.md`、`research/COUNCIL_V3_COURT_JESTER_DESIGN.md`。直前の誕生経緯補正 `2026-10-02 18:09 JST` は本訂正で上書きされる。
- **日時根拠**：ユーザーの会話上の再訂正を受けた時刻 `2026-10-02 21:10 JST`。

### 2026-10-02 21:10 JST — Council通常実行をGitHub正本へ固定し、外部runtime監査を任意範囲へ戻す
- **変更**：Council V3の通常実行はGitHub `main` の `PROJECT.md` / `AGENTS.md` / `PROJECT_STATE.md` / `council-worker/V3.md` / `README.md` / `src/v3.ts` / `src/index.ts` を取得すればChatGPT内で完結できることを明文化した。MCP / Cloudflare Worker / 外部OpenAI APIは任意の外部実行surfaceとし、ユーザーがdeploy / live検証を明示した時だけ別タスクとして扱う。直前に追加したruntime secret復旧、one-shot live smoke、API credits / billing状態の現行正本への持ち込みはcurrent treeから除去し、V3本体・誕生経緯・behavior testは維持した。
- **理由**：ユーザーの目的はCouncil仕様と誕生経緯をGitHubへ永続化し、以後どのチャットでもGitHub正本を参照して同じCouncilを実行できることだった。外部Workerのcredential / billing状態まで通常Councilの完了条件として追うと、正本参照だけで実行可能な設計に不要な依存と短期状態を持ち込むため。
- **旧状態・棄却**：通常のCouncil利用確認をWorker health、secret、OpenAI API creditsの確認まで拡張する運用を棄却する。数時間単位で変わる外部runtime状態を `PROJECT_STATE.md` のCouncil基準として保持することも棄却する。外部MCP / Worker自体は削除せず、明示依頼時だけ検証対象とする。
- **影響範囲**：Councilの起動・参照ルールと正本文書のみ。Council V3実装、7形式、Fool's License、silent Jester hook、1〜6 renderer / 再裁定、誕生経緯、既存behavior testは変更しない。
- **検証状態**：cleanup前mainのpost-V3 commitsを確認し、`2268bef6a7`以降の変更対象が `CHANGE_DECISIONS.md`、one-shot live smoke test、README runtime説明、PROJECT_STATE runtime状態だけであることを確認。current treeはCouncil V3完全実装commit `cd8ac08e56f95db8af6ae823ce4034423e1dccba` を基準に戻し、上記GitHub-canonical scopeの文書差分だけ追加する。commit後にmainを再取得して確認する。
- **関連**：Council V3完全実装 `cd8ac08e56f95db8af6ae823ce4034423e1dccba`。掃除対象の後続commit: `2268bef6a7`, `a0ca1b594d`, `378cb41c5c`, `6191bfd495`, `3145d11438`, `e046290375`, `ddfd12b226`。
- **日時根拠**：作業時刻 `2026-10-02 21:10 JST`。

### 2026-10-02 18:40 JST — MCP本文・silent hook・再裁定・deploy gateを完成
- **変更**：V3からV2の本文rendererを再利用し、1〜6のMCP `content` にBoard・議論・裁定・Sourcesを復元した。silent Jester hookへCross Exam、adaptive hot-seat、匿名再評価を渡し、発火時は元裁定を保存してJester異論込みの議長再裁定を必須化した。1〜6本文、Cross Exam伝達、再裁定表示のbehavior testをCIへ追加し、README / V3正本 / PROJECT_STATE / 研究記録の現行状態を同期した。deploy workflowはCloudflare資格情報だけを必須とし、OpenAI / Vector Storeのrepository secretsが揃う場合だけWorker secretsを上書きし、未設定時は既存Worker secretsを保持する。
- **理由**：初期V3はstructuredContentにはV2結果を残す一方、MCP本文がFORMAT / STOPだけになり得た。hook判定もBoardと最終裁定しか見ず、Cross Examで既に攻撃済みの論点を判別できず、発火しても元裁定を更新しなかった。またdeploy workflowは実deployをskipしてもsuccess終了し、Worker側に既存secretがあってもrepository secretsを全件要求していた。
- **旧状態・棄却**：1〜6のMCP本文をヘッダだけにする状態、Cross Examを見ないhook、Jester乱入を追記するだけで再裁定しない状態、READMEをV2 / 6択のまま正本扱いする状態、実deployなしのsuccess、既存Worker secretを安全に再利用できない全repository-secret必須条件を棄却。
- **影響範囲**：`council-worker/src/index.ts`、`src/v3.ts`、behavior test、Council Worker check / deploy workflow、Council README / V3 / research正本、PROJECT_STATE。1〜6の意味・番号・V2内部プロトコル、7のFool's License、公開サイト本文は変更しない。
- **検証状態**：ローカルbehavior test、wrangler dry-run、decision-log gate、Git diff確認を実施後にVERIFIEDとする。main反映、Actions実deploy、Worker `/health` / `/api/menu` / `/mcp` live確認は別状態として追記する。
- **関連**：branch `fix/council-v3-complete-implementation`。関連commit / PR / deploy runは作成後に追記する。
- **日時根拠**：作業環境のJST時計 `2026-10-02 18:40:18 +09:00`。

### 2026-10-03 10:19 JST — Instagram時系列を同一WATCHの複数投稿へ対応
- **変更**: `instagram-insights-timeseries.md` の新規snapshotへ `content_id` / `content_type` を持たせられるようにし、`instagram:report` の前回差を「同じWATCHの直前snapshot」ではなく「同じ `content_id` の直前snapshot」と比較するよう変更。2026-10-03のWittnauer 10WA静止画カルーセルを第2投稿として記録する。
- **理由**: 6個体初回一巡後に同じWittnauerを再投稿したため、旧仕様のままでは初回Reel 3,445 viewsと新規カルーセル10 viewsを連続snapshotとして比較し、巨大な負のdeltaを生成してしまう。投稿単位を分離しないと2周目以降の検証が壊れる。
- **旧状態・棄却**: WATCH名だけを時系列キーにする旧集計は、同一WATCH複数投稿の比較には不採用。既存初回投稿snapshotは変更せず、`content_id` 未設定を `legacy-first-post` として互換維持する。
- **影響範囲**: `scripts/instagram-insights-timeseries.mjs`、`measurement/.internal/.virtual/social/instagram-insights-timeseries.md`、`instagram-published-copy.md`、`instagram-operations.md`。Instagram→HOW THEY RINGのCANONICAL FUNNELや既存6投稿の数値・本文は変更しない。
- **検証状態**: PR #146 の `Astro foundation check` run 37086066419 がSUCCESS。`npm run check:quality` 内の `check:instagram-insights` を含むquality gate、build、publication-aware output、mobile layoutまでPASS。`instagram:report` は既存CIに含まれないため、このPRでは自動実行対象外。
- **関連**: 2026-10-03 10:18 JST ユーザー提供Wittnauer 10WA static carousel投稿画面 / Post Insights。
- **日時根拠**: スクリーンショット表示時刻10:18 JSTと、当セッション時刻2026-10-03 10:19 JST。

### 2026-10-03 16:46 JST — VA研究資産→SNS投稿候補の横断Content Inventoryを正本化
- **変更**: `measurement/.internal/.virtual/social/content-inventory.md` を新設し、公開6個体について、既出 / 部分既出 / Instagram公開本文では未使用の候補 / 要追加撮影 / 要資料素材 / 検証状態 / URL誘導 / OWNER'S NOTE whole-onlyを時計別に索引化した。`PROJECT.md`、`AGENTS.md`、`PROJECT_STATE.md`、Social `ROUTER.md`、`instagram-published-copy.md` から必須参照として接続し、`scripts/check-social-content-inventory.mjs` と `npm run check:social-inventory` をquality gateへ追加する。
- **理由**: 研究LEDGER・WATCH・Published Copy・Insights・Operations・Experiment Logには資産と証拠が保存されている一方、引き継ぎ後に「未使用角度」「既出除外」「追加撮影」を毎回複数正本から掘り直す必要があった。ユーザー明示指示により、保存済み資産をSNSへ再利用するための軽量な商品棚を恒久化する。
- **旧状態・棄却**: 会話記憶またはその都度の横断検索だけで投稿候補を再構成する運用を棄却する。inventoryを新たな事実正本・数値正本・投稿本文正本にする設計も棄却し、各WATCH / research / published-copy / insightsへ必ず戻る索引に限定する。
- **OWNER'S NOTE**: OWNER'S NOTEは1個体1完成物として `WHOLE_ONLY`。leadや本文の一文を別々のSNS資産へ分割して同じhero画像で擦る運用は棄却。
- **確度ルール**: `CANDIDATE_NOT_IN_IG_TEXT` はInstagram公開本文に見つからないことだけを示し、動画内視覚使用まで未使用と断定しない。`NO_EXPLICIT_USE_FOUND_2026-10-03` も現行social canon監査で明示使用が見つからないという限定状態で、絶対未使用とは扱わない。
- **影響範囲**: SNS投稿案、Council / 焼きのSNS案、引き継ぎ、既出判定、追加撮影計画。公開WATCH本文、OWNER'S NOTE原文、Instagram Insights数値、CANONICAL FUNNELは変更しない。
- **検証状態**: PR #150 の `Astro foundation check` run `37108055324` がSUCCESS。`npm run check:quality` 内で新規 `check:social-inventory` を含む全quality gateがPASSし、build / publication-aware output / mobile layoutもPASS。diffは9ファイル（新規inventory・checkerを含む）を確認済み。main反映後にinventory・Router・PROJECT系を再取得して最終確認する。
- **関連**: 2026-10-03ユーザー指示「保存されたVA資産 → SNS投稿ネタ候補の専用棚卸し層を徹底」「引き継いだ後に地獄を見たくない」。
- **日時根拠**: 当セッションのユーザーローカル時刻 `2026-10-03 16:46 JST`（UTC+09:00）。

### 2026-10-03 17:08 JST — 旧引継ぎ資産をContent Inventoryへ逆引き監査
- **変更**: Project / Library `VINTAGE_ALARM_完全引継ぎ_2026-09-09(1).md` をPierce / CYMA / Basis / SNS観点で再検索し、現行WATCH・既存inventoryとの対応を監査した。独立して落ちていたCYMAの「アラームとクロノメーターという矛盾」を `CYM-08` として追加し、旧引継ぎ監査済み範囲をinventory内へ記録した。
- **理由**: 新しいinventoryだけを正しく作っても、過去チャット／旧引継ぎにしか残っていない独立ネタが未回収なら、次チャットが再び古い資料を掘ることになる。ユーザーの「引き継いだ後に地獄を見たくない」という要求に対し、既知の旧資産を逆引きして初期棚へ吸収する必要がある。
- **旧状態・棄却**: 「今後だけinventoryへ記録すれば十分」とする運用を棄却。逆に、旧OWNER'S NOTEのcatch / lead / `セミの鳴き声`等を細切れ投稿へ増殖させる案も、OWNER'S NOTE whole-only方針に反するため棄却した。
- **影響範囲**: `measurement/.internal/.virtual/social/content-inventory.md` のCYMA研究候補とlegacy audit記録のみ。WATCH本文、OWNER'S NOTE原文、SNS実投稿本文、Insights数値は変更しない。
- **検証状態**: PR上で `npm run check:social-inventory` を含むquality gateと既存CIを再実行し、PASS後にmainへ反映する。
- **関連**: Project / Library `VINTAGE_ALARM_完全引継ぎ_2026-09-09(1).md`、現行 `src/content/watches/cyma-time-o-vox.md` Deep Dive 02、2026-10-03ユーザー指示。
- **日時根拠**: 当セッションのユーザーローカル時刻 `2026-10-03 17:08 JST`（UTC+09:00）。

### 2026-10-03 20:25 JST — SNS再利用を1要素1本のmicro-Reel運用へ細分化
- **変更**: 既存VA資産のSNS再利用で、`content-inventory.md` の独立要素を原則 `1 Reel = 1要素` の短編動画へ分解する運用をACTIVE化。画面文字は最小限、短尺、1操作・1機構・1ディテール単位とする。静止画カルーセルは補助扱いに戻す。投稿頻度そのものはこの変更では固定しない。
- **理由**: 2026-10-03のWittnauer 10WA静止画カルーセルが約12h54m時点で22 views / 12 viewers / non-followers 0%に留まり、既存Reels群と配布状態が大きく異なった。ユーザーから、VA資産をさらに細かく動画化し、少ない文字で短編を多数作る方針が明示されたため。
- **旧状態・棄却**: 細かい研究ネタを静止画カルーセル中心で試す運用を主力候補から外す。ただし単一投稿だけで「静止画は常に不利」「動画なら必ず伸びる」と断定する判断は棄却し、micro-Reelを次の比較手段として扱う。
- **影響範囲**: Social `ROUTER.md` のACTIVE判断、`instagram-operations.md` の運用判断。`content-inventory.md` の既出 / 未使用判定、OWNER'S NOTE `WHOLE_ONLY`、公開WATCH本文、CANONICAL FUNNEL、既存投稿頻度の固定値は変更しない。
- **検証状態**: PR #153 の `Astro foundation check` run `37120376779` がSUCCESS。build / quality gates / OWNER'S NOTES directory / publication-aware output / mobile layoutまでPASS。実際の成果は次回以降のmicro-Reel Insightsで別途観測する。
- **関連**: 2026-10-03 Wittnauer 10WA static carousel `content_id=wittnauer-10wa-static-2026-10-03`、Social Content Inventory。
- **日時根拠**: 当セッションのユーザーローカル時刻 2026-10-03 20:25 JST（UTC+09:00）。

### 2026-10-03 21:33 JST — Social Content InventoryをASSET→CONTENT→MEDIA予約制へ拡張
- **変更**: `content-inventory.md` の6個体資産をWATCH正本へ戻って再棚卸しし、既存assetを動画化可能な粒度へ分解・補完した。各assetへ `Overlap / collision`、`Micro fit`、`Micro treatment` を追加し、別途Content Assignment Registryで `ASSET ID → CONTENT ID → MEDIA KEY` を管理する。final案は `PLANNED` で予約し、`SHOT → EDITED → SCHEDULED → PUBLISHED` と進める。`scripts/check-social-content-inventory.mjs` はasset / content ID重複、overlap参照、Instagram USED baseline、active asset二重予約、active media key二重予約を検査する。
- **理由**: asset IDと `USED / PARTIAL / CANDIDATE` だけでは「同じ未使用候補を別チャットで再度採用」「同じ映像素材を文言だけ変えて別企画へ割当」「PIE-04とPIE-07のような近接資産を独立新品として扱う」事故を止められなかった。ユーザーの要求は単なるネタ一覧ではなく、全資産棚卸し後に動画へ当て込み、引き継ぎ後も重複を機械的に管理できること。
- **旧状態・棄却**: inventoryから候補を数件抜き、即座に「次はWES-02」等のstoryboardへ進む順序を棄却。`Micro treatment` を採用済み予約とみなす運用も棄却し、採用はAssignment Registryの `PLANNED` のみとする。先に提示したWES-02案は候補へ戻し、active予約は0から開始する。
- **影響範囲**: `PROJECT.md`、`AGENTS.md`、`PROJECT_STATE.md`、Social `ROUTER.md`、`content-inventory.md`、`instagram-operations.md`、`scripts/check-social-content-inventory.mjs`。公開WATCH本文、OWNER'S NOTE原文、CANONICAL FUNNEL、既存Instagram本文・Insights数値は変更しない。
- **検証状態**: PR #154 の `Astro foundation check` run `37124672266` がSUCCESS。`check:social-inventory` を含むquality gate、build、publication-aware output、mobile layoutまでPASS。main反映後にinventory / Router / checker / decision logを再取得して最終確認する。
- **関連**: 2026-10-03ユーザー指示「各資産の棚卸とそれの動画への当て込み」「重複はどうやって管理するの？」「そうだねそれをしてくれるかな？」。関連commit: `292b19f5` / `07b86fbf` / `814ebcd6` / `d0d1cf46` / `158b32d6` / `4214388c` / `c905c335` / `6e26e95d` / `d7ac2119`。
- **日時根拠**: 当セッションのユーザーローカル時刻 `2026-10-03 21:33 JST`（UTC+09:00）。

### 2026-10-03 22:47 JST — AI単独のSocial asset原子分解を撤回し、共同確定制へ修正
- **変更**: PR #154でAI単独追加した19 assetと、全assetへの Overlap / collision・Micro fit・Micro treatment の確定扱いを撤回し、PR #154前の56 asset索引を共同棚卸しの開始点へ戻す。6個体すべてを PENDING_USER_REVIEW とし、対象時計ごとにユーザーが KEEP / MERGE / SPLIT / DROP を確認した後だけasset境界を正本化する。ASSET → CONTENT → MEDIAのduplicate lockは残すが、新規active contentは Approval=USER_CONFIRMED を必須にする。
- **理由**: ユーザーの目的は「AIだけで細かく分解した完成棚」ではなく、保存済みVA資産を人間とAIで棚卸しし、その合意済みassetを短編動画へ当て込む運用。AI単独分解では粒度・撮影可能性・同じ素材を別ネタとして扱う境界がユーザー意図とずれ、引き継ぎ時に誤った確定事項として残る。
- **旧状態・棄却**: 2026-10-03 21:33の「AIが6個体を75 assetへ原子分解し、micro treatmentまで正本化した状態」を棄却。PR #154のduplicate-lock発想自体は棄却せず、ユーザー確認後の予約管理へ限定して残す。
- **影響範囲**: PROJECT.md、AGENTS.md、PROJECT_STATE.md、Social ROUTER.md、content-inventory.md、instagram-operations.md、scripts/check-social-content-inventory.mjs。公開WATCH本文、OWNER'S NOTE原文、既存Instagram本文・Insights数値は変更しない。
- **検証状態**: PR #155 の `Astro foundation check` run `37128016929` がSUCCESS。`check:social-inventory` を含むquality gate、build、publication-aware output、mobile layoutまでPASS。main反映後にinventory / Router / checker / decision logを再取得して確認する。
- **関連**: PR #154 / main commit 153d46e1。corrective commits: 1b14677b / 60425726 / 91b5d98a / 6da8fdf8 / a01c8e3e / 1de34087 / f08354f6。2026-10-03 22:47 JST ユーザー訂正「お前だけで分解したら意味ねーじゃん？」。
- **日時根拠**: 当セッションのユーザーローカル時刻 2026-10-03 22:47 JST（UTC+09:00）。

### 2026-10-04 07:33 JST — AI候補分類を許可し、提示前の正本化だけを禁止
- **変更**: Social Content Inventoryに `Candidate Review Queue` を追加し、AIがSource-backed候補を `AI_PROPOSED` として先行分類できるよう明示する。候補には一時Proposal ID、category、existing asset relation、SNS既出候補、media、verify、video-fit、sourceを持たせる。分類済み候補は必ずユーザーへ提示し、KEEP / MERGE / SPLIT / DROP の相談後だけ正本assetへ反映する。
- **理由**: 2026-10-03 22:47の修正は「AI単独で正本化しない」という再発防止自体は正しかったが、AIによる候補分類まで止める方向へ寄りすぎた。ユーザーが求めるのは、AIが先に整理した候補を見ながら共同で境界を決める運用。
- **旧状態・棄却**: 「AIは候補境界を作らず、ユーザーと一緒にゼロから分解する」運用を棄却。反対に「AI_PROPOSEDをユーザーへ見せず正本assetへ昇格する」運用も引き続き禁止。
- **影響範囲**: PROJECT.md、AGENTS.md、PROJECT_STATE.md、Social ROUTER.md、content-inventory.md、instagram-operations.md、scripts/check-social-content-inventory.mjs。既存56 asset、OWNER'S NOTE whole-only、既存Published Copy / Insights数値は変更しない。
- **検証状態**: PR #156 の `Astro foundation check` run `37159180757` がSUCCESS。`check:social-inventory` を含むquality gate、build、publication-aware output、mobile layoutまでPASS。main反映後に再取得確認する。
- **関連**: 2026-10-04 07:33 JST ユーザー訂正「候補までは分類したまま出して俺と相談して決めるべきでは？提示せずにやったのが間違い」。関連commit: `b1b6f4c6` / `6f661980` / `decb1865` / `80735994` / `c7e8f7ed` / `743b0890` / `c67c2341` / `a22142c8` / `ca15c351`。
- **日時根拠**: 当セッションのユーザーローカル時刻 2026-10-04 07:33 JST（UTC+09:00）。

### 2026-10-05 07:23 JST — Pages CMS mainにWATCH動画アップロード領域を追加
- **変更**：Pages CMSの `.pages.yml` に `WATCH動画` media library を追加し、mainブランチのCMSからMP4を `public/videos` へアップロードできるようにする。
- **理由**：2026-10-05 07:23 JSTのユーザー提供スクリーンショットで、Pages CMSが `main` を選択中で、Media欄には `images` と `アラーム音源` しか表示されていないことを確認した。Pierce Duofon機構動画のアップロードだけのために作業branchを選ばせるより、既存CMSのmain側に常設の動画アップロード領域を置く方が既存運用と一致する。
- **旧状態・棄却**：動画アップロード時に `feature/pierce-duofon-switch-video` へ切り替えさせる運用を棄却する。通常の動画素材アップロードはmainのCMSから行い、掲載コードの変更は別PRで管理する。
- **影響範囲**：Pages CMSのMedia欄のみ。公開サイト本文、WATCH表示、動画の掲載位置、既存画像・音源管理は変更しない。
- **検証状態**：branch `fix/cms-watch-video-upload` に実装。PR / CI / main反映後、Pages CMSのmainで `WATCH動画` が表示されることを確認するまでVERIFIEDとはしない。
- **関連**：実装commit `b3397364a8f4e825105fba1ad08c7952800950de`、2026-10-05ユーザー提供Pages CMSスクリーンショット。
- **日時根拠**：ユーザー提供スクリーンショットの端末表示 `7:23` と当セッション日付 `2026-10-05` から、`2026-10-05 07:23 JST` とした。

### 2026-10-05 07:37 JST — Pages CMSのWATCH動画でiPhone動画を直接アップロード可能にする
- **変更**：Pages CMSの `WATCH動画` media libraryで、従来のMP4に加えてiPhoneで一般的なMOVとM4Vを受け付けるよう `extensions: [mp4, mov, m4v]` へ拡張する。
- **理由**：ユーザーがiPhoneから撮影動画をそのままPages CMSへアップロードしたいと明示した。現行mainは `WATCH動画` がMP4限定のため、iPhoneの写真ライブラリからMOVとして渡される動画を直接選択できない。
- **旧状態・棄却**：iPhone側で事前にMP4へ変換してからアップロードさせる運用を棄却する。通常の素材投入はCMS側でMOV / M4V / MP4を受け付ける。
- **影響範囲**：`.pages.yml` の `WATCH動画` 受け入れ拡張子のみ。公開WATCH本文、既存動画表示、画像・音源管理には変更を加えない。
- **検証状態**：branch `fix/cms-iphone-video-upload` へ実装済み。CI通過・main反映後にPages CMSのmainでiPhone動画を選択できることを確認するまでVERIFIEDとはしない。なおMOV内部の映像codecが各ブラウザで再生できるかは別問題であり、アップロード可否とは分離する。
- **関連**：実装commit `1295fdbe5a7e8a8853940bcba36c43ccad7845c0`、2026-10-05ユーザー指示「Iphoneどうがであげれるようにしなさいよ」。
- **日時根拠**：ChatGPT time取得値 `2026-10-05T07:37:29+09:00` → `2026-10-05 07:37 JST`。

### 2026-10-05 08:18 JST — Pierce Duofon動画を用途別の恒久ファイル名へ整理
- **変更**：iPhoneから直接アップロードされた `public/videos/IMG_2760.mov` と `public/videos/IMG_2767.mov` を、Pierce Duofon専用ディレクトリへ用途ベースの恒久名で整理する。対応は `public/videos/pierce-duofon/wecker-signal-switch.mov` = WECKER / SIGNAL鳴らし分け、`public/videos/pierce-duofon/time-alarm-winding.mov` = 3時位置リューズによる時計側 / アラーム側の動力巻き上げ切替。
- **理由**：カメラ連番 `IMG_2760` / `IMG_2767` は内容を示さず、今後動画資産が増えた際にCMS・GitHub・WATCH実装から用途を判別できない。ブランド / モデル配下に機能名で整理し、将来の参照・再利用・差し替えを容易にする。
- **旧状態・棄却**：iPhoneの元ファイル名を恒久的な公開資産名として残す運用を棄却する。元のblob内容は変更せず、Git上のパスだけを整理する。
- **影響範囲**：`public/videos` 内のPierce Duofon動画2本のパスのみ。動画内容、公開WATCH本文、既存画像、音源、CMS設定は変更しない。
- **検証状態**：branch `chore/video-filenames` で新パスへ同一blobを配置し、旧 `IMG_2760.mov` / `IMG_2767.mov` を削除済み。PR / CI / main反映後にmain treeで旧名消失・新名2本の存在を再確認するまでVERIFIEDとはしない。
- **関連**：ユーザー指定「2760→Duofon鳴らしわけ」「2767→リューズによる動力巻き上げの変更」、rename commits `bdc3470169b75b8c0ad6490fb3dd6c802950624c` / `adc9385117578a3d184d9447da7f5ba135264da0` / `d4885cc6e691ecf7448b09968dcf4984e678b37f`。
- **日時根拠**：当セッションのユーザーローカル時刻 `2026-10-05 08:18 JST`（UTC+09:00）。

### 2026-10-05 08:30 JST — Pierce DuofonのWECKER / SIGNAL実機動画をDEEP DIVEへ埋め込む
- **変更**：Pierce DuofonのDEEP DIVE 02「Pierce Cal.135」で、既存の機構静止画①〜⑤の直後・1955年Pierce資料による用途説明の直前に、小見出し「動画で見る」とセルフホスト動画を追加する。動画は `/videos/pierce-duofon/wecker-signal-switch.mov` を使用し、`controls` / `playsinline` / `preload="metadata"`、自動再生なしとする。JA / EN / DEで同じ位置と意味を同期し、Pages CMSのDEEP DIVE編集欄からも動画ファイルを指定できるようにする。
- **理由**：ユーザーが掲載個体のWECKER / SIGNAL切り替え時の実働を撮影し、既存の静止画①〜⑤の直後へ「動画で見る」として掲載する位置を明示した。静止画は機構の位置関係を分解して示し、動画は同じ機構の連続動作を実機で確認する役割として併用する。
- **旧状態・棄却**：PR #166の旧実装は、存在しないMP4パス `/videos/pierce-duofon/pierce-duofon-wecker-signal-switch.mp4` と古いmainを前提にしているため、そのままmergeする運用を棄却し、最新mainへ必要差分だけを救出する。別素材 `/videos/pierce-duofon/time-alarm-winding.mov` は3時位置リューズによる時計側 / アラーム側の巻き上げ切替用として保持し、今回の「動画で見る」には使用しない。
- **影響範囲**：`src/content/watches/pierce-duofon.md`、`src/components/DeepDive.astro`、`src/content.config.ts`、`.pages.yml`、Pierce DuofonのEN / DEローカライズ。既存静止画①〜⑤、資料本文、OWNER'S NOTE、WATCH上段のYouTube / X、他WATCHの表示は変更しない。
- **検証状態**：branch `feat/duofon-deep-video` に実装済み。CI / build / mobile layout / main merge / liveの動画要素・asset URL確認が完了するまでVERIFIED / DEPLOYEDとはしない。MOV内部codecの全ブラウザ互換性は現時点では未確認。
- **関連**：PR #166（superseded）、PR #171（動画ファイル名整理）、PR #172。実装commit `142bb4e5241d3c442255e6348c26b94a042aae33` / `52d8f5e8c084bb1539a65a053139cf6bb382f438` / `45f3fd46c6307df9c5fee0d39ddd75257296a620` / `48e1d770a84f31d865c3b380b42e8fd5b40a7ffb` / `4eb1209c895d8028aacd6dc33b32b1e4f6de4b0e` / `633ceebfe57596b87d0e99b3345ff9d7af0d3343`。main asset `public/videos/pierce-duofon/wecker-signal-switch.mov`、2026-10-05ユーザー指示「じゃああとはサイトに　動画で見るを埋め込むのは任せて平気だな？」。
- **日時根拠**：ChatGPT time取得値 `2026-10-05T08:30:16+09:00` → `2026-10-05 08:30 JST`。

### 2026-10-05 09:27 JST — Pierce Duofon動画2本の内容対応を訂正して入れ替え
- **変更**：Pierce Duofon動画2本の**ファイル名は意味を表す恒久名のまま維持し、中身のGit blobを交換**する。`public/videos/pierce-duofon/wecker-signal-switch.mov` にはWECKER / SIGNAL鳴らし分け動画を、`public/videos/pierce-duofon/time-alarm-winding.mov` には3時位置リューズによる時計側 / アラーム側の巻き上げ切替動画を対応させる。
- **理由**：公開後、ユーザーが「動画逆のが登録されてる」と実機内容を確認して訂正した。前回の `IMG_2760` / `IMG_2767` の対応説明自体をユーザーが取り違えて伝えた可能性も示されたため、元番号ではなく**動画内容と恒久ファイル名の意味**を一致させることを正本とする。
- **旧状態・棄却**：2026-10-05 08:18 JSTの `IMG_2760 → wecker-signal-switch` / `IMG_2767 → time-alarm-winding` という対応付けを撤回する。履歴は削除せず、この訂正記録で上書きする。
- **影響範囲**：`public/videos/pierce-duofon/wecker-signal-switch.mov` と `public/videos/pierce-duofon/time-alarm-winding.mov` の内容対応のみ。Pierce WATCH本文、DEEP DIVE配置、JA / EN / DEの参照パス、CMS設定、既存静止画は変更しない。
- **検証状態**：branch `fix/duofon-video-swap` でblob交換を実装済み。PR / CI / main merge / deploy / liveで `動画で見る` が正しいWECKER / SIGNAL動画を指すことを確認するまでVERIFIED / DEPLOYEDとはしない。
- **関連**：ユーザー訂正「動画逆のが登録されてる　なんなら名前も俺が伝え損ねてるかも交換して」、実装commit `fadf387e43d3ccd23d9e8ec83f3d905a5aec8d36`。訂正前の判断は2026-10-05 08:18 JST / 08:30 JSTのdecision entry。
- **日時根拠**：ChatGPT time取得値 `2026-10-05T09:27:13+09:00` → `2026-10-05 09:27 JST`。


### 2026-10-05 09:48 JST — Manager Control Plane pilotを導入し、multi-agent化前にTask Envelope＋独立Verifierを固定
- **変更**：別Managerエージェントを常駐させる前に、`.codex/MANAGER_CONTROL_PLANE.md` と `.codex/TASK_ENVELOPE_TEMPLATE.md` を追加する。非自明な作業では CURRENT STATE / CANONICAL SOURCES / SCOPE / MUST / DO NOT / REJECTED-HOLD / SUCCESS CRITERIA / VERIFY PLAN を先に固定し、RECEIVED → SCOPED → READY → EXECUTING → VERIFYING → PASS / FAIL → REPORTで状態管理する。VerifierはBuilderの自己申告ではなく、正本・diff・test / build / gate・render / live・実画像 / 動画 / 音声等の対象実体から再判定する。AGENTS / PROJECT_STATEから正本へルーティングし、既存 `check:project-consistency` でcontrol-plane文書、必須field、状態、介入metric、`multi_agent = false` を機械検査する。
- **理由**：過去監査では正本未確認、旧仕様復活、実装と検証の混同、Router無視等が反復し、直近でもExecution Briefの欠落やDuofon動画内容の逆登録をユーザーが発見している。一方、既存のProject Router / open PR / decision log / CIは既に存在するため、AI人数を先に増やすより、ユーザーが手動で担っているscope固定・正本誘導・完了監督をcontrol planeへ移す方を先に試す。
- **旧状態・棄却**：`multi_agent = true` を先に有効化し、Manager / Researcher / Builder / Verifierを常時起動する案はHOLD。新DB、新queue、常駐agent registryも追加しない。小タスクを理由なく分解する運用も採用しない。
- **影響範囲**：`.codex/MANAGER_CONTROL_PLANE.md`、`.codex/TASK_ENVELOPE_TEMPLATE.md`、`AGENTS.md`、`PROJECT_STATE.md`、`scripts/check-project-consistency.mjs`。公開WATCH本文、UI、SNS実測値、Council形式、`.codex/config.toml` の値は変更しない。
- **検証状態**：branch `ops/manager-control-plane-pilot-20261005` へ実装。GitHub Actionsで `check:project-consistency` を含む既存gateが通るまでVERIFIEDとはしない。pilotの成果は今後の実案件で USER_REINSTRUCTION_COUNT / CANONICAL_SOURCE_REDIRECT_COUNT / VERIFY_PROMPT_COUNT / POST_COMPLETION_DEFECT_COUNT を観測してOBSERVED判定する。
- **関連**：2026-10-05の過去案件監査、Council 1 + 7裁定「Manager Control Plane＝GO / 独立Verifier＝GO / multi-agent有効化＝HOLD」、PR #173 Execution Brief、PR #174 Duofon動画内容訂正。実装commits `b11180d5` / `e41c4762` / `c42bbfd6` / `5580de7f` / `b6e835f7`。
- **日時根拠**：developer-provided local time `2026-10-05T09:48+09:00` = `2026-10-05 09:48 JST`。

### 2026-10-05 10:54 JST — Fail-Closed Inference GuardをManager Control Planeへ追加
- **変更**：推論方向、既存判断の変更、現物確認、一般論の扱い、出力前矛盾確認をfail-closedで管理する正本と回帰テストを追加し、PROJECT / AGENTS / PROJECT_STATE / Social Router / Task Envelope / quality gateへ接続した。
- **理由**：正本確認後でも、確認済み情報を別方向へ拡張したり一般論で上書きしたりする再発があったため。
- **旧状態・棄却**：注意喚起だけで防ぐ運用を棄却し、必要根拠が無い場合はHOLD / FAILとする。
- **影響範囲**：PROJECT、AGENTS、PROJECT_STATE、Manager Control Plane、Task Envelope、Social Router、inference guard正本・fixtures・checker、package scripts。公開WATCH本文・UI・SNS実測値・multi-agent設定は変更しない。
- **検証状態**：branch `ops/fail-closed-inference-guards-20261005` に実装。CI通過までVERIFIEDとはしない。
- **関連**：PR #175 / active PR #173。commits `c4ae40d4` / `623fcb1d` / `cbaed804` / `4a9fa87c` / `d2b7322e` / `076d7278` / `04fcef58` / `00b52b1b` / `d38abf3a` / `22a56ac5` / `bc9031c7` / `0f4dfb71` / `85c2ca24` / `0864542f` / `03bc9764`。
- **日時根拠**：developer-provided local time `2026-10-05T10:54+09:00` = `2026-10-05 10:54 JST`。

### 2026-10-05 16:20 JST — Pierce Duofonに2香箱巻き分け機構のDEEP DIVEを日英独で追加
- **変更**：Pierce DuofonのDEEP DIVEに新しい03「1本のリューズで、2つの香箱を巻き分ける」を追加する。3時位置リューズの回転が、揺動するウィップ上の切替用クラウンホイールへ伝わり、回転方向に応じてウィップが移動して、時計側／アラーム側の各ラチェットホイールへ噛み合い先を切り替える構造を説明する。1955年Pierce技術資料にある、切替用クラウンホイールをばね摩擦でウィップ軸に保持して噛み合い深さを保ち、歯同士の正面衝突を防ぐ説明も同章へ置く。既存 `/videos/pierce-duofon/time-alarm-winding.mov` を同章の「動画で見る」に配置し、旧03 / 04は04 / 05へ繰り下げる。JA / EN / DEを同一構造で同期する。
- **理由**：既存ページは簡易操作ガイドで3時位置リューズによる時計側／アラーム側の巻き分けを示していたが、DEEP DIVEでは「どの部品がどう連動して巻き上げ先を切り替えるか」を説明していなかった。ユーザーが実機の巻き上げ切替動画を撮影済みで、機構説明と実動画を対応させられるため。
- **旧状態・棄却**：単に「可動する巻き上げ機構が移動して巻き上げ先が変わる」とだけ書く説明を棄却する。クラウンホイール／ウィップ／時計側・アラーム側ラチェットホイールの連動を明記する。画像を未登録のまま仮画像・仮パスで公開する案も棄却する。
- **影響範囲**：Pierce DuofonのJA / EN / DEのDEEP DIVEのみ。既存DEEP DIVE 02、OWNER'S NOTE、既存機構画像①〜⑤、WATCH上段YouTube / X、他WATCHは変更しない。ユーザー撮影写真は後日追加するため今回の公開変更には含めない。
- **翻訳監査**：日本語正本→EN / DEの順で文単位監査。ENは `changeover crown wheel / rocking lever / ratchet wheel / barrel`、DEは一次資料語 `Wechsel-Kronrad / Wippe / Sperrad / Federhaus` を使用。逆翻訳で両言語とも①3時リューズから切替クラウンホイールへ伝達、②回転方向でウィップが左右移動、③時計側／アラーム側の噛み合い先切替、④1本のリューズで2香箱を別々に巻く、⑤ばね摩擦・噛み合い深さ・歯の正面衝突防止、の5点に増減・断定度変更なしを確認した。英独とも日本語にない説明は追加していない。
- **画像HOLD**：ユーザー確認「画像上に接続＝時計側の香箱、下に接続＝アラーム側の巻き上げ」を、後日ユーザーが機構写真を登録した際のキャプション正本としてHOLDする。現時点では該当画像assetがmainに存在しないため、可視本文から未掲載画像を参照しない。
- **検証状態**：branch `feat/duofon-winding-deep-dive` にJA / EN / DE本文と動画参照を実装。localization sync / coverage / purity、citation、Japanese style、build、mobile layout、PR CI、main merge、deploy、live publicationを通すまでVERIFIED / DEPLOYEDとはしない。
- **関連**：ユーザー指示「実装しよう」「動画は君が入れられる」「画像はこっちでやる」、既存動画 `public/videos/pierce-duofon/time-alarm-winding.mov`、Pierce source #1（1955年技術資料）。実装commit `f1ca6a5e02fd81a8649421d9895c8bfb245d1abd` / `f096c859c08e21584d326caabf6b9e2426a4e148` / `6967f5c2205f8a5b1ffc4bf527fab29627fe0232`、監査記録commit `9b5927fc85b18a1eaaac8d90179383132db56eef`。
- **日時根拠**：ChatGPT time取得値 `2026-10-05T16:20:13+09:00` → `2026-10-05 16:20 JST`。

### 2026-10-05 16:51 JST — Pages CMSでPierce機構画像のクエリ付きパスを保存阻害しない形へ修正
- **変更**：Pierce Duofonの機構画像参照 `/images/pierce-duofon/mechanism/01-signal-hammer.webp?v=2` を、JA / EN / DEすべてで `/images/pierce-duofon/mechanism/01-signal-hammer.webp` へ変更する。
- **理由**：Pages CMSのimage fieldがクエリ文字列込みの値を `.webp?v=2` という拡張子として判定し、許可拡張子外としてフォーム全体の保存を拒否していることを、ユーザー提示スクリーンショットの `Invalid file extension '.webp?v=2'` と現行mainの実データで確認した。
- **旧状態・棄却**：CMS管理対象の画像パスにキャッシュバスター `?v=2` を残す運用を棄却する。画像本体・キャプション・altは変更しない。
- **影響範囲**：Pierce DuofonのJA / EN / DEにあるSIGNAL機構画像の参照文字列のみ。公開本文、画像本体、DEEP DIVE構造、他WATCH、Pages CMS schemaは変更しない。
- **検証状態**：branch `fix/pagescms-pierce-image-query-current` で3言語の参照を修正済み。PR CI / main merge / deploy後、mainと生成物でクエリ付き参照が消失していることを確認するまでVERIFIED / DEPLOYEDとはしない。
- **関連**：ユーザー提示Pages CMSスクリーンショット。実装commit `6fe48960582f98f0fd4eec1f20b86821683903d1` / `4f07536f561a7a777c4d3f12d025cf7c175d3ec4` / `22da5b507f40b78fb2aa2af06326e9627dfd0683` / `6f5c4c7e3a414803a10450994b852c4cf1e57cef`。同時刻付近にPages CMSから `public/images/IMG_2763.jpeg` のアップロード自体はmainへ作成済み。
- **日時根拠**：ChatGPT time取得値 `2026-10-05T16:51:07+09:00` → `2026-10-05 16:51 JST`。

### 2026-10-05 17:26 JST — Pierce Cal.135巻き上げ説明を画像連動の三段落へ改稿し日英独同期
- **変更**：Pierce Duofon DEEP DIVE 03の巻き上げ説明を、ユーザー指定の日本語3段落へ差し替える。旧稿の「揺動するウィップ上の切替用クラウンホイール」から始まる説明と、ばね摩擦・噛み合い深さ・歯の正面衝突防止を別段落で説明する構成は可視本文から外す。新稿は①3時位置リューズは回す方向で巻き上げる香箱が変わる、②切替用クラウンホイールを載せた揺動レバーが動いて噛み合うラチェット車を切り替え、画像上では上側＝時計側／下側＝アラーム側、③1本のリューズを正逆に回して2香箱を別々に巻く、の順で説明する。JA / EN / DEを同じ3段落構造・同じ出典番号で同期する。
- **画像・動画順**：ユーザーがPages CMSで追加済みの `/images/IMG_2762-1.jpeg` と `/images/IMG_2763-1.jpeg` をEN / DEにも同期し、各キャプションを翻訳する。3言語すべてで画像2点と `/videos/pierce-duofon/time-alarm-winding.mov` を第3段落後へ置き、現行 `DeepDive.astro` の描画順 `images → video` を利用して、**写真2点が動画より上に表示される**状態とする。
- **翻訳監査**：JAを意味正本として文単位で照合。ENは `direction of rotation / rocking lever / changeover crown wheel / ratchet wheel / timekeeping barrel / alarm barrel`、DEは `Drehrichtung / schwenkbarer Hebel / Wechsel-Kronrad / Sperrad / Gehwerk-Federhaus / Wecker-Federhaus` を使用する。両言語とも①回転方向で対象香箱が変わる、②レバーが噛み合い先を切り替える、③上＝時計側・下＝アラーム側、④正逆回転で2香箱を別々に巻く、の4点に意味の増減・逆転なし。日本語本文には原語 `Wippe` / 「ウィップ」を出さない。
- **理由**：ユーザーが旧説明を「説明キモくない？」としてCouncil 1で監査し、部品名の点呼になっていて、掲載画像の上下関係と文章の「左右」が噛み合わず、最も重要な「正逆回転だけで2香箱を巻き分ける」が後ろに埋もれていると判断したため。ユーザーが新日本語本文を明示し、画像翻訳と動画より上への配置も指定した。
- **旧状態・棄却**：旧JA / EN / DEの、部品名称から入り `Wippe` / rocking lever / Wippe相当の機構説明を主役にする構成を棄却する。Pierce 1955技術資料の詳細説明自体を否定するものではなく、この公開セクションの可視本文からは外す。
- **影響範囲**：Pierce Duofon DEEP DIVE 03のJA / EN / DE本文、引用配列、同章の画像キャプションと配置位置、動画配置位置のみ。DEEP DIVE 02、他章、OWNER'S NOTE、WATCH上段動画、画像ファイル本体、動画ファイル本体は変更しない。
- **検証状態**：branch `fix/duofon-winding-copy-and-media-order` で実装済み。PR CIのlocalization / citations / Japanese style / build / mobile layout、main merge、deploy、liveで三言語本文と `images → video` 順を確認するまでVERIFIED / DEPLOYEDとはしない。
- **関連**：実装commit `18160e1de64e88c77bbabec5c6ba40c2ffd92e11` / `82be7526ca576b75ae3b681774e871c20914474c` / `e51880782f267bfe0817b077f48945754bd5bf8b`。ユーザー指定本文および「写真も入れてあるからそれの翻訳と動画の上にくるように調整」。
- **日時根拠**：ChatGPT time取得値 `2026-10-05T17:25:55+09:00` → `2026-10-05 17:26 JST`（分単位丸め）。

### 2026-10-05 20:47 JST — ARSA Blind Alarmを完成本文付き非公開WATCHプレビューとして再実装
- **変更**：最新mainから `feat/arsa-blind-alarm-watch` を作成し、ARSA Blind Alarmの日本語WATCH正本、`/lab/arsa-blind-alarm/` のnoindexプレビューroute、実機画像未収録を示す非AI placeholderを追加する。公開フラグは `false` のままにし、公開OWNER'S NOTES一覧・推薦・sitemap・EN / DEにはまだ接続しない。旧branch `feat/arsa-blind-alarm-private-shell` は履歴として保持し、現行mainへ直接mergeしない。
- **理由**：ARSA研究MAP / LEDGERとProject資料から本文・出典は組める一方、掲載個体の実機写真、到着後の操作・触感・ケース刻印、実機音が未確認である。現行6本と同じ公開WATCHとして扱うには、実画像と実機確認を先に揃える必要がある。
- **旧状態・棄却**：旧branchの `PRIVATE DRAFT / 構成だけ先に組む` だけのCatch / Leadと、109コミット遅れのbranchを直接更新・mergeする案を棄却する。seller claimを実機確認へ昇格すること、1958年JSHの一般ARSA記事・広告をBlind Alarm本人のperiod画像へ代用すること、時計本体をAI生成することも棄却する。
- **影響範囲**：ARSAの非公開日本語WATCH content、専用lab preview、WatchPageのpreview時robots制御、lab previewのnoindexを検証するSEO gate、placeholder画像。公開6WATCH、OWNER'S NOTES一覧、HISTORY、HOW THEY RING、EN / DE、main、本番liveは変更しない。
- **対象WATCH**：ARSA Blind Alarm。
- **起点・帰属**：Reality pinは『Alarm am Arm』『The Alarm Wrist Watch』と購入個体のユーザー提供／seller提供画像について研究正本に記録された確認事項。Catch / Lead文案はAI起点。
- **VA温度比較**：公開6本を `owner-copy:benchmark` で横並び確認。障害・戦傷・リハビリの背景を遊びへ使わず、現行範囲の低温度側で、前蓋・触読針・アラーム時刻read-backという時計固有機能へ直接接続した。
- **採否・現在状態**：Catch / Leadは `FINAL_PENDING_REALITY_CHECK`。実機到着後に前蓋操作、三針の触り分け、alarm時刻read-backを確認し、ユーザーが最終承認するまで `FINAL` / `published: true` にしない。
- **検証状態**：VERIFIED。Astro build、internal links、SEO、citation / source traceability、localization sync / coverage / purity、SPEC evidence、Japanese style、image duplicate、OWNER copy provenanceを通過。デスクトップと390pxのブラウザ実寸確認で横スクロール・画像欠落がなく、lab canonicalと `noindex,nofollow,noarchive` を確認した。PR #188のGitHub Actions `build` job `111755217314` はSUCCESS。main未merge・本番未公開のためDEPLOYEDではない。
- **関連**：PR #188、実装commit `35d6e30784b8f7a1e4292a9c43b0ff191f66c5b6`、GitHub Actions run `37307682050` / job `111755217314`、`research/ARSA_BLIND_ALARM_RESEARCH_MAP.md`、`research/ARSA_BLIND_ALARM_LEDGER.md`、旧branch `feat/arsa-blind-alarm-private-shell`、Project資料『Alarm am Arm』『The Alarm Wrist Watch』。
- **日時根拠**：developer-provided local date `2026-10-05` と作業環境時計 `2026-10-05 20:47:10 +09:00` → `2026-10-05 20:47 JST`。GitHub Actions完了時刻 `2026-10-05T12:12:38Z → 2026-10-05 21:12 JST`。

### 2026-10-05 21:42 JST — ARSAを公開対象へ変更し全WATCH共通の専用プレビューURLを追加
- **変更**：ユーザーの明示指示に基づきARSA Blind Alarmを `published: true` へ変更し、日本語・英語・ドイツ語の公開route、OWNER'S NOTES / HISTORY導線、sitemap / llms索引へ接続する。CMSの既存公開スイッチを維持し、公開状態にかかわらず全WATCHを本番と同じ `WatchPage` で確認できる `/preview/watch/<slug>/` を追加する。previewは検索対象外とし、言語切替リンクも公開routeへ誘導しない。
- **理由**：ユーザーが「公開にしておいてCMSで公開非公開切り替え」「専用URLから非アクティブも公開ビューと同じように見たい」と明示したため。安定した共通preview routeを全WATCHから生成すれば、CMSでOFFにした後も表示確認用URLが消えず、個別時計ごとの一時routeも不要になる。
- **旧状態・棄却**：前項の「実機到着・実画像まで `published: false`」判断を今回の明示指示で撤回し、ARSAだけに固定された `/lab/arsa-blind-alarm/` を廃止する。preview専用の別テンプレート、公開状態に応じてpreview URL自体を消す設計、previewをsitemapへ載せる設計は採用しない。
- **影響範囲**：ARSAの公開フラグ、JA / EN / DE WATCH、OWNER'S NOTES / HISTORY、sitemap / llms、共通WatchPageのpreview metadata、SEO gate、全WATCHの `/preview/watch/<slug>/`。時計本文の日本語正本、実機未確認表示、画像placeholder、HOW THEY RINGは変更しない。
- **検証状態**：VERIFIED。Astro buildでARSAのJA / EN / DE通常routeと全7WATCHのpreview route生成を確認。internal links、analytics route、SEO、citation / source traceability、localization sync / coverage / purity、SPEC evidence、Japanese style、image duplicate、project consistency、inference guard、OWNER copy provenanceを通過した。ブラウザ実寸で通常routeとpreview routeの見出し構造一致、previewの `noindex,nofollow,noarchive` と専用canonical、通常routeのindex canonicalを確認。PC幅と390px幅で横スクロール・画像欠落なし。GitHub Actions初回は公開6本を固定したanalytics assertionと、EN / DE一覧で長い年代fallbackが起こすmobile overflowを検出したため、7本基準と短いARSA多言語年代ラベルへ修正。Windows権限制約によりsymlink作成を伴う `test-quality-gates.mjs` のみローカル未完了で、GitHub Actions再実行を最終判定にする。
- **関連**：PR #188、先行実装commit `35d6e30784b8f7a1e4292a9c43b0ff191f66c5b6` / `c314c759ef6fa1846f0b6411fcecfc98f8a9ae59`、main同期merge commit `03e0174ce1165898e64db00230847b0895059d1c`。
- **日時根拠**：developer-provided local date `2026-10-05` と作業環境時計 `2026-10-05 21:42:40 +09:00` → `2026-10-05 21:42 JST`。

