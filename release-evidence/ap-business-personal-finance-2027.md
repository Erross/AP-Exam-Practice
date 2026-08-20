# AP Business with Personal Finance — 2027 release evidence

## Reviewed candidate

- Subject branch: `subject/ap-business-personal-finance-2027`
- Fresh post-repair reviewed content candidate: `337ececabcd0a884e3af2c090ddd1223c360d237`
- Reviewed-content PR: #78
- Verification date: 2026-08-20
- Release state at reviewed content candidate: `draft`

## Official format verification

Current College Board AP Business with Personal Finance materials were rechecked independently on 2026-08-20 for the first exam administration in May 2027.

- The exam is **fully digital** and lasts **2 hours 40 minutes**.
- Section I: **60 multiple-choice questions / 70 minutes / 60% of exam score**.
- **All Section I multiple-choice questions appear in sets of 3 or 4** with stimulus material such as business narratives, data, financial information, or other scenario evidence.
- Published Section I unit bands are:
  - Unit 1: **20–30%**;
  - Unit 2: **20–30%**;
  - Unit 3: **25–35%**;
  - Unit 4: **15–20%**.
- Personal finance accounts for **12–15 questions / 20–25%** of Section I.
- Published MCQ skill-family bands are:
  - Skill 1 Concept Application: **45–55%**;
  - Skill 2 Entrepreneurship: **5–15%**;
  - Skill 3 Decision Making: **25–35%**;
  - Skill 4 Communication: **5–15%**.
- A handheld **4-function calculator** or Bluebook's built-in Desmos **4-function calculator** is permitted.
- The four official free-response questions are:
  1. **Business Canvas Project Exam-Day Validation**;
  2. **Personal Finance**;
  3. **Business Concept Application**;
  4. **Business Decision**.

Authoritative sources:

- AP Students exam page: https://apstudents.collegeboard.org/courses/ap-business-personal-finance/assessment
- AP Students course page: https://apstudents.collegeboard.org/courses/ap-business-personal-finance
- AP Business with Personal Finance Course and Exam Description, effective Fall 2026: https://apcentral.collegeboard.org/media/pdf/ap-business-personal-finance-course-and-exam-description.pdf

## Browser-effective bank

- **192 questions** total.
- **64 intact three-question source sets**.
- **No standalone questions** remain in the browser-effective bank.
- **28 generated topic sets / 84 questions** provide source-based Concept Application practice across all 28 examinable topics.
- **36 independently authored scenario/data sets / 108 questions** provide additional Concept Application plus Entrepreneurship, Decision Making, and Communication practice.
- **45 semantically personal-finance-tagged questions across 15 complete candidate sets**.
- **28/28 examinable topics** represented.
- **13 browser data layers**, in canonical order:
  1. base AP Business bank/helper;
  2. Unit 1 topic records;
  3. Unit 2 topic records;
  4. Unit 3 topic records;
  5. Unit 4 topic records;
  6. first authored source-set layer;
  7. second authored source-set layer;
  8. third authored source-set layer;
  9. diversity-expansion source-set layer;
  10. substantive quality curation;
  11. semantic personal-finance classification;
  12. exact-skill curation;
  13. final clean-room review corrections.
- Browser metadata is explicitly wired before the bank and runtime.

Every delivered 60-question form is constrained to:

- **20 complete three-question sets**;
- exact unit geometry **15 / 15 / 18 / 12 questions** = **5 / 5 / 6 / 4 sets** from Units 1–4;
- the published Skill 1–4 family bands;
- **12–15 personal-finance questions** = 4–5 complete PF sets;
- no broken source groups and no standalone MCQs.

College Board specifies that Section I questions appear in sets of 3 or 4 but does not publish a mandatory mix of three-question and four-question sets. The practice drawer therefore uses 20 complete three-question sets rather than inventing an unsupported 3/4-set distribution.

## Findings and repairs

Development and independent clean-room review rejected several earlier candidate shapes and repaired substantive defects before the reviewed SHA:

