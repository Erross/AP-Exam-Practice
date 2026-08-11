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

test("notation tokenizer handles powers, units, and ionic charges", () => {
  assert.equal(compact("x^2 + y^{10}"), "text:x|sup:2|text: + y|sup:10");
  assert.equal(compact("m^2/s^2"), "text:m|sup:2|text:/s|sup:2");
  assert.equal(compact("Fe^3+"), "text:Fe|sup:3+");
  assert.equal(compact("H^+"), "text:H|sup:+");
  assert.equal(compact("e^(−kt)"), "text:e|sup:−kt");
});

test("notation tokenizer leaves spaced programming XOR syntax alone", () => {
  assert.deepEqual(tokenizeNotation("value = a ^ b;"), [{ type: "text", value: "value = a ^ b;" }]);
});
