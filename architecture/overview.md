# How is 1delta Built?

Generally, lending protocols fall into two categories when trying to compose trades with them. First, we have protocols that allow a user to *delegate* borrows and withdrawals. This means that a user can approve that another contract can borrow using their collateral or withdraw collateral from their balances directly. This is very similar to the conventional ERC20 approval mechanism that allows this exact mechanic for regular transfers.

This architecture allows an external contract to aggregate the position on the user's behalf - meaning that the contract can directly operate on the user's balance.

**Compound V3, Venus.io and AAVE V3 are protocols in this category.**

On the other hand, we have protocols that *do not allow this type of delegation*. In this case, users can create abstract account that will build the positions on their behalf. These abstract accounts are smart contracts that can only be operated by the user that created them.

**Compound V2 and most forks fall into this category.**


* [Delegation Architecture](delegation.md)
* [Abstract Account Architecture](abstract-accounts.md)



