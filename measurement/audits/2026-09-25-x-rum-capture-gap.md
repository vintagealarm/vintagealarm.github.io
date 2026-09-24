# X Link Click → Cloudflare RUM capture gap audit

更新日: 2026-09-25

## 対象

2026-09-24に投稿したWittnauer Cal.10WA実装報告のX Post Analyticsでは、ユーザー提供スクリーンショット上で次を確認した。

- Impressions: 33
- Engagements: 10
- Detail expands: 5
- Link clicks: 3
- Profile visits: 0

一方、2026-09-25 06:17 JST時点のVINTAGE ALARM Analytics VA2スナップショットでは、

- `/wittnauer-10wa/`: 1 Visit / 1 PV
- X → `/wittnauer-10wa/`: 1 Visit
- Direct / Unknown → `/wittnauer-10wa/`: 0
- 9/22–9/28 bucket: `PARTIAL / UNSAMPLED`, sampleInterval=1

だった。

したがって、X側のLink clicks 3件すべてがVINTAGE ALARMのCloudflare Web Analytics RUMへ到達したとは観測できていない。

## 最新VA2で除外できたもの

2026-09-25 06:17 JSTスナップショットでは、次を確認した。

- `integrity=PASS`
- period row coverage: all complete
- structural coverage: complete
- `externalCoverage=18/18/143/143/1`
- 9/22–9/28はsampleInterval=1
- X entryはWittnauer 1 + HOW THEY RING 1として明示される
- WittnauerへのDirect / Unknown entryはない

このため、現時点では以下を主因候補から外す。

1. VA2 compact exportのtop-N切り捨て
2. period内部の算術不整合
3. 9/22–9/28 bucketのAdaptive sampling
4. Wittnauer X流入がDirect / Unknownへ単純誤分類されたケース
5. PR #118以前のroute mapping / compact aggregation不具合

## GitHub実装確認

現行公開WATCHは `SeoHead.astro` でCloudflare Web Analyticsを手動読込している。

流れ:

1. ページHTMLを取得
2. inline JSが `static.cloudflareinsights.com/beacon.min.js` を追加
3. Cloudflare RUM beaconがpage-load / leave時に計測を送信
4. `rumPageloadEventsAdaptiveGroups` をGraphQLで集計
5. VINTAGE ALARM Analyticsが分類・表示
6. AI export / relayへ変換

つまり、GitHub PagesへのHTTP到達そのものをVINTAGE ALARM側でserver-side記録しているわけではない。

WittnauerページではOWNER'S NOTE先頭画像 `/images/Wittnauer10WA.png` がeager / high priorityで、repository blobは約1.17 MB。Specimen galleryとYouTube iframeはlazy load。

これは欠落原因の確定ではないが、Cloudflare RUMがtraditional pageでload event後にreportする仕様に対し、初回eager resource完了前に離脱できる時間窓が存在することを示す。

## 公式仕様との突合

### X

X公式のPost Activity Dashboard定義では、Link clicksは「post内URLへのclick」。

X公式のanalytics discrepancy説明では、Xのlink clickはclick action発生時に記録される一方、third-party analyticsはpageが十分loadされtracking codeが発火した時点で記録されるため、件数差が起こり得るとしている。

参考:
- https://business.x.com/en/help/campaign-measurement-and-analytics/tweet-activity-dashboard
- https://business.x.com/en/help/campaign-measurement-and-analytics/common-analytics-discrepancies

### Cloudflare Web Analytics

Cloudflare公式FAQ / data collectionでは次を明記している。

- Web Analyticsはclient-side RUM
- manual setupは `static.cloudflareinsights.com` のJSを読込み、`cloudflareinsights.com/cdn-cgi/rum` へ送信
- traditional websiteではpage load完了時と離脱時にreport
- Brave / Adblock Plus / DuckDuckGo extension等でbeaconがblockされる
- network condition等でbeacon payload lossが起こり得る
- received beaconのingestion自体はsamplingしない
- past 7 daysはunsampled beacon dataを保持
- server-side URL analyticsではない

参考:
- https://developers.cloudflare.com/web-analytics/faq/
- https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/
- https://developers.cloudflare.com/web-analytics/data-metrics/high-level-metrics/
- https://developers.cloudflare.com/analytics/graphql-api/sampling/

## 現時点の判定

### 確認済み

- VA2 / Worker内で3→1へ落としている証拠はない。
- current bucketはunsampledなので、Wittnauer 3→1をlong-range samplingだけで説明できない。
- 1件はX referrerとして正しくWittnauerへ分類されている。
- 残り2件は同periodのWittnauer Direct / Unknownにも存在しない。

### 判断

