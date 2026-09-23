# VINTAGE ALARM — DECISION / CHANGE LOG

この文書は「いつ・何を・なぜ変えたか」を人間が時系列で追うための台帳です。Gitのcommit履歴を置き換えるものではなく、仕様判断・棄却理由・再検討条件を短く残します。

## 記録ルール

- 日時は **JST (UTC+09:00)**、原則 `YYYY-MM-DD HH:mm JST` で記録する。
- 現行仕様・判断・方針・棄却候補が変わる変更は、実装と同じ変更セットでここへ追記する。
- 各項目は **変更 / 理由 / 旧状態・棄却 / 影響範囲 / 検証状態 / 関連PR・commit** を残す。
- 単なるtypo、依存更新、意味を変えない整形など、後から判断経緯を追う価値がない変更は記録不要。
- `PROJECT_STATE.md` は「今どうなっているか」、このファイルは「いつ・なぜそうなったか」を担当する。現在値を両方へ長文で重複させない。
- 過去履歴も可能な範囲で遡及復元する。日時はGit commit / PRを第一根拠とし、保存済み会話・Project資料・スクリーンショット等を突合して判断理由を補う。確認できない日時・理由だけ「未復元」とし、推測では埋めない。

---

## 2026-09-24

### 2026-09-24 08:13 JST — HOW THEY RING FIG.01のMemomatic根拠を再照合
- **変更**：FIG.01の公開文言を「棒状の音バネを叩く」から「内蔵の音バネを叩く」へ修正し、根拠文を「OMEGA MEMOMATICのOmega/Lemania Cal.980は、内蔵された音バネ（tone spring）を打撃する。」へ明確化。
- **理由**：公開HTMLの「Cal.980」だけではCitizen Cal.980との識別ができず、さらに「棒状」という形状表現は今回確認したMemomatic固有資料だけでは確定できないため。『The Alarm Wristwatch』のOmega/Lemania SL 980項には「Striking on integrated tone spring」とあり、980がOmega向けに開発されたcaliberであることも明記されている。
- **旧状態・棄却**：「Cal.980は、ムーブメントに固定された音バネをハンマーが打撃する。」というブランド未指定の根拠文、および未再照合の「棒状」表現。
- **影響範囲**：HOW THEY RING FIG.01のJA / EN / DE表示、build gate、PROJECT_STATE。GONG / CASEBACKの2分類と代表機OMEGA MEMOMATIC自体は変更なし。
- **検証状態**：資料再照合済み。実装後CIでbuild / link / SEO / layoutを確認する。
- **関連**：PR #98 / PR #100

### 2026-09-24 07:54 JST — Wittnauer 10WAの公開状態を明確化
- **変更**：公開済みWATCHの計測対象は Basis Alarm / Pierce Duofon / Cyma Time-O-Vox / Citizen Alarm / Westclox Watchlarm の5本だけと明記。Wittnauer 10WAは所有個体／HOW THEY RING側のデータには含まれるが、公開済みWATCH 5ページの計測対象には含めないことを `PROJECT_STATE.md` に追記。
- **理由**：所有個体データへの掲載と、公開済みWATCHとしての計測対象を混同しないため。
- **旧状態・棄却**：Wittnauerを6本目の公開済みWATCHとして扱う解釈。
- **影響範囲**：状態文書のみ。既存の `measurement/metrics.md` はすでに公開済みWATCH 5ページを同じ5本として定義しており、計測実装の変更は不要。
- **検証状態**：`PROJECT_STATE.md` と `measurement/metrics.md` を突合して整合確認済み。
- **再検討条件**：Wittnauer 10WAのWATCHページが正式公開され、計測対象へ追加する明示変更が行われた場合。
- **関連**：このPR
## 2026-09-23 — 復元履歴

以下は、GitHub commit時刻と保存済み会話の時刻・判断内容を突合して復元した。commitだけで判断理由を確定できない箇所は、会話で確認できた範囲だけを記載する。

