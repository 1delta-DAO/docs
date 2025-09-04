# Singleton Flash Loan Interface

[Operations](./operations.md) → [Flash Loans](./flash-loan.md) → Singletons _(Composer)_

Lead type: `ComposerCommands.GEN_2025_SINGELTONS`.

The singleton flash loans are constructed from atomic operations on values, e.g., the Balancer V3 vault and Uniswap V4 Position Manager.

## Supported Providers

### Balancer V3

Balancer V3 provides flash loans through its vault contract with advanced features:

-   **Lead Command**: `ComposerCommands.GEN_2025_SINGELTONS`
-   **Sub-type**: `DexForkMappings.BALANCER_V3`

### Uniswap V4

Uniswap V4 provides flash loans through its position manager:

-   **Lead Command**: `ComposerCommands.GEN_2025_SINGELTONS`
-   **Sub-type**: `DexForkMappings.UNISWAP_V4`

## Parameter Structure

| Offset | Length (bytes) | Type      | Description                           |
| ------ | -------------- | --------- | ------------------------------------- |
| 0      | 20             | `address` | Asset contract address to borrow      |
| 20     | 32             | `uint256` | Amount to borrow (in asset decimals)  |
| 52     | Dynamic        | `bytes`   | Packed composer operations to execute |

## Solidity Example: Balancer V3 Flash Loan

```solidity
// Inner operations to execute during flash loan
bytes memory innerOperations = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(0), // Transfer type
    address(this), // recipient
    amount // amount to transfer
);
// Main flash loan operation
bytes memory operation = abi.encodePacked(
    uint8(ComposerCommands.GEN_2025_SINGELTONS),
    uint8(DexForkMappings.BALANCER_V3),
    BALANCER_V3_VAULT,
    USDC, // asset to borrow
    amount, // amount to borrow
    innerOperations // operations to execute
);
// Execute the flash loan
composer.deltaCompose(operation);
```

## TypeScript Example (using viem)

```typescript
export function encodeBalancerV3FlashLoan(composerAddress: `0x${string}`, amount: bigint): `0x${string}` {
    // Inner operations to execute during flash loan
    const innerOperations = encodePacked(
        ["uint8", "uint8", "address", "uint256"],
        [
            ComposerCommands.TRANSFERS,
            0, // Transfer type
            "0x...", // recipient address
            amount,
        ]
    )

    // Main flash loan operation
    const operation = encodePacked(
        [
            "uint8", // ComposerCommands.GEN_2025_SINGELTONS
            "uint8", // DexForkMappings.BALANCER_V3
            "address", // vault address
            "address", // asset
            "uint256", // amount
            "bytes", // inner operations
        ],
        [ComposerCommands.GEN_2025_SINGELTONS, DexForkMappings.BALANCER_V3, BALANCER_V3_VAULT, USDC_ADDRESS, amount, innerOperations]
    )

    return operation
}

// Usage example
const operationData = encodeBalancerV3FlashLoan(
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
