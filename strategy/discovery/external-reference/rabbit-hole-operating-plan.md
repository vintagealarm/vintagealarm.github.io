# VINTAGE ALARM — Evidence-led discovery / rabbit-hole operating plan

更新日: 2026-09-24

> **内部運用メモ。サイト本文・営業文・SNS投稿で「rabbit hole」を標語として売り出さない。**
>
> ここでいう rabbit hole は、VINTAGE ALARMそのものを有名にする意味ではなく、**時計そのものの違和感から入り、実機・音・操作・機構・資料へ自然に深く潜れる状態**を指す内部略称。

## 1. 目的

VINTAGE ALARMの外向け目的は「サイトを宣伝すること」ではない。

最上位の目的は、まだ機械式アラーム腕時計を知らない人でも、

`違和感のある実物 → 音 / 操作 → 個体の背景 → 機構 → 資料 → 別の時計 / 外部資料`

まで必要に応じて辿れる経路を増やすこと。

VINTAGE ALARMは終着点ではなく、**実機と証拠へ接続する中継点**として働く。

外部参照施策の正本は `strategy/external-reference-outreach.md`、計測定義の正本は `measurement/metrics.md`、実測結果は `measurement/experiment-log.md` とする。この文書へ短期のアクセス数や投稿数値は重複保存しない。

## 2. 外向けにやらないこと

- 「VINTAGE ALARMというサイトを作りました」を主語にした宣伝
- サイト知名度、フォロワー数、被リンク数そのものを目的化
- `リンクしてください` から始める営業
- 相互リンク営業
- AI / SEO / AIOを営業文句にする
- 複数媒体へ同じ紹介文を一斉送信する
- WATCH本文が未監査のまま外部へ持ち込む
- 研究よりブランド名を前に出す
- 外部掲載を「権威付け」として逆輸入する

**売るのはVINTAGE ALARMではなく、時計に残っている未解決の現象・実機観察・資料。**

## 3. 外へ出すもの

外部発見の入口は「情報量」ではなく、まず具体的な現象にする。

例:

- 2種類の知らせ方を機械だけで切り替える Pierce Duofon
- Chronomètre表記と実機・資料差が同居する Cyma Time-O-Vox
- 1香箱で時計とアラームを共有する R.464
- 0石でもアラーム腕時計として成立する Westclox Watchlarm
- 腕時計に見えるが、時計分類そのものを問い直したくなる個体

SNS / コミュニティ / メディア / DBのいずれでも、最初に提示するのは**時計・資料・観察結果**とする。

サイトURLは、その続きを確認するために必要な場合だけ添える。

## 4. 「rabbit hole」の成立条件

次の順番が一本でも実測できれば、rabbit-hole経路が成立したと扱う。

1. **DISCOVERY** — 時計や現象を外部で発見する
2. **INTEREST** — 音・操作・問いに反応する
3. **ENTRY** — VINTAGE ALARMの該当ページへ入る
4. **DEPTH** — 実機・機構・資料まで読む / 聴く
5. **NEXT INTEREST** — 関連WATCH、HOW THEY RING、HISTORY、外部資料のいずれかへ進む
6. **EVIDENCE ROUTE OPENED** — 従来なかった証拠への経路が外部にも成立する

PVの増加だけでは成立判定しない。

## 5. 現在の作戦順序

### Phase A — EN / DEを「ある」ではなく「最後まで読める」にする

外部へ持ち出す前に、公開対象の多言語版を全実装し、**ページが存在することと翻訳が完成していることを分けて検証する**。

対象:

- EN / DE TOP
- EN / DE HISTORY
- EN / DE OWNER'S NOTES一覧
- EN / DE HOW THEY RING
- 所有6 WATCHの EN / DE FULL RESEARCH
  - Basis Alarm
  - Pierce Duofon
  - Cyma Time-O-Vox
  - Citizen Alarm
  - Westclox Watchlarm
  - Wittnauer Cal.10WA
- 公開する独立研究ページ
  - Cyma Time-O-Vox Chronomètre

### Phase B — 多言語の完成度判定

「全翻訳実装済み」を、ファイル数やroute数だけで判定しない。

各言語版について以下が揃った時だけ **LOCALIZATION READY** とする。

- 日本語正本の意味・構成・温度・断定度を保持
- OWNER'S NOTE / SPEC / DEEP DIVE / SOURCESの役割が保持
- 事実の追加・削除・編集的再構成がない
- 段落単位のcitation対応が維持
- 実機画像、音、操作ガイド、関連WATCHが欠落していない
- EN / DEの共有事実が `localization-fact-sync` と一致
- 既知の旧値が翻訳側だけ残っていない
- `hreflang` / sitemap / llms.txt / Analytics mappingが公開実体と一致
- build / localization coverage / localization sync / layout / live gateを通過
- ドイツ語は必要箇所で逆翻訳監査
- 英語は時計専門語・自然さを監査
- 公開live上で最後まで読める

