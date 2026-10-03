# Instagram / Social 運用・観測ログ

公開サイト本文から切り離した、VINTAGE ALARMのSNS運用・実測記録。Instagram単体ではなく、既存のX / YouTube Shorts / VAサイト導線を先行実績として照合する。

## 投稿案を作る前の確認順

1. 現行VINTAGE ALARM該当ページ / HOW THEY RING
2. `measurement/.internal/.virtual/social/` と `measurement/experiment-log.md` の過去SNS実績
3. 過去X / YouTube / Instagramの実投稿・ユーザー提供スクリーンショット
4. Project資料（『The Alarm Wrist Watch』『Alarm am Arm』等）
5. 必要な一次資料・Web
6. 投稿案

**禁止:** 既存投稿・既存コンセプトを確認せず、直近データから「新しい切り口」として再発明しない。会話記憶は確認先の索引としてのみ使う。

## 既存SNSの役割

- X: 短く現代的な入口。正式モデル名、固有機構、実機、音、VA記事への導線を使う。
- YouTube Shorts: 操作・音・ギミックを短尺動画として発見面へ出す。過去実績をInstagram企画の先行比較材料にする。
- Instagram Reels: 海外向け・英語主体。Xの単純英訳ではなく、実機・実音・操作・機構差を主役にする。
- VA: 長く残る根拠・研究・Owner's Note・HOW THEY RINGの受け皿。

SNS内の成功（再生・保存・共有・リポスト・フォロー）と、VAへの送客成功は別指標として扱う。

---

## 2026-09-09 — Basis Alarm (BFG90) YouTube Shorts: fidget/toy訴求の先行実績

### 実投稿（2026-09-27ユーザー提供YouTube画面で再確認）

URL: `https://youtube.com/shorts/MWoqA4L2wdM`

画面で確認できた内容:
- Title: `Basis alarm (BFG90) #vintage #watch#toys`
- Published: 2026-09-09
- Views: 2,598（2026-09-27 17:04頃のユーザー提供画面）
- Likes: 24
- 日本語本文: `まるで機械式腕時計版のフィジェットトイ。見て、聴いて、触って楽しい、小さなおもちゃ箱。`
- 英語本文: `Like a fidget toy in mechanical wristwatch form — something to watch, hear, touch, and enjoy.`
- CTA: `Which feature would you try first?`
- VA導線: `https://vintagealarm.github.io/basis-alarm/#owners-note`

### 既存ログとの時系列

`measurement/experiment-log.md` に残っている2026-09-13観測:
- 過去48h Views: 2,043
- Shorts feed: 97.4%
- Other YouTube features: 1.5%
- YouTube Search: 0.9%
- Channel pages: 0.2%
- Browse features: 0%
- 過去60分 Views: 12
- 直近60分 Shorts feed: 66.7%

当時の判定:
- 大きな初動後も直近60分に再生が発生。
- 「第3波」「YouTubeが高評価して再配信」等の内部要因は断定しない。
- 説明欄リンクの新host更新は当時ユーザー報告として記録されていたが、2026-09-27の画面で新host URLを改めて確認。

### この先行実績の意味

`mechanical wristwatch × fidget toy / toys` は2026-09-27にInstagram年齢層を見て新規発案したものではない。Instagram開始以前の2026-09-09にBasis Alarmで実投稿済みのコンセプトであり、2,598 views / 24 likesまで観測されている。

したがってInstagramでこの表現を使う場合は「新企画」ではなく、**YouTube Shortsで既に実行したコンセプトの媒体横断再検証**として扱う。

Basis自体のVA上の核は、BFG90、2香箱、回転ベゼル式アラーム設定、9時位置ON/OFFスライダー、1時／5時位置の巻上げ表示窓。SNSではこの操作密度を「見て・聴いて・触って楽しい」「mechanical wristwatch formのfidget toy」という入口へ変換した実績がある。

---

## Instagram 運用ルール

- 海外向け・英語主体。英語として自然な本文と、英語構文を引きずらない自然な日本語訳をセットで確認する。
- 実機・実音・操作・機構差を主役にする。InstagramをX投稿の単純英訳版にはしない。
- プロフィールの外部導線はHOW THEY RING英語版を主入口として観測する。
- 初期探索期間は大きな施策変更を避け、同条件で標本を増やす。広告、頻度変更、既存Reel削除・再投稿等は十分な比較データなしに行わない。
- 毎投稿、可能な範囲で同じ時間窓（初動 / 数時間 / 24h）を比較する。
- Analytics上の `facebook` / `instagram` は生データを保持する。FB値をInstagram実ユーザーへ無条件に加算しない。
- 投稿本文にVAリンクを置いていない状態で `l.instagram.com → /en/how-they-ring/` が観測された場合、Instagramから英語HOW THEY RINGへの到達は確認済み。ただしAnalyticsだけでプロフィール画面上のクリック操作までは直接証明しない。

## 2026-10-03 — 投稿頻度低下＋1本あたり品質優先をACTIVE仮説としてログへ接続

### Decision
- 初期運用より投稿頻度を落とし、投稿前にWeb / 外部事例・過去SNS実績・対象WATCHの正本を確認して、1本あたりの内容品質を上げる。
- 目的は「低頻度そのもの」ではなく、VINTAGE ALARMのミッションである `discovery → understanding → experience → verification → research when necessary` に対して、1投稿がより強い入口になるかを検証すること。
- 現時点で固定の最適投稿回数は正本化しない。過去会話に具体回数があっても、現行正本で確認できない数値は復元せず `UNRESOLVED` とする。

### Origin
- **USER起点**。ユーザーがWeb参照を踏まえて投稿頻度を落とし、1本あたりの質を上げる運用を採用したと再確認。
- AI / Councilはこの判断を「正解」と固定するのではなく、既存ログで真偽を審議する役割とする。

### External check — 一般論の扱い
- Meta公式のInstagram Best Practicesは、Creation領域で「how often to post」を扱い、一般的な助言に加えて**アカウントごとのpersonalized tips**を提供すると説明している。公開説明自体は一律の最適回数を示していない。
  - https://about.fb.com/news/2024/10/best-practices-education-hub-creators-instagram/
- MetaのInstagram ranking説明では、share等を含む多数の予測を組み合わせ、**単一の予測だけで価値を判断しない**としている。
  - https://about.fb.com/news/2023/06/how-ai-ranks-content-on-facebook-and-instagram/
- したがって外部情報は「固定頻度の答え」ではなく仮説形成に使い、VINTAGE ALARM自身の実測で判断する。

### Existing evidence — 新KPIを増やさず使う
- `instagram-insights-timeseries.md`: 非フォロワー配布、views / viewers、平均再生、skip、保存、共有、repost、follow、profile access、bio-link等の時系列。
- `instagram-published-copy.md`: 実投稿本文・hashtags・採用訴求。内容品質やフック差を後から照合する。
- 本ファイル: YouTube Shorts / X / Instagramの先行実績と媒体横断比較。
- `measurement/experiment-log.md` / VA Analytics: SNS側の反応とHOW THEY RING / WATCHへの到達・内部遷移を分離して確認する。
- 写真 / Reel等のformat差は検証材料へ含める。ただし単発結果だけで「写真は弱い」「動画は強い」と一般化しない。

### Revisit / falsifier
次のどれかが継続的に観測された場合、低頻度＋品質優先の運用を再審議する。
- 投稿前調査・制作負荷を増やしても、同程度の比較条件で非フォロワー配布や保存 / 共有 / follow / profile action / VA到達が改善しない。
- 投稿間隔を空けたことによる発見機会の減少が、1投稿あたりの改善を上回ると観測できる。
- format差・個体差・投稿時刻差で説明できる変動を、頻度効果と誤認していたことが分かる。

### Status
**ACTIVE / UNDER VALIDATION**。現行ログはこの判断の審議材料として使う。検証のためだけに新しい計測系・保存先・ダッシュボードは追加しない。

---

## Instagram 初期完成条件

フォロワー数単独ではなく、初見ユーザーがReelから機械式アラーム腕時計のアカウントだと理解し、別個体・プロフィール・VAへ進む導線が再現すること。

追跡項目:
- Reels / 発見からの非フォロワー配布
- 遅延した追加配布・既存投稿の再加速
- 保存 / 共有 / リポスト / フォロー
- Story再共有等の実行動
- 年齢 / 国 / 性別（少数投稿で恒常的audience像と断定しない）
- プロフィールから外部導線への到達
- VA側SNS流入、landing page、国、device、内部遷移
- `/en/how-they-ring/` が海外SNS流入の受け皿として再現性を持つか

---

## 2026-09-27 15:45 JST — Instagram初期2投稿

### Wittnauer 10WA

ユーザー提供Insights:
- Views: 689
- Accounts reached: 499
- Likes: 14
- Shares: 3
- Saves: 4

同日12:54頃:
- 164 views / 136 reached
- Reels tab 78.0%
- Explore 17.0%
- Profile 5.0%
- skip rate 43.4%
- share rate 0.7%
- save rate 1.5%

確認済み:
- 初動で停止せず、時間経過後に追加配布を観測。
- Reels / Explore主体の外部配布を観測。
- 保存・共有が複数発生。

未確認:
- CYMA投稿がWittnauer再配布を引き起こした因果。
- アカウント学習完了・勝ち筋確定。

### CYMA Time-O-Vox 18K Chronomètre

ユーザー提供Insights:
- Views: 232
- Accounts reached: 200
- Likes: 12
- Shares: 1
- Saves: 0
- Reposts: 1
- Follows: 1

同日12:53頃:
- 141 views / 92 reached
- 23秒動画
- 平均再生4秒
- skip rate 49.2%
- like rate 6.2%
- Reels tab 69.4%
- Explore 22.2%
- Feed 8.3%

確認済み:
- 新設アカウントでもReels / Explore主体の配布。
- Wittnauerより絶対viewsが小さい時点でもフォロー獲得。

未確認:
- CYMAという個体だけが配布原因。
- 18K / Chronomètre / 希少性 / 音 / 動画構成のどれが反応要因か。

## 2026-09-27 15:58 JST — VA 24h Analytics突合

Relay snapshot generated `20260927T065809270Z`:
- quality: UNSAMPLED
- sample: 1
- coverage: full
- integrity: PASS
- Visits: 10
- Pageviews: 10
- New: 10 / 10
- Previous: 5 / 5
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

External:
- `FB@www.facebook.com → /en/how-they-ring/`: 4
- `FB@www.facebook.com → /`: 2
- `IG@l.instagram.com → /en/how-they-ring/`: 1
- `X@t.co → /basis-alarm/`: 1
- Direct → `/how-they-ring/`: 1
- Direct → `/owners-notes/`: 1

Countries: United States 7 / Japan 2 / India 1
Devices: Desktop 6 / Mobile 4

判定:
- Instagramとして明示された `/en/how-they-ring/` 到達を1 visit確認。
- 現在Instagram本文にはVAリンクを置かずプロフィール外部リンクをHOW THEY RINGへ置く運用（ユーザー説明ベース）のため、IG到達はプロフィール導線と整合。ただしクリック操作自体はAnalyticsだけでは証明しない。
- FB 6 + IG 1をMeta系として観測しても、FB 6をInstagram実ユーザー6人へ読み替えない。
- `/en/how-they-ring/` は24h全10 visits中5 visits。再現性はn=5のため未確認。
- previous 5→10とInstagram開始の因果は未確認。

## 2026-09-27 16:35–16:39 JST — audience / 1,000 views / Story再共有

### Wittnauer 10WA

