# Leveraging (Borrow & Deposit)

In this section, we cover the leveraging method in detail.

This process involves borrowing assets, typically swapping the borrowed amount for another asset, and then depositing the resulting funds as collateral.  
We will illustrate how to create the calldata required for this operation.

Our example will demonstrate creating a leveraged position on **Aave V3**, where we:

- Deposit collateral
- Borrow
- Swap via 1inch
- Deposit the swapped assets

To construct this sequence, we will use a [Flash Loan](../flash-loan.md) that wraps the entire operation.  
To maximize efficiency, we will perform only a single deposit.

Let’s assume we want to create a **USDC–WETH** leveraged position, borrowing USDC.

First, we identify the flash loan source. For this example, we will assume that **Morpho Blue** is the best option (which is typically the case for Ethereum and, for example, Base).

**Example parameters**:  
We start with **1 ETH** and want to create a position with **3 WETH** as collateral and **8,000 USDC** as debt.

We will build this step-by-step, starting with the inner operations.

---

## Constants

```Solidity
// the deposit amount
uint256 USER_AMOUNT = 1.0e18;

// this is the default forwarder address
address CALL_FORWARDER = 0xfCa1154C643C32638AEe9a43eeE7f377f515c801;

// 1delta composer
IComposer composer = IComposer(0x...);

// aave address, can be replaced with any fork
address AAVE_V3_POOL = address(0x...);

// meta swap call target
address oneInchAggregationRouter = address(0x111...);

// falash loan source Morpho
address MORPHO_BLUE = address(0xbbb...);
```

---

## Pull Funds

First, we define the operation to pull ETH from the user and convert it into WETH.
Here, we use an efficient version of wrapping to avoid unnecessary intermediate steps.

```Solidity
bytes memory transferIn = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.TRANSFER_FROM),
    address(0),// we transfer ETH
    address(WETH), // transfer to WETH (this is an efficent version of wrapping)
    uint128(USER_AMOUNT) // 1 ETH
);
```

---

## Deposit

We deposit the funds into Aave V3.
It is important to ensure that all required permissions have been granted in advance (see the **Approval** section).

Here, the deposit amount is set to `0`, meaning we will deposit **both** the user-provided ETH and whatever WETH we receive from the swapper.

```Solidity
bytes memory deposit = abi.encodePacked(
    uint8(ComposerCommands.LENDING),
    uint8(LenderOps.DEPOSIT),
    uint16(LenderIds.UP_TO_AAVE_V3 - 1), // general Aave V3
    address(WETH),// underlying ETH
    uint128(0), // 0 means whatever is in the contract at the time of execution
    address(user), // receiver of the deposit
    address(AAVE_V3_POOL) // the Aave V3 pool address
);
```

---

## Borrow

We must ensure that we borrow **exactly** the flash loan amount.
If the flash loan incurs a fee, we need to borrow **the amount plus the fee**.

The borrowed USDC is sent to the `CALL_FORWARDER`, which saves us an additional transfer step.

```Solidity
bytes memory borrow = abi.encodePacked(
    uint8(ComposerCommands.LENDING),
    uint8(LenderOps.BORROW),
    uint16(LenderIds.UP_TO_AAVE_V3 - 1), // general Aave V3
    address(USDC),// underlying USDC
    uint128(8000.0e6), // 8k USDC
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

```Solidity
// approval for the deposit
bytes memory approvePool = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.APPROVE),
    address(WETH),// underlying WETH
    address(AAVE_V3_POOL) // the Aave V3 pool address
);

// Morpho flash loans pull the funds via `transferFrom`, as such, we have to approve the flash loan currency.
bytes memory approveMorpho = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.APPROVE),
    address(USDC),// underlying USDC
    address(MORPHO_BLUE) // the Morpho Blue address
);
```

---

## Meta Swap

The meta swap follows the same approach as described in [External Call](../external-call.md).

The difference here is that we skip the manual transfer step, because the funds are already transferred during the borrow.

```Solidity
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
        address(USDC),
        address(oneInchAggregationRouter)
    );

// expect to receive 2 WETH
// revert if we receive less
uint256 amountExpected = 2.0e18;

// in case the aggregators does not transfer directly to the user
bytes memory sweepAndCheckSlippage = abi.encodePacked(
        uint8(ComposerCommands.TRANSFERS),
        uint8(TransferIds.SWEEP),
        address(WETH),
        address(receiver), // this is the receiver of the WETH
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

## The Leverage Call

Finally, we assemble the complete calldata sequence.

The **inner operation** performs the swap of the flash-loaned amount, deposits **all available funds** (including the user’s contribution), and then borrows the required amount to repay the Morpho flash loan.

Note that this has to be permissioned via `IDebtToken(USDC_DEBT_TOKEN).approveDelegation(...)`.

```Solidity
// select 8000 USDC (= the borrow amount)
uint128 amount = uint128(8000.0e6);

// the inner operation swaps the flash loaned amounts,
// deposits everything (incl the user funds) and borrows whatever we need to repay to morpho.
bytes memory innerOperation = abi.encodePacked(
    metaSwap,
    deposit,
    borrow,
)

bytes memory flashLoan = abi.encodePacked(
    uint8(ComposerCommands.FLASH_LOAN), // then just continue the next one
    uint8(FlashLoanIds.MORPHO_BLUE),
    USDC,
    MORPHO_BLUE_ADDRESS
    amount,
    uint16(innerOperation.length + 1),
    uint8(0), // the original morpho blue has poolId 0.
    innerOperation
)

// we ensure that everything that can be outside of the callback is outside
// this saves gas as the flash loan calldata is smaller
// relevant only for ETH mainnet.
bytes memory composerOps = abi.encodePacked(
    transferIn,
    approvePool,
    approveMorpho,
    flashLoan
);

// execute call and attach user ETH
composer.deltaCompose{value: USER_AMOUNT}(composerOps);
```
