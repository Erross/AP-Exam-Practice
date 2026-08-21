# AP Computer Science Principles — 2027 release evidence

## Reviewed candidate

- Subject branch: `subject/ap-computer-science-principles-2027`
- Final independently reviewed draft candidate: `89dc6988dfd66dd15fc6a0f0097b9cfb400b3af8`
- Reviewed-content PR: #80
- Verification date: 2026-08-20/21
- Release state at reviewed candidate: `draft`

## Official format verification

Current College Board AP Computer Science Principles materials were independently checked for the May 2027 exam.

- The exam is **fully digital**.
- Section I: **70 multiple-choice questions / 120 minutes / 70% of the exam score**.
- The 70 questions comprise **57 ordinary single-select questions**, **5 single-select questions sharing one computing-innovation reading passage**, and **8 multiple-select questions for which students select two answers**.
- Section II contributes **30%** and includes the through-course Create performance task plus **two exam-day written-response questions (four prompts) / 60 minutes**.
- Published Big Idea / unit weighting bands represented in metadata are:
  - Big Idea 1 Creative Development: **10–13%**;
  - Big Idea 2 Data: **17–22%**;
  - Big Idea 3 Algorithms and Programming: **30–35%**;
  - Big Idea 4 Computer Systems and Networks: **11–15%**;
  - Big Idea 5 Impact of Computing: **21–26%**.
- Published Computational Thinking Practice bands are converted to inclusive integer count ranges for a 70-question form; Practice 6 is not assessed in Section I.

Authoritative sources:

- AP Students exam page: https://apstudents.collegeboard.org/courses/ap-computer-science-principles/assessment
- AP Central course page: https://apcentral.collegeboard.org/courses/ap-computer-science-principles
- Current Course and Exam Description: https://apcentral.collegeboard.org/media/pdf/ap-computer-science-principles-course-and-exam-description.pdf

## Browser-effective bank and runtime

- **320 questions** total.
- **35/35 CED topics** represented.
- **280 standalone questions**: eight per topic.
- Every topic has exactly **one select-two item**, giving 35 select-two candidates.
- Standalone items are organized into **140 two-question variant groups**, preventing semantic alternates from co-occurring on a form.
- **40 passage questions** across **8 complete five-question computing-innovation passage sets**.
- Browser-effective data layers load in canonical order:
  1. base CSP bank;
  2. substantive quality curation;
  3. computing-innovation passage expansion;
  4. final passage quality curation.
- Browser metadata is explicitly wired before the bank/runtime.
- `js/multiselect.js` adds CSP-specific select-two rendering, persistence validation, and constrained form construction without changing single-select behavior for other subjects.

Every delivered 70-question form is constrained to:

- exactly **70 unique questions**;
- exact Big Idea allocation **8 / 14 / 23 / 9 / 16** questions;
- exactly **57 ordinary single-select + 8 select-two + 5 passage questions**;
- exactly **one intact five-question passage set**;
- all published Computational Thinking Practice families inside their integer ranges;
- no duplicate semantic variant group.

## Findings and repairs

Independent review rejected and repaired defects before the final candidate:

- The original generic single-select runtime could not represent the official eight select-two questions. CSP received opt-in multi-select support rather than approximating those questions as single-select.
- The form drawer was made constructive for the exact CSP geometry: unit counts, eight select-two items, one complete five-question passage set, practice ranges, and variant separation must all hold simultaneously.
- The bank was expanded to deep per-topic inventory and eight passage alternatives so retakes remain below the project overlap ceiling.
- Answer construction was reviewed for key-position balance, length cues, and stacked absolute-language distractors.
- Student-facing rationales and schema were checked across the full browser-effective bank.
- Browser wiring and global-scope diagnostics were updated for the CSP metadata, four data layers, and multi-select runtime.
- A final CI failure was traced to a **test-harness realm artifact**, not content: an empty array produced from VM-realm objects was compared directly to host-realm `[]` with strict deep equality. The assertion was changed to `offenders.length === 0`; no question, answer, scoring, drawing, or runtime content changed in that repair.

## Naive student-facing review

The browser preflight exposes the exam-critical facts:

- **70 questions / 120 minutes** for Section I;
- **3-hour official exam duration**;
- **fully digital** delivery;
- the exact **57 single-select + 5 passage + 8 select-two** Section I composition;
- explicit notice that the through-course Create performance task and written-response portion are not simulated by this MCQ practice product;
- Section II timing and the four official written-response prompt labels represented in metadata.

The catalog scope language also explicitly states that AP Language and Culture courses remain outside the current product scope because listening/audio workflows are not yet supported.

## Release metrics

Final reviewed candidate metrics from the exact PR merge-candidate CI run:

- Questions: **320**.
- Single-select answer keys: **[71, 72, 71, 71]**.
- Uniquely-longest keyed answer: **21.8%**.
- Exploitable among-longest: **28.1%**.
- Correct-answer length: **20.19 words average**.
- Distractor length: **20.60 words average**.
- Stacked absolute-language release gate: passed.
- Draw simulation: **5,000/5,000 valid** exact 70-question forms.
- Independent 5,000-pair retake overlap: **28.6%** average shared questions.
- Browser wiring / select-two persistence / global-scope / notation diagnostics: green.
- Dependency audit: **0 vulnerabilities**.

## Exact clean-candidate CI evidence

GitHub Actions Test run **#2100**, run ID **32442450619**, job **96655683831**, tested PR #80's exact prospective-main merge commit **`c95aea25f978a40a7f27c6c2a925ab0eede95b2c`**, merging reviewed subject head `89dc6988dfd66dd15fc6a0f0097b9cfb400b3af8` into current `main` `d0f93fe70f46de500862d9a7580f6ba911b89781`.

Results:

- Full repository `npm run check`: **passed**.
- **430/430 tests passed**.
- AP CSP exact 70-question constructive-form gate: **5,000/5,000 passed**.
- AP CSP 5,000-retake gate: **passed**, **28.6% overlap**.
- Select-two shuffle/persistence semantics: **passed**.
- Browser wiring / global-scope / notation diagnostics: **passed**.
- Build/artifact verification: **passed** while CSP remained `draft`, so it was correctly excluded from the public artifact.
- Dependency audit: **0 vulnerabilities**.

## Promotion gate

Promotion must remain content-frozen. After this evidence-only commit, permitted promotion changes are limited to:

1. changing browser-effective CSP `releaseStatus` from `draft` to `released`;
2. changing only tests whose purpose is to assert that release state;
3. recording the promoted and final integration SHAs/CI facts in release evidence.

**No CSP question/data layer or runtime file may change during promotion.**

The promoted prospective-main merge commit must pass the full repository CI, including the 5,000-form/5,000-retake CSP gates, select-two tests, build, artifact verification, notation/global-scope diagnostics, and dependency audit before integration or merge to `main`.
