# How is 1delta Built?

Generally, lending protocols fall into two categories when trying to compose trades with them. First, we have protocols that allow a user to *delegate* borrows and withdrawals. This means that a user can approve that another contract can borrow using their collateral or withdraw collateral from their balances directly. This is very similar to the conventional ERC20 approval mechanism that allows this exact mechanic for regular transfers.

This architecture allows an external contract to aggregate the position on the user's behalf - meaning that the contract can directly operate on the user's balance.

**Compound V3, Venus.io, Aave V3 and Morpho Blue are protocols in this category.**
