// AP Chemistry — focused corrections discovered during independent content audit.
// Loaded after curation so semantic keys, wording cleanup, and rationale fixes are
// explicit and regression-testable rather than being hidden in option positions.

const CHEM_SEMANTIC_KEYS = {
  "apchem-u3-022": "An upward arrow connecting the lower level to the upper level",
  "apchem-u6-010": "Particles become farther apart while individual molecules remain intact",
  "apchem-u7-002": "Forward rate falls and reverse rate rises until the two become equal and nonzero",
  "apchem-u3-020": "Add equal excess dye to equal solvent volumes at the same temperature, equilibrate, then measure dissolved concentration in each filtered liquid",
  "apchem-u4-002": "Run the reaction in a sealed flexible container and measure the total mass before and after",
  "apchem-u4-014": "Pass the gas through a validated CO2 indicator or absorbent and compare with a blank control",
  "apchem-u5-014": "Measure initial rates while independently varying reactant concentrations and compare the observed rate law with each mechanism's prediction",
  "apchem-u5-022": "Compare time courses with and without the substance from identical starting mixtures, then verify both approach the same equilibrium composition",
  "apchem-u6-002": "Measure solution temperature before and after dissolving a known amount in an insulated cup while minimizing heat exchange with the surroundings",
  "apchem-u6-018": "Measure calorimetric enthalpies for accessible reactions that algebraically sum to the target reaction, then add the corresponding ΔH values",
  "apchem-u7-004": "Determine forward and reverse rates over time and show they become equal while both remain nonzero",
  "apchem-u7-018": "Prepare identical equilibrium mixtures at one temperature, add a measured reactant amount to the treatment only, and compare compositions after re-equilibration",
  "apchem-u8-002": "Show that it accepts H+ from a suitable proton donor and forms its conjugate acid",
  "apchem-u8-016": "Add equal small amounts of strong acid to equal volumes and compare the resulting pH changes",
  "apchem-u8-022": "Equilibrate excess solid with solutions spanning controlled pH values at one temperature and measure dissolved-ion concentration",
};

Object.entries(CHEM_SEMANTIC_KEYS).forEach(([id, correctText]) => {
  const item = CHEM_BY_ID.get(id);
  const correctIndex = item.o.indexOf(correctText);
  if (correctIndex < 0) throw new Error(`${id}: semantic correct option missing after curation`);
  item.c = [correctIndex];
});

// CONTENT_STANDARDS.md §3 allows an occasional absolute-language distractor but
// treats two or more in one item as a statistical tell. Match both the explicit
// examples in the standard and close equivalents such as all/none/completely,
// impossible, and guarantee wording. Preserve at most one absolute distractor.
const CHEM_ABSOLUTE_LANGUAGE_AUDIT_IDS = new Set([
  "apchem-u2-001", "apchem-u2-008", "apchem-u3-010", "apchem-u4-002",
  "apchem-u5-009", "apchem-u5-010", "apchem-u5-022", "apchem-u6-002",
  "apchem-u7-004", "apchem-u7-015", "apchem-u7-018", "apchem-u8-001",
  "apchem-u8-011", "apchem-u8-015", "apchem-u8-019", "apchem-u8-022",
  "apchem-u9-002",
]);
const CHEM_ABSOLUTE_WORD = /\b(every|always|never|only|entirely|unlimited|identical|all|none|completely|impossible|guarantee(?:s|d)?)\b/i;
const CHEM_SOFTEN_ABSOLUTE = (text) => text
  .replace(/\bevery\b/gi, "many")
  .replace(/\balways\b/gi, "generally")
  .replace(/\bnever\b/gi, "seldom")
  .replace(/\bonly\b/gi, "primarily")
  .replace(/\bentirely\b/gi, "largely")
  .replace(/\bunlimited\b/gi, "very large")
  .replace(/\bidentical\b/gi, "closely matched")
  .replace(/\ball\b/gi, "many")
  .replace(/\bnone\b/gi, "few")
  .replace(/\bcompletely\b/gi, "substantially")
  .replace(/\bimpossible\b/gi, "unlikely")
  .replace(/\bguarantees\b/gi, "suggests")
  .replace(/\bguaranteed\b/gi, "suggested")
  .replace(/\bguarantee\b/gi, "suggest");

