# Compound V2 markets

[Operations](../operations.md) → [Lending](../lending.md) → Compound V2 _(Composer)_

All Compound V2 markets behave the same way. The market is specified by the `cToken` parameter. Note that Compound V2 supports both native tokens (ETH) and ERC20 tokens.

## Deposit

Deposit the underlying to the lender for the given `cToken`.

If `amount=0`, we use the contract balance via `underlying.balanceOf(address(this))`. This is recommended when executing this operation after a swap.

| Offset | Length (bytes) | Description          |
| ------ | -------------- | -------------------- |
| 0      | 20             | underlying `address` |
| 20     | 16             | amount `uint128`     |
| 36     | 20             | receiver `address`   |
| 76     | 20             | cToken `address`     |

## Withdraw

Withdraw from the lender. Note that this requires that the caller approved the composer to spend `cToken` on their behalf.

If `amount=0xffffffffffffffffffffffffffff`, we read the user's full balance and withdraw without leaving dust.

| Offset | Length (bytes) | Description          |
| ------ | -------------- | -------------------- |
| 0      | 20             | underlying `address` |
| 20     | 16             | amount `uint128`     |
| 36     | 20             | receiver `address`   |
| 76     | 20             | cToken `address`     |

## Borrow

Borrow from the lender. The prerequisite is that the caller approved the composer contract to borrow on their behalf.

| Offset | Length (bytes) | Description          |
| ------ | -------------- | -------------------- |
| 0      | 20             | underlying `address` |
| 20     | 16             | amount `uint128`     |
| 36     | 20             | receiver `address`   |
| 76     | 20             | cToken `address`     |

## Repay

Repay to the lender. In this case, use `amount=0` to repay `underlying.balanceOf(address(this))`, the contract balance. If `amount=0xffffffffffffffffffffffffffff`, repay the minimum of the contract balance and the caller debt.

| Offset | Length (bytes) | Description          |
| ------ | -------------- | -------------------- |
| 0      | 20             | underlying `address` |
| 20     | 16             | amount `uint128`     |
| 36     | 20             | receiver `address`   |
| 76     | 20             | cToken `address`     |
