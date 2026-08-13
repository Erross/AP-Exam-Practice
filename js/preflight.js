// Pre-exam confirmation screen. Playable catalog cards open this screen first;
// the existing exam engine is only invoked after explicit confirmation.
(function () {
  "use strict";

  let selectedSubject = null;

  function findSubjectForCard(card) {
    if (!card || card.disabled) return null;
    const heading = card.querySelector("h3");
    if (!heading) return null;
    return AP_SUBJECTS.find(
      (subject) => subject.name === heading.textContent && subjectIsPlayable(subject)
    ) || null;
  }

  function partSummary(subject) {
    if (!subject.examParts || !Array.isArray(subject.examParts.parts)) return "";
    return subject.examParts.parts
      .map((part) => `${part.label}: ${part.timeMinutes} min`)
      .join(" · ");
  }

  function calculatorSummary(subject) {
    if (subject.calculatorExpected === true) {
      return "Calculator expected/permitted throughout this practice section.";
    }
    if (subject.examParts && Array.isArray(subject.examParts.parts)) {
      const labels = subject.examParts.parts.map((part) => String(part.label || "")).join(" ");
      if (/calculator/i.test(labels)) {
        return "Calculator rules change by part; see the timed-part details above.";
      }
    }
    return "";
  }

  function showPreflight(subject) {
    selectedSubject = subject;
    document.getElementById("preflight-subject-name").textContent = subject.name;
    document.getElementById("preflight-format").textContent =
      `${subject.mcqCount} multiple-choice questions · ${subject.mcqTimeMinutes} minutes`;
    document.getElementById("preflight-full-exam").textContent =
      `Official full AP exam duration: ${subject.totalExamTimeLabel}`;

    const parts = document.getElementById("preflight-parts");
    const partsText = partSummary(subject);
    parts.textContent = partsText;
    parts.hidden = !partsText;

    const calculator = document.getElementById("preflight-calculator");
    const calculatorText = calculatorSummary(subject);
    calculator.textContent = calculatorText;
    calculator.hidden = !calculatorText;

    showScreen("screen-preflight");
    document.getElementById("preflight-subject-name").focus();
  }

  document.addEventListener("click", (event) => {
    const card = event.target.closest && event.target.closest(".subject-card");
    const subject = findSubjectForCard(card);
    if (!subject) return;

    // Intercept before the card's existing startExam click handler runs.
    event.preventDefault();
    event.stopImmediatePropagation();
    showPreflight(subject);
  }, true);

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("preflight-start-btn").addEventListener("click", () => {
      if (!selectedSubject) return;
      const subject = selectedSubject;
      selectedSubject = null;
      startExam(subject);
    });

    document.getElementById("preflight-back-btn").addEventListener("click", () => {
      selectedSubject = null;
      showScreen("screen-catalog");
      const search = document.getElementById("catalog-search");
      if (search) search.focus();
    });
  });
})();
