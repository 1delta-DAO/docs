# Money Market Functions

Functions that allow a swap aggreagated with a single money market interactions.

## Supplying to a lender

Supply functions connected with swaps.

---

**Function:** `swapAndSupplyExactIn`

This function allows the user to swap a specified amount of input tokens (tokenIn) and supply the resulting output tokens to a lending protocol.

**Parameters:**

`params` (ExactInputMultiParams memory): A struct containing parameters for the swap and supply operation.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `amountIn` (`uint256`): The exact amount of input tokens to be swapped.

**No return values**


---

**Function:** `swapETHAndSupplyExactIn`

This function allows the user to swap a specified amount of Ether for output tokens and supply the resulting tokens to a lending protocol.

**Parameters:**

`params` (ExactInputMultiParams calldata): A struct containing parameters for the swap and supply operation.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `amountIn` (`uint256`): The exact amount of Ether to be swapped.

**No return values**


---

**Function:** `swapAndSupplyExactOut`

This function allows the user to swap tokens to receive a specified amount of output tokens (tokenOut) and supply the resulting tokens to a lending protocol.

**Parameters:**

`params` (MarginSwapParamsMultiExactOut calldata): A struct containing parameters for the swap and supply operation.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `amountOut` (`uint256`): The exact amount of output tokens to be received.

- `- `interestRateMode`` (`uint256`): The interest rate mode (stable or variable) for the borrowed tokens.

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

---

**Function:** `swapETHAndSupplyExactOut`

This function allows the user to swap Ether to receive a specified amount of output tokens (tokenOut) and supply the resulting tokens to a lending protocol.

**Parameters:**

`params` (ExactOutputMultiParams calldata): A struct containing parameters for the swap and supply operation.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `amountOut` (`uint256`): The exact amount of output tokens to be received.

**Returns:** `uint256`: The amount of Ether used for the swap.

---

## Withdrawals from existing deposits

Withdrawal functions connected with swaps

---

**Function:** `withdrawAndSwapExactIn`

This function allows the user to withdraw a specified amount of input tokens (tokenIn) from a lending protocol and swap them to receive output tokens.

**Parameters:**

`params` (ExactInputParams memory): A struct containing parameters for the withdrawal and swap operation.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `amountIn` (`uint256`): The exact amount of input tokens to be withdrawn and swapped.

**Returns:** `uint256`: The amount of output tokens received from the swap.

---

**Function:** `withdrawAndSwapExactInToETH`

This function allows the user to withdraw a specified amount of input tokens (tokenIn) from a lending protocol and swap them to receive Ether.

**Parameters:**

`params` (ExactInputMultiParams memory): A struct containing parameters for the withdrawal and swap operation.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `amountIn` (`uint256`): The exact amount of input tokens to be withdrawn and swapped.

**Returns:** `uint256`: The amount of Ether received from the swap.

---

**Function:** `withdrawAndSwapExactOut`

This function allows the user to withdraw input tokens (tokenIn) from a lending protocol and swap them to receive a specified amount of output tokens (tokenOut).

**Parameters:**

`params` (MarginSwapParamsMultiExactOut calldata): A struct containing parameters for the withdrawal and swap operation.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `amountOut` (`uint256`): The exact amount of output tokens to be received.

- `interestRateMode` (`uint256`): The interest rate mode (stable or variable) for the borrowed tokens.

- `amountInMaximum` (`uint256`): The maximum amount of input tokens allowed to be withdrawn.

**Returns:** `uint256`: The amount of input tokens withdrawn for the swap.

---

**Function:** `withdrawAndSwapExactOutToETH`

This function allows the user to withdraw input tokens (tokenIn) from a lending protocol and swap them to receive a specified amount of Ether.

**Parameters:**

`params` (MarginSwapParamsMultiExactOut calldata): A struct containing parameters for the withdrawal and swap operation.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `amountOut` (`uint256`): The exact amount of Ether to be received.

- `interestRateMode` (`uint256`): The interest rate mode (stable or variable) for the borrowed tokens.

- `amountInMaximum` (`uint256`): The maximum amount of input tokens allowed to be withdrawn.

**Returns:** `uint256`: The amount of input tokens withdrawn for the swap.

### Functions withdeawing the full balances

---

**Function:** `withdrawAndSwapAllIn`

This function allows the user to withdraw their entire balance of input tokens (tokenIn) from the lending protocol and swap them for output tokens (tokenOut).

**Parameters:**

`params` (AllInputCollateralMultiParamsBaseWithRecipient calldata): A struct containing parameters for the withdraw and swap operation.
- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.
- `recipient` (`address`): The address that will receive the output tokens.
- `amountOutMinimum` (`uint256`): The minimum amount of output tokens that must be received.

**Returns:** `uint256`: The amount of output tokens received from the swap.

---

**Function:** `withdrawAndSwapAllInToETH`

This function allows the user to withdraw their entire balance of input tokens (tokenIn) from the lending protocol and swap them for Ether.

**Parameters:**

`params` (AllInputCollateralMultiParamsBaseWithRecipient calldata): A struct containing parameters for the withdraw and swap operation.
- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.
- `recipient` (`address`): The address that will receive the Ether.
- `amountOutMinimum` (`uint256`): The minimum amount of Ether that must be received.

**Returns:** `uint256`: The amount of Ether received from the swap.


## Borrowing

---

**Function:** `borrowAndSwapExactIn`

This function allows the user to borrow a specified amount of input tokens (tokenIn) and swap them to receive output tokens.

**Parameters:**

`interestRateMode` (`uint256`): The interest rate mode (stable or variable) for the borrowed tokens.

