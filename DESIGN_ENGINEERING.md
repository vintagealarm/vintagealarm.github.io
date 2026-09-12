# VINTAGE ALARM — Design Engineering v1

この文書は、VINTAGE ALARMの見た目・操作・motionを変更するときの設計監査基準である。  
記事内容、史料の扱い、サイト階層は `SITE_RULES.md` を優先する。

## 適用範囲

次の変更で適用する。

- レイアウト、情報密度、視覚階層、配色、余白、画像表示
- ナビゲーション、カード、ボタン、開閉UI、横スワイプ
- hover、press、transition、animation
- モバイル表示とアクセシビリティ

文章だけの修正、出典追加、メタデータ修正には、関係する表示確認だけを適用する。

## 変更前に固定するもの

実装前に次を短く定義する。

- 対象URLと対象要素
- 変更するファイル
- 変更しない要素
- 合格条件
- 実装済み / 検証済み / 公開済みのどこまで行うか

一つの不具合や記事追加を理由に、サイト全体を再設計しない。

## 3方向プロトタイプ

レイアウト、密度、性格、操作方法のいずれかを決め直す変更では、本番コードを作り込む前に3方向を比較する。

- 3案は、色や数pxだけを変えた同案反復にしない。
- 各案の違いを「何を変えた案か」一文で説明できる状態にする。
- 実際の本文・画像・想定文字量を使う。lorem ipsumや空のボタンで判断しない。
- 既存の色、書体、罫線、余白規則を土台にし、別サイトのような案を混ぜない。
- 本番ページとは分離した比較用surfaceに置き、URLまたは切替UIで実寸比較できるようにする。
- 390pxを主基準にし、必要に応じてdesktopも同時に確認する。
- 採用案が決まるまで共通componentや本番CSSへ昇格させない。
- 採用後は、保存指示がない限り比較用surfaceを削除する。

次は3案比較を省略してよい。

- 画像の見切れ、壊れた余白、誤色、リンク不良など、正解が一意な修正
- 既に採用済みの設計へ数値を合わせる調整
- 文言、出典、メタデータだけの変更

省略した場合は、何に合わせた修正かを示す。

## VINTAGE ALARMのmotion方針

サイトの基調は、静かな雑誌・資料閲覧である。動かせることを、動かす理由にしない。

motionを入れてよい目的は次に限る。

- 押下や選択への即時feedback
- 開閉、選択中、読込中などの状態変化
- 要素の出所や戻り先を示す空間関係
- 急な切替を読みやすくする補助

判断は頻度と目的で行う。

| 利用頻度 | 基準 |
| --- | --- |
| 常時・高頻度 | 原則として動かさない |
| ページ内で数回 | 短く小さなfeedbackに限る |
| 稀な状態変化 | 内容理解に必要なら標準motion可 |
| 物語表現・一度きり | ページの主旨に必要な場合のみ個別判断 |

SMARTWATCHなど、motion自体が表現内容の一部であるページは例外になり得る。ただし可読性、操作性、reduced motionを優先する。

## motion実装基準

- UI motionは原則300ms未満。
- 登場・表示は `ease-out` 系を基準とし、反応待ちに見える `ease-in` を使わない。
- `transition: all` を使わない。動かすpropertyを明記する。
- `scale(0)` から出現させない。必要なら小さな差のscaleとopacityを使う。
- `width`、`height`、`margin`、`padding`、`top`、`left` をanimationしない。
- 基本は `transform` と `opacity` を使う。
- 開閉UIは高さanimationを前提にしない。即時開閉、opacity補助、または構造自体の見直しを優先する。
- triggerから現れる要素は、triggerとの位置関係に合う `transform-origin` を使う。
- 連続操作されるUIは、途中で再操作しても現在位置から自然に反転・追従できるようにする。
- hoverによる変化は `@media (hover: hover) and (pointer: fine)` 内に置く。
- 押せる要素には必要に応じて、pointer-down時に `scale(0.97–0.99)` 程度の小さなfeedbackを与える。本文リンクや高頻度操作へ一律適用しない。
- 複数要素の登場を同時に派手に動かさない。順序が理解を助ける場合だけ短いstaggerを使う。

## reduced motionと入力方法

- `prefers-reduced-motion: reduce` を必ず確認する。
- reduced motionでは、移動、parallax、spring、overshootを外し、短いopacity変化または即時切替へ置き換える。
- hoverだけで情報や操作を提供しない。
- touch、keyboard、pointerのいずれでも状態が分かるようにする。
- focus表示を消さない。
- motionがなくても内容、順序、操作結果が理解できることを合格条件にする。

## 画像とcrop

画像は「枠に入っている」だけで合格にしない。

- 被写体の欠け、意図しない余白、中心ずれ、上下左右の見切れを実画像で確認する。
- `object-fit` だけで直ったと判断せず、container比率、`object-position`、元画像の余白を分けて確認する。
- 同列カードは、画像枠の高さだけでなく、被写体の見かけ上の大きさと基準線も比較する。
- mobileとdesktopで別cropが必要なら、同じ数値を無理に共用しない。
- screenshotで不具合を指摘された場合は、そのscreenshotの状態を再現できるまで「修正済み」としない。

## 文字組

- 日本語本文は `line-break: strict` / `word-break: normal` を基準にする。
- 見た目だけの改行目的で本文へ `<br>` を足さない。
- 文字サイズだけで階層を作らず、weight、line-height、spacingを組み合わせる。
- 大見出しと本文へ同じletter-spacingを一律適用しない。
- 320pxで文字や操作要素が押し出されないことを確認する。
- 文字サイズ変更時にも主要操作と本文が欠けないよう、固定高を避ける。

## 実寸監査

デザイン変更の完了条件は、build成功だけではない。

最低限、次を確認する。

1. 390pxで対象箇所を実寸確認
2. 320pxで横スクロール、欠け、重なりがないことを確認
3. desktopで意図しない引き伸ばしや空白がないことを確認
4. 対象componentの拡大画像と、ページ全体の両方を確認
5. press / focus / hover / 開閉 / swipeなど、変更した状態を実操作
6. reduced motionで内容と操作が成立することを確認
7. 既存ページへ意図しない共通CSS差分が出ていないことを確認

「コード上は正しい」「同じCSS値になった」だけで目視確認を代用しない。確認できていないviewportや状態は未確認と記録する。

## 判定

次が一つでも残る場合は、デザイン変更を検証済みにしない。

- 390pxまたは320pxで見切れ、横スクロール、重なりがある
- 本文や画像が途中で不自然に切れる
- motionの目的を説明できない
- 高頻度UIが不要に動く
- `transition: all`、`scale(0)`、layout propertyのanimationが残る
- reduced motion、touch、keyboardのいずれかが未確認
- prototypeの未採用案が本番経路に残る

## 出典と採用方針

この基準は、Emil Kowalskiの公開skillsにあるprototype比較、motionの頻度・目的、短いfeedback、reduced motion、実装監査の考え方を参照し、VINTAGE ALARMの既存ルールへ合わせて再構成した。

- https://github.com/emilkowalski/skills
- https://github.com/emilkowalski/skills/tree/main/skills/prototype
- https://github.com/emilkowalski/skills/tree/main/skills/emil-design-eng
- https://github.com/emilkowalski/skills/tree/main/skills/review-animations
- https://github.com/emilkowalski/skills/tree/main/skills/apple-design

外部skillを絶対規則として扱わない。外部資料間で基準が衝突する場合は、VINTAGE ALARMの可読性、既存設計、性能、アクセシビリティを優先し、この文書側で一つの基準へ解消する。
