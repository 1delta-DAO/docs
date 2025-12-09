# BalancerV2FlashLoanCallback
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\chains\ethereum\flashLoan\callbacks\BalancerV2Callback.sol)

**Inherits:**
[Slots](\contract-ref\1delta\composer\slots\Slots.sol\contract.Slots.md), [Masks](\contract-ref\1delta\shared\masks\Masks.sol\abstract.Masks.md), [DeltaErrors](\contract-ref\1delta\shared\errors\Errors.sol\abstract.DeltaErrors.md)

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
### receiveFlashLoan

Handles Balancer V2 flash loan callback

Gated via flash loan gateway flag to prevent calls from sources other than this contract

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                  |
|--------|----------------|------------------------------|
| 0      | 20             | origCaller                   |
| 20     | 1              | poolId                       |
| 21     | Variable       | composeOperations            |


```solidity
function receiveFlashLoan(
    address[] calldata,
    uint256[] calldata,
    uint256[] calldata,
    bytes calldata params //
)
    external;
```

### _deltaComposeInternal

Internal function to execute compose operations

Override point for flash loan callbacks to execute compose operations


```solidity
function _deltaComposeInternal(address callerAddress, uint256 offset, uint256 length) internal virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`callerAddress`|`address`|Address of the original caller|
|`offset`|`uint256`|Current calldata offset|
|`length`|`uint256`|Length of remaining calldata|


