// AP Calculus BC — original, unofficial Section I practice bank.
// Consolidated from the independently audited browser-effective development bank.
// Standalone shipping artifact: no runtime dependency on the AP Calculus AB bank.
// Aligned to the Fall 2026 course framework / May 2027 exam format.

window.QUESTIONS_AP_CALCULUS_BC = [
  {
    "id": "apcalcbc-shared-apcalc-u1-001",
    "unit": "U1",
    "topicCode": "1.1",
    "topic": "Introducing Calculus: Can Change Occur at an Instant?",
    "skill": "2.A",
    "calculatorAllowed": false,
    "type": "s",
    "q": "A student computes the average rate of change of a differentiable function s(t), which gives the position in meters of an object at time t in seconds, over the interval [2, 2+h] for smaller and smaller positive values of h. As h → 0, this process of shrinking the interval around t = 2 allows the student to define which quantity?",
    "o": [
      "The instantaneous rate of change of s at t = 2, defined as the limit of the average rates of change as h approaches 0.",
      "The average rate of change of s over the interval [2,3], since h must eventually equal 1.",
      "The total distance traveled by the object from t = 0 to t = 2.",
      "The value of s(2), since shrinking the interval isolates a single output value."
    ],
    "c": [
      0
    ],
    "e": "Instantaneous rate of change at a point is formally defined as the limit of average rates of change (difference quotients) over intervals that shrink to that point; this is the foundational idea connecting average and instantaneous change in calculus, not merely evaluating s(2) or fixing h at a particular value."
  },
  {
    "id": "apcalcbc-shared-apcalc-u1-002",
    "unit": "U1",
    "topicCode": "1.2",
    "topic": "Defining Limits and Limit Notation",
    "skill": "2.C",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Suppose lim(x→5⁻) g(x) = 8 and lim(x→5⁺) g(x) = 8, but g(5) = 2. Which statement correctly uses limit notation to describe the behavior of g near x = 5?",
    "o": [
      "lim(x→5) g(x) = 2, because a two-sided limit must always equal the function value at that point.",
      "lim(x→5) g(x) = 8, even though g(5) ≠ 8, because the two one-sided limits agree with each other.",
      "lim(x→5) g(x) does not exist, because g(5) is not equal to 8.",
      "lim(x→5) g(x) = 8 primarily if g happens to be defined at points near x = 5 other than x = 5 itself."
    ],
    "c": [
      1
    ],
    "e": "A two-sided limit exists and equals the common value of the one-sided limits regardless of whether the function is defined there or what value it takes; the limit describes the trend of g(x) as x approaches 5, not the function's actual output at 5."
  },
  {
    "id": "apcalcbc-shared-apcalc-u1-003",
    "unit": "U1",
    "topicCode": "1.3",
    "topic": "Estimating Limit Values from Graphs",
    "skill": "2.B",
    "calculatorAllowed": false,
    "type": "s",
    "q": "The graph of a function h consists of the curve y = √x for 0 ≤ x < 4, a closed dot at (4, 1), and the line y = x − 3 for x > 4. Based on this graph, what is lim(x→4) h(x)?",
    "o": [
      "1, because the closed point gives h(4) even though nearby values may approach something else",
      "2, because the left-hand branch approaches 2 and the plotted value at x=4 does not affect the limit",
      "The limit does not exist, because the left-hand limit is 2 while the right-hand limit is 1",
      "1.5, because averaging the two one-sided values gives the value approached by the combined graph"
    ],
    "c": [
      2
    ],
    "e": "As x approaches 4 from the left along y=√x, h(x) approaches 2. From the right along y=x−3, h(x) approaches 1. Because the one-sided limits disagree, the two-sided limit does not exist; the separate value h(4)=1 cannot repair that disagreement."
  },
  {
    "id": "apcalcbc-shared-apcalc-u1-004",
    "unit": "U1",
    "topicCode": "1.4",
    "topic": "Estimating Limit Values from Tables",
    "skill": "2.B",
    "calculatorAllowed": false,
    "type": "s",
    "stimulusGroupId": "apcalcbc-shared-apcalc-g-u1-limit-table",
    "stimulus": {
      "type": "quantitative",
      "title": "Values of f(x) = (x² − 4)/(x − 2) for x near 2",
      "source": "Original simulated data created for AP Exam Practice.",
      "columns": [
        "x",
        "f(x)"
      ],
      "rows": [
        [
          "1.9",
          "3.9"
        ],
        [
          "1.99",
          "3.99"
        ],
        [
          "2.01",
          "4.01"
        ],
        [
          "2.1",
          "4.1"
        ]
      ]
    },
    "q": "The table shows values of f(x) = (x² − 4)/(x − 2) for x near 2 (note that f is undefined at x = 2). Based on the pattern in the table, what is the best estimate for lim(x→2) f(x)?",
    "o": [
      "3.9, since that is the closest tabulated value to x = 2 from the left",
      "0, since f(2) is undefined",
      "Cannot be estimated without knowing f(2)",
      "4"
    ],
    "c": [
      3
    ],
    "e": "As x approaches 2 from both sides, the tabulated outputs cluster increasingly close to 4 (3.9, 3.99 from the left and 4.01, 4.1 from the right), which is the numerical signature of a limit; the fact that f(2) itself is undefined does not prevent the limit from existing, since limits describe behavior near a point, not at it."
  },
  {
    "id": "apcalcbc-shared-apcalc-u1-005",
    "unit": "U1",
    "topicCode": "1.4",
    "topic": "Estimating Limit Values from Tables",
    "skill": "3.E",
    "calculatorAllowed": false,
    "type": "s",
    "stimulusGroupId": "apcalcbc-shared-apcalc-g-u1-limit-table",
    "stimulus": {
      "type": "quantitative",
      "title": "Values of f(x) = (x² − 4)/(x − 2) for x near 2",
      "source": "Original simulated data created for AP Exam Practice.",
      "columns": [
        "x",
        "f(x)"
      ],
      "rows": [
        [
          "1.9",
          "3.9"
        ],
        [
          "1.99",
          "3.99"
        ],
        [
          "2.01",
          "4.01"
        ],
        [
          "2.1",
          "4.1"
        ]
      ]
    },
    "q": "Using the same table of values for f(x) = (x² − 4)/(x − 2) near x = 2, which statement best explains why the table only provides an estimate of lim(x→2) f(x) rather than a proof of its exact value?",
    "o": [
      "The table samples finitely many inputs, so matching values near x=2 support a limit estimate but cannot establish behavior for every sufficiently close input",
      "The table cannot support a limit estimate because f(2) itself is undefined, regardless of how consistently nearby values approach 4",
      "The table would prove the limit exactly if the displayed x-values were extended to enough additional decimal places on both sides of 2",
      "The table can establish the exact limit only when one of its listed x-values equals the input at which the original function is undefined"
    ],
    "c": [
      0
    ],
    "e": "A finite table provides numerical evidence about a trend, not a proof covering all inputs arbitrarily close to the target. The fact that f(2) is undefined does not prevent the limit from existing, and adding more finite decimal samples still does not by itself constitute an exact proof."
  },
  {
    "id": "apcalcbc-shared-apcalc-u1-006",
    "unit": "U1",
    "topicCode": "1.5",
    "topic": "Determining Limits Using Algebraic Properties of Limits",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Given that lim(x→a) f(x) = 3 and lim(x→a) g(x) = −2, use the algebraic limit laws to find lim(x→a) [4f(x) − g(x)²].",
    "o": [
      "16",
      "8",
      "14",
      "-4"
    ],
    "c": [
      1
    ],
    "e": "By the difference and constant multiple limit laws, lim[4f−g²] = 4·lim f − (lim g)² = 4(3) − (−2)² = 12 − 4 = 8; common errors include adding instead of subtracting the squared term (giving 16) or forgetting to square g(x) before combining (giving 14)."
  },
  {
    "id": "apcalcbc-shared-apcalc-u1-007",
    "unit": "U1",
    "topicCode": "1.6",
    "topic": "Determining Limits Using Algebraic Manipulation",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Evaluate lim(x→3) (x² − 9)/(x − 3).",
    "o": [
      "0, since the denominator is 0 at x = 3",
      "The limit does not exist, since x − 3 = 0 is not in the domain",
      "6",
      "3, the value that x approaches"
    ],
    "c": [
      2
    ],
    "e": "Factoring gives (x−3)(x+3)/(x−3), which simplifies to x+3 for x ≠ 3; substituting x = 3 into the simplified expression gives 6. The original 0/0 form does not mean the limit is 0 or nonexistent — it signals the need to simplify before substituting.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u1-6-7"
  },
  {
    "id": "apcalcbc-shared-apcalc-u1-008",
    "unit": "U1",
    "topicCode": "1.6",
    "topic": "Determining Limits Using Algebraic Manipulation",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Evaluate lim(x→0) (√(x+4) − 2)/x.",
    "o": [
      "0, by substituting x = 0 directly into the simplified radical",
      "4, the value under the radical when x = 0",
      "Does not exist, because the denominator approaches 0",
      "1/4"
    ],
    "c": [
      3
    ],
    "e": "Multiplying numerator and denominator by the conjugate √(x+4)+2 gives [(x+4)−4]/[x(√(x+4)+2)] = x/[x(√(x+4)+2)] = 1/(√(x+4)+2), which approaches 1/4 as x→0; direct substitution before rationalizing gives the indeterminate form 0/0, which is not itself an answer of 0.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u1-6-7"
  },
  {
    "id": "apcalcbc-shared-apcalc-u1-009",
    "unit": "U1",
    "topicCode": "1.7",
    "topic": "Selecting Procedures for Determining Limits",
    "skill": "3.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Which procedure is most appropriate for evaluating lim(x→1) (x³ − 1)/(x − 1)?",
    "o": [
      "Factor the numerator as a difference of cubes, (x−1)(x²+x+1), and cancel the common factor with the denominator before substituting.",
      "Substitute x = 1 directly and report the resulting 0/0 as the final numerical answer.",
      "Multiply numerator and denominator by the conjugate of the numerator, since it contains a difference.",
      "Apply the squeeze theorem using x³ − 2 and x³ as bounding functions."
    ],
    "c": [
      0
    ],
    "e": "Since direct substitution yields the indeterminate form 0/0, the appropriate technique here is algebraic factoring (difference of cubes) followed by cancellation; conjugate multiplication is reserved for expressions containing radicals, and reporting 0/0 as a final answer misunderstands what an indeterminate form signifies."
  },
  {
    "id": "apcalcbc-shared-apcalc-u1-010",
    "unit": "U1",
    "topicCode": "1.8",
    "topic": "Determining Limits Using the Squeeze Theorem",
    "skill": "3.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Since −x² ≤ x²sin(1/x) ≤ x² for all x ≠ 0, and a calculator shows the outputs of x²sin(1/x) oscillating but shrinking toward 0 as x approaches 0 (e.g., at x = 0.1, 0.01, 0.001), what does the Squeeze Theorem allow you to conclude about lim(x→0) x² sin(1/x)?",
    "o": [
      "The limit does not exist, because sin(1/x) oscillates infinitely often near x = 0.",
      "The limit equals 0, because both bounding functions −x² and x² approach 0 as x → 0.",
      "The limit equals 1, since sin(1/x) is bounded between −1 and 1.",
      "The limit cannot be determined without evaluating x² sin(1/x) at x = 0 directly."
    ],
    "c": [
      1
    ],
    "e": "The Squeeze Theorem states that if g(x) ≤ f(x) ≤ h(x) near a point and lim g = lim h = L, then lim f = L as well; here both −x² and x² → 0 as x→0, forcing x²sin(1/x) → 0 too, despite the oscillation of sin(1/x) itself, which is numerically damped out by the shrinking x² factor."
  },
  {
    "id": "apcalcbc-shared-apcalc-u1-011",
    "unit": "U1",
    "topicCode": "1.9",
    "topic": "Connecting Multiple Representations of Limits",
    "skill": "2.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "A table of values for f shows outputs approaching 5 as x approaches 3 from both sides. A separate graph of f shows an open circle at (3, 5) with no other point plotted directly above or below x = 3. Which conclusion is consistent with both representations?",
    "o": [
      "f(3) = 5, since both representations show the value 5 at x = 3.",
      "lim(x→3) f(x) does not exist, since the graph has an open circle there.",
      "lim(x→3) f(x) = 5, but f(3) is undefined.",
      "f is continuous at x = 3, since the limit and the graph agree."
    ],
    "c": [
      2
    ],
    "e": "An open circle on a graph indicates the function is not defined at that input, while the table's trend toward 5 from both sides indicates the two-sided limit is 5; the limit value and the function's actual value at a point are conceptually distinct, so the limit can exist even when f(3) does not."
  },
  {
    "id": "apcalcbc-shared-apcalc-u1-012",
    "unit": "U1",
    "topicCode": "1.10",
    "topic": "Exploring Types of Discontinuities",
    "skill": "3.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Let f(x) = sin(x)/x for x ≠ 0, and f(0) = 3. A calculator table shows sin(x)/x approaching 1 as x approaches 0 from both directions. What type of discontinuity does f have at x = 0?",
    "o": [
      "A jump discontinuity, because the left- and right-hand limits are different.",
      "An infinite discontinuity, because f is undefined by a fraction at x = 0.",
      "No discontinuity, because f(0) is defined and the limit exists.",
      "A removable discontinuity, because lim(x→0) f(x) = 1 exists but does not equal f(0) = 3."
    ],
    "c": [
      3
    ],
    "e": "Since lim(x→0) sin(x)/x = 1 (a standard limit confirmed numerically here), the two-sided limit exists and is finite, but it does not match the assigned value f(0) = 3; this mismatch between an existing finite limit and the function's actual value defines a removable discontinuity, not a jump or infinite one."
  },
  {
    "id": "apcalcbc-shared-apcalc-u1-013",
    "unit": "U1",
    "topicCode": "1.11",
    "topic": "Defining Continuity at a Point",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Let f(x) = 3x + k for x ≤ 2, and f(x) = x² for x > 2. Find the value of k that makes f continuous at x = 2.",
    "o": [
      "-2",
      "2, from setting 3(2)+k equal to 2(2)",
      "-6, from solving 3(2)+k = 0",
      "4, from setting k equal to the right-hand limit directly"
    ],
    "c": [
      0
    ],
    "e": "Continuity at x = 2 requires the left piece to equal the right piece's limit there: 3(2) + k = 2² = 4, so 6 + k = 4 and k = −2; a common error is setting k itself equal to the right-hand limit value of 4 rather than solving the resulting equation.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u1-12-13"
  },
  {
    "id": "apcalcbc-shared-apcalc-u1-014",
    "unit": "U1",
    "topicCode": "1.11",
    "topic": "Defining Continuity at a Point",
    "skill": "3.B",
    "calculatorAllowed": false,
    "type": "s",
    "q": "At x=c, four functions have the properties listed below. Which description is sufficient to conclude that the function is continuous at c?",
    "o": [
      "f(c) exists and the left-hand limit equals f(c), but no information is given about the right-hand limit",
      "f(c) exists, both one-sided limits exist and are equal, and their common value equals f(c)",
      "Both one-sided limits exist and are equal, but the defined value f(c) is different from that common limit",
      "f'(c) fails to exist, while f(c) and both one-sided limits are finite"
    ],
    "c": [
      1
    ],
    "e": "Continuity at c requires that f(c) be defined, the two-sided limit exist, and that limit equal f(c). Equal one-sided limits establish the two-sided limit, but the function value must also match it. Differentiability is not required for continuity, so failure of f'(c) alone is inconclusive.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u1-12-13"
  },
  {
    "id": "apcalcbc-shared-apcalc-u1-015",
    "unit": "U1",
    "topicCode": "1.12",
    "topic": "Confirming Continuity over an Interval",
    "skill": "3.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Consider f(x) = √(4 − x²) on the closed interval [−2, 2]. Using a calculator to evaluate f at several points across the interval, including near the endpoints (e.g., x = −1.99, 0, 1.99), a student observes no jumps, breaks, or undefined outputs. Is f continuous on [−2, 2]?",
    "o": [
      "No, because f is undefined at x = −2 and x = 2, where the expression under the radical equals 0.",
      "No, because f is only continuous on the open interval (−2, 2), not at the endpoints.",
      "Yes, because 4 − x² ≥ 0 throughout [−2, 2], and √(4−x²) is a composition of functions continuous on that domain.",
      "Cannot be determined without checking each relevant real number in the interval individually."
    ],
    "c": [
      2
    ],
    "e": "Since 4 − x² ≥ 0 exactly when −2 ≤ x ≤ 2, the expression under the radical is defined and nonnegative throughout the closed interval, and the square root and polynomial functions are each continuous on their domains; f(−2) = f(2) = 0 are legitimate function values, not points of discontinuity."
  },
  {
    "id": "apcalcbc-shared-apcalc-u1-016",
    "unit": "U1",
    "topicCode": "1.13",
    "topic": "Removing Discontinuities",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "The function g(x) = (x² − x − 2)/(x − 2) has a removable discontinuity at x = 2. What value should be assigned to g(2) to make g continuous at x = 2?",
    "o": [
      "2, the x-value where the discontinuity occurs",
      "-1, the root of the simplified factor x + 1",
      "0, since the original expression is undefined at x = 2",
      "3"
    ],
    "c": [
      3
    ],
    "e": "Factoring gives (x−2)(x+1)/(x−2) = x+1 for x ≠ 2, so lim(x→2) g(x) = 2+1 = 3; assigning g(2) = 3 removes the discontinuity by making the function value match the limit. Note that −1 is the zero of the simplified expression, not the limit's value at x = 2."
  },
  {
    "id": "apcalcbc-shared-apcalc-u1-017",
    "unit": "U1",
    "topicCode": "1.14",
    "topic": "Connecting Infinite Limits and Vertical Asymptotes",
    "skill": "2.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Let f(x) = (x+1)/(x−3)². A calculator table of values for x = 2.9, 2.99, 3.01, 3.1 shows f(x) growing very large and positive as x approaches 3 from both sides. What does this indicate about lim(x→3) f(x) and the graph of f?",
    "o": [
      "lim(x→3) f(x) = +∞, and the graph of f has a vertical asymptote at x = 3.",
      "lim(x→3) f(x) = −∞, since the denominator approaches 0 from the negative direction.",
      "lim(x→3) f(x) = 0, since dividing by an increasingly large denominator makes outputs shrink.",
      "lim(x→3) f(x) does not exist in any meaningful sense, so no conclusion can be drawn about the graph."
    ],
    "c": [
      0
    ],
    "e": "As x→3, the numerator approaches 4 (a positive constant) while the denominator (x−3)² approaches 0 through positive values from both sides, so the quotient grows without bound in the positive direction; this unbounded behavior corresponds exactly to a vertical asymptote at x = 3, and stating the limit is +∞ is a meaningful, standard way to describe it."
  },
  {
    "id": "apcalcbc-shared-apcalc-u1-018",
    "unit": "U1",
    "topicCode": "1.15",
    "topic": "Connecting Limits at Infinity and Horizontal Asymptotes",
    "skill": "1.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Evaluate lim(x→∞) (3x² + 2x)/(5x² − 7).",
    "o": [
      "2/7, from comparing the coefficients of the linear and constant terms",
      "3/5",
      "0, since the degrees of numerator and denominator are equal so the limit must vanish",
      "∞, since both the numerator and denominator grow without bound"
    ],
    "c": [
      1
    ],
    "e": "Dividing numerator and denominator by x² (the highest power present) gives (3 + 2/x)/(5 − 7/x²), and as x→∞ the terms with x in the denominator vanish, leaving 3/5; when numerator and denominator have equal degree, the limit at infinity equals the ratio of leading coefficients, not 0 or ∞."
  },
  {
    "id": "apcalcbc-shared-apcalc-u1-019",
    "unit": "U1",
    "topicCode": "1.16",
    "topic": "Working with the Intermediate Value Theorem",
    "skill": "3.B",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Suppose f is continuous on [0, 3], with f(0) = −2 and f(3) = 5. Which conclusion is justified by the Intermediate Value Theorem?",
    "o": [
      "There exists exactly one c in (0, 3) such that f(c) = 0.",
      "f must be increasing on (0, 3), since f(0) < f(3).",
      "There exists at least one c in (0, 3) such that f(c) = 0.",
      "No conclusion can be drawn unless f is also known to be differentiable on (0, 3)."
    ],
    "c": [
      2
    ],
    "e": "The Intermediate Value Theorem guarantees at least one c in (0,3) with f(c)=0 because 0 lies between f(0) = −2 and f(3) = 5 and f is continuous on the interval; the theorem guarantees existence, not uniqueness, and it requires only continuity, not differentiability.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u1-18-19"
  },
  {
    "id": "apcalcbc-shared-apcalc-u1-020",
    "unit": "U1",
    "topicCode": "1.16",
    "topic": "Working with the Intermediate Value Theorem",
    "skill": "3.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Let f(x) = cos(x) − x on [0, 1]. A calculator gives f(0) = 1 and f(1) = cos(1) − 1 ≈ −0.460. Since f is continuous on [0, 1], what can be concluded by the Intermediate Value Theorem?",
    "o": [
      "f(x) = 0 has no solution on [0, 1], since f(0) and f(1) are both nonzero.",
      "There is exactly one value c in (0, 1) where f(c) = 0, since IVT guarantees a unique root.",
      "f must be zero at the midpoint x = 0.5, since that is halfway between the endpoints.",
      "There is at least one value c in (0, 1) where f(c) = 0, meaning cos(c) = c."
    ],
    "c": [
      3
    ],
    "e": "Because f(0) = 1 > 0 and f(1) ≈ −0.460 < 0, and f is continuous (a difference of continuous functions), the IVT guarantees at least one c in (0,1) with f(c) = 0; the theorem does not specify where this c is located (it need not be the midpoint) nor does it guarantee that c is unique.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u1-18-19"
  },
  {
    "id": "apcalcbc-shared-apcalc-u2-001",
    "unit": "U2",
    "topicCode": "2.1",
    "topic": "Defining Average and Instantaneous Rates of Change at a Point",
    "skill": "2.B",
    "calculatorAllowed": true,
    "type": "s",
    "stimulus": {
      "type": "quantitative",
      "title": "Position of a Particle Moving Along a Line",
      "source": "Original simulated data created for AP Exam Practice.",
      "columns": [
        "t (s)",
        "s(t) (m)"
      ],
      "rows": [
        [
          "0",
          "2.3"
        ],
        [
          "1.5",
          "9.8"
        ],
        [
          "3",
          "15.1"
        ],
        [
          "4.5",
          "22.4"
        ]
      ]
    },
    "q": "The table gives the position s(t), in meters, of a particle moving along a straight line at selected times t, in seconds. What is the average velocity of the particle, in meters per second, over the interval [1.5, 4.5]?",
    "o": [
      "4.2 m/s",
      "4.47 m/s",
      "-4.2 m/s",
      "3.53 m/s"
    ],
    "c": [
      0
    ],
    "e": "Average velocity is the change in position divided by the change in time over the given interval: (22.4 - 9.8)/(4.5 - 1.5) = 12.6/3 = 4.2 m/s. Using the full interval [0, 4.5] instead of the specified [1.5, 4.5] gives the 4.47 distractor, which answers a different question."
  },
  {
    "id": "apcalcbc-shared-apcalc-u2-002",
    "unit": "U2",
    "topicCode": "2.2",
    "topic": "Defining the Derivative of a Function and Using Derivative Notation",
    "skill": "3.B",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Let f be a function that is differentiable at x = 3. Which of the following limit expressions is equal to f'(3) by the formal definition of the derivative?",
    "o": [
      "lim(h→0) [f(3+h) - f(3)] / 3",
      "lim(h→0) [f(3+h) - f(3)] / h",
      "lim(h→0) [f(3) - f(3+h)] / h",
      "lim(h→0) [f(3+h) - f(3-h)] / h"
    ],
    "c": [
      1
    ],
    "e": "The definition of the derivative at a point a is f'(a) = lim(h→0) [f(a+h) - f(a)]/h, so with a = 3 this becomes [f(3+h)-f(3)]/h. The third distractor is the symmetric difference quotient, which equals 2f'(3), not f'(3), and is used only for numerical estimation, not the formal definition."
  },
  {
    "id": "apcalcbc-shared-apcalc-u2-003",
    "unit": "U2",
    "topicCode": "2.3",
    "topic": "Estimating Derivatives of a Function at a Point",
    "skill": "2.B",
    "calculatorAllowed": true,
    "type": "s",
    "stimulus": {
      "type": "quantitative",
      "title": "Values of a Differentiable Function g Near x = 1.6",
      "source": "Original simulated data created for AP Exam Practice.",
      "columns": [
        "x",
        "g(x)"
      ],
      "rows": [
        [
          "1.4",
          "3.912"
        ],
        [
          "1.5",
          "4.055"
        ],
        [
          "1.6",
          "4.200"
        ],
        [
          "1.7",
          "4.347"
        ],
        [
          "1.8",
          "4.496"
        ]
      ]
    },
    "q": "The table shows values of a differentiable function g near x = 1.6. Using the data in the table, what is the best estimate for g'(1.6)?",
    "o": [
      "1.47",
      "1.45",
      "1.46",
      "0.292"
    ],
    "c": [
      2
    ],
    "e": "The most accurate estimate from a symmetric table uses the centered difference quotient: [g(1.7) - g(1.5)]/(1.7-1.5) = 0.292/0.2 = 1.46. The 1.47 and 1.45 distractors come from one-sided (forward and backward) difference quotients, which are less accurate estimates of the instantaneous rate of change at 1.6, and 0.292 results from forgetting to divide by the change in x."
  },
  {
    "id": "apcalcbc-shared-apcalc-u2-004",
    "unit": "U2",
    "topicCode": "2.4",
    "topic": "Connecting Differentiability and Continuity — When Derivatives Do and Do Not Exist",
    "skill": "3.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Let f(x) = |x - 2| + 1. Which statement about f at x = 2 is true?",
    "o": [
      "f is differentiable at x = 2 because f is continuous there, and continuity always implies differentiability.",
      "f is neither continuous nor differentiable at x = 2, since f has a sharp corner there.",
      "f is differentiable at x = 2 with f'(2) = 0, since the graph has a minimum point there.",
      "f is continuous at x = 2 but not differentiable at x = 2, since the left-hand and right-hand derivatives at x = 2 are not equal."
    ],
    "c": [
      3
    ],
    "e": "f is continuous everywhere, including at x=2, since |x-2|+1 is a sum of continuous functions. But the left-hand derivative at x=2 is -1 and the right-hand derivative is +1, so the two-sided limit defining f'(2) does not exist, giving a corner. Continuity never guarantees differentiability, so the first distractor states a false converse.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u2-3-4"
  },
  {
    "id": "apcalcbc-shared-apcalc-u2-005",
    "unit": "U2",
    "topicCode": "2.4",
    "topic": "Connecting Differentiability and Continuity — When Derivatives Do and Do Not Exist",
    "skill": "3.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "The function h is defined by h(x) = x^(2/3) for all real numbers. Which statement correctly describes the behavior of h at x = 0?",
    "o": [
      "h is continuous at x = 0 but not differentiable at x = 0, because h'(x) = (2/3)x^(-1/3) increases without bound in magnitude as x approaches 0.",
      "h is not continuous at x = 0 because x^(2/3) is undefined when x = 0.",
      "h is differentiable at x = 0 with h'(0) = 0, since x = 0 is a minimum point of the graph.",
      "h is differentiable everywhere, including at x = 0, because every power function of x is differentiable for all real numbers."
    ],
    "c": [
      0
    ],
    "e": "h(0) = 0 is defined and h is continuous there, but h'(x) = (2/3)x^(-1/3) approaches +infinity from the right and -infinity from the left as x -> 0, so the derivative does not exist (a vertical cusp). Having a minimum point does not by itself force the derivative to exist or equal zero, as this example shows.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u2-3-4"
  },
  {
    "id": "apcalcbc-shared-apcalc-u2-006",
    "unit": "U2",
    "topicCode": "2.5",
    "topic": "Applying the Power Rule",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "If f(x) = 4x⁵ - 3/x² + √(x), what is f'(x)?",
    "o": [
      "20x⁴ - 6/x³ + 1/(2 √(x))",
      "20x⁴ + 6/x³ + 1/(2 √(x))",
      "4x⁴ + 6/x³ + 1/(2 √(x))",
      "20x⁴ + 6/x³ + (1/2) √(x)"
    ],
    "c": [
      1
    ],
    "e": "Rewriting f(x) = 4x⁵ - 3x^(-2) + x^(1/2) and applying the power rule term by term gives f'(x) = 20x⁴ + 6x^(-3) + (1/2)x^(-1/2). The second distractor forgets to multiply by the original exponent 5 on the first term, and the third distractor fails to reduce the exponent of x^(1/2) by 1 when differentiating."
  },
  {
    "id": "apcalcbc-shared-apcalc-u2-007",
    "unit": "U2",
    "topicCode": "2.6",
    "topic": "Derivative Rules: Constant, Sum, Difference, and Constant Multiple",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Let f(x) = 7 and g(x) = 2x³ - 5x + 9. If h(x) = 3g(x) - 4f(x), what is h'(x)?",
    "o": [
      "18x² - 43",
      "18x² + 15",
      "18x² - 15",
      "6x² - 5"
    ],
    "c": [
      2
    ],
    "e": "Since f is a constant function, f'(x) = 0, so h'(x) = 3g'(x) - 4f'(x) = 3(6x² - 5) - 0 = 18x² - 15. The first distractor mistakenly substitutes f(x) = 7 itself instead of f'(x) = 0. The third distractor forgets to multiply g'(x) by the constant factor 3."
  },
  {
    "id": "apcalcbc-shared-apcalc-u2-008",
    "unit": "U2",
    "topicCode": "2.7",
    "topic": "Derivatives of cos x, sin x, e^x, and ln x",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "What is the derivative of f(x) = 5cos(x) - 3e^x + 2ln(x)?",
    "o": [
      "5sin(x) - 3e^x + 2/x",
      "-5sin(x) - 3x·e^(x-1) + 2/x",
      "-5sin(x) - 3e^x + 1/x",
      "-5sin(x) - 3e^x + 2/x"
    ],
    "c": [
      3
    ],
    "e": "Using d/dx[cos x] = -sin x, d/dx[e^x] = e^x, and d/dx[ln x] = 1/x term by term gives f'(x) = -5sin(x) - 3e^x + 2/x. The first distractor drops the negative sign from the derivative of cosine, and the second incorrectly differentiates e^x as if the power rule applied to it instead of using d/dx[e^x] = e^x."
  },
  {
    "id": "apcalcbc-shared-apcalc-u2-009",
    "unit": "U2",
    "topicCode": "2.8",
    "topic": "The Product Rule",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "If f(x) = x³ · e^x, what is f'(x)?",
    "o": [
      "3x² e^x + x³ e^x",
      "3x² e^x",
      "x³ e^x",
      "3x² + e^x"
    ],
    "c": [
      0
    ],
    "e": "By the product rule, f'(x) = (d/dx[x³])·e^x + x³·(d/dx[e^x]) = 3x² e^x + x³ e^x. The first two distractors each keep only one of the two required terms, and the last distractor incorrectly applies the sum rule to a product.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u2-8-9"
  },
  {
    "id": "apcalcbc-shared-apcalc-u2-010",
    "unit": "U2",
    "topicCode": "2.8",
    "topic": "The Product Rule",
    "skill": "2.B",
    "calculatorAllowed": true,
    "type": "s",
    "q": "The functions p and q are differentiable for all real numbers, with p(5) = 3.6, p'(5) = -1.2, q(5) = 2.5, and q'(5) = 4.1. If r(x) = p(x)·q(x), what is r'(5)?",
    "o": [
      "-4.92",
      "11.76",
      "-17.76",
      "9"
    ],
    "c": [
      1
    ],
    "e": "By the product rule, r'(5) = p'(5)q(5) + p(5)q'(5) = (-1.2)(2.5) + (3.6)(4.1) = -3 + 14.76 = 11.76. Multiplying p'(5) and q'(5) together (giving -4.92) or subtracting the two products (giving -17.76) both misapply the product rule structure.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u2-8-9"
  },
  {
    "id": "apcalcbc-shared-apcalc-u2-011",
    "unit": "U2",
    "topicCode": "2.9",
    "topic": "The Quotient Rule",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "If f(x) = (2x² - 1)/(x + 3), what is f'(x)?",
    "o": [
      "(-2x² - 12x - 1)/(x + 3)²",
      "(2x² + 12x + 1)/(x + 3)",
      "(2x² + 12x + 1)/(x + 3)²",
      "(6x² + 12x - 1)/(x + 3)²"
    ],
    "c": [
      2
    ],
    "e": "By the quotient rule, f'(x) = [(4x)(x+3) - (2x²-1)(1)]/(x+3)² = [4x²+12x-2x²+1]/(x+3)² = (2x²+12x+1)/(x+3)². The first distractor results from reversing the order of the two products in the numerator, and the second distractor forgets to square the denominator.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u2-10-11"
  },
  {
    "id": "apcalcbc-shared-apcalc-u2-012",
    "unit": "U2",
    "topicCode": "2.9",
    "topic": "The Quotient Rule",
    "skill": "2.B",
    "calculatorAllowed": true,
    "type": "s",
    "q": "The functions u and v are differentiable for all real numbers, with v(x) ≠ 0, u(-1) = 6.4, u'(-1) = -2.1, v(-1) = 1.6, and v'(-1) = 3.3. If w(x) = u(x)/v(x), what is w'(-1)?",
    "o": [
      "9.5625",
      "-15.3",
      "6.9375",
      "-9.5625"
    ],
    "c": [
      3
    ],
    "e": "By the quotient rule, w'(-1) = [u'(-1)v(-1) - u(-1)v'(-1)]/[v(-1)]² = [(-2.1)(1.6) - (6.4)(3.3)]/(1.6)² = (-3.36 - 21.12)/2.56 = -9.5625. Reversing the order of the numerator terms flips the sign to give 9.5625, and forgetting to square v(-1) in the denominator gives -15.3.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u2-10-11"
  },
  {
    "id": "apcalcbc-shared-apcalc-u2-013",
    "unit": "U2",
    "topicCode": "2.10",
    "topic": "Derivatives of Tangent, Cotangent, Secant, and/or Cosecant",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "What is the derivative of f(x) = tan(x) - 3sec(x)?",
    "o": [
      "sec²(x) - 3sec(x)tan(x)",
      "sec(x)tan(x) - 3sec²(x)",
      "sec²(x) - 3tan(x)",
      "sec²(x) + 3sec(x)tan(x)"
    ],
    "c": [
      0
    ],
    "e": "Using d/dx[tan x] = sec² x and d/dx[sec x] = sec x tan x gives f'(x) = sec²(x) - 3sec(x)tan(x). The first distractor swaps the two derivative formulas, and the second drops the required factor of sec(x) from the derivative of sec(x).",
    "variantGroupId": "apcalcbc-shared-vg-calc-u2-12-13"
  },
  {
    "id": "apcalcbc-shared-apcalc-u2-014",
    "unit": "U2",
    "topicCode": "2.10",
    "topic": "Derivatives of Tangent, Cotangent, Secant, and/or Cosecant",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "What is the derivative of g(x) = 4cot(x) + csc(x)?",
    "o": [
      "-4csc²(x) + csc(x)cot(x)",
      "-4csc²(x) - csc(x)cot(x)",
      "4csc²(x) - csc(x)cot(x)",
      "-4csc(x)cot(x) - csc(x)cot(x)"
    ],
    "c": [
      1
    ],
    "e": "Using d/dx[cot x] = -csc² x and d/dx[csc x] = -csc x cot x gives g'(x) = -4csc²(x) - csc(x)cot(x). The first distractor drops the negative sign from the derivative of csc(x), and the second drops the negative sign from the derivative of cot(x).",
    "variantGroupId": "apcalcbc-shared-vg-calc-u2-12-13"
  },
  {
    "id": "apcalcbc-shared-apcalc-u3-001",
    "unit": "U3",
    "topicCode": "3.1",
    "topic": "The Chain Rule",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Let h(x) = sin(3x² - 1). What is h'(x)?",
    "o": [
      "cos(3x² - 1)",
      "3x² cos(3x² - 1)",
      "6x cos(3x² - 1)",
      "-6x cos(3x² - 1)"
    ],
    "c": [
      2
    ],
    "e": "By the chain rule, the derivative of sin(u) is cos(u) times u prime, where u = 3x² - 1 and u prime = 6x, so h prime(x) = 6x cos(3x² - 1); omitting the factor of 6x or using the original inner function instead of its derivative are common chain rule errors.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u3-0-1"
  },
  {
    "id": "apcalcbc-shared-apcalc-u3-002",
    "unit": "U3",
    "topicCode": "3.1",
    "topic": "The Chain Rule",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "If g(x) = (5x³ + 2x)⁴, what is g'(x)?",
    "o": [
      "(5x³ + 2x)³(15x² + 2)",
      "4(5x³ + 2x)⁴(15x² + 2)",
      "4(5x³ + 2x)³(15x²)",
      "4(5x³ + 2x)³(15x² + 2)"
    ],
    "c": [
      3
    ],
    "e": "The general power rule requires multiplying by the original exponent, reducing that exponent by one, and then multiplying by the derivative of the inner function 5x³+2x, which is 15x²+2; dropping any one of those three factors produces each distractor.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u3-0-1"
  },
  {
    "id": "apcalcbc-shared-apcalc-u3-003",
    "unit": "U3",
    "topicCode": "3.1",
    "topic": "The Chain Rule",
    "skill": "1.C",
    "calculatorAllowed": false,
    "type": "s",
    "q": "If f and g are differentiable functions, which expression correctly gives d/dx[f(g(x))] using proper chain rule notation?",
    "o": [
      "f'(g(x)) · g'(x)",
      "f'(x) · g'(x)",
      "f'(g(x))",
      "f'(g'(x)) · g'(x)"
    ],
    "c": [
      0
    ],
    "e": "The chain rule states that d/dx of f(g(x)) equals f prime(g(x)) times g prime(x): the outer derivative must be evaluated at the inner function g(x), not at x itself, before multiplying by g prime(x); the distractors evaluate f prime at the wrong input or drop the inner-derivative factor."
  },
  {
    "id": "apcalcbc-shared-apcalc-u3-004",
    "unit": "U3",
    "topicCode": "3.2",
    "topic": "Implicit Differentiation",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "If x²y + y³ = 10 defines y implicitly as a function of x, what is dy/dx?",
    "o": [
      "-(2xy + 3y²) / x²",
      "-2xy / (x² + 3y²)",
      "2xy / (x² + 3y²)",
      "-2xy / (3y²)"
    ],
    "c": [
      1
    ],
    "e": "Differentiating both sides requires the product rule on x² y and the chain rule on y³, giving 2xy + x² y prime + 3y² y prime = 0; solving for y prime yields -2xy/(x²+3y²), while forgetting the y prime factor on y³ or dropping the x² term leads to the distractors.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u3-3-4"
  },
  {
    "id": "apcalcbc-shared-apcalc-u3-005",
    "unit": "U3",
    "topicCode": "3.2",
    "topic": "Implicit Differentiation",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "If x² + xy + y² = 7 defines y implicitly as a function of x, what is dy/dx?",
    "o": [
      "-2x / (x + 2y)",
      "(2x + y) / (x + 2y)",
      "-(2x + y) / (x + 2y)",
      "-(2x + 3y) / x"
    ],
    "c": [
      2
    ],
    "e": "Applying the product rule to xy gives y + x y prime, and the chain rule to y² gives 2y y prime, so 2x + y + x y prime + 2y y prime = 0 leads to y prime = -(2x+y)/(x+2y); forgetting the +y term from the product rule or mishandling the chain rule on y² produces the distractors.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u3-3-4"
  },
  {
    "id": "apcalcbc-shared-apcalc-u3-006",
    "unit": "U3",
    "topicCode": "3.2",
    "topic": "Implicit Differentiation",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "If sin(y) + xy = x² defines y implicitly as a function of x, what is dy/dx?",
    "o": [
      "(2x - y) / cos y",
      "2x / (cos y + x)",
      "(2x - y) / (x - cos y)",
      "(2x - y) / (cos y + x)"
    ],
    "c": [
      3
    ],
    "e": "Differentiating gives cos(y) y prime + y + x y prime = 2x, since sin(y) needs the chain rule and xy needs the product rule; solving for y prime gives (2x-y)/(cos y + x), while a sign slip on the cos(y) term or dropping the product-rule term y changes the result.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u3-3-4"
  },
  {
    "id": "apcalcbc-shared-apcalc-u3-007",
    "unit": "U3",
    "topicCode": "3.3",
    "topic": "Differentiating Inverse Functions",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Let f be a differentiable, invertible function with f(1) = 4 and f'(1) = 5. If g = f^(-1), what is g'(4)?",
    "o": [
      "1/5",
      "5",
      "1/4",
      "-1/5"
    ],
    "c": [
      0
    ],
    "e": "Since g(f(x)) = x for inverse functions, differentiating with the chain rule gives g prime(f(x)) f prime(x) = 1, so g prime(4) = g prime(f(1)) = 1/f prime(1) = 1/5; using f prime(1) directly or the function value f(1) instead of its reciprocal derivative are common errors."
  },
  {
    "id": "apcalcbc-shared-apcalc-u3-008",
    "unit": "U3",
    "topicCode": "3.4",
    "topic": "Differentiating Inverse Trigonometric Functions",
    "skill": "1.F",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Let f(x) = arcsin(2x). What is f'(0.2), rounded to three decimal places?",
    "o": [
      "1.091",
      "2.182",
      "-2.182",
      "2.085"
    ],
    "c": [
      1
    ],
    "e": "Since d/dx of arcsin(u) equals u prime over the square root of 1 minus u squared, with u = 2x and u prime = 2, f prime(x) = 2/√(1-4x²); evaluating at x = 0.2 gives 2/√(0.84), approximately 2.182, while omitting the factor of 2 or squaring 2x incorrectly changes the value."
  },
  {
    "id": "apcalcbc-shared-apcalc-u3-009",
    "unit": "U3",
    "topicCode": "3.5",
    "topic": "Selecting Procedures for Calculating Derivatives",
    "skill": "1.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "If y = e^(3x) √(x² + 1), what is dy/dx at x = 2, rounded to one decimal place?",
    "o": [
      "1082.5",
      "2796.5",
      "3067.1",
      "1262.9"
    ],
    "c": [
      2
    ],
    "e": "This requires the product rule on the two factors together with the chain rule inside each factor: y prime = 3e^(3x)√(x²+1) + xe^(3x)/√(x²+1); at x=2 this evaluates to about 3067.1, whereas multiplying the two factors' derivatives together or omitting a chain-rule factor gives smaller totals."
  },
  {
    "id": "apcalcbc-shared-apcalc-u3-010",
    "unit": "U3",
    "topicCode": "3.6",
    "topic": "Calculating Higher-Order Derivatives",
    "skill": "1.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "For the curve defined by x² + y² = 25, what is the value of d²y/dx² at the point (3, 4)?",
    "o": [
      "-25/4",
      "25/64",
      "-9/64",
      "-25/64"
    ],
    "c": [
      3
    ],
    "e": "Differentiating x²+y²=25 implicitly twice gives y prime = -x/y and then y double-prime = -(x²+y²)/y³, which simplifies to -25/y³ using the original equation; at (3,4) this is -25/64, while using y instead of y³ or omitting the y² term produces the distractors."
  },
  {
    "id": "apcalcbc-shared-apcalc-u4-001",
    "unit": "U4",
    "topicCode": "4.1",
    "topic": "Interpreting the Meaning of the Derivative in Context",
    "skill": "3.F",
    "calculatorAllowed": false,
    "type": "s",
    "q": "The temperature of a cup of coffee, in degrees Fahrenheit, t minutes after it is poured, is given by a differentiable function H. What are the units of H'(t), and what does H'(6) = -3 mean in the context of the problem?",
    "o": [
      "Degrees Fahrenheit per minute; at t = 6 minutes, the coffee's temperature is decreasing at a rate of 3°F per minute.",
      "Degrees Fahrenheit; at t = 6 minutes, the temperature of the coffee is 3 degrees below the temperature it had when it was poured.",
      "Minutes per degree Fahrenheit; at t = 6 minutes, the coffee's temperature takes 3 minutes to change by one degree Fahrenheit.",
      "Degrees Fahrenheit per minute; over the interval from t = 0 to t = 6 minutes, the coffee's temperature decreased at an average rate of 3 degrees Fahrenheit per minute."
    ],
    "c": [
      0
    ],
    "e": "H'(t) is the derivative of temperature (in °F) with respect to time (in minutes), so its units are °F per minute. Because H'(6) is an instantaneous rate at the single moment t = 6, it does not describe a temperature value, a total change, or an average rate over an interval."
  },
  {
    "id": "apcalcbc-shared-apcalc-u4-002",
    "unit": "U4",
    "topicCode": "4.2",
    "topic": "Straight-Line Motion: Connecting Position, Velocity, and Acceleration",
    "skill": "3.F",
    "calculatorAllowed": true,
    "type": "s",
    "stimulusGroupId": "apcalcbc-shared-apcalc-g-u4-velocity-table",
    "stimulus": {
      "type": "quantitative",
      "title": "Velocity of a Particle Moving Along a Line",
      "source": "Original simulated data created for AP Exam Practice.",
      "columns": [
        "t (seconds)",
        "v(t) (meters per second)"
      ],
      "rows": [
        [
          "0",
          "15"
        ],
        [
          "2",
          "8"
        ],
        [
          "4",
          "-2"
        ],
        [
          "6",
          "-10"
        ],
        [
          "8",
          "-4"
        ]
      ]
    },
    "q": "The table above gives the velocity v(t), in meters per second, of a particle moving along a straight line at selected times t. Based on the table, what does the value v(4) = -2 mean in the context of the problem?",
    "o": [
      "At t = 4 seconds, the particle's position is 2 meters to the left of the origin.",
      "At t = 4 seconds, the particle is moving in the negative direction at a speed of 2 meters per second.",
      "Between t = 0 and t = 4 seconds, the particle's average velocity was -2 meters per second.",
      "At t = 4 seconds, the particle's acceleration is -2 meters per second per second."
    ],
    "c": [
      1
    ],
    "e": "The table records velocity, not position or acceleration, so v(4) = -2 describes the particle's instantaneous motion at exactly t = 4: a negative velocity means the particle moves in the negative direction, and its speed is the absolute value of that velocity, 2 m/s."
  },
  {
    "id": "apcalcbc-shared-apcalc-u4-003",
    "unit": "U4",
    "topicCode": "4.2",
    "topic": "Straight-Line Motion: Connecting Position, Velocity, and Acceleration",
    "skill": "2.B",
    "calculatorAllowed": true,
    "type": "s",
    "stimulusGroupId": "apcalcbc-shared-apcalc-g-u4-velocity-table",
    "stimulus": {
      "type": "quantitative",
      "title": "Velocity of a Particle Moving Along a Line",
      "source": "Original simulated data created for AP Exam Practice.",
      "columns": [
        "t (seconds)",
        "v(t) (meters per second)"
      ],
      "rows": [
        [
          "0",
          "15"
        ],
        [
          "2",
          "8"
        ],
        [
          "4",
          "-2"
        ],
        [
          "6",
          "-10"
        ],
        [
          "8",
          "-4"
        ]
      ]
    },
    "q": "Using the data in the table above, what is the approximate acceleration of the particle, in m/s², at t = 4 seconds, found using the average rate of change of velocity over the interval 2 ≤ t ≤ 6?",
    "o": [
      "-2.25 m/s²",
      "-4 m/s²",
      "-4.5 m/s²",
      "-5 m/s²"
    ],
    "c": [
      2
    ],
    "e": "The symmetric difference quotient (v(6) - v(2))/(6 - 2) = (-10 - 8)/4 = -4.5 approximates the acceleration at t = 4 by using the two table values that straddle t = 4, as the problem specifies; dividing by the wrong interval width or using only a one-sided difference produces the incorrect distractor values."
  },
  {
    "id": "apcalcbc-shared-apcalc-u4-004",
    "unit": "U4",
    "topicCode": "4.2",
    "topic": "Straight-Line Motion: Connecting Position, Velocity, and Acceleration",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "A particle moves along the x-axis so that its position at time t ≥ 0 seconds is given by x(t) = t³ - 6t² + 9t, where x(t) is measured in meters. For which values of t is the particle moving in the negative direction?",
    "o": [
      "0 ≤ t < 1 or t > 3",
      "t < 1 or t > 3",
      "t = 1 and t = 3 only",
      "1 < t < 3"
    ],
    "c": [
      3
    ],
    "e": "The velocity is v(t) = x'(t) = 3t² - 12t + 9 = 3(t - 1)(t - 3), an upward-opening parabola in t that is negative strictly between its two zeros, so the particle moves in the negative direction only when 1 < t < 3, not outside that interval or only at the zeros themselves.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u4-3-4"
  },
  {
    "id": "apcalcbc-shared-apcalc-u4-005",
    "unit": "U4",
    "topicCode": "4.2",
    "topic": "Straight-Line Motion: Connecting Position, Velocity, and Acceleration",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "A particle moves along the x-axis so that its position at time t ≥ 0 seconds is given by x(t) = t³ - 9t² + 24t, where x(t) is measured in meters. For which values of t is the particle moving in the negative direction?",
    "o": [
      "2 < t < 4",
      "0 ≤ t < 2 or t > 4",
      "t < 2 or t > 4",
      "t = 2 and t = 4 only"
    ],
    "c": [
      0
    ],
    "e": "The velocity is v(t) = x'(t) = 3t² - 18t + 24 = 3(t - 2)(t - 4), an upward-opening parabola in t whose values are negative strictly between its zeros, so the particle moves in the negative direction only for 2 < t < 4, not outside that interval or only at the zeros themselves.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u4-3-4"
  },
  {
    "id": "apcalcbc-shared-apcalc-u4-006",
    "unit": "U4",
    "topicCode": "4.3",
    "topic": "Rates of Change in Applied Contexts Other than Motion",
    "skill": "3.F",
    "calculatorAllowed": false,
    "type": "s",
    "q": "At t=3 s, dV/dt=15 cm³/s for a balloon whose volume V is differentiable in time. Which statement interprets the derivative correctly?",
    "o": [
      "At that instant V=15 cm³",
      "At that instant V is increasing at 15 cm³/s",
      "During the first 3 s, V increased by 15 cm³ in total",
      "At that instant 15 s are required for V to increase by 1 cm³"
    ],
    "c": [
      1
    ],
    "e": "dV/dt is the instantaneous rate of change of volume with respect to time. Thus at t=3 seconds the volume is increasing at 15 cubic centimeters per second. It is neither the volume itself, an accumulated change over the first three seconds, nor the reciprocal rate."
  },
  {
    "id": "apcalcbc-shared-apcalc-u4-007",
    "unit": "U4",
    "topicCode": "4.4",
    "topic": "Introduction to Related Rates",
    "skill": "2.C",
    "calculatorAllowed": false,
    "type": "s",
    "q": "A spherical snowball melts so that its volume V decreases over time t. The volume of a sphere of radius r is V = (4/3)πr³. Which equation results from differentiating both sides of this equation with respect to t?",
    "o": [
      "dV/dt = 4πr²",
      "dV/dt = (4/3)πr² (dr/dt)",
      "dV/dt = 4πr² (dr/dt)",
      "dV/dt = 4π(3r²)(dr/dt)²"
    ],
    "c": [
      2
    ],
    "e": "Differentiating V = (4/3)πr³ implicitly with respect to t requires the chain rule because r is itself a function of t: d/dt[(4/3)πr³] = (4/3)π(3r²)(dr/dt), and simplifying (4/3)(3) = 4 gives dV/dt = 4πr²(dr/dt), with dr/dt appearing to the first power, not squared or omitted."
  },
  {
    "id": "apcalcbc-shared-apcalc-u4-008",
    "unit": "U4",
    "topicCode": "4.5",
    "topic": "Solving Related Rates Problems",
    "skill": "1.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "A 13-foot ladder leans against a vertical wall, with the bottom of the ladder on level ground. The bottom of the ladder slides away from the wall at a constant rate of 2 feet per second. At the instant when the bottom of the ladder is 5 feet from the wall, how fast is the top of the ladder sliding down the wall?",
    "o": [
      "5/12 ft/sec",
      "24/5 ft/sec",
      "2 ft/sec",
      "5/6 ft/sec"
    ],
    "c": [
      3
    ],
    "e": "Let x and y be the distances from the wall to the bottom and top of the ladder. Since x² + y² = 169, when x = 5, y = 12. Differentiating gives 2x(dx/dt) + 2y(dy/dt) = 0, so dy/dt = -(x/y)(dx/dt) = -(5/12)(2) = -5/6, meaning the top slides down at 5/6 ft/sec.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u4-7-8"
  },
  {
    "id": "apcalcbc-shared-apcalc-u4-009",
    "unit": "U4",
    "topicCode": "4.5",
    "topic": "Solving Related Rates Problems",
    "skill": "1.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "A 10-foot ladder leans against a vertical wall, with the bottom of the ladder on level ground. The bottom of the ladder slides away from the wall at a constant rate of 2 feet per second. At the instant when the bottom of the ladder is 6 feet from the wall, how fast is the top of the ladder sliding down the wall?",
    "o": [
      "3/2 ft/sec",
      "3/4 ft/sec",
      "8/3 ft/sec",
      "2 ft/sec"
    ],
    "c": [
      0
    ],
    "e": "Let x and y be the distances from the wall to the bottom and top of the ladder. Since x² + y² = 100, when x = 6, y = 8. Differentiating gives 2x(dx/dt) + 2y(dy/dt) = 0, so dy/dt = -(x/y)(dx/dt) = -(6/8)(2) = -3/2, meaning the top slides down at 3/2 ft/sec.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u4-7-8"
  },
  {
    "id": "apcalcbc-shared-apcalc-u4-010",
    "unit": "U4",
    "topicCode": "4.5",
    "topic": "Solving Related Rates Problems",
    "skill": "1.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Oil spilled from a tanker spreads outward in the shape of a circle on the surface of the water. The radius of the circular oil slick is increasing at a constant rate of 3 meters per minute. At the instant when the radius is 50 meters, how fast is the area of the oil slick increasing?",
    "o": [
      "150π m²/min",
      "300π m²/min",
      "6π m²/min",
      "300 m²/min"
    ],
    "c": [
      1
    ],
    "e": "Since A = πr², differentiating with respect to time gives dA/dt = 2πr(dr/dt); substituting r = 50 and dr/dt = 3 gives dA/dt = 2π(50)(3) = 300π square meters per minute, roughly 942.5 m²/min."
  },
  {
    "id": "apcalcbc-shared-apcalc-u4-011",
    "unit": "U4",
    "topicCode": "4.6",
    "topic": "Approximating Values of a Function Using Local Linearity and Linearization",
    "skill": "1.F",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Let f(x) = √x. The tangent line to the graph of f at x = 25 is used to approximate values of f near x = 25. Using this linear approximation, estimate the value of √26.5.",
    "o": [
      "5.1",
      "5.3",
      "5.15",
      "5.03"
    ],
    "c": [
      2
    ],
    "e": "Since f(25) = 5 and f'(x) = 1/(2√x) so f'(25) = 0.1, the linearization is L(x) = 5 + 0.1(x - 25); evaluating at x = 26.5 gives L(26.5) = 5 + 0.1(1.5) = 5.15, whereas omitting the factor of 1/2 or misreading the interval width produces the other listed values."
  },
  {
    "id": "apcalcbc-shared-apcalc-u4-012",
    "unit": "U4",
    "topicCode": "4.7",
    "topic": "Using L'Hopital's Rule for Determining Limits in Indeterminate Forms",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "What is the value of lim (x→0) (1 - cos(2x)) / x² ?",
    "o": [
      "0",
      "1",
      "-2",
      "2"
    ],
    "c": [
      3
    ],
    "e": "Direct substitution gives the indeterminate form 0/0, so L'Hopital's Rule applies: differentiating gives 2sin(2x)/(2x), which is again 0/0 at x = 0, so applying L'Hopital's Rule a second time gives 4cos(2x)/2, which evaluates to 4(1)/2 = 2 as x approaches 0."
  },
  {
    "id": "apcalcbc-shared-apcalc-u5-001",
    "unit": "U5",
    "topicCode": "5.1",
    "topic": "Using the Mean Value Theorem",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Let f(x) = x² on the closed interval [1, 5]. Since f is a polynomial, it is continuous on [1, 5] and differentiable on (1, 5), so the Mean Value Theorem applies. What value of c in (1, 5) satisfies f'(c) = [f(5) - f(1)] / (5 - 1)?",
    "o": [
      "c = 3",
      "c = 6",
      "c = 2",
      "c = 4"
    ],
    "c": [
      0
    ],
    "e": "The average rate of change is (25-1)/(5-1)=6. Since f'(x)=2x, setting 2c=6 gives c=3, which lies in (1,5) as MVT requires; c=6 is the average rate itself, not the point where it is attained.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u5-0-1"
  },
  {
    "id": "apcalcbc-shared-apcalc-u5-002",
    "unit": "U5",
    "topicCode": "5.1",
    "topic": "Using the Mean Value Theorem",
    "skill": "1.F",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Let f(x) = x³ - 2x on the closed interval [0, 2]. f is continuous on [0,2] and differentiable on (0,2), so the Mean Value Theorem guarantees at least one c in (0,2) with f'(c) equal to the average rate of change of f on [0,2]. Find this value of c, rounded to three decimal places.",
    "o": [
      "c ≈ -1.155",
      "c ≈ 1.155",
      "c ≈ 1.333",
      "c = 2"
    ],
    "c": [
      1
    ],
    "e": "Average rate = [f(2)-f(0)]/2 = 2. Solving 3c²-2=2 gives c=±2√3/3≈±1.155; only the positive root lies in (0,2), so c≈1.155 is the value MVT guarantees.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u5-0-1"
  },
  {
    "id": "apcalcbc-shared-apcalc-u5-003",
    "unit": "U5",
    "topicCode": "5.2",
    "topic": "Extreme Value Theorem, Global vs Local Extrema, and Critical Points",
    "skill": "3.B",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Let f(x) = 1/(x-2) on the closed interval [0, 4]. Which statement correctly evaluates whether the Extreme Value Theorem guarantees that f has an absolute maximum and an absolute minimum on [0, 4]?",
    "o": [
      "The EVT applies because the interval is closed and both endpoint values exist.",
      "The EVT fails because differentiability at x=0 and x=4 is required.",
      "The EVT does not apply, because f is not continuous on [0,4]; f is undefined at x=2, which is in the interval.",
      "The EVT applies because a rational function is continuous at each point where its formula is defined."
    ],
    "c": [
      2
    ],
    "e": "EVT requires continuity on the entire closed interval. Since f has a vertical asymptote (an undefined value) at x=2, which lies inside [0,4], f fails to be continuous there, so EVT's hypothesis is not met and it gives no guarantee."
  },
  {
    "id": "apcalcbc-shared-apcalc-u5-004",
    "unit": "U5",
    "topicCode": "5.2",
    "topic": "Extreme Value Theorem, Global vs Local Extrema, and Critical Points",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Let f(x) = (x-1)^(2/3), defined for all real numbers. What are the critical number(s) of f?",
    "o": [
      "There are no critical numbers, since f'(x) is never equal to 0.",
      "x = 0, since f(0) is where the function's base value equals 1.",
      "x = 1 and x = -1, by symmetry of the exponent.",
      "x = 1 only"
    ],
    "c": [
      3
    ],
    "e": "f'(x) = (2/3)(x-1)^(-1/3), which is never 0 but is undefined at x=1; since f itself is defined at x=1 (f(1)=0), x=1 qualifies as a critical number even though f' does not equal zero there."
  },
  {
    "id": "apcalcbc-shared-apcalc-u5-005",
    "unit": "U5",
    "topicCode": "5.3",
    "topic": "Determining Intervals on Which a Function Is Increasing or Decreasing",
    "skill": "2.E",
    "calculatorAllowed": false,
    "type": "s",
    "stimulusGroupId": "apcalcbc-shared-apcalc-g-u5-derivative-graph",
    "stimulus": {
      "type": "visual",
      "title": "Graph of f' on [-4, 6]",
      "source": "Original diagram created for AP Exam Practice.",
      "visualKind": "graph",
      "image": "assets/ap-calculus-ab/f-prime-graph.svg",
      "description": "The curve plotted is the derivative f'(x) of a twice-differentiable function f, graphed on the closed interval from x = -4 to x = 6. Only the shape and sign pattern of f' are shown; no equation for f or f' is printed on the figure itself.",
      "alt": "A curve shows f prime of x on the interval from negative four to six. The curve starts positive at the left endpoint, crosses zero at x equals negative one, stays negative until crossing zero again at x equals two, stays positive until crossing zero again at x equals four, then stays negative through the right endpoint."
    },
    "q": "The figure shows the graph of f'(x), the derivative of f, on the interval [-4, 6]. Based on the graph, on which of the following intervals is f increasing?",
    "o": [
      "(2, 4)",
      "(-1, 2)",
      "(4, 6)",
      "(-4, 6)"
    ],
    "c": [
      0
    ],
    "e": "f is increasing exactly where f'(x) > 0. The graph shows f'(x) > 0 on (2,4), while f'(x) < 0 on (-1,2) and (4,6), so f is actually decreasing on those intervals, not increasing throughout the whole domain."
  },
  {
    "id": "apcalcbc-shared-apcalc-u5-006",
    "unit": "U5",
    "topicCode": "5.4",
    "topic": "Using the First Derivative Test to Determine Relative (Local) Extrema",
    "skill": "2.E",
    "calculatorAllowed": false,
    "type": "s",
    "stimulusGroupId": "apcalcbc-shared-apcalc-g-u5-derivative-graph",
    "stimulus": {
      "type": "visual",
      "title": "Graph of f' on [-4, 6]",
      "source": "Original diagram created for AP Exam Practice.",
      "visualKind": "graph",
      "image": "assets/ap-calculus-ab/f-prime-graph.svg",
      "description": "The curve plotted is the derivative f'(x) of a twice-differentiable function f, graphed on the closed interval from x = -4 to x = 6. Only the shape and sign pattern of f' are shown; no equation for f or f' is printed on the figure itself.",
      "alt": "A curve shows f prime of x on the interval from negative four to six. The curve starts positive at the left endpoint, crosses zero at x equals negative one, stays negative until crossing zero again at x equals two, stays positive until crossing zero again at x equals four, then stays negative through the right endpoint."
    },
    "q": "Using the same graph of f'(x) on [-4, 6], at which x-value does f have a local maximum?",
    "o": [
      "x = 2",
      "x = -1",
      "x = -4",
      "x = 6"
    ],
    "c": [
      1
    ],
    "e": "By the First Derivative Test, f has a local maximum where f' changes from positive to negative, which occurs at x=-1. At x=2, f' changes from negative to positive (a local minimum), and at the endpoints x=-4 and x=6, f' does not change sign nearby, so neither is an interior extremum."
  },
  {
    "id": "apcalcbc-shared-apcalc-u5-007",
    "unit": "U5",
    "topicCode": "5.4",
    "topic": "Using the First Derivative Test to Determine Relative (Local) Extrema",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Let f(x) = 2x³ - 3x² - 12x + 5. Use the First Derivative Test to determine the behavior of f at its critical number x = -1.",
    "o": [
      "f has a local minimum at x = -1, since f'(x) changes from negative to positive there.",
      "f has neither a local max nor min at x = -1, since f''(-1) = 0 as well.",
      "f has a local maximum at x = -1, since f'(x) changes from positive to negative there.",
      "f has a local maximum at x = -1, since f(-1) is greater than f(2)."
    ],
    "c": [
      2
    ],
    "e": "f'(x) = 6(x-2)(x+1), so f'(-2)=24>0 and f'(0)=-12<0, showing f' changes from positive to negative at x=-1, which by the First Derivative Test means f has a local maximum there; note f''(-1)=-18, not 0."
  },
  {
    "id": "apcalcbc-shared-apcalc-u5-008",
    "unit": "U5",
    "topicCode": "5.5",
    "topic": "Using the Candidates Test to Determine Absolute (Global) Extrema",
    "skill": "3.D",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Let p(x) = x³ - 4x² + 2 on the closed interval [-1, 3]. Using the Candidates Test, what is the absolute minimum value of p on this interval?",
    "o": [
      "-7, attained at the endpoint x = 3",
      "-3, attained at the endpoint x = -1",
      "2, attained at the critical point x = 0",
      "-202/27 ≈ -7.481, attained at x = 8/3"
    ],
    "c": [
      3
    ],
    "e": "p'(x)=3x²-8x=x(3x-8) gives critical points x=0 and x=8/3, both in [-1,3]. Evaluating all candidates: p(-1)=-3, p(0)=2, p(8/3)=-202/27≈-7.481, p(3)=-7. The smallest is -202/27 at x=8/3, not the endpoint x=3.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u5-7-8"
  },
  {
    "id": "apcalcbc-shared-apcalc-u5-009",
    "unit": "U5",
    "topicCode": "5.5",
    "topic": "Using the Candidates Test to Determine Absolute (Global) Extrema",
    "skill": "3.D",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Let p(x) = x³ - 6x on the closed interval [-3, 1]. Using the Candidates Test, what is the absolute maximum value of p on this interval?",
    "o": [
      "4√2 ≈ 5.657, attained at x = -√2",
      "-9, attained at the endpoint x = -3",
      "-5, attained at the endpoint x = 1",
      "-4√2 ≈ -5.657, attained at x = -√2"
    ],
    "c": [
      0
    ],
    "e": "p'(x)=3x²-6=0 gives x=±√2, but only x=-√2 lies in [-3,1]. Checking all candidates: p(-3)=-9, p(-√2)=4√2≈5.657, p(1)=-5. The largest value is 4√2 at x=-√2, not either endpoint.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u5-7-8"
  },
  {
    "id": "apcalcbc-shared-apcalc-u5-010",
    "unit": "U5",
    "topicCode": "5.6",
    "topic": "Determining Concavity",
    "skill": "2.E",
    "calculatorAllowed": false,
    "type": "s",
    "stimulusGroupId": "apcalcbc-shared-apcalc-g-u5-sign-table",
    "stimulus": {
      "type": "quantitative",
      "title": "Values of f, f', and f'' at Selected x-values on [-2, 6]",
      "source": "Original simulated data created for AP Exam Practice.",
      "columns": [
        "x",
        "f(x)",
        "f'(x)",
        "f''(x)"
      ],
      "rows": [
        [
          "-2",
          "1",
          "4",
          "-3"
        ],
        [
          "0",
          "6",
          "1",
          "-1"
        ],
        [
          "2",
          "7",
          "0",
          "0"
        ],
        [
          "4",
          "8",
          "1",
          "2"
        ],
        [
          "6",
          "15",
          "5",
          "4"
        ]
      ],
      "note": "Assume f' and f'' do not change sign between consecutive listed x-values except where the table indicates a sign change."
    },
    "q": "The table gives values of a twice-differentiable function f and its derivatives f' and f'' at selected x-values on [-2, 6]. Assume f' and f'' do not change sign between consecutive listed x-values except where the table indicates a sign change. On which interval is the graph of f concave down?",
    "o": [
      "(2, 6)",
      "(-2, 2)",
      "(-2, 6)",
      "(0, 4)"
    ],
    "c": [
      1
    ],
    "e": "The graph of f is concave down where f''(x) < 0. The table shows f''=-3 at x=-2 and f''=-1 at x=0, both negative, then f''=0 at x=2 and f'' becomes positive (2 and 4) afterward, so f is concave down exactly on (-2,2), not on all of (0,4) or the whole domain."
  },
  {
    "id": "apcalcbc-shared-apcalc-u5-011",
    "unit": "U5",
    "topicCode": "5.7",
    "topic": "Using the Second Derivative Test to Determine Extrema",
    "skill": "3.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Let f(x) = x³ - 3x² - 9x + 1. Which of the following is a correctly notated justification, using the Second Derivative Test, that f has a local maximum at x = -1?",
    "o": [
      "Since f''(-1) = 0 and f'(-1) = -12 < 0, f has a local maximum at x = -1.",
      "Since f'(-1) = -12 < 0, f has a local maximum at x = -1.",
      "Since f'(-1) = 0 and f''(-1) = -12 < 0, f has a local maximum at x = -1.",
      "Since f'(-1) = 0 and f''(-1) = -12 < 0, f has a local minimum at x = -1."
    ],
    "c": [
      2
    ],
    "e": "A correct Second Derivative Test justification must state both that x=-1 is a critical point (f'(-1)=0) and that f''(-1)<0, and must correctly conclude 'local maximum' from a negative second derivative; the distractors swap the roles of f' and f'', omit the critical-point condition, or flip the conclusion.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u5-10-11"
  },
  {
    "id": "apcalcbc-shared-apcalc-u5-012",
    "unit": "U5",
    "topicCode": "5.7",
    "topic": "Using the Second Derivative Test to Determine Extrema",
    "skill": "3.B",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Let h(x) = x⁴. The Second Derivative Test is applied at the critical number x=0. Which statement correctly describes the outcome?",
    "o": [
      "The test shows x=0 is a local maximum, since h''(0)=0 indicates the graph is concave down there.",
      "The test shows x=0 is neither a local max nor min, since h''(0)=0 always rules out an extremum.",
      "The test shows x=0 is a local minimum, since h''(0)=0 confirms the graph is concave up there.",
      "The test is inconclusive because h''(0) = 0; applying the First Derivative Test instead shows h' changes from negative to positive at x=0, so x=0 is a local minimum."
    ],
    "c": [
      3
    ],
    "e": "h'(x)=4x³ and h''(x)=12x², so h''(0)=0, which makes the Second Derivative Test inconclusive; it does not by itself mean concave up, concave down, or 'no extremum.' Checking h' shows h'(-1)=-4<0 and h'(1)=4>0, a sign change from negative to positive, so x=0 is in fact a local minimum by the First Derivative Test.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u5-10-11"
  },
  {
    "id": "apcalcbc-shared-apcalc-u5-013",
    "unit": "U5",
    "topicCode": "5.8",
    "topic": "Sketching Graphs of Functions and Their Derivatives",
    "skill": "2.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Suppose f is twice differentiable for all real x, with f'(x) > 0 for every x and f''(x) < 0 for every x. Which of the following best describes the graph of f?",
    "o": [
      "The graph is increasing everywhere, rising less and less steeply as x increases (always concave down).",
      "The graph is decreasing everywhere, falling less and less steeply as x increases (concave up throughout).",
      "The graph is increasing everywhere, rising more and more steeply as x increases (concave up throughout).",
      "The graph increases, reaches a local maximum, and then decreases."
    ],
    "c": [
      0
    ],
    "e": "f'(x)>0 everywhere means f is increasing on its entire domain, with no critical points, so a local maximum is impossible; f''(x)<0 everywhere means the graph is concave down, so the increasing rate slows rather than accelerates as x grows."
  },
  {
    "id": "apcalcbc-shared-apcalc-u5-014",
    "unit": "U5",
    "topicCode": "5.9",
    "topic": "Connecting a Function, Its First Derivative, and Its Second Derivative",
    "skill": "3.E",
    "calculatorAllowed": false,
    "type": "s",
    "stimulusGroupId": "apcalcbc-shared-apcalc-g-u5-sign-table",
    "stimulus": {
      "type": "quantitative",
      "title": "Values of f, f', and f'' at Selected x-values on [-2, 6]",
      "source": "Original simulated data created for AP Exam Practice.",
      "columns": [
        "x",
        "f(x)",
        "f'(x)",
        "f''(x)"
      ],
      "rows": [
        [
          "-2",
          "1",
          "4",
          "-3"
        ],
        [
          "0",
          "6",
          "1",
          "-1"
        ],
        [
          "2",
          "7",
          "0",
          "0"
        ],
        [
          "4",
          "8",
          "1",
          "2"
        ],
        [
          "6",
          "15",
          "5",
          "4"
        ]
      ],
      "note": "Assume f' and f'' do not change sign between consecutive listed x-values except where the table indicates a sign change."
    },
    "q": "Using the same table of values for f, f', and f'' on [-2, 6], which statement about f must be true?",
    "o": [
      "f has a local maximum at x = 2, since f'(2) = 0.",
      "f has a point of inflection at x = 2, since f''(x) changes sign from negative to positive there.",
      "f has a local minimum at x = 2, since f''(2) = 0.",
      "f is decreasing on (-2, 0), since f''(x) < 0 on that interval."
    ],
    "c": [
      1
    ],
    "e": "f''(x) is negative at x=-2 and x=0, then zero at x=2, then positive at x=4 and x=6, so concavity switches from down to up at x=2, giving a genuine inflection point. Although f'(2)=0, f' stays nonnegative on both sides (1 before, 1 after), so it never changes sign and x=2 is not a local extremum; concavity does not determine whether f is increasing or decreasing, which depends on f', not f''."
  },
  {
    "id": "apcalcbc-shared-apcalc-u5-015",
    "unit": "U5",
    "topicCode": "5.12",
    "topic": "Exploring Behaviors of Implicit Relations",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "A curve is defined implicitly by x² + y² - 4x - 6y + 4 = 0. At which x-value(s) does the curve have a horizontal tangent line?",
    "o": [
      "x = -1 and x = 5 (these are the x-values where the tangent lines are actually vertical)",
      "x = 3 (this is the y-coordinate of the curve's center, not its x-coordinate)",
      "x = 2 (at the points (2, 0) and (2, 6))",
      "x = 0 (this is a y-coordinate of one point on the curve, not the correct x-value)"
    ],
    "c": [
      2
    ],
    "e": "Differentiating implicitly: 2x+2yy'-4-6y'=0, so y'=(2-x)/(y-3). A horizontal tangent requires the numerator to equal zero (with a nonzero denominator): x=2, occurring at the points (2,0) and (2,6). Setting the denominator y-3=0 instead gives x=-1 and x=5, which are where the tangent line is vertical, not horizontal."
  },
  {
    "id": "apcalcbc-shared-apcalc-u5-016",
    "unit": "U5",
    "topicCode": "5.10",
    "topic": "Introduction to Optimization Problems",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "A rectangular garden will be built against the side of a house, so fencing is needed on only the three sides that do not border the house. A total of 120 feet of fencing is available. Let x be the length (in feet) of the side of the garden parallel to the house. Which function gives the area A(x) of the garden, for 0 < x < 120?",
    "o": [
      "A(x) = 120x - x²",
      "A(x) = x(60 - x)",
      "A(x) = 30x - x²/4",
      "A(x) = 60x - x²/2"
    ],
    "c": [
      3
    ],
    "e": "The fencing constraint is x + 2y = 120 (one side of length x plus two sides of length y), so y=60-x/2. Area = xy = x(60-x/2) = 60x - x²/2. The distractor 120x-x² wrongly assumes fencing is needed on all four sides, and x(60-x) drops the factor of 1/2 when solving for y."
  },
  {
    "id": "apcalcbc-shared-apcalc-u5-017",
    "unit": "U5",
    "topicCode": "5.11",
    "topic": "Solving Optimization Problems",
    "skill": "1.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "A cylindrical can with a top and bottom must hold a volume of 500 cubic centimeters. Find the radius r (in cm, to two decimal places) that minimizes the amount of material used to make the can (i.e., minimizes the total surface area), and confirm this radius gives a minimum.",
    "o": [
      "r ≈ 4.30 cm",
      "r ≈ 5.42 cm",
      "r ≈ 8.92 cm",
      "r ≈ 79.58 cm"
    ],
    "c": [
      0
    ],
    "e": "With h=500/(πr²), surface area is S(r)=2πr²+1000/r. Solving S'(r)=4πr-1000/r²=0 gives r³=250/π, so r=(250/π)^(1/3)≈4.30 cm; since S''(r)=4π+2000/r³>0 for all r>0, this critical point is a minimum. The distractor 79.58 is the value of r³ before taking the cube root, a common final-step omission.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u5-16-17"
  },
  {
    "id": "apcalcbc-shared-apcalc-u5-018",
    "unit": "U5",
    "topicCode": "5.11",
    "topic": "Solving Optimization Problems",
    "skill": "1.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "An open-top box with a square base must have a volume of 50,000 cubic centimeters. Find the side length x (in cm, to two decimal places) of the base that minimizes the total surface area of the box (base plus four sides), and confirm this value gives a minimum.",
    "o": [
      "x ≈ 29.24 cm",
      "x ≈ 46.42 cm",
      "x ≈ 92.83 cm",
      "x = 100,000 cm"
    ],
    "c": [
      1
    ],
    "e": "With h=50000/x², surface area is S(x)=x²+4x·(50000/x²)=x²+200000/x. Solving S'(x)=2x-200000/x²=0 gives x³=100000, so x=(100000)^(1/3)≈46.42 cm; since S''(x)=2+400000/x³>0 for all x>0, this is a minimum. The distractor 100,000 is the unsimplified value of x³, with the cube root never taken.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u5-16-17"
  },
  {
    "id": "apcalcbc-shared-apcalc-u6-001",
    "unit": "U6",
    "topicCode": "6.1",
    "topic": "Integration and Accumulation of Change",
    "skill": "1.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Water is pumped out of a storage tank at a rate of r(t) = 4 - 0.2t gallons per minute, where t is measured in minutes for 0 ≤ t ≤ 15. Which of the following expressions gives the total number of gallons pumped out of the tank during the first 10 minutes?",
    "o": [
      "r(10) - r(0)",
      "∫ from 0 to 10 of r'(t) dt",
      "∫ from 0 to 10 of r(t) dt",
      "(1/10) ∫ from 0 to 10 of r(t) dt"
    ],
    "c": [
      2
    ],
    "e": "Total accumulated change equals the integral of the rate over the interval, so gallons pumped out equal ∫r(t)dt from 0 to 10; r(10)-r(0) instead gives the change in the rate itself rather than the accumulated amount, integrating r'(t) recovers only r(10)-r(0) again by the Net Change Theorem, and dividing by 10 computes an average rate, not a total quantity."
  },
  {
    "id": "apcalcbc-shared-apcalc-u6-002",
    "unit": "U6",
    "topicCode": "6.2",
    "topic": "Integration and Accumulation of Change",
    "skill": "1.F",
    "calculatorAllowed": true,
    "type": "s",
    "stimulusGroupId": "apcalcbc-shared-apcalc-g-u6-velocity-table",
    "stimulus": {
      "type": "quantitative",
      "title": "Velocity of a Particle Moving Along a Straight Line",
      "source": "Original simulated data created for AP Exam Practice.",
      "columns": [
        "t (seconds)",
        "v(t) (m/s)"
      ],
      "rows": [
        [
          "0",
          "2"
        ],
        [
          "3",
          "5"
        ],
        [
          "6",
          "9"
        ],
        [
          "9",
          "7"
        ],
        [
          "12",
          "4"
        ]
      ],
      "note": "Assume v(t) changes monotonically between each pair of consecutive listed times (that is, v does not rise and then fall, or fall and then rise, between two listed times)."
    },
    "q": "The table gives selected values of the velocity v(t), in meters per second, of a particle moving along a straight line, recorded at 3-second intervals. Use a left Riemann sum with the four subintervals indicated by the table to estimate the total distance, in meters, traveled by the particle from t = 0 to t = 12 seconds.",
    "o": [
      "75 m",
      "72 m",
      "81 m",
      "69 m"
    ],
    "c": [
      3
    ],
    "e": "A left Riemann sum uses the velocity at the left endpoint of each subinterval, giving 3(v(0)+v(3)+v(6)+v(9)) = 3(2+5+9+7) = 69 meters; using the right endpoints instead gives 75 (a right sum), averaging the left and right sums gives 72 (the trapezoidal estimate), and multiplying by all five table values instead of just the first four gives 81, which double counts a subinterval."
  },
  {
    "id": "apcalcbc-shared-apcalc-u6-003",
    "unit": "U6",
    "topicCode": "6.2",
    "topic": "Integration and Accumulation of Change",
    "skill": "1.F",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Oil leaks from a damaged tanker at a rate L(t), measured in liters per hour, where t is measured in hours. Selected values are given: L(0) = 50, L(2) = 42, L(4) = 35, L(6) = 25, L(8) = 15. Using a right Riemann sum with the four subintervals indicated by the data, estimate the total amount of oil, in liters, that leaked during the first 8 hours.",
    "o": [
      "234 liters",
      "304 liters",
      "269 liters",
      "117 liters"
    ],
    "c": [
      0
    ],
    "e": "A right Riemann sum uses the rate at the right endpoint of each 2-hour subinterval: 2(L(2)+L(4)+L(6)+L(8)) = 2(42+35+25+15) = 234 liters; using the left endpoints instead gives 304, averaging the two sums gives the trapezoidal estimate of 269, and summing the four rate values without multiplying by the 2-hour subinterval width gives 117, which has the wrong units for an accumulated quantity.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u6-2-3"
  },
  {
    "id": "apcalcbc-shared-apcalc-u6-004",
    "unit": "U6",
    "topicCode": "6.2",
    "topic": "Integration and Accumulation of Change",
    "skill": "1.F",
    "calculatorAllowed": true,
    "type": "s",
    "q": "The rate at which rain falls during a storm is given by R(t), in inches per hour, with selected values R(0) = 0.2, R(1) = 0.5, R(2) = 0.9, R(3) = 0.6, R(4) = 0.3. Use a trapezoidal sum with the four subintervals indicated to estimate the total rainfall, in inches, during the 4-hour storm.",
    "o": [
      "2.2 in",
      "2.25 in",
      "2.3 in",
      "4.5 in"
    ],
    "c": [
      1
    ],
    "e": "The trapezoidal sum averages the left and right endpoint rates on each subinterval: 0.5[(0.2+0.5)+(0.5+0.9)+(0.9+0.6)+(0.6+0.3)] = 0.5(4.5) = 2.25 inches; using only left endpoints gives 2.2, using only right endpoints gives 2.3, and forgetting the factor of one-half in the trapezoidal formula doubles the estimate to 4.5.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u6-2-3"
  },
  {
    "id": "apcalcbc-shared-apcalc-u6-005",
    "unit": "U6",
    "topicCode": "6.3",
    "topic": "Integration and Accumulation of Change",
    "skill": "2.C",
    "calculatorAllowed": true,
    "type": "s",
    "stimulusGroupId": "apcalcbc-shared-apcalc-g-u6-velocity-table",
    "stimulus": {
      "type": "quantitative",
      "title": "Velocity of a Particle Moving Along a Straight Line",
      "source": "Original simulated data created for AP Exam Practice.",
      "columns": [
        "t (seconds)",
        "v(t) (m/s)"
      ],
      "rows": [
        [
          "0",
          "2"
        ],
        [
          "3",
          "5"
        ],
        [
          "6",
          "9"
        ],
        [
          "9",
          "7"
        ],
        [
          "12",
          "4"
        ]
      ],
      "note": "Assume v(t) changes monotonically between each pair of consecutive listed times (that is, v does not rise and then fall, or fall and then rise, between two listed times)."
    },
    "q": "Using the velocity data in the table (measured at 3-second intervals from t = 0 to t = 12), which expression correctly represents a right Riemann sum with n = 4 subintervals for the total distance traveled, in meters, over [0, 12]?",
    "o": [
      "3[v(0) + v(3) + v(6) + v(9)]",
      "v(3) + v(6) + v(9) + v(12)",
      "3[v(3) + v(6) + v(9) + v(12)]",
      "3[v(0) + v(3) + v(6) + v(9) + v(12)]"
    ],
    "c": [
      2
    ],
    "e": "A right Riemann sum with n = 4 equal subintervals of width Δt = 3 seconds multiplies Δt by the velocity at the right endpoint of each subinterval, giving 3[v(3)+v(6)+v(9)+v(12)] = 75 meters; using the left endpoints t = 0,3,6,9 describes a left sum instead, omitting the factor of 3 gives an expression with the wrong units, and including all five table values uses one more term than the four subintervals require."
  },
  {
    "id": "apcalcbc-shared-apcalc-u6-006",
    "unit": "U6",
    "topicCode": "6.3",
    "topic": "Integration and Accumulation of Change",
    "skill": "3.B",
    "calculatorAllowed": false,
    "type": "s",
    "q": "The definite integral ∫ from 2 to 7 of f(x) dx is defined as a limit of Riemann sums, where Δx = (7-2)/n and x_i is a sample point in the i-th subinterval. Which expression below correctly represents this limit?",
    "o": [
      "Σ from i=1 to n of f(x_i) Δx",
      "lim(n→∞) Σ from i=1 to n of f(x_i)/n",
      "lim(n→∞) Σ from i=1 to n of f(x_i) (Δx)²",
      "lim(n→∞) Σ from i=1 to n of f(x_i) Δx"
    ],
    "c": [
      3
    ],
    "e": "By definition, a definite integral is the limit as n approaches infinity of the Riemann sum Σf(x_i)Δx; omitting the limit leaves only a finite approximating sum rather than the exact integral, dividing by n instead of multiplying by Δx = 5/n changes the scale of every term by an incorrect factor, and squaring Δx introduces an extra factor that no longer corresponds to the area interpretation of the integral."
  },
  {
    "id": "apcalcbc-shared-apcalc-u6-007",
    "unit": "U6",
    "topicCode": "6.4",
    "topic": "Integration and Accumulation of Change",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Let g(x) = ∫ from 1 to x² of √(t² + 1) dt. Find g'(x).",
    "o": [
      "g'(x) = 2x√(x⁴ + 1)",
      "g'(x) = √(x⁴ + 1)",
      "g'(x) = 2x√(x² + 1)",
      "g'(x) = √(x² + 1)"
    ],
    "c": [
      0
    ],
    "e": "By the Fundamental Theorem of Calculus combined with the chain rule, since the upper limit is x² rather than x, g'(x) equals the integrand evaluated at x² times the derivative of x², giving √((x²)²+1)·2x = 2x√(x⁴+1); dropping the factor 2x ignores the chain rule needed for the composite upper limit, and evaluating the integrand at t = x instead of t = x² fails to substitute the actual upper limit."
  },
  {
    "id": "apcalcbc-shared-apcalc-u6-008",
    "unit": "U6",
    "topicCode": "6.4",
    "topic": "Integration and Accumulation of Change",
    "skill": "3.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Let f be a continuous function such that f(x) > 0 for x < 4, f(4) = 0, and f(x) < 0 for x > 4. If g(x) = ∫ from 0 to x of f(t) dt, which of the following correctly justifies that g has a local maximum at x = 4?",
    "o": [
      "Since f(4) = 0, it follows that g(4) = 0, so g has a local maximum at x = 4.",
      "g'(x) = f(x) changes from positive to negative at x = 4, so by the First Derivative Test, g has a local maximum at x = 4.",
      "g'(x) = f(x) changes from negative to positive at x = 4, so g has a local maximum at x = 4.",
      "Since f is decreasing through x = 4, g is concave down for all x, so g has a local maximum at x = 4."
    ],
    "c": [
      1
    ],
    "e": "By the Fundamental Theorem of Calculus, g'(x) = f(x), so the given sign change of f from positive to negative at x = 4 means g' changes from positive to negative there, and the First Derivative Test confirms a local maximum; f(4) = 0 only tells us g'(4) = 0, which alone is not conclusive, a sign change described backward would actually justify a local minimum, and f decreasing near x = 4 implies g is concave down only near x = 4, not for all x."
  },
  {
    "id": "apcalcbc-shared-apcalc-u6-009",
    "unit": "U6",
    "topicCode": "6.5",
    "topic": "Integration and Accumulation of Change",
    "skill": "2.B",
    "calculatorAllowed": true,
    "type": "s",
    "stimulusGroupId": "apcalcbc-shared-apcalc-g-u6-velocity-table",
    "stimulus": {
      "type": "quantitative",
      "title": "Velocity of a Particle Moving Along a Straight Line",
      "source": "Original simulated data created for AP Exam Practice.",
      "columns": [
        "t (seconds)",
        "v(t) (m/s)"
      ],
      "rows": [
        [
          "0",
          "2"
        ],
        [
          "3",
          "5"
        ],
        [
          "6",
          "9"
        ],
        [
          "9",
          "7"
        ],
        [
          "12",
          "4"
        ]
      ],
      "note": "Assume v(t) changes monotonically between each pair of consecutive listed times (that is, v does not rise and then fall, or fall and then rise, between two listed times)."
    },
    "q": "Let D(t) represent the total distance traveled by the particle described in the table, so that D(t) = ∫ from 0 to t of v(x) dx. Based on the table, on which interval is D increasing at a decreasing rate (that is, the particle is slowing down while still moving forward)?",
    "o": [
      "0 < t < 6",
      "0 < t < 12",
      "6 < t < 12",
      "There is no such interval, because D is increasing for the entire table."
    ],
    "c": [
      2
    ],
    "e": "Since D'(t) = v(t) > 0 at every recorded value, D is increasing throughout the table, but D increases at a decreasing rate exactly where v itself is decreasing; the table shows v rising from 2 to 9 on [0,6], meaning D increases at an increasing rate there, and v falling from 9 to 4 on [6,12], so D increases at a decreasing rate only on 6 < t < 12."
  },
  {
    "id": "apcalcbc-shared-apcalc-u6-010",
    "unit": "U6",
    "topicCode": "6.6",
    "topic": "Integration and Accumulation of Change",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Suppose ∫ from 1 to 5 of f(x) dx = 8, ∫ from 3 to 5 of f(x) dx = 5, and ∫ from 1 to 3 of g(x) dx = 4. Find ∫ from 1 to 3 of [2f(x) - g(x)] dx.",
    "o": [
      "22",
      "10",
      "-1",
      "2"
    ],
    "c": [
      3
    ],
    "e": "By additivity of integrals, ∫ from 1 to 3 of f(x) dx = ∫ from 1 to 5 of f(x) dx - ∫ from 3 to 5 of f(x) dx = 8 - 5 = 3, so ∫ from 1 to 3 of[2f(x)-g(x)]dx = 2(3) - 4 = 2 by linearity; adding the two given f-integrals instead of subtracting gives 13 for the piece and leads to 22, adding g instead of subtracting it gives 10, and forgetting to distribute the factor of 2 onto the f-integral before subtracting g gives -1."
  },
  {
    "id": "apcalcbc-shared-apcalc-u6-011",
    "unit": "U6",
    "topicCode": "6.7",
    "topic": "Integration and Accumulation of Change",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Evaluate ∫ from 1 to 4 of (3√x - 2/x²) dx.",
    "o": [
      "25/2",
      "-25/2",
      "31/2",
      "19/6"
    ],
    "c": [
      0
    ],
    "e": "An antiderivative is F(x) = 2x^(3/2) + 2/x, since ∫3√x dx = 2x^(3/2) and ∫-2x^(-2) dx = 2x^(-1); so F(4)-F(1) = (16+0.5)-(2+2) = 25/2. Evaluating F(1)-F(4) instead reverses the order and gives -25/2, using -2/x as the antiderivative of -2x^(-2) (a sign error) gives 31/2, and dropping the leading coefficient 3 before integrating √x gives 19/6."
  },
  {
    "id": "apcalcbc-shared-apcalc-u6-012",
    "unit": "U6",
    "topicCode": "6.7",
    "topic": "Integration and Accumulation of Change",
    "skill": "1.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Evaluate ∫ from 0 to 1 of √(1 + x³) dx. Which of the following is closest to the value of this integral?",
    "o": [
      "1.000",
      "1.111",
      "1.500",
      "0.833"
    ],
    "c": [
      1
    ],
    "e": "The integrand √(1+x³) has no elementary antiderivative, so the definite integral must be approximated numerically using a calculator's integration feature, which gives ∫ from 0 to 1 of√(1+x³)dx ≈ 1.111; since 1+x³ > 1 on (0,1], the value must exceed the length of the interval (1), ruling out 1.000 or a value below it, while 1.500 substantially overestimates and 0.833 underestimates the true value."
  },
  {
    "id": "apcalcbc-shared-apcalc-u6-013",
    "unit": "U6",
    "topicCode": "6.8",
    "topic": "Integration and Accumulation of Change",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "If f'(x) = 6x² - 4x + 1 and f(1) = 5, find f(x).",
    "o": [
      "f(x) = 2x³ - 2x² + x",
      "f(x) = 2x³ - 4x² + x + 6",
      "f(x) = 2x³ - 2x² + x + 4",
      "f(x) = 2x³ + 2x² + x"
    ],
    "c": [
      2
    ],
    "e": "The general antiderivative is F(x) = 2x³ - 2x² + x + C; substituting f(1) = 5 gives 2 - 2 + 1 + C = 5, so C = 4 and f(x) = 2x³ - 2x² + x + 4. Leaving C = 0 ignores the given initial condition entirely, integrating -4x as -4x² instead of -2x² misapplies the power rule by forgetting to divide by the new exponent, and integrating -4x as +2x² flips the sign of that term.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u6-12-13"
  },
  {
    "id": "apcalcbc-shared-apcalc-u6-014",
    "unit": "U6",
    "topicCode": "6.8",
    "topic": "Integration and Accumulation of Change",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "If f'(x) = 4x³ + 6x - 2 and f(0) = -1, find f(x).",
    "o": [
      "f(x) = x⁴ + 3x² - 2x",
      "f(x) = x⁴ + 6x² - 2x - 1",
      "f(x) = x⁴ + 3x² + 2x - 1",
      "f(x) = x⁴ + 3x² - 2x - 1"
    ],
    "c": [
      3
    ],
    "e": "The general antiderivative is F(x) = x⁴ + 3x² - 2x + C; substituting f(0) = -1 gives 0 + 0 - 0 + C = -1, so C = -1 and f(x) = x⁴ + 3x² - 2x - 1. Leaving C = 0 ignores the initial condition, integrating 6x as 6x² instead of 3x² forgets to divide by the new exponent, and integrating -2 as +2x flips the sign of the constant term's antiderivative.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u6-12-13"
  },
  {
    "id": "apcalcbc-shared-apcalc-u6-015",
    "unit": "U6",
    "topicCode": "6.9",
    "topic": "Integration and Accumulation of Change",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Find ∫ x cos(x²) dx.",
    "o": [
      "(1/2) sin(x²) + C",
      "sin(x²) + C",
      "-(1/2) sin(x²) + C",
      "(1/2) sin(x) + C"
    ],
    "c": [
      0
    ],
    "e": "Let u = x², so du = 2x dx and x dx = du/2; then ∫cos(u)(du/2) = (1/2)sin(u) + C = (1/2)sin(x²) + C. Forgetting the factor of 1/2 that comes from solving for x dx in terms of du gives sin(x²)+C, a sign slip gives the negative of the correct answer, and forgetting to substitute u back as x² leaves an expression that no longer matches the original variable.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u6-14-15"
  },
  {
    "id": "apcalcbc-shared-apcalc-u6-016",
    "unit": "U6",
    "topicCode": "6.9",
    "topic": "Integration and Accumulation of Change",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Find ∫ x³ √(x⁴ + 5) dx.",
    "o": [
      "(1/4)(x⁴ + 5)^(3/2) + C",
      "(1/6)(x⁴ + 5)^(3/2) + C",
      "(2/3)(x⁴ + 5)^(3/2) + C",
      "(1/6)(x⁴ + 5)^(1/2) + C"
    ],
    "c": [
      1
    ],
    "e": "Let u = x⁴+5, so du = 4x³ dx and x³ dx = du/4; then ∫√u (du/4) = (1/4)·(2/3)u^(3/2)+C = (1/6)(x⁴+5)^(3/2)+C. Omitting the 2/3 factor from the power rule leaves (1/4)(x⁴+5)^(3/2), omitting the 1/4 factor that comes from the substitution leaves (2/3)(x⁴+5)^(3/2), and failing to raise the exponent from 1/2 to 3/2 during the power rule leaves the wrong power entirely.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u6-14-15"
  },
  {
    "id": "apcalcbc-shared-apcalc-u6-017",
    "unit": "U6",
    "topicCode": "6.10",
    "topic": "Integration and Accumulation of Change",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Find ∫ (2x² - x - 1)/(x + 1) dx.",
    "o": [
      "x² - 3x + C",
      "x² - 3x + ln|x+1| + C",
      "x² - 3x + 2 ln|x+1| + C",
      "x² + 3x + 2 ln|x+1| + C"
    ],
    "c": [
      2
    ],
    "e": "Long division gives (2x²-x-1)/(x+1) = (2x-3) + 2/(x+1), so integrating term by term gives x² - 3x + 2ln|x+1| + C. Omitting the remainder 2/(x+1) drops the logarithmic term entirely, forgetting the coefficient 2 on that term understates it, and a subtraction sign error during the long division (yielding quotient 2x+3 instead of 2x-3) flips the sign of the linear term to x² + 3x."
  },
  {
    "id": "apcalcbc-shared-apcalc-u6-018",
    "unit": "U6",
    "topicCode": "6.14",
    "topic": "Integration and Accumulation of Change",
    "skill": "1.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Which technique of antidifferentiation should be used to evaluate ∫ from 0 to 2 of e^(-x²) dx, and what is the resulting value?",
    "o": [
      "Substitute u = -x², so du = -2x dx; the value is approximately 0.441.",
      "Apply the power rule directly to e^(-x²), treating it like x^(-2); the value is approximately 1.772.",
      "Complete the square in the exponent and integrate as a basic exponential; the value is approximately 1.000.",
      "No elementary antiderivative exists for e^(-x²), so a calculator's numerical integration must be used; the value is approximately 0.882."
    ],
    "c": [
      3
    ],
    "e": "Since e^(-x²) has no elementary antiderivative expressible with standard AB techniques, the definite integral must be approximated numerically, and a calculator's numerical integration gives ∫ from 0 to 2 ofe^(-x²)dx ≈ 0.882. Attempting u-substitution fails because there is no extra factor of x outside the exponential to absorb into du, treating e^(-x²) with the power rule confuses an exponential function with a power function, and completing the square does not simplify -x², so no elementary antiderivative results regardless of the algebraic manipulation."
  },
  {
    "id": "apcalcbc-shared-apcalc-u7-001",
    "unit": "U7",
    "topicCode": "7.1",
    "topic": "Modeling Situations with Differential Equations",
    "skill": "2.A",
    "calculatorAllowed": false,
    "type": "s",
    "q": "A cylindrical tank is draining: water leaks out through a small hole in the bottom so that the rate at which the volume V of water in the tank decreases is proportional to the square root of V. Which differential equation models this situation, where k is a positive constant?",
    "o": [
      "dV/dt = -k√V",
      "dV/dt = k√V",
      "dV/dt = -kV²",
      "dV/dt = -k/√V"
    ],
    "c": [
      0
    ],
    "e": "Since the volume is decreasing over time, dV/dt must be negative, and 'proportional to the square root of V' means the rate depends on √V itself (not V² or 1/√V), so dV/dt = -k√V with k > 0 is the only choice matching both the sign and the stated proportionality."
  },
  {
    "id": "apcalcbc-shared-apcalc-u7-002",
    "unit": "U7",
    "topicCode": "7.2",
    "topic": "Verifying Solutions for Differential Equations",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Which of the following functions is a solution to the differential equation dy/dx = 2xy?",
    "o": [
      "y = 5e^(2x)",
      "y = 5e^(x²)",
      "y = x² + 5",
      "y = 5x²"
    ],
    "c": [
      1
    ],
    "e": "Differentiating y = 5e^(x²) using the chain rule gives dy/dx = 5(2x)e^(x²) = 2x·5e^(x²) = 2xy, so substitution confirms it satisfies the equation identically, while the other three functions produce derivatives that do not equal 2xy when substituted back in."
  },
  {
    "id": "apcalcbc-shared-apcalc-u7-003",
    "unit": "U7",
    "topicCode": "7.3",
    "topic": "Sketching Slope Fields",
    "skill": "2.D",
    "calculatorAllowed": false,
    "type": "s",
    "stimulusGroupId": "apcalcbc-shared-apcalc-g-u7-slope-field",
    "stimulus": {
      "type": "visual",
      "title": "A slope field on the xy-plane",
      "source": "Original diagram created for AP Exam Practice.",
      "visualKind": "diagram",
      "image": "assets/ap-calculus-ab/slope-field.svg",
      "description": "Each short segment is centered at an integer grid point (x, y) and its tilt shows the local slope given by a first-order differential equation dy/dx = f(x, y) at that point. The specific equation is not printed on the figure itself.",
      "alt": "A grid of short line segments shows the local slope of a differential equation at integer points where x and y each range from negative four to four. Segments are horizontal along both axes, tilt positively and increasingly steeply away from the axes in the first and third quadrants, and tilt negatively and increasingly steeply away from the axes in the second and fourth quadrants."
    },
    "q": "The slope field shown displays short line segments indicating the value of dy/dx at each plotted point (x, y). Which differential equation could have generated this slope field?",
    "o": [
      "dy/dx = -xy/2",
      "dy/dx = x/y",
      "dy/dx = xy/2",
      "dy/dx = x + y"
    ],
    "c": [
      2
    ],
    "e": "The field shows slope 0 along both entire axes and matching-sign slopes in the first/third quadrants (positive) versus second/fourth quadrants (negative), exactly the sign pattern of xy/2; -xy/2 would reverse every one of those signs, x/y is undefined along the x-axis instead of equal to 0 there, and x+y is not 0 along the whole y-axis."
  },
  {
    "id": "apcalcbc-shared-apcalc-u7-004",
    "unit": "U7",
    "topicCode": "7.4",
    "topic": "Reasoning Using Slope Fields",
    "skill": "3.E",
    "calculatorAllowed": false,
    "type": "s",
    "stimulusGroupId": "apcalcbc-shared-apcalc-g-u7-slope-field",
    "stimulus": {
      "type": "visual",
      "title": "A slope field on the xy-plane",
      "source": "Original diagram created for AP Exam Practice.",
      "visualKind": "diagram",
      "image": "assets/ap-calculus-ab/slope-field.svg",
      "description": "Each short segment is centered at an integer grid point (x, y) and its tilt shows the local slope given by a first-order differential equation dy/dx = f(x, y) at that point. The specific equation is not printed on the figure itself.",
      "alt": "A grid of short line segments shows the local slope of a differential equation at integer points where x and y each range from negative four to four. Segments are horizontal along both axes, tilt positively and increasingly steeply away from the axes in the first and third quadrants, and tilt negatively and increasingly steeply away from the axes in the second and fourth quadrants."
    },
    "q": "Using the slope field shown, suppose a particular solution curve passes through the point (2, 1). As x increases from x = 2, staying in the first quadrant, the curve is…",
    "o": [
      "increasing, but at a decreasing rate (concave down)",
      "decreasing toward y = 0",
      "constant, since the slope field looks the same near every point on the curve",
      "increasing, and increasing at an increasing rate (concave up)"
    ],
    "c": [
      3
    ],
    "e": "For x > 0 and y > 0 the slope xy/2 is positive and grows larger as both x and y grow, so the curve rises ever more steeply; differentiating the slope shows d²y/dx² = (y/2)(1 + x²/2) > 0 in this region, confirming the curve is increasing and concave up rather than leveling off or decreasing."
  },
  {
    "id": "apcalcbc-shared-apcalc-u7-005",
    "unit": "U7",
    "topicCode": "7.6",
    "topic": "Finding General Solutions Using Separation of Variables",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Find the general solution to the differential equation dy/dx = x²/y.",
    "o": [
      "y² = (2/3)x³ + C",
      "y² = (1/3)x³ + C",
      "y² = (2/3)x³ + Cx",
      "y = (2/3)x³ + C"
    ],
    "c": [
      0
    ],
    "e": "Separating variables gives y dy = x² dx; integrating both sides yields y²/2 = x³/3 + C₁, and multiplying every term by 2 (then renaming the constant) gives the implicit general solution y² = (2/3)x³ + C, not the equation with the un-doubled coefficient 1/3 or a stray x attached to C.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u7-4-5"
  },
  {
    "id": "apcalcbc-shared-apcalc-u7-006",
    "unit": "U7",
    "topicCode": "7.6",
    "topic": "Finding General Solutions Using Separation of Variables",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Find the general solution to the differential equation dy/dx = x/y².",
    "o": [
      "y³ = (3/2)x² + Cx",
      "y³ = (3/2)x² + C",
      "y³ = (2/3)x² + C",
      "y = (3/2)x² + C"
    ],
    "c": [
      1
    ],
    "e": "Separating variables gives y² dy = x dx; integrating both sides yields y³/3 = x²/2 + C₁, and multiplying every term by 3 (then renaming the constant) gives the implicit general solution y³ = (3/2)x² + C, not a version with the fraction inverted or an extra factor of x on the constant.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u7-4-5"
  },
  {
    "id": "apcalcbc-shared-apcalc-u7-007",
    "unit": "U7",
    "topicCode": "7.7",
    "topic": "Finding Particular Solutions Using Initial Conditions and Separation of Variables",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Find the particular solution to dy/dx = 3x²y that satisfies y(0) = 2.",
    "o": [
      "y = 2e^(x³/3)",
      "y = 2e^(3x)",
      "y = 2e^(x³)",
      "y = e^(x³) + 1"
    ],
    "c": [
      2
    ],
    "e": "Separating variables gives dy/y = 3x² dx, so ln|y| = x³ + C₁ and y = Ae^(x³); applying y(0) = 2 gives A = 2, so the particular solution is y = 2e^(x³), whereas dividing the exponent by 3 or replacing x³ with 3x comes from mis-integrating 3x² dx.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u7-6-7"
  },
  {
    "id": "apcalcbc-shared-apcalc-u7-008",
    "unit": "U7",
    "topicCode": "7.7",
    "topic": "Finding Particular Solutions Using Initial Conditions and Separation of Variables",
    "skill": "1.F",
    "calculatorAllowed": true,
    "type": "s",
    "q": "The function y = 5e^(x⁴) is the particular solution to dy/dx = 4x³y satisfying y(0) = 5. What is the value of y at x = 1.2, rounded to the nearest whole number?",
    "o": [
      "28",
      "8",
      "13",
      "40"
    ],
    "c": [
      3
    ],
    "e": "Evaluating y(1.2) = 5e^(1.2⁴) = 5e^(2.0736) ≈ 5(7.951) ≈ 39.8, which rounds to 40; using 1.2³ instead of 1.2⁴ in the exponent gives about 28, omitting the leading factor of 5 gives about 8, and adding 5 instead of multiplying by it gives about 13.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u7-6-7"
  },
  {
    "id": "apcalcbc-shared-apcalc-u7-009",
    "unit": "U7",
    "topicCode": "7.8",
    "topic": "Exponential Models with Differential Equations",
    "skill": "1.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "A town's population grows at a rate proportional to its size (dP/dt = kP). The population was 10,000 in 2020 and 13,000 in 2025. Assuming this continuous exponential growth continues, during which year will the population first exceed 20,000?",
    "o": [
      "2033",
      "2036",
      "2031",
      "2022"
    ],
    "c": [
      0
    ],
    "e": "Solving P = 10000e^(kt) with P(5) = 13000 gives k = ln(1.3)/5 ≈ 0.0525; setting 10000e^(kt) = 20000 gives t = ln2/k ≈ 13.21 years after 2020, so the population passes 20,000 partway through 2033; using a linear growth rate, an incorrectly averaged k, or forgetting to divide by the 5-year span each yield a different wrong year."
  },
  {
    "id": "apcalcbc-shared-apcalc-u7-010",
    "unit": "U7",
    "topicCode": "7.8",
    "topic": "Exponential Models with Differential Equations",
    "skill": "1.F",
    "calculatorAllowed": true,
    "type": "s",
    "q": "A sample of a radioactive isotope decays according to dA/dt = -kA. If the sample decays to 25% of its original amount after 12 years, what is the value of k, rounded to three decimal places?",
    "o": [
      "k ≈ 0.058",
      "k ≈ 0.116",
      "k ≈ 0.231",
      "k ≈ 1.386"
    ],
    "c": [
      1
    ],
    "e": "Since A = A₀e^(-kt) and A(12) = 0.25A₀, solving 0.25 = e^(-12k) gives k = -ln(0.25)/12 = ln(4)/12 ≈ 0.116; doubling the elapsed time to 24 years, using ln(4)/6, or forgetting to divide ln(4) by 12 at all produce the other three listed values instead."
  },
  {
    "id": "apcalcbc-shared-apcalc-u8-001",
    "unit": "U8",
    "topicCode": "8.1",
    "topic": "Finding the Average Value of a Function on an Interval",
    "skill": "2.B",
    "calculatorAllowed": true,
    "type": "s",
    "stimulusGroupId": "apcalcbc-shared-apcalc-g-u8-cross-section-table",
    "stimulus": {
      "type": "quantitative",
      "title": "Cross-Sectional Area of a Solid",
      "source": "Original simulated data created for AP Exam Practice.",
      "columns": [
        "x (cm)",
        "cross-sectional area A(x) (cm²)"
      ],
      "rows": [
        [
          "0",
          "10"
        ],
        [
          "2",
          "14"
        ],
        [
          "4",
          "20"
        ],
        [
          "6",
          "22"
        ],
        [
          "8",
          "18"
        ]
      ]
    },
    "q": "The table gives the cross-sectional area A(x), in square centimeters, of a solid at several values of x, in centimeters, measured from one end of the solid. Using a trapezoidal approximation with the given data, what is the best estimate of the average cross-sectional area of the solid on the interval 0 ≤ x ≤ 8?",
    "o": [
      "16.5 cm²",
      "18.5 cm²",
      "17.5 cm²",
      "16.8 cm²"
    ],
    "c": [
      2
    ],
    "e": "The average value of A on [0,8] is (1/8)∫₀⁸A(x)dx. Approximating the integral with the trapezoidal rule using the five table values gives (2/2)[10+2(14)+2(20)+2(22)+18] = 140, so the average area is 140/8 = 17.5 cm². Using only left endpoints or only right endpoints instead of trapezoids, or simply averaging the five listed A-values without weighting the interior points twice, produces the other listed answers."
  },
  {
    "id": "apcalcbc-shared-apcalc-u8-002",
    "unit": "U8",
    "topicCode": "8.2",
    "topic": "Connecting Position, Velocity, and Acceleration of Functions Using Integrals",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "A particle moves along the x-axis with velocity v(t) = 3t² − 12t + 9 (meters per second) for 0 ≤ t ≤ 4. At time t = 0, the particle's position is x(0) = 2. What is the particle's position at t = 4?",
    "o": [
      "4",
      "−2",
      "14",
      "6"
    ],
    "c": [
      3
    ],
    "e": "Position is found from x(4) = x(0) + ∫₀⁴v(t)dt. Since ∫₀⁴(3t²−12t+9)dt = [t³−6t²+9t]₀⁴ = 4, x(4) = 2 + 4 = 6. The answer 4 omits the initial position, −2 comes from a sign error (2−4), and 14 mistakenly adds the total distance traveled (12, found by splitting at v's zeros t=1,3) instead of the net displacement (4).",
    "variantGroupId": "apcalcbc-shared-vg-calc-u8-1-2"
  },
  {
    "id": "apcalcbc-shared-apcalc-u8-003",
    "unit": "U8",
    "topicCode": "8.2",
    "topic": "Connecting Position, Velocity, and Acceleration of Functions Using Integrals",
    "skill": "1.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "A particle moves along a line with velocity v(t) = 5 sin(t) − 2 (feet per second) for 0 ≤ t ≤ 3, where t is measured in radians. What is the total distance traveled by the particle over this time interval?",
    "o": [
      "5.106 feet",
      "3.950 feet",
      "4.761 feet",
      "5.607 feet"
    ],
    "c": [
      0
    ],
    "e": "Total distance requires ∫₀³|v(t)|dt, not the plain signed integral. Since v(t)=0 at t≈0.412 and t≈2.730, velocity is negative, then positive, then negative on the three resulting subintervals; summing the absolute value of each piece gives about 5.106 ft. Using the signed integral directly gives only the net displacement (3.950 ft), splitting at just the first sign change and missing the third piece gives 4.761 ft, and evaluating sin(t) with the calculator in degree mode instead of radian mode gives 5.607 ft.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u8-1-2"
  },
  {
    "id": "apcalcbc-shared-apcalc-u8-004",
    "unit": "U8",
    "topicCode": "8.3",
    "topic": "Using Accumulation Functions and Definite Integrals in Applied Contexts",
    "skill": "1.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "A storage tank contains 50 gallons of water at time t = 0. Water then flows into the tank at a rate of R(t) = 20 + 5 sin(t/2) gallons per minute, for 0 ≤ t ≤ 10 minutes. How many gallons of water are in the tank at time t = 10?",
    "o": [
      "207.163 gallons",
      "257.163 gallons",
      "202.054 gallons",
      "252.180 gallons"
    ],
    "c": [
      1
    ],
    "e": "The amount in the tank equals the initial amount plus the accumulated inflow: 50+∫₀¹⁰R(t)dt = 50+[20t−10cos(t/2)]₀¹⁰ = 50+(210−10cos5) ≈ 257.163 gallons. Omitting the initial 50 gallons gives 207.163, approximating the inflow as the constant endpoint rate R(10) times 10 minutes (plus 50) gives 202.054, and evaluating the sine in degree mode instead of radian mode gives 252.180."
  },
  {
    "id": "apcalcbc-shared-apcalc-u8-005",
    "unit": "U8",
    "topicCode": "8.4",
    "topic": "Finding the Area Between Curves Expressed as Functions of x",
    "skill": "2.B",
    "calculatorAllowed": false,
    "type": "s",
    "stimulusGroupId": "apcalcbc-shared-apcalc-g-u8-region-graph",
    "stimulus": {
      "type": "visual",
      "title": "Region Bounded by f(x) = x + 2 and g(x) = x²",
      "source": "Original diagram created for AP Exam Practice.",
      "visualKind": "graph",
      "image": "assets/ap-calculus-ab/region-between-curves.svg",
      "description": "Both curves are graphed as smooth functions on the same coordinate axes, with their two intersection points labeled with coordinates. The shaded region lies entirely between the two labeled intersection points.",
      "alt": "A red line and a blue parabola are plotted on the same axes and cross at two labeled points. Between those two intersection points the line lies above the parabola, and the enclosed region between the two curves is shaded light blue."
    },
    "q": "The figure shows the region R enclosed by the graphs of f(x) = x + 2 and g(x) = x², which intersect at the two points shown. What is the area of R?",
    "o": [
      "15/2",
      "10/3",
      "9/2",
      "3/2"
    ],
    "c": [
      2
    ],
    "e": "Since f(x) ≥ g(x) on [−1,2], the area is ∫₋₁²[(x+2)−x²]dx = [x²/2+2x−x³/3]₋₁² = 9/2. Forgetting to subtract g(x) and integrating f(x) alone over the same interval gives 15/2, integrating only over [0,2] instead of the full region gives 10/3, and shifting the bounds to [−2,1] gives 3/2."
  },
  {
    "id": "apcalcbc-shared-apcalc-u8-006",
    "unit": "U8",
    "topicCode": "8.4",
    "topic": "Finding the Area Between Curves Expressed as Functions of x",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Let R be the region enclosed by the curves f(x) = 8 − x² and g(x) = x². What is the area of R?",
    "o": [
      "80/3",
      "32/3",
      "128/3",
      "64/3"
    ],
    "c": [
      3
    ],
    "e": "The curves intersect where 8−x² = x², i.e., x = ±2, and f(x) ≥ g(x) throughout [−2,2]. The area is ∫₋₂²[(8−x²)−x²]dx = ∫₋₂²(8−2x²)dx = 64/3. Forgetting to subtract g(x) and integrating only f(x) gives 80/3, integrating over just half the interval (0 to 2) gives 32/3, and doubling the correct area by mistake gives 128/3."
  },
  {
    "id": "apcalcbc-shared-apcalc-u8-007",
    "unit": "U8",
    "topicCode": "8.5",
    "topic": "Finding the Area Between Curves Expressed as Functions of y",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Let R be the region enclosed by the curves x = 6 − y² and x = y, described as functions of y. What is the area of R?",
    "o": [
      "125/6",
      "22/3",
      "55/3",
      "18"
    ],
    "c": [
      0
    ],
    "e": "Solving 6−y² = y gives y = −3 and y = 2, and the curve x=6−y² lies to the right of x=y on [−3,2]. The area is ∫₋₃²[(6−y²)−y]dy = 125/6. Using the wrong sub-interval [0,2] instead of the full [−3,2] gives 22/3, forgetting to subtract the boundary x=y and integrating only 6−y² gives 55/3, and extending the bounds to [−3,3] instead of stopping at the true intersection y=2 gives 18."
  },
  {
    "id": "apcalcbc-shared-apcalc-u8-008",
    "unit": "U8",
    "topicCode": "8.6",
    "topic": "Finding the Area Between Curves That Intersect at More Than Two Points",
    "skill": "3.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "The curve f(x) = x³ − 4x intersects the x-axis at x = −2, 0, and 2. What is the total area of the region(s) enclosed between the graph of f and the x-axis on the interval [−2, 2]?",
    "o": [
      "0",
      "8",
      "4",
      "16"
    ],
    "c": [
      1
    ],
    "e": "Because f is positive on (−2,0) and negative on (0,2), the enclosed area must be computed piecewise: ∫₋₂⁰f(x)dx − ∫₀²f(x)dx = 4+4 = 8. Simply evaluating the single definite integral ∫₋₂²f(x)dx gives 0, since the positive and negative pieces cancel by odd-function symmetry — that is a signed net change, not an enclosed area. Computing only one of the two pieces gives 4, and doubling the correct total by mistake gives 16."
  },
  {
    "id": "apcalcbc-shared-apcalc-u8-009",
    "unit": "U8",
    "topicCode": "8.7",
    "topic": "Volumes with Cross Sections: Squares and Rectangles",
    "skill": "2.B",
    "calculatorAllowed": true,
    "type": "s",
    "stimulusGroupId": "apcalcbc-shared-apcalc-g-u8-cross-section-table",
    "stimulus": {
      "type": "quantitative",
      "title": "Cross-Sectional Area of a Solid",
      "source": "Original simulated data created for AP Exam Practice.",
      "columns": [
        "x (cm)",
        "cross-sectional area A(x) (cm²)"
      ],
      "rows": [
        [
          "0",
          "10"
        ],
        [
          "2",
          "14"
        ],
        [
          "4",
          "20"
        ],
        [
          "6",
          "22"
        ],
        [
          "8",
          "18"
        ]
      ]
    },
    "q": "Using the table of cross-sectional areas A(x) and a right Riemann sum with the given subintervals, what is the estimate for the volume of the solid on the interval 0 ≤ x ≤ 8?",
    "o": [
      "132 cm³",
      "140 cm³",
      "148 cm³",
      "74 cm³"
    ],
    "c": [
      2
    ],
    "e": "A right Riemann sum uses the area value at the right endpoint of each subinterval: V ≈ Δx[A(2)+A(4)+A(6)+A(8)] = 2(14+20+22+18) = 148 cm³. Using left endpoints instead gives 132 cm³, using the trapezoidal rule instead of a right sum gives 140 cm³, and summing the areas without multiplying by the subinterval width Δx=2 gives only 74 cm³."
  },
  {
    "id": "apcalcbc-shared-apcalc-u8-010",
    "unit": "U8",
    "topicCode": "8.8",
    "topic": "Volumes with Cross Sections: Triangles and Semicircles",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "The base of a solid is the region between the curve y = √x and the x-axis on the interval 0 ≤ x ≤ 4. Cross sections of the solid perpendicular to the x-axis are semicircles whose diameter stretches from the x-axis to the curve. What is the volume of the solid?",
    "o": [
      "2π",
      "4π",
      "8",
      "π"
    ],
    "c": [
      3
    ],
    "e": "At each x, the diameter is √x, so the radius is √x/2 and each semicircular cross section has area (1/2)π(√x/2)² = πx/8. The volume is ∫₀⁴(πx/8)dx = π. Treating the cross sections as full circles instead of semicircles gives 2π, mistakenly using √x itself as the radius rather than half the diameter gives 4π, and using square cross sections of side √x instead of semicircles gives 8."
  },
  {
    "id": "apcalcbc-shared-apcalc-u8-011",
    "unit": "U8",
    "topicCode": "8.9",
    "topic": "Volume with Disc Method: Revolving Around the x- or y-Axis",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "The region under the curve y = x² on the interval 0 ≤ x ≤ 2 is revolved about the x-axis. What is the volume of the resulting solid?",
    "o": [
      "32π/5",
      "8π/3",
      "4π",
      "16π/5"
    ],
    "c": [
      0
    ],
    "e": "By the disc method, V = π∫₀²(x²)²dx = π∫₀²x⁴dx = π[x⁵/5]₀² = 32π/5. Forgetting to square the radius before integrating gives π∫₀²x²dx = 8π/3, mistakenly integrating x³ instead of x⁴ gives 4π, and dividing the correct result by an extra factor of 2 gives 16π/5.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u8-10-11"
  },
  {
    "id": "apcalcbc-shared-apcalc-u8-012",
    "unit": "U8",
    "topicCode": "8.9",
    "topic": "Volume with Disc Method: Revolving Around the x- or y-Axis",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "The region between the curve x = y² and the y-axis on the interval 0 ≤ y ≤ 3 is revolved about the y-axis. What is the volume of the resulting solid?",
    "o": [
      "9π",
      "243π/5",
      "32π/5",
      "243/5"
    ],
    "c": [
      1
    ],
    "e": "By the disc method about the y-axis, V = π∫₀³(y²)²dy = π∫₀³y⁴dy = π[y⁵/5]₀³ = 243π/5. Forgetting to square the radius gives π∫₀³y²dy = 9π, mistakenly reusing the bounds and setup from a different revolution about the x-axis on [0,2] gives 32π/5, and forgetting to include the factor of π entirely gives 243/5.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u8-10-11"
  },
  {
    "id": "apcalcbc-shared-apcalc-u8-013",
    "unit": "U8",
    "topicCode": "8.10",
    "topic": "Volume with Disc Method: Revolving Around Other Axes",
    "skill": "1.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Let R be the region bounded by y = e^(x/2) + 1 and y = 1 on the interval 0 ≤ x ≤ 2. R is revolved about the line y = 1. What is the volume of the resulting solid?",
    "o": [
      "2π(e−1) ≈ 10.796",
      "π(e²+4e−3) ≈ 47.948",
      "π(e²−1) ≈ 20.072",
      "π(e−1) ≈ 5.398"
    ],
    "c": [
      2
    ],
    "e": "Since the axis y=1 coincides with the lower boundary of R, the radius at each x is (e^(x/2)+1)−1 = e^(x/2), so V=π∫₀²(e^(x/2))²dx=π∫₀²eˣdx=π(e²−1)≈20.072. Forgetting to square the radius before integrating gives 2π(e−1), forgetting to shift the radius down by 1 and using the full function value as the radius gives π(e²+4e−3), and mistakenly using the upper bound x=1 instead of x=2 gives π(e−1)."
  },
  {
    "id": "apcalcbc-shared-apcalc-u8-014",
    "unit": "U8",
    "topicCode": "8.11",
    "topic": "Volume with Washer Method: Revolving Around the x- or y-Axis",
    "skill": "2.A",
    "calculatorAllowed": false,
    "type": "s",
    "stimulusGroupId": "apcalcbc-shared-apcalc-g-u8-region-graph",
    "stimulus": {
      "type": "visual",
      "title": "Region Bounded by f(x) = x + 2 and g(x) = x²",
      "source": "Original diagram created for AP Exam Practice.",
      "visualKind": "graph",
      "image": "assets/ap-calculus-ab/region-between-curves.svg",
      "description": "Both curves are graphed as smooth functions on the same coordinate axes, with their two intersection points labeled with coordinates. The shaded region lies entirely between the two labeled intersection points.",
      "alt": "A red line and a blue parabola are plotted on the same axes and cross at two labeled points. Between those two intersection points the line lies above the parabola, and the enclosed region between the two curves is shaded light blue."
    },
    "q": "The region R shown in the figure, bounded above by f(x) = x + 2 and below by g(x) = x², is revolved about the x-axis. What is the volume of the resulting solid?",
    "o": [
      "21π",
      "18π",
      "9π/2",
      "72π/5"
    ],
    "c": [
      3
    ],
    "e": "Since both f and g are nonnegative on [−1,2], the outer radius is f(x)=x+2 and the inner radius is g(x)=x², so V=π∫₋₁²[(x+2)²−(x²)²]dx=72π/5. Using only the outer curve and ignoring the inner radius entirely (disc instead of washer) gives 21π, squaring only the outer function while leaving the inner term unsquared gives 18π, and forgetting to square either radius and using f−g directly gives 9π/2."
  },
  {
    "id": "apcalcbc-shared-apcalc-u8-015",
    "unit": "U8",
    "topicCode": "8.11",
    "topic": "Volume with Washer Method: Revolving Around the x- or y-Axis",
    "skill": "1.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Let R be the region enclosed by f(x) = 8 − x² and g(x) = x + 3. R is revolved about the x-axis. What is the volume of the resulting solid?",
    "o": [
      "463.570",
      "578.743",
      "50.388",
      "147.559"
    ],
    "c": [
      0
    ],
    "e": "The curves intersect where 8−x²=x+3, giving x=(−1±√21)/2, and both f and g stay positive throughout this interval with f≥g. So V=π∫[(8−x²)²−(x+3)²]dx evaluated over these bounds ≈463.570. Using only the outer radius and ignoring the inner boundary (disc method instead of washer) gives 578.743, computing π∫(f−g)dx without squaring the radii gives 50.388, and omitting the factor of π entirely gives 147.559."
  },
  {
    "id": "apcalcbc-shared-apcalc-u8-016",
    "unit": "U8",
    "topicCode": "8.12",
    "topic": "Volume with Washer Method: Revolving Around Other Axes",
    "skill": "1.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Let R be the region bounded by y = x² and y = 4. Which integral expression gives the volume of the solid formed when R is revolved about the line y = 6?",
    "o": [
      "π∫₋₂² (6−x²)² dx",
      "π∫₋₂² [(6−x²)² − 2²] dx",
      "π∫₋₂² [(6−x²) − 2]² dx",
      "2π∫₋₂² (6−x²−2) dx"
    ],
    "c": [
      1
    ],
    "e": "Revolving about y=6, the farther boundary y=x² generates the outer radius 6−x² and the closer boundary y=4 generates the constant inner radius 6−4=2, so the correct washer integral is π∫₋₂²[(6−x²)²−2²]dx, which evaluates to 384π/5. Omitting the inner radius entirely turns the washer into an incorrect disc setup, squaring the difference of the two radii instead of taking the difference of their squares is a common algebra error since (A−B)²≠A²−B², and applying a shell-type 2πrh formula while integrating with respect to x is the wrong method for a horizontal axis of revolution here."
  },
  {
    "id": "apcalcbc-shared-apcalc-u8-017",
    "unit": "U8",
    "topicCode": "8.13",
    "topic": "The Arc Length of a Smooth, Planar Curve and Distance Traveled",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "What is the length of the curve y = (2/3)x^(3/2) from x = 0 to x = 3?",
    "o": [
      "2√3",
      "12√3/5",
      "14/3",
      "7"
    ],
    "c": [
      2
    ],
    "e": "Since y' = √x, the arc length is ∫₀³√(1+x)dx = [(2/3)(1+x)^(3/2)]₀³ = (2/3)(8−1) = 14/3. Forgetting to add 1 under the square root and using |y'|=√x directly gives 2√3, computing the area under the curve instead of the arc length gives 12√3/5, and dropping the 2/3 coefficient when evaluating the antiderivative gives 7.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u8-16-17"
  },
  {
    "id": "apcalcbc-shared-apcalc-u8-018",
    "unit": "U8",
    "topicCode": "8.13",
    "topic": "The Arc Length of a Smooth, Planar Curve and Distance Traveled",
    "skill": "1.F",
    "calculatorAllowed": true,
    "type": "s",
    "q": "A particle moves along the curve y = sin(x) from x = 0 to x = π/2. What is the distance traveled by the particle along the curve (its arc length), rounded to three decimal places?",
    "o": [
      "1.000",
      "1.571",
      "1.862",
      "1.910"
    ],
    "c": [
      3
    ],
    "e": "The arc length is ∫₀^(π/2)√(1+cos²x)dx ≈ 1.910, which must be evaluated numerically since it has no elementary closed form. Dropping the 1 inside the square root reduces the integrand to |cos x|, giving ∫₀^(π/2)|cos x|dx=1, using only the horizontal interval width π/2≈1.571 ignores the curve's rise entirely, and computing the straight-line chord distance between the endpoints (0,0) and (π/2,1) instead of the arc length gives about 1.862.",
    "variantGroupId": "apcalcbc-shared-vg-calc-u8-16-17"
  },
  {
    "id": "apcalcbc-u6-019",
    "unit": "U6",
    "topicCode": "6.11",
    "topic": "Integrating Using Integration by Parts",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Which antiderivative is equal to ∫ x e^x dx?",
    "o": [
      "e^x(x − 1) + C",
      "e^x(x + 1) + C",
      "x e^x + C",
      "(x²/2)e^x + C"
    ],
    "c": [
      0
    ],
    "e": "Using integration by parts with u=x and dv=e^x dx gives du=dx and v=e^x. Therefore ∫x e^x dx=x e^x−∫e^x dx=e^x(x−1)+C.",
    "variantGroupId": "apcalcbc-v-6.11"
  },
  {
    "id": "apcalcbc-u6-020",
    "unit": "U6",
    "topicCode": "6.11",
    "topic": "Integrating Using Integration by Parts",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Evaluate the indefinite integral ∫ x cos(x) dx.",
    "o": [
      "x sin(x) − cos(x) + C",
      "x sin(x) + cos(x) + C",
      "x cos(x) + sin(x) + C",
      "(x²/2) sin(x) + C"
    ],
    "c": [
      1
    ],
    "e": "Take u=x and dv=cos(x)dx, so du=dx and v=sin(x). Integration by parts gives x sin(x)−∫sin(x)dx=x sin(x)+cos(x)+C.",
    "variantGroupId": "apcalcbc-v-6.11"
  },
  {
    "id": "apcalcbc-u6-021",
    "unit": "U6",
    "topicCode": "6.11",
    "topic": "Integrating Using Integration by Parts",
    "skill": "1.D",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Which expression is an antiderivative of ln(x) for x>0?",
    "o": [
      "ln(x)²/2 + C",
      "x ln(x) + x + C",
      "x ln(x) − x + C",
      "1/x + C"
    ],
    "c": [
      2
    ],
    "e": "Write the integrand as 1·ln(x) and use integration by parts with u=ln(x), dv=dx. Then du=dx/x and v=x, giving x ln(x)−∫1 dx=x ln(x)−x+C.",
    "variantGroupId": "apcalcbc-v-6.11"
  },
  {
    "id": "apcalcbc-u6-022",
    "unit": "U6",
    "topicCode": "6.12",
    "topic": "Integrating Using Linear Partial Fractions",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "For x≠−1,−2, which antiderivative equals ∫ 1/[(x+1)(x+2)] dx?",
    "o": [
      "ln|x+1| + ln|x+2| + C",
      "(1/2)ln|x+1| − ln|x+2| + C",
      "1/[(x+1)(x+2)] + C",
      "ln|x+1| − ln|x+2| + C"
    ],
    "c": [
      3
    ],
    "e": "The decomposition is 1/[(x+1)(x+2)]=1/(x+1)−1/(x+2). Integrating term by term gives ln|x+1|−ln|x+2|+C.",
    "variantGroupId": "apcalcbc-v-6.12"
  },
  {
    "id": "apcalcbc-u6-023",
    "unit": "U6",
    "topicCode": "6.12",
    "topic": "Integrating Using Linear Partial Fractions",
    "skill": "2.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Which partial-fraction decomposition is equivalent to (3x+5)/[(x+1)(x+2)]?",
    "o": [
      "2/(x+1) + 1/(x+2)",
      "1/(x+1) + 2/(x+2)",
      "3/(x+1) + 5/(x+2)",
      "2/(x+1) − 1/(x+2)"
    ],
    "c": [
      0
    ],
    "e": "If (3x+5)/[(x+1)(x+2)]=A/(x+1)+B/(x+2), then 3x+5=A(x+2)+B(x+1). Matching coefficients gives A+B=3 and 2A+B=5, so A=2 and B=1.",
    "variantGroupId": "apcalcbc-v-6.12"
  },
  {
    "id": "apcalcbc-u6-024",
    "unit": "U6",
    "topicCode": "6.12",
    "topic": "Integrating Using Linear Partial Fractions",
    "skill": "1.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Which antiderivative is equal to ∫ 1/(x²−1) dx on an interval avoiding x=±1?",
    "o": [
      "(1/2)ln|x−1| + (1/2)ln|x+1| + C",
      "(1/2)ln|x−1| − (1/2)ln|x+1| + C",
      "ln|x²−1| + C",
      "1/(2x) ln|x²−1| + C"
    ],
    "c": [
      1
    ],
    "e": "Because 1/(x²−1)=1/[(x−1)(x+1)]=(1/2)/(x−1)−(1/2)/(x+1), integration gives the stated difference of logarithms.",
    "variantGroupId": "apcalcbc-v-6.12"
  },
  {
    "id": "apcalcbc-u6-025",
    "unit": "U6",
    "topicCode": "6.13",
    "topic": "Evaluating Improper Integrals",
    "skill": "3.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "What is the value of the improper integral ∫ from 1 to ∞ of 1/x² dx?",
    "o": [
      "0",
      "2",
      "1",
      "The integral diverges"
    ],
    "c": [
      2
    ],
    "e": "Rewrite the improper integral as lim b→∞ ∫₁ᵇ x⁻² dx. The antiderivative is −1/x, so the value is lim b→∞(−1/b+1)=1; the finite limit means the integral converges.",
    "variantGroupId": "apcalcbc-v-6.13"
  },
  {
    "id": "apcalcbc-u6-026",
    "unit": "U6",
    "topicCode": "6.13",
    "topic": "Evaluating Improper Integrals",
    "skill": "3.B",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Which conclusion about ∫ from 1 to ∞ of 1/x dx is correct?",
    "o": [
      "It converges to 1 because 1/x approaches 0.",
      "It converges to 0 because the integrand approaches 0.",
      "It converges to ln(1) because the lower endpoint determines the value.",
      "It diverges because ln(b) grows without bound as b→∞."
    ],
    "c": [
      3
    ],
    "e": "The improper integral is lim b→∞[ln x]₁ᵇ=lim b→∞ln(b), which is unbounded. A function tending to zero is necessary for some series tests but does not by itself make this improper integral converge.",
    "variantGroupId": "apcalcbc-v-6.13"
  },
  {
    "id": "apcalcbc-u6-027",
    "unit": "U6",
    "topicCode": "6.13",
    "topic": "Evaluating Improper Integrals",
    "skill": "1.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Evaluate the improper integral ∫ from 0 to 1 of x^(−1/2) dx.",
    "o": [
      "2",
      "1",
      "1/2",
      "The integral diverges"
    ],
    "c": [
      0
    ],
    "e": "Use a limit at the infinite discontinuity: lim a→0⁺ ∫ₐ¹ x⁻¹ᐟ² dx=lim a→0⁺[2√x]ₐ¹=2. The finite one-sided limit establishes convergence.",
    "variantGroupId": "apcalcbc-v-6.13"
  },
  {
    "id": "apcalcbc-u7-011",
    "unit": "U7",
    "topicCode": "7.5",
    "topic": "Approximating Solutions Using Euler’s Method",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "For dy/dx=x+y with y(0)=1, Euler’s method with step size 0.5 is used twice to approximate y(1). What is the approximation?",
    "o": [
      "2.0",
      "2.5",
      "2.25",
      "3.0"
    ],
    "c": [
      1
    ],
    "e": "Starting at (0,1), the first slope is 1, so y(0.5)≈1+0.5(1)=1.5. The next slope is 0.5+1.5=2, so y(1)≈1.5+0.5(2)=2.5.",
    "variantGroupId": "apcalcbc-v-7.5"
  },
  {
    "id": "apcalcbc-u7-012",
    "unit": "U7",
    "topicCode": "7.5",
    "topic": "Approximating Solutions Using Euler’s Method",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "For dy/dx=2x−y with y(0)=1, Euler’s method with step size 1 is used to estimate y(2). What value results?",
    "o": [
      "0",
      "1",
      "2",
      "3"
    ],
    "c": [
      2
    ],
    "e": "At x=0 the slope is −1, so the first Euler step gives y(1)≈0. At x=1 the slope is 2(1)−0=2, so the second step gives y(2)≈0+1·2=2.",
    "variantGroupId": "apcalcbc-v-7.5"
  },
  {
    "id": "apcalcbc-u7-013",
    "unit": "U7",
    "topicCode": "7.5",
    "topic": "Approximating Solutions Using Euler’s Method",
    "skill": "2.D",
    "calculatorAllowed": true,
    "type": "s",
    "q": "A solution satisfies dy/dx=y/x and y(1)=2. Using Euler’s method with step size 0.5, what is the estimate of y(2)?",
    "o": [
      "3",
      "3.5",
      "4.5",
      "4"
    ],
    "c": [
      3
    ],
    "e": "From (1,2), slope=2, so y(1.5)≈3. Then slope at (1.5,3) is 2, so y(2)≈3+0.5(2)=4. The method updates both x and the estimated y after each step.",
    "variantGroupId": "apcalcbc-v-7.5"
  },
  {
    "id": "apcalcbc-u7-014",
    "unit": "U7",
    "topicCode": "7.9",
    "topic": "Logistic Models with Differential Equations",
    "skill": "2.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "A population obeys dP/dt=0.2P(1−P/500). At what population size is the growth rate greatest?",
    "o": [
      "250",
      "100",
      "400",
      "500"
    ],
    "c": [
      0
    ],
    "e": "For a logistic differential equation kP(1−P/K), growth is maximal at half the carrying capacity K. Here K=500, so the maximum growth rate occurs at P=250.",
    "variantGroupId": "apcalcbc-v-7.9"
  },
  {
    "id": "apcalcbc-u7-015",
    "unit": "U7",
    "topicCode": "7.9",
    "topic": "Logistic Models with Differential Equations",
    "skill": "1.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "In the logistic model dP/dt=0.06P(1−P/800), what is the carrying capacity?",
    "o": [
      "0.06",
      "800",
      "48",
      "13,333"
    ],
    "c": [
      1
    ],
    "e": "The logistic form is kP(1−P/K), where K is the carrying capacity. Comparing 1−P/800 with 1−P/K shows directly that K=800.",
    "variantGroupId": "apcalcbc-v-7.9"
  },
  {
    "id": "apcalcbc-u7-016",
    "unit": "U7",
    "topicCode": "7.9",
    "topic": "Logistic Models with Differential Equations",
    "skill": "1.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "For dP/dt=0.1P(1−P/1000), what is dP/dt when P=200?",
    "o": [
      "8",
      "20",
      "16",
      "80"
    ],
    "c": [
      2
    ],
    "e": "Substitute P=200: dP/dt=0.1(200)(1−200/1000)=20(0.8)=16. The logistic factor reduces the unrestricted exponential growth rate as the population approaches carrying capacity.",
    "variantGroupId": "apcalcbc-v-7.9"
  },
  {
    "id": "apcalcbc-u8-019",
    "unit": "U8",
    "topicCode": "8.13",
    "topic": "The Arc Length of a Smooth, Planar Curve and Distance Traveled",
    "skill": "3.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "For the parametric curve x=t and y=t² on 0≤t≤1, which integral gives the arc length?",
    "o": [
      "∫₀¹ (1+2t) dt",
      "∫₀¹ √(1+2t) dt",
      "∫₀¹ (1+4t²) dt",
      "∫₀¹ √(1+4t²) dt"
    ],
    "c": [
      3
    ],
    "e": "For a parametric curve, arc length is ∫√[(dx/dt)²+(dy/dt)²]dt. Here dx/dt=1 and dy/dt=2t, producing ∫₀¹√(1+4t²)dt.",
    "variantGroupId": "apcalcbc-v-8.13"
  },
  {
    "id": "apcalcbc-u8-020",
    "unit": "U8",
    "topicCode": "8.13",
    "topic": "The Arc Length of a Smooth, Planar Curve and Distance Traveled",
    "skill": "1.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Which integral gives the arc length of y=x^(3/2) from x=0 to x=4?",
    "o": [
      "∫₀⁴ √(1+9x/4) dx",
      "∫₀⁴ √(1+3√x/2) dx",
      "∫₀⁴ (1+9x/4) dx",
      "∫₀⁴ √(1+3x²/2) dx"
    ],
    "c": [
      0
    ],
    "e": "For y=f(x), arc length is ∫√[1+(f′(x))²]dx. Since f′(x)=(3/2)√x, its square is 9x/4, giving the stated integral.",
    "variantGroupId": "apcalcbc-v-8.13"
  },
  {
    "id": "apcalcbc-u8-021",
    "unit": "U8",
    "topicCode": "8.13",
    "topic": "The Arc Length of a Smooth, Planar Curve and Distance Traveled",
    "skill": "1.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "A particle has position x=t² and y=t³. What is its speed at t=1?",
    "o": [
      "5",
      "√13",
      "13",
      "√5"
    ],
    "c": [
      1
    ],
    "e": "Speed is the magnitude of the velocity vector. Since dx/dt=2t and dy/dt=3t², at t=1 the velocity is ⟨2,3⟩ and the speed is √(2²+3²)=√13.",
    "variantGroupId": "apcalcbc-v-8.13"
  },
  {
    "id": "apcalcbc-u9-001",
    "unit": "U9",
    "topicCode": "9.1",
    "topic": "Defining and Differentiating Parametric Equations",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "A curve is given by x=t²+1 and y=t³. What is dy/dx at t=2?",
    "o": [
      "3/2",
      "6",
      "3",
      "12"
    ],
    "c": [
      2
    ],
    "e": "For a parametric curve, dy/dx=(dy/dt)/(dx/dt). Here dy/dt=3t² and dx/dt=2t, so dy/dx=3t/2; at t=2 the slope is 3.",
    "variantGroupId": "apcalcbc-v-9.1"
  },
  {
    "id": "apcalcbc-u9-002",
    "unit": "U9",
    "topicCode": "9.1",
    "topic": "Defining and Differentiating Parametric Equations",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "For x=cos(t) and y=sin(t), what is dy/dx at t=π/4?",
    "o": [
      "1",
      "0",
      "√2",
      "−1"
    ],
    "c": [
      3
    ],
    "e": "dy/dx=(cos t)/(−sin t)=−cot t. At t=π/4, sin t and cos t are equal, so the tangent slope is −1.",
    "variantGroupId": "apcalcbc-v-9.1"
  },
  {
    "id": "apcalcbc-u9-003",
    "unit": "U9",
    "topicCode": "9.1",
    "topic": "Defining and Differentiating Parametric Equations",
    "skill": "2.D",
    "calculatorAllowed": true,
    "type": "s",
    "q": "If x=e^t and y=e^(−t), which expression equals dy/dx?",
    "o": [
      "−e^(−2t)",
      "−1",
      "e^(−2t)",
      "−e^(2t)"
    ],
    "c": [
      0
    ],
    "e": "Differentiate both coordinates with respect to t: dy/dt=−e^(−t) and dx/dt=e^t. Their quotient is −e^(−t)/e^t=−e^(−2t).",
    "variantGroupId": "apcalcbc-v-9.1"
  },
  {
    "id": "apcalcbc-u9-004",
    "unit": "U9",
    "topicCode": "9.2",
    "topic": "Second Derivatives of Parametric Equations",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "For x=t² and y=t³ with t>0, what is d²y/dx² at t=1?",
    "o": [
      "3/2",
      "3/4",
      "3",
      "6"
    ],
    "c": [
      1
    ],
    "e": "First dy/dx=(3t²)/(2t)=3t/2. Then d²y/dx²=[d/dt(3t/2)]/(dx/dt)=(3/2)/(2t)=3/(4t), which equals 3/4 at t=1.",
    "variantGroupId": "apcalcbc-v-9.2"
  },
  {
    "id": "apcalcbc-u9-005",
    "unit": "U9",
    "topicCode": "9.2",
    "topic": "Second Derivatives of Parametric Equations",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "For x=t and y=t³, which expression equals d²y/dx²?",
    "o": [
      "3t²",
      "6t²",
      "6t",
      "6"
    ],
    "c": [
      2
    ],
    "e": "Because dx/dt=1, dy/dx=3t². Differentiating that with respect to t and dividing again by dx/dt gives d²y/dx²=6t.",
    "variantGroupId": "apcalcbc-v-9.2"
  },
  {
    "id": "apcalcbc-u9-006",
    "unit": "U9",
    "topicCode": "9.2",
    "topic": "Second Derivatives of Parametric Equations",
    "skill": "1.D",
    "calculatorAllowed": true,
    "type": "s",
    "q": "For x=cos(t), y=sin(t), what is d²y/dx² at t=π/2?",
    "o": [
      "0",
      "1",
      "The value is undefined",
      "−1"
    ],
    "c": [
      3
    ],
    "e": "The first derivative is −cot t. Differentiate with respect to t to obtain csc²t, then divide by dx/dt=−sin t. At π/2 this gives 1/(−1)=−1.",
    "variantGroupId": "apcalcbc-v-9.2"
  },
  {
    "id": "apcalcbc-u9-007",
    "unit": "U9",
    "topicCode": "9.3",
    "topic": "Finding Arc Lengths of Curves Given by Parametric Equations",
    "skill": "3.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Which integral gives the arc length of x=t and y=t² for 0≤t≤1?",
    "o": [
      "∫₀¹ √(1+4t²) dt",
      "∫₀¹ (1+2t) dt",
      "∫₀¹ √(1+2t) dt",
      "∫₀¹ (1+4t²) dt"
    ],
    "c": [
      0
    ],
    "e": "Parametric arc length is ∫√[(dx/dt)²+(dy/dt)²]dt. Here the derivatives are 1 and 2t, so the integrand is √(1+4t²).",
    "variantGroupId": "apcalcbc-v-9.3"
  },
  {
    "id": "apcalcbc-u9-008",
    "unit": "U9",
    "topicCode": "9.3",
    "topic": "Finding Arc Lengths of Curves Given by Parametric Equations",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "The curve x=3cos(t), y=3sin(t) is traced for 0≤t≤π/2. What is its arc length?",
    "o": [
      "π/2",
      "3π/2",
      "3π",
      "9π/2"
    ],
    "c": [
      1
    ],
    "e": "The speed along the parametrized curve is √[9sin²t+9cos²t]=3. Integrating 3 from 0 to π/2 gives an arc length of 3π/2.",
    "variantGroupId": "apcalcbc-v-9.3"
  },
  {
    "id": "apcalcbc-u9-009",
    "unit": "U9",
    "topicCode": "9.3",
    "topic": "Finding Arc Lengths of Curves Given by Parametric Equations",
    "skill": "1.D",
    "calculatorAllowed": true,
    "type": "s",
    "q": "For x=2t and y=t² on 0≤t≤1, which integrand belongs in the parametric arc-length formula?",
    "o": [
      "2+2t",
      "√(2+2t)",
      "√(4+4t²)",
      "4+4t²"
    ],
    "c": [
      2
    ],
    "e": "For parametric arc length, square both coordinate derivatives before adding them. Here dx/dt=2 and dy/dt=2t, so √[(dx/dt)²+(dy/dt)²]=√[(2)²+(2t)²]=√(4+4t²).",
    "variantGroupId": "apcalcbc-v-9.3"
  },
  {
    "id": "apcalcbc-u9-010",
    "unit": "U9",
    "topicCode": "9.4",
    "topic": "Defining and Differentiating Vector-Valued Functions",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "If r(t)=⟨t²,sin(t)⟩, what is r′(t)?",
    "o": [
      "⟨t,cos(t)⟩",
      "⟨2t,−sin(t)⟩",
      "⟨t²,cos(t)⟩",
      "⟨2t,cos(t)⟩"
    ],
    "c": [
      3
    ],
    "e": "Differentiate a vector-valued function component by component. The derivative of t² is 2t and the derivative of sin(t) is cos(t), giving ⟨2t,cos(t)⟩.",
    "variantGroupId": "apcalcbc-v-9.4"
  },
  {
    "id": "apcalcbc-u9-011",
    "unit": "U9",
    "topicCode": "9.4",
    "topic": "Defining and Differentiating Vector-Valued Functions",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "A particle has position r(t)=⟨e^t,t³⟩. Which vector is its velocity?",
    "o": [
      "⟨e^t,3t²⟩",
      "⟨te^t,t²⟩",
      "⟨e^t,3t⟩",
      "⟨e^(−t),3t²⟩"
    ],
    "c": [
      0
    ],
    "e": "Velocity is the derivative of position. Differentiating each coordinate gives d(e^t)/dt=e^t and d(t³)/dt=3t².",
    "variantGroupId": "apcalcbc-v-9.4"
  },
  {
    "id": "apcalcbc-u9-012",
    "unit": "U9",
    "topicCode": "9.4",
    "topic": "Defining and Differentiating Vector-Valued Functions",
    "skill": "2.D",
    "calculatorAllowed": true,
    "type": "s",
    "q": "For r(t)=⟨cos(t),sin(t)⟩, which vector is the acceleration r″(t)?",
    "o": [
      "⟨−sin(t),cos(t)⟩",
      "⟨−cos(t),−sin(t)⟩",
      "⟨cos(t),sin(t)⟩",
      "⟨sin(t),−cos(t)⟩"
    ],
    "c": [
      1
    ],
    "e": "Differentiate twice componentwise. The velocity is ⟨−sin t,cos t⟩, and differentiating again gives acceleration ⟨−cos t,−sin t⟩.",
    "variantGroupId": "apcalcbc-v-9.4"
  },
  {
    "id": "apcalcbc-u9-013",
    "unit": "U9",
    "topicCode": "9.5",
    "topic": "Integrating Vector-Valued Functions",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "A particle has velocity v(t)=⟨2t,3t²⟩ and position r(0)=⟨1,−1⟩. Which position function is correct?",
    "o": [
      "r(t)=⟨2t²+1,3t³−1⟩",
      "r(t)=⟨t²−1,t³+1⟩",
      "r(t)=⟨t²+1,t³−1⟩",
      "r(t)=⟨2t+1,3t²−1⟩"
    ],
    "c": [
      2
    ],
    "e": "Integrating velocity gives ⟨t²+C₁,t³+C₂⟩. The initial position r(0)=⟨1,−1⟩ forces C₁=1 and C₂=−1.",
    "variantGroupId": "apcalcbc-v-9.5"
  },
  {
    "id": "apcalcbc-u9-014",
    "unit": "U9",
    "topicCode": "9.5",
    "topic": "Integrating Vector-Valued Functions",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "If a(t)=⟨2,6t⟩ and v(0)=⟨−1,4⟩, which velocity function satisfies the data?",
    "o": [
      "v(t)=⟨t²−1,6t²+4⟩",
      "v(t)=⟨2t+1,3t²−4⟩",
      "v(t)=⟨2,6t⟩",
      "v(t)=⟨2t−1,3t²+4⟩"
    ],
    "c": [
      3
    ],
    "e": "Integrating the acceleration componentwise gives v(t)=⟨2t+C₁,3t²+C₂⟩. Substituting t=0 and the initial velocity gives C₁=−1 and C₂=4.",
    "variantGroupId": "apcalcbc-v-9.5"
  },
  {
    "id": "apcalcbc-u9-015",
    "unit": "U9",
    "topicCode": "9.5",
    "topic": "Integrating Vector-Valued Functions",
    "skill": "2.D",
    "calculatorAllowed": true,
    "type": "s",
    "q": "A particle has velocity v(t)=⟨t,2t⟩. What is its displacement vector from t=0 to t=2?",
    "o": [
      "⟨2,4⟩",
      "⟨4,8⟩",
      "⟨2,2⟩",
      "⟨1,2⟩"
    ],
    "c": [
      0
    ],
    "e": "Displacement is the definite integral of velocity. Integrating from 0 to 2 gives ⟨[t²/2]₀²,[t²]₀²⟩=⟨2,4⟩.",
    "variantGroupId": "apcalcbc-v-9.5"
  },
  {
    "id": "apcalcbc-u9-016",
    "unit": "U9",
    "topicCode": "9.6",
    "topic": "Solving Motion Problems Using Parametric and Vector-Valued Functions",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "A particle has velocity v(t)=⟨3,4t⟩. What is its speed at t=1?",
    "o": [
      "4",
      "5",
      "7",
      "25"
    ],
    "c": [
      1
    ],
    "e": "Speed is the magnitude of velocity. At t=1 the velocity vector is ⟨3,4⟩, whose magnitude is √(3²+4²)=5.",
    "variantGroupId": "apcalcbc-v-9.6"
  },
  {
    "id": "apcalcbc-u9-017",
    "unit": "U9",
    "topicCode": "9.6",
    "topic": "Solving Motion Problems Using Parametric and Vector-Valued Functions",
    "skill": "2.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "A particle starts at r(0)=⟨2,−1⟩ and has velocity v(t)=⟨1,t⟩. What is r(2)?",
    "o": [
      "⟨3,1⟩",
      "⟨4,3⟩",
      "⟨4,1⟩",
      "⟨2,2⟩"
    ],
    "c": [
      2
    ],
    "e": "The displacement from 0 to 2 is ∫₀²⟨1,t⟩dt=⟨2,2⟩. Adding the initial position ⟨2,−1⟩ gives r(2)=⟨4,1⟩.",
    "variantGroupId": "apcalcbc-v-9.6"
  },
  {
    "id": "apcalcbc-u9-018",
    "unit": "U9",
    "topicCode": "9.6",
    "topic": "Solving Motion Problems Using Parametric and Vector-Valued Functions",
    "skill": "1.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "For x(t)=t²−1 and y(t)=2t, at what rate is the particle’s distance from the origin changing at t=1?",
    "o": [
      "4/5",
      "√5",
      "2√5/5",
      "2"
    ],
    "c": [
      3
    ],
    "e": "Let R=√(x²+y²). Then dR/dt=(x x′+y y′)/R. At t=1, x=0, y=2, x′=2, y′=2, so dR/dt=(0+4)/2=2. However the requested rate of distance from the origin is therefore 2, not 2√5/5.",
    "variantGroupId": "apcalcbc-v-9.6"
  },
  {
    "id": "apcalcbc-u9-019",
    "unit": "U9",
    "topicCode": "9.7",
    "topic": "Defining Polar Coordinates and Differentiating in Polar Form",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "For the polar curve r=2cos(θ), what is dy/dx at θ=π/4?",
    "o": [
      "0",
      "−1",
      "1",
      "The slope is undefined"
    ],
    "c": [
      0
    ],
    "e": "Using x=r cosθ and y=r sinθ, dy/dx=(r′sinθ+r cosθ)/(r′cosθ−r sinθ). At θ=π/4, r=√2 and r′=−√2, so the numerator is 0 and the denominator is −2.",
    "variantGroupId": "apcalcbc-v-9.7"
  },
  {
    "id": "apcalcbc-u9-020",
    "unit": "U9",
    "topicCode": "9.7",
    "topic": "Defining Polar Coordinates and Differentiating in Polar Form",
    "skill": "2.C",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Which Cartesian point corresponds to the polar coordinates (r,θ)=(−2,0)?",
    "o": [
      "(2,0)",
      "(−2,0)",
      "(0,−2)",
      "(0,2)"
    ],
    "c": [
      1
    ],
    "e": "Polar coordinates convert by x=r cosθ and y=r sinθ. With r=−2 and θ=0, x=−2 and y=0. A negative radius reverses direction along the ray.",
    "variantGroupId": "apcalcbc-v-9.7"
  },
  {
    "id": "apcalcbc-u9-021",
    "unit": "U9",
    "topicCode": "9.7",
    "topic": "Defining Polar Coordinates and Differentiating in Polar Form",
    "skill": "1.D",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Which formula gives dy/dx for a polar curve r=f(θ)?",
    "o": [
      "(r′cosθ−r sinθ)/(r′sinθ+r cosθ)",
      "r′/r",
      "(r′sinθ+r cosθ)/(r′cosθ−r sinθ)",
      "(r cosθ)/(r sinθ)"
    ],
    "c": [
      2
    ],
    "e": "Differentiate x=r cosθ and y=r sinθ with respect to θ, then divide dy/dθ by dx/dθ. This yields the stated quotient.",
    "variantGroupId": "apcalcbc-v-9.7"
  },
  {
    "id": "apcalcbc-u9-022",
    "unit": "U9",
    "topicCode": "9.8",
    "topic": "Finding the Area of a Polar Region or the Area Bounded by a Single Polar Curve",
    "skill": "3.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "What is the area enclosed by r=2cos(θ) for −π/2≤θ≤π/2?",
    "o": [
      "π/2",
      "2π",
      "4π",
      "π"
    ],
    "c": [
      3
    ],
    "e": "Polar area is (1/2)∫r²dθ. Thus the area is (1/2)∫ from −π/2 to π/2 of 4cos²θ dθ=2·(π/2)=π.",
    "variantGroupId": "apcalcbc-v-9.8"
  },
  {
    "id": "apcalcbc-u9-023",
    "unit": "U9",
    "topicCode": "9.8",
    "topic": "Finding the Area of a Polar Region or the Area Bounded by a Single Polar Curve",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "For r=3 and 0≤θ≤π/2, what area is swept out?",
    "o": [
      "9π/4",
      "3π/2",
      "9π/2",
      "9π"
    ],
    "c": [
      0
    ],
    "e": "The polar area formula gives (1/2)∫₀^(π/2)9 dθ=(9/2)(π/2)=9π/4, which is also the area of a quarter-circle of radius 3.",
    "variantGroupId": "apcalcbc-v-9.8"
  },
  {
    "id": "apcalcbc-u9-024",
    "unit": "U9",
    "topicCode": "9.8",
    "topic": "Finding the Area of a Polar Region or the Area Bounded by a Single Polar Curve",
    "skill": "2.D",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Which integral gives the entire area enclosed by the cardioid r=1+cos(θ)?",
    "o": [
      "∫₀^(2π) (1+cosθ) dθ",
      "(1/2)∫₀^(2π) (1+cosθ)² dθ",
      "(1/2)∫₀^π (1+cosθ) dθ",
      "∫₀^π (1+cosθ)² dθ"
    ],
    "c": [
      1
    ],
    "e": "A full tracing of the cardioid occurs over 0≤θ≤2π, and polar area is one-half the integral of r². Substituting r=1+cosθ gives the stated setup.",
    "variantGroupId": "apcalcbc-v-9.8"
  },
  {
    "id": "apcalcbc-u9-025",
    "unit": "U9",
    "topicCode": "9.9",
    "topic": "Finding the Area of the Region Bounded by Two Polar Curves",
    "skill": "3.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "What is the area between the circles r=2 and r=1 over 0≤θ≤2π?",
    "o": [
      "π",
      "2π",
      "3π",
      "4π"
    ],
    "c": [
      2
    ],
    "e": "For area between polar curves, integrate one-half of outer radius squared minus inner radius squared: (1/2)∫₀^(2π)(4−1)dθ=3π.",
    "variantGroupId": "apcalcbc-v-9.9"
  },
  {
    "id": "apcalcbc-u9-026",
    "unit": "U9",
    "topicCode": "9.9",
    "topic": "Finding the Area of the Region Bounded by Two Polar Curves",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "On 0≤θ≤π/2, what is the area inside r=2 but outside r=2cos(θ)?",
    "o": [
      "π/4",
      "π",
      "2π",
      "π/2"
    ],
    "c": [
      3
    ],
    "e": "Use (1/2)∫₀^(π/2)[4−4cos²θ]dθ=2∫₀^(π/2)sin²θ dθ. Since that sine-squared integral is π/4, the area is π/2.",
    "variantGroupId": "apcalcbc-v-9.9"
  },
  {
    "id": "apcalcbc-u9-027",
    "unit": "U9",
    "topicCode": "9.9",
    "topic": "Finding the Area of the Region Bounded by Two Polar Curves",
    "skill": "2.D",
    "calculatorAllowed": true,
    "type": "s",
    "q": "If r=f(θ) lies outside r=g(θ) on a≤θ≤b, which expression gives the area between the curves?",
    "o": [
      "(1/2)∫ₐᵇ [f(θ)²−g(θ)²] dθ",
      "∫ₐᵇ [f(θ)−g(θ)] dθ",
      "(1/2)∫ₐᵇ [f(θ)−g(θ)]² dθ",
      "∫ₐᵇ [f(θ)²+g(θ)²] dθ"
    ],
    "c": [
      0
    ],
    "e": "Polar area is accumulated as one-half radius squared. Subtracting the inner area element from the outer area element gives one-half of f²−g² over the common angular interval.",
    "variantGroupId": "apcalcbc-v-9.9"
  },
  {
    "id": "apcalcbc-u10-001",
    "unit": "U10",
    "topicCode": "10.1",
    "topic": "Defining Convergent and Divergent Infinite Series",
    "skill": "3.B",
    "calculatorAllowed": false,
    "type": "s",
    "q": "For the series Σ from n=1 to ∞ of aₙ, which statement best defines convergence?",
    "o": [
      "The terms aₙ eventually become zero.",
      "The sequence of partial sums approaches a finite limit.",
      "The terms aₙ approach a finite nonzero number.",
      "The partial sums increase without bound."
    ],
    "c": [
      1
    ],
    "e": "An infinite series converges precisely when its sequence of finite partial sums has a finite limit. Individual terms need not become exactly zero, although they must approach zero.",
    "variantGroupId": "apcalcbc-v-10.1"
  },
  {
    "id": "apcalcbc-u10-002",
    "unit": "U10",
    "topicCode": "10.1",
    "topic": "Defining Convergent and Divergent Infinite Series",
    "skill": "2.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "The sequence of partial sums of a series is Sₙ=3−2/n. Which conclusion is correct?",
    "o": [
      "The series converges to 1.",
      "The series diverges because Sₙ changes with n.",
      "The series converges to 3.",
      "The series diverges because 2/n is positive."
    ],
    "c": [
      2
    ],
    "e": "A series sum is the limit of its partial sums. Since lim n→∞(3−2/n)=3, the sequence of partial sums approaches 3 and the series converges to that value.",
    "variantGroupId": "apcalcbc-v-10.1"
  },
  {
    "id": "apcalcbc-u10-003",
    "unit": "U10",
    "topicCode": "10.1",
    "topic": "Defining Convergent and Divergent Infinite Series",
    "skill": "3.D",
    "calculatorAllowed": true,
    "type": "s",
    "q": "A series has partial sums Sₙ=ln(n). What can be concluded about the series?",
    "o": [
      "It converges to 0 because ln(n)/n approaches 0.",
      "It converges to 1 because ln(1)=0.",
      "It converges because successive partial sums get closer together.",
      "It diverges because the partial sums are unbounded."
    ],
    "c": [
      3
    ],
    "e": "Convergence of a series depends on whether Sₙ approaches a finite number. Since ln(n) grows without bound, the partial sums do not have a finite limit, so the series diverges.",
    "variantGroupId": "apcalcbc-v-10.1"
  },
  {
    "id": "apcalcbc-u10-004",
    "unit": "U10",
    "topicCode": "10.2",
    "topic": "Working with Geometric Series",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "What is the sum of the geometric series Σ from n=0 to ∞ of (1/3)^n?",
    "o": [
      "3/2",
      "1/2",
      "1",
      "3"
    ],
    "c": [
      0
    ],
    "e": "A geometric series with first term 1 and ratio 1/3 converges because |1/3|<1. Its sum is a/(1−r)=1/(1−1/3)=3/2.",
    "variantGroupId": "apcalcbc-v-10.2"
  },
  {
    "id": "apcalcbc-u10-005",
    "unit": "U10",
    "topicCode": "10.2",
    "topic": "Working with Geometric Series",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "What is the sum of 2+0.8+0.32+0.128+⋯?",
    "o": [
      "8/3",
      "10/3",
      "3",
      "4"
    ],
    "c": [
      1
    ],
    "e": "This is geometric with first term 2 and common ratio 0.4. Since |0.4|<1, the sum is 2/(1−0.4)=2/0.6=10/3.",
    "variantGroupId": "apcalcbc-v-10.2"
  },
  {
    "id": "apcalcbc-u10-006",
    "unit": "U10",
    "topicCode": "10.2",
    "topic": "Working with Geometric Series",
    "skill": "3.B",
    "calculatorAllowed": true,
    "type": "s",
    "q": "For which values of r does the geometric series Σ from n=0 to ∞ of ar^n converge when a≠0?",
    "o": [
      "|r|≤1",
      "r>0",
      "|r|<1",
      "r≠1"
    ],
    "c": [
      2
    ],
    "e": "A nonzero geometric series converges exactly when repeated multiplication by r drives the terms to zero fast enough, which occurs for |r|<1. At r=±1 or beyond, the partial sums do not settle to a finite limit.",
    "variantGroupId": "apcalcbc-v-10.2"
  },
  {
    "id": "apcalcbc-u10-007",
    "unit": "U10",
    "topicCode": "10.3",
    "topic": "The nth Term Test for Divergence",
    "skill": "3.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "What does the nth-term test imply about Σ n/(n+1) from n=1 to ∞?",
    "o": [
      "It converges because n/(n+1) is less than 1.",
      "It converges to 1 because the terms approach 1.",
      "The test proves convergence because the terms are bounded.",
      "It diverges because n/(n+1) approaches 1, not 0."
    ],
    "c": [
      3
    ],
    "e": "A necessary condition for convergence of Σaₙ is aₙ→0. Here n/(n+1)→1, so the condition fails and the nth-term test proves divergence.",
    "variantGroupId": "apcalcbc-v-10.3"
  },
  {
    "id": "apcalcbc-u10-008",
    "unit": "U10",
    "topicCode": "10.3",
    "topic": "The nth Term Test for Divergence",
    "skill": "3.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "What does the nth-term test show for Σ (−1)^n from n=1 to ∞?",
    "o": [
      "The series diverges because the terms do not approach 0.",
      "The series converges because signs alternate.",
      "The series converges to 0 because positive and negative terms cancel.",
      "The test is inconclusive because the terms are bounded."
    ],
    "c": [
      0
    ],
    "e": "The terms alternate between −1 and 1 and therefore have no limit of 0. Because convergence of a series requires its terms to approach zero, the series diverges.",
    "variantGroupId": "apcalcbc-v-10.3"
  },
  {
    "id": "apcalcbc-u10-009",
    "unit": "U10",
    "topicCode": "10.3",
    "topic": "The nth Term Test for Divergence",
    "skill": "3.B",
    "calculatorAllowed": true,
    "type": "s",
    "q": "If lim aₙ=0, what can the nth-term test alone establish about Σaₙ?",
    "o": [
      "The series must converge.",
      "Nothing conclusive about convergence; the series may converge or diverge.",
      "The series must diverge.",
      "The series converges absolutely."
    ],
    "c": [
      1
    ],
    "e": "The condition aₙ→0 is necessary but not sufficient for series convergence. The harmonic series is a standard counterexample, so another convergence test is needed when the term limit is zero.",
    "variantGroupId": "apcalcbc-v-10.3"
  },
  {
    "id": "apcalcbc-u10-010",
    "unit": "U10",
    "topicCode": "10.4",
    "topic": "Integral Test for Convergence",
    "skill": "3.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Using the integral test, what can be concluded about Σ 1/(n²+1) from n=1 to ∞?",
    "o": [
      "It diverges because the terms are positive.",
      "It diverges because ∫₁^∞1/(x²+1)dx is unbounded.",
      "It converges because ∫₁^∞ 1/(x²+1) dx is finite.",
      "The integral test cannot apply to a decreasing positive function."
    ],
    "c": [
      2
    ],
    "e": "The function 1/(x²+1) is positive, continuous, and decreasing for x≥1. Its improper integral equals π/4, a finite value, so the integral test gives convergence.",
    "variantGroupId": "apcalcbc-v-10.4"
  },
  {
    "id": "apcalcbc-u10-011",
    "unit": "U10",
    "topicCode": "10.4",
    "topic": "Integral Test for Convergence",
    "skill": "3.B",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Which conditions are required to apply the integral test to Σf(n)?",
    "o": [
      "f is polynomial and bounded.",
      "f alternates in sign and approaches zero.",
      "f is differentiable and increasing.",
      "f is positive, continuous, and decreasing on an appropriate interval."
    ],
    "c": [
      3
    ],
    "e": "The integral test compares a series with the improper integral of the same positive function. Positivity, continuity, and monotone decrease are the standard hypotheses that make the comparison valid.",
    "variantGroupId": "apcalcbc-v-10.4"
  },
  {
    "id": "apcalcbc-u10-012",
    "unit": "U10",
    "topicCode": "10.4",
    "topic": "Integral Test for Convergence",
    "skill": "3.D",
    "calculatorAllowed": true,
    "type": "s",
    "q": "The integral ∫₁^∞ x^(−3/2) dx converges. What does the integral test say about Σ n^(−3/2)?",
    "o": [
      "The series converges.",
      "The series diverges because its terms are positive.",
      "The series diverges because n^(−3/2) approaches 0.",
      "The test is inconclusive because the exponent is not an integer."
    ],
    "c": [
      0
    ],
    "e": "The function x^(−3/2) is positive, continuous, and decreasing for x≥1, and its improper integral is finite. Therefore the corresponding p-series converges by the integral test.",
    "variantGroupId": "apcalcbc-v-10.4"
  },
  {
    "id": "apcalcbc-u10-013",
    "unit": "U10",
    "topicCode": "10.5",
    "topic": "Harmonic Series and p-Series",
    "skill": "3.B",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Which statement about the harmonic series Σ1/n is correct?",
    "o": [
      "It converges because its terms approach 0.",
      "It diverges even though its terms approach 0.",
      "It converges absolutely to 1.",
      "It diverges because its terms approach 1."
    ],
    "c": [
      1
    ],
    "e": "The harmonic series is the p-series with p=1 and diverges. It is the standard example showing that aₙ→0 is necessary but not sufficient for convergence of Σaₙ.",
    "variantGroupId": "apcalcbc-v-10.5"
  },
  {
    "id": "apcalcbc-u10-014",
    "unit": "U10",
    "topicCode": "10.5",
    "topic": "Harmonic Series and p-Series",
    "skill": "3.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "What is the convergence behavior of Σ1/n²?",
    "o": [
      "It diverges because the p-value is above the convergence threshold.",
      "It diverges because integer exponents do not define convergent p-series.",
      "It converges because it is a p-series with p=2>1.",
      "It converges conditionally because alternating signs would be required for absolute convergence."
    ],
    "c": [
      2
    ],
    "e": "For a p-series Σ1/n^p, convergence occurs exactly when p>1. Here p=2, so the series converges, and because all terms are positive the distinction between absolute and conditional convergence is irrelevant.",
    "variantGroupId": "apcalcbc-v-10.5"
  },
  {
    "id": "apcalcbc-u10-015",
    "unit": "U10",
    "topicCode": "10.5",
    "topic": "Harmonic Series and p-Series",
    "skill": "3.D",
    "calculatorAllowed": true,
    "type": "s",
    "q": "What is the convergence behavior of Σ1/n^0.8?",
    "o": [
      "It converges because the terms approach 0.",
      "It converges because p is positive.",
      "It converges conditionally because p<1.",
      "It diverges because p=0.8≤1."
    ],
    "c": [
      3
    ],
    "e": "A p-series converges only for p>1. Although n^(−0.8) approaches zero, p=0.8 is at or below the divergence threshold, so the series diverges.",
    "variantGroupId": "apcalcbc-v-10.5"
  },
  {
    "id": "apcalcbc-u10-016",
    "unit": "U10",
    "topicCode": "10.6",
    "topic": "Comparison Tests for Convergence",
    "skill": "3.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Which comparison proves that Σ1/(n²+3) converges?",
    "o": [
      "0<1/(n²+3)<1/n² and Σ1/n² converges.",
      "1/(n²+3)>1/n² and Σ1/n² converges.",
      "1/(n²+3)<1/n and Σ1/n diverges.",
      "The terms approach 0, so comparison is unnecessary."
    ],
    "c": [
      0
    ],
    "e": "Direct comparison for convergence requires an upper bound by a known convergent positive series. Since 1/(n²+3)<1/n² and the p-series with p=2 converges, the given series converges.",
    "variantGroupId": "apcalcbc-v-10.6"
  },
  {
    "id": "apcalcbc-u10-017",
    "unit": "U10",
    "topicCode": "10.6",
    "topic": "Comparison Tests for Convergence",
    "skill": "3.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Which conclusion follows by limit comparison for aₙ=1/√(n²+1) and bₙ=1/n?",
    "o": [
      "Σaₙ converges because aₙ<1/n.",
      "Σaₙ diverges because aₙ/bₙ approaches 1 and Σ1/n diverges.",
      "Σaₙ converges because the ratio approaches 1.",
      "The test is inconclusive whenever the ratio is finite."
    ],
    "c": [
      1
    ],
    "e": "The ratio aₙ/bₙ=n/√(n²+1) approaches 1, a finite positive constant. Therefore the two positive series have the same convergence behavior, and the harmonic comparison series diverges.",
    "variantGroupId": "apcalcbc-v-10.6"
  },
  {
    "id": "apcalcbc-u10-018",
    "unit": "U10",
    "topicCode": "10.6",
    "topic": "Comparison Tests for Convergence",
    "skill": "3.B",
    "calculatorAllowed": true,
    "type": "s",
    "q": "In the limit comparison test, what conclusion is available if lim aₙ/bₙ=L with 0<L<∞?",
    "o": [
      "Both series must converge.",
      "Both series must diverge.",
      "Σaₙ and Σbₙ either both converge or both diverge.",
      "The series with larger terms always converges faster."
    ],
    "c": [
      2
    ],
    "e": "A finite positive ratio means the terms are asymptotically comparable by constant factors. That is exactly the condition under which the limit comparison test transfers convergence or divergence between the two positive series.",
    "variantGroupId": "apcalcbc-v-10.6"
  },
  {
    "id": "apcalcbc-u10-019",
    "unit": "U10",
    "topicCode": "10.7",
    "topic": "Alternating Series Test for Convergence",
    "skill": "3.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Why does Σ(−1)^(n+1)/n converge?",
    "o": [
      "It converges because all alternating series converge.",
      "It converges because 1/n has a finite positive sum.",
      "It converges because the terms become exactly zero.",
      "The magnitudes 1/n decrease to 0, so the alternating series test applies."
    ],
    "c": [
      3
    ],
    "e": "The alternating series test requires decreasing positive magnitudes tending to zero. The sequence 1/n has both properties, so the alternating harmonic series converges.",
    "variantGroupId": "apcalcbc-v-10.7"
  },
  {
    "id": "apcalcbc-u10-020",
    "unit": "U10",
    "topicCode": "10.7",
    "topic": "Alternating Series Test for Convergence",
    "skill": "3.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "What can be concluded about Σ(−1)^n n/(n+1)?",
    "o": [
      "It diverges because the terms do not approach 0.",
      "It converges by the alternating series test.",
      "It converges absolutely because n/(n+1)<1.",
      "It converges conditionally because signs alternate."
    ],
    "c": [
      0
    ],
    "e": "Although the signs alternate, the magnitudes n/(n+1) approach 1 rather than 0. The nth-term condition fails, so the series diverges before the alternating series test can establish convergence.",
    "variantGroupId": "apcalcbc-v-10.7"
  },
  {
    "id": "apcalcbc-u10-021",
    "unit": "U10",
    "topicCode": "10.7",
    "topic": "Alternating Series Test for Convergence",
    "skill": "3.B",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Which pair of conditions is central to the alternating series test for Σ(−1)^n bₙ?",
    "o": [
      "bₙ increases and bₙ→∞.",
      "bₙ eventually decreases and bₙ→0.",
      "bₙ is constant and positive.",
      "bₙ has a finite nonzero limit."
    ],
    "c": [
      1
    ],
    "e": "For an alternating series, convergence is guaranteed when the positive magnitudes eventually decrease and tend to zero. Those conditions control the size of successive oscillations of the partial sums.",
    "variantGroupId": "apcalcbc-v-10.7"
  },
  {
    "id": "apcalcbc-u10-022",
    "unit": "U10",
    "topicCode": "10.8",
    "topic": "Ratio Test for Convergence",
    "skill": "3.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "What does the ratio test imply about Σ2^n/n! from n=0 to ∞?",
    "o": [
      "It diverges because 2^n grows exponentially.",
      "It diverges because the ratio limit is 2.",
      "It converges absolutely because the ratio limit is 0.",
      "The test is inconclusive because factorials are present."
    ],
    "c": [
      2
    ],
    "e": "For aₙ=2^n/n!, |aₙ₊₁/aₙ|=2/(n+1), which approaches 0<1. The ratio test therefore gives absolute convergence.",
    "variantGroupId": "apcalcbc-v-10.8"
  },
  {
    "id": "apcalcbc-u10-023",
    "unit": "U10",
    "topicCode": "10.8",
    "topic": "Ratio Test for Convergence",
    "skill": "3.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "What does the ratio test imply about Σ n!/3^n?",
    "o": [
      "It converges because 3^n is exponential.",
      "It converges because the ratio approaches 0.",
      "The test proves conditional convergence.",
      "It diverges because |aₙ₊₁/aₙ|=(n+1)/3 eventually exceeds 1 and has no finite limit below 1."
    ],
    "c": [
      3
    ],
    "e": "The successive-term ratio is (n+1)/3, which grows without bound. Since the limiting ratio is greater than 1 in the extended sense, the terms do not decay sufficiently and the series diverges.",
    "variantGroupId": "apcalcbc-v-10.8"
  },
  {
    "id": "apcalcbc-u10-024",
    "unit": "U10",
    "topicCode": "10.8",
    "topic": "Ratio Test for Convergence",
    "skill": "3.B",
    "calculatorAllowed": true,
    "type": "s",
    "q": "For a series of nonzero terms, the ratio test gives lim |aₙ₊₁/aₙ|=0.5. What follows?",
    "o": [
      "The series converges absolutely.",
      "The series diverges.",
      "The test is inconclusive.",
      "The series converges only conditionally."
    ],
    "c": [
      0
    ],
    "e": "The ratio test gives absolute convergence whenever the limiting absolute ratio is less than 1. Because 0.5<1, the series converges absolutely.",
    "variantGroupId": "apcalcbc-v-10.8"
  },
  {
    "id": "apcalcbc-u10-025",
    "unit": "U10",
    "topicCode": "10.9",
    "topic": "Determining Absolute or Conditional Convergence",
    "skill": "3.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "How does the alternating harmonic series Σ(−1)^(n+1)/n converge?",
    "o": [
      "Absolutely, because its terms approach 0.",
      "Conditionally, because it converges but Σ1/n diverges.",
      "Absolutely, because signs alternate.",
      "It diverges because Σ1/n diverges."
    ],
    "c": [
      1
    ],
    "e": "The alternating series test gives convergence, while the series of absolute values is the divergent harmonic series. Convergence without absolute convergence is conditional convergence.",
    "variantGroupId": "apcalcbc-v-10.9"
  },
  {
    "id": "apcalcbc-u10-026",
    "unit": "U10",
    "topicCode": "10.9",
    "topic": "Determining Absolute or Conditional Convergence",
    "skill": "3.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "How does Σ(−1)^n/n² converge?",
    "o": [
      "Conditionally, because signs alternate.",
      "It diverges because the signs change.",
      "Absolutely, because Σ1/n² converges.",
      "Conditionally, because 1/n² approaches 0."
    ],
    "c": [
      2
    ],
    "e": "Taking absolute values produces the p-series Σ1/n², which converges because p=2>1. Therefore the original alternating series converges absolutely.",
    "variantGroupId": "apcalcbc-v-10.9"
  },
  {
    "id": "apcalcbc-u10-027",
    "unit": "U10",
    "topicCode": "10.9",
    "topic": "Determining Absolute or Conditional Convergence",
    "skill": "3.B",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Which description matches conditional convergence of Σaₙ?",
    "o": [
      "Both Σaₙ and Σ|aₙ| converge.",
      "Both Σaₙ and Σ|aₙ| diverge.",
      "Σaₙ diverges but Σ|aₙ| converges.",
      "Σaₙ converges but Σ|aₙ| diverges."
    ],
    "c": [
      3
    ],
    "e": "Conditional convergence is defined by convergence of the signed series together with divergence of its absolute-value series. If the absolute-value series converges, the original convergence is absolute instead.",
    "variantGroupId": "apcalcbc-v-10.9"
  },
  {
    "id": "apcalcbc-u10-028",
    "unit": "U10",
    "topicCode": "10.10",
    "topic": "Alternating Series Error Bound",
    "skill": "3.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "The alternating harmonic series is used to approximate ln(2) with the first 4 terms. What error bound is guaranteed by the alternating series error theorem?",
    "o": [
      "At most 1/5",
      "At most 1/4",
      "At most 1/16",
      "At most 1/20"
    ],
    "c": [
      0
    ],
    "e": "For an alternating series satisfying the test conditions, the remainder after N terms has magnitude no greater than the first omitted term. After four terms, that next magnitude is 1/5.",
    "variantGroupId": "apcalcbc-v-10.10"
  },
  {
    "id": "apcalcbc-u10-029",
    "unit": "U10",
    "topicCode": "10.10",
    "topic": "Alternating Series Error Bound",
    "skill": "1.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "How many terms of Σ(−1)^(n+1)/n are sufficient to guarantee an approximation error below 0.01?",
    "o": [
      "10 terms",
      "100 terms",
      "99 terms",
      "101 terms"
    ],
    "c": [
      1
    ],
    "e": "The alternating error bound after N terms is at most 1/(N+1). To make this strictly less than 0.01=1/100, choose N+1>100, so the smallest integer N is 100.",
    "variantGroupId": "apcalcbc-v-10.10"
  },
  {
    "id": "apcalcbc-u10-030",
    "unit": "U10",
    "topicCode": "10.10",
    "topic": "Alternating Series Error Bound",
    "skill": "3.B",
    "calculatorAllowed": true,
    "type": "s",
    "q": "For an alternating series meeting the usual hypotheses, what quantity bounds the magnitude of the remainder after N terms?",
    "o": [
      "The magnitude of the first included term.",
      "The sum of all omitted term magnitudes.",
      "The magnitude of the first omitted term.",
      "The square of the Nth term."
    ],
    "c": [
      2
    ],
    "e": "The alternating series remainder theorem states that the remainder magnitude after N terms is at most bₙ₊₁ when the positive magnitudes decrease to zero. Thus the first omitted term controls the guaranteed error bound.",
    "variantGroupId": "apcalcbc-v-10.10"
  },
  {
    "id": "apcalcbc-u10-031",
    "unit": "U10",
    "topicCode": "10.11",
    "topic": "Finding Taylor Polynomial Approximations of Functions",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "What is the third-degree Maclaurin polynomial for e^x?",
    "o": [
      "1+x+x²+x³",
      "x+x²/2+x³/3",
      "1+x²/2+x³/6",
      "1+x+x²/2+x³/6"
    ],
    "c": [
      3
    ],
    "e": "Every derivative of e^x at x=0 equals 1. The Maclaurin coefficients are f^(n)(0)/n!, giving 1+x+x²/2!+x³/3! through degree 3.",
    "variantGroupId": "apcalcbc-v-10.11"
  },
  {
    "id": "apcalcbc-u10-032",
    "unit": "U10",
    "topicCode": "10.11",
    "topic": "Finding Taylor Polynomial Approximations of Functions",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "What is the fifth-degree Maclaurin polynomial for sin(x)?",
    "o": [
      "x−x³/6+x⁵/120",
      "1−x²/2+x⁴/24",
      "x+x³/6+x⁵/120",
      "x−x²/2+x³/6"
    ],
    "c": [
      0
    ],
    "e": "The nonzero Maclaurin derivatives of sin x alternate in odd powers. Through degree 5 the polynomial is x−x³/3!+x⁵/5!=x−x³/6+x⁵/120.",
    "variantGroupId": "apcalcbc-v-10.11"
  },
  {
    "id": "apcalcbc-u10-033",
    "unit": "U10",
    "topicCode": "10.11",
    "topic": "Finding Taylor Polynomial Approximations of Functions",
    "skill": "2.D",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Which expression is the second-degree Taylor polynomial for f about x=a?",
    "o": [
      "f(x)+f′(x)(x−a)+f″(x)(x−a)²",
      "f(a)+f′(a)(x−a)+f″(a)(x−a)²/2",
      "f(a)+f′(a)x+f″(a)x²",
      "f(a)+f′(a)(x−a)+f″(a)(x−a)²"
    ],
    "c": [
      1
    ],
    "e": "A Taylor polynomial about a uses derivatives evaluated at a and powers of x−a with factorial denominators. Through degree 2 the coefficients are f(a), f′(a), and f″(a)/2!.",
    "variantGroupId": "apcalcbc-v-10.11"
  },
  {
    "id": "apcalcbc-u10-034",
    "unit": "U10",
    "topicCode": "10.12",
    "topic": "Lagrange Error Bound",
    "skill": "3.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Using the degree-2 Maclaurin polynomial for e^x to approximate e^0.1, which Lagrange error bound is valid if M=e^0.1 bounds the third derivative on [0,0.1]?",
    "o": [
      "e^0.1(0.1)²/2!",
      "e^0.1(0.1)³/2!",
      "e^0.1(0.1)³/3!",
      "(0.1)³/e^0.1"
    ],
    "c": [
      2
    ],
    "e": "For a degree-N Taylor polynomial, the Lagrange remainder is bounded by M|x−a|^(N+1)/(N+1)!. With N=2, a=0, and x=0.1, the bound is e^0.1(0.1)³/3!.",
    "variantGroupId": "apcalcbc-v-10.12"
  },
  {
    "id": "apcalcbc-u10-035",
    "unit": "U10",
    "topicCode": "10.12",
    "topic": "Lagrange Error Bound",
    "skill": "3.B",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Which information is needed to use the Lagrange error bound for a degree-N Taylor approximation on an interval?",
    "o": [
      "Only the value of f at the center.",
      "The exact infinite Taylor-series sum.",
      "A bound on |f′| regardless of N.",
      "A bound M on |f^(N+1)| over the relevant interval."
    ],
    "c": [
      3
    ],
    "e": "The Lagrange form of the remainder depends on the (N+1)st derivative. One needs a maximum or valid upper bound M for its absolute value on the interval between the center and approximation point.",
    "variantGroupId": "apcalcbc-v-10.12"
  },
  {
    "id": "apcalcbc-u10-036",
    "unit": "U10",
    "topicCode": "10.12",
    "topic": "Lagrange Error Bound",
    "skill": "1.D",
    "calculatorAllowed": true,
    "type": "s",
    "q": "If |f^(5)(x)|≤1 on the interval between 0 and 0.2, what bound applies to the error of the degree-4 Maclaurin approximation at x=0.2?",
    "o": [
      "0.2⁵/5!",
      "0.2⁴/4!",
      "0.2⁵/4!",
      "0.2/5!"
    ],
    "c": [
      0
    ],
    "e": "A fourth-degree Taylor approximation has remainder controlled by the fifth derivative. With M=1 and distance 0.2 from the center, the Lagrange bound is 1·0.2⁵/5!.",
    "variantGroupId": "apcalcbc-v-10.12"
  },
  {
    "id": "apcalcbc-u10-037",
    "unit": "U10",
    "topicCode": "10.13",
    "topic": "Radius and Interval of Convergence of Power Series",
    "skill": "3.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "What is the interval of convergence of Σ[(x−2)/3]^n from n=0 to ∞?",
    "o": [
      "[−1,5]",
      "(−1,5)",
      "(−3,3)",
      "[−3,3)"
    ],
    "c": [
      1
    ],
    "e": "This is geometric with ratio (x−2)/3, so convergence requires |x−2|<3, giving −1<x<5. At either endpoint the terms have magnitude 1 and fail to approach zero, so both endpoints are excluded.",
    "variantGroupId": "apcalcbc-v-10.13"
  },
  {
    "id": "apcalcbc-u10-038",
    "unit": "U10",
    "topicCode": "10.13",
    "topic": "Radius and Interval of Convergence of Power Series",
    "skill": "3.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "For Σ (x+1)^n/[n·2^n] from n=1 to ∞, what is the interval of convergence?",
    "o": [
      "(−3,1)",
      "[−3,1]",
      "[−3,1)",
      "(−1,2)"
    ],
    "c": [
      2
    ],
    "e": "The radius is 2 about x=−1. At x=1 the series becomes harmonic and diverges; at x=−3 it becomes the alternating harmonic series and converges. Thus the interval is [−3,1).",
    "variantGroupId": "apcalcbc-v-10.13"
  },
  {
    "id": "apcalcbc-u10-039",
    "unit": "U10",
    "topicCode": "10.13",
    "topic": "Radius and Interval of Convergence of Power Series",
    "skill": "1.E",
    "calculatorAllowed": true,
    "type": "s",
    "q": "What is the radius of convergence of Σ n! x^n?",
    "o": [
      "1",
      "∞",
      "1/e",
      "0"
    ],
    "c": [
      3
    ],
    "e": "The ratio of successive absolute terms is (n+1)|x|. For any fixed x≠0 this grows beyond 1, so the series diverges. It converges only at x=0, giving radius 0.",
    "variantGroupId": "apcalcbc-v-10.13"
  },
  {
    "id": "apcalcbc-u10-040",
    "unit": "U10",
    "topicCode": "10.14",
    "topic": "Finding Taylor or Maclaurin Series for a Function",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Which Maclaurin series represents e^x?",
    "o": [
      "Σ x^n/n! from n=0 to ∞",
      "Σ x^n from n=0 to ∞",
      "Σ (−1)^n x^(2n+1)/(2n+1)!",
      "Σ x^(2n)/(2n)!"
    ],
    "c": [
      0
    ],
    "e": "Every derivative of e^x at 0 equals 1, so its Maclaurin coefficients are 1/n!. Therefore e^x=Σx^n/n! for all real x.",
    "variantGroupId": "apcalcbc-v-10.14"
  },
  {
    "id": "apcalcbc-u10-041",
    "unit": "U10",
    "topicCode": "10.14",
    "topic": "Finding Taylor or Maclaurin Series for a Function",
    "skill": "2.C",
    "calculatorAllowed": false,
    "type": "s",
    "q": "Which Maclaurin series represents cos(x)?",
    "o": [
      "Σ (−1)^n x^(2n+1)/(2n+1)!",
      "Σ (−1)^n x^(2n)/(2n)!",
      "Σ x^n/n!",
      "Σ (−1)^n x^n"
    ],
    "c": [
      1
    ],
    "e": "Cosine has nonzero even derivatives at 0 that alternate 1,−1,1,…, while odd derivatives vanish. This produces Σ(−1)^n x^(2n)/(2n)!.",
    "variantGroupId": "apcalcbc-v-10.14"
  },
  {
    "id": "apcalcbc-u10-042",
    "unit": "U10",
    "topicCode": "10.14",
    "topic": "Finding Taylor or Maclaurin Series for a Function",
    "skill": "1.D",
    "calculatorAllowed": true,
    "type": "s",
    "q": "Which first four nonzero terms are in the Maclaurin series for sin(x)?",
    "o": [
      "1−x²/2!+x⁴/4!−x⁶/6!",
      "x+x³/3!+x⁵/5!+x⁷/7!",
      "x−x³/3!+x⁵/5!−x⁷/7!",
      "x−x²/2!+x³/3!−x⁴/4!"
    ],
    "c": [
      2
    ],
    "e": "The sine series uses odd powers with alternating signs because the derivatives at zero cycle through 0,1,0,−1. The resulting nonzero terms are x−x³/3!+x⁵/5!−x⁷/7!+⋯.",
    "variantGroupId": "apcalcbc-v-10.14"
  },
  {
    "id": "apcalcbc-u10-043",
    "unit": "U10",
    "topicCode": "10.15",
    "topic": "Representing Functions as Power Series",
    "skill": "2.D",
    "calculatorAllowed": false,
    "type": "s",
    "q": "For |x|<1, which power series represents 1/(1+x)?",
    "o": [
      "Σ x^n from n=0 to ∞",
      "Σ (−1)^n x^(n+1) from n=0 to ∞",
      "Σ x^(2n) from n=0 to ∞",
      "Σ (−1)^n x^n from n=0 to ∞"
    ],
    "c": [
      3
    ],
    "e": "Start from 1/(1−r)=Σr^n for |r|<1 and substitute r=−x. This gives 1/(1+x)=Σ(−x)^n=Σ(−1)^n x^n.",
    "variantGroupId": "apcalcbc-v-10.15"
  },
  {
    "id": "apcalcbc-u10-044",
    "unit": "U10",
    "topicCode": "10.15",
    "topic": "Representing Functions as Power Series",
    "skill": "1.E",
    "calculatorAllowed": false,
    "type": "s",
    "q": "For |x|<1, which series represents x/(1−x²)?",
    "o": [
      "Σ x^(2n+1) from n=0 to ∞",
      "Σ x^(n+1) from n=0 to ∞",
      "Σ x^(2n) from n=0 to ∞",
      "Σ (−1)^n x^(2n+1) from n=0 to ∞"
    ],
    "c": [
      0
    ],
    "e": "Start with the geometric expansion 1/(1−x²)=Σx^(2n) for |x|<1, then multiply every term by x. The resulting series is x+x³+x⁵+⋯=Σx^(2n+1), with the same radius condition.",
    "variantGroupId": "apcalcbc-v-10.15"
  },
  {
    "id": "apcalcbc-u10-045",
    "unit": "U10",
    "topicCode": "10.15",
    "topic": "Representing Functions as Power Series",
    "skill": "2.D",
    "calculatorAllowed": true,
    "type": "s",
    "q": "For −1<x≤1, which familiar power series results by integrating the geometric series for 1/(1+x) term by term from 0 to x?",
    "o": [
      "e^x=Σx^n/n!",
      "ln(1+x)=Σ (−1)^(n+1)x^n/n from n=1 to ∞",
      "1/(1−x)=Σx^n",
      "sin(x)=Σ(−1)^n x^(2n+1)/(2n+1)!"
    ],
    "c": [
      1
    ],
    "e": "Integrating Σ(−1)^n t^n from 0 to x gives Σ(−1)^n x^(n+1)/(n+1). Reindexing yields the alternating logarithm series for ln(1+x), with endpoint behavior handled separately.",
    "variantGroupId": "apcalcbc-v-10.15"
  }
];
