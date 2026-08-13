# Development and Release Workflow

`main` is the production branch. Every commit on `main` must be deployable, and GitHub Pages deploys only from `main` after the complete validation workflow succeeds.

## Branch flow

```text
subject or improvement branch
            ↓
ephemeral integration branch
            ↓
           main
```

### 1. Development branches

Create each new subject from the current `main` branch:

- `subject/ap-biology`
- `subject/ap-psychology`

Use a focused branch for later improvements:

- `content/ap-us-government-expand`
- `fix/ap-biology-topic-7-4`

Use a separate `core/...` branch for shared engine, build, audit, schema, session, accessibility, or styling changes. A subject branch should not invent its own incompatible version of shared infrastructure.

Keep unfinished subjects at `releaseStatus: "draft"`. Draft banks may be merged into an integration branch for testing, but the production builder must not publish them.

### 2. Integration branches

Create a short-lived integration branch from the latest `main` for each intended release, for example:

- `integration/2026-08-government-biology`
- `integration/2026-09-content-release`

Merge every subject, improvement, and required core branch for that release into the integration branch. Resolve conflicts there, never directly on `main`. Shared-file resolutions must preserve every subject's constraints; passing one subject's tests is not sufficient.

An integration branch is a release candidate, not a permanent `develop` branch. Delete it after the release is merged or abandoned so it cannot drift from production.

### 3. Main and deployment

Open one pull request from the integration branch to `main`. Merge only after all release gates below pass on the exact integration head. The Pages workflow then rebuilds and deploys the released-only `_site/` artifact from `main`.

Do not merge a subject branch directly to `main`. Emergency production fixes may use a focused hotfix branch, but they must still pass the complete automated gate and receive a production artifact check.

## Subject quality gate

Every new or materially revised subject must have:

- current official exam format, unit weights, topic codes, topic names, and skill definitions;
- original questions with stable IDs, one unambiguous key, plausible distractors, and item-specific explanations;
- complete topic coverage with meaningful depth rather than token tagging;
- source provenance for quantitative, textual, and visual stimuli;
- whole stimulus groups that are never split during a draw;
- `variantGroupId` families for genuinely near-duplicate standalone questions;
- randomized-draw tests for unit, practice, stimulus, and variant constraints;
- measured cross-attempt overlap appropriate to the bank size;
- answer-position and answer-length checks that detect systematic clues;
- rendered visual inspection at the application's actual display width;
- independent content review before release.

Use [`SUBJECT_RELEASE_CHECKLIST.md`](SUBJECT_RELEASE_CHECKLIST.md) as the required evidence checklist. In addition to subject-specific tests, run the generic release audit while the course is still a release candidate:

```bash
npm run release:audit -- --subject ap-<course-id> --trials 5000 --overlap-trials 5000
```

The generic audit loads the effective browser bank in `index.html` order, checks shared schema/bias/group rules, exercises randomized draws, and measures independent-attempt overlap. It does **not** replace exact CED tests, clean-room content review, rendered visual review, or the naive-assessor UX gate in the checklist.

After any substantive repair from independent review, restart the clean-room audit from scratch. After a UX repair from naive assessment, use a fresh naive assessor who has not learned the interface from the previous round.

## Integration release gate

The integration pull request may merge to `main` only when:

1. All intended subject and core branches are present at their reviewed heads.
2. Merge conflicts are resolved with all affected subject tests rerun.
3. `npm ci` succeeds from a clean checkout.
4. `npm run check` passes, including audits, all tests, the production build, the artifact check, and the dependency audit.
5. The subject release evidence in `SUBJECT_RELEASE_CHECKLIST.md` is complete, including the generic release-audit output, clean-room audit, and naive-assessor gate.
6. Large randomized simulations satisfy every released subject's blueprint on every accepted draw.
7. No exam contains two questions from the same variant group.
8. The release manifest and built HTML contain every `released` bank and no `draft` bank.
9. New or changed SVGs render legibly and match their question text and alternative text.
10. The integration PR is mergeable and its required GitHub Actions checks pass on the exact head commit.
11. A deployment preview or local production artifact smoke test confirms catalog selection, preflight, and exam start behavior for every released subject.

After merging, verify the Pages deployment completed from the merge commit and smoke-test the public site. Passing tests, building `_site`, and uploading the Pages artifact are not sufficient by themselves: the final Pages deployment step must also complete successfully. If deployment fails, treat `main` as impaired and fix it immediately through a focused hotfix branch.

## Repository protections

Recommended GitHub branch protection for `main`:

- require a pull request before merging;
- require the validation workflow to pass;
- require the branch to be up to date before merging;
- block force pushes and branch deletion;
- dismiss stale approvals when the head changes;
- restrict deployment to successful `main` workflow runs.

Subject and integration branches should be squash-merged where practical and deleted after their work is incorporated. Never force-push `main`.
