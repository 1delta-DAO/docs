# Borrow Swap Functions

**Function:** `swapBorrowExactIn`

This function allows a user to execute a swap on Uniswap V3 to borrow an exact amount of tokens in a single-pool trade, adjusting for the interest rate mode.

**Parameters:**

`params` (ExactInputSingleParamsBase memory): A struct containing parameters for the single-pool trade.

- `tokenIn` (address): The address of the input token.

- `fee` (uint24): The fee tier of the pool to be used for the swap.

- `tokenOut` (address): The address of the output token.

- `interestRateMode` (`uint256`): The encoded interest rate mode, where the first digit represents the "from" interest rate and the second digit represents the "to" interest rate.

- `amountIn` (`uint256`): The exact amount of input tokens to be swapped.

**Returns:** `uint256`: The amount of output tokens received from the swap.

---

**Function:** `swapBorrowExactInMulti`

This function allows a user to execute a swap on Uniswap V3 to borrow an exact amount of tokens in a multi-pool trade, adjusting for the interest rate mode.

**Parameters:**

`params` (ExactInputMultiParams memory): A struct containing parameters for the multi-pool trade.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `interestRateMode` (`uint256`): The encoded interest rate mode, where the first digit represents the "from" interest rate and the second digit represents the "to" interest rate.

- `amountIn` (`uint256`): The exact amount of input tokens to be swapped.

- `amountOutMinimum` (`uint256`): The minimum amount of output tokens expected to be received from the swap. If the output is lower, the transaction will revert.

**Returns:** `uint256`: The amount of output tokens received from the swap.

---

**Function:** `swapBorrowExactOut`

This function allows a user to execute a swap on Uniswap V3 to borrow an exact amount of tokens in a single-pool trade while specifying the maximum amount of input tokens, adjusting for the interest rate mode.

**Parameters:**

`params` (ExactOutputSingleParamsBase memory): A struct containing parameters for the single-pool trade.

- `tokenIn` (address): The address of the input token.

- `fee` (uint24): The fee tier of the pool to be used for the swap.

- `tokenOut` (address): The address of the output token.

- `interestRateMode` (`uint256`): The encoded interest rate mode, where the first digit represents the "from" interest rate and the second digit represents the "to" interest rate.

- `amountOut` (`uint256`): The exact amount of output tokens expected to be received from the swap.

- `amountInMaximum` (`uint256`): The maximum amount of input tokens allowed to be swapped.

**Returns:** `uint256`: The amount of input tokens used in the swap.

---

**Function:** `swapBorrowExactOutMulti`

This function allows a user to execute a swap on Uniswap V3 to borrow an exact amount of tokens in a multi-pool trade while specifying the maximum amount of input tokens, adjusting for the interest rate mode.

**Parameters:**

`params` (ExactOutputMultiParams memory): A struct containing parameters for the multi-pool trade.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `interestRateMode` (`uint256`): The encoded interest rate mode, where the first digit represents the "from" interest rate and the second digit represents the "to" interest rate.

- `amountOut` (`uint256`): The exact amount of output tokens expected to be received from the swap.

- `amountInMaximum` (`uint256`): The maximum amount of input tokens allowed to be swapped.

**Returns:** `uint256`: The amount of input tokens used in the swap.

---

**Function:** `swapBorrowAllOut`

This function allows a user to execute a swap on Uniswap V3 to borrow the full amount of tokens required to repay a debt in a single-pool trade while specifying the maximum amount of input tokens, adjusting for the interest rate mode.

**Parameters:**

`params` (MarginSwapParamsAllOut calldata): A struct containing parameters for the single-pool trade.

- `tokenIn` (`address`): The address of the input token.

- `fee` (`uint24`): The fee tier of the pool to be used for the swap.

- `tokenOut` (`address`): The address of the output token.

- `interestRateMode` (`uint256`): The encoded interest rate mode, where the first digit represents the "from" interest rate and the second digit represents the "to" interest rate.

- `amountInMaximum` (`uint256`): The maximum amount of input tokens allowed to be swapped.

**Returns:** `uint256`: The amount of input tokens used in the swap.

---

**Function:** `swapBorrowAllOutMulti`

This function allows a user to execute a swap on Uniswap V3 to borrow the full amount of tokens required to repay a debt in a multi-pool trade while specifying the maximum amount of input tokens, adjusting for the interest rate mode.

**Parameters:**

`params` (AllOutputMultiParamsBase calldata): A struct containing parameters for the multi-pool trade.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `interestRateMode` (`uint256`): The encoded interest rate mode, where the first digit represents the "from" interest rate and the second digit represents the "to" interest rate.

- `amountInMaximum` (`uint256`): The maximum amount of input tokens allowed to be swapped.

**Returns:** `uint256`: The amount of input tokens used in the swap.