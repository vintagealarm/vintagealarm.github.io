# Wittnauer 10WA — Implementation Status — 2026-09-15

Status: ACTIVE / INTERNAL WORKING STATE / NOT PUBLISHED

## Current implementation

- Public-content working branch: `content/wittnauer-10wa`
- Draft PR: #44 `Wittnauer Cal.10WAページを追加`
- Content file: `src/content/watches/wittnauer-10wa.md`
- Current publication flag: `published: false`
- Current owner number: `06`

## Structure lock

User instruction: **他のWATCHページと構成を変えない。**

Implementation therefore uses the existing WATCH content schema and existing `WatchPage.astro` rendering path only. Do not create a special Wittnauer layout, do not alter shared WATCH components just for 10WA, and do not modify existing WATCH pages as part of this task.

The new file follows the same content blocks as the existing pages:

- catch
- OWNER'S NOTE
- guide
- NOTE
- SPEC
- DEEP DIVE
- SOURCES

## Current content

The six approved Deep Dive sections are implemented using the latest user-redlined/Japanese-audited wording:

1. Wittnauerとは
2. Wittnauer最初のアラーム、10WA
3. Cal.10WAの中身
4. 1952年の特許と量産10WA
5. 1955年にはAS製アラームも現れる
6. 10WAのバリエーション

03 / 05 / 06 include the latest micro-edits approved by the user:

- 03: 10S + AWI summary compressed to one sentence.
- 05: repeated caution language compressed into natural prose.
- 06: removed internal-review wording `今回の再確認では` from the public text.

## Unfinished / do not publish yet

The page is intentionally unpublished because these public-facing pieces are not finalized:

- formal catch copy is still undecided; current file contains a visible placeholder only for schema completeness.
- OWNER'S NOTE image path is provisional and the actual image asset has not been added.
- gallery / video assets are not yet finalized.
- OWNER'S NOTE prose outside the approved personal line is provisional page scaffolding and must not be treated as final user-approved copy.

Do not flip `published: true` or merge to `main` until these are resolved and the user explicitly approves publication.

## Verification state

Commit `1ebdf4955b9bbb79b52b9ba19d0e249d951991eb` on `content/wittnauer-10wa`:

- Astro build: PASS
- internal links: PASS
- SEO check: PASS
- WATCH citation integrity: PASS
- source traceability: FAIL only because the existing checker requires a built HTML page for every Markdown file in `src/content/watches`, while unpublished entries are intentionally excluded from static routes.

This failure is a publication-state/checker mismatch, not a content/YAML/build failure. Do not modify shared site structure or force publication merely to silence it.

## Completion condition

Before public merge:

1. finalize catch copy
2. add the real 10WA OWNER'S NOTE image (and any gallery/video actually chosen)
3. verify exact specimen-specific SPEC fields that remain provisional
4. set `published: true` only after explicit user approval
5. run full quality gates and layout/mobile checks on the rendered page
6. inspect preview/live output before merge/publication
