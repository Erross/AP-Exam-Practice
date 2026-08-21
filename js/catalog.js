// Catalog UX layer: production landing composition, released-first presentation,
// course-card hierarchy, scope grouping, and pre-exam confirmation.
(function () {
  "use strict";

  let selectedSubject = null;
  let beginExam = null;

  function text(parent, tag, id, className, value) {
    const node = document.createElement(tag);
    if (id) node.id = id;
    if (className) node.className = className;
    node.textContent = value || "";
    parent.appendChild(node);
    return node;
  }

  function subjectForCard(card) {
    const heading = card.querySelector("h3");
    if (!heading || !Array.isArray(AP_SUBJECTS)) return null;
    return AP_SUBJECTS.find((subject) => subject.name === heading.textContent) || null;
  }

  function releasedCourseCount() {
    return AP_SUBJECTS.filter((subject) => {
      const bank = window[subject.dataVar];
      return subject.releaseStatus === "released" && Array.isArray(bank) && bank.length > 0;
    }).length;
  }

  function ensureSiteMenu() {
    const header = document.querySelector(".site-header");
    if (!header || header.querySelector(".site-menu")) return;

    const details = document.createElement("details");
    details.className = "site-menu";
    const summary = document.createElement("summary");
    summary.setAttribute("aria-label", "Open site menu");
    const lines = document.createElement("span");
    lines.className = "hamburger-lines";
    lines.setAttribute("aria-hidden", "true");
    summary.appendChild(lines);
    const hiddenLabel = document.createElement("span");
    hiddenLabel.className = "visually-hidden";
    hiddenLabel.textContent = "Menu";
    summary.appendChild(hiddenLabel);
    details.appendChild(summary);

    const nav = document.createElement("nav");
    nav.setAttribute("aria-label", "Site navigation");
    [
      ["index.html", "Practice exams", true],
      ["about.html", "About", false],
      ["official-sources.html", "Official AP sources", false],
    ].forEach(([href, label, current]) => {
      const link = document.createElement("a");
      link.href = href;
      link.textContent = label;
      if (current) link.setAttribute("aria-current", "page");
      nav.appendChild(link);
    });
    details.appendChild(nav);
    header.insertBefore(details, header.firstChild);
  }

  function updateHeroCopy() {
    const header = document.querySelector(".site-header");
    const heading = header && header.querySelector("h1");
    const tagline = header && header.querySelector(".tagline");
    if (!header) return;
    if (!header.querySelector(".product-eyebrow")) {
      const eyebrow = document.createElement("p");
      eyebrow.className = "product-eyebrow";
      eyebrow.textContent = "AP EXAM PRACTICE";
      header.insertBefore(eyebrow, heading);
    }
    if (heading) heading.textContent = "Practice AP multiple-choice sections in the format you’ll actually see.";
    if (tagline) tagline.textContent = "Full-length Section I practice built around current AP question counts, timing, weighting, skills, and stimulus sets. Free, original, unofficial — no account required. In-progress work survives a refresh in this tab.";
  }

  function ensureLandingComposition() {
    const screen = document.getElementById("screen-catalog");
    const toolbar = document.querySelector(".catalog-toolbar");
    const categories = document.getElementById("catalog-categories");
    if (!screen || !toolbar || !categories) return;

    const scopeNote = screen.querySelector(".catalog-scope-note");
    if (scopeNote) {
      scopeNote.textContent = "Audio-dependent AP courses are outside the current scope, including AP Music Theory and world-language/literature exams that require listening, speaking, or aural workflows.";
    }

    if (!screen.querySelector(".catalog-intro")) {
      const intro = document.createElement("section");
      intro.className = "catalog-intro";
      text(intro, "h2", "", "", "Choose your AP course");
      text(intro, "p", "", "catalog-intro-copy", `${releasedCourseCount()} released AP courses are ready for timed practice now. Search by course name or browse the available catalog.`);
      screen.insertBefore(intro, toolbar);
    }

    if (!screen.querySelector(".catalog-trust")) {
      const trust = document.createElement("ul");
      trust.className = "catalog-trust";
      trust.setAttribute("aria-label", "Practice exam credibility");
      [
        ["✓", "Current-format configuration"],
        ["✦", "Original questions"],
        ["○", "No account required"],
        ["▣", "In-progress work survives refresh"],
      ].forEach(([icon, label]) => {
        const item = document.createElement("li");
        const mark = document.createElement("span");
        mark.className = "trust-icon";
        mark.setAttribute("aria-hidden", "true");
        mark.textContent = icon;
        item.appendChild(mark);
        item.appendChild(document.createTextNode(label));
        trust.appendChild(item);
      });
      screen.insertBefore(trust, screen.querySelector(".catalog-intro"));
    }

    if (!screen.querySelector(".how-it-works")) {
      const how = document.createElement("section");
      how.className = "how-it-works";
      text(how, "h2", "", "", "How it works");
      const steps = document.createElement("ol");
      [
        ["Choose a course", "Pick any released AP subject."],
        ["Check the format", "Review question count, timing, calculator, selection, and timed-part details before the clock starts."],
        ["Practice timed", "Work under exam-style timing. Refreshing this tab preserves the current attempt but does not pause the clock; closing the browser session is not a long-term save."],
      ].forEach(([titleValue, body]) => {
        const item = document.createElement("li");
        text(item, "strong", "", "", titleValue);
        text(item, "span", "", "", body);
        steps.appendChild(item);
      });
      how.appendChild(steps);
      screen.appendChild(how);
    }

    if (!document.querySelector(".site-footer")) {
      const footer = document.createElement("footer");
      footer.className = "site-footer";
      text(footer, "p", "", "", "AP Exam Practice is free and unofficial. Questions are original and are not College Board material.");
      text(footer, "p", "", "footer-secondary", "No account required. In-progress work is stored only for this browser tab/session.");
      const docs = document.createElement("p");
      docs.className = "footer-docs";
      const about = document.createElement("a");
      about.href = "about.html";
      about.textContent = "About, scope & limitations";
      docs.appendChild(about);
      docs.appendChild(document.createTextNode(" · "));
      const sources = document.createElement("a");
      sources.href = "official-sources.html";
      sources.textContent = "Official AP sources";
      docs.appendChild(sources);
      footer.appendChild(docs);
      document.body.appendChild(footer);
    }
  }

  function styleCourseCards(container) {
    Array.from(container.querySelectorAll(".subject-card")).forEach((card) => {
      const playable = !card.disabled;
      const subject = subjectForCard(card);
      const outsideScope = !playable && subject && subject.tier === 2;
      card.classList.toggle("released-card", playable);
      card.classList.toggle("development-card", !playable);
      card.classList.toggle("outside-scope-card", !!outsideScope);
      const heading = card.querySelector("h3");
      if (heading && !card.querySelector(".subject-card-kicker")) {
        const kicker = document.createElement("span");
        kicker.className = "subject-card-kicker";
        kicker.textContent = playable ? "Ready to practice" : outsideScope ? "Outside current scope" : "In development";
        card.insertBefore(kicker, heading);
      }
      const status = card.querySelector(".subject-status");
      if (status) {
        status.classList.toggle("subject-cta", playable);
        if (playable) status.textContent = "Review format & start →";
        else if (outsideScope) status.textContent = "Audio workflow not currently supported";
      }
    });
  }

  function appendCollapsibleGroup(container, className, label, cards, openForSearch) {
    if (!cards.length) return;
    const details = document.createElement("details");
    details.className = `${className} category-section`;
    const summary = document.createElement("summary");
    summary.textContent = `${label} (${cards.length})`;
    details.appendChild(summary);
    const grid = document.createElement("div");
    grid.className = "subject-grid";
    cards.forEach((card) => grid.appendChild(card));
    details.appendChild(grid);
    if (openForSearch) details.open = true;
    container.appendChild(details);
  }

  function organizeCatalog() {
    const container = document.getElementById("catalog-categories");
    if (!container) return;
    container.querySelectorAll(":scope > .available-catalog, :scope > .development-catalog, :scope > .outside-scope-catalog").forEach((node) => node.remove());
    styleCourseCards(container);
    const released = [];
    const drafts = [];
    const outsideScope = [];
    Array.from(container.querySelectorAll(":scope > .category-section")).forEach((section) => {
      const heading = section.querySelector("h2");
      const category = heading ? heading.textContent : "AP Course";
      Array.from(section.querySelectorAll(".subject-card")).forEach((card) => {
        if (!card.querySelector(".course-category")) {
          const label = document.createElement("span");
          label.className = "course-category";
          label.textContent = category;
          const cardHeading = card.querySelector("h3");
          if (cardHeading) card.insertBefore(label, cardHeading);
        }
        const subject = subjectForCard(card);
        if (!card.disabled) released.push(card);
        else if (subject && subject.tier === 2) outsideScope.push(card);
        else drafts.push(card);
      });
      section.remove();
    });

    if (released.length) {
      const available = document.createElement("section");
      available.className = "available-catalog category-section";
      text(available, "h2", "", "", "Available now");
      const grid = document.createElement("div");
      grid.className = "subject-grid released-grid";
      released.forEach((card) => grid.appendChild(card));
      available.appendChild(grid);
      container.appendChild(available);
    }

    const search = document.getElementById("catalog-search");
    const openForSearch = !!(search && search.value.trim() && released.length === 0);
    appendCollapsibleGroup(container, "development-catalog", "More AP courses in development", drafts, openForSearch && drafts.length > 0);
    appendCollapsibleGroup(container, "outside-scope-catalog", "Outside current scope: audio-dependent AP courses", outsideScope, openForSearch && drafts.length === 0);
  }

  function addInstructionItem(list, value) {
    const item = document.createElement("li");
    item.textContent = value;
    list.appendChild(item);
  }

  function ensurePreflight() {
    if (document.getElementById("screen-preflight")) return;
    const screen = document.createElement("main");
    screen.id = "screen-preflight";
    screen.className = "screen";
    screen.setAttribute("aria-label", "Practice exam details");
    const panel = document.createElement("div");
    panel.className = "question-panel preflight-panel";
    screen.appendChild(panel);
    const heading = text(panel, "h2", "preflight-subject", "", "");
    heading.tabIndex = -1;
    text(panel, "p", "", "preflight-scope", "This attempt covers the multiple-choice practice section only. Written, free-response, oral, portfolio, and other performance components are not included.");
    text(panel, "p", "preflight-format", "question-text", "");
    text(panel, "p", "preflight-parts", "subject-timing", "");
    text(panel, "p", "preflight-calculator", "subject-timing", "");
    text(panel, "p", "preflight-selection", "subject-timing", "");
    text(panel, "p", "preflight-full", "subject-total", "");
    text(panel, "p", "preflight-note", "results-scope-note", "");

    const instructions = document.createElement("section");
    instructions.className = "preflight-instructions";
    text(instructions, "h3", "", "", "Before you start");
    const list = document.createElement("ul");
    addInstructionItem(list, "The timer starts only when you choose Start timed practice. There is no pause control, and refreshing does not stop the clock. When time expires, the current timed part advances automatically; the final part submits automatically.");
    addInstructionItem(list, "Use the question numbers to move within the current timed part. You can change answers, cross out options with ×, and flag questions for review while that part is open.");
    addInstructionItem(list, "On exams with multiple timed parts, moving to the next part permanently locks earlier questions.");
    addInstructionItem(list, "Submitting ends the attempt. Unanswered or incomplete questions are scored incorrect.");
    addInstructionItem(list, "Your in-progress attempt is saved for this browser tab/session and survives refresh. Choosing Exit clears it; this is not cross-device or long-term storage.");
    instructions.appendChild(list);
    panel.appendChild(instructions);

    const controls = document.createElement("div");
    controls.className = "question-controls preflight-controls";
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
    document.getElementById("preflight-full").textContent = `Official full AP exam duration (for context): ${subject.totalExamTimeLabel}`;
    const note = document.getElementById("preflight-note");
    note.textContent = subject.tierNote || "";
    note.hidden = !subject.tierNote;
    const parts = document.getElementById("preflight-parts");
    const partText = subject.examParts && Array.isArray(subject.examParts.parts)
      ? subject.examParts.parts.map((part) => `${part.label}: ${part.timeMinutes} min`).join(" · ") : "";
    parts.textContent = partText;
    parts.hidden = !partText;
    const calculator = document.getElementById("preflight-calculator");
    const calculatorText = subject.calculatorAllowed === false
      ? "Calculator not permitted for this practice section."
      : subject.calculatorExpected === true
      ? "Calculator expected/permitted throughout this practice section."
      : (partText && /calculator/i.test(partText) ? "Calculator rules change by part; see the timed-part details above." : "");
    calculator.textContent = calculatorText;
    calculator.hidden = !calculatorText;
    const selection = document.getElementById("preflight-selection");
    const multiCount = subject.cspBlueprint && Number.isInteger(subject.cspBlueprint.multiCount)
      ? subject.cspBlueprint.multiCount : 0;
    selection.textContent = multiCount > 0
      ? `${multiCount} questions require selecting two answers; those questions will say “Select two answers.”`
      : "";
    selection.hidden = !selection.textContent;
    showScreen("screen-preflight");
    document.getElementById("preflight-subject").focus();
  }

  document.addEventListener("DOMContentLoaded", () => {
    ensureSiteMenu();
    updateHeroCopy();
    ensureLandingComposition();
    ensurePreflight();
    queueMicrotask(organizeCatalog);
    const search = document.getElementById("catalog-search");
    if (search) search.addEventListener("input", () => queueMicrotask(organizeCatalog));
    beginExam = window.startExam;
    window.startExam = showPreflight;
  });
})();
