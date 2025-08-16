# Close (Withdraw & Repay)

In this section, we cover the close method in detail.

This process involves borrowing assets, typically swapping the borrowed amount for another asset, and then repaying debt via the the resulting funds.  
We will illustrate how to create the calldata required for this operation.

Our example will demonstrate swithing debt in a leveraged position on **Aave V3** - without ever de-leveraging - where we:

- Withdraw
- Swap via 1inch
- Repay the swapped assets
- Refund any excess if needed

To construct this sequence, we will use a [Flash Loan](../flash-loan.md) that wraps the entire operation.  
To maximize efficiency, we will perform only a single deposit.

Let’s assume we want to exit a **USDC–WETH** leveraged position - borrowing USDC

First, we identify the flash loan source. For this example, we will assume that **Morpho Blue** is the best option (which is typically the case for Ethereum and, for example, Base).

**Example parameters**:  
We start with **3 WETH** in collateral and **8,000 USDC** in debt and want to swap the abut **2 WETH** to **8,000 USDC** and ensure that the entire leftovers are withdrawn and refunded. The caller needs to ensure that the swap is quoted so that we receive at least the full debt amount, otherwise the withdrawal will fail.

We will build this step-by-step, starting with the inner operations.

---

## Constants

```solidity
// the swap amount
uint256 USER_AMOUNT = 2.0e18;

// this is the default forwarder address
address CALL_FORWARDER = 0xfCa1154C643C32638AEe9a43eeE7f377f515c801;

// 1delta composer
IComposer composer = IComposer(0x...);

// aave address, can be replaced with any fork
address AAVE_V3_POOL = address(0x...);

// aave v token address for output
address AAVE_V3_USDC_V_TOKEN = address(0x...);

// the aave collateral token address
address AAVE_V3_A_TOKEN_WETH = address(0x...)

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
    address(USDC),// underlying USDC
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

## Withdraw

We must ensure that we withdraw **at least** the flash loan amount.
If the flash loan incurs a fee, we need to withdraw **the amount plus the fee**. It must be noted that users typically prefer to not have collateral dust left. In this case, we withdraw everything and split the payment to the forwarder and user.

The WETH swap amount is sent to the `CALL_FORWARDER`, which saves us an additional transfer step.

If we withdraw everything, we use `0` as the amount and add the refund to the user:

```solidity
bytes memory withdraw = abi.encodePacked(
    uint8(ComposerCommands.LENDING),
    uint8(LenderOps.WITHDRAW),
    uint16(LenderIds.UP_TO_AAVE_V3 - 1), // general Aave V3
    address(WETH),// underlying WETH
    uint128(0), // total collateral balance
    address(COMPOSER_ADDRESS), // receiver of the composer to split the payments
    address(AAVE_V3_A_TOKEN_WETH), // the collateral token
    address(AAVE_V3_POOL) // the Aave V3 pool address
);

bytes memory transferToForwarder = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.SWEEP),
    address(WETH), // the withdraw asset
    address(CALL_FORWARDER),// directly to the forwarder to swap
    uint128(USER_AMOUNT) // the exact amount that we quoted the swap with
);

bytes memory transferToUser = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.SWEEP),
    address(WETH), // withdraw asset
    address(user),// the user address
    uint128(0) // whatever is left
);

// combine this call
withdraw = abi.encodePacked(
    withdraw,
    transferToForwarder,
    transferToUser
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
    address(WETH),// underlying WETH
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

## The Close Call

Finally, we assemble the complete calldata sequence.

The **inner operation** performs the swap of the flash-loaned amount, deposits **all available funds** (including the user’s contribution), and then borrows the required amount to repay the Morpho flash loan.

Note that this has to be permissioned via `ERC20(AAVE_V3_A_TOKEN_WETH).approve(...)`.

```solidity
// select 2 WETH (= the swap amount)
uint128 amount = uint128(2.0e18);

// the inner operation swaps the flash loaned amounts,
// deposits everything (incl the user funds) and borrows whatever we need to repay to morpho.
bytes memory innerOperation = abi.encodePacked(
    metaSwap,
    repay,
    withdraw,
);

bytes memory flashLoan = abi.encodePacked(
    uint8(ComposerCommands.FLASH_LOAN), // then just continue the next one
    uint8(FlashLoanIds.MORPHO_BLUE),
    WETH,
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
