// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MockStablecoin
 * @dev Mock ERC20 stablecoin for testing HealthLink platform
 */
contract MockStablecoin is ERC20, Ownable {
    uint8 private _decimals;
    
    /**
     * @dev Constructor that gives msg.sender all of existing tokens
     */
    constructor(
        string memory name,
        string memory symbol,
        uint8 decimalsValue,
        uint256 initialSupply
    ) ERC20(name, symbol) {
        _decimals = decimalsValue;
        _mint(msg.sender, initialSupply * 10**decimalsValue);
    }
    
    /**
     * @dev Returns the number of decimals used to get its user representation
     */
    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }
    
    /**
     * @dev Mint new tokens (only owner)
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
    
    /**
     * @dev Faucet function for testing - allows anyone to mint 1000 tokens
     */
    function faucet() external {
        _mint(msg.sender, 1000 * 10**_decimals);
    }
    
    /**
     * @dev Burn tokens from caller's balance
     * @param amount Amount of tokens to burn
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
