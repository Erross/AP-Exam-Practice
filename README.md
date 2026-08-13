# AP Exam Practice

A free, unofficial AP multiple-choice practice site built as a static web application. It generates exam-style practice attempts from original question banks while enforcing subject-specific College Board format, weighting, skill, stimulus, and section constraints.

**Live site:** https://erross.github.io/AP-Exam-Practice/

The project is deliberately lightweight: static HTML, CSS, and JavaScript with no account system, backend, analytics service, or application database. Exam generation and saved-session behavior run in the browser. GitHub Actions validates content and builds the released-only GitHub Pages artifact.

## Released courses

The current production catalog contains nine released AP courses:

| Course | Bank size | Practice section | Highlights |
| --- | ---: | --- | --- |
| **AP United States Government and Politics** | 176 questions | 55-question MCQ attempts | Unit-weighted draws; quantitative, foundational-document, text, and visual stimulus sets; all 60 CED topics covered. |
| **AP Biology** | 180 questions | 60-question MCQ attempts | All 60 CED topics represented at least twice; science-practice constraints; graph/data-rich stimulus sets; variant exclusion. |
| **AP English Language and Composition** | 115 questions | 45-question MCQ attempts | Five-set structure with 24 Reading and 21 Writing questions; Reading passages use sourced public-domain nonfiction; Writing sets use original student-draft material. |
| **AP English Literature and Composition** | 142 questions | 55-question MCQ attempts | Five-set prose/poetry/drama structure; authentic public-domain literary texts; skill and genre weighting constraints. |
| **AP Chemistry** | 182 questions | Full Section I-style MCQ draws | All 91 CED topics covered; unit/practice constraints; quantitative, experimental, model, and stimulus-based questions. |
| **AP Calculus AB** | 120 questions | 42-question Section I attempts | Separate timed Part A/Part B behavior; calculator-homogeneous parts; graphical, numerical, analytical, and verbal representations. |
| **AP Statistics** | 140 questions | 42-question Section I attempts | May 2027 five-unit redesign; exact revised topic/skill coverage; required probability and regression sets; calculator permitted; 33.6% measured retake overlap at release. |
| **AP Physics 2** | 140 questions | 42-question Section I attempts | Units 9–15; current MCQ science-practice weighting; seven shared data/stimulus sets; quantitative and claim/evidence reasoning. |

Other AP subjects may appear in the repository registry as **draft metadata**. A draft is never published merely because a data file exists: production output includes only subjects whose registry metadata explicitly sets `releaseStatus: "released"`.

## What an exam attempt does

The app does more than randomly sample questions. Each released subject can declare constraints that mirror its current AP Section I structure, including:

- exact or weighted unit/category composition;
- College Board skill or science-practice ranges;
- required numbers and types of stimulus sets;
- whole-set selection so linked questions are never split incorrectly;
- calculator and noncalculator exam parts where applicable;
- stable question and stimulus IDs;
- exclusion of near-duplicate variants within the same attempt;
- randomized answer order while preserving the semantic key;
- browser-side session persistence and restoration;
- review/flagging and question navigation.

The shared draw engine lives in `js/draw.js`; subject-specific exam metadata and blueprints live in `js/subjects.js`.

## Content design and quality standards

Questions are original practice material. They are **not** copied released questions, secure College Board content, or claimed predictions of future AP exams.

Course banks are developed against the current College Board Course and Exam Description and live assessment information. Subject tests verify the assumptions that can be encoded mechanically, such as topic coverage, section composition, unit weights, skill distributions, calculator sections, and stimulus counts.

The repository also contains quality gates intended to catch common synthetic-question problems:

- exactly one correct answer per item;
- answer shuffling must preserve the correct semantic choice;
- minimum rationale quality/length requirements where applicable;
- answer-position balance;
- correct-answer versus distractor length-bias checks;
- detection of conspicuous absolute-language distractors;
- tests for known item-level regressions;
- Monte Carlo draw tests for blueprint compliance;
- independent-attempt overlap checks to limit excessive retake repetition;
- source/provenance validation for stimulus material;
- checks that shared stimuli stay intact and internally consistent.

In August 2026, all nine released courses were run through repeated clean-room audit/fix cycles: audit from scratch, repair substantive findings, restart the audit, and repeat until a fresh post-repair pass was clean. Those passes hardened exact CED skill/task alignment, distractor quality, quantitative correctness, duplicate/variant handling, browser/test bank parity, and retake behavior across English Language, English Literature, U.S. Government, Calculus AB, Biology, Chemistry, Physics 2, and Statistics.

See [`CONTENT_STANDARDS.md`](CONTENT_STANDARDS.md) for the full authoring and release standard.

## Human-readable math and science notation

Question-bank source strings remain simple and editable, but the browser presentation layer converts common plain-text notation into familiar mathematical/scientific typography using safe DOM nodes rather than `innerHTML`.

