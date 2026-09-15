# VINTAGE ALARM — Retrieval / Concept Discovery

更新日: 2026-09-15

## 目的

この記録は、モデル名・ブランド名を知らない人の質問から、機械式アラーム腕時計というカテゴリや具体的な時計へ到達できるかを観測するためのもの。

単純な `Pierce Duofonについて教えて` → Duofonページ取得とは分ける。

見るのは、

`現代語の質問 → 機械式アラーム腕時計というカテゴリ → 質問に含まれない具体例 → VINTAGE ALARMの発見・参照`

という経路。

この実験の目的は、Duofonを必ず回答に出させることではない。質問に対して自然な時計が広がり、その探索にVINTAGE ALARMが参加できるかを見る。

## 2026-09-15 現在の診断

### 確認済み

- 現行TOPには `通知が、まだ歯車だった頃。` / `スマホも電池も使わず、決めた時刻を腕の上で知らせる。` が本文として存在する。
- HISTORYも `設定した時刻が来たことを知らせる`、リマインダー、駐車時間、周囲への知らせ方など、時計名を知らない人とアラーム腕時計を結ぶ意味の橋を既に持つ。
- Pierce Duofonページも `マナーモードの祖先!?`、`1950's通知のオーパーツ。`、`リマインド` という現代的な入口を既に持つ。
- URLを与えずに行った会話では、CASIO / Timexなどのデジタル系から始まり、追加質問でCricket / Memovox / Bell-Matic、さらにParking / Nautical等へ進んだが、VINTAGE ALARMやDuofon等の掲載個体は自発的に発見されなかった。
- 同じ会話でVINTAGE ALARMのURLを提示すると、AIはサイトを今回のテーマに高く適合すると判断し、Duofon / Basis / Westclox / Cyma等の特徴をすぐ抽出した。

### 現時点の判定

- `Recognition / Relevance`: 高い可能性がある。
- `Retrievability`: コールドスタートでは低く観測された。
- ただし原因をコンテンツ不足へ帰属しない。

理由は、2026-09-10のURL移行から5日程度しか経っておらず、検索結果・外部AI観測で旧ホストが残る例が確認されているため。

したがって、この時点のConcept Discovery失敗は **`migration-confounded`** として保存する。

`失敗は観測された。ただし migration-confounded のため、semantic relevance不足を原因と判定できない。`

## URL移行を交絡因子として扱う理由

現行の移行設計は、GitHub PagesでHTTP 301 / 308を返せない制約のため、旧routeごとに以下を出力する。

- `noindex,follow`
- 新routeへのcanonical
- 0秒meta refresh
- `location.replace()` によるroute-preserving redirect
- query string / fragmentの保持

旧repoの `scripts/build-legacy-redirect.mjs` が実際のPages向け `legacy-dist` を生成し、`scripts/check-live-legacy-redirects.mjs` が公開後の主要route、canonical、meta refresh、robots、sitemapを検査する。

重要:

- 旧repo内に残るAstro本文や `public/sitemap.xml` を、そのまま現在のPages配信物だと判断しない。
- 実配信状態はdeploy成果物 / live表示で確認する。
- この記録作成時点では、直近workflow成功そのものをここでは独立確認していない。

## 検証レイヤー

Google Searchの移行完了と、外部AIのRetrieval移行完了を同一視しない。

状態を次の4段階に分ける。

1. **WEB MIGRATION HEALTHY**
   - 旧route → 新routeの移行が正常
   - canonical / robots / sitemap / crawlが新hostへ揃う
2. **SEARCH INDEX REPRESENTATIVE**
   - 主要URLが新 `vintagealarm.github.io` で検索可能になる
   - 旧URLが代表URL・主要候補から外れる方向へ進む
3. **CONCEPT DISCOVERY RETEST**
   - 固定シナリオでコールドスタート再試験
4. **AI RETRIEVAL DIAGNOSIS**
   - Google / Bing等の検索インデックス移行後も残る、AIサービス固有の検索・追加探索・競合問題を評価

Search Consoleは1〜2を見るP0計器として使うが、外部AI発見性の最終KPIにはしない。

## 固定テストシナリオ

移行前後比較を可能にするため、基本質問を固定する。

