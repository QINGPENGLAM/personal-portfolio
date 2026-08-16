# Decisions

## 2026-08-16 repository-description refresh

- Publish descriptions in GitHub's repository About metadata instead of deriving them from README prose at runtime; the portfolio remains a deterministic dated snapshot with no visitor-triggered GitHub request.
- Keep every description under 160 characters and label legacy, coursework, placeholder, tool-evaluation, and artifact-only repositories according to their inspectable scope.
- Refresh descriptions, primary language, latest recorded push date, Pages configuration, exact live URL status, and observed HTML title as separate fields.
- Promote `arthistory-RPG` from unavailable to verified only because its exact Pages URL returned HTTP 200 HTML on 2026-08-16; keep `AI-Town` and the Montage artifact repository unlinked because their exact URLs still returned 404.

## Public repository codebase audit

- Define the publishable audit boundary as the 39 currently public source repositories; do not expose or summarize authenticated private repository inventory in a public portfolio artifact.
- Treat the default-branch README and authored source as separate evidence. A README can guide inspection but cannot substitute for missing implementation.
- Keep source-derived understanding distinct from runtime certification: the audit does not claim that every historical Unity, C++, React, or static project was rebuilt in its original environment.
- Preserve course exercises and early experiments in the searchable archive while concentrating recruiter attention on five evidence-rich public projects.
- Classify `project-0007-personal-ai-workbench` as an Open WebUI evaluation and `project-0009-montage-product-video-generator` as an artifact/evidence repository until public authored implementation proves a stronger claim.
- Treat correctness and evidence repair as higher priority than cosmetic README work when promoting `myOwnRedis`, the Montage artifact repository, empty duplicates, or visibly broken controls.
- Record the 2026-08-11 public portfolio HTTP/title/Next.js check separately from the still-dated 2026-08-06 repository metadata and project live-link snapshot.
- Use the Codex project registry as the deeper internal source of truth when it exists, while continuing to judge recruiter inspectability from the public repository; local code can validate a project without silently becoming public evidence.
- Publish missing READMEs through one-file draft pull requests so historical code remains untouched and each repository description can be reviewed independently.
- Allow a direct first `main` commit only for the empty `UnityKitchenGame` repository because no base commit exists from which GitHub could create a pull request; keep that README explicitly limited to placeholder status.

## Phase 10

- Derive repository insights from the validated local snapshot with pure deterministic functions; do not introduce a charting dependency or runtime GitHub request for simple counts.
- Label year aggregation as “latest recorded push year” and explicitly state what it cannot establish, including creation date, project duration, traffic, scale, and production maturity.
- Pair every proportional CSS bar with a visible category and exact number so the evidence remains accessible without color or visual estimation.
- Keep the insights dashboard separate from the full archive: the dashboard supports scanning, while the archive remains the inspectable record behind each aggregate.
- Show deployment configuration and verified reachability as separate ledger values that reconcile to the complete repository count.

## Phase 9

- Treat `has_pages=true` as a candidate discovery signal only; publish a live-demo link only after the exact standard Pages URL returns HTTP 200 with HTML.
- Store the observed page title and check date alongside each verified live URL so archive evidence remains inspectable and searchable without claiming that a reachable deployment is the newest build.
- Preserve 404 results as `unavailable` data with a check date and visible UI status; do not silently drop failed candidates or offer dead links.
- Keep live verification in the dated static snapshot rather than adding runtime health checks, network dependencies, or visitor-triggered GitHub requests.
- Continue to treat release as separate authorization: the `personal-portfolio` public URL is reachable but still serves the earlier portfolio, and Phase 9 does not replace it.

## Phase 8

