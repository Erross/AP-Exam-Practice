const fs = require("node:fs");
const assert = require("node:assert/strict");
const test = require("node:test");

const js = fs.readFileSync("js/catalog.js", "utf8");
const css = fs.readFileSync("phase7.css", "utf8");
const cards = fs.readFileSync("course-cards.css", "utf8");

test("production landing composition is semantic, current, and uses desktop space", () => {
  assert.match(js, /catalog-trust/);
  assert.match(js, /how-it-works/);
  assert.match(js, /Available now/);
  assert.match(js, /Outside current scope: audio-dependent AP courses/);
  assert.match(js, /About, scope & limitations/);
  assert.match(js, /course-category/);
  assert.match(js, /site-footer/);
  assert.match(js, /Choose your AP course/);
  assert.match(css, /max-width:1240px/);
  assert.match(css, /outside-scope-catalog/);
  assert.match(css, /footer-docs/);
  assert.match(css, /repeat\(3,minmax\(0,1fr\)\)/);
  assert.match(css, /repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css, /grid-template-columns:1fr/);
  assert.match(css, /#screen-catalog:before,body:after/);
  assert.match(cards, /phase7\.css/);
});
