# VINTAGE ALARM — External Outreach Readiness Audit

監査日: 2026-09-25  
監査基準: canonical public host `https://vintagealarm.github.io/` / main baseline `d246659137ff0868dcef2af4494c2fb7717dcf17`

## 目的

VINTAGE ALARMが、外部データベース・編集媒体・時計コミュニティへ「サイトを売り込む」のではなく、具体的な資料・実機観察・一次資料の補足を渡すための**営業可能な研究サイト**になっているかを監査する。

ここでいう営業可能とは、次を満たす状態を指す。

1. 相手へcanonical deep URLを渡したとき、ページ単体で何を確認したサイトなのか分かる。
2. 本文・出典・所有個体観察・未解決事項が混同されていない。
3. 英語またはドイツ語で読んでも、日本語正本と重要事実がずれない。
4. 受け手が訂正・追加資料を返せる。
5. リンク獲得を前提にせず、相手側資料へ具体的に追加できる差分がある。
6. 公開ページに、営業前に直すべき明白な事実矛盾・言語導線不良が残っていない。
7. 検索・旧URL・計測・公開状態を「実装済み」と「外部から観測済み」に分けて扱える。

## 監査対象

### GitHub / public implementation

- JA / EN / DE TOP
- HISTORY
- OWNER'S NOTES
- HOW THEY RING
- SOURCES
- 公開WATCH 6本
- CYMA Time-O-Vox Chronomètre research
- sitemap / canonical / hreflang / JSON-LD / Open Graph / X card
- `robots.txt` / `llms.txt`
- correction intake
- legacy host migration
- build / live / mobile / localization fact-sync gates
- latest Analytics / arrival-probe infrastructure

### Project primary/reference materials

- Michael Philip Horlbeck, *The Alarm Wristwatch* (2007)
- Leonhard Beitl, *Alarm am Arm* (2009)
- 各WATCHに登録済み一次資料、特許、メーカー資料、購入書類、所有個体観察

### Current web surface / external targets

2026-09-25時点で以下を再確認した。

- Watch Movements Archive — Tavannes / Cyma R.464
  - https://watch-movements-archive.com/watch-movement/tavannes-cyma-r-464/
- Watch-Wiki — Cyma / R.464関連
- Ranfft DB — Pierce calibers
  - https://ranfft.org/manufacturer/241-Pierce
- Fratello — Basis Alarm / BFG 90
  - https://www.fratellowatches.com/tbt-unusual-basis-alarm-watch-bfg-90/
- Grail Watch / Grail Watch Reference — alarm caliber research
- 検索面で `site:vintagealarm.github.io` とVINTAGE ALARM + 個別モデル名
- legacy host `orima1995-create.github.io/orima1995-creator.github.io`

---

## 結論

### 1. 研究サイトとしての土台

**強い。**

VINTAGE ALARMはすでに、外部へ渡す価値のある単なるコレクション紹介ではなく、

- 所有個体
- 操作
- 実機音
- 機構
- 専門書
- 一次資料
- provenance
- owner observation
- 未解決事項

を同じWATCHページ内で分離して見せられる。

また、公開WATCH 6本はJA / EN / DEでFULL RESEARCH routeを持ち、CYMA Chronomètreには複数現存例・アーカイブ照会・未解決の認定対応まで独立研究ページがある。

### 2. 2026-09-25監査開始時点のmain

**限定営業を始める直前だが、そのまま外へ広く出す状態ではなかった。**

理由は、営業資料そのものに当たる公開ページで2件の明白なblockerを確認したため。

1. HOW THEY RINGのFIG.01 / FIG.03が、すでに確定していた現行事実より古い文言へ戻っていた。
2. ドイツ語WATCHの関連導線3件が英語WATCHへ飛び、全DE WATCHで次ページラベルが固定で `EN` になっていた。

この2件は、相手が最初の1～2ページを見ただけで「言語同期や機構整理がまだ途中」と判断し得るため、外部営業前に修正必須。

### 3. blocker修正後

**CYMAを起点にした1対1の限定営業は開始可能。**

特に Watch Movements Archive / Watch-Wiki には、既存ページより具体的な補足を渡せる。

一方、媒体・アーカイブへ一斉に広く声を掛ける段階はまだ早い。検索面の旧host残存、HISTORYの出典粒度、human-facingな権利・運営情報など、信頼コストをさらに下げる余地が残る。

---

## 確認できた強み

### A. canonical deep URLだけで研究対象が成立する

各WATCHは、

