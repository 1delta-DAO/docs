# V4TypeGeneric
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\swappers\dex\V4Type.sol)

**Inherits:**
[ERC20Selectors](\contracts\1delta\shared\selectors\ERC20Selectors.sol\abstract.ERC20Selectors.md), [Masks](\contracts\1delta\shared\masks\Masks.sol\abstract.Masks.md)

**Title:**
Uniswap V4 type swapper contract

Can only be executed within `manager.unlock()`
Ergo, if Uniswap v4 is in the path (no matter how many times), one has to push
the swap data and execution into the UniswapV4.unlock
This should be usable together with flash loans from their singleton
Cannot unlock multiple times!
The execution of a swap follows the steps:
1) pm.unlock(...) (outside of this contract)
2) call pm.swap(...)
3) getDeltas via pm.exttload(bytes[]) (we get it for input/output at once)
we get [inputDelta, outputDelta] (pay amount, receive amount)
As for the V4 docs, `swap` does not necessarily return the correct
deltas when using hooks, that is why we remain with fetching the deltas
4) call pm.take to pull the outputDelta from pm
4) if input nonnative call pm.sync() and send inputDelta to pm
5) call pm.settle to settle the swap (if native with input value)
Technically it is possible to call multihops within V4 where one would
skip the `take` when the next swap is also for V4
This is a bit annoying to implement and for this first version we skip it


## State Variables
### SWAP
We need all these selectors for executing a single swap


```solidity
bytes32 private constant SWAP = 0xf3cd914c00000000000000000000000000000000000000000000000000000000
```


### TAKE

```solidity
bytes32 private constant TAKE = 0x0b0d9c0900000000000000000000000000000000000000000000000000000000
```


### SETTLE

```solidity
bytes32 private constant SETTLE = 0x11da60b400000000000000000000000000000000000000000000000000000000
```


### SYNC

```solidity
bytes32 private constant SYNC = 0xa584119400000000000000000000000000000000000000000000000000000000
```


### EXTTLOAD

```solidity
bytes32 private constant EXTTLOAD = 0x9bf6645f00000000000000000000000000000000000000000000000000000000
```


## Functions
### constructor


```solidity
constructor() ;
```

### _swapUniswapV4ExactInGeneric

Swaps exact input on Uniswap V4 pools

Can only be executed within `manager.unlock()`. Cannot unlock multiple times.

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | hooks                |
| 20     | 20             | manager              |
| 40     | 3              | fee                  |
| 43     | 3              | tickSpacing          |
| 46     | 1              | payFlag              |
| 47     | 2              | calldataLength       |
| 49     | calldataLength | calldata             |


```solidity
function _swapUniswapV4ExactInGeneric(
    uint256 fromAmount,
    address tokenIn,
    address tokenOut,
    address receiver,
    uint256 currentOffset,
    address callerAddress
)
    internal
    returns (
        // this var changes from zeroToOne to the received amount
        uint256 receivedAmount,
        // similar to other implementations, we use this temp variable
        // to avoid stackToo deep
        uint256 tempVar
    );
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`fromAmount`|`uint256`|Input amount|
|`tokenIn`|`address`|Input token address|
|`tokenOut`|`address`|Output token address|
|`receiver`|`address`|Receiver address|
|`currentOffset`|`uint256`|Current position in the calldata|
|`callerAddress`|`address`|Address of the caller|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`receivedAmount`|`uint256`|Output amount|
|`tempVar`|`uint256`|Updated calldata offset after processing|


