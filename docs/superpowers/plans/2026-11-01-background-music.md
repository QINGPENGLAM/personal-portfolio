# Background music implementation

Goal: use the user-selected MP3 with the existing header control.
Spec: ../specs/2026-11-01-background-music-design.md.
Execute inline in the existing checkout; preserve current changes, no commits.

- [x] Add browser regressions for no pre-click request, loop/play/pause/volume,
  client-route continuity, fresh-document default-off, retry and canceled starts.
- [x] Observe failure against the existing interface-tone button.
- [x] Copy the original MP3 and record credit/license source.
- [x] Update AudioProvider/AudioToggle and small responsive volume/status styles.
- [x] Add bounded optional-music/core/full-export accounting and regression checks.
- [x] Run unit/lint/type/build/budgets and browser checks on all configured engines.
- [x] Read-only review, governance updates and final evidence.

## User-directed control follow-up
- [x] Remove visible source link and fade panel while retaining interaction access.
- [x] Add default playback attempt and policy-aware first-interaction fallback.
- [x] Fix reviewed touch reopening issue with failing-then-passing tap regression.
- [x] Verify24 browser tests,77 unit tests, lint/types/build/budgets and desktop/mobile axe/layout.
