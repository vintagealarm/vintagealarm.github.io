# VINTAGE ALARM — DECISION / CHANGE LOG

この文書は「いつ・何を・なぜ変えたか」を人間が時系列で追うための台帳です。Gitのcommit履歴を置き換えるものではなく、仕様判断・棄却理由・再検討条件を短く残します。

## 記録ルール

- 日時は **JST (UTC+09:00)**、`### YYYY-MM-DD HH:mm JST — ...` 形式で記録する。
- 現行仕様・判断・方針・棄却候補が変わる変更は、実装と同じbranch / PR内で必ずここへ追記する。未記録のまま完了・VERIFIED扱いしない。
- 各新規項目は最低限 **変更 / 理由 / 旧状態・棄却 / 影響範囲 / 検証状態 / 関連 / 日時根拠** を残す。
- GitHub時刻を日時根拠にする場合は、元のUTC時刻とJST換算を `2026-09-23T06:28:13Z → 2026-09-23 15:28 JST` の形で併記し、CIで換算を検証する。
- PR完了前にmerge-base以降のcommit / changed filesと本台帳を突合し、判断変更の未記録が0件であることを確認する。
- 単なるtypo、依存更新、意味を変えない整形など、後から判断経緯を追う価値がない変更は記録不要。ただしdecision-bearingなパスを変更するPRで例外を使う場合は、PR本文に `Decision-Log: not-required — <理由>` を明示する。
- `PROJECT_STATE.md` は「今どうなっているか」、このファイルは「いつ・なぜそうなったか」を担当する。現在値を両方へ長文で重複させない。
- 過去履歴も可能な範囲で遡及復元する。日時はGit commit / PRを第一根拠とし、保存済み会話・Project資料・スクリーンショット等を突合して判断理由を補う。確認できない日時・理由だけ「未復元」とし、推測では埋めない。

---

## 2026-10-02

### 2026-10-02 22:34 JST — llms.txtへVINTAGE ALARMの普及・翻訳・体験目的を明示

- **変更**：`public/llms.txt` の既存Site identity / Evidence policy / Reliabilityを維持したまま、その直後へEditorial purposeを追加した。第一目的を「機械式アラーム腕時計を知り、理解し、興味を持つ人を増やすこと」とし、専門用語→一般読者の言葉、機構→実際の動き、スペック→実音、文献→現存実機、歴史→面白さ、散在情報→比較・判断可能な理解への「翻訳」を編集上の手段として定義した。現代語キャッチは史実主張ではなく編集上の翻訳と明示し、`discovery → understanding → experience → verification → research when necessary` の順序を固定した。
- **理由**：従来の`llms.txt`は、独立研究サイトであること、証拠種別、個体観察の一般化禁止、訂正方針は説明できていた一方、「なぜ既知情報も扱うのか」「なぜ現代語キャッチ・操作ガイド・実音・比較UIを置くのか」というサイトの目的が機械可読な入口だけでは十分に伝わらなかったため。初見AIが独自研究の有無だけでサイト価値を評価し、普及・理解・体験・購入判断の補助という主目的を落とす誤読を減らす。
- **旧状態・棄却**：`llms.txt`を研究サイトの身元・証拠方針・独自研究routeの列挙だけに留め、編集的比喩・実音・比較UIの目的を暗黙のままにする状態を棄却する。一方、人向けABOUTページを新設したり、TOP / WATCH / OWNER'S NOTE本文をAIO目的で改稿する案は採用しない。
- **影響範囲**：`public/llms.txt` と本判断履歴のみ。公開WATCH / HISTORY / OWNER'S NOTE本文、キャッチコピー、HOW THEY RINGの再生実装、音源、分類、UI、sitemap、Analyticsは変更しない。
- **検証状態**：branch `feat/llms-editorial-purpose-20261002` へ実装済み。Duofon節では、Pierce Cal.135系を既知の量産機械式アラーム腕時計における唯一の二モード量産例、別の既知例をJunghans Minivox prototypeとして記述し、所有前に見つけられた鳴動動画が二モードの片方しか示さずWECKER / SIGNALを比較できなかった原体験を明示した。HOW THEY RING節では同じ大分類でも音が違うこと、複数音源の同時比較、個体録音をモデル全体へ一般化しないことを明示した。PR CIとmain merge後のlive artifact確認は別状態として扱う。
- **関連**：`public/llms.txt`、`strategy/seo-aio.md`、`SITE_RULES.md`。実装commit `246b1ce0c85b4a4d179adbeac910440acf1c7ffe`。
- **日時根拠**：GitHub implementation commit `246b1ce0c85b4a4d179adbeac910440acf1c7ffe` の `2026-10-02T13:34:45Z → 2026-10-02 22:34 JST`。


### 2026-10-02 18:39 JST — 個人時計台帳をwatchdiary cross-repo正本へ固定し、PROJECT起動ルートへ追加

- **変更**：`PROJECT.md` に個人時計台帳のcross-repoルートを追加し、所持時計・取得日/取得経緯/取得額・OH/OVH/修理歴・現在地/現在状態・売却/保有意志を扱う場合は `orima1995-create/watchdiary-ios` のCURRENT Issue群を先に取得する仕様へ変更した。入口は #21 CURRENT OWNED、取得遍歴 #60、保有意志 #23、周辺時計 #25、個体別CURRENT Issue（例: #58 Watchlarm / #31 CYMA）とし、#21の基本項目を「取得日 / 取得方法・場所 / 取得額 / 取得経緯 / OH・OVH・修理歴 / 個体識別情報 / 既知不具合・状態 / 改造・部品交換歴 / 現在地・現在状態」に固定した。日差・振り角・beat error・最終動作確認は台帳必須項目にしない。PROJECT_STATEにも同じcross-repo正本の入口だけを短く同期した。
- **理由**：既存の個人時計台帳が `watchdiary-ios` に存在するのに、VINTAGE ALARM repo内だけを検索して「台帳がない」と誤判定し、新規台帳作成を提案しかけたため。公開サイト研究正本と個人所有台帳の置き場所が別repoであることを起動時に明示し、同じ見失いを再発させない。
- **旧状態・棄却**：VINTAGE ALARM repo内だけを検索して個人台帳の有無を判断する運用、公開repoへ個人取得台帳を重複生成する運用、OH時に必ず得られるとは限らない精度測定を台帳必須項目にする案を棄却する。
- **影響範囲**：`PROJECT.md` の分野別ルーティング / 強制チェック、`PROJECT_STATE.md` のSOURCE OF TRUTH / observation pointer、今後の個人時計台帳取得・更新。公開サイト本文、WATCH / HISTORY / OWNER'S NOTES、Analytics、研究資料そのものには変更なし。
- **検証状態**：専用branch `docs/route-watch-ledger-20261002` で `PROJECT.md` / `PROJECT_STATE.md` を更新。PR作成前にdiffを確認し、#21 / #60 / #23 / #25 / #58 / #31 / #20 / #19へのroute、台帳必須項目、精度計測非必須、公開repoへの重複保存禁止が文書内に存在することを再取得で確認する。docs-only変更のためサイトbuild/live確認は対象外。decision-log gateはPR CIで確認する。
- **関連**：`orima1995-create/watchdiary-ios` Issues #21 / #60 / #23 / #25 / #58 / #31 / #20 / #19。PROJECT更新commit `d8de7ceafd2dc93a510e429b187ab40cf3192c9c`、PROJECT_STATE更新commit `8de042ea7cc2d2434b4441ce870750246f202756`。
- **日時根拠**：GitHub commit `d8de7ceafd2dc93a510e429b187ab40cf3192c9c` の `2026-10-02T09:39:21Z → 2026-10-02 18:39 JST`、commit `8de042ea7cc2d2434b4441ce870750246f202756` の `2026-10-02T09:39:37Z → 2026-10-02 18:39 JST`。

### 2026-10-02 18:09 JST — Council V3 / 宮廷道化師の誕生経緯を会話実態へ補正し、ノンデリ口調とsilent hookの採用理由を固定

- **変更**：`research/COUNCIL_V3_COURT_JESTER_DESIGN.md` と `council-worker/V3.md` の誕生経緯を補正し、ユーザー自身の気づき→他ユーザーへの助言→「2ch民で焼いて」を多用した理由の自己再解釈→実在の宮廷道化師への到達、という実際の順序を明記した。あわせて、AI側が一度「ノンデリ口調は必須ではない」と提案したが、ユーザーが「道化のネタ扱いだから強い批判を許容できる」と却下し、Fool's Licenseの口調を心理的緩衝UI / 機能要件へ昇格した経緯を追加した。1〜6へのsilent Jester hookも、結論ありきへ当事者が気づいていない重大前提を実装・決定前に安く潰す目的で採用したことを明記した。AGENTS / PROJECT_STATEもV3の7形式と正本へ同期した。
- **理由**：mainへ先に残した誕生記録は「90%付近の気づき→宮廷道化師」へ圧縮されすぎ、ユーザーが自分で発見・言語化・原点回帰したこと、2ch形式の心理的緩衝という利用理由、AI提案をユーザーが訂正してノンデリ口調を要件化したこと、silent hookのコスト上の採用理由が抜けていた。これらは7の挙動を将来再実装・再解釈する際に落としてはいけない設計理由である。
- **旧状態・棄却**：宮廷道化師を「AIが考案した辛口レビュー形式」または「口調は装飾で普通の言い方でもよい」と読める短縮記録を棄却する。2ch形式と7を単なる口調違いとして扱う解釈も棄却する。
- **影響範囲**：Council V3の誕生経緯正本、運用正本、AGENTS / PROJECT_STATEのCouncilルーティングと現在仕様。V2の1〜6の番号・意味、サイト本文、WATCH、SNS実データ、研究内容には変更なし。
- **検証状態**：この会話でユーザーが訂正した発見順序・2ch利用理由・ノンデリ口調の要件化・silent hook採用理由を再確認して文書化。main更新後に対象ファイルを再取得して内容一致を確認する。CI / Worker deployの成否は別状態として扱う。
- **関連**：`research/COUNCIL_V3_COURT_JESTER_DESIGN.md`、`council-worker/V3.md`、`AGENTS.md`、`PROJECT_STATE.md`、`council-worker/src/v3.ts`。
- **日時根拠**：会話セッションのローカル時刻 `2026-10-02 18:09 JST`。

## 2026-10-01

### 2026-10-01 08:33 JST — Citizen Alarm公開本文と初回Insightsを6本目の正本へ登録

- **変更**：Citizen Alarmの公開画面とReel Insights 7枚を確認し、実投稿本文全文・公開hashtags・承認稿との差分を `instagram-published-copy.md` へ、2026-10-01 08:28–08:29 JSTの初回観測値を `instagram-insights-timeseries.md` へ登録する。Instagram時系列の検査・追記・report対象も5本から6本へ拡張し、Social Router上の初回6個体一巡を完了状態へ更新する。
- **理由**：Citizenは投稿前承認稿だけが正本化され、公開確認とInsights時系列が未登録だったため。公開本文では本文本体は承認稿どおりだが、hashtagsが承認稿の6個から公開画面の4個へ変わっており、承認状態のままでは実投稿との不一致が残る。6本目を既存の単一時系列と同じ検査・report経路へ含め、今後の再取得を同じ形式で累積する。
- **旧状態・棄却**：Citizenを `approved / not publication-verified` のまま扱う状態、5本固定のInstagram集計、投稿画面529閲覧とInsights詳細530閲覧の一方を捨てる処理を棄却する。公開時刻は画面の `2時間前` から分単位へ逆算せず、時刻不明として保持する。
- **影響範囲**：Instagram実投稿copy正本、Reel Insights時系列正本、6本横断の集計スクリプト、Social Router、判断履歴。公開サイト、WATCH本文、Instagram投稿そのもの、VA Analytics定義、Project資料PDFは変更しない。
- **検証状態**：7枚のユーザー提供スクリーンショットを原寸確認。Instagram専用checkは39 snapshots / 6 watches・未統合sidecar 0件でPASSし、reportでCitizenを含む6本の最新値と導線率を出力確認した。`check:quality`、Astro build（45 pages）、`git diff --check`もPASS。main実装commitを再取得し、remote / localのtree一致と対象5ファイルの内容一致を確認した。
- **関連**：main実装commit `bf89e964f6344c7d3c8b7fe5cecc2cb14a2783c5`。対象は `measurement/.internal/.virtual/social/instagram-published-copy.md`、`measurement/.internal/.virtual/social/instagram-insights-timeseries.md`、`measurement/.internal/.virtual/social/ROUTER.md`、`scripts/instagram-insights-timeseries.mjs`。
- **日時根拠**：作業ホストのJST時刻 `2026-10-01 08:33 JST`。スクリーンショット端末時刻は投稿画面・概要・指標が08:28、engagement continuation・audienceが08:29 JST。main実装commitのGitHub時刻は `2026-09-30T23:37:24Z → 2026-10-01 08:37 JST`。

### 2026-10-01 07:51 JST — Instagram Insightsを単一時系列へ直接追記し、自動差分集計を必須化

