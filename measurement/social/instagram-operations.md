# Instagram 運用・観測ログ

公開サイト本文から切り離した、VINTAGE ALARM Instagram の運用・実測記録。

## 運用ルール

- 海外向け・英語主体。投稿案を作る際は、英語として自然な本文と、英語構文を引きずらない自然な日本語訳をセットで確認する。
- 投稿前の確認順は **現行VINTAGE ALARM該当ページ → Project資料（『The Alarm Wrist Watch』『Alarm am Arm』等）→ 必要な一次資料・Web → 投稿案**。既にVAで整理済みの確定事項を飛ばして一般論や記憶から作らない。
- 実機・実音・操作・機構差を主役にする。InstagramをX投稿の単純英訳版にはしない。
- プロフィールの外部導線は HOW THEY RING（英語版）を主入口として観測する。
- 初期探索期間は大きな施策変更を避け、同条件で標本を増やす。広告、頻度変更、既存Reel削除・再投稿等は、十分な比較データなしに行わない。
- Instagram内の成功（再生・保存・共有・フォロー）と、VAへの送客成功を別指標として扱う。
- Analytics上の `facebook` / `instagram` は生データを保持する。Meta系として同判定で観測する場合も、FB値をInstagram実ユーザー流入へ無条件に加算しない。機械アクセス・preview/fetch等の可能性が未確認なら未確認のまま残す。
- 投稿本文にVAリンクを置いていない状態で `l.instagram.com → /en/how-they-ring/` が観測された場合、Instagramから英語HOW THEY RINGへの到達は確認済みとする。ただしプロフィール画面上のクリック経路そのものをAnalyticsだけで直接証明したとは扱わない。
- 毎投稿、可能な範囲で同じ時間窓（初動 / 数時間 / 24h）を比較し、初動だけで失敗・成功を断定しない。

## 初期完成条件

「フォロワー数」単独ではなく、初見の時計好きがReelから機械式アラーム腕時計のアカウントだと理解し、別個体・プロフィール・VAへ進む導線が再現することを目標とする。

初期観測では特に以下を追う。

- Reels / 発見からの非フォロワー配布
- 遅延した追加配布・既存投稿の再加速
- 保存 / 共有 / リポスト / フォロー
- プロフィールから外部導線への到達
- VA側のSNS流入、landing page、国、device、内部遷移
- `/en/how-they-ring/` が海外SNS流入の受け皿として再現性を持つか

---

## 2026-09-27 15:45 JST — 初期2投稿の観測

### Wittnauer 10WA

ユーザー提供Instagram Insightsスクリーンショットで確認。

- Views: 689
- Accounts reached: 499
- Likes: 14
- Shares: 3
- Saves: 4

それ以前の同日12:54 JST頃の観測では、164 views / 136 reached、Reels tab 78.0%、Explore 17.0%、Profile 5.0%、skip rate 43.4%、share rate 0.7%、save rate 1.5%だった。

確認できること:
- 初動で止まらず、投稿後かなり時間が経ってから追加配布が発生した。
- Reels / Explore主体の外部配布へ移行した観測がある。
- 保存・共有という「見て終わり」以外の行動が複数発生した。

確認できないこと:
- Cyma投稿がWittnauer再配布を引き起こしたという因果。
- 689 viewsをもってアカウント学習完了・勝ち筋確定とすること。

### CYMA Time-O-Vox 18K Chronomètre

ユーザー提供Instagram Insightsスクリーンショットで確認。

- Views: 232
- Accounts reached: 200
- Likes: 12
- Shares: 1
- Saves: 0
- Reposts: 1
- Follows: 1

それ以前の同日12:53 JST頃の観測では、141 views / 92 reached、23秒動画、平均再生4秒、skip rate 49.2%、like rate 6.2%、Reels tab 69.4%、Explore 22.2%、Feed 8.3%だった。

確認できること:
- 新設アカウントでもReels / Explore主体の配布が発生した。
- Wittnauerより絶対viewsは小さい時点でも、フォロー獲得が観測された。

確認できないこと:
- CYMAという個体だけが配布の原因であること。
- Holy Grail訴求、18K、Chronomètre、音、動画構成のどの要素が反応を作ったかの分離。

## 2026-09-27 15:58 JST — VA 24h Analyticsとの突合

ユーザー提供Relay 24h snapshot（generated `20260927T065809270Z` = 2026-09-27 15:58:09 JST）を記録。

品質:
- quality: UNSAMPLED
- sample: 1
- coverage: full (`1/1/...`)
- integrity: PASS

24h:
- Visits: 10
- Pageviews: 10
- New: 10 / 10
- Previous period: 5 / 5
- X: 1
- Instagram: 1
- Facebook: 6
- Direct: 2
- Search / AI: 0

