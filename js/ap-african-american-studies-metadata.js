// AP African American Studies — draft metadata overlay.
// Development convenience only; consolidate into js/subjects.js before release.
(() => {
  "use strict";
  const subject = AP_SUBJECTS.find((s) => s.id === "ap-african-american-studies");
  if (!subject) throw new Error("AP African American Studies registry entry not found");

  // VERIFIED 2026-08-18 against current AP Central course and exam pages.
  // Section I: 60 questions / 70 minutes / 60% of exam score, normally in
  // 3–4 question sets using 1–2 shared sources. Unit bands: 20–25, 30–35,
  // 20–25, 20–25. Midpoints sum to 100%, so they are used directly as
  // Hamilton draw weights: 14/20/13/13 on a 60-question form, with the
  // published count bands also enforced explicitly by the constrained drawer.
  subject.mcqCount = 60;
  subject.mcqTimeMinutes = 70;
  subject.totalExamTimeLabel = "2h 45m";
  subject.formatVerified = true;
  subject.releaseStatus = "draft";
  subject.allowsMultiSelect = false;
  subject.calculatorAllowed = false;
  subject.tierNote = "Source-based practice for Section I only. The official exam is fully digital and also includes an exam-day project validation question, short-answer questions, a document-based question, and the course project.";
  subject.units = [
    { id:"U1", name:"Origins of the African Diaspora", examWeight:0.225, examWeightRange:[0.20,0.25] },
    { id:"U2", name:"Freedom, Enslavement, and Resistance", examWeight:0.325, examWeightRange:[0.30,0.35] },
    { id:"U3", name:"The Practice of Freedom", examWeight:0.225, examWeightRange:[0.20,0.25] },
    { id:"U4", name:"Movements and Debates", examWeight:0.225, examWeightRange:[0.20,0.25] },
  ];
  // 60 questions delivered in intact 3–4 item source groups implies 15–20 sets.
  subject.stimulusSetRange = [15,20];
  // Express the published percentage bands as 60-question count ranges. This
  // deliberately routes AP AAS through the generic constrained whole-set
  // sampler, so stimulus-set geometry and official unit bands are validated
  // together rather than relying on the simpler 200-attempt weighted path.
  subject.attributeRanges = {
    unit: {
      U1: [12,15],
      U2: [18,21],
      U3: [12,15],
      U4: [12,15],
    },
  };
  subject.constraintDrawAttempts = 20000;
})();
