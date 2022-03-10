import * as wagmi from "wagmi";
import { useProvider, useSigner } from "wagmi";
import type { BigNumber } from "ethers";
// Import our contract ABI (a json representation of our contract's public interface).
// The hardhat compiler writes this file to artifacts during compilation.
import ItemsContract from "../../artifacts/contracts/ItemToken.sol/ItemToken.json";
import { Composable } from "../types/Composable";
import { itemsContractAddress } from "../settings";


export enum EventType {
  CommentAdded = "CommentAdded",
}



const parseComposable = (array: any): Composable => {
  const composable: Composable = {
    tokenId: parseInt(array[0]),
    name: array[1],
    kind: parseInt(array[2]),
    level: parseInt(array[3]),
    price: parseInt(array[4]),
    boost: parseInt(array[5]),
    maximum: parseInt(array[6])
  }
  return composable
}

const useItemContract = () => {
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
    addressOrName: itemsContractAddress,
    contractInterface: ItemsContract.abi,
    signerOrProvider: signer.data || provider,
  });

  // Wrapper to add types to our getComments function.
  
  const getAllComposablesNames = async (): Promise<any> => {
    return await contract.getShopItemName()
  }

  const getAllComposables = async (): Promise<Composable[]> => {
    const raw = await contract.getAllItemsInfo()
    let parsed: Composable [] = [];
    raw.forEach((composable: any) => {
      parsed.push(parseComposable(composable))
    });
    return parsed;
  }

  const getAllComposablesBalances = async (): Promise<number[]> => {
    return await contract.getAllItemsBalances()
  }

  const getInventory = async () => {
    const rawInventory = await getAllComposablesBalances()
    const inventory: {composable: Composable, amount: number}[] = [];
    const composablesList = await getAllComposables();
    let amounts = rawInventory.map((item: any, index:number) => {
      const amount = parseInt(item)
      if(amount > 0) {
        inventory.push({composable: composablesList[index], amount})
      }
    })

    return inventory
  }

  return {
    contract,
    chainId: contract.provider.network?.chainId,
    getAllComposablesNames,
    getAllComposables,
    getInventory
  };
};

export default useItemContract;

