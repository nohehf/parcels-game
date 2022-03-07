// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract Land is Ownable, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    //constructor for an ERC721 is a name and symbol
    constructor () ERC721("Land", "Land Parcel"){
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
    function changeMaxX(uint _newMaxX) external onlyOwner {
        maxX = _newMaxX;
    }
    // Board change Height
    function changeMaxY(uint _newMaxY) external onlyOwner {
        maxY = _newMaxY;
    }
    // Board change initialProductionRate
    function changeInitialProductionRate(uint _newInitialProductionRate) external onlyOwner {
        initialProductionRate = _newInitialProductionRate;
    }

    //// Board logic ////
    // Land struct object
    struct LandStruct {
        // fixed, user logic
        uint posX;                      //Land posX  `8`
        uint posY;                      //Land posY  `8`
        // mutable, user logic
        string name;                    //Land name `my_super_land`
        // mutable, contract logic
        uint dna;                       //Land dna `22_22`
        uint level;                     //Land level `2`
        uint lastClaimTime;             //Land lastClaimTime : 12h
        uint productionRate;           //Land production_rate : $10Res/timestamp
    }
    // Land public ledger: map
    LandStruct[] public Map;
    // Board mapping list
    mapping (uint => mapping(uint => uint)) public posToId;            //pos to id mapping
    function get_tokenId(uint posX, uint posY) public view returns (uint) {   //pos to id view function
        return posToId[posX][posY];
    }

    // Board require function (use modifier ?)
    function isLegit(uint _posX, uint _posY) public view returns (bool) {
        return (_posX<=maxX) && (_posY<=maxY);
    }
    function isAvailable(uint _posX, uint _posY) public view returns (bool) {
        return !_exists(get_tokenId(_posX, _posY));
    }
    function _isApprovedOrOwner(address _spender, uint _posX, uint _posY) public view returns (bool) {
        return _isApprovedOrOwner(_spender, get_tokenId(_posX, _posY));
    }

    // Private Land mint function
    function _mintLand(uint _posX, uint _posY, string memory _name) internal {
        require(isLegit(_posX, _posY), "Land: Mint position overflow");
        require(isAvailable(_posX, _posY), "Land: Mint position not available");
        uint dna = uint(keccak256(abi.encodePacked(_name))); // dna <-> name
        uint lastClaimTime = uint(block.timestamp);
        Map.push(LandStruct(
                        _posX,                  //posX
                        _posY,                  //posY
                        _name,                  //name
                        dna,                    //dna
                        baseLevel,              //level
                        lastClaimTime,          //lastClaimTime
                        initialProductionRate  //production_rate
                )
        );
        uint newItemId = _tokenIds.current();
        posToId[_posX][_posY] = newItemId;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, "https://ipf_link/{id}");
        _tokenIds.increment();
    }

    // Public Land mint function
    function publicMintLand(uint _posX, uint _posY, string memory _name) public {
        _mintLand(_posX, _posY, _name);
    }


}