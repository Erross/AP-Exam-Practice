(() => {
  "use strict";
  const add = window.__APCALCBC_ADD;
  if (!add) throw new Error("AP Calculus BC base bank must load before BC-only layers");

  const V = (unit, topicCode, topic, variants) => variants.forEach((v) => add({
    unit, topicCode, topic,
    variantGroupId: `apcalcbc-v-${topicCode}`,
    ...v,
  }));

  V("U6", "6.11", "Integrating Using Integration by Parts", [
    { skill:"1.E", calculatorAllowed:false, q:"Which antiderivative is equal to ∫ x e^x dx?", correct:"e^x(x − 1) + C", distractors:["e^x(x + 1) + C","x e^x + C","(x²/2)e^x + C"], explanation:"Using integration by parts with u=x and dv=e^x dx gives du=dx and v=e^x. Therefore ∫x e^x dx=x e^x−∫e^x dx=e^x(x−1)+C." },
    { skill:"1.E", calculatorAllowed:false, q:"Evaluate the indefinite integral ∫ x cos(x) dx.", correct:"x sin(x) + cos(x) + C", distractors:["x sin(x) − cos(x) + C","x cos(x) + sin(x) + C","(x²/2) sin(x) + C"], explanation:"Take u=x and dv=cos(x)dx, so du=dx and v=sin(x). Integration by parts gives x sin(x)−∫sin(x)dx=x sin(x)+cos(x)+C." },
    { skill:"1.D", calculatorAllowed:true, q:"Which expression is an antiderivative of ln(x) for x>0?", correct:"x ln(x) − x + C", distractors:["ln(x)²/2 + C","x ln(x) + x + C","1/x + C"], explanation:"Write the integrand as 1·ln(x) and use integration by parts with u=ln(x), dv=dx. Then du=dx/x and v=x, giving x ln(x)−∫1 dx=x ln(x)−x+C." },
  ]);

  V("U6", "6.12", "Integrating Using Linear Partial Fractions", [
    { skill:"1.E", calculatorAllowed:false, q:"For x≠−1,−2, which antiderivative equals ∫ 1/[(x+1)(x+2)] dx?", correct:"ln|x+1| − ln|x+2| + C", distractors:["ln|x+1| + ln|x+2| + C","(1/2)ln|x+1| − ln|x+2| + C","1/[(x+1)(x+2)] + C"], explanation:"The decomposition is 1/[(x+1)(x+2)]=1/(x+1)−1/(x+2). Integrating term by term gives ln|x+1|−ln|x+2|+C." },
    { skill:"2.D", calculatorAllowed:false, q:"Which partial-fraction decomposition is equivalent to (3x+5)/[(x+1)(x+2)]?", correct:"2/(x+1) + 1/(x+2)", distractors:["1/(x+1) + 2/(x+2)","3/(x+1) + 5/(x+2)","2/(x+1) − 1/(x+2)"], explanation:"If (3x+5)/[(x+1)(x+2)]=A/(x+1)+B/(x+2), then 3x+5=A(x+2)+B(x+1). Matching coefficients gives A+B=3 and 2A+B=5, so A=2 and B=1." },
    { skill:"1.E", calculatorAllowed:true, q:"Which antiderivative is equal to ∫ 1/(x²−1) dx on an interval avoiding x=±1?", correct:"(1/2)ln|x−1| − (1/2)ln|x+1| + C", distractors:["(1/2)ln|x−1| + (1/2)ln|x+1| + C","ln|x²−1| + C","1/(2x) ln|x²−1| + C"], explanation:"Because 1/(x²−1)=1/[(x−1)(x+1)]=(1/2)/(x−1)−(1/2)/(x+1), integration gives the stated difference of logarithms." },
  ]);

  V("U6", "6.13", "Evaluating Improper Integrals", [
    { skill:"3.D", calculatorAllowed:false, q:"What is the value of the improper integral ∫ from 1 to ∞ of 1/x² dx?", correct:"1", distractors:["0","2","The integral diverges"], explanation:"Rewrite the improper integral as lim b→∞ ∫₁ᵇ x⁻² dx. The antiderivative is −1/x, so the value is lim b→∞(−1/b+1)=1; the finite limit means the integral converges." },
    { skill:"3.B", calculatorAllowed:false, q:"Which conclusion about ∫ from 1 to ∞ of 1/x dx is correct?", correct:"It diverges because ln(b) grows without bound as b→∞.", distractors:["It converges to 1 because 1/x approaches 0.","It converges to 0 because the integrand approaches 0.","It converges to ln(1) because the lower endpoint determines the value."], explanation:"The improper integral is lim b→∞[ln x]₁ᵇ=lim b→∞ln(b), which is unbounded. A function tending to zero is necessary for some series tests but does not by itself make this improper integral converge." },
    { skill:"1.E", calculatorAllowed:true, q:"Evaluate the improper integral ∫ from 0 to 1 of x^(−1/2) dx.", correct:"2", distractors:["1","1/2","The integral diverges"], explanation:"Use a limit at the infinite discontinuity: lim a→0⁺ ∫ₐ¹ x⁻¹ᐟ² dx=lim a→0⁺[2√x]ₐ¹=2. The finite one-sided limit establishes convergence." },
  ]);

  V("U7", "7.5", "Approximating Solutions Using Euler’s Method", [
    { skill:"1.E", calculatorAllowed:false, q:"For dy/dx=x+y with y(0)=1, Euler’s method with step size 0.5 is used twice to approximate y(1). What is the approximation?", correct:"2.5", distractors:["2.0","2.25","3.0"], explanation:"Starting at (0,1), the first slope is 1, so y(0.5)≈1+0.5(1)=1.5. The next slope is 0.5+1.5=2, so y(1)≈1.5+0.5(2)=2.5." },
    { skill:"1.E", calculatorAllowed:false, q:"For dy/dx=2x−y with y(0)=1, Euler’s method with step size 1 is used to estimate y(2). What value results?", correct:"2", distractors:["0","1","3"], explanation:"At x=0 the slope is −1, so the first Euler step gives y(1)≈0. At x=1 the slope is 2(1)−0=2, so the second step gives y(2)≈0+1·2=2." },
    { skill:"2.D", calculatorAllowed:true, q:"A solution satisfies dy/dx=y/x and y(1)=2. Using Euler’s method with step size 0.5, what is the estimate of y(2)?", correct:"4", distractors:["3","3.5","4.5"], explanation:"From (1,2), slope=2, so y(1.5)≈3. Then slope at (1.5,3) is 2, so y(2)≈3+0.5(2)=4. The method updates both x and the estimated y after each step." },
  ]);

  V("U7", "7.9", "Logistic Models with Differential Equations", [
    { skill:"2.D", calculatorAllowed:false, q:"A population obeys dP/dt=0.2P(1−P/500). At what population size is the growth rate greatest?", correct:"250", distractors:["100","400","500"], explanation:"For a logistic differential equation kP(1−P/K), growth is maximal at half the carrying capacity K. Here K=500, so the maximum growth rate occurs at P=250." },
    { skill:"1.D", calculatorAllowed:false, q:"In the logistic model dP/dt=0.06P(1−P/800), what is the carrying capacity?", correct:"800", distractors:["0.06","48","13,333"], explanation:"The logistic form is kP(1−P/K), where K is the carrying capacity. Comparing 1−P/800 with 1−P/K shows directly that K=800." },
    { skill:"1.E", calculatorAllowed:true, q:"For dP/dt=0.1P(1−P/1000), what is dP/dt when P=200?", correct:"16", distractors:["8","20","80"], explanation:"Substitute P=200: dP/dt=0.1(200)(1−200/1000)=20(0.8)=16. The logistic factor reduces the unrestricted exponential growth rate as the population approaches carrying capacity." },
  ]);

  V("U8", "8.13", "The Arc Length of a Smooth, Planar Curve and Distance Traveled", [
    { skill:"3.D", calculatorAllowed:false, q:"For the parametric curve x=t and y=t² on 0≤t≤1, which integral gives the arc length?", correct:"∫₀¹ √(1+4t²) dt", distractors:["∫₀¹ (1+2t) dt","∫₀¹ √(1+2t) dt","∫₀¹ (1+4t²) dt"], explanation:"For a parametric curve, arc length is ∫√[(dx/dt)²+(dy/dt)²]dt. Here dx/dt=1 and dy/dt=2t, producing ∫₀¹√(1+4t²)dt." },
    { skill:"1.D", calculatorAllowed:false, q:"Which integral gives the arc length of y=x^(3/2) from x=0 to x=4?", correct:"∫₀⁴ √(1+9x/4) dx", distractors:["∫₀⁴ √(1+3√x/2) dx","∫₀⁴ (1+9x/4) dx","∫₀⁴ √(1+3x²/2) dx"], explanation:"For y=f(x), arc length is ∫√[1+(f′(x))²]dx. Since f′(x)=(3/2)√x, its square is 9x/4, giving the stated integral." },
    { skill:"1.E", calculatorAllowed:true, q:"A particle has position x=t² and y=t³. What is its speed at t=1?", correct:"√13", distractors:["5","13","√5"], explanation:"Speed is the magnitude of the velocity vector. Since dx/dt=2t and dy/dt=3t², at t=1 the velocity is ⟨2,3⟩ and the speed is √(2²+3²)=√13." },
  ]);
})();
