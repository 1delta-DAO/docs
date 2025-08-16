# Furhter Examples

The Leverage, Close, Collateral and Debt Swap options only scratch the surface of varieties of operations that can be executed with our stack. We will cover - sketch-wise - a few additional ones that we deem useful.

## Postion migration

Postion migrations are a series of actions where a leverage postion is moved from one lender pool to another one - without a swap.

Let us assume we want to migrate an Aave V3 position to a Compound V3 positon.

### Strategy

The execution is a mixture of a leverage and close operation.

We have to

- Take out a flash loan with the debt asset of the Aave V3 position
    - Repay the Aave V3 debt
    - Withdraw the Aave V3 collateral
    - Deposit the received collateral to Compound V3
    - Borrow enough from Compound V3 to cover the debt amount
- Repay the flash laon with the received funds
- Refund leftover dust

### Considerations

The borrow-repay process will leave dust as we have to to pick a fixed flash loan amount that is larger than the Aave V3 debt to enure everythiong is repaid.

To be able to repay the flashoan in whole, we need to borrow the Aave V3 debt plus some margin.

Anything left has to be refunded.