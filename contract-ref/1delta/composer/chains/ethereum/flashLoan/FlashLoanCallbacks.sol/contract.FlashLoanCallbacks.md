# FlashLoanCallbacks
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\chains\ethereum\flashLoan\FlashLoanCallbacks.sol)

**Inherits:**
[AaveV2FlashLoanCallback](\contract-ref\1delta\composer\chains\ethereum\flashLoan\callbacks\AaveV2Callback.sol\contract.AaveV2FlashLoanCallback.md), [AaveV3FlashLoanCallback](\contract-ref\1delta\composer\chains\ethereum\flashLoan\callbacks\AaveV3Callback.sol\contract.AaveV3FlashLoanCallback.md), [MoolahFlashLoanCallback](\contract-ref\1delta\composer\chains\bnb\flashLoan\callbacks\MoolahCallback.sol\contract.MoolahFlashLoanCallback.md), [MorphoFlashLoanCallback](\contract-ref\1delta\composer\chains\ethereum\flashLoan\callbacks\MorphoCallback.sol\contract.MorphoFlashLoanCallback.md), [BalancerV2FlashLoanCallback](\contract-ref\1delta\composer\chains\ethereum\flashLoan\callbacks\BalancerV2Callback.sol\contract.BalancerV2FlashLoanCallback.md)

**Title:**
Flash loan callbacks - these are chain-specific

**Author:**
1delta Labs AG


## Functions
### _deltaComposeInternal

Internal function to execute compose operations

Override point for flash loan callbacks to execute compose operations


```solidity
function _deltaComposeInternal(
    address callerAddress,
    uint256 offset,
    uint256 length
)
    internal
    virtual
    override(
        AaveV2FlashLoanCallback,
        AaveV3FlashLoanCallback,
        MoolahFlashLoanCallback,
        MorphoFlashLoanCallback,
        BalancerV2FlashLoanCallback //
    );
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`callerAddress`|`address`|Address of the original caller|
|`offset`|`uint256`|Current calldata offset|
|`length`|`uint256`|Length of remaining calldata|


