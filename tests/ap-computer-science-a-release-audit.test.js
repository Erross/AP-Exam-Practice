const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');

test('AP CSA generic release audit passes 5000 draws and 5000 overlap pairs', () => {
  const result = spawnSync(process.execPath, [
    'tools/subject-release-audit.js',
    '--subject', 'ap-computer-science-a',
    '--trials', '5000',
    '--overlap-trials', '5000',
  ], { encoding: 'utf8', timeout: 180000 });

  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  assert.equal(result.status, 0, 'generic CSA release audit must pass');
  assert.match(result.stdout, /5000/i, 'release audit should report the requested trial count');
});
