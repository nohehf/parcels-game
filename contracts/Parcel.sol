// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";


import "./RewardToken.sol";
import "./ItemToken.sol";

contract Parcel is Ownable, ERC721, ERC721Enumerable, ERC721URIStorage, ERC1155Holder {
    using Counters for Counters.Counter;
    
    Counters.Counter internal _ParcelTokenIds;
    RewardToken internal rewardContractAddress;
    ItemToken internal itemContractAddress;

    constructor () ERC721("PARCEL", "Parcel NFT"){
        // ParcelTokenIds counters, start at 1 (to differentiate between 0==null).
        _ParcelTokenIds.increment();
        // Deploy Reward ERC20 Token Contract --> Parcels is MinterPauser of RewardToken
        rewardContractAddress = _deployRewardContract();
        // Deploy Item ERC1155 Token Contract --> Parcels is ERC11Holder of ItemToken
        itemContractAddress = _deployItemContract();
    }

    ////////////////////////////////////////////////////////////
    /////////////////////// Public Data ////////////////////////
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////
    ///////////////// External|Public Function /////////////////
    //////////////////// Parcel Minting
    // Mint new Parcel
    function parcelMint(uint _posX, uint _posY, string memory _name) external {
        _mintParcel(_posX, _posY, _name);
    }
    //////////////////// Parcel Getter View
    // Get Parcel Name
    function getName(uint _posX, uint _posY) external view returns(string memory) {
        require(_exists(posToId[_posX][_posY]), "ParcelHelper: this parcel don't exist yet");
        return Board[_posX][_posY].name;
    }
    // Get Parcel DNA
    function getDna(uint _posX, uint _posY) external view returns(uint) {
        require(_exists(posToId[_posX][_posY]), "ParcelHelper: this parcel don't exist yet");
        return Board[_posX][_posY].dna;
    }
    // Get Parcel LastClaimTime
    function getLastClaimTime(uint _posX, uint _posY) external view returns(uint) {
        require(_exists(posToId[_posX][_posY]), "ParcelHelper: this parcel don't exist yet");
        return Board[_posX][_posY].lastClaimTime;
    }
    // Get Parcel ProductionRate
    function getProductionRate(uint _posX, uint _posY) external view returns(uint) {
        require(_exists(posToId[_posX][_posY]), "ParcelHelper: this parcel don't exist yet");
        return Board[_posX][_posY].productionRate;
    }
    // Get Parcel AllData
    function getAllData(uint _posX, uint _posY) external view returns(ParcelStruct memory) {
        require(_exists(posToId[_posX][_posY]), "LandHelper: this parcel don't exist yet");
        return Board[_posX][_posY];
    }
    // Get parcelPosition to parcelTokenID
    function getIdFromPos(uint _posX, uint _posY) public view returns(uint) {
        require(_exists(posToId[_posX][_posY]), "LandHelper: this parcel don't exist yet");
        return posToId[_posX][_posY];
    }
    // Get parcelTokenID to parcelPosition
    function getPosFromId(uint _tokenId) external view returns(uint[2] memory) {
        require(_exists(_tokenId), "LandHelper: this tokenId don't exist yet");
        return idToPos[_tokenId];
    }
    // Get Claimable Reward Amount 
    function getClaimableAmount (uint _posX, uint _posY) external view returns(uint){
        require(_exists(posToId[_posX][_posY]), "ParcelFarming: this tokenId don't exist yet");
        ParcelStruct storage parcelStruct = Board[_posX][_posY];
        uint delta_t = block.timestamp - parcelStruct.lastClaimTime;
        uint reward_to_mint = parcelStruct.productionRate*delta_t;
        return reward_to_mint;
    }
    // Get Reward balance
    function getBalance() external view returns(uint) {
        return rewardContractAddress.balanceOf(msg.sender);
    }
    //////////////////// Parcel Setter
    // Set Parcel Name
    function setName(uint _posX, uint _posY, string calldata _newName) external {
        require(_isApprovedOrOwner(msg.sender, posToId[_posX][_posY]), "ParcelHelper: msg.sender must be approved or owner");
        uint newDna = uint(keccak256(abi.encodePacked(_newName)));
        Board[_posX][_posY].name = _newName;
        Board[_posX][_posY].dna = newDna; //update dna
    }
    //////////////////// Parcel Claim Reward
    // Claim Pending Reward
    function rewardClaim(uint _posX, uint _posY) external {
        require(_exists(posToId[_posX][_posY]), "ParcelFarming: this tokenId don't exist yet");
        require(_isApprovedOrOwner(msg.sender, posToId[_posX][_posY]), "ParcelHelper: msg.sender must be approved or owner");
        ParcelStruct storage parcelStruct = Board[_posX][_posY];
        uint delta_t = block.timestamp - parcelStruct.lastClaimTime;
        uint reward_to_mint = parcelStruct.productionRate*delta_t;
        rewardContractAddress.mint(msg.sender, reward_to_mint);
        _resetClaimTime(parcelStruct);
    }
    //////////////////// Item 
     function itemBuy(string memory _name) external {
        ItemToken.ItemStruct memory item = itemContractAddress.getItemInfo(_name);
        require(item.price!=0, "This item doesn't exist yet");
        _burnRewardToken(item.price);
        _mintItem(item.tokenId);
    }

    function testTransfert(uint _tokenId, uint _destinationPosX, uint _destinationPosY) external {
        itemContractAddress.safeTransferFrom(msg.sender, address(this), _tokenId, 1, abi.encode(_destinationPosX, _destinationPosY));
    }

    function itemShowBalance(uint _tokenId) external view returns(uint) {
        return itemContractAddress.balanceOf(msg.sender, _tokenId);
    }
    
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    
    ////////////////////////////////////////////////////////////
    ////////////////////// Data Structure //////////////////////
    struct ParcelStruct {
        // fixed, user logic
        uint posX;                      //Parcel posX  `8`
        uint posY;                      //Parcel posY  `8`
        // fixed, contract logic
        uint tokenId;
        // mutable, user logic
        string name;                    //Parcel name `my_super_parcel`
        // mutable, contract logic
        uint dna;                       //Parcel dna `22_22`
        uint lastClaimTime;             //Parcel lastClaimTime : 1646771741 timestamp
        uint productionRate;            //Parcel production_rate : $10Res/timestamp
    }
    mapping (uint => mapping(uint => ParcelStruct)) internal Board;
    mapping (uint => uint[2]) internal idToPos;
    mapping (uint => mapping(uint => uint)) internal posToId;

    mapping (uint => mapping(uint => mapping(uint => uint))) public itemQuantity;
    // posX, posY, tokenId, itemQuantity
    mapping (uint => mapping (uint => mapping(uint => uint))) private KindQuantity;
    // posX, posY, kind, kindQuantity
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////
    ////////////////////////// Config //////////////////////////
    uint maxX = 10;                     // Default Weight
    uint maxY = 10;                     // Default Height
    uint initialProductionRate = 100;    // Initial ProductionRate
    uint maxProductionRate = 9990;      // Max ProductionRate

    //// Administration (onlyOwner) function
    function changeMaxX(uint _newMaxX) external onlyOwner {
        maxX = _newMaxX;
    }
    function changeMaxY(uint _newMaxY) external onlyOwner {
        maxY = _newMaxY;
    }
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    
    ////////////////////////////////////////////////////////////
    ///////////////////////// Modifier /////////////////////////
    function _isLegit(uint _posX, uint _posY) internal view returns (bool) {
        return (_posX<=maxX) && (_posY<=maxY);
    }
    function _isAvailable(uint _posX, uint _posY) internal view returns (bool) {
        return !_exists(posToId[_posX][_posY]);
    }
    function _isApprovedOrOwner(address _spender, uint _posX, uint _posY) internal view returns (bool) {
        return _isApprovedOrOwner(_spender, posToId[_posX][_posY]);
    }
    function _isItemMaximumPolicyRespected(uint _posX, uint _posY, uint _kind, uint _tokenId) internal view returns (bool) {
        uint itemQuantity_ = _getItemQuantity(_posX, _posY, _tokenId);
        uint kindQuantity = _getKindQuantity(_posX, _posY, _kind);
        uint itemQuota = _getItemQuota(_tokenId);
        if (itemQuota == 0) {
            return (kindQuantity==0);
        } else {
            return (itemQuantity_<itemQuota);
        }
    }
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    
    ////////////////////////////////////////////////////////////
    /////////////////// Parcel Minting Logic ///////////////////
    function _mintParcel(uint _posX, uint _posY, string memory _name) internal {
        require(_isLegit(_posX, _posY), "Parcel: Mint position overflow");
        require(_isAvailable(_posX, _posY), "Parcel: Mint position not available");
        uint newItemId = _ParcelTokenIds.current();
        uint dna = uint(keccak256(abi.encodePacked(_name))); // dna <-> name
        uint lastClaimTime = uint(block.timestamp);
        Board[_posX][_posY] = ParcelStruct(_posX,                  //posX
                                           _posY,                  //posY
                                           newItemId,              //tokenId
                                           _name,                  //name
                                           dna,                    //dna
                                           lastClaimTime,          //lastClaimTime
                                           initialProductionRate   //production_rate
                );
        posToId[_posX][_posY] = newItemId;
        idToPos[newItemId] = [_posX, _posY];
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, "https://ipf_link/{id}_{composable_ids}");
        _ParcelTokenIds.increment();
    }
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////
    /////////////// Contract Deployment Function ///////////////
    function _deployRewardContract() internal returns(RewardToken newContract) {
        RewardToken rewardContract = new RewardToken();
        return rewardContract;
    }
    function _deployItemContract() internal returns(ItemToken newContract) {
        ItemToken itemContract = new ItemToken();
        return itemContract;
    }
    function rewardGetContract() public view returns(RewardToken) {
        return rewardContractAddress;
    }
    function itemGetContract() public view returns(ItemToken) {
        return itemContractAddress;
    }
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    
    
    ////////////////////////////////////////////////////////////
    //////////////// Parcel Claim Internal Logic ///////////////
    function _resetClaimTime(ParcelStruct storage _parcelStruct) private {
        _parcelStruct.lastClaimTime = uint32(block.timestamp);
    }
    function _burnRewardToken(uint _ammount) private {
        rewardContractAddress.burnFrom(msg.sender, _ammount);
    }
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    
    ////////////////////////////////////////////////////////////
    /////////////////////////// Utils //////////////////////////
    // Fix overriding issue
    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable, ERC1155Receiver) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    // Encode bytes to uint ??? abi.encode ,, abi.decode ??
    function bytesToUint(bytes memory b) public pure returns (uint256){
        uint256 number;
        for(uint i=0;i<b.length;i++){
            number = number + uint(uint8(b[i]))*(2**(8*(b.length-(i+1))));
        }
        return number;
    }
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////
    //////////////////// Item Internal Logic ///////////////////
    function _mintItem(uint _tokenId) internal {
        itemContractAddress.mint(msg.sender, _tokenId, 1, "");
    }

    function _getItemQuantity(uint _posX, uint _posY, uint _tokenId) public view returns(uint) {
        return itemQuantity[_posX][_posY][_tokenId];
    }

    function _getKindQuantity(uint _posX, uint _posY, uint _kindId) private view returns(uint) {
        return KindQuantity[_posX][_posY][_kindId];
    }

    function _getItemQuota(uint _tokenId) private view returns(uint) {
        string memory tokenName = itemContractAddress.getNameToTokenId(_tokenId);
        uint maximumPolicy = itemContractAddress.getItemMaximumPolicy(tokenName);
        return maximumPolicy;
    }

    function onERC1155Received(address operator, address from, uint256 id, uint256 value, bytes memory data) public override returns (bytes4) {
        require(msg.sender==address(itemContractAddress), "Must be a ItemToken ERC1155");
        uint posX;
        uint posY;
        (posX, posY) = abi.decode(data, (uint, uint));
        ItemToken.ItemStruct memory item = itemContractAddress.getItemInfo(itemContractAddress.getNameToTokenId(id));
        require(from==ownerOf(getIdFromPos(posX, posY)), "You must be the owner of this land");
        require(_isItemMaximumPolicyRespected(posX, posY, item.kind, item.tokenId), "Not enough space on this land");
        itemQuantity[posX][posY][item.tokenId]++;
        KindQuantity[posX][posY][item.kind]++;    
        return bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"));
    }
    
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////


}