CHEM_ABSOLUTE_LANGUAGE_AUDIT_IDS.forEach((id) => {
  const item = CHEM_BY_ID.get(id);
  let retainedAbsoluteDistractor = false;
  item.o = item.o.map((option, index) => {
    if (index === item.c[0] || !CHEM_ABSOLUTE_WORD.test(option)) return option;
    if (!retainedAbsoluteDistractor) {
      retainedAbsoluteDistractor = true;
      return option;
    }
    return CHEM_SOFTEN_ABSOLUTE(option);
  });
});

// Six explanations in the draft had correct but too-short authored reasoning and
// therefore inherited the helper's generic 90-character padding sentence. Replace
// each with item-specific teaching rationale so no boilerplate remains in the bank.
const CHEM_RATIONALE_FIXES = {
  "apchem-u3-007": "For an ideal gas, V=nRT/P. Using n=1.00 mol, T=300 K, P=1.00 atm, and R=0.08206 L·atm·mol⁻¹·K⁻¹ gives V≈24.6 L, matching trial A and linking the table directly to the ideal-gas model.",
  "apchem-u6-007": "The water cools by 5.0 °C, so the magnitude of its heat change is |q|=mc|ΔT|=(100.0 g)(4.18 J g⁻¹ °C⁻¹)(5.0 °C)=2090 J=2.09 kJ. The negative sign belongs to the cooling water; the question asks for magnitude.",
  "apchem-u7-013": "At equilibrium [A]=1.0−x and [B]=x for the 1:1 conversion A ⇌ B. Substituting those concentrations into Kc=[B]/[A] with Kc=4.0 gives x/(1.0−x)=4.0; the alternative forms invert or otherwise misbuild the equilibrium expression.",
  "apchem-u8-003": "HCl is treated as a strong acid, so 1.0×10⁻³ M HCl gives approximately 1.0×10⁻³ M H₃O⁺. Applying pH=−log[H₃O⁺] gives pH=3.00; values such as 11 would correspond to a basic solution instead.",
  "apchem-u8-004": "At 25 °C, Kw=1.0×10⁻¹⁴ and therefore pH+pOH=14.00. A solution with pOH=4.00 has pH=14.00−4.00=10.00, placing it on the basic side of neutrality as expected from the low pOH.",
  "apchem-u8-018": "The Henderson-Hasselbalch equation gives pH=pKa+log([A⁻]/[HA]). With pKa=4.76 and a base-to-acid ratio of 10, log(10)=1.00, so pH=5.76. The tenfold excess of conjugate base raises pH by one unit above pKa.",
};
Object.entries(CHEM_RATIONALE_FIXES).forEach(([id, explanation]) => {
  CHEM_BY_ID.get(id).e = explanation;
});

// Restore deterministic 46/46/45/45 raw-key balance after all semantic/content
// corrections. Runtime delivery still shuffles options on every attempt.
CHEM_QUESTIONS.forEach((item, index) => {
  const target = index % 4;
  const current = item.c[0];
  if (current === target) return;
  const correctText = item.o[current];
  item.o.splice(current, 1);
  item.o.splice(target, 0, correctText);
  item.c = [target];
});


