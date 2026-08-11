// WIP corrections for AP English Language public-domain excerpts.
// Fold these exact source and option fixes into data/ap-english-language.js before release.
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

  const shadeThree = bank.find((q) => q.id === "aplang-r-shade-03");
  shadeThree.o = shadeThree.o.map((option) => {
    if (option === "certain that nature alone accounts for every inequality she observes") return "inclined to attribute the inequalities she observes primarily to nature";
    if (option === "interested only in the private conduct of individual women") return "focused mainly on the private conduct of individual women";
    return option;
  });

  const shadeFive = bank.find((q) => q.id === "aplang-r-shade-05");
  shadeFive.o = shadeFive.o.map((option) => {
    if (option === "Civilization can progress only after physical differences disappear.") return "Civilization can progress chiefly after physical differences diminish.";
    if (option === "Parents are more responsible than authors for every social inequality.") return "Parents are more responsible than authors for most social inequalities.";
    return option;
  });

  const replicasSix = bank.find((q) => q.id === "aplang-r-replicas-06");
  replicasSix.o = replicasSix.o.map((option) => {
    if (option === "claims that every Black child responds to racism in the same way") return "claims that Black children respond to racism in a uniform way";
    if (option === "argues that his own competitive response was morally superior in every respect") return "argues that his competitive response was morally superior to the others";
    return option;
  });

  const conciseCorrect = {
    "aplang-r-shade-01": "argue that poor education produces women's social weakness",
    "aplang-r-shade-02": "reasoning grounded in broad social observation",
    "aplang-r-shade-03": "disturbed by a social order she cannot readily explain",
    "aplang-r-shade-04": "Education trains women to seek admiration rather than respect.",
    "aplang-r-shade-05": "False education sacrifices women's rational development to attractiveness.",
    "aplang-r-shade-06": "limits the claim to prevent misconstruing her broader argument",
    "aplang-r-shade-07": "making ornamental development seem attractive yet stunting",
    "aplang-r-shade-09": "cause-and-effect reasoning about what women are taught to seek",
    "aplang-r-shade-10": "flattering on the surface but ultimately harmful",
    "aplang-r-shade-11": "desire versus respect for a thinking companion",

    "aplang-r-repair-01": "show how the prohibition revealed literacy's liberating power",
    "aplang-r-repair-02": "education as a source of intellectual agency",
    "aplang-r-repair-03": "Auld unintentionally teaches Douglass why reading matters",
    "aplang-r-repair-04": "Auld says reading would make an enslaved person unmanageable.",
    "aplang-r-repair-05": "An oppressor's fear can reveal education's liberating power.",
    "aplang-r-repair-06": "recasts opposition as unintended instruction",
    "aplang-r-repair-07": "turning Auld's values into evidence for Douglass's goal",
    "aplang-r-repair-08": "a prohibition, its interpretation, and resulting determination",
    "aplang-r-repair-09": "opposing testimony that supports Douglass's inference",
    "aplang-r-repair-10": "sudden understanding of ignorance's role in slavery",
    "aplang-r-repair-11": "sharpens the opposing interests of master and learner",
    "aplang-r-repair-12": "introduces the idea that resolves the preceding difficulty",

    "aplang-r-maps-01": "argue for limited government judged by its practical effects",
    "aplang-r-maps-02": "may reject abstraction but consider practical reform",
    "aplang-r-maps-03": "an example of government acting beyond popular consent",
    "aplang-r-maps-04": "He credits American character and says government sometimes obstructed it.",
    "aplang-r-maps-05": "Government is useful when it does not obstruct individual capacity.",
    "aplang-r-maps-06": "qualifies a radical principle with a practical demand",
    "aplang-r-maps-07": "an instrument that looks powerful but fails under strain",
    "aplang-r-maps-08": "a principle, examples of failure, and a practical reformulation",
    "aplang-r-maps-09": "an analogy for resilience against legislative obstacles",
    "aplang-r-maps-10": "a practical means rather than an end in itself",
    "aplang-r-maps-11": "build an emphatic case against governmental achievement",
    "aplang-r-maps-12": "sets a definition beside a limitation on actual governments",

    "aplang-r-replicas-02": "social discomfort surrounding direct discussion of race",
    "aplang-r-replicas-03": "grounding an abstract claim in personal experience",
    "aplang-r-replicas-04": "He says the desired words and opportunities belonged to others.",
    "aplang-r-replicas-05": "Racial division can force self-understanding through others' judgments.",
    "aplang-r-replicas-06": "shows that a shared barrier produces varied reactions",
    "aplang-r-replicas-07": "a barrier that separates worlds and alters perception",
    "aplang-r-replicas-08": "a social question, personal memory, and a broader theory",
    "aplang-r-replicas-09": "an example giving concrete form to the veil",
    "aplang-r-replicas-10": "circling a subject they hesitate to state directly",
    "aplang-r-replicas-11": "competitive effort to counter exclusion through achievement",
    "aplang-r-replicas-12": "examples of darker responses to the same condition",

    "aplang-r-observers-01": "trace early social responsibility through childhood memories",
    "aplang-r-observers-02": "reflection that recognizes earnest motives and childish exaggeration",
    "aplang-r-observers-03": "showing when an admired city became morally complicated",
    "aplang-r-observers-04": "She plans to place her future house among poor homes.",
    "aplang-r-observers-05": "Childhood inequality can generate an enduring sense of responsibility.",
    "aplang-r-observers-06": "explains how imagination supplied the dream's dramatic form",
    "aplang-r-observers-07": "turning responsibility into a concrete impossible task",
    "aplang-r-observers-08": "poverty, a declaration of responsibility, and a symbolic dream",
    "aplang-r-observers-09": "an extension of the dream into practical preparation",
    "aplang-r-observers-10": "the urban squalor and crowding that shocked Addams",
    "aplang-r-observers-11": "the child's belief that responsibility rests on her",
    "aplang-r-observers-12": "balance two conflicting qualities of the private burden",
  };

  for (const [id, replacement] of Object.entries(conciseCorrect)) {
    const question = bank.find((q) => q.id === id);
    if (!question) throw new Error(`Missing AP Language question ${id}`);
    question.o[question.c[0]] = replacement;
  }
})();