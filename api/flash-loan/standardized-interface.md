# Standardized flash loan interface.

While flash loans implementations are nearly all the same, the explicit usage and interface vary.

In this section we cover the flash laons provided by

- Balancer V2 and Swaap
- Aave V2 & V3
- Morpho Blue

## Flash loan

The following parameters need to be provided for Aave V2, V3 and Morpho Blue:

| Offset            | Length (bytes) | Description               |
| ----------------- | -------------- | ------------------------- |
| 0                 | 20             | asset `address`           |
| 20                | 20             | pool `address`            |
| 40                | 16             | amount `uint128`          |
| 56                | 2              | paramsLength + 1 `uint16` |
| 58                | 1              | poolId `uint8`            |
| 59 + paramsLength | paramsLength   | params `bytes` (packed)   |

The way how the end data is structured is based on the validation logic. Since flash loans use callbacks, we need `poolId` to validate that the callback was triggred by a trusted Aave or Morpho pool.

`params` is a packed set of composer operations.

Note that

- The composer re-enters itself here
- The caller address is forwarderd from the origninal call source
- The validation logic is hard-coded, as such, only a limited set of `pool`s are allowed to be called.

They can be used as follows for e.g. looping USDC in a Aaave type lender.

```Solidity

// select 1M USDC
uint128 amount = uint128(1000000.0e6);

bytes memory innerOperation = abi.encodePacked(
    encodeDeposit(...,USDC, amount,...) // deposit USDC amount to lendrer
    encodeBorrow(...,USDC, amount,...) // borrow USDC amount from lender
)

bytes memory operation = abi.encodePacked(
    uint8(ComposerCommands.FLASH_LOAN), // then just continue the next one
    uint8(FlashLoanIds.MORPHO_BLUE),
    USDC,
    MORPHO_BLUE_ADDRESS
    amount,
    uint16(innerOperation.length + 1),
    uint8(0), // the original morpho blue has poolId 0.
    innerOperation
)

composer.deltaCompose(operation);
```