// NAIVE_AUDIT_EXACT_SKILL_REPAIRS_V1
// Independent clean-room audit against the Fall 2024 CED found that several
// exact subskill codes had been used as broad practice-family labels. The
// corrections below preserve the College Board practice-family blueprint while
// making each exact code describe what the item actually asks the student to do.
const CHEM_NAIVE_EXACT_SKILLS = {
  // Practice 2 — Question and Method
  "apchem-u3-026":"5.D",
  "apchem-u4-002":"2.C",
  "apchem-u4-011":"2.B",
  "apchem-u5-014":"2.C",
  "apchem-u5-022":"2.C",
  "apchem-u6-002":"2.D",
  "apchem-u6-018":"2.C",
  "apchem-u7-004":"2.C",
  "apchem-u8-002":"2.C",
  "apchem-u8-016":"2.C",
  "apchem-u8-022":"2.C",

  // Practice 5 — Mathematical Routines
  "apchem-u1-001":"5.F", "apchem-u1-002":"5.B", "apchem-u1-004":"5.F",
  "apchem-u1-005":"5.F", "apchem-u1-006":"5.F", "apchem-u1-007":"5.F",
  "apchem-u1-012":"5.C", "apchem-u2-012":"5.F", "apchem-u3-007":"5.F",
  "apchem-u3-008":"5.C", "apchem-u3-010":"5.C", "apchem-u3-013":"5.F",
  "apchem-u3-023":"5.C", "apchem-u3-024":"5.C", "apchem-u3-025":"5.C",
  "apchem-u3-026":"5.D", "apchem-u4-004":"5.E", "apchem-u4-009":"5.F",
  "apchem-u4-010":"5.F", "apchem-u4-012":"5.F", "apchem-u4-018":"5.F",
  "apchem-u5-001":"5.D", "apchem-u5-003":"5.C", "apchem-u5-004":"5.D",
  "apchem-u5-005":"5.B", "apchem-u5-006":"5.F", "apchem-u5-008":"5.B",
  "apchem-u5-015":"5.B", "apchem-u5-016":"5.C", "apchem-u5-017":"5.F",
  "apchem-u6-004":"5.F", "apchem-u6-006":"5.F", "apchem-u6-007":"5.F",
  "apchem-u6-008":"5.C", "apchem-u6-009":"5.F", "apchem-u6-011":"5.F",
  "apchem-u6-012":"5.C", "apchem-u6-013":"5.B", "apchem-u6-015":"5.B",
  "apchem-u6-016":"5.B", "apchem-u6-017":"5.F", "apchem-u7-005":"5.B",
  "apchem-u7-006":"5.C", "apchem-u7-007":"5.F", "apchem-u7-008":"5.F",
  "apchem-u7-011":"5.C", "apchem-u7-012":"5.C", "apchem-u7-013":"5.B",
  "apchem-u7-014":"5.F", "apchem-u7-019":"5.F", "apchem-u7-020":"5.C",
  "apchem-u7-021":"5.B", "apchem-u7-022":"5.B", "apchem-u8-003":"5.F",
  "apchem-u8-004":"5.F", "apchem-u8-005":"5.B", "apchem-u8-006":"5.C",
  "apchem-u8-008":"5.C", "apchem-u8-013":"5.F", "apchem-u8-014":"5.C",
  "apchem-u8-017":"5.C", "apchem-u8-018":"5.F", "apchem-u8-020":"5.C",
  "apchem-u9-003":"5.B", "apchem-u9-005":"5.B", "apchem-u9-006":"5.F",
  "apchem-u9-009":"5.B", "apchem-u9-010":"5.C", "apchem-u9-011":"5.B",
  "apchem-u9-012":"5.C", "apchem-u9-013":"5.F", "apchem-u9-017":"5.B",
  "apchem-u9-018":"5.C", "apchem-u9-019":"5.C", "apchem-u9-020":"5.C",
  "apchem-u9-021":"5.F", "apchem-u9-022":"5.F",

  // Practice 6 — Argumentation
  "apchem-u1-014":"6.D", "apchem-u2-002":"6.B", "apchem-u2-004":"6.D",
  "apchem-u2-008":"6.E", "apchem-u3-002":"6.E", "apchem-u3-004":"6.B",
  "apchem-u3-006":"6.E", "apchem-u3-011":"6.D", "apchem-u3-018":"6.B",
  "apchem-u4-007":"6.B", "apchem-u4-016":"6.D", "apchem-u5-012":"6.D",
  "apchem-u5-018":"6.D", "apchem-u5-020":"6.D", "apchem-u6-014":"6.D",
  "apchem-u7-010":"6.D", "apchem-u7-024":"6.D", "apchem-u8-010":"6.D",
  "apchem-u8-012":"6.D", "apchem-u9-004":"6.A", "apchem-u9-007":"6.D",
  "apchem-u9-014":"6.D"
};
Object.entries(CHEM_NAIVE_EXACT_SKILLS).forEach(([id, skill]) => {
  const item = CHEM_BY_ID.get(id);
  if (!item) throw new Error(`${id}: missing during exact-skill repair`);
  item.skill = skill;
});

// The spectroscopy overlay had changed the stem of u3-024 without replacing
// its original E=hν option set. Restore a coherent wavelength-energy task.
Object.assign(CHEM_BY_ID.get("apchem-u3-024"), {
  q: "If another absorption band occurred at twice the wavelength of 500 nm, how would the photon energy compare with that of a 500 nm photon?",
  o: ["One-half as large", "Twice as large", "Four times as large", "Unchanged"],
  c: [0],
  e: "Photon energy is E=hc/λ, so energy is inversely proportional to wavelength. Doubling the wavelength from 500 nm to 1000 nm therefore halves the energy of each photon."
});

