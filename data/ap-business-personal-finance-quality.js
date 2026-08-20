// AP Business with Personal Finance — substantive post-authoring curation.
(() => {
  "use strict";
  const bank = window.QUESTIONS_AP_BUSINESS_PERSONAL_FINANCE;
  if (!Array.isArray(bank)) throw new Error("AP Business bank must load before quality curation");

  function item(id) {
    const q = bank.find((candidate) => candidate.id === id);
    if (!q) throw new Error(`AP Business question not found: ${id}`);
    return q;
  }
  function replaceDistractors(id, distractors) {
    const q = item(id);
    const key = q.c[0];
    const indexes = [0,1,2,3].filter((index) => index !== key);
    distractors.forEach((text, index) => { q.o[indexes[index]] = text; });
  }
  function replaceKey(id, text) {
    const q = item(id);
    q.o[q.c[0]] = text;
  }
  function replaceChoices(id, answer, distractors) {
    replaceKey(id, answer);
    replaceDistractors(id, distractors);
  }
  function replaceStem(id, stem) { item(id).q = stem; }
  function retag(id, skill) { item(id).skill = skill; }

  item("apbpf-set2-u2-channel-1").e = "The own website leaves $41 per unit, compared with $32 for the specialty retailer and $34 for the marketplace.";

  // The original wording began with "Card A" even though the calculation and
  // conclusion correctly selected Card B. Keep the arithmetic but make the
  // selected alternative unambiguous in the keyed response.
  replaceKey("apbpf-set3-u2-credit-2", "Card B, because its $60 expected cash back with no annual fee exceeds Card A's approximately $25 net reward after its fee.");

  // Exact-skill clean-room repairs. These questions remain substantive but their
  // original tags claimed tasks the prompts did not actually perform.
  retag("apbpf-set2-u1-pestel-2", "3.B");
  retag("apbpf-set2-u2-research-2", "1.B");
  retag("apbpf-set2-u3-expenses-3", "1.B");
  retag("apbpf-set2-u3-reporting-3", "1.A");
  retag("apbpf-set-u4-kpi-2", "3.B");

  replaceStem("apbpf-set-u4-kpi-2", "If management's priority is customer experience, which course of action is best supported by the dashboard?");
  replaceChoices("apbpf-set-u4-kpi-2",
    "Investigate the retention shortfall and slow support response together before changing unrelated revenue targets.",
    [
      "Focus only on raising the recurring-revenue target because revenue is the one KPI already above target.",
      "Stop monitoring retention and response time because the measures use different units.",
      "Lower the customer-experience targets until the current results count as successful."
    ]
  );
  item("apbpf-set-u4-kpi-2").e = "Retention and support response are both worse than their targets, so investigating those related customer-experience gaps is a course of action directed at the stated problem.";

  // Communication skills require an explicit audience and purpose. Tighten the
  // older source-set prompts so selecting the keyed response actually performs
  // the declared communication task rather than merely recognizing a concept.
  replaceStem("apbpf-set-u1-market-3", "Which statement communicates the survey evidence most accurately to a manager deciding whether to test the service?");
  replaceStem("apbpf-set-u2-price-3", "Which conclusion communicates the pricing-test result most accurately to a manager planning the next test?");
  replaceStem("apbpf-set-u3-saving-3", "Which statement communicates the savings calculation most accurately to the saver planning for the car purchase?");
  replaceStem("apbpf-set-u3-credit-3", "Which statement communicates the loan tradeoff most accurately to the borrower?");
  replaceStem("apbpf-set-u3-capital-3", "Which statement communicates the financing tradeoff most accurately to the company's owners?");
  replaceStem("apbpf-set-u4-kpi-3", "Which summary communicates the dashboard most accurately to senior management?");
  replaceStem("apbpf-set2-u1-pestel-3", "Which summary to management best avoids confusing an external trend with a competitive advantage?");
  replaceStem("apbpf-set2-u1-supply-3", "Which statement communicates the supplier tradeoff most accurately to the procurement manager?");
  replaceStem("apbpf-set2-u2-channel-3", "Which caveat should a manager include when presenting the channel recommendation to executives?");
  replaceStem("apbpf-set2-u4-leadership-3", "Which summary communicates the pilot results most accurately to senior management?");
  replaceStem("apbpf-set3-u3-networth-3", "Which statement presents the financial position most accurately to the household?");

  replaceStem("apbpf-set2-u1-structure-3", "Which message to employees best aligns the studio's structure with its long-term direction?");
  replaceChoices("apbpf-set2-u1-structure-3",
    "As we grow, we will preserve responsive creative service by clarifying who owns vendor, hiring, and client-discount decisions.",
    [
      "Growth is our only priority, so approval responsibilities will remain intentionally undefined.",
      "Every employee should make every contract and hiring decision independently as the studio grows.",
      "Our long-term direction is to publish weekly expense totals instead of defining customer or capability priorities."
    ]
  );
  item("apbpf-set2-u1-structure-3").e = "The message is targeted to employees, states a growth-oriented customer purpose, and connects that purpose to the specific decision-right problem in the scenario.";

  replaceStem("apbpf-set2-u2-promo-3", "Which message is best targeted to homeowners described in the research?");
  replaceStem("apbpf-set2-u4-framework-3", "Which message to senior leaders best communicates a recommendation that integrates the internal and external evidence?");

  replaceDistractors("apbpf-set-u1-market-1", [
    "Customers place the greatest importance on having the largest possible menu.",
    "Low price is rated more important than delivery speed and dietary customization.",
    "The four measured features receive nearly identical importance ratings in the survey."
  ]);
  replaceDistractors("apbpf-set-u2-price-2", [
    "Use $24 because its revenue remains close to the observed maximum while charging a higher unit price.",
    "Use $27 because its higher price per unit offsets the observed decline in volume most effectively.",
    "Use $18 because the greatest unit volume is the strongest available proxy for the stated revenue objective."
  ]);
  replaceDistractors("apbpf-set-u2-price-3", [
    "The observed decline at $27 indicates that prices above $27 would likely produce negligible demand.",
    "The test suggests customer demand changes very little across the tested prices because sales remain substantial at each price.",
    "$21 should be treated as the profit-maximizing price for the broader market because it maximized revenue in this test."
  ]);
  replaceDistractors("apbpf-set-u2-segment-1", [
    "Both segments prioritize fixed transfer amounts over flexibility in the savings process.",
    "Irregular-income workers appear less concerned about transfer timing than college students.",
    "College students place greater value on detailed low-balance warnings than on simple progress displays."
  ]);
  replaceDistractors("apbpf-set-u3-capital-1", [
    "Both options transfer some ownership because each supplies capital from an outside source.",
    "Equity financing is more appropriate for equipment because lenders generally finance operating expenses rather than capital assets.",
    "The bank loan preserves ownership and therefore carries little financial cost beyond repayment of principal."
  ]);
  replaceDistractors("apbpf-set2-u1-pestel-3", [
    "Growing commuter interest becomes a competitive advantage because market demand itself is a firm-controlled resource.",
    "Falling battery prices create an advantage for this firm because lower industry input costs affect its rivals less directly.",
    "The new ordinance creates an advantage because compliance requirements generally favor incumbent firms regardless of capability."
  ]);
  replaceDistractors("apbpf-set2-u1-structure-2", [
    "Add another management layer while leaving the current approval boundaries informal.",
    "Narrow each role so employees specialize in one recurring decision rather than clarifying cross-functional approval rights.",
    "Delegate contract approval broadly across project teams to reduce delays without defining dollar or role limits."
  ]);
  replaceDistractors("apbpf-set2-u2-channel-3", [
    "Channel fees and fulfillment costs matter less than reach, so they should be omitted from the comparison.",
    "The per-unit figures are sufficient to choose a channel because they already capture the main economic tradeoffs.",
    "The table cannot compare channel economics because it omits manufacturing cost, even though that cost is identical across channels."
  ]);
  replaceDistractors("apbpf-set2-u3-expenses-3", [
    "A proportional share of monthly insurance because it is an operating expense associated with production.",
    "A proportional share of monthly rent and insurance assigned to the additional loaf.",
    "Monthly rent plus the ingredient cost because occupancy and materials both support production."
  ]);
  replaceDistractors("apbpf-set2-u3-reporting-1", [
    "Historical refund patterns are too backward-looking to inform the current estimate when future outcomes remain uncertain.",
    "Choosing the low end of a supportable range is acceptable when management wants reported refund expense to remain conservative.",
    "Because the final refund amount is unknown, choosing any point within the plausible range is equally faithful."
  ]);
  replaceDistractors("apbpf-set2-u4-framework-3", [
    "Use the firm's internal strengths to justify expansion while treating the incumbent and market growth as background information rather than decision criteria.",
    "Strong brand recognition is sufficient reason to launch broadly because it reduces the importance of the incumbent's local coverage.",
    "The incumbent's dense coverage makes a full launch preferable to a pilot because entering at scale is the main way to offset that threat."
  ]);
})();
