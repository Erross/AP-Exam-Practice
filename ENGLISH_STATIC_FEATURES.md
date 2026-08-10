# AP English: Static-Site Expansion Plan

The multiple-choice banks can reproduce the real passage-set composition without
a backend. Free response cannot be scored objectively by this app without either
human review or a hosted scoring service, but it can still be practiced honestly
and usefully. The guiding rule is simple: support writing and self-review without
presenting a machine-generated number as an AP score.

## Best next implementation: a self-scored FRQ workspace

Add a second action to each released English subject card: **Practice free
response**. The workspace can remain entirely client-side and contain:

- original prompt pools for all six essay types (Language: synthesis, rhetorical
  analysis, argument; Literature: poetry analysis, prose-fiction analysis,
  literary argument);
- official section timing, including Language's 15-minute reading period and
  recommended 40 minutes per essay;
- a distraction-free textarea with word count, locally persisted draft, and a
  visible prompt/source pane;
- a post-writing self-assessment based on the public 6-point rubric dimensions:
  thesis, evidence/commentary, and sophistication;
- row-by-row evidence prompts that require the student to paste a sentence from
  the draft before claiming a rubric point;
- a clearly labeled **self-assigned practice score**, never an official or
  automated AP score;
- print and plain-text export so a teacher, tutor, or classmate can review the
  response outside the site.

Language synthesis packs should contain six original, public-domain, or openly
licensed sources, including two visual sources and at least one quantitative
source. Source provenance should be audited exactly as MCQ stimulus provenance
is audited now.

## High-value tools that need no scoring model

### Passage annotation

Allow highlights in several user-selected categories (claim, evidence,
rhetorical choice, shift, imagery, comparison) and attach short notes. Store the
annotations in `localStorage`, keyed to the stable prompt or passage ID. A clean
copy should remain one click away so highlighting does not become a substitute
for reading.

### Evidence and line-of-reasoning planner

Before drafting, students can enter a defensible thesis, two or three claims,
supporting evidence, and an explanation of how each item advances the thesis.
The app can check completion and logical links as a checklist; it should not
claim that the argument is correct.

### Revision comparison

After submission, preserve the first draft locally and let the student revise in
a second pane. A word-level diff can reveal deleted summary, added commentary,
and changed claims. This is deterministic client-side functionality and is more
educationally defensible than opaque automated scoring.

### Original scored exemplars

For each original prompt, ship several original responses written specifically
for this project. Reveal them only after the student's draft is locked. Annotate
where each response earns or misses a rubric row, then let the student compare
that reasoning with the self-assessment. These examples need independent review
before release just as question banks do.

### Local practice history

Store attempt date, prompt type, time used, completion status, self-assigned
rubric rows, and optional reflection in the browser. Show trends by rubric
dimension without accounts or analytics. Provide JSON export/import and a
single **erase my local history** control.

## Useful smaller additions

- untimed skill drills using shorter passages and one paragraph response;
- a thesis gallery in which students choose the most defensible thesis and see
  an explanation (ordinary answerable MCQ, not essay scoring);
- evidence-versus-commentary classification drills;
- sentence-combining and transition drills for Language;
- poetry paraphrase and structural-shift markers for Literature;
- a literary-work notebook stored locally for preparing the Literature argument
  essay, with fields for conflict, pivotal scenes, techniques, and thematic
  interpretations;
- accessible print layouts for passages, source packs, prompts, and rubrics.

## What should remain out of scope for the static app

- automatic holistic essay scores or predicted AP 1–5 scores;
- claims that keyword counts can evaluate sophistication or commentary;
- uploading student writing to third parties;
- accounts, leaderboards, or cross-device history;
- released or secure College Board questions, scoring samples, or AP Classroom
  material.

## Suggested delivery order

1. Timed FRQ workspace, local draft persistence, export, and self-assessment.
2. One independently reviewed original prompt per essay type.
3. Passage annotation and evidence/line-of-reasoning planner.
4. Original annotated exemplars and revision comparison.
5. Local practice history and focused skill drills.

This sequence adds meaningful exam practice while preserving the project's
privacy, zero-cost hosting, and honest scoring boundaries.