- **変更**：2026-09-30 22:10–22:14 JSTのWittnauer / CYMA / Pierce / Basis / Westclox確認値を `measurement/.internal/.virtual/social/instagram-insights-timeseries.md` へ統合した。Basisのユーザー指定公開時刻と、旧Westclox sidecarに残っていた08:49–08:50 / 11:52–11:53の確認値も正本へ回収した。今後は一時JSONから正本へ直接追記する `instagram:append`、重複・時系列逆転・未統合sidecarを検出する `check:instagram-insights`、時計別の前回差・時間当たり増加・view→profile→bio・follow / save率を出す `instagram:report` を標準経路とし、quality gateへ組み込む。
- **理由**：スクリーンショット値が個体別evidence / snapshotsへ一時退避され、正本統合待ちのまま増えると、翌日差分と時計横断比較を同じ経路で再現できず、欠落・二重登録・古い値の参照が起きるため。正本を1本に固定したまま、追記と集計だけを機械化する。
- **旧状態・棄却**：正本全置換を避けるために個体別sidecarや `snapshots/` へInstagram Reel Insightsをcommitし、後で人手統合する運用を棄却する。最新値だけで旧snapshotを上書きする方式、未確認値を0で埋める方式、生成レポートを第二の数値正本として保存する方式も採用しない。
- **影響範囲**：Instagram Reel Insightsの内部保存・検査・比較コマンド、Social Router、quality gate、2026-09-30観測値。公開サイト、WATCH本文、Instagram投稿、VA Analyticsの集計定義、account-level / VA2 snapshotは変更しない。
- **検証状態**：Instagram専用checkは38 snapshots / 5 watches・未統合sidecar 0件でPASS。時計別reportの前回差・時間当たり増加・導線率を出力確認済み。隔離fixtureで39件目を `instagram:append` し、再check / reportまでPASS。`git diff --check`、Astro build（45 pages）、quality gate（links / Analytics route / SEO / citations / source traceability / localization / SPEC / Japanese style / imagesを含む）もPASS。main反映後にremoteを再取得し、remote / localのtree一致、正本SHA-256一致、38 snapshots / 5 watches、未統合sidecar 0件を再確認した。
- **関連**：main commit `6bbe8745543c7c51f34f91c91250403780402c0c`。対象は `measurement/.internal/.virtual/social/instagram-insights-timeseries.md`、`measurement/.internal/.virtual/social/ROUTER.md`、`scripts/instagram-insights-timeseries.mjs`、`package.json`。統合元はcommit `15e87e86126428164a1584ec370a9a96ec8c833f` と `bed58d6bb5c4fbcd3a3bb2f06e35d060625109cf` を含むmain上の個体別snapshot / evidence。
- **日時根拠**：作業ホストのJST時刻 `2026-10-01 07:51 JST`。main commit `6bbe8745543c7c51f34f91c91250403780402c0c` はGitHub時刻 `2026-09-30T23:00:24Z → 2026-10-01 08:00 JST`。

## 2026-09-29

### 2026-09-29 13:45 JST — 外部照会を保留し、Cyma社史の1950 / 1956衝突を研究正本へ登録

- **変更**：外部機関への照会案を未送信の下流手段へ変更し、自己取得可能な公開資料を先に再監査した。現行Cyma公式 `CYMA STORY` がTime-O-VoxのChronomètre証明年を1956年と記す一方、MIH共有の後年Cyma社史 `D_7938.pdf` p.5は1950年と記すため、研究Ledgerの年代判断を `HOLD — 1950` から `CONFLICT — 1950 / 1956` へ変更した。1956年11月の同時代業界誌は製品の実在を支えるが、証明年の独立証拠には数えない。
- **理由**：公開資料だけで確認できるメーカー資料間の直接矛盾を検査せず、問い合わせ準備へ進む順序が不適切だったため。Mémoires d'Iciの `20.5 Brochure Cymavox 1` も公開目録までは確認できるが、本文画像はオンライン提供されていないことを確認した。
- **旧状態・棄却**：1950年説だけをメーカー由来の有力年代として保留する状態、および公開資料監査前にMIH / COSC / IGE-IPIへ照会する進行を棄却する。現行公式史の1956年も原証明書なしに確定年とはしない。
- **影響範囲**：`research/CYMA_TIME_O_VOX_R464_LEDGER.md` と `research/CYMA_1950_CERTIFICATE_AND_IPI_REQUEST_PACKET.md` の研究判断・送信状態のみ。公開WATCH本文、Chronomètreページ、観測個体データ、画像、音源は変更しない。
- **検証状態**：Cyma公式史、1956年11月業界誌、Mémoires d'Ici公開目録を再確認済み。調査費0円、外部照会未送信。文書差分・research traceability・decision-log・Astro buildを実行後にcommitする。
- **関連**：commits `2615b20de0614b516e0fb08ec8fb66be17ce7674`, `3039850801cbf43508e3fd45b8c8905f3e023e7c`。
- **日時根拠**：作業時刻 2026-09-29 13:45 JST。

### 2026-09-29 09:48 JST — 1950年Chronomètre説の転載系列を分離し、MIH・COSC・IPI照会準備を追加

- **変更**：`research/CYMA_TIME_O_VOX_R464_LEDGER.md`へ、Watch-Wikiの2007年版と2025年Sammler-Uhren記事を追加し、1950年Chronomètre certificate説のWeb上の反復を独立証拠として数えない判断を記録した。あわせて`research/CYMA_1950_CERTIFICATE_AND_IPI_REQUEST_PACKET.md`を新設し、MIHへの企業年表原典照会、COSCへの前身試験機関台帳の所在照会、IGE/IPIへの旧商標原簿・包袋の存在確認と見積もり依頼を送信可能なフランス語文面にした。
- **理由**：Watch-Wikiの出来事配列は2003年までを扱う後年のCyma企業年表`D_7938.pdf`と近く、Sammler-Uhrenは出典を`Watchwiki, AI`と明記するため、複数サイトでの掲載件数を1950年説の独立した補強にはできない。証明年と商標の用途を確定するには、企業年表の原典、前身試験機関の旧台帳、商標登録の原簿・包袋へ遡る必要がある。
- **旧状態・棄却**：`D_7938.pdf`、Watch-Wiki、Sammler-Uhrenを三つの独立資料とする扱いを棄却する。COSCが1950年証明を発行したとする表現、Swissregの0件を旧商標不存在の証明とする表現、見積もり前に有料調査・複製・認証抄本を発注する手順も採用しない。
- **影響範囲**：研究Ledger、外部照会用の研究文書、判断履歴のみ。公開WATCH本文、Chronomètreページ、観測個体データ、画像、音源、OWNER'S NOTEは変更しない。外部への送信、発注、支払いは実行していない。
- **検証状態**：Watch-Wikiの版履歴と2007-12-16版、Sammler-Uhren記事末尾の出典表記、COSC・MIH・IGE/IPIの公式案内と連絡先を照合済み。Markdown差分、source traceability、decision-log、Astro buildを実行する。
- **関連**：`research/CYMA_TIME_O_VOX_R464_LEDGER.md`、`research/CYMA_1950_CERTIFICATE_AND_IPI_REQUEST_PACKET.md`。各照会は所在確認と事前見積もりだけを依頼し、外国通貨で回答された費用は承認判断前に日本円換算する。
- **日時根拠**：作業ホストのJST時刻 `2026-09-29 09:48 JST`。

### 2026-09-29 09:08 JST — Time-O-Vox年代資料とR.464技術資料の衝突を研究Ledgerへ固定

- **変更**：`research/CYMA_TIME_O_VOX_R464_LEDGER.md`へ、後年のCyma社史資料が記す「1950年の金製Time-O-Vox Chronomètre証明」を`HOLD`として登録し、1956年11月の同時代製品記事を追加した。あわせてHumbertの「8–10秒・鳴動中リューズ非駆動」とHorlbeckの「6秒・鳴動中リューズ回転」を`CONFLICT`として記録し、Time-O-Vox以外のVOX商標について実製品・広告を確認できなかった探索結果を`OPEN`として追記した。
- **理由**：1950年証明記載は商標登録年と一致すれば製品史を大きく前倒しする可能性がある一方、証明書原本・試験番号・観測所名がなく、後年社史だけでは確定できないため。R.464の挙動も資料間で正反対だが、同時代技術記事と掲載個体の実測は現行WATCH本文を支えており、後年専門書だけで上書きすべきではないため。
- **旧状態・棄却**：後年社史の1950年記載を原証明記録と同格に扱う解釈、1956年製品記事を発売初年とみなす解釈、Horlbeckの記述だけで現行WATCH本文を誤りとする解釈、未発見のVOX名を未使用または幻の製品ラインと断定する解釈を採用しない。
- **影響範囲**：Cyma研究Ledgerと判断履歴のみ。公開WATCH本文、Chronomètreページ、観測個体データ、画像、音源、OWNER'S NOTEは変更しない。外部照会・発注・支払いも実行していない。
- **検証状態**：`D_7938.pdf` p.5、Horlbeck *The Alarm Wristwatch* pp.97–99、Humbertの1963年R.464技術記事、1956年11月 *Revue internationale de l'horlogerie* p.32を画像または原文で照合済み。Markdown差分・source traceability・decision-log検査を実行する。
- **関連**：最優先の次調査は、1950年証明記載の原資料とLa Chaux-de-Fonds側Bulletinの特定。R.464のリューズ挙動差は、複数個体の鳴動動画と文字盤側機構写真で変種差／資料誤りを判定する。
- **日時根拠**：作業ホストのJST時刻 `2026-09-29 09:08 JST`。

## 2026-09-28

### 2026-09-28 21:18 JST — Citizen掲載個体の内部写真をSPECとEN / DEへ同期

- **変更**：Pages CMSで更新されたCitizen Alarm掲載個体ギャラリー（ムーブメント `IMG_2476.jpeg`、裏蓋内面 `IMG_2477.jpeg` を含む現行5枚）を日本語正本として、SPECの石数を「17石（掲載個体で確認）」へ更新し、掲載個体ムーブメントの `CITIZEN / 17 JEWELS / 3 ADJ` 刻印を特記事項へ追加した。EN / DEのSPECとギャラリーも同じ証拠・画像順へ同期した。
- **理由**：従来の17石表記は同型資料に基づいていたが、今回の実機写真で掲載個体自身の `17 JEWELS` と `3 ADJ` 刻印を直接確認できるようになったため。公開多言語版を旧3枚・旧証拠レベルのまま残すとrevision driftになる。
- **旧状態・棄却**：日本語SPECの「17石（同型資料）※Cal.980には17石仕様も確認される」、EN / DEの同型資料ベース17石表記、EN / DEの3枚ギャラリーを旧状態とする。一方、写真には `980` のキャリバー刻印が見えないため、Cal欄の `Citizen 980（同型資料）` / EN / DE相当表記を掲載個体で直接確認済みへ格上げする案は採用しない。
- **影響範囲**：Citizen Alarm WATCHのJA SPEC、EN SPEC、DE SPEC、EN / DE掲載個体ギャラリー、localization fact-sync contract。OWNER'S NOTE原文、DEEP DIVE 01–04、HOW THEY RING、HISTORY、音源、他WATCHは変更しない。
- **検証状態**：branch上へ差分実装。localization sync / quality / build / liveはPR CIとmerge後のlive確認で別途判定する。現時点ではIMPLEMENTEDでありDEPLOYEDではない。
- **関連**：実装commit `c4acd35a`（JA SPEC）、`a6dab669`（EN SPEC）、`c85bb79e`（EN gallery）、`f4666e5b`（DE SPEC / gallery）、`67768fb7`（localization sync gate）、`0bf7d6be`（SPEC evidence gate）。対象: `src/content/watches/citizen-alarm.md`、`src/data/en-watch-entry.ts`、`src/data/en-watch-full-research.ts`、`src/data/de-watch-entry.ts`、`src/data/localization-fact-sync.json`。
- **日時根拠**：画像更新を含むmain commit `1cb4ec1b5a6f9433e6901c2bbff4a28a49499334` のGitHub時刻 `2026-09-28T12:18:04Z → 2026-09-28 21:18 JST`。


### 2026-09-28 18:26 JST — CYMAVOX・1948年法人再編・1950年以前のアラーム特許を研究Ledgerへ追加

