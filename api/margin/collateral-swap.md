# Collateral Swap (Withdraw & Deposit)

We will discuss collateral swaps in this section. These are used to exchange user collaterals without closing or repaying debt in the process.

Unlike for the leverage method, there are a few details that we need to keep in mind here.

The main differentiator is that we now have the option to withdraw the __entire__ collateral. This value is generally not exact when queried off-chain (as there is interest accrual per block). 

This slightly interfers with the usage of swap aggregators - which one typically quotes with exact values. We will adjust for thisnin the following guide.

Our example will demonstrate switching collateral from a leveraged position on **Aave V3**, where we:

- Withdraw collateral
- Swap via 1inch
- Deposit the swapped assets

To construct this sequence, we will use a [Flash Loan](../flash-loan.md) that wraps the entire operation.  

Let’s assume we want to switch the collateral of **USDC–WETH** leveraged position, borrowing USDC, from WETH to USDT.

Similar tour prior guide, we assume that we can use **Morpho Blue** for the flash loan.

**Example parameters**:  
We start with a position with **3 WETH** as collateral and **8,000 USDC** as debt. We aim to convert the **3 WETH** to **12,000 USDT** 

We will build this step-by-step, starting with the inner operations.

---

## Constants

```solidity
// the collateral amount to exchange
uint256 USER_AMOUNT = 3.0e18;

// this is the default forwarder address
address CALL_FORWARDER = 0xfCa1154C643C32638AEe9a43eeE7f377f515c801;

// 1delta composer
IComposer composer = IComposer(0x...);

// aave address, can be replaced with any fork
address AAVE_V3_POOL = address(0x...);

// the aave collateral token address
address AAVE_V3_A_TOKEN_WETH = address(0x...)

// meta swap call target
address oneInchAggregationRouter = address(0x111...);

// falash loan source Morpho
address MORPHO_BLUE = address(0xbbb...);
```

---

## Deposit

We deposit the funds into Aave V3.
It is important to ensure that all required permissions have been granted in advance (see the **Approval** section).

Here, the deposit amount is set to `0`, meaning we will deposit whatever WETH we receive from the swapper.

```solidity
bytes memory deposit = abi.encodePacked(
    uint8(ComposerCommands.LENDING),
    uint8(LenderOps.DEPOSIT),
    uint16(LenderIds.UP_TO_AAVE_V3 - 1), // general Aave V3
    address(USDT),// underlying to swap to
    uint128(0), // 0 means whatever is in the contract at the time of execution
    address(user), // receiver of the deposit
    address(AAVE_V3_POOL) // the Aave V3 pool address
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

This is the same as for the leveraging.


```solidity
// approval for the deposit
bytes memory approvePool = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.APPROVE),
    address(USDT),//target underlying USDT
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

The meta swap follows the same approach as described in [External Call](../external-call.md) and also the same as for leveraging.


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
        address(WETH),
        address(oneInchAggregationRouter)
    );

// expect to receive 12,000 USDT
// revert if we receive less
uint256 amountExpected = 12000.0e18;

// in case the aggregators does not transfer directly to the user
bytes memory sweepAndCheckSlippage = abi.encodePacked(
        uint8(ComposerCommands.TRANSFERS),
        uint8(TransferIds.SWEEP),
        address(USDT),
        address(receiver), // this is the receiver of the USDT
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

## The Collateral Swap Call

Finally, we assemble the complete calldata sequence.

The **inner operation** performs the swap of the flash-loaned amount, deposits **all available funds** (including the user’s contribution), and then borrows the required amount to repay the Morpho flash loan.

Note that this has to be permissioned via `IERC20(AAVE_V3_A_TOKEN_WETH).approve(...)`.

```solidity
// select 3 WETH (= the withdraw amount, without dust)
uint128 amount = uint128(3.0e18);

// the inner operation swaps the flash loaned amounts,
// deposits everything (incl the user funds) and withdraws whatever we need to repay to morpho - optionally refund dust to the user.
bytes memory innerOperation = abi.encodePacked(
    metaSwap,
    deposit,
    withdraw,
);

bytes memory flashLoan = abi.encodePacked(
    uint8(ComposerCommands.FLASH_LOAN), // then just continue the next one
    uint8(FlashLoanIds.MORPHO_BLUE),
    USDC,
    MORPHO_BLUE_ADDRESS
    amount,
    uint16(innerOperation.length + 1),
    uint8(0), // the original morpho blue has poolId 0.
    innerOperation
);

// we ensure that everything that can be outside of the callback is outside
bytes memory composerOps = abi.encodePacked(
    approvePool,
    approveMorpho,
    flashLoan
);

// execute call and attach user ETH
composer.deltaCompose{value: USER_AMOUNT}(composerOps);
```
