# BalancerV3VaultActions
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\singletons\BalancerV3Vault.sol)

**Inherits:**
[Masks](\contracts\1delta\shared\masks\Masks.sol\abstract.Masks.md), [DeltaErrors](\contracts\1delta\shared\errors\Errors.sol\abstract.DeltaErrors.md)

Balancer V3 actions


## State Variables
### SEND_TO
UniV4 pendant: take()


```solidity
bytes32 private constant SEND_TO = 0xae63932900000000000000000000000000000000000000000000000000000000
```


### SETTLE
same selector string name as for UniV4, different params for balancer


```solidity
bytes32 private constant SETTLE = 0x15afd40900000000000000000000000000000000000000000000000000000000
```


## Functions
### constructor


```solidity
constructor() ;
```

### _encodeBalancerV3Take

Executes Balancer V3 take operation

Takes tokens from Balancer V3 vault manager

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description         |
|--------|----------------|---------------------|
| 0      | 20             | manager             |
| 20     | 20             | asset               |
| 40     | 20             | receiver            |
| 60     | 16             | amount              |


```solidity
function _encodeBalancerV3Take(uint256 currentOffset) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


### _balancerV3Settle

Executes Balancer V3 settle operation

Settles flash loan debt. Asset is never native.

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description       |
|--------|----------------|-------------------|
| 0      | 20             | manager           |
| 20     | 20             | asset             | <-- never native
| 40     | 16             | amountHint        |


```solidity
function _balancerV3Settle(uint256 currentOffset) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


