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
    "The War of the Austrian Succession, which also reflected competing dynastic and balance-of-power calculations",
    "The Seven Years' War, in which shifting alliances reflected strategic rivalry among major European states",
    "The Great Northern War, which altered the balance of power around the Baltic without centering the Spanish succession",
  ]);

  replaceDistractors("apeuro-5-8-02", [
    "Neoclassical confidence that political and artistic order could be modeled on rational principles",
    "Enlightened-absolutist efforts to make administration more systematic while preserving monarchical authority",
    "The growing prestige of scientific explanation and utilitarian reform among eighteenth-century elites",
  ]);

  replaceDistractors("apeuro-6-2-03", [
    "Regional wage and population records showing whether labor was available for factory employment",
    "Banking and investment records showing whether firms could obtain capital for machinery and railways",
    "Coal-price and railway-freight records showing the cost of energy and access to wider markets",
  ]);

  replaceDistractors("apeuro-6-7-02", [
    "Whether constitutional liberty could coexist with large inequalities in ownership and bargaining power",
    "Whether private property encouraged individual independence or entrenched unequal control over productive resources",
    "Whether market exchange alone could protect workers from insecurity during rapid industrial change",
  ]);

  replaceDistractors("apeuro-7-6-03", [
    "Railways and steam navigation that lowered the logistical cost of moving troops and supplies",
    "Repeating rifles and machine guns that increased the battlefield advantage of industrial armies",
    "Telegraph networks that allowed imperial governments to coordinate distant campaigns more rapidly",
  ]);

  replaceDistractors("apeuro-9-7-03", [
    "The Soviet intervention in Hungary in 1956, which restored a communist government after a reform uprising",
    "The construction of the Berlin Wall in 1961, which used coercive state power to contain movement from East Germany",
    "The imposition of martial law in Poland in 1981, which suppressed Solidarity without a direct Warsaw Pact invasion",
  ]);
})();
