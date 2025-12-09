# Transfers
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\transfers\Transfers.sol)

**Inherits:**
[AssetTransfers](\contract-ref\1delta\composer\transfers\AssetTransfers.sol\contract.AssetTransfers.md)

**Title:**
Token transfer contract

Should work across all EVMs - uses Uniswap style Permit2


## Functions
### _transfers

Routes to appropriate transfer operation based on operation ID

Supports transferFrom, sweep, unwrap, permit2TransferFrom, and approve operations

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description     |
|--------|----------------|-----------------|
| 0      | 1              | transferOperation|


```solidity
function _transfers(uint256 currentOffset, address callerAddress) internal returns (uint256);
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


