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
