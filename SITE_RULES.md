# VINTAGE ALARM — 編集・実装ルール

PROJECT §2の該当分岐から必要な節を読む。同じメッセージ内で取得済みの起動文書へ戻らない。SEO／AIOや計測の論点が発生した場合だけ、それぞれの担当正本へ進む。

## 原則

- 日本語本文の新規執筆・大幅改稿では、次に [strategy/japanese-writing.md](strategy/japanese-writing.md) を読む。通常のコード修正・資料調査では追加しない。
- 資料で確認した事実を書く。必要な関係だけ示し、そこで止める。
- 未確認事項は断定しない。資料間の差は差のまま扱う。
- OWNER'S NOTE原文は、明示指示なしに改変しない。
- キャッチコピー、感想、意味づけ、読者への煽りをAIが追加しない。
- 「面白いのは」「つまり」「単なる〜ではない」「現代につながる」等の編集的解釈を追加しない。
- OWNER'S NOTEのキャッチをDEEP DIVEで回収・説明しない。
- 通常の確定事実では著者名・文献名を本文で連呼しない。文献差そのものが論点の場合のみ本文で区別する。
- 外国語（英語・ドイツ語・フランス語など）の文案・UI文言・コピー・引用・説明を提示する場合、必ず直下に自然な日本語訳を併記する。短いラベルも例外なし。外国語だけを単独で提示しない。
- 多言語版の翻訳では日本語サイト本文を絶対正本とし、意味・比喩・構成・温度・事実の確度を勝手に変更しない。
- 原典・一次資料・専門資料の外国語表現は、時計専門用語や当時語の確認・補強に使う。原典に存在する表現を理由に、日本語正本へない意味・説明・コピーを翻訳本文へ輸入しない。
- 翻訳は逐語性だけを優先した不自然な直訳にはせず、正本の意味と役割を保ったまま対象言語として自然に読める文にする。ただし自然さのための要約・意訳・追加説明・編集的再構成はしない。
- 翻訳者は編集者にならない。OWNER'S NOTE、キャッチ、DEEP DIVEの役割分担を維持し、翻訳時に別セクションの表現を移植・統合・置換しない。

## サイト階層

- `HISTORY`：時代と技術上の問題を追う全体史。
- `OWNER'S NOTES / WATCH`：実機・個体から読む。
- `DEEP DIVE`：個別時計の機構、変遷、文献差、供給関係などを掘る。
- HISTORY本文で個別時計のDEEP DIVEまで説明しない。必要ならWATCHページへ送る。
- `RESEARCH`は`src/data/research-settings.json`の`published`で公開可否を制御し、`locales`で公開言語を限定する。公開対象言語ではTOP・セクションメニュー・HISTORY上の表示を同時に切り替える。中身がない間は非公開にする。
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
- WATCH末尾の「次の一本」は`src/data/watch-recommendations.ts`の編集推薦を使い、年代順へ自動送出しない。推薦先と推薦理由をセットで管理し、個別WATCH名をテンプレートへハードコードしない。
- WATCH末尾では「次の一本」とは別に、`OWNER'S NOTES`一覧へ戻れる小さな全件導線をHISTORY導線と同じ補助ナビゲーション群に置く。
- 推薦先が存在しない、または未公開の場合は「次の一本」を表示しない。年代順の別WATCHへ勝手にフォールバックしない。
- 例：Pierce DuofonはHISTORYでは1950年代の初出として扱えても、所有個体一覧では掲載個体に合わせて1960sへ置ける。
- 一覧でWATCHページ用の`catch`や`spec.era`を自動流用しない。一覧専用の`directoryCatch`と所有個体年代を使う。
- 一覧・HISTORYのサムネイルは`fallbackThumbnail`を持たせ、画像取得に失敗してもbroken imageアイコンを露出させない。fallbackも失敗した場合はカード内プレースホルダへ落とす。
- カードはヒーロー画像、ブランド、モデル名、必要な場合だけ補足年代、短い一覧専用キャッチに絞る。
- カード全体をOWNER'S NOTEへのリンクとし、「OWNER'S NOTEを見る」と「個体ページへ」の重複導線を置かない。
- OWNER'S NOTE原文・WATCH本文を一覧都合で変更しない。

## OWNER'S NOTE本文構造

