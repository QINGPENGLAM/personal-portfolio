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
- Interactive skill evidence map that connects résumé-supported skills to published projects and roles, plus a plain accessible list
- Expanded About story covering interests, working style, curiosity, and current direction without becoming an autobiography
- In-world Experience, About, Skills, and Education dossiers using `/world/?panel=[landmark]`, browser Back, Escape, and focus trapping
- Local portfolio guide that answers only from approved structured content, links to supporting sections, refuses unavailable facts, and rate-limits questions in the browser
- Optional synthesized interface sounds that are muted by default, require a user gesture, persist the preference locally, and fail closed
- World loader whose progress reflects WebGL and renderer milestones, with lightweight-map and Recruiter View exits
- Advanced procedural data-signal animation that respects reduced motion and performance mode
- Privacy-conscious event tracking for world entry, Recruiter View, projects, résumé downloads, successful contact delivery, and guide opening
- Professional contact form with accessible validation, feedback, honeypot timing, and a permanent direct-email fallback
- Separate Worker-compatible contact backend with origin restriction, server validation, hashed-IP KV rate limiting, and provider secrets
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
- `skills.ts` — grouped résumé-supported skills
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
NEXT_PUBLIC_CONTACT_ENDPOINT=https://your-contact-worker.example
NEXT_PUBLIC_ANALYTICS_ENDPOINT=https://your-privacy-safe-collector.example
```

Both variables are public endpoint URLs, not secrets. The contact worker keeps `EMAIL_API_KEY`, destination email, rate-limit salt, and other private settings on the server. See `server/README.md` for its deployment contract.

When `NEXT_PUBLIC_CONTACT_ENDPOINT` is empty, the form still validates but clearly reports local-demo mode and directs the visitor to email. When `NEXT_PUBLIC_ANALYTICS_ENDPOINT` is empty, fixed event-name counts stay in session storage and no analytics request leaves the browser. Form content, names, email addresses, company names, questions, and message text are never analytics payloads.

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
