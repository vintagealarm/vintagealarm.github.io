# VINTAGE ALARM — Project Instructions

> ChatGPT / Codex / 作業エージェント向けの唯一の起動ルータ。詳細規約の正本は各参照先にある。`AGENTS.md` は常設の実行ガードレール、`PROJECT_STATE.md` は現在位置の索引であり、このファイルはそれらを置き換えない。

## 0. 最優先

このリポジトリでVINTAGE ALARM案件を扱うとき、会話の流れ・記憶・一般論から現行仕様を補完しない。

**必ずこの `PROJECT.md` を入口に、`PROJECT_STATE.md` → 現在のbranch / PR → 対象ファイル / URL → 対象分野の正本の順で確認する。**

`AGENTS.md` は作業中常時適用する。実行環境が自動的に読み込んでいる場合、起動のたびに全文を再読する必要はない。

上位の情報源を確認できるのに下位情報で埋めない。

優先順位:
1. 目の前の画像・動画・ファイル・表・スクショ・商品ページ・ログ
2. ユーザー指定資料 / Project資料 / GitHub現行成果物
3. 公式資料・一次資料
4. 必要なWeb調査
5. 過去会話・長期記憶（確認先を探す索引としてのみ使用）
6. 一般論・推測

ただし、実装・公開状態の現在値は資料の記述で上書きしない。作業中は対象branch / PR、本番確定状態はGitHub `main`、公開実体はlive siteをそれぞれ確認する。Project資料と過去監査記録は、これらの現在値に優先しない。

内部では **確認済み事実 / 資料記載 / Web確認 / ユーザー説明 / 推測 / 未確認 / 判断** を分ける。未確認を自然な物語で埋めない。

## 1. 「焼いて」/ Council は絶対に独自解釈しない

`焼いて` / `焼こう` / `Council` / Council選択中の番号 `1〜6` を検出したら、**会話から意味を発明せず**、必ず次を正本として扱う。

- `council-worker/README.md`
- `council-worker/src/index.ts`
- `AGENTS.md` の Council / 焼いて V2

### 「焼いて」だけの場合

次の6択をそのまま出して選択を待つ。

1. **2ch民で焼いて** → スレ表示。煽り・反論・レスバ込みで論点を削る
2. **みんなで議論して** → ひな壇。複数視点をテンポよくぶつける
3. **冷静に決めて** → 評議会。選択肢を比較して最終判断まで出す
4. **監査して** → Claim Board。主張・根拠・反証・未確認を分解する
5. **案出して** → Brainstorming Board。独立発想→整理→発展→絞り込み
6. **事前に地雷探知して** → PRE-MORTEM。実装前に失敗原因を先回りし、作り込む前に撤退・検証・GOを決める

### 番号または形式が選択済みの場合

- `1` は **2ch民で焼いて**。別の意味へ再定義しない。
- `2ch民で焼いて` / `5ch民で焼いて` / `スレ民で焼いて` は1を直接実行し、メニューを挟まない。
- 選択後は現在の会話、画像、ファイル、Project資料、GitHub、既存成果物、確定判断を先に拾う。
- 既知事項を聞き直さない。
- 「焼いて」用の独自メニューをその場で創作しない。

## 2. 分野別ルーティング

- 本文 / WATCH / HISTORY / OWNER'S NOTES / 翻訳 → `SITE_RULES.md`
- 日本語本文の新規執筆 / 大幅改稿 → `SITE_RULES.md` + `strategy/japanese-writing.md`
- デザイン / UI / 画像 / mobile / motion → `DESIGN_ENGINEERING.md`
- SEO / AIO → `strategy/seo-aio.md` + 必要な `measurement/*`
- Analytics / 計測単体 → `measurement/metrics.md` + 対象実装
- **SNS / 布教 / Instagram / X / YouTube / SNSとVA Analyticsの突合 → `measurement/.internal/.virtual/social/ROUTER.md` を最初に読む**
- SNS詳細実測 → `measurement/.internal/.virtual/social/instagram-operations.md`
- 過去SNS / Analytics実験 → `measurement/experiment-log.md`
- 英語入口 → `strategy/english-entry.md`
- ドイツ語入口 → `strategy/german-entry.md`
- Council / 焼いて → `council-worker/README.md` + `council-worker/src/index.ts`

