# VINTAGE ALARM — Instagram Insights Time Series

> Instagram Reel Insights の観測時系列正本。2026-09-30復旧。
> `instagram-operations.md` に散在していたInsights実測、引き継ぎで保持されていたWestclox値、会話復旧値を、観測時刻を失わない形へ統合した。
> 最新値で上書きせず、1観測=1 snapshotで追記する。

## 0. 完成条件 / 記録契約

1. 1回のInsights確認を1 snapshotとして残す。
2. `observed_at_jst` を必須とする。時刻範囲しか確定できない場合は範囲、復旧不能なら `unknown`。
3. `published_at_jst` は確認できた場合だけ保存する。Instagram UIの `Age of post` しかない場合は表示値をそのまま残し、公開時刻へ逆算しない。
4. `elapsed_since_publish` は公開日時と観測日時が十分な精度で確認できた場合だけ算出する。
5. 画面で確認できた指標は省略しない。未確認値を0にしない。
6. 後続観測で旧snapshotを上書きしない。
7. 同じ時刻帯の複数画面は、同一観測セットと確認できる場合だけ1 snapshotへ統合する。
8. 異なる観測時刻の値を混ぜない。
9. `source_status` を必ず付ける。
   - `CANONICAL_LOG_SCREENSHOT`: `instagram-operations.md` に「ユーザー提供Instagram Insightsスクリーンショットで確認」と永続化済み。
   - `CANONICAL_LOG_USER_REPORT`: 正本ログにユーザー提供値として永続化済み。
   - `HANDOFF_RECOVERED`: 引き継ぎ文に保持され、main正本へ未永続化だった値。
   - `CONVERSATION_RECOVERED`: 過去会話から回収した値。
   - `DERIVED_FROM_CANONICAL_DELTA`: 正本に旧値がdelta比較の左辺として明記されており、そこから復元した値。
10. `instagram-operations.md` はSNS横断の分析・解釈・VA Analytics突合の履歴として残す。本ファイルはReel Insights数値時系列の正本とし、両者の役割を分離する。
11. 追記後は `npm run check:instagram-insights` で重複・時系列逆転・未統合sidecarを検査し、`npm run instagram:report` で時計別の最新差分と導線率を確認する。
12. 新規snapshotは一時JSONから `npm run instagram:append -- <json-path>` で本ファイルへ直接追記できる。JSONはGit管理せず、正本への追記成功後に破棄する。

## 1. Recovery audit — 2026-09-30

復旧順は `instagram-operations.md` の時系列実測を主根拠とし、そこに無いWestcloxを引き継ぎ記録から補った。旧復旧案にあったCYMA `2026-09-28 17:41 / viewers 1,406` はmain正本と一致しなかったため棄却し、正本の `17:49–17:50 / viewers 1,408` に修正した。Wittnauer `3,425 views / 147 likes` はmain正本・再検索で裏取りできなかったため正本snapshotへ採用しない。

---

# Wittnauer 10WA

## Publication evidence
- published_date_jst: 2026-09-26
- published_time_jst: unknown
- UI age evidence: 2026-09-27 21:24 content listで `Age of post: 22h`
- elapsed_since_publish: exact calculation unavailable
- source_status: CANONICAL_LOG_USER_REPORT + CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-27 12:54頃 JST
- observed_at_jst: 2026-09-27 12:54頃
- views: 164
- viewers: 136
- reels_tab: 78.0%
- explore: 17.0%
- profile: 5.0%
- skip_rate: 43.4%
- share_rate: 0.7%
- save_rate: 1.5%
- source_status: CANONICAL_LOG_USER_REPORT

### Snapshot — 2026-09-27 15:45 JST
- observed_at_jst: 2026-09-27 15:45
- views: 689
- viewers: 499
- likes: 14
- shares: 3
- saves: 4
- source_status: CANONICAL_LOG_USER_REPORT

### Snapshot — 2026-09-27 16:35頃 JST
- observed_at_jst: 2026-09-27 16:35頃
- likes: 25
- comments: 0
- reposts: 1
- shares: 3
- saves: 5
- followers: 0.3%
- non_followers: 99.7%
- age: 13–17 0.4% / 18–24 29.5% / 25–34 44.8% / 35–44 12.0% / 45–54 7.1% / 55–64 4.8% / 65+ 1.4%
- countries: India 36.5% / Turkey 8.5% / United States 4.8% / Mexico 4.5% / Iran 4.2%
- gender: male 99.5% / female 0.5%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-27 18:38 JST
- observed_at_jst: 2026-09-27 18:38
- likes: 36
- comments: 0
- reposts: 1
- shares: 10
- saves: 9
- profile_accesses: 7
- follows: 1
- bio_link_clicks: 1
- followers: 0.2%
- non_followers: 99.8%
- age: 13–17 0.9% / 18–24 30.5% / 25–34 43.3% / 35–44 13.1% / 45–54 6.2% / 55–64 4.2% / 65+ 1.7%
- age_18_34_combined: 73.8%
- countries: India 34.9% / Turkey 9.4% / Iran 4.7% / South Korea 3.3% / United States 3.1%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-27 21:24–21:25 JST
- observed_at_jst: 2026-09-27 21:24–21:25
- age_of_post_display: 22h
- views: 1,787 (content list immediately before detail: 1,786)
- viewers: 1,468
- average_watch_time: 6s
- follows: 2
- likes: 55
- comments: 0
- reposts: 3
- shares: 14
- saves: unknown (18:38 value 9; no new value visible)
- skip_rate: 42.4%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-28 00:03 JST
- observed_at_jst: 2026-09-28 00:03
- views: 2,080
- viewers: 1,661
- average_watch_time: 6s
- follows: 3
- likes: 74
- comments: 1
- reposts: 3
- saves: 17
- skip_rate: 40.9%
- share_rate: 1.1%
- like_rate: 4.4%
- save_rate: 1.0%
- repost_rate: 0.2%
- comment_rate: 0.1%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-28 06:59–07:00 JST
- observed_at_jst: 2026-09-28 06:59–07:00
- views: 2,563
- viewers: 2,094
- average_watch_time: 6s
- follows: 6
- likes: 101
- comments: 1
- reposts: 3
- shares: 25
- saves: 20
- skip_rate: 41.0%
- share_rate: 1.2%
- like_rate: 4.9%
- save_rate: 1.0%
- repost_rate: 0.1%
- comment_rate: 0.0%
- profile_accesses: 29
- bio_link_clicks: 1
- followers: 0.7%
- non_followers: 99.3%
- age: 13–17 0.7% / 18–24 24.5% / 25–34 42.3% / 35–44 16.1% / 45–54 8.1% / 55–64 5.3% / 65+ 3.0%
- age_18_34_combined: 66.8%
- countries: India 27.1% / Turkey 8.3% / France 5.8% / Iran 4.6% / United States 3.8%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-28 17:35–17:37 JST
- observed_at_jst: 2026-09-28 17:35–17:37
- views: 2,744
- viewers: 2,225
- average_watch_time: 6s
- follows: 12
- likes: 112
- comments: 1
- reposts: 3
- saves: 23
- share_count: UI `--`
- skip_rate: 41.2%
- share_rate: 1.1%
- like_rate: 5.0%
- save_rate: 1.0%
- repost_rate: 0.1%
- comment_rate: 0.0%
- profile_accesses: 31
- bio_link_clicks: 2
- followers: 0.7%
- non_followers: 99.3%
- age: 13–17 0.7% / 18–24 24.2% / 25–34 41.7% / 35–44 16.3% / 45–54 8.6% / 55–64 5.4% / 65+ 3.2%
- age_18_34_combined: 65.9%
- countries: India 26.2% / Turkey 8.2% / France 5.6% / Iran 4.5% / United States 4.4%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-29 06:13 JST
- observed_at_jst: 2026-09-29 06:13
- views: 2,998
- viewers: 2,411
- average_watch_time: 6s
- follows: 13
- likes: 124
- comments: 1
- reposts: 4
- saves: 23
- share_count: UI `--`
- skip_rate: 42.1%
- share_rate: 1.2%
- like_rate: 5.1%
- save_rate: 0.9%
- repost_rate: 0.2%
- comment_rate: 0.0%
- profile_accesses: 37
- bio_link_clicks: 2
- followers: 0.7%
- non_followers: 99.3%
- age: 13–17 0.6% / 18–24 23.6% / 25–34 41.2% / 35–44 16.9% / 45–54 9.0% / 55–64 5.6% / 65+ 3.1%
- age_18_34_combined: 64.8%
- countries: India 25.1% / Turkey 8.1% / France 5.7% / United States 4.5% / Iran 4.4%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-29 17:57 JST
- observed_at_jst: 2026-09-29 17:57
- views: 3,106
- viewers: 2,480
- average_watch_time: 6s
- follows: 13
- likes: 128
- comments: 1
- reposts: 4
- saves: 23
- share_count: UI `--`
- skip_rate: 42.6%
- share_rate: 1.1%
- like_rate: 5.1%
- save_rate: 0.9%
- repost_rate: 0.2%
- comment_rate: 0.0%
- profile_accesses: 42
- bio_link_clicks: 2
- followers: 0.9%
- non_followers: 99.1%
- age: 13–17 0.6% / 18–24 23.1% / 25–34 41.1% / 35–44 17.1% / 45–54 9.5% / 55–64 5.6% / 65+ 3.1%
- age_18_34_combined: 64.2%
- countries: India 24.2% / Turkey 8.1% / France 5.7% / United States 5.0% / Iran 4.4%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-30 22:10 JST
- observed_at_jst: 2026-09-30 22:10
- views: 3,445
- viewers: 2,683
- average_watch_time: 6s
- follows: 15
- likes: 148
- comments: 1
- reposts: 4
- saves: 28
- share_count: UI `--`
- skip_rate: 43.0%
- share_rate: 1.1%
- like_rate: 5.4%
- save_rate: 1.0%
- repost_rate: 0.1%
- comment_rate: 0.0%
- profile_accesses: 47
- bio_link_clicks: 2
- followers: 1.2%
- non_followers: 98.8%
- age: 13–17 0.5% / 18–24 23.3% / 25–34 40.3% / 35–44 17.4% / 45–54 10.0% / 55–64 5.4% / 65+ 3.0%
- age_18_34_combined: 63.6%
- countries: India 22.6% / Turkey 7.6% / France 6.8% / United States 5.1% / Iran 4.3%
- source_status: CANONICAL_LOG_SCREENSHOT
- note: 2026-09-30 22:10 JSTのユーザー提供Instagram Insightsスクリーンショット6枚から確認。共有数は画面上 `--` のため数値化しない。

