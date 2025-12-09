# UniversalLending
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\lending\UniversalLending.sol)

**Inherits:**
[AaveLending](\contracts\1delta\composer\lending\AaveLending.sol\abstract.AaveLending.md), [CompoundV3Lending](\contracts\1delta\composer\lending\CompoundV3Lending.sol\abstract.CompoundV3Lending.md), [CompoundV2Lending](\contracts\1delta\composer\lending\CompoundV2Lending.sol\abstract.CompoundV2Lending.md), [MorphoLending](\contracts\1delta\composer\lending\MorphoLending.sol\abstract.MorphoLending.md), [SiloV2Lending](\contracts\1delta\composer\lending\SiloV2Lending.sol\abstract.SiloV2Lending.md), [DeltaErrors](\contracts\1delta\shared\errors\Errors.sol\abstract.DeltaErrors.md)

Merge all lending ops in one operation
Can inject parameters
- paramPush for receiving funds (e.g. receiving funds from swaps or flash loans)
- paramPull for being required to pay an exact amount (e.g. DEX swap payments, flash loan amounts)


## Functions
### _lendingOperations

Executes any lending operation across various lenders

Routes to appropriate lender based on operation and lender ID

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 1              | lendingOperation                |
| 1      | 2              | lender                          |
| 3      | variable       | rest                            |


```solidity
function _lendingOperations(
    address callerAddress,
    uint256 currentOffset // params similar to deltaComposeInternal
)
    internal
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`callerAddress`|`address`|Address of the caller|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


