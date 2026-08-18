# AP Environmental Science — May 2027 release evidence

Status: **development / draft**

Verified 2026-08-17 against current official College Board AP Environmental Science course/exam pages, Course at a Glance, Fall 2026 Course and Exam Description clarifications, and calculator policy.

## Official exam format

- Fully digital exam.
- Section I: 80 MCQs, 90 minutes, 60%.
- Section II: 3 FRQs, 70 minutes, 40%.
- Calculator use permitted throughout.
- This project remains MCQ-only and does not simulate the written free-response section.

## Published MCQ unit weights

- U1 The Living World: Ecosystems — 6–8%
- U2 The Living World: Biodiversity — 6–8%
- U3 Populations — 10–15%
- U4 Earth Systems and Resources — 10–15%
- U5 Land and Water Use — 10–15%
- U6 Energy Resources and Consumption — 10–15%
- U7 Atmospheric Pollution — 7–10%
- U8 Aquatic and Terrestrial Pollution — 7–10%
- U9 Global Change — 15–20%

Candidate 80-question project blueprint: 6/6/10/10/10/10/7/7/14. Every delivered share remains inside the published range.

## Published MCQ science-practice weights

- Practice 1 Concept Explanation — 30–38% → 24–30 questions
- Practice 2 Visual Representations — 12–19% → 10–15 questions
- Practice 3 Text Analysis — 6–8% → 5–6 questions
- Practice 4 Scientific Experiments — 2–4% → 2–3 questions
- Practice 5 Data Analysis — 12–19% → 10–15 questions
- Practice 6 Mathematical Routines — 6–9% → 5–7 questions
- Practice 7 Environmental Solutions — 17–23% → 14–18 questions

## Source-set candidate architecture

The May 2027 exam page specifies 3–5 quantitative-data sets, 3–5 qualitative/model/map sets, and 2 text-source sets. The current candidate form uses a valid 5 quantitative + 5 qualitative/model/map + 2 text configuration. The development pool contains 8 quantitative, 8 qualitative/model/map, and 4 text candidate sets so retakes are not forced to repeat every source-linked question.

The source practices are now semantic rather than distribution-only:

- selected quantitative sets contribute Practice 5 data-analysis and Practice 6 calculation tasks;
- selected visual/model/map sets contribute Practice 2 analysis plus source-specific Practice 7 solution tasks;
- selected text sets contribute Practice 3 source-analysis tasks;
- ordinary written concept/application standalones are Practice 1 only;
- dedicated standalone pools provide Practice 4 experimental-design tasks and Practice 7 environmental-solution tasks.

This design was introduced after a clean-room semantic review caught that the earlier structural prototype could satisfy practice percentages by assigning source-analysis labels to ordinary standalone concept questions. The prototype was not promoted; the semantic defect was repaired before release auditing.

## Current candidate inventory

- Exact 99-topic Course-at-a-Glance inventory represented.
- 198 original concept/application standalones covering every topic twice.
- 18 additional topic-specific Practice 7 environmental-solution standalones.
- 9 additional Practice 4 experimental-design standalones, one per unit.
- 20 original/synthetic three-question source sets: 60 linked questions.
- Effective development bank: 285 questions.

## Development gates completed so far

- 99/99 topic inventory regression.
- Whole-set source draw regression.
- Independent recomputation of all eight explicit quantitative calculation anchors.
- Naive/student-facing May 2027 preflight regression.
- Answer-position rotation repair for the 60 source-set questions.
- Semantic practice-family regression preventing concept questions from being relabeled as visual/text/data/experiment/math/solution tasks.
- Source-specific hardening of all eight visual-set Practice 7 questions.

Still required before promotion: green exact-head full-repo CI after the semantic rebuild, generic 5,000/5,000 release audit, retake-overlap gate, answer-construction metrics, fresh clean-room zero-new-finding review, final consolidation into shipping shape, registry wiring, tiny draft→released promotion, exact-head integration checks, main merge, Pages artifact verification, and public smoke where the runtime permits it.
