# VINTAGE ALARM — Social Content Inventory

> VAの研究資産・写真・操作・機構・OWNER'S NOTEを、SNS再利用のために横断して探す**索引正本**。
> ここは事実の一次正本ではない。投稿へ使う直前に必ず `Source` のWATCH / research / social正本を開いて再確認する。

## 0. このファイルの役割

- 「保存されているVA資産 → 次のSNS投稿候補」を毎回ゼロから掘り直さないための**商品棚**。
- 既出 / 部分既出 / Instagram本文では未使用 / 要追加撮影 / 要追加検証 / URL誘導向けを、時計ごとに一覧化する。
- `instagram-published-copy.md` は**実投稿本文の証拠正本**、本ファイルは**再利用索引**。役割を混ぜない。
- 数値はここへ複製しない。Instagram数値は `instagram-insights-timeseries.md`、分析判断は `instagram-operations.md`。
- **OWNER'S NOTE は分割しない。** 1個体のOWNER'S NOTEを一つの完成物として扱い、leadや本文の一文を別々の投稿ネタへ切り刻まない。

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
- `RECHECK_SOURCE` — 文献表現・比較条件・資料差を投稿直前に再確認する。
- `OPEN_QUESTION` — 未解決であること自体が主題。結論へ変換しない。
- `RIGHTS_CHECK` — 外部画像・資料図等を使う場合の権利確認が必要。

`Other social` の `NO_EXPLICIT_USE_FOUND_2026-10-03` は「2026-10-03時点の現行social canonで同じ訴求の明示使用を見つけていない」という意味だけ。**絶対に未使用という意味ではない。**

## 2. 引き継ぎ後の強制手順

1. `PROJECT.md` → `AGENTS.md` → `PROJECT_STATE.md` → Social `ROUTER.md` を読む。
2. 投稿案なら、この `content-inventory.md` を**記憶より先に**開く。
3. `USED` は新案として出さない。`PARTIAL` は再利用理由を付ける。`CANDIDATE_NOT_IN_IG_TEXT` を優先する。
4. 候補の `Source` を開き、事実・確度・写真の存在を再確認する。
5. `Other social` が不明／古い場合は `instagram-operations.md` / `experiment-log.md` / 現行SNS証拠で再照合する。
6. 投稿後は `instagram-published-copy.md` と本inventoryを**同じ変更セット**で更新する。Insightsが来たら時系列正本も別途更新する。
7. WATCH / Deep Diveへ新しい独立ネタ・写真・操作資産を追加した場合、SNS再利用価値があるなら同じPRでinventoryへ追加する。追加しない場合はPR本文に理由を残す。

### よくある要求の処理

- 「未使用角度を全部」→ `CANDIDATE_NOT_IN_IG_TEXT` を抽出し、Other socialとSourceを再確認。
- 「既出を除いて」→ `USED` を除外。`PARTIAL` は原則除外し、明示的な再検証時だけ戻す。
- 「写真だけ変えて細かく」→ `Media=READY_EXISTING` を優先。ただしOWNER'S NOTEは除外。
- 「追加撮影が必要なネタ」→ `Media=NEEDS_SHOOT` のみ抽出。
- 「研究ネタだけ」→ `Role=RESEARCH` / `COMPARISON` を優先し、`Verify` を必ず確認。
- 「URLへ送る投稿」→ `Role=URL_FUNNEL` を使い、現行CANONICAL FUNNELを変更しない。

---

## Wittnauer 10WA

Canonical WATCH: `src/content/watches/wittnauer-10wa.md`

