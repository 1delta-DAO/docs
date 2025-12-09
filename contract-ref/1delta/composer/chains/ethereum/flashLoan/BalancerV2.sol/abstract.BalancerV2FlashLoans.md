# BalancerV2FlashLoans
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\chains\ethereum\flashLoan\BalancerV2.sol)

**Inherits:**
[Slots](\contract-ref\1delta\composer\slots\Slots.sol\contract.Slots.md), [Masks](\contract-ref\1delta\shared\masks\Masks.sol\abstract.Masks.md)

Flash loaning through BalancerV2


## State Variables
### BALANCER_V2

```solidity
address private constant BALANCER_V2 = 0xBA12222222228d8Ba445958a75a0704d566BF2C8
```


### SWAAP

```solidity
address private constant SWAAP = 0xd315a9C38eC871068FEC378E4Ce78AF528C76293
```


## Functions
### balancerV2FlashLoan

Initiates a flash loan through Balancer V2

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 20             | asset                           |
| 20     | 16             | amount                          |
| 36     | 2              | paramsLength                    |
| 38     | paramsLength   | params                          | <- the first param here is the poolId


```solidity
function balancerV2FlashLoan(uint256 currentOffset, address callerAddress) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|
|`callerAddress`|`address`|Address of the caller|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


