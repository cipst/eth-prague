// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {WebProofProver} from "./WebProofProver.sol";
import {Proof} from "vlayer-0.1.0/Proof.sol";
import {Verifier} from "vlayer-0.1.0/Verifier.sol";

contract WebProofVerifier is Verifier {
    address public prover;

    mapping(address => uint256) public balances;

    constructor(address _prover) {
        prover = _prover;
    }

    function verify(Proof calldata proof, address account, uint256 balance)
        public
        onlyVerified(prover, WebProofProver.main.selector)
    {
        balances[account] = balance;
    }
}