# ethereum-contract-workspace

## Installation

### Pre-requisites
You need to install Golang first.

### Install Geth on Debian
```shell
export GO111MODULE=on
go get -d github.com/ethereum/go-ethereum@v1.9.9
go install github.com/ethereum/go-ethereum/cmd/geth
```

## Starting the test network
```shell
./test-network.sh
```

This does the following:
- starts a local Ethereum node for a test network;
- enables Web 3 API on this network;
- starts mining to ensure transactions processing.
