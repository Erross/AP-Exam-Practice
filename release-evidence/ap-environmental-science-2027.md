# AP Environmental Science — May 2027 release evidence

Status: **promoted to released on the subject branch; merge pending released-mode CI**

## Authoritative specification

Verified against current College Board material for the 2026-27 course / May 2027 exam cycle:

- AP Central course page: https://apcentral.collegeboard.org/courses/ap-environmental-science
- AP Central exam page: https://apcentral.collegeboard.org/courses/ap-environmental-science/exam
- AP Students assessment page: https://apstudents.collegeboard.org/courses/ap-environmental-science/assessment
- AP calculator policy: https://apstudents.collegeboard.org/exam-policies-guidelines/calculator-policies
- Fall 2026 / 2026-27 Clarifications PDF linked from the AP Central course and exam pages.

The May 2027 exam is fully digital in Bluebook. Section I is 80 multiple-choice questions in 90 minutes and is 60% of the exam score. Section II is three free-response questions in 70 minutes and is 40% of the score. Total testing time represented in the registry is 2h 40m. Calculators are allowed in both sections; College Board allows a 4-function calculator with square root, scientific calculator, or graphing calculator, and provides the Bluebook Desmos scientific calculator.

This application is an **MCQ-only practice product**. It does not simulate written FRQ responses; the preflight text explicitly says the official exam also contains three FRQs.

## Unit weighting bands

| Unit | College Board MCQ band | Project 80-question target |
|---|---:|---:|
| U1 The Living World: Ecosystems | 6-8% | 6 |
| U2 The Living World: Biodiversity | 6-8% | 6 |
| U3 Populations | 10-15% | 10 |
| U4 Earth Systems and Resources | 10-15% | 10 |
| U5 Land and Water Use | 10-15% | 10 |
| U6 Energy Resources and Consumption | 10-15% | 10 |
| U7 Atmospheric Pollution | 7-10% | 7 |
| U8 Aquatic and Terrestrial Pollution | 7-10% | 7 |
| U9 Global Change | 15-20% | 14 |

The integer targets are a project blueprint selected inside the published ranges; College Board does not prescribe these exact per-form integer counts.

## Science-practice weighting bands

College Board's current AP Central course page gives these Section I bands:

- Practice 1 Concept Explanation: 30-38%
- Practice 2 Visual Representations: 12-19%
- Practice 3 Text Analysis: 6-8%
- Practice 4 Scientific Experiments: 2-4%
- Practice 5 Data Analysis: 12-19%
- Practice 6 Mathematical Routines: 6-9%
- Practice 7 Environmental Solutions: 17-23%

The candidate drawer enforces compatible integer count ranges on every 80-question form: P1 24-30, P2 10-15, P3 5-6, P4 2-3, P5 10-15, P6 5-7, P7 14-18.

## Source-set clarification

The 2026-27 clarification changes the Section I source portfolio to ranges of **3-5 quantitative sets, 3-5 qualitative/model/map sets, and exactly 2 text sets**. The project deliberately chooses **5 quantitative + 5 visual/model/map + 2 text sets** on each delivered form. That 5/5/2 mix is a project choice within the official ranges, not a claim that College Board fixes every operational form at exactly 5/5/2.

## Content inventory

Browser-effective candidate bank: **330 original/synthetic MCQs**.

- Exact CED topic coverage: **99 / 99 topics**.
- Standalone inventory: **270 questions**.
  - Practice 1: 198
  - Practice 4: 18
  - Practice 7: 54
- Source-linked inventory: **60 questions in 20 atomic three-question candidate sets**.
  - 8 quantitative candidate sets
  - 8 visual/model/map candidate sets
  - 4 text candidate sets
- Delivered form: 80 questions, including 12 whole source sets (5 quantitative, 5 visual/model/map, 2 text).

All source sets use original/synthetic data, models, maps, or text created for AP Exam Practice and retain shared stimulus provenance. Whole-set selection is atomic.

## Semantic review and repair history

The first distribution-oriented draft was rejected because ordinary standalone concept questions had been assigned source-analysis practice labels merely to satisfy percentage bands. The bank was redesigned rather than cosmetically retagged:

- ordinary topic standalones are Practice 1 only;
- dedicated controlled-comparison questions supply Practice 4;
- dedicated environmental-intervention questions supply standalone Practice 7;
- Practices 2, 3, 5, and 6 are source-linked to the visual, textual, or quantitative material they actually analyze;
- visual Practice 7 questions require concrete source-specific environmental decisions rather than generic monitor/respond language.

A fresh post-repair clean-room test checks controlled-experiment structure, concrete solution mechanisms, source dependence, standalone practice inventory, and selected post-wording-repair scientific anchors.

**Fresh zero-finding clean-room restart:** branch head `95ebc70a8f9fc0a687885877dc71e6660ac6dcb2`, Test workflow run `32088580381`, conclusion **success**.

## Quantitative recomputation

The APES quantitative regression inventory detects the synthetic calculation anchors and independently recomputes every inventoried result. The inventory and recomputation tests pass on the green clean-room head above.

## Generic release audit

The repository's generic release-audit functions run against the same effective candidate bank and metadata object used by the APES tests.

Latest green-head metrics:

- Generic constrained draws: **5,000 / 5,000 valid**.
- Independent retake pairs: **5,000**.
- Mean retake overlap: **38.6%**, below the project ceiling of 40%.
- Uniquely-longest correct option: **23.9%**, below the project ~25% ceiling.
- Correct option among the longest: **40.6%**, below the project ~58% ceiling.
- Mean correct-option length: **9.23 words**.
- Mean distractor length: **8.87 words**.
- Raw correct positions: **24.8% / 24.8% / 25.2% / 25.2%**.
- Stacked absolute-language distractor audit: pass.
- Rationale/schema/id/source-set integrity audits: pass.

Answer-length repair was semantic: overlong keys were tightened while preserving the scientific mechanism rather than padding distractors with generic qualifiers. A post-repair clean-room anchor test protects those meanings.

## Naive/preflight gate

The naive-student regression passes and exposes the exam-critical facts before practice begins: 80 MCQs, 90 minutes, fully digital official exam context, calculator permission, and the fact that this product practices the MCQ section only while the official exam also contains three FRQs.

## Registry consolidation

The verified May 2027 metadata is consolidated into the real `js/subjects.js` AP Environmental Science entry. The APES helper now returns that registry object directly rather than shadowing it with duplicated metadata, so semantic, quantitative, generic release-audit, randomized-draw, overlap, and naive/preflight regressions exercise the shipping configuration itself.

A first consolidation attempt was rejected during diff inspection because a full-file replacement accidentally altered AP Art History metadata. That commit was removed from the branch before release. The registry edit was reapplied with an exact one-block transform and independently inspected; the resulting APES-only registry change is `595fafe6274d7d1be9b74e5e860a42a988a7a8f7`. The first registry-parity CI run then correctly caught that the student-facing `tierNote` omitted calculator permission. The test was not weakened; the registry note was corrected in `8e430289f18285765a61fd141fadcf470aac4a6e` to state calculator permission and the MCQ-only/FRQ limitation explicitly.

The fully consolidated draft shipping configuration passed exact-head CI at `e0103f4bbced2562f968f7cb0d2ac4bbb297a109` / Test run `32093697403`. A release-status-agnostic shipping helper then passed at `a061d8d49d2168c72b231f6ce6e7786ab09a2743` / Test run `32093828577`.

## Promotion

AP Environmental Science was promoted with a targeted transform in commit `50c8b048a97b74604be7e19b279ada13bfe4e689`. Independent diff inspection confirms the only persistent product change in that commit is `releaseStatus: "draft"` to `releaseStatus: "released"` for AP Environmental Science; the temporary promotion script and workflow self-deleted.

## CI / shipping gates

The current commit exists to trigger exact-head full-repository CI against the **released** AP Environmental Science shipping configuration. Merge remains blocked until that released-mode run is green.

**Still required before production release:** green released-mode exact-head CI; mark the PR ready; merge; verify exact-main CI; verify Pages deployment and the published artifact/manifest; attempt public smoke where runtime networking permits it.