// AP Computer Science Principles — final clean-room curation for passage sets.
// Replace the independently flagged passage distractors that advertised their
// wrongness through absolute wording. Keys, CED skills, stimuli, and rationales
// remain unchanged; the alternatives now express plausible same-domain errors.
(function () {
  "use strict";
  const bank = window.QUESTIONS_AP_COMPUTER_SCIENCE_PRINCIPLES;
  if (!Array.isArray(bank)) throw new Error("AP CSP bank must load before passage quality curation");

  const replacements = {
    "apcsp-passage-mobility-4":[
      "Add verified accessibility attributes to route data and test recommendations with users who have varied mobility needs.",
      "Use walking distance as the main accessibility proxy, because shorter transfers generally require less physical effort even when route features differ.",
      "Remove the affected trips from model evaluation until the source system can provide a consistent accessibility field for each route.",
      "Keep the current route data but increase the weight assigned to frequently selected routes, using repeated rider choice as evidence of accessibility."
    ],
    "apcsp-passage-crop-2":[
      "It can give farmers rapid preliminary information that helps them decide when further diagnosis or treatment may be needed.",
      "It can substitute for laboratory confirmation when the top-ranked disease receives a high confidence score from the image model.",
      "It can standardize diagnosis by giving the model's first-ranked result priority over local agronomic evidence that was not represented in training.",
      "It can reduce disease incidence directly by identifying a likely disease from the photograph before a treatment decision is made."
    ],
    "apcsp-passage-translate-2":[
      "It brings additional linguistic and cultural perspectives into feedback that can reveal problems the original developers may not recognize.",
      "It provides a reliable correction set because bilingual contributors can be treated as equivalent expert reviewers for specialized terminology.",
      "It reduces the need for regression testing because recurring errors reported by multiple contributors provide sufficient evidence that a proposed correction is safe.",
      "It makes one community-preferred wording the default across contexts, reducing variation that could otherwise complicate automated translation."
    ],
    "apcsp-passage-translate-3":[
      "Record language choice and review request without storing a family name when names are not needed to compute aggregate rates.",
      "Store family identifiers with each request so analysts can remove duplicate users before calculating language-level rates, even though identity is not part of the stated question.",
      "Retain names separately from the analytics table but keep a permanent join key so individual records can be reconstructed if a later analysis requires them.",
      "Link translation requests with additional student records to improve future subgroup analysis, because richer data can reveal patterns beyond the current evaluation goal."
    ],
    "apcsp-passage-wearable-3":[
      "Measure performance for workers using the affected gear and revise sensing, calibration, or procedures so that safety decisions do not rely on a known uneven error pattern.",
      "Use the overall pilot accuracy as the deployment criterion, because a common device and prediction threshold provide a consistent safety standard across equipment conditions.",
      "Exclude readings collected with the affected protective gear from the performance report until enough observations are available to estimate one combined accuracy rate.",
      "Keep the model unchanged but instruct supervisors to interpret alerts more cautiously for workers wearing the affected gear, without measuring the size or direction of the error."
    ],
    "apcsp-passage-wearable-5":[
      "Deleting data after the safety purpose is satisfied reduces the amount of sensitive historical information available to be exposed or repurposed later.",
      "Short retention removes most privacy concern because a copied or exported record ceases to be sensitive after the source system reaches its deletion date.",
      "Short retention primarily improves model accuracy by keeping training data focused on recent workers and equipment rather than older observations.",
      "Retention length has limited privacy relevance once access controls are in place, because authorized users already have a legitimate reason to view stored safety readings."
    ],
    "apcsp-passage-energy-1":[
      "Customers can use timely consumption patterns and alerts to identify unexpected energy use and make informed conservation decisions.",
      "Customers can expect lower bills from receiving the dashboard because detailed feedback generally translates directly into reduced household consumption.",
      "Frequent meter readings reduce consumption by making inefficient electrical devices operate for shorter periods after the utility detects a usage increase.",
      "Comparing a home with its prior usage identifies the cause of a consumption increase well enough to recommend a specific corrective action without other evidence."
    ],
    "apcsp-passage-energy-5":[
      "Compare outcomes across relevant housing, climate, and income-access groups while checking whether the underlying data represent those groups adequately.",
      "Use the overall average conservation change as the primary fairness measure, because subgroup differences are less informative when participants received the same recommendations.",
      "Evaluate households with the largest observed reductions to determine which recommendations work best, then generalize those results to customers with lower response rates.",
      "Compare dashboard response times across customer groups, using similar technical performance as evidence that the recommendations have similar behavioral effects."
    ]
  };

  for (const [id, options] of Object.entries(replacements)) {
    const question = bank.find((candidate) => candidate.id === id);
    if (!question) throw new Error(`${id}: passage repair target not found`);
    if (question.c.length !== 1 || question.c[0] !== 0) throw new Error(`${id}: reviewed passage key changed before final curation`);
    question.o = options.slice();
  }
})();
