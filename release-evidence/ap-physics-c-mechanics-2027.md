# AP Physics C: Mechanics — May 2027 release evidence

## Official specification

Verified 2026-08-17 against current College Board primary sources.

- Hybrid digital exam.
- Section I: 42 multiple-choice questions in 85 minutes, 50% of exam score, effective May 2027.
- Section II: 4 free-response questions in 95 minutes, 50% of exam score.
- FRQ types: Mathematical Routines; Translation Between Representations; Experimental Design and Analysis; Qualitative/Quantitative Translation.
- Four-function, scientific, or graphing calculators are permitted throughout the exam; Bluebook also supplies appropriate Desmos calculators.

Sources:
- https://apcentral.collegeboard.org/courses/ap-physics-c-mechanics
- https://apcentral.collegeboard.org/media/pdf/ap-physics-c-mechanics-course-and-exam-description-clarifications.pdf
- https://apcentral.collegeboard.org/media/pdf/ap-physics-c-mechanics-course-at-a-glance.pdf
- https://apcentral.collegeboard.org/exam-administration-ordering-scores/administering-exams/preparing-for-exam-day/calculator-policy

## Published MCQ unit weighting

- U1 Kinematics: 10–15%
- U2 Force and Translational Dynamics: 20–25%
- U3 Work, Energy, and Power: 15–25%
- U4 Linear Momentum: 10–20%
- U5 Torque and Rotational Dynamics: 10–15%
- U6 Energy and Momentum of Rotating Systems: 10–15%
- U7 Oscillations: 10–15%

The current CED contains 41 topics total: U1 5, U2 10, U3 5, U4 4, U5 6, U6 6, U7 5.

The configured 42-question draw is 5/9/8/6/5/5/4 across Units 1–7, with every delivered share inside its published range.

## MCQ science-practice weighting

Practice 1 and skill 3.A are FRQ-only. Section I assesses:

- 2.A: 25–30%
- 2.B: 20–25%
- 2.C: 10–15%
- 2.D: 10–15%
- 3.B: 15–25%
- 3.C: 5–10%

## Candidate bank

The subject remains `draft` until the full release checklist passes.

- 144 original, unofficial questions.
- Exact 41/41 CED-topic coverage.
- At least three independent standalone questions per topic.
- Per-unit bank counts: U1 18, U2 33, U3 18, U4 15, U5 21, U6 21, U7 18.
- Seven original synthetic table stimulus sets, one per unit, with three linked questions per set.
- No released or secure College Board question is reproduced.
- Student-facing notation was normalized after the first full-suite diagnostic exposed raw authoring notation.

## Development gate results

First full-suite candidate run: 223 tests, 221 passed, 2 failed. The failures were deliberately treated as authoring findings rather than waived:

1. one rationale below the quality floor;
2. raw programmer-style math notation in student-facing Physics C text.

The same run independently confirmed:

- exact metadata and 41-topic inventory: pass;
- seven shared stimulus sets: pass;
- randomized unit/skill/whole-set constraints: pass;
- preliminary independent-retake overlap: 33.6%, below the project 40% target.

Both findings were repaired across the bank, and the Mechanics tests were tightened to the project release thresholds before the next full-suite run.

## Remaining release gates

- Clean full-suite pass at the tightened thresholds.
- Comprehensive quantitative recomputation regression.
- Generic 5,000-draw / 5,000-overlap release audit and recorded bias metrics.
- Independent clean-room semantic/content review, repair if needed, then a fresh zero-substantive-finding pass.
- Naive-assessor regression/gate.
- Small released-mode promotion, integration, exact-main Pages deployment, and public smoke verification.
