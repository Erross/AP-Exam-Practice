# AP Exam Practice

A free, timed, unofficial multiple-choice practice app for AP subjects. The application is static HTML, CSS, and JavaScript: no account, backend, analytics, or network requests. Continuous integration runs checks on branches and pull requests before merging to main.

## Released content

The released subjects are AP United States Government and Politics and AP Biology.

The Government bank contains 176 original questions aligned to the AP U.S. Government and Politics Course and Exam Description effective Fall 2026 (the 2027 exam cycle).

Every 55-question attempt includes:

- exact unit totals of 10 / 17 / 8 / 7 / 13, within the College Board ranges;
- five quantitative stimulus sets;
- two text-source sets, one based on a required foundational document;
- three visual-source sets;
- approximately 30 individual questions;
- single-answer multiple-choice items only.

The Biology bank contains 180 original questions covering all 60 CED topics at least twice. Every 60-question attempt:

- uses exact unit totals of 6 / 7 / 8 / 8 / 6 / 8 / 10 / 7, within the College Board ranges;
- keeps all six science-practice families within their Section I ranges;
- includes four to eight complete stimulus sets without splitting a set;
- excludes near-duplicate variants from the same attempt;
- uses single-answer multiple-choice items only.

All other catalog subjects are explicit drafts. A nonempty bank does not make a subject public. The release builder publishes only banks whose subject metadata says `releaseStatus: "released"`.

## Accuracy and provenance

The questions are original practice material, not released or secure College Board questions. Required-document excerpts use public-domain sources except for a short quoted phrase from *Letter from a Birmingham Jail*, which otherwise appears as original paraphrase for commentary and teaching.

Quantitative sources identify the publisher, dataset or report, date where applicable, and a direct source URL. Visual stimuli are original SVG illustrations shipped with the repository. Question metadata records the effective CED topic and primary multiple-choice skill category.

This project is not affiliated with, endorsed by, or reviewed by College Board. “AP” and “Advanced Placement” are College Board trademarks. Scores cover this practice MCQ section only and are not official AP scores.

## Local validation

Requires Node.js 22 or later.

```bash
npm ci
npm run check
```

The release gate audits question schema, complete topic coverage, stimulus-set sizes, source metadata, answer-key tells, exact draw composition, option shuffling, corrupt saved state, accessibility invariants, and draft-bank leakage. It then builds `_site/` and runs the production dependency audit.

## Deployment

The Pages workflow validates the repository, builds a released-only artifact, and deploys `_site/`. In repository **Settings → Pages**, select **GitHub Actions** as the source once. Subsequent pushes to `main` deploy only after the complete gate passes.

## Development and release workflow

See [DEVELOPMENT_WORKFLOW.md](DEVELOPMENT_WORKFLOW.md) for the required subject-branch → integration-branch → `main` process and its release gates.

## Adding or releasing a subject

See [CONTENT_STANDARDS.md](CONTENT_STANDARDS.md) for the full content-quality bar (CED verification, duplication avoidance, answer-construction bias checks, source accuracy, visual self-consistency, rationale quality) before starting.

1. Add original questions to `data/<subject-id>.js` with stable IDs, current CED topic metadata, skill metadata, answer rationale, and source provenance where needed.
2. Add a subject-specific blueprint when the exam requires particular stimulus types or sections.
3. Extend the audits and tests for that subject, including the duplication and Monte Carlo checks in CONTENT_STANDARDS.md.
4. Keep `releaseStatus: "draft"` until the complete gate and an independent content review both pass.
5. Merge the completed subject branch into an ephemeral integration branch.
6. Change the status to `released` only in the integration release after the combined gate passes.
7. Merge the validated integration branch to `main`; the build will then include that bank.

## License

MIT © 2026 Ewan Ross. See [LICENSE](LICENSE).
