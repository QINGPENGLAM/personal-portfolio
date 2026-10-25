export type HrsNode = {
  id: string
  title: string
  caption: string
  explanation: string
  points: string[]
  planned?: boolean
  visualSteps?: { title: string; detail: string }[]
  outcomes?: string[]
  visualNote?: string
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
    points: ['A match provides identifiers for a second HRS check.', 'No reliable match → AI check (planned).', 'PubMed membership does not prove that a paper used HRS data.'],
  },
  unmatched: {
    id: 'unmatched', title: 'AI check', caption: 'No reliable PubMed match', planned: true,
    explanation: 'Planned: send unmatched candidates to AI screening to help assess whether they use HRS data. Until this step is connected, candidates stay in the review queue.',
    points: ['Use article evidence when the paper’s identity and access permissions can be confirmed.', 'Keep the screening reason and evidence available for staff review.', 'This branch is a placeholder; the screening functionality will be completed later.'],
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
    id: 'ai', title: 'AI screening', caption: 'Opt-in queue stage · disabled by default',
    explanation: 'An optional local pipeline stage. It suggests; staff decide.',
    points: [
      'Optional and disabled by default; this page does not run a model.',
      'AI suggestions do not add or remove HRS records.',
    ],
    visualSteps: [
      { title: 'Match source', detail: 'PMID or one verified article link' },
      { title: 'Read text', detail: 'Abstract first; approved full text if needed' },
      { title: 'Check evidence', detail: 'Exact quotes validated against the source' },
    ],
    outcomes: ['Uses HRS data', 'Mentions only', 'Not enough evidence'],
    visualNote: 'Uncertain or policy-sensitive cases go to staff review.',
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
