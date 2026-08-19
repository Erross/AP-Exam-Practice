# AP World History: Modern — 2027 release evidence

## Reviewed candidate

- Validation branch: `release/ap-world-history-2027-validation-20260819`
- Fresh post-repair reviewed content candidate: `53c6c968c8aa7de71b682ec4cdc6fa58142e1bed`
- Exact GitHub PR merge candidate tested: `3b60e699778028fbd379f7fbaa7337fff28b679f`
- PR: #74
- Verification date: 2026-08-19

## Official format verification

Current College Board AP World History: Modern materials were rechecked for the May 2027 exam before final release review.

- Section I, Part A: **55 multiple-choice questions / 55 minutes / 40% of exam score**.
- Questions are primarily presented in **3–4 question source sets** using primary and secondary texts, images, maps, charts, and other historical evidence.
- The official exam is fully digital.
- The official exam also includes three short-answer questions, a document-based question, and a long essay; this product practices the multiple-choice section only.
- Calculator: not used for this history exam.
- Current CED unit MCQ bands represented in the registry:
  - U1 The Global Tapestry: 8–10%
  - U2 Networks of Exchange: 8–10%
  - U3 Land-Based Empires: 12–15%
  - U4 Transoceanic Interconnections: 12–15%
  - U5 Revolutions: 12–15%
  - U6 Consequences of Industrialization: 12–15%
  - U7 Global Conflict: 8–10%
  - U8 Cold War and Decolonization: 8–10%
  - U9 Globalization: 8–10%

Authoritative sources checked during the release work:

- AP Central AP World History: Modern exam page
- AP Central AP World History: Modern course / Course and Exam Description materials
- AP Central May 2027 history-exam updates

## Browser-effective bank

- **164 questions**.
- **71/71 current CED topics** covered.
- **74 browser-effective source/group identities** remain intact after semantic repairs.
- Browser load path: base World bank + Units 1–9 + reviewed quality layers.
- Delivered 55-question unit blueprint: **5 / 5 / 8 / 8 / 7 / 7 / 5 / 5 / 5** for U1–U9.
- Exactly **13 intact stimulus sets** are selected per delivered form.
- All questions remain single-select and use current MCQ-assessed historical skills.
- Synthetic quantitative sources remain explicitly labeled and readable.

## Findings and repairs

The release review was restarted after an earlier structurally green candidate still contained weak historical distractors. The clean-room pass found substantive issues that ordinary schema and Monte Carlo tests could not detect, including:

- cartoonishly wrong or wrong-domain distractors;
- anachronistic distractors that advertised their wrongness;
- repetitive negation / absolute-language alternatives;
- several replacements that initially became too close to the keyed answer;
- specific ambiguity in the Boxer resistance item;
- several globalization distractors that restated the key too closely;
- an Atlantic Revolutions item with two absolute-language distractors;
- a stale World metadata stub in `js/subjects.js`;
- a temporary metadata overlay and runtime metadata mutation that were acceptable for development but not for release.

Repairs preserved stems, keyed answers, CED topics, source-set identities, and explanations wherever the problem was distractor quality. The final alternatives were rewritten as plausible same-era / same-domain competitors with one decisive historical mismatch rather than joke answers.

The verified World metadata is now authoritative in `js/subjects.js`; the temporary metadata overlay has been removed, and the final quality layer no longer mutates release metadata at runtime.

## Fresh post-repair review

A fresh browser-effective review was performed after the last substantive wording repair rather than counting “earlier findings fixed” as a clean pass.

Result: **zero new substantive findings** in the final pass.

Specific clean checks:

- exact 71-topic current CED inventory;
- source-set/group integrity retained;
- one clear key on the specifically re-reviewed ambiguity items;
- no newly found cartoon/anachronistic wrong-domain patterns;
- no newly found stacked absolute-language distractor pattern;
- final targeted historical distractors remain serious same-domain competitors;
- preflight exposes 55 questions, 55 minutes, no calculator, fully digital official-exam context, and MCQ-only practice scope;
- no separate metadata overlay remains in the browser wiring;
- release-critical metadata comes from `js/subjects.js`, the same registry used by the production build.

## Exact candidate CI evidence

GitHub Actions Test run **#1759**, run ID **32295050744**, checked out exact PR merge SHA `3b60e699778028fbd379f7fbaa7337fff28b679f` and completed successfully.

- **375/375 tests passed**.
- AP World answer construction diagnostic:
  - uniquely-longest correct: **1.2%**;
  - raw among-longest diagnostic: **7.9%**;
  - correct answers: **11.75 words average**;
  - distractors: **13.13 words average**;
  - raw key counts: **A 41, B 40, C 44, D 39** across 164 questions.
- Generic browser-effective release audit: **passed** project answer-construction thresholds.
- Stacked absolute-language audit: **passed / no flagged World items**.
- Draw simulation: **5,000/5,000 valid** exact 55-question whole-set forms.
- Independent retake overlap: **37.3%** average shared questions in the explicit World diagnostic, below the <=40% project target.
- Exact 71-topic inventory test: green.
- Source-set schema and MCQ-skill test: green.
- Synthetic quantitative-source test: green.
- Browser wiring / no-metadata-overlay test: green.
- Naive student preflight test: green.
- Build: **24 released subjects / 84 released data layers**; World remained draft and was correctly excluded from the public artifact.
- Artifact check: all **84** referenced released layers present, draft data excluded.
- `npm audit --omit=dev`: **0 vulnerabilities**.

## Promotion and production gates still required

The reviewed content candidate above is release-ready, but production release is not complete until these remaining gates pass:

1. minimal World `releaseStatus: "draft"` → `"released"` promotion;
2. full CI on the exact promoted merge candidate;
3. fresh integration from the then-current `main`;
4. exact integration merge SHA passes the full repository gate;
5. production artifact includes AP World History and all browser-effective World layers;
6. exact tested integration state reaches `main`;
7. GitHub Pages deployment / public-site verification succeeds to the extent observable through available tooling.
