# VINTAGE ALARM — Instagram Insights Time Series

> Instagram Reel Insights の観測時系列正本。2026-09-30の復旧作業で新設。
> 数値は「最新値」で上書きせず、観測スナップショットを追記する。

## 0. 完成条件 / 記録契約

1. 1回のInsights確認を1 snapshotとして残す。
2. 各snapshotは `observed_at_jst`（観測日時JST）を必須とする。画面取得が時間帯しか確定できない場合は範囲で記録する。
3. `published_at_jst` は確認できた場合だけ記録する。日付しか確認できない場合は日付精度を明記し、時刻を推測しない。
4. `elapsed_since_publish` は公開日時と観測日時の両方が十分な精度で確認できた場合だけ算出する。算出不能は `unknown` とし、推測しない。
5. スクリーンショットで確認できた全Insightsを保存する。未確認値は0にせず `unknown`。
6. 同じReelの後続観測で旧snapshotを上書きしない。
7. `source_status` を付ける。
   - `SCREENSHOT_VERIFIED`: 当該画面で直接確認。
   - `USER_REPORTED`: ユーザー明示値。
   - `CONVERSATION_RECOVERED`: 過去会話の記録から復旧。元スクショが現在ターンにない。
   - `HANDOFF_RECOVERED`: 引き継ぎ文に保存されていた値から復旧。
8. 異なる時刻の値を1 snapshotへ混ぜない。同じReelでも別時刻なら別snapshot。
9. 観測日時が復旧できない値は `observed_at_jst: unknown` の独立snapshotとして残し、日時付きsnapshotへ混ぜない。

## 1. Recovery audit — 2026-09-30

今回の目的は、これまで共有されたInstagram Insightsを「個体 / 観測日時 / 投稿後経過時間 / 全確認値」の時系列へ戻すこと。以下は確認できた範囲だけを復旧した。日時・指標が確認できない箇所は補完していない。

---

## Wittnauer 10WA

### Publication
- published_date_jst: 2026-09-26
- published_time_jst: unknown
- source_status: USER_REPORTED
- note: 日付のみ。時刻不明のためelapsedは計算しない。

### Snapshot — 2026-09-29 17:35–17:49 JST
- observed_at_jst: 2026-09-29 17:35–17:49
- elapsed_since_publish: unknown
- views: 2,744
- viewers: 2,225
- likes: 112
- follows: 12
- profile_accesses: 31
- bio_link_clicks: 2
- skip_rate: 41.2%
- other_metrics: unknown
- source_status: CONVERSATION_RECOVERED

### Snapshot — 2026-09-29 17:57 JST
- observed_at_jst: 2026-09-29 17:57
- elapsed_since_publish: unknown
- views: 3,106
- viewers: 2,480
- average_watch_time: 6s
- likes: 128
- saves: 23
- follows: 13
- profile_accesses: 42
- bio_link_clicks: 2
- skip_rate: 42.6%
- comments: unknown
- reposts: unknown
- shares_or_sends: unknown
- follower_status: unknown
- age: unknown
- countries: unknown
- source_status: CONVERSATION_RECOVERED

### Snapshot — 2026-09-29 18:16 JST
- observed_at_jst: 2026-09-29 18:16
- elapsed_since_publish: unknown
- views: 3,425
- likes: 147
- comments: 1
- reposts: 4
- shares_or_sends: 29
- other_metrics: unknown
- source_status: CONVERSATION_RECOVERED
- note: 17:57 snapshotと混ぜない。

### Earlier recovered observation — date/time not recovered
- observed_at_jst: unknown
- views: 1,787
- likes: 55
- shares_or_sends: 14
- reposts: 3
- follows: 2
- source_status: CONVERSATION_RECOVERED

---

## CYMA Time-O-Vox 18K Chronomètre

### Snapshot — 2026-09-28 17:41頃 JST
- observed_at_jst: 2026-09-28 17:41頃
- published_at_jst: unknown
- elapsed_since_publish: unknown
- views: 1,609
- viewers: 1,406
- average_watch_time: 7s
- follows: 2
- likes: 57
- comments: 1
- reposts: 1
- saves: 6
- shares: display `--`
- profile_accesses: 10
- bio_link_clicks: 1
- skip_rate: 53.8%
- share_rate: 0.2%
- like_rate: 4.0%
- save_rate: 0.4%
- repost_rate: 0.1%
- comment_rate: 0.1%
- followers: 1.1%
- non_followers: 98.9%
- age_13_17: 0.7%
- age_18_24: 26.8%
- age_25_34: 34.8%
- age_35_44: 15.0%
- age_45_54: 10.3%
- age_55_64: 7.0%
- age_65_plus: 5.4%
- country_india: 18.1%
- country_france: 8.4%
- country_turkey: 7.9%
- country_iran: 5.8%
- country_italy: 5.3%
- source_status: SCREENSHOT_VERIFIED / USER_REPORTED_IN_CURRENT_PROJECT_HISTORY

