# Gen2025DexActions
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\singletons\Gen2025DexActions.sol)

**Inherits:**
[UniswapV4SingletonActions](\contract-ref\1delta\composer\singletons\UniswapV4Singleton.sol\abstract.UniswapV4SingletonActions.md), [BalancerV3VaultActions](\contract-ref\1delta\composer\singletons\BalancerV3Vault.sol\abstract.BalancerV3VaultActions.md), [SharedSingletonActions](\contract-ref\1delta\composer\singletons\Shared.sol\abstract.SharedSingletonActions.md)

Everything Uniswap V4 & Balancer V3, the major upgrades for DEXs in 2025


## Functions
### _gen2025DexActions

Routes to appropriate Uniswap V4 or Balancer V3 DEX action based on operation ID

Supports Uniswap V4 and Balancer V3 operations

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description      |
|--------|----------------|------------------|
| 0      | 1              | transferOperation|


```solidity
function _gen2025DexActions(uint256 currentOffset, address callerAddress) internal returns (uint256);
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