- **変更**：`research/CYMA_TIME_O_VOX_R464_LEDGER.md`へ、1943年CYMAVOX商標と1963年更新・1983年抹消、1948年のCyma関連法人／商標再編、1944年`CH243633A`、1949年`CH293737A` / `CH290046A` / `CH285202A`、1954年`CH327800A`を追記した。1950年の独立した第7スイス商標として`TIM-O-VOX`を扱う解釈は棄却した。併せて、Mémoires d'Iciの16.20 / 20.5を日本から遠隔取得する依頼文・費用・手順・受領後検品を`research/CYMA_MEMOIRES_DICI_REQUEST_PACKET.md`として作成した。
- **理由**：一次公告と特許を横断すると、Tavannesのアラーム技術開発は1954年起点ではなく少なくとも1944年まで遡り、1949年には腕時計用音響構造の複数出願が存在するため。CYMAVOXと1950年VOX群の関係は強い調査仮説になった一方、法的名義と機構は同一ではなく、確定事実と仮説を分離する必要がある。
- **旧状態・棄却**：1954年Swiss priorityの公開済みCH番号が未特定だった状態を`CH327800A`の確認で更新する。Tavannes Watch Co.が1948年にCyma Watch Co.へ単純改称したという説明、CYMAVOXを原公告だけでアラーム商品名とする説明、1944年・1949年特許群をCal. R.464そのものとする説明、Mikroliskの`TIM-O-VOX`を第7の同日スイス商標とする説明は採用しない。
- **影響範囲**：研究Ledger、外部資料取得用の研究文書、判断履歴のみ。公開WATCH本文、Chronomètreページ、観測個体データ、画像、音源、OWNER'S NOTE、金銭・修理・私信・個人情報は変更しない。外部照会・発注・支払いは未実行。
- **検証状態**：1943 / 1948 / 1950 / 1963 / 1971 / 1984年のSHAB原公告、Google Patentsの該当特許書誌・本文、Mémoires d'Ici公式目録・料金・連絡先を照合済み。Astro build、source traceability、Markdown差分検査は通過。decision-log scriptは対象diffをdecision-bearing変更として検出しない現行挙動だったため、必須項目を手動照合した。
- **関連**：`research/CYMA_TIME_O_VOX_R464_LEDGER.md`、`research/CYMA_MEMOIRES_DICI_REQUEST_PACKET.md`。16.20 / 20.5の内容は未取得のため、CYMAVOXとアラーム製品の直接接続は`HOLD`を維持する。
- **日時根拠**：作業ホストのJST時刻 `2026-09-28 18:26 JST`。

### 2026-09-28 11:17 JST — SNS着地先を入口件数の降順で表示
- **変更**：Analytics Dashboardの「SNS → SITE ENTRY」で、全tracked pageを固定route順のまま並べる表示をやめ、選択期間のSNS入口件数 `total` が多い順に表示する。件数同率時は元のroute順を維持し、0件行も削除せず下側へ残す。
- **理由**：公開route / 多言語routeの増加により0件項目が上位を占め、実際にSNS流入がある着地先を探すための縦スクロールが増えていたため。利用目的は「どの着地先にSNS流入が出ているか」を即座に把握することなので、件数順が表示優先度と一致する。
- **旧状態・棄却**：TOP / OWNER'S NOTES / SOURCES / WATCH…の固定route順を維持する表示。0件行そのものを非表示にする案は、tracked route全体を確認できなくなるため採用しない。
- **影響範囲**：管理Analytics DashboardのSNS着地先表示順とregression testのみ。raw集計、`snsEntries.pages` のpayload順、件数、channel分類、VA2 / AI export、公開サイト本文には変更なし。
- **検証状態**：branch実装済み。生成Dashboard関数を直接実行するregressionで、3件→3件→1件→0件の降順と、source payload非破壊を確認する。PR CI通過後にVERIFIEDとする。main merge・本番deployは未実施。
- **関連**：implementation commit `40b11dcb` / regression commit `528312b2` / branch `fix/sns-entry-sort`。
- **日時根拠**：GitHub implementation commits `2026-09-28T02:17:28Z → 2026-09-28 11:17 JST` ～ `2026-09-28T02:17:32Z → 2026-09-28 11:17 JST`。

## 2026-09-27

### 2026-09-27 23:25 JST — Cyma / R.464 LedgerへE-Periodica一次資料を追補

- **変更**：`research/CYMA_TIME_O_VOX_R464_LEDGER.md` に、1950年 `TIME-O-VOX` 商標No.134604、1971年の非更新抹消、1945年Cyma卓上アラーム広告、1948年Georges BridevauxへのTavannes Watch C° S.A.の共同署名による代理権付与、1959年の別系統Bridevaux追加特許337149 / 337150、US2789410Aと同じSwiss priority日・機構を持つGB782720Aを追記した。
- **理由**：E-Periodica全文探索と特許横断確認で、既存Ledgerにない一次資料が見つかったため。商標史・在籍史・製品史として採用できる事実と、R.464への接続が未確定な特許候補を分離して固定する。
- **旧状態・棄却**：`TIME-O-VOX` の一次資料上の出願日・登録番号、BridevauxのTavannes在籍時期、GB公開が未記録だった状態を更新する。検索単位内で別広告が共起しただけの `chronomètre` / `observatoire` ヒットをCymaの直接証拠にする解釈、商標出願日を発売日と同一視する解釈、Swiss priority参照文字列をCH公開番号とみなす解釈は棄却する。
- **影響範囲**：研究Ledgerと判断履歴のみ。サイト表示・公開画像・個体データ・音源・金銭情報・修理情報・私信・個人情報への変更なし。
- **検証状態**：各E-Periodica PIDのOCR本文と高解像度IIIF画像を照合済み。US2789410A / GB782720Aの書誌・優先日・機構要約を照合済み。Markdown差分とdecision-log検査も実施済み。
- **関連**：US2789410A / GB782720AとCal. R.464の同一性は `HOLD` を維持。No.489の観測所記録、Chronomètre個体群、既存の公開WATCH本文と完成済みChronomètreページは変更しない。
- **日時根拠**：作業ホストのJST時刻 `2026-09-27 23:25 JST`。

## 2026-09-25

### 2026-09-25 12:15 JST — Westclox W5の音響SPECを裏蓋ピン式へ三言語同期
- **変更**：日本語正本 `裏蓋ピン式` を維持し、英語SPECの `Bottom-bell system` を `Caseback pin system`、ドイツ語SPECの `Bodenglocke` を `Stiftübertragung am Gehäuseboden` へ修正した。あわせて `localization-fact-sync.json` にJA / EN / DEのsource / rendered同期契約を追加し、旧英独表現が復活した場合はCIを失敗させる。
- **理由**：WestcloxのDeep DiveとHorlbeck記述は、わずかに膨らんだ裏蓋、中央リベット、内側の小ブリッジ、およびJunghans Minivox系と同様のピンから底部中央へ振動を伝える構造を示す。HOW THEY RING上もWestcloxはCASEBACK分類であり、英独SPECだけが一般的な底部ベル表現へずれていた。
- **旧状態・棄却**：EN `Bottom-bell system` / DE `Bodenglocke`。これらは裏蓋側でのピン伝達という日本語正本の粒度と一致せず、Basis / Lanco系のベル直接打撃と混同し得るため棄却。
- **影響範囲**：Westclox Watchlarm W5の英語・ドイツ語SPEC音響欄と多言語同期gateのみ。日本語正本、Deep Dive、HOW THEY RING、他WATCH、レイアウトは変更しない。
- **検証状態**：branch実装済み。PR CIでbuild / localization sync / quality / layoutを確認し、merge後はPages deploy・全artifact parity・live publication checkまで通してDEPLOYEDとする。
- **関連**：implementation commits `9d08a3e4`, `349ec4ea`, `4c4156b7`, `79c945a1` / branch `fix/westclox-acoustic-spec-sync`。初回実装で同じ旧ラベルを持つBasis側を誤置換したことをlocalization sync gateが検出したため、Basisを原状復帰し、Westcloxブロックだけを対象に修正した。さらにsource全体へのmustNotContainではBasisの正当なラベルまで禁止してしまうため、旧Westcloxラベルの禁止はWestclox専用のrendered routeへ限定した。
- **日時根拠**：GitHub implementation commit `2026-09-25T03:15:07Z → 2026-09-25 12:15 JST`。
## 2026-09-24

### 2026-09-24 23:01 JST — host移行を跨ぐAnalyticsへ単一siteTag filterを入れない
- **変更**：GraphQLのsite scopeは現行どおり `requestHost` を基準とし、現在のCloudflare Web Analytics siteTag 1個で全期間をfilterする案を採用しないことを計測仕様へ明記した。siteTagを将来利用する場合は、先にlive GraphQLでhost × siteTag × 期間の実分布を確認し、必要ならhost / 期間別に適用する。
- **理由**：Git履歴を実体確認すると、Cloudflare Web Analytics導入commit `c490f3f9` と管理者opt-out時点 `f397d398` はsiteTag `3f7f9454e132415ebf8ffa04122e16e3`、canonical host移行commit `0790f1f9` 以降は `862adb1fcab1439f899cccf093361ee9` を使用している。現在tagだけを全期間へ固定するとlegacy host側の過去データを欠落させ得る。
- **旧状態・棄却**：hostとbotだけの現行filterを「siteTag不足で精度が低い」とみなし、現在tagを全期間へ一律追加する案を棄却する。siteTagの実分布を確認せず旧・新tagを推測で期間分割することもしない。
- **影響範囲**：`measurement/metrics.md` のAnalytics query運用仕様のみ。Worker query、集計値、公開サイトのbeacon、旧・新hostのデータは変更しない。
- **検証状態**：Git履歴上の旧・新beacon tokenを実ファイルから確認済み。runtime変更はなし。PR CIで文書変更を含む既存quality gateを再確認し、main merge・本番deployは行わない。
- **関連**：Draft PR #118 / documentation commit `d1139df1` / historical commits `c490f3f9`, `f397d398`, `0790f1f9`。
- **日時根拠**：documentation commit `2026-09-24T14:01:23Z → 2026-09-24 23:01 JST`。実装commit時刻を見出し時刻に採用。

### 2026-09-24 22:57 JST — WATCH ENTRY SHAREを公開18routeへ同期
- **変更**：`WATCH ENTRY SHARE` の対象名を手書き固定配列から公開WATCH route map由来へ変更し、JP / EN / DE 各6本＝18routeを自動集計対象とする。言語gateway `/de/` 自体はWATCH entryから除外する。
- **理由**：既存配列はJP6・EN5・DE3に `German Entry` が混在する途中状態で、EN WittnauerとDE Basis / Citizen / Wittnauerが漏れていた。計測仕様では新規公開WATCHをshareへ反映する前提であり、公開状態と別運用のmeasurement target 5本を混同しない必要がある。
- **旧状態・棄却**：公開WATCH名をprofile wrapper内で都度手書き追加する方式、およびlanguage gatewayをWATCHとして数える状態を棄却する。measurement target 5本だけへWATCH ENTRY SHAREを絞る解釈も採用しない。
- **影響範囲**：管理Analytics Dashboardの `WATCH ENTRY SHARE` / profile wrapper / regression test / `measurement/metrics.md`。Cloudflare raw値、各WATCH公開状態、measurement target 5本の運用上の括りは変更しない。
- **検証状態**：branch実装済み。profile wrapper regressionとPR CIを再実行し、全check通過後にVERIFIEDとする。main merge・本番deployは未実施。
- **関連**：Draft PR #118 / commits `f2d7258b`, `86cb10ea`, `f441289e`。
- **日時根拠**：implementation commits `2026-09-24T13:56:31Z → 2026-09-24 22:56 JST` ～ `2026-09-24T13:57:21Z → 2026-09-24 22:57 JST`。最終実装commit時刻を見出し時刻に採用。

### 2026-09-24 22:54 JST — llms.txtへAI向けのサイト性格・証拠取扱いを明示
- **変更**：人向けABOUTページやメインナビを追加せず、`public/llms.txt` に独立運営であること、非販売・非鑑定・非メーカー公式アーカイブであること、OWNER'S NOTESが主に所有・観察個体を扱うこと、選択バイアス、証拠種別の分離、資料差の保持、n=1観察・測定・音源の一般化禁止、訂正の証拠レビュー方針を追記した。
- **理由**：サイト内部では研究ルール・多言語・音源・計測・CI・訂正受付が定義済みだが、AI / crawlerがサイト全体を解釈するときに「誰が・何の目的で・何をどこまで保証するか」を機械可読な入口で一括取得できなかったため。一般読者向けに運営者説明を前面化する必要はないと判断した。
- **旧状態・棄却**：人向けABOUTページを新設し、TOPや共通ナビから運営思想を説明する案は棄却。既存の公開UIは研究内容そのものを前面に置き、運営定義はllms.txt内だけに置く。
- **影響範囲**：`public/llms.txt` のみ。TOP / HISTORY / MILESTONES / OWNER'S NOTES / HOW THEY RING / SOURCES、共通ナビ、sitemap、公開HTML本文・デザインは変更しない。
- **検証状態**：branchでAstro build成功。PR CIのdecision-log gateで本台帳追記が必要と判明したため追加し、全Astro foundation checkを再実行して確認する。
- **関連**：implementation commit `1bf1697d` / branch `feat/llms-site-identity` / PR #120。
- **日時根拠**：GitHub implementation commit `2026-09-24T13:54:56Z → 2026-09-24 22:54 JST`。実装commit時刻を見出し時刻に採用。

