# AP Exam Practice — Site Plan (Goal 1: Framework)

Repo: `Erross/AP-Exam-Practice`
Reference implementation: `Erross/Claude_CCDV_F_Practice`

This plan covers the reusable framework only. No question content is included — every subject ships with an empty question bank so Goal 2 can fill each one in independently.

## 1. What we're reusing from CCDV-F

The CCDV-F app already solved the hard parts of a practice-exam engine: a countdown timer with amber/red warning states, a question navigator grid (answered / unanswered / flagged / current), a strikeout tool, flag-for-review, shuffled question and option order, a results screen with a scaled score and a per-domain breakdown, and a full answer review. All of that logic is exam-content-agnostic — it just needs to stop assuming there's exactly one exam and start reading its question count, timing, and domain weights from a config object instead of constants baked into `app.js`.

The one thing CCDV-F didn't need and this project does: a landing/catalog layer above the exam itself, since there are ~37 subjects instead of 1.

## 2. Site structure

Three top-level screens, same single-page pattern as CCDV-F (`index.html` with screens toggled by JS, no router/framework needed):

**Splash / Catalog** — lands here first. Shows all AP subjects grouped by College Board category (Arts, English, History & Social Sciences, Math & Computer Science, Sciences, World Languages & Cultures, Career Kickstart). Each subject is a card showing its name, MCQ question count, and MCQ time limit. Clicking a card with 0 questions loaded shows a "content coming soon" state instead of starting an exam — this is what makes it safe to ship all 37 subjects now with empty banks. A search/filter box narrows the catalog by name or category.

**Exam screen** — identical interaction model to CCDV-F: timer top-right (turns amber under 10 minutes, red under 2, auto-submits at zero), question navigator grid, strikeout tool, flag for review, single-select/multi-select rendering. The only change is that timer duration, question count, and domain weighting are pulled from that subject's config instead of hardcoded.

**Results screen** — score, per-unit/domain breakdown table (once a subject has weighted units defined), full answer review with rationale. Same as CCDV-F.

```
index.html      # all three screens
style.css       # shared styling + catalog grid
js/app.js        # generic engine: catalog render, timer, navigator, scoring, results
js/subjects.js    # registry of all subject configs (metadata only, no questions)
data/*.js         # one file per subject, empty question array + schema docstring
```

## 3. Scope decision: which subjects, and how

