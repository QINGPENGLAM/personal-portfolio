export type HrsNode = {
  id: string
  title: string
  caption: string
  explanation: string
  points: string[]
  planned?: boolean
  visualDiagram?: {
    sources: { title: string; detail: string }[]
    check: { title: string; detail: string }
    outcomes: string[]
    humanDecision: string
    fallback: string
  }
}

export const hrsWorkflow = {
  gmail: {
    id: 'gmail', title: 'Gmail intake', caption: 'Find recent publication alerts',
    explanation: 'Search the last 30 days of Google Scholar and Web of Science alerts, then check a saved processing log to see which emails have already been handled.',
    points: ['Saved checkpoint: PostgreSQL stores each Gmail message ID and its processing status. On the next run, previously processed emails are skipped—even if the program has restarted.', 'Retrieve every result page: each Gmail request returns up to 100 matching email IDs. If Gmail provides a next-page token, request the next batch and repeat until there are no more pages.'],
  },
  source: {
    id: 'source', title: 'Identify the source', caption: 'Choose the matching parser',
    explanation: 'Read the email’s From address and compare it with the known Google Scholar and Clarivate alert senders. That tells the pipeline which email format to expect.',
    points: ['Extract the actual email address from the sender field and convert it to lowercase before comparing.', 'Google Scholar sender → Scholar parser. Clarivate sender → Web of Science parser.', 'Pass the email’s HTML body to the selected parser, which understands that source’s layout.'],
  },
  scholar: {
    id: 'scholar', title: 'Google Scholar parser', caption: 'Extract the Scholar alert format',
    explanation: 'Use Beautiful Soup 4 with the lxml parser to read the email’s HTML and turn each Scholar result into structured paper details.',
    points: ['Find the publication links, read their titles, and inspect nearby HTML elements for authors, journal, year and the short description.', 'Python’s urllib.parse extracts the original paper URL from Scholar’s tracking link. Regular expressions separate the author, journal and year text.', 'Saved example emails let parser changes be tested against the same inputs.'],
  },
  wos: {
    id: 'wos', title: 'Web of Science parser', caption: 'Extract the WoS alert format',
    explanation: 'Read individual records and their WoS identifiers. Compare the extracted count with the total reported by the alert.',
    points: ['Keep the WoS record ID, title, link and available metadata.', 'An email can contain fewer records than its reported result total; this is recorded as partial.', 'Fixture tests cover single-record and multi-record alerts.'],
  },
  storage: {
    id: 'storage', title: 'Save papers + deduplicate', caption: 'Keep identity separate from alert history',
    explanation: 'Before creating a paper record, compare it with stored papers using the strongest available identifiers. Keep a separate record of every alert in which it appears.',
    points: ['Match in order: DOI → Web of Science record ID → normalized paper URL → normalized title as a fallback.', 'Title normalization ignores capitalization, punctuation and extra spaces. Title fallback only merges records when their known DOI and WoS identifiers do not conflict.', 'Email checkpoint: tracks whether a particular email has been handled, so a rerun can skip opening and processing that same alert again.', 'Paper status: tracks whether a paper’s initial HRS/PubMed checks are finished, even if it appears in a different email. Failed checks remain eligible for retry; finishing these checks does not mean a person has approved the paper.', 'Retain each alert occurrence, even when the paper already has a stored record.'],
  },
  title: {
    id: 'title', title: 'Already in HRS?', caption: 'Check by normalized title',
    explanation: 'Query HRS and compare normalized titles. An existing match does not need a new manual-entry candidate.',
    points: ['A known match is marked already in HRS.', 'Otherwise, continue to PubMed for publication metadata.'],
  },
  titleSkip: {
    id: 'title-skip', title: 'Skip new entry', caption: 'Already in HRS',
    explanation: 'Record the existing HRS match and avoid creating a duplicate entry task.',
    points: ['This is a known-record check, not an AI relevance decision.'],
  },
  pubmed: {
    id: 'pubmed', title: 'Reliable PubMed match?', caption: 'Resolve publication metadata',
    explanation: 'Search PubMed for a reliable title match and retrieve the matched record’s PMID, DOI, authors and journal.',
    points: ['A match provides identifiers for a second HRS check.', 'No reliable match: save an unmatched active candidate. It joins the same review queue as matched candidates before the required AI stage in the intended workflow and then output.', 'PubMed membership does not prove that a paper used HRS data.'],
  },
  unmatched: {
    id: 'unmatched', title: 'Save unmatched candidate', caption: 'Rejoins the shared queue below',
    explanation: 'A missing PubMed match does not end the workflow. Save the candidate as needs_non_pubmed_review, then join the shared active review queue before AI screening and CSV/Sheet output. A configured AI pass can use an identity-checked stored article link when text processing is permitted.',
    points: ['Do not infer HRS use or non-use from the lack of a PubMed match.', 'Source identity conflicts or unavailable text remain visible for manual review.'],
  },
  pmid: {
    id: 'pmid', title: 'PMID already in HRS?', caption: 'Check the matched identifier',
    explanation: 'Use the PubMed identifier to check whether the publication is already represented in HRS, even when the initial title check did not find it.',
    points: ['Existing PMID match: mark already in HRS.', 'No match: prepare metadata for human review and manual entry.'],
  },
  pmidSkip: {
    id: 'pmid-skip', title: 'Skip new entry', caption: 'Existing PMID match',
    explanation: 'The identifier check found an existing publication, so another manual-entry task is unnecessary.',
    points: ['Keep the processing outcome for repeat runs.'],
  },
  queue: {
    id: 'queue', title: 'Prepare and queue candidates', caption: 'Shared active queue · paper metadata',
    explanation: 'Collect each paper’s available identity and publication details, then save the candidate in the shared PostgreSQL review queue. A reliable PubMed match that is not already in HRS becomes ready_for_manual_entry; a missing reliable match becomes needs_non_pubmed_review. Both paths feed the AI stage before output in the intended workflow.',
    points: [
      'Email intake already provides the title and source links. When there is a reliable PubMed match, enrich the candidate with its PMID, DOI, journal, authors and HRS leadership matches. Missing fields stay missing; an unmatched candidate is still queued.',
      'These saved details identify the paper and support source lookup and human review. Inside the AI stage, the program separately retrieves, verifies and extracts the abstract or permitted article text supplied to the model; metadata alone is not HRS data-use evidence.',
      'In the intended workflow, every active candidate passes through the AI stage before CSV and Google Sheet output. Both matched and unmatched paths are included; a still-current result can be reused rather than calling the model again.',
      'If text is unavailable, the API fails, or batch, time or cost limits prevent screening, export the candidate with the explicit status “AI incomplete—manual review needed”. A successful classification is not required for export.',
      'Implementation boundary: this is the intended required-stage policy. The current runtime is still opt-in and does not yet enforce the policy or this exact incomplete-status label. Staff retain the final decision.',
    ],
  },
  ai: {
    id: 'ai', title: 'AI screening', caption: 'Required before Sheet output',
    explanation: 'In the intended workflow, AI screening is a required pre-output stage for both PubMed-matched and unmatched active candidates. Reuse a still-current result or attempt screening; if it cannot complete, export with “AI incomplete—manual review needed” rather than silently omitting the AI status.',
    points: [
      'Sources: a verified PMID can provide a PubMed abstract; a stored article URL can provide bounded HTML/PDF text after identity and processing-permission checks. PMC uses its separate license-aware path. Generic full-text extracts may be partial.',
      'The model selects source/span IDs. The program copies exact original text and validates its source and range before showing evidence. A verified quote proves where text came from, not that the classification is correct.',
      'Suggestions are uses_hrs_data, mentions_hrs_only, or insufficient_evidence. “Mentions only” requires complete main-text context; an abstract or partial extract cannot establish non-use. Unclear, conflicting, and policy-sensitive cases stay with staff.',
      'The local PostgreSQL usage ledger records tracked request costs. Its default $25 monthly threshold is a soft admission limit, not a guaranteed bill cap; unresolved request costs pause further tracked calls.',
      'A three-paper full-text pilot recorded one known LASI false positive: related or harmonized cohorts were mistaken for US HRS use. The result remains documented; exact quotations do not resolve that inference error. Broader staff-labeled validation is still open.',
      'For the intended output, show either the AI advice with evidence/scope or the explicit incomplete status. AI never adds or removes HRS records or replaces the staff decision.',
    ],
    visualDiagram: {
      sources: [
        { title: 'PMID', detail: 'Verified PubMed record + abstract' },
        { title: 'Stored article URL', detail: 'Identity-checked, permission-aware text' },
      ],
      check: { title: 'Validate evidence', detail: 'Resolve model-selected source/span IDs to exact original text and stored source ranges.' },
      outcomes: ['Uses HRS data', 'Mentions only*', 'Insufficient evidence'],
      humanDecision: 'Staff decide; AI never adds or removes records',
      fallback: '*“Mentions only” requires complete main text. If screening cannot finish, export “AI incomplete—manual review needed”; partial text, conflicts and uncertain cases stay with staff.',
    },
  },
  review: {
    id: 'review', title: 'Google Sheet + CSV', caption: 'Human review + explicit AI status',
    explanation: 'Export the active queue and completed archive. In the intended workflow, each active candidate arrives after the required AI stage, with either advice and evidence or “AI incomplete—manual review needed”. The Sheet remains the working interface for staff decisions and notes.',
    points: ['Preserve existing manual decisions and notes during synchronization.', 'Update both Sheet tabs in one batch to avoid a clear-then-write gap.', 'Human edits between the read and write can still conflict; this is an operational limitation.'],
  },
} satisfies Record<string, HrsNode>

