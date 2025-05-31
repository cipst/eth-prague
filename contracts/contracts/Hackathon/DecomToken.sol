// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import {OftERC4626} from "./OftERC4626.sol";

contract DecomToken is OftERC4626 {    
    constructor(address _lzEndpoint, address _delegate, address _asset)
        OftERC4626("Decom Token", "DCMT", _lzEndpoint, _delegate, 1e18, _asset)
    {}
}
