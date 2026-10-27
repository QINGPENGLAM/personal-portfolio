# QingPeng Lam Portfolio · Phase 10

A recruiter-friendly software engineering portfolio with an optional, explorable 3D world.

Phase 10 adds a repository evidence dashboard derived from the refreshed 2026-08-16 snapshot. Recruiters can compare primary-language distribution, latest recorded push years, and deployment reachability without mistaking repository metadata for creation dates, development duration, traffic, scale, or production maturity. All 39 public repositories now have concise GitHub descriptions, and the archive exposes 18 independently verified live pages plus two transparent unavailable Pages candidates.

The source-level review in [`docs/PUBLIC_PROJECT_CODEBASE_AUDIT_2026-08-11.md`](docs/PUBLIC_PROJECT_CODEBASE_AUDIT_2026-08-11.md) covers every repository in the 39-project public inventory, including README quality, implemented architecture, evidence gaps, correctness risks, recruiter priority, and a cleanup checklist.

## What is implemented

- Next.js App Router, React, strict TypeScript, and validated content modules
- Static export for GitHub Pages
- Recruiter-first homepage and responsive portfolio sections
- Direct routes for world, about, projects, experience, skills, contact, and résumé
- Lazy-loaded React Three Fiber world with a central AI core and seven routed landmarks
- Bounded third-person WASD movement, orbit camera, landmark focus transitions, and mobile touch controls
- Automatic, high, balanced, and performance quality modes with runtime downgrade monitoring
- Day/night scene lighting, reduced-motion support, visibility pausing, and a no-WebGL fallback
- Five-stop guided cinematic tour with direct `?tour=` URLs, browser Back support, pause/resume controls, manual reduced-motion steps, and a recruiter-safe exit
- Procedural energy waterfall, floating islands, lanterns, stepping stones, moon halo, and adaptive scenery density across quality modes
- Accessible HTML landmark navigation that mirrors every 3D destination
- Two résumé-supported project landmarks with distinct geometry and focus animation
- Shareable static case-study routes at `/projects/[slug]`
- World-preserved case-study dialogs using `/world/?project=[slug]`, browser Back, Escape, and focus trapping
- Interactive architecture diagrams with component inspection, request-flow animation, pause, restart, keyboard control, and reduced-motion behavior
- Verified metric panels, engineering decisions, testing evidence, technical breakdowns, reflection, and related-project navigation
- Client-side project filtering by evidence-backed engineering focus
- Searchable 39-repository GitHub archive with validated snapshot data, exact code links, language/activity/demo filters, 18 independently checked live pages, observed HTML titles, transparent 404 states, and no unverified demo URLs
- Accessible repository evidence dashboard with exact language counts, latest-push-year distribution, deployment ledger, proportional CSS bars, and explicit interpretation limits
- Reusable Experience and Skills evidence panels with 39 repository names, archive/dashboard navigation, and employment/proficiency interpretation boundaries
- Expandable recruiter-friendly role details with direct contributions and technologies
- Combined work, project, and education timeline with desktop horizontal layout, mobile vertical layout, type filters, and direct case-study links
- Searchable skill evidence map with connection counts, source filters, hover/focus previews, click/tap pinning, and sourced project, repository and role connections, plus a plain accessible list
- Expanded About story covering interests, working style, curiosity, and current direction without becoming an autobiography
- In-world Experience, About, Skills, and Education dossiers using `/world/?panel=[landmark]`, browser Back, Escape, and focus trapping
- Local portfolio guide that answers only from approved structured content, links to supporting sections, refuses unavailable facts, and rate-limits questions in the browser
- Optional synthesized interface sounds that are muted by default, require a user gesture, persist the preference locally, and fail closed
- World loader whose progress reflects WebGL and renderer milestones, with lightweight-map and Recruiter View exits
- Advanced procedural data-signal animation that respects reduced motion and performance mode
- Privacy-conscious event tracking for world entry, Recruiter View, projects, résumé downloads, successful contact delivery, and guide opening
- Professional contact form with accessible validation, feedback, honeypot timing, and a permanent direct-email fallback
- Web3Forms contact delivery through a public form access key, with an optional Worker-compatible backend for custom delivery
- Konami-code curiosity achievement that never blocks primary navigation
- Route-level error recovery and a JavaScript-disabled fallback note
- Dark/day theme preference with local persistence
- Reduced-motion behavior, semantic structure, skip navigation, and visible focus states
- SEO metadata, Person structured data, sitemap, and robots configuration
- Route-specific titles, descriptions, canonical URLs, Open Graph/X metadata, manifest, tailored 1200×630 social artwork, and project SoftwareSourceCode structured data
- Contact request-size limits, response security headers, client delivery timeout, hydration-safe submission, and first-invalid-field focus
- Static gzip performance budgets for the homepage, world shell, chunks, stylesheet, and complete export
- Playwright critical flows across Chromium, Firefox, mobile Chromium, and CI WebKit, plus axe-core WCAG A/AA checks
- GitHub Pages deployment gate that requires lint, TypeScript, unit tests, production build, budgets, and browser flows before release
- Documented static-hosting security boundary and production review checklist

