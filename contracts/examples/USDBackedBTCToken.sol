// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "./ERC20.sol";

contract USDBackedBTCToken is ERC20 {

    uint256 public constant PROXIMITY = 1000;
    uint256 public constant DECIMALS = 18;
    uint256 public constant INITIAL_SUPPLY = 1000000 * (10 ** uint256(DECIMALS));

    /**
     * The starting Bitcoin to USD exchange rate to perform supply adjustments.
     */
    uint256 public previousBTCUSDRate = 10000;

    constructor () public ERC20("USDBackedBTCToken", "USDBTCT") {
    }

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }

    function adjust(address account, uint256 percentage) internal {
        _balances[account] = _balances[account] * percentage / PROXIMITY;
    }

    function adjustTotalSupply(uint256 percentage) internal {
        _totalSupply = _totalSupply * percentage / PROXIMITY;
    }

    function calculatePercentage(uint256 currentBTCUSDRate) internal returns (uint256) {
        uint256 percentage = currentBTCUSDRate * PROXIMITY / previousBTCUSDRate;
        return percentage;
    }
}
