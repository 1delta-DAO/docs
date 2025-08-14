# Leveraging (Borrow & Deposit)

In this section we cover the leveraging method.

This includes borrowing, typically swapping and then deposit the return amounts.

We illustrate how to create the calldata for this operation.

Let us assume we want to create a leveraged position on Aave V3 where we

- Deposit collateral
- Borrow
- Swap with 1inch
- Deposit

To construc this, we need a [Flash Loan](../flash-loan.md) that wraps the entire operation.To be extra efficient, we only facilitate a single deposit.

Let us take the example of a USDC-WETH position (we borrow USDC).

We identify the flash loan source first, let us assume that Morpho Blue is the best options (as is the case for Ethereum and e.g. Base).

Let us say we have 1 ETH and want to create a position with 3 WETH in collateral and 8,000 USDC in debt.

We first create the inner operations.

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

## Pull funds

We define the operation to pull the ETH from the user and convert it to WETH.

```Solidity

bytes memory transferIn = abi.encodePacked(
    uint8(ComposerCommands.TRANSFERS),
    uint8(TransferIds.TRANSFER_FROM),
    address(0),// we transfer ETH
    address(WETH), // transfer to WETH (this is an efficent version of wrapping)
    uint128(USER_AMOUNT) // 1 ETH
);

```

## Deposit

We depoist funds to Aave V3. It is important that respective permissions are granted (see Approval).

The amount used is `0` as we want to deposit the user amount plus whatever we receive from the swapper.

```Solidity

bytes memory depoist = abi.encodePacked(
    uint8(ComposerCommands.LENDING),
    uint8(LenderOps.DEPOSIT),
    uint16(LenderIds.UP_TO_AAVE_V3 - 1), // general Aave V3
    address(WETH),// underlying ETH
    uint128(0), // 0 means whatever is in the contract at the time of execution
    address(user), // receiver of the deposit
    address(AAVE_V3_POOL) // the Aave V3 pool address
);

```

## Borrow

We need to ensure that we borrow the exact flash loan amount. f the flash loan has a fee, we ould be required to borrow the amount plus the fee.

The receiver is the `CALL_FORWARDER` - this saves us an additional transfer operation.

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

## Approvals

We nee to permission all operations. These have to be executed once per deployment as the composer contract approves the maximum amount every time.

If the approval was already done, our contracts skip it to save gas.

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

## Meta Swap

The mata swap follows the same approach as described in [External Call](../external-call.md).

The difference is that we skip the manual transfer as we already facilitated that in the borrow.

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

## The leverage call

We put everything together. The inner operations are the

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
