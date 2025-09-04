# Close Operation (Withdraw & Repay)

This section provides a detailed guide for implementing the close operation, which allows users to exit leveraged positions efficiently.

## Overview

The close operation enables users to exit a leveraged position by:

1. Withdrawing collateral assets
2. Swapping the withdrawn assets for the debt token
3. Repaying the outstanding debt
4. Refunding any excess assets to the user

This process maintains capital efficiency by executing all operations within a single transaction using a flash loan wrapper.

## Example Scenario

We'll demonstrate how to switch debt in a leveraged position on **Aave V3** without de-leveraging. Our example:

-   **Initial Position**: 3 WETH collateral with 8,000 USDC debt
-   **Operation**: Withdraw ~2 WETH, swap to USDC, repay debt
-   **Flash Loan Provider**: Morpho Blue (optimal for Ethereum and Base)
-   **Swap Provider**: 1inch Aggregation Router

> **Important**: The mechainc has a fail-safe so that in case the swap does not return enough funds to repay the entire debt, it will only repay the available amounts.

## Implementation

### Integration Checklist

-   [ ] Protocol withdrawal permissions configured
-   [ ] Debt repayment approvals set
-   [ ] Swap quotes validated for sufficient output
-   [ ] Health factor monitoring implemented
-   [ ] Slippage protection configured
-   [ ] Gas optimization strategies applied
-   [ ] Error handling and fallback mechanisms
-   [ ] Position state tracking enabled

### Constants and Setup

Define the necessary addresses and amounts for the operation:

```solidity
// Core parameters
uint256 USER_AMOUNT = 2.0e18;  // Amount of WETH to swap

// Protocol addresses
address CALL_FORWARDER = 0xfCa1154C643C32638AEe9a43eeE7f377f515c801;  // Default forwarder
IComposer composer = IComposer(0x...);  // 1delta composer

// Aave V3 addresses
address AAVE_V3_POOL = address(0x...);
address AAVE_V3_USDC_V_TOKEN = address(0x...);  // Variable debt token
address AAVE_V3_A_TOKEN_WETH = address(0x...);  // Collateral aToken

// External protocols
address oneInchAggregationRouter = address(0x111...);  // Swap router
address MORPHO_BLUE = address(0xbbb...);  // Flash loan provider
```

### Step 1: Repay Operation

Configure the repayment of USDC debt to Aave V3. Setting the amount to `0` ensures we repay the minimum of received funds and outstanding debt.

```solidity
bytes memory repay = abi.encodePacked(
    uint8(ComposerCommands.LENDING),
    uint8(LenderOps.REPAY),
    uint16(LenderIds.UP_TO_AAVE_V3 - 1),  // Aave V3 identifier
    address(USDC),                         // Asset to repay
    uint128(0),                           // 0 = use all available funds
    address(user),                        // Beneficiary of the repayment
    uint8(2),                            // Variable rate mode
    address(AAVE_V3_USDC_V_TOKEN),      // Variable debt token
    address(AAVE_V3_POOL)                // Pool address
);

// Safety sweep for excess funds
bytes memory transferToUser = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.SWEEP),
    address(USDC),
    address(user),
    uint128(0)  // Transfer any remaining balance
);

// Combine operations
bytes memory repayOperation = abi.encodePacked(repay, transferToUser);
```

### Step 2: Withdraw Operation

Withdraw collateral and distribute it between the swap forwarder and user. This approach eliminates an extra transfer step and ensures no dust remains.

```solidity
// Withdraw entire collateral balance
bytes memory withdraw = abi.encodePacked(
    uint8(ComposerCommands.LENDING),
    uint8(LenderOps.WITHDRAW),
    uint16(LenderIds.UP_TO_AAVE_V3 - 1),
    address(WETH),                        // Collateral asset
    uint128(0),                           // 0 = withdraw all
    address(COMPOSER_ADDRESS),            // Initial receiver for splitting
    address(AAVE_V3_A_TOKEN_WETH),       // aToken address
    address(AAVE_V3_POOL)
);

// Transfer swap amount to forwarder
bytes memory transferToForwarder = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.SWEEP),
    address(WETH),
    address(CALL_FORWARDER),
    uint128(USER_AMOUNT)  // Exact amount for swap
);

// Transfer remainder to user
bytes memory transferToUser = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.SWEEP),
    address(WETH),
    address(user),
    uint128(0)  // Transfer remaining balance
);

// Combine operations
bytes memory withdrawOperation = abi.encodePacked(
    withdraw,
    transferToForwarder,
    transferToUser
);
```

