# Decisions

## 2026-08-16 Experience and Skills repository evidence

- Reuse one static Server Component on both routes so repository counts, live-page totals, snapshot date, and all 39 code links continue to derive from the validated archive data instead of duplicated page copy.
- Keep the complete repository-name index inside a native disclosure so the pages literally expose all 39 repositories without overwhelming the primary recruiter narrative.
- On Experience, explicitly separate personal, coursework, and evaluation repositories from employer deliverables; on Skills, state that repository metadata is discovery evidence rather than a proficiency or production-maturity score.
- Keep the full searchable archive and aggregate dashboard as the canonical inspection routes; the Experience and Skills panels are cross-navigation and compact evidence, not competing archives.

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

## 2026-09-27 — Zelda portfolio entry

- Reuse data-driven cards and `/projects/[slug]`; keep the existing projects and design intact.
- Allow project entries without an engineering case study so Zelda can show supplied facts without fabricated architecture, testing results, or reflection.
- Keep the download placeholder disabled; accept only HTTPS GitHub Release/asset URLs in this field, excluding ordinary source-repository links.
- Use labeled SVG placeholder artwork until the user supplies screenshots. Copy no Unity source, build, or debug files into the public portfolio.
- Omit Zelda from the dated timeline until dates are supplied. The timeline's explicit chronology map remains the authority.


### 2026-09-27 — Download activated

Verified the public v1.0 release through GitHub API: `Zelda-P1-Game.zip` is uploaded (122,129,672 bytes). Connected the Download Game button directly to that release asset, excluding automatic source archives. Archive contents and platform execution have not been independently verified. Screenshot files remain pending accessible copies. No portfolio push or deployment performed.


### 2026-09-27 — Gameplay screenshots added

Recovered both user attachments through the image reader after temporary-directory access failed. Replaced placeholder artwork with the two gameplay PNGs: first in the hero, second in a Gameplay section. Full frames are contained without cropping; no unconfirmed custom-level labels are assigned. Existing project content remains unchanged.


## 2026-10-16 — P2 Gold proposed scope
Continue the existing personal portfolio project; no separate product scaffold. Follow P1 card and shared /projects/[slug] presentation. Proposed P2 working title: Modular Weapon Arena Prototype. Preserve existing P1 content and download configuration. Treat supplied markdown as reference, and require explicit authorization before public upload. P2Build.zip combines both platforms but has not been run. Use the existing visual fallback if no screenshot is supplied, and extend the disabled-download sentinel handling if using P2_GAME_DOWNLOAD_URL. Product implementation awaits the brainstorming bounded-design approval gate.


## 2026-10-16 — Approved P2 implementation
User approved the bounded in-chat design. Add one project record and an optional gameplay block to existing shared presentation; no new framework, dependency or route implementation. Use the existing abstract visual fallback until supplied screenshots arrive, and disable the exact P2_GAME_DOWNLOAD_URL sentinel. Keep undated P2 out of timeline chronology. Preserve all P1 data. Keep public uploads and deployment outside this implementation; do not imply archive inventory proves runtime correctness.


### P2 supplied build and screenshots — 2026-10-16
Connected the user-supplied public v1.0 P2Build.zip URL and copied both supplied gameplay screenshots unchanged to public/project-previews/p2-fire-gameplay.png and p2-ice-gameplay.png. Fire screenshot is the hero with factual alt text; Ice screenshot appears in Gameplay. P2 placeholders are cleared. GitHub release API lists the uploaded 105794027-byte asset, and an unauthenticated redirect-following HEAD request returned HTTP 200. This verifies download availability, not runtime correctness. Windows gameplay note is preserved. No commit, push, portfolio deployment, or external upload was performed.


## 2026-10-16 — Publish P2
Proceed with the user-requested normal push to the existing origin/master deployment branch. Do not force push. Verify the workflow and deployed P2/P1 pages before claiming publication complete.


## P2 live release verified — 2026-10-16
Published implementation commit c67cf24f56373b57bcaee44530cba51505c74b9c to origin/master. GitHub Actions run https://github.com/QINGPENGLAM/personal-portfolio/actions/runs/38989245850 completed quality and deploy successfully. Live page: https://qingpenglam.github.io/personal-portfolio/projects/modular-weapon-arena/ . Direct browser verification passed: project index contains P2 and P1 cards; P2 card navigation works; exact public build link is present; both supplied screenshots load; mobile width has no overflow; no page errors; P1 page returns HTTP 200 and retains its existing release download. Desktop game execution and Windows moving-and-shooting behavior remain unverified.


### 2026-10-16 — P2 footer links to P1 Gold
Added an explicit related-project target for P2. Its existing footer card now says Explore P1 Gold and opens the Zelda page. Other project navigation uses the original circular fallback. No styling or dependency changes. Production build/TypeScript, lint, 43 unit tests, and six P2/P1 checks across Chromium, Firefox and mobile Chrome passed. The added navigation assertion failed before implementation and passed afterward.


### P2-to-P1 footer published — 2026-10-16
Commit b795a20 deployed successfully through Actions run 38989654006. Live browser verification clicked Explore P1 Gold from P2’s footer and reached /projects/zelda-recreation/. Both screenshots and download links remain available; no mobile overflow or page errors.


