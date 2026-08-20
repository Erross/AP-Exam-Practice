const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { spawnSync } = require('node:child_process');

const LATIN_SCRIPTS = [
  'data/ap-latin.js',
  'data/ap-latin-sight-sets.js',
  'data/ap-latin-syllabus-short.js',
  'data/ap-latin-long-sets-a.js',
  'data/ap-latin-long-aen2.js',
  'data/ap-latin-long-aen4.js',
  'data/ap-latin-long-aen6.js',
  'data/ap-latin-skill-fixes.js',
  'data/ap-latin-answer-curation.js',
];

test('AP Latin browser wiring exposes metadata, scalable drawer, and every authored bank layer in canonical order', () => {
  const html = fs.readFileSync('index.html', 'utf8');
  const scriptSources = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map((match) => match[1]);
  assert.ok(scriptSources.indexOf('js/ap-latin-metadata.js') > scriptSources.indexOf('js/subjects.js'));
  assert.ok(scriptSources.indexOf('js/set-blueprint-draw.js') > scriptSources.indexOf('js/draw.js'));
  assert.deepEqual(scriptSources.filter((source) => source.startsWith('data/ap-latin')), LATIN_SCRIPTS);
});

test('AP Latin browser-effective generic release audit passes 5000 draws and 5000 overlap pairs', () => {
  const run = spawnSync(process.execPath, [
    'tools/subject-release-audit.js',
    '--subject', 'ap-latin',
    '--trials', '5000',
    '--overlap-trials', '5000',
  ], { encoding: 'utf8' });

  if (run.stdout) console.log(run.stdout.trim());
  assert.equal(run.status, 0, run.stderr || run.stdout);
  assert.match(run.stdout, /166 questions from 9 browser data layer\(s\)/);
  assert.match(run.stdout, /Draw audit: 5000\/5000 valid/);
  assert.match(run.stdout, /Retake overlap: \d+\.\d+% average shared questions/);
});
