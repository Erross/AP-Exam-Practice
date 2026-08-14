(() => {
  "use strict";
  const add = window.__APCALCBC_ADD;
  if (!add) throw new Error("AP Calculus BC base bank must load before BC-only layers");
  const V = (topicCode, topic, variants) => variants.forEach((v) => add({
    unit:"U9", topicCode, topic,
    variantGroupId:`apcalcbc-v-${topicCode}`,
    ...v,
  }));

  V("9.1", "Defining and Differentiating Parametric Equations", [
    { skill:"1.E", calculatorAllowed:false, q:"A curve is given by x=t²+1 and y=t³. What is dy/dx at t=2?", correct:"3", distractors:["3/2","6","12"], explanation:"For a parametric curve, dy/dx=(dy/dt)/(dx/dt). Here dy/dt=3t² and dx/dt=2t, so dy/dx=3t/2; at t=2 the slope is 3." },
    { skill:"1.E", calculatorAllowed:false, q:"For x=cos(t) and y=sin(t), what is dy/dx at t=π/4?", correct:"−1", distractors:["1","0","√2"], explanation:"dy/dx=(cos t)/(−sin t)=−cot t. At t=π/4, sin t and cos t are equal, so the tangent slope is −1." },
    { skill:"2.D", calculatorAllowed:true, q:"If x=e^t and y=e^(−t), which expression equals dy/dx?", correct:"−e^(−2t)", distractors:["−1","e^(−2t)","−e^(2t)"], explanation:"Differentiate both coordinates with respect to t: dy/dt=−e^(−t) and dx/dt=e^t. Their quotient is −e^(−t)/e^t=−e^(−2t)." },
  ]);

  V("9.2", "Second Derivatives of Parametric Equations", [
    { skill:"1.E", calculatorAllowed:false, q:"For x=t² and y=t³ with t>0, what is d²y/dx² at t=1?", correct:"3/4", distractors:["3/2","3","6"], explanation:"First dy/dx=(3t²)/(2t)=3t/2. Then d²y/dx²=[d/dt(3t/2)]/(dx/dt)=(3/2)/(2t)=3/(4t), which equals 3/4 at t=1." },
    { skill:"1.E", calculatorAllowed:false, q:"For x=t and y=t³, which expression equals d²y/dx²?", correct:"6t", distractors:["3t²","6t²","6"], explanation:"Because dx/dt=1, dy/dx=3t². Differentiating that with respect to t and dividing again by dx/dt gives d²y/dx²=6t." },
    { skill:"1.D", calculatorAllowed:true, q:"For x=cos(t), y=sin(t), what is d²y/dx² at t=π/2?", correct:"−1", distractors:["0","1","The value is undefined"], explanation:"The first derivative is −cot t. Differentiate with respect to t to obtain csc²t, then divide by dx/dt=−sin t. At π/2 this gives 1/(−1)=−1." },
  ]);

  V("9.3", "Finding Arc Lengths of Curves Given by Parametric Equations", [
    { skill:"3.D", calculatorAllowed:false, q:"Which integral gives the arc length of x=t and y=t² for 0≤t≤1?", correct:"∫₀¹ √(1+4t²) dt", distractors:["∫₀¹ (1+2t) dt","∫₀¹ √(1+2t) dt","∫₀¹ (1+4t²) dt"], explanation:"Parametric arc length is ∫√[(dx/dt)²+(dy/dt)²]dt. Here the derivatives are 1 and 2t, so the integrand is √(1+4t²)." },
    { skill:"1.E", calculatorAllowed:false, q:"The curve x=3cos(t), y=3sin(t) is traced for 0≤t≤π/2. What is its arc length?", correct:"3π/2", distractors:["π/2","3π","9π/2"], explanation:"The speed along the parametrized curve is √[9sin²t+9cos²t]=3. Integrating 3 from 0 to π/2 gives an arc length of 3π/2." },
    { skill:"1.D", calculatorAllowed:true, q:"For x=2t and y=t² on 0≤t≤1, which integrand belongs in the parametric arc-length formula?", correct:"√(4+4t²)", distractors:["2+2t","√(2+2t)","4+4t²"], explanation:"dx/dt=2 and dy/dt=2t, so the arc-length integrand is √[(2)²+(2t)²]=√(4+4t²)." },
  ]);

  V("9.4", "Defining and Differentiating Vector-Valued Functions", [
    { skill:"1.E", calculatorAllowed:false, q:"If r(t)=⟨t²,sin(t)⟩, what is r′(t)?", correct:"⟨2t,cos(t)⟩", distractors:["⟨t,cos(t)⟩","⟨2t,−sin(t)⟩","⟨t²,cos(t)⟩"], explanation:"Differentiate a vector-valued function component by component. The derivative of t² is 2t and the derivative of sin(t) is cos(t), giving ⟨2t,cos(t)⟩." },
    { skill:"1.E", calculatorAllowed:false, q:"A particle has position r(t)=⟨e^t,t³⟩. Which vector is its velocity?", correct:"⟨e^t,3t²⟩", distractors:["⟨te^t,t²⟩","⟨e^t,3t⟩","⟨e^(−t),3t²⟩"], explanation:"Velocity is the derivative of position. Differentiating each coordinate gives d(e^t)/dt=e^t and d(t³)/dt=3t²." },
    { skill:"2.D", calculatorAllowed:true, q:"For r(t)=⟨cos(t),sin(t)⟩, which vector is the acceleration r″(t)?", correct:"⟨−cos(t),−sin(t)⟩", distractors:["⟨−sin(t),cos(t)⟩","⟨cos(t),sin(t)⟩","⟨sin(t),−cos(t)⟩"], explanation:"Differentiate twice componentwise. The velocity is ⟨−sin t,cos t⟩, and differentiating again gives acceleration ⟨−cos t,−sin t⟩." },
  ]);

  V("9.5", "Integrating Vector-Valued Functions", [
    { skill:"1.E", calculatorAllowed:false, q:"A particle has velocity v(t)=⟨2t,3t²⟩ and position r(0)=⟨1,−1⟩. Which position function is correct?", correct:"r(t)=⟨t²+1,t³−1⟩", distractors:["r(t)=⟨2t²+1,3t³−1⟩","r(t)=⟨t²−1,t³+1⟩","r(t)=⟨2t+1,3t²−1⟩"], explanation:"Integrating velocity gives ⟨t²+C₁,t³+C₂⟩. The initial position r(0)=⟨1,−1⟩ forces C₁=1 and C₂=−1." },
    { skill:"1.E", calculatorAllowed:false, q:"If a(t)=⟨2,6t⟩ and v(0)=⟨−1,4⟩, which velocity function satisfies the data?", correct:"v(t)=⟨2t−1,3t²+4⟩", distractors:["v(t)=⟨t²−1,6t²+4⟩","v(t)=⟨2t+1,3t²−4⟩","v(t)=⟨2,6t⟩"], explanation:"Integrating the acceleration componentwise gives v(t)=⟨2t+C₁,3t²+C₂⟩. Substituting t=0 and the initial velocity gives C₁=−1 and C₂=4." },
    { skill:"2.D", calculatorAllowed:true, q:"A particle has velocity v(t)=⟨t,2t⟩. What is its displacement vector from t=0 to t=2?", correct:"⟨2,4⟩", distractors:["⟨4,8⟩","⟨2,2⟩","⟨1,2⟩"], explanation:"Displacement is the definite integral of velocity. Integrating from 0 to 2 gives ⟨[t²/2]₀²,[t²]₀²⟩=⟨2,4⟩." },
  ]);

  V("9.6", "Solving Motion Problems Using Parametric and Vector-Valued Functions", [
    { skill:"1.E", calculatorAllowed:false, q:"A particle has velocity v(t)=⟨3,4t⟩. What is its speed at t=1?", correct:"5", distractors:["4","7","25"], explanation:"Speed is the magnitude of velocity. At t=1 the velocity vector is ⟨3,4⟩, whose magnitude is √(3²+4²)=5." },
    { skill:"2.D", calculatorAllowed:false, q:"A particle starts at r(0)=⟨2,−1⟩ and has velocity v(t)=⟨1,t⟩. What is r(2)?", correct:"⟨4,1⟩", distractors:["⟨3,1⟩","⟨4,3⟩","⟨2,2⟩"], explanation:"The displacement from 0 to 2 is ∫₀²⟨1,t⟩dt=⟨2,2⟩. Adding the initial position ⟨2,−1⟩ gives r(2)=⟨4,1⟩." },
    { skill:"1.E", calculatorAllowed:true, q:"For x(t)=t²−1 and y(t)=2t, at what rate is the particle’s distance from the origin changing at t=1?", correct:"2", distractors:["4/5","√5","2√5/5"], explanation:"Let R=√(x²+y²). Then dR/dt=(x x′+y y′)/R. At t=1, x=0, y=2, x′=2, y′=2, so dR/dt=(0+4)/2=2. However the requested rate of distance from the origin is therefore 2, not 2√5/5." },
  ]);

  V("9.7", "Defining Polar Coordinates and Differentiating in Polar Form", [
    { skill:"1.E", calculatorAllowed:false, q:"For the polar curve r=2cos(θ), what is dy/dx at θ=π/4?", correct:"0", distractors:["−1","1","The slope is undefined"], explanation:"Using x=r cosθ and y=r sinθ, dy/dx=(r′sinθ+r cosθ)/(r′cosθ−r sinθ). At θ=π/4, r=√2 and r′=−√2, so the numerator is 0 and the denominator is −2." },
    { skill:"2.C", calculatorAllowed:false, q:"Which Cartesian point corresponds to the polar coordinates (r,θ)=(−2,0)?", correct:"(−2,0)", distractors:["(2,0)","(0,−2)","(0,2)"], explanation:"Polar coordinates convert by x=r cosθ and y=r sinθ. With r=−2 and θ=0, x=−2 and y=0. A negative radius reverses direction along the ray." },
    { skill:"1.D", calculatorAllowed:true, q:"Which formula gives dy/dx for a polar curve r=f(θ)?", correct:"(r′sinθ+r cosθ)/(r′cosθ−r sinθ)", distractors:["(r′cosθ−r sinθ)/(r′sinθ+r cosθ)","r′/r","(r cosθ)/(r sinθ)"], explanation:"Differentiate x=r cosθ and y=r sinθ with respect to θ, then divide dy/dθ by dx/dθ. This yields the stated quotient." },
  ]);

  V("9.8", "Finding the Area of a Polar Region or the Area Bounded by a Single Polar Curve", [
    { skill:"3.D", calculatorAllowed:false, q:"What is the area enclosed by r=2cos(θ) for −π/2≤θ≤π/2?", correct:"π", distractors:["π/2","2π","4π"], explanation:"Polar area is (1/2)∫r²dθ. Thus the area is (1/2)∫ from −π/2 to π/2 of 4cos²θ dθ=2·(π/2)=π." },
    { skill:"1.E", calculatorAllowed:false, q:"For r=3 and 0≤θ≤π/2, what area is swept out?", correct:"9π/4", distractors:["3π/2","9π/2","9π"], explanation:"The polar area formula gives (1/2)∫₀^(π/2)9 dθ=(9/2)(π/2)=9π/4, which is also the area of a quarter-circle of radius 3." },
    { skill:"2.D", calculatorAllowed:true, q:"Which integral gives the entire area enclosed by the cardioid r=1+cos(θ)?", correct:"(1/2)∫₀^(2π) (1+cosθ)² dθ", distractors:["∫₀^(2π) (1+cosθ) dθ","(1/2)∫₀^π (1+cosθ) dθ","∫₀^π (1+cosθ)² dθ"], explanation:"A full tracing of the cardioid occurs over 0≤θ≤2π, and polar area is one-half the integral of r². Substituting r=1+cosθ gives the stated setup." },
  ]);

  V("9.9", "Finding the Area of the Region Bounded by Two Polar Curves", [
    { skill:"3.D", calculatorAllowed:false, q:"What is the area between the circles r=2 and r=1 over 0≤θ≤2π?", correct:"3π", distractors:["π","2π","4π"], explanation:"For area between polar curves, integrate one-half of outer radius squared minus inner radius squared: (1/2)∫₀^(2π)(4−1)dθ=3π." },
    { skill:"1.E", calculatorAllowed:false, q:"On 0≤θ≤π/2, what is the area inside r=2 but outside r=2cos(θ)?", correct:"π/2", distractors:["π/4","π","2π"], explanation:"Use (1/2)∫₀^(π/2)[4−4cos²θ]dθ=2∫₀^(π/2)sin²θ dθ. Since that sine-squared integral is π/4, the area is π/2." },
    { skill:"2.D", calculatorAllowed:true, q:"If r=f(θ) lies outside r=g(θ) on a≤θ≤b, which expression gives the area between the curves?", correct:"(1/2)∫ₐᵇ [f(θ)²−g(θ)²] dθ", distractors:["∫ₐᵇ [f(θ)−g(θ)] dθ","(1/2)∫ₐᵇ [f(θ)−g(θ)]² dθ","∫ₐᵇ [f(θ)²+g(θ)²] dθ"], explanation:"Polar area is accumulated as one-half radius squared. Subtracting the inner area element from the outer area element gives one-half of f²−g² over the common angular interval." },
  ]);
})();
