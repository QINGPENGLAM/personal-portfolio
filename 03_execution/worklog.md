# Worklog

## 2026-08-16 · Experience and Skills repository evidence

- Added a reusable published-evidence panel to `/experience` and `/skills` with the 39 public-repository total, 18 verified live pages, 2026-08-16 snapshot date, archive and insight links, and an expandable index of all 39 repository names
- Preserved recruiter truthfulness with route-specific copy that separates the repository portfolio from employer work and rejects language metadata as a proficiency or production-maturity score
- Added responsive desktop, tablet, and single-column mobile styling without adding a client boundary or another runtime data request
- Added a cross-browser critical flow that opens both disclosures and confirms exactly 39 code links, plus automated accessibility coverage for both routes
- Verified ESLint, strict TypeScript, all 39 Vitest tests, the 17-route static build, every static performance budget, and 39 passing Playwright core checks with 21 intentional skips across Chromium, Firefox, and mobile Chromium
- Visually reviewed the real Experience and Skills panels in the local browser; the 390 px expanded index had no horizontal overflow and rendered all 39 links in one readable column

### Reflection

- What went wrong: the first combined patch used a mobile CSS context from the wrong media-query block, so it was split into smaller verified patches before any file was changed.
- What repeated: a full repository inventory should remain canonical in one data source even when several recruiter routes need discovery entry points.
- What became reusable: one context-aware Server Component can provide a compact metric panel, an accessible native disclosure, and route-specific evidence boundaries without duplicating repository data.
- Global-rule candidate: when broad portfolio evidence appears beside employment or skills, make the relationship explicit and prevent repository counts from being read as workplace output or proficiency scoring.

## 2026-08-16 · GitHub repository descriptions and evidence refresh

- Published concise, source-grounded GitHub About descriptions for all 39 public `QINGPENGLAM` repositories and verified that none remain blank; private repositories stayed out of scope
- Refreshed the authenticated public metadata snapshot, including repository descriptions, push dates, and the `personal-portfolio` primary language correction from JavaScript to TypeScript
- Rechecked all 20 GitHub Pages candidates at their exact public URLs: 18 returned HTTP 200 HTML, while `project-0009-montage-product-video-generator` and `AI-Town` returned HTTP 404
- Added `arthistory-RPG` to the verified live-page records after its public URL changed from the previous 404 result to HTTP 200 with the title `Art History RPG | arthistory-RPG`
- Updated the repository archive, insight counts, production checklist, audit records, and regression expectations so every displayed description and deployment count is traceable to the 2026-08-16 snapshot
- Verified ESLint, strict TypeScript, all 39 Vitest tests, the 17-route production export, every bundle/export budget, 34 core Playwright browser checks with 17 intentional skips, and the isolated Chromium WebGL regression
- Merged pull request #1 after its independent quality job passed, deployed merge commit `a72e220` through the gated Pages workflow, and directly verified the home, archive, and insight routes at HTTP 200 HTML
- Confirmed the live archive renders 39 cards, 18 verified badges, two unavailable badges, the new `arthistory-RPG` live action, and no missing-description fallback; the live insight totals also reconcile to 18 verified and two unavailable

### Reflection

- What went wrong: the README remediation did not populate GitHub's separate repository-description field, so the portfolio correctly rendered its missing-description fallback until the About metadata was explicitly published.
- What repeated: mutable GitHub metadata and live Pages availability must be recaptured together; the README merges also changed recorded push dates and invalidated an old insight-test boundary.
- What became reusable: a complete public-repository inventory, per-repository description map, exact Pages URL checks, and a deterministic local snapshot provide an auditable refresh workflow.
- Global-rule candidate: treat README content, GitHub About metadata, Pages configuration, and observed live reachability as four separate evidence fields, and update tests from the same dated snapshot.

## 2026-08-11 · Public repository codebase audit

- Refreshed the authenticated public source inventory and confirmed that the `QINGPENGLAM` account still exposes exactly 39 public repositories
- Read every available root README and inspected default-branch manifests, source trees, entry points, state/data layers, and representative core implementation files across all 39 repositories
- Classified 23 repositories with root READMEs, 16 without them, two evidence/tool-evaluation repositories, two effectively empty repositories, one README-only repository, and the strongest recruiter-facing implementation evidence
- Recorded a repository-by-repository source audit, ordered README repair plan, correctness and evidence risks, portfolio claim cross-check, and practical review checklist in `docs/PUBLIC_PROJECT_CODEBASE_AUDIT_2026-08-11.md`
- Identified blocking cleanup items including the missing public source behind the Montage claims, a possible incremental-rehash correctness issue in `myOwnRedis`, local n8n runtime artifacts, Calculator percent behavior, NASA app-wide storage clearing, empty/duplicate repositories, and unclear third-party asset boundaries
- Directly verified the public portfolio URL returns HTTP 200 with the current `QingPeng Lam · Software Engineer` Next.js page and `/personal-portfolio/_next/` assets, then corrected stale local deployment documentation
- Kept private repositories outside the publishable audit and distinguished source inspection from runtime/build certification
- Verified that all 39 inventory names have exactly one numbered audit entry, `git diff --check` passes, lint and strict TypeScript pass, all 39 Vitest tests pass, and the 17-route static production build completes successfully
- Located the separate Codex project registry with 15 governed workspaces and confirmed that it contains fuller local evidence for several projects; in particular, the local Montage workspace includes the Next.js/Remotion source that is absent from its public GitHub repository
- Updated the audit methodology and Montage assessment so local implementation evidence improves internal understanding without being mislabeled as public recruiter evidence

## 2026-08-11 · Missing README remediation

