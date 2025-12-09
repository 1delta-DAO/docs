# CompoundV3Lending
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\lending\CompoundV3Lending.sol)

**Inherits:**
[ERC20Selectors](\contract-ref\1delta\shared\selectors\ERC20Selectors.sol\abstract.ERC20Selectors.md), [Masks](\contract-ref\1delta\shared\masks\Masks.sol\abstract.Masks.md)

Lending base contract that wraps Cmpound V3 markets


## Functions
### _withdrawFromCompoundV3

Withdraws from Compound V3 lending pool

Supports both base and collateral token withdrawals

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 20             | underlying                      |
| 20     | 16             | amount                          |
| 36     | 20             | receiver                        |
| 56     | 1              | isBase                          |
| 57     | 20             | pool                            |


```solidity
function _withdrawFromCompoundV3(uint256 currentOffset, address callerAddress) internal returns (uint256);
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


### _borrowFromCompoundV3

Borrows from Compound V3 lending pool

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 20             | underlying                      |
| 20     | 16             | amount                          |
| 36     | 20             | receiver                        |
| 56     | 20             | comet                           |


```solidity
function _borrowFromCompoundV3(uint256 currentOffset, address callerAddress) internal returns (uint256);
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


### _depositToCompoundV3

Deposits to Compound V3 lending pool

Zero amount uses contract balance

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 20             | underlying                      |
| 20     | 16             | amount                          |
| 36     | 20             | receiver                        |
| 56     | 20             | comet                           |


```solidity
function _depositToCompoundV3(uint256 currentOffset) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


### _repayToCompoundV3

Repays debt to Compound V3 lending pool

Zero amount uses contract balance. Max amount (0xffffffffffffffffffffffffffff) repays minimum of contract balance and user debt.

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 20             | underlying                      |
| 20     | 16             | amount                          |
| 36     | 20             | receiver                        |
| 56     | 20             | comet                           |


```solidity
function _repayToCompoundV3(uint256 currentOffset) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


