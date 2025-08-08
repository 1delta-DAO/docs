# How to use 1delta's margin aggregator programmatically

1delta's smart contracts can be used via our Typescript SDK (which is also the one used for our UI).

It is using out asset-registry package [here](https://www.npmjs.com/package/@1delta/asset-registry).

This package contains all lender data that is needed for on-chain actions (e.g. Aave lending tokens, Venus comptrollers etc.). The SDK automatically identifies a lender via the provided enum.
