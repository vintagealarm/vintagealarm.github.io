# VINTAGE ALARM — 計測定義

更新日: 2026-09-24

## 公開URL移行

- 2026-09-10以降の正規URL: `https://vintagealarm.github.io/`
- 旧URL: `https://orima1995-create.github.io/orima1995-creator.github.io/`
- 旧GitHub Pages URLはリポジトリ移管では転送されないため、旧リポジトリを転送専用サイトとして残す。
- 新旧は別のCloudflare Web Analyticsサイトとして保持する。2026-09-10をまたぐ比較では、ホスト変更と計測タグ変更を注記する。
- 管理ダッシュボードの正規集計ホストは`vintagealarm.github.io`とし、旧base pathは過去データの正規化対象として残す。

## 原則

数字を増やすことより、何が増えたかを区別できることを優先する。

同じ現象を複数の指標で二重計上しない。
取得できない指標を推測で埋めない。
計測条件が変わった場合は、比較期間に注記する。

## 計測の役割分担

### Cloudflare Web Analytics — 来訪 + 性能

既存のCloudflare Web Analyticsを計測の主系統とする。

来訪:
- Page views
- Visits
- Path
- Referrer host / path
- Country
- Device

性能:
- LCP
- INP
- CLS
- Page load time

### VINTAGE ALARM ANALYTICS — 管理者用表示層

Cloudflare Web Analytics / RUMをGraphQL APIから読み、VINTAGE ALARM用の名称へ変換して表示する。

実装:
- 基礎集計: `cloudflare/analytics-dashboard/worker.js`
- 本番ラッパー / エントリ: `cloudflare/analytics-dashboard/profile-worker.js`
- Wrangler設定: `cloudflare/analytics-dashboard/wrangler.toml`
- デプロイ元: `vintagealarm/vintagealarm.github.io` の `Deploy Analytics Worker` workflow
- Worker: `vintage-alarm-analytics.orima1995.workers.dev`
- Basic Authで管理者だけが閲覧する

`profile-worker.js` は基礎集計を壊さず、公開URLの名称・SNS着地先・主要ページ集計とXプロフィール専用URLを本番表示へ正規化する。公開状態と、別運用上の measurement target の括りは混同しない。

表示:
- RANGE: 1時間 / 3時間 / 24時間 / 7日 / 30日 / ALL / CUSTOM
- GROUP BY: AUTO / 30分 / 1時間 / 1日 / 7日 / 月
- Page views / Visits
- 直前同期間比
- URL → ページ名
- ENTRY SOURCE → PAGE
- SITE FLOW
- X
- YouTube
- Instagram
- Facebook
- Other SNS
- Organic Search
- Direct / Unknown
- AI Assistant
- Other Referral
- Host Migration（旧・新ホスト間。内部回遊とは別）
- Internal Navigation（同一ホスト内のみ）
- Referrer host / path
- Country
- Device
- 未登録PathのMAPPING AUDIT

Cloudflare API tokenはWorker Secretにのみ保存し、GitHub Pagesやブラウザへ公開しない。

### ChatGPT / AI read-only export

施策判断をChatGPT側でも同じ集計値から行えるように、管理画面とは別に短時間だけ有効なread-only exportを使う。

