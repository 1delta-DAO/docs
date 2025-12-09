# SyncSwapper
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\swappers\dex\SyncSwapper.sol)

**Inherits:**
[ERC20Selectors](\contract-ref\1delta\shared\selectors\ERC20Selectors.sol\abstract.ERC20Selectors.md), [Masks](\contract-ref\1delta\shared\masks\Masks.sol\abstract.Masks.md)

**Title:**
SyncSwap style swapper, pre-funded, all pool variations


## State Variables
### SYNCSWAP_SELECTOR
selector for swap(bytes,address,address,bytes)


```solidity
bytes32 internal constant SYNCSWAP_SELECTOR = 0x7132bb7f00000000000000000000000000000000000000000000000000000000
```


## Functions
### _swapSyncExactIn

Swaps exact input on SyncSwap

Pre-funded, all pool variations. Pay flag: 0 = caller pays; 1 = contract pays; greater = pre-funded.

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | pool                 |
| 20     | 1              | pay flag             | <- 0: caller pays; 1: contract pays; greater: pre-funded


```solidity
function _swapSyncExactIn(
    uint256 fromAmount,
    address tokenIn,
    address receiver,
    address callerAddress,
    uint256 currentOffset //
)
    internal
    returns (uint256 buyAmount, uint256 payFlag);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`fromAmount`|`uint256`|Input amount|
|`tokenIn`|`address`|Input token address|
|`receiver`|`address`|Receiver address|
|`callerAddress`|`address`|Address of the caller|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`buyAmount`|`uint256`|Output amount|
|`payFlag`|`uint256`|Updated calldata offset after processing|


