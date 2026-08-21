const fs = require("node:fs");
const assert = require("node:assert/strict");
const test = require("node:test");

const catalog = fs.readFileSync("js/catalog.js", "utf8");
const css = fs.readFileSync("course-cards.css", "utf8");
const html = fs.readFileSync("index.html", "utf8");

test("released course cards have a stronger and accurate CTA hierarchy", () => {
  assert.match(catalog, /styleCourseCards\(container\)/);
  assert.match(catalog, /Ready to practice/);
  assert.match(catalog, /Review format & start →/);
  assert.doesNotMatch(catalog, /Start timed Section I →/);
  assert.match(catalog, /released-card/);
  assert.match(catalog, /development-card/);
  assert.match(css, /\.subject-card \.subject-cta/);
  assert.match(css, /margin-top: auto/);
  assert.match(css, /\.subject-card\.released-card/);
  assert.match(html, /course-cards\.css/);
});