### Snapshot — 2026-10-03 10:18 JST — static carousel follow-up
- observed_at_jst: 2026-10-03 10:18
- content_id: wittnauer-10wa-static-2026-10-03
- content_type: static_carousel_2_images
- published_at_jst: approximately 2026-10-03 07:30 (user report)
- elapsed_since_publish: approximately 2h48m
- views: 10
- viewers: 6
- follows: 0
- likes: 1
- comments: 0
- reposts: 0
- share_count: UI `--`
- saves: 0
- profile_accesses: UI `--`
- followers: 100.0%
- non_followers: 0.0%
- image_like_counts: first image 1 / second image 0
- top_source_visible: Feed (share not visible)
- source_status: CANONICAL_LOG_SCREENSHOT + USER_REPORTED_PUBLICATION_TIME
- note: 2026-10-03 10:18 JSTのユーザー提供Instagram Post Insightsスクリーンショット3枚と投稿画面1枚から確認。ユーザー報告の公開時刻は07:30頃。2枚の静止画カルーセルで、1枚目はユーザー指定のポケショ、2枚目はCal.10WAムーブメント。年齢・国・性別はアクション100未満のためUI上利用不可。共有数とプロフィールアクセスは `--` のため0扱いしない。

### Snapshot — 2026-10-03 20:24 JST — static carousel follow-up
- observed_at_jst: 2026-10-03 20:24
- content_id: wittnauer-10wa-static-2026-10-03
- content_type: static_carousel_2_images
- published_at_jst: approximately 2026-10-03 07:30 (user report)
- elapsed_since_publish: approximately 12h54m
- views: 22
- viewers: 12
- follows: 0
- likes: 3
- comments: 0
- reposts: 0
- share_count: UI `--`
- saves: 0
- profile_accesses: UI `--`
- followers: 100.0%
- non_followers: 0.0%
- image_like_counts: first image UI 4 / second image UI 0
- source_status: CANONICAL_LOG_SCREENSHOT + USER_REPORTED_PUBLICATION_TIME
- note: 2026-10-03 20:24 JSTのユーザー提供Instagram Post Insightsスクリーンショット4枚から確認。全体likesは3だが画像別UIは1枚目4 / 2枚目0と表示され不一致のため別指標として保存する。non-follower推移グラフは0のまま。共有数とプロフィールアクセスは `--` のため0扱いしない。

### Snapshot — 2026-10-09 11:53 JST — Wittnauer × CYMA sound comparison
- observed_at_jst: 2026-10-09 11:53
- content_id: IG-WIT-CYM-001
- content_type: reel_cross_watch_gong_sound_comparison
- published_at_jst: unknown
- elapsed_since_publish: unknown
- reel_duration: approximately 31s, from 0:00–0:31 like-timing graph; exact file duration not verified
- views: 1,231
- viewers: 1,229
- average_watch_time: UI `--`
- follows: 1
- likes: 50
- comments: 0
- reposts: 0
- shares: UI `--`
- share_count: UI `--`
- saves: 9
- skip_rate: 35.4%
- share_rate: 0.3%
- like_rate: 4.5%
- save_rate: 0.8%
- repost_rate: 0.0%
- comment_rate: 0.0%
- profile_accesses: 6
- bio_link_clicks: 1
- followers: 1.6%
- non_followers: 98.4%
- age: 13–17 1.1% / 18–24 35.2% / 25–34 45.2% / 35–44 11.3% / 45–54 4.1% / 55–64 1.2% / 65+ 1.9%
- age_18_34_combined: 80.4%
- countries: India 33.4% / United States 12.5% / Turkey 5.7% / Brazil 4.3% / Iran 4.1%
- source_status: CANONICAL_LOG_SCREENSHOT + USER_REPORTED_MEDIA_TIMING
- note: 2026-10-09 11:53 JSTのユーザー提供Instagram Reel Insightsスクリーンショット6枚に基づく。対象はWittnauer 10WAとCYMA Time-O-Vox 18K Chronomètreのゴング式アラーム音比較Reel（比較投稿のためWittnauer欄に1つだけ記録し、CYMAにも重複して追加しない）。映像プレビューには両機の名称が表示。ユーザー説明によればCYMAの鳴動は動画18秒から。Instagram UI評価はskip率「低」、share率・like率・save率「高」、repost率・comment率「低」。いいねされた時の0:00–0:31グラフは無ラベルの山形のため各秒の値は確定しない。正確な投稿日時・公開キャプション全文・平均再生時間・公開画面の共有件数は未確認。

### Snapshot — 2026-10-09 22:45 JST — Wittnauer × CYMA sound comparison
- observed_at_jst: 2026-10-09 22:45
- content_id: IG-WIT-CYM-001
- content_type: reel_cross_watch_gong_sound_comparison
- published_at_jst: unknown
- age_of_post: UI 15時間前 (not exact)
- elapsed_since_publish: unknown
- views: 2,154
- viewers: 1,845
- average_watch_time: 8s
- follows: 7
- likes: 107
- comments: 0
- reposts: 1
- shares: 7
- saves: 19
- source_status: CANONICAL_LOG_SCREENSHOT
- share_count: public post 7 / Reel Insights UI `--`
- skip_rate: 39.7%
- share_rate: 0.4%
- like_rate: 5.7%
- save_rate: 1.0%
- repost_rate: 0.1%
- comment_rate: 0.0%
- profile_accesses: 17
- bio_link_clicks: 1
- followers: 2.0%
- non_followers: 98.0%
- age: 13–17 0.8% / 18–24 30.4% / 25–34 42.2% / 35–44 14.1% / 45–54 6.8% / 55–64 3.5% / 65+ 2.2%
- age_18_34_combined: 72.6%
- countries: India 28.7% / United States 9.0% / Turkey 5.0% / Iran 4.9% / France 3.7%
- note: Instagram public post and Insights screenshot set of 7 at 2026-10-09 22:45 JST. Public UI shows 15 hours ago without precise publication time. Public paper-plane share count is 7; Insights share count UI is unavailable. UI labels: skip LOW; share, like, save, repost HIGH; comment LOW. Like-timing chart 0:00–0:31 is not audience retention or 18s reach. Published caption opening is visible but full caption and hashtags are not screenshot-verified.

---

# CYMA Time-O-Vox 18K Chronomètre

## Publication evidence
- published_at_jst: unknown
- UI age evidence: 2026-09-27 21:24 content listで `Age of post: 10h`
- elapsed_since_publish: exact calculation unavailable
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-27 12:53頃 JST
- observed_at_jst: 2026-09-27 12:53頃
- views: 141
- viewers: 92
- reel_duration: 23s
- average_watch_time: 4s
- skip_rate: 49.2%
- like_rate: 6.2%
- reels_tab: 69.4%
- explore: 22.2%
- feed: 8.3%
- source_status: CANONICAL_LOG_USER_REPORT

### Snapshot — 2026-09-27 15:45 JST
- observed_at_jst: 2026-09-27 15:45
- views: 232
- viewers: 200
- likes: 12
- shares: 1
- saves: 0
- reposts: 1
- follows: 1
- source_status: CANONICAL_LOG_USER_REPORT

