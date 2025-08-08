# Operation encoding

## Transfers

```Typescript
enum TransferIds {
    TRANSFER_FROM = 0, // pull funds from caller
    SWEEP = 1, // send funds from this contract
    UNWRAP_WNATIVE = 3, // unwrap
    PERMIT2_TRANSFER_FROM = 4, // permitTransfer
    APPROVE = 5, // approve target
}
```

### TRANSFER_FROM

| Offset | Length (bytes) | Description        |
| ------ | -------------- | ------------------ |
| 0      | 20             | asset `address`    |
| 20     | 20             | receiver `address` |
| 40     | 16             | amount `uint128`   |

If `amount` is `0`, we pull `asset.balanceOf(caller)`.

### SWEEP

```TypeScript
enum SweepType {
    VALIDATE, // check if `balanceOf(address(this) >= amount, if true, transfer it, if not, revert
    AMOUNT // transfer the amount without further checks
}
```

| Offset | Length (bytes) | Description           |
| ------ | -------------- | --------------------- |
| 0      | 20             | asset `address`       |
| 20     | 20             | receiver `address`    |
| 40     | 1              | sweepType `SweepType` |
| 41     | 16             | amount `uint128`      |

Note that `asset` can be the zero address for native currency.

To `wrap` the native currency to wrapped native, you can just use `asset=address(0),receicer=wrappedNativeAddress`.

### APPROVE

| Offset | Length (bytes) | Description      |
| ------ | -------------- | ---------------- |
| 0      | 20             | token `address`  |
| 20     | 20             | target `address` |

ERC20-Approve the `target` via `token`, always uses infitie approve, the approval is stored and skipped if already done in the past.


###