// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract Parcel is Ownable, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter internal _tokenIds;

    function parcelGetCurrentId() public view returns(uint) {
        return _tokenIds.current();
    }

    //constructor for an ERC721 is a name and symbol
    constructor () ERC721("PARCEL", "Parcel NFT"){
        _tokenIds.increment();
    }

    //// Board default config ////
    // Constant config
    uint constant baseLevel = 1; // Base level
    // Mutable config
    uint maxX = 10;     // Board default Weight
    uint maxY = 10;     // Board default Height
    uint initialProductionRate = 10;  // Board initial production rate
    
    //// Board change config ////
    // Board change Weight
    // function changeMaxX(uint _newMaxX) external onlyOwner {
    //     maxX = _newMaxX;
    // }
    // Board change Height
    // function changeMaxY(uint _newMaxY) external onlyOwner {
    //     maxY = _newMaxY;
    // }
    // Board change initialProductionRate
    // function changeInitialProductionRate(uint _newInitialProductionRate) external onlyOwner {
    //     initialProductionRate = _newInitialProductionRate;
    // }

    //// Board logic ////
    // Parcel struct object
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
        uint level;                     //Parcel level `2`
        uint lastClaimTime;             //Parcel lastClaimTime : 12h
        uint productionRate;            //Parcel production_rate : $10Res/timestamp
    }
    // Parcel public ledger: map
    mapping (uint => mapping(uint => ParcelStruct)) public Board;
    // Board mapping list
    mapping (uint => uint[2]) public idToPos;
    mapping (uint => mapping(uint => uint)) public posToId;

    // Board require function (use modifier ?)
    function isLegit(uint _posX, uint _posY) internal view returns (bool) {
        return (_posX<=maxX) && (_posY<=maxY);
    }
    function isAvailable(uint _posX, uint _posY) internal view returns (bool) {
        return !_exists(posToId[_posX][_posY]);
    }
    function _isApprovedOrOwner(address _spender, uint _posX, uint _posY) internal view returns (bool) {
        return _isApprovedOrOwner(_spender, posToId[_posX][_posY]);
    }

    // Private Parcel mint function
    function _mintParcel(uint _posX, uint _posY, string memory _name) internal {
        require(isLegit(_posX, _posY), "Parcel: Mint position overflow");
        require(isAvailable(_posX, _posY), "Parcel: Mint position not available");
        uint newItemId = _tokenIds.current();
        uint dna = uint(keccak256(abi.encodePacked(_name))); // dna <-> name
        uint lastClaimTime = uint(block.timestamp);
        Board[_posX][_posY] = ParcelStruct(_posX,                  //posX
                                           _posY,                  //posY
                                           newItemId,              //tokenId
                                           _name,                  //name
                                           dna,                    //dna
                                           baseLevel,              //level
                                           lastClaimTime,          //lastClaimTime
                                           initialProductionRate   //production_rate
                );
        posToId[_posX][_posY] = newItemId;
        idToPos[newItemId] = [_posX, _posY];
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, "https://ipf_link/{id}_23982390");
        _tokenIds.increment();
    }

    // Public Parcel mint function
    function publicMintParcel(uint _posX, uint _posY, string memory _name) public {
        _mintParcel(_posX, _posY, _name);
    }


}