Examples include:

- `3.0×10^-4` → 3.0×10⁻⁴
- `x^2` → x²
- `H2O` → H₂O
- `Ca2+` → Ca²⁺
- `sqrt(K)` → √(K)
- `x_i`, `q_p`, `ΔH_vap` → semantic subscripts
- `sigma bond` / `pi-bonding` → σ bond / π-bonding
- mathematical arrows, plus/minus, and infinity symbols where appropriate.

The renderer intentionally avoids blanket substitutions that could corrupt future AP Computer Science code or identifiers. A repository-wide notation regression test loads the effective banks and fails if supported raw math/science notation would still display poorly.

## English source material

The released English Reading/Literature material uses real public-domain sources where a source passage is appropriate.

AP English Language Reading selections include nonfiction by authors such as Mary Wollstonecraft, Frederick Douglass, Henry David Thoreau, W. E. B. Du Bois, and Jane Addams. Its Writing questions intentionally use original student-draft passages because revision/editing tasks require that form of stimulus.

AP English Literature includes public-domain prose, drama, and poetry by writers including Charlotte Perkins Gilman, Kate Chopin, Ambrose Bierce, Saki, Edgar Allan Poe, Oscar Wilde, Susan Glaspell, Henrik Ibsen, Emily Dickinson, William Blake, Thomas Hardy, Paul Laurence Dunbar, and Christina Rossetti.

Source records are stored with the relevant stimuli and are regression-tested where exact transcription matters.

## Repository structure

```text
.
├── data/                   Question banks and subject content layers
├── js/
│   ├── app.js              Main browser application behavior
│   ├── draw.js             Constrained exam/question selection
│   ├── notation.js         Safe math/science presentation normalization
│   ├── session.js          Saved-session reconstruction
│   └── subjects.js         Subject registry and exam blueprints
├── tests/                  Subject, draw, quality, notation, and security tests
├── tools/                  Audit/build/release helpers
├── assets/                 Original visual stimuli and static assets
├── CONTENT_STANDARDS.md    Content-quality and verification requirements
├── DEVELOPMENT_WORKFLOW.md Required branch/integration/release workflow
└── ENGLISH_STATIC_FEATURES.md
```

The production build creates `_site/` and deliberately includes only released subject banks plus the correction/curation/quality layers referenced for those released subjects; draft-subject data is excluded.

## Local development and validation

Requires **Node.js 22 or later**.

```bash
npm ci
npm run check
```

`npm run check` runs the complete release gate: repository/content audits, the Node test suite, production build, released-artifact validation, and the production dependency audit.

Individual test files can also be run with Node's built-in test runner while developing a subject:

```bash
node --test tests/ap-physics-2.test.js
node --test tests/notation.test.js
```

The full gate should still be run before integration because draw-engine or shared-rendering changes can affect multiple courses.

## Development and release workflow

Course development does **not** go directly from a subject branch to `main`.

The required flow is:

```text
subject/fix branch
      ↓
ephemeral integration branch
      ↓
combined validation / release gate
      ↓
main
      ↓
GitHub Pages
```

This matters because individual subjects share the draw engine, registry, rendering code, tests, and build pipeline. A branch that is green in isolation can still conflict with another completed course.

See [`DEVELOPMENT_WORKFLOW.md`](DEVELOPMENT_WORKFLOW.md) for the complete procedure.

## Adding a course

At a high level:

1. Verify the current College Board exam format and Course and Exam Description independently.
2. Add the subject metadata and draft exam blueprint to `js/subjects.js`.
3. Build an original question bank in `data/<subject-id>.js` with stable IDs, CED topic/skill metadata, rationales, and provenance where required.
4. Add subject-specific regression tests and constrained-draw tests.
5. Audit answer correctness, distractor plausibility, AP-level difficulty, answer-length/key-position tells, and retake overlap.
6. Keep the subject `releaseStatus: "draft"` until the subject branch and integration branch both pass the complete gate.
7. Promote through the documented integration workflow and only then merge to `main`.

## Deployment

GitHub Pages deployment is automated. In repository **Settings → Pages**, the source should be **GitHub Actions**. Pushes to `main` are validated and the released-only `_site/` artifact is deployed after the required build workflow succeeds.

## Accuracy, trademarks, and affiliation

This project is an independent educational practice resource and is not affiliated with, endorsed by, sponsored by, or reviewed by College Board.

“AP” and “Advanced Placement” are trademarks of College Board. Practice results shown by this application apply only to the generated practice section and are not official AP scores or College Board score predictions.

## License

MIT © 2026 Ewan Ross. See [`LICENSE`](LICENSE).


### AP Precalculus
Released for the May 2027 format after clean-room CED, content, draw, overlap, and naive-interface audits.
