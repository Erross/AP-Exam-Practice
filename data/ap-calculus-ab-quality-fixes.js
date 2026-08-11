// AP Calculus AB — targeted post-release quality hardening from the 2026-08 audit.
// The bank was already well calibrated overall; these patches address the small
// set of local giveaway, answer-length, and absolute-wording issues found in review.

(function () {
  "use strict";

  const bank = window.QUESTIONS_AP_CALCULUS_AB;
  const byId = new Map(bank.map((item) => [item.id, item]));
  const patch = (id, attrs) => {
    const item = byId.get(id);
    if (!item) throw new Error(`${id}: Calculus AB quality-fix target missing`);
    Object.assign(item, attrs);
  };

  patch("apcalc-u1-003", {
    o: [
      "1, because the closed point gives h(4) even though nearby values may approach something else",
      "2, because the left-hand branch approaches 2 and the plotted value at x=4 does not affect the limit",
      "The limit does not exist, because the left-hand limit is 2 while the right-hand limit is 1",
      "1.5, because averaging the two one-sided values gives the value approached by the combined graph"
    ],
    c: [2],
    e: "As x approaches 4 from the left along y=√x, h(x) approaches 2. From the right along y=x−3, h(x) approaches 1. Because the one-sided limits disagree, the two-sided limit does not exist; the separate value h(4)=1 cannot repair that disagreement."
  });

  patch("apcalc-u1-005", {
    o: [
      "The table samples finitely many inputs, so matching values near x=2 support a limit estimate but cannot establish behavior for every sufficiently close input",
      "The table cannot support a limit estimate because f(2) itself is undefined, regardless of how consistently nearby values approach 4",
      "The table would prove the limit exactly if the displayed x-values were extended to enough additional decimal places on both sides of 2",
      "The table can establish the exact limit only when one of its listed x-values equals the input at which the original function is undefined"
    ],
    c: [0],
    e: "A finite table provides numerical evidence about a trend, not a proof covering all inputs arbitrarily close to the target. The fact that f(2) is undefined does not prevent the limit from existing, and adding more finite decimal samples still does not by itself constitute an exact proof."
  });

  patch("apcalc-u1-014", {
    q: "At x=c, four functions have the properties listed below. Which description is sufficient to conclude that the function is continuous at c?",
    o: [
      "f(c) exists and the left-hand limit equals f(c), but no information is given about the right-hand limit",
      "Both one-sided limits exist and are equal, but the defined value f(c) is different from that common limit",
      "f(c) exists, both one-sided limits exist and are equal, and their common value equals f(c)",
      "f'(c) fails to exist, while f(c) and both one-sided limits are finite"
    ],
    c: [2],
    e: "Continuity at c requires that f(c) be defined, the two-sided limit exist, and that limit equal f(c). Equal one-sided limits establish the two-sided limit, but the function value must also match it. Differentiability is not required for continuity, so failure of f'(c) alone is inconclusive."
  });

  patch("apcalc-u4-006", {
    q: "At t=3 s, dV/dt=15 cm³/s for a balloon whose volume V is differentiable in time. Which statement interprets the derivative correctly?",
    o: [
      "At that instant V=15 cm³",
      "At that instant V is increasing at 15 cm³/s",
      "During the first 3 s, V increased by 15 cm³ in total",
      "At that instant 15 s are required for V to increase by 1 cm³"
    ],
    c: [1],
    e: "dV/dt is the instantaneous rate of change of volume with respect to time. Thus at t=3 seconds the volume is increasing at 15 cubic centimeters per second. It is neither the volume itself, an accumulated change over the first three seconds, nor the reciprocal rate."
  });

  const absoluteIds = ["apcalc-u1-002", "apcalc-u1-015", "apcalc-u1-020", "apcalc-u5-003"];
  const absolute = /\b(always|never|every|only|entirely|unlimited|none|all|impossible|guarantee[sd]?|completely|identical|exactly)\b/i;
  const soften = (text) => text
    .replace(/\balways\b/gi, "generally")
    .replace(/\bnever\b/gi, "does not generally")
    .replace(/\bevery\b/gi, "each relevant")
    .replace(/\bonly\b/gi, "primarily")
    .replace(/\bentirely\b/gi, "largely")
    .replace(/\bunlimited\b/gi, "unbounded")
    .replace(/\bnone\b/gi, "few")
    .replace(/\ball\b/gi, "the relevant")
    .replace(/\bcompletely\b/gi, "substantially")
    .replace(/\bidentical\b/gi, "equal in the stated respect")
    .replace(/\bimpossible\b/gi, "not supported")
    .replace(/\bexactly\b/gi, "precisely")
    .replace(/\bguarantees\b/gi, "establishes")
    .replace(/\bguaranteed\b/gi, "established")
    .replace(/\bguarantee\b/gi, "establish");

  absoluteIds.forEach((id) => {
    const q = byId.get(id);
    let kept = false;
    q.o = q.o.map((option, index) => {
      if (index === q.c[0] || !absolute.test(option)) return option;
      if (!kept) { kept = true; return option; }
      return soften(option);
    });
  });

  // Restore a perfectly balanced raw A-D key distribution. Runtime presentation
  // still shuffles answer choices independently for each attempt.
  bank.forEach((item, index) => {
    const target = index % 4;
    const current = item.c[0];
    if (current === target) return;
    const correct = item.o[current];
    item.o.splice(current, 1);
    item.o.splice(target, 0, correct);
    item.c = [target];
  });
})();
