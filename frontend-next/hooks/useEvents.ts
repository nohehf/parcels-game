import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useAccount } from "wagmi";
import useItemContract, {EventTypesItem} from "./useItemContract";
import useParcelContract, { EventTypesParcel} from "./useParcelContract";


interface UseEventsQuery {
  address: string;
}

// Listen to events and refresh data
export const useBalanceEvents = () => {
  const queryClient = useQueryClient();
  const parcelContract = useParcelContract();
  const [{ data, error, loading }, disconnect] = useAccount();

  useEffect(() => {
    const handler = (address: string) => {
      if (data?.address !== address) {
        return;
      }
      // Invalidates the query whose query key matches the passed array.
      // This will cause the useComments hook to re-render the Comments
      // component with fresh data.
      queryClient.invalidateQueries([
        "player",
        {chainId: parcelContract.chainId, connected: data?.address }],
      );
    };

    parcelContract.contract.on(EventTypesParcel.PlayerBalanceUpdated, handler);

    return () => {
      parcelContract.contract.off(EventTypesParcel.PlayerBalanceUpdated, handler);
    };
  }, [queryClient, parcelContract.chainId]);
};

export const useInventoryEvents = () => {
  const queryClient = useQueryClient();
  const parcelContract = useParcelContract();
  const itemContract = useItemContract()
  const [{ data, error, loading }, disconnect] = useAccount();

  useEffect(() => {
    const handler = (address: string) => {
      if (data?.address !== address) {
        return;
      }
      // Invalidates the query whose query key matches the passed array.
      // This will cause the useComments hook to re-render the Comments
      // component with fresh data.
      queryClient.invalidateQueries([
        "inventory",
        {chainId: parcelContract.chainId, connected: data?.address }],
      );
    };

    parcelContract.contract.on(EventTypesParcel.PlayerInventoryUpdated, handler);

    itemContract.contract.on(EventTypesItem.PlayerInventoryUpdated, handler);

    return () => {
      parcelContract.contract.off(EventTypesParcel.PlayerInventoryUpdated, handler);
      itemContract.contract.off(EventTypesItem.PlayerInventoryUpdated, handler);
    };
  }, [queryClient, parcelContract.chainId, itemContract.chainId]);
};

export const useParcelEvents = (posX: number, posY: number) => {
  const queryClient = useQueryClient();
  const itemContract = useItemContract()
  const parcelContract = useParcelContract()
  const [{ data, error, loading }, disconnect] = useAccount();

  useEffect(() => {
    const handler = (posXonChain: string, posYonChain: string) => {

      if (parseInt(posXonChain) !== posX || parseInt(posYonChain) !== posY) {
        return;
      }
      // Invalidates the query whose query key matches the passed array.
      // This will cause the useComments hook to re-render the Comments
      // component with fresh data.
      queryClient.invalidateQueries(
        ["parcel", { posX, posY, chainId: parcelContract.chainId }],
      );

      queryClient.invalidateQueries(
        ["parcelComposables", { posX, posY, chainId: parcelContract.chainId }],
      );

      
    };

    itemContract.contract.on(EventTypesItem.ParcelUpdated, handler);
    parcelContract.contract.on(EventTypesParcel.ParcelUpdated, handler);

    return () => {
      itemContract.contract.off(EventTypesItem.ParcelUpdated, handler);
      parcelContract.contract.off(EventTypesParcel.ParcelUpdated, handler);
    };
  }, [queryClient, itemContract.chainId]);
};