// u6-002 had an observation stem paired with a procedure answer after two
// successive overlays. Make it a genuine 2.D reading of the calorimetry data.
Object.assign(CHEM_BY_ID.get("apchem-u6-002"), {
  q: "What observation in the calorimetry data supports classifying the dissolution as endothermic?",
  o: [
    "The solution temperature decreases from 22.0 °C to 17.0 °C as the salt dissolves",
    "The water mass is 100.0 g before the temperature is read",
    "The listed specific heat is positive",
    "The calorimeter is described as insulated"
  ],
  c: [0],
  e: "The measured solution temperature falls by 5.0 °C while the salt dissolves. In the insulated model, that cooling shows thermal energy leaving the solution and entering the dissolving system, so the dissolution is endothermic."
});

// u4-011 was tagged 2.B even though it only asked why a standardized titrant
// matters. Replace it with a genuine prediction/result task using the same set.
Object.assign(CHEM_BY_ID.get("apchem-u4-011"), {
  q: "A student predicts that doubling the HCl aliquot volume while keeping its concentration unchanged will double the volume of the same 0.150 M NaOH needed at equivalence. Which result would support the prediction?",
  o: [
    "A 50.0 mL HCl aliquot requires about 40.0 mL of the 0.150 M NaOH",
    "A 50.0 mL HCl aliquot requires about 20.0 mL of the 0.150 M NaOH",
    "A 12.5 mL HCl aliquot requires about 40.0 mL of the 0.150 M NaOH",
    "Changing the HCl aliquot volume makes the NaOH concentration change to match it"
  ],
  c: [0],
  e: "At unchanged HCl concentration, doubling aliquot volume doubles moles of HCl. The 1:1 neutralization therefore requires twice as many moles, and at fixed 0.150 M NaOH that means twice the titrant volume: about 40.0 mL instead of 20.0 mL."
});

// Make the Brønsted-Lowry item explicitly a procedure-selection task for 2.C.
Object.assign(CHEM_BY_ID.get("apchem-u8-002"), {
  q: "Which experimental procedure most directly tests whether an aqueous species behaves as a Brønsted-Lowry base?",
  o: [
    "Mix it with a suitable proton donor and test whether its conjugate acid forms",
    "Measure only the mass of the solution before and after stirring",
    "Evaporate the solvent and infer proton transfer from the residue color",
    "Add an inert salt and assume any conductivity change proves proton acceptance"
  ],
  c: [0],
  e: "A Brønsted-Lowry base accepts H+. Exposing the species to a suitable proton donor and detecting formation of its conjugate acid directly tests that defining chemical behavior; the other procedures do not isolate proton transfer."
});

// Turn the conjugate-pair recall item into genuine chemical-principle reasoning.
Object.assign(CHEM_BY_ID.get("apchem-u4-016"), {
  q: "A student claims that NH4+ and NH3 form a conjugate acid-base pair. Which reasoning best justifies the claim?",
  o: [
    "The two species differ by exactly one proton, so NH4+ can donate H+ to form NH3",
    "The two species contain the same total number of atoms and therefore have identical acid strength",
    "Both species contain nitrogen, so either one must be a strong acid in water",
    "Their charges differ by one because an electron, rather than a proton, is transferred"
  ],
  c: [0],
  e: "Conjugate Brønsted-Lowry acid-base partners differ by one H+. NH4+ can donate a proton to become NH3, and NH3 can accept a proton to reform NH4+, which directly justifies the student's claim."
});

// Re-establish the deterministic 46/46/45/45 raw-key balance after replacing
// option sets. Runtime delivery still shuffles options independently.
CHEM_QUESTIONS.forEach((item, index) => {
  const target = index % 4;
  const current = item.c[0];
  if (current === target) return;
  const correctText = item.o[current];
  item.o.splice(current, 1);
  item.o.splice(target, 0, correctText);
  item.c = [target];
});