### 2026-09-24 22:53 JST — Gemini referrerをOrganic Searchへ誤分類しない
- **変更**：referrer host分類で既知のAI Assistant host判定を汎用Search family判定より先に実行する。これにより `gemini.google.com` は `AI Assistant`、通常の `google.com` / `google.co.jp` 等は従来どおり `Organic Search` とする。分類関数をregression testから直接検証できるようexportし、計測仕様にも優先順位を明記した。
- **理由**：従来は `google.*` のOrganic Search判定がAI判定より先だったため、AI Assistant一覧へ `gemini.google.com` を登録していても到達不能で、Gemini流入がSearchへ吸収される実装順序バグになっていた。したがって旧classifierで得た `AI=0` はGemini流入の不存在まで証明しない。
- **旧状態・棄却**：Organic Searchを先に判定してからAI Assistantを判定する順序、および `gemini.google.com` をAI一覧へ追加しただけで分類済みとみなす状態を棄却する。referrer hostだけで分離できないGoogle検索面内のAI機能を推測でAIへ振り替えることもしない。
- **影響範囲**：Analytics Workerのreferrer channel分類 / regression test / `measurement/metrics.md`。Cloudflare raw計測値は変更しないが、deploy後に取得する期間集計ではGemini referrerが存在した場合にSearchからAIへ正しく再分類される。
- **検証状態**：branch実装済み。Analytics worker CIとAstro foundation CIを再実行し、全check通過後にVERIFIEDとする。main merge・本番deployは未実施。
- **関連**：Draft PR #118 / commits `1e958da2`, `86767209`, `0ba92698`。
- **日時根拠**：implementation commits `2026-09-24T13:53:05Z → 2026-09-24 22:53 JST` ～ `2026-09-24T13:53:11Z → 2026-09-24 22:53 JST`。最終実装commit時刻を見出し時刻に採用。

### 2026-09-24 22:47 JST — AnalyticsのVisits / Direct誤読防止と公開WATCH状態を分離
- **変更**：Cloudflare Web AnalyticsのVisitsをユニーク人数として扱わないこと、`Direct / Unknown` を直打ち・ブックマーク確定として扱わないことを計測仕様とAI exportへ明記。flowのno-referrer表示も `Direct` へ縮めず `Direct / Unknown` を維持する。同時にGitHub実体を再監査し、公開WATCHはWittnauer 10WAを含む6本、Analytics運用上の `measurement target` は別括りの5本として `PROJECT_STATE.md` を修正した。さらに、今後の公開route追加時にAnalytics表示名だけが追従漏れしないよう、Astro build後の `dist/sitemap.xml` 全公開URLをAnalyticsの統合route mapと突合し、未登録routeが1件でもあれば `check:quality` を失敗させるCI gateを追加した。
- **理由**：Cloudflare公式仕様ではVisitsは外部referrerまたはDirectから始まるPage viewを基準とする指標で、ユニークユーザー数ではない。またreferrerが利用できない入口はDirect系へ入り得るため、82 Direct等を「直打ち82人」のように読む根拠はない。さらに現行の6 WATCH sourceを再取得すると6本すべて `published: true` で、07:54の「公開済みWATCH 5ページ」という状態記述が実体と衝突していた。今回すでにTOP / SOURCES / 多言語routeで手動mappingの追従漏れが発生していたため、個別assertの追加だけではなく公開sitemapを正本にした自動検査が必要と判断した。
- **旧状態・棄却**：Visitsを人数の代理として読む、`Direct / Unknown` のsource表示だけを `Direct` に短縮する、公開状態とmeasurement target 5本を同一概念として扱う状態を棄却。07:54のWittnauer非公開扱いは現行仕様として失効させる。
- **影響範囲**：Analytics Workerの表示名 / AI export limitations / regression test / `measurement/metrics.md` / `PROJECT_STATE.md` / Analytics route map export / post-build quality gate。集計値・channel分類ロジック・WATCH本文・公開route・HOW THEY RINGは変更しない。
- **検証状態**：branch実装済み。生成HTML / AI export regressionとPR CIを再実行し、全check通過後にVERIFIEDとする。main merge・本番deployは未実施。
- **再検討条件**：Cloudflareのlive `rumPageloadEventsAdaptiveGroups` schema/settingsでconfidence fieldとdataset limitsを確認できた場合に、95% confidence intervalの追加を別変更として検討する。
- **関連**：Draft PR #118 / stale five-WATCH wording correction `321c36c1` / commits `a224c90a`, `df47342b`, `1491240e`, `ab4a607d`, `fe1902df`, `5569fd37`, `86d89a33`。
- **日時根拠**：semantic correction commits `2026-09-24T13:46:53Z → 2026-09-24 22:46 JST` ～ `2026-09-24T13:47:13Z → 2026-09-24 22:47 JST`、route mapping gate commits `2026-09-24T13:49:33Z → 2026-09-24 22:49 JST` ～ `2026-09-24T13:49:38Z → 2026-09-24 22:49 JST`。見出し時刻は計測意味の修正が確定した22:47 JSTを維持する。


### 2026-09-24 21:32 JST — localized routeの可視日本語漏れを生成HTMLで禁止
- **変更**：EN / DE OWNER'S NOTESの年代ラベルをlocalized WATCH specから取得し、HOW THEY RINGのキャリバー表示・録音ラベル・区切り記号もlocale別表示へ切替。さらに全EN / DE生成HTMLの可視テキストとuser-facing属性を走査し、言語切替「日本語」と明示許可した固有名を除く日本語文字・日本語式全角記号が残ればCIを失敗させる `check:localization-purity` を追加した。
- **理由**：翻訳本文自体が正しくても、`owners-directory.json` の `ownedEra`、日本語WATCH正本の `spec.caliber`、HOW THEY RING録音CMSの生ラベル、共通テンプレートの全角区切り記号が別経路でlocalized routeへ流入していた。具体的にWittnauerの「1950年代前半」、Citizenの「同型資料」「シチズンアラーム」、Basisの全角括弧が本番で確認された。
- **旧状態・棄却**：翻訳source内の日本語文字検索と、route存在・artifact parityだけで合格判定する方式。これは「正しいbuildが本番へ出た」ことは保証できても、そのbuild自体に言語混入がないことは保証しないため不十分として棄却。
- **影響範囲**：EN / DE OWNER'S NOTES、EN / DE HOW THEY RING、OwnerThumbnailFrameのaria-label、localized quality gate、翻訳運用ルール。日本語正本の本文・事実内容・レイアウトは変更しない。
- **検証状態**：branch実装済み。PR CIでbuild後の全EN / DE HTML purity、既存quality、回帰テスト、layoutを実行し、main merge後は既存の全artifact live parityで本番一致まで確認する。
- **関連**：implementation commits `e0857166`, `35d6c79c` / branch `fix/localized-visible-text-purity`。初回CIで独語OWNER'S NOTESのfull spec年代がnowrap表示を横溢れさせたため、一覧専用の短いlocalized年代ラベルを分離して修正。
- **日時根拠**：GitHub implementation commit `2026-09-24T12:32:33Z → 2026-09-24 21:32 JST`。実装commit時刻を見出し時刻に採用。


### 2026-09-24 20:16 JST — Analyticsのsampling・VA2・freshnessを監査可能な構造へ変更
- **変更**：期間全体のデータ品質をtotal queryの `sampleInterval` だけで判定する方式をやめ、pages / referrers / flows / entries / countries / devicesを含む各GraphQL groupのsampling状態を保持して最大値をqualityへ反映する。固定limitに達したgroupはcoverage不完全としてexportへ明示する。VA2は `pages` を全Page views/Visits、`entries` を入口Visits/Page viewsへ分離し、compact flowはcountry/device差を畳み込んでから上位20件へ切る。freshnessは「LAST EVENT」ではなく「LATEST NONZERO BUCKET」とし、gapは下限値として扱う。現行 `/s/v2/` relayもMarkdown/署名期限cacheのshort-linkとして扱う。追加監査で、比較不能なALL等は `compare=none;previous=NA` とし、trendの複合statusを途中切断しないよう修正。さらに公開route実体とAnalytics表示名を再突合し、TOP / SOURCES / 全公開EN・DE WATCH / EN・DE CYMA Chronomètre等の欠落マッピングを補完し、X→TOP着地がSNS集計の `other` に落ちないようにした。
- **理由**：2026-09-24の実測VA2（138 Visits / 148 Page views）を総数・channel・country・device・trend・page/flowまで相互突合した結果、主要総数は整合していた一方、(1) totalがunsampledでも別groupがsamplingされる可能性、(2) `pages` が実際はentryPagesで内部PVを表せない、(3) country/device次元を落としたcompact flowに同一source→pageが重複表示される、(4) current 7d bucketの開始/終了境界を最終イベント時刻のように読める、(5) v2 relayがv1と同じshort-link分岐へ入っていない、(6) ALLの `previous=0/0` が「比較対象なし」を0アクセスに見せる、(7) `PARTIAL / MIGRATION / SAMPLED / ESTIMATE` がVA2で途中切断される、(8) 実際にはX→TOPが10 VisitsあるのにTOPがSNS既知着地先に含まれず `other:10` へ落ちる、(9) 直近の多言語公開route追加にAnalytics表示名が追随していない、という誤読・分類漏れを確認したため。
- **旧状態・棄却**：period qualityをtotal queryだけで代表させる、VA2 `pages` を入口ページ表として兼用する、raw flow上位20行を次元省略のまま直列化する、aggregate bucket境界を「LAST EVENT / EVENT GAP」と表示する、`/s/v1/` だけをshort-link扱いする方式。比較不能期間を `0/0` で代用する方式、固定長tokenでtrend statusを切断する方式、公開route追加後も手動マッピングの欠落を放置して `UNMAPPED` / SNS `other` に流す状態も棄却する。
- **影響範囲**：管理Analytics Worker / AI export / VA2 fallback / AI relay / regression testsのみ。WATCH本文、公開route、measurement target 5本と公開WATCH 6本の区別、HOW THEY RING、Search Console importは変更しない。
- **検証状態**：branchへ実装済み。Draft PR #118でAnalytics worker / relay / Astro foundation CIを実行し、全check通過後にVERIFIEDとする。main merge・本番deployは未実施。
- **再検討条件**：Cloudflare Web Analyticsのlive GraphQL schema/settingsで `confidence` とdataset固有のmaxPageSize/maxDurationを安全に確認できた場合は、confidence intervalと動的limitを次段階として追加検討する。
- **関連**：branch `fix/analytics-audit-20260924` / Draft PR #118 / commits `f196f3db`, `d6c32cbf`, `d21a1a0d`, `fa88321b`, `209a22a7`, `dec77b23`, `27a52a9c`, `b9c5bf87`, `303f51c2`, `a215596d`, `424686fe`, `0e4c941a`, `9041c4f1`, `d8cd9bc6`, `23cd0aeb`, `1af7a6e7`, `22abc7b9`, `6c3598e6`, `7f3f91a1`, `348c9957`, `b669fa59`, `9101f7d4`, `0060db24`, `24e02fb7`, `c486d0c0`, `1c5a99b7`, `c2de33d7`, `8d14f3d3`, `307da36b`, `fc1d5209`, `ecafe6e0`, `e9adb17d`, `d7be6652`, `e0d20b6a`, `111df003`, `4c98d88e`, `15180f5a`, `56a25541`。
- **日時根拠**：最初の実装commit `f196f3db` のGitHub時刻 `2026-09-24T11:16:13Z → 2026-09-24 20:16 JST` を採用。


### 2026-09-24 15:03 JST — 多言語公開を全routeのbuild/live一致で保証
- **変更**：EN / DEの公開確認を代表ページ・一部WATCH・個別文字列だけに限定する方式を廃止。TOP / HISTORY / OWNER'S NOTES / HOW THEY RING / SOURCES / 公開中の全WATCH / CYMA Chronomètreをbuild・layout・semantic live検査の対象にし、さらにdeploy後はdist内の全生成HTMLとsitemap.xml / llms.txt / robots.txtをlive取得して完全一致を必須化した。未mergeだったCYMA Chronomètre独語校正も同じ変更セットへ取り込んだ。
- **理由**：GitHub上に修正文が存在していても、本番routeがその修正を読んでいるか、またはそのPRがmainへ入っているかを既存gateが全ページでは検証しておらず、旧翻訳が本番に残ったままdeploy成功扱いできたため。
- **旧状態・棄却**：EN / DEのlive検査をTOP / HISTORY / OWNER'S NOTES / HOW THEY RING中心に行い、ドイツ語WATCHのlayout対象を3本へ固定し、翻訳PRのGitHub上の存在を本番反映と混同し得る状態。個別ページごとに後追いでmarkerを足すだけの方式も、対象漏れを繰り返すため棄却する。
- **影響範囲**：多言語の検証・deploy gate、全公開EN / DE route、CYMA Chronomètre独語コピー。日本語正本の本文・レイアウト、SMARTWATCHの言語展開は変更しない。
- **検証状態**：branchへ実装済み。PR CIでbuild / quality / regression / build-output / 全route layoutを確認し、main merge後にPages deploy・全生成artifact parity・全公開多言語routeのsemantic live checkまで通った時点でDEPLOYEDとする。
- **関連**：commits `efc3e20c`, `036c6ca2` / branch `fix/full-localization-publication-parity` / open PR #114の独語Chronomètre校正を統合。後者はFULL RESEARCH判定がCSS内の未使用クラス名を誤検出したため、実際に描画される旧簡易版本文だけを検知するようgateを修正。
- **日時根拠**：GitHub implementation commit `2026-09-24T06:03:18Z → 2026-09-24 15:03 JST`。実装commit時刻を見出し時刻に採用。

