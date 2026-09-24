# VINTAGE ALARM — Multilingual revision sync

更新日: 2026-09-24

## 結論

多言語版の最大リスクは翻訳の自然さそのものより、**日本語正本で行った事実修正が EN / DE に残らない revision drift（改訂同期ズレ）**とする。

日本語サイト本文を正本とする既存方針は維持する。ただし「日本語を正本と書いてある」だけでは同期は保証できないため、共有事実の修正には CI で落ちる同期契約を持たせる。

同時に、**公開範囲のズレ**も別レイヤーで監視する。`llms.txt`・実際のビルド出力・各言語INDEXが示す公開範囲を一致させ、存在しない翻訳をあるように見せたり、公開済みページを機械向け一覧から落としたりしない。

## 現在の公開深度

### English

- FULL RESEARCH: Basis Alarm / Citizen Alarm / Cyma Time-O-Vox / Pierce Duofon / Westclox Watchlarm / Wittnauer Cal.10WA
- 独立研究: Cyma Time-O-Vox Chronomètre

### Deutsch

- FULL RESEARCH: Basis Alarm / Citizen Alarm / Cyma Time-O-Vox / Pierce Duofon / Westclox Watchlarm / Wittnauer Cal.10WA
- 独立研究: Cyma Time-O-Vox Chronomètre

旧 `CONCISE ENTRY` は廃止。所有6 WATCHは EN / DE とも詳細版を正とする。

`public/llms.txt` は実際に公開されているURLの一覧として扱い、独立研究ページの言語版も明示する。

## 事実修正の同期ルール

日本語正本で、EN / DEにも存在する事実を修正するときは、同じ変更単位で次を行う。

1. 日本語正本を修正する。
2. 公開済みEN / DEの対応箇所を同時修正する。
3. 資料差がある場合、本文には採択した事実を自然に書き、異説・採択理由は参考資料・RESEARCH NOTE・REVISIONへ置く。
4. `src/data/localization-fact-sync.json` に同期契約を追加または更新する。
5. `npm run check:localization-sync` が通ることを確認する。
6. build / quality / layout / live publication checkまで通してから完了とする。

## 同期契約

正本:

- `src/data/localization-fact-sync.json`

検証:

- `scripts/check-localization-sync.mjs`
- `npm run check:localization-sync`
- `npm run check:quality` の一部としてCIで常時実行

同期契約は、各共有事実について以下を確認する。

- 日本語正本に現行値が存在すること
- EN / DEの公開済み版に同じ現行値が存在すること
- 既知の旧本文表現が残っていないこと
- 資料差を残す必要がある場合、旧値そのものは参考資料側に残っていること
- build後の公開HTMLにも必要な値が出ていること

## 公開範囲の同期

多言語の「何が公開されているか」は事実同期とは別に監視する。

検証:

- `scripts/check-localization-coverage.mjs`
- `npm run check:localization-coverage`
- `npm run check:quality` の一部としてCIで常時実行

この検証では、build後に存在する `/en/<watch>/`・`/de/<watch>/` と `public/llms.txt` の列挙を照合する。

- 公開済みWATCHが `llms.txt` から漏れたらFAIL
- `llms.txt` に存在しないWATCH URLを載せたらFAIL

`llms.txt` は権威付けやAIO専用テキストではなく、現在公開されているURLの機械可読インデックスとして扱う。

## 公開反映の完了条件 — 全ページ対象

翻訳修正は、branch / PR / GitHub上に文章が存在するだけでは完了としない。**mainにmergeされ、同じmainから生成したHTMLが本番liveへ出ていることを確認した時点だけDEPLOYED**とする。

公開確認は一部の代表ページや数個の文字列へ絞らない。

- `scripts/check-localization-coverage.mjs` は EN / DE のTOP、HISTORY、OWNER'S NOTES、HOW THEY RING、SOURCES、公開中の全WATCH、独立研究ページをbuild出力で確認する。
- `scripts/check-layout.mjs` は公開中の全EN / DE WATCHを動的に対象化し、旧3本固定のような対象漏れを禁止する。
- `scripts/check-live-site.mjs` は同じ公開範囲をlive HTMLで意味的に確認する。
- `scripts/check-live-parity.mjs` はdeploy直後、dist内の**全生成HTML**と `sitemap.xml` / `llms.txt` / `robots.txt` をlive取得し、内容が一致しない限りdeploy workflowを成功扱いしない。

翻訳修正PRが未mergeのまま残っている状態は `IMPLEMENTED` 以下であり、「GitHubに記載済み」を本番反映の代わりにしない。個別の修正文言だけをlive gateへ足して終わらせず、全公開routeのartifact parityを共通の最終gateとする。

## 最初の登録事例 — Pierce創業年

2026-09-15、Pierce創業年について日本語本文を1888年から1883年へ修正した。

- 本文値: 1883
- Horlbeck p.131: 1888
- Beitl p.670 / Grail Watch Wiki / Ranfft DB / Watch-Wiki: 1883
- 一次資料による最終確定: 継続

この修正は JA / EN / DE すべてを1883へ同期し、1888との資料差は参考資料側へ残した。

この事例を revision drift の回帰テストとしてCIに固定する。

## 本文と証拠層を混ぜない

本文に次のような編集会議口調を置かない。

- `VINTAGE ALARMでは現時点で〜を採用する`
- `複数資料が一致するため〜と判断した`
- そのほか採択理由を本文読者へ説明する文章

本文は採択した事実を自然に記述する。

資料差、異説、採択理由、修正理由は以下へ分離する。

- 参考資料・出典
- RESEARCH NOTE
- REVISION

## 翻訳深度と同期は別問題

2026-09-24時点で、所有6 WATCHは EN / DE とも FULL RESEARCH へ統一した。今後「短縮版だから同期対象外」という扱いはしない。

独立研究ページも、その言語版を公開した時点で日本語正本の事実修正と同じ同期対象になる。

## 言語品質は「日本語語彙の移植」ではなく意味の保持で見る

事実同期を優先するが、公開済み翻訳の自然さも放置しない。

とくにOWNER'S NOTEやキャッチでは、日本語圏では通じても対象言語では不自然な借用語・ネット語を、そのまま字面だけ移植しない。

例として、Duofonドイツ語版の `OOPArt` のような表現は、元の「1950年代なのに後世の通知感覚を先取りして見える」という意味・温度を保ちながら、ドイツ語圏で自然に読める表現へ直す対象とする。

同様に、比喩を直訳した結果だけで成立する不自然な表現は、次の順で監査する。

1. 日本語正本の意味・温度・断定度を確認する。
2. 対象言語として自然な候補を作る。
3. 日本語へ逆翻訳して、意味・役割が変わっていないか確認する。
4. 事実追加・削除・編集的再構成がないことを確認してから公開する。

自然化を理由に、OWNER'S NOTEを別のコピーへ作り替えない。翻訳者は編集者にならない。

## 10WA以降

Wittnauer 10WAなど今後の多言語展開では、翻訳公開前に「どの事実を複数言語で共有するか」を同期契約へ登録する。

特に次のような論点はrevision driftの影響が大きいため、登録優先度を高くする。

- 年代・初出年
- キャリバー系譜
- メーカー / ebauche帰属
- 特許との関係
- 香箱数
- 操作仕様
- 実測値と文献値の差
- `world first` 等の強い歴史主張

多言語化を理由に日本語正本の確度を上げたり、海外資料側へ本文を寄せたりしない。
