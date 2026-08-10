// AP Chemistry — post-authoring curation and original stimulus sets
// Loaded after data/ap-chemistry.js; mutates the shared CHEM_QUESTIONS array.
// This file is kept separate during subject-bank development so content-audit
// refinements remain reviewable as a focused diff.

const CHEM_BY_ID = new Map(CHEM_QUESTIONS.map((item) => [item.id, item]));
function chemPatch(id, attrs) { Object.assign(CHEM_BY_ID.get(id), attrs); }

// The Fall 2024 CED's Section I science-practice weights require authentic
// coverage in practice families 1, 2, 4, 5, and 6. Practice 3 is FRQ-only.
const CHEM_SKILL_OVERRIDES = {
  "apchem-u1-012":"5.B", "apchem-u5-004":"5.C", "apchem-u5-016":"5.E",
  "apchem-u6-006":"5.B", "apchem-u6-012":"5.A", "apchem-u7-006":"5.E",
  "apchem-u7-020":"5.E", "apchem-u8-006":"5.C", "apchem-u8-014":"5.C",
  "apchem-u8-020":"5.E", "apchem-u9-010":"5.C", "apchem-u9-012":"5.E",
  "apchem-u9-018":"5.C", "apchem-u9-020":"5.E",
  "apchem-u3-022":"1.B", "apchem-u5-010":"1.B", "apchem-u6-010":"1.B",
  "apchem-u7-002":"1.B", "apchem-u9-002":"1.B",
  "apchem-u3-020":"2.C", "apchem-u4-002":"2.D", "apchem-u4-014":"2.C",
  "apchem-u5-014":"2.E", "apchem-u5-022":"2.D", "apchem-u6-002":"2.C",
  "apchem-u6-018":"2.E", "apchem-u7-004":"2.D", "apchem-u7-018":"2.C",
  "apchem-u8-002":"2.C", "apchem-u8-016":"2.D", "apchem-u8-022":"2.E",
};
Object.entries(CHEM_SKILL_OVERRIDES).forEach(([id, skill]) => chemPatch(id, { skill }));

// Practice 1: model/representation items.
chemPatch("apchem-u3-022", {
  q: "A model shows two molecular energy levels separated by an energy gap ΔE. Which added arrow best represents absorption of a photon whose energy equals ΔE?",
  o: ["An upward arrow connecting the lower level to the upper level", "A downward arrow connecting the upper level to the lower level", "A horizontal arrow drawn along the lower energy level", "An arrow ending halfway between the two allowed energy levels"], c:[1],
  e: "Absorption raises a particle from a lower allowed energy state to a higher one when photon energy matches the gap. An upward arrow spanning exactly ΔE is therefore the appropriate representation."
});
chemPatch("apchem-u5-010", {
  q: "A collision model shows four A–B encounters: one is too low in energy, one has sufficient energy but poor orientation, and two have sufficient energy and effective orientation. Which representation of successful collisions is correct?",
  o: ["Only the two encounters with both sufficient energy and effective orientation", "All four encounters because every collision changes chemical bonds", "Only the low-energy encounter because slow particles remain together longer", "Only the poorly oriented high-energy encounter because orientation is irrelevant"], c:[0],
  e: "Collision theory requires both sufficient collision energy and a productive orientation. The model therefore identifies only the two encounters satisfying both requirements as successful reactive collisions."
});
chemPatch("apchem-u6-010", {
  q: "A heating-curve model has a horizontal segment at the normal boiling point. Which particle diagram best represents what changes across that segment?",
  o: ["Particles become farther apart while individual molecules remain intact", "Every molecule breaks into its constituent atoms", "Particles become more tightly packed in a rigid lattice", "The average molecular speed increases continuously while spacing is unchanged"], c:[2],
  e: "During boiling, added energy increases intermolecular potential energy and separates intact molecules. Temperature and average kinetic energy remain nearly constant across the horizontal phase-change segment."
});
chemPatch("apchem-u7-002", {
  q: "A graph of a reversible reaction shows reactant concentration falling and product concentration rising until both curves become horizontal. Which added rate graph is consistent with dynamic equilibrium?",
  o: ["Forward rate falls and reverse rate rises until the two become equal and nonzero", "Forward rate rises without limit while reverse rate remains zero", "Both rates abruptly become zero when concentrations level off", "Reverse rate remains larger than forward rate after the concentration curves flatten"], c:[1],
  e: "As products accumulate, the reverse rate grows while reactant depletion lowers the forward rate. At dynamic equilibrium the rates become equal and remain nonzero, producing constant concentrations."
});
chemPatch("apchem-u9-002", {
  q: "Two particle diagrams show the same ideal gas: diagram X confines the particles to half a box, while diagram Y distributes them through the full box at the same temperature. Which model has greater entropy?",
  o: ["Y, because the particles have more accessible spatial arrangements", "X, because confinement creates more spatial microstates", "They are equal because entropy depends only on particle number", "X, because smaller volume guarantees more molecular energy states"], c:[0],
  e: "The full-volume model permits many more positional microstates for the same particles at the same temperature. Greater accessible spatial multiplicity makes diagram Y the higher-entropy state."
});

