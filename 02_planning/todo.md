# TODO

## Release review

- Review and action the ordered findings in `docs/PUBLIC_PROJECT_CODEBASE_AUDIT_2026-08-11.md`
- Resolve the Priority 0 audit findings: public evidence boundary for the Montage repository, `myOwnRedis` rehash correctness, empty/duplicate repositories, Calculator percent behavior, and n8n runtime artifacts
- Review Phase 10 using `docs/PRODUCTION_CHECKLIST.md`, including archive filters, live links, 404 states, evidence-dashboard counts, chart labels, mobile layout, and interpretation copy
- Recheck the 2026-08-16 repository and live-deployment snapshot before a future release if repository visibility, Pages configuration, descriptions, languages, or activity has changed; update the Experience and Skills evidence panels from the same snapshot
- Recheck the 2 unavailable Pages candidates before changing their unlinked status: `project-0009-montage-product-video-generator` and `AI-Town`
- For future pushes, wait for the gated GitHub Pages workflow and verify the deployed title, routes, social image, and subpath assets directly after release
- Decide whether to deploy the supplied contact worker and configure an email provider
- Decide whether an external privacy-conscious analytics collector is needed; local mode sends nothing
- Replace project placeholders only when approved screenshots, repository links, or live URLs are available

## Deferred production services

- Contact Worker hosting, KV binding, email provider credentials, and delivery verification
- Optional privacy-conscious analytics collector and endpoint verification

## Zelda portfolio entry

- [x] Add a dedicated Zelda page and matching project card using existing components.
- [x] Include all supplied contributions and technologies; exclude Unity source links.
- [x] Replace `GAME_DOWNLOAD_URL` with the verified public v1.0 playable ZIP asset URL.
- [x] Replace the labeled image placeholder with both user-supplied gameplay screenshots.
- [ ] Publish and verify the final portfolio and download; add its link to DESIGN.txt and share in the course exhibition channel.


## P2 Gold portfolio entry — 2026-10-16
- [x] Locate Unity P2 project and inspect P1 data/card/page/download patterns.
- [x] Inspect Builds/P2Build.zip: MacBuild.app and WindowBuild are present; no Assets, Packages, ProjectSettings path segments or .cs files found in the archive inventory.
- [x] Obtain approval of the bounded in-chat design before editing product code.
- [x] Add matching P2 card/page with mechanics, contributions, Unity/C#, and controls using existing components.
- [x] Add both supplied screenshots and activate the public P2Build.zip release asset URL (HTTP 200).
- [x] Run applicable build, lint, unit and route/mobile checks; preserve P1 entry and release URL.
- [ ] Verify current Windows moving-and-shooting behavior separately; archive inspection is not runtime testing.

- [x] Publish the updated portfolio and verify its deployed P2 page, both images, download destination, mobile layout, and retained P1 page.

- [x] Add the requested Explore P1 Gold footer card to P2 and verify navigation across desktop/mobile browsers.
- [x] Verify the updated P2-to-P1 footer link after deployment.


## Resume update — 2026-10-24
- [x] Replace the public resume PDF with the user-supplied newest version.
- [x] Verify byte equality and confirm existing preview/download references resolve to the same asset path.
- [ ] Publish the updated resume through the existing release workflow when requested.


## SELENE homepage preview — 2026-10-24
- [x] Discard the task-owned Monsoon reconstruction, code, assets and dependencies.
- [x] Integrate the supplied lunar layers and scroll choreography into the existing portfolio homepage.
- [x] Preserve actual profile, project content, resume and 3D world routes.
- [x] Check 390/768/1280/1920 widths, image loading, navigation, skip-to-portfolio and theme contrast.
- [x] Run unit tests, lint, production build and unchanged performance budgets; independent source review.
- [ ] User visual review of the local SELENE preview; no commit or deployment requested.


### SELENE deck follow-up — 2026-10-24
- [x] Add the scrolling project deck with actual project data, existing imagery and case-study links.
- [x] Make Explore My 3D World visible in the opening and persist in the home navigation.
- [x] Verify centered focus, neighboring-card clicks, keyboard navigation and compact phone layout.
- [x] Preserve static grid fallback and all original performance budgets.
- [ ] User visual review of the updated local preview.


