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

Configured whole-form skill ranges over 42 questions are 2.A 11–12, 2.B 9–10, 2.C 5–6, 2.D 5–6, 3.B 7–10, and 3.C 3–4.

## Candidate bank

The subject remains `draft` until the promotion/integration gates pass.

- 144 original, unofficial questions.
- Exact 41/41 CED-topic coverage.
- At least three independent standalone questions per topic.
- Per-unit bank counts: U1 18, U2 33, U3 18, U4 15, U5 21, U6 21, U7 18.
- Seven original synthetic table stimulus sets, one per unit, with three linked questions per set.
- No released or secure College Board question is reproduced.
- Student-facing notation was normalized after the first full-suite diagnostic exposed raw authoring notation.
- A persistent quantitative regression independently recomputes every calculation-bearing item identified by the inventory detector, including all numerical shared-set results.
- A persistent clean-room regression protects the semantic skill-tag repairs and the student-facing typo repair described below.

## Development and adversarial gate history

The early full-suite candidate runs were intentionally used as defect-finding gates rather than treated as release evidence. They exposed and drove repair of:

1. short rationales below the project quality floor;
2. raw programmer-style notation in student-facing Physics C text;
3. stacked absolute-language distractors;
4. a slight correct-answer length imbalance above the 12% project limit;
5. incomplete quantitative-audit inventory coverage;
6. one cross-realm test-harness comparison defect after that inventory was completed.

The answer-length repair strengthened weak conceptual distractors rather than padding text. The quantitative recomputation assertions themselves passed; the final inventory detector now reports no uncovered calculation-bearing items.

## Clean-room semantic/content review

A fresh semantic review was performed against the exact College Board MCQ science-practice definitions, not merely against the list of allowed skill codes. The first pass found and repaired the following substantive tagging issues:

- `pcm-2.3-02`: 2.C → 3.B (apply Newton's third law to make a claim).
- `pcm-4.3-03`: 2.C → 3.B (apply momentum conservation to make a claim).
- `pcm-2.6-01`: 2.B → 2.A (derive/select a symbolic gravitational-force expression).
- `pcm-5.4-01`: 2.B → 2.A (derive/select a symbolic rotational-inertia expression).
- `pcm-6.6-01`: 2.B → 2.A (derive/select the symbolic circular-orbit-speed expression).
- `pcm-7.5-01`: 2.B → 2.A (derive/select the symbolic simple-pendulum-period expression).
- `pcm-7.3-01`: 2.B → 3.B (make a qualitative claim about SHM at equilibrium rather than calculate a quantity).
- `pcm-7.4-01`: 2.B → 2.A (derive/select the symbolic oscillator-energy expression).

The same pass repaired the student-visible `mus N` typo in `pcm-2.7-02` and removed the stale development comment that said only Units 1–2 were populated.

A fresh post-repair pass rechecked the repaired anchors and the remaining comparison, factor-of-change prediction, claim, and justification families. It found zero further substantive semantic/content defects. This is a clean-room review performed within the project workflow, not an external human usability study.

## Generic release audit — post-review candidate

The required reusable release audit was rerun after the semantic retagging so that draw feasibility and overlap evidence reflect the final reviewed skill pool.

Command:

`npm run release:audit -- --subject ap-physics-c-mechanics --trials 5000 --overlap-trials 5000`

Result on the post-review candidate:

- 144 effective questions from one browser data layer.
- Answer pattern: 7.6% uniquely-longest correct answers.
- Exploitable among-longest correct answers: 25.0% (four-way ties excluded).
- Mean correct option length: 3.40 words.
- Mean distractor option length: 3.09 words.
- Raw keys: A 25.0%, B 25.0%, C 25.0%, D 25.0%.
- Seven stimulus groups; no variant groups required.
- Draw audit: 5,000/5,000 valid forms.
- Independent-retake overlap: 33.8% average shared questions, below the project 40% target.

## Naive/preflight gate

The Mechanics-specific naive regression verifies that the student-facing preflight exposes the May 2027 exam-critical facts, including the 42-question / 85-minute MCQ section, calculator availability, total exam timing, and the MCQ-only scope of this practice product. The product-level regression is not represented as an external human usability study.

## Remaining release gates

Development/content gates are complete once the final transient-workflow cleanup head receives a clean repository-wide `npm run check` result.

After that, remaining work is release mechanics only:

- small released-mode promotion (`releaseStatus: "draft"` → `"released"`) with corresponding regression update;
- integration from current `main` using the project release checklist;
- exact integration/main `npm ci` + `npm run check`, artifact/manifest verification;
- GitHub Pages deployment from exact main head;
- public catalog, preflight, and exam smoke verification.
