# VINTAGE ALARM — English entry strategy

更新日: 2026-09-24

## 目的

英語版は海外からの発見と初回理解だけでなく、日本語正本と同じ研究層まで読める公開版として実装する。

公開WATCH 6本はすべて英語でも `FULL RESEARCH` を持つ。

- Basis Alarm
- Pierce Duofon
- Cyma Time-O-Vox
- Citizen Alarm
- Westclox Watchlarm
- Wittnauer Cal.10WA

また、独立RESEARCHとして公開している `/cyma-time-o-vox/chronometre/` も `/en/cyma-time-o-vox/chronometre/` へ同じ研究深度で展開する。

英語入口は `/en/`、`/en/history/`、`/en/owners-notes/`、`/en/how-they-ring/`、`/en/<watch>/` に置く。

`/en/` は日本語TOPと同じVINTAGE ALARMの入口構造だけを英語化する。英語化済みWATCH一覧はTOPへ埋め込まず、`/en/owners-notes/` に分離する。HOW THEY RINGも日本語正本のGONG / CASEBACK 2分類、FIG.01–04、実機音、録音条件、資料注記を同じ構造で公開する。

## 現在の公開深度

### FULL RESEARCH — WATCH 6本

- Basis Alarm
- Pierce Duofon
- Cyma Time-O-Vox
- Citizen Alarm
- Westclox Watchlarm
- Wittnauer Cal.10WA

各WATCHはOWNER'S NOTE / SPEC / 実機鳴動に加えて、掲載個体ギャラリー、DEEP DIVE、段落単位の出典、参考資料・出典、関連WATCHまで英語で提供する。

### FULL RESEARCH — 独立RESEARCH

- Cyma Time-O-Vox Chronomètre

17件の観測個体、文字盤表記・調整刻印・Movement No.帯・ケースコード、MIH / Neuchâtelへの照会、UNADJUSTEDの制度背景、掲載個体の実機観察まで日本語正本と同じ研究層を英語化する。

`CONCISE ENTRY` は旧運用とし、新規公開・既存WATCHとも詳細版を標準とする。

## なぜブラウザ翻訳だけにしないか

Chrome等のブラウザ翻訳は、ユーザーが日本語ページへ到達した後の読解補助として有効。ただし、VINTAGE ALARMが必要としているのは「到達前の英語検索・英語SNS共有・英語メタデータ」も含む。

Google Search Centralは、多言語版を提供する場合は言語ごとに別URLを使い、明示的なリンクや `hreflang` を使うことを推奨している。またGoogleはページ言語を可視本文から判断し、`lang`属性だけでは判定しない。

そのため、英語利用者向けの可視本文を持つ別URLを用意する。現在は公開WATCH 6本と、独立RESEARCHのCyma Time-O-Vox Chronomètreを詳細版まで英語化する。

## 基本実装方針

英語WATCHページに含める:

- 英語title / description / OGP
- `<html lang="en">`
- `CreativeWork` JSON-LD の `inLanguage: en`
- OWNER'S NOTEの英語テキスト
- 簡易操作ガイド
- SPEC
- 実機アラーム動画
- 日本語正本への言語リンク
- 掲載個体ギャラリー
- DEEP DIVE全文
- DEEP DIVE内の機構画像・キャプション
- 段落ごとの出典番号
- 参考資料・出典
- 関連性で選ぶ次のWATCH

独立RESEARCHも同様に、本文・観測表・資料差・未解決事項・出典まで省略しない。

旧 `CONCISE ENTRY` から詳細版へ昇格するときに含めるもの:

- 日本語正本に存在する研究本文
- 資料差・留保・OWNER OBSERVATION
- そのページ固有の画像・出典対応

基本では行わない:

- DEEP DIVE全文の機械翻訳量産
- 資料・出典の無監査な自動再翻訳
- 英語SEO目的のFAQ量産
- IPやブラウザ言語による自動リダイレクト

## 翻訳の正本とrevision drift

英語版の絶対正本は日本語版とする。

日本語正本で、英語版にも存在する事実を修正した場合は、英語版も同じ変更単位で同期する。ページ深度にかかわらず、その事実を掲載している言語版は同期対象になる。

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

ブラウザ翻訳を否定しない。役割を分ける。

- FULL RESEARCH: VINTAGE ALARMが英語で直接提供する研究本文
- 日本語正本 + ブラウザ翻訳: 日本語原文そのものを読みたい場合の補助

WATCHの短縮版は残さず、公開済み研究は英語でも研究層まで追える状態を維持する。

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


## 2026-09-24｜Basis / Citizen / Chronomètre 用語準備

詳細版実装前に、日本語正本と専門資料を突き合わせ、英語本文で使う語を先に固定した。

### Basis Alarm / BFG 90

| 日本語の概念 | 英語運用 |
| --- | --- |
| 柱式構造 | `pillar construction` |
| ピンレバー脱進機 | `pin-lever escapement` |
| 2香箱 | `two barrels` / `separate barrels for timekeeping and the alarm` |
| 滑りクラッチ | `sliding clutch` |
| 巻上げ表示窓 | `winding-indicator windows` |
| 巻上げ表示 | `winding indicator`。残量を示す `power-reserve indicator` とは区別する。 |
| 回転ベゼル | `rotating bezel` |
| ON/OFFスライダー | `ON/OFF slider` |
| 底部ベル | `bottom bell`。HOW THEY RINGの大分類とは別にSPEC上の機構記述として使う。 |

Horlbeck英語版の `hook anchor` は資料表現として保持できるが、現代の時計英語本文では日本語正本の「ピンレバー」に対応する `pin-lever escapement` を優先する。

### Citizen Alarm / Cal.980

| 日本語の概念 | 英語運用 |
| --- | --- |
| 国産初 | `Japan's first domestically produced ...` とし、世界初へ拡張しない。 |
| 中央回転ディスク | `rotating centre alarm disc` |
| 2リューズ | `twin crowns` / `two crowns` |
| 二重裏蓋 | `double-caseback construction` |
| 4針式 | `Four Hands`（モデル表現） / `four-hand version`（一般説明） |
| AS 1475との関係 | `Beitl raises the possibility ...` とし、licensed copyを確定事実にしない。 |
| ルクルトからのクレーム説 | `story / legend` とし、未確認のまま保持する。 |

### Cyma Time-O-Vox Chronomètre

| 日本語の概念 | 英語運用 |
| --- | --- |
| クロノメーター試験 | `chronometer testing` / `tested as a chronometer` |
| クロノメーター証明 | `chronometer certification` / `chronometer certificate` |
| 5姿勢・温度 | `five positions and temperature`。刻印そのものは原文表記を保持する。 |
| 調整刻印 | `adjustment marking / engraving` |
| 観測個体 | `observed specimen / observed watch` |
| Movement No.帯 | `movement-number range` |
| 外部照会 | `archive inquiry` / `institutional inquiry` |
| 認定記録 | 文脈に応じ `certification record` / `test record` |
| UNADJUSTED | 刻印なので大文字のまま保持する。 |

翻訳では `CHRONOMÈTRE`、`ADJUSTED TO FIVE POSITION(S) AND TEMPERATURE`、`UNADJUSTED` など個体上の表記を正規化しない。
