// AP English Literature — post-release quality hardening from the 2026-08 audit.
// Source passages are unchanged. These patches strengthen interpretive distractors,
// correct one grammatical defect, and remove remaining answer-language tells.

(function () {
  "use strict";

  const bank = window.QUESTIONS_AP_ENGLISH_LITERATURE;
  const byId = new Map(bank.map((item) => [item.id, item]));
  const patch = (id, attrs) => {
    const item = byId.get(id);
    if (!item) throw new Error(`${id}: AP Literature quality-fix target missing`);
    Object.assign(item, attrs);
  };

  patch("aplit-sf-watch-05", {
    o: [
      "enact the narrator's self-censorship: she obeys John's demand to stop dwelling on her condition even as the house description continues to register unease",
      "replace the medical disagreement with sustained aesthetic pleasure, suggesting that John's treatment has already begun to restore her confidence",
      "delay the central conflict long enough to establish the house as an essentially neutral setting whose details carry little emotional significance",
      "separate the narrator's private reflections from a more objective descriptive mode that makes her account of the property more reliable than her account of illness"
    ],
    c: [0],
    e: "John has just told the narrator that thinking about her condition is harmful. Her abrupt decision to 'talk about the house' therefore enacts the pressure to redirect and police her own thoughts, while the supposedly safer subject immediately becomes saturated with locked gates, abandonment, and strangeness."
  });

  patch("aplit-sf-bell-05", {
    o: [
      "connect Désirée's uncertain origin to the marriage by making her lack of family history relevant again when Armand chooses her",
      "contrast the Valmondés' acceptance of Désirée with Armand's indifference to social status, thereby resolving the problem of her uncertain ancestry",
      "shift attention away from Désirée's identity toward Armand's family history, which the narrator presents as the more important source of conflict",
      "compress two unrelated episodes in order to emphasize the speed of the courtship rather than any continuing significance of Désirée's discovery"
    ],
    c: [0],
    e: "The narrative does not leave Désirée's discovery behind as background. By carrying the mystery of her parentage into the courtship—where her namelessness is explicitly raised—the structure makes uncertain origin part of the conditions surrounding the marriage and prepares it to matter later."
  });

  patch("aplit-sf-room-06", {
    o: [
      "alternate between the military system surrounding the execution and the physical vulnerability of the individual caught within it",
      "create uncertainty about the execution's location by shifting among incompatible descriptions of the bridge, soldiers, and prisoner",
      "elevate the soldiers from background figures into individualized characters whose private motives become more important than the condemned man's fate",
      "move progressively from subjective impressions to detached factual description, reducing the reader's emotional identification with the prisoner"
    ],
    c: [0],
    e: "The passage repeatedly changes scale. It locates the bound man, expands outward to the bridge, sentries, and military arrangement, then returns to his age, clothing, and face. That movement places a vulnerable person inside an impersonal institutional apparatus rather than merely changing scenery."
  });

  patch("aplit-sf-snow-05", {
    o: [
      "move from Montresor's abstract criteria for successful revenge to an encounter in which his concealment and manipulation begin to put those criteria into practice",
      "qualify Montresor's opening certainty by showing that the unexpected carnival meeting forces him to improvise a plan he had not previously considered",
      "shift the narrative's emphasis from revenge to Fortunato's social standing, making the insult itself less important than the carnival setting",
      "create a contrast between Montresor's private theory and his openly hostile behavior toward Fortunato, revealing that concealment is not actually part of his method"
    ],
    c: [0],
    e: "The opening paragraphs define what Montresor believes revenge must accomplish, especially punishment without personal risk and without warning the victim. The carnival encounter then shows those principles becoming behavior: friendliness masks intention, and Fortunato's pride becomes the mechanism of control."
  });

  patch("aplit-ld-orbit-04", {
    o: [
      "Nora's brief private freedom giving way to Helmer's scrutiny of her spending, habits, and conduct",
      "a playful domestic atmosphere giving way to a mutually candid financial discussion in which Nora and Helmer exercise equal authority",
      "Christmas preparation giving way to Helmer's professional concerns, with the domestic objects becoming irrelevant once he enters",
      "Nora's anxiety about money giving way to reassurance that Helmer does not monitor or judge her private choices"
    ],
    c: [0],
    e: "Before Helmer enters, Nora tips freely and secretly eats macaroons; she even listens at his door before hiding the sweets. His entrance immediately makes spending and behavior subjects of inspection and pet-name commentary. The scene therefore shifts from private action to monitored domestic interaction."
  });

  patch("aplit-sf-snow-10", {
    o: [
      "showing that Fortunato's public occupation is that of a professional entertainer whom Montresor resents",
      "visually turning a socially respected and self-assured man into a fool within the revenge plot",
      "suggesting that Montresor selected Fortunato's costume in advance as a visible part of the trap",
      "marking Fortunato as unusually sober and self-controlled despite the disorder of the carnival"
    ],
    c: [1],
    e: "The motley and bells are ordinary carnival costume, not proof of Fortunato's occupation or Montresor's control over his clothing. Within Montresor's narrative, however, the fool-like visual image sharpens the irony between Fortunato's pride in his discernment and his failure to recognize the trap."
  });

  const absoluteIds = ["aplit-sf-supper-07", "aplit-po-uphill-11"];
  const absolute = /\b(always|never|every|only|entirely|unlimited|none|all|impossible|guarantee[sd]?|completely|identical)\b/i;
  const soften = (text) => text
    .replace(/\balways\b/gi, "generally")
    .replace(/\bnever\b/gi, "rarely")
    .replace(/\bevery\b/gi, "most")
    .replace(/\bonly\b/gi, "mainly")
    .replace(/\bentirely\b/gi, "largely")
    .replace(/\bunlimited\b/gi, "very broad")
    .replace(/\bnone\b/gi, "few")
    .replace(/\ball\b/gi, "the relevant")
    .replace(/\bcompletely\b/gi, "substantially")
    .replace(/\bidentical\b/gi, "closely similar")
    .replace(/\bimpossible\b/gi, "unlikely")
    .replace(/\bguarantees\b/gi, "strongly suggests")
    .replace(/\bguaranteed\b/gi, "strongly suggested")
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
