# BaseComposer
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\BaseComposer.sol)

**Inherits:**
[DeadLogger](\contract-ref\1delta\shared\logs\DeadLogger.sol\abstract.DeadLogger.md), [Swaps](\contract-ref\1delta\composer\swappers\Swaps.sol\abstract.Swaps.md), [Gen2025DexActions](\contract-ref\1delta\composer\singletons\Gen2025DexActions.sol\abstract.Gen2025DexActions.md), [UniversalLending](\contract-ref\1delta\composer\lending\UniversalLending.sol\abstract.UniversalLending.md), [ERC4626Operations](\contract-ref\1delta\composer\ERC4626\ERC4626Operations.sol\abstract.ERC4626Operations.md), [Transfers](\contract-ref\1delta\composer\transfers\Transfers.sol\contract.Transfers.md), [Permits](\contract-ref\1delta\composer\permit\Permits.sol\abstract.Permits.md), [ExternalCall](\contract-ref\1delta\composer\generic\ExternalCall.sol\abstract.ExternalCall.md)

**Title:**
Base aggregator contract that needs overrides for explicit chains.
Allows spot and margin swap aggregation
Efficient batching through compact calldata usage.
Needs to inherit callback implementations

**Author:**
1delta Labs AG


## Functions
### constructor


```solidity
constructor() ;
```

### receive


```solidity
receive() external payable;
```

### deltaCompose

Batch-executes a series of operations
The calldata is loaded in assembly and therefore not referred to here


```solidity
function deltaCompose(bytes calldata) external payable;
```

### _deltaComposeInternal

Execute a set of packed operations


```solidity
function _deltaComposeInternal(
    address callerAddress,
    uint256 currentOffset,
    uint256 calldataLength //
)
    internal
    virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`callerAddress`|`address`|the address of the EOA/contract that initially triggered the `deltaCompose` - this is called within flash & swap callbacks - strict validations need to be made in these cases to prevent an entity to call this with a non-matching callerAddress|
|`currentOffset`|`uint256`|offset packed ops array|
|`calldataLength`|`uint256`|length of packed ops array | op0 | data0 | op1 | ... | 1   | ...   |  1  | ...|


### _universalFlashLoan


```solidity
function _universalFlashLoan(uint256 currentOffset, address callerAddress) internal virtual returns (uint256);
```