### 2026-09-23 11:35 JST — HOW THEY RING：最終的な2分類構造を実装
- **変更**：トップレベル分類を GONG / CASEBACK の2つに変更。CASEBACK内部の差はFIG.02–04の代表例として扱う構造へ。
- **理由**：大枠分類と詳細ケース分けを分離し、個体ごとにFIG.02/03/04まで細分類しないため。同じCASEBACKでも構造差が大きいことを図で見せる。
- **旧状態・棄却**：GONG / CASEBACK / BELL / PIN の4分類、およびGONG / CASEBACK / BELLの3分類をトップレベルとして使う案。
- **関連**：commit `33ce28c95e282e6dd8829f6f92b09ca2f6cd90fb`
- **日時根拠**：GitHub commit 2026-09-23 11:35:14 JST。判断内容は保存済み会話と突合済み。

### 2026-09-23 13:28 JST — TOPにHOW THEY RING入口を追加
- **変更**：OWNER'S NOTES直下にHOW THEY RING入口を配置し、TOP表示をCMSスイッチで管理。
- **理由**：独立した音・鳴らし方の入口としてTOPから到達可能にするため。
- **関連**：commits `84a478a7b7d731ffab655a41f3ec41175e7689c1`, `b6d1f80c9ea9402156cc7e529fa351f97420ad6c`
- **日時根拠**：GitHub commit 13:28 JST、保存済み会話の指示時刻 15:28 JSTも確認。実装時刻を採用。

### 2026-09-23 15:31 JST — Cricketの詳細呼称を「振動板型」に変更
- **変更**：FIG.02を「膜状バック型」から「振動板型」へ変更。
- **旧状態・棄却**：「膜状バック型」。
- **関連**：commit `ce1944042464c0b7e12e34cfee1a81efd82d175f`
- **日時根拠**：GitHub commit 2026-09-23 15:31:42 JST。

### 2026-09-23 14:03 JST — Pierce Duofonの二音源表示をWECKER / SIGNALへ確定
- **変更**：Duofonの2音源をCMS・表示へ復元し、表示ラベルを **WECKER / 音あり**、**SIGNAL / 音無し** に統一。
- **理由**：WAKER / SILENTはファイル名であり、表示用の正式ラベルではないため。
- **旧状態・棄却**：WAKER / SILENTの表示利用。
- **関連**：commits `9010693ed03b725d063aeaefde8f40038f85d4e0`, `c044ae67a2ca603fbb4bce4cd6c021c116d817e3`, `e169019beb3199ee319b415e522347ceb2293c15`
- **日時根拠**：GitHub commits 13:52–14:03 JST、保存済み会話の正式表示指示 13:46 JSTと突合。

### 2026-09-23 14:05 JST — HOW THEY RINGを本番公開
- **変更**：productionPublishedを有効化し、本番routeを公開。
- **関連**：commit `07ee720481e179b200115f867d4c7ce3c67899c6`
- **日時根拠**：GitHub commit 2026-09-23 14:05:25 JST。

### 2026-09-23 16:41 JST — ヒーローを「音で見る、アラーム腕時計。」へ再設計
- **変更**：主見出しを「音で見る、アラーム腕時計。」へ変更し、分類説明より「音を聴く」目的を前面に出した。旧selector guide/arrowsを撤去。
- **理由**：HOW THEY RINGの主目的を分類表ではなく、実機の音を入口に見る・聴く体験へ戻すため。
- **関連**：commits `b46bc3437906d9b36c908a977c8411852d06d9a3`, `b70c085f90cef666074f82d6ceafeaee12798656`, `97e597362e3dc040cf8284ffced4941829ea0094`
- **日時根拠**：GitHub commits 2026-09-23 16:41–16:42 JST、保存済み会話の現行見出し確認と突合。

### 2026-09-23 17:43 JST — GONG / CASEBACKにベル＋TAPの操作手掛かりを追加
- **変更**：両selector右上へ小さなベルアイコンとTAPを追加。
- **理由**：selectorが押せることを、ページの雰囲気を壊さず伝えるため。
- **旧状態・棄却**：矢印・chevronによる誘導。chevronは他UIの開閉意味と衝突するため使用しない。
- **関連**：commits `48b5f06ff602b10a2ce6d8f17f7b7d0ad4a47eb7`, `9b01059e329e21a4936c85c2da9d99023f5c7ae1`, `59e6790f8b12655080608e9b63986313adb56c2a`
- **日時根拠**：GitHub commits 2026-09-23 17:43–17:44 JST、保存済み会話・スクリーンショットと突合。

