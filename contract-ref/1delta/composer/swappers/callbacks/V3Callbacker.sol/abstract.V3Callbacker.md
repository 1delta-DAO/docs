# V3Callbacker
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\swappers\callbacks\V3Callbacker.sol)

**Inherits:**
[ERC20Selectors](\contract-ref\1delta\shared\selectors\ERC20Selectors.sol\abstract.ERC20Selectors.md)

**Title:**
Uniswap V3 type callback implementations

Author: Achthar | 1delta
/*****************************************************************************


## Functions
### clSwapCallback

This functione executes a simple transfer to shortcut the callback if there is no further calldata


```solidity
function clSwapCallback(uint256 amountToPay, address tokenIn, address callerAddress, uint256 calldataLength) internal;
```

### _deltaComposeInternal


```solidity
function _deltaComposeInternal(address callerAddress, uint256 offset, uint256 length) internal virtual;
```

