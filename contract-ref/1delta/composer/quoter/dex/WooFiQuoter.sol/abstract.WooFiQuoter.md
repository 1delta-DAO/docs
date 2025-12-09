# WooFiQuoter
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\quoter\dex\WooFiQuoter.sol)


## State Variables
### WOO_ROUTER

```solidity
address internal constant WOO_ROUTER = 0x4c4AF8DBc524681930a27b2F1Af5bcC8062E6fB7
```


## Functions
### _getWooFiAmountOut

Calculates amountOut for WooFi swaps

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | pool                 |
| 20     | 1              | padding              |


```solidity
function _getWooFiAmountOut(
    address tokenIn,
    address tokenOut,
    uint256 amountIn,
    uint256 currentOffset
)
    internal
    view
    returns (uint256 amountOut, uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenIn`|`address`|Input token address|
|`tokenOut`|`address`|Output token address|
|`amountIn`|`uint256`|Input amount|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|Output amount|
|`<none>`|`uint256`|Updated calldata offset after processing|


