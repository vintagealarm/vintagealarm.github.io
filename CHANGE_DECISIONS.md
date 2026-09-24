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

## 2026-09-24

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

### 2026-09-23 13:28 JST — TOPにHOW THEY RING入口を追加
- **変更**：OWNER'S NOTES直下にHOW THEY RING入口を配置し、TOP表示をCMSスイッチで管理。
- **理由**：独立した音・鳴らし方の入口としてTOPから到達可能にするため。
- **関連**：commits `84a478a7b7d731ffab655a41f3ec41175e7689c1`, `b6d1f80c9ea9402156cc7e529fa351f97420ad6c`
- **日時根拠**：GitHub commit 13:28 JST、保存済み会話の指示時刻 15:28 JSTも確認。実装時刻を採用。

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

### 2026-09-23 19:01 JST — GitHub運用：現在状態と変更履歴を分離
- **変更**：`CHANGE_DECISIONS.md` を新設し、仕様・判断・方針・棄却候補の変更をJST日時付きで追跡する運用へ変更。PROJECT_STATE / AGENTSの完了条件・起動ルーティングにも組み込んだ。
- **理由**：「今どうなっているか」だけでなく「いつ・何を・なぜ変えたか」をGitHubだけで追跡可能にし、会話履歴への依存と旧仕様復活を減らすため。
- **旧状態・棄却**：PROJECT_STATEへ現在仕様と一部の理由を集約するだけの運用。時系列の判断履歴としては不足するため廃止。
- **影響範囲**：GitHub作業運用・PROJECT_STATE・AGENTS。サイト表示変更なし。
- **検証状態**：PR #91をmainへmerge後、`CHANGE_DECISIONS.md` / `PROJECT_STATE.md` / `AGENTS.md` をmainから再取得し、相互参照を確認済み。
- **関連**：PR #91 / commit `51b60433dc6b40fdded3d9d9aec770b373f67107`

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
