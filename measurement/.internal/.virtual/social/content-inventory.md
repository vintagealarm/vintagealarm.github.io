# VINTAGE ALARM — Social Content Inventory

> VAの研究資産・写真・操作・機構・OWNER'S NOTEを、SNS再利用のために横断して探す**索引正本**。
> ここは事実の一次正本ではない。投稿へ使う直前に必ず `Source` のWATCH / research / social正本を開いて再確認する。

## 0. このファイルの役割

- 「保存されているVA資産 → 次のSNS投稿候補」を毎回ゼロから掘り直さないための**商品棚**。
- 既出 / 部分既出 / Instagram本文では未使用 / 要追加撮影 / 要追加検証 / URL誘導向けを、時計ごとに一覧化する。
- `instagram-published-copy.md` は**実投稿本文の証拠正本**、本ファイルは**再利用索引**。役割を混ぜない。
- 数値はここへ複製しない。Instagram数値は `instagram-insights-timeseries.md`、分析判断は `instagram-operations.md`。
- **OWNER'S NOTE は分割しない。** 1個体のOWNER'S NOTEを一つの完成物として扱い、leadや本文の一文を別々の投稿ネタへ切り刻まない。
- **AIは候補分類まで先行してよい。** Sourceに基づいて候補を切り、Category / relation / media / verify / video-fitまで `AI_PROPOSED` として整理する。
- Candidate Review Queueは**時計横断のrolling shelf**。一つの時計を終えてから次へ進む必要はなく、各WATCHから候補を継続追加し、ユーザーが次の「時計＋内容」を選べる状態を作る。
- **候補は必ずユーザーへ提示する。** 提示前のAI分類を正本assetへ昇格させない。asset境界の KEEP / MERGE / SPLIT / DROP は、提示候補をユーザーと相談して確定する。
- `USER_KEEP` はassetとして棚に残す確定であり、次回投稿の採用とは別。KEEP済みassetは他時計の候補と後から比較して選べる。
- 現在のasset表は共同棚卸しの開始点。候補レビュー層と正本asset層を混同しない。
- 動画への当て込みはasset確定後。ユーザーが採用したものだけContent Assignment Registryへ USER_CONFIRMED / PLANNED として予約する。
- **Execution Briefはasset表ではなくcontent単位で持つ。** USER_CONFIRMED / PLANNEDを作った投稿だけ、実素材・既出衝突・過去SNS学習・素材制約を短いbriefへ束ねる。棚の全assetへ見せ方を埋めて肥大化させない。

## 1. ステータス

### IG state

- `USED` — 現行 `instagram-published-copy.md` で主題・本文として使用確認済み。
- `PARTIAL` — 核の一部は既出。再利用するなら「別検証」「機構の深掘り」等、重複理由を明示する。
- `CANDIDATE_NOT_IN_IG_TEXT` — 現行Instagram公開本文には見つからない候補。**動画内で視覚的に未使用だったことまでは意味しない。**
- `WHOLE_ONLY` — OWNER'S NOTE専用。分割禁止。
- `HOLD` — 未解決・権利・資料不足等の理由で、そのまま投稿しない。

### Media

- `READY_EXISTING` — VA内の既存写真・機構画像・既存動画等で構成可能。
- `NEEDS_SHOOT` — 操作や挙動を見せるため追加撮影が必要。
- `NEEDS_SOURCE_ASSET` — 文献図・比較個体等の素材確認／権利確認が必要。
- `OWNER_NOTE_HERO_ONLY` — OWNER'S NOTEを丸ごと扱う時だけhero画像を使う。

### Verify

- `READY_FROM_WATCH` — 現行WATCH正本で根拠・確度が整理済み。投稿時は正本を再取得して確認する。
- `READY_FROM_SOURCE` — WATCH外の一次・専門資料まで再確認済み。Source列の根拠を投稿時に再確認する。
- `RECHECK_SOURCE` — 文献表現・比較条件・資料差を投稿直前に再確認する。
- `OPEN_QUESTION` — 未解決であること自体が主題。結論へ変換しない。
- `RIGHTS_CHECK` — 外部画像・資料図等を使う場合の権利確認が必要。

`Other social` の `NO_EXPLICIT_USE_FOUND_2026-10-03` は「2026-10-03時点の現行social canonで同じ訴求の明示使用を見つけていない」という意味だけ。**絶対に未使用という意味ではない。**

## 2. 引き継ぎ後の強制手順

1. PROJECT.md → AGENTS.md → PROJECT_STATE.md → Social ROUTER.md を読む。
2. 投稿案なら、この content-inventory.md を記憶より先に開く。
3. 対象時計の現行asset表を開始点としてSourceへ戻り、AIが追加候補を分類する。候補には一時IDを付け、Category / IG state候補 / Other social / Media / Verify / overlap候補 / video-fit候補を整理する。
4. **分類済み候補を時計横断のrolling shelfとしてユーザーへ提示する。** この段階は `AI_PROPOSED` であり、正本assetではない。1個体を完了するまで他個体を止めない。
5. ユーザーは棚から時計＋内容を見て KEEP / MERGE / SPLIT / DROP を相談する。KEEPはasset採用であり次回投稿採用ではない。必要なら粒度を再分類して再提示する。
6. 確定assetについて USED / PARTIAL / CANDIDATE_NOT_IN_IG_TEXT、Other social、Media、Verifyを再照合して正本asset表へ反映する。
7. 確定assetを動画へ当て込む案を提示し、ユーザーが採用したものだけ USER_CONFIRMED / PLANNED で予約する。
8. **予約と同じcontent IDでExecution Briefを作る。** 実素材、Published Copy、Operations / Insightsの関連学習、WATCH / research事実を突合し、Media reality / Attention cue / Sensory proof / Causal beat / Published collision / Carry-forward / Constraints / Working copyを埋める。
9. 実素材未確認なら Status=MEDIA_PENDING とし、caption / storyboardをfinal扱いにしない。実素材確認後は MEDIA_VERIFIED へ更新する。SHOT / EDITED / SCHEDULEDへ進むInstagram assignmentは MEDIA_VERIFIED 必須。
10. activeな PLANNED / SHOT / EDITED / SCHEDULED のasset / media keyは別案へ再利用しない。
11. 撮影→SHOT、編集→EDITED、予約投稿→SCHEDULED、公開確認→PUBLISHED。中止はDROPPED。
12. Instagram公開時はpublished-copy、asset state、assignmentを同じ変更セットで同期する。Insightsは同じcontent IDを使う。

