# AP Macroeconomics — May 2027 release evidence

## Governing specification

Release target: Fall 2026 course framework / May 2027 AP Macroeconomics Exam.

Primary College Board sources checked on 2026-08-15:

- AP Macroeconomics Exam — `https://apcentral.collegeboard.org/courses/ap-macroeconomics/exam`
- AP Macroeconomics Course — `https://apcentral.collegeboard.org/courses/ap-macroeconomics`
- AP Macroeconomics Course and Exam Description effective Fall 2026 — `https://apcentral.collegeboard.org/media/pdf/ap-macroeconomics-course-and-exam-description.pdf`

The current specification gives Section I as 60 multiple-choice questions in 70 minutes. The complete exam is 2 hours 10 minutes. A four-function calculator is permitted throughout the exam. Skill 4, Graphing and Visuals, is assessed in free response rather than as an MCQ practice family; Section I uses Practices 1–3, including numerical-analysis tasks within those practices.

## Blueprint and coverage

Published unit MCQ bands and the exact integer draw used by this site:

- U1 Basic Economic Concepts: 5–10%; draw 5/60.
- U2 Economic Indicators and the Business Cycle: 12–17%; draw 9/60.
- U3 National Income and Price Determination: 17–27%; draw 13/60.
- U4 Financial Sector: 18–23%; draw 12/60.
- U5 Long-Run Consequences of Stabilization Policies: 20–30%; draw 14/60.
- U6 Open Economy—International Trade and Finance: 10–13%; draw 7/60.

Published MCQ practice bands are Practice 1 30–40%, Practice 2 25–32%, and Practice 3 30–40%. The drawer enforces integer envelopes P1 18–24, P2 15–19, and P3 18–24 on every delivered form. Numerical analysis is published at 16–20% of Section I; the drawer enforces 10–12 numerical-analysis questions per 60-question form.

The bank covers the exact 42 Fall-2026 topic codes: U1 1.1–1.6, U2 2.1–2.7, U3 3.1–3.9, U4 4.1–4.7, U5 5.1–5.7, and U6 6.1–6.6.

## Bank and shipping shape

- Effective bank: **204 questions**.
- Shipping shape: one canonical `data/ap-macroeconomics.js` browser data layer.
- Every CED topic has at least four independently posed conceptual/application questions.
- **36** explicit numerical/data-analysis questions supplement the topic-wide conceptual coverage.
- Numerical items carry compact `numericCheck` metadata used only by tests; every keyed numerical result is independently recomputed by the permanent regression suite.
- All scenarios, quantities, answer choices, and rationales were authored for this project; no College Board assessment items are reproduced.
- Variant groups: 0.
- Shared stimulus groups: 0.

## Generic release audit

Full draft release gate: workflow **`31901929495`**, exact head `812d873b5542717391be6e542de9f0c3a17ce966`.

Measured bank statistics:

- Uniquely-longest correct answer: **18.6%**.
- Exploitable among-longest correct answer: **23.5%**, excluding four-way length ties.
- Mean correct-option length: **13.54 words**.
- Mean distractor length: **13.48 words**.
- Raw answer keys: **A 25.0%, B 25.0%, C 25.0%, D 25.0%**.
- **5,000 / 5,000** randomized forms valid.
- Independent-attempt overlap: **31.5%**, below the project 40% ceiling.

The permanent randomized-form regression separately observed the complete allowed envelopes: P1 18–24, P2 15–19, P3 18–24, and numerical analysis 10–12.

## Independent and naive-assessor checks

The permanent `tests/ap-macroeconomics.test.js` suite independently verifies:

- the exact 42-topic Fall-2026 inventory and bank depth;
- all 36 numerical-analysis answers by recomputation rather than trusting authored answer text;
- exclusion of Practice 4 from the MCQ bank;
- exact 5/9/13/12/14/7 unit delivery;
- published Practice 1–3 count envelopes;
- the 10–12 numerical-analysis envelope;
- retake overlap at or below 40%; and
- student-facing preflight facts, including 60 questions, 70 minutes, full-section four-function calculator permission, browser-session save behavior, delayed timer start, and back navigation.

The full repository gate on the same draft release candidate passed **189 / 189 tests**, built the then-current 13 released subjects / 21 released data layers while correctly excluding draft Macroeconomics, passed public-artifact validation, and reported **0 npm vulnerabilities**.

## Promotion criteria

Before production promotion:

1. Remove the temporary Macroeconomics development workflow.
2. Change only Macroeconomics `releaseStatus` from `draft` to `released` and update its regression expectation.
3. Run a fresh exact-head 5,000-form / 5,000-overlap release audit and complete `npm run check` in released mode.
4. Require integration PR CI and production PR CI to pass.
5. Verify the GitHub Pages deployment from the exact production merge SHA and confirm the public artifact contains `data/ap-macroeconomics.js`.