- `/api/ai-share-link` はBasic Auth必須。
- WorkerがHMAC署名付きの `/api/ai-export` URLを発行する。
- 署名はRANGE / GROUP BY / CUSTOM日付を含むanalytics scopeと有効期限に結び付ける。
- 有効期限は最小5分、最大7日。
- exportはCloudflare Web Analyticsの集計値だけを返す。
- flowは `externalEntryFlows` / `internalFlows` / `migrationFlows` に分離する。旧ホスト↔新ホストの遷移を内部回遊へ混ぜない。
- SNS着地先の再配分はfull dashboardの `flows`、AI exportの `externalEntryFlows` のどちらでも同じ結果になるようにする。
- VA2 fallbackでは内部回遊を `internalVisits` と `internalPV` に分ける。`internalVisits` はInternal Navigation channelのVisits、`internalPV` は `internalFlows` のPage views合計。Visitsが0でも内部遷移PVは存在し得るため、単一の `internal` 値は使わない。
- VA2 fallbackの `pages` は全ページの `Page views/Visits`、`entries` は入口ページの `Visits/Page views` とする。内部遷移だけで増えたPage viewを入口数へ混ぜない。
- compact `external` / `flow` / `handoff` はcountry/deviceなど表示しない次元を先に集約してから上位20件へ切る。`externalCoverage` で表示group数・全group数・表示Visits・全Visits・flow行の完全性を明示し、省略を完全データのように見せない。
- `sampleParts` は total / pages / referrers / flows / entries / countries / devices の順で各query groupの `sampleInterval` を保持し、periodの `quality` はその最大値で判定する。`coverage` は pages / referrers / flows / entries / countries / devices の固定limit到達有無を明示する。
- freshnessの `latestBucket` は最終イベント時刻ではなく最新の非ゼロ集計bucket。`gapLower` はそのbucket終了からの経過下限で、現在進行中bucketでは0でも「計測遅延0」を意味しない。
- `integrity` は同じperiod内で total と pages / channels / flows / countries / devices の再集計値を突合する内部整合チェックとする。row coverageが完全かつ該当queryがunsampledなのに差が出た場合だけ `FAIL`、sampling中の差は `ESTIMATE_DRIFT`、row limit到達で完全性を保証できない項目は `PARTIAL` とする。これはCloudflareのconfidence intervalの代用ではなく、export内部の算術矛盾を検出する別レイヤー。
- VA2の `compare` は `previous-period` / `none` を明示し、比較対象期間が存在しないALL等では `previous=NA` とする。取得不能を `0/0` として表示しない。
- VA2のtrend statusは `PARTIAL / MIGRATION / SAMPLED / ESTIMATE` 等の複合状態を省略せず保持する。
- Cloudflare API token / Dashboard password / IP / Cookie / raw User-Agentは返さない。
- Search Console / Google生成AIのCSV ImportはブラウザlocalStorageのためexport対象外。

このexportを使ったChatGPT分析でも、`実装済み / 公開済み / 成果観測済み`を分け、X流入・検索流入・AI Assistant Referrerを混同しない。

## Visits / Page views / Entryの扱い

Page viewsとVisitsを同一視しない。

Cloudflare Web AnalyticsのVisitsは、外部サイトまたはDirectから始まったページビューを基準にする。
**Visitsはユニークユーザー数・実人数ではない。** 同じ人物による別の入口発生を人物単位でdedupeした値として扱わない。
内部遷移ではPage viewが増えてもVisitsが0になり得る。

`Direct / Unknown` は、入口行で利用可能なreferrer hostが記録されていない分類とする。直打ち・ブックマークだけを意味せず、参照元を取得できなかった流入を含み得るため、`Direct` 単独へ縮めて確定表示しない。

`Internal Navigation` は **request hostとreferrer hostが同じ場合だけ** とする。正規ホスト `vintagealarm.github.io` と旧ホスト `orima1995-create.github.io` の間をまたぐreferrerは `Host Migration` として分離し、SITE FLOWや内部回遊数へ加えない。host移行導線は別表・`migrationFlows`で観測する。

ページ表の`ENTRY VISITS`は、そのページが外部流入またはDirectの入口になった回数として読む。

`ENTRY SOURCE → PAGE`では、`requestPath + refererHost + refererPath`を同じGraphQL集計行で取得する。
別々に集計したPageとReferrerを推測で結び付けない。

`SITE FLOW`では、同一ホストをRefererに持つ内部遷移だけを表示する。旧↔新ホスト間は `HOST MIGRATION FLOW` として別表示する。

## URL → 表示名の監査

表示名は必ずraw `requestPath`を残したまま変換する。

