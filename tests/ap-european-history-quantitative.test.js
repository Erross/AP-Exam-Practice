const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function loadBank() {
  const html = fs.readFileSync('index.html', 'utf8');
  const scripts = [...html.matchAll(/<script src="(data\/ap-european-history[^\"]*\.js)"><\/script>/g)].map((m) => m[1]);
  const context = vm.createContext({ window: {} });
  for (const file of scripts) vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
  return context.window.QUESTIONS_AP_EUROPEAN_HISTORY;
}

const bank = loadBank();
const groups = new Map();
for (const q of bank) {
  if (!groups.has(q.stimulusGroupId)) groups.set(q.stimulusGroupId, []);
  groups.get(q.stimulusGroupId).push(q);
}
const quantitative = [...groups.values()].filter((g) => g[0].stimulus.type === 'quantitative');

function group(code) {
  const g = groups.get(`apeuro-${code.replace('.', '-')}`);
  assert.ok(g, `missing quantitative group ${code}`);
  return g;
}
function numbers(row) {
  return row.slice(1).map((value) => Number(String(value).replace(/[%,$]/g, '').replace(/,/g, '')));
}

test('AP Euro quantitative portfolio contains 16 complete readable source sets', () => {
  assert.equal(quantitative.length, 16);
  for (const g of quantitative) {
    const s = g[0].stimulus;
    assert.ok(Array.isArray(s.columns) && s.columns.length >= 3, `${g[0].topicCode}: columns`);
    assert.ok(Array.isArray(s.rows) && s.rows.length >= 3, `${g[0].topicCode}: rows`);
    assert.ok(g.every((q) => q.stimulus === g[0].stimulus || JSON.stringify(q.stimulus) === JSON.stringify(s)), `${g[0].topicCode}: inconsistent shared data`);
    assert.equal(String(g[0].skill), '3', `${g[0].topicCode}: first data question should require interpretation`);
  }
});

test('selected quantitative trends independently reproduce their keyed interpretation', () => {
  {
    const g = group('4.4');
    const rows = Object.fromEntries(g[0].stimulus.rows.map((r) => [r[0], numbers(r)]));
    assert.ok(rows['Population index'][1] > rows['Population index'][0]);
    assert.ok(rows['Average grain-yield index'][1] > rows['Average grain-yield index'][0]);
    assert.ok(rows['Urban population share index'][1] > rows['Urban population share index'][0]);
    assert.match(g[0].o[g[0].c[0]], /Population growth.*agricultural improvement/i);
  }
  {
    const g = group('5.2');
    const rows = g[0].stimulus.rows;
    const imports = rows.map((r) => Number(r[1]));
    const exports = rows.map((r) => Number(r[2]));
    assert.ok(imports[2] > imports[1] && imports[1] > imports[0]);
    assert.ok(exports[2] > exports[1] && exports[1] > exports[0]);
    assert.match(g[0].o[g[0].c[0]], /increasingly connected.*Atlantic/i);
  }
  {
    const g = group('6.2');
    for (const row of g[0].stimulus.rows) {
      const [early, late] = numbers(row);
      assert.ok(late > early, `${row[0]} should increase`);
    }
    const east = g[0].stimulus.rows.find((r) => r[0] === 'Eastern region');
    assert.ok(Number(east[2]) < 50);
    assert.match(g[0].o[g[0].c[0]], /spread unevenly/i);
  }
  {
    const g = group('6.4');
    const rows = Object.fromEntries(g[0].stimulus.rows.map((r) => [r[0], numbers(r)]));
    assert.ok(rows['Population'][1] > rows['Population'][0]);
    assert.ok(rows['Average persons per dwelling'][1] > rows['Average persons per dwelling'][0]);
    assert.ok(rows['Infant mortality per 1,000 births'][1] > rows['Infant mortality per 1,000 births'][0]);
    assert.match(g[0].o[g[0].c[0]], /outpace housing and public-health infrastructure/i);
  }
  {
    const g = group('7.5');
    const rows = g[0].stimulus.rows;
    for (const row of rows) assert.ok(Number(row[2]) > Number(row[1]), `${row[0]} should increase`);
    assert.match(g[0].o[g[0].c[0]], /urban growth.*infrastructure.*schooling.*mass communication/i);
  }
  {
    const g = group('8.5');
    const rows = Object.fromEntries(g[0].stimulus.rows.map((r) => [r[0], numbers(r)]));
    assert.ok(rows['Industrial production index'][1] < rows['Industrial production index'][0]);
    assert.ok(rows['World trade index'][1] < rows['World trade index'][0]);
    assert.ok(rows['Unemployment index'][1] > rows['Unemployment index'][0]);
    assert.ok(rows['Bank failures index'][1] > rows['Bank failures index'][0]);
    assert.match(g[0].o[g[0].c[0]], /collapsing production and trade.*rising unemployment/i);
  }
  {
    const g = group('9.2');
    const rows = Object.fromEntries(g[0].stimulus.rows.map((r) => [r[0], numbers(r)]));
    assert.ok(rows['Industrial production index'][1] > rows['Industrial production index'][0]);
    assert.ok(rows['Intra-European trade index'][1] > rows['Intra-European trade index'][0]);
    assert.ok(rows['Unemployment index'][1] < rows['Unemployment index'][0]);
    assert.match(g[0].o[g[0].c[0]], /rising industrial output and trade.*declining unemployment/i);
  }
});

test('quantitative questions do not claim precision beyond their synthetic tables', () => {
  for (const g of quantitative) {
    const source = g[0].stimulus.source;
    assert.match(source, /Original simulated/i);
    for (const q of g) {
      assert.doesNotMatch(q.q, /according to official|College Board data|historically exact/i);
      assert.doesNotMatch(q.e, /proves? that all|proves? that every/i);
    }
  }
});