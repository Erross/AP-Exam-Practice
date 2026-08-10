// AP Exam Practice — generic exam engine
// Subject-agnostic: every function here reads its parameters from the selected
// subject's config (js/subjects.js) and its question bank (data/<id>.js), never
// from hardcoded constants.
//
// Pure draw/shuffle logic lives in js/draw.js so it can be unit-tested in Node.
// Everything in this file is DOM wiring.
//
// Two rules this file is deliberately strict about:
//   1. Nothing is ever written to the DOM with innerHTML. All text goes in via
//      textContent, so user-supplied strings (the catalog search box) and bank
//      content can never be parsed as markup.
//   2. Nothing about the exam is subject-specific.

const STORAGE_KEY = "ap-exam-practice:in-progress:v1";

const state = {
  subject: null,       // the AP_SUBJECTS entry currently selected
  questions: [],        // questions drawn for this attempt (options already shuffled)
  answers: {},           // questionIndex -> selected option index
  struckOut: {},          // questionIndex -> Set of struck-out option indices
  flagged: new Set(),      // questionIndex set
  current: 0,
  timerId: null,
  endsAt: null,             // wall-clock ms timestamp the attempt expires at
};

// ---------- Small DOM helpers (textContent only, never innerHTML) ----------

function el(tag, options = {}, children = []) {
  const node = document.createElement(tag);
  if (options.className) node.className = options.className;
  if (options.text !== undefined) node.textContent = options.text;
  if (options.attrs) {
    Object.entries(options.attrs).forEach(([k, v]) => {
      if (v === null || v === undefined || v === false) return;
      node.setAttribute(k, String(v));
    });
  }
  if (options.props) Object.assign(node, options.props);
  (Array.isArray(children) ? children : [children]).forEach((child) => {
    if (child) node.appendChild(child);
  });
  return node;
}

function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

function srOnly(text) {
  return el("span", { className: "visually-hidden", text });
}

function formatClock(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];

// ---------- Subject / bank access ----------

function getQuestionBank(subject) {
  // data/<id>.js defines a global like QUESTIONS_AP_BIOLOGY; subjects.js records
  // that variable's name in dataVar so this stays generic.
  return window[subject.dataVar] || [];
}

/**
 * A subject is playable only when it has been explicitly marked released AND its
 * bank actually has questions. Bank length alone is NOT sufficient — that was the
 * old behaviour, and it meant the first work-in-progress question pushed into any
 * bank would silently publish that subject to every visitor.
 */
function subjectIsPlayable(subject) {
  return subject.releaseStatus === "released" && getQuestionBank(subject).length > 0;
}

function findSubjectById(id) {
  return AP_SUBJECTS.find((s) => s.id === id) || null;
}

