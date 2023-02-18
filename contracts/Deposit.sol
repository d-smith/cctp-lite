// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract Deposit {
    event DidIt(address);

    function doIt() public {
        emit DidIt(msg.sender);
    }
}