## 2026-10-24 — Resume asset
Use the exact user-supplied PDF without rewriting its contents and preserve the existing public filename so every preview/download entry point uses the replacement. User authorized commit and push on 2026-10-24; publish through the existing origin/master release workflow.


## 2026-10-24 — SELENE replaces Monsoon
User explicitly cancelled the Monsoon direction and supplied SELENE. Removed all task-owned Monsoon files and reverted its tracked changes before starting the replacement. Continue the existing portfolio fusion scope: personalize the opening, preserve the real portfolio below and all routes; do not add fictional lunar offerings or a waitlist. Retain Next.js and use Lenis ^1.3.11 with a single scroll loop and direct DOM style updates. Serve supplied layers and reference fonts locally; preserve base paths. Earth movement begins at progress 0.18 after dust clearance, resolving the reference's prose/check versus its earlier 0.04 source timing. Reduced motion uses a static scene and a live media-query subscription. No-JavaScript HTML shows a static introduction; visitors can skip the animated opening. Keep original static budgets unchanged. Work remains uncommitted and unpublished for user review.


### 2026-10-24 — Project deck and discoverable world
Use the original mission-log concept for real projects, directly after Earthrise. Keep the existing detailed recruiter cards as the fast-reading alternative. Pass a minimal preview DTO from the server rather than shipping full case-study content to the new client component. Use existing imagery; explicitly label DevDoctor's abstract system concept and Immich's illustration. Share the existing one-rAF scheduler. Normal reduced-motion/no-JavaScript layout is a project grid. Keyboard focus centers the selected card; pointer focus must not move a clicked card. Keep the persistent world CTA visible on mobile as a compact second-row button, retaining existing sound/theme controls. No dependency, commit or deployment changes.


### 2026-10-24 — Native left/right project deck
User clarified that the deck should scroll left/right directly and projects should not repeat below. Supersede the earlier pinned 340svh reel with native horizontal overflow and scroll snap; provide previous/next buttons and keyboard navigation. No mapping from page vertical scroll to card positions. Keep reduced-motion arrow transitions instant, preserve native horizontal access without JavaScript, and remove the now-unused pinned-deck helper. Remove only the duplicated selected-work section from RecruiterView, retaining professional summary, experience, skills and education.


### 2026-10-24 — Navigation clarity and lunar UI system
The user's four concerns authorize a UI consistency pass beyond the homepage top: global font variables and heading hierarchy, muted lunar surfaces and ivory primary actions. Keep real project imagery and the 3D scene intact. Use large labeled opening choices for immersive world versus quick essentials; keep a persistent world action and give View all projects a full-size filled button. Handle homepage quick view with an explicit immediate Lenis/native jump, 96px header clearance and destination focus, preserving native modifier clicks and base-path href fallback.


### 2026-10-24 — Cosmic background polish
Implemented the requested space atmosphere: fixed decorative star field with soft edge nebulae, gentle opacity twinkling, and star accents on dark buttons. Background is noninteractive and hidden from assistive technology; reduced motion keeps stars static. The project reel exposes the shared background. No dependencies or content changes.


2026-10-24 cosmic intensity revision: increased edge nebula opacity and spread, star brightness/size/density, and minimum twinkle visibility after user found the first pass too subtle. Production build/TypeScript passed; browser screenshot verified stronger atmosphere with readable content. Reflection: decorative contrast must be assessed against the actual dark surface; the initial effect was too restrained.


## HRS walkthrough — 2026-10-25
Use a dedicated static route with native details/summary rather than a diagram dependency. Node content stays inline and one workflow node opens at a time; Database and Cloud use independent groups for comparison. On phones deployment columns and conditional branches stack, retaining yes/no labels. Preserve the current portfolio background and no timing labels. AI remains a clearly marked planned node; no runtime model integration. Use dated deployment evidence and avoid invented ownership, metrics, costs or live operating claims. Expose the draft through Projects without adding a new 3D landmark or changing the homepage deck.


## HRS node popups — 2026-10-25
User requested popups instead of inline dropdowns. Supersedes the native disclosure design: workflow, database and cloud nodes now open labeled native modal dialogs with a dimmed/blurred backdrop. Close button, Escape and outside-click dismiss; background scroll is locked and restored; focus stays within the popup and returns to the originating node. Small screens constrain popup height with internal scrolling and a sticky close bar. Original explanations remain available in a no-JavaScript fallback. Node layout does not expand.


## HRS motion and branch clarity — 2026-10-25
Added a 260ms fade/lift/scale popup entrance and 170ms exit, with matching backdrop fades. Close button, Escape and outside-click use the same delayed close path; modality/scroll lock remain until close. A 250ms fallback handles interrupted exit animations, timers are cleaned up, and reduced motion closes immediately without CSS animations. Larger outlined Yes/No pills now sit directly on stronger directional rails. Desktop branch spacing increased; mobile branch labels use a wider rail.

## Publication order — 2026-10-25
Commit and push the existing homepage/HRS work first, as explicitly requested. Record current accessibility failures without mixing new skills work into this checkpoint. A push does not establish a successful Pages release.

## Skills evidence sources and interaction — 2026-10-25
Use a static 2026-10-25 language snapshot for the 39 repositories already in the archive; do not change the archive/deployment snapshot or fetch GitHub at visitor time. Explicit inspected manifests and public gameplay scripts support framework/Unity connections. Case-study descriptions support explicitly curated concepts. Keep missing evidence visible rather than infer React from JavaScript or imply ownership/proficiency from byte totals. A case study and its linked repository count once. HRS uses its existing dedicated workflow route without a new world landmark.

