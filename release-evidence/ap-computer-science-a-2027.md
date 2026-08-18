# AP Computer Science A — May 2027 release evidence

Status: **development / draft**

## Authoritative specification

Verified 2026-08-18 against current College Board sources:

- AP Central exam page: https://apcentral.collegeboard.org/courses/ap-computer-science-a/exam
- AP Central course page: https://apcentral.collegeboard.org/courses/ap-computer-science-a
- AP Computer Science A Course and Exam Description, effective Fall 2025: https://apcentral.collegeboard.org/media/pdf/ap-computer-science-a-course-and-exam-description.pdf
- Current AP Computer Science A CED Clarifications and Corrections.
- AP calculator policy: https://apstudents.collegeboard.org/exam-policies-guidelines/calculator-policies

Current exam:

- Fully digital in Bluebook.
- Section I: 42 single-select MCQs / 90 minutes / 55% of exam score.
- MCQ presentation is mostly individual questions, occasionally with 1–2 two-question sets.
- Section II: 4 FRQs / 90 minutes / 45%.
- FRQ types: Methods and Control Structures; Class Design; Data Analysis with ArrayList; 2D Array.
- Java Quick Reference is available in Bluebook and may be printed for students.
- Calculators are not allowed for AP Computer Science A except as an approved accommodation.

## Revised four-unit framework

The governing CED is effective Fall 2025 and contains four assessed units:

| Unit | Official MCQ band | Project 42-question target |
|---|---:|---:|
| U1 Using Objects and Methods | 15–25% | 8 |
| U2 Selection and Iteration | 25–35% | 13 |
| U3 Class Creation | 10–18% | 6 |
| U4 Data Collections | 30–40% | 15 |

The 8/13/6/15 project blueprint comes from normalizing the published-range midpoints (20/30/14/35, total 99) and applying Hamilton apportionment to 42 questions. These are project draw targets inside the official ranges, not College Board-prescribed exact counts.

## Computational Thinking Practice bands

Published MCQ weighting bands:

- Practice 1 Design Code: 2–10% → 1–4 questions on a 42-question form.
- Practice 2 Develop Code: 22–38% → 10–15.
- Practice 3 Analyze Code: 37–53% → 16–22.
- Practice 4 Document Code and Computing Systems: 10–15% → 5–6.
- Practice 5 Use Computers Responsibly: 2–10% → 1–4.

## Exact topic inventory

The effective Fall 2025 CED contains 53 topics: 15 in U1, 12 in U2, 9 in U3, and 17 in U4. The exact codes/titles are stored in `data/ap-computer-science-a.js` and will be asserted by the subject-specific release test.

## Development gates still required

- Populate a comfortably oversized original/synthetic bank with full 53/53 topic coverage.
- Add realistic optional two-question code/stimulus sets without splitting groups.
- Independently recompute every code trace/output and verify Java semantics against the CED/Java Quick Reference.
- Add subject-specific topic/practice/unit/set tests.
- Run generic 5,000-draw / 5,000-overlap release audit.
- Run fresh clean-room semantic review; repair and restart until zero findings.
- Run naive/preflight audit.
- Only then promote `releaseStatus` from `draft` to `released`.