### Deck correction — 2026-10-24
- [x] Replace the vertical pinned-scroll deck with direct horizontal scrolling and previous/next buttons.
- [x] Remove the lower duplicate project-card grid.
- [x] Verify horizontal arrows/scrolling, keyboard focus, responsive widths and retained recruiter details.


### Four-point usability correction — 2026-10-24
- [x] Make Quick Portfolio View a direct jump past the cinematic intro, with destination focus.
- [x] Apply a consistent font hierarchy across the portfolio UI.
- [x] Replace the mixed purple/teal UI palette with the lunar palette.
- [x] Increase world and all-projects action prominence.
- [x] Verify desktop/mobile quick jump and actual project-page navigation, tests/lint/build/budgets.


### 2026-10-24 — Cosmic background polish
Implemented the requested space atmosphere: fixed decorative star field with soft edge nebulae, gentle opacity twinkling, and star accents on dark buttons. Background is noninteractive and hidden from assistive technology; reduced motion keeps stars static. The project reel exposes the shared background. No dependencies or content changes.


2026-10-24 cosmic intensity revision: increased edge nebula opacity and spread, star brightness/size/density, and minimum twinkle visibility after user found the first pass too subtle. Production build/TypeScript passed; browser screenshot verified stronger atmosphere with readable content. Reflection: decorative contrast must be assessed against the actual dark surface; the initial effect was too restrained.


## HRS case-study draft — 2026-10-25
- [x] Build problem, interactive top-down workflow and Database/Cloud decision columns.
- [x] Add the planned AI placeholder and Projects entry link.
- [x] Verify static build, tests, lint, performance and responsive disclosure behavior.
- [ ] Refine interview wording and personal ownership with user feedback; subsequent presentation sections remain deferred.


## HRS node popups — 2026-10-25
User requested popups instead of inline dropdowns. Supersedes the native disclosure design: workflow, database and cloud nodes now open labeled native modal dialogs with a dimmed/blurred backdrop. Close button, Escape and outside-click dismiss; background scroll is locked and restored; focus stays within the popup and returns to the originating node. Small screens constrain popup height with internal scrolling and a sticky close bar. Original explanations remain available in a no-JavaScript fallback. Node layout does not expand.


## HRS motion and branch clarity — 2026-10-25
Added a 260ms fade/lift/scale popup entrance and 170ms exit, with matching backdrop fades. Close button, Escape and outside-click use the same delayed close path; modality/scroll lock remain until close. A 250ms fallback handles interrupted exit animations, timers are cleaned up, and reduced motion closes immediately without CSS animations. Larger outlined Yes/No pills now sit directly on stronger directional rails. Desktop branch spacing increased; mobile branch labels use a wider rail.

## Publication checkpoint — 2026-10-25
- [x] Verify existing homepage/HRS changes before the requested push.
- [ ] Resolve the eight Chromium color-contrast accessibility failures; deployment gate may block release.
- [x] Implement the approved skills evidence improvements after the current-change push.

## Skills evidence verification — 2026-10-25
- [x] Verify languages for all 39 archived repositories, seven manifests and three public Unity gameplay scripts.
- [x] Add missing TypeScript/Next.js/Unity skills and sourced case-study, repository and role connections.
- [x] Add connection counts, skill search, source filters and usable pointer/keyboard/touch navigation.
- [x] Verify 62 unit tests, lint, production build/TypeScript and all five budgets.
- [x] Verify 31 existing critical-flow checks and 10 final skills checks across Chromium, Firefox and mobile Chrome (13 total intentional skips).
- [x] Verify scoped explorer accessibility in light and dark themes; visually inspect desktop and mobile.
- [ ] Review and authorize publication of the new skills work if desired.
- [ ] Resolve the previously recorded site-wide contrast failures separately; scoped explorer checks now pass.


## HRS interview content revision — 2026-10-25
Updated the problem/ownership copy using the user’s account: research-institute staff spent30–60 minutes daily opening Scholar/WoS alerts, copying details and checking multiple criteria; the user designed and built the Python automation. This is a user-reported baseline, not measured time saved. Replaced checkpoint/pagination jargon with saved PostgreSQL message IDs/status and100-ID result batches using nextPageToken. Explained From-address routing, Beautiful Soup4+lxml/urllib.parse/regex parsing, ordered DOI/WoS/URL/title deduplication and distinct email-versus-paper recovery state. Removed the requested backfill, source-quality and dated-local-guard lines. The PubMed-unmatched branch now opens AI check, explicitly planned until connected.