// NAIVE_AUDIT_ARGUMENTATION_REPAIRS_V2
// Strengthen exact Practice 6.D items so they require reasoning that justifies
// a claim, rather than merely selecting a conclusion or condition.
function chemReasoningRepair(id, q, o, e) {
  const item = CHEM_BY_ID.get(id);
  if (!item) throw new Error(`${id}: missing during argumentation repair`);
  Object.assign(item, { q, o, c:[0], e, skill:"6.D" });
}

chemReasoningRepair(
  "apchem-u2-004",
  "A student claims that a stronger bond between the same kinds of atoms corresponds to a deeper potential-energy well. Which reasoning best justifies the claim?",
  [
    "More energy must be supplied to raise the bonded atoms from a deeper minimum to the separated-atom energy level",
    "A deeper well means the atoms have no attractive interaction at the equilibrium separation",
    "A stronger bond places the equilibrium structure at a positive potential energy above separated atoms",
    "Bond strength depends only on the number of atoms present, not on the potential-energy curve"
  ],
  "Bond dissociation requires supplying enough energy to move from the potential-energy minimum to the separated-atom limit. A deeper minimum therefore requires a larger energy input and represents a stronger bond."
);

chemReasoningRepair(
  "apchem-u3-011",
  "A student claims that real gases deviate most strongly from ideal behavior at high pressure and low temperature. Which reasoning best justifies the claim?",
  [
    "High pressure makes particle volume significant, while low temperature makes intermolecular attractions more important relative to kinetic energy",
    "High pressure makes gas particles effectively point-like, while low temperature removes intermolecular attractions",
    "High pressure eliminates collisions, while low temperature makes all gases chemically react with their containers",
    "Low temperature increases particle speed enough that attractions become negligible, and high pressure separates the particles"
  ],
  "The ideal-gas model neglects molecular volume and intermolecular attractions. Compression makes finite particle volume important, while lower temperature reduces kinetic energy so attractions have a larger effect; both changes increase nonideal behavior."
);

chemReasoningRepair(
  "apchem-u5-012",
  "An energy profile shows products lower in energy than reactants. A student claims the reaction is exothermic. Which reasoning best justifies the claim?",
  [
    "The products lie at lower enthalpy than the reactants, so ΔH = Hproducts − Hreactants is negative",
    "The activation-energy peak is above both reactants and products, so ΔH must be positive",
    "The products are lower on the diagram because the forward reaction must be slower than the reverse reaction",
    "Any reaction with a transition-state peak releases heat regardless of the relative reactant and product energies"
  ],
  "Reaction enthalpy is the enthalpy of products minus that of reactants. Because the products are shown at lower energy, this difference is negative, which is the defining thermodynamic sign for an exothermic reaction."
);

chemReasoningRepair(
  "apchem-u5-020",
  "For a two-step mechanism, the first transition-state peak is much higher above its preceding minimum than the second peak is above its preceding minimum. Which reasoning best supports predicting that the first step is slower, all else equal?",
  [
    "The first step has the larger activation-energy barrier, so a smaller fraction of collisions can reach its transition state at the same temperature",
    "The first peak occurs earlier on the reaction coordinate, so the first step necessarily has fewer molecular collisions",
    "A taller first peak means the first step has a more negative ΔH, which directly makes it slower",
    "The second step must be slower because every later elementary step has a lower reactant concentration"
  ],
  "At a fixed temperature, a larger activation-energy barrier reduces the fraction of molecular encounters energetic enough to reach the transition state. The much larger first barrier therefore supports a slower first elementary step."
);

chemReasoningRepair(
  "apchem-u6-014",
  "A student claims that a reaction forming stronger product bonds than the reactant bonds it breaks is likely exothermic. Which reasoning best justifies the claim?",
  [
    "Forming the stronger product bonds releases more energy than is required to break the weaker reactant bonds, giving a negative net ΔH",
    "Breaking reactant bonds releases energy while forming product bonds absorbs energy, so stronger product bonds force ΔH below zero",
    "Bond strength determines only activation energy and cannot affect the reaction enthalpy",
    "Stronger product bonds imply the products contain more atoms, so conservation of energy requires heat release"
  ],
  "Breaking bonds requires energy and forming bonds releases energy. If formation of the stronger product bonds releases more energy than bond breaking consumes, the net enthalpy change is negative and the reaction is exothermic."
);

