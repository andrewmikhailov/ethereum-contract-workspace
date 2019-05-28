pragma solidity ^0.5.2;

import "ERC20.sol";
import "ERC20Detailed.sol";

contract Fort is ERC20, ERC20Detailed {

    uint8 public constant DECIMALS = 18;
    uint256 public constant INITIAL_SUPPLY = 3000000 * (10 ** uint256(DECIMALS));

    constructor () public ERC20Detailed("Fort", "FORT", DECIMALS) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
