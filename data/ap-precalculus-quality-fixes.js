// AP Precalculus clean-room quality repairs.
// Applied after data/ap-precalculus.js so the effective browser bank uses the
// independently reviewed rationales without duplicating the 125-item bank.
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
})();
