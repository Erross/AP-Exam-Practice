const fs = require("node:fs");

let data = fs.readFileSync("data/ap-physics-2.js", "utf8");
for (const [from, to] of [
  ["Frequency increases by the same amount in every trial.", "Frequency increases by a uniform 100 Hz between trials."],
  ["Wavelength is numerically equal to frequency in every row.", "Wavelength and frequency have matching numerical values."],
]) {
  if (!data.includes(from)) throw new Error(`Missing final Physics 2 wording target: ${from}`);
  data = data.replace(from, to);
}

const marker = "\nwindow.QUESTIONS_AP_PHYSICS_2 = PHYS2_QUESTIONS;";
if (!data.includes(marker)) throw new Error("Missing Physics 2 export marker in finalizer");
const rationaleBlock = String.raw`

// Ensure every symbolic-derivation rationale remains substantively explanatory.
const PHYS2_DERIVATION_RATIONALE_SUPPLEMENTS = {
  "apphys2-u9-004": "The dependence also has the expected direction: increasing T2 at fixed other variables requires a larger final volume.",
  "apphys2-u9-008": "This form shows that a larger heat-transfer rate or slab length requires a larger conductivity when area and temperature difference are fixed.",
  "apphys2-u9-011": "A positive value of W in this convention represents energy transferred out of the gas by mechanical work.",
  "apphys2-u9-015": "The expression has units J/(kg·°C), matching the definition of specific heat capacity.",
  "apphys2-u10-007": "The square root is required because electric-field magnitude varies with the inverse square of distance.",
  "apphys2-u10-010": "For a magnitude calculation, the separation is positive even when opposite-sign charges make U negative.",
  "apphys2-u10-013": "The result states that a larger source charge is required to produce the same potential at a larger distance.",
  "apphys2-u10-016": "This quotient is the defining ratio of stored charge to potential difference for a capacitor.",
  "apphys2-u11-004": "The expression also shows that current increases with applied voltage and decreases with resistance.",
  "apphys2-u11-007": "Its units reduce to ohm-meters, the SI unit of resistivity, confirming the rearrangement.",
  "apphys2-u11-010": "This form predicts greater power at larger voltage and smaller resistance when voltage is the controlled quantity.",
  "apphys2-u11-021": "The expression shows that a larger resistance requires a smaller capacitance to keep the same time constant.",
  "apphys2-u12-004": "The result predicts a larger orbit for greater momentum and a smaller orbit for stronger magnetic force per unit speed.",
  "apphys2-u12-008": "This form makes current directly proportional to force and inversely proportional to field strength and wire length.",
  "apphys2-u12-011": "The relation shows that the same induced emf corresponds to a smaller flux change when the coil has more turns.",
  "apphys2-u13-004": "The denominator do − f also captures the image-distance divergence as the object approaches the focal point.",
  "apphys2-u13-008": "For n2 greater than n1, the ratio n1/n2 is less than one, consistent with bending toward the normal.",
  "apphys2-u13-012": "The minus sign preserves the standard image-orientation convention encoded in the magnification equation.",
  "apphys2-u14-004": "The inverse relation means increasing frequency necessarily shortens the period by the same factor.",
  "apphys2-u14-016": "This expression gives integer harmonics because the fixed ends require an integer number of half-wavelengths along the string.",
  "apphys2-u14-022": "The expression shows that greater slit separation produces a smaller diffraction angle for the same order and wavelength.",
  "apphys2-u15-004": "Only positive integer values of n correspond to allowed Bohr energy levels, so the positive square root is used.",
  "apphys2-u15-012": "Photons below this frequency have energy hf less than the work function and therefore cannot eject electrons.",
  "apphys2-u15-017": "Because c² is very large, even a small mass defect corresponds to a substantial released energy.",
};
for (const question of PHYS2_QUESTIONS) {
  const supplement = PHYS2_DERIVATION_RATIONALE_SUPPLEMENTS[question.id];
  if (supplement && question.e.length < 90) question.e += " " + supplement;
}
`;
data = data.replace(marker, rationaleBlock + marker);
fs.writeFileSync("data/ap-physics-2.js", data);
fs.unlinkSync(__filename);
console.log("Finalized Physics 2 rationale and distractor wording.");
