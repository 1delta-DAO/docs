# BaseSwapper
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\swappers\BaseSwapper.sol)

**Inherits:**
[Wrapper](\contracts\1delta\composer\swappers\dex\Wrapper.sol\abstract.Wrapper.md), [V4TypeGeneric](\contracts\1delta\composer\swappers\dex\V4Type.sol\abstract.V4TypeGeneric.md), [V3TypeGeneric](\contracts\1delta\composer\swappers\dex\V3Type.sol\abstract.V3TypeGeneric.md), [V2TypeGeneric](\contracts\1delta\composer\swappers\dex\V2Type.sol\abstract.V2TypeGeneric.md), [BalancerV3Swapper](\contracts\1delta\composer\swappers\dex\BalancerV3Swapper.sol\abstract.BalancerV3Swapper.md), [BalancerV2Swapper](\contracts\1delta\composer\swappers\dex\BalancerV2Swapper.sol\abstract.BalancerV2Swapper.md), [LBSwapper](\contracts\1delta\composer\swappers\dex\LBSwapper.sol\abstract.LBSwapper.md), [DodoV2Swapper](\contracts\1delta\composer\swappers\dex\DodoV2Swapper.sol\abstract.DodoV2Swapper.md), [WooFiSwapper](\contracts\1delta\composer\swappers\dex\WooFi.sol\abstract.WooFiSwapper.md), [CurveSwapper](\contracts\1delta\composer\swappers\dex\CurveSwapper.sol\abstract.CurveSwapper.md), [GMXSwapper](\contracts\1delta\composer\swappers\dex\GMXSwapper.sol\abstract.GMXSwapper.md), [SyncSwapper](\contracts\1delta\composer\swappers\dex\SyncSwapper.sol\abstract.SyncSwapper.md), [DeltaErrors](\contracts\1delta\shared\errors\Errors.sol\abstract.DeltaErrors.md)

**Title:**
Base swapper contract

Contains basic logic for swap executions with DEXs
DEX Id layout:
0 --- 100 : Self swappers (Uni V3, Curve, Clipper)
100 - 255 : Funded swaps (Uni V2, Solidly, Moe,Joe LB, WooFI, GMX)
Uni V2: 100 - 110
Solidly:121 - 130


Core logic: Encode swaps as nested matrices (r: rows - multihops; c:columns - splits)
Every element in a matrix can be another matrix
The nesting stops at a (0,0) entry
E.g. a multihop with each hop having 2 splits is identified as
(1,0)  <-- 1 as row implicates a multihop of length 2 (max index is 1)
\
(0,1)  --------------- (0,1)   <- the 1s in the columns indicate that
|                      |        there are 2 splits in each sub step
├(0,0)**               ├(0,0)
|                      |
├(1,0)                 ├(0,0)  <- the (0,0) entries indicate an atomic swap (e.g. a uni V2 swap)
\
(0,0)  --- (0,0)  <- this is a branching multihip within a split (indicated by (1,0)
the output token is expected to be the same as for the
prior split in **
The logic accumulates values per column to enable consistent multihops without additional balance reads
Multihops progressively update value (in amount -> out amount) too always ensure that values
within sub splits ((x,0) or (0,y)) are correctly accumulated
A case like (1,2) is a violation as we always demand a clear grouping of the branch
This is intuitive as we cannot have a split and a multihop at the same time.
Every node with (x,0) is expected to have consistent multihop connections
Every node with (0,y) is expected to have sub nodes and path that have all the same output currency
Swap execution is always along rows then columns
In the example above, we indicate a multihop
Each hop has length 0 (single swap) but 1 split
Each split is a single swap (0,0)
This allows arbitrary deep nesting of sub-routes and splits
Rows are prioritized over columns.
/
/**


## Functions
### _multihopSplitSwap


```solidity
function _multihopSplitSwap(
    uint256 amountIn,
    uint256 swapMaxIndex,
    address tokenIn,
    address callerAddress,
    uint256 currentOffset //
)
    internal
    returns (uint256 amount, uint256, address _tokenIn);
```

### _singleSwapOrSplit

Ensures that all paths end with the same currency

Parallel swaps a->...->b; a->...->b for different DEXs

**Notes:**
- calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 0-16           | splits               |
| sC     | Variable       | datas                |

- split-format: 
| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 1              | count                |
| 1      | 2*count - 1    | splits               | <- count = 0 means there is no data, otherwise uint16 splits

- datas-format: 
| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 2              | (r,c)                | <- indicates whether the swap is non-simple (further splits or hops)
| 2      | 1              | dexId                |
| 3      | variable       | params               | <- depends on dexId (fixed for each one)
| 3+v    | 2              | (r,c)                |
| 4+v    | 1              | dexId                |
| ...    | variable       | params               | <- depends on dexId (fixed for each one)
| ...    | ...            | ...                  | <- count + 1 times of repeating this pattern


```solidity
function _singleSwapOrSplit(
    uint256 amountIn,
    uint256 splitsMaxIndex,
    address tokenIn,
    address callerAddress, // caller
    uint256 currentOffset
)
    internal
    returns (uint256, uint256, address nextToken);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amountIn`|`uint256`|Input amount|
|`splitsMaxIndex`|`uint256`|Maximum split index|
|`tokenIn`|`address`|Input token address|
|`callerAddress`|`address`|Address of the caller|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated amount after swaps|
|`<none>`|`uint256`|Updated calldata offset after processing|
|`nextToken`|`address`|Next token address|


### _singleSwapSplitOrRoute

Executes swap or split amounts

If r=0: if c=0 then single swap, else split swap. If r!=0: multihop swap.
Always returns output amount, updated offset and nextToken address.

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 2              | (r,c)                |
| 2      | 20             | nextToken            |
| 22     | any            | swapData             |


```solidity
function _singleSwapSplitOrRoute(
    uint256 amountIn,
    address tokenIn,
    address callerAddress,
    uint256 currentOffset //
)
    internal
    returns (uint256 received, uint256, address nextToken);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amountIn`|`uint256`|Input amount|
|`tokenIn`|`address`|Input token address|
|`callerAddress`|`address`|Address of the caller|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`received`|`uint256`|Output amount|
|`<none>`|`uint256`|Updated calldata offset after processing|
|`nextToken`|`address`|Next token address|


### _swapExactInSimple

Swaps exact in internally using all implemented Dexs
Will NOT use a flash swap
The dexId is assumed to be fetched before in a prefunding action
As such, the parameter can be plugged in here directly


```solidity
function _swapExactInSimple(
    uint256 amountIn,
    address tokenIn,
    address tokenOut,
    address payer, // first step
    address receiver, // last step
    uint256 currentOffset
)
    internal
    returns (uint256, uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amountIn`|`uint256`|sell amount|
|`tokenIn`|`address`||
|`tokenOut`|`address`||
|`payer`|`address`||
|`receiver`|`address`||
|`currentOffset`|`uint256`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|(amountOut, new offset) buy amount|
|`<none>`|`uint256`||


