// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

interface IOftERC4626 {
    event TransferShares(address indexed from, address indexed to, uint256 value);

    function assetsToShares(uint256 _amount) external view returns (uint256);

    function sharesToAssets(uint256 _shares) external view returns (uint256);

    function sharesOf(address account) external view returns (uint256);

    function totalShares() external view returns (uint256);

    function setExchangeRate(uint256 _exchangeRate) external;

    function transferShares(address _recipient, uint256 _sharesAmount) external returns (uint256);

    function approveShares(address spender, uint256 value) external returns (bool);

    function transferSharesFrom(address _sender, address _recipient, uint256 _sharesAmount) external returns (uint256);
}
