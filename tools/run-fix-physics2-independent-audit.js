const fs = require("node:fs");
const vm = require("node:vm");
const target = "tools/fix-physics2-independent-audit.js";
let source = fs.readFileSync(target, "utf8");
source = source.replace('let subjects = fs.readFileSync("js/subjects.js", "utf8");n\n', 'let subjects = fs.readFileSync("js/subjects.js", "utf8");\n');
fs.writeFileSync(target, source);
require("./fix-physics2-independent-audit.js");

let test = fs.readFileSync("tests/ap-physics-2.test.js", "utf8");
test = test.replace(/EXPECTED_UNIT_TOPICS/g, "EXPECTED_TOPICS");
test = test.replace(
  /const found = topicsByUnit\.get\(unit\) \|\| new Set\(\);\n\s*assert\.equal\(found\.size, expected, `\$\{unit\}: expected \$\{expected\} distinct CED topics, found \$\{found\.size\}`\);/,
  'const found = [...(topicsByUnit.get(unit) || new Set())].sort();\n    assert.equal(found.join(","), expected.join(","), `${unit}: exact CED topic set changed`);',
);
test = test.replace(
  '      assert.deepEqual(drawMembers, bankMembers, `${groupId}: stimulus group was split`);',
  '      assert.equal(drawMembers.join(","), bankMembers.join(","), `${groupId}: stimulus group was split`);',
);
test = test.replace(
  'test("every AP Physics 2 draw matches the configured unit blueprint and science-practice ranges", () => {',
  'test("every AP Physics 2 draw matches the configured unit, stimulus, and MCQ-skill ranges", () => {',
);
fs.writeFileSync("tests/ap-physics-2.test.js", test);

let data = fs.readFileSync("data/ap-physics-2.js", "utf8");
const replacements = new Map([
  ["It is 1.6 times as large.", "1.6 times as large."],
  ["The ratio P/T is the same for all three measurements.", "P/T is constant across the rows."],
  ["Pressure rises by exactly 20 kPa in every row.", "Pressure rises by 20 kPa between adjacent rows."],
  ["Temperature and pressure have identical numerical values.", "Temperature and pressure have matching numerical values."],
  ["Doubling r from 0.10 m to 0.20 m reduces F to one-fourth.", "Doubling r reduces F to one-fourth."],
  ["Increasing r by 0.10 m always reduces F by 2.70 N.", "Equal increases in r produce equal decreases in F."],
  ["The product Fr is the same in every row.", "The product Fr increases as r increases."],
  ["At fixed voltage, current is inversely proportional to resistance for these resistors.", "Current varies inversely with resistance."],
  ["The reflected angle equals the incident angle when both are measured from the normal.", "Reflected angle equals incident angle."],
  ["Each incident angle matches its corresponding reflected angle within the reported data.", "Each paired angle is equal."],
  ["The product fλ equals 300 m/s in every row.", "Each row gives fλ = 300 m/s."],
  ["The ratio E/f is approximately constant for all three rows.", "E/f is approximately constant."],
]);
for (const [from, to] of replacements) {
  if (!data.includes(from)) throw new Error(`Missing generated Physics 2 wording target: ${from}`);
  data = data.replace(from, to);
}

