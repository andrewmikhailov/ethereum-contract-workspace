pragma solidity ^0.6.0;

import "ERC20.sol";

contract USDBackedToken is ERC20 {

    uint8 public constant DECIMALS = 18;
    uint256 public constant INITIAL_SUPPLY = 1000000 * (10 ** uint256(DECIMALS));

    constructor () public ERC20("SimpleToken", "SIM") {
    }

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }
}
