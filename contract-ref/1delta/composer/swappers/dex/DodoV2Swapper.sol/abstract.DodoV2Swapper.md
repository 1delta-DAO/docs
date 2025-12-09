# DodoV2Swapper
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\swappers\dex\DodoV2Swapper.sol)

**Inherits:**
[ERC20Selectors](\contracts\1delta\shared\selectors\ERC20Selectors.sol\abstract.ERC20Selectors.md), [Masks](\contracts\1delta\shared\masks\Masks.sol\abstract.Masks.md)

**Title:**
DodoV2 swapper contract


## Functions
### _dodoPrepare

We need this to avoid stack too deep in the overall context
if `clLength<3` no flash loan will be executed,
othewise, we skip the funding transfers
0 is pulling from caller
1 is transferring from contract
2 is pre-funded (meaning no transfers here)


```solidity
function _dodoPrepare(
    uint256 amountIn,
    address tokenIn,
    address callerAddress,
    uint256 currentOffset
)
    private
    returns (uint256 dodoData, address pool, uint256 clLength);
```

### _swapDodoV2ExactIn

Swaps exact input on Dodo V2

Pay flag: 0 = caller pays; 1 = contract pays; greater = pre-funded. pId is pool index for flash validation.

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | pool                 |
| 20     | 1              | sellQuote            |
| 21     | 2              | pId                  | pool index for flash validation
| 22     | 2              | clLength / pay flag  | <- 0: caller pays; 1: contract pays; greater: pre-funded
| 25     | clLength       | calldata             | calldata for flash loan


```solidity
function _swapDodoV2ExactIn(
    uint256 amountIn,
    address tokenIn,
    address tokenOut,
    address receiver,
    address callerAddress,
    uint256 currentOffset
)
    internal
    returns (uint256 amountOut, uint256 clLength);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amountIn`|`uint256`|Input amount|
|`tokenIn`|`address`|Input token address|
|`tokenOut`|`address`|Output token address|
|`receiver`|`address`|Receiver address|
|`callerAddress`|`address`|Address of the caller|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|Output amount|
|`clLength`|`uint256`|Updated calldata offset after processing|