現時点の最重要疑義は、**VINTAGE ALARMが入口観測の主系統をclient-side RUMだけに依存していること**。

これはCloudflare Web Analyticsそのものの計算バグと確定したわけではない。

ただしVINTAGE ALARMの要件を「興味が発生してリンクを踏んだ後、サイト側へどこまで到達したかを可能な限り欠落なく観測する」と置くなら、RUM単独では要件を満たせないため、**計測設計上のcoverage defect**として扱う。

`integrity=PASS` は「取得済みデータの内部算術が整合」という意味であり、「現実のarrivalを完全捕捉」という意味ではない。

## 残る仮説

優先順:

1. X click後、HTML / beacon実行前またはpage load完了前に離脱
2. X in-app browser / browser privacy / blockerでCloudflare beaconがblock
3. network conditionでRUM POSTが失われた
4. 同一人物の複数clickとbrowser cache / navigation挙動の組合せ
5. 現行manual embed方式固有のbrowser compatibility差
6. その他未確認のX WebView挙動

現行manual snippetがCloudflareの現在推奨する `type="module"` 付きsnippetと完全一致していない点は確認した。ただし `type="module"` の主目的は旧IE系を除外することで、現代X WebViewでの2件欠落の直接原因とは現時点で認定しない。

## 次の監査SPIKE

次に必要なのは新しいKPIではなく、**RUMより前の到達点を一時的に独立観測する診断**。

最小SPIKE:

1. HTML headの早い位置で、Cloudflare RUMとは独立した軽量arrival probeを1回送る
2. probeはpath / referrer class / time bucketのみを集計し、cookie・localStorage ID・IP・raw User-Agentを保存しない
3. probe送信先はCloudflare Workerとし、RUM script / page load completionに依存させない
4. 同一X投稿について
   - X Link clicks
   - early arrival probe
   - Cloudflare RUM Entry
   を突合する

判定:

- early probe=3 / RUM=1 → RUM段階の欠落を確認
- early probe=1 / RUM=1 → 2clickはHTML実行地点まで到達していない
- early probe=2 / RUM=1 → click→HTMLとHTML→RUMの両方で欠落
- 数が変動 → repeat click / cache / WebView挙動を追加調査

このSPIKEは診断用。恒久指標化・本番採用は結果を見てから判断する。

## 変更しないもの

この監査だけでは以下を変更しない。

- X投稿方針
- WATCH本文
- Cloudflare Visitsの既存定義
- Direct / Unknown分類
- rabbit-hole戦略
- 本番tracking architecture

まず欠落層を特定する。


## 実装状態

2026-09-25、上記SPIKEを診断専用として実装した。

- `SeoHead.astro` からCloudflare RUM script読込前にearly arrival probeを送る
- `navigator.sendBeacon()` を優先し、queue失敗時のみ `fetch(..., keepalive:true)` へfallback
- 初回案のWorkers Analytics EngineはCloudflare account側で未有効のためdeploy時にcode 10089で拒否された。診断のためだけにユーザーへ機能有効化を要求せず、保存先をSQLite-backed Durable Object `ArrivalProbeStore`へ変更
- Durable Objectにはtimestamp / path / 粗いsource classだけを保存
- canonical origin以外は拒否
- admin analytics opt-out時はprobeも送らない
- Dashboardの通常KPIには混ぜない
- Analytics API / signed AI exportへ `arrivalProbe` を別オブジェクトで追加
- VA2へ `probe` / `probeRows` を追加
- deploy後のDurable Object binding / storageはHEAD health checkで確認
- GitHub Pages live gateでprobe scriptの公開HTML混入を確認

この時点では、probeを恒久計測へ昇格させない。新規外部流入で `Link Click / early probe / RUM Entry` の三点が揃った後に次の判断をする。


## Deploy監査

PR #121 merge後のAnalytics Worker deployで、WranglerがWorkers Analytics Engine bindingを認識した後、Cloudflare APIから `code: 10089` 「Analytics Engineを有効化する必要がある」と拒否された。

確認したこと:

- JavaScript / generated dashboard / profile wrapper / entry-worker unit checksはすべて成功
- 失敗地点はWrangler upload後のCloudflare API version作成
- 既存本番Analytics Workerは置換されていない
- Cloudflare公式ではAnalytics Engineはaccount側でenableが必要な場合がある
- Durable ObjectsはFree / Paid双方で利用可能で、新規namespaceはSQLite backendが現行推奨

判断:

- 診断SPIKEのためだけにユーザーへCloudflare Dashboard操作を返さない
- Analytics Engine案を棄却し、同一Worker内のSQLite-backed Durable Objectへ保存先だけ差し替える
- browser probe payload、通常Visitsとの分離、VA2/relay診断表示、判定方法は維持する
