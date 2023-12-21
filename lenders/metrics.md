
# Lending Metrics

## General Parameters

All lenders define inone or another form the following parameters:

<p align="center">
  <img src="../assets/formulas/definitions-lenders.svg" />
</p>

## Risk Metrics

The collateral parameters and heath factor are calculated in the following manner:

<p align="center">
  <img src="../assets/formulas/simple-params-lenders.svg" />
</p>

An account is flagged for liquidation if the **health factor** is below 1.

### Liquidation Price

Liquidation prices in return are indicators as to how much a single asset price can move until an account get liquidated. 

The **liquidation price for a long asset** can be calculated as follows:

<p align="center">
  <img src="../assets/formulas/liquidation-price-long.svg" />
</p>


Dividing the last amount by the collateral amount in question yields the liquidation price:

<p align="center">
  <img src="../assets/formulas/liq-price-long-final.svg" />
</p>

For a **short asset**, we decompose the debt:

<p align="center">
  <img src="../assets/formulas/liquidation-price-short.svg" />
</p>


Dividing the last amount by the debt amount in question yields the liquidation price:

<p align="center">
  <img src="../assets/formulas/liq-price-short-final.svg" />
</p>

#### Special cases

Generally, the liquidation price in a specific asset assumes that the prices of all *other* assets are frozen. Certain lenders, however, allow borrowing and collateralizing the same asset at the same time. These lenders are Aave V3, Lendle, Compound V2 and all respective forks.

For this case, we cannot use the conventional liquidation price, since for a long position with a borrow position of less than the collateral, the liquidation risk in this specific asset is non-existent.

## Leverage

The leverage is a good measure for exposure. It can be provided on an overall basis or just in the ontext of a single asset.

<p align="center">
  <img src="../assets/formulas/exposure-params.svg" />
</p>


The **overall leverage** is just the quotient of collateral and debt. The **maximum leverage** for a single asset is calculated using the collateral factor of the collateral asset. 

<p align="center">
  <img src="../assets/formulas/leverage.svg" />
</p>

It is important to note that in this case, the maximum leverage for a single asset is dependent on the collateral asset only. As such, measuring the leverage for the short asset only depends on the collateral used (in this case, it is usually a stablecoin).

Certain lenders like Euler Finance use borrow factors to weight borrow positions differently, too.

