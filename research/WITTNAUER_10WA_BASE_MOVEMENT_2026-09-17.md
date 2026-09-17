# Wittnauer 10WA — Base movement / patent research update

更新日: 2026-09-17
対象branch: `content/wittnauer-10wa`
対象PR: #44

この文書は、2026-09-17に追加で行った Cal.10WA のベースムーブメント同定・特許・実機分解記録に関する調査メモ。
既存の `research/WITTNAUER_10WA_LEDGER.md` を置き換えず、今回の追加調査だけを保存する。

## 今回の結論

ベースムーブメントについては、引き続き断定しない。

- Horlbeck / Beitl は 10WA の時刻側を Longines 系手巻きベースとして直接記述する。
- 一方、修理・部品資料をつなぐと 10WA と Wittnauer 10S の強い共通性が見え、AWI はその 10S を AS 1200 と明記する。
- Paulson の1950年ムーブメント同定カタログには `A. SCHILD 1200 / WITT 11P` の対応が見える。ただし、これは10WAそのものをAS1200と直接同定する記載ではない。
- 10WAを実際に分解した筆者から、一般的なAS1200とはガンギ受け・輪列受けの形状が微妙に異なるという観察が追加された。
- よって現在位置は「Longines直接記載 vs AS1200系の部品・技術資料上の接続 vs 実機形状の完全一致ではない」という三者の緊張関係。

## 1. Longines説 — 専門書が直接そう書く

### Michael Philip Horlbeck, *The Alarm Wrist Watch* (2007)

10WAを modular caliber と説明し、時刻側を hand-wound Longines caliber とする。
これは部品互換からの推論ではなく、専門書本文の直接記載。

### Leonhard Beitl, *Alarm am Arm* (2009)

10WAについて `Longines-Basiskaliber` と記述し、Longines手巻きムーブメント＋独立アラームモジュールという説明を採る。
これも直接記載。

### HODINKEE, 2025

2025-08-15の記事では、10WAを Longines Cal.10 を土台にした modular alarm movement と説明する。
ただし、これは後年の記事であり、Horlbeck / Beitl と同じ重みの独立一次根拠とは扱わない。

URL: https://www.hodinkee.com/articles/bring-a-loupe-august-15-2025

## 2. AS1200系説 — 一冊に直接「10WA = AS1200」とあるのではなく、資料をつなぐ

### C. & E. Marshall, *Handy Manual* (1966)

修理業者向けの部品資料。
10WA と Wittnauer 10S は、時刻側の主要修理部品で大きく重なる。
今回の調査で重視した共通部品は、主ゼンマイ、天真、巻真、振り座、アンクル真など。
10WAには、これとは別にアラーム用ゼンマイが設定される。

ここから直接言えるのは、`10WAの時刻側が10Sと非常に近い` まで。
この資料だけではまだ AS1200 とは言えない。

URL: https://www.phfactor.net/wtf/Marshall%20Handy%20Manual/Marshall%202.pdf

### American Watchmakers Institute, Technical Bulletin / AWI News (1969)

時計技術者向け専門団体の技術資料。
実験対象を `Wittnauer 10S (AS 1200)` と明記する。

ここで初めて、Marshallの `10WA ↔ 10S` と、AWIの `10S = AS1200` がつながる。

推論の鎖:

`10WA` → Marshallで10Sと主要時刻側部品が共通 → `10S` → AWIが `AS1200` と明記 → `10WAの時刻側はAS1200系と強く結び付く`

URL: https://www.awci.com/wp-content/uploads/2018/01/10-1969-AWI-News.pdf

### Bestfit / 部品互換情報

AS1200用の setting bridge 445/654 や巻真などで、Wittnauer 10S / 10SC / 10WA が同じ互換対象に現れる。
これは「ネジ一本が偶然共通」より強い補助材料だが、互換性だけで `10WA = AS1200` と断定しない。

例:
https://www.timeconnectioninc.com/products/set-bridge-445-654

## 3. Paulson 1950 — 何の資料で、何が分かるか

Henry Paulson & Co. (Chicago) の *Paulson's Master Key Swiss Movement Catalog*、1950年版。
時計修理業者がスイス製ムーブメントを見分けるための同定カタログで、3,500点超のムーブメント図版を収録するとされる。

FHF氏が2024年のX投稿で示した図版には `A. SCHILD 1200 / WITT 11P` とある。

ここから言えるのは、1950年のPaulson同定資料上で AS1200 と Wittnauer の自社キャリバー名が対応づけられていること。
ここから直接 `10WA = AS1200` とは言えない。

