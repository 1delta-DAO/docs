# Compound V3 markets

[Operations](../operations.md) → [Lending](../lending.md) → Compound V3 _(Composer)_

All Compound V3 markets behave the same way. The market is specified by the `comet` parameter.

The markets are isolated from each other and only one currency is borrowable.

## Deposit

Deposit the underlying to the lender for the given `pool`.

If `amount=0`, we use the contract balance via `underlying.balanceOf(address(this))`. This is recommended when executing this operation after a swap.

| Offset | Length (bytes) | Description          |
| ------ | -------------- | -------------------- |
| 0      | 20             | underlying `address` |
| 20     | 16             | amount `uint128`     |
| 36     | 20             | receiver `address`   |
| 76     | 20             | comet `address`      |

## Withdraw

Withdraw for the lender. Note that this requires that the caller approved the composer via `comet.allow(...)`.

If `amount=0xffffffffffffffffffffffffffff`, we read `underlying.balanceOf(callerAddress)` and withdraw the full balance without leaving dust.

| Offset | Length (bytes) | Description          |
| ------ | -------------- | -------------------- |
| 0      | 20             | underlying `address` |
| 20     | 16             | amount `uint128`     |
| 36     | 20             | receiver `address`   |
| 76     | 1              | isBase `uint8`       |
| 77     | 20             | comet `address`      |

You need to provide the `isBase` flag if you want to withdraw the base asset. The reason for this is that Compound V3 has different ways to compute balances for the base asset.

## Borrow

Borrow from the lender. The prerequisite is that the caller approved the composer contract to borrow on their behalf via `comet.allow(...)`.

| Offset | Length (bytes) | Description          |
| ------ | -------------- | -------------------- |
| 0      | 20             | underlying `address` |
| 20     | 16             | amount `uint128`     |
| 36     | 20             | receiver `address`   |
| 76     | 20             | comet `address`      |

## Repay

Repay to the lender. In this case, use `amount=0` to repay `underlying.balanceOf(address(this))`, the contract balance, if `amount=0xffffffffffffffffffffffffffff`, repay the minimum of the contract balance and the caller debt.

| Offset | Length (bytes) | Description          |
| ------ | -------------- | -------------------- |
| 0      | 20             | underlying `address` |
| 20     | 16             | amount `uint128`     |
| 36     | 20             | receiver `address`   |
| 76     | 20             | comet `address`      |