### よくある要求の処理

- 「未使用角度を全部」→ AIがSource-backed候補をカテゴリ別に `AI_PROPOSED` で先に出し、ユーザーへ一覧提示。KEEP / MERGE / SPLIT / DROP 後にだけ正本化する。
- 「既出を除いて」→ USEDを除外。PARTIALは原則除外し、明示的な再検証時だけ戻す。
- 「写真だけ変えて細かく」→ READY_EXISTINGを開始点にし、同じ物理写真を別ネタへ使うかはユーザー確認で決める。OWNER'S NOTEは除外。
- 「追加撮影が必要なネタ」→ NEEDS_SHOOTのみ抽出。
- 「研究ネタだけ」→ RESEARCH / COMPARISONを優先し、Verifyを必ず確認。

---

## Wittnauer 10WA

Canonical WATCH: `src/content/watches/wittnauer-10wa.md`

| ID | Angle / asset | IG state | Other social | Media | Verify | Role | Source |
|---|---|---|---|---|---|---|---|
| WIT-01 | 普通の時計に見える／第2リューズなし／ベゼルでアラーム設定 | USED | X_LINK_PRESENT_ANGLE_UNKNOWN | READY_EXISTING | READY_FROM_WATCH | OPERATION | Published copy first Reel + WATCH guide |
| WIT-02 | Longinesベース説 vs 10S / AS1200部品共通性。ベースムーブメント未解決 | USED | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | OPEN_QUESTION | RESEARCH | Published static 2026-10-03 + WATCH Deep 03 + Gallery `IMG_6609.jpeg` |
| WIT-03 | 純正の三角錐リューズがケースへ半分隠れる。掲載個体では見た目ほど巻き上げにくくない | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | DETAIL | WATCH note + Gallery `IMG_2292.jpeg` + USER_OBSERVATION / USER_KEEP 2026-10-04 |
| WIT-04 | 9時側から見る「二階建て」ケース。後方へすり鉢状に絞られて手首への収まりが良く、ケースより張り出す回転ベゼルまで含めて側面形状を見せる | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | DETAIL | Gallery `IMG_2293.jpeg` + Horlbeck pp.152–153 + USER_OBSERVATION / USER_KEEP / USER_MERGE 2026-10-04 |
| WIT-05 | ベゼル1操作でアラーム設定＋アラームゼンマイ巻上げ | PARTIAL | X_LINK_PRESENT_ANGLE_UNKNOWN | NEEDS_SHOOT | READY_FROM_WATCH | OPERATION | WATCH Deep 02 / guide |
| WIT-06 | せっかくの裏スケでもアラーム機構は見えない。裏から見えるのは時刻側で、アラーム機構は文字盤側モジュール | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | MECHANISM | WATCH note + Deep 03 + movement photo + USER_KEEP 2026-10-04 |
| WIT-07 | 1952特許のslipping bridleと量産10WAの満巻き停止挙動の差 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | RESEARCH | WATCH Deep 04 / CH304088A |
| WIT-08 | 1950年代前半10WAと、少なくとも1955年のAS1475搭載Wittnauer | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | HISTORY | WATCH Deep 05 |
| WIT-09 | 10WA外装差：SS、黒文字盤、金張り、Longines銘等 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RIGHTS_CHECK | COMPARISON | WATCH Deep 06 |
| WIT-10 | 文字盤デザイン：クセのある数字インデックス＋波打つアラーム針を一つの造形assetとして扱う | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_SOURCE | DETAIL | WATCH note + Horlbeck pp.21,153 + USER_KEEP / USER_MERGE 2026-10-04 |
| WIT-ON | OWNER'S NOTE全体 | WHOLE_ONLY | NO_EXPLICIT_USE_FOUND_2026-10-03 | OWNER_NOTE_HERO_ONLY | READY_FROM_WATCH | OWNER_NOTE_WHOLE | WATCH `ownersNote` |

## CYMA Time-O-Vox 18K Chronomètre

Canonical WATCH: `src/content/watches/cyma-time-o-vox.md`

