# Collateral Swap Functions


**Function:** `swapCollateralExactIn`
This function allows a user to swap collateral from one token (tokenIn) to another (tokenOut) in a single-pool trade, specifying the exact input amount.

**Parameters:**

`params` (ExactInputCollateralSingleParamsBase memory): A struct containing parameters for the single-pool trade.

`tokenIn` (`address`): The address of the input token.

`fee` (`uint24`): The fee tier of the pool to be used for the swap.

`tokenOut` (`address`): The address of the output token.

`amountIn` (`uint256`): The exact amount of input tokens to be swapped.

**Returns:** `uint256`: The amount of output tokens received from the swap.

---

**Function:** `swapCollateralExactInMulti`

This function allows a user to swap collateral from one token (tokenIn) to another (tokenOut) in a multi-pool trade, specifying the exact input amount.

**Parameters:**

`params` (ExactInputCollateralMultiParams memory): A struct containing parameters for the multi-pool trade.

`path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

`amountIn` (`uint256`): The exact amount of input tokens to be swapped.

**Returns:** `uint256`: The amount of output tokens received from the swap.

---

**Function:** `swapCollateralExactOut`
This function allows a user to swap collateral from one token (tokenIn) to another (tokenOut) in a single-pool trade, specifying the exact output amount.

**Parameters:**

`params` (ExactOutputCollateralSingleParamsBase memory): A struct containing parameters for the single-pool trade.

`tokenIn` (`address`): The address of the input token.

`fee` (`uint24`): The fee tier of the pool to be used for the swap.

`tokenOut` (`address`): The address of the output token.

`amountOut` (`uint256`): The exact amount of output tokens to be received.

`amountInMaximum` (`uint256`): The maximum amount of input tokens allowed to be swapped.

**Returns:** `uint256`: The amount of input tokens used in the swap.

---

**Function:** `swapCollateralExactOutMulti`

This function allows a user to swap collateral from one token (tokenIn) to another (tokenOut) in a multi-pool trade, specifying the exact output amount.

**Parameters:**

`params` (ExactOutputCollateralMultiParams memory): A struct containing parameters for the multi-pool trade.

`path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

`amountOut` (`uint256`): The exact amount of output tokens to be received.

`amountInMaximum` (`uint256`): The maximum amount of input tokens allowed to be swapped.

**Returns:** `uint256`: The amount of input tokens used in the swap.

---

**Function:** `swapCollateralAllIn`

This function allows a user to swap all the collateral from one token (tokenIn) to another (tokenOut) in a single-pool trade.

**Parameters:**

`params` (AllInputSingleParamsBase calldata): A struct containing parameters for the single-pool trade.

`tokenIn` (`address`): The address of the input token.

`fee` (`uint24`): The fee tier of the pool to be used for the swap.

`tokenOut` (`address`): The address of the output token.

`amountOutMinimum` (`uint256`): The minimum amount of output tokens allowed to be received.

**Returns:** `uint256`: The amount of output tokens received from the swap.

---

**Function:** `swapCollateralAllInMulti`

This function allows a user to swap all the collateral from one token (tokenIn) to another (tokenOut) in a multi-pool trade.

**Parameters:**

`params` (AllInputCollateralMultiParamsBase calldata): A struct containing parameters for the multi-pool trade.

`path` (`bytes`): A byte-encoded representation of the tokenIn, tokenOut, and fee of each pool to be used in the trade.

`amountOutMinimum` (`uint256`): The minimum amount of output tokens allowed to be received.

**Returns:** `uint256`: The amount of output tokens received from the swap.