- Revisited all 16 public repositories that lacked a root README and wrote a tailored document from each repository's actual default-branch code and assets
- Created isolated `codex/add-project-readme` commits and draft pull requests for 15 non-empty repositories; remotely verified that every PR remains draft and contains only `README.md`
- Published an honest placeholder README as the first `main` commit in the previously empty `UnityKitchenGame` repository because GitHub cannot create a pull request without an existing base commit
- Documented implemented features, architecture, setup, honest prototype boundaries, known defects, and incomplete asset licensing without inventing production behavior
- Confirmed Unity `2021.3.13f1` for all three documented Unity source repositories
- Compiled Raytracer and rendered all five documented PPM scenes; compiled the supported myOwnRedis server/client/AVL commands and ran the passing AVL test
- Found that `myOwnRedis/test_offset.cpp` does not compile because `verify_avl` is undefined, so the README explicitly records the broken test instead of publishing an invalid command
- Added `docs/README_UPGRADE_PRS_2026-08-11.md` as the durable PR index, validation record, and human review checklist
- Rechecked all 15 draft PRs immediately before merge: each was open, mergeable, conflict-free, and limited to `README.md`; configured Netlify previews were successful and the remaining repositories had no checks
- Marked all 15 PRs ready, squash-merged them into their public `main` branches, deleted the temporary remote branches, and remotely verified every PR's `MERGED` state and merge commit

### Reflection

- What went wrong: GitHub CLI authentication succeeded in the user's Terminal but initially appeared invalid inside the restricted Codex process because macOS keyring access required an approved unsandboxed check.
- What repeated: documentation commands must be tested against source; reading filenames alone would have advertised the broken `test_offset.cpp` target.
- What became reusable: sparse clones, one-file branches, compile checks, remote draft verification, and a centralized PR index make multi-repository documentation changes reviewable without downloading large Unity histories.
- Global-rule candidate: for broad README work, keep every repository isolated, test all runnable commands, and use an explicit placeholder instead of inventing content for an empty repository.

### Reflection

- What went wrong: several repositories use polished documentation or names that imply more public implementation than the default branch actually contains, while some of the strongest code has no meaningful README.
- What repeated: repository presence, README claims, source evidence, runtime verification, and production readiness are separate evidence levels.
- What became reusable: a sparse-clone audit that reads every README and samples manifests, entry points, state, and core algorithms can review a large public portfolio without downloading large media histories.
- Global-rule candidate: rank public projects only after comparing README claims with inspectable source, and label tool evaluations, generated artifacts, coursework, empty repositories, and custom applications as different categories.

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

## 2026-09-27 — EECS 494 Zelda portfolio entry

Added `/projects/zelda-recreation/` through the existing project data and shared case-study route, with a matching card, course/university, description, all 14 supplied contributions, technologies, labeled image placeholder, and disabled Download Game control. The original two project records remain unchanged. No Unity source files, source repository links, build directories, or debug artifacts were copied. The user will supply screenshots later; the final release URL remains pending. No commit, push, deployment, DESIGN.txt edit, or Discord post was performed.

Verification: production export with `/personal-portfolio` base path passed; TypeScript and lint passed; 42 unit tests passed; browser suite passed 42 tests with 21 configured skips; final Zelda-specific rerun passed Chromium, Firefox, and mobile Chromium (3 tests); interactive-world regression passed (1 test). Static budgets passed. Every exported local route/asset reference resolved. No `.cs` files exist under `public`. Reviewed desktop and mobile screenshots; corrected stretched technology chips. Build-generated `next-env.d.ts` changes restored to avoid unrelated churn.

Reflection: the initial unit run exposed the timeline's assumption that every project has supplied dates. Added a chronology-map filter rather than fabricating a date. Optional case-study sections avoid invented architecture/testing/reflection for course projects. Reused existing styles, routing, and tests; no dependencies were added. No cross-project governance change is needed.

Changed files:
- `data/projects.ts`, `data/schemas.ts`, `data/timeline.ts`
- `components/ProjectCard.tsx`, `components/ProjectDownload.tsx`
- `components/case-study/CaseStudyContent.tsx`, `components/architecture/ArchitectureDiagram.tsx`
- `app/projects/[slug]/page.tsx`, `app/globals.css`
- `public/project-previews/zelda-recreation.svg`
- `tests/projects.test.ts`, `tests/phase4.test.ts`, `tests/zelda.test.ts`, `e2e/zelda.spec.ts`
- `README.md`, `00_admin/project-brief.md`, `02_planning/todo.md`, `03_execution/decisions.md`, `03_execution/worklog.md`


### 2026-09-27 — Download activated

Verified the public v1.0 release through GitHub API: `Zelda-P1-Game.zip` is uploaded (122,129,672 bytes). Connected the Download Game button directly to that release asset, excluding automatic source archives. Archive contents and platform execution have not been independently verified. Screenshot files remain pending accessible copies. No portfolio push or deployment performed.


### 2026-09-27 — Gameplay screenshots added

Recovered both user attachments through the image reader after temporary-directory access failed. Replaced placeholder artwork with the two gameplay PNGs: first in the hero, second in a Gameplay section. Full frames are contained without cropping; no unconfirmed custom-level labels are assigned. Existing project content remains unchanged.

Validation after release URL and screenshot updates: lint, 42 unit tests, and the production build including TypeScript passed. Zelda browser checks passed in Chromium, Firefox, and mobile Chromium, verifying both image loads and the exact release-asset link. The running local preview returned HTTP 200. Reflection: use the attachment image reader when macOS temporary-directory enumeration is blocked; no permission or source-sharing policy change was needed.


## 2026-10-16 — P2 Gold portfolio discovery
Read supplied prompt as reference and inspected the existing portfolio, clean master checkout, project governance, shared cards and case-study route. Located /Users/qp2333/Unity/P2_Roguelite/Builds/P2Build.zip (105794027 bytes, 800 entries), containing MacBuild.app, WindowBuild, and __MACOSX. Archive inventory includes Mac and Windows executables and no .cs files or Unity source-project directory segments. Did not execute builds, upload files, edit product code, commit, push, or deploy. P1 currently retains two screenshots and its configured Zelda-P1-Game.zip release-asset URL; live reachability was not checked. P2 screenshot/public URL not yet identified. Presented minimal additive design for user approval.

Reflection: broad Unity searches surfaced package-cache noise; future inventory should target Builds and Assets. Reuse the existing project and components. ZIP content checks establish packaging only, not game correctness. Existing project rules already cover evidence boundaries; no global change needed.


