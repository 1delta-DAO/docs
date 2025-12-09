# Permits
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\permit\Permits.sol)

**Inherits:**
[Masks](\contracts\1delta\shared\masks\Masks.sol\abstract.Masks.md), [PermitUtils](\contracts\1delta\shared\permit\PermitUtils.sol\abstract.PermitUtils.md), [DeltaErrors](\contracts\1delta\shared\errors\Errors.sol\abstract.DeltaErrors.md)


## Functions
### _permit

Executes a permit operation

Supports token permits, Aave V3 credit permits, and flag-based lending permits

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 1              | permitOperation                 |
| 1      | 20             | asset                           |
| 21     | 2              | permitLength                    |
| 23     | permitLength   | data                            |


```solidity
function _permit(uint256 currentOffset, address callerAddress) internal returns (uint256);
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


