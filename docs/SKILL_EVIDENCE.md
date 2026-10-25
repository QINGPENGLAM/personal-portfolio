# Skills evidence

The skills page connects portfolio skills to case studies, published roles and the 39 repositories in the existing archive. A case study and its public repository share one connection. TypeScript, Next.js and Unity extend the résumé-derived list using project evidence; they are not described as résumé entries.

## Sources and boundaries

- `data/skill-repositories.json`: all 39 language breakdowns read from GitHub's public repository languages API on 2026-10-25. Both primary and secondary languages count. Language bytes are file composition, including third-party code; they are not ownership, time spent or proficiency measures.
- `data/skill-manifests.json`: seven public package manifests inspected on that date, with source URLs and Git blob SHAs. Only specifically mapped dependencies produce skill connections. A JavaScript repository does not automatically imply React or Node.js.
- `data/skill-unity-sources.json`: three concrete gameplay scripts inspected for UnityEngine usage, with source URLs and blob SHAs. This avoids treating the dominant ShaderLab/HLSL totals as gameplay-language evidence. The empty UnityKitchenGame repository has no connection.
- `data/skill-evidence.ts`: explicit, reviewable concept-to-case-study mappings (embeddings, agents, model serving, tests). These cite existing published descriptions, not new code verification or operational claims.
- `lib/skills.ts`: normalizes case/whitespace, merges duplicate case-study/repository connections, resolves HRS workflow connections and preserves honest empty results.

The old repository archive and deployment snapshot retain their original 2026-08-16 dates. This change does not refresh or reverify live demos, broaden the archive inventory, publish private Unity source or claim authorship of every file in a repository. No visitor-time GitHub requests or credentials are needed.

## Updating

Inspect the actual source before adding a framework or conceptual connection. Refresh language records with the read-only `gh api repos/QINGPENGLAM/REPOSITORY/languages` endpoint, retain empty breakdowns as empty objects, record the real observation date and do not silently omit failed requests. Match all archive names exactly. Inspect dependency manifests and gameplay scripts separately; retain their returned source URLs and blob SHAs. Run `tests/skills.test.ts` and the skills browser tests after refreshing.

## Interaction

Pointer hover previews a skill; the preview remains stable while crossing into the evidence panel. Leaving the explorer restores the pinned selection. Keyboard focus previews, Enter/Space pins and moves focus to the panel, and Escape restores the pinned selection. A later keyboard focus supersedes an older mouse hover. Mobile taps show the chosen evidence below the chips and provide a return-to-skills button. Search filters skill chips; source buttons filter the active skill's evidence without changing its total count.