Keep hover alive across the entire explorer so result links stay clickable. Pointer and keyboard previews are separate; later keyboard focus clears stale pointer preview. Enter/Space pinning transfers focus to evidence so Tab can reach the selected project's links. Mobile selection scrolls to the panel and offers a return-to-skills control. Use scoped styles for contrast fixes; existing global day-theme contrast work stays separate. User authorization to push applied to the prior checkpoint; the new skills work stays local for review.


## HRS interview content revision — 2026-10-25
Updated the problem/ownership copy using the user’s account: research-institute staff spent30–60 minutes daily opening Scholar/WoS alerts, copying details and checking multiple criteria; the user designed and built the Python automation. This is a user-reported baseline, not measured time saved. Replaced checkpoint/pagination jargon with saved PostgreSQL message IDs/status and100-ID result batches using nextPageToken. Explained From-address routing, Beautiful Soup4+lxml/urllib.parse/regex parsing, ordered DOI/WoS/URL/title deduplication and distinct email-versus-paper recovery state. Removed the requested backfill, source-quality and dated-local-guard lines. The PubMed-unmatched branch now opens AI check, explicitly planned until connected.


## HRS homepage card — 2026-10-26

Keep the new card local to app/page.tsx and reuse ProjectReel routing/style. The dedicated HRS route already exists outside the general project dataset; avoid adding a second generic detail definition or a world landmark merely to expose its homepage link.


## Interview About Me — 2026-10-26

Condense the supplied spoken introduction into education plus four scannable talking points instead of duplicating the full speech. Preserve user-stated claims without adding metrics or internship details. Use a server-rendered AboutMe component and scoped CSS module; retain homepage hero/project order around the new section. Copy the original portrait exactly, crop only through CSS object-fit and use withBasePath for Pages compatibility. Do not alter global theme rules; override colors within this section for day mode.


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

Use one left-side rail with nodes/branches and independent native details/summary disclosures on desktop and mobile. Preserve the supplied ENG 101 spelling and role dates. Descriptions stay at general course-support level; omit unsupported metrics, tools, and empty detail headings. Permit empty outcomes/technologies for teaching roles. Existing engineering facts and the combined timeline layout are preserved. No commit, push, deployment, or budget-threshold increase.


## Centered experience rail — 2026-10-26

User clarified the line belongs in the middle. Centered the desktop rail and alternated role cards left/right with branches joining each node. Narrow screens retain a left rail so descriptions and expanded details remain readable. Native disclosure behavior and role content are preserved. Supersedes the earlier desktop left-rail decision. Reflection: confirm the spine placement from layout references; no global-rule change. No commit, push, or deployment.


### Content-sized timeline cards — 2026-10-26
User requested content-sized alternating cards. Cards now use intrinsic width with a 28rem maximum, stay within their available column, and align toward the center rail. Height follows each card’s content and expansion. Reflection: timeline columns define placement, not a required card width. No commit/push/deployment.


### Experience popups — 2026-10-26
Homepage role cards now open native modal dialogs using the HRS workflow popup styles and lifecycle pattern: animated entrance/exit, blurred backdrop, sticky close bar, Escape/outside-click dismissal, focus containment/return, scroll locking, and reduced-motion support. Centered alternating content-sized cards stay in place. No-JavaScript users can follow a direct full-role link. Supersedes homepage inline expansion; existing full experience page remains intact. No commit/push/deployment.


### Homepage contact placement — 2026-10-26
Removed Contact from the desktop/mobile header menus. Added Contact after the homepage skills and education section, sharing the existing form and direct-contact links with the retained /contact route. The homepage loads the form when the contact section approaches the viewport to contain initial JavaScript cost; direct contact links render immediately. No sending service, form-delivery configuration, commit, push, or deployment changes.


### Animated Quick Portfolio View — 2026-10-26
Quick Portfolio View now animates the existing in-page scroll with Lenis (native smooth-scroll fallback), preserving the same document and 96px header clearance. Keyboard focus reaches the destination; reduced-motion users retain the instant jump. Hash navigation and modified-click behavior remain intact. Supersedes the previous forced instant jump. No commit/push/deployment.


### Contact helper copy — 2026-10-26
Removed the form-heading delivery-mode line at the user’s request. Submission behavior and the existing no-endpoint email fallback are unchanged; delivery is not configured by this copy change.


### Web3Forms contact delivery — 2026-10-26
Connected the user-supplied public Web3Forms access key to the shared contact form. No sample HTML needed. Empty NEXT_PUBLIC_CONTACT_ENDPOINT now selects Web3Forms; explicit custom Worker overrides still work. Only name/email/company/message, subject, public key and botcheck are submitted. Existing validation, timeout, success reset, failure preservation, and email fallback remain. Provider success must be true before claiming acceptance. Tests intercept provider requests; inbox receipt is not verified and no live test email is sent. No commit/push/deployment.


### Required contact fields — 2026-10-26
Name, Email and Message now show explicit required markers; Company remains optional. Kept the existing required attributes and Zod validation, including proper email syntax checking. Added an example email placeholder and email keyboard hint. Required markers are visual only for assistive technology, which already receives the native required state. No backend or live delivery changes.


