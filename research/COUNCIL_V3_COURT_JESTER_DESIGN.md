# Council V3 — Court Jester / 宮廷道化師 設計メモ

Status: **PROPOSED / NOT IMPLEMENTED**
Recorded: **2026-10-02 17:18 JST**
Target: Council V3 menu item **7**

## 1. 発端と経緯

2026-10-02、ユーザーが別件のやり取りから「90%付近で足踏みするのは、作る過程で必要な機能が見え、仕様変更・追加が起きるから」という趣旨に気づいたことを起点に、VINTAGE ALARMの「焼く」に当初期待していた役割を再整理した。

会話上で一度「工程道化師」という誤った造語化をしたが、ユーザー訂正により対象は実在した **宮廷道化師 / court jester** であると修正した。その後Web確認を行い、宮廷道化師には単なる娯楽者ではなく、宮廷・権力者の近くで、通常なら言いにくい批判・諫言・不都合な真実を、道化という特殊な立場から伝える機能があったことを確認した。

ユーザーの整理は次の通り。

- サイト実装・投稿・技術作業の多くをAI側が行うため、ユーザー本人は途中工程を完全には見通せない「ブラックボックスな王様」になり得る。
- だからこそ、完成・仕様・技術判断・AIの説明・ユーザー自身の依頼や思い込みを、王に迎合せず疑う役が必要。
- V1→V2で「焼く」は複数視点のCouncil＝議会へ発展したが、V2の `前提破壊班 (devil)` が宮廷道化師の役割を部分的に担っていたと考えられる。
- V3ではV2の1〜6を壊さず、同じ証拠・Project資料・Web・Council resident poolを利用する **7番目の形式** として、宮廷道化師の役割を独立させる。
- 「焼く」はユーザーへの攻撃ではなく、ユーザー＋AIが共同で作った依頼・判断・仕様・完成認識への **自己批評装置** として扱う。

この設計は現時点では提案・研究段階であり、V2の現行6形式、API、Worker、メニューはまだ変更しない。

## 2. Web調査で確認した設計根拠

### 2.1 宮廷道化師 — 権力の近くで真実を言う

Cambridge University Press掲載の研究では、宮廷道化師は王権を破壊するのではなく、王の近くで `speak truth to power` を行い、王の誇大な自己認識を崩し、責任を思い出させる助言機能を持ったと整理されている。

設計への転用:

- JesterはCouncilの「勝者」や新しい王にならない。
- 最終決定権はユーザーに残す。
- 目的は反対すること自体ではなく、権力中心＝現在の依頼・仕様・完成宣言が見落としているものを露出させること。
- 批判対象にはAI自身の説明・実装・自己評価も含める。

Sources:
- Cambridge, *Playing the fool: jesters of the Safavid and Zand courts*: https://www.cambridge.org/core/journals/bulletin-of-the-school-of-oriental-and-african-studies/article/playing-the-fool-jesters-of-the-safavid-and-zand-courts/B6E03A737C9DAA149F4F320C9B753558
- Cambridge, *Humour and Social Protest* excerpt: https://assets.cambridge.org/97805217/22148/excerpt/9780521722148_excerpt.pdf

### 2.2 異論は「正しい反対意見」でなくても情報処理を改善し得る

Schulz-Hardt et al. (2006) のhidden-profile実験では、事前の異論がある集団は、全員が同じ誤った初期選好を持つ集団より問題解決率が高く、効果は主として議論強度の増加と議論バイアスの減少を介していた。異論者自身が正解を持っていない場合にも改善が見られた。

設計への転用:

- Jesterは「正解を知る専門家」である必要はない。
- 価値は、共有前提を揺らして未共有情報・反証条件・見落としを引き出すことにもある。
- したがってJesterの出力を「正解」「採用案」として扱わない。

Source:
- PubMed / JPSP: https://pubmed.ncbi.nlm.nih.gov/17144766/

### 2.3 作られた反対役には限界がある

集団意思決定研究のレビューでは、devil's advocateを指名する方法は共有情報バイアス対策になり得る一方、作られた反対（contrived advocacy）は genuine advocacy より影響が弱くなり得ると整理されている。また、単純な「常に反対」はそれ自体が儀式化する危険がある。

設計への転用:

- Jesterを「必ず反対するbot」にしない。
- 現案が耐えている場合は `今回は王に異議なし` を許可する。
- 反対する場合は、観察可能な根拠、隠れ前提、反証条件、確認方法のいずれかを要求する。
- 逆張りの量ではなく、前提・盲点・権力勾配を突けたかを品質基準にする。

