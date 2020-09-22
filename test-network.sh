# Clean the previous network state
rm -rf /tmp/.ethereum/

# TODO: The following module is no more available: db
# To get more detailed logs: --verbosity 5
geth --dev --allow-insecure-unlock --rpc --rpcaddr "0.0.0.0" --rpcport "8545" --rpcapi="eth,net,web3,personal,miner" --datadir /tmp/.ethereum/development --ipcpath $HOME/.ethereum/geth.ipc console
