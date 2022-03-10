import { useQuery } from "react-query";
import { useAccount } from "wagmi";
import useItemContract from "./useItemContract";

const useInventory = () => {
  const [{ data, error, loading }, disconnect] = useAccount();
  const contract = useItemContract();
  return useQuery(
    ["inventory", { chainId: contract.chainId, connected: data?.address }],
    () => contract.getInventory()
  );
};

export default useInventory;
