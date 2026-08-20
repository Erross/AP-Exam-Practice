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

  replaceKey("apbpf-set3-u2-credit-2", "Card B, because its $60 expected cash back with no annual fee exceeds Card A's approximately $25 net reward after its fee.");

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

  const hardened = {
    "apbpf-set3-u1-opportunity-1": [
      "Add a second staffed checkout line during the lunch rush while keeping ordering entirely in person.",
      "Create a mobile menu that shows current offerings but still requires customers to join the regular ordering line.",
      "Offer a prepaid lunch subscription collected through the existing counter without a separate pickup process."
    ],
    "apbpf-set3-u1-opportunity-2": [
      "Hypothesize that at least half of surveyed students prefer shorter waits, then repeat the preference survey with a larger sample.",
      "Hypothesize that students will use the service, offer a free one-day trial, and count sign-ups without requiring a purchase.",
      "Hypothesize that awareness is the main barrier, advertise the idea for a week, and measure ad recall rather than paid orders."
    ],
    "apbpf-set3-u1-opportunity-3": [
      "The pilot is exactly at break-even because 40 orders at $2.50 provide the same amount as the $80 daily cost.",
      "The pilot provides about $20 of daily contribution after the listed cost, which by itself establishes long-run profitability at any volume.",
      "The pilot loses about $20 per day because the $2.50 contribution should be subtracted from the $80 daily cost only once."
    ],
    "apbpf-set3-u1-career-1": [
      "Job A is more exposed because its higher employee health premium makes transportation-price changes more costly.",
      "The jobs are equally exposed because the table reports current commuting costs rather than the exact number of miles driven.",
      "Job B is less exposed because its $250 higher take-home pay offsets the current commuting-cost difference before fuel prices change."
    ],
    "apbpf-set3-u1-career-2": [
      "Job B, because $3,450 minus its $100 health premium leaves more than Job A before commuting cost is considered.",
      "Job B, because the lower health premium should receive greater weight than commuting cost under the stated criterion.",
      "The offers are equal because Job B's higher take-home pay and higher commuting cost should be treated as offsetting differences without calculation."
    ],
    "apbpf-set3-u1-career-3": [
      "Job B leaves about $170 more each month because its lower health premium offsets most of its higher commuting cost.",
      "Job A leaves about $320 more each month because the difference in listed costs should be compared without the take-home-pay difference.",
      "Job A has the stronger listed monthly financial result, so the table alone establishes that it is the better career choice overall."
    ],
    "apbpf-set3-u2-product-1": [
      "Keep Prototype A's current body but add a carrying handle, preserving its stronger leak rating while making a modest portability change.",
      "Keep Prototype B unchanged and use marketing to emphasize its portability despite the lower leak-resistance rating.",
      "Combine Prototype A's current shape with Prototype B's higher-cost materials without first testing whether the change improves portability."
    ],
    "apbpf-set3-u2-product-2": [
      "Compare purchase intent for the current and improved versions, but show the improved version at a lower price than the current version.",
      "Show the improved version to a new target-customer sample and compare its purchase intent with the original prototype's earlier result from a different study.",
      "Ask the same customers whether leak resistance matters to them after showing only the current Prototype B."
    ],
    "apbpf-set3-u2-product-3": [
      "Prototype B has the higher per-unit contribution because its $8.10 production cost is closer to the $14 selling price.",
      "Prototype A has a $7.40 contribution and Prototype B has an $8.10 contribution because production cost itself is the contribution amount.",
      "The prototypes have the same per-unit contribution because they share the same expected selling price."
    ],
    "apbpf-set3-u2-credit-1": [
      "The annual fee, because it is the only listed feature that directly changes the percentage of each purchase returned as cash.",
      "The purchase APR, because a lower borrowing rate creates a larger cash-back payment even when the statement balance is paid in full.",
      "The expected annual purchase amount, because purchase volume determines the reward rate rather than the dollar amount earned at a stated rate."
    ],
    "apbpf-set3-u2-credit-2": [
      "Card A, because its $120 expected cash back should be compared with Card B's $60 without subtracting Card A's annual fee.",
      "Card A, because the two-point difference in cash-back rate is larger than the $95 annual fee when both are expressed as percentages.",
      "The cards are equivalent under the criterion because both use the same $6,000 annual purchase assumption."
    ],
    "apbpf-set3-u2-credit-3": [
      "Earn 1% cash back with no annual fee; the higher 22.9% purchase APR makes this card especially attractive for carrying balances.",
      "No annual fee and 1% cash back; choose this card whenever annual purchases exceed $6,000 because the comparison then favors it regardless of other terms.",
      "Simple 1% cash back with no annual fee; the lower reward rate means APR and other borrowing terms need not be compared."
    ],
    "apbpf-set3-u3-networth-2": [
      "Use $14,000 of liquid savings toward debt because maximizing debt reduction should take priority over the stated liquidity floor.",
      "Use $10,000 of liquid savings toward debt because the liquidity criterion applies to the amount paid rather than the amount retained.",
      "Keep the full $14,000 liquid balance because using an asset to repay a liability leaves net worth initially unchanged and therefore cannot improve the stated liability measure."
    ],
    "apbpf-set3-u3-networth-3": [
      "The household has $70,000 of net worth because net worth is measured by the total value of listed assets before liabilities.",
      "The household has $31,000 of net worth because the listed debt balances are the portion of assets financed by borrowing.",
      "The household has $39,000 of liquid assets because subtracting liabilities from total assets identifies cash available for spending."
    ],
    "apbpf-set3-u3-finance-1": [
      "Option A's higher capacity control is the main financial-resource problem because greater operating control reduces access to capital.",
      "Option B's lower fixed commitment is the clearest internal problem because lower committed cost increases the firm's liquidity risk.",
      "Option A's larger expected annual savings is the clearest internal problem because higher savings requires the firm to recognize a larger expense."
    ],
    "apbpf-set3-u3-finance-2": [
      "Option A, because its $36,000 annual savings are twice Option B's even though its up-front cash requirement is eight times as large.",
      "Option A, because payback should be computed as annual savings divided by up-front cash, making its smaller resulting ratio preferable.",
      "The options have the same payback because each is expected to recover some portion of its up-front cash through annual savings."
    ],
    "apbpf-set3-u3-finance-3": [
      "Choose Option A because its larger annual savings should receive greater weight than the stated priority of limiting fixed commitment.",
      "Choose Option A because high capacity control reduces operating dependence on a vendor enough to offset the higher fixed commitment without further evidence.",
      "Choose neither option because the demand uncertainty makes the expected savings estimates too uncertain to support any staged or lower-commitment action."
    ],
    "apbpf-set3-u4-strategy-1": [
      "The pilot's smaller initial investment is the most important external market problem because competitors determine the firm's investment amount.",
      "The full launch's projected revenue is the clearest market problem because higher expected sales increase competitive pressure on the firm.",
      "The pilot's high ability to exit is the clearest market problem because flexibility makes it harder to respond to the incumbent."
    ],
    "apbpf-set3-u4-strategy-2": [
      "The full launch, because entering four markets creates more opportunities to learn even though the investment and exit commitment are substantially larger.",
      "The full launch, because projected first-year revenue should outweigh investment size and exit flexibility under a flexibility criterion.",
      "The alternatives are equally flexible because each can be evaluated after launch even though their investment and exit conditions differ."
    ],
    "apbpf-set3-u4-strategy-3": [
      "Begin with the full launch because its larger projected revenue is the strongest single estimate, then reduce scope if the incumbent response is stronger than expected.",
      "Begin with the pilot but define success only after results are observed so management can preserve maximum discretion about expansion.",
      "Avoid entry for now because the incumbent's presence makes projected revenue too uncertain to justify collecting evidence through a limited pilot."
    ],
    "apbpf-set3-u4-leadership-1": [
      "Increase coaching frequency but leave escalation standards unchanged so supervisors can focus on general motivation rather than the reported inconsistency.",
      "Clarify escalation standards in a written memo but postpone coaching while new employees gain experience through the current process.",
      "Add staffing to reduce response time without addressing the below-target first-contact resolution rate or inconsistent escalation practices."
    ],
    "apbpf-set3-u4-leadership-2": [
      "Response time misses target, but first-contact resolution is close enough to 80% that the dashboard supports treating it as on target.",
      "Both customer KPIs miss target, and the absence of coaching proves that restoring coaching will by itself produce the target results.",
      "The dashboard shows a coaching-activity gap, but customer performance should be described as meeting target because the measures are moving in the intended direction."
    ],
    "apbpf-set3-u4-leadership-3": [
      "Starting this month, supervisors will hold two coaching sessions each month; individual teams can decide whether the four-hour and 80% goals still apply.",
      "Our response and resolution results are below target, so supervisors will increase oversight; details about coaching and escalation practice will be determined later.",
      "The team will focus on the four-hour response goal first and defer discussion of first-contact resolution and escalation consistency until response time improves."
    ]
  };
  Object.entries(hardened).forEach(([id, values]) => replaceDistractors(id, values));
})();
