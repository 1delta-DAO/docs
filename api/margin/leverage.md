# Leveraging (Borrow & Deposit)

This guide covers leveraging operations, which allow users to increase their position size by borrowing against deposited collateral and reinvesting the borrowed funds.

## Overview

Leveraging involves borrowing assets against your collateral, swapping the borrowed assets for more collateral, then depositing the additional collateral. This amplifies your exposure to the collateral asset while maintaining efficient capital usage through flash loans.

The entire operation is atomic, ensuring that either all steps succeed or the transaction reverts completely.

## Example Scenario

We'll demonstrate creating a leveraged WETH position on **Aave V3** using borrowed USDC. The process involves:

1. Flash loan USDC
2. Swap USDC to WETH via 1inch
3. Deposit user's ETH + swapped WETH as collateral
4. Borrow USDC to repay flash loan

**Starting Capital:**

-   User contribution: 1 ETH

**Target Position:**

-   Total collateral: 3 WETH (1 from user + 2 from leverage)
-   Debt: 8,000 USDC

We'll use **Morpho Blue** as our flash loan provider for optimal rates.

---

## Constants

```solidity
// User's initial contribution
uint256 USER_AMOUNT = 1.0e18;

// Default forwarder address
address CALL_FORWARDER = 0xfCa1154C643C32638AEe9a43eeE7f377f515c801;

// 1Delta composer
IComposer composer = IComposer(0x...);

// Aave V3 pool address
address AAVE_V3_POOL = address(0x...);

// 1inch aggregation router
address oneInchAggregationRouter = address(0x111...);

// Morpho Blue flash loan source
address MORPHO_BLUE = address(0xbbb...);

// WETH contract address
address WETH = address(0xC02...);
```

---

## Operation Sequence

### Integration Checklist

-   [ ] Protocol permissions configured
-   [ ] Token approvals set
-   [ ] Health factor validated
-   [ ] Slippage parameters configured
-   [ ] Gas optimization applied
-   [ ] Error handling implemented
-   [ ] Position monitoring enabled

### 1. Pull User Funds

First, we transfer the user's ETH and efficiently convert it to WETH in a single operation.

```solidity
bytes memory transferIn = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.TRANSFER_FROM),
    address(0),                          // Transfer ETH (address(0))
    address(WETH),                       // Convert to WETH directly
    uint128(USER_AMOUNT)                 // Amount: 1 ETH
);
```

### 2. Deposit Total Collateral

