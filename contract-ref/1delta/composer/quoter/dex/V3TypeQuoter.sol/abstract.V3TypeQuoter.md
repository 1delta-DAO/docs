# V3TypeQuoter
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\quoter\dex\V3TypeQuoter.sol)

**Inherits:**
[QuoterUtils](\contracts\1delta\composer\quoter\dex\utils\QuoterUtils.sol\abstract.QuoterUtils.md), [Masks](\contracts\1delta\shared\masks\Masks.sol\abstract.Masks.md)


## Functions
### _getV3TypeAmountOut

Calculates amountOut for Uniswap V3 style pools

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | pool                 |
| 20     | 1              | forkId               |
| 21     | 2              | fee                  |
| 23     | 2              | calldataLength       |
| 25     | calldataLength | calldata             |


```solidity
function _getV3TypeAmountOut(
    uint256 amountIn,
    address tokenIn,
    address tokenOut,
    uint256 currentOffset
)
    internal
    returns (uint256 amountOut, uint256 newOffset);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amountIn`|`uint256`|Input amount|
|`tokenIn`|`address`|Input token address|
|`tokenOut`|`address`|Output token address|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|Output amount|
|`newOffset`|`uint256`|Updated calldata offset after processing|


### _getIzumiAmountOut

Calculates amountOut for Izumi pools

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | pool                 |
| 20     | 1              | forkId               |
| 21     | 2              | fee                  |
| 23     | 2              | calldataLength       |
| 25     | calldataLength | calldata             |


```solidity
function _getIzumiAmountOut(
    uint256 amountIn,
    address tokenIn,
    address tokenOut,
    uint256 currentOffset
)
    internal
    returns (uint256 amountOut, uint256 newOffset);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amountIn`|`uint256`|Input amount|
|`tokenIn`|`address`|Input token address|
|`tokenOut`|`address`|Output token address|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|Output amount|
|`newOffset`|`uint256`|Updated calldata offset after processing|


### fallback


```solidity
fallback() external;
```

### swapY2XCallback


```solidity
function swapY2XCallback(uint256 x, uint256, bytes calldata) external pure;
```

### swapX2YCallback


```solidity
function swapX2YCallback(uint256, uint256 y, bytes calldata) external pure;
```