export const hrsDatabase: HrsNode[] = [
  { id: 'db-why', title: 'Why PostgreSQL?', caption: 'Durable state across runs', explanation: 'The job can stop or move between containers; its paper history, checkpoints and review queue must survive independently.', points: ['Relational tables represent papers and alert occurrences.', 'Transactions support consistent updates; JSONB retains flexible review metadata.', 'A shared database also supports the pipeline’s advisory lock.'] },
  { id: 'db-tradeoffs', title: 'Trade-offs', caption: 'Durability versus operational cost', explanation: 'A shared PostgreSQL database adds connection management, credentials, migration work and ongoing storage cost compared with local files.', points: ['Managed hosting reduces routine database administration but still needs backup and recovery planning.', 'A successful migration or configured backup is not proof of a tested restore.', 'Human Sheet notes are not yet a complete database-backed audit trail.'] },
  { id: 'db-tables', title: 'What is stored?', caption: 'Four tables, distinct responsibilities', explanation: 'Separate the identity of a publication from its sources and from the pipeline’s progress.', points: ['processed_messages — email processing checkpoints.', 'papers — publication identity and candidate processing state.', 'paper_occurrences — the alerts in which a paper appeared.', 'review_candidates — review queue records and metadata.'] },
  { id: 'db-migration', title: 'SQLite + JSONL → PostgreSQL', caption: 'One persistent state store', explanation: 'The local prototype used SQLite and a JSONL review queue. Cloud execution needed durable state outside a disposable container.', points: ['Move checkpoint, paper, occurrence and review records into PostgreSQL.', 'The deployment record documents record-by-record comparison and sequence checks after import.', 'Treat CSV as regenerable output; do not overwrite newer cloud state with an old local queue.'] },
]

