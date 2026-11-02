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
