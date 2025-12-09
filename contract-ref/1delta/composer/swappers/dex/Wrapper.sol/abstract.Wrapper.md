# Wrapper
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\swappers\dex\Wrapper.sol)

**Inherits:**
[ERC20Selectors](\contracts\1delta\shared\selectors\ERC20Selectors.sol\abstract.ERC20Selectors.md), [Masks](\contracts\1delta\shared\masks\Masks.sol\abstract.Masks.md)

**Title:**
ERC4626 vault & native wrap "swapper" contract
The logic is as follows
- the only parameter is an indicator for the operation (0: native wrap | 1: deposit | 2: redeem)
- the native case has the direction implied by the asset address (asset=0 mean native),
as such, assetIn=0 means wrap, in this case amountIn=amountOut
- ERC4626 only uses deposit and redeem (as these are the exact in operations), these
require the output amount to be read from the returndata


## State Variables
### ERC4626_DEPOSIT
deposit(...)


```solidity
bytes32 private constant ERC4626_DEPOSIT = 0x6e553f6500000000000000000000000000000000000000000000000000000000
```


### ERC4626_REDEEM
redeem(...)


```solidity
bytes32 private constant ERC4626_REDEEM = 0xba08765200000000000000000000000000000000000000000000000000000000
```


### NATIVE_TRANSFER

```solidity
bytes4 private constant NATIVE_TRANSFER = 0xf4b3b1bc
```


### WRAP

```solidity
bytes4 private constant WRAP = 0xc30d93ce
```


## Functions
### _wrapperOperation

Wrapper operation for ERC4626 vault and native wrap

This one is for overriding the DEX implementation.
For native wrapping, the assetIn/assetOut constellation defines the direction.
For ERC4626, the direction is defined by the operation parameter:
- 0: native wrap/unwrap
- 1: deposit - deposit to vault, assetIn is the underlying and assetOut is the vault
- 2: redeem - redeem shares, assetIn is the vault, assetOut is the underlying
Pay config: 0 = caller pays; 1 = contract pays; greater = pre-funded.

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description         |
|--------|----------------|---------------------|
| 0      | 1              | operation           |
| 1      | 1              | pay config          | <- 0: caller pays; 1: contract pays; greater: pre-funded


```solidity
function _wrapperOperation(
    address assetIn,
    address assetOut,
    uint256 amount,
    address receiver,
    address callerAddress,
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
|`amount`|`uint256`|Amount to process|
|`receiver`|`address`|Receiver address|
|`callerAddress`|`address`|Address of the caller|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|Output amount|
|`operationThenOffset`|`uint256`|Updated calldata offset after processing|


