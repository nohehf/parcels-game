// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./ParcelHelper.sol";
import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract ParcelFarming is ParcelHelper {

    //Deploy function for the Reward Token contract
    function _deployRewardContract() internal returns(RewardToken newContract) {
        RewardToken rewardContract = new RewardToken();
        return rewardContract;
    }

    RewardToken internal rewardContractAddress;

    constructor() {
        rewardContractAddress = _deployRewardContract();
    }

    // Private function
    function _resetClaimTime(ParcelStruct storage _parcelStruct) private {
        _parcelStruct.lastClaimTime = uint32(block.timestamp);
    }

    // Internal function
    function _burnRewardToken(uint _ammount) internal {
        rewardContractAddress.burnFrom(msg.sender, _ammount);
    }

    // External function
    function rewardClaim(uint _posX, uint _posY) external {
        require(_exists(posToId[_posX][_posY]), "ParcelFarming: this tokenId don't exist yet");
        require(_isApprovedOrOwner(msg.sender, posToId[_posX][_posY]), "ParcelHelper: msg.sender must be approved or owner");
        ParcelStruct storage parcelStruct = Board[_posX][_posY];
        uint delta_t = block.timestamp - parcelStruct.lastClaimTime;
        uint reward_to_mint = parcelStruct.productionRate*delta_t;
        rewardContractAddress.mint(msg.sender, reward_to_mint);
        _resetClaimTime(parcelStruct);
    }

    // External View function
    function rewardToClaim(uint _posX, uint _posY) external view returns(uint){
        require(_exists(posToId[_posX][_posY]), "ParcelFarming: this tokenId don't exist yet");
        ParcelStruct storage parcelStruct = Board[_posX][_posY];
        uint delta_t = block.timestamp - parcelStruct.lastClaimTime;
        uint reward_to_mint = parcelStruct.productionRate*delta_t;
        return reward_to_mint;
    }

    function rewardShowBalance() external view returns(uint) {
        return rewardContractAddress.balanceOf(msg.sender);
    }

    function rewardGetContract() public view returns(RewardToken) {
        return rewardContractAddress;
    }
    
}

contract RewardToken is ERC20PresetMinterPauser {
    constructor() ERC20PresetMinterPauser("REP", "Farm Reward") {}
}