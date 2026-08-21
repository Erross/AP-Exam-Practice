# Content Authoring Standards

This is the repository's source of truth for AP question-bank quality. A new or materially revised course is not review-ready until it satisfies these standards and the evidence requirements in [`SUBJECT_RELEASE_CHECKLIST.md`](SUBJECT_RELEASE_CHECKLIST.md).

The production catalog currently contains 29 released courses, so these rules are written for a mature multi-course system rather than an early two-course prototype.

## 1. Verify the official specification

Do not build from memory.

- Check the **current** College Board exam page and the governing Course and Exam Description (CED), Course-at-a-Glance, or equivalent current specification.
- Record the verification date and source beside the effective exam metadata. Metadata may live in `js/subjects.js` or in a course-specific metadata overlay loaded later by `index.html`.
- Verify question count, timing, calculator policy, exam parts, unit/category weights, topic codes/titles, skill/practice taxonomy, stimulus/set rules, and any select-two/multi-select behavior.
- Use College Board's published ranges exactly. If the drawer needs a point estimate, document how it was derived.
- Every topic/skill code used by the bank must be real and semantically correct for the task the student actually performs.
- Cover every in-scope topic; two or more independent items per topic is preferred where the course structure permits it.

If the official specification is uncertain, stop. Do not make a bank conform to an invented blueprint.

## 2. Correct answer and option construction

Every item must have an unambiguous scoring rule.

- Single-select items require exactly one correct option.
- A course using official select-two or other multiple-select items must declare that behavior explicitly and have the exact required number of correct options, plus runtime, shuffling, persistence, restoration, and scoring tests.
- Distractors must be plausible same-domain misconceptions, not cartoonishly false filler.
- Every distractor must actually be wrong under the stem/stimulus as written.
- Avoid stems or answers that rely on unstated assumptions, ambiguous terminology, or multiple defensible interpretations.
- Runtime option shuffling must preserve the semantic key.

### Statistical-tell limits

Automated checks should keep answer construction from advertising the key:

- uniquely longest correct option: roughly **≤25%**;
- correct option among the longest: roughly **≤58%**;
- mean correct-answer word count versus distractors: within roughly **12%**;
- raw key positions for four-option banks: each slot roughly **15–35%**;
- no stacking multiple conspicuous `always / never / only / entirely / unlimited`-style distractors in one item.

Course-specific evidence may justify a different metric, but weakening a gate only to make a failing bank pass is not acceptable.

## 3. Duplicate and retake control

Two distinct problems need separate controls.

### Within an attempt

- Shared-source questions use `stimulusGroupId` and are selected as complete atomic groups.
- Near-duplicate standalone items use `variantGroupId` so one attempt cannot contain multiple variants of the same narrow concept/scenario.
- A question must not use both `stimulusGroupId` and `variantGroupId`.
- Variant families must be checked against the **whole effective bank**, not only newly added questions.

### Across attempts

The bank must be large and varied enough to make retakes useful. Measure this rather than assuming it.

Run thousands of independent exam pairs and report mean question overlap. The project target is **≤40% average overlap** unless a documented course structure makes that mathematically impossible and the release review explicitly accepts the limitation.

## 4. Quantitative and factual accuracy

- Independently recompute every calculation-based answer.
- Check units, rounding, signs, graph/table readings, inferential logic, and denominator choices.
- Do not describe a trend the source does not show.
- Do not make conclusions at a more specific level than the evidence supports.
- Fact-check time-sensitive or course-specific claims against authoritative sources.
- Add regression tests for any substantive quantitative or factual defect found during review.

## 5. Sources, stimuli, and provenance

- Real text/data/image stimuli need sufficient provenance to identify the source.
- Invented material must be labeled consistently as original/synthetic/simulated; never imply an invented dataset is published evidence.
- Shared stimuli must be internally consistent across every linked question.
- Text transcriptions must be checked where exact wording matters.
- Visual paths must resolve, render legibly at application size, and agree with the question and alt text.
- Alt text must describe the visual without leaking the answer or interpreting the source for the student.
- Source metadata must not falsely suggest College Board authorship.

## 6. Rationale quality

Every question needs an item-specific explanation that teaches rather than merely restating the key.

- Explain why the correct answer follows from the concept/stimulus.
- Address the main misconception behind distractors where useful.
- Reject generic templates such as “This item applies CED Topic X.”
- Keep the repository's automated minimum-rationale and boilerplate checks green.

## 7. Browser-effective bank is the thing being released

Many courses use multiple data/quality/source layers. Review and test the bank in the same order the browser loads it.

- `index.html` load order is authoritative for effective browser content.
- Tests that manually load layers must match that order.
- Production `_site/` must contain every required layer for released courses and no draft/out-of-scope data layers.
- A source file being correct in isolation is insufficient if a later overlay changes it.

## 8. Automated verification

For every new or materially revised course, run the reusable release audit:

```bash
npm run release:audit -- --subject ap-<course-id> --trials 5000 --overlap-trials 5000
```

It checks the effective browser bank and reports schema/group integrity, bias metrics, repeated draw success, variant exclusion, and retake overlap. It complements rather than replaces exact course tests.

Also require:

- course-specific CED/topic/skill/part/set tests;
- thousands of exact constrained draws;
- known quantitative/source/visual regression tests;
- `npm ci` from a clean checkout;
- `npm run check` for the repository-wide test/build/artifact/dependency gate.

## 9. Independent review

A reviewer/session that did not author the content must independently re-check:

- official blueprint and CED semantics;
- answer correctness and ambiguity;
- distractor competitiveness;
- calculations and factual claims;
- source/provenance claims;
- visual self-consistency;
- duplicate/variant handling against the whole bank.

Use **audit → repair → restart from scratch**. A list of repaired findings is not equivalent to a fresh clean pass. Release target: **zero substantive findings on a fresh post-repair review**.

A separate fresh naive assessor must also be able to understand the catalog, preflight, MCQ-only scope, navigation, submission, results, and unofficial status without coaching.

## 10. Promotion rule

Keep unfinished work `releaseStatus: "draft"`. Move a course to `"released"` only after the complete subject gate is satisfied and the promotion itself is small and reviewable.

The promoted course must then pass the integration/release workflow on the exact prospective production tree before `main` is changed. See [`DEVELOPMENT_WORKFLOW.md`](DEVELOPMENT_WORKFLOW.md).
