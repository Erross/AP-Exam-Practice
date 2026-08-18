const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');

test('AP African American Studies generic release audit CLI passes 5000 draws and 5000 overlap pairs', () => {
  const run = spawnSync(process.execPath, [
    'tools/subject-release-audit.js',
    '--subject', 'ap-african-american-studies',
    '--trials', '5000',
    '--overlap-trials', '5000',
  ], { encoding: 'utf8' });

  if (run.stdout) console.log(run.stdout.trim());
  assert.equal(run.status, 0, run.stderr || run.stdout);
  assert.match(run.stdout, /238 questions from 11 browser data layer\(s\)/);
  assert.match(run.stdout, /Draw audit: 5000\/5000 valid/);
  assert.match(run.stdout, /Retake overlap: \d+\.\d+% average shared questions/);
});
