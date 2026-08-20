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

  // Generated action-selection standalones apply/identify a concept but do not
  // require the how/why explanation demanded by current Skill 1.C. Keep their
  // effective tag honest; source-set questions carry the genuine higher-order
  // skill work.
  bank.forEach((q) => {
    if (!q.stimulusGroupId && q.skill === "1.C") q.skill = "1.A";
  });

  item("apbpf-set2-u2-channel-1").e = "The own website leaves $41 per unit, compared with $32 for the specialty retailer and $34 for the marketplace.";

  // The original wording began with "Card A" even though the calculation and
  // conclusion correctly selected Card B. Keep the arithmetic but make the
  // selected alternative unambiguous in the keyed response.
  replaceKey("apbpf-set3-u2-credit-2", "Card B, because its $60 expected cash back with no annual fee exceeds Card A's approximately $25 net reward after its fee.");

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