### 2026-09-24 14:06 JST — 日時付き判断履歴を必須CI gate化
- **変更**：仕様・運用・公開・計測・UI・分類・文言の意味・公開状態・検証方針・棄却判断・再発防止策が変わるすべての判断について、同一branch / PR内で `CHANGE_DECISIONS.md` へのJST日時付き記録を必須化。AGENTS / PROJECT_STATEの完了条件へ組み込み、`scripts/check-decision-log.mjs` と `npm run check:decision-log` を追加し、`check:quality` の先頭で実行する。
- **理由**：2026-09-23の判断履歴監査で、判断自体はcommitされているのに日時台帳へ未記録の変更とUTC→JST換算ミスが複数見つかったため。「覚えて徹底」ではなく、記録漏れをCIで失敗させる必要がある。
- **旧状態・棄却**：エージェント規約に「日時付きで記録」と書くだけで、漏れを自動検出しない運用。人間／AIの注意力だけに依存する方式は棄却。typo・依存更新・意味を変えない整形だけは、理由をPR本文へ明示した場合に限り例外とする。
- **影響範囲**：`AGENTS.md`、`PROJECT_STATE.md`、`CHANGE_DECISIONS.md`、`package.json`、新規 `scripts/check-decision-log.mjs`。サイト本文・公開表示・既存WATCH / HOW THEY RING仕様は変更しない。
- **検証状態**：branch実装後、decision-log gate単体とAstro foundation checkで検証する。merge前にmerge-base以降のcommitと本entryの対応も再監査する。
- **関連**：branch `chore/enforce-decision-log` / commits `eb6f9bb6`, `e8500552`, `cbd800f6`, `5f44c420`, `63f79579` / 本PR。
- **日時根拠**：GitHub implementation commits `2026-09-24T05:04:57Z → 2026-09-24 14:04 JST`、`2026-09-24T05:05:06Z → 2026-09-24 14:05 JST`、`2026-09-24T05:06:08Z → 2026-09-24 14:06 JST`。最終実装commit時刻を見出し時刻に採用。


### 2026-09-24 07:54 JST — 共通メニューだけ「音で見る」へ変更
- **変更**：日本語の共通ハンバーガーメニュー内だけ `HOW THEY RING` → `音で見る` に変更。URL、ページ内の `HOW THEY RING` 表記、TOP入口名、主見出しは変更しない。
- **理由**：日本語メニュー内でこの項目だけ英字表記になっていたため、周囲の「歴史 / マイルストーン / オーナーズノート / 資料・出典」と表記体系を揃える。
- **旧状態・棄却**：共通メニューだけ `HOW THEY RING` のまま残す状態。
- **影響範囲**：`SectionMast.astro` の日本語メニュー1箇所のみ。build/live gateはその1箇所を回帰検査するため同期。
- **再検討条件**：共通メニュー全体の言語設計を変更する明示判断があった場合。
- **検証状態**：初回CIで生成HTMLのAstro属性を考慮しない厳密文字列gateが失敗。実装不良ではなく検査式の問題と確認し、属性を許容するHTML-safeな正規表現へ修正して再検証中。merge後mainを再取得して確認する。
- **関連**：このPR
### 2026-09-24 07:54 JST — Wittnauer 10WAの公開状態を明確化
- **変更**：公開済みWATCHの計測対象は Basis Alarm / Pierce Duofon / Cyma Time-O-Vox / Citizen Alarm / Westclox Watchlarm の5本だけと明記。Wittnauer 10WAは所有個体／HOW THEY RING側のデータには含まれるが、公開済みWATCH 5ページの計測対象には含めないことを `PROJECT_STATE.md` に追記。
- **理由**：所有個体データへの掲載と、公開済みWATCHとしての計測対象を混同しないため。
- **旧状態・棄却**：Wittnauerを6本目の公開済みWATCHとして扱う解釈。
- **影響範囲**：状態文書のみ。既存の `measurement/metrics.md` はすでに公開済みWATCH 5ページを同じ5本として定義しており、計測実装の変更は不要。
- **検証状態**：`PROJECT_STATE.md` と `measurement/metrics.md` を突合して整合確認済み。
- **再検討条件**：Wittnauer 10WAのWATCHページが正式公開され、計測対象へ追加する明示変更が行われた場合。
- **後続状態・失効**：2026-09-24 22:47 JSTの再監査で、Wittnauer 10WAを含む6本すべてが `published: true` の公開WATCHであることをGitHub実体から再確認した。以後は「公開WATCH 6本」と「measurement target 5本」を分離し、この07:54項目のWittnauer非公開扱いは現行仕様として使用しない。
- **関連**：このPR
## 2026-09-23 — 復元履歴

以下は、GitHub commit時刻と保存済み会話の時刻・判断内容を突合して復元した。commitだけで判断理由を確定できない箇所は、会話で確認できた範囲だけを記載する。

### 2026-09-23 11:35 JST — HOW THEY RING：最終的な2分類構造を実装
- **変更**：トップレベル分類を GONG / CASEBACK の2つに変更。CASEBACK内部の差はFIG.02–04の代表例として扱う構造へ。
- **理由**：大枠分類と詳細ケース分けを分離し、個体ごとにFIG.02/03/04まで細分類しないため。同じCASEBACKでも構造差が大きいことを図で見せる。
- **旧状態・棄却**：GONG / CASEBACK / BELL / PIN の4分類、およびGONG / CASEBACK / BELLの3分類をトップレベルとして使う案。
- **関連**：commit `33ce28c95e282e6dd8829f6f92b09ca2f6cd90fb`
- **日時根拠**：GitHub commit 2026-09-23 11:35:14 JST。判断内容は保存済み会話と突合済み。

### 2026-09-23 13:28 JST — TOPにHOW THEY RING入口を追加
- **変更**：OWNER'S NOTES直下にHOW THEY RING入口を配置し、TOP表示をCMSスイッチで管理。
- **理由**：独立した音・鳴らし方の入口としてTOPから到達可能にするため。
- **関連**：commits `84a478a7b7d731ffab655a41f3ec41175e7689c1`, `b6d1f80c9ea9402156cc7e529fa351f97420ad6c`
- **日時根拠**：GitHub commit 13:28 JST、保存済み会話の指示時刻 15:28 JSTも確認。実装時刻を採用。

### 2026-09-23 15:31 JST — Cricketの詳細呼称を「振動板型」に変更
- **変更**：FIG.02を「膜状バック型」から「振動板型」へ変更。
- **旧状態・棄却**：「膜状バック型」。
- **関連**：commit `ce1944042464c0b7e12e34cfee1a81efd82d175f`
- **日時根拠**：GitHub commit 2026-09-23 15:31:42 JST。

### 2026-09-23 14:03 JST — Pierce Duofonの二音源表示をWECKER / SIGNALへ確定
- **変更**：Duofonの2音源をCMS・表示へ復元し、表示ラベルを **WECKER / 音あり**、**SIGNAL / 音無し** に統一。
- **理由**：WAKER / SILENTはファイル名であり、表示用の正式ラベルではないため。
- **旧状態・棄却**：WAKER / SILENTの表示利用。
- **関連**：commits `9010693ed03b725d063aeaefde8f40038f85d4e0`, `c044ae67a2ca603fbb4bce4cd6c021c116d817e3`, `e169019beb3199ee319b415e522347ceb2293c15`
- **日時根拠**：GitHub commits 13:52–14:03 JST、保存済み会話の正式表示指示 13:46 JSTと突合。

### 2026-09-23 14:05 JST — HOW THEY RINGを本番公開
- **変更**：productionPublishedを有効化し、本番routeを公開。
- **関連**：commit `07ee720481e179b200115f867d4c7ce3c67899c6`
- **日時根拠**：GitHub commit 2026-09-23 14:05:25 JST。

### 2026-09-23 16:41 JST — ヒーローを「音で見る、アラーム腕時計。」へ再設計
- **変更**：主見出しを「音で見る、アラーム腕時計。」へ変更し、分類説明より「音を聴く」目的を前面に出した。旧selector guide/arrowsを撤去。
- **理由**：HOW THEY RINGの主目的を分類表ではなく、実機の音を入口に見る・聴く体験へ戻すため。
- **関連**：commits `b46bc3437906d9b36c908a977c8411852d06d9a3`, `b70c085f90cef666074f82d6ceafeaee12798656`, `97e597362e3dc040cf8284ffced4941829ea0094`
- **日時根拠**：GitHub commits 2026-09-23 16:41–16:42 JST、保存済み会話の現行見出し確認と突合。

### 2026-09-23 17:43 JST — GONG / CASEBACKにベル＋TAPの操作手掛かりを追加
- **変更**：両selector右上へ小さなベルアイコンとTAPを追加。
- **理由**：selectorが押せることを、ページの雰囲気を壊さず伝えるため。
- **旧状態・棄却**：矢印・chevronによる誘導。chevronは他UIの開閉意味と衝突するため使用しない。
- **関連**：commits `48b5f06ff602b10a2ce6d8f17f7b7d0ad4a47eb7`, `9b01059e329e21a4936c85c2da9d99023f5c7ae1`, `59e6790f8b12655080608e9b63986313adb56c2a`
- **日時根拠**：GitHub commits 2026-09-23 17:43–17:44 JST、保存済み会話・スクリーンショットと突合。

### 2026-09-23 17:45 JST — TOP文言を「実機の音を聴いて、鳴らし方を見る。」へ変更
- **変更**：HOW THEY RINGのTOP説明を、分類名の列挙から実機音を聴く体験中心へ変更。
- **理由**：HOW THEY RINGの役割をTOPでも一致させるため。
- **関連**：commit `35fc175482118f02524cd08a7464ed94d24e470e`
- **日時根拠**：GitHub commit 2026-09-23 17:45:19 JST。

## 2026-09-22 — 復元履歴

### 2026-09-22 23:55 JST — 4分類構造を一度実装
- **変更**：GONG / CASEBACK / BELL / PIN の4分類を実装。
- **後続判断**：翌23日に、PIN等は大枠ではなくCASEBACK内部の詳細差として扱う方針へ変更され、この4分類は失効。
- **関連**：commit `78f1cecbae563cc827958aad5ff782fa2ad2e126`
- **日時根拠**：GitHub commit 2026-09-22 23:55:56 JST。

## 2026-09-21 — 復元履歴

### 2026-09-21 17:47 JST — PINを大分類から外し3分類へ
- **変更**：PINをCMS/schemaの大分類から除外し、GONG / CASEBACK / BELL の3分類へ整理。WestcloxをCASEBACKへ移動。
- **理由**：PINは独立した大分類ではなく打撃・伝達方法の詳細として扱う判断。
- **関連**：commits `3b79b41ba7c86b970dea43ec0a73bae4f3362569`, `7fa3f34e200c6ab37bbc4515e30f5d5cb05480c1`, `cea4541f72e49000ed70a194c39ceb33b5c268fb`, `0736cb88974315ddb8a0db54d2bb37191ac76c39`, `0e46aac970d0060bffedfce88ca18c154ed887e4`
- **日時根拠**：GitHub commits 2026-09-21 17:47 JST。後日の保存済み会話にも「PINは打撃方法の詳細」とする判断が残る。

### 2026-09-21 22:34 JST — TOP入口と本番公開を別スイッチ化
- **変更**：HOW THEY RINGのproduction公開とTOP入口表示を別々に制御。TOP入口はOWNER'S NOTES後。
- **理由**：ページ自体の公開状態とTOPからの露出を独立して管理するため。
- **関連**：commit `35647cc534c7590b121dbdb1c1bbff342f4a6740`
- **日時根拠**：GitHub commit 2026-09-21 22:34:39 JST。

## 2026-09-20 — 復元履歴

### 2026-09-20 11:41 JST — HOW THEY RINGを独立CMSコレクション化
- **変更**：HOW THEY RINGの6個体設定をWATCH本体から分離し、専用CMSコレクションへ移行。category / thumbnail / publication / audioを独立管理。
- **理由**：WATCH本文と音ギャラリー編集を分離し、各項目をCMSから管理可能にするため。
- **関連**：commits `24e80ad32274dcff1498c7d40420cc5194cfc5cd`, `e373d0b2f2a62cffaa86f06c9324f4fbfcd2db9b`
- **日時根拠**：GitHub commits 2026-09-20 11:22–11:41 JST。保存済み会話のCMS本番公開/非公開切替要求と突合。

### 2026-09-20 16:36 JST — 本番routeをCMS release gate化
- **変更**：HOW THEY RINGのproduction route、release toggle、sitemap、SEO metadataをCMSの公開状態に連動。
- **理由**：テスト面と本番公開を分離し、公開/非公開をCMSで制御するため。
- **関連**：commits `0309563e27fe2b98e502ab77f93afc210b0ea9f7`, `901fa6e01ba7dacbf42d7377505223126cc0adfe`, `ae683c9028e5679493dcc8d43a30afd3b97c276f`, `54a6fe9c9dce8e2cf0414ffe43e7522538eb0c6e`, `bc0c9ea171397fdb781966d979547c88d73efa1d`
- **日時根拠**：GitHub commits 2026-09-20 16:36–16:39 JST。

## 2026-09-19 — 復元履歴

### 2026-09-19 10:26 JST — HOW THEY RING prototypeを再構築
- **変更**：生成した機構アートに依存しないprototypeへ再構築。
- **関連**：commit `6d43d6f2be45c7fab76bcdabaa772a8239a91288`
- **日時根拠**：GitHub commit 2026-09-19 10:26:17 JST。

