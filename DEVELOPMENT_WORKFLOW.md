# Development and Release Workflow

`main` is production. Every commit on `main` must be deployable, and GitHub Pages publishes only from successful `main` workflow runs.

## Branch flow

```text
focused subject / content / core / docs branch
                    ↓
     fresh ephemeral integration branch
                    ↓
       exact prospective-tree validation
                    ↓
                   main
                    ↓
         GitHub Pages + public smoke test
```

## 1. Focused development branches

Create work from the current `main` branch.

Examples:

- `subject/ap-<course>` for a new course;
- `content/ap-<course>-<change>` for bank improvements;
- `fix/<issue>` for a focused defect;
- `core/<change>` for shared draw/session/build/accessibility infrastructure;
- `docs/<change>` for documentation/user-facing scope cleanup.

Do not develop directly on `main`.

Unfinished courses remain `releaseStatus: "draft"`. Effective metadata may be defined in the base `js/subjects.js` registry and/or course-specific metadata overlays; review the browser-effective load order rather than assuming the base registry is the whole configuration.

## 2. Subject/content gate

A new or materially revised course must satisfy [`CONTENT_STANDARDS.md`](CONTENT_STANDARDS.md) and [`SUBJECT_RELEASE_CHECKLIST.md`](SUBJECT_RELEASE_CHECKLIST.md), including current official-source verification, independent content review, naive-assessor review, subject-specific tests, and the reusable release audit:

```bash
npm run release:audit -- --subject ap-<course-id> --trials 5000 --overlap-trials 5000
```

After any substantive content repair, restart the clean-room audit from scratch. After a meaningful UX repair, use a fresh naive assessor.

Shared-engine changes must be tested against the whole released catalog, not only the course that motivated the change.

## 3. Integration branch

For a production release, create a **new short-lived integration/release branch from the latest `main`**. Bring in only the reviewed heads intended for that release.

Resolve shared-file conflicts there. A resolution is correct only if it preserves every affected course's behavior and tests.

Run from a clean checkout:

```bash
npm ci
npm run check
```

The integration candidate must satisfy all of the following:

1. intended reviewed changes are present and nothing unrelated is included;
2. all repository tests pass;
3. large randomized form/retake gates pass for affected courses;
4. no attempt violates course blueprint, set, part, or variant constraints;
5. the production build contains every released data layer and no draft/out-of-scope bank;
6. catalog → preflight → exam-start behavior works in the built artifact;
7. user-facing README/About/scope/limitations copy matches the product being released;
8. dependency/security checks are green.

## 4. Exact prospective-production tree gate

A green branch head is necessary but not always sufficient. Before merging to `main`, validate the **exact tree GitHub would put into production**.

When the pull-request workflow provides a synthetic/prospective merge commit, record its commit and tree SHA and confirm the full repository gate ran against that candidate. If a candidate is constructed explicitly, it must have current `main` and the exact intended head(s) as parents/content.

Do not merge if `main` moved after the candidate was constructed. Rebuild and revalidate against the new base.

This gate prevents the common failure mode where a feature branch is green but its actual merge result differs because of shared-file integration or a moving base.

## 5. Merge to `main`

Merge only when the exact prospective candidate is green and the PR head is unchanged. Pin the expected head SHA when the GitHub API supports it.

After merge:

- confirm `main` points at the expected merge;
- compare the actual merge tree SHA with the tested prospective tree SHA when the release used that exact-tree method;
- treat a tree mismatch as a release failure even if the individual branch had passed.

Integration branches are disposable and should not become a long-lived `develop` branch.

## 6. GitHub Pages deployment gate

The Pages workflow must complete from the production merge. A successful build or artifact upload alone is not a successful deployment.

After deployment, smoke-test the public site:

- landing catalog and search;
- released/out-of-scope grouping and scope note;
- About/limitations navigation;
- course card metadata;
- preflight question count/timing/calculator/part details;
- real exam start/rendering;
- save/resume where practical;
- navigation, submit, explanations, and return to catalog.

If Pages deployment fails after merge, treat production as impaired and repair through a focused hotfix branch.

## 7. Documentation changes

Documentation is production behavior when users or future contributors rely on it.

A docs/UI-copy release should verify:

- released-course count and current scope;
- README links and live-site link;
- About page limitations and privacy language;
- no obsolete “coming soon” promise for deliberately out-of-scope courses;
- developer docs describe the current architecture and release process;
- historical release-evidence files are clearly labeled as point-in-time snapshots rather than live specifications.

Prefer stable statements derived from effective metadata over manually maintained tables of bank sizes or exam numbers unless those numbers are intentionally part of the document's purpose.

## 8. Repository protections

Recommended protection for `main`:

- require pull requests;
- require the validation workflow;
- require an up-to-date base before merge;
- block force pushes and branch deletion;
- dismiss stale approvals when the head moves;
- restrict Pages deployment to successful `main` runs.

Never force-push `main`.
