# Contract Entry Point

The 1delta protocol provides a single unified entry point for executing DeFi operations through our composer contracts.

## Main Entry Point: `deltaCompose(bytes)`

### Function Signature

```solidity
function deltaCompose(bytes calldata data) external payable
```

The `deltaCompose` function is the primary interface for executing batched operations. It accepts compact, byte-encoded operation sequences that are processed atomically within a single transaction.

### Key Characteristics

-   **Atomic Execution**: All operations in a batch either succeed together or fail together
-   **Gas Efficient**: Compact encoding minimizes transaction costs
-   **Composable**: Operations can be chained and nested arbitrarily
-   **Stateless**: Other than the approval and entry flags, the contract is stateless
-   **Payable**: Can receive native tokens for operations requiring them

## Operation Encoding Structure

### Composer Commands

Operations are categorized using the following command identifiers:

```typescript
enum ComposerCommands {
    SWAPS; // swap paths
    EXT_CALL; // external calls (`deltaForwardCompose`)
    EXT_TRY_CALL; // external call with fallback (callForwarder only)
    LENDING; // any lending operation (deposit, borrow, withdraw, repay)
    TRANSFERS; // pulling, sending and approving
    PERMIT; // execute token or lender permit
    FLASH_LOAN; // execute flash loans on common targets
    ERC4626; // vault operations
    GEN_2025_SINGELTONS; // balancer V3 and Uniswap V4 operations
    BRIDGING; // bridge execution (callForwarder only)
}
```

### Encoding Format

All operations follow a consistent encoding pattern:

```
[command: uint8][operation-specific data: bytes]
```

## Composable Operation Flow

### Sequential Execution

Operations are executed in the order they appear in the encoded data.

```
operation 1 -> operation 2 -> ...
```

### Nested Operations

Complex operations can contain sub-operations, enabling DeFi strategies:

```
Flash Loan Operation {
  Inner Operations: [
    Swap Operation,
    Lending Operation,
    Transfer Operation
  ]
}
```

## Simple Example

This example shows how to encode a simple transfer operation. The operation structure follows the standard pattern of `[command: uint8][operation-specific data: bytes]`.

### Operation Data Structure

| Offset | Length (bytes) | Description      | Value Example      |
| ------ | -------------- | ---------------- | ------------------ |
| 0      | 1              | Command ID       | `0x40` (TRANSFERS) |
| 1      | 1              | Operation ID     | `1` (SWEEP)        |
| 2      | 20             | Token address    | `0xA0b8...`        |
| 22     | 20             | Receiver address | `0xd8dA...`        |
| 42     | 1              | Sweep type       | `1` (AMOUNT)       |
| 43     | 16             | Amount (uint128) | `1000000`          |

### Solidity Example

```solidity
import {ComposerCommands, TransferIds} from "@1delta-contracts/enums/DeltaEnums.sol";
import {SweepType} from "@1delta-contracts/enums/MiscEnums.sol";

function transferTokens() external {
    address token = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
    address receiver = 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045;
    uint256 amount = 1000000;

    // Encode the transfer operation directly
    bytes memory transferOp = abi.encodePacked(
        uint8(ComposerCommands.TRANSFERS),     // 0x40 - Transfer command
        uint8(TransferIds.SWEEP),              // 1 - SWEEP operation ID
        token,                                 // Token address
        receiver,                              // Receiver address
        uint8(SweepType.AMOUNT),               // 1 - AMOUNT sweep type
        uint128(amount)                        // Amount to transfer
    );

    composer.deltaCompose(transferOp);
}
```

### TypeScript Example

```typescript
import { encodePacked } from "viem"

function encodeTransfer(): `0x${string}` {
    const TRANSFERS = 0x40 // ComposerCommands.TRANSFERS
    const SWEEP = 1 // TransferIds.SWEEP
    const AMOUNT = 1 // SweepType.AMOUNT

    const tokenAddress = "0xA0b86a33E6441e88b5f6f1FcD8c7d4d0d9e4b8C3"
    const receiver = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
    const amount = 1000000

    return encodePacked(["uint8", "uint8", "address", "address", "uint8", "uint128"], [TRANSFERS, SWEEP, tokenAddress, receiver, AMOUNT, amount])
}
```

### Development Note

In practice, operations are most often created using helper libraries to avoid manual encoding:

-   **Solidity**: Use `CalldataLib` functions like `encodeSweep()` for complex operations
-   **TypeScript**: Use the 1delta SDK which provides high-level functions for operation creation

Manual encoding is shown to demonstrate the underlying structure.