export const hrsCloud: HrsNode[] = [
  { id: 'cloud-why', title: 'Why Google Cloud?', caption: 'Run without a personal laptop', explanation: 'Package the existing Python pipeline as a scheduled container job with separate persistent storage and managed credentials.', points: ['Cloud Run Jobs handles execution.', 'Cloud SQL holds state between runs.', 'Scheduler triggers the job; logging and monitoring make failures visible.'] },
  { id: 'cloud-tradeoffs', title: 'Trade-offs', caption: 'Budget versus maintenance', explanation: 'An on-demand job avoids keeping an application server running between batches. The database remains a separate cost and operations decision.', points: ['Managed services reduce server upkeep but introduce IAM, configuration and billing complexity.', 'A small single-zone database limits cost at the expense of availability and capacity.', 'Pausing the database does not remove every retained-storage or resource charge.'] },
  { id: 'cloud-run', title: 'Cloud Run Job', caption: 'Execute the Python container', explanation: 'Start the packaged intake command, process the batch and exit. This workload does not need a continuously running web server.', points: ['The validated configuration used one task and one parallel worker.', 'PostgreSQL advisory locking protects against overlapping executions; parallelism alone is insufficient.', 'Checkpointed state supports repeat runs after interruption.'] },
  { id: 'cloud-sql', title: 'Cloud SQL', caption: 'Host PostgreSQL independently', explanation: 'Keep the database available across short-lived job executions, with managed database infrastructure and controlled access.', points: ['The deployment record uses PostgreSQL 17 and a small single-zone instance.', 'Backups and deletion protection were configured; recovery still needs a tested restore.', 'Database availability is required before the pipeline can run.'] },
  { id: 'cloud-scheduler', title: 'Cloud Scheduler', caption: 'Trigger a daily execution', explanation: 'A separate scheduler identity invokes the Cloud Run Job on the configured daily schedule.', points: ['The recorded configuration is 08:00 America/Detroit.', 'Scheduler invocation was verified separately from a manual job execution.', 'The October 24 operations record says the scheduler and database were paused pending staff readiness.'] },
  { id: 'cloud-secrets', title: 'Identity + secrets', caption: 'Access only what the job needs', explanation: 'Cloud identity, database login and Gmail/Sheets authorization are separate responsibilities.', points: ['A service account accesses the required cloud resources.', 'Secret Manager supplies database connection settings and API credentials.', 'Gmail and Sheets use user OAuth refresh credentials; headless execution must handle authorization failures.'] },
  { id: 'cloud-monitoring', title: 'Logs + failure alerts', caption: 'Make unsuccessful runs visible', explanation: 'Execution logs expose progress and errors. A deliberately failed test execution verified the email alert path.', points: ['Successful scheduling is not proof that a batch completed correctly.', 'The operations record documents a received failure email.', 'Long-term operational reliability and cloud concurrency still need ongoing verification.'] },
]