16:35頃:
- Likes 25 / Comments 0 / Reposts 1 / Shares 3 / Saves 5
- Followers 0.3% / Non-followers 99.7%
- Age: 13–17 0.4% / 18–24 29.5% / 25–34 44.8% / 35–44 12.0% / 45–54 7.1% / 55–64 4.8% / 65+ 1.4%
- Country: India 36.5% / Turkey 8.5% / United States 4.8% / Mexico 4.5% / Iran 4.2%
- Gender: male 99.5% / female 0.5%

16:39頃:
- 500 / 750 / 1,000 views超の通知を確認。
- 別ユーザーがWittnauer ReelをStoryへ再共有し `vintagealarm` をメンション。
- Storyから `リール動画の全編を再生` へ遷移可能な表示を確認。
- Story再共有が1,000 views到達の原因とは断定しない。

### CYMA Time-O-Vox 18K Chronomètre

16:36頃:
- Likes 13 / Comments 0 / Reposts 1 / Shares 1 / Saves 0
- Followers 1.0% / Non-followers 99.0%
- Age: 13–17 2.2% / 18–24 32.9% / 25–34 37.2% / 35–44 10.8% / 45–54 9.4% / 55–64 6.1% / 65+ 1.4%
- Country: India 17.0% / United States 12.3% / Iran 7.6% / Mexico 7.2% / Brazil 4.7%
- Gender: male 98.6% / female 1.4%

横断判定:
- 2投稿とも非フォロワー99%以上。
- 18–34歳比率: Wittnauer 74.3%、CYMA 70.1%。
- ただし年齢と個々の保存・共有・フォロー行動のクロス集計はないため、「若年層がfidgetとして反応した」とは言えない。
- 国別分布は投稿間差が大きく、地域別勝ち筋として固定しない。

## 既存Basis fidget実績 × Instagram年齢観測の扱い

2026-09-27時点の新しい検討材料は「fidgetというアイデア」そのものではない。これはBasisで既にYouTube実投稿済み。

新しく検証できる問いは:

> YouTube Shortsで既に使った `mechanical wristwatch form — fidget toy / watch, hear, touch` というBasisの入口が、非フォロワー99%以上かつ18–34歳が約7割を占めた現在のInstagram配布面でも再現するか。

これは媒体横断検証として扱う。BasisをInstagramへ出す際にfidget/toy表現を使う場合、過去YouTube投稿をbaselineとして必ず比較対象へ入れる。

ただし以下は未確認:
- YouTubeの2,598 viewsがfidget文言そのものによって生じた因果。
- Instagramの18–34歳層がfidget/toy表現を好むこと。
- YouTubeとInstagramの配布母集団が同一であること。

## 次の固定観測

次回Pierce Duofon投稿でも、投稿前にVA現行Pierceページと過去SNS実績を確認し、Instagram InsightsとVA Analyticsを同じ時間窓で突合する。

比較時に伸びた個体へ都合よく説明を後付けしない。個体、フック、動画尺、操作、音、投稿時刻など複数変数が同時に変わるため、少数投稿から単一原因を確定しない。

将来Reel自体に外部URL導線を載せられる条件・機能が利用可能になった場合はプロフィール経由導線とは別実験とする。実装前後でInstagram側の配布・クリックとVA側landingを同じ時間窓で比較する。

## 2026-09-27 18:38 JST — Reel別 profile action / bio-link click 更新

ユーザー提供Instagram Insightsスクリーンショットで確認。

### CYMA Time-O-Vox 18K Chronomètre

Engagement / actions:
- Likes: 20
- Comments: 0
- Reposts: 1
- Shares: 1
- Saves: 0
- Profile accesses after display: 2
- Follows: 1
- Bio link clicks: 1

Audience:
- Followers: 0.6% / Non-followers: 99.4%
- Age: 13–17 1.3% / 18–24 33.1% / 25–34 39.0% / 35–44 12.6% / 45–54 7.4% / 55–64 4.4% / 65+ 2.3%
- 18–34 combined: 72.1%
- Country: India 24.0% / Turkey 8.7% / Iran 6.9% / United States 6.6% / Mexico 4.4%

判定:
- Instagram Insights上、このReel表示後の「自己紹介のリンククリック」を1件確認。
- 現行プロフィールTOP外部URLは英語版 HOW THEY RING のため、この1件はInstagram側でプロフィール外部リンクが押されたことの直接観測として扱う。
- ただし、Instagram側のlink click 1件とVA Analytics側の `IG@l.instagram.com → /en/how-they-ring/` 1 visitを、計測定義・時間窓を無視して同一イベントと断定しない。
- Profile access 2に対しbio link click 1だが、n=2のため50%を恒常的CVRとは扱わない。

### Wittnauer 10WA

Engagement / actions:
- Likes: 36
- Comments: 0
- Reposts: 1
- Shares: 10
- Saves: 9
- Profile accesses after display: 7
- Follows: 1
- Bio link clicks: 1

Audience:
- Followers: 0.2% / Non-followers: 99.8%
- Age: 13–17 0.9% / 18–24 30.5% / 25–34 43.3% / 35–44 13.1% / 45–54 6.2% / 55–64 4.2% / 65+ 1.7%
- 18–34 combined: 73.8%
- Country: India 34.9% / Turkey 9.4% / Iran 4.7% / South Korea 3.3% / United States 3.1%

判定:
- Instagram Insights上、このReel表示後の「自己紹介のリンククリック」を1件確認。
- Profile access 7 / bio link click 1。母数が小さいため14.3%を恒常的CVRとは扱わない。
- Shares 10 / Saves 9まで増加しており、Wittnauerは単なる再生だけでなく共有・保存行動が継続して増えている。
- Story再共有の既観測と合わせても、各共有が再生増加の直接原因とは断定しない。

### 2投稿横断で新しく確認できたこと

- **CYMAとWittnauerの両Reelで、Instagram Insights側からbio-link click 1件ずつを直接確認。**
- したがって現行ファネル
  `Reel → Instagram profile → TOP URL = /en/how-they-ring/`
  は、少なくともInstagram側のアクションとして両投稿から実際に発生した。
- これは従来のVA Analytics単独の `IG referrer → /en/how-they-ring/` より一段上流を直接観測できた更新。
- 一方、両Reelのlink click合計2件とVA側visit件数をそのまま1:1対応させない。計測タイミング、attribution、ページロード成立、RUM取得条件が異なる。
- 年齢構成は18–34がCYMA 72.1%、Wittnauer 73.8%で、16:35–16:36時点の「約7割」という観測が維持された。
- 国別構成は変動しており、固定audience像として扱わない。


## 2026-09-27 18:49 JST — VA 24h Analytics update after 18:38 Instagram Insights

User-provided Relay snapshot:
- generated: 2026-09-27 18:49:50 JST (`20260927T094950572Z`)
- quality: UNSAMPLED
- sample: 1
- coverage: full
- integrity: PASS

24h totals:
- Visits: 11
- Pageviews: 11
- New: 11 / 11
- Previous period: 4 / 4
- X: 1
- Instagram: 2
- Facebook: 6
- Direct: 2
- Search / AI / OtherSNS: 0

Pages / entries:
- `/en/how-they-ring/`: 6 / 6
- `/`: 2 / 2
- `/how-they-ring/`: 1 / 1
- `/owners-notes/`: 1 / 1
- `/basis-alarm/`: 1 / 1

External:
- `IG@l.instagram.com → /en/how-they-ring/`: 2
- `FB@www.facebook.com → /en/how-they-ring/`: 4
- `FB@www.facebook.com → /`: 2
- `X@t.co → /basis-alarm/`: 1
- Direct → `/how-they-ring/`: 1
- Direct → `/owners-notes/`: 1

Countries:
- United States: 7
- Japan: 2
- India: 2

Devices:
- Desktop: 6
- Mobile: 5

### Delta from 2026-09-27 15:58 JST snapshot

15:58 → 18:49:
- Visits: 10 → 11
- Pageviews: 10 → 11
- Instagram: 1 → 2
- `/en/how-they-ring/`: 5 → 6
- `IG@l.instagram.com → /en/how-they-ring/`: 1 → 2
- India: 1 → 2
- Mobile: 4 → 5

The increment is internally consistent: the one added visit is attributed to Instagram and lands on `/en/how-they-ring/`; mobile and India also each increase by one.

### Cross-check with 18:38 Instagram Insights

At 18:38, Instagram Insights directly showed:
- CYMA Reel: bio-link click 1
- Wittnauer Reel: bio-link click 1

At 18:49, VA Analytics shows:
- Instagram visits: 2
- `IG@l.instagram.com → /en/how-they-ring/`: 2

This is the strongest current evidence that the canonical funnel
`Reel → Instagram profile → TOP URL = /en/how-they-ring/`
is operating in practice.

However, do not equate the two Instagram bio-link clicks and the two VA visits as guaranteed one-to-one event identity. The counts align exactly, but the systems have different attribution and collection semantics. Treat as a strongly corroborated funnel observation, not event-level identity proof.

Also note: 6 / 11 visits (54.5%) land on English HOW THEY RING in this 24h window. This share is descriptive only; n=11 is still small.


## 2026-09-27 21:21 JST — Instagram profile snapshot

ユーザー提供Instagramプロフィール画面で確認。

Profile state:
- Account: `vintagealarm`
- Posts: 2
- Followers: 10
- Following: 38
- Bio:
  - `I have a thing for mechanical alarm watches. 🔔`
  - `Vintage watches that buzz, ring & rattle.`
  - `Photos, sounds and way too much digging.`
- Profile TOP external URL: `vintagealarm.github.io/en/how-they-ring/...`
- Professional dashboard card: `過去30日間に1,002回閲覧されました。`

Interpretation:
- The profile is no longer an empty/new-shell state: two Reels are visible, follower count has reached 10, and the canonical TOP URL to English HOW THEY RING is visibly installed.
- The 1,002 figure is recorded exactly as displayed by Instagram Professional Dashboard. Do not assume it equals the sum of Reel views; dashboard metric definition/update timing was not inspected in this screenshot.
- This snapshot should be used as an account-level baseline before Pierce Duofon is added.


## 2026-09-27 21:24–21:25 JST — Instagram Reels growth snapshot

ユーザー提供Instagram Insightsスクリーンショットで確認。

### Content list

CYMA Time-O-Vox 18K Chronomètre — `A holy grail among alar...`:
- Age of post: 10h
- Views: 1,175（詳細画面では直後に1,177）
- Likes: 35
- Comments: 0
- Reposts: 1
- Shares: 3

Wittnauer 10WA — `This watch rings. And...`:
- Age of post: 22h
- Views: 1,786（詳細画面では直後に1,787）
- Likes: 55
- Comments: 0
- Reposts: 3
- Shares: 14

### CYMA detail at 21:25

Overview:
- Views: 1,177
- Viewers: 987
- Average watch time: 7s
- Follows: 1

Actions / engagement:
- Profile accesses after display: 3
- Follows: 1
- Bio-link taps: 1
- Likes: 35
- Comments: 0
- Reposts: 1
- Saves: 5
- Share count in this detailed panel is shown as `--`; content-list summary above shows 3 shares. Preserve both UI observations rather than forcing them into one field.

Delta from 18:38 CYMA snapshot:
- Likes: 20 → 35
- Profile accesses: 2 → 3
- Follows: 1 → 1
- Bio-link taps: 1 → 1
- Saves: 0 → 5
- Reposts: 1 → 1
- Content-list shares: 1 at earlier 18:38 snapshot → 3 at 21:24 list
- Views had previously been 232 at 15:45 and are now 1,177.

### Wittnauer detail at 21:25

Overview:
- Views: 1,787
- Viewers: 1,468
- Average watch time: 6s
- Follows: 2
- Skip rate: 42.4%

Content-list engagement:
- Likes: 55
- Comments: 0
- Reposts: 3
- Shares: 14

