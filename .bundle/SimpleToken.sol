// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "./ERC20.sol";

contract SimpleToken is ERC20 {
    uint8 public constant DECIMALS = 18;
    uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(DECIMALS));

    constructor () ERC20("SimpleToken", "SIM") {
    }

    function mint(address account, uint256 amount) public {
      _mint(account, amount);
    }
}
