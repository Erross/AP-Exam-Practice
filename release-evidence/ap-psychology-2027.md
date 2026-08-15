# AP Psychology — May 2027 release evidence

Candidate built against the current official College Board AP Psychology CED and live AP Central exam format. The current PDF's cover is effective Fall 2025; its carried-forward V.1 body is ©2024. Sources were rechecked on 2026-08-15:

- https://apcentral.collegeboard.org/courses/ap-psychology/exam
- https://apcentral.collegeboard.org/media/pdf/ap-psychology-course-and-exam-description.pdf
- https://apcentral.collegeboard.org/exam-administration-ordering-scores/administering-exams/exam-policies/calculator-policy

## Verified exam facts

- Section I: 75 fully digital multiple-choice questions in 90 minutes, 66.7% of the exam score.
- Full exam duration: 2 hours 40 minutes.
- Five units, each weighted 15–25% of the multiple-choice section.
- MCQ science-practice mix: approximately 65% Concept Application, 25% Research Methods and Design, and 10% Data Interpretation. Argumentation is assessed in free response rather than MCQ.
- Calculators are not permitted on AP Psychology under the current College Board calculator policy.

## Candidate audit

Draft-mode mechanical gate at `9a74fb8343c57dac39655993beb321c981cc1aec`:

- 245 questions; all 35 CED topics represented by seven original items each.
- Unit counts: U1 42, U2 56, U3 63, U4 49, U5 35.
- Raw practice-family counts: Practice 1 140, Practice 2 70, Practice 3 35, Practice 4 0.
- 35 intact two-question synthetic research sets.
- 5,000/5,000 valid constrained draws; observed form envelope P1 48–50, P2 18–20, P3 7–8; 7–8 research sets per form.
- Retake overlap: 33.1%.
- Answer construction: uniquely-longest correct 8.6%; exploitable among-longest 49.0%; correct 4.70 words versus distractors 4.35.
- Raw keys: A 25.7%, B 26.9%, C 23.3%, D 24.1%.
- Repository gate: 202/202 tests passed.

## Clean-room semantic audit and repair

Pass 1 found substantive release blockers despite the green mechanical gate:

- the source comment incorrectly claimed 210 questions even though the implemented architecture contains seven per topic (245 total);
- 70 Practice 1 items were mechanically tagged `1.B` even when they did not assess cultural circumstances, norms, or cognitive bias;
- all 35 standalone methods questions reused one operational-definition template;
- the paired methods questions collapsed to four generic designs;
- all 35 data questions reused one subtraction template, including items mislabeled as inferential `3.C` tasks;
- several research scenarios used topic names decoratively rather than making the methods/data task coherent with the psychological construct.

Repair replaced the research portfolio with topic-linked experimental, correlational, longitudinal, naturalistic-observation, survey-wording, ethics/deception, variability, and single-case designs. Exact 2.A–2.D and 3.A–3.C tags now follow the task actually performed; quantitative checks independently recompute differences, correlation direction, variability, significance, and trends. Concept-application items now use four scenario modes per topic, reserve 1.B for genuine norms/bias applications, and compare the keyed mechanism with a concrete competing mechanism in each rationale.

Post-repair draft audit (local clean checkout):

- 10/10 Psychology regressions passed.
- 5,000/5,000 valid constrained draws.
- Retake overlap: 33.1%.
- Answer construction: uniquely-longest correct 18.4%; exploitable among-longest 39.2%; correct 4.38 words versus distractors 4.26.
- Raw keys: A 25.7%, B 26.9%, C 23.3%, D 24.1%.

Pass 2 restarted the semantic review from the official topic-level essential knowledge and found an additional release blocker: multiple application items crossed current topic boundaries or used material absent from, or expressly excluded by, the current CED. The affected areas were memory (Topics 2.4–2.5), developmental methods and social learning (3.1, 3.3, 3.9), attribution/attitudes/personality/motivation/emotion (4.1–4.2 and 4.4–4.7), and positive psychology, classification, and treatment (5.2, 5.3, 5.5). Most critically, the draft assessed Maslow's hierarchy of needs and the specific names of early emotion theories even though the CED expressly excludes them.

Repair realigned all affected application inventories to the current topic boundaries, replaced specific emotion-theory names with the CED's assessed sequence/label distinctions, and added permanent topic-inventory and exclusion regressions. Memory study targets now follow the encoding/storage split, and social-personality study targets no longer rely on superseded constructs.

The subsequent naive student-eye read caught a repeated grammar defect in the shared comparison-rationale template. The template was repaired across all 140 application items and a regression now rejects the superseded construction.

Post-boundary-repair local gate:

- 11/11 Psychology regressions and 206/206 repository tests passed.
- 5,000/5,000 valid constrained draws.
- Retake overlap: 33.0%.
- Answer construction: uniquely-longest correct 19.2%; exploitable among-longest 42.4%; correct 4.47 words versus distractors 4.34.
- Raw keys: A 25.7%, B 26.9%, C 23.3%, D 24.1%.
- Built artifact: 15 released subjects and 23 released data layers; Psychology remains excluded while in draft status.

Final naive-assessor gate, released-mode gate, integration CI, and production deployment evidence remain pending.
