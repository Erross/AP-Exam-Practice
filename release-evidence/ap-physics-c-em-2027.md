# AP Physics C: Electricity and Magnetism — May 2027 release evidence

Status: **released-mode integration candidate**

Verified 2026-08-17 against current official College Board sources.

## Official exam format

- Hybrid digital exam.
- Section I: 42 MCQs, 85 minutes, 50%.
- Section II: 4 FRQs, 95 minutes, 50%.
- FRQ types: Mathematical Routines; Translation Between Representations; Experimental Design and Analysis; Qualitative/Quantitative Translation.
- Calculators are permitted throughout the exam.

Sources:
- https://apcentral.collegeboard.org/courses/ap-physics-c-electricity-and-magnetism
- https://apcentral.collegeboard.org/courses/ap-physics-c-electricity-and-magnetism/exam
- https://apcentral.collegeboard.org/media/pdf/ap-physics-c-electricity-and-magnetism-course-and-exam-description-clarifications.pdf
- https://apcentral.collegeboard.org/media/pdf/ap-physics-c-electricity-and-magnetism-course-at-a-glance.pdf
- https://apcentral.collegeboard.org/exam-administration-ordering-scores/administering-exams/preparing-for-exam-day/calculator-policy

## Published MCQ unit weights

- U8 Electric Charges, Fields, and Gauss's Law: 15–25%
- U9 Electric Potential: 10–20%
- U10 Conductors and Capacitors: 10–15%
- U11 Electric Circuits: 15–25%
- U12 Magnetic Fields and Electromagnetism: 10–20%
- U13 Electromagnetic Induction: 10–20%

The configured 42-question Hamilton draw is 9/6/5/9/7/6 across Units 8–13, with every delivered share inside its published range.

## Published MCQ science-practice weights

- 2.A: 25–30%
- 2.B: 20–25%
- 2.C: 10–15%
- 2.D: 10–15%
- 3.B: 15–25%
- 3.C: 5–10%

Practices 1 and 3.A are FRQ-only. Configured whole-form exact-skill ranges over 42 questions are 2.A 11–12, 2.B 9–10, 2.C 5–6, 2.D 5–6, 3.B 7–10, and 3.C 3–4. These are enforced through `attributeRanges.skill`, matching the established Physics-course drawer contract.

## Exact topic inventory — 31 topics

U8: 8.1 Electric Charge and Electric Force; 8.2 Conservation of Electric Charge and the Process of Charging; 8.3 Electric Fields; 8.4 Electric Fields of Charge Distributions; 8.5 Electric Flux; 8.6 Gauss's Law.

U9: 9.1 Electric Potential Energy; 9.2 Electric Potential; 9.3 Conservation of Electric Energy.

U10: 10.1 Electrostatics with Conductors; 10.2 Redistribution of Charge between Conductors; 10.3 Capacitors; 10.4 Dielectrics.

U11: 11.1 Electric Current; 11.2 Simple Circuits; 11.3 Resistance, Resistivity, and Ohm's Law; 11.4 Electric Power; 11.5 Compound Direct Current Circuits; 11.6 Kirchhoff's Loop Rule; 11.7 Kirchhoff's Junction Rule; 11.8 Resistor Capacitor (RC) Circuits.

U12: 12.1 Magnetic Fields; 12.2 Magnetism and Moving Charges; 12.3 Magnetic Fields of Current-Carrying Wires and the Biot-Savart Law; 12.4 Ampère's Law.

U13: 13.1 Magnetic Flux; 13.2 Electromagnetic Induction; 13.3 Induced Currents and Magnetic Forces; 13.4 Inductance; 13.5 Circuits with Resistors and Inductors (LR Circuits); 13.6 Circuits with Capacitors and Inductors (LC Circuits).

## Candidate bank

- 152 original, unofficial questions.
- Exact 31/31 CED-topic coverage.
- At least four independent standalone questions per topic.
- Per-unit bank counts: U8 28, U9 16, U10 21, U11 37, U12 21, U13 29.
- Six original synthetic table stimulus sets, one per unit, with three linked questions per set.
- No released or secure College Board question is reproduced.
- Ten additional symbolic-derivation questions were added to improve genuine 2.A depth rather than misclassifying numerical calculations.
- Each synthetic set contains a genuine 2.C comparison item so whole-set selection does not suppress comparison practice.

## Development and adversarial gate history

Development gates exposed and drove repair of duplicate/case-colliding symbolic options, stacked absolute-language distractors, residual programmer-style notation, a slight answer-length imbalance, temporary loss of stimulus grouping during a rewrite, two sub-90-character explanations, and a drawer metadata contract defect. Exact skill constraints were moved from `skillCountRanges` to `attributeRanges.skill`, after which a direct production-drawer probe improved from 0/30 to 30/30 valid forms.

The final static repairs included case-normalized Gauss's-law distractors in `em-8.6-02` and `em-8.6-05`, plus substantive rationale expansion for `em-12.3-02` and `em-12.4-02`.

## Quantitative and naive gates

