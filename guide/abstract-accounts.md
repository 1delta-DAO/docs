# How to create and use 1delta abstract accounts

We will describe how to use 1delta to trade on top of a lending protocol.

## Create an account

To begin trading, you will need to create a 1Delta account. The account provides you with flexibility, control and is very cheap to create — only minor gas fees are incurred.

![Account Creation](../assets/account-create.png "Create Account!")

## Deposit collateral

Once the account is created, you can deposit funds to the lending protocol. If you do not currently own the token you want to deposit, you can also swap and then supply in the same transaction using a Uniswap-style interface:


![Swap In](../assets/swap-in-account.png "Swap In!")

## Open a margin position - Borrow, Swap and Supply in a single Click

It is now time to trade on margin. With your deposited collateral you can now use the full capacity of your borrowing power. The following screenshot shows an indication of a positionn increase where WETH is borrowed and sold for USDC - which is directly deposited. All the relevant risk parameters are shown, in the scenario, the user sees a warning that the account will get close to liquidation after execution.

![Open](../assets/margin-trade-account.png "Trade on margin!")

## Close a margin postion - Withdraw, Swap and Repay in a single Click

If our health factor gets very low, the manual withdraw-swap-repay cycle would lead to a significant hassle when trying to unwind the position, all while 1Delta executes the interactions in a single transaction:

![Close](../assets/close-account.png "Trade on margin!")
*Our health factor is immediately restored if we trim the full position by selecting the maximum output amount on the right hand side. The dApp will also make sure that there is no dust left.*

We can see that the health factor jumps up and the LTV drops to zero. On top of that, 1delta's implementation prevents dust if you pick the maximum amount for closing a position.