時計の事実認定では、Project資料『Alarm am Arm』『The Alarm Wrist Watch』等を確認できる場合は一般論より先に使う。

## 3. SNS / Analytics / VA運用

SNS投稿案・評価・Councilでは、**必ず `measurement/.internal/.virtual/social/ROUTER.md` の ACTIVE / RESOLVED を先に分離する。**

- ACTIVE = 現在検討・比較・焼くべき論点。
- RESOLVED / INTERNAL = 判断の前提として内部適用するが、新証拠や明示的な再検討指示がない限り回答・Councilの主要論点へ戻さない。

これにより、既に確定した計測上の注意事項や過去の訂正を毎回答で再説明しない。

SNS案件の基本確認順:
1. 現在の会話にある最新スクショ / Insights / Relay / ユーザー訂正
2. `measurement/.internal/.virtual/social/ROUTER.md`
3. `measurement/.internal/.virtual/social/instagram-operations.md`
4. `measurement/experiment-log.md`
5. `measurement/metrics.md`
6. `PROJECT_STATE.md` と対象VAページ
7. Project資料・一次資料
8. 必要ならWeb / 市場 / SNS

過去X / YouTube / Instagramで既に使った訴求を確認せず、新しい企画として再発明しない。

英語投稿を作る場合は、**ネイティブとして自然な英語 + 英語構文を引きずらない自然な日本語訳**をセットで提示する。

## 4. 変更履歴と日時

仕様・運用・公開・計測・UI・分類・文言の意味・公開状態・検証方針・棄却判断・再発防止策が変わる場合、**同じ変更セット内で `CHANGE_DECISIONS.md` にJST日時付きで記録する。**

形式:

`### YYYY-MM-DD HH:mm JST — ...`

最低限、**変更 / 理由 / 旧状態・棄却 / 影響範囲 / 検証状態 / 関連 / 日時根拠** を残す。

GitHub UTC時刻を根拠にする場合、UTC原文とJST換算を併記する。日時を頭だけで変換して済ませない。

記録漏れがある状態を `完了` / `VERIFIED` と呼ばない。過去漏れを見つけたら「次回」へ送らず、その場で安全に補填する。

## 5. 実行と検証

- 実装済み / 検証済み / main反映済み / deploy成功 / live確認済み / 成果観測済みを混同しない。
- ユーザーが本番反映まで求めた場合、main pushで終了しない。
- 部分修正は差分編集。指定外を勝手に改善しない。
- エラーは自力で原因特定・再試行できる範囲を先に処理する。
- ユーザーが棄却した候補は、新証拠がない限り復活させない。

## 6. 回答前の強制チェック

回答・実行前に最低限これを確認する。

- 今回、正本ファイルがあるか。あるなら読んだか。
- SNS案件ならSocial Routerを通したか。
- ACTIVEとRESOLVEDを分け、RESOLVEDを不要に再説明していないか。
- 目の前の画像 / 資料 / Analytics / GitHubを一般論より先に確認したか。
- 「焼いて」や番号の意味を勝手に作っていないか。
- 過去SNS実績を確認せず既存案を再発明していないか。
- ユーザーの訂正を最新仕様へ反映したか。
- 未確認を確認済みのように書いていないか。
- 旧仕様・棄却済み候補を復活させていないか。
- 判断変更なら `CHANGE_DECISIONS.md` も同時に更新したか。
- 実行と検証を混同していないか。

このチェックに失敗した場合、回答を続けず正本確認へ戻る。
