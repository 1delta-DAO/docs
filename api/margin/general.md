# General Margin Operations

We provide a sketch to execute general margin operations here.

## The Flow

In general, assuming the caller has existing balances with the lender, there aer two major steps, the flash loan itself and the inner call

1. We execute the flashLoan call with currency `X` and amount `x`

   - Execute the **Inner Calls**
   - swap `x` to currency `Y` and amount `y`
   - put `y` into a lender to increase the credit line (e.g. deposit or repay)
   - pull `x` from the lender (e.g. withdraw or borrow)


2. Repay the flash loan with funds `x`

## Considerations

Lending operations that take funds need **approvals** (see [Transfers](../transfers.md) section for that) and sometimes need to unwrap the flash loaned amount to native.

Lending operations that pull funds on the user's behalf need to be **permissioned** by the user.


## Operations

- [Leverage](./leverage.md)
- [Close](./close.md)
- [Collateral Swap](./collateral-swap.md)
- [Debt Swap](./debt-swap.md)
- [Postion Migration](./migration.md)