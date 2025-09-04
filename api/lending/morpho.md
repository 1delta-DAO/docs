# Morpho Blue

[Operations](../operations.md) → [Lending](../lending.md) → Morpho Blue _(Composer)_

Morpho Blue uses a market-based system where each market is defined by specific parameters. All operations require the full market specification.

## Market Parameters

Each Morpho operation requires the complete market definition:

| Offset | Length (bytes) | Description                                   |
| ------ | -------------- | --------------------------------------------- |
| 0      | 20             | MarketParams.loanToken                        |
| 20     | 20             | MarketParams.collateralToken                  |
| 40     | 20             | MarketParams.oracle                           |
| 60     | 20             | MarketParams.irm (Interest Rate Model)        |
| 80     | 16             | MarketParams.lltv (Liquidation Loan-To-Value) |

## Deposit Collateral

Deposit collateral tokens to a Morpho Blue market.

If `amount=0`, we use the contract balance via `collateralToken.balanceOf(address(this))`. This is recommended when executing this operation after a swap.

| Offset | Length (bytes) | Description                  |
| ------ | -------------- | ---------------------------- |
| 0      | 20             | MarketParams.loanToken       |
| 20     | 20             | MarketParams.collateralToken |
| 40     | 20             | MarketParams.oracle          |
| 60     | 20             | MarketParams.irm             |
| 80     | 16             | amount `uint128`             |
| 96     | 20             | receiver `address`           |
| 116    | 20             | morpho `address`             |

## Withdraw Collateral

Withdraw collateral tokens from a Morpho Blue market.

If `amount=0xffffffffffffffffffffffffffff`, we read the user's full collateral balance and withdraw without leaving dust.

| Offset | Length (bytes) | Description                  |
| ------ | -------------- | ---------------------------- |
| 0      | 20             | MarketParams.loanToken       |
| 20     | 20             | MarketParams.collateralToken |
| 40     | 20             | MarketParams.oracle          |
| 60     | 20             | MarketParams.irm             |
| 80     | 16             | amount `uint128`             |
| 96     | 20             | receiver `address`           |
| 116    | 20             | morpho `address`             |

## Deposit Lending Token

Deposit loan tokens (lending tokens) to a Morpho Blue market. This operation supports both assets and shares.

Use the flag at offset 96 to specify whether to deposit by assets (0) or shares (1). If `amount=0`, we use the contract balance.

| Offset | Length (bytes) | Description                  |
| ------ | -------------- | ---------------------------- |
| 0      | 20             | MarketParams.loanToken       |
| 20     | 20             | MarketParams.collateralToken |
| 40     | 20             | MarketParams.oracle          |
| 60     | 20             | MarketParams.irm             |
| 80     | 16             | MarketParams.lltv            |
| 96     | 1              | flags (0=assets, 1=shares)   |
| 97     | 15             | amount `uint112`             |
| 112    | 20             | receiver `address`           |
| 132    | 20             | morpho `address`             |
| 152    | 2              | callbackLength `uint16`      |
| 154    | callbackLength | callbackData                 |

## Withdraw Lending Token

Withdraw loan tokens from a Morpho Blue market. This operation supports both assets and shares.

Use the flag at offset 96 to specify whether to withdraw by assets (0) or shares (1). If `amount=0xffffffffffffffffffffffffffff`, we withdraw the user's full balance.

| Offset | Length (bytes) | Description                  |
| ------ | -------------- | ---------------------------- |
| 0      | 20             | MarketParams.loanToken       |
| 20     | 20             | MarketParams.collateralToken |
| 40     | 20             | MarketParams.oracle          |
| 60     | 20             | MarketParams.irm             |
| 80     | 16             | MarketParams.lltv            |
| 96     | 1              | flags (0=assets, 1=shares)   |
| 97     | 15             | amount `uint112`             |
| 112    | 20             | receiver `address`           |
| 132    | 20             | morpho `address`             |

## Borrow

Borrow loan tokens from a Morpho Blue market. This operation supports both assets and shares.

Use the flag at offset 96 to specify whether to borrow by assets (0) or shares (1).

| Offset | Length (bytes) | Description                  |
| ------ | -------------- | ---------------------------- |
| 0      | 20             | MarketParams.loanToken       |
| 20     | 20             | MarketParams.collateralToken |
| 40     | 20             | MarketParams.oracle          |
| 60     | 20             | MarketParams.irm             |
| 80     | 16             | MarketParams.lltv            |
| 96     | 1              | flags (0=assets, 1=shares)   |
| 97     | 15             | amount `uint112`             |
| 112    | 20             | receiver `address`           |
| 132    | 20             | morpho `address`             |

## Repay

Repay borrowed loan tokens to a Morpho Blue market. This operation supports both assets and shares.

Use the flag at offset 96 to specify whether to repay by assets (0) or shares (1).

Special amount values:

-   `amount=0`: repay contract balance
-   `amount=0xffffffffffffffffffffffffffff`: repay maximum safe amount (prevents dust)

| Offset | Length (bytes) | Description                  |
| ------ | -------------- | ---------------------------- |
| 0      | 20             | MarketParams.loanToken       |
| 20     | 20             | MarketParams.collateralToken |
| 40     | 20             | MarketParams.oracle          |
| 60     | 20             | MarketParams.irm             |
| 80     | 16             | MarketParams.lltv            |
| 96     | 1              | flags (0=assets, 1=shares)   |
| 97     | 15             | amount `uint112`             |
| 112    | 20             | receiver `address`           |
| 132    | 20             | morpho `address`             |
| 152    | 2              | callbackLength `uint16`      |
| 154    | callbackLength | callbackData                 |