Delta from 18:38 Wittnauer snapshot:
- Likes: 36 → 55
- Reposts: 1 → 3
- Shares: 10 → 14
- Follows: 1 → 2
- Views: 1,787 at 21:25
- Saves were 9 at 18:38; no new Wittnauer save value is visible in the supplied 21:24–21:25 screenshots, so do not assume it changed.

### Current descriptive comparison

- Wittnauer still leads absolute distribution: 1,787 views vs CYMA 1,177.
- CYMA has also crossed 1,000 views and accelerated materially after its earlier low hundreds.
- CYMA average watch time is 7s on the 23s Reel (~30% of runtime); Wittnauer is 6s on the 12s Reel (~50% of runtime). This is a descriptive ratio only, not a causal explanation for distribution.
- Wittnauer continues to produce more outward interaction in the visible metrics (shares/reposts) and has now generated 2 follows.
- CYMA has developed stronger-than-earlier save behavior (0 → 5) while retaining its existing profile/bio-link/follow actions.
- Both Reels are now large enough relative to the account's current size that the initial "almost no one sees the new account" phase is no longer an accurate description.


## 2026-09-27 23:51 JST — Instagram broadcast-channel invitation observed

ユーザー提供Instagramスクリーンショットで確認。

Observed channel:
- Channel name: `The luckytimers`
- Creator/account shown: `luckytimelondon` (verified badge visible)
- Members shown: 3.5K
- UI states that anyone can join the channel created by `luckytimelondon`
- User is shown `参加` / `承認しない` controls
- Channel content visible in screenshot includes vintage-watch shop / Amsterdam-related posts and a message: `If your ever in Amsterdam check these places out`

Interpretation:
- This is an Instagram broadcast-channel invitation / join prompt, not evidence of a private one-to-one DM invitation.
- Because the creator/account is watch-related and the channel content is directly relevant to vintage-watch retail/discovery, this is a potentially useful passive networking / market-observation surface for the VINTAGE ALARM account.
- Do not record it as a confirmed personal outreach from the creator unless the UI later shows a direct message or explicit individualized invitation.


## 2026-09-28 00:03 JST — late-night Reel snapshot

ユーザー提供Instagram Insightsスクリーンショットで確認。

### Wittnauer 10WA
- Views: 2,080
- Viewers: 1,661
- Average watch time: 6s
- Follows: 3
- Likes: 74
- Comments: 1
- Reposts: 3
- Saves: 17
- Skip rate: 40.9%
- Share rate: 1.1%
- Like rate: 4.4%
- Save rate: 1.0%
- Repost rate: 0.2%
- Comment rate: 0.1%

### CYMA Time-O-Vox 18K Chronomètre
- Views: 1,394
- Viewers: 1,205
- Average watch time: 7s
- Follows: 2
- Likes: 42
- Comments: 0
- Reposts: 1
- Saves: 6
- Skip rate: 52.6%
- Share rate: 0.2%
- Like rate: 3.4%
- Save rate: 0.5%
- Repost rate: 0.1%
- Comment rate: 0.0%

### Descriptive comparison only
- Wittnauer leads on absolute reach and visible interaction rates, especially skip/save/share/like metrics.
- CYMA has longer average watch time in seconds, but its Reel is also longer; do not compare seconds alone without normalizing by duration.
- These metrics support a difference in observed audience response, but do not by themselves identify the causal creative element or Instagram's internal distribution logic.


## 2026-09-28 06:59–07:00 JST — morning Reel comparison snapshot

ユーザー提供Instagram Insightsスクリーンショットで確認。

### Wittnauer 10WA

Overview:
- Views: 2,563
- Viewers: 2,094
- Average watch time: 6s
- Follows: 6
- Likes: 101
- Comments: 1
- Reposts: 3
- Shares: 25
- Saves: 20

Rates:
- Skip rate: 41.0%
- Share rate: 1.2%
- Like rate: 4.9%
- Save rate: 1.0%
- Repost rate: 0.1%
- Comment rate: 0.0%

Post-view actions:
- Profile accesses: 29
- Follows: 6
- Bio-link clicks: 1

Audience:
- Followers: 0.7% / Non-followers: 99.3%
- Age: 13–17 0.7% / 18–24 24.5% / 25–34 42.3% / 35–44 16.1% / 45–54 8.1% / 55–64 5.3% / 65+ 3.0%
- 18–34 combined: 66.8%
- Country: India 27.1% / Turkey 8.3% / France 5.8% / Iran 4.6% / United States 3.8%

Delta from 2026-09-28 00:03 snapshot:
- Views: 2,080 → 2,563 (+483)
- Viewers: 1,661 → 2,094 (+433)
- Likes: 74 → 101 (+27)
- Follows: 3 → 6 (+3)
- Saves: 17 → 20 (+3)
- Shares: 25 remained 25
- Skip rate: 40.9% → 41.0% (essentially stable)

### CYMA Time-O-Vox 18K Chronomètre

Overview:
- Views: 1,553
- Viewers: 1,357
- Average watch time: 7s
- Follows: 2
- Likes: 53
- Comments: 1
- Reposts: 1
- Shares: 3
- Saves: 6

Rates:
- Skip rate: 53.7%
- Share rate: 0.2%
- Like rate: 3.9%
- Save rate: 0.4%
- Repost rate: 0.1%
- Comment rate: 0.1%

Post-view actions:
- Profile accesses: 8
- Follows: 2
- Bio-link clicks: 1

Audience:
- Followers: 1.0% / Non-followers: 99.0%
- Age: 13–17 0.7% / 18–24 27.3% / 25–34 35.0% / 35–44 14.6% / 45–54 10.1% / 55–64 6.8% / 65+ 5.5%
- 18–34 combined: 62.3%
- Country: India 18.7% / France 8.5% / Turkey 8.0% / Iran 5.7% / Italy 5.3%

Delta from 2026-09-28 00:03 snapshot:
- Views: 1,394 → 1,553 (+159)
- Viewers: 1,205 → 1,357 (+152)
- Likes: 42 → 53 (+11)
- Follows: 2 → 2
- Saves: 6 → 6
- Shares: 3 → 3
- Skip rate: 52.6% → 53.7% (+1.1pt)

### Cross-Reel descriptive comparison

- Wittnauer continues to outperform CYMA not only in absolute views but in visible engagement rates: lower skip, higher share, higher like, higher save, more profile accesses, and more follows.
- Approximate post-view profile-access rate by views: Wittnauer 29/2,563 ≈ 1.13%; CYMA 8/1,553 ≈ 0.52%.
- Approximate follow rate by views: Wittnauer 6/2,563 ≈ 0.23%; CYMA 2/1,553 ≈ 0.13%.
- Bio-link clicks remain 1 on each Reel; therefore site-driving behavior has not scaled in proportion to Wittnauer's additional distribution yet.
- Audience composition broadened with additional distribution: the 18–34 share fell from earlier ~70%+ observations to 66.8% (Wittnauer) and 62.3% (CYMA). India also declined in share on both, while France emerged among top countries. Treat this as audience broadening, not a fixed demographic pivot.
- Causality remains unproven: current evidence identifies response differences, not the creative/mechanical reason for them.


## 2026-09-28 08:07 JST — Pierce Duofon Reel posted

ユーザー提供の投稿済み動画ファイル `IMG_1739(1).mp4` を確認。

Video metadata:
- Duration: 10.97s
- Resolution: 512 × 710
- Frame rate: 30fps
- Audio track: present

Visual sequence confirmed from sampled frames:
- Pierce Duofon full-dial opening shot
- crown operation shown close-up
- return to full dial / crown state
- the watch remains the sole visual focus; no added graphic layer is visible in the sampled frames

Current post concept:
- Pierce Duofon
- primary historical/mechanical hook: the only series-produced / mass-produced alarm wristwatch described in the project sources as offering a choice of alarm volumes
- two selectable modes: `Wecker` / `Signal`
- 6 o'clock window indicates the selected mode
- canonical Instagram profile destination remains English HOW THEY RING

Interpretation:
- Compared with the earlier ~31.8s source clip, the published cut is materially shorter at ~11s.
- This gives Pierce a duration much closer to the successful short Wittnauer Reel than to the longer CYMA Reel, while preserving the core manipulation sequence.
- Do not infer performance from duration alone; record this as the creative state before Insights arrive.


## 2026-09-28 11:00 JST — Pierce Duofon first Insights report

ユーザー提供Instagram Insightsスクリーンショットで確認。

### Pierce Duofon

Overview:
- Views: 275
- Viewers: 168
- Average watch time: 6s
- Follows: 0
- Likes: 5
- Comments: 0
- Reposts: 0
- Shares: 0
- Saves: 1

Rates shown by Instagram:
- Skip rate: 41.2%（低）
- Share rate: 0.0%（低）
- Like rate: 2.3%（低）
- Save rate: 0.5%（低）
- Repost rate: 0.0%（低）
- Comment rate: 0.0%（低）

Audience:
- Followers: 2.7% / Non-followers: 97.3%
- Age: 13–17 0.0% / 18–24 32.7% / 25–34 45.2% / 35–44 13.9% / 45–54 3.4% / 55–64 2.4% / 65+ 2.4%
- 18–34 combined: 77.9%
- Country: United States 15.3% / India 7.2% / United Kingdom 6.2% / Turkey 5.7% / Spain 5.3%

### First-report interpretation

- The published Reel duration is 10.97s. Average watch time 6s corresponds to roughly 54.7% of runtime; treat this as a descriptive ratio only.
- Skip rate 41.2% is shown by Instagram as `低` and is close to the later Wittnauer ~41% level, but Pierce is still at a much smaller sample and earlier lifecycle, so do not treat the two as equivalent performance.
- Early engagement beyond viewing is weak so far: 5 likes, 1 save, no share/repost/comment, no follows.
- Non-follower distribution is already dominant at 97.3%.
- Audience is especially young at this snapshot: 18–34 = 77.9%.
- Country mix differs from the earlier Wittnauer/CYMA snapshots: United States leads at 15.3%, while India is 7.2%. Do not treat this as a stable audience shift yet.
- No bio-link click or profile-access figure is visible in the supplied screenshots; do not record zero unless Instagram explicitly displays zero.


## 2026-09-28 11:15 JST — VA 24h Analytics snapshot after Pierce first report

User-provided Relay snapshot:
- generated: 2026-09-28 11:15:03 JST (`20260928T021503813Z`)
- quality: UNSAMPLED
- sample: 1
- integrity: PASS

24h totals:
- Visits: 10
- Pageviews: 11
- Previous period: 6 / 6
- Instagram: 4
- Facebook: 2
- Search: 3
- Direct: 1
- X / YouTube / AI / OtherSNS: 0
- internalVisits: 0
- internalPV: 1

Pages / entries:
- `/en/how-they-ring/`: 4 / 4
- `/en/pierce-duofon/`: 3 / 3
- `/`: 2 / 2
- `/how-they-ring/`: 1 / 1
- `/en/wittnauer-10wa/`: 1 pageview / 0 entries

External:
- `IG@l.instagram.com → /en/how-they-ring/`: 4
- `SEARCH@www.bing.com → /en/pierce-duofon/`: 3
- `FB@www.facebook.com → /`: 2
- Direct → `/how-they-ring/`: 1

Observed internal flow:
- `/en/how-they-ring/ → /en/wittnauer-10wa/`: 1 internal pageview

Countries:
- India: 4
- France: 3
- United States: 2
- Japan: 1
- Hong Kong: 1

Devices:
- Desktop: 6
- Mobile: 5

### Interpretation