| ID | Angle / asset | IG state | Other social | Media | Verify | Role | Source |
|---|---|---|---|---|---|---|---|
| CYM-01 | holy grail／18K／透かしラグ／CHRONOMÈTRE／R.464／実音 | USED | X_USED_USER_CONFIRMED_2026-10-06 | READY_EXISTING | READY_FROM_WATCH | DETAIL | Published copy first Reel + WATCH |
| CYM-02 | 2プッシャーとWippeで、1本のリューズの接続先を切替 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | MECHANISM | WATCH Deep 03 + side / mechanism images |
| CYM-03 | 1香箱で時計とアラームが動力共有／約8–10秒制限／掲載個体は約9時間消費 | CANDIDATE_NOT_IN_IG_TEXT | X_USED_VERIFIED_TIMING_WHEEL | READY_EXISTING | READY_FROM_WATCH | RESEARCH | WATCH Deep 04 + existing X timing-wheel video |
| CYM-04 | 掲載個体では鳴動中にリューズが回らない | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SHOOT | READY_FROM_WATCH | MECHANISM | WATCH Deep 05 + USER_OBSERVATION + USER_KEEP 2026-10-05 |
| CYM-05 | 透かしラグ金無垢→部分透かしSS→滑らかなSS→通常ラグのケース変遷 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | COMPARISON | WATCH Deep 06 |
| CYM-06 | 裏蓋内側の18K 0.750 / Weber刻印 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | DETAIL | Gallery `cyma-caseback-inside.jpg` |
| CYM-07 | 「アラーム＋Chronomètre」の少数例という文献上の位置づけ | PARTIAL | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | RECHECK_SOURCE | RESEARCH | WATCH Deep 02 / `Alarm am Arm` |
| CYM-08 | 「アラームとクロノメーターという矛盾」＝精度を求める時計へアラーム機構を載せる設計上の緊張 | PARTIAL | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | RESEARCH | WATCH Deep 02。初回IGではChronomètre自体は使用済みだが、この設計上の緊張を主題にはしていない |
| CYM-09 | アラーム時刻を双方向で設定できる。小さなスパイラルスプリングを含む切替機構が時計回り設定も可能にする。精度重視なら反時計回り推奨 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SHOOT | READY_FROM_SOURCE | OPERATION+MECHANISM | WATCH guide + Horlbeck R.464 discussion + USER_KEEP / USER_MERGE 2026-10-05 |
| CYM-10 | Cymaflex耐震機構。ムーブメント側からC字形に見える独自の耐震構造 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_SOURCE | DETAIL+MECHANISM | Horlbeck R.464 discussion + USER_KEEP 2026-10-05 |
| CYM-11 | tone springの空間を確保するための段付きムーブメント構造。裏スケ換装後の掲載個体ケース厚・実寸は訴求に使わない | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_SOURCE | DETAIL+MECHANISM | Horlbeck R.464 discussion + USER_KEEP 2026-10-05 |
| CYM-12 | 1 crown + 2 pushersで横顔はクロノグラフ風だが、役割はalarm control | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_SOURCE | DETAIL+OPERATION | Beitl p.134 + WATCH side gallery + USER_KEEP 2026-10-05 |
| CYM-13 | 大きなhammerがムーブメントを囲むtone springを叩く発音機構 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_SOURCE | SOUND+MECHANISM | Beitl p.136 + Humbert R.464 + USER_KEEP 2026-10-05 |
| CYM-ON | OWNER'S NOTE全体 | WHOLE_ONLY | NO_EXPLICIT_USE_FOUND_2026-10-03 | OWNER_NOTE_HERO_ONLY | READY_FROM_WATCH | OWNER_NOTE_WHOLE | WATCH `ownersNote` |

## Pierce Duofon

Canonical WATCH: `src/content/watches/pierce-duofon.md`

| ID | Angle / asset | IG state | Other social | Media | Verify | Role | Source |
|---|---|---|---|---|---|---|---|
| PIE-01 | WECKER / SIGNALの2段階音量、4時リューズ切替、6時窓 | USED | POST_EXISTS_ANGLE_UNKNOWN | READY_EXISTING | READY_FROM_WATCH | OPERATION | Published copy first Reel + WATCH |
| PIE-02 | 3時リューズ：順回しで時計、逆回しでアラームを巻く | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SHOOT | READY_FROM_WATCH | OPERATION | WATCH guide |
| PIE-03 | 3時リューズ1段引き＝アラーム設定、2段引き＝時刻設定 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SHOOT | READY_FROM_WATCH | OPERATION | WATCH guide |
| PIE-04 | 4時リューズ：引く＝ON、押す＝OFF | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SHOOT | READY_FROM_WATCH | OPERATION | WATCH guide |
| PIE-05 | SIGNALでは打撃ピンが外れ、ハンマーはゴングを打たず自由振動 | USED | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | MECHANISM | WATCH Deep 02 image 02 + Published MR-PIE-001 |
| PIE-06 | WECKERでは打撃ピンが入り、ハンマーがゴングを打つ | USED | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | MECHANISM | WATCH Deep 02 image 03 + Published MR-PIE-001 |
| PIE-07 | 4時操作→内部バー移動→6時表示窓が赤／白へ連動 | PARTIAL | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | MECHANISM | WATCH Deep 02 images 01 / 04 / 05 + MR-PIE-001 uses internal linkage only; 6時窓は今回未表示 |
| PIE-08 | 1952プロトタイプ1香箱→1955完成型2香箱、後期ケース変化 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | HISTORY | WATCH Deep 03 |
| PIE-09 | Pierce Cal.135 → Gruen Cal.920 SS / Duo-Tone Precision | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | COMPARISON | WATCH Deep 04 + Gruen images |
| PIE-ON | OWNER'S NOTE全体 | WHOLE_ONLY | NO_EXPLICIT_USE_FOUND_2026-10-03 | OWNER_NOTE_HERO_ONLY | READY_FROM_WATCH | OWNER_NOTE_WHOLE | WATCH `ownersNote` |

## Basis Alarm (BFG90)

Canonical WATCH: `src/content/watches/basis-alarm.md`