Landing / pages:
- `/en/how-they-ring/`: 5
- `/`: 2
- `/how-they-ring/`: 1
- `/owners-notes/`: 1
- `/basis-alarm/`: 1

External rows:
- `FB@www.facebook.com → /en/how-they-ring/`: 4
- `FB@www.facebook.com → /`: 2
- `IG@l.instagram.com → /en/how-they-ring/`: 1
- `X@t.co → /basis-alarm/`: 1
- Direct → `/how-they-ring/`: 1
- Direct → `/owners-notes/`: 1

Countries:
- United States: 7
- Japan: 2
- India: 1

Devices:
- Desktop: 6
- Mobile: 4

判定:
- Instagramとして明示された `/en/how-they-ring/` 到達が1 visit観測された。
- 現在のInstagram投稿本文にはVAリンクを置かず、プロフィール外部リンクをHOW THEY RINGへ置く運用（ユーザー説明ベース）。したがってこのIG到達はプロフィール導線と整合する。ただしAnalytics単独ではプロフィール画面上のクリック操作そのものまでは直接証明しない。
- FB 6 + IG 1はMeta系としてまとめて観測可能だが、FB 6をInstagram実ユーザー6人として加算しない。Meta側のfetch / preview等を含むかは未確認。
- `/en/how-they-ring/` は24h全10 visits中5 visitsで、現時点では海外SNS流入の受け皿として注視する価値がある。ただしn=5のため再現性は未確認。
- 前期間5→10 visitsという増加とInstagram開始の因果は未確認。

## 2026-09-27 16:35–16:39 JST — オーディエンス / 1,000再生 / Story再共有

ユーザー提供Instagram画面で追加確認。

### Wittnauer 10WA

16:35頃のInsights:
- Likes: 25
- Comments: 0
- Reposts: 1
- Shares: 3
- Saves: 5
- Followers: 0.3%
- Non-followers: 99.7%
- Age: 13–17 0.4% / 18–24 29.5% / 25–34 44.8% / 35–44 12.0% / 45–54 7.1% / 55–64 4.8% / 65+ 1.4%
- Country: India 36.5% / Turkey 8.5% / United States 4.8% / Mexico 4.5% / Iran 4.2%
- Gender: male 99.5% / female 0.5%

16:39頃のNotifications:
- Reelが500 views超、750 views超、1,000 views超の通知を順に受けていることを確認。
- 別ユーザーがWittnauer ReelをInstagram Storyへ再共有し、`vintagealarm` をメンションしている画面を確認。
- Story上から `リール動画の全編を再生` へ遷移できる表示を確認。
- これはSharesという集計値だけでなく、実際のStory再共有が少なくとも1件発生した直接観測として扱う。
- Story再共有が1,000 views到達の原因であるとは断定しない。

### CYMA Time-O-Vox 18K Chronomètre

16:36頃のInsights:
- Likes: 13
- Comments: 0
- Reposts: 1
- Shares: 1
- Saves: 0
- Followers: 1.0%
- Non-followers: 99.0%
- Age: 13–17 2.2% / 18–24 32.9% / 25–34 37.2% / 35–44 10.8% / 45–54 9.4% / 55–64 6.1% / 65+ 1.4%
- Country: India 17.0% / United States 12.3% / Iran 7.6% / Mexico 7.2% / Brazil 4.7%
- Gender: male 98.6% / female 1.4%

### 現時点の扱い

- 2投稿とも非フォロワー比率99%以上で、新規層への配布が主体であることを確認。
- 2投稿とも18–34歳が多数を占めるが、まだ2投稿なのでアカウント全体の恒常的オーディエンス像とは断定しない。
- 国別分布は投稿間で差が大きい。地域別の勝ち筋として固定せず、今後の個体でも同じ指標を記録する。
- Wittnauerでは保存・共有・Story再共有が実測された。単なるviews増加とは分けて追跡する。

## 次の固定観測

次回Pierce Duofon投稿でも、投稿前にVA現行Pierceページを確認したうえで、Instagram InsightsとVA Analyticsを同じ時間窓で突合する。

比較時に「伸びた個体へ都合よく説明を後付け」しない。個体、フック、動画尺、操作、音、投稿時刻など複数変数が同時に変わるため、少数投稿から単一原因を確定しない。

将来Reel自体に外部URL導線を載せられる条件・機能が利用可能になった場合は、プロフィール経由導線とは別実験として扱う。実装前後でInstagram側の配布・クリックとVA側landingを同じ時間窓で比較し、URL搭載そのものの効果を無対照で断定しない。
