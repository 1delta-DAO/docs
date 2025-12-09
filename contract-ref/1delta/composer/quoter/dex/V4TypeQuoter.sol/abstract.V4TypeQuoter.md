# V4TypeQuoter
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\quoter\dex\V4TypeQuoter.sol)

**Inherits:**
[QuoterUtils](\contract-ref\1delta\composer\quoter\dex\utils\QuoterUtils.sol\abstract.QuoterUtils.md), [Masks](\contract-ref\1delta\shared\masks\Masks.sol\abstract.Masks.md)


## State Variables
### SWAP
We need all these selectors for executing a single swap


```solidity
bytes32 private constant SWAP = 0xf3cd914c00000000000000000000000000000000000000000000000000000000
```


### EXTTLOAD

```solidity
bytes32 private constant EXTTLOAD = 0x9bf6645f00000000000000000000000000000000000000000000000000000000
```


## Functions
### constructor


```solidity
constructor() ;
```

### unlockCallback

Callback from uniswap V4 type singletons
As Balancer V3 shares the same trigger selector and (unlike this one) has
a custom selector provided, we need to skip this part of the data
This is mainly done to not have duplicate code and maintain
the same level of security by callback validation for both DEX types


```solidity
function unlockCallback(bytes calldata data) external;
```

### _getV4TypeAmountOut

Calculates amountOut for Uniswap V4 style pools

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | hooks                |
| 20     | 20             | manager              |
| 40     | 3              | fee                  |
| 43     | 3              | tickSpacing          |
| 46     | 1              | payFlag              |
| 47     | 2              | calldataLength       |
| 49     | calldataLength | calldata             |


```solidity
function _getV4TypeAmountOut(
    uint256 fromAmount,
    address tokenIn,
    address tokenOut,
    uint256 currentOffset
)
    internal
    returns (
        uint256 receivedAmount,
        // similar to other implementations, we use this temp variable
        // to avoid stackToo deep
        uint256 tempVar
    );
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`fromAmount`|`uint256`|Input amount|
|`tokenIn`|`address`|Input token address|
|`tokenOut`|`address`|Output token address|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`receivedAmount`|`uint256`|Output amount|
|`tempVar`|`uint256`|Updated calldata offset after processing|


### _simSwapUniswapV4ExactInGeneric

Simulates a swap on Uniswap V4 pools

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | hooks                |
| 20     | 20             | manager              |
| 40     | 3              | fee                  |
| 43     | 3              | tickSpacing          |
| 46     | 1              | payFlag              |
| 47     | 2              | calldataLength       |
| 49     | calldataLength | calldata             |


```solidity
function _simSwapUniswapV4ExactInGeneric(
    uint256 fromAmount,
    address tokenIn,
    address tokenOut, //
    uint256 currentOffset
)
    internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`fromAmount`|`uint256`|Input amount|
|`tokenIn`|`address`|Input token address|
|`tokenOut`|`address`|Output token address|
|`currentOffset`|`uint256`|Current position in the calldata|


