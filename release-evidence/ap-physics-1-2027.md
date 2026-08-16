# AP Physics 1: Algebra-Based — May 2027 release evidence

## Governing specification

Primary College Board sources checked on 2026-08-15 and rechecked during the 2026-08-16 candidate build:

- AP Physics 1 Exam: `https://apcentral.collegeboard.org/courses/ap-physics-1/exam`
- AP Physics 1 Course and Exam Description: `https://apcentral.collegeboard.org/media/pdf/ap-physics-1-course-and-exam-description.pdf`
- Fall 2026 CED Clarifications: `https://apcentral.collegeboard.org/media/pdf/ap-physics-1-course-and-exam-description-clarifications.pdf`
- Calculator Policy: `https://apcentral.collegeboard.org/exam-administration-ordering-scores/administering-exams/exam-policies/calculator-policy`

The May 2027 exam is hybrid digital. Section I contains 42 MCQs in 85 minutes and accounts for 50% of the exam score. Section II contains four free-response questions in 95 minutes. The total exam time is three hours. Four-function, scientific, or graphing calculators are permitted throughout the exam; the digital testing application provides Desmos scientific and graphing calculators.

The Fall 2026 clarification changes the prior 40-question/80-minute MCQ section to 42 questions/85 minutes and changes the free-response time from 100 to 95 minutes, effective with the May 2027 exam.

## Blueprint and coverage

The configured 42-question unit allocation is `5/8/8/5/5/3/3/5` for Units 1–8. Every delivered share remains within the published MCQ unit band:

- U1 Kinematics: 10–15%.
- U2 Force and Translational Dynamics: 18–23%.
- U3 Work, Energy, and Power: 18–23%.
- U4 Linear Momentum: 10–15%.
- U5 Torque and Rotational Dynamics: 10–15%.
- U6 Energy and Momentum of Rotating Systems: 5–8%.
- U7 Oscillations: 5–8%.
- U8 Fluids: 10–15%.

The configured MCQ science-practice envelopes are 2.A `7–8`, 2.B `9–10`, 2.C `5–6`, 2.D `5–6`, 3.B `9–10`, and 3.C `3–4`. Practice 1 and Practice 3.A are free-response-only and are excluded from the MCQ bank.

The bank covers the exact 43-topic CED inventory: 1.1–1.5, 2.1–2.9, 3.1–3.5, 4.1–4.4, 5.1–5.6, 6.1–6.6, 7.1–7.4, and 8.1–8.4.

## Candidate bank

Original complete-bank checkpoint: `c36fe3772ad5bc6349c74ab12f7aba7129a0f7b0`.

- 177 original questions in one browser data layer.
- Unit counts: U1 20, U2 32, U3 25, U4 20, U5 23, U6 23, U7 17, U8 17.
- At least three independent questions for every CED topic.
- Eight original synthetic table sets, one per unit, with three linked questions per set.
- Stable IDs, four distinct options, one key, item-specific rationales of at least 90 characters, and display-ready notation.
- Representative quantitative results from every unit are independently recomputed in permanent regression tests.
- No released or secure College Board question is reproduced.

## Automated candidate audit

Final draft generic release audit:

- Effective bank: 177 questions / one browser data layer.
- Randomized-form audit: 5,000 / 5,000 valid.
- Average independent-attempt overlap: 26.3%, below the project 40% ceiling.
- Uniquely-longest correct answer: 0.0%.
- Exploitable among-longest correct answer: 16.4%, excluding four-way length ties.
- Mean correct-option length: 5.90 words; mean distractor length: 5.63 words.
- Raw keys: A 25.4%, B 24.9%, C 24.9%, D 24.9%.
- Stimulus groups: eight; every delivered group remains atomic.
- Permanent 1,000-form regression observed the full configured skill envelope and 2–4 shared sets per form.
- Permanent overlap regression observed approximately 26% shared questions between independent attempts.

Local draft gate after notation repair:

- Repository audit passed.
- 216 / 216 tests passed after adding the Physics 1 student-facing regression.
- Production build and artifact verification passed.
- Draft Physics 1 data remained correctly excluded from the released artifact.

Exact remote complete-bank CI before the subsequent semantic-hardening pass:

- Commit `c36fe3772ad5bc6349c74ab12f7aba7129a0f7b0`.
- [Test run 31953116231](https://github.com/Erross/AP-Exam-Practice/actions/runs/31953116231): successful.

## Adversarial authoring audit and repair

The first complete bank failed the generator because symbolic-expression Practice 2.A coverage was too shallow to satisfy the published 15–20% delivered-form band. Sixteen genuine symbolic-model tasks were added across all eight units; the published skill constraint was not weakened.

The first answer-construction audit found a 27.7% uniquely-longest-key rate, a correct/distractor mean-length gap above the project limit, and nine questions with stacked absolute-language distractors. Distractors were rewritten as specific competing physical misconceptions. The fresh post-repair generic audit then passed with the metrics recorded above.

The complete repository gate also caught raw ASCII symbolic notation in new items. All affected expressions were converted to the project's presentation-ready notation, and the full gate was restarted successfully.

A subsequent authoring-side exact-skill pass found five semantic tag defects: a relative-velocity calculation was tagged as comparison, a Newton's-third-law claim was tagged as comparison, and three changed-condition predictions were tagged as comparison. They were corrected to 2.B, 3.B, and 2.D respectively without changing the published delivered-form constraints. Permanent regression now independently recomputes every one of the 46 Practice 2.B answers.

That pass also exposed double-encoded Greek symbols introduced by a mechanical notation rewrite. The source bytes were repaired, remaining ASCII subscripts were normalized, and a permanent regression now rejects common mojibake markers in every stem, option, and rationale. A fresh post-repair generic audit again produced 5,000 / 5,000 valid forms and 26.3% average retake overlap.

## Student-facing simulation

The Physics 1 naive-assessor regression verifies that the shared preflight exposes 42 MCQs, 85 minutes, three-hour full-exam context, calculators permitted throughout, browser-session saving, an explicit start action, return navigation, and the site's MCQ-only limitation. This is a product-level simulation/regression, not a claim of an external human usability study.

## Remaining release gates

- Independent clean-room semantic review by a reviewer that did not author the bank.
- Fresh post-repair independent pass with zero substantive findings.
- Released-mode promotion and full exact-head gate.
- Ephemeral integration branch and integration-to-main pull request gates.
- Exact-main GitHub Pages deployment and public catalog/preflight/exam smoke test.

`releaseStatus` must remain `draft` until the independent clean-room gate is complete.
