# AaveV2FlashLoanCallback
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\chains\ethereum\flashLoan\callbacks\AaveV2Callback.sol)

**Inherits:**
[Masks](\contracts\1delta\shared\masks\Masks.sol\abstract.Masks.md), [DeltaErrors](\contracts\1delta\shared\errors\Errors.sol\abstract.DeltaErrors.md)

**Title:**
Take an Aave V2 flash loan callback


## State Variables
### AAVE_V2

```solidity
address private constant AAVE_V2 = 0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9
```


### GRANARY

```solidity
address private constant GRANARY = 0xB702cE183b4E1Faa574834715E5D4a6378D0eEd3
```


### RADIANT_V2

```solidity
address private constant RADIANT_V2 = 0xA950974f64aA33f27F6C5e017eEE93BF7588ED07
```


## Functions
### executeOperation

Handles Aave V2 flash loan callback

Validates caller, extracts original caller from params, and executes compose operations

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                  |
|--------|----------------|------------------------------|
| 0      | 20             | origCaller                   |
| 20     | 1              | poolId                       |
| 21     | Variable       | composeOperations           |


```solidity
function executeOperation(
    address[] calldata,
    uint256[] calldata,
    uint256[] calldata, // we assume that the data is known to the caller in advance
    address initiator,
    bytes calldata params
)
    external
    returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address[]`||
|`<none>`|`uint256[]`||
|`<none>`|`uint256[]`||
|`initiator`|`address`|The address that initiated the flash loan|
|`params`|`bytes`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|Always returns true on success|


### _deltaComposeInternal

Internal function to execute compose operations

Override point for flash loan callbacks to execute compose operations


```solidity
function _deltaComposeInternal(address callerAddress, uint256 offset, uint256 length) internal virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`callerAddress`|`address`|Address of the original caller|
|`offset`|`uint256`|Current calldata offset|
|`length`|`uint256`|Length of remaining calldata|


