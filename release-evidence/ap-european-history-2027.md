# AP European History — 2027 release evidence

## Reviewed candidate

- Subject branch: `subject/ap-european-history`
- Fresh post-repair reviewed content candidate: `2d8e33c20165859faa62e2517ad38aae94609fad`
- Exact GitHub PR merge candidate tested: `efcc9d3e8a1612b09e4783b3d78da6fe83bda566`
- PR: #70
- Verification date: 2026-08-19

## Official format verification

Current College Board AP European History materials were rechecked independently on 2026-08-19 before the final release review.

- Section I, Part A: **55 multiple-choice questions / 55 minutes / 40% of exam score**.
- MCQs are normally presented in **3–4 question sets** around primary or secondary texts, images, maps, charts, and other historical evidence.
- All nine course units carry a published **10–15%** multiple-choice weighting band.
- MCQ work uses historical-thinking Skills **1–5**.
- The May 2027 update changes written-response presentation; the AP European History course content and Section I Part A blueprint remain unchanged.
- Calculator: not used for this history exam.

Authoritative sources:

- AP Central exam page: https://apcentral.collegeboard.org/courses/ap-european-history/exam
- AP Central course page / Course and Exam Description materials: https://apcentral.collegeboard.org/courses/ap-european-history
- AP Central 2027 exam updates: https://apcentral.collegeboard.org/exam-administration-ordering-scores/digital-ap-exams/2027-ap-exam-updates

## Browser-effective bank

- **269 questions**.
- **88/88 CED topics** covered.
- **88 intact stimulus groups**: 83 three-question sets and 5 four-question sets.
- **10 browser data layers**: base + Units 1–9.
- **16 quantitative source sets**.
- **5 real local original SVG visual source sets**, each with neutral student-facing alt text and explicit synthetic provenance.
- Delivered blueprint: U1–U8 = 6 questions each; U9 = 7 questions; 18 whole stimulus sets per 55-question form.

## Findings and repairs

Earlier review passes found substantive quality problems despite structurally correct content. These were repaired before this final candidate, including:

- stale layered-bank notation diagnostics;
- widespread absolute-language and correct-answer length tells;
- short/cartoonishly wrong historical distractors;
- several specific same-domain distractor defects in U3, U5, U6, U7, U8, and U9;
- description-only visual placeholders, replaced with five local original SVG stimuli;
- overly repetitive answer-length qualifier construction;
- naive-review giveaway evidence options;
- quantitative-test assumptions that were stricter than the valid table schema rather than the content standard itself.

The final repair pass replaced the remaining U8 state-power distractor and retained a substantive per-set quantitative interpretation requirement.

## Fresh post-repair review

A fresh review of the browser-effective candidate was restarted after the final substantive repairs rather than treating “findings fixed” as a clean pass.

Result: **zero new substantive findings** in the post-repair pass.

Specific clean checks:

- exact 88-topic inventory and only current MCQ skills 1–5;
- one clear key and substantive feedback for reviewed semantic repairs;
- naive giveaway-distractor audit: clean;
- no stacked absolute-language distractor tells;
- no repeated boilerplate qualifier tail across multiple options in one item;
- all 16 quantitative sets structurally complete and transparently synthetic/composed;
- representative quantitative trends independently recomputed from embedded tables;
- all five SVGs manually traced against the neutral alt text and question claims, with no visual contradiction found;
- preflight/trust checks correctly expose 55 questions, 55 minutes, no calculator, fully digital official exam context, and MCQ-only practice scope.

## Exact candidate CI evidence

GitHub Actions Test run **#1556**, run ID **32269215918**, checked out exact PR merge SHA `efcc9d3e8a1612b09e4783b3d78da6fe83bda566` and completed successfully.

- **349/349 tests passed**.
- AP Euro answer construction:
  - uniquely-longest correct: **24.2%**;
  - exploitable among-longest: **38.3%**;
  - correct answers: **11.47 words average**;
  - distractors: **10.81 words average**;
  - raw keys: **A 25.3%, B 25.3%, C 24.5%, D 24.9%**.
- Absolute-language stacked items: **0**.
- Draw simulation: **5,000/5,000 valid** 55-question whole-set forms.
- Independent retake overlap: **21.6%** average shared questions.
- Quantitative suite: all 16 source sets and independent trend checks green.
- Visual/accessibility suite: all five local SVG source sets green.
- Notation/presentation diagnostic: green.
- `npm audit --omit=dev`: **0 vulnerabilities**.

Because Euro remained `releaseStatus: "draft"` for this reviewed candidate, the production build correctly reported **22 released subjects / 63 released data layers** and the artifact check confirmed draft Euro data was excluded. That is the expected pre-promotion behavior.

## Promotion and production gates still required

The reviewed content candidate above is release-ready, but production release is not complete until all remaining gates pass:

1. small promotion change from `draft` to `released`;
2. fresh integration branch from current `main`;
3. full CI on the exact integration merge candidate;
4. production artifact contains AP European History and all ten Euro data layers;
5. exact green integration commit moved/merged to `main`;
6. GitHub Pages final deployment step green from that exact `main` commit;
7. public catalog → preflight → real exam-start smoke test succeeds.
