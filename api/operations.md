# Operation Encoding

Operations are produced by encoding them into compact byte arrays that follow a consistent structure. The 1delta protocol supports multiple operation categories, each with specific encoding patterns and use cases.

## Operation Categories

### 1. [Transfer Operations](transfers.md) (`TRANSFERS = 0x40`)

Transfer operations handle token movements, approvals, and wrapping operations.

**Key Features:**

-   Token transfers between addresses
-   Token approvals for spending
-   Native token wrapping/unwrapping
-   Permit2 operations

**Common Use Cases:**

-   Moving tokens into position for lending
-   Transferring profits to user
-   Setting up approvals for protocols
-   Wrapping/unwrapping native tokens

### 2. Swap Operations (`SWAPS = 0x10`)

Swap operations enable trading across multiple DEX protocols with advanced routing.

**Key Features:**

-   DEX swaps across multiple protocols
-   Multi-hop swap routing
-   Flash swap callbacks
-   Slippage protection

**Supported Protocols:**

-   Uniswap V2/V3
-   Balancer V2/V3
-   Curve
-   Dodo
-   WooFi
-   GMX
-   And more...

### 3. [Lending Operations](lending.md) (`LENDING = 0x30`)

Lending operations provide access to various lending protocols through a unified interface.

**Key Features:**

-   Deposit/withdraw collateral
-   Borrow/repay debt
-   Cross-protocol operations
-   Position management

**Supported Protocols:**

-   Aave V2/V3
-   Compound V2/V3
-   Morpho Blue
-   And more...

### 4. [Flash Loan Operations](flash-loan.md) (`FLASH_LOAN = 0x60`)

Flash loan operations enable instant borrowing without collateral, requiring repayment within the same transaction.

**Key Features:**

-   Instant borrowing without collateral
-   Arbitrage opportunities
-   Liquidation protection
-   Complex DeFi strategies

**Supported Providers:**

-   Morpho Blue
-   Aave V2/V3
-   Balancer V2

### 5. [External Calls](external-call.md) (`EXT_CALL = 0x20`, `EXT_TRY_CALL = 0x21`)

External call operations enable integration with arbitrary smart contracts.

**Key Features:**

-   Integration with external protocols
-   Fallback mechanisms (EXT_TRY_CALL)
-   Complex interaction patterns
-   Custom contract calls

### 6. ERC4626 Vault Operations (`ERC4626 = 0x70`)

ERC4626 operations provide standardized access to yield vaults.

**Key Features:**

-   Deposit to yield vaults
-   Withdraw from vaults
-   Share management
-   Standardized vault interface

### 7. Modern DEX Operations (`GEN_2025_SINGELTONS = 0x80`)

Modern DEX operations support Balancer V3 and Uniswap V4 features.

**Key Features:**

-   Balancer V3 operations
-   Uniswap V4 operations
-   Advanced liquidity management
-   Singleton contract patterns

### 8. Bridge Operations (`BRIDGING = 0x90`)

Bridge operations enable cross-chain transfers and interactions.

**Key Features:**

-   Cross-chain transfers
-   Bridge protocol integration
-   Multi-chain strategies
-   LayerZero/Stargate integration

## Encoding Structure

All operations follow a consistent encoding pattern:

```
[command: uint8][operation-specific data: bytes]
```

### Command Byte Values

```solidity
enum ComposerCommands {
    SWAPS = 0x10,              // DEX swap operations
    EXT_CALL = 0x20,           // External contract calls
    EXT_TRY_CALL = 0x21,       // External calls with fallback
    LENDING = 0x30,            // Lending protocol operations
    TRANSFERS = 0x40,          // Token transfers and approvals
    PERMIT = 0x50,             // Permit operations
    FLASH_LOAN = 0x60,         // Flash loan operations
    ERC4626 = 0x70,            // ERC4626 vault operations
    GEN_2025_SINGELTONS = 0x80,// Modern DEX operations
    BRIDGING = 0x90            // Cross-chain bridge operations
}
```
