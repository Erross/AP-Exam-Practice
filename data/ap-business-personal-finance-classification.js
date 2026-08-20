// AP Business with Personal Finance — audited 20–25% personal-finance classification.
(() => {
  "use strict";
  const bank = window.QUESTIONS_AP_BUSINESS_PERSONAL_FINANCE;
  if (!Array.isArray(bank)) throw new Error("AP Business bank must load before classification");
  bank.forEach((q) => { q.personalFinance = false; });

  const standaloneIds = new Set([
    "apbpf-1-6-2","apbpf-1-6-3",
    "apbpf-2-2-1","apbpf-2-2-2","apbpf-2-2-4","apbpf-2-5-2","apbpf-2-5-3",
    "apbpf-3-1-1","apbpf-3-1-2","apbpf-3-1-3","apbpf-3-1-4","apbpf-3-1-5",
    "apbpf-3-2-1","apbpf-3-2-2","apbpf-3-2-3","apbpf-3-2-4","apbpf-3-2-5",
    "apbpf-3-7-1","apbpf-3-7-2","apbpf-3-7-3","apbpf-3-7-4","apbpf-3-7-5",
    "apbpf-3-8-1","apbpf-3-8-2","apbpf-3-8-3",
    "apbpf-4-3-2","apbpf-4-3-3"
  ]);
  const personalSets = new Set([
    "apbpf-set-u1-ethics","apbpf-set-u2-segment","apbpf-set-u3-saving","apbpf-set-u3-credit"
  ]);
  const personalItemsInMixedSets = new Set([
    "apbpf-set-u3-statements-2","apbpf-set-u3-statements-3"
  ]);
  bank.forEach((q) => {
    if (standaloneIds.has(q.id) || personalSets.has(q.stimulusGroupId) || personalItemsInMixedSets.has(q.id)) q.personalFinance = true;
  });
})();