- Instagram-to-site funnel remains active: 4 Instagram-attributed visits land on the canonical English HOW THEY RING profile destination.
- A concrete downstream internal navigation is now observed: one pageview from `/en/how-they-ring/` to `/en/wittnauer-10wa/`. This is the first explicit flow row in the current social-funnel tracking that directly matches the intended `HOW THEY RING → WATCH` next step.
- Search is simultaneously contributing a separate acquisition path: Bing delivered 3 entries directly to `/en/pierce-duofon/`.
- Do not compare raw total visits directly with the prior 18:49 snapshot as a simple delta because both are rolling 24h windows and the window contents changed.
- Do not attribute the three Pierce search entries to the newly posted Instagram Reel; Relay explicitly classifies them as Bing search.


## 2026-09-28 13:04–13:05 JST — Pierce Duofon second Insights report

ユーザー提供Instagram Insightsスクリーンショットで確認。

### Pierce Duofon

Overview:
- Views: 1,421
- Viewers: 993
- Average watch time: 6s
- Follows: 0
- Likes: 30
- Comments: 0
- Reposts: 1
- Shares: UI summary shows `--`; Instagram rate panel shows share rate 0.6%
- Saves: 5

Rates shown by Instagram:
- Skip rate: 42.0%（低）
- Share rate: 0.6%（低）
- Like rate: 2.8%（低）
- Save rate: 0.5%（低）
- Repost rate: 0.1%（低）
- Comment rate: 0.0%（低）

Post-view actions:
- Profile accesses: 2
- Follows: 0

Audience:
- Followers: 0.8% / Non-followers: 99.2%
- Age: 13–17 2.0% / 18–24 39.2% / 25–34 43.0% / 35–44 9.4% / 45–54 3.2% / 55–64 1.6% / 65+ 1.7%
- 18–34 combined: 82.2%
- Country: India 28.6% / United States 15.5% / Mexico 5.1% / Brazil 4.8% / Canada 4.3%

### Delta from 11:00 first report

- Views: 275 → 1,421 (+1,146)
- Viewers: 168 → 993 (+825)
- Likes: 5 → 30 (+25)
- Saves: 1 → 5 (+4)
- Reposts: 0 → 1
- Follows: 0 → 0
- Skip rate: 41.2% → 42.0% (+0.8pt; essentially stable)
- Non-followers: 97.3% → 99.2%
- 18–34 audience: 77.9% → 82.2%
- India: 7.2% → 28.6%
- United States: 15.3% → 15.5% (essentially stable)

### Interpretation

- Pierce moved from 275 to 1,421 views in roughly two hours while skip rate remained nearly unchanged around 42%, indicating much broader distribution without a meaningful deterioration in the observed skip metric.
- The early country mix changed sharply: India rose from 7.2% to 28.6%, becoming the largest country share, while the United States remained near 15%.
- The audience became even younger by share: 18–34 increased to 82.2%.
- Engagement remains materially weaker than Wittnauer at a similar stage, but Pierce is no longer an early low-distribution case; it has clearly entered broader non-follower distribution.
- No follow conversion yet despite 2 profile accesses.
- Do not infer that India caused the growth; the observed change is demographic correlation within the expanded distribution, not a causal explanation.


## 2026-09-28 13:10 JST — Pierce like-timing hypothesis

ユーザー提供のPierce投稿済み動画（10.97s）と、13:04 Insightsの「リール動画が『いいね！』された時」グラフを突合。

Confirmed from video/audio:
- Alarm sound begins around 2.5–3.0s.
- User identifies the volume-switch point at about 6.5s; audio level also changes around the 6s台.
- The Reel is ~11s total.

Confirmed from like-timing graph:
- strongest visible like-timing peaks occur earlier in the Reel, including a prominent peak around the first alarm section.
- a smaller secondary local rise appears around the 6s台 before dropping again.

Interpretation:
- The secondary rise is temporally consistent with the ~6.5s volume-switch moment, so it is reasonable to treat the switch as a candidate reaction trigger.
- This is not causal proof. The graph is coarse, total likes at this snapshot are only 30, and Instagram does not expose sub-second event-level like data here.
- Do not rewrite the creative based on this alone; continue observing whether later larger samples preserve a secondary bump around the switch.


## 2026-09-28 13:58–14:00 JST — Pierce Duofon continued growth

ユーザー提供Instagram Insightsスクリーンショットで確認。

### Pierce Duofon
- Views: 1,640
- Viewers: 1,136
- Average watch time: 7s
- Follows: 0
- Likes: 34
- Comments: 0
- Reposts: 1
- Saves: 5
- Share count: summary UI shows `--`; rate panel shows share rate 0.5%
- Skip rate: 40.7%（低）
- Share rate: 0.5%（低）
- Like rate: 2.8%（低）
- Save rate: 0.4%（低）
- Repost rate: 0.1%（低）
- Comment rate: 0.0%（低）
- Profile accesses: 4
- Followers / non-followers: 0.7% / 99.3%

Audience:
- Age: 13–17 1.8% / 18–24 38.5% / 25–34 42.3% / 35–44 9.4% / 45–54 4.2% / 55–64 2.2% / 65+ 1.5%
- 18–34 combined: 80.8%
- Country: India 29.0% / United States 14.5% / Mexico 5.2% / Brazil 4.4% / Canada 4.0%

Delta from 13:04:
- Views: 1,421 → 1,640 (+219)
- Viewers: 993 → 1,136 (+143)
- Average watch time: 6s → 7s
- Likes: 30 → 34
- Profile accesses: 2 → 4
- Saves: 5 → 5
- Skip rate: 42.0% → 40.7% (improved 1.3pt)
- India: 28.6% → 29.0% (stable)
- 18–34: 82.2% → 80.8% (still very high)

### Like-timing note
- The updated like-timing graph still shows multiple local peaks rather than a single monotonic concentration.
- A local rise remains visible in the mid-Reel region consistent with the previously noted volume-switch segment, but the graph is coarse and should not be interpreted as event-level causal proof.
- The end-of-Reel point also rises, so repeat/loop/end behavior may contribute to the timing distribution.

### Comparison caveat
- Pierce at 1,640 views exceeds the latest shared CYMA snapshot of 1,553 views from 07:00 JST.
- This is not a same-minute head-to-head comparison because no 13:58 CYMA snapshot was supplied. Record only that Pierce has surpassed the last observed CYMA count.


## 2026-09-28 17:35–17:37 JST — Pierce Duofon late-afternoon snapshot

ユーザー提供Instagram Insightsスクリーンショットで確認。

### Pierce Duofon
- Views: 1,897
- Viewers: 1,378
- Average watch time: 7s
- Follows: 0
- Likes: 39
- Comments: 0
- Reposts: 1
- Saves: 5
- Share count: summary UI shows `--`; rate panel shows share rate 0.4%
- Skip rate: 43.5%（低）
- Share rate: 0.4%（低）
- Like rate: 2.8%（低）
- Save rate: 0.4%（低）
- Repost rate: 0.1%（低）
- Comment rate: 0.0%（低）
- Profile accesses: 5
- Followers / non-followers: 0.9% / 99.1%

Audience:
- Age: 13–17 1.6% / 18–24 35.8% / 25–34 41.6% / 35–44 10.1% / 45–54 5.7% / 55–64 3.0% / 65+ 2.1%
- 18–34 combined: 77.4%
- Country: India 28.2% / United States 12.3% / Mexico 4.6% / Iran 4.3% / Brazil 3.7%

Delta from 13:58:
- Views: 1,640 → 1,897 (+257)
- Viewers: 1,136 → 1,378 (+242)
- Average watch time: 7s → 7s
- Likes: 34 → 39 (+5)
- Profile accesses: 4 → 5
- Saves: 5 → 5
- Reposts: 1 → 1
- Follows: 0 → 0
- Skip rate: 40.7% → 43.5% (+2.8pt)
- India: 29.0% → 28.2%
- United States: 14.5% → 12.3%
- 18–34: 80.8% → 77.4%

### Like-timing update
- The updated like-timing graph shows its clearest early peak near the opening seconds and another distinct mid-Reel peak earlier than the previously hypothesized ~6.5s volume-switch point.
- Around ~6–7s there is no equally distinct new spike in this later snapshot.
- Therefore the earlier hypothesis that the 6.5s volume switch itself is producing a secondary like peak is weaker on this larger sample. Keep it as unconfirmed rather than supported.
- The end-of-Reel rise remains visible.

### Interpretation
- Distribution is still growing, but the curve has visibly flattened compared with the earlier 11:00→13:04 expansion.
- Skip worsened from 40.7% to 43.5% while remaining labeled `低` by Instagram; average watch time remains 7s.
- Interaction conversion remains weak relative to views: saves and follows did not increase, profile accesses only rose by one.
- India remains the largest country segment near 28%, but its share is no longer rising.


## 2026-09-28 17:35–17:37 JST — Wittnauer 10WA still-active snapshot

ユーザー提供Instagram Insightsスクリーンショットで確認。

### Wittnauer 10WA
- Views: 2,744
- Viewers: 2,225
- Average watch time: 6s
- Follows: 12
- Likes: 112
- Comments: 1
- Reposts: 3
- Saves: 23
- Share count: summary UI shows `--`; rate panel shows share rate 1.1%
- Skip rate: 41.2%
- Share rate: 1.1%
- Like rate: 5.0%
- Save rate: 1.0%
- Repost rate: 0.1%
- Comment rate: 0.0%
- Profile accesses: 31
- Bio-link clicks: 2
- Followers / non-followers: 0.7% / 99.3%

Audience:
- Age: 13–17 0.7% / 18–24 24.2% / 25–34 41.7% / 35–44 16.3% / 45–54 8.6% / 55–64 5.4% / 65+ 3.2%
- 18–34 combined: 65.9%
- Country: India 26.2% / Turkey 8.2% / France 5.6% / Iran 4.5% / United States 4.4%

Delta from 2026-09-28 07:00:
- Views: 2,563 → 2,744 (+181)
- Viewers: 2,094 → 2,225 (+131)
- Likes: 101 → 112 (+11)
- Saves: 20 → 23 (+3)
- Follows: 6 → 12 (+6)
- Profile accesses: 29 → 31 (+2)
- Bio-link clicks: 1 → 2 (+1)
- Comments: 1 → 1
- Reposts: 3 → 3
- Skip rate: 41.0% → 41.2% (essentially stable)
- Like rate: 4.9% → 5.0%
- Save rate: 1.0% → 1.0%
- India: 27.1% → 26.2%
- 18–34: 66.8% → 65.9%

### Interpretation
- Wittnauer remains active well after its initial release window: views and viewers continue increasing while skip rate remains essentially unchanged around 41%.
- The most notable late change is attributed follows: 6 → 12 despite only +181 additional views in this interval. Profile accesses rose only 29 → 31, so do not assume all follows occurred through a profile visit; preserve Instagram's own attribution fields separately.
- Bio-link clicks increased from 1 → 2, giving the Reel a second directly observed link-click attribution.
- Saves also increased 20 → 23. This supports continued downstream action beyond passive viewing, unlike the contemporaneous Pierce snapshot where saves/follows were flat.
- Country and age composition remain broadly stable; India remains the largest country segment.


## 2026-09-28 17:47 JST — reconciliation: same-time CYMA snapshot not persisted

GitHub main / social log historyを監査。

- 17:35台のPierce Duofon snapshotは記録済み。
- 17:35台のWittnauer 10WA snapshotは記録済み。
- 同時刻に撮影されたとユーザーが説明したCYMA Time-O-Vox 18K Chronomètre snapshotは、GitHub mainのsocial logにも同時刻commitにも見つからない。
- GitHub上で最後に永続化されているCYMA snapshotは2026-09-28 07:00 JST:
  - Views 1,553
  - Viewers 1,357
  - Average watch time 7s
  - Follows 2
  - Likes 53
  - Comments 1
  - Reposts 1
  - Shares 3
  - Saves 6
  - Skip 53.7%
  - Profile accesses 8
  - Bio-link clicks 1
