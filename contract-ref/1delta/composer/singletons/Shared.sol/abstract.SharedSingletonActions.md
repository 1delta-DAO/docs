# SharedSingletonActions
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\singletons\Shared.sol)

**Inherits:**
[Masks](\contracts\1delta\shared\masks\Masks.sol\abstract.Masks.md)


## State Variables
### UNLOCK

```solidity
bytes32 private constant UNLOCK = 0x48c8949100000000000000000000000000000000000000000000000000000000
```


### CB_SELECTOR
selector by bytes4(keccak256("balancerUnlockCallback(bytes)"))


```solidity
bytes32 private constant CB_SELECTOR = 0x480cf7ef00000000000000000000000000000000000000000000000000000000
```


## Functions
### _singletonUnlock

Unlocks tokens for Uniswap V4 or Balancer V3

Here we need to add a selector deterministically as this function is Identical for Balancer V3 and Uniswap V4

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description     |
|--------|----------------|-----------------|
| 0      | 20             | manager         |
| 20     | 2              | length          |
| 22     | length         | data            |


```solidity
function _singletonUnlock(uint256 currentOffset, address callerAddress) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|
|`callerAddress`|`address`|Address of the caller|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