Persistent regressions independently recompute the bank's explicit numerical and representative symbolic results. The quantitative inventory and recomputation tests pass. The naive student-facing audit also passes and verifies the May 2027 preflight facts: 42 MCQs, 85 minutes, calculator permitted, hybrid exam context, original/unofficial content, and MCQ-only scope.

## Clean-room semantic review

The first fresh semantic review used the current College Board exact science-practice definitions rather than family-level labels. It found a contained set of real issues and therefore invalidated the earlier successful 5,000/5,000 audit as final release evidence.

Repairs included:

- `em-9.2-02`: 2.C → 3.B because it makes a model-based claim rather than comparing a quantity across scenarios.
- `em-set-u8-03`, `em-set-u9-03`, `em-set-u12-02`, and `em-set-u13-03`: 2.A → 3.B because they select a model/law supported by data rather than derive a symbolic expression.
- Fourteen 2.A prompts were rewritten so the student must follow an explicit symbolic mathematical pathway rather than answer by bare equation recall.
- `em-12.4-01` was reauthored into a genuine Ampère-law derivation/application using a circular Amperian path and the intermediate equation `B(2πr)=μ₀I`.

These repairs are protected by `tests/ap-physics-c-em-clean-room.test.js`. A fresh second semantic pass then reviewed the repaired anchors and remaining 2.C, 2.D, 3.B, and 3.C families and found no further substantive semantic defects: 2.C items compare quantities, 2.D items predict new values/factors from functional dependence, 3.B items make law/model-based claims, and 3.C items require justification/support.

Post-review repository CI on candidate `9c00b3b4e786f77df567f8483b62a2755f4c586b` passed the full `npm run check` workflow (run `32073453224`, job `95521465159`). The preceding run that first exercised the clean-room tests had only a too-narrow regression regex; the bank itself passed its 500 constrained draws and other gates. The regex was corrected without changing content.

## Final post-review generic release audit

Required command:

`npm run release:audit -- --subject ap-physics-c-em --trials 5000 --overlap-trials 5000`

Final post-review audit head: `4eb041c3b19aa9d99c016e8ed78af24b7ec66299`

Workflow run `32073550406`, job `95521749449`: **SUCCESS**.

Results:

- 152 questions from one browser data layer.
- Uniquely-longest correct option: **13.2%**.
- Exploitable among-longest: **28.9%**.
- Mean correct option length: **5.03 words**; mean distractor length: **4.65 words**.
- Raw correct-key positions: **A 25.0%, B 25.0%, C 25.0%, D 25.0%**.
- Variant groups: 0; stimulus groups: 6.
- **Draw audit: 5,000/5,000 valid**.
- **Retake overlap: 30.3%** average shared questions, below the project 40% target.

The temporary post-review audit workflow was removed immediately after completion. Stable clean subject-branch CI then passed on `230af9971b74ab78e0e50262f4340506e94b1ed1` (run `32073783436`, job `95522485335`).

## Release integration status

Fresh integration branch `integration/ap-physics-c-em-release` was created from current `main` at `3c4bd0f3bffbe08510a4b02e6c860aceedfd9bdd`. PR #64 merged the reviewed draft candidate into that branch at merge commit `89aec0e6262af6e964b08b3dd4c9495e80f21ef7`.

The isolated promotion changed only AP Physics C: Electricity and Magnetism from `releaseStatus: "draft"` to `"released"` and updated its release-mode metadata assertion. Promotion commit: `906bc85a7c5af53c6be828a5baece309feac3096`.

The first released-mode integration run (`32074175895`, job `95523704066`) passed 240/241 tests; its sole failure was the naive audit's stale `releaseStatus === "draft"` assertion. No content/draw/quantitative/semantic failure occurred. That assertion was corrected to `released`. Exact-head integration CI then passed on `70a6f400717e039261bd867ff6dc43316adf3332` (run `32074783354`, job `95525511009`).

A separate integration artifact build then ran `npm run check`, built `_site`, and uploaded the actual shipped site from head `5400a802ae956b79cb647cfca52e17b6732fb7d2` (run `32074918582`, job `95525929881`): **SUCCESS**. Artifact `em-release-site`, ID `9303090360`, size 9,381,175 bytes, digest `sha256:4c99aa0e419f6078ae2e3b57ec3fcf0cb99b4515b95114a217c72abfc2ba1583`.

The downloaded artifact was independently unpacked and inspected. Its `release-manifest.json` contains **19 released subjects**, including `ap-physics-c-em`, and includes `data/ap-physics-c-em.js`. Artifact `index.html` loads `data/ap-physics-c-em.js`. Artifact `js/subjects.js` exposes E&M as `releaseStatus: "released"`, 42 MCQs, 85 minutes, calculator permitted, with the reviewed six-unit and exact-skill constraints. The temporary artifact-verification workflow was removed after inspection.

Final merge to `main` is now blocked only on one clean exact-head repository CI after artifact-workflow cleanup and this evidence update; after that, the production PR may be merged with an expected-head guard, followed by exact-main Test/Pages deployment and public-site smoke verification.
