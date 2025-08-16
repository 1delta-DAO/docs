# Position Migration

Position migrations involve moving a leveraged position from one lending protocol to another without changing the underlying assets or requiring swaps.

Let's demonstrate migrating an Aave V3 position to a Compound V3 position while maintaining the same collateral and debt composition.

## Migration Strategy

The execution combines elements of both leverage and close operations:

1. **Flash loan the debt asset** from the Aave V3 position
2. **Repay the Aave V3 debt** completely
3. **Withdraw the Aave V3 collateral**
4. **Deposit collateral into Compound V3**
5. **Borrow from Compound V3** to cover flash loan repayment
6. **Repay the flash loan** with borrowed funds
7. **Refund any leftover dust** to the user

## Example Scenario

**Starting Position (Aave V3):**

- Collateral: 3 WETH
- Debt: 8,000 USDC

**Target Position (Compound V3):**

- Collateral: 3 WETH
- Debt: 8,000 USDC

---

# Constants

```solidity
// Flash loan amount (slightly higher than debt to ensure full repayment)
uint256 FLASH_LOAN_AMOUNT = 8000.1e6; // 8,000.1 USDC (0.1 USDC buffer)

// Default forwarder address
address CALL_FORWARDER = 0xfCa1154C643C32638AEe9a43eeE7f377f515c801;

// 1Delta composer
IComposer composer = IComposer(0x...);

// Protocol addresses
address AAVE_V3_POOL = address(0x...);
address COMPOUND_V3_COMET = address(0x...); // USDC market comet
address AAVE_V3_A_TOKEN_WETH = address(0x...);
address AAVE_V3_USDC_V_TOKEN = address(0x...);

// Flash loan source
address MORPHO_BLUE = address(0xbbb...);

// Asset addresses
address WETH = address(0xC02...);
address USDC = address(0xA0b...);
```

---

# Operation Sequence

## 1. Repay Aave V3 Debt

Use the flash-loaned USDC to completely repay the existing Aave V3 debt. Using `amount=0xffffffffffffffffffffffffffff` ensures we repay the minimum of contract balance and actual debt.

```solidity
bytes memory repayAave = abi.encodePacked(
    uint8(ComposerCommands.LENDING),
    uint8(LenderOps.REPAY),
    uint16(LenderIds.UP_TO_AAVE_V3 - 1), // Aave V3 identifier
    address(USDC),                        // Asset to repay
    uint128(0xffffffffffffffffffffffffffff), // Repay full debt or balance
    address(user),                       // Debt owner
    uint8(2),                           // Variable rate mode
    address(AAVE_V3_USDC_V_TOKEN),       // Variable debt token
    address(AAVE_V3_POOL)               // Aave V3 pool
);
```

## 2. Withdraw Aave V3 Collateral

Withdraw the entire WETH collateral from Aave V3. The collateral goes directly to the composer for the next operation.

```solidity
bytes memory withdrawAave = abi.encodePacked(
    uint8(ComposerCommands.LENDING),
    uint8(LenderOps.WITHDRAW),
    uint16(LenderIds.UP_TO_AAVE_V3 - 1), // Aave V3 identifier
    address(WETH),                        // Asset to withdraw
    uint128(0xffffffffffffffffffffffffffff), // Withdraw full balance
    address(composer),                    // Temporary recipient
    address(AAVE_V3_A_TOKEN_WETH),       // Collateral token
    address(AAVE_V3_POOL)               // Aave V3 pool
);
```

## 3. Deposit to Compound V3

Deposit the withdrawn WETH collateral into Compound V3. Using `amount=0` deposits the contract's entire WETH balance.

```solidity
bytes memory depositCompound = abi.encodePacked(
    uint8(ComposerCommands.LENDING),
    uint8(LenderOps.DEPOSIT),
    uint16(LenderIds.UP_TO_COMPOUND_V3 - 1), // Compound V3 identifier
    address(WETH),                        // Asset to deposit
    uint128(0),                          // Deposit entire balance
    address(user),                       // Deposit recipient
    address(COMPOUND_V3_COMET)           // Compound V3 comet address
);
```

## 4. Borrow from Compound V3

Borrow enough USDC from Compound V3 to repay the flash loan plus any fees.

