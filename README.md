# AP Exam Practice

A free, timed, unofficial multiple-choice practice-exam app covering every standard AP subject. Pure static HTML/CSS/JS — no build step, no backend, no accounts. Modeled on [Claude_CCDV_F_Practice](https://github.com/Erross/Claude_CCDV_F_Practice), generalized from one exam to a catalog of 37.

**This is the framework only.** Every subject's question bank in `data/` is currently empty — the catalog shows all 37 subjects, but each stays disabled ("content coming soon") until its bank is populated. See `PLAN.md` for the full architecture and the plan for adding content subject by subject.

## What it does (once a subject has content)

Draws a fresh multiple-choice practice exam from that subject's question bank, timed to match the real exam's MCQ section length. Includes a question navigator grid, strikeout tool, flag-for-review, shuffled question/option order, and a results screen with a score and per-unit breakdown plus full answer review. This app grades the MCQ section only — it doesn't attempt FRQ grading.

## Running it

Nothing to install. Open `index.html` in a browser, or serve the folder with any static file server:

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying to GitHub Pages

This repo includes `.github/workflows/pages.yml`, which auto-builds and deploys on every push to `main`.

1. Push this folder to the root of your repo.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **"GitHub Actions"**.
4. Push to `main` (or run the workflow manually from the **Actions** tab).
5. Your site will be live at `https://erross.github.io/AP-Exam-Practice/` within a minute or two.

## File structure

```
├── index.html               # all three screens: catalog, exam, results
├── style.css                 # all styling
├── js/
│   ├── app.js                 # generic exam engine — timer, navigator, scoring, results
│   └── subjects.js             # registry of all 37 subject configs (metadata only)
├── data/
│   └── <subject-id>.js          # one file per subject — empty question array + schema doc
├── PLAN.md                    # full site plan: architecture, subject catalog, timing, roadmap
└── .github/workflows/pages.yml
```

## Adding questions for a subject

Open that subject's `data/<id>.js` file and push objects onto its array:

```js
{
  unit: "U1",                    // optional — for the per-unit results breakdown
  type: "s",                      // "s" = single-select, "m" = multi-select
  q: "Question text?",
  o: ["Option A", "Option B", "Option C", "Option D"],
  c: [1],                          // index/indices of the correct option(s)
  e: "One-line rationale shown on the results review page."
}
```

Once a subject's array has at least one question, its catalog card enables automatically — no other changes needed. `js/subjects.js` has each subject's target `mcqCount` (how many questions get drawn per attempt) and `mcqTimeMinutes` (the timer length), both pulled from the real exam's MCQ-section format — see `PLAN.md` for the full table and how it was derived.

## Accuracy notes

Subject MCQ counts and timings in `js/subjects.js` are a strong starting draft compiled from public exam-format guidance, not a scrape of the current-year AP Course and Exam Description. College Board does occasionally redesign a subject's format — verify against the current CED at apcentral.collegeboard.org before finalizing content for a given subject.

## License

MIT. Not affiliated with, endorsed by, or reviewed by College Board or the AP Program. "AP" and "Advanced Placement" are trademarks of the College Board.
