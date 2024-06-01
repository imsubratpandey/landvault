const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("LockModule", (m) => {
  const smartContract = m.contract("SmartContract", []);
  return { smartContract };
});