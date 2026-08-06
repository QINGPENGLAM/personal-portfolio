# Decisions

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
