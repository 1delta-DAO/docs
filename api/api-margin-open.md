# Open Margin Position


**Function:** `openMarginPositionExactIn`

This function allows a user to open a margin position by borrowing a token (tokenIn) and selling it against collateral (tokenOut). The user provides the debt amount as input.

**Parameters:**

`params` (MarginSwapParamsExactIn memory): A struct containing parameters for opening the margin position.

- `tokenIn` (address): The address of the input token to borrow.

- `fee` (uint24): The fee tier of the pool to be used for the swap.

- `tokenOut` (address): The address of the output token (collateral).

- `amountIn` (uint256): The amount of input tokens to borrow.

- - `interestRateMode` (uint256): The interest rate mode (stable or variable) for the borrowed tokens.

- `amountOutMinimum` (uint256): The minimum amount of output tokens (collateral) allowed to be received.

**Returns:** `uint256`: The amount of output tokens (collateral) received from the swap.

---

**Function:** `openMarginPositionExactOut`

This function allows a user to open a margin position by borrowing a token (tokenIn) and selling it against collateral (tokenOut). The user provides the collateral amount as input.

**Parameters:**

`params` (MarginSwapParamsExactOut memory): A struct containing parameters for opening the margin position.

- `tokenIn` (`address`): The address of the input token to borrow.

- `fee` (`uint24`): The fee tier of the pool to be used for the swap.

- `tokenOut` (`address`): The address of the output token (collateral).

- `amountOut` (`uint256`): The amount of output tokens (collateral) to receive.

- `interestRateMode` (`uint256`): The interest rate mode (stable or variable) for the borrowed tokens.

- `amountInMaximum` (`uint256`): The maximum amount of input tokens allowed to be borrowed.

**Returns:** `uint256`: The amount of input tokens (borrowed) used for the swap.

---

**Function:** `openMarginPositionExactInMulti`

This function allows a user to open a margin position by borrowing a token (tokenIn) and selling it against collateral (tokenOut) using a multi-pool path. The user provides the debt amount as input.

**Parameters:**

`params` (MarginSwapParamsMultiExactIn memory): A struct containing parameters for opening the margin position.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `amountIn` (`uint256`): The amount of input tokens to borrow.

- - `interestRateMode` (`uint256`): The interest rate mode (stable or variable) for the borrowed tokens.

- `amountOutMinimum` (`uint256`): The minimum amount of output tokens (collateral) allowed to be received.

**Returns:** `uint256`: The amount of output tokens (collateral) received from the swap.

---

**Function:** `openMarginPositionExactOutMulti`

This function allows a user to open a margin position by borrowing a token (tokenIn) and selling it against collateral (tokenOut) using a multi-pool path. The user provides the collateral amount as input.

****Parameters:****

`params` (MarginSwapParamsMultiExactOut memory): A struct containing parameters for opening the margin position.

- `path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

- `amountOut` (`uint256`): The amount of output tokens (collateral) to receive.

- `interestRateMode` (`uint256`): The interest rate mode (stable or variable) for the borrowed tokens.

- `amountInMaximum` (`uint256`): The maximum amount of input tokens allowed to be borrowed.

**Returns:** `uint256`: The amount of input tokens (borrowed) used for the swap.