### Submit-button requirements — 2026-10-26
User clarified that Submit must be unclickable until required fields are valid. The shared contact form now derives button availability from the same schema as submission validation on every input: trimmed Name at least 2 characters, properly formatted Email, and trimmed Message 20–2,000 characters. Company remains optional. Clearing or invalidating a field immediately disables Submit; successful delivery/reset disables it again, while failed delivery retains valid input for retry. Added disabled-button styling. This supersedes the earlier submit-then-validate interaction.


### Live email warning — 2026-10-26
Contact Email now shows a red inline “Enter a valid email address.” warning and red field border while a nonempty malformed address is entered. The warning clears on correction or clearing the field; untouched empty fields stay quiet. Uses the existing schema and disabled-Submit rule, with a readable darker red in day theme and an accessible error announcement. No delivery changes.


### Repository hygiene — 2026-10-26
Keep source, content data, tests, scripts, package-lock.json, project/governance docs, deployment workflow, asset licenses and required public assets (including the résumé) in Git. Ignore local .env files (retain .env.example), Worker .dev.vars secrets, deployment state, dependencies, build/cache output, coverage, browser reports and logs. The configured Web3Forms access key is intentionally public and remains versioned. Two previously tracked .DS_Store files are staged for removal from Git only; local copies remain. Legacy image/ assets and HTML are retained pending a separate cleanup decision; ignore rules do not remove already tracked content or history. No commit/push.


## Light-theme palette — 2026-10-27
Use dark blue/green accent text on light surfaces, darker secondary text and stronger control borders. Project-deck captions use opaque light cards and content-appropriate text colors; override inline opacity only in day mode so carousel positioning/movement remain intact. Preserve pale text variables within intentionally dark technical panels rather than applying dark text universally. Case-study metric/section labels use the light-theme accent independently of bright decorative project colors. No layout or night-theme changes.


### Carousel callback lifecycle — 2026-10-27
Fixed the reported ProjectReel barRef.current.style null-reference crash. The scroll/resize effect captures the mounted progress-bar node and ignores updates once disposed or when the track/bar refs detach or are replaced. Cleanup marks the effect disposed before removing listeners/disconnecting its observer. Layout and carousel behavior remain intact; this handles late observer callbacks during navigation or component replacement. No commit/push/deployment.


## Shared queue before AI output — 2026-10-27

User identified a misleading terminal-looking PubMed-unmatched branch. Verified
actual HRS run_intake order:save active candidates, optional PubMed rechecks,
run_configured_ai_stage, then CSV/Sheet outputs. Changed chart/data only:rename
unmatched branch to Save unmatched candidate, add explicit continuation link to
a new full-width Shared active review queue, and put AI/output below this common
queue. Popup names both ready_for_manual_entry and needs_non_pubmed_review.
Clarified AI selects eligible/due candidates from both paths and earlier runs,
not every paper/every run; disabled/default, source, batch/time/cost limits and
manual control retained. No pipeline/business code, credentials or cloud changes.
Checks:8 existing HRS/homepage tests passed, scoped ESLint/TypeScript exit0;
browser confirms branch anchor, both statuses,queue→AI→output order and no
horizontal overflow at1440px/390px. No commit,push,deployment.
Reflection:an intermediate persisted queue must look like a joining stage rather
than a terminal human-review exit when a later shared stage can process it.


## Candidate metadata label — 2026-10-27

Renamed Prepare review details to Prepare candidate metadata after checking
candidate_processor.process_candidate and ai_screening._run_one. The matched
path still assembles identifiers, publication metadata and leadership context.
Clarified that saved identity supports later AI source lookup as well as human
review, while actual model evidence is separately fetched/verified/prepared
inside the optional AI stage. No new chart step, layout or business-code change.
Reflection:distinguish identity/metadata from the text evidence supplied to a model.


## Intended required AI stage — 2026-10-27

User explicitly chose chart-only changes, with AI required before Sheet output
in the intended workflow. User chose export rather than hold when screening
cannot finish:show “AI incomplete—manual review needed”. Updated workflow
node captions/shared queue/popup/output copy to express a required stage, not a
requirement that every candidate obtain a successful classification. A still-current
AI result can be reused. Preserved evidence, permission and human control limits.
Added visible implementation note:current runtime remains opt-in and does not
yet enforce this policy/exact fallback label. Historical functional-results
paragraphs continue to describe actual implemented behavior. No Python/runtime,
configuration, key, live-data or cloud/deployment change.
Verification:8 existing HRS/homepage tests pass with updated intent/current-state
assertions; scoped ESLint and TypeScript pass. Browser confirms required visible
caption, explicit incomplete fallback, implementation note, shared queue→AI→output
order and no horizontal overflow at1440px/390px. QA locator was narrowed from
duplicate node/popup caption to the visible AI button before the successful rerun.
Reflection:a required attempt/stage differs from guaranteed successful screening;
keep intended policy distinguishable from currently enforced runtime behavior.


## Pages failure diagnosis and repair — 2026-10-27

