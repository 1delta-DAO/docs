# Masks
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\shared\masks\Masks.sol)


## State Variables
### ADDRESS_MASK
Mask of lower 20 bytes.


```solidity
uint256 internal constant ADDRESS_MASK = 0x00ffffffffffffffffffffffffffffffffffffffff
```


### UINT8_MASK
Mask of lower 1 byte.


```solidity
uint256 internal constant UINT8_MASK = 0xff
```


### UINT16_MASK
Mask of lower 2 bytes.


```solidity
uint256 internal constant UINT16_MASK = 0xffff
```


### UINT24_MASK
Mask of lower 3 bytes.


```solidity
uint256 internal constant UINT24_MASK = 0xffffff
```


### UINT32_MASK
Mask of lower 4 bytes.


```solidity
uint256 internal constant UINT32_MASK = 0xffffffff
```


### UINT128_MASK
Mask of lower 16 bytes.


```solidity
uint256 internal constant UINT128_MASK = 0x00000000000000000000000000000000ffffffffffffffffffffffffffffffff
```


### UINT120_MASK
Mask of lower 15 bytes.


```solidity
uint256 internal constant UINT120_MASK = 0x0000000000000000000000000000000000ffffffffffffffffffffffffffffff
```


### MIN_SQRT_RATIO
MIN_SQRT_RATIO + 1 from Uniswap's TickMath


```solidity
uint160 internal constant MIN_SQRT_RATIO = 4295128740
```


### MAX_SQRT_RATIO
MAX_SQRT_RATIO - 1 from Uniswap's TickMath


```solidity
uint160 internal constant MAX_SQRT_RATIO = 1461446703485210103287273052203988822378723970341
```


### MAX_UINT256
Maximum Uint256 value


```solidity
uint256 internal constant MAX_UINT256 = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
```


### FF_ADDRESS_COMPLEMENT
Use this to distinguish FF upper bytes addresses and lower bytes addresses


```solidity
uint256 internal constant FF_ADDRESS_COMPLEMENT = 0x000000000000000000000000000000000000000000ffffffffffffffffffffff
```


### UINT112_MASK
We use uint112-encoded amounts to typically fit one bit flag, one path length (uint16)
add 2 amounts (2xuint112) into 32bytes, as such we use this mask for extracting those


```solidity
uint256 internal constant UINT112_MASK = 0x000000000000000000000000000000000000ffffffffffffffffffffffffffff
```


### NATIVE_FLAG
Mask for Is Native


```solidity
uint256 internal constant NATIVE_FLAG = 1 << 127
```


### USE_SHARES_FLAG
Mask for shares


```solidity
uint256 internal constant USE_SHARES_FLAG = 1 << 126
```


