# How to use 1delta's margin aggregator programmatically

1delta's smart contracts can be used via our Typescript SDK (which is also the one used for our UI).

It is using out asset-registry package [here](https://www.npmjs.com/package/@1delta/asset-registry).

This package contains all lender data that is needed for on-chain actions (e.g. Aave lending tokens, Venus comptrollers etc.). The SDK automatically identifies a lender via the provided enum.

## Packages

```bash
pnpm add @1delta/calldata-sdk @1delta/asset-registry
```

```Typescript
// enums for operations
import {QuickActionType, MarginTradeType} from "@1delta/calldata-sdk"
// for direct lending actions
import {ComposerDirectLending} from "@1delta/calldata-sdk"
// margin operations
import {ComposerMargin} from "@1delta/calldata-sdk"
// enums
import {Lender} from "@1delta/asset-registry"

```

## Example usage for depositing to Aave V3

Deposits assets to Aave. The caller needs to ensure that the contract has enough permissions (e.g. `token.approve(...)`)

```Typescript
// --- Configuration for chain ---
const chainId = "10"
const composer = COMPOSER_PROXIES[chainId]

// --- Asset and amount ---
// Example: deposit 1000 USDC (1e9 = 1000 * 1e6 in smallest units)
const input = 1_000_000_000n // 1e9
const depositAsset = {
  symbol: "USDC",
  name: "USDC",
  address: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
  chainId
}

// --- Caller account ---
const account = "0x..."

// --- Lender and action type ---
const lender = Lender.AAVE_V3
const action = QuickActionType.Deposit

// --- Operation parameters ---
const operation = {
  params: {
    lender,
    amount: { currency: depositAsset, amount: input }
  },
  receiver: account, // Caller deposits on their own behalf
  isAll: false,      // Only used for withdraw & repay operations
  inIsNative: false, // If true, use native asset (ETH) to deposit — operation will wrap ETH
  outIsNative: false,// If true, unwraps output (e.g. withdraw WETH and unwrap to ETH)
  composerAddress: composer,
  permitData: undefined,   // No permit used
  morphoParams: undefined, // No Morpho parameters
  useOverride: undefined   // No custom Aave fork override
}

// --- Generate calldata and value for transaction ---
const { calldata, value } = ComposerDirectLending.composeDirectMoneyMarketAction(operation)
```

## Example usage for opening a position on Aave V3

Open a position on Aave. The caller needs to ensure that the contract has enough permissions (e.g. via `debtToken.approveDelegation(...)`)

```Typescript
// Example: Opening a short position on 1 WETH using USDC as collateral

const chainId = "10"
const composer = COMPOSER_PROXIES[chainId]

// The caller's account address
const account = "0x..."

// Operation type
const marginTradeType = "Open"

// Intended input amount (in wei)
const input = 1_000_000_000_000_000_000n // 1e18

// Assets
const assetIn = {
  symbol: "WETH",
  name: "WETH",
  address: "0x4200000000000000000000000000000000000006",
  chainId
}
const assetOut = {
  symbol: "USDC",
  name: "USDC",
  address: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
  chainId
}

// Lender to use (refer to the `Lender` enum in asset-registry)
const lender = Lender.AAVE_V3

// --- Step 1: Fetch flash liquidity ---
// Example return value:
//
// [
//   {
//     "id": 0,
//     "name": "AAVE_V3",
//     "type": 2,
//     "source": "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
//     "fee": "5",
//     "availableRaw": "7742114549858607894570",
//     "available": 7742.11454985861
//   },
//   ...
// ]

const assetLiquidities = await (
  await fetch(`https://margin-data.1delta.io/flashloan-asset/10/0x4200000000000000000000000000000000000006`)
).json()

// Pick the first source (ideally choose the lowest-fee source)
const flashLoanSource = assetLiquidities[0]

// Flash loan fee is used to adjust the quote input
const flashFee = BigInt(flashLoanSource.fee)


// --- Step 2: Fetch trade ---
// With a 5 bps flash fee, we can calculate the adjusted input to borrow exactly 1 WETH:
const amendedInput = (input * 10_000n) / (10_000n + flashFee)

// Query the swap provider API
// Important: Set the receiver to the composer contract
const apiBody = { ..., amountIn: amendedInput, receiver: composer }
const apiReturn = await (
  await fetch(`https://www.quote.odos....`)
).json()

// Get calldata from the API (varies by provider)
const { calldata, target } = await (
  await fetch(`https://www.assemble.odos....`)
).json()


// --- Step 3: Prepare trade object for SDK ---

const trade: GenericTrade = {
  tradeType: 0, // exact in
  inputAmount: { currency: assetIn, amount: amendedInput },
  outputAmount: { currency: assetOut, amount: apiReturn.output }, // Output amount is unused in calldata
  target, // Call target
  approvalTarget: target, // Usually same as call target, may differ for some aggregators
  // Set to `true` if `apiBody` does not allow specifying a receiver
  sweepToReceiver: false,
}

const externalCall = {
  target,
  calldata,
  value: "0", // Default (only used for native asset as input)
  useSelfbalance: false,
  callForwarder: FORWARDER
}

const marginData = {
  marginTradeType,
  // STABLE is disabled for most Aave forks
  irModeIn: AaveInterestMode.VARIABLE,
  // Unused
  irModeOut: AaveInterestMode.NONE,
  lender,
  morphoParams: undefined, // No Morpho execution
  permitData: undefined // No permits in this example
}

// This returns a bytes string for the 1delta composer
const composerOperation = ComposerMargin.createMarginFlashLoan({
  trade,
  externalCall,
  marginData,
  maxIn: false, // Default (only for non-open operations)
  maxOut: false, // Default (only for non-open operations)
  composerOverride: composer, // Composer address
  flashInfoOverride: flashLoanSource // Flash loan source info
})


// Note: Any composer operation can be prepended, e.g.:
//
// This is the calldata for the composer.
// For example, `ComposerDirectLending.composeDirectMoneyMarketAction(...)`
// could be used to generate a deposit calldata set, which can then be prepended:
//
// const depositAndOpen = encodePacked(
//   ["bytes", "bytes"],
//   [depositCalldata, composerOperation]
// )

const contractCall = encodeFunctionData({
  abi: composerAbi,
  functionName: "deltaCompose",
  args: [composerOperation]
})

```
