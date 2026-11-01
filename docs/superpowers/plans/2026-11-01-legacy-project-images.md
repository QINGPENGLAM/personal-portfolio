# Legacy Project Images Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans for this approved, bounded change. Work in the existing checkout to preserve the user's in-progress tracking changes. No commits or pushes.

**Goal:** Add original imagery to seven matched archive cards.
**Architecture:** A separate local preview map supplies path, alt text and honest caption to GitHubArchive; dated repository facts remain unchanged. Next Image renders lazy previews with base-path support and contain sizing.
**Tech Stack:** Existing Next.js/React/TypeScript, Pillow for asset conversion, Vitest and Playwright.
**Spec:** docs/superpowers/specs/2026-11-01-legacy-project-images-design.md (approved by user 2026-11-01).

## Constraints
Seven confirmed mappings only; original image/ bytes stay local and ignored.
No dependency changes, separate repository edits, new live claims, music, commits or publication.
Keep existing controls, descriptions and links, and all performance budgets.

## Review focus
Wrong repository pairing; artwork mislabeled as screenshots; missing images under the deployment subpath; cropped/narrow-screen imagery; unaffected cards or filters regressing.

### Task 1: Curated previews and card rendering
Files: data/repository-previews.ts; public/project-previews/archive/*.webp;
components/projects/GitHubArchive.tsx; app/globals.css;
tests/repository-previews.test.ts; e2e/archive-previews.spec.ts.
- [x] Write failing unit coverage: exact seven names/paths, packaged asset existence, all-card rendering, captions, base paths and text-only fallback.
- [x] Run the test and observe failure before implementation.
- [x] Convert seven originals to optimized aspect-preserving WebP copies, maximum width 1200.
- [x] Implement RepositoryPreview {src, alt, caption} and repositoryPreviews map.
- [x] Add a framed, lazy Image preview only for mapped repositories; contain sizing and responsive sizes.
- [x] Run focused/full unit tests, lint, TypeScript, Pages build and budgets.
- [x] Browser-check all seven images, filtering, links, mobile overflow and axe checks.
- [x] Read-only review of task diff; update governance docs and record measured results.
