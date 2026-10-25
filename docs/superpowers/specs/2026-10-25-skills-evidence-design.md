# Skills evidence improvements

Approved in chat: improve the existing skills map with complete, verified project/repository/role connections, counts, understandable evidence cards, hover/focus preview and click/tap pinning. Preserve the lunar portfolio design. The user requested and received a separate push of existing work (5620df2) before implementation, then explicitly asked to continue.

Use a dated static snapshot of public repository languages plus curated, cited technology connections. Language bytes describe repository composition, not personal proficiency; imported Unity assets can dominate these statistics. Show the reason and source for each connection. Do not infer frameworks from a language, or publish private Unity source. Keep existing résumé-only skills even when no detailed evidence exists. Add TypeScript, Unity and other directly supported technologies to the portfolio list without claiming they came from the résumé.

Approaches considered: exact case-study tags only (current behavior misses repositories and conceptual connections); runtime GitHub requests (introduces visitor network/rate-limit dependency); static, sourced evidence graph (chosen recommendation, approved by user). Keep archive metrics and their old snapshot unchanged.

Interaction: counts on chips, stable preview when moving into result links, explicit pinned state, keyboard support and touch selection with nearby results. Filter skills by name and evidence by project/repository/experience. Provide plain accessible content and honest empty states. No new dependencies. Existing unrelated site contrast failures are recorded separately.
