# KTXQuoter
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\quoter\dex\KTXQuoter.sol)

Chain-independent KTX quoter


## State Variables
### PRICE_PRECISION

```solidity
uint256 private constant PRICE_PRECISION = 10 ** 30
```


### USDG_SELECOR

```solidity
bytes32 private constant USDG_SELECOR = 0xf5b91b7b00000000000000000000000000000000000000000000000000000000
```


### PF_SELECOR

```solidity
bytes32 private constant PF_SELECOR = 0x741bef1a00000000000000000000000000000000000000000000000000000000
```


## Functions
### _getKTXAmountOut

Calculates amountOut for KTX swaps

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description          |
|--------|----------------|----------------------|
| 0      | 20             | pool                 |
| 20     | 1              | not used in quoter   |


```solidity
function _getKTXAmountOut(
    address _tokenIn,
    address _tokenOut,
    uint256 amountIn,
    address readerParam,
    uint256 currentOffset
)
    internal
    view
    returns (uint256 amountOut, uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tokenIn`|`address`|Input token address|
|`_tokenOut`|`address`|Output token address|
|`amountIn`|`uint256`|Input amount|
|`readerParam`|`address`|VaultUtils address for oracle queries|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|Output amount|
|`<none>`|`uint256`|Updated calldata offset after processing|


