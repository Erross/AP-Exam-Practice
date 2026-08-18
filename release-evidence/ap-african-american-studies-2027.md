# AP African American Studies — May 2027 release evidence

Status: **review-ready draft; independent clean-room review still required before promotion**

Candidate recorded here: `ce04e9b88c63c2e8f411ad69bf396b0da4be590a`.

## Authoritative specification

Re-verified on 2026-08-18 against current College Board primary sources for the 2026-27 / May 2027 exam cycle:

- AP Central course page: https://apcentral.collegeboard.org/courses/ap-african-american-studies
- AP Central exam page: https://apcentral.collegeboard.org/courses/ap-african-american-studies/exam
- AP African American Studies Course and Exam Description linked from the AP Central course page.
- AP African American Studies Course and Exam Description Clarifications and Corrections, implemented as of August 2025.

The May 2027 exam is fully digital in Bluebook. Section I multiple choice is **60 questions in 70 minutes and 60% of the exam score**. Questions usually appear in sets of 3–4 questions, each set using 1 or 2 sources. College Board states that approximately half of the source material in Section I is drawn from required sources in the course framework; the remainder is unfamiliar material connected to required course content.

The official exam also contains the 10-minute Exam Day Validation Question for the Individual Student Project, three short-answer questions, one document-based question, and the separately completed Individual Student Project. This application is intentionally **MCQ-only practice**; the registry preflight note states that limitation explicitly.

## Unit weighting bands

| Unit | College Board Section I band | Project constrained count range on 60 MCQs |
|---|---:|---:|
| U1 Origins of the African Diaspora | 20–25% | 12–15 |
| U2 Freedom, Enslavement, and Resistance | 30–35% | 18–21 |
| U3 The Practice of Freedom | 20–25% | 12–15 |
| U4 Movements and Debates | 20–25% | 12–15 |

The canonical registry uses unit-weight midpoints 0.225 / 0.325 / 0.225 / 0.225 and explicitly enforces the published integer-compatible count bands above. `constraintDrawAttempts` is 20,000 so whole-set source grouping and unit constraints can be satisfied together without silently relaxing the blueprint.

## Current College Board clarification sheet

The clarification/correction sheet implemented as of August 2025 records:

- updated credit lines for two required sources in Topic 3.3;
- a repaired hyperlink for the Topic 4.8 required video source;
- a new source note for Topic 4.9;
- addition of the Exam Day Validation Question and scoring guideline to sample exam material;
- updated skill, learning-objective, and essential-knowledge alignments in sample MCQ/FRQ tables;
- terminology/resource-link maintenance.

These clarifications do not change the Section I question count, timing, weighting, source-set structure, or four unit weighting bands used by this candidate.

## Content inventory

Browser-effective candidate bank: **238 original practice MCQs** loaded from **8 browser data layers** in `index.html` order.

- Exact CED topic inventory represented: **74 topic groups** across Units 1–4.
- Source groups: **74 intact groups**.
  - 58 three-question groups.
  - 16 four-question groups.
- Required-source groups: **39 / 74**.
- Unfamiliar/synthetic groups: **35 / 74**.
- Four unfamiliar quantitative table groups.
- Four unfamiliar local visual groups with accessibility alt text.
- Required-source practice uses original summaries/descriptions rather than copying secure or copyrighted course-source text.

The eight content layers are retained intentionally. Existing released subjects in this repository also ship layered curation/quality files, and the generic release audit evaluates the browser-effective bank in `index.html` order. The AP AAS *metadata* overlay was removed because the canonical subject registry itself must remain authoritative.

## Canonical registry consolidation

Verified AP AAS metadata is now stored directly in `js/subjects.js`.

The previous development-only `js/ap-african-american-studies-metadata.js` overlay was removed from the browser and deleted. Temporary metadata materializer scripts/tests and temporary write-capable CI were also removed. `.github/workflows/test.yml` is back to the normal read-only workflow.

The persistent AP AAS registry change is confined to the AP AAS subject block: format metadata, MCQ-only scope note, U1–U4 unit definitions and ranges, stimulus-set range, constrained unit counts, and draw-attempt budget. `releaseStatus` remains `draft`.

## Structural and schema gates

Every AP AAS structural, semantic, naive, release, quantitative, and visual test loader now evaluates the same final browser-effective eight-layer bank.

The main structural test recognizes the three stimulus forms actually supported by the final AP AAS bank and validates them explicitly:

- substantive text stimulus;
- accessible local visual stimulus with both `image` and nonempty `alt`;
- structured quantitative stimulus with nonempty `columns`, nonempty `rows`, and row widths matching the column count.

