# Transfers

Lead type: `ComposerCommands.TRANSFERS`.

The sub types are dcefined by the following enum:

```Typescript
enum TransferIds {
    TRANSFER_FROM = 0, // pull funds from caller
    SWEEP = 1, // send funds from this contract
    UNWRAP_WNATIVE = 3, // unwrap
    PERMIT2_TRANSFER_FROM = 4, // permitTransfer
    APPROVE = 5, // approve target
}
```

To encode an operation, te caller has to append

```Solidity
abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.[Operation]),
    ...params
    )
```

to the array of composer commands.

## TRANSFER_FROM

Pull funds from the caller to a receiver address.

| Offset | Length (bytes) | Description        |
| ------ | -------------- | ------------------ |
| 0      | 20             | asset `address`    |
| 20     | 20             | receiver `address` |
| 40     | 16             | amount `uint128`   |

If `amount` is `0`, we pull `asset.balanceOf(caller)`.

## SWEEP

Pull funds from this contract to a provided address.

Can be used to run slippage checks.

```TypeScript
enum SweepType {
    VALIDATE = 0, // check if `balanceOf(address(this) >= amount, if true, transfer it, if not, revert
    AMOUNT = 1 // transfer the amount without further checks
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

## APPROVE

Approve an asset - typically for a leder operation or external call.

| Offset | Length (bytes) | Description      |
| ------ | -------------- | ---------------- |
| 0      | 20             | token `address`  |
| 20     | 20             | target `address` |

ERC20-Approve the `target` via `token`, always uses infitie approve, the approval is stored and skipped if already done in the past.

## UNWRAP

Unwrap native asset and transfer if needed.

| Offset | Length (bytes) | Description                    |
| ------ | -------------- | ------------------------------ |
| 0      | 20             | wrappedNativeAddress `address` |
| 20     | 20             | receiver `address`             |
| 40     | 1              | sweepType `SweepType`          |
| 41     | 16             | amount `uint128`               |

Note that we do not hard-code the wrapped native address as some chains have duplicate wnative implementations.

## PERMIT2_TRANSFER_FROM

Execute a transfer via permit2. We only support the canonical Unsiwap permit2 at address `0x000000000022D473030F116dDEE9F6B43aC78BA3`.

| Offset | Length (bytes) | Description        |
| ------ | -------------- | ------------------ |
| 0      | 20             | asset `address`    |
| 20     | 20             | receiver `address` |
| 40     | 16             | amount `uint128`   |
