# SquidRouter
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\generic\bridges\Squid_Router\SquidRouter.sol)

**Inherits:**
[BaseUtils](\contract-ref\1delta\composer\generic\BaseUtils.sol\contract.BaseUtils.md)


## Functions
### _bridgeSquidRouter

Handles SquidRouter bridging operations

Decodes gateway and token addresses, then forwards to bridge call handler

Refactored to fix the stack too deep issue

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                                |
|--------|----------------|--------------------------------------------|
| 0      | 20             | gateway                                    |
| 20     | 20             | token to be bridged                        |


```solidity
function _bridgeSquidRouter(uint256 currentOffset) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


### _squidRouterBridgeCall

Executes the actual SquidRouter bridge call with encoded parameters

Handles variable-length fields for bridgedTokenSymbol, destinationChain, destinationAddress, and payload

**Note:**
calldata-offset-table: 


| Offset       | Length (bytes) | Description                                |
|--------------|----------------|--------------------------------------------|
| 0            | 2              | bridgedTokenSymbol.length: sl              |
| 2            | 2              | destinationChain.length: dl                |
| 4            | 2              | destinationAddress.length: al              |
| 6            | 2              | payload.length: pl                         |
| 8            | 16             | amount                                     |
| 24           | 16             | nativeAmount                               |
| 40           | 20             | gasRefundRecipient                         |
| 60           | 1              | enableExpress                              |
| 61           | sl             | bridgedTokenSymbol                         |
| 61+sl        | dl             | destinationChain                           |
| 61+sl+dl     | al             | destinationAddress                         |
| 61+sl+dl+al  | pl             | payload                                    |


```solidity
function _squidRouterBridgeCall(address gateway, address asset, uint256 currentOffset) private returns (uint256 ptr);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`gateway`|`address`|The SquidRouter gateway address|
|`asset`|`address`|The token to be bridged|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`ptr`|`uint256`|Updated calldata offset after processing|


