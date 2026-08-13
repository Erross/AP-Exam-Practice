const fs = require("node:fs");
const vm = require("node:vm");

function loadGovernmentBank() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync("data/ap-us-government.js", "utf8"), sandbox);
  return sandbox.window.QUESTIONS_AP_US_GOVERNMENT;
}

function loadChemistryBank() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync("data/ap-chemistry.js", "utf8"), sandbox);
  vm.runInContext(fs.readFileSync("data/ap-chemistry-curation.js", "utf8"), sandbox);
  vm.runInContext(fs.readFileSync("data/ap-chemistry-corrections.js", "utf8"), sandbox);
  vm.runInContext(fs.readFileSync("data/ap-chemistry-quality-fixes.js", "utf8"), sandbox);
  return sandbox.window.QUESTIONS_AP_CHEMISTRY;
}

function loadPhysics2Bank() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync("data/ap-physics-2.js", "utf8"), sandbox);
  vm.runInContext(fs.readFileSync("data/ap-physics-2-quality-fixes.js", "utf8"), sandbox);
  return sandbox.window.QUESTIONS_AP_PHYSICS_2;
}

function loadStatisticsBank() { const sandbox = { window: {} }; vm.createContext(sandbox); vm.runInContext(fs.readFileSync("data/ap-statistics.js", "utf8"), sandbox); return sandbox.window.QUESTIONS_AP_STATISTICS; }

function loadPrecalculusBank() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync("data/ap-precalculus.js", "utf8"), sandbox);
  vm.runInContext(fs.readFileSync("data/ap-precalculus-quality-fixes.js", "utf8"), sandbox);
  return sandbox.window.QUESTIONS_AP_PRECALCULUS;
}

module.exports = { loadGovernmentBank, loadChemistryBank, loadPhysics2Bank, loadStatisticsBank, loadPrecalculusBank };
