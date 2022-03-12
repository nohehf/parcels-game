import * as wagmi from "wagmi";
import { useProvider, useSigner } from "wagmi";
import type { BigNumber } from "ethers";
// Import our contract ABI (a json representation of our contract's public interface).
// The hardhat compiler writes this file to artifacts during compilation.
import ParcelsContract from "../../artifacts/contracts/Parcel.sol/Parcel.json";
import TokenContract from "../../artifacts/contracts/RewardToken.sol/RewardToken.json"
import { getClaimableAmount } from "./utils";
import { parcelContractAddress, resContractAddress } from "../settings";
import useItemContract from "./useItemContract";
import { Composable } from "../types/Composable";
import { Parcel } from "../types/Composable";


export enum EventType {
  PlayerBalanceUpdated = "PlayerBalanceUpdated",
}

const useParcelContract = () => {
  const itemContract = useItemContract();
  // An ethers.Signer instance associated with the signed-in wallet.
  // https://docs.ethers.io/v5/api/signer/
  const [signer] = useSigner();
  // An ethers.Provider instance. This will be the same provider that is  
  // passed as a prop to the WagmiProvider.
  const provider = useProvider();

  // This returns a new ethers.Contract ready to interact with our comments API.
  // We need to pass in the address of our deployed contract as well as its abi.
  // We also pass in the signer if there is a signed in wallet, or if there's
  // no signed in wallet then we'll pass in the connected provider.
  const contract = wagmi.useContract({
    addressOrName: parcelContractAddress,
    contractInterface: ParcelsContract.abi,
    signerOrProvider: signer.data || provider,
  });

  const resContract = wagmi.useContract({
    addressOrName: resContractAddress,
    contractInterface: TokenContract.abi,
    signerOrProvider: signer.data || provider,
  });


  // Wrapper to add types to our getComments function.
  const getParcel = async (posX: number, posY: number): Promise<Parcel> => {
    const rawParcel = await contract.getAllData(posX,posY);
    const parcel: Parcel = {
      posX: parseInt(rawParcel[0]),
      posY: parseInt(rawParcel[1]),
      tokenId:  parseInt(rawParcel[2]),
      name: rawParcel[3],
      dna: parseInt(rawParcel[4]),
      lastClaimTime: new Date(parseInt(rawParcel[5])*1000),
      productionRate: parseInt(rawParcel[6]),
      owner: ""
    }
    parcel.owner = await contract.ownerOf(parcel.tokenId);
    return parcel
  };

  const getParcelGrid = async(gridWidth: number, gridHeight: number) => {

    let parcels: Parcel[][] = []
    
    for (let i = 0; i < gridHeight; i++) {
      
      let col: Parcel[] = []

      
      for (let j = 0; j < gridWidth; j++) {
      
        col.push(await getParcel(j,i))
        
      }

      parcels.push(col)
      
    }

    return parcels
  
  }

  const getPlayerBalance = async (): Promise<any> =>  {
    return parseInt(await contract.getBalance());
  }

  const buyComposable = async (name: string, price: number) => {
    await resContract.approve(contract.address,price)
    await contract.itemBuy(name);
  }

  const getAllComposablesNames = async (): Promise<any> => {
    //return await contract.getShopItemName()
    return null
  }

  const claim = async (posX: number, posY:number): Promise<any> => {
    return await contract.rewardClaim(posX,posX);
  }

  const getParcelComposableBalance = async (posX: number, posY: number, tokenId: number) => {
    return parseInt(await contract._getItemQuantity(posX, posY,tokenId))
  }

  const getParcelComposables = async (posX: number, posY: number) => {
    const composablesList  = await itemContract.getAllComposables();
    let parcelComposables:  {composable: Composable, amount: number}[] = [];
    await Promise.all(
      composablesList.map(async (composable) => {
        const amount = await getParcelComposableBalance(posX, posY, composable.tokenId)
        if(amount > 0)
          parcelComposables.push({composable: composable, amount: amount})
      })
    )
    
    return parcelComposables
  }

  const placeComposable = async (tokenId: number, posX: number, posY: number) => {
    return await contract.testTransfert(tokenId, posX, posY)
  }

  return {
    contract,
    chainId: contract.provider.network?.chainId,
    getParcel,
    getPlayerBalance,
    getParcelGrid,
    claim,
    getAllComposablesNames,
    buyComposable,
    getParcelComposables,
    placeComposable
  };
};

export default useParcelContract;

