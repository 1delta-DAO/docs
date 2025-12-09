# MorphoFlashLoanCallback
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\chains\ethereum\flashLoan\callbacks\MorphoCallback.sol)

**Inherits:**
[Masks](\contract-ref\1delta\shared\masks\Masks.sol\abstract.Masks.md), [DeltaErrors](\contract-ref\1delta\shared\errors\Errors.sol\abstract.DeltaErrors.md)

**Title:**
All Morpho Blue flash callbacks


## State Variables
### MORPHO_BLUE
Constant MorphoB address


```solidity
address private constant MORPHO_BLUE = 0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb
```


## Functions
### onMorphoFlashLoan

Morpho blue callbacks

Handles Morpho Blue flash loan callback


```solidity
function onMorphoFlashLoan(uint256, bytes calldata) external;
```

### onMorphoSupply

Handles Morpho Blue supply callback


```solidity
function onMorphoSupply(uint256, bytes calldata) external;
```

### onMorphoRepay

Handles Morpho Blue repay callback


```solidity
function onMorphoRepay(uint256, bytes calldata) external;
```

### onMorphoSupplyCollateral

Handles Morpho Blue supply collateral callback


```solidity
function onMorphoSupplyCollateral(uint256, bytes calldata) external;
```

### _onMorphoCallback

Internal callback handler for all Morpho Blue operations

Morpho Blue is immutable and their flash loans are callbacks to msg.sender.
Since it is universal batching and the same validation for all Morpho callbacks, we can use the same logic everywhere

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                  |
|--------|----------------|------------------------------|
| 0      | 20             | origCaller                   |
| 20     | 1              | poolId                       |
| 21     | Variable       | composeOperations            |


```solidity
function _onMorphoCallback() internal;
```

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


