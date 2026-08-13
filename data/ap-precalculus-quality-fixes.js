// AP Precalculus clean-room quality repairs.
// Applied after data/ap-precalculus.js so the effective browser bank uses the
// independently reviewed fixes without duplicating the 125-item bank.
(() => {
  const bank = window.QUESTIONS_AP_PRECALCULUS;
  if (!Array.isArray(bank)) throw new Error("AP Precalculus bank must load before quality fixes");

  const rationaleFixes = {
    "apprecalc-u1-013": "The quadratic formula gives x = [6 ± √(36 − 52)]/2 = [6 ± 4i]/2 = 3 ± 2i. The negative discriminant produces the conjugate pair, so both solutions are required.",
    "apprecalc-u2-011": "Factoring two powers of 1.05 gives 100(1.05)^2(1.05)^(x−2)=110.25(1.05)^(x−2). This preserves the same exponential function while shifting the exponent reference point by 2 units.",
    "apprecalc-u2-020": "By definition, (f∘g)(x)=f(g(x)). Substituting g(x)=x+1 into f gives f(x+1)=(x+1)^2. The inner function is evaluated first, so the entire expression x+1 becomes the input to f.",
    "apprecalc-u2-023": "Solving y=2x+5 for x gives x=(y−5)/2, so g(x)=(x−5)/2 and g(f(x))=x. This confirms that g reverses both operations in the correct order and is therefore the inverse of f.",
    "apprecalc-u2-029": "Solving y=5^x for x gives x=log5(y), so the inverse is g(x)=log5(x), with domain x>0. The logarithm undoes exponentiation with base 5, which verifies the inverse relationship directly.",
    "apprecalc-u3-024": "On the principal arccosine interval [0,π], cosine equals 0 only at θ=π/2. Restricting the interval makes the inverse relation single-valued, so π/2 is the unique valid answer."
  };

  for (const [id, explanation] of Object.entries(rationaleFixes)) {
    const question = bank.find((item) => item.id === id);
    if (!question) throw new Error(`Missing Precalculus quality-fix target ${id}`);
    question.e = explanation;
  }

  function setOptions(id, correctText, distractors) {
    const question = bank.find((item) => item.id === id);
    if (!question) throw new Error(`Missing Precalculus quality-fix target ${id}`);
    const options = distractors.slice();
    options.splice(question.c[0], 0, correctText);
    question.o = options;
  }

  setOptions(
    "apprecalc-u2-031",
    "It is increasing for x > 0, crosses the x-axis at x = 1, and has vertical asymptote x = 0.",
    [
      "It decreases for x > 0 and crosses the x-axis at x = 1 while approaching a vertical asymptote at x = 0.",
      "Its domain includes negative x-values as well as positive values, and its graph approaches the horizontal asymptote y = 0 as x increases.",
      "It increases for x > 1 but decreases on 0 < x < 1 while remaining above the x-axis throughout its domain."
    ]
  );

  setOptions(
    "apprecalc-u2-007",
    "The initial value is 3, and each output is twice the preceding output.",
    [
      "The initial value is 2, and each output is found by adding 3 to the preceding output as x increases by 1.",
      "The initial value is 3, and each output is found by adding 2 to the preceding output as x increases by 1.",
      "The initial value is 6, and each output is three times the preceding output after each one-unit increase in x."
    ]
  );

  setOptions(
    "apprecalc-u3-035",
    "Because (r, θ + 2π) and (−r, θ + π) represent the same point as (r, θ).",
    [
      "Because changing the sign of r while keeping θ fixed is sufficient to preserve both the direction and the plotted location.",
      "Because a point can be assigned several different radial distances from the origin while its angle remains unchanged.",
      "Because the conversion formulas from polar to rectangular coordinates produce different locations for the same ordered pair."
    ]
  );

  setOptions(
    "apprecalc-u2-032",
    "f(x) decreases without bound toward −∞.",
    [
      "f(x) approaches 0 from below as the positive input gets closer and closer to the vertical axis.",
      "f(x) increases without bound toward +∞ because the logarithm grows as its input becomes smaller.",
      "f(x) approaches the finite value 1 while remaining defined for positive inputs arbitrarily close to 0."
    ]
  );
})();
