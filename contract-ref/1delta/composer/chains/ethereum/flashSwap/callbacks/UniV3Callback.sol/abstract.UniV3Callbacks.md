# UniV3Callbacks
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\chains\ethereum\flashSwap\callbacks\UniV3Callback.sol)

**Inherits:**
[V3Callbacker](\contract-ref\1delta\composer\swappers\callbacks\V3Callbacker.sol\abstract.V3Callbacker.md), [Masks](\contract-ref\1delta\shared\masks\Masks.sol\abstract.Masks.md), [DeltaErrors](\contract-ref\1delta\shared\errors\Errors.sol\abstract.DeltaErrors.md)

**Title:**
Uniswap V3 type callback implementations

Author: Achthar | 1delta
/*****************************************************************************


## State Variables
### UNISWAP_V3_FF_FACTORY

```solidity
bytes32 private constant UNISWAP_V3_FF_FACTORY = 0xff1F98431c8aD98523631AE4a59f267346ea31F9840000000000000000000000
```


### UNISWAP_V3_CODE_HASH

```solidity
bytes32 private constant UNISWAP_V3_CODE_HASH = 0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54
```


### SUSHISWAP_V3_FF_FACTORY

```solidity
bytes32 private constant SUSHISWAP_V3_FF_FACTORY = 0xffbACEB8eC6b9355Dfc0269C18bac9d6E2Bdc29C4F0000000000000000000000
```


### SUSHISWAP_V3_CODE_HASH

```solidity
bytes32 private constant SUSHISWAP_V3_CODE_HASH = 0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54
```


### SOLIDLY_V3_FF_FACTORY

```solidity
bytes32 private constant SOLIDLY_V3_FF_FACTORY = 0xff70Fe4a44EA505cFa3A57b95cF2862D4fd5F0f6870000000000000000000000
```


### SOLIDLY_V3_CODE_HASH

```solidity
bytes32 private constant SOLIDLY_V3_CODE_HASH = 0xe9b68c5f77858eecac2e651646e208175e9b1359d68d0e14fc69f8c54e5010bf
```


### PANCAKESWAP_V3_FF_FACTORY

```solidity
bytes32 private constant PANCAKESWAP_V3_FF_FACTORY = 0xff41ff9AA7e16B8B1a8a8dc4f0eFacd93D02d071c90000000000000000000000
```


### PANCAKESWAP_V3_CODE_HASH

```solidity
bytes32 private constant PANCAKESWAP_V3_CODE_HASH = 0x6ce8eb472fa82df5469c6ab6d485f17c3ad13c8cd7af59b3d4a8026c5ce0f7e2
```


### IZUMI_FF_FACTORY

```solidity
bytes32 private constant IZUMI_FF_FACTORY = 0xff93BB94a0d5269cb437A1F71FF3a77AB7538444220000000000000000000000
```


### IZUMI_CODE_HASH

```solidity
bytes32 private constant IZUMI_CODE_HASH = 0xbe0bfe068cdd78cafa3ddd44e214cfa4e412c15d7148e932f8043fe883865e40
```


## Functions
### _executeUniV3IfSelector

Generic UniswapV3 callback executor
The call looks like
function uniswapV3SwapCallback(int256 amount0Delta, int256 amount1Delta, bytes calldata) external {...}
Izumi deviates from this, we handle these below if it is deployed on this chain


```solidity
function _executeUniV3IfSelector(bytes32 selector) internal;
```

