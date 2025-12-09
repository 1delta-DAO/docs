# StargateV2
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\generic\bridges\StargateV2\StargateV2.sol)

**Inherits:**
[BaseUtils](\contract-ref\1delta\composer\generic\BaseUtils.sol\contract.BaseUtils.md)


## Functions
### _bridgeStargateV2

Handles Stargate V2 bridging operations

Decodes calldata and forwards the call to the appropriate Stargate adapter function

**Note:**
calldata-offset-table: 


| Offset       | Length (bytes) | Description                  |
|--------------|----------------|------------------------------|
| 0            | 20             | tokenAddress                 |
| 20           | 20             | stargate pool                |
| 40           | 4              | dstEid                       |
| 44           | 32             | receiver                     |
| 76           | 20             | refundReceiver               |
| 96           | 16             | amount                       |
| 112          | 4              | slippage                     |
| 116          | 16             | fee                          |
| 132          | 1              | isBusMode                    |
| 133          | 2              | composeMsg.length: cl        |
| 135          | 2              | extraOptions.length: el      |
| 137          | cl             | composeMsg                   |
| 137+cl       | el             | extraOptions                 |


```solidity
function _bridgeStargateV2(uint256 currentOffset) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


