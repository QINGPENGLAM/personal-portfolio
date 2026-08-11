# TODO

## Release review

- Review and action the ordered findings in `docs/PUBLIC_PROJECT_CODEBASE_AUDIT_2026-08-11.md`
- Refresh the dated GitHub metadata and all Pages checks before describing the archive as current; the repository membership was rechecked on 2026-08-11, but language/activity/live-link fields remain the 2026-08-06 snapshot
- Resolve the Priority 0 audit findings: public evidence boundary for the Montage repository, `myOwnRedis` rehash correctness, empty/duplicate repositories, Calculator percent behavior, and n8n runtime artifacts
- Refresh the public repository snapshot after the completed README merges and update the archive's README-coverage evidence if that metric is published
- Review Phase 10 using `docs/PRODUCTION_CHECKLIST.md`, including archive filters, live links, 404 states, evidence-dashboard counts, chart labels, mobile layout, and interpretation copy
- Recheck the 2026-08-06 repository and live-deployment snapshot before release if repository visibility, Pages configuration, descriptions, languages, or activity has changed
- Recheck the 3 unavailable Pages candidates before changing their unlinked status: `project-0009-montage-product-video-generator`, `AI-Town`, and `arthistory-RPG`
- For future pushes, wait for the gated GitHub Pages workflow and verify the deployed title, routes, social image, and subpath assets directly after release
- Decide whether to deploy the supplied contact worker and configure an email provider
- Decide whether an external privacy-conscious analytics collector is needed; local mode sends nothing
- Replace project placeholders only when approved screenshots, repository links, or live URLs are available

## Deferred production services

- Contact Worker hosting, KV binding, email provider credentials, and delivery verification
- Optional privacy-conscious analytics collector and endpoint verification