| ID | Angle / asset | IG state | Other social | Media | Verify | Role | Source |
|---|---|---|---|---|---|---|---|
| BAS-01 | 巻上げ窓＋fidget toy＋2香箱＋ベゼル＋9時slider | USED | YT_USED_VERIFIED | READY_EXISTING | READY_FROM_WATCH | OPERATION | Published copy + operations YouTube `MWoqA4L2wdM` |
| BAS-02 | 1本のリューズを同方向へ回して2香箱を巻く | PARTIAL | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SHOOT | READY_FROM_WATCH | MECHANISM | WATCH Deep 02 |
| BAS-03 | 片側満巻き後、その側だけ滑らせる滑りクラッチ | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | MECHANISM | WATCH Deep 02 + mechanism image |
| BAS-04 | 1時／5時窓はパワーリザーブではなく、巻上げ状態表示 | PARTIAL | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | RESEARCH | WATCH Deep 03 |
| BAS-05 | アラーム針がベゼルへ直接つながる | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | DETAIL | Gallery `IMG_9196.jpeg` |
| BAS-06 | 同じBFG90がBasis / Lantex / Sheffield / Simplon / Tior等へ展開 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | COMPARISON | WATCH Deep 04 |
| BAS-07 | BFG90→BFG902で外に出ていたベゼル／sliderが整理される | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | COMPARISON | WATCH Deep 05 |
| BAS-08 | 9時slider単体：上OFF／下ON | PARTIAL | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | OPERATION | WATCH guide + Gallery `IMG_1969.jpeg` |
| BAS-ON | OWNER'S NOTE全体 | WHOLE_ONLY | YT_OWNER_NOTE_CTA_USED | OWNER_NOTE_HERO_ONLY | READY_FROM_WATCH | OWNER_NOTE_WHOLE | WATCH `ownersNote`; YouTube CTA evidence in operations |

## Westclox Watchlarm W5

Canonical WATCH: `src/content/watches/westclox-watchlarm.md`

| ID | Angle / asset | IG state | Other social | Media | Verify | Role | Source |
|---|---|---|---|---|---|---|---|
| WES-01 | 赤針／2時プッシャー／約12分／60回／文献15分差 | USED | YT_SCHEDULED_ONLY_2026-09-14 | READY_EXISTING | READY_FROM_WATCH | OPERATION | Published copy + experiment-log |
| WES-02 | 9時sliderを上げるとケース側に `ON` が現れる | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | OPERATION | WATCH guide + Gallery OFF/ON |
| WES-03 | 0石・別体金属軸受けなし。軸が地板／受け穴で直接回る | CANDIDATE_NOT_IN_IG_TEXT | YT_SCHEDULED_ZERO_JEWEL_ANGLE | NEEDS_SOURCE_ASSET | READY_FROM_WATCH | MECHANISM | WATCH Deep 02 + experiment-log |
| WES-04 | 1香箱で時刻とアラームを共有 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | READY_FROM_WATCH | MECHANISM | WATCH Deep 02 |
| WES-05 | プッシャー設定で追加設定歯車列と高価な回転ベゼルを省く | PARTIAL | YT_SCHEDULED_12MIN_OPERATION | READY_EXISTING | READY_FROM_WATCH | MECHANISM | WATCH Deep 03 + Gallery pusher |
| WES-06 | 元Westclox社員Danz：製造が難しく、利益も出なかったと思う | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | RECHECK_SOURCE | HISTORY | WATCH Deep 04 |
| WES-07 | ドイツ製ケース記録／Minivox底部構造との類似。ただしJunghans直接製造は未確認 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | RESEARCH | WATCH Deep 05 |
| WES-ON | OWNER'S NOTE全体 | WHOLE_ONLY | NO_EXPLICIT_USE_FOUND_2026-10-03 | OWNER_NOTE_HERO_ONLY | READY_FROM_WATCH | OWNER_NOTE_WHOLE | WATCH `ownersNote` |

## Citizen Alarm

Canonical WATCH: `src/content/watches/citizen-alarm.md`

| ID | Angle / asset | IG state | Other social | Media | Verify | Role | Source |
|---|---|---|---|---|---|---|---|
| CIT-01 | 国産初1958／2 crowns／2 barrels／中央ディスク／caseback hammer／系譜 | USED | POST_EXISTS_ANGLE_UNKNOWN | READY_EXISTING | READY_FROM_WATCH | HISTORY | Published copy first Reel + WATCH |
| CIT-02 | 4時リューズ＝時計側、2時リューズ＝アラーム側 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | OPERATION | WATCH guide + Gallery side |
| CIT-03 | 掲載個体ムーブメント刻印 `CITIZEN / 17 JEWELS / 3 ADJ` | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | DETAIL | WATCH spec + Gallery `IMG_2476.jpeg` |
| CIT-04 | Cal.980とAS1475の近似／Beitlのライセンス生産可能性 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | RESEARCH | WATCH Deep 02 |
| CIT-05 | 初期型の二重裏蓋：内側で生じた音を外側の穴から逃がす | PARTIAL | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | MECHANISM | WATCH Deep 02 + Gallery casebacks |
| CIT-06 | 同じCal.980で中央ディスク式と4針式が同時期に存在 | PARTIAL | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | COMPARISON | WATCH Deep 03 |
| CIT-07 | 「JLCからクレーム」伝説はCitizen公式／Beitl／Horlbeckで裏付け未確認 | HOLD | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | OPEN_QUESTION | RESEARCH | WATCH Deep 03 |
| CIT-08 | 系譜の最後にアラーム付き懐中時計が現れる | PARTIAL | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | HISTORY | WATCH Deep 04 |
| CIT-ON | OWNER'S NOTE全体 | WHOLE_ONLY | NO_EXPLICIT_USE_FOUND_2026-10-03 | OWNER_NOTE_HERO_ONLY | READY_FROM_WATCH | OWNER_NOTE_WHOLE | WATCH `ownersNote` |

## Cross-watch / URL funnel

| ID | Angle / asset | IG state | Other social | Media | Verify | Role | Source |
|---|---|---|---|---|---|---|---|
| GLB-01 | HOW THEY RING：GONG / CASEBACKの実機音を入口に各WATCHへ送る | CANDIDATE_NOT_IN_IG_TEXT | X_OR_OTHER_USE_RECHECK_BEFORE_REUSE | READY_EXISTING | READY_FROM_WATCH | URL_FUNNEL | `PROJECT_STATE.md` + `/en/how-they-ring/` canonical funnel |

## 3. Candidate Review Queue — AI分類 → ユーザー相談 → 正本化