### 2026-09-23 17:45 JST — TOP文言を「実機の音を聴いて、鳴らし方を見る。」へ変更
- **変更**：HOW THEY RINGのTOP説明を、分類名の列挙から実機音を聴く体験中心へ変更。
- **理由**：HOW THEY RINGの役割をTOPでも一致させるため。
- **関連**：commit `35fc175482118f02524cd08a7464ed94d24e470e`
- **日時根拠**：GitHub commit 2026-09-23 17:45:19 JST。

## 2026-09-22 — 復元履歴

### 2026-09-22 23:55 JST — 4分類構造を一度実装
- **変更**：GONG / CASEBACK / BELL / PIN の4分類を実装。
- **後続判断**：翌23日に、PIN等は大枠ではなくCASEBACK内部の詳細差として扱う方針へ変更され、この4分類は失効。
- **関連**：commit `78f1cecbae563cc827958aad5ff782fa2ad2e126`
- **日時根拠**：GitHub commit 2026-09-22 23:55:56 JST。

## 2026-09-21 — 復元履歴

### 2026-09-21 17:47 JST — PINを大分類から外し3分類へ
- **変更**：PINをCMS/schemaの大分類から除外し、GONG / CASEBACK / BELL の3分類へ整理。WestcloxをCASEBACKへ移動。
- **理由**：PINは独立した大分類ではなく打撃・伝達方法の詳細として扱う判断。
- **関連**：commits `3b79b41ba7c86b970dea43ec0a73bae4f3362569`, `7fa3f34e200c6ab37bbc4515e30f5d5cb05480c1`, `cea4541f72e49000ed70a194c39ceb33b5c268fb`, `0736cb88974315ddb8a0db54d2bb37191ac76c39`, `0e46aac970d0060bffedfce88ca18c154ed887e4`
- **日時根拠**：GitHub commits 2026-09-21 17:47 JST。後日の保存済み会話にも「PINは打撃方法の詳細」とする判断が残る。

### 2026-09-21 22:34 JST — TOP入口と本番公開を別スイッチ化
- **変更**：HOW THEY RINGのproduction公開とTOP入口表示を別々に制御。TOP入口はOWNER'S NOTES後。
- **理由**：ページ自体の公開状態とTOPからの露出を独立して管理するため。
- **関連**：commit `35647cc534c7590b121dbdb1c1bbff342f4a6740`
- **日時根拠**：GitHub commit 2026-09-21 22:34:39 JST。

## 2026-09-20 — 復元履歴

### 2026-09-20 11:41 JST — HOW THEY RINGを独立CMSコレクション化
- **変更**：HOW THEY RINGの6個体設定をWATCH本体から分離し、専用CMSコレクションへ移行。category / thumbnail / publication / audioを独立管理。
- **理由**：WATCH本文と音ギャラリー編集を分離し、各項目をCMSから管理可能にするため。
- **関連**：commits `24e80ad32274dcff1498c7d40420cc5194cfc5cd`, `e373d0b2f2a62cffaa86f06c9324f4fbfcd2db9b`
- **日時根拠**：GitHub commits 2026-09-20 11:22–11:41 JST。保存済み会話のCMS本番公開/非公開切替要求と突合。

### 2026-09-20 16:36 JST — 本番routeをCMS release gate化
- **変更**：HOW THEY RINGのproduction route、release toggle、sitemap、SEO metadataをCMSの公開状態に連動。
- **理由**：テスト面と本番公開を分離し、公開/非公開をCMSで制御するため。
- **関連**：commits `0309563e27fe2b98e502ab77f93afc210b0ea9f7`, `901fa6e01ba7dacbf42d7377505223126cc0adfe`, `ae683c9028e5679493dcc8d43a30afd3b97c276f`, `54a6fe9c9dce8e2cf0414ffe43e7522538eb0c6e`, `bc0c9ea171397fdb781966d979547c88d73efa1d`
- **日時根拠**：GitHub commits 2026-09-20 16:36–16:39 JST。

