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
