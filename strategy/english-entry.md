# VINTAGE ALARM — English entry strategy

更新日: 2026-09-13

## 目的

英語版を「日本語サイトの完全複製」として作るのではなく、海外からの発見と初回理解を補う入口として実装する。

対象は現在公開済みの5 WATCH:

- Basis Alarm
- Pierce Duofon
- Cyma Time-O-Vox
- Citizen Alarm
- Westclox Watchlarm

英語入口は `/en/` と `/en/<watch>/` に置く。

## なぜブラウザ翻訳だけにしないか

Chrome等のブラウザ翻訳は、ユーザーが日本語ページへ到達した後の読解補助として有効。ただし、VINTAGE ALARMが必要としているのは「到達前の英語検索・英語SNS共有・英語メタデータ」も含む。

Google Search Centralは、多言語版を提供する場合は言語ごとに別URLを使い、明示的なリンクや `hreflang` を使うことを推奨している。またGoogleはページ言語を可視本文から判断し、`lang`属性だけでは判定しない。

そのため、英語利用者向けの可視本文を持つ別URLを用意する。一方、完全なDEEP DIVE翻訳までは複製せず、日本語の完全研究ページへ明示的に戻し、必要ならブラウザ翻訳を使って読める構造にする。

## 実装方針

英語入口ページに含める:

- 英語title / description / OGP
- `<html lang="en">`
- `CreativeWork` JSON-LD の `inLanguage: en`
- OWNER'S NOTEの英語テキスト
- 簡易操作ガイド
- SPEC
- 実機アラーム動画
- 日本語の完全研究ページへのリンク

含めない:

- DEEP DIVE全文の機械翻訳量産
- 資料・出典の自動再翻訳
- 英語SEO目的のFAQ量産
- IPやブラウザ言語による自動リダイレクト

## URLと検索

- 日本語: `/<slug>/`
- 英語入口: `/en/<slug>/`
- 英語一覧: `/en/`

5 WATCHの日本語ページと英語入口は相互リンクし、`hreflang="ja" / "en" / "x-default"` を設定する。

英語URLはsitemapへ追加する。

## ブラウザ翻訳の役割

ブラウザ翻訳を否定しない。役割を分ける。

- 英語入口: 発見、クリック、最初の理解、共有
- 日本語完全版 + ブラウザ翻訳: DEEP DIVE、資料差、長文研究を読む

これにより、5 WATCHの全文を二重管理せず、英語の入口だけを人手で品質管理できる。

## 計測

英語入口URLはVINTAGE ALARM ANALYTICSで独立Pathとして扱い、`(EN)`を付けて日本語WATCHと区別する。

成果は次を分けて観測する。

1. 英語URLがインデックス・表示されたか
2. 英語URLが入口になったか
3. 英語入口から日本語完全版へ進んだか
4. 日本語完全版から別WATCHへ進んだか

公開しただけで海外流入成功とは扱わない。
