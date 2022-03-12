// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";

contract ItemToken is ERC1155PresetMinterPauser {

    constructor() ERC1155PresetMinterPauser("https://ipfs/{id}/dna}") {
        //addItemToShop(tokenId, name, kind, level, price, boost, maximum)
        addItemToShop(1, "HUT", 1, 1, 100, 100, 0);             // B.House          1_______________
        addItemToShop(2, "FARM", 1, 2, 200, 200, 0);            // B.Ferme          _1______________
        addItemToShop(3, "CASTLE", 1, 3, 300, 300, 0);          // B.Chateau        __1_____________
        addItemToShop(4, "FENCE", 2, 1, 100, 100, 1);           // C.Muraille2      ___1____________
        addItemToShop(5, "MOAT", 2, 2, 200, 200, 1);            // C.Douve          ____1___________
        addItemToShop(6, "MINE", 3, 1, 100, 100, 1);            // R.Mine           _____1__________
        addItemToShop(7, "PIT", 3, 2, 200, 200, 1);             // R.Puit           ______1_________
        addItemToShop(8, "WINDMILL", 3, 2, 200, 200, 1);        // Moulin           _______1________
        addItemToShop(9, "DEFENCE_TOWER", 3, 2, 200, 200, 1);   // Tour carré       ________1_______
        addItemToShop(10, "TENT", 3, 2, 200, 200, 1);           // D.Tente          _________1______
        addItemToShop(11, "CART", 3, 2, 200, 200, 1);           // Chariot          __________1_____
        addItemToShop(12, "CAT", 3, 2, 200, 200, 1);            // Animaux/Chat     ___________1____
        addItemToShop(13, "DOG", 3, 2, 200, 200, 1);            // Animaux/Chient   ____________1___
        addItemToShop(14, "CHICKENS", 3, 2, 200, 200, 1);       // Animaux/Poule    _____________1__
        addItemToShop(15, "ETANG", 3, 2, 200, 200, 1);          // Etang            ______________1_
        addItemToShop(16, "BENCH", 3, 2, 200, 200, 1);          // Banc             _______________1
    }

    event PlayerInventoryUpdated(address add);
    event ParcelUpdated(uint posX,uint posY);

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
        if (msg.sender==address(0)) {
            return balances;
        }
        for (uint256 index = 1; index < shopItemName.length + 1; index++) {
            balances[index - 1] = balanceOf(msg.sender, index);
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

    function safeTransferFrom(address from,address to,uint id,uint amount,bytes memory data) public override {
        super.safeTransferFrom(from,to,id,amount,data);
        emit PlayerInventoryUpdated(msg.sender);
        (uint posX,uint posY) = abi.decode(data, (uint, uint));
        emit ParcelUpdated(posX, posY);
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