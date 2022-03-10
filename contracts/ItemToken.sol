// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";

contract ItemToken is ERC1155PresetMinterPauser {

    constructor() ERC1155PresetMinterPauser("https://ipfs/{id}/dna}") {
        //addItemToShop(tokenId, name, kind, level, price, boost, maximum)
        addItemToShop(1, "HUT", 1, 1, 100, 100, 0);
        addItemToShop(2, "FARM", 1, 2, 200, 200, 0);
        addItemToShop(3, "CASLE", 1, 3, 300, 300, 0);
        addItemToShop(4, "FENCE", 2, 1, 100, 100, 1);
        addItemToShop(5, "MOAT", 2, 2, 200, 200, 1);
        addItemToShop(6, "MINE", 3, 1, 100, 100, 1);
        addItemToShop(7, "PIT", 3, 2, 200, 200, 2);
        //0 = only one per kind, other = n per id.
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
    function getNameToTokenId(uint _tokenId) external view returns(string memory) {
        return tokenIdToName[_tokenId];
    }
    function getIdListFromKind(uint _kind) external view returns(uint[] memory) {
        return kindToIds[_kind];
    }
    function getIdMaximumPolicy(uint _tokenId) external view returns(uint) {
        return nameToItem[tokenIdToName[_tokenId]].maximumPolicy;
    }
    function mint(address to, uint256 id, uint256 amount, bytes memory data) public override {
        super.mint(to, id, amount, data);
    }
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    
    ////////////////////////////////////////////////////////////
    ////////////////////// Data Structure //////////////////////
    struct ItemStruct {
        uint tokenId;
        string name;
        uint kind;
        uint level;
        uint price;
        uint boost;
        uint maximumPolicy;       // 0-->unique kind, 1 (resp n) -->not unique kind, but 1 (resp n) max of each.
    }
    
    string[] private shopItemName;
    mapping (string => ItemStruct) private nameToItem;
    mapping (uint => string) private tokenIdToName;
    mapping (uint => uint[]) private kindToIds;
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////
    //////////////////// Shop internal logic ///////////////////
    function addItemToShop(
            uint tokenId,
            string memory name,
            uint kind,
            uint level,
            uint price,
            uint boost,
            uint maximumPolicy) private {
        shopItemName.push(name);
        tokenIdToName[tokenId] = name;
        kindToIds[kind].push(tokenId);
        nameToItem[name] = ItemStruct(tokenId, name, kind, level, price, boost, maximumPolicy);
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    }
}