OWNER'S NOTEは、キャッチコピーを置いたあとに同じ内容を薄く言い換えるだけの場所ではない。作業時点で公開中の日本語WATCHにあるOWNER'S NOTE全体を参照し、次の役割を分ける。固定の代表WATCHだけを永続基準にしない。

1. **Catch** — その時計を一言で掴ませる編集上の入口。比喩や現代語への置換など、OWNER'S NOTE側の温度を持たせてよい。
2. **Lead / Sub** — Catchの意味を、複数行でもよいので具体へ展開する。機構、操作、外観、構造など「なぜそのキャッチになるのか」を読者が理解できる材料を置く。一言で済ませることを目的にしない。
3. **簡易操作ガイド** — 実際の扱い方を短く整理する。Lead / Subと同じ機構や操作が出ても、役割が「魅力の説明」と「手順」で異なるなら重複扱いしない。重複語を消すことを優先して必要な操作説明を削らない。
4. **NOTE** — Lead / Subで既に説明した主題をもう一度言い換える場所ではない。外観、所有個体の観察、別の機構的特徴、歴史的位置など、まだ使っていない別の面へ進む。

- 本当に避けるべき重複は、Lead / SubとNOTEが同じ論点を同じ役割で再説明し、情報が前へ進まないこと。
- CatchとLead / Subの近さは欠点ではない。Lead / SubはCatchを理解させるための展開なので、核心となる機構を明示的に言い直してよい。
- Lead / Subの長さは固定しない。Pierceのように短くても、Cyma / Basis / Westcloxのように数行を畳みかけてもよい。時計ごとの「一番見せたい理由」に必要な長さを使う。
- OWNER'S NOTEはDEEP DIVEの短縮版ではない。キャッチとLead / Subでは編集的な温度を許容し、NOTEでは観察可能な具体へ戻る。DEEP DIVEはより低温度で、機構・変遷・資料差・根拠を扱う。
### Catch / Lead開発プロトコル（全WATCH共通・必須）

このプロトコルはARSA専用ではない。今後追加する時計を含め、OWNER'S NOTEの `catch` / `ownersNote.lead` を**新規作成・大幅改稿・候補選別**するすべてのWATCHへ適用する。既存原文の軽微な誤字修正は対象外。

1. **Reality pinを先に固定する**
   - 対象時計の「変なところ／面白いところ」を、確認済みの機能・操作・外観・構造・実機観察から先に抜く。
   - 未確認の由来や意味をキャッチのために発明しない。比喩は編集上の入口であり、歴史事実へ昇格させない。
2. **現在公開中の日本語WATCHを全件ベンチマークする**
   - 固定の代表4本・6本ではなく、作業時点で `src/content/watches/*.md` の `published: true` になっている日本語WATCH**すべて**の `catch` と `ownersNote.lead` を横並びで読む。
   - ローカル作業環境では `npm run owner-copy:benchmark` で現行公開WATCHのCatch / Leadを動的に一覧化できる。GitHub connector等で作業する場合は同じ対象を正本ファイルから取得する。
   - 既存コピーの語句を流用するためではなく、サイト全体の**温度レンジ**を校正するために使う。
3. **身近なものへ置換してから案を出す**
   - 時計固有のReality pinを、身体感覚、日常動作、身の回りの道具・ガジェット、一般に通じる文化的フレーム等へ翻訳してから候補化する。
   - 抽象的な詩語から逆算して時計へ当てはめない。専門用語だけで初見をふるい落とさない。
   - **置換語そのものが意味を作っているかを確認する。** 「物理です」のように当たり前の性質を言い換えただけの比喩、元の機能より説明力が下がる比喩は棄却する。
   - Catch / Leadは断片表現を使ってよいが、**各行の主語・目的語・述語・指示先が読者に回収できること**を必須とする。「〜も。」だけ残して何をするのか不明になる、省略語や機構名を初出説明なしで置く、曖昧な「時間」だけで済ませる等は避ける。専門語が必要なら先に平易な言葉で対象を示す。
4. **候補ごとの帰属と派生元を保持する**
   - 発案元を `USER` / `AI` / `COUNCIL` / `SOURCE` 等で混同しない。
   - ユーザー案をAIが削った、AI案をユーザーが変えた等の派生は「共同案」に丸めず、**起点 → 変更者 → 変更内容**を残す。