Inspected GitHub Actions run40538962089 for pushed commit7f85bd9. Quality
failed at static budgets; build/unit/lint/typecheck passed and deploy was skipped.
Reproduced homepage JS281658>281600bytes and export12651>11719KiB.
Optimized same-dimension portrait PNG1.76MB→JPEG126871bytes, kept original
Downloads image. Lazy-load local portfolio answer data with pending guard/status
and failure fallback; suggested-question compatibility export retained. No budget
threshold or workflow gate changes.
Full CI-style validation exposed existing cross-browser issues:theme transition
sampling, tiny Firefox geometry rounding, Safari focus return and fractional
scroll quantization. Apply saved/OS theme before first paint; keep audits enabled
and wait for settled fonts/theme; tolerate only0.05px box rounding; explicitly
restore opener focus and round scroll destination. Platform-equivalent Option-Tab
in macOS WebKit tests does not alter Linux Tab behavior or system settings.
Final:71 unit tests,full lint,TypeScript,Pages-base-path build and all5 budgets
pass (home260/275KiB,total11097/11719KiB). Full CI browser core182 passed/42
intentional skips plus fresh-world1 passed,exit0,no retries. New async-load failure
regression was red before the fix; final success/failure checks pass across engines.
Generated next-env.d.ts restored toHEAD; no dependency version change.
Read-only independent review covered assistant loading; focused WebKit diagnosis
and18-pass/5-skip probe covered platform fixes. Details:docs/Pages_Deployment_Fix_2026-10-27.md.
No commit,push,remote rerun or deployment. User can review and publish via GitHub
Desktop; live deployment remains unverified until a subsequent successful run.
Reflection:run the actual deployment gates,not only focused feature tests; log
exact bytes when rounded numbers hide small budget excess. Apply theme before
paint and compare equivalent keyboard navigation across platforms. Existing
verification principles cover this; no new global rule proposed.


## Shared-queue label typography — 2026-10-27

Matched Continue to shared queue and Both candidate paths join here to var(--font-sans),12px captions. Browser computed styles confirm all three label/caption families and sizes match. No pipeline or metadata-flow change. Reviewed process_candidate and AI _fetch_metadata/_run_one:email intake already captures title/URL; matched preparation enriches identity/authors/journal/leadership; AI-stage program separately verifies identity and fetches/extracts text before the model. Metadata is needed, although a separate diagram box is a presentation choice. Reflection:no new global rule.


## Combined candidate preparation/queue — 2026-10-27

Combined the high-level metadata and shared-queue boxes into Prepare and queue candidates. Removed the unused standalone authors node definition; retained metadata, source-link, PubMed enrichment and leadership explanation in the shared queue popup. AI text extraction remains a separate responsibility and the intended required-stage/implementation boundary is unchanged. Browser confirms old node absent and combined popup complete;5 HRS tests,scoped lint and TypeScript pass. No pipeline change,commit,push or deployment. Reflection:combine presentation steps that do not need separate discussion while retaining their implementation distinction.


## AI popup copy trim — 2026-10-27

Removed the exact user-selected required-stage/opt-in/cloud-status passage from the AI popup. Separate implementation note below the chart remains. Updated wording assertions;5 HRS tests pass. No behavior or deployment change. Reflection:no new rule.


## AI-assisted section:implementation and evaluation — 2026-10-27

Presentation update complete. Kept ChatGPT design refinement and Codex incremental implementation as stage1; replaced harness/WoS cards with stage2 fresh-context review, human findings triage, a3-round pause/rethink rule and prompt refinement. Included SQLite-to-PostgreSQL acceptance example and harmless style versus real syntax/SQL failures. Linked the original Claude Code review article. User explicitly said broader workflow implementation is future work; page content completion is not completion of an automated general review engine. Actual parser harness remains unchanged and narrower.71 units,scoped lint,TypeScript,Pages build,all5 budgets (home260KiB,total11107KiB),and two-stage/six-card desktop/mobile browser checks pass. Existing presentation regression was red before rewrite,green after. No commit,push or deployment. Reflection:separate communication of a method from evidence that its automation exists.


## Results and personal reflections — 2026-10-27

Refocused Results and Lessons into4 cards:delivered review workflow;structuring AI assistance with explicit scope/context/checks;user-reported cloud complexity;what to plan earlier next time. Detailed model-quality findings remain in the AI section;closing retains a brief no-measured-impact note and current AI rollout boundary. Supplied a corresponding talk track in the HRS repo.71 units,scoped lint,TypeScript,Pages production build,all5 budgets(home260KiB,total11110KiB),and desktop/mobile4-card layout checks passed. No runtime or deployment changes. Reflection:closing interview material should explain personal learning and next-time decisions,while keeping technical evidence available for follow-up.


## Engineering considerations — 2026-10-28

Added chapter 05 after AI-assisted development using the existing two-column card grid and HrsNode detail dialogs; Results and Lessons is now chapter 06. Six conditional scenarios cover data growth, backlog, API failures, interrupted runs, concurrent Sheet edits and AI cost/quality. Each explains a concern, possible response and tradeoff without claiming a production incident or a runtime implementation change. Validation: 71 unit tests, scoped ESLint, production build with TypeScript and all five size budgets passed. Chromium checks at 1440px and 390px opened/closed all six dialogs, confirmed tradeoff content and found no horizontal overflow. No commit, push or deployment.


## Optional engineering discussion — 2026-10-28

Restored the original five main chapters and Results + lessons as chapter 05. Moved engineering considerations after Results, labeled Optional, and removed it from main chapter navigation. Six scenario cards and their details remain unchanged. Reflection: optional interview follow-up material belongs after the main narrative.


## Workflow footer copy removal — 2026-10-29

