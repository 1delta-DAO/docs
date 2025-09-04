# Lending

[Operations](./operations.md) → Lending _(Composer)_

Lead type: `ComposerCommands.LENDING`.

The sub types are defined by the following enum:

`LenderOps` Enum

| Value | Name                     | Description                                   |
| ----- | ------------------------ | --------------------------------------------- |
| 0     | `DEPOSIT`                | Deposit collateral to lender                  |
| 1     | `BORROW`                 | Borrow from lender                            |
| 2     | `REPAY`                  | Repay to lender                               |
| 3     | `WITHDRAW`               | Withdraw collateral from lender               |
| 4     | `DEPOSIT_LENDING_TOKEN`  | Deposit lending token (e.g. for Morpho Blue)  |
| 5     | `WITHDRAW_LENDING_TOKEN` | Withdraw lending token (e.g. for Morpho Blue) |

to the array of composer commands.

We encode lender types as follows:

`LenderIds` Enum

| Value | Name                | Description                |
| ----- | ------------------- | -------------------------- |
| 1000  | `UP_TO_AAVE_V3`     | Aave V3 IDs: 0-999         |
| 2000  | `UP_TO_AAVE_V2`     | Aave V2 IDs: 1000-1999     |
| 3000  | `UP_TO_COMPOUND_V3` | Compound V3 IDs: 2000-2999 |
| 4000  | `UP_TO_COMPOUND_V2` | Compound V2 IDs: 3000-3999 |
| 5000  | `UP_TO_MORPHO`      | Morpho IDs: 4000-4999      |

To encode an operation, the caller has to append this data to the call.

```solidity
abi.encodePacked(
    uint8(ComposerCommands.LENDING),
    uint8(LenderOps.[Operation]),
    uint16(LenderIds.[Lender])
    ...params
    )
```

## Specific lenders

-   [Aave V2 & V3 & forks](./lending/aave.md)
-   [Compound V3 markets](./lending/compound-v3.md)
-   [Compound V2 markets](./lending/compound-v2.md)
-   [Morpho Blue](./lending/morpho.md)
