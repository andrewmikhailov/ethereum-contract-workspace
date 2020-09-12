pragma solidity ^0.6.0;

contract Empty{
    uint8 public constant DECIMALS = 18;
    uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(DECIMALS));
    constructor () public {
    }
}
