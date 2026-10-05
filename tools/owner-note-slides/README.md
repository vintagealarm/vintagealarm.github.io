# OWNER'S NOTE Slides → PNG exporter

VINTAGE ALARMのOWNER'S NOTE用Google Slidesを、再利用可能なPNG資産として書き出す正本です。

## Canonical deck

- Presentation ID: `1Lcz0CEZncDw1GncI4RMY6qDmfO4Fknq4NvpGtBZAaLk`
- Title: `VINTAGE ALARM — OWNER'S NOTE SLIDE SYSTEM — CITIZEN SPIKE`
- Slide registry: `tools/owner-note-slides/manifest.json`

Google Slides本体が制作正本です。PNGは派生成果物であり、レイアウトや翻訳をPNG側で修正しません。

## Export contract

- Format: PNG
- Size: **1600 × 2233 px**
- Google Slides thumbnail size: `LARGE`
- JA / EN / DEを別ファイルとして書き出す
- ファイル名はmanifestで固定する
- API metadataだけでなく、ダウンロードしたPNGのIHDRを読み、実ピクセル寸法も1600 × 2233でなければFAILする
- 生成PNGは通常Gitへcommitせず、`artifacts/owner-note-slides/` またはGitHub Actions artifactとして扱う

2026-10-05の現物確認では、manifestに登録した現行18 slide objectIdすべてについて、connected Google Slidesから`LARGE` PNGが1600 × 2233で返ることを確認済みです。

## Local usage

一覧だけ確認する場合は認証不要です。

    npm run owner-note-slides:list

全18枚を書き出す:

    GOOGLE_SERVICE_ACCOUNT_JSON='{"...":"..."}' npm run owner-note-slides:export

一部だけ:

    npm run owner-note-slides:export -- --slides wittnauer-10wa-ja,wittnauer-10wa-en,wittnauer-10wa-de

`GOOGLE_OAUTH_ACCESS_TOKEN`が存在する場合は、それを優先して利用できます。credentialをGitへ保存してはいけません。

## GitHub Actions

`.github/workflows/export-owner-note-slides.yml` を`workflow_dispatch`で実行すると、PNG群と`export-manifest.json`をActions artifactとして受け取れます。

### One-time authentication setup

このGoogle Slidesは現在privateです。公開リンク化はしません。

1. Google Cloud側でSlides APIを利用できるservice accountを用意する
2. service accountの`client_email`へ、このpresentationだけをViewerとして共有する
3. service account JSONをGitHub Actions secret `GOOGLE_SERVICE_ACCOUNT_JSON` に保存する

GitHubリポジトリ・decision log・READMEへ秘密鍵を保存しません。service accountを作れない場合は、ローカル実行時に一時的な`GOOGLE_OAUTH_ACCESS_TOKEN`を利用できます。

## Failure behavior

次は成功扱いにしません。

- manifestにないslideを推測で書き出す
- Google Slidesのtitleがmanifestと一致しない
- `LARGE`のmetadataまたは実PNGが1600 × 2233でない
- PNG以外を後処理でリサイズして「同じ」とみなす
- service accountがdeckへアクセスできない

Slides内容の品質監査と画像書き出しは別工程です。export成功は、翻訳・文字切れ・画像cropが正しいことの証明ではありません。内容監査は実slide / thumbnailを見て別に判定します。
