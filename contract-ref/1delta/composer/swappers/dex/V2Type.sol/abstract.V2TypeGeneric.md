# V2TypeGeneric
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\swappers\dex\V2Type.sol)

**Inherits:**
[ERC20Selectors](\contract-ref\1delta\shared\selectors\ERC20Selectors.sol\abstract.ERC20Selectors.md), [Masks](\contract-ref\1delta\shared\masks\Masks.sol\abstract.Masks.md)

**Title:**
Uniswap V2 type swapper contract

We do everything UniV2 here, incl Solidly, FoT, exactIn and -Out


## State Variables
### UNI_V2_GET_RESERVES
selector for getReserves()


```solidity
bytes32 private constant UNI_V2_GET_RESERVES = 0x0902f1ac00000000000000000000000000000000000000000000000000000000
```


### UNI_V2_SWAP
selector for swap(...)


```solidity
bytes32 private constant UNI_V2_SWAP = 0x022c0d9f00000000000000000000000000000000000000000000000000000000
```


### PERMIT2_TRANSFER_FROM
fixed selector transferFrom(...) on permit2


```solidity
bytes32 private constant PERMIT2_TRANSFER_FROM = 0x36c7851600000000000000000000000000000000000000000000000000000000
```


### PERMIT2
deterministically deployed pemrit2 address


```solidity
address private constant PERMIT2 = 0x000000000022D473030F116dDEE9F6B43aC78BA3
```


## Functions
### _swapUniswapV2PoolExactInGeneric

Swaps exact input on Uniswap V2 type pools

Supports Uni V2, Solidly, FoT, exactIn.
Pay mode: 0 = pay from self; 1 = caller pays; 3 = pre-funded.

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | pool                 |
| 20     | 2              | feeDenom             |
| 22     | 1              | forkId               |
| 23     | 2              | calldataLength       | <-- 0: pay from self; 1: caller pays; 3: pre-funded;
| 25     | calldataLength | calldata             |


```solidity
function _swapUniswapV2PoolExactInGeneric(
    uint256 amountIn,
    address tokenIn,
    address tokenOut,
    address receiver,
    uint256 currentOffset,
    address callerAddress
)
    internal
    returns (
        uint256 buyAmount,
        // we need this as transient variable to not overflow the stacksize
        // the clLength is the calldata length for the callback at the beginning
        // and willl be used as the new incremented offset
        // this is to prevent `stack too deep` without using additional `mstore`
        uint256 clLength
    );
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amountIn`|`uint256`|Input amount|
|`tokenIn`|`address`|Input token address|
|`tokenOut`|`address`|Output token address|
|`receiver`|`address`|Receiver address|
|`currentOffset`|`uint256`|Current position in the calldata|
|`callerAddress`|`address`|Address of the caller|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`buyAmount`|`uint256`|Output amount|
|`clLength`|`uint256`|Updated calldata offset after processing|


### _swapUniV2ExactInFOTGeneric

Executes an exact input swap internally across major UniV2 forks supporting
FOT tokens. Will only be used at the begining of a swap path where users sell a FOT token
Due to the nature of the V2 impleemntation, the callback is not triggered if no calldata is provided
As such, we never enter the callback implementation when using this function


```solidity
function _swapUniV2ExactInFOTGeneric(
    uint256 amountIn,
    address tokenIn,
    address tokenOut,
    address receiver,
    uint256 currentOffset,
    address callerAddress
)
    internal
    returns (uint256 buyAmount, uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amountIn`|`uint256`|sell amount|
|`tokenIn`|`address`||
|`tokenOut`|`address`||
|`receiver`|`address`||
|`currentOffset`|`uint256`||
|`callerAddress`|`address`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`buyAmount`|`uint256`|output amount|
|`<none>`|`uint256`||


