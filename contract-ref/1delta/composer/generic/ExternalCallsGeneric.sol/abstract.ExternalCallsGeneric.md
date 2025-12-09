# ExternalCallsGeneric
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\generic\ExternalCallsGeneric.sol)

**Inherits:**
[BaseUtils](\contracts\1delta\composer\generic\BaseUtils.sol\contract.BaseUtils.md)

External call on any target - prevents `transferFrom` selector & call on Permit2


## State Variables
### SELECTOR_MASK
mask for selector in calldata


```solidity
bytes32 private constant SELECTOR_MASK = 0xffffffff00000000000000000000000000000000000000000000000000000000
```


### FORBIDDEN

```solidity
bytes4 private constant FORBIDDEN = 0xee90c468
```


## Functions
### _callExternal

Executes an external call on any target

Prevents `transferFrom` selector and calls on Permit2

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | target               |
| 20     | 16             | nativeValue          |
| 36     | 2              | calldataLength:  cl  |
| 38     | cl             | calldata             |


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


### _tryCallExternal

Executes an external call with error handling

Prevents `transferFrom` selector and calls on Permit2. Supports catch blocks for error handling.

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | target               |
| 20     | 16             | nativeValue          |
| 36     | 2              | calldataLength:  cl  |
| 38     | cl             | calldata             |
| 38+cl  | 1              | catchHandling        | <- 0: revert; 1: exit in catch if revert; else continue after catch
| 39+cl  | 2              | catchDataLength: dl  |
| 41+cl  | dl             | catchData            |


```solidity
function _tryCallExternal(uint256 currentOffset, address callerAddress) internal returns (uint256);
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


### _callExternalWithReplace

Executes an external call with token amount replacement

Prevents `transferFrom` selector and calls on Permit2. Can replace token amounts in calldata.

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                                |
|--------|----------------|--------------------------------------------|
| 0      | 20             | target                                     |
| 20     | 16             | nativeValue                                |
| 36     | 20             | token (zero to skip replacement)           |
| 56     | 2              | replaceOffset (byte offset after selector) |
| 58     | 2              | calldataLength: cl                         |
| 60     | cl             | calldata                                   |


```solidity
function _callExternalWithReplace(uint256 currentOffset) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


### _tryCallExternalWithReplace

Executes an external call with token amount replacement and error handling

Prevents `transferFrom` selector and calls on Permit2. Can replace token amounts in calldata. Supports catch blocks.

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                                |
|--------|----------------|--------------------------------------------|
| 0      | 20             | target                                     |
| 20     | 16             | nativeValue                                |
| 36     | 20             | token (zero to skip replacement)           |
| 56     | 2              | replaceOffset (byte offset after selector) |
| 58     | 2              | calldataLength: cl                         |
| 60     | 1              | catchHandling                              | <- 0: revert; 1: exit in catch if revert; else continue after catch
| 61     | 2              | catchDataLength: dl                        |
| 63     | cl             | calldata                                   |
| 63+cl  | dl             | catchData                                  |


```solidity
function _tryCallExternalWithReplace(uint256 currentOffset, address callerAddress) internal returns (uint256);
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


### _deltaComposeInternal


```solidity
function _deltaComposeInternal(
    address callerAddress,
    uint256 currentOffset,
    uint256 calldataLength //
)
    internal
    virtual;
```

