# VINTAGE ALARM AI relay

`AI URL` で発行した短時間だけ有効なread-only Analytics URLを、LLMが読みやすいMarkdownへ変換するCloudflare Pages Functionsプロジェクト。

- Relay: `https://vintage-alarm-ai-relay.pages.dev/`
- Upstream allowlist: `https://vintage-alarm-analytics.orima1995.workers.dev/api/ai-export`
- Upstream URLはWorkerがHMAC署名し、通常の`AI URL`発行では15分で失効する。
- Relay本体は現在 `https://vintage-alarm-ai-relay.pages.dev/s/v2/<range>/<bucket>/.../<expires>/<sig>` の短いpath形式を使う。`/s/v1/` と旧 `?source=` 形式は互換用に残す。v1/v2 short linkはいずれもAI向けMarkdownを既定出力とし、署名失効時刻を上限にcacheする。
- Relay自身にCloudflare Analytics token / Dashboard passwordは持たせない。
- 短いpathから再構成できるのは許可済みhost/path/window/expiry/signatureだけで、任意URLのproxyにはしない。
- 署名検証済みの成功レスポンスだけ、元URLの残り有効時間を上限15分として`public` cache可能にする。`X-Robots-Tag: noindex, nofollow, noarchive`は維持する。
- 短いpathは既定で`text/markdown`を返す。旧`?source=`形式はブラウザ表示互換のためHTMLも返せる。
- JSONを要約・推測するのではなく、同じ集計値をMarkdownへ決定的に整形するだけ。

## ChatGPT向けの通常共有

一部のAIクライアントは、短時間だけ存在する未索引URLをlive fetchせず、内部cache missで取得に失敗する。この挙動はRelay側のHTTP成功・cache headerだけでは保証できない。

そのため通常の`AI URL`は、self-hosted signed Relay URLそのものを使い、URL fragmentへ`VA2`形式のaggregate snapshotを添付する。fragmentはHTTP requestへ送信されないため、Relay / Cloudflare側の署名検証・cache keyには影響しない。

`VA2`には、選択window、生成時刻、Visits / Page views、新旧host内訳、直前期間合計、主要channel、全pageのPage views/Visits、entry pageのVisits/Page views、external/internal flow、SNS着地、国、端末、最大31bucketのtrend、host migration日、sampling/row coverage、aggregate-bucket freshnessを含める。compact flowは表示しないcountry/device次元を先に集約し、上位件数で省略する場合はcoverageを明示する。IP、Cookie、raw User-Agent、Cloudflare token、Dashboard passwordは含めない。

これにより、AIクライアントがRelay本文を直接取得できる場合はfull Markdownを読み、取得できない場合でもユーザーが貼ったURL文字列そのものから分析に必要な主要集計を復元できる。第三者Reader serviceは通常経路に使わない。

注意: fragment内の`VA2` snapshotはURL文字列そのものに含まれるため、full exportのような暗号学的な失効はしない。会話へ貼った集計値が後から自動消去されない点も通常の貼り付けデータと同じ。共有内容はaggregate Analyticsだけに限定する。

`AI COPY` はfull JSON fallbackとして残す。Search Console / Google AI snapshotはブラウザlocalStorageのため、引き続きAI URL / AI COPYの対象外。
