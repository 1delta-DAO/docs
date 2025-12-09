# GMXSwapper
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\swappers\dex\GMXSwapper.sol)

**Inherits:**
[ERC20Selectors](\contract-ref\1delta\shared\selectors\ERC20Selectors.sol\abstract.ERC20Selectors.md), [Masks](\contract-ref\1delta\shared\masks\Masks.sol\abstract.Masks.md)

**Title:**
GMX V1 swapper, works for most forks, too


## Functions
### _swapGMXExactIn

Swaps exact input on GMX V1

Works for most forks too. Pay flag: 0 = caller pays; 1 = contract pays; greater = pre-funded.

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | pool                 |
| 20     | 1              | pay flag             | <- 0: caller pays; 1: contract pays; greater: pre-funded


```solidity
function _swapGMXExactIn(
    uint256 fromAmount,
    address tokenIn,
    address tokenOut,
    address receiver, //
    address callerAddress,
    uint256 currentOffset
)
    internal
    returns (uint256 amountOut, uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`fromAmount`|`uint256`|Input amount|
|`tokenIn`|`address`|Input token address|
|`tokenOut`|`address`|Output token address|
|`receiver`|`address`|Receiver address|
|`callerAddress`|`address`|Address of the caller|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|Output amount|
|`<none>`|`uint256`|Updated calldata offset after processing|


