# 時計別の深掘り調査Ledger

通常の本文修正や軽い出典確認まで新規Ledger作成を要求しない。資料・実機・既存本文の衝突、採用 / 棄却 / 保留 / 失効、事実確度の変更、継続調査へ入った時点を「深掘り調査」とし、対象時計の `research/<WATCH_ID>_LEDGER.md` を作成または更新する。

過去の全WATCHを遡及して埋め直す必要はない。今後深掘りへ入った時計から適用する。既存のCYMA / Wittnauer Ledgerは継続利用する。

状態は `ADOPTED / HOLD / CONFLICT / REJECTED / OBSOLETE / OPEN` を使う。新規Ledgerは `WATCH_RESEARCH_LEDGER_TEMPLATE.md` から作る。判断を追加・変更するときは同じイベントに次を残す。

- `YYYY-MM-DD HH:mm JST` の記録日時
- 状態と主張
- 証拠と出典
- 採用・棄却・保留の理由
- 公開本文への影響
- 再検討条件
- 関連commit / PR / Project資料

Ledger変更は `CHANGE_DECISIONS.md` にも同じ変更セットで記録する。CIは `research/` を判断台帳対象として扱い、Ledger更新にJST付きイベントが追加されていない場合は失敗する。
