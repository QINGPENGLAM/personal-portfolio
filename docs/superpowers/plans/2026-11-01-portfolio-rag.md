# Portfolio RAG Implementation Plan

> Execute inline with superpowers:executing-plans; one read-only review at completion.

**Goal:** Upgrade the existing guide with optional free-only, source-grounded AI.
**Architecture:** Pure public corpus/retrieval modules, a separate Worker and atomic
Durable Object quota, and a bounded frontend transport that retains local fallback.
**Tech stack:** Existing TypeScript/Zod/Vitest/Playwright; standard fetch; Wrangler
only for Worker runtime verification/deployment. Keep the existing checkout and
all unrelated changes. No commits/pushes or live account operations.
**Spec:** ../specs/2026-11-01-portfolio-rag-design.md — user approved2026-11-01.

## Global constraints
240-character question;4history messages<=480chars;8KBrequest;6chunks/8,000chars;
1,600-character answer;10upstream attempts/UTCday;3/minute/address hash;
600output tokens;20-second upstream deadline. Free-only model allowlist, no retry,
no frontend key, no user-text logs, no internal-document corpus. Preserve all
existing budgets and local no-endpoint mode. Live readiness needs private setup.

## Review focus
Grounding/planned status; false citations; prompt/control injection; concurrent
quota exhaustion; secrets/input leaks; unconfigured/offline frontend behavior.

### 1. Retrieval and protocol
- [x] Add failing retrieval fixtures for bilingual questions, follow-up context,
  irrelevant questions and HRS proposed status.
- [x] Add data/assistant-corpus.ts and lib/assistant-retrieval.ts with explicit
  public fields, stable IDs, lexical aliases and bounded source selection.
- [x] Add shared request/model/response validation in lib/assistant-protocol.ts.
- [x] Run focused tests red then green and existing content tests.

### 2. Backend and accounting
- [x] Add failing Worker/quota tests covering grounded payload, validated citations,
  free-only routing, failed attempts, races/day rollover, malformed body/output,
  origin/method/size checks, timeout/429, missing config and no retries.
- [x] Implement server/assistant/quota.ts and worker.ts; add wrangler.jsonc and
  secret template/README. One SQLite-backed DO atomically reserves attempt slots.
- [x] Verify transport timeout/body cancellation and server-resolved links; run tests.

### 3. Existing widget integration
- [x] Test frontend delivery with absent/invalid endpoint, bounded history, validated
  AI answer, invalid links, failure/local fallback, cancellation and timeout.
- [x] Add lib/assistant-client.ts; modify PortfolioAssistant for transport, mode
  disclosure, source links, pending/cancel and current-page-only history.
- [x] Add e2e/assistant-rag.spec.ts with explicitly injected test endpoint and mocked
  model transport. Keep production unconfigured by default.

### 4. Verify and hand off
- [x] Run lint/types/full unit/build/budgets and targeted configured/unconfigured
  browser flows; validate Worker bundle/local runtime if supported.
- [x] One read-only implementation review; fix actionable issues with regression tests.
- [x] Update governance and private setup instructions; distinguish mocked/local
  verification from live provider/account/deployment readiness. No publication.

## Execution ledger — 2026-11-01
- Retrieval/protocol, Worker/quota and frontend tests each failed before their
  implementation and then passed. Existing checkout retained as requested.
- Ruling: explicit published future-work fields and HRS intended AI workflow are
  tagged proposed even where the public data lacks a `planned` flag; conservative
  classification prevents presenting planned behavior as completed work.
- Ruling: use compatibility date2026-10-30 because installed Wrangler4.156.0's
  workerd supports that date, rather than the originally chosen2026-11-01.
- Fresh-context read-only review found two P2 issues: missing fact labels/topic
  aliases and caller timestamp quota regression. Added failing regressions and
  fixed both. Also fixed education citation to the existing /about#education.
- DO owns reservation time; delayed requests/alarms and regressing clocks fail
  closed rather than reset current-day counts. Local actual SQLite probe accepted
  ten of twenty concurrent requests and returned429 after process restart.
- No account setup, real API requests, commit, push or deployment performed.
- Configured browser tests use a separate build with an explicit test endpoint;
  no endpoint override/test hook ships in production. Default build restored.
