# AP U.S. History Release Evidence

> **Status: released.** This file is a point-in-time record of the AP U.S. History release candidate and its measured gates. It intentionally preserves the candidate/run evidence from that release; current product state is described in `README.md` and current effective course metadata.

## Candidate

- Audited candidate before promotion: `a60b022700bbc1ea2ed531ff53da06caec76f032`
- Promotion commit: `6b030a1e97fa9c474a7992f6b50b2a03511038e3`
- GitHub Actions Test run: **#1675 / 32280652915**
- Result: **362/362 tests passed**, build passed, artifact check passed, npm audit reported 0 vulnerabilities.

## Exam specification recorded for this release

Verified 2026-08-19 against the then-current College Board AP U.S. History course/exam materials and May 2027 history-exam update. Section I Part A remained **55 MCQs in 55 minutes, 40% of the exam**, primarily using 3–4 question source sets. This product is explicitly Section I Part A practice only; the official digital exam also includes three SAQs, a DBQ, and an LEQ.

## Bank and coverage

- **186 original MCQs**
- **105/105 current Period 1–9 CED topics represented**
- Browser-effective source-set schema and canonical script order verified
- Single-select only; no calculator
- Synthetic quantitative sources explicitly labeled and internally checked
- Explanations all meet the repository rationale-depth release gate

## Answer construction

Final candidate metrics from run #1675:

- Uniquely-longest correct answer: **1.1%**
- Among-longest correct answer: **8.1%**
- Raw key counts: **A 44 / B 48 / C 47 / D 47**
- No stacked absolute-language distractor tells
- No repeated boilerplate answer-hardening tail within an item

## Draw and retake audit

- **5,000/5,000** exact 55-question forms passed the official period blueprint
- **5,000** independent retake pairs passed
- Mean retake overlap: **31.6%**, below the project maximum of 40%

## Independent clean-room review

The post-repair review restarted from the current exam specification and reviewed topic coverage, source dependence, answer keys, distractor competitiveness, causal claims, chronology, and student-facing explanations. It found one substantive late-stage issue: a question described both the Afghanistan and Iraq wars as direct consequences of September 11. The item was corrected to the direct expansion of counterterrorism policy and the U.S.-led war in Afghanistan, the explanation was narrowed, and a regression test was added. The restarted review after that repair produced **zero additional substantive findings**.

## Naive student-flow audit

The browser-effective preflight exposed the 55-question / 55-minute format, MCQ-only scope, no-calculator status, and the existence of the official free-response components. Generic application tests also covered preflight confirmation, timer start behavior, session resume, navigation, flagging, submission/review flow, keyboard/screen-reader semantics, and draft exclusion from production artifacts.

## Release decision

The candidate satisfied the content, construction, draw, retake, clean-room, naive, build, and artifact gates and was subsequently promoted and integrated into production. The figures above remain the recorded release snapshot rather than a live product-status document.