- したがって07:00 CYMA値を17:35の同時刻3-way comparisonとして扱わない。
- 17:35 Wittnauer snapshotが同内容で二重記録されていたため、重複ブロックを1件削除して正規化した。

Current same-time comparable pair at ~17:35:
- Pierce: 1,897 views / 1,378 viewers / avg 7s / 39 likes / 5 saves / 0 follows / 5 profile accesses / skip 43.5%
- Wittnauer: 2,744 views / 2,225 viewers / avg 6s / 112 likes / 23 saves / 12 follows / 31 profile accesses / 2 bio-link clicks / skip 41.2%


## 2026-09-28 17:49–17:50 JST — CYMA Time-O-Vox 18K Chronomètre same-window snapshot

ユーザー提供Instagram Insightsスクリーンショットで確認。先ほどGitHub上で欠けていた17:35台比較用のCYMA最新値を、17:49撮影として補完。

### CYMA Time-O-Vox 18K Chronomètre
- Views: 1,609
- Viewers: 1,408
- Average watch time: 7s
- Follows: 2
- Likes: 57
- Comments: 1
- Reposts: 1
- Saves: 6
- Share count: summary UI shows `--`; rate panel shows share rate 0.2%
- Skip rate: 53.8%（高）
- Share rate: 0.2%（低）
- Like rate: 4.0%（低）
- Save rate: 0.4%（低）
- Repost rate: 0.1%（低）
- Comment rate: 0.1%（高）
- Profile accesses: 10
- Bio-link clicks: 1
- Followers / non-followers: 1.1% / 98.9%

Audience:
- Age: 13–17 0.7% / 18–24 26.8% / 25–34 34.8% / 35–44 15.0% / 45–54 10.2% / 55–64 7.0% / 65+ 5.5%
- 18–34 combined: 61.6%
- Country: India 18.1% / France 8.4% / Turkey 7.9% / Iran 5.8% / Italy 5.3%

Delta from 07:00:
- Views: 1,553 → 1,609 (+56)
- Viewers: 1,357 → 1,408 (+51)
- Likes: 53 → 57 (+4)
- Profile accesses: 8 → 10 (+2)
- Follows: 2 → 2
- Bio-link clicks: 1 → 1
- Saves: 6 → 6
- Reposts: 1 → 1
- Comments: 1 → 1
- Skip rate: 53.7% → 53.8% (+0.1pt; essentially flat)
- 18–34: 62.3% → 61.6%
- India: 18.7% → 18.1%

### Same-window three-Reel comparison (~17:35–17:49)

Wittnauer 10WA:
- 2,744 views / 2,225 viewers / avg 6s
- 112 likes / 23 saves / 12 follows
- 31 profile accesses / 2 bio-link clicks
- skip 41.2%

Pierce Duofon:
- 1,897 views / 1,378 viewers / avg 7s
- 39 likes / 5 saves / 0 follows
- 5 profile accesses
- skip 43.5%

CYMA Time-O-Vox 18K Chronomètre:
- 1,609 views / 1,408 viewers / avg 7s
- 57 likes / 6 saves / 2 follows
- 10 profile accesses / 1 bio-link click
- skip 53.8%

### Interpretation
- Wittnauer remains strongest across both viewing and downstream action.
- Pierce has more total views than CYMA, but CYMA has slightly more unique viewers (1,408 vs 1,378). This means Pierce's lead in total views is not explained by reaching more unique people in this snapshot; repeat/looped viewing is a plausible contributor, but Instagram does not expose causal playback-level detail here.
- CYMA continues to have the weakest skip performance of the three (53.8%), yet its downstream conversion is clearly stronger than Pierce: 2 follows vs 0, 10 profile accesses vs 5, and 1 bio-link click vs no visible Pierce bio-link figure.
- CYMA is therefore not simply "weak": it is weaker at keeping viewers from skipping, but stronger than Pierce at turning a smaller view pool into profile/follow/site actions.
- This completes the missing same-window three-way comparison noted in the 17:47 reconciliation.


## 2026-09-29 06:13 JST — Wittnauer 10WA overnight long-tail snapshot

ユーザー提供Instagram Insightsスクリーンショットで確認。

### Wittnauer 10WA
- Views: 2,998
- Viewers: 2,411
- Average watch time: 6s
- Follows: 13
- Likes: 124
- Comments: 1
- Reposts: 4
- Saves: 23
- Share count: detailed summary shows `--`; rate panel shows share rate 1.2%
- Skip rate: 42.1%
- Share rate: 1.2%
- Like rate: 5.1%
- Save rate: 0.9%
- Repost rate: 0.2%
- Comment rate: 0.0%
- Profile accesses: 37
- Bio-link clicks: 2
- Followers / non-followers: 0.7% / 99.3%

Audience:
- Age: 13–17 0.6% / 18–24 23.6% / 25–34 41.2% / 35–44 16.9% / 45–54 9.0% / 55–64 5.6% / 65+ 3.1%
- 18–34 combined: 64.8%
- Country: India 25.1% / Turkey 8.1% / France 5.7% / United States 4.5% / Iran 4.4%

Delta from 2026-09-28 17:35:
- Views: 2,744 → 2,998 (+254)
- Viewers: 2,225 → 2,411 (+186)
- Likes: 112 → 124 (+12)
- Follows: 12 → 13 (+1)
- Profile accesses: 31 → 37 (+6)
- Bio-link clicks: 2 → 2
- Reposts: 3 → 4 (+1)
- Saves: 23 → 23
- Comments: 1 → 1
- Skip rate: 41.2% → 42.1% (+0.9pt)
- Share rate: 1.1% → 1.2%
- Like rate: 5.0% → 5.1%
- Save rate: 1.0% → 0.9%
- India: 26.2% → 25.1%
- 18–34: 65.9% → 64.8%

### Interpretation
- Wittnauer continues receiving new viewers overnight rather than only accumulating repeat plays: +254 views accompanied by +186 unique viewers.
- Downstream action also continues: +6 profile accesses, +1 follow, +1 repost, +12 likes. Bio-link clicks and saves did not increase in this interval.
- Skip remains near the same band (41.2% → 42.1%) despite continued distribution, while like/share rates remain slightly stronger than the prior snapshot.
- This strengthens the observed long-tail pattern: Wittnauer is not merely retaining views; it continues to produce profile and follow actions after the main initial growth phase.
- India remains the largest country share but continues to ease gradually (26.2% → 25.1%), consistent with audience broadening rather than a single-country concentration.


## 2026-09-29 06:15 JST — Pierce Duofon overnight snapshot

Instagram Insights screenshots supplied by user.

- Views: 2,339
- Viewers: 1,679
- Average watch time: 7s
- Follows: 3
- Likes: 61
- Comments: 2
- Reposts: 1
- Saves: 8
- Skip rate: 43.6%
- Share rate: 0.3%
- Like rate: 3.5%
- Save rate: 0.5%
- Repost rate: 0.1%
- Comment rate: 0.1%
- Profile accesses: 15
- Followers / non-followers: 0.9% / 99.1%
- Age: 13–17 1.5% / 18–24 31.7% / 25–34 38.3% / 35–44 11.8% / 45–54 8.4% / 55–64 4.7% / 65+ 3.7%
- Country: India 26.2% / United States 10.4% / Iran 5.6% / Mexico 3.8% / Canada 3.3%

Delta from 2026-09-28 17:35:
- Views +442
- Viewers +301
- Likes +22
- Comments +2
- Saves +3
- Profile accesses +10
- Follows +3
- Reposts unchanged
- Skip 43.5% → 43.6%
- Like rate 2.8% → 3.5%
- Save rate 0.4% → 0.5%
- 18–34 share 77.4% → 70.0%

Interpretation:
Pierce showed a clear delayed-conversion phase overnight. Unlike the late-afternoon snapshot, profile visits, follows and saves all increased while skip stayed effectively flat. The earlier shorthand "viewed but did not convert" is no longer accurate as a current-state description.
## 2026-09-29 06:13–06:14 JST — CYMA Time-O-Vox 18K Chronomètre overnight snapshot

ユーザー提供Instagram Insightsスクリーンショットで確認。

### CYMA Time-O-Vox 18K Chronomètre
- Views: 1,678
- Viewers: 1,468
- Average watch time: 7s
- Follows: 2
- Likes: 61
- Comments: 2
- Reposts: 1
- Saves: 6
- Share count: summary UI shows `--`; rate panel shows share rate 0.2%
- Skip rate: 53.9%（高）
- Share rate: 0.2%（低）
- Like rate: 4.1%（低）
- Save rate: 0.4%（低）
- Repost rate: 0.1%（低）
- Comment rate: 0.1%（高）
- Profile accesses: 10
- Bio-link clicks: 1
- Followers / non-followers: 1.1% / 98.9%

Audience:
- Age: 13–17 0.7% / 18–24 26.7% / 25–34 34.9% / 35–44 14.9% / 45–54 10.4% / 55–64 7.1% / 65+ 5.2%
- 18–34 combined: 61.6%
- Country: India 18.4% / France 8.7% / Turkey 7.9% / Iran 5.7% / Italy 5.3%

Delta from 2026-09-28 17:49–17:50:
- Views: 1,609 → 1,678 (+69)
- Viewers: 1,408 → 1,468 (+60)
- Likes: 57 → 61 (+4)
- Comments: 1 → 2 (+1)
- Follows: 2 → 2
- Profile accesses: 10 → 10
- Bio-link clicks: 1 → 1
- Saves: 6 → 6
- Reposts: 1 → 1
- Skip rate: 53.8% → 53.9% (+0.1pt; essentially flat)
- Like rate: 4.0% → 4.1%
- Save rate: 0.4% → 0.4%
- 18–34: 61.6% → 61.6%
- India: 18.1% → 18.4%

### Interpretation
- CYMA continued to gain new viewers overnight (+69 views / +60 viewers), but the distribution pace remained much slower than Wittnauer or Pierce over their comparable overnight windows.
- Skip remained essentially unchanged and high at 53.9%, while average watch time stayed at 7s.
- The added overnight activity produced +4 likes and +1 comment, but no additional follows, profile accesses, bio-link clicks or saves.
- The current pattern is therefore a stable long tail with modest interaction growth, not a new downstream-conversion phase like the one observed for Pierce overnight.
- Audience composition remained effectively stable: 18–34 stayed at 61.6%, and India moved only 18.1% → 18.4%.
## 2026-09-29 07:03 JST — VA 7d Analytics snapshot after overnight Instagram updates

ユーザー提供Relay VA2 snapshotで確認。

Snapshot metadata:
- generated: 2026-09-29 07:03:50.695 JST (`20260928T220350695Z`)
- window / range: 7d / 7d
- bucket: 1d
- quality: UNSAMPLED
- sample: 1
- coverage: full
- integrity: PASS
- compare: previous-period

7d totals:
- Visits: 38
- Pageviews: 41
- Previous period: 20 visits / 30 pageviews
- Change vs previous period: Visits +18 (+90.0%) / Pageviews +11 (+36.7%)
- Internal Navigation: 0 visits / 3 pageviews

Channels:
- Direct / Unknown: 13
- Facebook: 9
- X: 5
- Instagram: 4
- Organic Search: 4
- Other Referral: 2
- YouTube: 0
- Other SNS: 0
- AI Assistant: 0

