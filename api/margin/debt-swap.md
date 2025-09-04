# Debt Swap (Borrow & Repay)

This guide covers debt swaps, which allow users to change their debt composition without closing positions or affecting collateral balances.

## Overview

Debt swaps involve borrowing a new asset, swapping it for the currency needed to repay existing debt, then repaying the original debt. This maintains your leveraged position while switching between debt assets (e.g., from USDC debt to USDT debt).

The entire operation is wrapped in a flash loan to ensure atomicity and capital efficiency.

## Example Scenario

We'll demonstrate switching debt on **Aave V3** from USDC to USDT while maintaining the same collateral position. The process involves:

1. Flash loan USDT
2. Swap USDT to USDC via 1inch
3. Repay existing USDC debt
4. Borrow new USDT debt to repay flash loan
5. Refund any excess to user

**Starting Position:**

- Collateral: 3 WETH
- Debt: 8,000 USDC

**Target:**

- Same collateral: 3 WETH
- New debt: 8,000 USDT

We'll use **Morpho Blue** as our flash loan provider for optimal rates.

---

## Constants

```solidity
// The debt amount to swap
uint256 DEBT_AMOUNT = 8000.0e6;

// Default forwarder address
address CALL_FORWARDER = 0xfCa1154C643C32638AEe9a43eeE7f377f515c801;

// 1Delta composer
IComposer composer = IComposer(0x...);

// Aave V3 pool address
address AAVE_V3_POOL = address(0x...);

// Aave V3 variable debt tokens
address AAVE_V3_USDC_V_TOKEN = address(0x...);
address AAVE_V3_USDT_V_TOKEN = address(0x...);

// 1inch aggregation router
address oneInchAggregationRouter = address(0x111...);

// Morpho Blue flash loan source
address MORPHO_BLUE = address(0xbbb...);
```

---

## Operation Sequence

### Integration Checklist

-   [ ] Debt delegation permissions configured
-   [ ] Protocol borrowing approvals set
-   [ ] Swap quotes validated for sufficient output
-   [ ] Health factor impact assessed
-   [ ] Slippage protection configured
-   [ ] Cross-protocol compatibility verified
-   [ ] Gas optimization strategies applied
-   [ ] Error handling and fallback mechanisms
-   [ ] Position rate tracking enabled

### 1. Repay Existing Debt

After receiving USDC from the swap, we repay the existing USDC debt. Setting amount to `0` repays up to the contract's balance or total debt, whichever is smaller.

**Important:** Ensure all required approvals are granted beforehand (see Approvals section).

```solidity
bytes memory repay = abi.encodePacked(
    uint8(ComposerCommands.LENDING),
    uint8(LenderOps.REPAY),
    uint16(LenderIds.UP_TO_AAVE_V3 - 1), // Aave V3 identifier
    address(USDC),                        // Asset to repay
    uint128(0),                          // 0 = repay up to balance/debt
    address(user),                       // Debt owner
    uint8(2),                           // Variable rate mode
    address(AAVE_V3_USDC_V_TOKEN),       // Variable debt token
    address(AAVE_V3_POOL)               // Aave V3 pool address
);

// Refund any excess USDC to user
bytes memory transferToUser = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.SWEEP),
    address(USDC),                       // Asset to transfer
    address(user),                       // Recipient
    uint128(0)                          // Send remaining balance
);

// Combine repay with refund
bytes memory repayAndRefund = abi.encodePacked(
    repay,
    transferToUser
);
```

### 2. Borrow New Debt

We borrow exactly the flash loan amount (plus any fees) in USDT. The borrowed funds go directly to the forwarder to minimize transfers.

```solidity
bytes memory borrow = abi.encodePacked(
    uint8(ComposerCommands.LENDING),
    uint8(LenderOps.BORROW),
    uint16(LenderIds.UP_TO_AAVE_V3 - 1), // Aave V3 identifier
    address(USDT),                        // Asset to borrow
    uint128(DEBT_AMOUNT),                // Flash loan repayment amount
    address(CALL_FORWARDER),             // Send directly to forwarder
    uint8(2),                           // Variable rate mode
    address(AAVE_V3_POOL)               // Aave V3 pool address
);
```

### 3. Approvals

Required approvals for the operation to succeed:

