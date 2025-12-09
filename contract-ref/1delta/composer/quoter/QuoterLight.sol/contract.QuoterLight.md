# QuoterLight
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\quoter\QuoterLight.sol)

**Inherits:**
[WrapperQuoter](\contracts\1delta\composer\quoter\dex\WrapperQuoter.sol\abstract.WrapperQuoter.md), [BalancerV3Quoter](\contracts\1delta\composer\quoter\dex\BalancerV3Quoter.sol\abstract.BalancerV3Quoter.md), [V4TypeQuoter](\contracts\1delta\composer\quoter\dex\V4TypeQuoter.sol\abstract.V4TypeQuoter.md), [V3TypeQuoter](\contracts\1delta\composer\quoter\dex\V3TypeQuoter.sol\abstract.V3TypeQuoter.md), [V2TypeQuoter](\contracts\1delta\composer\quoter\dex\V2TypeQuoter.sol\abstract.V2TypeQuoter.md), [DodoV2Quoter](\contracts\1delta\composer\quoter\dex\DodoV2Quoter.sol\abstract.DodoV2Quoter.md), [CurveQuoter](\contracts\1delta\composer\quoter\dex\CurveQuoter.sol\abstract.CurveQuoter.md), [WooFiQuoter](\contracts\1delta\composer\quoter\dex\WooFiQuoter.sol\abstract.WooFiQuoter.md), [SyncQuoter](\contracts\1delta\composer\quoter\dex\SyncQuoter.sol\abstract.SyncQuoter.md), [LBQuoter](\contracts\1delta\composer\quoter\dex\LBQuoter.sol\abstract.LBQuoter.md), [GMXQuoter](\contracts\1delta\composer\quoter\dex\GMXV1Quoter.sol\abstract.GMXQuoter.md), [KTXQuoter](\contracts\1delta\composer\quoter\dex\KTXQuoter.sol\abstract.KTXQuoter.md), [BalancerV2Quoter](\contracts\1delta\composer\quoter\dex\BalancerV2Quoter.sol\abstract.BalancerV2Quoter.md)


## Functions
### quote


```solidity
function quote(uint256 amountIn, bytes calldata data) external returns (uint256 amountOut);
```

### _quoteSingleSwapSplitOrRoute


```solidity
function _quoteSingleSwapSplitOrRoute(
    uint256 amountIn,
    address tokenIn,
    uint256 currentOffset
)
    internal
    returns (uint256 amountOut, uint256, address nextToken);
```

### _quoteSingleSwap

We use the `receiver` as an additional addres needed for quoting
for DEXs like GMX and KTX


```solidity
function _quoteSingleSwap(
    uint256 amountIn,
    address tokenIn,
    address tokenOut,
    address receiverParam,
    uint256 currentOffset
)
    internal
    returns (uint256 amountOut, uint256);
```

### _quoteMultiHopSplitSwap


```solidity
function _quoteMultiHopSplitSwap(
    uint256 amountIn,
    uint256 swapMaxIndex,
    address tokenIn,
    uint256 currentOffset
)
    internal
    returns (uint256 amount, uint256, address _tokenIn);
```

### _quoteSingleSwapOrSplit

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
function _quoteSingleSwapOrSplit(
    uint256 amountIn,
    uint256 splitsMaxIndex,
    address tokenIn,
    uint256 currentOffset
)
    internal
    returns (uint256, uint256, address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amountIn`|`uint256`|Input amount|
|`splitsMaxIndex`|`uint256`|Maximum split index|
|`tokenIn`|`address`|Input token address|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated amount after quotes|
|`<none>`|`uint256`|Updated calldata offset after processing|
|`<none>`|`address`|nextToken Next token address|


## Errors
### InvalidDexId

```solidity
error InvalidDexId();
```