| ID | Angle / asset | IG state | Other social | Media | Verify | Role | Overlap / collision | Micro fit | Micro treatment | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| WIT-01 | 普通の時計に見える／第2リューズなし／ベゼルでアラーム設定 | USED | X_LINK_PRESENT_ANGLE_UNKNOWN | READY_EXISTING | READY_FROM_WATCH | OPERATION | WIT-05,WIT-11 | BASELINE_USED | 既存初回Reel。再利用は明示的なformat／媒体横断再検証時のみ。 | Published copy first Reel + WATCH guide |
| WIT-02 | Longinesベース説 vs 10S / AS1200部品共通性。ベースムーブメント未解決 | USED | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | OPEN_QUESTION | RESEARCH | — | BASELINE_USED | 2026-10-03静止画で使用済み。micro-Reel化は明示的なformat再検証時のみ。 | Published static 2026-10-03 + WATCH Deep 03 + Gallery `IMG_6609.jpeg` |
| WIT-03 | ケースへ半分隠れる三角錐リューズ | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | DETAIL | — | READY_3_8S | 3–4秒macro。正面からリューズ側へ寄り、文字は "Half hidden." 程度。 | WATCH note + Gallery `IMG_2292.jpeg` |
| WIT-04 | 9時側から見る「二階建て」ケース | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | DETAIL | — | READY_3_8S | 3–4秒。正面から9時側へ振って二階建て形状を見せる。文字は "Two stories." 程度。 | Gallery `IMG_2293.jpeg` |
| WIT-05 | ベゼル1操作でアラーム設定＋アラームゼンマイ巻上げ | PARTIAL | X_LINK_PRESENT_ANGLE_UNKNOWN | NEEDS_SHOOT | READY_FROM_WATCH | OPERATION | WIT-01 | RETEST_ONLY | 5–6秒。ベゼル回転→アラーム針。"SET + WIND"。初回Reelとの重複理由を必須にする。 | WATCH Deep 02 / guide |
| WIT-06 | 裏から見えるのは時刻側。アラーム機構は文字盤側モジュール | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | MECHANISM | WIT-12 | READY_3_8S | 4–6秒。裏スケの時刻側→文字盤側を示す。"Alarm: other side." | WATCH note + Deep 03 + movement photo |
| WIT-07 | 1952特許のslipping bridleと量産10WAの満巻き停止挙動の差 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | RESEARCH | — | SOURCE_5_8S | 6–8秒。特許図→量産機。slipping bridleと満巻き停止の差だけを見せる。 | WATCH Deep 04 / CH304088A |
| WIT-08 | 1950年代前半10WAと、少なくとも1955年のAS1475搭載Wittnauer | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | HISTORY | — | SOURCE_5_8S | 5–7秒。10WA→1955年AS1475搭載例。"By 1955: AS 1475." 程度。 | WATCH Deep 05 |
| WIT-09 | 10WA外装差：SS、黒文字盤、金張り、Longines銘等 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RIGHTS_CHECK | COMPARISON | — | SOURCE_5_8S | 6–8秒。外装差montage。"Same 10WA. Different faces." | WATCH Deep 06 |
| WIT-10 | 波打つアラーム針 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | DETAIL | — | READY_3_8S | 3–4秒macro。波打つアラーム針だけを追う。文字は "Alarm hand." 程度。 | WATCH note + Gallery IMG_5792.jpeg |
| WIT-11 | アラーム専用ON/OFFスイッチを持たない | PARTIAL | X_LINK_PRESENT_ANGLE_UNKNOWN | READY_EXISTING | READY_FROM_WATCH | OPERATION | WIT-01 | RETEST_ONLY | 3–5秒。正面→側面。"No ON/OFF."。初回の obvious alarm control なしと重なるため再検証理由必須。 | WATCH guide + Published copy first Reel |
| WIT-12 | 時刻側とアラーム側が独立2香箱。アラーム機構は文字盤側module | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | READY_FROM_WATCH | MECHANISM | WIT-06 | SOURCE_5_8S | 5–7秒。時刻側movement→文字盤側alarm module図。"Two barrels. Two layers." 程度。 | WATCH Deep 03 |
| WIT-ON | OWNER'S NOTE全体 | WHOLE_ONLY | NO_EXPLICIT_USE_FOUND_2026-10-03 | OWNER_NOTE_HERO_ONLY | READY_FROM_WATCH | OWNER_NOTE_WHOLE | — | WHOLE_ONLY | OWNER NOTEは1完成物。leadや本文へ分割しない。 | WATCH `ownersNote` |

## CYMA Time-O-Vox 18K Chronomètre

Canonical WATCH: `src/content/watches/cyma-time-o-vox.md`

