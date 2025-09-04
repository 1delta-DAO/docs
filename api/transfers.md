# Transfers

[Operations](./operations.md) → Transfers _(Composer and Call Forwarder)_

Lead type: `ComposerCommands.TRANSFERS`.

The sub types are defined by the following enum:

#### `TransferIds` Enum

| Value | Name                                                        | Description                   |
| ----- | ----------------------------------------------------------- | ----------------------------- |
| 0     | [`TRANSFER_FROM`](#transfer-from-operation)                 | Pull funds from caller        |
| 1     | [`SWEEP`](#sweep-operation)                                 | Send funds from this contract |
| 3     | [`UNWRAP_WNATIVE`](#unwrap-wnative-operation)               | Unwrap native currency        |
| 4     | [`PERMIT2_TRANSFER_FROM`](#permit2-transfer-from-operation) | Permit2 transfer              |
| 5     | [`APPROVE`](#approve-operation)                             | Approve target                |

#### SweepType Enum

| Value | Name       | Description                                                                       |
| ----- | ---------- | --------------------------------------------------------------------------------- |
| 0     | `VALIDATE` | Check if `balanceOf(address(this)) >= amount`, if true transfer it, if not revert |
| 1     | `AMOUNT`   | Transfer the amount without validation                                            |

To encode an operation, the caller has to append

```solidity
abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.[Operation]),
    ...params
);
```

to the array of composer commands.

## Transfer From Operation

Pull funds from the caller to a receiver address.

### Parameters

| Offset | Length (bytes) | Description        |
| ------ | -------------- | ------------------ |
| 0      | 20             | asset `address`    |
| 20     | 20             | receiver `address` |
| 40     | 16             | amount `uint128`   |

### Notes

If `amount` is `0`, we pull `asset.balanceOf(caller)`.

### Encoding Example

```solidity
// Solidity
bytes memory transferFromOp = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.TRANSFER_FROM),
    assetAddress,
    receiverAddress,
    uint128(amount)
);
```

```typescript
// TypeScript
const transferFromOp = encodePacked(
    ["uint8", "uint8", "address", "address", "uint128"],
    [TRANSFERS_COMMAND, TransferIds.TRANSFER_FROM, assetAddress, receiverAddress, amount]
)
```

## Sweep Operation

Pull funds from this contract to a provided address.

### Parameters

| Offset | Length (bytes) | Description           |
| ------ | -------------- | --------------------- |
| 0      | 20             | asset `address`       |
| 20     | 20             | receiver `address`    |
| 40     | 1              | sweepType `SweepType` |
| 41     | 16             | amount `uint128`      |

### Enums Used

-   [SweepType Enum](#sweeptype-enum) - Validation mode for the sweep operation

### Notes

Note that `asset` can be the zero address for native currency.

### Encoding Examples

```solidity
// Solidity - Basic sweep
bytes memory sweepOp = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.SWEEP),
    assetAddress,
    receiverAddress,
    uint8(SweepType.AMOUNT),
    uint128(amount)
);
```

```typescript
// TypeScript - Basic sweep
const sweepOp = encodePacked(
    ["uint8", "uint8", "address", "address", "uint8", "uint128"],
    [TRANSFERS_COMMAND, TransferIds.SWEEP, assetAddress, receiverAddress, SweepType.AMOUNT, amount]
)
```

## Sweeping Full Balance

To sweep the entire balance of an asset without knowing the exact amount, set `amount = 0` and use `SweepType.VALIDATE`:

```typescript
// Sweep entire token balance
function encodeSweepFullBalance(asset: string, receiver: string) {
    return abi.encodePacked(
        uint8(ComposerCommands.TRANSFERS),
        uint8(TransferIds.SWEEP),
        asset,
        receiver,
        uint8(SweepType.VALIDATE), // fetch actual balance and validate
        uint128(0) // amount = 0 triggers balanceOf lookup
    )
}
```

This works because:

-   `SweepType.VALIDATE` fetches the actual balance using `balanceOf(address(this))`
-   `amount = 0` ensures the validation always passes (balance >= 0)
-   The full balance is transferred to the receiver

## Wrapping Native Currency

To `wrap` the native currency to wrapped native, you can just use `asset=address(0),receiver=wrappedNativeAddress`.

```typescript
// Wrap native currency using SWEEP operation
function encodeWrap(amount: bigint, wrapTarget: string) {
    return abi.encodePacked(
        uint8(ComposerCommands.TRANSFERS),
        uint8(TransferIds.SWEEP),
        address(0), // signals native asset
        wrapTarget, // wrapped native contract address
        uint8(SweepType.AMOUNT),
        uint128(amount)
    )
}
```

This works because:

-   `asset = address(0)` tells the system to handle native currency
-   The wrapped native contract's `receive()` or `fallback()` function automatically wraps incoming native currency

## Unwrap WNative Operation

Unwrap native asset and transfer if needed.

### Parameters

| Offset | Length (bytes) | Description                    |
| ------ | -------------- | ------------------------------ |
| 0      | 20             | wrappedNativeAddress `address` |
| 20     | 20             | receiver `address`             |
| 40     | 1              | sweepType `SweepType`          |
| 41     | 16             | amount `uint128`               |

### Enums Used

-   [SweepType Enum](#sweeptype-enum) - Validation mode for the unwrap operation

### Notes

Note that we do not hard-code the wrapped native address as some chains have duplicate wnative implementations.

### Encoding Example

```solidity
// Solidity
bytes memory unwrapOp = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.UNWRAP_WNATIVE),
    wrappedNativeAddress,
    receiverAddress,
    uint8(SweepType.AMOUNT),
    uint128(amount)
);
```

```typescript
// TypeScript
const unwrapOp = encodePacked(
    ["uint8", "uint8", "address", "address", "uint8", "uint128"],
    [TRANSFERS_COMMAND, TransferIds.UNWRAP_WNATIVE, wrappedNativeAddress, receiverAddress, SweepType.AMOUNT, amount]
)
```

## Permit2 Transfer From Operation

Execute a transfer via permit2. We only support the canonical Uniswap permit2 at address `0x000000000022D473030F116dDEE9F6B43aC78BA3`.

### Parameters

| Offset | Length (bytes) | Description        |
| ------ | -------------- | ------------------ |
| 0      | 20             | asset `address`    |
| 20     | 20             | receiver `address` |
| 40     | 16             | amount `uint128`   |

### Notes

If `amount` is `0`, we pull `asset.balanceOf(caller)`.

### Encoding Example

```solidity
// Solidity
bytes memory permit2TransferOp = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.PERMIT2_TRANSFER_FROM),
    assetAddress,
    receiverAddress,
    uint128(amount)
);
```

```typescript
// TypeScript
const permit2TransferOp = encodePacked(
    ["uint8", "uint8", "address", "address", "uint128"],
    [TRANSFERS_COMMAND, TransferIds.PERMIT2_TRANSFER_FROM, assetAddress, receiverAddress, amount]
)
```

## Approve Operation

Approve an asset - typically for a lender operation or external call.

### Parameters

| Offset | Length (bytes) | Description      |
| ------ | -------------- | ---------------- |
| 0      | 20             | token `address`  |
| 20     | 20             | target `address` |

### Notes

ERC20-Approve the `target` via `token`, always uses infinite approve, the approval is stored and skipped if already done in the past.

### Encoding Example

```solidity
// Solidity
bytes memory approveOp = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.APPROVE),
    tokenAddress,
    targetAddress
);
```

```typescript
// TypeScript
const approveOp = encodePacked(["uint8", "uint8", "address", "address"], [TRANSFERS_COMMAND, TransferIds.APPROVE, tokenAddress, targetAddress])
```
