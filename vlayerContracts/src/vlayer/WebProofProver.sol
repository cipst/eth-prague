// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Proof} from "vlayer-0.1.0/Proof.sol";
import {Prover} from "vlayer-0.1.0/Prover.sol";
import {Web, WebProof, WebProofLib, WebLib} from "vlayer-0.1.0/WebProof.sol";

contract WebProofProver is Prover {
    using WebProofLib for WebProof;
    using WebLib for Web;

    string public constant DATA_URL =
        "https://www.binance.com/bapi/asset/v2/private/asset-service/wallet/balance?quoteAsset=BTC&needBalanceDetail=true&needEuFuture=true";

    function main(WebProof calldata webProof, address account)
        public
        view
        returns (Proof memory, string memory, address)
    {
        Web memory web = webProof.verify(DATA_URL);

        string memory balance = web.jsonGetString("data[0].balance");

        return (proof(), balance, account);
    }
}
