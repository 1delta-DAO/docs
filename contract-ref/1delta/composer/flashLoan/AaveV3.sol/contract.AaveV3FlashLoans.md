# AaveV3FlashLoans
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\flashLoan\AaveV3.sol)

**Inherits:**
[Masks](\contract-ref\1delta\shared\masks\Masks.sol\abstract.Masks.md)

**Title:**
Aave V3 flash loan executor

**Author:**
1delta Labs AG


## Functions
### aaveV3FlashLoan

Executes Aave V3 flash loan

We allow ANY aave v3 style pool here

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 20             | asset                           |
| 20     | 20             | pool                            | <-- we allow ANY aave v3 style pool here
| 40     | 16             | amount                          |
| 56     | 2              | paramsLength                    |
| 58     | paramsLength   | params                          |


```solidity
function aaveV3FlashLoan(uint256 currentOffset, address callerAddress) internal returns (uint256);
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


