# Close Margin Position

---

**Function:** `trimMarginPositionExactIn`

This function allows the user to decrease their margin position by using collateral (tokenIn) to repay a portion of their borrowed tokens (tokenOut). The user provides the amount of collateral to be used as input.

**Parameters:**

`params` (MarginSwapParamsExactIn memory): A struct containing parameters for decreasing the margin position.


- `tokenIn` (`address`): The address of the collateral token.

- `tokenOut` (`address`): The address of the borrowed token.

- `fee` (`uint24`): The Uniswap pool fee.

- `amountIn` (`uint256`): The amount of collateral tokens to use.

- `interestRateMode` (`uint256`): The interest rate mode (stable or variable) for the borrowed tokens.

- `amountOutMinimum` (`uint256`): The minimum amount of borrowed tokens to be repaid.

**Returns:** `uint256`: The amount of borrowed tokens repaid.

---

**Function:** `trimMarginPositionExactOut`

This function allows the user to decrease their margin position by using collateral (tokenIn) to repay a portion of their borrowed tokens (tokenOut). The user provides the amount of borrowed tokens to be repaid as input.

**Parameters:**

`params` (MarginSwapParamsExactOut memory): A struct containing parameters for decreasing the margin position.

- `tokenIn` (`address`): The address of the collateral token.

- `tokenOut` (`address`): The address of the borrowed token.

- `fee` (`uint24`): The Uniswap pool fee.

- `amountOut` (`uint256`): The amount of borrowed tokens to be repaid.

- `interestRateMode` (`uint256`): The interest rate mode (stable or variable) for the borrowed tokens.

- `amountInMaximum` (`uint256`): The maximum amount of collateral tokens allowed to be used.

**Returns:** `uint256`: The amount of collateral tokens used for the swap.

---

**Function:** `trimMarginPositionExactInMulti`

This function allows the user to decrease their margin position by using collateral (tokenIn) to repay a portion of their borrowed tokens (tokenOut) using a multi-pool path. The user provides the amount of collateral to be used as input.

**Parameters:**

`params` (MarginSwapParamsMultiExactIn memory): A struct containing parameters for decreasing the margin position.

- `path` (bytes): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `amountIn` (`uint256`): The amount of collateral tokens to use.

- `interestRateMode` (`uint256`): The interest rate mode (stable or variable) for the borrowed tokens.

- `amountOutMinimum` (`uint256`): The minimum amount of borrowed tokens to be repaid.

**Returns:** `uint256`: The amount of borrowed tokens repaid.

---

**Function:** `trimMarginPositionExactOutMulti`

This function allows the user to decrease their margin position by using collateral (tokenIn) to repay a portion of their borrowed tokens (tokenOut) using a multi-pool path. The user provides the amount of borrowed tokens to be repaid as input.

**Parameters:**

`params` (MarginSwapParamsMultiExactOut memory): A struct containing parameters for decreasing the margin position.

- `path` (bytes): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `amountOut` (`uint256`): The amount of borrowed tokens to be repaid.

- `interestRateMode` (`uint256`): The interest rate mode (stable or variable) for the borrowed tokens.

- `amountInMaximum` (`uint256`): The maximum amount of collateral tokens allowed to be used.

**Returns:** `uint256`: The amount of collateral tokens used for the swap.

---

**Function:** `trimMarginPositionAllIn`

This function allows the user to decrease their margin position by using all available collateral (tokenIn) to repay a portion of their borrowed tokens (tokenOut).

**Parameters:**

`params` (MarginSwapParamsAllIn calldata): A struct containing parameters for decreasing the margin position.

- `tokenIn` (`address`): The address of the collateral token.

- `tokenOut` (`address`): The address of the borrowed token.

- `fee` (`uint24`): The Uniswap pool fee.

- `interestRateMode` (`uint256`): The interest rate mode (stable or variable) for the borrowed tokens.

- `amountOutMinimum` (`uint256`): The minimum amount of borrowed tokens to be repaid.

**Returns:** `uint256`: The amount of borrowed tokens repaid.

---

**Function:** `trimMarginPositionAllOut`

This function allows the user to decrease their margin position by using collateral (tokenIn) to repay all of their borrowed tokens (tokenOut).

**Parameters:**

`params` (MarginSwapParamsAllOut calldata): A struct containing parameters for decreasing the margin position.

- `tokenIn` (`address`): The address of the collateral token.

- `tokenOut` (`address`): The address of the borrowed token.

- `fee` (`uint24`): The Uniswap pool fee.

- `interestRateMode` (`uint256`): The interest rate mode (stable or variable) for the borrowed tokens.

- `amountInMaximum` (`uint256`): The maximum amount of collateral tokens allowed to be used.

**Returns:** `uint256`: The amount of collateral tokens used for the swap.


---

**Function:** `trimMarginPositionAllInMulti`

This function allows the user to decrease their margin position by using all available collateral (tokenIn) to repay a portion of their borrowed tokens (tokenOut) using a multi-pool path.

**Parameters:**

`params` (AllInputMultiParamsBase calldata): A struct containing parameters for decreasing the margin position.

- `path` (bytes): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `interestRateMode` (`uint256`): The interest rate mode (stable or variable) for the borrowed tokens.

- `amountOutMinimum` (`uint256`): The minimum amount of borrowed tokens to be repaid.

**Returns:** `uint256`: The amount of borrowed tokens repaid.

---

**Function:** `trimMarginPositionAllOutMulti`

This function allows the user to decrease their margin position by using collateral (tokenIn) to repay all of their borrowed tokens (tokenOut) using a multi-pool path.

**Parameters:**

`params` (AllOutputMultiParamsBase calldata): A struct containing parameters for decreasing the margin position.

- `path` (bytes): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `interestRateMode` (`uint256`): The interest rate mode (stable or variable) for the borrowed tokens.

- `amountInMaximum` (`uint256`): The maximum amount of collateral tokens allowed to be used.

**Returns:** `uint256`: The amount of collateral tokens used for the swap.