chemReasoningRepair(
  "apchem-u7-010",
  "At the same temperature, reaction X has K = 10^−6 and reaction Y has K = 10^3. Which reasoning best supports the claim that reaction Y is more product-favored at equilibrium?",
  [
    "A value of K much greater than 1 means the equilibrium expression favors product concentrations relative to reactant concentrations",
    "The larger exponent in 10^3 means reaction Y must have the faster forward rate at all times",
    "A positive value of K proves products are absent at equilibrium unless K equals exactly 1",
    "The smaller K for reaction X means its products have lower activation energy than those of reaction Y"
  ],
  "The equilibrium constant compares product and reactant activities according to the balanced equation. K much greater than 1 corresponds to an equilibrium mixture weighted toward products, whereas K much less than 1 is reactant-favored."
);

chemReasoningRepair(
  "apchem-u8-012",
  "A student claims that HF is a weaker acid in water than HCl even though fluorine is more electronegative than chlorine. Which reasoning best justifies the claim?",
  [
    "The H–F bond is unusually strong, so proton transfer to water is less favorable than breaking the weaker H–Cl bond",
    "Greater fluorine electronegativity makes HF ionic in water, preventing any interaction with polar water molecules",
    "HCl is stronger because chlorine has fewer occupied electron shells than fluorine and therefore holds H more tightly",
    "Acid strength in water depends only on molecular mass, so the heavier HCl must dissociate more completely"
  ],
  "For hydrogen halides, bond strength is a major contributor to acid behavior in water. The unusually strong H–F bond makes proton transfer less favorable than for HCl despite fluorine's greater electronegativity."
);

// Restore deterministic raw-key balance after the option rewrites above.
CHEM_QUESTIONS.forEach((item, index) => {
  const target = index % 4;
  const current = item.c[0];
  if (current === target) return;
  const correctText = item.o[current];
  item.o.splice(current, 1);
  item.o.splice(target, 0, correctText);
  item.c = [target];
});


// CLEAN-ROOM PRACTICE 4 REPAIR — 2026-08-12
// Exact Fall-2024 CED semantics:
// 4.A predict/explain with models/theories; 4.B evaluate model consistency;
// 4.C connect particulate and macroscopic properties; 4.D evaluate how well a
// representation captures that particulate↔macroscopic connection.
const CHEM_P4_EXACT_OVERRIDES = {
  "apchem-u1-003":"5.F", "apchem-u1-008":"4.A", "apchem-u1-010":"4.A", "apchem-u1-011":"4.A",
  "apchem-u1-013":"4.A", "apchem-u1-016":"4.B", "apchem-u2-001":"4.A", "apchem-u2-003":"4.B",
  "apchem-u2-006":"4.A", "apchem-u2-010":"4.B", "apchem-u2-011":"4.A", "apchem-u2-014":"4.A",
  "apchem-u3-001":"4.D", "apchem-u3-003":"4.C", "apchem-u3-005":"4.A", "apchem-u3-009":"4.A",
  "apchem-u3-012":"4.B", "apchem-u3-014":"4.B", "apchem-u3-016":"4.C", "apchem-u3-019":"4.D",
  "apchem-u3-021":"5.C", "apchem-u4-003":"4.A", "apchem-u4-006":"4.A", "apchem-u4-008":"4.C",
  "apchem-u4-013":"4.A", "apchem-u4-015":"4.A", "apchem-u4-017":"4.A", "apchem-u5-002":"5.D",
  "apchem-u5-007":"4.A", "apchem-u5-009":"4.A", "apchem-u5-011":"4.B", "apchem-u5-013":"4.A",
  "apchem-u5-019":"4.B", "apchem-u5-021":"4.A", "apchem-u6-001":"4.A", "apchem-u6-003":"4.B",
  "apchem-u6-005":"4.A", "apchem-u7-001":"4.A", "apchem-u7-003":"4.A", "apchem-u7-009":"4.A",
  "apchem-u7-016":"4.B", "apchem-u7-017":"4.A", "apchem-u7-023":"4.D", "apchem-u8-001":"4.A",
  "apchem-u8-007":"4.A", "apchem-u8-009":"4.A", "apchem-u8-011":"4.A", "apchem-u8-015":"4.A",
  "apchem-u8-019":"4.A", "apchem-u8-021":"4.D", "apchem-u9-001":"4.A", "apchem-u9-008":"4.A",
  "apchem-u9-016":"4.A"
};
Object.entries(CHEM_P4_EXACT_OVERRIDES).forEach(([id, skill]) => chemPatch(id, { skill }));