Key landing pages / visits:
- `/en/how-they-ring/`: 8 pageviews / 8 visits
- `/how-they-ring/`: 6 / 6
- `/en/pierce-duofon/`: 4 / 4
- `/cyma-time-o-vox/`: 4 / 4
- `/en/cyma-time-o-vox/chronometre/`: 3 / 3
- `/`: 3 / 3
- `/de/pierce-duofon/`: 2 / 2
- `/pierce-duofon/`: 2 / 2
- `/history/`: 2 pageviews / 1 visit

Key external entries:
- Instagram `l.instagram.com → /en/how-they-ring/`: 4 visits
- Facebook `www.facebook.com → /en/how-they-ring/`: 4
- Bing Search `www.bing.com → /en/pierce-duofon/`: 4
- Direct / Unknown `→ /how-they-ring/`: 3
- X `t.co → /how-they-ring/`: 3
- Direct / Unknown `→ /de/pierce-duofon/`: 2
- Direct / Unknown `→ /pierce-duofon/`: 2
- Facebook mobile `m.facebook.com → /en/cyma-time-o-vox/chronometre/`: 2
- Facebook `www.facebook.com → /`: 2
- Watchuseek `www.watchuseek.com → /cyma-time-o-vox/`: 2
- Facebook `www.facebook.com → /en/cyma-time-o-vox/chronometre/`: 1
- X `t.co → /basis-alarm/`: 1
- X `t.co → /wittnauer-10wa/`: 1

Observed internal flows:
- `/en/how-they-ring/ → /en/wittnauer-10wa/`: 1 internal pageview
- `/how-they-ring/ → /history/`: 1
- `/history/ → /history/smartwatch/`: 1

Host migration handoff:
- `orima1995-create.github.io/ → vintagealarm.github.io/cyma-time-o-vox/`: 1 visit / 1 pageview

Pageview geography:
- United States: 18
- Japan: 8
- India: 4
- France: 4
- Netherlands: 3
- Brazil / Hong Kong / Mexico / United Kingdom: 1 each

Devices by pageview:
- Desktop: 25
- Mobile: 16

### Interpretation
- The 7d period shows materially more entry activity than the immediately previous 7d period: Visits 20 → 38 (+90.0%) and Pageviews 30 → 41 (+36.7%). Visits are entry events, not unique people.
- The Instagram profile funnel is repeatedly visible on the VA side: all 4 Instagram-attributed entries land on the canonical English `/en/how-they-ring/` destination. This supports route-level reproducibility of the current Instagram → English HOW THEY RING entry design, but does not prove four distinct people or four specific profile-link clicks.
- HOW THEY RING is the largest combined landing family in this snapshot: English 8 visits + Japanese 6 visits = 14 of 38 visits. The source split is unusually clean: English HOW THEY RING is supplied by Instagram 4 + Facebook 4, while Japanese HOW THEY RING is supplied by X 3 + Direct / Unknown 3.
- Bing contributes a separate acquisition path independent of Instagram: all 4 Search visits land directly on `/en/pierce-duofon/`.
- Watchuseek contributes 2 entries to `/cyma-time-o-vox/`, providing a separate community-referral path for CYMA.
- The intended downstream funnel is present but still sparse at the internal-navigation layer: one observed `/en/how-they-ring/ → /en/wittnauer-10wa/` pageview. Do not infer that other HOW THEY RING visits failed to engage solely from the absence of a recorded internal flow.
- Facebook remains a separate source from Instagram; do not add its 9 visits to Instagram's 4 or reinterpret them as Instagram users.
- `latestBucket=2026-09-27T15:00:00Z` with `gapLower=25430` is a freshness diagnostic, not proof of zero collection delay; per metrics rules, latestBucket is the latest non-zero aggregate bucket rather than the last raw event timestamp.
## 2026-09-29 12:51–12:52 JST — Basis Alarm second Insights snapshot

ユーザー提供Instagram Insightsスクリーンショットで確認。

### Basis Alarm (BFG90)
- Views: 1,741
- Viewers: 1,152
- Average watch time: 22s
- Follows: 2
- Likes: 45
- Comments: 0
- Reposts: 1
- Saves: 4
- Share count: summary UI shows `--`; rate panel shows share rate 0.1%
- Skip rate: 26.9%（低）
- Share rate: 0.1%（低）
- Like rate: 3.6%（低）
- Save rate: 0.3%（低）
- Repost rate: 0.1%（高）
- Comment rate: 0.0%（低）
- Profile accesses: 2
- Bio-link clicks: 1
- Followers / non-followers: 1.1% / 98.9%

Audience:
- Age: 13–17 1.2% / 18–24 33.2% / 25–34 40.5% / 35–44 14.9% / 45–54 6.5% / 55–64 2.4% / 65+ 1.3%
- 18–34 combined: 73.7%
- Country: India 26.4% / United States 10.5% / Turkey 6.6% / Brazil 5.9% / Iran 5.1%

Delta from 2026-09-29 10:21–10:22:
- Views: 648 → 1,741 (+1,093)
- Viewers: 425 → 1,152 (+727)
- Average watch time: 23s → 22s
- Likes: 25 → 45 (+20)
- Follows: 1 → 2 (+1)
- Saves: 1 → 4 (+3)
- Reposts: 1 → 1
- Comments: 0 → 0
- Skip rate: 29.2% → 26.9% (-2.3pt; improved)
- Share rate: 0.0% → 0.1%
- Like rate: 5.4% → 3.6%
- Save rate: 0.2% → 0.3%
- Repost rate: 0.2% → 0.1%
- 18–34: 70.5% → 73.7%
- India: 7.1% → 26.4%
- United States: 10.4% → 10.5% (stable)

### Interpretation
- Basis entered a much broader second distribution phase: +1,093 views and +727 viewers in roughly 2.5 hours.
- Skip improved rather than deteriorated during that expansion (29.2% → 26.9%), while average watch time remained extremely high at 22s for the ~16s Reel. Treat this as consistent with substantial repeat/loop viewing, not as direct proof of individual replays.
- Like rate fell as distribution widened (5.4% → 3.6%), while saves rose 1 → 4 and follows 1 → 2. This indicates broader reach diluted like conversion but did not eliminate downstream action.
- Profile accesses 2 and bio-link click 1 are directly visible in this snapshot. The earlier 10:21 screenshot did not show these fields, so do not compute a delta from zero.
- India rose sharply from 7.1% to 26.4% and became the largest country segment, while the United States stayed effectively flat at ~10.5%. Record this as a distribution-composition shift, not as evidence that India caused the growth.
- 18–34 share increased from 70.5% to 73.7%.
- Basis continues to show the strongest observed skip performance among the current Instagram set at this stage. The current evidence remains consistent with the working hypothesis that an explicit human action plus visible mechanical response is a strong Reels hook, but the specific contribution of the phrase `fidget toy` is not isolated.
## 2026-09-29 15:44 JST — Basis Alarm third Insights snapshot

ユーザー提供Instagram Insightsスクリーンショットで確認。

### Basis Alarm (BFG90)
- Views: 2,534
- Viewers: 1,862
- Average watch time: 18s
- Follows: 2
- Likes: 58
- Comments: 0
- Reposts: 1
- Saves: 5
- Share count: summary UI shows `--`; rate panel shows share rate 0.1%
- Skip rate: 29.0%（低）
- Share rate: 0.1%（低）
- Like rate: 3.1%（低）
- Save rate: 0.3%（低）
- Repost rate: 0.1%（低）
- Comment rate: 0.0%（低）
- Profile accesses: 4
- Bio-link clicks: 1
- Followers / non-followers: 0.9% / 99.1%

Audience:
- Age: 13–17 0.9% / 18–24 31.8% / 25–34 40.0% / 35–44 15.2% / 45–54 7.4% / 55–64 3.1% / 65+ 1.7%
- 18–34 combined: 71.8%
- Country: India 31.0% / United States 8.7% / Turkey 5.7% / Iran 5.2% / Brazil 4.4%

Delta from 2026-09-29 12:51–12:52:
- Views: 1,741 → 2,534 (+793)
- Viewers: 1,152 → 1,862 (+710)
- Average watch time: 22s → 18s
- Likes: 45 → 58 (+13)
- Follows: 2 → 2
- Saves: 4 → 5 (+1)
- Reposts: 1 → 1
- Comments: 0 → 0
- Profile accesses: 2 → 4 (+2)
- Bio-link clicks: 1 → 1
- Skip rate: 26.9% → 29.0% (+2.1pt)
- Like rate: 3.6% → 3.1%
- Save rate: 0.3% → 0.3%
- Share rate: 0.1% → 0.1%
- 18–34: 73.7% → 71.8%
- India: 26.4% → 31.0%
- United States: 10.5% → 8.7%

### Like-timing update
- The graph continues to show a strong rise at the end of the Reel, with a smaller early peak and low-to-modest activity through most of the middle.
- Treat this as timing distribution only; it does not prove which visual or audio event caused each like.

### Interpretation
- Basis continued broad non-follower distribution through the afternoon: +793 views and +710 viewers since 12:51, with non-followers at 99.1%.
- Skip rose from the unusually low 26.9% to 29.0% but remains markedly lower than the current Wittnauer / Pierce / CYMA snapshots. The earlier improvement did not fully persist, yet the hook remains strong on the observed metric.
- Average watch time fell from 22s to 18s as distribution widened, but remains above the ~16s Reel runtime, still consistent with meaningful repeat/loop viewing at aggregate level.
- Downstream conversion has slowed: profile accesses rose 2 → 4 and saves 4 → 5, while follows and bio-link clicks were unchanged.
- India continued to increase as a share of the audience, 26.4% → 31.0%, while the United States fell 10.5% → 8.7%. Record this as changing distribution composition, not causal evidence.
- 18–34 remained dominant at 71.8%.
- The working hypothesis remains: Basis is particularly strong at stopping and retaining viewers through visible interaction/mechanical response, while downstream conversion is currently more modest than its viewing performance.
## 2026-09-29 17:57 JST — Wittnauer 10WA late-afternoon snapshot

ユーザー提供Instagram Insightsスクリーンショットで確認。

### Wittnauer 10WA
- Views: 3,106
- Viewers: 2,480
- Average watch time: 6s
- Follows: 13
- Likes: 128
- Comments: 1
- Reposts: 4
- Saves: 23
- Share count: summary UI shows `--`; rate panel shows share rate 1.1%
- Skip rate: 42.6%
- Share rate: 1.1%
- Like rate: 5.1%
- Save rate: 0.9%
- Repost rate: 0.2%
- Comment rate: 0.0%
- Profile accesses: 42
- Bio-link clicks: 2
- Followers / non-followers: 0.9% / 99.1%

Audience:
- Age: 13–17 0.6% / 18–24 23.1% / 25–34 41.1% / 35–44 17.1% / 45–54 9.5% / 55–64 5.6% / 65+ 3.1%
- 18–34 combined: 64.2%
- Country: India 24.2% / Turkey 8.1% / France 5.7% / United States 5.0% / Iran 4.4%

Delta from 2026-09-29 06:13:
- Views: 2,998 → 3,106 (+108)
- Viewers: 2,411 → 2,480 (+69)
- Average watch time: 6s → 6s
- Likes: 124 → 128 (+4)
- Follows: 13 → 13
- Saves: 23 → 23
- Reposts: 4 → 4
- Comments: 1 → 1
- Profile accesses: 37 → 42 (+5)
- Bio-link clicks: 2 → 2
- Skip rate: 42.1% → 42.6% (+0.5pt)
- Share rate: 1.2% → 1.1%
- Like rate: 5.1% → 5.1%
- Save rate: 0.9% → 0.9%
- Followers / non-followers: 0.7% / 99.3% → 0.9% / 99.1%
- 18–34: 64.8% → 64.2%
- India: 25.1% → 24.2%
- United States: 4.5% → 5.0%

