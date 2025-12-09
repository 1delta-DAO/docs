# DeltaErrors
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\shared\errors\Errors.sol)

**Title:**
Raw error data holder contract


## State Variables
### SLIPPAGE

```solidity
bytes4 internal constant SLIPPAGE = 0x7dd37f70
```


### NATIVE_TRANSFER

```solidity
bytes4 internal constant NATIVE_TRANSFER = 0xf4b3b1bc
```


### WRAP

```solidity
bytes4 internal constant WRAP = 0xc30d93ce
```


### INVALID_DEX

```solidity
bytes4 internal constant INVALID_DEX = 0x7948739e
```


### BAD_POOL

```solidity
bytes4 internal constant BAD_POOL = 0xb2c02722
```


### INVALID_FLASH_LOAN

```solidity
bytes4 internal constant INVALID_FLASH_LOAN = 0xbafe1c53
```


### INVALID_OPERATION

```solidity
bytes4 internal constant INVALID_OPERATION = 0x398d4d32
```


### INVALID_CALLER

```solidity
bytes4 internal constant INVALID_CALLER = 0x48f5c3ed
```


### INVALID_INITIATOR

```solidity
bytes4 internal constant INVALID_INITIATOR = 0xbfda1f28
```


### INVALID_CALLDATA

```solidity
bytes4 internal constant INVALID_CALLDATA = 0x8129bbcd
```


### INVALID_TARGET

```solidity
bytes4 internal constant INVALID_TARGET = 0x4fe6f55f
```


### INVALID_DEX_ID

```solidity
bytes4 internal constant INVALID_DEX_ID = 0x0bbef348
```


## Functions
### _invalidOperation


```solidity
function _invalidOperation() internal pure;
```

## Errors
### Slippage

```solidity
error Slippage();
```

### NativeTransferFailed

```solidity
error NativeTransferFailed();
```

### WrapFailed

```solidity
error WrapFailed();
```

### InvalidDex

```solidity
error InvalidDex();
```

### BadPool

```solidity
error BadPool();
```

### InvalidFlashLoan

```solidity
error InvalidFlashLoan();
```

### InvalidOperation

```solidity
error InvalidOperation();
```

### InvalidCaller

```solidity
error InvalidCaller();
```

### InvalidInitiator

```solidity
error InvalidInitiator();
```

### InvalidCalldata

```solidity
error InvalidCalldata();
```

### Target

```solidity
error Target();
```

### InvalidDexId

```solidity
error InvalidDexId();
```

