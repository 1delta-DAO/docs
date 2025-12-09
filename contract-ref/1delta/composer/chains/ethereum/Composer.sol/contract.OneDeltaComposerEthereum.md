# OneDeltaComposerEthereum
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\chains\ethereum\Composer.sol)

**Inherits:**
[BaseComposer](\contracts\1delta\composer\BaseComposer.sol\abstract.BaseComposer.md), [UniversalFlashLoan](\contracts\1delta\composer\chains\arbitrum-one\flashLoan\UniversalFlashLoan.sol\contract.UniversalFlashLoan.md), [SwapCallbacks](\contracts\1delta\composer\chains\arbitrum-one\flashSwap\SwapCallbacks.sol\contract.SwapCallbacks.md)

**Title:**
Chain-dependent Universal aggregator contract.

**Author:**
1delta Labs AG


## Functions
### _deltaComposeInternal

Execute a set of packed operations


```solidity
function _deltaComposeInternal(
    address callerAddress,
    uint256 currentOffset,
    uint256 calldataLength //
)
    internal
    override(BaseComposer, FlashLoanCallbacks, SwapCallbacks);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`callerAddress`|`address`|Address of the original caller|
|`currentOffset`|`uint256`|Current position in the calldata|
|`calldataLength`|`uint256`|Length of remaining calldata|


### _universalFlashLoan

Executes universal flash loan operations

Routes flash loan requests to appropriate provider


```solidity
function _universalFlashLoan(
    uint256 currentOffset,
    address callerAddress
)
    internal
    override(UniversalFlashLoan, BaseComposer)
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|
|`callerAddress`|`address`|Address of the original caller|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


