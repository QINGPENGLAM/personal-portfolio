# HRS interactive case-study draft

The user requested an implementable first sketch: problem first, top-down clickable architecture second, then Database and Google Cloud side by side. Reuse the portfolio's existing background and typography; omit timing labels. AI screening is an expandable future node, not working functionality. This supersedes the generated image's decoration and five-chapter treatment for the current slice.

Implement a dedicated `/projects/hrs-publication-pipeline/` route with a small entry from Projects. Use semantic native details/summary nodes with visible expand affordances, inline explanations, and labeled yes/no branches. Native disclosure groups allow one open node per group, support keyboard operation, and work before hydration. Keep database and cloud groups independent. Stack deployment columns on phones. No diagram library, new dependencies, pipeline code changes, credentials, external calls, commits or deployment.

Content comes from inspected pipeline code and dated operational records. Distinguish the implemented intake flow from the AI placeholder; no automatic AI rejection. Do not invent personal ownership, impact metrics or prices. Include a concise dated deployment state note, not a claim about current live cloud status. Database topics: why, trade-offs, tables, SQLite/JSONL migration. Cloud topics: why, trade-offs, Run Job, SQL, Scheduler, secrets, monitoring. Later AI-development/results chapters remain outside this draft.

Acceptance: correct three-section order, readable top-down forks and exits, usable inline details on desktop and phone, no document overflow, static content available without JavaScript, and existing build/performance budgets maintained.


## HRS node popups — 2026-10-25
User requested popups instead of inline dropdowns. Supersedes the native disclosure design: workflow, database and cloud nodes now open labeled native modal dialogs with a dimmed/blurred backdrop. Close button, Escape and outside-click dismiss; background scroll is locked and restored; focus stays within the popup and returns to the originating node. Small screens constrain popup height with internal scrolling and a sticky close bar. Original explanations remain available in a no-JavaScript fallback. Node layout does not expand.

Popup replacement verified with unit tests, build, lint, original budgets and browser interaction checks.


## HRS motion and branch clarity — 2026-10-25
Added a 260ms fade/lift/scale popup entrance and 170ms exit, with matching backdrop fades. Close button, Escape and outside-click use the same delayed close path; modality/scroll lock remain until close. A 250ms fallback handles interrupted exit animations, timers are cleaned up, and reduced motion closes immediately without CSS animations. Larger outlined Yes/No pills now sit directly on stronger directional rails. Desktop branch spacing increased; mobile branch labels use a wider rail.
