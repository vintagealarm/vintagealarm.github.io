# VINTAGE ALARM — German translation preparation

更新日: 2026-09-13
状態: 準備のみ。ドイツ語URL・UI・hreflang・sitemapはまだ実装しない。

## 目的

ドイツ語版は、日本語サイトの意味・比喩・構成・温度・事実の確度を保ったまま、ドイツ語として自然に読める翻訳を作る。

翻訳の主ルートは必ず `日本語正本 → ドイツ語` とする。英語版は意味確認の補助にしか使わない。

## 正本と資料の優先順位

1. 日本語サイト本文が絶対正本。
2. 原典・一次資料・専門資料は、時計専門用語・機構語・時代語の確認に使う。
3. 英語版は既存翻訳の比較材料に限定する。
4. 原典に存在する表現を理由に、日本語正本へない意味・説明・コピーをドイツ語本文へ輸入しない。

特に OWNER'S NOTE とキャッチは、日本語版の編集コピーを守る。一次資料の語彙や文体へ寄せ直さない。

## 翻訳ルール

- 逐語性を保つが、語順を機械的に写して不自然なドイツ語にはしない。
- 自然さのための要約、意訳、追加説明、比喩の差し替え、論点の統合はしない。
- 原文の「可能性がある」「記録されている」「資料間で一致しない」等の確度を強めない。
- OWNER'S NOTE、キャッチ、DEEP DIVE、SPECの役割分担を維持する。
- 別セクションから表現を持ってきて、翻訳先で補強・置換しない。
- 翻訳者は編集者にならない。
- 公開文は現代標準ドイツ語を基本とする。一次資料の歴史的綴りは引用・資料名を除いてそのまま模倣しない。
- 原典のスイス式・旧式綴りは意味確認に使い、通常本文では現代読者に自然な表記へ整える。

## 逆翻訳監査

各セクションは次の順で監査する。

1. 日本語正本からドイツ語案を作る。
2. ドイツ語案を、できるだけ逐語的に日本語へ戻す。
3. 日本語正本と逆翻訳を文単位で比較する。
4. 次の5点を確認する。
   - 事実が増減していないか
   - 断定度が変わっていないか
   - 比喩・コピーの役割が変わっていないか
   - 別セクションの文を移植していないか
   - 説明を勝手に足したり削ったりしていないか

英語版Duofonで起きた「別セクションの表現をOWNER'S NOTEへ移す」「原文の締めを案内文へ置換する」タイプの変更は禁止する。

## Duofon — 参照するドイツ語資料

プロジェクト情報源 `Pierce Duofon.pdf` を用語確認の主要資料とする。

主な層:

- Pierce AG, Biel, 1955-08-30: `Die Wecker-Armbanduhr Duofon mit zwei Lautstärken`
  - 日本語: 「2つの音量を持つDuofonアラーム腕時計」
  - 日本語サイトの内容を書き換える資料ではなく、Pierce自身の機構語・操作語を確認する一次資料。
- Leonhard Beitl, `Alarm am Arm`, Duofon model examples
  - 1952 prototype / 1956 example / 1962 later modelの資料差確認用。
- B. Humbert, `Die Armband-Weckeruhr` / `Kaliber «Duofon»`
  - Cal.135の部品名・操作・Läutwerk機構の専門語確認用。

## Duofon — 用語基準（準備版）