### Snapshot — 2026-09-27 16:36頃 JST
- observed_at_jst: 2026-09-27 16:36頃
- likes: 13
- comments: 0
- reposts: 1
- shares: 1
- saves: 0
- followers: 1.0%
- non_followers: 99.0%
- age: 13–17 2.2% / 18–24 32.9% / 25–34 37.2% / 35–44 10.8% / 45–54 9.4% / 55–64 6.1% / 65+ 1.4%
- age_18_34_combined: 70.1%
- countries: India 17.0% / United States 12.3% / Iran 7.6% / Mexico 7.2% / Brazil 4.7%
- gender: male 98.6% / female 1.4%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-27 18:38 JST
- observed_at_jst: 2026-09-27 18:38
- likes: 20
- comments: 0
- reposts: 1
- shares: 1
- saves: 0
- profile_accesses: 2
- follows: 1
- bio_link_clicks: 1
- followers: 0.6%
- non_followers: 99.4%
- age: 13–17 1.3% / 18–24 33.1% / 25–34 39.0% / 35–44 12.6% / 45–54 7.4% / 55–64 4.4% / 65+ 2.3%
- age_18_34_combined: 72.1%
- countries: India 24.0% / Turkey 8.7% / Iran 6.9% / United States 6.6% / Mexico 4.4%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-27 21:24–21:25 JST
- observed_at_jst: 2026-09-27 21:24–21:25
- age_of_post_display: 10h
- views: 1,177 (content list immediately before detail: 1,175)
- viewers: 987
- average_watch_time: 7s
- follows: 1
- profile_accesses: 3
- bio_link_clicks: 1
- likes: 35
- comments: 0
- reposts: 1
- saves: 5
- shares: content-list 3 / detailed panel `--`
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-28 00:03 JST
- observed_at_jst: 2026-09-28 00:03
- views: 1,394
- viewers: 1,205
- average_watch_time: 7s
- follows: 2
- likes: 42
- comments: 0
- reposts: 1
- saves: 6
- skip_rate: 52.6%
- share_rate: 0.2%
- like_rate: 3.4%
- save_rate: 0.5%
- repost_rate: 0.1%
- comment_rate: 0.0%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-28 06:59–07:00 JST
- observed_at_jst: 2026-09-28 06:59–07:00
- views: 1,553
- viewers: 1,357
- average_watch_time: 7s
- follows: 2
- likes: 53
- comments: 1
- reposts: 1
- shares: 3
- saves: 6
- skip_rate: 53.7%
- share_rate: 0.2%
- like_rate: 3.9%
- save_rate: 0.4%
- repost_rate: 0.1%
- comment_rate: 0.1%
- profile_accesses: 8
- bio_link_clicks: 1
- followers: 1.0%
- non_followers: 99.0%
- age: 13–17 0.7% / 18–24 27.3% / 25–34 35.0% / 35–44 14.6% / 45–54 10.1% / 55–64 6.8% / 65+ 5.5%
- age_18_34_combined: 62.3%
- countries: India 18.7% / France 8.5% / Turkey 8.0% / Iran 5.7% / Italy 5.3%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-28 17:49–17:50 JST
- observed_at_jst: 2026-09-28 17:49–17:50
- views: 1,609
- viewers: 1,408
- average_watch_time: 7s
- follows: 2
- likes: 57
- comments: 1
- reposts: 1
- saves: 6
- share_count: UI `--`
- skip_rate: 53.8%
- share_rate: 0.2%
- like_rate: 4.0%
- save_rate: 0.4%
- repost_rate: 0.1%
- comment_rate: 0.1%
- profile_accesses: 10
- bio_link_clicks: 1
- followers: 1.1%
- non_followers: 98.9%
- age: 13–17 0.7% / 18–24 26.8% / 25–34 34.8% / 35–44 15.0% / 45–54 10.2% / 55–64 7.0% / 65+ 5.5%
- age_18_34_combined: 61.6%
- countries: India 18.1% / France 8.4% / Turkey 7.9% / Iran 5.8% / Italy 5.3%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-29 06:13–06:14 JST
- observed_at_jst: 2026-09-29 06:13–06:14
- views: 1,678
- viewers: 1,468
- average_watch_time: 7s
- follows: 2
- likes: 61
- comments: 2
- reposts: 1
- saves: 6
- share_count: UI `--`
- skip_rate: 53.9%
- share_rate: 0.2%
- like_rate: 4.1%
- save_rate: 0.4%
- repost_rate: 0.1%
- comment_rate: 0.1%
- profile_accesses: 10
- bio_link_clicks: 1
- followers: 1.1%
- non_followers: 98.9%
- age: 13–17 0.7% / 18–24 26.7% / 25–34 34.9% / 35–44 14.9% / 45–54 10.4% / 55–64 7.1% / 65+ 5.2%
- age_18_34_combined: 61.6%
- countries: India 18.4% / France 8.7% / Turkey 7.9% / Iran 5.7% / Italy 5.3%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-29 17:57–17:58 JST
- observed_at_jst: 2026-09-29 17:57–17:58
- views: 1,712
- viewers: 1,503
- average_watch_time: 7s
- follows: 2
- likes: 65
- comments: 2
- reposts: 1
- saves: 6
- share_count: UI `--`
- skip_rate: 53.7%
- share_rate: 0.2%
- like_rate: 4.3%
- save_rate: 0.4%
- repost_rate: 0.1%
- comment_rate: 0.1%
- profile_accesses: 10
- bio_link_clicks: 1
- followers: 1.3%
- non_followers: 98.7%
- age: 13–17 0.7% / 18–24 26.2% / 25–34 35.0% / 35–44 15.2% / 45–54 10.7% / 55–64 7.1% / 65+ 5.1%
- age_18_34_combined: 61.2%
- countries: India 18.1% / France 8.7% / Turkey 7.8% / Iran 5.7% / Italy 5.2%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-30 22:12 JST
- observed_at_jst: 2026-09-30 22:12
- views: 1,772
- viewers: 1,539
- average_watch_time: 7s
- follows: 2
- likes: 68
- comments: 2
- reposts: 1
- saves: 6
- share_count: UI `--`
- skip_rate: 53.3%
- share_rate: 0.3%
- like_rate: 4.4%
- save_rate: 0.4%
- repost_rate: 0.1%
- comment_rate: 0.1%
- profile_accesses: 10
- bio_link_clicks: 1
- followers: 1.6%
- non_followers: 98.4%
- age: 13–17 0.7% / 18–24 25.8% / 25–34 34.8% / 35–44 15.3% / 45–54 10.9% / 55–64 7.3% / 65+ 5.2%
- age_18_34_combined: 60.6%
- countries: India 18.1% / France 8.6% / Turkey 7.6% / Iran 5.6% / Italy 5.3%
- source_status: CANONICAL_LOG_SCREENSHOT
- note: 2026-09-30 22:12 JSTのユーザー提供Instagram Insightsスクリーンショット6枚から確認。共有数は画面上 `--` のため数値化しない。


### Snapshot — 2026-10-07 06:34 JST — CYMA Edits still-image Reel
- observed_at_jst: 2026-10-07 06:34
- content_id: IG-CYM-002
- content_type: reel_still_image_with_bgm_edits
- published_at_jst: approximately 2026-10-07 05:40 (user report)
- elapsed_since_publish: approximately 54m
- views: 107
- viewers: 86
- average_watch_time: 2s
- follows: 0
- likes: 2
- comments: 0
- reposts: 0
- shares: unknown
- saves: 0
- source_status: CANONICAL_LOG_SCREENSHOT + USER_REPORTED_PUBLICATION_TIME
- reel_duration: approximately 9s (like-timing graph 0:00–0:09)
- share_count: UI `--`
- skip_rate: 75.0%
- share_rate: 0.0%
- like_rate: 2.1%
- save_rate: 0.0%
- repost_rate: 0.0%
- comment_rate: 0.0%
- followers: 4.7%
- non_followers: 95.3%
- note: 2026-10-07 06:34 JST user-supplied public caption and Insights screenshots. The user converted a CYMA side-profile still image to a Reel with BGM using Edits. A post screen shortly before the Insights displayed 101 views; Insights showed 107. Instagram rated skip HIGH and all displayed interaction rates LOW. Profile actions and demographics were unavailable rather than zero. The 2026-10-10 00:31 profile grid later showed 161 views; see instagram-operations.md.

### Snapshot — 2026-10-19 19:04–19:05 JST — CYMA macro Reel
- observed_at_jst: 2026-10-19 19:04–19:05
- content_id: IG-CYM-003
- published_at_jst: 2026-10-19 around 17:00 (USER_REPORT, minute unknown)
- elapsed_since_publish: approximately 2 hours, uncertain
- reel_duration: 33.0s (source MP4)
- views: 628
- viewers: 375
- average_watch_time: 7s
- likes: 12
- comments: 0
- reposts: 1
- shares: UI `--` (unknown count)
- saves: 1
- follows: 0
- profile_accesses: 3
- skip_rate: 31.2%
- share_rate: 0.0%
- like_rate: 2.2%
- save_rate: 0.2%
- repost_rate: 0.2%
- comment_rate: 0.0%
- followers: 4.5%
- non_followers: 95.5%
- age: 13–17 3.8% / 18–24 36.0% / 25–34 42.0% / 35–44 8.8% / 45–54 4.9% / 55–64 2.0% / 65+ 2.5%
- age_18_34_combined: 78.0%
- countries: India 45.6% / Turkey 15.1% / France 4.9% / Spain 2.7% / Japan 2.5%
- top_source_reels_tab_pct: 77.8
- top_source_explore_pct: 16.4
- top_source_feed_pct: 5.8
- instagram_labels: skip LOW, share LOW, like LOW, save LOW, repost HIGH, comment LOW
- usual_reel_chart: Reel above account usual-Reel dashed line at ~2h in UI; exact comparator unknown
- retention_curve: major early drop then low tail until ~33s; exact points unverified
- video_observation: macro 6 o'clock small seconds at start; aged dial and operating hands in middle; side profile about 28s; display-back movement about 31s. AAC audio exists; alarm onset not independently verified.
- caption_confirmation: opening text until 'Then comes the gong. Its clear, bright tone has earned' only; unseen continuation/hashtags unknown
- source_status: CANONICAL_LOG_SCREENSHOT + USER_REPORTED_APPROXIMATE_PUBLICATION_TIME + USER_VIDEO_FILE_CHECK
- screenshot_evidence: IMG_3199.jpeg; IMG_3200.png; IMG_3201.png; IMG_3202.png; IMG_3203.png; IMG_3204.png; IMG_3205.png; IMG_3206.png
- video_evidence: A11CE39E-6AF8-443F-8A56-B2EDAED0E3E2(1).mp4 (33.0s, H.264 512×910, AAC)
- note: Own-post and Insights both displayed 628. User supplied approximate 17:00 posting time; no exact timestamp. Shares count unknown despite displayed 0.0% share rate.

### Snapshot — 2026-10-20 06:37 JST — CYMA macro Reel (~13h37m)
- observed_at_jst: 2026-10-20 06:37
- content_id: IG-CYM-003
- published_at_jst: 2026-10-19 around 17:00 (USER_REPORT, exact minute unknown)
- elapsed_since_publish: approximately 13h37m (estimated from user-reported post time)
- reel_duration: 33.0s
- views: 1269
- viewers: 1091
- average_watch_time: 6s
- likes: 27
- comments: 0
- reposts: 1
- shares: UI `--` (count unknown)
- saves: 2
- follows: 0
- profile_accesses: 9
- skip_rate: 50.4%
- share_rate: 0.0%
- like_rate: 2.4%
- save_rate: 0.2%
- repost_rate: 0.1%
- comment_rate: 0.0%
- followers: 3.7%
- non_followers: 96.3%
- age: 13–17 4.1% / 18–24 36.3% / 25–34 39.3% / 35–44 9.9% / 45–54 4.5% / 55–64 3.2% / 65+ 2.7%
- age_18_34_combined: 75.6%
- countries: India 47.2% / Turkey 11.9% / France 3.3% / Italy 2.4% / Brazil 1.8%
- top_source_reels_tab_pct: 77.2
- top_source_explore_pct: 17.7
- top_source_feed_pct: 4.4
- top_source_profile_pct: 0.5
- instagram_labels: skip HIGH / share LOW / like LOW / save LOW / repost HIGH / comment LOW
- usual_reel_chart: purple Reel curve plateaued around 1.27k by approximately 13h while gray dashed usual-Reel line continued upward; comparison is qualitative.
- retention_curve: sharp drop in opening seconds, gradually falling to low single-digit percentage near end; graph-derived precise percentages unknown
- source_status: CANONICAL_LOG_SCREENSHOT
- screenshot_evidence: IMG_3208.jpeg; IMG_3209.png; IMG_3210.png; IMG_3211.png; IMG_3212.png; IMG_3213.png; IMG_3214.png; IMG_3215.png
- note: Own-post overlay displayed 1,268 views and 27 likes; Insights displayed 1,269 views and 27 likes at ~06:37. Separate UI surfaces, not sequential observations. Earlier 19:04 snapshot had 628 views/375 viewers; later snapshot shows 1,269 views/1,091 viewers. Avoid inferring replays or converting viewers-vs-views discrepancy into a causal story.

