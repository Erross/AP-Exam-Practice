// AP Business with Personal Finance — final clean-room content corrections.
(() => {
  "use strict";
  const bank = window.QUESTIONS_AP_BUSINESS_PERSONAL_FINANCE;
  if (!Array.isArray(bank)) throw new Error("AP Business bank must load before final review");

  function item(id) {
    const q = bank.find((candidate) => candidate.id === id);
    if (!q) throw new Error(`AP Business question not found: ${id}`);
    return q;
  }
  function replaceDistractors(id, values) {
    const q = item(id);
    const slots = [0,1,2,3].filter((i) => i !== q.c[0]);
    values.forEach((value,i) => { q.o[slots[i]] = value; });
  }
  function rewrite(id, stem, answer, distractors, explanation) {
    const q = item(id);
    q.q = stem;
    q.o[q.c[0]] = answer;
    replaceDistractors(id, distractors);
    q.e = explanation;
  }

  // The first clean-room version compared scheduled payments but did not carry
  // Offer A's $80 origination fee into the all-in cash comparison. Keep the
  // scheduled-payment distinction in q1, then make q2/q3 explicitly all-in.
  rewrite(
    "apbpf-set4-u1-borrowing-1",
    "Which interpretation of the disclosed borrowing costs is best supported by the table?",
    "Offer A has the higher monthly payment and an $80 origination fee, but its $2,280 scheduled repayment total is lower than Offer B's $2,500 scheduled total.",
    [
      "Offer B has the lower scheduled repayment total because its monthly payment is smaller, even though twenty $125 payments total more than twelve $190 payments.",
      "The offers have the same borrowing cost because the borrower receives $2,000 from either lender, regardless of the payment schedule or fee.",
      "Offer A has the lower monthly payment because its repayment term is shorter, even though the table lists $190 for A and $125 for B."
    ],
    "The table separates monthly payment, scheduled repayment, and fees. Offer A requires 12×$190=$2,280 in scheduled payments plus an $80 fee; Offer B requires 20×$125=$2,500 in scheduled payments and lists no origination fee."
  );

  rewrite(
    "apbpf-set4-u1-borrowing-2",
    "If the borrower's criteria are a payment at or below $200 per month and the lower total listed cash paid, including the origination fee, which offer is better supported?",
    "Offer A, because its $190 payment meets the monthly limit and its $2,360 total listed cash paid ($2,280 scheduled payments plus the $80 fee) is lower than Offer B's $2,500.",
    [
      "Offer B, because its $125 monthly payment is lower even though the criterion also requires comparing the total listed cash paid over the full repayment period.",
      "Offer B, because having no origination fee makes its $2,500 total listed cash paid lower than Offer A's $2,360 after the fee is included.",
      "The offers are tied because each provides $2,000 to the borrower, so the fee, number of payments, and payment amount do not affect total listed cash paid."
    ],
    "Both offers satisfy the $200 monthly-payment ceiling. Offer A's all-in listed cash paid is $2,280+$80=$2,360, compared with $2,500 for Offer B, so A better satisfies the second criterion."
  );

  rewrite(
    "apbpf-set4-u1-borrowing-3",
    "Which summary presents the comparison most accurately and accessibly to the prospective borrower?",
    "Offer A requires $190 for 12 months plus an $80 fee, for $2,360 in total listed cash paid; Offer B requires $125 for 20 months with no listed fee, for $2,500 total.",
    [
      "Offer B is the cheaper option because its monthly payment is $65 lower, so the longer repayment period can be left out of an overall cost comparison.",
      "Offer A and Offer B each cost $2,000 because the amount received is the most relevant figure when presenting the borrower's repayment obligation.",
      "Offer A should be presented as costing $2,280 in total because the $80 origination fee is separate from scheduled payments and therefore does not affect cash paid."
    ],
    "The accessible summary includes payment size, duration, and the listed fee, allowing the borrower to see the real tradeoff: A has a higher monthly payment but $2,360 total listed cash paid versus $2,500 for B."
  );

  // Topic 3.1 is Saving for Future Purchases. Reframe the original emergency-
  // reserve draft as a planned used-car down-payment goal while preserving the
  // useful savings-versus-debt tradeoff and the independently recomputed $4,200.
  const purchaseStimulus = item("apbpf-set4-u3-emergency-1").stimulus;
  Object.assign(purchaseStimulus, {
    title: "Planned car down payment and debt snapshot",
    columns: ["Item","Amount"],
    rows: [
      ["Used-car down payment needed in 6 months","$4,800"],
      ["Liquid savings before tax refund","$6,000"],
      ["Tax refund available","$3,000"],
      ["Credit-card balance","$4,800"],
      ["Household goal","Preserve the full $4,800 car down payment"],
    ],
    note: "Synthetic household snapshot. Ignore interest that accrues during the immediate decision and assume the tax refund is received in cash."
  });

  rewrite(
    "apbpf-set4-u3-emergency-1",
    "After receiving the tax refund but before paying down debt, what does the evidence show about liquid savings relative to the planned car down payment?",
    "Liquid savings would be $9,000, which is $4,200 above the planned $4,800 car down payment.",
    [
      "Liquid savings would remain $6,000, which is $1,200 above the planned down payment because a received tax refund cannot be included as cash.",
      "Liquid savings would be $4,800 because the future purchase goal determines the amount of cash the household currently owns.",
      "Liquid savings would be $13,800 because the credit-card balance should be added to savings when measuring funds available for the future purchase."
    ],
    "After the $3,000 refund, liquid savings are $6,000+$3,000=$9,000. Preserving the $4,800 planned purchase amount leaves $9,000−$4,800=$4,200 available for another immediate use."
  );

  rewrite(
    "apbpf-set4-u3-emergency-2",
    "Which explanation best connects a debt-paydown action to the household's stated car-purchase savings goal?",
    "Apply up to $4,200 of available cash to the credit-card balance, because that reduces debt while preserving the full $4,800 planned car down payment.",
    [
      "Apply the full $9,000 liquid balance to debt, because reducing the card balance should take priority over preserving the stated six-month purchase goal.",
      "Keep the full $9,000 in cash and add new credit-card charges, because increasing revolving debt would make the future purchase savings more secure.",
      "Use $2,400 toward debt and keep $6,600 for the car, because the amount preserved for a stated $4,800 purchase goal must equal the amount of debt repaid."
    ],
    "The household has $4,200 above the $4,800 amount it explicitly wants to preserve for the planned purchase. Using that excess to reduce the card links the action to both objectives without consuming the purchase savings."
  );

  rewrite(
    "apbpf-set4-u3-emergency-3",
    "If the decision criterion is maximizing immediate credit-card reduction while preserving the full $4,800 planned car down payment, which action is best supported?",
    "Pay $4,200 toward the card, leaving $4,800 in liquid savings for the planned purchase and a remaining card balance of $600.",
    [
      "Pay $4,800 toward the card, leaving $4,200 in liquid savings even though that amount is below the stated $4,800 purchase-savings criterion.",
      "Pay $3,000 toward the card, because using only the tax refund maximizes debt reduction while preserving more cash than the criterion requires.",
      "Pay nothing toward the card, because preserving the $4,800 purchase amount requires keeping all $9,000 of liquid savings untouched."
    ],
    "The criterion allows every dollar above the $4,800 planned-purchase amount to be used for debt. $9,000−$4,800=$4,200, and paying that amount reduces the $4,800 card balance to $600."
  );
})();
