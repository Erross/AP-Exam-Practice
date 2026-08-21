# AP Exam Practice

AP Exam Practice is a free, unofficial, browser-based site for full-length AP multiple-choice practice. It generates timed Section I attempts from original question banks while enforcing the format, weighting, skills/practices, stimulus sets, calculator rules, and exam parts configured for each released course.

**Live site:** https://erross.github.io/AP-Exam-Practice/

No account is required. The application is static HTML, CSS, and JavaScript; exam generation and in-progress session storage run locally in the browser. GitHub Actions validates the repository and publishes a released-only GitHub Pages artifact.

## Current scope

The production catalog currently has **29 released AP courses**. This completes the site's current text/image multiple-choice scope.

### Arts
- AP Art History

### English
- AP English Language and Composition
- AP English Literature and Composition

### History & Social Sciences
- AP African American Studies
- AP Comparative Government and Politics
- AP European History
- AP Human Geography
- AP Macroeconomics
- AP Microeconomics
- AP Psychology
- AP United States Government and Politics
- AP United States History
- AP World History: Modern

### Math & Computer Science
- AP Calculus AB
- AP Calculus BC
- AP Computer Science A
- AP Computer Science Principles
- AP Precalculus
- AP Statistics

### Sciences
- AP Biology
- AP Chemistry
- AP Environmental Science
- AP Physics 1: Algebra-Based
- AP Physics 2: Algebra-Based
- AP Physics C: Mechanics
- AP Physics C: Electricity and Magnetism

### World Languages & Cultures
- AP Latin

### Career Kickstart
- AP Business with Personal Finance
- AP Cybersecurity

Eight audio-dependent AP courses are **outside the current product scope** because their multiple-choice/performance workflows require listening, speaking, or aural media that the site does not currently deliver: AP Music Theory; Chinese, French, German, Italian, Japanese, and Spanish Language and Culture; and AP Spanish Literature and Culture.

The site is also intentionally **MCQ-focused**. It does not currently provide or score essays, free-response questions, document-based questions, short-answer questions, oral responses, portfolios, projects, or other performance tasks. A course card may show the official full-exam duration for context, but the timed practice covers the multiple-choice section described on the card and preflight screen.

## What a practice attempt does

A practice attempt is not a simple random sample. Depending on the course, the draw can enforce:

- exact or weighted unit/category composition;
- College Board skill, practice, or task ranges;
- required stimulus, passage, data, document, or image sets;
- atomic set selection so linked questions stay together;
- calculator/noncalculator timed parts where applicable;
- official select-two behavior where the course uses it;
- exclusion of near-duplicate variants within one attempt;
- randomized option order while preserving the semantic answer key;
- browser-local save/resume, navigation, flagging, submission, explanations, and per-unit results.

Current exam assumptions are recorded beside the effective course metadata. Some mature courses use small metadata overlays in addition to the base registry in `js/subjects.js`; the browser load order is the source of truth for the effective configuration.

## Official College Board standards used

Every released course now has a public, clickable source record in [`OFFICIAL_AP_SOURCES.md`](OFFICIAL_AP_SOURCES.md). The corresponding public site page is `official-sources.html`.

**Verification snapshot:** **August 21, 2026 at 11:15 AM CDT (UTC−05:00; 16:15 UTC)**  
**Target cycle:** **2026–27 course year / May 2027 AP exams**

For each of the 29 released courses, the source index links to:

- the official AP Central course page that hosts the current Course and Exam Description (CED) and any current clarifications/corrections; and
- the official AP Central exam page used for current question counts, timing, section structure, delivery mode, calculator rules, and related exam-format requirements.

The timestamp states exactly when the alignment claim was rechecked. If College Board changes a CED, correction, or exam format after that timestamp, the affected course must be reverified before this project should claim alignment to the revised standard. College Board remains the authority if any discrepancy exists.

## Content and quality standard

All practice questions are original project material. They are not copied released questions, secure College Board material, or predictions of future AP questions.

Released banks are developed against current College Board course/exam information and must pass the repository's release process, including:

- official-format and CED verification;
- exact topic/skill/practice coverage checks where applicable;
- answer correctness and ambiguity review;
- quantitative recomputation and source/provenance checks;
- distractor-quality and answer-length/key-position bias checks;
- stimulus and variant-group integrity;
- thousands of constrained form draws;
- retake-overlap measurement;
- clean-room independent content review;
- naive-assessor UX/scope review;
- full repository build, artifact, security, and dependency checks.

