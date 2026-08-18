# AP African American Studies — May 2027 release evidence

Status: **independent clean-room review PASS; exact reviewed content candidate pinned**

Exact independently reviewed candidate: `08f7419be677d2ec4f9cb607928946266cce98b9`.

## Authoritative specification

Re-verified independently on 2026-08-18 against current College Board primary sources for the 2026-27 / May 2027 exam cycle:

- AP Central course page: https://apcentral.collegeboard.org/courses/ap-african-american-studies
- AP Central exam page: https://apcentral.collegeboard.org/courses/ap-african-american-studies/exam
- AP African American Studies Course and Exam Description linked from AP Central.
- Current AP African American Studies Clarifications and Corrections linked from AP Central.

The exam is fully digital in Bluebook. Section I multiple choice is **60 questions in 70 minutes and 60% of the exam score**. Questions usually appear in sets of 3–4 questions using 1–2 sources. College Board states that approximately half of Section I source material is drawn from required sources in the course framework, with the remainder unfamiliar material connected to required course content.

The application intentionally provides **Section I MCQ practice only**. The official assessment also includes the Exam Day Validation Question for the Individual Student Project, short-answer questions, a document-based question, and the separately completed course project; the product preflight states this limitation.

Published Section I unit bands:

| Unit | College Board band | 60-question count envelope |
|---|---:|---:|
| U1 Origins of the African Diaspora | 20–25% | 12–15 |
| U2 Freedom, Enslavement, and Resistance | 30–35% | 18–21 |
| U3 The Practice of Freedom | 20–25% | 12–15 |
| U4 Movements and Debates | 20–25% | 12–15 |

The course framework continues to assess disciplinary knowledge, source analysis across text/visual/data sources, and argumentation. Course Audit materials require use of the framework's primary/required sources. Current clarification/correction material does not alter the Section I count, timing, source-set structure, or four unit weighting bands used by this candidate.

## Browser-effective inventory reviewed

The independent review evaluated the bank exactly as the browser constructs it from `index.html`, in production layer order.

- **238 MCQs** from **12 AP AAS browser data layers**.
- **74 intact source groups**, exactly one for each course topic represented across Units 1–4.
- 58 three-question groups and 16 four-question groups.
- **39 / 74 required-source groups**; 35 unfamiliar/synthetic groups.
- Four unfamiliar quantitative-table groups.
- Four unfamiliar local visual groups with meaningful accessibility text.
- Required-source practice uses original summaries/descriptions rather than reproducing protected source text.

Final browser layer order:

1. `data/ap-african-american-studies.js`
2. `data/ap-african-american-studies-set-expansion.js`
3. `data/ap-african-american-studies-required-sources-1.js`
4. `data/ap-african-american-studies-quality-diversity-1.js`
5. `data/ap-african-american-studies-quality-explanations-1.js`
6. `data/ap-african-american-studies-quantitative-1.js`
7. `data/ap-african-american-studies-visual-1.js`
8. `data/ap-african-american-studies-required-sources-2.js`
9. `data/ap-african-american-studies-independent-review-fixes.js`
10. `data/ap-african-american-studies-synthetic-depth-fixes.js`
11. `data/ap-african-american-studies-synthetic-claim-fixes.js`
12. `data/ap-african-american-studies-source-use-balance-fixes.js`

## Independent clean-room findings and repairs

The initial independent review did **not** pass the earlier `ce04e9b...` candidate. Substantive findings were repaired before the review was restarted:

1. Late required-source overlays had left some browser-effective questions analyzing superseded evidence. Examples included a Brookes-diagram group retaining a ship-log question and overclaims in the Oshe Shango and Chafariz d'El-Rey groups.
2. Repetitive source-analysis templates and generic methodology items made too many questions partly answerable without substantive engagement with their stimulus or topic.
3. Twenty-seven synthetic text groups used a first keyed answer too close to the stimulus thesis, creating an AP-level difficulty/cue problem.
4. Stacked absolute-language distractors created elimination tells in reviewed items.
5. Required-source third questions remained overly generic after the first repair and were replaced with source-specific historical contextualization tasks.
6. A stale quality harness loaded only the older eight-layer bank while the generic browser audit loaded the actual later stack. The harness now derives the AP AAS stack directly from `index.html`.
7. Required-source source-use questions and several residual items produced an excessive uniquely-longest-key signal. Their competitors/keys were rewritten as parallel, substantive choices rather than weakening audit thresholds.

