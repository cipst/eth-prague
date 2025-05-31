// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {WebProofProver} from "./WebProofProver.sol";
import {Proof} from "vlayer-0.1.0/Proof.sol";
import {Verifier} from "vlayer-0.1.0/Verifier.sol";

contract WebProofVerifier is Verifier {
    address public prover;

    mapping(address => string) public balances;
    mapping(address => uint256) public balanceCreatedAt;

    constructor(address _prover) {
        prover = _prover;
    }

    function verify(Proof calldata proof, string memory balance, address account)
        public
        onlyVerified(prover, WebProofProver.main.selector)
    {
        balances[account] = balance;
        balanceCreatedAt[account] = block.timestamp;
    }
}