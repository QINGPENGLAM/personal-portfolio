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
    points: ['A match provides identifiers for a second HRS check.', 'No reliable match: keep the candidate for human review; the optional AI stage is a separate pass over active queue candidates.', 'PubMed membership does not prove that a paper used HRS data.'],
  },
  unmatched: {
    id: 'unmatched', title: 'Keep for review', caption: 'No reliable PubMed match',
    explanation: 'A missing PubMed match does not exclude a paper. Keep it in the human review queue; a separately configured AI pass may use an identity-checked stored article link when permitted.',
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
  authors: {
    id: 'authors', title: 'Prepare review details', caption: 'Metadata + leadership matching',
    explanation: 'Compare PubMed authors with the HRS co-investigator list and assemble the publication details for the reviewer.',
    points: ['Include the title, PMID, DOI, journal and author information.', 'Leadership matches provide context; a human still decides what to enter.'],
  },
  ai: {
    id: 'ai', title: 'AI screening', caption: 'Optional queue pass · disabled by default',
    explanation: 'Implemented in the local pipeline as an opt-in pass over due, active review candidates after intake and optional PubMed rechecks, before CSV/Sheet output. It is not limited to the no-PubMed branch shown above. This case-study page is static and makes no model calls; the paused cloud deployment has not been updated or verified with this newer stage.',
    points: [
      'Sources: a verified PMID can provide a PubMed abstract; a stored article URL can provide bounded HTML/PDF text after identity and processing-permission checks. PMC uses its separate license-aware path. Generic full-text extracts may be partial.',
      'The model selects source/span IDs. The program copies exact original text and validates its source and range before showing evidence. A verified quote proves where text came from, not that the classification is correct.',
      'Suggestions are uses_hrs_data, mentions_hrs_only, or insufficient_evidence. “Mentions only” requires complete main-text context; an abstract or partial extract cannot establish non-use. Unclear, conflicting, and policy-sensitive cases stay with staff.',
      'The local PostgreSQL usage ledger records tracked request costs. Its default $25 monthly threshold is a soft admission limit, not a guaranteed bill cap; unresolved request costs pause further tracked calls.',
      'A three-paper full-text pilot recorded one known LASI false positive: related or harmonized cohorts were mistaken for US HRS use. The result remains documented; exact quotations do not resolve that inference error. Broader staff-labeled validation is still open.',
      'AI advice appears alongside evidence and scope for staff review. It never adds or removes HRS records or replaces the staff decision.',
    ],
    visualDiagram: {
      sources: [
        { title: 'PMID', detail: 'Verified PubMed record + abstract' },
        { title: 'Stored article URL', detail: 'Identity-checked, permission-aware text' },
      ],
      check: { title: 'Validate evidence', detail: 'Resolve model-selected source/span IDs to exact original text and stored source ranges.' },
      outcomes: ['Uses HRS data', 'Mentions only*', 'Insufficient evidence'],
      humanDecision: 'Staff decide; AI never adds or removes records',
      fallback: '*“Mentions only” requires complete main text. Partial text, identity conflicts, and uncertain cases stay in human review.',
    },
  },
  review: {
    id: 'review', title: 'Google Sheet + CSV', caption: 'Human review and manual entry',
    explanation: 'Export the active queue and completed archive. The Sheet is the working interface for staff decisions and notes.',
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
    id: 'development-design',
    title: 'ChatGPT for design refinement',
    caption: 'Turn broad goals into reviewable slices',
    explanation: 'I used ChatGPT to refine requirements and explore implementation boundaries, then kept the decisions and approvals with me.',
    points: [
      'Break the work into explicit slices: preserve existing review state, add optional screening, validate evidence, and account for model usage.',
      'Treat the assistant as a design partner—not an authority on HRS policy, source permissions, or whether a paper belongs in the collection.',
    ],
  },
  {
    id: 'development-codex',
    title: 'Codex for incremental implementation',
    caption: 'Small changes, tests, inspectable diffs',
    explanation: 'I used Codex to help implement bounded changes in the existing Python project, while retaining ownership of scope, review, and acceptance.',
    points: [
      'Prefer a narrow code change with a failing regression over a broad rewrite.',
      'Review the resulting diff and run focused checks before relying on the change; keep credentials, live queues, and deployment operations outside the coding loop.',
    ],
  },
  {
    id: 'development-harness',
    title: 'Harness-controlled evaluation',
    caption: 'Let the test result—not the agent—decide',
    explanation: 'A local parser harness runs the real Google Scholar and Web of Science parser tests, classifies assertion failures separately from test-environment errors, then independently reruns tests after a repair.',
    points: [
      'Repairs are limited to existing Python parser files, capped at three Codex calls, and bounded by test and agent timeouts.',
      'The harness snapshots managed files and records per-step and cumulative diffs. Scope checks detect out-of-scope changes after execution; they are not complete file-access isolation.',
      'The recorded real-project check-only run passed all eight parser tests without invoking Codex. Fake-agent repair behavior was tested separately in disposable projects.',
    ],
  },
  {
    id: 'development-wos-counterexample',
    title: 'The WoS counterexample',
    caption: 'A green parser test is not a complete alert',
    explanation: 'One saved Web of Science alert says “Showing 5 of the 6.” The parser extracts the five visible records, and intake marks the email partial because the parsed count is below the reported count.',
    points: [
      'Preserve the records that were extracted, but do not label the alert complete.',
      'The counterexample tests the end-to-end completeness signal, not just whether HTML parsing returns plausible paper titles.',
      'It is one fixture-backed case—not proof that every WoS alert format or missing-record scenario is handled.',
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
