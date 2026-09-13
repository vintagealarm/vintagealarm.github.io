# VINTAGE ALARM — 編集・実装ルール

作業前に `AGENTS.md`、`strategy/seo-aio.md`、`measurement/metrics.md` も確認する。

## 原則

- 資料で確認した事実を書く。必要な関係だけ示し、そこで止める。
- 未確認事項は断定しない。資料間の差は差のまま扱う。
- OWNER'S NOTE原文は、明示指示なしに改変しない。
- キャッチコピー、感想、意味づけ、読者への煽りをAIが追加しない。
- 「面白いのは」「つまり」「単なる〜ではない」「現代につながる」等の編集的解釈を追加しない。
- OWNER'S NOTEのキャッチをDEEP DIVEで回収・説明しない。
- 通常の確定事実では著者名・文献名を本文で連呼しない。文献差そのものが論点の場合のみ本文で区別する。

## サイト階層

- `HISTORY`：時代と技術上の問題を追う全体史。
- `OWNER'S NOTES / WATCH`：実機・個体から読む。
- `DEEP DIVE`：個別時計の機構、変遷、文献差、供給関係などを掘る。
- HISTORY本文で個別時計のDEEP DIVEまで説明しない。必要ならWATCHページへ送る。
- `RESEARCH`は`src/data/research-settings.json`の`published`でTOP・セクションメニュー・HISTORY上の表示を同時に制御する。中身がない間は非公開にする。
- `RESEARCH`が非公開のときはCSSで隠すのではなく、生成HTML自体へ出力しない。

## HISTORY

- 主題は「アラームを、腕へ。」。
- 年表を並べるだけではなく、腕時計へ載せる際に発生した小型化・動力・設定・音響・ケース・装着時の可聴性などの問題を軸にする。
- 1950年代を中心章として扱い、Vulcain Cricket / Jaeger-LeCoultre Memovox / Pierce Duofon / Cyma Time-O-Vox / Citizen Alarmなど、異なる構造上の回答を並べる。
- HISTORYの年代は、モデル・機構の歴史上の初出や節目を基準にする。所有個体の製造年代から決めない。
- HISTORYの年代データをOWNER'S NOTES一覧やWATCHの`spec.era`から自動生成しない。
- HISTORYからWATCHへリンクし、WATCHから該当時代のHISTORYへ戻れるようにする。
- HISTORY内のOWNER'S NOTESレールは、`owners-directory.json`に存在し、かつWATCHが公開済みの所有個体だけを表示する。未公開の予告カードをOWNER'S NOTESとして混在させない。
- `history-content.json`にはOWNERカードを重複保持しない。HISTORY内の所有個体表示も`owners-directory.json`を単一ソースとする。
- 最終章の見出しは「現状の到達点」。入口では皮肉やオチを説明しない。
- SMARTWATCHページはHISTORYから辿るエピローグとして扱い、検索流入を目的としない。`noindex,follow`とし、`sitemap.xml`から外す。
- SMARTWATCHページ内部でのみ通知過多のビジュアルを見せる。
- SMARTWATCHを機械式アラーム腕時計の直接的な系譜として断定しない。
- SMARTWATCH画像の前に「通知地獄」「皮肉」などのネタバレ見出しを追加しない。

## OWNER'S NOTES一覧

- `OWNER'S NOTES`は、完成したOWNER'S NOTEを所有個体の年代順に並べる一覧ページ。
- 一覧のデータソースは`src/data/owners-directory.json`とする。
- `ownedGroup`は一覧の大見出し用年代。短い年代ラベルだけを使い、個体の推定年代レンジをそのまま見出しにしない。
- `ownedEra`はカード内に表示できる所有個体の年代ラベル。個体年を確定できない場合は`c.1959–early 1960s`のように幅を持たせ、推定年を確定値として見せない。
- `ownedSortKey`は一覧順を決めるためだけの内部キーで、正確な製造年を意味しない。HISTORYの初出年代とは別データとして管理する。
- 旧フィールド`ownedSortYear`を復活させない。CMS・テンプレート・検証スクリプトも`ownedSortKey`へ揃える。
- 公開済みOWNER'S NOTEは`historyEra`を明示し、WATCHから戻るHISTORY上の位置を所有個体年代から自動推定しない。
- WATCH末尾の「次の一本」は`owners-directory.json`の`ownedSortKey`順から生成し、個別WATCH名をテンプレートへハードコードしない。
- 例：Pierce DuofonはHISTORYでは1950年代の初出として扱えても、所有個体一覧では掲載個体に合わせて1960sへ置ける。
- 一覧でWATCHページ用の`catch`や`spec.era`を自動流用しない。一覧専用の`directoryCatch`と所有個体年代を使う。
- 一覧・HISTORYのサムネイルは`fallbackThumbnail`を持たせ、画像取得に失敗してもbroken imageアイコンを露出させない。fallbackも失敗した場合はカード内プレースホルダへ落とす。
- カードはヒーロー画像、ブランド、モデル名、必要な場合だけ補足年代、短い一覧専用キャッチに絞る。
- カード全体をOWNER'S NOTEへのリンクとし、「OWNER'S NOTEを見る」と「個体ページへ」の重複導線を置かない。
- OWNER'S NOTE原文・WATCH本文を一覧都合で変更しない。

