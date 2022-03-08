// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./Parcel.sol";

contract ParcelHelper is Parcel {

    //// Parcel default config ////
    // Constant config
    // Mutable config
    uint maxLevel = 10;              // Parcel default max level
    uint maxProductionRate = 9990;   // Parcel default max ProductionRate

    //Update Parcel function
    function parcelChangeName(uint _posX, uint _posY, string calldata _newName) external {
        require(_isApprovedOrOwner(msg.sender, posToId[_posX][_posY]), "ParcelHelper: msg.sender must be approved or owner");
        uint newDna = uint(keccak256(abi.encodePacked(_newName)));
        Board[_posX][_posY].name = _newName;
        Board[_posX][_posY].dna = newDna; //update dna
    }


    // External function Parcel
    function parcelGetName(uint _posX, uint _posY) external view returns(string memory) {
        require(_exists(posToId[_posX][_posY]), "ParcelHelper: this tokenId don't exist yet");
        return Board[_posX][_posY].name;
    }
    function parcelGetDna(uint _posX, uint _posY) external view returns(uint) {
        require(_exists(posToId[_posX][_posY]), "ParcelHelper: this tokenId don't exist yet");
        return Board[_posX][_posY].dna;
    }
    function parcelGetLevel(uint _posX, uint _posY) external view returns(uint) {
        require(_exists(posToId[_posX][_posY]), "ParcelHelper: this tokenId don't exist yet");
        return Board[_posX][_posY].level;
    }
    function parcelGetLastClaimTime(uint _posX, uint _posY) external view returns(uint) {
        require(_exists(posToId[_posX][_posY]), "ParcelHelper: this tokenId don't exist yet");
        return Board[_posX][_posY].lastClaimTime;
    }
    function parcelGetProductionRate(uint _posX, uint _posY) external view returns(uint) {
        require(_exists(posToId[_posX][_posY]), "ParcelHelper: this tokenId don't exist yet");
        return Board[_posX][_posY].productionRate;
    }
    function parcelGetAll(uint _posX, uint _posY) external view returns(ParcelStruct memory) {
        require(_exists(posToId[_posX][_posY]), "LandHelper: this tokenId don't exist yet");
        return Board[_posX][_posY];
    }

    // External function board
    function BoardGetParcelIdsOf(address _owner) external view returns(uint[] memory) {
        uint[] memory result = new uint[](balanceOf(_owner));
        uint counter = 0;
        for (uint i = 1; i < parcelGetCurrentId(); i++) {
            if (_exists(i) && (ownerOf(i) == _owner)) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

}