## 2026-10-16 — Approved P2 implementation and validation
Added P2 to data/projects.ts and extended optional gameplay content in data/schemas.ts and the shared CaseStudyContent component. ProjectDownload accepts the P2 sentinel as a disabled button; the initial regression failed because the old component emitted href="P2_GAME_DOWNLOAD_URL", then passed after the fix. Reused all styles and routing without dependencies. Existing Zelda data is byte-identical to HEAD. No Unity source files appear in public or out. No screenshot was invented; existing abstract visual fallback is used.

Validation: 43/43 unit tests, lint, strict TypeScript, production static export with /personal-portfolio base path, all five static budgets, 45/45 applicable core browser checks with 21 configured skips, and isolated Chromium world regression passed. P2 and Zelda navigation passed Chromium, Firefox and mobile Chrome. Reviewed 1440 px desktop and 390 px mobile screenshots: no overflow or page errors. Independent read-only review found no actionable issue. GitHub CLI confirmed v1.0 still has the uploaded 122129672-byte Zelda-P1-Game.zip asset. Did not download or run it. Restored build-generated next-env.d.ts churn.

Pending: supplied P2 screenshots, public build-only URL, and user verification of current Windows moving-and-shooting behavior. The combined local P2 ZIP was inspected only, not uploaded or executed. No commit/push/deployment.

Reflection: the existing disabled-download behavior recognized only P1's sentinel, so P2 needed explicit schema/component handling. A focused rendering regression caught the otherwise clickable placeholder. Broad Unity searches from discovery were noisy; targeting Builds worked. Existing data-driven routing and image fallback were reusable. Existing governance already covers source and verification boundaries; no new global rule is needed.


### P2 supplied build and screenshots — 2026-10-16
Connected the user-supplied public v1.0 P2Build.zip URL and copied both supplied gameplay screenshots unchanged to public/project-previews/p2-fire-gameplay.png and p2-ice-gameplay.png. Fire screenshot is the hero with factual alt text; Ice screenshot appears in Gameplay. P2 placeholders are cleared. GitHub release API lists the uploaded 105794027-byte asset, and an unauthenticated redirect-following HEAD request returned HTTP 200. This verifies download availability, not runtime correctness. Windows gameplay note is preserved. No commit, push, portfolio deployment, or external upload was performed.

Validation: production build with base path and TypeScript passed; lint and 43 unit tests passed; all six P2/P1 browser checks passed across Chromium, Firefox and mobile Chrome, verifying exact release links and both image loads. All static budgets passed. Desktop/mobile screenshots reviewed. No new source files exposed; generated next-env.d.ts restored.

Reflection: supplied temporary image paths were readable, so direct byte-preserving copies avoided any recreation or cropping. Reused existing contained-image presentation and active-download behavior. No repeated failure or new cross-project rule.


## 2026-10-16 — P2 publication authorized
User asked for the portfolio push. Remote master matches local HEAD before the change (0 ahead/0 behind). Rechecked all 43 unit tests, lint and diff whitespace. Commit and normal push will include only the reviewed P2 implementation, images, tests and governance; the existing gated Pages workflow will perform release validation. Deployment verification follows the push.


## P2 live release verified — 2026-10-16
Published implementation commit c67cf24f56373b57bcaee44530cba51505c74b9c to origin/master. GitHub Actions run https://github.com/QINGPENGLAM/personal-portfolio/actions/runs/38989245850 completed quality and deploy successfully. Live page: https://qingpenglam.github.io/personal-portfolio/projects/modular-weapon-arena/ . Direct browser verification passed: project index contains P2 and P1 cards; P2 card navigation works; exact public build link is present; both supplied screenshots load; mobile width has no overflow; no page errors; P1 page returns HTTP 200 and retains its existing release download. Desktop game execution and Windows moving-and-shooting behavior remain unverified.

Reflection: initial live-verification heading lookup matched both project cards and the existing technical summaries; scoping to .project-card resolved the test-script ambiguity. No product fix was required. Release gates and exact deployed checks were reusable. Existing browser-selector practice covers this; no global rule change. A documentation-only follow-up uses [skip ci] to avoid redeploying unchanged product files.


### 2026-10-16 — P2 footer links to P1 Gold
Added an explicit related-project target for P2. Its existing footer card now says Explore P1 Gold and opens the Zelda page. Other project navigation uses the original circular fallback. No styling or dependency changes. Production build/TypeScript, lint, 43 unit tests, and six P2/P1 checks across Chromium, Firefox and mobile Chrome passed. The added navigation assertion failed before implementation and passed afterward.

Reflection: the default circular next-project link routed P2 to DevDoctor. An optional data-driven target keeps the requested game connection explicit while preserving the shared footer. Existing styles and browser checks were reusable; no global rule change needed.


### P2-to-P1 footer published — 2026-10-16
Commit b795a20 deployed successfully through Actions run 38989654006. Live browser verification clicked Explore P1 Gold from P2’s footer and reached /projects/zelda-recreation/. Both screenshots and download links remain available; no mobile overflow or page errors.


## 2026-10-24 — Resume PDF replacement
Copied the supplied Downloads/QingPengLam_Resume.pdf to public/resume/QingPengLam_Resume.pdf. Confirmed PDF identification and exact byte equality with cmp; inspected data/profile.ts and preview/download callers to confirm the existing path is shared. Source SHA-256: 88e54907376a05d1106c81b7eda3e4d37d64057616f9e38b682acc5e269aa057. No application code changed; no build or deployment performed.

Reflection: no failures or repeated issues. Reusing the existing asset path updates all resume entry points; byte comparison is the appropriate verification for an unchanged supplied binary. No new global rule needed.

### 2026-10-24 — Resume publication authorized
User requested commit and push. All 43 unit tests passed across 12 files; PDF byte comparison and diff whitespace checks passed. Publish the resume and its four governance records to origin/master, then inspect the deployment result.