| ID | Angle / asset | IG state | Other social | Media | Verify | Role | Overlap / collision | Micro fit | Micro treatment | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| CYM-01 | holy grail／18K／透かしラグ／CHRONOMÈTRE／R.464／実音 | USED | X_LINK_PRESENT_ANGLE_UNKNOWN | READY_EXISTING | READY_FROM_WATCH | DETAIL | CYM-07,CYM-08 | BASELINE_USED | 既存初回Reel。18K／透かしラグ／CHRONOMÈTRE／R.464／実音は新ネタ扱いしない。 | Published copy first Reel + WATCH |
| CYM-02 | 2プッシャーとWippeで、1本のリューズの接続先を切替 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | MECHANISM | CYM-09 | READY_3_8S | 6–8秒。側面→Wippe機構。"One crown. Three jobs." 程度。 | WATCH Deep 03 + side / mechanism images |
| CYM-03 | 1香箱で時計とアラームが動力を共有 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | RESEARCH | CYM-08,CYM-11,CYM-12 | READY_3_8S | 4–6秒。香箱側の機構画像＋短文 "One barrel. Two jobs."。 | WATCH Deep 04 |
| CYM-04 | 鳴動中に巻上げ側が切れ、リューズが回らない | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SHOOT | READY_FROM_WATCH | MECHANISM | — | SHOOT_3_8S | 4–6秒。鳴動中のリューズを固定撮影し、回転しないことだけ見せる。 | WATCH Deep 05 |
| CYM-05 | 透かしラグ金無垢→部分透かしSS→滑らかなSS→通常ラグのケース変遷 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | COMPARISON | — | SOURCE_5_8S | 6–8秒。金無垢透かし→部分透かしSS→滑らかSS→通常ラグを時系列で切替。 | WATCH Deep 06 |
| CYM-06 | 裏蓋内側の18K 0.750 / Weber刻印 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | DETAIL | — | READY_3_8S | 3–5秒macro。裏蓋内側の18K 0.750 / Weber刻印へ寄る。 | Gallery `cyma-caseback-inside.jpg` |
| CYM-07 | 「アラーム＋Chronomètre」の少数例という文献上の位置づけ | PARTIAL | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | RECHECK_SOURCE | RESEARCH | CYM-01,CYM-08 | RETEST_ONLY | Chronomètre自体は初回既出。文献上の少数例という別検証時だけsource-card化。 | WATCH Deep 02 / `Alarm am Arm` |
| CYM-08 | 「アラームとクロノメーターという矛盾」＝精度を求める時計へアラーム機構を載せる設計上の緊張 | PARTIAL | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | RESEARCH | CYM-01,CYM-03,CYM-07 | RETEST_ONLY | 5–7秒。精度を求めるChronomètreと動力を食うalarmの緊張だけを対置。 | WATCH Deep 02。初回IGではChronomètre自体は使用済みだが、この設計上の緊張を主題にはしていない |
| CYM-09 | 両プッシャー中央位置でON／どちらかを押すとOFF | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SHOOT | READY_FROM_WATCH | OPERATION | CYM-02 | SHOOT_3_8S | 4–6秒。中央位置→片側push。"ON / OFF" だけ。 | WATCH guide + Deep 03 |
| CYM-10 | アラーム時刻は双方向設定。精度重視なら反時計回り推奨 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SHOOT | READY_FROM_WATCH | OPERATION | — | SHOOT_3_8S | 5–7秒。同じalarm settingを両方向へ短く見せる。推奨方向の理由はcaptionで正本どおりに限定。 | WATCH guide |
| CYM-11 | 鳴動時間を約8–10秒に制限。掲載個体のtiming wheelは約8秒作動 | CANDIDATE_NOT_IN_IG_TEXT | X_USED_VERIFIED_TIMING_WHEEL | READY_EXISTING | READY_FROM_WATCH | MECHANISM | CYM-03 | CROSS_PLATFORM_RETEST | 5–8秒。既存timing-wheel動画を短く再編集。"~8 sec."。X→Instagram媒体横断再検証。 | WATCH Deep 04 + existing X timing-wheel video |
| CYM-12 | 掲載個体は1回の鳴動で約9時間分のパワーリザーブを消費 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | READY_FROM_WATCH | RESEARCH | CYM-03 | RESEARCH_CARD | 5–7秒。before/after実測の根拠素材が揃う場合のみ。"One ring ≈ 9h." | WATCH Deep 04 |
| CYM-ON | OWNER'S NOTE全体 | WHOLE_ONLY | NO_EXPLICIT_USE_FOUND_2026-10-03 | OWNER_NOTE_HERO_ONLY | READY_FROM_WATCH | OWNER_NOTE_WHOLE | — | WHOLE_ONLY | OWNER NOTEは1完成物。leadや本文へ分割しない。 | WATCH `ownersNote` |

