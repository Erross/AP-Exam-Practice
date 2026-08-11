// WIP source-fidelity corrections for AP English Language public-domain excerpts.
// Fold these exact typography fixes into data/ap-english-language.js before release.
(function () {
  "use strict";
  const bank = window.QUESTIONS_AP_ENGLISH_LANGUAGE;
  if (!Array.isArray(bank)) throw new Error("AP Language public-domain replacements must load first");

  function stimulus(setId) {
    const question = bank.find((q) => q.stimulusGroupId === `aplang-g-${setId}`);
    if (!question) throw new Error(`Missing AP Language set ${setId}`);
    return question.stimulus;
  }

  const douglass = stimulus("r-repair");
  douglass.text = douglass.text.replace("the white man's power", "the white man’s power");

  const dubois = stimulus("r-replicas");
  dubois.text = dubois.text.replace("the boys' and girls' heads", "the boys’ and girls’ heads");

  const addams = stimulus("r-observers");
  addams.text = addams.text
    .replace("because “the old man clogs our earliest years,”", "because \"the old man clogs our earliest years,\"")
    .replace("was “all there,”", "was \"all there,\"")
    .replace("against “a warder of the world”", "against \"a warder of the world\"")
    .replace("“Do you always have to sizzle the iron in water?”", "\"Do you always have to sizzle the iron in water?\"")
    .replace("“Sure!”", "\"Sure!\"")
    .replace("“that makes the iron hard.”", "\"that makes the iron hard.\"")
    .replace("burden of “the winds that come from the fields of sleep”", "burden of \"the winds that come from the fields of sleep\"");
})();