5. **VA温度比較で選別する**
   - 最低限、**初見理解 / 親しみやすさ / 時計固有機能への接続 / 遊び・比喩の濃さ / 外部ネタ依存 / Leadが具体説明へ戻れる余地**を比較する。
   - 現行VAは低温度から高温度まで共存してよい。平均化・均一化しない。ただし単独で詩的すぎる、硬すぎる、説明的すぎる、外部作品が時計本人より前に立つ案は再検討する。
   - 外部作品・番組・ミームを使う場合、元ネタを知らなくても最低限の意味が残り、写真や機構を見ることで**時計本人がオチを回収できるか**を確認する。
   - **Sensitive-context collision check**：対象の歴史に障害、戦傷、リハビリなど当事者の被害・回復に関わる背景が資料で確認できる場合、その背景そのものを軽い戦闘ネタやミームの笑いどころに使わない。遊びを入れるなら機構・操作・外観・ガジェット性など別の軸へ移す。因果関係が未証明でも、確認済みの周辺史との衝突を無視する理由にはしない。
6. **状態を明示して取捨選択する**
   - 候補は `WORKING_MAIN` / `SUB` / `HOLD` / `REJECTED` / `FINAL_PENDING_REALITY_CHECK` / `FINAL` のいずれかで扱う。
   - ユーザーが最終確定していない案を `FINAL` にしない。到着後の実機操作・音・触感等が意味を左右する場合は `FINAL_PENDING_REALITY_CHECK` に留める。
   - 既存のper-WATCH Research Map / Current Task Boardがある場合、**短いCURRENT確認はそこを先に読む**。採否・起点・撤回理由の履歴は `CHANGE_DECISIONS.md` に残すが、履歴全文をquery-time CURRENT ownerとして使わない。
7. **判断履歴へ残す**
   - 採用・降格・棄却・最終確定など後から再構成すると帰属や理由が失われる判断は `CHANGE_DECISIONS.md` へ残す。
   - Catch / Leadの実ファイルを変更するPRでは、判断履歴に少なくとも **`対象WATCH` / `起点・帰属` / `VA温度比較` / `採否・現在状態`** を明記する。CIはこの4項目を検査する。
   - 記録は案の作者を評価するためではなく、同じ案の再発明、棄却案の無断復活、発案者の入れ替わりを防ぐために使う。

Catch / Leadの目的は「VAっぽい言い回し」へ寄せることではない。**時計固有の面白さを、既存VAの温度レンジから逸脱せず、初見でも掴める入口へ翻訳すること**を優先する。

## WATCHページ固定順序

1. Header / Title / Catch
2. OWNER'S NOTE
3. SPEC
4. 実機鳴動（YouTube 1本 + Original post on X）
5. 掲載個体ギャラリー（画像がある場合）
6. DEEP DIVE
7. 参考資料・出典
8. 次の一本（編集推薦）

- `参考資料・出典`の内部は、研究メタデータがあるWATCHでは `SOURCES → RESEARCH NOTE → REVISION` の順序を固定する。
- `RESEARCH NOTE` / `REVISION` は既存の参考資料・出典details内に置き、本文途中のカードや独立セクションとして前面化しない。
- 研究メタデータがないWATCHへ空の `RESEARCH NOTE` / `REVISION` を表示しない。

## SPEC

固定ラベル：年代 / ケースサイズ / Cal / 石 / 振動 / 香箱 / 手巻き / 音響 / 特記事項。
ラベルをAI判断で言い換えない。

## 実機鳴動

- 動画は1本。
- WECKER / SIGNALの別プレイヤーや説明カードを追加しない。
- 自動再生しない。

## コード変更範囲