ここは**正本assetの前段かつ時計横断の選択棚**。AIはここまで自律的に作ってよいが、必ず会話上でユーザーへ提示する。候補は複数WATCHを並行して増やし、ユーザーが次の「時計＋内容」を選べる状態を維持する。

Status:
- `AI_PROPOSED` — AIがSourceから切り出し・分類した候補。未承認。
- `USER_KEEP` — ユーザーが独立assetとして棚に残すことを確認。正本反映済みでもレビュー履歴として残せる。次回投稿採用とは別。
- `USER_MERGE` — 別候補／既存assetへ統合する方向を確認。
- `USER_SPLIT` — さらに分割して再提示する。
- `USER_DROP` — SNS assetとしては採用しない。

候補に最低限持つもの:
- Proposal ID（一時ID。正本asset IDではない）
- WATCH
- Candidate / category
- Existing asset relation（NEW / OVERLAP / SUBSET / SUPERSET / SAME_MEDIA）
- IG / Other social の既出候補
- Media状態
- Verify状態
- Video-fit候補
- Source

**AI_PROPOSEDは正本asset件数に数えない。候補一覧をユーザーへ見せずに USER_KEEP / MERGE / SPLIT / DROP へ進めない。**

| Proposal ID | WATCH | Candidate / category | Relation | IG / Other social | Media | Verify | Video fit | Status | Source |
|---|---|---|---|---|---|---|---|---|---|
| PR-WIT-001 | Wittnauer 10WA | 純正三角錐リューズがケースに半分隠れる。掲載個体では見た目ほど巻き上げにくくない / DETAIL | OVERLAP → WIT-03 refinement | IG本文未使用候補 | READY_EXISTING | WATCH + USER_OBSERVATION | 実機macroで形状＋隠れ方＋実際の巻上げを見せられる | USER_KEEP | WATCH note + Gallery `IMG_2292.jpeg` + user observation / confirmation 2026-10-04 |
| PR-WIT-002 | Wittnauer 10WA | 二階建てケース＋すり鉢状で手首への収まりが良い / DETAIL | SUPERSET → WIT-04 | IG本文未使用候補 | READY_EXISTING | WATCH_IMAGE + USER_OBSERVATION | 実機側面／装着で形状と収まりを見せる | USER_KEEP | Gallery `IMG_2293.jpeg` + user observation 2026-10-04 |
| PR-WIT-003 | Wittnauer 10WA | 裏スケなのにアラーム機構は見えない / MECHANISM | OVERLAP → WIT-06 refinement | IG本文未使用候補。直近staticでmovement画像使用 | NEEDS_SHOOT | READY_FROM_WATCH | 裏スケ側を見せたまま鳴らす短編候補 | USER_KEEP | WATCH note + Deep 03 + user confirmation 2026-10-04 |
| PR-WIT-004 | Wittnauer 10WA | クセのある数字インデックス。文献でもdesigner-watch的造形として評価 / DETAIL | MERGE → WIT-10 | IG本文未使用候補 | READY_EXISTING | READY_FROM_SOURCE | 波打つアラーム針と同じ正面造形として一体化 | USER_MERGE | WATCH note + Horlbeck pp.21,153 + user decision 2026-10-04 |
| PR-WIT-005 | Wittnauer 10WA | 波打つアラーム針／独特なhand design / DETAIL | MERGE → WIT-10 | IG本文未使用候補 | READY_EXISTING | READY_FROM_WATCH | クセのある数字インデックスと同じ正面造形として一体化 | USER_MERGE | WATCH note + Horlbeck modular-caliber discussion + user decision 2026-10-04 |
| PR-WIT-006 | Wittnauer 10WA | ケースより張り出す回転ベゼル＋後方へ絞るケース形状 / DETAIL | MERGE → WIT-04 | ベゼル操作自体は初回IGで使用済み | READY_EXISTING | READY_FROM_SOURCE | 独立投稿にせずWIT-04の側面形状へ統合 | USER_MERGE | Horlbeck pp.152–153 + user decision 2026-10-04 |
| PR-WIT-007 | Wittnauer 10WA | Wittnauer最初のアラーム腕時計 / HISTORY | NEW | IG本文未使用候補 | READY_EXISTING | READY_FROM_WATCH | 省エネ歴史枠として提示したが不採用 | USER_DROP | WATCH Deep 02 + user decision 2026-10-04 |
| PR-WIT-008 | Wittnauer 10WA | 文献値5–7秒 vs 掲載個体実測 / EXPERIMENT | NEW | IG本文未使用候補 | NEEDS_SHOOT | READY_FROM_SOURCE | 実測比較案として提示したが不採用 | USER_DROP | Horlbeck p.152 + user decision 2026-10-04 |
| PR-CYM-001 | CYMA Time-O-Vox 18K Chronomètre | 2プッシャーで1本のリューズの役割を切替 / OPERATION | OVERLAP → CYM-02 | IG本文未使用候補 | NEEDS_SHOOT | READY_FROM_WATCH | 実機側面。上push→巻上げ／下push→alarm設定を短く見せる | USER_KEEP | WATCH guide + CYM-02 + user confirmation 2026-10-05 |
| PR-CYM-002 | CYMA Time-O-Vox 18K Chronomètre | 掲載個体では鳴動中にリューズが回らない / MECHANISM | OVERLAP → CYM-04 | IG本文未使用候補 | NEEDS_SHOOT | USER_OBSERVATION + READY_FROM_WATCH | 実機を鳴らし、リューズ側を固定撮影 | USER_KEEP | WATCH Deep 05 + user observation / confirmation 2026-10-05 |
| PR-CYM-003 | CYMA Time-O-Vox 18K Chronomètre | 両プッシャー中央でON／どちらかを押すとOFF / OPERATION | SUBSET → CYM-02 | IG本文未使用候補 | NEEDS_SHOOT | READY_FROM_WATCH | 実機側面で中央→片側pushの変化だけ見せる | USER_KEEP | WATCH guide + user confirmation 2026-10-05 |
| PR-CYM-004 | CYMA Time-O-Vox 18K Chronomètre | 2プッシャーが連動し、一方を押すともう一方が同量だけ出る / OPERATION | SUBSET → CYM-02 | IG本文未使用候補 | NEEDS_SHOOT | READY_FROM_SOURCE | 側面固定で上下プッシャーのシーソー動作だけ見せる | USER_KEEP | WATCH Deep 03 + Humbert R.464 + user confirmation 2026-10-05 |
| PR-CYM-005 | CYMA Time-O-Vox 18K Chronomètre | 1香箱で時計とアラームが動力共有。掲載個体では1回の鳴動で約9時間分を消費 / MECHANISM+SPECIMEN | OVERLAP → CYM-03 | Xでtiming-wheelは使用済み、9時間消費はIG未使用候補 | READY_EXISTING | READY_FROM_WATCH | 実機単独で見せるならbefore/after実測カード向き。micro-Reel化は要工夫 | USER_KEEP | WATCH Deep 04 + owner measurement + user confirmation 2026-10-05 |
| PR-CYM-006 | CYMA Time-O-Vox 18K Chronomètre | 1 crown + 2 pushersで横顔はクロノグラフ風。ただし役割はalarm control / DETAIL+OPERATION | NEW → CYM-12 | IG本文未使用候補 | READY_EXISTING | READY_FROM_SOURCE | 側面一発で見える。次にpush操作へ繋げてもよい | USER_KEEP | Beitl p.134 + WATCH lead / side gallery + user confirmation 2026-10-05 |
| PR-CYM-007 | CYMA Time-O-Vox 18K Chronomètre | tone springの空間を確保するための段付きムーブメント構造 / DETAIL+MECHANISM | NEW → CYM-11 | IG本文未使用候補 | READY_EXISTING | READY_FROM_SOURCE | ムーブメント構造を主題化。裏スケ換装後の掲載個体ケース厚・実寸は訴求しない | USER_KEEP | Horlbeck R.464 discussion + user confirmation 2026-10-05 |
| PR-CYM-008 | CYMA Time-O-Vox 18K Chronomètre | 裏蓋内側の18K 0.750 / Weber刻印 / DETAIL | OVERLAP → CYM-06 | 初回IGで18K自体は使用済み、刻印は未使用 | READY_EXISTING | READY_FROM_WATCH | 裏蓋内側macro。新品訴求より証拠・ディテール枠 | USER_KEEP | Gallery `cyma-caseback-inside.jpg` + user confirmation 2026-10-05 |
| PR-CYM-009 | CYMA Time-O-Vox 18K Chronomètre | Chronomètreなのに1香箱でalarmと動力共有する設計上の緊張 / RESEARCH-COMBINATION | OVERLAP → CYM-08 + CYM-03 | 初回IGでCHRONOMÈTREは使用済み、矛盾自体は未使用 | READY_EXISTING | READY_FROM_WATCH | 3–8秒microより少し説明が必要。research Reel候補 | USER_KEEP | WATCH Deep 02 + Deep 04 + The Alarm Wristwatch chronometer section + user confirmation 2026-10-05 |
| PR-CYM-010 | CYMA Time-O-Vox 18K Chronomètre | alarm時刻は双方向設定可。精度重視なら反時計回り推奨 / OPERATION | NEW → CYM-09 | IG本文未使用候補 | NEEDS_SHOOT | READY_FROM_WATCH | 実機で左右へ設定。双方向設定そのものを主題にできる | USER_KEEP | WATCH guide + user decision 2026-10-04 |
| PR-CYM-011 | CYMA Time-O-Vox 18K Chronomètre | 大きなhammerがムーブメントを囲むtone springを叩く / SOUND-MECHANISM | NEW → CYM-13 | 初回IGで実音使用済み、発音機構は未使用 | READY_EXISTING | READY_FROM_SOURCE | movement macro＋音。LATER REUSE寄り | USER_KEEP | Beitl p.136 + Humbert R.464 + user confirmation 2026-10-05 |
| PR-CYM-012 | CYMA Time-O-Vox 18K Chronomètre | Cymaflex耐震機構。ムーブ側からC字形に見える / DETAIL+MECHANISM | NEW → CYM-10 | IG本文未使用候補 | READY_EXISTING | READY_FROM_SOURCE | movement macroで成立 | USER_KEEP | Horlbeck R.464 discussion + user confirmation 2026-10-05 |
| PR-CYM-013 | CYMA Time-O-Vox 18K Chronomètre | 双方向alarm settingを成立させる小さなスパイラルスプリングと切替機構 / MECHANISM | MERGE → CYM-09 | IG本文未使用候補 | READY_EXISTING | READY_FROM_SOURCE | 双方向設定の理由としてCYM-09へ統合 | USER_MERGE | Horlbeck R.464 discussion + user confirmation 2026-10-05 |
| PR-PIE-001 | Pierce Duofon | 3時リューズ：順回しで時計、逆回しでアラームを巻く / OPERATION | OVERLAP → PIE-02 | IG本文未使用候補 | NEEDS_SHOOT | READY_FROM_WATCH | 同じリューズを左右へ回してTIME / ALARMを対比 | AI_PROPOSED | WATCH guide + PIE-02 |
| PR-PIE-002 | Pierce Duofon | 3時リューズ1段＝alarm設定、2段＝時刻設定 / OPERATION | OVERLAP → PIE-03 | IG本文未使用候補 | NEEDS_SHOOT | READY_FROM_WATCH | 1段→2段の引き量と役割だけ見せる | AI_PROPOSED | WATCH guide + PIE-03 |
| PR-PIE-003 | Pierce Duofon | 4時リューズは引く＝ON、押す＝OFF / OPERATION | OVERLAP → PIE-04 / PIE-01 same crown | 初回IGで4時crown自体は使用済み、pull/push ON/OFFは本文未使用 | NEEDS_SHOOT | READY_FROM_WATCH | 同じ4時crownの別操作として短尺化。再利用判定要 | AI_PROPOSED | WATCH guide + Published first Reel |
| PR-BAS-001 | Basis Alarm (BFG90) | 1本のリューズを同方向へ回して2香箱を巻く / OPERATION | SUBSET → BAS-02 / BAS-01 | 初回IGでwinding＋2 barrelsは使用済み | NEEDS_SHOOT | READY_FROM_WATCH | 実機で巻上げ。新規よりLATER REUSE寄り | AI_PROPOSED | WATCH guide + Published first Reel |
| PR-WES-001 | Westclox Watchlarm W5 | 9時sliderを上げるとケース側にON表示が現れる / OPERATION | OVERLAP → WES-02 | IG本文未使用候補 | READY_EXISTING | READY_FROM_WATCH | 実機OFF→slider→ON表示。短尺向き | AI_PROPOSED | WATCH guide + Gallery OFF/ON + WES-02 |
| PR-CIT-001 | Citizen Alarm | 4時crown＝時計、2時crown＝alarm / OPERATION | OVERLAP → CIT-02 / CIT-01 | 初回IGでTwo crownsは使用済み、役割分担は本文未使用 | NEEDS_SHOOT | READY_FROM_WATCH | 2つのcrownを交互に示す。再利用判定要 | AI_PROPOSED | WATCH guide + Published first Reel |
| PR-CIT-002 | Citizen Alarm | movement刻印 CITIZEN / 17 JEWELS / 3 ADJ / DETAIL | OVERLAP → CIT-03 | IG本文未使用候補 | READY_EXISTING | READY_FROM_WATCH | 実機movement macro。動画化するなら新撮り可 | AI_PROPOSED | WATCH spec + Gallery `IMG_2476.jpeg` |
| PR-CIT-003 | Citizen Alarm | 初期型の二重裏蓋：内側で鳴らし外側の穴から音を逃がす / MECHANISM | OVERLAP → CIT-05 / CIT-01 caseback sound | 初回IGでcaseback hammerは使用済み、二重裏蓋構造は未使用 | NEEDS_SHOOT | READY_FROM_WATCH | 実機で外蓋→内蓋→穴を見せる。既出との差を相談 | AI_PROPOSED | WATCH Deep 02 + Gallery casebacks + Published first Reel |

