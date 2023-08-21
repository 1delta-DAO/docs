
# Lending Metrics

## General Parameters

- Collateral `c`: The $ amount of deposits a trader owns
- Debt `d`: The $ amount borrowed from the lender
- Collateral factor `cF`: Determines how much borrow capacity a trader has when depositing an asset. Also described as Liquidation Threshold
- Discounted Collateral: `dC = sum of cF*(deposits in asset) for all assets`
- Borrow Capacity `bC=dC-d`: The $ amount a trader can borrow
- Account Liquidation Threshold: `lT=dC/c`

## Risk Metrics

- **Health Factor**: `hF=dC/d`, if lower than 1, the account can be liquidated
- **LTV**: `ltv=c/d`

## Derived Values

- **Max Leverage** in pair: `l=1/(1-cfOut); cfOut = collateralFacor of Buy Asset`
- **Max Open Size** for pair: `mO=bC/l=bC(1-cfOut); cfOut = collateralFacor of Buy Asset`
- **Liquidation Price** (pair only, denomiated in collateral ccy / debt ccy): `lP=d_a_USD/(c_a*cF); d_a_USDC=sell asset amount in USD; c_a=buy amount denominated in collateral/buy currency`