# 1delta contract entrypoiny

Our smart contract has a single call entrypoint for external calls.

`deltaCompose(bytes)` is the trigger to call a batch operation in our composer contracts.

Aside of approval & entry flags, the contract is stateless.

The `deltaCompose` function consumes byte-encoded operations that are sequentially executed.

The operations themselves are categorized via human-readable enum values as follows

```Typescript
enum ComposerCommands {
    SWAPS; // swap paths
    EXT_CALL; // external calls (`deltaForwardCompose`)
    EXT_TRY_CALL; // external call with fallback (callForwarder only)
    LENDING; // any lending operation (deposit, borrow, withdraw, repay)
    TRANSFERS; // pulling, sending and approving
    PERMIT; // execute token or lender permit
    FLASH_LOAN; // execute flash loans on common targets
    ERC4626; // vault operations
    GEN_2025_SINGELTONS; // balancer V3 and Uniswap V4 operations
    BRIDGING; // bridge execution (callForwarder only)
}
```

To create an operation `OPERATION` with that has e.g. the following parameters

| Offset | Length (bytes) | Description          |
| ------ | -------------- | -------------------- |
| 0      | 20             | underlying `address` |
| 20     | 16             | amount `uint128`     |
| 36     | 20             | receiver `address`   |
| 56     | 20             | comet `address`      |

the caller has to encode it as follows:

```Solidity

bytes memory operation = abi.encodePacked(
    uint8(ComposerCommands.[OPERATION]),
    address(underlying),
    uint128(amount),
    address(receiver),
    address(comet)
)

composer.deltaCompose(operation);
```

It is designed so that the caller can always append any sort of operations.

```Solidity

bytes memory operation = abi.encodePacked(
    operation0, // (as bytes memory) add another operation to the start
    uint8(ComposerCommands.[OPERATION]), // then just continue the next one
    address(underlying),
    uint128(amount),
    address(receiver),
    address(comet)
)

composer.deltaCompose(operation);
```