// Practice 2: experimental design, measurement, controls, and procedure.
chemPatch("apchem-u3-020", {
  q: "A student wants to compare the solubility of a nonpolar dye in water and hexane. Which procedure gives the most defensible comparison?",
  o: ["Add equal excess dye to equal solvent volumes at the same temperature, equilibrate, then measure dissolved concentration in each filtered liquid", "Use different dye masses and different temperatures so both solvents reach saturation quickly", "Compare only how fast the dye initially disperses without measuring equilibrium concentration", "Evaporate both solvents before adding the dye and compare the empty containers"], c:[1],
  e: "A fair solubility comparison holds relevant conditions constant, allows each system to reach equilibrium with excess solute, and measures dissolved concentration after undissolved material is removed."
});
chemPatch("apchem-u4-002", {
  q: "Students test conservation of mass for a reaction that produces CO2 gas. Which setup best tests the claim without losing reaction products?",
  o: ["Run the reaction in a sealed flexible container and measure the total mass before and after", "Run the reaction in an open beaker and weigh only the remaining liquid", "Heat the reactants separately and compare only their temperatures", "Measure the gas volume but never measure system mass"], c:[1],
  e: "A sealed system retains the gaseous product, so comparing total mass before and after directly tests conservation of matter. An open vessel can appear to lose mass because CO₂ escapes."
});
chemPatch("apchem-u4-014", {
  q: "A student wants to determine whether an unknown gaseous product from hydrocarbon combustion contains CO2. Which test is most appropriate?",
  o: ["Pass the gas through a validated CO2 indicator or absorbent and compare with a blank control", "Measure the gas color only and assume every colorless gas is CO2", "Add more hydrocarbon until the gas stops forming", "Cool the burner without collecting any product sample"], c:[1],
  e: "A selective CO₂ test paired with a blank control directly probes the proposed product while checking background response. Color alone is not specific enough to identify a combustion gas."
});
chemPatch("apchem-u5-014", {
  q: "Two mechanisms both sum to the same overall reaction. Which experiment is most useful for distinguishing between them?",
  o: ["Measure initial rates while independently varying reactant concentrations and compare the observed rate law with each mechanism's prediction", "Measure only the final mass after both reactions have reached completion", "Use the balanced overall equation to assign a rate law without collecting kinetic data", "Repeat one trial at the same concentrations until the same rate is obtained"], c:[1],
  e: "Competing mechanisms can predict different concentration dependences even when they give the same net equation. Initial-rate experiments therefore provide kinetic evidence that can discriminate between them."
});
chemPatch("apchem-u5-022", {
  q: "Which experiment best determines whether a substance acts as a catalyst without changing equilibrium composition?",
  o: ["Compare time courses with and without the substance from identical starting mixtures, then verify both approach the same equilibrium composition", "Compare only the final color of two mixtures prepared with different reactant concentrations", "Add the substance after equilibrium and record only the container mass", "Measure one initial rate and assume any fast reaction has been catalyzed"], c:[1],
  e: "A catalyst should change the rate of approach to equilibrium but not the equilibrium composition. Matched time-course experiments test both predictions while controlling the starting state."
});
chemPatch("apchem-u6-002", {
  q: "To determine whether dissolving a salt is endothermic, which measurement plan is best?",
  o: ["Measure solution temperature before and after dissolving a known amount in an insulated cup while minimizing heat exchange with the surroundings", "Record only the salt mass after it has dissolved", "Heat the empty cup first and infer the sign of ΔH from cup color", "Use different water volumes in every trial and compare final temperatures only"], c:[1],
  e: "An endothermic dissolution draws thermal energy from the solution and produces a temperature decrease. An insulated, controlled measurement makes that energy-flow inference much more defensible."
});
chemPatch("apchem-u6-018", {
  q: "A student wants an experimental value for the enthalpy of a reaction that is difficult to measure directly. Which strategy applies Hess's law most appropriately?",
  o: ["Measure calorimetric enthalpies for accessible reactions that algebraically sum to the target reaction, then add the corresponding ΔH values", "Measure activation energies for unrelated reactions and average them", "Measure only the target reactant masses and assume ΔH is proportional to mass", "Reverse one auxiliary equation without changing the sign of its measured ΔH"], c:[1],
  e: "Hess's law uses path independence of enthalpy. If measured auxiliary reactions sum to the target equation, their enthalpy changes can be reversed or scaled consistently and then summed."
});
chemPatch("apchem-u7-004", {
  q: "Which measurement would best demonstrate that a reversible system has reached dynamic equilibrium?",
  o: ["Determine forward and reverse rates over time and show they become equal while both remain nonzero", "Show that product concentration is larger than reactant concentration at one instant", "Wait until all molecular motion is assumed to stop", "Measure only the initial reactant concentration before any product forms"], c:[1],
  e: "Dynamic equilibrium is defined by equal opposing rates, not equal concentrations or cessation of molecular events. Direct rate evidence therefore tests the defining condition most clearly."
});
chemPatch("apchem-u7-018", {
  q: "A class tests how adding reactant affects an equilibrium mixture. Which procedure best isolates the concentration disturbance?",
  o: ["Prepare identical equilibrium mixtures at one temperature, add a measured reactant amount to the treatment only, and compare compositions after re-equilibration", "Change temperature and volume at the same time that reactant is added", "Use different initial equilibrium mixtures for the control and treatment", "Measure only the reactant bottle before any equilibrium mixture is prepared"], c:[1],
  e: "A controlled Le Châtelier experiment changes one factor while holding other equilibrium variables fixed. Matched mixtures and a single measured concentration perturbation isolate the effect of added reactant."
});
chemPatch("apchem-u8-002", {
  q: "Which observation most directly tests whether an aqueous species behaves as a Brønsted-Lowry base?",
  o: ["Show that it accepts H+ from a suitable proton donor and forms its conjugate acid", "Show only that the solution contains oxygen atoms", "Measure the sample mass before dissolving it", "Confirm that the species has a negative charge, which by itself proves proton acceptance"], c:[1],
  e: "Brønsted-Lowry basicity is defined by proton acceptance. Demonstrating proton transfer to form the conjugate acid directly tests that behavior; charge or elemental composition alone does not."
});
chemPatch("apchem-u8-016", {
  q: "Which experiment best compares the buffering ability of two solutions near the same initial pH?",
  o: ["Add equal small amounts of strong acid to equal volumes and compare the resulting pH changes", "Compare their colors without adding acid or base", "Dilute one solution tenfold before testing but leave the other unchanged", "Measure only the initial pH and assume equal pH means equal buffer capacity"], c:[1],
  e: "Buffering ability is revealed by resistance to a controlled acid or base challenge. Equal additions to equal volumes allow the observed pH changes to be compared directly."
});
chemPatch("apchem-u8-022", {
  q: "A student tests whether lowering pH changes the solubility of a salt whose anion is the conjugate base of a strong acid. Which design is best?",
  o: ["Equilibrate excess solid with solutions spanning controlled pH values at one temperature and measure dissolved-ion concentration", "Use different salts at every pH and compare whether any solid is visible", "Change pH and temperature together in every trial", "Measure pH only, without measuring any quantity related to dissolved salt"], c:[1],
  e: "Solubility must be measured after equilibration while temperature and salt identity are controlled. A pH series with quantitative dissolved-ion measurements directly tests whether acidity changes solubility."
});