### Interpretation
- Wittnauer is still receiving incremental distribution, but the growth rate has slowed markedly versus the earlier long-tail phase.
- The clearest new downstream movement is profile access: 37 → 42, despite only +108 views. Follows, bio-link clicks and saves were unchanged.
- Skip remains stable in the same low-40% band and like rate remains 5.1%, so there is no sign of a sharp quality collapse as the long tail matures.
- The audience mix is broadly stable. India remains the largest country segment but continues to ease gradually, while the United States increased slightly.
- Wittnauer remains the strongest current example of sustained downstream conversion over time, even as its raw distribution curve flattens.
## 2026-09-29 17:57–17:58 JST — CYMA Time-O-Vox 18K Chronomètre snapshot

Instagram Insights screenshots supplied by user.

- Views: 1,712
- Viewers: 1,503
- Average watch time: 7s
- Follows: 2
- Likes: 65
- Comments: 2
- Reposts: 1
- Saves: 6
- Share count: summary UI shows `--`
- Skip rate: 53.7%
- Share rate: 0.2%
- Like rate: 4.3%
- Save rate: 0.4%
- Repost rate: 0.1%
- Comment rate: 0.1%
- Profile accesses: 10
- Bio-link clicks: 1
- Followers / non-followers: 1.3% / 98.7%
- Age: 13–17 0.7% / 18–24 26.2% / 25–34 35.0% / 35–44 15.2% / 45–54 10.7% / 55–64 7.1% / 65+ 5.1%
- 18–34 combined: 61.2%
- Country: India 18.1% / France 8.7% / Turkey 7.8% / Iran 5.7% / Italy 5.2%
- Delta from 2026-09-29 06:13–06:14: views +34, viewers +35, likes +4; follows, saves, profile accesses and bio-link clicks unchanged; skip 53.9% → 53.7%.

## 2026-09-29 18:07–18:08 JST — Pierce Duofon snapshot

Instagram Insights screenshots supplied by user.

- Views: 2,557
- Viewers: 1,852
- Average watch time: 7s
- Follows: 5
- Likes: 71
- Comments: 2
- Reposts: 1
- Saves: 10
- Share count: summary UI shows `--`
- Skip rate: 43.9%
- Share rate: 0.3%
- Like rate: 3.8%
- Save rate: 0.5%
- Repost rate: 0.1%
- Comment rate: 0.1%
- Profile accesses: 17
- Bio-link clicks: 1
- Followers / non-followers: 0.9% / 99.1%
- Age: 13–17 1.4% / 18–24 31.4% / 25–34 37.9% / 35–44 11.7% / 45–54 8.8% / 55–64 4.9% / 65+ 4.0%
- 18–34 combined: 69.3%
- Country: India 25.6% / United States 9.8% / Iran 5.7% / Mexico 3.7% / Turkey 3.6%
- Delta from 2026-09-29 06:15: views +218, viewers +173, likes +10, follows +2, saves +2, profile accesses +2; comments and reposts unchanged; skip 43.6% → 43.9%; like rate 3.5% → 3.8%; save rate 0.5% → 0.5%.
## 2026-09-29 18:08 JST — Basis Alarm (BFG90) fourth Insights snapshot

ユーザー提供Instagram Insightsスクリーンショットで確認。

### Basis Alarm (BFG90)
- Views: 2,912
- Viewers: 2,144
- Average watch time: 17s
- Follows: 2
- Likes: 68
- Comments: 0
- Reposts: 1
- Saves: 5
- Share count: summary UI shows `--`
- Skip rate: 29.3%（低）
- Share rate: 0.0%（低）
- Like rate: 3.2%（低）
- Save rate: 0.2%（低）
- Repost rate: 0.0%（低）
- Comment rate: 0.0%（低）
- Profile accesses: 8
- Bio-link clicks: 1
- Followers / non-followers: 1.0% / 99.0%

Audience:
- Age: 13–17 0.8% / 18–24 31.0% / 25–34 40.1% / 35–44 15.6% / 45–54 7.4% / 55–64 3.2% / 65+ 1.9%
- 18–34 combined: 71.1%
- Country: India 31.9% / United States 7.8% / Turkey 5.6% / Iran 5.6% / Indonesia 4.0%

Delta from 2026-09-29 15:44:
- Views: 2,534 → 2,912 (+378)
- Viewers: 1,862 → 2,144 (+282)
- Average watch time: 18s → 17s
- Likes: 58 → 68 (+10)
- Follows: 2 → 2
- Saves: 5 → 5
- Reposts: 1 → 1
- Comments: 0 → 0
- Profile accesses: 4 → 8 (+4)
- Bio-link clicks: 1 → 1
- Skip rate: 29.0% → 29.3% (+0.3pt)
- Like rate: 3.1% → 3.2%
- Save rate: 0.3% → 0.2%
- Followers / non-followers: 0.9% / 99.1% → 1.0% / 99.0%
- 18–34: 71.8% → 71.1%
- India: 31.0% → 31.9%
- United States: 8.7% → 7.8%

### Like-timing update
- The like-timing curve still shows a strong rise at the end of the Reel, with a smaller early peak and relatively low activity through most of the middle.
- Treat this as timing distribution only; it does not identify the specific visual or audio event that caused each like.

### Interpretation
- Basis continues to receive broad non-follower distribution: +378 views and +282 viewers since 15:44, with non-followers still at 99.0%.
- Skip remains extremely stable around 29% despite the wider distribution. Average watch time eased from 18s to 17s but remains above the ~16s Reel runtime, still consistent with aggregate repeat/loop viewing.
- The clearest downstream movement in this interval is profile access, which doubled from 4 to 8, while follows, saves and bio-link clicks were unchanged.
- Like rate held essentially flat at 3.2%.
- India remained the largest country segment and increased slightly to 31.9%; the United States eased to 7.8%.
- Basis still stands out primarily for retention/rewatch performance rather than for follow/save conversion.
## 2026-09-30 06:26 JST — Basis Alarm (BFG90) overnight breakout snapshot

ユーザー提供Instagram Insightsスクリーンショットで確認。

### Basis Alarm (BFG90)
- Views: 7,631
- Viewers: 5,647
- Average watch time: 13s
- Follows: 6
- Likes: 159
- Comments: 2
- Reposts: 4
- Saves: 24
- Share count: summary UI shows `--`
- Skip rate: 29.2%（低）
- Share rate: 0.2%（低）
- Like rate: 2.9%（低）
- Save rate: 0.4%（低）
- Repost rate: 0.1%（高）
- Comment rate: 0.0%（低）
- Profile accesses: 34
- Bio-link clicks: 1
- Followers / non-followers: 0.5% / 99.5%

Audience:
- Age: 13–17 0.4% / 18–24 26.9% / 25–34 39.1% / 35–44 16.7% / 45–54 9.5% / 55–64 4.8% / 65+ 2.5%
- 18–34 combined: 66.0%
- Country: India 27.3% / Turkey 6.7% / Iran 6.0% / France 5.1% / United States 4.3%

Delta from 2026-09-29 18:08:
- Views: 2,912 → 7,631 (+4,719)
- Viewers: 2,144 → 5,647 (+3,503)
- Average watch time: 17s → 13s
- Likes: 68 → 159 (+91)
- Follows: 2 → 6 (+4)
- Saves: 5 → 24 (+19)
- Reposts: 1 → 4 (+3)
- Comments: 0 → 2 (+2)
- Profile accesses: 8 → 34 (+26)
- Bio-link clicks: 1 → 1
- Skip rate: 29.3% → 29.2% (-0.1pt)
- Like rate: 3.2% → 2.9%
- Save rate: 0.2% → 0.4%
- Followers / non-followers: 1.0% / 99.0% → 0.5% / 99.5%
- 18–34: 71.1% → 66.0%
- India: 31.9% → 27.3%
- United States: 7.8% → 4.3%

### Interpretation
- Basis entered a major overnight distribution expansion: +4,719 views and +3,503 viewers after 18:08.
- The most important stability signal is skip rate: 29.3% → 29.2% despite more than doubling total reach. The hook/retention advantage therefore persisted through a much broader audience.
- Average watch time fell from 17s to 13s as distribution widened, so the earlier above-runtime aggregate average did not persist. Retention is still strong relative to the observed skip rate, but do not describe the current snapshot as average rewatch above runtime.
- Downstream actions accelerated materially overnight: profile accesses +26, follows +4, saves +19, reposts +3, comments +2.
- Like rate diluted to 2.9% while absolute likes rose +91, consistent with broad audience expansion.
- Non-followers reached 99.5%, confirming that the breakout is overwhelmingly discovery-driven rather than follower-driven.
- India remains the largest country segment at 27.3% but eased from the prior 31.9%, showing continued audience diversification rather than concentration.
- Basis has now surpassed Wittnauer in raw views by a wide margin, while Wittnauer still remains stronger on follow/profile conversion efficiency in its latest snapshot.
## 2026-09-30 06:55 JST — VA 24h Analytics snapshot after Westclox first post

ユーザー提供Relay VA2 snapshotで確認。

Snapshot metadata:
- generated: 2026-09-30 06:55:17.904 JST (`20260929T215517904Z`)
- window / range: 24h / 24h
- bucket: 1h
- quality: UNSAMPLED
- sample: 1
- coverage: full
- integrity: PASS
- compare: previous-period
- latestBucket: 2026-09-29T13:00:00Z
- gapLower: 28517

24h totals:
- Visits: 8
- Pageviews: 12
- Previous period: 4 visits / 5 pageviews
- Change vs previous period: Visits +4 (+100.0%) / Pageviews +7 (+140.0%)
- Internal Navigation: 0 visits / 4 pageviews

Channels:
- X: 3
- Instagram: 3
- Organic Search: 1
- Direct / Unknown: 1
- Facebook: 0
- YouTube: 0
- Other SNS: 0
- AI Assistant: 0
- Other Referral: 0

Key pages / visits:
- `/x/`: 3 pageviews / 3 visits
- `/en/how-they-ring/`: 3 / 3
- `/de/westclox-watchlarm/`: 1 / 1
- `/`: 1 / 1
- `/history/`: 2 pageviews / 0 visits
- `/owners-notes/`: 1 / 0
- `/wittnauer-10wa/`: 1 / 0

External entries:
- Instagram `l.instagram.com → /en/how-they-ring/`: 3 visits
- X `t.co → /x/`: 3 visits
- Direct / Unknown `→ /de/westclox-watchlarm/`: 1 visit
- Bing Search `www.bing.com → /`: 1 visit

Observed internal flows:
- `/owners-notes/ → /wittnauer-10wa/`: 1 internal pageview
- `/ → /history/`: 1
- `/x/ → /history/`: 1
- `/x/ → /owners-notes/`: 1

SNS landing summary:
- `/en/how-they-ring/`: Instagram 3
- `/x/`: X 3

Pageview geography:
- Japan: 9
- United States: 1
- India: 1
- Spain: 1

Devices by pageview:
- Mobile: 8
- Desktop: 3
- Tablet: 1

Arrival Probe:
- available: 1
- total: 15
- X: 3
- sampleInterval: 1
- complete: 1
- key rows include `/en/how-they-ring/@instagram:3` and `/x/@x:3`

