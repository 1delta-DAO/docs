# Standardized Flash Loan Interface

[Operations](./operations.md) → [Flash Loans](./flash-loan.md) → Standardized Interface _(Composer)_

While flash loan implementations are nearly all the same, the explicit usage and interface vary.

In this section we cover the flash loans provided by:

-   Balancer V2 and forks
-   Aave V2 & V3 and forks
-   Morpho Blue

## Flash Loan Parameters

The following parameters need to be provided for Aave V2, V3 and Morpho Blue:

### Parameter Structure

| Offset            | Length (bytes) | Type      | Description                                 |
| ----------------- | -------------- | --------- | ------------------------------------------- |
| 0                 | 20             | `address` | Asset contract address to borrow            |
| 20                | 20             | `address` | Flash loan pool contract address            |
| 40                | 16             | `uint128` | Amount to borrow (in asset decimals)        |
| 56                | 2              | `uint16`  | `paramsLength + 1` (total parameter length) |
| 58                | 1              | `uint8`   | Pool identifier for validation              |
| 59 + paramsLength | paramsLength   | `bytes`   | Packed composer operations to execute       |

## Key Technical Details

### Validation Logic

Since flash loans use callbacks, we need `poolId` to validate that the callback was triggered by a trusted Aave or Morpho pool.

### Parameters Structure

`params` is a packed set of composer operations that will be executed during the flash loan.

## Important Considerations

-   **Re-entrancy**: The composer re-enters itself during flash loan execution
-   **Caller Forwarding**: The caller address is forwarded from the original call source
-   **Pool Validation**: The validation logic is hard-coded, so only a limited set of pools are allowed
-   **DEX Limitations**: Some flash loan sources are DEXs (e.g., Balancer V2, Uniswap V4) - this means swaps through these DEXs are not possible during the flash loan due to re-entrancy protection

## Solidity Example: USDC Loop in Aave V3

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// select 1M USDC
uint128 amount = uint128(1000000.0e6);

// Inner operations: deposit USDC and borrow USDC
bytes memory innerOperations = abi.encodePacked(
    // Deposit USDC to Aave V3
    uint8(ComposerCommands.LENDING),
    uint8(LenderOps.DEPOSIT),
    uint16(AAVE_V3_ID),
    USDC, // asset
    amount, // amount
    uint8(0), // interest rate mode (0 = variable)
// Borrow USDC from Aave V3
    uint8(ComposerCommands.LENDING),
    uint8(LenderOps.BORROW),
    uint16(AAVE_V3_ID),
    USDC, // asset
    amount, // amount
    uint8(0) // interest rate mode (0 = variable)
);
// Main flash loan operation
bytes memory operation = abi.encodePacked(
    uint8(ComposerCommands.FLASH_LOAN),
    uint8(FlashLoanIds.AAVE_V3),
    USDC, // asset to borrow
    AAVE_V3_POOL, // flash loan pool
    amount, // amount to borrow
    uint16(innerOperations.length + 1), // params length + 1
    uint8(0), // poolId for validation
    innerOperations // packed operations to execute
);
// Execute the flash loan
composer.deltaCompose(operation);
```

## TypeScript Example (using viem)

```typescript
export function encodeFlashLoanLoop(composerAddress: `0x${string}`, amount: bigint): `0x${string}` {
    // Inner operations: deposit and borrow
    const innerOperations =
        encodePacked(
            ["uint8", "uint8", "uint16", "address", "uint128", "uint8"],
            [
                ComposerCommands.LENDING,
                LenderOps.DEPOSIT,
                AAVE_V3_ID,
                USDC_ADDRESS,
                amount,
                0, // interest rate mode (variable)
            ]
        ) +
        encodePacked(
            ["uint8", "uint8", "uint16", "address", "uint128", "uint8"],
            [
                ComposerCommands.LENDING,
                LenderOps.BORROW,
                AAVE_V3_ID,
                USDC_ADDRESS,
                amount,
                0, // interest rate mode (variable)
            ]
        ).slice(2) // Remove '0x' prefix

    // Main flash loan operation
    const operation = encodePacked(
        [
            "uint8", // ComposerCommands.FLASH_LOAN
            "uint8", // FlashLoanIds.AAVE_V3
            "address", // asset
            "address", // pool
            "uint128", // amount
            "uint16", // paramsLength + 1
            "uint8", // poolId
            "bytes", // inner operations
        ],
        [
            ComposerCommands.FLASH_LOAN,
            FlashLoanIds.AAVE_V3,
            USDC_ADDRESS,
            AAVE_V3_POOL,
            amount,
            innerOperations.length / 2 + 1, // length in bytes + 1
            0, // poolId
            innerOperations,
        ]
    )

    return operation
}

// Usage example
const operationData = encodeFlashLoanLoop(
    "0x...", // composer address
    1000000n
)

// Call the composer
await publicClient.writeContract({
    address: composerAddress,
    abi: parseAbi(["function deltaCompose(bytes data)"]),
    functionName: "deltaCompose",
    args: [operationData],
})
```

## Notes

### Pool ID Validation

The `poolId` parameter is crucial for security. Each flash loan provider has specific pool IDs:

-   **Morpho Blue**: Pool ID `0` for the main Morpho Blue contract
-   **Aave V3**: Pool IDs vary by deployment (e.g., `0` for mainnet)
-   **Aave V2**: Pool IDs vary by deployment (e.g., `7` for Granary)

### Re-entrancy Considerations

When using DEX-based flash loans (Balancer V2, Uniswap V4), be aware that:

-   You cannot perform swaps on the same DEX during the flash loan
-   Re-entrancy guards prevent nested operations on these protocols
-   Use alternative DEXs for any swaps needed within the flash loan
