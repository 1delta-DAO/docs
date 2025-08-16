# Debt Swap (Borrow & Repay)

In this section, we cover the debt swap method in detail.

This process involves borrowing assets, typically swapping the borrowed amount for another asset, and then repaying debt via the the resulting funds.  
We will illustrate how to create the calldata required for this operation.

Our example will demonstrate swithing debt in a leveraged position on **Aave V3** - without ever de-leveraging - where we:

- Borrow
- Swap via 1inch
- Repay the swapped assets
- Refund any excess if needed

To construct this sequence, we will use a [Flash Loan](../flash-loan.md) that wraps the entire operation.  
To maximize efficiency, we will perform only a single deposit.

Let’s assume we want to switch a **USDC–WETH** leveraged position - borrowing USDC - to one where we borrow USDT instead.

First, we identify the flash loan source. For this example, we will assume that **Morpho Blue** is the best option (which is typically the case for Ethereum and, for example, Base).

**Example parameters**:  
We start with **3 WETH** in collateral and **8,000 USDC** in debt and want to swap the USDC to **8,000 USDT**.

We will build this step-by-step, starting with the inner operations.

---

## Constants

```solidity
// the deposit amount
uint256 USER_AMOUNT = 8000.0e6;

// this is the default forwarder address
address CALL_FORWARDER = 0xfCa1154C643C32638AEe9a43eeE7f377f515c801;

// 1delta composer
IComposer composer = IComposer(0x...);

// aave address, can be replaced with any fork
address AAVE_V3_POOL = address(0x...);

// aave v token address for output
address AAVE_V3_USDC_V_TOKEN = address(0x...);

// aave v token address for inpout
address AAVE_V3_USDT_V_TOKEN = address(0x...);

// meta swap call target
address oneInchAggregationRouter = address(0x111...);

// falash loan source Morpho
address MORPHO_BLUE = address(0xbbb...);
```

---

## Repay

We repay the funds to Aave V3.
It is important to ensure that all required permissions have been granted in advance (see the **Approval** section).

Here, the repay amount is set to `0` - this will ensure that we repay the minimum of the receipt funds and the user debt amount. In case we expect tor repay everything, we add a safety-sweep to refund any excess to the user.

```solidity
bytes memory repay = abi.encodePacked(
    uint8(ComposerCommands.LENDING),
    uint8(LenderOps.REPAY),
    uint16(LenderIds.UP_TO_AAVE_V3 - 1), // general Aave V3
    address(USDC),// underlying USDT
    uint128(0), // 0 means whatever is in the contract at the time of execution
    address(user), // receiver of the repay
    uint8(2), // the mode is variable, as usual
    address(AAVE_V3_USDC_V_TOKEN), // the Aave V3 pool address
    address(AAVE_V3_POOL) // the Aave V3 pool address
);

bytes memory transferToUser = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.SWEEP),
    address(USDC), // repay asset
    address(user),// the user address
    uint128(0) // whatever is left
);

// combine this call
withdraw = abi.encodePacked(
    repay,
    transferToUser
);
```

---

## Borrow

We must ensure that we borrow **exactly** the flash loan amount.
If the flash loan incurs a fee, we need to borrow **the amount plus the fee**.

The borrowed USDT is sent to the `CALL_FORWARDER`, which saves us an additional transfer step.

```solidity
bytes memory borrow = abi.encodePacked(
    uint8(ComposerCommands.LENDING),
    uint8(LenderOps.BORROW),
    uint16(LenderIds.UP_TO_AAVE_V3 - 1), // general Aave V3
    address(USDT),// underlying USDT
    uint128(8000.0e6), // 8k USDT
    address(CALL_FOWRARDER), // receiver of the call forwarder to avoid additional transfers
    uint8(2), // variable IR mode
    address(AAVE_V3_POOL) // the Aave V3 pool address
);
```

---

## Approvals

We need to grant permissions for all operations.
These approvals are only required once per deployment, as the composer contract always approves the maximum amount.

If approvals have already been set, our contracts will skip them to save gas.

```solidity
// approval for the deposit
bytes memory approvePool = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.APPROVE),
    address(USDC),// underlying to repay USDT
    address(AAVE_V3_POOL) // the Aave V3 pool address
);

// Morpho flash loans pull the funds via `transferFrom`, as such, we have to approve the flash loan currency.
bytes memory approveMorpho = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.APPROVE),
    address(USDT),// underlying USDT
    address(MORPHO_BLUE) // the Morpho Blue address
);
```

---

## Meta Swap

The meta swap follows the same approach as described in [External Call](../external-call.md).

The difference here is that we skip the manual transfer step, because the funds are already transferred during the borrow.

```solidity
// create the call for the forwarder
// the target can e.g. be the 1inch aggregation router
bytes memory callForwarderCall  = abi.encodePacked(
        uint8(ComposerCommands.EXT_CALL),
        address(oneInchAggregationRouter),
        uint128(0), // ERC20 has no value
        uint16(data.length),
        data
    );

bytes memory approve1inch = abi.encodePacked(
        uint8(ComposerCommands.TRANSFERS),
        uint8(TransferIds.APPROVE),
        address(USDT),
        address(oneInchAggregationRouter)
    );

// expect to receive 8,000 USDC
// revert if we receive less
uint256 amountExpected = 8000.0e6;

// in case the aggregators does not transfer directly to the user
bytes memory sweepAndCheckSlippage = abi.encodePacked(
        uint8(ComposerCommands.TRANSFERS),
        uint8(TransferIds.SWEEP),
        address(USDC),
        address(receiver), // this is the receiver of the USDC
        uint8(SweepType.AMOUNT),
        amountExpected
    );

// combine the operations
callForwarderCall = abi.encodePacked(
    approve1inch,
    callForwarderCall,
    sweepAndCheckSlippage
);

// prepare the composer call
// this executes callForwader.deltaForwardCompose(callForwarderCall)
bytes memory metaSwap  = abi.encodePacked(
        uint8(ComposerCommands.EXT_CALL),
        callForwarderAddress, // it is important to use the forwarder on the composer level
        uint128(value),
        uint16(callForwarderCall.length),
        callForwarderCall
    );
```

---

## The Debt Swap Call

Finally, we assemble the complete calldata sequence.

The **inner operation** performs the swap of the flash-loaned amount, deposits **all available funds** (including the user’s contribution), and then borrows the required amount to repay the Morpho flash loan.

Note that this has to be permissioned via `IDebtToken(AAVE_V3_USDT_V_TOKEN).approveDelegation(...)`.

```solidity
// select 8000 USDT (= the borrow amount)
uint128 amount = uint128(8000.0e6);

// the inner operation swaps the flash loaned amounts,
// deposits everything (incl the user funds) and borrows whatever we need to repay to morpho.
bytes memory innerOperation = abi.encodePacked(
    metaSwap,
    repay,
    borrow,
);

bytes memory flashLoan = abi.encodePacked(
    uint8(ComposerCommands.FLASH_LOAN), // then just continue the next one
    uint8(FlashLoanIds.MORPHO_BLUE),
    USDT,
    MORPHO_BLUE_ADDRESS
    amount,
    uint16(innerOperation.length + 1),
    uint8(0), // the original morpho blue has poolId 0.
    innerOperation
);

// we ensure that everything that can be outside of the callback is outside
// this saves gas as the flash loan calldata is smaller
// relevant only for ETH mainnet.
bytes memory composerOps = abi.encodePacked(
    approvePool,
    approveMorpho,
    flashLoan
);

// execute call
composer.deltaCompose(composerOps);
```
