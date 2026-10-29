# VINTAGE ALARM — 作業エージェント案内

VA案件の各ユーザーメッセージに対するfresh boot契約の正本は `PROJECT.md` §0。ここに同じ規則を複製しない。下記の起動順序はfresh `PROJECT.md` 取得後のrepo内手順であり、後段のcontext節約にある再取得抑制はmandatory bootを妨げない。

このリポジトリで作業する前に、まず `PROJECT_STATE.md` を読む。

`PROJECT_STATE.md` は現在位置と正本へのルーターであり、実装そのものの正本ではない。本番・確定状態はGitHub `main` と対象ファイルで確認する。作業中のbranch / PRがある場合は、そのbranch / PRと対象ファイルを先に確認し、`main`との差分だけを理由に未実装・旧仕様と判断しない。

## 起動順序

1. `PROJECT_STATE.md`
2. **open PRをactive queueとして先に確認**し、そこに紐づくbranchまたは会話・正本で明示された作業branchだけを現在作業中として扱う。branchが存在するだけでactiveとみなさない。対象branch / PRと`main`との差分・未完了変更を把握する
3. 今回の対象ファイル / 対象URL
4. 今回に必要な分野別ルールだけ読む
5. 必要な資料・実測ログ・Webを確認する
6. 実装 → 検証 → diff確認へ進む

## Manager Control Plane — pilot

通常作業は `.codex/MANAGER_CONTROL_PLANE.md` を管理プロトコルとして使う。Task Envelopeのfield正本は `.codex/TASK_ENVELOPE_TEMPLATE.md`、推論gate正本は `.codex/FAIL_CLOSED_INFERENCE_GUARDS.md`。

- 既定はsingle-agent。非自明な変更・研究判断・複数工程では、SCOPED後・mutation前にユーザーが見えるCHAT AUDIT REPORTを出す。
- VerifierはBuilderの自己申告ではなく、正本・diff・test / build / render / live / 実物から再判定する。
- **同一チャット内での実行指定、無断Work移管防止、GitHub可否の実検査、沈黙防止の単一正本は `.codex/MANAGER_CONTROL_PLANE.md` §2.5。** ユーザーが実行場所を指定した場合にこの節を適用する。規則本文はここへ複製しない。
- **normative rule / CURRENTはcanonical ownerを原則1箇所に置く。** PROJECT / AGENTS / PROJECT_STATE等には発見用pointerを複数置いてよいが、domain固有値を再定義しない。
- 新しいスクリーンショット・実測・資料・ユーザー訂正を受け取った場合は、対象domain Router / canonical sourceのwrite contractを確認する。既存contractが無い場合に新保存先を勝手に作らない。
- `.codex/config.toml` の `multi_agent = false` は維持する。

分野別ルーティング:

- 分野別routeのcanonical ownerは `PROJECT.md` §2。AGENTSへ一覧を複製しない。
- SNS / Instagram / X / YouTube → `measurement/.internal/.virtual/social/ROUTER.md`。投稿案はその後 `measurement/.internal/.virtual/social/content-inventory.md`。
- Council / 焼いて → `council-worker/V3.md` + `council-worker/README.md` + `council-worker/src/v3.ts` + `council-worker/src/index.ts`。
- 個人時計台帳 → cross-repo `orima1995-create/watchdiary-ios` のCURRENT Issue群。
- 対象が絞れている場合、全ルールやリポジトリ全体を理由なく読み直さない。

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

### Research Image Evidence Custody — 判断根拠画像の保存契約

この節は、研究判断に使用した画像の**原本の所在・保存実態・判断との対応**に関する単一の運用正本。上記の Research Evidence Ingress を拡張する。別の横断DB・画像台帳・sidecarは作らず、対象時計の**既存Research Ledger**のEvidence / Source registerに記載する。既存Research MapはCURRENT / OPEN / HOLD / 次アクションが変わる場合のみ更新する。Ledgerが無ければ既存domain ownerを確認し、無断で新台帳を設けずHOLDする。

**対象**：実機・比較個体・出品・SNS・専門書・特許・技術図面・修理・スクリーンショットなど、実際に事実認定・比較・反証・棄却へ使った画像。単に検索結果で見た未使用画像は一括保存しない。新規研究・別チャットにも共通適用。

**判断に採用した際の最低登録項目**（得られなければUNKNOWN、推測で埋めない）：