## 2026-10-24 — SELENE portfolio opening
Read the complete supplied reference and downloaded/inspected its 17 image assets. Removed the abandoned Monsoon Vite app, video, fonts, component, tests, plans, package changes, TypeScript exclusion and budget changes. Added the personalized six-layer lunar opening to the existing homepage, responsive image cuts, local reference fonts/licenses, a shared Lenis/rAF scheduler, live reduced-motion support, static SSR fallback and skip-to-portfolio link. Existing recruiter content, routes, resume and world are retained. Scoped the reference-style navigation to the homepage; mobile links now close their menu.

Verification: 46 unit tests passed; lint clean; production export compiled all 19 pages. All five original static budgets passed (homepage initial JS 258 KiB; export about 10 MiB). Browser verified all six layers load and the Earth/astronaut reveal, no horizontal overflow at 390/768/1280/1920, portrait asset selection on phone, mobile navigation, project route and skip-to-portfolio. Source reviewer identified a day-theme selector precedence issue; added and browser-checked a dark lunar header override in both themes. A script-free copy of exported HTML was inspected in-browser with all local layers loaded, visible personal content and zero script elements; raised static fallback text above the astronaut silhouette. Final production preview follows. Full Playwright browser matrix and OS reduced-motion switching were not executed this turn.

Reflection: a complete template prompt initially led to an unnecessary standalone app before the user clarified portfolio fusion; the user subsequently replaced the visual direction. Explicitly tracking task-owned files made a bounded rollback safe. Source templates can contradict their stated visual checks (dust-clear timing), so verify the motion order directly. Scoped CSS can still lose to an existing theme selector; check both themes. Existing route/content structure and static budgets were reusable. Existing scope/verification rules cover these lessons; no global rule update needed.

Final production verification: rebuilt with /personal-portfolio base path; all 19 routes compiled, original five budgets passed (258 KiB homepage JS, 10,254 KiB export). Opened http://127.0.0.1:3105/personal-portfolio/ and confirmed all layers loaded from the base path, personal heading, and no horizontal overflow. Final local preview remains available; development server stopped. Restored generated next-env.d.ts. No commit/push/deployment.


### 2026-10-24 — Project reel and world discoverability
Added ProjectReel after the lunar opening, with four real project links, existing contained screenshots/illustration, explicit concept visuals, pinned horizontal scrolling, focused-card emphasis, counter and progress line. Reuses the existing scheduler; static grid remains for reduced motion/no scripts. Added a white world CTA in the persistent home navigation plus initial dust-screen CTA.

49 unit tests passed; lint/TypeScript/build passed. All five original budgets pass: homepage initial JS 265 KiB /275 KiB; export about10 MiB /12 MB. Independent source review requested focused checks of neighboring pointer clicks, tab-through, and short phones. Browser reproduced a lost-click issue when pointer focus recentered a neighboring card; restricted recentering to :focus-visible and verified the same click then opened Zelda's case study. Keyboard navigation across the deck kept stage scrollLeft at0. A390×600 check showed the compact focused card fully visible below the heading (top219, bottom513) with no horizontal overflow. Desktop1440px deck and stronger world CTA inspected. Full Playwright matrix and live OS reduced-motion switching not run. No commit/push/deployment.

Reflection: scroll-linked interfaces need both pointer and keyboard checks; treating every focus as keyboard input moved pointer targets before mouseup. Compact heights need their own check in addition to widths. Shared scheduler, existing project data and original performance budgets were reusable. Existing risk-based verification guidance covers the lesson; no global rule update needed.


### 2026-10-24 — Direct horizontal scrolling and duplicate removal
Changed ProjectReel from pinned vertical-progress translation to a native horizontal scroller with scroll snap, visible scrollbar, previous/next buttons and keyboard support. Focus highlighting and progress now read the scroller position. Removed the duplicate selected-work grid and its imports from RecruiterView. Existing world entry points remain.

49 unit tests, lint, production build/TypeScript and all five original performance budgets passed. Production browser verified arrow navigation, direct right/left scroll (page Y unchanged), last-card disabled state, phone keyboard focus, and 390/768/1280/1920 widths without document overflow. DOM confirms no selected-work duplicate grid. Phone screenshot confirmed full card visibility after focus. No commit/push/deployment.

Reflection: the previous version interpreted left/right motion as a vertical scroll narrative; the user wanted direct horizontal input. Native scrolling expresses that intent more clearly and removes the tall pinned section. Reused the project DTO, visuals, links and native browser focus/scroll support. No new global rule needed.


### 2026-10-24 — Four-point polish and quick-view repair
Reproduced the old quick-view behavior: the hash changed immediately while the section remained about4169px below the viewport during smooth scrolling. Added QuickViewLink with explicit immediate Lenis/native navigation, 96px offset, hash history and focus on #quick-view. The fallback native href includes the deployment base path; modifier clicks retain browser behavior. A new regression failed before the helper change and passed afterward.

Unified body/navigation fonts and the heading hierarchy with the locally bundled reference typefaces. Replaced purple primary buttons/background gradients and mixed color tokens with charcoal, lunar grey, ice blue and ivory. Matched lower recruiter cards to the lunar surfaces. Added large opening choices with supporting copy, a stronger persistent world action and full-size all-projects button. Bounded case-study title sizing for the wider display font.

Validation:50 unit tests, lint, production export/TypeScript and original5 budgets passed (265KiB homepage initial JS; about10MiB export). Browser verified immediate desktop/mobile targetTop95.9px and activeElementquick-view, charcoal background, Manrope body/Michroma headings, strengthened opening choices and actual View all projects navigation. Mobile projects page uses the same font hierarchy without overflow. Independent source review found no important functional/accessibility issue. Full browser matrix and visual game/runtime checks were not rerun. No commit/push/deployment.

Reflection: native smooth anchors and the Lenis scroll owner need explicit coordination for a promised immediate shortcut. A template hero over an unchanged older body leaves inconsistent type and colors; shared tokens and a clear CTA hierarchy resolve that boundary. The failing regression and browser position/focus measurements were reusable evidence. Existing scope/verification rules cover this; no new global rule needed.


