# BalancerV3Swapper
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\swappers\dex\BalancerV3Swapper.sol)

**Inherits:**
[ERC20Selectors](\contract-ref\1delta\shared\selectors\ERC20Selectors.sol\abstract.ERC20Selectors.md), [Masks](\contract-ref\1delta\shared\masks\Masks.sol\abstract.Masks.md)

**Title:**
Balancer V3 type swapper contract

Can only be executed within `manager.unlock()`
Ergo, if Balancer v3 is in the path (no matter how many times), one has to push
the swap data and execution into the BalancerV3.unlock
This should be usable together with flash loans from their singleton
Can unlock arbitrary times times!
The execution of a swap follows the steps:
1) pm.unlock(...) (outside of this contract)
2) call pm.swap(...)
3) call pm.settle to settle the swap (no native accepted)


## State Variables
### SWAP
We need all these selectors for executing a single swap


```solidity
bytes32 private constant SWAP = 0x2bfb780c00000000000000000000000000000000000000000000000000000000
```


### SETTLE
same selector string name as for UniV4, different params for balancer


```solidity
bytes32 private constant SETTLE = 0x15afd40900000000000000000000000000000000000000000000000000000000
```


### SEND_TO
pull funds from vault with this


```solidity
bytes32 private constant SEND_TO = 0xae63932900000000000000000000000000000000000000000000000000000000
```


## Functions
### constructor


```solidity
constructor() ;
```

### _swapBalancerV3ExactInGeneric

Swaps exact input on Balancer V3 pools

Can only be executed within `manager.unlock()`. Can unlock arbitrary times.

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | pool                 |
| 20     | 20             | manager              |
| 40     | 1              | payFlag              |
| 41     | 2              | calldataLength       | <- this here might be pool-dependent, cannot be used as flag
| 43     | calldataLength | calldata             |


```solidity
function _swapBalancerV3ExactInGeneric(
    uint256 fromAmount,
    address tokenIn,
    address tokenOut,
    address receiver,
    uint256 currentOffset,
    address callerAddress
)
    internal
    returns (
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