Per your call: standard MCQ+FRQ exams only, and this app only builds/times/scores the **multiple-choice section** (FRQs are real-exam content we're not attempting to grade). That excludes AP Art & Design (2-D, 3-D, Drawing — portfolio, no exam), AP Research and AP Seminar (performance tasks, no MCQ).

That leaves 37 subjects. Within those, two subjects have an MCQ section that depends on audio (Music Theory: sight-singing/aural; and the 7 non-Latin world languages: listening comprehension). The framework is agnostic to this — an audio question type will just need `audioUrl` on the question object later — but audio assets are out of scope for now, so those 8 are flagged `tier: 2` in the config and their catalog cards will note "listening component required" until that's built. The other 29 are `tier: 1`, pure text/image MCQ, fully buildable in Goal 2 with no further framework work.

## 4. Subject catalog with MCQ timing

MCQ-section-only figures below (the number this app will actually time). Total real exam time, including FRQs, is shown for reference. These are compiled from the current public exam format guidance and general knowledge of each course's structure — **treat as a strong starting draft, not gospel**. Before writing real questions for a subject in Goal 2, cross-check its numbers against that subject's current-year AP Course and Exam Description on apcentral.collegeboard.org, since College Board does occasionally redesign a subject's format (Psychology and Precalculus both changed in the last few years).

### Arts

| Subject | Tier | MCQ Qs | MCQ time | Total exam time |
|---|---|---|---|---|
| Art History | 1 | 28 | 80 min | 3h 0m |
| Music Theory | 2 (aural) | ~75 (incl. aural) | ~65 min | 2h 5m |

### English

| Subject | Tier | MCQ Qs | MCQ time | Total exam time |
|---|---|---|---|---|
| English Language and Composition | 1 | 45 | 60 min | 3h 15m |
| English Literature and Composition | 1 | 55 | 60 min | 3h 0m |

### History & Social Sciences

| Subject | Tier | MCQ Qs | MCQ time | Total exam time |
|---|---|---|---|---|
| African American Studies | 1 | 50 | 60 min | 2h 30m |
| Comparative Government and Politics | 1 | 55 | 60 min | 2h 30m |
| European History | 1 | 55 | 55 min | 3h 15m |
| Human Geography | 1 | 60 | 60 min | 2h 15m |
| Macroeconomics | 1 | 60 | 70 min | 2h 10m |
| Microeconomics | 1 | 60 | 70 min | 2h 10m |
| Psychology | 1 | 75 | 90 min | 2h 40m |
| United States Government and Politics | 1 | 55 | 80 min | 3h 0m |
| United States History | 1 | 55 | 55 min | 3h 15m |
| World History: Modern | 1 | 55 | 55 min | 3h 15m |

### Math & Computer Science

| Subject | Tier | MCQ Qs | MCQ time | Total exam time |
|---|---|---|---|---|
| Calculus AB | 1 | 45 | 105 min | 3h 15m |
| Calculus BC | 1 | 45 | 105 min | 3h 15m |
| Computer Science A | 1 | 40 | 90 min | 3h 0m |
| Computer Science Principles | 1 | 70 | 120 min | 2h 0m (MCQ is the whole exam; Create Task is separate coursework) |
| Precalculus | 1 | 40 | 80 min | 2h 0m |
| Statistics | 1 | 40 | 90 min | 3h 0m |

### Sciences

| Subject | Tier | MCQ Qs | MCQ time | Total exam time |
|---|---|---|---|---|
| Biology | 1 | 60 | 90 min | 3h 0m |
| Chemistry | 1 | 60 | 90 min | 3h 15m |
| Environmental Science | 1 | 80 | 90 min | 2h 40m |
| Physics 1: Algebra-Based | 1 | 50 | 80 min | 2h 50m |
| Physics 2: Algebra-Based | 1 | 50 | 90 min | 3h 0m |
| Physics C: Mechanics | 1 | 35 | 45 min | 1h 30m |
| Physics C: Electricity and Magnetism | 1 | 35 | 45 min | 1h 30m |

### World Languages & Cultures

| Subject | Tier | MCQ Qs | MCQ time | Total exam time |
|---|---|---|---|---|
| Chinese Language and Culture | 2 (listening) | ~65 | ~95 min | ~3h 0m |
| French Language and Culture | 2 (listening) | ~65 | ~95 min | ~3h 0m |
| German Language and Culture | 2 (listening) | ~65 | ~95 min | ~3h 0m |
| Italian Language and Culture | 2 (listening) | ~65 | ~95 min | ~3h 0m |
| Japanese Language and Culture | 2 (listening) | ~65 | ~95 min | ~3h 0m |
| Spanish Language and Culture | 2 (listening) | ~65 | ~95 min | ~3h 0m |
| Spanish Literature and Culture | 2 (listening) | ~65 | ~90 min | ~3h 40m |
| Latin | 1 (text-only) | 50 | 60 min | 3h 0m |

### Career Kickstart

| Subject | Tier | MCQ Qs | MCQ time | Total exam time |
|---|---|---|---|---|
| Business with Personal Finance | 1 | TBD | TBD | ~2h (new course — confirm format once published) |
| Cybersecurity | 1 | TBD | TBD | TBD (new course — confirm format once published) |

## 5. Subject config schema (`js/subjects.js`)

Every card on the splash page and every exam session reads from one object per subject. No question content lives here — just enough to render the catalog and drive the timer/navigator before Goal 2 fills in `data/*.js`.

```js
{
  id: "ap-biology",              // matches data/ap-biology.js
  name: "AP Biology",
  category: "Sciences",
  tier: 1,                       // 1 = text/image MCQ only, 2 = needs audio support
  mcqCount: 60,                  // questions drawn per practice attempt
  mcqTimeMinutes: 90,
  totalExamTimeLabel: "3h 0m",   // display only, includes FRQ portion we don't run
  units: [                       // optional; empty array until Goal 2 adds real weighting
    // { id: "U1", name: "Chemistry of Life", examWeight: 0.09 }
  ],
  status: "framework-only"       // flips to "content-ready" once data/*.js is populated
}
```

`data/ap-biology.js` (and the other 36 files) start as:

```js
// AP Biology — question bank
// Schema: { unit: "U1", type: "s"|"m", q: "...", o: [...], c: [0], e: "rationale" }
// type: "s" = single-select, "m" = multi-select (mirrors CCDV-F's questions.js format)
const AP_BIOLOGY_QUESTIONS = [];
```

`app.js` checks `AP_BIOLOGY_QUESTIONS.length === 0` and renders the catalog card as disabled/"coming soon" — so the whole 37-subject catalog can go live today without any subject being clickable yet, and each one flips on independently as content is added.

## 6. Engine changes needed vs. CCDV-F's `app.js`

Four changes turn the single-exam engine into a multi-subject one: read `mcqCount`/`mcqTimeMinutes` from the selected subject's config instead of hardcoded constants; make the weighted-domain draw fall back to a plain random sample when `units` is empty (every subject on day one); add the catalog screen (grid render, category grouping, disabled-state cards, search filter) as a new screen before the exam screen; and store the active subject's id through the session so results/review can label themselves correctly and a "back to catalog" link makes sense on the results screen.

Timer, navigator, strikeout, flagging, shuffling, scoring, and the review screen carry over structurally unchanged.

## 7. Deployment

Same GitHub Actions → GitHub Pages setup as CCDV-F (`.github/workflows/pages.yml`, deploy on push to `main`, Pages source set to "GitHub Actions"). Live URL will be `https://erross.github.io/AP-Exam-Practice/`.

## 8. What's explicitly out of scope for Goal 1

No question content for any subject. No FRQ typing/grading. No audio playback for the 8 tier-2 subjects. No accounts, persistence, or backend — everything is static and client-side, same as CCDV-F. No per-subject unit/domain weighting yet (the `units` array exists in the schema but stays empty until a subject's content is built).

## 9. Suggested order for Goal 2+

Content work should go subject by subject rather than all-at-once. A sensible first batch, picking one or two per category to prove the content pipeline before scaling to all 29 tier-1 subjects: Biology, Calculus AB, US History, Psychology, and English Language — high enrollment, and together they exercise every question style (data/graph-based, computational, source-based, passage-based).
