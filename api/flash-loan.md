# Flash Loans

Lead type: `ComposerCommands.FLASH_LOAN`.

The sub types are dcefined by the following enum:

```typescript
enum FlashLoanIds {
    MORPHO = 0, // this is Morpho Blue
    BALANCER_V2 = 1, // covers the fork Swaap, too
    AAVE_V3 = 2, // covers many forks
    AAVE_V2 = 3, // covers many forks
}
```

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

- [Aave V2 & V3 & forks](./flash-loan/standardized-interface.md)
- [Singletons](./flash-loan/singletons.md)
