# Story-bank Chat Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement task-by-task in the existing authorized checkout.

**Goal:** Add four groups of premade questions and six curated local stories while preserving free-text AI.
**Architecture:** A public story data module feeds an About-page source section, deterministic answers and retrieval. Existing question strings remain available, grouped by topic. Fixed choices always use local answers; free text retains configured AI behavior.
**Tech Stack:** Existing Next.js, React, TypeScript, Vitest and Playwright; no new dependencies.
**Spec:** docs/superpowers/specs/2026-11-17-story-bank-chat-design.md (owner approved both grouped approach and design).

## Constraints and review focus
- English public copy, third-person guide; never copy raw dossier, coaching, private details or unverified impact.
- Keep old question labels and answer behavior. Direct typed story questions also use curated answers.
- Choices must remain usable with keyboard and mobile, without hiding the input.
- Fixed choices must not contact configured AI. Free-text transport and cancellation remain intact.
- Every story citation must resolve to visible public text; exclude outdated status and stronger claims than the source permits.

## Task 1: Shared story content and deterministic answers
- [x] Add failing tests for six stories, actual source anchors, public retrieval and configured-endpoint bypass.
- [x] Create data/assistant-stories.ts; render stories at /about#story-*; route exact questions and curated story lookup in lib/assistant.ts and lib/assistant-client.ts; add summaries to data/assistant-corpus.ts.
- [x] Verify unit tests and static About rendering. Preserve current HRS statuses.

## Task 2: Grouped question browsing
- [x] Add browser coverage for category filtering, source links and no-network choice answers.
- [x] Group existing questions plus the six new stories in data/assistant-suggestions.ts; add topic controls and group labels to PortfolioAssistant with matching compact CSS.
- [x] Use the existing async presentation/cancel path with explicit local mode for button choices, retain configured mode for free text. Test desktop/mobile/Firefox and mocked configured AI.

## Task 3: Release
- [x] Lint/types/full unit suite, base-path local and configured builds, budgets, affected browser suites, independent final review.
- [ ] Update governance/guide docs, commit/push approved work and observe hosted quality/deploy + live story/source output.

Ruling: execute in the current checkout as requested for this repository update; avoid an extra branch/worktree or repeat permission gate after owner approval. One final independent review follows implementation.