// ---------- Screen management ----------

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((elm) => elm.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ---------- Catalog (splash) screen ----------

function renderCatalog(filterText = "") {
  const container = document.getElementById("catalog-categories");
  clear(container);
  const q = filterText.trim().toLowerCase();
  let rendered = 0;

  AP_CATEGORIES.forEach((category) => {
    const subjectsInCategory = AP_SUBJECTS.filter(
      (s) => s.category === category && (q === "" || s.name.toLowerCase().includes(q))
    );
    if (subjectsInCategory.length === 0) return;

    const section = el("section", { className: "category-section" }, [
      el("h2", { text: category }),
    ]);
    const grid = el("div", { className: "subject-grid" });
    subjectsInCategory.forEach((subject) => {
      grid.appendChild(renderSubjectCard(subject));
      rendered++;
    });
    section.appendChild(grid);
    container.appendChild(section);
  });

  if (rendered === 0) {
    // textContent, not innerHTML — filterText is user input.
    container.appendChild(
      el("p", { className: "empty-state", text: `No subjects match "${filterText}".` })
    );
  }
}

function subjectStatusLabel(subject) {
  if (subjectIsPlayable(subject)) return "Start practice exam";
  if (subject.releaseStatus !== "released" && getQuestionBank(subject).length > 0) {
    return "In development — not yet released";
  }
  return "Content coming soon";
}

function renderSubjectCard(subject) {
  const playable = subjectIsPlayable(subject);
  const card = el("button", {
    className: "subject-card" + (playable ? "" : " disabled"),
    attrs: { type: "button", "aria-disabled": playable ? null : "true" },
    props: { disabled: !playable },
  });

  const timingLabel =
    subject.mcqCount && subject.mcqTimeMinutes
      ? `${subject.mcqCount} MCQs · ${subject.mcqTimeMinutes} min`
      : "Format TBD";

  card.appendChild(el("h3", { text: subject.name }));
  card.appendChild(el("p", { className: "subject-timing", text: timingLabel }));
  card.appendChild(
    el("p", { className: "subject-total", text: `Full exam: ${subject.totalExamTimeLabel}` })
  );

  if (subject.tierNote) {
    card.appendChild(el("p", { className: "tier-note", text: subject.tierNote }));
  }
  if (subject.formatVerified === false) {
    card.appendChild(
      el("p", {
        className: "tier-note unverified-note",
        text: "Format not yet verified for the current exam cycle — treat these numbers as provisional.",
      })
    );
  }

  card.appendChild(el("p", { className: "subject-status", text: subjectStatusLabel(subject) }));

  if (playable) {
    card.addEventListener("click", () => startExam(subject));
  }
  return card;
}

// ---------- Exam session ----------

function startExam(subject) {
  const bank = getQuestionBank(subject);

  state.subject = subject;
  // Blueprint-weighted draw (see js/draw.js) — per-unit counts are fixed by
  // Hamilton apportionment of subject.units[].examWeight before any sampling.
  state.questions = drawExam(subject, bank).map((question) => {
    const { o, c } = shuffleQuestionOptions(question);
    return { ...question, o, c };
  });
  state.answers = {};
  state.struckOut = {};
  state.flagged = new Set();
  state.current = 0;
  state.endsAt = Date.now() + (subject.mcqTimeMinutes || 0) * 60 * 1000;

  enterExamScreen();
  persistSession();
}

function enterExamScreen() {
  document.getElementById("exam-subject-name").textContent = state.subject.name;
  buildNavigator();
  renderQuestion({ focus: "heading" });
  startTimer();
  showScreen("screen-exam");
  // Focus has to move off the (now hidden) catalog card that launched the exam.
  focusQuestionHeading();
}

function focusQuestionHeading() {
  const heading = document.getElementById("question-position");
  if (heading) heading.focus();
}

// ---------- Timer (wall-clock based) ----------

function secondsRemaining() {
  if (!state.endsAt) return 0;
  return Math.max(0, Math.ceil((state.endsAt - Date.now()) / 1000));
}

function startTimer() {
  clearInterval(state.timerId);
  updateTimerDisplay();
  // Recompute from Date.now() every tick rather than decrementing a counter, so a
  // throttled/backgrounded tab can't hand the student extra time.
  state.timerId = setInterval(() => {
    updateTimerDisplay();
    if (secondsRemaining() <= 0) {
      clearInterval(state.timerId);
      submitExam();
    }
  }, 500);
}

function updateTimerDisplay() {
  const elm = document.getElementById("timer");
  const remaining = secondsRemaining();
  elm.textContent = formatClock(remaining);
  elm.classList.toggle("timer-amber", remaining <= 600 && remaining > 120);
  elm.classList.toggle("timer-red", remaining <= 120);
}

// ---------- Navigator ----------

function buildNavigator() {
  const nav = document.getElementById("navigator-grid");
  clear(nav);
  state.questions.forEach((_, i) => {
    const btn = el("button", {
      className: "nav-item",
      text: String(i + 1),
      attrs: { type: "button" },
    });
    btn.addEventListener("click", () => {
      state.current = i;
      renderQuestion();
      persistSession();
    });
    nav.appendChild(btn);
  });
  refreshNavigatorState();
}

function refreshNavigatorState() {
  const items = document.querySelectorAll("#navigator-grid .nav-item");
  items.forEach((item, i) => {
    const isCurrent = i === state.current;
    const isAnswered = state.answers[i] !== undefined;
    const isFlagged = state.flagged.has(i);

    item.classList.toggle("current", isCurrent);
    item.classList.toggle("answered", isAnswered);
    item.classList.toggle("flagged", isFlagged);

    // Same information as the CSS classes, exposed to assistive tech.
    if (isCurrent) item.setAttribute("aria-current", "true");
    else item.removeAttribute("aria-current");

    const states = [];
    if (isAnswered) states.push("answered");
    else states.push("not answered");
    if (isFlagged) states.push("flagged for review");
    if (isCurrent) states.push("current question");
    item.setAttribute("aria-label", `Question ${i + 1}, ${states.join(", ")}`);
  });
}

// ---------- Stimulus rendering ----------

/**
 * Map stimulusGroupId -> { first, last } positions in the delivered exam, so a
 * shared source can be introduced once with "Questions 12-14 refer to..." rather
 * than being presented as if it belonged to a single item.
 */
function stimulusGroupRanges() {
  const ranges = {};
  state.questions.forEach((q, i) => {
    const gid = q.stimulusGroupId;
    if (!gid) return;
    if (!ranges[gid]) ranges[gid] = { first: i, last: i };
    else ranges[gid].last = i;
  });
  return ranges;
}

function renderStimulus(question, index, ranges) {
  const stim = question.stimulus;
  if (!question.stimulusGroupId || !stim) return null;

  const range = ranges[question.stimulusGroupId] || { first: index, last: index };
  const label =
    range.first === range.last
      ? `Question ${range.first + 1} refers to the source below.`
      : `Questions ${range.first + 1}–${range.last + 1} refer to the source below.`;

  const wrap = el("figure", {
    className: `stimulus stimulus-${stim.type || "text"}`,
    attrs: { "aria-labelledby": "stimulus-caption" },
  });
  wrap.appendChild(
    el("figcaption", { className: "stimulus-lead", text: label, attrs: { id: "stimulus-caption" } })
  );
  if (stim.title) wrap.appendChild(el("p", { className: "stimulus-title", text: stim.title }));

  if (stim.type === "quantitative") {
    wrap.appendChild(renderStimulusTable(stim));
  } else if (stim.type === "visual") {
    wrap.appendChild(
      el("p", { className: "stimulus-kind", text: "Described visual source" })
    );
    wrap.appendChild(
      el("p", { className: "stimulus-body", text: stim.description || stim.text || "" })
    );
  } else {
    // "text" (secondary/qualitative excerpt) and "document" (required foundational
    // document excerpt) render the same way; the kind line distinguishes them.
    wrap.appendChild(
      el("p", {
        className: "stimulus-kind",
        text: stim.type === "document" ? "Foundational document excerpt" : "Text excerpt",
      })
    );
    wrap.appendChild(el("blockquote", { className: "stimulus-body", text: stim.text || "" }));
  }

  if (stim.source) {
    wrap.appendChild(el("p", { className: "stimulus-source", text: `— ${stim.source}` }));
  }
  return wrap;
}

function renderStimulusTable(stim) {
  const table = el("table", { className: "stimulus-table" });
  const thead = el("thead");
  const headRow = el("tr");
  const columns = stim.columns || [stim.labelHeader || "Category", stim.valueHeader || "Value"];
  columns.forEach((c) => headRow.appendChild(el("th", { text: String(c), attrs: { scope: "col" } })));
  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = el("tbody");
  const rows = stim.rows || (stim.data || []).map((d) => [d.label, d.value]);
  rows.forEach((r) => {
    const tr = el("tr");
    r.forEach((cell, ci) => {
      tr.appendChild(
        ci === 0
          ? el("th", { text: String(cell), attrs: { scope: "row" } })
          : el("td", { text: String(cell) })
      );
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  return table;
}

// ---------- Question rendering ----------

function renderQuestion(opts = {}) {
  const q = state.questions[state.current];
  const container = document.getElementById("question-body");
  clear(container);

  document.getElementById("question-position").textContent =
    `Question ${state.current + 1} of ${state.questions.length}`;

  const struck = state.struckOut[state.current] || new Set();
  const selected = state.answers[state.current];

  const stimulusNode = renderStimulus(q, state.current, stimulusGroupRanges());
  if (stimulusNode) container.appendChild(stimulusNode);

  container.appendChild(el("p", { className: "question-text", text: q.q }));

  const fieldset = el("fieldset", { className: "options" });
  fieldset.appendChild(
    el("legend", {
      className: "visually-hidden",
      text: `Answer options for question ${state.current + 1}`,
    })
  );

  q.o.forEach((opt, i) => {
    const isStruck = struck.has(i);
    const row = el("div", { className: "option" + (isStruck ? " struck" : "") });

    const input = el("input", {
      attrs: {
        type: "radio",
        name: "option",
        value: String(i),
        id: `option-${i}`,
      },
      props: { checked: selected === i },
    });
    const label = el("label", { attrs: { for: `option-${i}` } }, [
      el("span", { className: "option-letter", text: `${OPTION_LETTERS[i] || i + 1}.` }),
      el("span", { className: "option-text", text: opt }),
    ]);
    if (isStruck) label.appendChild(srOnly(" (crossed out)"));

    const strikeBtn = el("button", {
      className: "strike-btn",
      text: "✕",
      attrs: {
        type: "button",
        "data-index": String(i),
        "aria-pressed": isStruck ? "true" : "false",
        "aria-label": `${isStruck ? "Undo cross out of" : "Cross out"} option ${OPTION_LETTERS[i] || i + 1}`,
        title: isStruck ? "Undo strike out" : "Strike out",
      },
    });
    strikeBtn.addEventListener("click", () => toggleStrike(i));

    row.appendChild(input);
    row.appendChild(label);
    row.appendChild(strikeBtn);
    fieldset.appendChild(row);
  });

  container.appendChild(fieldset);

  container.querySelectorAll('input[name="option"]').forEach((input) => {
    input.addEventListener("change", () => recordAnswer());
  });

  const flagBtn = document.getElementById("flag-btn");
  const isFlagged = state.flagged.has(state.current);
  flagBtn.classList.toggle("active", isFlagged);
  flagBtn.setAttribute("aria-pressed", isFlagged ? "true" : "false");

  updateNavButtons();
  refreshNavigatorState();

  // Focus restoration — never let a re-render drop focus onto <body>.
  if (opts.focus === "heading") {
    focusQuestionHeading();
  } else if (typeof opts.focusStrike === "number") {
    const btn = container.querySelector(`.strike-btn[data-index="${opts.focusStrike}"]`);
    if (btn) btn.focus();
    else focusQuestionHeading();
  }
}

function updateNavButtons() {
  const prev = document.getElementById("prev-btn");
  const next = document.getElementById("next-btn");
  prev.disabled = state.current === 0;
  next.disabled = state.current >= state.questions.length - 1;
}

function recordAnswer() {
  const checked = document.querySelector('input[name="option"]:checked');
  if (checked) state.answers[state.current] = Number(checked.value);
  else delete state.answers[state.current];
  refreshNavigatorState();
  persistSession();
}

function toggleStrike(index) {
  const set = state.struckOut[state.current] || new Set();
  if (set.has(index)) set.delete(index);
  else set.add(index);
  state.struckOut[state.current] = set;
  // Re-render replaces the strike button, so explicitly put focus back on it.
  renderQuestion({ focusStrike: index });
  persistSession();
}

function toggleFlag() {
  if (state.flagged.has(state.current)) state.flagged.delete(state.current);
  else state.flagged.add(state.current);
  const flagBtn = document.getElementById("flag-btn");
  const isFlagged = state.flagged.has(state.current);
  flagBtn.classList.toggle("active", isFlagged);
  flagBtn.setAttribute("aria-pressed", isFlagged ? "true" : "false");
  refreshNavigatorState();
  persistSession();
}

function goToQuestion(delta) {
  const next = state.current + delta;
  if (next < 0 || next >= state.questions.length) return;
  state.current = next;
  renderQuestion();
  persistSession();
  // If the button we just used became disabled at the boundary, focus would fall
  // to <body>; move it somewhere meaningful instead.
  const active = document.activeElement;
  if (!active || active === document.body || active.disabled) focusQuestionHeading();
}

// ---------- Session persistence (sessionStorage) ----------

function persistSession() {
  if (!state.subject || !state.endsAt) return;
  try {
    const payload = {
      v: 1,
      subjectId: state.subject.id,
      endsAt: state.endsAt,
      current: state.current,
      questions: state.questions,
      answers: state.answers,
      flagged: [...state.flagged],
      struckOut: Object.fromEntries(
        Object.entries(state.struckOut).map(([k, v]) => [k, [...v]])
      ),
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    // Storage disabled or full — the exam still works, it just won't survive a reload.
  }
}

function clearSession() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    /* ignore */
  }
}

function restoreSession() {
  let raw = null;
  try {
    raw = sessionStorage.getItem(STORAGE_KEY);
  } catch (err) {
    return false;
  }
  if (!raw) return false;

  let saved;
  try {
    saved = JSON.parse(raw);
  } catch (err) {
    clearSession();
    return false;
  }

  const subject = saved && saved.subjectId ? findSubjectById(saved.subjectId) : null;
  const usable =
    saved &&
    saved.v === 1 &&
    subject &&
    subjectIsPlayable(subject) &&
    Array.isArray(saved.questions) &&
    saved.questions.length > 0 &&
    typeof saved.endsAt === "number" &&
    saved.endsAt > Date.now();

  if (!usable) {
    clearSession();
    return false;
  }

  state.subject = subject;
  state.questions = saved.questions;
  state.answers = saved.answers || {};
  state.flagged = new Set(saved.flagged || []);
  state.struckOut = Object.fromEntries(
    Object.entries(saved.struckOut || {}).map(([k, v]) => [k, new Set(v)])
  );
  state.current = Math.min(saved.current || 0, state.questions.length - 1);
  state.endsAt = saved.endsAt;

  enterExamScreen();
  const banner = document.getElementById("resume-banner");
  if (banner) banner.hidden = false;
  return true;
}

// ---------- Scoring & results ----------

function isAnswerCorrect(q, given) {
  const givenSet = new Set(Array.isArray(given) ? given : given !== undefined ? [given] : []);
  const correctSet = new Set(q.c);
  return givenSet.size === correctSet.size && [...givenSet].every((v) => correctSet.has(v));
}

function submitExam() {
  clearInterval(state.timerId);
  clearSession();

  let correct = 0;
  const perUnit = {}; // unitId -> { correct, total }

  state.questions.forEach((q, i) => {
    const ok = isAnswerCorrect(q, state.answers[i]);
    if (ok) correct++;
    const unitId = q.unit || "unassigned";
    perUnit[unitId] = perUnit[unitId] || { correct: 0, total: 0 };
    perUnit[unitId].total++;
    if (ok) perUnit[unitId].correct++;
  });

  renderResults(correct, state.questions.length, perUnit);
  showScreen("screen-results");
  const heading = document.getElementById("results-subject-name");
  if (heading) heading.focus();
}

function renderResults(correct, total, perUnit) {
  const pct = total === 0 ? 0 : Math.round((correct / total) * 100);
  document.getElementById("results-subject-name").textContent = state.subject.name;
  document.getElementById("results-score").textContent = `${correct} / ${total} (${pct}%)`;
  document.getElementById("results-scope-note").textContent =
    "Score reflects the multiple-choice section only — this app doesn't grade free-response, and it does not produce an official AP 1–5 score.";

  const table = document.getElementById("results-unit-table");
  clear(table);
  Object.entries(perUnit).forEach(([unitId, { correct: c, total: t }]) => {
    const unitConfig = (state.subject.units || []).find((u) => u.id === unitId);
    const label = unitConfig ? `${unitId}: ${unitConfig.name}` : unitId;
    table.appendChild(
      el("tr", {}, [el("td", { text: label }), el("td", { text: `${c} / ${t}` })])
    );
  });

  const review = document.getElementById("results-review");
  clear(review);
  state.questions.forEach((q, i) => {
    const given = state.answers[i];
    const givenSet = new Set(Array.isArray(given) ? given : given !== undefined ? [given] : []);
    const ok = isAnswerCorrect(q, given);

    const item = el("details", { className: "review-item " + (ok ? "correct" : "incorrect") });
    item.appendChild(el("summary", { text: `Q${i + 1}. ${q.q}` }));
    if (q.stimulus && (q.stimulus.title || q.stimulus.text || q.stimulus.description)) {
      item.appendChild(
        el("p", {
          className: "review-stimulus",
          text: `Source: ${q.stimulus.title || q.stimulus.source || q.stimulus.type}`,
        })
      );
    }
    item.appendChild(
      el("p", {
        text: `Your answer: ${[...givenSet].map((idx) => q.o[idx]).join(", ") || "(none)"}`,
      })
    );
    item.appendChild(
      el("p", { text: `Correct answer: ${q.c.map((idx) => q.o[idx]).join(", ")}` })
    );
    item.appendChild(el("p", { className: "rationale", text: q.e || "" }));
    if (q.topic) item.appendChild(el("p", { className: "review-topic", text: `Topic: ${q.topic}` }));
    review.appendChild(item);
  });
}

function backToCatalog() {
  clearInterval(state.timerId);
  clearSession();
  state.subject = null;
  state.questions = [];
  state.endsAt = null;
  const banner = document.getElementById("resume-banner");
  if (banner) banner.hidden = true;
  showScreen("screen-catalog");
  const search = document.getElementById("catalog-search");
  if (search) search.focus();
}

// ---------- Wire up static controls ----------

document.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  document
    .getElementById("catalog-search")
    .addEventListener("input", (e) => renderCatalog(e.target.value));
  document.getElementById("prev-btn").addEventListener("click", () => goToQuestion(-1));
  document.getElementById("next-btn").addEventListener("click", () => goToQuestion(1));
  document.getElementById("flag-btn").addEventListener("click", toggleFlag);
  document.getElementById("submit-btn").addEventListener("click", () => {
    if (confirm("Submit exam? You can't change answers after this.")) submitExam();
  });
  document.getElementById("results-back-btn").addEventListener("click", backToCatalog);
  document.getElementById("exam-back-btn").addEventListener("click", () => {
    if (confirm("Leave this exam? Your progress will be lost.")) backToCatalog();
  });

  // Pick an interrupted attempt back up after a refresh / accidental navigation.
  restoreSession();
});
