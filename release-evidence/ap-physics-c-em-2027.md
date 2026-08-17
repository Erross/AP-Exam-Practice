# AP Physics C: Electricity and Magnetism — May 2027 release evidence

Status: **development / draft**

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

The current draft candidate contains:

- 152 original, unofficial questions.
- Exact 31/31 CED-topic coverage.
- At least four independent standalone questions per topic.
- Per-unit bank counts: U8 28, U9 16, U10 21, U11 37, U12 21, U13 29.
- Six original synthetic table stimulus sets, one per unit, with three linked questions per set.
- No released or secure College Board question is reproduced.
- Ten additional symbolic-derivation questions were added to improve genuine 2.A depth rather than misclassifying numerical calculations.
- The six synthetic-set lead questions were semantically corrected from 3.C to 3.B because they ask students to make claims from evidence rather than justify an existing claim.
- Each synthetic set now includes a genuine 2.C comparison item so whole-set selection does not artificially suppress comparison practice.

## Development and adversarial gate history

Early completed-candidate runs were intentionally used as defect-finding gates rather than release evidence. They exposed and drove repair of:

1. duplicate/case-colliding symbolic options in the Gauss's-law derivation items;
2. stacked absolute-language distractors;
3. residual programmer-style subscript notation;
4. a slight correct-answer length imbalance above the project 12% limit;
5. accidental loss of stimulus grouping during one development rewrite, repaired before release testing;
6. a metadata contract defect in which exact skills were placed in `skillCountRanges` even though that field is intentionally collapsed to practice families by the generic drawer;
7. two final magnetic-field rationales below the project 90-character explanation floor.

The exact-skill contract was repaired to `attributeRanges.skill`, matching AP Physics 1, AP Physics 2, and AP Physics C: Mechanics. A direct post-fix probe produced 30/30 valid constrained forms after the pre-fix configuration produced 0/30.

Answer-length hardening strengthened plausible conceptual distractors rather than padding text. The latest diagnostic measured mean correct option length 5.04 words versus 4.66 words for distractors, comfortably inside the project 12% limit. All six stimulus groups were confirmed at exactly three linked questions after the grouping repair.

The symbolic option collisions arose because mathematically different expressions became identical after the schema gate normalized variable case. `em-8.6-02` and the subsequently exposed `em-8.6-05` were both repaired with dimensionally plausible but case-insensitively distinct incorrect radial dependences.

The final explanation-floor defects were `em-12.3-02` and `em-12.4-02`. Their rationales were expanded with substantive Biot–Savart directionality and long-solenoid field reasoning, respectively, rather than filler. Those repairs are on `9a1c0676b0f05103192ceb17a9c4647cd83a50d6`; this normal evidence commit triggers the exact-head repository check before the 5,000/5,000 release audit.

## Generic release audit

Pending final exact-head repository CI, persistent quantitative/naive regressions, and post-repair semantic review.

Required command before promotion:

`npm run release:audit -- --subject ap-physics-c-em --trials 5000 --overlap-trials 5000`

Final 5,000/5,000 draw and retake-overlap metrics will be recorded here only after that command completes successfully on the reviewed candidate.

## Release integration status

Current status: draft. Promotion to `released` is blocked until all subject-specific, quantitative, naive, generic release-audit, clean-room semantic review, exact-head CI, integration, and production deployment gates are complete.