- The original mixed architecture used generated standalone questions even though live College Board verification showed that **all** Section I MCQs appear in source sets of 3 or 4. The bank was rebuilt as an all-set bank rather than accepting that mismatch.
- Generated standalones had previously carried false higher-order Skill 2–4 tags. The final generated topic sets are limited to exact Concept Application subskills **1.A / 1.B / 1.C**; higher-order skills occur only in independently authored source sets.
- Personal-finance classification originally counted business cash-flow-reporting material to reach the published percentage. Final classification is semantic and explicitly excludes Topic 3.8 business cash-flow reporting from the PF gate.
- Several authored questions were in the correct broad skill family but not performing the exact CED subskill. Exact-skill curation repaired hypothesis testing, action-to-problem reasoning, evidence-supported recommendations, and audience/purpose communication tasks.
- A credit-card comparison had an incorrect/ambiguous keyed answer; the arithmetic and key were corrected.
- Several early distractors were cartoon wrong or used stacked absolute-language tells; these were replaced with same-domain competitors.
- Initial answer construction exceeded the project's uniquely-longest-key ceiling. Same-unit generated competitors are now selected for natural semantic/length parallelism, and the largest remaining authored outliers were substantively curated without qualifier padding.
- A generic notation diagnostic did not initially group AP Business's layered bank behind its required base helper; the loader was corrected generically.
- The first fully source-set candidate had only 56 candidate sets and produced **43.6% retake overlap**, above the project ceiling. The authored portfolio was expanded by eight new three-question sets—two per unit, including three additional PF sets—bringing the candidate pool to 64 sets and reducing constrained overlap below 40%.
- A new installment-loan comparison initially omitted Offer A's $80 origination fee from its all-in comparison. Final review recomputed and rewrote the set: Offer A = **$2,360** total listed cash paid; Offer B = **$2,500**.
- A new Unit 3 PF set initially used an emergency-fund scenario under Topic 3.1, whose current topic is **Saving for Future Purchases**. It was rewritten around a six-month used-car down-payment goal while preserving the valid savings-versus-debt calculation.

Temporary focused-diagnostic CI scaffolding was removed after the AP Business suite became green; the reviewed and promoted candidates use the repository's normal single `npm run check` workflow.

## Independent exact-skill/content review

The final browser-effective bank was reviewed against the current CED semantics rather than trusting branch labels.

- Generated topic sets perform the exact Concept Application sequence:
  - **1.A** describes the applicable concept;
  - **1.B** interprets qualitative evidence from the scenario;
  - **1.C** explains why an action fits the illustrated concept.
- Generated stems are diversified across multiple equivalent phrasings rather than repeating one mechanical prompt for all 28 sets.
- **2.B** items state and test measurable business hypotheses.
- **2.C** items assess desirability, viability, or feasibility.
- **3.B** items carry the causal explanation of how an action addresses a problem/opportunity in the student-facing option, not only in the rationale.
- **3.D** items make a decisive recommendation and include supporting reasoning/evidence in the recommendation itself.
- **4.A / 4.B** items explicitly account for audience or purpose; the owners' financing communication was correctly retagged from data presentation to authentic communication.
- Business cash-flow reporting remains outside the PF classification.
- Representative and newly added quantitative anchors were independently recomputed, including pricing revenue, savings plans, loan repayment, credit-card rewards, net worth, channel contribution, repair-pilot viability, checking-account costs, future-purchase savings, and short-term cash financing.

## Naive student-facing review

The browser-effective preflight exposes the facts a student needs before starting:

- **60 questions**;
- **70 minutes** for Section I;
- **2-hour-40-minute official exam**;
- **fully digital** exam;
- explicit note that all official Section I MCQs appear in **sets of 3 or 4**;
- **4-function calculator permitted**;
- explicit Section I practice scope;
- all four official FRQ names.

The generic catalog/preflight UI is regression-tested to surface question count, timing, total duration, calculator status, and the AP Business-specific scope note without implementation jargon.

## Release metrics

The final browser-effective AP Business bank has repeatedly produced the same cue envelope across clean and promoted candidates:

- **192 questions / 64 complete source sets**.
- Uniquely-longest keyed answer: **22.4%**.
- Exploitable among-longest: **35.9%**.
- Correct-answer length: **22.37 words average**.
- Distractor length: **22.33 words average**.
- Raw answer keys: **[46, 51, 48, 47]** = 24.0%, 26.6%, 25.0%, 24.5%.
- Rationales under 90 characters: **0**.
- Stacked absolute-language items: **0**.
- Draw simulation: **5,000/5,000 valid** exact 60-question forms.
- Personal-finance envelope: **12–15 questions**.
- Source-set envelope: exactly **20 complete sets**.
- Independent retake overlap: **37.5–37.6%** average shared questions across final runs.
- Exact-skill semantic suite: green.
- Naive student-facing suite: green.
- Browser-effective layer/order suite: green.

## Exact clean-candidate CI evidence

After temporary diagnostic CI was removed, clean reviewed candidate `337ececabcd0a884e3af2c090ddd1223c360d237` ran through the repository's normal full `npm run check` workflow.

GitHub Actions Test run **#2011**, run ID **32406514593**, completed successfully.

- Full repository `npm run check`: **passed**.
- AP Business browser/clean-room/naive/quality/release-metric suites: **passed**.
- Cross-bank notation/presentation diagnostic: **passed**.
- Build: **passed** while AP Business remained `draft`.
- Artifact verification: **passed** with draft AP Business excluded from the released public artifact.
- Dependency audit: **passed**.

## Promotion evidence

Promotion was intentionally limited to the release state and tests whose purpose is to assert that state.

- Evidence-only pre-promotion head: `6140a06d5e9ed8d815dd4a8abe942da4b96e565f`.
- Promoted subject head: `132ec06d39cbc63799c3688a3c63c5516f12d7bc`.
- Promotion diff from the evidence-only head changed exactly four files:
  - `js/ap-business-personal-finance-metadata.js`: `draft` → `released`;
  - browser release-state assertions;
  - subject release-state assertions;
  - naive release-state assertion.
- **No AP Business question/data file changed during promotion.**
- Exact promoted prospective-main merge commit: `c557ae4954f02b01290ea32abcc4f11365d3d880`.
- Its parents are current `main` `57e0d8fb912424714d977728bfa394cd7071b8ab` and promoted subject head `132ec06d39cbc63799c3688a3c63c5516f12d7bc`.
- GitHub Actions Test run **#2021**, run ID **32408932297**, explicitly checked out `c557ae4954f02b01290ea32abcc4f11365d3d880` and completed successfully.
- **419/419 tests passed**.
- AP Business: **5,000/5,000 valid forms**; PF **12–15**; exactly **20 complete source sets**; retake overlap **37.5%**.
- Answer metrics remained **22.4% uniquely-longest**, **35.9% exploitable among-longest**, **22.37 vs 22.33 words**.
- Build: **27 released subjects / 122 released data layers**.
- Artifact check: **27 released subjects and all 122 referenced released layers**, with draft data excluded.
- Dependency audit: **0 vulnerabilities**.

## Integration and production status

A fresh integration branch was created from current `main` and fast-forwarded to the exact tested promoted merge commit before the release PR was opened.

- Integration branch: `release/ap-business-personal-finance-2027-integration-20260820`.
- Release PR: **#79**, `Release AP Business with Personal Finance for May 2027`.
- Initial integration commit: `c557ae4954f02b01290ea32abcc4f11365d3d880`.
- This evidence update is the only intentional post-promotion integration change.

Production release remains gated on:

1. full CI passing on PR #79's exact final prospective `main` merge SHA after this evidence update;
2. the resulting production artifact still reporting **27 released subjects / 122 released data layers** and containing AP Business;
3. merging PR #79 to `main` only after that exact final merge-tree gate is green;
4. GitHub Pages deployment completing successfully from the exact resulting `main` commit;
5. public catalog → AP Business preflight → exam-start smoke verification succeeding.
