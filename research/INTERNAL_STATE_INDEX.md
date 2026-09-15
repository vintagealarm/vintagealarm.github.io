# INTERNAL STATE INDEX

Status: INTERNAL WORKING STATE / NON-PUBLISHED

This branch exists to preserve editorial decisions, rejected directions, research scope, competition review, copy-development history, and draft text so future work does not silently revert to older assumptions.

## Canonical branch

`state/10wa-editorial`

Do not open a Pull Request from this branch. Do not link this branch from the public site, README, issues, releases, or PR descriptions. Do not merge this branch to `main`.

## Operating policy

The general VINTAGE ALARM internal-state rules are defined in:

`research/INTERNAL_STATE_OPERATING_RULES.md`

That file is the active operating policy for how `main`, ordinary public-intent branches, and `state/*` branches are separated. It also defines session-start checks, decision logging, draft handling, accidental-public-write recovery, and visibility precautions.

## Why this exists

The public website repository is also used as the durable state store for ongoing editorial/research work. The purpose is continuity: keep current goals, rejected ideas, scope locks, unresolved questions, evidence judgments, and draft evolution available to future editing sessions.

## Visibility rule

This repository is public, so this branch is not secret. The goal is only to reduce casual discovery:

- keep working-state files off `main`
- keep this branch outside Pull Requests
- do not link to it from published pages
- do not mention internal differentiation strategy in public PR bodies
- keep public-facing branches limited to source/evidence or approved article content

Anyone who intentionally inspects all branches can still find these files. True confidentiality requires a private repository; this branch is a low-discoverability state store, not a security boundary.

## 10WA state files

The existing `research/WITTNAUER_10WA_*` files on this branch preserve:

- evidence ledger and source conflicts
- research scope locks and stop rules
- CH304088A audit / claim chart
- Longines vs AS1200 / 10S evidence chain
- catch-copy ledger and rejected directions
- editorial decisions and competitor-positioning review
- Deep Dive draft and prior progress logs

When continuing 10WA work, read the active scope/editorial files here before proposing new directions. Rejected concepts must not be revived without new evidence or an explicit user decision.
