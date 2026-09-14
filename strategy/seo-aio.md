# VINTAGE ALARM — SEO / AIO運用方針

更新日: 2026-09-14

## 目的

このサイトの目的は、検索流入の最大化そのものではない。

OWNER'S NOTE、X、YouTube、検索を入口に、ヴィンテージ機械式アラーム腕時計へ興味を持つ人を増やし、実機・機構・歴史・資料へ進めることを目的とする。

## 優先順位

1. 完成したWATCHページの品質を維持する
2. 既存ページが検索・SNS・AI検索から発見可能な状態か確認する
3. 流入後に、実機・音・写真・資料へ自然に進めるか確認する
4. 不足が観測された場合のみ、既存ページを改善する
5. 新規ページは、既存ページでは答えられない独立したテーマがある場合に作る

## やらないこと

- Calibre DB化
- ブランド百科事典化
- FAQの大量生成
- 市区町村や検索語だけを差し替えたページ量産
- SEO目的だけの本文追記
- 完成済みOWNER'S NOTEの検索向け改稿
- 根拠のない検索ボリューム・順位・AI引用率の推定
- DEEP DIVEや資料欄の機械翻訳による大量複製

## VINTAGE ALARMの独自情報

一般的な「Pierce Duofonとは何か」だけで競わない。

優先する独自情報は以下。

- 所有実機
- 実機写真
- リストショット
- 操作状態の写真
- 実機鳴動
- 操作方法
- ムーブメント観察
- 一次資料・専門文献
- 資料間の差
- OWNER'S NOTEとしての現代的な入口

## SEOとAIO

SEO:
- 通常検索でページが発見され、クリックされる状態を整える。

AIO:
- 生成AIの回答でページや内容が参照・紹介される可能性を高める。
- ただし、AI回答で概要を理解した人がさらに訪れる理由を残す。
- AIが引用したことと、回答内で事実・OWNER OBSERVATION・比喩・仮説の意味を正しく保持したことは別に評価する。

AIOのためだけにllms.txt、機械的なQ&A分割、本文の細切れ化は行わない。

外部AI観測の判定基準と実測ログは `measurement/discovery-v3.md` と `measurement/aio-observation-log.md` を正本とする。

## Source Traceability / 出典追跡性改善

この施策の目的は、AI引用率を上げることではなく、**読者が「この記述はどの資料のどこに基づくか」を自分で追跡・検証できる状態を作ること**。

初期実装はHorlbeck / Beitlの2冊に限定する。巨大な文献DBや全資料カード化へ拡張しない。

SOURCEカードに持たせる情報:
- 書名
- 著者
- 刊行年
- 出版社 / 発行者
- ISBN（資料そのもの、出版社等で確認できる場合のみ）
- VINTAGE ALARM内での主な参照範囲
- Amazon等の入手リンクは `入手先` と明示し、史実の根拠・一次資料リンクとして扱わない

HISTORY本文は全脚注化しない。次のような、検証されやすく事実関係の精度が重要な主張だけを、該当ページまたは一次資料へ直接紐付ける。
- 年代
- 特許番号
- 「世界初」等の優先権主張
- キャリバー
- 発売 / 登場年
- 資料間で差が出やすい仕様・系譜

実装思想:
- 「VINTAGE ALARMが正しいから信じる」ではなく、「根拠資料と参照箇所を示し、必要なら読者自身が確認できる」にする。
- SOURCEカードは本文を論文化するためのものではない。HISTORYの可読性を維持する。
- 既存WATCHの高密度な出典・OWNER OBSERVATION構造を、理由なく全面改修しない。
- Amazon等の購入先追加だけで出典追跡性が改善したとは扱わない。
- この施策を `AIO強化` と呼ばない。AI側の引用精度・意味保持・発見性への効果は、実装後に別途観測する。
- 実装したことをAI露出改善の成果と扱わない。