## Pierce Duofon

Canonical WATCH: `src/content/watches/pierce-duofon.md`

| ID | Angle / asset | IG state | Other social | Media | Verify | Role | Overlap / collision | Micro fit | Micro treatment | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| PIE-01 | WECKER / SIGNALの2段階音量、4時リューズ切替、6時窓 | USED | POST_EXISTS_ANGLE_UNKNOWN | READY_EXISTING | READY_FROM_WATCH | OPERATION | PIE-04,PIE-05,PIE-06,PIE-07,PIE-11 | BASELINE_USED | 既存初回Reel。WECKER/SIGNAL・4時切替・6時窓を新ネタ扱いしない。 | Published copy first Reel + WATCH |
| PIE-02 | 3時リューズ：順回しで時計、逆回しでアラームを巻く | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SHOOT | READY_FROM_WATCH | OPERATION | — | SHOOT_3_8S | 5–7秒。同じ3時リューズを順回し→逆回し。"TIME / ALARM"。 | WATCH guide |
| PIE-03 | 3時リューズ1段引き＝アラーム設定、2段引き＝時刻設定 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SHOOT | READY_FROM_WATCH | OPERATION | — | SHOOT_3_8S | 5–7秒。3時リューズ1段→2段。"ALARM / TIME"。 | WATCH guide |
| PIE-04 | 4時リューズ：引く＝ON、押す＝OFF | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SHOOT | READY_FROM_WATCH | OPERATION | PIE-01 | SHOOT_3_8S | 4–5秒。4時リューズを引く→押す。"ON / OFF"。音量切替とは分離する。 | WATCH guide |
| PIE-05 | SIGNALでは打撃ピンが外れ、ハンマーはゴングを打たず自由振動 | PARTIAL | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | MECHANISM | PIE-01,PIE-06 | RETEST_ONLY | 5–7秒。SIGNAL機構画像で打撃ピンが外れた状態だけ見せる。 | WATCH Deep 02 image 02 |
| PIE-06 | WECKERでは打撃ピンが入り、ハンマーがゴングを打つ | PARTIAL | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | MECHANISM | PIE-01,PIE-05 | RETEST_ONLY | 5–7秒。WECKER機構画像で打撃ピンが入る状態だけ見せる。 | WATCH Deep 02 image 03 |
| PIE-07 | 4時操作→内部バー移動→6時表示窓が赤／白へ連動 | PARTIAL | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | MECHANISM | PIE-01 | RETEST_ONLY | 6–8秒。4時操作→内部バー→6時窓の連動を1連続で見せる。 | WATCH Deep 02 images 01 / 04 / 05 |
| PIE-08 | 1952プロトタイプ1香箱→1955完成型2香箱、後期ケース変化 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | HISTORY | — | SOURCE_5_8S | 6–8秒。1952 prototype 1香箱→1955完成型2香箱→後期ケース。 | WATCH Deep 03 |
| PIE-09 | Pierce Cal.135 → Gruen Cal.920 SS / Duo-Tone Precision | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | COMPARISON | — | READY_3_8S | 6–8秒。Pierce Cal.135→Gruen Cal.920 SSをdial／movementで対置。 | WATCH Deep 04 + Gruen images |
| PIE-10 | Cal.135：21石・18,000振動／時・2香箱 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | DETAIL | — | READY_3_8S | 4–6秒。Cal.135 movementへ寄り、文字は "21 jewels / 2 barrels" 程度。 | WATCH spec + Deep 02 mechanism images |
| PIE-11 | 1955技術資料ではSIGNALを会議・社交など大音量不要の場面に想定 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | HISTORY | PIE-01 | SOURCE_5_8S | 6–8秒。1955技術資料→SIGNAL表示。用途を資料記載の範囲だけで示す。 | WATCH Deep 02 / 1955 Pierce technical material |
| PIE-ON | OWNER'S NOTE全体 | WHOLE_ONLY | NO_EXPLICIT_USE_FOUND_2026-10-03 | OWNER_NOTE_HERO_ONLY | READY_FROM_WATCH | OWNER_NOTE_WHOLE | — | WHOLE_ONLY | OWNER NOTEは1完成物。leadや本文へ分割しない。 | WATCH `ownersNote` |

