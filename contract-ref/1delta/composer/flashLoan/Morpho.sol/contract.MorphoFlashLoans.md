# MorphoFlashLoans
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\flashLoan\Morpho.sol)

**Inherits:**
[Masks](\contracts\1delta\shared\masks\Masks.sol\abstract.Masks.md)

**Title:**
Morpho flash loans

**Author:**
1delta Labs AG


## Functions
### morphoFlashLoan

Executes Morpho flash loan

We allow ANY morpho style pool here

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 20             | asset                           |
| 20     | 20             | pool                            | <-- we allow ANY morpho style pool here
| 40     | 16             | amount                          |
| 56     | 2              | paramsLength                    |
| 58     | paramsLength   | params                          |


```solidity
function morphoFlashLoan(uint256 currentOffset, address callerAddress) internal returns (uint256);
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