## 2026-09-19 — 復元履歴

### 2026-09-19 10:26 JST — HOW THEY RING prototypeを再構築
- **変更**：生成した機構アートに依存しないprototypeへ再構築。
- **関連**：commit `6d43d6f2be45c7fab76bcdabaa772a8239a91288`
- **日時根拠**：GitHub commit 2026-09-19 10:26:17 JST。

### 2026-09-19 16:41 JST — 機構図を含むレイアウトを確定
- **変更**：HOW THEY RINGの機構図を含むレイアウトとpreview checkを更新。
- **関連**：commits `f5d6ab709055f18d75a6c7ae5c6e988aff3e3bf7`, `cecd731a659157c8bbae43adefb9de5af1ebda15`
- **日時根拠**：GitHub commits 2026-09-19 16:41–16:42 JST。

---

## 2026-09-23

### 2026-09-23 19:01 JST — GitHub運用：現在状態と変更履歴を分離
- **変更**：`CHANGE_DECISIONS.md` を新設し、仕様・判断・方針・棄却候補の変更をJST日時付きで追跡する運用へ変更。PROJECT_STATE / AGENTSの完了条件・起動ルーティングにも組み込んだ。
- **理由**：「今どうなっているか」だけでなく「いつ・何を・なぜ変えたか」をGitHubだけで追跡可能にし、会話履歴への依存と旧仕様復活を減らすため。
- **旧状態・棄却**：PROJECT_STATEへ現在仕様と一部の理由を集約するだけの運用。時系列の判断履歴としては不足するため廃止。
- **影響範囲**：GitHub作業運用・PROJECT_STATE・AGENTS。サイト表示変更なし。
- **検証状態**：PR #91をmainへmerge後、`CHANGE_DECISIONS.md` / `PROJECT_STATE.md` / `AGENTS.md` をmainから再取得し、相互参照を確認済み。
- **関連**：PR #91 / commit `51b60433dc6b40fdded3d9d9aec770b373f67107`

### 2026-09-23 18:55 JST — HOW THEY RING：2分類の判断理由を履歴化
- **変更**：GONG / CASEBACK の2分類を採用した理由、FIG.02–04をCASEBACK内部の代表例とする設計、個体カードへ詳細分類を持ち込まない方針を `PROJECT_STATE.md` に明文化。
- **理由**：現行仕様だけでなく、なぜその仕様になったか・何を棄却したかをGitHubから復元できるようにするため。
- **旧状態・棄却**：GONG / CASEBACK / BELL / PIN の4分類。大分類とCASEBACK内部構造が同階層に混在し、分類粒度が揃わないため棄却。
- **再検討条件**：新しい一次資料で大枠そのものを変更すべき根拠が出た場合、またはユーザーが明示的に仕様変更した場合。
- **影響範囲**：文書のみ。サイト表示変更なし。
- **検証状態**：main再取得で記載確認済み。
- **関連**：PR #90 / commit `8d1de10cb418db4734005b751c89de8a88158921`

### 2026-09-23 18:22 JST — HOW THEY RING：機構図の根拠表示を追加
- **変更**：FIG.01–04に、折りたたみ式の「機構図の根拠・資料を見る」を追加。各FIGは確定的な1出典だけを表示。
- **出典方針**：原則 `The Alarm Wristwatch` / `ALARM AM ARM` を優先し、2冊で直接支えられない場合のみ外部資料1件を採用。補助資料は内部検証用で閲覧者へ列挙しない。
- **理由**：HOW THEY RINGの「音を見て・聴く」軽さを壊さず、図の根拠には辿れるようにするため。
- **影響範囲**：HOW THEY RING、build/live gate、layout検査、PROJECT_STATE。
- **検証状態**：PR側でbuild・quality gate通過を確認後mainへmerge。live反映はこの記録時点では未記録。
- **関連**：PR #89 / commit `b262c3b97c4b7f95034a7d766bacb8f511d5272e`

> 注：上記時刻はこの運用導入時点で会話・PRの時系列から確定できる範囲を記載。今後は変更時にJST時刻を同時記録する。
