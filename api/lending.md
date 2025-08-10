# Lending

Lead type: `ComposerCommands.LENDING`.

The sub types are dcefined by the following enum:

```Typescript
enum LenderOps {
    DEPOSIT = 0, // deposit (collateral)
    BORROW = 1, // borrow from lender
    REPAY = 2, // repay to lender
    WITHDRAW = 3, // withdraw from lender
    DEPOSIT_LENDING_TOKEN = 4, // deposit lending token (e.g. for Morpho Blue)
    WITHDRAW_LENDING_TOKEN = 5, // withdraw lending token (e.g. for Morpho Blue)
}
```

to the array of composer commands.

We ecode lender types as follows:

```Typescript
enum LenderIds {
    UP_TO_AAVE_V3 = 1000,
    UP_TO_AAVE_V2 = 2000,
    UP_TO_COMPOUND_V3 = 3000,
    UP_TO_COMPOUND_V2 = 4000,
    UP_TO_MORPHO = 5000,
}
```

To encode an operation, te caller has to append this data to the call.

```Solidity
abi.encodePacked(
    uint8(ComposerCommands.LENDING),
    uint8(TransferIds.[Operation]),
    uint16(LenderIds.[Lender])
    ...params
    )
```

## Specific lenders

* [Aave V2 & V3 & forks](./lending/aave.md)
* [Compound V3 markets](./lending/compound-v3.md)