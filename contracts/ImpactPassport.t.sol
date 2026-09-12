// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { ImpactPassport } from "./ImpactPassport.sol";

contract ImpactPassportTest {
    ImpactPassport internal passport;

    function setUp() public {
        passport = new ImpactPassport();
    }

    function testRegister() public {
        passport.register("Alice");
        require(passport.isRegistered(address(this)), "should be registered");
    }

    function testCannotRegisterTwice() public {
        passport.register("Alice");
        (bool ok, ) = address(passport).call(
            abi.encodeWithSignature("register(string)", "Alice again")
        );
        require(!ok, "second register should revert");
    }

    function testIssueCertificate() public {
        passport.register("Alice");
        passport.issueCertificate(address(this), "Blockchain Basics");

        require(passport.certificateCount(address(this)) == 1, "1 cert expected");
        require(passport.educationPoints(address(this)) == 10, "10 points expected");
    }

    function testAttestHealth() public {
        passport.register("Alice");
        passport.attestHealth(address(this), "vaccination");

        require(passport.healthPoints(address(this)) == 5, "5 points expected");
    }

    function testCreditScoreCombinesBoth() public {
        passport.register("Alice");
        passport.issueCertificate(address(this), "Course A");   // +10
        passport.attestHealth(address(this), "checkup");         // +5

        require(passport.creditScore(address(this)) == 15, "15 combined");
    }

    function testLoanRequiresScore() public {
        passport.register("Alice");

        // No score yet — should revert
        (bool ok, ) = address(passport).call(
            abi.encodeWithSignature("requestLoan(uint256)", 1e15)
        );
        require(!ok, "loan without score should revert");
    }

    function testLoanSucceedsAfterBuildingScore() public {
        passport.register("Alice");
        passport.issueCertificate(address(this), "Course A"); // score 10
        passport.issueCertificate(address(this), "Course B"); // score 20

        uint256 limit = passport.loanLimit(address(this));
        require(limit == 20 * 1e15, "limit should be 0.02 ETH");

        passport.requestLoan(1e15); // 0.001 ETH
        require(passport.totalBorrowed(address(this)) == 1e15, "tracked");
    }

    function testRepayLoan() public {
        passport.register("Alice");
        passport.issueCertificate(address(this), "Course A");
        passport.issueCertificate(address(this), "Course B");

        passport.requestLoan(1e15);
        passport.repayLoan(1e15);

        require(passport.totalBorrowed(address(this)) == 0, "fully repaid");
    }
}