---

## 4. 共同棚卸し状態 / Content Assignment Registry

| WATCH | Review state |
|---|---|
| Wittnauer 10WA | REVIEW_COMPLETE — WIT-03 / WIT-04 / WIT-06 / WIT-10 USER_KEEP confirmed; PR-WIT-007/008 DROP |
| CYMA Time-O-Vox 18K Chronomètre | REVIEW_COMPLETE — initial proposals accepted except explicit constraints; CYM-02/03/04/06/08/09/10/11/12/13 retained |
| Pierce Duofon | PENDING_USER_REVIEW |
| Basis Alarm (BFG90) | PENDING_USER_REVIEW |
| Westclox Watchlarm W5 | PENDING_USER_REVIEW |
| Citizen Alarm | PENDING_USER_REVIEW |

AIだけで PENDING_USER_REVIEW → USER_CONFIRMED へ変更しない。

### Content Assignment Registry

新規案はユーザーが動画への当て込みを採用した後だけ USER_CONFIRMED / PLANNED を作る。
PLANNED / SHOT / EDITED / SCHEDULED はactive lock。同じassetと同じ物理mediaを別案へ二重予約しない。

| Content ID | Platform | State | Approval | Format | Primary asset | Secondary assets | Media keys | Evidence |
|---|---|---|---|---|---|---|---|---|
| IG-WIT-001 | INSTAGRAM | PUBLISHED | LEGACY_VERIFIED | REEL | WIT-01 | — | SOCIAL:IG-WIT-FIRST-REEL | published-copy |
| IG-WIT-002 | INSTAGRAM | PUBLISHED | LEGACY_VERIFIED | STATIC_CAROUSEL | WIT-02 | — | USER:POCKETSHOT-20261003;WIT:IMG_6609.jpeg | published-copy + Insights |
| IG-CYM-001 | INSTAGRAM | PUBLISHED | LEGACY_VERIFIED | REEL | CYM-01 | — | SOCIAL:IG-CYM-FIRST-REEL | published-copy |
| IG-PIE-001 | INSTAGRAM | PUBLISHED | LEGACY_VERIFIED | REEL | PIE-01 | — | SOCIAL:IG-PIE-FIRST-REEL | published-copy |
| IG-BAS-001 | INSTAGRAM | PUBLISHED | LEGACY_VERIFIED | REEL | BAS-01 | — | SOCIAL:IG-BAS-FIRST-REEL | published-copy |
| IG-WES-001 | INSTAGRAM | PUBLISHED | LEGACY_VERIFIED | REEL | WES-01 | — | SOCIAL:IG-WES-FIRST-REEL | published-copy |
| IG-CIT-001 | INSTAGRAM | PUBLISHED | LEGACY_VERIFIED | REEL | CIT-01 | — | SOCIAL:IG-CIT-FIRST-REEL | published-copy |
| YT-BAS-20260909 | YOUTUBE | PUBLISHED | LEGACY_VERIFIED | SHORT | BAS-01 | — | YT:MWoqA4L2wdM | operations |
| X-CYM-TIMING | X | PUBLISHED | LEGACY_VERIFIED | VIDEO | CYM-03 | — | X:CYM-TIMING-WHEEL | WATCH Deep 04 |
| YT-WES-20260914 | YOUTUBE | UNVERIFIED_PAST | LEGACY_VERIFIED | SHORT | WES-03 | WES-01 | YT:GWkY7hPO89E | experiment-log |

