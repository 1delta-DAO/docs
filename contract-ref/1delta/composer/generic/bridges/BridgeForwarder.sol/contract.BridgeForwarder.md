# BridgeForwarder
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\generic\bridges\BridgeForwarder.sol)

**Inherits:**
[StargateV2](\contracts\1delta\composer\generic\bridges\StargateV2\StargateV2.sol\contract.StargateV2.md), [Across](\contracts\1delta\composer\generic\bridges\Across\Across.sol\contract.Across.md), [SquidRouter](\contracts\1delta\composer\generic\bridges\Squid_Router\SquidRouter.sol\contract.SquidRouter.md), [GasZip](\contracts\1delta\composer\generic\bridges\GasZip\GasZip.sol\contract.GasZip.md)

Aggregates multiple bridge calls


## Functions
### _bridge

Routes to appropriate bridge operation based on operation ID

Supports Stargate V2, Across, SquidRouter, and GasZip bridges

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description     |
|--------|----------------|-----------------|
| 0      | 1              | bridgeOperation  |


```solidity
function _bridge(uint256 currentOffset) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