### Snapshot — 2026-09-29 17:35–17:49 JST
- observed_at_jst: 2026-09-29 17:35–17:49
- elapsed_since_publish: unknown
- views: 1,609
- viewers: 1,408
- likes: 57
- follows: 2
- profile_accesses: 10
- bio_link_clicks: 1
- skip_rate: 53.8%
- other_metrics: unknown
- source_status: CONVERSATION_RECOVERED
- note: 9/28 17:41 snapshotのviewers=1,406とは別観測として保持する。

### Later snapshot — exact observed time not recovered
- observed_at_jst: unknown (2026-09-29夕方の保存値)
- views: 1,712
- viewers: 1,503
- average_watch_time: 7s
- skip_rate: 53.7%
- likes: 65
- saves: 6
- follows: 2
- profile_accesses: 10
- bio_link_clicks: 1
- source_status: CONVERSATION_RECOVERED

### Earlier recovered observation — date/time not recovered
- observed_at_jst: unknown
- views: 1,177
- likes: 35
- saves: 5
- follows: 1
- source_status: CONVERSATION_RECOVERED

---

## Pierce Duofon

### Publication
- published_at_jst: 2026-09-28 08:07
- source_status: CONVERSATION_RECOVERED

### Snapshot — 2026-09-29 17:35–17:49 JST
- observed_at_jst: 2026-09-29 17:35–17:49
- elapsed_since_publish: 33h28m–33h42m
- views: 1,897
- viewers: 1,378
- likes: 39
- follows: 0
- profile_accesses: 5
- skip_rate: 43.5%
- other_metrics: unknown
- source_status: CONVERSATION_RECOVERED

### Later snapshot — exact observed time not recovered
- observed_at_jst: unknown (2026-09-29夕方の保存値)
- elapsed_since_publish: unknown
- views: 2,557
- viewers: 1,852
- average_watch_time: 7s
- skip_rate: 43.9%
- likes: 71
- saves: 10
- follows: 5
- profile_accesses: 17
- bio_link_clicks: 1
- source_status: CONVERSATION_RECOVERED

---

## Basis Alarm (BFG90)

### Snapshot — 2026-09-29 18:08 JST
- observed_at_jst: 2026-09-29 18:08
- published_at_jst: unknown
- elapsed_since_publish: unknown
- views: 2,912
- viewers: 2,144
- average_watch_time: 17s
- skip_rate: 29.3%
- profile_accesses: 8
- other_metrics: unknown
- source_status: CONVERSATION_RECOVERED

### Snapshot — 2026-09-30 06:26 JST
- observed_at_jst: 2026-09-30 06:26
- published_at_jst: unknown
- elapsed_since_publish: unknown
- views: 7,631
- viewers: 5,647
- average_watch_time: 13s
- skip_rate: 29.2%
- likes: 159
- saves: 24
- follows: 6
- profile_accesses: 34
- bio_link_clicks: 1 [handoff-recovered]
- non_followers: 99.5% [handoff-recovered]
- source_status: CONVERSATION_RECOVERED + HANDOFF_RECOVERED
- note: bio-link click / non-followers は06:26個別snapshotの元記録ではなく、同朝の引き継ぎ集約値から復旧。混同防止のため由来を明記。

---

## Westclox Watchlarm W5

### Snapshot — 2026-09-30 08:49–08:50 JST
- observed_at_jst: 2026-09-30 08:49–08:50
- published_at_jst: unknown
- elapsed_since_publish: unknown
- views: 314
- viewers: 213
- average_watch_time: 9s
- skip_rate: 46.0%
- non_followers: 97.1%
- other_metrics: unknown
- source_status: HANDOFF_RECOVERED

### Snapshot — 2026-09-30 11:52–11:53 JST
- observed_at_jst: 2026-09-30 11:52–11:53
- published_at_jst: unknown
- elapsed_since_publish: unknown
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
- country_india: 24.4%
- country_us: 11.4%
- country_turkey: 6.6%
- country_iran: 6.1%
- country_brazil: 3.8%
- source_status: HANDOFF_RECOVERED

---

## 2. Known gaps — do not fill by inference

- Wittnauer: 公開時刻不明。よって各snapshotの厳密な投稿後経過時間は未算出。
- CYMA: 公開日時未復旧。1,712 snapshotの厳密な観測時刻未復旧。
- Pierce: 2,557 snapshotの厳密な観測時刻未復旧。
- Basis: 公開日時未復旧。
- Westclox: 公開日時未復旧。
- `unknown` は0ではない。後から一次画面・会話ログ等で確認できた場合だけ補填する。

## 3. Future snapshot template

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
- shares_or_sends:
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
- source_status:
- note:
```

投稿日時が未登録のReelは、次回Insights取得時に投稿画面で確認できる場合だけ補完する。観測時刻はスクリーンショット取得時刻またはユーザーが明示した取得時刻をJSTで保存する。