- `params` (ExactInputWithLimitParams memory): A struct containing parameters for the borrow and swap operation.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `amountIn` (`uint256`): The exact amount of input tokens to be borrowed and swapped.

- `amountOutMinimum` (`uint256`): The minimum amount of output tokens that must be received.

**Returns:** `uint256`: The amount of output tokens received from the swap.

---

**Function:** `borrowAndSwapExactInToETH`

This function allows the user to borrow a specified amount of input tokens (tokenIn) and swap them to receive Ether.

**Parameters:**

`interestRateMode` (`uint256`): The interest rate mode (stable or variable) for the borrowed tokens.

- `params` (StandaloneExactInputUniswapParams calldata): A struct containing parameters for the borrow and swap operation.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `amountIn` (`uint256`): The exact amount of input tokens to be borrowed and swapped.

- `amountOutMinimum` (`uint256`): The minimum amount of Ether that must be received.

**Returns:** `uint256`: The amount of Ether received from the swap.

---

**Function:** `borrowAndSwapExactOut`

This function allows the user to borrow input tokens (tokenIn) and swap them to receive a specified amount of output tokens (tokenOut).

**Parameters:**

`params` (MarginSwapParamsMultiExactOut memory): A struct containing parameters for the borrow and swap operation.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `amountOut` (`uint256`): The exact amount of output tokens to be received.

- `interestRateMode` (`uint256`): The interest rate mode (stable or variable) for the borrowed tokens.

- `amountInMaximum` (`uint256`): The maximum amount of input tokens allowed to be borrowed.

**Returns:** `uint256`: The amount of input tokens borrowed for the swap.

---

**Function:** `borrowAndSwapExactOutToETH`

This function allows the user to borrow input tokens (tokenIn) and swap them to receive a specified amount of Ether.

**Parameters:**

`params` (MarginSwapParamsMultiExactOut calldata): A struct containing parameters for the borrow and swap operation.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `amountOut` (`uint256`): The exact amount of Ether to be received.

- `interestRateMode` (`uint256`): The interest rate mode (stable or variable) for the borrowed tokens.

- `amountInMaximum` (`uint256`): The maximum amount of input tokens allowed to be borrowed.

**Returns:** `uint256`: The amount of input tokens borrowed for the swap.

---

## Repay

Allows the user to repay borrow balances with a lender with any currency.

---

**Function:** `swapAndRepayExactIn`

This function allows the user to swap a specified amount of input tokens (tokenIn) and repay a debt in the lending protocol.

**Parameters:**

`interestRateMode` (`uint256`): The interest rate mode (stable or variable) for the repayment.

`params` (ExactInputMultiParams calldata): A struct containing parameters for the swap and repay operation.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `amountIn` (`uint256`): The exact amount of input tokens to be swapped.

**Returns:** `uint256`: The amount of output tokens repaid to the lending protocol.

---

**Function:** `swapETHAndRepayExactIn`

This function allows the user to swap a specified amount of Ether and repay a debt in the lending protocol.

**Parameters:**

`interestRateMode` (`uint256`): The interest rate mode (stable or variable) for the repayment.

`params` (ExactInputMultiParams calldata): A struct containing parameters for the swap and repay operation.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `amountIn` (`uint256`): The exact amount of Ether to be swapped.

**Returns:** `uint256`: The amount of output tokens repaid to the lending protocol.

---

**Function:** `swapAndRepayExactOut`

This function allows the user to swap input tokens (tokenIn) to repay a specified amount of output tokens (tokenOut) to the lending protocol.

**Parameters:**

`params` (MarginSwapParamsMultiExactOut memory): A struct containing parameters for the swap and repay operation.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `amountOut` (`uint256`): The exact amount of output tokens to be repaid.

- `interestRateMode` (`uint256`): The interest rate mode (stable or variable) for the repayment.

- `amountInMaximum` (`uint256`): The maximum amount of input tokens allowed to be swapped.

**Returns:** `uint256`: The amount of input tokens swapped for the repayment.

---

**Function:** `swapETHAndRepayExactOut`

This function allows the user to swap Ether to repay a specified amount of output tokens (tokenOut) to the lending protocol.

**Parameters:**

`interestRateMode` (`uint256`): The interest rate mode (stable or variable) for the repayment.

`params` (ExactOutputMultiParams calldata): A struct containing parameters for the swap and repay operation.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `amountOut` (`uint256`): The exact amount of output tokens to be repaid.

**Returns:** `uint256`: The amount of Ether swapped for the repayment.


### Functions repaying the full loan

Repaying with these will not left any borrow dust.

---

**Function:** `swapAndRepayAllOut`

This function allows the user to swap input tokens (tokenIn) to repay their entire debt balance of output tokens (tokenOut) in the lending protocol.

**Parameters:**

`params` (AllOutputMultiParamsBase calldata): A struct containing parameters for the swap and repay operation.
- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.
- `interestRateMode` (`uint256`): The interest rate mode (stable or variable) for the repayment.
- `amountInMaximum` (`uint256`): The maximum amount of input tokens allowed to be swapped.

**Returns:** `uint256`: The amount of input tokens swapped for the repayment.

---

**Function:** `swapETHAndRepayAllOut`

This function allows the user to swap Ether to repay their entire debt balance of output tokens (tokenOut) in the lending protocol.

**Parameters:**

`params` (AllOutputMultiParamsBase calldata): A struct containing parameters for the swap and repay operation.
- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.
- `interestRateMode` (`uint256`): The interest rate mode (stable or variable) for the repayment.
- `amountInMaximum` (`uint256`): The maximum amount of Ether allowed to be swapped.

**Returns:** `uint256`: The amount of Ether swapped for the repayment.