- 通常の記事追加・文章修正：`src/content/watches/` と `public/images/` を中心に変更する。
- WATCHの研究メタデータ・修正履歴：`src/data/watch-research/` と `src/data/watch-research.ts` を正本とし、その追加だけを理由に承認済みWATCH本文を変更しない。
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
- TOPは `WebSite`、HISTORYは `Article`、OWNER'S NOTESは `CollectionPage`、日本語WATCHは `Article`、SMARTWATCHは `CreativeWork` を基本に構造化データを付ける。階層ページには `BreadcrumbList` を付ける。
- 日本語WATCHの `Article` には、表示内容と一致する `headline` / `author` / `publisher` / `mainEntityOfPage` / `dateModified` を持たせる。`dateModified` はGitの実更新日を使い、ビルド日時を偽の更新日として入れない。
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
- 研究メタデータがあるWATCHでは、参考資料・出典details内が `SOURCES → RESEARCH NOTE → REVISION` の順で、研究メタデータがないWATCHへ漏れない。
- 日本語WATCHは `Article` + `BreadcrumbList`、SMARTWATCHは `CreativeWork` + `BreadcrumbList` の構造化データを持つ。
- WATCHの「次の一本」は公開済みWATCHを指し、`watch-recommendations.ts`の推薦理由が表示される。
- WATCHの各DEEP DIVEで、段落数と`citationRefs`数が一致し、参照番号が存在する`sourceMeta` / `sources`を指している。
- HISTORYからWATCH、WATCHからHISTORYの往復リンクが存在する。
- `RESEARCH`が非公開の場合、TOP・セクションメニュー・HISTORY生成HTMLのすべてにRESEARCH導線・本文が存在しない。
- `robots.txt` と `sitemap.xml` が生成物に存在する。
- canonical / description / OGP / 構造化データが主要ページに存在する。
- `data:image/...base64` を生成HTMLへ残さない。
- `word-break: break-all` を生成物へ入れない。
- HISTORY本文・見出しに語句ごとのnowrapラッパーを残さない。
- 既存ページの原文を意図なく変更していない。

## 時計研究の標準フレーム

WATCH / OWNER'S NOTE用の個体研究は、特別な理由がない限り **Pierce Duofon / Wittnauer 10WAで既に使っているVAの調査順**を基準にする。公開ページの章立てを機械的に固定する規則ではなく、調査面積と優先順位を制御するためのdefault frameである。

1. **作った会社**
   - 会社史、製造能力、ブランド / OEM / supplier関係
2. **需要背景**
   - その機能・時計が必要とされた用途、利用者、社会・市場背景
   - 背景史は時計本人への説明力がある範囲で止める
3. **時計そのもの**
   - 機構、操作、仕様、モデル変遷、現存個体、所有個体の観察
   - 壊れやすさ・弱点・修理性・使用上の注意は、個体例 / 一般傾向 / 当該モデル固有を分離する
4. **同目的・同機構の比較個体**
   - 同時代機、姉妹機、OEM、同じ用途への別解を比較し、共通点と固有点を分ける
5. **最後にcaliber / platformと変貌種**
   - 普及機としての通常用途、特殊用途への転用、派生caliber、他社採用などを置き、対象時計をより大きい機構史へ戻す
6. **時計固有の追加要件**
   - 特許、軍用、障害支援、特別展示、企業内のモデル変遷等、その時計でだけ必要な論点を追加する

運用ルール:
- archiveや制度史の資料が面白くても、上のどの箱を更新するのか説明できなければP0へ昇格しない。
- 「契約書が見つかるまで完成しない」のように、単一の未発見資料を研究全体のblockerへしない。
- Council / 焼いてで研究計画を作る場合も、この既存VA frameを先に適用し、その後に時計固有の論点だけ追加する。
- 既存研究にこの順序から外れた枝がある場合、証拠は捨てずにCONTEXT / APPENDIX / HOLDへ降格して保持する。
- **Research Evidence Ingress**: 別チャットを含む新しい画像・資料・一次資料・seller回答・ユーザー訂正を受け取った場合、対象WATCHに既存Research Ledgerがあれば**詳細証拠・出典・逐次履歴をLedgerへ追記**する。既存Research Map / Current Task Boardがある場合は、その証拠がCURRENT / OPEN / HOLD / next actionを変える時だけMapも更新する。公開WATCH本文は新証拠の受領だけで自動変更しない。既存Ledger / Mapが無いWATCHへ、AI都合で新しい台帳を作らない。


## 海外価格・費用の日本円併記（共通出力契約）

