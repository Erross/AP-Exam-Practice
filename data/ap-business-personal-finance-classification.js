// AP Business with Personal Finance — audited personal-finance classification
// plus final clean-room curation that must execute last in the browser-effective stack.
(() => {
  "use strict";
  const bank = window.QUESTIONS_AP_BUSINESS_PERSONAL_FINANCE;
  if (!Array.isArray(bank)) throw new Error("AP Business bank must load before classification");

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

  // 20–25% personal-finance classification. Only count questions whose actual
  // student-facing task is personal finance. Topic 3.8 is the business cash-flow
  // statement in the current CED and therefore does not satisfy this gate.
  bank.forEach((q) => { q.personalFinance = false; });
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

  // Older source sets had several correct-but-terse rationales. These versions
  // explicitly connect the evidence/calculation to the keyed conclusion and
  // distinguish nearby interpretations where that helps a student learn.
  const explanations = {
    "apbpf-set-u2-price-1": "Revenue equals price multiplied by units sold. At $21, 220 units produce $4,620, which is higher than the revenue shown at $18, $24, or $27.",
    "apbpf-set-u2-price-2": "The stated criterion is revenue within the tested range, not unit volume or price alone. The $21 test produces the largest observed revenue at $4,620, so it best satisfies that criterion.",
    "apbpf-set-u2-price-3": "The data support a limited conclusion about this test: $21 produced the most revenue under the tested conditions. They do not establish the profit-maximizing price or guarantee the same result in other markets or periods.",
    "apbpf-set-u3-saving-1": "The saver still needs $4,800 − $1,200 = $3,600. Dividing that remaining amount by 24 equal monthly deposits gives $150 per month when interest is deliberately ignored.",
    "apbpf-set-u3-statements-1": "Net income measures revenue minus expenses for the period. Using the quarter figures, $96,000 − $79,000 = $17,000; the cash and balance-sheet amounts answer different financial questions.",
    "apbpf-set-u3-statements-2": "Net cash flow uses actual cash received and cash paid during the period. The quarter therefore shows $90,000 − $86,000 = $4,000 of positive net cash flow, distinct from accounting net income.",
    "apbpf-set-u3-statements-3": "The accounting equation implies equity equals assets minus liabilities. At quarter end, $145,000 − $61,000 = $84,000; revenue and cash-flow figures do not determine ending equity by themselves.",
    "apbpf-set-u3-capital-1": "Debt supplies capital that must be repaid according to agreed terms but ordinarily preserves ownership. Equity capital avoids scheduled debt repayment in exchange for an ownership stake and some claim on control or future returns.",
    "apbpf-set2-u1-pestel-1": "A city safety ordinance originates from government and changes the rules under which the company operates, so it is a political/legal external factor. Battery costs, customer preferences, and a rival's capability fall into other categories.",
    "apbpf-set2-u1-supply-1": "On-time delivery is the criterion in the question. Supplier C posts 97%, narrowly above Supplier A at 96% and well above Supplier B at 82%, so C has the strongest delivery performance on the listed data.",
    "apbpf-set2-u1-supply-2": "The decision criterion is minimizing defective packaging. Supplier C has the lowest defect rate at 0.6%, compared with 1.5% for A and 1.2% for B, so the evidence supports C under that priority.",
    "apbpf-set2-u1-supply-3": "The table shows a genuine tradeoff: Supplier B has the lowest unit price, while Supplier C has the best on-time rate and lowest defect rate. A sound summary preserves those competing advantages instead of claiming one supplier dominates every measure.",
    "apbpf-set2-u1-structure-2": "The scenario describes duplicated and delayed decisions because authority is unclear. Defining who may approve contracts, hiring, and discounts directly addresses the coordination problem without unnecessarily redesigning unrelated work.",
    "apbpf-set2-u2-research-1": "Trial-interest rates must be compared as proportions, not raw counts. Remote workers show 96/160 = 60%, versus 72/180 = 40% for students and 33/110 = 30% for retirees.",
    "apbpf-set2-u2-research-3": "Remote workers show the strongest observed interest, but the convenience sample limits generalization. A more representative test focused on that segment uses the signal while collecting stronger evidence before a broad launch.",
    "apbpf-set2-u2-channel-2": "Under the stated per-unit criterion, the own website leaves $50 − $2 − $7 = $41, compared with $32 for the retailer and $34 for the marketplace. Other channel considerations remain outside this simplified comparison.",
    "apbpf-set2-u2-promo-2": "The scenario says referral customers place high trust in recommendations from local contractors. That is direct evidence of a social and credibility influence on consumer behavior, rather than indifference to information sources.",
    "apbpf-set2-u3-expenses-1": "Ingredients and packaging both rise with each additional loaf, so the listed variable cost per loaf is $3.20 + $0.80 = $4.00. Monthly rent and insurance are fixed over the stated relevant range.",
    "apbpf-set2-u3-expenses-2": "The two listed monthly costs that remain fixed over the relevant volume range are $2,400 of rent and $600 of insurance. Together they create $3,000 of fixed monthly cost before any loaves are produced.",
    "apbpf-set2-u4-framework-1": "The incumbent's dense local coverage is outside the company's direct control and affects the attractiveness of market entry, so it is an external competitive threat rather than an internal strength or weakness."
  };
  Object.entries(explanations).forEach(([id, explanation]) => { item(id).e = explanation; });

  // Make the audience explicit for the communication-skill item.
  item("apbpf-set-u2-segment-3").q = "Which message is best targeted to early-career consumers in the identified segment?";

  // Remove the last stacked absolute-language distractor pattern while keeping
  // three plausible alternatives to the employee-facing structure message.
  replaceDistractors("apbpf-set2-u1-structure-3", [
    "Growth is the immediate priority, so the studio should postpone formal approval boundaries until a later expansion stage.",
    "Senior leaders should retain most approval decisions centrally so employees receive consistent direction as the studio grows.",
    "The studio should emphasize weekly expense visibility before defining which customer outcomes or capabilities matter most."
  ]);

  // Correct answers should not advertise themselves by being systematically
  // longer. These are substantive same-domain competitors, not padding: each
  // misses the criterion for a specific business or personal-finance reason.
  const answerCueHardening = {
    "apbpf-set-u1-market-2": [
      "Pilot the service with target customers and measure initial purchases, but do not track whether customers return after the first order.",
      "Run a larger survey asking target customers how likely they are to buy, without offering the service for actual purchase.",
      "Test several brand names with target customers before collecting evidence about willingness to pay or repeat use."
    ],
    "apbpf-set-u1-market-3": [
      "Customization and delivery speed received the highest ratings, so the survey is sufficient evidence that a differentiated service will generate repeat purchases.",
      "Dietary customization led the survey, which shows that price should receive little weight when management evaluates the proposed service.",
      "Delivery speed and customization were highly rated, so management can infer the precise share of local residents who would become customers."
    ],
    "apbpf-set-u1-ethics-2": [
      "Whether users can identify the monthly payment before agreeing, even when total borrowing cost and repayment duration remain less prominent.",
      "Whether the disclosure produces the highest application completion rate while still placing required terms somewhere in the process.",
      "Whether all numerical terms appear on one screen, regardless of whether a typical first-time borrower understands what those terms mean."
    ],
    "apbpf-set-u1-ethics-3": [
      "Show the APR and monthly payment before the application link, while placing repayment term and estimated total repayment on the following screen.",
      "Show estimated total repayment and the repayment term before the link, but emphasize the monthly payment and APR after application begins.",
      "Summarize the account as affordable credit before the link and provide the full borrowing-cost terms during the later application flow."
    ],
    "apbpf-set-u2-segment-3": [
      "Save on a fixed weekly schedule, with alerts explaining after each transfer how the transaction affected the user's checking balance.",
      "Build savings faster with larger automatic transfers and a simple progress display designed for customers with predictable monthly income.",
      "Set one automatic transfer amount and receive a monthly summary showing progress toward the savings goal."
    ],
    "apbpf-set-u3-saving-2": [
      "Schedule the calculated deposit manually each month in the same liquid account, reviewing the amount before each transfer is submitted.",
      "Deposit a larger amount whenever extra cash is available and leave the regular monthly saving amount otherwise unspecified.",
      "Move the goal balance to an investment with more short-term price volatility in exchange for a higher expected return."
    ],
    "apbpf-set-u3-saving-3": [
      "The plan requires $200 each month for 24 months because the $1,200 already saved should remain separate from the amount assigned to the car goal.",
      "With $1,200 saved, depositing $150 for 24 months would add $3,600, but the calculation shows a $3,600 final balance rather than a $4,800 balance.",
      "The current $1,200 reduces the required monthly deposit to $50 because the starting balance can be divided equally across the remaining 24 months."
    ],
    "apbpf-set-u3-credit-3": [
      "Loan B lowers the monthly payment by extending repayment, and the longer term also lowers the total amount paid despite its higher APR.",
      "Loan A has the lower APR and total repayment, but Loan B is less costly because its monthly payment is smaller.",
      "The two loans have the same borrowing cost because each begins with the same principal, despite their different APRs and terms."
    ],
    "apbpf-set-u3-capital-3": [
      "Debt preserves ownership and requires scheduled repayment, while equity generally preserves the founders' ownership percentage but replaces fixed payments with a share of future profits.",
      "Debt gives up some control to the lender but avoids scheduled repayment; equity preserves full control while requiring payments tied to profit.",
      "Debt and equity both preserve the current ownership shares, but debt creates interest expense while equity creates a variable repayment obligation."
    ],
    "apbpf-set-u4-kpi-3": [
      "Recurring revenue is above target and retention is below target, while the six-hour response time should be treated as favorable because it exceeds the four-hour target.",
      "Revenue and support response both exceed their numerical targets, so management should treat those two measures as favorable and focus on retention.",
      "Retention and response time are below their numerical targets, so both should be treated as favorable because lower values generally indicate better performance."
    ],
    "apbpf-set-u4-strategy-3": [
      "Launch same-day delivery permanently, track demand and contribution for 90 days, and establish continuation criteria after management sees the initial results.",
      "Pilot delivery for 90 days and track customer demand, but postpone measuring contribution and retention until the service has expanded beyond one store.",
      "Open a second location on a limited basis for 90 days, using demand and retention to decide whether to add same-day delivery later."
    ],
    "apbpf-set2-u4-framework-2": [
      "Run the small pilot without preset thresholds, then define customer-acquisition and unit-economics criteria after seeing which results make expansion appear most attractive.",
      "Commit to the full regional launch but reserve some marketing spending until customer-acquisition results indicate whether demand is strong.",
      "Delay entry until the incumbent weakens, using regional growth as the main signal for when uncertainty has fallen enough to proceed."
    ]
  };
  Object.entries(answerCueHardening).forEach(([id, values]) => replaceDistractors(id, values));
})();