- OWNER'S NOTE
- SPEC
- 実機鳴動
- 掲載個体
- DEEP DIVE
- REFERENCES / SOURCES

を1ページで読める。

営業メールからTOPを経由させる必要がない。相手の興味に合うWATCH / research URLを直接渡せる。

### B. JA / EN / DEの研究ページが揃っている

公開WATCH 6本について、EN / DE側も旧「短いentry」ではなくFULL RESEARCHとして生成・live gateの対象になっている。

英語圏・ドイツ語圏への営業で、日本語を読めないこと自体が主要障壁にならない。

### C. evidence typeが見える

SOURCESでは、少なくとも次を区別して表示できる。

- PRIMARY SOURCE
- PRIMARY SOURCE / REPRINT
- REFERENCE
- PROVENANCE
- OWNER OBSERVATION

所有個体の測定値や音源を、モデル全体の一般事実として無条件に拡張しない設計になっている。

### D. 資料差を隠さない

例としてWittnauer Cal.10WAは、専門書のLongines-base記述と、10S / AS1200側のinterchange evidenceを同居させ、現時点で解けないことを本文に残している。

営業先へ「結論」だけでなく「資料間の衝突そのもの」を渡せるのは強い。

### E. correction intakeが公開ページにある

各WATCHのSOURCES末尾から、

- X
- GitHub correction form

へ送れる。

外部編集者・コレクターから新資料や別個体情報を戻してもらう経路がある。

### F. machine-readable trust surfaceがある

`llms.txt` は、

- independent research site
- retailer / appraisal service / manufacturer archiveではない
- owner-observed specimen中心
- selection bias
- evidence type separation
- unresolved evidence handling
- correction policy
- canonical research routes

を明示している。

### G. canonical / hreflang / social previewの基本実装がある

`SeoHead.astro` には、

- canonical
- alternate hreflang
- meta description
- Open Graph
- `twitter:card=summary_large_image`
- Article / CollectionPage JSON-LD

がある。

相手がURLを共有・保存・再掲するときの最低限の機械可読性は揃っている。

### H. 公開状態をCIで監査できる

直近main deployでは、

- build
- internal links / SEO
- quality gates
- mobile layout
- live artifact parity
- live publication

が成功している。

「repositoryにある」だけでなく、公開artifactとの差まで確認する仕組みがある。

### I. 流入後を計測できる

Cloudflare Web Analyticsに加え、RUMより前のearly arrival probeを別レイヤーで持つ。

営業先からのreferralが発生した後、「Link Click相当の入口」とRUM Entryを混同せず監査できる。

---

## HARD BLOCKER — 監査で見つかった公開不整合

## 1. HOW THEY RING FIG.01 / FIG.03が旧仕様へ戻っている

main監査時の公開source:

### FIG.01 OMEGA MEMOMATIC

旧:
- JA: `棒状の音バネを叩く`
- EN: `Strikes a rod-shaped sound spring`
- DE: `Schlägt eine stabförmige Tonfeder an`

現行決定:
- JA: `輪状の音バネを叩く`
- EN: `Strikes a ring-shaped sound spring`
- DE: `Schlägt eine ringförmige Tonfeder an`

### FIG.03 JUNGHANS MINIVOX

旧:
- `ピン／レバー伝達型`
- `Pin / lever transmission type`
- `Stift-/Hebelübertragung`

現行決定:
- `ピン伝達型`
- `Pin-transmission type`
- `Stiftübertragung`

発音経路も、

`hammer → pin → bottom bell`

として扱う。

この現行仕様は2026-09-24の旧PR #110側ですでに判断済みだったが、そのPRがmainから大きくdivergeしたまま未mergeで残り、main側へ反映されていなかった。

### 修正

fresh main branch `fix/outreach-readiness-blockers-2026-09-25` で差分移植した。

旧PR #110は113 commits behindのため、そのままmerge対象にしない。

## 2. DE WATCH footerが英語へ脱線する

main監査時:

- `/de/wittnauer-10wa/` → `/en/cyma-time-o-vox/`
- `/de/pierce-duofon/` → `/en/cyma-time-o-vox/`
- `/de/westclox-watchlarm/` → `/en/basis-alarm/`
- German WATCH layoutは全ページで `NÄCHSTE OWNER'S NOTE · EN` を固定表示

ドイツ語で読んでいる相手を途中で英語へ送るため、ドイツ語圏営業では明白な品質低下。

### 修正