さらに後年資料では Wittnauer 11P の扱いに食い違いがあるため、`WITT 11P` の表記自体も別途検証対象。

書誌確認:
https://booksimonin.ch/en/5601-paulsons-master-key-swiss-catalog.php

## 4. FHF氏の2024年Xスレ — 調査経路

ユーザー提示のXスレ:
https://x.com/fhf_ebauche/status/1821905700311986582

確認できた流れ:

1. 先に1954年公開のアラーム特許に着目。
2. 「この構造は実機化されたのか」と調べ、Wittnauer 10WAに到達。
3. 当初はWittnauerでRevue系ムーブメントの採用例があることや受け形状から、Revue系の可能性を疑う。
4. その後に調査を進め、`ベースムーブメントはA. Schild Cal.1200` と判断を更新。
5. 補助資料として Paulson の `A. SCHILD 1200 / WITT 11P` 図版を提示。

重要:
FHF氏本人が2026-09-17のX返信で、2024年の当該投稿自体をほぼ覚えていない旨と、時計知識の大半をPC内資料・DBへ格納している旨を述べた。
したがって、現在の本人記憶ではなく、当時PC内で参照した資料・DB側に決め手が残っている可能性がある。

この返信はユーザー提供スクリーンショットで確認。独立Web取得は未実施。

## 5. 10WA実機分解記録 — 「いつかデイトナ欲しいよね」

2023-04-29の記事で、Cal.10WAを実際に分解し、ベゼル取り外し、ムーブメント取り出し、輪列受け・香箱受け、アラームモジュールの分離まで写真で記録している。

URL:
https://watch.weblog.to/archives/49044123.html

今回のX返信で同筆者は、次の趣旨を述べた。

- 自身も過去にLongines説を書いた記憶があるが、Longines説は伝聞に過ぎない可能性を感じている。
- Longinesで同型キャリバーを探しても見つけられていない。
- 一方、AS1200ともガンギ受け・輪列受けの形状が微妙に違う。

注意:
現在取得できる2023年の記事本文では `Longines` / `ロンジン` の記述を確認できていない。
したがって「分解記事本文がLongines説を記載している」とは現時点では扱わない。
旧版、別記事、本人の記憶違いのいずれかは未確認。

## 6. ガンギ受け・輪列受けの違いをどう扱うか

実機分解者による `AS1200とは受け形状が微妙に違う` という観察は、AS1200説への反証材料として保持する。

ただし、受けの外形が違うだけで別キャリバーとは断定しない。
同一基礎設計でもブランド向けにブリッジ外形が変更される可能性があるため、今後は以下を直接比較する必要がある。

- 石の位置
- ネジ位置
- 歯車軸の位置
- 香箱位置
- 地板レイアウト
- keyless works / 巻上げ・時刻合わせ機構

判断候補は3つに分ける。

1. AS1200そのもの
2. AS1200をWittnauer向けに変更した派生
3. AS1200と部品を多く共有する別キャリバー

現時点では1〜3のどれかを確定しない。

## 7. LANCO / Damas比較画像の扱い

X上でLANCO銘のムーブメントや、Damas候補として比較された類似ムーブメント画像が提示された。

現時点で言えるのは、似た受け形状を持つムーブメントが複数メーカーに存在し、受け形状だけで10WAのベースを同定するのは危険ということ。

- LANCO画像は銘を視認できる。
- 右側の比較画像は、スクリーンショットだけではDamas銘を独立確認できていない。
- したがって `10WA = LANCO / Damas系` とは扱わない。
- 画像は外観類似の反証材料としてのみ保持する。

## 8. 特許 CH304088A

Swiss patent CH304088A。
発明者・出願人: Marcel Bliss。
出願: 1952-12-04。
公開: 1954-12-31。

特許には、通常の時計ムーブメントの文字盤側に別体のアラーム機構を置き、回転ベゼルでアラーム香箱を巻き、同じ回転でアラーム時刻設定も行う構成が記載される。

Google Patents:
https://patents.google.com/patent/CH304088A/en

量産10WAと重なる点は多いが、Wittnauerへの譲渡・ライセンスを示す資料は未確認。
また特許は slipping bridle により満巻き後も操作継続を可能にする構成を示す一方、Horlbeckが記録する量産10WAは満巻きでベゼルが止まる。

したがって現時点の整理は `構造上非常に近いが、同一と確定しない` を維持する。

