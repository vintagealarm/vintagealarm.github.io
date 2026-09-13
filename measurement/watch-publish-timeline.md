# VINTAGE ALARM — WATCH公開・実装タイムライン

更新日: 2026-09-13

このファイルは、OWNER'S NOTE / WATCH各ページの「いつ実装・公開されたか」を会話記憶ではなくGit履歴に基づいて固定するための記録。
AIO・検索インデックス反映のラグを見る際は、この時刻を基準にする。

## Pierce Duofon

- 初回OWNER'S NOTEページ実装: **2026-08-31 20:38 JST**
- 根拠commit: `9afda96f69fb70a4131a1d1b0a4e370ab90f28eb` — `Add Pierce Duofon owner page`
- 補足: 同日20:41にPages deployment確認。

## Cyma Time-O-Vox

- OWNER'S NOTE + DEEP DIVE初回実装: **2026-09-01 23:30 JST**
- 根拠commit: `59e09e7f2b3fa7911a3fac8686ac842c7ab352dd` — `feat: add Cyma Time-O-Vox owner's note and deep dive`
- 補足: 同日23:31にページ/OWNER'S NOTE検証commit。

## Basis Alarm

- CMS entry初回追加: **2026-09-09 14:40 JST**
- OWNER'S NOTES directory公開: **2026-09-09 14:52 JST**
- 根拠commit: `0380c50e7aee189fbdc1db8b5b1416a001a9b66a` — `content: add Basis Alarm CMS entry`
- 公開commit: `24b27ddbd4016f5d682ee89b1fda62339a717ceb` — `content: publish Basis Alarm in owner directory`
- AIO/検索ラグ基準日は **2026-09-09** とする。

## Citizen Alarm

- OWNER'S NOTEページ初回実装: **2026-09-12 08:11 JST**
- 根拠commit: `fb497074a5d2396169d657e287d9d027d263f750` — `Add Citizen Alarm OWNER'S NOTE page`
- commit本文では listing thumbnail / route / sources / sitemap entry / mobile validation まで含む。
- 2026-09-13 00:42以降にもCMS更新が続いているため、「今日仕上げた」という会話上の感覚と「初回公開実装日」は分ける。
- AIO/検索ラグ基準日は **2026-09-12** とする。

## Westclox Watchlarm

- draft初回追加: **2026-09-12 18:13 JST**
- OWNER'S NOTES directory公開: **2026-09-13 00:47 JST**
- draft commit: `2f7fcbf49a18a13b7f923d33dc4ea733292e1ca6` — `Add Watchlarm draft for Pages CMS`
- 公開commit: `793423f837defd806c750e0c03969f92477d929e` — `Add published Westclox Watchlarm to OWNER'S NOTES directory`
- AIO/検索ラグ基準日は **2026-09-13** とする。

## 運用ルール

- 「実装日」は原則として、ユーザーが検索/AIから到達できる公開状態になった日を優先する。
- draft作成日と公開日は分ける。
- 後続の文言修正・画像調整・監査fixは、初回実装日を上書きしない。
- 会話記憶よりこのファイルとGit履歴を優先する。