1. **Evidence ID / 判断の対応**：対象時計、個別の論点、直接観察できた特徴、支える・否定する主張。目視観察／投稿者の説明／推論を分離し、採用・HOLD・REJECTEDなど既存の判断分類を維持する。
2. **原典への復元点**：画像原URLと親掲載ページ・投稿日・post / attachment / listing ID等。書籍なら書名・著者・版・**印刷頁とPDF viewer頁を別々に**・図版番号。ユーザー提供スクショは原サイトの原画像取得とは区別。確認できた取得日だけ記す。
3. **原画像の識別**：実機原写真・第三者原写真・PDF中の図版・画面スクショの種別、取得した場合の実ファイル名・形式・寸法・サイズ、原本bytesのSHA-256（実ファイルを計算した場合のみ）。トリミング／注釈版は原画像と分けて関連づけ、改変版だけを証拠原本として残さない。
4. **保存実態**：以下の状態、実在確認した非公開保存先の種類と内部ID／相対パス、再取得・原本との同一性検証の結果。公開台帳に認証トークン・署名付きURL・個人情報・秘密の共有リンクを書かない。
5. **権利と利用範囲**：撮影者・提供者の区別、複製可否と公開許諾の確認状況。ユーザーから画像を提示されたこと、Webで閲覧できること、私的保存できることは公開・再配布許可を意味しない。

**保存状態（いずれかを記載）**：

- `LINK_ONLY`：URL・書誌・参照位置のみ。画像本体は未取得。
- `TEMP_FETCHED`：画像bytesを取得したが一時環境のみ、または永続保管を確認できていない。
- `PRIVATE_SAVED_UNVERIFIED`：適法な非公開の永続保存先への保存操作は確認したが、再読と同一性照合は未完了。
- `PRIVATE_VERIFIED`：非公開永続保存先から実画像を再取得し、元ファイルとの同一性（SHA-256等）を照合済み。
- `COPY_RESTRICTED`：権利・利用条件により新規コピーは行わない。原典の書誌／URL／ページと判断のみを保持。
- `MISSING`：原画像がアクセス不能で、回収可能なコピーも未確認。記憶やAI再描画で代用禁止。

**保管と権利**：許容される既存の非公開・永続的な保管場所（例：実際に使用権限を確認できたprivate Libraryやユーザー指定先）を利用し、原画像を無改変で保持する。チャットの一時output、公開GitHub branch / PR / media、外部画像URL、ハッシュ値だけでは原本の永続保存を立証しない。保存経路が利用できない場合は `TEMP_FETCHED` / `LINK_ONLY` のまま未完了と記録し、「保存済み」と報告しない。専門書が既に参照可能なら書誌・印刷頁・viewer頁・図番号へ戻り、余分な複製スキャンを作らない。第三者画像・書籍図版を無許諾で公開repoへ収容しない。保存条件そのものが不明ならHOLDする。

**手順・検証**：原画像／原ページを確認 → 観察と推論を区別 → 複製・保存可否を確認 → 許容される保管先へ保存（可能な場合） → 元ファイルとの再読／同一性照合 → Ledgerの差分と再取得を確認。新規IMAGE-CONFIRMEDは実画像を検証した範囲のみ。公開WATCH・画像・翻訳・サイト本文は別の明示指示なしに変更しない。過去のWittnauer / ARSA等についても既存URLや作業用ファイル記録を「永続保存済み」に遡及昇格しない。過去画像の回収は別の明示作業とする。

## 海外価格・費用の日本円併記（共通出力契約）

- ユーザー向けに海外の時計・部品・ドナームーブメント・修理代・送料・返金／交渉額を提示するときは、**外貨の原額と日本円（JPY）換算を同じ行または近接した位置で必ず併記**する。ユーザーが外貨のみを明示指定した場合だけ例外。
- 商品本体と送料は分け、**送料込み合計の日本円**も示す。比較表では原通貨／本体の日本円／送料の日本円／送料込み日本円を確認できる状態にする。未知の送料は「日本宛送料未確認」と明示し、勝手に仮定しない。
- **換算レート・基準日時・概算／確定の区別**を明示する。外貨が現在価格なら可能な限り現在レートを確認し、できない場合は仮定レートとして表記する。輸入税・関税・決済手数料等の未反映費用も必要に応じて明示する。
- **出品価格と成約相場、working表記と動作保証、ドナー調達費と修理工賃を混同しない**。前回の外貨価格を再利用する場合は出品の現在性が未確認であることを示す。
- 費用の比較・交渉・実質負担額を計算するときは、**ユーザーが把握しやすい円建てを主表示**とする。外貨建ての額だけ提示してユーザーに換算を任せない。

