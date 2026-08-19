// AP European History — final independent/naive-review repairs.
// This layer is intentionally narrow: it replaces residual giveaway distractors
// with plausible same-domain competitors while preserving every existing key.
(() => {
  "use strict";
  const bank = window.QUESTIONS_AP_EUROPEAN_HISTORY;
  if (!Array.isArray(bank)) throw new Error("AP Euro bank must load before final review fixes");

  function replace(id, distractors) {
    const q = bank.find((item) => item.id === id);
    if (!q) throw new Error(`Missing AP Euro final-review target ${id}`);
    if (!Array.isArray(distractors) || distractors.length !== 3) throw new Error(`${id}: expected three distractors`);
    const correct = q.o[q.c[0]];
    const options = distractors.slice();
    options.splice(q.c[0], 0, correct);
    q.o = options;
  }

  replace("apeuro-1-11-02", [
    "A royal customs register recording duties on imported goods but not the experiences or observations of long-distance travelers",
    "A port-city tax assessment showing commercial wealth without identifying the routes, encounters, or knowledge carried by travelers",
    "A merchant guild charter regulating local trade while offering little evidence about travel beyond the guild's home city",
  ]);

  replace("apeuro-4-7-02", [
    "A diplomatic dispatch describing court politics in one capital without tracing how travelers circulated observations across Europe",
    "A university enrollment register showing participation in formal education but not the exchange of knowledge through travel",
    "A bookseller's inventory showing available titles while revealing less about what travelers learned through direct observation abroad",
  ]);

  replace("apeuro-6-4-03", [
    "Municipal tax rolls that identify property values but give limited evidence about crowding, sanitation, or mortality",
    "Factory payrolls that reveal wages and employment while saying little about neighborhood housing and public-health conditions",
    "Railway freight records that measure commercial traffic but do not directly show household density or urban disease patterns",
  ]);

  replace("apeuro-6-8-02", [
    "Mercantilism, which emphasized state-directed trade and national wealth rather than nineteenth-century responses to industrial social inequality",
    "Physiocracy, which located national wealth primarily in agriculture rather than in programs for reforming industrial society",
    "Classical laissez-faire liberalism, which generally trusted market exchange more than the reform movement identified in the source",
  ]);

  replace("apeuro-6-8-03", [
    "Factory owners' petitions opposing regulation, useful for reconstructing resistance to reform but not by themselves its effects on workers",
    "Parliamentary election returns showing political competition without directly measuring workplace conditions after reform legislation",
    "National trade statistics showing industrial output while providing limited evidence about hours, safety, housing, or public health",
  ]);

  replace("apeuro-7-7-03", [
    "Private railway-company reports that emphasize profitability and expansion while potentially understating disruptive effects on local communities",
    "Newspaper accounts from metropolitan investors that illuminate enthusiasm for railways but may underrepresent colonial or rural perspectives",
    "Passenger and freight statistics that measure use of railways without by themselves revealing how administrators interpreted their political effects",
  ]);

  replace("apeuro-7-9-02", [
    "Regional election returns showing political loyalties but not necessarily the language, symbols, or historical claims used to mobilize nationalism",
    "Army conscription records revealing state reach while offering limited evidence about how ordinary people understood national identity",
    "Commercial census data measuring economic activity without directly showing the cultural narratives used by nationalist movements",
  ]);

  replace("apeuro-8-9-03", [
    "Wartime ration records showing civilian hardship but not specifically documenting the targeting or persecution of designated groups",
    "Military production statistics revealing mobilization without identifying policies of exclusion, deportation, or mass killing",
    "Diplomatic correspondence on neutral trade showing international relations while providing limited direct evidence about persecuted populations",
  ]);

  replace("apeuro-9-5-03", [
    "Statements by nationalist leaders that reveal political goals but require corroboration because belligerents had incentives to frame events selectively",
    "International diplomatic cables that record outside reactions but may not capture local patterns of displacement and violence on their own",
    "Military unit reports that document operations from an institutional perspective but require comparison with civilian and demographic evidence",
  ]);

  replace("apeuro-9-10-03", [
    "Postwar opinion surveys on European identity that illuminate political attitudes but do not directly measure changes in market exchange",
    "Records of diplomatic summit attendance that demonstrate interstate cooperation without showing whether trade or investment increased",
    "Defense-spending data from member states that measure security priorities rather than the economic effects of market integration",
  ]);
})();