Q1:
`スマートウォッチが出る前って、腕時計で予定を通知する方法あったの？`

Q2:
`デジタルだけなんだね`

Q3:
`アナログだとどんなの？`

Q4:
`面白いやつは？ 個性的なやつとか`

Q5:
`ほかに評価する時計は？`

モデル名・ブランド名・VINTAGE ALARM名・URLは事前提示しない。

## 各段階の記録項目

各Qについて最低限、以下を記録する。

1. 機械式アラーム腕時計というカテゴリへ到達したか
2. 質問に含まれない時計を自発的に紹介したか
3. 有名モデルだけで探索が閉じたか、よりニッチな個体まで広がったか
4. VINTAGE ALARMがsource候補 / 引用 / 回答材料になったか
5. VINTAGE ALARMが出た場合、現行hostか旧hostか
6. 回答内で事実 / OWNER OBSERVATION / 編集的比喩 / 仮説の意味境界が保たれたか
7. 同条件の別セッション / 別AIでも再現したか

## Discovery Depth

Duofon固有の出現率を成功KPIにしない。

例として探索深度を次のように見る。

- Level 0: デジタル電子時計だけ
- Level 1: 機械式アラーム腕時計というカテゴリへ到達
- Level 2: Cricket / Memovox / Bell-Matic等の代表例
- Level 3: Parking / Nautical / Polaris等、用途・機構の特殊例
- Level 4: Duofon / Basis / Westclox / Cyma等、一般回答で埋もれやすい個体
- Level 5: VINTAGE ALARMが自然発見され、回答・追加探索へ参加

これは品質順位ではなく、探索の深さを記録するための便宜的な指標。

## 移行期間中の凍結ルール

移行の効果とコンテンツ変更の効果を混ぜないため、Concept Discoveryの原因判定目的では以下を原則凍結する。

- TOP本文
- HISTORY本文
- WATCH本文 / OWNER'S NOTE
- Concept Discoveryを狙ったmeta description変更
- Concept SEO用の新規記事・FAQ・専用ランディングページ

例外:

- 明確な事実誤認の修正
- 壊れたroute / canonical / sitemap / robots等の運用修正
- セキュリティ・アクセシビリティ上必要な修正

## 再試験の開始条件

日数だけで決めない。

最低限、主要URLのうち `/`、`/history/`、`/pierce-duofon/` について、

- 新host側が検索インデックスで認識される
- 旧対応URLが代表URL・主要候補から外れる方向へ進む

ことを確認してから固定シナリオを再実行する。

Google側の代表化が進んでも、他検索系・AI検索は別レイヤーとして継続観測する。

## 次段階の仮説

移行が定着した後もConcept Discoveryが弱い場合、次に疑う。

1. **Retrieval competition**
   - JLC / Vulcain / Seiko / 大手時計媒体等だけでAIが十分な回答を完成でき、追加探索が起きない
2. **Query-page fit**
   - `昔の通知` / `機械式リマインダー` 等の概念クエリと、検索候補としてのページの結び付き
3. **外部シグナル**
   - 外部ページ・SNS・動画・引用等から現行URLが検索グラフへどの程度接続されているか
4. **言語差**
   - AIが英語探索を優先し、日本語ページが候補集合へ入りにくいケース

meta descriptionはこれらより先に原因扱いしない。

## Minority Report

移行が完全に定着しても、一般質問でVINTAGE ALARMやDuofonが毎回出るとは限らない。

`スマートウォッチ以前の予定通知` にCASIO Data BankやTimex Data Linkを出すこと自体は自然であり、機械式でもCricket / Memovoxが代表例として先に選ばれることは合理的。

したがって最終目標は、特定モデルを無理に回答へ入れることではない。

**時計名を知らない人の質問から、機械式アラーム腕時計という未知カテゴリや適切な具体例へ探索が広がり、その過程でVINTAGE ALARMが発見・参照され得る状態を作る。**

## 現在の運用判断

**待ち。**

ただし放置ではない。

- 本文は触らない
- URL移行・新hostの代表化を観測する
- 現状のcold-start失敗はpre-testとして保存する
- 移行定着後、同じ固定シナリオを再実行する
- その後に初めてAI Retrieval固有の問題を切り分ける
