# BaseUtils
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\generic\BaseUtils.sol)

**Inherits:**
[ERC20Selectors](\contracts\1delta\shared\selectors\ERC20Selectors.sol\abstract.ERC20Selectors.md), [Masks](\contracts\1delta\shared\masks\Masks.sol\abstract.Masks.md), [DeltaErrors](\contracts\1delta\shared\errors\Errors.sol\abstract.DeltaErrors.md)


## State Variables
### FEE_DENOMINATOR

```solidity
uint256 internal constant FEE_DENOMINATOR = 1e9
```


### INSUFFICIENT_VALUE

```solidity
uint256 internal constant INSUFFICIENT_VALUE = 0x1101129400000000000000000000000000000000000000000000000000000000
```


### INSUFFICIENT_AMOUNT

```solidity
uint256 internal constant INSUFFICIENT_AMOUNT = 0x5945ea5600000000000000000000000000000000000000000000000000000000
```


### ZERO_BALANCE

```solidity
uint256 internal constant ZERO_BALANCE = 0x669567ea00000000000000000000000000000000000000000000000000000000
```


### BRIDGE_FAILED

```solidity
uint256 internal constant BRIDGE_FAILED = 0xc3b9eede00000000000000000000000000000000000000000000000000000000
```


### INVALID_DESTINATION

```solidity
uint256 internal constant INVALID_DESTINATION = 0xac6b05f500000000000000000000000000000000000000000000000000000000
```


### INVALID_RECEIVER

```solidity
uint256 internal constant INVALID_RECEIVER = 0x1e4ec46b00000000000000000000000000000000000000000000000000000000
```


### REPLACE_OFFSET_OUT_OF_BOUNDS

```solidity
uint256 internal constant REPLACE_OFFSET_OUT_OF_BOUNDS = 0x5395d85400000000000000000000000000000000000000000000000000000000
```


## Errors
### InvalidAssetId

```solidity
error InvalidAssetId(uint16 assetId);
```

### InsufficientValue

```solidity
error InsufficientValue();
```

### InsufficientAmount

```solidity
error InsufficientAmount();
```

### SlippageTooHigh

```solidity
error SlippageTooHigh(uint256 expected, uint256 actual);
```

### ZeroBalance

```solidity
error ZeroBalance();
```

### BridgeFailed

```solidity
error BridgeFailed();
```

### InvalidDestination

```solidity
error InvalidDestination();
```

### InvalidReceiver

```solidity
error InvalidReceiver();
```

### ReplaceOffsetOutOfBounds

```solidity
error ReplaceOffsetOutOfBounds();
```

