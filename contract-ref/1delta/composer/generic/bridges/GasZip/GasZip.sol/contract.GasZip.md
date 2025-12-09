# GasZip
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\generic\bridges\GasZip\GasZip.sol)

**Inherits:**
[BaseUtils](\contract-ref\1delta\composer\generic\BaseUtils.sol\contract.BaseUtils.md)


## Functions
### _bridgeGasZip

Handles GasZip bridging (GasZip v1)

https://dev.gas.zip/gas/code-examples/evm-deposit/contract-forwarder

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                  |
|--------|----------------|------------------------------|
| 0      | 20             | gasZipRouter                 |
| 20     | 32             | receiver                     |
| 52     | 16             | amount                       |
| 68     | 32             | destinatinChainId            |


```solidity
function _bridgeGasZip(uint256 currentOffset) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


