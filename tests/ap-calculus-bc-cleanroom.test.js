const test = require("node:test");
const assert = require("node:assert/strict");
const { AP_SUBJECTS } = require("../js/subjects");
const { loadEffectiveBank } = require("../tools/subject-release-audit");

const subject = AP_SUBJECTS.find((s) => s.id === "ap-calculus-bc");
const { bank } = loadEffectiveBank(subject);
const authored = bank.filter((q) => /^apcalcbc-u(?:6|7|8|9|10)-/.test(q.id));

function byTopic(code) { return authored.filter((q) => q.topicCode === code); }
function pick(code, re) {
  const q = byTopic(code).find((item) => re.test(item.q));
  assert.ok(q, `${code}: clean-room anchor not found for ${re}`);
  return q;
}
function answer(q) { return q.o[q.c[0]]; }
function expect(code, re, expected) { assert.equal(answer(pick(code, re)), expected, `${code}: independent answer check`); }

const BC_ONLY = [
  "6.11","6.12","6.13","7.5","7.9","8.13",
  "9.1","9.2","9.3","9.4","9.5","9.6","9.7","9.8","9.9",
  "10.1","10.2","10.3","10.4","10.5","10.6","10.7","10.8","10.9","10.10","10.11","10.12","10.13","10.14","10.15",
];

test("clean-room inventory has three independently authored variants for every BC-only topic", () => {
  assert.deepEqual([...new Set(authored.map((q) => q.topicCode))].sort((a,b) => {
    const [ua,ta]=a.split('.').map(Number); const [ub,tb]=b.split('.').map(Number); return ua-ub || ta-tb;
  }), BC_ONLY);
  for (const code of BC_ONLY) assert.equal(byTopic(code).length, 3, `${code}: expected exactly three authored variants`);
});

test("clean-room quantitative and conceptual anchors recompute across every BC-only topic", () => {
  expect("6.11", /x e\^x/, "e^x(x − 1) + C");
  expect("6.12", /3x\+5/, "2/(x+1) + 1/(x+2)");
  expect("6.13", /1\/x²/, "1");
  expect("7.5", /dy\/dx=x\+y/, "2.5");
  expect("7.9", /growth rate greatest/, "250");
  expect("8.13", /speed at t=1/, "√13");

  expect("9.1", /x=t²\+1/, "3");
  expect("9.2", /x=t² and y=t³/, "3/4");
  expect("9.3", /3cos\(t\)/, "3π/2");
  expect("9.4", /r\(t\)=⟨t²,sin/, "⟨2t,cos(t)⟩");
  expect("9.5", /displacement vector from t=0 to t=2/, "⟨2,4⟩");
  expect("9.6", /distance from the origin/, "2");
  expect("9.7", /polar coordinates \(r,θ\)=\(−2,0\)/, "(−2,0)");
  expect("9.8", /r=2cos\(θ\).*−π\/2/, "π");
  expect("9.9", /circles r=2 and r=1/, "3π");

  expect("10.1", /Sₙ=3−2\/n/, "The series converges to 3.");
  expect("10.2", /\(1\/3\)\^n/, "3/2");
  expect("10.3", /n\/\(n\+1\)/, "It diverges because n/(n+1) approaches 1, not 0.");
  expect("10.4", /1\/\(n²\+1\)/, "It converges because ∫₁^∞ 1/(x²+1) dx is finite.");
  expect("10.5", /Σ1\/n²/, "It converges because it is a p-series with p=2>1.");
  expect("10.6", /aₙ=1\/√\(n²\+1\)/, "Σaₙ diverges because aₙ/bₙ approaches 1 and Σ1/n diverges.");
  expect("10.7", /Σ\(−1\)\^\(n\+1\)\/n converge/, "The magnitudes 1/n decrease to 0, so the alternating series test applies.");
  expect("10.8", /Σ2\^n\/n!/, "It converges absolutely because the ratio limit is 0.");
  expect("10.9", /alternating harmonic series/, "Conditionally, because it converges but Σ1/n diverges.");
  expect("10.10", /below 0\.01/, "100 terms");
  expect("10.11", /third-degree Maclaurin polynomial for e\^x/, "1+x+x²/2+x³/6");
  expect("10.12", /degree-2 Maclaurin polynomial for e\^x/, "e^0.1(0.1)³/3!");
  expect("10.13", /\(x\+1\)\^n\/\[n·2\^n\]/, "[−3,1)");
  expect("10.14", /Maclaurin series represents cos/, "Σ (−1)^n x^(2n)/(2n)!");
  expect("10.15", /x\/\(1−x²\)/, "Σ x^(2n+1) from n=0 to ∞");
});

test("clean-room BC-only skill tags stay within MCQ-assessed practices and semantic anchors match", () => {
  const allowed = new Set(["1.D","1.E","2.C","2.D","3.B","3.D"]);
  assert.ok(authored.every((q) => allowed.has(q.skill)), "unexpected BC-only exact skill code");
  assert.ok(authored.every((q) => !String(q.skill).startsWith("4.")), "Practice 4 must not appear in Section I");

  assert.equal(pick("6.11", /x e\^x/).skill, "1.E");
  assert.equal(pick("7.9", /carrying capacity/).skill, "1.D");
  assert.equal(pick("9.7", /Cartesian point/).skill, "2.C");
  assert.equal(pick("10.1", /Sₙ=3−2\/n/).skill, "2.D");
  assert.equal(pick("10.3", /n\/\(n\+1\)/).skill, "3.D");
  assert.equal(pick("10.11", /third-degree Maclaurin polynomial for e\^x/).skill, "1.E");
  assert.equal(pick("10.14", /Maclaurin series represents cos/).skill, "2.C");
});

test("clean-room BC-only option sets are unambiguous and rationales are substantive", () => {
  for (const q of authored) {
    assert.equal(new Set(q.o.map((x) => String(x).trim())).size, 4, `${q.id}: duplicate answer text`);
    assert.ok(q.c.length === 1 && Number.isInteger(q.c[0]), `${q.id}: ambiguous key shape`);
    const keyed = answer(q);
    assert.ok(keyed && String(keyed).trim().length > 0, `${q.id}: empty key`);
    assert.ok(q.e.length >= 90, `${q.id}: rationale too thin`);
    assert.doesNotMatch(q.e, /because it is correct|the other answers are wrong/i, `${q.id}: non-explanatory rationale`);
  }
});
