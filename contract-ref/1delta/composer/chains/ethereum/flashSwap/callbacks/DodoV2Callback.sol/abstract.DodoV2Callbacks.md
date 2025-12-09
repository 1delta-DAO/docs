# DodoV2Callbacks
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\chains\ethereum\flashSwap\callbacks\DodoV2Callback.sol)

**Inherits:**
[Masks](\contracts\1delta\shared\masks\Masks.sol\abstract.Masks.md), [DeltaErrors](\contracts\1delta\shared\errors\Errors.sol\abstract.DeltaErrors.md)

**Title:**
DodoV2 flash-loan callbacks

Author: Achthar | 1delta
/*****************************************************************************


## State Variables
### DVM_FACTORY

```solidity
address internal constant DVM_FACTORY = 0x72d220cE168C4f361dD4deE5D826a01AD8598f6C
```


### DSP_FACTORY

```solidity
address internal constant DSP_FACTORY = 0x6fdDB76c93299D985f4d3FC7ac468F9A168577A4
```


### DPP_FACTORY

```solidity
address internal constant DPP_FACTORY = 0x5336edE8F971339F6c0e304c66ba16F1296A2Fbe
```


### REGISTRY
selector _REGISTRY(address,address,uint256) - a mapping base->quote->index->pool


```solidity
bytes32 private constant REGISTRY = 0xbdeb0a9100000000000000000000000000000000000000000000000000000000
```


## Functions
### _validateAndExecuteDodoCall


```solidity
function _validateAndExecuteDodoCall(address sender, address factory) internal;
```

### _executeDodoV2IfSelector

Generic executor for dodoV2 callbacks
Dodo can have 3 selectors as callbacks, we switch case through them here


```solidity
function _executeDodoV2IfSelector(bytes32 selector) internal;
```

### _deltaComposeInternal


```solidity
function _deltaComposeInternal(address callerAddress, uint256 offset, uint256 length) internal virtual;
```

