// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract Transporter {
    uint32 public immutable localDomain;

    constructor(uint32 _localDomain) {
        localDomain = _localDomain;
    }
}