// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "./ERC20.sol";

contract USDBackedBTCToken is ERC20 {

    uint8 public constant DECIMALS = 18;
    uint256 public constant INITIAL_SUPPLY = 1000000 * (10 ** uint256(DECIMALS));

    /**
     * The starting Bitcoin to USD exchange rate to perform supply adjustments.
     */
    uint16 public previousBTCUSDRate = 10000;

    constructor () public ERC20("USDBackedBTCToken", "USDBTCT") {
    }

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }

    function adjust(address account, uint16 currentBTCUSDRate) public {
        uint16 percentage = previousBTCUSDRate * 100 / currentBTCUSDRate;
        _balances[account] = _balances[account] * percentage / 100;
        previousBTCUSDRate = currentBTCUSDRate;
    }
}