See [`CONTENT_STANDARDS.md`](CONTENT_STANDARDS.md) and [`SUBJECT_RELEASE_CHECKLIST.md`](SUBJECT_RELEASE_CHECKLIST.md).

## Human-readable math and science notation

Bank source strings remain simple and editable. The browser presentation layer converts supported plain-text math/science notation into familiar typography using safe DOM nodes rather than `innerHTML`.

Examples include `3.0×10^-4` → 3.0×10⁻⁴, `x^2` → x², `H2O` → H₂O, `Ca2+` → Ca²⁺, and common subscripts, Greek symbols, arrows, plus/minus, and infinity notation. A repository-wide diagnostic checks the effective browser banks for raw notation that should have been normalized.

## Source material

Where a question uses an external text, image, or dataset, the bank records provenance or clearly labels the material as original/synthetic. Public-domain English passages and other source-dependent content are regression-tested where exact transcription matters. Original simulated datasets are never presented as real published data.

## Repository structure

```text
.
├── data/                       Question banks and course-specific content layers
├── js/                         Registry, draw engine, session, rendering, catalog UI
├── tests/                      Content, draw, UI, notation, build, and security tests
├── tools/                      Audit, effective-metadata, build, and release helpers
├── assets/                     Original/static visual stimuli
├── release-evidence/           Point-in-time evidence from completed course releases
├── OFFICIAL_AP_SOURCES.md      Current authoritative College Board source index
├── CONTENT_STANDARDS.md        Content-authoring and verification rules
├── SUBJECT_RELEASE_CHECKLIST.md Required release evidence and gates
├── DEVELOPMENT_WORKFLOW.md     Branch, integration, exact-tree, and deployment flow
└── PLAN.md                     Current product status and roadmap
```

The production build creates `_site/` and includes only released course data layers. Draft/out-of-scope banks are excluded from the published artifact.

## Local validation

Requires **Node.js 22 or later**.

```bash
npm ci
npm run check
```

`npm run check` runs the repository/content checks, Node test suite, production build, released-artifact verification, and dependency audit.

For a new or materially revised course, also run the reusable release audit:

```bash
npm run release:audit -- --subject ap-<course-id> --trials 5000 --overlap-trials 5000
```

Course-specific tests and independent review remain required; a generic audit cannot verify semantic CED alignment by itself.

## Development and deployment

`main` is production. Normal work uses a focused subject/core/docs branch, then a fresh ephemeral integration/release branch based on current `main`. The exact prospective production tree is validated before merge; after merge, the actual `main` tree is checked against the tested candidate when applicable.

GitHub Pages deploys the released-only `_site/` artifact from successful `main` workflow runs. See [`DEVELOPMENT_WORKFLOW.md`](DEVELOPMENT_WORKFLOW.md) for the full procedure.

## Documentation map

- [`OFFICIAL_AP_SOURCES.md`](OFFICIAL_AP_SOURCES.md) — authoritative College Board course/CED and exam-format links for every released course, with the verification timestamp.
- [`PLAN.md`](PLAN.md) — current product status, scope, and roadmap.
- [`CONTENT_STANDARDS.md`](CONTENT_STANDARDS.md) — authoring and content-quality rules.
- [`SUBJECT_RELEASE_CHECKLIST.md`](SUBJECT_RELEASE_CHECKLIST.md) — required course release gates and evidence.
- [`DEVELOPMENT_WORKFLOW.md`](DEVELOPMENT_WORKFLOW.md) — branch, integration, CI, merge, and Pages procedure.
- [`ENGLISH_STATIC_FEATURES.md`](ENGLISH_STATIC_FEATURES.md) — proposal only for possible future English FRQ/self-review features; not current functionality.
- [`release-evidence/`](release-evidence/) — historical release snapshots; use current effective metadata for present-day product state.

## Accuracy, trademarks, and affiliation

This project is an independent educational practice resource and is not affiliated with, endorsed by, sponsored by, or reviewed by College Board.

“AP” and “Advanced Placement” are trademarks of College Board. Results shown by this application apply only to the generated practice section and are not official AP scores or College Board score predictions.

## License

MIT © 2026 Ewan Ross. See [`LICENSE`](LICENSE).