## 9. DEEP DIVE 03 — 後で検討する候補文（まだ本文へ反映しない）

ユーザー判断: 後で文言を詰めるため、現時点では候補としてのみ保存する。

> 10WAの時刻側には、修理部品資料から10S／AS1200系との強い共通性が見える。
> 一方で、実機を分解した観察でも、一般的なAS1200とはガンギ受けや輪列受けの形状に違いが指摘されている。
> HorlbeckとBeitlはLonginesベースと明記しているが、現時点では同型のLonginesキャリバーも確認できていない。
> 資料上のLongines説と、部品互換から見えるAS1200系との関係は、まだ解決していない。

### この候補文の注意点

- `同型のLonginesキャリバーも確認できていない` は、分解記事筆者の現在の観察・探索経験を補助材料とする表現。公開本文へ採用する場合は、独立した比較調査を追加して表現強度を再確認する。
- `AS1200とは受け形状が違う` も、現時点では実機分解者の観察。本文へ入れるなら画像比較または図版比較を実施する。
- 現行03を丸ごと置き換える前提ではなく、既存のMarshall→AWIという因果を残したまま差分修正する。

## 10. DEEP DIVE 04 — 現時点では変更しない

現行04は以下をすでに区別しているため、今回のX調査だけでは変更しない。

- CH304088Aの発明者 / 出願日 / 公開日
- 10WAと構造上重なる点
- Wittnauerへの譲渡・ライセンス未確認
- slipping bridle と量産10WAの挙動差
- `よく似ているが同じと断定しない` という確度

FHF氏の `特許を先に発見 → 実機10WAへ到達` という研究経路は興味深いが、時計自体の史実ではなく現代の研究経緯なので、現時点では04本文へ入れない。

## 11. 次にやるべき比較

優先順位:

1. 10WA時刻側と標準AS1200の高解像度図版を同一方向で比較。
2. 受け輪郭ではなく、石・ネジ・歯車軸・香箱・地板・keyless worksの位置を比較。
3. Longines側で同一地板レイアウトを持つ候補を探索。
4. FHF氏が2024年にAS1200と判断した元資料が公開・提示された場合、その資料を独立検証。
5. Paulsonの該当ページ全体と書誌を確保し、`WITT 11P` 表記問題を後年資料と比較。
6. X上のLANCO / Damas類似画像の元掲載ページが見つかった場合のみ、キャリバー名を確定して比較対象へ追加。

## 12. 現時点の禁止事項

新証拠なしに以下へ戻さない。

- `10WA = AS1200で確定`
- `10WA = Longines Cal.10で確定`
- `受けの形が似ている = 同一キャリバー`
- `部品互換がある = 同一キャリバー`
- `CH304088A = Wittnauer 10WAの特許で確定`
- `Xの比較画像 = LANCO / Damasの特定キャリバーで確定`

## Sources / pointers

- Michael Philip Horlbeck, *The Alarm Wrist Watch* (Schiffer, 2007), Wittnauer / 10WA sections.
- Leonhard Beitl, *Alarm am Arm* (2009), Wittnauer / Longines sections.
- Henry Paulson & Co., *Paulson's Master Key Swiss Movement Catalog* (Chicago, 1950).
  - https://booksimonin.ch/en/5601-paulsons-master-key-swiss-catalog.php
- C. & E. Marshall, *Handy Manual* (1966), Wittnauer parts interchange listings.
  - https://www.phfactor.net/wtf/Marshall%20Handy%20Manual/Marshall%202.pdf
- American Watchmakers Institute, Technical Bulletin / AWI News (1969), `Wittnauer 10S (AS 1200)`.
  - https://www.awci.com/wp-content/uploads/2018/01/10-1969-AWI-News.pdf
- HODINKEE, 2025-08-15, Wittnauer Cal.10WA.
  - https://www.hodinkee.com/articles/bring-a-loupe-august-15-2025
- `いつかデイトナ欲しいよね`, Wittnauer Cal.10WA overhaul, 2023-04-29.
  - https://watch.weblog.to/archives/49044123.html
- Swiss patent CH304088A, Marcel Bliss.
  - https://patents.google.com/patent/CH304088A/en
- FHF氏 2024-08-09 X thread.
  - https://x.com/fhf_ebauche/status/1821905700311986582

## Status

- Research note: `IMPLEMENTED`
- DEEP DIVE 03 candidate: stored only, not applied
- DEEP DIVE 04: no change
- Public site: unchanged
- PR merge / deploy: not performed
