# ERC4626Transfers
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\ERC4626\ERC4626Transfers.sol)

**Inherits:**
[ERC20Selectors](\contracts\1delta\shared\selectors\ERC20Selectors.sol\abstract.ERC20Selectors.md), [Masks](\contracts\1delta\shared\masks\Masks.sol\abstract.Masks.md), [DeltaErrors](\contracts\1delta\shared\errors\Errors.sol\abstract.DeltaErrors.md)

ERC4626 deposit and withdraw actions

Handles ERC4626 vault operations including deposit, mint, withdraw, and redeem


## State Variables
### ERC4626_MINT
mint(...)


```solidity
bytes32 private constant ERC4626_MINT = 0x94bf804d00000000000000000000000000000000000000000000000000000000
```


### ERC4626_DEPOSIT
deposit(...)


```solidity
bytes32 private constant ERC4626_DEPOSIT = 0x6e553f6500000000000000000000000000000000000000000000000000000000
```


### ERC4626_WITHDRAW
withdraw(...)


```solidity
bytes32 private constant ERC4626_WITHDRAW = 0xb460af9400000000000000000000000000000000000000000000000000000000
```


### ERC4626_REDEEM
redeem(...)


```solidity
bytes32 private constant ERC4626_REDEEM = 0xba08765200000000000000000000000000000000000000000000000000000000
```


## Functions
### _encodeErc4646Deposit

Deposit to ERC4626 vault (e.g. morpho)

Decodes calldata and executes deposit or mint operation on an ERC4626 vault

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                  |
|--------|----------------|------------------------------|
| 0      | 20             | asset                        |
| 20     | 20             | vaultContract                |
| 40     | 16             | amount (with flags)          |
| 56     | 20             | receiver                     |


```solidity
function _encodeErc4646Deposit(uint256 currentOffset) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


### _encodeErc4646Withdraw

Withdraw from ERC4626 vault (e.g. morpho)

Decodes calldata and executes withdraw or redeem operation on an ERC4626 vault

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                  |
|--------|----------------|------------------------------|
| 0      | 20             | vaultContract                |
| 20     | 16             | amount (with flags)          |
| 36     | 20             | receiver                     |


```solidity
function _encodeErc4646Withdraw(uint256 currentOffset, address callerAddress) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|
|`callerAddress`|`address`|Address of the caller|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Updated calldata offset after processing|