## 基本動作

- VA案件でユーザーへ返す進捗・監査・最終報告は、並行作業を識別できるよう冒頭にホスト確認済みの `YYYY-MM-DD HH:mm JST` を表示する。会話時刻を推測で補わず、実行環境のJSTを確認する。
- 上位の一次情報を確認できるのに、会話記憶や一般論で補完しない。
- 未確認情報、検索需要、順位、流入、成果を推測で埋めない。
- 変更前に、現在のbranch / PR / `main`との関係、対象URL・変更ファイル・変更しない事項・合格条件を固定する。
- 作業branch / PR上の未merge差分を、`main`に存在しないことだけを理由に削除・巻き戻ししない。
- 既存のOWNER'S NOTE原文、確定済みキャッチ、資料に基づく本文を、明示指示なしに変更しない。
- 「ここだけ」「他は変更不可」は差分編集する。指定外を改善しない。
- 一つの施策を理由にサイト全体を再設計しない。
- 他者の未完了変更を上書きしない。
- 旧仕様・棄却済み候補を、新証拠または明示的な仕様変更なしに復活させない。
- 整理・最適化で履歴を消さない。superseded / rejected / closedになったPR・branch・判断・候補は、現行作業キューから外しても削除せず、後から起点・検証・採否・撤回理由を追える状態を保つ。open / closedは「今作業するか」の状態であり、履歴の価値とは分離する。古いbranchを直接mergeしない場合も、必要差分をcurrent mainへ救出したうえで元PR / branchを履歴参照として残す。
- active queue確認でbranch一覧全体を「未完了候補」として総当たりしない。open PRを第一入口にし、PRなしbranchは明示的な作業指定・decision log参照・履歴調査が必要な場合だけ開く。
- **SNS投稿案・既出除外・未使用角度抽出では、Social Routerの後に `measurement/.internal/.virtual/social/content-inventory.md` を必ず確認する。** 会話記憶から投稿ネタを再発明せず、inventoryで候補を絞った後にWATCH / research / published-copyの正本へ戻って事実を再確認する。OWNER'S NOTEはinventoryの `WHOLE_ONLY` を守り、leadや本文を複数投稿へ分割しない。AIはSourceに基づいてasset候補を分類し、`AI_PROPOSED` として提示してよい。Candidate Review Queueは**時計横断のrolling shelf**として継続的に増やし、1個体を全件確定してから次の時計へ進む必要はない。asset境界の KEEP / MERGE / SPLIT / DROP は、その候補一覧をユーザーへ見せて相談した後に確定する。KEEPは「assetとして棚に残す」の意味で、次回投稿の採用とは分離する。**候補を提示せずAI単独で確定したことにしない。** final storyboard / captionを確定する前に、ユーザーが選んだ時計＋内容だけContent Assignment Registryへ USER_CONFIRMED / PLANNED として予約する。active予約済みasset / mediaは候補から除外し、中止時は削除せず DROPPED で解放する。
- **案・発見・指摘・修正の帰属を保持する。** 誰が最初に提示したか（ユーザー / AI / Council / 資料・Web・画像）、その後だれが確認・同定したか、採用 / 棄却 / HOLD / 未決のどこに置いたかを混同しない。後から要約・Roast・Council・本文化するときも発案者を入れ替えない。
- 帰属が後続判断に効く案・発見は、関連research ledgerまたは `CHANGE_DECISIONS.md` に **起点 → 検証 → 採否理由 → 現在状態** を残す。未採用案を作者の意図や確定方針へ昇格させず、AI案をユーザー案として、ユーザー案をAI案として記録しない。
- **U/A簡易帰属（2026-10-13以降の新規判断）**：`U`＝ユーザーが提案・発見、`A`＝AIが提案・発見。判断の帰属が重要な記録では **`起点 → 判断`** を用いる（例：`U → U採用`、`A → U採用`、`A → U棄却`、`A → A修正`、`U → 未決`）。「誰が提案したか」と「誰が採否を決めたか」は別軸とし、**U採用はユーザーの明示的な採用を確認できた場合のみ**。AIによる提案・訂正・推測をユーザーの発言や性格・要求へ置換しない。外部発言の紹介やCouncil起点は `Uが紹介／原出典：外部`、`Council起点` 等と区別し、U/A本人の独自発案にしない。原発言・元資料を確認できない帰属は未確認とし、過去全件の自動再分類は行わない。新しい別台帳は設けず、前項の既存ownerへ記録する。
- OWNER'S NOTEの `catch` / `ownersNote.lead` を新規作成・大幅改稿・候補選別する場合は、**ARSAに限らず全WATCH共通で** `SITE_RULES.md` のCatch / Lead開発プロトコルを先に適用する。作業時点で `published: true` の日本語WATCHすべての現行Catch / Leadを横並び確認し、候補の発案者・派生元、Reality pin、VA温度比較、採否・現在状態を保持する。ローカル環境では `npm run owner-copy:benchmark` を使える。固定の代表本数や会話記憶だけで温度を推定しない。
- Catch / Leadで遊びを入れる場合は `SITE_RULES.md` のSensitive-context collision checkも必須。対象の背景に障害・戦傷・リハビリ等が確認できるなら、その背景を軽いネタの材料にせず、機構・操作・外観など別軸で遊ぶ。
- 現行仕様・判断・方針・棄却候補が変わる変更は、`CHANGE_DECISIONS.md` へJST日時付きで同じ変更セット内に記録する。記録漏れがある状態を「完了」「VERIFIED」としない。
- 実装済み / 検証済み / 公開済み / 成果観測済みを混同しない。
- 未実行の検査を成功扱いしない。
- エラーが自力で解決可能なら、原因を特定して再試行してから報告する。
- 公開導線・表示ラベル・release flagを変更したら、実装箇所だけでなく `check-build-output` / `check-live-site` / layout対象route / deploy workflow内の旧文字列・旧仕様を検索して同期する。
- 過去は短時間で反映していた本番が長時間変わらない場合、「GitHub Pagesが遅い」「キャッシュ」「連続push」等を証拠なしに原因認定しない。最後に成功した公開以降の差分と、deploy前に走るgateの不整合を先に調べる。
- ユーザーが本番反映まで求めた作業は、main pushを完了としない。liveで目的物を確認するまで `DEPLOYED` と報告しない。


