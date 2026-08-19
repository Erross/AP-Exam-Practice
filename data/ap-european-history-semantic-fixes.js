// AP European History — targeted semantic/difficulty repairs from independent review.
(() => {
  "use strict";
  const bank = window.QUESTIONS_AP_EUROPEAN_HISTORY;
  if (!Array.isArray(bank)) throw new Error("AP Euro bank must load before semantic fixes");

  function replaceDistractors(id, distractors) {
    const q = bank.find((item) => item.id === id);
    if (!q) throw new Error(`Missing AP Euro repair target ${id}`);
    if (!Array.isArray(distractors) || distractors.length !== 3) throw new Error(`${id}: expected three distractors`);
    const correct = q.o[q.c[0]];
    const options = distractors.slice();
    options.splice(q.c[0], 0, correct);
    q.o = options;
  }

  replaceDistractors("apeuro-3-6-02", [
    "The War of the Austrian Succession, which also reflected dynastic and balance-of-power calculations but not the Bourbon succession to Spain",
    "The Seven Years' War, which widened great-power rivalry into a global conflict several decades after the Spanish succession crisis",
    "The Great Northern War, which shifted power around the Baltic rather than resolving the feared union of the French and Spanish crowns",
  ]);

  replaceDistractors("apeuro-5-8-02", [
    "Neoclassical confidence that political and artistic order could be modeled on rational principles",
    "Enlightened-absolutist efforts to make administration more systematic while preserving monarchical authority",
    "The growing prestige of scientific explanation and utilitarian reform among eighteenth-century elites",
  ]);

  replaceDistractors("apeuro-6-2-03", [
    "Court expenditure records showing changing aristocratic demand for luxury goods but little about industrial labor or infrastructure",
    "Diplomatic correspondence on dynastic marriages that reveals state relations more directly than regional industrial capacity",
    "Parish records of church construction styles that illuminate local culture more directly than capital, transport, or labor mobility",
  ]);

  replaceDistractors("apeuro-6-7-02", [
    "Whether constitutional liberty could coexist with large inequalities in ownership and bargaining power",
    "Whether private property encouraged individual independence or entrenched unequal control over productive resources",
    "Whether market exchange alone could protect workers from insecurity during rapid industrial change",
  ]);

  replaceDistractors("apeuro-7-6-03", [
    "Improved cartography and surveying, which aided imperial administration but did not by themselves create the decisive military-logistical advantage",
    "Earlier oceanic sailing techniques, which supported overseas contact but lacked the speed and inland reach of industrial transport systems",
    "Mechanized textile production, which increased manufacturing capacity without directly supplying the same combination of transport, firepower, communications, and disease control",
  ]);

  replaceDistractors("apeuro-9-7-03", [
    "The construction of the Berlin Wall in 1961, which demonstrated coercive bloc control but was carried out by East German authorities rather than a Warsaw Pact invasion",
    "The imposition of martial law in Poland in 1981, which suppressed Solidarity under Soviet pressure without direct Soviet military intervention",
    "The Brezhnev Doctrine announced after 1968, which justified intervention but was a policy statement rather than an earlier use of force",
  ]);
})();
