# Margin Operations

Margin operations enable DeFi strategies by combining lending, borrowing, and swapping operations in atomic transactions.

## Supported Operations

### Core Margin Operations

-   **[Leverage](./leverage.md)** - Increase position size by borrowing against collateral and reinvesting
-   **[Close](./close.md)** - Exit leveraged positions by withdrawing collateral and repaying debt
-   **[Collateral Swap](./collateral-swap.md)** - Exchange collateral assets without closing positions
-   **[Debt Swap](./debt-swap.md)** - Change debt composition while maintaining collateral
-   **[Position Migration](./migration.md)** - Move positions between lending protocols

## Architecture Deep Dive

### Composer Pattern

The 1Delta margin system is built on composer pattern that enables multi-step DeFi operations to execute atomically. The `BaseComposer` contract serves as the foundation, with chain-specific implementations handling protocol integrations.

```solidity
abstract contract BaseComposer is
    DeadLogger,
    Swaps,
    Gen2025DexActions,
    UniversalLending,
    ERC4626Operations,
    Transfers,
    Permits,
    ExternalCall
{
    function deltaCompose(bytes calldata) external payable;
    function _deltaComposeInternal(address, uint256, uint256) internal virtual;
}
```

### Operation Execution Flow

All margin operations follow a standardized execution pattern within the composer's main loop:

```solidity
function _deltaComposeInternal(address callerAddress, uint256 currentOffset, uint256 calldataLength) internal virtual {
    while (true) {
        uint256 operation = shr(248, calldataload(currentOffset));
        currentOffset = add(1, currentOffset);

        // handle operations

        if (currentOffset >= maxIndex) break;
    }
}
```

## Architecture Overview

### Key Components

#### 1. Flash Loan Providers

The system integrates multiple flash loan providers for optimal capital efficiency:

> **Morpho Blue**, **Aave V3**, **Aave V2**, **Balancer V2**, **Balancer V3**, **Uniswap V4**

#### 2. DEX Integration

Operations support multiple DEX aggregators and protocols:

> **Uniswap** (v2,v3,v4), **Balancer** (v2,v3), **GMX**, **Dodo**, ...

#### 3. Lending Protocol Support

Compatible with major lending protocols:

> **Aave** (v2,v3 and forks), **Compound** (v2,v3 and forks), **Morpho Blue**

### Lending Protocol Integration

Margin operations leverage the lending protocol support through the unified Lending Operations interface.

For detailed lending operation encoding and protocol-specific parameters, see the [Lending Operations](../lending.md) documentation.

### Operation Command Structure

Operations are encoded using compact byte packing:

```
Operation Byte: [Command Type (1 byte)]
Data Bytes: [Operation-specific data]
```

### Flash Loan Operations

Margin operations utilize flash loans through the standardized flash loan interface. The system supports multiple providers:

For detailed flash loan encoding, provider-specific parameters, and integration patterns, see the [Flash Loan Operations](../flash-loan.md) documentation.

### Technical Implementation

#### Operation Encoding

Operations are encoded as compact bytecode sequences:

```solidity
// Example: Flash loan + swap + deposit sequence
bytes memory operation = abi.encodePacked(
    uint8(ComposerCommands.FLASH_LOAN),
    uint8(FlashLoanIds.MORPHO_BLUE),
    address(asset),
    address(provider),
    uint128(amount),
    uint16(callbackData.length),
    uint8(poolId),
    callbackCallData
);
```

## Security Architecture

### Access Control

-   **Caller Validation**: Strict validation of operation initiators
-   **Callback Verification**: Flash loan callbacks validate caller addresses

### Slippage Protection

Built-in slippage checks ensure operations meet minimum requirements:

```solidity
assembly {
    if gt(minimumAmountReceived, amountIn) {
        mstore(0x0, SLIPPAGE)
        revert(0x0, 0x4)
    }
}
```

## Gas Optimization Strategies

### 1. Packed Encoding

-   Minimize calldata size through tight byte packing
-   Use uint128 for amounts, uint16 for lengths
-   Combine related operations in single calls

### 2. Approval Management

-   One-time maximum approvals reduce future gas costs
-   Pre-approve operations outside flash loan callbacks
-   Use permit signatures where supported

### 3. Direct Transfers

-   Route funds directly between operations
-   Eliminate intermediate token movements
-   Use contract balance operations when possible

## Quick Start Examples

### Basic Leverage Operation

```solidity
// 1. Setup composer and addresses
IComposer composer = IComposer(composerAddress);

// 2. Encode flash loan operation
bytes memory flashLoan = abi.encodePacked(
    uint8(ComposerCommands.FLASH_LOAN),
    uint8(FlashLoanIds.MORPHO_BLUE),
    address(USDC),
    morphoBlueAddress,
    uint128(8000e6),
    uint16(innerOps.length),
    uint8(0), // pool ID
    innerOps
);

// 3. Execute operation
composer.deltaCompose(flashLoan);
```

### Multi-Protocol Operation

```solidity
// Combine operations across protocols
bytes memory multiProtocolOps = abi.encodePacked(
    // Aave V3 deposit
    abi.encodePacked(
        uint8(ComposerCommands.LENDING),
        uint8(LenderOps.DEPOSIT),
        uint16(LenderIds.AAVE_V3),
        address(WETH),
        uint128(0),
        userAddress,
        aaveV3Pool
    ),
    // Morpho flash loan
    abi.encodePacked(
        uint8(ComposerCommands.FLASH_LOAN),
        uint8(FlashLoanIds.MORPHO_BLUE),
        address(USDC),
        morphoAddress,
        uint128(amount),
        uint16(callbackOps.length),
        uint8(0),
        callbackOps
    )
);
```

## Integration Requirements

### Prerequisites

-   **EOA Approval**: User must approve composer for token operations
-   **Protocol Permissions**: Enable composer on target lending protocols
-   **Flash Loan Access**: Ensure flash loan providers are accessible

### External Data Requirements

For swap operations, provide aggregator data as:

-   `calldata` - Raw transaction data from aggregator API
-   `target` - DEX router or aggregator contract address
-   `value` - ETH value for transaction (typically `0`)

## Next Steps

Explore specific operation types:

-   [Leverage Operations](./margin/leverage.md) - Position amplification
-   [Close Operations](./margin/close.md) - Position exit strategies
-   [Collateral Swaps](./margin/collateral-swap.md) - Asset rebalancing
-   [Debt Swaps](./margin/debt-swap.md) - Liability management
-   [Position Migration](./margin/migration.md) - Cross-protocol transfers
