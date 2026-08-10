# AP Exam Practice

A free, timed, unofficial multiple-choice practice app for AP subjects. The application is static HTML, CSS, and JavaScript: no account, backend, analytics, or network requests.

## Released content

AP United States Government and Politics is the first released subject. Its 126-question bank is aligned to the AP U.S. Government and Politics Course and Exam Description effective Fall 2026 (the 2027 exam cycle).

Every 55-question attempt includes:

- exact unit totals of 10 / 17 / 8 / 7 / 13, within the College Board ranges;
- five quantitative stimulus sets;
- two text-source sets, one based on a required foundational document;
- three visual-source sets;
- approximately 30 individual questions;
- single-answer multiple-choice items only.

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

## Adding or releasing a subject

1. Add original questions to `data/<subject-id>.js` with stable IDs, current CED topic metadata, skill metadata, answer rationale, and source provenance where needed.
2. Add a subject-specific blueprint when the exam requires particular stimulus types or sections.
3. Extend the audits and tests for that subject.
4. Keep `releaseStatus: "draft"` until the complete gate passes.
5. Change the status to `released`; the build will then include that bank.

## License

MIT © 2026 Ewan Ross. See [LICENSE](LICENSE).
