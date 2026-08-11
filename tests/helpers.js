const fs = require("node:fs");
const vm = require("node:vm");

function loadGovernmentBank() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync("data/ap-us-government.js", "utf8"), sandbox);
  return sandbox.window.QUESTIONS_AP_US_GOVERNMENT;
}

function loadPhysics2Bank() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync("data/ap-physics-2.js", "utf8"), sandbox);
  return sandbox.window.QUESTIONS_AP_PHYSICS_2;
}

module.exports = { loadGovernmentBank, loadPhysics2Bank };