---

# Pierce Duofon

## Publication evidence
- published_at_jst: 2026-09-28 08:07
- reel_duration: 10.97s
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-28 11:00 JST
- observed_at_jst: 2026-09-28 11:00
- elapsed_since_publish: 2h53m
- views: 275
- viewers: 168
- average_watch_time: 6s
- follows: 0
- likes: 5
- comments: 0
- reposts: 0
- shares: 0
- saves: 1
- skip_rate: 41.2%
- share_rate: 0.0%
- like_rate: 2.3%
- save_rate: 0.5%
- repost_rate: 0.0%
- comment_rate: 0.0%
- profile_accesses: unknown
- bio_link_clicks: unknown
- followers: 2.7%
- non_followers: 97.3%
- age: 13–17 0.0% / 18–24 32.7% / 25–34 45.2% / 35–44 13.9% / 45–54 3.4% / 55–64 2.4% / 65+ 2.4%
- age_18_34_combined: 77.9%
- countries: United States 15.3% / India 7.2% / United Kingdom 6.2% / Turkey 5.7% / Spain 5.3%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-28 13:04–13:05 JST
- observed_at_jst: 2026-09-28 13:04–13:05
- elapsed_since_publish: 4h57m–4h58m
- views: 1,421
- viewers: 993
- average_watch_time: 6s
- follows: 0
- likes: 30
- comments: 0
- reposts: 1
- shares: summary `--`
- saves: 5
- skip_rate: 42.0%
- share_rate: 0.6%
- like_rate: 2.8%
- save_rate: 0.5%
- repost_rate: 0.1%
- comment_rate: 0.0%
- profile_accesses: 2
- followers: 0.8%
- non_followers: 99.2%
- age: 13–17 2.0% / 18–24 39.2% / 25–34 43.0% / 35–44 9.4% / 45–54 3.2% / 55–64 1.6% / 65+ 1.7%
- age_18_34_combined: 82.2%
- countries: India 28.6% / United States 15.5% / Mexico 5.1% / Brazil 4.8% / Canada 4.3%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-28 13:58–14:00 JST
- observed_at_jst: 2026-09-28 13:58–14:00
- elapsed_since_publish: 5h51m–5h53m
- views: 1,640
- viewers: 1,136
- average_watch_time: 7s
- follows: 0
- likes: 34
- comments: 0
- reposts: 1
- saves: 5
- share_count: UI `--`
- skip_rate: 40.7%
- share_rate: 0.5%
- like_rate: 2.8%
- save_rate: 0.4%
- repost_rate: 0.1%
- comment_rate: 0.0%
- profile_accesses: 4
- followers: 0.7%
- non_followers: 99.3%
- age: 13–17 1.8% / 18–24 38.5% / 25–34 42.3% / 35–44 9.4% / 45–54 4.2% / 55–64 2.2% / 65+ 1.5%
- age_18_34_combined: 80.8%
- countries: India 29.0% / United States 14.5% / Mexico 5.2% / Brazil 4.4% / Canada 4.0%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-28 17:35–17:37 JST
- observed_at_jst: 2026-09-28 17:35–17:37
- elapsed_since_publish: 9h28m–9h30m
- views: 1,897
- viewers: 1,378
- average_watch_time: 7s
- follows: 0
- likes: 39
- comments: 0
- reposts: 1
- saves: 5
- share_count: UI `--`
- skip_rate: 43.5%
- share_rate: 0.4%
- like_rate: 2.8%
- save_rate: 0.4%
- repost_rate: 0.1%
- comment_rate: 0.0%
- profile_accesses: 5
- followers: 0.9%
- non_followers: 99.1%
- age: 13–17 1.6% / 18–24 35.8% / 25–34 41.6% / 35–44 10.1% / 45–54 5.7% / 55–64 3.0% / 65+ 2.1%
- age_18_34_combined: 77.4%
- countries: India 28.2% / United States 12.3% / Mexico 4.6% / Iran 4.3% / Brazil 3.7%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-29 06:15 JST
- observed_at_jst: 2026-09-29 06:15
- elapsed_since_publish: 22h08m
- views: 2,339
- viewers: 1,679
- average_watch_time: 7s
- follows: 3
- likes: 61
- comments: 2
- reposts: 1
- saves: 8
- skip_rate: 43.6%
- share_rate: 0.3%
- like_rate: 3.5%
- save_rate: 0.5%
- repost_rate: 0.1%
- comment_rate: 0.1%
- profile_accesses: 15
- followers: 0.9%
- non_followers: 99.1%
- age: 13–17 1.5% / 18–24 31.7% / 25–34 38.3% / 35–44 11.8% / 45–54 8.4% / 55–64 4.7% / 65+ 3.7%
- age_18_34_combined: 70.0%
- countries: India 26.2% / United States 10.4% / Iran 5.6% / Mexico 3.8% / Canada 3.3%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-29 18:07–18:08 JST
- observed_at_jst: 2026-09-29 18:07–18:08
- elapsed_since_publish: 34h00m–34h01m
- views: 2,557
- viewers: 1,852
- average_watch_time: 7s
- follows: 5
- likes: 71
- comments: 2
- reposts: 1
- saves: 10
- share_count: UI `--`
- skip_rate: 43.9%
- share_rate: 0.3%
- like_rate: 3.8%
- save_rate: 0.5%
- repost_rate: 0.1%
- comment_rate: 0.1%
- profile_accesses: 17
- bio_link_clicks: 1
- followers: 0.9%
- non_followers: 99.1%
- age: 13–17 1.4% / 18–24 31.4% / 25–34 37.9% / 35–44 11.7% / 45–54 8.8% / 55–64 4.9% / 65+ 4.0%
- age_18_34_combined: 69.3%
- countries: India 25.6% / United States 9.8% / Iran 5.7% / Mexico 3.7% / Turkey 3.6%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-30 22:12–22:13 JST
- observed_at_jst: 2026-09-30 22:12–22:13
- elapsed_since_publish: 62h05m–62h06m
- views: 2,815
- viewers: 2,028
- average_watch_time: 7s
- follows: 10
- likes: 86
- comments: 3
- reposts: 1
- saves: 10
- share_count: UI `--`
- skip_rate: 44.2%
- share_rate: 0.3%
- like_rate: 4.1%
- save_rate: 0.5%
- repost_rate: 0.0%
- comment_rate: 0.1%
- profile_accesses: 25
- bio_link_clicks: 2
- followers: 1.2%
- non_followers: 98.8%
- age: 13–17 1.2% / 18–24 29.8% / 25–34 37.1% / 35–44 12.4% / 45–54 9.7% / 55–64 5.6% / 65+ 4.2%
- age_18_34_combined: 66.9%
- countries: India 25.3% / United States 9.0% / Iran 5.7% / Turkey 3.9% / Mexico 3.4%
- source_status: CANONICAL_LOG_SCREENSHOT
- note: 2026-09-30 22:12–22:13 JSTのユーザー提供Instagram Insightsスクリーンショット6枚から確認。共有数は画面上 `--` のため数値化しない。

## Mechanism follow-up — MR-PIE-001

### Publication evidence
- content_id: MR-PIE-001
- content_type: reel_internal_alarm_mechanism
- published_at_jst: approximately 2026-10-05 08:30 (user report)
- ui_age_evidence: 2026-10-05 09:22 JSTの投稿画面で「58分前」表示
- source_status: CANONICAL_LOG_SCREENSHOT + USER_REPORTED_PUBLICATION_TIME

### Snapshot — 2026-10-05 09:21–09:22 JST
- observed_at_jst: 2026-10-05 09:21–09:22
- elapsed_since_publish: approximately 52m by user report / UI age 58m
- views: 194
- viewers: 33
- average_watch_time: 5s
- follows: 0
- likes: 6
- comments: 0
- reposts: 0
- share_count: UI `--`
- saves: 2
- skip_rate: 12.9%
- share_rate: 1.7%
- like_rate: 5.2%
- save_rate: 1.7%
- repost_rate: 0.0%
- comment_rate: 0.0%
- followers: 4.6%
- non_followers: 95.4%
- source_status: CANONICAL_LOG_SCREENSHOT + USER_REPORTED_PUBLICATION_TIME
- note: 2026-10-05 09:21–09:22 JSTのユーザー提供Instagram投稿画面／Reel Insights 5枚から確認。共有数はUI上 `--` のため0扱いしない。

### Snapshot — 2026-10-05 16:03 JST
- observed_at_jst: 2026-10-05 16:03
- elapsed_since_publish: approximately 7h33m by user-reported ~08:30 publication time; exact publication minute remains unresolved
- views: 3,264
- viewers: 1,840
- average_watch_time: 6s
- follows: 2
- likes: 51
- comments: 2
- reposts: 0
- share_count: UI `--`
- saves: 10
- skip_rate: 37.0%
- share_rate: 0.6%
- like_rate: 2.7%
- save_rate: 0.5%
- repost_rate: 0.0%
- comment_rate: 0.1%
- profile_accesses: 10
- bio_link_clicks: 3
- followers: 1.6%
- non_followers: 98.4%
- age: 13–17 1.5% / 18–24 27.4% / 25–34 43.7% / 35–44 15.7% / 45–54 6.7% / 55–64 2.9% / 65+ 2.1%
- age_18_34_combined: 71.1%
- countries: United States 19.9% / India 15.5% / Brazil 6.2% / Mexico 5.6% / South Korea 5.4%
- source_status: CANONICAL_LOG_SCREENSHOT + USER_REPORTED_PUBLICATION_TIME
- note: 2026-10-05 16:03 JST user-provided Reel Insights screenshots; share count is UI `--`, not zero; like-timing graph has no exact point labels, so no point values are transcribed.

