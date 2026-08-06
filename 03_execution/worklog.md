# Worklog

## 2026-08-06 · Phase 10

- Added deterministic repository-insight aggregation for language, latest recorded push year, Pages configuration, verified reachability, unavailable URLs, and code-only records
- Added `/projects/insights` with four exact evidence metrics, accessible language and year distributions, a deployment ledger, and prominent interpretation boundaries
- Added archive/insights cross-navigation, a Projects-page evidence-dashboard link, route metadata, and sitemap coverage
- Added 3 Phase 10 calculation tests, an end-to-end interpretation-boundary flow, and an automated accessibility audit for the new route
- Verified lint, strict TypeScript, 39 Vitest tests, the 17-route static build, all gzip/export budgets, and 34 passing core browser checks with 17 intentional skips across Chromium, Firefox, and mobile Chromium
- Reused the unchanged isolated Chromium WebGL result from Phase 9 in the same work session; Phase 10 did not modify world code

### Reflection

- What went wrong: the first insight test expected 13 JavaScript repositories, but the deterministic source calculation correctly returned 14; the assertion was corrected to the evidence.
- What went wrong later: the first browser assertion expected a root-relative link and ignored the production `/personal-portfolio` base path; matching the exported suffix fixed the test without changing the correct application link.
- What repeated: metadata aggregates need labels that prevent readers from inferring timelines, scale, or maturity that the source cannot establish.
- What became reusable: pure count aggregation plus text-labeled CSS bars creates a lightweight, static, accessible evidence dashboard with no chart library.
- Global-rule candidate: when visualizing repository metadata, name the exact timestamp semantics and keep every aggregate traceable to the full record set.

## 2026-08-06 · Phase 9

- Refreshed the public GitHub metadata and confirmed the inventory remains 39 repositories with 20 Pages-enabled candidates
- Requested every exact standard GitHub Pages URL: 17 returned HTTP 200 HTML and 3 returned 404
- Recorded each verified URL, observed HTML title, check date, and status in the validated repository content model
- Added demo-availability filtering, live-page-title search, verified-date badges, paired code/live actions, and visible unlinked 404 states
- Updated the Projects callout and archive metadata to explain the independently checked live-evidence boundary
- Added 3 Phase 9 data-contract tests and extended the cross-browser archive flow through availability filtering and a verified live link
- Verified lint, strict TypeScript, 36 Vitest tests, the 16-route static build, every gzip/export budget, 30 core browser checks with 15 intentional skips, and the isolated Chromium WebGL regression
- Reviewed the archive at desktop and 390 px: 17 live actions render, all 4 controls measure 48 px, title search works, and no horizontal overflow was found

### Reflection

- What went wrong: the first GitHub API refresh was blocked by the restricted network sandbox; rerunning the same read-only request with scoped network approval succeeded.
- What repeated: repository settings and deployment reachability are distinct evidence levels, and a reachable old portfolio still does not prove the new local export was released.
- What became reusable: `verified`, `unavailable`, and `not-configured` statuses with a check date make static deployment evidence truthful and easy to refresh.
- Global-rule candidate: publish external demo links only from independently checked exact URLs, and preserve failed checks as dated evidence instead of hiding them.

## 2026-08-05 · Phase 8

- Captured and Zod-validated a dated snapshot of all 39 public repositories visible on the `QINGPENGLAM` GitHub profile
- Added `/projects/archive` with repository-name search, exact-language filtering, newest/oldest/name sorting, visible result counts, transparent missing-description states, and exact GitHub code links
- Added an evidence-boundary panel that explains why GitHub Pages metadata is not presented as a verified live demo
- Linked the archive from the homepage Recruiter View and selected Projects page without expanding the curated 3D world or inventing new case studies
- Added archive metadata and sitemap coverage, 4 repository-data tests, a cross-browser archive flow, and an automated accessibility audit for the new route
- Verified lint, strict TypeScript, 33 Vitest tests, the 16-route static build, all gzip/export budgets, 30 passing core browser checks with 15 intentional skips, and the isolated Chromium WebGL regression
- Reviewed the archive at desktop and 390 px widths; search and select controls measure 48 px and no horizontal overflow was found

### Reflection

- What went wrong: Playwright could not bind its static test server inside the restricted sandbox, so the same scoped test command was rerun with approved local-port access.
- What repeated: repository metadata and deployment evidence need separate truth labels; `has_pages=true` still does not prove that a live URL works or contains the current build.
- What became reusable: a validated dated snapshot plus explicit missing-data UI creates a stable static archive without API keys, runtime rate limits, or fabricated copy.
- Global-rule candidate: keep flagship storytelling curated, and route complete but lower-context evidence into a filterable archive with source date and verification boundaries.

## 2026-08-05 · Phase 7

- Added five validated guided-tour stops covering identity, projects, skill evidence, professional journey, and contact
- Added shareable `?tour=` state, browser Back support, a visible guided-tour entry, pause/resume, previous/next/finish controls, and an eight-and-a-half-second reading interval that begins only after the canvas is ready
- Added manual reduced-motion progression, automatic viewport framing, a live progress indicator, and 44-pixel mobile controls without horizontal overflow
- Added an energy waterfall, animated data droplets, floating islands, lanterns, stepping stones, a moon halo, and quality-aware scenery density using procedural geometry
- Added the fixed `guided_tour_started` privacy-safe analytics event without adding content-bearing analytics payloads
- Added Phase 7 data tests and extended the isolated Chromium WebGL flow through tour start, URL progression, exit, and project opening
- Verified lint, strict TypeScript, 29 Vitest tests, the 15-route static build, 26 core browser checks plus the isolated guided WebGL check, and every static performance budget
- Verified the richer world adds only about 2 KiB gzip to the world shell, which remains at 265 KiB against the 290 KiB budget