| MR-PIE-001 | INSTAGRAM | PUBLISHED | USER_CONFIRMED | REEL | PIE-07 | PIE-05,PIE-06 | PIE:WECKER-SIGNAL-SWITCH-VIDEO | published 2026-10-05 around 08:30 JST; exact copy in instagram-published-copy; first-hour Insights in instagram-insights-timeseries |

現在の新規active reservationは0件。MR-PIE-001は2026-10-05にPUBLISHEDへ移行。


### Execution Brief Registry

Execution Briefは**activeな投稿contentだけ**に作る。asset棚全体へ展開しない。Instagramのactive assignment（PLANNED / SHOT / EDITED / SCHEDULED）は対応する `EB:<Content ID>` を1件持つ。PLANNEDで実素材がまだ無い場合だけ `MEDIA_PENDING` を許容し、SHOT以降は `MEDIA_VERIFIED` 必須。

#### EB:MR-PIE-001
- Status: MEDIA_VERIFIED
- Media reality: ムーブメント側のみ。文字盤は出ない。アラームを実際に鳴らしながら、左上側のアラーム機構を動かしてWECKER / SIGNALを切り替える実演素材。
- Attention cue: 冒頭で「左上のアラーム部分」に視線を固定し、機構の動きと音の変化を同時に追わせる。
- Sensory proof: 内部機構が動く視覚情報と、切替に伴う鳴り方の変化を同じ実素材で提示できる。
- Causal beat: 4時位置の操作 → 内部の連動機構／バーが動く → 打撃ピンの位置が切り替わる → WECKER / SIGNALで発音挙動が変わる。
- Published collision: 初回Duofon Reelですでに「2 selectable alarm volumes」「WECKER=loud / SIGNAL=discreet」「4時操作」「6時窓」は紹介済み。今回は2種類の存在紹介を繰り返すのではなく、その切替が内部でどう起きるかを実演する深掘り。
- Carry-forward: 過去実投稿の「最初に観察対象を指定する」型、実機・実音・操作・機構差を主役にする運用、今回ユーザー訂正の「位置を先に示し、視覚と聴覚を同時誘導し、機構説明を省きすぎない」を適用する。
- Constraints: 文字盤／6時表示窓／別カットは素材に無いので勝手に足さない。一般的な「2種類の音があります」だけへ薄めない。未確認の編集展開を発明しない。
- Working copy: PUBLISHED。実投稿全文は `instagram-published-copy.md`、初回Insightsは `instagram-insights-timeseries.md` を正本とする。USER_WORKING_DRAFTは履歴として `instagram-operations.md` に保持。

