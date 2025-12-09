# IStargate
[Git Source](https://github.com/1delta-DAO/contracts-delegation/blob/9b965ed48187540d9e40eade64641964f3e13765/contracts/1delta\composer\generic\bridges\StargateV2\IStargate.sol)


## Functions
### token


```solidity
function token() external view returns (address);
```

### sendToken


```solidity
function sendToken(
    SendParam calldata _sendParam,
    MessagingFee calldata _fee,
    address _refundAddress
)
    external
    payable
    returns (MessagingReceipt memory msgReceipt, OFTReceipt memory oftReceipt, Ticket memory ticket);
```

### send


```solidity
function send(
    SendParam calldata _sendParam,
    MessagingFee calldata _fee,
    address _refundAddress
)
    external
    payable
    returns (MessagingReceipt memory, OFTReceipt memory);
```

### quoteSend


```solidity
function quoteSend(SendParam calldata _sendParam, bool _payInLzToken) external view returns (MessagingFee memory);
```

### quoteOFT


```solidity
function quoteOFT(SendParam calldata _sendParam)
    external
    view
    returns (OFTLimit memory, OFTFeeDetail[] memory oftFeeDetails, OFTReceipt memory);
```

## Structs
### SendParam

```solidity
struct SendParam {
    uint32 dstEid;
    bytes32 to;
    uint256 amountLD;
    uint256 minAmountLD;
    bytes extraOptions;
    bytes composeMsg;
    bytes oftCmd;
}
```

### OFTReceipt

```solidity
struct OFTReceipt {
    uint256 amountSentLD; // Amount sent in local decimals
    uint256 amountReceivedLD; // Amount to be received in local decimals
}
```

### MessagingFee

```solidity
struct MessagingFee {
    uint256 nativeFee; // Fee in native token
    uint256 lzTokenFee; // Fee in LZ token
}
```

### MessagingReceipt

```solidity
struct MessagingReceipt {
    bytes32 guid;
    uint64 nonce;
    MessagingFee fee;
}
```

### OFTLimit

```solidity
struct OFTLimit {
    uint256 minAmountLD; // Minimum amount for transfer
    uint256 maxAmountLD; // Maximum amount for transfer
}
```

### OFTFeeDetail

```solidity
struct OFTFeeDetail {
    int256 amount; // Fee amount (negative for fee, positive for reward)
    string description; // Description of the fee
}
```

### Ticket

```solidity
struct Ticket {
    uint72 ticketId; // ID for bus ticket
    bytes passengerBytes; // Passenger data
}
```

