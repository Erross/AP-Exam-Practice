// Catalog presentation helper: keep released/playable courses primary and move
// disabled draft/unreleased cards into one collapsed development section.
(function () {
  "use strict";

  function organizeCatalog() {
    const container = document.getElementById("catalog-categories");
    if (!container) return;

    const priorDevelopment = container.querySelector(".development-catalog");
    if (priorDevelopment) priorDevelopment.remove();

    const draftCards = [];
    const sections = Array.from(container.children).filter((node) =>
      node.classList && node.classList.contains("category-section")
    );

    sections.forEach((section) => {
      const cards = Array.from(section.querySelectorAll(".subject-card"));
      cards.filter((card) => card.classList.contains("disabled")).forEach((card) => draftCards.push(card));
      if (!cards.some((card) => !card.classList.contains("disabled"))) section.remove();
    });

    if (draftCards.length === 0) return;

    const details = document.createElement("details");
    details.className = "development-catalog category-section";

    const summary = document.createElement("summary");
    summary.textContent = `More AP courses in development (${draftCards.length})`;
    details.appendChild(summary);

    const grid = document.createElement("div");
    grid.className = "subject-grid";
    draftCards.forEach((card) => grid.appendChild(card));
    details.appendChild(grid);

    const search = document.getElementById("catalog-search");
    const hasReleasedMatch = container.querySelector(".category-section .subject-card:not(.disabled)");
    if (search && search.value.trim() && !hasReleasedMatch) details.open = true;

    container.appendChild(details);
  }

  document.addEventListener("DOMContentLoaded", () => {
    // app.js renders the initial catalog in its own DOMContentLoaded handler.
    // Defer until all handlers for the event have run, then reorganize the result.
    queueMicrotask(organizeCatalog);

    const search = document.getElementById("catalog-search");
    if (search) {
      // app.js re-renders synchronously on input; the microtask runs afterward.
      search.addEventListener("input", () => queueMicrotask(organizeCatalog));
    }
  });
})();
