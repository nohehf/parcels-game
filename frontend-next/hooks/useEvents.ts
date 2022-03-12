import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useAccount } from "wagmi";
import useParcelContract, { EventType } from "./useParcelContract";


interface UseEventsQuery {
  address: string;
}

// Listen to events and refresh data
const useEvents = () => {
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

    parcelContract.contract.on(EventType.PlayerBalanceUpdated, handler);

    return () => {
      parcelContract.contract.off(EventType.PlayerBalanceUpdated, handler);
    };
  }, [queryClient, parcelContract.chainId]);
};

export default useEvents;