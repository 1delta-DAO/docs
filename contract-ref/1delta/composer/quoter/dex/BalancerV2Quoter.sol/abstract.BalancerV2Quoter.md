# BalancerV2Quoter
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\quoter\dex\BalancerV2Quoter.sol)

**Inherits:**
[Masks](\contracts\1delta\shared\masks\Masks.sol\abstract.Masks.md)

**Title:**
Balancer V2 quoter contract

Balancer V2 is fun (mostly)


## Functions
### _getBalancerAmountOut

Call queryBatchSwap on the Balancer V2 vault.

Should be avoided if possible as it executes (but reverts) state changes in the balancer vault
Executes `call` and therefore is non-view
Will allow to save a refund transfer since we calculate the exact amount
Since we check slippage manually, the concerns mentioned in https://docs.balancer.fi/reference/contracts/query-functions.html
do not apply.

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 32             | poolId               |
| 32     | 20             | vault                 |
| 52     | 1              | payFlag               |


```solidity
function _getBalancerAmountOut(
    address tokenIn,
    address tokenOut,
    uint256 amountIn,
    uint256 currentOffset //
)
    internal
    returns (uint256 amountOut, uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenIn`|`address`|Input token address|
|`tokenOut`|`address`|Output token address|
|`amountIn`|`uint256`|Input amount|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|Output amount|
|`<none>`|`uint256`|Updated calldata offset after processing|


