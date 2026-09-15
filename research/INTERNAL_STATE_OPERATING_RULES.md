# VINTAGE ALARM — Internal State Operating Rules

Status: ACTIVE / INTERNAL WORKING POLICY / NON-PUBLISHED

## Purpose

VINTAGE ALARM uses GitHub not only as the public website source, but also as a durable memory for editorial and research decisions. The internal state must survive across chats and model sessions so old assumptions, rejected ideas, and superseded directions are not accidentally revived.

At the same time, editorial strategy, competitor positioning, rejected copy, draft evolution, and internal decision logs should not be exposed through the normal public-facing workflow.

The operating rule is therefore:

**Keep durable internal state on dedicated `state/*` branches; keep `main` and public PRs limited to content that may be publicly inspected.**

This reduces casual discovery but is not a confidentiality boundary because the repository itself is public.

## Branch roles

### `main`

Use only for:

- published site code and content
- approved article text
- approved images / assets
- references and source metadata that may be public
- production fixes and public documentation

Do not put unpublished editorial strategy, rejected ideas, internal evaluation, competitor analysis, or private working notes on `main`.

### ordinary working branches

Use for changes that are intended to become public after review, such as:

- article implementation
- layout changes
- source-visible corrections
- image integration
- code fixes

A working branch may have a PR because its contents are intended for eventual public inspection.

### `state/*` branches

Use as durable internal memory for:

- current objective and current editorial direction
- rejected candidates and rejection reasons
- superseded old specifications
- scope locks and stop rules
- unresolved questions
- evidence conflicts and confidence judgments
- competitor-positioning analysis
- copy-development history
- unpublished drafts
- decisions about what not to publish or emphasize
- handoff notes needed so future sessions do not regress

Rules for `state/*` branches:

1. Do not open PRs from them.
2. Do not merge them into `main`.
3. Do not link them from the website, README, public issues, releases, public PR descriptions, or public comments.
4. Do not mention branch names in published content.
5. Do not copy internal strategy text into public PR bodies.
6. Keep filenames descriptive enough for continuity, but do not create public index links to them.
7. Treat these branches as low-discoverability storage only; anyone intentionally inspecting all branches can still find them.

## Session-start rule

Before continuing an existing research/editorial topic, first inspect its active `state/*` branch and read, in this order when available:

1. internal state index
2. active scope lock
3. active editorial decisions
4. rejection / decision ledger
5. latest draft
6. unresolved evidence notes

Do not propose a new direction until these are checked.

## Decision-update rule

Whenever the user makes a durable decision that could affect future work, update the relevant `state/*` branch before considering the task finished.

Examples:

- a section is adopted or rejected
- a copy direction is rejected
- a source conflict is resolved or deliberately left unresolved
- a previous assumption is invalidated
- a no-change area is declared
- the article's editorial purpose changes
- a competitor finding changes what deserves emphasis

Record both **the decision and the reason**. A rejected idea must not be silently reintroduced later without new evidence or an explicit user reversal.

## Public / internal split

When a fact is useful both internally and publicly, split it by role:

- public side: verifiable fact, source, citation, final approved wording
- internal side: why it matters, what it competes with, what was rejected, why this angle was chosen, alternative drafts, strategic emphasis

Example:

- Public: `CH304088A was filed in 1952 by Marcel Bliss and describes bezel-driven alarm winding and setting.`
- Internal: `This is a key differentiator because major competing 10WA articles checked so far do not foreground the patent comparison.`

The second sentence belongs only on `state/*`.

## Draft handling

Early and intermediate drafts belong on `state/*` unless the user explicitly wants them in a public review branch.

Only move text into an ordinary working branch when it is ready to be treated as publishable material.

Do not use public PR history as the notebook for draft evolution.

## Research handling

Evidence ledgers may remain on a state branch if they contain internal judgments, search failures, rejected hypotheses, or strategic notes.

If a source table is needed publicly, create a cleaned public version containing only information safe to expose. Do not copy the full internal ledger by default.

## Visibility precautions

Because this repository is public, the following are mandatory for low discoverability:

- no PR from `state/*`
- no link from default-branch files
- no mention in README / public issue / release
- no cross-reference from published article source
- no public PR body that explains the internal strategy
- do not rely on GitHub secrecy; use a private repository if true confidentiality becomes necessary

## Recovery after an accidental public-state write

If internal-state material is accidentally placed on a public-facing branch or PR:

1. Do not delete the only durable copy.
2. First copy or confirm the material on the appropriate `state/*` branch.
3. Then remove it from the public-facing branch / PR.
4. Keep factual evidence separately if it is still useful publicly.
5. Verify the state branch still contains the latest decisions before closing the incident.

This order is mandatory. Preservation comes before cleanup.

## Current 10WA canonical state

For Wittnauer Cal.10WA, the current internal state branch is:

`state/10wa-editorial`

The active state index on that branch is:

`research/INTERNAL_STATE_INDEX.md`

Before any future 10WA editorial or research work, read that index and the active files it points to first.
