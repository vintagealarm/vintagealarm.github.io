# VINTAGE ALARM AI relay

`AI URL` で発行した短時間だけ有効なread-only Analytics URLを、LLMが読みやすいMarkdownへ変換するCloudflare Pages Functionsプロジェクト。

- Relay: `https://vintage-alarm-ai-relay.pages.dev/`
- Upstream allowlist: `https://vintage-alarm-analytics.orima1995.workers.dev/api/ai-export`
- Upstream URLはWorkerがHMAC署名し、通常の`AI URL`発行では15分で失効する。
- Relay自身にCloudflare Analytics token / Dashboard passwordは持たせない。
- `source`は許可したhost/path/queryだけ受け付け、任意URLのproxyにはしない。
- Responseは`text/markdown`, `Cache-Control: no-store`, `X-Robots-Tag: noindex, nofollow, noarchive`。
- JSONを要約・推測するのではなく、同じ集計値をMarkdownへ決定的に整形するだけ。

`AI COPY` はfallbackとして残す。