// Concise correct choices keep answer length from becoming an unintended cue.
function chemCorrect(id, text) { const item = CHEM_BY_ID.get(id); item.o[item.c[0]] = text; }
const CHEM_CONCISE_CORRECT = {
  "apchem-u1-012":"About twice the subshell occupancy of Y",
  "apchem-u1-013":"Na's 3s electron is less strongly attracted",
  "apchem-u1-014":"F−, because its nuclear charge is slightly greater",
  "apchem-u1-016":"An alternating three-dimensional Na+/Cl− lattice",
  "apchem-u2-001":"Cl attracts the shared electrons more strongly",
  "apchem-u2-002":"Nonconducting when solid; conducting when molten",
  "apchem-u2-004":"A deeper well and a larger bond energy",
  "apchem-u2-005":"Like-charged layers align and repel after shifting",
  "apchem-u2-006":"Larger ionic charges at similar ion sizes",
  "apchem-u2-007":"Mobile, delocalized valence electrons",
  "apchem-u2-008":"Different-sized atoms hinder layer or dislocation motion",
  "apchem-u2-014":"Three approximately trigonal-planar sigma domains",
  "apchem-u3-002":"Greater polarizability and correspondingly stronger dispersion forces",
  "apchem-u3-005":"Close particles that can move past one another",
  "apchem-u3-006":"Partly overcome intermolecular attractions",
  "apchem-u3-009":"Average translational kinetic energy",
  "apchem-u3-012":"Attractions reduce momentum transfer to the walls",
  "apchem-u3-014":"Separated, hydrated K+ and Br− ions",
  "apchem-u3-016":"B has about twice A's NaCl concentration",
  "apchem-u3-018":"Greater relative affinity for the mobile phase",
  "apchem-u3-019":"Favorable hydrogen-bonding and polar interactions with water",
  "apchem-u4-001":"Atoms rearrange while each element's atom count is conserved",
  "apchem-u4-005":"A 2:1 H2:O2 molecular ratio",
  "apchem-u4-006":"B was the limiting reactant",
  "apchem-u4-007":"Formation of a new solid with new composition",
  "apchem-u4-011":"It has an accurately known concentration",
  "apchem-u5-002":"The magnitude of the tangent slope",
  "apchem-u5-009":"More collisions exceed the activation energy",
  "apchem-u5-010":"The two energetic, correctly oriented encounters",
  "apchem-u5-011":"Reactants to the transition-state peak",
  "apchem-u5-012":"Exothermic, with negative ΔH",
  "apchem-u5-016":"Overall stoichiometry alone does not determine the rate law",
  "apchem-u5-018":"Replace the intermediate using the fast-equilibrium relation",
  "apchem-u5-021":"A lower-activation-energy alternative mechanism",
  "apchem-u6-005":"From the hotter object to the colder one",
  "apchem-u6-012":"Same magnitude with the opposite sign",
  "apchem-u6-013":"Bond energies broken minus bond energies formed",
  "apchem-u6-014":"Exothermic overall",
  "apchem-u7-001":"Equal, nonzero forward and reverse rates",
  "apchem-u7-003":"Toward B initially",
  "apchem-u7-006":"Forward, until Q increases to K",
  "apchem-u7-015":"Near-constant average A:B proportions with microscopic fluctuations",
  "apchem-u7-016":"[A] falls and [B] rises to plateaus",
  "apchem-u7-020":"Net reverse reaction lowers Q toward K",
  "apchem-u7-023":"Added Cl− shifts dissolution toward solid AgCl",
  "apchem-u8-010":"Its conjugate base generates OH− by hydrolysis",
  "apchem-u8-011":"Greater conjugate-base stabilization by added oxygens",
  "apchem-u8-012":"The unusually strong H—F bond",
  "apchem-u8-014":"X; its lower pKa means larger Ka",
  "apchem-u8-019":"Increase both buffer-component concentrations equally",
  "apchem-u8-020":"Similar pH, but greater capacity for X",
  "apchem-u8-021":"H+ removes OH− and favors further dissolution",
  "apchem-u9-005":"Thermodynamically favorable forward",
  "apchem-u9-007":"Favorable thermodynamics but a large kinetic barrier",
  "apchem-u9-008":"Lower activation barriers without changing ΔG",
  "apchem-u9-011":"ΔG=ΔG°+RT ln Q",
  "apchem-u9-014":"A negative overall summed ΔG",
  "apchem-u9-016":"Ion migration that maintains half-cell neutrality",
  "apchem-u9-018":"ΔG°<0; favorable under standard conditions",
};
Object.entries(CHEM_CONCISE_CORRECT).forEach(([id, text]) => chemCorrect(id, text));

