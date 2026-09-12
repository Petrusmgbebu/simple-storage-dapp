// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { SimpleStorage } from "../contracts/SimpleStorage.sol";

contract SimpleStorageTest {
    SimpleStorage internal storageContract;

    function setUp() public {
        storageContract = new SimpleStorage();
    }

    function testInitialValueIsZero() public view {
        require(storageContract.get() == 0, "initial value should be 0");
    }

    function testSetAndGet() public {
        storageContract.set(42);
        require(storageContract.get() == 42, "value should be 42");
    }

    function testOverwrite() public {
        storageContract.set(1);
        storageContract.set(99);
        require(storageContract.get() == 99, "value should be overwritten to 99");
    }
}