Sources:
- PMC, *Making better decisions in groups*: https://pmc.ncbi.nlm.nih.gov/articles/PMC5579088/
- PMC, *The Science of Effective Group Process*: https://pmc.ncbi.nlm.nih.gov/articles/PMC8078081/

### 2.4 Council自体もgroupthinkの対象にする

研究上、groupthink対策には批判の明示的奨励、leaderの初期中立、並列グループ、外部者、devil's advocateなどが挙げられる。一方でgroupthink概念そのものにも実証的批判があり、万能説明として扱うべきではない。

設計への転用:

- Jesterはユーザーだけでなく **Council多数派・Chair・既存正本の運用解釈** も批評対象にする。
- V2の議会で全員が同じ前提に乗った場合、その合意を安全性の証拠とみなさない。
- `みんなが同意した` を根拠にしない。
- groupthinkというラベルで原因認定せず、実際に何が共有前提化・未検討化したかを示す。

Sources:
- PMC checklist: https://pmc.ncbi.nlm.nih.gov/articles/PMC8258315/
- PubMed critique of groupthink literature: https://pubmed.ncbi.nlm.nih.gov/9705801/

### 2.5 AI固有の問題 — sycophancyとblack-box oversight

Anthropic/OpenAIの相互評価では、複数モデルでsycophancyが観測されている。2026年のAuditBenchでは、隠れた挙動を持つモデルへの監査で、単にツールが正しい証拠を出すだけでは足りず、agentがその証拠を使って正しい仮説へ変換できない `tool-to-agent gap` も報告されている。

設計への転用:

- Jesterはユーザーの前提をそのまま強化する回答を警戒する。
- `ユーザーがそう言った` と `資料・実装・Webで確認した` を分離する。
- AIが「実装済み」「検証済み」「技術的に必要」と言った主張そのものを監査可能なclaimとして扱う。
- ツール取得＝理解・検証完了とはみなさず、証拠→主張の接続を問い直す。

Sources:
- Anthropic/OpenAI alignment evaluation: https://alignment.anthropic.com/2025/openai-findings/
- Anthropic AuditBench: https://alignment.anthropic.com/2026/auditbench/

## 3. V3 / 7 の役割定義

Working label:

**7. 宮廷道化師に聞く 🤡 — 王様、その前提ほんと？**

Core objective:

> ユーザーとAIが共同で作った現在の依頼・仕様・判断・完成認識・Council合意を「王」とみなし、同じevidence poolを使って、迎合・権威・既定路線・ブラックボックス化で見えなくなった前提を暴く。決定は奪わない。

### 攻撃対象

1. **ユーザー前提** — 指示、目的、成功条件、過去判断が本当に今も妥当か。
2. **AI前提** — AIが技術判断・実装都合・一般論を事実のように置いていないか。
3. **完成宣言** — IMPLEMENTED / VERIFIED / DEPLOYED / OBSERVED を混同していないか。
4. **仕様そのもの** — 「仕様通りだから正しい」で停止していないか。
5. **Council合意** — 多数派、Chair、既存residentが同じ前提に乗っていないか。
6. **証拠接続** — 資料を読んだことと、主張が資料で支えられることを混同していないか。
7. **目的化した工程** — gate、SEO、翻訳、計測、UI規則等が本来目的を食っていないか。
8. **見えない棄却** — 途中で捨てた案・制約・異論が、理由なく消えていないか。
9. **ブラックボックス委任** — ユーザーが理解できないことを理由に、AIの自己申告が最終証拠になっていないか。

## 4. Jester専用プロトコル案

V2共通protocolをそのままコピーせず、同じresident/evidence poolの上に次を載せる。

1. **Crown Claim** — 今回「王が当然視していること」を3〜7件だけ抽出する。ユーザー発言、AI主張、Council合意、仕様、完成宣言を混ぜず出典種別を付ける。
2. **Privilege Check** — 各claimが、なぜ通常工程では疑われにくいかを特定する（ユーザー指示だから / AI技術判断だから / 既存仕様だから / 多数派だから / テストPASSだから等）。
3. **Fool's License** — 最も危険な1〜3前提へ、立場・面子・既存投資を無視した異論を出す。ただし逆張りだけは禁止。
4. **Reality Pin** — 異論を、画像・ファイル・Project正本・コード・Web・実測のどこで検証できるか固定する。証拠がなければ未確認と明記する。
5. **King's Blind Spot** — `もしこの前提が誤りなら何が壊れるか` を具体化する。影響がないなら重要論点から落とす。
6. **Council Mockery** — 既にCouncil結果がある場合、その多数派・Chair・Minority Reportまで含めて「全員が共有している前提」を1回だけ焼く。
7. **Exit Without Coup** — Jesterは最終案を決めない。出力を `今すぐ止める / 確認してから続行 / そのまま進めてよい / 判断は王へ返す` の行動含意へ変換するが、採否はユーザーへ返す。