// Eight entirely original shared-data sets.
const CHEM_STIMULI = {
  atomic: { type:"quantitative", source:"Original simulated atomic-analysis data", columns:["Measurement","Result"], rows:[["Mass peak 35 u","75 relative counts"],["Mass peak 37 u","25 relative counts"],["Valence PES peak X","relative area 2.0"],["Comparison PES peak Y","relative area 1.0"]], description:"A hypothetical element is analyzed by mass spectrometry. A separate photoelectron comparison records relative areas for analogous valence-subshell peaks in samples X and Y." },
  gas: { type:"quantitative", source:"Original simulated gas data", columns:["Trial","n (mol)","T (K)","V (L)","Measured P (atm)"], rows:[["A","1.00","300","24.6","1.00"],["B","1.00","600","24.6","2.00"],["C","1.00","300","1.00","22.0"]], description:"Three sealed gas samples are compared. Trials A and B behave nearly ideally; trial C is compressed enough that intermolecular attractions and molecular volume may matter." },
  spectroscopy: { type:"quantitative", source:"Original simulated spectrophotometry data", columns:["Concentration (M)","Absorbance at 500 nm"], rows:[["0.10","0.20"],["0.20","0.40"],["0.30","0.60"],["Unknown","0.50"]], description:"A colored solute has a strong absorption band centered near 500 nm. Standards are measured in the same 1.00 cm cuvette and give the calibration data shown." },
  titration: { type:"quantitative", source:"Original simulated titration data", columns:["Quantity","Value"], rows:[["HCl aliquot","25.0 mL"],["NaOH titrant","0.150 M"],["NaOH at equivalence","20.0 mL"],["Initial HCl pH","about 0.92"]], description:"A monoprotic strong-acid sample is titrated with standardized sodium hydroxide. A pH probe identifies the equivalence region and all listed volumes are delivered at room temperature." },
  kinetics: { type:"quantitative", source:"Original simulated initial-rate data", columns:["Trial","[A] (M)","[B] (M)","Initial rate (M s−1)"], rows:[["1","0.10","0.10","2.0×10−3"],["2","0.20","0.10","4.0×10−3"],["3","0.10","0.20","2.0×10−3"]], description:"Initial rates are measured for A + B → products while one reactant concentration is changed at a time. Temperature and total solution volume are held constant." },
  calorimetry: { type:"quantitative", source:"Original simulated calorimetry data", columns:["Quantity","Value"], rows:[["Water mass","100.0 g"],["Initial temperature","22.0 °C"],["Final temperature","17.0 °C"],["Water specific heat","4.18 J g−1 °C−1"]], description:"A salt dissolves in water inside an insulated coffee-cup calorimeter. The cup heat capacity is neglected for this model and the solution's specific heat is approximated by that of water." },
  equilibrium: { type:"quantitative", source:"Original simulated equilibrium data", columns:["Time","[A] (M)","[B] (M)"], rows:[["0 s","1.00","0.00"],["100 s","0.55","0.45"],["200 s","0.50","0.50"],["300 s","0.50","0.50"]], description:"For the reversible process A ⇌ B at fixed temperature, concentrations are recorded until they become constant. A later perturbation removes some B without changing temperature." },
  electrochem: { type:"quantitative", source:"Original simulated galvanic-cell data", columns:["Condition","Ecell (V)"], rows:[["Standard initial state","+1.10"],["After partial discharge","+0.72"],["Near equilibrium","+0.03"]], description:"A spontaneous galvanic cell is allowed to discharge through an external circuit. A salt bridge connects the half-cells and the cell potential is measured as composition changes." },
};
function chemGroup(ids, groupId, stimulus) { ids.forEach((id) => chemPatch(id, { stimulusGroupId: groupId, stimulus })); }
chemGroup(["apchem-u1-003","apchem-u1-004","apchem-u1-012"], "chem-set-atomic", CHEM_STIMULI.atomic);
chemGroup(["apchem-u3-007","apchem-u3-010","apchem-u3-012"], "chem-set-gas", CHEM_STIMULI.gas);
chemGroup(["apchem-u3-021","apchem-u3-024","apchem-u3-026"], "chem-set-spectroscopy", CHEM_STIMULI.spectroscopy);
chemGroup(["apchem-u4-011","apchem-u4-012","apchem-u4-015"], "chem-set-titration", CHEM_STIMULI.titration);
chemGroup(["apchem-u5-001","apchem-u5-004","apchem-u5-014"], "chem-set-kinetics", CHEM_STIMULI.kinetics);
chemGroup(["apchem-u6-002","apchem-u6-006","apchem-u6-007"], "chem-set-calorimetry", CHEM_STIMULI.calorimetry);
chemGroup(["apchem-u7-004","apchem-u7-006","apchem-u7-020"], "chem-set-equilibrium", CHEM_STIMULI.equilibrium);
chemGroup(["apchem-u9-016","apchem-u9-018","apchem-u9-020"], "chem-set-electrochem", CHEM_STIMULI.electrochem);