### 2026-09-19 16:41 JST — 機構図を含むレイアウトを確定
- **変更**：HOW THEY RINGの機構図を含むレイアウトとpreview checkを更新。
- **関連**：commits `f5d6ab709055f18d75a6c7ae5c6e988aff3e3bf7`, `cecd731a659157c8bbae43adefb9de5af1ebda15`
- **日時根拠**：GitHub commits 2026-09-19 16:41–16:42 JST。

---

## 2026-09-23

### 2026-09-23 19:01 JST — GitHub運用：現在状態と変更履歴を分離
- **変更**：`CHANGE_DECISIONS.md` を新設し、仕様・判断・方針・棄却候補の変更をJST日時付きで追跡する運用へ変更。PROJECT_STATE / AGENTSの完了条件・起動ルーティングにも組み込んだ。
- **理由**：「今どうなっているか」だけでなく「いつ・何を・なぜ変えたか」をGitHubだけで追跡可能にし、会話履歴への依存と旧仕様復活を減らすため。
- **旧状態・棄却**：PROJECT_STATEへ現在仕様と一部の理由を集約するだけの運用。時系列の判断履歴としては不足するため廃止。
- **影響範囲**：GitHub作業運用・PROJECT_STATE・AGENTS。サイト表示変更なし。
- **検証状態**：PR #91をmainへmerge後、`CHANGE_DECISIONS.md` / `PROJECT_STATE.md` / `AGENTS.md` をmainから再取得し、相互参照を確認済み。
- **関連**：PR #91 / commit `51b60433dc6b40fdded3d9d9aec770b373f67107`

### 2026-09-23 18:55 JST — HOW THEY RING：2分類の判断理由を履歴化
- **変更**：GONG / CASEBACK の2分類を採用した理由、FIG.02–04をCASEBACK内部の代表例とする設計、個体カードへ詳細分類を持ち込まない方針を `PROJECT_STATE.md` に明文化。
- **理由**：現行仕様だけでなく、なぜその仕様になったか・何を棄却したかをGitHubから復元できるようにするため。
- **旧状態・棄却**：GONG / CASEBACK / BELL / PIN の4分類。大分類とCASEBACK内部構造が同階層に混在し、分類粒度が揃わないため棄却。
- **再検討条件**：新しい一次資料で大枠そのものを変更すべき根拠が出た場合、またはユーザーが明示的に仕様変更した場合。
- **影響範囲**：文書のみ。サイト表示変更なし。
- **検証状態**：main再取得で記載確認済み。
- **関連**：PR #90 / commit `8d1de10cb418db4734005b751c89de8a88158921`

### 2026-09-23 18:22 JST — HOW THEY RING：機構図の根拠表示を追加
- **変更**：FIG.01–04に、折りたたみ式の「機構図の根拠・資料を見る」を追加。各FIGは確定的な1出典だけを表示。
- **出典方針**：原則 `The Alarm Wristwatch` / `ALARM AM ARM` を優先し、2冊で直接支えられない場合のみ外部資料1件を採用。補助資料は内部検証用で閲覧者へ列挙しない。
- **理由**：HOW THEY RINGの「音を見て・聴く」軽さを壊さず、図の根拠には辿れるようにするため。
- **影響範囲**：HOW THEY RING、build/live gate、layout検査、PROJECT_STATE。
- **検証状態**：PR側でbuild・quality gate通過を確認後mainへmerge。live反映はこの記録時点では未記録。
- **関連**：PR #89 / commit `b262c3b97c4b7f95034a7d766bacb8f511d5272e`

> 注：上記時刻はこの運用導入時点で会話・PRの時系列から確定できる範囲を記載。今後は変更時にJST時刻を同時記録する。


## 2026-09-24｜EN / DE TOPとHOW THEY RINGを正式な言語別入口へ拡張

- **変更**：`/en/` と `/de/` を、日本語TOPと同じVINTAGE ALARMのカバー＋CONTENTS構造を持つローカライズTOPへ変更。既存の言語別WATCH一覧は同ページ下部のOWNER'S NOTESとして保持。
- **変更**：`/en/how-they-ring/` と `/de/how-they-ring/` を追加し、日本語HOW THEY RINGのGONG / CASEBACK 2分類、FIG.01–04、実機音、録音条件、資料注記を同じ構造でローカライズ。
- **理由**：HISTORY / WATCHだけ多言語化され、TOPと音の入口が日本語専用のままでは言語導線が途中で切れていたため。
- **維持**：日本語正本の分類、図、実機順、音源、事実確度は変更しない。日本語共通ハンバーガーメニューの「音で見る」ラベルも維持する。各言語に存在しないWATCH詳細は日本語WATCHへフォールバックする。
- **付随**：sitemap / llms.txt / hreflang / SectionMast / Analytics path mapping / build・live gateを3言語へ同期。
- **旧状態・失効**：`/en/`・`/de/` がWATCH一覧だけの入口、HOW THEY RINGは日本語URLのみ、という中間状態。
- **検証状態**：実装後のbuild / live gateで確認する。


## 2026-09-24｜EN / DE TOPのOWNER'S NOTES画像一覧を専用ページへ分離

- **確認した問題**：直前の多言語TOP実装で、`/en/` と `/de/` にだけ画像付きOWNER'S NOTES一覧をTOP本文の下へ追加していた。日本語TOP `/` にはこの一覧がなく、3言語でTOP構造が不一致だった。
- **原因**：従来のEN/DE入口が持っていたWATCH一覧を、TOP化の際に「機能を残す」目的で同じページ下部へ埋め込んだため。TOPとOWNER'S NOTES一覧という別階層を混同した。
- **修正**：EN/DE TOPから画像付き一覧を撤去し、日本語TOPと同じ入口構造だけに統一。画像付き一覧は `/en/owners-notes/` と `/de/owners-notes/` へ分離した。
- **維持**：言語別WATCHへの導線は失わず、TOPのOWNER'S NOTESから各言語の専用一覧へ進む。HOW THEY RING、WATCH本文、日本語TOPは変更しない。
- **再発防止**：build / live / mobile gateでEN/DE TOPに `owner-frame` / `localized-directory` が混入していないことと、専用OWNER'S NOTESページに画像カードが存在することを別々に検査する。


## 2026-09-24 — Analytics「期間比較」の表示を日本語化

### 2026-09-24 14:51 JST — BUCKET COMPARISONの英語表示を日本語へ統一
- **変更**：Analytics dashboard の期間比較テーブルで、見出し・状態表示・サンプル間隔表示を日本語化。PARTIAL / SHORT / MIGRATION / SAMPLED / ESTIMATE / UNSAMPLED の内部値は維持し、画面上だけ「集計途中 / 短期間 / 移行期間 / サンプル集計 / 推定値 / サンプリングなし」と表示する。列名は「期間 / データ状態 / PV / 訪問数 / X / 検索 / 直接・参照元不明 / 内部PV / 訪問数差」とする。
- **理由**：管理画面の期間比較だけ英語表記が残り、他の日本語UIと読解負荷が揃っていなかったため。
- **旧状態・棄却**：BUCKET COMPARISON / PERIOD / QUALITY / VISITS / SEARCH / DIRECT / INTERNAL PV / Δ VISITS と、生の PARTIAL / UNSAMPLED 等を画面へそのまま表示する状態を廃止。内部statusコード自体は互換性維持のため変更しない。
- **影響範囲**：Cloudflare Analytics dashboard の期間比較表示と、その生成HTML検査のみ。集計ロジック、comparable判定、AI export / VA2、生データ、レイアウトは変更しない。
- **検証状態**：生成HTML検査で日本語表示、状態ラベル、サンプル間隔、旧 BUCKET COMPARISON 見出しの不在を検査する。PR CIで最終確認する。
- **関連**：commits `7f096bb0c4352e7098c8d4e031411d7f0aff3973`, `efb8016fdb9b83bd2e2227475aaff421d2e2c185`
- **日時根拠**：GitHub commit 2026-09-24T05:51:10Z → 2026-09-24 14:51 JST、2026-09-24T05:51:13Z → 2026-09-24 14:51 JST。


## 2026-09-25 — X Link ClickとRUM Entryの欠落層を診断する

### 2026-09-25 08:07 JST — Early Arrival ProbeでX click→RUM欠落層を分離
- **変更**：canonical siteの`SeoHead.astro`で、Cloudflare Web Analytics RUM scriptを読み込む前に診断専用early arrival probeを送る。受信はAnalytics Workerの`/api/arrival-probe`、保存はWorkers Analytics Engine dataset `va_arrival_probe_v1`。Analytics API / signed AI exportには`arrivalProbe`を別レイヤーで付加し、VA2には`probe` / `probeRows`として出す。
- **理由**：Wittnauer Cal.10WA投稿でX Post AnalyticsのLink Click 3に対し、current unsampled期間のCloudflare RUMではX→Wittnauer Entry 1しか観測されず、VA2内部のsampling・truncation・Direct誤分類・算術不整合では説明できなかったため。click→HTMLとHTML→RUMを分離して原因層を特定する必要がある。
- **旧状態・棄却**：Cloudflare RUM Entryだけで「Xからサイトへ到達した件数」を診断する状態を棄却。ただし既存Visits定義や成果KPIは変更せず、probeをVisitsへ混ぜない。X Link ClickとRUM Entryを1対1同義とも扱わない。
- **影響範囲**：`src/components/SeoHead.astro`、Analytics Worker entry、Wrangler Analytics Engine binding、AI export/VA2診断フィールド、build/live/deploy gate、`measurement/metrics.md`、監査ログ。WATCH本文、公開文言、既存Cloudflare Visits、Direct / Unknown分類、rabbit-hole戦略は変更しない。
- **検証状態**：Analytics Worker CIでprobe POST/HEAD/origin拒否、SQL集計、VA2出力を検査。Astro buildで公開HTMLへのprobe埋込を検査し、main反映後はWorker binding HEAD health checkとlive HTML gateで別途DEPLOYEDを確認する。新しい外部流入が発生するまでcapture-gapの原因判定はOBSERVEDにしない。
- **関連**：PR #121、commits `2dc33b0dfbfa8f3bf62096e7bbf9f2554e562460`, `f2cd519fec3cecb4523b33c56f2998236e2a47fd`, `84823475047555f00b73181b3ba5da885db2a986`, `262c1ec25a95e2ed602e0868361772c3365eee5e`, `061f5a27dc6d428b6c7e7d561247fb7b286b62ec`, `27c0ccab191bfeaccc9e4bc35544695276bf9104`, `1fc8bd2c41cab9ba2e637e4b39f7cd25f50d4812`, `80007956227a707d56d7883030be7f9135848ebf`, `6772427a0654c5afb2f27fc0229c067ebbb31f96`, `601d8db5bead5377763c711d9036c7ca72ae349b`, `2bc3e9b40fd315ba5cc87da6b01eb09b26a530a2`, `cfed508ec5699640f5c3feeebd41208aafd2c671`, `e82404eb16a521180686f41d21fc3413623563fb`, `5bfdea5119932b077dd0403d955d54f1b659a178`
- **日時根拠**：GitHub commit `2dc33b0dfbfa8f3bf62096e7bbf9f2554e562460` の 2026-09-24T23:07:14Z → 2026-09-25 08:07 JST。後続実装commitは同日 2026-09-24T23:15:55Z → 2026-09-25 08:15 JST まで。
- **merge / deploy記録**：PR #121 merge commit `bc85a2ea02e6a0093b576fc8365ae4a530b91190` は 2026-09-24T23:19:09Z → 2026-09-25 08:19 JST。Deploy Analytics Worker run `36072117353` は 2026-09-24T23:19:12Z → 08:19 JST開始、2026-09-24T23:19:33Z → 08:19 JST終了でfailure。AI Readable Relay run `36072117307` は 2026-09-24T23:20:02Z → 08:20 JSTでsuccess、GitHub Pages run `36072117348` は 2026-09-24T23:22:37Z → 08:22 JSTでsuccess。


## 2026-09-25 — Arrival Probe保存先をDurable Objectへ変更

