# Flash Loans

[Operations](./operations.md) → Flash Loans _(Composer)_

Lead type: `ComposerCommands.FLASH_LOAN`.

The sub types are defined by the following enum:

#### `FlashLoanIds` Enum

| Value | Name          | Description                 |
| ----- | ------------- | --------------------------- |
| 0     | `MORPHO`      | Morpho Blue flash loans     |
| 1     | `BALANCER_V2` | Balancer V2 (covers Swaap)  |
| 2     | `AAVE_V3`     | Aave V3 (covers many forks) |
| 3     | `AAVE_V2`     | Aave V2 (covers many forks) |

to the array of composer commands.

To encode an operation, te caller has to append this data to the call.

```solidity
abi.encodePacked(
    uint8(ComposerCommands.FLASH_LOAN),
    uint8(FlashLoanIds.[FlashLoanProvider]),
    ...params
    )
```

Alternative sources can be Uniswap V4 and Balancer V3. Thsese are triggered via the lead type: `ComposerCommands.GEN_2025_SINGELTONS`. We elaborate on these later.

## Specific lenders

-   [Aave V2 & V3 & forks](./flash-loan/standardized-interface.md)
-   [Singletons](./flash-loan/singletons.md)