export const hrsDevelopment: HrsNode[] = [
  {
    id: 'development-requirements',
    title: 'ChatGPT for design refinement',
    caption: '01 / Baseline + requirements',
    explanation: 'Start from working code, examples and a specific goal. Use ChatGPT to clarify the requirement, allowed scope and acceptance checks before asking an agent to change the system.',
    points: [
      'Example: a SQLite-to-PostgreSQL change must preserve existing papers, alert occurrences, checkpoints and review records—not just establish a database connection.',
      'Make the expected behavior, protected data and non-goals explicit so implementation and review use the same standard.',
    ],
  },
  {
    id: 'development-tools',
    title: 'Codex for incremental implementation',
    caption: '02 / Bounded implementation + checks',
    explanation: 'Give Codex access to the relevant files and checks so it can carry out the engineering work: inspect the current implementation, edit within scope, run tests and report actual results.',
    points: [
      'For database work, use an isolated test database and representative examples. Check transactions, uniqueness and retry behavior as well as the normal path.',
      'Inspect the diff and test output. Credentials, production data, commits and deployment remain outside the task unless separately authorized.',
    ],
  },
]

export const hrsEvaluation: HrsNode[] = [
  {
    id: 'development-fresh-review',
    title: 'Review in a fresh context',
    caption: '03 / Independent context + evidence',
    explanation: 'A separate reviewer starts without the implementation chat history. Give it the requirements, constraints, diff, relevant code and tests so it can assess the change on its own evidence.',
    points: [
      'Ask whether the change meets the goal and whether it breaks callers, stored state, recovery or another part of the workflow. The reviewer can inspect surrounding code when needed.',
      'Require a file location, failure scenario and reason for each finding. A fresh context helps challenge assumptions; the findings still need verification.',
    ],
  },
  {
    id: 'development-triage',
    title: 'Triage by impact',
    caption: '04 / Human judgment + scope control',
    explanation: 'Review the findings rather than automatically implementing every suggestion. Prioritize correctness, data loss, security and regressions; document why a finding is accepted, deferred or rejected.',
    points: [
      'A preferred variable name, quote style or alternative expression layout can be deferred when behavior and readability are already clear. Unnecessary refactoring should not expand the task.',
      'Syntax errors, type errors and broken SQL are correctness issues. A PostgreSQL-incompatible placeholder is not a cosmetic nit, even when the fix is only one character.',
    ],
  },
  {
    id: 'development-rounds',
    title: 'Fix and re-review',
    caption: '05 / At most three review rounds',
    explanation: 'Apply the accepted fixes, rerun the relevant checks and review the changed code against the same goal. Carry a short findings list forward so resolved issues are not repeatedly rediscovered.',
    points: [
      'After three review rounds, pause if important issues remain. Reconsider the approach, clarify the prompt or reduce the scope instead of allowing an endless author–reviewer loop.',
      'Use later passes for the updated diff and unresolved findings. Unresolved blocking issues require a revised plan or human review; the round limit is not automatic approval.',
    ],
  },
  {
    id: 'development-ownership',
    title: 'Refine the brief and own the result',
    caption: '06 / Better instructions + acceptance',
    explanation: 'Use review feedback to improve the overall approach: add missing context, sharpen acceptance criteria and turn repeatable failures into checks. Keep responsibility for the final decision with the engineer.',
    points: [
      'For the migration example, replace “looks correct” with evidence such as preserved records, correct sequence state, rollback behavior and recovery checks.',
      'Improve the prompt to reduce misunderstandings—not to silence valid findings. Review the evidence and remaining limits before accepting the change.',
    ],
  },
]

