# Public project codebase audit

Audit date: 2026-08-11  
GitHub account: [QINGPENGLAM](https://github.com/QINGPENGLAM)  
Scope: all 39 repositories currently visible as public source repositories on the account.

## What this audit means

This is a source-level portfolio review, not a claim that every historical project was rebuilt in its original toolchain. For every public repository, the default-branch tree was inspected, every available root README was read, and representative entry points, manifests, state/data layers, and core implementation files were reviewed. Large media repositories were inspected with sparse, on-demand source retrieval.

The separate `/Users/qp2333/Documents/Codex/` registry was also located after the public pass. It contains 15 governed project workspaces, including fuller local development evidence for several public repositories and local-only projects. Local evidence can strengthen internal understanding, but it does not make missing source recruiter-visible on GitHub; this document therefore keeps **public evidence** and **local evidence** separate.

Private repositories are intentionally outside this publishable report. Generated dependencies, vendored packages, media assets, and full Git history were not treated as authored implementation evidence. Runtime behavior is described as verified only when it was already supported by repository evidence or a direct live check; otherwise the descriptions below are code-derived.

## Executive findings

- The public inventory contains exactly **39 repositories**.
- **23 repositories have a root README**. Several are only a title, a starter-template README, or an assignment label; **16 have no root README at all**.
- The strongest public engineering evidence is concentrated in `personal-portfolio`, `project-0006-immich-ai-photo-search-mvp`, `AI-Town`, `HandMotionMusic`, `AutoPoster`, `project-0008-linear-clock-dial-lab`, `myOwnRedis`, `Raytracer`, and `project1`.
- `project-0007-personal-ai-workbench` is a documented product evaluation built around official Open WebUI, not a custom AI application.
- `project-0009-montage-product-video-generator` publishes documentation, screenshots, and a rendered result on GitHub, but not the product-video generator source described by the README. A fuller Next.js/Remotion implementation exists in the local Codex workspace.
- `UnityKitchenGame` is empty, `PersonalPortfolio` contains only Git LFS configuration, and `discussion1` contains only a README.
- The current Next.js portfolio is live. A direct check on 2026-08-11 returned HTTP 200, the title `QingPeng Lam · Software Engineer`, and Next.js static assets under `/personal-portfolio/_next/`.
- The biggest portfolio opportunity is documentation, not another new project: several technically interesting repositories are nearly impossible for a recruiter to evaluate from GitHub alone.

### README remediation follow-up

On 2026-08-11, tailored README changes were completed for all 16 repositories that lacked one. Fifteen isolated pull requests were squash-merged into `main`, and the empty `UnityKitchenGame` repository received an honest placeholder README as its required first commit. See [`README_UPGRADE_PRS_2026-08-11.md`](README_UPGRADE_PRS_2026-08-11.md) for the complete merge index and validation record.

## Recommended recruiter-facing hierarchy

### Lead with these

1. **personal-portfolio** — best evidence of production-minded frontend architecture, accessibility, testing, static deployment, and an optional 3D experience.
2. **project-0006-immich-ai-photo-search-mvp** — strongest public full-stack/AI pipeline with ingestion, format recovery, metadata, embeddings, hybrid retrieval, deduplication, and deletion.
3. **AI-Town** — coherent local simulation architecture with deterministic world progression, persistent rooms, character relationships, and no paid service dependency.
4. **HandMotionMusic** — distinctive browser interaction project combining hand tracking, calibration, real-time audio, game state, and accessibility fallback controls.
5. **AutoPoster** — clean, reproducible generative-design system with deterministic seeds, URL state, configurable composition, and export.

### Use as supporting technical evidence

- **myOwnRedis** for networking and data structures, after a correctness review and a real README.
- **Raytracer** for graphics/math fundamentals, after build instructions and sample-output documentation.
- **project1** for algorithmic pathfinding and careful input/output behavior.
- **project-0008-linear-clock-dial-lab** for offline-first product thinking and optional Supabase synchronization.
- **arthistory-RPG** for Unity gameplay systems, after separating authored code from third-party assets and adding documentation.

### Keep in the archive, not the main recruiter path

Course exercises, static storefronts, early games, duplicates, empty repositories, and evidence-only tool evaluations are useful history. They should remain searchable without receiving the same visual priority as current engineering work.

## Repository-by-repository review

### Current products and experiments

#### 1. `personal-portfolio`

- **README:** Detailed, but its former “not deployed” boundary became stale after the push.
- **What the code is:** Next.js 16, React 19, strict TypeScript, Zod-validated content, React Three Fiber/Three.js, static export, recruiter-first routes, an optional procedural 3D world, case studies, repository evidence views, contact-worker contract, SEO, accessibility, and analytics boundaries.
- **Engineering evidence:** Content is separated into validated `data/` modules; 3D rendering is lazy and guarded by reduced-motion, quality, and WebGL fallbacks; Vitest and Playwright cover semantic, accessibility, mobile, static-export, and selected world flows.
- **Assessment:** The most complete public repository. Keep it first and keep deployment facts current.
- **Next cleanup:** Update the dated GitHub snapshot after this audit, replace remaining approved-content placeholders, and recheck the public deployment after future releases.

#### 2. `project-0010-n8n-workflow-hub-demo`

- **README:** Detailed and candid about the workflow evaluation.
- **What the code is:** A local n8n-oriented workflow demonstration plus a small Node HTTP server that accepts an HTTP(S) URL, retrieves a text representation through `r.jina.ai`, selects the first three sentences, appends a CSV record, and triggers a macOS notification.
- **Engineering evidence:** The public source proves the no-key summarizer server and workflow documentation. It is intentionally simple heuristic extraction, not an AI summarization model.
- **Assessment:** Useful automation experiment, but not a production workflow platform.
- **Next cleanup:** Remove local database/log artifacts from the public repository, add a sanitized workflow export, document error/security boundaries, and avoid calling the three-sentence heuristic “AI.”

#### 3. `project-0009-montage-product-video-generator`

- **README:** Detailed, but stronger than the public source evidence.
- **What the repository contains:** Evaluation notes, decisions, screenshots, reference-analysis documentation, and a rendered MP4 deliverable.
- **What is missing publicly:** The Montage/Remotion application source, reference analyzer, media resolver, composition code, and tests described by the documentation.
- **Local evidence:** The Codex workspace contains a `source-montage` Next.js/Remotion tree with reference-analysis API routes, a media resolver, UI tooling, reusable compositions, and the rendered demo inputs. This changes the internal conclusion from “implementation unknown” to “implementation exists locally,” but it does not change what a recruiter can inspect in the public repository.
- **Assessment:** Real local implementation with an artifact/evidence-only public repository.
- **Next cleanup:** Either publish the sanitized source or relabel the repository and portfolio entry as an evaluation/render artifact. Do not imply that visitors can inspect the generator implementation here.

#### 4. `project-0007-personal-ai-workbench`

- **README:** Strong experimental report with limitations.
- **What the repository contains:** Docker/Open WebUI setup evidence, PDF retrieval testing, source/citation screenshots, health checks, and decisions around a local Qwen model and Nomic embeddings.
- **What the code proves:** Successful evaluation of an existing Open WebUI stack. It does not contain a custom RAG application or authored model-serving layer.
- **Assessment:** Honest tool evaluation and reproducible evidence; weaker as a software-engineering code sample.
- **Next cleanup:** Present it as “local RAG workbench evaluation” and foreground the experiment design, observed weak answer quality, and reproducibility rather than product ownership.

#### 5. `project-0006-immich-ai-photo-search-mvp`

- **README:** Detailed and consistent with the implementation.
- **What the code is:** Node/Express photo ingestion and search application using Multer, Sharp, EXIF extraction, Transformers.js captioning and embeddings, JSON-backed library state, queued indexing, thumbnails, exact SHA-256 deduplication, hybrid lexical/vector ranking, filters, deletion, and a browser UI.
- **Engineering evidence:** Handles resumable indexing, metadata preservation, model-loading state, exact duplicate rejection, and a macOS `sips` fallback for HEIC conversion.
- **Assessment:** Strongest public AI/full-stack project. The “Immich” name may imply integration with the Immich product even though this is a standalone MVP; explain that relationship clearly.
- **Next cleanup:** Add architecture and UI screenshots, tests for search/dedupe/delete/restart behavior, persistence limitations, privacy/storage warnings, and non-macOS HEIC behavior.

#### 6. `project-0008-linear-clock-dial-lab`

- **README:** Detailed and clearly documents the pivot to an evening reflection journal.
- **What the code is:** Static offline-first PWA with localStorage, deterministic template-generated journal narratives, history search, service-worker caching, and optional Supabase magic-link authentication plus a one-row-per-user snapshot sync protected by row-level security.
- **Engineering evidence:** Local data normalization, offline shell, user-scoped RLS policies, snapshot upsert/restore, and last-write-wins synchronization are visible in source.
- **Assessment:** Good product and resilience thinking. It is not an LLM journal and should not be presented as one.
- **Next cleanup:** Explain conflict behavior, encrypt-or-minimize sensitive journal data, add migration/export/delete flows, and test offline-to-online reconciliation.

#### 7. `AI-Town`

- **README:** Detailed and appropriately states that the simulation is local and zero-cost.
- **What the code is:** Dependency-light Node server plus browser client. Rooms persist to JSON, multiple players can join, messages and character relationships influence deterministic daily story progression, and seeded generation controls locations, events, weather, memories, and visual direction.
- **Engineering evidence:** Clear separation between HTTP/state handling, deterministic simulation engine, local story templates, provider abstraction, and UI.
- **Assessment:** Strong architecture and an interesting interactive system. The current “AI” behavior is deterministic simulation/template generation, not model inference.
- **Next cleanup:** Add tests around room concurrency, migrations, daily advancement, and malformed state; document persistence and multi-process limitations.

#### 8. `QINGPENGLAM`

- **README:** This is the GitHub profile README.
- **What it is:** Profile introduction, contact links, animated visual elements, and a large technology-badge catalog.
- **Assessment:** Useful profile surface, but the broad badge list communicates familiarity without proving depth and competes with the strongest project evidence.
- **Next cleanup:** Reduce badges to defensible current strengths, feature three to five audited projects, and align wording with the current résumé and portfolio.

#### 9. `HandMotionMusic`

- **README:** Detailed and representative of the code.
- **What the code is:** MediaPipe Hands camera tracking, handedness handling, landmark-distance gestures, smoothing/hysteresis, three-step calibration, a Web Audio synthesizer and scheduler, rhythm-game lanes/notes/scoring, procedural song charts, particles, camera/manual modes, and accessibility announcements.
- **Engineering evidence:** Real-time sensor processing is isolated from audio and game logic; mouse/manual fallback preserves play when camera tracking is unavailable.
- **Assessment:** Distinctive and recruiter-friendly creative-development project.
- **Next cleanup:** Add automated tests for gesture classification and timing windows, document browser/CDN/privacy constraints, and include a short demo video or GIF.

#### 10. `AutoPoster`

- **README:** Missing.
- **What the code is:** Vite/p5 generative poster system with a seeded PRNG, multiple layout families, configurable palette/density/chaos/focus/grain, 1080×1440 canvas output, shareable URL state, and PNG export.
- **Engineering evidence:** Deterministic seed/state handling makes a creative canvas reproducible rather than purely random.
- **Assessment:** Strong creative-coding project hidden by absent documentation.
- **Next cleanup:** Add a README with design-system concepts, controls, reproducibility, architecture, screenshots, run commands, and export behavior.

### Systems, algorithms, graphics, and Unity

#### 11. `myOwnRedis`

- **README:** Missing.
- **What the code is:** C++ nonblocking TCP key-value server using `poll`, length-prefixed/TLV messages, GET/SET/DEL/KEYS commands, intrusive hash tables with incremental rehashing, AVL trees, and sorted-set data structures/tests.
- **Engineering evidence:** Substantial low-level networking and data-structure work. Sorted-set code exists, but the visible server command surface does not expose it.
- **Correctness risk:** The incremental hash-map direction deserves review: primary inserts appear to remain in the table being migrated while buckets move into the larger table, which can make insertion into an already migrated bucket unsafe before resize completion.
- **Next cleanup:** Treat correctness review as blocking, add a build system and protocol specification, expose or remove unused sorted-set code, add integration/fuzz/sanitizer tests, and write a serious README.

#### 12. `Raytracer`

- **README:** Missing.
- **What the code is:** Single-file C++ ray tracer with vector math, object polymorphism, spheres, planes, triangles, boxes, cylinders, shadows, recursive reflection/refraction, diffuse lighting, several scenes, and PPM output.
- **Assessment:** Valuable graphics fundamentals, but difficult to build or evaluate without documentation and images.
- **Next cleanup:** Add CMake or a documented compiler command, sample renders, scene descriptions, recursion/performance notes, authorship context, and correctness tests for intersections.

#### 13. `project1`

- **README:** Present as `README.txt`; primarily records timing results.
- **What the code is:** C++ multi-level ship route solver supporting map/list input, BFS with a queue or DFS with a stack, elevator transitions, path reconstruction, and map/list output modes.
- **Assessment:** Good algorithm/coursework evidence. The repository name is too generic for discovery.
- **Next cleanup:** Rename or retitle it clearly in the README, document input/output contracts and commands, include a small example, and separate assignment constraints from authored decisions.

#### 14. `arthistory-RPG`

- **README:** Missing.
- **What the code is:** Unity third-person/click-to-move RPG with NavMesh movement, camera-relative controls, right-click focus/interaction, combat stats, enemies, inventory/equipment, item pickup, and dialogue/proximity systems.
- **Engineering evidence:** About 23 authored C# scripts coexist with a large third-party asset/post-processing tree.
- **Assessment:** Interesting system breadth, but authorship boundaries are opaque and the repository is asset-heavy.
- **Next cleanup:** Add a README, gameplay video, Unity version, setup steps, controls, architecture, credited assets/licenses, and an explicit authored-code map.

#### 15. `UnityKitchenGame`

- **README:** Missing.
- **What the repository contains:** No committed project files on the default branch.
- **Assessment:** Empty repository; it provides no portfolio evidence.
- **Next cleanup:** Restore the intended source or archive/delete the repository.

#### 16. `cube-game`

- **README:** Missing.
- **What the code is:** Unity 3D endless-runner prototype: a Rigidbody cube receives constant forward force, A/D/space movement, obstacle collision, end-trigger completion, scene restart, and distance-based scoring.
- **Assessment:** Clear early Unity exercise. Old Ads/Purchasing dependencies add noise without visible portfolio value.
- **Next cleanup:** Document Unity version and controls, remove unused packages, add gameplay capture, and classify it as an early prototype.

#### 17. `random-spawn-dodge`

- **README:** Missing.
- **What the code is:** Unity 2D dodge prototype with clamped horizontal movement, repeated obstacle rows containing a safe lane, increasing gravity, slow-motion death/restart, and time-based score.
- **Assessment:** Compact and understandable early game prototype.
- **Next cleanup:** Add a README/video, identify original versus tutorial-derived work, document controls, and remove generated/vendor noise.

### React applications, portfolios, and client work

#### 18. `Portfolio`

- **README:** Default Create React App documentation; it does not explain the portfolio.
- **What the code is:** Earlier React 19 portfolio with hardcoded projects/metrics, intersection-observer navigation, scroll progress, animated sections, and an interactive visual signal element.
- **Assessment:** A useful design iteration, but duplicated by `personal-portfolio` and potentially carrying stale or weakly sourced numeric claims.
- **Next cleanup:** Mark it clearly as the legacy portfolio, remove or source every metric, replace the default README, and link visitors to the current site.

#### 19. `PersonalPortfolio`

- **README:** Missing.
- **What the repository contains:** Only `.gitattributes`/Git LFS configuration; no inspectable portfolio source.
- **Assessment:** Empty duplicate from a visitor’s perspective.
- **Next cleanup:** Archive it or restore the intended code with documentation.

#### 20. `FITgym`

- **README:** One sentence.
- **What the code is:** React/Vite/Tailwind workout generator driven by training split, target muscles, and goal. A substantial local exercise dataset drives compound/accessory ratios, reps, rest, tempo, and generated sessions.
- **Assessment:** More implementation than the README suggests, but it lacks persistence, validation, tests, and provenance/safety context for exercise advice.
- **Next cleanup:** Replace the README, remove an unprofessional source comment, avoid mutating shared arrays during shuffle, add empty-state/input tests, and state that workouts are informational rather than medical guidance.

#### 21. `NASA-REACT`

- **README:** One sentence.
- **What the code is:** React/Vite NASA Astronomy Picture of the Day viewer using `VITE_NASA_API_KEY` and a daily localStorage cache.
- **Assessment:** Small API exercise. Error and loading states are incomplete.
- **Next cleanup:** Replace `localStorage.clear()` with removal of the app-owned key, add visible failure/loading behavior, document API setup/rate limits, and write tests.

#### 22. `todolist`

- **README:** Default Vite template, not project documentation.
- **What the code is:** Small React CRUD todo app persisted in localStorage.
- **Assessment:** Basic learning exercise. Editing deletes and re-adds an item rather than updating stable identity, and validation is minimal.
- **Next cleanup:** Add a project README, stable IDs, input validation, keyboard/accessibility behavior, and a few unit tests—or keep it quietly in the archive.

#### 23. `client_project_w25`

- **README:** Starter/assignment documentation rather than a finished-project overview.
- **What the code is:** Multi-page University of Michigan student-success resource site with accessible navigation/images, several content pages, carousels, a Formspree feedback form, and small JavaScript enhancements.
- **Assessment:** Solid course/client content work, but the repository should clarify team/client context and individual contribution.
- **Next cleanup:** Add an outcome-focused README, authorship/team boundaries, accessibility decisions, deployment link, and screenshots.

### Static sites, course exercises, and early web projects

#### 24. `hw6-2025`

- **README:** Assignment label only.
- **What the code is:** JavaScript custom video controls for play/pause, playback speed, skip, mute/volume, and a vintage visual filter.
- **Assessment:** Focused DOM/media course exercise; keep in archive.

#### 25. `dicussion9-JS`

- **README:** Assignment label only.
- **What the code is:** University of Michigan football-themed DOM-manipulation exercise.
- **Assessment:** Course exercise; the repository name also contains the historical `dicussion` typo.

#### 26. `hw5_2025`

- **README:** Assignment label only.
- **What the code is:** Responsive pricing/gallery flexbox exercise.
- **Assessment:** Course evidence, not a flagship project.

#### 27. `discussion8-form`

- **README:** Assignment label only.
- **What the code is:** Styled recommendations form submitted through Formspree.
- **Assessment:** Small form/accessibility exercise; archive placement is appropriate.

#### 28. `hw3_2025`

- **README:** Assignment label only.
- **What the code is:** Responsive CSS Grid company-layout exercise.
- **Assessment:** Course exercise.

#### 29. `hw2-w25`

- **README:** Assignment label only.
- **What the code is:** Basic HTML/CSS page explaining commonly misplayed Uno rules.
- **Assessment:** Early course exercise.

#### 30. `hw1-w25`

- **README:** Assignment label only.
- **What the code is:** Introductory multi-page personal website.
- **Assessment:** Early course exercise.

#### 31. `discussion1`

- **README:** Present, but it is the only meaningful file.
- **What the repository contains:** No application/source implementation.
- **Assessment:** Archive or remove; it adds no code evidence.

#### 32. `Econbusiness`

- **README:** Missing.
- **What the code is:** Static bracelet/product storefront landing page with responsive menu behavior and product imagery.
- **Assessment:** Visual web exercise; no commerce backend, checkout, or durable cart.
- **Next cleanup:** Label it as a static storefront prototype and add credits/licenses for visual assets.

#### 33. `XIWENPORT`

- **README:** Missing.
- **What the code is:** Static art/design portfolio branded “XIWEN MARK PORTFOLIO.”
- **Assessment:** Ownership/client context is unclear, which is more important than technical complexity here.
- **Next cleanup:** State whose portfolio it is, the role performed, permission to publish, and whether the design/content/code were original.

#### 34. `gov-project`

- **README:** Missing.
- **What the code is:** Static “American Dream” questionnaire/results/summary site with no active JavaScript application logic.
- **Assessment:** Content/presentation project, not an interactive data product.
- **Next cleanup:** Explain project context and remove any wording that implies live questionnaire processing if results are static.

#### 35. `topicshare`

- **README:** Missing.
- **What the code is:** Large static educational reference site with roughly 80 topic pages covering calculus, algebra, discrete math, macroeconomics, SAT grammar, C++, computer science, and Morse code. The shared JavaScript file is empty.
- **Assessment:** Significant content volume, but little software architecture and unclear content provenance.
- **Next cleanup:** Add navigation/search, a reusable content template or generator, accessibility review, sources/licensing, and a README explaining authorship.

#### 36. `E-Commerce`

- **README:** Missing.
- **What the code is:** Multi-page static fashion catalog with responsive navigation, product pages, gallery image switching, account/cart layouts, and repeated inline scripts.
- **Assessment:** Frontend mockup, not a functioning e-commerce system; no backend, inventory, authentication, durable cart, or payments are evident.
- **Next cleanup:** Call it a storefront UI prototype, consolidate repeated markup/scripts, add accessible semantics, and credit assets.

#### 37. `food-ordering-`

- **README:** Missing.
- **What the code is:** Static JavaScript food-ordering UI with six cuisine categories, generated menu cards, in-memory cart, quantity changes, totals, responsive cart relocation, and address prompts.
- **Assessment:** More functional than a static mockup, but checkout/order persistence/backend behavior are absent.
- **Next cleanup:** Add a README, stable item IDs, local persistence, accessible cart controls/dialog behavior, validation, and separation between data, rendering, and state.

#### 38. `Tic-Tac-Toe`

- **README:** Missing.
- **What the code is:** Browser tic-tac-toe game where the user plays O against an X computer using full minimax search, with replay support.
- **Assessment:** Good compact algorithm exercise.
- **Next cleanup:** Add a README explaining minimax, terminal scoring, controls, and tests for wins/draws/optimal moves.

#### 39. `Calculator`

- **README:** Missing.
- **What the code is:** Class-based browser calculator implementing clear, delete, display formatting, and the four basic arithmetic operations.
- **Correctness issue:** A percent button is wired as an operation, but the computation switch does not implement `%`, so the displayed control does not work correctly.
- **Next cleanup:** Fix or remove percent, handle divide-by-zero/keyboard input, add tests, and document supported operations.

## README repair order

### Priority 0 — fix evidence or correctness first

1. `project-0009-montage-product-video-generator`: publish source or correct the public claim boundary.
2. `myOwnRedis`: investigate incremental rehash correctness before promoting it.
3. `UnityKitchenGame`, `PersonalPortfolio`, `discussion1`: restore meaningful content or archive them.
4. `Calculator`: fix the nonfunctional percent control.
5. `project-0010-n8n-workflow-hub-demo`: remove local runtime database/log artifacts and publish sanitized workflow evidence.

### Priority 1 — strong work currently hidden by documentation

1. `AutoPoster`
2. `Raytracer`
3. `arthistory-RPG`
4. `myOwnRedis` after correctness review
5. `FITgym`
6. `Tic-Tac-Toe`

### Priority 2 — make archive context truthful

- Replace starter READMEs in `Portfolio`, `todolist`, and `client_project_w25`.
- Add short context READMEs to the static storefronts, early games, and educational sites.
- Standardize each README around: purpose, honest scope, stack, architecture, run steps, screenshots/demo, tests, limitations, authorship, and next steps.

## Portfolio claim cross-check

- **DevDoctor:** The portfolio correctly shows no public repository or live demo. Its implementation claims cannot be independently checked through the public GitHub inventory, so keep the explicit evidence placeholders and avoid stronger production wording without approved evidence.
- **Immich AI Photo Search:** The public source supports the ingestion, caption/embedding, metadata, hybrid search, SHA-256 duplicate control, deletion, and HEIC recovery story. Add tests and clarify that it is a standalone MVP rather than implying upstream Immich integration.
- **Public archive:** Repository membership was refreshed on 2026-08-11 and remains 39. Language, activity, Pages, and live-link values in `data/github-repositories.ts` are still a dated 2026-08-06 snapshot and should not be described as current without another metadata/live-link refresh.
- **Current deployment:** The portfolio README’s prior “no deployment performed” language is obsolete. The current Next.js export was directly observed at the public URL on 2026-08-11.
- **Tool evaluations:** Keep `project-0007` and `project-0009` clearly separated from custom application code. Their evidence is useful, but the public repositories do not prove ownership of the underlying Open WebUI or Montage product implementations.

## Practical review checklist

- [ ] The top five recruiter projects match the hierarchy above or have an explicit reason to differ.
- [ ] Every featured repository has a real README, a screenshot/demo, run instructions, architecture, tests, and limitations.
- [ ] No artifact-only or tool-evaluation repository is described as a fully public custom codebase.
- [ ] Empty and duplicate repositories are restored, archived, or clearly labeled.
- [ ] `myOwnRedis` incremental rehash behavior is tested before it is promoted.
- [ ] `Calculator` percent behavior and `NASA-REACT` storage clearing are corrected.
- [ ] Local n8n runtime database/log artifacts are removed or intentionally sanitized.
- [ ] Unity repositories distinguish authored scripts from third-party assets and include license credits.
- [ ] Course exercises remain discoverable in the archive but do not overwhelm the recruiter path.
- [ ] Portfolio metrics and dates are tied to inspectable evidence; no hardcoded decorative number is presented as an outcome.
- [ ] The GitHub repository metadata/live-link snapshot is refreshed before the next public release.
- [ ] The live portfolio is checked after each deployment for title, routes, assets, and case-study links.
