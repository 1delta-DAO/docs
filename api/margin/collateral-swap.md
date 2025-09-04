# Collateral Swap (Withdraw & Deposit)

This guide covers collateral swaps, which allow users to exchange their collateral assets without closing positions or repaying debt.

## Overview

Collateral swaps differ from leverage operations in one key way: you can withdraw your **entire** collateral balance. Since collateral balances change with each block due to interest accrual, the exact amount isn't always predictable when querying off-chain. This creates challenges when working with swap aggregators, which typically require exact input amounts for quotes.

## Example Scenario

We'll demonstrate switching collateral on **Aave V3** from WETH to USDT while maintaining a leveraged position. The process involves:

1. Withdrawing WETH collateral
2. Swapping WETH to USDT via 1inch
3. Depositing USDT as new collateral

We'll wrap this entire sequence in a [Flash Loan](../flash-loan.md) using **Morpho Blue** as the flash loan provider.

**Starting Position:**

-   Collateral: 3 WETH
-   Debt: 8,000 USDC

**Target:**

-   Convert 3 WETH to 12,000 USDT as new collateral

---

## Constants

```solidity
// The collateral amount to exchange
uint256 USER_AMOUNT = 3.0e18;

// Default forwarder address
address CALL_FORWARDER = 0xfCa1154C643C32638AEe9a43eeE7f377f515c801;

// 1Delta composer
IComposer composer = IComposer(0x...);

// Aave V3 pool address
address AAVE_V3_POOL = address(0x...);

// Aave V3 WETH collateral token
address AAVE_V3_A_TOKEN_WETH = address(0x...);

// 1inch aggregation router
address oneInchAggregationRouter = address(0x111...);

// Morpho Blue flash loan source
address MORPHO_BLUE = address(0xbbb...);
```

---

## Operation Sequence

### Integration Checklist

-   [ ] Collateral withdrawal permissions configured
-   [ ] New collateral deposit approvals set
-   [ ] Swap quotes validated for sufficient output
-   [ ] Health factor impact assessed
-   [ ] Slippage protection configured
-   [ ] Cross-protocol compatibility verified
-   [ ] Gas optimization strategies applied
-   [ ] Error handling and fallback mechanisms
-   [ ] Position value tracking enabled

### 1. Deposit New Collateral

After receiving USDT from the swap, we deposit it into Aave V3. Setting the amount to `0` deposits whatever USDT balance the contract holds.

**Important:** Ensure all required approvals are granted beforehand (see Approvals section).

```solidity
bytes memory deposit = abi.encodePacked(
    uint8(ComposerCommands.LENDING),
    uint8(LenderOps.DEPOSIT),
    uint16(LenderIds.UP_TO_AAVE_V3 - 1), // Aave V3 identifier
    address(USDT),                        // Asset to deposit
    uint128(0),                          // 0 = deposit full contract balance
    address(user),                       // Deposit recipient
    address(AAVE_V3_POOL)               // Aave V3 pool address
);
```

### 2. Withdraw Original Collateral

We withdraw the entire WETH collateral balance and split it between the swap operation and any remainder for the user.

```solidity
bytes memory withdraw = abi.encodePacked(
    uint8(ComposerCommands.LENDING),
    uint8(LenderOps.WITHDRAW),
    uint16(LenderIds.UP_TO_AAVE_V3 - 1), // Aave V3 identifier
    address(WETH),                        // Asset to withdraw
    uint128(0),                          // 0 = withdraw full balance
    address(COMPOSER_ADDRESS),            // Temporary recipient for splitting
    address(AAVE_V3_A_TOKEN_WETH),       // Collateral token address
    address(AAVE_V3_POOL)                // Aave V3 pool address
);

// Send exact swap amount to forwarder
bytes memory transferToForwarder = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.SWEEP),
    address(WETH),                       // Asset to transfer
    address(CALL_FORWARDER),             // Recipient (swap forwarder)
    uint128(USER_AMOUNT)                 // Exact quoted amount
);

// Send any remainder to user
bytes memory transferToUser = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.SWEEP),
    address(WETH),                       // Asset to transfer
    address(user),                       // Recipient
    uint128(0)                           // Send remaining balance
);

// Combine all withdrawal operations
withdraw = abi.encodePacked(
    withdraw,
    transferToForwarder,
    transferToUser
);
```

