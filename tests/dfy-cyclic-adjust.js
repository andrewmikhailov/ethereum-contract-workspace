const web3Utils = require('web3-utils');
const baseTest = require('../base-test');
module.exports = baseTest;
const firstInvestor = "0x9A54387CD45d73b760d20B305CF2f9c664F25DF3";
const secondInvestor = "0x5bc8C17A52885Fc10e6e6C1742DA1E064eC8b8E9";
/**
 * TODO: Cannot run this test because it is taking too long
 * causing "nodeunit" closing by time-out.
 */
/*
baseTest.testCyclicAdjust = async function (test) {
    test.expect(2);
    const connection = baseTest.helpers.getConnection();
    const contractInstance = baseTest.helpers.getContractInstance();
    const sender = baseTest.owner;
    const amount = web3Utils.toWei("100000", "ether");
    const transactionRequest = {
        from: sender
    };
    const gasEstimate = await connection.eth.estimateGas(transactionRequest);
    transactionRequest.gas = 20 * gasEstimate;
    contractInstance.methods.adjust(11000).send(transactionRequest, (error, txHash) => {
        console.log(error, txHash);
    })
        .on('confirmation', function (confirmationNumber1, receipt1) {
            console.log('Transaction confirmation:', confirmationNumber1, receipt1);
            contractInstance.methods.adjust(10000).send(transactionRequest, (error, txHash) => {
                console.log(error, txHash);
            })
                .on('confirmation', function (confirmationNumber2, receipt2) {
                    console.log('Transaction confirmation 2:', confirmationNumber2, receipt2);
                    contractInstance.methods.balanceOf(firstInvestor).call().then(function (firstBalance) {
                        contractInstance.methods.balanceOf(secondInvestor).call().then(function (secondBalance) {
                            test.ok(parseInt(amount) === parseInt(firstBalance));
                            test.ok(parseInt(amount) === parseInt(secondBalance));
                            test.done();
                        });
                    });
                });
        });
};
*/