### Snapshot — 2026-10-05 19:57 JST
- observed_at_jst: 2026-10-05 19:57
- elapsed_since_publish: approximately 11h27m by user-reported ~08:30 publication time; exact publication minute remains unresolved
- views: 3,842
- viewers: 2,157
- average_watch_time: 6s
- follows: 4
- likes: 72
- comments: 2
- reposts: 0
- share_count: UI `--`
- saves: 12
- skip_rate: 37.5%
- share_rate: 0.5%
- like_rate: 3.3%
- save_rate: 0.5%
- repost_rate: 0.0%
- comment_rate: 0.1%
- profile_accesses: 12
- bio_link_clicks: 3
- followers: 1.7%
- non_followers: 98.3%
- age: 13–17 1.7% / 18–24 27.5% / 25–34 43.0% / 35–44 15.7% / 45–54 6.9% / 55–64 3.1% / 65+ 2.2%
- age_18_34_combined: 70.5%
- countries: United States 17.1% / India 14.6% / Brazil 5.2% / South Korea 4.9% / Mexico 4.7%
- source_status: CANONICAL_LOG_SCREENSHOT + USER_REPORTED_PUBLICATION_TIME
- note: 2026-10-05 19:57 JSTのユーザー提供Instagram Reel Insightsスクリーンショット6枚から確認。共有数はUI上 `--` のため0扱いしない。Meta UI表示は skip rate=低、share rate=高、like rate=低、save rate=高、repost rate=低、comment rate=低。『リール動画が「いいね！」された時』グラフは0:00–0:05の形状のみ確認でき、各点の厳密な数値ラベルがないため数値化しない。

### Snapshot — 2026-10-06 06:16 JST
- observed_at_jst: 2026-10-06 06:16
- elapsed_since_publish: approximately 21h46m by user-reported ~08:30 publication time; exact publication minute remains unresolved
- views: 5,155
- viewers: 2,903
- average_watch_time: 6s
- follows: 7
- likes: 106
- comments: 5
- reposts: 0
- share_count: UI `--`
- saves: 16
- skip_rate: 37.9%
- share_rate: 0.4%
- like_rate: 3.6%
- save_rate: 0.5%
- repost_rate: 0.0%
- comment_rate: 0.2%
- profile_accesses: 15
- bio_link_clicks: 3
- followers: 1.5%
- non_followers: 98.5%
- age: 13–17 1.8% / 18–24 27.7% / 25–34 42.1% / 35–44 15.6% / 45–54 6.9% / 55–64 3.4% / 65+ 2.6%
- age_18_34_combined: 69.8%
- countries: United States 13.8% / India 12.5% / France 7.2% / Italy 4.4% / Brazil 4.1%
- source_status: CANONICAL_LOG_SCREENSHOT + USER_REPORTED_PUBLICATION_TIME
- note: 2026-10-06 06:16 JSTのユーザー提供Instagram Reel Insightsスクリーンショット6枚から確認。共有数はUI上 `--` のため0扱いしない。Meta UI表示は skip rate=低、share rate=高、like rate=低、save rate=高、repost rate=低、comment rate=高。『リール動画が「いいね！」された時』グラフは0:00–0:05の形状のみ確認でき、各点の厳密な数値ラベルがないため数値化しない。06:17の投稿画面には別タイミングの公開カウンタが見えるが、このsnapshotは06:16 Insights値を正本とする。

### Snapshot — 2026-10-07 07:06–07:07 JST
- observed_at_jst: 2026-10-07 07:06–07:07
- elapsed_since_publish: approximately 46h36m–46h37m by user-reported ~08:30 publication time; exact publication minute remains unresolved
- views: 6,143
- viewers: 3,402
- average_watch_time: 6s
- follows: 8
- likes: 127
- comments: 5
- reposts: 1
- share_count: detailed Insights UI `--` / public post UI 15
- saves: 23
- skip_rate: 38.4%
- share_rate: 0.4%
- like_rate: 3.7%
- save_rate: 0.7%
- repost_rate: 0.0%
- comment_rate: 0.1%
- profile_accesses: 16
- bio_link_clicks: 3
- followers: 2.2%
- non_followers: 97.8%
- age: 13–17 2.0% / 18–24 27.7% / 25–34 41.5% / 35–44 15.4% / 45–54 6.8% / 55–64 3.8% / 65+ 2.8%
- age_18_34_combined: 69.2%
- countries: United States 13.2% / India 11.4% / France 8.5% / Italy 4.9% / Turkey 4.2%
- source_status: CANONICAL_LOG_SCREENSHOT + USER_REPORTED_PUBLICATION_TIME
- note: 2026-10-07 07:06–07:07 JSTのユーザー提供Instagram公開投稿画面＋Reel Insightsスクリーンショット7枚から確認。公開投稿画面の紙飛行機アイコン横に共有数15を確認できるため、詳細Insights側の `--` と併記する。Meta UI表示は skip rate=低、share rate=高、like rate=低、save rate=高、repost rate=低、comment rate=低。『リール動画が「いいね！」された時』グラフは0:00–0:05の形状のみ確認でき、各点の厳密な数値ラベルがないため数値化しない。

---

# Basis Alarm (BFG90)

## Publication evidence
- published_at_jst: approximately 2026-09-28 06:30 (user report)
- reel_duration: approximately 16s (canonical analysis reference)
- source_status: CANONICAL_LOG_SCREENSHOT + USER_REPORTED_PUBLICATION_TIME

### Snapshot — 2026-09-29 10:21–10:22 JST — reconstructed from canonical delta
- observed_at_jst: 2026-09-29 10:21–10:22
- views: 648
- viewers: 425
- average_watch_time: 23s
- follows: 1
- likes: 25
- comments: 0
- reposts: 1
- saves: 1
- skip_rate: 29.2%
- share_rate: 0.0%
- like_rate: 5.4%
- save_rate: 0.2%
- repost_rate: 0.2%
- age_18_34_combined: 70.5%
- country_india: 7.1%
- country_us: 10.4%
- profile_accesses: unknown
- bio_link_clicks: unknown
- source_status: DERIVED_FROM_CANONICAL_DELTA
- note: `instagram-operations.md` の12:51–12:52 snapshotに旧値として明記された数値だけを復元。初回画面で未確認の項目は補完していない。

### Snapshot — 2026-09-29 12:51–12:52 JST
- observed_at_jst: 2026-09-29 12:51–12:52
- views: 1,741
- viewers: 1,152
- average_watch_time: 22s
- follows: 2
- likes: 45
- comments: 0
- reposts: 1
- saves: 4
- share_count: UI `--`
- skip_rate: 26.9%
- share_rate: 0.1%
- like_rate: 3.6%
- save_rate: 0.3%
- repost_rate: 0.1%
- comment_rate: 0.0%
- profile_accesses: 2
- bio_link_clicks: 1
- followers: 1.1%
- non_followers: 98.9%
- age: 13–17 1.2% / 18–24 33.2% / 25–34 40.5% / 35–44 14.9% / 45–54 6.5% / 55–64 2.4% / 65+ 1.3%
- age_18_34_combined: 73.7%
- countries: India 26.4% / United States 10.5% / Turkey 6.6% / Brazil 5.9% / Iran 5.1%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-29 15:44 JST
- observed_at_jst: 2026-09-29 15:44
- views: 2,534
- viewers: 1,862
- average_watch_time: 18s
- follows: 2
- likes: 58
- comments: 0
- reposts: 1
- saves: 5
- share_count: UI `--`
- skip_rate: 29.0%
- share_rate: 0.1%
- like_rate: 3.1%
- save_rate: 0.3%
- repost_rate: 0.1%
- comment_rate: 0.0%
- profile_accesses: 4
- bio_link_clicks: 1
- followers: 0.9%
- non_followers: 99.1%
- age: 13–17 0.9% / 18–24 31.8% / 25–34 40.0% / 35–44 15.2% / 45–54 7.4% / 55–64 3.1% / 65+ 1.7%
- age_18_34_combined: 71.8%
- countries: India 31.0% / United States 8.7% / Turkey 5.7% / Iran 5.2% / Brazil 4.4%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-29 18:08 JST
- observed_at_jst: 2026-09-29 18:08
- views: 2,912
- viewers: 2,144
- average_watch_time: 17s
- follows: 2
- likes: 68
- comments: 0
- reposts: 1
- saves: 5
- share_count: UI `--`
- skip_rate: 29.3%
- share_rate: 0.0%
- like_rate: 3.2%
- save_rate: 0.2%
- repost_rate: 0.0%
- comment_rate: 0.0%
- profile_accesses: 8
- bio_link_clicks: 1
- followers: 1.0%
- non_followers: 99.0%
- age: 13–17 0.8% / 18–24 31.0% / 25–34 40.1% / 35–44 15.6% / 45–54 7.4% / 55–64 3.2% / 65+ 1.9%
- age_18_34_combined: 71.1%
- countries: India 31.9% / United States 7.8% / Turkey 5.6% / Iran 5.6% / Indonesia 4.0%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-30 06:26 JST
- observed_at_jst: 2026-09-30 06:26
- views: 7,631
- viewers: 5,647
- average_watch_time: 13s
- follows: 6
- likes: 159
- comments: 2
- reposts: 4
- saves: 24
- share_count: UI `--`
- skip_rate: 29.2%
- share_rate: 0.2%
- like_rate: 2.9%
- save_rate: 0.4%
- repost_rate: 0.1%
- comment_rate: 0.0%
- profile_accesses: 34
- bio_link_clicks: 1
- followers: 0.5%
- non_followers: 99.5%
- age: 13–17 0.4% / 18–24 26.9% / 25–34 39.1% / 35–44 16.7% / 45–54 9.5% / 55–64 4.8% / 65+ 2.5%
- age_18_34_combined: 66.0%
- countries: India 27.3% / Turkey 6.7% / Iran 6.0% / France 5.1% / United States 4.3%
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-30 22:13 JST
- observed_at_jst: 2026-09-30 22:13
- elapsed_since_publish: approximately 63h43m
- views: 11,026
- viewers: 8,167
- average_watch_time: 13s
- follows: 14
- likes: 224
- comments: 2
- reposts: 5
- saves: 41
- share_count: UI `--`
- skip_rate: 29.3%
- share_rate: 0.2%
- like_rate: 2.9%
- save_rate: 0.5%
- repost_rate: 0.1%
- comment_rate: 0.0%
- profile_accesses: 44
- bio_link_clicks: 2
- followers: 0.4%
- non_followers: 99.6%
- age: 13–17 1.3% / 18–24 28.0% / 25–34 39.1% / 35–44 16.0% / 45–54 8.8% / 55–64 4.5% / 65+ 2.3%
- age_18_34_combined: 67.1%
- countries: India 25.5% / Turkey 6.5% / France 5.3% / Iran 5.1% / United States 4.7%
- source_status: CANONICAL_LOG_SCREENSHOT + USER_REPORTED_PUBLICATION_TIME
- note: 2026-09-30 22:13 JSTのユーザー提供Instagram Insightsスクリーンショット6枚から確認。公開時刻はユーザー説明による概算で、共有数は画面上 `--` のため数値化しない。

