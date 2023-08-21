
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

- **Max Leverage** in pair: `l=1/(1-cfBuy); cfBuy = collateralFacor of Buy Asset`
- **Max Open Size** for pair: `mO=bC/l=bC(1-cfBuy); cfBuy = collateralFacor of Buy Asset`
- **Liquidation Price** (pair only, denomiated in collateral ccy / debt ccy): `lP=sell_USD/(buy*cFBuy); sell_USDC=sell/borrow asset amount in USD; buy=purchase amount denominated in collateral/buy currency`