## 5. 出力フォーマット案

Jesterは長い議事録ではなく、刺す対象を絞る。

- **👑 王が当然視していること**
- **🤡 道化師の一言**
- **🪡 刺さっている根拠**
- **🕳 見えていない穴**
- **🔎 確認すれば決着すること**
- **⚖️ 王に返す判断**

必要なら最後に `異議なし` を許す。何も壊せないのに無理に批判を生成しない。

## 6. V2「前提破壊班」との差分

現行 `devil / 前提破壊班`:
- Council residentの一人。
- objectiveは `隠れ前提を壊す`。
- failure modeは `壊しすぎる`。
- revision ruleは `耐えた主張は認める`。
- abstain ruleは `逆張りだけしない`。

V3 Jester:
- residentではなく **format / protocol**。
- 前提破壊班を含む同じpoolを使えるが、Council全体・Chair・ユーザー・AI自身を対象にできる。
- 解決案の勝者を決めるのではなく、権力中心の盲点を露出して決定権を返す。
- 「反対案」より **なぜ誰も疑わなかったか** を重視する。
- 実装・投稿・研究・購入判断などdomainを跨いで使える。

## 7. 1〜6との非重複条件

- 1 thread: レスバ・集合的破壊。Jesterは単独の制度化された異論。
- 2 panel: 多視点衝突。Jesterは視点数ではなく権力中心を刺す。
- 3 council: 選択・裁定。Jesterは裁定しない。
- 4 claims: claim/evidence監査。Jesterは「なぜそのclaimだけ特権化されたか」まで見る。
- 5 brainstorm: 案の生成・発展。Jesterは新案量産を目的にしない。
- 6 premortem: 未来の失敗を仮定して設計を焼く。Jesterは未来だけでなく、現在の依頼者・AI・Council・完成宣言の権威を焼く。

## 8. ガードレール

- ユーザーへの人格攻撃にしない。批評対象はclaim / decision / assumption / process。
- ユーザーの目的・価値判断を勝手に上書きしない。
- AIの異論を「客観的真実」として扱わない。
- 必ず反対する仕様にしない。
- humourは役割の記号であり、証拠の弱さを煽りで隠さない。
- 目の前の資料・画像・コード・Project正本を先に使う。
- Jester自身も `未確認` と `推測` を明示する。
- 高リスク領域では通常の安全・専門確認を代替しない。

## 9. 実装時の最小変更候補（まだ実装しない）

実装時は少なくとも以下を同期する。

- `PROJECT.md` のCouncilメニュー 1〜6 → 1〜7
- `AGENTS.md` のCouncil / 焼いて V2 → V3
- `PROJECT_STATE.md` の現在仕様
- `council-worker/README.md`
- `council-worker/src/index.ts`
  - `F` に `jester`
  - `FORMAT_MENU` に7
  - `C` にjester表示定義
  - `pick()` / jester protocol
  - API menu
- Council関連test / dry-run / menu整合検査
- `CHANGE_DECISIONS.md`

V2の1〜6の意味・番号・互換性は維持する。7追加によって既存番号をずらさない。

## 10. 実装前に決める一点

Jesterの最終出力を **単独personaの声として表示するか**、内部では複数residentを使っても表示上は一人の宮廷道化師へ統合するか。

設計意図からは後者が有力。V2で得た多視点・evidence poolを内部で利用しながら、ユーザー体験としては「議会の外から一人が王へ物申す」を保てるため。ただしこれは現時点では提案であり、実装決定ではない。

## 11. 検証条件（実装時）

1. 「焼いて」単独で7択が出る。
2. 1〜6の既存挙動が変わらない。
3. 7はユーザー・AI・Council・仕様・完成宣言を同じclaim監査対象にできる。
4. 反対材料が弱い場合に `異議なし` を返せる。
5. Jesterが最終決定を奪わない。
6. project/web evidence指定がV2同様に機能する。
7. 未確認を断定しない。
8. `前提破壊班` と7の出力が単なる重複にならない。
9. menu / README / router / Worker / tests / decision logが同期する。
10. 実装後に実案件を最低3種類（サイト実装、SNS投稿、研究/判断）でdogfoodし、Jester固有の発見があるか確認する。
