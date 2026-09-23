# VINTAGE ALARM ANALYTICS — Cloudflare Worker

VINTAGE ALARM専用の非公開アクセス解析ダッシュボード。

## 現在の目的

アクセス数を眺めるためではなく、

`X / YouTube / 検索 → 入口ページ → 次の興味`

が成立したかを確認する。

## 主な表示

- RANGE: 1H / 3H / 24H / 7D / 30D / ALL / CUSTOM
- GROUP BY: AUTO / 30 MIN / 1 HOUR / 1 DAY / 7 DAYS / MONTH
- Visits / Page views
- X Visits / YouTube Visits / Organic Search
- Pages per Visit
- Watch Entry Share
- Traffic Trend 折れ線
- Acquisition Trend 折れ線
- Entry Pages 横棒
- Traffic Mix ドーナツ
- Site Flow
- SNS → WATCH ENTRY（SNS別の入口回数を時計ページごとに集約。全SNSを分母に割合を補助表示）
- Campaign Funnel（折りたたみ）
- Referrer host / path
- Country / Device
- MAPPING AUDIT / UNMAPPED path
- LOW SAMPLE 警告

主要KPIとグラフを先に表示し、Campaign Funnel、流入元などの監査用テーブル、
SEO / GEOツールは必要なときだけ開ける折りたたみへまとめている。

Campaign Funnelの投稿情報はブラウザのlocalStorageにのみ保存し、GitHubやCloudflareへ書き込まない。
X / YouTubeを選び、投稿URL・投稿日時・リンク追加日時・対象ページ・手入力指標を登録できる。リンク追加日時をTraffic Trend / Acquisition Trend上のマーカーとして利用する。既存のplatform未指定レコードはXとして読み込む。

## データ

Cloudflare Web Analytics / RUMをGraphQL APIから読む。

時間粒度は選択期間に応じて細かいbucketを試し、利用できない場合は粗いbucketへフォールバックする。

- 1H: 5分 → 15分 → 1時間
- 3H: 15分 → 5分 → 1時間
- 24H: 1時間 → 15分
- 7D / 30D: 日 → 1時間

## セキュリティ

WorkerはBasic Authで保護する。

- CF_API_TOKEN
- CF_ACCOUNT_ID
- DASHBOARD_PASSWORD

はCloudflare Worker Secretにのみ保存する。
API token・Account ID・パスワードをGitHubへコミットしない。

## ホスト移行基準線

2026-09-10を旧GitHub Pagesから `https://vintagealarm.github.io/` への移行日として固定する。
Traffic Trend / Acquisition Trendには `HOST MIGRATION` マーカーを表示し、既存のX / YouTube施策マーカーと同じ時間軸で判別できるようにする。
これはJSTの日単位の基準線であり、正確な切替時刻を示すものではない。旧ホストと新ホストは別計測として保持し、移行をまたぐ数値を同条件の連続データとして比較しない。

Workerは `vintagealarm.github.io` と `orima1995-create.github.io` を別々のGraphQL filterで取得する。画面とAI exportでは合算を主指標として返し、NEW / OLDの内訳と別系列も保持する。合算Visitsはhost別Visitsの足し算であり、ドメインをまたいだユニーク人数ではない。施策比較は新ホストだけを対象にする。

## ChatGPT / AI向け read-only export

ダッシュボード本体のBasic AuthやCloudflare API tokenを共有せず、集計データだけを一時的に読み出すための経路を用意する。

流れ:

1. ダッシュボード右上の `AI COPY` を押す。
2. 現在選択中のwindowに対するread-only exportをブラウザ内で取得する。
3. 集計JSONそのものがクリップボードへコピーされる。
4. そのJSONをChatGPTへ貼る。

`workers.dev` のURLをChatGPT側Web取得が拒否する環境でも分析できるよう、通常運用はURL共有ではなくJSONコピーを使う。

手動でも、Basic Auth済みのブラウザで `/api/ai-share-link?window=7d` を開けば同じURLを取得できる。

対応range:

- 1h
- 3h
- 24h
- 7d
- 30d
- all
- custom（start / end必須）

`bucket` には auto / 30m / 1h / 1d / 7d / 1mo を指定できる。

`ttl` を秒で指定できる。最小5分、最大7日。省略時は24時間。

例:

`/api/ai-share-link?window=7d&ttl=86400`

export対象:

- Page views / Visits
- Pages / Entry Pages
- Channels
- Referrer host / path
- External entry flow
- Internal site flow
- SNS → WATCH entry
- Country / Device
- Traffic / Acquisition trend
- 直前同期間

含めないもの:

- Cloudflare API token
- Dashboard password
- IP address
- Cookie
- raw User-Agent
- Search Console / Google生成AIのImport snapshot

Search Console / Google生成AIのCSV Importは現時点でブラウザlocalStorageだけに保存されるため、Worker側exportには含まれない。取得不能なデータを自動取得済みとして扱わない。

署名鍵はWorker内だけにある `DASHBOARD_PASSWORD` と `CF_API_TOKEN` から専用鍵を導出し、HMAC-SHA256でRANGE / GROUP BY / CUSTOM日付を含むanalytics scopeと有効期限に結び付ける。どちらのSecretもURLやレスポンスには出さない。署名付きURLはread-onlyだが、有効期限内はURLを知る相手が閲覧できるため、必要な相手以外へ共有しない。

