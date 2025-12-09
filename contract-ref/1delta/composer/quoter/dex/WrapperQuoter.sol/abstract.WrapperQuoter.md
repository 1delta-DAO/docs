# WrapperQuoter
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\quoter\dex\WrapperQuoter.sol)

**Title:**
Quoter for wrapper


## State Variables
### ERC4626_PREVIEW_DEPOSIT
previewDeposit(...)


```solidity
bytes32 private constant ERC4626_PREVIEW_DEPOSIT = 0xef8b30f700000000000000000000000000000000000000000000000000000000
```


### ERC4626_PREVIEW_REDEEM
previewRedeem(...)


```solidity
bytes32 private constant ERC4626_PREVIEW_REDEEM = 0x4cdad50600000000000000000000000000000000000000000000000000000000
```


## Functions
### _quoteWrapperExactIn

Quotes amountOut for wrapper operations (ERC4626 vaults)

This one is for overriding the DEX implementation

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description         |
|--------|----------------|---------------------|
| 0      | 1              | operation           |
| 1      | 1              | pay config          | <- 0: caller pays; 1: contract pays; greater: pre-funded


```solidity
function _quoteWrapperExactIn(
    address assetIn,
    address assetOut,
    uint256 amount,
    uint256 currentOffset
)
    internal
    virtual
    returns (uint256 amountOut, uint256 operationThenOffset);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assetIn`|`address`|Input asset address|
|`assetOut`|`address`|Output asset address|
|`amount`|`uint256`|Input amount|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|Output amount|
|`operationThenOffset`|`uint256`|Updated calldata offset after processing|


