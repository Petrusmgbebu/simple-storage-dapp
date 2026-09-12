// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 storedData;

    // Function to set the value
    function set(uint256 x) public {
        storedData = x;
    }

    // Function to get the value
    function get() public view returns (uint256) {
        return storedData;
    }
}