# CCTP Lite

Simplified version of CCTP as an illustration of the rough workings of the protocol.

## Simplifying Assumptions

* Single known token supported by the contract
* Contract pairs are deployed forming a communication channel
## Outline

1. Deposit for burn - transporter of token from one chain to another calls the deposit for burn on their local chain.

* Token is burned
* Burn message body is formed with context about the burn including the amount and reciever address
* Burn message is send via reserving and incrementing a nonce, creating a message that includes the burn message body, the nonce, and metadata including the destination domain, emit it as a MessageSent event.
* A DepositForBurn event is emitted with the nonce, the token, the amount, the sender, and destination metadata

2. The message bytes are retrieved from the log using the transaction hash,
looking for the MessageSend(bytes) event.

* The hash of the message bytes is calculated, this is used to retrieve the attestation signature for the transport from the trusted intermediary who
attests to the validity of the claim to be made in the remove chain

3. The attestation signature is retrieved

4. On the remote chain the receive message method is called with the attestation and the bytes

* The attestation is checked, and if good the amount of tokens specified in the message are minted and transferred to the destination address

## Building Blocks

* Marshalling and unmarshalling structs into bytes
* Verifying signatures in a contract

## Notes

What is the state of [EIP 712](https://eips.ethereum.org/EIPS/eip-712)? Does this simplify the marshalling?