## Local development

Requirements: Node.js 20.19+, 22.13+, or 24+ and npm 10+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), then select **Explore World**, or open [http://localhost:3000/world/](http://localhost:3000/world/) directly.

### World controls

- `WASD` or arrow keys — move
- Drag — orbit the camera
- Landmark buttons — focus a destination
- Project node buttons — focus a project, then open its case study
- `Esc` — clear landmark focus
- `H` — show or hide control help
- `R` — return to Recruiter View

Use `/world/?fallback=1` to review the accessible no-WebGL experience.

Direct case-study routes:

- `/projects/devdoctor/`
- `/projects/immich-ai-photo-search/`

## Validation

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run audit:budgets
npm run test:e2e
```

The static site is exported to `out/`.

The Playwright suite serves the completed static export, including its `/personal-portfolio` asset paths, rather than testing a hot-reload server. The local matrix runs Chromium, Firefox, and mobile Chromium. CI also runs WebKit on Ubuntu; the bundled WebKit build is not locally enabled on this macOS 14 host because that Playwright browser is frozen and protocol-incompatible. Automated axe checks run in Chromium, while the critical semantic and fallback flows run across the browser projects.

## Content architecture

Portfolio facts live in `data/` and are validated at module load with Zod:

- `profile.ts` — identity, headline, contact, and résumé path
- `experience.ts` — résumé-grounded work history
- `projects.ts` — project facts, case-study sections, architecture graphs, testing evidence, world positions, and explicit unresolved placeholders
- `education.ts` — degree, minor, date, and GPA
- `skills.ts` — grouped résumé- and project-supported skills
- `skill-repositories.json`, `skill-manifests.json`, `skill-unity-sources.json` — dated language and source evidence for the skill map
- `skill-evidence.ts` — explicit dependency and concept mappings; see `docs/SKILL_EVIDENCE.md`
- `timeline.ts` — validated chronological connections across work, projects, and education
- `world.ts` — landmark labels, routes, positions, colors, and camera framing
- `github-repositories.ts` — dated public repository metadata snapshot and exact GitHub source links
- `lib/github-insights.ts` — deterministic language, push-year, and deployment-status aggregation over the validated snapshot
- `schemas.ts` — shared runtime validation and inferred TypeScript types

Update content files instead of hardcoding portfolio facts inside UI components.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Hero plus complete Recruiter View |
| `/world` | Procedural 3D world, project dialogs, professional dossiers, custom loader, and adaptive data signals |
| `/about` | Concise introduction, interests, working style, goals, and education |
| `/projects` | Filterable selected work and technical summaries |
| `/projects/archive` | Searchable archive of all 39 public GitHub repositories and 18 verified live pages in the 2026-08-16 snapshot |
| `/projects/insights` | Repository language, latest-push-year, and deployment-evidence dashboard with interpretation boundaries |
| `/projects/devdoctor` | DevDoctor engineering case study |
| `/projects/immich-ai-photo-search` | Immich AI Photo Search engineering case study |
| `/experience` | Recruiter-friendly role detail, combined filterable timeline, and expandable 39-repository evidence index |
| `/skills` | Interactive skill-to-evidence map, accessible grouped list, and expandable 39-repository evidence index |
| `/contact` | Validated contact form, delivery status, direct links, and email fallback |
| `/resume` | Résumé preview and download |

## GitHub Pages

The workflow sets `NEXT_PUBLIC_BASE_PATH=/personal-portfolio`, builds the export, and uploads `out/`. Internal Next.js links and public résumé assets remain valid under the repository subpath. Pull requests run the quality gate without deploying; pushes to `master` deploy only after every quality job succeeds.

Workflow configuration is not proof of a live release. Verify the final public URL directly after pushing. The complete manual release steps live in `docs/PRODUCTION_CHECKLIST.md`; the hosting and response-header boundary lives in `SECURITY.md`.

The 2026-08-16 release and its archive and insight routes returned HTTP 200 HTML with the expected titles and `/personal-portfolio/_next/` assets. The deployed archive rendered all 39 descriptions, 18 verified-live badges, two unavailable badges, and no missing-description fallback. Future pushes still require direct post-deployment verification.

## Phase 5 service configuration

The static export does not execute request-time Next.js APIs. Copy `.env.example` to `.env.local` only when a deployed endpoint exists:

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT= # Optional custom Worker; defaults to Web3Forms
NEXT_PUBLIC_ANALYTICS_ENDPOINT=https://your-privacy-safe-collector.example
```

Both variables are public endpoint URLs, not secrets. The contact worker keeps `EMAIL_API_KEY`, destination email, rate-limit salt, and other private settings on the server. See `server/README.md` for its deployment contract.

When `NEXT_PUBLIC_CONTACT_ENDPOINT` is empty, the form sends to Web3Forms using the configured public form access key in `lib/contact-delivery.ts`. A custom Worker endpoint remains optional. The form requires an explicit successful provider response before showing success; network/provider failures retain the message and offer direct email. When `NEXT_PUBLIC_ANALYTICS_ENDPOINT` is empty, fixed event-name counts stay in session storage and no analytics request leaves the browser. Form content, names, email addresses, company names, questions, and message text are never analytics payloads.

The portfolio guide is intentionally a deterministic local retrieval mode. It needs no API key, makes no external AI request, and can only answer from the imported portfolio data.

## Known content placeholders

- Public repository and hosted demo URL for DevDoctor
- Approved DevDoctor screenshots and architecture diagram
- Approved Immich interface screenshots and architecture diagram
- Additional flagship projects only when future résumé or project evidence supports them

The UI lists project-specific placeholders in the Projects page so missing evidence stays visible instead of being fabricated.

## Phase status

- **Phase 1:** complete — production foundation, content architecture, recruiter view, and design system
- **Phase 2:** complete — core procedural world, navigation, controls, quality modes, and fallback
- **Phase 3:** complete — routed case studies, project landmarks, preserved-world dialogs, interactive architecture diagrams, metrics, technical breakdowns, and filtering
- **Phase 4:** complete — expanded experience/about/skills/education world landmarks, skill evidence map, and combined timeline
- **Phase 5:** complete — local portfolio guide, opt-in audio, custom loader, analytics adapter, contact form/worker contract, environmental signals, and easter egg; external service deployment remains unconfigured
- **Phase 6:** complete — performance budgets, accessibility and mobile hardening, browser matrix, SEO/social metadata, error and security review, release tests, production build, and gated GitHub Pages configuration; external service deployment remains unconfigured
- **Phase 7:** complete — guided cinematic tour, shareable tour state, reduced-motion/manual storytelling, richer adaptive procedural scenery, mobile interaction review, and regression validation; live release remains unapproved
- **Phase 8:** complete — validated 39-repository snapshot, searchable evidence archive, recruiter and Projects discovery links, archive SEO/sitemap coverage, accessibility review, and browser regression validation; live release remains unapproved
- **Phase 9:** complete — refreshed public metadata on 2026-08-16, independently checked all 20 Pages candidates, published 18 verified live-demo links with observed titles and check dates, retained 2 failed candidates as unlinked evidence, and kept availability filtering and evidence boundaries
- **Phase 10:** complete — repository evidence calculations, accessible language and latest-push-year visualizations, deployment ledger, interpretation boundaries, archive/project discovery links, metadata/sitemap coverage, and cross-browser validation; live release remains unapproved

See `ASSET_GUIDE.md` before replacing the procedural geometry with production assets.

## EECS 494 Zelda project

The dedicated `/projects/zelda-recreation/` page and project card reuse the existing portfolio components. Existing project entries remain intact.

- Zelda’s `downloadUrl` in `data/projects.ts` points to the public v1.0 `Zelda-P1-Game.zip` release asset. For future releases, update this field to the new playable ZIP URL. Never use the Unity source repository or GitHub’s automatically generated source archives.
- Both supplied gameplay screenshots are in `public/project-previews/`; Zelda’s `screenshots` array controls the hero image and Gameplay gallery.
- Remove the corresponding Zelda `placeholders` entries when those assets are supplied.
- Dates and a dated timeline entry are intentionally omitted until provided.
- After publishing and verifying the playable download, put the public portfolio URL in the course `DESIGN.txt` and share it in the course exhibition channel. This change does not publish a release or post to Discord.


### P2 Gold — 2026-10-16
Discovery complete; additive P2 card/page design awaiting review. Local combined desktop build located at Unity/P2_Roguelite/Builds/P2Build.zip. Screenshots and public P2 download URL remain pending. No product code or public deployment changed.


### P2 implementation — 2026-10-16
Approved P2 card and /projects/modular-weapon-arena/ page implemented with existing shared components and styles. Added mechanics, controls, iteration, honest Windows build status, contributions, and Unity/C# technologies. Screenshot fallback and disabled P2_GAME_DOWNLOAD_URL remain until supplied. P1 data is byte-preserved. Build, lint, TypeScript, 43 unit tests, static budgets, 45 browser tests (21 configured skips), and the isolated world test passed. Local preview: http://localhost:3102/personal-portfolio/projects/modular-weapon-arena/. No commit, upload, push, or deployment performed.


### P2 supplied build and screenshots — 2026-10-16
Connected the user-supplied public v1.0 P2Build.zip URL and copied both supplied gameplay screenshots unchanged to public/project-previews/p2-fire-gameplay.png and p2-ice-gameplay.png. Fire screenshot is the hero with factual alt text; Ice screenshot appears in Gameplay. P2 placeholders are cleared. GitHub release API lists the uploaded 105794027-byte asset, and an unauthenticated redirect-following HEAD request returned HTTP 200. This verifies download availability, not runtime correctness. Windows gameplay note is preserved. No commit, push, portfolio deployment, or external upload was performed.


## P2 live release verified — 2026-10-16
Published implementation commit c67cf24f56373b57bcaee44530cba51505c74b9c to origin/master. GitHub Actions run https://github.com/QINGPENGLAM/personal-portfolio/actions/runs/38989245850 completed quality and deploy successfully. Live page: https://qingpenglam.github.io/personal-portfolio/projects/modular-weapon-arena/ . Direct browser verification passed: project index contains P2 and P1 cards; P2 card navigation works; exact public build link is present; both supplied screenshots load; mobile width has no overflow; no page errors; P1 page returns HTTP 200 and retains its existing release download. Desktop game execution and Windows moving-and-shooting behavior remain unverified.


### 2026-10-16 — P2 footer links to P1 Gold
Added an explicit related-project target for P2. Its existing footer card now says Explore P1 Gold and opens the Zelda page. Other project navigation uses the original circular fallback. No styling or dependency changes. Production build/TypeScript, lint, 43 unit tests, and six P2/P1 checks across Chromium, Firefox and mobile Chrome passed. The added navigation assertion failed before implementation and passed afterward.


### P2-to-P1 footer published — 2026-10-16
Commit b795a20 deployed successfully through Actions run 38989654006. Live browser verification clicked Explore P1 Gold from P2’s footer and reached /projects/zelda-recreation/. Both screenshots and download links remain available; no mobile overflow or page errors.


## Homepage IA roles and vertical timeline — 2026-10-26

Added ENG 101 and SI 539 instructional assistant roles with user-supplied dates and general teaching-support descriptions. Homepage experience now uses a straight vertical line, branching nodes, and independently expandable native disclosures. Local checks: 65 unit tests, four desktop/mobile browser checks (including no JavaScript), lint, TypeScript, and build pass. Total export size budget fails at 12,624 KiB / 11,719 KiB; other budgets pass. No commit, push, or deployment.


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


### Required contact fields — 2026-10-26
Name, Email and Message now show explicit required markers; Company remains optional. Kept the existing required attributes and Zod validation, including proper email syntax checking. Added an example email placeholder and email keyboard hint. Required markers are visual only for assistive technology, which already receives the native required state. No backend or live delivery changes.


### Submit-button requirements — 2026-10-26
User clarified that Submit must be unclickable until required fields are valid. The shared contact form now derives button availability from the same schema as submission validation on every input: trimmed Name at least 2 characters, properly formatted Email, and trimmed Message 20–2,000 characters. Company remains optional. Clearing or invalidating a field immediately disables Submit; successful delivery/reset disables it again, while failed delivery retains valid input for retry. Added disabled-button styling. This supersedes the earlier submit-then-validate interaction.


### Live email warning — 2026-10-26
Contact Email now shows a red inline “Enter a valid email address.” warning and red field border while a nonempty malformed address is entered. The warning clears on correction or clearing the field; untouched empty fields stay quiet. Uses the existing schema and disabled-Submit rule, with a readable darker red in day theme and an accessible error announcement. No delivery changes.


### Repository hygiene — 2026-10-26
Keep source, content data, tests, scripts, package-lock.json, project/governance docs, deployment workflow, asset licenses and required public assets (including the résumé) in Git. Ignore local .env files (retain .env.example), Worker .dev.vars secrets, deployment state, dependencies, build/cache output, coverage, browser reports and logs. The configured Web3Forms access key is intentionally public and remains versioned. Two previously tracked .DS_Store files are staged for removal from Git only; local copies remain. Legacy image/ assets and HTML are retained pending a separate cleanup decision; ignore rules do not remove already tracked content or history. No commit/push.