## Basis Alarm (BFG90)

Canonical WATCH: `src/content/watches/basis-alarm.md`

| ID | Angle / asset | IG state | Other social | Media | Verify | Role | Overlap / collision | Micro fit | Micro treatment | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| BAS-01 | 巻上げ窓＋fidget toy＋2香箱＋ベゼル＋9時slider | USED | YT_USED_VERIFIED | READY_EXISTING | READY_FROM_WATCH | OPERATION | BAS-02,BAS-04,BAS-08 | BASELINE_USED | 既存Instagram＋YouTube fidget訴求。巻上げ窓／2香箱／ベゼル／sliderを新ネタ扱いしない。 | Published copy + operations YouTube `MWoqA4L2wdM` |
| BAS-02 | 1本のリューズを同方向へ回して2香箱を巻く | PARTIAL | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SHOOT | READY_FROM_WATCH | MECHANISM | BAS-01,BAS-03 | RETEST_ONLY | 5–7秒。1本のリューズを同方向へ回す操作だけ。2香箱既出のため機構再検証として扱う。 | WATCH Deep 02 |
| BAS-03 | 片側満巻き後、その側だけ滑らせる滑りクラッチ | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | MECHANISM | BAS-02 | READY_3_8S | 5–7秒。滑りクラッチ部へ寄り、"One side slips." 程度。 | WATCH Deep 02 + mechanism image |
| BAS-04 | 1時／5時窓はパワーリザーブではなく、巻上げ状態表示 | PARTIAL | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | RESEARCH | BAS-01 | RETEST_ONLY | 5–7秒。窓の回転→停止。"Not power reserve." と意味だけ深掘り。 | WATCH Deep 03 |
| BAS-05 | アラーム針がベゼルへ直接つながる | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | DETAIL | — | READY_3_8S | 3–5秒。ベゼル操作とアラーム針の直結だけを見せる。 | Gallery `IMG_9196.jpeg` |
| BAS-06 | 同じBFG90がBasis / Lantex / Sheffield / Simplon / Tior等へ展開 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | COMPARISON | — | SOURCE_5_8S | 6–8秒。Basis / Lantex / Sheffield / Simplon / Tiorを同一BFG90で切替。 | WATCH Deep 04 |
| BAS-07 | BFG90→BFG902で外に出ていたベゼル／sliderが整理される | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | COMPARISON | — | SOURCE_5_8S | 6–8秒。BFG90の外部操作部→BFG902で整理される変化だけを見せる。 | WATCH Deep 05 |
| BAS-08 | 9時slider単体：上OFF／下ON | PARTIAL | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | OPERATION | BAS-01 | RETEST_ONLY | 4–5秒。9時sliderを上OFF→下ON。初回本文でslider存在は既出。 | WATCH guide + Gallery `IMG_1969.jpeg` |
| BAS-09 | 柱式構造で複雑な切削加工を減らした | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | MECHANISM | — | READY_3_8S | 5–7秒。movement全景から柱へ寄る。"Built to simplify." 程度。 | WATCH Deep 01 + mechanism image |
| BAS-10 | 時刻合わせ機構を文字盤下ではなくムーブメント側へ配置 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | MECHANISM | BAS-09 | READY_3_8S | 5–7秒。movement側の設定機構へ寄る。位置だけを説明。 | WATCH Deep 01 + mechanism image |
| BAS-11 | カップリングレバー自体がバネを兼ね、別体バネを省く | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | MECHANISM | BAS-09 | READY_3_8S | 5–7秒。lever部macro。"Lever + spring." 程度。 | WATCH Deep 01 + mechanism image |
| BAS-12 | スクリューバランス風の突起はネジではなく一体成形の半丸飾り | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | DETAIL | — | READY_3_8S | 4–6秒。balanceへ寄る。"Looks like screws. Is not." 程度。 | WATCH Deep 01 + mechanism image |
| BAS-ON | OWNER'S NOTE全体 | WHOLE_ONLY | YT_OWNER_NOTE_CTA_USED | OWNER_NOTE_HERO_ONLY | READY_FROM_WATCH | OWNER_NOTE_WHOLE | — | WHOLE_ONLY | OWNER NOTEは1完成物。leadや本文へ分割しない。 | WATCH `ownersNote`; YouTube CTA evidence in operations |

