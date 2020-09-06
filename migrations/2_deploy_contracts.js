const Main = artifacts.require("main");
const Quest = artifacts.require("quest");
const QuestStore = artifacts.require("questStore");
module.exports = function(deployer) {
  deployer.deploy(Main).then(function(){
    return  deployer.deploy(Quest,Main.address,Main.address,"t","r",0,"d")});
  deployer.deploy(QuestStore);
}