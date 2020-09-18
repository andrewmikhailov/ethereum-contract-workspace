const web3Utils = require('web3-utils');
const baseTest = require('../base-test');
module.exports = baseTest;
const firstInvestor = "0x9A54387CD45d73b760d20B305CF2f9c664F25DF3";
baseTest.testSingularAdjust = async function (test) {
    test.expect(1);
    const connection = baseTest.helpers.getConnection();
    const contractInstance = baseTest.helpers.getContractInstance();
    const sender = baseTest.owner;
    const amount = web3Utils.toWei("100000", "ether");
    const transactionRequest = {
        from: sender
    };
    const gasEstimate = await connection.eth.estimateGas(transactionRequest);
    transactionRequest.gas = 20 * gasEstimate;
    contractInstance.methods.adjust(10000).send(transactionRequest, (error, txHash) => {
        console.log(error, txHash);
    })
        .on('confirmation', function (confirmationNumber, receipt) {
            console.log('Transaction confirmation:', confirmationNumber, receipt);
            contractInstance.methods.balanceOf(firstInvestor).call().then(function (balance) {
                test.ok(parseInt(amount) === parseInt(balance), "The receiver should get the amount transfered");
                test.done();
            });
        });
};