**IMPLEMENTED / VERIFIED / DEPLOYED を混同しない。**

### Phase C — WATCHごとに営業可能性を判定

サイト全体を一括で「営業可能」とは判定しない。

各WATCH / 各論点を次の状態で管理する。

1. **RESEARCH READY**
   - 本文、出典、RESEARCH NOTE / REVISIONが現行
2. **LOCALIZATION READY**
   - 必要なEN / DE版が完成・公開・同期済み
3. **OUTREACH READY**
   - 相手へ渡す一次資料 / 専門資料の該当箇所が特定済み
   - VINTAGE ALARMにしかない補完価値を1文で説明可能
   - 既知の誤り候補を未処理のまま残していない
   - 現行hostだけを使用
4. **CONTACTABLE**
   - 先方の現行ページ / 投稿ルール / 窓口を再確認済み
   - 「何を補完できるか」が先方の文脈に合わせて具体化済み

%スコアは原則使わない。弱点を平均点で隠さないため、必要条件を満たしたかで判定する。

### Phase D — 小さく外へ出す

最初からサイト全体を売り込まない。

現行の順序は `strategy/external-reference-outreach.md` を正本とする。

初手は、条件を満たした場合のみ **Watch Movements Archive / Cyma R.464 の1件**。

その後:

- Watch-Wiki / Ranfft — データ改善参加
- Fratello — BFG 90資料パック
- Grail Watch — Pierce一次資料パック
- NAWCC — 独立した研究成果として成立する題材
- メーカー / Heritage — 後段

一度に複数ページ・複数媒体へ広げない。

## 6. 投稿・コミュニティ運用

### 原則

**サイト紹介ではなく時計を投げる。**

入口にするのは、

- 「なぜこうなっている？」
- 「この操作は何をしている？」
- 「同じアラーム腕時計なのに、なぜ音が違う？」
- 「資料と実機が一致しないのはなぜ？」
- 「これは腕時計と呼んでよいのか？」

等の、実物から自然に出る問い。

URLは答えを独占するためではなく、**観察記録・音・写真・資料をまとめて確認する場所**として添える。

### 参加型調査

「情報ください」は営業ではなく研究協力の募集として使う。

条件:

- 欲しい情報を具体化する
- 何が未確認なのかを明示する
- 所有者へ結論を誘導しない
- 写真 / movement number / 広告 / parts list等、必要な証拠を具体化する
- 提供情報は確認前に事実化しない

閲覧者が資料提供者・実機提供者へ変わることは、rabbit-hole運用の重要な成果とする。

## 7. 施策効果の見る順番

### Discovery / SNS / Search

`表示 → 反応 → Link Click → Entry Visit → Entry Page → Next Interest`

X側指標とCloudflare Visitsを1対1で同一視しない。

### External reference outreach

`OUTREACH READY → CONTACTED → ACKNOWLEDGED → USED → LINKED → REFERRED VISIT → DISCOVERY EFFECT`

ただし最上位は `LINKED` ではなく **EVIDENCE ROUTE OPENED**。

`USED` だけでも、外部側の情報が改善され証拠へ近づけるなら成功になり得る。

## 8. 改善判断

外部発見が弱い時に、即座にサイト本文を増やさない。

診断順序:

1. 時計 / 現象自体が発見されたか
2. 興味反応はあったか
3. リンクが押されたか
4. サイトへ到達したか
5. 狙ったページへ入ったか
6. 既存の次導線を使ったか
7. どこで落ちたかが分かってから、その層だけ修正

既存のWATCH最下部やHOW THEY RING等に導線が存在する場合、まず**使われたかを測る**。観測前に導線追加へ走らない。

## 9. 現時点での完了条件

この作戦を「営業開始可能」と呼ぶには、最低限次を満たす。

- EN / DE公開対象の全実装
- localization coverage / syncの検証
- liveで主要言語導線を確認
- WATCHごとのRESEARCH READY判定
- 最初の営業対象1件がOUTREACH READY
- 先方現行ページ / 窓口を接触直前に再確認
- 営業文が「サイト紹介」ではなく、先方へ渡す資料・観察結果を主語にしている

ここまで揃って初めて外部接触へ進む。

## 10. 判断を変える条件

次の場合はこの作戦を再評価する。

- 多言語化したことでrevision driftが管理不能になる
- 外部接触で「サイト宣伝」と受け取られる事例が続く
- 外部資料へ実質的な補完価値を提供できていない
- SNSで興味反応は出るが、どの題材でもサイト到達が継続して成立しない
- 次ページ導線が十分表示されているのに、複数実験で回遊が成立しない
- 外部の研究者・コレクターから、より有効な資料共有経路が提示される

その場合も、PVや被リンクを増やす方向へ自動で寄せず、**証拠へ辿れる経路を増やすという上位目的**から再設計する。
