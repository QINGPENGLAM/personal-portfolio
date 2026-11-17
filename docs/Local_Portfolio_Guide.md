# Local portfolio questions

The local guide is deterministic: it matches question patterns against published
portfolio data and returns prepared text/source links. It does not generate AI
answers, contact an API or consume model quota when no assistant endpoint is set.
On the configured site, all premade choices use these local answers directly.
Custom questions retain configured AI and local fallback behavior; provider settings
and limits are unchanged. Recent chat, including earlier preset exchanges, may be
included when a visitor later sends a custom question.

The common-question bank contains 31 prompts grouped into About, Experience,
Projects, and Problem solving & growth. Visitors can show all topics or filter to
one. Its bounded scroll area keeps the input reachable. A visitor can reopen
common questions after an answer, or type a related question directly.

Covered subjects:
- Identity, public education/degree/minor/GPA/expected graduation, listed locations.
- Resume preview/download page, contact email, GitHub/public repository archive.
- DevDoctor, Immich photo search, Zelda/P1, modular weapon arena/P2; overview,
  contributions, stacks, architecture, documented tests and results.
- USAA, ISR, SI539, ENG101 and Michigan Hillel published experience entries.
- HRS publication pipeline overview, PostgreSQL, deduplication, cloud outline,
  documented evaluation and optional advisory AI screening.
- Published technology/source connections and Unity project overview.

Specific project/experience names take precedence over broad keywords. English
skill names use token boundaries so Java does not match JavaScript and API does
not match capital. Chinese aliases cover common questions; source excerpts remain
in their published English where no prepared Chinese summary exists. This is
pattern matching, not unrestricted natural-language understanding or chat memory.

Unknown salary, work authorization, exact availability, birth year or other
unpublished personal facts remain unavailable. Expected graduation does not prove
academic class year or age. Dates marked Present are reported as listed, not as
an independently refreshed employment status. Optional HRS AI screening is not confirmation of cloud deployment. Skills/source counts are not proficiency scores.

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

## Curated story choices — 2026-11-17

Six owner-approved public summaries cover Coveo ownership, feedback on AI use,
shared agent instructions, HRS initiative, Gmail pagination and incomplete WoS
alerts. data/assistant-stories.ts is the shared source for exact local answers,
retrieval and /about#story-* citations. The supplied October 16 master interview
dossier remains in Downloads and is not copied into this repository.

Stories preserve testing/handoff and self-reported outcome boundaries. The HRS
manual workload is not presented as achieved savings. Private infrastructure,
coaching instructions, unanswered story-mining questions and future plans are
excluded. Matching premade questions are answered locally even if typed verbatim;
other free-text questions retain the existing AI transport.
