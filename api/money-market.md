# Money Market Functions

Functions that allow a swap aggreagated with a single money market interactions.

## Supplying to a lender


---

**Function:** `swapAndSupplyExactIn`

This function allows the user to swap a specified amount of input tokens (tokenIn) and supply the resulting output tokens to a lending protocol.

**Parameters:**

`params` (ExactInputMultiParams memory): A struct containing parameters for the swap and supply operation.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `amountIn` (`uint256`): The exact amount of input tokens to be swapped.

No return values


---

**Function:** `swapETHAndSupplyExactIn`

This function allows the user to swap a specified amount of Ether for output tokens and supply the resulting tokens to a lending protocol.

**Parameters:**

`params` (ExactInputMultiParams calldata): A struct containing parameters for the swap and supply operation.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `amountIn` (`uint256`): The exact amount of Ether to be swapped.

No return values


---

**Function:** `swapAndSupplyExactOut`

This function allows the user to swap tokens to receive a specified amount of output tokens (tokenOut) and supply the resulting tokens to a lending protocol.

**Parameters:**

`params` (MarginSwapParamsMultiExactOut calldata): A struct containing parameters for the swap and supply operation.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `amountOut` (`uint256`): The exact amount of output tokens to be received.

- `interestRateMode` (`uint256`): The interest rate mode (stable or variable) for the borrowed tokens.

- `amountInMaximum` (`uint256`): The maximum amount of input tokens allowed to be used.

**Returns:** `uint256`: The amount of input tokens used for the swap.

---

**Function:** `swapETHAndSupplyExactOut`

This function allows the user to swap Ether to receive a specified amount of output tokens (tokenOut) and supply the resulting tokens to a lending protocol.

**Parameters:**

`params` (ExactOutputMultiParams calldata): A struct containing parameters for the swap and supply operation.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `amountOut` (`uint256`): The exact amount of output tokens to be received.

**Returns:** `uint256`: The amount of Ether used for the swap.

## Withdrawals

## Borrowing

## Repay