### 2026-09-25 08:22 JST — Analytics Engine未有効によるdeploy失敗を受けてSQLite-backed Durable Objectへ切替
- **変更**：early arrival probeの保存先をWorkers Analytics Engine datasetから、同一Analytics Worker内のSQLite-backed Durable Object `ArrivalProbeStore`へ変更する。browser側probe payload、`/api/arrival-probe`、通常Visitsとの分離、AI export / VA2の`probe` / `probeRows`、判定方法は維持する。
- **理由**：PR #121 merge後のDeploy Analytics Worker run `36072117353` で、Wrangler upload時にCloudflare APIが `code: 10089`（Analytics Engineを有効化する必要がある）を返し、本番Worker更新が失敗した。診断SPIKEのためだけにユーザーへCloudflare Dashboardでの機能有効化を要求せず、Cloudflare公式でFree / Paid双方に提供され新規SQLite backendが推奨されるDurable Objectsへ保存層だけ差し替える。
- **旧状態・棄却**：`[[analytics_engine_datasets]] ARRIVAL_PROBE = va_arrival_probe_v1` とAnalytics Engine SQL APIによるqueryを棄却。X Link Click→HTML→RUMを分離する診断目的自体は維持する。
- **影響範囲**：`cloudflare/analytics-dashboard/entry-worker.js`、`wrangler.toml`、entry-worker tests、`measurement/metrics.md`、capture-gap監査記録。公開WATCH本文、probe送信JS、通常Cloudflare Web Analytics、AI relay表示形式、既存KPIは変更しない。
- **検証状態**：branch CIでentry-worker / build / decision-logを再検証後、main mergeでAnalytics Workerを再deployする。deploy workflowの`HEAD /api/arrival-probe`が204になることをbinding/storageのlive gateとし、GitHub Pages上のprobe scriptと合わせてDEPLOYED判定する。新しい外部流入が発生するまで原因判定はOBSERVEDとしない。
- **関連**：PR #121（初回SPIKE）、Deploy Analytics Worker run `36072117353`、commits `73450fbea8a1c9f6a1ffe3bac03c7c6a359e2407`, `1c6ae3f8014f32b3fbf418109be8c3425fed6dd2`, `a2170a873d32ff3ad2266940cb30e571440ab9a6`, `25be4b4dd32f1f6a7af17d574b3d9b138f5eb8b6`, `95cc44d7fd7e00af1246b62b7cfb7e8928a1579a`
- **日時根拠**：GitHub commit `73450fbea8a1c9f6a1ffe3bac03c7c6a359e2407` の 2026-09-24T23:22:33Z → 2026-09-25 08:22 JST。後続commitは 2026-09-24T23:24:00Z → 2026-09-25 08:24 JST まで。
- **merge / deploy記録**：PR #122 merge commit `d246659137ff0868dcef2af4494c2fb7717dcf17` は 2026-09-24T23:27:35Z → 2026-09-25 08:27 JST。Deploy Analytics Worker run `36072829559` は 2026-09-24T23:27:38Z → 08:27 JST開始、2026-09-24T23:27:57Z → 08:27 JST終了でsuccess。GitHub Pages run `36072829766` は 2026-09-24T23:27:39Z → 08:27 JST開始、2026-09-24T23:30:32Z → 08:30 JST終了でsuccess。


## 2026-09-25 — 外部営業可能性監査

### 2026-09-25 14:43 JST — 外部営業可能性監査で公開blockerを修正
- **変更**：外部データベース・編集媒体へcanonical deep URLを直接渡す前提でサイト全体を監査し、公開品質を損なう2件を修正した。HOW THEY RING FIG.01は「輪状の音バネ / ring-shaped sound spring / ringförmige Tonfeder」、FIG.03はJunghans J89の「ピン伝達 / pin-transmission / Stiftübertragung」へ戻し、J89の発音経路を `hammer → pin → bottom bell` とJA / EN / DEで同期した。さらにDE WATCHの関連導線が英語routeへ脱線していた3件をDE routeへ戻し、German footerの固定 `NÄCHSTE OWNER'S NOTE · EN` を実際のrelated hreflang連動へ変更した。build / live / localization fact-syncに回帰拒否を追加し、監査結果を `strategy/discovery/external-reference/outreach-readiness-audit-2026-09-25.md` に記録した。
- **理由**：HOW THEY RINGのFIG.01 / FIG.03は2026-09-24の旧PR #110で現行事実が確定していたが、そのPRがmainから大きくdivergeしたまま未mergeとなり、mainに旧文言が残っていた。DE側ではWittnauer / Pierce / Westcloxの関連導線がENへ飛び、全DE WATCHで次ページ言語ラベルがEN固定だった。外部営業では最初に渡す1～2ページの明白な事実・言語不整合が信頼を直接損なうため、営業開始前のhard blockerと判断した。
- **旧状態・棄却**：FIG.01「棒状 / rod-shaped / stabförmig」、FIG.03「ピン／レバー / pin / lever / Stift-/Hebelübertragung」、量産J89を単に「底部ベルを発音体とする」とだけ書く状態、DE WATCHからEN WATCHへrelated navigationする状態、German footerで次ページを常にENと表示する状態を棄却する。旧PR #110をそのままmergeする案、およびmain更新後にdivergeしたPR #125を強引にmergeする案も棄却し、current main `2f0e34ba276e7d050503fc6e804f0f9964af5476` からfresh branchへ必要差分だけ再適用した。
- **影響範囲**：HOW THEY RINGのJA / EN / DE機構文言、DE WATCH related navigation、German footer label、build / live regression gate、`src/data/localization-fact-sync.json`、外部営業readiness監査文書。GONG / CASEBACKの2分類、各WATCH本文・SOURCES、音源、Analytics、TOP構造、既存rabbit-hole戦略は変更しない。
- **検証状態**：fresh current-main branch上で実装済み。Astro foundation CIを全通過させた後にVERIFIED、main merge後にGitHub Pages deploy・live artifact parity・live semantic gateが通った時点でDEPLOYED / OBSERVEDとする。blocker deploy後はCyma R.464を起点にしたtarget-specific one-to-one outreachを開始可能とし、一斉営業は検索面・source traceability・reuse policy等を別途整えるまで保留する。
- **関連**：commits `900e88e3ea1f9749d96954f85b6a0f85a474d3ea`, `ed32536dbb945afc0fb6892297fc2fb371b4d466`, `454936db68be6e916ad3ea819b2f44b737673c11`, `9fc5371a9713fa776dc8632ee97d7a7611e27377`, `d49dca7dcde07a803c6a80bdd63bb7b7fe4d5f4f`, `5befd04cabfd91a881a023478e905710634a9566`, `6f38d81f4c14b8231db970e502a8ae4fdf5bec28`, `dfc0eb0904a109f7a7378a1ae7b61cc45c32401c`, `43d845ca4abb74086fd531eed35f12d8ee55bd62`, `ee510e1cc558449de7a516c5387a4a7b39730176`。旧PR #110 / #125は現行mainへ直接mergeしない。
- **日時根拠**：GitHub implementation commit `900e88e3ea1f9749d96954f85b6a0f85a474d3ea` の 2026-09-25T05:41:57Z → 2026-09-25 14:41 JST。後続audit sync commit `dfc0eb0904a109f7a7378a1ae7b61cc45c32401c` は 2026-09-25T05:43:21Z → 2026-09-25 14:43 JST。CIでrendered-text parserがhref属性を検査できないことを確認し、URL検査をsource + markup-aware build/live gateへ分離した最終修正 `ee510e1cc558449de7a516c5387a4a7b39730176` は 2026-09-25T05:46:46Z → 2026-09-25 14:46 JST。


### 2026-09-25 20:11 JST — 公開HOW THEY RINGのlive gateを現行文言へ同期
- **変更**：PR #126でHOW THEY RINGのFIG.01 / FIG.03現行文言を本番へ反映した後も、`scripts/check-live-site.mjs` の代表markerが旧「棒状 / rod-shaped / stabförmig」文言を期待していたため、live gateを現行「輪状 / ring-shaped / ringförmig」へ同期し、旧JA文言をstale禁止へ追加した。
- **理由**：PR #126のDeploy GitHub Pages run `36100224068` はPages deployと49 artifact parityまで成功し、本番artifact自体は正しかった。一方、最後のsemantic live checkだけが旧markerを要求してfailureになった。公開不良ではなく検査側の旧仕様残存であり、これを放置すると正しい本番をfailure扱いし続けるため。
- **旧状態・棄却**：本番が旧「棒状 / rod-shaped / stabförmig」を含むことを正常条件とするlive gateを棄却。deploy successだけを見てsemantic check failureを無視する運用も棄却する。
- **影響範囲**：`scripts/check-live-site.mjs` のHOW THEY RING live marker / stale markerのみ。公開本文・HOW THEY RING分類・WATCH本文・Analyticsは変更しない。
- **検証状態**：branchでCIを通過後、mainへmergeしてPages deployを再実行し、live artifact parityとsemantic live checkの両方がsuccessになった時点でVERIFIED / DEPLOYEDとする。
- **関連**：PR #126 merge commit `8e460187f2fe7c959e26e03051000cbdac740cb2`、Deploy run `36100224068`、fix commit `24a219b8174989f7aa2b9b64f015263c67703063`。
- **日時根拠**：PR #126 merge commitは 2026-09-25T05:50:01Z → 2026-09-25 14:50 JST。live gate修正commitは 2026-09-25T11:11:59Z → 2026-09-25 20:11 JST。
- **merge / deploy記録**：PR #128 merge commit `c7b447e80155605bf862ab0a8142dd34ba8cf217` は 2026-09-25T11:15:40Z → 2026-09-25 20:15 JST。Deploy GitHub Pages run `36128422567` は 2026-09-25T11:15:43Z → 20:15 JST開始、2026-09-25T11:18:34Z → 20:18 JST終了でsuccess。build / quality / mobile layout / Pages deploy / 49-file live artifact parity / live publication stateの全stepがsuccess。


## 2026-09-28 — Wittnauer 10WA ギャラリー多言語同期

### 2026-09-28 14:32 JST — Wittnauer掲載個体ギャラリーをEN / DEへ同期
- **変更**：日本語正本のWittnauer 10WA掲載個体ギャラリー更新に合わせ、英語・ドイツ語版のギャラリー画像・順序・ラベル・altを差分同期した。更新された画像は `IMG_2292.jpeg`（純正リューズ）、`IMG_2295.jpeg`（裏蓋内側）で、新たに `IMG_2293.jpeg`（9時側側面、2階建構造が見える）を6枚目として追加した。英語は `9 o’clock side view — the two-tier construction is clearly visible`、ドイツ語は `Seitenansicht bei 9 Uhr — der zweistöckige Aufbau ist deutlich zu erkennen` とし、日本語正本の意味を保ちながら各言語として自然な表現にした。
- **理由**：2026-09-28のPages CMS更新で日本語WATCHだけギャラリーが先行更新され、EN / DEには旧画像 `IMG_7643.jpeg` / `IMG_5755.jpeg` と5枚構成が残っていたため。多言語版は日本語WATCHを意味上の正本とする現行方針に従い、ギャラリーも同期する。
- **旧状態・棄却**：EN / DEが旧5枚構成のまま、日本語だけ6枚構成・新画像になる状態を棄却。翻訳時に別セクションの説明を足したり、2階建という観察を機構解説へ膨らませたりはしない。
- **影響範囲**：`src/data/en-watch-full-research.ts`、`src/data/de-watch-entry.ts` のWittnauer `specimenGallery`、および `src/data/localization-fact-sync.json` の回帰検査のみ。日本語正本、OWNER'S NOTE、SPEC、DEEP DIVE、SOURCES、レイアウトは変更しない。
- **検証状態**：branch上で実装済み。localization fact-syncへJA / EN / DEの画像・ラベル一致と旧画像残存禁止を追加。PR CIでbuild / localization sync / purity / publication output / mobile layoutを通過後にVERIFIEDとする。main merge・live反映は未実施。
- **関連**：日本語正本更新 commit `0d54ece601bfa77ecaa792664fdfd16c4fb102f2`、英語同期 `47c697500d63c4e31acd09a1e84b53c423314abe`、ドイツ語同期 `9f68d26fc88f6a1b6fecd962f78f71577b6d3394`、回帰gate `840eab1219d93fbbb3947f02ed6151be46a69b9b`、生成HTML検査修正 `9af346974d77c3a1c6972f51b1959044603599b8`。
- **日時根拠**：日本語Pages CMS commit `0d54ece601bfa77ecaa792664fdfd16c4fb102f2` は 2026-09-28T05:27:07Z → 2026-09-28 14:27 JST。EN / DE同期commitは 2026-09-28T05:32:13Z → 14:32 JST、2026-09-28T05:32:16Z → 14:32 JST。回帰gate commitは 2026-09-28T05:32:54Z → 14:32 JST。初回CIでAstro生成HTMLでは画像URLが処理され元ファイル名を保持しないため、rendered checkでファイル名を要求する設計が誤りと確認。source側でファイル名、rendered側で可視ラベルを検査する形へ修正したcommit `9af346974d77c3a1c6972f51b1959044603599b8` は 2026-09-28T05:34:25Z → 14:34 JST。
- **merge / deploy記録**：PR #132 merge commit `8424a7d26f931a3344d009cd09ce952deaa99b91` は 2026-09-28T05:39:28Z → 2026-09-28 14:39 JST（PR merged_at 2026-09-28T05:39:29Z → 14:39 JST）。Deploy GitHub Pages run `36382861442` は 2026-09-28T05:39:31Z → 14:39 JST開始、2026-09-28T05:42:20Z → 14:42 JST終了でsuccess。build / quality / publication output / mobile layout / Pages deploy / complete live artifact parity / live publication stateがすべてsuccess。


## 2026-10-02 — ARSA Blind Alarm研究運用整理

