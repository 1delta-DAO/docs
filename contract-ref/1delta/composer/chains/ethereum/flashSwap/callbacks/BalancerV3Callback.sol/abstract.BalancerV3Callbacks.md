# BalancerV3Callbacks
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\chains\ethereum\flashSwap\callbacks\BalancerV3Callback.sol)

**Inherits:**
[Masks](\contract-ref\1delta\shared\masks\Masks.sol\abstract.Masks.md), [DeltaErrors](\contract-ref\1delta\shared\errors\Errors.sol\abstract.DeltaErrors.md)

**Title:**
Contract Module taking Balancer V3 callbacks

Author: Achthar | 1delta
/*****************************************************************************


## State Variables
### BALANCER_V3

```solidity
address private constant BALANCER_V3 = 0xbA1333333333a1BA1108E8412f11850A5C319bA9
```


## Functions
### balancerUnlockCallback

Callback from Balancer V3 type vaults

Note that this selector is a custom choice

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                  |
|--------|----------------|------------------------------|
| 0      | 4              | selector                     |
| 4      | 32             | offset                       |
| 36     | 32             | length                       |
| 68     | 20             | callerAddress                |
| 88     | 1              | poolId                       |
| 89     | Variable       | composeOperations            |


```solidity
function balancerUnlockCallback(bytes calldata) external;
```

### _deltaComposeInternal

Internal function to execute compose operations

A composer contract should override this


```solidity
function _deltaComposeInternal(address callerAddress, uint256 offset, uint256 length) internal virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`callerAddress`|`address`|Address of the original caller|
|`offset`|`uint256`|Current calldata offset|
|`length`|`uint256`|Length of remaining calldata|


