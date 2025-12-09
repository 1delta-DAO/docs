# CompoundV2Lending
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\lending\CompoundV2Lending.sol)

**Inherits:**
[ERC20Selectors](\contract-ref\1delta\shared\selectors\ERC20Selectors.sol\abstract.ERC20Selectors.md), [Masks](\contract-ref\1delta\shared\masks\Masks.sol\abstract.Masks.md)

Lending base contract that wraps multiple Compound V2 lender types.
Most effective for Venus


## State Variables
### NATIVE_TRANSFER_FAILED

```solidity
bytes4 private constant NATIVE_TRANSFER_FAILED = 0xf4b3b1bc
```


## Functions
### _borrowFromCompoundV2

Borrows from Compound V2 lending pool

Note this is for Venus Finance only as other Compound forks do not have this feature

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 20             | underlying                      |
| 20     | 16             | amount                          |
| 36     | 20             | receiver                        |
| 56     | 20             | cToken                          |


```solidity
function _borrowFromCompoundV2(uint256 currentOffset, address callerAddress) internal returns (uint256);
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


### _withdrawFromCompoundV2

Withdraws from Compound V2 lending pool

Supports both transferFrom and redeemBehalf modes

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 20             | underlying                      |
| 20     | 16             | amount                          |
| 36     | 20             | receiver                        |
| 56     | 20             | cToken                          |


```solidity
function _withdrawFromCompoundV2(uint256 currentOffset, address callerAddress) internal returns (uint256);
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


### _depositToCompoundV2

Deposits to Compound V2 lending pool

Note: Some Compound V2 forks might not have this feature and need a separate function.
Supports both native and ERC20 tokens. Zero amount uses contract balance.

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 20             | underlying                      |
| 20     | 16             | amount                          |
| 36     | 20             | receiver                        |
| 56     | 20             | cToken                          |


```solidity
function _depositToCompoundV2(uint256 currentOffset) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


### _repayToCompoundV2

Repays debt to Compound V2 lending pool

Supports both native and ERC20 tokens. Zero amount uses contract balance. Max amount (0xffffffffffffffffffffffffffff) repays minimum of contract balance and user debt.

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 20             | underlying                      |
| 20     | 16             | amount                          |
| 36     | 20             | receiver                        |
| 56     | 20             | cToken                          |


```solidity
function _repayToCompoundV2(uint256 currentOffset) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


