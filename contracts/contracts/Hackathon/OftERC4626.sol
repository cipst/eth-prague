// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Ownable2Step} from "@openzeppelin/contracts/access/Ownable2Step.sol";
import {OFT} from "@layerzerolabs/oft-evm/contracts/OFT.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import {OFTMsgCodec} from "@layerzerolabs/oft-evm/contracts/libs/OFTMsgCodec.sol";
import {IOftERC4626} from "./IOftERC4626.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

abstract contract OftERC4626 is OFT, IOftERC4626, Ownable2Step {
    using Math for uint256;
    using OFTMsgCodec for bytes; // what is it?
    using OFTMsgCodec for bytes32; // what is it?

    address public oftRouter; // where can I find the router? What's the router?

    uint256 public constant PRECISION = 1e18;
    uint256 public exchangeRate;       
    uint256 public lastUpdate;
    address public asset;
    // This value is chosen by the BOD when the fundraising starts, for this test we leave it hardcoded here
    uint256 public pricePerShare = 10;

    mapping(address account => uint256) private _shares;
    uint256 private _totalShares;

    constructor(
        string memory _name,
        string memory _symbol,
        address _lzEndpoint,
        address _delegate,
        uint256 _initRate,
        address _asset
    ) OFT(_name, _symbol, _lzEndpoint, _delegate) Ownable(_delegate) {
        asset = _asset;
        _mint(address(this), 100 * 10 ** 18);
    }

    modifier onlyOftRouter() {
        require(msg.sender == oftRouter, "Only oft router");
        _;
    }

    /**
        This function is open by the BOD when the private sale is over.
        For simplicity sakes we leave it open immediately
     */
    function deposit(uint256 _asset) public returns(uint256) {
        uint256 shares = _asset / pricePerShare; 
        SafeERC20.safeTransferFrom(IERC20(asset), msg.sender, address(this), _asset);
        SafeERC20.safeTransfer(IERC20(asset), msg.sender, _asset);
        return shares;
    }

    function setOftRouter(address _oftRouter) public onlyOwner {
        oftRouter = _oftRouter;
    }

    // total supply as asset
    function totalSupply() public view virtual override returns (uint256) {
        return sharesToAssets(_totalShares);
    }

    function totalShares() external view returns (uint256) {
        return _totalShares;
    }

    // assets owned by an account (converted from internal shares)
    function balanceOf(address account) public view virtual override returns (uint256) {
        uint256 _accountShares = _shares[account];
        return sharesToAssets(_accountShares);
    }

    // shares owned by an account
    function sharesOf(address account) public view virtual returns (uint256) {
        return _shares[account];
    }

    function assetsToShares(uint256 amount) public view virtual returns (uint256) {
        return amount.mulDiv(PRECISION, exchangeRate, Math.Rounding.Floor);
    }

    function sharesToAssets(uint256 amount) public view virtual returns (uint256) {
        return amount.mulDiv(exchangeRate, PRECISION, Math.Rounding.Ceil);
    }

    /**
     * mints oft, amount in shares
     * @param to receiver of tokens
     * @param sharesAmount amount of shares
     */
    function mintShares(address to, uint256 sharesAmount) public onlyOftRouter {
        _mint(to, sharesAmount);
    }

    /**
     * burns oft, amount in shares
     * @param from sender of tokens
     * @param sharesAmount amount of shares
     */
    function burnShares(address from, uint256 sharesAmount) public onlyOftRouter {
        _burn(from, sharesAmount);
    }

    function transferShares(address _recipient, uint256 _sharesAmount) public virtual returns (uint256) {
        uint256 _assets = sharesToAssets(_sharesAmount);
        _transferShares(msg.sender, _recipient, _sharesAmount, _assets);
        return _assets;
    }

    function approveShares(address spender, uint256 value) public virtual returns (bool) {
        address owner = _msgSender();
        uint256 _assets = sharesToAssets(value);
        _approve(owner, spender, _assets);
        return true;
    }

    function transferSharesFrom(address _sender, address _recipient, uint256 _sharesAmount)
        public
        virtual
        returns (uint256)
    {
        uint256 _assets = sharesToAssets(_sharesAmount);
        _spendAllowance(_sender, msg.sender, _assets);
        _transferShares(_sender, _recipient, _sharesAmount, _assets);
        return _assets;
    }

    function _update(address from, address to, uint256 value) internal virtual override {
        // if minting or burning, assume call is passing in shares
        // value represents shares
        if (from == address(0) || to == address(0)) {
            _update(from, to, value, sharesToAssets(value));
        } else {
            // transfer: for an inputted asset, convert to shares here
            // transferFrom: for an inputted asset, convert to shares here
            // value represents assets
            _update(from, to, assetsToShares(value), value);
        }
    }

    function _update(address from, address to, uint256 shares, uint256 assets) internal {
        if (from == address(0)) {
            // Overflow check required: The rest of the code assumes that totalSupply never overflows
            _totalShares += shares;
        } else {
            uint256 _userShares = _shares[from];
            if (_userShares < shares) {
                revert ERC20InsufficientBalance(from, sharesToAssets(_userShares), sharesToAssets(shares)); // todo: consider updating exception thrown
            }
            unchecked {
                // Overflow not possible: value <= fromBalance <= totalSupply.
                _shares[from] = _userShares - shares;
            }
        }

        if (to == address(0)) {
            unchecked {
                // Overflow not possible: value <= totalSupply or value <= fromBalance <= totalSupply.
                _totalShares -= shares;
            }
        } else {
            unchecked {
                // Overflow not possible: balance + value is at most totalSupply, which we know fits into a uint256.
                _shares[to] += shares;
            }
        }

        // emit both Transfer and TransferShares events
        emit Transfer(from, to, assets);
        emit TransferShares(from, to, shares);
    }

    function _transferShares(address from, address to, uint256 shares, uint256 assets) internal {
        if (from == address(0)) {
            revert ERC20InvalidSender(address(0));
        }
        if (to == address(0)) {
            revert ERC20InvalidReceiver(address(0));
        }
        _update(from, to, shares, assets);
    }

    function _setExchangeRate(uint256 _exchangeRate) internal virtual {
        exchangeRate = _exchangeRate;
        lastUpdate = block.timestamp;
    }

    /**
     * updates synthetic exchange rate
     * @param _exchangeRate new exchange rate
     */
    function setExchangeRate(uint256 _exchangeRate) public onlyOftRouter {
        _setExchangeRate(_exchangeRate);
    }

    function _transferOwnership(address newOwner) internal virtual override(Ownable2Step, Ownable) {
        Ownable2Step._transferOwnership(newOwner);
    }

    function transferOwnership(address newOwner) public virtual override(Ownable2Step, Ownable) onlyOwner {
        Ownable2Step.transferOwnership(newOwner);
    }
}