### Interpretation
- The current 24h window doubled entry events versus the immediately previous 24h: 4 → 8 visits, while pageviews rose 5 → 12. Visits are entry events, not unique people.
- X and Instagram account for 6 of the 8 recorded entry visits. Their landing behavior is cleanly separated: all 3 Instagram-attributed visits land on the canonical English `/en/how-they-ring/`, while all 3 X-attributed visits land on `/x/`.
- The X landing route shows observed downstream movement: one internal pageview from `/x/` to `/history/` and one from `/x/` to `/owners-notes/`. These are aggregate flow rows and should not be treated as a single reconstructed user journey.
- Instagram again shows repeat route-level delivery to the intended English HOW THEY RING landing page. The Relay alone does not prove three distinct people or match these visits one-to-one with Instagram Insights bio-link clicks.
- A Direct / Unknown entry to the German Westclox page is observed after the Westclox first post, but its source is not attributable to Instagram from this snapshot.
- Four internal pageviews are observed despite Internal Navigation visits being zero, which is expected under the current metric definition: internal transitions add pageviews without creating new visits.
- Japan dominates pageviews in this 24h window (9 of 12). This geography is pageview composition, not a unique-visitor count.
- `latestBucket` / `gapLower` are freshness diagnostics for aggregated buckets, not proof of raw-event collection delay.

## 2026-10-02 06:29–06:30 JST — Citizen Alarm approximately-24h Insights snapshot

ユーザー提供Instagram Insightsスクリーンショット6枚で確認。数値時系列の正本は `instagram-insights-timeseries.md` へ同時刻snapshotとして保存。

### Citizen Alarm
- Views: 1,423
- Viewers: 1,242
- Average watch time: 6s / 18s Reel
- Follows: 3
- Likes: 50
- Comments: 2
- Reposts: 0
- Saves: 4
- Share count: summary UI `--`
- Skip rate: 45.3%（Instagram表示: 低）
- Share rate: 0.1%（低）
- Like rate: 4.0%（通常）
- Save rate: 0.3%（低）
- Repost rate: 0.0%（低）
- Comment rate: 0.2%（高）
- Profile accesses: 4
- Bio-link clicks: 未表示
- Followers / non-followers: 4.6% / 95.4%

Audience:
- Age: 13–17 4.2% / 18–24 31.7% / 25–34 40.0% / 35–44 13.7% / 45–54 5.9% / 55–64 3.1% / 65+ 1.4%
- 18–34 combined: 71.7%
- Country: India 22.5% / Turkey 11.6% / Iran 7.9% / United States 6.6% / Mexico 2.7%

Delta from 2026-10-01 08:28–08:29:
- Views: 530 → 1,423 (+893)
- Viewers: 429 → 1,242 (+813)
- Likes: 15 → 50 (+35)
- Saves: 1 → 4 (+3)
- Follows: 2 → 3 (+1)
- Profile accesses: 1 → 4 (+3)
- Comments: 2 → 2
- Reposts: 0 → 0
- Average watch time: 6s → 6s
- Skip rate: 43.9% → 45.3% (+1.4pt)
- Like rate: 3.2% → 4.0% (+0.8pt)
- Save rate: 0.2% → 0.3% (+0.1pt)
- Share rate: 0.0% → 0.1%
- Non-followers: 98.9% → 95.4%
- 18–34: 76.6% → 71.7%
- India: 8.7% → 22.5%
- Turkey: 17.5% → 11.6%
- Iran: 11.9% → 7.9%
- United States: 5.1% → 6.6%

### Interpretation
- 2h snapshot以降も+893 views / +813 viewersまで広がったが、Instagramの閲覧数推移グラフでは約1,400付近で伸びが鈍化し、通常Reel比較線を下回っている。現時点ではBasisのような後発breakoutは観測されていない。
- Skipは43.9%→45.3%へ小幅悪化したものの、Instagram自身の判定は引き続き「低」。したがって開幕で即座に大崩れしたReelとは読まない。一方、平均再生時間は6sのままで、18s尺に対して約1/3という記述的比率に留まる。
- Like rateは3.2%→4.0%へ改善して「通常」。しかしshare/save/repostはInstagram判定で低く、拡散・保存行動は弱い。コメント率だけは「高」だが絶対数は2のままなので、コメント2件を成長要因と因果化しない。
- Profile accessesは1→4、followsは2→3。累積view基準ではprofile access約0.28%、follow約0.21%、save約0.28%。これは同一人物ファネルではなく記述的な累積比率としてのみ扱う。
- Non-followersは95.4%で依然として発見面中心だが、初期98.9%からは下がった。新規非フォロワー配布が止まったと断定せず、分布拡大の鈍化とフォロワー比率上昇が同時に観測された、と記録する。
- 18–34は71.7%で引き続き主体。Indiaは8.7%→22.5%へ上昇し、Turkey / Iranは低下。Pierce・Basisでも拡張時にIndia比率が上がった先行観測があるため、Citizen固有の嗜好と断定せず、Instagram側の配布構成変化の反復候補として扱う。
- 現段階の評価は「低skipで一定の初見停止は取れたが、平均再生・share/save/repost・profile actionがBasis級の再配布を呼ぶ形には至っていない」。6個体一巡比較のため、施策変更より同時間窓の比較を優先する。

## 2026-10-03 10:18 JST — Wittnauer 10WA static carousel follow-up early snapshot

ユーザー提供Instagram投稿画面・Post Insightsスクリーンショットで確認。公開時刻はユーザー報告で07:30頃。

### Observed
- Format: 2-image static carousel（1枚目ポケショ / 2枚目Cal.10WAムーブメント）
- Theme: `Longines — or AS 1200?` / base movement unresolved
- Views: 10
- Viewers: 6
- Likes: 1
- Comments: 0
- Reposts: 0
- Share count: UI `--`
- Saves: 0
- Follows: 0
- Profile accesses: UI `--`
- Followers / non-followers: 100.0% / 0.0%
- Carousel image likes: first image 1 / second image 0
- Top source label visible: Feed（shareは画面外のため数値化しない）
- Observed at: 2026-10-03 10:18 JST
- Elapsed: approximately 2h48m from the user-reported ~07:30 publish time

数値時系列の正本は `instagram-insights-timeseries.md` の `content_id=wittnauer-10wa-static-2026-10-03` snapshot。

### Interpretation
- この時点では6 viewersすべてがfollowersで、non-followersは0%。初回6 Reelsで観測された「大半がnon-followers」という配布状態とは明確に異なる。
- ただし1件の静止画カルーセル、約2時間48分、6 viewersという極小標本なので、「Instagramでは動画でなければ伸びない」という一般則までは確定しない。
- 現時点の運用判断としては、**discovery / reachを狙う主力をReelsから静止画へ置き換える根拠はない**。このカルーセルは研究・細部ネタの補助フォーマットとして追跡し、24h以降にnon-follower配布が発生するかを再確認する。
- 比較ではcontent format、distribution surface、投稿時刻、題材が同時に変わっているため、原因を「静止画だけ」に単独帰属しない。

## 2026-10-03 20:24 JST — Wittnauer 10WA static carousel follow-up ~13h snapshot

ユーザー提供Instagram Post Insightsスクリーンショット4枚で確認。公開時刻はユーザー報告で07:30頃。

### Observed
- Format: 2-image static carousel（1枚目ポケショ / 2枚目Cal.10WAムーブメント）
- Views: 22
- Viewers: 12
- Likes: 3
- Comments: 0
- Reposts: 0
- Share count: UI `--`
- Saves: 0
- Follows: 0
- Profile accesses: UI `--`
- Followers / non-followers: 100.0% / 0.0%
- Non-follower trend: 0のまま
- Carousel image-like attribution UI: first image 4 / second image 0（total likes 3と不一致。別UI指標として保持）
- Observed at: 2026-10-03 20:24 JST
- Elapsed: approximately 12h54m from the user-reported ~07:30 publish time

Delta from 2026-10-03 10:18:
- Views: 10 → 22 (+12)
- Viewers: 6 → 12 (+6)
- Likes: 1 → 3 (+2)
- Non-followers: 0.0% → 0.0%
- Follows: 0 → 0
- Saves: 0 → 0

数値時系列の正本は `instagram-insights-timeseries.md` の `content_id=wittnauer-10wa-static-2026-10-03`。

### Interpretation
- 約13時間時点でもnon-followersは0%。この投稿では、少なくとも観測時点までInstagram内の非フォロワー発見面への配布が確認できていない。
- 10:18→20:24の約10時間6分で +12 views / +6 viewers。配布規模は小さいままだが、既存フォロワー内ではlikesが1→3へ増えている。
- 現時点の主な差は「見た人が全く反応しない」より「非フォロワーへ配布されていない」にある。12 viewersという極小標本のため、題材そのものの魅力度をこの投稿だけで否定しない。
- 静止画カルーセル一般が必ず非フォロワーへ出ないとは断定しない。VAアカウントのこの1投稿で、Reels初回群と異なる配布状態が継続している観測として扱う。

## 2026-10-03 20:25 JST — VA資産をmicro-Reelへ細分化する運用をACTIVE化

### Decision
- **Decision**: `content-inventory.md` の独立資産を、原則 `1 Reel = 1要素` の短編へ分解して使う。画面文字は最小限、1本で1操作・1機構・1ディテールのみ。数を作る場合も、同じOWNER'S NOTEや同じ既出主題を言い換えて増殖させず、inventoryの別assetを使う。
- **Origin**: USER。2026-10-03のWittnauer静止画カルーセル観測後、「動画用に細かく分解して文字も少ない短編動画で数も稼ぎながら分解してやっていく」と明示。
- **Evidence**: Wittnauer静止画カルーセルは約12h54m時点で22 views / 12 viewers / non-followers 0%。一方、初回Reels群では非フォロワー配布を確認済み。ただしformat以外も異なるため、micro-Reelは原因確定ではなく次の比較手段として扱う。
- **Packaging rule**: 可能なら3–8秒程度の視覚的な1動作・1変化で成立させる。必要なら短いmacro pan / before→after / crown・slider・pusher操作を使う。長い字幕、WATCH本文の圧縮転載、OWNER'S NOTE分割はしない。
- **Inventory rule**: `CANDIDATE_NOT_IN_IG_TEXT` を優先。`PARTIAL` は別検証理由がある場合のみ。`USED` を新ネタとして再発明しない。投稿前にWATCH / research正本へ戻り、事実と操作を再確認する。
- **Revisit / falsifier**: micro-Reelを複数本実施しても非フォロワー配布が静止画と同程度に留まる、または保持・保存・共有が継続的に悪化する場合はformat仮説を再検討する。
- **Status**: ACTIVE。

## 2026-10-03 21:33 JST — micro-Reelをasset-first予約制へ

### Decision
- **Decision**: micro-Reel案は「候補を思いつく→即storyboard」の順にせず、6個体のContent Inventoryでassetを棚卸しし、既出 / PARTIAL / overlap / Other social / media状態を照合してから動画へ当て込む。final案はContent Assignment Registryへ `PLANNED` を作り、ASSET ID → CONTENT ID → MEDIA KEYで予約する。
- **Origin**: USER。micro-Reel方針提示後に「各資産の棚卸とそれの動画への当て込み」「重複はどう管理するの？」と順序・重複管理の欠落を指摘。
- **Evidence**: 既存inventoryはasset IDとIG stateの重複防止は持っていたが、どの動画へ割り当てたか、同じmediaを別案へ使っていないか、activeな企画予約を逆引きする構造がなかった。
- **Implementation**: asset rowsへ `Overlap / collision`、`Micro fit`、`Micro treatment` を追加。WATCH正本再監査で独立assetを追加し、Content Assignment Registryへ既存Instagram 7件・Basis YouTube・CYMA X timing wheel・Westclox YouTube過去予約を接続。active contentでは同一asset / media keyの二重予約をCIで失敗させる。
- **Guardrail**: `Micro treatment` は候補であって採用ではない。採用前に `PLANNED`、撮影 `SHOT`、編集 `EDITED`、予約投稿 `SCHEDULED`、公開確認 `PUBLISHED` と同一content IDを進める。中止は `DROPPED`。OWNER'S NOTE `WHOLE_ONLY` は維持。
- **Status**: ACTIVE。
