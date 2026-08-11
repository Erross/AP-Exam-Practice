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