### 2026-10-24 — Cosmic background polish
Added a CSS-only global star field, blue-violet edge nebulae, gentle twinkles and dark-button star accents. Decorative layers cannot intercept input; reduced motion disables twinkling and day mode softens the effect. Production export/TypeScript passed; browser screenshot confirmed visible stars and readable project content.

Reflection: a flat shared surface left the cinematic hero visually disconnected from inner pages. A shared decorative background adds continuity without scripts or assets. Kept content and ivory primary actions intact; no new global rule needed. No commit/push/deployment.


2026-10-24 cosmic intensity revision: increased edge nebula opacity and spread, star brightness/size/density, and minimum twinkle visibility after user found the first pass too subtle. Production build/TypeScript passed; browser screenshot verified stronger atmosphere with readable content. Reflection: decorative contrast must be assessed against the actual dark surface; the initial effect was too restrained.


## HRS case-study draft — 2026-10-25
Completed the user-authorized three-section sketch as an actual static route, with typed source-grounded content, clickable native disclosure nodes, top-down split/merge and yes/no branches, planned AI node, and Database/Google Cloud columns with why/trade-offs/services. Added one entry on Projects. No timings or new background. Full suite: 53 passing; lint clean; build/TypeScript exports 20 routes. All original performance budgets pass (homepage 265 KiB, largest CSS 20 KiB, export 10522 KiB). Browser verified accordion/keyboard behavior, independent comparison groups, base-path navigation, AI status and responsive layout at 320/390/768/1440 widths with no overflow. Fixed expanded parser forcing its collapsed sibling to stretch. Bounded independent source review reported no important issue. Browser review initially hit an account usage limit on Oct24; resumed successfully Oct25. Screenshot saved in the thread visualization directory. No HRS runtime access or changes, commit/push/deployment.

Reflection: native disclosure elements provide the exact requested inline interaction with no diagram runtime or extra client bundle. Expanding a CSS grid child can unintentionally stretch a closed sibling; branch wrappers retain compact nodes and continuous connectors. Reuse the existing theme rather than a generated concept image’s decorative intensity. No global policy change is needed.


## HRS node popups — 2026-10-25
User requested popups instead of inline dropdowns. Supersedes the native disclosure design: workflow, database and cloud nodes now open labeled native modal dialogs with a dimmed/blurred backdrop. Close button, Escape and outside-click dismiss; background scroll is locked and restored; focus stays within the popup and returns to the originating node. Small screens constrain popup height with internal scrolling and a sticky close bar. Original explanations remain available in a no-JavaScript fallback. Node layout does not expand.

Validation: updated regression failed against dropdowns and passed after replacement; all 53 unit tests pass. Lint and final production build/TypeScript pass, as do the five original budgets. Browser checked desktop/mobile popups, Close/Escape/outside dismissal, return focus, Tab containment, scroll restoration, and a 320x600 internal-scroll case without document overflow. Independent bounded source review found no important defects. No pipeline, commit, push or deployment changes.

Reflection: the user wanted detail without rearranging the flowchart. Modal inspection preserves spatial context. Native dialog supplies modality and Escape; an explicit Tab wrap keeps the sole control focused instead of cycling to browser chrome. No new global rule needed.


## HRS motion and branch clarity — 2026-10-25
Added a 260ms fade/lift/scale popup entrance and 170ms exit, with matching backdrop fades. Close button, Escape and outside-click use the same delayed close path; modality/scroll lock remain until close. A 250ms fallback handles interrupted exit animations, timers are cleaned up, and reduced motion closes immediately without CSS animations. Larger outlined Yes/No pills now sit directly on stronger directional rails. Desktop branch spacing increased; mobile branch labels use a wider rail.

Verification: HRS regression tests3/3, lint, final production build/TypeScript and all original budgets pass. Browser measured entrance0.26s, exit0.17s and a modal closing phase, then verified return focus and scroll unlock; checked phone close button and branch layout without overflow at390/320px. Bounded independent review found no important defect.

Reflection: closing a native dialog immediately removes it before an exit transition can play. Route every dismissal through one animation-aware close path and retain a bounded completion fallback. Branch labels need space on the connector itself, rather than small floating text. No dependency or global policy changes; no commit/push/deployment.

## Current-change push checkpoint — 2026-10-25
User authorized pushing all existing changes before skills work. Lint, 53 unit tests, Pages-base-path production build and all five static budgets pass. Chromium browser checks: 12 passed, 2 skipped, 8 failed, all reporting color-contrast violations. No skills implementation is included.
Reflection: use the production base path for browser verification and distinguish a successful source push from a passing deployment gate. Preserve the requested checkpoint rather than silently changing the design during publication.

## Skills evidence explorer — 2026-10-25
Implemented the chat-approved skills design after pushing the existing homepage/HRS checkpoint as 5620df2. Existing project owns the task. Used the read-only GitHub CLI after the connector rejected the languages endpoint; queried all 39 existing archive repositories and retained empty language objects. Verified seven dependency manifests (food-ordering- had no root package.json and received no dependency inference) and three concrete UnityEngine gameplay scripts. No private game source was accessed or published. Source URLs and blob SHAs are retained for inspected manifests/scripts.

Added normalized, exact skill matching, explicit concept mappings and HRS Python/SQL/PostgreSQL connections. Merge Immich repository evidence into its case study so counts do not duplicate one project. Add TypeScript, Next.js and Unity; retain honest zero-evidence skills. Evidence cards state the connection reason, source and relevant check date. The server page prepares compact explorer props instead of importing full project graphs into that component.

Explorer now has counted chips, search/clear, source filters, pinned/preview status, safe source/code links, pointer-to-panel stability, independent pointer/keyboard previews, keyboard activation focus transfer and mobile results/return controls. The repository archive callout follows the explorer. No dependency changes, new world landmark or archive refresh.

