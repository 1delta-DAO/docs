## Across Bridge

[Operations](../operations.md) → [External Call Operations](../external-call.md) → [Bridge Operations](./bridge.md) → Across Bridge _(Call Forwarder)_

Across is a cross-chain bridge protocol optimized for fast and efficient asset transfers.

### Parameters

| Offset | Length (bytes) | Description            |
| ------ | -------------- | ---------------------- |
| 0      | 20             | spokePool              |
| 20     | 20             | depositor              |
| 40     | 20             | inputTokenAddress      |
| 60     | 32             | receivingAssetId       |
| 92     | 16             | amount                 |
| 108    | 16             | FixedFee               |
| 124    | 4              | FeePercentage          |
| 128    | 4              | destinationChainId     |
| 132    | 32             | receiver               |
| 164    | 2              | message.length: msgLen |
| 166    | msgLen         | message                |

### Parameter Details

-   **`spokePool`**: Across spoke pool contract address (20 bytes)
-   **`depositor`**: Address making the deposit (20 bytes)
-   **`inputTokenAddress`**: Address of the input token (20 bytes)
-   **`receivingAssetId`**: Asset ID on destination chain (32 bytes)
-   **`amount`**: Amount to bridge (16 bytes). High bit flag indicates using contract balance if amount = 0
-   **`FixedFee`**: Fixed fee for the bridge (16 bytes)
-   **`FeePercentage`**: Fee percentage in basis points (4 bytes)
-   **`destinationChainId`**: Destination chain ID (4 bytes)
-   **`receiver`**: Receiver address on destination chain (32 bytes)
-   **`message`**: Optional message to include with the bridge (variable length)

### Encoding Example

```solidity
bytes memory acrossBridge = abi.encodePacked(
    uint8(ComposerCommands.BRIDGING),
    uint8(BridgeIds.ACROSS),
    address(spokePool),              // Across spoke pool
    address(depositor),              // depositor address
    address(inputToken),             // input token address
    bytes32(receivingAssetId),       // destination asset ID
    uint128(amount),                 // amount to bridge
    uint128(fixedFee),               // fixed fee
    uint32(feePercentage),           // fee percentage
    uint32(destinationChainId),      // destination chain
    bytes32(abi.encodePacked(receiver)), // receiver address
    uint16(message.length),          // message length
    message                         // message bytes
);
```

## Complete Usage Example

**Important**: Across bridge operations must be executed through the Call Forwarder. Here's the complete calling structure:

```solidity
// 1. Create Across bridge operation for Call Forwarder
bytes memory acrossOp = abi.encodePacked(
    uint8(ComposerCommands.BRIDGING),
    uint8(BridgeIds.ACROSS),
    address(acrossSpokePool),           // Across spoke pool contract
    address(msg.sender),                // depositor address
    address(USDC),                      // input token (USDC)
    bytes32(destinationAssetId),        // destination asset ID
    uint128(amountToBridge),            // amount to bridge
    uint128(fixedBridgeFee),            // fixed fee for bridging
    uint32(fee),                        // fee percentage
    uint32(destinationChainId),         // destination chain ID
    bytes32(abi.encodePacked(receiver)), // receiver address
    uint16(message.length),             // message length
    message                            // optional message bytes
);

// 2. Wrap in EXT_CALL to Call Forwarder
bytes memory callForwarderOp = abi.encodePacked(
    uint8(ComposerCommands.EXT_CALL),
    address(callForwarder),             // Call Forwarder address
    uint128(0),                        // No native fee needed for Across
    uint16(acrossOp.length),           // Bridge operation length
    acrossOp                           // Bridge operation data
);

// 3. Execute on main composer
composer.deltaCompose(callForwarderOp);
```
