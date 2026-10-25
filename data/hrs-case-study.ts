export type HrsNode = {
  id: string
  title: string
  caption: string
  explanation: string
  points: string[]
  planned?: boolean
}

export const hrsWorkflow = {
  gmail: {
    id: 'gmail', title: 'Gmail intake', caption: 'Find recent publication alerts',
    explanation: 'Search the last 30 days of Google Scholar and Web of Science alerts, then compare Gmail message IDs with saved processing state.',
    points: ['Skip previously processed messages using durable checkpoints.', 'Page through matching emails instead of assuming the first page is complete.', 'A pause longer than the search window needs an explicit backfill plan.'],
  },
  source: {
    id: 'source', title: 'Identify the source', caption: 'Choose the matching parser',
    explanation: 'The sender identifies whether an alert came from Google Scholar or Web of Science. Each source has a different email structure.',
    points: ['Extract the HTML message body.', 'Route it to a source-specific parser rather than one set of selectors for every format.'],
  },
  scholar: {
    id: 'scholar', title: 'Google Scholar parser', caption: 'Extract the Scholar alert format',
    explanation: 'Turn Scholar email entries into structured paper candidates while retaining the available source information.',
    points: ['Capture titles, links and available alert metadata.', 'Saved email fixtures make parser changes repeatable to check.', 'An extracted title can still be bad source data; parsing alone does not verify article identity.'],
  },
  wos: {
    id: 'wos', title: 'Web of Science parser', caption: 'Extract the WoS alert format',
    explanation: 'Read individual records and their WoS identifiers. Compare the extracted count with the total reported by the alert.',
    points: ['Keep the WoS record ID, title, link and available metadata.', 'An email can contain fewer records than its reported result total; this is recorded as partial.', 'Fixture tests cover single-record and multi-record alerts.'],
  },
  storage: {
    id: 'storage', title: 'Save papers + deduplicate', caption: 'Keep identity separate from alert history',
    explanation: 'Persist papers and their appearances in alerts, then check candidate processing state before repeating downstream work.',
    points: ['One paper may appear in several emails; retain those occurrences.', 'Paper processing and email checkpoints serve different recovery purposes.', 'New local identity guards preserve distinct known DOIs; these improvements are separate from the dated cloud release.'],
  },
  title: {
    id: 'title', title: 'Already in HRS?', caption: 'Check by normalized title',
    explanation: 'Query HRS and compare normalized titles. An existing match does not need a new manual-entry candidate.',
    points: ['A known match is marked already in HRS.', 'Otherwise, continue to PubMed for publication metadata.', 'The newer local title-quality guard diverts suspicious author-list titles to review instead of title-only matching.'],
  },
  titleSkip: {
    id: 'title-skip', title: 'Skip new entry', caption: 'Already in HRS',
    explanation: 'Record the existing HRS match and avoid creating a duplicate entry task.',
    points: ['This is a known-record check, not an AI relevance decision.'],
  },
  pubmed: {
    id: 'pubmed', title: 'Reliable PubMed match?', caption: 'Resolve publication metadata',
    explanation: 'Search PubMed for a reliable title match and retrieve the matched record’s PMID, DOI, authors and journal.',
    points: ['A match provides identifiers for a second HRS check.', 'No reliable match remains a human-review item; it is not silently discarded.', 'PubMed membership does not prove that a paper used HRS data.'],
  },
  unmatched: {
    id: 'unmatched', title: 'Manual review', caption: 'No reliable PubMed match',
    explanation: 'Preserve the candidate in the review queue for a person to investigate.',
    points: ['Export it to the review Sheet and CSV.', 'The local retry/correction tools can later revisit unmatched records without resetting Gmail checkpoints.'],
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
    id: 'ai', title: 'AI screening', caption: 'Future screening step', planned: true,
    explanation: 'Planned: use article evidence to suggest whether a publication actually uses HRS data. The current pipeline goes directly to human review.',
    points: ['This node is a placeholder for functionality still being developed.', 'Keep the reason and supporting evidence available to the reviewer.', 'No model runs from this portfolio page.'],
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