- Keep the immersive world and main Projects page curated around the two evidence-rich case studies; expose broader public work through a separate searchable archive instead of adding 39 shallow 3D landmarks or cards to the recruiter path.
- Capture public GitHub metadata in a validated, dated local snapshot so the static portfolio remains deterministic and does not depend on a client-side GitHub API request or rate limit.
- Display repository names, primary languages, activity dates, exact code URLs, and only descriptions actually published on GitHub; use an explicit missing-description state instead of generated marketing copy.
- Retain `hasPages` only as audit metadata and never convert it into a live-demo link without opening and verifying the exact deployed URL.
- Keep Phase 8 local until the user approves a release; a successful static build and release workflow are not evidence that the public site has changed.

## Phase 7

- Treat Phase 7 as the missing showpiece milestone because the supplied roadmap ends at Phase 6: complete guided storytelling and deepen the world without changing the recruiter-first content architecture.
- Keep the richer scenery procedural and quality-aware instead of adding unlicensed or unoptimized external models; performance mode omits the denser islands, path stones, and moon treatment.
- Encode the active tour stop in `?tour=` and use browser history for entry and exit so the guided experience is shareable and never traps navigation.
- Start automatic progression only after the renderer is ready, pause it when the page is hidden, and use manual steps for reduced-motion visitors.
- Keep the tour overlay as non-modal HTML over the preserved scene, hide competing world controls during the story, and retain a visible Recruiter View route.
- Keep Phase 7 within the established static bundle budgets and do not deploy merely because local release checks pass.

## Phase 6

- Preserve the static GitHub Pages export and use route-specific static metadata instead of introducing a request-time SEO service.
- Use one tailored 1200×630 social image for the portfolio and evidence-backed case-study unfurls; do not generate per-project imagery without approved source assets.
- Treat performance budgets as regression guards based on the verified production baseline: 275 KiB gzip for the homepage shell, 290 KiB for the world shell, 310 KiB for the largest JavaScript chunk, 22 KiB for the stylesheet, and 12 MB for the complete export.
- Run Chromium, Firefox, and mobile Chromium locally; add WebKit in Linux CI because this macOS 14 host receives a frozen, protocol-incompatible WebKit binary.
- Run axe WCAG A/AA checks on representative routes in Chromium and run semantic critical flows across the browser projects.
- Serve the completed static export during Playwright so browser tests validate the same subpath assets and HTML that GitHub Pages will receive, without sharing Next’s development cache.
- Isolate the GPU-backed world interaction in a fresh Chromium process after the core browser matrix because WebGL teardown can destabilize a reused headless browser process; keep both runs under the single `npm run test:e2e` release command.
- Gate GitHub Pages deployment on lint, strict TypeScript, unit tests, static build, performance budgets, and Playwright; do not describe workflow configuration as a verified live release.
- Document secure response headers as a hosting requirement because GitHub Pages cannot configure repository-level custom headers; do not ship an untested meta CSP that could break Next.js or WebGL.

## Phase 5

- Preserve `output: 'export'` and use a separate Worker-compatible contact boundary because GitHub Pages cannot execute dynamic POST route handlers.
- Keep the portfolio guide deterministic and local so it cannot invent facts, expose a key, or make the core portfolio depend on AI availability.
- Track only a fixed event vocabulary and never include form fields, questions, or other visitor content.
- Synthesize short UI tones through Web Audio after explicit opt-in instead of adding downloadable audio assets or autoplay.
- Tie loader progress to capability and renderer milestones; do not add artificial delays.
- Disable new environmental signals in performance mode and stop their motion when reduced motion is requested.

## Phase 4

- Keep Experience as the home for the combined timeline instead of adding another top-level route.
- Use résumé technologies as the exact skill-evidence join key; show a transparent empty state when no detailed portfolio evidence is published.
- Keep the existing seven category landmarks and deepen four of them with HTML dossiers rather than adding more 3D geometry.
- Preserve the world while a dossier is open, pause rendering behind the overlay, and encode the open panel in `?panel=` for history behavior.
- Do not infer related projects for work roles when the résumé does not explicitly establish that relationship.