## WATCHページ固定順序

1. Header / Title / Catch
2. OWNER'S NOTE
3. SPEC
4. 実機鳴動（YouTube 1本 + Original post on X）
5. 掲載個体ギャラリー（画像がある場合）
6. DEEP DIVE
7. 参考資料・出典

## SPEC

固定ラベル：年代 / ケースサイズ / Cal / 石 / 振動 / 香箱 / 手巻き / 音響 / 特記事項。
ラベルをAI判断で言い換えない。

## 実機鳴動

- 動画は1本。
- WECKER / SIGNALの別プレイヤーや説明カードを追加しない。
- 自動再生しない。

## コード変更範囲

- 通常の記事追加・文章修正：`src/content/watches/` と `public/images/` を中心に変更する。
- OWNER'S NOTES一覧の追加・修正：`src/pages/owners-notes/` と `src/data/owners-directory.json` を中心に変更する。
- HISTORYの追加・修正：`src/pages/history/`、`src/data/history-content.json`、`src/data/history-catalog.ts` と必要なHISTORY用画像を変更する。
- デザイン変更の明示指示がある場合のみ：`src/components/`、`src/layouts/`、`src/styles/` を変更可。
- 一つの記事修正を理由に共通テンプレートを勝手に変更しない。

## モバイル

- 基準幅は390px。320pxでも横スクロールを発生させない。
- 日本語本文・HISTORY見出しは `line-break: strict` / `word-break: normal` を基準とし、`break-all` を使わない。
- 日本語の見た目調整を目的に、語句ごとの大量な`white-space: nowrap`や自動分割ラッパーを入れない。
- 本文へ見た目調整だけを目的とした `<br>` を追加しない。
- タイトルやキャッチなど意図した行単位は構造側で固定する。

## 検索・公開の最低基準

- TOP / HISTORY / OWNER'S NOTES / WATCHは、それぞれ固有の `title` と `description` を持つ。
- 公開ページには canonical URL を付ける。
- OGP / Twitter Cardの基本メタデータを付ける。利用できる実画像があるページは `og:image` を設定する。
- TOP / HISTORY / OWNER'S NOTESは同じWATCH画像の使い回しを前提にせず、既存の実画像・サイト画像からページ内容に合う画像を指定する。
- `robots.txt` でクロールを許可し、`sitemap.xml` を明示する。
- 検索対象ページを追加したら `sitemap.xml` にURLを追加する。
- TOPは `WebSite`、HISTORYは `Article`、OWNER'S NOTESは`CollectionPage`、WATCH / SMARTWATCHは `CreativeWork` を基本に構造化データを付ける。階層ページには `BreadcrumbList` を付ける。
- 検索用タイトルやdescriptionに未確認事項・過剰主張を追加しない。
- SEO目的で本文を水増ししない。本文の編集品質と検索メタデータを分離する。

## 計測・成果観測

- 実装済み / 検証済み / 公開済み / 成果観測済みを分ける。
- 公開成功を、順位・流入・AI検索露出の成功として報告しない。
- Search Consoleの表示・クリックと、Web AnalyticsのVisits / Page viewsを混同しない。
- X / SNS、Organic Search、Direct、その他Referralを可能な範囲で分ける。
- 同じ流入を複数カテゴリへ二重計上しない。
- 変更前後を比較する場合は、公開日・変更内容・計測条件を残す。
- 数字が増減した場合も、SNS投稿、外部言及、季節性、計測変更など別の説明を確認する。
- 完成済みページは、観測された不足がない限りSEO目的だけで改稿しない。
- 詳細な定義は `measurement/metrics.md` に従う。

## 公開前確認

- Astro build成功。
- TOP / HISTORY / OWNER'S NOTES / WATCH / SMARTWATCHの必要ページが生成される。
- OWNER'S NOTES一覧では所有個体年代とHISTORY初出年代が混在していない。
- OWNER'S NOTESの大見出しは`ownedGroup`、補足年代は`ownedEra`から生成し、推定年代レンジを巨大見出しにしない。
- OWNER'S NOTES / HISTORYの一覧画像はprimary/fallbackとも存在し、broken imageアイコンを露出させない。
- WATCHではタイトル、OWNER'S NOTE、SPEC、動画、DEEP DIVE、出典が存在する。
- WATCHの各DEEP DIVEで、段落数と`citationRefs`数が一致し、参照番号が存在する`sourceMeta` / `sources`を指している。
- HISTORYからWATCH、WATCHからHISTORYの往復リンクが存在する。
- `RESEARCH`が非公開の場合、TOP・セクションメニュー・HISTORY生成HTMLのすべてにRESEARCH導線・本文が存在しない。
- `robots.txt` と `sitemap.xml` が生成物に存在する。
- canonical / description / OGP / 構造化データが主要ページに存在する。
- `data:image/...base64` を生成HTMLへ残さない。
- `word-break: break-all` を生成物へ入れない。
- HISTORY本文・見出しに語句ごとのnowrapラッパーを残さない。
- 既存ページの原文を意図なく変更していない。