## Westclox Watchlarm W5

Canonical WATCH: `src/content/watches/westclox-watchlarm.md`

| ID | Angle / asset | IG state | Other social | Media | Verify | Role | Overlap / collision | Micro fit | Micro treatment | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| WES-01 | 赤針／2時プッシャー／約12分／60回／文献15分差 | USED | YT_SCHEDULED_ONLY_2026-09-14 | READY_EXISTING | READY_FROM_WATCH | OPERATION | WES-05 | BASELINE_USED | 既存初回Reel。赤針／2時pusher／12分／60回／15分資料差を新ネタ扱いしない。 | Published copy + experiment-log |
| WES-02 | 9時sliderを上げるとケース側に `ON` が現れる | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | OPERATION | — | READY_3_8S | 4–5秒。9時slider OFF→ON。ケースからONが現れる変化だけ。 | WATCH guide + Gallery OFF/ON |
| WES-03 | 0石・別体金属軸受けなし。軸が地板／受け穴で直接回る | CANDIDATE_NOT_IN_IG_TEXT | YT_SCHEDULED_ZERO_JEWEL_ANGLE | NEEDS_SOURCE_ASSET | READY_FROM_WATCH | MECHANISM | WES-08,WES-09 | CROSS_PLATFORM_RETEST | 5–7秒。0石と軸が穴で直接回る構造だけ。YouTube zero-jewel訴求の再検証扱い。 | WATCH Deep 02 + experiment-log |
| WES-04 | 1香箱で時刻とアラームを共有 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | READY_FROM_WATCH | MECHANISM | WES-09 | SOURCE_5_8S | 5–7秒。1香箱から時刻＋alarmへ動力が分かれる構造だけ。 | WATCH Deep 02 |
| WES-05 | プッシャー設定で追加設定歯車列と高価な回転ベゼルを省く | PARTIAL | YT_SCHEDULED_12MIN_OPERATION | READY_EXISTING | READY_FROM_WATCH | MECHANISM | WES-01 | RETEST_ONLY | 5–7秒。pusher採用で回転ベゼル／追加設定歯車列を省いた設計だけを深掘り。 | WATCH Deep 03 + Gallery pusher |
| WES-06 | 元Westclox社員Danz：製造が難しく、利益も出なかったと思う | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | RECHECK_SOURCE | HISTORY | WES-12 | RESEARCH_CARD | 5–7秒。Danz証言の製造難／採算難だけをsource-card化。 | WATCH Deep 04 |
| WES-07 | ドイツ製ケース記録／Minivox底部構造との類似。ただしJunghans直接製造は未確認 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | RESEARCH | — | SOURCE_5_8S | 6–8秒。German case記録→Minivox類似。Junghans直接製造とは言わない。 | WATCH Deep 05 |
| WES-08 | フルプレート式。通常のブリッジの代わりに円形受け板を重ねる | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | READY_FROM_WATCH | MECHANISM | WES-03 | SOURCE_5_8S | 5–7秒。movement sourceで円形受け板の重なりだけを示す。 | WATCH Deep 02 |
| WES-09 | 1香箱で約38時間の時刻持続と約10秒のアラーム鳴動を成立 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | READY_FROM_WATCH | MECHANISM | WES-03,WES-04 | SOURCE_5_8S | 5–7秒。"1 barrel / ~38h / ~10s alarm" を短いmechanism cardで。 | WATCH Deep 02 |
| WES-10 | 1956頃LaSalle工場は4,000人超・1日約40,000個。Big Ben / Baby Benは数千万台規模 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | HISTORY | — | SOURCE_5_8S | 6–8秒。工場／資料画像が権利確認できた場合のみ、量産規模の数字を1〜2個へ絞る。 | WATCH Deep 01 |
| WES-12 | 元Westclox社員DanzはW5にW4部品が一部使われた可能性を指摘 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | RESEARCH | WES-06 | RESEARCH_CARD | 5–7秒。W4→W5対置。"possibly shared parts" と可能性表現を維持。 | WATCH Deep 01 / Deep 04 |
| WES-ON | OWNER'S NOTE全体 | WHOLE_ONLY | NO_EXPLICIT_USE_FOUND_2026-10-03 | OWNER_NOTE_HERO_ONLY | READY_FROM_WATCH | OWNER_NOTE_WHOLE | — | WHOLE_ONLY | OWNER NOTEは1完成物。leadや本文へ分割しない。 | WATCH `ownersNote` |

