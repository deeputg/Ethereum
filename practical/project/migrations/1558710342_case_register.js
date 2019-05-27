const CaseReg = artifacts.require("CaseRegister")
module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(CaseReg)
};
