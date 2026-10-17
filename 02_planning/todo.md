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

- [ ] Publish the updated portfolio and verify its deployed P2 page and download.
