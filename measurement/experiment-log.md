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

## 2026-09-14｜Westclox Watchlarm YouTube Shorts｜21:00 JST スケジュール投稿

ユーザー報告により、Westclox WatchlarmのYouTube Shortsを2026-09-14 21:00 JST公開としてスケジュール投稿済み。

投稿動画:
- 完成動画の実尺: 23.9秒
- 冒頭のみトリムし、中間は原則ノーカット・速度変更なし
- プッシャー操作ごとに小さく薄い `+12 min` 表示
- 納品動画にはBGMを焼き込まず、YouTube側でBGMを後付け
- 実機の鳴動音は元素材の音声として残す

投稿文の軸:
- `17 jewels? Nope. Zero.` / 「17石？ いいえ、0石です。」
- 0石の機械式アラーム腕時計
- アラーム時刻はプッシャー1回で約12分進む操作

状態:
- スケジュール設定済み
- 21:00 JST時点で公開予定
- 公開完了・初動再生・サイト流入・成果は未観測

注意:
- この時点ではYouTube側の公開URL、公開後の再生数、流入成果を確認していない。
- 公開成功と、Shorts配布・サイト来訪・検索露出の成果は別状態として記録する。

## 2026-09-19｜Google / Bing｜モデル名・関連語の検索露出（Private / InPrivate）

ユーザー提供スクリーンショットで、ブラウザのPrivate / InPrivateモードかつ検索サービス未ログイン状態で以下を観測した。

### 条件

- Google: InPrivate表示、Google未ログイン
- Bing: InPrivate表示
- これは通常ブラウザ履歴・Cookieによる個人化を弱める条件だが、完全な無個人化・地域差排除を保証するものではない。
- 検索順位は時点・地域・検索エンジン・表示モジュールで変動するため、固定順位ではなく観測時点のスナップショットとして扱う。

### Google｜Cyma Time-O-Vox

検索語: `Cyma timeovox`

確認済み:
- 通常検索の1ページ目スクリーンショット内に、現行host `vintagealarm.github.io` の `Cyma Time-O-Vox 18K Chronomètre | Cal.R.464・1香箱` が表示された。
- 同じ通常検索画面の画像枠にもVINTAGE ALARM由来画像が表示された。
- Google画像検索では、VINTAGE ALARM由来のCyma画像が上段に複数確認できた。

判定:
- 少なくともこの観測では、現行hostのCymaページが通常検索・画像検索の双方で取得候補になっている。
- この1回から恒常順位や検索エンジン内評価を断定しない。

### Google｜Pierce Duofon

検索語: `duofon`

確認済み:
- 通常検索の1ページ目スクリーンショット内に、現行hostの `Pierce Duofon | Cal.135・2段階アラーム・実機音` が表示された。
- X上のPierce Duofon投稿も同じ検索画面内に表示された。
- Google画像検索では、VINTAGE ALARM由来画像が最上段に確認でき、X由来の実機画像も上段に複数表示された。
- `duofon` には通信サービス等の別義検索結果も混在している。

判定:
- 別義を含む広い一語検索でも、時計クラスタ内でVINTAGE ALARMの現行ページと実機画像が取得される観測が得られた。
- 画像表示順を恒常的な画像検索順位とは扱わない。

### Google｜Westclox

検索語: `westclox alarm watch`

確認済み:
- Google画像検索は、Westcloxの置時計・目覚まし時計・電子時計・腕時計・販売画像等が大量に混在する広い集合になっていた。
- その中で、VINTAGE ALARM / X由来のWestclox Watchlarm実機画像が上位表示領域に入り始めていることをスクリーンショットで確認した。
- ユーザー観測では、X由来の実機画像が画像検索の早い位置に出始めた。

判定:
- Westcloxはブランド全体の画像母集団が大きく、`alarm watch` を付けてもGoogle画像検索がWatchlarm W5だけに狭く分離されていない。
- したがって現時点では、Googleでの露出難易度を「ページ品質不足」と即断せず、巨大ブランド集合との競合を別仮説として扱う。

### Bing｜Westclox

検索語: `westclox alarm watch`

確認済み:
- Bing通常検索のスクリーンショットでは、上からEtsy、Antique Watchmanに続き、現行 `vintagealarm.github.io/westclox-watchlarm/` が概ね3番目の通常検索結果として表示された。
- 表示タイトルは `WESTCLOX WATCHLARM | VINTAGE ALARM`。
- スニペットはWestclox / Big Ben / Baby Benに触れる現行ページ本文を使用していた。
- 同画面の画像モジュールにもWestclox関連画像が表示された。

判定:
- 少なくともBingのこの観測では、現行Westcloxページは `westclox alarm watch` に対する高い関連候補として取得されている。
- Googleでの相対的な苦戦を、そのままページ自体のretrievability不良へ一般化できない。
- GoogleとBingで検索集合の切り方・順位付けが異なる可能性を、今後の比較対象とする。

### Citizen

この一連の観測では、ユーザー報告上、CitizenだけVINTAGE ALARMの明確な浮上を確認できなかった。

- このログではCitizenの固定順位・未インデックスを断定しない。
- 次回は検索語を固定し、例: `Citizen Alarm 980` / `Citizen Alarm watch 980` で通常検索・画像検索を同条件比較する。

### 横断整理

今回確認できた範囲では:

- Cyma: Google通常検索 + 画像検索で現行hostを確認
- Duofon: Google通常検索 + 画像検索で現行host / 実機画像を確認
- Westclox: Google画像検索で実機画像が参入、Bing通常検索では概ね3番目に現行hostを確認
- Citizen: 今回は明確な浮上を確認できず

この結果から、全WATCHを同じ検索難易度・同じ順位目標で評価しない。
固有名詞の狭さ、ブランド規模、語義競合、画像母集団、検索エンジン差を分けて追う。
