# TODO

## Release review

- Review Phase 10 using `docs/PRODUCTION_CHECKLIST.md`, including archive filters, live links, 404 states, evidence-dashboard counts, chart labels, mobile layout, and interpretation copy
- Recheck the 2026-08-06 repository and live-deployment snapshot before release if repository visibility, Pages configuration, descriptions, languages, or activity has changed
- Recheck the 3 unavailable Pages candidates before changing their unlinked status: `project-0009-montage-product-video-generator`, `AI-Town`, and `arthistory-RPG`
- Push the reviewed branch, wait for the gated GitHub Pages workflow, and replace the currently live earlier Vite build only after approval
- Verify the deployed title, Phase 6 routes, social image, and subpath assets directly after release
- Decide whether to deploy the supplied contact worker and configure an email provider
- Decide whether an external privacy-conscious analytics collector is needed; local mode sends nothing
- Replace project placeholders only when approved screenshots, repository links, or live URLs are available

## Deferred production services

- Contact Worker hosting, KV binding, email provider credentials, and delivery verification
- Optional privacy-conscious analytics collector and endpoint verification
