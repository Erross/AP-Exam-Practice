# AP English Static-Site Expansion Proposal

> **Status: proposal only — not implemented.** Current production remains focused on timed Section I multiple-choice practice. Nothing in this document should be read as a description or promise of current site functionality.

If the project later expands beyond MCQ practice, AP English Language and AP English Literature are good candidates for a static, self-review-oriented FRQ workspace. The key constraint should remain: help students practice writing without presenting an automated number as an official or predicted AP score.

## Proposed first feature: self-reviewed FRQ workspace

A client-side workspace could provide:

- original prompt pools for Language synthesis, rhetorical analysis, and argument;
- original prompt pools for Literature poetry analysis, prose-fiction analysis, and literary argument;
- official section timing and recommended pacing;
- a distraction-free writing area with local draft persistence and word count;
- prompt/source panes and print/plain-text export;
- post-writing self-assessment based on the public rubric dimensions;
- clearly labeled **self-assigned practice results**, never official or automated AP scores.

Language synthesis packs should use original, public-domain, or appropriately licensed sources with clear provenance and independent review.

## Other static features worth considering

### Passage annotation

Client-side highlighting and notes, stored locally by stable prompt/passage ID. A clean-copy view should remain available so annotation does not replace close reading.

### Evidence and line-of-reasoning planner

A structured thesis/claims/evidence/commentary planner can check completion and linkage without claiming the argument is substantively correct.

### Revision comparison

Preserve a first draft locally and compare it with a revision. A deterministic word-level diff could make added commentary, removed summary, and changed claims visible.

### Original scored exemplars

For original project prompts, independently reviewed original responses could demonstrate why particular rubric rows are earned or missed. Exemplars should appear only after the student's own draft is completed or intentionally revealed.

### Local practice history

Optional browser-local history could track prompt type, date, time used, completion, self-assessment, and reflection, with export/import and a clear erase control.

## Boundaries that should remain explicit

Even if this proposal is implemented, the static site should avoid:

- automatic holistic essay scores or predicted AP 1–5 scores;
- claims that keyword counts measure sophistication or commentary;
- uploading student writing to third parties without an explicit new product/privacy decision;
- secure, released, or AP Classroom College Board material;
- hidden analytics or an account requirement introduced merely to support writing practice.

## Suggested delivery order if scope changes

1. Timed FRQ workspace, local persistence, export, and self-assessment.
2. One independently reviewed original prompt per essay type.
3. Annotation and evidence/line-of-reasoning planner.
4. Original annotated exemplars and revision comparison.
5. Optional browser-local practice history and focused drills.

Until such a feature is deliberately built, tested, reviewed, and released, the authoritative product scope remains the MCQ-only description in [`README.md`](README.md), the public About page, and [`PLAN.md`](PLAN.md).