### Snapshot — 2026-10-04 08:24–08:25 JST
- observed_at_jst: 2026-10-04 08:24–08:25
- reel_duration: approximately 16s
- views: 12,823
- viewers: 9,447
- average_watch_time: 12s
- follows: 20
- likes: 277
- comments: 3
- reposts: 5
- share_count: UI `--`
- saves: 52
- skip_rate: 29.1%
- share_rate: 0.2%
- like_rate: 3.1%
- save_rate: 0.6%
- repost_rate: 0.1%
- comment_rate: 0.0%
- profile_accesses: 55
- bio_link_clicks: 2
- followers: 0.4%
- non_followers: 99.6%
- age: 13–17 1.8% / 18–24 28.4% / 25–34 39.0% / 35–44 15.8% / 45–54 8.6% / 55–64 4.3% / 65+ 2.1%
- age_18_34_combined: 67.4%
- countries: India 24.7% / Turkey 6.7% / France 5.2% / Iran 5.1% / United States 4.5%
- source_status: CANONICAL_LOG_SCREENSHOT + USER_REPORTED_PUBLICATION_TIME
- note: 2026-10-04 08:24–08:25 JSTのユーザー提供Instagram Insightsスクリーンショット6枚から確認。共有数は画面上 `--` のため数値化しない。Meta UI評価は skip rate「低」、share rate「低」、like rate「低」、save rate「高」、repost rate「低」、comment rate「低」。


### Snapshot — 2026-10-13 08:33 JST — Basis second static carousel
- observed_at_jst: 2026-10-13 08:33
- content_id: IG-BAS-002
- content_type: static_carousel_4_images
- published_at_jst: approximately 2026-10-12 08:24 (2026-10-12 08:25投稿画面の「40秒前」からの概算。exact未確認)
- age_of_post_display: 1日前 (2026-10-13 08:33投稿画面)
- elapsed_since_publish: approximately 24h09m (概算時刻を使用、exact elapsed未確認)
- views: 63
- viewers: 28
- likes: 6
- comments: 0
- reposts: 0
- share_count: UI `--`
- saves: 0
- follows: 0
- profile_accesses: UI `--`
- followers: 98.4%
- non_followers: 1.6%
- image_like_counts: image 1 UI 6 / image 2 UI 0 / image 3 UI 0 / image 4 UI 0
- carousel_post_view_display: 62 (post page) / detailed Insights views 63 (same observed minute; preserve both, not reconciled)
- non_follower_views_trend: chart rises from 0 to approximately 1 at 24h (graph; exact timeline within chart not available)
- audience_demographics: UI unavailable (fewer than 100 eligible audience actions in selected period)
- view_sources: heading visible but values outside the provided screenshots; unknown
- source_status: CANONICAL_LOG_SCREENSHOT
- note: ユーザー提供2026-10-13 08:33 JSTの投稿画面・Post Insightsスクリーンショット計5枚。Audience follower 98.4% / non-follower 1.6%はUI表示値。画像別いいね数はカルーセル画像のUI帰属表示であり、閲覧・スワイプ人数の証拠ではない。共有とプロフィールアクセスは `--` のため0にしない。

---

# Westclox Watchlarm W5

## Publication evidence
- published_at_jst: unknown
- reel_duration: 24s
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-09-30 08:49–08:50 JST
- observed_at_jst: 2026-09-30 08:49–08:50
- views: 314
- viewers: 213
- average_watch_time: 9s
- follows: 0
- likes: 5
- comments: 0
- reposts: 1
- saves: 0
- share_count: UI `--`
- skip_rate: 46.0%
- share_rate: 0.0%
- like_rate: 2.0%
- save_rate: 0.0%
- repost_rate: 0.4%
- comment_rate: 0.0%
- profile_accesses: 1
- followers: 2.9%
- non_followers: 97.1%
- age: 13–17 0.0% / 18–24 31.1% / 25–34 45.5% / 35–44 11.4% / 45–54 9.8% / 55–64 1.1% / 65+ 1.1%
- age_18_34_combined: 76.6%
- countries: Turkey 13.6% / Iran 12.9% / Germany 6.4% / United States 6.1% / India 6.1%
- source_status: CANONICAL_LOG_SCREENSHOT
- note: 旧個体別sidecarへ保存されていたユーザー提供スクリーンショット確認値を正本へ統合。bio link clickは画面で未確認のため補完しない。

### Snapshot — 2026-09-30 11:52–11:53 JST
- observed_at_jst: 2026-09-30 11:52–11:53
- views: 1,373
- viewers: 937
- average_watch_time: 10s
- likes: 22
- reposts: 1
- saves: 1
- follows: 0
- profile_accesses: 7
- bio_link_clicks: 1
- skip_rate: 44.8%
- share_rate: 0.1%
- like_rate: 2.0%
- save_rate: 0.1%
- repost_rate: 0.1%
- comment_rate: 0.0%
- non_followers: 98.8%
- age_18_34_combined: 79.2%
- countries: India 24.4% / United States 11.4% / Turkey 6.6% / Iran 6.1% / Brazil 3.8%
- source_status: CANONICAL_LOG_SCREENSHOT
- note: 旧Westclox snapshot logに保存されていたユーザー提供スクリーンショット確認値を正本へ統合。年齢の各階級とfollowers比率は未確認のため補完しない。

### Snapshot — 2026-09-30 22:13–22:14 JST
- observed_at_jst: 2026-09-30 22:13–22:14
- views: 1,827
- viewers: 1,436
- average_watch_time: 9s
- follows: 0
- likes: 33
- comments: 0
- reposts: 1
- saves: 1
- share_count: UI `--`
- skip_rate: 47.8%
- share_rate: 0.1%
- like_rate: 2.3%
- save_rate: 0.1%
- repost_rate: 0.1%
- comment_rate: 0.0%
- profile_accesses: 9
- bio_link_clicks: 1
- followers: 1.8%
- non_followers: 98.2%
- age: 13–17 0.6% / 18–24 35.5% / 25–34 39.0% / 35–44 12.7% / 45–54 7.1% / 55–64 3.3% / 65+ 1.9%
- age_18_34_combined: 74.5%
- countries: India 26.3% / United States 9.6% / Iran 5.9% / Turkey 5.8% / Indonesia 4.1%
- source_status: CANONICAL_LOG_SCREENSHOT
- note: overviewは22:13、詳細指標は22:14の同一確認セット。値が一致する画面を1 snapshotへ統合し、共有数は画面上 `--` のため数値化しない。

---

# Citizen Alarm

## Publication evidence
- published_date_jst: 2026-10-01
- published_time_jst: unknown
- UI age evidence: 2026-10-01 08:28 JSTの投稿画面で `2時間前`
- elapsed_since_publish: UI display approximately 2h; exact calculation unavailable
- reel_duration: 18s
- source_status: CANONICAL_LOG_SCREENSHOT

### Snapshot — 2026-10-01 08:28–08:29 JST
- observed_at_jst: 2026-10-01 08:28–08:29
- age_of_post_display: 2h
- reel_duration: 18s
- views: 530 (post screen immediately before Insights: 529)
- viewers: 429
- average_watch_time: 6s
- follows: 2
- likes: 15
- comments: 2
- reposts: 0
- share_count: UI `--`
- saves: 1
- skip_rate: 43.9%
- share_rate: 0.0%
- like_rate: 3.2%
- save_rate: 0.2%
- repost_rate: 0.0%
- comment_rate: 0.4%
- profile_accesses: 1
- followers: 1.1%
- non_followers: 98.9%
- age: 13–17 0.7% / 18–24 31.7% / 25–34 44.9% / 35–44 13.4% / 45–54 4.6% / 55–64 3.9% / 65+ 0.7%
- age_18_34_combined: 76.6%
- countries: Turkey 17.5% / Iran 11.9% / India 8.7% / United States 5.1% / France 4.9%
- source_status: CANONICAL_LOG_SCREENSHOT
- note: 2026-10-01 08:28–08:29 JSTのユーザー提供Instagram投稿・Insightsスクリーンショット7枚から確認。投稿画面は529 views、直後のInsights詳細は530 viewsのため両方を保持。共有数は画面上 `--`、bio link clickとgenderは未表示のため補完しない。

### Snapshot — 2026-10-02 06:29–06:30 JST
- observed_at_jst: 2026-10-02 06:29–06:30
- elapsed_since_publish: approximately 24h; exact calculation unavailable
- reel_duration: 18s
- views: 1,423
- viewers: 1,242
- average_watch_time: 6s
- follows: 3
- likes: 50
- comments: 2
- reposts: 0
- share_count: UI `--`
- saves: 4
- skip_rate: 45.3%
- share_rate: 0.1%
- like_rate: 4.0%
- save_rate: 0.3%
- repost_rate: 0.0%
- comment_rate: 0.2%
- profile_accesses: 4
- bio_link_clicks: unknown
- followers: 4.6%
- non_followers: 95.4%
- age: 13–17 4.2% / 18–24 31.7% / 25–34 40.0% / 35–44 13.7% / 45–54 5.9% / 55–64 3.1% / 65+ 1.4%
- age_18_34_combined: 71.7%
- countries: India 22.5% / Turkey 11.6% / Iran 7.9% / United States 6.6% / Mexico 2.7%
- source_status: CANONICAL_LOG_SCREENSHOT
- note: 2026-10-02 06:29–06:30 JSTのユーザー提供Instagram Insightsスクリーンショット6枚から確認。共有数は画面上 `--` のため数値化しない。bio link clickとgenderは未表示のため補完しない。Meta UI上の評価は skip rate「低」、share rate「低」、like rate「通常」、save rate「低」、repost rate「低」、comment rate「高」。閲覧数推移グラフでは本Reelが約1,400付近で伸びが鈍化し、通常のReel動画の比較線を下回る表示。

---


---

# Modern De Luxe

