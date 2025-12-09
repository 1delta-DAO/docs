# MoolahFlashLoanCallback
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\chains\ethereum\flashLoan\callbacks\MoolahCallback.sol)

**Inherits:**
[Masks](\contracts\1delta\shared\masks\Masks.sol\abstract.Masks.md), [DeltaErrors](\contracts\1delta\shared\errors\Errors.sol\abstract.DeltaErrors.md)

**Title:**
All Moolah flash callbacks


## State Variables
### LISTA_DAO
Constant Moolah address


```solidity
address private constant LISTA_DAO = 0xf820fB4680712CD7263a0D3D024D5b5aEA82Fd70
```


## Functions
### onMoolahFlashLoan

Moolah callbacks

Handles Moolah flash loan callback


```solidity
function onMoolahFlashLoan(uint256, bytes calldata) external;
```

### onMoolahSupply

Handles Moolah supply callback


```solidity
function onMoolahSupply(uint256, bytes calldata) external;
```

### onMoolahRepay

Handles Moolah repay callback


```solidity
function onMoolahRepay(uint256, bytes calldata) external;
```

### onMoolahSupplyCollateral

Handles Moolah supply collateral callback


```solidity
function onMoolahSupplyCollateral(uint256, bytes calldata) external;
```

### _onMoolahCallback

Internal callback handler for all Moolah operations

Moolah flash loans are callbacks to msg.sender.
Since it is universal batching and the same validation for all Moolah callbacks, we can use the same logic everywhere

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                  |
|--------|----------------|------------------------------|
| 0      | 20             | origCaller                   |
| 20     | 1              | poolId                       |
| 21     | Variable       | composeOperations            |


```solidity
function _onMoolahCallback() internal;
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