chemPatch("apchem-u2-003", {
  q: "A potential-energy model for two H atoms has a minimum at one internuclear distance. Which interpretation of that model is consistent with bonding theory?",
  o: ["The minimum marks the equilibrium bond length where attractive and repulsive effects balance", "The minimum marks a distance where all electrostatic forces vanish", "The minimum means both electrons have been removed from the atoms", "The minimum is an unstable maximum-energy separation"], c:[0],
  e: "A stable H—H bond corresponds to a minimum in the potential-energy curve. At that separation, attractive and repulsive interactions balance; compressing or separating the atoms raises the energy."
});
chemPatch("apchem-u3-001", {
  q: "A particulate model shows extensive hydrogen bonding among H2O molecules but only weaker intermolecular attractions among H2S molecules. How well does that model account for water's higher boiling point?",
  o: ["It accounts for the observation well because stronger intermolecular attractions require more energy to separate H2O molecules", "It does not account for the observation because boiling requires breaking the O—H covalent bonds", "It predicts H2S should boil higher solely because its molar mass is larger", "It predicts identical boiling points because both substances are molecular"], c:[0],
  e: "The model connects stronger particulate-level hydrogen bonding in water to the macroscopic energy required for boiling. Stronger intermolecular attractions make water's higher boiling point reasonable despite H2S having greater molar mass."
});
chemPatch("apchem-u3-003", {
  q: "A particulate model of an ionic solid shows ions fixed in a rigid lattice when solid and mobile after melting. Which macroscopic behavior does that model explain?",
  o: ["A high melting point and electrical conductivity when molten but not when solid", "A low boiling point and high volatility at room temperature", "Electrical conductivity only while the ions remain fixed in the solid lattice", "Softness and melting near room temperature because the ions are weakly attracted"], c:[0],
  e: "Strong electrostatic attractions in the particulate lattice explain the high melting point, while the change from fixed to mobile ions explains why charge can flow after melting but not through the intact solid."
});
chemPatch("apchem-u3-012", {
  q: "Trial C is highly compressed and its measured pressure is lower than the ideal-gas prediction. Which assessment of the ideal-gas model is most consistent with the data?",
  o: ["The model overpredicts pressure because intermolecular attractions in the real gas reduce momentum transfer to the walls", "The model underpredicts pressure because ideal particles are assigned stronger attractions than real particles", "The model is exact because molecular volume and attractions disappear at high pressure", "The data prove gas particles stop moving between wall collisions"], c:[0],
  e: "The ideal model neglects attractions. In a compressed real gas, attractions can reduce momentum transfer at the container wall, producing a measured pressure below the simple ideal prediction and revealing a limitation of the model."
});
chemPatch("apchem-u3-019", {
  q: "A molecular-interaction model shows ethanol forming favorable hydrogen-bonding interactions with water, while hexane interacts with water mainly through weaker dispersion forces. How well does this model account for ethanol being miscible with water while hexane is not?",
  o: ["It accounts for the difference well because ethanol-water attractions can replace disrupted water-water interactions more effectively than hexane-water attractions can", "It fails because miscibility depends only on molar mass and not on intermolecular interactions", "It predicts hexane should ionize in water and therefore be more soluble than ethanol", "It predicts both liquids should be equally miscible because both contain covalent bonds"], c:[0],
  e: "The representation links particulate-level intermolecular attractions to the macroscopic observation of miscibility. Favorable polar and hydrogen-bonding interactions make ethanol-water mixing much more favorable than hexane-water mixing."
});
chemPatch("apchem-u4-008", {
  q: "A particle model of boiling water shows intact H2O molecules becoming farther apart as liquid becomes vapor. Which particulate-to-macroscopic connection does the model support?",
  o: ["Boiling primarily overcomes intermolecular attractions between water molecules rather than breaking O—H covalent bonds", "Boiling converts oxygen atoms into hydrogen atoms as the molecules separate", "Boiling breaks the O—H covalent bonds as the molecules enter the vapor", "Boiling greatly reduces molecular kinetic energy as the sample becomes a gas"], c:[0],
  e: "The particle model keeps each H2O molecule intact while increasing intermolecular separation. That directly connects the macroscopic phase change to overcoming intermolecular attractions rather than breaking intramolecular O—H bonds."
});
chemPatch("apchem-u7-023", {
  q: "A particulate equilibrium model of saturated AgCl shows dissolved Ag+ and Cl− in equilibrium with solid AgCl. After NaCl is added, the model shows more Cl− ions and more solid AgCl. How well does this model account for the observed decrease in AgCl solubility?",
  o: ["It accounts for the observation well because added Cl− raises the dissolution reaction quotient and shifts the particulate equilibrium toward solid AgCl", "It fails because adding a common ion must increase the number of dissolved Ag+ ions", "It predicts no macroscopic change because equilibrium systems cannot respond to concentration changes", "It predicts the solid disappears because Cl− removes Ag+ from the equilibrium expression"], c:[0],
  e: "The model connects the particulate increase in the common ion to the macroscopic decrease in solubility. Increasing Cl− raises Q for dissolution and favors the reverse process, producing more solid AgCl."
});
chemPatch("apchem-u8-021", {
  q: "A particulate model of M(OH)2(s) in water shows dissolution producing M2+ and OH−. In acidic solution, added H+ removes OH− from the dissolved particles. How well does this model account for the observed increase in solubility?",
  o: ["It accounts for the increase well because removing OH− lowers the dissolution reaction quotient and favors further dissolution of the solid", "It fails because H+ cannot interact with OH− in aqueous solution", "It predicts lower solubility because removing a product must shift dissolution toward the solid", "It predicts unchanged solubility because pH cannot affect an ionic equilibrium"], c:[0],
  e: "The model links a particulate-level acid-base reaction that removes OH− to the macroscopic increase in solubility. Lowering a dissolution product concentration drives additional M(OH)2 to dissolve."
});


