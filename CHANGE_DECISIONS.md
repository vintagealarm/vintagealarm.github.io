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