- ユーザー向けに海外の時計・部品・ドナームーブメント・修理代・送料・返金／交渉額を提示するときは、**外貨の原額と日本円（JPY）換算を同じ行または近接した位置で必ず併記**する。ユーザーが外貨のみを明示指定した場合だけ例外。
- 商品本体と送料は分け、**送料込み合計の日本円**も示す。比較表では原通貨／本体の日本円／送料の日本円／送料込み日本円を確認できる状態にする。未知の送料は「日本宛送料未確認」と明示し、勝手に仮定しない。
- **換算レート・基準日時・概算／確定の区別**を明示する。外貨が現在価格なら可能な限り現在レートを確認し、できない場合は仮定レートとして表記する。輸入税・関税・決済手数料等の未反映費用も必要に応じて明示する。
- **出品価格と成約相場、working表記と動作保証、ドナー調達費と修理工賃を混同しない**。前回の外貨価格を再利用する場合は出品の現在性が未確認であることを示す。
- 費用の比較・交渉・実質負担額を計算するときは、**ユーザーが把握しやすい円建てを主表示**とする。外貨建ての額だけ提示してユーザーに換算を任せない。


## 個人時計台帳 — cross-repo正本

個人所有・取得・整備・売却の台帳は、公開VINTAGE ALARMリポジトリへ重複保存しない。正本は **`orima1995-create/watchdiary-ios` のGitHub Issues** に置く。

時計台帳、所持時計、コレクション、購入日／取得日、取得経緯、購入額／取得額、OH・OVH、修理歴、現在地、輸送中、預け中、売却、KEEP / MAY SELL等を扱う場合は、**VINTAGE ALARM repo内だけを検索して「台帳がない」と判断してはならない。**

**横断照合の強制条件（研究中も適用）**：所有個体について「購入を決めた理由／事前に許容した故障リスク／整備・修理の依頼先／部品の調達・修理可否／購入後の対応方針」を語るときは、研究・症状相談という表向きの分類でも **回答前に `watchdiary-ios` #21 → #60 をfresh取得**し、個体別issueがあれば確認する。Research Ledger / Mapに見当たらないことを、ユーザーが事前共有していない根拠にしない。取得できなければ「個人台帳未照合」と明示して判断をHOLDし、一般論で既存の修理ルートを上書きしない。ユーザーの現状報告は研究証拠として別途Research Ledgerへ記録し、**個人台帳自体はユーザーが更新を明示した場合のみ変更**する。

基本取得順:
1. **#21 `[CURRENT] 腕時計コレクション台帳｜OWNED`** — 現在所有の主台帳。まずここを取得する
2. **#60 `[CURRENT] 腕時計コレクション遍歴｜DIRECT-EVIDENCE REBUILD`** — 取得順、購入・譲渡経緯、価格、意味づけ、時系列
3. **#23 `コレクション保有意志｜KEEP / MAY SELL`** — 現在の保有・売却意向
4. **#25 `時計周辺コレクション｜Watch-lighter + Eterna 8 DAYS`** — 腕時計本数に含めない周辺時計
5. 個体別のCURRENT Issueがある場合は追加取得する。例: **#58 WESTCLOX Watchlarm、#31 CYMA Time-O-Vox No.489**
6. 売却・査定は **#20 Rolex Ref.1501**、金融状態は **#19 loans** へ分離する

#21で持つ基本項目:
- 取得日
- 取得方法・場所
- 取得額
- 取得経緯
- OH / OVH / 修理歴
- **個体識別情報** — Ref. / Cal. / movement No. / case No. 等、分かるものだけ
- **既知不具合・状態**
- **改造・部品交換歴**
- **現在地 / 現在状態**

日差・振り角・beat error等の精度測定や「最終動作確認」は**台帳の必須項目にしない**。個体研究・修理資料に実測が存在し、意味がある場合だけ詳細正本へ残す。

個体の歴史・機構・一次資料・公開研究はVINTAGE ALARM側の研究正本を使う。たとえばARSA Blind Alarmなら `research/ARSA_BLIND_ALARM_RESEARCH_MAP.md` / `research/ARSA_BLIND_ALARM_LEDGER.md` が研究正本で、**所有・取得・OH・現在状態はwatchdiary台帳と突合する**。研究正本と個人台帳の役割を混ぜない。

ユーザーが台帳更新を明示した場合は、該当する `watchdiary-ios` CURRENT Issueを更新する。単なる会話・調査だけで無断更新しない。公開サイトへ載せる指示がない限り、個人台帳をVINTAGE ALARM公開本文へコピーしない。

時計の事実認定では、Project資料『Alarm am Arm』『The Alarm Wrist Watch』等を確認できる場合は一般論より先に使う。


## HOW THEY RING — CURRENT

表示の実装照合は `src/data/how-they-ring-localizations.ts` を参照する。

