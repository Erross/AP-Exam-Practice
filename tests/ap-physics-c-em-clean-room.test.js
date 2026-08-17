const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync("data/ap-physics-c-em.js", "utf8"), sandbox);
const bank = sandbox.window.QUESTIONS_AP_PHYSICS_C_EM;
const byId = new Map(bank.map((q) => [q.id, q]));

function q(id) {
  const item = byId.get(id);
  assert.ok(item, `missing ${id}`);
  return item;
}

test("E&M clean-room model-claim repairs use 3.B rather than comparison or derivation tags", () => {
  const ids = ["em-9.2-02", "em-set-u8-03", "em-set-u9-03", "em-set-u12-02", "em-set-u13-03"];
  for (const id of ids) assert.equal(q(id).skill, "3.B", `${id}: should apply a law/model to make a claim`);

  assert.match(q("em-9.2-02").q, /claim.*follows|which claim/i);
  for (const id of ids.slice(1)) assert.match(q(id).q, /model|law.*accounts|consistent/i, `${id}: prompt should ask for model-supported claim`);
});

test("E&M clean-room 2.A repairs require a symbolic mathematical pathway rather than bare equation recall", () => {
  const derivationIds = [
    "em-8.3-04", "em-9.2-03", "em-10.3-02", "em-10.4-03",
    "em-11.2-03", "em-11.4-02", "em-11.7-03", "em-12.3-01",
    "em-12.4-01", "em-13.1-03", "em-13.2-02", "em-13.3-03",
    "em-13.4-02", "em-13.6-02",
  ];
  const pathway = /using|starting|eliminat|divid|substitut|integrat|summing|applying|follows|force per unit charge|no charge accumulates|symmetry/i;
  for (const id of derivationIds) {
    const item = q(id);
    assert.equal(item.skill, "2.A", `${id}: exact skill changed`);
    assert.match(item.q, pathway, `${id}: prompt no longer exposes a derivation pathway`);
  }
});

test("E&M Ampere clean-room item derives the long-wire loop equation rather than recalling the law", () => {
  const item = q("em-12.4-01");
  assert.match(item.q, /circular Amperian loop.*Symmetry.*∮B·dℓ=μ₀Ienc/i);
  assert.equal(item.o[item.c[0]], "B(2πr) = μ₀I");
  assert.match(item.e, /B\(2πr\).*Ampère/i);
});
