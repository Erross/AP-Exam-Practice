# AP Statistics — May 2027 Release Evidence

Release candidate reviewed 2026-08-13 against the revised AP Statistics course/exam effective for the 2026–27 school year and the May 2027 exam.

## Official-format verification

Primary College Board references independently rechecked on 2026-08-13:

- AP Statistics Revisions: https://apcentral.collegeboard.org/courses/ap-statistics/future-revisions
- AP Statistics course page / revised CED: https://apcentral.collegeboard.org/courses/ap-statistics
- AP Statistics exam page: https://apcentral.collegeboard.org/courses/ap-statistics/exam
- Fully digital Statistics exam FAQ: https://apcentral.collegeboard.org/help-center/what-should-i-know-about-fully-digital-ap-statistics-exam

Verified target:

- revised course effective 2026–27 / May 2027 exam;
- 5 course units;
- Section I: 42 four-option MCQs in 90 minutes;
- calculators permitted throughout;
- two required 3-question MCQ sets: one probability/random-variables/distributions set and one regression set;
- Section II exists but is outside this site's current MCQ-only scope: 4 FRQs in 90 minutes;
- fully digital Bluebook administration.

Published MCQ unit bands used by the registry are 20–30%, 15–25%, 15–25%, 10–20%, and 10–20% for Units 1–5 respectively. The bank/test suite also encodes the revised four-practice taxonomy and exact topic/skill compatibility.

## Bank and automated release audit

Effective bank: **140 original questions** across all **55 revised CED topics**.

Generic release audit command:

```bash
npm run release:audit -- --subject ap-statistics --trials 5000 --overlap-trials 5000
```

Result on release candidate:

- 140 questions; draw size 42;
- 6 stimulus groups;
- 8 variant groups;
- uniquely-longest correct answer: **15.7%**;
- among-longest correct answer: **56.4%**;
- average correct option: **7.39 words** vs **6.89 words** for distractors;
- raw keys: **A 35.0%, B 22.1%, C 23.6%, D 19.3%**;
- **5,000 / 5,000** generic draws valid;
- independent-attempt overlap: **33.6%** across 5,000 draw pairs (project target ≤40%).

The raw console record is retained beside this file as `ap-statistics-2027-audit.txt`.

## Subject-specific / clean-room evidence

The Statistics suite independently checks:

- exact 55-topic inventory and allowed exact CED skill tags;
- all 140 stable IDs and rationale requirements;
- variant-group integrity and same-exam exclusion;
- candidate stimulus-set exclusivity;
- exactly three probability sets and three regression sets available, each three questions;
- provenance and visual accessibility;
- answer-length, raw-key and absolute-language bias thresholds;
- quantitative recomputation inventory;
- unit/practice/required-set blueprint behavior across randomized draws;
- retake overlap ≤40%;
- exact semantic regressions identified during prior clean-room cycles.

A full fresh repository gate on the promoted release candidate passed **133/133 tests**, then built a production artifact with **8 released subjects and 15 released data layers**, with draft data excluded.

The bank itself had already undergone iterative clean-room audit/fix/restart cycles before release. The 2026-08-13 release review independently rechecked the governing College Board format against live official sources and reran the full quantitative/draw/overlap evidence on the effective browser bank; no new substantive defect was found.

## Naive-assessor release check

A first-time-user interpretation was checked against the current production UX requirements:

- AP Statistics appears among **Available now**, not in the draft/development list;
- the card communicates **42 MCQs · 90 min** before starting;
- selecting it goes to the pre-exam confirmation rather than silently starting the timer;
- the preflight communicates calculator expectations and browser-local save behavior;
- site-level About copy makes clear that AP Exam Practice is unofficial/original and currently **MCQ-only** — it does not claim to provide the Statistics FRQ/written-response section;
- the primary action is unambiguous: start the timed Section I practice.

No additional Statistics-specific UI was required.

## Promotion decision

**PASS — releaseStatus may be `released`.**

Integration and production deployment still require the normal exact-head CI, released-only artifact validation, successful GitHub Pages deployment, and public-site smoke test.