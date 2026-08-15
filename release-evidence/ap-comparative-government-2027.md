# AP Comparative Government and Politics — May 2027 release evidence

## Governing specification

Release target: Fall 2026 course framework / May 2027 AP Comparative Government and Politics Exam.

Primary College Board sources checked on 2026-08-15:

- AP Comparative Government and Politics Exam — `https://apcentral.collegeboard.org/courses/ap-comparative-government-and-politics/exam`
- AP Comparative Government and Politics Course — `https://apcentral.collegeboard.org/courses/ap-comparative-government-and-politics`
- AP Comparative Government and Politics Course and Exam Description — current AP Central PDF, effective Fall 2026.

Section I is 55 multiple-choice questions in 60 minutes and counts for 50% of the exam score. The current CED describes individual questions plus 3 quantitative-analysis sets and 2 qualitative text-source sets. The six required course countries are China, Iran, Mexico, Nigeria, Russia, and the United Kingdom.

## Blueprint and coverage

Published MCQ unit bands:

- U1 Political Systems, Regimes, and Governments: 18–27%.
- U2 Political Institutions: 22–33%.
- U3 Political Culture and Participation: 11–18%.
- U4 Party and Electoral Systems and Citizen Organizations: 13–18%.
- U5 Political and Economic Changes and Development: 16–24%.

The configured 55-question draw is `12/15/8/9/11`, keeping every unit inside its published band.

Published MCQ practice bands and configured integer envelopes:

- Practice 1 Concept Application: 40–55% → 22–30 questions.
- Practice 2 Country Comparison: 25–32% → 14–17 questions.
- Practice 3 Data Analysis: 10–16% → 6–8 questions.
- Practice 4 Source Analysis: 9–11% → 5–6 questions.
- Practice 5 Argumentation is not explicitly assessed in multiple-choice questions and is excluded from this Section I bank.

The bank covers the exact 42-topic Fall-2026 CED inventory: 1.1–1.10, 2.1–2.9, 3.1–3.9, 4.1–4.6, and 5.1–5.8. Each CED topic has five standalone variants: three Concept Application tasks and two Country Comparison tasks.

## Bank and source portfolio

- Effective bank: **246 questions** in one canonical `data/ap-comparative-government.js` data layer.
- Standalone questions: **210** (42 topics × 5).
- Quantitative source sets: **9 sets × 2 questions = 18 questions**.
- Qualitative text-source sets: **6 sets × 3 questions = 18 questions**.
- Total source groups: **15**.
- Delivered form: exactly **3 quantitative sets + 2 qualitative text-source sets**.
- Variant groups: **84**.

All source material is original synthetic practice material. Quantitative tables explicitly state that their values are constructed for skills practice and are not factual country statistics. Qualitative passages explicitly state that they are original synthetic secondary-source excerpts. No College Board question text is reproduced.

## Clean-room content review

The first structurally valid bank was deliberately rejected during independent review because several generated country-application and country-comparison templates were too generic and produced strong answer-length signals. The clean-room repair replaced generic country-profile matching with topic-specific institutional evidence for all 42 CED topics. Country-comparison questions now require evidence from both named cases, and comparison-implication questions use topic-specific implications instead of one reusable generic conclusion.

The source portfolio was separately hardened. Quantitative questions now use explicit values and plausible competing pattern/causal interpretations. Qualitative-source distractors are parallel alternative readings of the argument rather than short absolute or cartoon-wrong choices.

The resulting bank avoids volatile office-holder and current-election claims; country evidence is intentionally centered on stable institutions and course concepts. Permanent regressions lock the topic-specific application, two-country comparison, implication, mechanism, quantitative-inference, qualitative-source, and Practice-5-exclusion semantics.

## Generic release audit

Final draft full audit on workflow run **`31896236932`**, exact audited head **`66446407c2ba711efc56c90996f6586c03c3b772`**:

- Effective bank: **246 questions / 1 browser data layer**.
- Uniquely-longest correct answer: **16.3%**.
- Exploitable among-longest correct answer: **31.3%**, excluding four-way option-length ties.
- Mean correct-option length: **21.78 words**.
- Mean distractor length: **22.12 words**.
- Raw keys: **A 24.0%, B 25.6%, C 26.0%, D 24.4%**.
- Variant groups: **84**.
- Stimulus groups: **15**.
- Randomized-form audit: **5,000 / 5,000 valid**.
- Independent-attempt overlap: **25.0%**, well below the project 40% ceiling.
- Full repository gate: **177 / 177 tests passed**.
- Production artifact remained at 12 released subjects / 20 released data layers because Comparative Government was still correctly marked draft.
- Dependency audit: 0 vulnerabilities.

Observed randomized-form practice envelope in the permanent 1,500-form subject test was Practice 1 `26–29`, Practice 2 `14–17`, Practice 3 `6`, Practice 4 `6`, all within current published bands.

## Naive-assessor / student-facing gate

The course-specific naive-assessor regression verifies that the student-facing preflight exposes:

- 55 MCQs / 60 minutes.
- calculator not permitted.
- all six required course countries.
- quantitative and text-source analysis in the practice form.
- the shared timed-practice confirmation and local browser-session save behavior.

This is a product-level simulation/regression, not a claim of an external human usability study.

## Promotion criteria

Before promotion from `draft` to `released`:

1. Permanent Comparative Government quality and naive-assessor regressions pass.
2. All one-off Comparative Government wiring, diagnostic, repair, audit workflows, helper scripts, and trigger files are removed.
3. `releaseStatus` is changed to `released` and the metadata regression is updated accordingly.
4. A fresh exact-head 5,000 / 5,000 release audit and full `npm run check` pass on the clean released candidate.
5. Integration PR CI and production PR CI pass before merge to `main`.
6. The GitHub Pages deployment completes successfully on the exact production merge SHA, with the public artifact containing `data/ap-comparative-government.js` and 13 released subjects / 21 released data layers.
