// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @custom:security-contact julien@blanchon.cc
contract ItemToken is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("ItemToken", "ITM") {
        //addItemToShop(current, name, kind, level, price, boost, maximum)
        addItemToShop("HUT", 1, 1, 100, 100, 0);
        addItemToShop("FARM", 1, 2, 200, 200, 0);
        addItemToShop("CASLE", 1, 3, 300, 300, 0);
        addItemToShop("FENCE", 2, 1, 100, 100, 1);
        addItemToShop("MOAT", 2, 2, 200, 200, 1);
        addItemToShop("MINE", 3, 1, 100, 100, 1);
        addItemToShop("PIT", 3, 2, 200, 200, 2);
        //0 = only one per kind, other = n per id.
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs/{id}/dna}";
    }

    function safeMint(address to, string memory _name) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        ItemStruct memory item = nameToItem[_name];
        tokenIdToName[tokenId] = item.name;
        tokenIdToDna[tokenId] = 123;
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    ////////////////////////////////////////////////////////////
    ///////////////////// External Function ////////////////////
    ///////////////////// Token Getter View
    function getShopItemName() public view returns(string[] memory){
        return shopItemName;
    }
    
    function getItemInfo(string memory _itemName) external view returns(ItemStruct memory) {
        return nameToItem[_itemName];
    }

    function getAllItemsInfo() external view returns(ItemStruct[] memory) {
        string[] memory itemsNames = getShopItemName();
        ItemStruct[] memory memoryArray = new ItemStruct[](itemsNames.length);
        for(uint i = 0; i < itemsNames.length; i++) {
            memoryArray[i] = nameToItem[itemsNames[i]];
        }
        return memoryArray;
    }

    function getAllItemsBalances() external view returns(uint[] memory) {
        uint256[] memory balances = new uint256[](shopItemName.length);
        for (uint256 index = 1; index < shopItemName.length + 1; index++) {
            balances[index - 1] = tokenOfOwnerByIndex(msg.sender, index);
        }
        return balances;
    }

    function getItemKind(string memory _itemName) external view returns(uint) {
        return nameToItem[_itemName].kind;
    }
    function getItemLevel(string memory _itemName) external view returns(uint) {
        return nameToItem[_itemName].level;
    }
    function getItemPrice(string memory _itemName) external view returns(uint) {
        return nameToItem[_itemName].price;
    }
    function getItemBoost(string memory _itemName) external view returns(uint) {
        return nameToItem[_itemName].boost;
    }
    function getItemMaximumPolicy(string memory _itemName) external view returns(uint) {
        return nameToItem[_itemName].maximumPolicy;
    }
    function getNameListFromKind(uint _kind) external view returns(string[] memory) {
        return kindToName[_kind];
    }


    function getNameFromTokenId(uint _tokenId) public view returns(string memory) {
        return tokenIdToName[_tokenId];
    }

    function getDnaFromTokenId(uint _tokenId) public view returns(uint) {
        return tokenIdToDna[_tokenId];
    }
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    
    ////////////////////////////////////////////////////////////
    ////////////////////// Data Structure //////////////////////
    // Shop data structure
    struct ItemStruct {
        string name;
        uint kind;
        uint level;
        uint price;
        uint boost;
        uint maximumPolicy;       // 0-->unique kind, 1 (resp n) -->not unique kind, but 1 (resp n) max of each.
    }
    
    string[] private shopItemName;
    mapping (string => ItemStruct) private nameToItem;
    mapping (uint => string[]) private kindToName;
    // NFT instance data structure
    mapping (uint => string) private tokenIdToName;
    mapping (uint => uint) private tokenIdToDna;
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////
    //////////////////// Shop internal logic ///////////////////
    function addItemToShop(
            string memory name,
            uint kind,
            uint level,
            uint price,
            uint boost,
            uint maximumPolicy) private {
        shopItemName.push(name);
        kindToName[kind].push(name);
        nameToItem[name] = ItemStruct(name, kind, level, price, boost, maximumPolicy);
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    }
}