## Citizen Alarm

Canonical WATCH: `src/content/watches/citizen-alarm.md`

| ID | Angle / asset | IG state | Other social | Media | Verify | Role | Overlap / collision | Micro fit | Micro treatment | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| CIT-01 | 国産初1958／2 crowns／2 barrels／中央ディスク／caseback hammer／系譜 | USED | POST_EXISTS_ANGLE_UNKNOWN | READY_EXISTING | READY_FROM_WATCH | HISTORY | CIT-02,CIT-05,CIT-06,CIT-08,CIT-09 | BASELINE_USED | 既存初回Reel。1958国産初／2 crowns／2 barrels／中央disc／caseback hammer／系譜を新ネタ扱いしない。 | Published copy first Reel + WATCH |
| CIT-02 | 4時リューズ＝時計側、2時リューズ＝アラーム側 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | OPERATION | CIT-01 | READY_3_8S | 5秒。2時crownにALARM、4時crownにTIME。機能分担だけ。 | WATCH guide + Gallery side |
| CIT-03 | 掲載個体ムーブメント刻印 `CITIZEN / 17 JEWELS / 3 ADJ` | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | DETAIL | — | READY_3_8S | 3–5秒macro。movement刻印 CITIZEN / 17 JEWELS / 3 ADJ のみ。 | WATCH spec + Gallery `IMG_2476.jpeg` |
| CIT-04 | Cal.980とAS1475の近似／Beitlのライセンス生産可能性 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | RESEARCH | — | SOURCE_5_8S | 6–8秒。Cal.980とAS1475の近似を資料対置。licenseは可能性表現を維持。 | WATCH Deep 02 |
| CIT-05 | 初期型の二重裏蓋：内側で生じた音を外側の穴から逃がす | PARTIAL | NO_EXPLICIT_USE_FOUND_2026-10-03 | READY_EXISTING | READY_FROM_WATCH | MECHANISM | CIT-01 | RETEST_ONLY | 5–7秒。内蓋→外蓋の穴。音の逃がし方だけを深掘り。 | WATCH Deep 02 + Gallery casebacks |
| CIT-06 | 同じCal.980で中央ディスク式と4針式が同時期に存在 | PARTIAL | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | COMPARISON | CIT-01 | RETEST_ONLY | 6–8秒。同じCal.980で中央disc式→4針式。系譜既出なので比較目的を明示。 | WATCH Deep 03 |
| CIT-07 | 「JLCからクレーム」伝説はCitizen公式／Beitl／Horlbeckで裏付け未確認 | HOLD | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | OPEN_QUESTION | RESEARCH | — | HOLD | 未裏付け伝説。結論化しない。追加一次資料が出るまで動画化しない。 | WATCH Deep 03 |
| CIT-08 | 系譜の最後にアラーム付き懐中時計が現れる | PARTIAL | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | HISTORY | CIT-01 | RETEST_ONLY | 5–7秒。系譜の最後がalarm pocket watchになる一点だけ。初回系譜との重複理由必須。 | WATCH Deep 04 |
| CIT-09 | 1958年：5月Auto→6月Alarm→8月Super Deluxeという新機能投入の並び | PARTIAL | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | HISTORY | CIT-01 | SOURCE_5_8S | 6–8秒。May / Jun / Augの3点だけを時系列card化。Alarmの1958自体は初回既出。 | WATCH Deep 01 |
| CIT-10 | 1957年には時計部品用の自動旋盤や測定機器も自社開発 | CANDIDATE_NOT_IN_IG_TEXT | NO_EXPLICIT_USE_FOUND_2026-10-03 | NEEDS_SOURCE_ASSET | RECHECK_SOURCE | HISTORY | — | SOURCE_5_8S | 5–7秒。1957 production tech→1958 Alarmへ1段だけ接続。 | WATCH Deep 01 |
| CIT-ON | OWNER'S NOTE全体 | WHOLE_ONLY | NO_EXPLICIT_USE_FOUND_2026-10-03 | OWNER_NOTE_HERO_ONLY | READY_FROM_WATCH | OWNER_NOTE_WHOLE | — | WHOLE_ONLY | OWNER NOTEは1完成物。leadや本文へ分割しない。 | WATCH `ownersNote` |

