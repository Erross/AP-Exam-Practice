const test = require("node:test");
const assert = require("node:assert/strict");
const { tokenizeNotation } = require("../js/notation.js");

function compact(text) {
  return tokenizeNotation(text).map((token) => `${token.type}:${token.value}`).join("|");
}

test("notation tokenizer turns scientific-notation powers into superscripts", () => {
  assert.equal(
    compact("3.0×10^-4 J"),
    "text:3.0×10|sup:−4|text: J"
  );
  assert.equal(
    compact("3.0×10^−4 J"),
    "text:3.0×10|sup:−4|text: J"
  );
});

test("notation tokenizer handles powers, units, and caret ionic charges", () => {
  assert.equal(compact("x^2 + y^{10}"), "text:x|sup:2|text: + y|sup:10");
  assert.equal(compact("m^2/s^2"), "text:m|sup:2|text:/s|sup:2");
  assert.equal(compact("Fe^3+"), "text:Fe|sup:3+");
  assert.equal(compact("H^+"), "text:H|sup:+");
  assert.equal(compact("e^(−kt)"), "text:e|sup:−kt");
});

test("notation tokenizer renders chemical subscripts and common plain ionic charges", () => {
  assert.equal(compact("H2O and CO2"), "text:H|sub:2|text:O and |text:C|text:O|sub:2");
  assert.equal(compact("O2 and Cl2"), "text:O|sub:2|text: and |text:Cl|sub:2");
  assert.equal(compact("Ca2+ and O2− and Cl−"), "text:Ca|sup:2+|text: and |text:O|sup:2−|text: and |text:Cl|sup:−");
  assert.equal(compact("NH4+ and SO4^2−"), "text:N|text:H|sub:4|sup:+|text: and |text:S|text:O|sub:4|sup:2−");
});

test("notation tokenizer uses a radical sign for raw sqrt notation", () => {
  assert.equal(compact("sqrt([A]) and sqrt (K)"), "text:√([A]) and √(K)");
});

test("notation tokenizer leaves programming/unit-like text alone", () => {
  assert.deepEqual(tokenizeNotation("value = a ^ b;"), [{ type: "text", value: "value = a ^ b;" }]);
  assert.deepEqual(tokenizeNotation("Unit U2"), [{ type: "text", value: "Unit U2" }]);
});
