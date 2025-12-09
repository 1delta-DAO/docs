# CurveSwapper
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\swappers\dex\CurveSwapper.sol)

**Inherits:**
[ERC20Selectors](\contract-ref\1delta\shared\selectors\ERC20Selectors.sol\abstract.ERC20Selectors.md), [Masks](\contract-ref\1delta\shared\masks\Masks.sol\abstract.Masks.md)

**Title:**
Curve swapper contract

We do Curve stuff here


## State Variables
### CALL_MANAGEMENT_APPROVALS

```solidity
bytes32 private constant CALL_MANAGEMENT_APPROVALS = 0x1aae13105d9b6581c36534caba5708726e5ea1e03175e823c989a5756966d1f3
```


### EXCHANGE_INT
Standard curve pool selectors

selector exchange(int128,int128,uint256,uint256)


```solidity
bytes32 private constant EXCHANGE_INT = 0x3df0212400000000000000000000000000000000000000000000000000000000
```


### EXCHANGE_INT_WITH_RECEIVER
selector exchange(int128,int128,uint256,uint256,address)


```solidity
bytes32 private constant EXCHANGE_INT_WITH_RECEIVER = 0xddc1f59d00000000000000000000000000000000000000000000000000000000
```


### EXCHANGE
selector exchange(uint256,uint256,uint256,uint256)


```solidity
bytes32 private constant EXCHANGE = 0x5b41b90800000000000000000000000000000000000000000000000000000000
```


### EXCHANGE_WITH_RECEIVER
selector exchange(uint256,uint256,uint256,uint256,address)


```solidity
bytes32 private constant EXCHANGE_WITH_RECEIVER = 0xa64833a000000000000000000000000000000000000000000000000000000000
```


### EXCHANGE_UNDERLYING
selector exchange_underlying(uint256,uint256,uint256,uint256)


```solidity
bytes32 private constant EXCHANGE_UNDERLYING = 0x65b2489b00000000000000000000000000000000000000000000000000000000
```


### EXCHANGE_UNDERLYING_WITH_RECEIVER
selector exchange_underlying(uint256,uint256,uint256,uint256,address)


```solidity
bytes32 private constant EXCHANGE_UNDERLYING_WITH_RECEIVER =
    0xe2ad025a00000000000000000000000000000000000000000000000000000000
```


### EXCHANGE_UNDERLYING_INT
selector exchange_underlying(uint256,uint256,uint256,uint256)


```solidity
bytes32 private constant EXCHANGE_UNDERLYING_INT = 0xa6417ed600000000000000000000000000000000000000000000000000000000
```


### EXCHANGE_UNDERLYING_INT_WITH_RECEIVER
selector exchange_underlying(uint256,uint256,uint256,uint256,address)


```solidity
bytes32 private constant EXCHANGE_UNDERLYING_INT_WITH_RECEIVER =
    0x44ee198600000000000000000000000000000000000000000000000000000000
```


### EXCHANGE_RECEIVED
selector exchange_received(uint256,uint256,uint256,uint256)


```solidity
bytes32 private constant EXCHANGE_RECEIVED = 0x29b244bb00000000000000000000000000000000000000000000000000000000
```


### EXCHANGE_RECEIVED_WITH_RECEIVER
selector exchange_received(uint256,uint256,uint256,uint256,address)


```solidity
bytes32 private constant EXCHANGE_RECEIVED_WITH_RECEIVER = 0x767691e700000000000000000000000000000000000000000000000000000000
```


### EXCHANGE_RECEIVED_INT
selector exchange(int128,int128,uint256,uint256)


```solidity
bytes32 private constant EXCHANGE_RECEIVED_INT = 0x7e3db03000000000000000000000000000000000000000000000000000000000
```


### EXCHANGE_RECEIVED_INT_WITH_RECEIVER
selector exchange_received(int128,int128,uint256,uint256,address)


```solidity
bytes32 private constant EXCHANGE_RECEIVED_INT_WITH_RECEIVER =
    0xafb4301200000000000000000000000000000000000000000000000000000000
```


### SWAP
selector for Curve forks using solidity swap(uint8,uint8,uint256,uint256,uint256)


```solidity
bytes32 private constant SWAP = 0x9169558600000000000000000000000000000000000000000000000000000000
```


## Functions
### _fundAndApproveIfNeeded


```solidity
function _fundAndApproveIfNeeded(
    address callerAddress,
    address tokenIn,
    uint256 amount,
    uint256 data
)
    private
    returns (address pool);
```

### _swapCurveGeneral

Swaps using a standard curve pool

Data is supposed to be packed as follows: tokenIn | actionId | dexId | pool | i | j | sm | tokenOut.
sm is the selector, i,j are the swap indexes for the pool.
Pay mode: 0 = pay from self; 1 = caller pays; 3 = pre-funded.

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | pool                 |
| 20     | 1              | i                    |
| 21     | 1              | j                    |
| 22     | 1              | sm                   |
| 23     | 2              | payMode              | <-- 0: pay from self; 1: caller pays; 3: pre-funded;


```solidity
function _swapCurveGeneral(
    address tokenIn,
    address tokenOut,
    uint256 amountIn,
    address receiver, //
    address callerAddress,
    uint256 currentOffset
)
    internal
    returns (
        uint256 amountOut,
        // curve data is a transient memory variable to
        // avoid stack too deep errors
        uint256 curveData
    );
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
|`curveData`|`uint256`|Updated calldata offset after processing|


### _swapCurveFork

Swaps using a standard curve fork pool

Data is supposed to be packed as follows: tokenIn | actionId | dexId | pool | i | j | sm | tokenOut.
sm is the selector, i,j are the swap indexes for the pool.
Pay mode: 0 = pay from self; 1 = caller pays; 3 = pre-funded.

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | pool                 |
| 20     | 1              | i                    |
| 21     | 1              | j                    |
| 22     | 1              | sm                   |
| 23     | 2              | payMode              | <-- 0: pay from self; 1: caller pays; 3: pre-funded;


```solidity
function _swapCurveFork(
    address tokenIn,
    address tokenOut,
    uint256 amountIn,
    address receiver, //
    address callerAddress,
    uint256 currentOffset
)
    internal
    returns (
        uint256 amountOut,
        // curve data is a transient memory variable to
        // avoid stack too deep errors
        uint256 curveData
    );
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
|`curveData`|`uint256`|Updated calldata offset after processing|


### _swapCurveReceived

Swaps using a NG pool that allows for pre-funded swaps

Data is supposed to be packed as follows: tokenIn | actionId | dexId | pool | sm | i | j | tokenOut.
sm is the selector, i,j are the swap indexes for the pool.
Pay mode: 0 = pay from self; 1 = caller pays; 3 = pre-funded.

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | pool                 |
| 20     | 1              | i                    |
| 21     | 1              | j                    |
| 22     | 1              | sm                   |
| 23     | 2              | payMode              | <-- 0: pay from self; 1: caller pays; 3: pre-funded;


```solidity
function _swapCurveReceived(
    address tokenIn,
    uint256 amountIn,
    address receiver, //
    address callerAddress,
    uint256 currentOffset
)
    internal
    returns (
        // assign payFlag then amountOut
        uint256 payFlagAmountOut,
        uint256 curveData
    );
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenIn`|`address`|Input token address|
|`amountIn`|`uint256`|Input amount|
|`receiver`|`address`|Receiver address|
|`callerAddress`|`address`|Address of the caller|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`payFlagAmountOut`|`uint256`|Output amount (with pay flag)|
|`curveData`|`uint256`|Updated calldata offset after processing|


