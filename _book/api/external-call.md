# External calls in teh composer contracts

To provide the caller with full flexibility, we allow them to call any arbitrary target indirectly via a `callForwarder` contract that has the onl entrypoint function `deltaForwardCompose(bytes)`

The `composer` contract can call **arbitrary targets** with that fixed selector, whereas the `callForwarder` can call **any target** whith **any selector** (there are exceptions like the `permit2` address and `transferFrom` selector) 

To facilitate an external call with `data` on `target`, one needs to 
- pull caller funds (directly to `callForwarder`)
- execute `ComposerCommands.EXT_CALL` with the parameters on the `callForwarder` on the `composer` where the operation forwarded is also `ComposerCommands.EXT_CALL` with the provided data and target

While this approach seems to be inefficient, it is necessary to prevent malicious callers to execute bad calldata on the `composer` contract (e.g. trying to execute `transferFrom` from a prior caller that approved the `composer`)