## Publication evidence
- content_id: IG-MDL-001
- published_date_jst: 2026-10-14
- published_at_jst: approximately 2026-10-14 20:59 (2026-10-14 21:00 post screenshot displayed 「46秒前」; exact timestamp unknown)
- format: two-slide mixed-media carousel (first slide mechanical alarm video, second slide Wittnauer 10WA / Modern De Luxe / Basis BFG90 photo comparison)
- source_status: CANONICAL_LOG_SCREENSHOT
- creative source: `measurement/.internal/.virtual/social/instagram-published-copy.md`

### Snapshot — 2026-10-14 22:12 JST — Modern De Luxe mixed-media carousel (IG-MDL-001)
- observed_at_jst: 2026-10-14 22:12
- age_of_post_display: 1時間前 (post screen)
- elapsed_since_publish: approximately 1h13m, using approximate publication time; exact elapsed unknown
- content_id: IG-MDL-001
- views: 23 (Post Insights Overview; separate post screen shows 10 view icon; not treated as same measurement)
- viewers: 4
- likes: 3
- comments: 1
- reposts: 1
- shares: UI `--`
- saves: 0
- follows: 0
- profile_accesses: UI `--`
- bio_link_clicks: unknown
- non_follower_trend: 0 across displayed 0–60m chart (non-follower filter; chart evidence ONLY, not an Audience-tab percentage or proof that all 23 views are follower-origin)
- all_views_trend: rises from 0 to approximately 16 on displayed 0–60m chart; chart reading approximate; summary views=23 is authoritative figure shown on same screenshot
- top_view_sources: heading `閲覧数上位のソース` and `フィード` visible; numeric share cut off, so unknown
- average_watch_time: unknown
- skip_rate: unknown
- followers: unknown
- non_followers: unknown
- source_status: CANONICAL_LOG_SCREENSHOT
- screenshot_evidence: `IMG_3052.jpeg` (post page), `IMG_3053.png` (overview, all views), `IMG_3054.png` (overview, non-follower filter), all 2026-10-14 22:12 JST
- note: 23 views / 4 unique viewers imply 5.75 plays per unique viewer as an arithmetic quotient, but do NOT establish who replayed (owner vs audience) or why. Screenshot's non-follower graph shows 0 in the first 60 minutes; later distribution and Audience composition unverified. Post page count 10 and detailed Insights 23 are retained separately as displayed; UI sync/definition cannot be inferred.


### Snapshot — 2026-10-14 23:19 JST — Modern De Luxe post-page observation
- observed_at_jst: 2026-10-14 23:19
- content_id: IG-MDL-001
- source_surface: Instagram own post page (not Post Insights)
- age_of_post_display: 2時間前
- elapsed_since_publish: approximately 2h20m based on inferred ~20:59 publication; exact unknown
- post_page_views: 41
- likes: 4
- comments: 1
- reposts: 1
- shares: unknown (no count displayed)
- saves: unknown (no count displayed)
- viewers: unknown (Insights not displayed)
- follows: unknown (Insights not displayed)
- non_followers: unknown
- source_status: CANONICAL_LOG_SCREENSHOT
- screenshot_evidence: IMG_3058.jpeg
- note: Post preview includes TIME66 avatar with a purple repost mark. The visible comment preview says "Incredible!". Counts on the post page are distinct from 22:12 Insights views:23; do not calculate a direct increase or audience split between surfaces.


### Snapshot — 2026-10-15 06:38 JST — Modern De Luxe (IG-MDL-001)
- observed_at_jst: 2026-10-15 06:37–06:38 (post page 06:37, Insights 06:38)
- content_id: IG-MDL-001
- published_at_jst: approximately 2026-10-14 20:59 (estimated, exact unknown)
- elapsed_since_publish: approximately 9h39m (estimated)
- age_of_post_display: 10時間前
- format: two-slide mixed-media carousel
- views: 115 (Insights and post page)
- viewers: 52
- likes: 6
- comments: 1
- reposts: 2
- shares: UI `--` in Insights; post-page send icon separately displays 1
- saves: 0
- follows: 0
- profile_accesses: 1
- followers: 81.7%
- non_followers: 18.3%
- top_source_feed_pct: 60.0
- top_source_stories_pct: 34.8
- top_source_profile_pct: 2.6
- other_sources: unknown
- likes_on_carousel_slide_1: 4
- likes_on_carousel_slide_2: 2
- source_status: CANONICAL_LOG_SCREENSHOT
- screenshot_evidence: IMG_3065.jpeg; IMG_3066.png; IMG_3067.png; IMG_3068.png; IMG_3069.png
- note: Non-follower graph grows to approximately 21 (chart estimate only). Slide-wise likes are not slide reach/swipes. Platform audience age/country/gender unavailable due activity threshold. Do not attribute exposure to TIME66 repost without evidence.

---

# ARSA Blind Alarm

## Publication evidence
- published_at_jst: 2026-10-17 13:20 (user first-hand report)
- format: Reel
- duration: approximately 28.73 seconds (user-provided original `IMG_3131.mp4`; screen Insights 0:28 on axis)
- content_id: IG-ARS-001
- watch_publication_status: ARSA public WATCH route remains unpublished; Instagram Reel publication is separate
- source_status: CANONICAL_LOG_SCREENSHOT + CANONICAL_LOG_USER_REPORT

### Snapshot — 2026-10-17 14:12–14:13 JST
- observed_at_jst: 2026-10-17 14:12–14:13
- content_id: IG-ARS-001
- published_at_jst: 2026-10-17 13:20
- elapsed_since_publish: approximately 52–53 minutes
- views: 142
- viewers: 89
- average_watch_time: 6s
- likes: 5
- comments: 1
- reposts: 0
- shares: UI `--` (not zero; share_rate displayed separately 0.0%)
- saves: 1
- follows: 0
- profile_accesses: 1
- skip_rate: 47.8%
- share_rate: 0.0%
- like_rate: 4.3%
- save_rate: 0.9%
- repost_rate: 0.0%
- comment_rate: 0.9%
- followers: 9.4%
- non_followers: 90.6%
- top_source_feed_pct: 61.1
- top_source_reels_tab_pct: 33.3
- top_source_explore_pct: 5.6
- screenshot_ui_quality_note: `このリールのフックは強力です` / `最初の3秒を超えて視聴されました`; platform UI evaluation, not an independent proof of overall retention
- retention_curve_observation: sharp fall in the first several seconds; subsequent low tail to 28s; intermediate graph values are visual estimates and are not recorded as precise percentages
- likes_at_video_frame: engagement page shows 5 likes, timing graph has an early and a later spike; does not establish timestamp of all likes
- audience_detail: Instagram states demographics unavailable below 100 action-taking accounts (not audience count)
- top_source_note: percentages are viewed source distribution, not counts of followers or linked-site referrals
- source_status: CANONICAL_LOG_SCREENSHOT
- screenshot_evidence: IMG_3133.png; IMG_3134.png; IMG_3135.png; IMG_3136.png; IMG_3137.png; IMG_3138.jpeg
- note: Separate own-post screen IMG_3132.jpeg displayed 80 views around 14:12 while Insights displayed 142 views in the same observation window. These are separate UI surfaces; do not infer 80→142 growth or treat 80 as Insights views. Post screen confirms hook opening and ARSA object, but caption is cut off and full published caption/hashtags cannot be screenshot-verified. User reports published at 13:20; exact system/server publish timestamp not independently verified. Audience 90.6% non-followers is a composition metric, not number of non-follower accounts. 

### Snapshot — 2026-10-17 17:17–17:18 JST
- observed_at_jst: 2026-10-17 17:17–17:18
- content_id: IG-ARS-001
- published_at_jst: 2026-10-17 13:20 (user report)
- elapsed_since_publish: approximately 3h57m–3h58m
- views: 416
- viewers: 306
- average_watch_time: 9s
- likes: 11
- comments: 2
- reposts: 0
- shares: UI -- (count unknown)
- saves: 1
- follows: 1
- profile_accesses: 1
- skip_rate: 51.0%
- share_rate: 0.0%
- like_rate: 3.3%
- save_rate: 0.3%
- repost_rate: 0.0%
- comment_rate: 0.6%
- followers: 8.3%
- non_followers: 91.7%
- age: 13–17 2.2% / 18–24 25.7% / 25–34 46.4% / 35–44 14.5% / 45–54 6.7% / 55–64 1.4% / 65+ 3.1%
- age_18_34_combined: 72.1%
- countries: India 26% / Turkey 10.6% / Iran 8.7% / Japan 5.9% / Mexico 3.6%
- top_source_reels_tab_pct: 68.3
- top_source_explore_pct: 19.1
- top_source_feed_pct: unknown (cropped)
- instagram_hook_ui: powerful, viewed past first three seconds (platform statement)
- retention_note: rapid drop in first few seconds; low tail through 28 seconds; chart-point values unconfirmed
- normal_reel_graph_note: purple reel views shown below gray dashed normal-reel baseline at comparable elapsed periods; approximate visual comparison only
- source_status: CANONICAL_LOG_SCREENSHOT
- screenshot_evidence: IMG_3140.jpeg; IMG_3141.png; IMG_3142.png; IMG_3143.png; IMG_3144.png; IMG_3145.png; IMG_3146.png; IMG_3147.png
- note: Own post page 17:17 showed 263 views / 9 likes / 2 comments, while Insights 17:17 showed 416 views / 11 likes / 2 comments. Distinct UI surfaces, not a verified time sequence. Reels tab and Explore are the only fully visible source percentages. Screenshots mark skip high, share low, like low, save low, repost low, comment high.