### Step 3: Configure Approvals

Set up one-time approvals for all protocols. The composer automatically approves maximum amounts, and subsequent calls skip redundant approvals to save gas.

```solidity
// Approve Aave V3 for USDC repayment
bytes memory approvePool = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.APPROVE),
    address(USDC),
    address(AAVE_V3_POOL)
);

// Approve Morpho for WETH flash loan (uses transferFrom)
bytes memory approveMorpho = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.APPROVE),
    address(WETH),
    address(MORPHO_BLUE)
);
```

### Step 4: Meta Swap Configuration

Set up the swap operation through the forwarder. This follows the pattern described in the [External Call](../external-call.md) documentation, but skips manual transfers since funds are already positioned.

```solidity
// Configure 1inch router call
bytes memory callForwarderCall = abi.encodePacked(
    uint8(ComposerCommands.EXT_CALL),
    address(oneInchAggregationRouter),
    uint128(0),  // No ETH value for ERC20 swap
    uint16(data.length),
    data  // 1inch swap calldata
);

// Approve 1inch to spend WETH
bytes memory approve1inch = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.APPROVE),
    address(WETH),
    address(oneInchAggregationRouter)
);

// Set slippage protection (expecting 8,000 USDC)
uint256 amountExpected = 8000.0e6;

bytes memory sweepAndCheckSlippage = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.SWEEP),
    address(USDC),
    address(receiver),
    uint8(SweepType.AMOUNT),
    amountExpected  // Revert if less than expected
);

// Combine swap operations
callForwarderCall = abi.encodePacked(
    approve1inch,
    callForwarderCall,
    sweepAndCheckSlippage
);

// Wrap in composer call
bytes memory metaSwap = abi.encodePacked(
    uint8(ComposerCommands.EXT_CALL),
    address(CALL_FORWARDER),  // Must use forwarder at composer level
    uint128(0),
    uint16(callForwarderCall.length),
    callForwarderCall
);
```

### Step 5: Assemble Complete Transaction

Combine all operations within a flash loan wrapper for atomic execution:

```solidity
uint128 amount = uint128(2.0e18);  // Flash loan amount (2 WETH)

// Inner operations: swap → repay → withdraw
bytes memory innerOperation = abi.encodePacked(
    metaSwap,
    repayOperation,
    withdrawOperation
);

// Wrap in flash loan
bytes memory flashLoan = abi.encodePacked(
    uint8(ComposerCommands.FLASH_LOAN),
    uint8(FlashLoanIds.MORPHO_BLUE),
    address(WETH),
    address(MORPHO_BLUE),
    amount,
    uint16(innerOperation.length + 1),
    uint8(0),  // Morpho Blue pool ID 0
    innerOperation
);

// Place approvals outside flash loan callback for gas optimization
bytes memory composerOps = abi.encodePacked(
    approvePool,
    approveMorpho,
    flashLoan
);

// Execute the complete operation
composer.deltaCompose(composerOps);
```

## Key Considerations

1. **Permissions**: Ensure `ERC20(AAVE_V3_A_TOKEN_WETH).approve(...)` is called before execution
2. **Slippage Protection**: Always set minimum expected amounts to prevent unfavorable swaps
3. **Gas Optimization**: Keep operations outside the flash loan callback when possible
4. **Error Handling**: The transaction will revert if:
    - Insufficient collateral to withdraw
    - Swap returns less than debt amount
    - Flash loan cannot be repaid

## Related Documentation

-   [General Margin Operations](./general.md) - Architecture overview
-   [Flash Loan Operations](../flash-loan.md) - Provider details
-   [External Call Patterns](../external-call.md) - Swap integration
-   [Lending Operations](../lending.md) - Protocol interactions
-   [Approval Management](../transfers.md#approve-operation) - Permission setup
