# Subject Release Checklist

Use this checklist for every new or materially revised AP course. A bank is not release-ready merely because it exists or its own tests pass.

## 1. Official specification

- [ ] Work started from current `main`.
- [ ] `releaseStatus` remains `"draft"` during development.
- [ ] Current College Board exam page and governing CED/current specification were checked independently.
- [ ] Verification date/source are recorded beside the **effective** metadata (base registry or course metadata overlay).
- [ ] [`OFFICIAL_AP_SOURCES.md`](OFFICIAL_AP_SOURCES.md) contains the course's stable AP Central course/CED link and current exam-format link.
- [ ] The public `official-sources.html` page exposes the same source set and an accurate verification snapshot for the current alignment claim.
- [ ] MCQ count, timing, calculator policy, parts, units/categories, weights, topic codes, skills/practices, set rules, and selection type are current.
- [ ] Any redesign effective date is accounted for explicitly.

**Stop if the official blueprint is uncertain.**

## 2. Bank design

- [ ] Bank size is comfortably larger than one delivered draw.
- [ ] Every in-scope topic has meaningful coverage; multiple independent items per topic are preferred.
- [ ] Shared source/data/passage/image questions use complete atomic `stimulusGroupId` sets.
- [ ] Near-duplicate standalones use `variantGroupId`.
- [ ] Variant comparison includes the whole effective bank, not only newly added questions.
- [ ] No question has both `stimulusGroupId` and `variantGroupId`.
- [ ] Browser layer order is intentional and documented by `index.html`.

## 3. Item quality

- [ ] Stable unique IDs.
- [ ] Four-option single-select items have exactly one unambiguous key.
- [ ] Any official select-two/multiple-select items have the exact required key count and explicit runtime/shuffle/persistence/scoring tests.
- [ ] Distractors are plausible AP-level misconceptions rather than obvious filler.
- [ ] Topic and skill/practice tags match the task actually performed.
- [ ] Item-specific explanations teach why the answer is correct.
- [ ] Quantitative answers were independently recomputed.
- [ ] Text/data/visual stimuli have real provenance or are clearly labeled original/synthetic.
- [ ] Visuals were inspected at application display size and agree with the question and alt text.

## 4. Generic release audit

Run:

```bash
npm run release:audit -- --subject ap-<course-id> --trials 5000 --overlap-trials 5000
```

Record the output in release evidence. The audit checks the effective browser bank and reports schema/group integrity, answer-construction bias, randomized draw success, variant exclusion, and independent-attempt overlap.

Target mean retake overlap: **≤40%** unless an unavoidable course constraint is explicitly reviewed and documented.

The generic audit does not replace exact course/CED tests.

## 5. Course-specific automated gate

- [ ] Course test file(s) exist in `tests/`.
- [ ] Exact in-scope topic inventory is asserted.
- [ ] Exact skill/practice distributions are asserted where applicable.
- [ ] Exam-part/calculator/set/multi-select behavior is asserted where applicable.
- [ ] Known quantitative calculations have regression coverage.
- [ ] Known visual/source/transcription constraints have regression coverage.
- [ ] Thousands of draws satisfy every course-specific constraint.
- [ ] `npm ci` succeeds from a clean checkout.
- [ ] `npm run check` passes.

## 6. Clean-room independent audit

A reviewer/session that did not author the content independently verifies:

- [ ] official blueprint;
- [ ] CED/topic/skill semantic alignment;
- [ ] answer correctness and ambiguity;
- [ ] distractor competitiveness;
- [ ] quantitative/factual correctness;
- [ ] visual self-consistency;
- [ ] provenance/source claims;
- [ ] duplicate/variant handling against the whole bank.

Use **audit → repair → restart from scratch**. Release target: **zero substantive findings on a fresh post-repair pass**.

## 7. Naive assessor

Use a fresh assessor who has not been briefed on the interface. Give only:

> You want to take a realistic AP `<subject>` multiple-choice practice exam. Use this site.

### Catalog and preflight

- [ ] Finds the course immediately.
- [ ] Understands which courses are available now versus outside current scope.
- [ ] Understands question count and timing.
- [ ] Understands calculator/part/select-two rules where relevant.
- [ ] Understands browser-local save/resume behavior.
- [ ] Understands this is MCQ practice, not FRQ/essay/written/oral/performance-task practice.

### Exam and completion

- [ ] First question renders clearly.
- [ ] Can answer/change answers and handle select-two if applicable.
- [ ] Can flag/review/navigate and handle timed part transitions where applicable.
- [ ] Can submit without assistance.
- [ ] Understands the result is a practice-section result, not an official AP score.
- [ ] Can review explanations and return to the catalog.

### Trust comprehension

Without coaching, the assessor should understand approximately:

> This is free, unofficial, original AP-style multiple-choice practice using current exam configurations. It is not College Board and does not currently provide FRQ/essay/written/oral/performance scoring.

If the product is materially misunderstood, fix the UX and restart with a **new** naive assessor.

## 8. Release evidence

Record at minimum:

```text
AP <Subject> release candidate

Official format:
  <count> MCQ / <minutes> min
  course/CED source: <official College Board source>
  exam-format source: <official College Board source>
  verified: <date/time and timezone>

Bank:
  <n> effective questions
  <x>/<x> in-scope topics covered
  <n> stimulus groups

Generic release audit:
  <trials>/<trials> valid draws
  retake overlap: <percent>
  uniquely longest correct: <percent>
  raw keys/selection metrics: <values>

Clean-room review:
  pass 1: <findings>
  ...
  final fresh pass: 0 substantive findings

Naive audit:
  catalog/preflight: pass
  exam navigation: pass
  completion: pass
  trust/scope comprehension: pass
```

Release-evidence files are point-in-time records. Do not silently rewrite historical measurements later to match a newer exam cycle; add new evidence for a new release instead.

## 9. Promotion and integration

Only after all course gates pass:

- [ ] Change `releaseStatus` from `"draft"` to `"released"` in a small reviewable promotion change.
- [ ] Confirm `OFFICIAL_AP_SOURCES.md` and the public official-source page remain current for the governing College Board source set.
- [ ] Create a fresh ephemeral integration/release branch from current `main`.
- [ ] Bring in only the reviewed course/core heads.
- [ ] Run `npm ci` and `npm run check` on the integrated candidate.
- [ ] Build `_site/` and verify the release manifest includes the course and excludes draft/out-of-scope banks.
- [ ] Verify `_site/official-sources.html` exists and the released course is represented there.
- [ ] Smoke-test catalog → preflight → exam start in the production artifact.
- [ ] Verify README/About/catalog scope language is still accurate.
- [ ] Validate the **exact prospective production merge tree** with the full gate.
- [ ] Merge only if the base and head remain the tested ones.
- [ ] After merge, verify the actual `main` tree matches the tested prospective tree when using exact-tree validation.

## 10. Production deployment

- [ ] GitHub Pages workflow completes from the exact `main` merge.
- [ ] Final deployment—not only build/artifact upload—is green.
- [ ] Public catalog shows the course and correct metadata.
- [ ] Public scope/out-of-scope grouping and About page are accurate.
- [ ] Public Official AP Sources page loads, includes the course, and shows the current verification snapshot.
- [ ] Public preflight shows correct format and limitations.
- [ ] A real public attempt starts and renders correctly.
- [ ] Navigation, save/resume, submit, explanations, and return-to-catalog work.

If deployment fails after merge, treat production as impaired and fix it through a focused hotfix branch.
