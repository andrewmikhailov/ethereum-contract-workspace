require('dotenv').config();
var fs = require('fs');
var path = require('path');
var web3 = require('web3');
var solc = require('solc');
var ethereumGoIpc = require('ethereum-go-ipc');
var ipcUri = "http://localhost:8545";
var ethereumConnection = new web3(new web3.providers.HttpProvider(ipcUri));
module.exports = {
	setUp: function (callback) {
		ethereumConnection.eth.getAccounts().then(function (accounts) {
			if (accounts.length <= 0) {
				callback(new Error("No base account"));
				return;
			}
			module.exports.owner = accounts[0];
			try {
				ethereumConnection.eth.personal.unlockAccount(module.exports.owner, "", 150000);
			} catch (error) {
				// TODO:
				console.log(error);
				return;
			}
			ethereumGoIpc.setRpcUri(ipcUri);
			ethereumGoIpc.setEtherbase(module.exports.owner);
			ethereumGoIpc.minerStart(1);
			var firstAccount = ethereumConnection.eth.accounts.create();
			var secondAccount = ethereumConnection.eth.accounts.create();
			var thirdAccount = ethereumConnection.eth.accounts.create();
			var fourthAccount = ethereumConnection.eth.accounts.create();
			var fifthAccount = ethereumConnection.eth.accounts.create();
			module.exports.accounts = [firstAccount, secondAccount, thirdAccount, fourthAccount, fifthAccount];
			var contractJSON = {
				language: 'Solidity',
				sources: {
				},
				settings: {
					outputSelection: {
						'*': {
							'*': ['abi', "evm.bytecode"]
						}
					}
				}
			};
			var sources = process.env.SOURCES.split(',');
			for (i in sources) {
				var sourcePath = sources[i];
				var name = path.basename(sourcePath);
				var content = fs.readFileSync('./contracts/' + sourcePath, 'utf8');
				contractJSON.sources[name] = {
					content: content
				};
			}
			contractJSON = JSON.stringify(contractJSON);
			var compiledContracts = solc.compile(contractJSON);
			compiledContracts = JSON.parse(compiledContracts);
			compiledContracts = compiledContracts.contracts;
			for (var contractName in compiledContracts) {
				if (process.env.CONTRACT != contractName) {
					continue;
				}
				var contract = compiledContracts[contractName][path.basename(contractName, '.sol')];
				var byteCode = contract.evm.bytecode;
				var interface = contract.abi;
				// console.log("Contract interface:\n", interface, "\n");
				var contractData = '0x' + byteCode.object;
				ethereumConnection.eth.estimateGas({
					data: contractData
				}).then(function (gasAmount) {
					var contractInstance = new ethereumConnection.eth.Contract(interface);
					contractInstance.deploy({
						data: contractData,
						arguments: []
					})
						.send({
							from: module.exports.owner,
							gas: 2 * gasAmount
						})
						.on('error', function (error) {
							console.log("Deployment error:", error);
							callback(error);
						})
						.on('transactionHash', function (transactionHash) {
							console.log("Deployment transaction hash: " + transactionHash);
						})
						.on('receipt', function (receipt) {
							// console.log("Deployment contract receipt:", receipt);
						})
						.on('confirmation', function (confirmationNumber, newContractInstance) {
							console.log("Deployment confirmations received: " + confirmationNumber);
							// module.exports.contractInstance = newContractInstance;
							module.exports.contractInstance = new ethereumConnection.eth.Contract(interface, newContractInstance.contractAddress);
							setTimeout(callback, 1000);
						});
				})
					.catch(function (error) {
						console.log(error);
						callback(error);
					});
			}
		});
		module.exports.helpers = {
			getConnection: function () {
				return ethereumConnection;
			},
			getContractInstance: function () {
				return module.exports.contractInstance;
			}
		}
	},
	tearDown: function (callback) {
		if (!module.exports.owner) {
			return;
		}
		callback();
	}
};
