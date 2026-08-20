// AP Business with Personal Finance — clean-room release fixes.
(() => {
  "use strict";
  const bank = window.QUESTIONS_AP_BUSINESS_PERSONAL_FINANCE;
  if (!Array.isArray(bank)) throw new Error("AP Business bank must load before release fixes");

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

  item("apbpf-set-u2-segment-3").q = "Which message is best targeted to early-career consumers in the identified segment?";

  replaceDistractors("apbpf-set2-u1-structure-3", [
    "Growth is the immediate priority, so the studio should postpone formal approval boundaries until a later expansion stage.",
    "Senior leaders should retain most approval decisions centrally so employees receive consistent direction as the studio grows.",
    "The studio should emphasize weekly expense visibility before defining which customer outcomes or capabilities matter most."
  ]);
})();
