# HRS Case Study Implementation Plan

**Goal:** Build the user-authorized three-section interactive local draft.
**Architecture:** A dedicated static route renders typed explanatory content and native disclosure nodes. Scoped CSS draws top-down connectors, with independent Database and Google Cloud disclosure lists.
**Tech Stack:** Existing Next.js, React, TypeScript, CSS; no added dependencies.
**Spec:** `docs/superpowers/specs/2026-10-24-hrs-case-study-design.md`

## Constraints
Reuse current theme; no timings; AI is a placeholder; no pipeline writes or publication. Continue in the current checkout to preserve the user's active preview and in-progress visual changes. User explicitly requested implementation/sketch, so execute this bounded slice inline.

## Work
- [x] Add a failing static-render regression for chapter order, native disclosure content and the AI placeholder.
- [x] Implement the content, route, workflow branches, and side-by-side deployment lists; link from Projects.
- [x] Verify tests, lint, production build and original budgets. Inspect desktop/mobile, expanded branches, keyboard disclosure and navigation in the browser.
- [x] Review the bounded changes and update governance with results and limitations.

## Review focus
Expanded fork content must not overlap connectors; mobile branches must retain labels; AI must not appear deployed; every disclosure must be keyboard accessible; internal navigation must respect the deployment base path.

## Verification — 2026-10-25
53 unit tests and lint passed. Final production build/TypeScript exported 20 routes; original five budgets passed (265 KiB homepage initial JS, 20 KiB largest CSS, 10522 KiB export). Browser verified native disclosure exclusivity, Enter-key collapse, independent Database/Cloud groups, parser expansion, AI placeholder, Projects entry/back links and no overflow at 320/390/768/1440 widths. Mobile deployment columns stack. Fixed expanded fork sibling stretching. Bounded independent source review found no important defect. No commit, push, publication, or HRS pipeline changes.


## HRS node popups — 2026-10-25
User requested popups instead of inline dropdowns. Supersedes the native disclosure design: workflow, database and cloud nodes now open labeled native modal dialogs with a dimmed/blurred backdrop. Close button, Escape and outside-click dismiss; background scroll is locked and restored; focus stays within the popup and returns to the originating node. Small screens constrain popup height with internal scrolling and a sticky close bar. Original explanations remain available in a no-JavaScript fallback. Node layout does not expand.

Popup replacement verified with unit tests, build, lint, original budgets and browser interaction checks.


## HRS motion and branch clarity — 2026-10-25
Added a 260ms fade/lift/scale popup entrance and 170ms exit, with matching backdrop fades. Close button, Escape and outside-click use the same delayed close path; modality/scroll lock remain until close. A 250ms fallback handles interrupted exit animations, timers are cleaned up, and reduced motion closes immediately without CSS animations. Larger outlined Yes/No pills now sit directly on stronger directional rails. Desktop branch spacing increased; mobile branch labels use a wider rail.
