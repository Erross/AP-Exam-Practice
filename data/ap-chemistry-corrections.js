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
// treats two or more in one item as a statistical tell. The independent audit
// found the following 15 items. Preserve one such distractor at most and soften
// additional ones without changing the keyed response.
const CHEM_ABSOLUTE_LANGUAGE_AUDIT_IDS = new Set([
  "apchem-u2-008", "apchem-u4-002", "apchem-u5-009", "apchem-u5-010", "apchem-u5-022",
  "apchem-u6-002", "apchem-u7-004", "apchem-u7-015", "apchem-u7-018", "apchem-u8-001",
  "apchem-u8-011", "apchem-u8-015", "apchem-u8-019", "apchem-u8-022", "apchem-u9-002",
]);
const CHEM_ABSOLUTE_WORD = /\b(every|always|never|only|entirely|unlimited|identical)\b/i;
const CHEM_SOFTEN_ABSOLUTE = (text) => text
  .replace(/\bevery\b/gi, "many")
  .replace(/\balways\b/gi, "generally")
  .replace(/\bnever\b/gi, "seldom")
  .replace(/\bonly\b/gi, "primarily")
  .replace(/\bentirely\b/gi, "largely")
  .replace(/\bunlimited\b/gi, "very large")
  .replace(/\bidentical\b/gi, "closely matched");

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
