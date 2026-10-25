# Skills Evidence Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement task by task. User requested continuing implementation in the current chat after the checkpoint push.

**Goal:** Connect skills to verifiable work and make those connections usable with pointer, keyboard and touch.

**Architecture:** Static GitHub language snapshot and curated source citations feed a deterministic evidence resolver. The existing client explorer renders compact evidence DTOs prepared in the server page.

**Tech Stack:** Existing Next.js 16.3, React 19, TypeScript, Zod, Vitest, Playwright.

**Spec:** ../specs/2026-10-25-skills-evidence-design.md

## Global Constraints
Preserve visual style and the published checkpoint. No dependencies, live visitor GitHub requests, inferred proficiency or private source publication. No commit/push of the new work without explicit authorization. Existing global contrast failures remain outside this change.

## Review Focus
- Secondary languages must connect to projects even when not primary.
- A case study and its repository must appear once with both destinations.
- Language evidence must not manufacture framework evidence.
- Pointer departure to a result must not replace that result before clicking.
- Keyboard and mobile users must reach the same evidence without hover.

### Task 1: Sourced evidence resolver
Files: data/skill-repositories.json, data/skill-evidence.ts, data/skills.ts, lib/skills.ts, tests/skills.test.ts, tests/phase4.test.ts.
- [x] Capture public repository language breakdowns and verify curated manifests/source.
- [x] Add failing tests for C++, secondary C#, HTML/CSS, TypeScript, deduplication, unsupported skills, provenance and conceptual mappings.
- [x] Implement normalized exact matching and explicit curated additions; return SkillEvidence[] with reason, source and optional code destination.
- [x] Keep the legacy resumeSkills export as a compatibility alias; update consumers' résumé-only claims.
- [x] Run the resolver tests and existing content/assistant regressions.

### Task 2: Explorer interaction and presentation
Files: components/skills/SkillExplorer.tsx, app/skills/page.tsx, components/skills/SkillExplorer.module.css, e2e/skills.spec.ts.
- [x] Write browser regressions for preview-to-link stability, pin/restore, keyboard selection, search/no results, source filters, mobile tap and overflow.
- [x] Prepare evidence props in the server page; remove full project graphs from explorer imports.
- [x] Implement searchable counted chips, evidence source filters, clear preview/pin status, source explanations, safe external links and mobile results access.
- [x] Preserve the existing plain list; move the large repository callout below the actual explorer.
- [x] Run targeted browser checks across Chromium, Firefox and mobile Chrome, plus lint, unit tests, production build and budgets.

### Task 3: Documentation and review
Files: README.md, 00_admin/project-brief.md, 02_planning/todo.md, 03_execution/worklog.md, 03_execution/decisions.md.
- [x] Review the final diff for false claims, wrong destinations, keyboard/pointer interference and mobile layout.
- [x] Record verification, remaining limits, source dates and reusable lesson. Keep changes local for review.
