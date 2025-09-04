## Stargate V2 Bridge

[Operations](../operations.md) → [External Call Operations](../external-call.md) → [Bridge Operations](./bridge.md) → Stargate V2 Bridge _(Call Forwarder)_

Stargate V2 is a cross-chain bridge protocol that enables seamless asset transfers across multiple blockchain networks.

### Parameters

| Offset | Length (bytes) | Description             |
| ------ | -------------- | ----------------------- |
| 0      | 20             | tokenAddress            |
| 20     | 20             | stargate pool           |
| 40     | 4              | dstEid                  |
| 44     | 32             | receiver                |
| 76     | 20             | refundReceiver          |
| 96     | 16             | amount                  |
| 112    | 4              | slippage                |
| 116    | 16             | fee                     |
| 132    | 1              | isBusMode               |
| 133    | 2              | composeMsg.length: cl   |
| 135    | 2              | extraOptions.length: el |
| 137    | cl             | composeMsg              |
| 137+cl | el             | extraOptions            |

### Parameter Details

-   **`tokenAddress`**: The address of the token to bridge (20 bytes)
-   **`stargate pool`**: The Stargate pool address for the token (20 bytes)
-   **`dstEid`**: Destination endpoint ID (4 bytes)
-   **`receiver`**: Receiver address on destination chain (32 bytes)
-   **`refundReceiver`**: Address to receive refunds (20 bytes)
-   **`amount`**: Amount to bridge (16 bytes). High bit flag indicates using contract balance if amount = 0
-   **`slippage`**: Maximum allowed slippage in basis points (4 bytes)
-   **`fee`**: Native fee for the bridge transaction (16 bytes)
-   **`isBusMode`**: Boolean flag for bus mode (1 byte)
-   **`composeMsg`**: Optional composition message for cross-chain calls (variable length)
-   **`extraOptions`**: Additional options for the bridge (variable length)

### Encoding Example

```solidity
bytes memory stargateBridge = abi.encodePacked(
    uint8(ComposerCommands.BRIDGING),
    uint8(BridgeIds.STARGATE_V2),
    address(tokenAddress),           // token to bridge
    address(stargatePool),           // Stargate pool
    uint32(dstEid),                  // destination chain ID
    bytes32(abi.encodePacked(receiver)), // receiver address
    address(refundReceiver),         // refund receiver
    uint128(amount),                 // amount to bridge
    uint32(slippageBps),             // slippage tolerance
    uint128(fee),                    // native fee
    uint8(isBusMode),                // bus mode flag
    uint16(composeMsg.length),       // compose message length
    uint16(extraOptions.length),     // extra options length
    composeMsg,                      // compose message bytes
    extraOptions                     // extra options bytes
);
```

## Complete Usage Example

**Important**: Stargate V2 bridge operations must be executed through the Call Forwarder. Here's the complete calling structure:

```solidity
// 1. Create Stargate V2 bridge operation for Call Forwarder
bytes memory stargateOp = abi.encodePacked(
    uint8(ComposerCommands.BRIDGING),
    uint8(BridgeIds.STARGATE_V2),
    address(USDC),                        // token to bridge
    address(stargatePool),                // Stargate pool
    uint32(destinationChainId),           // destination endpoint ID
    bytes32(abi.encodePacked(receiver)),  // receiver address
    address(msg.sender),                  // refund receiver
    uint128(amountToBridge),              // amount to bridge
    uint32(slippage),                     // slippage tolerance
    uint128(bridgeFee),                  // native fee for bridge
    uint8(0),                            // bus mode (0 = regular)
    uint16(composeMsg.length),           // compose message length
    uint16(extraOptions.length),         // extra options length
    composeMsg,                          // compose message bytes
    extraOptions                         // extra options bytes
);

// 2. Wrap in EXT_CALL to Call Forwarder
bytes memory callForwarderOp = abi.encodePacked(
    uint8(ComposerCommands.EXT_CALL),
    address(callForwarder),              // Call Forwarder address
    uint128(bridgeFee),                  // Send native fee to Call Forwarder
    uint16(stargateOp.length),           // Bridge operation length
    stargateOp                           // Bridge operation data
);

// 3. Execute on main composer
composer.deltaCompose(callForwarderOp);
```
