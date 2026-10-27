# Pages deployment diagnosis and local repair — 2026-10-27

## Observed failed run

- Repository: QINGPENGLAM/personal-portfolio.
- Commit: 7f85bd941b3914c573339a97f9044a9a332ea70c.
- Run: https://github.com/QINGPENGLAM/personal-portfolio/actions/runs/40538962089.
- Failed job/step: quality / Static performance budgets.
- Lint, TypeScript, all unit tests and production build succeeded remotely.
- Browser tests and Pages publication were skipped after the budget failure.
- No claim that the failed commit was deployed.

## Reproduction and repair

Local Pages-base-path build reproduced both remote failures. Homepage initial
JavaScript was281658 bytes versus281600 limit (rounded display misleadingly
showed275/275KiB). Total export was12651KiB versus11719KiB (12000000bytes).

1. Website portrait PNG1757635bytes replaced with JPEG126871bytes at unchanged
   1306x1205dimensions, same photograph. Original Downloads PNG left unchanged.
2. Portfolio guide suggestions separated from the large answer module; answer
   data loads only when a visitor asks. Existing synchronous library answer API
   remains. Pending guard/status, rate limit and rejected-import fallback tested.
3. Broader browser verification exposed pre-existing hydration-theme transition
   sampling. Apply saved/OS theme in the head before first paint; keep the current
   client theme controls. Accessibility audit waits for theme, fonts and transitions;
   no rules, routes or contrast limits removed. Controlled WebKit experiment
   reproduced white-on-light heading before bootstrap and correct color after it.
4. Firefox box-height difference0.000061px uses0.05px tolerance, still rejecting
   meaningful shifts. Experience dialog explicitly returns focus to its trigger.
5. Scroll destination rounded to CSS pixels to avoid WebKit fractional truncation.
   Test keyboard helper uses Option-Tab on macOS WebKit only; Linux/other browsers
   retain Tab. No system-wide keyboard preference changed.

## Verification

- Failure regression: new rejected-answer-module browser check failed before
  implementation; answer success and failure checks both passed after it.
-71 unit tests passed; full lint and Pages production build/TypeScript passed.
- All five existing budgets pass; homepage260/275KiB, world267/290KiB,
  largestJS240/303KiB, CSS21/21KiB, complete export11097/11719KiB.
- Focused WebKit integration:18 passed,5 intentional skips,0 failures.
- Full CI browser sequence: 182 passed /42 intentional skips in the four-browser core matrix (2.4minutes), plus1 passed in the separate fresh Chromium world run (8.2seconds); entire npm run test:e2e exit0, no failures or retries.

Initial broad runs surfaced genuine/test/environment issues and were not reported
as green. The local WebKit executable required by the existing Playwright version
was installed; browser environment preparation was not a package-version change.
An independent read-only review found no actionable assistant-loading issues;
a separate focused diagnosis verified the WebKit fixes.

## Publication boundary

Local repair only. No commit, push, remote rerun or deployment was performed.
Commit and push the repair using GitHub Desktop, then inspect the new Actions run
before claiming the live site is updated. Budget thresholds and workflow gates
were not raised, removed or bypassed. Generated next-env changes are excluded.
