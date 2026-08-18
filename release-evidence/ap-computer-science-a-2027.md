# AP Computer Science A — May 2027 release evidence

Status: **promoted on release branch / awaiting merge verification**

## Authoritative specification

Verified 2026-08-18 against current College Board sources:

- AP Central exam page: https://apcentral.collegeboard.org/courses/ap-computer-science-a/exam
- AP Central course page: https://apcentral.collegeboard.org/courses/ap-computer-science-a
- AP Computer Science A Course and Exam Description, effective Fall 2025: https://apcentral.collegeboard.org/media/pdf/ap-computer-science-a-course-and-exam-description.pdf
- Current AP Computer Science A CED Clarifications and Corrections.
- AP calculator policy: https://apstudents.collegeboard.org/exam-policies-guidelines/calculator-policies

Current exam target:

- Fully digital in Bluebook.
- Section I: 42 single-select MCQs / 90 minutes / 55% of exam score.
- MCQ presentation is mostly individual questions, occasionally with 1–2 two-question sets.
- Section II: 4 FRQs / 90 minutes / 45%.
- FRQ types: Methods and Control Structures; Class Design; Data Analysis with ArrayList; 2D Array.
- Java Quick Reference is available in Bluebook and may be printed for students.
- Calculators are not allowed for AP Computer Science A except as an approved accommodation.

The current AP Central course-changes page still identifies the Fall 2025 CED as the governing framework and reports no later content framework change. The current clarification sheet contains administrative/resource-language updates, not a change to the assessed CSA content used by this bank.

## Revised four-unit framework

The governing CED contains four assessed units:

| Unit | Official MCQ band | Project 42-question target |
|---|---:|---:|
| U1 Using Objects and Methods | 15–25% | 8 |
| U2 Selection and Iteration | 25–35% | 13 |
| U3 Class Creation | 10–18% | 6 |
| U4 Data Collections | 30–40% | 15 |

The 8/13/6/15 project blueprint comes from normalizing the published-range midpoints (20/30/14/35, total 99) and applying Hamilton apportionment to 42 questions. These are project draw targets inside the official ranges, not College Board-prescribed exact counts.

## Computational Thinking Practice bands

Published MCQ weighting bands and project integer envelopes:

- Practice 1 Design Code: 2–10% → 1–4 questions.
- Practice 2 Develop Code: 22–38% → 10–15.
- Practice 3 Analyze Code: 37–53% → 16–22.
- Practice 4 Document Code and Computing Systems: 10–15% → 5–6.
- Practice 5 Use Computers Responsibly: 2–10% → 1–4.

## Candidate bank

- Effective browser bank: **159 original single-select questions** from **6 browser data layers**.
- Exact CED inventory: **53/53 topics**, with exactly three independently authored candidates per topic.
- Unit inventory: U1 45, U2 36, U3 27, U4 51.
- No borrowed College Board question text is used; provenance is original AP Exam Practice material.
- Current baseline uses standalone questions; `stimulusSetRange: [0,2]` allows the official occasional-set structure without falsely requiring sets in every practice draw.

## Adversarial construction audit and repairs

The generic release audit initially exposed answer-construction defects rather than blueprint failures. Repairs were made at stable question IDs and then re-audited against the browser-effective bank.

Final answer-construction metrics on draft head `72ccf26dff4618cab9f7cee9af12a1474604b1db`:

- Uniquely-longest correct answer: **10.7%** (project limit 25%).
- Exploitable among-longest correct answer: **28.9%** (project limit 58%; four-way ties excluded).
- Mean correct-option length: **9.05 words**.
- Mean distractor length: **9.67 words** (difference well within the ~12% project limit).
- Raw answer positions: **A 40 / B 40 / C 40 / D 39** = 25.2% / 25.2% / 25.2% / 24.5%.
- Stacked absolute-language distractors: **0** under the repository-wide release regex.

