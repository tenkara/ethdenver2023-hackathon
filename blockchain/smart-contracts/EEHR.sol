// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
contract EEHR {
    string private uuid; // obfuscated id
    string public chunk1; // obfuscated  data chunk
    address public owner; // owner of the data

    constructor(string memory _uuid, string memory _chunk1) {
        uuid = _uuid;
        chunk1 = _chunk1;
        owner = msg.sender;
    }

    function getUUID() public view onlyOwner returns (string memory) {
        return uuid;
    }

    function getChunk1() public view onlyOwner returns (string memory) {
        return chunk1;
    }

    function getOwner() public view onlyOwner returns (address) {
        return owner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }
}
