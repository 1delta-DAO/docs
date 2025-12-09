# AssetTransfers
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\transfers\AssetTransfers.sol)

**Inherits:**
[BaseUtils](\contract-ref\1delta\composer\generic\BaseUtils.sol\contract.BaseUtils.md)

**Title:**
Token transfer contract - should work across all EVMs - use Uniswap style Permit2


## State Variables
### CALL_MANAGEMENT_APPROVALS

```solidity
bytes32 private constant CALL_MANAGEMENT_APPROVALS = 0x1aae13105d9b6581c36534caba5708726e5ea1e03175e823c989a5756966d1f3
```


### PERMIT2_TRANSFER_FROM
fixed selector transferFrom(...) on permit2


```solidity
bytes32 private constant PERMIT2_TRANSFER_FROM = 0x36c7851600000000000000000000000000000000000000000000000000000000
```


### PERMIT2
deterministically deployed pemrit2 address


```solidity
address private constant PERMIT2 = 0x000000000022D473030F116dDEE9F6B43aC78BA3
```


## Functions
### _permit2TransferFrom

Transfers tokens from caller to this address using Permit2

Zero amount flags that the entire balance is sent

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description         |
|--------|----------------|---------------------|
| 0      | 20             | asset               |
| 20     | 20             | receiver            |
| 40     | 16             | amount              |


```solidity
function _permit2TransferFrom(uint256 currentOffset, address callerAddress) internal returns (uint256);
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


### _transferFrom

Transfers tokens from caller to this address

Zero amount flags that the entire balance is sent

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description         |
|--------|----------------|---------------------|
| 0      | 20             | asset               |
| 20     | 20             | receiver            |
| 40     | 16             | amount              |


```solidity
function _transferFrom(uint256 currentOffset, address callerAddress) internal returns (uint256);
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


### _sweep

Transfers either token or native balance from this contract to receiver

Reverts if minAmount is less than the contract balance.
Config: 0 = sweep balance and validate against amount (fetches balance and checks balance >= amount),
1 = transfer amount to receiver, skip validation.
Use wrapped native address as receiver to wrap native tokens.
amount:=0 and config:=0 means to sweep the entire balance

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description         |
|--------|----------------|---------------------|
| 0      | 20             | asset               |
| 20     | 20             | receiver            | <- use wrapped native here to wrap
| 40     | 1              | config              |
| 41     | 16             | amount              |


```solidity
function _sweep(uint256 currentOffset) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


### _approve

Approves a token for a target address

Skips approval if already approved to save gas. Uses a storage mapping to track approvals:
`keccak256(target, keccak256(token, CALL_MANAGEMENT_APPROVALS))` -> boolean (1 if approved, 0 if not).
If the mapping value is 0, the function approves MAX_UINT256 to the target and sets the mapping to 1.

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | token                |
| 20     | 20             | target               |


```solidity
function _approve(uint256 currentOffset) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


### _unwrap

Unwraps wrapped native tokens and transfers to receiver

Reverts if minAmount is less than the contract balance.
Config: 0 = sweep balance and validate against amount (fetches balance and checks balance >= amount),
1 = transfer amount to receiver, skip validation.

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description         |
|--------|----------------|---------------------|
| 0      | 20             | wrappedNativeAddress|
| 20     | 20             | receiver            |
| 40     | 1              | config              |
| 41     | 16             | amount              |


```solidity
function _unwrap(uint256 currentOffset) internal virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


