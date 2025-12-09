# Swaps
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\swappers\Swaps.sol)

**Inherits:**
[BaseSwapper](\contract-ref\1delta\composer\swappers\BaseSwapper.sol\abstract.BaseSwapper.md)

entrypoint for swaps
- supports a broad variety of DEXs
- this also is the entrypoint for flash-swaps, one only needs to
add calldata to the respective call to trigger it


## Functions
### _swap

Executes a swap operation

Decodes swap parameters and routes to appropriate DEX handler. Supports flash-swaps.

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 16             | amount               | <-- input amount
| 16     | 16             | amountMax            | <-- slippage check
| 32     | 20             | tokenIn              |
| 52     | any            | data                 |
`data` is a path matrix definition (see BaseSwapper)


```solidity
function _swap(uint256 currentOffset, address callerAddress) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|
|`callerAddress`|`address`|Address of the caller|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