// Preserve raw key positions after clean-room Practice 4 rewrites.
chemPatch("apchem-u2-003", { o:["The minimum marks a distance where all electrostatic forces vanish", "The minimum means both electrons have been removed from the atoms", "The minimum marks the equilibrium bond length where attractive and repulsive effects balance", "The minimum is an unstable maximum-energy separation"], c:[2] });
chemPatch("apchem-u3-001", { o:["It does not account for the observation because boiling requires breaking the O—H covalent bonds", "It predicts H2S should boil higher solely because its molar mass is larger", "It accounts for the observation well because stronger intermolecular attractions require more energy to separate H2O molecules", "It predicts identical boiling points because both substances are molecular"], c:[2] });
chemPatch("apchem-u3-012", { o:["The model underpredicts pressure because ideal particles are assigned stronger attractions than real particles", "The model overpredicts pressure because intermolecular attractions in the real gas reduce momentum transfer to the walls", "The model is exact because molecular volume and attractions disappear at high pressure", "The data prove gas particles stop moving between wall collisions"], c:[1] });
chemPatch("apchem-u4-008", { o:["Boiling converts oxygen atoms into hydrogen atoms as the molecules separate", "Boiling breaks the O—H covalent bonds as the molecules enter the vapor", "Boiling greatly reduces molecular kinetic energy as the sample becomes a gas", "Boiling primarily overcomes intermolecular attractions between water molecules rather than breaking O—H covalent bonds"], c:[3] });
chemPatch("apchem-u8-021", { o:["It fails because H+ cannot interact with OH− in aqueous solution", "It predicts lower solubility because removing a product must shift dissolution toward the solid", "It accounts for the increase well because removing OH− lowers the dissolution reaction quotient and favors further dissolution of the solid", "It predicts unchanged solubility because pH cannot affect an ionic equilibrium"], c:[2] });


// CLEAN-ROOM 4.B EXACTNESS REPAIR — 2026-08-12
// 4.B is reserved for evaluating whether a model/representation is consistent
// with chemical theory or evidence. Merely using/reading a representation is 4.A.
const CHEM_P4B_EXACTNESS_OVERRIDES = {
  "apchem-u1-016":"4.A",
  "apchem-u2-010":"4.A",
  "apchem-u3-014":"4.A",
  "apchem-u5-011":"4.A",
  "apchem-u5-019":"4.A",
  "apchem-u6-003":"4.A",
  "apchem-u7-016":"4.A"
};
Object.entries(CHEM_P4B_EXACTNESS_OVERRIDES).forEach(([id,skill])=>chemPatch(id,{skill}));
