# VINTAGE ALARM AI relay

`AI URL` で発行した短時間だけ有効なread-only Analytics URLを、LLMが読みやすいMarkdownへ変換するCloudflare Pages Functionsプロジェクト。

- Relay: `https://vintage-alarm-ai-relay.pages.dev/`
- Upstream allowlist: `https://vintage-alarm-analytics.orima1995.workers.dev/api/ai-export`
- Upstream URLはWorkerがHMAC署名し、通常の`AI URL`発行では15分で失効する。
- 通常発行URLは `https://vintage-alarm-ai-relay.pages.dev/s/v1/<window>/<expires>/<sig>` の短いpath形式を使う。旧`?source=`形式も互換用に残す。
- Relay自身にCloudflare Analytics token / Dashboard passwordは持たせない。
- 短いpathから再構成できるのは許可済みhost/path/window/expiry/signatureだけで、任意URLのproxyにはしない。
- 署名検証済みの成功レスポンスだけ、元URLの残り有効時間を上限15分として`public` cache可能にする。`X-Robots-Tag: noindex, nofollow, noarchive`は維持する。
- 短いpathは既定で`text/markdown`を返す。旧`?source=`形式はブラウザ表示互換のためHTMLも返せる。
- JSONを要約・推測するのではなく、同じ集計値をMarkdownへ決定的に整形するだけ。

## ChatGPT取得失敗へのfallback

`AI URL`発行時、可能ならURL fragmentへ`VA1`形式の小さい集計snapshotを付ける。fragmentはHTTP requestへ送信されないため、Relay / Cloudflare側の署名検証・cache keyには影響しない。

`VA1`には、選択window、生成時刻、Visits / Page views、新旧host内訳、主要channel、上位entry page、上位external/internal flow、国、端末の小さいsubsetだけを含める。IP、Cookie、raw User-Agent、Cloudflare token、Dashboard passwordは含めない。

目的は、AI側のURL fetchが`Cache miss`等で失敗しても、ユーザーが貼ったURL文字列そのものから最低限の集計を読めるようにすること。full exportは従来どおり15分で失効する。

注意: fragment内の`VA1` snapshotはURL文字列そのものに含まれるため、full exportのような暗号学的な失効はしない。共有先へ渡るのは上記の限定したaggregate subsetだけに留める。

`AI COPY` はfull JSON fallbackとして残す。
