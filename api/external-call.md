# External calls in the composer contracts

To provide the caller with full flexibility, we allow them to call any arbitrary target indirectly via a `callForwarder` contract that has the onl entrypoint function `deltaForwardCompose(bytes)`

The `composer` contract can call **arbitrary targets** with that fixed selector, whereas the `callForwarder` can call **any target** whith **any selector** (there are exceptions like the `permit2` address and `transferFrom` selector)

To facilitate an external call with `data` on `target`, one needs to

- pull caller funds (directly to `callForwarder`)
- execute `ComposerCommands.EXT_CALL` with the parameters on the `callForwarder` on the `composer` where the operation forwarded is also `ComposerCommands.EXT_CALL` with the provided data and target

While this approach seems to be inefficient, it is necessary to prevent malicious callers to execute bad calldata on the `composer` contract (e.g. trying to execute `transferFrom` from a prior caller that approved the `composer`)

The operation parameters for the composer are given as follows.

| Offset | Length (bytes) | Description          |
| ------ | -------------- | -------------------- |
| 0      | 20             | target `address`     |
| 20     | 16             | value `uint128`      |
| 36     | 20             | dataLength `address` |
| 38     | dataLength     | data `address`       |

`value` is the native currency amount to attach.

The `value` has a high bit that indicates whether to use the `selfbalance`

To encode an operation, te caller has to append this data to the call.

```Solidity
abi.encodePacked(
        uint8(ComposerCommands.EXT_CALL),
        target,
        uint128(value),
        uint16(data.length),
        data
    );
```

Note that for arbitrary calls, we need to use the callForwarder, then it looks like this.

```Solidity

// this is the default forwarder address
address callForwarderAddress = 0xfCa1154C643C32638AEe9a43eeE7f377f515c801;

// create the call for the forwarder
// the target can e.g. be the 1inch aggregation router
bytes memory callForwarderCall  = abi.encodePacked(
        uint8(ComposerCommands.EXT_CALL),
        target,
        uint128(value),
        uint16(data.length),
        data
    );

// prepare the composer call
bytes memory composerCall  = abi.encodePacked(
        uint8(ComposerCommands.EXT_CALL),
        callForwarderAddress, // it is important to use the forwarder on the composer level
        uint128(value),
        uint16(callForwarderCall.length),
        callForwarderCall
    );
```

It is important to note that the call for the forwarder needs to be prepared.

## Example: 1inch meta-aggregation

Hrere we illustrate the creation of the call for a swap from `USDC` to `WETH` using 1inch.

The following steps need to be executed:

1. `callForwarder` calls
   - create approve if needed
   - create external call to router
   - sweep funds to receiver and check slippage if desired
2. `composer` calls
   - transfer funds from caller to `callForwarder`
   - execute external call through `callForwarder`

The reason why we use the forwarder is to peserve the statelessness of the composer while still allowing calls to any target without requiring whiltelists.

```Solidity

uint256 swapAmount = 4000.0e6;

// this is the default forwarder address
address callForwarderAddress = 0xfCa1154C643C32638AEe9a43eeE7f377f515c801;

// create the call for the forwarder
// the target can e.g. be the 1inch aggregation router
bytes memory callForwarderCall  = abi.encodePacked(
        uint8(ComposerCommands.EXT_CALL),
        address(oneInchAggregationRouter),
        uint128(0), // ERC20 has no value
        uint16(data.length),
        data
    );

// we need to approve the 1inch router on the callForwarder level
// note that the approval is skipped if it was already done in the past
bytes memory approve1inch = abi.encodePacked(
        uint8(ComposerCommands.TRANSFERS),
        uint8(TransferIds.APPROVE),
        address(USDC),
        address(oneInchAggregationRouter)
    );

// expect to receive 1 WETH
// revert if we receive less
uint256 amountExpected = 1.0e18;

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
bytes memory composerCall  = abi.encodePacked(
        uint8(ComposerCommands.EXT_CALL),
        callForwarderAddress, // it is important to use the forwarder on the composer level
        uint128(value),
        uint16(callForwarderCall.length),
        callForwarderCall
    );

// we need to make sure that teh callForwarder receives the funds directly
bytes memory transferToForwarder = abi.encodePacked(
        uint8(ComposerCommands.TRANSFERS),
        uint8(TransferIds.TRANSFER_FROM),
        address(USDC),
        callForwarderAddress,
        uint128(swapAmount)
    );

// combine the call to the composer
composerCall = abi.encodePacked(
        transferToForwarder,
        composerCall
    );

// execute the operations
composer.deltaCompose(composerCall);

```
