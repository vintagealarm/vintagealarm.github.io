# VINTAGE ALARM — English entry strategy

更新日: 2026-09-15

## 目的

英語版を「日本語サイトの完全複製」として一括生成するのではなく、海外からの発見と初回理解を補う入口として実装する。

対象は現在公開済みの5 WATCH:

- Basis Alarm
- Pierce Duofon
- Cyma Time-O-Vox
- Citizen Alarm
- Westclox Watchlarm

英語入口は `/en/` と `/en/<watch>/` に置く。

## 現在の公開深度

### FULL RESEARCH

- Pierce Duofon
- Cyma Time-O-Vox
- Westclox Watchlarm

これらはOWNER'S NOTE / SPEC / 実機鳴動に加えて、掲載個体ギャラリー、DEEP DIVE、段落単位の出典、参考資料・出典、関連WATCHまで英語で提供する。

### CONCISE ENTRY

- Basis Alarm
- Citizen Alarm

これらはOWNER'S NOTE、簡易操作ガイド、SPEC、実機鳴動を英語で提供し、完全な研究本文は日本語版を正本として残す。

英語版は全WATCHを同じ深度へ揃えること自体を目的にしない。`FULL RESEARCH` と `CONCISE ENTRY` の併存は意図的な公開戦略であり、短縮版であることと、事実が古いことを混同しない。

## なぜブラウザ翻訳だけにしないか

Chrome等のブラウザ翻訳は、ユーザーが日本語ページへ到達した後の読解補助として有効。ただし、VINTAGE ALARMが必要としているのは「到達前の英語検索・英語SNS共有・英語メタデータ」も含む。

Google Search Centralは、多言語版を提供する場合は言語ごとに別URLを使い、明示的なリンクや `hreflang` を使うことを推奨している。またGoogleはページ言語を可視本文から判断し、`lang`属性だけでは判定しない。

そのため、英語利用者向けの可視本文を持つ別URLを用意する。一方、5 WATCHすべての完全なDEEP DIVEを一括複製せず、完全版へ昇格するWATCHは資料価値・実機価値・海外での不足情報を見て個別に選ぶ。

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

FULL RESEARCHへ昇格するWATCHではさらに含める:

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
- 英語一覧: `/en/`

5 WATCHの日本語ページと英語URLは相互リンクし、`hreflang="ja" / "en" / "x-default"` を設定する。

英語URLはsitemapへ追加する。`public/llms.txt` には実際に公開されている英語URLだけを列挙する。

## ブラウザ翻訳の役割

ブラウザ翻訳を否定しない。役割を分ける。

- CONCISE ENTRY: 発見、クリック、最初の理解、共有
- FULL RESEARCH: VINTAGE ALARMが英語で直接提供する研究本文
- 日本語完全版 + ブラウザ翻訳: 日本語原文を読みたい場合、またはCONCISE ENTRYしかないWATCHのDEEP DIVE・資料差・長文研究を読む場合

これにより、5 WATCHの全文を二重管理せず、必要なWATCHだけ段階的にFULL RESEARCHへ昇格できる。

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
