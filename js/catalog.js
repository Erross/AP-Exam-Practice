// Catalog presentation helper: released courses first, drafts collapsed, a
// stronger first-visit value proposition, and a confirmation screen before the
// timed exam begins.
(function () {
  "use strict";

  let selectedSubject = null;
  let beginExam = null;

  function updateHeroCopy() {
    const heading = document.querySelector(".site-header h1");
    const tagline = document.querySelector(".site-header .tagline");
    if (heading) heading.textContent = "Practice AP exams in the format you’ll actually see.";
    if (tagline) {
      tagline.textContent = "Full-length Section I practice built around current AP formats, unit weighting, skills, and stimulus sets. Free, original questions — no account required. Saves locally in your browser.";
    }
  }

  function organizeCatalog() {
    const container = document.getElementById("catalog-categories");
    if (!container) return;
    const old = container.querySelector(".development-catalog");
    if (old) old.remove();

    const drafts = [];
    Array.from(container.querySelectorAll(":scope > .category-section")).forEach((section) => {
      const cards = Array.from(section.querySelectorAll(".subject-card"));
      cards.filter((card) => card.disabled).forEach((card) => drafts.push(card));
      if (!cards.some((card) => !card.disabled)) section.remove();
    });
    if (!drafts.length) return;

    const details = document.createElement("details");
    details.className = "development-catalog category-section";
    const summary = document.createElement("summary");
    summary.textContent = `More AP courses in development (${drafts.length})`;
    details.appendChild(summary);
    const grid = document.createElement("div");
    grid.className = "subject-grid";
    drafts.forEach((card) => grid.appendChild(card));
    details.appendChild(grid);

    const search = document.getElementById("catalog-search");
    if (search && search.value.trim() && !container.querySelector(".subject-card:not(.disabled)")) {
      details.open = true;
    }
    container.appendChild(details);
  }

  function text(parent, tag, id, className, value) {
    const node = document.createElement(tag);
    if (id) node.id = id;
    if (className) node.className = className;
    node.textContent = value || "";
    parent.appendChild(node);
    return node;
  }

  function ensurePreflight() {
    if (document.getElementById("screen-preflight")) return;
    const screen = document.createElement("main");
    screen.id = "screen-preflight";
    screen.className = "screen";
    screen.setAttribute("aria-label", "Practice exam details");
    const panel = document.createElement("div");
    panel.className = "question-panel";
    screen.appendChild(panel);

    const heading = text(panel, "h2", "preflight-subject", "", "");
    heading.tabIndex = -1;
    text(panel, "p", "", "results-scope-note", "Timed Section I multiple-choice practice");
    text(panel, "p", "preflight-format", "question-text", "");
    text(panel, "p", "preflight-parts", "subject-timing", "");
    text(panel, "p", "preflight-calculator", "subject-timing", "");
    text(panel, "p", "preflight-full", "subject-total", "");
    text(panel, "p", "", "results-scope-note", "Your in-progress attempt is saved in this browser session. The timer starts only after you choose Start timed practice.");

    const controls = document.createElement("div");
    controls.className = "question-controls";
    panel.appendChild(controls);
    const back = text(controls, "button", "preflight-back", "", "← Back to subjects");
    back.type = "button";
    const start = text(controls, "button", "preflight-start", "", "Start timed practice →");
    start.type = "button";
    document.getElementById("main-content").appendChild(screen);

    back.addEventListener("click", () => {
      selectedSubject = null;
      showScreen("screen-catalog");
      const search = document.getElementById("catalog-search");
      if (search) search.focus();
    });
    start.addEventListener("click", () => {
      if (!selectedSubject || !beginExam) return;
      const subject = selectedSubject;
      selectedSubject = null;
      beginExam(subject);
    });
  }

  function showPreflight(subject) {
    ensurePreflight();
    selectedSubject = subject;
    document.getElementById("preflight-subject").textContent = subject.name;
    document.getElementById("preflight-format").textContent = `${subject.mcqCount} multiple-choice questions · ${subject.mcqTimeMinutes} minutes`;
    document.getElementById("preflight-full").textContent = `Official full AP exam duration: ${subject.totalExamTimeLabel}`;

    const parts = document.getElementById("preflight-parts");
    const partText = subject.examParts && Array.isArray(subject.examParts.parts)
      ? subject.examParts.parts.map((part) => `${part.label}: ${part.timeMinutes} min`).join(" · ")
      : "";
    parts.textContent = partText;
    parts.hidden = !partText;

    const calculator = document.getElementById("preflight-calculator");
    const calculatorText = subject.calculatorExpected === true
      ? "Calculator expected/permitted throughout this practice section."
      : (partText && /calculator/i.test(partText) ? "Calculator rules change by part; see the timed-part details above." : "");
    calculator.textContent = calculatorText;
    calculator.hidden = !calculatorText;

    showScreen("screen-preflight");
    document.getElementById("preflight-subject").focus();
  }

  document.addEventListener("DOMContentLoaded", () => {
    updateHeroCopy();
    ensurePreflight();
    queueMicrotask(organizeCatalog);
    const search = document.getElementById("catalog-search");
    if (search) search.addEventListener("input", () => queueMicrotask(organizeCatalog));

    beginExam = window.startExam;
    window.startExam = showPreflight;
  });
})();
