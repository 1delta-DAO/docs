# ExternalCall
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\generic\ExternalCall.sol)

**Inherits:**
[BaseUtils](\contracts\1delta\composer\generic\BaseUtils.sol\contract.BaseUtils.md)

External call on call forwarder which can safely execute any calls for a specific selector
without compromising this contract


## State Variables
### DELTA_FORWARD_COMPOSE
selector for deltaForwardCompose(bytes)


```solidity
bytes32 private constant DELTA_FORWARD_COMPOSE = 0x6a0c90ff00000000000000000000000000000000000000000000000000000000
```


## Functions
### _callExternal

Executes an external call through a call forwarder with a pre-determined selector

This is not a real external call, this one has a pre-determined selector
that prevents collision with any calls that can be made in this contract.
This prevents unauthorized calls that would pull funds from other users.
On top of that, this makes the contract arbitrarily extensible.

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | target               |
| 20     | 16             | nativeValue          |
| 36     | 2              | calldataLength       |
| 38     | calldataLength | calldata             |


```solidity
function _callExternal(uint256 currentOffset) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


