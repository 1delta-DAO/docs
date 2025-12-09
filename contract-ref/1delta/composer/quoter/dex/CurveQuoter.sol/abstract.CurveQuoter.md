# CurveQuoter
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\quoter\dex\CurveQuoter.sol)

**Inherits:**
[Masks](\contracts\1delta\shared\masks\Masks.sol\abstract.Masks.md)


## State Variables
### CURVE_FORK_CALCULATE_SWAP

```solidity
bytes32 internal constant CURVE_FORK_CALCULATE_SWAP = 0xa95b089f00000000000000000000000000000000000000000000000000000000
```


### CURVE_GET_DY

```solidity
bytes32 internal constant CURVE_GET_DY = 0x556d6e9f00000000000000000000000000000000000000000000000000000000
```


### CURVE_GET_DY_128

```solidity
bytes32 internal constant CURVE_GET_DY_128 = 0x5e0d443f00000000000000000000000000000000000000000000000000000000
```


## Functions
### _getCurveAmountOut

Calculates amountOut for Curve pools

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | pool                 |
| 20     | 1              | indexIn              |
| 21     | 1              | indexOut             |
| 22     | 1              | selectorId            |
| 23     | 2              | padding              |


```solidity
function _getCurveAmountOut(uint256 amountIn, uint256 currentOffset) internal view returns (uint256 amountOut, uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amountIn`|`uint256`|Input amount|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|Output amount|
|`<none>`|`uint256`|Updated calldata offset after processing|


### _getCurveAmountOutPrivate


```solidity
function _getCurveAmountOutPrivate(
    uint256 indexIn,
    uint256 indexOut,
    uint256 selectorId,
    address pool,
    uint256 amountIn
)
    private
    view
    returns (uint256 amountOut);
```

### getCurveAmountIn


```solidity
function getCurveAmountIn(
    address pool,
    uint256 indexIn,
    uint256 indexOut,
    uint256 amountOut
)
    internal
    view
    returns (uint256 amountIn);
```