```solidity
bytes memory borrowCompound = abi.encodePacked(
    uint8(ComposerCommands.LENDING),
    uint8(LenderOps.BORROW),
    uint16(LenderIds.UP_TO_COMPOUND_V3 - 1), // Compound V3 identifier
    address(USDC),                        // Asset to borrow
    uint128(FLASH_LOAN_AMOUNT),          // Exact flash loan repayment amount
    address(composer),                    // Temporary recipient
    address(COMPOUND_V3_COMET)           // Compound V3 comet address
);
```

## 5. Refund Excess USDC

Transfer any remaining USDC balance back to the user after flash loan repayment.

```solidity
bytes memory refundExcess = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.SWEEP),
    address(USDC),                       // Asset to sweep
    address(user),                       // Recipient
    uint128(0)                          // Send remaining balance
);
```

## 6. Required Approvals

Set up all necessary approvals for the operation:

```solidity
// Approve Aave V3 pool to spend USDC for repayment
bytes memory approveAavePool = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.APPROVE),
    address(USDC),
    address(AAVE_V3_POOL)
);

// Approve Compound V3 comet to spend WETH for collateral deposit
bytes memory approveCompoundComet = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.APPROVE),
    address(WETH),
    address(COMPOUND_V3_COMET)
);

// Approve Morpho Blue for flash loan repayment
bytes memory approveMorpho = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.APPROVE),
    address(USDC),
    address(MORPHO_BLUE)
);
```

---

# Complete Migration Assembly

Putting it all together with the flash loan wrapper:

```solidity
// Inner operations executed within flash loan callback
bytes memory innerOperation = abi.encodePacked(
    repayAave,           // Repay existing Aave V3 debt
    withdrawAave,        // Withdraw Aave V3 collateral
    depositCompound,     // Deposit collateral to Compound V3
    borrowCompound,      // Borrow from Compound V3 to repay flash loan
    refundExcess         // Refund any excess USDC to user
);

// Flash loan wrapper
bytes memory flashLoan = abi.encodePacked(
    uint8(ComposerCommands.FLASH_LOAN),
    uint8(FlashLoanIds.MORPHO_BLUE),
    address(USDC),                       // Flash loan asset
    address(MORPHO_BLUE),                // Flash loan provider
    uint128(FLASH_LOAN_AMOUNT),         // Flash loan amount with buffer
    uint16(innerOperation.length + 1),   // Callback data length
    uint8(0),                           // Morpho Blue pool ID
    innerOperation                       // Operations to execute
);

// Complete migration sequence
bytes memory migrationOps = abi.encodePacked(
    approveAavePool,         // Pre-approve Aave pool
    approveCompoundComet,    // Pre-approve Compound comet
    approveMorpho,          // Pre-approve Morpho Blue
    flashLoan               // Execute migration with flash loan
);

// Execute the complete position migration
composer.deltaCompose(migrationOps);
```

---

# Key Considerations

## 1. **Dust Management**

The borrow-repay process will leave dust since we must use a fixed flash loan amount larger than the exact Aave V3 debt to ensure complete repayment. The excess is automatically refunded to the user.

## 2. **Flash Loan Buffer**

To ensure we can repay the flash loan completely, we borrow the Aave V3 debt amount plus a safety margin (e.g., 0.1 USDC buffer). This accounts for:

- Interest accrual between quote and execution
- Flash loan fees (if any)
- Rounding differences in debt calculations

## 3. **Protocol Permissions**

The operation requires pre-approval on both protocols:

- **Aave V3:** Approve composer for collateral withdrawal: `IERC20(AAVE_V3_A_TOKEN_WETH).approve(composer, type(uint256).max)`
- **Compound V3:** Allow composer for operations: `IComet(COMPOUND_V3_COMET).allow(composer, true)`

## 4. **Market Compatibility**

Ensure the target Compound V3 market accepts the same collateral asset and allows borrowing the same debt asset. Compound V3 markets are isolated and each supports specific asset combinations.

## 5. **Risk Parameter Changes**

Different protocols have different:

- Loan-to-value ratios
- Liquidation thresholds
- Interest rate models

Verify the position remains healthy after migration and adjust if necessary.

## 6. **Atomic Execution**

The entire migration is atomic - either all steps succeed or the transaction reverts, ensuring no partial migrations that could leave positions in an inconsistent state.

## 7. **Gas Optimization**

- All approvals are performed outside the flash loan callback
- Using `amount=0` and max values reduces the need for exact balance calculations
- Direct transfers between operations minimize intermediate steps