This gate was strengthened after the final all-layer loader exposed that the older test had incorrectly assumed every stimulus must contain prose `text`. The course content was not weakened to satisfy the test; the test contract was corrected to match the real supported browser schema.

## Semantic and source-review regressions

Persistent U1–U4 clean-room regression suites cover substantive reviewed anchors including:

- exact source-group/topic inventories;
- key required-source identities;
- agency alongside coercion in slavery/resistance content;
- gender and resistance without overgeneralization;
- Reconstruction/Jim Crow law, violence, and Black institution building;
- Great Migration analysis without single-cause reduction;
- multiple strategies/currents within Black freedom politics;
- contemporary Black diversity rather than homogeneous framing;
- Afrofuturism and alternative Black futures.

These tests are valuable regression evidence, but they are **not being represented as the outstanding independent reviewer** because they were developed during the author/repair process.

## Quantitative and visual gates

Four synthetic quantitative groups are marked transparently as constructed practice data. Their answer keys are independently recomputed from the embedded tables by the quantitative regression suite.

Four unfamiliar visual groups use local assets. The visual regression suite verifies local source wiring, meaningful alt text that does not reveal the keyed answer, and questions that require observation, contextualization, or source comparison.

## Naive/product gate

The naive/student-facing audit loads all eight final browser data layers. Student-facing explanations avoid implementation jargon, required versus synthetic provenance is stated honestly, and the preflight makes the MCQ-only scope explicit while acknowledging the additional official exam components.

## Generic release audit

Exact-head full repository CI for candidate `ce04e9b88c63c2e8f411ad69bf396b0da4be590a` completed successfully in Test workflow run **#1408** / Actions run `32183864617`.

Release-audit evidence from that run:

- Effective bank: **238 questions from 8 browser data layers**.
- Uniquely-longest correct option: **23.9%** (project ceiling ≤25%).
- Exploitable among-longest correct option: **27.3%** with four-way ties excluded (project ceiling ≤58%).
- Mean option length: **18.82 words correct vs 19.37 distractors**.
- Raw correct positions: **A 24.4%, B 26.1%, C 26.5%, D 23.1%**.
- Stimulus groups: **74**.
- Draw audit: **5,000 / 5,000 valid 60-question forms**.
- Generic release-audit retake overlap: **29.5% average shared questions**, below the project ceiling of 40%.
- Parallel quality simulation: **29.4%** overlap.
- Stacked absolute-language distractor audit: pass.

Full repository gate at the same head:

- **312 / 312 tests passed**.
- Build passed.
- Artifact check passed.
- `npm audit --omit=dev`: **0 vulnerabilities**.
- Public artifact correctly excludes AP AAS while `releaseStatus` remains `draft`.

## Shipping-shape inspection

PR #68 changed-file inspection after cleanup shows only intended AP AAS assets/data/tests, `index.html`, the AP AAS canonical `js/subjects.js` block, and generic subject-release-audit hardening. No temporary materializer, metadata overlay, or CI workflow modification remains in the PR diff.

At the time this evidence was recorded, `main` was still `3fe1795a0099bb0712388c1608295b2af6caf206`, the same production baseline on which the subject PR is based.

## Independent-review gate — PENDING

The repository release checklist requires a genuinely fresh clean-room review from a reviewer/session that did not author or repair this bank. This evidence file deliberately does **not** convert this session's automated clean-room tests, naive audit, or primary-source re-verification into an "independent" sign-off.

A self-contained reviewer brief is posted on PR #68. The reviewer should initially ignore development claims/tests, inspect the final browser-effective bank and current College Board materials independently, and report substantive findings. If any substantive finding is repaired, the independent review must restart from scratch on the repaired candidate.

Release promotion is blocked until a fresh independent pass reports **zero substantive findings**.

## Promotion and integration plan — NOT YET EXECUTED

After the independent gate passes:

1. Pin the reviewed candidate SHA and record the independent review result here.
2. Apply only the intended AP AAS `releaseStatus: "draft"` → `releaseStatus: "released"` promotion plus any release-status regression/evidence update required by the repository.
3. Create a fresh ephemeral integration branch from the then-current `main`.
4. Integrate the exact reviewed candidate and promotion.
5. Run exact-head full repository CI, the 5,000/5,000 AP AAS release audit, build `_site`, and inspect the release artifact.
6. Merge only that exact green integration candidate to `main`.
7. Verify exact-main CI, GitHub Pages deployment, published manifest/artifact, catalog card, preflight, and AP AAS exam path.

No production release claim should be made before those post-review gates complete.