Removed the exact user-selected workflow footer about intended AI policy and current opt-in behavior. Updated its presentation assertion. This is a copy-only change; pipeline behavior is unchanged. Reflection: keep requested copy edits bounded.


## Cloud presentation order — 2026-10-29

Reordered the existing deployment cards to follow the supplied talk track: SQLite/JSONL migration and persistent state, cloud overview, Scheduler, Run Job, Cloud SQL, identity/secrets, monitoring, then both tradeoff cards in a final shared block. Preserved card details and two-column styling. Five focused tests, scoped ESLint, diff whitespace checks and an explicit card-order check passed. Reflection: presentation order should support the speaker’s narrative; no runtime change or new global rule.


## Cloud footer copy removal — 2026-10-29

Removed the exact user-selected dated deployment-record footer below the cloud section. Card details and runtime behavior are unchanged. Reflection: keep requested copy removal limited to the selected line.


## AI reference copy trim — 2026-10-29

Removed the selected sentence about adapting review principles; retained the reading-reference link. Reflection: keep copy edits scoped to the requested sentence.


## Inline cloud tradeoffs — 2026-10-29

Returned each tradeoff card to the end of its existing Database or Google Cloud column; removed the separate C / Trade-offs block. Kept the script-aligned card order and popup content. Reflection: preserve the requested two-column grouping when reordering content.


## Results copy trim — 2026-10-29

Removed the selected newer-local-AI validation sentence from What the project delivers; retained the base pipeline cloud-execution statement. Updated the related assertion. Reflection: keep sentence removals narrowly scoped.


## Results footer removal — 2026-10-29

Removed the exact selected footer below Results and updated its assertion. Reflection: keep copy changes limited to the requested text.


## Cleanup boundary — 2026-11-01

The user's unused/duplicate-code cleanup request resolves the previously deferred
legacy-code cleanup: remove root HTML, CSS, and sidebar JS because deployment
uploads only Next.js out/ and no active source references those files. Preserve
original image/ media and public assets. Delete only proven-unused app code;
retain Next.js convention exports and the documented optional Worker. Use
portfolioSkills directly rather than maintaining the obsolete resumeSkills alias;
assistant suggestions remain in their dedicated lightweight data module. No
feature redesign, dependency change, commit, push, or publication.


## Tracking and audio boundary — 2026-11-01
Keep source, current public assets, and existing tracked documents unchanged while
clarifying the user's desired GitHub exclusions. Added only local editor/agent/
cloud-state and temporary-file ignore rules. Do not treat .gitignore as removing
already tracked content. The audio button currently means interface sound; the
user expected background music, but no track or music implementation is selected.


## Original media retention and reuse — 2026-11-01
User explicitly selected ignoring old images and retaining notes. Untrack image/
with git rm --cached only; preserve all local bytes. Selected public-facing copies
will belong in public/project-previews/archive/ if the archive-card design is
approved. Source mapping is based on visual inspection plus historical HTML,
not filenames alone. Label artwork separately from game screens. The music
question means looping background music; explain user-initiated looping and
controls, with a music file still needed. Do not add a fabricated soundtrack.


## Approved archive preview implementation — 2026-11-01
User selected current portfolio cards rather than separate project websites.
Keep curated preview metadata in data/repository-previews.ts, separate from the
dated GitHub snapshot. Publish seven compressed WebP copies under public/;
use Next Image with existing unoptimized static-export config, base paths and
contain sizing. Use artwork labels for Calculator/food-ordering-/topicshare/
Tic-Tac-Toe and historical screen labels for the three Unity projects. Existing
text-only cards remain unchanged. No music, dependency or remote repo changes.


## Selected-track integration and media budgets — 2026-11-01
The user's downloaded MP3 selects the background track. Self-host the full
7,108,608-byte file under public/audio/ and keep the Downloads original untouched.
Use HTML audio for music independently of optional Web Audio effects. Default
off on document load; no enabled-preference auto-resume. Create src only on a
user click, loop, use20% default volume, allow pause/cancel and volume changes,
and let root-layout context preserve the player across client-side navigation.
A request generation guard prevents late canceled promises from enabling music.

The selected music is6.8MiB, beyond the prior complete-export headroom. Retain
12,000,000 bytes for every other static file and all JS/CSS limits; give only the
exact MP3 path7,200,000 bytes and also enforce19,200,000 bytes combined. Regression
tests reject excess core/media sizes. The local preview server needs MIME,
Content-Length and single byte-range responses for reliable seeking/duration.
No dependency change, external music host, source mutation, commit or push.


## Revised music defaults and transient controls — 2026-11-01
The user's latest request supersedes default-off/no-prefetch behavior: try playback
after mount. A NotAllowedError is expected browser policy, not a broken file;
wait for an eligible click/key outside audio controls. Manual play/pause/cancel
turns off automatic fallback. Keep async request generations and clean listeners
on unmount. Other playback errors remain retryable. Browser policy cannot be
bypassed by setting a UI preference.

Remove the visible source link; keep public/audio/CREDITS.txt. Fade the panel
after3 seconds of inactivity, leaving it visible while hovered or focused inside.
Hidden controls are inert. A separate small24px volume opener preserves the
main button's pause semantics and allows touch users to reopen without stopping
music. It does not change header layout width. No unrelated changes or publication.


