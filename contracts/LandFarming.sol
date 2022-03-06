// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./LandHelper.sol";
import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
// import "./RewardToken.sol";

contract LandFarming is LandHelper {

    //Deploy function for the Reward Token contract
    function _deployREP() internal returns(RewardToken newContract) {
        RewardToken rewardContract = new RewardToken();
        return rewardContract;
    }

    RewardToken rewardContractAddress;

    constructor() {
        rewardContractAddress = _deployREP();
    }


    // Internal function
    function _resetClaimTime(LandStruct storage _landStruct) internal {
        _landStruct.lastClaimTime = uint32(block.timestamp);
    }

    // External function
    function claim(uint _tokenId) external {
        require(_exists(_tokenId), "LandFarming: this tokenId don't exist yet");
        require(_isApprovedOrOwner(msg.sender, _tokenId), "LandHelper: msg.sender must be approved or owner");
        LandStruct storage landStruct = Map[_tokenId-1];
        uint delta_t = block.timestamp - landStruct.lastClaimTime;
        uint RES_to_mint = landStruct.productionRate*delta_t;
        rewardContractAddress.mint(msg.sender, RES_to_mint);
        _resetClaimTime(landStruct);
    }

    //View function
    function to_claim(uint _tokenId) external view returns(uint){
        require(_exists(_tokenId), "LandFarming: this tokenId don't exist yet");
        LandStruct storage landStruct = Map[_tokenId-1];
        uint delta_t = block.timestamp - landStruct.lastClaimTime;
        uint RES_to_mint = landStruct.productionRate*delta_t;
        return RES_to_mint;
    }

    function show() public view returns(uint) {
        return rewardContractAddress.balanceOf(msg.sender);
    }
    
}

contract RewardToken is ERC20PresetMinterPauser {
    constructor() ERC20PresetMinterPauser("REP", "Farm Reward") {}
}