現在の主要マッピング:
- `/` → TOP
- `/history/` → HISTORY
- `/en/history/` → HISTORY (EN)
- `/de/history/` → HISTORY (DE)
- `/owners-notes/` → OWNER'S NOTES
- `/en/owners-notes/` → OWNER'S NOTES (EN)
- `/de/owners-notes/` → OWNER'S NOTES (DE)
- `/sources/` → SOURCES
- `/en/sources/` → SOURCES (EN)
- `/de/sources/` → SOURCES (DE)
- `/basis-alarm/` → Basis Alarm
- `/wittnauer-10wa/` → Wittnauer Cal.10WA
- `/pierce-duofon/` → Pierce Duofon
- `/cyma-time-o-vox/` → Cyma Time-O-Vox
- `/citizen-alarm/` → Citizen Alarm
- `/westclox-watchlarm/` → Westclox Watchlarm
- `/en/{watch}/` / `/de/{watch}/` → 各言語版WATCH名（公開route実体があるものを個別マッピング）
- `/how-they-ring/` → How They Ring
- `/en/how-they-ring/` → How They Ring (EN)
- `/de/how-they-ring/` → How They Ring (DE)
- `/cyma-time-o-vox/chronometre/` → Cyma Time-O-Vox Chronomètre
- `/en/cyma-time-o-vox/chronometre/` → Cyma Time-O-Vox Chronomètre (EN)
- `/de/cyma-time-o-vox/chronometre/` → Cyma Time-O-Vox Chronomètre (DE)
- `/cyma-time-o-vox/owners-note/` → Cyma OWNER'S NOTE
- `/history/smartwatch/` → Smartwatch / HISTORY

SNS着地先の再配分でもTOPを既知ページとして扱う。X等から `/` へ入ったVisitsを `other` に残さない。

base path、末尾スラッシュ、URLエンコード差を正規化する。
既知マッピングに一致しないPathは`UNMAPPED`として表示し、勝手に既存ページ名へ丸めない。

新規ページ公開時は表示名マッピング、SNS → WATCH ENTRY、主要ページリストを同時に確認する。`WATCH ENTRY SHARE` は公開WATCH route mapから自動導出し、公開状態とは別の `measurement target` groupingで絞り込まない。言語gateway（`/en/` / `/de/`）自体もWATCH entryへ数えない。
Analyticsの実測で新しい公開Pathが `MAPPING AUDIT` に出た場合は、その場で対象ページの実体を確認し、正規表示名・分類・主要ページリストを `measurement/metrics.md` と実装へ同期する。観測値そのものは `measurement/experiment-log.md` に残し、トップレベル状態ファイルへ重複保存しない。

## 管理者アクセス除外

母数が小さい段階では管理者自身の確認アクセスが結果を大きく歪めるため、最優先で除外する。

公開サイトはブラウザ単位のlocalStorageフラグ`vintageAlarmAnalyticsOptOut`を確認し、ONの場合Cloudflare beaconを読み込まない。

設定:
- 任意ページを `?__va_analytics=off` 付きで一度開く → そのブラウザを除外
- `?__va_analytics=on` → 計測へ戻す

PC / スマホなどブラウザごとに設定する。
除外設定前に発生した過去アクセスは遡って消えない。

## VINTAGE ALARMで分ける流入

最低限、次を分ける。

- X
- Instagram
- Facebook
- Other SNS
- Organic Search
- Direct / Unknown
- Other Referral
- AI Assistant系リファラー（取得できる場合）
- Internal Navigation

既知のAI Assistant hostは汎用検索ドメイン判定より先に分類する。特に `gemini.google.com` を `google.*` のOrganic Searchへ吸収しない。通常の `google.com` / `google.co.jp` 等はOrganic Searchのまま扱う。Google検索面に統合されたAI機能など、referrer hostだけで分離できないものはAI流入へ推測分類しない。

同じ流入を複数カテゴリへ二重計上しない。

## X / YouTube導線の検証

X Analytics / YouTube StudioとCloudflareを1対1の同一指標として扱わない。

X:
- Impressions
- Engagements
- Detail expands
- Link clicks