- 3リンクを対応する `/de/` routeへ変更
- `hreflang=de`
- footer labelを実際のrelated hreflangから生成
- build / live / localization fact-syncでDE→EN回帰を拒否

---

## 営業前に残る中優先課題

### 1. HISTORYのsource traceabilityはWATCHより弱い

WATCHは段落単位で出典へ辿れるが、HISTORYは全イベントが同じ粒度でpage-level / claim-level source mappingされているわけではない。

現時点で詳細mappingが強いものと、書籍全体・外部資料への参照に留まるものが混在する。

**判断**:
- 個別WATCH / CYMA researchを送る限定営業のblockerではない。
- 「VINTAGE ALARM全体を歴史リファレンスとして使ってください」と売る前には強化したい。

### 2. canonical hostが検索面でまだ定着していない

2026-09-25の検索監査では `site:vintagealarm.github.io` でcanonicalページを安定して取得できず、VINTAGE ALARM + Pierce / Cymaでは旧hostのキャッシュが出た。

legacy repo側にはroute-preserving redirectが実装・deployされているため、**現在のredirect実装不良ではなく検索indexの残留**と判断する。

ただし旧Pierce cached resultには、現在修正済みの創業年1888表記など古い本文が残る。

**判断**:
- 1対1営業はcanonical deep URLを直接送るため、待つ必要はない。
- 広い露出・メディア掲載前には、canonicalが検索面でも前に出る方が安全。

### 3. human-facingな利用条件・権利情報がない

現状、独立運営・研究方針は`llms.txt`に明記され、訂正窓口はWATCH末尾にある。

一方で、写真・音源・表・文章について、

- 再利用可否
- 引用時の希望表記
- 画像転載許諾の窓口
- third-party supplied imageの扱い

を人間向けに一括で示すページは確認できない。

**判断**:
- 相手が「画像を1点使いたい」「表を引用したい」と思った瞬間に確認往復が発生する。
- 権利条件はユーザー判断が必要なので、この監査では勝手に公開しない。

### 4. generic ABOUTページは現行方針では意図的に作っていない

2026-09-24の決定で、一般読者向けABOUTを増やさず、サイトidentity / evidence policyは`llms.txt`へ置く判断がある。

したがって「ABOUTがないから作る」を自動で復活させない。

ただし営業フェーズでは、編集者が人間として「誰が、何を、どの範囲で観察したのか」を短時間で確認したい需要が増える。

**再検討条件**:
- 実際の営業先から運営者情報・使用許可・引用条件を繰り返し聞かれた場合。
- その場合もgeneric ABOUTではなく、`CONTACT / CORRECTIONS / REUSE`の最小ページを優先する。

### 5. EN / DEではRESEARCH NOTE / REVISION metadataを本文下に出していない

EN / DE WATCH本文・出典はFULL RESEARCHだが、JA側で表示するRESEARCH NOTE / REVISION blockは現在非表示。

**判断**:
- 内容欠落ではないため最初の営業blockerではない。
- 海外の編集者が「いつ何を直したか」「未解決項目は何か」をページ単体で確認するにはJAより一段弱い。
- CYMA / Wittnauer等の営業対象から必要に応じて多言語表示を検討する価値がある。

### 6. mobile / page weightはCIで崩れを防いでいるが速度実測は未完

repo内の画像・音声assetは合計約48 MBで、1–2 MB級画像も複数ある。ギャラリーはlazy、先頭OWNER画像はeager / high priority。

mobile layoutはCIで確認済みだが、この監査ではLighthouse / field CWVの新規実測までは完了していない。

**判断**:
- 「遅い」とは認定しない。
- 海外モバイル流入が増えた段階でLCP等を実測する。

---

## 外部先別の営業可能性

## P1 — Watch Movements Archive / Andreas Kelz

### 現在の相手側

R.464ページでは、

- common barrel for alarm and wheel train
- hammer striking on gong
- 17 jewels
- 18,000 A/h
- Cymaflex
- production probably around 1955

等の基本movement情報がある。

### VINTAGE ALARMから渡せる具体差分

- 2 pushers + crown / Wippeによる切替
- owner specimen photos / operation
- single-barrel alarmによる実測
- Time-O-Vox case / lug variation
- Chronomètre specification研究への接続
- 17 documented examples + archive inquiry

### 判定

**blocker修正deploy後、最初の営業先として適する。**

「リンクしてください」ではなく、
「R.464ページの操作・Chronomètre周辺を補う資料として使えるものがあります」
で入る。

## P1 — Watch-Wiki

R.464周辺の公開情報はWMAより薄い。