- HOW THEY RING上段の代表機はHISTORY正本の著名機を使う。現行の所有・掲載個体一覧を代表機として転記しない
- HOW THEY RINGの現行分類は **GONG / CASEBACK の2種類だけ**。詳細機構を第三・第四カテゴリへ増やさない。
  - **2分類にした理由**：このページの主目的は機構分類表を作ることではなく、実機の音を入口に「どう鳴っているか」を見て・聴いてもらうこと。入口でGONG / CASEBACK / BELL / PINの4分類を並べると、CASEBACK側に含まれる構造差を同列の大分類として扱うことになり、閲覧者にも個体カードにも細分類を要求する設計になる。
  - **採用した整理**：入口は「独立した発音体を叩くGONG」と「ケースバック側の構造を使って鳴らすCASEBACK」の2つに留める。CASEBACK内部の振動板・ピン伝達・ベル状発音体などの差はFIG.02–04で見せる。つまり「大枠2分類＋内部構造の代表例」であり、FIG.02–04は第三・第四カテゴリではない。
  - **この判断で守るもの**：掲載個体はGONG / CASEBACKだけで切り替え、各カードにFIG番号・詳細型名を付けない。音を聴く導線を分類学より前に置き、同じCASEBACKでも構造が大きく違うこと自体を発見要素にする。
  - **旧4分類を棄却した理由**：GONG / CASEBACK / BELL / PINを同階層に置くと、大枠とCASEBACK内部の機構差が混在する。分類粒度が揃わず、個体ごとの細分類まで波及するため不採用。新しい一次資料で大枠そのものを変更すべき根拠が出ない限り復活させない。
- 上段の図は分類体系ではなく「同じ大分類でも鳴らし方の構造差がある」ことを見せる代表例。個体カードへFIG番号や詳細機構分類を持ち込まない。
- FIG.01 GONG: OMEGA MEMOMATIC。現行表示は「輪状の音バネを叩く」。2026-09-25にJA / EN / DEをこの現行表現へ同期済み。機構説明の資料境界は引き続き個別出典で管理し、一般論だけで拡張しない。
- FIG.02 CASEBACK: 「振動板型 — VULCAIN CRICKET」。旧「膜状バック型」は失効。
- FIG.03 CASEBACK: 「ピン伝達型 — JUNGHANS MINIVOX」。
- FIG.04 CASEBACK: 「BELL-BASE型 — LANCO-FON · CAL.1241」。Lanco-Fon全体へ一般化しない。Cal.1241は資料上hammerがGlockeを打つことを確認したため、このcaliberに限定する。
- HOW THEY RINGの機構図根拠は、各FIGにつき確定的な1出典だけを折りたたみ表示する。原則『The Alarm Wristwatch』『ALARM AM ARM』を優先し、2冊で直接支えられない場合のみ外部資料1件を採用する。補助資料は内部検証用で、閲覧者へ列挙しない。GONG / CASEBACKと各型名はVINTAGE ALARMでの整理として明示する。
- 掲載個体の大分類は CYMA Time-O-Vox / Pierce Duofon / Wittnauer 10WA＝GONG、Citizen Alarm / Westclox Watchlarm / Basis Alarm＝CASEBACK。
- Pierce Duofonの二音源表示は **WECKER / 音あり** と **SIGNAL / 音無し**。ファイル名由来の WAKER / SILENT を表示ラベルへ戻さない。
- HOW THEY RINGのページ名／TOP入口表示名は **HOW THEY RING**。旧「音で選ぶ」は失効。TOPではOWNER'S NOTES直下に置く。**共通ハンバーガーメニュー内の日本語ラベルだけは「音で見る」**とする。


## 失効済みの公開・編集方針

- HOW THEY RINGを GONG / CASEBACK / BELL / PIN 等の4分類へ戻す
- CASEBACK個体をFIG.02/03/04の詳細分類でカード分類する
- FIG.02の「膜状バック型」表記を復活させる
- FIG.04をcaliber指定なしの「LANCO-FON」全体へ一般化する
- HOW THEY RING入口名を「音で選ぶ」へ戻す
- Pierce Duofonの表示ラベルへ WAKER / SILENT を使う

新証拠または明示的な仕様変更がない限り復活させない。