We deposit all available WETH (user's contribution plus swapped amount) into Aave V3. Setting amount to `0` deposits the contract's entire WETH balance.

**Important:** Ensure all required approvals are granted beforehand (see Approvals section).

```solidity
bytes memory deposit = abi.encodePacked(
    uint8(ComposerCommands.LENDING),
    uint8(LenderOps.DEPOSIT),
    uint16(LenderIds.UP_TO_AAVE_V3 - 1), // Aave V3 identifier
    address(WETH),                        // Asset to deposit
    uint128(0),                          // 0 = deposit entire balance
    address(user),                       // Deposit recipient
    address(AAVE_V3_POOL)               // Aave V3 pool address
);
```

### 3. Borrow Against Collateral

We borrow exactly the flash loan repayment amount (plus any fees) in USDC. The borrowed funds go directly to the forwarder to minimize transfers.

```solidity
bytes memory borrow = abi.encodePacked(
    uint8(ComposerCommands.LENDING),
    uint8(LenderOps.BORROW),
    uint16(LenderIds.UP_TO_AAVE_V3 - 1), // Aave V3 identifier
    address(USDC),                        // Asset to borrow
    uint128(8000.0e6),                   // Flash loan repayment amount
    address(CALL_FORWARDER),             // Send directly to forwarder
    uint8(2),                           // Variable rate mode
    address(AAVE_V3_POOL)               // Aave V3 pool address
);
```

### 4. Approvals

Required approvals for the operation to succeed:

```solidity
// Approve Aave V3 pool to spend WETH for collateral deposit
bytes memory approvePool = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.APPROVE),
    address(WETH),                       // Asset to approve
    address(AAVE_V3_POOL)               // Spender
);

// Approve Morpho Blue to pull USDC for flash loan repayment
bytes memory approveMorpho = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.APPROVE),
    address(USDC),                       // Asset to approve
    address(MORPHO_BLUE)                 // Spender
);
```

### 5. Meta Swap Configuration

The swap operation converts flash-loaned USDC to WETH for additional collateral. Since funds are already at the forwarder from the flash loan, we skip manual transfers.

```solidity
// Configure the forwarder call to 1inch
bytes memory callForwarderCall = abi.encodePacked(
    uint8(ComposerCommands.EXT_CALL),
    address(oneInchAggregationRouter),   // Target contract
    uint128(0),                          // No ETH value for ERC20 swap
    uint16(data.length),                 // Call data length
    data                                 // 1inch swap call data
);

// Approve 1inch to spend USDC
bytes memory approve1inch = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.APPROVE),
    address(USDC),                       // Asset to approve
    address(oneInchAggregationRouter)    // Spender
);

// Verify minimum output and transfer to composer
uint256 amountExpected = 2.0e18; // Expected 2 WETH from swap

bytes memory sweepAndCheckSlippage = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.SWEEP),
    address(WETH),                       // Asset to sweep
    address(composer),                   // Send to composer for deposit
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
uint128 flashLoanAmount = uint128(8000.0e6); // USDC amount to flash loan

// Inner operations executed within flash loan callback
bytes memory innerOperation = abi.encodePacked(
    metaSwap,            // Swap flash-loaned USDC to WETH
    deposit,             // Deposit all WETH as collateral
    borrow               // Borrow USDC to repay flash loan
);

// Flash loan wrapper
bytes memory flashLoan = abi.encodePacked(
    uint8(ComposerCommands.FLASH_LOAN),
    uint8(FlashLoanIds.MORPHO_BLUE),
    address(USDC),                       // Flash loan asset
    address(MORPHO_BLUE),                // Flash loan provider
    flashLoanAmount,                     // Flash loan amount
    uint16(innerOperation.length + 1),   // Callback data length
    uint8(0),                           // Morpho Blue pool ID
    innerOperation                       // Operations to execute
);

// Complete operation sequence
bytes memory composerOps = abi.encodePacked(
    transferIn,       // Pull user's ETH and convert to WETH
    approvePool,      // Pre-approve Aave pool for WETH
    approveMorpho,    // Pre-approve Morpho Blue for USDC
    flashLoan         // Execute flash loan with inner operations
);

// Execute the complete leverage operation
composer.deltaCompose{value: USER_AMOUNT}(composerOps);
```

---

## Key Considerations

1. **Debt Delegation:** The operation requires prior debt delegation approval for borrowing: `IDebtToken(AAVE_V3_USDC_V_TOKEN).approveDelegation(composer, type(uint256).max)`

2. **Flash Loan Fees:** The borrow amount must account for any flash loan fees to ensure complete repayment.

3. **Slippage Protection:** The sweep operation with `SweepType.AMOUNT` ensures you receive sufficient WETH to make the leverage worthwhile.

4. **Efficient ETH Handling:** The `TRANSFER_FROM` operation with WETH as the target efficiently converts ETH to WETH without separate wrapping steps.

5. **Gas Optimization Strategies:**

    - User fund transfers and approvals are placed outside the flash loan callback
    - Direct transfers to the forwarder eliminate unnecessary token movements
    - Maximum approvals reduce future transaction costs

6. **Risk Management:**

    - The entire operation is atomic - partial execution is impossible
    - Minimum output requirements protect against excessive slippage
    - Flash loans eliminate the need for upfront borrowing capital

7. **Position Health:** Ensure the final position maintains a healthy collateralization ratio based on Aave V3's risk parameters for WETH/USDC.

8. **ETH Value Attachment:** The `{value: USER_AMOUNT}` ensures the user's ETH is sent with the transaction for the initial collateral contribution.

## Related Documentation

-   [General Margin Operations](./general.md) - Architecture overview
-   [Flash Loan Operations](../flash-loan.md) - Provider details
-   [External Call Patterns](../external-call.md) - Swap integration
-   [Approval Management](../transfers.md#approve-operation) - Permission setup
