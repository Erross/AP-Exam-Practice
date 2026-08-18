// AP African American Studies — clean-room residual answer-length repair.
// Concisely restates selected keyed historical claims that remained uniquely
// longest after the semantic review. This changes no answer meaning or key.
(() => {
  "use strict";
  const bank = window.QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES;
  if (!Array.isArray(bank) || bank.length === 0) return;

  const conciseKeys = {
    "apaas-1-1-3": "Combine historical, cultural, and social-science evidence to explain changes in Black identities and institutions.",
    "apaas-2-3-3": "The trade intensified conflict and displacement in some regions, with effects varying across places and periods.",
    "apaas-2-6-3": "Enslaved people generated wealth under coercion while also sustaining skills, relationships, and cultural practices.",
    "apaas-2-8-3": "A law tying a child's legal status to maternal status and assigning rights by ancestry.",
    "apaas-2-13-3": "Records of escape, work slowdowns, covert communication, family preservation, and everyday refusal alongside revolt.",
    "apaas-2-23-3": "Black flight to Union lines, military service, labor, and community action pushed the war toward emancipation.",
    "apaas-3-3-3": "Labor contracts, Black Codes, and land petitions showing legal freedom alongside contested mobility, bargaining power, and land access.",
    "apaas-4-2-3": "U.S. racial inequality and anticolonial struggles were linked through debates over self-determination, citizenship, and global power.",
    "apaas-4-6-3": "The civil rights movement combined nonviolent protest with litigation, electoral organizing, labor activism, self-defense, and community institution building.",
    "apaas-4-7-3": "Black women's civil-rights leadership often depended on grassroots organizing, strategy, communication, fundraising, and voter work beyond formal titles.",
    "apaas-4-9-3": "Mid-1960s Black politics increasingly debated self-determination, community control, voting power, self-defense, and the limits of integration.",
    "apaas-4-15-3": "Black public leadership expanded across major institutions while debates continued over representation, opportunity, structural inequality, and racial progress.",
  };

  for (const [id, replacement] of Object.entries(conciseKeys)) {
    const q = bank.find((item) => item.id === id);
    if (!q) throw new Error(`${id}: answer-length repair could not find question`);
    const key = q.c[0];
    const options = q.o.slice();
    options[key] = replacement;
    q.o = options;
  }
})();
