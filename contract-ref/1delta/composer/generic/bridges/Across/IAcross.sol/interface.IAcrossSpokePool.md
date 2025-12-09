# IAcrossSpokePool
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\generic\bridges\Across\IAcross.sol)


## Functions
### deposit


```solidity
function deposit(
    bytes32 depositor,
    bytes32 recipient,
    bytes32 inputToken,
    bytes32 outputToken,
    uint256 inputAmount,
    uint256 outputAmount,
    uint256 destinationChainId,
    bytes32 exclusiveRelayer,
    uint32 quoteTimestamp,
    uint32 fillDeadline,
    uint32 exclusivityDeadline,
    bytes memory message
)
    external
    payable;
```

### fillDeadlineBuffer


```solidity
function fillDeadlineBuffer() external view returns (uint32);
```

