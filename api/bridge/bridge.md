## BRIDGING Operations

[Operations](../operations.md) → [External Call Operations](../external-call.md) → Bridge Operations _(Call Forwarder)_

Execute cross-chain bridge operations through supported bridge protocols.

### Supported Bridges

| Bridge                       | ID     | Description                 |
| ---------------------------- | ------ | --------------------------- |
| [Stargate V2](./stargate.md) | `0x00` | Stargate V2 bridge protocol |
| [Across](./across.md)        | `0x0A` | Across bridge protocol      |

#### `BridgeIds` Enum

| Value  | Name          | Description                 |
| ------ | ------------- | --------------------------- |
| `0x00` | `STARGATE_V2` | Stargate V2 bridge protocol |
| `0x0A` | `ACROSS`      | Across bridge protocol      |

### Parameters

| Offset | Length (bytes) | Description                |
| ------ | -------------- | -------------------------- |
| 0      | 1              | bridgeId `uint8`           |
| 1      | Variable       | bridge-specific parameters |

### Encoding Example

```solidity
bytes memory bridgeOp = abi.encodePacked(
    uint8(ComposerCommands.BRIDGING),
    uint8(BridgeIds.STARGATE_V2),
    // Stargate V2 specific parameters...
);
```

## Usage Context

**Important**: Bridge operations can only be executed through the Call Forwarder and require a two-layer calling structure:

### Example

```solidity
// 1. Create the bridge operation for Call Forwarder
bytes memory bridgeOp = abi.encodePacked(
    uint8(ComposerCommands.BRIDGING),
    uint8(BridgeIds.STARGATE_V2),
    // ... bridge parameters
);

// 2. Wrap in EXT_CALL to Call Forwarder
bytes memory fullCall = abi.encodePacked(
    uint8(ComposerCommands.EXT_CALL),
    address(callForwarder),      // Call Forwarder address
    uint128(0),                  // No native value for Call Forwarder
    uint16(bridgeOp.length),     // Bridge operation length
    bridgeOp                     // Bridge operation data
);

// 3. Execute on main composer
composer.deltaCompose(fullCall);
```
