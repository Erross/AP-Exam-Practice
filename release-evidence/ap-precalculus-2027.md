# AP Precalculus — May 2027 release evidence

## Official format
- Governing cycle: Fall 2026 course framework / May 2027 exam.
- Section I: 42 multiple-choice questions in 105 minutes.
- Part A: 29 questions in 65 minutes; calculator not permitted.
- Part B: 13 questions in 40 minutes; graphing calculator required.
- Units 1–3 are examinable; Unit 4 is 0% exam weight and is intentionally excluded from this MCQ bank.

## Bank and CED coverage
- 125 original, unofficial questions.
- 44/44 examinable CED topics represented, with at least two items per topic.
- Exact Fall 2026 skill labels audited across all questions.
- Practice-family mix after clean-room repair: within published CED bands for Practices 1, 2, and 3.
- 14 semantic variant groups prevent same-exam near-duplicate delivery.

## Clean-room findings and repairs
The independent restart audit found and repaired a severely skewed Practice 2 inventory, several exact-skill mismatches, a contradictory linear-model stem, a randomized-delivery dependency, a polar-coordinate equivalence error, an incomplete logarithmic-limit answer, weak distractors, and answer-length cues. Regression tests now lock those repairs.

## Final automated release gate
Exact audited head: `c20166242b2e4decf3a2093edd4aa23768fe3568`.

- Effective bank: 125 questions across 2 browser data layers.
- Draw size: 42.
- Stimulus groups: 0.
- Variant groups: 14.
- Uniquely-longest correct answer: 2.4%.
- Among-longest correct answer: 57.6% (project ceiling 58%).
- Average option length: correct 5.61 words vs distractors 5.89.
- Raw keys: A 25.6%, B 24.8%, C 24.8%, D 24.8%.
- Randomized draw simulation: 5,000 / 5,000 valid.
- Independent-attempt overlap: 36.7% across 5,000 pairs (project target <=40%).
- Full repository gate: 145 / 145 tests passed.
- Dependency audit: 0 vulnerabilities.

## Student-facing / naive-assessor simulation
The release uses the shared catalog and preflight flow whose regression suite verifies that the timer cannot start before confirmation and that timing, part structure, calculator policy, local-save behavior, navigation, and the site's MCQ-only scope are exposed to the student. This is a product-level naive-assessor simulation, not a claim of an external human usability study.

## Promotion decision
All automated, subject-specific clean-room, quantitative spot-check, answer-construction, randomized-draw, retake-overlap, and student-facing interface gates passed. AP Precalculus is approved for release pending promoted-artifact, integration, Pages deployment, and public smoke checks.
