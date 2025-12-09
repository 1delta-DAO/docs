# Across
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\generic\bridges\Across\Across.sol)

**Inherits:**
[BaseUtils](\contracts\1delta\composer\generic\BaseUtils.sol\contract.BaseUtils.md)


## Functions
### _bridgeAcross

Handles Across bridging operations

Decodes calldata and directly executes the bridge operation using assembly

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                  |
|--------|----------------|------------------------------|
| 0      | 20             | spokePool                    |
| 20     | 20             | depositor                    |
| 40     | 20             | inputTokenAddress            |
| 60     | 32             | receivingAssetId             |
| 92     | 16             | amount                       |
| 108    | 16             | FixedFee (in input decimals) |
| 124    | 4              | FeePercentage                |
| 128    | 4              | destinationChainId           |
| 132    | 1              | fromTokenDecimals            |
| 133    | 1              | toTokenDecimals              |
| 134    | 32             | receiver                     |
| 166    | 4              | deadline                     |
| 170    | 2              | message.length: msgLen       |
| 172    | msgLen         | message                      |


```solidity
function _bridgeAcross(uint256 currentOffset) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


