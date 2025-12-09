# BalancerV3Quoter
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\quoter\dex\BalancerV3Quoter.sol)

**Inherits:**
[QuoterUtils](\contract-ref\1delta\composer\quoter\dex\utils\QuoterUtils.sol\abstract.QuoterUtils.md), [Masks](\contract-ref\1delta\shared\masks\Masks.sol\abstract.Masks.md)


## State Variables
### SWAP
We need all these selectors for executing a single swap


```solidity
bytes32 private constant SWAP = 0x2bfb780c00000000000000000000000000000000000000000000000000000000
```


## Functions
### constructor


```solidity
constructor() ;
```

### balancerQueryCallback

Callback from uniswap V4 type singletons
As Balancer V3 shares the same trigger selector and (unlike this one) has
a custom selector provided, we need to skip this part of the data
This is mainly done to not have duplicate code and maintain
the same level of security by callback validation for both DEX types


```solidity
function balancerQueryCallback(bytes calldata data) external returns (uint256);
```

### _getBalancerV3TypeAmountOut

Calculates amountOut for Balancer V3 pools

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | pool                 |
| 20     | 20             | manager              |
| 40     | 1              | payFlag              |
| 41     | 2              | calldataLength       | <- this here might be pool-dependent, cannot be used as flag
| 43     | calldataLength | calldata             |


```solidity
function _getBalancerV3TypeAmountOut(
    uint256 fromAmount,
    address tokenIn,
    address tokenOut,
    uint256 currentOffset
)
    internal
    returns (uint256 receivedAmount, uint256);
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
|`<none>`|`uint256`|Updated calldata offset after processing|


### _simSwapBalancerV3ExactInGeneric

Simulates a swap on Balancer V3 pools

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | pool                 |
| 20     | 20             | manager              |
| 40     | 1              | payFlag              |
| 41     | 2              | calldataLength       | <- this here might be pool-dependent, cannot be used as flag
| 43     | calldataLength | calldata             |


```solidity
function _simSwapBalancerV3ExactInGeneric(
    uint256 fromAmount,
    address tokenIn, //
    address tokenOut,
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


