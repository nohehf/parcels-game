// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract ComposableEncoding {

    constructor() {
        // BUILD SHOP
        addItemToShop(11, "HUT", 1, 1, 100, 100, 1);
        addItemToShop(12, "FARM", 1, 2, 200, 200, 1);
        addItemToShop(13, "CASLE", 1, 3, 300, 300, 1);
        addItemToShop(21, "FENCE", 2, 1, 100, 100, 1);
        addItemToShop(22, "MOAT", 2, 2, 200, 200, 1);
        addItemToShop(31, "MINE", 3, 1, 100, 100, 1);
        addItemToShop(32, "PIT", 3, 2, 200, 200, 2);
    }
    
    // Item Data
    struct Item {
        uint tokenId;
        string name;
        uint kind;
        uint level;
        uint price;
        uint boost;
        uint maximum;
    }
    string[] internal itemNames;
    mapping (string => Item) internal nameToItem;

    // Internal function
    function addItemToShop(
            uint tokenId,
            string memory name,
            uint kind,
            uint level,
            uint price,
            uint boost,
            uint maximum) internal {
        itemNames.push(name);
        nameToItem[name] = Item(tokenId, name, kind, level, price, boost, maximum);
    }


    // External View function
    function itemGetNamesAll() external view returns(string[] memory){
        return itemNames;
    }
    function itemGetInfo(string memory _itemName) external view returns(Item memory) {
        return nameToItem[_itemName];
    }
}
