// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "./ERC20.sol";

contract DFY is ERC20 {

    uint256 public constant DECIMALS = 18;
    uint256 public constant INITIAL_SUPPLY = 1000000 * (10 ** uint256(DECIMALS));
    uint256 public constant PROXIMITY = 1000;
    uint256 private constant singleAmount = INITIAL_SUPPLY / 10;

    /**
     * The starting Bitcoin to USD exchange rate to perform supply adjustments.
     */
    uint256 public previousBTCUSDRate = 10000;

    constructor () ERC20("DFY", "DFY") {
        _totalSupply = INITIAL_SUPPLY;
        _balances[0x9A54387CD45d73b760d20B305CF2f9c664F25DF3] = singleAmount;
        _balances[0x5bc8C17A52885Fc10e6e6C1742DA1E064eC8b8E9] = singleAmount;
        _balances[0xEe4d51f6d3Da5417D74Ca6DaAB07490CB76d0e8d] = singleAmount;
        _balances[0x8be903A229bBB069E7059c7838B30e677fBC4C30] = singleAmount;
        _balances[0x0230699450099B80631b49672153684eE31af0Fd] = singleAmount;
        _balances[0xb501dEF0915b2c1359058d97234F95894a8eA647] = singleAmount;
        _balances[0xf99CC2aeFa3bD4FDfAcC43d4086788f10ee06B55] = singleAmount;
        _balances[0xE6613282a79c691c9fcC9D5Cb460486D3DA2eaB8] = singleAmount;
        _balances[0xD5abAaB14e81B8AE57D2Bee0024E1c593BB5A1D0] = singleAmount;
        _balances[0x37DB0F7ddC14baf6FD9f0484E9E63B658419aF53] = singleAmount;
    }

    function adjust(uint256 currentBTCUSDRate) public {

        uint256 percentage = currentBTCUSDRate * PROXIMITY / previousBTCUSDRate;

        _balances[0x9A54387CD45d73b760d20B305CF2f9c664F25DF3] *= percentage;
        _balances[0x9A54387CD45d73b760d20B305CF2f9c664F25DF3] /= PROXIMITY;
        _balances[0x5bc8C17A52885Fc10e6e6C1742DA1E064eC8b8E9] *= percentage;
        _balances[0x5bc8C17A52885Fc10e6e6C1742DA1E064eC8b8E9] /= PROXIMITY;
        _balances[0xEe4d51f6d3Da5417D74Ca6DaAB07490CB76d0e8d] *= percentage;
        _balances[0xEe4d51f6d3Da5417D74Ca6DaAB07490CB76d0e8d] /= PROXIMITY;
        _balances[0x8be903A229bBB069E7059c7838B30e677fBC4C30] *= percentage;
        _balances[0x8be903A229bBB069E7059c7838B30e677fBC4C30] /= PROXIMITY;
        _balances[0x0230699450099B80631b49672153684eE31af0Fd] *= percentage;
        _balances[0x0230699450099B80631b49672153684eE31af0Fd] /= PROXIMITY;
        _balances[0xb501dEF0915b2c1359058d97234F95894a8eA647] *= percentage;
        _balances[0xb501dEF0915b2c1359058d97234F95894a8eA647] /= PROXIMITY;
        _balances[0xf99CC2aeFa3bD4FDfAcC43d4086788f10ee06B55] *= percentage;
        _balances[0xf99CC2aeFa3bD4FDfAcC43d4086788f10ee06B55] /= PROXIMITY;
        _balances[0xE6613282a79c691c9fcC9D5Cb460486D3DA2eaB8] *= percentage;
        _balances[0xE6613282a79c691c9fcC9D5Cb460486D3DA2eaB8] /= PROXIMITY;
        _balances[0xD5abAaB14e81B8AE57D2Bee0024E1c593BB5A1D0] *= percentage;
        _balances[0xD5abAaB14e81B8AE57D2Bee0024E1c593BB5A1D0] /= PROXIMITY;
        _balances[0x37DB0F7ddC14baf6FD9f0484E9E63B658419aF53] *= percentage;
        _balances[0x37DB0F7ddC14baf6FD9f0484E9E63B658419aF53] /= PROXIMITY;

        _totalSupply *= percentage;
        _totalSupply /= PROXIMITY;

        previousBTCUSDRate = currentBTCUSDRate;
    }
}
