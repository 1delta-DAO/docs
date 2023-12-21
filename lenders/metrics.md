
# Lending Metrics

This section dives into the parameters that lenders use to manage their protocol. The following parameters are used by most of them, including Compound V2 & V3, Aave V1, V2 & V3 and all forks of them.

## General Parameters

All lenders define in one or another form the following parameters:

<p align="center">
  <img src="../assets/formulas/definitions-lenders.svg" />
</p>

Note that the liquidation collateral factors are usually higher than the borrow collateral factors. Lenders in general allow opening positions at maximum LTV equal to the borrow-adjusted collateral.

## Risk Metrics

The collateral parameters and heath factor are calculated in the following manner:

<p align="center">
  <img src="../assets/formulas/simple-params-lenders.svg" />
</p>

An account is flagged for liquidation if the **health factor** is below 1.

### Liquidation Price

Liquidation prices in return are indicators as to how much a single asset price can move until an account get liquidated. 

This is done by setting the health factor to one and solving for the USD amount of the desired asset.

The **liquidation price for a long asset** (indeed with *k*) can be calculated via assuming that the USD amount of asset *k* is dependent on all other given parameters as follows:

<p align="center">
  <img src="../assets/formulas/liquidation-price-long.svg" />
</p>


Dividing the last amount by the collateral amount in question yields the liquidation price for a long position in asset *k*:

<p align="center">
  <img src="../assets/formulas/liq-price-long-final.svg" />
</p>

For a **short asset**, we decompose the debt:

<p align="center">
  <img src="../assets/formulas/liquidation-price-short.svg" />
</p>


Dividing the last amount by the debt amount in question yields the liquidation price for the short position in asset *k*:

<p align="center">
  <img src="../assets/formulas/liq-price-short-final.svg" stroke='red' fill='red' color='red'/>
</p>

#### Same-asset positions

Generally, the liquidation price in a specific asset assumes that the prices of all *other* assets are frozen. Certain lenders, however, allow borrowing and collateralizing the same asset at the same time. These lenders are Aave V3, Lendle, Compound V2 and all respective forks.

For this case, we cannot use the conventional liquidation price, since for a long position with a borrow position of less than the collateral, the liquidation risk in this specific asset is non-existent.

Generally, there are two cases for liquidation prices of asset *k*, in both we calculate the net exposure in the asset and apply it to the liquidation price:

##### The collateral in the asset is *higher* than the debt
- **Long liquidation price**: For this case, we have to net the exposure in the single asset. In this case, we reduce all amounts by the debt amounts.
<p align="center">
  <img src="../assets/formulas/liquidation-price-long-special.svg" />
</p>
- **Short liquidation price**: *Infinity*, since there is no liquidation risk. 

##### The collateral in the asset is *lower* than the debt
- **Long liquidation price**: *Zero*, there is no long liquidation risk in this asset.
- **Short liquidation price**: For this case, we also have to net the exposure in the single asset. This means that we use the conventional liquidation price and reduce all amounts by the respective collatreral amount.
<p align="center">
  <img src="../assets/formulas/liquidation-price-short-special.svg" />
</p>


## Leverage

The leverage is a good measure for exposure. It can be provided on an overall basis or just in the context of a single asset.

<p align="center">
  <img src="../assets/formulas/exposure-params.svg" />
</p>


The **overall leverage** is just the quotient of collateral and debt. The **maximum leverage** for a single asset is calculated using the collateral factor of the collateral asset. 

<p align="center">
  <img src="../assets/formulas/leverage.svg" />
</p>

It is important to note that in this case, the maximum leverage for a single asset is dependent on the collateral assetn and its **borrow collateral factor** only. As such, measuring the leverage for the short asset only depends on the collateral used (in this case, it is usually a stablecoin).

Certain lenders like Euler Finance use borrow factors to weight borrow positions differently, too.

