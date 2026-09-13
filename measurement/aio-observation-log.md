# VINTAGE ALARM — 外部AI参照観測ログ

更新日: 2026-09-13

このファイルは、外部AIがVINTAGE ALARMを発見・参照・引用した観測事実を、会話記憶ではなく時点付きで残すためのログ。

## 記録ルール

- `確認済み`、`推論`、`未確認`を混ぜない。
- AI回答に表示されたソース順を、検索順位・信頼度順位・寄与度順位と同一視しない。
- 「検索ツールを使った」ことと「会話文脈の影響がない」ことを同一視しない。
- 同一スレッド内でVINTAGE ALARMを先に提示したテストは、コールドスタート検証として扱わない。
- 新規会話での再現は会話内プライミングを弱めるが、同一アカウントの過去履歴・個人化など製品内部要因までは外部から排除できない。
- AIが生成した歴史記述は、そのAIがVINTAGE ALARMを引用していてもVINTAGE ALARM側の確定事実として逆輸入しない。

## 2026-09-13｜Grok｜Pierce Duofon｜新規会話テスト

### 条件

ユーザーがGrokで新しい会話を作成。

入力:

`duofon の時計について教えて`

この新規会話の入力では、VINTAGE ALARM、URL、Cal.135、WECKER / SIGNAL等を事前提示していない。

### 確認済み

ユーザー提供スクリーンショット（15:35〜15:36 JST）で以下を確認。

- Grok回答の冒頭説明に、`vintagealarm...` のインライン引用表示が出た。
- 回答本文でPierce Duofonを2段階アラームとして説明し、WECKER / SIGNALを扱っていた。
- 回答末尾で、操作方法の詳細や実機の写真・音源の参照先として `vintagealarm.github.io` のPierce Duofonページを明示した。
- Grokの画面には `39 情報源` と表示された。
- `引用済み` タブに表示された引用先は、スクリーンショット上では次の2件。
  1. `Pierce Duofon | Cal.135・2段階アラーム・実機音 | VINTAGE ALARM` — `vintagealarm.github.io`
  2. `History of the Pierce brand | A La Clinique Horlogère...` — `cliniquehorlogere.ch`
- `引用済み` タブではVINTAGE ALARMが先頭に表示された。

### この観測から言えること

- 少なくともこの新規会話では、GrokがPierce Duofon回答の引用元としてVINTAGE ALARMを取得・表示した。
- 同一スレッド内で直前にVINTAGE ALARMを教えたことによる会話内プライミングだけでは説明できない再現例が得られた。
- VINTAGE ALARMは「検索結果に存在した」だけでなく、Grok回答内の引用元・追加参照先として使われた。

### この観測だけでは言えないこと

- `引用済み` の表示順が、検索順位・信頼度・回答寄与度の順位である。
- Grok内部検索でVINTAGE ALARMが常に1位または2位である。
- 同一Grokアカウントの過去会話・個人化等が一切影響していない。
- Grokが生成した各歴史説明がVINTAGE ALARMの記述を正確に保持している。

### 意味保持リスク

Grok回答では、Duofonを現代スマートフォンの「マナーモード」やバイブレーション通知の祖先とする趣旨や、年代を強く断定する表現が生成された。

VINTAGE ALARM側のキャッチ、編集的比喩、史実、資料由来の事実は区別して扱う。外部AIが引用したからといって、そのAIが強めた表現をサイト側の確定事実へ戻さない。

## 2026-09-13｜Grok｜Cyma Time-O-Vox｜文脈あり観測

### 条件

Pierce DuofonおよびVINTAGE ALARMについて直前の会話文脈がある状態でCyma Time-O-Voxを質問。

### 確認済み

ユーザー提供スクリーンショットで、Grokのソース一覧に以下が表示された。

- Grail Watch Wiki
- VINTAGE ALARM — `Cyma Time-O-Vox 18K Chronomètre | Cal.R.464・1香箱 | VINTAGE ALARM`
- Shellman
- Grail Watch Reference
- Relojes Especiales
- HODINKEE Shop ほか

VINTAGE ALARMはスクリーンショット上で2番目に表示された。

### 判定

外部AIがCymaページを取得候補・参照候補として認識していることは確認できる。

ただし、このテストは直前の会話でVINTAGE ALARMを扱っているため、コールドスタート再現としては使わない。表示順も検索順位とは扱わない。

## 次の再現テスト

公開済み5 WATCHについて、新規会話でサイト名を提示せず同じ粒度の質問を行う。

- Basis Alarm
- Pierce Duofon
- Cyma Time-O-Vox
- Citizen Alarm
- Westclox Watchlarm

記録項目:

1. VINTAGE ALARMが発見されたか
2. 回答本文で引用されたか
3. `引用済み` に出たか
4. どの記述がVINTAGE ALARM由来として使われたか
5. 事実・OWNER OBSERVATION・比喩・仮説の意味が保持されたか
6. 別セッションでも再現したか

結果が出るまでは「Grokで常に引用される」「AIOで上位」等とは表現しない。