export const hrsResults: HrsNode[] = [
  {
    id: 'results-functional',
    title: 'Functional outcomes',
    caption: 'A persistent, review-first workflow',
    explanation: 'The local project connects alert parsing and deduplication with persistent checkpoints, publication checks, and an exportable human-review queue.',
    points: [
      'An optional AI stage can add a suggestion, source scope, and validated evidence to review output; it is disabled by default and does not add or remove HRS records.',
      'The latest documented offline regression run passed 487 tests against mocked external services and disposable PostgreSQL. That verifies local behavior, not production acceptance.',
      'A separate October 24 deployment record documents a verified scheduled cloud run, followed by a pause pending staff readiness. Newer local AI work has not been deployed or verified there.',
    ],
  },
  {
    id: 'results-limits',
    title: 'What the evidence does—and does not—show',
    caption: 'Tests are not an accuracy claim',
    explanation: 'The three-paper full-text pilot was a small, operator-reviewed experiment, not a representative or independently staff-labeled evaluation set.',
    points: [
      'One multicohort paper received a supported HRS-use suggestion; a review paper remained manual because partial text could not support a “mentions only” conclusion.',
      'The third case, a LASI/LASI-DAD paper, was a known false positive: exact quotations were real, but the model inferred US HRS use from a related cohort.',
      'This is why evidence provenance, text coverage, classification correctness, and staff collection policy must be evaluated separately.',
    ],
  },
  {
    id: 'results-next',
    title: 'Lessons and next priorities',
    caption: 'Make the safe path the default',
    explanation: 'My main lesson is to optimize for a trustworthy review workflow, not an impressive-looking model answer.',
    points: [
      'Build an independently staff-labeled evaluation set covering clear US HRS/RAND use, sister-cohort-only cases, reviews, and ambiguous or insufficient text.',
      'Keep the LASI false positive visible, improve semantic evaluation without relaxing source or evidence checks, and establish an operator-verified process for unresolved request costs.',
      'Before rollout, separately verify the database schema/permissions, current cloud deployment, and end-to-end behavior with staff; keep AI opt-in until those gates pass.',
      'For an engineering role, I would bring the same habits: clarify ownership and failure states, preserve human decisions, measure what is actually verified, and make limitations actionable.',
    ],
  },
]