| 日本語の概念 | ドイツ語候補 | 運用メモ |
| --- | --- | --- |
| アラーム腕時計 | `Wecker-Armbanduhr` | Pierce 1955の表現。一般本文の第一候補。 |
| 腕時計型アラーム | `Armband-Weckeruhr` | Humbert技術記事にも存在。資料引用では原文を尊重。 |
| 時計機構 | `Gehwerk` | アラーム側と区別する技術文脈で使用。 |
| アラーム機構 | `Läutwerk` / `Weckerwerk` | 原文の日本語が指す範囲に合わせる。機械的に一語固定しない。 |
| 香箱 | `Federhaus` | 一般語。 |
| 時計側香箱 | `Gehwerk-Federhaus` | Pierce 1955に対応。 |
| アラーム側香箱 | `Wecker-Federhaus` / `Läutwerk-Federhaus` | 資料層で呼称が異なるため、文脈に合わせる。 |
| 2つの独立した香箱 | `zwei unabhängige Federhäuser für Gehwerk und Wecker` | Pierce 1955の明記。日本語正本が2香箱を述べる箇所の専門語確認用。 |
| 主ゼンマイ | `Zugfeder` | 時計側は `Gehwerk-Zugfeder`、アラーム側は `Läutwerk-Zugfeder`。 |
| アラーム輪列 | `Läutwerk-Räderwerk` | Humbert技術記事。 |
| 音響バネ | `Tonfeder` | Cal.135の実機構説明で重要。 |
| 音響体 | `Klangkörper` | Pierce 1955一次資料。`Tonfeder`との違いを潰さない。 |
| ハンマー | `Hammer` | 一次・技術資料で使用。 |
| 打撃子 | `Klöppel` | Humbert技術記事。ハンマーと混同しない。 |
| ダンピングレバー | `Dämpfungshebel` | 音量切替機構の技術語。 |
| アラーム針 | `Weckerzeiger` / `Läutwerkzeiger` | 資料層で呼称差あり。日本語の文脈に合わせる。 |
| 巻き上げリューズ | `Aufzugskrone` | 3時位置操作の基本語。 |
| アラーム側リューズ兼プッシャー | `Wecker-Kronendrücker` | Pierce 1955。4時位置操作の一次資料語。 |
| 音量選択用リューズ | `Vorwählkrone` | Humbert技術記事。一般説明へ勝手に置換しない。 |
| 音量 | `Lautstärke` | `stark / schwach`、`laut / gedämpft`等の形容は原文の意味に合わせる。 |
| WECKER | `Wecker` | モード名として固有表示を維持。 |
| SIGNAL | `Signal` | モード名として固有表示を維持。 |
| 静かな注意喚起 | `stille Mahnung` | 原典に存在するが、OWNER'S NOTEのコピーをこれへ置換する根拠にはしない。 |
| 控えめな注意役 | `diskreter Mahner` | 技術記事の表現。説明コピーへ勝手に輸入しない。 |
| 控えめなブザー | `diskreter Summer` | Pierce 1955のSIGNAL側説明。日本語正本の表現が対応するときだけ参照。 |
| 圧入式裏蓋 | `gedrückter Boden` | Beitlのモデル記述。 |
| ねじ込み式裏蓋 | `geschraubter Boden` | 1962個体の記述。 |
| 防水 | `wasserfest` / `wasserdicht` | 資料内に両方存在。日本語正本の確度を優先する。 |
| アラーム目盛り | `Weckerskala` / `Skala für die Alarmzeitanzeige` | 1956個体の記述。 |
| 分目盛り | `Minuteneinteilung` | 長いアラーム針の記述。 |

## 資料差を翻訳で消さない

Duofon資料には、少なくとも次の差がある。

- 1952年プロトタイプの記述: 時計機構とアラームを1つの香箱で駆動する記述。
- 1955年Pierce一次資料: 時計機構用とアラーム用の2つの独立した香箱を明記。

ドイツ語版でも、日本語正本がこの差を残しているなら差のまま翻訳する。資料がドイツ語だからといって、ドイツ語版だけ一方の説明へ統合しない。

## OWNER'S NOTEでの注意

原典の `diskreter Summer`、`stille Mahnung`、`diskreter Mahner` は、Duofonの機構思想を理解するうえで有用だが、日本語OWNER'S NOTEのコピーを原典風へ書き換えるためには使わない。

日本語の「マナーモードの祖先!?」「1950's通知のオーパーツ。」「リマインドの気遣いまで、ぜんぶ機械仕掛け。」等は、それぞれの意味・比喩・温度を保ったドイツ語コピーを別途作り、逆翻訳で日本語正本へ戻るか確認する。

## 実装前の完了条件

ドイツ語ページを実装する前に、最低限次を満たす。

- DuofonのOWNER'S NOTE全文を日本語正本から直接ドイツ語化する。
- DuofonのDEEP DIVE全文を日本語正本から直接ドイツ語化する。
- 上記2つを逐語的に日本語へ逆翻訳し、原文との意味差を監査する。
- 専門用語について `Pierce Duofon.pdf` の一次・技術資料と照合する。
- 原典表現の勝手な輸入、英語版経由の意味変化、断定度の上昇がないことを確認する。
- この段階が終わるまで `/de/`、言語切替、hreflang、sitemapは変更しない。
