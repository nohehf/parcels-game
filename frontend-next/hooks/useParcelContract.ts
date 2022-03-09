import * as wagmi from "wagmi";
import { useProvider, useSigner } from "wagmi";
import type { BigNumber } from "ethers";
// Import our contract ABI (a json representation of our contract's public interface).
// The hardhat compiler writes this file to artifacts during compilation.
import ParcelsContract from "../../artifacts/contracts/Parcel.sol/Parcel.json";
import { getClaimableAmount } from "./utils";

export interface Parcel {
   posX: number;                     
   posY: number;                      //Parcel posY  `8`
   // fixed, contract logic
   tokenId: number;
   // mutable, user logic
   name: string;                    //Parcel name `my_super_parcel`
   // mutable, contract logic
   dna: number;                       //Parcel dna `22_22`
   lastClaimTime: Date;             //Parcel lastClaimTime : 1646771741 timestamp
   productionRate: number;            //Parcel production_rate : $10Res/timestamp

}

export enum EventType {
  CommentAdded = "CommentAdded",
}

const useParcelContract = () => {
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
    addressOrName: "0x851356ae760d987E095750cCeb3bC6014560891C",
    contractInterface: ParcelsContract.abi,
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
      productionRate: parseInt(rawParcel[6])
    }
    return parcel
  };

  const getParcelGrid = async(gridWidth: number, gridHeight: number) => {

    let parcels: Parcel[] = []
    
    for (let i = 0; i < gridHeight; i++) {
      
      for (let j = 0; j < gridHeight; j++) {
      
        parcels.push(await getParcel(j,i))
        
      }
      
    }
  
  }

  const getPlayerBalance = async (): Promise<any> =>  {
    return parseInt(await contract.getBalance());
  }

  const claim = async (posX: number, posY:number) => {
    return await contract.rewardClaim(posX,posX);
  }

  return {
    contract,
    chainId: contract.provider.network?.chainId,
    getParcel,
    getPlayerBalance,
    getParcelGrid,
    claim
  };
};

export default useParcelContract;
