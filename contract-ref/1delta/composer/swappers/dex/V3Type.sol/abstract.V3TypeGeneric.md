# V3TypeGeneric
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\swappers\dex\V3Type.sol)

**Inherits:**
[Masks](\contract-ref\1delta\shared\masks\Masks.sol\abstract.Masks.md)

**Title:**
Uniswap V3 type swapper contract

Executes Cl swaps and pushes data to the callbacks
the data can be empty, the callback then jsut fills the swap


## Functions
### constructor


```solidity
constructor() ;
```

### _swapUniswapV3PoolExactInGeneric

Swaps exact input on Uniswap V3 type pools

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
function _swapUniswapV3PoolExactInGeneric(
    uint256 fromAmount,
    address tokenIn,
    address tokenOut,
    address receiver,
    uint256 currentOffset,
    address callerAddress
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
|`receiver`|`address`|Receiver address|
|`currentOffset`|`uint256`|Current position in the calldata|
|`callerAddress`|`address`|Address of the caller|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`receivedAmount`|`uint256`|Output amount|
|`<none>`|`uint256`|Updated calldata offset after processing|


### _swapIZIPoolExactInGeneric

Swap exact input through izumi


```solidity
function _swapIZIPoolExactInGeneric(
    uint256 fromAmount,
    address tokenIn,
    address tokenOut,
    address receiver,
    uint256 currentOffset,
    address callerAddress
)
    internal
    returns (uint256 receivedAmount, uint256);
```