Verification: eight new resolver tests failed against the old implementation, then passed; an additional snapshot completeness check brings the final suite to 62 passing unit tests. The baseline browser test failed before the new UI. A mixed mouse/keyboard regression failed before clearing stale hover on keyboard focus. Final lint has no warnings; Pages-base-path static build/TypeScript and all five budgets pass (homepage initial gzip 271/275 KiB). Existing critical-flow matrix: 31 passed, five intentional skips. Final skills matrix: 10 passed, eight intentional skips, including scoped axe checks in both themes and 320/390px overflow checks. Desktop/mobile screenshots reviewed. Independent review identified keyboard focus-transfer and stale-hover precedence gaps; both fixed and covered by actual Tab navigation. The scoped light-theme audit found inherited CSS overriding the panel labels; computed-color inspection confirmed the cause and local selector specificity fixes now pass. Previously recorded global site contrast issues remain separate.

Reflection: a preview's interaction boundary must include its result links; keyboard pinning needs a direct path to those results. GitHub primary language hides useful secondary languages and imported shader code can dominate Unity repositories. Keep dated composition data separate from technology evidence and personal proficiency. Documented in docs/SKILL_EVIDENCE.md; no new global policy changes. New skills work remains uncommitted and unpushed.


## HRS interview content revision — 2026-10-25
Updated the problem/ownership copy using the user’s account: research-institute staff spent30–60 minutes daily opening Scholar/WoS alerts, copying details and checking multiple criteria; the user designed and built the Python automation. This is a user-reported baseline, not measured time saved. Replaced checkpoint/pagination jargon with saved PostgreSQL message IDs/status and100-ID result batches using nextPageToken. Explained From-address routing, Beautiful Soup4+lxml/urllib.parse/regex parsing, ordered DOI/WoS/URL/title deduplication and distinct email-versus-paper recovery state. Removed the requested backfill, source-quality and dated-local-guard lines. The PubMed-unmatched branch now opens AI check, explicitly planned until connected.

Checked the actual parser, sender routing, Gmail paging, processed-message and paper-storage implementations before rewriting. Existing HRS tests3/3, scoped lint and final production build/TypeScript passed. Browser confirmed revised problem and planned unmatched branch; tested the longer deduplication popup at390px with internal scrolling and no document overflow. No pipeline, publication, commit or push changes.

Reflection: presentation copy needs a concrete stored identifier and an example of what a rerun skips; generic recovery terminology hides the actual engineering story. Use the user’s ownership/baseline account without converting it into an unsupported savings claim. No new global rule needed.


## HRS homepage card — 2026-10-26

Added a first-position HRS homepage carousel card with Python/PostgreSQL/Google Cloud tags and an SVG concept illustration. Link uses the existing ProjectReel Next Link path /projects/hrs-publication-pipeline. Changed app/page.tsx and added public/project-previews/hrs-publication-pipeline.svg; did not edit pre-existing dirty HRS files. Verification: 8 focused tests passed, scoped ESLint exit0, tsc --noEmit --incremental false exit0, SVG XML/route/image checks passed. Initial Vitest attempt was blocked writing its cache by the workspace sandbox; rerun with approved filesystem access passed. No commit/push/deployment. Reflection: a dedicated case-study route can exist without appearing in the homepage dataset; expose it additively while preserving the existing route and content. No global-rule change needed.


## Interview About Me — 2026-10-26

Created components/selene/AboutMe.tsx and AboutMe.module.css, copied the exact supplied portrait to public/images/qingpeng-portrait.png (SHA-256 matches original), inserted AboutMe after Earthrise and before ProjectReel. Existing HRS card retained. User confirmed portrait was in Downloads. Verification:12 existing tests passed across homepage/HRS/content, scoped ESLint exit0 and tsc --noEmit --incremental false exit0. Browser1440px confirmed portrait left/text right and section before projects;390px confirmed vertical stack/no document overflow. Tested project anchor and actual HRS navigation. Scoped axe WCAG2A/AA/2.1AA checks pass in day/night. Visual inspection found low contrast from hardcoded dark-theme colors against light backdrop; fixed with scoped day overrides and reviewed both screenshots. Browser QA harness initially needed explicit context for axe; corrected harness and rerun passed. No dependencies, commits, pushes or deployment. Reflection: verify new content in both inherited themes, not only the intended dark presentation; use scannable cues to accompany a spoken script.


## Circular portrait — 2026-10-26

User requested a circle photo frame. Changed only AboutMe imageFrame to a square aspect ratio and50% border radius; original image and content preserved. Applies on desktop and mobile. CSS-only reversible change; browser geometry verification recorded in this task. No commit/push/deploy. Reflection:no new reusable rule.


## Company-neutral homepage copy — 2026-10-26

User clarified that the public homepage must address recruiters from any company. Replaced the Intuit-specific motivation in AboutMe with a general commitment to simplifying complex tasks, understanding user needs, clear experiences and reliable systems. Retained USAA as actual past experience. Earlier interview-specific homepage wording is superseded. Copy-only change; no layout, commit, push or deployment changes. Reflection:keep target-company motivation in interview materials rather than a general public portfolio.


## Compact HRS workflow — 2026-10-26

User requested a tighter workflow overview, without forcing it into one screen.
Added workflow-scoped CSS:840px max width (was1000),64px base node minimum
(was92),shorter24px connectors and48px decision connectors,78px fork nodes,
72px side branches, and modest readable type/padding reductions. Deployment
nodes and popup contents are unchanged; all workflow nodes/labels preserved.
Browser1440px measured chart1536.78px→1005.97px tall (about35% shorter).
Node dialog opens;390px mobile layout settles to370px wide without overflow.
Early mobile measurements ran before viewport layout settled; a temporary
page-width adjustment was removed after diagnosis. Final change is chart-only.
Existing HRS tests5 passed. Desktop/mobile screenshots reviewed. No commit,
push or deployment. Reflection:pack padding/connectors rather than scale the
whole chart; wait for responsive layout before comparing browser geometry.


## Homepage IA roles and vertical timeline — 2026-10-26

