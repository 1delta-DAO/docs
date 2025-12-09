# MorphoLending
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\lending\MorphoLending.sol)

**Inherits:**
[ERC20Selectors](\contract-ref\1delta\shared\selectors\ERC20Selectors.sol\abstract.ERC20Selectors.md), [Masks](\contract-ref\1delta\shared\masks\Masks.sol\abstract.Masks.md)

Lending base contract that wraps Morpho Blue


## State Variables
### MORPHO_POSITION
Constant MorphoB address

position(...)


```solidity
bytes32 private constant MORPHO_POSITION = 0x93c5206200000000000000000000000000000000000000000000000000000000
```


### MORPHO_MARKET
market(...)


```solidity
bytes32 private constant MORPHO_MARKET = 0x5c60e39a00000000000000000000000000000000000000000000000000000000
```


### MORPHO_REPAY
repay(...)


```solidity
bytes32 private constant MORPHO_REPAY = 0x20b76e8100000000000000000000000000000000000000000000000000000000
```


### MORPHO_SUPPLY_COLLATERAL
supplyCollateral(...)


```solidity
bytes32 private constant MORPHO_SUPPLY_COLLATERAL = 0x238d657900000000000000000000000000000000000000000000000000000000
```


### MORPHO_SUPPLY
supply(...)


```solidity
bytes32 private constant MORPHO_SUPPLY = 0xa99aad8900000000000000000000000000000000000000000000000000000000
```


### MORPHO_BORROW
borrow(...)


```solidity
bytes32 private constant MORPHO_BORROW = 0x50d8cd4b00000000000000000000000000000000000000000000000000000000
```


### MORPHO_WITHDRAW_COLLATERAL
withdrawCollateral(...)


```solidity
bytes32 private constant MORPHO_WITHDRAW_COLLATERAL = 0x8720316d00000000000000000000000000000000000000000000000000000000
```


## Functions
### _morphoBorrow

Borrows from Morpho Blue lending pool

Supports borrowing by assets or shares. We allow all morphos (incl forks).

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 20             | MarketParams.loanToken          |
| 20     | 20             | MarketParams.collateralToken    |
| 40     | 20             | MarketParams.oracle             |
| 60     | 20             | MarketParams.irm                |
| 80     | 16             | MarketParams.lltv               |
| 96     |  1             | Assets or Shares                |
| 97     | 15             | Amount (borrowAm)               |
| 112    | 20             | receiver                        |
| 132    | 20             | morpho                          | <-- we allow all morphos (incl forks)


```solidity
function _morphoBorrow(uint256 currentOffset, address callerAddress) internal returns (uint256);
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


### _encodeMorphoDeposit

Deposits lending token to Morpho Blue

This deposits LENDING TOKEN. Supports deposits by assets or shares. We allow all morphos (incl forks).

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 20             | MarketParams.loanToken          |
| 20     | 20             | MarketParams.collateralToken    |
| 40     | 20             | MarketParams.oracle             |
| 60     | 20             | MarketParams.irm                |
| 80     | 16             | MarketParams.lltv               |
| 96     |  1             | Assets or Shares                |
| 97     | 15             | Amount (depositAm)              |
| 112    | 20             | receiver                        |
| 132    | 20             | morpho                          | <-- we allow all morphos (incl forks)
| 152    | 2              | calldataLength                  |
| 154    | calldataLength | calldata                        |


```solidity
function _encodeMorphoDeposit(uint256 currentOffset, address callerAddress) internal returns (uint256);
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


### _encodeMorphoDepositCollateral

Deposits collateral to Morpho Blue

This deposits COLLATERAL - never uses shares. We allow all morphos (incl forks).

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 20             | MarketParams.loanToken          |
| 20     | 20             | MarketParams.collateralToken    |
| 40     | 20             | MarketParams.oracle             |
| 60     | 20             | MarketParams.irm                |
| 80     | 16             | MarketParams.lltv               |
| 96     | 16             | Amount (depositAm)              |
| 112    | 20             | receiver                        |
| 132    | 20             | morpho                          | <-- we allow all morphos (incl forks)
| 152    | 2              | calldataLength                  |
| 154    | calldataLength | calldata                        |


```solidity
function _encodeMorphoDepositCollateral(uint256 currentOffset, address callerAddress) internal returns (uint256);
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


### _encodeMorphoWithdrawCollateral

Withdraws collateral from Morpho Blue

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 20             | MarketParams.loanToken          |
| 20     | 20             | MarketParams.collateralToken    |
| 40     | 20             | MarketParams.oracle             |
| 60     | 20             | MarketParams.irm                |
| 80     | 16             | MarketParams.lltv               |
| 96     | 16             | Amount                          |
| 112    | 20             | receiver                        |
| 132    | 20             | morpho                          |


```solidity
function _encodeMorphoWithdrawCollateral(uint256 currentOffset, address callerAddress) internal returns (uint256);
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


### _encodeMorphoWithdraw

Withdraws borrow asset from Morpho Blue

Supports withdrawal by assets or shares

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 20             | MarketParams.loanToken          |
| 20     | 20             | MarketParams.collateralToken    |
| 40     | 20             | MarketParams.oracle             |
| 60     | 20             | MarketParams.irm                |
| 80     | 16             | MarketParams.lltv               |
| 96     | 16             | Amount                          |
| 112    | 20             | receiver                        |
| 132    | 20             | morpho                          |


```solidity
function _encodeMorphoWithdraw(uint256 currentOffset, address callerAddress) internal returns (uint256);
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


### _morphoRepay

Repays debt to Morpho Blue

Supports repayment by assets or shares. Max amount repays safe maximum.

**Note:**
calldata-offset-table: 

| Offset | Length (bytes) | Description                     |
|--------|----------------|---------------------------------|
| 0      | 20             | MarketParams.loanToken          |
| 20     | 20             | MarketParams.collateralToken    |
| 40     | 20             | MarketParams.oracle             |
| 60     | 20             | MarketParams.irm                |
| 80     | 16             | MarketParams.lltv               |
| 96     | 16             | Amount                          |
| 112    | 20             | receiver                        |
| 132    | 20             | morpho                          |
| 152    | 2              | calldataLength                  |
| 154    | calldataLength | calldata                        |


```solidity
function _morphoRepay(uint256 currentOffset, address callerAddress)
    internal
    returns (
        // this will be returned as the offset, but initialized as lltvAndAmount
        // we use it here to avoid stack-too deep
        uint256 tempData
    );
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentOffset`|`uint256`|Current position in the calldata|
|`callerAddress`|`address`|Address of the caller|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tempData`|`uint256`|Updated calldata offset after processing|


