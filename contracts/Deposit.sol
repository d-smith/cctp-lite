// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract Deposit {

    uint256 depositNonce;

    struct DidItCtx {
        address sender;
        uint256 nonce;
    }

    event DidIt(uint256 indexed, DidItCtx);

    function doIt() public {
        depositNonce = depositNonce + 1;
        emit DidIt(depositNonce, DidItCtx(msg.sender,depositNonce));
    }
}