Added user-supplied ENG 101 (Introduction to Engineering, Oct. 2024–June 2025) and SI 539 (Web Design: Responsiveness and Accessibility, Aug. 2026–Present) instructional assistant roles alongside the three existing engineering roles, newest first. Professional descriptions stay at the level of course learning support; no unconfirmed metrics, tools, grading duties, or office hours are claimed. Preserved ENG 101 spelling as supplied. Shared role content also appears on the experience page and dated combined index.

Homepage now uses one continuous vertical rail with nodes and horizontal branches. Native details/summary expands each role independently using pointer or keyboard and works without JavaScript. Empty outcome/technology arrays are permitted for these teaching roles and their headings are omitted. Existing engineering contributions and metrics remain intact.

Verification: 65 unit tests, four Chromium/mobile browser checks (pointer, Enter/Space, independent expansion, mobile overflow, experience deep links and no-JavaScript operation), lint, TypeScript, production static build pass. Desktop screenshot reviewed. Homepage JavaScript, world shell, largest chunk and stylesheet budgets pass; total export budget fails at 12,624 KiB versus 11,719 KiB. Budget threshold is unchanged; cause is not attributed to this change without a baseline comparison. Local only; no commit, push, or deployment. Reflection: teaching roles should not acquire fabricated metrics or technologies merely to satisfy a software-internship content schema; omit unsupported sections. No additional global rule needed.


## Centered experience rail — 2026-10-26

User clarified the line belongs in the middle. Centered the desktop rail and alternated role cards left/right with branches joining each node. Narrow screens retain a left rail so descriptions and expanded details remain readable. Native disclosure behavior and role content are preserved. Supersedes the earlier desktop left-rail decision. Reflection: confirm the spine placement from layout references; no global-rule change. No commit, push, or deployment.

Centered-rail verification: production build and focused ESLint pass; desktop and mobile Playwright checks both pass. Desktop geometry asserts the rail is exactly halfway across and cards alternate on opposite sides; pointer/keyboard expansion and no horizontal overflow pass. Centered desktop screenshot reviewed.


### Content-sized timeline cards — 2026-10-26
User requested content-sized alternating cards. Cards now use intrinsic width with a 28rem maximum, stay within their available column, and align toward the center rail. Height follows each card’s content and expansion. Reflection: timeline columns define placement, not a required card width. No commit/push/deployment.
Verification for content-sized cards: production build and both focused desktop/mobile browser checks pass, including alternation, centered desktop rail, expansion, and overflow checks. CSS-only product change.

## Experience popups — 2026-10-26

Replaced homepage inline role disclosures with ExperienceCard native modal dialogs, using the existing HRS workflow popup CSS and lifecycle pattern. Whole-card button hit area opens details while card size, center rail and alternating positions stay fixed. Uses blurred backdrop, entrance/exit animations, sticky close control, Escape/backdrop dismissal, focus trapping/return, scroll lock restoration, reduced motion and mobile internal scrolling. No-JavaScript users have direct full-role links. HRS source remains unchanged. Supersedes previous inline-expansion decisions.

Verification: 66 unit tests, lint, production build/TypeScript and six desktop/mobile browser checks pass (pointer and Enter/Space opening, all close paths, focus trap/return, scroll restoration, unchanged card height, responsive geometry, no-JavaScript fallback and reduced motion). Additional desktop/mobile popup viewport checks pass. Screenshots reviewed. All individual asset budgets pass; total export budget still fails (12,607 KiB / 11,719 KiB on the audited build). No commit/push/deployment. Reflection: follow the user’s existing interaction reference directly; preserve role-page access when JavaScript is unavailable. No global rule update.

## Contact moved onto homepage — 2026-10-26

Removed Contact from both desktop and mobile header menus and placed the shared form/direct contact channels after the homepage skills/education section. Kept the /contact route and sitemap entry via explicit directRoutes inclusion. ContactContent shares existing content between the homepage and contact route; DeferredContactForm loads the homepage form within 600px of its section while email/social links remain server-rendered. This avoids the initial JavaScript budget regression from eagerly mounting the form. No delivery service or credentials changed and no messages sent.

Verification: 66 unit tests, lint, production build/TypeScript pass. Four existing homepage/contact validation browser checks and two new homepage placement/form-loading checks pass on desktop/mobile; no horizontal overflow, blank-form validation focuses Name, direct email available. Export markup confirms the section follows education and no Contact appears in header navigation. Desktop screenshot reviewed. All individual JavaScript/style budgets pass; total export budget still fails at 12,627 KiB / 11,719 KiB. Two static homepage tests now use the app’s AudioProvider because the contact form depends on that context. Reflection: shared UI can bring provider dependencies into page-only tests; mirror the real layout provider, and verify initial bundle budgets when moving forms onto the homepage. No global rule update, commit, push or deployment.

## Animated Quick Portfolio View — 2026-10-26

Changed QuickViewLink from a forced immediate jump to animated in-page scrolling through the existing Lenis engine (1.6-second duration; native smooth-scroll fallback). Per-click reduced-motion detection preserves instant navigation when requested. The same document stays loaded, the hash uses pushState, destination focus uses preventScroll, and the 96px header offset remains. Modified/new-tab clicks keep native behavior. Lenis bypasses duration for immediate scroll, confirmed in the installed library source, so the redundant duration conditional was removed.

Verification: 67 unit tests, lint, production build/TypeScript and four desktop/mobile browser checks pass. Browser tests observe intermediate scroll positions, verify final header clearance and focus, retain a document sentinel across navigation, and cover reduced motion. Individual asset budgets pass; the existing total export budget remains over at 12,627 KiB / 11,719 KiB. Reflection: reduced motion hides the dust overlay, so test the visible title link in .selene-actions; inspect the actual layout before selecting alternate controls. No global-rule change, commit, push or deployment.


## Contact helper copy — 2026-10-26
Removed only the delivery-mode paragraph below “Send a note.” in shared ContactForm. No backend, provider, credentials, or submission changes. Inspected the source diff and checked the component with ESLint. Reflection: configuration details belong in developer guidance; preserve an honest email fallback when sending is unavailable. No global-rule update, commit, push or deployment.

