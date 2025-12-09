# CallForwarder
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\generic\CallForwarder.sol)

**Inherits:**
[Transfers](\contract-ref\1delta\composer\transfers\Transfers.sol\contract.Transfers.md), [ExternalCallsGeneric](\contract-ref\1delta\composer\generic\ExternalCallsGeneric.sol\abstract.ExternalCallsGeneric.md), [BridgeForwarder](\contract-ref\1delta\composer\generic\bridges\BridgeForwarder.sol\contract.BridgeForwarder.md), [ERC721Receiver](\contract-ref\1delta\composer\generic\ERC721Receiver.sol\abstract.ERC721Receiver.md)

An arbitrary call contract to forward generic calls
Does pull funds if desired
One transfers funds to this contract and operates with them, ideally pre-funded
All composer transfer options are available (approve,transferFrom,transfer,native transfers)
Can generically call any target and checks if the selector for these calls is not `transferFrom`
We assume that this contract is never an approve target!


## Functions
### receive


```solidity
receive() external payable;
```

### deltaForwardCompose

A selector different to the classic Composer
Should be called by a more universal composer
that cannot call arbitrary selectors.


```solidity
function deltaForwardCompose(bytes calldata) external payable;
```

### _deltaComposeInternal


```solidity
function _deltaComposeInternal(
    address callerAddress,
    uint256 currentOffset,
    uint256 endOffset
)
    internal
    virtual
    override(ExternalCallsGeneric);
```