const skillBlock = String.raw`

// --------------------------------------------------------------------------
// MCQ skill rebalance after independent CED review
// --------------------------------------------------------------------------
// Section I's published weighting is by 2.A-2.D and 3.B-3.C. The original
// draft used 2.A for many plug-in calculations and 3.B for nearly every
// conceptual item. This pass classifies the non-stimulus bank by what the
// student actually does, then replaces 24 suitable formula items with genuine
// symbolic-derivation questions so 2.A is represented authentically.
const PHYS2_DERIVATION_IDS = new Set([
  "apphys2-u9-004","apphys2-u9-008","apphys2-u9-011","apphys2-u9-015",
  "apphys2-u10-007","apphys2-u10-010","apphys2-u10-013","apphys2-u10-016",
  "apphys2-u11-004","apphys2-u11-007","apphys2-u11-010","apphys2-u11-021",
  "apphys2-u12-004","apphys2-u12-008","apphys2-u12-011",
  "apphys2-u13-004","apphys2-u13-008","apphys2-u13-012",
  "apphys2-u14-004","apphys2-u14-016","apphys2-u14-022",
  "apphys2-u15-004","apphys2-u15-012","apphys2-u15-017",
]);

function classifyPhysics2Mcq(question) {
  if (question.stimulusGroupId || PHYS2_DERIVATION_IDS.has(question.id)) return question.skill;
  const stem = question.q.toLowerCase();
  if (/\b(justif|evidence|best supports|why does|what does this reveal)\b/.test(stem)) return "3.C";
  if (/\b(compare|compared|greater than|less than|relative to|how does .* compare)\b/.test(stem)) return "2.C";
  if (/\b(doubl|tripl|halv|factor|proportional|increased|decreased|increases|decreases|what happens to|how does .* change|predict)\b/.test(stem)) return "2.D";
  if (/\b(calculate|how much|what is the (magnitude|current|voltage|potential|energy|frequency|wavelength|resistance|temperature|pressure|volume|time constant|angle|speed|force)|at what angle|what fraction)\b/.test(stem) || /\d/.test(question.q) && /\bwhat\b/.test(stem)) return "2.B";
  return "3.B";
}
PHYS2_QUESTIONS.forEach((question) => { question.skill = classifyPhysics2Mcq(question); });

function derivation(id, stem, correct, distractors, explanation) {
  const question = PHYS2_QUESTIONS.find((item) => item.id === id);
  if (!question) throw new Error("Missing derivation target " + id);
  const correctIndex = question.c[0];
  const options = distractors.slice();
  options.splice(correctIndex, 0, correct);
  question.skill = "2.A";
  question.q = stem;
  question.o = options;
  question.e = explanation;
}

derivation("apphys2-u9-004", "For a fixed amount of ideal gas, which expression for V2 follows from P1V1/T1 = P2V2/T2?", "V2 = P1V1T2/(P2T1)", ["V2 = P2V1T1/(P1T2)", "V2 = P1P2V1/(T1T2)", "V2 = V1T1T2/(P1P2)"], "Starting from P1V1/T1 = P2V2/T2, multiply both sides by T2/P2 to isolate V2. This gives V2 = P1V1T2/(P2T1), with each state variable kept in its proper numerator or denominator.");
derivation("apphys2-u9-008", "A slab conducts thermal energy at rate H = kAΔT/L. Which expression for k is obtained by solving symbolically for the thermal conductivity?", "k = HL/(AΔT)", ["k = HAΔT/L", "k = AΔT/(HL)", "k = H/(LAΔT)"], "From H = kAΔT/L, multiply by L and divide by AΔT. The isolated conductivity is k = HL/(AΔT), which also has the expected units of watts per meter-kelvin.");
derivation("apphys2-u9-011", "Using ΔEint = Q − W, which expression gives the work W done by a gas in terms of Q and ΔEint?", "W = Q − ΔEint", ["W = Q + ΔEint", "W = ΔEint − Q", "W = QΔEint"], "Rearrange ΔEint = Q − W by adding W to both sides and subtracting ΔEint from both sides. The result is W = Q − ΔEint.");
derivation("apphys2-u9-015", "Starting from Q = mcΔT, which expression gives the specific heat capacity c?", "c = Q/(mΔT)", ["c = QmΔT", "c = mΔT/Q", "c = QΔT/m"], "Divide both sides of Q = mcΔT by mΔT. This isolates the material property c and gives c = Q/(mΔT).");

derivation("apphys2-u10-007", "For a point charge, E = kQ/r². Which expression gives r in terms of E, k, and Q?", "r = √(kQ/E)", ["r = kQ/E", "r = √(E/(kQ))", "r = E²/(kQ)"], "From E = kQ/r², multiply by r² and divide by E to obtain r² = kQ/E. Taking the positive square root for a distance gives r = √(kQ/E).");
derivation("apphys2-u10-010", "The electric potential energy of two point charges is U = kq1q2/r. Which expression gives their separation r?", "r = kq1q2/U", ["r = U/(kq1q2)", "r = kU/(q1q2)", "r = q1q2/(kU)"], "Multiply U = kq1q2/r by r and divide by U. The resulting symbolic expression is r = kq1q2/U; signs determine the sign of U, while r itself is a positive separation magnitude.");
derivation("apphys2-u10-013", "For a point charge, V = kQ/r. Which expression gives Q in terms of V and r?", "Q = Vr/k", ["Q = Vk/r", "Q = k/(Vr)", "Q = r/(Vk)"], "Multiplying V = kQ/r by r and dividing by k isolates the source charge: Q = Vr/k.");
derivation("apphys2-u10-016", "A capacitor obeys Q = CV. Which expression for C follows directly from this relation?", "C = Q/V", ["C = QV", "C = V/Q", "C = 1/(QV)"], "Divide the capacitor relation Q = CV by V to isolate capacitance. This yields C = Q/V.");

derivation("apphys2-u11-004", "Using Ohm's law V = IR, which expression gives the circuit current I?", "I = V/R", ["I = VR", "I = R/V", "I = V²R"], "Dividing V = IR by R isolates the current and gives I = V/R.");
derivation("apphys2-u11-007", "A uniform wire has R = ρL/A. Which expression gives its resistivity ρ?", "ρ = RA/L", ["ρ = RL/A", "ρ = A/(RL)", "ρ = L/(RA)"], "Multiply R = ρL/A by A and divide by L. The resulting symbolic expression is ρ = RA/L.");
derivation("apphys2-u11-010", "Combining P = VI with I = V/R, which expression gives resistor power using only V and R?", "P = V²/R", ["P = VR²", "P = R/V²", "P = V/R²"], "Substitute I = V/R into P = VI: P = V(V/R) = V²/R. This is the voltage-resistance form of resistive power.");
derivation("apphys2-u11-021", "For an RC circuit with time constant τ = RC, which expression gives C?", "C = τ/R", ["C = τR", "C = R/τ", "C = 1/(τR)"], "Divide τ = RC by R to isolate capacitance, giving C = τ/R.");

derivation("apphys2-u12-004", "A charged particle moving perpendicular to B follows a circle when qvB = mv²/r. Which expression for r follows?", "r = mv/(qB)", ["r = qB/(mv)", "r = mv²/(qB)", "r = qvB/m"], "Set magnetic force equal to centripetal force, cancel one factor of v, and solve for r: qB = mv/r, so r = mv/(qB).");
derivation("apphys2-u12-008", "For a wire perpendicular to a magnetic field, F = BIL. Which expression gives the current I?", "I = F/(BL)", ["I = FBL", "I = BL/F", "I = B/(FL)"], "Divide F = BIL by BL to isolate current. The symbolic result is I = F/(BL).");
derivation("apphys2-u12-011", "Faraday's law gives |ε| = N|ΔΦ|/Δt. Which expression gives |ΔΦ|?", "|ΔΦ| = |ε|Δt/N", ["|ΔΦ| = N|ε|/Δt", "|ΔΦ| = |ε|/(NΔt)", "|ΔΦ| = NΔt/|ε|"], "Multiply |ε| = N|ΔΦ|/Δt by Δt and divide by N. This gives |ΔΦ| = |ε|Δt/N.");

derivation("apphys2-u13-004", "Starting from 1/f = 1/do + 1/di, which expression gives di in terms of f and do?", "di = fdo/(do − f)", ["di = fdo/(do + f)", "di = (do − f)/(fdo)", "di = f + do"], "Subtract 1/do from both sides: 1/di = (do − f)/(fdo). Taking the reciprocal gives di = fdo/(do − f).");
derivation("apphys2-u13-008", "Snell's law is n1 sinθ1 = n2 sinθ2. Which expression gives sinθ2?", "sinθ2 = (n1/n2)sinθ1", ["sinθ2 = (n2/n1)sinθ1", "sinθ2 = n1n2 sinθ1", "sinθ2 = sinθ1/(n1n2)"], "Divide both sides of n1 sinθ1 = n2 sinθ2 by n2. This isolates sinθ2 = (n1/n2)sinθ1.");
derivation("apphys2-u13-012", "For a thin lens, m = −di/do. Which expression gives di in terms of magnification m and object distance do?", "di = −mdo", ["di = m/do", "di = −do/m", "di = m + do"], "Multiply m = −di/do by do to obtain mdo = −di, then multiply by −1. The result is di = −mdo.");

derivation("apphys2-u14-004", "Period and frequency satisfy T = 1/f. Which expression gives f?", "f = 1/T", ["f = T", "f = T²", "f = 1/T²"], "Taking the reciprocal of T = 1/f gives f = 1/T, expressing the inverse relationship between period and frequency.");
derivation("apphys2-u14-016", "For a string fixed at both ends, λn = 2L/n and v = fλ. Which expression gives fn?", "fn = nv/(2L)", ["fn = 2Lv/n", "fn = nL/(2v)", "fn = v/(2Ln)"], "Substitute λn = 2L/n into v = fnλn: v = fn(2L/n). Multiplying by n/(2L) gives fn = nv/(2L).");
derivation("apphys2-u14-022", "Double-slit maxima satisfy d sinθ = mλ. Which expression gives slit separation d?", "d = mλ/sinθ", ["d = sinθ/(mλ)", "d = m sinθ/λ", "d = λ/(m sinθ)"], "Divide d sinθ = mλ by sinθ to isolate the slit separation: d = mλ/sinθ.");

derivation("apphys2-u15-004", "In the Bohr model En = −13.6 eV/n². Which symbolic expression gives n in terms of the magnitude |En|?", "n = √(13.6 eV/|En|)", ["n = 13.6 eV/|En|", "n = √(|En|/13.6 eV)", "n = |En|²/(13.6 eV)"], "Using magnitudes, |En| = 13.6 eV/n². Rearranging gives n² = 13.6 eV/|En|, so n = √(13.6 eV/|En|).");
derivation("apphys2-u15-012", "At the photoelectric threshold, hf0 = φ. Which expression gives the threshold frequency f0?", "f0 = φ/h", ["f0 = h/φ", "f0 = hφ", "f0 = φh²"], "Divide hf0 = φ by Planck's constant h. The threshold frequency is f0 = φ/h.");
derivation("apphys2-u15-017", "Mass-energy equivalence gives E = Δmc². Which expression gives the mass defect Δm?", "Δm = E/c²", ["Δm = Ec²", "Δm = c²/E", "Δm = E²/c"], "Divide E = Δmc² by c² to isolate the mass defect, giving Δm = E/c².");
`;

const exportMarker = "\nwindow.QUESTIONS_AP_PHYSICS_2 = PHYS2_QUESTIONS;";
if (!data.includes(exportMarker)) throw new Error("Missing Physics 2 export marker after migration");
data = data.replace(exportMarker, skillBlock + exportMarker);
fs.writeFileSync("data/ap-physics-2.js", data);

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(data, sandbox, { filename: "data/ap-physics-2.js" });
const bank = sandbox.window.QUESTIONS_AP_PHYSICS_2;
const counts = {};
const byUnit = {};
for (const q of bank) {
  counts[q.skill] = (counts[q.skill] || 0) + 1;
  byUnit[q.unit] ||= {};
  byUnit[q.unit][q.skill] = (byUnit[q.unit][q.skill] || 0) + 1;
}
console.log("Physics 2 skill counts:", JSON.stringify(counts));
console.log("Physics 2 skills by unit:", JSON.stringify(byUnit));

if (fs.existsSync(__filename)) fs.unlinkSync(__filename);
