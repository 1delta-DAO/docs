# GMXQuoter
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\quoter\dex\GMXV1Quoter.sol)


## Functions
### _getGMXAmountOut

Calculates amountOut for GMX V1 swaps

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | pool                 |
| 20     | 1              | not used in quoter   |


```solidity
function _getGMXAmountOut(
    address _tokenIn,
    address _tokenOut,
    uint256 amountIn,
    address receiverIsReader,
    uint256 currentOffset
)
    internal
    view
    returns (uint256 amountOut, uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tokenIn`|`address`|Input token address|
|`_tokenOut`|`address`|Output token address|
|`amountIn`|`uint256`|Input amount|
|`receiverIsReader`|`address`|Reader address for oracle queries|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|Output amount|
|`<none>`|`uint256`|Updated calldata offset after processing|