## 日時付き判断履歴 — 必須

これは努力目標ではなく完了条件。

- **仕様・運用・公開・計測・UI・分類・文言の意味・公開状態・検証方針・棄却判断・再発防止策が変わるすべての判断**を、同じbranch / PR内で `CHANGE_DECISIONS.md` に記録する。ユーザー訂正で旧判断を撤回した場合も対象。
- 各新規記録は `### YYYY-MM-DD HH:mm JST — ...` 形式とし、最低限 **変更 / 理由 / 旧状態・棄却 / 影響範囲 / 検証状態 / 関連 / 日時根拠** を持つ。
- 日時を頭でUTC→JST変換しない。GitHub時刻を根拠にする場合は、`2026-09-23T06:28:13Z → 2026-09-23 15:28 JST` のように**元のUTC時刻と換算後JSTを併記**し、CIで換算を検査可能にする。
- PR完了前に、merge-baseからHEADまでのcommit / changed filesと、最後に追加したdecision entryを突合し、**判断変更なのに未記録のcommitが1件もないことを確認する**。
- typo、依存更新、意味を変えない整形など本当に判断を伴わない変更だけ例外にできる。例外は黙って通さず、PR本文に `Decision-Log: not-required — <理由>` を明記する。判断変更をこの例外で逃がさない。
- `npm run check:decision-log` を必須gateとする。decision-bearingな変更があるのに `CHANGE_DECISIONS.md` が更新されていない、日時形式がない、必須項目がない、UTC→JST換算が誤っている場合は失敗させる。
- 過去の漏れを後から発見した場合は、その場で復元PRを作り、確認できるGitHub commit / PR時刻を第一根拠に補填する。「次から気をつける」だけで終わらせない。

## 公開変更の原子性とデプロイ監査

- 公開対象の変更は1 deploy単位で完結させる。表示実装、build gate、live gate、必要なlayout検査を同じ変更セットで揃えてからmainへ反映し、実装→gate→gateの分割pushをしない。
- deploy起動だけを目的としたダミーコメント・無意味なソース変更を入れない。再実行はActionsのrerun / workflow_dispatch等の正規手段を優先する。
- push後は triggered / queued / running / failed / deployed / live verified を区別する。取得できていない状態を推測で補完せず、「trigger条件を満たした」を「deployを発火した」と表現しない。
- 本番未反映時は追加pushより先に main対象実装 → workflow → build gate → layout gate → upload/deploy → live gate の順で監査し、最初に不整合が見つかった層だけを修正する。
- UI変更でmobile表示が合格条件に含まれるページは、文字列検査だけでなく check-layout の対象routeへ含める。

## 作業中 / 本番 / 公開の区別