chemPatch("apchem-u1-003", { q:"Using the mass-spectrum data, which average atomic mass is most reasonable for the hypothetical element?" });
chemPatch("apchem-u1-004", { q:"Using the two isotope peaks in the stimulus, what fraction of atoms have mass 37 u?", o:["0.25","0.50","0.75","1.00"], c:[0], e:"The relative counts total 100, and the 37 u peak contributes 25 of those counts. Its fractional abundance is therefore 25/100 = 0.25, or 25%." });
chemPatch("apchem-u1-012", { q:"The analogous valence PES peak for sample X has twice the relative area of sample Y at similar binding energy. What does the model most directly suggest?" });
chemPatch("apchem-u3-007", { q:"Which calculation reproduces the approximately 24.6 L volume in trial A using the ideal-gas law?" });
chemPatch("apchem-u3-010", { q:"If trial A used He and a second otherwise identical trial used Xe, which gas would have the greater rms speed?", o:["He","Xe","They would have identical rms speeds","The answer depends only on pressure"], c:[0], e:"At equal temperature, rms speed varies inversely with the square root of molar mass. Helium is much lighter than xenon and therefore has the greater rms speed." });
chemPatch("apchem-u3-012", { q:"Trial C is highly compressed. If its measured pressure is lower than a simple ideal prediction, which effect can help explain the difference?" });
chemPatch("apchem-u3-021", { q:"The solute absorbs near 500 nm. Which statement correctly relates the energy of those absorbed photons to their frequency?" });
chemPatch("apchem-u3-024", { q:"If another absorption band occurred at twice the wavelength of 500 nm, the photon energy for that band would be approximately" });
chemPatch("apchem-u3-026", { q:"Using the linear calibration table, what concentration is estimated for the unknown with absorbance 0.50?", o:["0.25 M","0.10 M","0.40 M","0.50 M"], c:[0], e:"The standards increase by 0.20 absorbance for each 0.10 M. An absorbance of 0.50 lies halfway between 0.40 and 0.60, so the concentration is about 0.25 M." });
chemPatch("apchem-u4-011", { q:"Why is the stated 0.150 M NaOH concentration important for this titration?" });
chemPatch("apchem-u4-012", { q:"Using the equivalence data and 1:1 HCl:NaOH stoichiometry, what is the HCl concentration?" });
chemPatch("apchem-u4-015", { q:"During the titration, OH− accepts H+ from hydronium-containing solution. In Brønsted-Lowry terms, OH− acts as" });
chemPatch("apchem-u5-001", { q:"Between trials 1 and 2, [A] doubles and the initial rate doubles. What rate change is observed numerically?", o:["2.0×10−3 M s−1 to 4.0×10−3 M s−1","2.0×10−3 M s−1 to 8.0×10−3 M s−1","4.0×10−3 M s−1 to 2.0×10−3 M s−1","No measurable rate change"], c:[0], e:"The table directly shows the initial rate increasing from 2.0×10⁻³ to 4.0×10⁻³ M s⁻¹ when [A] doubles while [B] is held constant." });
chemPatch("apchem-u5-004", { q:"Which rate law is consistent with all three initial-rate trials?" });
chemPatch("apchem-u5-014", { q:"Which additional kinetic experiment would provide the strongest test of a mechanism proposed to explain these data?" });
chemPatch("apchem-u6-002", { q:"What observation in the calorimetry data supports classifying the dissolution as endothermic?" });
chemPatch("apchem-u6-006", { q:"Neglecting calorimeter heat capacity, if the water loses about 2.09 kJ, what heat change is assigned to the dissolving system?", o:["+2.09 kJ","−2.09 kJ","0 kJ","+4.18 kJ"], c:[0], e:"The insulated model gives q_system + q_water = 0. A 5.0 °C cooling of 100.0 g water corresponds to about −2.09 kJ for the water, so dissolution absorbs +2.09 kJ." });
chemPatch("apchem-u6-007", { q:"Using the listed water mass, specific heat, and 5.0 °C temperature decrease, what is the magnitude of q for the water?" });
chemPatch("apchem-u7-004", { q:"Which additional measurement would most directly establish that the constant concentrations after 200 s represent dynamic equilibrium?" });
chemPatch("apchem-u7-006", { q:"At 200 s, suppose Kc=1.0. If B is suddenly removed so Q becomes less than 1.0, what net direction follows?" });
chemPatch("apchem-u7-020", { q:"If a different perturbation instead makes Q greater than K, what net change restores equilibrium?" });
chemPatch("apchem-u9-016", { q:"What role does the salt bridge play while the cell produces the positive potentials shown?" });
chemPatch("apchem-u9-018", { q:"The initial standard cell potential is +1.10 V. What sign does ΔG° have for the spontaneous cell reaction?" });
chemPatch("apchem-u9-020", { q:"Why does the measured cell potential approach zero as the cell nears equilibrium?" });

// A stimulus-set member is not simultaneously a near-duplicate variant.
const CHEM_GROUPED_VARIANTS = new Set(CHEM_QUESTIONS.filter((item) => item.stimulusGroupId && item.variantGroupId).map((item) => item.variantGroupId));
CHEM_QUESTIONS.forEach((item) => { if (CHEM_GROUPED_VARIANTS.has(item.variantGroupId)) delete item.variantGroupId; });

// Deterministic raw key balance. Runtime delivery still shuffles options.
CHEM_QUESTIONS.forEach((item, index) => {
  const target = index % 4;
  const current = item.c[0];
  if (current === target) return;
  const correctText = item.o[current];
  item.o.splice(current, 1);
  item.o.splice(target, 0, correctText);
  item.c = [target];
});
