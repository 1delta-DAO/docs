---
layout: home
title: How To Use 1delta
---

# How To Use 1delta

1delta has a unique approach to margin trading. Our initial version combines the simplicity of a lending protocol interface with well versed swap interfaces that will help you with building any position with the lender.


## Selecting a Trade

To be able to trade on margin, similar to most brokers, you have to deposit collateral first.

This can be done through multiple channels - You can either do it directly with the lender (by using their own UI), or just click the "Deposit" button in the main panel. If you already have collateral with the lender, this step is skipped.

![Deposit](../assets/general/panel-deposit.png "Clicking on the button will trigger a modal that allows you to deposit assets with the lender!")

The following overview illustrates the configurations you can set up with the main trade panel.

![Trading](../assets/general/panel-explainer.png "The panel allows you to select a proper configuration for your trade")

The selections map to the trade types as follows.
- **Single Collateral Position:** Swap and deposit or withdraw and swap.
- **Single Debt Position:** Borrow and swap or swap and repay.
- **Two Collateral Positions:** Swap collateral positions.
- **Two Debt Positions:** Swap debt positions.
- **One Collateral and one Debt Positions:** Open a margin position (Borrow, swap and supply) or close one (withdraw collateral, swap and repay debt)

## Lender-Dependent Mechanics

Dependent on which lender you want to trade with, the mechanics can vary

### [Via UI](frontend.md)
### [Programmatically](programmatically.md)
