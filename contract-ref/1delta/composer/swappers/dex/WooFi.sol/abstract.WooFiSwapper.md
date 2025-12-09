# WooFiSwapper
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\swappers\dex\WooFi.sol)

**Inherits:**
[ERC20Selectors](\contracts\1delta\shared\selectors\ERC20Selectors.sol\abstract.ERC20Selectors.md), [Masks](\contracts\1delta\shared\masks\Masks.sol\abstract.Masks.md)

**Title:**
WooFi swapper contract


## State Variables
### REBATE_RECIPIENT
WooFi rebate receiver


```solidity
address private constant REBATE_RECIPIENT = 0x0000000000000000000000000000000000000000
```


## Functions
### constructor


```solidity
constructor() ;
```

### _swapWooFiExactIn

Swaps exact input on WOOFi DEX

Pay flag: 0 = caller pays; 1 = contract pays; greater = pre-funded.

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | pool                 |
| 20     | 1              | pay flag             | <- 0: caller pays; 1: contract pays; greater: pre-funded


```solidity
function _swapWooFiExactIn(
    uint256 fromAmount,
    address tokenIn,
    address tokenOut,
    address receiver,
    address callerAddress,
    uint256 currentOffset
)
    internal
    returns (
        uint256 poolThenAmountOut,
        // first assign payFlag, then return offset
        uint256 payFlagCurrentOffset
    );
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`fromAmount`|`uint256`|Input amount|
|`tokenIn`|`address`|Input token address|
|`tokenOut`|`address`|Output token address|
|`receiver`|`address`|Receiver address|
|`callerAddress`|`address`|Address of the caller|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`poolThenAmountOut`|`uint256`|Output amount|
|`payFlagCurrentOffset`|`uint256`|Updated calldata offset after processing|


