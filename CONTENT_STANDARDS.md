# Content Authoring Standards

This is the checklist a subject's question bank must pass before it can be
considered review-ready (and before `releaseStatus` moves from `"draft"` to
`"released"`). It exists because both subjects built so far — AP U.S.
Government and Politics and AP Biology — shipped real defects on the first
pass that only surfaced under independent review: fabricated trend claims,
self-contradicting distractors, a topicCode mismatch, SVG diagrams that
contradicted their own question, and near-duplicate questions the drawer
could serve in the same exam or on a retake. Every rule below traces back to
one of those defects. Follow it up front instead of relearning it by review.

This file is the source of truth. A skill may point here, but the standard
itself lives in this repo, versioned with the code it governs.

## 1. CED alignment — verify, don't recall

- Unit weights, topic codes/titles, and skill-category codes must be checked
  against the **current** College Board Course and Exam Description or
  Course-at-a-Glance for that subject, not reconstructed from training
  knowledge or a prior AP cycle. CEDs get revised (AP Biology's was
  restructured effective Fall 2025); confirm you have the version that
  governs the exam cycle you're targeting.
- Record the source and date in a code comment next to `mcqCount` /
  `mcqTimeMinutes` / `units` in `js/subjects.js`, e.g.
  `// VERIFIED 2026-08-10: <URL>`. Reviewers should be able to re-check the
  same document.
- `examWeightRange` per unit should be the College Board's published range,
  not a rounded guess. If you compute a single `examWeight` point value from
  the range (e.g. a midpoint), say so in a comment and show the arithmetic —
  reviewers need to be able to recompute it.
- Every topic code your bank uses must correspond to a real CED topic; every
  CED topic in scope should have at least one question, and ideally two or
  more so a topic isn't representable by a single memorized item.
- Skill/practice codes (e.g. AP Biology's `1.A`–`6.E`) must be the CED's
  actual taxonomy, and each question's code should genuinely match what the
  question asks the student to do (a data-interpretation question tagged as
  "concept explanation" is a real defect, not a formality).

## 2. Duplication avoidance

Two different duplication problems, two different mechanisms:

**Within one exam** — stimulus sets (`stimulusGroupId`) already prevent a
shared data table/diagram from being split across a draw; the drawer treats
them as one atomic block. No extra work needed here beyond building sets
correctly (see §5).

**Across attempts** — a small bank drawn repeatedly will otherwise show the
same or near-duplicate questions on retakes. Two things address this:

- **Bank size relative to draw size.** A bank that's only 2x the draw count
  will have high overlap between any two attempts almost by construction. Aim
  for a bank meaningfully larger than the draw, spread so most units have
  more items available than the draw ever needs.
- **`variantGroupId`** — tag near-duplicate standalone questions (same
  narrow CED sub-point, different wording or scenario) with a shared
  `variantGroupId` so `drawBlocks()` in `js/draw.js` won't place two members
  of the same group in one exam. Requirements enforced by both existing
  audits and required of any new one:
  - a group has 2+ members;
  - all members share one `unit` and one `topicCode`;
  - member `q` text is textually distinct (not just reworded);
  - `variantGroupId` is for standalone questions only — never combine it
    with `stimulusGroupId` on the same item.
  - **Tag against the whole existing bank, not just questions added in the
    same pass.** The single biggest defect found in this project's history
    was variant-tagging new questions against each other while missing
    near-duplicates already sitting in the pre-existing bank. Explicitly
    diff new content against everything already shipped for that subject.
- **Verify the result, don't assume it.** Run a Monte Carlo simulation: draw
  two (or more) independent exams from the bank via `drawExam()`, thousands
  of trials, and measure the average fraction of questions shared between
  draws. Target **≤40%** average overlap between two independent attempts.
  (AP Government went from 64.6% → 38.4% after its variant pass; AP Biology
  went from 51.9% → 35.9%.) Report this number when a subject is proposed as
  review-ready — it's cheap to compute and it's the single most direct
  measurement of whether the repeat problem is actually solved.

## 3. Answer construction — no statistical tells

A test-taker (or a subsequent audit) should not be able to guess the correct
answer's position from patterns in how options are written. Enforce all of
the following as automated checks (see `tools/audit.js` for the reference
implementation):

- **Length bias:** the correct answer is the uniquely-longest option in no
  more than ~25% of questions, and among-the-longest in no more than ~58%.
  Average word count of correct answers vs. the average across all
  distractors should be within ~12% of each other.
- **Absolute-language distractors:** avoid loading multiple distractors in
  the same question with "always / never / every / only / entirely /
  unlimited"-type absolute language — it's a legibility tell even when each
  individual distractor is otherwise fine. One is usually acceptable; two or
  more in the same question is a defect.
- **Raw answer-key position balance:** before runtime shuffling, each of the
  4 option slots should hold the correct answer roughly 15–35% of the time
  across the bank (ideally close to even, e.g. exactly 25% each if the bank
  size divides evenly by 4). Runtime shuffling (`shuffleQuestionOptions`)
  re-randomizes per attempt regardless, but the raw data shouldn't have a
  baked-in skew that a static export or dev tool could expose.

## 4. Quantitative and source accuracy

- Every number a question asks the student to compute or read must be
  independently re-derivable. Before shipping, actually do the arithmetic
  (by hand or with a short script) for every calculation-based item — chi-
  square values, recombination/allele frequencies, percentages, ratios,
  confidence-interval comparisons, whatever the subject requires. This
  project has caught real arithmetic/logic errors this way; the "the numbers
  look plausible" bar is not sufficient.
- Quantitative and text stimuli need real citations (publisher, dataset/
  report name, date, direct URL) **or** must be clearly and consistently
  labeled as original/synthetic data (e.g. `"Original simulated experiment
  created for AP Exam Practice."`). Never present invented data as if it
  were a real published source.
- Watch for invalid inferential leaps in a question's framing — e.g. using a
  *national* poll to support a claim about one *state's* referendum
  (ecological inference fallacy). If a stimulus is national/aggregate, keep
  the question's conclusion at that same level.
- Don't assert a trend the data doesn't actually show. If a table's values
  go up, down, up, down, the stem cannot say a quantity "increasingly" did
  something — describe what's actually there (a persistent pattern despite
  fluctuation, a net change over the full range, etc).