---
## 5. Legacy / Project recovery audit

### 2026-10-03 — 旧引継ぎ資産の逆引き監査

- Project / Library `VINTAGE_ALARM_完全引継ぎ_2026-09-09(1).md` を、Pierce / CYMA / Basis / SNS観点で再検索した。
- 旧引継ぎにある独立研究軸（CYMAの「アラームとクロノメーターという矛盾」、Wippe、単一香箱、鳴動中のリューズ、ケース／ラグ、Basisの一方向双香箱→滑りクラッチ→二窓、Pierceの機構・操作）は現行WATCHと照合し、inventoryへ対応行があることを確認した。
- 旧引継ぎにある `マナーモードの祖先!?` / `鳴る黄金のクロノメーター` / `触って、見て、聴いて楽しむおもちゃ箱。` と、Basis OWNER'S NOTE内の `セミの鳴き声` 等は、OWNER'S NOTE由来の完成表現として**個別投稿資産へ分解しない**。各 `*-ON` 行へ包含する。
- 旧引継ぎは2026-09-09時点の履歴資料であり、事実・現在状態の正本には昇格しない。現行WATCH / research / social canonと衝突する場合は現行正本を優先する。
- この監査の目的は「古いチャットを毎回読み直すこと」ではなく、**引き継ぎ後はinventoryから始めても既知の独立資産を落としにくい状態にすること**。

---

## 6. 更新契約

- 実投稿が公開確認されたら、同じ変更セットで `instagram-published-copy.md` を更新し、対応inventory rowを `USED` または `PARTIAL` へ更新する。
- 同じ時計の別投稿は、Insights側では `content_id` を分ける。inventoryのIDとInsights `content_id` は役割が違うため同一IDへ統合しない。
- 投稿本文に入らなかっただけで「完全未使用」と断定しない。映像内使用が不明なら `CANDIDATE_NOT_IN_IG_TEXT` のまま。
- X / YouTubeの過去投稿を新しく確認したら `Other social` を更新する。`NO_EXPLICIT_USE_FOUND...` を永久状態にしない。
- 追加撮影が済んだら `NEEDS_SHOOT → READY_EXISTING`。資料確認が済んだら `RECHECK_SOURCE` 等を適切に更新する。
- WATCH本文の事実が変わった場合、inventory本文を事実正本として守ろうとせず、WATCHへ追随させる。
- OWNER'S NOTEをSNSへ使う場合、`*-ON` 行を一つの投稿資産として扱う。**内部のleadや一文を複数行へ増殖させない。**
- AIは新しいasset候補を Candidate Review Queue へ `AI_PROPOSED` として分類してよい。**候補は会話上で必ずユーザーへ提示し、相談結果が出るまで正本asset表へ反映しない。**
- 新規動画案をPLANNEDにするにはApproval=USER_CONFIRMEDが必須。
- active contentに予約済みのasset / media keyを新しい候補として再提案しない。
- 同じ物理写真／動画のcrop違いは同一media keyとして扱う。

