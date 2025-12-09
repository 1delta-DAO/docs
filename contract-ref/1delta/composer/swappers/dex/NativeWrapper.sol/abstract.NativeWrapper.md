# NativeWrapper
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\swappers\dex\NativeWrapper.sol)

**Inherits:**
[ERC20Selectors](\contract-ref\1delta\shared\selectors\ERC20Selectors.sol\abstract.ERC20Selectors.md), [Masks](\contract-ref\1delta\shared\masks\Masks.sol\abstract.Masks.md)

**Title:**
native wrap "swapper" contract


## State Variables
### NATIVE_TRANSFER

```solidity
bytes4 private constant NATIVE_TRANSFER = 0xf4b3b1bc
```


### WRAP

```solidity
bytes4 private constant WRAP = 0xc30d93ce
```


## Functions
### _wrapOrUnwrapSimple

Wraps or unwraps native tokens

This one is for overriding the DEX implementation. Note that the wrap call is a plain native transfer.

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description         |
|--------|----------------|---------------------|
| 0      | 20             | wrappedNativeAddress|
| 20     | 1              | isWrap              |


```solidity
function _wrapOrUnwrapSimple(uint256 amount, uint256 currentOffset) internal virtual returns (uint256, uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`uint256`|Amount to wrap/unwrap|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|
|`<none>`|`uint256`|amount Amount (same as input)|


