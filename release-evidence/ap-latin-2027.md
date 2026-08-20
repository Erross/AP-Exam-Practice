# AP Latin — 2027 release evidence

## Reviewed candidate

- Subject branch: `subject/ap-latin-2027`
- Fresh post-repair reviewed content candidate: `5e3dac0b3d80f2c1a9bde23cac8a508e1e81c4a7`
- Exact GitHub PR merge candidate tested: `0350c6fe85215688c996674e455a550c72df8297`
- PR: #76
- Verification date: 2026-08-20

## Official format verification

Current College Board AP Latin materials were rechecked independently on 2026-08-20 against the revised Pliny/Vergil framework used for the May 2027 exam.

- The exam is **fully digital** and lasts **3 hours**.
- Section I: **52 multiple-choice questions / 65 minutes / 50% of exam score**.
- Section I geometry is:
  - **20 discrete sight-reading questions**;
  - **2 short sight-reading sets × 3 questions = 6**;
  - **2 short syllabus-reading sets × 3 questions = 6**;
  - **2 long syllabus-reading sets × 10 questions = 20**.
- Section II: **5 free-response questions / 115 minutes / 50% of exam score**.
- The course also includes **two in-class course-project checkpoint tasks**.
- The revised syllabus framework uses **Pliny the Younger and Vergil**.
- Calculator: not used.

Authoritative sources:

- AP Students exam page: https://apstudents.collegeboard.org/courses/ap-latin/assessment
- AP Central course page: https://apcentral.collegeboard.org/courses/ap-latin
- Revised AP Latin Course and Exam Description / required reading materials: https://apcentral.collegeboard.org/courses/ap-latin/course

## Browser-effective bank

- **166 questions** total.
- **58 discrete-sight questions** from 29 independently composed sight passages/sentences.
- **8 short-sight sets**, three questions each.
- **8 short syllabus sets**, three questions each.
- **6 long syllabus sets**, ten questions each.
- **30/30 revised Course-at-a-Glance topics** represented.
- **9 browser data layers**, in canonical order:
  1. base Latin bank;
  2. sight sets;
  3. syllabus short sets;
  4. first long-set layer;
  5. Aeneid 2 long set;
  6. Aeneid 4 long set;
  7. Aeneid 6 long set;
  8. exact-skill repairs;
  9. substantive answer curation.
- Browser metadata and the scalable whole-set drawer are explicitly wired before exam runtime.

Every delivered 52-question form is constrained to the exact official Section I structure: 20 discrete sight questions, two complete short-sight sets, two complete short-syllabus sets, and two complete long-syllabus sets.

## Findings and repairs

Development and independent review found several issues that were repaired before this reviewed candidate:

- initial answer-length bias, especially in comprehension-heavy items;
- a temporary answer-hardening layer that appended repetitive contextual qualifier tails to distractors;
- missing exact 2B historical/cultural-context coverage;
- a style-effect question incorrectly caught by a grammar-function diagnostic;
- an evidence-analysis item family that needed genuinely textual evidence selection rather than conclusion restatement;
- stale bank-count assumptions (158/50) after the legitimate discrete inventory expanded to 166/58;
- a combinatorial drawer implementation that attempted to enumerate enormous `C(58,20)`-scale combinations and could exhaust memory;
- a notation diagnostic that did not yet understand Latin's multi-layer browser bank.

The temporary qualifier-tail layer was **deleted**, not weakened or accepted. It was replaced by substantive answer curation that shortens over-explained keyed answers while preserving meaning and leaves already-good distractors alone.

The Latin set drawer now uses bounded randomized exact selection rather than enumerating the combination universe.

## Independent source/content review

A fresh source pass checked the revised reading framework and representative/full long passages against independent public-domain editions rather than trusting branch metadata.

- Pliny, *Letters* 6.16 Vesuvius passage: checked against Perseus.
- Pliny, *Letters* 7.27 ghost-house passage: checked against independent public-domain text.
- Vergil, *Aeneid* 1 opening: checked against Perseus.
- Vergil, *Aeneid* 2 horse-entry sequence: checked against Perseus.
- Vergil, *Aeneid* 4 Dido confrontation: checked against Perseus.
- Vergil, *Aeneid* 6 underworld Dido scene: checked against Perseus.

No substantive transcription or question-key contradiction was found; observed differences were normal editorial spelling/punctuation variants.

The final semantic checks also confirm:

- all exact skill tags used by the bank belong to the revised framework;
- 2B actually asks for historical/cultural contextualization;
- grammar-function items are 1B without misclassifying stylistic-effect items;
- evidence-analysis repairs require passage evidence;
- sources, keys, rationales, and schema are structurally release-grade.

## Naive student-facing review

The browser-effective preflight exposes the facts a student needs before starting:

- **52 questions**;
- **65 minutes**;
- **3-hour official exam**;
- **no calculator**;
- explicit **fully digital Section I practice** scope;
- explicit note that the official exam also contains **five FRQs** and **two course-project checkpoints**.

The generic catalog/preflight UI is regression-tested to surface count, timing, total duration, calculator status, and the Latin-specific scope note.

## Exact candidate CI evidence

GitHub Actions Test run **#1825**, run ID **32370417007**, checked out exact PR merge SHA `0350c6fe85215688c996674e455a550c72df8297` and completed successfully.

- **391/391 tests passed**.
- AP Latin browser-effective answer construction:
  - uniquely-longest correct: **17.5%**;
  - exploitable among-longest: **56.0%**;
  - correct answers: **6.06 words average**;
  - distractors: **5.47 words average**;
  - raw keys: **[43, 34, 47, 42]** = 25.9%, 20.5%, 28.3%, 25.3%.
- Browser-effective draw simulation: **5,000/5,000 valid** exact 52-question forms.
- Browser-effective independent retake overlap: **31.6%** average shared questions.
- Additional Latin draft draw/overlap tests: green.
- Exact-skill semantic suite: green.
- Naive preflight suite: green.
- Cross-bank notation/presentation diagnostic: green.
- Physics C Mechanics' prior one-off constrained-draw exhaustion did not reproduce; its full randomized-form and retake tests passed without any Mechanics change.
- Build: **25 released subjects / 100 released data layers** because Latin remained draft.
- Artifact check confirmed draft Latin data was excluded from the public artifact.
- `npm audit --omit=dev`: **0 vulnerabilities**.

## Promotion and production gates still required

The reviewed content candidate above is ready for promotion, but production release is not complete until:

1. the small `draft` → `released` promotion change is made;
2. all Latin tests are updated only where they intentionally assert release state;
3. fresh CI passes on the exact promoted PR merge candidate;
4. a fresh integration candidate is produced from current `main`;
5. full CI passes on that exact integration SHA;
6. the production artifact includes AP Latin and all nine Latin data layers;
7. the exact tested integration commit is merged/moved to `main`;
8. the GitHub Pages deployment from that exact `main` commit is verified if the available tooling exposes it;
9. public catalog/preflight/exam-start smoke verification succeeds where observable.
