# V2TypeQuoter
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\quoter\dex\V2TypeQuoter.sol)

**Inherits:**
[ERC20Selectors](\contract-ref\1delta\shared\selectors\ERC20Selectors.sol\abstract.ERC20Selectors.md), [Masks](\contract-ref\1delta\shared\masks\Masks.sol\abstract.Masks.md)


## Functions
### _getV2TypeAmountOut

Calculates amountOut for Uniswap V2 style pools

Does not require overflow checks

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | pool                 |
| 20     | 2              | feeDenom             |
| 22     | 1              | forkId               |
| 23     | 2              | calldataLength       | <-- 0: pay from self; 1: caller pays; 3: pre-funded;
| 25     | calldataLength | calldata             |


```solidity
function _getV2TypeAmountOut(
    uint256 sellAmount,
    address tokenIn,
    address tokenOut,
    uint256 currentOffset
)
    internal
    view
    returns (uint256, uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sellAmount`|`uint256`|Input amount|
|`tokenIn`|`address`|Input token address|
|`tokenOut`|`address`|Output token address|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|buyAmount Output amount|
|`<none>`|`uint256`|Updated calldata offset after processing|