### Snapshot — 2026-10-17 19:39 JST
- observed_at_jst: 2026-10-17 19:39
- content_id: IG-ARS-001
- published_at_jst: 2026-10-17 13:20 (user report)
- elapsed_since_publish: approximately 6h19m
- views: 1333
- viewers: 979
- average_watch_time: 10s
- likes: 33
- comments: 2
- reposts: 0
- shares: UI `--` (count unknown; displayed share rate 0.0%)
- saves: 8
- follows: 2
- profile_accesses: 4
- skip_rate: 46.7%
- share_rate: 0.0%
- like_rate: 3.1%
- save_rate: 0.7%
- repost_rate: 0.0%
- comment_rate: 0.2%
- followers: 3.6%
- non_followers: 96.4%
- age: 13–17 11.5% / 18–24 26.2% / 25–34 38.8% / 35–44 12.6% / 45–54 6.6% / 55–64 2.3% / 65+ 2.0%
- age_18_34_combined: 65.0%
- countries: India 31.9% / Turkey 13.3% / Iran 9.5% / Japan 3.1% / Indonesia 2.7% (top five visible only)
- top_source_reels_tab_pct: 79.2
- top_source_explore_pct: 15.4
- top_source_feed_pct: 3.8
- top_source_stories_pct: 0.8
- top_source_profile_pct: 0.3
- screenshot_ui_quality_note: platform calls hook powerful and says watched past first 3s; not proof of causal reach
- retention_curve_observation: steep decline in first seconds, then continued decline until ~28s; exact point values not extracted
- normal_reel_baseline_graph: sharp acceleration near hour six but Reel trend remains below screenshot gray dashed usual-Reel baseline; no inferred numeric benchmark
- like_timing: intermittent spikes incl. last seconds in UI; precise likes-per-second unknown
- source_status: CANONICAL_LOG_SCREENSHOT
- screenshot_evidence: IMG_3150.jpeg; IMG_3151.png; IMG_3152.png; IMG_3153.png; IMG_3154.png; IMG_3155.png; IMG_3156.png; IMG_3157.png
- user_report_separate: User reports actively following many accounts in the interval and deciding not to restrict follow targets too severely, expecting possible reciprocal follow amplification. Follow count, follow timestamps and follow-backs unverified; no causal inference.
- note: Own-post overlay and Insights both showed 1333 views / 33 likes around 19:39. Platform rates as displayed may use own denominator; do not recompute from simple total views. Visible sources are a subset, not necessarily 100%.


### Snapshot — 2026-10-18 00:24–00:25 JST
- observed_at_jst: 2026-10-18 00:24–00:25
- content_id: IG-ARS-001
- published_at_jst: 2026-10-17 13:20 (user first-hand report)
- elapsed_since_publish: approximately 11h04m–11h05m
- views: 1605
- viewers: 1280
- average_watch_time: 11s
- likes: 42
- comments: 2
- reposts: 0
- shares: UI `--` (count unconfirmed; separate UI share rate 0.0%)
- saves: 9
- follows: 2
- profile_accesses: 4
- skip_rate: 46.8%
- share_rate: 0.0%
- like_rate: 3.2%
- save_rate: 0.7%
- repost_rate: 0.0%
- comment_rate: 0.2%
- followers: 4.2%
- non_followers: 95.8%
- age: 13–17 10.5% / 18–24 25.0% / 25–34 37.0% / 35–44 14.3% / 45–54 7.8% / 55–64 3.4% / 65+ 2.0%
- age_18_34_combined: 62.0%
- countries: India 30.4% / Turkey 12.4% / Iran 11.5% / Japan 3.4% / Indonesia 2.6% (top five visibly listed)
- top_source_reels_tab_pct: 78.7
- top_source_explore_pct: 15.2
- top_source_feed_pct: 3.6
- top_source_stories_pct: 1.3
- top_source_profile_pct: 0.8
- screenshot_ui_quality_note: Instagram shows `このリールのフックは強力です` and watched beyond first three seconds; UI evaluation not independent proof of full-video retention
- retention_curve_observation: large drop in first few seconds with lower, long tail until approximately 28s; exact graph points not measured
- normal_reel_baseline_graph_note: after a visible burst up to about six hours, own purple view trajectory levels off near 1605 and is below the gray dashed usual Reel benchmark at screenshot time; comparator numeric values not recoverable
- likes_at_video_frame: variable spikes including early and later points in UI; precise per-second like counts not supported
- source_status: CANONICAL_LOG_SCREENSHOT
- screenshot_evidence: IMG_3160.jpeg; IMG_3161.png; IMG_3162.png; IMG_3163.png; IMG_3164.png; IMG_3165.png; IMG_3166.png; IMG_3167.png
- note: The separate own-post screen at 00:24 displays 1537 views and 41 likes, while Insights at 00:24–00:25 displays 1605 views and 42 likes; preserve these as different UI surfaces, not time-sequenced growth. Post UI labels publication as `11時間前` and user reported 13:20 previous day. Percent rates are the Instagram-displayed metrics, not recalculations from gross view counts; unknown shares must not be entered as zero.



# Citizen × ARSA — simultaneous sound comparison

## Publication evidence
- content_id: IG-CIT-ARS-001
- published_date_jst: 2026-10-21
- published_time_jst: unknown (post page at 16:54 JST displays `6時間前`; no reverse calculation from platform-rounded age)
- format: Instagram Reel
- reel_duration: approximately 9 seconds (Instagram retention graph 0:00–0:09)
- source_status: CANONICAL_LOG_SCREENSHOT
- publication_screenshot: IMG_3225.jpeg
- caption_full_text: screenshot verified; see instagram-published-copy.md

### Snapshot — 2026-10-21 16:54 JST — Citizen × ARSA
- observed_at_jst: 2026-10-21 16:54
- content_id: IG-CIT-ARS-001
- published_at_jst: unknown (publication date 2026-10-21)
- age_of_post_display: `6時間前`
- elapsed_since_publish: unknown (Instagram relative clock only)
- reel_duration: approximately 9s (axis `0:00–0:09`)
- views: 1168
- viewers: 764
- average_watch_time: 5s
- likes: 24
- comments: 0
- reposts: 0
- shares: UI `--` (count unknown; share_rate shown separately)
- saves: 3
- follows: 1
- profile_accesses: 5
- bio_link_clicks: 1 (Instagram `自己紹介のリンククリック`)
- skip_rate: 37.0%
- share_rate: 0.4%
- like_rate: 2.7%
- save_rate: 0.3%
- repost_rate: 0.0%
- comment_rate: 0.0%
- followers: 3.9%
- non_followers: 96.1%
- age: 13–17 1.9% / 18–24 36.9% / 25–34 43.8% / 35–44 11.7% / 45–54 2.7% / 55–64 1.2% / 65+ 1.7%
- age_18_34_combined: 80.7%
- countries: India 49.8% / Turkey 9.3% / United States 7.4% / Mexico 1.8% / South Korea 1.6% (five visibly listed)
- top_source_reels_tab_pct: 76.9
- top_source_explore_pct: 15.9
- top_source_feed_pct: 6.1
- top_source_profile_pct: 0.6
- top_source_stories_pct: unknown (not shown)
- retention_curve_observation: displayed curve drops across the first seconds, continues downward to a low tail at 9 seconds; individual timepoint percentages are not numerically readable
- normal_reel_graph_note: Reel's purple cumulative-view line is below dashed gray `あなたの通常のリール動画` comparison near the screenshot's displayed ~6-hour period. Do not infer exact typical-view count from graph.
- like_timing_graph: early and mid-video peaks visible but exact per-second counts cannot be read
- source_status: CANONICAL_LOG_SCREENSHOT
- screenshot_evidence: IMG_3225.jpeg; IMG_3226.png; IMG_3227.png; IMG_3228.png; IMG_3229.png; IMG_3230.png; IMG_3231.png; IMG_3232.png
- note: The separate own-post UI at 16:54 displays 983 views and 23 likes, while the Insights UI at 16:54 displays 1168 views and 24 likes. These are different UI surfaces in the same capture set, **not** a verified sequential 983→1168 growth series. Save count and follow count come from Insights. The separate share counter `--` is unknown despite displayed share rate 0.4%; do not substitute 0. Percent rates are platform UI figures, not independently recomputed from views. Gender and actual publish minute not shown.


---

## 2. Cross-source reconciliation / rejected values

- CYMA `2026-09-28 17:41頃 / viewers 1,406 / age 45–54 10.3 / 65+ 5.4` は旧復旧案由来で、main正本の17:49–17:50 snapshot（viewers 1,408 / age 45–54 10.2 / 65+ 5.5）と矛盾するため棄却。
- Wittnauer `2026-09-29 18:16 / 3,425 views / 147 likes / 29 shares-or-sends` は旧復旧案にはあったが、main `instagram-operations.md` と過去会話再検索で一次根拠を再取得できなかったため、本時系列から除外。証拠が再取得できた場合のみ復活させる。
- Basis 10:21–10:22は元snapshot本文がmainから欠落しているが、12:51–12:52の正本deltaに旧値が明記されている。したがって明記された旧値だけを `DERIVED_FROM_CANONICAL_DELTA` として復元し、profile access等は0扱いしない。
- Westclox 2 snapshotはmain social logへ未保存だったが、2026-09-30引き継ぎ記録に具体値が保持されていたため `HANDOFF_RECOVERED` として分離表示する。

## 3. Known gaps — do not fill by inference

- Wittnauer: 投稿日は2026-09-26だが公開時刻不明。`Age of post: 22h` は保持するが、UI丸め仕様を仮定して時刻を逆算しない。
- CYMA: `Age of post: 10h` は確認済みだが公開日時の分単位は未確定。
- Pierce: 08:07投稿が確認済みのため、各snapshotのelapsedを計算済み。
- Basis: 公開日時未復旧。10:21初回snapshotは正本deltaから部分復元。
- Westclox: 公開日時未復旧。2 snapshotは引き継ぎ値。
- Citizen: 投稿日は2026-10-01。08:28 JSTの投稿画面に `2時間前` と表示されているが、Instagram UIの丸め幅を仮定せず、公開時刻と正確なelapsedは不明のまま保持する。
- `unknown` は0ではない。

## 4. Future snapshot template

```md
### Snapshot — YYYY-MM-DD HH:mm JST
- observed_at_jst:
- published_at_jst:
- elapsed_since_publish:
- views:
- viewers:
- average_watch_time:
- likes:
- comments:
- reposts:
- shares:
- saves:
- follows:
- profile_accesses:
- bio_link_clicks:
- skip_rate:
- share_rate:
- like_rate:
- save_rate:
- repost_rate:
- comment_rate:
- followers:
- non_followers:
- age:
- countries:
- gender:
- source_status:
- note:
```

新しいInsightsを受け取ったら、分析より先にこのsnapshotを追記する。手作業で直接編集する代わりに、一時JSONを `npm run instagram:append -- <json-path>` へ渡してもよい。追記後は `npm run check:instagram-insights` と `npm run instagram:report` を実行し、commit後にmainを再取得して値・時刻・欠落を監査する。