The repair pass used substantive Java misconceptions and competing interpretations rather than qualifier padding. Earlier over-broad U1 wording changes that accidentally created true distractors were detected and reversed before the final candidate.

## Independent Java result audit

Persistent gate: `tests/ap-computer-science-a-trace-audit.test.js`.

A detector independently identifies result/state/output-bearing Java questions and requires exact equality with an explicit audit inventory. The final inventory contains **25 questions** spanning:

- integer arithmetic and casting;
- boolean expressions and branching;
- while/for/nested-loop traces;
- String comparison and traversal;
- object construction and reference/null behavior;
- arrays and ArrayLists;
- 2D arrays;
- recursion.

For every inventoried item, the expected result was derived from Java semantics independently of the stored key index. Final result: **25/25 keyed answers matched the independently derived result**, and the detector/inventory equality gate passed.

## Generic randomized release audit

Persistent gate: `tests/ap-computer-science-a-release-audit.test.js`, invoking the repository's production `tools/subject-release-audit.js` path.

Final draft-head run:

- **5,000 / 5,000 valid constrained 42-question forms**.
- Every form obeyed exact 8/13/6/15 unit counts and all five practice envelopes.
- **5,000 independent retake pairs: 28.5% average shared questions**, safely below the 40% project ceiling.
- Schema, answer construction, notation, browser-layer discovery, and API-boundary checks all passed.

## Fresh clean-room semantic review

After the final answer-quality repairs, a fresh review was restarted from the browser-effective bank rather than relying on authoring rationale or raw source alone.

Review lenses:

- all 53 CED topic codes and their three candidate questions;
- practice semantics (Design / Develop / Analyze / Document / Responsible Computing);
- Java correctness and one-best-answer status;
- control flow, overloaded methods, casting, object/reference semantics, scope/static/`this`;
- File/Scanner, wrapper, ArrayList, arrays/2D arrays, search/sort, and recursion boundaries against the current CED/Java Quick Reference;
- responsible-computing and data-collection questions for topic/task fit;
- all browser-effective quality overrides rather than superseded raw options.

**Final clean-room result: zero new substantive findings.** The independent 25-item Java-result gate and selected API-boundary regressions remain as persistent safeguards.

## Naive student/preflight audit

Persistent gate: `tests/ap-computer-science-a-naive-audit.test.js`.

The naive audit confirms that before starting practice a student-facing configuration exposes or preserves the critical facts:

- 42 MCQs / 90 minutes;
- full exam context 3 hours;
- calculator not allowed;
- fully digital Java-based exam context and Java Quick Reference;
- four 90-minute FRQ types are represented in metadata even though this site does not simulate them;
- the About page explicitly states that the product is MCQ-only and explains local saved-progress behavior.

Final result: **pass**.

## Exact-head CI evidence

Draft release candidate:

- Branch head: `72ccf26dff4618cab9f7cee9af12a1474604b1db`
- Test workflow run: **32155737311**
- Result: **success**
- Node test suite: **269 / 269 passed**, 0 failed.
- `npm run build`: success.
- `npm run test:artifact`: success.
- Dependency audit: 0 vulnerabilities.
- Draft build correctly excluded CSA from the public artifact while all currently released subjects/data layers remained intact.

Promotion:

- Content-gate evidence head `c56ac2273f3177c3527cd99b7c651b6464f50a9e` passed Test run **32156011451**.
- Self-cleaning promotion changed only AP CSA's `releaseStatus` from `draft` to `released`; temporary promotion script/workflow were deleted in the same operation.
- Promotion bot head: `591cc64ab0fed103251bd78e54621e186562cf91`.
- The bot-triggered Test surface returned `action_required` without a test job, so this evidence-only commit intentionally triggers a normal exact-head PR Test on the released candidate before merge.

## Merge rule

Merge only after the released candidate's normal exact-head Test is green, PR diff inspection confirms no temporary files or unrelated scope, and the PR is ready for review. After merge, verify exact-main Test, Pages deployment, released artifact contents, and public smoke behavior.
