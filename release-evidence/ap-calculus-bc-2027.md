# AP Calculus BC — May 2027 release evidence

## Governing specification

Release target: Fall 2026 course framework / May 2027 AP Calculus BC Exam.

Primary College Board sources checked on 2026-08-14:

- AP Calculus BC Exam — `https://apcentral.collegeboard.org/courses/ap-calculus-bc/exam`
- AP Calculus BC Course — `https://apcentral.collegeboard.org/courses/ap-calculus-bc`
- AP Calculus AB and BC Course and Exam Description linked from the current course page.

The current AP Central exam page states that the 2026-27 clarifications do not change course content and that the exam-format changes begin with May 2027. Section I is 42 multiple-choice questions in 100 minutes: Part A is 29 questions / 62 minutes / calculator not permitted; Part B is 13 questions / 38 minutes / graphing calculator required. Section II remains outside this site's MCQ-only practice scope.

## Blueprint and coverage

- 42-question Section I draw.
- Exact unit draw: U1-U10 = `3/3/3/3/5/7/3/3/5/7`, derived from the current published BC unit weighting bands while keeping every delivered unit share inside its published band.
- Mathematical Practice draw ranges: Practice 1 `21-29`, Practice 2 `7-12`, Practice 3 `5-8`; Practice 4 is not used for Section I questions.
- Exact topic inventory covers Units 1-10, including all BC extensions in Units 6-8 and all topics in Units 9-10.
- BC-only inventory includes integration by parts, linear partial fractions, improper integrals, Euler's method, logistic models, arc length/distance, all 9.1-9.9 topics, and all 10.1-10.15 topics.
- Every BC-only topic has at least three independently authored questions.

## Bank and shipping shape

- Effective bank: **210 questions**.
- Final shipping shape: **one standalone `data/ap-calculus-bc.js` browser data layer**. It has no runtime dependency on the AP Calculus AB bank or temporary BC append layers.
- Variant groups: **53**.
- Shared stimulus groups: **8**.
- Singleton stimulus objects are retained where needed, but are not mislabeled as multi-question stimulus groups.

## Generic release audit

Pre-consolidation 5,000 / 5,000 gate and full repository gate passed in workflow run `31822738230`.

Measured bank statistics:

- Uniquely-longest correct answer: **11.9%**.
- Exploitable among-longest correct answer: **25.2%**, excluding four-way option-length ties because such ties contain no answer-position information.
- Mean correct-option length: **5.45 words**.
- Mean distractor length: **5.17 words**.
- Raw answer keys: **A 25.2%, B 25.2%, C 24.8%, D 24.8%**.
- 5,000 / 5,000 randomized forms valid.
- Independent-attempt overlap: **22.9%**, comfortably under the project 40% ceiling.

The reusable release audit was hardened during this work in two ways: four-way option-length ties no longer count as exploitable longest-answer cues, and stimulus-set equality is checked by content rather than JavaScript object identity. Permanent regressions cover the first behavior; the second permits independently serialized shipping banks without weakening the requirement that every member of a shared set use identical stimulus content.

## Independent clean-room review

A new BC-only clean-room suite independently recomputes representative quantitative/conceptual answers across **all 30 BC-only topic codes**, checks the exact BC-only inventory, verifies exact MCQ-assessed skill anchors, enforces unique four-option answer sets and substantive rationales, and rejects Practice 4 tagging in Section I.

The first clean-room execution identified two over-broad assertions in the audit harness itself; neither was a mathematical-content failure. The assertions were narrowed to the actual CED task semantics. A fresh post-repair run, workflow **`31823270147`**, then passed:

- BC clean-room suite: pass.
- BC randomized-form suite: pass.
- release audit: **5,000 / 5,000 draws and 5,000 overlap pairs**, pass.
- full `npm run check`: pass.
- substantive clean-room findings on the fresh final run: **0**.

## Standalone-bank verification

The development bank was consolidated after clean-room review. Workflow **`31823652087`** regenerated the effective 210-question bank into a single standalone data file, removed the three temporary append layers, and then passed:

- BC subject regressions.
- BC clean-room regressions.
- notation diagnostic.
- 5,000 / 5,000 release audit.
- full repository `npm run check`.

Consolidated-bank commit: `727c73e4f46c588b5a745c6e361b6bf36c8de232`.

## Naive-assessor / student-facing gate

The release includes a course-specific product-level naive-assessor regression in addition to the shared catalog/preflight suite. It verifies that a student sees the critical May 2027 facts before starting:

- 42 MCQs / 100 minutes.
- Part A: 29 questions / 62 minutes / calculator not permitted.
- Part B: 13 questions / 38 minutes / graphing calculator required.
- Section I multiple-choice scope is explicit.
- in-progress work is saved locally in the browser session.
- the timer does not begin until `Start timed practice` is chosen.
- a back-to-subjects path is present before timing starts.

This is a product-level naive-assessor simulation/regression, not a claim of an external human usability study.

## Promotion criteria

Before promotion from `draft` to `released`:

1. Naive-assessor regression passes on the standalone bank.
2. Temporary Calculus BC workflows, repair/consolidation helpers, and trigger files are removed.
3. `releaseStatus` is changed to `released` and the BC metadata regression is updated accordingly.
4. A fresh exact-head 5,000 / 5,000 release audit and full `npm run check` pass.
5. Integration PR CI and production PR CI pass before merging to `main`.
6. The GitHub Pages deployment completes successfully on the exact production merge SHA.