- 旧公開ホストをcanonicalとして扱う
- `ownedSortYear` を復活させる。現在は `ownedSortKey`
- 所有個体年代からHISTORY年代を自動生成する
- WATCH末尾の「次の一本」を年代順へ自動フォールバックする
- RESEARCH非公開をCSSで隠す。非公開時は生成HTML自体へ出さない
- SMARTWATCHを通常の検索流入ページとして扱う
- SEO目的だけでOWNER'S NOTEや完成済みWATCH本文を書き換える
- Calibre DB化、ブランド百科事典化、FAQ大量生成、検索語差し替え型ページ量産
- AIOだけを理由にllms.txtやQ&A分割、本文細切れ化を増やす
- build成功だけでデザイン変更を検証済みとする
- `TEST SURFACE`、`非公開プレビュー`、`PUBLIC`、`CMS EDIT`、音源準備中、追加予定などの制作メタを視聴者画面へ表示する
- Council V1の「焼いて」で即2chスレを開始する仕様
- Council V1の `quick / project / deep-web-10` が人数と継続ラウンド数を一体で固定する仕様
- Council V1の QUICK=継続×2 / PROJECT=×3 / DEEP WEB=×4 の固定反復
- Council住民へ架空の人口属性を足して多様性の代用にする方向

個別案件の棄却候補は、その案件の研究台帳・PR・実験ログ側を正本とし、このファイルへ大量複製しない。


## サイト運用の実装索引



- 正規公開ホスト: `https://vintagealarm.github.io/`
- 旧 `orima1995-create.github.io/orima1995-creator.github.io/` はlegacy扱い
- 主セクション: HISTORY / OWNER'S NOTES / WATCH / RESEARCH
- SMARTWATCHはHISTORYのエピローグ。検索流入目的ではなく `noindex,follow`、sitemap対象外
- 日本語WATCH本文が多言語版の意味上の正本
- 公開中のWATCH routeの正本は `src/content/watches/*.md` の `published: true`。**公開本数と対象一覧をこのStateへ固定しない**。`public/llms.txt` と各checkerは作業時点のfrontmatterへ追従する。Analytics運用上の **measurement target 5本**（Basis / Pierce / Cyma / Citizen / Westclox）は公開状態とは別の固定groupingとする
- **ARSA Blind Alarmは `published: false` がユーザー意図のCURRENT。** 非公開指定を `true` へ戻さない。旧実装で公開された履歴は保持するが、再公開はユーザーの新しい明示指示がある場合だけ行う
- Xの投稿本文生成・language / audience / character limit / transformation / destinationのCURRENTは Social Router の **X CURRENT OUTPUT CONTRACT** を正とする。このStateへ値を複製しない
- OWNER'S NOTES一覧の正本は `src/data/owners-directory.json`
- OWNER'S NOTEの新規 `catch` / `ownersNote.lead` 開発・大幅改稿は `SITE_RULES.md` の**全WATCH共通Catch / Lead開発プロトコル**を必須とする。比較母集団は固定の代表数本ではなく、作業時点で `published: true` の日本語WATCHすべて。候補ごとに発案者 / 派生元、VA温度比較、採否・現在状態を保持し、Catch / Leadの実ファイル変更時はCIのcopy provenance gateを通す。
- WATCH末尾「次の一本」の正本は `src/data/watch-recommendations.ts`
- WATCH研究メタデータ / 修正履歴の正本は `src/data/watch-research/` と `src/data/watch-research.ts`
- RESEARCH表示は `src/data/research-settings.json` の `published` で公開可否、`locales` で公開言語を制御する
- **RESEARCHは現在、日本語で公開中。** 第一号はARSA Blind Alarmで、`/research/arsa-blind-alarm/` が `src/content/watches/arsa-blind-alarm.md` を同一正本として表示する。ARSA通常WATCHの `published: false` は維持し、OWNER'S NOTES / HISTORYの所有個体レールへは出さない。画像は現行placeholderを使用し、COMING SOON等の制作メタは視聴者画面へ出さない。EN / DEのRESEARCH入口は未公開。
- 視聴者画面には制作・編集・公開状態のメタ説明を出さない。認証付きプレビューも同様で、保護は認証と `noindex` で行う