## Web3Forms integration — 2026-10-26

Used the user-supplied public access key to wire the existing shared form directly to Web3Forms; no sample HTML required. lib/contact-delivery.ts maps the validated message to access_key, subject, name, email, company, message and botcheck, omitting internal timing metadata. An explicit custom Worker endpoint still receives its original validated payload. Success requires both HTTP acceptance and Web3Forms success=true; malformed/failed responses preserve typed fields and show an error. Existing 12-second abort, client validation, confirmation/reset, analytics event and direct email fallback remain intact. Updated configuration docs to identify Web3Forms as the default.

Verification: 71 unit tests, lint, production build/TypeScript, six desktop/mobile browser checks pass. Mocked provider tests cover exact outgoing payload, acceptance/reset, rejection/preserved fields, unreadable responses and custom-Worker compatibility. Both homepage deferred-form placement checks pass. All individual asset budgets pass; total export budget still fails (12,627 KiB / 11,719 KiB). No real email sent and inbox delivery unverified. No commit/push/deployment. Reflection: provider HTTP 200 alone does not establish success; check the provider’s response flag and test rejection without transmitting real messages. No global-rule change.

## Required contact fields — 2026-10-26

Marked Name, Email and Message explicitly required on the shared form; Company remains optional. Kept native required attributes and the existing Zod validation rather than duplicating rules. Email keeps type=email, gains inputMode=email and a you@example.com hint. Visual required badges are aria-hidden because native controls already expose the required state.

Verification: lint and production build/TypeScript pass. Six desktop/mobile browser checks pass, including empty-field errors, required attributes, malformed addresses (missing @, missing domain/TLD, duplicate @, spaces), zero provider requests for invalid fields, and successful mocked acceptance with Company blank. Updated the existing exact Email label selector to use the textbox accessible name after the label changed. No real email sent, commit, push or deployment. Reflection: native required attributes and visible required labels serve different purposes; verify both and ensure invalid data never reaches the provider. No global-rule update.

## Submit availability — 2026-10-26

User clarified that required fields must gate clicking Submit, not just trigger errors after clicking. Added live schema-based availability on form input and a subdued disabled style. The button is disabled until hydrated, all content fields pass the existing schema, and no delivery is in progress; Company stays optional. Invalid edits/clearing a field disable it immediately. Successful form reset also resets button availability; failed delivery preserves fields for retry. Existing submission validation remains as a second check. Updated tests that previously assumed blank Submit was enabled.

Verification: observed the regression fail against the old build (blank Submit was enabled), then 10 desktop/mobile browser checks pass for blank/partial/short/whitespace/invalid-email states, valid enablement without Company, re-disabling on edit/reset, provider acceptance/rejection and homepage form. 71 unit tests, lint, production build/TypeScript pass. Provider calls mocked; no real messages sent. Individual asset budgets pass; existing total export budget remains over (12,628 KiB / 11,719 KiB). Reflection: distinguish required-field validation from pre-submit button availability; use the same schema to avoid rule drift. No global-rule update, commit, push or deployment.

## Live email-format warning — 2026-10-26

Added immediate inline feedback while entering a nonempty invalid email: red error text and border, using the existing schema result. Correcting or clearing the email removes the warning; blank untouched fields remain quiet. Submit remains disabled until all required fields are valid. Email errors expose aria-invalid, aria-describedby and an error announcement. Added darker red for day theme so the warning remains readable; dark theme keeps the existing red/pink.

Verification: regression first failed on missing aria-invalid/email warning; then six desktop/mobile browser checks pass for five malformed email formats, visible red feedback, clearing after valid correction, disabled/enabled/reset behavior and mocked provider acceptance/rejection. Screenshot reviewed. 71 unit tests, lint, production build/TypeScript pass. Provider requests mocked, no real email sent. Existing total-export budget issue is outside this change. Reflection: disabling Submit needs inline feedback so users can see what to fix. No global-rule update, commit, push or deployment.


## Git ignore audit — 2026-10-26
Found missing local-environment ignore rules and two tracked macOS metadata files. Added .env* with .env.example exception, .dev.vars* with example exception, .wrangler/.vercel state, coverage/log ignores, and normalized existing generated-directory rules. Staged removal of .DS_Store and side-bar/.DS_Store using git rm --cached; local files retained. Keep app/components/lib/data, tests, lockfile, configs, public assets/résumé, licenses, workflows and governance docs in Git. The Web3Forms key is a public identifier and remains in source. Retained 65 legacy image/ assets (~73MB), including image/adobe.pdf (~31.7MiB), rather than silently deleting historical content.

Verification: git check-ignore probes pass for 20 generated/local paths and 12 intended versionable paths; diff whitespace check passes. Recognizable-secret pattern scan of tracked text found no matches (not a history audit). No product behavior changes or new application tests needed. Reflection: ignore rules do not untrack files already in the index; verify both the index and intended source exceptions. No global-rule change, commit or push.


## Light-theme contrast correction — 2026-10-27
Reproduced contrast failures on all nine initially audited routes. Root cause: day mode inherited pale accent tokens from night mode, secondary text was too light, carousel headings/captions used fixed night colors, and whole-card opacity reduced foreground/background contrast. Added a coherent day palette, stronger field/control borders, white carousel captions with darker text and opaque day cards, and an appropriate mark on the intentionally dark homepage header. Expanded checks exposed case-study project-color labels on pale surfaces and dark technical panels inheriting dark day text; corrected these with scoped text colors and local light-text tokens.

Verification: 32 axe color-contrast checks pass across 15 routes and interactive contact warning, experience dialog and HRS dialog on desktop/mobile. Screenshots reviewed. 71 unit tests, lint and production build/TypeScript pass. Individual asset budgets pass; total export remains over at 12,630 KiB / 11,719 KiB. Tests wait for body theme transitions, not all descendant transitions: awaiting every document transition stalled on continuously changing components. Reflection: a light theme needs its own semantic text/accent palette; preserve local contrast within intentionally dark surfaces, and never fade entire readable cards. No new global-rule update, commit, push or deployment.
