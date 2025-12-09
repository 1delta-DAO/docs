# SiloV2Lending
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\lending\SiloV2Lending.sol)

**Inherits:**
[ERC20Selectors](\contracts\1delta\shared\selectors\ERC20Selectors.sol\abstract.ERC20Selectors.md), [Masks](\contracts\1delta\shared\masks\Masks.sol\abstract.Masks.md)

Lending base contract that wraps Silos (v2).


## State Variables
### WITHDRAW

```solidity
bytes32 private constant WITHDRAW = 0xb460af9400000000000000000000000000000000000000000000000000000000
```


### WITHDRAW_WITH_COLLATERAL_TYPE

```solidity
bytes32 private constant WITHDRAW_WITH_COLLATERAL_TYPE = 0xb8337c2a00000000000000000000000000000000000000000000000000000000
```


### REDEEM

```solidity
bytes32 private constant REDEEM = 0xba08765200000000000000000000000000000000000000000000000000000000
```


### REDEEM_WITH_COLLATERAL_TYPE

```solidity
bytes32 private constant REDEEM_WITH_COLLATERAL_TYPE = 0xda53766000000000000000000000000000000000000000000000000000000000
```


### BORROW

```solidity
bytes32 private constant BORROW = 0xd516418400000000000000000000000000000000000000000000000000000000
```


### BORROW_SHARES

```solidity
bytes32 private constant BORROW_SHARES = 0x889576f700000000000000000000000000000000000000000000000000000000
```


### DEPOSIT

```solidity
bytes32 private constant DEPOSIT = 0x6e553f6500000000000000000000000000000000000000000000000000000000
```


### DEPOSIT_WITH_COLLATERAL_TYPE

```solidity
bytes32 private constant DEPOSIT_WITH_COLLATERAL_TYPE = 0xb7ec8d4b00000000000000000000000000000000000000000000000000000000
```


### MAX_REPAY

```solidity
bytes32 private constant MAX_REPAY = 0x5f30114900000000000000000000000000000000000000000000000000000000
```


### REPAY

```solidity
bytes32 private constant REPAY = 0xacb7081500000000000000000000000000000000000000000000000000000000
```


## Functions
### _withdrawFromSiloV2

Withdraws from Silo V2 lending pool

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 16             | amount                          |
| 16     | 20             | receiver                        |
| 36     | 20             | silo                            |


```solidity
function _withdrawFromSiloV2(uint256 currentOffset, address callerAddress) internal returns (uint256);
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


### _borrowFromSiloV2

Borrows from Silo V2 lending pool

Supports borrowing by assets or shares

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 16             | amount                          |
| 16     | 20             | receiver                        |
| 36     | 20             | silo                            |


```solidity
function _borrowFromSiloV2(uint256 currentOffset, address callerAddress) internal returns (uint256);
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


### _depositToSiloV2

Deposits to Silo V2 lending pool

Zero amount uses contract balance

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 20             | underlying                      |
| 20     | 16             | amount                          |
| 36     | 20             | receiver                        |
| 56     | 20             | silo                            |


```solidity
function _depositToSiloV2(uint256 currentOffset) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


### _repayToSiloV2

Repays debt to Silo V2 lending pool

Zero amount uses contract balance. Max amount (0xffffffffffffffffffffffffffff) repays minimum of contract balance and user debt.

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 20             | underlying                      |
| 20     | 16             | amount                          |
| 36     | 20             | receiver                        |
| 56     | 20             | silo                            |


```solidity
function _repayToSiloV2(uint256 currentOffset) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


