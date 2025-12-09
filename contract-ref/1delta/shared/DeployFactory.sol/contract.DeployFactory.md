# DeployFactory
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\shared\DeployFactory.sol)

Minimalistic deploy factory, based on Openzeppelin's library


## Functions
### deploy

Deploys a contract using `CREATE2`. The address where the contract
will be deployed can be known in advance via [computeAddress](/contracts\1delta\shared\DeployFactory.sol\contract.DeployFactory.md#computeaddress).
The bytecode for a contract can be obtained from Solidity with
`type(contractName).creationCode`.
Requirements:
- `bytecode` must not be empty.
- `salt` must have not been used for `bytecode` already.
- the factory must have a balance of at least `amount`.


```solidity
function deploy(bytes32 salt, bytes memory bytecode) external returns (address addr);
```

### computeAddress

Returns the address where a contract will be stored if deployed via [deploy](/contracts\1delta\shared\DeployFactory.sol\contract.DeployFactory.md#deploy). Any change in the
`bytecodeHash` or `salt` will result in a new destination address.


```solidity
function computeAddress(bytes32 salt, bytes32 bytecodeHash) external view returns (address);
```

### computeAddress

Returns the address where a contract will be stored if deployed via [deploy](/contracts\1delta\shared\DeployFactory.sol\contract.DeployFactory.md#deploy) from a contract located at
`deployer`. If `deployer` is this contract's address, returns the same value as [computeAddress](/contracts\1delta\shared\DeployFactory.sol\contract.DeployFactory.md#computeaddress).


```solidity
function computeAddress(bytes32 salt, bytes32 bytecodeHash, address deployer) internal pure returns (address addr);
```

