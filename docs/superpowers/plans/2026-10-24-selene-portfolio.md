# SELENE Portfolio Implementation Plan

> Use superpowers:executing-plans for this bounded inline preview.

**Goal:** Apply the approved replacement visual direction to the existing portfolio opening.
**Architecture:** A client Earthrise component renders six responsive layers and updates them through one Lenis/rAF loop. Existing server-rendered RecruiterView and routes remain intact.
**Tech Stack:** Existing Next.js/React/TypeScript; Lenis ^1.3.11; local supplied WebP layers; CSS; locally bundled reference fonts.
**Spec:** docs/superpowers/specs/2026-10-24-selene-portfolio-design.md

## Task 1: Replace the discarded opening
- [x] Remove all task-owned Monsoon files, dependency additions, and tracked changes.
- [x] Download and inspect the provided asset archive; keep local paths and base-path handling.
- [x] Implement personal Earthrise, scoped navigation, reduced-motion subscription, static SSR fallback and skip-to-portfolio.
- [x] Verify choreography, SSR content, unit suite, lint, TypeScript/build and original static budgets.
- [x] Check 390/768/1280/1920 widths, desktop/mobile layers, navigation, skip path and theme contrast in the browser.
- [x] Independent source review; fix the day-theme specificity regression it identified.
- [x] Complete final production-preview inspection and document results.

Review focus: single rAF cleanup, live reduced-motion changes, no-JS visibility, hidden-link keyboard focus, base-path assets, desktop/mobile navigation, and theme contrast. No commits or publication. User's explicit replacement request supersedes the previous design and plan; no additional approval gate needed for a local first preview.

## Follow-up: project deck and world entry
- [x] Map only the required project preview fields from existing server data.
- [x] Add pinned horizontal deck using the existing scheduler, nearest-card highlighting, progress and real case-study destinations.
- [x] Preserve a static grid for reduced motion/no JavaScript; reveal keyboard-focused cards.
- [x] Add world CTA in persistent homepage navigation and on the initial dust screen.
- [x] Verify geometry/SSR tests, lint/build and original budgets.
- [x] Complete desktop/mobile and pointer/keyboard browser checks.
- [x] Update governance and leave the first preview available without publishing.

## Direct horizontal deck correction
- [x] Replace vertical-progress mapping with native horizontal scrolling and scroll snap.
- [x] Add previous/next controls, retain keyboard access and reduced-motion transitions.
- [x] Remove duplicate recruiter project cards and unused pinned-deck helper.
- [x] Verify unit tests, lint/build, budgets and desktop/mobile interaction.

## Quick view, typography, palette and CTA correction
- [x] Reproduce smooth-anchor delay; add failing direct-jump regression and repair.
- [x] Unify shared typography and lunar UI palette; adjust wide heading sizing.
- [x] Strengthen world and all-projects CTAs, including explicit opening choices.
- [x] Verify immediate desktop/mobile destination and focus, project navigation, unit suite/lint/build/budgets and source review.
