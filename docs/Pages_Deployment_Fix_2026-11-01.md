# Pages quality failure and repair — 2026-11-01

## Observed run

Repository: QINGPENGLAM/personal-portfolio.
Run: https://github.com/QINGPENGLAM/personal-portfolio/actions/runs/41308626525
Job: quality, ID124854148118.

Lint, TypeScript,77 unit tests, production build, budgets and browser installation
passed. Critical browser flows failed (211 passed,42 configured skips,7 failed).
Artifact upload and deploy were skipped because they depend on that gate.
The failed push did not publish this version.

## Causes and fixes

1. The assistant failure-path test waited for networkidle. Default background
   music can keep a media request active, making this unrelated readiness check
   time out. Reproduced a5-second timeout with a pending background request.
   The test now keeps that regression condition, opens the guide and waits for
   its actual controls before aborting the still-lazy answer-module request.
2. Linux Firefox had no usable audio output. The official matching Playwright
   Ubuntu24.04 container reproduced the exact native failure:
   OpenCubeb() failed to init cubeb / NS_ERROR_DOM_MEDIA_MEDIASINK_ERR.
   The unchanged native playback check failed without a sound server. Added
   PulseAudio and a named null output to Actions before browser tests; the same
   check passed after that setup. It still decodes/plays the actual MP3.
3. Linux WebKit returns float32 volume precision (.20000000298023224 for.2).
   A real Linux audio backend also quantizes.2 to.20000492036. Use a four-
   decimal close comparison (much finer than the1%UI step) for volume only;
   retain exact loop/paused
   assertions and the existing native playback, range, route and loop checks.
4. Linux seeking can outlast the transient volume panel. Reopen it using its
   existing button before adjusting volume instead of assuming it stays visible.

No app behavior, music, dependency version, browser matrix, skipped-test policy,
CI retry policy, budgets or deployment gates were changed. Local Linux
verification disables retries. An additional four-worker stress run exceeded the
container memory; WebKit is verified separately at CI’s two-worker setting. CI
retains its existing two workers and retry policy.

## Validation

- macOS CI-worker targeted Chromium/WebKit suite:20 passed.
- Local lint, TypeScript and all77 unit tests:passed.
- Linux baseline:actual Firefox native playback failed with media-sink error.
- Linux virtual-output rerun:same case passed, including actual end-of-track loop.
- First Linux full-core pass with six-decimal volume tolerance:217 passed,42
  configured skips,1 WebKit quantization failure. Trace established the actual
  .20000492036 value, then the assertion was corrected to four decimals.
- Final-code four-worker stress pass:213 passed,42 configured skips,5 WebKit
  process crashes. The Linux cgroup recorded oom_kill=5. This exceeds the actual
  CI concurrency; it is not a site/assertion regression. All three other browser
  projects passed and WebKit's original music case passed.
- WebKit reran at CI's two-worker setting with retries disabled, followed
  by a fresh Chromium world process. Final WebKit batch:52 passed,13 configured
  skips,0 retries; fresh-world check:1 passed. No additional OOM kills occurred.
  Combined final-code matrix coverage:218 distinct passing cases plus42 configured
  skips, verified in batches—not a single green four-worker stress command.

Linux reproduction used a disposable official Playwrightv1.62.1-noble container,
with a copied test/build snapshot and no host-folder or credential mounts. This
is debugging infrastructure only; the portfolio remains a static Next.js export
and does not need Docker. Local Linux is ARM64; GitHub's runner is AMD64. A new
pushed Actions run is still required to confirm the hosted runner and deployment.

No commit, push or remote rerun has been performed. Rerunning the old failed
commit would not include these repairs; commit/push the changed files using
GitHub Desktop, then inspect the new run.

## Final handoff

All77 unit tests, lint, TypeScript, production build and all7 static budgets pass.
The three application/test/workflow changes plus governance records are local
and uncommitted. The existing failed Actions run remains red until a new pushed
commit triggers the repaired workflow; actual AMD64 hosted success/deployment
is not yet verified. Temporary test containers/image were cleaned up; the
portfolio and local development do not require Docker.