## Cross-watch / URL funnel

| ID | Angle / asset | IG state | Other social | Media | Verify | Role | Overlap / collision | Micro fit | Micro treatment | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| GLB-01 | HOW THEY RING：GONG / CASEBACKの実機音を入口に各WATCHへ送る | CANDIDATE_NOT_IN_IG_TEXT | X_OR_OTHER_USE_RECHECK_BEFORE_REUSE | READY_EXISTING | READY_FROM_WATCH | URL_FUNNEL | — | READY_3_8S | 6–8秒。GONG / CASEBACKを1音ずつ短く対置し、HOW THEY RING入口へ接続。 | `PROJECT_STATE.md` + `/en/how-they-ring/` canonical funnel |

## 3. Legacy / Project recovery audit

### 2026-10-03 — 旧引継ぎ資産の逆引き監査

- Project / Library `VINTAGE_ALARM_完全引継ぎ_2026-09-09(1).md` を、Pierce / CYMA / Basis / SNS観点で再検索した。
- 旧引継ぎにある独立研究軸（CYMAの「アラームとクロノメーターという矛盾」、Wippe、単一香箱、鳴動中のリューズ、ケース／ラグ、Basisの一方向双香箱→滑りクラッチ→二窓、Pierceの機構・操作）は現行WATCHと照合し、inventoryへ対応行があることを確認した。
- 旧引継ぎにある `マナーモードの祖先!?` / `鳴る黄金のクロノメーター` / `触って、見て、聴いて楽しむおもちゃ箱。` と、Basis OWNER'S NOTE内の `セミの鳴き声` 等は、OWNER'S NOTE由来の完成表現として**個別投稿資産へ分解しない**。各 `*-ON` 行へ包含する。
- 旧引継ぎは2026-09-09時点の履歴資料であり、事実・現在状態の正本には昇格しない。現行WATCH / research / social canonと衝突する場合は現行正本を優先する。
- この監査の目的は「古いチャットを毎回読み直すこと」ではなく、**引き継ぎ後はinventoryから始めても既知の独立資産を落としにくい状態にすること**。

---

## 4. 更新契約

- 実投稿が公開確認されたら、同じ変更セットで `instagram-published-copy.md` を更新し、対応inventory rowを `USED` または `PARTIAL` へ更新する。
- 同じ時計の別投稿は、Insights側では `content_id` を分ける。inventoryのIDとInsights `content_id` は役割が違うため同一IDへ統合しない。
- 投稿本文に入らなかっただけで「完全未使用」と断定しない。映像内使用が不明なら `CANDIDATE_NOT_IN_IG_TEXT` のまま。
- X / YouTubeの過去投稿を新しく確認したら `Other social` を更新する。`NO_EXPLICIT_USE_FOUND...` を永久状態にしない。
- 追加撮影が済んだら `NEEDS_SHOOT → READY_EXISTING`。資料確認が済んだら `RECHECK_SOURCE` 等を適切に更新する。
- WATCH本文の事実が変わった場合、inventory本文を事実正本として守ろうとせず、WATCHへ追随させる。
- OWNER'S NOTEをSNSへ使う場合、`*-ON` 行を一つの投稿資産として扱う。**内部のleadや一文を複数行へ増殖させない。**

