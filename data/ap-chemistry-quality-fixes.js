// AP Chemistry — post-release quality hardening from the 2026-08 independent audit.
// Loaded after ap-chemistry-corrections.js. These patches preserve CED topic/skill
// metadata while correcting malformed items and replacing weak giveaway choices
// with AP-level quantitative, model, and experimental reasoning.

(function () {
  "use strict";

  const byId = new Map(CHEM_QUESTIONS.map((item) => [item.id, item]));
  const patch = (id, attrs) => {
    const item = byId.get(id);
    if (!item) throw new Error(`${id}: Chemistry quality-fix target missing`);
    Object.assign(item, attrs);
  };

  patch("apchem-u1-016", {
    q: "Which particle-level model is most consistent with both the structure of solid NaCl and its failure to conduct electricity until melted?",
    o: [
      "A repeating three-dimensional lattice of alternating Na+ and Cl− ions whose positions are fixed in the solid",
      "Discrete neutral NaCl molecules packed closely enough that electrons can move freely between molecules",
      "Separate layers of Na+ ions and Cl− ions that can slide past one another while remaining electrically neutral",
      "A random mixture of neutral Na atoms and Cl atoms held together only by temporary intermolecular attractions"
    ],
    c: [0],
    e: "Solid NaCl is an extended ionic lattice. The ions are charged but fixed at lattice sites, so they cannot carry current through the solid; melting preserves the ions while allowing them to move and conduct."
  });

  patch("apchem-u3-020", {
    o: [
      "Add the same small dye mass to unequal solvent volumes and compare how quickly the visible color disappears",
      "Add equal excess dye to equal solvent volumes at one temperature, equilibrate, filter, and measure dissolved concentration",
      "Add equal dye masses to equal solvent volumes at different temperatures and compare the amount remaining after one minute",
      "Shake equal solvent volumes with dye for different times, then compare the intensity of the unfiltered mixtures"
    ],
    c: [1],
    e: "Solubility is an equilibrium property, so a defensible comparison uses the same temperature and solvent volume, provides excess solute, allows equilibration, removes undissolved material, and measures the dissolved concentration."
  });

  patch("apchem-u3-021", {
    q: "A second solute absorbs most strongly at 625 nm. Compared with a photon at 625 nm, a photon at the 500 nm absorption maximum shown for the first solute has approximately what energy ratio E500/E625?",
    o: ["0.80", "1.00", "1.25", "1.56"],
    c: [2],
    e: "Photon energy is E=hc/λ, so energy is inversely proportional to wavelength. Therefore E500/E625 = 625/500 = 1.25; the 500 nm photon has 25% more energy than the 625 nm photon."
  });

  patch("apchem-u4-014", {
    o: [
      "Compare the unknown gas density with air and identify CO2 whenever the gas is denser than air",
      "Pass the gas through a selective CO2 indicator while running a blank and a known-CO2 positive control",
      "Cool the gas until condensation occurs and identify CO2 whenever any liquid forms in the collection tube",
      "Measure the gas volume before and after mixing with oxygen and identify CO2 from any decrease in volume"
    ],
    c: [1],
    e: "A selective indicator or absorbent directly probes CO₂, while a blank checks background response and a known-CO₂ control verifies the test responds as expected. Density, condensation, or nonspecific volume changes cannot uniquely identify CO₂."
  });

  patch("apchem-u5-002", {
    q: "At one instant, a tangent drawn to a reactant concentration-versus-time curve has slope −1.5×10^−2 M s^−1. What is the reactant's instantaneous rate of disappearance at that instant?",
    o: ["−1.5×10^−2 M s^−1", "+1.5×10^−2 M s^−1", "+3.0×10^−2 M s^−1", "0 M s^−1"],
    c: [1],
    e: "The concentration derivative of a disappearing reactant is negative, here d[A]/dt = −1.5×10⁻² M s⁻¹. The rate of disappearance is defined as −d[A]/dt, so its positive magnitude is 1.5×10⁻² M s⁻¹."
  });

  patch("apchem-u6-002", {
    q: "Which observation from a controlled coffee-cup calorimetry trial directly supports classifying the salt dissolution as endothermic?",
    o: [
      "The solution temperature decreases after the salt dissolves even though the cup is thermally insulated",
      "The total mass of cup and contents is nearly unchanged before and after the salt is added",
      "The salt disappears from view as a homogeneous solution forms during stirring",
      "The final solution volume differs slightly from the sum of the initial water and solid volumes"
    ],
    c: [0],
    e: "In the insulated model, a temperature decrease of the surrounding solution means thermal energy flowed from the solution into the dissolving system. That energy uptake makes the dissolution endothermic; mass and volume observations do not establish the sign of ΔH."
  });

  patch("apchem-u6-003", {
    q: "An enthalpy diagram places reactants at 25 kJ/mol, the transition-state peak at 85 kJ/mol, and products at −15 kJ/mol. Which pair gives ΔH and the forward activation energy?",
    o: ["ΔH = −40 kJ/mol; Ea = 60 kJ/mol", "ΔH = +40 kJ/mol; Ea = 60 kJ/mol", "ΔH = −100 kJ/mol; Ea = 40 kJ/mol", "ΔH = +60 kJ/mol; Ea = 100 kJ/mol"],
    c: [0],
    e: "ΔH = Hproducts − Hreactants = −15 − 25 = −40 kJ/mol. The forward activation energy is Htransition state − Hreactants = 85 − 25 = 60 kJ/mol."
  });

  patch("apchem-u6-018", {
    o: [
      "Measure activation energies for several related reactions and add them after matching the stoichiometric coefficients",
      "Measure ΔH for auxiliary reactions that sum algebraically to the target, scaling equations and ΔH values together",
      "Measure heats for reactions using the same compounds, then average the ΔH values without balancing the equations",
      "Reverse any convenient auxiliary reaction while retaining its original ΔH sign, then add it to the target equation"
    ],
    c: [1],
    e: "Hess's law depends on enthalpy being a state function. Auxiliary reactions may be reversed or multiplied only if their ΔH values are reversed or multiplied with them; when the equations sum to the target, the adjusted enthalpies sum to ΔHtarget."
  });

  patch("apchem-u7-017", {
    q: "For N2(g)+3H2(g) ⇌ 2NH3(g), a system is initially at equilibrium. The volume is suddenly halved at constant temperature. Immediately after compression, before any reaction occurs, how do Qp and Kp compare and what net shift follows?",
    o: [
      "Qp = 4Kp, so the system shifts toward N2 and H2",
      "Qp = Kp, so no net reaction occurs after the compression",
      "Qp = Kp/4, so the system shifts toward NH3",
      "Kp doubles while Qp is unchanged, so the system shifts toward NH3"
    ],
    c: [2],
    e: "Halving volume doubles every partial pressure immediately. Qp has two powers of product pressure and four powers of reactant pressure, so Qp is multiplied by 2²/2⁴ = 1/4. Temperature is unchanged, so Kp is unchanged; Qp<Kp drives a net forward shift toward NH₃."
  });

  patch("apchem-u7-018", {
    o: [
      "Prepare matched equilibrium mixtures, add a known reactant amount to one, keep temperature and volume fixed, then compare re-equilibrated compositions",
      "Prepare matched mixtures, add reactant to one while warming it slightly, then compare the final product concentrations after equilibration",
      "Use equilibrium mixtures with different starting compositions, add the same reactant amount to each, then compare only their final colors",
      "Prepare one equilibrium mixture, add reactant, and compare its final composition with a control prepared at a different temperature"
    ],
    c: [0],
    e: "To isolate a concentration disturbance, the treatment and control should begin as matched equilibrium systems and differ only in the measured reactant addition. Holding temperature and volume fixed prevents changes in K or pressure from confounding the response."
  });

  patch("apchem-u9-005", {
    q: "At constant temperature and pressure a reaction has ΔG = −18 kJ/mol, but its activation energy is very large. Which conclusion is justified?",
    o: [
      "The forward reaction is thermodynamically favored, but it may still proceed very slowly",
      "The reaction must occur rapidly because a negative ΔG guarantees a low activation barrier",
      "The system is already at equilibrium because any nonzero activation energy makes ΔG effectively zero",
      "The reverse reaction is thermodynamically favored because a large activation energy overrides the sign of ΔG"
    ],
    c: [0],
    e: "A negative ΔG indicates thermodynamic favorability of the forward change under the stated conditions. Reaction speed depends on kinetics and activation energy, so a thermodynamically favorable process can nevertheless be extremely slow."
  });

  patch("apchem-u5-018", {
    q: "Which reasoning best explains why the pre-equilibrium approximation can eliminate an intermediate when deriving an experimentally testable rate law?",
    o: [
      "The slow step is treated as reversible, so its reverse-rate term can be omitted from the measured rate law",
      "The intermediate concentration is assumed to remain zero, so it contributes no factor to any elementary-step rate law",
      "The activation energies of the fast forward and reverse steps cancel, leaving only reactant concentrations in the rate law",
      "The fast equilibrium relates the intermediate concentration to reactant concentrations, so the intermediate can be replaced in the final rate law"
    ],
    c: [3],
    e: "A rapidly established equilibrium gives an equilibrium-constant relation between the intermediate and reactant concentrations. Substituting that relation removes the intermediate, which cannot remain in an experimentally testable overall rate law."
  });

  patch("apchem-u9-014", {
    q: "Which reasoning best justifies how coupling a thermodynamically unfavorable reaction to a favorable reaction can make the combined process thermodynamically favorable?",
    o: [
      "The positive ΔG of the unfavorable step is canceled whenever both reactions have similar activation energies",
      "The ΔG values add, so a sufficiently negative ΔG for the favorable reaction can make the summed ΔG negative",
      "A catalyst supplied by the favorable reaction changes the equilibrium constant until the unfavorable step becomes spontaneous",
      "The favorable reaction transfers entropy directly to the unfavorable reaction, making each individual ΔG value negative"
    ],
    c: [1],
    e: "Gibbs free-energy changes are additive for coupled reactions. If the favorable reaction has a negative ΔG whose magnitude exceeds the positive ΔG of the unfavorable reaction, the combined ΔG is negative and the coupled process is thermodynamically favorable."
  });

  patch("apchem-u9-018", {
    q: "For a galvanic-cell reaction transferring n = 2 mol e− per mole of reaction, E°cell = +1.10 V. Using F = 96485 C mol−1 e−, what is ΔG° to three significant figures?",
    o: ["−212 kJ/mol", "+212 kJ/mol", "−106 kJ/mol", "+106 kJ/mol"],
    c: [0],
    e: "ΔG° = −nFE° = −(2)(96485 C mol⁻¹)(1.10 J C⁻¹) = −2.12×10⁵ J/mol = −212 kJ/mol. The negative sign is consistent with a positive standard potential for a spontaneous galvanic reaction."
  });

  patch("apchem-u9-020", {
    q: "Why does the measured cell potential approach zero as the galvanic cell nears equilibrium?",
    o: [
      "The reaction quotient Q approaches K, so ΔG approaches zero and therefore E approaches zero through ΔG = −nFE",
      "The standard potential E° decreases as reactants are consumed, eventually making the tabulated half-cell potentials equal to zero",
      "Electron transfer stops because the salt bridge gradually removes all ions from both half-cells, forcing the external current to vanish",
      "The number of electrons n in the balanced redox equation decreases during discharge, so the factor nF in ΔG = −nFE becomes zero"
    ],
    c: [0],
    e: "As the cell reaction proceeds, Q changes toward the equilibrium constant K. At equilibrium ΔG = 0; because n and F remain nonzero constants for the balanced reaction, ΔG = −nFE requires E = 0. E° itself does not change with composition."
  });

  // Keep raw key positions balanced after the semantic patches. Runtime delivery
  // still independently shuffles options, so this removes a bank-level position cue.
  CHEM_QUESTIONS.forEach((item, index) => {
    const target = index % 4;
    const current = item.c[0];
    if (current === target) return;
    const correct = item.o[current];
    item.o.splice(current, 1);
    item.o.splice(target, 0, correct);
    item.c = [target];
  });
})();
