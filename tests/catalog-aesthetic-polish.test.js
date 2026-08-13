const fs = require('node:fs');
const assert = require('node:assert/strict');
const test = require('node:test');

test('final aesthetic polish is wired into the catalog', () => {
  const cards = fs.readFileSync('course-cards.css', 'utf8');
  const polish = fs.readFileSync('aesthetic-polish.css', 'utf8');
  assert.match(cards, /aesthetic-polish\.css/);
  assert.doesNotMatch(polish, /subject-card\.released-card:after/);
  assert.match(polish, /development-catalog/);
  assert.match(polish, /body:after/);
  assert.match(polish, /prefers-reduced-motion/);
});
