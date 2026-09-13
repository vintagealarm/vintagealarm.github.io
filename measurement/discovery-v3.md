# VINTAGE ALARM — DISCOVERY / SEO / GEO ANALYTICS V3

更新日: 2026-09-13

## 固定目的

VINTAGE ALARM Analyticsの主語は「来訪者」ではなく「発見性」。

`存在を認識されたか → 表示されたか → 選ばれたか → 来たか → 読まれたか → 興味が広がったか`

追加月額0円を優先する。
Billing account / Google Cloud / 有料APIを前提にしない。

## DISCOVERY PIPELINE

1. INDEX STATUS
2. SEO IMPRESSIONS
3. SEO CLICKS / CTR / AVG POSITION
4. SEARCH VISITS
5. ENTRY PAGE
6. NEXT PAGE
7. DIAGNOSIS
8. AUDIT

INDEX STATUSは主要ページだけSearch Console URL検査を手動確認して記録する。

## ZERO-COST DATA FLOW

### Cloudflare

自動:
- Page views / Visits
- Referrer
- Entry page
- Site flow
- Country / Device
- Traffic trend

### Search Console — 通常SEO

無料UIからExportしたCSVをDISCOVERY INBOXへImportする。

対象:
- Date
- Page
- Query
- Country
- Device
- Search appearance
- Clicks
- Impressions
- CTR
- Average position

全体KPIはDate系CSVを優先する。
Page / Query等はドリルダウンとして扱う。
ChartとTableの集計方法差を無視して単純合算しない。

### Google生成AI

Search Consoleの生成AI Performance ReportからCSV Exportして別SnapshotとしてImportする。

見るもの:
- Impressions
- Date
- Page
- Country
- Device

通常SEO ImpressionsとGoogle AI Impressionsを混ぜない。

### X

- oEmbed: URL識別 / 表示用metadata
- Analytics: 手入力またはスクショFallback
- Cloudflare: X Entry
- FunnelはESTIMATED / INDICATIVE

## DISCOVERY SURFACES

### OWNED WEB
- Google Web Search
- Google Search generative AI
- Discover
- Image Search

### OWNED SOCIAL
- X native
- Google → X
- YouTube
- その他Platform property

### EXTERNAL AI
- Grok
- ChatGPT
- Perplexity
- Gemini等

外部AIは次を分けて記録する。

1. DISCOVERED — ソース候補・情報源一覧にVINTAGE ALARMが出た
2. CITED — 回答本文のインライン引用または「引用済み」に出た
3. USED IN ANSWER — 回答説明の構成要素として内容が使われたことが画面上で確認できる
4. REFERRED VISIT — AI経由のサイト到達をCloudflare等で確認できた
5. SEMANTIC FIDELITY — 事実 / OWNER OBSERVATION / 編集的比喩 / 仮説の区別が回答で保たれたか

`AIで表示された / AIに引用された / 回答に使われた / AIから来た / 正確に意味保持された` を同一視しない。

ソース表示順も検索順位・信頼度順位・回答寄与度順位とはみなさない。

同一会話でVINTAGE ALARMを先に提示した結果と、新規会話でサイト名を提示せず再現した結果を分離して記録する。

外部AIの実測ログは `measurement/aio-observation-log.md` を正本とする。

## 診断

### SEO

Index未確認
→ INDEX CHECK

Index確認済み + Impressions 0
→ NO VISIBILITY YET

Impressions ↓ + Position悪化
→ VISIBILITY / RANKING SUSPECTED

Impressions ↑ + CTR ↓
→ SNIPPET / INTENT SUSPECTED

Search Console Clicks ↑ + Cloudflare Search Entry ↓
→ MEASUREMENT GAP SUSPECTED

診断は原因確定ではなく、次に掘る場所の候補。

## 現在のUI階層

1. DISCOVERY INBOX
2. SEO / Google AI KPI
3. Visibility Trend
4. Page / Query Drilldown
5. Manual Index Status
6. Cloudflare Traffic
7. Campaign
8. Advanced / Audit

## 保存

現在:
- SEO/GEO CSV snapshot → browser localStorage
- INDEX STATUS → browser localStorage
- X / YouTube Campaign → browser localStorage
- 外部AI観測 → Git管理された時点付きログ

次の検討:
- 追加月額0円で使える永続ストレージのみ候補にする
- 導入前に無料枠 / 課金条件 / データ量をWeb監査する

## Evidence-gated rule

1. 最新公式仕様をWeb確認
2. 判断したい問いを分解
3. 取得可能な事実 / 推測 / 取得不能を分離
4. 意思決定に必要か確認
5. 最小実装
6. 実データで反証
7. 問題がなければ次へ

「取れるから取る」は禁止。
「綺麗に見えるから結び付ける」も禁止。
