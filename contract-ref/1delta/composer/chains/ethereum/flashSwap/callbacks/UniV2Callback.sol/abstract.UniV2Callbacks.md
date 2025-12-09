# UniV2Callbacks
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\chains\ethereum\flashSwap\callbacks\UniV2Callback.sol)

**Inherits:**
[Masks](\contracts\1delta\shared\masks\Masks.sol\abstract.Masks.md), [DeltaErrors](\contracts\1delta\shared\errors\Errors.sol\abstract.DeltaErrors.md)

**Title:**
Contract Module for general Margin Trading on an borrow delegation compatible Lender

Author: Achthar | 1delta
/*****************************************************************************

Contains main logic for uniswap-type callbacks and initiator functions


## State Variables
### UNISWAP_V2_FF_FACTORY

```solidity
bytes32 private constant UNISWAP_V2_FF_FACTORY = 0xff5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f0000000000000000000000
```


### UNISWAP_V2_CODE_HASH

```solidity
bytes32 private constant UNISWAP_V2_CODE_HASH = 0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f
```


### SUSHISWAP_V2_FF_FACTORY

```solidity
bytes32 private constant SUSHISWAP_V2_FF_FACTORY = 0xffC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac0000000000000000000000
```


### SUSHISWAP_V2_CODE_HASH

```solidity
bytes32 private constant SUSHISWAP_V2_CODE_HASH = 0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f
```


### PANCAKESWAP_V2_FF_FACTORY

```solidity
bytes32 private constant PANCAKESWAP_V2_FF_FACTORY = 0xff1097053Fd2ea711dad45caCcc45EfF7548fCB3620000000000000000000000
```


### PANCAKESWAP_V2_CODE_HASH

```solidity
bytes32 private constant PANCAKESWAP_V2_CODE_HASH = 0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5
```


## Functions
### _executeUniV2IfSelector

Generic Uniswap V2 style callback executor

Validates the callback selector and executes compose operations

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                  |
|--------|----------------|------------------------------|
| 0      | 4              | selector                     |
| 4      | 20             | sender (must be this)        |
| 24     | 140            | callbackData                 |
| 164    | 20             | callerAddress                |
| 184    | 20             | tokenIn                      |
| 204    | 20             | tokenOut                     |
| 224    | 1              | forkId                       |
| 225    | 2              | calldataLength               |
| 227    | Variable       | composeOperations            |


```solidity
function _executeUniV2IfSelector(bytes32 selector) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`selector`|`bytes32`|The function selector to match|


### _deltaComposeInternal

Internal function to execute compose operations

Override point for swap callbacks to execute compose operations


```solidity
function _deltaComposeInternal(address callerAddress, uint256 offset, uint256 length) internal virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`callerAddress`|`address`|Address of the original caller|
|`offset`|`uint256`|Current calldata offset|
|`length`|`uint256`|Length of remaining calldata|


