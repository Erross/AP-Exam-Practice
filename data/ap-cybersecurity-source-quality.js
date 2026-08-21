// AP Cybersecurity — final clean-room curation for source-set distractors.
//
// These exact questions were independently flagged because multiple distractors
// advertised their wrongness through absolute wording. Preserve the reviewed key
// and evidence while replacing those distractors with plausible same-domain
// misconceptions that a prepared student must distinguish substantively.
(function () {
  "use strict";
  const bank = window.QUESTIONS_AP_CYBERSECURITY;
  if (!Array.isArray(bank)) throw new Error("AP Cybersecurity bank must load before source-set quality curation");

  const replacements = {
    "apcyber-set-u1-logins-2":[
      "Prioritize unusual cross-account login patterns for analyst review while providing the events that contributed to the alert",
      "Assign a compromise score from the failed-login count and automatically disable accounts above that score without checking source, timing, or successful activity",
      "Use the model to replace preventive authentication controls once it demonstrates that it can identify suspicious login clusters in historical events",
      "Suppress routine failed-login events after the model summarizes them, leaving analysts only the model's classification rather than the underlying evidence"
    ],
    "apcyber-set-u3-firewall-1":[
      "It is denied by rule 2 before the later HTTPS allow rule is reached.",
      "It is allowed by rule 3 because a broader allow rule is treated as taking precedence over an earlier, more specific deny match.",
      "It is allowed by rule 1 because the source address matches before the firewall evaluates whether the rule's TCP destination port also matches.",
      "It is denied by rule 5 because first-match processing is interpreted as collecting earlier matches and applying the final matching action."
    ],
    "apcyber-set-u3-detect-2":[
      "The anomaly detector catches the novel attack but generates substantially more benign alerts than the signature detector.",
      "The signature detector offers the stronger novel-attack coverage because its lower benign-alert count indicates that its known signatures generalize to unseen behavior.",
      "The hybrid detector's higher true-attack count shows that combining methods also produces the lowest benign-alert burden in this table.",
      "The anomaly detector's novel-attack result is enough to conclude that its future false-negative rate will be lower than the hybrid detector's across other traffic."
    ],
    "apcyber-set-u3-detect-3":[
      "False negatives may allow novel malicious activity to proceed because no known signature matches it.",
      "The main residual risk is additional false positives from signatures matching benign traffic, because unseen attacks are expected to resemble established signatures closely enough for detection.",
      "The missed-attack risk is limited to availability events, because signature matching still identifies novel behavior that threatens confidentiality or integrity.",
      "The relevant risk is delayed alert review rather than missed detection, because a signature engine can still flag unseen behavior after analysts classify it manually."
    ],
    "apcyber-set-u3-segment-3":[
      "It can observe attempted traffic toward a high-value zone and generate evidence or alerts when access patterns violate expectations.",
      "It can serve as the primary preventive boundary for the finance VLAN because a monitoring sensor normally blocks traffic that it classifies as suspicious.",
      "It makes inter-zone firewall policy less important because detection at the finance boundary provides equivalent protection after suspicious traffic reaches the sensor.",
      "It can eliminate benign alerts from authorized finance traffic because placement near a high-value zone provides enough context to distinguish intent without tuning."
    ],
    "apcyber-set-u4-auth-2":[
      "Correlate the source with process, network, and account-activity logs around the successful login to see what occurred afterward.",
      "Focus on the successful event and discard the preceding failures so the investigation is not biased by attempts that did not authenticate.",
      "Contain every endpoint associated with the subnet immediately, using the authentication sequence itself as sufficient evidence that each device is compromised.",
      "Reduce authentication-log retention after extracting the source address, because later process and network evidence is unlikely to change the initial credential-attack assessment."
    ]
  };

  for (const [id, options] of Object.entries(replacements)) {
    const question = bank.find((candidate) => candidate.id === id);
    if (!question) throw new Error(`${id}: source-set repair target not found`);
    if (question.c.length !== 1) throw new Error(`${id}: expected one reviewed source-set key`);
    const correctIndex = question.c[0];
    if (question.o[correctIndex] !== options[0]) throw new Error(`${id}: reviewed source-set key text changed before final curation`);
    let nextDistractor = 1;
    question.o = question.o.map((option, index) => index === correctIndex ? option : options[nextDistractor++]);
  }
})();
