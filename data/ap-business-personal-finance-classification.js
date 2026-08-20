// AP Business with Personal Finance — audited 20–25% personal-finance classification.
(() => {
  "use strict";
  const bank = window.QUESTIONS_AP_BUSINESS_PERSONAL_FINANCE;
  if (!Array.isArray(bank)) throw new Error("AP Business bank must load before classification");
  bank.forEach((q) => { q.personalFinance = false; });

  // Only count standalones whose actual student-facing task is personal finance.
  // In particular, Topic 3.8 cash-flow-statement questions are business-finance
  // content in the current CED and must not be used to satisfy the 20–25% PF gate.
  const standaloneIds = new Set([
    "apbpf-1-6-2",
    "apbpf-2-2-2",
    "apbpf-3-1-1","apbpf-3-1-2","apbpf-3-1-3","apbpf-3-1-4","apbpf-3-1-5",
    "apbpf-3-2-1","apbpf-3-2-2","apbpf-3-2-3","apbpf-3-2-4","apbpf-3-2-5",
    "apbpf-3-7-1","apbpf-3-7-2","apbpf-3-7-3","apbpf-3-7-4","apbpf-3-7-5"
  ]);
  const personalSets = new Set([
    "apbpf-set-u1-ethics",
    "apbpf-set-u2-segment",
    "apbpf-set-u3-saving",
    "apbpf-set-u3-credit",
    "apbpf-set3-u1-career",
    "apbpf-set3-u2-credit",
    "apbpf-set3-u3-networth"
  ]);
  bank.forEach((q) => {
    if (standaloneIds.has(q.id) || personalSets.has(q.stimulusGroupId)) q.personalFinance = true;
  });
})();
