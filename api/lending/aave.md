# Aave V2 & V3 & Forks

[Operations](../operations.md) → [Lending](../lending.md) → Aave V2 & V3 _(Composer)_

Aave V2 and V3 behave very similar for all operations. The caller only needs to distinguish them via `LenderIds`, the rest is handled by the contract logic.

## Deposit

Deposit the underlying to the lender for the given `pool`.

If `amount=0`, we use the contract balance via `underlying.balanceOf(address(this))`. This is recommended when executing this operation after a swap.

| Offset | Length (bytes) | Description          |
| ------ | -------------- | -------------------- |
| 0      | 20             | underlying `address` |
| 20     | 16             | amount `uint128`     |
| 36     | 20             | receiver `address`   |
| 76     | 20             | pool `address`       |

## Withdraw

Withdraw for the lender. Note that this requires that the caller approved the composer to spend `aToken` on their behalf.

If `amount=0xffffffffffffffffffffffffffff`, we read `underlying.balanceOf(callerAddress)` and withdraw the full balance without leaving dust.

| Offset | Length (bytes) | Description          |
| ------ | -------------- | -------------------- |
| 0      | 20             | underlying `address` |
| 20     | 16             | amount `uint128`     |
| 36     | 20             | receiver `address`   |
| 76     | 20             | aToken `address`     |
| 96     | 20             | pool `address`       |

## Borrow

Borrow from the lender. The prerequisite is that the caller approved the composer contract to borrow on their behalf via `debtToken.approveDelegation(...)`.

It is important that the `mode` is provided here, most Aave forks only support `mode=2` (variable). If the selector without `mode` is used, one needs to set `mode=0`.

| Offset | Length (bytes) | Description          |
| ------ | -------------- | -------------------- |
| 0      | 20             | underlying `address` |
| 20     | 16             | amount `uint128`     |
| 36     | 20             | receiver `address`   |
| 76     | 1              | mode `uint8`         |
| 77     | 20             | pool `address`       |

## Repay

Repay to the lender. In this case, use `amount=0` to repay `underlying.balanceOf(address(this))`, the contract balance, if `amount=0xffffffffffffffffffffffffffff`, repay the minimum of the contract balance and the caller debt.

| Offset | Length (bytes) | Description          |
| ------ | -------------- | -------------------- |
| 0      | 20             | underlying `address` |
| 20     | 16             | amount `uint128`     |
| 36     | 20             | receiver `address`   |
| 76     | 1              | mode `uint8`         |
| 77     | 20             | debtToken `address`  |
| 97     | 20             | pool `address`       |