### 3. Approvals

Required approvals for the operation to succeed:

```solidity
// Approve Aave V3 pool to spend USDT for deposit
bytes memory approvePool = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.APPROVE),
    address(USDT),                       // Asset to approve
    address(AAVE_V3_POOL)               // Spender
);

// Approve Morpho Blue to pull WETH for flash loan repayment
bytes memory approveMorpho = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.APPROVE),
    address(WETH),                       // Asset to approve
    address(MORPHO_BLUE)                 // Spender
);
```

### 4. Meta Swap Configuration

The swap operation uses the external call pattern described in [External Call](../external-call.md):

```solidity
// Configure the forwarder call to 1inch
bytes memory callForwarderCall = abi.encodePacked(
    uint8(ComposerCommands.EXT_CALL),
    address(oneInchAggregationRouter),   // Target contract
    uint128(0),                          // No ETH value for ERC20 swap
    uint16(data.length),                 // Call data length
    data                                 // 1inch swap call data
);

// Approve 1inch to spend WETH
bytes memory approve1inch = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.APPROVE),
    address(WETH),                       // Asset to approve
    address(oneInchAggregationRouter)    // Spender
);

// Verify minimum output and transfer to recipient
uint256 amountExpected = 12000.0e6; // Expected USDT amount (6 decimals)

bytes memory sweepAndCheckSlippage = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.SWEEP),
    address(USDT),                       // Asset to sweep
    address(receiver),                   // Final recipient
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
    callForwarderAddress,                // Forwarder contract
    uint128(0),                          // No ETH value
    uint16(callForwarderCall.length),    // Call data length
    callForwarderCall                    // Forwarder operations
);
```

---

## Complete Operation Assembly

Putting it all together with the flash loan wrapper:

```solidity
uint128 flashLoanAmount = uint128(3.0e18); // Amount to flash loan

// Inner operations executed within flash loan callback
bytes memory innerOperation = abi.encodePacked(
    withdraw,        // Withdraw WETH collateral
    metaSwap,        // Swap WETH to USDT
    deposit          // Deposit USDT as new collateral
);

// Flash loan wrapper
bytes memory flashLoan = abi.encodePacked(
    uint8(ComposerCommands.FLASH_LOAN),
    uint8(FlashLoanIds.MORPHO_BLUE),
    address(WETH),                       // Flash loan asset
    address(MORPHO_BLUE),                // Flash loan provider
    flashLoanAmount,                     // Flash loan amount
    uint16(innerOperation.length + 1),   // Callback data length
    uint8(0),                           // Morpho Blue pool ID
    innerOperation                       // Operations to execute
);

// Complete operation sequence
bytes memory composerOps = abi.encodePacked(
    approvePool,      // Pre-approve Aave pool
    approveMorpho,    // Pre-approve Morpho Blue
    flashLoan         // Execute flash loan with inner operations
);

// Execute the complete collateral swap
composer.deltaCompose(composerOps);
```

---

## Key Considerations

1. **Exact Amounts:** When withdrawing the entire collateral balance, split transfers ensure the swap gets exactly the quoted amount while the user receives any remainder.

2. **Permissions:** The operation requires prior approval of the WETH collateral token: `IERC20(AAVE_V3_A_TOKEN_WETH).approve(composer, type(uint256).max)`

3. **Slippage Protection:** The sweep operation with `SweepType.AMOUNT` ensures you receive at least the expected minimum output from the swap.

4. **Gas Optimization:** Using the forwarder pattern eliminates unnecessary token transfers between operations.

## Related Documentation

-   [General Margin Operations](./general.md) - Architecture overview
-   [Flash Loan Operations](../flash-loan.md) - Provider details
-   [External Call Patterns](../external-call.md) - Swap integration
-   [Lending Operations](../lending.md) - Protocol interactions