## URL表示名

本番表示は `profile-worker.js` のWATCH / gateway mappingで正規化する。公開WATCHは6本を同一セットとして扱い、EN / DEで公開した同じ6本とHOW THEY RINGも同じ追跡層へ載せる。

- TOP
- HISTORY
- OWNER'S NOTES
- HOW THEY RING（JA / EN / DE）
- Basis Alarm（JA / EN / DE）
- Wittnauer Cal.10WA（JA / EN / DE）
- Cyma Time-O-Vox（JA / EN / DE）
- Citizen Alarm（JA / EN / DE）
- Westclox Watchlarm（JA / EN / DE）
- Pierce Duofon（JA / EN / DE）
- Cyma OWNER'S NOTE
- Smartwatch / HISTORY

未知Pathは既存名称へ丸めずUNMAPPEDとして警告する。

## 注意

- X Link clicksとCloudflare X Visitsは同一指標ではない。
- YouTube Views / Likes / 平均視聴率とCloudflare YouTube Visitsも同一指標ではない。
- YouTubeアプリやWebViewでRefererが失われるアクセスはDirect / Unknownになり得る。
- Page viewsとVisitsは別定義。
- Cloudflare GraphQLのAdaptive datasetは長期間・複雑なqueryほどsampling解像度が変わり得るため、30D集計は最大7日単位に分割してWorker側で合算する。
- Search Consoleの表示回数 / Click / CTR / QueryとCloudflare訪問データを混同しない。
- Campaign Funnel内のCloudflare側数値は選択期間の比較値であり、投稿単位の完全帰属ではない。
- LOW SAMPLE中は数件差を傾向として断定しない。



## Zero-cost SEO / GEO Inbox

追加課金経路を作らない方針に変更した。

Google Cloud / Service Account / Search Console APIは使用しない。
Search Console本体のExportを入力にして、分析だけをVINTAGE ALARM ANALYTICSで行う。

入力:

- 通常Search Performance CSV
- Google生成AI Performance CSV
- URL Inspection結果は主要ページだけ手動記録

ダッシュボード:

- SEO Impressions
- SEO Clicks
- CTR
- Average Position
- Google AI Impressions
- Index Status
- CSV時系列
- Page / Query等のドリルダウン
- 前回Import比較
- conservative diagnosis

Search ConsoleでExportする際はCSVを選ぶ。
複数CSVが出た場合は、展開後にまとめて選択してImportする。

ImportデータとIndex Statusは現在ブラウザlocalStorageへ保存する。
API token、Google Cloud project、Billing accountは不要。

### Data interpretation

Search ConsoleのChartとTableは集計方法が異なる場合がある。
全体KPIはDate系CSVを優先し、Page / Queryはドリルダウンとして扱う。

Google生成AI Performanceは通常SEOと別Snapshotとして保存する。
AI ImpressionとAI ReferralとAI Citationを同一指標にしない。

### Cost rule

VINTAGE ALARM ANALYTICSの現段階では追加月額0円を優先する。
Billing accountや有料APIを前提とする実装は採用前に明示的に再評価する。


## Range / bucket comparison

Dashboard range and grouping are independent.

- Range presets: 1H / 3H / 24H / 7D / 30D / ALL
- CUSTOM: choose an inclusive JST start/end date.
- GROUP BY: AUTO / 30 MIN / 1 HOUR / 1 DAY / 7 DAYS / MONTH.
- AUTO maps short windows to 30m/1h, 7D to daily, 30D to fixed calendar 7-day blocks, and long ranges to monthly blocks.
- Seven-day buckets are calendar-fixed inside each month (1–7, 8–14, 15–21, 22–28, 29–month end), not rolling seven-day slices.
- The 29–month-end bucket is shorter than seven days and is marked SHORT. PARTIAL / SHORT / MIGRATION buckets are shown for context but are excluded from like-for-like delta comparison.
- The bucket containing the 2026-09-10 host migration is marked MIGRATION because OLD and NEW host conditions are mixed.
- The bucket comparison table shows PV / Visits / X / Search / Direct / Internal PV and the Visits delta only when both adjacent buckets are comparable.
- Cloudflare `sampleInterval` is surfaced as UNSAMPLED / SAMPLED / ESTIMATE. `sampleInterval=1` means the returned query group was not sampled; it does not mean the historical value can never be revised. A bucket cut by the selected range or current time is PARTIAL.
- Analytics availability is conservatively bounded from the first repository evidence of the Web Analytics beacon on 2026-09-08 06:41:34 JST. Requests beginning earlier are clipped; periods entirely before the baseline return an error. The first measured day remains partial because activation time is not independently verified.
- ALL begins at the analytics availability baseline and has no previous-period comparison. Previous-period comparison is omitted whenever the preceding equal-length period would begin before the baseline.
- Long ALL / CUSTOM requests still use <=7-day Cloudflare slices, but slice fetching and top-level analytics tasks are concurrency-limited to avoid an unbounded GraphQL burst.
- Signed AI export links preserve RANGE / CUSTOM dates / GROUP BY so dashboard and AI analysis use the same slice.

- AI URL v2 preserves RANGE / GROUP BY / CUSTOM dates in the short relay path. Existing /s/v1/ preset links remain readable for compatibility.