## Pages CI audio environment — 2026-11-01
Repair the CI runtime rather than mute/mock/skip native audio tests. Start
PulseAudio with a named null output before the unchanged browser gate. Wait for
actual guide interactivity instead of networkidle; retain a pending-media
regression. Compare volume to four decimals, well below the1%UI step, because
Linux audio backends quantize it. Reopen the auto-hidden panel before adjusting
volume. Use disposable Linux testing only; Docker is not part of the website or
Pages architecture. Preserve existing browser matrix, limits and deployment gate.
No commit/push or remote rerun requested; user retains GitHub Desktop publication.

## Optional RAG implementation — 2026-11-01
Use the user-approved independent Cloudflare Worker and OpenRouter free route;
leave agentic code and secrets untouched. No endpoint means the existing local
guide; AI errors/limits cause labeled local fallback. Only openrouter/free or
vendor/model:free is accepted; deny data collection, require requested provider
parameters and disable provider fallbacks. No live inference or deployment yet.

Retrieve only explicit public fields, not internal notes or repository files.
V1 is lexical retrieval with bilingual/topic aliases, six chunks/8000 characters,
not embeddings. Mark published future-work fields and intended HRS AI nodes
proposed. Include labels for GPA/contact and use /about#education as the actual
education source. Resolve citations on the server and render escaped text.

The single global SQLite DO owns the reservation clock and atomic persistent
counters. Caller timestamps are ignored; delayed alarms cannot erase today's
counts; backward clock movement fails closed. Ten attempts/day, three/minute/hash,
600 output tokens,20-second upstream deadline, failed attempts counted, no retry.
Current-day counters/hashes only; midnight alarm clears old data. Pin compatibility
date2026-10-30 to the verified Wrangler4.156.0 runtime. Keep deployment and private
secret configuration separate from offline verification. No commit/push requested.

### RAG live setup and offline CI — 2026-11-01
User's successful manual deployment/secret setup authorizes continuation of the
same bounded backend integration. Keep real endpoint out of the broad regression
build; create configured release afterward, intercept every AI request during its
browser gate, and recheck budgets before upload. No CI calls to live model.

Investigate real failures via safe stage/status diagnostics, never raw provider
error messages, key inspection or chat logs. Three live inference attempts maximum
in this setup pass; failed attempts retain reservations. A public-catalog-verified
free Liquid pin also failed and was reverted to approved openrouter/free. Do not
relax data_collection:deny or enable paid routes to bypass failures. Next evidence
needed: user's private OpenRouter Activity error explanation/account eligibility.

### RAG account diagnostics — 2026-11-01
Use safe static upstream-error categories, never return raw provider messages or
metadata. Activity summary screenshots cannot attribute portfolio cost or expose
rejections. Latest upstream429 requires checking actual allowance privately via
GET /api/v1/key; do not assume daily exhaustion from total request count. Stop
additional inference attempts until quota evidence is available. No paid upgrade
or implicit relaxation of data_collection:deny.

### RAG bounded live evaluation — 2026-11-01
User's private allowance check shows50/50 remaining before current samples; do
not diagnose daily exhaustion from429 alone. Keep default free router and strict
privacy. Numeric rate headers/known error types may be returned for diagnosis;
raw provider strings never leave the Worker. After7 total agent attempts with1
verified English success and6 failures, stop live calls now rather than exhaust
all10 pilot slots. Record Chinese/proposed-status/adversarial quality as pending,
and retain local fallback for free-provider throttling/unavailability.

### RAG release evidence — 2026-11-01
Treat Actions success plus served endpoint-containing assets as publication proof;
CI mocked interaction and prior real-English inference are separate evidence.
Do not spend remaining pilot calls just to re-prove deployment. Record the existing
mobile contact test retry honestly; no unrelated form changes in this release
verification. Retain pending Chinese/adversarial free-model evaluation. Keep this
verification note local; no additional commit/push authorized by status checking.

### Online fallback remediation — 2026-11-01
Do not identify all fallback as site quota: actual repro was upstream429. Expose
only validated day/minute/retry details from DO; retain atomic cap10/day and3/min,
failed attempts counted, no resets/refunds/retries. Map safe error codes to
specific local notices and separate notice typography from the GUIDE label.
Ambiguous year question may state expected graduation, but cannot invent class
year or birth year. Add source aliases and local public-fact answer.

One pinned free Xing/Phala success does not establish stability; Chinese output
validation and429 still failed. Stop further OpenRouter trial churn. A change to
Cloudflare-hosted inference changes the processing service and original approved
provider design, so ask user choice before implementing/binding/calling it. Keep
Workers Free, all existing safeguards and source checks; do not relax privacy or
upgrade account. Proposed design is in the dated Cloudflare AI spec.

### Retain OpenRouter — 2026-11-01
User explicitly selected '保留 OpenRouter 免费模型'. Do not implement or resume the
Cloudflare Workers AI alternative without a new user request. Preserve existing
xingchen-agi/xing4.0-29b-a4b:free configuration, data_collection:deny, source/output
validation, no paid fallback and website-wide10-attempt/UTC-day cap (failures count).
Keep the completed client error/typography/education fixes; they need a frontend
publication to appear online. Stop provider-switch proposals and additional live
trial calls in this decision pass; external availability remains an honest limit.

