const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

const html = fs.readFileSync("index.html", "utf8");
const app = fs.readFileSync("js/app.js", "utf8");

test("the application exposes core keyboard and screen-reader semantics", () => {
  assert.match(html, /class="skip-link" href="#main-content"/);
  assert.match(html, /<main id="screen-exam"/);
  assert.match(html, /<button type="button" id="prev-btn"/);
  assert.match(app, /text: `Question \$\{state\.current \+ 1\}: \$\{q\.q\}`/);
  assert.match(app, /aria-current/);
  assert.match(app, /aria-pressed/);
});

test("runtime rendering avoids innerHTML and CSP is restrictive", () => {
  assert.doesNotMatch(app, /\.innerHTML\s*=/);
  assert.match(html, /default-src 'self'/);
  assert.match(html, /object-src 'none'/);
});
