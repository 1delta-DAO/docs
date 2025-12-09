# SwapCallbacks
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\chains\ethereum\flashSwap\SwapCallbacks.sol)

**Inherits:**
[UniV4Callbacks](\contract-ref\1delta\composer\chains\ethereum\flashSwap\callbacks\UniV4Callback.sol\abstract.UniV4Callbacks.md), [UniV3Callbacks](\contract-ref\1delta\composer\chains\ethereum\flashSwap\callbacks\UniV3Callback.sol\abstract.UniV3Callbacks.md), [UniV2Callbacks](\contract-ref\1delta\composer\chains\ethereum\flashSwap\callbacks\UniV2Callback.sol\abstract.UniV2Callbacks.md), [DodoV2Callbacks](\contract-ref\1delta\composer\chains\ethereum\flashSwap\callbacks\DodoV2Callback.sol\abstract.DodoV2Callbacks.md), [BalancerV3Callbacks](\contract-ref\1delta\composer\chains\ethereum\flashSwap\callbacks\BalancerV3Callback.sol\abstract.BalancerV3Callbacks.md)

**Title:**
Swap Callback executor

**Author:**
1delta Labs AG


## Functions
### _deltaComposeInternal

Internal function to execute compose operations

Override point for swap callbacks to execute compose operations


```solidity
function _deltaComposeInternal(
    address callerAddress,
    uint256 offset,
    uint256 length
)
    internal
    virtual
    override(
        UniV4Callbacks,
        V3Callbacker,
        UniV2Callbacks,
        DodoV2Callbacks,
        BalancerV3Callbacks //
    );
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`callerAddress`|`address`|Address of the original caller|
|`offset`|`uint256`|Current calldata offset|
|`length`|`uint256`|Length of remaining calldata|


### fallback

Fallback function that handles swap callbacks

Swap callbacks are taken in the fallback. We do this to have an easier time in validating similar callbacks with separate selectors.
We identify the selector in the fallback and then map it to the DEX.
Note that each "_execute..." function returns (exits) when a callback is run.
If it falls through all variations, it reverts at the end.


```solidity
fallback() external;
```