### 2026-10-02 08:34 JST — LEDGERとCURRENT MAPを分離し、棄却線と次タスクを固定
- **変更**：ARSA Blind Alarm調査について、詳細証拠・出典・逐次履歴を保持する既存 `research/ARSA_BLIND_ALARM_LEDGER.md` と、現在位置・調査経緯・一度切った仮説・優先タスク・停止条件を管理する新規 `research/ARSA_BLIND_ALARM_RESEARCH_MAP.md` を分離した。LEDGER冒頭からMAPへ明示的にルーティングし、P0〜P5の優先度、REJECTED / NOT PROVEN / HOLD / STOP、seller再質問禁止、公開Web飽和後のarchive-first方針を固定した。
- **理由**：ARSA LEDGERが約7万字規模まで伸び、詳細証拠・過去の探索経緯・現在判断・購入タスクが一ファイルに混在していたため。既に棄却・降格した線を再探索したり、sellerへ同じ3点を聞き直したり、広域Web検索を反復する再発リスクが高くなっていた。証拠台帳と現在運用MAPを分離することで、履歴を失わず次の調査だけを即座に判断できる形へ変更した。
- **旧状態・棄却**：単一LEDGERを「証拠履歴」と「現在タスクボード」の両方に使う運用を棄却。新証拠なしに、戦争直接起源説、AFB gift program = ARSA注文、A. Schild直接祖先、全社共通完成ケース、ARSAヒンジ慢性弱点、Venus230量産系列、Ollendorff Swiss factory = ARSA等を再浮上させる運用も棄却する。
- **影響範囲**：`research/ARSA_BLIND_ALARM_LEDGER.md`、新規 `research/ARSA_BLIND_ALARM_RESEARCH_MAP.md`、今後のARSA調査開始順。公開サイト本文・WATCH・HISTORY・Analytics・購入個体の証拠分類そのものは変更しない。
- **検証状態**：mainへ `b043529ae5bc71de02d7be695abc19d58c7a8315` を反映済み。MAPは調査経緯、確定線、切った線、P0〜P5、購入ゲート、停止条件、実行順、禁止事項を保持し、LEDGER冒頭から参照できる状態。最終確認ではmain上のMAP / LEDGER / CHANGE_DECISIONSを再取得して整合を確認する。
- **関連**：commit `b043529ae5bc71de02d7be695abc19d58c7a8315`（`organize ARSA research map and task board`）。
- **日時根拠**：GitHub commit `b043529ae5bc71de02d7be695abc19d58c7a8315` の `2026-10-01T23:34:57Z` → `2026-10-02 08:34 JST`。


### 2026-10-02 09:08 JST — ARSA targetのmovementをAS1475へ確定
- **変更**：今回個体のmovement identityを `A. Schild AS 1475 / 17 jewels` へ更新し、Research MAPのmovement待ち状態をRESOLVEDへ変更。
- **理由**：新しいムーブメント写真で `AS 1475` と `17 JEWELS` の刻印を直接確認できたため。
- **旧状態・棄却**：movement未確認扱いを棄却。写真1枚だけで精度・service conditionまで良好と断定する扱いも棄却。
- **影響範囲**：ARSA research LEDGER / MAPと購入前確認のみ。年代・ケース材・AFB系譜は未変更。
- **検証状態**：画像確認済み。LEDGER commit `d0ed4fee895a432463d04f4f02182746f94367a9`、MAP commit `78050f78926c04b63ad52ce6f38c8f8cfe721e48`。
- **関連**：2026-10-02 09:08 JSTのseller movement photo。
- **日時根拠**：ユーザー提示画像の端末表示 `09:08`。


### 2026-10-02 09:41 JST — ARSA regulator / balance-cock mismatch疑義を撤回
- **変更**：ユーザー提示のEmmyWatch AS1475参照画像と今回個体ムーブ写真の直接比較により、緩急針・テンプ受け周辺は視覚的に整合すると再判定し、Research MAPから active risk を除外した。
- **理由**：前回は参照画像との比較を十分に行わず、見た目の違いを過大評価していた。今回のside-by-sideではテンプ受け輪郭、緩急針配置、stud-holder形状、耐震部位置、Y字bridgeとの相対関係が一致している。
- **旧状態・棄却**：「regulator / balance-cock originality remains OPEN」「別時期variantまたはservice replacementの可能性をactiveに追う」という扱いを撤回。新しい反証が出ない限り再浮上させない。
- **影響範囲**：`research/ARSA_BLIND_ALARM_LEDGER.md`、`research/ARSA_BLIND_ALARM_RESEARCH_MAP.md`、購入前リスク整理。AS1475 / 17J確定、年代・ケース材・service history等の別未解決事項は変更しない。
- **検証状態**：side-by-side画像を再確認し、LEDGER commit `84c93b3c3387f389ef56f4d97ab00cf00356f2c2`、MAP commit `5a563da75e96dda69a1d58a1c69cb96e3b258a03` へ反映済み。
- **関連**：EmmyWatch AS1475 reference image、seller movement photo。
- **日時根拠**：GitHub commit `5a563da75e96dda69a1d58a1c69cb96e3b258a03` の `2026-10-02T00:41:35Z` → `2026-10-02 09:41 JST`。


### 2026-10-02 09:49 JST — ARSA targetにalarm click screw欠落疑義を追加
- **変更**：ユーザー提示のside-by-side画像で、upper alarm ratchet wheel横のalarm click部に参照個体では存在するslotted screwが今回個体では見えず、`57426 alarm click screw` 欠落疑義を最優先の個体確認項目へ追加した。
- **理由**：AS1475部品表で `7426 alarm click`、`7436 alarm click spring`、`57426 alarm click screw` が確認でき、画像上の位置関係が一致するため。これは外観差ではなく、alarm winding retentionに関わる機能部品の可能性が高い。
- **旧状態・棄却**：movement写真について「見える範囲で欠品懸念なし」と広く扱う整理を撤回。caliber identity = AS1475 / 17Jは維持するが、alarm click screw周辺はclose-upまたはseller確認が必要。
- **影響範囲**：`research/ARSA_BLIND_ALARM_LEDGER.md`、`research/ARSA_BLIND_ALARM_RESEARCH_MAP.md`、購入前リスク評価。Blind専用外装、年代、ケース材、AFB系譜は変更しない。
- **検証状態**：LEDGER commit `ec509cc9db31cf1abb810519375a94c6de3e5727`、MAP commit `c12d1ac9131e42fe952b14acf085618baf3925e0` へ反映。部品番号はAS1475 technical parts documentationで照合済み。
- **関連**：user-marked comparison image、AS1475 parts documentation。
- **日時根拠**：GitHub commit `c12d1ac9131e42fe952b14acf085618baf3925e0` の `2026-10-02T00:49:43Z` → `2026-10-02 09:49:43 JST`。


## 2026-10-02 — Council V3完全実装

### 2026-10-02 21:10 JST — 宮廷道化師V3の発端順序と「工程道化師」誤記を訂正
- **変更**：宮廷道化師V3の誕生経緯を会話実態へ再訂正した。起点はユーザー自身の独立した「90%問題」発見ではなく、知り合いのX投稿で「制作は90%付近から必要機能・仕様変更が見えて止まりやすい」という趣旨を見たこと。その投稿からユーザーが「自分の2ch民で焼いては、まさにそれを防ぐための機能だったのでは」と再認識し、既視感から宮廷道化師へ接続したことを正本へ固定した。また、AIが先に「工程道化師」を考案してユーザーが宮廷道化師へ言い換えたのではなく、ユーザーが既に宮廷道化師の導入を提案しており、AIが「こうていどうけし」を「工程道化師」と聞き違え／誤解釈し、ユーザーが再訂正した順序へ修正した。本プロジェクトでの「宮廷道化師」の読みは「こうていどうけし」と明記した。
- **理由**：直前の正本は「ユーザーが90%問題へ自力で気づいた」「AI側の工程道化師という造語をユーザーが宮廷道化師へ訂正した」と記録しており、V3の発見順序と誰が宮廷道化師へ到達したかを逆転させていたため。
- **旧状態・棄却**：「90%問題はユーザーの独立発見が起点」「AIが工程道化師を発明し、ユーザーが後から歴史上の宮廷道化師へ置換した」という経緯を棄却する。
- **影響範囲**：`council-worker/V3.md` と `research/COUNCIL_V3_COURT_JESTER_DESIGN.md` の誕生経緯・呼称読み、および本判断履歴のみ。Council V3の7形式、Fool's License、silent Jester hook、1〜6 renderer / 再裁定、実装コードは変更しない。
- **検証状態**：2026-10-02の会話履歴を再確認し、知り合いのX投稿→2ch機能の再認識→既視感→宮廷道化師への到達→導入提案→AIの「工程道化師」聞き違い→ユーザー再訂正、の順序を確認して正本へ反映。main更新後に対象2正本とdecision logを再取得して内容一致を確認する。
- **関連**：`council-worker/V3.md`、`research/COUNCIL_V3_COURT_JESTER_DESIGN.md`。直前の誕生経緯補正 `2026-10-02 18:09 JST` は本訂正で上書きされる。
- **日時根拠**：ユーザーの会話上の再訂正を受けた時刻 `2026-10-02 21:10 JST`。

### 2026-10-02 21:10 JST — Council通常実行をGitHub正本へ固定し、外部runtime監査を任意範囲へ戻す
- **変更**：Council V3の通常実行はGitHub `main` の `PROJECT.md` / `AGENTS.md` / `PROJECT_STATE.md` / `council-worker/V3.md` / `README.md` / `src/v3.ts` / `src/index.ts` を取得すればChatGPT内で完結できることを明文化した。MCP / Cloudflare Worker / 外部OpenAI APIは任意の外部実行surfaceとし、ユーザーがdeploy / live検証を明示した時だけ別タスクとして扱う。直前に追加したruntime secret復旧、one-shot live smoke、API credits / billing状態の現行正本への持ち込みはcurrent treeから除去し、V3本体・誕生経緯・behavior testは維持した。
- **理由**：ユーザーの目的はCouncil仕様と誕生経緯をGitHubへ永続化し、以後どのチャットでもGitHub正本を参照して同じCouncilを実行できることだった。外部Workerのcredential / billing状態まで通常Councilの完了条件として追うと、正本参照だけで実行可能な設計に不要な依存と短期状態を持ち込むため。
- **旧状態・棄却**：通常のCouncil利用確認をWorker health、secret、OpenAI API creditsの確認まで拡張する運用を棄却する。数時間単位で変わる外部runtime状態を `PROJECT_STATE.md` のCouncil基準として保持することも棄却する。外部MCP / Worker自体は削除せず、明示依頼時だけ検証対象とする。
- **影響範囲**：Councilの起動・参照ルールと正本文書のみ。Council V3実装、7形式、Fool's License、silent Jester hook、1〜6 renderer / 再裁定、誕生経緯、既存behavior testは変更しない。
- **検証状態**：cleanup前mainのpost-V3 commitsを確認し、`2268bef6a7`以降の変更対象が `CHANGE_DECISIONS.md`、one-shot live smoke test、README runtime説明、PROJECT_STATE runtime状態だけであることを確認。current treeはCouncil V3完全実装commit `cd8ac08e56f95db8af6ae823ce4034423e1dccba` を基準に戻し、上記GitHub-canonical scopeの文書差分だけ追加する。commit後にmainを再取得して確認する。
- **関連**：Council V3完全実装 `cd8ac08e56f95db8af6ae823ce4034423e1dccba`。掃除対象の後続commit: `2268bef6a7`, `a0ca1b594d`, `378cb41c5c`, `6191bfd495`, `3145d11438`, `e046290375`, `ddfd12b226`。
- **日時根拠**：作業時刻 `2026-10-02 21:10 JST`。

### 2026-10-02 18:40 JST — MCP本文・silent hook・再裁定・deploy gateを完成
- **変更**：V3からV2の本文rendererを再利用し、1〜6のMCP `content` にBoard・議論・裁定・Sourcesを復元した。silent Jester hookへCross Exam、adaptive hot-seat、匿名再評価を渡し、発火時は元裁定を保存してJester異論込みの議長再裁定を必須化した。1〜6本文、Cross Exam伝達、再裁定表示のbehavior testをCIへ追加し、README / V3正本 / PROJECT_STATE / 研究記録の現行状態を同期した。deploy workflowはCloudflare資格情報だけを必須とし、OpenAI / Vector Storeのrepository secretsが揃う場合だけWorker secretsを上書きし、未設定時は既存Worker secretsを保持する。
- **理由**：初期V3はstructuredContentにはV2結果を残す一方、MCP本文がFORMAT / STOPだけになり得た。hook判定もBoardと最終裁定しか見ず、Cross Examで既に攻撃済みの論点を判別できず、発火しても元裁定を更新しなかった。またdeploy workflowは実deployをskipしてもsuccess終了し、Worker側に既存secretがあってもrepository secretsを全件要求していた。
- **旧状態・棄却**：1〜6のMCP本文をヘッダだけにする状態、Cross Examを見ないhook、Jester乱入を追記するだけで再裁定しない状態、READMEをV2 / 6択のまま正本扱いする状態、実deployなしのsuccess、既存Worker secretを安全に再利用できない全repository-secret必須条件を棄却。
- **影響範囲**：`council-worker/src/index.ts`、`src/v3.ts`、behavior test、Council Worker check / deploy workflow、Council README / V3 / research正本、PROJECT_STATE。1〜6の意味・番号・V2内部プロトコル、7のFool's License、公開サイト本文は変更しない。
- **検証状態**：ローカルbehavior test、wrangler dry-run、decision-log gate、Git diff確認を実施後にVERIFIEDとする。main反映、Actions実deploy、Worker `/health` / `/api/menu` / `/mcp` live確認は別状態として追記する。
- **関連**：branch `fix/council-v3-complete-implementation`。関連commit / PR / deploy runは作成後に追記する。
- **日時根拠**：作業環境のJST時計 `2026-10-02 18:40:18 +09:00`。
