# Homepage Experience Timeline Implementation Plan

**Goal:** Add the two user-supplied IA roles and a straight vertical homepage timeline with branching nodes and expandable role details.

**Architecture:** Keep validated experience data shared across existing consumers. Native details/summary provides keyboard and no-JavaScript expansion; scoped homepage CSS supplies the line, nodes, and branches.

**Scope:** ENG 101 — Introduction to Engineering, Oct. 2024–June 2025; SI 539 — Web Design: Responsiveness and Accessibility, Aug. 2026–Present. Preserve supplied course spelling, existing roles, and dates. Use general teaching-support descriptions without invented metrics, office hours, grading responsibilities, or tools. Empty outcomes/technologies are valid when not supplied; omit their headings. Existing experience route and chronological index must remain valid.

**Approach:** A single left-side rail on all screen sizes follows the requested straight-line layout and keeps entries easy to scan. Independent native disclosures allow comparing roles and work without JavaScript; alternating cards or modal dialogs add unnecessary complexity.

- [x] Add a regression for both IA dates/course names and chronological index membership; update the existing role-count assertion.
- [x] Add shared IA content, date sort keys, and support for absent outcomes/technologies. Keep existing engineering metrics intact.
- [x] Render homepage experience as a semantic ordered list with native disclosures and scoped responsive rail/node/branch CSS.
- [x] Verify pointer and keyboard expansion, mobile overflow, and no-JavaScript operation in Playwright; run unit suite, lint, typecheck, and build.
- [x] Update project status, TODO, worklog, and decisions. No commit, push, or deployment.

User correction: desktop rail is centered with alternating left/right cards. Narrow screens keep a left rail for readable content. This supersedes the original all-screen left-rail choice.

User correction: clicking a role opens an HRS-style native modal popup, replacing native inline disclosures. ExperienceCard owns the interaction and reuses HRS dialog CSS; retain direct role-page links as the no-JavaScript fallback.
