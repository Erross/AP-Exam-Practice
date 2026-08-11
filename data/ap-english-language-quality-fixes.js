// AP English Language — post-release quality hardening from the 2026-08 audit.
// The authentic public-domain passages are untouched. This layer strengthens
// distractors so wrong answers represent plausible rhetorical misreadings rather
// than irrelevant, absolute, or self-evidently impossible alternatives.

(function () {
  "use strict";

  const bank = window.QUESTIONS_AP_ENGLISH_LANGUAGE;
  const byId = new Map(bank.map((item) => [item.id, item]));
  const patch = (id, attrs) => {
    const item = byId.get(id);
    if (!item) throw new Error(`${id}: AP Language quality-fix target missing`);
    Object.assign(item, attrs);
  };

  patch("aplang-r-shade-08", {
    o: [
      "a historical survey, a concession to tradition, and a recommendation for gradual educational reform",
      "an abstract definition, a counterargument, a rebuttal, and a brief personal illustration",
      "a sequence of social examples that accumulate without an explicit claim about their underlying cause",
      "observation of a social problem, diagnosis, illustrative analogy, and identification of a contributing cause"
    ],
    c: [3],
    e: "Wollstonecraft first surveys history and current society, identifies neglected education as a source of misery, illustrates distorted development through the flower analogy, and then attributes that development to a false system of education. The other choices describe recognizable argumentative patterns, but not the sequence actually used here."
  });

  patch("aplang-r-shade-12", {
    o: [
      "qualifies the claim about unhealthy minds by introducing an important exception to the pattern she has described",
      "extends the preceding claim through an analogy that explains how attractive development can sacrifice strength and usefulness",
      "marks a turn from diagnosing women's education to proposing a specific institutional remedy for it",
      "sets the flower image against the preceding claim in order to question whether appearances reveal mental condition"
    ],
    c: [1],
    e: "The flower clause does not retreat from or oppose the preceding judgment; it explains it analogically. Rich soil can produce showy growth at the expense of strength, just as education directed toward display can produce attractive accomplishments while weakening useful intellectual development."
  });

  patch("aplang-r-repair-08", {
    o: [
      "a sequence of separate literacy lessons arranged to show Douglass's gradual mastery of reading",
      "a contrast between Sophia Auld's changing conduct and Hugh Auld's views, ending before Douglass draws a conclusion",
      "a prohibition on instruction, Douglass's interpretation of the reason for it, and the determination that follows from that interpretation",
      "a debate over slavery in which Douglass presents Hugh Auld's position and then answers each point directly"
    ],
    c: [2],
    e: "The passage turns on one prohibition and Douglass's response to it. Auld stops the lessons and explains why literacy is dangerous; Douglass privately interprets that explanation as revealing the path from slavery to freedom, and that inference hardens his resolve to learn."
  });

  patch("aplang-r-maps-11", {
    o: [
      "concede several limits of government before restoring the larger claim that government deserves credit for national development",
      "use parallel negative clauses to strip government of credit and prepare the contrasting claim that the people's character accomplished these ends",
      "shift from an abstract political principle to a neutral list of state functions that Thoreau regards as equally necessary",
      "slow the argument with a series of qualifications that make the criticism of government deliberately tentative"
    ],
    c: [1],
    e: "The repeated 'It does not...' clauses accumulate denials in a parallel structure. Their force is argumentative rather than neutral: they remove government from a series of achievements so that Thoreau can credit the character and actions of the American people instead."
  });

  patch("aplang-r-replicas-09", {
    o: [
      "a concrete origin scene that allows the reader to experience the social separation later generalized through the metaphor of the veil",
      "a qualification showing that childhood exclusion was exceptional and therefore cannot support Du Bois's later generalization",
      "a representative statistical case offered to establish how frequently racial exclusion occurred in American schools",
      "a chronological transition whose chief purpose is to date the moment when Du Bois first entered formal education"
    ],
    c: [0],
    e: "The schoolhouse refusal is a sharply particular moment of exclusion. Du Bois uses the remembered scene not as a statistical sample but as an experiential starting point: the personal recognition of difference becomes intelligible as the broader social metaphor of the veil."
  });

  patch("aplang-r-observers-09", {
    o: [
      "evidence of an early vocational interest in metalworking that later competes with Addams's interest in social reform",
      "a practical waking response to the dream, as Addams studies wheel-making in an effort to prepare for the burden the nightmare assigns her",
      "a contrast between the blacksmith's competence and her father's inability to explain the recurring dream",
      "an example showing that the frightening dream loses its influence as soon as Addams observes ordinary adult work"
    ],
    c: [1],
    e: "The blacksmith episode grows directly out of the recurring nightmare: because the dream leaves her responsible for producing a wheel, she observes the craft as though practical knowledge might prepare her for the impossible duty. The episode therefore extends, rather than interrupts, the dream's psychological pressure."
  });

  patch("aplang-r-observers-12", {
    o: [
      "mark a causal relationship in which the burden becomes heavy specifically because Addams refuses to communicate it",
      "balance two opposing features of the same burden: it feels too mysterious to explain yet too heavy to carry without companionship",
      "signal that the second clause corrects an exaggeration in the first by showing that the experience was actually easy to discuss",
      "separate the description of the dream from a later historical fact that has no logical relation to the private burden"
    ],
    c: [1],
    e: "The syntax holds two conflicting pressures together. Addams experiences the burden as too mysterious for communication while simultaneously experiencing it as too heavy for solitude; the balanced construction sharpens that contradiction rather than resolving it."
  });

  patch("aplang-w-start-02", {
    o: [
      "a comparison of child-care conflicts under the current schedule and the pilot, gathered from participating families before and during the trial",
      "a summary of national adolescent sleep research that repeats the draft's existing academic rationale without addressing family logistics",
      "a statement that families can adjust eventually, supported by examples from districts whose demographic conditions differ substantially",
      "a projection of transportation savings that treats reduced bus costs as evidence that after-school child care will also become easier"
    ],
    c: [0],
    e: "The objection is specifically about after-school child care, so the strongest addition measures that consequence directly and comparatively during the pilot. More sleep evidence or unrelated cost information may support the proposal generally, but neither answers the audience's logistical concern."
  });

  patch("aplang-w-start-06", {
    o: [
      "In a similar way,",
      "Even with these concerns,",
      "For example, during the pilot,",
      "As a result of this evidence,"
    ],
    c: [1],
    e: "Sentence 10 turns from the logistical costs and concerns just acknowledged toward the writer's continuing case for a limited pilot. A concessive transition such as 'Even with these concerns' marks that relationship; similarity, example, and simple cause-and-effect do not."
  });

  patch("aplang-w-native-03", {
    o: [
      "a protocol identifying observations and measurements classes could collect in the garden during specific science activities",
      "a districtwide inventory showing how many ornamental plant species currently grow on school property",
      "a photograph of another school's mature garden accompanied by a description of its visual appearance",
      "a maintenance estimate comparing the proposed garden with conventional landscaping but giving no information about classroom use"
    ],
    c: [0],
    e: "Sentence 5 claims instructional value. A concrete classroom protocol directly demonstrates how students would use the site to gather evidence or practice scientific observation; the other choices may support landscaping or feasibility claims but do not establish the teaching function."
  });

  patch("aplang-ws-news-02", {
    o: [
      "a process allowing people named in archived issues to request factual corrections or review of unusually sensitive personal material",
      "a statement that archival completeness should normally outweigh objections from people mentioned in earlier issues",
      "a description of the scanning and file-naming workflow intended to reassure readers that digitization will be technically consistent",
      "a plan to feature selected alumni articles prominently, based on current students' judgments about which pieces remain most significant"
    ],
    c: [0],
    e: "Former students may be directly affected by renewed access to old material about them. A transparent correction or privacy-review process anticipates that stake while preserving the archive; technical workflow and editorial promotion address different concerns."
  });

  // Remove stacked absolute-language tells from the remaining audited items while
  // retaining at most one such distractor when it represents a genuine misconception.
  const absoluteIds = [
    "aplang-r-shade-06", "aplang-r-repair-10", "aplang-w-native-08",
    "aplang-ws-news-01", "aplang-ws-news-03",
  ];
  const absolute = /\b(always|never|every|only|entirely|unlimited|none|all|impossible|guarantee[sd]?|completely|identical)\b/i;
  const soften = (text) => text
    .replace(/\balways\b/gi, "generally")
    .replace(/\bnever\b/gi, "rarely")
    .replace(/\bevery\b/gi, "most")
    .replace(/\bonly\b/gi, "mainly")
    .replace(/\ball\b/gi, "the relevant")
    .replace(/\bcompletely\b/gi, "substantially")
    .replace(/\bimpossible\b/gi, "unlikely")
    .replace(/\bguarantees\b/gi, "strongly suggests")
    .replace(/\bguarantee\b/gi, "strongly suggest");
  absoluteIds.forEach((id) => {
    const q = byId.get(id);
    let kept = false;
    q.o = q.o.map((option, index) => {
      if (index === q.c[0] || !absolute.test(option)) return option;
      if (!kept) { kept = true; return option; }
      return soften(option);
    });
  });

  // Preserve a balanced raw A-D distribution; delivery shuffles independently.
  bank.forEach((item, index) => {
    const target = index % 4;
    const current = item.c[0];
    if (current === target) return;
    const correct = item.o[current];
    item.o.splice(current, 1);
    item.o.splice(target, 0, correct);
    item.c = [target];
  });
})();
