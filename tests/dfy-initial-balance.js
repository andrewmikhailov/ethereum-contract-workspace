const web3Utils = require('web3-utils');
const baseTest = require('../base-test');
module.exports = baseTest;
const firstInvestor = "0x9A54387CD45d73b760d20B305CF2f9c664F25DF3";
baseTest.testInitialBalance = async function (test) {
    test.expect(1);
    const contractInstance = baseTest.helpers.getContractInstance();
    const amount = web3Utils.toWei("100000", "ether");
    contractInstance.methods.balanceOf(firstInvestor).call().then(function (balance) {
        test.ok(parseInt(amount) === parseInt(balance), "The receiver should get the amount transfered");
        test.done();
    });
};