Permanent regressions now enforce browser-effective source grounding, source-specific contextualization, non-verbatim synthetic interpretation tasks, absence of the superseded generic scaffolds, no stacked absolute-language distractor tells, required-source q2 option parallelism, intact 74-group structure, quantitative recomputation, and visual accessibility/source analysis.

## Fresh post-repair independent review — PASS

After the final repair, the independent review was restarted from scratch on exact content candidate `08f7419be677d2ec4f9cb607928946266cce98b9`.

The fresh pass produced **zero substantive findings** across:

- all 74 browser-effective topic/source groups;
- factual/source identity and topic alignment;
- skill/task alignment;
- answer and rationale correctness;
- historical nuance, agency, and avoidance of stereotyping or flattening;
- ambiguity and distractor plausibility;
- source-analysis validity and stimulus dependence;
- templating and near-duplication review;
- answer-length and absolute-language cues;
- AP-level difficulty;
- all four quantitative groups;
- all four visual groups and their accessibility metadata.

### Quantitative independent recomputation

- Topic 1.2: rainfall indices 1/3/6/9 and settlement-density indices 1/3/6/4 correctly show that the highest rainfall value does not correspond to the highest settlement-density value.
- Topic 2.2: combined voyage values recompute to 27, 27, 46, and 10; West Central Africa is correctly largest at 46.
- Topic 3.2: sample counts 18, 24, 15, and 21 correctly make 'Seeking child' the largest category at 24.
- Topic 4.16: Protestant-affiliation values 42%, 51%, and 68% rise across the displayed age groups; the nativity figures do not rise monotonically.

### Visual review

The four unfamiliar local visuals—language-family diffusion, resistance-memory poster, formal portrait/self-presentation schematic, and natural-hair cultural-pride poster—are honestly identified as synthetic practice visuals. Their SVG/stimulus accessibility descriptions are meaningful without simply revealing the answer, and the associated questions require observation, contextualization, or source comparison.

## Exact-head automated evidence

GitHub Actions Test workflow **run #1464**, Actions run `32193764644`, validated exact reviewed candidate `08f7419be677d2ec4f9cb607928946266cce98b9` against current `main` baseline `3fe1795a0099bb0712388c1608295b2af6caf206`.

Full repository gate:

- **321 / 321 tests passed**.
- Build passed.
- Public artifact check passed.
- `npm audit --omit=dev`: **0 vulnerabilities**.
- While AP AAS remained `draft`, the built public artifact correctly excluded it.

Generic browser-effective AP AAS release audit:

- **238 questions from 12 browser data layers**.
- Uniquely-longest correct option: **23.9%** (project ceiling ≤25%).
- Exploitable among-longest correct option: **29.8%**.
- Mean option length: **21.14 correct vs 21.53 distractor words**.
- Raw correct positions: **A 25.2%, B 24.8%, C 26.5%, D 23.5%**.
- Stimulus groups: **74**.
- **5,000 / 5,000 valid 60-question forms**.
- Generic retake overlap: **29.2% average shared questions**.
- Parallel quality simulation: **29.4%**.
- Stacked absolute-language distractor gate: pass.
- Four quantitative recomputation gates: pass.
- Four visual/accessibility/source-analysis gates: pass.

## Independent gate result

**PASS — zero substantive findings on the fresh post-repair review of exact content SHA `08f7419be677d2ec4f9cb607928946266cce98b9`.**

This SHA is the pinned reviewed course/content candidate. Subsequent release commits may change release evidence or the AP AAS registry `releaseStatus`, but must not mutate the reviewed AP AAS question/stimulus content without invalidating this sign-off and requiring another independent review.

## Promotion and integration

The independent gate is complete. The remaining workflow is release-only:

1. Promote only AP African American Studies from `draft` to `released`.
2. Create a fresh ephemeral integration branch from then-current `main`.
3. Integrate the exact reviewed candidate plus release-only promotion/evidence commits.
4. Run exact-head full CI and the 5,000/5,000 AP AAS audit.
5. Build and inspect `_site` with AP AAS included.
6. Merge only the exact green integration candidate to `main`.
7. Verify exact-main CI, Pages deployment/artifact, public catalog card, preflight, and exam start path before making a production release claim.
