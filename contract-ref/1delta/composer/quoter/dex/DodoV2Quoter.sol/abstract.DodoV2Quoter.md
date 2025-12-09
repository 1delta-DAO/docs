# DodoV2Quoter
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\quoter\dex\DodoV2Quoter.sol)

**Inherits:**
[Masks](\contracts\1delta\shared\masks\Masks.sol\abstract.Masks.md)


## Functions
### _getDodoV2AmountOut

Calculates amountOut for Dodo V2 pools

Does not require overflow checks

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | pool                 |
| 20     | 1              | sellQuote            |
| 21     | 2              | pId                  | pool index for flash validation
| 23     | 2              | clLength / pay flag  | <- 0: caller pays; 1: contract pays; greater: pre-funded
| 25     | clLength       | calldata             | calldata for flash loan


```solidity
function _getDodoV2AmountOut(
    uint256 sellAmount,
    uint256 currentOffset
)
    internal
    view
    returns (uint256 amountOut, uint256 newOffset);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sellAmount`|`uint256`|Input amount|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|Output amount|
|`newOffset`|`uint256`|Updated calldata offset after processing|


### _getDodoV2AmountOut


```solidity
function _getDodoV2AmountOut(address pair, uint256 sellQuote, uint256 amountIn) private view returns (uint256 amountOut);
```

