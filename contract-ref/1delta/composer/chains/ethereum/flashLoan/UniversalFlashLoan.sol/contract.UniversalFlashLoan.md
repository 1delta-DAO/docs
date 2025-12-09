# UniversalFlashLoan
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\chains\ethereum\flashLoan\UniversalFlashLoan.sol)

**Inherits:**
[MorphoFlashLoans](\contract-ref\1delta\composer\flashLoan\Morpho.sol\contract.MorphoFlashLoans.md), [AaveV3FlashLoans](\contract-ref\1delta\composer\flashLoan\AaveV3.sol\contract.AaveV3FlashLoans.md), [AaveV2FlashLoans](\contract-ref\1delta\composer\flashLoan\AaveV2.sol\contract.AaveV2FlashLoans.md), [BalancerV2FlashLoans](\contract-ref\1delta\composer\chains\arbitrum-one\flashLoan\BalancerV2.sol\abstract.BalancerV2FlashLoans.md), [FlashLoanCallbacks](\contract-ref\1delta\composer\chains\arbitrum-one\flashLoan\FlashLoanCallbacks.sol\contract.FlashLoanCallbacks.md)

**Title:**
Flash loan aggregator

**Author:**
1delta Labs AG


## Functions
### _universalFlashLoan

Executes flash loan operations for all supported providers

Routes to appropriate flash loan provider based on flash loan type

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                  |
|--------|----------------|------------------------------|
| 0      | 1              | flashLoanType                |
| 1      | Variable       | flashLoanParams              |


```solidity
function _universalFlashLoan(uint256 currentOffset, address callerAddress) internal virtual returns (uint256);
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


