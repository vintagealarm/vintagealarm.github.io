# VINTAGE ALARM — 作業エージェント案内

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
- **normative rule / CURRENTはcanonical ownerを原則1箇所に置く。** PROJECT / AGENTS / PROJECT_STATE等には発見用pointerを複数置いてよいが、domain固有値を再定義しない。
- 新しいスクリーンショット・実測・資料・ユーザー訂正を受け取った場合は、対象domain Router / canonical sourceのwrite contractを確認する。既存contractが無い場合に新保存先を勝手に作らない。
- `.codex/config.toml` の `multi_agent = false` は維持する。

分野別ルーティング:

- 本文 / WATCH / HISTORY / OWNER'S NOTES / 翻訳 → `SITE_RULES.md`
- 日本語本文の新規執筆 / 大幅改稿 → `SITE_RULES.md` + `strategy/japanese-writing.md`
- デザイン / UI / 画像 / mobile / motion → `DESIGN_ENGINEERING.md`
- SEO / AIO → `strategy/seo-aio.md` + 必要な `measurement/*`
- Analytics / 計測 → `measurement/metrics.md` + 対象実装
- SNS / Instagram / X / YouTube / SNSとVA Analytics → `measurement/.internal/.virtual/social/ROUTER.md`
- SNS投稿案 / 再利用素材 → Social Routerの後に `measurement/.internal/.virtual/social/content-inventory.md`
- 英語入口 → `strategy/english-entry.md`
- ドイツ語入口 → `strategy/german-entry.md`
- Council / 焼いて → `council-worker/V3.md` + `council-worker/README.md` + 実装正本
- 個人時計台帳 → cross-repo `orima1995-create/watchdiary-ios` のCURRENT Issue群

対象が絞れている場合、全ルールやリポジトリ全体を理由なく読み直さない。

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

## 基本動作

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

`焼いて` はCouncilの即実行命令ではなく、**Council形式を選ぶランチャー**として扱う。

ユーザーが「焼いて」だけと言った場合は、毎回必ず次の7択をそのまま明示し、選択を待つ。

1. **2ch民で焼いて** → スレ表示。煽り・反論・レスバ込みで論点を削る
2. **みんなで議論して** → ひな壇。複数視点をテンポよくぶつける
3. **冷静に決めて** → 評議会。選択肢を比較して最終判断まで出す
4. **監査して** → Claim Board。主張・根拠・反証・未確認を分解する
5. **案出して** → Brainstorming Board。独立発想→整理→発展→絞り込み
6. **事前に地雷探知して** → PRE-MORTEM。実装前に失敗原因を先回りし、作り込む前に撤退・検証・GOを決める
7. **宮廷道化師で焼いて 🤡** → 王＝ユーザー＋AI＋Councilの前提をノンデリに疑い、必要なら提示外の案・削除・撤退・保留・何もしないまで戻して比較。異論がなければ「今回は異議なし🤡」で帰る

ユーザーが番号または形式を選んだ後:

- 現在の会話、画像、ファイル、Project資料、GitHub、既存成果物、確定判断から必要情報を先に拾う。
- 既に把握できる内容を質問し直さない。
- 精度を実質的に上げる不足情報がある時だけ質問する。
- 質問が必要でも、原則は最重要の一点だけ聞く。
- 情報が十分なら質問せず即実行する。

`2ch民で焼いて` / `5ch民で焼いて` / `スレ民で焼いて` のように形式が明示済みなら、7択を再表示せず1を直接実行してよい。

`7` / `宮廷道化師で焼いて` はV3の独立format / protocolとして直接実行する。Fool's Licenseのノンデリ口調は、罵倒ではなく強い異論・提示外代案をネタのフレームで通す心理的緩衝UIとして扱う。異論が弱ければ `今回は異議なし🤡` で終える。

7 / 宮廷道化師は通常Councilより広い前提回収を先に行う。直近会話やPROJECT_STATEだけで全体像を代用せず、Current state、判断の起点と採用理由、訂正・撤回、REJECTED・HOLD、実測・資料・売買・修理等の証拠、隣接領域への影響を正本から復元する。広い歴史・遍歴を扱う場合は代表例だけで圧縮せず、対象時系列を一度網羅してから出力を圧縮する。時計の所有・購入・売却・OH・financeを含む場合はwatchdiary-ios CURRENT Issue群、SNSならSocial Routerに加えて実測時系列・実投稿・Decision→Evidenceまで確認する。宮廷道化師はCouncil内で最も文脈負担が重い役として扱う。

1〜6では、共有された未検証前提または不当に閉じた選択肢があり、それを反転すると結論・実装・コストが実質的に変わり得て、かつCouncil内で未攻撃の場合だけsilent Jester hookが一度乱入できる。通常は完全に黙り、乱入回数を品質指標にしない。

通常の依頼としての「監査して」「案出して」「地雷探知して」まで自動でCouncilへ変換しない。直前に「焼いて」で形式選択中の場合、またはCouncil形式として明示された場合に4 / 5 / 6として扱う。

6のPRE-MORTEMは実装後レビューではない。設計が失敗した未来を先に仮定し、次の2段階で焼く。

1. **コード0行** — 前提、データモデル、状態、責務境界、ライフサイクル、より単純な代替を独立に破壊する
2. **最小SPIKE後** — DB / schema / interface / 状態遷移 / 最難所だけの使い捨て実装を証拠として、初期予測と新しい地雷を再評価する

指摘は **致命傷 / 高確率地雷 / 設計上の負債 / 好み / 未検証** に分類する。最初から改善案を褒め足すのではなく、**「この設計が作り込み後に失敗した」と仮定して原因を探す**。最後は **GO / SPIKEしてからGO / 作り直せ** のいずれかを裁定し、`SPIKEしてからGO` では次に検証する最小範囲を明記する。

今回の複数プログラム管理機能について、DB / データモデルが失敗原因だった可能性は**未確認仮説**として扱う。作成者への評価や印象を原因認定の根拠にせず、schema、関係、制約、CRUD、削除・複製・切替・復元等の観察可能な証拠で検証する。

`run_council` が利用可能なら、形式決定後に使ってよい。ただし**通常のChatGPT内Councilの正本はGitHub `main`**であり、MCP / Cloudflare Worker / 外部OpenAI APIは必須ではない。未接続でも停止せず、最新 `council-worker/V3.md`、`council-worker/README.md`、`src/v3.ts`、`src/index.ts` を取得してこのチャット内で同じプロトコルを実行する。ユーザーが外部runtimeのdeploy / live検証を明示していない限り、secret、API credits、Worker healthの調査へ作業範囲を拡張しない。

V2共通プロトコル:

1. 独立初手（他住民を見ない）
2. Claim / Idea Boardへ論点整理
3. 人ではなくBoard項目へ反証・補強・統合
4. 情報利得が残る場合だけadaptive hot-seat
5. 他人の投票を見ない再評価
6. 強い少数意見をMinority Reportとして保持
7. 議長が根拠・反証・未確認を比較して裁定

固定ラウンド数や人数の多さ自体を品質とみなさない。住民は架空の年齢・家族構成等ではなく、目的、証拠方針、失敗傾向、修正条件、棄権条件で差別化する。必要な属性はstakeholder lensとして扱う。

時計案件ではProject資料・PDF・画像・既存実装を一般論より先に確認し、確認済み事実・資料記載・Web確認・推論・未確認を混ぜない。

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
