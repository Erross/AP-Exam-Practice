# Subject Release Checklist

Use this checklist for every new or materially revised AP course. A course is not release-ready merely because its bank exists or its subject-specific tests pass.

## 1. Official specification gate

- [ ] Branch was created from current `main`.
- [ ] `releaseStatus` remains `"draft"` during development.
- [ ] Current College Board exam page and governing CED were checked independently.
- [ ] Verification date and source are recorded beside exam metadata in `js/subjects.js`.
- [ ] MCQ count, timing, calculator policy, units/categories, weights, topic codes, and skill/practice taxonomy are current.
- [ ] Any redesign effective date is explicitly accounted for.

**Stop if the specification is uncertain. Do not build a bank against an unverified blueprint.**

## 2. Bank design gate

- [ ] Target bank size is comfortably larger than one delivered draw.
- [ ] Every in-scope CED topic has coverage; two or more independent items per topic is preferred.
- [ ] Required stimulus/data/passage groups are designed as atomic `stimulusGroupId` sets.
- [ ] Near-duplicate standalone items use `variantGroupId`.
- [ ] Variant comparisons include the entire effective bank, not only newly added questions.
- [ ] No item has both `stimulusGroupId` and `variantGroupId`.

## 3. Content quality gate

- [ ] Stable unique IDs.
- [ ] Exactly four options for current single-select AP MCQ subjects.
- [ ] Exactly one unambiguous correct answer.
- [ ] Plausible AP-level distractors rather than cartoon wrong answers.
- [ ] Exact CED topic and skill/practice tags match the task actually performed.
- [ ] Item-specific rationales explain why the answer is correct.
- [ ] Quantitative answers were independently recomputed.
- [ ] Text/data/visual stimuli have real provenance or are clearly labeled original/synthetic.
- [ ] Visuals were inspected at application display size and agree with question text and alt text.

## 4. Automated release audit

Run the reusable generic audit:

```bash
npm run release:audit -- --subject ap-<course-id> --trials 5000 --overlap-trials 5000
```

Record the output in the release PR. The command checks the effective browser bank loaded in `index.html` order and reports:

- bank size and source layers;
- generic schema integrity;
- unit validity where units are declared;
- stimulus and variant-group integrity;
- correct-answer length bias;
- raw answer-position balance;
- repeated randomized draw success;
- same-attempt variant exclusion;
- average independent-attempt overlap.

Target average overlap is **<= 40%**.

The generic audit complements, but does not replace, subject-specific CED/blueprint tests.

## 5. Subject-specific automated gate

- [ ] Subject test file exists in `tests/`.
- [ ] Exact CED topic inventory is asserted.
- [ ] Exact skill/science-practice distributions are asserted where applicable.
- [ ] Exam-part/calculator/set-blueprint behavior is asserted where applicable.
- [ ] Known quantitative calculations have regression coverage.
- [ ] Known visual/source/transcription constraints have regression coverage.
- [ ] Thousands of draws satisfy every subject-specific constraint.
- [ ] `npm run check` passes from a clean install.

## 6. Clean-room independent audit

A reviewer/session that did not author the content must independently verify from current sources:

- [ ] official exam blueprint;
- [ ] exact CED semantic alignment;
- [ ] answer correctness and ambiguity;
- [ ] distractor competitiveness;
- [ ] quantitative correctness;
- [ ] visual self-consistency;
- [ ] provenance/source claims;
- [ ] near-duplicate handling against the whole bank.

Use **audit -> repair -> restart from scratch**. Do not treat "all findings fixed" as equivalent to a fresh clean pass.

Release target: **zero substantive findings on a fresh post-repair pass**.

## 7. Naive assessor gate

Use a fresh assessor who has not been briefed on how the interface is supposed to work. Do not explain controls during the test.

Give only this task:

> You want to take a realistic AP `<subject>` multiple-choice practice exam. Use this site.

### Catalog

- [ ] Finds the course immediately.
- [ ] Understands that released courses are available now.
- [ ] Understands the MCQ count/time shown on the card.
- [ ] Knows what action starts practice.

### Preflight

Before the assessor starts, ask what they believe they are about to take.

- [ ] Correct question count.
- [ ] Correct timing.
- [ ] Correct calculator/part rules where relevant.
- [ ] Understands save/resume behavior.
- [ ] Understands current scope is MCQ practice, not FRQ/essay/written-response practice.

### In-exam

- [ ] First question renders without confusing notation or layout.
- [ ] Can answer and change an answer.
- [ ] Can flag/review and navigate.
- [ ] Can handle part transitions where applicable.
- [ ] Refresh/resume behavior is understandable.

### Completion

- [ ] Can submit without assistance.
- [ ] Understands the result applies to this practice section, not an official AP score.
- [ ] Can review explanations.
- [ ] Can return to the catalog and begin another attempt.

### Trust comprehension

Without prompting, the assessor should understand approximately:

> This is free, unofficial, original AP-style MCQ practice using current exam formats. It is not College Board and does not currently provide FRQ/essay/written-response practice.

If the assessor materially misunderstands the product, the release fails. After a UX repair, restart with a **new naive assessor**.

## 8. Release evidence package

A release PR should include evidence in this form:

```text
AP <Subject> release candidate

Official format:
  <count> MCQ / <minutes> min
  source: <official source>
  verified: <date>

Bank:
  <n> questions
  <x>/<x> CED topics covered
  <n> stimulus groups

Generic release audit:
  <trials>/<trials> valid draws
  retake overlap: <percent>
  uniquely longest correct: <percent>
  raw keys: A <percent>, B <percent>, C <percent>, D <percent>

Clean-room review:
  pass 1: <findings>
  pass 2: <findings>
  final fresh pass: 0 substantive findings

Naive audit:
  catalog: pass
  preflight: pass
  exam navigation: pass
  completion: pass
  trust/scope comprehension: pass
```

## 9. Promotion and integration

Only after the gates above pass:

- [ ] Change `releaseStatus` from `"draft"` to `"released"` in a small, reviewable promotion change.
- [ ] Create a fresh ephemeral `integration/...` branch from current `main`.
- [ ] Merge the reviewed subject/core heads into integration.
- [ ] Run `npm ci` and `npm run check` on the exact integration head.
- [ ] Re-run large randomized draw/overlap simulations if they are not part of the standard gate.
- [ ] Build `_site/` and verify the release manifest contains the new released subject and no draft bank.
- [ ] Smoke-test catalog -> preflight -> exam start using the production artifact.
- [ ] Merge integration -> `main` only when all required checks are green.

## 10. Production deployment gate

- [ ] GitHub Pages workflow completes from the exact `main` merge commit.
- [ ] Build and artifact upload passing is not mistaken for successful deployment; the final Pages deploy step must be green.
- [ ] Public catalog shows the course and correct metadata.
- [ ] Public preflight shows the correct format.
- [ ] A real public-site attempt starts and renders correctly.
- [ ] Navigation, save/resume, submit, explanations, About/limitations, and return-to-catalog behavior work.

If Pages deployment fails after merge, treat production as impaired and fix deployment immediately.