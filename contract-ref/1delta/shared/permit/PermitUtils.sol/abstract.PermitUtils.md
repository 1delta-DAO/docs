# PermitUtils
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\shared\permit\PermitUtils.sol)

**Inherits:**
[PermitConstants](\contracts\1delta\shared\permit\PermitConstants.sol\abstract.PermitConstants.md)

**Title:**
PermitUtils

A contract containing utilities for Permits


## Functions
### constructor


```solidity
constructor() ;
```

### _tryPermit

The function attempts to call the permit function on a given ERC20 token.

The function is designed to support a variety of permit functions, namely: IERC20Permit, IDaiLikePermit, and IPermit2.
It accommodates both Compact and Full formats of these permit types.
Please note, it is expected that the `expiration` parameter for the compact Permit2 and the `deadline` parameter
for the compact Permit are to be incremented by one before invoking this function. This approach is motivated by
gas efficiency considerations; as the unlimited expiration period is likely to be the most common scenario, and
zeros are cheaper to pass in terms of gas cost. Thus, callers should increment the expiration or deadline by one
before invocation for optimized performance.
Note that the implementation does not perform dirty bits cleaning, so it is the responsibility of
the caller to make sure that the higher 96 bits of the `owner` and `spender` parameters are clean.


```solidity
function _tryPermit(address token, uint256 permitOffset, uint256 permitLength, address callerAddress) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The address of the ERC20 token on which to call the permit function.|
|`permitOffset`|`uint256`|The off-chain permit data, containing different fields depending on the type of permit function.|
|`permitLength`|`uint256`|Length of the permit calldata.|
|`callerAddress`|`address`||


### _tryCreditPermit

Executes credit delegation on given tokens / lenders
Note that for lenders like Aave V3, the token needs to
be the respective debt token and NOT the underlying
Others like compound will not use it at all.


```solidity
function _tryCreditPermit(address token, uint256 permitOffset, uint256 permitLength, address callerAddress) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|asset to permit / delegate|
|`permitOffset`|`uint256`|calldata|
|`permitLength`|`uint256`||
|`callerAddress`|`address`||


### _tryFlagBasedLendingPermit

Executes compound or morpho permit.


```solidity
function _tryFlagBasedLendingPermit(
    address target,
    uint256 permitOffset,
    uint256 permitLength,
    address callerAddress
)
    internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`target`|`address`|target address to permit / delegate|
|`permitOffset`|`uint256`|calldata|
|`permitLength`|`uint256`|calldata|
|`callerAddress`|`address`||


### _transferFromPermit2

transferERC20from version using permit2


```solidity
function _transferFromPermit2(address token, address to, uint256 amount, address callerAddress) internal;
```

## Errors
### SafePermitBadLength

```solidity
error SafePermitBadLength();
```