### 判定

**CYMAの事実補足先として営業可能。**

WMAと同じ文面を一斉送信せず、Watch-Wikiで欠けている項目だけを抽出する。

## P1 — Ranfft

Pierce Cal.135を含むmovement databaseはすでに存在する。

### VINTAGE ALARM側の差分候補

- 1955 Pierce technical sheet
- WECKER / SIGNAL切替の具体機構
- indicator window
- owner specimen photographs / sound
- prototype / later case-source comparison

### 判定

**genericなPierce紹介では弱い。**
既存DBの特定fieldを補える一次資料・機構差分があるときだけ送る。

## P2 — Grail Watch

2026年時点でalarm movementの更新が活発で、Pierce 135等もすでに詳細化されている。

### 判定

**営業相手として価値は高いが、要求水準も高い。**

「Pierce Duofonの記事があります」では不足。
1955 Pierce一次資料、WECKER / SIGNALの実機図解、資料間差など、相手側にまだない一点へ絞る。

## P2 — Fratello

Basis / BFG90については2019年の詳細な実機記事がすでにあり、

- two barrels
- one-direction winding
- indicator windows
- slip clutch
- rotating crystal / alarm hand
- alarm control

までかなり踏み込んでいる。

### 判定

**Basis一般紹介での営業はしない。**

VINTAGE ALARM独自の一次資料、修理で確認した構造、Fratello記事と食い違う/補完する具体点が固まった場合だけ再検討する。

## P2 — NAWCC / archive / manufacturer

### 判定

単発URLの売り込みより、

- research question
- source packet
- observed specimen
- unresolved point
- specific ask

をまとめたresearch packageで接触する方が適する。

---

## 営業メッセージに必要な最小構成

サイト側が整っても、営業文は「サイト紹介」にしない。

1. 相手側の具体ページ / 記述
2. 補える具体点を1件
3. VINTAGE ALARM側の根拠
4. canonical deep URL
5. 必要なら画像 / 資料の追加提供が可能であること
6. backlink要求はしない

例の骨格:

> R.464のページでsingle-barrel / gongの記述を拝見しました。  
> 手元のTime-O-Vox実機と専門資料から、2 pushers + Wippeの操作経路とChronomètre仕様の現存例を別途整理しています。  
> もしR.464項目の補足に使えるようでしたら、該当箇所と資料を共有できます。  
> Canonical: https://vintagealarm.github.io/en/cyma-time-o-vox/

---

## GO / HOLD

### blocker fixがmainへdeployされる前

**HOLD**

理由:
- HOW THEY RINGの現行事実とmainが不一致
- DE関連導線が英語へ脱線

### blocker fix deploy後

**GO — target-specific / one-to-one**

対象:
1. Watch Movements Archive — Cyma R.464
2. Watch-Wiki — Cyma / R.464
3. Ranfft — specific Pierce fact package

### まだHOLD

- 一斉送信
- 「VINTAGE ALARM全体を参考文献として掲載してください」という広い営業
- Basis一般紹介でFratelloへ送る
- Pierce一般紹介だけでGrail Watchへ送る
- 検索結果がcanonicalへ完全移行済みであるかのように言う

---

## 今回のblocker修正

branch: `fix/outreach-readiness-blockers-2026-09-25`

差分:

1. HOW THEY RING FIG.01をring-shaped sound springへ復元
2. FIG.03をpin-transmissionへ復元
3. J89の `hammer → pin → bottom bell` をJA / EN / DEへ同期
4. DE Wittnauer / Pierce / Westcloxの関連先をDE routeへ修正
5. German footerの固定`EN`ラベルをrelated hreflang連動へ変更
6. build / live gateへ旧文言・DE→EN脱線の回帰拒否を追加
7. localization fact-syncへ上記3事実を登録

## 完了条件

限定営業を開始できる状態は、次をすべて満たした時点。

- [ ] blocker branchのCI成功
- [ ] mainへmerge
- [ ] GitHub Pages live deploy成功
- [ ] live HOW THEY RING JA / EN / DEで現行FIG.01 / FIG.03を確認
- [ ] live DE WATCH footerがDE内に留まることを確認
- [ ] sitemap / canonical / hreflang gate維持
- [ ] 営業先ごとに「何を補うか」を1文で確定
- [ ] canonical deep URLだけを送る

検索index移行、HISTORY全項目のclaim-level mapping、reuse policyは**限定営業開始の必須条件にはしない**。これらは広い営業へ進む前の次段階とする。
