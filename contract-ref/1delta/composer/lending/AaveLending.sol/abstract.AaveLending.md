# AaveLending
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\lending\AaveLending.sol)

**Inherits:**
[ERC20Selectors](\contract-ref\1delta\shared\selectors\ERC20Selectors.sol\abstract.ERC20Selectors.md), [Masks](\contract-ref\1delta\shared\masks\Masks.sol\abstract.Masks.md)

Lending base contract that wraps multiple Aave lender types (V2, V3, non-ir mode based).


## Functions
### _withdrawFromAave

Withdraws from Aave lending pool

Transfers collateral tokens from caller and withdraws underlying

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 20             | underlying                      |
| 20     | 16             | amount                          |
| 36     | 20             | receiver                        |
| 56     | 20             | aToken                          |
| 76     | 20             | pool                            |


```solidity
function _withdrawFromAave(uint256 currentOffset, address callerAddress) internal returns (uint256);
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


### _borrowFromAave

Borrows from Aave lending pool

Supports both IR mode and non-IR mode borrowing

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 20             | underlying                      |
| 20     | 16             | amount                          |
| 36     | 20             | receiver                        |
| 56     | 1              | mode                            |
| 57     | 20             | pool                            |


```solidity
function _borrowFromAave(uint256 currentOffset, address callerAddress) internal returns (uint256);
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


### _depositToAaveV3

Deposits to Aave V3 lending pool

Zero amount uses contract balance

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 20             | underlying                      |
| 20     | 16             | amount                          |
| 36     | 20             | receiver                        |
| 56     | 20             | pool                            |


```solidity
function _depositToAaveV3(uint256 currentOffset) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


### _depositToAaveV2

Deposits to Aave V2 lending pool

Zero amount uses contract balance

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 20             | underlying                      |
| 20     | 16             | amount                          |
| 36     | 20             | receiver                        |
| 56     | 20             | pool                            |


```solidity
function _depositToAaveV2(uint256 currentOffset) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


### _repayToAave

Repays debt to Aave lending pool

Supports both IR mode and non-IR mode. Zero amount uses contract balance.
Max amount (0xffffffffffffffffffffffffffff) repays minimum of contract balance and user debt.

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 20             | underlying                      |
| 20     | 16             | amount                          |
| 36     | 20             | receiver                        |
| 56     | 1              | mode                            |
| 57     | 20             | debtToken                       |
| 77     | 20             | pool                            |


```solidity
function _repayToAave(uint256 currentOffset) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


