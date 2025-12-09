# UniswapV4SingletonActions
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\singletons\UniswapV4Singleton.sol)

**Inherits:**
[Masks](\contracts\1delta\shared\masks\Masks.sol\abstract.Masks.md), [DeltaErrors](\contracts\1delta\shared\errors\Errors.sol\abstract.DeltaErrors.md)

Everything Uniswap V4 & Balancer V3, the major upgrades for DEXs in 2025


## State Variables
### TAKE

```solidity
bytes32 private constant TAKE = 0x0b0d9c0900000000000000000000000000000000000000000000000000000000
```


### SETTLE

```solidity
bytes32 private constant SETTLE = 0x11da60b400000000000000000000000000000000000000000000000000000000
```


### SYNC

```solidity
bytes32 private constant SYNC = 0xa584119400000000000000000000000000000000000000000000000000000000
```


## Functions
### _unoV4Take

Executes Uniswap V4 take operation

Takes tokens from Uniswap V4 pool manager

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description         |
|--------|----------------|---------------------|
| 0      | 20             | manager             |
| 20     | 20             | asset               |
| 40     | 20             | receiver            |
| 60     | 16             | amount              |


```solidity
function _unoV4Take(uint256 currentOffset) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


### _unoV4Sync

Executes Uniswap V4 sync operation

Syncs token balance in Uniswap V4 pool manager

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description   |
|--------|----------------|---------------|
| 0      | 20             | manager       |
| 20     | 20             | asset         |


```solidity
function _unoV4Sync(uint256 currentOffset) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


### _unoV4Settle

Executes Uniswap V4 settle operation

Settles flash loan debt with native tokens

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description       |
|--------|----------------|-------------------|
| 0      | 20             | manager           |
| 20     | 16             | nativeAmount      |


```solidity
function _unoV4Settle(uint256 currentOffset) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