確認済み初期メタデータ:
- Michael Philip Horlbeck, *The Alarm Wristwatch: The History of an Undervalued Feature*, Schiffer Publishing Ltd., 2007, ISBN 978-0-7643-2644-8
- Leonhard Beitl, *Alarm am Arm*, Wien, 2009. 発行者: Leonhard Beitl（Wien）。ISBNは現時点で手元資料から未確認

## 英語入口

海外向けは日本語サイト全体を複製せず、`/en/` と `/en/<watch>/` を発見・初回理解の入口として使う。

英語入口に置くもの:
- 英語のtitle / description / OGP
- OWNER'S NOTEの英語テキスト
- 操作ガイド
- SPEC
- 実機鳴動
- 日本語の完全研究ページへの明示リンク

役割分担:
- 英語入口 = 英語検索・英語SNS共有・初回理解
- 日本語完全版 + ブラウザ翻訳 = DEEP DIVE・資料差・長文研究の読解

公開しただけで海外布教成功とは扱わない。英語URLのImpressions / Entry Visits、日本語完全版への遷移、さらに別WATCHへの遷移を観測する。

詳細は `strategy/english-entry.md` を参照する。

## 現在の基準実験 — Pierce Duofon

Pierce Duofonを、完成済みWATCHページの基準個体として扱う。

観測するもの:
- X既存投稿からのサイト流入
- Google / Bingなど検索からの流入
- Duofonページの入口数
- 国別流入
- Google Imagesなど画像検索での露出
- `duofon` / `pierce duofon` / `pierce 135` の検索上の変化
- 外部AIが新規会話でもDuofonページを発見・引用するか
- 外部AIがキャッチコピーや編集的比喩を史実へ強めていないか

重要:
- X投稿の順位とサイト本体の順位は別指標。
- Xからの流入増加を検索流入増加として扱わない。
- 検索露出増加を来訪増加として扱わない。
- 来訪増加を「ヴィンテージアラームへの関心増加」と即断しない。
- AIソース表示順を検索順位・信頼度順位として扱わない。

## 現行のチャネル別観測対象

- Pierce Duofon: Search / External AI
- Basis Alarm: YouTube Shorts / X / site entry
- Cyma Time-O-Vox: X / Search
- English gateways: overseas search / social discovery / EN → JP research transition

各チャネルの実測値・時点付き状態は `measurement/experiment-log.md` を参照する。

## 状態の正本

古い会話要約や記憶から、過去の「未実装」「待ち」「予定」を現在状態へ持ち込まない。

優先順位:

1. 実装状態 = GitHub `main`
2. 計測・実験結果 = `measurement/experiment-log.md` / `measurement/aio-observation-log.md`
3. 方針 = `strategy/*.md` / `measurement/*.md`
4. 会話記憶 = 参照候補に留め、上記と衝突したら採用しない

時点が異なる記録は誤資料として消さず、観測日時を付けて過去状態として扱う。

## 改善判断

変更前に次を確認する。

- 観測事実
- 原因仮説
- 別の説明
- 追加確認
- 採否
- 判断を変える条件

一度に大きく変えず、何が効いたか追える単位で変更する。

## 発見性の診断順序

改善判断は以下の順にドリルダウンする。

1. 発見されたか
   - 通常検索Impressions
   - Google生成AI Impressions
   - SNS Impressions
   - External AI source/citation observation
2. クリックされたか
   - Search Clicks / CTR
   - SNS Link Clicks
3. サイトへ到達したか
   - Search / X / YouTube / AI ReferrerのEntry Visits
4. 狙ったページへ入ったか
   - Entry Page
5. 次の興味へ進んだか
   - refererPath → requestPath
6. 落ちた場合のみ原因を掘る
   - Query / Page / Position / CTR
   - Campaign / Referrer
   - Device / Country
   - Raw / Mapping / Bot疑い
   - AI citation / semantic fidelity

「順位が落ちた」「GEOが伸びた」「海外流入が成功した」などの結論を、単一指標だけで出さない。