```solidity
// Approve Aave V3 pool to spend USDC for debt repayment
bytes memory approvePool = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.APPROVE),
    address(USDC),                       // Asset to approve
    address(AAVE_V3_POOL)               // Spender
);

// Approve Morpho Blue to pull USDT for flash loan repayment
bytes memory approveMorpho = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.APPROVE),
    address(USDT),                       // Asset to approve
    address(MORPHO_BLUE)                 // Spender
);
```

### 4. Meta Swap Configuration

The swap operation converts borrowed USDT to USDC for debt repayment. Since funds are already at the forwarder from the borrow operation, we skip manual transfers.

```solidity
// Configure the forwarder call to 1inch
bytes memory callForwarderCall = abi.encodePacked(
    uint8(ComposerCommands.EXT_CALL),
    address(oneInchAggregationRouter),   // Target contract
    uint128(0),                          // No ETH value for ERC20 swap
    uint16(data.length),                 // Call data length
    data                                 // 1inch swap call data
);

// Approve 1inch to spend USDT
bytes memory approve1inch = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.APPROVE),
    address(USDT),                       // Asset to approve
    address(oneInchAggregationRouter)    // Spender
);

// Verify minimum output and transfer to composer
uint256 amountExpected = 8000.0e6; // Expected USDC amount

bytes memory sweepAndCheckSlippage = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.SWEEP),
    address(USDC),                       // Asset to sweep
    address(composer),                   // Send to composer for repay
    uint8(SweepType.AMOUNT),
    amountExpected                       // Minimum required amount
);

// Combine forwarder operations
callForwarderCall = abi.encodePacked(
    approve1inch,
    callForwarderCall,
    sweepAndCheckSlippage
);

// Create meta swap call through forwarder
bytes memory metaSwap = abi.encodePacked(
    uint8(ComposerCommands.EXT_CALL),
    address(CALL_FORWARDER),             // Forwarder contract
    uint128(0),                          // No ETH value
    uint16(callForwarderCall.length),    // Call data length
    callForwarderCall                    // Forwarder operations
);
```

---

## Complete Operation Assembly

Putting it all together with the flash loan wrapper:

```solidity
uint128 flashLoanAmount = uint128(DEBT_AMOUNT); // Amount to flash loan

// Inner operations executed within flash loan callback
bytes memory innerOperation = abi.encodePacked(
    borrow,              // Borrow USDT and send to forwarder
    metaSwap,            // Swap USDT to USDC via forwarder
    repayAndRefund       // Repay USDC debt and refund excess
);

// Flash loan wrapper
bytes memory flashLoan = abi.encodePacked(
    uint8(ComposerCommands.FLASH_LOAN),
    uint8(FlashLoanIds.MORPHO_BLUE),
    address(USDT),                       // Flash loan asset
    address(MORPHO_BLUE),                // Flash loan provider
    flashLoanAmount,                     // Flash loan amount
    uint16(innerOperation.length + 1),   // Callback data length
    uint8(0),                           // Morpho Blue pool ID
    innerOperation                       // Operations to execute
);

// Complete operation sequence
bytes memory composerOps = abi.encodePacked(
    approvePool,      // Pre-approve Aave pool for USDC
    approveMorpho,    // Pre-approve Morpho Blue for USDT
    flashLoan         // Execute flash loan with inner operations
);

// Execute the complete debt swap
composer.deltaCompose(composerOps);
```

---

## Key Considerations

1. **Debt Delegation:** The operation requires prior debt delegation approval: `IDebtToken(AAVE_V3_USDT_V_TOKEN).approveDelegation(composer, type(uint256).max)`

2. **Flash Loan Fees:** The borrow amount must account for any flash loan fees to ensure complete repayment.

3. **Slippage Protection:** The sweep operation with `SweepType.AMOUNT` ensures you receive sufficient USDC to repay the debt.

4. **Gas Optimization:**

    - Approvals are placed outside the flash loan callback to reduce callback data size
    - Direct transfers to the forwarder eliminate unnecessary token movements
    - One-time approvals with maximum amounts reduce future gas costs

5. **Atomic Execution:** The entire operation succeeds or fails as one transaction, preventing partial execution risks.

6. **Excess Handling:** Any excess USDC from the swap is automatically refunded to the user, ensuring no funds are stuck.

## Related Documentation

-   [General Margin Operations](./general.md) - Architecture overview
-   [Flash Loan Operations](../flash-loan.md) - Provider details
-   [External Call Patterns](../external-call.md) - Swap integration
-   [Lending Operations](../lending.md) - Protocol interactions