- 作業中の現在状態: 現在のbranch / PR + 対象ファイル + `main`との差分
- 本番へmerge済みの確定状態: GitHub `main`
- 実際の公開状態: deploy成功後のlive site

この3つを混同しない。branch上で正しい未merge変更があっても、`main`にないという理由だけで旧仕様扱いしない。逆に、branchへ実装しただけで本番反映・公開済みとは扱わない。

## 変更と検証

変更後は影響範囲に応じて最小限の確認から始め、必要な場合だけ広げる。

- コード / 構造変更: build / test / lint等の該当検査
- 日本語本文 / 文書の新規執筆・大幅改稿: `npm run check:japanese-style`。warningは再読のきっかけであり、自動修正命令ではない
- デザイン変更: `DESIGN_ENGINEERING.md` の実寸監査。build成功だけで検証済みにしない
- 公開ページ: 必要に応じて主要ページ生成、リンク、メタデータ、mobile表示を確認
- SEO / AIO / Analytics: 実装と成果観測を分離する

公開できたことを、検索順位・来訪・AI露出の成功と表現しない。

## Council / 焼いて V3

Councilのlauncher / 7形式 / 共通protocol / Jester / PRE-MORTEMの仕様本文はAGENTSへ複製しない。必要時だけ次を正本として取得する。

- launcher / 番号意味: `PROJECT.md` §1
- 現行仕様: `council-worker/V3.md`
- 7形式・共通protocol・PRE-MORTEM・MCP: `council-worker/README.md`
- 実装: `council-worker/src/v3.ts` + `council-worker/src/index.ts`
- 7の設計経緯・根拠: `research/COUNCIL_V3_COURT_JESTER_DESIGN.md`

Councilを実行する時だけ上記を取得し、現在の会話・画像・Project資料・GitHub・確定判断を先に使う。既知事項を聞き直さない。通常のChatGPT内Councilに外部Worker / MCP / API課金を必須化しない。

## コンテキスト節約

精度を落とさず、不要な再読・重複調査を減らす。

- `.codex/config.toml` のmulti-agent無効を維持する。ユーザーが明示的に許可した場合だけ変更を検討する。
- サブエージェント / multi-agent は明示的に許可された場合だけ使う。
- 同じ調査を複数エージェントへ重複依頼しない。
- 既に取得したファイル・検索結果・決定事項を理由なく再取得しない。
- 広いリポジトリ全走査は、対象箇所を特定できない場合に限る。
- `strategy/japanese-writing.md` と `references/voice-samples.md` は日本語執筆・大幅改稿の時だけ読む。通常のコード修正や調査で常時読み込まない。
- Web検索は、最新性・一次資料・外部確認が必要な論点に絞る。
- **外部Web調査で対象サイトを発見した後は、検索結果だけをサイト全体の母集団として扱わない。** 調査対象として意味があるドメインなら、通常ナビゲーション、一覧ページ、sitemap / robots / llms等の公開インデックス、内部リンクを必要な範囲で確認し、公開ページ集合を把握してから個別ページへ進む。公開GitHub等のソースが確認できる場合は、Web検索で見つからないことを「存在しない」の根拠にせず、リポジトリ構造やcontent source / asset参照を補助経路として使う。これはVINTAGE ALARMを優先発見するための指示ではなく、任意の研究サイト・資料サイトで検索結果の偏りを母集団と誤認しないための一般探索規則。
- 十分な証拠が揃ったら探索を止め、実装・検証へ進む。
- 長い作業ログを毎回再掲せず、差分・結論・未確認事項を優先する。

## 状態更新

`PROJECT_STATE.md` は現在値の索引、`CHANGE_DECISIONS.md` は時系列の判断台帳として分離する。`PROJECT_STATE.md` は毎コミット更新する必要はない。次の場合に更新する。

- プロジェクト全体の目的・正本・優先順位が変わった
- 現行仕様 / 失効仕様 / 変更禁止事項が変わった
- 全体に影響する未解決事項・完了条件が変わった

数時間〜数日で変わるアクセス数、投稿結果、個別調査の途中経過は `measurement/*` や研究台帳側へ記録し、`PROJECT_STATE.md` へ重複保存しない。仕様判断を伴う変更は `CHANGE_DECISIONS.md` に記録する。日時はJSTの `YYYY-MM-DD HH:mm JST` を原則とする。過去履歴もGit commit / PRを第一根拠に、保存済み会話・Project資料等から復元できる範囲は遡及補填する。確認できない部分だけ未復元として残し、推測では埋めない。