Cloudflare:
- X / YouTube / SNS Entry Visits
- Entry destination
- Referrer host / path
- その後のSITE FLOW

特定投稿のLink clicksやYouTubeの再生回数とCloudflareの7日集計を直接比較しない。YouTubeアプリ等でRefererが渡らない場合はDirect / Unknownになり得る。
投稿直後の検証には1H / 3H / 24Hを使い、同じ時間帯へ寄せる。

可能な場合はGraphQLの`refererPath`でX投稿のstatus pathを確認する。
ただしX / t.co / WebViewの仕様で完全な投稿単位識別ができない場合は、推測で補わない。

## ページ単位

優先して見るページ:

- TOP
- HISTORY
- OWNER'S NOTES
- Basis Alarm
- Pierce Duofon
- Cyma Time-O-Vox
- Citizen Alarm
- Westclox Watchlarm

WATCHページでは、
1. 入口になったか
2. どの流入元から入ったか
3. 次のページへ進んだか

を分けて見る。

## Duofon基準実験

基準日:
- 2026-09-07 — WATCH v1.0完成・ギャラリー実装
- X既存投稿へのサイト導線追加日は別途記録する

比較単位:
- 投稿直後: 1時間 / 3時間 / 24時間
- 継続: 7日 / 30日

見る項目:
- Duofon Page views / Entry Visits
- XからのEntry
- SearchからのEntry
- SITE FLOW
- Country
- Device

## 検索データ

Search ConsoleとCloudflareを混同しない。

Search Console:
- 表示回数
- クリック
- CTR
- 平均掲載順位
- Query

Cloudflare Web Analytics:
- 実際のサイト訪問
- ページ閲覧
- Entry source
- Referrer
- Country / Device
- Site flow

`Organic Search = 0`は、検索結果への表示が0という意味ではない。
表示されたがクリックされていない状態はSearch Consoleで確認する。

## Country / Device / Browser / OS

CountryとDeviceは継続観測するが、母数が小さい段階では成功指標にしない。

Browser / OS / Navigation typeは取得可能でも、現時点では常設KPIにしない。
表示崩れ・ブラウザ依存不具合・特殊な遷移を調査するときの診断項目とする。

## Core Web Vitals

LCP / INP / CLS / Page load timeは集客成果ではなく、集客を阻害する技術問題の健康診断として扱う。
VINTAGE ALARM ANALYTICSの主画面へ無理に統合せず、Cloudflare本体で確認してよい。

## AI検索観測

AI検索での露出は補助観測として扱う。

固定質問を使う場合は、
- サービス / モデル
- 日時
- 言語
- 地域
- 検索機能の有無

を記録する。

AI Assistant Referrerが取得できても、AI回答内での自然露出そのものとは同一視しない。

## 成果判定

VINTAGE ALARM ANALYTICSの目的はアクセスカウンターではなく、

`X / 検索 → 時計ページ → 次の興味`

が成立したかを見ること。

次を別々に扱う。

1. 実装できた
2. 正常に公開できた
3. 発見・露出が増えた
4. 来訪が増えた
5. 狙ったページが入口になった
6. 次ページへ回遊した

数字が増えた場合も、SNS投稿、外部言及、季節性、管理者アクセス、計測変更など別要因を確認する。


## SNSリファラー監査

X / Instagram / Facebookを同一カテゴリにまとめない。

raw `refererHost` が以下を含む場合のみ分類する。

- X: `x.com` / `twitter.com` / `t.co`
- Instagram: `instagram.com`
- Facebook: `facebook.com`
- Other SNS: Threads / WhatsApp / LINE / LinkedIn等

Facebook / InstagramのRefererがあることだけで「公開投稿から人間が来た」と断定しない。
Web Analyticsは既知Botを除外する設定を使うが、アプリ内プリフェッチ・未識別自動アクセス・Link Shim・DM等の経路は別途raw host / pathで確認する。

特定SNS投稿の成果判定は、SNS側のLink clicksと同時間帯のENTRY SOURCE → PAGEを照合して行う。


## ダッシュボード可視化原則

