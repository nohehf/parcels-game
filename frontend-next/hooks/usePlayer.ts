import { useQuery } from "react-query";
import useParcelContract from "./useParcelContract"

interface UsePlayerProps {
}

const usePlayer = () => {
  const contract = useParcelContract();
  return useQuery(["parcel", {chainId: contract.chainId }], () =>
    contract.getPlayerBalance()
  );
};

export default usePlayer
