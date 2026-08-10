// AP Chemistry — focused correction for curated questions whose rewritten
// options were authored before the deterministic raw-key rebalance. This file
// is intentionally explicit so the content audit can verify the semantic key,
// rather than trusting option position.

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

// Restore deterministic 46/46/45/45 raw-key balance after semantic correction.
CHEM_QUESTIONS.forEach((item, index) => {
  const target = index % 4;
  const current = item.c[0];
  if (current === target) return;
  const correctText = item.o[current];
  item.o.splice(current, 1);
  item.o.splice(target, 0, correctText);
  item.c = [target];
});
