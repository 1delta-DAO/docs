# LBQuoter
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\quoter\dex\LBQuoter.sol)

**Inherits:**
[Masks](\contract-ref\1delta\shared\masks\Masks.sol\abstract.Masks.md)


## Functions
### _getLBAmountOut

Calculates amountOut for LB (Liquidity Book) pools

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | pool                 |
| 20     | 1              | swapForY             |
| 21     | 1              | not used in quoter   |


```solidity
function _getLBAmountOut(
    uint256 amountIn,
    uint256 currentOffset //
)
    internal
    view
    returns (uint256 amountOut, uint256 lbDataThenOffset);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amountIn`|`uint256`|Input amount|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|Output amount|
|`lbDataThenOffset`|`uint256`|Updated calldata offset after processing|


