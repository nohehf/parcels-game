// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./ParcelFarming.sol";
import "./ComposableEncoding.sol";
import "@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";


contract ParcelComposable is ParcelFarming, ComposableEncoding { //, ERC1155Holder {
    // TODO onERC1155Received logic ...
    // function onERC1155Received(address, address, uint256, uint256, bytes memory) public virtual override returns (bytes4) {
    //     return this.onERC1155Received.selector;
    // }

    //Deploy function for the Item Token contract
    function _deployItemContract() internal returns(ItemToken newContract) {
        ItemToken itemContract = new ItemToken();
        return itemContract;
    }

    ItemToken public itemContractAddress;

    constructor() {
        itemContractAddress = _deployItemContract();
    }

    // Internal function
    function _mintItem(uint _tokenId) internal {
        itemContractAddress.mint(msg.sender, _tokenId, 1, "");
    }

    // External function
    function itemBuy(string memory _name) external {
        Item memory item = nameToItem[_name];
        _burnRewardToken(item.price);
        _mintItem(item.tokenId);
    }

    function testTransfert(uint _tokenId) external {
        itemContractAddress.safeTransferFrom(msg.sender, address(this), _tokenId, 1, "");
    }

    // External view
    function itemShowBalance(uint _tokenId) external view returns(uint) {
        return itemContractAddress.balanceOf(msg.sender, _tokenId);
    }

    function itemGetContract() public view returns(ItemToken) {
        return itemContractAddress;
    }
}

contract ItemToken is ERC1155PresetMinterPauser {
    constructor() ERC1155PresetMinterPauser("https://ipfs/{id}/dna}") {}
}