# QuoterUtils
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\quoter\dex\utils\QuoterUtils.sol)


## Functions
### parseRevertReason

Parse a revert reason returned from a swap call


```solidity
function parseRevertReason(bytes memory reason) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`reason`|`bytes`|Bytes reason from revert|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|value Extracted amount|


