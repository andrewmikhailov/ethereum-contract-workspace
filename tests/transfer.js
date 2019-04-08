var web3 = require('web3');
var web3Utils = require('web3-utils');
var baseTest = require('../base-test');
var compare = require('../compare');
module.exports = baseTest;
baseTest.testTransfer = function (test) {
    var connection = baseTest.helpers.getConnection();
    var contractInstance = baseTest.helpers.getContractInstance();
    var sender = baseTest.owner;
    var firstAccount = baseTest.accounts[0].address;
    var amount = web3Utils.toWei("1", "ether");
    var transactionRequest = {
        from: sender
    };
    connection.eth.estimateGas(transactionRequest, function (error, gasEstimate) {
        transactionRequest.gas = 10 * gasEstimate;
        contractInstance.methods.transfer(firstAccount, amount).send(transactionRequest)
            .on('confirmation', function (confirmationNumber, receipt) {
                console.log('Transaction confirmation:', confirmationNumber, receipt);
                contractInstance.methods.balanceOf(firstAccount).call().then(function (balance) {
                    test.ok(amount == parseInt(balance), "The receiver should get the amount transfered");
                    test.done();
                });
            });
    });
}