上段ほど意思決定、下段ほど原因調査とする。

1. KPI
2. Traffic Trend
3. Acquisition Trend
4. Entry Pages / Traffic Mix
5. Site Flow
6. Campaign Funnel
7. Raw / Audit

時間推移は選択期間に応じて粒度を切り替える。
Campaign情報は管理者ブラウザのlocalStorageにのみ保存し、GitHubへ分析値をコミットしない。X / YouTubeのプラットフォーム種別を保存し、既存のplatform未指定レコードはXとして扱う。

Campaign FunnelのCloudflare側値は選択期間全体の比較値であり、SNS側Link clicksへの完全帰属とは扱わない。
投稿時刻は折れ線グラフのマーカーとして利用する。

Visitsが30未満の選択期間ではLOW SAMPLEを表示し、数件差を傾向として断定しない。

### 期間比較 / samplingの扱い

- RANGEとGROUP BYは別概念として扱う。RANGEは 1H / 3H / 24H / 7D / 30D / ALL / CUSTOM、GROUP BYは AUTO / 30分 / 1時間 / 1日 / 7日 / 月。
- 7日bucketは暦固定で 1–7 / 8–14 / 15–21 / 22–28 / 29–月末。29–月末は7日未満なので SHORT とし、通常の前bucket差分比較から除外する。
- 選択期間や現在時刻で切れたbucketは PARTIAL。2026-09-10のホスト移行日を含むbucketは MIGRATION。PARTIAL / SHORT / MIGRATION は表示しても同条件比較として扱わない。
- Cloudflare `sampleInterval=1` はそのquery groupがsamplingされていないことを示すだけで、過去値が永久に確定したことを意味しない。表示は UNSAMPLED / SAMPLED / ESTIMATE とする。
- Web Analyticsの利用可能期間は、repository上でbeacon追加を確認できる 2026-09-08 06:41:34 JST を保守的な下限とする。それより前を0アクセスとして扱わず、完全に開始前の期間は取得不可、開始前を含む期間は下限までclipする。初日の完全性は別途未確認。
- previous-periodは同じ長さの直前期間が上記下限以後に全て収まる場合だけ表示する。
- ALL / 長期CUSTOMでもCloudflare問い合わせは最大7日sliceを維持するが、GraphQL burstを避けるため並列数を制限する。
- AI COPY / AI URL / relay / VA2も同じRANGE・GROUP BY・CUSTOM日付・sampling状態を保持し、ダッシュボードとAI分析の切り口を一致させる。


## Evidence-gated実装ループ

SEO / GEO / SNS / Analyticsの追加機能は、毎回次の順で進める。

1. 公式ドキュメントを優先して最新仕様をWeb確認する
2. 「何を知りたいか」を問いに分解する
3. 取得できる事実 / 推測 / 取得不能を分ける
4. そのデータで意思決定が変わるかを確認する
5. 最小実装する
6. 実データで表示・定義・欠損を監査する
7. 問題がなければ次の層へ進む

取得できるからという理由だけでKPIやグラフを追加しない。
公式APIやエクスポート経路が確認できない指標は、自動取得済みのように見せない。

## Search Console / GEOの現在方針

追加月額0円を優先し、Google Cloud / Service Account / Search Console APIは現段階では採用しない。

通常SEO:
- Search Console UIからCSV Export
- Date / Page / Query / Country / Device等をDISCOVERY INBOXへImport
- Clicks / Impressions / CTR / Average Positionを保存・比較

Google生成AI:
- 専用Performance ReportからCSV Export
- Google AI Impressionを通常SEOとは別Snapshotとして保存
- Date / Page / Country / Deviceを確認

INDEX STATUS:
- 主要ページだけURL検査を手動確認
- ダッシュボードへ状態と確認日を記録

Search Consoleの直接Exportは表示中のChartとTableを出力するが、レポートによって構造が異なる。
全体KPIはDate/Chart系を優先し、Page / Queryは原因調査用に使う。

CSV Import履歴は現在browser localStorageへ保存する。