### Reflection

- What went wrong: an old unresponsive Next.js process still held the development lock; resolving its exact project-scoped PID allowed a clean preview server to start.
- What repeated: GPU world behavior is most reliable when its browser check runs in a fresh process after the semantic browser matrix.
- What became reusable: validated tour data plus URL-synchronized camera targets provide a content-driven storytelling layer without coupling copy to Three.js components.
- Global-rule candidate: begin auto-advancing visual narratives only after the underlying renderer or asset boundary reports ready, and always provide manual controls.

## 2026-08-05 · Phase 6

- Added route-specific canonical, Open Graph, X card, manifest, Person, and SoftwareSourceCode metadata
- Generated and verified one portfolio-specific 1200×630 social card with exact name, role, and tagline
- Hardened the contact client and Worker with hydration readiness, first-error focus, a 12-second timeout, 12 KB request caps, `no-store`, and origin-varying response headers
- Increased mobile world touch targets, moved the portfolio guide above world controls, and strengthened skip-link and theme-toggle states
- Added gzip performance budgets and a production security/hosting boundary
- Added Playwright flows for recruiter view, project routes, résumé, contact validation, keyboard navigation, reduced motion, no-WebGL fallback, interactive world projects, and mobile overflow
- Added axe-core WCAG A/AA checks and a gated GitHub Pages release workflow
- Verified 27 local Playwright tests across Chromium, Firefox, and mobile Chromium: 26 core checks with 13 intentional project skips, followed by the isolated Chromium WebGL world check; Chromium axe checks passed on home, projects, contact, and fallback world routes
- Verified lint, strict TypeScript, 27 Vitest tests, the 15-route static build, and all static performance budgets
- Verified `https://qingpenglam.github.io/personal-portfolio/` returns HTTP 200, but its title and Vite asset path show that it is still the earlier portfolio rather than this Phase 6 export; no deployment was performed

### Reflection

- What went wrong: the first browser run used `127.0.0.1` against a `localhost` Next.js dev origin, so Next blocked client chunks and made hydrated behavior look broken.
- What went wrong later: running Playwright against the hot-reload server while the production build reused `.next` caused slow rebuilds and a false audit timeout; the suite now serves `out/` directly.
- What repeated: the GPU-backed world test could stall a reused browser process after the broader matrix; it now runs in a fresh Chromium process after the core suite while remaining part of `npm run test:e2e`.
- What repeated: static-hosting boundaries still require explicit separation between code/configuration and a verified public release.
- What became reusable: keep the browser test base URL on the exact dev-server origin, and make release budgets compare compressed route-entry assets instead of the entire dependency graph.
- Global-rule candidate: when Next dev warns about blocked cross-origin chunks, fix the test origin before diagnosing component effects or interaction logic.

## 2026-08-05 · Phase 5

- Added a deterministic portfolio guide over approved profile, project, experience, education, and skill data
- Added twelve-questions-per-minute local abuse protection and explicit unavailable-information responses
- Added muted-by-default Web Audio feedback with a persistent opt-in control and graceful failure state
- Replaced the generic world spinner with actual initialization milestones and lightweight exits
- Added reduced-motion-aware data signals between the AI core and world landmarks
- Added a privacy-safe analytics adapter with fixed event names and no sensitive content
- Added an accessible contact form and separate Worker-compatible delivery boundary with validation, origin restriction, honeypot timing, hashed-IP KV rate limiting, and provider secrets
- Added route recovery, a JavaScript-disabled note, and a non-blocking curiosity achievement
- Added 5 Phase 5 tests; lint, TypeScript, 25 tests, and the 14-page static build pass

## Reflection

- What went wrong: the static site requirement conflicts with an in-app request-time contact route; a separate worker preserves GitHub Pages instead of quietly breaking export.
- What repeated: optional features need honest fallback states so the recruiter portfolio remains complete without services, sound, AI, or WebGL.
- What became reusable: fixed analytics events, shared contact validation, and approved-data retrieval are isolated from presentation components.
- Global-rule candidate: never describe an adapter as a live backend until its endpoint, secrets, provider result, and deployment are verified.

## 2026-08-05 · Phase 4

- Added validated combined timeline data across work, projects, and education
- Added horizontal desktop and vertical mobile timeline layouts with type filters
- Added expandable contributions, measured outcomes, and technologies for every role
- Added skill-to-project and skill-to-experience evidence exploration plus a plain skills list
- Expanded About content around interests, goals, working style, and curiosity
- Added Experience, About, Skills, and Education dossiers inside the world with shareable query state, Back, Escape, and focus trapping
- Updated Phase 4 documentation and added 5 focused content tests
- Validation passed: lint, TypeScript, 20 tests, 14-page static build, desktop/mobile browser review, no browser errors

## Reflection

- What went wrong: the first browser preview attempt reached a stopped local server; restarting the retained preview resolved it.
- What repeated: content facts need one validated source so recruiter pages, world panels, and filters stay consistent.
- What became reusable: timeline records and exact technology matching now provide a shared relationship layer.
- Global-rule candidate: keep immersive landmarks curated and open accessible HTML detail instead of duplicating large content inside 3D geometry.
