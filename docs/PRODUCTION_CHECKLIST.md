# Production review checklist

## Content and navigation

- Confirm every top-level route loads directly and through the site navigation.
- Confirm project, résumé, GitHub, LinkedIn, email, and any live-demo URLs are current.
- Confirm unresolved project placeholders remain visibly marked instead of filled with assumptions.
- Open `/projects/archive`, search by repository and observed live-page title, filter at least two languages, filter verified demos/code-only, change sort order, and confirm the visible count updates.
- Confirm all archive code links use the intended `QINGPENGLAM` repository URL and all 39 GitHub descriptions are visible.
- Confirm the verified-live filter shows 18 repositories and every live button carries a 2026-08-16 check date.
- Confirm the 2 configured candidates that returned 404 are visibly labeled and have no live button.
- Do not publish a future live-demo link from `has_pages=true`; open and verify the exact public URL first.
- Open `/projects/insights` and confirm the four deployment totals reconcile to 39 repositories.
- Confirm every language and latest-push-year bar includes an exact text count and remains understandable without color.
- Confirm the dashboard states that latest push year is not creation date, development duration, traffic, scale, or production maturity.
- Open `/experience` and `/skills`, confirm both evidence panels show 39 repositories and 18 verified live pages, expand both indexes, and confirm each contains exactly 39 code links.
- Confirm the Experience panel separates repositories from employer deliverables and the Skills panel rejects repository metadata as proficiency scoring.

## Accessibility and mobile

- Navigate the complete primary flow with Tab, Shift+Tab, Enter, Space, and Escape.
- Confirm the skip link moves focus to the main content.
- Verify focus returns after closing project, dossier, and portfolio-guide overlays.
- Check dark and day themes at 320 px, 390 px, 768 px, 1024 px, and desktop widths.
- At 320 px and 390 px, confirm archive inputs remain at least 44 px tall and the page has no horizontal overflow.
- At 320 px and 390 px, confirm insight metric cards, bars, deployment ledger, and evidence navigation stack without clipping.
- At 320 px and 390 px, expand the Experience and Skills repository indexes and confirm the names remain readable with no horizontal overflow.
- Enable reduced motion and confirm animation stops without hiding content.
- Verify the no-WebGL route at `/world/?fallback=1`.
- Start the guided tour, verify all five stops, pause/resume, Previous/Next, Finish, browser Back, and direct `?tour=identity` entry.
- Confirm reduced motion disables tour auto-advance and mobile tour controls remain at least 44 px without horizontal overflow.

## Services and privacy

- Leave contact and analytics endpoints blank unless a real deployed endpoint has been approved.
- If contact delivery is enabled, verify exact CORS origin, server secrets, KV rate limiting, provider delivery, timeout behavior, and email fallback.
- If external analytics is enabled, verify that payloads contain only the documented fixed event name, path, and timestamp.

## Search and sharing

- Inspect titles, descriptions, canonical URLs, Person and SoftwareSourceCode structured data, sitemap, robots, manifest, Open Graph, and X card tags in the exported HTML.
- Validate the social card at 1200×630 and test one real link unfurl after deployment.

## Release evidence

- Run lint, TypeScript, unit tests, production build, static performance budgets, and Playwright.
- Confirm GitHub Actions succeeds before deployment begins.
- Open the final GitHub Pages URL directly and verify assets load under `/personal-portfolio/`.
- Verify the public deployment URL itself; repository settings or workflow configuration alone are not proof of a live release.
