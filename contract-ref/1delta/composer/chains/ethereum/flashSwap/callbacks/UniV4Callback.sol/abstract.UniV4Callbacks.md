# UniV4Callbacks
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\chains\ethereum\flashSwap\callbacks\UniV4Callback.sol)

**Inherits:**
[Masks](\contracts\1delta\shared\masks\Masks.sol\abstract.Masks.md), [DeltaErrors](\contracts\1delta\shared\errors\Errors.sol\abstract.DeltaErrors.md)

**Title:**
Contract Module taking Uniswap V4 callbacks

Author: Achthar | 1delta
/*****************************************************************************


## State Variables
### UNISWAP_V4

```solidity
address private constant UNISWAP_V4 = 0x000000000004444c5dc75cB358380D2e3dE08A90
```


## Functions
### unlockCallback

Callback from uniswap V4 type singletons
As Balancer V3 shares the same trigger selector and (unlike this one) has
a custom selector provided, we need to skip this part of the data
This is mainly done to not have duplicate code and maintain
the same level of security by callback validation for both DEX types


```solidity
function unlockCallback(bytes calldata) external;
```

### _deltaComposeInternal

A composer contract should override this


```solidity
function _deltaComposeInternal(address callerAddress, uint256 offset, uint256 length) internal virtual;
```