- Every distractor must be actually, verifiably false given the stimulus —
  not just "look wrong." A distractor that happens to be a true statement
  the student is asked to reject is a real defect, not a subtle trap.

## 5. Visual stimuli

- Alt text and title/desc fields must not leak the term or doctrine the
  paired questions ask the student to identify (check against a per-image
  forbidden-term list, the way `tools/audit.js`'s `visualLeakageTerms` does
  for AP Government).
- Alt text must be meaningful on its own (≥60 characters is the current
  floor) and must not pre-interpret the visual with a conclusion ("...which
  proves that...", "...therefore...") — describe what's shown, not the
  answer.
- **The rendered image must actually, self-consistently depict what the
  alt text and questions claim.** This project shipped two real bugs of
  exactly this kind: an arrow drawn in the wrong direction relative to the
  concentration gradient it was supposed to represent, and a cladogram
  missing a branch line to one of its five labeled tips. Check this by
  reading the raw SVG path/coordinate data yourself and tracing it against
  the described scenario — don't just confirm the file exists and the alt
  text reads correctly.
- Every stimulus group's image path must resolve (`fs.existsSync`) and
  every stimulus object must be shared by reference across all questions in
  its group, not duplicated.

## 6. Rationale quality

- Every question's `e` field must be a genuine, per-question explanation —
  what makes the correct answer right, and ideally why the main distractors
  are wrong. A generic template (`"${answer}. This item applies CED Topic
  ${code}."`) is not acceptable; it doesn't teach anything beyond restating
  the key.
- Enforce a minimum meaningful length (this project uses ≥90 characters) and
  explicitly reject known-boilerplate patterns in an automated check, the
  way AP Biology's test suite does with
  `assert.doesNotMatch(question.e, /This item applies CED Topic/i)`.

## 7. Required verification workflow

Before calling a subject review-ready, run and report on all of:

1. **Schema/metadata audit** — id format, unit/topicCode validity, one
   correct answer, non-empty rationale, full CED topic coverage, stimulus
   group integrity, variant group integrity. Follow the pattern in
   `tools/audit.js` (currently Government-specific — write an equivalent
   check, or generalize `audit.js` to accept a subject id, for any new
   subject rather than skipping this step).
2. **Bias checks** — §3 above, as automated assertions, not eyeballing.
3. **Draw simulation** — thousands of trials of `drawExam()` confirming the
   delivered draw always matches the declared unit/blueprint/stimulus-set
   targets. See `tests/draw.test.js` and `tests/ap-biology.test.js`.
4. **Monte Carlo retake-overlap simulation** — §2 above; report the actual
   percentage, not just "we added variant groups."
5. **Independent content review** — a second pass (ideally by a different
   reviewer/session than the one that drafted the content) fact-checking
   CED alignment, quantitative correctness, and visual self-consistency
   from scratch, not re-reading the author's own claims. Both subjects in
   this repo needed this step to catch defects the original draft missed.
6. Only after all of the above pass does `releaseStatus` move from
   `"draft"` to `"released"` in `js/subjects.js`.

`npm run check` currently runs the schema/bias/build/security checks that
exist as of this writing; it does not yet run a subject-agnostic content
audit or the Monte Carlo step automatically. Until that's automated, run
those two manually and report the numbers when proposing a subject for
release.
