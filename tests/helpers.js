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

module.exports = { loadGovernmentBank, loadChemistryBank };
