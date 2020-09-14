const web3Utils = require('web3-utils');
const baseTest = require('../base-test');
module.exports = baseTest;
baseTest.testMint = async function (test) {
    test.expect(1);
    const connection = baseTest.helpers.getConnection();
    const contractInstance = baseTest.helpers.getContractInstance();
    const sender = baseTest.owner;
    const firstAccount = baseTest.accounts[0].address;
    const amount = web3Utils.toWei("1", "ether");
    const transactionRequest = {
        from: sender
    };
    const gasEstimate = await connection.eth.estimateGas(transactionRequest);
    transactionRequest.gas = 2 * gasEstimate;
    contractInstance.methods.mint(firstAccount, amount).send(transactionRequest, (error, txHash) => {
        console.log(error, txHash);
    })
        .on('confirmation', function (confirmationNumber, receipt) {
            console.log('Transaction confirmation:', confirmationNumber, receipt);
            contractInstance.methods.balanceOf(firstAccount).call().then(function (balance) {
                test.ok(parseInt(amount) === parseInt(balance), "The receiver should get the amount transfered");
                test.done();
            });
        });
};
