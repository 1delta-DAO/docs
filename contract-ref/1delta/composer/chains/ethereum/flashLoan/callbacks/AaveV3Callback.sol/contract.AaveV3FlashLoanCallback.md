# AaveV3FlashLoanCallback
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\chains\ethereum\flashLoan\callbacks\AaveV3Callback.sol)

**Inherits:**
[Masks](\contracts\1delta\shared\masks\Masks.sol\abstract.Masks.md), [DeltaErrors](\contracts\1delta\shared\errors\Errors.sol\abstract.DeltaErrors.md)

**Title:**
Take an Aave v3 flash loan callback


## State Variables
### AAVE_V3

```solidity
address private constant AAVE_V3 = 0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2
```


### AAVE_V3_PRIME

```solidity
address private constant AAVE_V3_PRIME = 0x4e033931ad43597d96D6bcc25c280717730B58B1
```


### AAVE_V3_ETHER_FI

```solidity
address private constant AAVE_V3_ETHER_FI = 0x0AA97c284e98396202b6A04024F5E2c65026F3c0
```


### AAVE_V3_HORIZON

```solidity
address private constant AAVE_V3_HORIZON = 0xAe05Cd22df81871bc7cC2a04BeCfb516bFe332C8
```


### SPARK

```solidity
address private constant SPARK = 0xC13e21B648A5Ee794902342038FF3aDAB66BE987
```


### ZEROLEND_STABLECOINS_RWA

```solidity
address private constant ZEROLEND_STABLECOINS_RWA = 0xD3a4DA66EC15a001466F324FA08037f3272BDbE8
```


### ZEROLEND_ETH_LRTS

```solidity
address private constant ZEROLEND_ETH_LRTS = 0x3BC3D34C32cc98bf098D832364Df8A222bBaB4c0
```


### ZEROLEND_BTC_LRTS

```solidity
address private constant ZEROLEND_BTC_LRTS = 0xCD2b31071119D7eA449a9D211AC8eBF7Ee97F987
```


### AVALON_SOLVBTC

```solidity
address private constant AVALON_SOLVBTC = 0x35B3F1BFe7cbE1e95A3DC2Ad054eB6f0D4c879b6
```


### AVALON_SWELLBTC

```solidity
address private constant AVALON_SWELLBTC = 0xE0E468687703dD02BEFfB0BE13cFB109529F38e0
```


### AVALON_PUMPBTC

```solidity
address private constant AVALON_PUMPBTC = 0x1c8091b280650aFc454939450699ECAA67C902d9
```


### AVALON_EBTC_LBTC

```solidity
address private constant AVALON_EBTC_LBTC = 0xCfe357D2dE5aa5dAB5fEf255c911D150d0246423
```


### KINZA

```solidity
address private constant KINZA = 0xeA14474946C59Dee1F103aD517132B3F19Cef1bE
```


### YLDR

```solidity
address private constant YLDR = 0x6447c4390457CaD03Ec1BaA4254CEe1A3D9e1Bbd
```


## Functions
### executeOperation

Handles Aave V3 flash loan callback

Validates caller, extracts original caller from params, and executes compose operations

**Note:**
calldata-offset-table: 


| Offset | Length (bytes) | Description                  |
|--------|----------------|------------------------------|
| 0      | 20             | origCaller                   |
| 20     | 1              | poolId                       |
| 21     | Variable       | composeOperations           |


```solidity
function executeOperation(
    address,
    uint256,
    uint256,
    address initiator,
    bytes calldata params // user params
)
    external
    returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`||
|`<none>`|`uint256`||
|`<none>`|`uint256`||
|`initiator`|`address`|The address that initiated the flash loan|
|`params`|`bytes`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|Always returns true on success|


### _deltaComposeInternal

Internal function to execute compose operations

Override point for flash loan callbacks to execute compose operations


```solidity
function _deltaComposeInternal(address callerAddress, uint256 offset, uint256 length) internal virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`callerAddress`|`address`|Address of the original caller|
|`offset`|`uint256`|Current calldata offset|
|`length`|`uint256`|Length of remaining calldata|


