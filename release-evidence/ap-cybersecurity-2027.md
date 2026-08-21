# AP Cybersecurity — 2027 release evidence

## Reviewed candidate

- Subject branch: `subject/ap-cybersecurity-2027`
- Final independently reviewed draft candidate: `7d7d3050ea7b6e0cf22422a1e23f1143d8b9464d`
- Reviewed-content PR: #81
- Verification date: 2026-08-20
- Release state at reviewed candidate: `draft`

## Official format verification

Current College Board AP Cybersecurity materials were rechecked independently for the first AP exam administration in May 2027.

- The exam is **fully digital**.
- Section I: **60 multiple-choice questions / 80 minutes / 70% of the exam score**.
- Section I includes individual questions and question sets containing **2–4 questions** tied to a common stimulus or evidence source.
- Section II: **1 Device Security Analysis free-response question / 50 minutes / 30% of the exam score**.
- College Board publishes three assessed skill-category weights for Section I, each at **25–40%**:
  - Analyze Risk;
  - Mitigate Risk;
  - Detect Attacks.
- College Board does **not** publish per-unit MCQ percentage weights for AP Cybersecurity. All five units are assessed.

Authoritative sources:

- AP Students exam page: https://apstudents.collegeboard.org/courses/ap-cybersecurity/assessment
- AP Cybersecurity Course and Exam Description, effective Fall 2026: https://apcentral.collegeboard.org/media/pdf/ap-cybersecurity-course-and-exam-description.pdf

The browser metadata therefore does not claim official per-unit exam percentages. Its unit allocation uses the CED's suggested pacing only as a neutral engineering allocation to keep all five units represented, and the student-facing note explicitly discloses that distinction.

## Browser-effective bank

- **228 questions** total.
- **192 standalone questions**: eight per CED topic.
- **36 source-set questions** across **12 complete three-question evidence sets**.
- **24/24 CED topics** represented.
- Standalone questions are organized into **96 two-question variant groups**, preventing semantic alternates from co-occurring on one form.
- Every source set stays intact and within one unit.
- Synthetic source material is labeled as original synthetic evidence.
- Browser-effective data layers load in canonical order:
  1. base AP Cybersecurity bank;
  2. substantive quality curation;
  3. source-set expansion;
  4. final clean-room source-set curation.
- Browser metadata is explicitly wired before the bank and runtime.

Every delivered 60-question practice form is constrained to:

- exactly **60 unique questions**;
- all five units represented using the disclosed CED-pacing engineering allocation;
- each of the three official skill families inside its **15–24 question** integer envelope corresponding to the published 25–40% range;
- **5–8 complete source sets**;
- no duplicate semantic variant group.

## Findings and repairs

Independent clean-room review did not accept the first authored shape without repair. The final candidate includes the following substantive corrections:

- Source-set distractors that advertised their wrongness through absolute or cartoon wording were replaced with plausible same-domain misconceptions.
- Final source-set curation was corrected to preserve each question's **actual rotated keyed option** rather than assuming the reviewed key always occupied option A. Correct-answer semantics were preserved; only non-key distractors were replaced.
- Browser dependency diagnostics were updated so the layered Cybersecurity bank is evaluated in the same base → quality → source-set → final-curation order used by `index.html`.
- Source-set and standalone inventories were checked for one clear keyed answer, substantive rationale depth, exact topic coverage, source integrity, and variant separation.
- The release suite was strengthened from development-sized simulations to explicit **5,000-form and 5,000-retake** gates before promotion.

## Naive student-facing review

The browser-effective preflight exposes the exam-critical facts without presenting the engineering unit allocation as College Board weighting:

- **60 questions**;
- **80 minutes** for Section I;
- **2-hour-10-minute official exam duration**;
- **fully digital** delivery;
- published **25–40%** skill-category weighting;
- explicit statement that College Board does not publish per-unit MCQ percentages;
- explicit Section I practice scope;
- the official **Device Security Analysis** FRQ and **50-minute** Section II timing.

## Release metrics

The reviewed and promoted candidates retain the same content envelope:

- Questions: **228**.
- Raw answer keys: **[57, 57, 57, 57]** — exactly balanced.
- Uniquely-longest keyed answer: **21.5%**.
- Exploitable among-longest: **30.3%**.
- Correct-answer length: **20.83 words average**.
- Distractor length: **21.87 words average**.
- Stacked absolute-language release gate: passed.
- Draw simulation: **5,000/5,000 valid** 60-question forms.
- Independent retake overlap: **33.2–33.3%** average shared questions across final 5,000-pair runs.
- Browser wiring / global-scope / notation diagnostics: green.
- Dependency audit: **0 vulnerabilities**.

## Exact clean-candidate CI evidence

GitHub Actions Test run **#2094**, run ID **32438420170**, tested PR #81's exact prospective-main merge commit **`3c90f2d71b621f296d8d8bdda7f1597cfb07834b`**, merging reviewed subject head `7d7d3050ea7b6e0cf22422a1e23f1143d8b9464d` into then-current `main` `d0f93fe70f46de500862d9a7580f6ba911b89781`.

Results:

- Full repository `npm run check`: **passed**.
- **429/429 tests passed**.
- AP Cybersecurity browser-effective registry and bank: **passed**.
- AP Cybersecurity 5,000-form release gate: **passed**.
- AP Cybersecurity 5,000-retake gate: **passed**, **33.3% overlap**.
- Cross-bank browser-global-scope diagnostic: **passed**.
- Cross-bank notation/presentation diagnostic: **passed**.
- Build: **passed** while Cybersecurity remained `draft`.
- Public artifact: **passed**, with draft Cybersecurity correctly excluded.
- Dependency audit: **0 vulnerabilities**.

## Promotion evidence

Promotion was content-frozen after evidence-only head `9104371d666eb496076d9e7d8402baf6a9f1ec01`.

Promoted subject head: **`033507526d7d63164e19995cca132252a6861f8a`**.

The promotion diff from the evidence-only head changed exactly three files:

1. `js/ap-cybersecurity-metadata.js`: browser-effective `releaseStatus` from `draft` to `released`;
2. `tests/ap-cybersecurity-browser.test.js`: release-state test wording/assertion only;
3. `tests/ap-cybersecurity-draft.test.js`: release-state assertion only.

**No AP Cybersecurity question or data layer changed during promotion.**

The exact promoted prospective-main merge commit was **`16e3dd675faa58588a49bd21461f9873dc173691`**, merging promoted subject head `033507526d7d63164e19995cca132252a6861f8a` into unchanged `main` `d0f93fe70f46de500862d9a7580f6ba911b89781`.

GitHub Actions Test run **#2108**, run ID **32442568547**, job **96656043143**, explicitly checked out that exact merge commit and completed successfully.

- **429/429 tests passed**.
- AP Cybersecurity 5,000-form gate: **passed**.
- AP Cybersecurity 5,000-retake overlap: **33.2%**.
- Answer metrics remained **21.5% uniquely-longest**, **30.3% exploitable among-longest**, **20.83 vs 21.87 words**, keys **[57,57,57,57]**.
- Build: **28 released subjects / 126 released data layers**.
- Public artifact: **28 released subjects and all 126 referenced released data layers**, with draft data excluded.
- Dependency audit: **0 vulnerabilities**.

## Integration and production gate

A fresh release integration branch was created directly at the exact tested promoted merge commit:

- Integration branch: `release/ap-cybersecurity-2027-integration-20260821`.
- Initial integration commit: **`16e3dd675faa58588a49bd21461f9873dc173691`**.
- This evidence update is the only intentional post-promotion integration change.

Production release remains gated on:

1. opening the dedicated AP Cybersecurity release PR from the integration branch to current `main`;
2. full CI passing on that PR's **exact final prospective-main merge SHA** after this evidence update;
3. the resulting public artifact still reporting **28 released subjects / 126 released data layers** and containing AP Cybersecurity;
4. merging only after that exact merge-tree gate is green;
5. confirming the resulting `main` tree is byte-for-byte the tested final merge tree;
6. GitHub Pages deployment and public catalog → AP Cybersecurity preflight → exam-start smoke verification, where independently observable.
