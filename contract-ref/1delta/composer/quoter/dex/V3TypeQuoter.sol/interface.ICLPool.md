# ICLPool
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\quoter\dex\V3TypeQuoter.sol)


## Functions
### swap


```solidity
function swap(
    address recipient,
    bool zeroForOne,
    int256 amountSpecified,
    uint160 sqrtPriceLimitX96,
    bytes calldata data
)
    external
    returns (int256 amount0, int256 amount1);
```

### swapY2X

IZUMI


```solidity
function swapY2X(
    // exact in swap token1 to 0
    address recipient,
    uint128 amount,
    int24 highPt,
    bytes calldata data
)
    external
    returns (uint256 amountX, uint256 amountY);
```

### swapX2Y


```solidity
function swapX2Y(
    // exact in swap token0 to 1
    address recipient,
    uint128 amount,
    int24 lowPt,
    bytes calldata data
)
    external
    returns (uint256 amountX, uint256 amountY);
```

