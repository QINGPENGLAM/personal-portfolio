# Course Projects Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans for this bounded content change in the current checkout.

**Goal:** Add two approved course project case studies without publishing course source.

**Architecture:** Add entries to data/projects.ts. Existing cards, static routes, sitemap and world discovery consume the same schema.

**Tech Stack:** Next.js 16, React, TypeScript, Zod.

**Spec:** docs/superpowers/specs/2026-11-13-course-projects-design.md

## Global Constraints
English artifacts; no source copy, repository link, demo or download for these entries. No changes to either course repository. No commit/push/deploy requested.

## Review Focus
Check source-link absence, course attribution, starter-code ownership, branch-specific claims and unique world positions. Existing schema/unit checks and exported HTML inspection cover these boundaries.

### Task 1: Add the two content entries
- [x] Add taskr-ai-planner and where-on-the-map records in data/projects.ts using the existing schema; omit caseStudy diagrams and screenshots because no approved assets are available.
- [x] Run unit tests, lint, typecheck and static build; inspect both exported pages for course attribution, contributions, links and overflow if browser tooling is available.
- [x] Update project brief, TODO, worklog and decisions with verified results and a short reflection.

Ruling: use the existing checkout for this small content edit. No new tests that mirror static copy; existing data and rendering checks plus exported-page inspection provide proportionate verification. Keep timeline unchanged because this request concerns project cards/pages, not a chronology expansion.