### Local questionnaire expansion — 2026-11-01
Use existing deterministic guide/public data as the requested low-risk expansion;
no provider, hosting or AI behavior change. Add25 common prompts with a bounded
native scroll area and a reopen/hide button. Keep API logic/rate controls intact.
Specific project/company matches precede broad intents; reuse public data fields,
source links and skill evidence rather than duplicating project facts. Prepared
Chinese summaries cover key personal/HRS-status facts; published English excerpts
remain original elsewhere. Unknown personal/recruiting details remain unavailable.
No new current-year, proficiency or deployed-AI claims. Avoid substring matches
that mistake JavaScript for Java, capital for API or internet for intern.

### Reply presentation — 2026-11-01
Treat the user's requested thinking/chunk effect as client presentation of existing
static or validated AI text. Keep local labels and disclosures honest. Use550ms
minimum preparation including existing network wait, then word-boundary chunks
at40ms. Do not change provider protocol to streaming or add model calls. Hide
links until completion; cancel removes partial content and clears timers/listeners.
Respect reduced motion with immediate full text and no animated dots; defer live
region announcements with aria-busy. Follow scroll only while near the latest
message, resuming on a new question. No account/quota or content changes.

### Chat panel lifecycle animation — 2026-11-01
Use native CSS keyframes rather than a new animation dependency. Opening240ms,
closing180ms; maintain a separate closing phase so DOM is not removed before the
exit can paint. Keep exiting controls inert/aria-hidden and ignore descendant/
entry animation events. Finish on the panel's exit event or260ms watchdog, clearing
it to prevent stale timers from closing a reopened panel. Repeated Escape is a
no-op during exit. Preserve draft/history and return focus after removal. Reduced
motion skips both effects and exit delay. Preserve existing pending reply behavior
on panel close; component unmount still aborts/cleans both lifecycles.

### Deterministic cancellation test — 2026-11-02
Control the presentation clock in the cancellation fixture after panel entrance finishes. Keep preparation pending until the normal Cancel click executes; then advance time for the next answer. Do not force-click, increase user-visible delay, skip WebKit or loosen the deployment gate.


### Accessibility rules and carousel contrast — 2026-11-11
Keep carousel captions and links fully opaque; apply distance fading only to
images. Remove the now-redundant day-theme opacity override. Keep image alt text
as the case-study preview's accessible description instead of labeling a generic
wrapper. Use a plain styled container for the guide heading so it cannot become
a second page banner. Use the existing readable secondary color for chat status
text and wait for finite entrance animations before contrast measurement.
Audit all default axe rules in both themes and desktop/
mobile layouts, plus interactive states; retain selector-level diagnostics.


### Public Hackathon 2 source copy — 2026-11-11
User confirmed public source visibility and clarified the original is a private
course-invitation repository. Leave that repository untouched; publish a fresh
standalone snapshot of the user's application under personal-ai-assistant-platform.
Use a tracked-path allowlist for backend/frontend/agent/scripts, lockfiles and
build/config files. Exclude slides, staff instructions/reference docs, internal
records, Git history and runtime data. New README/preview/ignore rules are the
only public-copy packaging changes; application files match byte-for-byte.
Use the normal portfolio project/case-study pipeline and the verified November
2026 milestone. A single-month project timeline defaults its end to its start.
Label the screenshot as simulated local UI; preserve the distinction between
simulated checks, historical manual acceptance and incomplete full-real automation.
Do not advertise a public app deployment. Keep portfolio changes local: only the
separate source repository push was explicitly requested.


### Compact intro choices — 2026-11-11
After the user requested an even smaller size, hide the extra intro labels and
descriptions. Use 13px titles, 44px minimum height, a 420px desktop pair and
240px stacked mobile controls. Preserve destinations and keyboard focus.


### Content-independent keyboard regression — 2026-11-11
Test each filter tab stop, then the first evidence link, rather than assuming a
particular repository remains first after case studies are added. Keep explicit
repository visibility assertions. Do not skip the test or weaken the quality gate.


### Course project source boundaries — 2026-11-13
Both requested projects are course-derived, despite general-purpose elements. Hackathon 1 README explicitly supplies Taskr storage/calendar/CLI/model-call plumbing. Agentic README identifies tutorials and PROJECT.md records Project 2 extending them. Read project2 through git show because the current branch is llmVec; do not switch or modify the original checkout. User approved description-only cards/pages. Keep githubUrl/liveDemoUrl null and omit downloads/source copies. Keep Hackathon 1.5 outside the Hackathon 1 entry and do not claim current AWS/device acceptance. Use existing visual fallbacks and omit timeline additions rather than invent dated milestones.
Non-music static export exceeded the 12 MB allowance by approximately 70 KiB after adding two routes. Increase only that content allowance to 12.1 MB; all runtime JavaScript, CSS, media and total export limits stay unchanged. Actual non-music export is approximately 11,788 KiB. No publication requested.


### Publication preflight correction — 2026-11-13
User authorized commit and push. Fresh full units caught the budget fixture left at the old cap after the previous content change; the earlier passing unit run predated that budget edit. GitHub Pages basePath export adds URL bytes and exceeded both export caps. Set non-music content to 12.2 MB and complete export to 19.4 MB (the 7.2 MB music allowance is unchanged), and update the boundary fixture with an at-limit acceptance check. JavaScript/CSS caps unchanged. Verify the actual Pages-path build before publication. Reflection: after modifying a verification script, rerun its own tests and use release build configuration before reporting completion.
