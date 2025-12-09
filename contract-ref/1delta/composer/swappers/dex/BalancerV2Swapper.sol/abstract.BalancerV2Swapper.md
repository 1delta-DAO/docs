# BalancerV2Swapper
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\swappers\dex\BalancerV2Swapper.sol)

**Inherits:**
[ERC20Selectors](\contracts\1delta\shared\selectors\ERC20Selectors.sol\abstract.ERC20Selectors.md), [Masks](\contracts\1delta\shared\masks\Masks.sol\abstract.Masks.md)

**Title:**
Balancer V2 swapper contract that uses Symmetric's vault

Balancer V2 is fun (mostly)


## State Variables
### BALANCER_SWAP
Balancer's single swap function


```solidity
bytes32 private constant BALANCER_SWAP = 0x52bbbe2900000000000000000000000000000000000000000000000000000000
```


## Functions
### _swapBalancerV2ExactIn

Swaps exact input on Balancer V2

Pay flag: 0 = caller pays; 1 = contract pays; greater = pre-funded

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 32             | pool                 |
| 32     | 20             | vault                |
| 52     | 1              | pay flag             | <- 0: caller pays; 1: contract pays; greater: pre-funded


```solidity
function _swapBalancerV2ExactIn(
    address tokenIn,
    address tokenOut,
    uint256 amountIn,
    address receiver,
    address callerAddress,
    uint256 currentOffset //
)
    internal
    returns (uint256 amountOut, uint256 balancerData);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenIn`|`address`|Input token address|
|`tokenOut`|`address`|Output token address|
|`amountIn`|`uint256`|Input amount|
|`receiver`|`address`|Receiver address|
|`callerAddress`|`address`|Address of the caller|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|Output amount|
|`balancerData`|`uint256`|Updated calldata offset after processing|


