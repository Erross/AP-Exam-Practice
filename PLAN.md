# AP Exam Practice — Current Status and Roadmap

**Last reviewed:** August 21, 2026

This file describes the project as it exists now. Historical framework/bootstrap plans have been retired from this document so that it can serve as a reliable orientation for future work.

## Current product state

AP Exam Practice is a static, browser-only AP multiple-choice practice site. Production currently contains **29 released courses**, covering every AP course in the project's present text/image MCQ scope.

The application provides:

- full-length timed Section I multiple-choice practice;
- course-specific question counts, timing, weighting, skills/practices, and stimulus requirements;
- calculator/noncalculator timed parts where applicable;
- select-two support where required by the official course format;
- same-tab/session persistence across refreshes, navigation, flagging, submission, explanations, and per-unit results;
- a released-only GitHub Pages build with no accounts, backend, analytics service, or application database.

## Current scope boundary

### Supported now

The 29 released courses are listed in [`README.md`](README.md). They comprise the project's supported non-audio/text-image multiple-choice catalog.

### Outside current scope

Eight courses require audio workflows the current runtime does not provide:

- AP Music Theory;
- AP Chinese Language and Culture;
- AP French Language and Culture;
- AP German Language and Culture;
- AP Italian Language and Culture;
- AP Japanese Language and Culture;
- AP Spanish Language and Culture;
- AP Spanish Literature and Culture.

These should be described as **outside current scope**, not as implicitly promised “coming soon” content, unless the project explicitly adopts audio delivery as a future goal.

The site also does not currently deliver or score FRQs, essays, DBQs, SAQs, spoken responses, portfolios, projects, or other performance tasks. Course cards may show full official exam duration for context, but the practice product is focused on the multiple-choice section.

## Architecture

```text
index.html / about.html      User-facing shell and documentation
style.css / course CSS       Presentation and responsive layout
js/subjects.js               Base AP course registry
js/*-metadata.js             Course-specific effective metadata overlays where used
js/draw.js                   Shared constrained drawing/shuffling logic
js/set-blueprint-draw.js     Shared set-blueprint support
js/session.js                Browser-local session reconstruction
js/notation.js               Safe math/science presentation normalization
js/app.js                    Generic exam UI/runtime
js/catalog.js                Landing-page composition and preflight UX
data/*.js                    Question banks and correction/quality/source layers
assets/                      Static visual stimuli
tests/                       Content, draw, UI, build, security, and regression tests
tools/                       Effective metadata, audit, build, and release helpers
```

The effective browser configuration is determined by `index.html` load order. Production building then removes draft data layers and publishes only released course content.

## Ongoing maintenance priorities

The current roadmap is maintenance-first rather than “build the remaining Tier 1 courses,” because that work is complete.

1. **Keep official specifications current.** Re-verify course/exam formats and governing CEDs when College Board publishes a redesign or new exam-cycle information.
2. **Protect released-bank quality.** Treat content corrections, source updates, and shared-engine changes as release-quality changes with regression coverage.
3. **Keep user-facing scope accurate.** README, About, landing-page copy, course metadata, and any limitations language should change with the product rather than lag behind it.
4. **Preserve repeat-practice quality.** Maintain blueprint compliance, variant exclusion, and measured retake overlap as banks evolve.
5. **Preserve exact-tree release discipline.** Validate the exact prospective production tree, then verify the merged `main` tree and Pages deployment.
6. **Keep the static/privacy model simple.** Avoid introducing accounts, tracking, or network dependencies unless there is a clear product requirement.

## Optional future expansion

These are possibilities, not committed functionality:

- audio playback and interaction support for the eight currently out-of-scope courses;
- self-scored or teacher-reviewed FRQ workspaces that do not claim automated AP scoring;
- additional browser-local study history or export tools;
- focused skill-drill modes built from independently reviewed original content.

[`ENGLISH_STATIC_FEATURES.md`](ENGLISH_STATIC_FEATURES.md) contains one proposal for a future static FRQ/self-review workspace. It is explicitly not part of the current production feature set.

## Release model

Course/content work follows:

```text
focused branch
      ↓
clean-room + automated release gates
      ↓
fresh ephemeral integration/release branch from current main
      ↓
exact prospective-tree CI
      ↓
main
      ↓
GitHub Pages deployment + public smoke test
```

See [`CONTENT_STANDARDS.md`](CONTENT_STANDARDS.md), [`SUBJECT_RELEASE_CHECKLIST.md`](SUBJECT_RELEASE_CHECKLIST.md), and [`DEVELOPMENT_WORKFLOW.md`](DEVELOPMENT_WORKFLOW.md) for the authoritative requirements.
