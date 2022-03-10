import { useQuery } from "react-query";
import { useAccount } from "wagmi";
import useParcelContract from "./useParcelContract"

interface UsePlayerProps {
}

const usePlayer = () => {
  const [{ data, error, loading }, disconnect] = useAccount();
  const contract = useParcelContract();
  return useQuery(["player", {chainId: contract.chainId, connected: data?.address }],() =>
    contract.getPlayerBalance()
  );
};

export default usePlayer
