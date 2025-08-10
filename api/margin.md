# Margin Operations

Margin operations include
- Collateral swap
- Debt swap
- Open (Borrow & Deposit)
- Close (Withdraw & Repay)

## Architecture

Typically one needs flash loans to execute these operations.

For swaps, one should use external aggregators. We assume that the external aggregator data is provided as
- calldata `bytes memory` - the calldata, typically provided by an API
- target `address` - the call target address, e.g. the Odos Router
- value `uint128` - the `msg.value` (typically `0`)