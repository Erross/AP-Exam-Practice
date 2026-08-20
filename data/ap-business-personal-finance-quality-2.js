// AP Business with Personal Finance — second clean-room distractor pass.
// Replaces weak or cartoon alternatives in the authored higher-order source sets
// with plausible same-domain competitors. No answer-position or length padding.
(() => {
  "use strict";
  const bank = window.QUESTIONS_AP_BUSINESS_PERSONAL_FINANCE;
  if (!Array.isArray(bank)) throw new Error("AP Business bank must load before quality pass 2");

  function q(id) {
    const item = bank.find((candidate) => candidate.id === id);
    if (!item) throw new Error(`AP Business question not found: ${id}`);
    return item;
  }
  function distractors(id, values) {
    const item = q(id);
    const slots = [0,1,2,3].filter((i) => i !== item.c[0]);
    values.forEach((value,i) => { item.o[slots[i]] = value; });
  }

  distractors("apbpf-set3-u1-opportunity-1", [
    "Add a second staffed checkout line during the lunch rush while keeping ordering entirely in person.",
    "Create a mobile menu that shows current offerings but still requires customers to join the regular ordering line.",
    "Offer a prepaid lunch subscription collected through the existing counter without a separate pickup process."
  ]);
  distractors("apbpf-set3-u1-opportunity-2", [
    "Hypothesize that at least half of surveyed students prefer shorter waits, then repeat the preference survey with a larger sample.",
    "Hypothesize that students will use the service, offer a free one-day trial, and count sign-ups without requiring a purchase.",
    "Hypothesize that awareness is the main barrier, advertise the idea for a week, and measure ad recall rather than paid orders."
  ]);
  distractors("apbpf-set3-u1-opportunity-3", [
    "The pilot is exactly at break-even because 40 orders at $2.50 provide the same amount as the $80 daily cost.",
    "The pilot provides about $20 of daily contribution after the listed cost, which by itself establishes long-run profitability at any volume.",
    "The pilot loses about $20 per day because the $2.50 contribution should be subtracted from the $80 daily cost only once."
  ]);

  distractors("apbpf-set3-u1-career-1", [
    "Job A is more exposed because its higher employee health premium makes transportation-price changes more costly.",
    "The jobs are equally exposed because the table reports current commuting costs rather than the exact number of miles driven.",
    "Job B is less exposed because its $250 higher take-home pay offsets the current commuting-cost difference before fuel prices change."
  ]);
  distractors("apbpf-set3-u1-career-2", [
    "Job B, because $3,450 minus its $100 health premium leaves more than Job A before commuting cost is considered.",
    "Job B, because the lower health premium should receive greater weight than commuting cost under the stated criterion.",
    "The offers are equal because Job B's higher take-home pay and higher commuting cost should be treated as offsetting differences without calculation."
  ]);
  distractors("apbpf-set3-u1-career-3", [
    "Job B leaves about $170 more each month because its lower health premium offsets most of its higher commuting cost.",
    "Job A leaves about $320 more each month because the difference in listed costs should be compared without the take-home-pay difference.",
    "Job A has the stronger listed monthly financial result, so the table alone establishes that it is the better career choice overall."
  ]);

  distractors("apbpf-set3-u2-product-1", [
    "Keep Prototype A's current body but add a carrying handle, preserving its stronger leak rating while making a modest portability change.",
    "Keep Prototype B unchanged and use marketing to emphasize its portability despite the lower leak-resistance rating.",
    "Combine Prototype A's current shape with Prototype B's higher-cost materials without first testing whether the change improves portability."
  ]);
  distractors("apbpf-set3-u2-product-2", [
    "Compare purchase intent for the current and improved versions, but show the improved version at a lower price than the current version.",
    "Show the improved version to a new target-customer sample and compare its purchase intent with the original prototype's earlier result from a different study.",
    "Ask the same customers whether leak resistance matters to them after showing only the current Prototype B."
  ]);
  distractors("apbpf-set3-u2-product-3", [
    "Prototype B has the higher per-unit contribution because its $8.10 production cost is closer to the $14 selling price.",
    "Prototype A has a $7.40 contribution and Prototype B has an $8.10 contribution because production cost itself is the contribution amount.",
    "The prototypes have the same per-unit contribution because they share the same expected selling price."
  ]);

  distractors("apbpf-set3-u2-credit-1", [
    "The annual fee, because it is the only listed feature that directly changes the percentage of each purchase returned as cash.",
    "The purchase APR, because a lower borrowing rate creates a larger cash-back payment even when the statement balance is paid in full.",
    "The expected annual purchase amount, because purchase volume determines the reward rate rather than the dollar amount earned at a stated rate."
  ]);
  distractors("apbpf-set3-u2-credit-2", [
    "Card A, because its $120 expected cash back should be compared with Card B's $60 without subtracting Card A's annual fee.",
    "Card A, because the two-point difference in cash-back rate is larger than the $95 annual fee when both are expressed as percentages.",
    "The cards are equivalent under the criterion because both use the same $6,000 annual purchase assumption."
  ]);
  distractors("apbpf-set3-u2-credit-3", [
    "Earn 1% cash back with no annual fee; the higher 22.9% purchase APR makes this card especially attractive for carrying balances.",
    "No annual fee and 1% cash back; choose this card whenever annual purchases exceed $6,000 because the comparison then favors it regardless of other terms.",
    "Simple 1% cash back with no annual fee; the lower reward rate means APR and other borrowing terms need not be compared."
  ]);

  distractors("apbpf-set3-u3-networth-2", [
    "Use $14,000 of liquid savings toward debt because maximizing debt reduction should take priority over the stated liquidity floor.",
    "Use $10,000 of liquid savings toward debt because the liquidity criterion applies to the amount paid rather than the amount retained.",
    "Keep the full $14,000 liquid balance because using an asset to repay a liability leaves net worth initially unchanged and therefore cannot improve the stated liability measure."
  ]);
  distractors("apbpf-set3-u3-networth-3", [
    "The household has $70,000 of net worth because net worth is measured by the total value of listed assets before liabilities.",
    "The household has $31,000 of net worth because the listed debt balances are the portion of assets financed by borrowing.",
    "The household has $39,000 of liquid assets because subtracting liabilities from total assets identifies cash available for spending."
  ]);

  distractors("apbpf-set3-u3-finance-1", [
    "Option A's higher capacity control is the main financial-resource problem because greater operating control reduces access to capital.",
    "Option B's lower fixed commitment is the clearest internal problem because lower committed cost increases the firm's liquidity risk.",
    "Option A's larger expected annual savings is the clearest internal problem because higher savings requires the firm to recognize a larger expense."
  ]);
  distractors("apbpf-set3-u3-finance-2", [
    "Option A, because its $36,000 annual savings are twice Option B's even though its up-front cash requirement is eight times as large.",
    "Option A, because payback should be computed as annual savings divided by up-front cash, making its smaller resulting ratio preferable.",
    "The options have the same payback because each is expected to recover some portion of its up-front cash through annual savings."
  ]);
  distractors("apbpf-set3-u3-finance-3", [
    "Choose Option A because its larger annual savings should receive greater weight than the stated priority of limiting fixed commitment.",
    "Choose Option A because high capacity control reduces operating dependence on a vendor enough to offset the higher fixed commitment without further evidence.",
    "Choose neither option because the demand uncertainty makes the expected savings estimates too uncertain to support any staged or lower-commitment action."
  ]);

  distractors("apbpf-set3-u4-strategy-1", [
    "The pilot's smaller initial investment is the most important external market problem because competitors determine the firm's investment amount.",
    "The full launch's projected revenue is the clearest market problem because higher expected sales increase competitive pressure on the firm.",
    "The pilot's high ability to exit is the clearest market problem because flexibility makes it harder to respond to the incumbent."
  ]);
  distractors("apbpf-set3-u4-strategy-2", [
    "The full launch, because entering four markets creates more opportunities to learn even though the investment and exit commitment are substantially larger.",
    "The full launch, because projected first-year revenue should outweigh investment size and exit flexibility under a flexibility criterion.",
    "The alternatives are equally flexible because each can be evaluated after launch even though their investment and exit conditions differ."
  ]);
  distractors("apbpf-set3-u4-strategy-3", [
    "Begin with the full launch because its larger projected revenue is the strongest single estimate, then reduce scope if the incumbent response is stronger than expected.",
    "Begin with the pilot but define success only after results are observed so management can preserve maximum discretion about expansion.",
    "Avoid entry for now because the incumbent's presence makes projected revenue too uncertain to justify collecting evidence through a limited pilot."
  ]);

  distractors("apbpf-set3-u4-leadership-1", [
    "Increase coaching frequency but leave escalation standards unchanged so supervisors can focus on general motivation rather than the reported inconsistency.",
    "Clarify escalation standards in a written memo but postpone coaching while new employees gain experience through the current process.",
    "Add staffing to reduce response time without addressing the below-target first-contact resolution rate or inconsistent escalation practices."
  ]);
  distractors("apbpf-set3-u4-leadership-2", [
    "Response time misses target, but first-contact resolution is close enough to 80% that the dashboard supports treating it as on target.",
    "Both customer KPIs miss target, and the absence of coaching proves that restoring coaching will by itself produce the target results.",
    "The dashboard shows a coaching-activity gap, but customer performance should be described as meeting target because the measures are moving in the intended direction."
  ]);
  distractors("apbpf-set3-u4-leadership-3", [
    "Starting this month, supervisors will hold two coaching sessions each month; individual teams can decide whether the four-hour and 80% goals still apply.",
    "Our response and resolution results are below target, so supervisors will increase oversight; details about coaching and escalation practice will be determined later.",
    "The team will focus on the four-hour response goal first and defer discussion of first-contact resolution and escalation consistency until response time improves."
  ]);
})();
