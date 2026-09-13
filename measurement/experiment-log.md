# VINTAGE ALARM — 実験ログ

## 2026-09-09｜CYMA関連X投稿 → サイト導線

### X側 初動

投稿19分時点:

- Impressions: 11
- Engagements: 5
- Detail expands: 3
- Link clicks: 2

確定して言えること:
- 投稿からリンククリックが2回発生した。

言ってはいけないこと:
- 「CYMAへ2人到達した」
- 「CYMAへ7人来た」
- 「CloudflareのX / SNS 7はこの投稿由来」

X AnalyticsのLink clicksとCloudflare Web AnalyticsのVisitsは定義・期間が違う。

### 同時期に確認した旧ダッシュボード 7D表示

- Page views: 13
- Visits: 11
- Watch pages: 7
- X / SNS: 7
- Pierce Duofon: 7
- Cyma Time-O-Vox: 表示なし
- TOP: 4
- HISTORY: 1
- OWNER'S NOTES: 1

### 問題提起

CYMA関連投稿の直後なのに、7Dダッシュボード上ではPierce Duofon 7のみがWATCHとして表示された。

この時点では以下を区別できないため、マッピング不具合と断定しない。

仮説:
1. 7D集計に過去のDuofon流入が混ざっている
2. Xの2クリックがCloudflareへまだ反映されていない
3. X投稿内リンクの実際のdestinationがCYMAではない
4. beacon読み込み前離脱・ブロック等でX clickとRUM arrivalが一致しない
5. requestPathの表記揺れでCYMAの表示名変換に失敗している
6. 管理者自身のアクセスが初期値へ混在している

### 検証方法

ダッシュボードを以下へ改修する。

- 1H / 3H / 24H / 7D / 30D
- raw requestPathを必ず残す
- URL正規化
- UNMAPPED path警告
- requestPath + refererHost + refererPathの同時集計
- ENTRY SOURCE → PAGE
- SITE FLOW
- raw Referrer host / path
- 管理者ブラウザのCloudflare beacon opt-out

CYMA判定は、
`X referrer → /cyma-time-o-vox/`
が同じ集計行で確認できてから行う。

### 判定保留

現時点では、
「X投稿で2リンククリック発生」
までは確定。

「その2クリックがCYMAへ何件到達したか」は未確認。

## 2026-09-13｜CYMA関連X投稿｜後続スクリーンショット

ユーザー提供のX Post Analyticsスクリーンショットで、2026-09-09のCYMA関連投稿について以下を確認。

- Impressions: 327
- Engagements: 22
- Detail expands: 9
- Link clicks: 11
- Profile visits: 0
- Likes: 2
- Reposts: 0
- Replies: 0

この11 Link clicksはX側指標。CloudflareのCYMA Entry Visitsと同一件数とは扱わない。

## 2026-09-13｜Basis Alarm YouTube Shorts｜継続配布観測

ユーザー提供のYouTube Studioリアルタイムスクリーンショットで以下を確認。

### 過去48時間

- Views: 2,043
- Shorts feed: 97.4%
- Other YouTube features: 1.5%
- YouTube Search: 0.9%
- Channel pages: 0.2%
- Browse features: 0%

### 過去60分

- Views: 12
- Shorts feed: 66.7%
- Other YouTube features: 25.0%
- Browse features: 8.3%

確認済み:
- 大きな初動後も、観測時点で直近60分に再生が発生していた。
- 直近60分でもShorts feed由来が存在した。

言ってはいけないこと:
- 「第3波が確定した」
- 「YouTubeが高評価して再配信した」と内部要因を断定する
- 12再生という小標本からOther YouTube features / Browse featuresの意味を強く解釈する

ユーザー報告では、Basis Shortsの説明欄リンクは新ホスト `https://vintagealarm.github.io/basis-alarm/#owners-note` へ更新済み。これはユーザー操作報告として記録し、YouTube側の公開画面をこのログでは独立検証していない。

## 2026-09-13｜外部AI / Grok｜Pierce Duofon

新規Grok会話でのコールドスタート寄りテストを実施し、VINTAGE ALARMが回答本文の引用元・追加参照先として表示された。

詳細、確認済み範囲、限界、意味保持リスクは `measurement/aio-observation-log.md` を正本とする。

この実験から「Grokで常に引用される」「検索順位1位」「AI内で最上位評価」等は導かない。
