# VINTAGE ALARM — English entry strategy

更新日: 2026-09-24

## 目的

英語版を「日本語サイトの完全複製」として一括生成するのではなく、海外からの発見と初回理解を補う入口として実装する。

英語WATCHページは所有6本すべてを公開し、6本すべてを FULL RESEARCH とする。

- Basis Alarm
- Pierce Duofon
- Cyma Time-O-Vox
- Citizen Alarm
- Westclox Watchlarm
- Wittnauer Cal.10WA

加えて、Cyma Time-O-Vox Chronomètre の独立研究ページも `/en/cyma-time-o-vox/chronometre/` で全文ローカライズする。

英語入口は `/en/`、`/en/history/`、`/en/owners-notes/`、`/en/how-they-ring/`、`/en/<watch>/` に置く。

`/en/` は日本語TOPと同じVINTAGE ALARMの入口構造だけを英語化する。英語化済みWATCH一覧はTOPへ埋め込まず、`/en/owners-notes/` に分離する。HOW THEY RINGも日本語正本のGONG / CASEBACK 2分類、FIG.01–04、実機音、録音条件、資料注記を同じ構造で公開する。

HISTORYのエピローグ `SMARTWATCH` も `/en/history/smartwatch/` へローカライズする。ただしこれは検索入口ではなくHISTORYの結びなので、`noindex,follow` を維持し、sitemap / llms.txt の公開インデックスには載せない。日本語版の画像内テキストをそのまま流用せず、意味・順序・温度を保った英語表示に置き換える。

## 現在の公開深度

### FULL RESEARCH

- Basis Alarm
- Pierce Duofon
- Cyma Time-O-Vox
- Citizen Alarm
- Westclox Watchlarm
- Wittnauer Cal.10WA

OWNER'S NOTE / SPEC / 実機鳴動に加え、掲載個体ギャラリー、DEEP DIVE、段落単位の出典、参考資料・出典、関連WATCHまで英語で提供する。

旧 `CONCISE ENTRY` は廃止。Basis Alarm / Citizen Alarm も日本語正本と同じ研究深度へ昇格する。

独立研究ページでは Cyma Time-O-Vox Chronomètre を EN / DE とも全文展開し、17件の観測個体、UNADJUSTED論点、外部照会、実機不具合観察まで日本語正本と同じ論理階層で保持する。

## なぜブラウザ翻訳だけにしないか

Chrome等のブラウザ翻訳は、ユーザーが日本語ページへ到達した後の読解補助として有効。ただし、VINTAGE ALARMが必要としているのは「到達前の英語検索・英語SNS共有・英語メタデータ」も含む。

Google Search Centralは、多言語版を提供する場合は言語ごとに別URLを使い、明示的なリンクや `hreflang` を使うことを推奨している。またGoogleはページ言語を可視本文から判断し、`lang`属性だけでは判定しない。

そのため、英語利用者向けの可視本文を持つ別URLを用意する。現行方針では、公開済みの所有6 WATCHはすべて完全なDEEP DIVEを英語化する。独立研究ページも、公開するものは同じ研究内容までローカライズする。

## 基本実装方針

英語入口ページに含める:

- 英語title / description / OGP
- `<html lang="en">`
- `CreativeWork` JSON-LD の `inLanguage: en`
- OWNER'S NOTEの英語テキスト
- 簡易操作ガイド
- SPEC
- 実機アラーム動画
- 日本語の完全研究ページへのリンク

全WATCHでさらに含める:

- 掲載個体ギャラリー
- DEEP DIVE全文
- DEEP DIVE内の機構画像・キャプション
- 段落ごとの出典番号
- 参考資料・出典
- 関連性で選ぶ次のWATCH

基本では行わない:

- DEEP DIVE全文の機械翻訳量産
- 資料・出典の無監査な自動再翻訳
- 英語SEO目的のFAQ量産
- IPやブラウザ言語による自動リダイレクト

## 翻訳の正本とrevision drift

英語版の絶対正本は日本語版とする。

日本語正本で、英語版にも存在する事実を修正した場合は、英語版も同じ変更単位で同期する。ページがCONCISE ENTRYであっても、その事実を掲載しているなら同期対象になる。

Pierce創業年の1888→1883修正で起きたようなrevision driftを再発させないため、共有事実は `src/data/localization-fact-sync.json` に登録し、`npm run check:localization-sync` でCI検証する。

資料差・異説・採択理由は本文へ編集会議口調で書かず、参考資料・RESEARCH NOTE・REVISIONへ分離する。

詳細は `strategy/localization-sync.md` を正本とする。

## 英語としての自然さ

日本語の意味・比喩・温度・確度を守るが、日本語特有の語を英語へ字面だけ移植しない。

- OWNER'S NOTEのコピーは英語として自然に読めることを確認する。
- 時計専門語は英語圏の時計記事・技術資料で通常使われる語を優先する。
- 自然さのために事実や比喩を追加・削除しない。
- 翻訳者は編集者にならない。

## URLと検索

- 日本語: `/<slug>/`
- 英語入口 / 英語版: `/en/<slug>/`
- 英語TOP: `/en/`
- 英語OWNER'S NOTES一覧: `/en/owners-notes/`

6 WATCHの日本語ページと英語URLは相互リンクし、`hreflang="ja" / "en" / "x-default"` を設定する。

英語URLはsitemapへ追加する。`public/llms.txt` には実際に公開されている英語URLだけを列挙する。

## ブラウザ翻訳の役割

ブラウザ翻訳は日本語原文を直接読みたい場合の補助として残すが、英語版の研究深度を補う代替手段にはしない。公開中の所有6 WATCHと公開中の独立研究ページは、英語URL側だけで内容を最後まで読める状態を基本とする。

## 2026-09-24｜Basis / Citizen / Chronomètre 用語準備

日本語正本を翻訳する前に、既存の英語時計記事・技術資料で自然な専門語を確認する。

| 日本語の概念 | 英語 |
| --- | --- |
| エボーシュメーカー | `ébauche manufacturer` |
| ピンレバー脱進機 | `pin-lever escapement` |
| 柱式構造 | `pillar construction` |
| 滑りクラッチ | `slipping clutch` |
| 巻上げ確認窓 | `winding-state window / indicator` |
| 二重裏蓋 | `double caseback` |
| 中央回転ディスク | `rotating centre alarm disc` |
| 調整刻印 | `adjustment marking` |
| Werk/Movement No. | `movement number` |
| クロノメーター証明 | `chronometer certification` |
| 現存個体 | `surviving / observed specimen` |
| 外部照会 | `archive / institutional inquiry` |

`UNADJUSTED`、`ADJUSTED TO FIVE POSITION(S) AND TEMPERATURE`、`CHRONOMÈTRE` は刻印・文字盤表記として原綴りを維持する。

## 計測

英語URLはVINTAGE ALARM ANALYTICSで独立Pathとして扱い、`(EN)`を付けて日本語WATCHと区別する。

成果は次を分けて観測する。

1. 英語URLがインデックス・表示されたか
2. 英語URLが入口になったか
3. 英語版から日本語版または別WATCHへ進んだか
4. 外部AIが英語版を発見・引用したか
5. 日本語版にあった事実・OWNER OBSERVATION・比喩・仮説の区別が英語回答でも保持されたか
6. 事実修正後にENだけ旧値が残っていないか

公開しただけで海外流入成功とは扱わない。
