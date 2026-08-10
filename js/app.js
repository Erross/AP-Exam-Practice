// AP Exam Practice — generic exam engine
// Subject-agnostic: every function here reads its parameters from the
// selected subject's config (js/subjects.js) and its question bank
// (data/<id>.js), never from hardcoded constants. This is the piece that
// was a single hardcoded exam in the CCDV-F reference app and is now
// driven by whichever subject the user picks on the catalog screen.

const state = {
  subject: null,       // the AP_SUBJECTS entry currently selected
  questions: [],        // shuffled subset drawn for this attempt
  answers: {},           // questionIndex -> selected option index/indices
  struckOut: {},          // questionIndex -> Set of struck-out option indices
  flagged: new Set(),      // questionIndex set
  current: 0,
  timerId: null,
  secondsRemaining: 0,
  examStartedAt: null,
};

// ---------- Utilities ----------

function shuffle(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatClock(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function getQuestionBank(subject) {
  // data/<id>.js defines a global like QUESTIONS_AP_BIOLOGY; subjects.js
  // records that variable's name in dataVar so this stays generic.
  return window[subject.dataVar] || [];
}

function subjectHasContent(subject) {
  return getQuestionBank(subject).length > 0;
}

// ---------- Screen management ----------

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((el) => el.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ---------- Catalog (splash) screen ----------

function renderCatalog(filterText = "") {
  const container = document.getElementById("catalog-categories");
  container.innerHTML = "";
  const q = filterText.trim().toLowerCase();

  AP_CATEGORIES.forEach((category) => {
    const subjectsInCategory = AP_SUBJECTS.filter(
      (s) => s.category === category && (q === "" || s.name.toLowerCase().includes(q))
    );
    if (subjectsInCategory.length === 0) return;

    const section = document.createElement("section");
    section.className = "category-section";

    const heading = document.createElement("h2");
    heading.textContent = category;
    section.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "subject-grid";

    subjectsInCategory.forEach((subject) => {
      grid.appendChild(renderSubjectCard(subject));
    });

    section.appendChild(grid);
    container.appendChild(section);
  });

  if (container.innerHTML === "") {
    container.innerHTML = `<p class="empty-state">No subjects match "${filterText}".</p>`;
  }
}

function renderSubjectCard(subject) {
  const hasContent = subjectHasContent(subject);
  const card = document.createElement("button");
  card.className = "subject-card" + (hasContent ? "" : " disabled");
  card.type = "button";
  card.disabled = !hasContent;

  const timingLabel =
    subject.mcqCount && subject.mcqTimeMinutes
      ? `${subject.mcqCount} MCQs · ${subject.mcqTimeMinutes} min`
      : "Format TBD";

  card.innerHTML = `
    <h3>${subject.name}</h3>
    <p class="subject-timing">${timingLabel}</p>
    <p class="subject-total">Full exam: ${subject.totalExamTimeLabel}</p>
    ${subject.tier === 2 ? `<p class="tier-note">${subject.tierNote}</p>` : ""}
    <p class="subject-status">${hasContent ? "Start practice exam" : "Content coming soon"}</p>
  `;

  if (hasContent) {
    card.addEventListener("click", () => startExam(subject));
  }
  return card;
}

// ---------- Exam session ----------

function startExam(subject) {
  const bank = getQuestionBank(subject);
  const drawCount = Math.min(subject.mcqCount || bank.length, bank.length);

  state.subject = subject;
  state.questions = shuffle(bank)
    .slice(0, drawCount)
    .map((question) => {
      const { o, c } = shuffleQuestionOptions(question);
      return { ...question, o, c };
    });
  state.answers = {};
  state.struckOut = {};
  state.flagged = new Set();
  state.current = 0;
  state.examStartedAt = Date.now();
  state.secondsRemaining = (subject.mcqTimeMinutes || 0) * 60;

  document.getElementById("exam-subject-name").textContent = subject.name;
  buildNavigator();
  renderQuestion();
  startTimer();
  showScreen("screen-exam");
}

function shuffleQuestionOptions(question) {
  // Returns a new { o, c } pair with option order shuffled and the
  // correct-answer index/indices remapped to match, so question order AND
  // option order both vary between attempts, same as the CCDV-F reference
  // app. Pure function (does not mutate `question`) — this file used to
  // mutate in place and got mixed up with object-spread evaluation order in
  // the caller, which silently desynced `o` from `c`.
  const order = shuffle(question.o.map((_, i) => i));
  const o = order.map((i) => question.o[i]);
  const correctSet = new Set(question.c);
  const c = order
    .map((originalIndex, newIndex) => (correctSet.has(originalIndex) ? newIndex : null))
    .filter((v) => v !== null);
  return { o, c };
}

function startTimer() {
  clearInterval(state.timerId);
  updateTimerDisplay();
  state.timerId = setInterval(() => {
    state.secondsRemaining--;
    updateTimerDisplay();
    if (state.secondsRemaining <= 0) {
      clearInterval(state.timerId);
      submitExam();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const el = document.getElementById("timer");
  el.textContent = formatClock(Math.max(0, state.secondsRemaining));
  el.classList.toggle("timer-amber", state.secondsRemaining <= 600 && state.secondsRemaining > 120);
  el.classList.toggle("timer-red", state.secondsRemaining <= 120);
}

function buildNavigator() {
  const nav = document.getElementById("navigator-grid");
  nav.innerHTML = "";
  state.questions.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "nav-item";
    btn.textContent = i + 1;
    btn.addEventListener("click", () => {
      state.current = i;
      renderQuestion();
    });
    nav.appendChild(btn);
  });
  refreshNavigatorState();
}

function refreshNavigatorState() {
  const items = document.querySelectorAll("#navigator-grid .nav-item");
  items.forEach((item, i) => {
    item.classList.toggle("current", i === state.current);
    item.classList.toggle("answered", state.answers[i] !== undefined);
    item.classList.toggle("flagged", state.flagged.has(i));
  });
}

function renderQuestion() {
  const q = state.questions[state.current];
  const container = document.getElementById("question-body");
  document.getElementById("question-position").textContent =
    `Question ${state.current + 1} of ${state.questions.length}`;

  const struck = state.struckOut[state.current] || new Set();
  const selected = state.answers[state.current];
  const selectedSet = new Set(Array.isArray(selected) ? selected : selected !== undefined ? [selected] : []);
  const inputType = q.type === "m" ? "checkbox" : "radio";

  container.innerHTML = `
    <p class="question-text">${q.q}</p>
    <div class="options">
      ${q.o
        .map(
          (opt, i) => `
        <div class="option ${struck.has(i) ? "struck" : ""}">
          <label>
            <input type="${inputType}" name="option" value="${i}" ${selectedSet.has(i) ? "checked" : ""} />
            <span>${opt}</span>
          </label>
          <button type="button" class="strike-btn" data-index="${i}" title="Strike out">✕</button>
        </div>
      `
        )
        .join("")}
    </div>
  `;

  container.querySelectorAll('input[name="option"]').forEach((input) => {
    input.addEventListener("change", () => recordAnswer(q));
  });
  container.querySelectorAll(".strike-btn").forEach((btn) => {
    btn.addEventListener("click", () => toggleStrike(Number(btn.dataset.index)));
  });

  document.getElementById("flag-btn").classList.toggle("active", state.flagged.has(state.current));
  refreshNavigatorState();
}

function recordAnswer(question) {
  const inputs = document.querySelectorAll('input[name="option"]:checked');
  const values = Array.from(inputs).map((el) => Number(el.value));
  state.answers[state.current] = question.type === "m" ? values : values[0];
  refreshNavigatorState();
}

function toggleStrike(index) {
  const set = state.struckOut[state.current] || new Set();
  set.has(index) ? set.delete(index) : set.add(index);
  state.struckOut[state.current] = set;
  renderQuestion();
}

function toggleFlag() {
  state.flagged.has(state.current) ? state.flagged.delete(state.current) : state.flagged.add(state.current);
  renderQuestion();
}

function goToQuestion(delta) {
  const next = state.current + delta;
  if (next < 0 || next >= state.questions.length) return;
  state.current = next;
  renderQuestion();
}

// ---------- Scoring & results ----------

function submitExam() {
  clearInterval(state.timerId);

  let correct = 0;
  const perUnit = {}; // unitId -> { correct, total }

  state.questions.forEach((q, i) => {
    const given = state.answers[i];
    const givenSet = new Set(Array.isArray(given) ? given : given !== undefined ? [given] : []);
    const correctSet = new Set(q.c);
    const isCorrect =
      givenSet.size === correctSet.size && [...givenSet].every((v) => correctSet.has(v));
    if (isCorrect) correct++;

    const unitId = q.unit || "unassigned";
    perUnit[unitId] = perUnit[unitId] || { correct: 0, total: 0 };
    perUnit[unitId].total++;
    if (isCorrect) perUnit[unitId].correct++;
  });

  renderResults(correct, state.questions.length, perUnit);
  showScreen("screen-results");
}

function renderResults(correct, total, perUnit) {
  const pct = total === 0 ? 0 : Math.round((correct / total) * 100);
  document.getElementById("results-subject-name").textContent = state.subject.name;
  document.getElementById("results-score").textContent = `${correct} / ${total} (${pct}%)`;
  document.getElementById("results-scope-note").textContent =
    "Score reflects the multiple-choice section only — this app doesn't grade free-response.";

  const table = document.getElementById("results-unit-table");
  table.innerHTML = "";
  Object.entries(perUnit).forEach(([unitId, { correct: c, total: t }]) => {
    const unitConfig = (state.subject.units || []).find((u) => u.id === unitId);
    const label = unitConfig ? `${unitId}: ${unitConfig.name}` : unitId;
    const row = document.createElement("tr");
    row.innerHTML = `<td>${label}</td><td>${c} / ${t}</td>`;
    table.appendChild(row);
  });

  const review = document.getElementById("results-review");
  review.innerHTML = "";
  state.questions.forEach((q, i) => {
    const given = state.answers[i];
    const givenSet = new Set(Array.isArray(given) ? given : given !== undefined ? [given] : []);
    const correctSet = new Set(q.c);
    const isCorrect =
      givenSet.size === correctSet.size && [...givenSet].every((v) => correctSet.has(v));

    const item = document.createElement("details");
    item.className = "review-item " + (isCorrect ? "correct" : "incorrect");
    item.innerHTML = `
      <summary>Q${i + 1}. ${q.q}</summary>
      <p>Your answer: ${[...givenSet].map((idx) => q.o[idx]).join(", ") || "(none)"}</p>
      <p>Correct answer: ${[...correctSet].map((idx) => q.o[idx]).join(", ")}</p>
      <p class="rationale">${q.e || ""}</p>
    `;
    review.appendChild(item);
  });
}

function backToCatalog() {
  clearInterval(state.timerId);
  state.subject = null;
  showScreen("screen-catalog");
}

// ---------- Wire up static controls ----------

document.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  document.getElementById("catalog-search").addEventListener("input", (e) => renderCatalog(e.target.value));
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
});
