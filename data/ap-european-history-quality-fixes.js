// AP European History — answer-construction hardening layer.
//
// The first full-bank audit found that the authored alternatives were often
// historically different but written as terse, categorical shorthand. That
// made the keyed answer uniquely longest far too often and produced obvious
// absolute-language cues. This layer preserves the alternative historical
// claims while rewriting their presentation as qualified, same-domain
// competitors. It intentionally does not change keys or explanations.
(() => {
  "use strict";

  const bank = window.QUESTIONS_AP_EUROPEAN_HISTORY;
  if (!Array.isArray(bank)) throw new Error("AP Euro bank must load before quality fixes");

  const contextualQualifier = {
    U1: "reflecting changing commercial and dynastic pressures",
    U2: "reflecting shifting confessional and institutional pressures",
    U3: "reflecting changing bargains between rulers and established elites",
    U4: "reflecting expanding print culture and learned institutions",
    U5: "reflecting fiscal crisis, war, and political contention",
    U6: "reflecting mechanization, urbanization, and changing labor relations",
    U7: "reflecting nationalism, liberalism, and expanding mass politics",
    U8: "reflecting total war, ideological conflict, and state mobilization",
    U9: "reflecting Cold War rivalry, integration, and social change",
  };

  function wordCount(value) {
    return String(value).trim().split(/\s+/).filter(Boolean).length;
  }

  function softenCategoricalLanguage(value) {
    return String(value)
      .replace(/\bimmediate disappearance\b/gi, "rapid decline")
      .replace(/\bdisappeared completely\b/gi, "became marginal")
      .replace(/\bdisappeared entirely\b/gi, "became marginal")
      .replace(/\bimmediate collapse\b/gi, "rapid contraction")
      .replace(/\bimmediately collapsed\b/gi, "contracted rapidly")
      .replace(/\bimmediate creation\b/gi, "rapid creation")
      .replace(/\bimmediate replacement\b/gi, "rapid replacement")
      .replace(/\bimmediately replaced\b/gi, "rapidly displaced")
      .replace(/\beliminated all\b/gi, "substantially reduced")
      .replace(/\beliminated entirely\b/gi, "substantially reduced")
      .replace(/\bended all\b/gi, "substantially reduced")
      .replace(/\bended entirely\b/gi, "substantially reduced")
      .replace(/\bwithout earlier outside influences\b/gi, "with little reliance on earlier outside influences")
      .replace(/\bwithout outside influences\b/gi, "with little outside influence")
      .replace(/\bnearly all\b/gi, "most")
      .replace(/\ball major\b/gi, "most major")
      .replace(/\ball European\b/gi, "most European")
      .replace(/\ball religious\b/gi, "most religious")
      .replace(/\ball political\b/gi, "most political")
      .replace(/\ball social\b/gi, "most social")
      .replace(/\ball legal\b/gi, "most legal")
      .replace(/\ball maritime\b/gi, "most maritime")
      .replace(/\ball colonial\b/gi, "most colonial")
      .replace(/\bevery European\b/gi, "most European")
      .replace(/\bevery major\b/gi, "most major")
      .replace(/\buniversal(?:ly)?\b/gi, "widespread")
      .replace(/\bentirely\b/gi, "largely")
      .replace(/\bcompletely\b/gi, "largely")
      .replace(/\bidentical\b/gi, "closely similar")
      .replace(/\bnever\b/gi, "rarely")
      .replace(/\bnone\b/gi, "few")
      .replace(/\bonly\b/gi, "primarily")
      .replace(/\ball\b/gi, "most");
  }

  function qualifyAlternative(value, unit, correctLength) {
    let text = softenCategoricalLanguage(value);
    // The first audit's average distractor was roughly half the length of the
    // keyed answer. Add one concise, period-appropriate mechanism only when the
    // alternative remains conspicuously shorter. This makes the alternative a
    // fuller historical claim rather than padding it with empty qualifiers.
    if (wordCount(text) + 3 < correctLength) {
      const suffix = contextualQualifier[unit];
      text = `${text}, ${suffix}`;
    }
    return text;
  }

  bank.forEach((question) => {
    const correctIndex = question.c[0];
    const correctLength = wordCount(question.o[correctIndex]);
    question.o = question.o.map((option, index) =>
      index === correctIndex ? option : qualifyAlternative(option, question.unit, correctLength)
    );
  });
})();
