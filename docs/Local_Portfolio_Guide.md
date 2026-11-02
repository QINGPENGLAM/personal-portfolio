# Local portfolio questions

The local guide is deterministic: it matches question patterns against published
portfolio data and returns prepared text/source links. It does not generate AI
answers, contact an API or consume model quota when no assistant endpoint is set.
On the configured site, the same answers remain the fallback after an AI failure;
this expansion does not change the approved OpenRouter configuration or limits.

The initial common-question list contains25 prompts. It has its own bounded
scroll area so the input remains reachable. A visitor can reopen common questions
after an answer, or type a related question directly.

Covered subjects:
- Identity, public education/degree/minor/GPA/expected graduation, listed locations.
- Resume preview/download page, contact email, GitHub/public repository archive.
- DevDoctor, Immich photo search, Zelda/P1, modular weapon arena/P2; overview,
  contributions, stacks, architecture, documented tests and results.
- USAA, ISR, SI539, ENG101 and Michigan Hillel published experience entries.
- HRS publication pipeline overview, PostgreSQL, deduplication, cloud outline,
  documented evaluation and explicitly proposed AI screening.
- Published technology/source connections and Unity project overview.

Specific project/experience names take precedence over broad keywords. English
skill names use token boundaries so Java does not match JavaScript and API does
not match capital. Chinese aliases cover common questions; source excerpts remain
in their published English where no prepared Chinese summary exists. This is
pattern matching, not unrestricted natural-language understanding or chat memory.

Unknown salary, work authorization, exact availability, birth year or other
unpublished personal facts remain unavailable. Expected graduation does not prove
academic class year or age. Dates marked Present are reported as listed, not as
an independently refreshed employment status. HRS intended AI behavior cannot be
presented as confirmed deployment. Skills/source counts are not proficiency scores.

Question text: data/assistant-suggestions.ts.
Answer routing/public data: lib/assistant.ts and the linked data modules.
Regression fixtures: tests/assistant-local.test.ts, e2e/assistant-local.spec.ts.

Reply presentation: normal motion uses a minimum550ms preparation phase with
animated dots, then reveals complete-word chunks about every40ms. Real service
waiting counts toward that minimum; this does not add a second full wait after
a slow API call. This is a display effect applied to an already prepared/validated
answer, not model generation or network streaming. Local/AI labels remain intact.
Source links appear only after completion. Cancel stops timers and discards the
partial display; reduced motion skips artificial delay/reveal animation. The
message area follows new content unless the visitor scrolls up to read earlier
messages. aria-busy marks partial updates as pending so assistive technology can announce
the completed reply.

Panel motion: opening fades/slides up with a slight scale over240ms; closing
fades/slides down over180ms. Exit keeps the panel mounted but inert/hidden from
assistive technology until the animation completes. A260ms fallback covers an
interrupted/disabled animation; repeated Escape does not restart it. Close returns
focus to the opener after removal, and the draft/history remain available on
reopen. Reduced motion skips panel animations and closes immediately. Exit timers
are cleared on completion, reopening or component unmount.
