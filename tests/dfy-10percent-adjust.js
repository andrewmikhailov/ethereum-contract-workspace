const web3Utils = require('web3-utils');
const baseTest = require('../base-test');
module.exports = baseTest;
const firstInvestor = "0x9A54387CD45d73b760d20B305CF2f9c664F25DF3";
const secondInvestor = "0x5bc8C17A52885Fc10e6e6C1742DA1E064eC8b8E9";
baseTest.test10PercentAdjust = async function (test) {
    test.expect(2);
    const connection = baseTest.helpers.getConnection();
    const contractInstance = baseTest.helpers.getContractInstance();
    const sender = baseTest.owner;
    const amount = web3Utils.toWei("110000", "ether");
    const transactionRequest = {
        from: sender
    };
    const gasEstimate = await connection.eth.estimateGas(transactionRequest);
    transactionRequest.gas = 20 * gasEstimate;
    contractInstance.methods.adjust(11000).send(transactionRequest, (error, txHash) => {
        console.log(error, txHash);
    })
        .on('confirmation', function (confirmationNumber, receipt) {
            console.log('Transaction confirmation:', confirmationNumber, receipt);
            contractInstance.methods.balanceOf(firstInvestor).call().then(function (firstBalance) {
                contractInstance.methods.balanceOf(secondInvestor).call().then(function (secondBalance) {
                    test.ok(parseInt(amount) === parseInt(firstBalance));
                    test.ok(parseInt(amount) === parseInt(secondBalance));
                    test.done();
                });
            });
        });
};
