// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./Land.sol";

contract LandHelper is Land {

    //// Land default config ////
    // Constant config
    // Mutable config
    uint maxLevel = 10;             // Land default max level
    uint maxProductionRate = 999;   // Land default max ProductionRate

    //Update Land function
    function changeName(uint _tokenId, string calldata _newName) external {
        require(_isApprovedOrOwner(msg.sender, _tokenId), "LandHelper: msg.sender must be approved or owner");
        uint newDna = uint(keccak256(abi.encodePacked(_newName)));
        Map[_tokenId-1].name = _newName;
        Map[_tokenId-1].dna = newDna; //update dna
    }


    // View function
    function getLandsId(address _owner) external view returns(uint[] memory) {
        uint[] memory result = new uint[](balanceOf(_owner));
        uint counter = 1;
        for (uint i = 0; i < Map.length; i++) {
            if (_exists(i) && (ownerOf(i) == _owner)) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }
    function get_position(uint _tokenId) external view returns(uint[2] memory) {
        require(_exists(_tokenId), "LandHelper: this tokenId don't exist yet");
        return [Map[_tokenId-1].posX, Map[_tokenId-1].posY];
    }
    function getName(uint _tokenId) external view returns(string memory) {
        require(_exists(_tokenId), "LandHelper: this tokenId don't exist yet");
        return Map[_tokenId-1].name;
    }
    function getDna(uint _tokenId) external view returns(uint) {
        require(_exists(_tokenId), "LandHelper: this tokenId don't exist yet");
        return Map[_tokenId-1].dna;
    }
    function getLevel(uint _tokenId) external view returns(uint) {
        require(_exists(_tokenId), "LandHelper: this tokenId don't exist yet");
        return Map[_tokenId-1].level;
    }
    function getLastClaimTime(uint _tokenId) external view returns(uint) {
        require(_exists(_tokenId), "LandHelper: this tokenId don't exist yet");
        return Map[_tokenId-1].lastClaimTime;
    }
    function getProductionRate(uint _tokenId) external view returns(uint) {
        require(_exists(_tokenId), "LandHelper: this tokenId don't exist yet");
        return Map[_tokenId-1].productionRate;
    }
    function getLand(uint _tokenId) external view returns(LandStruct memory) {
        require(_exists(_tokenId), "LandHelper: this tokenId don't exist yet");
        return Map[_tokenId-1];
    }
    

}