- 履歴保持: **PR / branch / commit / decision / rejected・superseded候補は、整理だけを理由に削除しない。** 現行作業キューと履歴保存を分離し、不要になった作業は close / draft / superseded / HOLD 等で退避する。過去の取捨選択・訂正・撤回理由はGitHub履歴と `CHANGE_DECISIONS.md` から再参照できる状態を維持する。
- active queueと履歴の境界: **open PR = 現在の作業候補、closed / superseded PRとPRなしbranch = 原則HISTORY**。例外は会話または正本で明示的に作業中指定されたbranchのみ。これによりbranch数が増えても、履歴保存と現在作業の発見性を両立する。
- Manager Control Plane pilot: `.codex/MANAGER_CONTROL_PLANE.md`。Task Envelope field正本は `.codex/TASK_ENVELOPE_TEMPLATE.md`。lifecycle / Chat Audit / VerifierはManager、分野固有CURRENT / write contractは各domain ownerを正とし、このStateへ再定義しない
- Fail-Closed Inference Guard: `.codex/FAIL_CLOSED_INFERENCE_GUARDS.md` + `.codex/inference-guard-cases.json`。推論規則本文はGuardを正とし、このStateはpointerのみ
- OWNER'S NOTE Slides PNG exporter: `tools/owner-note-slides/README.md` + `tools/owner-note-slides/manifest.json` + `scripts/export-owner-note-slides.mjs`。制作正本はprivate Google Slides `1Lcz0CEZncDw1GncI4RMY6qDmfO4Fknq4NvpGtBZAaLk`、現行6 WATCH × JA / EN / DE = 18 slideをmanifestで固定し、派生PNGは1600×2233を実ピクセル検査してartifact化する。GitHub Actions自動書き出しは `GOOGLE_SERVICE_ACCOUNT_JSON` secretと当該deckへのViewer共有が必要で、公開リンク化はしない
- `.codex/config.toml` では multi-agent は無効。Manager Control Plane pilotでも明示指示なしに有効化しない
- CouncilのCURRENT仕様本文はStateへ複製しない。`PROJECT.md` §2のCOUNCIL経路から `council-worker/V3.md` / `council-worker/README.md` / `council-worker/src/v3.ts` / `council-worker/src/index.ts` を必要時だけ取得する。`焼いて` / 番号のlauncherは `PROJECT.md` §1を正とする。

この一覧だけで対象ページの実装状態を断定しない。編集前に必ず対象ファイルと、作業中branch / PRがある場合はそのdiffを確認する。


## 4. DO NOT CHANGE WITHOUT EXPLICIT INSTRUCTION

- OWNER'S NOTE原文
- 確定済みキャッチコピー
- 資料に基づく確定本文
- 日本語正本の意味・比喩・構成・温度・事実確度
- 一つの記事修正を理由とした共通テンプレート / サイト全体設計
- 指定外のレイアウト、画像、文言、導線

翻訳では自然さのための要約・意訳・追加説明・編集的再構成をしない。

ユーザーが「ここだけ」「他は変更不可」と指定した場合は、差分編集を優先し、指定外を改善しない。


## 8. OPEN ISSUES

プロジェクト全体として常に確認が必要な未解決領域:

- 検索表示 / クリック / サイト来訪 / 回遊のどこで落ちているかは、同一指標として扱わない
- X / YouTube側のクリック・再生とCloudflare Entry Visitsを1対1対応とみなさない
- 外部AIがページを引用したことと、意味を正しく保持したことを分けて評価する
- AI Assistant ReferrerとAI回答内での自然露出を同一視しない
- 2026-09-10のホスト移行をまたぐ期間比較は同条件比較として扱わない

個別の未解決事項は `measurement/*`、`strategy/*`、研究用PR / 台帳を確認する。


- OWNER'S NOTEの `catch` / `ownersNote.lead` を新規作成・大幅改稿・候補選別する場合は、**ARSAに限らず全WATCH共通で** `SITE_RULES.md` のCatch / Lead開発プロトコルを先に適用する。作業時点で `published: true` の日本語WATCHすべての現行Catch / Leadを横並び確認し、候補の発案者・派生元、Reality pin、VA温度比較、採否・現在状態を保持する。ローカル環境では `npm run owner-copy:benchmark` を使える。固定の代表本数や会話記憶だけで温度を推定しない。
- Catch / Leadで遊びを入れる場合は `SITE_RULES.md` のSensitive-context collision checkも必須。対象の背景に障害・戦傷・リハビリ等が確認できるなら、その背景を軽いネタの材料にせず、機構・操作・外観など別軸で遊ぶ。
