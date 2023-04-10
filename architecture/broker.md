# Broker Structure

The architecture for protocols that allow delegated borrowing and withdrawals is provided as follows.

In a first step, the user has to approve that the "Broker contract" can interact on their behalf. This has to be done if the user wants to execute transactions that include borrowing or withdrawals.

If this is done, the contract can be handled similar to a Uniswap-type swap router.

![Broker](../assets/broker-chart.png "Broker Architecture Chart")